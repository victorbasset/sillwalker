// Panneau de gestion, en onglets :
//   Aventure (héros, sac, objet, zone, journal) · Talents · Boutique · Classe
// Chaque onglet hors Aventure est un module de ui/tabs/ avec render(el),
// onAction(action, bouton) et tick(). Ajouter un onglet = un module + une
// entrée dans TABS. Le panneau ne touche à l'état qu'à travers Game.
import { itemName } from "../i18n/data.js";
import { t as tx, plS, lc } from "../i18n/index.js";
import { shopIconURL } from "../render/shopart.js";
import { RARITIES, SLOTS, SLOT_KEYS, STAT_NAMES, KILLS_PER_ZONE, MAX_PLUS, DROP_CHANCE, MONSTERS, ELITE } from "../game/data.js";
import { forgeCost, reforgeCost, sellValue, monsterBase, itemMult, power as heroPower } from "../game/rules.js";
import { CONSUMABLES } from "../game/shop.js";
import { fmt, fmtStat, esc, NB, dec, unit, listJoin } from "../game/format.js";
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
import { activeDayMod } from "../game/daymods.js";
import { BOSS_MECHANICS, bossMechanics, bossName } from "../game/bosses.js";
import { lockLink } from "./locks.js";
import { hasUnlock } from "../game/unlocks.js";

const $ = (root, s) => root.querySelector(s);
/** Lignes « pouvoir légendaire » et « panoplie » d'un objet (ou rien). */
export const power = (it, equip) => {
  const p = it.power && POWER_INDEX[it.power];
  let out = p ? `<p class="power"><b>★ ${esc(p.name)}</b> : ${esc(describeEffects(p.eff))}</p>` : "";
  const st = it.set && SETS[it.set];
  if (st) {
    const n = equip ? setCounts(equip)[it.set] || 0 : 0;
    out += `<p class="setline" style="--c:${st.color}"><b>◆ ${esc(st.name)}</b>${equip ? ` ${tx("({0}/4 portées)", { 0: n })}` : ""}<br>
      <span class="${n >= 2 ? "on" : ""}">${tx("2 pièces : {0}", { 0: esc(describeEffects(st.two)) })}</span><br>
      <span class="${n >= 4 ? "on" : ""}">${tx("4 pièces : {0}", { 0: esc(describeEffects(st.four)) })}</span></p>`;
  }
  return out;
};
const TABS = [
  { id: "adventure", label: tx("Aventure"), icon: "map" },
  { id: "talents", label: tx("Talents"), prefix: "t-", icon: "star" },
  { id: "skills", label: tx("Compétences"), prefix: "k-", icon: "target" },
  { id: "quests", label: tx("Quêtes"), prefix: "q-", icon: "fortune" },
  { id: "shop", label: tx("Boutique"), prefix: "s-", icon: "ws_gold" },
  { id: "pets", label: tx("Familiers"), prefix: "p-", group: true, icon: "egg" },
  { id: "class", label: tx("Classe"), prefix: "c-", icon: "ws_hp" },
  { id: "ascension", label: tx("Ascension"), prefix: "a-", icon: "wisdom" },
  { id: "bestiary", label: tx("Bestiaire"), prefix: "b-", icon: "book" },
  { id: "stats", label: tx("Statistiques"), prefix: "st-", icon: "trophy" },
  { id: "settings", label: tx("Réglages"), prefix: "se-", icon: "gear" },
];
const n1 = (v) => dec((Math.round(v * 10) / 10).toString());
// Statistiques secondaires affichées seulement si non nulles.
const EXTRA_STATS = [
  ["critDmg", tx("Dégâts critiques"), (s) => s.critDmg !== 2, (s) => "×" + n1(s.critDmg)],
  ["xp", tx("Expérience bonus"), (s) => s.xp > 0, (s) => "+" + n1(s.xp) + unit("%")],
  ["drop", tx("Chances de butin"), (s) => s.drop > 0, (s) => "+" + n1(s.drop) + unit("%")],
  ["dodge", tx("Esquive"), (s) => s.dodge > 0, (s) => n1(s.dodge) + unit("%")],
  ["riposte", tx("Riposte"), (s) => s.riposte > 0, (s) => n1(s.riposte) + unit("%")],
  ["doubleShot", tx("Tir double"), (s) => s.doubleShot > 0, (s) => n1(s.doubleShot) + unit("%")],
  ["burn", tx("Brûlure"), (s) => s.burn > 0, (s) => n1(s.burn) + unit("%") + " / s"],
  ["lifesteal", tx("Vol de vie"), (s) => s.lifesteal > 0, (s) => n1(s.lifesteal) + unit("%")],
  ["execute", tx("Coup de grâce"), (s) => s.execute > 0, (s) => "+" + n1(s.execute) + unit("%")],
  ["bossDmg", tx("Dégâts aux boss"), (s) => s.bossDmg > 0, (s) => "+" + n1(s.bossDmg) + unit("%")],
  ["secondWind", tx("Second souffle"), (s) => s.secondWind, () => "oui"],
  ["moveSpd", tx("Vitesse de déplacement"), (s) => s.moveSpd > 0, (s) => "+" + n1(s.moveSpd) + unit("%")],
];

