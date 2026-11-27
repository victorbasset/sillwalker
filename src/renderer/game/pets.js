// Familiers : compagnons qui suivent le héros. Un seul est actif à la fois ;
// il gagne de l'expérience à chaque victoire et son bonus grandit avec son
// niveau. Ils sortent d'œufs (boss, élites, quêtes). Un doublon donne de
// l'expérience au familier déjà possédé.
import { activeDayMod } from "./daymods.js"; // (it. 1700) Jour des familiers
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
  // (it. 1282) clin d'œil à Mirette, la grenouille marchande : attire les élites (+2 % par niveau, comme l'Appât)
  { id: "froglet", name: "Grenouillette", desc: "Ses coassements attirent les élites… et leur butin.", eff: { elites: 2 } },
  // (it. 1363) Lucane : le familier des chasseurs de boss (aucun ne renforçait encore les dégâts contre eux)
  { id: "stagbeetle", name: "Lucane", desc: "Ses mandibules visent les points faibles des boss.", eff: { bossDmg: 3 } },
  // (it. 1427) Pie : plus de coffres au trésor sur le chemin (+60 % au niveau 10)
  { id: "magpie", name: "Pie", desc: "Repère tout ce qui brille, surtout les coffres au trésor.", eff: { chests: 6 } },
  // (it. 1485) Grillon : événements rares plus fréquents (+50 % au niveau 10)
  { id: "cricket", name: "Grillon", desc: "Son chant attire les prodiges : les événements rares viennent plus souvent.", eff: { events: 5 } },
  // (it. 3198) Belette : esquive et riposte (aucun familier ne les donnait ; +6 % et +10 % au niveau 10)
  { id: "weasel", name: "Belette", desc: "Vive comme l’éclair, elle esquive tout… et te l’apprend.", eff: { dodge: 0.6, riposte: 1 } },
  // (it. 3214) Colibri : le familier du joueur présent (coups au clic +10 % par niveau, +100 % au niveau 10 ; aucun familier ne les touchait)
  { id: "hummingbird", name: "Colibri", desc: "Rapide comme un battement d’ailes : tes coups au clic frappent bien plus fort.", eff: { tapDmg: 10 } },
  // (it. 3246) Pie-grièche : dégâts contre les cibles sous 30 % de vie (+3 % par niveau, +30 % au niveau 10 ; aucun familier ne les donnait)
  { id: "shrike", name: "Pie-grièche", desc: "Petit oiseau chasseur au masque noir : il t’apprend à achever les blessés.", eff: { execute: 3 } },
  // (it. 3311) Guêpe : dégâts du premier coup de chaque combat (+6 % par niveau, +60 % au niveau 10 ; aucun familier ne les donnait)
  { id: "wasp", name: "Guêpe", desc: "Toujours la première à piquer : ton premier coup de chaque combat frappe plus fort.", eff: { firstStrike: 0.06 } },
  // (it. 3315) Pivert : dégâts par coup d’affilée (+0,2 % par niveau, +2 % par coup au niveau 10, jusqu’à +20 % ; aucun familier ne le donnait ;
  // it. 3328 : 0,15 s’affichait « +0,2 % » au niveau 1, arrondi à une décimale)
  { id: "woodpecker", name: "Pivert", desc: "Il frappe sans relâche : chaque coup d’affilée fait un peu plus mal.", eff: { combo: 0.2 } },
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
/** (it. 3346) Durée d'une expédition en minutes (Jour des voyages : deux fois plus courte). */
export const expeditionMin = (S, ex) => ex.min * ((S && activeDayMod(S)?.expedition) || 1);
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
  const mul = activeDayMod(S)?.pets || 1; // (it. 1700) Jour des familiers : bonus doublé
  for (const k in def.eff) out[k] = def.eff[k] * own.lvl * mul;
  return out;
}
