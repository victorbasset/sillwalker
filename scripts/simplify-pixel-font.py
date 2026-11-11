# (it. 776) Geist Pixel dessine chaque pixel comme un carré de 26 points (courbes plates) : 68 contours et 1 771 points
# par lettre en moyenne (Pixelify Sans : 2 et 22). Sous Windows, chaque nouvelle taille de police coûtait 75-150 ms
# (chez Victor) : premières ouvertures du panneau et des onglets lentes. Ce script fusionne les carrés de chaque lettre
# en quelques polygones (même dessin, au point près), sans courbes.
# Fusionnés, les pixels se dessinent plus pleins (les joints entre carrés voisins éclaircissaient le texte) : `inset`
# resserre chaque contour de quelques unités pour garder la même quantité d'encre qu'avant (réglé à l'œil et au compte
# de pixels, it. 776).
# Usage : python3 scripts/simplify-pixel-font.py <entrée.woff2> <sortie.woff2> [inset]   (fontTools, brotli, skia-pathops, pyclipper)
import sys
import pathops
import pyclipper
from fontTools.ttLib import TTFont
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.basePen import BasePen


class FlatPen(BasePen):
    """Recopie un contour dans un chemin pathops en remplaçant les courbes (plates ici) par leurs points d'ancrage."""
    def __init__(self, glyphset, path):
        super().__init__(glyphset)
        self.path = path
    def _moveTo(self, p): self.path.moveTo(*p)
    def _lineTo(self, p): self.path.lineTo(*p)
    def _qCurveToOne(self, p1, p2): self.path.lineTo(*p2)
    def _curveToOne(self, p1, p2, p3): self.path.lineTo(*p3)
    def _closePath(self): self.path.close()
    def _endPath(self): self.path.close()


def shrink(path, inset):
    """Contours resserrés de `inset` unités (angles droits gardés)."""
    if inset <= 0:
        return None
    polys, cur = [], []
    for verb, pts in path:
        if verb == pathops.PathVerb.MOVE: cur = [pts[0]]
        elif verb == pathops.PathVerb.LINE: cur.append(pts[0])
        elif verb == pathops.PathVerb.CLOSE:
            if len(cur) > 2: polys.append(cur)
            cur = []
    co = pyclipper.PyclipperOffset(miter_limit=4)
    co.AddPaths([[(round(x), round(y)) for x, y in p] for p in polys], pyclipper.JT_MITER, pyclipper.ET_CLOSEDPOLYGON)
    return co.Execute(-inset)


def simplify(src, dst, inset=0):
    f = TTFont(src)
    glyf, gs = f["glyf"], f.getGlyphSet()
    before = after = 0
    for name in f.getGlyphOrder():
        g = glyf[name]
        if g.isComposite() or g.numberOfContours <= 0:
            continue
        before += len(g.coordinates)
        path = pathops.Path()
        gs[name].draw(FlatPen(gs, path))
        path = pathops.simplify(path, clockwise=True)
        pen = TTGlyphPen(None)
        polys = shrink(path, inset)
        if polys is not None:
            # re-simplifié par pathops pour garder le sens des contours attendu par TrueType
            p2 = pathops.Path()
            for poly in polys:
                p2.moveTo(*poly[0])
                for pt in poly[1:]: p2.lineTo(*pt)
                p2.close()
            path = pathops.simplify(p2, clockwise=True)
        for verb, pts in path:
            if verb == pathops.PathVerb.MOVE: pen.moveTo(pts[0])
            elif verb == pathops.PathVerb.LINE: pen.lineTo(pts[0])
            elif verb == pathops.PathVerb.CLOSE: pen.closePath()
            else: raise SystemExit(f"{name} : courbe inattendue ({verb})")
        ng = pen.glyph()
        ng.recalcBounds(glyf)
        glyf[name] = ng
        after += len(ng.coordinates) if ng.numberOfContours > 0 else 0
    f.flavor = "woff2"
    f.save(dst)
    print(f"{src} : {before} → {after} points")


if __name__ == "__main__":
    simplify(sys.argv[1], sys.argv[2], float(sys.argv[3]) if len(sys.argv) > 3 else 0)
