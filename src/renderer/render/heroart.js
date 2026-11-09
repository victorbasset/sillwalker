// Personnages jouables, assemblés à partir de pièces (tête, torse, jambes,
// arme) sur une grille commune : même proportions et même éclairage pour
// toutes les classes.
//
// Lettres de palette (communes à toutes les classes) :
//   S/s peau / ombre   E yeux       H/h couvre-chef / ombre   A/a corps / ombre
//   B ceinture, liseré  L/l jambes   K bottes   W/w arme / reflet   G poignée
//   X Y Z détails propres à la classe (gemme, plume, barbe…)
// L'équipement recolore H/h (casque), A/a (armure), W/w (arme) et K (bottes).

// ---------- Pièces communes ----------
const TORSO = [
  "...aAAAAAAa.....",
  "..aAAABAAAAa....",
  "..SaAABAAAaS....",
  "...aBBBBBBa.....",
  "...aAAAAAAa.....",
];
const LEGS = {
  walk1: ["....LLLlL.......", "....LL.lL.......", "....LL.lL.......", "....LL.LL.......", "...KKK.KKK......"],
  walk2: ["....LLLlL.......", "...LL...lL......", "..LL.....lL.....", "..LL......LL....", ".KKK......KKK..."],
  attack: ["....LLLlL.......", "...LL...lL......", "..LL.....lL.....", ".LL.......LL....", ".KK.......KKK..."],
};
const ROBE = {
  walk1: ["...aAAAAAAa.....", "...aAAAAAAa.....", "..aAAAAAAAAa....", "..aaAAAAAAaa....", "...KK...KK......"],
  walk2: ["...aAAAAAAa.....", "...aAAAAAAa.....", "..aAAAAAAAAa....", "..aaAAAAAAaa....", "..KK.....KK....."],
  attack: ["...aAAAAAAa.....", "...aAAAAAAa.....", "..aAAAAAAAAa....", ".aaAAAAAAAAaa...", ".KK.......KK...."],
};
const HAKAMA = {
  walk1: ["...LLLLLLL......", "...LLL.LLL......", "..LLL...LLL.....", "..lLL...LLl.....", "..KK.....KK....."],
  walk2: ["...LLLLLLL......", "..LLL...LLL.....", ".LLL.....LLL....", ".lLL.....LLl....", ".KK.......KK...."],
  attack: ["...LLLLLLL......", "..LLL...LLL.....", ".LLL.....LLL....", "lLL.......LLl...", "KK.........KK..."],
};

