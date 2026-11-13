// Onglet Compétences : l'arbre géant (graphe SVG). Glisser pour se déplacer,
// molette pour zoomer, clic sur un nœud relié pour le prendre.
// Le SVG est construit une seule fois ; ensuite seuls les états changent.
import { npcHTML } from "../npc.js";
import { t as tx, txn } from "../../i18n/index.js";
import { SECTORS, SKILL_TREE, SKILL_NODE_COUNT, skillPointsTotal, skillPointsFree, skillSpendable, activeSkillSet, canTakeSkill, skillTreeEffects , SECTOR_CORES, sectorProgress, completedSectors } from "../../game/skilltree.js";
import { describeEffects } from "../../game/talents.js";
import { esc } from "../../game/format.js";
import { lockLink } from "../locks.js";
import { hasUnlock } from "../../game/unlocks.js";
import { skillIconURL, skillIconKey } from "../../render/skillicons.js";
import { SKILL_GRAPH, SKILL_GRAPH_COUNT, REGIONS, flowerComplete, canTakeGraph, activeGraphSet, chosenBranch, graphPointsFree, graphPointsTotal, skillGraphEffects } from "../../game/skillgraph.js";

const SVGNS = "http://www.w3.org/2000/svg";
// Nœuds assez grands pour porter une icône (demande 34).
const RADIUS = { root: 13, small: 10, notable: 16, keystone: 20 };
const SECTOR = Object.fromEntries(SECTORS.map((s) => [s.id, s]));
// (it. 1077) icônes des nœuds de synergie du grand graphe : celle de l'axe d'où vient le bonus
const SYN_ICON = { synHpAtk: "hpPct", synGoldAtk: "gold", synAtkHp: "atkPct", synSpdCrit: "spd", synCritBurn: "crit", synDodgeAtk: "dodge" };
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

  badge() { const n = skillPointsFree(this.game.S); return n && skillSpendable(this.game.S) ? String(n) : ""; }

  render(el) {
    if (this.el !== el || !el.querySelector(".skillwrap")) this.build(el);
    this.update();
  }

  build(el) {
    this.el = el;
    el.innerHTML = `<div class="skillwrap">
      <aside class="panel skillside">
        <h2 class="npch">${tx("Compétences")} <small>${SKILL_NODE_COUNT} ${tx("nœuds")}</small><span class="npcslot"></span></h2>
        <p class="skpts"></p>
        <p class="note">${tx("1 point tous les 2 niveaux, plus des points permanents gagnés à chaque ascension (et avec la constellation de l’Étoile polaire).\n        Ton chemin est conservé à l’ascension : il se réactive tout seul au fil des niveaux.")}</p>
        <div class="row k-autorow"><button data-action="k-auto" class="primary">${tx("Dépenser automatiquement")}</button></div>
        <div class="row k-lock"></div>
        <label class="toggle k-autolevel"><input type="checkbox" data-action="k-autoon"> ${tx("À chaque niveau, dépenser tout seul")}</label>
        <p class="note tight k-autorow">${tx("Prolonge le pétale le plus avancé, nœuds remarquables d’abord.")}</p>
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
    // (it. 1076, demande D de Victor) le grand graphe autour de la fleur (game/skillgraph.js), dessiné dessous, grisé
    // tant qu'il n'est pas ouvert : silhouette des voies et de l'anneau, sans icônes ni noms (étape D3)
    const G = SKILL_GRAPH.nodes, og = svg("g", { class: "skouter" }, g), GR = { gate: 11, small: 6, notable: 10, voiekey: 13, crown: 15 };
    for (const [a, b] of SKILL_GRAPH.toFlower) svg("line", { x1: N[a].x, y1: N[a].y, x2: G[b].x, y2: G[b].y, class: "gedge" }, og);
    for (const [a, b] of SKILL_GRAPH.edges) svg("line", { x1: G[a].x, y1: G[a].y, x2: G[b].x, y2: G[b].y, class: "gedge" }, og);
    this.gEdgeEls = SKILL_GRAPH.edges.map(([a, b], i) => ({ a, b, el: og.children[SKILL_GRAPH.toFlower.length + i] }));
    this.og = og;
    this.gNodeEls = {}; this.gIconEls = {};
    for (const id in G) {
      const n = G[id], r = GR[n.kind] || 6;
      const c = svg("circle", { cx: n.x, cy: n.y, r, class: "gnode " + n.kind, "data-action": "k-gtake", "data-gid": id }, og);
      c.style.setProperty("--c", SECTOR[n.region]?.color || "#ffd34d");
      this.gNodeEls[id] = c;
      // (it. 1077) icône (sur les nœuds de synergie : celle de l'axe d'origine) et nom des grands nœuds, visibles une fois ouvert
      const key = Object.keys(n.eff || {}).map((k) => SYN_ICON[k] || k)[0] || "root", sz = Math.round(r * 1.5);
      this.gIconEls[id] = svg("image", { href: skillIconURL(key), x: n.x - sz / 2, y: n.y - sz / 2, width: sz, height: sz, class: "nico gico sealed" }, og);
      if (n.kind !== "small") { const t = svg("text", { x: n.x, y: n.y + r + 10, class: "lbl glbl" }, og); t.textContent = n.kind === "gate" ? SECTOR[n.region].name : n.name; }
    }
    this.edgeEls = SKILL_TREE.edges.map(([a, b]) => ({ a, b, el: svg("line", { x1: N[a].x, y1: N[a].y, x2: N[b].x, y2: N[b].y }, g) }));
    this.nodeEls = {}; this.iconEls = {};
    for (const id in N) {
      const n = N[id], color = n.sector ? SECTOR[n.sector].color : "#ffd34d";
      const c = svg("circle", { cx: n.x, cy: n.y, r: RADIUS[n.kind], class: "node " + n.kind, "data-action": "k-take", "data-id": id }, g);
      c.style.setProperty("--c", color);
      this.nodeEls[id] = c;
      // Icône de l'effet du nœud, au centre (ne capte pas les clics : c'est le cercle qui réagit).
      const sz = Math.round(RADIUS[n.kind] * (n.kind === "small" ? 1.45 : 1.6));
      const im = svg("image", { href: skillIconURL(skillIconKey(n)), x: n.x - sz / 2, y: n.y - sz / 2, width: sz, height: sz, class: "nico" }, g);
      (this.iconEls ||= {})[id] = im;
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
      t.style.setProperty("--c", s.color); // couleur du secteur, assombrie en thème clair (styles.css)
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
    // (it. 1053) facteur de zoom du panneau (« Taille de l'interface ») : les coordonnées d'écran y sont ramenées
    const zf = () => { const w = box.offsetWidth; return w ? box.getBoundingClientRect().width / w : 1; };
    box.addEventListener("mousedown", (e) => { drag = { x: e.clientX, y: e.clientY, vx: this.view.x, vy: this.view.y, z: zf() }; this.dragged = false; });
    window.addEventListener("mousemove", (e) => {
      if (!drag) return;
      const dx = (e.clientX - drag.x) / drag.z, dy = (e.clientY - drag.y) / drag.z;
      if (Math.abs(dx) + Math.abs(dy) > 4) this.dragged = true;
      if (this.dragged) { this.view.x = drag.vx + dx; this.view.y = drag.vy + dy; this.applyView(); }
    });
    window.addEventListener("mouseup", () => { drag = null; });
    box.addEventListener("wheel", (e) => {
      e.preventDefault();
      const r = box.getBoundingClientRect(), z = zf(), mx = (e.clientX - r.left) / z, my = (e.clientY - r.top) / z;
      const k = Math.max(0.15, Math.min(3, this.view.k * (e.deltaY < 0 ? 1.15 : 1 / 1.15))); // (it. 1076) 0,15 : tout le grand graphe
      // Zoom centré sur le curseur
      this.view.x = mx - (mx - this.view.x) * (k / this.view.k);
      this.view.y = my - (my - this.view.y) * (k / this.view.k);
      this.view.k = k;
      this.applyView();
    }, { passive: false });
    const showTip = (target) => {
      const id = target.dataset && target.dataset.id, core = target.dataset && target.dataset.core, gid = target.dataset && target.dataset.gid;
      if (!id && !core && !gid) { tip.hidden = true; return; }
      tip.innerHTML = gid ? (flowerComplete(this.game.S) ? this.graphNodeTip(gid) : this.graphTip()) : core ? this.coreTip(core) : this.tipHtml(id);
      tip.hidden = false;
      const r = box.getBoundingClientRect(), t = target.getBoundingClientRect();
      tip.style.left = Math.min(r.width - 260, Math.max(4, t.left - r.left + 16)) + "px";
      tip.style.top = Math.max(4, t.top - r.top - 10) + "px";
    };
    box.addEventListener("mouseover", (e) => showTip(e.target));
    box.addEventListener("mouseleave", () => { tip.hidden = true; });
    // (it. 850) Au clavier : Tab passe d'un nœud apprenable à l'autre (les seuls focalisables), la vue se recadre
    // sur lui s'il sort du cadre, sa bulle s'affiche ; Entrée ou Espace l'apprend.
    box.addEventListener("focusin", (e) => {
      const n = (e.target.dataset && e.target.dataset.id) || (e.target.dataset && e.target.dataset.gid);
      if (!n) return;
      box.scrollTop = 0; box.scrollLeft = 0; // le navigateur fait défiler le cadre vers l'élément : la vue s'en charge
      this.reveal(n);
      showTip(e.target);
    });
    box.addEventListener("focusout", () => { tip.hidden = true; });
    box.addEventListener("keydown", (e) => {
      const gid = e.target.dataset && e.target.dataset.gid;
      if (gid && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); e.stopPropagation(); if (this.game.takeGraph(gid)) this.update(); return; }
      const id = e.target.dataset && e.target.dataset.id;
      if (!id || (e.key !== "Enter" && e.key !== " ")) return;
      e.preventDefault(); e.stopPropagation();
      this.takeByKey(id);
    });
  }

  /** Recadre la vue si le nœud est hors du cadre (ou trop près du bord). */
  reveal(id) {
    const box = this.el.querySelector(".skillview"), n = SKILL_TREE.nodes[id] || SKILL_GRAPH.nodes[id], w = box.clientWidth, h = box.clientHeight;
    const x = this.view.x + n.x * this.view.k, y = this.view.y + n.y * this.view.k, m = 40;
    if (x >= m && x <= w - m && y >= m && y <= h - m) return;
    this.view.x = w / 2 - n.x * this.view.k; this.view.y = h / 2 - n.y * this.view.k;
    this.applyView();
  }

  /** Apprend le nœud au clavier puis donne le focus au nœud apprenable le plus proche (le cercle appris ne
   *  l'est plus : sans cela, le focus retomberait au début de la page). */
  takeByKey(id) {
    if (!this.game.takeSkill(id)) return;
    this.update();
    const N = SKILL_TREE.nodes, a = N[id];
    let best = null, bd = Infinity;
    for (const k in this.nodeEls) {
      if (this.nodeEls[k].getAttribute("tabindex") !== "0") continue;
      const d = (N[k].x - a.x) ** 2 + (N[k].y - a.y) ** 2;
      if (d < bd) { bd = d; best = k; }
    }
    if (best) this.nodeEls[best].focus({ preventScroll: true });
  }

  /** Bulle du grand graphe encore fermé (it. 1076). */
  graphTip() {
    const S = this.game.S, done = activeSkillSet(S).size - 1;
    return `<b>${tx("Grand graphe")}</b><div class="sub">${tx("{0} nœuds autour de la fleur", { 0: SKILL_GRAPH_COUNT })}</div>
      <p>${tx("Des voies à choisir (une par pétale), des synergies et un anneau de couronnes : pour aller jusqu’au bout du Rebord.")}</p>
      <div class="note">${flowerComplete(S) ? tx("Bientôt : il s’ouvrira dans une prochaine mise à jour.") : tx("S’ouvre quand toute la fleur est acquise : {0} / {1} nœuds.", { 0: done, 1: SKILL_NODE_COUNT })}</div>`;
  }

  /** Bulle d'un nœud du grand graphe ouvert (it. 1077). */
  graphNodeTip(id) {
    const S = this.game.S, n = SKILL_GRAPH.nodes[id], outer = S.skills.outer || [], active = activeGraphSet(S);
    const region = SECTOR[n.region].name, voie = n.branch != null ? REGIONS[n.region][n.branch].name : "";
    const kind = { gate: tx("Porte · {0}", { 0: region }), small: voie || region, notable: tx("Nœud remarquable · ") + (voie || region), voiekey: tx("Clé de voie · {0}", { 0: voie }), crown: tx("Couronne · {0}", { 0: region }) }[n.kind];
    const chosen = n.branch != null ? chosenBranch(S, n.region) : -1;
    let state;
    if (active.has(id)) state = tx("Acquis.");
    else if (outer.includes(id)) state = tx("Dans ton chemin : se réactivera avec plus de points.");
    else if (chosen >= 0 && chosen !== n.branch) state = tx("Voie fermée : dans cette région, tu suis « {0} ».", { 0: REGIONS[n.region][chosen].name });
    else if (canTakeGraph(S, id)) state = tx("Clic pour l’apprendre (1 point).") + (n.group ? " " + tx("Choisir cette voie ferme les deux autres de la région.") : "");
    else if (graphPointsFree(S) <= 0) state = tx("Plus de point libre.");
    else state = tx("Doit être relié à un nœud acquis.");
    return `<b>${esc(n.name || (n.kind === "small" ? tx("Compétence") : ""))}</b><div class="sub">${esc(kind)}</div>
      <p class="delta-p">${esc(describeEffects(n.eff || {}))}</p><div class="note">${esc(state)}</div>`;
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
      if (this.nodeEls[id].getAttribute("class") !== cls) {
        this.nodeEls[id].setAttribute("class", cls);
        // (it. 850) seuls les nœuds apprenables entrent dans l'ordre de tabulation
        if (st === "avail") {
          this.nodeEls[id].setAttribute("tabindex", "0");
          this.nodeEls[id].setAttribute("role", "button");
          this.nodeEls[id].setAttribute("aria-label", (n.name ? n.name + " · " : "") + describeEffects(n.eff || {}));
        } else { this.nodeEls[id].removeAttribute("tabindex"); this.nodeEls[id].removeAttribute("role"); }
      }
      const icls = "nico " + st;
      if (this.iconEls && this.iconEls[id] && this.iconEls[id].getAttribute("class") !== icls) this.iconEls[id].setAttribute("class", icls);
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
    // (it. 1077) grand graphe : grisé tant que la fleur n'est pas complète, puis acquis / prévu / prenable / fermé
    const open = flowerComplete(S), gActive = activeGraphSet(S), gPlanned = new Set(S.skills.outer || []), closed = {};
    this.og.classList.toggle("open", open);
    for (const reg in REGIONS) closed[reg] = chosenBranch(S, reg);
    for (const id in this.gNodeEls) {
      const n = SKILL_GRAPH.nodes[id];
      const st = !open ? "sealed" : gActive.has(id) ? "on" : gPlanned.has(id) ? "planned" : n.branch != null && closed[n.region] >= 0 && closed[n.region] !== n.branch ? "closed" : canTakeGraph(S, id) ? "avail" : "locked";
      const cls = `gnode ${n.kind} ${st}`, el = this.gNodeEls[id];
      if (el.getAttribute("class") !== cls) {
        el.setAttribute("class", cls);
        if (st === "avail") { el.setAttribute("tabindex", "0"); el.setAttribute("role", "button"); el.setAttribute("aria-label", (n.name ? n.name + " · " : "") + describeEffects(n.eff || {})); }
        else { el.removeAttribute("tabindex"); el.removeAttribute("role"); }
        this.gIconEls[id].setAttribute("class", "nico gico " + st);
      }
    }
    for (const e of this.gEdgeEls) {
      const cls = "gedge" + (!open ? "" : gActive.has(e.a) && gActive.has(e.b) ? " on" : "");
      if (e.el && e.el.getAttribute("class") !== cls) e.el.setAttribute("class", cls);
    }
    // (it. 1093) Iris, la jardinière : l'onglet n'est construit qu'une fois, sa pastille se met à jour ici
    const slot = this.el.querySelector(".npcslot"), nh = npcHTML("skills", "icon");
    if (slot && slot.innerHTML !== nh) slot.innerHTML = nh;
    const total = skillPointsTotal(S), free = skillPointsFree(S), used = active.size - 1;
    // (it. 1016) arbre entièrement appris : « 362 points libres · 144 / 144 » laissait croire qu'il restait à faire
    if (used >= SKILL_NODE_COUNT) this.el.querySelector(".skpts").innerHTML = `<span class="delta-p">${tx("✓ Arbre complet · {0} points au total", { 0: total })}</span><br>`
      + txn(graphPointsFree(S), "Grand graphe : {n} point libre · {2} / {3} nœuds|Grand graphe : {n} points libres · {2} / {3} nœuds", { n: `<b class="gold">${graphPointsFree(S)}</b>`, 2: gActive.size, 3: SKILL_GRAPH_COUNT });
    else this.el.querySelector(".skpts").innerHTML = `${txn(free, "{n} point libre · {2} / {3} nœuds actifs · {4} points au total|{n} points libres · {2} / {3} nœuds actifs · {4} points au total", { n: `<b class="gold">${free}</b>`, 2: used, 3: SKILL_NODE_COUNT, 4: total })}${S.skills.order.length > used ? `<br><span class="note">${txn(S.skills.order.length - used, "{n} nœud en attente de points.|{n} nœuds en attente de points.")}</span>` : ""}`;
    const eff = skillTreeEffects(S);
    for (const [k, v] of Object.entries(skillGraphEffects(S))) eff[k] = (eff[k] || 0) + v; // (it. 1077) grand graphe compris
    const lines = Object.keys(eff).map((k) => `<li><span>${esc(describeEffects({ [k]: eff[k] }))}</span></li>`).join("");
    this.el.querySelector(".sktotal").innerHTML = lines || `<li><span class="note">${tx("Aucun pour l’instant : commence près de l’origine.")}</span></li>`;
    const bulk = hasUnlock(S, "bulkPoints");
    for (const e of this.el.querySelectorAll(".k-autorow")) e.hidden = !bulk;
    const lk = this.el.querySelector(".k-lock"), lkHtml = lockLink(S, "bulkPoints");
    if (lk.innerHTML !== lkHtml) lk.innerHTML = lkHtml;
    lk.hidden = bulk;
    this.el.querySelector(".k-autolevel").hidden = !hasUnlock(S, "autoLevel");
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
    else if (a === "k-gtake") { if (!this.dragged) g.takeGraph(b.dataset.gid); }
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
