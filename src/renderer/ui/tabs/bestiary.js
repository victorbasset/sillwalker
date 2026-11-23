// Onglet Bestiaire : monstres rencontrés, victoires et paliers.
import { npcHTML } from "../npc.js";
import { t as tx, tr, csep, cend, colon, wsp } from "../../i18n/index.js";
import { monSkillOf, ELEMENT_TEXT } from "../../game/monskills.js";
import { MONSTERS, ZONES } from "../../game/data.js";
import { BESTIARY_TIERS, BESTIARY_BONUS, bestiaryTier, bestiaryTiersTotal, bestiaryEffects } from "../../game/bestiary.js";
import { describeEffects } from "../../game/talents.js";
import { DAY_MODS, BLESSING_SEEN_BONUS, blessingsSeenEffects, dayModFor } from "../../game/daymods.js";
import { fmt, esc, dec, unit, uS } from "../../game/format.js";
import { EVENTS, EVENT_SEEN_BONUS, eventsSeenEffects } from "../../game/events.js";
import { monsterURL, itemIconURL } from "../../render/sprites.js";
import { CODEX_ENTRIES, CODEX_BONUS, codexCounts, codexEffects, POWER_CODEX_BONUS, powersFound, SET_CODEX_BONUS } from "../../game/codex.js";
import { POWERS } from "../../game/powers.js";
import { SETS, SET_KEYS, setCounts } from "../../game/sets.js";
import { itemName } from "../../i18n/data.js";
import { RARITIES, SLOTS, ELITE_AFFIXES, affixWins, AFFIX_SEEN_BONUS, affixesSeenEffects } from "../../game/data.js";
import { BOSS_MECHANICS, bossMechanics, UNIQUE_MECHS } from "../../game/bosses.js";
import { tabOpen } from "../../game/tabs.js";
import { hasUnlock, recordZone } from "../../game/unlocks.js";
import { zoneDef, nearestZoneWith, zoneName } from "../../game/rules.js";
import { PACK_ARTS } from "../../game/game.js";
import { TIMID, PREDATORS } from "../../render/monlife.js";

// (it. 1853) compétence de la famille du monstre (monskills.js), et l'effet de l'élément de sa variante
const skillLine = (type) => {
  const sk = monSkillOf(type); if (!sk) return "";
  // (it. 1857) l'élément ne s'ajoute qu'aux compétences qui frappent (le feu « frappe plus fort » n'a pas de sens sans coup)
  const el = sk.el && (sk.mult || sk.el !== "fire") ? sk.el : null;
  // (it. 1907) espèces grégaires : elles vont en meute (game.js PACK_ARTS)
  const art = MONSTERS[type]?.art || type;
  // (it. 1980) caractère : grégaire, craintif, prédateur (monlife.js, game.js)
  const pack = (PACK_ARTS.has(art) ? "\n" + tx("Grégaire : vient souvent à deux ou trois.") : "")
    + (TIMID.has(art) ? "\n" + tx("Craintif : se tient loin des prédateurs.") : "")
    + (PREDATORS.has(art) ? "\n" + tx("Prédateur : les proies s’en écartent.") : "");
  return "\n" + tx(sk.name) + colon() + tx(sk.desc) + (el ? wsp() + tx(ELEMENT_TEXT[el]) : "") + pack;
};
const where = (type) => {
  if (type === "goblin") return tx("Rare, partout. S’enfuit vite !");
  if (type === "poupouce") return tx("Extrêmement rare, partout. Or à foison et un objet légendaire."); // (it. 1730)
  const z = ZONES.filter((x) => x.monsters.includes(type) || x.boss === type).map((x) => x.name);
  return z.join(csep());
};

/** (it. 2309) Monstre pas encore rencontré : la première zone où il vit, nommée seulement si la Carte la nomme déjà (jusqu'au
 *  record + 3, comme map.js ; au-delà, brouillard : le numéro seul). Avant (it. 2305), les noms des décors lointains passaient. */