// ---------- Têtes (rangées 0 à 8, tournées vers la droite) ----------
const HEADS = {
  warrior: ["", "", "....HHHHH", "...HHHHHHh", "...HhSSSSS", "...hSSSSES", "....SSSSSs", ".....sSSs", "......ss"],
  ranger: ["", "", "....HHHH", "...HHHHHHh", "..HHHSSSSh", "..HHhSSSES", "..hHhSSSSs", "...hh.sSs", "......ss"],
  mage: [".......H", "......HHh", ".....HHHh", "....HHYHHh", "..hhhhhhhhhh", "....sSSSSS", "....SSSSES", ".....ZZZZZ", "......ZZZ"],
  paladin: ["....YY", "...YYY", "...HHHHH", "..HHHHHHh", "..HHHHHHH", "..HHhhhhh", "..HHHHHHh", "...HHHHh", ".....ss"],
  assassin: ["", "", "....HHHH", "...HHHHHHh", "...HHhSSSh", "...HhXXXEX", "...hHXXXXX", "....hhXXX", "......ss"],
  necro: ["", "", "....HHHHH", "...HHHHHHHh", "..HHHhhhhHh", "..HHh.SSEHh", "..HHh.SSSHh", "...Hh.ssHh", "....hh..h"],
  monk: ["", "", "....SSSS", "...SSSSSSs", "..YYYYYYYY", "..Y.SSSSES", ".Y..SSSSSs", ".....sSSs", "......ss"],
  druid: ["", "....X.X.X", "...XXYXXXX", "...HHHHHHh", "...HhSSSSS", "...hSSSSES", "...hZSSSZs", "....ZZZZZ", ".....ZZZ"],
  berserker: ["", "..X......X", "..XHHHHHHX", "...HHHHHHh", "...HhSSSSS", "...hSSSSES", "...ZZSSSZZ", "....ZZZZZ", ".....ZZZ"],
  samurai: ["....Y...Y", ".....Y.Y", "...HHYHHH", "..HHHHHHHh", ".hHhSSSSSS", ".hH.SSSSES", ".hh.SSSSSs", ".....XXXX", "......ss"],
  // Héros de la demande 17
  arbalest: ["", "", "....HHHHH", "...HHHHHHh", "..HHhSSSSS", "..HhhSSSES", ".HHh.SSSSs", ".HH...sSs", ".H.....ss"],
  lancer: ["..XX", "...XX", "...HHHHH", "..HHHHHHh", "..HHhSSSSS", "..HHhSSSES", "..hHhSSSSs", "...hh.sSs", "......ss"],
  priestess: ["", "....HHHH", "...HHHHHh", "..HHYYYYYY", "..HHhSSSSS", "..HHhSSSES", "..HH.SSSSs", "..HH..sSs", "..hh...ss"],
  gladiator: ["....XXXX", "...XXXXXX", "...HHHHHH", "..HHHHHHHh", "..HHHSSSSS", "..HHhSSSES", "..HH.SSSSs", "...h..sSs", "......ss"],
  shaman: ["..X.X", "..XXX", "...HHHHH", "..HHHHHHh", "..HhZZZZZ", "..HhZSSEZ", "..HhSSSSs", "..Hh..sSs", "..h....ss"],
  bladedancer: ["", "", "....HHHH", "...HHHHHHh", "..HYYYYYYY", "HHH.SSSSES", "HH..SSSSSs", "H....sSs", "......ss"],
  cryomancer: ["....Y.Y.Y", "....YYYYY", "...HHHHHHh", "..HHhSSSSS", "..HHhSSSES", "..HH.SSSSs", "..HH..sSs", "..HH...ss", "..h"],
  bard: ["......X", ".....XX", "..HHHHHHH", ".HHHHHHHHHh", "...HhSSSSS", "...hSSSSES", "....SSSSSs", ".....sSSs", "......ss"],
  starwarden: ["....Y", "...YYY", "...HHHHH", "..HHHHHHh", "..HHHHHHH", "..HHHYYYH", "..HHHHHHh", "...HHHHh", ".....ss"],
  artificer: ["", "", "....HHHH", "...HHHHHHh", "...HXXHXXh", "...hSSSSES", "....SSSSSs", ".....sSSs", "......ss"],
};

