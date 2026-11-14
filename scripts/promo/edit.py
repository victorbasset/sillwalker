# (it. 1170) Monteur de la bande-annonce : compose chaque image en Python (Pillow) et l'envoie à ffmpeg.
# Les plans viennent de scripts/promo/shoot.mjs (fenêtre du jeu 3840×1240 filmée à l'échelle ×2 : la bande occupe les
# lignes 1000-1240, le panneau 0-1000). Une scène = un extrait de plan cadré par une caméra animée (cadrage de départ →
# cadrage d'arrivée, lissé), posé sur un fond, avec un titre ; ou un carton (texte, logo).
# Usage : python3 scripts/promo/edit.py <edl.json> <dossier-des-plans> <dossier-polices> <sortie.mp4> <ffmpeg> [audio.wav]
import json, math, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

EDL, SHOTS, FONTS, OUT, FF = sys.argv[1:6]
AUDIO = sys.argv[6] if len(sys.argv) > 6 else None
W, H, FPS = 1920, 1080, 30
SRC_W, SRC_H = 3840, 1240
GOLD, INK, LIGHT = (255, 217, 138), (20, 18, 31), (236, 232, 255)
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name + ".ttf"), size)


def ease(t):  # lissage d'entrée et de sortie (caméra)
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def background(kind):
    """Fond de la composition : dégradé violet nuit, étoiles discrètes, vignette (pixel art : étoiles carrées)."""
    import random
    rnd = random.Random(7)
    bg = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(bg)
    top, bot = (24, 18, 44), (10, 8, 20)
    if kind == "dawn":
        top, bot = (52, 30, 70), (18, 12, 30)
    for y in range(H):
        k = y / (H - 1)
        d.line([(0, y), (W, y)], fill=tuple(int(top[i] * (1 - k) + bot[i] * k) for i in range(3)))
    for _ in range(260):
        x, y = rnd.randrange(W), rnd.randrange(H)
        s = rnd.choice([2, 2, 2, 4])
        c = rnd.choice([(120, 110, 170), (90, 84, 140), (200, 190, 255), (255, 217, 138)])
        d.rectangle([x, y, x + s - 1, y + s - 1], fill=c)
    # vignette
    v = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(v)
    vd.ellipse([-W * 0.25, -H * 0.35, W * 1.25, H * 1.35], fill=255)
    v = v.filter(ImageFilter.GaussianBlur(160))
    return Image.composite(bg, Image.new("RGB", (W, H), (4, 3, 8)), v)


def text_layer(lines, plate=False):
    """Calque RGBA d'un titre : [(texte, police, taille, couleur, y)] centrés ; contour sombre de 3 px, ombre portée ;
    plate : bandeau sombre translucide derrière (titre posé sur une image chargée, it. 1175)."""
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    if plate and lines:
        top = min(l[4] for l in lines) - 24; bot = max(l[4] + l[2] for l in lines) + 30
        d.rectangle([0, top, W, bot], fill=(14, 12, 26, 175))
    for txt, fname, size, col, y in lines:
        f = font(fname, size)
        w = d.textlength(txt, font=f)
        x = (W - w) / 2
        d.text((x + 4, y + 5), txt, font=f, fill=(0, 0, 0, 150))
        d.text((x, y), txt, font=f, fill=tuple(col) + (255,), stroke_width=3, stroke_fill=INK + (255,))
    return lay


