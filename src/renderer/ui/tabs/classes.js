// Onglet Classe : les héros libérés et ceux encore prisonniers. On change de
// classe en faisant une ascension : on choisit ici la classe de la prochaine.
import { t as tx, txn, fsp } from "../../i18n/index.js";
import { CLASSES, CLASS_KEYS, CLASS_KEYS_BY_UNLOCK, CLASS_UNLOCK_ZONE, isClassUnlocked, ATTACK_TIERS, attackTier, canPartner } from "../../game/classes.js";
import { talentPointsSpent } from "../../game/talents.js";
import { zoneName } from "../../game/rules.js";
import { esc, unit } from "../../game/format.js";
import { classPortraitURL } from "../../render/sprites.js";

const pct = (m) => (m === 1 ? "" : `${m > 1 ? "+" : "−"}${Math.round(Math.abs(m - 1) * 100)}${unit("%")}`);

export class ClassesTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  render(el) {
    const S = this.game.S, next = S.nextCls || S.cls;
    const freed = CLASS_KEYS.filter((k) => isClassUnlocked(S, k)).length;
    const cards = CLASS_KEYS_BY_UNLOCK().map((k) => { // ordre de libération (demande de Victor)
      const c = CLASSES[k], cur = S.cls === k, open = isClassUnlocked(S, k);
      if (!open) {
        const z = CLASS_UNLOCK_ZONE[k];
        return `<article class="panel classcard locked">
          <div class="detail-head"><img class="silhouette" src="${classPortraitURL(k)}" alt=""><div>
            <div class="nm">${esc(c.name)}</div><div class="sub">${esc(c.role)}</div></div></div>
          <p class="cdesc">${tx("Retenu prisonnier en")} <b>${tx("zone {0}", { 0: z })}</b> (${esc(zoneName(z))}).</p>
          <p class="note">${tx("Bats le boss de cette zone pour le libérer.{0}", { 0: S.best >= z ? tx(" Tu y es déjà passé : retournes-y pour le vaincre.") : "" })}</p>
        </article>`;
      }
      const mods = [
        pct(c.mul.hp) && `${tx("Points de vie {0}", { 0: pct(c.mul.hp) })}`,
        pct(c.mul.atk) && `${tx("Attaque {0}", { 0: pct(c.mul.atk) })}`,
        pct(c.mul.def) && `${tx("Défense {0}", { 0: pct(c.mul.def) })}`,
        c.add.crit && `${tx("Critique +{0} pts", { 0: c.add.crit })}`,
        c.add.spd && `${tx("Vitesse d’attaque +{0} %", { 0: c.add.spd })}`,
        c.projectile ? tx("Combat à distance") : tx("Combat au corps à corps"),
      ].filter(Boolean);
      const spent = talentPointsSpent(S, k), chosen = next === k;
      const action = cur && chosen ? `<button disabled>${tx("Classe actuelle")}</button>`
        : chosen ? `<button disabled class="primary">${tx("Choisie pour l’ascension ✓")}</button>`
        : `<button data-action="c-pick" data-id="${k}">${cur ? tx("Garder cette classe") : tx("Choisir pour la prochaine ascension")}</button>`;
      // Duo (demande 17) : ce héros peut-il accompagner le héros principal (actuel ou prévu) ? Autre portée seulement.
      const isPartner = S.partner === k, nextPartner = S.nextPartner === k;
      const duo = isPartner ? `<button disabled>${tx("Compagnon actuel")}</button>`
        : nextPartner ? `<button disabled class="primary">${tx("Compagnon à l’ascension ✓")}</button>`
        : canPartner(S, next, k) ? `<button data-action="c-partner" data-id="${k}">${S.partner ? tx("Compagnon pour la prochaine ascension") : tx("Prendre comme compagnon")}</button>` : "";
      return `<article class="panel classcard${cur ? " current" : ""}${chosen && !cur ? " chosen" : ""}${isPartner ? " partner" : ""}">
        <div class="detail-head"><img src="${classPortraitURL(k)}" alt=""><div>
          <div class="nm">${esc(c.name)}${cur ? ` <small>${tx("(actuelle)")}</small>` : ""}${isPartner ? ` <small>${tx("(compagnon)")}</small>` : ""}</div><div class="sub">${esc(c.role)}</div></div></div>
        <p class="cdesc">${esc(c.desc)}</p>
        <ul class="lines">${mods.map((m) => `<li><span>${esc(m)}</span></li>`).join("")}</ul>
        <p class="passive"><b>${tx("Passif.")}</b> ${esc(c.passiveText)}</p>
        ${spent ? `<p class="note">${txn(spent, "{n} point de talent réparti.|{n} points de talent répartis.")}</p>` : ""}
        <div class="row">${action}${duo}</div>
      </article>`;
    }).join("");
    const tier = attackTier(S), nextT = ATTACK_TIERS[tier + 1];
    const style = `<article class="panel tierbox"><h2>${tx("Style de combat")} <small>${tx("palier {0} / {1} · {2}", { 0: tier + 1, 1: ATTACK_TIERS.length, 2: esc(ATTACK_TIERS[tier].name) })}</small></h2>
      <div class="tiers">${ATTACK_TIERS.map((t, i) => `<span class="tierpip${i <= tier ? " on" : ""}" title="${esc(tx("{0} : niveau {1}{2}", { 0: esc(t.name), 1: t.lvl, 2: t.asc ? ` ${txn(t.asc, "et {n} ascension|et {n} ascensions")}` : "" }))}">${i + 1}</span>`).join("")}</div>
      <p class="note tight">${tx("Les attaques de ton héros deviennent plus grandes et plus spectaculaires à chaque palier (lame croisée, lueur, étincelles, triples projectiles, onde de choc).\n      {0}", { 0: nextT ? `${tx("Prochain palier :")} <b>${esc(nextT.name)}</b>${tx(", niveau {0}{1}.", { 0: nextT.lvl, 1: nextT.asc ? ` ${txn(nextT.asc, "et {n} ascension|et {n} ascensions")}` : "" })}` : tx("Palier maximal atteint !") })}</p></article>`;
    const P = S.partner && CLASSES[S.partner];
    const duoNote = `<p class="note tabintro">${P ? tx("Duo : {0} combat aux côtés de ton héros (35 % de son attaque par seconde et la moitié de son passif).", { 0: `<b>${esc(P.name)}</b>` })
      : tx("Duo : un héros à distance et un héros au corps à corps combattent ensemble. Choisis un compagnon de l’autre portée (le premier arrive tout de suite, les suivants à l’ascension).")}</p>`;
    el.innerHTML = `${style}${duoNote}<p class="note tabintro"><b>${freed} / ${CLASS_KEYS.length}</b> ${tx("héros libérés. On change de classe en faisant une")} <b>${tx("ascension")}</b>${fsp()}${tx(":\n      choisis ici la classe de ta prochaine aventure{0}. Les autres héros sont prisonniers d’un boss de zone.", { 0: S.nextCls ? ` ${tx("(actuellement :")} <b>${esc(CLASSES[S.nextCls].name)}</b>)` : "" })}</p>
      <div class="classgrid">${cards}</div>`;
  }

  onAction(a, b) {
    if (a === "c-pick") this.game.chooseNextClass(b.dataset.id);
    else if (a === "c-partner") this.game.choosePartner(b.dataset.id);
  }

  tick() {}
}
