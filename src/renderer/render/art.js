// Pixel art (une lettre = une couleur de la palette, "." = transparent).
// Ajouter un monstre : une entrée dans MONSTER_ART avec 2 images d'animation.

export const OUTLINE = "#14121f";
export const PIXEL = 3;

const HERO_PAL = { H: "#5a3a22", S: "#f1c7a0", E: "#1d1a26", A: "#3a6ea5", B: "#e9b949", L: "#4a3b2a", K: "#2a1f18", w: "#e3ebf3", g: "#8a5a2b" };
export const HERO_HEAD = [".....HHHH", "....HHHHHH", "....HSSSSH", "....SSSESS.w", ".....SSSS..w", "...AAAAAA..w", "..AAABBAAA.w", "..SAABBAASgg", "...AAAAAA.g"];
export const HERO_ART = {
  pal: HERO_PAL,
  walk1: HERO_HEAD.concat(["...LLLLLL", "...LL..LL", "...LL..LL", "...KK..KK"]),
  walk2: HERO_HEAD.concat(["...LLLLLL", "..LL....LL", "..LL....LL", "..KK....KK"]),
  attack: [".....HHHH", "....HHHHHH", "....HSSSSH", "....SSSESS", ".....SSSS", "...AAAAAA", "..AAABBAAA", "..AAABBAASgwwwww", "...AAAAAA", "...LLLLLL", "..LL...LL", "..LL...LL", "..KK...KK"],
};

// Rôdeur : capuche verte, arc tenu devant lui.
const RANGER_PAL = { H: "#2f5d34", S: "#f1c7a0", E: "#1d1a26", A: "#5b8c3a", B: "#8a5a2b", L: "#4a3b2a", K: "#2a1f18", w: "#a0713c", s: "#e3ebf3", r: "#e3ebf3", t: "#9aa3ad" };
const RANGER_TOP = [
  "....HHHH",
  "...HHHHHH",
  "..HHHSSSH..w",
  "..HHSSESS...w",
  "...HSSSS....w",
  "...AAAAAA..sw",
  "..AAABBAAASsw",
  "..SAABBAA..sw",
  "...AAAAAA...w",
  "...LLLLLL..w",
];
const LEGS_A = ["...LL..LL", "...LL..LL", "...KK..KK"];
const LEGS_B = ["..LL....LL", "..LL....LL", "..KK....KK"];
const RANGER_ART = {
  pal: RANGER_PAL,
  walk1: RANGER_TOP.concat(LEGS_A),
  walk2: RANGER_TOP.concat(LEGS_B),
  attack: RANGER_TOP.slice(0, 6).concat(["..AAABBAAASrrrrt"], RANGER_TOP.slice(7), LEGS_A),
};

// Mage : chapeau pointu, robe violette, bâton à orbe.
const MAGE_PAL = { H: "#4b2a7a", h: "#e9b949", S: "#f1c7a0", E: "#1d1a26", A: "#6a3fa0", B: "#e9b949", K: "#2a1f18", w: "#8a5a2b", o: "#7fd6ff", O: "#ffffff" };
const MAGE_TOP = [
  ".....HH",
  "....HHHH",
  "...HHHHHH...o",
  "..hhhhhhhh.ooo",
  "...SSSESS...w",
  "....SSSS....w",
  "...AAAAAA...w",
  "..AAABAAAA.Sw",
  "..AAABAAA...w",
  "..AAABAAA...w",
];
const MAGE_ART = {
  pal: MAGE_PAL,
  walk1: MAGE_TOP.concat(["..AAAAAAA...w", "...KK.KK....w"]),
  walk2: MAGE_TOP.concat(["..AAAAAAA...w", "..KK...KK...w"]),
  attack: [".....HH", "....HHHH", "...HHHHHH..OoO", "..hhhhhhhh.ooo", "...SSSESS..OoO", "....SSSS....w",
    "...AAAAAA...w", "..AAABAAAASSw", "..AAABAAA...w", "..AAABAAA...w", "..AAAAAAA...w", "...KK.KK....w"],
};

// Paladin : armure argentée, liseré doré, masse d'armes.
const PALADIN_PAL = { H: "#c9ced6", B: "#e9b949", S: "#f1c7a0", E: "#1d1a26", A: "#dfe4ea", L: "#8a93a0", K: "#4a4f5a", w: "#c9ced6", g: "#8a5a2b" };
const PALADIN_TOP = [
  ".....HHH", "....HHBHH", "....HSSSH", "....SSESS..ww", ".....SSS...ww",
  "...AAAAAA...g", "..AABBBBAA.g", "..SAABBAASg", "...AAAAAA",
];
const PALADIN_ART = {
  pal: PALADIN_PAL,
  walk1: PALADIN_TOP.concat(["...LLLLLL", "...LL..LL", "...LL..LL", "...KK..KK"]),
  walk2: PALADIN_TOP.concat(["...LLLLLL", "..LL....LL", "..LL....LL", "..KK....KK"]),
  attack: [".....HHH", "....HHBHH", "....HSSSH", "....SSESS", ".....SSS", "...AAAAAA", "..AABBBBAA....ww",
    "..SAABBAASggggww", "...AAAAAA", "...LLLLLL", "..LL...LL", "..LL...LL", "..KK...KK"],
};