def paste_title(img, title, i, sc):
    """(it. 1173) Entrée animée du titre : glissé de 28 px vers le haut et fondu sur 8 images ; « punch » : le titre
    arrive agrandi (×1,12) et se pose (titres d'événements). Sortie : fondu sur les 5 dernières images si fade=0."""
    n = int(round(sc["dur"] * FPS)); k = ease(min(1.0, i / 8)) if sc.get("title_in", True) else 1.0
    out = 1.0 if sc.get("fade", 8) or n <= 10 else ease(min(1.0, (n - 1 - i) / 5))  # une capture (1 image) : pas de sortie
    a = k * out
    lay = title
    if sc.get("punch") and k < 1:
        z = 1 + 0.12 * (1 - k)
        big = title.resize((int(W * z), int(H * z)), Image.BILINEAR)
        lay = big.crop(((big.width - W) // 2, (big.height - H) // 2, (big.width - W) // 2 + W, (big.height - H) // 2 + H))
    if a < 1:
        al = lay.getchannel("A").point(lambda v: int(v * a))
        lay = lay.copy(); lay.putalpha(al)
    dy = 0 if sc.get("punch") else int(28 * (1 - k))
    img.paste(lay, (0, dy), lay)


def hero_track(src):
    """(it. 1174) Position du héros (px logiques) au fil du plan : [(secondes depuis le début du film, x)], d'après le
    journal du tournage (« [hx] <ms> <x> ») et l'heure de début du film (<plan>.t0)."""
    import re
    try:
        t0 = int(open(os.path.join(SHOTS, src + ".t0")).read().strip())
        txt = open(os.path.join(SHOTS, src + ".log"), encoding="utf-8", errors="ignore").read()
        return sorted(((int(a) - t0) / 1000, int(b)) for a, b in re.findall(r"\[hx\] (\d+) (-?\d+)", txt))
    except OSError:
        return []


def hero_x(track, t, smooth=0.6):
    """Position lissée (moyenne sur ± smooth s) à l'instant t ; None sans journal."""
    near = [x for (tt, x) in track if abs(tt - t) <= smooth]
    return sum(near) / len(near) if near else None


def frames(src, t0, dur):
    """Images du plan entre t0 et t0 + dur (ffmpeg → RGB brut)."""
    n = int(round(dur * FPS))
    p = subprocess.Popen([FF, "-hide_banner", "-loglevel", "error", "-ss", str(t0), "-i", os.path.join(SHOTS, src + ".mp4"),
                          "-frames:v", str(n), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    size = SRC_W * SRC_H * 3
    last = None
    for _ in range(n):
        b = p.stdout.read(size)
        if len(b) < size:
            b = last  # plan plus court que prévu : on tient la dernière image
        last = b
        yield Image.frombuffer("RGB", (SRC_W, SRC_H), b, "raw", "RGB", 0, 1)
    p.stdout.close(); p.wait()


DESK2 = None


def desk_frame(src):
    """(it. 1171) Bureau ×2 (3840×2160) avec la fenêtre du jeu posée au-dessus de la barre des tâches ; le noir pur de la
    fenêtre (sa transparence : le jeu n'utilise pas #000) devient transparent."""
    global DESK2
    if DESK2 is None:
        DESK2 = make_desk().resize((W * 2, H * 2), Image.NEAREST)
    import numpy as np
    a = np.asarray(src)
    mask = Image.fromarray(((a.max(axis=2) > 6) * 255).astype("uint8"), "L")
    img = DESK2.copy()
    img.paste(src, (0, (H - 48) * 2 - SRC_H), mask)
    return img


sc_desk_path = os.path.join(os.path.dirname(OUT), "desk.png")


def make_desk():
    """(it. 1175) Bureau d'une journée de travail (1920×1080) : fond d'écran crépuscule, éditeur de code, document,
    lecteur de musique, barre des tâches avec horloge. Aucun noir pur (#000) : réservé à la transparence du jeu."""
    import random
    rnd = random.Random(3)
    img = Image.new("RGB", (W, H)); d = ImageDraw.Draw(img)
    for y in range(H):  # ciel du crépuscule
        k = y / H
        d.line([(0, y), (W, y)], fill=(int(58 + 120 * k), int(52 + 60 * k), int(110 + 30 * k)))
    for i, (col, base, amp) in enumerate([((70, 60, 120), 640, 90), ((52, 44, 96), 720, 70), ((36, 30, 70), 800, 50)]):
        pts = [(x, base - amp * (0.5 + 0.5 * math.sin(x / (160 + 60 * i) + i * 2))) for x in range(0, W + 40, 40)]
        d.polygon(pts + [(W, H), (0, H)], fill=col)
    def window(x, y, w, h, title, dark):
        sh = Image.new("RGBA", (w + 60, h + 60), (0, 0, 0, 0)); ImageDraw.Draw(sh).rectangle([30, 36, w + 30, h + 36], fill=(8, 6, 16, 120))
        sh = sh.filter(ImageFilter.GaussianBlur(14)); img.paste(sh, (x - 30, y - 30), sh)
        d.rectangle([x, y, x + w, y + h], fill=(30, 30, 40) if dark else (246, 246, 250))
        d.rectangle([x, y, x + w, y + 34], fill=(44, 44, 58) if dark else (226, 226, 234))
        for j, c in enumerate([(240, 96, 90), (240, 190, 70), (110, 200, 100)]):
            d.ellipse([x + 14 + j * 22, y + 11, x + 26 + j * 22, y + 23], fill=c)
        d.text((x + 90, y + 8), title, font=font("body", 18), fill=(200, 200, 215) if dark else (90, 90, 110))
    window(120, 90, 900, 560, "main.ts — project", True)
    cols = [(198, 120, 221), (97, 175, 239), (229, 192, 123), (152, 195, 121), (171, 178, 191), (224, 108, 117)]
    for r in range(17):
        x = 170 + 34 * rnd.choice([0, 0, 1, 1, 2, 3]); y = 150 + r * 28
        d.text((140, y), str(r + 1), font=font("body", 16), fill=(90, 92, 110))
        for _ in range(rnd.randint(1, 4)):
            w = rnd.randint(40, 180); d.rectangle([x, y + 6, x + w, y + 16], fill=rnd.choice(cols)); x += w + 14
            if x > 960: break
    window(1080, 150, 700, 430, "Quarterly report.docx", False)
    d.rectangle([1120, 210, 1500, 232], fill=(60, 60, 80))
    for r in range(9):
        w = rnd.randint(420, 620); d.rectangle([1120, 260 + r * 30, 1120 + w, 270 + r * 30], fill=(196, 196, 206))
    window(1300, 620, 480, 150, "lofi beats to idle to", True)
    d.rectangle([1330, 700, 1750, 706], fill=(70, 70, 90)); d.rectangle([1330, 700, 1560, 706], fill=(255, 217, 138))
    d.polygon([(1520, 735), (1520, 757), (1538, 746)], fill=(236, 232, 255))
    d.rectangle([0, H - 48, W, H], fill=(28, 26, 42))  # barre des tâches
    for j, c in enumerate([(97, 175, 239), (152, 195, 121), (229, 192, 123), (198, 120, 221), (224, 108, 117)]):
        d.rounded_rectangle([20 + j * 52, H - 40, 52 + j * 52, H - 8], 6, fill=c)
    d.text((W - 92, H - 36), "09:41", font=font("body", 22), fill=(236, 232, 255))
    return img


def render_scene(sc, enc, bgs):
    dur = sc["dur"]
    n = int(round(dur * FPS))
    bg = bgs.setdefault(sc.get("bg", "night"), background(sc.get("bg", "night")))
    title = text_layer(sc["title"], sc.get("plate", False)) if sc.get("title") else None
    if sc.get("logo"):  # (it. 1172) logo du jeu (image), centré, à la largeur demandée, au plus proche voisin
        lp, ly, lw = sc["logo"]
        lg = Image.open(os.path.join(ROOT, lp)).convert("RGBA")
        corner = lw == 0  # largeur 0 : petit logo en bas à droite (captures « promo », it. 1176)
        lw = 260 if corner else lw
        lg = lg.resize((lw, round(lg.height * lw / lg.width)), Image.NEAREST)
        lay = title.copy() if title is not None else Image.new("RGBA", (W, H), (0, 0, 0, 0))
        lay.paste(lg, (W - lw - 36, H - lg.height - 28) if corner else ((W - lw) // 2, ly), lg)
        title = lay
    fade = sc.get("fade", 8)
    if sc["type"] == "desktop":  # caméra dans le bureau ×2 (3840×2160), image entière par défaut
        it = frames(sc["src"], sc.get("t0", 0), dur)
        cam = sc.get("cam", [[0, 0, 3840], [0, 0, 3840]])
        for i in range(n):
            f = i / max(1, n - 1); k = ease(f)
            cx = cam[0][0] + (cam[1][0] - cam[0][0]) * k; cy = cam[0][1] + (cam[1][1] - cam[0][1]) * k
            cw = cam[0][2] + (cam[1][2] - cam[0][2]) * k; ch = cw * H / W
            cx = max(0, min(W * 2 - cw, cx)); cy = max(0, min(H * 2 - ch, cy))  # cadrage gardé dans le bureau
            comp = desk_frame(next(it)).crop((int(cx), int(cy), int(cx + cw), int(cy + ch)))
            img = comp.resize((W, H), Image.NEAREST if W / cw >= 1 else Image.BOX)
            if title is not None:
                paste_title(img, title, i, sc)
            if fade and (i < fade or i >= n - fade):
                a = min(i, n - 1 - i) / fade
                img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img, max(0.0, min(1.0, a)))
            enc.stdin.write(img.tobytes())
        return
    if sc["type"] == "card" and sc.get("logo"):  # (it. 1175) carton vivant
        lp, ly, lw = sc["logo"]
        lg0 = Image.open(os.path.join(ROOT, lp)).convert("RGBA")
        txt = text_layer(sc["title"]) if sc.get("title") else None
        import random
        rnd = random.Random(11); tw_stars = [(rnd.randrange(W), rnd.randrange(H), rnd.random() * 6.28, rnd.choice([2, 4])) for _ in range(90)]
        for i in range(n):
            img = bg.copy(); d = ImageDraw.Draw(img)
            for (x, y, ph, sz) in tw_stars:  # scintillement
                v = 0.5 + 0.5 * math.sin(ph + i / 9)
                d.rectangle([x, y, x + sz - 1, y + sz - 1], fill=(int(120 + 120 * v), int(110 + 100 * v), int(170 + 80 * v)))
            z = 0.94 + 0.06 * ease(i / max(1, n - 1))
            lw2 = int(lw * z); lg = lg0.resize((lw2, round(lg0.height * lw2 / lg0.width)), Image.NEAREST)
            sx = int((-0.4 + 1.8 * (i / max(1, n - 1))) * lg.width)  # reflet qui balaie le logo
            sh = Image.new("L", lg.size, 0); ImageDraw.Draw(sh).polygon([(sx, 0), (sx + 60, 0), (sx + 20, lg.height), (sx - 40, lg.height)], fill=120)
            from PIL import ImageEnhance  # le reflet éclaircit les pixels du logo (une tache grise en surimpression, avant)
            bright = ImageEnhance.Brightness(lg).enhance(1.7); bright.putalpha(lg.getchannel("A"))
            lg = Image.composite(bright, lg, sh)
            img.paste(lg, ((W - lw2) // 2, ly + (lw - lw2) // 6), lg)
            if txt is not None:
                paste_title(img, txt, i, sc)
            if fade and (i < fade or i >= n - fade):
                a = min(i, n - 1 - i) / fade
                img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img, max(0.0, min(1.0, a)))
            enc.stdin.write(img.tobytes())
        return
    if sc["type"] == "card":
        it = iter([None] * n)
    else:
        it = frames(sc["src"], sc.get("t0", 0), dur)
    # cible : rectangle de l'image où se pose le plan (x, y, l, h) ; caméra : (x, y, l) du cadrage dans le plan, la
    # hauteur suivant le rapport de la cible
    tx, ty, tw, th = sc.get("rect", [0, 300, 1920, 480])
    track = hero_track(sc["src"]) if sc.get("track") is not None and sc.get("src") else []
    cam = sc.get("cam", [[0, 1000, 960], [0, 1000, 960]])
    for i in range(n):
        f = i / max(1, n - 1)
        img = bg.copy()
        src = next(it)
        if src is not None:
            k = ease(f)
            cx = cam[0][0] + (cam[1][0] - cam[0][0]) * k
            cy = cam[0][1] + (cam[1][1] - cam[0][1]) * k
            if sc.get("track") is not None and track:  # (it. 1174) caméra qui suit le héros, à « track » px du bord gauche du cadrage
                hx = hero_x(track, sc.get("t0", 0) + i / FPS)
                if hx is not None:
                    cx = hx * 2 - sc["track"]
            cw = cam[0][2] + (cam[1][2] - cam[0][2]) * k
            ch = cw * th / tw
            box = (int(cx), int(cy), int(cx + cw), int(cy + ch))
            part = src.crop(box)
            sc_f = tw / cw
            # pixel art : plus proche voisin (facteur entier conseillé) ; smooth : lissé (texte d'une cinématique)
            part = part.resize((tw, th), Image.BICUBIC if sc.get("smooth") else Image.NEAREST if sc_f >= 1 else Image.BOX)
            # cadre : ombre portée sous la bande
            sh = Image.new("RGBA", (tw + 40, th + 40), (0, 0, 0, 0))
            ImageDraw.Draw(sh).rectangle([20, 26, tw + 20, th + 26], fill=(0, 0, 0, 140))
            sh = sh.filter(ImageFilter.GaussianBlur(12))
            img.paste(sh, (tx - 20, ty - 20), sh)
            img.paste(part, (tx, ty))
            for ex in sc.get("extra", []):  # (it. 1177) cadrages en plus de la même image (écran scindé)
                (ex0, ey0, ew), (rx, ry, rw, rh) = ex["cam"], ex["rect"]
                eh = ew * rh / rw
                ep = src.crop((int(ex0), int(ey0), int(ex0 + ew), int(ey0 + eh))).resize((rw, rh), Image.NEAREST if rw / ew >= 1 else Image.BOX)
                img.paste(sh.resize((rw + 40, rh + 40)), (rx - 20, ry - 20), sh.resize((rw + 40, rh + 40)))
                img.paste(ep, (rx, ry))
        if title is not None:
            paste_title(img, title, i, sc)
        # fondu au noir en entrée et en sortie
        if fade and (i < fade or i >= n - fade):
            a = min(i, n - 1 - i) / fade
            img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img, max(0.0, min(1.0, a)))
        enc.stdin.write(img.tobytes())


def main():
    edl = json.load(open(EDL, encoding="utf-8"))
    args = [FF, "-hide_banner", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-"]
    if OUT.endswith(".png"):  # (it. 1176) captures : une image par scène (dur = 1/30 s), sortie « dossier/%02d.png »
        enc = subprocess.Popen(args + [OUT], stdin=subprocess.PIPE)
        for sc in edl["scenes"]:
            render_scene(sc, enc, {})
        enc.stdin.close(); enc.wait(); print(OUT); return
    if AUDIO:
        total = sum(sc["dur"] for sc in edl["scenes"])  # (it. 1185) musique fondue sur la dernière seconde et demie
        args += ["-i", AUDIO, "-shortest", "-af", f"afade=t=out:st={max(0, total - 1.5):.2f}:d=1.5", "-c:a", "aac", "-b:a", "192k"]
    args += ["-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT]
    enc = subprocess.Popen(args, stdin=subprocess.PIPE)
    bgs = {}
    for sc in edl["scenes"]:
        render_scene(sc, enc, bgs)
        print(sc.get("src", "carton"), sc["dur"], "s", flush=True)
    enc.stdin.close(); enc.wait()
    print(OUT)


main()
