// Icônes de l'arbre des compétences (demande 34 de Victor) : une icône pixel art par type d'effet, dessinée dans
// chaque nœud du graphe. Formes claires (W) et une couleur d'accent (Y) propre à l'effet ; le contour sombre est
// ajouté par buildSprite : lisibles sur n'importe quelle couleur de secteur.
import { buildSprite } from "./sprites.js";

const W = "#f4f0e8";
// [lignes 7×7, couleur d'accent]
const ICONS = {
  atkPct: [["......W", ".....W.", "....W..", "Y..W...", ".YW....", ".WY....", "W..Y..."], "#ffd34d"],
  critDmg: [["...WWW.", "..WW...", ".WWWW..", "...WW..", "..WW...", ".WW....", "W......"], "#ffd34d"],
  bossDmg: [["Y.....Y", "YW...WY", ".WWWWW.", "WW.W.WW", "WWWWWWW", ".W.W.W.", "......."], "#ff6b5a"],
  spd: [["W..W...", ".W..W..", "..W..W.", "...W..W", "..W..W.", ".W..W..", "W..W..."], "#7fd6ff"],
  crit: [["..WWW..", ".W...W.", "W..Y..W", "W.YYY.W", "W..Y..W", ".W...W.", "..WWW.."], "#ff6b5a"],
  dodge: [["..WWW..", ".W...W.", "W.....W", "W...W.W", "W..WWW.", "....W..", "......."], "#7fd6ff"],
  burn: [["...W...", "..WW...", "..WYW..", ".WYYW.W", ".WYYYWW", "WYYYYYW", ".WWWWW."], "#ff8a3a"],
  execute: [[".WWW...", "WWWWW..", "WWW.W..", "....W..", ".....W.", "......W", "......."], "#ff6b5a"],
  poison: [["...W...", "..WWW..", ".WWYWW.", ".WYYYW.", "WWYYYWW", ".WYYYW.", "..WWW.."], "#7dff9a"],
  minion: [[".WWWWW.", "WWWWWWW", "WYWWWYW", "WWW.WWW", ".WWWWW.", ".W.W.W.", "......."], "#b36bff"],
  hpPct: [[".YY.YY.", "YWYYYYY", "YYYYYYY", "YYYYYYY", ".YYYYY.", "..YYY..", "...Y..."], "#e2394a"],
  defPct: [["WWWWWWW", "W.WYW.W", "W.WYW.W", "WYYYYYW", ".W.Y.W.", "..WYW..", "...W..."], "#6aa8ff"],
  regen: [["..WWW..", "..WYW..", "WWWYWWW", "WYYYYYW", "WWWYWWW", "..WYW..", "..WWW.."], "#7dff9a"],
  gold: [["..WWW..", ".WYYYW.", "WYYWYYW", "WYWWWYW", "WYYWYYW", ".WYYYW.", "..WWW.."], "#ffd34d"],
  xp: [["...Y...", "...Y...", ".Y.W.Y.", "..WWW..", "YWWWWWY", "..WWW..", ".Y...Y."], "#bde0ff"],
  drop: [[".WWWWW.", "WYWYWYW", "WWYWYWW", ".WWYWW.", "..WYW..", "...W...", "......."], "#5fd36f"],
  offline: [["..WWW..", ".WW....", "WW...Y.", "WW.....", "WW..Y..", ".WW....", "..WWW.."], "#ffe27a"],
  riposte: [["W.....W", ".W...W.", "..W.W..", "...W...", "..W.W..", "YW...WY", "Y.....Y"], "#ffd34d"],
  lifesteal: [["W.....W", "WW...WW", "WWW.WWW", "WWWWWWW", ".WWWWW.", "..W.W..", "..Y.Y.."], "#e2394a"],
  firstStrike: [["...W...", "...WW..", "WWWWWW.", "WWWWWWW", "WWWWWW.", "...WW..", "...W..."], "#ffd34d"],
  combo: [["W.W.W..", ".W.W.W.", "..W.W.W", ".......", "Y.Y.Y..", ".Y.Y.Y.", "..Y.Y.Y"], "#ffd34d"],
  doubleShot: [["....W..", "WWWWWW.", "....W..", ".......", "....Y..", "YYYYYY.", "....Y.."], "#ffd34d"],
  shield: [["..WWW..", ".W...W.", "W.....W", "W..Y..W", "W.....W", ".W...W.", "..WWW.."], "#6aa8ff"],
  thorns: [["W..W..W", ".W.W.W.", "..WYW..", "WWYYYWW", "..WYW..", ".W.W.W.", "W..W..W"], "#5fd36f"],
  secondWind: [["W......", "WW.....", "WYW....", "WYYW...", "WWYYW..", ".WWWYW.", "...WWWW"], "#bde0ff"],
  root: [["...Y...", "...Y...", "..YWY..", "YYWWWYY", ".YYWYY.", ".YY.YY.", "Y.....Y"], "#ffd34d"],
};

