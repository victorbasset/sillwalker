// (it. 783) node_modules/.bin/electron scripts/steam-capsules/make.js <dossier> : visuels du magasin Steam (PNG).
const { app, BrowserWindow } = require("electron");
const fs = require("fs"), path = require("path");
const OUT = path.resolve(process.argv[process.argv.length - 1]);
const SIZES = [
  ["header-capsule", 920, 430, "header"], ["small-capsule", 462, 174, "small"], ["main-capsule", 1232, 706, "main"],
  ["vertical-capsule", 748, 896, "vertical"], ["library-capsule", 600, 900, "vertical"], ["library-header", 920, 430, "header"],
  ["library-hero", 3840, 1240, "hero"], ["library-logo", 1280, 720, "logo"],
];
app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const win = new BrowserWindow({ show: false, width: 800, height: 600, transparent: true, webPreferences: { offscreen: true } });
  for (const [name, w, h, kind] of SIZES) {
    await win.loadURL("about:blank");
    await win.loadFile(path.join(__dirname, "capsule.html"), { query: { w: String(w), h: String(h), kind } }).catch((e) => console.log("chargement :", e.message));
    for (let i = 0; i < 100 && win.webContents.getTitle() !== "READY"; i++) await new Promise((r) => setTimeout(r, 100));
    const png = await win.webContents.executeJavaScript("document.getElementById('c').toDataURL('image/png')");
    fs.writeFileSync(path.join(OUT, name + ".png"), Buffer.from(png.split(",")[1], "base64"));
    console.log(name, w + "×" + h);
  }
  app.quit();
});
