// Pouvoirs légendaires : chaque objet légendaire en reçoit un, tiré au sort.
// `eff` : mêmes clés que les talents (talents.js > EFFECTS).
export const POWERS = [
  { id: "p_dragon",  name: "Colère du Dragon",  eff: { atkPct: 15, burn: 10 } },
  { id: "p_hawk",    name: "Œil du faucon",     eff: { crit: 8, critDmg: 25 } },
  { id: "p_giant",   name: "Cœur de géant",     eff: { hpPct: 20, riposte: 5 } },
  { id: "p_purse",   name: "Bourse sans fond",  eff: { gold: 25 } },
  { id: "p_wind",    name: "Pas du vent",       eff: { spd: 20, dodge: 5 } },
  { id: "p_blood",   name: "Soif de sang",      eff: { lifesteal: 4, execute: 15 } },
  { id: "p_echo",    name: "Écho",              eff: { doubleShot: 12 } },
  { id: "p_sage",    name: "Sagesse ancienne",  eff: { xp: 25 } },
  { id: "p_king",    name: "Fléau des rois",    eff: { bossDmg: 35 } },
  { id: "p_phoenix", name: "Plume de phénix",   eff: { secondWind: 1, regen: 4 } },
  { id: "p_hermes",  name: "Bottes d’Hermès",    eff: { moveSpd: 20, dodge: 3 } },
  { id: "p_thorn",   name: "Ronce éternelle",    eff: { thorns: 30, hpPct: 10 } },
  { id: "p_venom",   name: "Croc de la vouivre", eff: { poison: 8, crit: 5 } },
  { id: "p_legion",  name: "Cor de la légion",   eff: { minion: 25 } },
  { id: "p_aegis",   name: "Égide solaire",      eff: { shield: 15, defPct: 15 } },
  { id: "p_rhythm",  name: "Danse des mille coups", eff: { combo: 2, spd: 10 } },
  { id: "p_blade",   name: "Lame de l’instant",  eff: { iai: 40, firstStrike: 0.5 } },
];
export const POWER_INDEX = Object.fromEntries(POWERS.map((p) => [p.id, p]));

/** Effets des pouvoirs portés. */
export function powerEffects(equip) {
  const out = {};
  for (const k in equip) {
    const p = equip[k] && equip[k].power && POWER_INDEX[equip[k].power];
    if (p) for (const e in p.eff) out[e] = (out[e] || 0) + p.eff[e];
  }
  return out;
}
