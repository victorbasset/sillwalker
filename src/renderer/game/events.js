import { eggsAllowed, tabReady } from "./tabs.js";
import { classSpells, spellRank } from "./spells.js";
import { ELITE, CHAMPION } from "./data.js";
import { PET_MAX_LVL } from "./pets.js";
// Événements rares et vitesse.
//
// La vitesse de déplacement accélère tout le trajet entre deux combats
// (apparition + approche) : c'est le bonus le plus précieux du jeu, donc le
// plus rare. Sources : plumes du vent (permanent), étoile filante attrapée
// (permanent), rafale de vent (temporaire), pouvoir légendaire « Bottes d'Hermès ».

export const SPEED_CAP = 300;           // vitesse permanente maximale (+300 %)
export const FEATHER = { normal: 0.0015, elite: 0.02, boss: 0.05, gain: 1 };
/** Coffre au trésor : très rare après une victoire ; or, objet rare ou mieux, potion. */
export const CHEST = { normal: 0.002, elite: 0.015, boss: 0.03, gold: 80, epic: 0.3, legendary: 0.04 };
/** Pluie d'éclats : chance par victoire de gagner un éclat d'étoile pendant l'événement. */
export const SHARDFALL_CHANCE = 0.25;
/** Nichée : chance par victoire de trouver un œuf de familier pendant l'événement. */
export const NEST_CHANCE = 0.12;
export const HOARD_CHANCE = 0.1; // (it. 1439) Trésor enfoui : chance de coffre par victoire
export const STAR = { minS: 40 * 60, maxS: 90 * 60, life: 12, speedGain: 2 };