// ---------- Armes : { rangée: motif } (la main droite est en rangée 11, colonne 11) ----------
const col = (c, s) => ".".repeat(c) + s;
const range = (a, b, s) => Object.fromEntries(Array.from({ length: b - a + 1 }, (_, i) => [a + i, s]));
const WEAPONS = {
  sword: {
    idle: { 3: col(12, "w"), ...range(4, 9, col(12, "W")), 10: col(11, "BBB"), 11: col(12, "G") },
    attack: { 10: col(13, "B"), 11: col(12, "GBWWWWWWw"), 12: col(13, "B") },
  },
  bow: {
    idle: { 6: col(12, "WW"), 7: col(12, "XwW"), ...range(8, 13, col(12, "X.W")), 14: col(12, "XwW"), 15: col(12, "WW") },
    attack: { 6: col(12, "WW"), 7: col(12, ".wW"), 8: col(11, "X..W"), 9: col(11, "X..W"), 10: col(10, "X...W"),
      11: col(10, "YYYYYYYw"), 12: col(10, "X...W"), 13: col(11, "X..W"), 14: col(12, ".wW"), 15: col(12, "WW") },
  },
  staff: {
    idle: { 2: col(12, "W"), 3: col(11, "WwW"), 4: col(12, "W"), ...range(5, 17, col(12, "G")) },
    attack: { 1: col(12, "Y"), 2: col(10, "Y.W.Y"), 3: col(11, "WwW"), 4: col(10, "Y.W.Y"), 5: col(12, "Y"), ...range(6, 17, col(12, "G")) },
  },
  hammer: {
    idle: { 3: col(11, "WWW"), 4: col(11, "WwW"), 5: col(11, "WWW"), ...range(6, 12, col(12, "G")) },
    attack: { 10: col(16, "WW"), 11: col(12, "GGGGWw"), 12: col(16, "WW") },
  },
  daggers: {
    idle: { 10: col(12, "G"), 11: col(12, "G"), 12: "..W" + col(9, "W"), 13: "..w" + col(9, "w") },
    attack: { 11: col(12, "GWWWw"), 12: "..W", 13: "..w" },
  },
  scythe: {
    idle: { 0: col(8, "WWWWG"), 1: col(7, "W....G"), 2: col(6, "w.....G"), ...range(3, 17, col(12, "G")) },
    attack: { 0: col(8, "XXXXG"), 1: col(7, "X....G"), 2: col(6, "X.....G"), ...range(3, 17, col(12, "G")) },
  },
  fists: {
    idle: { 11: "..W" + col(8, "W") },
    attack: { 10: col(11, "aA"), 11: "..W" + col(8, "AAAWW"), 12: col(11, "aA") },
  },
  druidstaff: {
    idle: { 2: col(11, "XYX"), 3: col(10, "XXWXX"), 4: col(11, "XWX"), ...range(5, 17, col(12, "G")) },
    attack: { 1: col(10, "Y.X.Y"), 2: col(10, "XXYXX"), 3: col(9, "XXXWXXX"), 4: col(10, "XXWXX"), ...range(5, 17, col(12, "G")) },
  },
  greataxe: {
    idle: { 2: col(12, "G"), 3: col(12, "GWW"), 4: col(12, "GWWw"), 5: col(12, "GWWw"), 6: col(12, "GWW"), ...range(7, 12, col(12, "G")) },
    attack: { 9: col(17, "W"), 10: col(16, "WWW"), 11: col(12, "GGGGGWWw"), 12: col(16, "WWw"), 13: col(17, "w") },
  },
  crossbow: {
    idle: { 9: col(15, "X"), 10: col(15, "X"), 11: col(11, "GWWWW"), 12: col(15, "X"), 13: col(15, "X") },
    attack: { 8: col(16, "X"), 9: col(16, "X"), 10: col(16, "X"), 11: col(11, "GWWWWWYYw"), 12: col(16, "X"), 13: col(16, "X"), 14: col(16, "X") },
  },
  spear: {
    idle: { 0: col(12, "w"), 1: col(11, "WWW"), 2: col(12, "W"), ...range(3, 17, col(12, "G")) },
    attack: { 10: col(17, "W"), 11: col(8, "GGGGGGGGGWWw"), 12: col(17, "W") },
  },
  holystaff: {
    idle: { 1: col(11, "YYY"), 2: col(10, "Y.W.Y"), 3: col(11, "YYY"), ...range(4, 17, col(12, "G")) },
    attack: { 0: col(10, "Y.Y.Y"), 1: col(10, "YYYYY"), 2: col(9, "YY.W.YY"), 3: col(10, "YYYYY"), 4: col(10, "Y.Y.Y"), ...range(5, 17, col(12, "G")) },
  },
  gladius: {
    idle: { 7: col(12, "w"), 8: col(12, "W"), 9: col(12, "W"), 10: col(11, "BBB"), 11: col(12, "G") },
    attack: { 10: col(13, "B"), 11: col(12, "GBWWWw"), 12: col(13, "B") },
  },
  totem: {
    idle: { 1: col(11, "XXX"), 2: col(11, "ZWZ"), 3: col(11, "XWX"), 4: col(12, "Y"), ...range(5, 17, col(12, "G")) },
    attack: { 0: col(10, "Y...Y"), 1: col(10, "XXXXX"), 2: col(10, "XZWZX"), 3: col(11, "XWX"), 4: col(12, "Y"), ...range(5, 17, col(12, "G")) },
  },
  twinblades: {
    idle: { 9: col(13, "w"), 10: col(12, "W"), 11: col(12, "G"), 12: "..G", 13: "..W", 14: "...w" },
    attack: { 10: col(14, "Ww"), 11: col(12, "GWWW"), 12: "..GWW", 13: "....w" },
  },
  icestaff: {
    idle: { 1: col(12, "W"), 2: col(11, "WwW"), 3: col(11, "wWw"), 4: col(12, "W"), ...range(5, 17, col(12, "G")) },
    attack: { 0: col(10, "Y...Y"), 1: col(12, "W"), 2: col(10, "YWwWY"), 3: col(11, "wWw"), 4: col(10, "Y.W.Y"), ...range(5, 17, col(12, "G")) },
  },
  lute: {
    idle: { 8: col(14, "GG"), 9: col(13, "G"), 10: col(12, "G"), 11: col(10, "WWW"), 12: col(9, "WWwWW"), 13: col(9, "WWWWW"), 14: col(10, "WWW") },
    attack: { 5: col(14, "Y"), 6: col(15, "YY"), 7: col(16, "Y"), 8: col(14, "GG"), 9: col(13, "G"), 10: col(12, "G"), 11: col(10, "WWW"), 12: col(9, "WWwWW"), 13: col(9, "WWWWW"), 14: col(10, "WWW") },
  },
  greatsword: {
    idle: { 0: col(12, "w"), ...range(1, 8, col(12, "W")), 9: col(11, "YYY"), 10: col(12, "G"), 11: col(12, "G") },
    attack: { 10: col(13, "Y"), 11: col(12, "GYWWWWWWWWw"), 12: col(13, "Y") },
  },
  bomb: {
    idle: { 10: col(14, "Y"), 11: col(12, "Gw"), 12: col(11, "WWW"), 13: col(11, "WwW"), 14: col(12, "W") },
    attack: { 7: col(16, "Y"), 8: col(15, "w"), 9: col(14, "WWW"), 10: col(14, "WwW"), 11: col(12, "GGWWW"), 12: col(15, "W") },
  },
  katana: {
    idle: { 1: col(12, "w"), ...range(2, 9, col(12, "W")), 10: col(12, "Y"), 11: col(12, "G"), 12: col(12, "G") },
    attack: { 11: col(12, "GGYWWWWWWWWw") },
  },
};

