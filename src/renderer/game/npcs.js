// PNJ de l'histoire (demande E de Victor, it. 1073) : chaque onglet qui se débloque est tenu par un personnage rencontré
// sur la route (une maison, une cabane, un lac…). Il apparaît, stylisé, en haut de son onglet et parle au joueur.
// Textes en français (traduits à l'affichage par tx()) ; art : render/art-npcs.js ; lieu dessiné dans la scène de
// rencontre : juice.js, npcPlace. Pastille dans l'onglet : ui/npc.js.

export const NPCS = {
  shop: {
    name: "Mirette, la grenouille marchande",
    place: "Une maisonnette sous un grand nénuphar",
    art: "frog",
    lines: [
      "Bienvenue, voyageur ! J’ai quelques objets pour toi.",
      "Tout est frais, ramassé au bord du Rebord !",
      "Un coffre ? Je ne sais jamais ce qu’il y a dedans… moi non plus !",
      "Reviens quand l’étal sera renouvelé : j’aurai du neuf.",
      "Croâ ! Pardon. Ça m’échappe quand je fais une bonne affaire.",
    ],
  },
  // (it. 1087) le serrurier qui ouvre les cages des héros captifs (onglet Héros)
  class: {
    name: "Bram, le serrurier des cages",
    place: "Un atelier de serrurier au bord du chemin",
    art: "smith",
    lines: [
      "Une cage ? Donne-moi une minute et une bonne lime.",
      "Chaque héros libéré, c’est une serrure de moins au Briseur.",
      "Les barreaux sont faits d’éclats d’étoile. Ça tord mes limes.",
      "Choisis bien ton compagnon : on ne marche jamais seul longtemps.",
      "Je garde une clé pour chaque cage. Encore faut-il trouver la cage.",
    ],
  },
  // (it. 1088) la cartographe du Rebord (onglet Carte)
  map: {
    name: "Sola, la cartographe",
    place: "Une tour de guet couverte de cartes",
    art: "carto",
    lines: [
      "Chaque zone que tu traverses, je la dessine.",
      "Au-delà de la zone 100, mes cartes se répètent… c’est étrange.",
      "Les héros captifs sont marqués d’une cage. Va les chercher !",
      "Il me manque encore le bout du Rebord. Tu me le raconteras ?",
      "Ne te perds pas : de là-haut, je te vois toujours.",
    ],
  },
  // (it. 1089) le naturaliste du Bestiaire
  bestiary: {
    name: "Fenouil, le naturaliste",
    place: "Une tente pleine de bocaux et de croquis",
    art: "natur",
    lines: [
      "Fascinant ! Tu en as vaincu combien, de celui-là ?",
      "Chaque monstre étudié te rend un peu plus fort contre lui.",
      "Les panoplies ? J’en note chaque pièce dans mon carnet.",
      "Ne me rapporte pas de gobelin vivant. Plus jamais.",
      "Un jour, mon bestiaire sera complet. Grâce à toi.",
    ],
  },
  // (it. 1090) l'éleveuse de familiers
  pets: {
    name: "Maman Brindille, l’éleveuse",
    place: "Un grand nid de paille au pied d’un arbre",
    art: "keeper",
    lines: [
      "Un œuf ? Garde-le au chaud, il éclora bientôt.",
      "Chaque familier a son caractère. Comme les enfants.",
      "Envoie-les en expédition : ils reviennent toujours, les poches pleines.",
      "Le plus petit des familiers peut sauver le plus grand des héros.",
      "Chut… celui-là dort. Il a beaucoup couru aujourd’hui.",
    ],
  },
  // (it. 1093) la gardienne de la fleur de compétences
  skills: {
    name: "Iris, la jardinière des étoiles",
    place: "Un jardin où poussent des fleurs lumineuses",
    art: "gardener",
    lines: [
      "Chaque pétale de la fleur est une manière de combattre.",
      "Une fois la fleur entière, le grand jardin autour s’ouvrira.",
      "Arrose un pétale jusqu’au bout : son cœur s’allumera.",
      "Les voies du grand graphe ? On n’en suit qu’une par pétale. Choisis bien.",
      "Les fleurs d’étoile ne fanent jamais. Même après une ascension.",
    ],
  },
  // (it. 1086) la chouette messagère du panneau des contrats
  quests: {
    name: "Plume, la chouette de la guilde",
    place: "Un panneau d’affichage à un carrefour",
    art: "owl",
    lines: [
      "Hou hou ! De nouveaux contrats sont affichés.",
      "La guilde paie bien… quand le travail est fait.",
      "J’apporte les contrats de jour comme de nuit. Surtout de nuit.",
      "Plus tu remplis de quêtes, plus la guilde te respecte.",
      "Un contrat t’ennuie ? Change-le, je ne dirai rien.",
    ],
  },
  // (it. 1082) suggestion de Victor : « un PNJ qui a une fusée, pour l'ascension »
  ascension: {
    name: "Orbo, l’astronome à la fusée",
    place: "Une fusée bricolée en haut d’une colline",
    art: "rocket",
    lines: [
      "Les étoiles ? Je vais les chercher moi-même !",
      "Recommence au début, plus fort : les éclats t’attendent là-haut.",
      "Ma fusée marche aux éclats d’étoile. Toi aussi, en quelque sorte.",
      "À chaque ascension, je compte les étoiles rallumées. Il en manque encore.",
      "Trois… deux… un… Bon, demain peut-être.",
    ],
  },
};

/** PNJ de l'onglet (ou null). */
export const npcFor = (tab) => NPCS[tab] || null;

/** Réplique affichée : change toutes les 30 s (stable entre deux rendus de l'onglet), `extra` = clics du joueur. */
export function npcLine(npc, now = Date.now(), extra = 0) {
  const n = npc.lines.length;
  return npc.lines[(Math.floor(now / 30000) + extra) % n];
}
