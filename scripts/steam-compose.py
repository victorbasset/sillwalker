import sys, random
# (it. 782) Captures du magasin Steam : pose une capture de la fenêtre du jeu (--shot, 1920×620, transparente au-dessus
# de la bande ; ou le mode mini) sur un bureau neutre 1920×1080 avec une barre des tâches générique, sans marque.
# Usage : python3 scripts/steam-compose.py <capture.png> <sortie.png> [mini]   (Pillow)
from PIL import Image, ImageDraw, ImageFilter
W, H, TB = 1920, 1080, 48
def desktop():
    bg = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=(int(28 + 30 * t), int(36 + 22 * t), int(64 + 30 * t)))
    # quelques fenêtres floues d'arrière-plan (bureau occupé, sans marque)
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dl = ImageDraw.Draw(lay)
    dl.rounded_rectangle([160, 90, 1080, 640], 10, fill=(236, 238, 244, 235))
    dl.rectangle([160, 90, 1080, 126], fill=(205, 210, 222, 255))
    for i in range(9): dl.rounded_rectangle([200, 160 + i * 44, 200 + random.Random(i).randint(300, 820), 178 + i * 44], 4, fill=(190, 196, 210, 255))
    dl.rounded_rectangle([1180, 150, 1780, 560], 10, fill=(30, 30, 38, 230))
    dl.rectangle([1180, 150, 1780, 186], fill=(48, 48, 60, 255))
    dl.rounded_rectangle([1210, 210, 1750, 520], 6, fill=(70, 74, 92, 255))
    lay = lay.filter(ImageFilter.GaussianBlur(3))
    bg.paste(lay, (0, 0), lay)
    d = ImageDraw.Draw(bg)
    d.rectangle([0, H - TB, W, H], fill=(22, 24, 32))
    for i in range(6): d.rounded_rectangle([20 + i * 52, H - TB + 9, 50 + i * 52, H - 9], 5, fill=(70, 76, 96))
    d.rounded_rectangle([W - 120, H - TB + 13, W - 20, H - 13], 4, fill=(60, 64, 80))
    return bg
def main(src, dst, mini=False):
    bg = desktop(); g = Image.open(src).convert("RGBA")
    if mini: bg.paste(g, (W - g.width - 8, H - TB - g.height - 6), g)
    else: bg.paste(g, (0, H - TB - g.height), g)
    bg.save(dst)
main(sys.argv[1], sys.argv[2], len(sys.argv) > 3)
