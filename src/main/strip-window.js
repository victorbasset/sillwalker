// Fenêtre unique du jeu, avec trois modes d'affichage :
//   strip : bande collée en bas (ou en haut) de la zone de travail d'un écran.
//           La fenêtre fait d'office la hauteur bande + panneau : la partie du
//           panneau est transparente et traversée par les clics tant qu'il est
//           fermé. Ouvrir le panneau ne redimensionne donc jamais la fenêtre
//           (c'était la cause du clignotement).
//   mini  : petit encart près de l'horloge.
//   icon  : fenêtre masquée, seule l'icône de notification reste.
const { BrowserWindow, screen, ipcMain } = require("electron");
const config = require("../shared/config");

const MODES = ["strip", "mini", "icon"];

class StripWindow {
  constructor({ settings, preload, url, devTools, openDevTools, ghost, testWidth }) {
    this.testWidth = testWidth || 0;
    this.ghost = !!ghost;
    this.settings = settings;
    this.panelOpen = false;
    this.interactive = false;
    this.locked = false; // session Windows verrouillée
    this.listeners = new Set();
    // Ancien réglage « visible: false » -> mode icône.
    if (!MODES.includes(settings.get("mode"))) settings.set("mode", settings.get("visible") === false ? "icon" : "strip");
    if (!["strip", "mini"].includes(settings.get("lastShownMode"))) settings.set("lastShownMode", "strip");

    this.win = new BrowserWindow({
      show: false,
      frame: false,
      transparent: true,
      backgroundColor: "#00000000",
      resizable: false,
      movable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      skipTaskbar: true,       // pas d'icône dans la barre des tâches
      alwaysOnTop: true,
      hasShadow: false,
      thickFrame: false,
      title: "Sillwalker",
      webPreferences: {
        preload,
        contextIsolation: true,
        sandbox: true,
        nodeIntegration: false,
        backgroundThrottling: false, // la simulation continue quand rien n'est affiché
        spellcheck: false,
        devTools,
      },
    });
    this.win.setAlwaysOnTop(true, "pop-up-menu");
    this.win.setIgnoreMouseEvents(true);
    this.hitRects = [];
    this.pollTimer = setInterval(() => this.pollCursor(), 50);
    this.win.on("closed", () => clearInterval(this.pollTimer));
    this.win.setMenu(null);
    if (this.ghost) this.win.setOpacity(0.02); // tests : quasi invisible (les captures restent nettes)
    this.place();
    this.win.loadURL(url);

    const replace = () => this.place();
    screen.on("display-metrics-changed", replace);
    screen.on("display-added", replace);
    screen.on("display-removed", replace);
    this.win.on("closed", () => {
      screen.off("display-metrics-changed", replace);
      screen.off("display-added", replace);
      screen.off("display-removed", replace);
    });
    if (openDevTools) this.win.webContents.openDevTools({ mode: "detach" });
  }

  send(channel, payload) {
    if (!this.win.isDestroyed()) this.win.webContents.send(channel, payload);
  }
  onChange(fn) { this.listeners.add(fn); }
  notify() { for (const fn of this.listeners) fn(); }

  /* ---------- Placement ---------- */
  mode() { return this.settings.get("mode"); }

  display() {
    const id = this.settings.get("displayId");
    return screen.getAllDisplays().find((d) => d.id === id) || screen.getPrimaryDisplay();
  }

  panelHeight(wa) {
    return Math.max(200, Math.min(config.PANEL_MAX_HEIGHT, wa.height - config.STRIP_HEIGHT - config.PANEL_MIN_GAP));
  }

  bounds() {
    const wa = this.display().workArea; // zone de travail = écran moins la barre des tâches
    const top = this.settings.get("edge") === "top";
    if (this.mode() === "mini") {
      const m = config.MINI_MARGIN, w = config.MINI_WIDTH, h = config.MINI_HEIGHT;
      return { x: wa.x + wa.width - w - m, y: top ? wa.y + m : wa.y + wa.height - h - m, width: w, height: h };
    }
    const h = config.STRIP_HEIGHT + this.panelHeight(wa);
    const width = this.testWidth ? Math.min(wa.width, this.testWidth) : wa.width; // --width (dev)
    return { x: wa.x, y: top ? wa.y : wa.y + wa.height - h, width, height: h };
  }

