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

// (it. 682) coréen : « X이(가) », « X을(를) », « X은(는) », « X과(와) » → la bonne particule selon la fin de X (consonne
// finale ou non) ; chiffre : selon sa lecture ; autre caractère (lettre latine, ponctuation) : double forme gardée
const KO_PAIRS = { "이(가)": ["이", "가"], "가(이)": ["이", "가"], "을(를)": ["을", "를"], "를(을)": ["을", "를"],
  "은(는)": ["은", "는"], "는(은)": ["은", "는"], "과(와)": ["과", "와"], "와(과)": ["과", "와"] };
const KO_DIGIT_FINAL = { 0: true, 1: true, 2: false, 3: true, 4: false, 5: false, 6: true, 7: true, 8: true, 9: false };
function koFinal(ch) {
  const c = ch.charCodeAt(0);
  if (c >= 0xac00 && c <= 0xd7a3) return (c - 0xac00) % 28 !== 0;
  if (ch in KO_DIGIT_FINAL) return KO_DIGIT_FINAL[ch];
  return null;
}
export function koJosa(s) {
  return s.replace(/(.)(이\(가\)|가\(이\)|을\(를\)|를\(을\)|은\(는\)|는\(은\)|과\(와\)|와\(과\))/gu, (m, ch, pair) => {
    const f = koFinal(ch);
    return f == null ? m : ch + KO_PAIRS[pair][f ? 0 : 1];
  });
}
const fill0 = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m)) : s);
const fill = (s, vars) => (lang === "ko" && vars ? koJosa(fill0(s, vars)) : fill0(s, vars));
// (it. 952) espace après un nombre (« 20,53 M »), devant un mot ou « % » : rendue insécable par t()
const NUM_SP = /(\d(?:\u00a0[\p{L}.]{1,4})?) (?=[\p{L}%])/gu;
/** Texte traduit (source française en clé), avec remplacement des {variables}. */
export function t(src, vars) {
  if (src == null) return src;
  const s = lang === "fr" ? src : dict[src] != null ? dict[src] : fallback[src] != null ? fallback[src] : src;
  const out = fill(s, vars);
  // (it. 950) « 40 % » : l'espace des textes traduits (« {0} % », ≈ 200 par langue) devient insécable, sinon le
  // signe passait seul en début de ligne ; (it. 952) de même entre un nombre (abrégé ou non : « 20,53 M ») et le mot
  // qui le suit (« +20,53 M / or. » se coupait dans le journal)
  return typeof out === "string" && out.includes(" ") ? out.replace(NUM_SP, "$1\u00a0") : out;
}
/** Traduction d'un nom de donnée (sans variables). */
export const tr = (src) => (lang === "fr" || src == null ? src : dict[src] != null ? dict[src] : fallback[src] != null ? fallback[src] : src);
/** Espace insécable française avant « : », « ! », « ? » (vide dans les autres langues). */
export const fsp = () => (lang === "fr" ? "\u00a0" : ""); // (it. 950) vraie insécable (c'était une espace ordinaire)
// (it. 668) séparateur de liste de la langue : « , » ; « 、 » en japonais, « ， » en chinois
export const csep = () => t(", ");
// (it. 671) point final de la langue : « 。 » en japonais et en chinois
export const cend = () => t(".");
// (it. 869) espace entre deux phrases ou après « : » : aucune en japonais et en chinois (« ボス：…。ボスの能力：… »)
export const wsp = () => (lang === "ja" || lang === "zh" ? "" : " ");
// (it. 869) « : » entre un libellé et sa valeur : « Zone 3 : » en français, « エリア 3： » en japonais et chinois, « Zone 3: » ailleurs
export const colon = () => (lang === "ja" || lang === "zh" ? "：" : fsp() + ": ");
// (it. 665, 673) russe : accorde un adjectif masculin (-ый, -ой, -ий) au genre g : "m", "f", "n" ou "p" (pluriel) ;
// renvoie null si ce n'est pas un adjectif d'un seul mot (« из драконьей кости »)
const RU_HARD = { f: "ая", n: "ое", p: "ые" }, RU_SOFT = { f: "яя", n: "ее", p: "ие" };
export function ruAgree(adj, g) {
  const m = /^([а-яё]+)(ый|ой|ий)$/i.exec(adj);
  if (!m) return null;
  if (g === "m" || !RU_HARD[g]) return adj;
  return m[1] + (m[2] === "ий" ? RU_SOFT[g] : RU_HARD[g]);
}
// (it. 674) polonais : même chose pour un adjectif masculin en -y / -i (pluriel non viril : -e / -ie)
export function plAgree(adj, g) {
  const m = /^([a-ząćęłńóśźż]+)(y|i)$/i.exec(adj);
  if (!m) return null;
  if (g === "m") return adj;
  if (g === "f") return m[1] + "a";
  return m[1] + (m[2] === "i" ? "ie" : "e");
}
/**
 * Phrase au pluriel selon n, dans toutes les langues. La source française donne
 * « singulier|pluriel » ; chaque traduction donne ses formes séparées par « | » :
 * une seule (chinois, japonais, coréen), deux (singulier|pluriel) ou trois pour le russe
 * et le polonais (one|few|many, règles Intl.PluralRules). {n} est remplacé par n.
 */
let rules = null, rulesLang = null;
// (it. 1002) U+202F (séparateur français, absent des polices pixel) -> espace insécable ordinaire
const groupInt = (n) => { try { return n.toLocaleString(lang).replace(/\u202f/g, "\u00a0"); } catch { return String(n); } };
export function txn(n, src, vars) {
  // (it. 871) {n} brut au-delà de 999 : séparateur des milliers de la langue (« 1 322 », « 1,322 »), comme fmt()
  const shown = Number.isInteger(n) && Math.abs(n) >= 1000 ? groupInt(n) : n;
  const forms = t(src, { n: shown, ...vars }).split("|");
  if (forms.length < 2) return forms[0];
  if (rulesLang !== lang) { try { rules = new Intl.PluralRules(lang); } catch { rules = null; } rulesLang = lang; }
  const cat = rules ? rules.select(n) : n === 1 ? "one" : "other";
  if (forms.length === 2) return forms[cat === "one" ? 0 : 1];
  return forms[cat === "one" ? 0 : cat === "few" ? 1 : 2];
}
/** Nom commun en minuscules dans une phrase, sauf en allemand (les noms y prennent une majuscule). */
export const lc = (s) => (s == null || lang === "de" ? s : s.toLowerCase());
