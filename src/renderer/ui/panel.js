// Panneau de gestion, en onglets :
//   Aventure (héros, sac, objet, zone, journal) · Talents · Boutique · Classe
// Chaque onglet hors Aventure est un module de ui/tabs/ avec render(el),
// onAction(action, bouton) et tick(). Ajouter un onglet = un module + une
// entrée dans TABS. Le panneau ne touche à l'état qu'à travers Game.
import { RARITIES, SLOTS, SLOT_KEYS, STAT_NAMES, KILLS_PER_ZONE, MAX_PLUS, DROP_CHANCE, MONSTERS, ELITE } from "../game/data.js";
import { forgeCost, reforgeCost, sellValue, monsterBase, itemMult } from "../game/rules.js";
import { CONSUMABLES } from "../game/shop.js";
import { fmt, fmtStat, esc, NB } from "../game/format.js";
import { itemIconURL, classPortraitURL, dressedPortraitURL } from "../render/sprites.js";
import { heroVisual } from "../render/equipvis.js";
import { TalentsTab } from "./tabs/talents.js";
import { ShopTab } from "./tabs/shop.js";
import { ClassesTab } from "./tabs/classes.js";
import { QuestsTab } from "./tabs/quests.js";
import { PetsTab } from "./tabs/pets.js";
import { AscensionTab } from "./tabs/ascension.js";
import { BestiaryTab } from "./tabs/bestiary.js";
import { SkillsTab } from "./tabs/skills.js";
import { StatsTab } from "./tabs/stats.js";
import { SettingsTab } from "./tabs/settings.js";
import { POWER_INDEX } from "../game/powers.js";
import { describeEffects } from "../game/talents.js";
import { SETS, setCounts } from "../game/sets.js";
import { EVENTS } from "../game/events.js";
import { BOSS_MECHANICS, bossMechanics } from "../game/bosses.js";

const $ = (root, s) => root.querySelector(s);
/** Lignes « pouvoir légendaire » et « panoplie » d'un objet (ou rien). */
export const power = (it, equip) => {
  const p = it.power && POWER_INDEX[it.power];
  let out = p ? `<p class="power"><b>★ ${esc(p.name)}</b> : ${esc(describeEffects(p.eff))}</p>` : "";
  const st = it.set && SETS[it.set];
  if (st) {
    const n = equip ? setCounts(equip)[it.set] || 0 : 0;
    out += `<p class="setline" style="--c:${st.color}"><b>◆ ${esc(st.name)}</b>${equip ? ` (${n}/4 portées)` : ""}<br>
      <span class="${n >= 2 ? "on" : ""}">2 pièces : ${esc(describeEffects(st.two))}</span><br>
      <span class="${n >= 4 ? "on" : ""}">4 pièces : ${esc(describeEffects(st.four))}</span></p>`;
  }
  return out;
};
const TABS = [
  { id: "adventure", label: "Aventure" },
  { id: "talents", label: "Talents", prefix: "t-" },
  { id: "skills", label: "Compétences", prefix: "k-" },
  { id: "quests", label: "Quêtes", prefix: "q-" },
  { id: "shop", label: "Boutique", prefix: "s-" },
  { id: "pets", label: "Familiers", prefix: "p-" },
  { id: "class", label: "Classe", prefix: "c-" },
  { id: "ascension", label: "Ascension", prefix: "a-" },
  { id: "bestiary", label: "Bestiaire", prefix: "b-" },
  { id: "stats", label: "Statistiques", prefix: "st-" },
  { id: "settings", label: "Réglages", prefix: "se-" },
];
const n1 = (v) => (Math.round(v * 10) / 10).toString().replace(".", ",");
// Statistiques secondaires affichées seulement si non nulles.
const EXTRA_STATS = [
  ["critDmg", "Dégâts critiques", (s) => s.critDmg !== 2, (s) => "×" + n1(s.critDmg)],
  ["xp", "Expérience bonus", (s) => s.xp > 0, (s) => "+" + n1(s.xp) + NB + "%"],
  ["drop", "Chances de butin", (s) => s.drop > 0, (s) => "+" + n1(s.drop) + NB + "%"],
  ["dodge", "Esquive", (s) => s.dodge > 0, (s) => n1(s.dodge) + NB + "%"],
  ["riposte", "Riposte", (s) => s.riposte > 0, (s) => n1(s.riposte) + NB + "%"],
  ["doubleShot", "Tir double", (s) => s.doubleShot > 0, (s) => n1(s.doubleShot) + NB + "%"],
  ["burn", "Brûlure", (s) => s.burn > 0, (s) => n1(s.burn) + NB + "% / s"],
  ["lifesteal", "Vol de vie", (s) => s.lifesteal > 0, (s) => n1(s.lifesteal) + NB + "%"],
  ["execute", "Coup de grâce", (s) => s.execute > 0, (s) => "+" + n1(s.execute) + NB + "%"],
  ["bossDmg", "Dégâts aux boss", (s) => s.bossDmg > 0, (s) => "+" + n1(s.bossDmg) + NB + "%"],
  ["secondWind", "Second souffle", (s) => s.secondWind, () => "oui"],
  ["moveSpd", "Vitesse de déplacement", (s) => s.moveSpd > 0, (s) => "+" + n1(s.moveSpd) + NB + "%"],
];

