#!/bin/bash
# Mémoire du jeu dans la durée (fuites) : lance le jeu invisible sur une COPIE de dev-data, en accéléré, et relève
# la mémoire de ses processus toutes les 30 s. Usage (Linux) : scripts/mem-watch.sh [minutes=6] [vitesse=10]
# Deux nombres (it. 601) :
#   « réel » = PSS de l'arbre Electron (mémoire partagée répartie entre les processus, sans l'écran virtuel Xvfb) :
#     ce qui compte vraiment ; repère it. 601 ≈ 515 Mo stables (rendu ≈ 190, principal ≈ 90, GPU ≈ 75, son + réseau ≈ 50…).
#   « RSS » = l'ancien total (RSS additionnés : la mémoire partagée comptée plusieurs fois, Xvfb compris) ≈ 800 Mo.
# Une croissance continue de l'un ou l'autre = fuite à chercher.
MIN=${1:-6}; SPEED=${2:-10}
cd "$(dirname "$0")/.."
# (it. 1144) MEM_SAVE=<save.json> : une autre partie (ex. fin de partie au grand graphe rempli) ; MEM_ARGS="--open-panel" :
# options en plus (le panneau ouvert fait travailler les onglets, bulles et caches de l'interface)
D=$(mktemp -d /tmp/sillwalker-mem-XXXX); cp dev-data/save.json dev-data/settings.json "$D"/ 2>/dev/null
[ -n "$MEM_SAVE" ] && cp "$MEM_SAVE" "$D/save.json"
xvfb-run -a -s "-screen 0 1920x1080x24" ./node_modules/.bin/electron . --ghost --no-sandbox --user-data="$D" --speed="$SPEED" --exit-after=$((MIN * 60)) $MEM_ARGS > /dev/null 2>&1 &
sleep 20
desc() { for c in $(pgrep -P "$1"); do echo "$c"; desc "$c"; done; }
for i in $(seq 1 $((MIN * 2 - 1))); do
  root=$(pgrep -f "electron . --ghost --no-sandbox --user-data=$D" | head -1)
  pss=0
  if [ -n "$root" ]; then
    for p in $root $(desc "$root"); do
      v=$(awk '/^Pss:/{print $2}' /proc/$p/smaps_rollup 2>/dev/null); pss=$((pss + ${v:-0}))
    done
  fi
  rss=$(ps -eo rss,args | grep "$D" | grep -v grep | awk '{s+=$1} END {print int(s/1024)}')
  echo "$((i * 30)) s : réel $((pss / 1024)) Mo (RSS $rss Mo)"
  sleep 30
done
wait; rm -rf "$D"
