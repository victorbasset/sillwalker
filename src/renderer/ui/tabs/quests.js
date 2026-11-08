// Onglet Quêtes : guilde (rang, réputation, bonus permanents) et trois
// contrats de 1 à 3 étoiles. Option de réclamation automatique.
import { t as tx, txn } from "../../i18n/index.js";
import { questText, questDone, questRerollPrice, guildRank, guildRankName, GUILD_BONUS, STARS } from "../../game/quests.js";
import { CONSUMABLES } from "../../game/shop.js";
import { RARITIES } from "../../game/data.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc } from "../../game/format.js";
import { shopIconURL } from "../../render/shopart.js";
import { itemIconURL } from "../../render/sprites.js";
import { lockLink } from "../locks.js";
import { hasUnlock } from "../../game/unlocks.js";

/** Icône de chaque type de quête (réutilise les dessins de la boutique et des objets). */
const KIND_ICON = {
  kill: () => itemIconURL({ icon: "sword", slot: "weapon", r: 1 }), hunt: () => itemIconURL({ icon: "bow", slot: "weapon", r: 1 }),
  elite: () => itemIconURL({ icon: "crown", slot: "helm", r: 3 }), boss: () => itemIconURL({ icon: "horned", slot: "helm", r: 4 }),
  gold: () => shopIconURL("ws_gold", 4), forge: () => itemIconURL({ icon: "hammer", slot: "weapon", r: 2 }),
  zone: () => shopIconURL("ws_speed", 4), expedition: () => shopIconURL("egg", 4), transmute: () => shopIconURL("chest_iron", 4),
};

function rewardHTML(rw) {
  const out = [];
  const chip = (icon, txt, cls = "") => `<span class="rwd ${cls}"><img src="${icon}" alt="">${esc(txt)}</span>`;
  if (rw.gold) out.push(chip(shopIconURL("ws_gold", 3), tx("{0} or", { 0: fmt(rw.gold) })));
  if (rw.chest) out.push(chip(shopIconURL(rw.chest >= 3 ? "chest_royal" : rw.chest >= 2 ? "chest_iron" : "chest_wood", 3), `${tx("coffre {0}+", { 0: RARITIES[rw.chest].name.toLowerCase() })}`, "rc" + rw.chest));
  if (rw.buff) out.push(chip(shopIconURL(rw.buff, 3), CONSUMABLES.find((c) => c.id === rw.buff).name));
  if (rw.potions) out.push(chip(shopIconURL("potion", 3), tx("{0} potions", { 0: rw.potions })));
  if (rw.shards) out.push(chip(shopIconURL("luck", 3), `${rw.shards} ${tx("éclats d’étoile")}`, "special"));
  if (rw.egg) out.push(chip(shopIconURL("egg", 3), tx("œuf de familier"), "special"));
  if (rw.speed) out.push(chip(shopIconURL("ws_speed", 3), `${tx("+{0} % de vitesse pour toujours", { 0: rw.speed })}`, "special"));
  return out.join("");
}

export class QuestsTab {
  constructor(game) { this.game = game; }

  badge() { const n = this.game.questsReady(); return n ? String(n) : ""; }

  render(el) {
    const g = this.game, S = g.S, slots = g.ensureQuests(), reroll = questRerollPrice(S);
    const rep = (S.guild && S.guild.rep) || 0, gr = guildRank(rep);
    const bonus = gr.rank ? Object.fromEntries(Object.entries(GUILD_BONUS).map(([k, v]) => [k, v * gr.rank])) : null;
    const guild = `<article class="panel guild">
      <img src="${itemIconURL({ icon: "medal", slot: "amulet", r: Math.min(4, Math.floor(gr.rank / 2)) })}" alt="">
      <div class="si"><h2>${tx("Guilde des aventuriers")} <small>${tx("rang {0} · {1}", { 0: gr.rank + 1, 1: esc(guildRankName(gr.rank)) })}</small></h2>
        <div class="kv"><span>${tx("Réputation (1 à 3 par quête selon les étoiles)")}</span><span>${gr.into} / ${gr.need}</span></div>
        <div class="bar"><i style="width:${(100 * gr.into) / gr.need}%"></i></div>
        <p class="note tight">${tx("Bonus permanent (gardé à l’ascension) :")} <b class="delta-p">${bonus ? esc(describeEffects(bonus)) : tx("aucun")}</b> ${tx("· rang suivant : {0} et un coffre.", { 0: esc(describeEffects(GUILD_BONUS)) })}</p></div>
      <div class="gside">
        ${hasUnlock(S, "questDesk") ? `<label class="toggle"><input type="checkbox" data-action="q-auto"${S.quests.auto ? " checked" : ""}> ${tx("Réclamer automatiquement")}</label>
        ${g.questsReady() > 1 ? `<button data-action="q-claimall" class="primary">${tx("Tout réclamer ({0})", { 0: g.questsReady() })}</button>` : ""}` : lockLink(S, "questDesk")}
      </div>
    </article>`;
    const cards = slots.map((q) => {
      const done = questDone(q), pct = Math.min(100, (100 * q.progress) / q.goal), stars = q.stars || 1;
      const prog = q.kind === "gold" ? `${fmt(q.progress)} / ${fmt(q.goal)}` : `${Math.min(q.progress, q.goal)} / ${q.goal}`;
      return `<article class="panel questcard s${stars}${done ? " done" : ""}">
        <div class="qhead"><img src="${(KIND_ICON[q.kind] || KIND_ICON.kill)()}" alt=""><div>
          <div class="stars">${"★".repeat(stars)}<span>${"★".repeat(3 - stars)}</span></div>
          <h2>${esc(questText(q, fmt))}</h2></div></div>
        <div class="kv"><span>${tx("Progression")}</span><span>${prog}</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="rewards">${rewardHTML(q.reward)}</div>
        <div class="row">${done
          ? `<button data-action="q-claim" data-id="${q.uid}" class="primary">${tx("Réclamer · +{0} réputation", { 0: stars })}</button>`
          : `<button data-action="q-reroll" data-id="${q.uid}" class="quiet"${S.gold < reroll ? " disabled" : ""}>${tx("Changer ({0} or)", { 0: fmt(reroll) })}</button>`}</div>
      </article>`;
    }).join("");
    el.innerHTML = `${guild}<div class="questgrid">${cards}</div>
      <p class="note">${txn(S.quests.completed, "Les quêtes avancent toutes seules, même hors ligne pour les victoires et l’or. {n} quête accomplie au total. {3} % des quêtes ont 3 étoiles et une récompense rare.|Les quêtes avancent toutes seules, même hors ligne pour les victoires et l’or. {n} quêtes accomplies au total. {3} % des quêtes ont 3 étoiles et une récompense rare.", { 3: STARS[3].w })}</p>`;
  }

  onAction(a, b) {
    const g = this.game;
    if (a === "q-claim") g.claimQuest(+b.dataset.id);
    else if (a === "q-claimall") { for (const q of [...g.S.quests.slots]) if (questDone(q)) g.claimQuest(q.uid); }
    else if (a === "q-reroll") g.rerollQuest(+b.dataset.id);
    else if (a === "q-auto") { g.S.quests.auto = b.checked; if (b.checked) { g.R.autoClaim = true; g.autoClaimQuests(); } g.changed(); }
  }

  tick() { return false; }
}
