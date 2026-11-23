#!/bin/bash
# (2026-11-23, demande de Victor : « un système qui recharge la session pour qu'elle ne se ferme pas »)
# Gardien lancé par cron (toutes les 10 min et au démarrage du serveur) : si AUCUNE boucle de développement n'est vivante,
# relance la session « Sillwalker relais » (scripts/relais-rc.sh : tmux + Claude Code interactif + Remote Control + /loop).
# Une boucle est vivante si :
#   - la session tmux sillwalker-relais existe (elle se ferme d'elle-même quand Claude s'arrête), ou
#   - logs/loop-heartbeat a été touché il y a moins de HEARTBEAT_MIN minutes (chaque passage de boucle le touche, y compris
#     une session interactive lancée à la main : on ne démarre pas une seconde boucle à côté d'elle).
# Journal : logs/veille.log. Désactiver : commenter la ligne dans `crontab -l`.
set -u
REPO=/home/claude/sillwalker
NAME=sillwalker-relais
HEARTBEAT_MIN=${HEARTBEAT_MIN:-50}
export PATH=/home/claude/.local/bin:/usr/local/bin:/usr/bin:/bin
LOG="$REPO/logs/veille.log"
mkdir -p "$REPO/logs"
tmux has-session -t "$NAME" 2>/dev/null && exit 0
HB="$REPO/logs/loop-heartbeat"
if [ -f "$HB" ] && [ -n "$(find "$HB" -mmin -"$HEARTBEAT_MIN" 2>/dev/null)" ]; then exit 0; fi
echo "$(date '+%F %T') aucune boucle vivante (battement : $( [ -f "$HB" ] && date -r "$HB" '+%F %T' || echo jamais )) : relance du relais" >> "$LOG"
"$REPO/scripts/relais-rc.sh" >> "$LOG" 2>&1
touch "$HB"
