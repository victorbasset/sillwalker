// Panneau de gestion, en onglets :
//   Aventure (héros, sac, objet, zone, journal) · Talents · Boutique · Classe
// Chaque onglet hors Aventure est un module de ui/tabs/ avec render(el),
// onAction(action, bouton) et tick(). Ajouter un onglet = un module + une
// entrée dans TABS. Le panneau ne touche à l'état qu'à travers Game.
import { newsShown } from "../game/news.js";
import { itemName } from "../i18n/data.js";
import { t as tx, txn, lc, fsp, tr } from "../i18n/index.js";
import { todoLabel } from "./todo.js";
import { shopIconURL, spellIconURL } from "../render/shopart.js";
import { classSpells, spellRank } from "../game/spells.js";
import { RARITIES, LEGENDARY, SLOTS, SLOT_KEYS, STAT_NAMES, KILLS_PER_ZONE, MAX_PLUS, DROP_CHANCE, MONSTERS, ELITE } from "../game/data.js";
import { forgeCost, reforgeCost, levelUpCost, sellValue, monsterBase, itemMult, earlyPace, power as heroPower } from "../game/rules.js";
import { CONSUMABLES } from "../game/shop.js";
import { fmt, fmtStat, esc, NB, dec, unit, listJoin , uH, uMin } from "../game/format.js";
import { itemIconURL, classPortraitURL, dressedPortraitURL } from "../render/sprites.js";
import { heroVisual } from "../render/equipvis.js";
import { TalentsTab } from "./tabs/talents.js";
import { ShopTab } from "./tabs/shop.js";
import { ClassesTab, spellFxText } from "./tabs/classes.js";
import { initHScroll, saveHScroll, restoreHScroll } from "./hscroll.js";
import { CLASSES, duoSynergy } from "../game/classes.js";
import { QuestsTab } from "./tabs/quests.js";
import { questDone } from "../game/quests.js";
import { PetsTab } from "./tabs/pets.js";
import { AscensionTab } from "./tabs/ascension.js";
import { BestiaryTab } from "./tabs/bestiary.js";
import { SkillsTab } from "./tabs/skills.js";
import { StatsTab } from "./tabs/stats.js";
import { MapTab } from "./tabs/map.js";
import { SettingsTab } from "./tabs/settings.js";
import { POWER_INDEX } from "../game/powers.js";
import { describeEffects } from "../game/talents.js";
import { SETS, setCounts } from "../game/sets.js";
import { EVENTS } from "../game/events.js";
import { activeDayMod } from "../game/daymods.js";
import { BOSS_MECHANICS, bossMechanics, bossName, bossWear } from "../game/bosses.js";
import { lockLink } from "./locks.js";
import { tabOpen, TAB_GATES } from "../game/tabs.js";
import { journeyText } from "./tabs/stats.js";
import { CHRONICLES, chroniclesUnlocked } from "../game/story.js";
import { hasUnlock, nextUnlock, unlockAvailable, recordZone } from "../game/unlocks.js";