/** Couleur d'une ligne du journal selon ce qu'elle raconte. */
const LOG_COLORS = [
  [/légendaire|pouvoir légendaire/i, "lg-leg"],
  [/Champion|Coffre au trésor|Étoile filante|Plume|Plumes du vent|vitesse de déplacement, pour toujours/, "lg-rare"],
  [/épique/i, "lg-epic"],
  [/Quête accomplie|revient de|L’œuf éclot|Un œuf/, "lg-good"],
  [/K.O.|est tombé|Trop dur|Dernière potion/, "lg-bad"],
];
const logClass = (l) => { const m = LOG_COLORS.find(([re]) => re.test(l)); return m ? ` class="${m[1]}"` : ""; };

// Repère de rareté en forme (pas seulement en couleur) : lisible pour les daltoniens.
const RARITY_PIP = ["", "", "•", "••", "★"];

export class Panel {
  constructor(root, game, { isDev = false, speed = 1, onSpeed, onClose, onReset, onMini, onQuit, settings } = {}) {
    this.root = root;
    this.game = game;
    this.isDev = isDev;
    this.speed = speed;
    this.kept = new Set(); // zones repliables ouvertes (data-keep)
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
      <div class="controls" role="group" aria-label="${esc(tx("Vitesse de test"))}">
        <span class="devtag">DEV</span>
        <button data-speed="1" aria-pressed="${this.speed === 1}">×1</button>
        <button data-speed="3" aria-pressed="${this.speed === 3}">×3</button>
        <button data-speed="10" aria-pressed="${this.speed === 10}">×10</button>
      </div>` : "";
    this.root.innerHTML = `
      <header class="ptop">
        <h1>Sillwalker</h1>
        <nav class="tabs" role="tablist">${TABS.map((t, i) => `${t.group ? `<span class="tabsep" aria-hidden="true"></span>` : ""}<button role="tab" data-tab="${t.id}" title="${esc(t.label + " · " + tx("Raccourci : {0}", { 0: "1234567890-"[i] }))}" aria-label="${esc(t.label)}" aria-selected="${t.id === this.tab}"><img class="ticon" src="${shopIconURL(t.icon, 2)}" alt=""><span class="tlabel">${t.label}</span><span class="tbadge" data-badge="${t.id}" hidden></span></button>`).join("")}</nav>
        <div class="controls">
          ${dev}
          <button data-action="mini" class="quiet" title="${esc(tx("Réduire en petit encart près de l’horloge"))}">${tx("Mode mini")}</button>
          <button data-action="quit" class="quiet quit" title="${esc(tx("Quitter Sillwalker (la partie est sauvegardée)"))}">${tx("Quitter")}</button>
          <button data-action="close" class="close" aria-label="${esc(tx("Fermer le panneau"))}" title="${esc(tx("Fermer (Échap)"))}">✕</button>
        </div>
      </header>
      <section class="tabpane" data-pane="adventure">
        <div class="grid">
          <article class="panel" id="p-hero"></article>
          <article class="panel" id="p-bag"></article>
          <article class="panel" id="p-detail"></article>
          <article class="panel" id="p-zone"></article>
          <article class="panel" id="p-log"><h2>${tx("Journal")}</h2><ul class="log" id="log"></ul></article>
        </div>
      </section>
      ${TABS.slice(1).map((t) => `<section class="tabpane" data-pane="${t.id}" hidden></section>`).join("")}
      <div class="modal" id="confirm" hidden>
        <div class="panel" role="alertdialog" aria-modal="true" aria-labelledby="ct">
          <h2 id="ct"></h2>
          <p id="cbody"></p>
          <div class="row"><button data-action="confirm-ok" class="primary"></button><button data-action="confirm-cancel">${tx("Annuler")}</button></div>
        </div>
      </div>
      <div class="modal" id="modal" hidden>
        <div class="panel" role="dialog" aria-modal="true" aria-labelledby="mt">
          <h2 id="mt">${tx("Pendant ton absence")}</h2>
          <div id="mbody"></div>
          <div class="row"><button data-action="closemodal">${tx("Continuer")}</button></div>
        </div>
      </div>`;
    // Double-clic sur un objet (2e clic d'une série, e.detail = 2) : l'équiper (sac) ou le retirer (héros).
    this.root.addEventListener("click", (e) => { if (!(e.detail === 2 && this.onDouble(e))) this.onClick(e); });
    this.watchDetails();
    this.root.addEventListener("change", (e) => this.onChange(e));
    // Infobulle de comparaison au survol d'un objet (sac ou équipement)
    this.tip = document.createElement("div");
    this.tip.className = "itemtip";
    this.tip.hidden = true;
    this.root.appendChild(this.tip);
    this.root.addEventListener("mouseover", (e) => this.onHover(e));
    this.root.addEventListener("mouseleave", () => { this.tip.hidden = true; });
  }

  /** Double-clic sur un objet : l'équiper (sac) ou le retirer (héros). Renvoie true si traité. */
  onDouble(e) {
    const b = e.target.closest && e.target.closest(".slot[data-from]");
    if (!b) return false;
    const g = this.game;
    if (b.dataset.from === "bag") { const it = g.findBagItem(+b.dataset.id); if (it) { g.equip(it); this.selected = null; } }
    else if (g.S.equip[b.dataset.slot] && !g.bagFull()) { g.unequip(b.dataset.slot); this.selected = null; }
    this.tip.hidden = true;
    this.renderAll();
    return true;
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
    this.fitTabs();
  }

  /** Onglets trop larges pour une ligne (langues aux mots longs, petit écran) :
   *  seuls l'onglet ouvert garde son nom, les autres n'affichent que leur icône. */
  fitTabs() {
    const nav = this.root.querySelector(".tabs"), top = this.root.querySelector(".ptop");
    if (!nav || !top || !top.offsetWidth) return;
    nav.classList.remove("compact");
    const wraps = () => { const b = [...nav.querySelectorAll("button")]; return b.length && b[b.length - 1].offsetTop > b[0].offsetTop + 4 || nav.offsetTop > top.firstElementChild.offsetTop + 8 || top.querySelector(".controls").offsetTop > nav.offsetTop + 8; };
    if (wraps()) nav.classList.add("compact");
  }

  /** Ouverture d'un coffre : le coffre tremble, s'ouvre, l'objet jaillit avec la couleur de sa rareté. */
  revealChest(chestId, it) {
    const r = RARITIES[it.r], up = this.game.isUpgrade(it);
    $(this.root, "#mt").textContent = tx("Coffre ouvert !");
    $(this.root, "#mbody").innerHTML = `<div class="reveal" style="--rc:${r.color}">
        <img class="rchest" src="${shopIconURL(chestId, 8)}" alt="">
        <div class="ritem"><span class="rays"></span><img src="${itemIconURL(it)}" alt=""></div>
        <div class="rname rc${it.r}">${esc(itemName(it))}</div>
        <div class="sub">${SLOTS[it.slot].name} ${tx("{0}, niveau {1}{2}", { 0: r.name.toLowerCase(), 1: it.il, 2: it.power && POWER_INDEX[it.power] ? ` · ★ ${esc(POWER_INDEX[it.power].name)}` : "" })}</div>
        ${up ? `<div class="delta-p">${tx("▲ Plus puissant que ton équipement actuel")}</div>` : ""}
      </div>${up ? `<div class="row"><button class="primary" data-action="reveal-equip" data-id="${it.id}">${tx("Équiper maintenant")}</button></div>` : ""}`;
    $(this.root, "#modal").hidden = false;
    $(this.root, "#modal button").focus();
  }

  showOfflineSummary(sum) {
    $(this.root, "#mt").textContent = tx("Pendant ton absence");
    const best = sum.best >= 0 ? `<li><span>${tx("Meilleur butin")}</span><b class="rc${sum.best}">${RARITIES[sum.best].name}</b></li>` : "";
    $(this.root, "#mbody").innerHTML =
      `<p>${tx("Ton héros a continué de farmer {0} pendant {1}.", { 0: esc(sum.zone), 1: esc(sum.duration) })}</p>
      <ul class="lines">
        <li><span>${tx("Monstres vaincus")}</span><b>${fmt(sum.kills)}</b></li>
        <li><span>${tx("Or gagné")}</span><b>+${fmt(sum.gold)}</b></li>
        <li><span>${tx("Expérience")}</span><b>+${fmt(sum.xp)}</b></li>
        ${sum.newLevel ? `<li><span>${tx("Nouveau niveau")}</span><b>${sum.newLevel}</b></li>` : ""}
        <li><span>${tx("Objets gardés")}</span><b>${sum.kept}</b></li>${best}
        ${sum.feathers ? `<li><span>${tx("Plumes du vent")}</span><b>${tx("+{0} % de vitesse", { 0: sum.feathers })}</b></li>` : ""}
        ${sum.chests ? `<li><span>${tx("Coffres au trésor")}</span><b>${sum.chests}</b></li>` : ""}
      </ul>
      <p class="note">${tx("La progression hors ligne est plafonnée à 8 h et rapporte un peu moins que de laisser le jeu ouvert.")}</p>`;
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

  /** Mémorise les zones repliables ouvertes (l'évènement « toggle » ne remonte pas : écoute en capture). */
  watchDetails() {
    this.root.addEventListener("toggle", (e) => {
      const k = e.target.dataset && e.target.dataset.keep;
      if (k) { if (e.target.open) this.kept.add(k); else this.kept.delete(k); }
    }, true);
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
    if (!it) return `<button class="slot" data-action="sel" data-from="equip" data-slot="${slotKey}" aria-label="${esc(tx("{0} : vide", { 0: SLOTS[slotKey].name }))}"><span class="lab">${SLOTS[slotKey].name}</span></button>`;
    const sel = this.selected && ((this.selected.from === "equip" && this.selected.slot === slotKey && from === "equip") ||
      (this.selected.from === "bag" && this.selected.id === it.id && from === "bag"));
    const up = from === "bag" && this.game.isUpgrade(it);
    return `<button class="slot rb${it.r}${sel ? " sel" : ""}" data-action="sel" data-from="${from}" ${from === "bag" ? `data-id="${it.id}"` : `data-slot="${slotKey}"`}
      aria-label="${esc(itemName(it))}, ${RARITIES[it.r].name}${up ? tx(", amélioration") : ""}">
      <img src="${itemIconURL(it)}" alt="">${RARITY_PIP[it.r] ? `<span class="rpip" aria-hidden="true">${RARITY_PIP[it.r]}</span>` : ""}${it.plus ? `<span class="plus">+${it.plus}</span>` : ""}${up ? `<span class="up" aria-hidden="true">▲</span>` : ""}${it.set && SETS[it.set] ? `<span class="setmark" style="color:${SETS[it.set].color}" aria-hidden="true">◆</span>` : ""}</button>`;
  }

  /** Survol d'un emplacement : infobulle avec statistiques et comparaison. */
  onHover(e) {
    const tb = this.tab === "talents" && e.target.closest && e.target.closest("[data-tid]");
    if (tb) this.tabs.talents.hover(tb.dataset.tid);
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
      verdict = `<p class="verdict ${dd > 0.005 ? "delta-p" : dd < -0.005 ? "delta-n" : ""}">${cur ? tx("Puissance : ") + (dd >= 0 ? "+" : "−") + Math.abs(Math.round(dd * 100)) + unit("%") : tx("Emplacement vide : à équiper !")}</p>`;
    }
    this.tip.innerHTML = `<div class="nm rc${it.r}">${esc(itemName(it))}${it.plus ? " +" + it.plus : ""}</div>
      <div class="sub">${SLOTS[it.slot].name} ${tx("{0}, niveau {1}{2}", { 0: RARITIES[it.r].name.toLowerCase(), 1: it.il, 2: fromBag ? "" : tx(", équipé") })}</div>
      <ul class="lines">${lines}</ul>${power(it, S.equip)}${verdict}
      <p class="note tight tiphelp">${fromBag ? tx("Double-clic : équiper") : tx("Double-clic : retirer")}</p>`;
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
    const dm = activeDayMod(S);
    const day = dm ? `<span class="chip daymod" title="${esc(tx("Bénédiction du jour : change chaque jour à minuit."))}">${dm.icon} ${esc(dm.name)} · ${esc(dm.desc)}</span>` : "";
    $(this.root, "#p-hero").innerHTML = `<h2><span class="hname"><img src="${classPortraitURL(S.cls)}" alt="">${esc(cls.name)}</span> <small>${tx("niveau {0}", { 0: S.lvl })}</small></h2>
      <div class="kv"><span>${tx("Expérience")}</span><span id="xptxt"></span></div><div class="bar"><i id="xpbar"></i></div>
      <div class="tiles">
        <div class="tile"><img src="${shopIconURL("heart", 3)}" alt=""><span>${tx("Points de vie")}</span><b>${fmtStat("hp", hs.hp)}</b></div>
        <div class="tile"><img src="${shopIconURL("ws_atk", 3)}" alt=""><span>${tx("Attaque")}</span><b>${fmtStat("atk", hs.atk)}</b></div>
        <div class="tile"><img src="${shopIconURL("ws_hp", 3)}" alt=""><span>${tx("Défense")}</span><b>${fmtStat("def", hs.def)}</b></div>
        <div class="tile power" title="${esc(tx("Score global de ton héros (attaque, survie, vitesse) : sert à comparer les objets."))}"><img src="${shopIconURL("star", 3)}" alt=""><span>${tx("Puissance")}</span><b>${fmt(Math.round(heroPower(hs)))}</b></div>
      </div>
      ${S.potions === 0 ? `<button class="linkbtn warn" data-tab="shop">${tx("Plus de potions de soin : la boutique en vend →")}</button>` : ""}
      ${free > 0 ? `<button class="linkbtn" data-tab="talents">${free} ${tx("point{0} de talent à dépenser →", { 0: plS(free) })}</button>` : ""}
      ${day || buffs || events || sets ? `<div class="chips">${day}${sets}${events}${buffs}</div>` : ""}
      <details class="more" data-keep="hero-stats"${this.kept.has("hero-stats") ? " open" : ""}><summary>${tx("Toutes les statistiques")}</summary>
      <dl class="stats">${Object.keys(STAT_NAMES).filter((k) => !["hp", "atk", "def"].includes(k)).map((k) => `<dt>${STAT_NAMES[k]}</dt><dd>${fmtStat(k, hs[k])}</dd>`).join("")}${extra}
      <dt>${tx("Potions de soin")}</dt><dd>${S.potions}</dd><dt>${tx("Or")}</dt><dd id="goldtxt"></dd>
      ${S.prestige.count ? `<dt>${tx("Ascensions")}</dt><dd>${S.prestige.count} · ✦ ${S.prestige.shards}</dd>` : ""}</dl></details>`;
    this.tick();
  }

  renderBag() {
    const S = this.game.S, cells = [];
    const useless = this.game.uselessItems(), uselessGold = useless.reduce((a, it) => a + sellValue(it), 0), tr = this.game.transmutePlan();
    for (let i = 0; i < S.bagSize; i++) {
      const it = S.bag[i];
      cells.push(it ? this.slotBtn(it, it.slot, "bag") : `<div class="slot emptyslot" aria-hidden="true"></div>`);
    }
    const full = S.bag.length >= S.bagSize;
    $(this.root, "#p-bag").innerHTML = `<h2>${tx("Sac")} <small${full ? ` ${tx("class=\"warn\" title=\"Sac plein : les nouveaux objets sont vendus automatiquement. Vends ou transmute pour faire de la place.\"")}` : ""}>${full ? tx("plein · ") : ""}${S.bag.length} / ${S.bagSize}</small></h2><div class="bag">${cells.join("")}</div>
      <div class="row">${hasUnlock(S, "bulkEquip") ? `<button data-action="sellless"${useless.length ? "" : " disabled"} title="${esc(tx("Vend tout ce qui n’est pas plus puissant que ton équipement actuel. Les légendaires sont toujours gardés."))}">${tx("Vendre ce qui ne m’améliore pas{0}", { 0: useless.length ? ` ${tx("({0} · {1} or)", { 0: useless.length, 1: fmt(uselessGold) })}` : "" })}</button>
      <button data-action="autoequip"${this.game.hasUpgrade() ? ` class="primary"` : " disabled"}>${tx("Équiper le meilleur{0}", { 0: this.game.hasUpgrade() ? " ▲" : "" })}</button>` : lockLink(S, "bulkEquip")}
      ${hasUnlock(S, "transmute") ? `<button data-action="transmute"${tr.made ? "" : " disabled"} title="${esc(tx("3 objets inutiles d’une même rareté → 1 objet de la rareté au-dessus (jusqu’à légendaire)."))}">${tx("Transmuter{0}", { 0: tr.made ? ` ${tx("({0} nouveau{1})", { 0: tr.made, 1: tr.made > 1 ? "x" : "" })}` : " (3 → 1)" })}</button>` : lockLink(S, "transmute")}</div>
      ${hasUnlock(S, "autoSell") ? `<label class="toggle"><input type="checkbox" data-action="as" data-r="common"${S.autoSell.common ? " checked" : ""}> ${tx("Vendre les communs dès qu’ils tombent")}</label>
      <label class="toggle"><input type="checkbox" data-action="as" data-r="uncommon"${S.autoSell.uncommon ? " checked" : ""}> ${tx("Vendre les peu communs dès qu’ils tombent")}</label>
      <label class="toggle"><input type="checkbox" data-action="as" data-r="rare"${S.autoSell.rare ? " checked" : ""}> ${tx("Vendre les rares dès qu’ils tombent")}</label>` : lockLink(S, "autoSell")}
      ${hasUnlock(S, "armsValet") ? `<label class="toggle"><input type="checkbox" data-action="valet"${S.settings.autoEquipDrops !== false ? " checked" : ""}> ${tx("Valet d’armes : équiper tout seul les objets plus puissants")}</label>` : ""}
      <p class="note">${tx("▲ signale un objet plus puissant que ce que porte ton héros.")}</p>`;
  }

  getSel() {
    const s = this.selected;
    if (!s) return null;
    return s.from === "equip" ? this.game.S.equip[s.slot] : this.game.findBagItem(s.id);
  }

  renderDetail() {
    const it = this.getSel(), el = $(this.root, "#p-detail"), S = this.game.S;
    if (!it) {
      const v = heroVisual(S);
      const rows = SLOT_KEYS.map((k) => {
        const e = S.equip[k];
        return `<li class="eqline">${this.slotBtn(e, k, "equip")}<div class="si">${e
          ? `<div class="nm rc${e.r}">${esc(itemName(e))}${e.plus ? " +" + e.plus : ""}</div><div class="sub">${SLOTS[k].name}${tx(", niveau {0}{1}", { 0: e.il, 1: e.power && POWER_INDEX[e.power] ? ` · ★ ${esc(POWER_INDEX[e.power].name)}` : "" })}</div>`
          : `<div class="nm empty">${SLOTS[k].name} ${tx(": vide")}</div>`}</div></li>`;
      }).join("");
      el.innerHTML = `<h2>${tx("Équipement")} <small>${tx("clique un objet")}</small></h2>
        <div class="eqview"><img class="heroport${v.aura ? " legend" : ""}" src="${dressedPortraitURL(S.cls, v)}" alt="${esc(tx("Ton héros et son équipement"))}">
        <ul class="eqlist">${rows}</ul></div>`;
      return;
    }
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
      verdict = `<p class="verdict ${d > 0.005 ? "delta-p" : d < -0.005 ? "delta-n" : ""}">${cur ? tx("Puissance du héros : ") + (d >= 0 ? "+" : "−") + Math.abs(Math.round(d * 100)) + unit("%") : tx("Emplacement vide : à équiper !")}</p>`;
    }
    const fc = forgeCost(it), canForge = it.plus < MAX_PLUS && S.gold >= fc;
    el.innerHTML = `<h2>${tx("Objet")} <button class="linkbtn back" data-action="desel">${tx("← équipement")}</button></h2>
      <div class="detail-head"><img src="${itemIconURL(it)}" alt=""><div>
        <div class="nm rc${it.r}">${esc(itemName(it))}${it.plus ? " +" + it.plus : ""}</div>
        <div class="sub">${SLOTS[it.slot].name} ${tx("{0}, niveau {1}{2}", { 0: r.name.toLowerCase(), 1: it.il, 2: fromBag ? "" : tx(", équipé") })}</div></div></div>
      <ul class="lines">${lines}</ul>${power(it, S.equip)}${verdict}
      <div class="row">${fromBag
        ? `<button data-action="equip">${tx("Équiper")}</button><button data-action="sell">${tx("Vendre ({0} or)", { 0: fmt(sellValue(it)) })}</button>`
        : `<button data-action="unequip"${this.game.bagFull() ? " disabled" : ""}>${tx("Retirer")}</button>`}
        ${!hasUnlock(S, "forge") ? lockLink(S, "forge") : ""}${hasUnlock(S, "forge") && RARITIES[it.r].affixes ? `<button data-action="reforge"${S.gold >= reforgeCost(it) ? "" : " disabled"} title="${esc(tx("Tire au hasard de nouveaux bonus secondaires. Rareté, forge, pouvoir et panoplie sont conservés."))}">${tx("Réforger ({0} or)", { 0: fmt(reforgeCost(it)) })}</button>` : ""}
        ${hasUnlock(S, "forge") ? `<button data-action="forge"${canForge ? "" : " disabled"}>${it.plus >= MAX_PLUS ? tx("Amélioration maximale") : `${tx("Forger +{0} ({1} or)", { 0: it.plus + 1, 1: fmt(fc) })}`}</button>` : ""}</div>
      <p class="note">${tx("Chaque niveau de forge ajoute 10{0}% à toutes les statistiques de l’objet. La forge ne peut pas échouer.", { 0: NB })}</p>`;
  }

  renderZone() {
    const S = this.game.S, Z = this.game.zoneDef(), b = monsterBase(S.zone, false), bb = monsterBase(S.zone, true, Z.boss);
    const rows = RARITIES.map((r, i) => `<tr><td class="rc${i}">${r.name}</td><td>${r.weight}${unit("%")}</td></tr>`).join("");
    const names = Z.monsters.map((m) => MONSTERS[m].name);
    const list = listJoin(names);
    $(this.root, "#p-zone").innerHTML = `<h2>${tx("Zone {0}", { 0: S.zone })} <small>${tx("record : {0}", { 0: S.best })}</small></h2>
      <p class="zname">${esc(this.game.zoneName())}</p>
      <p class="note tight" title="${esc(list)}">${names.length} ${tx("types de monstres, ~{0} PV. Boss ({1}) : {2} PV.", { 0: fmt(b.hp), 1: esc(lc(MONSTERS[Z.boss].name)), 2: fmt(bb.hp) })}</p>
      <p class="note tight bossmech">${tx("Boss :")} <b class="bname">${esc(bossName(S.zone))}</b>. ${tx("Capacités du boss :")} ${bossMechanics(S.zone).map((id) => `<b title="${esc(BOSS_MECHANICS[id].desc)}">${esc(BOSS_MECHANICS[id].name)}</b>`).join(", ")}.</p>
      <div class="kv"><span>${tx("Avant le boss")}</span><span id="killtxt"></span></div><div class="bar"><i id="killbar"></i></div>
      <label class="toggle"><input type="checkbox" data-action="adv"${S.autoAdvance ? " checked" : ""}> ${tx("Passer à la zone suivante après le boss")}</label>
      <div class="row"><button data-action="zprev"${S.zone > 1 ? "" : " disabled"}>${tx("Zone précédente")}</button>
      <button data-action="znext"${S.zone < S.best ? "" : " disabled"}>${tx("Zone suivante")}</button></div>
      <details class="rates-box" data-keep="rates"${this.kept.has("rates") ? " open" : ""}><summary>${tx("Chances de butin")}</summary>
      <p class="note tight">${Math.round(DROP_CHANCE * 100)}${NB}${tx("% par monstre, 100{0}% sur le boss (rare minimum) et sur les élites dorés ({1}{2}% des monstres, or ×{3}). Si un objet tombe, sa rareté suit ce tableau :", { 0: NB, 1: Math.round(ELITE.chance * 100), 2: NB, 3: ELITE.gold })}</p>
      <table class="rates">${rows}</table><p class="note">${tx("Ces taux sont fixes et identiques pour tout le monde. Élites vaincus : {0}.", { 0: S.stats.elites || 0 })}</p></details>`;
    this.tick();
  }

  renderLog() {
    const el = $(this.root, "#log"), L = this.game.S.log;
    el.innerHTML = L.length ? L.slice(0, 25).map((l) => `<li${logClass(l)}>${esc(l)}</li>`).join("") : tx("<li>Ton héros se met en route.</li>");
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
      $(r, "#killtxt").textContent = S.kills >= KILLS_PER_ZONE ? tx("Boss en approche") : S.kills + " / " + KILLS_PER_ZONE;
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
    if (a === "s-chest") { // coffre acheté : ouverture animée
      const it = g.buyChest(b.dataset.id);
      this.renderAll();
      if (it) this.revealChest(b.dataset.id, it);
      return;
    }
    if (a === "reveal-equip") { const it = g.findBagItem(+b.dataset.id); if (it) g.equip(it); $(this.root, "#modal").hidden = true; this.renderAll(); return; }
    const owner = TABS.find((x) => x.prefix && a.startsWith(x.prefix));
    if (owner) { this.tabs[owner.id].onAction(a, b); this.renderAll(); return; }
    const it = this.getSel();
    switch (a) {
      case "sel":
        this.selected = b.dataset.from === "bag" ? { from: "bag", id: +b.dataset.id } : { from: "equip", slot: b.dataset.slot };
        if (b.dataset.from === "equip" && !g.S.equip[b.dataset.slot]) this.selected = null;
        break;
      case "desel": this.selected = null; break;
      case "equip": if (it) { g.equip(it); this.selected = { from: "equip", slot: it.slot }; } break;
      case "sell": if (it) { g.sell(it); this.selected = null; } break;
      case "unequip": if (it && g.unequip(it.slot)) this.selected = { from: "bag", id: it.id }; break;
      case "forge": if (it) g.forge(it); break;
      case "reforge": if (it) g.reforge(it); break;
      case "sellless": {
        const n = g.uselessItems().length;
        this.confirm(tx("Vendre les objets inutiles ?"), `${n} ${tx("objet(s) qui n’améliorent pas ton héros seront vendus. Les légendaires sont toujours gardés.")}`, tx("Vendre"), () => {
          g.sellUseless();
          if (this.selected?.from === "bag" && !this.getSel()) this.selected = null;
          this.renderAll();
        });
        return;
      }
      case "transmute": {
        const plan = g.transmutePlan();
        this.confirm(tx("Transmuter les objets inutiles ?"), `${tx("Chaque groupe de 3 objets inutiles d’une même rareté devient 1 objet de la rareté au-dessus : au moins {0} nouvel(s) objet(s). Les légendaires ne sont jamais utilisés.", { 0: plan.made })}`, tx("Transmuter"), () => {
          g.transmute();
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
      case "quit": this.confirm(tx("Quitter Sillwalker ?"), tx("Ta partie est sauvegardée. Ton héros continuera de progresser hors ligne (jusqu’à 8 h)."), tx("Quitter le jeu"), () => this.onQuit?.()); return;
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
      delete b.dataset.armed; b.textContent = b.dataset.label || tx("Recommencer"); b.classList.remove("danger");
      return;
    }
    b.dataset.label ||= b.textContent;
    b.dataset.armed = "1"; b.textContent = tx("Tout effacer ? Cliquer encore pour confirmer"); b.classList.add("danger");
    setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = b.dataset.label; b.classList.remove("danger"); } }, 4000);
  }

  onChange(e) {
    const b = e.target;
    if (b.dataset.action === "se-volume") { this.tabs.settings.onAction("se-volume", b); this.renderAll(); return; }
    if (b.dataset.action === "as") this.game.setAutoSell(b.dataset.r, b.checked);
    if (b.dataset.action === "adv") this.game.setAutoAdvance(b.checked);
    if (b.dataset.action === "valet") { this.game.S.settings.autoEquipDrops = b.checked; this.game.changed(); }
  }

  /**
   * Raccourcis clavier (panneau ouvert) : 1-9 et 0 = onglets, - = Réglages,
   * E = équiper le meilleur, V = vendre ce qui n'améliore pas, T = transmuter.
   * Renvoie true si la touche a été utilisée.
   */
  onKey(e) {
    if (e.ctrlKey || e.altKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return false;
    if (!$(this.root, "#confirm").hidden) {
      if (e.key === "Enter") { const fn = this.confirmFn; this.closeConfirm(); fn?.(); return true; }
      return false;
    }
    const order = "1234567890-";
    const i = order.indexOf(e.key);
    if (i >= 0 && TABS[i]) { this.setTab(TABS[i].id); return true; }
    const k = e.key.toLowerCase();
    if ((k === "e" || k === "v" || k === "t") && !hasUnlock(this.game.S, k === "t" ? "transmute" : "bulkEquip")) return false;
    if (k === "e") { this.game.autoEquip(); this.selected = null; this.renderAll(); return true; }
    if (k === "t") { if (this.tab !== "adventure") this.setTab("adventure"); const b = $(this.root, '[data-action="transmute"]'); if (b && !b.disabled) this.onClick({ target: b }); return true; }
    if (k === "v") { const b = $(this.root, '[data-action="sellless"]'); if (this.tab !== "adventure") this.setTab("adventure"); this.onClick({ target: $(this.root, '[data-action="sellless"]') || b }); return true; }
    return false;
  }

  /** Échap : ferme la modale si ouverte, sinon demande la fermeture du panneau. */
  onEscape() {
    if (!$(this.root, "#confirm").hidden) { this.closeConfirm(); return; }
    const m = $(this.root, "#modal");
    if (!m.hidden) { m.hidden = true; return; }
    this.onClose?.();
  }
}