export class Panel {
  constructor(root, game, { isDev = false, speed = 1, onSpeed, onClose, onReset, onMini, onQuit, settings } = {}) {
    this.root = root;
    this.game = game;
    this.isDev = isDev;
    this.speed = speed;
    Object.assign(this, { onSpeed, onClose, onReset, onMini, onQuit });
    this.selected = null;
    this.tab = "adventure";
    this.tabs = {
      talents: new TalentsTab(game), skills: new SkillsTab(game), quests: new QuestsTab(game), shop: new ShopTab(game), pets: new PetsTab(game),
      class: new ClassesTab(game), ascension: new AscensionTab(game), bestiary: new BestiaryTab(game), stats: new StatsTab(game),
      settings: new SettingsTab(game, settings),
    };
    this.dirty = true;
    this.isOpen = false;
    this.uiT = 0;
    this.build();
    game.on("change", () => { this.dirty = true; });
    game.on("log", () => { if (this.isOpen && this.tab === "adventure") this.renderLog(); });
  }

  build() {
    const dev = this.isDev ? `
      <div class="controls" role="group" aria-label="Vitesse de test">
        <span class="devtag">DEV</span>
        <button data-speed="1" aria-pressed="${this.speed === 1}">×1</button>
        <button data-speed="3" aria-pressed="${this.speed === 3}">×3</button>
        <button data-speed="10" aria-pressed="${this.speed === 10}">×10</button>
      </div>` : "";
    this.root.innerHTML = `
      <header class="ptop">
        <h1>Sillwalker</h1>
        <nav class="tabs" role="tablist">${TABS.map((t) => `<button role="tab" data-tab="${t.id}" aria-selected="${t.id === this.tab}">${t.label}<span class="tbadge" data-badge="${t.id}" hidden></span></button>`).join("")}</nav>
        <div class="controls">
          ${dev}
          <button data-action="reset" class="quiet">Recommencer</button>
          <button data-action="mini" class="quiet" title="Réduire en petit encart près de l’horloge">Mode mini</button>
          <button data-action="quit" class="quiet quit" title="Quitter Sillwalker (la partie est sauvegardée)">Quitter</button>
          <button data-action="close" class="close" aria-label="Fermer le panneau" title="Fermer (Échap)">✕</button>
        </div>
      </header>
      <section class="tabpane" data-pane="adventure">
        <div class="grid">
          <article class="panel" id="p-hero"></article>
          <article class="panel" id="p-bag"></article>
          <article class="panel" id="p-detail"></article>
          <article class="panel" id="p-zone"></article>
          <article class="panel" id="p-log"><h2>Journal</h2><ul class="log" id="log"></ul></article>
        </div>
      </section>
      ${TABS.slice(1).map((t) => `<section class="tabpane" data-pane="${t.id}" hidden></section>`).join("")}
      <div class="modal" id="confirm" hidden>
        <div class="panel" role="alertdialog" aria-modal="true" aria-labelledby="ct">
          <h2 id="ct"></h2>
          <p id="cbody"></p>
          <div class="row"><button data-action="confirm-ok" class="primary"></button><button data-action="confirm-cancel">Annuler</button></div>
        </div>
      </div>
      <div class="modal" id="modal" hidden>
        <div class="panel" role="dialog" aria-modal="true" aria-labelledby="mt">
          <h2 id="mt">Pendant ton absence</h2>
          <div id="mbody"></div>
          <div class="row"><button data-action="closemodal">Continuer</button></div>
        </div>
      </div>`;
    this.root.addEventListener("click", (e) => this.onClick(e));
    this.root.addEventListener("change", (e) => this.onChange(e));
    // Infobulle de comparaison au survol d'un objet (sac ou équipement)
    this.tip = document.createElement("div");
    this.tip.className = "itemtip";
    this.tip.hidden = true;
    this.root.appendChild(this.tip);
    this.root.addEventListener("mouseover", (e) => this.onHover(e));
    this.root.addEventListener("mouseleave", () => { this.tip.hidden = true; });
  }

