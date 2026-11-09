// Simulation d'un joueur attentif sur plusieurs heures (équilibrage).
//   node --experimental-default-type=module scripts/simulate.js [heures] [classe]
import { Game } from "../src/renderer/game/game.js";
import { freshState } from "../src/renderer/game/state.js";
import { setRandom, seeded } from "../src/renderer/game/util.js";
import { TREES } from "../src/renderer/game/talents.js";
import { CLASS_KEYS_BY_UNLOCK, canPartner } from "../src/renderer/game/classes.js";
import { SKILL_TREE, canTakeSkill } from "../src/renderer/game/skilltree.js";
import { CONSTELLATIONS, constellationCost } from "../src/renderer/game/prestige.js";
import { CONSUMABLES, consumablePrice } from "../src/renderer/game/shop.js";
import { questDone } from "../src/renderer/game/quests.js";
import { forgeCost } from "../src/renderer/game/rules.js";
import { MAX_PLUS } from "../src/renderer/game/data.js";
import { fmt } from "../src/renderer/game/format.js";
import { nextUnlock, unlockAvailable } from "../src/renderer/game/unlocks.js";

const HOURS = +process.argv[2] || 12, CLS = process.argv[3] || "warrior";
setRandom(seeded(+process.env.SEED || 7)); // SEED=… pour une autre trajectoire
const g = new Game(freshState());
g.setClass(CLS);

// Ordre de préférence des secteurs de l'arbre de compétences (Force, Vitalité, Fortune...)
const SECTOR_PREF = ["force", "vitality", "fortune", "agility", "mastery", "arcane"];
function takeSkills() {
  for (;;) {
    const avail = Object.keys(SKILL_TREE.nodes).filter((id) => canTakeSkill(g.S, id));
    if (!avail.length) return;
    avail.sort((a, b) => {
      const na = SKILL_TREE.nodes[a], nb = SKILL_TREE.nodes[b];
      const w = (n) => (n.kind === "keystone" ? -5 : n.kind === "notable" ? -2 : 0) + SECTOR_PREF.indexOf(n.sector);
      return w(na) - w(nb);
    });
    if (!g.takeSkill(avail[0])) return;
  }
}

let lastBest = 1, lastBestT = 0, minute = 0, runStart = 0;
const runs = [];
const rows = [], unlockLog = [];
function playerTurn() {
  // Déblocages : le joueur achète le suivant dès qu’il a trois fois son prix.
  for (let u = nextUnlock(g.S); u && g.S.gold >= u.price * 3 && unlockAvailable(g.S, u); u = nextUnlock(g.S)) if (g.buyUnlock(u.id)) unlockLog.push(`${u.id} à ${Math.round(g.S.stats.playTime / 60 || 0)} min (zone ${g.S.zone})`);
  g.autoEquip();
  g.sellUseless();
  // Forge à la main (comme un joueur, dès l'Enclume) toutes les 10 min : sans cela, le Maître de forge faisait un bond
  // artificiel (record 89 → 137 juste après son achat, it. 202). Garde une réserve de 4× le coût.
  if (minute % 10 === 0) for (const it of Object.values(g.S.equip)) {
    for (let n = 0; it && n < 40 && it.plus < MAX_PLUS && g.S.gold > forgeCost(it) * 4; n++) if (!g.forge(it)) break;
  }
  for (const b of TREES[g.S.cls]) for (const t of b.talents) g.learnTalent(t.id, 99);
  // Duo (demande 17) : le joueur prend comme compagnon le premier héros libéré de l'autre portée.
  if (!g.S.partner && g.choosePartner) for (const c of CLASS_KEYS_BY_UNLOCK()) if (canPartner(g.S, g.S.cls, c)) { g.choosePartner(c); break; }
  takeSkills();
  for (const q of [...g.S.quests.slots]) if (questDone(q)) g.claimQuest(q.uid);
  while (g.S.pets.eggs > 0 && g.hatchEgg()); // (sans Ménagerie, rien n’éclot)
  // Potions et élixir de force si on a de quoi
  const potion = CONSUMABLES.find((c) => c.id === "potion");
  while (g.S.potions < 10 && g.S.gold > consumablePrice(potion, g.S) * 20) g.buyConsumable("potion");
  // Ascension quand on stagne depuis 25 min et que ça rapporte
  if (g.S.best > lastBest) { lastBest = g.S.best; lastBestT = minute; }
  if (g.canAscend() && minute - lastBestT > 25) {
    runs.push({ run: g.S.prestige.count + 1, best: g.S.best, minutes: minute - runStart, shards: g.ascendShards(), speed: g.S.speed });
    runStart = minute;
    g.ascend(); lastBest = g.S.best; lastBestT = minute;
    for (;;) {
      const affordable = CONSTELLATIONS.filter((c) => (g.S.prestige.ranks[c.id] || 0) < c.max && constellationCost(c, g.S.prestige.ranks[c.id] || 0) <= g.S.prestige.shards);
      if (!affordable.length) break;
      affordable.sort((a, b) => constellationCost(a, g.S.prestige.ranks[a.id] || 0) - constellationCost(b, g.S.prestige.ranks[b.id] || 0));
      g.buyConstellation(affordable[0].id);
    }
  }
}

const t0 = Date.now();
for (let h = 1; h <= HOURS; h++) {
  for (let m = 0; m < 60; m++) { g.advance(60); minute++; playerTurn(); }
  const S = g.S;
  rows.push({ h, lvl: S.lvl, zone: S.zone, best: S.best, asc: S.prestige.count, shards: S.prestige.total, speed: S.speed,
    deaths: S.stats.deaths, gold: fmt(S.gold), skills: S.skills.order.length, pets: Object.keys(S.pets.owned).length, quests: S.quests.completed,
    leg: S.stats.legendaries, bestiary: Object.keys(S.bestiary).length });
}
console.log(`Classe : ${CLS} · ${HOURS} h simulées en ${((Date.now() - t0) / 1000).toFixed(1)} s`);
console.table(rows);
console.log("Courses (une ascension à la fin de chacune) :");
console.table(runs);
console.log("Déblocages :\n  " + unlockLog.join("\n  "));