// Assassin : capuche sombre, masque, yeux rouges, dagues.
const ASSASSIN_PAL = { H: "#2a2638", M: "#3a3550", E: "#ff5a5a", S: "#f1c7a0", A: "#3b3550", B: "#8a2a2a", L: "#2a2638", K: "#14121f", d: "#e3ebf3", h: "#8a5a2b" };
const ASSASSIN_TOP = [
  "....HHHH", "...HHHHHH", "...HMMSSH", "...HMMESS", "....MMSS..d",
  "...AAAAAA.d", "..AAABBAAAh", "..SAABBAAS.", "...AAAAAA",
];
const ASSASSIN_ART = {
  pal: ASSASSIN_PAL,
  walk1: ASSASSIN_TOP.concat(["...LLLLLL", "...LL..LL", "...LL..LL", "...KK..KK"]),
  walk2: ASSASSIN_TOP.concat(["...LLLLLL", "..LL....LL", "..LL....LL", "..KK....KK"]),
  attack: ["....HHHH", "...HHHHHH", "...HMMSSH", "...HMMESS", "....MMSS", "...AAAAAA", "..AAABBAASShddd",
    "..SAABBAA", "...AAAAAA", "...LLLLLL", "..LL...LL", "..LL...LL", "..KK...KK"],
};

// Nécromancien : robe noire, visage blafard, bâton surmonté d'un crâne.
const NECRO_PAL = { H: "#1f1d2e", S: "#cfd8c8", E: "#7dff9a", A: "#2e2a40", B: "#7dff9a", K: "#14121f", w: "#5a4a3a", o: "#e8e4d6", G: "#7dff9a" };
const NECRO_TOP = [
  "....HHHH", "...HHHHHH.ooo", "..HHSSSSH.oGo", "..HHSSESS..w", "...HSSSS...w",
  "...AAAAAA..w", "..AAABAAAASw", "..AAABAAA..w", "..AAABAAA..w",
];
const NECRO_ART = {
  pal: NECRO_PAL,
  walk1: NECRO_TOP.concat(["..AAAAAAA..w", "...KK.KK...w"]),
  walk2: NECRO_TOP.concat(["..AAAAAAA..w", "..KK...KK..w"]),
  attack: ["....HHHH", "...HHHHHH.GGG", "..HHSSSSH.GoG", "..HHSSESS.GGG", "...HSSSS...w", "...AAAAAA..w",
    "..AAABAAASSw", "..AAABAAA..w", "..AAABAAA..w", "..AAAAAAA..w", "...KK.KK...w"],
};

// Moine : crâne rasé, robe safran, poings bandés.
const MONK_PAL = { S: "#f1c7a0", E: "#1d1a26", A: "#e8963a", B: "#8a2a2a", L: "#c9772e", w: "#e3ebf3" };
const MONK_TOP = [
  ".....SSSS", "....SSSSSS", "....SSSSSS", "....SSSESS", ".....SSSS",
  "...AAAAAA", "..AAABBAAA", "..wAABBAAw", "...AAAAAA",
];
const MONK_ART = {
  pal: MONK_PAL,
  walk1: MONK_TOP.concat(["...LLLLLL", "...LL..LL", "...LL..LL", "...SS..SS"]),
  walk2: MONK_TOP.concat(["...LLLLLL", "..LL....LL", "..LL....LL", "..SS....SS"]),
  attack: [".....SSSS", "....SSSSSS", "....SSSSSS", "....SSSESS", ".....SSSS", "...AAAAAA", "..AAABBAASSww",
    "..wAABBAA", "...AAAAAA", "...LLLLLL", "..LL....LL", ".LL......LL", ".SS......SS"],
};

// Druide : couronne de feuilles, robe brune, bâton feuillu.
const DRUID_PAL = { l: "#5fae4a", F: "#ff9ad8", H: "#6a4a2a", S: "#f1c7a0", E: "#1d1a26", A: "#6a5a3a", B: "#5fae4a", K: "#3a2a1a", w: "#8a5a2b" };
const DRUID_TOP = [
  "....lFll", "...lllllll", "...HSSSSH....l", "...SSSESS...lwl", "....SSSS.....w",
  "...AAAAAA....w", "..AAABBAAA..Sw", "..AAABBAAA...w", "..AAAAAAAA...w",
];
const DRUID_ART = {
  pal: DRUID_PAL,
  walk1: DRUID_TOP.concat(["..AAAAAAA....w", "...KK.KK.....w"]),
  walk2: DRUID_TOP.concat(["..AAAAAAA....w", "..KK...KK....w"]),
  attack: ["....lFll", "...lllllll", "...HSSSSH...lll", "...SSSESS..lFl", "....SSSS....lw", "...AAAAAA....w",
    "..AAABBAAASSw", "..AAABBAAA...w", "..AAAAAAAA...w", "..AAAAAAA....w", "...KK.KK.....w"],
};

