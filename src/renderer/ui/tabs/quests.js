// Onglet Quêtes : trois contrats en cours, récompenses à réclamer.
import { questText, questDone, questRerollPrice } from "../../game/quests.js";
import { CONSUMABLES } from "../../game/shop.js";
import { RARITIES } from "../../game/data.js";
import { fmt, esc } from "../../game/format.js";

function rewardText(rw) {
  const out = [];
  if (rw.gold) out.push(`${fmt(rw.gold)} or`);
  if (rw.chest) out.push(`coffre (${RARITIES[rw.chest].name.toLowerCase()} ou mieux)`);
  if (rw.buff) out.push(CONSUMABLES.find((c) => c.id === rw.buff).name.toLowerCase());
  if (rw.potions) out.push(`${rw.potions} potions`);
  if (rw.shards) out.push(`${rw.shards} éclat${rw.shards > 1 ? "s" : ""} d’étoile`);
  if (rw.egg) out.push("un œuf de familier");
  return out.join(" + ");
}

export class QuestsTab {
  constructor(game) { this.game = game; }

  badge() { const n = this.game.questsReady(); return n ? String(n) : ""; }

  render(el) {
    const g = this.game, S = g.S, slots = g.ensureQuests(), reroll = questRerollPrice(S);
    const cards = slots.map((q) => {
      const done = questDone(q), pct = Math.min(100, (100 * q.progress) / q.goal);
      const prog = q.kind === "gold" ? `${fmt(q.progress)} / ${fmt(q.goal)}` : `${Math.min(q.progress, q.goal)} / ${q.goal}`;
      return `<article class="panel questcard${done ? " done" : ""}">
        <h2>${esc(questText(q, fmt))}</h2>
        <div class="kv"><span>Progression</span><span>${prog}</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <p class="reward"><b>Récompense :</b> ${esc(rewardText(q.reward))}</p>
        <div class="row">${done
          ? `<button data-action="q-claim" data-id="${q.uid}" class="primary">Réclamer</button>`
          : `<button data-action="q-reroll" data-id="${q.uid}" class="quiet"${S.gold < reroll ? " disabled" : ""}>Changer (${fmt(reroll)} or)</button>`}</div>
      </article>`;
    }).join("");
    el.innerHTML = `${g.questsReady() > 1 ? `<div class="row claimall"><button data-action="q-claimall" class="primary">Tout réclamer (${g.questsReady()})</button></div>` : ""}<p class="note tabintro">Les quêtes avancent toutes seules pendant que ton héros joue, même hors ligne pour les victoires et l’or. ${S.quests.completed} quête${S.quests.completed > 1 ? "s" : ""} accomplie${S.quests.completed > 1 ? "s" : ""} au total.</p>
      <div class="questgrid">${cards}</div>`;
  }

  onAction(a, b) {
    if (a === "q-claim") this.game.claimQuest(+b.dataset.id);
    if (a === "q-claimall") for (const q of [...this.game.S.quests.slots]) if (questDone(q)) this.game.claimQuest(q.uid);
    else if (a === "q-reroll") this.game.rerollQuest(+b.dataset.id);
  }

  tick() { return false; }
}