  /* ---------- Cycle de vie ---------- */
  setOpen(open) {
    this.isOpen = open;
    if (open) { this.dirty = true; this.update(1); }
  }

  /** Appelé à chaque image tant que le panneau est ouvert. */
  update(dt) {
    if (!this.isOpen) return;
    if (this.dirty) this.renderAll();
    else if ((this.uiT += dt) > 0.4) { this.uiT = 0; this.tick(); }
  }

  setTab(id) {
    if (!TABS.some((t) => t.id === id)) return;
    this.tab = id;
    for (const b of this.root.querySelectorAll("[data-tab]")) b.setAttribute("aria-selected", String(b.dataset.tab === id));
    for (const p of this.root.querySelectorAll("[data-pane]")) p.hidden = p.dataset.pane !== id;
    this.root.scrollTop = 0;
    this.renderAll();
  }

  showOfflineSummary(sum) {
    const best = sum.best >= 0 ? `<li><span>Meilleur butin</span><b class="rc${sum.best}">${RARITIES[sum.best].name}</b></li>` : "";
    $(this.root, "#mbody").innerHTML =
      `<p>Ton héros a continué de farmer ${esc(sum.zone)} pendant ${esc(sum.duration)}.</p>
      <ul class="lines">
        <li><span>Monstres vaincus</span><b>${fmt(sum.kills)}</b></li>
        <li><span>Or gagné</span><b>+${fmt(sum.gold)}</b></li>
        <li><span>Expérience</span><b>+${fmt(sum.xp)}</b></li>
        ${sum.newLevel ? `<li><span>Nouveau niveau</span><b>${sum.newLevel}</b></li>` : ""}
        <li><span>Objets gardés</span><b>${sum.kept}</b></li>${best}
      </ul>
      <p class="note">La progression hors ligne est plafonnée à 8 h et rapporte un peu moins que de laisser le jeu ouvert.</p>`;
    this.setTab("adventure");
    $(this.root, "#modal").hidden = false;
    $(this.root, "#modal button").focus();
  }

  /* ---------- Rendu ---------- */
  renderAll() {
    if (this.tip) this.tip.hidden = true;
    if (this.tab === "adventure") { this.renderHero(); this.renderBag(); this.renderDetail(); this.renderZone(); this.renderLog(); }
    else this.tabs[this.tab].render($(this.root, `[data-pane="${this.tab}"]`));
    this.renderBadges();
    this.dirty = false;
  }

  renderBadges() {
    for (const t of TABS) {
      const tab = this.tabs[t.id], text = tab ? tab.badge() : "";
      const el = $(this.root, `[data-badge="${t.id}"]`);
      if (el.textContent !== text) el.textContent = text;
      el.hidden = !text;
    }
  }

