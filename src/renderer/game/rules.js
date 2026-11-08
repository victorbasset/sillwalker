// Formules d'équilibrage. Fonctions pures : (état, paramètres) -> valeurs.
import {
  RARITIES, SLOTS, SLOT_KEYS, STAT_NAMES, ITEM_BASES, ITEM_SUFFIXES, ZONES, MONSTERS, ELITE, DYES, materialFor,
  WALK_SPEED, MONSTER_SPEED, SPAWN_DIST, SPAWN_DELAY, CHAMPION,
} from "./data.js";
import { classDef } from "./classes.js";
import { talentEffects } from "./talents.js";
import { powerEffects } from "./powers.js";
import { petEffects } from "./pets.js";
import { prestigeEffects } from "./prestige.js";
import { bestiaryEffects } from "./bestiary.js";
import { skillTreeEffects } from "./skilltree.js";
import { setEffects, SETS, SET_KEYS, SET_CHANCE } from "./sets.js";
import { BUFF_EFFECTS, workshopEffects } from "./shop.js";
import { dayModEffects } from "./daymods.js";
import { codexEffects } from "./codex.js";
import { guildEffects } from "./quests.js";
import { rand, rnd, pick, shuffled } from "./util.js";

export const xpNeed = (lvl) => Math.floor(20 * Math.pow(1.2, lvl - 1));

function mainValue(stat, il) {
  return { atk: 3 + il * 2.2, hp: 10 + il * 7, def: 2 + il * 1.6, spd: 4 + il * 0.8, crit: 2 + il * 0.5 }[stat];
}
function affixValue(stat, il) {
  return { hp: 5 + il * 4, atk: 1 + il * 1, def: 1 + il * 0.8, crit: 1 + il * 0.3, spd: 2 + il * 0.5, gold: 3 + il }[stat];
}

export function rollRarity(min = 0) {
  let total = 0;
  for (let i = min; i < RARITIES.length; i++) total += RARITIES[i].weight;
  let x = rand() * total;
  for (let i = min; i < RARITIES.length; i++) {
    x -= RARITIES[i].weight;
    if (x <= 0) return i;
  }
  return RARITIES.length - 1;
}

/** Crée un objet. `id` est fourni par l'appelant (compteur de la sauvegarde). */
export function rollItem(id, zone, minRarity = 0) {
  const slot = pick(SLOT_KEYS);
  const r = rollRarity(minRarity);
  const rar = RARITIES[r];
  const il = Math.max(1, zone + (rand() < 0.3 ? 1 : 0));
  const main = SLOTS[slot].main;
  const st = {};
  st[main] = Math.round(mainValue(main, il) * (SLOTS[slot].scale || 1) * rar.mult * rnd(0.85, 1.15) * 10) / 10;
  const pool = shuffled(Object.keys(STAT_NAMES).filter((k) => k !== main));
  for (let i = 0; i < rar.affixes; i++) {
    const k = pool[i];
    st[k] = Math.round(affixValue(k, il) * rar.mult * rnd(0.5, 0.8) * 10) / 10;
  }
  const bi = Math.floor(rand() * ITEM_BASES[slot].length), base = ITEM_BASES[slot][bi];
  const { mat } = materialFor(base.kind, il);
  const suffixes = ITEM_SUFFIXES[r];
  // Épiques et légendaires : parfois une pièce de panoplie (voir sets.js).
  const set = SET_CHANCE[r] && rand() < SET_CHANCE[r] ? pick(SET_KEYS) : null;
  const name = base.n + " " + mat.n + (set ? " " + SETS[set].suffix : suffixes.length ? " " + pick(suffixes) : "");
  // Couleur visible (icône + personnage) : la matière pour le métal, le bois et les gemmes, une teinture sinon.
  const color = base.kind === "cloth" || base.kind === "leather" ? (r >= 2 ? DYES[r] : mat.color) : mat.color;
  const it = { id, slot, r, il, plus: 0, st, name, icon: base.icon, kind: base.kind, color, base: slot + ":" + base.n };
  if (set) it.set = set;
  return it;
}

