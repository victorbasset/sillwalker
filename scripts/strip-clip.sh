#!/usr/bin/env bash
# (it. 1896) Courte vidéo de la bande pour vérifier ce qui bouge (vie des monstres, compétences, gestes) : un écran virtuel
# à part (Xvfb :78, fenêtre visible, pas de --ghost, comme steam-video.sh), une COPIE de la sauvegarde de dev, une zone
# et une mise en scène au choix, puis x11grab → MP4 (1920 × 120, la bande).
# Usage : scripts/strip-clip.sh <sortie.mp4> [zone] [secondes] [ffmpeg] [mise-en-scène.js]
#   ffmpeg : celui du système, ou celui de pip imageio-ffmpeg (dans un environnement virtuel du dossier temporaire).
#   Jamais la vraie sauvegarde : la copie part de dev-data, avec s.last = maintenant (pas de bulle d'absence).
set -e
OUT="$1"; ZONE="${2:-26}"; SEC="${3:-20}"; FF="${4:-ffmpeg}"; EXTRA="$5"
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)
cp dev-data/save.json "$TMP/save.json"
node -e "const fs=require('fs'),p='$TMP/save.json',s=JSON.parse(fs.readFileSync(p));s.last=Date.now();fs.writeFileSync(p,JSON.stringify(s))"
# zone voulue, héros qui y reste (pas d'avancée), série neuve ; puis la mise en scène facultative
cat > "$TMP/stage.js" <<EOF
setTimeout(() => { const g = window.__game, s = window.__strip; g.S.zone = $ZONE; g.S.kills = 0; g.R.lineupZone = 0; g.S.autoAdvance = false;
  g.R.mon = null; g.R.mode = "walk"; g.lineup(); s.slotKey = null; }, 2000);
EOF
[ -n "$EXTRA" ] && cat "$EXTRA" >> "$TMP/stage.js"
Xvfb :78 -screen 0 1920x1080x24 -nolisten tcp >/dev/null 2>&1 & XPID=$!
sleep 1
DISPLAY=:78 timeout $((SEC + 40)) ./node_modules/.bin/electron . --no-sandbox --user-data="$TMP" --release-ui --stage="$TMP/stage.js" --exit-after=$((SEC + 25)) >/dev/null 2>&1 &
sleep 14
"$FF" -hide_banner -loglevel error -y -f x11grab -draw_mouse 0 -framerate 30 -video_size 1920x120 -i :78+0,960 -t "$SEC" \
  -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -movflags +faststart "$OUT"
kill "$XPID" 2>/dev/null || true
rm -rf "$TMP"
echo "$OUT"
