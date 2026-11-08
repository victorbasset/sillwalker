// Onglet Familiers : collection, œufs à faire éclore, familier actif.
import { PETS, PET_MAX_LVL, EGG_CHANCE, petXpNeed } from "../../game/pets.js";
import { describeEffects } from "../../game/talents.js";
import { esc } from "../../game/format.js";
import { petURL } from "../../render/sprites.js";

export class PetsTab {
  constructor(game) { this.game = game; }

  badge() { const n = this.game.S.pets.eggs; return n ? String(n) : ""; }

  render(el) {
    const P = this.game.S.pets, owned = Object.keys(P.owned).length;
    const cards = PETS.map((p) => {
      const own = P.owned[p.id], active = P.active === p.id;
      if (!own) {
        return `<article class="panel petcard unknown"><div class="detail-head"><div class="petimg">?</div><div>
          <div class="nm">???</div><div class="sub">Pas encore trouvé</div></div></div>
          <p class="note">Sort d’un œuf : boss (${Math.round(EGG_CHANCE.boss * 100)} %), élites (${Math.round(EGG_CHANCE.elite * 100)} %) ou quêtes.</p></article>`;
      }
      const maxed = own.lvl >= PET_MAX_LVL, need = petXpNeed(own.lvl);
      return `<article class="panel petcard${active ? " current" : ""}">
        <div class="detail-head"><img src="${petURL(p.id)}" alt=""><div>
          <div class="nm">${esc(p.name)} <small>niv. ${own.lvl}${maxed ? " (max)" : ""}</small></div><div class="sub">${esc(p.desc)}</div></div></div>
        <ul class="lines"><li><span>Bonus</span><span class="delta-p">${esc(describeEffects(p.eff, own.lvl))}</span></li>
        ${maxed ? "" : `<li><span>Niveau suivant</span><span>${esc(describeEffects(p.eff, own.lvl + 1))}</span></li>`}</ul>
        ${maxed ? "" : `<div class="kv"><span>Expérience</span><span>${Math.floor(own.xp)} / ${need}</span></div><div class="bar"><i style="width:${(100 * own.xp) / need}%"></i></div>`}
        <div class="row">${active ? `<button disabled>Compagnon actuel</button>` : `<button data-action="p-set" data-id="${p.id}">Emmener</button>`}</div>
      </article>`;
    }).join("");
    el.innerHTML = `<div class="petbar panel">
        <div><b>${owned} / ${PETS.length}</b> familiers trouvés · <b>${P.eggs}</b> œuf${P.eggs > 1 ? "s" : ""} en attente</div>
        <button data-action="p-hatch" class="primary"${P.eggs ? "" : " disabled"}>Faire éclore un œuf</button>
        <span class="note">Le familier actif suit ton héros et gagne de l’expérience à chaque victoire. Un doublon fait gagner de l’expérience au familier déjà possédé.</span>
      </div>
      <div class="petgrid">${cards}</div>`;
  }

  onAction(a, b) {
    if (a === "p-hatch") this.game.hatchEgg();
    else if (a === "p-set") this.game.setPet(b.dataset.id);
  }

  tick() { return false; }
}
