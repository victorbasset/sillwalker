// Onglet Familiers : collection, œufs à faire éclore, familier actif.
import { subtabsHTML } from "../subtabs.js";
import { t as tx, txn, lc } from "../../i18n/index.js";
import { PETS, PET_MAX_LVL, EGG_CHANCE, petXpNeed, EXPEDITIONS } from "../../game/pets.js";
import { describeEffects } from "../../game/talents.js";
import { esc, fmt, uH, uMin } from "../../game/format.js";

const left = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h ? `${uH(h)} ${String(m).padStart(2, "0")}` : `${uMin(m)} ${String(s % 60).padStart(2, "0")}`; };
const dur = (min) => (min >= 60 ? uH(min / 60) : uMin(min));
import { petURL } from "../../render/sprites.js";
import { lockLink } from "../locks.js";
import { hasUnlock } from "../../game/unlocks.js";

export class PetsTab {
  constructor(game) { this.game = game; this.root = null; this.readyN = 0; this.eggsN = -1; this.sec = "found"; } // sous-onglet (demande 18)

  badge() { const n = this.game.S.pets.eggs + this.game.expeditionsReady().length; return n ? String(n) : ""; }

  expeditionHTML(p, active) {
    const e = (this.game.S.pets.exp || {})[p.id];
    if (e) {
      const ex = EXPEDITIONS[e.kind], done = e.end <= Date.now();
      return `<div class="expe${done ? " done" : ""}"><span>${done ? `${tx("De retour de {0} !", { 0: esc(lc(ex.name)) })}` : `${tx("En {0} · retour dans", { 0: esc(lc(ex.name)) })} <b data-exp="${p.id}">${left(e.end - Date.now())}</b>`}</span>
        ${done ? `<button class="primary" data-action="p-claim" data-id="${p.id}">${tx("Récupérer le butin")}</button>` : ""}</div>`;
    }
    if (active || !hasUnlock(this.game.S, "expeditions")) return "";
    return `<div class="row expe-btns">${Object.entries(EXPEDITIONS).map(([k, ex]) => `<button class="quiet" data-action="p-exp" data-id="${p.id}" data-kind="${k}" title="${esc(tx("{0} : or, expérience, parfois un œuf ({1} %) ou un objet ({2} %)", { 0: esc(ex.name), 1: Math.round(ex.egg * 100), 2: Math.round(ex.item * 100) }))}">${esc(ex.name)} · ${dur(ex.min)}</button>`).join("")}</div>`;
  }

