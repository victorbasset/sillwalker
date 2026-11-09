// Onglets du panneau débloqués au fur et à mesure (demande de Victor : moins d'informations d'un coup pour un
// nouveau joueur). Chaque onglet s'ouvre à un seuil ; une fois ouvert il le reste, même après une ascension
// (S.tabsOpen : { onglet: true }). Aventure et Réglages sont toujours là.
import { ASCEND_MIN_ZONE } from "./prestige.js";
import { recordZone } from "./unlocks.js";

/** Seuil d'ouverture de chaque onglet : record de zone (toutes courses) ; étalés jusqu'à la zone 40 pour laisser le
 *  temps de s'habituer à chaque onglet avant le suivant (demande de Victor). hint : conseil de la bande
 *  (ui/hints.js) qui ferait doublon avec l'annonce de l'onglet, marqué vu à l'ouverture. */
export const TAB_GATES = {
  talents:   { label: "Talents", hint: "talent", zone: 2, desc: "Dépense tes points de talent à chaque niveau." },
  quests:    { label: "Quêtes", zone: 5, desc: "Des contrats à remplir pour de l’or et des coffres." },
  shop:      { label: "Boutique", zone: 8, desc: "Potions, élixirs, coffres et déblocages permanents." },
  class:     { label: "Héros", hint: "classes", zone: 10, desc: "D’autres héros sont prisonniers : libère-les." },
  bestiary:  { label: "Bestiaire", zone: 15, desc: "Monstres rencontrés, collection d’objets, panoplies." },
  ascension: { label: "Ascension", zone: ASCEND_MIN_ZONE, desc: "Recommencer plus fort grâce aux éclats d’étoile." },
  pets:      { label: "Familiers", zone: 25, desc: "Des compagnons qui suivent ton héros et le renforcent." },
  skills:    { label: "Compétences", hint: "skills", zone: 30, desc: "L’arbre de compétences : 1 point tous les 2 niveaux." },
  stats:     { label: "Statistiques", zone: 40, desc: "Tes records et tes chiffres." },
  map:       { label: "Carte", zone: 12, desc: "La carte du Rebord : ton voyage, les héros prisonniers et l’histoire." },
};
for (const g of Object.values(TAB_GATES)) g.when = (S) => recordZone(S) >= g.zone || (g === TAB_GATES.pets && Object.keys(S.pets.owned || {}).length > 0);

/** L'onglet est-il visible ? (Aventure, Réglages et tout onglet sans seuil : toujours.) */
export const tabOpen = (S, id) => !TAB_GATES[id] || !!(S.tabsOpen && S.tabsOpen[id]);
/** Ouvert, ou seuil atteint (il s'ouvrira au prochain passage de openTabs, dans la seconde). */
export const tabReady = (S, id) => tabOpen(S, id) || TAB_GATES[id].when(S);

/** Les œufs de familier ne servent qu'une fois l'onglet Familiers là (demande 19 de Victor : pas de récompense
 *  inaccessible) : quêtes, boss, élites et boutique n'en donnent pas avant. */
export const eggsAllowed = (S) => tabReady(S, "pets");

/** Récompense de quête déjà tirée qui promet un œuf trop tôt : l'œuf devient un coffre. */
export function fixQuestEgg(S, rw) {
  if (rw && rw.egg && !eggsAllowed(S)) { delete rw.egg; rw.chest = Math.max(rw.chest || 0, 2); }
  return rw;
}

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