// Samouraï : chignon, armure laquée rouge, hakama sombre, katana.
const SAMURAI_PAL = { H: "#1d1a26", S: "#f1c7a0", E: "#1d1a26", A: "#b8322a", B: "#2a2638", L: "#3a3550", K: "#8a5a2b", w: "#e3ebf3", g: "#2a2638", r: "#e9b949" };
const SAMURAI_TOP = [
  ".....HH", "....HHHH", "...HHHHHH", "...HSSSSH", "...SSSESS", "....SSSS",
  "..AAAAAAA", ".AArAAArA.g", ".SAAAAAAS.w", "..BBBBBBBw",
];
const SAMURAI_ART = {
  pal: SAMURAI_PAL,
  walk1: SAMURAI_TOP.concat(["..LLLLLLL", "..LLL.LLL", "..LL...LL", "..KK...KK"]),
  walk2: SAMURAI_TOP.concat(["..LLLLLLL", ".LLL...LLL", ".LL.....LL", ".KK.....KK"]),
  attack: [".....HH", "....HHHH", "...HHHHHH", "...HSSSSH", "...SSSESS", "....SSSS", "..AAAAAAA", ".AArAAArA",
    ".SAAAAAASggwwwwww", "..BBBBBBB", "..LLLLLLL", ".LLL...LLL", ".LL.....LL", ".KK.....KK"],
};

/** Sprites des classes : générés à partir de pièces dans heroart.js. */
export { CLASS_ART, CLASS_HEADS } from "./heroart.js";

import { MONSTER_ART_2 } from "./art-monsters2.js";

