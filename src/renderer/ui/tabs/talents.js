// Onglet Talents : arbre de la classe active (3 branches × 4 paliers).
import { TREES, TIER_REQ, TALENT_INDEX, cannotLearn, branchSpent, talentPointsFree, talentPointsTotal, describeEffects } from "../../game/talents.js";
import { fmt, esc } from "../../game/format.js";

export class TalentsTab {
  constructor(game) {
    this.game = game;
    this.sel = null;
  }

  badge() { const n = this.game.talentPointsFree(); return n > 0 ? String(n) : ""; }

  render(el) {
    const g = this.game, S = g.S, tree = TREES[S.cls], ranks = S.talents[S.cls] || {};
    if (!this.sel || TALENT_INDEX[this.sel]?.cls !== S.cls) this.sel = tree[0].talents[0].id;
    const free = talentPointsFree(S), total = talentPointsTotal(S), cost = g.talentResetCost();

    const branches = tree.map((b, bi) => {
      const spent = branchSpent(S, bi);
      const rows = b.talents.map((t) => {
        const r = ranks[t.id] || 0, locked = spent < TIER_REQ[t.tier];
        const cls = ["talent", "tier" + t.tier, locked ? "locked" : "", r >= t.max ? "maxed" : "", r > 0 ? "has" : "", this.sel === t.id ? "sel" : ""].join(" ");
        return `<button class="${cls}" data-action="t-sel" data-id="${t.id}" title="${esc(t.name)}">
          <span class="tn">${t.tier === 3 ? "★ " : ""}${esc(t.name)}</span>
          <span class="tr">${locked ? "🔒 " + TIER_REQ[t.tier] + " pts" : r + " / " + t.max}</span></button>`;
      }).join("");
      return `<article class="panel tbranch"><h2>${esc(b.name)} <small>${spent} pt${spent > 1 ? "s" : ""}</small></h2>${rows}</article>`;
    }).join("");

    const ix = TALENT_INDEX[this.sel], t = ix.talent, r = ranks[t.id] || 0, why = cannotLearn(S, t.id);
    const now = r ? describeEffects(t.eff, r) : "aucun effet pour l’instant";
    const next = r < t.max ? describeEffects(t.eff, 1) : "";
    const detail = `<article class="panel tdetail">
      <h2>${esc(g.classDef().name)} <small>${free} / ${total} point${total > 1 ? "s" : ""} libre${free > 1 ? "s" : ""}</small></h2>
      <div class="tsel">
        <div class="nm">${t.tier === 3 ? "★ " : ""}${esc(t.name)}</div>
        <div class="sub">${esc(tree[ix.branch].name)}, palier ${t.tier + 1}${TIER_REQ[t.tier] ? ` (demande ${TIER_REQ[t.tier]} points dans la branche)` : ""} · rang ${r} / ${t.max}</div>
        ${t.text ? `<p class="ttext">${esc(t.text)}</p>` : ""}
        <ul class="lines"><li><span>Effet actuel</span><span>${esc(now)}</span></li>
        ${next ? `<li><span>Rang suivant</span><span class="delta-p">${esc(next)}</span></li>` : ""}</ul>
        <div class="row">
          <button data-action="t-learn" data-id="${t.id}" data-n="1"${why ? " disabled" : ""}>Apprendre (+1)</button>
          <button data-action="t-learn" data-id="${t.id}" data-n="99"${why ? " disabled" : ""}>Tout ce qui est possible</button>
        </div>
        ${why && r < t.max ? `<p class="note">${esc(why)}.</p>` : ""}
      </div>
      <div class="row tfoot">
        <button data-action="t-reset" class="quiet"${S.gold < cost || free === total ? " disabled" : ""}>Réinitialiser${cost ? ` (${fmt(cost)} or)` : " (gratuit)"}</button>
      </div>
      <p class="note">1 point par niveau. Chaque classe garde ses propres talents : en changer ne fait rien perdre. Réinitialisation gratuite jusqu’au niveau 10.</p>
    </article>`;
    el.innerHTML = `<div class="tgrid">${detail}${branches}</div>`;
  }

  onAction(a, b) {
    const g = this.game;
    if (a === "t-sel") this.sel = b.dataset.id;
    else if (a === "t-learn") { this.sel = b.dataset.id; g.learnTalent(b.dataset.id, +b.dataset.n || 1); }
    else if (a === "t-reset") g.resetTalents();
  }

  tick() {}
}
