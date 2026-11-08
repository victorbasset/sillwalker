// Onglet Compétences : l'arbre géant (graphe SVG). Glisser pour se déplacer,
// molette pour zoomer, clic sur un nœud relié pour le prendre.
// Le SVG est construit une seule fois ; ensuite seuls les états changent.
import { t as tx } from "../../i18n/index.js";
import { SECTORS, SKILL_TREE, SKILL_NODE_COUNT, skillPointsTotal, skillPointsFree, activeSkillSet, canTakeSkill, skillTreeEffects , SECTOR_CORES, sectorProgress, completedSectors } from "../../game/skilltree.js";
import { describeEffects } from "../../game/talents.js";
import { esc } from "../../game/format.js";

const SVGNS = "http://www.w3.org/2000/svg";
const RADIUS = { root: 9, small: 6, notable: 10, keystone: 14 };
const SECTOR = Object.fromEntries(SECTORS.map((s) => [s.id, s]));
const svg = (tag, attrs, parent) => {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};

export class SkillsTab {
  constructor(game) {
    this.game = game;
    this.view = { x: 0, y: 0, k: 0 }; // k = 0 : à recadrer au premier affichage
    this.armedReset = false;
  }

  badge() { const n = skillPointsFree(this.game.S); return n ? String(n) : ""; }

  render(el) {
    if (this.el !== el || !el.querySelector(".skillwrap")) this.build(el);
    this.update();
  }

  build(el) {
    this.el = el;
    el.innerHTML = `<div class="skillwrap">
      <aside class="panel skillside">
        <h2>${tx("Compétences")} <small>${SKILL_NODE_COUNT} ${tx("nœuds")}</small></h2>
        <p class="skpts"></p>
        <p class="note">${tx("1 point tous les 2 niveaux, plus des points permanents gagnés à chaque ascension (et avec la constellation de l’Étoile polaire).\n        Ton chemin est conservé à l’ascension : il se réactive tout seul au fil des niveaux.")}</p>
        <div class="row"><button data-action="k-auto" class="primary">${tx("Dépenser automatiquement")}</button></div>
        <label class="toggle"><input type="checkbox" data-action="k-autoon"> ${tx("À chaque niveau, dépenser tout seul")}</label>
        <p class="note tight">${tx("Prolonge le pétale le plus avancé, nœuds remarquables d’abord.")}</p>
        <div class="row">
          <button data-action="k-undo" class="quiet">${tx("Annuler le dernier")}</button>
          <button data-action="k-reset" class="quiet">${tx("Tout réinitialiser")}</button>
          <button data-action="k-center" class="quiet">${tx("Recentrer")}</button>
        </div>
        <h3>${tx("Bonus actifs")}</h3>
        <ul class="lines sktotal"></ul>
        <p class="note">${tx("Glisser pour se déplacer, molette pour zoomer.")}</p>
        <div class="sklegend">${SECTORS.map((s) => `<span><i style="background:${s.color}"></i>${esc(s.name)}</span>`).join("")}</div>
      </aside>
      <div class="skillview">
        <svg class="skillsvg"><g class="skg"></g></svg>
        <div class="skilltip" hidden></div>
      </div>
    </div>`;
    const g = el.querySelector(".skg"), N = SKILL_TREE.nodes;
    this.g = g;
    this.edgeEls = SKILL_TREE.edges.map(([a, b]) => ({ a, b, el: svg("line", { x1: N[a].x, y1: N[a].y, x2: N[b].x, y2: N[b].y }, g) }));
    this.nodeEls = {};
    for (const id in N) {
      const n = N[id], color = n.sector ? SECTOR[n.sector].color : "#ffd34d";
      const c = svg("circle", { cx: n.x, cy: n.y, r: RADIUS[n.kind], class: "node " + n.kind, "data-action": "k-take", "data-id": id }, g);
      c.style.setProperty("--c", color);
      this.nodeEls[id] = c;
      if (n.kind === "notable" || n.kind === "keystone") {
        const t = svg("text", { x: n.x, y: n.y + RADIUS[n.kind] + 11, class: "lbl" + (n.kind === "keystone" ? " key" : "") }, g);
        t.textContent = n.name;
      }
    }
    this.coreEls = {};
    for (const s of SECTORS) {
      const k = N[`${s.id}-key`], cx = k.x * 0.6, cy = k.y * 0.6;
      // Cœur du pétale : losange au centre, allumé quand tout le secteur est acquis.
      const core = svg("polygon", { points: `${cx},${cy - 16} ${cx + 13},${cy} ${cx},${cy + 16} ${cx - 13},${cy}`, class: "core", "data-core": s.id }, g);
      core.style.setProperty("--c", s.color);
      this.coreEls[s.id] = core;
      const t = svg("text", { x: cx, y: cy + 30, class: "sector" }, g);
      t.textContent = s.name;
      t.style.fill = s.color;
      this.coreText ||= {};
      this.coreText[s.id] = svg("text", { x: cx, y: cy + 42, class: "lbl corepct" }, g);
    }
    this.bindView(el.querySelector(".skillview"), el.querySelector(".skilltip"));
  }

