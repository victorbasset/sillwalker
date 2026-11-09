#!/bin/bash
# Mémoire du jeu dans la durée (fuites) : lance le jeu invisible sur une COPIE de dev-data, en accéléré, et relève
# la mémoire totale de ses processus toutes les 30 s. Usage (Linux) : scripts/mem-watch.sh [minutes=6] [vitesse=10]
# Repère (it. 194) : ~700 Mo stables sur 6 min à ×10 (≈ 1 h de jeu). Une croissance continue = fuite à chercher.
MIN=${1:-6}; SPEED=${2:-10}
cd "$(dirname "$0")/.."
D=$(mktemp -d /tmp/sillwalker-mem-XXXX); cp dev-data/save.json dev-data/settings.json "$D"/ 2>/dev/null
xvfb-run -a -s "-screen 0 1920x1080x24" ./node_modules/.bin/electron . --ghost --no-sandbox --user-data="$D" --speed="$SPEED" --exit-after=$((MIN * 60)) > /dev/null 2>&1 &
sleep 20
for i in $(seq 1 $((MIN * 2 - 1))); do
  echo "$((i * 30)) s : $(ps -eo rss,args | grep "$D" | grep -v grep | awk '{s+=$1} END {print int(s/1024)}') Mo"
  sleep 30
done
wait; rm -rf "$D"
