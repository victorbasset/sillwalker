// Familiers : compagnons qui suivent le héros. Un seul est actif à la fois ;
// il gagne de l'expérience à chaque victoire et son bonus grandit avec son
// niveau. Ils sortent d'œufs (boss, élites, quêtes). Un doublon donne de
// l'expérience au familier déjà possédé.
export const PET_MAX_LVL = 10;
export const EGG_CHANCE = { boss: 0.06, elite: 0.02 };
export const DUPLICATE_XP = 60;

/** `eff` : bonus par niveau (clés de talents.js > EFFECTS). */
export const PETS = [
  { id: "cat",    name: "Chaton",      desc: "Trouve toujours une pièce qui traîne.",  eff: { gold: 4 } },
  { id: "fox",    name: "Renardeau",   desc: "Flaire les trésors cachés.",             eff: { drop: 3 } },
  { id: "owl",    name: "Hibou",       desc: "Un mentor silencieux.",                  eff: { xp: 4 } },
  { id: "dragon", name: "Dragonnet",   desc: "Petit mais déjà très chaud.",            eff: { atkPct: 2, burn: 1 } },
  { id: "turtle", name: "Tortue",      desc: "Prête sa carapace.",                     eff: { defPct: 4, hpPct: 2 } },
  { id: "fairy",  name: "Fée",         desc: "Soigne les petites blessures.",          eff: { regen: 1, lifesteal: 0.5 } },
];
export const PET_INDEX = Object.fromEntries(PETS.map((p) => [p.id, p]));

export const petXpNeed = (lvl) => Math.round(25 * Math.pow(lvl, 1.6));

/** Bonus du familier actif. */
export function petEffects(S) {
  const P = S.pets, out = {};
  const id = P && P.active, own = id && P.owned[id], def = id && PET_INDEX[id];
  if (!own || !def) return out;
  for (const k in def.eff) out[k] = def.eff[k] * own.lvl;
  return out;
}
