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
const MODE_LABELS = { strip: "Bande", mini: "Mini (près de l’horloge)", icon: "Icône seule" };

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
    const wasDead = status.state === "dead";
    status = st;
    // Mettre à jour une infobulle Windows coûte cher (≈ 2 % d'un cœur si on le
    // fait à chaque victoire) : au plus toutes les 10 s, sauf K.O. / relève.
    const now = Date.now();
    if (now - tipT < TIP_MS && (st.state === "dead") === wasDead) return;
    const tip = `Sillwalker · Niv. ${st.lvl} · Zone ${st.zone} (${st.kills}/10) · ${st.gold} or` + (st.state === "dead" ? " · K.O." : "");
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
      { label: "Affichage", submenu: Object.entries(MODE_LABELS).map(([m, label]) => ({
        label, type: "radio", checked: mode === m, click: () => strip.setMode(m),
      })) },
      { label: "Ouvrir le panneau", click: async () => {
        if (strip.mode() !== "strip") await strip.setMode("strip");
        strip.send("command", "open-panel");
      } },
      { type: "separator" },
      { label: "Position", submenu: [
        { label: "En bas de l’écran", type: "radio", checked: settings.get("edge") !== "top", click: () => { strip.setEdge("bottom"); build(); } },
        { label: "En haut de l’écran", type: "radio", checked: settings.get("edge") === "top", click: () => { strip.setEdge("top"); build(); } },
      ] },
      { label: "Écran", enabled: displays.length > 1 || isDev, submenu: displays.map((d, i) => ({
        label: `Écran ${i + 1} (${d.size.width}×${d.size.height})${d.id === primaryId ? " – principal" : ""}`,
        type: "radio", checked: d.id === current,
        click: () => { strip.setDisplay(d.id); build(); },
      })) },
      { label: "Opacité", submenu: config.OPACITY_CHOICES.map((v) => ({
        label: Math.round(v * 100) + " %", type: "radio", checked: Math.abs(opacity - v) < 0.01,
        click: () => { strip.setOpacity(v); build(); },
      })) },
      { type: "separator" },
      { label: "Lancer au démarrage de Windows" + (isDev ? " (dev)" : ""), type: "checkbox", checked: openAtLogin,
        click: (item) => { app.setLoginItemSettings({ openAtLogin: item.checked, ...loginItemOptions() }); build(); } },
      ...(isDev ? [{ label: "Steam : " + steam.status, enabled: false }] : []),
      { type: "separator" },
      { label: "Quitter Sillwalker", click: () => app.quit() },
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