// Nœuds remarquables et clés de voûte : un dessin unique chacun (9×9), clé = identifiant du nœud (skilltree.js).
// [lignes, palette]
const UNIQUE = {
  // Force
  "force-a0-5": [[".SSSSS...", "SSWSWSS..", "SSSSSSSS.", "SSSSSSSS.", ".SSSSSSS.", "..SSSSS..", "..YYYYY..", "..YYYYY..", "..YYYYY.."], { S: "#f0b48a", W: "#ffe0c8", Y: "#c0392b" }], // Bras de titan
  "force-a0-9": [["........Y", "..WWWWWY.", ".WWWWWYW.", ".WDDWYDW.", ".WDDYDDW.", ".WWYWWWW.", "..YDWDW..", ".Y.WWW...", "Y........"], { W: "#e8e4d6", D: "#14121f", Y: "#e2394a" }], // Coup fatal
  "force-a1-5": [["....W....", "....W....", "Y..YWY..Y", "YY.YWY.YY", "YYYYWYYYY", "YRYYWYYRY", "YYYYWYYYY", "...DWD...", "....D...."], { W: "#dfe7ef", Y: "#ffd34d", R: "#e2394a", D: "#8a5a2b" }], // Tueur de géants
  "force-a1-9": [["WW.....WW", "WWW...WWW", ".WWD.DWW.", "...DDD...", "....D....", "...D.D...", "..D...D..", ".D.....D.", "D.......D"], { W: "#dfe7ef", D: "#8a5a2b" }], // Massacre
  "force-key": [["W.......W", "WW.....WW", ".WMMMMMW.", ".MMMMMMM.", "MMRMMMRMM", "MMMMMMMMM", "MM.MMM.MM", ".M.....M.", "........."], { W: "#f4ecd8", M: "#8a93a0", R: "#ff3a3a" }], // Brute
  // Agilité
  "agility-a0-5": [[".........", "W..WWWW..", "..WWGGWW.", "WWWGDDGWW", "..WWGGWW.", "W..WWWW..", "........."], { W: "#f4f0e8", G: "#5fd36f", D: "#14121f" }], // Réflexes
  "agility-a0-9": [["..RRRRR..", ".RWWWWWR.", "RWRRRRRWR", "RWRWWWRWR", "RWRWYWRWR", "RWRWWWRWR", "RWRRRRRWR", ".RWWWWWR.", "..RRRRR.."], { R: "#e2394a", W: "#f4f0e8", Y: "#ffd34d" }], // Précision mortelle
  "agility-a1-5": [["..WWWW...", ".W....W..", "......W..", "WWWWWW...", ".........", "WWWWWWWW.", "........W", "..B....W.", ".B.BWWW.."], { W: "#e3ebf3", B: "#7fd6ff" }], // Vent du nord
  "agility-a1-9": [["W.......W", ".W.....W.", "..W...W..", "..W...W..", "...W.W...", "....Y....", "...W.W...", "..D...D..", ".D.....D."], { W: "#dfe7ef", Y: "#ffe27a", D: "#c0392b" }], // Danse des lames
  "agility-key": [["..WWWWW..", ".W.....W.", "W..WWW..W", "W.W...W.W", "W.W.Y.W.W", "W.W..WW.W", "W..W....W", ".W..WWWW.", "..W......"], { W: "#e3ebf3", Y: "#5fd36f" }], // Tempête de lames
  // Arcanes
  "arcane-a0-5": [["......Y..", "....YY.Y.", "...YRRY..", "..YRRRRY.", ".YRRWRRY.", ".YRWWWRY.", ".YRRWRRY.", "..YRRRY..", "...YYY..."], { R: "#ff8a3a", Y: "#ffd34d", W: "#fff6c8" }], // Pyromancie
  "arcane-a0-9": [["...DDD...", "...WGW...", "..WGGGW..", ".WGGGGGW.", ".WGDGDGW.", ".WGGWGGW.", ".WGGGGGW.", "..WWWWW.."], { D: "#5a3a2a", W: "#c9ced6", G: "#3a8a2a" }], // Venin noir
  "arcane-a1-5": [["...WWW...", "..WWWWW..", "..WDWDW..", "..WWWWW..", "...WWW...", "..W.W.W..", ".........", ".PPPPPPP.", "P.P.P.P.P"], { W: "#e8e4ff", D: "#14121f", P: "#b36bff" }], // Invocation
  "arcane-a1-9": [[".WWWWW...", "W....WW..", "......WD.", ".....D...", "....D....", "...D.....", "..D......", ".D.......", "D........"], { W: "#c9ced6", D: "#6a4a2a" }], // Coup de grâce
  "arcane-key": [["..O.O.O..", ".OYOYOYO.", ".HHH.HHH.", "HHWHHHHHH", "HHHHHHHHH", ".HHHHHHH.", "..HHHHH..", "...HHH...", "....H...."], { O: "#ff8a3a", Y: "#ffd34d", H: "#e2394a", W: "#ffd0d0" }], // Flamme intérieure
  // Vitalité
  "vitality-a0-5": [[".MM...MM.", "MMMM.MMMM", "MWMMMMMMM", "MMMRRRMMM", "MMMRRRMMM", ".MMMMMMM.", "..MMMMM..", "...MMM...", "....M...."], { M: "#a9b6c6", W: "#ffffff", R: "#e2394a" }], // Constitution de fer
  "vitality-a0-9": [["..GGGGG..", ".GgGGGgG.", "GGGgGgGGG", "GgGGgGGgG", "GGgGGGgGG", ".GGGGGGG.", "S.S...S.S"], { G: "#5f9a4f", g: "#2f5a2f", S: "#c8a67a" }], // Carapace
  "vitality-a1-5": [["O...R...O", ".O.RRR.O.", "..RRRRR..", ".RRWRRRR.", ".RWRRRRR.", ".RRRRRRR.", "..RRRRR..", "...RRR..."], { R: "#c0392b", W: "#ff9a8a", O: "#ff8a3a" }], // Sang chaud
  "vitality-a1-9": [["T......GG", ".....TG..", "....GG...", "..TG..T..", "..G......", ".GG.T....", "G........", "G.T......"], { G: "#3f8f4a", T: "#e8e4d6" }], // Ronces
  "vitality-key": [["..MMMMM..", ".MMMMMMM.", "MMYMMMYMM", "MMMMMMMMM", "MM.MMM.MM", "MMMMMMMMM", ".MDDDDDM.", ".MMMMMMM.", "MM.....MM"], { M: "#8a8070", Y: "#7fd6ff", D: "#2a2420" }], // Colosse
  // Fortune
  "fortune-a0-5": [["...DDD...", "....D....", "..YYYYY..", ".YYYDYYY.", "YYYDDDYYY", "YYYYDYYYY", "YYYDDDYYY", ".YYYDYYY.", "..YYYYY.."], { Y: "#c89a4a", D: "#ffd34d" }], // Trésorier
  "fortune-a0-9": [[".WWW.WWW.", "WWLLWLLWW", "WWWWWWWWW", "WWLLWLLWW", "WWWWWWWWW", "WWLLWLLWW", "BBBBBBBBB"], { W: "#f4ecd8", L: "#8a86a8", B: "#8a3a2a" }], // Érudit
  "fortune-a1-5": [["..BBBBB..", ".BBBBBBB.", "BYYYYYYYB", "BBBBYBBBB", "BBBYYYBBB", "BBBBBBBBB", "BBBBBBBBB", "BYYYYYYYB"], { B: "#a8703a", Y: "#ffd34d" }], // Chasseur de trésors
  "fortune-a1-9": [["..WW...ZZ", ".WW.....Z", "WW.....Z.", "WW....ZZ.", "WW.......", "WW.......", ".WW......", "..WWW...."], { W: "#f4f0c8", Z: "#bde0ff" }], // Rêveur
  "fortune-key": [["..Y.Y.Y..", "..Y.Y.Y.Y", "..YYYYY.Y", "..YYYYYYY", "Y.YYYYYY.", "YYYYYYYY.", ".YYYYYY..", "..YYYY...", "..YYYY..."], { Y: "#ffd34d" }], // Midas
  // Maîtrise
  "mastery-a0-5": [["W........", ".W.MMMMM.", "..WBBBBM.", ".MBWBBBM.", ".MBBWBBM.", ".MBBBWBM.", "..MBBBWM.", "...MMM.W.", "........W"], { W: "#f4f0e8", M: "#a9b6c6", B: "#3a6ab8" }], // Contre-attaque
  "mastery-a0-9": [[".....YYY.", "....YYY..", "...YYY...", "..YYYYYY.", ".....YY..", "....YY...", "...YY....", "..YY.....", ".Y......."], { Y: "#ffe27a" }], // Première frappe
  "mastery-a1-5": [["...WWWWWW", "...W....W", "...W....W", "...W....W", ".YYW..YYW", "YYYW.YYYW", "YYY..YYY."], { W: "#f4f0e8", Y: "#ffd34d" }], // Rythme
  "mastery-a1-9": [["W..W.W..W", "WW.WWW.WW", "WWWWWWWWW", "WWWRWRWWW", ".WWWWWWW.", "..W.W.W.."], { W: "#6a4a8a", R: "#ff3a3a" }], // Vampirisme
  "mastery-key": [["...YYY...", "..Y...Y..", "..Y...Y..", "...YYY...", "YYYYYYYYY", "....Y....", "....Y....", "....Y....", "...YYY..."], { Y: "#ffe27a" }], // Immortel
};

const cache = {};
/** URL (data:) de l'icône d'un nœud : `key` = type d'effet (ou « root »). Repli : étoile de l'origine. */
export function skillIconURL(key, scale = 3) {
  const id = UNIQUE[key] || ICONS[key] ? key : "root", k = id + "@" + scale;
  if (!cache[k]) {
    if (UNIQUE[id]) cache[k] = buildSprite(UNIQUE[id][0], UNIQUE[id][1], scale, false, 1).toDataURL();
    else { const [rows, accent] = ICONS[id]; cache[k] = buildSprite(rows, { W, Y: accent }, scale, false, 1).toDataURL(); }
  }
  return cache[k];
}

/** Clé d'icône d'un nœud de l'arbre : l'origine, sinon l'effet principal du nœud. */
export const skillIconKey = (n) => (n.kind === "root" ? "root" : UNIQUE[n.id] ? n.id : Object.keys(n.eff || {})[0] || "root");
export const SKILL_ICON_KEYS = [...Object.keys(ICONS), ...Object.keys(UNIQUE)];
/** Nœuds qui ont un dessin unique (remarquables et clés de voûte). */
export const UNIQUE_SKILL_ICONS = Object.keys(UNIQUE);
