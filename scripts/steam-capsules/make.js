// (it. 783) node_modules/.bin/electron scripts/steam-capsules/make.js <dossier> : visuels du magasin Steam (PNG).
const { app, BrowserWindow } = require("electron");
const fs = require("fs"), path = require("path");
const OUT = path.resolve(process.argv[process.argv.length - 1]);
const SIZES = [
  ["header-capsule", 920, 430, "header"], ["small-capsule", 462, 174, "small"], ["main-capsule", 1232, 706, "main"],
  ["vertical-capsule", 748, 896, "vertical"], ["library-capsule", 600, 900, "vertical"], ["library-header", 920, 430, "header"],
  ["library-hero", 3840, 1240, "hero"], ["library-logo", 1280, 720, "logo"],
  ["itch-cover", 630, 500, "main"], // (it. 805) couverture de la page itch.io
  ["youtube-thumbnail", 1280, 720, "main"],
  ["avatar", 512, 512, "avatar"], // (it. 814) photo de profil itch.io // (it. 813) miniature de la bande-annonce YouTube
  ["update-0.1.4", 1920, 1080, "update"], // (it. 1541) image de couverture du devlog de la 0.1.4 (16:9)
  // (it. 1768, demande de Victor) images promotionnelles d'itch.io : réseaux sociaux, favicon carré, couverture large 21:9,
  // logo transparent horizontal
  ["itch-social", 1200, 630, "main"], ["itch-favicon", 512, 512, "avatar"], ["itch-wide-cover", 2520, 1080, "main"],
  ["itch-logo", 1600, 480, "logo"],
  ["update-0.1.5", 1920, 1080, "update", { ver: "0.1.5", tags: "Original soundtrack|Poupouce the cat|XP bar|Quest chests|The Colossal|Pet Day|10 languages" }], // (it. 1761)
  ["update-0.1.6", 1920, 1080, "update", { ver: "0.1.6", tags: "Living monsters|Monster skills|Packs & instincts|Zone climates|Tougher bosses|10 languages" }], // (it. 2055)
  ["update-0.1.7", 1920, 1080, "update", { ver: "0.1.7", tags: "Lighter skill graph|Shortest path|Talents redone|Final battle theme|An ending surprise|10 languages" }], // (it. 2346)
].filter(([name]) => !process.env.ONLY || name === process.env.ONLY); // ONLY=<nom> : une seule image
app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const win = new BrowserWindow({ show: false, width: 800, height: 600, transparent: true, webPreferences: { offscreen: true } });
  for (const [name, w, h, kind, extra] of SIZES) {
    await win.loadURL("about:blank");
    await win.loadFile(path.join(__dirname, "capsule.html"), { query: { w: String(w), h: String(h), kind, ...(extra || {}) } }).catch((e) => console.log("chargement :", e.message));
    for (let i = 0; i < 100 && win.webContents.getTitle() !== "READY"; i++) await new Promise((r) => setTimeout(r, 100));
    const png = await win.webContents.executeJavaScript("document.getElementById('c').toDataURL('image/png')");
    fs.writeFileSync(path.join(OUT, name + ".png"), Buffer.from(png.split(",")[1], "base64"));
    console.log(name, w + "×" + h);
  }
  app.quit();
});
