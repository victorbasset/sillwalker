// Onglets du panneau débloqués au fur et à mesure (demande de Victor : moins d'informations d'un coup pour un
// nouveau joueur). Chaque onglet s'ouvre à un seuil ; une fois ouvert il le reste, même après une ascension
// (S.tabsOpen : { onglet: true }). Aventure et Réglages sont toujours là.
import { ASCEND_MIN_ZONE } from "./prestige.js";

/** Seuil d'ouverture de chaque onglet : environ un nouvel onglet toutes les 1 à 2 minutes au début
 *  (mesuré par scripts/first-minutes.mjs). */
export const TAB_GATES = {
  talents:   { when: (S) => S.lvl >= 2, desc: "Dépense tes points de talent à chaque niveau." },
  shop:      { when: (S) => S.gold >= 300 || S.best >= 8 || (S.stats.purchases || 0) > 0, desc: "Potions, élixirs, coffres et déblocages permanents." },
  quests:    { when: (S) => (S.stats.kills || 0) >= 25 || (S.quests.slots || []).some((q) => q && q.progress >= q.goal), desc: "Des contrats à remplir pour de l’or et des coffres." },
  class:     { when: (S) => S.best >= 4, desc: "D’autres héros sont prisonniers : libère-les." },
  bestiary:  { when: (S) => S.best >= 6, desc: "Monstres rencontrés, collection d’objets, panoplies." },
  skills:    { when: (S) => S.lvl >= 12, desc: "L’arbre de compétences : 1 point tous les 2 niveaux." },
  pets:      { when: (S) => (S.pets.eggs || 0) > 0 || Object.keys(S.pets.owned || {}).length > 0, desc: "Un œuf ! Les familiers suivent ton héros et le renforcent." },
  stats:     { when: (S) => (S.stats.kills || 0) >= 150, desc: "Tes records et tes chiffres." },
  ascension: { when: (S) => S.best >= ASCEND_MIN_ZONE - 5 || (S.prestige.count || 0) > 0, desc: "Recommencer plus fort grâce aux éclats d’étoile." },
};

/** L'onglet est-il visible ? (Aventure, Réglages et tout onglet sans seuil : toujours.) */
export const tabOpen = (S, id) => !TAB_GATES[id] || !!(S.tabsOpen && S.tabsOpen[id]);
/** Ouvert, ou seuil atteint (il s'ouvrira au prochain passage de openTabs, dans la seconde). */
export const tabReady = (S, id) => tabOpen(S, id) || TAB_GATES[id].when(S);

/** Ouvre les onglets dont le seuil est atteint ; renvoie la liste des nouveaux (pour les annoncer). */
export function openTabs(S) {
  const T = (S.tabsOpen ||= {}), fresh = [];
  for (const id in TAB_GATES) if (!T[id] && TAB_GATES[id].when(S)) { T[id] = "new"; fresh.push(id); } // « new » : pastille jusqu'à la visite
  return fresh;
}

/** Sauvegarde d'avant ce système : tout ce que le joueur connaissait déjà reste ouvert. */
export function seedTabs(S) {
  S.tabsOpen = {};
  const veteran = (S.prestige.count || 0) > 0 || S.best >= 10;
  for (const id in TAB_GATES) if (veteran || TAB_GATES[id].when(S)) S.tabsOpen[id] = true;
}