// ---------- Classes ----------
const SKIN = { S: "#f1c7a0", s: "#d9a27a", E: "#1d1a26" };
const DEFS = {
  warrior: { head: "warrior", torso: TORSO, legs: LEGS, weapon: "sword",
    front: { 10: ".YY.", 11: "YXXY", 12: "YXZY", 13: "YXXY", 14: ".YY." },
    pal: { ...SKIN, H: "#6b4226", h: "#4a2c18", A: "#3a6ea5", a: "#2a4f7a", B: "#e9b949", L: "#5a4632", l: "#43342a", K: "#2a1f18", W: "#dfe7ef", w: "#9aa6b5", G: "#6b4a2b", X: "#8a5a2b", Y: "#c9ced6", Z: "#e9b949" } },
  ranger: { head: "ranger", torso: TORSO, legs: LEGS, weapon: "bow",
    back: { 5: "X.X", 6: "XXX.", 7: ".WW", 8: ".kkk", 9: "kkk", 10: "kkk", 11: "kk", 12: "kk" },
    pal: { ...SKIN, H: "#3f7a3a", h: "#2a5527", A: "#6a8f3a", a: "#4b6a28", B: "#8a5a2b", L: "#5a4632", l: "#43342a", K: "#3a2a1a", W: "#a0713c", w: "#6b4a2b", G: "#6b4a2b", X: "#e3ebf3", Y: "#e3ebf3", k: "#4a3220" } },
  mage: { head: "mage", torso: TORSO, legs: ROBE, weapon: "staff",
    pal: { ...SKIN, H: "#4b2a7a", h: "#341c58", A: "#6a3fa0", a: "#4b2a7a", B: "#e9b949", K: "#2a1f18", W: "#7fd6ff", w: "#ffffff", G: "#8a5a2b", Y: "#ffd34d", Z: "#e8e4d6" } },
  paladin: { head: "paladin", legs: LEGS, weapon: "hammer",
    back: { 9: "..Y", 10: ".YY", 11: ".YY", 12: "YYy", 13: "YYy", 14: "Yy.", 15: "y.." },
    torso: ["..aaAAAAAAaa....", "..aAAABBBAAa....", "..SaAAABAAaS....", "...aBBBBBBa.....", "...aAAAAAAa....."],
    pal: { ...SKIN, H: "#d7dde5", h: "#8a93a0", Y: "#c0392b", y: "#8a2420", A: "#dfe4ea", a: "#9aa3ad", B: "#e9b949", L: "#9aa3ad", l: "#7a828c", K: "#5a6270", W: "#c9ced6", w: "#7a828c", G: "#6b4a2b" } },
  assassin: { head: "assassin", torso: TORSO, legs: LEGS, weapon: "daggers",
    back: { 8: "..BB", 9: ".BB.", 10: "BB..", 11: "B..." },
    pal: { ...SKIN, E: "#ff4a4a", H: "#2a2638", h: "#1a1724", X: "#3a3550", A: "#3b3550", a: "#2a2638", B: "#8a2a2a", L: "#2a2638", l: "#1a1724", K: "#14121f", W: "#e3ebf3", w: "#9aa6b5", G: "#8a2a2a" } },
  necro: { head: "necro", torso: TORSO, legs: ROBE, weapon: "scythe",
    pal: { S: "#cfd8c8", s: "#a9b5a4", E: "#7dff9a", H: "#1f1d2e", h: "#14121f", A: "#2e2a40", a: "#1f1d2e", B: "#7dff9a", K: "#14121f", W: "#c9d1c4", w: "#8a948a", G: "#4a3a2a", X: "#7dff9a" } },
  monk: { head: "monk", torso: ["...aAAAAAAa.....", "..aAABAAAAAa....", "..SaAAABAAaS....", "...aAAAABAa.....", "...aAAAAAAa....."], legs: ROBE, weapon: "fists",
    pal: { ...SKIN, Y: "#c0392b", A: "#e8963a", a: "#c06a1e", B: "#8a2a2a", K: "#8a5a2b", W: "#f2efe6", w: "#c9c3b4" } },
  druid: { head: "druid", torso: TORSO, legs: ROBE, weapon: "druidstaff",
    pal: { ...SKIN, X: "#5fae4a", Y: "#ff9ad8", H: "#7a4a2a", h: "#5a341c", Z: "#8a5a3a", A: "#6a5a3a", a: "#4f4229", B: "#5fae4a", K: "#3a2a1a", G: "#8a5a2b", W: "#8fd86a", w: "#5fae4a" } },
  berserker: { head: "berserker", legs: LEGS, weapon: "greataxe",
    torso: ["..aAAASSSAAa....", "..aAASBSSSAa....", "..SaSSBSSSaS....", "...aBBBBBBa.....", "...aAAAAAAa....."],
    pal: { ...SKIN, H: "#8a8f99", h: "#5c616b", X: "#e8e4d6", Z: "#c0562b", A: "#7a5233", a: "#5a3a20", B: "#3a2a1a", L: "#4a3a2a", l: "#3a2a1a", K: "#2a1f18", W: "#c9d1dc", w: "#7a828c", G: "#6b4a2b" } },
  samurai: { head: "samurai", legs: HAKAMA, weapon: "katana",
    torso: [".aaAAAAAAAAaa...", ".aABABABABAa....", "..SaAAAAAAaS....", "GG.aYYXXXXa.....", "..GaAAAAAAa....."],
    pal: { ...SKIN, H: "#2a2638", h: "#14121f", A: "#b8322a", a: "#7a1e1a", B: "#e9b949", L: "#3a3550", l: "#2a2638", K: "#5a3a20", W: "#eef3f8", w: "#9aa6b5", G: "#2a2638", Y: "#e9b949", X: "#8a2420" } },
};

