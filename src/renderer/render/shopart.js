// Icônes de la boutique (pixel art) : potions, élixirs, parchemins, coffres,
// œuf et outils de l'atelier. K = contour ; les autres lettres viennent de la palette.
import { buildSprite } from "./sprites.js";

const FLASK = ["....KK....", "....WW....", "...KWWK...", "..KLLLLK..", ".KLLWLLLK.", ".KLLLLLLK.", ".KLDLLLLK.", "..KDDDDK..", "...KKKK..."];
const SCROLL = [".KKKKKKKK.", "KPPPPPPPPK", ".KPLLLLPK.", ".KPPPPPPK.", ".KPLLLLPK.", ".KPPPPPPK.", ".KPLLLPPK.", "KPPPPPPPPK", ".KKKKKKKK."];
const CLOVER = ["...GG.GG..", "..GGGGGGG.", "..GGgGGGG.", "...GGGGG..", "..GGGgGGG.", "..GGGGGGG.", "...GG.GG..", ".....g....", "....g....."];
const CHEST = ["..KKKKKKKK..", ".KBBBBBBBBK.", "KBBBBBBBBBBK", "KMMMMYYMMMMK", "KBBBBYYBBBBK", "KBBBBBBBBBBK", "KBBBBBBBBBBK", "KMMMMMMMMMMK", ".KKKKKKKKKK."];
const EGG = ["....KK....", "...KWWK...", "..KWWSWK..", "..KWWWWK..", ".KWSWWWSK.", ".KWWWWWWK.", ".KWWWSWWK.", "..KWWWWK..", "...KKKK..."];
const PURSE = ["...KKKK...", "....KK....", "..KYYYYK..", ".KYYYYYYK.", "KYYYDYYYYK", "KYYDYDYYYK", "KYYYDYYYYK", ".KYYYYYYK.", "..KKKKKK.."];
const BAG = ["...KKKK...", "..K....K..", ".KBBBBBBK.", "KBBMMMMBBK", "KBBMYYMBBK", "KBBBBBBBBK", "KBBBBBBBBK", "KBBBBBBBBK", ".KKKKKKKK."];
const SWORD = [".........W", "........WK", ".......WK.", "......WK..", ".....WK...", "..Y.WK....", "...YK.....", "..GKY.....", ".G........"];
const SHIELD = ["KKKKKKKKK", "KMMMMMMMK", "KMRRYRRMK", "KMRRYRRMK", "KMYYYYYMK", "KMRRYRRMK", ".KMRYRMK.", "..KMMMK..", "...KKK..."];
const WING = ["........W.", "......WWW.", "....WWWLW.", "..WWWLLW..", ".WWLLLW...", "WWLLLW....", ".WLLW.....", "..WW......", "...W......"];

