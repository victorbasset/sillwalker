// Onglet Classe : les héros libérés et ceux encore prisonniers. On change de
// classe en faisant une ascension : on choisit ici la classe de la prochaine.
import { CLASSES, CLASS_KEYS, CLASS_UNLOCK_ZONE, isClassUnlocked, ATTACK_TIERS, attackTier } from "../../game/classes.js";
import { talentPointsSpent } from "../../game/talents.js";
import { zoneName } from "../../game/rules.js";
import { esc } from "../../game/format.js";
import { classPortraitURL } from "../../render/sprites.js";

const pct = (m) => (m === 1 ? "" : `${m > 1 ? "+" : "−"}${Math.round(Math.abs(m - 1) * 100)} %`);

export class ClassesTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  render(el) {
    const S = this.game.S, next = S.nextCls || S.cls;
    const freed = CLASS_KEYS.filter((k) => isClassUnlocked(S, k)).length;
    const cards = CLASS_KEYS.map((k) => {
      const c = CLASSES[k], cur = S.cls === k, open = isClassUnlocked(S, k);
      if (!open) {
        const z = CLASS_UNLOCK_ZONE[k];
        return `<article class="panel classcard locked">
          <div class="detail-head"><img class="silhouette" src="${classPortraitURL(k)}" alt=""><div>
            <div class="nm">${esc(c.name)}</div><div class="sub">${esc(c.role)}</div></div></div>
          <p class="cdesc">Retenu prisonnier en <b>zone ${z}</b> (${esc(zoneName(z))}).</p>
          <p class="note">Bats le boss de cette zone pour le libérer.${S.best >= z ? " Tu y es déjà passé : retournes-y pour le vaincre." : ""}</p>
        </article>`;
      }
      const mods = [
        pct(c.mul.hp) && `Points de vie ${pct(c.mul.hp)}`,
        pct(c.mul.atk) && `Attaque ${pct(c.mul.atk)}`,
        pct(c.mul.def) && `Défense ${pct(c.mul.def)}`,
        c.add.crit && `Critique +${c.add.crit} pts`,
        c.add.spd && `Vitesse d’attaque +${c.add.spd} %`,
        c.projectile ? "Combat à distance" : "Combat au corps à corps",
      ].filter(Boolean);
      const spent = talentPointsSpent(S, k), chosen = next === k;
      const action = cur && chosen ? `<button disabled>Classe actuelle</button>`
        : chosen ? `<button disabled class="primary">Choisie pour l’ascension ✓</button>`
        : `<button data-action="c-pick" data-id="${k}">${cur ? "Garder cette classe" : "Choisir pour la prochaine ascension"}</button>`;
      return `<article class="panel classcard${cur ? " current" : ""}${chosen && !cur ? " chosen" : ""}">
        <div class="detail-head"><img src="${classPortraitURL(k)}" alt=""><div>
          <div class="nm">${esc(c.name)}${cur ? " <small>(actuelle)</small>" : ""}</div><div class="sub">${esc(c.role)}</div></div></div>
        <p class="cdesc">${esc(c.desc)}</p>
        <ul class="lines">${mods.map((m) => `<li><span>${esc(m)}</span></li>`).join("")}</ul>
        <p class="passive"><b>Passif.</b> ${esc(c.passiveText)}</p>
        ${spent ? `<p class="note">${spent} point${spent > 1 ? "s" : ""} de talent répartis.</p>` : ""}
        <div class="row">${action}</div>
      </article>`;
    }).join("");
    const tier = attackTier(S), nextT = ATTACK_TIERS[tier + 1];
    const style = `<article class="panel tierbox"><h2>Style de combat <small>palier ${tier + 1} / ${ATTACK_TIERS.length} · ${esc(ATTACK_TIERS[tier].name)}</small></h2>
      <div class="tiers">${ATTACK_TIERS.map((t, i) => `<span class="tierpip${i <= tier ? " on" : ""}" title="${esc(t.name)} : niveau ${t.lvl}${t.asc ? ` et ${t.asc} ascension${t.asc > 1 ? "s" : ""}` : ""}">${i + 1}</span>`).join("")}</div>
      <p class="note tight">Les attaques de ton héros deviennent plus grandes et plus spectaculaires à chaque palier (lame croisée, lueur, étincelles, triples projectiles, onde de choc).
      ${nextT ? `Prochain palier : <b>${esc(nextT.name)}</b>, niveau ${nextT.lvl}${nextT.asc ? ` et ${nextT.asc} ascension${nextT.asc > 1 ? "s" : ""}` : ""}.` : "Palier maximal atteint !"}</p></article>`;
    el.innerHTML = `${style}<p class="note tabintro"><b>${freed} / ${CLASS_KEYS.length}</b> héros libérés. On change de classe en faisant une <b>ascension</b> :
      choisis ici la classe de ta prochaine aventure${S.nextCls ? ` (actuellement : <b>${esc(CLASSES[S.nextCls].name)}</b>)` : ""}. Les autres héros sont prisonniers d’un boss de zone.</p>
      <div class="classgrid">${cards}</div>`;
  }

  onAction(a, b) { if (a === "c-pick") this.game.chooseNextClass(b.dataset.id); }

  tick() {}
}
