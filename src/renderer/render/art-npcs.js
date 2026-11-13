// PNJ de l'histoire (game/npcs.js), même format que les monstres : lignes de pixels et palette (it. 1073).
export const NPC_ART = {
  // Mirette, la grenouille marchande : chapeau violet, écharpe rouge, ventre clair, de face.
  frog: { pal: { G: "#5fae4a", g: "#3e7a30", L: "#d8e8a0", E: "#1a1a1a", W: "#ffffff", H: "#8a5ad0", h: "#4a2c7a", R: "#e2552b", Y: "#ffd34d" }, frames: [[
    ".....HHHH.....",
    "....HHHHHH....",
    "...hhhYhhhh...",
    "..WW.GGGG.WW..",
    ".WEWGGGGGGWEW.",
    ".GWWGGGGGGWWG.",
    "GGGGGGGGGGGGGG",
    "GgGGGGGGGGGGgG",
    ".GggggggggggG.",
    "..RRRRRRRRRR..",
    ".GGLLLLLLLLGG.",
    "GGGLLLLLLLLGGG",
    "GG.LLLLLLLL.GG",
    "...gg....gg...",
  ]] },
  // Orbo, l'astronome à la fusée : casque de verre, combinaison orange (it. 1082).
  rocket: { pal: { H: "#e8eef8", B: "#9fd8ff", F: "#f0c08a", E: "#1a1a1a", g: "#c0392b", S: "#e8873a", s: "#a8551e", K: "#3a3550" }, frames: [[
    "....HHHHHH....",
    "...HBBBBBBH...",
    "..HBBFFFFBBH..",
    "..HBFEFFEFBH..",
    "..HBFFFFFFBH..",
    "..HBBFggFBBH..",
    "...HBBBBBBH...",
    "....HHHHHH....",
    "...SSSSSSSS...",
    "..SSsSSSSsSS..",
    "..SS.SSSS.SS..",
    "..F..SSSS..F..",
    "....SS..SS....",
    "....KK..KK....",
  ]] },
};