const HEART = [".RR...RR.", "RRRR.RRRR", "RWRRRRRRR", "RRRRRRRRR", ".RRRRRRR.", "..RRRRR..", "...RRR...", "....R...."];
const STAR = ["....Y....", "....Y....", "...YYY...", "YYYYYYYYY", ".YYYWYYY.", "..YYYYY..", "..YY.YY..", ".YY...YY."];
const TARGET = ["..RRRRR..", ".R.....R.", "R..RRR..R", "R.R...R.R", "R.R.W.R.R", "R.R...R.R", "R..RRR..R", ".R.....R.", "..RRRRR.."];
const SKULL = ["..WWWWW..", ".WWWWWWW.", "WWKKWKKWW", "WWKKWKKWW", "WWWWWWWWW", ".WWWKWWW.", "..W.W.W..", "..WWWWW.."];
const GEAR = ["...G.G...", ".GGGGGGG.", ".GG...GG.", "GG..K..GG", ".G.KKK.G.", "GG..K..GG", ".GG...GG.", ".GGGGGGG.", "...G.G..."];
const NOTE = ["....YYYY", "....Y..Y", "....Y..Y", "....Y..Y", "..YYY.YY", ".YYYY.YY", ".YYY....", "........"];
const EYE = ["...WWW...", ".WWWWWWW.", "WWWBBBWWW", "WWBBKBBWW", "WWWBBBWWW", ".WWWWWWW.", "...WWW..."];
const TROPHY = ["YYYYYYYYY", "Y.YYYYY.Y", "Y.YYYYY.Y", ".YYYYYYY.", "..YYYYY..", "....Y....", "...YYY...", "..DDDDD.."];
const BOOK = ["BBBBBBBB.", "BWWWWWWB.", "BWLLLLWB.", "BWWWWWWB.", "BWLLLWWB.", "BWWWWWWB.", "BBBBBBBB.", ".DDDDDDD."];
const KEYS = ["WWWWWWWWW", "WKWKWKWKW", "WWWWWWWWW", "WKWKWKWKW", "WWWWWWWWW", "WKKKKKKWW", "WWWWWWWWW"];
const CLOCK = ["..WWWWW..", ".W.....W.", "W...K...W", "W...K...W", "W...KKK.W", "W.......W", ".W.....W.", "..WWWWW.."];
const KENNEL = ["....KK....", "...KRRK...", "..KRRRRK..", ".KRRRRRRK.", "KRRRRRRRRK", ".KBBBBBBK.", ".KBBKKBBK.", ".KBKWWKBK.", ".KBKWWKBK.", ".KKKKKKKK."];
const CAULDRON = ["..G..G.G..", "...G.G....", ".KKKKKKKK.", "KGGGGGGGGK", "KMMMMMMMMK", "KMMMMMMMMK", ".KMMMMMMK.", "..KMMMMK..", ".K.KKKK.K."];
const ANVIL = [".........", "KKKKKKKK.", "KMMMMMMMK", ".KMMMMMK.", "..KMMMK..", "..KMMMK..", ".KKKKKKK.", "KBBBBBBBK"];
const MAP = ["PPP.PPP..", "PPLPPPLP.", "PLPPPLPPP", "PPPRPPPLP", "PLPPPPPPP", "PPPPLPPRP", ".PPP.PPPP"];

const OUT = "#14121f";
export const SHOP_ICON_DEFS = {
  potion:  [FLASK, { L: "#e2394a", D: "#a8222f", W: "#f4f0e8" }],
  elixir:  [FLASK, { L: "#ff8a3a", D: "#c0562b", W: "#fff2d8" }],
  haste:   [FLASK, { L: "#7fd6ff", D: "#3a8ac8", W: "#ffffff" }],
  iron:    [FLASK, { L: "#a9b6c6", D: "#6b7584", W: "#ffffff" }],
  fortune: [SCROLL, { P: "#f0dca8", L: "#e9b949" }],
  wisdom:  [SCROLL, { P: "#f0dca8", L: "#5a8ad8" }],
  luck:    [CLOVER, { G: "#5fd36f", g: "#2f8a3a" }],
  chest_wood:  [CHEST, { B: "#a8703a", M: "#5c3a1a", Y: "#e9b949" }],
  chest_iron:  [CHEST, { B: "#6b4a2b", M: "#9aa3ad", Y: "#e9b949" }],
  chest_royal: [CHEST, { B: "#7a3a8a", M: "#e9b949", Y: "#fff6c8" }],
  egg:     [EGG, { W: "#f4ecd8", S: "#5fae4a" }],
  ws_gold: [PURSE, { Y: "#ffd34d", D: "#c99a1a" }],
  bag:     [BAG, { B: "#8a5a2b", M: "#5c3a1a", Y: "#e9b949" }],
  ws_atk:  [SWORD, { W: "#dfe7ef", Y: "#e9b949", G: "#6b4a2b" }],
  ws_hp:   [SHIELD, { M: "#9aa3ad", R: "#c0392b", Y: "#e9b949" }],
  ws_speed: [WING, { W: "#e3ebf3", L: "#9fd8ff" }],
  heart:   [HEART, { R: "#e2394a", W: "#ffb0b8" }],
  star:    [STAR, { Y: "#ffd34d", W: "#fff6c8" }],
  target:  [TARGET, { R: "#ff6b5a", W: "#ffffff" }],
  skull:   [SKULL, { W: "#e8e4d6" }],
  gear:    [GEAR, { G: "#a9b6c6" }],
  note:    [NOTE, { Y: "#ffd34d" }],
  eye:     [EYE, { W: "#f4f0e8", B: "#5a8ad8" }],
  trophy:  [TROPHY, { Y: "#ffd34d", D: "#8a5a2b" }],
  book:    [BOOK, { B: "#8a3a2a", W: "#f0dca8", L: "#8a5a2b", D: "#5a2018" }],
  keys:    [KEYS, { W: "#c9ced6" }],
  clock:   [CLOCK, { W: "#c9ced6" }],
  kennel:  [KENNEL, { R: "#c0392b", B: "#a8703a", W: "#3a2a1a" }],
  cauldron: [CAULDRON, { G: "#7dff9a", M: "#4a4560" }],
  anvil:   [ANVIL, { M: "#8a93a0", B: "#6b4a2b" }],
  kennel2: [EGG, { W: "#f4ecd8", S: "#c0392b" }],
  map:     [MAP, { P: "#e8d8b0", L: "#a8884a", R: "#e2394a" }],
};