/** Retire au hasard les bonus secondaires d'un objet (rareté, forge, pouvoir, panoplie conservés). */
export function rerollAffixes(it) {
  const rar = RARITIES[it.r], main = SLOTS[it.slot].main, mainV = it.st[main];
  const st = { [main]: mainV };
  const pool = shuffled(Object.keys(STAT_NAMES).filter((k) => k !== main));
  for (let i = 0; i < rar.affixes; i++) {
    const k = pool[i];
    st[k] = Math.round(affixValue(k, it.il) * rar.mult * rnd(0.5, 0.8) * 10) / 10;
  }
  it.st = st;
  return it;
}
export const reforgeCost = (it) => Math.round(40 * it.il * RARITIES[it.r].mult * RARITIES[it.r].mult);

export const itemMult = (it) => 1 + 0.1 * it.plus;
/** Valeur approximative d'un objet (niveau × rareté × forge) : sert à trouver l'emplacement le plus faible. */
export const itemScore = (it) => (it ? it.il * RARITIES[it.r].mult * itemMult(it) : 0);
export const sellValue = (it) => Math.round(5 * it.il * RARITIES[it.r].mult * RARITIES[it.r].mult * (1 + 0.3 * it.plus));
export const forgeCost = (it) => Math.round(15 * it.il * Math.pow(1.55, it.plus) * RARITIES[it.r].mult);

/**
 * Statistiques complètes du héros : niveau + objets, puis classe, talents et
 * élixirs actifs. `equip` permet de simuler un autre équipement (comparaisons).
 * Les clés en plus des 6 statistiques d'objet sont décrites dans talents.js.
 */
export function heroStats(S, equip = S.equip, { buffs = true } = {}) {
  const lvl = S.lvl, cls = classDef(S.cls);
  const s = { hp: 40 + 12 * (lvl - 1), atk: 4 + 1.6 * (lvl - 1), def: 0, crit: 5, spd: 0, gold: 0 };
  for (const k in equip) {
    const it = equip[k];
    if (!it) continue;
    const m = itemMult(it);
    for (const st in it.st) s[st] += it.st[st] * m;
  }
  // Toutes les sources de bonus : classe + talents, pouvoirs légendaires,
  // familier actif, constellations, bestiaire (puis élixirs ci-dessous).
  const t = talentEffects(S);
  for (const src of [powerEffects(equip), setEffects(equip), petEffects(S), prestigeEffects(S), bestiaryEffects(S), skillTreeEffects(S), dayModEffects(S), codexEffects(S), workshopEffects(S), guildEffects(S)]) {
    for (const k in src) t[k] = (t[k] || 0) + src[k];
  }
  if (buffs) for (const id in S.buffs || {}) if (S.buffs[id] > 0 && BUFF_EFFECTS[id]) {
    for (const k in BUFF_EFFECTS[id]) t[k] = (t[k] || 0) + BUFF_EFFECTS[id][k];
  }
  const v = (k) => t[k] || 0;
  s.hp *= (cls.mul.hp || 1) * (1 + v("hpPct") / 100);
  s.atk *= (cls.mul.atk || 1) * (1 + v("atkPct") / 100);
  s.def *= (cls.mul.def || 1) * (1 + v("defPct") / 100);
  s.crit = Math.min(75, s.crit + (cls.add.crit || 0) + v("crit"));
  s.spd = Math.min(300, s.spd + (cls.add.spd || 0) + v("spd"));
  s.gold += v("gold");
  Object.assign(s, {
    xp: v("xp"), drop: v("drop"), critDmg: 2 + v("critDmg") / 100, bossDmg: v("bossDmg"),
    execute: v("execute"), regen: 8 + v("regen"), lifesteal: v("lifesteal"), dodge: Math.min(40, v("dodge")),
    riposte: Math.min(60, v("riposte")), doubleShot: Math.min(60, v("doubleShot")), burn: v("burn"),
    firstStrike: v("firstStrike"), offline: v("offline"), secondWind: v("secondWind") > 0,
    shield: Math.min(100, v("shield")), poison: v("poison"), minion: v("minion"), combo: v("combo"), thorns: v("thorns"),
    iai: v("iai"), moveSpd: v("moveSpd") + (S.speed || 0),
  });
  return s;
}

