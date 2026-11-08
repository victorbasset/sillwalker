// Intégration Steam (steamworks.js). Tout est facultatif : si Steam n'est pas
// lancé (ou en dev), le jeu tourne normalement et les appels deviennent des no-op.
const config = require("../shared/config");

const CLOUD_FILE = "save.json";

class Steam {
  constructor() {
    this.client = null;
    this.status = "désactivé";
    this.unlocked = new Set();
    this.lastCloudWrite = 0;
  }

  /** @returns {"ok"|"relaunch"|"unavailable"} */
  init({ isDev }) {
    let sw;
    try {
      sw = require("steamworks.js");
    } catch (e) {
      this.status = "module steamworks.js indisponible";
      console.warn("[steam]", this.status, e.message);
      return "unavailable";
    }
    if (!isDev && config.STEAM_RELAUNCH_IF_NEEDED) {
      try {
        if (sw.restartAppIfNecessary(config.STEAM_APP_ID)) return "relaunch";
      } catch (e) { console.warn("[steam] restartAppIfNecessary", e.message); }
    }
    try {
      this.client = sw.init(config.STEAM_APP_ID);
      this.status = "connecté (" + this.client.localplayer.getName() + ")";
      console.log("[steam]", this.status);
      return "ok";
    } catch (e) {
      this.client = null;
      this.status = "Steam non lancé : mode hors Steam";
      console.log("[steam]", this.status, "-", e.message);
      return "unavailable";
    }
  }

  get available() { return !!this.client; }

  unlock(ids) {
    for (const id of ids) {
      if (this.unlocked.has(id)) continue;
      this.unlocked.add(id);
      if (!this.client) { console.log("[steam] succès (hors Steam) :", id); continue; }
      try {
        if (!this.client.achievement.isActivated(id)) {
          const ok = this.client.achievement.activate(id);
          console.log("[steam] succès", id, ok ? "débloqué" : "refusé (inconnu dans Steamworks ?)");
        }
      } catch (e) { console.warn("[steam] succès", id, e.message); }
    }
  }

  /**
   * Statut Steam (« rich presence ») vu par les amis, au plus toutes les 30 s.
   * Steamworks : déclarer le jeton #Status dans le fichier de localisation de
   * la rich presence, par exemple :  "#Status"  "Zone %zone% · Niveau %level% · %class%"
   */
  setPresence({ zone, lvl, cls }) {
    if (!this.client) return;
    const now = Date.now();
    if (now - (this.presenceT || 0) < 30000) return;
    this.presenceT = now;
    try {
      const lp = this.client.localplayer;
      lp.setRichPresence("zone", String(zone));
      lp.setRichPresence("level", String(lvl));
      lp.setRichPresence("class", String(cls || ""));
      lp.setRichPresence("steam_display", "#Status");
    } catch (e) { console.warn("[steam] statut", e.message); }
  }

  cloudEnabled() {
    try { return !!this.client && this.client.cloud.isEnabledForAccount() && this.client.cloud.isEnabledForApp(); }
    catch { return false; }
  }

  /** @returns {object|null} la sauvegarde présente sur Steam Cloud */
  cloudRead() {
    if (!this.cloudEnabled()) return null;
    try {
      if (!this.client.cloud.fileExists(CLOUD_FILE)) return null;
      return JSON.parse(this.client.cloud.readFile(CLOUD_FILE));
    } catch (e) {
      console.warn("[steam] lecture cloud", e.message);
      return null;
    }
  }

  /** Envoie la sauvegarde sur Steam Cloud (limité à une fois toutes les 5 min sauf `force`). */
  cloudWrite(text, force) {
    if (!this.cloudEnabled()) return false;
    const now = Date.now();
    if (!force && now - this.lastCloudWrite < config.CLOUD_INTERVAL_MS) return false;
    this.lastCloudWrite = now;
    try { return this.client.cloud.writeFile(CLOUD_FILE, text); }
    catch (e) { console.warn("[steam] écriture cloud", e.message); return false; }
  }
}

module.exports = { Steam };
