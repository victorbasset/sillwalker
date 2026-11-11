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
const EDITION_3 = [
  "Son : les pièces tintent en gamme, les coups varient, chaque événement et l’étoile filante ont leur son.",
  "Ambiance sonore des zones (bulles, braises, vent, oiseaux, grillons…) et musique qui évolue au fil des passages.",
  "Nouvel événement Voile protecteur (dégâts subis divisés par deux) ; voies propres aux dix héros ajoutés.",
  "Réglages : informations de la bande au milieu sur tout écran ; ambiance des zones.",
];
const EDITION_4 = [
  "Chaque pièce qui rentre dans la bourse tinte ; équiper, vendre, acheter et placer un point ont leur son.",
  "Musique plus intense pendant les combats de boss ; silence quand la bande est cachée (plein écran, icône seule).",
  "Réglages > Son : volumes de la musique et de l’ambiance, « Écouter » joue un échantillon ; touche C : couper le son.",
  "Ascension : le tri du marchand repart décoché ; rachat des potions et réclamation des quêtes restent cochés.",
];
const EDITION_5 = [
  "Sorts : trois par héros (Héros > Sorts et attaque), lancés tout seuls en combat avec leur animation, leur son et leur icône.",
  "Certains sorts transpercent : une part des dégâts frappe le monstre suivant dès son arrivée.",
  "Le bouclier se voit sur la barre de vie ; le compagnon a sa ligne dans la carte du héros.",
  "Déblocage Carte du ciel : les éclats d’étoile se placent tout seuls dans les constellations.",
];
const EDITION_6 = [
  "Sorts : la recharge raccourcit de 10 % tous les 10 rangs ; un nouveau sort est fêté dans la bande.",
  "Le trait perçant file jusqu’au monstre suivant et le frappe sous tes yeux.",
  "Les sorts appris s’affichent sur la carte du héros ; « À faire maintenant » signale un sort à apprendre.",
  "Les icônes des onglets restent visibles sur les petits écrans ; nouveau succès « Grimoire complet ».",
];
const EDITION_7 = [
  "Ton compagnon lance aussi les sorts appris pour sa classe, à moitié de leur puissance.",
  "Nouvel événement rare « Marée arcanique » : les sorts se rechargent deux fois plus vite.",
  "Nouvelle quête : lancer des sorts ; chaque carte de héros montre ses trois sorts.",
  "Le trait perçant a son son ; un bandeau annonce chaque palier de recharge.",
];
const EDITION_8 = [
  "Nouvelle musique, douce et posée (lofi) : un air toutes les 5 zones, avec la couleur de chaque décor.",
  "Piano électrique, rythme feutré, léger craquement de vinyle ; le volume se règle dans Réglages > Son.",
];
const EDITION_9 = [
  "Ascension : les ventes automatiques cochées le restent.",
  "Réglages > Son : ◀ ▶ pour écouter l’air des autres zones (45 s).",
  "Musique : les déserts ont leur couleur orientale ; chaque décor garde la sienne dans toutes les langues.",
];
const EDITION_10 = [
  "Chaque héros a des sorts uniques : étourdir, empoisonner, voler la vie, achever les blessés, se relancer…",
  "Les sorts perçants frappent tout de suite les monstres qui attendent, et un de plus tous les 10 rangs.",
  "Les effets se voient en combat ; touche B ou menu de l’icône : couper la musique seule.",
];
const EDITION_11 = [
  "Les sorts du compagnon s’apprennent depuis ton héros (« + ») et le Grimoire les améliore aussi.",
  "Le perçage atteint aussi le boss au bout de la file (un quart de sa vie au plus).",
  "Chaque icône de sort porte le badge de son effet ; les infobulles décrivent les effets.",
];
const EDITION_12 = [
  "Trois boss majeurs gardent le Rebord, en zones 50, 100 et 150 : chacun porte une relique.",
  "Quatre reliques très puissantes à gagner pour toujours (le Briseur garde la dernière), chacune avec son histoire.",
  "Les reliques sur la carte et sur ton héros : le Drone stellaire tire ses missiles à tes côtés.",
];
const EDITION_13 = [
  "Combat de boss : ta barre de vie et celle du boss sont sous vos pieds, bien visibles.",
  "Deux succès : « Première relique » et « Les quatre reliques ».",
  "Équilibrage : Barde +20 % d’or et d’expérience (au lieu de +25 %) ; Gardien des étoiles un peu moins robuste.",
];
const EDITION_14 = [
  "Reliques : chaque nouvelle victoire contre leur gardien les renforce (niveau 5 au plus, +10 % d’effet par niveau).",
  "Les reliques gagnées s’affichent en tête des pastilles de ton héros ; le prochain boss majeur est annoncé dans la zone.",
  "La bande consomme moins : contours et halos dessinés une fois pour toutes.",
];
const EDITION_15 = [
  "Reliques : un niveau par course au plus ; tant qu’elle peut monter, la relique flotte (plus pâle) à côté de son gardien.",
  "Nouveau succès : « Relique parfaite (niveau 5) ».",
  "« Depuis ta dernière visite » compte aussi les niveaux de relique gagnés.",
];
const EDITION_16 = [
  "Le Cœur de l’aube montre ses soins (en vert) ; avec la Lame du crépuscule, les coups critiques deviennent violets.",
  "Touche U : acheter le prochain déblocage dès qu’il est prêt.",
  "Équilibrage : le Samouraï perd son bonus de +5 % de coups critiques (son Iaijutsu ne change pas).",
];
const EDITION_17 = [
  "Au-delà du Rebord : les échos des trois lieutenants attendent en zones 250, 300 et 350 ; chacun renforce aussi sa relique.",
  "Les Chroniques racontent l’histoire de tes reliques ; ▶ pour revoir leur scène.",
];
const EDITION_18 = [
  "Les échos des lieutenants ont une capacité à eux : Silence (plus aucun sort pendant 4 s).",
  "Le Cœur de l’aube soigne aussi entre les combats.",
  "Correction : les missiles du Drone stellaire sont retenus par la carapace et la peau de pierre des boss, comme tes coups.",
];
export const NEWS_EDITIONS = [EDITION_1, EDITION_2, EDITION_3, EDITION_4, EDITION_5, EDITION_6, EDITION_7, EDITION_8, EDITION_9, EDITION_10, EDITION_11, EDITION_12, EDITION_13, EDITION_14, EDITION_15, EDITION_16, EDITION_17, EDITION_18];
export const NEWS_ID = NEWS_EDITIONS.length;
/** Nouveautés des éditions après `seen` (0 : toutes), la plus récente d'abord. */
export const newsItems = (seen = 0) => NEWS_EDITIONS.slice(Math.max(0, seen)).reverse().flat();
/** Au plus NEWS_MAX_EDITIONS éditions affichées (la fenêtre ne doit jamais défiler, même après une longue absence) :
 *  { items, older } — older = nombre de nouveautés plus anciennes non montrées. */
export const NEWS_MAX_EDITIONS = 3;
export function newsShown(seen = 0) {
  const eds = NEWS_EDITIONS.slice(Math.max(0, seen)).reverse();
  return { items: eds.slice(0, NEWS_MAX_EDITIONS).flat(), older: eds.slice(NEWS_MAX_EDITIONS).flat().length };
}

/** Nouveautés à annoncer ? (pas pour une partie neuve : l'intro passe avant tout) */
export const newsDue = (S) => (S.settings.newsSeen || 0) < NEWS_ID && !!(S.story && S.story.intro) && (S.stats.kills || 0) > 0;
export const markNews = (S) => { S.settings.newsSeen = NEWS_ID; };
