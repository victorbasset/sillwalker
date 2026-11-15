# Lettres cyrilliques dessinées sur la grille de Geist Pixel (pixel de 38 unités, capitales 19 pixels, minuscules 14,
# jambages 4, traits de 2 pixels). Chaque lettre : (largeur d'avance en pixels, ensemble de cases (x, y), y = 0 : ligne de base).
import json, sys

LAT = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "latin.json"))


def latin(ch, ymax=20):
    d = LAT[ch]
    cells = set()
    for i, row in enumerate(d["rows"]):
        y = 20 - i
        if y > ymax:
            continue
        for x, c in enumerate(row):
            if c == "#":
                cells.add((x, y))
    return d["w"], cells


def mirror(w, cells):
    return {(w - 1 - x, y) for x, y in cells}


class G:
    def __init__(self, w):
        self.w, self.c = w, set()

    def rect(self, x0, x1, y0, y1):
        for x in range(x0, x1 + 1):
            for y in range(y0, y1 + 1):
                self.c.add((x, y))
        return self

    def v(self, x, y0, y1):  # trait vertical de 2 pixels
        return self.rect(x, x + 1, y0, y1)

    def h(self, x0, x1, y):  # trait horizontal de 2 pixels
        return self.rect(x0, x1, y, y + 1)

    def line(self, x0, y0, x1, y1):  # diagonale de 2 pixels de large
        n = max(abs(x1 - x0), abs(y1 - y0))
        for i in range(n + 1):
            x = round(x0 + (x1 - x0) * i / n)
            y = round(y0 + (y1 - y0) * i / n)
            self.c.add((x, y)); self.c.add((x + 1, y))
        return self

    def add(self, cells, dx=0, dy=0):
        self.c |= {(x + dx, y + dy) for x, y in cells}
        return self

    def cut(self, *pts):
        for p in pts:
            self.c.discard(p)
        return self


CAP, XH = 18, 13  # y du haut des capitales et des minuscules
OUT = {}

# ---------- Capitales ----------
w, B = latin("B")
OUT["Б"] = G(w).add({p for p in B if p[1] <= 10}).v(2, 0, CAP).h(2, 13, 17)
OUT["Г"] = G(15).v(2, 0, CAP).h(2, 12, 17)
OUT["Д"] = G(19).h(5, 14, 17).v(5, 2, CAP).v(13, 2, CAP).h(1, 16, 0).v(1, -3, 1).v(15, -3, 1).cut((4, 2), (4, 3))
g = G(22).v(10, 0, CAP)
g.line(12, 9, 19, 17).line(12, 9, 19, 0).line(8, 9, 1, 17).line(8, 9, 1, 0)
g.rect(19, 20, 17, 18).rect(1, 2, 17, 18)
OUT["Ж"] = g
w, T3 = latin("3"); OUT["З"] = G(w).add(T3)
w, N = latin("N")
OUT["И"] = G(w).add(mirror(w, N))
g = G(w).add(mirror(w, N)); g.c = {(x, y) for x, y in g.c}
OUT["Й"] = g.add({(5, 22), (5, 21), (6, 21), (6, 20), (7, 20), (8, 20), (9, 20), (10, 20), (10, 21), (11, 21), (11, 22)})
OUT["Л"] = G(17).h(5, 14, 17).v(13, 0, CAP).v(5, 3, CAP).rect(2, 4, 0, 2).cut((2, 2))
OUT["П"] = G(18).v(2, 0, CAP).v(14, 0, CAP).h(2, 15, 17)
g = G(16).v(2, 10, CAP).v(12, 2, CAP).h(4, 12, 8).rect(3, 4, 9, 10).h(3, 11, 0).rect(12, 12, 1, 1).cut((3, 0))
OUT["У"] = g
g = G(20).v(9, 0, CAP)
g.h(5, 14, 14).h(5, 14, 4).v(2, 6, 12).v(16, 6, 12).rect(3, 4, 5, 6).rect(3, 4, 12, 13).rect(15, 16, 5, 6).rect(15, 16, 12, 13)
OUT["Ф"] = g
OUT["Ц"] = G(19).v(2, 0, CAP).v(13, 0, CAP).h(2, 15, 0).v(15, -3, 1)
OUT["Ч"] = G(17).v(2, 9, CAP).h(4, 13, 7).rect(3, 4, 8, 9).v(13, 0, CAP)
OUT["Ш"] = G(22).v(2, 0, CAP).v(10, 0, CAP).v(18, 0, CAP).h(2, 19, 0)
OUT["Щ"] = G(24).v(2, 0, CAP).v(10, 0, CAP).v(18, 0, CAP).h(2, 21, 0).v(20, -3, 1)
bowl = {p for p in B if p[1] <= 10 and p[0] >= 4}  # la panse basse du B (sans sa haste)
OUT["Ь"] = G(17).v(2, 0, CAP).add(bowl)
OUT["Ъ"] = G(19).h(0, 4, 17).v(4, 0, CAP).add(bowl, dx=2)
OUT["Ы"] = G(20).v(2, 0, CAP).add(bowl, dx=-1).v(16, 0, CAP)
w, C = latin("C")
OUT["Э"] = G(w).add(mirror(w, C)).h(6, 15, 9)
w, O = latin("O")
narrow = {(x if x < 7 else x - 4, y) for x, y in O if not 7 <= x <= 10}
OUT["Ю"] = G(21).v(2, 0, CAP).h(4, 7, 9).add(narrow, dx=5)
w, R = latin("R")
OUT["Я"] = G(w).add(mirror(w, R))

