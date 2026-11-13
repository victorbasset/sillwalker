// Onglet Bestiaire : monstres rencontrés, victoires et paliers.
import { t as tx, tr, csep, cend } from "../../i18n/index.js";
import { MONSTERS, ZONES } from "../../game/data.js";
import { BESTIARY_TIERS, BESTIARY_BONUS, bestiaryTier, bestiaryTiersTotal, bestiaryEffects } from "../../game/bestiary.js";
import { describeEffects } from "../../game/talents.js";
import { fmt, esc, dec, unit, uS } from "../../game/format.js";
import { EVENTS, EVENT_SEEN_BONUS, eventsSeenEffects } from "../../game/events.js";
import { monsterURL, itemIconURL } from "../../render/sprites.js";
import { CODEX_ENTRIES, CODEX_BONUS, codexCounts, codexEffects, POWER_CODEX_BONUS, powersFound, SET_CODEX_BONUS } from "../../game/codex.js";
import { POWERS } from "../../game/powers.js";
import { SETS, SET_KEYS, setCounts } from "../../game/sets.js";
import { itemName } from "../../i18n/data.js";
import { RARITIES, SLOTS, ELITE_AFFIXES, affixWins, AFFIX_SEEN_BONUS, affixesSeenEffects } from "../../game/data.js";
import { BOSS_MECHANICS, bossMechanics } from "../../game/bosses.js";

const where = (type) => {
  if (type === "goblin") return tx("Rare, partout. S’enfuit vite !");
  const z = ZONES.filter((x) => x.monsters.includes(type) || x.boss === type).map((x) => x.name);
  return z.join(csep());
};

export class BestiaryTab {
  constructor(game) { this.game = game; this.sec = "beasts"; } // section affichée (demande 18 : une à la fois, sans défilement)

  badge() { return ""; }

