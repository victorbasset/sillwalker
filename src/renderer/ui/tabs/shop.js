// Onglet Boutique : marchand (stock renouvelé, bonne affaire, objet pour
// l'emplacement le plus faible), potions et élixirs, coffres et œuf,
// atelier (améliorations permanentes illimitées). Tout est illustré.
import { subtabsHTML } from "../subtabs.js";
import { eggsAllowed } from "../../game/tabs.js";
import { itemName, itemKindLine } from "../../i18n/data.js";
import { t as tx, txn } from "../../i18n/index.js";
import { RARITIES, SLOTS } from "../../game/data.js";
import {
  CONSUMABLES, CHESTS, UPGRADES, WORKSHOP, POTION_MAX, BUFF_CAP_S, DEAL_DISCOUNT,
  consumablePrice, chestPrice, upgradePrice, rerollPrice, workshopPrice, eggPrice,
} from "../../game/shop.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, fmtShort, esc, NB, unit, uH, uMin } from "../../game/format.js";
import { itemIconURL } from "../../render/sprites.js";
import { shopIconURL } from "../../render/shopart.js";
import { POWER_INDEX } from "../../game/powers.js";
import { SETS } from "../../game/sets.js";
import { UNLOCKS, hasUnlock, nextUnlock, unlockAvailable } from "../../game/unlocks.js";
import { lockLink as lockLinkS } from "../locks.js";

const mmss = (s) => { s = Math.max(0, Math.ceil(s)); const m = Math.floor(s / 60); return m >= 60 ? `${uH(Math.floor(m / 60))} ${String(m % 60).padStart(2, "0")}` : `${uMin(m)} ${String(s % 60).padStart(2, "0")}`; };
/** Effet court affiché sous chaque consommable. */
const SHORT = { potion: tx("Rend 50 % des PV"), elixir: tx("+25 % d’attaque"), fortune: tx("+50 % d’or"), wisdom: tx("+50 % d’expérience"), haste: tx("+30 % de vitesse"), luck: tx("+40 % de butin"), iron: tx("+30 % PV et défense") };

export class ShopTab {
  constructor(game) { this.game = game; this.root = null; this.sec = "shop"; } // sous-onglet affiché (demande 18)

  badge() { return ""; }

