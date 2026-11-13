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


def text_layer(lines):
    """Calque RGBA d'un titre : [(texte, police, taille, couleur, y)] centrés ; contour sombre de 3 px, ombre portée."""
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    for txt, fname, size, col, y in lines:
        f = font(fname, size)
        w = d.textlength(txt, font=f)
        x = (W - w) / 2
        d.text((x + 4, y + 5), txt, font=f, fill=(0, 0, 0, 150))
        d.text((x, y), txt, font=f, fill=tuple(col) + (255,), stroke_width=3, stroke_fill=INK + (255,))
    return lay


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
        DESK2 = Image.open(sc_desk_path).convert("RGB").resize((W * 2, H * 2), Image.NEAREST)
    import numpy as np
    a = np.asarray(src)
    mask = Image.fromarray(((a.max(axis=2) > 6) * 255).astype("uint8"), "L")
    img = DESK2.copy()
    img.paste(src, (0, (H - 48) * 2 - SRC_H), mask)
    return img


sc_desk_path = os.path.join(os.path.dirname(OUT), "desk.png")


def render_scene(sc, enc, bgs):
    dur = sc["dur"]
    n = int(round(dur * FPS))
    bg = bgs.setdefault(sc.get("bg", "night"), background(sc.get("bg", "night")))
    title = text_layer(sc["title"]) if sc.get("title") else None
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
                img.paste(title, (0, 0), title)
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
    cam = sc.get("cam", [[0, 1000, 960], [0, 1000, 960]])
    for i in range(n):
        f = i / max(1, n - 1)
        img = bg.copy()
        src = next(it)
        if src is not None:
            k = ease(f)
            cx = cam[0][0] + (cam[1][0] - cam[0][0]) * k
            cy = cam[0][1] + (cam[1][1] - cam[0][1]) * k
            cw = cam[0][2] + (cam[1][2] - cam[0][2]) * k
            ch = cw * th / tw
            box = (int(cx), int(cy), int(cx + cw), int(cy + ch))
            part = src.crop(box)
            sc_f = tw / cw
            part = part.resize((tw, th), Image.NEAREST if sc_f >= 1 else Image.BOX)
            # cadre : ombre portée sous la bande
            sh = Image.new("RGBA", (tw + 40, th + 40), (0, 0, 0, 0))
            ImageDraw.Draw(sh).rectangle([20, 26, tw + 20, th + 26], fill=(0, 0, 0, 140))
            sh = sh.filter(ImageFilter.GaussianBlur(12))
            img.paste(sh, (tx - 20, ty - 20), sh)
            img.paste(part, (tx, ty))
        if title is not None:
            a = min(1.0, i / 10) if sc.get("title_in", True) else 1.0
            lay = title if a >= 1 else Image.blend(Image.new("RGBA", (W, H), (0, 0, 0, 0)), title, a)
            img.paste(lay, (0, 0), lay)
        # fondu au noir en entrée et en sortie
        if fade and (i < fade or i >= n - fade):
            a = min(i, n - 1 - i) / fade
            img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img, max(0.0, min(1.0, a)))
        enc.stdin.write(img.tobytes())


def main():
    edl = json.load(open(EDL, encoding="utf-8"))
    args = [FF, "-hide_banner", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-"]
    if AUDIO:
        args += ["-i", AUDIO, "-shortest", "-c:a", "aac", "-b:a", "192k"]
    args += ["-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT]
    enc = subprocess.Popen(args, stdin=subprocess.PIPE)
    bgs = {}
    for sc in edl["scenes"]:
        render_scene(sc, enc, bgs)
        print(sc.get("src", "carton"), sc["dur"], "s", flush=True)
    enc.stdin.close(); enc.wait()
    print(OUT)


main()
