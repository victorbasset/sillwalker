// Cinématique de libération (demande de Victor, 18/11/2026 ; docs/FINALE.md) : à la première victoire sur le Briseur
// d'Étoiles, le héros quitte la bande et se promène sur TOUT l'écran. Fenêtre transparente qui couvre l'écran de la
// bande, au-dessus de tout, sans focus ni icône, et que les clics traversent toujours (on peut continuer à travailler).
// La page (renderer/finale.html) reçoit les images du héros préparées par la bande et joue la scène ; elle se ferme
// d'elle-même à la fin (ou au plus tard après `maxMs`, si la page ne répond plus : jamais de fenêtre oubliée au-dessus).
const { BrowserWindow, ipcMain } = require("electron");

const TOP_LEVEL = process.platform === "darwin" ? "status" : "screen-saver";
const GHOST_OFFSET = 30000;

let current = null;

/** Ouvre la scène. data : { frames, partner, from: { x, y } (coordonnées de l'écran), lang, texts, duration }. */
function openFinale({ strip, preload, url, ghost }, data) {
  if (current && !current.isDestroyed()) return current; // une seule à la fois
  const display = strip.display(), b = display.bounds;
  const win = new BrowserWindow({
    x: b.x - (ghost ? GHOST_OFFSET : 0), y: b.y, width: b.width, height: b.height,
    show: false, frame: false, transparent: true, backgroundColor: "#00000000", resizable: false, movable: false,
    minimizable: false, maximizable: false, fullscreenable: false, skipTaskbar: true, alwaysOnTop: true, hasShadow: false,
    focusable: false, thickFrame: false, title: "Sillwalker",
    webPreferences: { preload, contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: false },
  });
  current = win;
  win.setIgnoreMouseEvents(true);            // clics toujours traversants
  win.setAlwaysOnTop(true, TOP_LEVEL);
  if (process.platform === "darwin") win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });
  // (it. 3007) plancher à 1 s au lieu de 3 : en jeu la durée vaut toujours 26 s ; seul l'autotest (window.__finaleMs) la raccourcit,
  // et le plancher de 3 s relevait ses 1,5 s demandées (six contrôles de la libération, ≈ 5,6 s chacun)
  const duration = Math.max(1000, Math.min(60000, +data.duration || 26000));
  const close = () => { if (!win.isDestroyed()) win.close(); };
  const guard = setTimeout(close, duration + 4000);
  const onDone = (e) => { if (e.sender === win.webContents) close(); };
  ipcMain.on("finale:done", onDone);
  win.on("closed", () => { clearTimeout(guard); ipcMain.off("finale:done", onDone); if (current === win) current = null; strip.send?.("finale:closed", {}); });
  // (from : coordonnées de l'écran → de la fenêtre)
  const from = data.from ? { x: data.from.x - b.x, y: data.from.y - b.y } : { x: b.width / 2, y: b.height - 60 };
  win.loadURL(url.replace(/index\.html$/, "") + "finale.html");
  win.webContents.once("did-finish-load", () => {
    if (win.isDestroyed()) return;
    win.webContents.send("finale:data", { ...data, from, duration, width: b.width, height: b.height });
    win.showInactive();
    win.setAlwaysOnTop(true, TOP_LEVEL);
  });
  return win;
}

/** Ferme la scène en cours (clic « passer » sur la bande). */
function closeFinale() { if (current && !current.isDestroyed()) current.close(); }

const finaleOpen = () => !!(current && !current.isDestroyed());

// (it. 2495) autotest : la fenêtre en cours (langue de la page)
const finaleWin = () => (current && !current.isDestroyed() ? current : null);

module.exports = { openFinale, closeFinale, finaleOpen, finaleWin };