  slotBtn(it, slotKey, from) {
    if (!it) return `<button class="slot" data-action="sel" data-from="equip" data-slot="${slotKey}" aria-label="${SLOTS[slotKey].name} vide"><span class="lab">${SLOTS[slotKey].name}</span></button>`;
    const sel = this.selected && ((this.selected.from === "equip" && this.selected.slot === slotKey && from === "equip") ||
      (this.selected.from === "bag" && this.selected.id === it.id && from === "bag"));
    const up = from === "bag" && this.game.isUpgrade(it);
    return `<button class="slot rb${it.r}${sel ? " sel" : ""}" data-action="sel" data-from="${from}" ${from === "bag" ? `data-id="${it.id}"` : `data-slot="${slotKey}"`}
      aria-label="${esc(it.name)}, ${RARITIES[it.r].name}${up ? ", amélioration" : ""}">
      <img src="${itemIconURL(it)}" alt="">${it.plus ? `<span class="plus">+${it.plus}</span>` : ""}${up ? `<span class="up" aria-hidden="true">▲</span>` : ""}${it.set && SETS[it.set] ? `<span class="setmark" style="color:${SETS[it.set].color}" aria-hidden="true">◆</span>` : ""}</button>`;
  }

  /** Survol d'un emplacement : infobulle avec statistiques et comparaison. */
  onHover(e) {
    const b = e.target.closest && e.target.closest(".slot[data-from]");
    const it = b && (b.dataset.from === "bag" ? this.game.findBagItem(+b.dataset.id) : this.game.S.equip[b.dataset.slot]);
    if (!it) { this.tip.hidden = true; return; }
    const S = this.game.S, fromBag = b.dataset.from === "bag", cur = fromBag ? S.equip[it.slot] : null, m = itemMult(it);
    const lines = Object.keys(STAT_NAMES).filter((k) => it.st[k] != null || (cur && cur.st[k] != null)).map((k) => {
      const v = (it.st[k] || 0) * m, dv = fromBag ? v - (cur ? (cur.st[k] || 0) * itemMult(cur) : 0) : 0;
      const d = fromBag && Math.abs(dv) >= 0.05 ? ` <span class="${dv > 0 ? "delta-p" : "delta-n"}">(${dv > 0 ? "+" : "−"}${fmtStat(k, Math.abs(dv))})</span>` : "";
      return `<li><span>${STAT_NAMES[k]}</span><span>${v ? "+" + fmtStat(k, v) : "—"}${d}</span></li>`;
    }).join("");
    let verdict = "";
    if (fromBag) {
      const dd = this.game.upgradeDelta(it);
      verdict = `<p class="verdict ${dd > 0.005 ? "delta-p" : dd < -0.005 ? "delta-n" : ""}">${cur ? "Puissance : " + (dd >= 0 ? "+" : "−") + Math.abs(Math.round(dd * 100)) + NB + "%" : "Emplacement vide : à équiper !"}</p>`;
    }
    this.tip.innerHTML = `<div class="nm rc${it.r}">${esc(it.name)}${it.plus ? " +" + it.plus : ""}</div>
      <div class="sub">${SLOTS[it.slot].name} ${RARITIES[it.r].name.toLowerCase()}, niveau ${it.il}${fromBag ? "" : ", équipé"}</div>
      <ul class="lines">${lines}</ul>${power(it, S.equip)}${verdict}`;
    this.tip.hidden = false;
    const r = b.getBoundingClientRect(), pr = this.root.getBoundingClientRect();
    const left = Math.min(pr.width - 280, r.right - pr.left + 8), top = Math.max(4, Math.min(pr.height - this.tip.offsetHeight - 4, r.top - pr.top + this.root.scrollTop));
    this.tip.style.left = left + "px";
    this.tip.style.top = top + "px";
  }

