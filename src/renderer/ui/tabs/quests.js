// Onglet Quêtes : guilde (rang, réputation, bonus permanents) et trois
// contrats de 1 à 3 étoiles. Option de réclamation automatique.
import { npcHTML } from "../npc.js";
import { t as tx, txn } from "../../i18n/index.js";
import { questText, questDone, questGold, questRerollPrice, guildRank, guildRankName, GUILD_BONUS, STARS, goblinCatchable } from "../../game/quests.js";
import { CONSUMABLES } from "../../game/shop.js";
import { RARITIES } from "../../game/data.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc, durText } from "../../game/format.js";
import { shopIconURL, spellIconURL } from "../../render/shopart.js";
import { itemIconURL } from "../../render/sprites.js";
import { lockLink } from "../locks.js";
import { hasUnlock } from "../../game/unlocks.js";
import { tabOpen } from "../../game/tabs.js";
import { classSpells, spellRank } from "../../game/spells.js";
import { zoneDef, nearestZoneWith } from "../../game/rules.js";

/** Icône de chaque type de quête (réutilise les dessins de la boutique et des objets). */
const KIND_ICON = {
  kill: () => itemIconURL({ icon: "sword", slot: "weapon", r: 1 }), hunt: () => itemIconURL({ icon: "bow", slot: "weapon", r: 1 }),
  elite: () => itemIconURL({ icon: "crown", slot: "helm", r: 3 }), boss: () => itemIconURL({ icon: "horned", slot: "helm", r: 4 }),
  gold: () => shopIconURL("ws_gold", 4), forge: () => itemIconURL({ icon: "hammer", slot: "weapon", r: 2 }),
  zone: () => shopIconURL("ws_speed", 4), level: () => shopIconURL("ws_xp", 4), goblin: () => shopIconURL("ws_gold", 4), star: () => shopIconURL("star", 4), expedition: () => shopIconURL("egg", 4), transmute: () => shopIconURL("chest_iron", 4),
  loot: () => itemIconURL({ icon: "ring", slot: "ring", r: 2 }), // butin rare ou mieux
  event: () => shopIconURL("star", 4), // événements rares
  chest: () => shopIconURL("chest_wood", 4), // coffres au trésor trouvés (it. 889)
  prey: () => itemIconURL({ icon: "crown", slot: "helm", r: 4 }), // une sorte d'élite précise (it. 946)
  tap: () => itemIconURL({ icon: "gauntlet", slot: "gloves", r: 2 }), // coups au clic : la main du joueur
  // sorts lancés : l'icône du premier sort appris par le héros (sa forme, sa couleur), sinon un éclair
  spell: (S) => { const sp = S && classSpells(S.cls).find((x) => spellRank(S, x.id) > 0); return sp ? spellIconURL(sp.tpl, sp.color, 2, sp.fx?.[0]) : spellIconURL("bolt", "#8fd0ff", 2); },
  crit: () => itemIconURL({ icon: "dagger", slot: "weapon", r: 3 }), // coups critiques : la lame qui frappe juste
  champion: () => itemIconURL({ icon: "horned", slot: "helm", r: 3 }), // (it. 1260) champions : le casque à cornes, en épique
};

function rewardHTML(rw) {
  const out = [];
  const chip = (icon, txt, cls = "", tip = "") => `<span class="rwd ${cls}"${tip ? ` title="${esc(tip)}"` : ""}><img src="${icon}" alt="">${esc(txt)}</span>`;
  if (rw.gold) out.push(chip(shopIconURL("ws_gold", 3), tx("{0} or", { 0: fmt(rw.gold) })));
  if (rw.chest) out.push(chip(shopIconURL(rw.chest >= 3 ? "chest_royal" : rw.chest >= 2 ? "chest_iron" : "chest_wood", 3), `${tx("coffre {0}+", { 0: RARITIES[rw.chest].name.toLowerCase() })}`, "rc" + rw.chest,
    // (it. 1579, retour d'un joueur : « on ouvre les coffres où ? »)
    tx("Le coffre s’ouvre quand tu réclames la quête ; son objet va dans le sac.")));
  if (rw.buff) { const c = CONSUMABLES.find((x) => x.id === rw.buff); out.push(chip(shopIconURL(rw.buff, 3), c.name, "", c.desc || "")); } // (it. 1614) son effet en bulle
  if (rw.potions) out.push(chip(shopIconURL("potion", 3), txn(rw.potions, "{n} potion|{n} potions")));
  if (rw.shards) out.push(chip(shopIconURL("luck", 3), txn(rw.shards, "{n} éclat d’étoile|{n} éclats d’étoile"), "special", tx("À dépenser dans les constellations (Ascension), sans avoir à recommencer.")));
  if (rw.egg) out.push(chip(shopIconURL("egg", 3), tx("œuf de familier"), "special", tx("Il rejoint tes œufs (Familiers) : fais-le éclore pour un nouveau compagnon."))); // (it. 1613)
  if (rw.speed) out.push(chip(shopIconURL("ws_speed", 3), `${tx("+{0} % de vitesse pour toujours", { 0: rw.speed })}`, "special"));
  return out.join("");
}

