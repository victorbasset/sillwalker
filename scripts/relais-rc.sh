#!/bin/bash
# Relais de développement visible à distance (remplace le cron de scripts/auto-iteration.sh, 2026-11-12) :
# une session Claude Code INTERACTIVE, avec Remote Control, tourne dans tmux et enchaîne les itérations
# avec /loop. Victor la suit et peut y écrire depuis claude.ai/code ou l'appli mobile (session « Sillwalker relais »).
#   Lancer :   scripts/relais-rc.sh          (ne fait rien si la session tmux existe déjà)
#   Regarder sur le serveur : tmux attach -t sillwalker-relais   (se détacher : Ctrl+B puis D)
#   Arrêter :  tmux kill-session -t sillwalker-relais
# Le verrou logs/auto-iteration.lock est gardé pendant toute la session : une itération cron encore en cours
# se termine d'abord, et un cron réactivé par erreur ne tourne pas en même temps.
set -u
REPO=/home/claude/sillwalker
NAME=sillwalker-relais
export PATH=/home/claude/.local/bin:/usr/local/bin:/usr/bin:/bin
tmux has-session -t "$NAME" 2>/dev/null && { echo "déjà lancé (tmux attach -t $NAME)"; exit 0; }
mkdir -p "$REPO/logs"
PROMPT="/loop Fais une itération complète de développement selon scripts/auto-iteration.md (lis ce fichier à chaque itération ; ignore seulement « puis arrête-toi » : la boucle relance la suivante, une minute après la fin)."
tmux new-session -d -s "$NAME" -x 200 -y 50 -c "$REPO" \
  flock "$REPO/logs/auto-iteration.lock" \
  claude --remote-control "Sillwalker relais" --dangerously-skip-permissions --model claude-opus-5-5 "$PROMPT"
echo "lancé : tmux attach -t $NAME"