  renderHero() {
    const g = this.game, S = g.S, hs = g.stats(), cls = g.classDef();
    const extra = EXTRA_STATS.filter(([, , show]) => show(hs)).map(([, label, , val]) => `<dt>${label}</dt><dd>${val(hs)}</dd>`).join("");
    const buffs = CONSUMABLES.filter((c) => c.kind === "buff" && (S.buffs[c.id] || 0) > 0)
      .map((c) => `<span class="chip" title="${esc(c.desc)}">${esc(c.name)} · <span data-buff="${c.id}">${Math.ceil(S.buffs[c.id] / 60)} min</span></span>`).join("");
    const free = g.talentPointsFree();
    const sets = Object.entries(setCounts(S.equip)).filter(([id, n]) => SETS[id] && n >= 2)
      .map(([id, n]) => `<span class="chip" style="--c:${SETS[id].color};border-color:${SETS[id].color};color:${SETS[id].color}">◆ ${esc(SETS[id].name)} ${n}/4</span>`).join("");
    const events = Object.entries(g.R.events).filter(([, t]) => t > 0)
      .map(([id, t]) => `<span class="chip event" style="--c:${EVENTS[id].color}">${esc(EVENTS[id].name)} · ${Math.ceil(t)} s</span>`).join("");
    $(this.root, "#p-hero").innerHTML = `<h2><span class="hname"><img src="${classPortraitURL(S.cls)}" alt="">${esc(cls.name)}</span> <small>niveau ${S.lvl}</small></h2>
      <div class="kv"><span>Expérience</span><span id="xptxt"></span></div><div class="bar"><i id="xpbar"></i></div>
      <dl class="stats">${Object.keys(STAT_NAMES).map((k) => `<dt>${STAT_NAMES[k]}</dt><dd>${fmtStat(k, hs[k])}</dd>`).join("")}${extra}
      <dt>Potions de soin</dt><dd>${S.potions}</dd><dt>Or</dt><dd id="goldtxt"></dd>
      ${S.prestige.count ? `<dt>Ascensions</dt><dd>${S.prestige.count} · ✦ ${S.prestige.shards}</dd>` : ""}</dl>
      ${buffs || events || sets ? `<div class="chips">${sets}${events}${buffs}</div>` : ""}
      ${free > 0 ? `<button class="linkbtn" data-tab="talents">${free} point${free > 1 ? "s" : ""} de talent à dépenser →</button>` : ""}
      <div class="heroview">
        <img class="heroport${heroVisual(S).aura ? " legend" : ""}" src="${dressedPortraitURL(S.cls, heroVisual(S))}" alt="Ton héros et son équipement">
        <div class="equip">${SLOT_KEYS.map((k) => this.slotBtn(S.equip[k], k, "equip")).join("")}</div>
      </div>`;
    this.tick();
  }

  renderBag() {
    const S = this.game.S, cells = [];
    const useless = this.game.uselessItems(), uselessGold = useless.reduce((a, it) => a + sellValue(it), 0);
    for (let i = 0; i < S.bagSize; i++) {
      const it = S.bag[i];
      cells.push(it ? this.slotBtn(it, it.slot, "bag") : `<div class="slot emptyslot" aria-hidden="true"></div>`);
    }
    $(this.root, "#p-bag").innerHTML = `<h2>Sac <small>${S.bag.length} / ${S.bagSize}</small></h2><div class="bag">${cells.join("")}</div>
      <div class="row"><button data-action="sellless"${useless.length ? "" : " disabled"} title="Vend tout ce qui n’est pas plus puissant que ton équipement actuel. Les légendaires sont toujours gardés.">Vendre ce qui ne m’améliore pas${useless.length ? ` (${useless.length} · ${fmt(uselessGold)} or)` : ""}</button>
      <button data-action="autoequip"${this.game.hasUpgrade() ? "" : " disabled"}>Équiper le meilleur</button></div>
      <label class="toggle"><input type="checkbox" data-action="as" data-r="common"${S.autoSell.common ? " checked" : ""}> Vendre les communs dès qu’ils tombent</label>
      <label class="toggle"><input type="checkbox" data-action="as" data-r="uncommon"${S.autoSell.uncommon ? " checked" : ""}> Vendre les peu communs dès qu’ils tombent</label>
      <label class="toggle"><input type="checkbox" data-action="as" data-r="rare"${S.autoSell.rare ? " checked" : ""}> Vendre les rares dès qu’ils tombent</label>
      <p class="note">▲ signale un objet plus puissant que ce que porte ton héros.</p>`;
  }

