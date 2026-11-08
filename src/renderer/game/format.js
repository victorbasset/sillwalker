// Mise en forme des nombres et du texte (français).
import { PCT_STATS } from "./data.js";

export const NB = " "; // espace fine insécable

export function fmt(n) {
  n = Math.floor(n);
  if (n >= 1e6) return (n / 1e6).toFixed(2).replace(".", ",") + NB + "M";
  if (n >= 1e4) return Math.round(n / 1e3) + NB + "k";
  return n.toLocaleString("fr-FR");
}

export function fmtStat(k, v) {
  return PCT_STATS[k] ? (Math.round(v * 10) / 10).toString().replace(".", ",") + NB + "%" : Math.round(v).toString();
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
