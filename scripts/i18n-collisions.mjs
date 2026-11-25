// (it. 3263) Noms de données distincts en français mais traduits à l'identique dans une langue (« Furieux » et « Enragé » donnaient tous
// deux « Wütend » en allemand, it. 3262). Familles comparées entre elles : élites, capacités de boss, événements, bénédictions, familiers,
// monstres, déblocages, constellations, pouvoirs, panoplies, reliques, héros, sorts (it. 3264). Usage : node --experimental-default-type=module scripts/i18n-collisions.mjs  (0 attendu ; code 1 sinon)
import { KEYS } from "../src/renderer/i18n/keys.js";
const R = "../src/renderer/game/";
const { ELITE_AFFIXES, MONSTERS } = await import(R + "data.js");
const { BOSS_MECHANICS } = await import(R + "bosses.js");
const { EVENTS } = await import(R + "events.js");
const { DAY_MODS } = await import(R + "daymods.js");
const { PETS } = await import(R + "pets.js");
const { UNLOCKS } = await import(R + "unlocks.js").catch(() => ({}));
const { CONSTELLATIONS } = await import(R + "prestige.js");
const { POWERS } = await import(R + "powers.js");
const { SETS } = await import(R + "sets.js");
const { RELICS } = await import(R + "relics.js");
const { CLASSES } = await import(R + "classes.js");
const { SPELLS } = await import(R + "spells.js");
const names = new Map(); // nom français → familles
const add = (fam, n) => { if (!n || typeof n !== "string") return; if (!names.has(n)) names.set(n, new Set()); names.get(n).add(fam); };
for (const a of Object.values(ELITE_AFFIXES)) add("élite", a.name);
for (const b of Object.values(BOSS_MECHANICS)) add("capacité de boss", b.name);
for (const e of Object.values(EVENTS)) add("événement", e.name);
for (const d of Object.values(DAY_MODS)) add("bénédiction", d.name);
for (const p of PETS) add("familier", p.name);
for (const m of Object.values(MONSTERS)) add("monstre", m.name);
for (const u of Object.values(UNLOCKS || {})) add("déblocage", u && u.name);
for (const c of Object.values(CONSTELLATIONS || {})) add("constellation", c && c.name);
// (it. 3264) pouvoirs légendaires, panoplies, reliques, héros, sorts
for (const p of POWERS) add("pouvoir", p.name);
for (const x of Object.values(SETS)) add("panoplie", x && x.name);
for (const x of Object.values(RELICS)) add("relique", x && x.name);
for (const x of Object.values(CLASSES)) add("héros", x && x.name);
for (const x of SPELLS) add("sort", x && x.name);
const fr = [...names.keys()].filter((n) => KEYS.includes(n));
// Même effet pour une élite et pour un boss : un même nom est juste (esquive, vampirisme, régénération)
const SAME = [["Fuyant", "Insaisissable"], ["Vampirique", "Vampirisme"], ["Régénérant", "Régénération"]];
const allowed = (list) => list.length === 2 && SAME.some(([a, b]) => list.includes(a) && list.includes(b));
let bad = 0;
for (const l of ["en", "es", "pt", "de", "pl", "ru", "zh", "ja", "ko"]) {
  const m = await import(`../src/renderer/i18n/lang/${l}.js`); const d = m.default || Object.values(m)[0];
  const by = new Map();
  for (const n of fr) { const t = d[KEYS.indexOf(n)]; if (!t) continue; const k = t.trim().toLowerCase(); if (!by.has(k)) by.set(k, []); by.get(k).push(n); }
  for (const [t, list] of by) if (list.length > 1 && !allowed(list)) { bad++; console.log(`${l} « ${t} » ← ${list.map((n) => `${n} (${[...names.get(n)].join(", ")})`).join(" / ")}`); }
}
console.log(`i18n-collisions : ${fr.length} noms, ${bad} collision(s)`);
process.exit(bad ? 1 : 0);
