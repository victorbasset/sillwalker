// Bestiaire : victoires par type de monstre. Chaque palier atteint pour un
// monstre donne un petit bonus permanent (cumulable sur tous les monstres).
import { MONSTERS } from "./data.js";

export const BESTIARY_TIERS = [10, 100, 1000, 10000];
export const BESTIARY_BONUS = { atkPct: 0.5, gold: 1 }; // par palier atteint

export const bestiaryTier = (kills) => BESTIARY_TIERS.filter((t) => kills >= t).length;

export function bestiaryEffects(S) {
  const B = S.bestiary || {};
  let tiers = 0;
  for (const k in MONSTERS) tiers += bestiaryTier(B[k] || 0);
  const out = {};
  if (tiers) for (const k in BESTIARY_BONUS) out[k] = BESTIARY_BONUS[k] * tiers;
  return out;
}

export const bestiaryTiersTotal = (S) => Object.keys(MONSTERS).reduce((a, k) => a + bestiaryTier((S.bestiary || {})[k] || 0), 0);