  render(el) {
    this.root = el;
    const g = this.game, S = g.S, stock = g.shopStock(), full = g.bagFull();
    // (it. 847) tuiles étroites (potions, coffres, œuf) : prix court à 3 chiffres (« 257 M » et non « 256,59 / M »
    // coupé sur deux lignes) ; le prix exact reste dans la bulle quand l'achat est possible.
    const buy = (action, id, price, block = "", cls = "", short = false) =>
      block ? `<button disabled class="buy">${esc(block)}</button>`
        : `<button data-action="${action}" data-id="${id}" class="buy ${cls}"${S.gold < price ? ` ${tx("disabled title=\"Pas assez d’or\"")}` : short && fmtShort(price) !== fmt(price) ? ` title="${fmt(price)}"` : ""}><i class="coin"></i>${short ? fmtShort(price) : fmt(price)}</button>`;

    // --- Marchand ---
    const merchant = stock.items.length ? stock.items.map((it) => {
      const d = g.upgradeDelta(it), cur = S.equip[it.slot], up = !cur || d > 0.005;
      const verdict = cur ? `${d >= 0 ? "+" : "−"}${Math.abs(Math.round(d * 100))}${unit("")}${tx("% de puissance")}` : tx("emplacement vide");
      return `<div class="mcard rb${it.r}${it.deal ? " deal" : ""}${up ? " up" : ""}">
        ${it.deal ? `<span class="ribbon">−${Math.round(DEAL_DISCOUNT * 100)}${unit("%")}</span>` : ""}
        <img src="${itemIconURL(it)}" alt="">
        <div class="nm rc${it.r}" title="${esc(itemName(it))}">${esc(itemName(it))}</div>
        <div class="sub">${itemKindLine(it, true)}</div>
        ${it.power && POWER_INDEX[it.power] ? `<div class="sub power-mini one" title="${esc(POWER_INDEX[it.power].name)}">★ ${esc(POWER_INDEX[it.power].name)}</div>` : ""}
        ${it.set && SETS[it.set] ? `<div class="sub tint one" style="--c:${SETS[it.set].color}" title="${esc(SETS[it.set].name)}">◆ ${esc(SETS[it.set].name)}</div>` : ""}
        <div class="verdict ${d > 0.005 || !cur ? "delta-p" : d < -0.005 ? "delta-n" : ""}">${up ? "▲ " : ""}${verdict}</div>
        ${buy("s-item", it.id, it.price, full ? tx("Sac plein") : "", up ? "primary" : "")}
      </div>`;
    }).join("") : `<p class="empty">${tx("Le marchand a tout vendu. Revenez plus tard !")}</p>`;

    // --- Potions et élixirs ---
    const consumables = CONSUMABLES.map((c) => {
      const price = consumablePrice(c, S);
      let owned, block = "", active = false;
      if (c.kind === "stock") { owned = `${S.potions} / ${POTION_MAX}`; if (S.potions >= POTION_MAX) block = tx("Stock plein"); }
      else {
        const rem = S.buffs[c.id] || 0;
        active = rem > 0;
        owned = active ? `${tx("actif ·")} <span id="buff-${c.id}">${mmss(rem)}</span>` : tx("10 min");
        if (rem + c.duration > BUFF_CAP_S) block = tx("Maximum");
      }
      return `<div class="ctile${active ? " active" : ""}" title="${esc(c.desc)}">
        <img src="${shopIconURL(c.id)}" alt="">
        <div class="nm">${esc(c.name)}</div>
        <div class="eff">${esc(SHORT[c.id] || "")}</div>
        <div class="sub">${owned}</div>
        ${buy("s-cons", c.id, price, block, "", true)}
        ${c.id === "potion" && !hasUnlock(S, "autoPotion") ? `<span class="note lockmini">🔒 ${tx("auto")}</span>` : ""}${c.id === "potion" && hasUnlock(S, "autoPotion") ? `<label class="toggle mini"><input type="checkbox" data-action="s-autopot"${S.autoPotions ? " checked" : ""}> ${tx("auto")}</label>` : ""}
      </div>`;
    }).join("");

    // --- Coffres et œuf ---
    const chests = CHESTS.map((c) => `<div class="ctile chesttile">
        <img src="${shopIconURL(c.id, 6)}" alt="">
        <div class="nm rc${c.minRarity}">${esc(c.name)}</div>
        <div class="eff">${esc(RARITIES[c.minRarity].name)} ${tx("ou mieux")}</div>
        <div class="sub">${tx("niveau {0}", { 0: S.best })}</div>
        ${buy("s-chest", c.id, chestPrice(c, S), full ? tx("Sac plein") : "", "", true)}
      </div>`).join("") + (!eggsAllowed(S) ? "" : `<div class="ctile chesttile">
        <img src="${shopIconURL("egg", 6)}" alt="">
        <div class="nm">${tx("Œuf de familier")}</div>
        <div class="eff">${tx("Un familier au hasard")}</div>
        <div class="sub">${tx("1 par étal")}</div>
        ${buy("s-egg", "egg", eggPrice(S), stock.eggSold ? tx("Vendu") : "", "", true)}
      </div>`); // œuf de familier : seulement une fois l'onglet Familiers là (demande 19)

    // --- Atelier (permanent) ---
    const W = S.workshop || {};
    const workshop = WORKSHOP.map((w) => {
      const n = W[w.id] || 0, maxed = w.max && n >= w.max;
      return `<div class="wsline">
        <img src="${shopIconURL(w.id, 4)}" alt="">
        <div class="si"><div class="nm">${esc(w.name)} <small>${tx("niv. {0}", { 0: n })}${w.max ? " / " + w.max : ""}</small></div>
          <div class="sub">${n ? `<span class="delta-p">${esc(describeEffects(w.eff, n))}</span> · ` : ""}${tx("prochain : {0}", { 0: esc(describeEffects(w.eff, 1)) })}</div></div>
        ${maxed ? `<button disabled class="buy">${tx("Maximum")}</button>` : buy("s-ws", w.id, workshopPrice(w, S))}
        ${!maxed && S.gold >= workshopPrice(w, S) * (1 + w.growth) ? `<button class="quiet wsmax" data-action="s-wsmax" data-id="${w.id}" title="${esc(tx("Acheter autant de niveaux que possible"))}">${tx("max")}</button>` : ""}
      </div>`;
    }).join("") + UPGRADES.map((u) => {
      const have = S.upgrades[u.id] || 0, maxed = have >= u.max;
      return `<div class="wsline">
        <img src="${shopIconURL("bag", 4)}" alt="">
        <div class="si"><div class="nm">${esc(u.name)} <small>${have} / ${u.max}</small></div><div class="sub">${S.bagSize} ${tx("places · +6 par niveau")}</div></div>
        ${maxed ? `<button disabled class="buy">${tx("Maximum")}</button>` : buy("s-up", u.id, upgradePrice(u, S))}
      </div>`;
    }).join("");

    // --- Déblocages (permanents) : la progression du confort de jeu ---
    const nxt = nextUnlock(S), owned = UNLOCKS.filter((u) => hasUnlock(S, u.id)).length;
    // Demande 32 : tous les déblocages, acquis compris, sur une rangée qui défile de côté (molette ou glisser),
    // ouverte au premier qui reste à acheter.
    const firstTodo = UNLOCKS.find((u) => !hasUnlock(S, u.id));
    const unlocks = UNLOCKS.map((u) => {
      const have = hasUnlock(S, u.id), isNext = nxt && nxt.id === u.id && unlockAvailable(S, u);
      return `<div class="ucard${have ? " owned" : ""}${isNext ? " next" : ""}" title="${esc(u.desc)}"${firstTodo === u ? " data-hs-start" : ""}>
        <img src="${shopIconURL(u.icon, 4)}" alt="">
        <div class="nm">${esc(u.name)}</div>
        <div class="sub">${esc(u.desc)}</div>
        ${have ? `<div class="got">✓ ${tx("Débloqué")}</div>` : unlockAvailable(S, u) ? buy("s-unlock", u.id, u.price, "", isNext ? "primary" : "") : `<div class="req">🔒 ${tx("Zone record {0}", { 0: u.zone })}</div>`}
      </div>`;
    }).join("");

    const buyable = UNLOCKS.filter((u) => !hasUnlock(S, u.id) && unlockAvailable(S, u) && S.gold >= u.price).length;
    el.innerHTML = `<div class="shopbar"><span class="purse"><i class="coin"></i>${tx("{0} or", { 0: `<b id="shop-gold">${fmt(S.gold)}</b>` })}</span>
        <span class="note">${tx("Nouvel étal dans")} <span id="shop-timer">${mmss((stock.next - Date.now()) / 1000)}</span></span>
        <button data-action="s-reroll" class="quiet"${S.gold < rerollPrice(S) ? " disabled" : ""}>${tx("Renouveler l’étal ({0} or)", { 0: fmt(rerollPrice(S)) })}</button></div>
      ${subtabsHTML([["shop", tx("Marchand")], ["unlocks", tx("Déblocages"), buyable || null], ["workshop", tx("Atelier")]], this.sec, "s-sec")}
      <div class="shoproot sec-${this.sec}">
      <article class="panel unlocks"><h2>${tx("Déblocages")} <small>${owned} / ${UNLOCKS.length} · ${tx("permanents, gardés à l’ascension")}</small></h2><div class="ugrid hscroll" data-hs="unlocks">${unlocks}</div></article>
      <div class="shopgrid2">
        <article class="panel merchant"><h2>${tx("Marchand")} <small>${tx("un objet pour ton point faible, une bonne affaire")}</small></h2><div class="mgrid hscroll" data-hs="merchant">${merchant}</div></article>
        <article class="panel"><h2>${tx("Potions et élixirs")} <small>${tx("10 min de jeu, cumulable jusqu’à 2 h")}</small></h2><div class="cgrid hscroll" data-hs="potions">${consumables}</div></article>
        <article class="panel"><h2>${tx("Coffres")}</h2><div class="cgrid hscroll" data-hs="chests">${chests}</div></article>
        <article class="panel wsec"><h2>${tx("Atelier")} <small>${tx("permanent, gardé à l’ascension")}</small></h2>${hasUnlock(S, "workshop") ? workshop : `<p class="note">${tx("Améliorations permanentes de la boutique (attaque, PV, or, expérience, vitesse).")}</p><div class="row">${lockLinkS(S, "workshop")}</div>`}</article>
      </div></div>`;
  }