export const MONSTER_ART = {
  slime: { pal: { G: "#6ad35b", D: "#3e9a3a", W: "#ffffff", E: "#1a1a1a" }, frames: [
    ["...GGGGG...", "..GGGGGGG..", ".GGWGGGWGG.", ".GGEGGGEGG.", "GGGGGGGGGGG", "GGGGGGGGGGG", "DGGGGGGGGGD", ".DDDDDDDDD."],
    ["...........", "..GGGGGGG..", ".GGGGGGGGG.", "GGGWGGGWGGG", "GGGEGGGEGGG", "GGGGGGGGGGG", "DGGGGGGGGGD", ".DDDDDDDDD."]] },
  mush: { pal: { R: "#d94a4a", W: "#fbe9e0", C: "#efe0c4", E: "#222222", F: "#8a6a4a" }, frames: [
    ["...RRRR...", ".RRWRRRRR.", "RRRRRRWRRR", "RWRRRRRRRR", "RRRRRRRRRR", "..CCCCCC..", "..CECCEC..", "..CCCCCC..", "..CCCCCC..", "...C..C...", "...F..F..."],
    ["...RRRR...", ".RRWRRRRR.", "RRRRRRWRRR", "RWRRRRRRRR", "RRRRRRRRRR", "..CCCCCC..", "..CECCEC..", "..CCCCCC..", "..CCCCCC..", "..C....C..", "..F....F.."]] },
  bat: { pal: { W: "#5b3f73", B: "#8a64aa", E: "#ff5a5a" }, fly: true, frames: [
    ["W...........W", "WW...BBB...WW", "WWW.BEBEB.WWW", "WWWWBBBBBWWWW", ".WWWBBBBBWWW.", "..W..BBB..W..", "......B......"],
    [".............", ".....BBB.....", "....BEBEB....", ".WWWBBBBBWWW.", "WWWWBBBBBWWWW", "WWW..BBB..WWW", "W.....B.....W"]] },
  skel: { pal: { B: "#e8e4d6", E: "#c0392b", s: "#9aa3ad", h: "#6b4a2b" }, frames: [
    ["...BBBB...", "..BBBBBB..", "..BEBBEB..", "..BBBBBB..", "...B.B.B..", "....BB....", "..BBBBBB.s", ".B.BBBB.Bs", ".B.B..B.Bs", "...BBBB.hh", "...B..B...", "...B..B...", "..BB..BB.."],
    ["...BBBB...", "..BBBBBB..", "..BEBBEB..", "..BBBBBB..", "...B.B.B..", "....BB....", "..BBBBBB.s", ".B.BBBB.Bs", ".B.B..B.Bs", "...BBBB.hh", "..B....B..", "..B....B..", ".BB....BB."]] },
  scorp: { pal: { O: "#c9772e", D: "#8a4a1c", T: "#e9b949", E: "#1a1a1a", C: "#e08a3a" }, frames: [
    ["..DDD......", ".D...D.....", ".D....T....", ".D.........", ".OOOOOOO.CC", "OOOOOOOOEOC", "OOOOOOOOOO.", "D.D.D.D.D.."],
    ["..DDD......", ".D...D.....", ".D...T.....", ".D.........", ".OOOOOOO..C", "OOOOOOOOEOC", "OOOOOOOOOOC", ".D.D.D.D.D."]] },
  wolf: { pal: { W: "#e8eef5", G: "#a9b6c6", E: "#1a1a1a", N: "#333333", R: "#c0392b" }, frames: [
    ["..........GG.", ".........GWWG", "G.......WWWEW", "GWWWWWWWWWWWN", ".WWWWWWWWWWR.", ".WWWWWWWWW...", ".W.W....W.W..", ".G.G....G.G.."],
    ["..........GG.", ".........GWWG", ".G......WWWEW", "GWWWWWWWWWWWN", ".WWWWWWWWWW..", ".WWWWWWWWW...", "W..W...W..W..", "G...G..G...G."]] },
  golem: { pal: { S: "#8a8f99", D: "#5c616b", E: "#7fd6ff", M: "#5f8a4a" }, frames: [
    ["...SSSSSS...", "..SSSSSSSS..", "..SDEDDEDS..", "..SSSSSSSS..", "SSSSSSSSSSSS", "SSMSSSSSSMSS", "SS.SSSSSS.SS", "SS.SSDDSS.SS", "...SSSSSS...", "...SS..SS...", "...SS..SS...", "..DDD..DDD.."],
    ["...SSSSSS...", "..SSSSSSSS..", "..SDEDDEDS..", "..SSSSSSSS..", ".SSSSSSSSSS.", "SSMSSSSSSMSS", "SS.SSSSSS.SS", "SS.SSDDSS.SS", "...SSSSSS...", "..SS....SS..", "..SS....SS..", ".DDD....DDD."]] },
  plant: { pal: { G: "#3f9a3a", D: "#2a6a2a", R: "#d94a4a", W: "#ffffff" }, frames: [
    ["...RRRRR...", "..RRWRWRR..", ".RR.....RR.", ".RRWRWRWRR.", "..RRRRRRR..", ".....D.....", "..G..D..G..", ".GGG.D.GGG.", "..GGDDDGG..", "....DDD....", "...DDDDD..."],
    ["...........", "...RRRRR...", "..RRWRWRR..", ".RRRRRRRRR.", "..RRRRRRR..", ".....D.....", "..G..D..G..", ".GGG.D.GGG.", "..GGDDDGG..", "....DDD....", "...DDDDD..."]] },
  ghost: { pal: { W: "#dfe7f2", B: "#9fb3cc", E: "#2a2a4a" }, fly: true, frames: [
    ["...WWWW...", "..WWWWWW..", ".WWEWWEWW.", ".WWEWWEWW.", ".WWWWWWWW.", ".WWWBBWWW.", ".WWWWWWWW.", ".WWWWWWWW.", ".W.WW.WW.W", "B...B...B."],
    ["...WWWW...", "..WWWWWW..", ".WWEWWEWW.", ".WWEWWEWW.", ".WWWWWWWW.", ".WWWBBWWW.", ".WWWWWWWW.", ".WWWWWWWW.", ".WW.WW.WW.", "..B...B..."]] },
  imp: { pal: { R: "#c0392b", D: "#7a1e1e", Y: "#ffd34d", K: "#2a1a1a", W: "#5a2a3a" }, fly: true, frames: [
    ["...K.....K...", "...KRRRRRK...", "W..RRYRYRR..W", "WW.RRRRRRR.WW", "WWWRRDDDRRWWW", ".WWRRRRRRRWW.", "...RRRRRRR...", "....R...R.D..", "...DD...DD.D."],
    ["...K.....K...", "...KRRRRRK...", "...RRYRYRR...", "...RRRRRRR...", "WWWRRDDDRRWWW", "WWWRRRRRRRWWW", "W..RRRRRRR..W", "....R...R.D..", "...DD...DD.D."]] },
  goblin: { pal: { Y: "#ffd34d", D: "#c99a1a", G: "#5fae4a", E: "#1a1a1a", B: "#8a5a2b", W: "#fff6c8" }, frames: [
    ["...GG.GG..", "...GGGGG..", "...GEGEG..", "...GGGGG..", "..DYYYYD.B", ".G.YWYY.BB", "...YYYY.BB", "...Y..Y...", "..DD..DD.."],
    ["...GG.GG..", "...GGGGG..", "...GEGEG..", "...GGGGG..", "..DYYYYD.B", "..GYWYYGBB", "...YYYY.BB", "..Y....Y..", ".DD....DD."]] },
  rat: { pal: { G: "#8a7f7a", D: "#5c534f", P: "#e8a0a8", E: "#1a1a1a" }, frames: [
    ["........PP..", "......GGGG..", ".....GGGGEG.", "PPGGGGGGGGGP", "..GGGGGGGG..", "..D.D..D.D.."],
    ["........PP..", "......GGGG..", ".....GGGGEG.", ".PGGGGGGGGGP", "P.GGGGGGGG..", ".D..D.D..D.."]] },
  spider: { pal: { K: "#2a2638", B: "#4a4560", R: "#c0392b" }, frames: [
    ["....KKKKK....", "...KBBBBBK...", "K.KBBRBRBBK.K", ".KKBBBBBBBKK.", "K..KKKKKKK..K", ".K.K.....K.K.", "K...K...K...K"],
    ["....KKKKK....", "...KBBBBBK...", ".KKBBRBRBBKK.", "K.KBBBBBBBK.K", ".K.KKKKKKK.K.", "K..K.....K..K", "...K.....K..."]] },
  mummy: { pal: { W: "#e8dcc0", w: "#b8ab8a", E: "#ffcc33", K: "#3a3020" }, frames: [
    ["...WWWW...", "..WwWWwW..", "..WEwWEW..", "..wWWWWw..", "...WwWW...", ".WWwWWwWW.", "W.WWwWWW.W", "W.wWWWwW.W", "..WWwWWW..", "..WwWWwW..", "..WW..WW..", "..Ww..wW..", "..KK..KK.."],
    ["...WWWW...", "..WwWWwW..", "..WEwWEW..", "..wWWWWw..", "...WwWW...", ".WWwWWwWWWW", "..WWwWWW...", "..wWWWwW...", "..WWwWWW..", "..WwWWwW..", "..WW...WW.", ".Ww....wW.", ".KK....KK."]] },
  yeti: { pal: { W: "#f4f8fc", w: "#c9d6e3", B: "#7ab0e0", E: "#1a1a1a", M: "#c0392b" }, frames: [
    ["...WWWWW....", "..WWWWWWW...", ".WWBBBBBWW..", ".WWBEBBEBW..", ".WWBBMMBBW..", "WWWWWWWWWWW.", "WwWWWWWWWwW.", "Ww.WWWWW.wW.", "W..WwwwW..W.", "...WWWWW....", "...WW.WW....", "...WW.WW....", "..www.www..."],
    ["...WWWWW....", "..WWWWWWW...", ".WWBBBBBWW..", ".WWBEBBEBW..", ".WWBBMMBBW..", "WWWWWWWWWWW.", "WwWWWWWWWwW.", "Ww.WWWWW.wW.", "W..WwwwW..W.", "...WWWWW....", "..WW...WW...", "..WW...WW...", ".www...www.."]] },
  harpy: { pal: { F: "#c97a3a", f: "#8a4a1c", S: "#f1c7a0", E: "#1a1a1a", Y: "#ffd34d", H: "#5a2a1a" }, fly: true, frames: [
    ["F...........F", "FF...HHH...FF", "FFF.HSES..FFF", "FfFFHSSSFFfF.", ".FfFFSSSFFfF.", "..FF.FFF.FF..", ".....FfF.....", ".....Y.Y....."],
    [".....HHH.....", "....HSES.....", "....HSSS.....", ".FFFFSSSFFFF.", "FfFFFFFFFFfFF", "Ff..FFFFF..fF", "F....FfF....F", ".....Y.Y....."]] },
  fireelem: { pal: { R: "#e2552b", O: "#ff9a3a", Y: "#ffe27a", W: "#ffffff" }, fly: true, frames: [
    [".....Y.....", "....YOY....", "...YOROY...", "..YORRROY..", ".YORWRWROY.", ".OORRRRROO.", "..ORRRRRO..", "...ORRRO...", "....ORO....", ".....O....."],
    ["....Y.Y....", "...YOYOY...", "...YOROY...", "..YORRROY..", ".YORWRWROY.", ".OORRRRROO.", "..ORRRRRO..", "..OORRROO..", "...O.O.O...", "..........."]] },
  crab: { pal: { R: "#d94a4a", r: "#a8322a", W: "#ffffff", E: "#1a1a1a" }, frames: [
    [".RR.......RR.", "RRrR.....RrRR", ".RR..W.W..RR.", "..R..E.E..R..", "..RRRRRRRRR..", ".RRRRRRRRRRR.", "R.rR.r.r.Rr.R", "..r..r.r..r.."],
    ["RR.........RR", "RrR.......RrR", ".RR..W.W..RR.", "..R..E.E..R..", "..RRRRRRRRR..", ".RRRRRRRRRRR.", ".r.Rr.r.rR.r.", "r...r...r...r"]] },
  treant: { pal: { G: "#4f9a3a", g: "#2f6a2a", B: "#7a5233", b: "#4a3020", E: "#ffe27a" }, frames: [
    ["...GG.GG....", "..GGGgGGG...", ".GGgGGGgGG..", "..GGGGGGG...", "...BBBBB....", "..BEBBEBB...", "..BBBBBBB...", "B.BBbbBBB.B.", ".BBBBBBBBBB.", "...BBBBB....", "...BBbBB....", "..BB...BB...", ".bB.....Bb.."],
    ["..GG.GG.....", ".GGGgGGGG...", "GGgGGGgGGG..", ".GGGGGGGG...", "...BBBBB....", "..BEBBEBB...", "B.BBBBBBB.B.", ".BBBbbBBBB..", "...BBBBBB...", "...BBBBB....", "...BBbBB....", "...BB.BB....", "..bB...Bb..."]] },
  drake: { pal: { G: "#5a8a6a", g: "#3a6a4a", W: "#8ab89a", Y: "#ffd34d", r: "#e2552b" }, fly: true, frames: [
    ["......g.......", ".....gWg......", "....gWWWg.....", "GG..WWWWWW....", "GYGGGGGGGGG...", "GGGGGGGGGGGGG.", ".rr.GGGGG...GG", "....G...G.....", "....gg..gg...."],
    ["..............", "..............", "..............", "GG............", "GYGGGGGGGGG...", "GGGGWWWWWWGGG.", ".rr.gWWWWg..GG", "....GgWgG.....", "....gg..gg...."]] },
  eye: { pal: { P: "#8a4ab8", p: "#5a2a8a", W: "#f4f0e8", B: "#d94a4a", K: "#1a1a1a" }, fly: true, frames: [
    ["..p.p.p.p..", "...P.P.P...", "..PPPPPPP..", ".PPWWWWWPP.", "PPWWBBBWWPP", "PPWBKKBBWPP", "PPWWBBBWWPP", ".PPWWWWWPP.", "..PPPPPPP..", "..p..p..p..", ".p..p..p..."],
    [".p.p.p.p...", "..P.P.P....", "..PPPPPPP..", ".PPWWWWWPP.", "PPWWBBBWWPP", "PPWKKBBBWPP", "PPWWBBBWWPP", ".PPWWWWWPP.", "..PPPPPPP..", "...p..p..p.", "....p..p..p"]] },
  darkknight: { pal: { K: "#2a2638", k: "#14121f", R: "#c0392b", W: "#9aa3ad", B: "#4a4560", G: "#6b4a2b" }, frames: [
    ["....RR......", "...KKKK.....", "..KKKKKK....", "..KkRkRK....", "..KKKKKK....", "...KKKK...W.", ".BKKKKKKB.W.", "B.KBKKBK.BW.", "B.KKKKKK.BB.", "..KKKKKK..G.", "..KK..KK....", "..KK..KK....", ".kKK..KKk..."],
    ["....RR......", "...KKKK.....", "..KKKKKK....", "..KkRkRK....", "..KKKKKK....", "...KKKK.....", ".BKKKKKKBWWW", "B.KBKKBK.BG.", "B.KKKKKK....", "..KKKKKK....", "..KK...KK...", ".KK.....KK..", ".kK.....Kk.."]] },
};

