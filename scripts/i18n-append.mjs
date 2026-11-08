// Ajoute des clés À LA FIN de keys.js (l'ordre existant ne bouge jamais).
// Usage : node --experimental-default-type=module scripts/i18n-append.mjs '["clé 1","clé 2"]'
import fs from "node:fs";
const { KEYS } = await import("../src/renderer/i18n/keys.js");
const add = JSON.parse(process.argv[2]).filter((k) => !KEYS.includes(k));
if (!add.length) { console.log("rien à ajouter"); process.exit(0); }
const file = "src/renderer/i18n/keys.js";
let src = fs.readFileSync(file, "utf8").replace(/\n\];\s*$/, "");
src += ",\n" + add.map((k) => "  " + JSON.stringify(k)).join(",\n") + "\n];\n";
fs.writeFileSync(file, src);
add.forEach((k, i) => console.log(KEYS.length + i, k));
