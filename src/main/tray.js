// Icône de la zone de notification : menu, infobulle (niveau, zone, or) et,
// en mode « icône seule », petite animation de l'état du héros.
const path = require("path");
const { app, Tray, Menu, screen, nativeImage } = require("electron");
const config = require("../shared/config");

const ASSETS = path.join(__dirname, "..", "..", "assets");
const img = (file) => nativeImage.createFromPath(path.join(ASSETS, file)); // charge aussi la version @2x
// Images par état du héros (deux images alternées).
const FRAMES = {
  walk: ["tray/tray-walk-a.png", "tray/tray-walk-b.png"],
  fight: ["tray/tray-fight-a.png", "tray/tray-fight-b.png"],
  dead: ["tray/tray-dead.png", "tray/tray-dead.png"],
  loot: ["tray/tray-loot.png", "tray/tray-walk-a.png"],
};
const { L, getLang } = require("./i18n");
const MODE_LABELS = { strip: "strip", mini: "mini", icon: "icon" }; // clés de i18n.js

function loginItemOptions() {
  // En dev, Windows doit lancer electron.exe avec le dossier du projet.
  return app.isPackaged ? {} : { path: process.execPath, args: [path.resolve(app.getAppPath())] };
}

function createTray({ strip, isDev, steam }) {
  let still = img("tray.png");
  const frames = Object.fromEntries(Object.entries(FRAMES).map(([k, files]) => [k, files.map(img)]));
  const tray = new Tray(still);
  tray.setToolTip("Sillwalker");

  let status = { state: "walk" }, lootUntil = 0, tick = 0, timer = 0, shownImage = still;
  const TIP_MS = 10000;
  let tipT = 0, lastTip = "";
  const setImage = (im) => { if (im !== shownImage) { shownImage = im; tray.setImage(im); } };

  function animate() {
    const key = Date.now() < lootUntil ? "loot" : (frames[status.state] ? status.state : "walk");
    setImage(frames[key][tick++ % 2]);
  }
  /** L'animation ne tourne qu'en mode « icône seule » (sinon : icône fixe). */
  function syncAnimation() {
    const on = strip.mode() === "icon";
    if (on && !timer) { timer = setInterval(animate, config.TRAY_ANIM_MS); animate(); }
    if (!on && timer) { clearInterval(timer); timer = 0; setImage(still); }
  }

  /** Icônes générées par la page à partir du héros (classe + casque). */
  function setIcons(set) {
    try {
      const make = (f) => {
        const im = nativeImage.createEmpty();
        im.addRepresentation({ scaleFactor: 1, dataURL: String(f.x1) });
        if (f.x125) im.addRepresentation({ scaleFactor: 1.25, dataURL: String(f.x125) });
        if (f.x15) im.addRepresentation({ scaleFactor: 1.5, dataURL: String(f.x15) });
        im.addRepresentation({ scaleFactor: 2, dataURL: String(f.x2) });
        return im;
      };
      const next = {};
      for (const k of Object.keys(FRAMES)) if (set && Array.isArray(set[k]) && set[k].length === 2) next[k] = set[k].map(make);
      if (Object.keys(next).length !== Object.keys(FRAMES).length) return;
      Object.assign(frames, next);
      still = frames.walk[0];
      if (!timer) setImage(still); else animate();
    } catch (e) { console.warn("[tray] icônes", e.message); }
  }

  function setStatus(st) {
    if (!st) return;
    if (st.loot != null) { lootUntil = Date.now() + 1500; return; }
    const wasDead = status.state === "dead", ecoChanged = !!st.eco !== !!status.eco;
    status = st;
    if (ecoChanged) build(); // réglage changé dans le panneau : la case du menu suit
    // Mettre à jour une infobulle Windows coûte cher (≈ 2 % d'un cœur si on le
    // fait à chaque victoire) : au plus toutes les 10 s, sauf K.O. / relève.
    const now = Date.now();
    if (now - tipT < TIP_MS && (st.state === "dead") === wasDead) return;
    const tip = `Sillwalker · ${L("lvl")} ${st.lvl} · ${L("zone")} ${st.zone} (${st.kills}/10)` + (st.best > st.zone ? ` · ${L("record")} ${st.best}` : "")
      + ` · ${st.gold} ${L("gold")}` + (st.state === "dead" ? " · K.O." : "");
    if (tip === lastTip) return;
    tipT = now; lastTip = tip;
    tray.setToolTip(tip);
  }

  function build() {
    const settings = strip.settings;
    const displays = screen.getAllDisplays();
    const primaryId = screen.getPrimaryDisplay().id;
    const current = strip.display().id;
    const opacity = settings.get("opacity");
    const openAtLogin = app.getLoginItemSettings(loginItemOptions()).openAtLogin;
    const mode = strip.mode();

    const template = [
      { label: L("display"), submenu: Object.entries(MODE_LABELS).map(([m, key]) => ({ label: L(key),
        type: "radio", checked: mode === m, click: () => strip.setMode(m),
      })) },
      { label: L("panel"), click: async () => {
        if (strip.mode() !== "strip") await strip.setMode("strip");
        strip.send("command", "open-panel");
      } },
      { type: "separator" },
      { label: L("position"), submenu: [
        { label: L("bottom"), type: "radio", checked: settings.get("edge") !== "top", click: () => { strip.setEdge("bottom"); build(); } },
        { label: L("top"), type: "radio", checked: settings.get("edge") === "top", click: () => { strip.setEdge("top"); build(); } },
      ] },
      { label: L("screen"), enabled: displays.length > 1 || isDev, submenu: displays.map((d, i) => ({
        label: `${L("screen")} ${i + 1} (${d.size.width}×${d.size.height})${d.id === primaryId ? " – " + L("primary") : ""}`,
        type: "radio", checked: d.id === current,
        click: () => { strip.setDisplay(d.id); build(); },
      })) },
      { label: L("opacity"), submenu: config.OPACITY_CHOICES.map((v) => ({
        label: new Intl.NumberFormat(getLang(), { style: "percent" }).format(v) /* « 100 % » en français, « 100% » en anglais */, type: "radio", checked: Math.abs(opacity - v) < 0.01,
        click: () => { strip.setOpacity(v); build(); },
      })) },
      { type: "separator" },
      { label: L("eco"), type: "checkbox", checked: !!status.eco,
        click: (item) => { status = { ...status, eco: item.checked }; strip.send("command", item.checked ? "eco:on" : "eco:off"); build(); } },
      // Plein écran : détecté seulement sous Windows (fullscreen-watch.js) ; ailleurs la case n'aurait aucun effet.
      ...(process.platform === "win32" ? [{ label: L("fullscreen"), type: "checkbox", checked: settings.get("hideOnFullscreen") !== false,
        click: (item) => { settings.set("hideOnFullscreen", item.checked); if (!item.checked) strip.setFullscreenApp(false); build(); } }] : []),
      { label: L(process.platform === "darwin" ? "loginMac" : "login") + (isDev ? " (dev)" : ""), type: "checkbox", checked: openAtLogin,
        click: (item) => { app.setLoginItemSettings({ openAtLogin: item.checked, ...loginItemOptions() }); build(); } },
      ...(isDev ? [{ label: "Steam : " + steam.status, enabled: false }] : []),
      { type: "separator" },
      { label: L("quit"), click: () => app.quit() },
    ];
    tray.setContextMenu(Menu.buildFromTemplate(template));
  }

  build();
  syncAnimation();
  strip.onChange(() => { build(); syncAnimation(); });
  // Clic gauche : icône seule <-> dernier affichage utilisé.
  tray.on("click", () => strip.toggle());
  for (const ev of ["display-added", "display-removed", "display-metrics-changed"]) screen.on(ev, build);
  return { tray, rebuild: build, setStatus, setIcons, stop: () => clearInterval(timer) };
}

module.exports = { createTray, loginItemOptions };