  onAction(a, b) {
    if (a === "s-sec") { this.sec = b.dataset.to; return; }
    const g = this.game, id = a === "s-item" ? +b.dataset.id : b.dataset.id;
    if (a === "s-item") g.buyShopItem(id);
    else if (a === "s-cons") g.buyConsumable(id);
    else if (a === "s-chest") g.buyChest(id);
    else if (a === "s-egg") g.buyEgg();
    else if (a === "s-ws") g.buyWorkshop(id);
    else if (a === "s-wsmax") g.buyWorkshop(id, 999);
    else if (a === "s-up") g.buyUpgrade(id);
    else if (a === "s-reroll") g.rerollShop();
    else if (a === "s-unlock") g.buyUnlock(id);
    else if (a === "s-autopot") { g.S.autoPotions = b.checked; g.autoBuyPotions(); g.changed(); }
  }

  /** Comptes à rebours (sans reconstruire l'onglet). Renvoie true s'il faut tout redessiner. */
  tick() {
    const S = this.game.S, r = this.root;
    if (!r) return false;
    if (S.shop && Date.now() >= S.shop.next) return true;
    const t = r.querySelector("#shop-timer");
    if (t && S.shop) t.textContent = mmss((S.shop.next - Date.now()) / 1000);
    for (const c of CONSUMABLES) {
      const e = r.querySelector("#buff-" + c.id);
      if (e) e.textContent = mmss(S.buffs[c.id] || 0);
    }
    const gEl = r.querySelector("#shop-gold");
    if (gEl) gEl.textContent = fmt(S.gold);
    return false;
  }
}
