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
// Talisman de pureté (Porte-talisman) : cordon, monture dorée, gemme claire.
const TALISMAN = ["..C...C..", "...C.C...", "....C....", "...GGG...", "..GWBWG..", ".GBBWBBG.", "..GBBBG..", "...GBG...", "....G...."];
// Icônes propres à certains déblocages (une icône par déblocage, comme l'Ascension) :
// marteau du Maître de forge, enclume étoilée, parchemin de contrat, astrolabe, cloche du Grand intendant.
const HAMMER = ["..MMMMM..", "..MMMMM..", "..MMMMM..", "....B....", "....B....", "....B....", "....B....", "...BBB..."];
const STARANVIL = ["....Y....", "...YYY...", "KKKKKKKK.", "KMMMMMMMK", ".KMMMMMK.", "..KMMMK..", ".KKKKKKK.", "KBBBBBBBK"];
// (it. 736) Marchand attitré : bourse dorée nouée, pièce
const TRADER = ["...BB....", "..B..B...", "...BB....", "..YYYY...", ".YYDYYY..", ".YDDDYY.Y", ".YYDYYY..", "..YYYY..."];
// (it. 732) Herboriste perpétuel : fiole verte et feuille, étincelle dorée
const HERBALIST = ["....Y....", "...GG.Y..", "..GGG....", "...KK....", "..KLLK...", ".KLLLLK..", ".KLLLLK..", "..KKKK..."];
// (it. 712) Forgeron des astres : marteau au-dessus d'une enclume bleu pâle, étoiles autour
const STARSMITH = ["Y...H..Y.", "...HHH...", ".Y..H....", "KKKKKKKK.", "KMMMMMMMK", ".KMMMMMK.", "..KMMMK.Y", "KBBBBBBBK"];
const CONTRACT = [".PPPPPPP.", "PPLLLLLPP", ".PPPPPPP.", ".PLLLLLP.", ".PPPPPPP.", ".PLLLRRP.", "PPPPPRRPP", ".PPPPPPP."];
const ASTRO = ["...GGG...", ".GG.Y.GG.", "G..GYG..G", "G.G.Y.G.G", "GYYYYYYYG", "G.G.Y.G.G", "G..GYG..G", ".GG.Y.GG.", "...GGG..."];
const EVERFIRE = ["..P.W.P..", "...PWP...", ".KKKKKKK.", "KPPPPPPPK", "KMMMMMMMK", ".KMMMMMK.", "..KMMMK..", ".R.RYR.R.", "RYRYRYRYR"];
const BELL = ["....G....", "...GGG...", "..GGWGG..", "..GGWGG..", ".GGGGGGG.", ".GGGGGGG.", "GGGGGGGGG", "....B...."];
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
  ws_xp:   [BOOK, { B: "#2a5a8a", W: "#f0dca8", L: "#5a8ad8", D: "#183a5a" }],
  heart:   [HEART, { R: "#e2394a", W: "#ffb0b8" }],
  star:    [STAR, { Y: "#ffd34d", W: "#fff6c8" }],
  target:  [TARGET, { R: "#ff6b5a", W: "#ffffff" }],
  skull:   [SKULL, { W: "#e8e4d6" }],
  gear:    [GEAR, { G: "#a9b6c6" }],
  note:    [NOTE, { Y: "#ffd34d" }],
  eye:     [EYE, { W: "#f4f0e8", B: "#5a8ad8" }],
  trophy:  [TROPHY, { Y: "#ffd34d", D: "#8a5a2b" }],
  book:    [BOOK, { B: "#8a3a2a", W: "#f0dca8", L: "#8a5a2b", D: "#5a2018" }],
  grimoire: [BOOK, { B: "#5a3a8a", W: "#e0d8ff", L: "#9a7ad8", D: "#2a1848" }],
  keys:    [KEYS, { W: "#c9ced6" }],
  clock:   [CLOCK, { W: "#c9ced6" }],
  kennel:  [KENNEL, { R: "#c0392b", B: "#a8703a", W: "#3a2a1a" }],
  cauldron: [CAULDRON, { G: "#7dff9a", M: "#4a4560" }],
  anvil:   [ANVIL, { M: "#8a93a0", B: "#6b4a2b" }],
  kennel2: [EGG, { W: "#f4ecd8", S: "#c0392b" }],
  map:     [MAP, { P: "#e8d8b0", L: "#a8884a", R: "#e2394a" }],
  hammer:  [HAMMER, { M: "#8a93a0", B: "#6b4a2b" }],
  staranvil: [STARANVIL, { M: "#6a7fb0", B: "#4a3a6b", Y: "#ffd34d" }],
  trader:    [TRADER, { B: "#a8703a", Y: "#e9b949", D: "#fff2c8" }],
  herbalist: [HERBALIST, { G: "#5fd36f", L: "#7dff9a", Y: "#ffe9a8" }],
  starsmith: [STARSMITH, { M: "#9fdcff", B: "#4a3a6b", Y: "#ffe9a8", H: "#c9ced6" }],
  contract: [CONTRACT, { P: "#f0dca8", L: "#a8884a", R: "#c0392b" }],
  astro:   [ASTRO, { G: "#c9a24a", Y: "#ffe9a8" }],
  everfire: [EVERFIRE, { P: "#c08cff", W: "#f4e8ff", M: "#4a4560", R: "#e2594a", Y: "#ffd34d" }],
  bell:    [BELL, { G: "#e8b14a", W: "#fff2c8", B: "#8a5a2b" }],
  talisman: [TALISMAN, { C: "#a8884a", G: "#ffd34d", B: "#9fe0ff", W: "#ffffff" }],
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
// Constellations de l'Ascension (demande 27 de Victor) : une icône unique par constellation, à son image
// (le Serpent est un serpent, la Tour une tour…). Clés = identifiants de prestige.js.
const CONST_ICONS = {
  c_warrior: [["..KKKKK..", ".KMMMMMK.", "KMMWMMMMK", "KMKKKKKMK", "KMKYKYKMK", "KMMMMMMMK", ".KMMRMMK.", "..KMMMK..", "...KKK..."], { M: "#a9b6c6", W: "#e8eef4", Y: "#ffd34d", R: "#e2394a" }],
  c_tower: [["..K.K.K..", "..KKKKK..", "..KSSSK..", "..KSWSK..", "..KSSSK..", ".KSSSSSK.", ".KSSKSSK.", ".KSSKSSK.", "KKKKKKKKK"], { S: "#9a8f7a", W: "#ffd34d" }],
  c_coin: [["..KKKKK..", ".KYYYYYK.", "KYYYWYYYK", "KYYWWWYYK", "KYYYWYYYK", "KYYYYYYDK", ".KYYYYDK.", "..KKKKK.."], { Y: "#ffd34d", W: "#fff6c8", D: "#b8860b" }],
  c_owl: [[".K.....K.", "KBK...KBK", "KBBKKKBBK", "KWWBBBWWK", "KWKWBWKWK", "KWWBYBWWK", ".KBBBBBK.", ".KBLBLBK.", "..KYKYK.."], { B: "#8a6a4a", W: "#f4ecd8", Y: "#ffb733", L: "#c8a67a" }],
  c_comet: [["......KK.", ".....KWWK", "....KWYYK", "...KYYYK.", "..LYYK...", ".L.LK....", "L.L......", ".L.......", "L........"], { Y: "#ffe27a", W: "#fff6c8", L: "#7fd6ff" }],
  c_chalice: [["KKKKKKKKK", "KYRRRRRYK", ".KYRRRYK.", "..KYYYK..", "...KYK...", "...KYK...", "..KYYYK..", ".KYYYYYK.", ".KKKKKKK."], { Y: "#ffd34d", R: "#a01a3a" }],
  c_road: [["GGGGPGGGG", "GGGPPPGGG", "GGGPDPGGG", "GGPPPPPGG", "GGPPDPPGG", "GPPPPPPPG", "GPPPDPPPG", "PPPPPPPPP", "PPPPDPPPP"], { P: "#d8c08a", D: "#fff6c8", G: "#3f8f4a" }],
  c_tree: [["...KKK...", ".KKGGGKK.", "KGGGgGGGK", "KGgGGGgGK", "KGGGGGGGK", ".KKGBGKK.", "...KBK...", "...KBK...", "..KBBBK.."], { G: "#5fd36f", g: "#2f8a3f", B: "#8a5a2b" }],
  c_moon: [["...KKK...", "..KWWK...", ".KWWK..Y.", "KWWK.....", "KWWK.....", "KWWK..Y..", ".KWWK....", "..KWWK...", "...KKK..."], { W: "#f4f0c8", Y: "#ffe27a" }],
  c_flask: [["...KKK...", "...KWK...", "...KWK...", "..KKKKK..", ".KGGGGGK.", "KGGWGGGGK", "KGGGGGGGK", "KgGGGGGgK", ".KKKKKKK."], { G: "#7dff9a", g: "#2fa85a", W: "#ffffff" }],
  c_north: [["....W....", "....W....", "...WYW...", "..WYYYW..", "WWYYWYYWW", "..WYYYW..", "...WYW...", "....W....", "....W...."], { Y: "#bde0ff", W: "#ffffff" }],
  c_shield: [["..KKKKK..", ".KMMMMMK.", "KMBBBBBMK", "KMBYYYBMK", "KMBYMYBMK", "KMBYYYBMK", "KMBBBBBMK", ".KMMMMMK.", "..KKKKK.."], { M: "#a9b6c6", B: "#3a6ab8", Y: "#ffd34d" }],
  c_crown: [["Y...Y...Y", "YY.YYY.YY", "YYYYYYYYY", "YRYYBYYRY", "YYYYYYYYY", "DDDDDDDDD"], { Y: "#ffd34d", R: "#e2394a", B: "#7fd6ff", D: "#b8860b" }],
  c_serpent: [["....GGGG.", "...GG.KGR", "...GG....", "....GGGG.", "......GG.", "......GG.", ".GGGGGG..", "GG.......", "G........"], { G: "#5fd36f", R: "#e2394a" }],
  c_wing: [["......WW.", ".....WLLW", "....WLLW.", "...WLLW..", "..WLLW...", ".WLLW....", "WLLW.....", ".WW......", "W........"], { W: "#ffffff", L: "#bde0ff" }],
  c_bolt: [[".....YYY.", "....YYY..", "...YYY...", "..YYYYYY.", ".....YY..", "....YY...", "...YW....", "..YW.....", ".W......."], { Y: "#ffe27a", W: "#ffffff" }],
  c_hunter: [["...B.....", "..BS.....", ".B..S....", "B...S..Y.", "BWWWWWWYY", "B...S..Y.", ".B..S....", "..BS.....", "...B....."], { B: "#a8703a", S: "#e8e4d6", W: "#c9ced6", Y: "#ffd34d" }],
};
Object.assign(SHOP_ICON_DEFS, CONST_ICONS);
CREST_METALS.forEach((m, i) => { SHOP_ICON_DEFS["crest" + i] = [CREST, { L: "#3a6ea5", R: "#b8322a", W: "#e3ebf3", G: "#8a5a2b", ...m }]; });

