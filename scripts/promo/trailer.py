# (it. 1172) Montage de la bande-annonce (version anglaise), calé sur la musique (air de la zone 126, 89 bpm : 1 mesure = 2,697 s).
# Produit la liste des scènes pour edit.py : python3 scripts/promo/trailer.py <edl.json>
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from texts import tr as tl
BAR = 60 / 89 * 4
G, L, R = [255, 217, 138], [236, 232, 255], [255, 120, 110]
def T(t, y, size=64, col=G, f="title"): return [tl(t), f, size, col, y]
# (it. 1173) gros plans ×4 (cadrage 480×200 → 1920×800), plans d'événements ×2 (960×200 → 1920×400)
CU = lambda x0, x1: [[x0, 1040, 480], [x1, 1040, 480]]
CUR = [0, 170, 1920, 800]
EV = lambda x0, x1: [[x0, 1040, 960], [x1, 1040, 960]]
EVR = [0, 470, 1920, 400]
PAN = [0, 60, 1920, 900]
S = []
def sc(bars, **k): k["dur"] = round(bars * BAR, 4); S.append(k)
sc(2, type="card", logo=["steam/capsules/library-logo.png", 380, 900], fade=12)
sc(2, type="desktop", src="walk", t0=1, cam=[[0, 0, 3840], [760, 1640, 1200]], fade=4, plate=True, title=[T("Your taskbar has a new neighbour.", 100, 64)])
sc(1, type="clip", src="walk", t0=4, rect=CUR, cam=CU(700, 760), track=150, fade=0, title=[T("A tiny hero walks the edge of your screen.", 60, 54)])
sc(1, type="clip", src="walk", t0=6.8, rect=CUR, cam=CU(780, 880), track=150, fade=0, title=[T("Fights. Loots. Grows stronger.", 60, 64)])
sc(1, type="clip", src="npc-shop", t0=4.2, rect=[0, 420, 1920, 300], cam=[[1060, 1040, 1280], [1100, 1040, 1280]], smooth=True, fade=0, title=[T("Meet the folk of the Sill.", 200, 72)])
sc(1, type="clip", src="p-adventure", t0=1, rect=PAN, cam=[[0, 40, 1920], [40, 50, 1920]], fade=0, title=[T("Gear up. Forge. Complete your sets.", 975, 56)])
sc(1, type="clip", src="bloodmoon", t0=2, rect=EVR, cam=EV(800, 1500), track=180, fade=0, punch=True, title=[T("BLOOD MOON", 170, 120, R), T("every monster turns elite", 330, 38, L, "body")])
sc(1, type="clip", src="starfall", t0=1.5, rect=EVR, cam=EV(700, 1300), track=180, fade=0, punch=True, title=[T("STAR SWARM", 170, 120, [170, 210, 255]), T("catch the falling stars", 330, 38, L, "body")])
sc(1, type="clip", src="goblinrush", t0=1.5, rect=EVR, cam=EV(800, 1500), track=180, fade=0, punch=True, title=[T("GOBLIN RUSH", 170, 120, [140, 230, 120]), T("golden goblins, everywhere", 330, 38, L, "body")])
sc(1, type="clip", src="goldrain", t0=1, rect=EVR, cam=EV(800, 1400), track=180, fade=0, punch=True, title=[T("RAIN OF GOLD", 170, 120), T("and 10 more rare events", 330, 38, L, "body")])
sc(2, type="clip", src="relic", t0=1, rect=[0, 470, 1920, 240], cam=[[960, 1040, 1600], [1000, 1040, 1600]], smooth=True, fade=0, title=[T("Bosses guard ancient relics.", 200, 64)])
sc(2, type="clip", src="p-graph", t0=2, rect=[160, 40, 1600, 900], cam=[[1500, 40, 1600], [1700, 80, 1600]], fade=0, title=[T("A 618-node great graph.", 965, 60)])
sc(1, type="clip", src="p-mastery", t0=2, rect=PAN, cam=[[960, 40, 1920], [960, 40, 1920]], fade=0, title=[T("Real choices, every milestone.", 975, 56)])
sc(1, type="clip", src="endfight", t0=2, rect=CUR, cam=CU(1500, 1560), track=130, fade=0, title=[T("Grow absurdly powerful.", 60, 64)])
sc(1, type="clip", src="p-bestiary", t0=1, rect=PAN, cam=[[0, 40, 1920], [0, 40, 1920]], fade=0, title=[T("83 monsters. 20 heroes. 14 rare events.", 975, 52)])
# (it. 1183) coupes rapides de la fin : quatre compositions différentes (avant : quatre gros plans du même duo, avec le
# suivi du héros, identiques à l'œil) : la Lune de sang entière, la carte, le combat de fin, la Ruée des gobelins
sc(0.5, type="clip", src="bloodmoon", t0=6, rect=[0, 300, 1920, 200], cam=[[0, 1040, 1920], [0, 1040, 1920]], fade=0, extra=[{"cam": [1920, 1040, 1920], "rect": [0, 580, 1920, 200]}])
sc(0.5, type="clip", src="p-map", t0=2, rect=[0, 230, 1920, 620], cam=[[0, 0, 3840], [0, 0, 3840]], fade=0)
sc(0.5, type="clip", src="endfight", t0=5, rect=EVR, cam=EV(1500, 1500), track=200, fade=0)
sc(0.5, type="clip", src="goblinrush", t0=4, rect=CUR, cam=CU(1300, 1330), track=120, fade=0)
sc(3, type="card", logo=["steam/capsules/library-logo.png", 300, 760], fade=14, bg="dawn",
   title=[T("An idle RPG on the edge of your screen", 560, 40, L, "body"), T("Wishlist on Steam  ·  Play now on itch.io", 660, 44), T("Windows  ·  macOS  ·  Linux", 760, 30, [170, 160, 210], "body")])
if os.environ.get("CUT") == "short":
    # (it. 1185) version courte (≈ 30 s, réseaux) : 11 mesures prises dans le montage complet (indice, mesures)
    keep = [(0, 1), (1, 2), (2, 1), (6, 1), (7, 1), (8, 1), (11, 1), (13, 1), (19, 2)]
    S = [dict(S[i], dur=round(b * BAR, 4)) for i, b in keep]
json.dump({"scenes": S}, open(sys.argv[1], "w"), indent=1)
print(len(S), "scènes", round(sum(s["dur"] for s in S), 2), "s")
