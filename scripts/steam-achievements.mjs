// Génère steam/achievements.md : chaque succès (identifiant Steamworks) et son nom dans les 10 langues du jeu
// (it. 652), à recopier dans Steamworks → Stats & Achievements (nom affiché par langue).
// Usage : node --experimental-default-type=module scripts/steam-achievements.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { KEYS } = await import("../src/renderer/i18n/keys.js");
const { ACHIEVEMENTS } = await import("../src/renderer/game/achievements.js");
const LANGS = ["fr", "en", "es", "pt", "de", "pl", "ru", "zh", "ja", "ko"];
const tabs = {};
for (const l of LANGS) tabs[l] = l === "fr" ? null : (await import(`../src/renderer/i18n/lang/${l}.js`)).default;
// Nom tel que le jeu l'affiche ; s'il n'est pas dans les clés (nom déjà traduit), il reste tel quel.
const name = (a, l) => { const raw = a.name; if (!tabs[l]) return raw; const i = KEYS.indexOf(raw); return i >= 0 && tabs[l][i] != null ? tabs[l][i] : raw; };
const cell = (s) => String(s).replace(/\|/g, "\\|");
let md = `# Succès Steam : noms dans les 10 langues\n\nGénéré par \`scripts/steam-achievements.mjs\` (${ACHIEVEMENTS.length} succès). À recopier dans Steamworks → Stats & Achievements.\n\n`;
md += `| Identifiant | ${LANGS.join(" | ")} |\n|${" --- |".repeat(LANGS.length + 1)}\n`;
for (const a of ACHIEVEMENTS) md += `| \`${a.id}\` | ${LANGS.map((l) => cell(name(a, l))).join(" | ")} |\n`;
// --check (npm test, it. 653) : échoue si le fichier n'est plus à jour (succès ajouté, nom changé)
const file = path.join(root, "steam", "achievements.md");
if (process.argv.includes("--check")) {
  const ok = fs.existsSync(file) && fs.readFileSync(file, "utf8") === md;
  console.log(ok ? "steam/achievements.md : à jour" : "steam/achievements.md : PAS À JOUR, relancer scripts/steam-achievements.mjs");
  process.exit(ok ? 0 : 1);
}
fs.writeFileSync(file, md);
const untranslated = ACHIEVEMENTS.filter((a) => KEYS.indexOf(a.name) < 0).map((a) => a.id);
console.log(`steam/achievements.md : ${ACHIEVEMENTS.length} succès ; noms hors des clés de traduction : ${untranslated.join(", ") || "aucun"}`);
