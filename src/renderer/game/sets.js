// Panoplies : certains objets épiques et légendaires appartiennent à une
// panoplie ; en porter 2 puis 4 pièces différentes débloque des bonus.
// `eff` : mêmes clés que les talents (talents.js > EFFECTS).
export const SETS = {
  dawn:     { name: "Gardien de l’aube",   suffix: "du Gardien de l’aube",   color: "#ffd38a",
              two: { hpPct: 15, defPct: 15 }, four: { shield: 15, thorns: 20 } },
  dusk:     { name: "Lame du crépuscule",  suffix: "de la Lame du crépuscule", color: "#c08cff",
              two: { atkPct: 12, crit: 5 }, four: { critDmg: 50, execute: 20 } },
  wind:     { name: "Voyageur du vent",    suffix: "du Voyageur du vent",    color: "#9fd8ff",
              two: { moveSpd: 10, spd: 10 }, four: { moveSpd: 25, dodge: 8 } },
  merchant: { name: "Marchand royal",      suffix: "du Marchand royal",      color: "#ffd34d",
              two: { gold: 25, drop: 10 }, four: { gold: 50, xp: 25 } },
  archmage: { name: "Archimage",           suffix: "de l’Archimage",         color: "#7fd6ff",
              two: { burn: 15, poison: 4 }, four: { minion: 30, atkPct: 15 } },
};
export const SET_KEYS = Object.keys(SETS);
export const SET_CHANCE = { 3: 0.3, 4: 0.2 }; // par rareté (épique, légendaire)

/** Nombre de pièces portées par panoplie. */
export function setCounts(equip) {
  const n = {};
  for (const k in equip) { const it = equip[k]; if (it && it.set) n[it.set] = (n[it.set] || 0) + 1; }
  return n;
}

/** Bonus des panoplies actives. */
export function setEffects(equip) {
  const out = {}, add = (eff) => { for (const k in eff) out[k] = (out[k] || 0) + eff[k]; };
  const n = setCounts(equip);
  for (const id in n) { const s = SETS[id]; if (!s) continue; if (n[id] >= 2) add(s.two); if (n[id] >= 4) add(s.four); }
  return out;
}
