// Commandes pas encore débloquées : un lien « 🔒 nom · prix » qui mène à la boutique.
import { t as tx } from "../i18n/index.js";
import { UNLOCK_INDEX, hasUnlock, unlockAvailable } from "../game/unlocks.js";
import { fmt, esc } from "../game/format.js";
import { tabOpen } from "../game/tabs.js";

/** Zones d'avance au-delà desquelles un déblocage n'est pas encore annoncé (moins d'informations d'un coup). */
export const LOCK_LOOKAHEAD = 5;

/** "" si le déblocage est acquis, lointain (record + LOCK_LOOKAHEAD) ou si la boutique n'est pas encore ouverte ;
 *  sinon un lien vers la boutique. */
export function lockLink(S, id) {
  if (hasUnlock(S, id)) return "";
  const u = UNLOCK_INDEX[id];
  if (!u || !tabOpen(S, "shop") || (!unlockAvailable(S, u) && u.zone > (S.best || 1) + LOCK_LOOKAHEAD)) return "";
  const when = unlockAvailable(S, u) ? tx("{0} or", { 0: fmt(u.price) }) : tx("Zone record {0}", { 0: u.zone });
  return `<button class="linkbtn lock" data-tab="shop" title="${esc(tx("À débloquer dans la boutique : {0}", { 0: u.desc }))}">🔒 ${esc(u.name)} · ${when}</button>`;
}