// (it. 2233) quêtes qui demandent un geste ailleurs : un lien vers l'onglet où le faire (forger et transmuter : fiche d'un objet du
// sac ; expéditions : Familiers). Nom de l'onglet tel qu'affiché dans la barre.
const QUEST_GO = { forge: ["adventure", "Aventure"], transmute: ["adventure", "Aventure"], expedition: ["pets", "Familiers"] };
// (it. 2266-2267) automatisme actif pour ce geste (Grand intendant, Maître de forge, Creuset perpétuel) : la quête avance toute seule,
// rien à faire là-bas : pas de lien
const QUEST_AUTO = { expedition: ["steward", "autoPets"], forge: ["masterForge", "autoForge"], transmute: ["crucible", "autoTransmute"] };
const goLink = (kind, S) => { const g = QUEST_GO[kind], a = QUEST_AUTO[kind];
  if (!g || (a && hasUnlock(S, a[0]) && S.settings[a[1]] !== false)) return "";
  return `<button class="linkbtn qgo" data-tab="${g[0]}">→ ${tx(g[1])}</button>`; };

export class QuestsTab {
  constructor(game) { this.game = game; }

  badge() { const n = this.game.questsReady(); return n ? String(n) : ""; }

  render(el) {
    const g = this.game, S = g.S, slots = g.ensureQuests(), reroll = questRerollPrice(S);
    const rep = (S.guild && S.guild.rep) || 0, gr = guildRank(rep);
    const bonus = gr.rank ? Object.fromEntries(Object.entries(GUILD_BONUS).map(([k, v]) => [k, v * gr.rank])) : null;
    const guild = `<article class="panel guild">
      <img class="crest" src="${shopIconURL("crest" + Math.min(4, Math.floor(gr.rank / 2)), 4)}" alt="${esc(tx("Blason de la guilde"))}">
      <div class="si"><h2 class="npch">${tx("Guilde des aventuriers")} <small>${tx("rang {0} · {1}", { 0: gr.rank + 1, 1: esc(guildRankName(gr.rank)) })}</small>${npcHTML("quests", true)}</h2>
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
      const eta = g.questEta(q); // (it. 926) au rythme actuel des combats
      const etaTxt = eta != null && eta < 48 * 3600 ? ` <small class="eta">· ${esc(tx("≈ {0}", { 0: durText(Math.max(60, eta)) }))}</small>` : "";
      // (it. 1426) chasse d'un monstre absent de la zone (zone changée, ascension) : la zone la plus proche où il vit ;
      // avec la Carte du voyageur, un clic y emmène le héros
      let away = "";
      if (!done && q.kind === "hunt" && !zoneDef(S.zone).monsters.includes(q.type)) {
        const best = nearestZoneWith(S, q.type);
        if (best) {
          const lbl = esc(tx("absent d’ici · zone {0}", { 0: best }));
          away = hasUnlock(S, "travelMap") ? ` <button class="qgo" data-action="q-go" data-z="${best}" title="${esc(tx("Clic : y aller"))}">${lbl}</button>` : ` <small class="eta">· ${lbl}</small>`;
        }
      }
      // (it. 1470) « Atteindre la zone N » avec l'avancée automatique coupée : rien ne bouge ; un clic la remet
      if (!done && q.kind === "zone" && !S.autoAdvance) away = ` <button class="qgo" data-action="q-adv">${esc(tx("reprendre l’avancée"))}</button>`;
      // (it. 1469) gobelins dorés trop rapides pour le héros (ils s'enfuient avant d'être abattus) : on le dit
      if (!done && q.kind === "goblin" && !goblinCatchable(S)) away = ` <small class="eta">· ${esc(tx("ils s’enfuient : héros trop lent ici"))}</small>`;
      // (it. 1344) quêtes d'élites : l'Encens de chasse les accélère (astuce au survol, la carte ne grandit pas)
      const lureTip = !done && (q.kind === "elite" || q.kind === "prey") && tabOpen(S, "shop")
        ? ` title="${esc(tx("Astuce : l’Encens de chasse de la Boutique attire deux fois plus d’élites."))}"`
        // (it. 1472) coups au clic : comment les porter (astuce déjà traduite de la bande)
        : !done && q.kind === "tap" ? ` title="${esc(tx("Astuce : clique sur le monstre que ton héros combat pour lui porter des coups bonus !"))}"` : "";
      return `<article class="panel questcard s${stars}${done ? " done" : ""}"${lureTip}>
        <div class="qhead"><img src="${(KIND_ICON[q.kind] || KIND_ICON.kill)(S)}" alt=""><div>
          <div class="stars">${"★".repeat(stars)}<span>${"★".repeat(3 - stars)}</span></div>
          <h2>${esc(questText(q, fmt))}</h2></div>${done ? "" : goLink(q.kind, S)}</div>
        <div class="kv"><span>${tx("Progression")}</span><span>${prog}${etaTxt}${away}</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="rewards">${rewardHTML(q.reward.gold ? { ...q.reward, gold: questGold(S, q) } : q.reward)}</div>
        <div class="row">${done
          ? `<button data-action="q-claim" data-id="${q.uid}" class="primary">${tx("Réclamer · +{0} réputation", { 0: stars })}</button>`
          : `<button data-action="q-reroll" data-id="${q.uid}" class="quiet"${S.gold < reroll ? " disabled" : ""}>${tx("Changer ({0} or)", { 0: fmt(reroll) })}</button>`}</div>
      </article>`;
    }).join("");
    el.innerHTML = `${guild}<div class="questgrid">${cards}</div>
      ${((t) => `<p class="note qnote" title="${esc(t)}">${t}</p>`)(txn(S.quests.completed, "Les quêtes avancent toutes seules, même hors ligne (sauf boss, nouvelles zones, événements rares, sorts et étoiles filantes). {n} quête accomplie au total. {3} % des quêtes ont 3 étoiles et une récompense rare.|Les quêtes avancent toutes seules, même hors ligne (sauf boss, nouvelles zones, événements rares, sorts et étoiles filantes). {n} quêtes accomplies au total. {3} % des quêtes ont 3 étoiles et une récompense rare.", { 3: STARS[3].w }))}`;
  }

  /** (it. 1555, 1568) Réclame ces quêtes ; le plus bel objet de leurs coffres s'ouvre sous les yeux (clic, « Tout réclamer », touche R). */
  claimShow(list) {
    const g = this.game; let best = null;
    for (const q of [...list]) { g.R.questChest = null; g.claimQuest(q.uid); const c = g.R.questChest; if (c && (!best || c.item.r > best.item.r)) best = c; }
    g.R.questChest = null;
    if (best) this.onReveal?.(best);
  }

  onAction(a, b) {
    const g = this.game;
    // (it. 1546, retour d'un joueur : « ça donne l'impression de rien looter, c'est satisfaisant d'en ouvrir ») réclamée
    // à la main, une quête à coffre l'ouvre sous les yeux du joueur, comme un coffre de la boutique
    if (a === "q-claim") this.claimShow(g.S.quests.slots.filter((q) => q.uid === +b.dataset.id));
    else if (a === "q-claimall") this.claimShow(g.S.quests.slots.filter(questDone));
    // (it. 2162) une quête 3 étoiles (rare, 10 %) se remplace après confirmation : un clic de travers la perdait ; les autres d'un clic
    else if (a === "q-reroll") {
      const id = +b.dataset.id, q = ((g.S.quests && g.S.quests.slots) || []).find((x) => x && x.uid === id), go = () => g.rerollQuest(id);
      if (q && (q.stars || 1) >= 3 && this.panel) this.panel.confirm(tx("Changer cette quête 3 étoiles ?"), tx("Elle est rare (une sur dix) et sa récompense aussi ; une nouvelle quête la remplacera."), tx("Changer"), go);
      else go();
    }
    else if (a === "q-go" && hasUnlock(g.S, "travelMap")) g.setZone(+b.dataset.z); // (it. 1426)
    else if (a === "q-adv") g.setAutoAdvance(true); // (it. 1470)
    else if (a === "q-auto") { g.S.quests.auto = b.checked; if (b.checked) { g.R.autoClaim = true; g.autoClaimQuests(); } g.changed(); }
  }

  tick() { return false; }
}
