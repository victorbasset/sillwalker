// Commandes pas encore débloquées : un lien « 🔒 nom · prix » qui mène à la boutique.
import { t as tx } from "../i18n/index.js";
import { UNLOCK_INDEX, hasUnlock, unlockAvailable } from "../game/unlocks.js";
import { fmt, esc } from "../game/format.js";

/** "" si le déblocage est acquis, sinon un lien vers la boutique. */
export function lockLink(S, id) {
  if (hasUnlock(S, id)) return "";
  const u = UNLOCK_INDEX[id];
  const when = unlockAvailable(S, u) ? tx("{0} or", { 0: fmt(u.price) }) : tx("Zone record {0}", { 0: u.zone });
  return `<button class="linkbtn lock" data-tab="shop" title="${esc(tx("À débloquer dans la boutique : {0}", { 0: u.desc }))}">🔒 ${esc(u.name)} · ${when}</button>`;
}
