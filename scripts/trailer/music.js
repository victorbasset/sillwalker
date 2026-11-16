// (it. 807 ; it. 1565 : les 4 morceaux de la bande originale) node_modules/.bin/electron scripts/trailer/music.js <dossier> :
// un morceau du jeu (src/renderer/assets/music/<id>.opus) décodé en WAV pour la bande-annonce.
// MUSIC_TRACKS="nom:morceau;…" (morceaux : rebord, sentiers, lieutenants, briseur ; par défaut « track:rebord »).
const { app, BrowserWindow } = require("electron");
const fs = require("fs"), path = require("path");
const OUT = path.resolve(process.argv[process.argv.length - 1]);
const LIST = (process.env.MUSIC_TRACKS || "track:rebord").split(";").map((x) => x.split(":"));
app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
  for (const [name, id] of LIST) {
    await win.loadURL("about:blank");
    await win.loadFile(path.join(__dirname, "music.html"), { query: { id } });
    for (let i = 0; i < 600 && !/^(READY|ERROR)/.test(win.webContents.getTitle()); i++) await new Promise((r) => setTimeout(r, 100));
    if (win.webContents.getTitle() !== "READY") { console.log(name, win.webContents.getTitle()); continue; }
    const b64 = await win.webContents.executeJavaScript("window.__wav");
    fs.writeFileSync(path.join(OUT, name + ".wav"), Buffer.from(b64, "base64"));
    console.log(name, "morceau", id);
  }
  app.quit();
});