  getSel() {
    const s = this.selected;
    if (!s) return null;
    return s.from === "equip" ? this.game.S.equip[s.slot] : this.game.findBagItem(s.id);
  }

  renderDetail() {
    const it = this.getSel(), el = $(this.root, "#p-detail"), S = this.game.S;
    if (!it) { el.innerHTML = `<h2>Objet</h2><p class="empty">Choisis un objet dans le sac ou sur ton héros pour le comparer, l’équiper, le vendre ou l’améliorer à la forge.</p>`; return; }
    const fromBag = this.selected.from === "bag";
    const r = RARITIES[it.r], m = itemMult(it), cur = fromBag ? S.equip[it.slot] : null;
    const keys = Object.keys(STAT_NAMES).filter((k) => it.st[k] != null || (cur && cur.st[k] != null));
    const lines = keys.map((k) => {
      const v = (it.st[k] || 0) * m;
      let d = "";
      if (fromBag) {
        const dv = v - (cur ? (cur.st[k] || 0) * itemMult(cur) : 0);
        if (Math.abs(dv) >= 0.05) d = ` <span class="${dv > 0 ? "delta-p" : "delta-n"}">(${dv > 0 ? "+" : "−"}${fmtStat(k, Math.abs(dv))})</span>`;
      }
      return `<li><span>${STAT_NAMES[k]}</span><span>${v ? "+" + fmtStat(k, v) : "—"}${d}</span></li>`;
    }).join("");
    let verdict = "";
    if (fromBag) {
      const d = this.game.upgradeDelta(it);
      verdict = `<p class="verdict ${d > 0.005 ? "delta-p" : d < -0.005 ? "delta-n" : ""}">${cur ? "Puissance du héros : " + (d >= 0 ? "+" : "−") + Math.abs(Math.round(d * 100)) + NB + "%" : "Emplacement vide : à équiper !"}</p>`;
    }
    const fc = forgeCost(it), canForge = it.plus < MAX_PLUS && S.gold >= fc;
    el.innerHTML = `<h2>Objet</h2>
      <div class="detail-head"><img src="${itemIconURL(it)}" alt=""><div>
        <div class="nm rc${it.r}">${esc(it.name)}${it.plus ? " +" + it.plus : ""}</div>
        <div class="sub">${SLOTS[it.slot].name} ${r.name.toLowerCase()}, niveau ${it.il}${fromBag ? "" : ", équipé"}</div></div></div>
      <ul class="lines">${lines}</ul>${power(it, S.equip)}${verdict}
      <div class="row">${fromBag
        ? `<button data-action="equip">Équiper</button><button data-action="sell">Vendre (${fmt(sellValue(it))} or)</button>`
        : `<button data-action="unequip"${this.game.bagFull() ? " disabled" : ""}>Retirer</button>`}
        ${RARITIES[it.r].affixes ? `<button data-action="reforge"${S.gold >= reforgeCost(it) ? "" : " disabled"} title="Tire au hasard de nouveaux bonus secondaires. Rareté, forge, pouvoir et panoplie sont conservés.">Réforger (${fmt(reforgeCost(it))} or)</button>` : ""}
        <button data-action="forge"${canForge ? "" : " disabled"}>${it.plus >= MAX_PLUS ? "Amélioration maximale" : `Forger +${it.plus + 1} (${fmt(fc)} or)`}</button></div>
      <p class="note">Chaque niveau de forge ajoute 10${NB}% à toutes les statistiques de l’objet. La forge ne peut pas échouer.</p>`;
  }