// Héros de la demande 17 (palette : mêmes lettres que les autres ; voir l'en-tête).
Object.assign(DEFS, {
  arbalest: { head: "arbalest", torso: TORSO, legs: LEGS, weapon: "crossbow",
    back: { 7: ".kk", 8: ".kkk", 9: "kkk", 10: "kk" },
    pal: { ...SKIN, H: "#b8562a", h: "#8a3a1a", A: "#4a6a7a", a: "#34505c", B: "#c9a03a", L: "#4a3a2a", l: "#3a2a1a", K: "#2a1f18", W: "#7a5233", w: "#5a3a20", G: "#5a3a20", X: "#c9ced6", Y: "#e3ebf3", k: "#6b4a2b" } },
  lancer: { head: "lancer", torso: TORSO, legs: LEGS, weapon: "spear",
    pal: { ...SKIN, H: "#9aa3ad", h: "#6a727c", X: "#c0392b", A: "#2e6b5a", a: "#1f4c40", B: "#e9b949", L: "#4a3a2a", l: "#3a2a1a", K: "#2a1f18", W: "#dfe7ef", w: "#9aa6b5", G: "#7a5233" } },
  priestess: { head: "priestess", torso: TORSO, legs: ROBE, weapon: "holystaff",
    pal: { ...SKIN, H: "#f4f0e8", h: "#c9c3b4", Y: "#ffd34d", A: "#f4f0e8", a: "#c9c3b4", B: "#e9b949", K: "#c9a03a", W: "#fff6c8", w: "#ffffff", G: "#c9a03a" } },
  gladiator: { head: "gladiator", torso: TORSO, legs: LEGS, weapon: "gladius",
    front: { 10: ".YY.", 11: "YXXY", 12: "YXXY", 13: "YXXY", 14: ".YY." },
    pal: { ...SKIN, H: "#c98a3a", h: "#8a5a20", X: "#c0392b", A: "#8a2a2a", a: "#5a1a1a", B: "#c98a3a", L: "#f1c7a0", l: "#d9a27a", K: "#7a5233", W: "#dfe7ef", w: "#9aa6b5", G: "#6b4a2b", Y: "#c98a3a" } },
  shaman: { head: "shaman", torso: TORSO, legs: ROBE, weapon: "totem",
    pal: { ...SKIN, S: "#c98a5a", s: "#a8704a", H: "#2a2638", h: "#1a1724", X: "#e8e4d6", Z: "#e8e4d6", Y: "#7fd6ff", A: "#5a7a3a", a: "#3e5a28", B: "#c0392b", K: "#3a2a1a", W: "#7fd6ff", w: "#ffffff", G: "#7a5233" } },
  bladedancer: { head: "bladedancer", torso: TORSO, legs: HAKAMA, weapon: "twinblades",
    pal: { ...SKIN, H: "#c0392b", h: "#8a2420", Y: "#ffd34d", A: "#3a2a5a", a: "#2a1e40", B: "#ffd34d", L: "#5a3a7a", l: "#3a2a5a", K: "#2a1e40", W: "#eef3f8", w: "#9aa6b5", G: "#c0392b" } },
  cryomancer: { head: "cryomancer", torso: TORSO, legs: ROBE, weapon: "icestaff",
    pal: { ...SKIN, S: "#e8eef8", s: "#c4d0e0", H: "#e8f4ff", h: "#a8c8e8", Y: "#7fd6ff", A: "#3a6ea5", a: "#2a4f7a", B: "#9fe8ff", K: "#2a4f7a", W: "#9fe8ff", w: "#ffffff", G: "#c9d1dc" } },
  bard: { head: "bard", torso: TORSO, legs: LEGS, weapon: "lute",
    pal: { ...SKIN, H: "#5a2a7a", h: "#3a1a58", X: "#ff6a6a", A: "#2e8a5a", a: "#1f6040", B: "#e9b949", L: "#e9b949", l: "#c9a03a", K: "#5a3a20", W: "#c98a3a", w: "#8a5a20", G: "#6b4a2b", Y: "#ffd34d" } },
  starwarden: { head: "starwarden", torso: TORSO, legs: LEGS, weapon: "greatsword",
    back: { 9: "..Y", 10: ".YY", 11: ".YY", 12: "YYy", 13: "YYy", 14: "Yy.", 15: "y.." },
    pal: { ...SKIN, H: "#2a2a4a", h: "#1a1a30", Y: "#ffe27a", y: "#c9a03a", A: "#3a3a6a", a: "#2a2a4a", B: "#ffe27a", L: "#2a2a4a", l: "#1a1a30", K: "#14121f", W: "#fff6c8", w: "#ffe27a", G: "#3a3a6a" } },
  artificer: { head: "artificer", torso: TORSO, legs: LEGS, weapon: "bomb",
    pal: { ...SKIN, H: "#e2552b", h: "#a83a1a", X: "#7fd6ff", A: "#6b4a2b", a: "#4a3220", B: "#c9a03a", L: "#4a3a2a", l: "#3a2a1a", K: "#2a1f18", W: "#3a3550", w: "#8a86a8", G: "#6b4a2b", Y: "#ffb733" } },
});

