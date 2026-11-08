// Onglet Boutique : marchand (stock renouvelé), consommables, coffres, améliorations.
import { RARITIES, SLOTS } from "../../game/data.js";
import {
  CONSUMABLES, CHESTS, UPGRADES, POTION_MAX, BUFF_CAP_S,
  consumablePrice, chestPrice, upgradePrice, rerollPrice,
} from "../../game/shop.js";
import { fmt, esc, NB } from "../../game/format.js";
import { itemIconURL } from "../../render/sprites.js";
import { POWER_INDEX } from "../../game/powers.js";
import { SETS } from "../../game/sets.js";

const mmss = (s) => { s = Math.max(0, Math.ceil(s)); const m = Math.floor(s / 60); return m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}` : `${m} min ${String(s % 60).padStart(2, "0")}`; };

export class ShopTab {
  constructor(game) { this.game = game; this.root = null; }

  badge() { return ""; }

  render(el) {
    this.root = el;
    const g = this.game, S = g.S, stock = g.shopStock(), full = g.bagFull();
    const buyBtn = (action, id, price, extra = "") =>
      extra ? `<button disabled>${esc(extra)}</button>`
        : `<button data-action="${action}" data-id="${id}"${S.gold < price ? ` disabled title="Pas assez d’or"` : ""}>${fmt(price)} or</button>`;

    const merchant = stock.items.length ? stock.items.map((it) => {
      const d = g.upgradeDelta(it), cur = S.equip[it.slot];
      const verdict = cur ? `${d >= 0 ? "+" : "−"}${Math.abs(Math.round(d * 100))}${NB}% de puissance` : "emplacement vide";
      return `<li class="shopitem">
        <img src="${itemIconURL(it)}" alt="" class="rb${it.r}">
        <div class="si"><div class="rc${it.r}">${esc(it.name)}</div>
          ${it.power ? `<div class="sub power-mini">★ ${esc(POWER_INDEX[it.power].name)}</div>` : ""}
          ${it.set && SETS[it.set] ? `<div class="sub" style="color:${SETS[it.set].color}">◆ ${esc(SETS[it.set].name)}</div>` : ""}
          <div class="sub">${SLOTS[it.slot].name} ${RARITIES[it.r].name.toLowerCase()}, niv. ${it.il} · <span class="${d > 0.005 ? "delta-p" : d < -0.005 ? "delta-n" : ""}">${verdict}</span></div></div>
        ${buyBtn("s-item", it.id, it.price, full ? "Sac plein" : "")}</li>`;
    }).join("") : `<li class="empty">Le marchand a tout vendu. Revenez plus tard !</li>`;

    const consumables = CONSUMABLES.map((c) => {
      const price = consumablePrice(c, S);
      let owned, block = "";
      if (c.kind === "stock") { owned = `${S.potions} / ${POTION_MAX}`; if (S.potions >= POTION_MAX) block = "Stock plein"; }
      else {
        const rem = S.buffs[c.id] || 0;
        owned = rem > 0 ? `<span id="buff-${c.id}">${mmss(rem)}</span> restantes` : "inactif";
        if (rem + c.duration > BUFF_CAP_S) block = "Durée maximale atteinte";
      }
      const auto = c.id === "potion" ? `<label class="toggle"><input type="checkbox" data-action="s-autopot"${S.autoPotions ? " checked" : ""}> Racheter automatiquement (jusqu’à 5)</label>` : "";
      return `<li class="shopline"><div class="si"><div class="nm">${esc(c.name)} <small>${owned}</small></div><div class="sub">${esc(c.desc)}</div>${auto}</div>${buyBtn("s-cons", c.id, price, block)}</li>`;
    }).join("");

    const chests = CHESTS.map((c) => `<li class="shopline"><div class="si"><div class="nm rc${c.minRarity}">${esc(c.name)}</div><div class="sub">${esc(c.desc)} Niveau ${S.best}.</div></div>${buyBtn("s-chest", c.id, chestPrice(c, S), full ? "Sac plein" : "")}</li>`).join("");

    const upgrades = UPGRADES.map((u) => {
      const have = S.upgrades[u.id] || 0, maxed = have >= u.max;
      return `<li class="shopline"><div class="si"><div class="nm">${esc(u.name)} <small>${have} / ${u.max}</small></div><div class="sub">${esc(u.desc)}${u.id === "bag" ? ` Actuellement ${S.bagSize} places.` : ""}</div></div>
        ${maxed ? `<button disabled>Maximum</button>` : buyBtn("s-up", u.id, upgradePrice(u, S))}</li>`;
    }).join("");

    el.innerHTML = `<div class="shopgrid">
      <article class="panel"><h2>Marchand <small>Or : <b class="gold" id="shop-gold">${fmt(S.gold)}</b></small></h2>
        <ul class="shoplist">${merchant}</ul>
        <div class="row"><span class="note">Nouvel étal dans <span id="shop-timer">${mmss((stock.next - Date.now()) / 1000)}</span></span>
        <button data-action="s-reroll" class="quiet"${S.gold < rerollPrice(S) ? " disabled" : ""}>Renouveler (${fmt(rerollPrice(S))} or)</button></div></article>
      <article class="panel"><h2>Consommables</h2><ul class="shoplist">${consumables}</ul>
        <p class="note">Les élixirs ne s’écoulent que pendant que le jeu tourne (y compris hors ligne, au prorata).</p></article>
      <article class="panel"><h2>Coffres</h2><ul class="shoplist">${chests}</ul></article>
      <article class="panel"><h2>Améliorations</h2><ul class="shoplist">${upgrades}</ul>
        <p class="note">Les prix suivent ta meilleure zone (${S.best}).</p></article>
    </div>`;
  }

  onAction(a, b) {
    const g = this.game, id = a === "s-item" ? +b.dataset.id : b.dataset.id;
    if (a === "s-item") g.buyShopItem(id);
    else if (a === "s-cons") g.buyConsumable(id);
    else if (a === "s-chest") g.buyChest(id);
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
