// Traductions. Le texte source (français) sert de clé : t("Texte {n}", { n })
// renvoie la traduction dans la langue choisie, ou le texte source s'il n'est
// pas encore traduit.
//
// La langue est connue dès le chargement (copie dans localStorage), car des
// textes sont construits à l'import des modules. Changer de langue recharge
// l'affichage ; les données du jeu (monstres, talents…) sont traduites une
// fois, en place, au démarrage (voir data.js de ce dossier).
import { DICTS } from "./dicts.js";

export const LANGS = [
  { id: "en", name: "English" },
  { id: "zh", name: "简体中文" },
  { id: "ru", name: "Русский" },
  { id: "es", name: "Español" },
  { id: "pt", name: "Português (Brasil)" },
  { id: "de", name: "Deutsch" },
  { id: "ja", name: "日本語" },
  { id: "fr", name: "Français" },
  { id: "pl", name: "Polski" },
  { id: "ko", name: "한국어" },
];
export const DEFAULT_LANG = "en";
const KEY = "sillwalker.lang";

const valid = (id) => LANGS.some((l) => l.id === id);
function stored() {
  try { return typeof localStorage !== "undefined" ? localStorage.getItem(KEY) : null; } catch { return null; }
}

let lang = DEFAULT_LANG, dict = {};
export const getLang = () => lang;
export function setLang(id) {
  lang = valid(id) ? id : DEFAULT_LANG;
  dict = lang === "fr" ? {} : DICTS[lang] || {};
  try { if (typeof localStorage !== "undefined") localStorage.setItem(KEY, lang); } catch { /* sans importance */ }
}
setLang(valid(stored()) ? stored() : DEFAULT_LANG);

const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m)) : s);
/** Texte traduit (source française en clé), avec remplacement des {variables}. */
export function t(src, vars) {
  if (src == null) return src;
  const s = lang === "fr" ? src : dict[src] != null ? dict[src] : src;
  return fill(s, vars);
}
/** Traduction d'un nom de donnée (sans variables). */
export const tr = (src) => (lang === "fr" || src == null ? src : dict[src] != null ? dict[src] : src);