// Icônes des sorts (demande G de Victor) : une forme par mécanique, teintée de la couleur du héros (C = couleur,
// D = sa teinte sombre, W = éclat) ; chaque héros a donc trois icônes à lui, et la même mécanique change de couleur
// d'un héros à l'autre.
const SPELL_ART = {
  bolt:   ["....WCC..", "...WCC...", "..WCC....", ".WCCCCC..", "....CCD..", "...CCD...", "..CD.....", ".CD......", "D........"],
  gust:   ["..CCCC...", ".C....C..", "C..WW..C.", "..W..W.C.", ".W.CC.W..", ".W.C..C..", "..W...C..", "...WCC...", "........."],
  mend:   ["...CCC...", "...CWC...", "...CWC...", "CCCCWCCCC", "CWWWWWWWC", "CCCCWCCCC", "...CWC...", "...CWC...", "...CCC..."],
  fire:   ["....W....", "...WC....", "..WCC.W..", "..CCCWC..", ".CCDCCC..", ".CDDDCCC.", ".CDWDDC..", "..CDDC...", "...CC...."],
  aegis:  [".CCCCCCC.", "CWWWWWWWC", "CWCCCCCWC", "CWCWWWCWC", "CWCWCWCWC", ".CWCCCWC.", "..CWWWC..", "...CWC...", "....C...."],
  meteor: ["W........", ".W.......", "..WC.....", "...CC....", "....CCC..", "...CDDDC.", "...CDWDC.", "...CDDDC.", "....CCC.."],
};
const darker = (hex) => { const n = parseInt(hex.slice(1), 16), f = (v) => Math.round(v * 0.55).toString(16).padStart(2, "0"); return "#" + f(n >> 16 & 255) + f(n >> 8 & 255) + f(n & 255); };
/** Reliques des boss majeurs (demande S, it. 572) : 9×9, couleurs propres (ni teinte du héros ni badge). */
const RELIC_ART = {
  drone: [["W.W...W.W", "WWW...WWW", ".W.....W.", "..CCCCC..", ".CCBBBCC.", ".CCBWBCC.", "..CCCCC..", "...D.D...", "........."], { C: "#9aa4b8", B: "#3fa9ff", W: "#ffffff", D: "#5a6478" }],
  heart: [["..RR.RR..", ".RRRRRRR.", "RRWRRRRRR", "RRRRRRRRR", ".RRRRRRR.", "..RRRRR..", "...RRR...", "....R....", "........."], { R: "#ff5a6e", W: "#ffd0d6" }],
  blade: [["........W", ".......WP", "......WP.", ".....WP..", "....WP...", ".G.WP....", "..GP.....", ".G.G.....", "G........"], { W: "#ffffff", P: "#b48cff", G: "#ffd34d" }],
  crown: [[".........", "Y...Y...Y", "YY.YYY.YY", "YYYYYYYYY", "YRYYBYYRY", "YYYYYYYYY", ".........", ".........", "........."], { Y: "#ffd34d", R: "#ff5a6e", B: "#7fc8ff" }],
};
export function relicIconURL(id, scale = 3) {
  const k = "relic:" + id + "@" + scale;
  if (!cache[k] && RELIC_ART[id]) cache[k] = buildSprite(RELIC_ART[id][0], { K: OUT, ...RELIC_ART[id][1] }, scale, false, 1).toDataURL();
  return cache[k] || "";
}

