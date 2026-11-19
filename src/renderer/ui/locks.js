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
  // (it. 2527) disponible et abordable : un clic l'achète sur place (comme « Prochain déblocage » et le résumé d'absence, goal-buy),
  // au lieu d'ouvrir la boutique puis d'y chercher la carte (Victor : moins de clics)
  if (unlockAvailable(S, u) && (S.gold || 0) >= u.price)
    return `<button class="linkbtn lock buy" data-action="goal-buy" data-id="${u.id}" title="${esc(u.desc)}">${esc(tx("Acheter : {0} ({1} or)", { 0: u.name, 1: fmt(u.price) }))}</button>`;
  const when = unlockAvailable(S, u) ? tx("{0} or", { 0: fmt(u.price) }) : tx("Atteindre la zone {0}", { 0: u.zone });
  return `<button class="linkbtn lock" data-tab="shop" data-sec="unlocks" title="${esc(tx("À débloquer dans la boutique : {0}", { 0: u.desc }))}">🔒 ${esc(u.name)} · ${when}</button>`;
}
