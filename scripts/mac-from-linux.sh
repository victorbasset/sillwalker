#!/usr/bin/env bash
# (it. 833) Version Mac (Apple Silicon) construite SUR LE SERVEUR LINUX, pour itch.io : electron-builder produit l'app
# sans signature (« supported only on macOS ») ; or un binaire arm64 non signé est tué au lancement sur Mac. On la
# signe donc « ad hoc » (sans compte Apple) avec rcodesign (apple-codesign, binaire Linux), puis on refait le ZIP en
# gardant les liens symboliques (zip -y). Pas de notarisation : le joueur passe par Réglages → Confidentialité et
# sécurité → « Ouvrir quand même » (instructions de steam/itch-page.md).
# Usage : scripts/mac-from-linux.sh <rcodesign> <dossier-de-sortie>
set -e
RCS="$1"; OUT="$2"; cd "$(dirname "$0")/.."
VER=$(node -p "require('./package.json').version")
TMP=$(mktemp -d)
npx electron-builder --mac zip --arm64 --publish never -c.extraMetadata.distribution=itch -c.directories.output="$TMP" >/dev/null
"$RCS" sign "$TMP/mac-arm64/Sillwalker.app" >/dev/null
mkdir -p "$OUT"
(cd "$TMP/mac-arm64" && zip -qry "$OUT/Sillwalker-$VER-mac-arm64.zip" Sillwalker.app)
rm -rf "$TMP"
echo "$OUT/Sillwalker-$VER-mac-arm64.zip"