  /* ---------- Navigation : glisser / molette ---------- */
  applyView() { this.g.setAttribute("transform", `translate(${this.view.x},${this.view.y}) scale(${this.view.k})`); }

  /** Recentre sur l'origine, à un zoom lisible (molette pour voir tout l'arbre). */
  center() {
    const box = this.el.querySelector(".skillview"), w = box.clientWidth || 800, h = box.clientHeight || 400;
    this.view = { x: w / 2, y: h / 2, k: Math.max(0.6, Math.min(1.2, h / 480)) };
    this.applyView();
  }

  bindView(box, tip) {
    let drag = null;
    this.dragged = false;
    box.addEventListener("mousedown", (e) => { drag = { x: e.clientX, y: e.clientY, vx: this.view.x, vy: this.view.y }; this.dragged = false; });
    window.addEventListener("mousemove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) this.dragged = true;
      if (this.dragged) { this.view.x = drag.vx + dx; this.view.y = drag.vy + dy; this.applyView(); }
    });
    window.addEventListener("mouseup", () => { drag = null; });
    box.addEventListener("wheel", (e) => {
      e.preventDefault();
      const r = box.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
      const k = Math.max(0.25, Math.min(3, this.view.k * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
      // Zoom centré sur le curseur
      this.view.x = mx - (mx - this.view.x) * (k / this.view.k);
      this.view.y = my - (my - this.view.y) * (k / this.view.k);
      this.view.k = k;
      this.applyView();
    }, { passive: false });
    box.addEventListener("mouseover", (e) => {
      const id = e.target.dataset && e.target.dataset.id, core = e.target.dataset && e.target.dataset.core;
      if (!id && !core) { tip.hidden = true; return; }
      tip.innerHTML = core ? this.coreTip(core) : this.tipHtml(id);
      tip.hidden = false;
      const r = box.getBoundingClientRect(), t = e.target.getBoundingClientRect();
      tip.style.left = Math.min(r.width - 260, Math.max(4, t.left - r.left + 16)) + "px";
      tip.style.top = Math.max(4, t.top - r.top - 10) + "px";
    });
    box.addEventListener("mouseleave", () => { tip.hidden = true; });
  }

  coreTip(sec) {
    const S = this.game.S, c = SECTOR_CORES[sec], p = sectorProgress(S, sec), on = p.done >= p.total;
    return `<b>${esc(c.name)}</b><div class="sub">${tx("Cœur du pétale {0}", { 0: esc(SECTOR[sec].name) })}</div>
      <p class="delta-p">${esc(describeEffects(c.eff))}</p>
      <p>${tx("Allume une aura autour du héros et un feu follet qui l’accompagne.")}</p>
      <div class="note">${on ? tx("Allumé !") : `${tx("S’allume quand tout le pétale est acquis : {0} / {1} nœuds.", { 0: p.done, 1: p.total })}`}</div>`;
  }

  tipHtml(id) {
    const S = this.game.S, n = SKILL_TREE.nodes[id], order = S.skills.order, active = activeSkillSet(S);
    const title = n.name || (n.kind === "root" ? tx("Origine") : tx("Compétence"));
    const sector = n.sector ? SECTOR[n.sector].name : "";
    let state;
    if (id === "root") state = tx("Point de départ.");
    else if (active.has(id)) state = tx("Acquis.");
    else if (order.includes(id)) state = tx("Dans ton chemin : se réactivera avec plus de points.");
    else if (canTakeSkill(S, id)) state = tx("Clic pour l’apprendre (1 point).");
    else if (skillPointsFree(S) <= 0) state = tx("Plus de point libre.");
    else state = tx("Doit être relié à un nœud acquis.");
    const kind = { small: "", notable: tx("Nœud remarquable · "), keystone: tx("Clé de voûte · "), root: "" }[n.kind];
    return `<b>${esc(title)}</b><div class="sub">${kind}${esc(sector)}</div>
      ${n.text ? `<p>${esc(n.text)}</p>` : Object.keys(n.eff).length ? `<p class="delta-p">${esc(describeEffects(n.eff))}</p>` : ""}
      <div class="note">${esc(state)}</div>`;
  }

  /* ---------- États ---------- */
  update() {
    const S = this.game.S, active = activeSkillSet(S), planned = new Set(S.skills.order);
    if (!this.view.k) this.center();
    for (const id in this.nodeEls) {
      const st = active.has(id) ? "on" : planned.has(id) ? "planned" : canTakeSkill(S, id) ? "avail" : "locked";
      const n = SKILL_TREE.nodes[id];
      const cls = `node ${n.kind} ${st}`;
      if (this.nodeEls[id].getAttribute("class") !== cls) this.nodeEls[id].setAttribute("class", cls);
    }
    const done = new Set(completedSectors(S));
    for (const sec in this.coreEls) {
      const on = done.has(sec), cls = "core" + (on ? " on" : "");
      if (this.coreEls[sec].getAttribute("class") !== cls) this.coreEls[sec].setAttribute("class", cls);
      const p = sectorProgress(S, sec, active), txt = on ? tx("Cœur allumé") : `${p.done} / ${p.total}`;
      if (this.coreText[sec].textContent !== txt) this.coreText[sec].textContent = txt;
    }
    for (const e of this.edgeEls) {
      const cls = active.has(e.a) && active.has(e.b) ? "on" : planned.has(e.a) || planned.has(e.b) ? "" : "dim";
      if ((e.el.getAttribute("class") || "") !== cls) e.el.setAttribute("class", cls);
    }
    const total = skillPointsTotal(S), free = skillPointsFree(S), used = active.size - 1;
    this.el.querySelector(".skpts").innerHTML = `<b class="gold">${free}</b> ${tx("point{0} libre{1} · {2} / {3} nœuds actifs · {4} points au total\n      {5}", { 0: free > 1 ? "s" : "", 1: free > 1 ? "s" : "", 2: used, 3: SKILL_NODE_COUNT, 4: total, 5: S.skills.order.length > used ? `<br><span class="note">${S.skills.order.length - used} ${tx("nœud(s) en attente de points.")}</span>` : "" })}`;
    const eff = skillTreeEffects(S);
    const lines = Object.keys(eff).map((k) => `<li><span>${esc(describeEffects({ [k]: eff[k] }))}</span></li>`).join("");
    this.el.querySelector(".sktotal").innerHTML = lines || `<li><span class="note">${tx("Aucun pour l’instant : commence près de l’origine.")}</span></li>`;
    const auto = this.el.querySelector('[data-action="k-auto"]');
    auto.disabled = free <= 0; auto.classList.toggle("primary", free > 0);
    this.el.querySelector('[data-action="k-autoon"]').checked = !!S.settings.autoSkills;
    const reset = this.el.querySelector('[data-action="k-reset"]');
    reset.textContent = this.armedReset ? tx("Confirmer la réinitialisation") : tx("Tout réinitialiser");
    reset.classList.toggle("danger", this.armedReset);
  }

  onAction(a, b) {
    const g = this.game;
    if (a === "k-take") { if (!this.dragged) g.takeSkill(b.dataset.id); }
    else if (a === "k-auto") g.autoSpendSkills();
    else if (a === "k-autoon") { g.S.settings.autoSkills = b.checked; if (b.checked) g.autoSpendSkills(); g.changed(); }
    else if (a === "k-undo") g.undoSkill();
    else if (a === "k-center") this.center();
    else if (a === "k-reset") {
      if (!this.armedReset) { this.armedReset = true; setTimeout(() => { this.armedReset = false; }, 4000); return; }
      this.armedReset = false;
      g.resetSkills();
    }
  }

  tick() { return false; }
}
