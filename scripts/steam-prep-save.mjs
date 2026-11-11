// (it. 791) Sauvegarde propre pour les captures et vidéos Steam : une partie simulée (simulate.js DUMP=…) avec les
// réglages et l'histoire de la sauvegarde de dev, sans aucune bulle au lancement (« Quoi de neuf », récompense du jour,
// absence, pastilles « nouveau » des onglets).
// Usage : node --experimental-default-type=module scripts/steam-prep-save.mjs <partie-simulée.json> <dossier-de-données-copie> <langue>
import fs from "node:fs";
import path from "node:path";
const [simFile, dir, lang = "en"] = process.argv.slice(2);
const savePath = path.join(dir, "save.json");
const dev = JSON.parse(fs.readFileSync(savePath, "utf8"));
const s = JSON.parse(fs.readFileSync(simFile, "utf8"));
s.settings = { ...dev.settings, ...s.settings, lang, newsSeen: 999 };
for (const k of ["story", "intro", "hints", "seenHints"]) if (dev[k] !== undefined && s[k] === undefined) s[k] = dev[k];
s.last = Date.now();
const d = new Date(), today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
s.daily = { last: today, streak: 3 }; // déjà réclamée aujourd'hui ; sans « mod » : pas de bulle de bénédiction
// succès déjà annoncés (sinon une bulle les énumère tous au lancement)
const { earnedAchievements } = await import("../src/renderer/game/achievements.js");
s.achievements = [...earnedAchievements(s)];
if (s.tabsOpen) for (const k in s.tabsOpen) s.tabsOpen[k] = true;
fs.writeFileSync(savePath, JSON.stringify(s));
console.log(`${savePath} : zone ${s.zone}, niveau ${s.lvl}, ${lang}, ${s.achievements.length} succès`);