/** Icône d'un effet (clé de talents.js > EFFECTS). */
const EFFECT_ICON = {
  atkPct: "ws_atk", critDmg: "target", crit: "target", bossDmg: "skull", execute: "skull", spd: "ws_speed", moveSpd: "ws_speed",
  hpPct: "heart", regen: "heart", lifesteal: "heart", defPct: "ws_hp", shield: "ws_hp", thorns: "ws_hp", riposte: "ws_hp", dodge: "eye",
  gold: "ws_gold", drop: "luck", xp: "wisdom", offline: "clock", burn: "elixir", poison: "luck", minion: "skull",
  doubleShot: "ws_atk", tapDmg: "target", combo: "ws_atk", iai: "ws_atk", firstStrike: "ws_atk", secondWind: "potion",
};
export const effectIconURL = (eff, scale = 3) => shopIconURL(EFFECT_ICON[Object.keys(eff || {})[0]] || "star", scale);

const cache = {};
/** URL (data:) de l'icône `id`, en grand (scale px par pixel). */
// Blason de la guilde des aventuriers (demande 20 de Victor) : écu écartelé azur et gueules, épées croisées sur une
// gemme, couronne. Le métal (bordure, couronne, gemme) suit le rang : bronze, argent, or, améthyste, étoile.
const CREST = [
  "...Y...Y...Y...", "...YY.YYY.YY...", "...YYYYYYYYY...", ".KKKKKKKKKKKKK.", ".KBBBBBBBBBBBK.",
  ".KBGLLLBRRRGBK.", ".KBLWLLBRRWRBK.", ".KBLLWLBRWRRBK.", ".KBLLLWBWRRRBK.", ".KBBBBBSBBBBBK.",
  ".KBRRRWBWLLLBK.", ".KBRRWRBLWLLBK.", "..KBWRRBLLWBK..", "...KBRRBLLBK...", "....KBRBLBK....",
  ".....KBBBK.....", "......KKK......",
];
const CREST_METALS = [
  { B: "#b87333", Y: "#d8955a", S: "#e2394a" }, // bronze
  { B: "#c9ced6", Y: "#eef3f8", S: "#7fd6ff" }, // argent
  { B: "#e9b949", Y: "#ffd34d", S: "#e2394a" }, // or
  { B: "#9a6ad8", Y: "#c08cff", S: "#ffd34d" }, // améthyste
  { B: "#ffe27a", Y: "#fff6c8", S: "#7fd6ff" }, // étoile
];
CREST_METALS.forEach((m, i) => { SHOP_ICON_DEFS["crest" + i] = [CREST, { L: "#3a6ea5", R: "#b8322a", W: "#e3ebf3", G: "#8a5a2b", ...m }]; });

export function shopIconURL(id, scale = 5) {
  const k = id + "@" + scale;
  if (!cache[k]) {
    const d = SHOP_ICON_DEFS[id] || SHOP_ICON_DEFS.potion;
    cache[k] = buildSprite(d[0], { K: OUT, ...d[1] }, scale, false, 1).toDataURL();
  }
  return cache[k];
}