/** Dégâts par seconde moyens (sans la brûlure ni les effets conditionnels). */
export const heroDps = (s) =>
  s.atk * (1 + (s.crit / 100) * (s.critDmg - 1)) * (1 + s.spd / 100) * (1 + 0.6 * s.doubleShot / 100) * (1 + (s.combo || 0) * 5 / 100)
  * (s.iai ? 1 + (s.iai / 100 + (1 - s.crit / 100) * (s.critDmg - 1)) / 4 : 1) // iaijutsu : 1 coup sur 4
  + s.atk * ((s.minion || 0) + (s.poison || 0) * 3) / 100; // serviteur + poison (≈ 3 charges en moyenne)

/** Puissance de combat (sert à comparer les objets) : dégâts × robustesse. */
export const power = (s) =>
  heroDps(s) * (1 + s.burn / 100) * (1 + (s.execute || 0) * 0.003) *
  s.hp * (1 + s.def / 40) * (1 + (s.shield || 0) / 200) * (1 + (s.thorns || 0) / 300) *
  (1 / (1 - Math.min(40, s.dodge || 0) / 100)) * (1 + (s.lifesteal || 0) / 25) * (1 + Math.max(0, (s.regen || 8) - 8) / 40);

/** Gain de puissance relatif si l'objet remplaçait celui équipé au même emplacement. */
export function upgradeDelta(S, it) {
  const eq = Object.assign({}, S.equip);
  eq[it.slot] = it;
  return power(heroStats(S, eq)) / power(heroStats(S)) - 1;
}

export const zoneDef = (z) => ZONES[(z - 1) % ZONES.length];
export function zoneName(z) {
  const cycle = Math.floor((z - 1) / ZONES.length);
  return zoneDef(z).name + (cycle ? " " + "+".repeat(cycle) : "");
}

/** Statistiques d'un monstre. Sans `type`, renvoie le monstre « moyen » de la zone. */
export function monsterBase(z, boss, type, elite, champion) {
  const m = Math.pow(1.28, z - 1), mod = (type && MONSTERS[type]) || { hp: 1, atk: 1, interval: 1 };
  const modGold = mod.gold || 1, modXp = mod.xp || 1;
  const e0 = elite ? ELITE : { hp: 1, atk: 1, gold: 1, xp: 1 }, c = champion ? CHAMPION : { hp: 1, atk: 1, gold: 1, xp: 1 };
  const e = { hp: e0.hp * c.hp, atk: e0.atk * c.atk, gold: e0.gold * c.gold, xp: e0.xp * c.xp };
  return {
    hp: Math.round(12 * m * (boss ? 6 : 1) * mod.hp * e.hp),
    atk: 2.2 * m * (boss ? 1.5 : 1) * mod.atk * e.atk,
    interval: (boss ? 1.5 : 1.3) * mod.interval,
    xp: Math.round(5 * Math.pow(1.22, z - 1) * (boss ? 8 : 1) * e.xp * modXp),
    gold: 3 * Math.pow(1.25, z - 1) * (boss ? 10 : 1) * e.gold * modGold,
  };
}

/** Temps moyen entre deux combats (apparition + approche), utilisé hors ligne. */
export const approachTime = () => (SPAWN_DELAY[0] + SPAWN_DELAY[1]) / 2 + SPAWN_DIST / (WALK_SPEED + MONSTER_SPEED);
