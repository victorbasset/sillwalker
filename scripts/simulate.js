// Simulation d'un joueur attentif sur plusieurs heures (équilibrage).
//   node --experimental-default-type=module scripts/simulate.js [heures] [classe]
import { useVirtualClock, realNow } from "./virtual-clock.mjs"; // (it. 1009) en premier : Date.now() virtuel
import { Game } from "../src/renderer/game/game.js";
import { freshState } from "../src/renderer/game/state.js";
import { setRandom, seeded } from "../src/renderer/game/util.js";
import { TREES, VOIES, chosenVoie } from "../src/renderer/game/talents.js";
import { CLASS_KEYS_BY_UNLOCK, canPartner, DUO_SYNERGIES } from "../src/renderer/game/classes.js";
import { SKILL_TREE, canTakeSkill } from "../src/renderer/game/skilltree.js";
import { CONSTELLATIONS, constellationCost } from "../src/renderer/game/prestige.js";
import { CONSUMABLES, consumablePrice, WORKSHOP, workshopPrice } from "../src/renderer/game/shop.js";
import { SPELL_MAX, classSpells, spellPrice, spellRank } from "../src/renderer/game/spells.js";
import { questDone } from "../src/renderer/game/quests.js";
import { forgeCost } from "../src/renderer/game/rules.js";
import { MAX_PLUS } from "../src/renderer/game/data.js";
import { fmt } from "../src/renderer/game/format.js";
import { nextUnlock, unlockAvailable, recordZone } from "../src/renderer/game/unlocks.js";

const HOURS = +process.argv[2] || 12, CLS = process.argv[3] || "warrior";
setRandom(seeded(+process.env.SEED || 7)); // SEED=… pour une autre trajectoire
const g = useVirtualClock(new Game(freshState()));
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
  // IDLE=1 : joueur totalement absent (vérifie que le jeu progresse sans aucune action, « vraiment idle »).
  if (process.env.IDLE) { if (g.S.best > lastBest) { lastBest = g.S.best; lastBestT = minute; } return; }
  // Déblocages : le joueur achète le suivant dès qu’il a trois fois son prix.
  for (let u = nextUnlock(g.S); u && g.S.gold >= u.price * 3 && unlockAvailable(g.S, u); u = nextUnlock(g.S)) if (g.buyUnlock(u.id)) unlockLog.push(`${u.id} à ${Math.round(g.S.stats.playTime / 60 || 0)} min (zone ${g.S.zone})`);
  // Atelier (comme un joueur prudent) : le niveau le moins cher tant qu'il coûte moins de 10 % de l'or, après les
  // déblocages (sans cela la simulation ignorait l'Atelier : records sous-estimés).
  for (let k = 0; k < 20; k++) {
    const ws = WORKSHOP.filter((w) => !(w.max && ((g.S.workshop || {})[w.id] || 0) >= w.max)).sort((a, b) => workshopPrice(a, g.S) - workshopPrice(b, g.S))[0];
    if (!ws || workshopPrice(ws, g.S) > g.S.gold * 0.1 || !g.buyWorkshop(ws.id)) break;
  }
  // Sorts (it. 469) : même prudence que l'Atelier (le rang le moins cher sous 10 % de l'or).
  for (let k = 0; k < 10; k++) {
    const sp = classSpells(g.S.cls).filter((x) => recordZone(g.S) >= x.zone && spellRank(g.S, x.id) < SPELL_MAX).sort((a, b) => spellPrice(a, spellRank(g.S, a.id)) - spellPrice(b, spellRank(g.S, b.id)))[0];
    if (!sp || spellPrice(sp, spellRank(g.S, sp.id)) > g.S.gold * 0.1 || !g.learnSpell(sp.id)) break;
  }
  // PARTNER_SPELLS=1 (it. 514) : le compagnon a les mêmes rangs de sorts que le héros (pire cas : un joueur qui a déjà
  // monté les sorts de cet autre héros) ; mesure l'effet des sorts du compagnon (PARTNER_SPELL, spells.js).
  if (process.env.PARTNER_SPELLS && g.S.partner) classSpells(g.S.partner).forEach((sp, i) => { const own = classSpells(g.S.cls)[i]; if (own) g.S.spells[sp.id] = spellRank(g.S, own.id); });
  // (it. 1010) expéditions, comme un joueur attentif (passe toutes les 10 min) : récupère celles revenues et renvoie
  // les familiers libres en « Voyage » (2 h). Sans cela, aucune expédition avant le Grand intendant (zone 170).
  if (minute % 10 === 0) { for (const id of g.expeditionsReady()) g.claimExpedition(id); for (const id of g.idlePets()) g.sendExpedition(id, "long"); }
  // (it. 1004) panoplie jamais complétée dont le sac couvre les 4 emplacements : le joueur clique la tâche (bonus de
  // collection permanent), puis « Équiper le meilleur » remet le plus fort
  { const f = g.setFinisher(); if (f && !(g.S.setsDone || {})[f.set]) g.finishSet(); }
  g.autoEquip();
  g.sellUseless();
  // Forge à la main (comme un joueur, dès l'Enclume) toutes les 10 min : sans cela, le Maître de forge faisait un bond
  // artificiel (record 89 → 137 juste après son achat, it. 202). Garde une réserve de 4× le coût.
  if (minute % 10 === 0) for (const it of Object.values(g.S.equip)) {
    for (let n = 0; it && n < 40 && it.plus < MAX_PLUS && g.S.gold > forgeCost(it) * 4; n++) if (!g.forge(it)) break;
  }
  // Voie (it. 448) : un joueur la prend dès qu'elle est permise (30 points dépensés). VOIE=0|1 choisit laquelle
  // (0 par défaut) ; VOIE=none : jamais (ancien comportement, pour comparer).
  const voieIx = process.env.VOIE === "none" ? -1 : +(process.env.VOIE || 0);
  if (voieIx >= 0 && VOIES[g.S.cls] && !chosenVoie(g.S)) g.learnTalent(VOIES[g.S.cls][voieIx].id, 1);
  for (const b of TREES[g.S.cls]) for (const t of b.talents) g.learnTalent(t.id, 99);
  // (it. 1017) points restants dans les Maîtrises (rangs illimités), comme un joueur attentif (répartition du jeu,
  // autoSpendTalents) ; sans cela, la partie de fin de partie gardait 128 points de talent dormants
  g.autoSpendTalents();
  // Duo (demande 17) : le joueur prend comme compagnon le premier héros libéré de l'autre portée.
  // Compagnon : le duo idéal (synergie) s'il est libre, sinon le premier héros possible (comme un vrai joueur).
  if (!g.S.partner && g.choosePartner) {
    const syn = DUO_SYNERGIES.find((d) => d.a === g.S.cls || d.b === g.S.cls), mate = syn && (syn.a === g.S.cls ? syn.b : syn.a);
    if (mate && canPartner(g.S, g.S.cls, mate)) g.choosePartner(mate);
    else for (const c of CLASS_KEYS_BY_UNLOCK()) if (canPartner(g.S, g.S.cls, c)) { g.choosePartner(c); break; }
  }
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

