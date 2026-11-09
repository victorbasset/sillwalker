// Onglet Statistiques : records, compteurs de l'aventure et succès.
import { t as tx, lc } from "../../i18n/index.js";
import { shopIconURL } from "../../render/shopart.js";
import { ACHIEVEMENTS, reachedAchievements, ACH_PROGRESS } from "../../game/achievements.js";
import { CLASSES } from "../../game/classes.js";
import { codexCounts } from "../../game/codex.js";
import { EVENTS, FEATHER, STAR, CHEST } from "../../game/events.js";
import { GOBLIN, ELITE, CHAMPION } from "../../game/data.js";
import { EGG_CHANCE } from "../../game/pets.js";

import { fmt, esc, dec, unit } from "../../game/format.js";
const pct = (p) => dec(p * 100 >= 1 ? String(Math.round(p * 1000) / 10) : String(Math.round(p * 10000) / 100)) + unit("%");

const dur = (s) => {
  s = Math.floor(s || 0);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  return (d ? tx("{0} j", { 0: d }) + " " : "") + (d || h ? h + " h " : "") + m + " min";
};

export class StatsTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  render(el) {
    const S = this.game.S, st = S.stats, P = S.prestige;
    const line = (label, value) => `<li><span>${esc(label)}</span><b>${value}</b></li>`;
    const reached = new Set(reachedAchievements(S));
    const ach = ACHIEVEMENTS.map((a) => {
      const on = reached.has(a.id), pr = !on && ACH_PROGRESS[a.id] ? ACH_PROGRESS[a.id](S) : null; // progression des succès chiffrés
      return `<li class="ach${on ? " on" : ""}"><span class="aico">${on ? "★" : "☆"}</span>${esc(a.name)}${pr ? ` <small class="achp">(${fmt(Math.min(pr[0], pr[1]))} / ${fmt(pr[1])})</small>` : ""}</li>`;
    }).join("");
    el.innerHTML = `<div class="statgrid">
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("trophy", 3)}" alt="">${tx("Records")}</span></h2><ul class="lines">
        ${line(tx("Plus gros coup"), fmt(st.maxHit || 0))}
        ${line(tx("Meilleure zone (toutes courses)"), Math.max(S.best, P.bestRun || 0))}
        ${line(tx("Boss le plus lointain vaincu"), st.biggestBoss ? tx("zone {0}", { 0: st.biggestBoss }) : "—")}
        ${line(tx("Vitesse permanente"), "+" + (S.speed || 0) + unit("%"))}
        ${line(tx("Ascensions"), P.count)}
      </ul></article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("map", 3)}" alt="">${tx("Aventure")}</span></h2><ul class="lines">
        ${line(tx("Temps de jeu"), dur(st.playTime))}
        ${line(tx("Temps hors ligne compté"), dur(st.offlineTime))}
        ${line(tx("Monstres vaincus"), fmt(st.kills))}
        ${line(tx("Boss vaincus"), fmt(st.bosses))}
        ${line(tx("Élites vaincus"), fmt(st.elites || 0))}
        ${line(tx("Champions vaincus"), fmt(st.champions || 0))}
        ${line(tx("Gobelins dorés attrapés"), fmt(st.goblins || 0))}
        ${line("K.O.", fmt(st.deaths))}
        ${line(tx("Coups au clic"), fmt(st.taps || 0))}
      </ul></article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("ws_gold", 3)}" alt="">${tx("Richesse et butin")}</span></h2><ul class="lines">
        ${line(tx("Or gagné au total"), fmt(st.goldTotal || 0))}
        ${line(tx("Objets trouvés"), fmt(st.items || 0))}
        ${line(tx("Légendaires trouvés"), fmt(st.legendaries || 0))}
        ${line(tx("Achats en boutique"), fmt(st.purchases || 0))}
        ${line(tx("Potions bues"), fmt(st.potionsUsed || 0))}
        ${line(tx("Quêtes accomplies"), fmt(S.quests.completed || 0))}
        ${line(tx("Collection d’objets"), `${codexCounts(S).found} / ${codexCounts(S).total}`)}
      </ul></article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("star", 3)}" alt="">${tx("Moments rares")}</span></h2><ul class="lines">
        ${line(tx("Plumes du vent"), fmt(st.feathers || 0))}
        ${line(tx("Étoiles filantes attrapées"), fmt(st.stars || 0))}
        ${line(tx("Événements rares ({0})", { 0: Object.values(EVENTS).map((e) => lc(e.name)).join(", ") }), fmt(st.events || 0))}
        ${line(tx("Coffres au trésor"), fmt(st.chests || 0))}
        ${line(tx("Expéditions de familiers"), fmt(st.expeditions || 0))}
        ${line(tx("Héros libérés"), (S.classesUnlocked || ["warrior"]).length + " / " + Object.keys(CLASSES).length)}
      </ul></article>
      <article class="panel wide"><h2><span class="hicon"><img src="${shopIconURL("luck", 3)}" alt="">${tx("Probabilités")}</span></h2><ul class="lines">
        ${line(tx("Plume du vent (+1 % de vitesse)"), `${pct(FEATHER.normal)} ${tx("· élite {0} · boss {1}", { 0: pct(FEATHER.elite), 1: pct(FEATHER.boss) })}`)}
        ${line(tx("Étoile filante (+2 % de vitesse)"), `${tx("toutes les {0}–{1} min", { 0: STAR.minS / 60, 1: STAR.maxS / 60 })}`)}
        ${line(tx("Coffre au trésor"), `${pct(CHEST.normal)} ${tx("· élite {0} · boss {1}", { 0: pct(CHEST.elite), 1: pct(CHEST.boss) })}`)}
        ${Object.values(EVENTS).map((e) => line(e.name, pct(e.chance) + tx(" par victoire"))).join("")}
        ${line(tx("Gobelin doré"), pct(GOBLIN.chance) + tx(" par monstre"))}
        ${line(tx("Élite"), pct(ELITE.chance) + tx(" par monstre"))}
        ${line(tx("Champion (butin épique, dès la zone {0})", { 0: CHAMPION.minZone }), pct(CHAMPION.chance) + tx(" par monstre"))}
        ${line(tx("Œuf"), `${tx("boss {0} · élite {1}", { 0: pct(EGG_CHANCE.boss), 1: pct(EGG_CHANCE.elite) })}`)}
      </ul></article>
      <article class="panel achievements"><h2><span class="hicon"><img src="${shopIconURL("trophy", 3)}" alt="">${tx("Succès")}</span> <small>${reached.size} / ${ACHIEVEMENTS.length}</small></h2><ul class="achlist">${ach}</ul></article>
    </div>`;
  }

  onAction() {}
  tick() { return false; }
}
