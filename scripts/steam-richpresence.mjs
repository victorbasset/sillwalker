// Génère steam/richpresence.vdf (Steamworks → Rich Presence → localisation) dans les 10 langues du jeu (it. 651).
// Statut vu par les amis : « Zone 55 · Niveau 120 · Guerrier », la classe traduite dans la langue de chaque ami
// (jeton #Class_<id> ; le jeu envoie zone, level, classid : main/steam.js). Usage : node --experimental-default-type=module scripts/steam-richpresence.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { KEYS } = await import("../src/renderer/i18n/keys.js");
const { CLASSES } = await import("../src/renderer/game/classes.js");
// langue du jeu → nom Steam de la langue
const STEAM = { fr: "french", en: "english", es: "spanish", pt: "brazilian", de: "german", pl: "polish", ru: "russian", zh: "schinese", ja: "japanese", ko: "koreana" };
const tr = async (l) => (l === "fr" ? null : (await import(`../src/renderer/i18n/lang/${l}.js`)).default);
const q = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
let out = `"lang"\n{\n`;
for (const [l, steam] of Object.entries(STEAM)) {
  const t = await tr(l), T = (k) => { if (!t) return k; const i = KEYS.indexOf(k); return i >= 0 && t[i] != null ? t[i] : k; };
  const zone = T("Zone {0}").replace("{0}", "%zone%"), lvl0 = T("niveau {0}").replace("{0}", "%level%"), lvl = lvl0.charAt(0).toUpperCase() + lvl0.slice(1);
  out += `\t${q(steam)}\n\t{\n\t\t"tokens"\n\t\t{\n\t\t\t"#Status"\t${q(`${zone} · ${lvl} · {#Class_%classid%}`)}\n`;
  for (const [id, c] of Object.entries(CLASSES)) out += `\t\t\t${q("#Class_" + id)}\t${q(T(c.name))}\n`;
  out += `\t\t}\n\t}\n`;
}
out += `}\n`;
// --check (npm test, it. 653) : échoue si le fichier n'est plus à jour (classe ajoutée, traduction changée)
const file = path.join(root, "steam", "richpresence.vdf");
if (process.argv.includes("--check")) {
  const ok = fs.existsSync(file) && fs.readFileSync(file, "utf8") === out;
  console.log(ok ? "steam/richpresence.vdf : à jour" : "steam/richpresence.vdf : PAS À JOUR, relancer scripts/steam-richpresence.mjs");
  process.exit(ok ? 0 : 1);
}
fs.writeFileSync(file, out);
console.log("steam/richpresence.vdf :", Object.keys(STEAM).length, "langues,", Object.keys(CLASSES).length, "classes");
