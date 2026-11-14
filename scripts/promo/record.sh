#!/usr/bin/env bash
# (it. 1167) Filme UN plan de la bande-annonce : le jeu VISIBLE sur un écran virtuel 3840×2160 à l'échelle ×2
# (--force-device-scale-factor=2 : pixels et textes nets en gros plan), sur une COPIE de sauvegarde, avec une mise en
# scène (--stage=<fichier.js>) ; la fenêtre (3840×1240 : panneau + bande) est filmée en 30 images/s.
# Usage : scripts/promo/record.sh <save.json> <stage.js|-> <secondes> <sortie.mp4> [écran=91] [délai avant de filmer=6]
# (it. 1192) journal vidé dans la copie : il garde la langue de la partie d'origine (lignes anglaises en français).
# Variables : FF (ffmpeg), LANG_UI (langue de la copie, en par défaut), EXTRA (options du jeu en plus, ex. --open-panel).
set -e
SAVE="$1"; STAGE="$2"; SECS="$3"; OUT="$4"; DISP="${5:-91}"; WAIT="${6:-6}"
FF="${FF:?FF=<ffmpeg>}"
cd "$(dirname "$0")/../.."
D=$(mktemp -d); node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync(process.argv[1]));s.settings=s.settings||{};s.settings.lang=process.env.LANG_UI||'en';s.settings.newsSeen=999;s.log=[];s.last=Date.now();fs.writeFileSync(process.argv[2],JSON.stringify(s))" "$SAVE" "$D/save.json"
Xvfb :$DISP -screen 0 3840x2160x24 -nolisten tcp >/dev/null 2>&1 & XPID=$!
trap 'kill $XPID 2>/dev/null || true; rm -rf "$D"' EXIT
sleep 1
ST=(); [ "$STAGE" != "-" ] && ST=(--stage="$(realpath "$STAGE")")
DISPLAY=:$DISP timeout $((SECS + WAIT + 20)) ./node_modules/.bin/electron . --no-sandbox --release-ui --force-device-scale-factor=2 --user-data="$D" "${ST[@]}" ${EXTRA:-} --exit-after=$((SECS + WAIT + 4)) >"${OUT%.mp4}.log" 2>&1 & EPID=$!
sleep "$WAIT"
date +%s%3N > "${OUT%.mp4}.t0"   # (it. 1174) début du film (ms) : la position du héros notée par la mise en scène s'y cale
"$FF" -hide_banner -loglevel error -y -f x11grab -draw_mouse 0 -framerate 30 -video_size 3840x1240 -i :$DISP+0,920 -t "$SECS" -c:v libx264 -crf 12 -preset ultrafast -pix_fmt yuv444p "$OUT"
wait $EPID 2>/dev/null || true
echo "$OUT"
