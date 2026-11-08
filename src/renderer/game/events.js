// Événements rares et vitesse.
//
// La vitesse de déplacement accélère tout le trajet entre deux combats
// (apparition + approche) : c'est le bonus le plus précieux du jeu, donc le
// plus rare. Sources : plumes du vent (permanent), étoile filante attrapée
// (permanent), rafale de vent (temporaire), pouvoir légendaire « Bottes d'Hermès ».

export const SPEED_CAP = 300;           // vitesse permanente maximale (+300 %)
export const FEATHER = { normal: 0.0015, elite: 0.02, boss: 0.05, gain: 1 };
export const STAR = { minS: 40 * 60, maxS: 90 * 60, life: 12, speedGain: 2 };

/** Événements temporaires : chance par victoire, durée, effet. */
export const EVENTS = {
  wind:     { name: "Rafale de vent", chance: 0.004, duration: 45, text: "Vitesse de déplacement ×2 !", color: "#9fd8ff" },
  goldrain: { name: "Pluie d’or",     chance: 0.003, duration: 30, text: "Or ×3 !",                     color: "#ffd34d" },
  frenzy:   { name: "Frénésie",       chance: 0.003, duration: 30, text: "Vitesse d’attaque ×2 !",      color: "#ff7a6b" },
};
