// Onglet Classe : les héros libérés et ceux encore prisonniers. On change de
// classe en faisant une ascension : on choisit ici la classe de la prochaine.
import { describeEffects } from "../../game/talents.js";
import { subtabsHTML } from "../subtabs.js";
import { t as tx, txn, fsp, tr } from "../../i18n/index.js";
import { CLASSES, CLASS_KEYS, CLASS_KEYS_BY_UNLOCK, CLASS_UNLOCK_ZONE, isClassUnlocked, ATTACK_TIERS, attackTier, canPartner, DUO_SYNERGIES } from "../../game/classes.js";
import { talentPointsSpent } from "../../game/talents.js";
import { zoneName } from "../../game/rules.js";
import { esc, unit, fmt, dec } from "../../game/format.js";
import { SPELL_MAX, classSpells, spellPrice, spellRank, spellValue, spellCd } from "../../game/spells.js";
import { recordZone, hasUnlock } from "../../game/unlocks.js";
import { lockLink } from "../locks.js";
import { spellIconURL } from "../../render/shopart.js";
import { classPortraitURL } from "../../render/sprites.js";

const pct = (m) => (m === 1 ? "" : `${m > 1 ? "+" : "−"}${Math.round(Math.abs(m - 1) * 100)}${unit("%")}`);

