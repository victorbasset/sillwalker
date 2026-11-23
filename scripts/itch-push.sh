#!/usr/bin/env bash
# (it. 1164, demande de Victor) Mise à jour du jeu sur itch.io avec butler, depuis le serveur.
# Usage : [REF=v0.1.3] scripts/itch-push.sh <compte/jeu> [--dry-run]     (ex. scripts/itch-push.sh victor/sillwalker)
#   1. construit les trois versions de la version de package.json dans dist-itch/ (Mac : signature ad hoc,
#      scripts/mac-from-linux.sh ; sans elle, le binaire arm64 est tué au lancement) ;
#   2. les envoie sur trois canaux : windows (dossier win-unpacked), linux (dossier avec l'AppImage), mac (zip de
#      l'app signée, liens symboliques gardés), avec --userversion = la version de package.json.
# butler n'envoie que les différences ; l'application itch met le jeu à jour d'elle-même. Connexion : une fois,
# `butler login` (ou la clé d'API dans ~/.config/itch/butler_creds). Les envois apparaissent dans « Edit game » →
# Uploads ; masquer les anciens fichiers envoyés à la main.
# Avant : npm test, autotest, notes de version (NEWS_RELEASES) à jour (le test des notes de version le vérifie).
# Après l'envoi (it. 3194) : dépôt dans Médias/dist-itch avec empreintes, puis publication du devlog (scripts/itch-devlog.cjs)
# si docs/devlog-<version>.md, steam/itch/devlog-<version>.html et steam/itch/cover-<version>.png existent.
set -euo pipefail
TARGET="${1:?usage : scripts/itch-push.sh <compte/jeu> [--dry-run]}"; DRY="${2:-}"
cd "$(dirname "$0")/.."
# (it. 1165) REF=v0.1.3 : construit une version figée (étiquette git) dans un dossier de travail à part, même si le
# code a avancé depuis ; les fichiers construits sont recopiés dans dist-itch/ du dépôt (le dossier de travail est effacé)
if [ -n "${REF:-}" ]; then
  WT=$(mktemp -d); git worktree add -f "$WT" "$REF" >/dev/null 2>&1; ln -s "$PWD/node_modules" "$WT/node_modules"
  cp scripts/mac-from-linux.sh "$WT/scripts/" 2>/dev/null || true
  trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT
  ROOT="$PWD"; cd "$WT"
fi
BUTLER="${BUTLER:-$HOME/.local/bin/butler}"; RCS="${RCS:-$HOME/.local/bin/rcodesign}"
VER=$(node -p "require('./package.json').version")
echo "Sillwalker $VER → $TARGET"
rm -rf dist-itch
npm run -s dist:itch >/dev/null                      # Windows : win-unpacked + zip
npm run -s dist:itch:appimage >/dev/null             # Linux : AppImage
bash scripts/mac-from-linux.sh "$RCS" "$PWD/dist-itch" >/dev/null   # Mac : zip de l'app signée
LIN=$(mktemp -d); cp "dist-itch/Sillwalker-$VER-linux.AppImage" "$LIN/"; chmod +x "$LIN"/*.AppImage
if [ -n "${REF:-}" ]; then rm -rf "$ROOT/dist-itch"; mkdir -p "$ROOT/dist-itch"; cp -a dist-itch/Sillwalker-* dist-itch/win-unpacked "$ROOT/dist-itch/"; fi
for f in "dist-itch/win-unpacked/Sillwalker.exe" "dist-itch/Sillwalker-$VER-mac-arm64.zip" "$LIN/Sillwalker-$VER-linux.AppImage"; do
  [ -s "$f" ] || { echo "manque : $f"; exit 1; }
done
if [ "$DRY" = "--dry-run" ]; then
  echo "(essai : rien n'est envoyé)"
  for d in dist-itch/win-unpacked "$LIN" "dist-itch/Sillwalker-$VER-mac-arm64.zip"; do du -sh "$d"; done
  exit 0
fi
"$BUTLER" push dist-itch/win-unpacked "$TARGET:windows" --userversion "$VER"
"$BUTLER" push "$LIN" "$TARGET:linux" --userversion "$VER"
"$BUTLER" push "dist-itch/Sillwalker-$VER-mac-arm64.zip" "$TARGET:mac" --userversion "$VER"
rm -rf "$LIN"
"$BUTLER" status "$TARGET"
# (it. 3194, demande de Victor : tout automatique) fichiers et empreintes pour Victor, puis le devlog s'il est prêt
SRC="${ROOT:-$PWD}"
MEDIA="${MEDIA:-/home/victor/Médias/dist-itch}"
if [ -d "$MEDIA" ]; then
  cp dist-itch/Sillwalker-$VER-win.zip "dist-itch/Sillwalker-$VER-linux.AppImage" "dist-itch/Sillwalker-$VER-mac-arm64.zip" "$MEDIA/" && chmod 666 "$MEDIA"/Sillwalker-$VER-*
  (cd "$MEDIA" && sha256sum Sillwalker-$VER-* > "SHA256-$VER.txt" && chmod 666 "SHA256-$VER.txt")
  echo "déposé dans $MEDIA (SHA256-$VER.txt)"
fi
if [ -s "$SRC/docs/devlog-$VER.md" ] && [ -s "$SRC/steam/itch/devlog-$VER.html" ] && [ -s "$SRC/steam/itch/cover-$VER.png" ]; then
  xvfb-run -a "$SRC/node_modules/.bin/electron" --no-sandbox "$SRC/scripts/itch-devlog.cjs" "$VER" --publish 2>&1 | grep -E "^DEVLOG|couverture"
else
  echo "devlog non publié : docs/devlog-$VER.md, steam/itch/devlog-$VER.html ou steam/itch/cover-$VER.png manquant"
fi
