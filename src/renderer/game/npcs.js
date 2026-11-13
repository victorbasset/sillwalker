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
