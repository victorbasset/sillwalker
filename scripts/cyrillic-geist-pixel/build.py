import sys, json
import pathops, pyclipper
from fontTools.ttLib import TTFont
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.subset import Subsetter, Options
P, INSET, DX = 38, 7, -7

def cells_to_glyph(cells):
    path = pathops.Path()
    for x, y in cells:
        x0, y0 = x * P, y * P
        path.moveTo(x0, y0); path.lineTo(x0, y0 + P); path.lineTo(x0 + P, y0 + P); path.lineTo(x0 + P, y0); path.close()
    path = pathops.simplify(path, clockwise=True)
    polys, cur = [], []
    for verb, pts in path:
        if verb == pathops.PathVerb.MOVE: cur = [pts[0]]
        elif verb == pathops.PathVerb.LINE: cur.append(pts[0])
        elif verb == pathops.PathVerb.CLOSE:
            if len(cur) > 2: polys.append(cur)
            cur = []
    co = pyclipper.PyclipperOffset(miter_limit=4)
    co.AddPaths([[(round(x), round(y)) for x, y in p] for p in polys], pyclipper.JT_MITER, pyclipper.ET_CLOSEDPOLYGON)
    p2 = pathops.Path()
    for poly in co.Execute(-INSET):
        p2.moveTo(poly[0][0] + DX, poly[0][1])
        for x, y in poly[1:]: p2.lineTo(x + DX, y)
        p2.close()
    p2 = pathops.simplify(p2, clockwise=True)
    pen = TTGlyphPen(None)
    for verb, pts in p2:
        if verb == pathops.PathVerb.MOVE: pen.moveTo(pts[0])
        elif verb == pathops.PathVerb.LINE: pen.lineTo(pts[0])
        elif verb == pathops.PathVerb.CLOSE: pen.closePath()
    return pen.glyph()

if __name__ == "__main__":
    base, cyrjson, out = sys.argv[1:4]
    f = TTFont(base)
    if sys.argv[4:] == ["check"]:
        lat = json.load(open(cyrjson))
        cells = set()
        for i, row in enumerate(lat["H"]["rows"]):
            for x, c in enumerate(row):
                if c == "#": cells.add((x, 20 - i))
        g = cells_to_glyph(cells); g.recalcBounds(f["glyf"])
        h = f["glyf"][f.getBestCmap()[ord("H")]]
        print("construit", g.xMin, g.xMax, g.yMin, g.yMax, "police", h.xMin, h.xMax, h.yMin, h.yMax)
        raise SystemExit
    data = json.load(open(cyrjson)); same = data.pop("_same")
    glyf, hmtx, cm = f["glyf"], f["hmtx"], f.getBestCmap()
    order = list(f.getGlyphOrder()); newmap = {}
    for ch, d in data.items():
        name = "uni%04X" % ord(ch)
        g = cells_to_glyph([tuple(c) for c in d["cells"]]); g.recalcBounds(glyf)
        glyf[name] = g; hmtx[name] = (d["w"] * P, g.xMin if g.numberOfContours else 0)
        order.append(name); newmap[ord(ch)] = name
    for ch, src in same.items():
        name = "uni%04X" % ord(ch); sname = cm[ord(src)]
        glyf[name] = glyf[sname]; hmtx[name] = hmtx[sname]
        order.append(name); newmap[ord(ch)] = name
    f.setGlyphOrder(order)
    for t in f["cmap"].tables:
        if t.isUnicode(): t.cmap.update(newmap)
    opts = Options(); opts.flavor = "woff2"; opts.layout_features = ["*"]; opts.name_IDs = ["*"]; opts.notdef_outline = True
    sub = Subsetter(opts); sub.populate(unicodes=list(newmap)); sub.subset(f)
    f.flavor = "woff2"; f.save(out)
    pts = sum(len(f["glyf"][n].coordinates) for n in f.getGlyphOrder() if f["glyf"][n].numberOfContours > 0)
    print(out, len(newmap), "lettres,", pts, "points")
