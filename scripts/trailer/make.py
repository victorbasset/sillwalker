# (it. 807) Bande-annonce « histoire » (≈ 66 s, 1920×1080, anglais) montée avec ffmpeg à partir de :
#   raw.mp4    : la fenêtre du jeu filmée (1920×620) avec l'option de dev --trailer (minutage fixe, main.js)
#   calm/mid/boss.wav : musique du jeu rendue hors ligne (scripts/trailer/music.js)
#   title.ttf / body.ttf : Pixelify Sans 700 et Geist Pixel converties (fontTools)
#   steam/capsules/library-hero.png, library-logo.png ; steam-compose.py (bureau)
# Cartons de l'histoire, gros plans agrandis au pixel près (bandeau de cinéma), dézoom qui révèle la bande au bord
# du bureau, panneau légendé, logo. Usage : python3 scripts/trailer/make.py <dossier-de-travail> <sortie.mp4> <ffmpeg>
import os, subprocess, sys

WORK, OUT, FF = sys.argv[1], sys.argv[2], sys.argv[3]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
RAW = os.path.join(WORK, "raw.mp4")
TITLE, BODY = os.path.join(WORK, "title.ttf"), os.path.join(WORK, "body.ttf")
HERO = os.path.join(ROOT, "steam", "capsules", "library-hero.png")
LOGO = os.path.join(ROOT, "steam", "capsules", "library-logo.png")
FPS, GOLD, INK = 30, "0xffd98a", "0x14121f"
segs = []


def run(args):
    subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def textfile(name, text):
    p = os.path.join(WORK, name + ".txt")
    with open(p, "w", encoding="utf-8") as f:
        f.write(text)
    return p


def caption(name, text, y, size=54, font=None, color=GOLD, t_in=0.4):
    """drawtext centré, contour sombre, apparition en fondu."""
    return (f"drawtext=fontfile='{font or TITLE}':textfile='{textfile(name, text)}':fontcolor={color}:fontsize={size}"
            f":borderw={max(3, size // 12)}:bordercolor={INK}:x=(w-tw)/2:y={y}"
            f":alpha='if(lt(t,{t_in}),0,min(1,(t-{t_in})/0.5))'")


def finish(name, dur, vf_tail=""):
    segs.append((os.path.join(WORK, name + ".mp4"), dur))
    return f",fade=t=in:st=0:d=0.35,fade=t=out:st={dur - 0.4}:d=0.4,format=yuv420p{vf_tail}"


def sky_bg(dur, darken=0.55, zoom_speed=0.0004):
    """Fond : la scène des capsules (pixel art), lent travelling, assombrie."""
    # seulement le ciel (haut de l'image, sans les personnages) : fond calme pour le texte et les gros plans
    return (f"[0:v]crop=iw:ih*0.55:0:0,scale=-1:1080:flags=neighbor,crop=1920:1080:'(iw-1920)*t/{dur * 3}':0,"
            f"zoompan=z='1+{zoom_speed}*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1920x1080:fps={FPS},"
            f"eq=brightness=-{darken / 3}:saturation=0.8,boxblur=2:1[bg]")


def card(name, lines, dur=4.5):
    """Carton de l'histoire : texte sur le ciel du jeu."""
    y0 = 540 - 45 * len(lines)
    txt = ",".join(caption(f"{name}{i}", l, y0 + 90 * i, 62, t_in=0.3 + 0.9 * i) for i, l in enumerate(lines))
    vf = sky_bg(dur) + f";[bg]{txt}" + finish(name, dur) + "[v]"
    run(["-loop", "1", "-t", str(dur), "-i", HERO, "-filter_complex", vf, "-map", "[v]", "-r", str(FPS), segs[-1][0]])