const t0 = realNow();
for (let h = 1; h <= HOURS; h++) {
  for (let m = 0; m < 60; m++) { g.advance(60); minute++; playerTurn(); }
  const S = g.S;
  rows.push({ h, lvl: S.lvl, zone: S.zone, best: S.best, asc: S.prestige.count, shards: S.prestige.total, speed: S.speed,
    deaths: S.stats.deaths, gold: fmt(S.gold), skills: S.skills.order.length, pets: Object.keys(S.pets.owned).length, quests: S.quests.completed,
    leg: S.stats.legendaries, bestiary: Object.keys(S.bestiary).length });
}
console.log(`Classe : ${CLS} · ${HOURS} h simulées en ${((realNow() - t0) / 1000).toFixed(1)} s`);
console.table(rows);
console.log("Courses (une ascension à la fin de chacune) :");
console.table(runs);
console.log("Déblocages :\n  " + unlockLog.join("\n  "));
console.log(`Panoplies complétées (it. 1004) : ${Object.keys(g.S.setsDone || {}).length} / 10`);
// (it. 768) DUMP=fichier : état final écrit comme une sauvegarde (partie très avancée pour mesurer l'interface)
// (it. 1069) introduction marquée vue, comme chez tout vrai joueur : sinon chaque lancement de cette sauvegarde rejouait la
// cinématique d'introduction (captures, mesures) et « Quoi de neuf » ne pouvait pas s'y afficher (newsDue l'attend)
if (process.env.DUMP) { g.S.story = { ...(g.S.story || {}), intro: true }; (await import("node:fs")).writeFileSync(process.env.DUMP, JSON.stringify(g.S)); }
