// Ascension (prestige) : à partir de la zone ASCEND_MIN_ZONE, le héros peut
// recommencer depuis le niveau 1 en échange d'éclats d'étoile, dépensés dans
// des constellations aux effets permanents.
// Conservé à l'ascension : classe, familiers, bestiaire, succès, améliorations
// du sac, constellations. Remis à zéro : niveau, zone, or, équipement, sac,
// talents, élixirs, quêtes, marchand.

import { t as tx, txn } from "../i18n/index.js";

export const ASCEND_MIN_ZONE = 20;

/** Éclats gagnés en montant maintenant (selon la meilleure zone atteinte). */
export const shardsFor = (best) => (best < ASCEND_MIN_ZONE ? 0 : Math.floor(Math.pow(best - 14, 1.5)));

/**
 * Constellations. `eff` : effets par rang (mêmes clés que les talents, voir
 * talents.js > EFFECTS), plus quelques effets propres :
 *   talentPts (points de talent en plus), startZone (zones de départ en plus),
 *   offlineH (heures hors ligne en plus), potions (potions au départ).
 * Coût du rang n+1 : base × (n + 1).
 */
export const CONSTELLATIONS = [
  { id: "c_warrior", name: tx("Le Guerrier"),   base: 3, max: 20, eff: { atkPct: 5 } },
  { id: "c_tower",   name: tx("La Tour"),       base: 3, max: 20, eff: { hpPct: 5 } },
  { id: "c_coin",    name: tx("La Pièce"),      base: 3, max: 20, eff: { gold: 10 } },
  { id: "c_owl",     name: tx("La Chouette"),   base: 3, max: 20, eff: { xp: 10 } },
  { id: "c_comet",   name: tx("La Comète"),     base: 5, max: 10, eff: { critDmg: 10 } },
  { id: "c_chalice", name: tx("Le Calice"),     base: 5, max: 10, eff: { drop: 5 } },
  { id: "c_road",    name: tx("La Route"),      base: 8, max: 10, eff: { startZone: 2 } },
  { id: "c_tree",    name: tx("L’Arbre"),       base: 10, max: 10, eff: { talentPts: 1 } },
  { id: "c_moon",    name: tx("La Lune"),       base: 6, max: 8,  eff: { offlineH: 1 } },
  { id: "c_flask",   name: tx("La Fiole"),      base: 2, max: 5,  eff: { potions: 2 } },
  { id: "c_north",   name: tx("L’Étoile polaire"), base: 6, max: 15, eff: { skillPts: 2 } },
  { id: "c_shield",  name: tx("Le Bouclier"),   base: 3, max: 20, eff: { defPct: 5 } },
  { id: "c_crown",   name: tx("La Couronne"),   base: 5, max: 10, eff: { bossDmg: 8 } },
  { id: "c_serpent", name: tx("Le Serpent"),    base: 5, max: 10, eff: { lifesteal: 0.5 } },
  { id: "c_wing",    name: tx("L’Aile"),        base: 12, max: 10, eff: { moveSpd: 3 } },
  { id: "c_bolt",    name: tx("L’Éclair"),      base: 10, max: 10, eff: { spd: 2 } }, // vitesse d'attaque : la seule statistique majeure sans constellation
  { id: "c_hunter",  name: tx("Le Chasseur"),   base: 6, max: 10, eff: { elites: 5 } }, // plus d'élites : plus de risque, plus de butin
];

export const SPECIAL_EFFECTS = {
  talentPts: (v) => txn(v, "+{n} point de talent|+{n} points de talent"),
  skillPts: (v) => `${tx("+{0} points de compétence", { 0: v })}`,
  startZone: (v) => `${tx("recommence en zone {0} (au plus 5 zones sous le record)", { 0: 1 + v })}`,
  offlineH: (v) => `${tx("+{0} h de progression hors ligne", { 0: v })}`,
  potions: (v) => `${tx("+{0} potions au départ", { 0: v })}`,
};

export const constellationCost = (c, rank) => c.base * (rank + 1);

/** Lueur stellaire : chaque éclat gagné (au total, même dépensé) renforce le héros pour toujours. */
export const GLOW_PER_SHARD = { atkPct: 3, hpPct: 3, gold: 1 };
export const glowEffects = (S) => {
  const n = (S.prestige && S.prestige.total) || 0, out = {};
  if (n) for (const k in GLOW_PER_SHARD) out[k] = GLOW_PER_SHARD[k] * n;
  return out;
};

/** Somme des effets des constellations. */
export function prestigeEffects(S) {
  const out = glowEffects(S), ranks = (S.prestige && S.prestige.ranks) || {};
  for (const c of CONSTELLATIONS) {
    const n = Math.min(ranks[c.id] || 0, c.max);
    if (n) for (const k in c.eff) out[k] = (out[k] || 0) + c.eff[k] * n;
  }
  return out;
}
