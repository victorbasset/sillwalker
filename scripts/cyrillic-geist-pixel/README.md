# Lettres russes de Geist Pixel (it. 1524)

Geist Pixel n'a pas de cyrillique : le russe s'affichait en Tiny5, jugé illisible par Victor. Ces scripts dessinent les
66 lettres russes (А-я, Ёё) sur la grille de Geist Pixel (pixel de 38 unités, capitales de 19 pixels, minuscules de 14,
traits de 2) et produisent `src/renderer/assets/fonts/geist-pixel-cyrillic-400-normal.woff2`, servi sous le nom
« Geist Pixel » (styles.css, unicode-range U+0401, U+0410-044F, U+0451). Les autres lettres cyrilliques restent en Tiny5.

- `raster.py` : lit les lettres latines du Geist Pixel d'origine (paquet npm `geist@1.9.2`,
  `dist/fonts/geist-pixel/GeistPixel-Square.woff2`) en grilles de cases → `latin.json`.
- `glyphs.py` : les lettres dessinées (outils : traits, barres, diagonales, symétries de lettres latines) et la liste
  de celles reprises telles quelles du latin (А = A, Н = H…) → `cyr.json`. Pour retoucher une lettre, c'est ici.
- `build.py` : cases → contours fusionnés, resserrés de 7 unités et décalés de −7 (comme la police latine simplifiée,
  scripts/simplify-pixel-font.py) ; lettres reprises copiées depuis la police latine du jeu ; sous-ensemble cyrillique.

Dans un environnement virtuel du dossier temporaire (fontTools, brotli, skia-pathops, pyclipper ; Pillow pour une
planche d'essai), jamais dans le dépôt :

    npm pack geist@1.9.2 && tar xzf geist-1.9.2.tgz
    python -I raster.py package/dist/fonts/geist-pixel/GeistPixel-Square.woff2 latin.json ""
    python -I glyphs.py latin.json cyr.json "_"
    python -I build.py <dépôt>/src/renderer/assets/fonts/geist-pixel-latin-400-normal.woff2 cyr.json geist-pixel-cyrillic-400-normal.woff2

Licence : dérivé de Geist Pixel (SIL OFL 1.1, aucun nom réservé), voir assets/fonts/OFL-GeistPixel.txt.
