// Onglet Bestiaire : monstres rencontrés, victoires et paliers.
import { MONSTERS, ZONES } from "../../game/data.js";
import { BESTIARY_TIERS, BESTIARY_BONUS, bestiaryTier, bestiaryTiersTotal, bestiaryEffects } from "../../game/bestiary.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc } from "../../game/format.js";
import { monsterURL } from "../../render/sprites.js";

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
    el.innerHTML = `<p class="note tabintro">${seen} / ${keys.length} monstres rencontrés · ${bestiaryTiersTotal(S)} paliers atteints.
      Chaque palier (${BESTIARY_TIERS.map(fmt).join(", ")} victoires) d’un monstre donne ${esc(describeEffects(BESTIARY_BONUS))}.
      Bonus actuel : <b class="delta-p">${Object.keys(eff).length ? esc(describeEffects(eff)) : "aucun"}</b>.</p>
      <div class="beastgrid">${cards}</div>`;
  }

  onAction() {}
  tick() { return false; }
}