  renderZone() {
    const S = this.game.S, Z = this.game.zoneDef(), b = monsterBase(S.zone, false), bb = monsterBase(S.zone, true, Z.boss);
    const rows = RARITIES.map((r, i) => `<tr><td class="rc${i}">${r.name}</td><td>${r.weight}${NB}%</td></tr>`).join("");
    const names = Z.monsters.map((m) => MONSTERS[m].name);
    const list = names.length > 1 ? names.slice(0, -1).join(", ") + " et " + names[names.length - 1].toLowerCase() : names[0];
    $(this.root, "#p-zone").innerHTML = `<h2>Zone ${S.zone} <small>record : ${S.best}</small></h2>
      <p class="zname">${esc(this.game.zoneName())}</p>
      <p class="note tight">${esc(list)} : ~${fmt(b.hp)} PV. Boss (${esc(MONSTERS[Z.boss].name.toLowerCase())}) : ${fmt(bb.hp)} PV.</p>
      <p class="note tight bossmech">Capacité${bossMechanics(S.zone).length > 1 ? "s" : ""} du boss : ${bossMechanics(S.zone).map((id) => `<b title="${esc(BOSS_MECHANICS[id].desc)}">${esc(BOSS_MECHANICS[id].name)}</b>`).join(", ")}.</p>
      <div class="kv"><span>Avant le boss</span><span id="killtxt"></span></div><div class="bar"><i id="killbar"></i></div>
      <label class="toggle"><input type="checkbox" data-action="adv"${S.autoAdvance ? " checked" : ""}> Passer à la zone suivante après le boss</label>
      <div class="row"><button data-action="zprev"${S.zone > 1 ? "" : " disabled"}>Zone précédente</button>
      <button data-action="znext"${S.zone < S.best ? "" : " disabled"}>Zone suivante</button></div>
      <h3>Chances de butin</h3>
      <p class="note tight">${Math.round(DROP_CHANCE * 100)}${NB}% par monstre, 100${NB}% sur le boss (rare minimum) et sur les élites dorés (${Math.round(ELITE.chance * 100)}${NB}% des monstres, or ×${ELITE.gold}). Si un objet tombe, sa rareté suit ce tableau :</p>
      <table class="rates">${rows}</table><p class="note">Ces taux sont fixes et identiques pour tout le monde. Élites vaincus : ${S.stats.elites || 0}.</p>`;
    this.tick();
  }

  renderLog() {
    const el = $(this.root, "#log"), L = this.game.S.log;
    el.innerHTML = L.length ? L.slice(0, 25).map((l) => `<li>${esc(l)}</li>`).join("") : "<li>Ton héros se met en route.</li>";
  }

  /** Mises à jour légères (barres, or, comptes à rebours) sans reconstruire le HTML. */
  tick() {
    if (this.tab !== "adventure") {
      if (this.tabs[this.tab].tick()) this.renderAll();
      return;
    }
    const S = this.game.S, r = this.root;
    const xb = $(r, "#xpbar");
    if (xb) {
      xb.style.width = (100 * S.xp / this.game.xpNeed()) + "%";
      $(r, "#xptxt").textContent = fmt(S.xp) + " / " + fmt(this.game.xpNeed());
      $(r, "#goldtxt").textContent = fmt(S.gold);
    }
    const kb = $(r, "#killbar");
    if (kb) {
      kb.style.width = (100 * Math.min(S.kills, KILLS_PER_ZONE) / KILLS_PER_ZONE) + "%";
      $(r, "#killtxt").textContent = S.kills >= KILLS_PER_ZONE ? "Boss en approche" : S.kills + " / " + KILLS_PER_ZONE;
    }
  }

