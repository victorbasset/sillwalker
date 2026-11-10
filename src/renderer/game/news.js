// « Quoi de neuf » : après une mise à jour, une bulle discrète annonce les nouveautés (un clic les liste).
// Une seule fois par numéro (S.settings.newsSeen) ; jamais pour une partie neuve (rien à comparer).
// Ajouter une édition : ajouter une liste à la FIN de NEWS_EDITIONS (textes à traduire, i18n-append). NEWS_ID suit.
// Le joueur voit toutes les éditions qu'il n'a pas lues (la plus récente d'abord) : rien ne se perd s'il en a sauté une.
const EDITION_1 = [
  "Nouveau design « gravure pixel » : cadres, palette nuit violine et laiton, rivets dorés.",
  "Arbre des compétences illustré : une icône pour chaque nœud, un dessin unique pour les grands.",
  "Onze chroniques, chacune avec sa cinématique (▶ pour la revoir dans la carte du héros).",
  "Enclume stellaire, deux familiers, l’événement Pluie d’éclats et la capacité Peau de pierre.",
  "Réglages : économie d’énergie, cinématiques ; la bande se cache devant le plein écran (Windows).",
  "Synergies de duo : chaque héros a un partenaire idéal, et ce duo reçoit un petit bonus.",
  "Nouvel événement Nichée (des œufs à chaque victoire) ; nouvelle capacité de boss, la Malédiction, et sa parade : le Talisman de pureté.",
  "Écrans de portable (1366 px) : plus aucun onglet ne défile, les longues listes glissent sur le côté.",
  "Événement Zèle, déblocage Porte-talisman et une 12e chronique : « Le serment maudit ».",
  "Chaque déblocage a sa propre icône ; les capacités des boss ont leur son.",
  "Familier Phalène pâle ; un boss annonce ses capacités en arrivant ; un coup de pouce si sa Malédiction te bloque.",
  "Atelier : Bibliothèque (expérience) ; constellation L’Éclair (vitesse d’attaque) ; quête « Frapper au clic ».",
];
const EDITION_2 = [
  "Aventure : « À faire », « Chroniques », statistiques et chances de butin s’ouvrent dans une grande fenêtre.",
  "Nouvelle quête « Porter des coups critiques » et nouveau succès « Lame affûtée ».",
  "Nouvelle capacité de boss : Tenace, il se relève une fois avec 25 % de ses PV.",
];
export const NEWS_EDITIONS = [EDITION_1, EDITION_2];
export const NEWS_ID = NEWS_EDITIONS.length;
/** Nouveautés des éditions après `seen` (0 : toutes), la plus récente d'abord. */
export const newsItems = (seen = 0) => NEWS_EDITIONS.slice(Math.max(0, seen)).reverse().flat();

/** Nouveautés à annoncer ? (pas pour une partie neuve : l'intro passe avant tout) */
export const newsDue = (S) => (S.settings.newsSeen || 0) < NEWS_ID && !!(S.story && S.story.intro) && (S.stats.kills || 0) > 0;
export const markNews = (S) => { S.settings.newsSeen = NEWS_ID; };
