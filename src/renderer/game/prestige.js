// Ascension (prestige) : à partir de la zone ASCEND_MIN_ZONE, le héros peut
// recommencer depuis le niveau 1 en échange d'éclats d'étoile, dépensés dans
// des constellations aux effets permanents.
// Conservé à l'ascension : classe, familiers, bestiaire, succès, améliorations
// du sac, constellations. Remis à zéro : niveau, zone, or, équipement, sac,
// talents, élixirs, quêtes, marchand.

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
  { id: "c_warrior", name: "Le Guerrier",   base: 3, max: 20, eff: { atkPct: 5 } },
  { id: "c_tower",   name: "La Tour",       base: 3, max: 20, eff: { hpPct: 5 } },
  { id: "c_coin",    name: "La Pièce",      base: 3, max: 20, eff: { gold: 10 } },
  { id: "c_owl",     name: "La Chouette",   base: 3, max: 20, eff: { xp: 10 } },
  { id: "c_comet",   name: "La Comète",     base: 5, max: 10, eff: { critDmg: 10 } },
  { id: "c_chalice", name: "Le Calice",     base: 5, max: 10, eff: { drop: 5 } },
  { id: "c_road",    name: "La Route",      base: 8, max: 10, eff: { startZone: 2 } },
  { id: "c_tree",    name: "L’Arbre",       base: 10, max: 10, eff: { talentPts: 1 } },
  { id: "c_moon",    name: "La Lune",       base: 6, max: 8,  eff: { offlineH: 1 } },
  { id: "c_flask",   name: "La Fiole",      base: 2, max: 5,  eff: { potions: 2 } },
  { id: "c_north",   name: "L’Étoile polaire", base: 6, max: 15, eff: { skillPts: 2 } },
];

export const SPECIAL_EFFECTS = {
  talentPts: (v) => `+${v} point${v > 1 ? "s" : ""} de talent`,
  skillPts: (v) => `+${v} points de compétence`,
  startZone: (v) => `recommence en zone ${1 + v} (au plus 5 zones sous le record)`,
  offlineH: (v) => `+${v} h de progression hors ligne`,
  potions: (v) => `+${v} potions au départ`,
};

export const constellationCost = (c, rank) => c.base * (rank + 1);

/** Somme des effets des constellations. */
export function prestigeEffects(S) {
  const out = {}, ranks = (S.prestige && S.prestige.ranks) || {};
  for (const c of CONSTELLATIONS) {
    const n = Math.min(ranks[c.id] || 0, c.max);
    if (n) for (const k in c.eff) out[k] = (out[k] || 0) + c.eff[k] * n;
  }
  return out;
}
