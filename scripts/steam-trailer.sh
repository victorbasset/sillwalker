#!/usr/bin/env bash
# (it. 789) Bande-annonce (≈ 40 s, 1920×1080) : titre, la bande seule, le panneau et cinq onglets (--tour), la bande, titre.
# Le jeu tourne sur un écran virtuel à part (Xvfb :77, fenêtre visible) avec une COPIE de sauvegarde ; la fenêtre
# (1920×620) est filmée puis posée sur le bureau des captures (scripts/steam-compose.py) : sans compositeur d'écran, la
# zone transparente au-dessus de la bande sort en noir pur, rendu transparent (colorkey ; le jeu n'utilise pas #000).
# Usage : scripts/steam-trailer.sh <dossier-données-copie> <sortie.mp4> <ffmpeg> <python-avec-Pillow>
set -e
DATA="$1"; OUT="$2"; FF="$3"; PY="$4"; TMP="$(mktemp -d)"
cd "$(dirname "$0")/.."
"$PY" -c "
import sys; sys.argv=['x','x','x']
exec(open('scripts/steam-compose.py').read().split('def main')[0])
from PIL import Image
bg=desktop(); bg.save('$TMP/desk.png')
logo=Image.open('steam/capsules/library-logo.png').convert('RGBA'); t=bg.copy(); t.paste(logo,((1920-logo.width)//2,(1080-48-logo.height)//2),logo); t.save('$TMP/title.png')"
Xvfb :77 -screen 0 1920x1080x24 -nolisten tcp >/dev/null 2>&1 & XPID=$!
sleep 1
DISPLAY=:77 timeout 70 ./node_modules/.bin/electron . --no-sandbox --user-data="$DATA" --release-ui --tour --exit-after=55 >/dev/null 2>&1 &
sleep 4
"$FF" -hide_banner -loglevel error -y -f x11grab -draw_mouse 0 -framerate 30 -video_size 1920x620 -i :77+0,460 -t 40 -c:v libx264 -crf 12 -preset fast -pix_fmt yuv444p "$TMP/win.mp4"
kill "$XPID" 2>/dev/null || true
# fenêtre (sans les 2 premières secondes de chargement) posée sur le bureau, titre au début et à la fin
"$FF" -hide_banner -loglevel error -y \
  -loop 1 -t 3 -i "$TMP/title.png" \
  -loop 1 -i "$TMP/desk.png" -ss 4 -i "$TMP/win.mp4" \
  -loop 1 -t 3 -i "$TMP/title.png" \
  -filter_complex "[2:v]colorkey=0x000000:0.01:0[w];[1:v][w]overlay=0:412:shortest=1,format=yuv420p,setsar=1[m];[0:v]format=yuv420p,setsar=1,fade=t=out:st=2.5:d=0.5[a];[3:v]format=yuv420p,setsar=1,fade=t=in:st=0:d=0.5[z];[a][m][z]concat=n=3:v=1:a=0,fps=30[v]" \
  -map "[v]" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT"
rm -rf "$TMP"
echo "$OUT"
