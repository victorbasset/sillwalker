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

let lang = DEFAULT_LANG, dict = {}, fallback = {};
export const getLang = () => lang;
export function setLang(id) {
  lang = valid(id) ? id : DEFAULT_LANG;
  dict = lang === "fr" ? {} : DICTS[lang] || {};
  fallback = lang === "fr" ? {} : DICTS.en || {}; // texte pas encore traduit : anglais plutôt que français
  try { if (typeof localStorage !== "undefined") localStorage.setItem(KEY, lang); } catch { /* sans importance */ }
}
/** Langue du système (partie neuve) : première langue préférée connue (« fr-FR » → fr, « pt-BR » → pt…), sinon anglais. */
export function systemLang(list = (typeof navigator !== "undefined" && (navigator.languages || [navigator.language])) || []) {
  for (const l of list) { const id = String(l || "").toLowerCase().split(/[-_]/)[0]; if (valid(id)) return id; }
  return DEFAULT_LANG;
}
setLang(valid(stored()) ? stored() : DEFAULT_LANG);

const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m)) : s);
/** Texte traduit (source française en clé), avec remplacement des {variables}. */
export function t(src, vars) {
  if (src == null) return src;
  const s = lang === "fr" ? src : dict[src] != null ? dict[src] : fallback[src] != null ? fallback[src] : src;
  return fill(s, vars);
}
/** Traduction d'un nom de donnée (sans variables). */
export const tr = (src) => (lang === "fr" || src == null ? src : dict[src] != null ? dict[src] : fallback[src] != null ? fallback[src] : src);
/** Espace insécable française avant « : », « ! », « ? » (vide dans les autres langues). */
export const fsp = () => (lang === "fr" ? " " : "");
/**
 * Phrase au pluriel selon n, dans toutes les langues. La source française donne
 * « singulier|pluriel » ; chaque traduction donne ses formes séparées par « | » :
 * une seule (chinois, japonais, coréen), deux (singulier|pluriel) ou trois pour le russe
 * et le polonais (one|few|many, règles Intl.PluralRules). {n} est remplacé par n.
 */
let rules = null, rulesLang = null;
export function txn(n, src, vars) {
  const forms = t(src, { n, ...vars }).split("|");
  if (forms.length < 2) return forms[0];
  if (rulesLang !== lang) { try { rules = new Intl.PluralRules(lang); } catch { rules = null; } rulesLang = lang; }
  const cat = rules ? rules.select(n) : n === 1 ? "one" : "other";
  if (forms.length === 2) return forms[cat === "one" ? 0 : 1];
  return forms[cat === "one" ? 0 : cat === "few" ? 1 : 2];
}
/** Marque du pluriel « s » : au-delà de 1 en français, sauf pour 1 en anglais (« 0 quests »). */
export const plS = (n) => ((lang === "fr" ? n > 1 : n !== 1) ? "s" : "");
/** Nom commun en minuscules dans une phrase, sauf en allemand (les noms y prennent une majuscule). */
export const lc = (s) => (s == null || lang === "de" ? s : s.toLowerCase());
