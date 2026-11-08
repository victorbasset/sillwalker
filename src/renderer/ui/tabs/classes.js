// Onglet Classe : choix entre Guerrier, Rôdeur et Mage.
import { CLASSES, CLASS_KEYS } from "../../game/classes.js";
import { talentPointsSpent } from "../../game/talents.js";
import { esc } from "../../game/format.js";
import { classPortraitURL } from "../../render/sprites.js";

const pct = (m) => (m === 1 ? "" : `${m > 1 ? "+" : "−"}${Math.round(Math.abs(m - 1) * 100)} %`);

export class ClassesTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  render(el) {
    const S = this.game.S;
    const cards = CLASS_KEYS.map((k) => {
      const c = CLASSES[k], cur = S.cls === k;
      const mods = [
        pct(c.mul.hp) && `Points de vie ${pct(c.mul.hp)}`,
        pct(c.mul.atk) && `Attaque ${pct(c.mul.atk)}`,
        pct(c.mul.def) && `Défense ${pct(c.mul.def)}`,
        c.add.crit && `Critique +${c.add.crit} pts`,
        c.add.spd && `Vitesse d’attaque +${c.add.spd} %`,
        c.projectile ? "Combat à distance" : "Combat au corps à corps",
      ].filter(Boolean);
      const spent = talentPointsSpent(S, k);
      return `<article class="panel classcard${cur ? " current" : ""}">
        <div class="detail-head"><img src="${classPortraitURL(k)}" alt=""><div>
          <div class="nm">${esc(c.name)}</div><div class="sub">${esc(c.role)}</div></div></div>
        <p class="cdesc">${esc(c.desc)}</p>
        <ul class="lines">${mods.map((m) => `<li><span>${esc(m)}</span></li>`).join("")}</ul>
        <p class="passive"><b>Passif.</b> ${esc(c.passiveText)}</p>
        <p class="note">${spent} point${spent > 1 ? "s" : ""} de talent répartis.</p>
        <div class="row">${cur ? `<button disabled>Classe actuelle</button>` : `<button data-action="c-pick" data-id="${k}">Devenir ${esc(c.name.toLowerCase())}</button>`}</div>
      </article>`;
    }).join("");
    el.innerHTML = `<p class="note tabintro">Changer de classe est gratuit et instantané : chaque classe garde ses propres talents, l’équipement et l’or sont partagés.</p>
      <div class="classgrid">${cards}</div>`;
  }

  onAction(a, b) { if (a === "c-pick") this.game.setClass(b.dataset.id); }

  tick() {}
}