# ---------- Minuscules ----------
w, o = latin("o")
OUT["б"] = G(w).add(o).v(2, 7, 16).h(3, 11, 17).cut((2, 16), (2, 17))
OUT["в"] = G(14).v(2, 0, XH).h(2, 9, 12).h(2, 10, 6).h(2, 10, 0).v(10, 8, 11).v(11, 2, 5).cut((11, 13), (12, 6), (12, 0), (12, 1))
OUT["г"] = G(13).v(2, 0, XH).h(2, 10, 12)
OUT["д"] = G(17).h(5, 12, 12).v(5, 2, XH).v(11, 2, XH).h(1, 14, 0).v(1, -3, 1).v(13, -3, 1).cut((4, 2))
g = G(20).v(9, 0, XH)
g.line(11, 6, 17, 12).line(11, 6, 17, 0).line(7, 6, 1, 12).line(7, 6, 1, 0)
g.rect(17, 18, 12, 13).rect(1, 2, 12, 13)
OUT["ж"] = g
OUT["з"] = G(14).h(3, 9, 12).v(10, 8, 11).h(5, 10, 6).v(11, 2, 5).h(3, 10, 0).cut((10, 13), (11, 6), (11, 0), (11, 1))
g = G(15).v(2, 0, XH).v(10, 0, XH).line(4, 2, 9, 11)
OUT["и"] = g
g = G(15).v(2, 0, XH).v(10, 0, XH).line(4, 2, 9, 11)
OUT["й"] = g.add({(4, 18), (9, 18), (4, 17), (5, 17), (6, 17), (7, 17), (8, 17), (9, 17), (5, 16), (6, 16), (7, 16), (8, 16)})
g = G(13).v(2, 0, XH).line(4, 6, 9, 12).line(4, 6, 9, 0).rect(9, 10, 12, 13)
OUT["к"] = g
OUT["л"] = G(15).h(5, 11, 12).v(10, 0, XH).v(5, 3, XH).rect(2, 4, 0, 2).cut((2, 2))
OUT["м"] = G(18).v(2, 0, XH).v(13, 0, XH).line(4, 11, 7, 5).line(11, 11, 8, 5)
OUT["н"] = G(15).v(2, 0, XH).v(10, 0, XH).h(2, 11, 6)
OUT["п"] = G(15).v(2, 0, XH).v(10, 0, XH).h(2, 11, 12)
OUT["т"] = G(16).h(2, 12, 12).v(6, 0, XH)
g = G(18).v(8, -4, 17)
g.h(4, 13, 12).h(4, 13, 0).v(2, 2, 11).v(14, 2, 11).rect(3, 3, 1, 1).rect(3, 3, 12, 12).rect(14, 14, 1, 1).rect(14, 14, 12, 12)
OUT["ф"] = g
OUT["ц"] = G(16).v(2, 0, XH).v(10, 0, XH).h(2, 12, 0).v(12, -3, 1)
OUT["ч"] = G(14).v(2, 6, XH).h(4, 10, 4).rect(3, 4, 5, 6).v(10, 0, XH)
OUT["ш"] = G(20).v(2, 0, XH).v(8, 0, XH).v(14, 0, XH).h(2, 15, 0)
OUT["щ"] = G(22).v(2, 0, XH).v(8, 0, XH).v(14, 0, XH).h(2, 17, 0).v(16, -3, 1)
OUT["ь"] = G(14).v(2, 0, XH).h(2, 9, 6).v(10, 2, 5).h(2, 9, 0).cut((11, 6), (11, 1))
OUT["ъ"] = G(16).h(0, 3, 12).v(3, 0, XH).h(3, 10, 6).v(11, 2, 5).h(3, 10, 0).cut((12, 6), (12, 1))
OUT["ы"] = G(18).v(2, 0, XH).h(2, 8, 6).v(9, 2, 5).h(2, 8, 0).cut((10, 6), (10, 1)).v(14, 0, XH)
w, c = latin("c")
OUT["э"] = G(w).add(mirror(w, c)).h(5, 10, 6)
narrow_o = {(x if x < 6 else x - 3, y) for x, y in o if not 6 <= x <= 8}
OUT["ю"] = G(19).v(2, 0, XH).h(4, 6, 6).add(narrow_o, dx=5)
OUT["я"] = G(14).v(10, 0, XH).h(3, 10, 12).v(1, 8, 11).h(3, 10, 6).line(6, 5, 2, 0).cut((1, 12), (1, 7))

# lettres reprises telles quelles du latin (contour copié de la police) : { cyrillique: latin }
SAME = dict(zip("АВЕКМНОРСТХЁаеорсухё", "ABEKMHOPCTXËaeopcyxë"))

if __name__ == "__main__":
    json.dump({k: {"w": g.w, "cells": sorted(g.c)} for k, g in OUT.items()} | {"_same": SAME}, open(sys.argv[2], "w"), ensure_ascii=False)
    for k, g in OUT.items():
        if len(sys.argv) > 3 and k not in sys.argv[3]:
            continue
        print(k, g.w)
        for y in range(23, -5, -1):
            print("".join("#" if (x, y) in g.c else "." for x in range(g.w)))
