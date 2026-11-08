// Liste tous les textes à traduire (clés françaises) : appels tx("…") dans le
// code et noms des données du jeu. Usage :
//   node --experimental-default-type=module scripts/i18n-extract.mjs > keys.json
// Option --missing=en : seulement les clés absentes du dictionnaire de cette langue.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/renderer");
const keys = new Set();
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith(".js") && !p.includes(path.sep + "i18n" + path.sep)) scan(fs.readFileSync(p, "utf8")); } };
function scan(src) {
  const re = /\btx\("((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(src))) { try { keys.add(JSON.parse('"' + m[1] + '"')); } catch { /* ignoré */ } }
}
walk(root);

const D = await import("../src/renderer/game/data.js");
const C = await import("../src/renderer/game/classes.js");
const T = await import("../src/renderer/game/talents.js");
const K = await import("../src/renderer/game/skilltree.js");
const P = await import("../src/renderer/game/pets.js");
const W = await import("../src/renderer/game/powers.js");
const SE = await import("../src/renderer/game/sets.js");
const B = await import("../src/renderer/game/bosses.js");
const E = await import("../src/renderer/game/events.js");
const DM = await import("../src/renderer/game/daymods.js");
const SH = await import("../src/renderer/game/shop.js");
const PR = await import("../src/renderer/game/prestige.js");
const A = await import("../src/renderer/game/achievements.js");

const F = ["name", "desc", "text", "label", "role", "passiveText"];
const add = (s) => { if (typeof s === "string" && /\p{L}{2}/u.test(s)) keys.add(s); };
const fields = (o) => { if (o) for (const f of F) add(o[f]); };
const each = (o, fn) => { for (const k in o) fn(o[k], k); };
D.RARITIES.forEach(fields); each(D.SLOTS, fields); each(D.STAT_NAMES, add); each(D.MONSTERS, fields); D.ZONES.forEach(fields); each(D.ELITE_AFFIXES, fields);
each(D.ITEM_BASES, (l) => l.forEach((b) => add(b.n))); each(D.MATERIALS, (l) => l.forEach((m) => add(m.n))); D.ITEM_SUFFIXES.flat().forEach(add);
each(C.CLASSES, fields); C.ATTACK_TIERS.forEach(fields);
each(T.TREES, (br) => br.forEach((b) => { fields(b); b.talents.forEach(fields); })); each(T.EFFECTS, fields); each(T.VOIES, (l) => l.forEach(fields)); T.MASTERIES.forEach(fields);
K.SECTORS.forEach((s) => { fields(s); s.notables.forEach(fields); fields(s.keystone); }); each(K.SKILL_TREE.nodes, fields); each(K.SECTOR_CORES, fields);
P.PETS.forEach(fields); each(P.EXPEDITIONS, fields); W.POWERS.forEach(fields); each(SE.SETS, (s) => { fields(s); add(s.suffix); });
B.BOSS_NAMES.forEach(add); each(B.BOSS_MECHANICS, fields); each(E.EVENTS, fields); each(DM.DAY_MODS, fields);
[SH.CONSUMABLES, SH.CHESTS, SH.UPGRADES, SH.WORKSHOP].forEach((l) => l.forEach(fields)); PR.CONSTELLATIONS.forEach(fields); A.ACHIEVEMENTS.forEach(fields);

let list = [...keys].sort();
const miss = process.argv.find((a) => a.startsWith("--missing="));
if (miss) {
  const { DICTS } = await import("../src/renderer/i18n/dicts.js");
  const d = DICTS[miss.split("=")[1]] || {};
  list = list.filter((k) => d[k] == null);
}
process.stdout.write(JSON.stringify(list, null, 0));
