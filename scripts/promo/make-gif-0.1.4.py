# GIF promotionnel (it. 1541) : bureau entier -> zoom sur les barres de vie et la Lune pâle -> traversée jusqu'au combat
# -> carton final. Images de la bande filmées (src/), posées sur le bureau de scripts/steam-compose.py.
import sys, os, glob, math
from PIL import Image, ImageDraw, ImageFont
REPO = "/home/claude/sillwalker"
G = os.path.dirname(os.path.abspath(__file__))
sys.argv = ["x", "x", "x"]
exec(open(REPO + "/scripts/steam-compose.py").read().split("def main")[0])
desk = desktop().convert("RGB")
OW, OH, FPS = 1280, 720, 15
WIN_Y = 1080 - 48 - 620  # la fenêtre du jeu posée au-dessus de la barre des tâches

frames = sorted(glob.glob(G + "/src/*.png"))

def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)

def lerp(a, b, t):
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(4))

FULL = (0, 0, 1920, 1080)
HUD = (200, 720, 200 + 640, 720 + 360)      # barres de vie et « Pale Moon » (zoom ×2 exact : pixels nets)
FIGHT = (1280, 720, 1280 + 640, 720 + 360)  # le duo contre le boss
# chronologie (secondes) : plan large, zoom, tenue, traversée, tenue
KEYS = [(0.0, FULL), (1.4, FULL), (3.2, HUD), (4.4, HUD), (6.6, FIGHT), (9.0, FIGHT)]

def rect_at(t):
    for (t0, r0), (t1, r1) in zip(KEYS, KEYS[1:]):
        if t <= t1:
            return lerp(r0, r1, ease((t - t0) / (t1 - t0)) if t1 > t0 else 1)
    return KEYS[-1][1]

out = G + "/frames"
os.makedirs(out, exist_ok=True)
for f in glob.glob(out + "/*.png"):
    os.remove(f)
n = 0
for i, fp in enumerate(frames):
    t = i / FPS
    win = Image.open(fp).convert("RGB")
    # fond noir de la fenêtre (zone transparente sans compositeur) -> bureau
    mask = win.convert("L").point(lambda v: 255 if v > 3 else 0)
    canvas = desk.copy()
    canvas.paste(win, (0, WIN_Y), mask)
    x0, y0, x1, y1 = rect_at(t)
    crop = canvas.crop((round(x0), round(y0), round(x1), round(y1)))
    scale = OW / (x1 - x0)
    crop = crop.resize((OW, OH), Image.NEAREST if abs(scale - round(scale)) < 0.01 and scale >= 2 else Image.LANCZOS)
    crop.save(f"{out}/{n:04d}.png"); n += 1

# carton final : logo, accroche, lien
logo = Image.open(REPO + "/steam/capsules/library-logo.png").convert("RGBA")
font_path = G + "/pixelify.ttf"
if not os.path.exists(font_path):
    from fontTools.ttLib import TTFont
    ft = TTFont(REPO + "/src/renderer/assets/fonts/pixelify-sans-latin-700-normal.woff2"); ft.flavor = None; ft.save(font_path)
F1 = ImageFont.truetype(font_path, 40); F2 = ImageFont.truetype(font_path, 32)
card = desk.resize((OW, OH), Image.LANCZOS).convert("RGBA")
shade = Image.new("RGBA", (OW, OH), (13, 11, 31, 170)); card = Image.alpha_composite(card, shade)
lg = logo.resize((830, logo.height * 830 // logo.width), Image.LANCZOS)
card.alpha_composite(lg, ((OW - lg.width) // 2, 50))
d = ImageDraw.Draw(card)
def ctext(y, s, font, fill):
    w = d.textlength(s, font=font); d.text(((OW - w) / 2, y), s, font=font, fill=fill, stroke_width=3, stroke_fill=(20, 18, 31))
ctext(470, "An idle RPG that lives above your taskbar", F1, (239, 230, 210))
ctext(535, "Update 0.1.4  ·  Free on itch.io until Dec 12", F2, (232, 177, 74))
card = card.convert("RGB")
# fondu de la dernière image du jeu vers le carton, puis tenue
last = Image.open(f"{out}/{n - 1:04d}.png").convert("RGB")
for k in range(1, 7):
    Image.blend(last, card, k / 6).save(f"{out}/{n:04d}.png"); n += 1
for k in range(int(FPS * 2.4)):
    card.save(f"{out}/{n:04d}.png"); n += 1
print(n, "images")
