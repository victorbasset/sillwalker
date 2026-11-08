// Onglet Talents : arbre de la classe active (3 branches × 4 paliers).
import { TREES, TIER_REQ, TALENT_INDEX, cannotLearn, branchSpent, talentPointsFree, talentPointsTotal, talentPointsSpent, describeEffects,
  VOIES, VOIE_REQ, MASTERIES, MASTERY_REQ, chosenVoie } from "../../game/talents.js";
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

    // Voie (spécialisation exclusive) et maîtrises (rangs illimités).
    const spentAll = talentPointsSpent(S), voie = chosenVoie(S);
    const voies = (VOIES[S.cls] || []).map((v) => {
      const taken = voie && voie.id === v.id, closed = voie && !taken, locked = spentAll < VOIE_REQ;
      const cls = ["talent", "voie", taken ? "has maxed" : "", closed ? "closed" : "", locked ? "locked" : "", this.sel === v.id ? "sel" : ""].join(" ");
      return `<button class="${cls}" data-action="t-sel" data-id="${v.id}"><span class="tn">${taken ? "✦ " : ""}${esc(v.name)}</span>
        <span class="tr">${taken ? "choisie" : locked ? "🔒 " + VOIE_REQ + " pts" : closed ? "—" : "à choisir"}</span><span class="vt">${esc(v.text)}</span></button>`;
    }).join("");
    const masteries = MASTERIES.map((m) => {
      const r = ranks[m.id] || 0, locked = spentAll < MASTERY_REQ;
      return `<button class="${["talent", "mastery", locked ? "locked" : "", r ? "has" : "", this.sel === m.id ? "sel" : ""].join(" ")}" data-action="t-sel" data-id="${m.id}">
        <span class="tn">${esc(((n) => n[0].toUpperCase() + n.slice(1))(m.name.replace("Maîtrise : ", "")))}</span><span class="tr">${locked ? "🔒 " + MASTERY_REQ + " pts" : "rang " + r}</span></button>`;
    }).join("");
    const extra = `<article class="panel tbranch tvoie"><h2>Voie <small>${voie ? "choisie" : `dès ${VOIE_REQ} pts`}</small></h2>${voies}
        <p class="note">Une seule voie par classe. Pour en changer : réinitialiser les talents.</p></article>
      <article class="panel tbranch tmastery"><h2>Maîtrises <small>rangs illimités</small></h2>${masteries}
        <p class="note">Dès ${MASTERY_REQ} points dépensés : chaque point en plus y trouve sa place, aucun n’est perdu.</p></article>`;

    const ix = TALENT_INDEX[this.sel], t = ix.talent, r = ranks[t.id] || 0, why = cannotLearn(S, t.id);
    const now = r ? describeEffects(t.eff, r) : "aucun effet pour l’instant";
    const next = r < t.max ? describeEffects(t.eff, 1) : "";
    const where = ix.branch === "voie" ? `Voie (spécialisation), demande ${VOIE_REQ} points dépensés`
      : ix.branch === "mastery" ? `Maîtrise, demande ${MASTERY_REQ} points dépensés · rang ${r}`
      : `${tree[ix.branch].name}, palier ${t.tier + 1}${TIER_REQ[t.tier] ? ` (demande ${TIER_REQ[t.tier]} points dans la branche)` : ""} · rang ${r} / ${t.max}`;
    const detail = `<article class="panel tdetail">
      <h2>${esc(g.classDef().name)} <small>${free} / ${total} point${total > 1 ? "s" : ""} libre${free > 1 ? "s" : ""}</small></h2>
      <div class="tsel">
        <div class="nm">${t.tier === 3 ? "★ " : ""}${esc(t.name)}</div>
        <div class="sub">${esc(where)}</div>
        ${t.text ? `<p class="ttext">${esc(t.text)}</p>` : ""}
        <ul class="lines"><li><span>Effet actuel</span><span>${esc(now)}</span></li>
        ${next ? `<li><span>Rang suivant</span><span class="delta-p">${esc(next)}</span></li>` : ""}</ul>
        <div class="row">
          <button data-action="t-learn" data-id="${t.id}" data-n="1"${why ? " disabled" : ""}>${ix.branch === "voie" ? "Choisir cette voie" : "Apprendre (+1)"}</button>
          ${t.max > 1 ? `<button data-action="t-learn" data-id="${t.id}" data-n="${t.max === Infinity ? 9999 : 99}"${why ? " disabled" : ""}>${t.max === Infinity ? "Tous les points libres" : "Tout ce qui est possible"}</button>` : ""}
        </div>
        ${why && r < t.max ? `<p class="note">${esc(why)}.</p>` : ""}
      </div>
      <div class="row tfoot">
        <button data-action="t-reset" class="quiet"${S.gold < cost || free === total ? " disabled" : ""}>Réinitialiser${cost ? ` (${fmt(cost)} or)` : " (gratuit)"}</button>
      </div>
      <p class="note">1 point par niveau. Chaque classe garde ses propres talents : en changer ne fait rien perdre. Réinitialisation gratuite jusqu’au niveau 10.</p>
    </article>`;
    el.innerHTML = `<div class="tgrid">${detail}${branches}${extra}</div>`;
  }

  onAction(a, b) {
    const g = this.game;
    if (a === "t-sel") this.sel = b.dataset.id;
    else if (a === "t-learn") { this.sel = b.dataset.id; g.learnTalent(b.dataset.id, +b.dataset.n || 1); }
    else if (a === "t-reset") g.resetTalents();
  }

  tick() {}
}
