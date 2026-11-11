// (it. 807) node_modules/.bin/electron scripts/trailer/music.js <dossier> : passages de musique du jeu en WAV.
const { app, BrowserWindow } = require("electron");
const fs = require("fs"), path = require("path");
const OUT = path.resolve(process.argv[process.argv.length - 1]);
// un air, trois passages bout à bout ; droit (sans swing ni écho marqué) et sans la variante boss (it. 812)
const PASSES = [["track", 36, "0,0,0", "1"]];
app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
  for (const [name, zone, boss, straight] of PASSES) {
    await win.loadURL("about:blank");
    await win.loadFile(path.join(__dirname, "music.html"), { query: { zone: String(zone), passes: boss, straight } });
    for (let i = 0; i < 600 && win.webContents.getTitle() !== "READY"; i++) await new Promise((r) => setTimeout(r, 100));
    const b64 = await win.webContents.executeJavaScript("window.__wav");
    fs.writeFileSync(path.join(OUT, name + ".wav"), Buffer.from(b64, "base64"));
    console.log(name, "zone", zone, "passages", boss);
  }
  app.quit();
});
