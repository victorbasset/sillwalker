// PNJ de l'histoire (demande E de Victor, it. 1073) : chaque onglet qui se débloque est tenu par un personnage rencontré
// sur la route (une maison, une cabane, un lac…). Il apparaît, stylisé, en haut de son onglet et parle au joueur.
// Textes en français (traduits à l'affichage par tx()) ; art : render/art-npcs.js. Pour l'instant : la Boutique ;
// les autres onglets suivront (étape E4), puis la rencontre animée sur la bande (étape E3).

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
};

/** PNJ de l'onglet (ou null). */
export const npcFor = (tab) => NPCS[tab] || null;

/** Réplique affichée : change toutes les 30 s (stable entre deux rendus de l'onglet), `extra` = clics du joueur. */
export function npcLine(npc, now = Date.now(), extra = 0) {
  const n = npc.lines.length;
  return npc.lines[(Math.floor(now / 30000) + extra) % n];
}
