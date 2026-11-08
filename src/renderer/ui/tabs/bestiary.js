// Onglet Bestiaire : monstres rencontrés, victoires et paliers.
import { t as tx, tr } from "../../i18n/index.js";
import { MONSTERS, ZONES } from "../../game/data.js";
import { BESTIARY_TIERS, BESTIARY_BONUS, bestiaryTier, bestiaryTiersTotal, bestiaryEffects } from "../../game/bestiary.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc } from "../../game/format.js";
import { monsterURL, itemIconURL } from "../../render/sprites.js";
import { CODEX_ENTRIES, CODEX_BONUS, codexCounts, codexEffects, POWER_CODEX_BONUS, powersFound } from "../../game/codex.js";
import { POWERS } from "../../game/powers.js";
import { RARITIES, SLOTS } from "../../game/data.js";

const where = (type) => {
  if (type === "goblin") return tx("Rare, partout. S’enfuit vite !");
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
      const pips = BESTIARY_TIERS.map((t, i) => `<i class="${i < tier ? "on" : ""}" title="${esc(tx("{0} victoires", { 0: fmt(t) }))}"></i>`).join("");
      return `<article class="panel beast${known ? "" : " unknown"}">
        <img src="${monsterURL(k, !known)}" alt="">
        <div class="si"><div class="nm">${known ? esc(MONSTERS[k].name) : "???"}</div>
        <div class="sub">${known ? esc(where(k)) : tx("Pas encore rencontré")}</div>
        <div class="pips">${pips}<span>${fmt(n)}${next ? " / " + fmt(next) : " (complet)"}</span></div></div>
      </article>`;
    }).join("");
    const eff = bestiaryEffects(S);
    el.innerHTML = `${this.codexHTML(S)}<h2 class="codexh">${tx("Bestiaire")}</h2><p class="note tabintro">${seen} ${tx("/ {0} monstres rencontrés · {1} paliers atteints.\n      Chaque palier ({2} victoires) d’un monstre donne {3}.\n      Bonus actuel :", { 0: keys.length, 1: bestiaryTiersTotal(S), 2: BESTIARY_TIERS.map(fmt).join(", "), 3: esc(describeEffects(BESTIARY_BONUS)) })} <b class="delta-p">${Object.keys(eff).length ? esc(describeEffects(eff)) : tx("aucun")}</b>.</p>
      <div class="beastgrid">${cards}</div>`;
  }

  codexHTML(S) {
    const C = S.codex || {}, c = codexCounts(S), eff = codexEffects(S);
    const cells = CODEX_ENTRIES.map((e) => {
      const r = C[e.key], known = r != null;
      const title = known ? `${tr(e.name)} ${tx("({0}) · meilleur : {1}", { 0: SLOTS[e.slot].name, 1: RARITIES[r].name })}` : `??? (${SLOTS[e.slot].name})`;
      return `<div class="codexcell${known ? "" : " unknown"}" title="${esc(title)}" style="--c:${known ? RARITIES[r].color : "transparent"}">
        <img src="${itemIconURL({ icon: e.icon, slot: e.slot, r: known ? r : 0, color: known ? null : "#3a3650" })}" alt=""></div>`;
    }).join("");
    return `<h2 class="codexh first">${tx("Collection d’objets")} <small>${c.found} ${tx("/ {0} types · {1} en épique · {2} en légendaire", { 0: c.total, 1: c.epic, 2: c.leg })}</small></h2>
      <p class="note tabintro">${tx("Chaque type d’objet trouvé donne {0} ; trouvé en épique {1} ;\n      en légendaire {2}. Conservé à l’ascension.\n      Bonus actuel :", { 0: esc(describeEffects(CODEX_BONUS.found)), 1: esc(describeEffects(CODEX_BONUS.epic)), 2: esc(describeEffects(CODEX_BONUS.legendary)) })} <b class="delta-p">${Object.keys(eff).length ? esc(describeEffects(eff)) : "aucun"}</b>.</p>
      <div class="codexgrid">${cells}</div>
      <h2 class="codexh">${tx("Pouvoirs légendaires")} <small>${powersFound(S)} ${tx("/ {0} découverts · chacun donne {1}", { 0: POWERS.length, 1: esc(describeEffects(POWER_CODEX_BONUS)) })}</small></h2>
      <div class="powergrid">${POWERS.map((p) => (S.powersSeen || {})[p.id]
        ? `<span class="chip pow" title="${esc(describeEffects(p.eff))}">★ ${esc(p.name)}</span>`
        : `<span class="chip pow unknown">???</span>`).join("")}</div>`;
  }

  onAction() {}
  tick() { return false; }
}
