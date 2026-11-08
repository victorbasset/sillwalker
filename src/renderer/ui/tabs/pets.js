// Onglet Familiers : collection, œufs à faire éclore, familier actif.
import { PETS, PET_MAX_LVL, EGG_CHANCE, petXpNeed, EXPEDITIONS } from "../../game/pets.js";
import { describeEffects } from "../../game/talents.js";
import { esc, fmt } from "../../game/format.js";

const left = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h ? `${h} h ${String(m).padStart(2, "0")}` : `${m} min ${String(s % 60).padStart(2, "0")}`; };
const dur = (min) => (min >= 60 ? min / 60 + " h" : min + " min");
import { petURL } from "../../render/sprites.js";

export class PetsTab {
  constructor(game) { this.game = game; this.root = null; this.readyN = 0; }

  badge() { const n = this.game.S.pets.eggs + this.game.expeditionsReady().length; return n ? String(n) : ""; }

  expeditionHTML(p, active) {
    const e = (this.game.S.pets.exp || {})[p.id];
    if (e) {
      const ex = EXPEDITIONS[e.kind], done = e.end <= Date.now();
      return `<div class="expe${done ? " done" : ""}"><span>${done ? `De retour de ${esc(ex.name.toLowerCase())} !` : `En ${esc(ex.name.toLowerCase())} · retour dans <b data-exp="${p.id}">${left(e.end - Date.now())}</b>`}</span>
        ${done ? `<button class="primary" data-action="p-claim" data-id="${p.id}">Récupérer le butin</button>` : ""}</div>`;
    }
    if (active) return "";
    return `<div class="row expe-btns">${Object.entries(EXPEDITIONS).map(([k, ex]) => `<button class="quiet" data-action="p-exp" data-id="${p.id}" data-kind="${k}" title="${esc(ex.name)} : or, expérience, parfois un œuf (${Math.round(ex.egg * 100)} %) ou un objet (${Math.round(ex.item * 100)} %)">${esc(ex.name)} · ${dur(ex.min)}</button>`).join("")}</div>`;
  }

  render(el) {
    this.root = el;
    this.readyN = this.game.expeditionsReady().length;
    const P = this.game.S.pets, owned = Object.keys(P.owned).length, idle = this.game.idlePets().length;
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
        <div class="row">${active ? `<button disabled>Compagnon actuel</button>` : (this.game.S.pets.exp || {})[p.id] ? "" : `<button data-action="p-set" data-id="${p.id}">Emmener</button>`}</div>
        ${this.expeditionHTML(p, active)}
      </article>`;
    }).join("");
    el.innerHTML = `<div class="petbar panel">
        <div><b>${owned} / ${PETS.length}</b> familiers trouvés · <b>${P.eggs}</b> œuf${P.eggs > 1 ? "s" : ""} en attente</div>
        <button data-action="p-hatchall" class="primary"${P.eggs ? "" : " disabled"}>${P.eggs > 1 ? `Faire éclore les ${P.eggs} œufs` : "Faire éclore l’œuf"}</button>
        ${idle ? `<span class="sendall">Envoyer les ${idle} familiers libres : ${Object.entries(EXPEDITIONS).map(([k, ex]) => `<button data-action="p-expall" data-kind="${k}" class="quiet">${esc(ex.name)} · ${dur(ex.min)}</button>`).join("")}</span>` : ""}
        ${this.readyN > 1 ? `<button data-action="p-claimall" class="primary">Récupérer ${this.readyN} expéditions</button>` : ""}
        <span class="note">Le familier actif suit ton héros et gagne de l’expérience à chaque victoire. Les autres peuvent partir en expédition (même jeu fermé) et rapporter or, expérience, œufs et objets.</span>
      </div>
      <div class="petgrid">${cards}</div>`;
  }

  onAction(a, b) {
    if (a === "p-hatch") this.game.hatchEgg();
    else if (a === "p-set") this.game.setPet(b.dataset.id);
    else if (a === "p-exp") this.game.sendExpedition(b.dataset.id, b.dataset.kind);
    else if (a === "p-claim") this.game.claimExpedition(b.dataset.id);
    else if (a === "p-claimall") this.game.claimAllExpeditions();
    else if (a === "p-hatchall") this.game.hatchAll();
    else if (a === "p-expall") this.game.sendAllExpeditions(b.dataset.kind);
  }

  tick() {
    if (!this.root) return false;
    if (this.game.expeditionsReady().length !== this.readyN) return true;
    const E = this.game.S.pets.exp || {};
    for (const n of this.root.querySelectorAll("[data-exp]")) { const e = E[n.dataset.exp]; if (e) n.textContent = left(e.end - Date.now()); }
    return false;
  }
}
