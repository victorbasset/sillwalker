// (it. 807) node_modules/.bin/electron scripts/trailer/music.js <dossier> : passages de musique du jeu en WAV.
const { app, BrowserWindow } = require("electron");
const fs = require("fs"), path = require("path");
const OUT = path.resolve(process.argv[process.argv.length - 1]);
const PASSES = [["calm", 1, 0], ["mid", 26, 0], ["boss", 26, 1]];
app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
  for (const [name, zone, boss] of PASSES) {
    await win.loadURL("about:blank");
    await win.loadFile(path.join(__dirname, "music.html"), { query: { zone: String(zone), boss: String(boss) } });
    for (let i = 0; i < 600 && win.webContents.getTitle() !== "READY"; i++) await new Promise((r) => setTimeout(r, 100));
    const b64 = await win.webContents.executeJavaScript("window.__wav");
    fs.writeFileSync(path.join(OUT, name + ".wav"), Buffer.from(b64, "base64"));
    console.log(name, "zone", zone, boss ? "(boss)" : "");
  }
  app.quit();
});
