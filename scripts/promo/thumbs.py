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
        "pt": "UM RPG IDLE NA SUA BARRA DE TAREFAS"}[LANG]
os.makedirs(OUT, exist_ok=True)
tmp = os.path.join(OUT, "_frame.png")
subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-ss", "9.5", "-i", os.path.join(SHOTS, "boss.mp4"),
                "-frames:v", "1", tmp], check=True)
src = Image.open(tmp).convert("RGB"); os.remove(tmp)
logo = Image.open(os.path.join(ROOT, "steam/capsules/library-logo.png")).convert("RGBA")
logo = logo.crop(logo.getbbox())  # sans la marge transparente de l'image
INK = (14, 12, 26)


def fnt(name, size): return ImageFont.truetype(os.path.join(FONTS, name + ".ttf"), size)


def text(img, s, y, size, col=(255, 217, 138), name="title"):
    d = ImageDraw.Draw(img); f = fnt(name, size)
    while d.textlength(s, font=f) > img.width - 60: size -= 2; f = fnt(name, size)
    x = (img.width - d.textlength(s, font=f)) / 2
    d.text((x + 3, y + 4), s, font=f, fill=(0, 0, 0))
    d.text((x, y), s, font=f, fill=col, stroke_width=3, stroke_fill=INK)


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
