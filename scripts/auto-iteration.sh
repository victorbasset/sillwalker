#!/bin/bash
# Relais automatique de la boucle de développement (serveur Ubuntu), lancé par cron toutes les 10 minutes :
#   */10 * * * * /home/claude/sillwalker/scripts/auto-iteration.sh
# Lance UNE itération de Claude Code en mode non interactif (consignes : scripts/auto-iteration.md).
# Ne fait rien si une itération tourne déjà (verrou) ou si la session interactive travaille
# (fichier du dépôt modifié ces 15 dernières minutes). Crédits épuisés : l'appel échoue et le
# prochain passage réessaie. Journaux : logs/auto-iteration.log (exclu de git).
set -u
REPO=/home/claude/sillwalker
LOG_DIR=$REPO/logs
mkdir -p "$LOG_DIR"
LOG=$LOG_DIR/auto-iteration.log
export PATH=/home/claude/.local/bin:/usr/local/bin:/usr/bin:/bin
export HOME=/home/claude

exec 9>"$LOG_DIR/auto-iteration.lock"
flock -n 9 || exit 0   # itération déjà en cours

cd "$REPO" || exit 1
# Session interactive active ? (fichier du dépôt ou index git modifié ces 15 dernières minutes, en
# ignorant ce qu'a fait la dernière itération automatique : repère « last-run » touché à sa fin)
MARK=$LOG_DIR/last-run
since=(); [ -f "$MARK" ] && since=(-newer "$MARK")
recent=$(find src scripts docs CLAUDE.md README.md .git/index -newermt "-15 minutes" "${since[@]}" -print -quit 2>/dev/null)
if [ -n "$recent" ]; then exit 0; fi

# Garder le journal court (dernières ~2000 lignes)
if [ -f "$LOG" ] && [ "$(wc -l < "$LOG")" -gt 4000 ]; then tail -n 2000 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"; fi

echo "=== $(date '+%F %T') : début d'itération" >> "$LOG"
timeout 90m claude -p "$(cat "$REPO/scripts/auto-iteration.md")" \
  --dangerously-skip-permissions --model claude-opus-5-5 >> "$LOG" 2>&1
code=$?
touch "$MARK"
echo "=== $(date '+%F %T') : fin (code $code)" >> "$LOG"