  /* ---------- Interactions ---------- */
  onClick(e) {
    const t = e.target.closest("[data-tab]");
    if (t) { this.setTab(t.dataset.tab); return; }
    const b = e.target.closest("[data-action],[data-speed]");
    if (!b || b.disabled) return;
    const g = this.game;
    if (b.dataset.speed) {
      this.root.querySelectorAll("[data-speed]").forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
      this.onSpeed?.(+b.dataset.speed);
      return;
    }
    const a = b.dataset.action;
    const owner = TABS.find((x) => x.prefix && a.startsWith(x.prefix));
    if (owner) { this.tabs[owner.id].onAction(a, b); this.renderAll(); return; }
    const it = this.getSel();
    switch (a) {
      case "sel":
        this.selected = b.dataset.from === "bag" ? { from: "bag", id: +b.dataset.id } : { from: "equip", slot: b.dataset.slot };
        if (b.dataset.from === "equip" && !g.S.equip[b.dataset.slot]) this.selected = null;
        break;
      case "equip": if (it) { g.equip(it); this.selected = { from: "equip", slot: it.slot }; } break;
      case "sell": if (it) { g.sell(it); this.selected = null; } break;
      case "unequip": if (it && g.unequip(it.slot)) this.selected = { from: "bag", id: it.id }; break;
      case "forge": if (it) g.forge(it); break;
      case "reforge": if (it) g.reforge(it); break;
      case "sellless": {
        const n = g.uselessItems().length;
        this.confirm("Vendre les objets inutiles ?", `${n} objet(s) qui n’améliorent pas ton héros seront vendus. Les légendaires sont toujours gardés.`, "Vendre", () => {
          g.sellUseless();
          if (this.selected?.from === "bag" && !this.getSel()) this.selected = null;
          this.renderAll();
        });
        return;
      }
      case "confirm-ok": { const fn = this.confirmFn; this.closeConfirm(); fn?.(); return; }
      case "confirm-cancel": this.closeConfirm(); return;
      case "autoequip": g.autoEquip(); this.selected = null; break;
      case "zprev": g.setZone(g.S.zone - 1); break;
      case "znext": g.setZone(g.S.zone + 1); break;
      case "closemodal": $(this.root, "#modal").hidden = true; return;
      case "close": this.onClose?.(); return;
      case "mini": this.onMini?.(); return;
      case "quit": this.confirm("Quitter Sillwalker ?", "Ta partie est sauvegardée. Ton héros continuera de progresser hors ligne (jusqu’à 8 h).", "Quitter le jeu", () => this.onQuit?.()); return;
      case "reset": this.confirmReset(b); return;
      default: return;
    }
    this.renderAll();
  }

  /** Petite fenêtre de confirmation dans le panneau. */
  confirm(title, text, okLabel, onOk) {
    $(this.root, "#ct").textContent = title;
    $(this.root, "#cbody").textContent = text;
    const ok = $(this.root, '[data-action="confirm-ok"]');
    ok.textContent = okLabel;
    this.confirmFn = onOk;
    $(this.root, "#confirm").hidden = false;
    ok.focus();
  }
  closeConfirm() { $(this.root, "#confirm").hidden = true; this.confirmFn = null; }

  confirmReset(b) {
    if (b.dataset.armed) {
      this.selected = null;
      this.onReset?.();
      this.renderAll();
      delete b.dataset.armed; b.textContent = "Recommencer"; b.classList.remove("danger");
      return;
    }
    b.dataset.armed = "1"; b.textContent = "Effacer la partie ? Cliquer pour confirmer"; b.classList.add("danger");
    setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = "Recommencer"; b.classList.remove("danger"); } }, 4000);
  }

  onChange(e) {
    const b = e.target;
    if (b.dataset.action === "se-volume") { this.tabs.settings.onAction("se-volume", b); this.renderAll(); return; }
    if (b.dataset.action === "as") this.game.setAutoSell(b.dataset.r, b.checked);
    if (b.dataset.action === "adv") this.game.setAutoAdvance(b.checked);
  }

  /** Échap : ferme la modale si ouverte, sinon demande la fermeture du panneau. */
  onEscape() {
    if (!$(this.root, "#confirm").hidden) { this.closeConfirm(); return; }
    const m = $(this.root, "#modal");
    if (!m.hidden) { m.hidden = true; return; }
    this.onClose?.();
  }
}