/** Badge d'effet (demande Q, it. 552) : 4×4 pixels dans le coin bas droit de l'icône, le premier effet propre du sort. */
const SPELL_BADGE = {
  stun:    [["Y.Y.", ".Y..", "Y.Y.", "...."], "#fff27a"], slow:  [["B.B.", ".B..", "B.B.", "...."], "#8fd0ff"],
  weaken:  [["GGG.", ".G..", "....", "...."], "#9aa0a8"], burn:  [[".R..", "RRR.", "RYR.", ".R.."], "#ff7a2a"],
  venom:   [[".V..", "VVV.", "VVV.", ".V.."], "#7ddc4a"], leech: [["H.H.", "HHH.", ".H..", "...."], "#ff4a5a"],
  execute: [["WWW.", "W.W.", ".W..", "...."], "#ffffff"], crit:  [[".Y..", ".Y..", "....", ".Y.."], "#ffd34d"],
  echo:    [["P.P.", "P.P.", "P.P.", "...."], "#c08cff"], haste: [["O.O.", ".O.O", "O.O.", "...."], "#ffb347"],
  cdr:     [["CCC.", "C.C.", "CCC.", "...."], "#7fe0ff"], regen: [[".G..", "GGG.", ".G..", "...."], "#7dff9a"],
  pierce:  [["..W.", "WWWW", "..W.", "...."], "#ffffff"], hits:  [["W.W.", ".W..", "W.W.", "...."], "#ffffff"],
};
/** Icône d'un sort : forme de sa mécanique, couleur de son héros, badge de son premier effet propre. */
export function spellIconURL(tpl, color, scale = 3, badge = null) {
  const k = "spell:" + tpl + color + "@" + scale + ":" + (badge || "");
  if (!cache[k]) {
    const c = buildSprite(SPELL_ART[tpl] || SPELL_ART.bolt, { K: OUT, C: color, D: darker(color), W: "#ffffff" }, scale, false, 1);
    const b = SPELL_BADGE[badge];
    if (b) { // contour sombre puis pixels, en bas à droite (cellules 7 à 10 de la grille 11×11 avec le cadre)
      const ctx = c.getContext("2d"), x0 = 7, y0 = 7;
      ctx.fillStyle = OUT;
      for (let y = -1; y <= 4; y++) for (let x = -1; x <= 4; x++) ctx.fillRect((x0 + x) * scale, (y0 + y) * scale, scale, scale);
      ctx.fillStyle = b[1];
      b[0].forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== ".") ctx.fillRect((x0 + x) * scale, (y0 + y) * scale, scale, scale); }));
    }
    cache[k] = c.toDataURL();
  }
  return cache[k];
}

export function shopIconURL(id, scale = 5) {
  const k = id + "@" + scale;
  if (!cache[k]) {
    const d = SHOP_ICON_DEFS[id] || SHOP_ICON_DEFS.potion;
    cache[k] = buildSprite(d[0], { K: OUT, ...d[1] }, scale, false, 1).toDataURL();
  }
  return cache[k];
}