Object.assign(MONSTER_ART, MONSTER_ART_2);
// Dessinés tournés vers la gauche par erreur : on les retourne pour qu'ils fassent face au héros.
for (const k of ["drake", "eye"]) {
  const a = MONSTER_ART[k], w = Math.max(...a.frames.flat().map((r) => r.length));
  a.frames = a.frames.map((f) => f.map((r) => r.padEnd(w, ".").split("").reverse().join("")));
}
// Toutes les images d'un monstre à la même largeur : le corps ne bouge pas pendant l'animation.
for (const k in MONSTER_ART) {
  const a = MONSTER_ART[k], w = Math.max(...a.frames.flat().map((r) => r.length));
  a.frames = a.frames.map((f) => f.map((r) => r.padEnd(w, ".")));
}

// Icônes d'objets (8×8). M = matière de l'objet, R = couleur de rareté,
// X = contour, K = bois / poignée, W = reflet. Clé = ITEM_BASES[...].icon.
export const ICON_ART = {
  sword:    ["......MW", ".....MW.", "....MW..", "...MW...", "R.MW....", ".RR.....", ".KR.....", "K..R...."],
  axe:      ["..MMM...", ".MMMMW..", ".MMMMMK.", "..MMK...", "....K...", "...K....", "..K.....", ".K......"],
  dagger:   ["........", "......W.", ".....MW.", "....MW..", "...MW...", "..RR....", ".KR.....", "K......."],
  mace:     ["...MRM..", "..MMMMM.", "..RMMMR.", "...MMM..", "....K...", "...K....", "..K.....", ".K......"],
  spear:    [".......W", "......MW", ".....MM.", "....RK..", "...K....", "..K.....", ".K......", "K......."],
  katana:   [".......W", "......MW", ".....MW.", "....MW..", "...MW...", "..RR....", ".KK.....", "K......."],
  hammer:   ["..MMMMM.", "..MMWMM.", "..MMRMM.", "....K...", "...K....", "..K.....", ".K......", "K......."],
  scythe:   ["MMMMMW..", ".....MK.", ".......K", "......K.", ".....K..", "....R...", "...K....", "..K....."],
  staff:    [".....RR.", "....RWRR", ".....RM.", "....M...", "...M....", "..M.....", ".M......", "M......."],
  bow:      ["..MM....", "..M.W...", "...M.W..", "....MRW.", "....MRW.", "...M.W..", "..M.W...", "..MM...."],
  helm:     ["..XXXX..", ".XMMMMX.", "XMMWMMMX", "XMXXXXMX", "XM....MX", "XR....RX", ".X....X.", "........"],
  greathelm:[".XXXXXX.", "XMMWMMMX", "XMMMMMMX", "XMXXXXMX", "XMMMMMMX", "XMMRRMMX", ".XMMMMX.", "..XXXX.."],
  hood:     ["...XX...", "..XMMX..", ".XMMMMX.", "XMM..MMX", "XM....MX", "XM....MX", "XRM..MRX", ".XX..XX."],
  band:     ["........", "........", "XXXXXXXX", "XMMRMMMX", "XXXXXXXX", "......XM", "......XM", "........"],
  crown:    ["........", "R..R..R.", "XMXRXMX.", "XMMMMMMX", "XMRMMRMX", "XMMMMMMX", ".XXXXXX.", "........"],
  hat:      ["....XX..", "...XMX..", "..XMMX..", "..XMMMX.", "..XRRRX.", "XXMMMMXX", "XMMMMMMX", ".XXXXXX."],
  horned:   ["W......W", "XW....WX", ".XXXXXX.", "XMMWMMMX", "XMXXXXMX", "XM....MX", "XR....RX", ".X....X."],
  mask:     ["........", ".XXXXXX.", "XMMMMMMX", "XM.MM.MX", "XMMMMMMX", ".XMRRMX.", "..XMMX..", "...XX..."],
  plate:    ["XX....XX", "XMXXXXMX", "XMMWMMMX", ".XMMMMX.", ".XMRRMX.", ".XMMMMX.", ".XMMMMX.", ".XXXXXX."],
  mail:     ["XX....XX", "XMXXXXMX", "XMWMWMMX", ".XMWMWX.", ".XWMWMX.", ".XRRRRX.", ".XMWMWX.", ".XXXXXX."],
  tunic:    ["XX....XX", "XMX..XMX", "XMMXXMMX", ".XMMMMX.", ".XRRRRX.", ".XMMMMX.", ".XMMMMX.", ".XXXXXX."],
  robe:     ["XX....XX", "XMXXXXMX", "XMMRMMMX", ".XMRMMX.", ".XMRMMX.", "XMMRMMMX", "XMMRMMMX", "XXXXXXXX"],
  glove:    ["...XX...", "..XMMX.X", ".XMMMXMX", ".XMMMMMX", ".XMMMMX.", ".XRRRRX.", ".XMMMMX.", "..XXXX.."],
  gauntlet: [".XX.XX..", "XMMXMMX.", "XMWMMMMX", "XMMMMMMX", ".XMMMMMX", ".XRRRRX.", ".XMMMMX.", ".XXXXXX."],
  boots:    ["........", ".XXX....", ".XMX....", ".XMX....", ".XMX....", ".XMRXX..", ".XMMMMX.", ".XXXXXX."],
  sandals:  ["........", "........", "........", ".X.X....", ".XRXX...", ".XMMMXX.", "XMMMMMMX", "XXXXXXXX"],
  greaves:  [".XXX....", ".XMX....", ".XWX....", ".XRX....", ".XMX....", ".XMMXX..", ".XMMMMX.", ".XXXXXX."],
  ring:     ["...RR...", "..RWWR..", "...RR...", "..XXXX..", ".XM..MX.", ".XM..MX.", "..XMMX..", "...XX..."],
  signet:   ["..XXXX..", ".XMRRMX.", ".XMRRMX.", "..XMMX..", ".X....X.", ".XM..MX.", "..XMMX..", "...XX..."],
  amulet:   ["X......X", ".X....X.", "..X..X..", "...XX...", "..XMMX..", ".XMRRMX.", ".XMRWMX.", "..XMMX.."],
  talisman: [".X....X.", "..X..X..", "...XX...", "..XRRX..", ".XRWWRX.", ".XRMMRX.", "..XRRX..", "...XX..."],
  medal:    [".X....X.", "..X..X..", "...XX...", ".XXXXXX.", ".XMRRMX.", ".XRWMRX.", ".XMRRMX.", ".XXXXXX."],
};
/** Icône par défaut d'un emplacement (anciens objets sans type). */
export const SLOT_ICON = { weapon: "sword", helm: "helm", armor: "plate", gloves: "glove", boots: "boots", ring: "ring", amulet: "amulet" };