  render(el) {
    this.root = el;
    this.readyN = this.game.expeditionsReady().length; this.eggsN = this.game.S.pets.eggs;
    const S = this.game.S, P = S.pets, owned = Object.keys(P.owned).length, idle = this.game.idlePets().length;
    const cards = [...PETS].sort((a, b) => (P.owned[b.id] ? 1 : 0) - (P.owned[a.id] ? 1 : 0)).map((p) => { // trouvés d’abord
      const own = P.owned[p.id], active = P.active === p.id;
      if (!own) {
        return `<article class="panel petcard unknown"><div class="detail-head"><div class="petimg">?</div><div>
          <div class="nm">???</div><div class="sub">${tx("Pas encore trouvé")}</div></div></div>
          <p class="note">${tx("Sort d’un œuf : boss ({0} %), élites ({1} %) ou quêtes.", { 0: Math.round(EGG_CHANCE.boss * 100), 1: Math.round(EGG_CHANCE.elite * 100) })}</p></article>`;
      }
      const maxed = own.lvl >= PET_MAX_LVL, need = petXpNeed(own.lvl);
      // Carte compacte (demande 18) : la description d'ambiance passe en infobulle.
      return `<article class="panel petcard${active ? " current" : ""}" title="${esc(p.desc)}">
        <div class="detail-head"><img src="${petURL(p.id)}" alt=""><div>
          <div class="nm">${esc(p.name)} <small>${tx("niv. {0}", { 0: own.lvl })}${maxed ? ` (${tx("max")})` : ""}</small></div></div></div>
        <ul class="lines"><li><span>${tx("Bonus")}</span><span class="delta-p">${esc(describeEffects(p.eff, own.lvl))}</span></li>
        ${maxed ? "" : `<li><span>${tx("Niveau suivant")}</span><span>${esc(describeEffects(p.eff, own.lvl + 1))}</span></li>`}</ul>
        ${maxed ? "" : `<div class="kv"><span>${tx("Expérience")}</span><span>${Math.floor(own.xp)} / ${need}</span></div><div class="bar"><i style="width:${(100 * own.xp) / need}%"></i></div>`}
        <div class="row">${active ? `<button disabled>${tx("Compagnon actuel")}</button>` : (this.game.S.pets.exp || {})[p.id] ? "" : `<button data-action="p-set" data-id="${p.id}">${tx("Emmener")}</button>`}</div>
        ${this.expeditionHTML(p, active)}
      </article>`;
    }).join("");
    if (!hasUnlock(S, "menagerie")) {
      el.innerHTML = `<div class="petbar panel"><div>${txn(P.eggs, "{n} œuf en attente|{n} œufs en attente", { n: `<b>${P.eggs}</b>` })}</div>
        <span class="note">${tx("Les œufs tombent des boss et des élites. Débloque la Ménagerie pour les faire éclore : un familier suit ton héros et le renforce.")}</span>
        ${lockLink(S, "menagerie")}</div>`;
      return;
    }
    el.innerHTML = `<div class="petbar panel">
        <div><b>${owned} / ${PETS.length}</b> ${tx("familiers trouvés ·")} ${txn(P.eggs, "{n} œuf en attente|{n} œufs en attente", { n: `<b>${P.eggs}</b>` })}</div>
        ${P.eggs > 0 && (hasUnlock(S, "petBulk") || P.eggs <= 1) ? `<button data-action="${hasUnlock(S, "petBulk") ? "p-hatchall" : "p-hatch"}" class="primary"${P.eggs ? "" : " disabled"}>${P.eggs > 1 ? `${tx("Faire éclore les {0} œufs", { 0: P.eggs })}` : tx("Faire éclore l’œuf")}</button>` : P.eggs > 1 ? `<button data-action="p-hatch" class="primary">${tx("Faire éclore l’œuf")}</button>` : ""}
        ${lockLink(S, "expeditions") || lockLink(S, "petBulk")}
        ${idle && hasUnlock(S, "petBulk") ? `<span class="sendall">${tx("Envoyer les {0} familiers libres : {1}", { 0: idle, 1: Object.entries(EXPEDITIONS).map(([k, ex]) => `<button data-action="p-expall" data-kind="${k}" class="quiet">${esc(ex.name)} · ${dur(ex.min)}</button>`).join("") })}</span>` : ""}
        ${hasUnlock(S, "steward") ? `<span class="stewrow"><label class="toggle"><input type="checkbox" data-action="steward"${S.settings.autoPets !== false ? " checked" : ""}> ${tx("Grand intendant : œufs et expéditions tout seuls")}</label>
          ${Object.entries(EXPEDITIONS).map(([k, ex]) => `<button class="quiet" data-action="p-stewkind" data-kind="${k}" aria-pressed="${(EXPEDITIONS[P.lastKind] ? P.lastKind : "long") === k}">${esc(ex.name)}</button>`).join("")}</span>` : ""}
        ${this.readyN > 1 && hasUnlock(S, "petBulk") ? `<button data-action="p-claimall" class="primary">${tx("Récupérer {0} expéditions", { 0: this.readyN })}</button>` : ""}
        <span class="note help" title="${esc(tx("Le familier actif suit ton héros et gagne de l’expérience à chaque victoire. Les autres peuvent partir en expédition (même jeu fermé) et rapporter or, expérience, œufs et objets."))}">ⓘ</span>
      </div>
      ${owned < PETS.length ? subtabsHTML([["found", tx("Trouvés"), owned], ["unknown", tx("À découvrir"), PETS.length - owned]], this.sec, "p-sec") : ""}
      <div class="petgrid sec-${owned < PETS.length ? this.sec : "found"}">${cards}</div>`;
  }

  onAction(a, b) {
    if (a === "p-sec") { this.sec = b.dataset.to; return; }
    if (a === "p-hatch") this.game.hatchEgg();
    else if (a === "p-set") this.game.setPet(b.dataset.id);
    else if (a === "p-exp") this.game.sendExpedition(b.dataset.id, b.dataset.kind);
    else if (a === "p-claim") this.game.claimExpedition(b.dataset.id);
    else if (a === "p-claimall") this.game.claimAllExpeditions();
    else if (a === "p-hatchall") this.game.hatchAll();
    else if (a === "p-expall") this.game.sendAllExpeditions(b.dataset.kind);
    else if (a === "p-stewkind") { if (EXPEDITIONS[b.dataset.kind]) { this.game.S.pets.lastKind = b.dataset.kind; this.game.changed(); } } // expédition du Grand intendant
  }

  tick() {
    if (!this.root) return false;
    if (this.game.expeditionsReady().length !== this.readyN) return true;
    if (this.game.S.pets.eggs !== this.eggsN) return true; // œufs gagnés ou éclos (Grand intendant) : bouton à jour
    const E = this.game.S.pets.exp || {};
    for (const n of this.root.querySelectorAll("[data-exp]")) { const e = E[n.dataset.exp]; if (e) n.textContent = left(e.end - Date.now()); }
    return false;
  }
}
