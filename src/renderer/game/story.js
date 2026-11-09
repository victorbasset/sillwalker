// Histoire du jeu (demande de Victor : une intro, un but final et une fin).
// Le Rebord : la mince bande au bord du monde, entre le monde et le vide. Le Briseur d'Étoiles a fracassé le ciel ;
// ses éclats (les éclats d'étoile du jeu) sont tombés sur le Rebord. Ses lieutenants, les boss de zone, retiennent
// les derniers héros prisonniers. Le héros, dernier marcheur du Rebord, doit l'affronter en zone FINAL_ZONE.
// Textes en français (clés de traduction), affichés avec tx().

/** Zone du Briseur d'Étoiles, but final du jeu. */
export const FINAL_ZONE = 200;

/** Introduction : trois bulles au tout premier lancement (passables d'un clic). */
export const INTRO = [
  "Il y a mille ans, le Briseur d’Étoiles a fracassé le ciel. Ses éclats sont tombés sur le Rebord, la mince frontière entre le monde et le vide.",
  "Ses lieutenants y règnent et retiennent prisonniers les derniers héros. Un seul marche encore : le tien.",
  "Atteins la zone 200 et terrasse le Briseur d’Étoiles pour rallumer le ciel. Chaque renaissance te rendra plus fort.",
];

/** Valeur par défaut de S.story : intro vue ou non, chroniques déjà annoncées. */
export const freshStory = () => ({ intro: false, read: {} });

/** L'introduction est-elle à montrer ? (tout premier lancement seulement) */
export const introDue = (S) => !(S.story && S.story.intro);
export function markIntro(S) { (S.story ||= freshStory()).intro = true; }
