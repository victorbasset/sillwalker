# (it. 1195) Vignette YouTube (1280×720) et couverture itch.io (630×500), à partir d'une image nette du combat contre
# le boss majeur (plan « boss » de shoot.mjs, 9,5 s : le duo, le boss, un seul critique lisible), agrandie en entier
# (pixels nets) ; logo du jeu et accroche par-dessus.
# Usage : python3 thumbs.py <dossier des plans> <polices> <ffmpeg> <dossier de sortie> [langue]
import os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
SHOTS, FONTS, FF, OUT = sys.argv[1:5]
LANG = sys.argv[5] if len(sys.argv) > 5 else "en"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HOOK = {"en": "AN IDLE RPG ON YOUR TASKBAR", "fr": "UN RPG IDLE SUR VOTRE BARRE DES TÂCHES",
        "de": "EIN IDLE-RPG AUF DEINER TASKLEISTE", "es": "UN RPG IDLE EN TU BARRA DE TAREAS",
        "pt": "UM RPG IDLE NA SUA BARRA DE TAREFAS", "pl": "IDLE RPG NA TWOIM PASKU ZADAŃ",
        "ru": "IDLE-RPG НА ВАШЕЙ ПАНЕЛИ ЗАДАЧ", "zh": "住在任务栏上的放置类 RPG", "ja": "タスクバーに住む放置系RPG",
        "ko": "작업 표시줄에 사는 방치형 RPG"}[LANG]
# (it. 1202) police de l'accroche hors alphabet latin de base : celle du jeu (cyrillique, latin étendu) ou Noto CJK
NOTO = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
HOOK_FONT = {"ru": ("cyr.ttf", 0), "pl": ("latx.ttf", 0), "zh": (NOTO, 2), "ja": (NOTO, 0), "ko": (NOTO, 1)}.get(LANG)
os.makedirs(OUT, exist_ok=True)
tmp = os.path.join(OUT, "_frame.png")
subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-ss", "9.5", "-i", os.path.join(SHOTS, "boss.mp4"),
                "-frames:v", "1", tmp], check=True)
src = Image.open(tmp).convert("RGB"); os.remove(tmp)
logo = Image.open(os.path.join(ROOT, "steam/capsules/library-logo.png")).convert("RGBA")
logo = logo.crop(logo.getbbox())  # sans la marge transparente de l'image
INK = (14, 12, 26)


def fnt(name, size):
    if HOOK_FONT:
        return ImageFont.truetype(os.path.join(FONTS, HOOK_FONT[0]), size, index=HOOK_FONT[1])
    return ImageFont.truetype(os.path.join(FONTS, name + ".ttf"), size)


def runs(s, name, size):
    """Morceaux (texte, police) : pour le russe et le polonais, la police pixel latine du titre et, pour les lettres
    qu'elle n'a pas, celle de secours ; ailleurs, une seule police (Noto CJK a aussi le latin)."""
    if LANG not in ("ru", "pl"):
        return [(s, fnt(name, size))]
    from fontTools.ttLib import TTFont
    base = os.path.join(FONTS, name + ".ttf"); has = set(TTFont(base).getBestCmap())
    out = []
    for ch in s:
        k = "b" if (ch.isspace() or ord(ch) in has) else "f"
        if out and out[-1][0] == k: out[-1][1] += ch
        else: out.append([k, ch])
    return [(t, ImageFont.truetype(base, size) if k == "b" else fnt(name, size)) for k, t in out]


def text(img, s, y, size, col=(255, 217, 138), name="title"):
    d = ImageDraw.Draw(img)
    w = lambda sz: sum(d.textlength(t, font=f) for t, f in runs(s, name, sz))
    while w(size) > img.width - 60: size -= 2
    x0 = (img.width - w(size)) / 2; base = y + ImageFont.truetype(os.path.join(FONTS, name + ".ttf"), size).getmetrics()[0]
    for dx, dy, kw in [(3, 4, dict(fill=(0, 0, 0))), (0, 0, dict(fill=col, stroke_width=3, stroke_fill=INK))]:
        x = x0 + dx
        for t, f in runs(s, name, size):
            d.text((x, base + dy), t, font=f, anchor="ls", **kw); x += d.textlength(t, font=f)


def band(img, y0, y1, a0, a1):  # dégradé sombre vertical (a0 → a1 d'opacité)
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for y in range(y0, y1):
        a = int(a0 + (a1 - a0) * (y - y0) / max(1, y1 - y0 - 1)); d.line([(0, y), (img.width, y)], fill=INK + (a,))
    return Image.alpha_composite(img.convert("RGBA"), ov)


def paste_logo(img, w, y):
    lg = logo.resize((w, round(logo.height * w / logo.width)), Image.NEAREST)
    img.paste(lg, ((img.width - w) // 2, y), lg)


# vignette YouTube : bandeau du logo en haut (sur un ciel étoilé), bande ×3 sous lui (427×200 → 1280×600, sans le HUD du
# jeu), accroche sur le sol, en bas
yt = Image.new("RGB", (1280, 720), INK)
yt.paste(src.crop((3010, 1040, 3437, 1240)).resize((1280, 600), Image.NEAREST), (0, 120))
yt = band(yt, 120, 230, 255, 0); yt = band(yt, 560, 720, 0, 240)
paste_logo(yt, 440, 14)
text(yt, HOOK, 640, 54)
yt.convert("RGB").save(os.path.join(OUT, f"youtube-thumbnail-{LANG}.png"))
# couverture itch.io : bande ×2 (315×200 → 630×400) sous un bandeau du logo
cv = Image.new("RGB", (630, 500), INK)
cv.paste(src.crop((3060, 1040, 3375, 1240)).resize((630, 400), Image.NEAREST), (0, 100))
cv = band(cv, 100, 160, 255, 0)
paste_logo(cv, 300, 14)
cv = band(cv, 400, 500, 0, 230); text(cv, HOOK, 452, 26)
cv.convert("RGB").save(os.path.join(OUT, f"itch-cover-{LANG}.png"))
print(OUT)
