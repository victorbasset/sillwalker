// Onglet Bestiaire : monstres rencontrés, victoires et paliers.
import { t as tx, tr } from "../../i18n/index.js";
import { MONSTERS, ZONES } from "../../game/data.js";
import { BESTIARY_TIERS, BESTIARY_BONUS, bestiaryTier, bestiaryTiersTotal, bestiaryEffects } from "../../game/bestiary.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc } from "../../game/format.js";
import { monsterURL, itemIconURL } from "../../render/sprites.js";
import { CODEX_ENTRIES, CODEX_BONUS, codexCounts, codexEffects, POWER_CODEX_BONUS, powersFound } from "../../game/codex.js";
import { POWERS } from "../../game/powers.js";
import { SETS, SET_KEYS, setCounts } from "../../game/sets.js";
import { RARITIES, SLOTS, ELITE_AFFIXES } from "../../game/data.js";
import { BOSS_MECHANICS } from "../../game/bosses.js";

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
        : `<span class="chip pow unknown">???</span>`).join("")}</div>
      <h2 class="codexh">${tx("Panoplies")} <small>${tx("pièces d’épiques et de légendaires · bonus à 2 et 4 pièces portées")}</small></h2>
      <div class="setgrid">${SET_KEYS.map((id) => { const st = SETS[id], n = setCounts(S.equip)[id] || 0; // toutes les panoplies, et où en est le héros
        return `<div class="setcard" style="--c:${st.color}"><b class="tint">◆ ${esc(st.name)}</b> <small>${n}/4</small>
          <div class="${n >= 2 ? "on" : ""}">${n >= 2 ? "✓ " : ""}${tx("2 pièces : {0}", { 0: esc(describeEffects(st.two)) })}</div>
          <div class="${n >= 4 ? "on" : ""}">${n >= 4 ? "✓ " : ""}${tx("4 pièces : {0}", { 0: esc(describeEffects(st.four)) })}</div></div>`; }).join("")}</div>
      <h2 class="codexh">${tx("Capacités des boss")} <small>${tx("une par boss, deux à partir de la 2e boucle")}</small></h2>
      <div class="setgrid">${Object.values(BOSS_MECHANICS).map((b) => `<div class="setcard" style="--c:#ff9a7a"><b>${esc(b.name)}</b><div>${esc(b.desc)}</div></div>`).join("")}</div>
      <h2 class="codexh">${tx("Élites")} <small>${tx("monstres dorés : butin garanti, or ×4 ; chacun a un affixe")}</small></h2>
      <div class="setgrid">${Object.values(ELITE_AFFIXES).map((a) => `<div class="setcard" style="--c:${a.color}"><b class="tint">${esc(a.name)}</b><div>${esc(a.desc || "")}</div></div>`).join("")}</div>`;
  }

  onAction() {}
  tick() { return false; }
}
