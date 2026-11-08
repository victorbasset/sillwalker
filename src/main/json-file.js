// Lecture/écriture JSON robustes (écriture atomique : fichier temporaire puis renommage).
const fs = require("fs");

function readJson(file) {
  try {
    const txt = fs.readFileSync(file, "utf8");
    return { ok: true, data: JSON.parse(txt) };
  } catch (e) {
    return { ok: false, missing: e.code === "ENOENT", error: e };
  }
}

function writeJsonAtomic(file, text) {
  const tmp = file + ".tmp";
  const fd = fs.openSync(tmp, "w");
  try {
    fs.writeSync(fd, text);
    fs.fsyncSync(fd); // le contenu est sur disque avant le renommage
  } finally {
    fs.closeSync(fd);
  }
  fs.renameSync(tmp, file);
}

module.exports = { readJson, writeJsonAtomic };
