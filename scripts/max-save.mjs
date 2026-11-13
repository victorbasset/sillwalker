// Sauvegarde « tout au maximum » (it. 1063) à partir de la fin de partie : 10 000+ victoires par monstre, collection,
// pouvoirs, panoplies, succès, héros, reliques au niveau 5, record 400. Pour voir les états que les sauvegardes de
// test n atteignent jamais (« (complet) » du Bestiaire restait en français, it. 1062).
// Usage : node --experimental-default-type=module scripts/max-save.mjs <dossier>/save.json
import fs from "node:fs";
const R = new URL("../src/renderer/game/", import.meta.url).href;
const { MONSTERS } = await import(R + "data.js");
const { CODEX_ENTRIES } = await import(R + "codex.js");
const { POWERS } = await import(R + "powers.js");
const { SET_KEYS } = await import(R + "sets.js");
const { ACHIEVEMENTS } = await import(R + "achievements.js");
const { CLASSES } = await import(R + "classes.js");
const { RELIC_IDS } = await import(R + "relics.js");
const s = JSON.parse(fs.readFileSync(new URL("./fixtures/endgame-save.json", import.meta.url), "utf8"));
s.bestiary = Object.fromEntries(Object.keys(MONSTERS).map((k) => [k, 12345]));
s.codex = Object.fromEntries(CODEX_ENTRIES.map((e) => [e.key, 4]));
s.powersSeen = Object.fromEntries(Object.keys(POWERS).map((k) => [k, 1]));
s.setsDone = Object.fromEntries(SET_KEYS.map((k) => [k, true]));
s.achievements = ACHIEVEMENTS.map((a) => a.id);
s.classesUnlocked = Object.keys(CLASSES);
s.relics = Object.fromEntries(RELIC_IDS.map((id) => [id, Date.now()]));
s.relicLv = Object.fromEntries(RELIC_IDS.map((id) => [id, 5]));
s.best = s.zone = 400; s.prestige.bestRun = 400;
s.lang = undefined;
fs.writeFileSync(process.argv[2], JSON.stringify(s));
console.log("ok", Object.keys(s.bestiary).length, CODEX_ENTRIES.length, Object.keys(POWERS).length, ACHIEVEMENTS.length);
