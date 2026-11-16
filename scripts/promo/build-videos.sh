#!/usr/bin/env bash
# (it. 1684, demandes de Victor) Monte les bandes-annonces sur la bande originale : pour chaque langue, la complète (24
# mesures), la courte (11 mesures, réseaux) et la verticale (11 mesures, 1080×1920), à partir des plans tournés par
# shoot.mjs (<travail>/shots-<langue>) et d'un morceau en WAV (scripts/trailer/music.js, MUSIC_TRACKS="rebord:rebord").
# Musique : « Le Rebord » (82 bpm, thème à la mesure 4) ; PROMO_BPM et PROMO_THEME_BAR pour un autre morceau (Les
# Lieutenants : 96 et 8). L'extrait commence pour que le premier plan du héros tombe sur l'entrée du thème : complète
# 3 mesures avant (bureau, musique étouffée), courte 2 mesures avant, verticale 1 mesure avant (logo).
# Usage : scripts/promo/build-videos.sh <travail> <morceau.wav> <sortie> <python-avec-Pillow-numpy-fontTools> <ffmpeg> [langues]
set -e
WORK="$1"; SONG="$2"; OUT="$3"; PY="$4"; FF="$5"; LANGS="${6:-en fr de es pt pl ru zh ja ko}"
cd "$(dirname "$0")/../.."
mkdir -p "$OUT" "$WORK/edl" "$WORK/mix"
export PROMO_BPM="${PROMO_BPM:-82}"; TB="${PROMO_THEME_BAR:-4}"
CJK=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
for L in $LANGS; do
  case $L in
    ru) FB="$WORK/fonts/cyr.ttf" ;;
    zh) FB="$CJK#2" ;; ja) FB="$CJK#0" ;; ko) FB="$CJK#1" ;;
    *) FB="$WORK/fonts/latx.ttf" ;;
  esac
  for C in long short vertical; do
    case $C in
      long) CUT=""; START=$((TB - 3)); BARS=24; MUF=3; SIZE=""; NAME="sillwalker-trailer-$L" ;;
      short) CUT=short; START=$((TB - 2)); BARS=11; MUF=2; SIZE=""; NAME="sillwalker-30s-$L" ;;
      vertical) CUT=vertical; START=$((TB - 1)); BARS=11; MUF=1; SIZE=1080x1920; NAME="sillwalker-vertical-$L" ;;
    esac
    E="$WORK/edl/$L-$C.json"
    PROMO_LANG=$L CUT=$CUT "$PY" scripts/promo/trailer.py "$E" >/dev/null
    "$PY" -I scripts/promo/music.py "$SONG" "$WORK/mix/mus-$C.wav" "$FF" --bpm $PROMO_BPM --start $START --bars $BARS --muffle $MUF >/dev/null
    "$PY" scripts/promo/sfx.py "$E" "$WORK/mix/mus-$C.wav" "$WORK/mix/mix-$L-$C.wav" >/dev/null
    PROMO_LANG=$L PROMO_FALLBACK="$FB" PROMO_SIZE=$SIZE "$PY" scripts/promo/edit.py "$E" "$WORK/shots-$L" "$WORK/fonts" "$OUT/$NAME.mp4" "$FF" "$WORK/mix/mix-$L-$C.wav" >/dev/null
    echo "$NAME.mp4"
  done
done
