# (it. 1172) Montage de la bande-annonce (version anglaise), calé sur la musique (air de la zone 126, 89 bpm : 1 mesure = 2,697 s).
# Produit la liste des scènes pour edit.py : python3 scripts/promo/trailer.py <edl.json>
import json, sys
BAR = 60 / 89 * 4
G, L, R = [255, 217, 138], [236, 232, 255], [255, 120, 110]
def T(t, y, size=64, col=G, f="title"): return [t, f, size, col, y]
CU = lambda x0, x1: [[x0, 1040, 640], [x1, 1040, 640]]            # gros plan ×3 (cadrage 640×200 → 1920×600)
MED = lambda x0, x1: [[x0, 1040, 1920], [x1, 1040, 1920]]         # plan moyen ×1 (1920×200)
S = []
def sc(bars, **k): k["dur"] = round(bars * BAR, 4); S.append(k)
sc(2, type="card", logo=["steam/capsules/library-logo.png", 380, 900], fade=12)
sc(2, type="desktop", src="walk", t0=1, cam=[[0, 0, 3840], [700, 1500, 1500]], fade=4, title=[T("Your taskbar has a new neighbour.", 110, 56)])
sc(1, type="clip", src="walk", t0=4, rect=[0, 300, 1920, 600], cam=CU(760, 860), fade=0, title=[T("A tiny hero walks the edge of your screen.", 140, 48)])
sc(1, type="clip", src="walk", t0=6.8, rect=[0, 300, 1920, 600], cam=CU(840, 980), fade=0, title=[T("Fights. Loots. Grows stronger.", 140, 52)])
sc(2, type="clip", src="npc-shop", t0=1.2, rect=[0, 300, 1920, 600], cam=CU(880, 1250), fade=0, title=[T("Meet the folk of the Sill.", 140, 52)])
sc(1, type="clip", src="bloodmoon", t0=2, rect=[0, 460, 1920, 200], cam=MED(700, 1000), fade=0, title=[T("BLOOD MOON", 230, 96, R), T("every monster turns elite", 350, 34, L, "body")])
sc(1, type="clip", src="starfall", t0=1.5, rect=[0, 460, 1920, 200], cam=MED(600, 900), fade=0, title=[T("STAR SWARM", 230, 96, [170, 210, 255]), T("catch the falling stars", 350, 34, L, "body")])
sc(1, type="clip", src="goblinrush", t0=1.5, rect=[0, 460, 1920, 200], cam=MED(700, 1000), fade=0, title=[T("GOBLIN RUSH", 230, 96, [140, 230, 120]), T("golden goblins, everywhere", 350, 34, L, "body")])
sc(1, type="clip", src="goldrain", t0=1, rect=[0, 460, 1920, 200], cam=MED(700, 1000), fade=0, title=[T("RAIN OF GOLD", 230, 96), T("and 10 more rare events", 350, 34, L, "body")])
sc(2, type="clip", src="relic", t0=1, rect=[0, 380, 1920, 200], cam=MED(960, 1000), fade=0, title=[T("Bosses guard ancient relics.", 200, 56)])
sc(2, type="clip", src="p-graph", t0=2, rect=[160, 60, 1600, 900], cam=[[1500, 40, 1600], [1700, 80, 1600]], fade=0, title=[T("A 618-node great graph.", 990, 52)])
sc(1, type="clip", src="p-mastery", t0=2, rect=[160, 60, 1600, 900], cam=[[600, 60, 1600], [650, 70, 1600]], fade=0, title=[T("Real choices, every milestone.", 990, 52)])
sc(1, type="clip", src="endfight", t0=2, rect=[0, 300, 1920, 600], cam=CU(820, 900), fade=0, title=[T("Grow absurdly powerful.", 140, 56)])
sc(1, type="clip", src="p-bestiary", t0=1, rect=[160, 60, 1600, 900], cam=[[0, 60, 1600], [80, 80, 1600]], fade=0, title=[T("83 monsters. 20 heroes. 14 rare events.", 990, 48)])
for src, t0, x in [("bloodmoon", 6, 900), ("goblinrush", 6, 1200), ("starfall", 6, 800), ("npc-shop", 7, 1000)]:
    sc(0.5, type="clip", src=src, t0=t0, rect=[0, 240, 1920, 600], cam=CU(x, x + 40), fade=0)
sc(3, type="card", logo=["steam/capsules/library-logo.png", 300, 760], fade=14, bg="dawn",
   title=[T("An idle RPG on the edge of your screen", 560, 40, L, "body"), T("Wishlist on Steam  ·  Play now on itch.io", 660, 44), T("Windows  ·  macOS  ·  Linux", 760, 30, [170, 160, 210], "body")])
json.dump({"scenes": S}, open(sys.argv[1], "w"), indent=1)
print(len(S), "scènes", round(sum(s["dur"] for s in S), 2), "s")
