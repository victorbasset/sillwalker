// Histoire du jeu (demande de Victor : une intro, un but final et une fin).
// Le Rebord : la mince bande au bord du monde, entre le monde et le vide. Le Briseur d'Étoiles a fracassé le ciel ;
// ses éclats (les éclats d'étoile du jeu) sont tombés sur le Rebord. Ses lieutenants, les boss de zone, retiennent
// les derniers héros prisonniers. Le héros, dernier marcheur du Rebord, doit l'affronter en zone FINAL_ZONE.
// Textes en français (clés de traduction), affichés avec tx().

/** Zone du Briseur d'Étoiles, but final du jeu. */
export const FINAL_ZONE = 200;

/** Le Briseur d'Étoiles : boss de la zone FINAL_ZONE (première fois et suivantes), plus coriace qu'un boss ordinaire,
 *  avec trois capacités. Vaincu une première fois : S.story.won (fin de l'histoire, gardée à l'ascension). */
export const FINAL_BOSS = { name: "Le Briseur d’Étoiles", hp: 2.5, atk: 1.25, mech: ["smash", "mirror", "fury"] };
export const isFinalZone = (z) => z === FINAL_ZONE;
export const storyWon = (S) => !!(S.story && S.story.won);

/** Introduction : trois bulles au tout premier lancement (passables d'un clic). */
export const INTRO = [
  "Il y a mille ans, le Briseur d’Étoiles a fracassé le ciel. Ses éclats sont tombés sur le Rebord, la mince frontière entre le monde et le vide.",
  "Ses lieutenants y règnent et retiennent prisonniers les derniers héros. Un seul marche encore : le tien.",
  "Atteins la zone 200 et terrasse le Briseur d’Étoiles pour rallumer le ciel. Chaque renaissance te rendra plus fort.",
];

/** Valeur par défaut de S.story : intro vue ou non, chroniques déjà annoncées. */
export const freshStory = () => ({ intro: false, read: {}, won: false });

/** L'introduction est-elle à montrer ? (tout premier lancement seulement) */
export const introDue = (S) => !(S.story && S.story.intro);
export function markIntro(S) { (S.story ||= freshStory()).intro = true; }

/** Chroniques : fragments de l'histoire débloqués à des paliers, relisibles dans la carte du héros.
 *  when(S, rec) : rec = record de zone de toutes les courses. */
export const CHRONICLES = [
  { id: "sky", title: "Le ciel brisé", when: () => true,
    text: "Il y a mille ans, le Briseur d’Étoiles a fracassé le ciel. Ses éclats sont tombés sur le Rebord, la mince frontière entre le monde et le vide. Depuis, la nuit n’a plus d’étoiles." },
  { id: "captive", title: "Le premier captif", when: (S, rec) => rec >= 10,
    text: "Derrière le boss vaincu, une cage s’ouvre : un autre héros, vivant. Le Briseur n’a pas tué les marcheurs du Rebord ; il les a confiés à ses lieutenants. Tous peuvent être libérés." },
  { id: "shards", title: "Les éclats", when: (S, rec) => rec >= 25,
    text: "Les éclats d’étoile ne sont pas des pierres : ce sont des morceaux de ciel qui se souviennent d’avoir brillé. Rassemblés, ils rendent leur force à qui les porte." },
  { id: "rebirth", title: "Renaissance", when: (S) => (S.prestige.count || 0) > 0,
    text: "Tu es tombé, et tu t’es relevé au premier pas du Rebord, plus fort. Les étoiles rallumées veillent sur toi : chaque renaissance te rapproche du Briseur." },
  { id: "bastion", title: "Le Bastion noir", when: (S, rec) => rec >= 50,
    text: "Les lieutenants tiennent le Rebord depuis leurs bastions. Plus tu avances, plus ils se méfient : le Briseur sait désormais que quelqu’un marche vers lui." },
  { id: "beyond", title: "Au-delà des cartes", when: (S, rec) => rec >= 100,
    text: "Plus aucune carte ne décrit ces terres. Les zones se répètent, déformées, comme si le Rebord se repliait sur lui-même à l’approche du Briseur." },
  { id: "crack", title: "Le ciel se fissure", when: (S, rec) => rec >= 150,
    text: "Au-dessus de toi, une lueur traverse la nuit pour la première fois depuis mille ans. Le ciel se souvient. Le Briseur, lui, t’attend au bout du Rebord." },
  { id: "threshold", title: "Le seuil", when: (S, rec) => rec >= 190,
    text: "Le vent ne souffle plus. Les monstres fuient. Encore quelques pas, et tu feras face au Briseur d’Étoiles, en zone 200." },
  { id: "dawn", title: "Le ciel rallumé", when: (S) => storyWon(S),
    text: "Le Briseur d’Étoiles s’est effondré en mille éclats de lumière. Un à un, ils sont remontés vers le ciel : cette nuit, pour la première fois depuis mille ans, les étoiles brillent sur le Rebord. Les héros sont libres. Et toi, tu marches encore : au-delà du Rebord, d’autres terres attendent." },
];

/** Chroniques débloquées (dans l'ordre). */
export const chroniclesUnlocked = (S, rec) => CHRONICLES.filter((c) => c.when(S, rec));

/** Nouvelles chroniques (débloquées, pas encore annoncées) : les marque lues et les renvoie (pour l'annonce). */
export function takeNewChronicles(S, rec) {
  const st = (S.story ||= freshStory()), read = (st.read ||= {}), fresh = [];
  for (const c of chroniclesUnlocked(S, rec)) if (!read[c.id]) { read[c.id] = true; fresh.push(c); }
  return fresh;
}
