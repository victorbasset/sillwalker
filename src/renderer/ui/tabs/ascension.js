// Onglet Ascension : recommencer plus fort (éclats d'étoile -> constellations).
import { t as tx, txn, fsp, csep } from "../../i18n/index.js";
import { CLASSES, canPartner, duoSynergy } from "../../game/classes.js";
import { ASCEND_MIN_ZONE, CONSTELLATIONS, SPECIAL_EFFECTS, constellationCost, shardsFor, glowEffects, GLOW_PER_SHARD } from "../../game/prestige.js";
import { describeEffects } from "../../game/talents.js";
import { esc } from "../../game/format.js";
import { hasUnlock } from "../../game/unlocks.js";
import { shopIconURL } from "../../render/shopart.js";

// Demande 27 : des icônes dans l'onglet Ascension (gardé / perdu, constellations, éclats).
const ico = (id) => `<img class="eicon" src="${shopIconURL(id, 3)}" alt="">`;
// Mêmes icônes que les onglets (panel.js > TABS) : talents = étoile, compétences = cible, quêtes = parchemin…
const KEEP = [["wisdom", "constellations, lueur"], ["egg", "familiers, bestiaire"], ["book", "collection, pouvoirs"], ["ws_speed", "vitesse permanente"], ["target", "compétences, héros libérés"], ["bag", "taille du sac"], ["hammer", "déblocages et atelier"]];
const LOSE = [["ws_gold", "niveau et or"], ["ws_atk", "équipement et sac"], ["star", "talents"], ["fortune", "quêtes en cours"]];

/** Effet de `n` rangs. Pour « Rang suivant », la zone de départ s'affiche au total du rang suivant (un écart « zone 3 » trompait). */
function effText(eff, n) {
  const normal = {}, special = [];
  for (const k in eff) { if (SPECIAL_EFFECTS[k]) special.push(SPECIAL_EFFECTS[k](eff[k] * n)); else normal[k] = eff[k]; }
  return [describeEffects(normal, n), ...special].filter(Boolean).join(csep());
}

export class AscensionTab {
  constructor(game) { this.game = game; this.armed = false; }

  badge() { return this.game.canAscend() && this.game.S.prestige.count === 0 ? "!" : ""; }

