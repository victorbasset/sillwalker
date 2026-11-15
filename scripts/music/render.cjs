// Rendu d'un morceau de la bande originale (docs/MUSIQUE.md) :
//   xvfb-run -a node_modules/.bin/electron --no-sandbox scripts/music/render.cjs <morceau> <sortie.wav>
// Fenêtre cachée (Node activé : outil de construction, jamais livré dans le jeu) ; affiche les mesures du rendu.
const { app, BrowserWindow } = require("electron");
const path = require("path");
const [name, out] = process.argv.slice(-2);
app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: true, contextIsolation: false, backgroundThrottling: false } });
  await win.loadFile(path.join(__dirname, "studio.html"), { query: { track: name, out: path.resolve(out), stems: process.env.STEMS ? "1" : "0" } });
  // jusqu'à 30 min (quatre rendus en parallèle : le plus lourd dépassait les 10 min d'avant et sortait sans rien dire)
  for (let i = 0; i < 9000; i++) { const t = win.webContents.getTitle(); if (t.startsWith("DONE") || t.startsWith("ERROR")) { console.log(name, t); break; } await new Promise((r) => setTimeout(r, 200)); }
  if (!/^(DONE|ERROR)/.test(win.webContents.getTitle())) console.log(name, "ERROR délai dépassé");
  app.quit();
});
