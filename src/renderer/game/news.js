// « Quoi de neuf » : après une mise à jour, une bulle discrète annonce les nouveautés (un clic les liste).
// Une seule fois par numéro (S.settings.newsSeen) ; jamais pour une partie neuve (rien à comparer).
// Ajouter une édition : augmenter NEWS_ID et remplacer NEWS_ITEMS (textes à traduire, i18n-append).
export const NEWS_ID = 1;
export const NEWS_ITEMS = [
  "Nouveau design « gravure pixel » : cadres, palette nuit violine et laiton, rivets dorés.",
  "Arbre des compétences illustré : une icône pour chaque nœud, un dessin unique pour les grands.",
  "Onze chroniques, chacune avec sa cinématique (▶ pour la revoir dans la carte du héros).",
  "Enclume stellaire, deux familiers, l’événement Pluie d’éclats et la capacité Peau de pierre.",
  "Réglages : économie d’énergie, cinématiques ; la bande se cache devant le plein écran (Windows).",
  "Synergies de duo : chaque héros a un partenaire idéal, et ce duo reçoit un petit bonus.",
  "Nouvel événement Nichée (des œufs à chaque victoire) ; nouvelle capacité de boss, la Malédiction, et sa parade : le Talisman de pureté.",
  "Écrans de portable (1366 px) : plus aucun onglet ne défile, les longues listes glissent sur le côté.",
];

/** Nouveautés à annoncer ? (pas pour une partie neuve : l'intro passe avant tout) */
export const newsDue = (S) => (S.settings.newsSeen || 0) < NEWS_ID && !!(S.story && S.story.intro) && (S.stats.kills || 0) > 0;
export const markNews = (S) => { S.settings.newsSeen = NEWS_ID; };
