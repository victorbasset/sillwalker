// PNJ de l'onglet (game/npcs.js ; demande E de Victor) : portrait et bulle. Une réplique toutes les 30 s, la suivante à
// chaque clic (data-action « npc-talk », compté par onglet ; data-npc et non data-tab : un data-tab ouvre l'onglet). compact : dans un titre de carte, bulle sur une ligne
// (texte entier au survol) ; sinon (Boutique, it. 1073) dans une barre à part.
import { npcFor, npcLine } from "../game/npcs.js";
import { npcURL } from "../render/sprites.js";
import { t as tx } from "../i18n/index.js";
import { esc } from "../game/format.js";

const clicks = {};
export const npcTalk = (tab) => { clicks[tab] = (clicks[tab] || 0) + 1; };

/** compact : true (bulle sur une ligne) ou "icon" (portrait seul, réplique au survol : barre déjà pleine, Familiers). */
export function npcHTML(tab, compact = false) {
  const npc = npcFor(tab);
  if (!npc) return "";
  const line = tx(npcLine(npc, Date.now(), clicks[tab] || 0));
  return `<button class="npc hit${compact ? " compact" : ""}${compact === "icon" ? " icon" : ""}" data-action="npc-talk" data-npc="${tab}" title="${esc(tx(npc.name) + (compact ? "\n" + line : ""))}"><img src="${npcURL(npc.art)}" alt="">
    <span class="say">${esc(line)}</span></button>`;
}
