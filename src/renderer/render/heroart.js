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
  samurai: ["......HH", "......Hh", "....HHHHH", "...HHHHHHh", "...HhSSSSS", "...hSSSSES", "....SSSSSs", ".....sSSs", "......ss"],
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
  katana: {
    idle: { 1: col(12, "w"), ...range(2, 9, col(12, "W")), 10: col(12, "Y"), 11: col(12, "G"), 12: col(12, "G") },
    attack: { 11: col(12, "GGYWWWWWWWWw") },
  },
};

// ---------- Classes ----------
const SKIN = { S: "#f1c7a0", s: "#d9a27a", E: "#1d1a26" };
const DEFS = {
  warrior: { head: "warrior", torso: TORSO, legs: LEGS, weapon: "sword",
    pal: { ...SKIN, H: "#6b4226", h: "#4a2c18", A: "#3a6ea5", a: "#2a4f7a", B: "#e9b949", L: "#5a4632", l: "#43342a", K: "#2a1f18", W: "#dfe7ef", w: "#9aa6b5", G: "#6b4a2b" } },
  ranger: { head: "ranger", torso: TORSO, legs: LEGS, weapon: "bow",
    pal: { ...SKIN, H: "#3f7a3a", h: "#2a5527", A: "#6a8f3a", a: "#4b6a28", B: "#8a5a2b", L: "#5a4632", l: "#43342a", K: "#3a2a1a", W: "#a0713c", w: "#6b4a2b", G: "#6b4a2b", X: "#e3ebf3", Y: "#e3ebf3" } },
  mage: { head: "mage", torso: TORSO, legs: ROBE, weapon: "staff",
    pal: { ...SKIN, H: "#4b2a7a", h: "#341c58", A: "#6a3fa0", a: "#4b2a7a", B: "#e9b949", K: "#2a1f18", W: "#7fd6ff", w: "#ffffff", G: "#8a5a2b", Y: "#ffd34d", Z: "#e8e4d6" } },
  paladin: { head: "paladin", legs: LEGS, weapon: "hammer",
    torso: ["..aaAAAAAAaa....", "..aAAABBBAAa....", "..SaAAABAAaS....", "...aBBBBBBa.....", "...aAAAAAAa....."],
    pal: { ...SKIN, H: "#d7dde5", h: "#8a93a0", Y: "#c0392b", A: "#dfe4ea", a: "#9aa3ad", B: "#e9b949", L: "#9aa3ad", l: "#7a828c", K: "#5a6270", W: "#c9ced6", w: "#7a828c", G: "#6b4a2b" } },
  assassin: { head: "assassin", torso: TORSO, legs: LEGS, weapon: "daggers",
    pal: { ...SKIN, E: "#ff4a4a", H: "#2a2638", h: "#1a1724", X: "#3a3550", A: "#3b3550", a: "#2a2638", B: "#8a2a2a", L: "#2a2638", l: "#1a1724", K: "#14121f", W: "#e3ebf3", w: "#9aa6b5", G: "#8a2a2a" } },
  necro: { head: "necro", torso: TORSO, legs: ROBE, weapon: "scythe",
    pal: { S: "#cfd8c8", s: "#a9b5a4", E: "#7dff9a", H: "#1f1d2e", h: "#14121f", A: "#2e2a40", a: "#1f1d2e", B: "#7dff9a", K: "#14121f", W: "#c9d1c4", w: "#8a948a", G: "#4a3a2a", X: "#7dff9a" } },
  monk: { head: "monk", torso: ["...aAAAAAAa.....", "..aAABAAAAAa....", "..SaAAABAAaS....", "...aAAAABAa.....", "...aAAAAAAa....."], legs: ROBE, weapon: "fists",
    pal: { ...SKIN, Y: "#c0392b", A: "#e8963a", a: "#c06a1e", B: "#8a2a2a", K: "#8a5a2b", W: "#f2efe6", w: "#c9c3b4" } },
  druid: { head: "druid", torso: TORSO, legs: ROBE, weapon: "druidstaff",
    pal: { ...SKIN, X: "#5fae4a", Y: "#ff9ad8", H: "#7a4a2a", h: "#5a341c", Z: "#8a5a3a", A: "#6a5a3a", a: "#4f4229", B: "#5fae4a", K: "#3a2a1a", G: "#8a5a2b", W: "#8fd86a", w: "#5fae4a" } },
  samurai: { head: "samurai", legs: HAKAMA, weapon: "katana",
    torso: ["..aaAAAAAAaa....", "..aABABABAAa....", "..SaAAAAAAaS....", "...aBBBBBBa.....", "...aAAAAAAa....."],
    pal: { ...SKIN, H: "#1d1a26", h: "#14121f", A: "#b8322a", a: "#8a2420", B: "#2a2638", L: "#3a3550", l: "#2a2638", K: "#8a5a2b", W: "#eef3f8", w: "#9aa6b5", G: "#2a2638", Y: "#e9b949" } },
};

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

function buildClass(def) {
  const frame = (pose) => compose([
    [HEADS[def.head], 0],
    [def.torso, 9],
    [def.legs[pose], 14],
    [WEAPONS[def.weapon][pose === "attack" ? "attack" : "idle"], 0],
  ]);
  return { pal: def.pal, walk1: frame("walk1"), walk2: frame("walk2"), attack: frame("attack") };
}

/** Sprites des classes (clés = identifiants de classes.js). */
export const CLASS_ART = Object.fromEntries(Object.entries(DEFS).map(([k, d]) => [k, buildClass(d)]));
/** Tête seule (pour l'icône de la zone de notification). */
export const CLASS_HEADS = Object.fromEntries(Object.entries(DEFS).map(([k, d]) => [k, { pal: d.pal, rows: compose([[HEADS[d.head], 0]]) }]));
