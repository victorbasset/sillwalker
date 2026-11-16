// Sous-onglets (demande 18 de Victor : onglets moins chargés, sans défilement) : une rangée de boutons, une seule
// section affichée. list : [[id, libellé, nombre?]] ; action : data-action des boutons (préfixe de l'onglet).
import { esc } from "../game/format.js";
import { t as tx } from "../i18n/index.js";

export function subtabsHTML(list, current, action) {
  // (it. 1743) 4e élément `lock` : sous-onglet encore fermé, montré grisé avec son seuil (objectif visible), sans action
  return `<nav class="bjump subtabs" role="tablist" aria-label="${esc(tx("Aller à"))}">${list.map(([k, n, c, lock]) => lock
    ? `<button class="quiet locked" role="tab" aria-disabled="true" disabled title="${esc(lock)}">🔒 ${esc(n)} <small>${esc(lock)}</small></button>`
    : `<button class="quiet${current === k ? " on" : ""}" role="tab" aria-selected="${current === k}" data-action="${action}" data-to="${k}">${esc(n)}${c != null ? ` <small>${c}</small>` : ""}</button>`).join("")}</nav>`;
}