  place() {
    if (this.win.isDestroyed()) return;
    const b = this.bounds();
    this.win.setBounds(b);
    // Écrans avec des échelles différentes : le 2e appel corrige la taille.
    const got = this.win.getBounds();
    if (got.width !== b.width || got.height !== b.height || got.x !== b.x || got.y !== b.y) this.win.setBounds(b);
    this.send("layout", this.layout());
  }

  layout() {
    return {
      mode: this.mode(),
      edge: this.settings.get("edge"),
      panelHeight: this.panelHeight(this.display().workArea),
      stripHeight: config.STRIP_HEIGHT,
      opacity: this.settings.get("opacity"),
    };
  }

  setPanelOpen(open) {
    this.panelOpen = !!open;
    if (!open && this.win.isFocused()) this.win.blur(); // rend la main à l'appli précédente
    this.notify();
  }

  setEdge(edge) { this.settings.set("edge", edge); this.place(); }
  setDisplay(id) { this.settings.set("displayId", id); this.place(); }
  setOpacity(v) { this.settings.set("opacity", v); this.send("layout", this.layout()); }

  /* ---------- Modes ---------- */
  /** Change de mode. La fenêtre est masquée pendant le changement de taille
   *  pour qu'on ne voie jamais une image intermédiaire. */
  async setMode(mode) {
    if (!MODES.includes(mode) || mode === this.mode() || this.switching) return;
    this.switching = true;
    try {
      this.settings.set("mode", mode);
      this.panelOpen = false;
      this.setInteractive(false);
      if (mode === "icon") {
        this.win.hide();
        this.send("layout", this.layout());
        this.send("visibility", false);
      } else {
        this.settings.set("lastShownMode", mode);
        if (this.win.isVisible()) this.win.hide();
        const applied = new Promise((resolve) => {
          const t = setTimeout(resolve, 400);
          ipcMain.once("layout:applied", () => { clearTimeout(t); resolve(); });
        });
        this.place(); // envoie aussi la nouvelle mise en page
        await applied;
        await new Promise((r) => setTimeout(r, 50)); // laisse le renderer peindre
        this.reveal();
      }
    } finally {
      this.switching = false;
      this.notify();
    }
  }

  reveal() {
    if (this.ghost) this.win.setOpacity(0.02);
    this.win.showInactive(); // n'arrache pas le focus à l'appli en cours
    this.win.setAlwaysOnTop(true, "pop-up-menu");
    this.send("visibility", this.renderVisible());
  }

  /** Clic sur l'icône de notification : icône seule <-> dernier mode affiché. */
  toggle() { return this.setMode(this.mode() === "icon" ? this.settings.get("lastShownMode") : "icon"); }
  isShown() { return this.mode() !== "icon"; }
  renderVisible() { return this.isShown() && !this.locked; }

  /* ---------- Souris ---------- */
  /** Rectangles cliquables déclarés par la page (coordonnées de la fenêtre). */
  setHitRects(rects) {
    this.hitRects = Array.isArray(rects) ? rects.filter((r) => Array.isArray(r) && r.length === 4).map((r) => r.map(Number)) : [];
    this.pollCursor();
  }

  /** Le point (coordonnées écran) est-il au-dessus d'un élément cliquable ? */
  hitTest(x, y) {
    const b = this.win.getBounds();
    const cx = x - b.x, cy = y - b.y;
    return this.hitRects.some(([rx, ry, rw, rh]) => cx >= rx && cy >= ry && cx < rx + rw && cy < ry + rh);
  }

  /** 20 fois/s : rend la fenêtre cliquable seulement sous un élément `.hit`. */
  pollCursor() {
    if (this.win.isDestroyed() || !this.win.isVisible() || this.testing) return;
    const p = screen.getCursorScreenPoint();
    this.setInteractive(this.hitTest(p.x, p.y));
  }

  setInteractive(on) {
    if (on === this.interactive || this.win.isDestroyed()) return;
    this.interactive = on;
    // ignore = true : les clics (et survols) traversent vers les fenêtres derrière.
    this.win.setIgnoreMouseEvents(!on);
  }

  setLocked(locked) {
    this.locked = locked;
    this.send("visibility", this.renderVisible());
  }
}

module.exports = { StripWindow };
