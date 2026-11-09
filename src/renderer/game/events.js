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
};
