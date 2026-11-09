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

const cache = {};
/** URL (data:) de l'icône d'un nœud : `key` = type d'effet (ou « root »). Repli : étoile de l'origine. */
export function skillIconURL(key, scale = 3) {
  const k = (ICONS[key] ? key : "root") + "@" + scale;
  if (!cache[k]) {
    const [rows, accent] = ICONS[k.split("@")[0]];
    cache[k] = buildSprite(rows, { W, Y: accent }, scale, false, 1).toDataURL();
  }
  return cache[k];
}

/** Clé d'icône d'un nœud de l'arbre : l'origine, sinon l'effet principal du nœud. */
export const skillIconKey = (n) => (n.kind === "root" ? "root" : Object.keys(n.eff || {})[0] || "root");
export const SKILL_ICON_KEYS = Object.keys(ICONS);