const $ = (root, s) => root.querySelector(s);
/** Lignes « pouvoir légendaire » et « panoplie » d'un objet (ou rien). */
export const power = (it, equip) => {
  const p = it.power && POWER_INDEX[it.power];
  let out = p ? `<p class="power"><b>★ ${esc(p.name)}</b>${fsp()}: ${esc(describeEffects(p.eff))}</p>` : "";
  const st = it.set && SETS[it.set];
  if (st) {
    const n = equip ? setCounts(equip)[it.set] || 0 : 0;
    out += `<p class="setline" style="--c:${st.color}"><b>◆ ${esc(st.name)}</b>${equip ? ` ${tx("({0}/4 portées)", { 0: n })}` : ""}<br>
      <span class="${n >= 2 ? "on" : ""}">${n >= 2 ? "✓ " : ""}${tx("2 pièces : {0}", { 0: esc(describeEffects(st.two)) })}</span><br>
      <span class="${n >= 4 ? "on" : ""}">${n >= 4 ? "✓ " : ""}${tx("4 pièces : {0}", { 0: esc(describeEffects(st.four)) })}</span></p>`;
  }
  return out;
};
const TABS = [
  { id: "adventure", label: tx("Aventure"), icon: "ws_atk" },
  { id: "talents", label: tx("Talents"), prefix: "t-", icon: "star" },
  { id: "skills", label: tx("Compétences"), prefix: "k-", icon: "target" },
  { id: "quests", label: tx("Quêtes"), prefix: "q-", icon: "fortune" },
  { id: "shop", label: tx("Boutique"), prefix: "s-", icon: "ws_gold" },
  { id: "pets", label: tx("Familiers"), prefix: "p-", group: true, icon: "egg" },
  { id: "class", label: tx("Héros"), prefix: "c-", icon: "ws_hp" }, // « Héros » plutôt que « Classe » (demande 17)
  { id: "ascension", label: tx("Ascension"), prefix: "a-", icon: "wisdom" },
  { id: "bestiary", label: tx("Bestiaire"), prefix: "b-", icon: "book" },
  { id: "stats", label: tx("Statistiques"), prefix: "st-", icon: "trophy" },
  { id: "map", label: tx("Carte"), prefix: "m-", icon: "map" },
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
  ["secondWind", tx("Second souffle"), (s) => s.secondWind, () => tx("oui")],
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
const RARITY_PIP = ["", "•", "••", "•••", "★"]; // rareté lisible sans les couleurs (daltonisme) : peu commun → légendaire

/** Sections repliables de l'Aventure ouvertes dans la fenêtre large (data-keep). */
const MODAL_DETAILS = new Set(["hero-todo", "hero-chron", "hero-stats", "rates"]);

export class Panel {
  constructor(root, game, { isDev = false, speed = 1, onSpeed, onClose, onReset, onMini, onQuit, settings } = {}) {
    this.root = root;
    this.game = game;
    this.isDev = isDev;
    this.speed = speed;
    this.kept = new Set(); // zones repliables ouvertes (data-keep)
    this.hs = new Map(); // positions des rangées à défilement latéral (hscroll.js)
    Object.assign(this, { onSpeed, onClose, onReset, onMini, onQuit });
    this.selected = null;
    this.tab = "adventure";
    this.tabs = {
      talents: new TalentsTab(game), skills: new SkillsTab(game), quests: new QuestsTab(game), shop: new ShopTab(game), pets: new PetsTab(game),
      class: new ClassesTab(game), ascension: new AscensionTab(game), bestiary: new BestiaryTab(game), stats: new StatsTab(game), map: new MapTab(game),
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
        <nav class="tabs" role="tablist">${TABS.map((t, i) => `${t.group ? `<span class="tabsep" aria-hidden="true"></span>` : ""}<button role="tab" data-tab="${t.id}" title="${esc(t.label + " · " + tx("Raccourci : {0}", { 0: "1234567890-="[i] }))}" aria-label="${esc(t.label)}" aria-selected="${t.id === this.tab}"><img class="ticon" src="${shopIconURL(t.icon, 2)}" alt=""><span class="tlabel">${t.label}</span><span class="tbadge" data-badge="${t.id}" hidden></span></button>`).join("")}</nav>
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
    // Curseurs : le pourcentage affiché suit le glissement (le réglage s'applique au relâchement).
    initHScroll(this.root);
    this.root.addEventListener("input", (e) => { const r = e.target; if (r.type === "range" && r.nextElementSibling) r.nextElementSibling.textContent = r.value + unit("%"); });
    // Sections repliables de l'Aventure : dépliées sur place, elles faisaient défiler l'onglet (jusqu'à 465 px) ;
    // un clic sur leur titre les ouvre dans la fenêtre large. Capture : avant que le <details> ne se déplie.
    this.root.addEventListener("click", (e) => {
      const s = e.target.closest && e.target.closest("summary"), d = s && s.parentElement;
      if (!d || !MODAL_DETAILS.has(d.dataset.keep) || d.open) return;
      e.preventDefault(); e.stopPropagation();
      this.showDetails(d);
    }, true);
    this.root.addEventListener("click", (e) => { if (!(e.detail === 2 && this.onDouble(e))) this.onClick(e); });
    this.watchDetails();
    this.watchTitles();
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
    if (open) {
      this.sinceVisit = this.game.visitSummary(this.visitSnap); // « Depuis ta dernière visite » (panneau resté fermé ≥ 5 min)
      this.dirty = true; this.update(1);
    } else { this.visitSnap = this.game.visitSnapshot(); this.sinceVisit = null; }
  }

  /** Ligne « Depuis ta dernière visite » en haut de la carte du héros (un clic la ferme). */
  visitHTML() {
    const v = this.sinceVisit;
    if (!v) return "";
    const dur = v.min >= 60 ? `${uH(Math.floor(v.min / 60))} ${uMin(v.min % 60)}` : uMin(v.min);
    const parts = [tx("{0} or", { 0: `<b>+${fmt(v.gold)}</b>` }), txn(v.kills, "{n} monstre|{n} monstres", { n: fmt(v.kills) })];
    if (v.lvl0) parts.push(tx("niveau {0} → {1}", { 0: v.lvl0, 1: v.lvl1 }));
    if (v.asc) parts.push(`<b>${txn(v.asc, "{n} ascension|{n} ascensions")}</b>`);
    if (v.best) parts.push(`<b>${tx("record : zone {0}", { 0: v.best })}</b>`);
    if (v.leg) parts.push(`<b class="rc4">${txn(v.leg, "{n} légendaire|{n} légendaires")}</b>`);
    if (v.spells) parts.push(txn(v.spells, "+{n} rang de sort|+{n} rangs de sorts")); // le Grimoire a travaillé
    return `<button class="visit" data-action="visit-ok" title="${esc(parts.join(" · ").replace(/<[^>]*>/g, "") + "\n" + tx("Cliquer pour masquer"))}"><small>${tx("Depuis ta dernière visite ({0})", { 0: dur })}</small> ${parts.join(" · ")}</button>`;
  }

  /** Appelé à chaque image tant que le panneau est ouvert. */
  update(dt) {
    if (!this.isOpen) return;
    if (this.dirty) this.renderAll();
    else if ((this.uiT += dt) > 0.4) { this.uiT = 0; this.tick(); }
  }

  setTab(id) {
    if (!TABS.some((t) => t.id === id) || !tabOpen(this.game.S, id)) return;
    if (this.game.S.tabsOpen && this.game.S.tabsOpen[id] === "new") this.game.S.tabsOpen[id] = true; // visité : plus de pastille
    this.tab = id;
    for (const b of this.root.querySelectorAll("[data-tab]")) b.setAttribute("aria-selected", String(b.dataset.tab === id));
    for (const p of this.root.querySelectorAll("[data-pane]")) p.hidden = p.dataset.pane !== id;
    this.root.scrollTop = 0;
    this.renderAll();
    this.fitTabs();
  }

  /** Onglets trop larges pour une ligne (langues aux mots longs, petit écran), par paliers :
   *  marges resserrées, puis police plus petite, puis icônes collées au nom, et en dernier recours seul l'onglet ouvert
   *  garde son nom, les autres n'affichent que leur icône. Les icônes restent toujours (demande de Victor, it. 499). */
  fitTabs() {
    const nav = this.root.querySelector(".tabs"), top = this.root.querySelector(".ptop");
    if (!nav || !top || !top.offsetWidth) return;
    const steps = ["tight", "small", "slim", "compact"];
    nav.classList.remove(...steps);
    const wraps = () => { const b = [...nav.querySelectorAll("button")]; return b.length && b[b.length - 1].offsetTop > b[0].offsetTop + 4 || nav.offsetTop > top.firstElementChild.offsetTop + 8 || top.querySelector(".controls").offsetTop > nav.offsetTop + 8; };
    for (const s of steps) {
      if (!wraps()) return;
      if (s === "compact") nav.classList.remove("slim", "small"); // icônes seules : place retrouvée, taille normale
      nav.classList.add(s);
    }
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
    $(this.root, "#modal button").focus({ preventScroll: true });
    $(this.root, "#modal .panel").scrollTop = 0;
  }

  showOfflineSummary(sum) {
    $(this.root, "#mt").textContent = tx("Pendant ton absence");
    // Meilleur objet gardé : son nom (couleur de rareté) et, si c'est une amélioration, « Équiper maintenant ».
    const bi = sum.bestItemId != null ? this.game.findBagItem(sum.bestItemId) : null;
    const worn = !bi && sum.bestItemId != null ? Object.values(this.game.S.equip).find((e) => e && e.id === sum.bestItemId) : null;
    const best = bi ? `<li><span>${tx("Meilleur butin")}</span><b class="rc${bi.r}">${esc(itemName(bi))}</b></li>${this.game.isUpgrade(bi) ? `<li class="row"><button class="primary" data-action="reveal-equip" data-id="${bi.id}">${tx("Équiper maintenant")}</button></li>` : ""}`
      : worn ? `<li><span>${tx("Meilleur butin")}</span><b class="rc${worn.r}">${esc(tx("{0} (équipé)", { 0: itemName(worn) }))}</b></li>` // déjà porté (Valet d'armes)
      : sum.best >= 0 ? `<li><span>${tx("Meilleur butin")}</span><b class="rc${sum.best}">${RARITIES[sum.best].name}</b></li>` : "";
    $(this.root, "#mbody").innerHTML =
      `<p>${tx("Ton héros a continué de farmer {0} pendant {1}.", { 0: esc(sum.zone), 1: esc(sum.duration) })}</p>
      <ul class="lines">
        <li><span>${tx("Monstres vaincus")}</span><b>${fmt(sum.kills)}</b></li>
        <li><span>${tx("Or gagné")}</span><b>+${fmt(sum.gold)}</b></li>
        <li><span>${tx("Expérience")}</span><b>+${fmt(sum.xp)}</b></li>
        ${sum.newLevel ? `<li><span>${tx("Nouveau niveau")}</span><b>${sum.newLevel}</b></li>` : ""}
        ${(sum.steps || []).map((e) => journeyText(e)).filter(Boolean).map((t) => `<li class="step"><span>✦ ${esc(t)}</span></li>`).join("")}
        <li><span>${tx("Objets gardés")}</span><b>${sum.kept}</b></li>${best}
        ${sum.feathers ? `<li><span>${tx("Plumes du vent")}</span><b>${tx("+{0} % de vitesse", { 0: sum.feathers })}</b></li>` : ""}
        ${sum.chests ? `<li><span>${tx("Coffres au trésor")}</span><b>${sum.chests}</b></li>` : ""}
        ${sum.forged ? `<li><span>${tx("Maître de forge")}</span><b>${txn(sum.forged, "+{n} amélioration|+{n} améliorations")}</b></li>` : ""}
        ${sum.transmuted ? `<li><span>${tx("Creuset perpétuel")}</span><b>${txn(sum.transmuted, "{n} objet transmuté|{n} objets transmutés")}</b></li>` : ""}
        ${sum.petWork ? `<li><span>${tx("Grand intendant")}</span><b>${txn(sum.petWork, "{n} tâche de familier|{n} tâches de familiers")}</b></li>` : ""}
      </ul>
      ${this.todoHtml()}
      <p class="note">${sum.capped
        ? tx("Plafond de {0} h atteint : au-delà, ton héros ne progresse plus. La constellation de la Lune l’allonge.", { 0: sum.capH })
        : tx("La progression hors ligne est plafonnée à {0} h et rapporte un peu moins que de laisser le jeu ouvert.", { 0: sum.capH || 8 })}</p>`;
    this.setTab("adventure");
    $(this.root, "#modal").hidden = false;
    // « Continuer » reçoit le focus sans faire défiler : le résumé s'ouvre en haut (titre et durée visibles).
    $(this.root, "#modal [data-action=closemodal]").focus({ preventScroll: true });
    $(this.root, "#modal .panel").scrollTop = 0;
  }

  /** « À faire maintenant » : un bouton par action disponible, qui mène droit au bon onglet. */
  todoHtml() {
    const list = this.game.todoNow();
    if (!list.length) return "";
    return `<h3 class="todo-h">${tx("À faire maintenant")}</h3>
      ${list.map((t) => t.id === "unlock" && t.uid // déblocage payable : acheté d'un clic, comme depuis la carte du héros
        ? `<button class="linkbtn" data-action="goal-buy" data-id="${t.uid}">${esc(tx("Acheter : {0} ({1} or)", { 0: t.name, 1: fmt(t.price) }))}</button>`
        : t.id === "merchant" && t.name // amélioration du marchand : achetée et équipée d'un clic
          ? `<button class="linkbtn" data-action="todo-do" data-what="merchant">${esc(tx("Acheter et équiper : {0} ({1} or)", { 0: t.name, 1: fmt(t.price) }))}</button>`
        : this.todoDirect(t) // action faisable d'un clic ici (déblocage « tout d'un coup » acquis)
          ? `<button class="linkbtn" data-action="todo-do" data-what="${t.id}">✦ ${esc(todoLabel(t))}</button>`
          : `<button class="linkbtn" data-tab="${t.tab}"${t.sec ? ` data-sec="${t.sec}"` : ""}>${esc(todoLabel(t))} →</button>`).join("")}`;
  }

  /** « À faire » dans la carte du héros (repliable) : les mêmes lignes et actions que le résumé de retour. */
  /** Chroniques de l'histoire (story.js) : les plus récentes d'abord ; les suivantes restent cachées (« ??? »). */
  chronicleBox() {
    const S = this.game.S, got = chroniclesUnlocked(S, recordZone(S));
    // ▶ : revoir la cinématique de la chronique (demande 31) ; « Le ciel brisé » rejoue l'intro, la victoire n'en a pas ici.
    const play = (c) => c.id === "dawn" ? "" : ` <button class="linkbtn inline chronplay" data-action="chron-play" data-id="${c.id}" title="${esc(tx("Revoir la cinématique"))}">▶</button>`;
    const items = [...got].reverse().map((c) => `<li class="chron"><b>${esc(tx(c.title))}</b>${play(c)}<p>${esc(tx(c.text))}</p></li>`).join("");
    return `<details class="more chronbox" data-keep="hero-chron"${this.kept.has("hero-chron") ? " open" : ""}><summary>📜 ${tx("Chroniques ({0} / {1})", { 0: got.length, 1: CHRONICLES.length })}</summary><ul class="chronlist">${items}</ul></details>`;
  }

  todoBox() {
    const list = this.game.todoNow();
    if (!list.length) return "";
    const body = this.todoHtml().replace(/^\s*<h3 class="todo-h">.*?<\/h3>/s, "");
    return `<details class="more todobox" data-keep="hero-todo"${this.kept.has("hero-todo") ? " open" : ""}><summary>${tx("À faire ({0})", { 0: list.length })}</summary>${body}</details>`;
  }

  /** Les actions de « À faire maintenant » que le joueur pourrait déjà faire d'un clic dans leur onglet. */
  todoDirect(t) {
    const S = this.game.S;
    return (t.id === "quests" && hasUnlock(S, "questDesk")) || ((t.id === "eggs" || t.id === "expeditions") && hasUnlock(S, "petBulk"))
      || (t.id === "upgrade" && hasUnlock(S, "bulkEquip")) || t.id === "setFinish" || (t.id === "bagFull" && t.n > 0 && hasUnlock(S, "bulkEquip"))
      || ((t.id === "talents" || t.id === "skills") && hasUnlock(S, "bulkPoints")); // Manuel du stratège : tout dépenser d'un clic
  }

  /** Exécute une action de « À faire maintenant » (le résumé reste ouvert, la ligne passe à ✓). */
  todoDo(what) {
    const g = this.game;
    if (what === "quests") { for (const q of [...g.S.quests.slots]) if (questDone(q)) g.claimQuest(q.uid); }
    else if (what === "eggs") g.hatchAll();
    else if (what === "expeditions") g.claimAllExpeditions();
    else if (what === "upgrade") g.autoEquip();
    else if (what === "bagFull") g.sellUseless();
    else if (what === "merchant") { const it = g.merchantUpgrade(); if (it) g.buyAndEquip(it.id); }
    else if (what === "talents") g.autoSpendTalents();
    else if (what === "skills") g.autoSpendSkills();
    else if (what === "setFinish") { const it = g.setFinisher(); if (it) g.equip(it); }
  }


  /* ---------- Rendu ---------- */
  renderAll() {
    if (this.tip) this.tip.hidden = true;
    saveHScroll(this.root, this.hs);
    if (this.tab === "adventure") { this.renderHero(); this.renderBag(); this.renderDetail(); this.renderZone(); this.renderLog(); }
    else this.tabs[this.tab].render($(this.root, `[data-pane="${this.tab}"]`));
    // Blocs repliables des onglets (data-keep) : rouverts s'ils l'étaient avant le nouveau rendu.
    for (const d of this.root.querySelectorAll("details[data-keep]")) if (this.kept.has(d.dataset.keep)) d.open = true;
    restoreHScroll(this.root, this.hs);
    this.renderBadges();
    this.dirty = false;
  }

  /** Mémorise les zones repliables ouvertes (l'évènement « toggle » ne remonte pas : écoute en capture). */
  /** Infobulles : celles du système (attribut title) ne s'affichent pas dans cette fenêtre sans focus (signalé par
   *  Victor sur les déblocages). Tout élément du panneau à title reçoit la nôtre, au survol, près de la souris. */
  watchTitles() {
    const tip = document.createElement("div");
    tip.className = "gtip"; tip.hidden = true; tip.setAttribute("role", "tooltip");
    this.root.appendChild(tip);
    this.gtip = tip;
    let cur = null;
    const hide = () => { tip.hidden = true; cur = null; };
    this.root.addEventListener("mouseover", (e) => {
      const el = e.target.closest && e.target.closest("[title], [data-title]");
      if (!el || !this.root.contains(el)) { hide(); return; }
      if (el.hasAttribute("title")) { el.dataset.title = el.getAttribute("title"); el.removeAttribute("title"); } // pas de double bulle
      const text = el.dataset.title;
      if (!text) { hide(); return; }
      cur = el; tip.textContent = text; tip.hidden = false;
    });
    this.root.addEventListener("mousemove", (e) => {
      if (tip.hidden) return;
      const r = this.root.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
      let x = e.clientX - r.left + 14, y = e.clientY - r.top + 16;
      if (x + w > r.width - 4) x = Math.max(4, e.clientX - r.left - w - 10);
      if (y + h > r.height - 4) y = Math.max(4, e.clientY - r.top - h - 10);
      tip.style.left = x + "px"; tip.style.top = y + this.root.scrollTop + "px"; // panneau défilable
    });
    this.root.addEventListener("mouseleave", hide);
    this.root.addEventListener("mousedown", hide);
  }

  watchDetails() {
    this.root.addEventListener("toggle", (e) => {
      const k = e.target.dataset && e.target.dataset.keep;
      if (k) { if (e.target.open) this.kept.add(k); else this.kept.delete(k); }
    }, true);
  }

  /** Nom traduit d'un onglet (annonce d'un onglet débloqué). */
  tabLabel(id) { return (TABS.find((t) => t.id === id) || {}).label || id; }

  renderBadges() {
    const S = this.game.S;
    for (const t of TABS) {
      // Onglet pas encore débloqué (tabs.js) : bouton caché ; tout juste débloqué : pastille ✦ jusqu'à la visite.
      const btn = $(this.root, `[data-tab="${t.id}"]`), open = tabOpen(S, t.id);
      if (btn && btn.hidden === open) btn.hidden = !open;
      // Liens internes vers un onglet encore fermé (cartes, conseils…) : cachés, ils ne mèneraient nulle part.
      if (!open) for (const l of this.root.querySelectorAll(`.linkbtn[data-tab="${t.id}"], .goal[data-tab="${t.id}"]`)) l.hidden = true;
      const isNew = open && S.tabsOpen && S.tabsOpen[t.id] === "new";
      // Pastille plafonnée à « 99+ » (686 points de compétence élargissaient l'onglet ; le nombre exact est dans l'onglet).
      const raw = (tab0 => (tab0 && open ? tab0.badge() : ""))(this.tabs[t.id]);
      const text = (/^\d+$/.test(raw) && +raw > 99 ? "99+" : raw) || (isNew ? "✦" : "");
      const el = $(this.root, `[data-badge="${t.id}"]`);
      if (el.textContent !== text) el.textContent = text;
      el.hidden = !text;
    }
  }

  slotBtn(it, slotKey, from) {
    // Emplacement vide : silhouette grisée de l'objet attendu (même taille qu'un objet), plutôt qu'un mot tassé.
    if (!it) return `<button class="slot emptyslot" data-action="sel" data-from="equip" data-slot="${slotKey}" aria-label="${esc(tx("{0} : vide", { 0: SLOTS[slotKey].name }))}" title="${esc(tx("{0} : vide", { 0: SLOTS[slotKey].name }))}"><img class="ghost" src="${itemIconURL({ slot: slotKey, r: 0 })}" alt=""></button>`;
    const sel = this.selected && ((this.selected.from === "equip" && this.selected.slot === slotKey && from === "equip") ||
      (this.selected.from === "bag" && this.selected.id === it.id && from === "bag"));
    const up = from === "bag" && this.game.isUpgrade(it);
    return `<button class="slot rb${it.r}${sel ? " sel" : ""}" data-action="sel" data-from="${from}" ${from === "bag" ? `data-id="${it.id}"` : `data-slot="${slotKey}"`}
      aria-label="${esc(itemName(it))}, ${RARITIES[it.r].name}${up ? tx(", amélioration") : ""}">
      <img src="${itemIconURL(it)}" alt="">${RARITY_PIP[it.r] ? `<span class="rpip" aria-hidden="true">${RARITY_PIP[it.r]}</span>` : ""}${it.plus ? `<span class="plus">+${it.plus}</span>` : ""}${up ? `<span class="up" aria-hidden="true">▲</span>` : ""}${it.set && SETS[it.set] ? `<span class="setmark tint" style="--c:${SETS[it.set].color}" aria-hidden="true">◆</span>` : ""}</button>`;
  }

  /** Survol d'un emplacement : infobulle avec statistiques et comparaison. */
  /** Pièce de panoplie dans le sac : ce que l'équiper change au décompte (« 2 → 3 / 4 »), mis en valeur s'il débloque un bonus. */
  setProgress(it, cur, fromBag) {
    if (!fromBag || !it.set || !SETS[it.set]) return "";
    const now = setCounts(this.game.S.equip)[it.set] || 0, after = now - (cur && cur.set === it.set ? 1 : 0) + 1;
    if (after <= now) return "";
    const unlocks = (now < 2 && after >= 2) || (now < 4 && after >= 4);
    const g = this.game, kept = it.r < LEGENDARY && !g.isUpgrade(it) && !g.uselessItems().includes(it); // protégée (game.uselessItems)
    return `<p class="setprog${unlocks ? " delta-p" : ""}">${unlocks ? "★ " : ""}${esc(tx("Panoplie {0} : {1} → {2} / 4", { 0: SETS[it.set].name, 1: now, 2: Math.min(4, after) }))}</p>`
      + (kept ? `<p class="setprog">${esc(tx("Gardée pour compléter la panoplie : la vente de l’inutile et la transmutation l’épargnent."))}</p>` : "");
  }

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
      <ul class="lines">${lines}</ul>${power(it, S.equip)}${this.setProgress(it, cur, fromBag)}${verdict}
      <p class="note tight tiphelp">${fromBag ? tx("Double-clic : équiper") : tx("Double-clic : retirer")}</p>`;
    this.tip.hidden = false;
    const r = b.getBoundingClientRect(), pr = this.root.getBoundingClientRect();
    // Jamais par-dessus la barre d'onglets : au plus haut, juste sous l'en-tête du panneau.
    const head = this.root.querySelector(".ptop"), minTop = head ? head.getBoundingClientRect().bottom - pr.top + this.root.scrollTop + 4 : 4;
    const left = Math.min(pr.width - 350, r.right - pr.left + 8), top = Math.max(minTop, Math.min(pr.height - this.tip.offsetHeight - 4, r.top - pr.top + this.root.scrollTop));
    this.tip.style.left = left + "px";
    this.tip.style.top = top + "px";
  }

  renderHero() {
    const g = this.game, S = g.S, hs = g.stats(), cls = g.classDef();
    const extra = EXTRA_STATS.filter(([, , show]) => show(hs)).map(([, label, , val]) => `<dt>${label}</dt><dd>${val(hs)}</dd>`).join("");
    const buffs = CONSUMABLES.filter((c) => c.kind === "buff" && (S.buffs[c.id] || 0) > 0)
      .map((c) => `<span class="chip" title="${esc(c.desc)}">${esc(c.name)} · <span data-buff="${c.id}">${uMin(Math.ceil(S.buffs[c.id] / 60))}</span></span>`).join("");
    // Demande 30 : plus de rappels « points de talent à dépenser » ni « plus de potions » dans la carte du héros.
    const sets = Object.entries(setCounts(S.equip)).filter(([id, n]) => SETS[id] && n >= 2)
      .map(([id, n]) => `<span class="chip set" style="--c:${SETS[id].color}" title="${esc(`${n >= 2 ? "✓" : "·"} ${tx("2 pièces : {0}", { 0: describeEffects(SETS[id].two) })}\n${n >= 4 ? "✓" : "·"} ${tx("4 pièces : {0}", { 0: describeEffects(SETS[id].four) })}`)}">◆ ${esc(SETS[id].name)} ${n}/4</span>`).join("");
    const events = Object.entries(g.R.events).filter(([, t]) => t > 0)
      .map(([id, t]) => `<span class="chip event" style="--c:${EVENTS[id].color}" title="${esc(EVENTS[id].text)}">${esc(EVENTS[id].name)} · ${Math.ceil(t)} s</span>`).join("");
    const dm = activeDayMod(S);
    const day = dm ? `<span class="chip daymod" title="${esc(tx("Bénédiction du jour : change chaque jour à minuit."))}">${dm.icon} ${esc(dm.name)} · ${esc(dm.desc)}</span>` : "";
    // Duo (demande 17) : le compagnon à côté du héros ; un clic mène à l'onglet Héros.
    const pd = S.partner && CLASSES[S.partner];
    const syn = pd && duoSynergy(S.cls, S.partner);
    // Demande F de Victor (on le voyait mal) : le compagnon a sa propre ligne sous le titre, portrait de la même taille.
    const duo = pd ? `<button class="linkbtn duotag" data-tab="class" title="${esc(tx("Duo : {0} combat aux côtés de ton héros (35 % de son attaque par seconde et la moitié de son passif).", { 0: pd.name }) + (syn ? "\n✦ " + tx(syn.name) + " : " + describeEffects(syn.eff) : ""))}"><img src="${classPortraitURL(S.partner)}" alt="">${esc(tx("Compagnon : {0}", { 0: pd.name }))}${syn ? ` <span class="syn">✦ <span class="synname">${esc(tx(syn.name))}</span></span>` : ""}</button>` : "";
    // Sorts appris du héros : icônes à droite de la ligne du compagnon (rang en infobulle) ; un clic mène aux sorts.
    const learned = classSpells(S.cls).filter((x) => spellRank(S, x.id) > 0);
    const spl = learned.length ? `<button class="linkbtn spellmini" data-tab="class" data-sec="style">${learned.map((x) => `<img src="${spellIconURL(x.tpl, x.color, 2, x.fx?.[0])}" alt="" title="${esc([tx("Rang {0} : {1}", { 0: spellRank(S, x.id), 1: tr(x.name) }), ...spellFxText(x, spellRank(S, x.id))].join(" · "))}">`).join("")}</button>` : "";
    $(this.root, "#p-hero").innerHTML = `<h2><span class="hname"><img src="${classPortraitURL(S.cls)}" alt="">${esc(cls.name)}</span> <small>${tx("niveau {0}", { 0: S.lvl })}</small></h2>${duo || spl ? `<div class="duoline">${duo}${spl}</div>` : ""}
      <div class="kv"><span>${tx("Expérience")}</span><span id="xptxt"></span></div><div class="bar"><i id="xpbar"></i></div>
      <div class="tiles">
        <div class="tile"><img src="${shopIconURL("heart", 3)}" alt=""><span>${tx("Points de vie")}</span><b>${fmtStat("hp", hs.hp)}</b></div>
        <div class="tile"><img src="${shopIconURL("ws_atk", 3)}" alt=""><span>${tx("Attaque")}</span><b>${fmtStat("atk", hs.atk)}</b></div>
        <div class="tile"><img src="${shopIconURL("ws_hp", 3)}" alt=""><span>${tx("Défense")}</span><b>${fmtStat("def", hs.def)}</b></div>
        <div class="tile power" title="${esc(tx("Score global de ton héros (attaque, survie, vitesse) : sert à comparer les objets."))}"><img src="${shopIconURL("star", 3)}" alt=""><span>${tx("Puissance")}</span><b>${fmt(Math.round(heroPower(hs)))}</b></div>
      </div>
      ${this.visitHTML()}${this.goalHTML(S)}
      ${day || buffs || events || sets ? `<div class="chips hscroll" data-hs="hero-chips">${day}${sets}${events}${buffs}</div>` : ""}
      <div class="morerow">${this.todoBox()}${this.chronicleBox()}
      <details class="more" data-keep="hero-stats"${this.kept.has("hero-stats") ? " open" : ""}><summary>${tx("Toutes les statistiques")}</summary>
      <dl class="stats">${Object.keys(STAT_NAMES).filter((k) => !["hp", "atk", "def"].includes(k)).map((k) => `<dt>${STAT_NAMES[k]}</dt><dd>${fmtStat(k, hs[k])}</dd>`).join("")}${extra}
      <dt>${tx("Potions de soin")}</dt><dd>${S.potions}</dd><dt>${tx("Or")}</dt><dd id="goldtxt"></dd>
      ${S.prestige.count ? `<dt>${tx("Ascensions")}</dt><dd>${S.prestige.count} · ✦ ${S.prestige.shards}</dd>` : ""}</dl></details></div>`;
    this.tick();
  }

  renderBag() {
    const S = this.game.S, cells = [];
    const useless = this.game.uselessItems(), uselessGold = useless.reduce((a, it) => a + sellValue(it), 0), tr = this.game.transmutePlan();
    // Affichage trié (le sac lui-même garde l'ordre d'arrivée) : améliorations ▲, puis rareté, puis emplacement.
    const slotOrder = Object.keys(SLOTS), up = new Map(S.bag.map((it) => [it.id, this.game.isUpgrade(it)]));
    const shown = [...S.bag].sort((a, b) => (up.get(b.id) - up.get(a.id)) || (b.r - a.r) || (slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot)) || (b.il - a.il));
    for (let i = 0; i < S.bagSize; i++) {
      const it = shown[i];
      cells.push(it ? this.slotBtn(it, it.slot, "bag") : `<div class="slot emptyslot" aria-hidden="true"></div>`);
    }
    const full = S.bag.length >= S.bagSize;
    const selIt = this.getSel();
    if (selIt) { // détail de l'objet sous la grille, à la place des commandes (elles reviennent avec « ← sac »)
      $(this.root, "#p-bag").innerHTML = `<h2>${tx("Sac")} <small>${S.bag.length} / ${S.bagSize}</small></h2><div class="bag">${cells.join("")}</div>${this.itemDetailHTML(selIt)}`;
      return;
    }
    $(this.root, "#p-bag").innerHTML = `<h2>${tx("Sac")} <small${full ? ` ${tx("class=\"warn\" title=\"Sac plein : les nouveaux objets restent au sol. Vends ou transmute pour faire de la place.\"")}` : ""}>${full ? tx("plein · ") : ""}${S.bag.length} / ${S.bagSize}</small>${S.best <= 10 && S.prestige.count === 0 && this.game.hasUpgrade() ? ` <span class="baghint">${tx("▲ double-clic : équiper")}</span>` : ""} <button class="linkbtn bagsort" data-action="bagsort" title="${esc(tx("Ranger le sac : améliorations, puis rareté, puis niveau"))}">⇅</button> <span class="note help" title="${esc(tx("▲ signale un objet plus puissant que ce que porte ton héros.") + " " + tx("Rareté : • peu commun, •• rare, ••• épique, ★ légendaire."))}">ⓘ</span></h2><div class="bag">${cells.join("")}</div>
      <div class="row">${hasUnlock(S, "bulkEquip") ? `<button data-action="sellless"${useless.length ? "" : " disabled"} title="${esc(tx("Vend tout ce qui n’est pas plus puissant que ton équipement actuel. Les légendaires sont toujours gardés."))}">${tx("Vendre ce qui ne m’améliore pas{0}", { 0: useless.length ? ` ${tx("({0} · {1} or)", { 0: useless.length, 1: fmt(uselessGold) })}` : "" })}</button>
      <button data-action="autoequip"${this.game.hasUpgrade() ? ` class="primary"` : " disabled"}>${tx("Équiper le meilleur{0}", { 0: this.game.hasUpgrade() ? " ▲" : "" })}</button>` : lockLink(S, "bulkEquip")}
      ${hasUnlock(S, "transmute") ? `<button data-action="transmute"${tr.made ? "" : " disabled"} title="${esc(tx("3 objets inutiles d’une même rareté → 1 objet de la rareté au-dessus (jusqu’à légendaire)."))}">${tx("Transmuter{0}", { 0: tr.made ? ` ${tx("({0} nouveau{1})", { 0: tr.made, 1: tr.made > 1 ? "x" : "" })}` : " (3 → 1)" })}</button>` : lockLink(S, "transmute")}</div>
      ${hasUnlock(S, "autoSell") ? `<div class="sellrow"><span>${tx("Vendre dès qu’ils tombent :")}</span>${[["common", "Vendre les communs dès qu’ils tombent"], ["uncommon", "Vendre les peu communs dès qu’ils tombent"], ["rare", "Vendre les rares dès qu’ils tombent"]]
        .map(([r, label]) => `<label class="toggle" title="${esc(tx(label))}"><input type="checkbox" data-action="as" data-r="${r}"${S.autoSell[r] ? " checked" : ""}> ${esc(lc(RARITIES.find((x) => x.id === r).name))}</label>`).join("")}</div>` : lockLink(S, "autoSell")}
      ${hasUnlock(S, "armsValet") ? `<label class="toggle"><input type="checkbox" data-action="valet"${S.settings.autoEquipDrops !== false ? " checked" : ""}> ${tx("Valet d’armes : équiper tout seul les objets plus puissants")}</label>` : ""}
      ${hasUnlock(S, "crucible") ? `<label class="toggle"><input type="checkbox" data-action="crucible"${S.settings.autoTransmute !== false ? " checked" : ""}> ${tx("Creuset perpétuel : transmuter quand le sac se remplit")}</label>` : ""}
      ${hasUnlock(S, "masterForge") ? `<label class="toggle"><input type="checkbox" data-action="mforge"${S.settings.autoForge !== false ? " checked" : ""}> ${tx("Maître de forge : forger l’équipement porté avec l’or en trop")}</label>` : ""}
`;
  }

  getSel() {
    const s = this.selected;
    if (!s) return null;
    return s.from === "equip" ? this.game.S.equip[s.slot] : this.game.findBagItem(s.id);
  }

  renderDetail() {
    const el = $(this.root, "#p-detail"), S = this.game.S;
    { // Panneau Équipement toujours visible ; le détail d'un objet s'ouvre sous le sac (demande de Victor).
      const v = heroVisual(S);
      const rows = SLOT_KEYS.map((k) => {
        const e = S.equip[k];
        return `<li class="eqline">${this.slotBtn(e, k, "equip")}<div class="si">${e
          ? `<div class="nm rc${e.r}">${esc(itemName(e))}${e.plus ? " +" + e.plus : ""}</div><div class="sub">${SLOTS[k].name}${tx(", niveau {0}{1}", { 0: e.il, 1: e.power && POWER_INDEX[e.power] ? ` · ★ ${esc(POWER_INDEX[e.power].name)}` : "" })}</div>`
          : `<div class="nm empty">${SLOTS[k].name} ${tx(": vide")}</div>`}</div></li>`;
      }).join("");
      // Demande E de Victor : « clique un objet » ne disait pas pourquoi : on dit ce que fait le clic.
      el.innerHTML = `<h2>${tx("Équipement")} <small>${hasUnlock(S, "forge") ? tx("clic sur un objet : détails et forge") : tx("clic sur un objet : détails")}</small></h2>
        <div class="eqview"><img class="heroport${v.aura ? " legend" : ""}" src="${dressedPortraitURL(S.cls, v)}" alt="${esc(tx("Ton héros et son équipement"))}">
        <ul class="eqlist">${rows}</ul></div>`;
    }
  }

  /** Détail de l'objet sélectionné (sac ou équipement), affiché dans le panneau Sac, sous la grille : le verdict et
   *  les boutons d'abord (visibles sans défiler), puis les statistiques, serrées ; la note de forge en infobulle. */
  itemDetailHTML(it) {
    const S = this.game.S, fromBag = this.selected.from === "bag";
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
    // Sans ligne de titre « Objet » (demande 18) : le retour au sac est dans l'en-tête de l'objet.
    return `<div class="bagdetail">
      <div class="detail-head"><img src="${itemIconURL(it)}" alt=""><div class="dh-main">
        <div class="nm rc${it.r}">${esc(itemName(it))}${it.plus ? " +" + it.plus : ""}</div>
        <div class="sub">${SLOTS[it.slot].name} ${tx("{0}, niveau {1}{2}", { 0: r.name.toLowerCase(), 1: it.il, 2: fromBag ? "" : tx(", équipé") })}</div></div>
        <button class="linkbtn back" data-action="desel">${tx("← sac")}</button></div>
      ${verdict}
      <div class="row">${fromBag
        ? `<button data-action="equip">${tx("Équiper")}</button><button data-action="sell">${tx("Vendre ({0} or)", { 0: fmt(sellValue(it)) })}</button>`
        : `<button data-action="unequip"${this.game.bagFull() ? " disabled" : ""}>${tx("Retirer")}</button>`}
        ${hasUnlock(S, "starAnvil") && it.il < S.best ? `<button data-action="itemlevel"${S.gold >= levelUpCost(it, S) ? "" : " disabled"} title="${esc(tx("Remonte cet objet au niveau de ton record : ses statistiques grandissent, le reste est conservé."))}">${tx("Mettre au niveau {0} ({1} or)", { 0: S.best, 1: fmt(levelUpCost(it, S)) })}</button>` : ""}
        ${!hasUnlock(S, "forge") ? lockLink(S, "forge") : ""}${hasUnlock(S, "forge") && RARITIES[it.r].affixes ? `<button data-action="reforge"${S.gold >= reforgeCost(it) ? "" : " disabled"} title="${esc(tx("Tire au hasard de nouveaux bonus secondaires. Rareté, forge, pouvoir et panoplie sont conservés."))}">${tx("Réforger ({0} or)", { 0: fmt(reforgeCost(it)) })}</button>` : ""}
        ${hasUnlock(S, "forge") ? `<button data-action="forge"${canForge ? "" : " disabled"} title="${esc(tx("Chaque niveau de forge ajoute 10{0}% à toutes les statistiques de l’objet. La forge ne peut pas échouer.", { 0: NB }))}">${it.plus >= MAX_PLUS ? tx("Amélioration maximale") : `${tx("Forger +{0} ({1} or)", { 0: it.plus + 1, 1: fmt(fc) })}`}</button>` : ""}</div>
      <ul class="lines tight">${lines}</ul>${power(it, S.equip)}</div>`;
  }

  /** « Quoi de neuf » (game/news.js) : la liste des nouveautés dans la fenêtre modale. */
  /** Raccourcis clavier : fenêtre large sur deux colonnes (dépliée dans les Réglages, la liste faisait défiler l'onglet). */
  /** Contenu d'une section repliable dans la fenêtre large (titre = son résumé). Un bouton ou lien dedans la referme. */
  showDetails(d) {
    const body = d.cloneNode(true); body.querySelector("summary")?.remove();
    $(this.root, "#mt").textContent = d.querySelector("summary").textContent.trim();
    const mb = $(this.root, "#mbody");
    mb.innerHTML = `<div class="modalwide">${body.innerHTML}</div>`;
    mb.firstElementChild.addEventListener("click", (e) => { if (e.target.closest("[data-tab], [data-action]")) $(this.root, "#modal").hidden = true; });
    $(this.root, "#modal").hidden = false;
    $(this.root, "#modal [data-action=closemodal]").focus({ preventScroll: true });
  }

  showKeys() {
    const K = [[tx("Changer d’onglet"), "1 … 9, 0, -, ="], [tx("Équiper le meilleur"), "E"], [tx("Vendre ce qui n’améliore pas"), "V"],
      [tx("Ranger le sac"), "S"], [tx("Transmuter les objets inutiles"), "T"], [tx("Réclamer une quête terminée (toutes avec le Bureau des contrats)"), "R"],
      [tx("Confirmer une fenêtre"), tx("Entrée")], [tx("Fermer le panneau"), tx("Échap")], [tx("Réduire en mode mini"), "M"], [tx("Couper / rallumer le son"), "C"], [tx("Couper / rallumer la musique"), "B"]];
    $(this.root, "#mt").textContent = tx("Raccourcis clavier");
    $(this.root, "#mbody").innerHTML = `<ul class="lines keylist">${K.map(([l, k]) => `<li><span>${esc(l)}</span><b>${esc(k)}</b></li>`).join("")}</ul>
      <p class="note">${tx("Actifs quand le panneau est ouvert et que tu as cliqué dedans.")}</p>`;
    $(this.root, "#modal").hidden = false;
    $(this.root, "#modal [data-action=closemodal]").focus({ preventScroll: true });
  }

  /** `seen` : dernière édition déjà lue (0 : toutes les éditions). */
  showNews(seen = 0) {
    // Même gabarit que les autres fenêtres (titre #mt, contenu #mbody) : elles restent utilisables ensuite.
    $(this.root, "#mt").textContent = tx("Quoi de neuf");
    const { items, older } = newsShown(seen);
    $(this.root, "#mbody").innerHTML = `<ul class="lines newslist${items.length > 14 ? " dense" : ""}">${items.map((t) => `<li><span>${esc(tx(t))}</span></li>`).join("")}</ul>`
      + (older ? `<p class="note">${esc(txn(older, "… et {n} nouveauté plus ancienne.|… et {n} nouveautés plus anciennes."))}</p>` : "");
    $(this.root, "#modal").hidden = false;
    $(this.root, "#modal [data-action=closemodal]").focus({ preventScroll: true });
  }

  /** Prochain déblocage : objectif visible en permanence (zone record, puis or). */
  goalHTML(S) {
    if (!tabOpen(S, "shop")) { // pas de déblocage avant la boutique (signalé par Victor) : la prochaine découverte (onglet)
      const next = Object.values(TAB_GATES).filter((g) => g.zone > recordZone(S)).sort((a, b) => a.zone - b.zone)[0];
      if (!next) return "";
      const k = Math.min(1, recordZone(S) / next.zone);
      return `<div class="goal" role="status"><img src="${shopIconURL("map", 2)}" alt=""><span class="gtxt"><small>${tx("Prochaine découverte")}</small> ${tx("zone {0}", { 0: next.zone })} (${recordZone(S)} / ${next.zone})</span>
        <span class="gbar"><i style="width:${Math.round(k * 100)}%"></i></span></div>`;
    }
    const u = nextUnlock(S);
    if (!u) { // tout est débloqué : l'objectif devient le record de toutes les courses
      const rec = recordZone(S), k = Math.min(1, S.zone / rec);
      return `<button class="goal${S.zone >= rec ? " ready" : ""}" data-tab="ascension">
        <img src="${shopIconURL("trophy", 2)}" alt=""><span class="gtxt"><small>${tx("Prochain objectif")}</small> ${tx("battre ton record : zone {0}", { 0: rec })} (${S.zone} / ${rec})</span>
        <span class="gbar"><i style="width:${Math.round(k * 100)}%"></i></span></button>`;
    }
    const zoneOk = unlockAvailable(S, u);
    const k = zoneOk ? Math.min(1, S.gold / u.price) : Math.min(1, recordZone(S) / u.zone);
    const ready = zoneOk && S.gold >= u.price;
    const what = zoneOk ? (ready ? tx("cliquer pour l’acheter ({0} or)", { 0: fmt(u.price) }) : `${fmt(S.gold)} / ${tx("{0} or", { 0: fmt(u.price) })}`) : tx("Zone record {0}", { 0: u.zone }) + ` (${recordZone(S)} / ${u.zone})`;
    // Prêt : un clic l'achète tout de suite (au lieu d'ouvrir la boutique puis d'y cliquer).
    return `<button class="goal${ready ? " ready" : ""}" ${ready ? `data-action="goal-buy" data-id="${u.id}"` : `data-tab="shop" data-sec="unlocks"`} title="${esc(u.desc)}">
      <img src="${shopIconURL(u.icon, 2)}" alt=""><span class="gtxt"><small>${tx("Prochain déblocage")}</small> ${esc(u.name)} · ${what}</span>
      <span class="gbar"><i style="width:${Math.round(k * 100)}%"></i></span></button>`;
  }

  renderZone() {
    const S = this.game.S, Z = this.game.zoneDef(), b = monsterBase(S.zone, false), bb = monsterBase(S.zone, true, Z.boss);
    const rows = RARITIES.map((r, i) => `<tr><td class="rc${i}">${r.name}</td><td>${r.weight}${unit("%")}</td></tr>`).join("");
    const names = Z.monsters.map((m) => MONSTERS[m].name);
    const list = listJoin(names);
    $(this.root, "#p-zone").innerHTML = `<h2>${tx("Zone {0}", { 0: S.zone })} <small>${tx("record : {0}", { 0: S.best })}</small></h2>
      <p class="zname">${esc(this.game.zoneName())}</p>
      <p class="note tight" title="${esc(list)}">${names.length} ${tx("types de monstres, ~{0} PV. Boss ({1}) : {2} PV.", { 0: fmt(b.hp), 1: esc(lc(MONSTERS[Z.boss].name)), 2: fmt(bb.hp * (1 - bossWear(S, S.zone))) })}</p>
      <p class="note tight bossmech">${tx("Boss :")} <b class="bname">${esc(bossName(S.zone))}</b>. ${tx("Capacités du boss :")} ${bossMechanics(S.zone).map((id) => { // Malédiction : la parade, si le joueur a déjà vu le Talisman de pureté
          const parry = id === "curse" && (S.powersSeen || {}).p_pure ? "\n" + tx("Parade : {0}", { 0: tx("Talisman de pureté") }) : "";
          return `<b title="${esc(BOSS_MECHANICS[id].desc + parry)}">${esc(BOSS_MECHANICS[id].name)}</b>`; }).join(", ")}.</p>
      ${bossWear(S, S.zone) ? `<p class="note tight">${tx("Boss épuisé par tes tentatives : −{0} % de PV jusqu’à ce que tu le battes.", { 0: Math.round(bossWear(S, S.zone) * 100) })}</p>` : ""}
      <div class="kv"><span>${tx("Avant le boss")}</span><span id="killtxt"></span></div><div class="bar"><i id="killbar"></i></div>
      <label class="toggle"><input type="checkbox" data-action="adv"${S.autoAdvance ? " checked" : ""}> ${tx("Passer à la zone suivante après le boss")}</label>
      <div class="row"><button data-action="zprev"${S.zone > 1 ? "" : " disabled"}>${tx("Zone précédente")}</button>
      <button data-action="znext"${S.zone < S.best ? "" : " disabled"}>${tx("Zone suivante")}</button></div>
      <details class="rates-box" data-keep="rates"${this.kept.has("rates") ? " open" : ""}><summary>${tx("Chances de butin")}</summary>
      <p class="note tight">${dec(String(Math.round(DROP_CHANCE * earlyPace(S) * 1000) / 10))}${NB}${tx("% par monstre, 100{0}% sur le boss (rare minimum) et sur les élites dorés ({1}{2}% des monstres, or ×{3}). Si un objet tombe, sa rareté suit ce tableau :", { 0: NB, 1: Math.round(ELITE.chance * 100), 2: NB, 3: ELITE.gold })}</p>
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
    if (t) {
      if (t.closest("#modal")) $(this.root, "#modal").hidden = true;
      // Lien vers un sous-onglet précis (ex. déblocages de la boutique, demande 18).
      if (t.dataset.sec && this.tabs[t.dataset.tab]) this.tabs[t.dataset.tab].sec = t.dataset.sec;
      this.setTab(t.dataset.tab); return;
    }
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
    if (a === "chron-play") { this.game.emit("chronicleReplay", { id: b.dataset.id }); return; }
    if (a === "todo-do") { this.todoDo(b.dataset.what); b.disabled = true; b.textContent = "✓ " + b.textContent.replace(/^✦ /, ""); this.renderAll(); return; }
    if (a === "goal-buy") { g.buyUnlock(b.dataset.id); b.disabled = true; b.textContent = "✓ " + b.textContent; this.renderAll(); return; } // le résumé d'absence reste ouvert
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
      case "itemlevel": if (it) g.levelItem(it); break;
      case "bagsort": g.sortBag(); break;
      case "showkeys": this.showKeys(); return;
      case "sellless": {
        const n = g.uselessItems().length;
        this.confirm(tx("Vendre les objets inutiles ?"), txn(n, "{n} objet qui n’améliore pas ton héros sera vendu. Les légendaires sont toujours gardés.|{n} objets qui n’améliorent pas ton héros seront vendus. Les légendaires sont toujours gardés."), tx("Vendre"), () => {
          g.sellUseless();
          if (this.selected?.from === "bag" && !this.getSel()) this.selected = null;
          this.renderAll();
        });
        return;
      }
      case "transmute": {
        const plan = g.transmutePlan();
        this.confirm(tx("Transmuter les objets inutiles ?"), txn(plan.made, "Chaque groupe de 3 objets inutiles d’une même rareté devient 1 objet de la rareté au-dessus : au moins {n} nouvel objet. Les légendaires ne sont jamais utilisés.|Chaque groupe de 3 objets inutiles d’une même rareté devient 1 objet de la rareté au-dessus : au moins {n} nouveaux objets. Les légendaires ne sont jamais utilisés."), tx("Transmuter"), () => {
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
      case "visit-ok": this.sinceVisit = null; this.renderHero(); return;
      case "close": this.onClose?.(); return;
      case "mini": this.onMini?.(); return;
      case "quit": this.confirm(tx("Quitter Sillwalker ?"), tx("Ta partie est sauvegardée. Ton héros continuera de progresser hors ligne (jusqu’à {0} h).", { 0: Math.round(g.offlineCapS() / 3600) }), tx("Quitter le jeu"), () => this.onQuit?.()); return;
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
    if (b.dataset.action === "se-opacity-range") { this.tabs.settings.onAction("se-opacity-range", b); return; } // curseur d'opacité (demande 26)
    if (b.dataset.action === "as") this.game.setAutoSell(b.dataset.r, b.checked);
    if (b.dataset.action === "adv") this.game.setAutoAdvance(b.checked);
    if (b.dataset.action === "valet") { this.game.S.settings.autoEquipDrops = b.checked; this.game.changed(); }
    if (b.dataset.action === "mforge") { this.game.S.settings.autoForge = b.checked; this.game.changed(); }
    if (b.dataset.action === "crucible") { this.game.S.settings.autoTransmute = b.checked; this.game.changed(); }
    if (b.dataset.action === "steward") { this.game.S.settings.autoPets = b.checked; this.game.changed(); }
  }

  /**
   * Raccourcis clavier (panneau ouvert) : 1-9, 0 et - = onglets, = = Réglages,
   * E = équiper le meilleur, V = vendre ce qui n'améliore pas, T = transmuter.
   * Renvoie true si la touche a été utilisée.
   */
  onKey(e) {
    if (e.ctrlKey || e.altKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return false;
    if (!$(this.root, "#confirm").hidden) {
      if (e.key === "Enter") { const fn = this.confirmFn; this.closeConfirm(); fn?.(); return true; }
      return false;
    }
    const order = "1234567890-=";
    const i = order.indexOf(e.key);
    if (i >= 0 && TABS[i] && tabOpen(this.game.S, TABS[i].id)) { this.setTab(TABS[i].id); return true; }
    const k = e.key.toLowerCase();
    if (k === "m") { this.onMini?.(); return true; } // réduire en mode mini sans chercher le bouton
    if (k === "b") { this.onMusicToggle?.(); return true; } // musique seule (bande-son)
    if (k === "c") { this.onMute?.(); return true; } // couper / rallumer le son (comme le haut-parleur de la bande)
    if (k === "r") { // réclamer les quêtes terminées : une par appui, toutes avec le Bureau des contrats
      const done = this.game.S.quests.slots.filter((q) => questDone(q));
      if (!done.length) return false;
      for (const q of hasUnlock(this.game.S, "questDesk") ? done : done.slice(0, 1)) this.game.claimQuest(q.uid);
      this.renderAll();
      return true;
    }
    if ((k === "e" || k === "v" || k === "t") && !hasUnlock(this.game.S, k === "t" ? "transmute" : "bulkEquip")) return false;
    if (k === "e") { this.game.autoEquip(); this.selected = null; this.renderAll(); return true; }
    if (k === "s") { this.game.sortBag(); this.renderAll(); return true; } // ranger le sac (comme le bouton ⇅)
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
