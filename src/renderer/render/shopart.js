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
};

const cache = {};
/** URL (data:) de l'icône `id`, en grand (scale px par pixel). */
export function shopIconURL(id, scale = 5) {
  const k = id + "@" + scale;
  if (!cache[k]) {
    const d = SHOP_ICON_DEFS[id] || SHOP_ICON_DEFS.potion;
    cache[k] = buildSprite(d[0], { K: OUT, ...d[1] }, scale, false, 1).toDataURL();
  }
  return cache[k];
}
