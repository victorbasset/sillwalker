// (it. 786) node_modules/.bin/electron scripts/steam-capsules/achicons.js <dossier> : icônes des succès Steam
// (<ID>.png en couleur, <ID>_gray.png verrouillée, 64×64), à téléverser dans Steamworks → Stats & Achievements.
const { app, BrowserWindow } = require("electron");
const fs = require("fs"), path = require("path");
const OUT = path.resolve(process.argv[process.argv.length - 1]);
app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
  await win.loadFile(path.join(__dirname, "achicons.html"));
  for (let i = 0; i < 200 && win.webContents.getTitle() !== "READY"; i++) await new Promise((r) => setTimeout(r, 100));
  const { icons, missing } = await win.webContents.executeJavaScript("({ icons: window.__icons, missing: window.__missing })");
  for (const [id, [color, gray]] of Object.entries(icons || {})) {
    fs.writeFileSync(path.join(OUT, id + ".png"), Buffer.from(color.split(",")[1], "base64"));
    fs.writeFileSync(path.join(OUT, id + "_gray.png"), Buffer.from(gray.split(",")[1], "base64"));
  }
  console.log(`${Object.keys(icons || {}).length} succès`, missing.length ? "SANS ICÔNE : " + missing.join(", ") : "");
  app.quit();
});
