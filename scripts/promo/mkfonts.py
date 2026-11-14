# (it. 1200) Polices de secours des accroches (PROMO_FALLBACK d'edit.py) : cyrillique (Tiny5) et latin étendu (Geist
# Pixel, lettres polonaises) du jeu, décompressées en TTF. Chinois, japonais, coréen : Noto Sans CJK Bold du système
# (/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc, indices 2 SC, 0 JP, 1 KR ; DotGothic16 du jeu, trop fine à
# grande taille et sans le chinois simplifié, écartée). Usage : python3 mkfonts.py <dossier des polices>
import sys
from fontTools.ttLib import TTFont
for src, out in [("src/renderer/assets/fonts/tiny5-cyrillic-400-normal.woff2", "cyr.ttf"),
                 ("src/renderer/assets/fonts/geist-pixel-latin-ext-400-normal.woff2", "latx.ttf")]:
    f = TTFont(src); f.flavor = None; f.save(f"{sys.argv[1]}/{out}")
