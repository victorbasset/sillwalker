# (it. 1176) Captures d'écran 1920×1080 à partir des plans tournés (scripts/promo/shoot.mjs), par edit.py (une image par
# scène). Deux séries : « steam » (du jeu seul, sans texte publicitaire : règles de Steam) et « promo » (accroche et
# logo, pour itch.io et les réseaux). Usage : python3 scripts/promo/stills.py <steam|promo> <edl.json>
import json, sys
SERIES, OUT = sys.argv[1], sys.argv[2]
G, L, R = [255, 217, 138], [236, 232, 255], [255, 120, 110]
F = 1 / 30
CU = lambda x: [[x, 1040, 480], [x, 1040, 480]]
EV = lambda x: [[x, 1040, 640], [x, 1040, 640]]  # (it. 1176) événements ×3 (640×200 → 1920×600)
SHOTS = [
    # (plan, instant, type, rect, cam, suivi du héros, accroche, sous-titre)
    ("walk", 5.0, "desktop", None, [[0, 0, 3840], [0, 0, 3840]], None, "Your taskbar has a new neighbour.", "An idle RPG that lives on the edge of your screen"),
    ("walk", 4.5, "clip", [0, 140, 1920, 800], CU(0), 150, "A tiny hero. A big adventure.", "Fights, loots and grows stronger while you work"),
    ("bloodmoon", 5.0, "clip", [0, 240, 1920, 600], EV(1150), None, "BLOOD MOON", "14 rare events turn the road upside down"),
    ("npc-shop", 5.0, "clip", [0, 390, 1920, 300], [[1080, 1040, 1280], [1080, 1040, 1280]], None, "Meet the folk of the Sill.", "Every tab has its inhabitant, met along the road"),
    ("p-graph", 5.0, "clip", [0, 230, 1920, 620], [[0, 0, 3840], [0, 0, 3840]], None, "A 618-node great graph", "Paths to choose, synergies that change how you play"),
    ("p-mastery", 4.0, "clip", [0, 230, 1920, 620], [[0, 0, 3840], [0, 0, 3840]], None, "Real choices", "Two bonuses at every mastery milestone"),
    ("p-adventure", 3.0, "clip", [0, 230, 1920, 620], [[0, 0, 3840], [0, 0, 3840]], None, "Gear up and forge", "Sets, legendary powers, a forge and a merchant"),
    ("p-bestiary", 3.0, "clip", [0, 230, 1920, 620], [[0, 0, 3840], [0, 0, 3840]], None, "Collect them all", "83 monsters, elites, sets and rare events"),
    ("endfight", 3.0, "clip", [0, 340, 1920, 400], [[1500, 1040, 960], [1500, 1040, 960]], 200, "Grow absurdly powerful.", "20 heroes, fighting in pairs"),
    ("p-map", 3.0, "clip", [0, 230, 1920, 620], [[0, 0, 3840], [0, 0, 3840]], None, "200 zones to cross", "Free the captive heroes, uncover the chronicles"),
    ("starfall", 5.0, "clip", [0, 240, 1920, 600], EV(1150), 180, "STAR SWARM", "Catch the falling stars before they fade"),
    ("p-shop", 3.0, "clip", [0, 230, 1920, 620], [[0, 0, 3840], [0, 0, 3840]], None, "Every comfort is earned", "Unlock automations in the shop as you progress"),
    ("goblinrush", 6.0, "clip", [0, 340, 1920, 400], [[980, 1040, 960], [980, 1040, 960]], 180, "GOBLIN RUSH", "Golden goblins, everywhere"),
]
S = []
for src, t0, typ, rect, cam, tr, head, sub in SHOTS:
    sc = {"type": typ, "src": src, "t0": t0, "dur": F, "cam": cam, "fade": 0, "title_in": False}
    if rect: sc["rect"] = rect
    if src == "npc-shop": sc["smooth"] = True  # ×1,5 (Mirette, sa maison et toute sa réplique, it. 1179)
    if src == "bloodmoon":  # (it. 1177) toute la bande, en deux moitiés empilées (×1) : le cortège entier d'élites
        sc["rect"] = [0, 330, 1920, 200]; sc["cam"] = [[0, 1040, 1920], [0, 1040, 1920]]
        sc["extra"] = [{"cam": [1920, 1040, 1920], "rect": [0, 590, 1920, 200]}]
    if tr is not None: sc["track"] = tr
    if SERIES == "promo":
        panel = rect and rect[3] == 620  # (it. 1178) fenêtre entière (3840 → 1920 : taille réelle d'un écran 1920)
        if src == "bloodmoon":
            sc["rect"] = [0, 380, 1920, 200]; sc["extra"] = [{"cam": [1920, 1040, 1920], "rect": [0, 640, 1920, 200]}]
        elif rect and rect[3] in (300, 400):
            sc["rect"] = [0, 300 if rect[3] == 400 else 360, 1920, rect[3]]
        elif rect and rect[3] in (600, 800) and rect[1] < 230:  # bande sous l'accroche
            sc["rect"] = [0, 230 if rect[3] == 800 else 300, 1920, rect[3]]
        if panel:  # vue du panneau : réduite pour laisser la place à l'accroche
            sc["rect"] = [0, 250, 1920, 620]
        top = 40 if not panel else 30
        sc["title"] = [[head, "title", 76, R if head == "BLOOD MOON" else ([140, 200, 255] if head == "STAR SWARM" else G), top], [sub, "body", 34, L, top + 96]]
        sc["plate"] = typ == "desktop"
        sc["logo"] = ["steam/capsules/library-logo.png", 1000, 0]
    S.append(sc)
json.dump({"scenes": S}, open(OUT, "w"), indent=1)
print(SERIES, len(S))
