// Onglet Statistiques : records, compteurs de l'aventure et succès.
import { ACHIEVEMENTS, reachedAchievements } from "../../game/achievements.js";
import { CLASSES } from "../../game/classes.js";
import { codexCounts } from "../../game/codex.js";
import { fmt, esc } from "../../game/format.js";

const dur = (s) => {
  s = Math.floor(s || 0);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  return (d ? d + " j " : "") + (d || h ? h + " h " : "") + m + " min";
};

export class StatsTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  render(el) {
    const S = this.game.S, st = S.stats, P = S.prestige;
    const line = (label, value) => `<li><span>${esc(label)}</span><b>${value}</b></li>`;
    const reached = new Set(reachedAchievements(S));
    const ach = ACHIEVEMENTS.map((a) => `<li class="ach${reached.has(a.id) ? " on" : ""}"><span class="aico">${reached.has(a.id) ? "★" : "☆"}</span>${esc(a.name)}</li>`).join("");
    el.innerHTML = `<div class="statgrid">
      <article class="panel"><h2>Records</h2><ul class="lines">
        ${line("Plus gros coup", fmt(st.maxHit || 0))}
        ${line("Meilleure zone (toutes courses)", Math.max(S.best, P.bestRun || 0))}
        ${line("Boss le plus lointain vaincu", st.biggestBoss ? "zone " + st.biggestBoss : "—")}
        ${line("Vitesse permanente", "+" + (S.speed || 0) + " %")}
        ${line("Ascensions", P.count)}
      </ul></article>
      <article class="panel"><h2>Aventure</h2><ul class="lines">
        ${line("Temps de jeu", dur(st.playTime))}
        ${line("Temps hors ligne compté", dur(st.offlineTime))}
        ${line("Monstres vaincus", fmt(st.kills))}
        ${line("Boss vaincus", fmt(st.bosses))}
        ${line("Élites vaincus", fmt(st.elites || 0))}
        ${line("Gobelins dorés attrapés", fmt(st.goblins || 0))}
        ${line("K.O.", fmt(st.deaths))}
      </ul></article>
      <article class="panel"><h2>Richesse et butin</h2><ul class="lines">
        ${line("Or gagné au total", fmt(st.goldTotal || 0))}
        ${line("Objets trouvés", fmt(st.items || 0))}
        ${line("Légendaires trouvés", fmt(st.legendaries || 0))}
        ${line("Achats en boutique", fmt(st.purchases || 0))}
        ${line("Potions bues", fmt(st.potionsUsed || 0))}
        ${line("Quêtes accomplies", fmt(S.quests.completed || 0))}
        ${line("Collection d’objets", `${codexCounts(S).found} / ${codexCounts(S).total}`)}
      </ul></article>
      <article class="panel"><h2>Moments rares</h2><ul class="lines">
        ${line("Plumes du vent", fmt(st.feathers || 0))}
        ${line("Étoiles filantes attrapées", fmt(st.stars || 0))}
        ${line("Événements (rafale, pluie d’or, frénésie)", fmt(st.events || 0))}
        ${line("Coffres au trésor", fmt(st.chests || 0))}
        ${line("Expéditions de familiers", fmt(st.expeditions || 0))}
        ${line("Classes jouées", (st.classes || []).length + " / " + Object.keys(CLASSES).length)}
      </ul></article>
      <article class="panel achievements"><h2>Succès <small>${reached.size} / ${ACHIEVEMENTS.length}</small></h2><ul class="achlist">${ach}</ul></article>
    </div>`;
  }

  onAction() {}
  tick() { return false; }
}
