#!/usr/bin/env bash
# Prépare un serveur Ubuntu pour travailler sur Sillwalker (tests, captures, build).
#   bash scripts/setup-ubuntu.sh            (sans Wine)
#   WITH_WINE=1 bash scripts/setup-ubuntu.sh  (avec Wine : construire l'exécutable Windows)
set -euo pipefail

sudo apt-get update
# Node 22 (Electron 45 demande Node >= 22.12)
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
# Écran virtuel et bibliothèques nécessaires à Electron
sudo apt-get install -y git xvfb xauth \
  libgtk-3-0 libnss3 libxss1 libxtst6 libgbm1 libdrm2 libxkbcommon0 libatk-bridge2.0-0 libcups2 \
  libasound2t64 2>/dev/null || sudo apt-get install -y git xvfb xauth \
  libgtk-3-0 libnss3 libxss1 libxtst6 libgbm1 libdrm2 libxkbcommon0 libatk-bridge2.0-0 libcups2 libasound2
# Polices pour le japonais, le chinois et le coréen (repli si les polices pixel manquent un caractère)
sudo apt-get install -y fonts-noto-cjk
if [ "${WITH_WINE:-0}" = "1" ]; then
  sudo dpkg --add-architecture i386
  sudo apt-get update
  sudo apt-get install -y wine64 wine32 || sudo apt-get install -y wine
fi

cd "$(dirname "$0")/.."
npm ci
npm test
npm run selftest:linux
echo "Prêt."