/** Événements temporaires : chance par victoire, durée, effet. */
export const EVENTS = {
  wind:     { name: "Rafale de vent", chance: 0.004, duration: 45, text: "Vitesse de déplacement ×2 !", color: "#9fd8ff" },
  goldrain: { name: "Pluie d’or",     chance: 0.003, duration: 30, text: "Or ×3 !",                     color: "#ffd34d" },
  frenzy:   { name: "Frénésie",       chance: 0.003, duration: 30, text: "Vitesse d’attaque ×2 !",      color: "#ff7a6b" },
  bounty:   { name: "Corne d’abondance", chance: 0.002, duration: 30, text: "Chaque victoire laisse un objet !", color: "#c08cff" },
  wisdom:   { name: "Souffle de sagesse", chance: 0.003, duration: 30, text: "Expérience ×3 !",           color: "#7fe0d0" },
  hawkeye:  { name: "Œil du faucon",  chance: 0.002, duration: 30, text: "Tous les coups sont critiques !", color: "#ff9f43" },
  // Étude des concurrents (variété) : un événement qui touche l'Ascension ; seulement après la première.
  shardfall: { name: "Pluie d’éclats", chance: 0.0015, duration: 30, text: "Chaque victoire peut laisser un éclat d’étoile !", color: "#c99bff",
    req: (S) => (S.prestige && S.prestige.count) > 0 },
  // Variété : les quêtes avancent deux fois plus vite ; seulement une fois l'onglet Quêtes ouvert.
  zeal: { name: "Zèle", chance: 0.002, duration: 30, text: "Les quêtes avancent deux fois plus vite !", color: "#7fd4ff",
    req: (S) => tabReady(S, "quests") },
  // Étude des concurrents (variété) : des œufs de familiers ; seulement quand l'onglet Familiers est ouvert.
  nest: { name: "Nichée", chance: 0.0015, duration: 30, text: "Chaque victoire peut laisser un œuf !", color: "#f0c987",
    req: (S) => eggsAllowed(S) },
  // Variété : un événement défensif (tous les autres aident à frapper ou à gagner) ; utile contre un boss coriace.
  ward: { name: "Voile protecteur", chance: 0.002, duration: 30, text: "Dégâts subis divisés par deux !", color: "#bfefff" },
  // Sorts (it. 517) : recharges deux fois plus rapides ; seulement si le héros a appris un sort.
  arcane: { name: "Marée arcanique", chance: 0.002, duration: 30, text: "Les sorts se rechargent deux fois plus vite !", color: "#b48cff",
    req: (S) => classSpells(S.cls).some((x) => spellRank(S, x.id) > 0) },
  // Variété (it. 880) : chaque monstre qui arrive est une élite (plus coriace, butin garanti) ; seulement là où
  // les élites existent déjà (pas dans les toutes premières zones de la première course).
  bloodmoon: { name: "Lune de sang", chance: 0.0015, duration: 30, text: "Chaque monstre est une élite !", color: "#ff5a6e",
    req: (S) => S.zone >= ELITE.minZone || (S.prestige && S.prestige.count) > 0 },
  // Variété (it. 898) : les étoiles filantes (+2 % de vitesse pour toujours chacune) se suivent pendant 30 s au lieu
  // d'une toutes les 40-90 min : récompense le joueur présent (ou le Filet à étoiles).
  // Variété (it. 954) : un monstre sur trois environ, dans la suite de la file, devient un gobelin doré (or volé à
  // rattraper avant qu'il s'enfuie)
  goblinrush: { name: "Ruée des gobelins", chance: 0.0015, duration: 30, text: "Des gobelins dorés partout : attrape-les !", color: "#ffcf3f" },
  // Variété (it. 1242, 15e événement) : chaque monstre qui arrive n'a que la moitié de sa vie (boss compris) : des
  // victoires en rafale, et un coup de pouce pour franchir un boss coriace.
  palemoon: { name: "Lune pâle", chance: 0.0015, duration: 30, text: "Les monstres arrivent à moitié de leur vie !", color: "#d8dcf0" },
  starfall: { name: "Nuée d’étoiles", chance: 0.001, duration: 30, text: "Les étoiles filantes se suivent : attrape-les !", color: "#ffe28a" },
  // (it. 1304) 16e : chaque coup du héros frappe deux fois (la frappe double de certains talents, garantie) ; ajouté à
  // la FIN (le tirage parcourt la liste dans l'ordre)
  echo: { name: "Écho des lames", chance: 0.002, duration: 30, text: "Chaque coup frappe deux fois !", color: "#e0a8ff" },
  // (it. 1375) 17e : le héros se soigne vite (aucun événement ne soignait ; un appui contre un boss coriace), à la FIN
  spring: { name: "Source de vie", chance: 0.002, duration: 30, text: "Le héros regagne 4 % de ses PV max par seconde !", color: "#7fe8a0" },
  // (it. 1439) Variété : coffres au trésor à la pelle (thème de la Pie et du succès « Pilleur de coffres »)
  hoard: { name: "Trésor enfoui", chance: 0.0015, duration: 30, text: "Chaque victoire peut laisser un coffre au trésor !", color: "#e8b04a" },
  // (it. 3180) 19e, variété : la qualité du butin plutôt que sa quantité (Corne d'abondance) ; à la FIN (tirage dans l'ordre)
  regal: { name: "Faveur royale", chance: 0.0015, duration: 30, text: "Chaque objet trouvé est au moins rare !", color: "#6fb8ff" },
  // (it. 3270) 20e : les élites de la file deviennent des champions (plus coriaces, objet épique) ; à partir de la zone des champions
  tourney: { name: "Défi des champions", chance: 0.0015, duration: 30, text: "Chaque élite devient un champion !", color: "#c08cff",
    req: (S) => S.zone >= CHAMPION.minZone },
  // (it. 3318) 21e : le familier qui accompagne le héros gagne son expérience bien plus vite (PET_FEST) ; seulement avec un familier
  // qui peut encore monter ; à la FIN (tirage dans l'ordre)
  petfest: { name: "Fête des familiers", chance: 0.0015, duration: 30, text: "Ton familier gagne 10 fois plus d’expérience !", color: "#ffb0d8",
    req: (S) => { const a = S.pets && S.pets.active, o = a && S.pets.owned && S.pets.owned[a]; return !!(o && o.lvl < PET_MAX_LVL); } },
  // (it. 3361) 22e : chaque objet trouvé arrive déjà forgé (SKYFORGE_PLUS) ; à la FIN (tirage dans l'ordre)
  skyforge: { name: "Forge céleste", chance: 0.0015, duration: 30, text: "Chaque objet trouvé arrive déjà forgé (+2) !", color: "#ffb347" },
};
/** (it. 3361) Forge céleste : niveau de forge minimal des objets trouvés au combat. */
export const SKYFORGE_PLUS = 2;
/** (it. 3318) Fête des familiers : multiplicateur de l'expérience du familier. */
export const PET_FEST = 10;
/** Nuée d'étoiles : délai avant l'étoile suivante, une fois la précédente attrapée ou partie (s). */
export const STARFALL_GAP = 1.5;
/** (it. 954) Ruée des gobelins : part des monstres simples à venir changés en gobelins dorés. */
export const GOBLIN_RUSH = 0.35;
/** (it. 1242) Lune pâle : part de sa vie avec laquelle chaque monstre arrive. */
export const PALE_MOON = 0.5;
/** (it. 1375) Source de vie : part des PV max regagnée par seconde. */
export const SPRING = 0.04;
/** (it. 3180) Faveur royale : rareté minimale des objets trouvés au combat (2 = rare). */
export const REGAL_MIN = 2;

/** (it. 932) Collection des événements rares : chaque événement déjà vécu donne un bonus permanent (Bestiaire). */
export const EVENT_SEEN_BONUS = { gold: 1 };
export function eventsSeenEffects(S) {
  const seen = (S && S.stats && S.stats.eventsSeen) || {}, n = Object.keys(EVENTS).filter((id) => seen[id]).length, out = {};
  if (n) for (const k in EVENT_SEEN_BONUS) out[k] = EVENT_SEEN_BONUS[k] * n;
  return out;
}
