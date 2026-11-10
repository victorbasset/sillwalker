// Sorts (demande D de Victor : « différents pour chaque héros ») : chaque héros a ses trois sorts, appris dans
// « Sorts et attaque » (onglet Héros). Ils s'ajoutent à l'attaque de base : chacun se lance tout seul en combat dès qu'il est
// rechargé, avec son animation (render/strip.js) et son son. Débloqués par la zone record (6, 22, 50), achetés puis
// améliorés avec de l'or (rangs 1 à SPELL_MAX) ; chaque héros garde les siens à l'ascension.
import { CLASS_FX } from "./classes.js";

// it. 477 : plus de plafond à 10 (en fin de partie, tout se maximisait d'un coup) : le prix ×2,5 par rang fait la limite.
export const SPELL_MAX = 50;
export const SPELL_ZONES = [10, 22, 50]; // 10 : l'onglet Héros s'ouvre en zone 10 (tabs.js)

/** Bases communes (tpl) : animation, son, icône ; dmg = mult × attaque par coup (hits coups), heal / shield = % des PV max. */
export const SPELL_TEMPLATES = {
  bolt:   { cd: 8,  kind: "dmg",    mult: 1.5, hits: 1, color: "#fff27a" },
  gust:   { cd: 6,  kind: "dmg",    mult: 0.6, hits: 2, color: "#bfefff" },
  mend:   { cd: 12, kind: "heal",   pct: 8,             color: "#7dff9a" },
  fire:   { cd: 10, kind: "dmg",    mult: 2.2, hits: 1, color: "#ff9a3a" },
  aegis:  { cd: 15, kind: "shield", pct: 8,             color: "#ffe9a8" },
  meteor: { cd: 20, kind: "dmg",    mult: 5,   hits: 1, color: "#ff5a3a" },
};

/**
 * Effets propres (demande Q de Victor, it. 548 : « chaque héros devrait avoir des sorts uniques ») : chaque sort a sa
 * base ET ses effets, aucune combinaison n'est partagée (test). Effets :
 *   pierce p : transperce la file (p = part des dégâts) · hits n : nombre de coups · stun s : étourdit (le monstre
 *   n'attaque plus) · slow s : ralentit ses attaques (×0,5) · weaken s : il frappe 30 % moins fort · burn k : brûlure
 *   (k × attaque / s, 3 s) · venom k : poison cumulable (k × attaque / s, 5 s) · leech p : soigne p % des dégâts ·
 *   execute p : dégâts ×2 sous p % de vie · crit : peut être critique · echo p : p chance de se relancer aussitôt ·
 *   haste s : attaque du héros ×1,5 pendant s · cdr s : recharge des autres sorts −s · regen p : soin p % PV / s (5 s).
 */