/** Superpose des calques ({ rangée: motif } ou tableaux à partir d'une rangée). */
function compose(layers) {
  const grid = [];
  for (const [layer, offset] of layers) {
    const entries = Array.isArray(layer) ? layer.map((r, i) => [i + offset, r]) : Object.entries(layer).map(([r, s]) => [+r, s]);
    for (const [r, str] of entries) {
      const row = (grid[r] ||= []);
      for (let i = 0; i < str.length; i++) if (str[i] !== ".") row[i] = str[i];
    }
  }
  const rows = [];
  for (let r = 0; r < grid.length; r++) rows.push(Array.from({ length: (grid[r] || []).length }, (_, i) => (grid[r] && grid[r][i]) || ".").join(""));
  while (rows.length && !/[^.]/.test(rows[0])) rows.shift(); // retire les rangées vides du haut
  return rows;
}

/**
 * Torse prêt à habiller : N = mains (gants), Q = pendentif (amulette).
 * Sans gants ni amulette, N et Q prennent la couleur d'origine (voir equipvis.js).
 */
function dressTorso(torso) {
  const set = (row, c, ch) => row.slice(0, c) + ch + row.slice(c + 1);
  let under = "A";
  const rows = torso.map((r, i) => {
    if (i === 2) { if (r[2] === "S") r = set(r, 2, "N"); if (r[11] === "S") r = set(r, 11, "N"); }
    if (i === 1) {
      const c = "AS".includes(r[7]) ? 7 : 8;
      under = r[c];
      r = set(r, c, "Q");
    }
    return r;
  });
  return { rows, under };
}

function buildClass(def) {
  const dressed = dressTorso(def.torso);
  const pal = { ...def.pal, N: def.pal.S, Q: def.pal[dressed.under], _q: dressed.under };
  const frame = (pose) => compose([
    [def.back || {}, 0],
    [HEADS[def.head], 0],
    [dressed.rows, 9],
    [def.legs[pose], 14],
    [def.front || {}, 0],
    [WEAPONS[def.weapon][pose === "attack" ? "attack" : "idle"], 0],
  ]);
  return { pal, walk1: frame("walk1"), walk2: frame("walk2"), attack: frame("attack") };
}

/** Sprites des classes (clés = identifiants de classes.js). */
export const CLASS_ART = Object.fromEntries(Object.entries(DEFS).map(([k, d]) => [k, buildClass(d)]));
/** Tête seule (pour l'icône de la zone de notification). */
export const CLASS_HEADS = Object.fromEntries(Object.entries(DEFS).map(([k, d]) => [k, { pal: d.pal, rows: compose([[HEADS[d.head], 0]]) }]));
