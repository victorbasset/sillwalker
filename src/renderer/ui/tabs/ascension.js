// Onglet Ascension : recommencer plus fort (éclats d'étoile -> constellations).
import { t as tx, txn, fsp } from "../../i18n/index.js";
import { CLASSES } from "../../game/classes.js";
import { ASCEND_MIN_ZONE, CONSTELLATIONS, SPECIAL_EFFECTS, constellationCost, shardsFor, glowEffects, GLOW_PER_SHARD } from "../../game/prestige.js";
import { describeEffects } from "../../game/talents.js";
import { esc } from "../../game/format.js";
import { hasUnlock } from "../../game/unlocks.js";

/** Effet de `n` rangs. Pour « Rang suivant », la zone de départ s'affiche au total du rang suivant (un écart « zone 3 » trompait). */
function effText(eff, n) {
  const normal = {}, special = [];
  for (const k in eff) { if (SPECIAL_EFFECTS[k]) special.push(SPECIAL_EFFECTS[k](eff[k] * n)); else normal[k] = eff[k]; }
  return [describeEffects(normal, n), ...special].filter(Boolean).join(", ");
}

export class AscensionTab {
  constructor(game) { this.game = game; this.armed = false; }

  badge() { return this.game.canAscend() && this.game.S.prestige.count === 0 ? "!" : ""; }

  render(el) {
    const g = this.game, S = g.S, P = S.prestige, can = g.canAscend(), gain = g.ascendShards();
    const nextZone = Math.max(ASCEND_MIN_ZONE, S.best + 1);
    const intro = `<article class="panel ascend">
      <h2>${tx("Ascension")} <small>${txn(P.count, "{n} ascension|{n} ascensions")}</small></h2>
      <p class="shards">✦ ${txn(P.shards, "{n} éclat d’étoile|{n} éclats d’étoile", { n: `<b>${P.shards}</b>` })} <span class="note">${tx("({0} gagnés au total)", { 0: P.total })}</span></p>
      <p><b>${tx("Lueur stellaire")}</b>${fsp()}${tx(": chaque éclat gagné, même dépensé, donne pour toujours {0}.\n      {1}\n      {2}", { 0: esc(describeEffects(GLOW_PER_SHARD)), 1: P.total ? `${tx("Actuellement :")} <b class="delta-p">${esc(describeEffects(glowEffects(S)))}</b>.` : "", 2: P.bestRun ? `<br><span class="note">${tx("Meilleure course : zone {0}.", { 0: Math.max(P.bestRun, S.best) })}</span>` : "" })}</p>
      <p class="tight">${tx("Ton héros recommence au")} <b>${tx("niveau 1")}</b>${tx(", en zone {0}.", { 0: g.nextStartZone() })}</p>
      <div class="keeplose">
        <div><b class="delta-p">${tx("Gardé")}</b><ul><li>${tx("constellations, lueur")}</li><li>${tx("familiers, bestiaire")}</li><li>${tx("collection, pouvoirs")}</li><li>${tx("vitesse permanente")}</li><li>${tx("compétences, héros libérés")}</li><li>${tx("taille du sac")}</li></ul></div>
        <div><b class="delta-n">${tx("Perdu")}</b><ul><li>${tx("niveau et or")}</li><li>${tx("équipement et sac")}</li><li>${tx("talents")}</li><li>${tx("quêtes en cours")}</li></ul></div>
      </div>
      <p>${tx("Classe de la prochaine aventure :")} <b>${esc(CLASSES[S.nextCls || S.cls].name)}</b>
        <button class="linkbtn inline" data-tab="class">${tx("changer →")}</button></p>
      ${can
        ? `<p>${tx("Ascension maintenant :")} <b class="gold">${tx("+{0} éclats", { 0: gain })}</b> ${tx("(record zone {0}). En zone {1} : +{2}.", { 0: S.best, 1: nextZone + 4, 2: shardsFor(nextZone + 4) })}</p>
           <div class="row"><button data-action="a-ascend" class="${this.armed ? "danger" : "primary"}">${this.armed ? tx("Confirmer : tout recommencer") : tx("Monter vers les étoiles")}</button></div>`
        : `<p class="note">${tx("Disponible à partir de la zone {0} (record actuel : {1}). Rapportera alors {2} éclats, et plus en allant plus loin.", { 0: ASCEND_MIN_ZONE, 1: S.best, 2: shardsFor(ASCEND_MIN_ZONE) })}</p>`}
      ${hasUnlock(S, "astrolabe") ? `<label class="toggle"><input type="checkbox" data-action="a-auto"${S.settings.autoAscend === true ? " checked" : ""}> ${tx("Astrolabe : faire l’ascension tout seul quand le héros bloque près de son record")}</label>` : ""}
    </article>`;
    const stars = CONSTELLATIONS.map((c) => {
      const rank = P.ranks[c.id] || 0, maxed = rank >= c.max, cost = constellationCost(c, rank);
      return `<li class="shopline"><div class="si"><div class="nm">${esc(c.name)} <small>${rank} / ${c.max}</small></div>
        <div class="sub">${rank ? tx("Actuel : ") + esc(effText(c.eff, rank)) + " · " : ""}${maxed ? tx("maximum atteint") : tx("Rang suivant : ") + esc(effText(c.eff, c.eff.startZone ? rank + 1 : 1))}</div></div>
        ${maxed ? `<button disabled>${tx("Maximum")}</button>` : `<button data-action="a-buy" data-id="${c.id}"${P.shards < cost ? " disabled" : ""}>✦ ${cost}</button>`}</li>`;
    }).join("");
    el.innerHTML = `<div class="ascgrid">${intro}<article class="panel"><h2>${tx("Constellations")} <small>${tx("effets permanents")}</small></h2><ul class="shoplist two-cols">${stars}</ul></article></div>`;
  }

  onAction(a, b) {
    if (a === "a-buy") this.game.buyConstellation(b.dataset.id);
    else if (a === "a-auto") { this.game.S.settings.autoAscend = b.checked; this.game.changed(); }
    else if (a === "a-ascend") {
      if (!this.armed) { this.armed = true; setTimeout(() => { this.armed = false; }, 5000); return; }
      this.armed = false;
      this.game.ascend();
    }
  }

  tick() { return false; }
}
