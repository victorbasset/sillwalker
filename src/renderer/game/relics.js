// Boss majeurs et reliques (demande S de Victor, it. 571) : trois grands lieutenants du Briseur d'Étoiles gardent,
// en zones 50, 100 et 150, une relique qu'on voit sur eux pendant le combat ; vaincus, ils la laissent au héros.
// La quatrième relique tombe du Briseur lui-même (zone 200, story.js). Chaque relique est très puissante (les dix
// zones suivantes doivent devenir faciles) et se garde pour toujours, ascensions comprises.
// Textes en français (clés de traduction), affichés avec tx().

/** Les trois lieutenants : boss de leur zone, plus coriaces qu'un boss ordinaire, avec leurs capacités. */
export const MAJOR_BOSSES = [
  { zone: 50, id: "warden", name: "Le Geôlier mécanique", hp: 2, atk: 1.15, mech: ["shell", "smash"], relic: "drone" },
  { zone: 100, id: "queen", name: "La Reine des cendres", hp: 2.2, atk: 1.2, mech: ["drain", "fury"], relic: "heart" },
  { zone: 150, id: "eclipse", name: "Le Chevalier de l’éclipse", hp: 2.4, atk: 1.2, mech: ["frost", "mirror", "smash"], relic: "blade" },
];
/** Boss majeur de la zone z (première traversée du Rebord seulement), ou null. */
export const majorBoss = (z) => MAJOR_BOSSES.find((b) => b.zone === z) || null;

/** Les quatre reliques : zone où elles tombent, effet (texte), histoire. */
export const RELICS = {
  drone: { zone: 50, name: "Drone stellaire", from: "Le Geôlier mécanique",
    effect: "Toutes les 1,5 s, un missile : 1,5 % des PV du monstre (0,4 % pour un boss) + 300 % de ton attaque.",
    story: "Le Geôlier gardait les cages avec une sentinelle forgée dans un éclat d’étoile. Libérée de son maître, elle s’est tournée vers toi : elle se souvient du ciel, et elle a choisi son camp." },
  heart: { zone: 100, name: "Cœur de l’aube", from: "La Reine des cendres",
    effect: "Dégâts subis −45 % ; tu regagnes 1 % de tes PV chaque seconde.",
    story: "La Reine avait arraché le dernier lever de soleil et le gardait dans sa poitrine. En tombant, elle l’a lâché : il bat encore, chaud comme un matin d’été, et il te tient debout." },
  blade: { zone: 150, name: "Lame du crépuscule", from: "Le Chevalier de l’éclipse",
    effect: "Ton attaque est multipliée par 2,5.",
    story: "Le Chevalier portait l’épée qui a fendu le ciel aux côtés du Briseur. Dans ta main, elle ne coupe plus les étoiles : elle coupe ce qui les menace." },
  crown: { zone: 200, name: "Couronne d’étoiles", from: "Le Briseur d’Étoiles",
    effect: "Attaque et PV doublés ; or gagné +50 %.",
    story: "Des éclats du Briseur, un cercle de lumière est resté au sol. Les étoiles rallumées l’ont posé sur ta tête : le Rebord a désormais un gardien." },
};
export const RELIC_IDS = Object.keys(RELICS);
export const hasRelic = (S, id) => !!(S.relics && S.relics[id]);

/** Drone stellaire : intervalle des missiles et dégâts (part des PV max, plus fort contre les monstres ordinaires). */
// (it. 571 : à 4 % des PV, il écrasait toutes les zones suivantes pour toujours : semaine simulée 186 → 290)
/** Puissance des autres reliques (règles : rules.js pour l'attaque, les PV et l'or ; game.js pour le Cœur de l'aube). */
export const RELIC_POWER = { blade: 2.5, crown: 2, crownGold: 1.5, heartGuard: 0.55, heartRegen: 0.01 };
export const DRONE = { every: 1.5, pct: 0.015, bossPct: 0.004, atk: 3 };
