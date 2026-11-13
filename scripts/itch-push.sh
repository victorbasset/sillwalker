#!/usr/bin/env bash
# (it. 1164, demande de Victor) Mise à jour du jeu sur itch.io avec butler, depuis le serveur.
# Usage : scripts/itch-push.sh <compte/jeu> [--dry-run]     (ex. scripts/itch-push.sh victor/sillwalker)
#   1. construit les trois versions de la version de package.json dans dist-itch/ (Mac : signature ad hoc,
#      scripts/mac-from-linux.sh ; sans elle, le binaire arm64 est tué au lancement) ;
#   2. les envoie sur trois canaux : windows (dossier win-unpacked), linux (dossier avec l'AppImage), mac (zip de
#      l'app signée, liens symboliques gardés), avec --userversion = la version de package.json.
# butler n'envoie que les différences ; l'application itch met le jeu à jour d'elle-même. Connexion : une fois,
# `butler login` (ou la clé d'API dans ~/.config/itch/butler_creds). Les envois apparaissent dans « Edit game » →
# Uploads ; masquer les anciens fichiers envoyés à la main.
# Avant : npm test, autotest, notes de version (NEWS_RELEASES) à jour (le test des notes de version le vérifie).
set -euo pipefail
TARGET="${1:?usage : scripts/itch-push.sh <compte/jeu> [--dry-run]}"; DRY="${2:-}"
cd "$(dirname "$0")/.."
BUTLER="${BUTLER:-$HOME/.local/bin/butler}"; RCS="${RCS:-$HOME/.local/bin/rcodesign}"
VER=$(node -p "require('./package.json').version")
echo "Sillwalker $VER → $TARGET"
rm -rf dist-itch
npm run -s dist:itch >/dev/null                      # Windows : win-unpacked + zip
npm run -s dist:itch:appimage >/dev/null             # Linux : AppImage
bash scripts/mac-from-linux.sh "$RCS" "$PWD/dist-itch" >/dev/null   # Mac : zip de l'app signée
LIN=$(mktemp -d); cp "dist-itch/Sillwalker-$VER-linux.AppImage" "$LIN/"; chmod +x "$LIN"/*.AppImage
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
