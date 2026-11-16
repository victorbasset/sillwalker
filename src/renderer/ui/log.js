// Journal (it. 1677, demande de Victor) : il quitte l'Aventure pour Statistiques > Journal ; liste partagée.
import { t as tx, getLang } from "../i18n/index.js";
import { esc } from "../game/format.js";
import { RARITIES, LEGENDARY } from "../game/data.js";

// Couleur d'une ligne du journal selon ce qu'elle raconte. (it. 1715) Les motifs étaient des expressions en français :
// dans les 9 autres langues, presque rien n'était coloré (anglais : 2 lignes sur 196, français : 13 sur 199). Ils viennent
// maintenant des messages traduits (le plus long morceau fixe de chaque modèle, sans les {0}) et des noms de rareté
// (traduits au démarrage) ; recalculés à chaque changement de langue.
const LOG_KEYS = [
  // (it. 1840) ordre = priorité : « sac plein » avant « légendaire » (le français y lit le nom de la rareté), événements
  // avant étapes (le russe « Открыто: » de « Débloqué » est contenu dans « Событие открыто: »)
  ["lg-bad", ["Ton héros est tombé. La progression de la zone repart à zéro.", "Trop dur : ton héros recule vers ", "Dernière potion de soin bue : passe à la boutique !", "K.O.", "Le légendaire de Poupouce est resté au sol : sac plein."], []],
  ["lg-leg", ["Nouveau pouvoir légendaire découvert : {0} !", "{0} vaincu : {1} or et un objet légendaire !"], [LEGENDARY]],
  ["lg-rare", ["Champion vaincu : {0} or et un butin épique !", "Coffre au trésor ! +{0} or", "Étoile filante attrapée ! +{0} or",
    "Étoile filante attrapée : +{0} or !", ": +{0} % de vitesse de déplacement, pour toujours (total +{1} %).", ": +{0} % de vitesse pour toujours ! (+{1} %)",
    "Plume du vent",
    // (it. 1836) événements : bilan de fin, découverte d'un nouvel événement ou d'une nouvelle sorte d'élite
    "{0} · bilan : {1}", "Événement découvert : {0} pour toujours ({1} / {2}).", "Nouvelle sorte d’élite vaincue : {0} ({1} / {2}), {3} pour toujours."], []],
  // (it. 1837) étapes de la partie : reliques, ascensions, héros libérés, déblocages, sorts, bénédictions, panoplies
  ["lg-mile", ["Relique obtenue : {0} ! {1}", "Relique renforcée : {0}, niveau {1} / {2} (effet +{3} %).",
    "Ascension n° {0} : {1} et {2}. Une nouvelle aventure commence{3} !", "Héros libéré : {0} ! Choisis-le dans l’onglet Héros pour ta prochaine ascension.",
    "Le Briseur d’Étoiles est vaincu ! Le ciel se rallume.", "Le Briseur d’Étoiles, vaincu une fois de plus.",
    "Nouvelle bénédiction vécue : {0} pour toujours ({1} / {2}).", "Panoplie complétée pour la première fois : {0} pour toujours.",
    "Débloqué : {0} !", "Guilde : tu deviens {0} ! Bonus permanent augmenté{1}.", "Talent ultime débloqué : ", "Nouveau sort appris : {0} !"], []],
  ["lg-epic", [], [3]],
  ["lg-good", ["Quête accomplie ! Récompense à réclamer.", "revient de {0} : +{1} or{2}{3} !", "L’œuf éclot : {0} !", "L’œuf éclot : encore un {0} ! Ton {1} gagne de l’expérience.", "Un œuf !"], []],
];
const lc = (s) => String(s).toLocaleLowerCase();
/** Plus long morceau fixe d'un modèle traduit (entre les {0}). */
const frag = (key) => lc(tx(key)).split(/\{[^}]*\}/).map((x) => x.trim()).sort((a, b) => b.length - a.length)[0] || "";
let cache = null, cacheLang = null;
function patterns() {
  if (cache && cacheLang === getLang()) return cache;
  cacheLang = getLang();
  cache = LOG_KEYS.map(([cls, keys, rarities]) => [cls, [...keys.map(frag), ...rarities.map((r) => lc(RARITIES[r]?.name || ""))].filter((f) => f.length >= 3)]);
  return cache;
}
const logClass = (l) => { const s = lc(l), m = patterns().find(([, fs]) => fs.some((f) => s.includes(f))); return m ? ` class="${m[0]}"` : ""; };

/** Lignes du journal (les plus récentes d'abord), colorées selon ce qu'elles racontent. (it. 1723) `important` : seulement
 *  les lignes colorées (butin, quêtes, coffres, K.O.…), les comptes rendus de routine écartés. */
/** (it. 1800) Heure d'une ligne : « 14:32 » aujourd'hui, « 15 nov. 14:32 » avant (format de la langue). */
// (it. 1801) formateurs gardés par langue : toLocaleTimeString en recréait deux par ligne (1,8 ms pour 40 lignes)
let fmtLang = null, fmtHM = null, fmtDay = null;
const lineTime = (t) => {
  if (!Number.isFinite(t)) return "";
  const lang = getLang();
  try {
    if (fmtLang !== lang) { fmtHM = new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit" }); fmtDay = new Intl.DateTimeFormat(lang, { day: "numeric", month: "short" }); fmtLang = lang; }
    const d = new Date(t), hm = fmtHM.format(d);
    return d.toDateString() === new Date().toDateString() ? hm : `${fmtDay.format(d)} ${hm}`;
  } catch { return ""; }
};
export const logHTML = (L, n = 60, important = false, T = null) => {
  if (!L || !L.length) return tx("<li>Ton héros se met en route.</li>");
  const rows = L.slice(0, important ? 400 : n).map((l, i) => [l, logClass(l), T ? lineTime(T[i]) : ""]).filter(([, c]) => !important || c).slice(0, n);
  return rows.length ? rows.map(([l, c, t]) => `<li${c}>${t ? `<time class="lt">${esc(t)}</time>` : ""}${esc(l)}</li>`).join("") : `<li class="muted">${tx("Aucune ligne importante pour l’instant.")}</li>`;
};
