# (it. 1186) GIF animés pour la page itch.io (description) : boucles de quelques secondes de la bande, nettes au pixel
# (rendu ×2 du tournage, sans mise à l'échelle), cadrées sur le héros d'après son journal de position (fixe pendant la
# boucle : une caméra qui glisse rend la palette du GIF instable). Palette par GIF (palettegen), 15 images/s.
# Usage : python3 gifs.py <dossier des plans> <ffmpeg> <dossier de sortie>
import os, re, subprocess, sys
SHOTS, FF, OUT = sys.argv[1:4]
GIFS = [  # (nom, plan, début, durée, largeur du cadre (px du tournage), position du héros dans le cadre)
    ("walk", "walk", 3.0, 5.0, 960, 160),
    ("blood-moon", "bloodmoon", 2.0, 5.0, 1440, 160),
    ("goblin-rush", "goblinrush", 3.0, 5.0, 960, 160),
    ("star-swarm", "starfall", 2.0, 5.0, 960, 160),
    ("endgame", "endfight", 2.0, 4.0, 1200, 200),
]


def hero_at(src, a, b):
    try:
        t0 = int(open(os.path.join(SHOTS, src + ".t0")).read())
        txt = open(os.path.join(SHOTS, src + ".log"), encoding="utf-8", errors="ignore").read()
    except OSError:
        return None
    xs = [int(x) for ms, x in re.findall(r"\[hx\] (\d+) (-?\d+)", txt) if a <= (int(ms) - t0) / 1000 <= b]
    return sum(xs) / len(xs) if xs else None


os.makedirs(OUT, exist_ok=True)
for name, src, t, d, w, lead in GIFS:
    hx = hero_at(src, t, t + d)
    x = 0 if hx is None else int(max(0, min(3840 - w, hx * 2 - lead)))
    crop = f"crop={w}:240:{x}:1000,fps=15"
    out = os.path.join(OUT, f"sillwalker-{name}.gif")
    subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-ss", str(t), "-t", str(d), "-i", os.path.join(SHOTS, src + ".mp4"),
                    "-filter_complex", f"[0]{crop},split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle",
                    out], check=True)
    print(f"{out}  {w}×240  {os.path.getsize(out) // 1024} Ko")
