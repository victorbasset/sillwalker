// Mise en forme des nombres et du texte, selon la langue choisie.
import { PCT_STATS } from "./data.js";
import { getLang, t as tx } from "../i18n/index.js";

export const NB = " "; // espace fine insécable

// Séparateurs propres à chaque langue : décimale, et espace avant k / M / %.
const LOCALE = { fr: "fr-FR", en: "en-US", es: "es-ES", pt: "pt-BR", de: "de-DE", pl: "pl-PL", ru: "ru-RU", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR" };
const COMMA = new Set(["fr", "es", "pt", "de", "pl", "ru"]);
const SPACED = new Set(["fr", "es", "pt", "de", "pl", "ru"]);
const BIG = { fr: "Md", es: "mil M", pt: "B", de: "Mrd", pl: "mld", ru: "млрд" }; // milliard (en, zh, ja, ko : B)

export const dec = (s) => (COMMA.has(getLang()) ? s.replace(".", ",") : s);
export const unit = (u) => (SPACED.has(getLang()) ? NB : "") + u;

/** Grands nombres au-delà du millier de milliards (abréviations habituelles des jeux idle), puis notation scientifique. */
const HUGE = [[1e33, "Dc"], [1e30, "No"], [1e27, "Oc"], [1e24, "Sp"], [1e21, "Sx"], [1e18, "Qi"], [1e15, "Qa"], [1e12, "T"]];
const sci = (n) => { const e = Math.floor(Math.log10(n)); return dec((n / 10 ** e).toFixed(2)) + "e" + e; };

/** (it. 872) Paliers d'abréviation, du plus grand au plus petit (k compris). */
const steps = (L) => [...HUGE, [1e9, BIG[L] || "B"], [1e6, "M"], [1e3, "k"]];
/** (it. 872) Un arrondi qui atteint 1000 passe au palier supérieur : « 1,00 M » et non « 1000 k » (999 999 d'or),
    « 1,00 Md » et non « 1000,00 M ». Au-delà du dernier palier : notation scientifique. */
const bump = (L, i) => (i > 0 ? dec("1.00") + unit(steps(L)[i - 1][1]) : sci(1e36));

export function fmt(n) {
  n = Math.floor(n);
  const L = getLang();
  if (!Number.isFinite(n)) return "∞";
  if (n >= 1e36) return sci(n);
  const st = steps(L);
  for (let i = 0; i < st.length - 1; i++) {
    const [v, u] = st[i];
    if (n < v) continue;
    const s = (n / v).toFixed(2);
    return Number(s) >= 1000 ? bump(L, i) : dec(s) + unit(u);
  }
  if (n >= 1e4) { const r = Math.round(n / 1e3); return r >= 1000 ? bump(L, st.length - 1) : r + unit("k"); }
  return n.toLocaleString(LOCALE[L] || "en-US");
}

/** (it. 872) Entier complet avec le séparateur des milliers de la langue (« 24 191 », « 24,191 »). */
export const fmtFull = (n) => Math.round(n).toLocaleString(LOCALE[getLang()] || "en-US");

/** Format court à 3 chiffres significatifs (mode mini) : 228 M, 1,23 Md, 45,6 k. */
export function fmtShort(n) {
  n = Math.floor(n);
  const L = getLang();
  if (!Number.isFinite(n)) return "∞";
  if (n >= 1e36) return sci(n);
  const st = steps(L);
  for (let i = 0; i < st.length; i++) {
    const [v, u] = st[i];
    if (n < v) continue;
    const x = n / v;
    if (x >= 99.95 && Math.round(x) >= 1000) return bump(L, i);
    return dec(x >= 99.95 ? String(Math.round(x)) : x.toFixed(x >= 9.995 ? 1 : 2)) + unit(u);
  }
  return String(n);
}

/** Liste « a, b et c » dans la langue choisie. */
export const listJoin = (arr) => { try { return new Intl.ListFormat(LOCALE[getLang()] || "en-US", { type: "conjunction" }).format(arr); } catch { return arr.join(", "); } };

/** Pourcentage : « 12,5 % » en français, « 12.5% » en anglais. */
/** Unités de durée traduites (« 3 h », « 12 min », « 40 s » ; ч / мин / с en russe…). */
export const uH = (n) => tx("{0} h", { 0: n }), uMin = (n) => tx("{0} min", { 0: n }), uS = (n) => tx("{0} s", { 0: n });
/** Durée lisible : « 40 s », « 12 min », « 3 h 5 min ». */
export const durText = (sec) => {
  sec = Math.max(0, Math.round(sec || 0));
  if (sec < 60) return uS(sec);
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
  // (it. 844) « 8 h » plutôt que « 8 h 0 min » (absence au plafond, chaque matin)
  return h ? (m ? uH(h) + " " + uMin(m) : uH(h)) : uMin(m);
};
export const pct = (v) => dec(String(Math.round(v * 10) / 10)) + unit("%");

export function fmtStat(k, v) {
  return PCT_STATS[k] ? pct(v) : Math.round(v).toString();
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