  render(el) {
    // (it. 1060) seule la section affichée est construite : avant, les 83 fiches et toutes les autres sections l'étaient
    // à chaque mise à jour pour n'en garder qu'une (Bestiaire : 11 ms par affichage, le plus coûteux des onglets)
    const S = this.game.S;
    let html = null;
    if (this.sec !== "beasts") {
      for (const h of this.codexHTML(S).split(/(?=<h2 class="codexh)/)) { const m = h.match(/id="bj-(\w+)"/); if (m && m[1] === this.sec) html = h; }
      if (!html) this.sec = "beasts";
    }
    el.innerHTML = this.jumpHTML() + (html || this.beastsHTML(S));
  }

  beastsHTML(S) {
    const B = S.bestiary || {};
    const keys = Object.keys(MONSTERS), seen = keys.filter((k) => B[k] > 0).length;
    const cards = keys.map((k) => {
      const n = B[k] || 0, known = n > 0, tier = bestiaryTier(n), next = BESTIARY_TIERS[tier];
      const pips = BESTIARY_TIERS.map((t, i) => `<i class="${i < tier ? "on" : ""}" title="${esc(tx("{0} victoires", { 0: fmt(t) }))}"></i>`).join("");
      // Fiche compacte (demande 18) : les zones où vit le monstre passent en infobulle.
      return `<article class="panel beast${known ? "" : " unknown"}" title="${esc(known ? MONSTERS[k].name + " · " + where(k) : tx("Pas encore rencontré"))}">
        <img src="${monsterURL(k, !known)}" alt="">
        <div class="si"><div class="nm">${known ? esc(MONSTERS[k].name) : "???"}</div>
        <div class="pips">${pips}<span>${fmt(n)}${next ? " / " + fmt(next) : " " + tx("(complet)")}</span></div></div>
      </article>`;
    }).join("");
    const eff = bestiaryEffects(S);
    const beasts = `<h2 class="codexh" id="bj-beasts">${tx("Bestiaire")}</h2><p class="note tabintro">${seen} ${tx("/ {0} monstres rencontrés · {1} paliers atteints.\n      Chaque palier ({2} victoires) d’un monstre donne {3}.\n      Bonus actuel :", { 0: keys.length, 1: bestiaryTiersTotal(S), 2: BESTIARY_TIERS.map(fmt).join(csep()), 3: esc(describeEffects(BESTIARY_BONUS)) })} <b class="delta-p">${Object.keys(eff).length ? esc(describeEffects(eff)) : tx("aucun")}</b>${cend()}</p>
      <div class="beastgrid hscroll" data-hs="beasts">${cards}</div>`;
    return beasts;
  }

  codexHTML(S) {
    const C = S.codex || {}, c = codexCounts(S), eff = codexEffects(S), show = this.shown(S);
    const cells = CODEX_ENTRIES.map((e) => {
      const r = C[e.key], known = r != null;
      const title = known ? `${tr(e.name)} ${tx("({0}) · meilleur : {1}", { 0: SLOTS[e.slot].name, 1: RARITIES[r].name })}` : `??? (${SLOTS[e.slot].name})`;
      return `<div class="codexcell${known ? "" : " unknown"}" title="${esc(title)}" style="--c:${known ? RARITIES[r].color : "transparent"}">
        <img src="${itemIconURL({ icon: e.icon, slot: e.slot, r: known ? r : 0, color: known ? null : "#3a3650" })}" alt=""></div>`;
    }).join("");
    return `<h2 class="codexh first" id="bj-codex">${tx("Collection d’objets")} <small>${c.found} ${tx("/ {0} types · {1} en épique · {2} en légendaire", { 0: c.total, 1: c.epic, 2: c.leg })}</small></h2>
      <p class="note tabintro">${tx("Chaque type d’objet trouvé donne {0} ; trouvé en épique {1} ;\n      en légendaire {2}. Conservé à l’ascension.\n      Bonus actuel :", { 0: esc(describeEffects(CODEX_BONUS.found)), 1: esc(describeEffects(CODEX_BONUS.epic)), 2: esc(describeEffects(CODEX_BONUS.legendary)) })} <b class="delta-p">${Object.keys(eff).length ? esc(describeEffects(eff)) : tx("aucun")}</b>${cend()}</p>
      <div class="codexgrid">${cells}</div>
      ${show.powers ? `<h2 class="codexh" id="bj-powers">${tx("Pouvoirs légendaires")} <small>${powersFound(S)} ${tx("/ {0} découverts · chacun donne {1}", { 0: POWERS.length, 1: esc(describeEffects(POWER_CODEX_BONUS)) })}</small></h2>
      <div class="powergrid">${POWERS.map((p) => (S.powersSeen || {})[p.id]
        ? `<span class="chip pow" title="${esc(describeEffects(p.eff))}">★ ${esc(p.name)}</span>`
        : `<span class="chip pow unknown">???</span>`).join("")}</div>` : ""}
      ${show.sets ? `<h2 class="codexh" id="bj-sets">${tx("Panoplies")} <small>${tx("pièces d’épiques et de légendaires · bonus à 2 et 4 pièces portées")} · ${tx("{0} / {1} complétées · chacune donne {2} pour toujours", { 0: Object.keys(S.setsDone || {}).length, 1: SET_KEYS.length, 2: esc(describeEffects(SET_CODEX_BONUS)) })}</small></h2>
      <div class="setgrid">${SET_KEYS.map((id) => { const st = SETS[id], n = setCounts(S.equip)[id] || 0; // toutes les panoplies, et où en est le héros
        // (it. 1005) pièces gardées dans le sac (une par emplacement non porté) : le joueur voit où en est la panoplie
        const inBag = {}; for (const it of S.bag) if (it.set === id && !(S.equip[it.slot] && S.equip[it.slot].set === id)) inBag[it.slot] ||= it;
        const bagN = Object.keys(inBag).length, names = esc(Object.values(inBag).map(itemName).join(csep()));
        // (it. 1013) le sac complète cette panoplie : « · 4 dans le sac » devient un bouton (un clic sur place, comme la
        // tâche « À faire ») ; pas de ligne de plus (cinq boutons en propre ligne faisaient défiler à 1280 px)
        const bagTxt = !bagN ? "" : this.game.setFinisher(id)
          ? ` · <button class="linkbtn setfin" data-action="b-setfin" data-id="${id}" title="${esc(tx("Compléter avec les pièces du sac"))}
${names}">◆ ${tx("{n} dans le sac", { n: bagN })}</button>`
          : ` · <span title="${names}">${tx("{n} dans le sac", { n: bagN })}</span>`;
        return `<div class="setcard" style="--c:${st.color}"><b class="tint">◆ ${esc(st.name)}</b> <small>${n}/4${bagTxt}${(S.setsDone || {})[id] ? " · ✓ " + tx("complétée") : ""}</small>
          <div class="${n >= 2 ? "on" : ""}">${n >= 2 ? "✓ " : ""}${tx("2 pièces : {0}", { 0: esc(describeEffects(st.two)) })}</div>
          <div class="${n >= 4 ? "on" : ""}">${n >= 4 ? "✓ " : ""}${tx("4 pièces : {0}", { 0: esc(describeEffects(st.four)) })}</div></div>`; }).join("")}</div>` : ""}
      <h2 class="codexh" id="bj-bosses">${tx("Capacités des boss")} <small>${tx("une par boss, deux à partir de la 2e boucle")}</small></h2>
      <div class="setgrid">${Object.entries(BOSS_MECHANICS).map(([id, b]) => { // prochaine zone (à partir de la zone actuelle) dont le boss a cette capacité
        let nz = 0; for (let z = S.zone; z < S.zone + 60; z++) if (bossMechanics(z).includes(id)) { nz = z; break; }
        return `<div class="setcard${nz === S.zone ? " here" : ""}" style="--c:#ff9a7a"><b>${esc(b.name)}</b>${nz ? ` <small>${nz === S.zone ? tx("boss de ta zone") : tx("prochain boss : zone {0}", { 0: nz })}</small>` : ""}<div>${esc(b.desc)}</div></div>`; }).join("")}</div>
      ${show.elites ? (() => { const won = (S.stats && S.stats.affixesSeen) || {}, ae = Object.entries(ELITE_AFFIXES); // (it. 943) sortes vaincues : ✓
        return `<h2 class="codexh" id="bj-elites">${tx("Élites")} (${ae.filter(([id]) => won[id]).length} / ${ae.length}) <small>${tx("monstres dorés : butin garanti, or ×4 ; chacun a un affixe")}</small></h2>
      <p class="note tabintro">${tx("Chaque sorte d’élite vaincue donne {0} pour toujours. Bonus actuel : {1}.", { 0: esc(describeEffects(AFFIX_SEEN_BONUS)), 1: esc(describeEffects(affixesSeenEffects(S)) || "—") })}</p>
      <div class="setgrid">${ae.map(([id, a]) => `<div class="setcard${won[id] ? "" : " unknown"}" style="--c:${a.color}"><b class="tint">${esc(a.name)}</b>${won[id] ? ` <small>✓ ×${fmt(affixWins(won[id]))}</small>` : ""}<div>${esc(a.desc || "")}</div></div>`).join("")}</div>`; })() : ""}
      ${show.events ? this.eventsHTML(S) : ""}`;
  }

  /** (it. 920) Les événements rares : vus (nom, effet, chance) ou encore mystérieux (« ??? ») ; succès « Chasseur d'événements ». */
  eventsHTML(S) {
    const seen = (S.stats && S.stats.eventsSeen) || {}, ent = Object.entries(EVENTS), n = ent.filter(([id]) => seen[id]).length;
    const pct = (p) => dec(String(Math.round(p * 10000) / 100)) + unit("%");
    const cur = describeEffects(eventsSeenEffects(S)) || "—"; // (it. 932) bonus de la collection
    return `<h2 class="codexh" id="bj-events">${tx("Événements rares")} (${n} / ${ent.length})</h2>
      <p class="note tabintro">${tx("Chaque événement vécu donne {0} pour toujours. Bonus actuel : {1}.", { 0: esc(describeEffects(EVENT_SEEN_BONUS)), 1: esc(cur) })}</p>
      <div class="setgrid">${ent.map(([id, e]) => { const t = this.game.R.events[id] || 0; // (it. 936) en cours : encadré, secondes restantes
        return seen[id]
        ? `<div class="setcard${t > 0 ? " here" : ""}" style="--c:${e.color}"><b class="tint">${esc(e.name)}</b> <small>${t > 0 ? esc(tx("en cours · {0}", { 0: uS(Math.ceil(t)) })) : pct(e.chance) + tx(" par victoire")}</small><div>${esc(e.text)}</div></div>`
        : `<div class="setcard unknown"><b>???</b> <small>${pct(e.chance)}${tx(" par victoire")}</small></div>`; }).join("")}</div>`;
  }

  /** Sections affichées : seulement ce que le joueur a déjà rencontré (moins d'informations d'un coup). */
  shown(S) {
    return { powers: powersFound(S) > 0, sets: codexCounts(S).epic > 0 || Object.keys(S.setsDone || {}).length > 0, elites: (S.stats.elites || 0) > 0,
      events: (S.stats.events || 0) > 0 }; // (it. 920)
  }

  /** Sous-onglets : un clic affiche la section (les autres restent cachées). */
  jumpHTML() {
    const show = this.shown(this.game.S);
    const L = [["codex", tx("Collection d’objets")], ["powers", tx("Pouvoirs légendaires")], ["sets", tx("Panoplies")],
      ["bosses", tx("Capacités des boss")], ["elites", tx("Élites")], ["events", tx("Événements rares")], ["beasts", tx("Bestiaire")]].filter(([k]) => show[k] !== false);
    // Les monstres en premier : c'est le cœur du bestiaire.
    L.unshift(...L.splice(L.findIndex(([k]) => k === "beasts"), 1));
    return `<nav class="bjump subtabs" role="tablist" aria-label="${esc(tx("Aller à"))}">${L.map(([k, n]) => `<button class="quiet${this.sec === k ? " on" : ""}" role="tab" aria-selected="${this.sec === k}" data-action="b-jump" data-to="${k}">${esc(n)}</button>`).join("")}</nav>`;
  }

  onAction(a, b) {
    if (a === "b-jump") this.sec = b.dataset.to.replace(/^bj-/, ""); // le panneau se redessine ensuite
    else if (a === "b-setfin") this.game.finishSet(b.dataset.id);
  }
  // (it. 936) un événement en cours : le compte à rebours de sa carte avance (sous-onglet des événements seulement)
  tick() { return this.sec === "events" && Object.values(this.game.R.events || {}).some((t) => t > 0); }
}