export class ClassesTab {
  constructor(game) { this.game = game; this.sec = "freed"; } // sous-onglet : héros libérés ou prisonniers (demande 18)

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
      const action = cur && chosen ? `<button disabled>${tx("Héros actuel")}</button>`
        : chosen ? `<button disabled class="primary">${tx("Choisi pour l’ascension ✓")}</button>`
        : cur ? `<button data-action="c-pick" data-id="${k}">${tx("Garder ce héros")}</button>`
        : `<button data-action="c-pick" data-id="${k}" title="${esc(tx("Choisir pour la prochaine ascension"))}">${tx("Jouer à l’ascension")}</button>`;
      // Duo (demande 17) : ce héros peut-il accompagner le héros principal (actuel ou prévu) ? Autre portée seulement.
      const isPartner = S.partner === k, nextPartner = S.nextPartner === k;
      const duo = isPartner ? `<button disabled>${tx("Compagnon actuel")}</button>`
        : nextPartner ? `<button disabled class="primary">${tx("Compagnon à l’ascension ✓")}</button>`
        : canPartner(S, next, k) ? `<button data-action="c-partner" data-id="${k}" title="${esc(S.partner ? tx("Compagnon pour la prochaine ascension") : tx("Prendre comme compagnon"))}">${S.partner ? tx("Duo à l’ascension") : tx("Prendre en duo")}</button>` : "";
      // Carte compacte (demande 18) : description d'ambiance en infobulle, modificateurs sur une ligne.
      return `<article class="panel classcard${cur ? " current" : ""}${chosen && !cur ? " chosen" : ""}${isPartner ? " partner" : ""}" title="${esc(c.desc)}"${cur ? " data-hs-start" : ""}>
        <div class="detail-head"><img src="${classPortraitURL(k)}" alt=""><div>
          <div class="nm">${esc(c.name)}${cur ? ` <small>${tx("(actuel)")}</small>` : ""}${isPartner ? ` <small>${tx("(compagnon)")}</small>` : ""}</div><div class="sub">${esc(c.role)}</div></div></div>
        <p class="mods">${mods.map((m) => esc(m)).join(" · ")}</p>
        <p class="passive"><b>${tx("Passif.")}</b> ${esc(c.passiveText)}</p>
        ${(() => { // duo idéal (synergie, classes.js) : surligné quand ce duo est formé
          const d = DUO_SYNERGIES.find((x) => x.a === k || x.b === k); if (!d) return "";
          const mate = d.a === k ? d.b : d.a, on = (S.cls === k && S.partner === mate) || (S.partner === k && S.cls === mate);
          // Carte du héros (actuel ou choisi) : un clic prend directement le partenaire idéal comme compagnon.
          const pickable = k === next && !on && S.partner !== mate && S.nextPartner !== mate && canPartner(S, next, mate);
          const body = `✦ ${tx("Duo idéal : {0}", { 0: esc(CLASSES[mate].name) })} · <b>${esc(tx(d.name))}</b> (${esc(describeEffects(d.eff))})`;
          return pickable
            ? `<button class="synergy linkbtn" data-action="c-partner" data-id="${mate}" title="${esc(tx("Prendre comme compagnon"))}">${body}</button>`
            : `<p class="synergy${on || S.nextPartner === mate && k === next ? " on" : ""}" title="${esc(describeEffects(d.eff))}">${body}</p>`; })()}
        ${spent ? `<p class="note">${txn(spent, "{n} point de talent réparti.|{n} points de talent répartis.")}</p>` : ""}
        <div class="row">${action}${duo}</div>
      </article>`;
    }).join("");
    const tier = attackTier(S), nextT = ATTACK_TIERS[tier + 1];
    const style = `<article class="panel tierbox"><h2>${tx("Style de l’attaque de base")} <small>${tx("palier {0} / {1} · {2}", { 0: tier + 1, 1: ATTACK_TIERS.length, 2: esc(ATTACK_TIERS[tier].name) })}</small></h2>
      <div class="tiers">${ATTACK_TIERS.map((t, i) => `<span class="tierpip${i <= tier ? " on" : ""}" title="${esc(tx("{0} : niveau {1}{2}", { 0: esc(t.name), 1: t.lvl, 2: t.asc ? ` ${txn(t.asc, "et {n} ascension|et {n} ascensions")}` : "" }))}">${i + 1}</span>`).join("")}</div>
      <p class="note tight">${tx("Les attaques de ton héros deviennent plus grandes et plus spectaculaires à chaque palier (lame croisée, lueur, étincelles, triples projectiles, onde de choc).\n      {0}", { 0: nextT ? `${tx("Prochain palier :")} <b>${esc(nextT.name)}</b>${tx(", niveau {0}{1}.", { 0: nextT.lvl, 1: nextT.asc ? ` ${txn(nextT.asc, "et {n} ascension|et {n} ascensions")}` : "" })}` : tx("Palier maximal atteint !") })}</p></article>`;
    const P = S.partner && CLASSES[S.partner];
    const duoNote = `<p class="note tabintro">${P ? tx("Duo : {0} combat aux côtés de ton héros (35 % de son attaque par seconde et la moitié de son passif).", { 0: `<b>${esc(P.name)}</b>` })
      : tx("Duo : un héros à distance et un héros au corps à corps combattent ensemble. Choisis un compagnon de l’autre portée (le premier arrive tout de suite, les suivants à l’ascension).")}</p>`;
    // Sorts et attaque (ancien « Style de combat ») : son propre sous-onglet (demande 18) ; les autres montrent les cartes des héros.
    el.innerHTML = `${duoNote}<p class="note tabintro"><b>${freed} / ${CLASS_KEYS.length}</b> ${tx("héros libérés. On change de héros en faisant une")} <b>${tx("ascension")}</b>${fsp()}${tx(":\n      choisis ici le héros de ta prochaine aventure{0}. Les autres héros sont prisonniers d’un boss de zone.", { 0: S.nextCls ? ` ${tx("(actuellement :")} <b>${esc(CLASSES[S.nextCls].name)}</b>)` : "" })}</p>
      ${subtabsHTML([["freed", tx("Libérés"), freed], ["locked", tx("Prisonniers"), CLASS_KEYS.length - freed], ["style", tx("Sorts et attaque"), `${classSpells(S.cls).filter((x) => spellRank(S, x.id) > 0).length} / ${classSpells(S.cls).length}`]], this.sec, "c-sec")}
      ${this.sec === "style" ? this.spellsHTML(S) + style : `<div class="classgrid hscroll sec-${this.sec}" data-hs="heroes-${this.sec}">${cards}</div>`}`;
  }

  /** Sorts (demande D) : appris pour tous les héros, ils s'ajoutent à l'attaque de base en combat. */
  spellsHTML(S) {
    const rec = recordZone(S);
    const cards = classSpells(S.cls).map((sp) => {
      const r = spellRank(S, sp.id), open = rec >= sp.zone, price = spellPrice(sp, r), v = spellValue(sp, Math.max(1, r));
      // Effet affiché à un rang donné (le rang actuel sur la carte, le suivant dans l'infobulle du bouton).
      const effAt = (rank) => { const w = spellValue(sp, Math.max(1, rank)); return sp.kind === "dmg" ? (sp.hits > 1 ? txn(sp.hits, "{n} coup de {0} % de l’attaque|{n} coups de {0} % de l’attaque", { 0: Math.round(w * 100) }) : tx("{0} % de l’attaque", { 0: Math.round(w * 100) }))
        : sp.kind === "heal" ? tx("soigne {0} % des PV", { 0: Math.round(w) }) : tx("bouclier de {0} % des PV", { 0: Math.round(w) }); };
      const eff = sp.kind === "dmg" ? (sp.hits > 1 ? txn(sp.hits, "{n} coup de {0} % de l’attaque|{n} coups de {0} % de l’attaque", { 0: Math.round(v * 100) }) : tx("{0} % de l’attaque", { 0: Math.round(v * 100) }))
        : sp.kind === "heal" ? tx("soigne {0} % des PV", { 0: Math.round(v) }) : tx("bouclier de {0} % des PV", { 0: Math.round(v) });
      const btn = !open ? `<span class="note">${tx("zone {0} requise", { 0: sp.zone })}</span>`
        : r >= SPELL_MAX ? `<span class="note">${tx("rang maximal")}</span>`
        : `<button data-action="c-spell" data-id="${sp.id}" class="${r ? "quiet" : "primary"}"${S.gold < price ? " disabled" : ""} title="${esc(tx("Rang {0} : {1}", { 0: r + 1, 1: effAt(r + 1) }) + (spellCd(sp, r + 1) < spellCd(sp, Math.max(1, r)) ? " · " + tx("recharge : {0} s", { 0: dec(String(spellCd(sp, r + 1))) }) : ""))}">${r ? tx("Améliorer ({0} or)", { 0: fmt(price) }) : tx("Apprendre ({0} or)", { 0: fmt(price) })}</button>`
          // « max » (Manuel du stratège, comme les talents) : autant de rangs que l'or le permet, dès que deux sont abordables.
          + (hasUnlock(S, "bulkPoints") && r + 1 < SPELL_MAX && S.gold >= price * 3.5 ? ` <button data-action="c-spellmax" data-id="${sp.id}" class="quiet" title="${esc(tx("Acheter autant de niveaux que possible"))}">${tx("max")}</button>` : "");
      return `<div class="spellcard${r ? " on" : ""}${open ? "" : " locked"}" style="--c:${sp.color}"><img class="spellico" src="${spellIconURL(sp.tpl, sp.color, 3)}" alt=""><b class="tint">${esc(tr(sp.name))}</b> <small>${r ? tx("rang {0} / {1}", { 0: r, 1: SPELL_MAX }) : ""}</small>
        <p class="note tight">${tx("Toutes les {0} s : {1}", { 0: dec(String(spellCd(sp, Math.max(1, r)))), 1: eff })}${sp.pierce ? ` · <b class="tint">${tx("transperce : {0} % sur l’ennemi suivant", { 0: Math.round(sp.pierce * 100) })}</b>` : ""}</p>${btn}</div>`;
    }).join("");
    // Grimoire des sorts (case ou lien vers le déblocage) dans le titre : une ligne de moins (sinon l'onglet défilait).
    const book = hasUnlock(S, "spellBook") ? `<label class="toggle" title="${esc(tx("Grimoire des sorts : améliorer tout seul le sort le moins cher"))}"><input type="checkbox" data-action="c-autospells"${S.settings.autoSpells !== false ? " checked" : ""}> ${tx("Grimoire des sorts")}</label>` : lockLink(S, "spellBook");
    return `<article class="panel spellbox"><h2>${tx("Sorts de {0}", { 0: esc(CLASSES[S.cls] ? CLASSES[S.cls].name : "") })} <small class="spellbook">${book}</small></h2>
      <p class="note tight">${tx("Ils se lancent tout seuls en combat dès qu’ils sont rechargés, en plus de l’attaque de base.")} ${tx("Propres à chaque héros, gardés à l’ascension.")}</p>
      <div class="spellgrid">${cards}</div></article>`;
  }

  onAction(a, b) {
    if (a === "c-autospells") { this.game.S.settings.autoSpells = b.checked; if (b.checked) this.game.autoSpells({ force: true }); this.game.changed(); return; }
    if (a === "c-spell") { this.game.learnSpell(b.dataset.id); return; }
    if (a === "c-spellmax") { this.game.learnSpellMax(b.dataset.id); return; }
    if (a === "c-sec") this.sec = b.dataset.to;
    else if (a === "c-pick") this.game.chooseNextClass(b.dataset.id);
    else if (a === "c-partner") this.game.choosePartner(b.dataset.id);
  }

  tick() {}
}
