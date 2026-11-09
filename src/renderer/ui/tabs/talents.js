// Onglet Talents : arbre de la classe active (3 branches × 4 paliers).
import { t as tx, txn } from "../../i18n/index.js";
import { effectIconURL } from "../../render/shopart.js";
import { TREES, TIER_REQ, TALENT_INDEX, cannotLearn, branchSpent, talentPointsFree, talentPointsTotal, talentPointsSpent, describeEffects,
  VOIES, VOIE_REQ, MASTERIES, MASTERY_REQ, chosenVoie } from "../../game/talents.js";
import { fmt, esc } from "../../game/format.js";
import { lockLink } from "../locks.js";
import { hasUnlock } from "../../game/unlocks.js";

export class TalentsTab {
  constructor(game) {
    this.game = game;
    this.sel = null;      // talent dont le détail est affiché (survol)
    this.root = null;
    this.armed = null;    // voie en attente de confirmation (2e clic)
  }

  badge() { const n = this.game.talentPointsFree(); return n > 0 ? String(n) : ""; }

  render(el) {
    this.root = el;
    const g = this.game, S = g.S, tree = TREES[S.cls], ranks = S.talents[S.cls] || {};
    if (!this.sel || TALENT_INDEX[this.sel]?.cls !== S.cls) this.sel = tree[0].talents[0].id;
    const free = talentPointsFree(S), total = talentPointsTotal(S), cost = g.talentResetCost();

    const branches = tree.map((b, bi) => {
      const spent = branchSpent(S, bi);
      const rows = b.talents.map((t) => {
        const r = ranks[t.id] || 0, locked = spent < TIER_REQ[t.tier];
        const can = !cannotLearn(S, t.id);
        const cls = ["talent", "tier" + t.tier, locked ? "locked" : "", r >= t.max ? "maxed" : "", r > 0 ? "has" : "", can ? "can" : "", this.sel === t.id ? "sel" : ""].join(" ");
        return `<button class="${cls}" data-action="t-learn" data-n="1" data-id="${t.id}" data-tid="${t.id}">
          <span class="tn"><img class="eicon" src="${effectIconURL(t.eff)}" alt="">${t.tier === 3 ? "★ " : ""}${esc(t.name)}</span>
          <span class="tr">${locked ? "🔒 " + txn(TIER_REQ[t.tier], "{n} pt|{n} pts") : r + " / " + t.max}</span>
          ${can && t.max - r > 1 ? `<span class="tmax" data-action="t-learn" data-n="99" data-id="${t.id}" title="${esc(tx("Monter au maximum possible"))}">${tx("max")}</span>` : ""}</button>`;
      }).join("");
      return `<article class="panel tbranch"><h2>${esc(b.name)} <small>${txn(spent, "{n} pt|{n} pts")}</small></h2>${rows}</article>`;
    }).join("");

    // Voie (spécialisation exclusive) et maîtrises (rangs illimités).
    const spentAll = talentPointsSpent(S), voie = chosenVoie(S);
    const voies = (VOIES[S.cls] || []).map((v) => {
      const taken = voie && voie.id === v.id, closed = voie && !taken, locked = spentAll < VOIE_REQ;
      const cls = ["talent", "voie", taken ? "has maxed" : "", closed ? "closed" : "", locked ? "locked" : "", this.sel === v.id ? "sel" : ""].join(" ");
      const armed = this.armed === v.id && !taken;
      return `<button class="${cls}${armed ? " armed" : ""}" data-action="t-voie" data-id="${v.id}" data-tid="${v.id}"><span class="tn">${taken ? "✦ " : ""}${esc(v.name)}</span>
        <span class="tr">${taken ? tx("choisie") : locked ? "🔒 " + txn(VOIE_REQ, "{n} pt|{n} pts") : closed ? "—" : armed ? tx("cliquer encore pour confirmer") : tx("choisir")}</span><span class="vt">${esc(v.text)}</span></button>`;
    }).join("");
    const masteries = MASTERIES.map((m) => {
      const r = ranks[m.id] || 0, locked = spentAll < MASTERY_REQ;
      const can = !cannotLearn(S, m.id);
      return `<button class="${["talent", "mastery", locked ? "locked" : "", r ? "has" : "", can ? "can" : "", this.sel === m.id ? "sel" : ""].join(" ")}" data-action="t-learn" data-n="1" data-id="${m.id}" data-tid="${m.id}">
        <span class="tn"><img class="eicon" src="${effectIconURL(m.eff)}" alt="">${esc(((n) => n[0].toUpperCase() + n.slice(1))(m.name.replace(tx("Maîtrise : "), "")))}</span><span class="tr">${locked ? "🔒 " + txn(MASTERY_REQ, "{n} pt|{n} pts") : tx("rang {0}", { 0: r })}</span>
        ${can && free > 1 ? `<span class="tmax" data-action="t-learn" data-n="9999" data-id="${m.id}" title="${esc(tx("Y mettre tous les points libres"))}">${tx("tout")}</span>` : ""}</button>`;
    }).join("");
    // Voie et maîtrises montrées à l'approche de leur seuil (10 points avant) : moins d'informations d'un coup au début,
    // une ligne annonce l'objectif en attendant.
    const showVoie = !!voie || spentAll >= VOIE_REQ - 10, showMast = spentAll >= MASTERY_REQ - 10;
    const extraFull = `<article class="panel tbranch tvoie"><h2>${tx("Voie")} <small>${voie ? tx("choisie") : `${tx("dès {0} pts", { 0: VOIE_REQ })}`} <span class="help" title="${esc(tx("Une seule voie par héros. Pour en changer : réinitialiser les talents."))}">ⓘ</span></small></h2>${voies}</article>
      <article class="panel tbranch tmastery"><h2>${tx("Maîtrises")} <small>${tx("rangs illimités")} <span class="help" title="${esc(tx("Dès {0} points dépensés : chaque point en plus y trouve sa place, aucun n’est perdu.", { 0: MASTERY_REQ }))}">ⓘ</span></small></h2>${masteries}</article>`;
    const extra = showVoie && showMast ? extraFull
      : showVoie ? extraFull.slice(0, extraFull.indexOf('<article class="panel tbranch tmastery">'))
      : `<p class="note tlater">${tx("Plus tard : une voie dès {0} points dépensés, des maîtrises dès {1}.", { 0: VOIE_REQ, 1: MASTERY_REQ })}</p>`;

    const canVoie = !voie && spentAll >= VOIE_REQ;
    const head = `<article class="panel tdetail">
      <h2>${esc(g.classDef().name)} <small>${txn(free, "{n} point libre · {0} au total|{n} points libres · {0} au total", { 0: total })}</small></h2>
      ${hasUnlock(g.S, "bulkPoints") ? `<div class="row"><button data-action="t-auto" class="${free > 0 ? "primary" : ""}"${free > 0 ? "" : " disabled"} title="${esc(tx("Ultimes d’abord, puis la branche la plus avancée, puis les maîtrises. Ne choisit jamais la voie à ta place."))}">${tx("Dépenser automatiquement{0}", { 0: free > 0 ? ` (${free})` : "" })}</button></div>` : `<div class="row">${lockLink(g.S, "bulkPoints")}</div>`}
      ${hasUnlock(g.S, "autoLevel") ? `<label class="toggle"><input type="checkbox" data-action="t-autoon"${g.S.settings.autoTalents ? " checked" : ""}> ${tx("À chaque niveau, dépenser tout seul")}</label>` : ""}
      ${canVoie ? `<p class="note warnline">${tx("✦ Une voie est disponible : choisis-la dans le cadre « Voie ».")}</p>` : ""}
      <p class="note">${tx("Clic sur un talent : +1 rang · « max » : autant que possible. Survole un talent pour voir son effet.")}</p>
      <div id="tsel">${this.detailHTML()}</div>
      <div class="row tfoot">
        <button data-action="t-reset" class="quiet"${S.gold < cost || free === total ? " disabled" : ""}>${tx("Réinitialiser{0}", { 0: cost ? ` ${tx("({0} or)", { 0: fmt(cost) })}` : " (gratuit)" })}</button>
      </div>
    </article>`;
    el.innerHTML = `<div class="tgrid">${head}${branches}${extra}</div>`;
  }

