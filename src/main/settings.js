// Préférences de l'application (position, écran, opacité...), séparées de la partie.
const path = require("path");
const { app } = require("electron");
const { readJson, writeJsonAtomic } = require("./json-file");

const DEFAULTS = { mode: "strip", lastShownMode: "strip", edge: "bottom", displayId: null, opacity: 1 };

class Settings {
  constructor() {
    this.file = path.join(app.getPath("userData"), "settings.json");
    const r = readJson(this.file);
    this.data = Object.assign({}, DEFAULTS, r.ok && r.data && typeof r.data === "object" ? r.data : {});
    if (!["top", "bottom"].includes(this.data.edge)) this.data.edge = "bottom";
    this.data.opacity = Math.min(1, Math.max(0.2, Number(this.data.opacity) || 1));
  }
  get(k) { return this.data[k]; }
  set(k, v) {
    this.data[k] = v;
    try { writeJsonAtomic(this.file, JSON.stringify(this.data, null, 2)); } catch (e) { console.error("[settings]", e); }
  }
}

module.exports = { Settings };