def band(name, start, dur, x, w, zoom=2, cap=None):
    """Gros plan sur la bande : crop de la bande (y 500, h 120), agrandi au pixel près, en bandeau sur le ciel."""
    h = 120 * zoom
    vf = (sky_bg(dur, 0.8) + f";[1:v]crop={w}:120:{x}:500,scale={w * zoom}:{h}:flags=neighbor,"
          f"zoompan=z='1+0.0006*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s={w * zoom}x{h}:fps={FPS}[b];"
          f"[bg][b]overlay=(W-w)/2:(H-h)/2" + (("," + caption(name + "c", cap, 540 + h // 2 + 50, 50)) if cap else "")
          + finish(name, dur) + "[v]")
    run(["-loop", "1", "-t", str(dur), "-i", HERO, "-ss", str(start), "-t", str(dur), "-i", RAW,
         "-filter_complex", vf, "-map", "[v]", "-r", str(FPS), segs[-1][0]])


def panel(name, start, dur, cap):
    """Le panneau entier (fenêtre 1920×620) sur le ciel, légende au-dessus."""
    vf = (sky_bg(dur, 0.9) + f";[1:v]scale=1920:620[p];[bg][p]overlay=0:300,"
          + caption(name + "c", cap, 170, 64, t_in=0.1) + finish(name, dur) + "[v]")
    run(["-loop", "1", "-t", str(dur), "-i", HERO, "-ss", str(start), "-t", str(dur), "-i", RAW,
         "-filter_complex", vf, "-map", "[v]", "-r", str(FPS), segs[-1][0]])


def reveal(name, start, dur, hx):
    """Dézoom : du héros (×3,2) au bureau entier, la bande au bord de l'écran ; noir pur de la fenêtre = transparent."""
    desk = os.path.join(WORK, "desk.png")
    hy = 912 + 60
    z = f"max(1,3.2-on*{2.2 / (FPS * (dur - 2.5))})"
    # la bande seule (sans les bulles du jeu au-dessus), posée juste au-dessus de la barre des tâches
    vf = (f"[1:v]crop=1920:120:0:500[w];[0:v][w]overlay=0:912,"
          f"zoompan=z='{z}':x='max(0,min(iw-iw/zoom,{hx}-iw/zoom/2))':y='max(0,min(ih-ih/zoom,{hy}-ih/zoom/2))':d=1:s=1920x1080:fps={FPS},"
          + caption(name + "c", "An idle RPG that lives on the edge of your screen", 120, 58, t_in=dur - 2.6)
          + finish(name, dur) + "[v]")
    run(["-loop", "1", "-t", str(dur), "-i", desk, "-ss", str(start), "-t", str(dur), "-i", RAW,
         "-filter_complex", vf, "-map", "[v]", "-r", str(FPS), segs[-1][0]])


def ending(name, dur=6.5):
    vf = (sky_bg(dur, 0.6) + ";[1:v]scale=1100:-1:flags=neighbor[l];[bg][l]overlay=(W-w)/2:150,"
          + caption(name + "a", "An idle RPG on the edge of your screen", 690, 46, font=BODY, color="0xe8e4f0", t_in=0.8) + ","
          + caption(name + "b", "Wishlist on Steam   *   Play now on itch.io", 800, 56, t_in=1.6) + finish(name, dur) + "[v]")
    run(["-loop", "1", "-t", str(dur), "-i", HERO, "-loop", "1", "-t", str(dur), "-i", LOGO,
         "-filter_complex", vf, "-map", "[v]", "-r", str(FPS), segs[-1][0]])


# le bureau des captures (même que steam-compose.py)
exec(open(os.path.join(ROOT, "scripts", "steam-compose.py"), encoding="utf-8").read().split("def main")[0])
desktop().save(os.path.join(WORK, "desk.png"))

card("s01", ["A thousand years ago,", "the Starbreaker shattered the sky."], 5)
band("s02", 2.5, 6, 480, 960)
card("s03", ["Its lieutenants hold", "the last heroes captive."], 4.5)
band("s04", 24.2, 5.5, 400, 960)
band("s05", 38.5, 6, 480, 960)
card("s06", ["One wanderer still walks the Sill.", "Yours."], 4.5)
reveal("s07", 13, 7.5, 700)
band("s08", 86, 5, 0, 640, 3, "Fight. Loot. Grow stronger. Even while you work.")
panel("s09", 63.6, 3.2, "A 144-node skill tree")
panel("s10", 68.2, 3.2, "Explore the Sill")
panel("s11", 73.2, 3.2, "Free 20 heroes, fight in pairs")
panel("s12", 79.6, 3.2, "Pets, expeditions, relics")
band("s13", 97, 5.5, 480, 960, 2)
ending("s14")

# assemblage + musique (calme → milieu → boss), normalisée, fondu final
lst = os.path.join(WORK, "list.txt")
with open(lst, "w") as f:
    f.writelines(f"file '{p}'\n" for p, _ in segs)
total = sum(d for _, d in segs)
video = os.path.join(WORK, "video.mp4")
run(["-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", video])
# durée réelle (des plans sortent un peu plus courts que demandé) : le fondu final de la musique doit tomber dessus
import re
probe = subprocess.run([FF, "-hide_banner", "-i", video], capture_output=True, text=True).stderr
h, m, sec = re.search(r"Duration: (\d+):(\d+):([\d.]+)", probe).groups()
total = int(h) * 3600 + int(m) * 60 + float(sec)
af = ("[1:a][2:a]acrossfade=d=2[a12];[a12][3:a]acrossfade=d=2,"
      f"atrim=0:{total},loudnorm=I=-16:TP=-1.5,afade=t=in:st=0:d=1,afade=t=out:st={total - 3}:d=3[a]")
run(["-i", video, "-i", os.path.join(WORK, "calm.wav"), "-i", os.path.join(WORK, "mid.wav"), "-i", os.path.join(WORK, "boss.wav"),
     "-filter_complex", af, "-map", "0:v", "-map", "[a]", "-c:v", "libx264", "-crf", "17", "-preset", "slow",
     "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", "-shortest", OUT])
print(f"{OUT} : {total:.1f} s, {len(segs)} plans")
