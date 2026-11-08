// Mise en forme des nombres et du texte, selon la langue choisie.
import { PCT_STATS } from "./data.js";
import { getLang } from "../i18n/index.js";

export const NB = " "; // espace fine insécable

// Séparateurs propres à chaque langue : décimale, et espace avant k / M / %.
const LOCALE = { fr: "fr-FR", en: "en-US", es: "es-ES", pt: "pt-BR", de: "de-DE", pl: "pl-PL", ru: "ru-RU", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR" };
const COMMA = new Set(["fr", "es", "pt", "de", "pl", "ru"]);
const SPACED = new Set(["fr", "es", "pt", "de", "pl", "ru"]);
const BIG = { fr: "Md", es: "mil M", pt: "B", de: "Mrd.", pl: "mld", ru: "млрд" }; // milliard (en, zh, ja, ko : B)

export const dec = (s) => (COMMA.has(getLang()) ? s.replace(".", ",") : s);
export const unit = (u) => (SPACED.has(getLang()) ? NB : "") + u;

export function fmt(n) {
  n = Math.floor(n);
  const L = getLang();
  if (n >= 1e12) return dec((n / 1e12).toFixed(2)) + unit("T");
  if (n >= 1e9) return dec((n / 1e9).toFixed(2)) + unit(BIG[L] || "B");
  if (n >= 1e6) return dec((n / 1e6).toFixed(2)) + unit("M");
  if (n >= 1e4) return Math.round(n / 1e3) + unit("k");
  return n.toLocaleString(LOCALE[L] || "en-US");
}

/** Pourcentage : « 12,5 % » en français, « 12.5% » en anglais. */
export const pct = (v) => dec(String(Math.round(v * 10) / 10)) + unit("%");

export function fmtStat(k, v) {
  return PCT_STATS[k] ? pct(v) : Math.round(v).toString();
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