  render(el) {
    const g = this.game, S = g.S, P = S.prestige, can = g.canAscend(), gain = g.ascendShards();
    const nextZone = Math.max(ASCEND_MIN_ZONE, S.best + 1);
    // Cases des déblocages (Carte du ciel, Astrolabe) : à côté du bouton d'ascension (place comptée à 1280 px).
    const autos = `${hasUnlock(S, "skyChart") ? `<label class="toggle" title="${esc(tx("Carte du ciel : placer tout seul les éclats dans la constellation la moins chère"))}" aria-label="${esc(tx("Carte du ciel"))}"><input type="checkbox" data-action="a-stars"${S.settings.autoStars !== false ? " checked" : ""}> ${ico("c_north")}</label>` : ""}${hasUnlock(S, "astrolabe") ? `<label class="toggle" title="${esc(tx("Astrolabe : faire l’ascension tout seul quand le héros bloque près de son record"))}" aria-label="${esc(tx("Astrolabe"))}"><input type="checkbox" data-action="a-auto"${S.settings.autoAscend === true ? " checked" : ""}> ${ico("astro")}</label>` : ""}`;
    const intro = `<article class="panel ascend">
      <h2>${tx("Ascension")} <small>${txn(P.count, "{n} ascension|{n} ascensions")}</small></h2>
      <p class="shards">${ico("star")} ${txn(P.shards, "{n} éclat d’étoile|{n} éclats d’étoile", { n: `<b>${P.shards}</b>` })} <span class="note">${tx("({0} gagnés au total)", { 0: P.total })}</span></p>
      <p><b>${tx("Lueur stellaire")}</b>${fsp()}${tx(": chaque éclat gagné, même dépensé, donne pour toujours {0}.\n      {1}\n      {2}", { 0: esc(describeEffects(GLOW_PER_SHARD)), 1: P.total ? `${tx("Actuellement :")} <b class="delta-p">${esc(describeEffects(glowEffects(S)))}</b>.` : "", 2: P.bestRun ? `<br><span class="note">${tx("Meilleure course : zone {0}.", { 0: Math.max(P.bestRun, S.best) })}</span>` : "" })}</p>
      <p class="tight">${tx("Ton héros recommence au")} <b>${tx("niveau 1")}</b>${tx(", en zone {0}.", { 0: g.nextStartZone() })}</p>
      <div class="keeplose">
        <div><b class="delta-p">${tx("Gardé")}</b><ul>${KEEP.map(([i, t]) => `<li>${ico(i)}${tx(t)}</li>`).join("")}${hasUnlock(S, "autoSell") ? `<li>${ico("contract")}${tx("ventes automatiques")}</li>` : ""}</ul></div>
        <div><b class="delta-n">${tx("Perdu")}</b><ul>${LOSE.map(([i, t]) => `<li>${ico(i)}${tx(t)}</li>`).join("")}</ul></div>
      </div>
      <p>${tx("Héros de la prochaine aventure :")} <b>${esc(CLASSES[S.nextCls || S.cls].name)}</b>
        <button class="linkbtn inline" data-tab="class">${tx("changer →")}</button>
        ${(() => { // compagnon gardé à l'ascension (game.js : nextPartner, sinon le compagnon actuel) et synergie éventuelle
          const next = S.nextCls || S.cls, pick = S.nextPartner || S.partner;
          if (!pick || !CLASSES[pick] || !canPartner(S, next, pick)) return "";
          const syn = duoSynergy(next, pick);
          return `<br>${tx("Compagnon de la prochaine aventure :")} <b>${esc(CLASSES[pick].name)}</b>${syn ? ` <span class="synergy-on">✦ ${esc(tx(syn.name))}</span>` : ""}`; })()}</p>
      ${can
        ? `<p>${tx("Ascension maintenant :")} <b class="gold">${tx("+{0} éclats", { 0: gain })}</b> ${tx("(record zone {0}). En zone {1} : +{2}.", { 0: S.best, 1: nextZone + 4, 2: shardsFor(nextZone + 4) })}</p>
           <div class="row"><button data-action="a-ascend" class="${this.armed ? "danger" : "primary"}">${this.armed ? tx("Confirmer : tout recommencer") : ico("star") + " " + tx("Monter vers les étoiles")}</button>${autos ? `<span class="autorow">${autos}</span>` : ""}</div>`
        : `<p class="note">${tx("Disponible à partir de la zone {0} (record actuel : {1}). Rapportera alors {2} éclats, et plus en allant plus loin.", { 0: ASCEND_MIN_ZONE, 1: S.best, 2: shardsFor(ASCEND_MIN_ZONE) })}</p>${autos ? `<div class="row autorow">${autos}</div>` : ""}`}
    </article>`;
    // Constellations au maximum : regroupées en une ligne de pastilles (effet au survol) ; la liste ne garde que
    // celles qu'on peut encore améliorer (demande 18 : moins chargé).
    const maxedList = CONSTELLATIONS.filter((c) => (P.ranks[c.id] || 0) >= c.max);
    const maxedChips = maxedList.map((c) => `<span class="chip" title="${esc(effText(c.eff, c.max))}"><img class="eicon" src="${shopIconURL(c.id, 2)}" alt="">${esc(c.name)}</span>`).join("");
    const stars = CONSTELLATIONS.filter((c) => (P.ranks[c.id] || 0) < c.max).map((c) => {
      const rank = P.ranks[c.id] || 0, maxed = rank >= c.max, cost = constellationCost(c, rank);
      // Ligne compacte (demande 29) : « rang suivant » seul, l'effet actuel et le texte entier au survol.
      const full = (rank ? tx("Actuel : ") + effText(c.eff, rank) + " · " : "") + (maxed ? tx("maximum atteint") : tx("Rang suivant : ") + effText(c.eff, c.eff.startZone ? rank + 1 : 1));
      return `<li class="shopline" title="${esc(full)}"><img class="eicon big" src="${shopIconURL(c.id, 3)}" alt=""><div class="si"><div class="nm">${esc(c.name)} <small>${rank} / ${c.max}</small></div>
        <div class="sub">${maxed ? tx("maximum atteint") : tx("Rang suivant : ") + esc(effText(c.eff, c.eff.startZone ? rank + 1 : 1))}</div></div>
        ${maxed ? `<button disabled>${tx("Maximum")}</button>` : `<button data-action="a-buy" data-id="${c.id}"${P.shards < cost ? " disabled" : ""}>✦ ${cost}</button>`}</li>`;
    }).join("");
    el.innerHTML = `<div class="ascgrid">${intro}<article class="panel"><h2>${tx("Constellations")} <small>${tx("effets permanents")}</small></h2>${maxedList.length ? `<p class="note tight">${tx("Au maximum ({0}) :", { 0: maxedList.length })}</p><div class="uowned">${maxedChips}</div>` : ""}<ul class="shoplist two-cols">${stars}</ul></article></div>`;
  }

  onAction(a, b) {
    if (a === "a-buy") this.game.buyConstellation(b.dataset.id);
    else if (a === "a-stars") { this.game.S.settings.autoStars = b.checked; if (b.checked) this.game.autoConstellations(); this.game.changed(); }
    else if (a === "a-auto") { this.game.S.settings.autoAscend = b.checked; this.game.changed(); }
    else if (a === "a-ascend") {
      if (!this.armed) { this.armed = true; setTimeout(() => { this.armed = false; }, 5000); return; }
      this.armed = false;
      this.game.ascend();
    }
  }

  tick() { return false; }
}
