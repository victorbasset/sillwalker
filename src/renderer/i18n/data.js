// Traduction des données du jeu, une fois au démarrage (en place).
// Les noms qui servent d'identifiants restent en français en interne :
//  - types d'objets, matières et suffixes (clés de la collection, noms sauvegardés) :
//    traduits à l'affichage par itemName() ;
//  - zones : le nom source est gardé dans `src` (météo par zone).
import { getLang, tr } from "./index.js";
import { RARITIES, SLOTS, STAT_NAMES, MONSTERS, ZONES, ELITE_AFFIXES, ITEM_BASES, MATERIALS, ITEM_SUFFIXES } from "../game/data.js";
import { CLASSES, ATTACK_TIERS } from "../game/classes.js";
import { TREES, EFFECTS, VOIES, MASTERIES } from "../game/talents.js";
import { SECTORS, SKILL_TREE, SECTOR_CORES } from "../game/skilltree.js";
import { PETS, EXPEDITIONS } from "../game/pets.js";
import { POWERS } from "../game/powers.js";
import { SETS } from "../game/sets.js";
import { BOSS_NAMES, BOSS_MECHANICS } from "../game/bosses.js";
import { EVENTS } from "../game/events.js";
import { DAY_MODS } from "../game/daymods.js";
import { CONSUMABLES, CHESTS, UPGRADES, WORKSHOP } from "../game/shop.js";
import { CONSTELLATIONS } from "../game/prestige.js";
import { ACHIEVEMENTS } from "../game/achievements.js";

const FIELDS = ["name", "desc", "text", "label", "role", "passiveText"];
function each(obj, fn) { for (const k in obj) fn(obj[k], k); }
function fields(o) { if (o) for (const f of FIELDS) if (typeof o[f] === "string") o[f] = tr(o[f]); }

let done = false;
/** Traduit toutes les données affichées (à appeler avant le premier rendu). */
export function translateData() {
  if (done) return;
  done = true;
  for (const z of ZONES) z.src ||= z.name;
  for (const k in SETS) SETS[k].srcSuffix ||= SETS[k].suffix;
  if (getLang() === "fr") return;
  RARITIES.forEach(fields);
  each(SLOTS, fields);
  each(STAT_NAMES, (v, k) => { STAT_NAMES[k] = tr(v); });
  each(MONSTERS, fields);
  ZONES.forEach(fields);
  each(ELITE_AFFIXES, fields);
  each(CLASSES, fields);
  ATTACK_TIERS.forEach(fields);
  each(TREES, (branches) => branches.forEach((b) => { fields(b); b.talents.forEach(fields); }));
  each(EFFECTS, fields);
  each(VOIES, (list) => list.forEach(fields));
  MASTERIES.forEach(fields);
  SECTORS.forEach((s) => { fields(s); s.notables.forEach(fields); fields(s.keystone); });
  each(SKILL_TREE.nodes, fields);
  each(SECTOR_CORES, fields);
  PETS.forEach(fields);
  each(EXPEDITIONS, fields);
  POWERS.forEach(fields);
  each(SETS, (s) => { fields(s); s.suffix = tr(s.suffix); });
  BOSS_NAMES.forEach((n, i) => { BOSS_NAMES[i] = tr(n); });
  each(BOSS_MECHANICS, fields);
  each(EVENTS, fields);
  each(DAY_MODS, fields);
  [CONSUMABLES, CHESTS, UPGRADES, WORKSHOP].forEach((l) => l.forEach(fields));
  CONSTELLATIONS.forEach(fields);
  ACHIEVEMENTS.forEach(fields);
}

/**
 * Nom d'objet dans la langue choisie. Les objets sont nommés en français à leur
 * création (« Épée de fer du sanglier ») : on retrouve le type, la matière et
 * le suffixe, puis on les recompose dans l'ordre de la langue.
 */
const ORDER = { en: "{mat} {base} {suf}", de: "{base} {mat} {suf}", es: "{base} {mat} {suf}", pt: "{base} {mat} {suf}", pl: "{base} {mat} {suf}", ru: "{base} {mat} {suf}", zh: "{suf}{mat}{base}", ja: "{suf}{mat}{base}", ko: "{suf} {mat} {base}" };
let suffixes = null;
export function itemName(it) {
  if (!it || !it.name) return "";
  const lang = getLang();
  if (lang === "fr") return it.name;
  const name = it.name;
  let base = null;
  for (const b of ITEM_BASES[it.slot] || []) if ((name === b.n || name.startsWith(b.n + " ")) && (!base || b.n.length > base.n.length)) base = b;
  if (!base) return name;
  let rest = name.slice(base.n.length).trim(), mat = "", suf = "";
  let best = "";
  for (const kind in MATERIALS) for (const m of MATERIALS[kind]) if (rest.startsWith(m.n) && m.n.length > best.length) best = m.n;
  if (best) { mat = best; rest = rest.slice(best.length).trim(); }
  if (rest) {
    suffixes ||= [...new Set([...ITEM_SUFFIXES.flat(), ...Object.values(SETS).map((s) => s.srcSuffix || s.suffix)])];
    suf = suffixes.includes(rest) ? rest : rest;
  }
  return (ORDER[lang] || ORDER.en).replace("{base}", tr(base.n)).replace("{mat}", mat ? tr(mat) : "").replace("{suf}", suf ? tr(suf) : "")
    .replace(/\s+/g, " ").trim();
}
