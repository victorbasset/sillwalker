#!/usr/bin/env bash
# (it. 788) Extrait animé de la bande pour la page Steam (« À propos de ce jeu » accepte vidéo / animation) :
# lance le jeu sur un écran virtuel à part (Xvfb :77, 1920×1080, fenêtre visible : pas de --ghost) avec une COPIE de
# sauvegarde, filme la bande (1920×120 en bas de l'écran) pendant N secondes, encode en MP4 (H.264) et WebM (VP9).
# Usage : scripts/steam-video.sh <dossier-données-copie> <sortie-sans-extension> [secondes] [ffmpeg]
#   La copie doit avoir s.last = maintenant (sinon la bulle « Pendant ton absence » apparaît) ; ffmpeg : celui du
#   système, ou celui de pip imageio-ffmpeg (x11grab, libx264, libvpx-vp9).
set -e
DATA="$1"; OUT="$2"; SEC="${3:-20}"; FF="${4:-ffmpeg}"
cd "$(dirname "$0")/.."
Xvfb :77 -screen 0 1920x1080x24 -nolisten tcp >/dev/null 2>&1 & XPID=$!
sleep 1
DISPLAY=:77 timeout $((SEC + 30)) ./node_modules/.bin/electron . --no-sandbox --user-data="$DATA" --release-ui --exit-after=$((SEC + 20)) >/dev/null 2>&1 &
sleep 12
"$FF" -hide_banner -loglevel error -y -f x11grab -framerate 30 -video_size 1920x120 -i :77+0,960 -t "$SEC" \
  -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT.mp4"
kill "$XPID" 2>/dev/null || true
"$FF" -hide_banner -loglevel error -y -i "$OUT.mp4" -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 "$OUT.webm"
echo "$OUT.mp4 / $OUT.webm"
