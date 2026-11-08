// Onglet Ascension : recommencer plus fort (éclats d'étoile -> constellations).
import { ASCEND_MIN_ZONE, CONSTELLATIONS, SPECIAL_EFFECTS, constellationCost, shardsFor, glowEffects, GLOW_PER_SHARD } from "../../game/prestige.js";
import { describeEffects } from "../../game/talents.js";
import { esc } from "../../game/format.js";

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
      <h2>Ascension <small>${P.count} ascension${P.count > 1 ? "s" : ""}</small></h2>
      <p class="shards">✦ <b>${P.shards}</b> éclat${P.shards > 1 ? "s" : ""} d’étoile <span class="note">(${P.total} gagnés au total)</span></p>
      <p><b>Lueur stellaire</b> : chaque éclat gagné, même dépensé, donne pour toujours ${esc(describeEffects(GLOW_PER_SHARD))}.
      ${P.total ? `Actuellement : <b class="delta-p">${esc(describeEffects(glowEffects(S)))}</b>.` : ""}
      ${P.bestRun ? `<br><span class="note">Meilleure course : zone ${P.bestRun}.</span>` : ""}</p>
      <p>Ton héros recommence au niveau 1 en zone 1, mais garde ses constellations, ses familiers, son bestiaire, sa collection d’objets, sa vitesse permanente, ses compétences, sa classe et les améliorations du sac.
      Il perd son niveau, son or, son équipement, son sac, ses talents et ses quêtes.</p>
      ${can
        ? `<p>Ascension maintenant : <b class="gold">+${gain} éclats</b> (record zone ${S.best}). En zone ${nextZone + 4} : +${shardsFor(nextZone + 4)}.</p>
           <div class="row"><button data-action="a-ascend" class="${this.armed ? "danger" : "primary"}">${this.armed ? "Confirmer : tout recommencer" : "Monter vers les étoiles"}</button></div>`
        : `<p class="note">Disponible à partir de la zone ${ASCEND_MIN_ZONE} (record actuel : ${S.best}). Rapportera alors ${shardsFor(ASCEND_MIN_ZONE)} éclats, et plus en allant plus loin.</p>`}
    </article>`;
    const stars = CONSTELLATIONS.map((c) => {
      const rank = P.ranks[c.id] || 0, maxed = rank >= c.max, cost = constellationCost(c, rank);
      return `<li class="shopline"><div class="si"><div class="nm">${esc(c.name)} <small>${rank} / ${c.max}</small></div>
        <div class="sub">${rank ? "Actuel : " + esc(effText(c.eff, rank)) + " · " : ""}${maxed ? "maximum atteint" : "Rang suivant : " + esc(effText(c.eff, 1))}</div></div>
        ${maxed ? `<button disabled>Maximum</button>` : `<button data-action="a-buy" data-id="${c.id}"${P.shards < cost ? " disabled" : ""}>✦ ${cost}</button>`}</li>`;
    }).join("");
    el.innerHTML = `<div class="ascgrid">${intro}<article class="panel"><h2>Constellations <small>effets permanents</small></h2><ul class="shoplist two-cols">${stars}</ul></article></div>`;
  }

  onAction(a, b) {
    if (a === "a-buy") this.game.buyConstellation(b.dataset.id);
    else if (a === "a-ascend") {
      if (!this.armed) { this.armed = true; setTimeout(() => { this.armed = false; }, 5000); return; }
      this.armed = false;
      this.game.ascend();
    }
  }

  tick() { return false; }
}