  /** Détail du talent survolé (sans reconstruire tout l'onglet). */
  detailHTML() {
    const S = this.game.S, tree = TREES[S.cls], ranks = S.talents[S.cls] || {};
    const ix = TALENT_INDEX[this.sel], t = ix.talent, r = ranks[t.id] || 0, why = cannotLearn(S, t.id);
    const now = r ? describeEffects(t.eff, r) : tx("aucun effet pour l’instant");
    const next = r < t.max ? describeEffects(t.eff, 1) : "";
    const where = ix.branch === "voie" ? `${tx("Voie (spécialisation), demande {0} points dépensés", { 0: VOIE_REQ })}`
      : ix.branch === "mastery" ? `${tx("Maîtrise, demande {0} points dépensés · rang {1}", { 0: MASTERY_REQ, 1: r })}`
      : `${tree[ix.branch].name}${tx(", palier {0}{1} · rang {2} / {3}", { 0: t.tier + 1, 1: TIER_REQ[t.tier] ? ` ${tx("(demande {0} points dans la branche)", { 0: TIER_REQ[t.tier] })}` : "", 2: r, 3: t.max })}`;
    return `<div class="tsel">
        <div class="nm">${t.tier === 3 ? "★ " : ""}${esc(t.name)}</div>
        <div class="sub">${esc(where)}</div>
        ${t.text ? `<p class="ttext">${esc(t.text)}</p>` : ""}
        <ul class="lines"><li><span>${tx("Effet actuel")}</span><span>${esc(now)}</span></li>
        ${next ? `<li><span>${tx("Rang suivant")}</span><span class="delta-p">${esc(next)}</span></li>` : ""}</ul>
        ${why && r < t.max ? `<p class="note">${esc(why)}.</p>` : ""}
      </div>`;
  }

  hover(id) {
    if (!id || id === this.sel || !TALENT_INDEX[id] || !this.root) return;
    this.sel = id;
    const box = this.root.querySelector("#tsel");
    if (box) box.innerHTML = this.detailHTML();
    for (const b of this.root.querySelectorAll(".talent.sel")) b.classList.remove("sel");
    const cur = this.root.querySelector(`.talent[data-tid="${id}"]`);
    if (cur) cur.classList.add("sel");

  }

  onAction(a, b) {
    const g = this.game;
    if (a === "t-sel") this.sel = b.dataset.id;
    else if (a === "t-learn") { this.sel = b.dataset.id; g.learnTalent(b.dataset.id, +b.dataset.n || 1); }
    else if (a === "t-voie") {
      this.sel = b.dataset.id;
      if (cannotLearn(g.S, b.dataset.id)) return;
      if (this.armed === b.dataset.id) { this.armed = null; g.learnTalent(b.dataset.id, 1); }
      else { this.armed = b.dataset.id; setTimeout(() => { if (this.armed === b.dataset.id) { this.armed = null; g.changed(); } }, 4000); }
    }
    else if (a === "t-auto") g.autoSpendTalents();
    else if (a === "t-autoon") { g.S.settings.autoTalents = b.checked; if (b.checked) g.autoSpendTalents(); g.changed(); }
    else if (a === "t-reset") g.resetTalents();
  }

  tick() {}
}