// Familiers (dessinés tournés vers la droite : ils suivent le héros).
export const PET_ART = {
  cat: { pal: { O: "#e8964a", W: "#fff2e0", E: "#1a1a1a", P: "#ff9ab0" }, frames: [
    ["......O.O", "......OOO", "O.....OEO", "O.OOOOOOP", ".OOOOOOO.", ".OOOWOOO.", ".O.O.O.O."],
    ["......O.O", "......OOO", ".O....OEO", "O.OOOOOOP", ".OOOOOOO.", ".OOOWOOO.", "O..O.O..O"]] },
  fox: { pal: { R: "#d9692b", W: "#ffffff", E: "#1a1a1a", K: "#2a1a1a" }, frames: [
    ["......R.R", "......RRR", "WR....REW", "RRRRRRRRK", ".RRRRRRW.", ".RRRRRR..", ".K.K.K.K."],
    ["......R.R", "......RRR", ".WR...REW", "RRRRRRRRK", ".RRRRRRW.", ".RRRRRR..", "K..K.K..K"]] },
  owl: { pal: { B: "#8a6a4a", W: "#e8dcc8", E: "#1a1a1a", Y: "#ffd34d" }, fly: true, frames: [
    [".B...B.", ".BBBBB.", "BWEBEWB", "BBWYWBB", "BWWWWWB", ".BWWWB.", "..Y.Y.."],
    ["B.....B", "BBBBBBB", ".WEBEW.", ".BWYWB.", ".WWWWW.", ".BWWWB.", "..Y.Y.."]] },
  dragon: { pal: { R: "#d94a4a", Y: "#ffd34d", E: "#1a1a1a", W: "#8a2a2a" }, fly: true, frames: [
    ["...W.....", "..WW..RR.", ".WWW.RRER", "WWWRRRRRY", "...RRRRR.", "..RR.R.R."],
    [".........", "......RR.", "...W.RRER", ".WWRRRRRY", "WWWRRRRR.", "..RR.R.R."]] },
  turtle: { pal: { G: "#5f9a4a", D: "#3a6a2a", S: "#c9a66b", E: "#1a1a1a" }, frames: [
    ["...DDDD...", "..DGDGDD..", ".DGDGDGDSS", ".DDDDDDDSE", "..S..S.SS."],
    ["...DDDD...", "..DGDGDD..", ".DGDGDGDSS", ".DDDDDDDSE", ".S..S..S.."]] },
  rabbit: { pal: { W: "#f4f0e8", P: "#ffb0c0", E: "#1a1a1a" }, frames: [
    [".....W.W.", ".....P.P.", "....WWWW.", "W..WWWWEW", "WWWWWWWWP", ".WWWWWWW.", ".W.W..W.."],
    [".....W.W.", ".....P.P.", "....WWWW.", "W.WWWWWEW", "WWWWWWWWP", "WWWWWWWW.", "W......W."]] },
  raven: { pal: { K: "#2a2638", B: "#4a4560", Y: "#ffd34d", E: "#ff4a4a" }, fly: true, frames: [
    ["K.......K", "KK.....KK", ".KKBBBKK.", "..KBEBY..", "...KKK...", "...K.K..."],
    [".........", "...BBB...", "KKKBEBYKK", "KK.KKK.KK", "K..K.K..K", "........."]] },
  golemling: { pal: { S: "#8a8f99", D: "#5c616b", E: "#7fd6ff" }, frames: [
    [".SSSSS.", "SSESESS", "SSSSSSS", "D.SSS.D", ".SS.SS.", ".DD.DD."],
    [".SSSSS.", "SSESESS", "SSSSSSS", ".DSSSD.", ".SS.SS.", "DD...DD"]] },
  salamander: { pal: { R: "#e2552b", O: "#ff9a3a", E: "#1a1a1a" }, frames: [
    ["......ROO", ".....RRRE", "RRORRORR.", ".RRRRRR..", ".O.O.O.O."],
    ["......ROO", ".....RRRE", ".RORRORR.", "RRRRRRR..", "O.O.O.O.."]] },
  phoenix: { pal: { R: "#e2552b", O: "#ff9a3a", Y: "#ffe27a" }, fly: true, frames: [
    ["Y.......Y", "OY.....YO", "ROY.Y.YOR", ".ROOOOOR.", "..RRYRR..", "...ROR...", "....R...."],
    [".........", "....Y....", "...YOY...", "YOOOOOOOY", "ORRRYRRRO", "...ROR...", "....R...."]] },
  fairy: { pal: { P: "#ff9ad8", W: "#dff3ff", S: "#f1c7a0", Y: "#ffe27a" }, fly: true, frames: [
    ["W.....W", "WW.Y.WW", "WWSSSWW", ".WPPPW.", "..PPP..", "..P.P.."],
    [".......", ".W.Y.W.", "WWSSSWW", "WWPPPWW", "..PPP..", "..P.P.."]] },
};
