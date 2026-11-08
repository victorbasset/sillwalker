// Sauvegarde de la partie dans userData :
//   save.json         sauvegarde principale (écriture atomique)
//   save.backup.json  sauvegarde de secours, copie de la principale au plus
//                     toutes les 10 min ; utilisée si la principale est illisible
//   save.corrupt-*.json  fichiers illisibles mis de côté (jamais supprimés)
const fs = require("fs");
const path = require("path");
const { readJson, writeJsonAtomic } = require("./json-file");

const isValid = (d) => d && typeof d === "object" && !Array.isArray(d) && typeof d.v === "number";

class SaveStore {
  constructor(dir, { backupIntervalMs }) {
    this.dir = dir;
    this.main = path.join(dir, "save.json");
    this.backup = path.join(dir, "save.backup.json");
    this.backupIntervalMs = backupIntervalMs;
    fs.mkdirSync(dir, { recursive: true });
  }

  /** @returns {{data: object|null, source: string, notice?: string}} */
  load() {
    const main = readJson(this.main);
    if (main.ok && isValid(main.data)) return { data: main.data, source: "main" };

    if (!main.missing) this.quarantine(this.main);
    // Écriture interrompue juste avant le renommage ?
    const tmp = readJson(this.main + ".tmp");
    if (tmp.ok && isValid(tmp.data)) {
      return { data: tmp.data, source: "tmp", notice: "Sauvegarde récupérée après une fermeture brutale." };
    }
    const bak = readJson(this.backup);
    if (bak.ok && isValid(bak.data)) {
      return { data: bak.data, source: "backup", notice: main.missing
        ? "Sauvegarde principale introuvable : partie restaurée depuis la sauvegarde de secours."
        : "Sauvegarde principale illisible : partie restaurée depuis la sauvegarde de secours." };
    }
    return { data: null, source: "none" };
  }

  quarantine(file) {
    try {
      if (fs.existsSync(file)) fs.renameSync(file, path.join(this.dir, `save.corrupt-${Date.now()}.json`));
    } catch (e) { console.error("[save] quarantine", e); }
  }

  /** Écrit la partie (texte JSON). Lève une erreur si le contenu est invalide. */
  write(text) {
    const data = JSON.parse(text);
    if (!isValid(data)) throw new Error("Sauvegarde invalide refusée");
    this.rotateBackup();
    writeJsonAtomic(this.main, text);
    return data;
  }

  rotateBackup() {
    try {
      if (!fs.existsSync(this.main)) return;
      let age = Infinity;
      try { age = Date.now() - fs.statSync(this.backup).mtimeMs; } catch { /* pas encore de secours */ }
      if (age < this.backupIntervalMs) return;
      const cur = readJson(this.main);
      if (cur.ok && isValid(cur.data)) {
        writeJsonAtomic(this.backup, JSON.stringify(cur.data));
      }
    } catch (e) { console.error("[save] backup", e); }
  }
}

module.exports = { SaveStore };
