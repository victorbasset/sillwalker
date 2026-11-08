// Onglet Boutique : marchand (stock renouvelé, bonne affaire, objet pour
// l'emplacement le plus faible), potions et élixirs, coffres et œuf,
// atelier (améliorations permanentes illimitées). Tout est illustré.
import { RARITIES, SLOTS } from "../../game/data.js";
import {
  CONSUMABLES, CHESTS, UPGRADES, WORKSHOP, POTION_MAX, BUFF_CAP_S, DEAL_DISCOUNT,
  consumablePrice, chestPrice, upgradePrice, rerollPrice, workshopPrice, eggPrice,
} from "../../game/shop.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc, NB } from "../../game/format.js";
import { itemIconURL } from "../../render/sprites.js";
import { shopIconURL } from "../../render/shopart.js";
import { POWER_INDEX } from "../../game/powers.js";
import { SETS } from "../../game/sets.js";

const mmss = (s) => { s = Math.max(0, Math.ceil(s)); const m = Math.floor(s / 60); return m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}` : `${m} min ${String(s % 60).padStart(2, "0")}`; };
/** Effet court affiché sous chaque consommable. */
const SHORT = { potion: "Rend 50 % des PV", elixir: "+25 % d’attaque", fortune: "+50 % d’or", wisdom: "+50 % d’expérience", haste: "+30 % de vitesse", luck: "+40 % de butin", iron: "+30 % PV et défense" };

export class ShopTab {
  constructor(game) { this.game = game; this.root = null; }

  badge() { return ""; }

  render(el) {
    this.root = el;
    const g = this.game, S = g.S, stock = g.shopStock(), full = g.bagFull();
    const buy = (action, id, price, block = "", cls = "") =>
      block ? `<button disabled class="buy">${esc(block)}</button>`
        : `<button data-action="${action}" data-id="${id}" class="buy ${cls}"${S.gold < price ? ` disabled title="Pas assez d’or"` : ""}><i class="coin"></i>${fmt(price)}</button>`;

    // --- Marchand ---
    const merchant = stock.items.length ? stock.items.map((it) => {
      const d = g.upgradeDelta(it), cur = S.equip[it.slot], up = !cur || d > 0.005;
      const verdict = cur ? `${d >= 0 ? "+" : "−"}${Math.abs(Math.round(d * 100))}${NB}% de puissance` : "emplacement vide";
      return `<div class="mcard rb${it.r}${it.deal ? " deal" : ""}${up ? " up" : ""}">
        ${it.deal ? `<span class="ribbon">−${Math.round(DEAL_DISCOUNT * 100)} %</span>` : ""}
        <img src="${itemIconURL(it)}" alt="">
        <div class="nm rc${it.r}">${esc(it.name)}</div>
        <div class="sub">${SLOTS[it.slot].name} ${RARITIES[it.r].name.toLowerCase()}, niv. ${it.il}</div>
        ${it.power ? `<div class="sub power-mini">★ ${esc(POWER_INDEX[it.power].name)}</div>` : ""}
        ${it.set && SETS[it.set] ? `<div class="sub" style="color:${SETS[it.set].color}">◆ ${esc(SETS[it.set].name)}</div>` : ""}
        <div class="verdict ${d > 0.005 || !cur ? "delta-p" : d < -0.005 ? "delta-n" : ""}">${up ? "▲ " : ""}${verdict}</div>
        ${buy("s-item", it.id, it.price, full ? "Sac plein" : "", up ? "primary" : "")}
      </div>`;
    }).join("") : `<p class="empty">Le marchand a tout vendu. Revenez plus tard !</p>`;

    // --- Potions et élixirs ---
    const consumables = CONSUMABLES.map((c) => {
      const price = consumablePrice(c, S);
      let owned, block = "", active = false;
      if (c.kind === "stock") { owned = `${S.potions} / ${POTION_MAX}`; if (S.potions >= POTION_MAX) block = "Stock plein"; }
      else {
        const rem = S.buffs[c.id] || 0;
        active = rem > 0;
        owned = active ? `actif · <span id="buff-${c.id}">${mmss(rem)}</span>` : "10 min";
        if (rem + c.duration > BUFF_CAP_S) block = "Maximum";
      }
      return `<div class="ctile${active ? " active" : ""}" title="${esc(c.desc)}">
        <img src="${shopIconURL(c.id)}" alt="">
        <div class="nm">${esc(c.name)}</div>
        <div class="eff">${esc(SHORT[c.id] || "")}</div>
        <div class="sub">${owned}</div>
        ${buy("s-cons", c.id, price, block)}
        ${c.id === "potion" ? `<label class="toggle mini"><input type="checkbox" data-action="s-autopot"${S.autoPotions ? " checked" : ""}> auto</label>` : ""}
      </div>`;
    }).join("");

    // --- Coffres et œuf ---
    const chests = CHESTS.map((c) => `<div class="ctile chesttile">
        <img src="${shopIconURL(c.id, 6)}" alt="">
        <div class="nm rc${c.minRarity}">${esc(c.name)}</div>
        <div class="eff">${esc(RARITIES[c.minRarity].name)} ou mieux</div>
        <div class="sub">niveau ${S.best}</div>
        ${buy("s-chest", c.id, chestPrice(c, S), full ? "Sac plein" : "")}
      </div>`).join("") + `<div class="ctile chesttile">
        <img src="${shopIconURL("egg", 6)}" alt="">
        <div class="nm">Œuf de familier</div>
        <div class="eff">Un familier au hasard</div>
        <div class="sub">1 par étal</div>
        ${buy("s-egg", "egg", eggPrice(S), stock.eggSold ? "Vendu" : "")}
      </div>`;

    // --- Atelier (permanent) ---
    const W = S.workshop || {};
    const workshop = WORKSHOP.map((w) => {
      const n = W[w.id] || 0, maxed = w.max && n >= w.max;
      return `<div class="wsline">
        <img src="${shopIconURL(w.id, 4)}" alt="">
        <div class="si"><div class="nm">${esc(w.name)} <small>niv. ${n}${w.max ? " / " + w.max : ""}</small></div>
          <div class="sub">${n ? `<span class="delta-p">${esc(describeEffects(w.eff, n))}</span> · ` : ""}prochain : ${esc(describeEffects(w.eff, 1))}</div></div>
        ${maxed ? `<button disabled class="buy">Maximum</button>` : buy("s-ws", w.id, workshopPrice(w, S))}
        ${!maxed && S.gold >= workshopPrice(w, S) * (1 + w.growth) ? `<button class="quiet wsmax" data-action="s-wsmax" data-id="${w.id}" title="Acheter autant de niveaux que possible">max</button>` : ""}
      </div>`;
    }).join("") + UPGRADES.map((u) => {
      const have = S.upgrades[u.id] || 0, maxed = have >= u.max;
      return `<div class="wsline">
        <img src="${shopIconURL("bag", 4)}" alt="">
        <div class="si"><div class="nm">${esc(u.name)} <small>${have} / ${u.max}</small></div><div class="sub">${S.bagSize} places · +6 par niveau</div></div>
        ${maxed ? `<button disabled class="buy">Maximum</button>` : buy("s-up", u.id, upgradePrice(u, S))}
      </div>`;
    }).join("");

    el.innerHTML = `<div class="shopbar"><span class="purse"><i class="coin"></i><b id="shop-gold">${fmt(S.gold)}</b> or</span>
        <span class="note">Nouvel étal dans <span id="shop-timer">${mmss((stock.next - Date.now()) / 1000)}</span></span>
        <button data-action="s-reroll" class="quiet"${S.gold < rerollPrice(S) ? " disabled" : ""}>Renouveler l’étal (${fmt(rerollPrice(S))} or)</button></div>
      <div class="shopgrid2">
        <article class="panel merchant"><h2>Marchand <small>un objet pour ton point faible, une bonne affaire</small></h2><div class="mgrid">${merchant}</div></article>
        <article class="panel"><h2>Potions et élixirs <small>10 min de jeu, cumulable jusqu’à 2 h</small></h2><div class="cgrid">${consumables}</div></article>
        <article class="panel"><h2>Coffres</h2><div class="cgrid">${chests}</div></article>
        <article class="panel"><h2>Atelier <small>permanent, gardé à l’ascension</small></h2>${workshop}</article>
      </div>`;
  }

  onAction(a, b) {
    const g = this.game, id = a === "s-item" ? +b.dataset.id : b.dataset.id;
    if (a === "s-item") g.buyShopItem(id);
    else if (a === "s-cons") g.buyConsumable(id);
    else if (a === "s-chest") g.buyChest(id);
    else if (a === "s-egg") g.buyEgg();
    else if (a === "s-ws") g.buyWorkshop(id);
    else if (a === "s-wsmax") g.buyWorkshop(id, 999);
    else if (a === "s-up") g.buyUpgrade(id);
    else if (a === "s-reroll") g.rerollShop();
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
