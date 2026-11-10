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
  { id: "rabbit", name: "Lapin",       desc: "Toujours pressé : le compagnon des voyageurs. Rare.", eff: { moveSpd: 1.5 }, weight: 0.5 },
  { id: "raven",  name: "Corbeau",     desc: "Repère les points faibles de l’ennemi.", eff: { crit: 0.8, critDmg: 3 } },
  { id: "golemling", name: "Golem miniature", desc: "Un petit mur qui marche.",        eff: { shield: 1.5, defPct: 2 } },
  { id: "salamander", name: "Salamandre", desc: "Laisse des traces brûlantes.",        eff: { burn: 2, poison: 0.5 } },
  { id: "hedgehog", name: "Hérisson",   desc: "Ses piquants renvoient les coups.",     eff: { thorns: 3, defPct: 1 } },
  { id: "slimepet", name: "Mini-gluant", desc: "Il colle aux talons et ramasse tout.",  eff: { gold: 2, drop: 2 } },
  { id: "squirrel", name: "Écureuil",  desc: "Cache des noisettes… et des pièces.",   eff: { gold: 2, xp: 2 } },
  { id: "phoenix", name: "Phénix",     desc: "Un oiseau de légende. Très rare.",       eff: { atkPct: 2, hpPct: 2, regen: 0.5 }, weight: 0.25 },
  // Étude des concurrents (variété) : deux familiers de plus.
  { id: "firefly", name: "Luciole",     desc: "Veille pendant ton absence : le temps passé loin compte davantage.", eff: { xp: 2, offline: 3 } },
  // Contre la Malédiction des boss : un peu de pureté (durée réduite), sans valoir le Talisman de pureté.
  { id: "moth", name: "Phalène pâle", desc: "Ses ailes de lumière éloignent les malédictions.", eff: { purity: 5, hpPct: 1 } }, // ×niveau : 50 % de pureté au niveau 10
  { id: "starling", name: "Étoilon",    desc: "Un éclat d’étoile vivant qui a choisi de te suivre. Rare.", eff: { moveSpd: 1, crit: 0.5 }, weight: 0.4 },
];
/** Tirage d'un familier selon sa rareté (weight, 1 par défaut). */
export function rollPet(rand) {
  const total = PETS.reduce((a, p) => a + (p.weight ?? 1), 0);
  let x = rand() * total;
  for (const p of PETS) { x -= p.weight ?? 1; if (x <= 0) return p; }
  return PETS[0];
}
/**
 * Expéditions : un familier qui n'est pas le compagnon actif peut partir
 * explorer (en temps réel, même jeu fermé). Au retour : or, expérience du
 * familier, parfois un œuf ou un objet. Plus c'est long, plus c'est rentable.
 */
export const EXPEDITIONS = {
  short: { name: "Balade",            min: 30,  gold: 40,  xp: 40,  egg: 0.04, item: 0.25, minRarity: 1 },
  long:  { name: "Voyage",            min: 120, gold: 200, xp: 160, egg: 0.12, item: 0.6,  minRarity: 2 },
  epic:  { name: "Grande expédition", min: 480, gold: 900, xp: 600, egg: 0.35, item: 1,    minRarity: 3 },
};
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