const CLASS_SPELLS = {
  warrior:     [["gust", "Tourbillon", { pierce: 0.5 }], ["aegis", "Cri de ralliement", { haste: 5 }], ["meteor", "Fracas du titan", { stun: 2 }]],
  ranger:      [["gust", "Volée de flèches", { pierce: 0.5, crit: 1 }], ["mend", "Herbes médicinales", { regen: 2 }], ["meteor", "Pluie de flèches", { hits: 3, slow: 4 }]],
  mage:        [["fire", "Boule de feu", { burn: 0.6 }], ["aegis", "Bouclier arcanique", { cdr: 2 }], ["meteor", "Météore", { burn: 1, stun: 1 }]],
  paladin:     [["bolt", "Jugement", { pierce: 0.6, execute: 30 }], ["mend", "Imposition des mains", { weaken: 5 }], ["meteor", "Colère divine", { leech: 20 }]],
  assassin:    [["gust", "Lames jumelles", { crit: 1, venom: 0.3 }], ["aegis", "Voile d’ombre", { slow: 4 }], ["meteor", "Exécution", { execute: 40 }]],
  necro:       [["bolt", "Trait d’ombre", { pierce: 0.6, leech: 25 }], ["mend", "Siphon de vie", { venom: 0.4 }], ["meteor", "Nuée d’os", { hits: 3, weaken: 4 }]],
  monk:        [["gust", "Rafale de poings", { hits: 4, stun: 0.5 }], ["mend", "Méditation", { cdr: 3 }], ["meteor", "Paume du dragon", { burn: 0.8 }]],
  druid:       [["bolt", "Épines", { pierce: 0.6, venom: 0.3 }], ["mend", "Régénération", { regen: 3 }], ["meteor", "Colère de la forêt", { slow: 5, stun: 1 }]],
  samurai:     [["gust", "Double tranchant", { execute: 25 }], ["aegis", "Garde parfaite", { weaken: 4 }], ["meteor", "Lame céleste", { crit: 1 }]],
  berserker:   [["gust", "Frénésie de lames", { haste: 4, leech: 10 }], ["mend", "Soif de sang", { haste: 3 }], ["meteor", "Coup de massue", { stun: 2.5 }]],
  arbalest:    [["bolt", "Carreau perforant", { pierce: 0.8 }], ["aegis", "Pavois", { slow: 3, weaken: 3 }], ["meteor", "Salve d’artillerie", { echo: 0.35 }]],
  lancer:      [["gust", "Estocade", { pierce: 0.5, execute: 30 }], ["aegis", "Mur de piques", { stun: 1 }], ["meteor", "Charge héroïque", { haste: 5 }]],
  priestess:   [["bolt", "Rayon sacré", { pierce: 0.5, crit: 1 }], ["mend", "Prière", { regen: 2, weaken: 3 }], ["meteor", "Lumière de l’aube", { leech: 30, weaken: 4 }]],
  gladiator:   [["gust", "Enchaînement", { echo: 0.3 }], ["aegis", "Bouclier du champion", { haste: 4, weaken: 2 }], ["meteor", "Ovation", { crit: 1, haste: 3 }]],
  shaman:      [["bolt", "Foudre des ancêtres", { pierce: 0.6, stun: 0.8 }], ["mend", "Esprit guérisseur", { cdr: 2 }], ["meteor", "Tempête", { echo: 0.5, slow: 3 }]],
  bladedancer: [["gust", "Danse des lames", { hits: 5 }], ["aegis", "Pas de l’ombre", { cdr: 2, haste: 2 }], ["meteor", "Valse mortelle", { execute: 35, haste: 3 }]],
  cryomancer:  [["bolt", "Javelot de glace", { pierce: 0.6, slow: 4 }], ["aegis", "Armure de givre", { slow: 5 }], ["meteor", "Blizzard", { stun: 2, slow: 4 }]],
  bard:        [["gust", "Accord dissonant", { weaken: 4 }], ["mend", "Chant apaisant", { regen: 2, haste: 3 }], ["meteor", "Crescendo final", { echo: 0.4 }]],
  starwarden:  [["bolt", "Étoile filante", { pierce: 0.7, crit: 1 }], ["aegis", "Égide stellaire", { cdr: 3 }], ["meteor", "Chute d’étoile", { burn: 1, crit: 1 }]],
  artificer:   [["fire", "Grenade", { burn: 0.5, slow: 2 }], ["aegis", "Bouclier mécanique", { weaken: 5 }], ["meteor", "Bombe à fragmentation", { hits: 3, pierce: 0.4 }]],
};

export const SPELLS = Object.entries(CLASS_SPELLS).flatMap(([cls, list]) => list.map(([tpl, name, fx = {}], i) =>
  ({ id: `${cls}.${i}`, cls, tpl, name, zone: SPELL_ZONES[i], ...SPELL_TEMPLATES[tpl], ...fx, fx: Object.keys(fx),
    color: CLASS_FX[cls] || SPELL_TEMPLATES[tpl].color })));
export const SPELL_INDEX = Object.fromEntries(SPELLS.map((s) => [s.id, s]));
/** Sorts d'un héros (liste vide pour un héros inconnu). */
export const classSpells = (cls) => SPELLS.filter((s) => s.cls === cls);

/** Perçage (demande R de Victor, it. 547) : nombre de monstres traversés au rang r (1, puis +1 tous les 10 rangs) ;
 *  chaque monstre suivant en prend PIERCE_FALLOFF de moins. */
export const pierceTargets = (r) => 1 + Math.floor(Math.max(0, r) / 10);
export const PIERCE_FALLOFF = 0.7;

/** Puissance des sorts lancés par le compagnon du duo (it. 513) : la moitié. */
export const PARTNER_SPELL = 0.5;

/** Puissance d'un sort au rang r (1 à SPELL_MAX) : +25 % par rang au-delà du premier. */
export const spellScale = (r) => 1 + 0.25 * Math.max(0, r - 1);
/** Prix du rang suivant (rang actuel r, 0 = pas encore appris) : suit l'or de la zone de déblocage. */
export const spellPrice = (sp, r) => Math.round(3 * Math.pow(1.25, sp.zone - 1) * 400 * Math.pow(2.5, r));
export const spellRank = (S, id) => Math.max(0, Math.min(SPELL_MAX, (S.spells && +S.spells[id]) || 0));

/** Recharge au rang r (it. 501, palier de progression) : -10 % tous les 10 rangs (rang 50 : moitié). */
export const spellCd = (sp, r) => Math.round(sp.cd * (1 - 0.1 * Math.floor(Math.max(0, r) / 10)) * 10) / 10;

/** Valeur du sort au rang r : dégâts en multiple de l'attaque (par coup), ou part des PV max. */
export function spellValue(sp, r) {
  const k = spellScale(r);
  return sp.kind === "dmg" ? sp.mult * k : sp.pct * k;
}
