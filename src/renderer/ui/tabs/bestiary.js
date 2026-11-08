// Onglet Bestiaire : monstres rencontrés, victoires et paliers.
import { MONSTERS, ZONES } from "../../game/data.js";
import { BESTIARY_TIERS, BESTIARY_BONUS, bestiaryTier, bestiaryTiersTotal, bestiaryEffects } from "../../game/bestiary.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc } from "../../game/format.js";
import { monsterURL, itemIconURL } from "../../render/sprites.js";
import { CODEX_ENTRIES, CODEX_BONUS, codexCounts, codexEffects, POWER_CODEX_BONUS, powersFound } from "../../game/codex.js";
import { POWERS } from "../../game/powers.js";
import { RARITIES, SLOTS } from "../../game/data.js";

const where = (type) => {
  if (type === "goblin") return "Rare, partout. S’enfuit vite !";
  const z = ZONES.filter((x) => x.monsters.includes(type) || x.boss === type).map((x) => x.name);
  return z.join(", ");
};

export class BestiaryTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  render(el) {
    const S = this.game.S, B = S.bestiary || {};
    const keys = Object.keys(MONSTERS), seen = keys.filter((k) => B[k] > 0).length;
    const cards = keys.map((k) => {
      const n = B[k] || 0, known = n > 0, tier = bestiaryTier(n), next = BESTIARY_TIERS[tier];
      const pips = BESTIARY_TIERS.map((t, i) => `<i class="${i < tier ? "on" : ""}" title="${fmt(t)} victoires"></i>`).join("");
      return `<article class="panel beast${known ? "" : " unknown"}">
        <img src="${monsterURL(k, !known)}" alt="">
        <div class="si"><div class="nm">${known ? esc(MONSTERS[k].name) : "???"}</div>
        <div class="sub">${known ? esc(where(k)) : "Pas encore rencontré"}</div>
        <div class="pips">${pips}<span>${fmt(n)}${next ? " / " + fmt(next) : " (complet)"}</span></div></div>
      </article>`;
    }).join("");
    const eff = bestiaryEffects(S);
    el.innerHTML = `${this.codexHTML(S)}<h2 class="codexh">Bestiaire</h2><p class="note tabintro">${seen} / ${keys.length} monstres rencontrés · ${bestiaryTiersTotal(S)} paliers atteints.
      Chaque palier (${BESTIARY_TIERS.map(fmt).join(", ")} victoires) d’un monstre donne ${esc(describeEffects(BESTIARY_BONUS))}.
      Bonus actuel : <b class="delta-p">${Object.keys(eff).length ? esc(describeEffects(eff)) : "aucun"}</b>.</p>
      <div class="beastgrid">${cards}</div>`;
  }

  codexHTML(S) {
    const C = S.codex || {}, c = codexCounts(S), eff = codexEffects(S);
    const cells = CODEX_ENTRIES.map((e) => {
      const r = C[e.key], known = r != null;
      const title = known ? `${e.name} (${SLOTS[e.slot].name}) · meilleur : ${RARITIES[r].name}` : `??? (${SLOTS[e.slot].name})`;
      return `<div class="codexcell${known ? "" : " unknown"}" title="${esc(title)}" style="--c:${known ? RARITIES[r].color : "transparent"}">
        <img src="${itemIconURL({ icon: e.icon, slot: e.slot, r: known ? r : 0, color: known ? null : "#3a3650" })}" alt=""></div>`;
    }).join("");
    return `<h2 class="codexh first">Collection d’objets <small>${c.found} / ${c.total} types · ${c.epic} en épique · ${c.leg} en légendaire</small></h2>
      <p class="note tabintro">Chaque type d’objet trouvé donne ${esc(describeEffects(CODEX_BONUS.found))} ; trouvé en épique ${esc(describeEffects(CODEX_BONUS.epic))} ;
      en légendaire ${esc(describeEffects(CODEX_BONUS.legendary))}. Conservé à l’ascension.
      Bonus actuel : <b class="delta-p">${Object.keys(eff).length ? esc(describeEffects(eff)) : "aucun"}</b>.</p>
      <div class="codexgrid">${cells}</div>
      <h2 class="codexh">Pouvoirs légendaires <small>${powersFound(S)} / ${POWERS.length} découverts · chacun donne ${esc(describeEffects(POWER_CODEX_BONUS))}</small></h2>
      <div class="powergrid">${POWERS.map((p) => (S.powersSeen || {})[p.id]
        ? `<span class="chip pow" title="${esc(describeEffects(p.eff))}">★ ${esc(p.name)}</span>`
        : `<span class="chip pow unknown">???</span>`).join("")}</div>`;
  }

  onAction() {}
  tick() { return false; }
}