const whereUnknown = (S, type) => {
  if (type === "goblin" || type === "poupouce") return where(type);
  const rec = Math.max(recordZone(S), S.zone);
  for (let z = 1; z <= ZONES.length * 3; z++) {
    const d = zoneDef(z);
    if (d.monsters.includes(type) || d.boss === type) return z <= rec + 3 ? tx("Zone {0}", { 0: z }) + colon() + zoneName(z) : tx("Zone {0}", { 0: z });
  }
  return "";
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
    el.innerHTML = `<div class="subrow">${this.jumpHTML()}${npcHTML("bestiary", true)}</div>` + (html || this.beastsHTML(S)); // (it. 1089) Fenouil
    // (it. 2145) nom trop long pour sa fiche (« Élémentaire de… ») : en 11 px (taille déjà employée sur la fiche) plutôt que coupé ;
    // mesuré à l'image suivante, seulement si l'onglet est affiché
    if (!html) {
      const fit = () => {
        if (!el.offsetParent) return;
        const nms = el.querySelectorAll(".beast .nm"), rg = document.createRange();
        // largeur exacte du texte (scrollWidth est arrondi : un dépassement de moins d'un pixel ne s'y voit pas)
        const over = (n) => { rg.selectNodeContents(n); return rg.getBoundingClientRect().width > n.getBoundingClientRect().width + 0.01 || n.scrollWidth > n.clientWidth; };
        for (const n of nms) n.classList.remove("tight", "two");
        // sans tolérance : un dépassement de moins d'un pixel met déjà les points de suspension (« Каменный голе… », it. 2190)
        for (const n of nms) if (over(n)) n.classList.add("tight");
        // (it. 2190) encore trop long en 11 px (« Champignard vénéneux », 7 noms en russe) : sur deux lignes, coupé entre les mots
        for (const n of el.querySelectorAll(".beast .nm.tight")) if (over(n)) n.classList.add("two");
      };
      // (it. 2190) mesuré de nouveau une fois les polices chargées : les lettres russes arrivent après coup, plus larges que la police
      // de secours (« Каменный голе… » restait coupé)
      // (it. 3201) aussi tout de suite (comme les Talents) : une mesure faite juste après le dessin (--overflow-report, autotest)
      // voyait les fiches avant l'ajustement et ne voyait pas le défilement de 15 px des noms sur deux lignes
      fit(); requestAnimationFrame(fit);
      if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(() => requestAnimationFrame(fit));
    }
  }

  beastsHTML(S) {
    const B = S.bestiary || {};
    const keys = Object.keys(MONSTERS), seen = keys.filter((k) => B[k] > 0).length, travel = hasUnlock(S, "travelMap");
    const cards = keys.map((k) => {
      const n = B[k] || 0, known = n > 0, tier = bestiaryTier(n), next = BESTIARY_TIERS[tier];
      const pips = BESTIARY_TIERS.map((t, i) => `<i class="${i < tier ? "on" : ""}" title="${esc(tx("{0} victoires", { 0: fmt(t) }))}"></i>`).join("");
      // Fiche compacte (demande 18) : les zones où vit le monstre passent en infobulle (it. 2305 : aussi pour un monstre inconnu, un but).
      // (it. 1437) Carte du voyageur : un clic emmène le héros dans la zone la plus proche où vit le monstre (paliers)
      const gz = known && travel && !zoneDef(S.zone).monsters.includes(k) ? nearestZoneWith(S, k) : 0;
      return `<article class="panel beast${known ? "" : " unknown"}${gz ? " go" : ""}"${gz ? ` data-action="b-go" data-z="${gz}" role="button" tabindex="0" aria-label="${esc(MONSTERS[k].name + " · " + tx("Clic : y aller") + " · " + tx("Zone {0}", { 0: gz }))}"` : ""} title="${esc(known ? MONSTERS[k].name + " · " + where(k) + skillLine(k) + (gz ? "\n" + tx("Clic : y aller") + " · " + tx("Zone {0}", { 0: gz }) : "") : tx("Pas encore rencontré") + (whereUnknown(S, k) ? " · " + whereUnknown(S, k) : ""))}">
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
        : `<span class="chip pow unknown" title="${esc(tx("Pouvoir à découvrir : chaque objet légendaire en porte un, tiré au hasard."))}">???</span>`).join("")}</div>` : ""}
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
      <h2 class="codexh" id="bj-bosses">${tx("Capacités des boss")} <small>${tx("une par boss, deux à partir de la 2e boucle ; en plus, la compétence de sa famille (au survol de sa carte)")}</small></h2>
      ${/* (it. 1866) capacités tournantes seulement : les pouvoirs uniques des lieutenants et du Briseur (it. 1849) faisaient
         défiler l'onglet en russe et en allemand à 1280 px ; ils restent décrits dans le panneau de zone de leur boss */ ""}
      <div class="setgrid">${Object.entries(BOSS_MECHANICS).filter(([id]) => !UNIQUE_MECHS.includes(id)).map(([id, b]) => { // prochaine zone (à partir de la zone actuelle) dont le boss a cette capacité
        let nz = 0; for (let z = S.zone; z < S.zone + 60; z++) if (bossMechanics(z).includes(id)) { nz = z; break; }
        return `<div class="setcard${nz === S.zone ? " here" : ""}" style="--c:#ff9a7a"><b>${esc(b.name)}</b>${nz ? ` <small>${nz === S.zone ? tx("boss de ta zone") : tx("prochain boss : zone {0}", { 0: nz })}</small>` : ""}<div>${esc(b.desc)}</div></div>`; }).join("")}</div>
      ${show.elites ? (() => { const won = (S.stats && S.stats.affixesSeen) || {}, ae = Object.entries(ELITE_AFFIXES); // (it. 943) sortes vaincues : ✓
        // (it. 1388) collection incomplète : l'astuce de l'Encens de chasse au survol du titre (rien de plus à l'écran)
        const lureTip = ae.some(([id]) => !won[id]) && tabOpen(S, "shop") ? ` title="${esc(tx("Astuce : l’Encens de chasse de la Boutique attire deux fois plus d’élites."))}"` : "";
        return `<h2 class="codexh" id="bj-elites"${lureTip}>${tx("Élites")} (${ae.filter(([id]) => won[id]).length} / ${ae.length}) <small>${tx("monstres dorés : butin garanti, or ×4 ; chacun a un affixe")}</small></h2>
      <p class="note tabintro">${tx("Chaque sorte d’élite vaincue donne {0} pour toujours. Bonus actuel : {1}.", { 0: esc(describeEffects(AFFIX_SEEN_BONUS)), 1: esc(describeEffects(affixesSeenEffects(S)) || "—") })}</p>
      <div class="setgrid">${ae.map(([id, a]) => `<div class="setcard${won[id] ? "" : " unknown"}" style="--c:${a.color}"><b class="tint">${esc(a.name)}</b>${won[id] ? ` <small>✓ ×${fmt(affixWins(won[id]))}</small>` : ""}<div>${esc(a.desc || "")}</div></div>`).join("")}</div>`; })() : ""}
      ${show.events ? this.eventsHTML(S) : ""}
      ${show.blessings ? this.blessingsHTML(S) : ""}`;
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
        : `<div class="setcard unknown"><b>???</b> <small>${pct(e.chance)}${tx(" par victoire")}</small></div>`; }).join("")}</div>
`;
  }

  /** (it. 1227) Les bénédictions du jour vécues (S.daily.seen) : même présentation que les événements ; celle du jour encadrée. */
  blessingsHTML(S) {
    const seen = (S.daily && S.daily.seen) || {}, ks = Object.keys(DAY_MODS), n = ks.filter((k) => seen[k]).length, today = S.daily && S.daily.mod;
    const cur = describeEffects(blessingsSeenEffects(S)) || "—";
    const tm = new Date(Date.now() + 864e5), tomorrow = dayModFor(`${tm.getFullYear()}-${String(tm.getMonth() + 1).padStart(2, "0")}-${String(tm.getDate()).padStart(2, "0")}`);
    return `<h2 class="codexh" id="bj-blessings">${tx("Bénédictions du jour")} (${n} / ${ks.length})</h2>
      <p class="note tabintro">${tx("Chaque bénédiction vécue donne {0} pour toujours. Bonus actuel : {1}.", { 0: esc(describeEffects(BLESSING_SEEN_BONUS)), 1: esc(cur) })}</p>
      <div class="setgrid">${ks.map((k) => { const m = DAY_MODS[k];
        // (it. 1296) aujourd'hui et demain marqués ; celle de demain dévoilée même jamais vécue (une raison de revenir ;
        // la bulle de la pastille du jour la nommait déjà)
        const tag = k === today ? ` <span class="daytag">${tx("aujourd’hui")}</span>` : k === tomorrow ? ` <span class="daytag">${tx("demain")}</span>` : "";
        return seen[k] || k === tomorrow
        ? `<div class="setcard${k === today ? " here" : ""}"><b>${m.icon} ${esc(m.name)}</b>${tag} <small>${esc(m.desc)}</small></div>`
        : `<div class="setcard unknown" title="${esc(tx("Bénédiction encore jamais vécue : chaque jour en apporte une, reviens jouer d’autres jours."))}"><b>???</b></div>`; }).join("")}</div>`;
  }

  /** Sections affichées : seulement ce que le joueur a déjà rencontré (moins d'informations d'un coup). */
  shown(S) {
    return { powers: powersFound(S) > 0, sets: codexCounts(S).epic > 0 || Object.keys(S.setsDone || {}).length > 0, elites: (S.stats.elites || 0) > 0,
      events: (S.stats.events || 0) > 0, // (it. 920)
      blessings: Object.keys((S.daily && S.daily.seen) || {}).some((k) => DAY_MODS[k]) }; // (it. 1227)
  }

  /** Sous-onglets : un clic affiche la section (les autres restent cachées). */
  jumpHTML() {
    const show = this.shown(this.game.S);
    const L = [["codex", tx("Collection d’objets")], ["powers", tx("Pouvoirs légendaires")], ["sets", tx("Panoplies")],
      ["bosses", tx("Capacités des boss")], ["elites", tx("Élites")], ["events", tx("Événements rares")], ["blessings", tx("Bénédictions du jour")], ["beasts", tx("Bestiaire")]].filter(([k]) => show[k] !== false);
    // Les monstres en premier : c'est le cœur du bestiaire.
    L.unshift(...L.splice(L.findIndex(([k]) => k === "beasts"), 1));
    return `<nav class="bjump subtabs" role="tablist" aria-label="${esc(tx("Aller à"))}">${L.map(([k, n]) => `<button class="quiet${this.sec === k ? " on" : ""}" role="tab" aria-selected="${this.sec === k}" data-action="b-jump" data-to="${k}">${esc(n)}</button>`).join("")}</nav>`;
  }

  onAction(a, b) {
    if (a === "b-jump") this.sec = b.dataset.to.replace(/^bj-/, ""); // le panneau se redessine ensuite
    else if (a === "b-setfin") this.game.finishSet(b.dataset.id);
    else if (a === "b-go" && hasUnlock(this.game.S, "travelMap")) this.game.setZone(+b.dataset.z); // (it. 1437)
  }
  // (it. 936) un événement en cours : le compte à rebours de sa carte avance (sous-onglet des événements seulement)
  tick() { return this.sec === "events" && Object.values(this.game.R.events || {}).some((t) => t > 0); }
}
