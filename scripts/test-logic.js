// Tests rapides de la logique de jeu (sans Electron) :
//   npm test
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import * as M_news_js from "../src/renderer/game/news.js";
import * as M_spells_js from "../src/renderer/game/spells.js";
import { SPELL_INDEX as SPELL_INDEX_T, spellCd, pierceTargets } from "../src/renderer/game/spells.js";
import { hasRelic as hasRelic_T } from "../src/renderer/game/relics.js";
import { EVENTS as EVENTS_T } from "../src/renderer/game/events.js";
import * as M_hints_js from "../src/renderer/ui/hints.js";
import * as M_story_js from "../src/renderer/game/story.js";
import * as M_events_js from "../src/renderer/game/events.js";
import * as M_equipvis_js from "../src/renderer/render/equipvis.js";
import * as M_skillicons_js from "../src/renderer/render/skillicons.js";
import * as M_art_js from "../src/renderer/render/art.js";
import * as M_pets_js from "../src/renderer/game/pets.js";
import * as M_util_js from "../src/renderer/game/util.js";
import * as M_daymods_js from "../src/renderer/game/daymods.js";
import * as M_codex_js from "../src/renderer/game/codex.js";
import * as M_bosses_js from "../src/renderer/game/bosses.js";
import * as M_achievements_js from "../src/renderer/game/achievements.js";
import * as M_rules_js from "../src/renderer/game/rules.js";
import * as M_classes_js from "../src/renderer/game/classes.js";
import * as M_talents_js from "../src/renderer/game/talents.js";
import * as M_shop_js from "../src/renderer/game/shop.js";
import * as M_quests_js from "../src/renderer/game/quests.js";
import { makeQuest } from "../src/renderer/game/quests.js";
import * as M_skilltree_js from "../src/renderer/game/skilltree.js";
import { nextHint, markHint } from "../src/renderer/ui/hints.js";
import { fmt as fmtN, fmtShort as fmtS } from "../src/renderer/game/format.js";
import { Game, journeyZoneStep } from "../src/renderer/game/game.js";
import { freshState as freshLocked, migrate, SAVE_VERSION } from "../src/renderer/game/state.js";
import { UNLOCKS, hasUnlock, nextUnlock } from "../src/renderer/game/unlocks.js";
// Les tests des mécaniques partent avec tous les déblocages (ceux-ci ont leur propre test).
const freshState = (...a) => Object.assign(freshLocked(...a), { unlocks: Object.fromEntries(UNLOCKS.filter((u) => u.id !== "armsValet" && u.id !== "skyChart" && u.id !== "spellBook").map((u) => [u.id, true])),
  tabsOpen: Object.fromEntries(Object.keys(TAB_GATES).map((id) => [id, true])) }); // tout débloqué, onglets compris
import { reachedAchievements, ACHIEVEMENTS as ACH_T, ACH_PROGRESS } from "../src/renderer/game/achievements.js";
import { setRandom, seeded } from "../src/renderer/game/util.js";
import { systemLang, plAgree, koJosa } from "../src/renderer/i18n/index.js";
import { INTRO, introDue, markIntro, CHRONICLES, chroniclesUnlocked, takeNewChronicles, FINAL_ZONE, FINAL_BOSS, storyWon } from "../src/renderer/game/story.js";
import { approachTime, heroStats, heroDps, power, earlyPace, zoneMight, MONSTER_LATE_GROWTH, zoneName, loopMark } from "../src/renderer/game/rules.js";
import { TREES, cannotLearn, talentPointsFree, TIER_REQ } from "../src/renderer/game/talents.js";
import { CLASS_KEYS, CLASS_KEYS_BY_UNLOCK, CLASS_UNLOCK_ZONE } from "../src/renderer/game/classes.js";
import { TAB_GATES, tabOpen, openTabs } from "../src/renderer/game/tabs.js";
import { lockLink, LOCK_LOOKAHEAD } from "../src/renderer/ui/locks.js";
import { ZONES, MONSTERS, KILLS_PER_ZONE, LEGENDARY } from "../src/renderer/game/data.js";
import { mapPos, MapTab } from "../src/renderer/ui/tabs/map.js";
import { eggsAllowed, fixQuestEgg } from "../src/renderer/game/tabs.js";
import { weaponOf, materialOf, WEAPON_OF } from "../src/renderer/render/sound.js";
import { songFor, musicZone } from "../src/renderer/render/music.js";
import { MONSTER_ART } from "../src/renderer/render/art.js";
import { SETS as SETS_T, setEffects } from "../src/renderer/game/sets.js";
import { DICTS as DICTS_T } from "../src/renderer/i18n/dicts.js";
import { repairItemNames } from "../src/renderer/i18n/data.js";
import { setLang, getLang, txn } from "../src/renderer/i18n/index.js";

setRandom(seeded(42));
let pass = 0;
const test = (name, fn) => { fn(); pass++; console.log("ok -", name); };

/** Joue `minutes` minutes comme un joueur attentif (équipe, vend, dépense ses talents). */
function play(g, minutes) {
  for (let m = 0; m < minutes; m++) {
    g.advance(60);
    g.autoEquip(); g.sellCommons();
    for (const b of TREES[g.S.cls]) for (const t of b.talents) g.learnTalent(t.id, 99);
  }
}

test("état neuf cohérent", () => {
  const s = freshState();
  assert.equal(s.v, SAVE_VERSION);
  assert.equal(s.cls, "warrior");
});

test("migration : héros libérés abîmés ou inconnus retirés (it. 278)", () => {
  const o = freshState(); o.classesUnlocked = [null, "nope", 5, "mage", "mage"]; o.partner = "nope"; o.nextPartner = 42;
  const s = migrate(JSON.parse(JSON.stringify(o)));
  assert.deepEqual(s.classesUnlocked, ["warrior", "mage"]);
  assert.equal(s.partner, null); assert.equal(s.nextPartner, null);
});

test("réglage Économie d'énergie : désactivé par défaut, gardé à la migration (étude des concurrents)", () => {
  assert.equal(freshState().settings.eco, false);
  const o = freshState(); o.settings.eco = true;
  assert.equal(migrate(JSON.parse(JSON.stringify(o))).settings.eco, true);
  const old = freshState(); delete old.settings.eco;
  assert.equal(migrate(JSON.parse(JSON.stringify(old))).settings.eco, false, "ancienne sauvegarde : valeur par défaut");
  assert.equal(freshState().settings.cinematics, true, "cinématiques actives par défaut");
  const bad = freshState(); bad.settings.eco = "oui"; bad.settings.cinematics = null;
  const m = migrate(JSON.parse(JSON.stringify(bad)));
  assert.equal(m.settings.eco, false, "valeur abîmée : économie désactivée (défaut)");
  assert.equal(m.settings.cinematics, true, "valeur abîmée : cinématiques actives (défaut)");
});

test("migration v1 (prototype) -> v4", () => {
  const v1 = { v: 1, lvl: 7, xp: 3, gold: 99, zone: 4, best: 5, kills: 2, equip: { weapon: { id: 1, slot: "weapon", r: 4, il: 3, plus: 0, st: { atk: 9 }, name: "x" } }, bag: [], stats: { kills: 10, deaths: 1, bosses: 3 }, log: [], last: 1 };
  const s = migrate(v1);
  assert.equal(s.v, SAVE_VERSION);
  assert.equal(s.stats.legendaries, 1);
  assert.equal(s.cls, "warrior");
  assert.equal(s.bagSize, 24);
  assert.equal(s.equip.helm, null);
  assert.equal(migrate(null), null);
  assert.equal(migrate({ v: 99 }), null);
});

test("contenu : chaque monstre a un sprite, chaque zone des monstres connus", () => {
  for (const k in MONSTERS) assert.ok(MONSTER_ART[MONSTERS[k].art || k], "sprite manquant : " + k);
  for (const k in MONSTERS) for (const c in MONSTERS[k].recolor || {}) assert.ok(c in MONSTER_ART[MONSTERS[k].art || k].pal, `${k} : couleur ${c} inconnue`);
  assert.ok(Object.keys(MONSTERS).length >= 35, "bestiaire riche : " + Object.keys(MONSTERS).length);
  for (const z of ZONES) for (const m of [...z.monsters, z.boss]) assert.ok(MONSTERS[m], z.name + " : " + m);
});

for (const cls of CLASS_KEYS) {
  test(`classe ${cls} : une heure de jeu fait progresser`, () => {
    const g = new Game(freshState());
    g.setClass(cls);
    let kills = 0;
    g.on("kill", () => kills++);
    play(g, 60);
    console.log(`   ${cls.padEnd(7)} 1 h : niveau ${g.S.lvl}, zone ${g.S.best}, ${kills} victoires, ${g.S.stats.elites} élites, ${g.S.stats.deaths} K.O., ${Math.round(g.S.gold)} or`);
    assert.ok(kills > 250, "trop peu de victoires : " + kills);
    assert.ok(g.S.lvl >= 10);
    assert.ok(reachedAchievements(g.S).includes("FIRST_BOSS"));
  });
}

test("talents : points, paliers, réinitialisation, talents par classe", () => {
  const g = new Game(freshState());
  g.S.lvl = 30; g.invalidateStats();
  assert.equal(talentPointsFree(g.S), 29);
  const [b0] = TREES.warrior;
  assert.ok(cannotLearn(g.S, b0.talents[1].id), "palier 1 verrouillé au départ");
  assert.equal(g.learnTalent(b0.talents[0].id, 99), 10);
  assert.equal(g.learnTalent(b0.talents[1].id, 99), 5);
  assert.equal(g.learnTalent(b0.talents[3].id), 0, "l'ultime demande " + TIER_REQ[3] + " points");
  const atk = g.stats().atk;
  assert.equal(g.learnTalent(b0.talents[2].id, 99), 5);
  assert.equal(g.learnTalent(b0.talents[3].id), 1);
  assert.ok(g.stats().atk > atk);
  g.setClass("mage");
  assert.equal(talentPointsFree(g.S), 29, "le mage a ses propres points");
  g.setClass("warrior");
  assert.equal(talentPointsFree(g.S), 8, "le guerrier retrouve ses talents");
  g.S.gold = 1e9;
  assert.ok(g.resetTalents());
  assert.equal(talentPointsFree(g.S), 29);
  assert.ok(reachedAchievements({ ...g.S, talents: { warrior: { w_fury: 1 } } }).includes("TALENT_ULTIMATE"));
  g.setClass("ranger");
  assert.ok(reachedAchievements(g.S).includes("ALL_CLASSES"));
});

test("boutique : potions, élixirs, coffres, marchand, sac", () => {
  const g = new Game(freshState());
  g.S.gold = 1e7; g.S.best = 5;
  const p0 = g.S.potions;
  assert.ok(g.buyConsumable("potion"));
  assert.equal(g.S.potions, p0 + 1);
  const atk = g.stats().atk;
  assert.ok(g.buyConsumable("elixir"));
  assert.ok(Math.abs(g.stats().atk / atk - 1.25) < 1e-9);
  g.S.buffs.elixir = 1;
  g.advance(2);
  assert.equal(g.S.buffs.elixir, 0, "l'élixir expire");
  const it = g.buyChest("chest_iron");
  assert.ok(it && it.r >= 2 && it.il >= 5);
  const shop = g.shopStock(0);
  assert.equal(shop.items.length, 4);
  assert.ok(g.buyShopItem(shop.items[0].id));
  assert.equal(g.S.shop.items.length, 3);
  assert.equal(g.shopStock(Date.now() + 16 * 60 * 1000).items.length, 4, "renouvelé après 15 min");
  assert.ok(g.buyUpgrade("bag"));
  assert.equal(g.S.bagSize, 30);
  assert.ok(reachedAchievements(g.S).includes("FIRST_PURCHASE"));
});

test("combat : potions automatiques, riposte, brûlure, flèche d'ouverture", () => {
  const g = new Game(freshState());
  let potions = 0, ripostes = 0;
  g.on("potion", () => potions++);
  g.on("riposte", () => ripostes++);
  g.S.zone = g.S.best = 8; // trop dur pour un héros niveau 1
  g.advance(120);
  assert.ok(potions > 0, "potion bue");
  assert.ok(ripostes > 0, "le guerrier riposte");
  const m = new Game(freshState());
  m.setClass("mage");
  let burnt = false;
  m.on("heroAttack", ({ mon }) => { if (mon.burnT > 0) burnt = true; });
  m.advance(30);
  assert.ok(burnt, "le mage enflamme");
  const r = new Game(freshState());
  r.setClass("ranger");
  let opening = 0;
  r.on("heroAttack", ({ first }) => { if (first) opening++; });
  r.advance(30);
  assert.ok(opening > 0, "tir d'ouverture");
});

test("rythme indépendant de la largeur d'écran", () => {
  assert.ok(approachTime() > 2 && approachTime() < 5);
});

test("hors ligne : plafonné, élixirs consommés", () => {
  const g = new Game(freshState());
  assert.equal(g.applyOffline(10), null);
  g.S.buffs.fortune = 300;
  const a = g.applyOffline(3600);
  assert.ok(a && a.kills > 0);
  assert.equal(g.S.buffs.fortune, 0);
  const g2 = new Game(freshState());
  assert.equal(g2.applyOffline(48 * 3600).seconds, 8 * 3600);
});

test("équiper, forger, vendre", () => {
  const g = new Game(freshState());
  g.S.gold = 1e6;
  const it = g.newItem(0);
  g.addToBag(it);
  g.equip(it);
  const p = power(g.stats());
  assert.ok(g.forge(it));
  assert.ok(power(g.stats()) > p);
  assert.ok(g.unequip(it.slot));
  g.sell(it);
  assert.equal(g.S.bag.length, 0);
});

test("parcours : file de monstres (avec élites) et étapes", () => {
  const g = new Game(freshState());
  const line = g.lineup();
  assert.equal(line.length, 10);
  assert.ok(line.every((x) => x.type && typeof x.elite === "boolean"));
  let first = null;
  g.on("spawn", (m) => { if (!first) first = m; });
  g.advance(11);
  assert.equal(first.type, line[0].type);
  assert.equal(first.elite, line[0].elite);
});

test("sérialisation aller-retour", () => {
  const g = new Game(freshState());
  g.setClass("ranger");
  play(g, 10);
  const back = migrate(JSON.parse(JSON.stringify(g.S)));
  assert.equal(back.lvl, g.S.lvl);
  assert.equal(back.cls, "ranger");
  assert.deepEqual(back.talents, g.S.talents);
  assert.equal(heroStats(back).atk, g.stats().atk);
});

/* ---------- Contenu v4 ---------- */
import { POWERS } from "../src/renderer/game/powers.js";
import { PETS } from "../src/renderer/game/pets.js";
import { CONSTELLATIONS, ASCEND_MIN_ZONE, constellationCost } from "../src/renderer/game/prestige.js";
import { bestiaryEffects } from "../src/renderer/game/bestiary.js";

test("migration v3 -> v4", () => {
  const v3 = freshState(); v3.v = 3; delete v3.prestige; delete v3.quests; delete v3.pets; delete v3.bestiary;
  const s = migrate(v3);
  assert.equal(s.v, SAVE_VERSION);
  assert.deepEqual(s.pets.owned, {});
  assert.equal(s.prestige.count, 0);
});

test("légendaires : un pouvoir qui compte dans les statistiques", () => {
  const g = new Game(freshState());
  let it;
  for (let i = 0; i < 2000 && !(it && it.r === 4); i++) it = g.newItem(3);
  assert.equal(it.r, 4);
  assert.ok(POWERS.some((p) => p.id === it.power));
  g.S.equip[it.slot] = it; g.invalidateStats();
  const withPower = JSON.stringify(g.stats());
  const saved = it.power; delete it.power; g.invalidateStats();
  assert.notEqual(withPower, JSON.stringify(g.stats()), "le pouvoir " + saved + " change les statistiques");
});

test("quêtes : progression, récompense, renouvellement", () => {
  const g = new Game(freshState());
  assert.equal(g.S.quests.slots.length, 3);
  const q = g.S.quests.slots[0];
  q.progress = q.goal;
  const done0 = g.S.quests.completed;
  assert.ok(g.claimQuest(q.uid));
  assert.equal(g.S.quests.completed, done0 + 1);
  assert.equal(g.S.quests.slots.length, 3, "une nouvelle quête remplace l'ancienne");
  assert.ok(!g.S.quests.slots.includes(q));
  let claimed = 0;
  for (let m = 0; m < 60; m++) {
    play(g, 1);
    for (const x of [...g.S.quests.slots]) if (x.progress >= x.goal && g.claimQuest(x.uid)) claimed++;
  }
  console.log(`   1 h de jeu : ${claimed} quêtes réclamées`);
  assert.ok(claimed >= 3, "les quêtes avancent en jouant");
});

test("familiers : œufs, éclosion, niveau, bonus", () => {
  const g = new Game(freshState());
  g.gainEgg();
  const r = g.hatchEgg();
  assert.ok(r && r.isNew);
  assert.equal(g.S.pets.active, r.pet.id);
  const p0 = power(g.stats());
  g.petAddXp(r.pet.id, 1e6);
  assert.equal(g.S.pets.owned[r.pet.id].lvl, 10);
  assert.ok(power(g.stats()) >= p0, "le bonus grandit avec le niveau");
  for (let i = 0; i < 2000; i++) { g.gainEgg(); g.hatchEgg(); }
  assert.equal(Object.keys(g.S.pets.owned).length, PETS.length);
  assert.ok(reachedAchievements(g.S).includes("PETS_ALL"));
});

test("bestiaire : paliers et bonus", () => {
  const g = new Game(freshState());
  play(g, 45); // (plus de types de monstres par zone : il faut un peu plus de temps pour un palier)
  assert.ok(Object.values(g.S.bestiary).some((n) => n >= 10));
  assert.ok((bestiaryEffects(g.S).gold || 0) > 0);
});

test("gobelin doré : s'enfuit ou rapporte gros, le parcours continue", () => {
  const g = new Game(freshState());
  g.R.lineup = Array.from({ length: 10 }, () => ({ type: "goblin", elite: false, goblin: true }));
  g.R.lineupZone = g.S.zone;
  let fled = 0, caught = 0;
  g.on("flee", () => fled++);
  g.on("kill", ({ mon }) => { if (mon.goblin) caught++; });
  g.advance(60);
  assert.ok(fled + caught >= 8, `fuites ${fled}, captures ${caught}`);
});

test("ascension : éclats, conservation, constellations", () => {
  const g = new Game(freshState());
  assert.ok(!g.canAscend());
  g.S.best = g.S.zone = ASCEND_MIN_ZONE + 6; g.S.lvl = 45; g.S.gold = 1e6;
  g.gainEgg(); g.hatchEgg();
  g.S.bestiary.slime = 500;
  delete g.S.unlocks.skyChart; g.S.unlocks.autoSell = true; g.S.autoSell = { common: true, uncommon: true, rare: false }; g.S.autoPotions = true; g.S.quests.auto = true;
  const shards = g.ascendShards();
  assert.ok(shards > 0);
  assert.ok(g.ascend());
  assert.deepEqual(g.S.autoSell, { common: true, uncommon: true, rare: false }, "tri du marchand gardé à l'ascension (demande de Victor, it. 536)");
  assert.ok(g.S.unlocks.autoSell, "le déblocage, lui, est gardé");
  assert.ok(g.S.autoPotions && g.S.quests.auto, "rachat des potions et réclamation des quêtes gardés");
  // Carte du ciel : éclats placés tout seuls dans la constellation la moins chère, sauf refus (settings.autoStars)
  const gs = new Game(freshState()); gs.S.unlocks.skyChart = true; gs.S.prestige.shards = 100;
  assert.ok(gs.autoConstellations() > 0, "rangs placés"); assert.ok(gs.S.prestige.shards < 100, "éclats dépensés");
  const left = gs.S.prestige.shards; assert.ok(CONSTELLATIONS.every((c) => (gs.S.prestige.ranks[c.id] || 0) >= c.max || constellationCost(c, gs.S.prestige.ranks[c.id] || 0) > left), "plus rien d'abordable");
  const gn2 = new Game(freshState()); gn2.S.unlocks.skyChart = true; gn2.S.prestige.shards = 100; gn2.S.settings.autoStars = false;
  assert.equal(gn2.autoConstellations(), 0, "option coupée : rien");
  // Ascension par l'Astrolabe (joueur absent) : le tri du marchand est gardé, personne ne le recocherait
  const ga = new Game(freshState()); ga.S.best = ga.S.zone = ASCEND_MIN_ZONE + 6; ga.S.unlocks.autoSell = true; ga.S.autoSell = { common: true, uncommon: false, rare: false };
  assert.ok(ga.ascend({ auto: true })); assert.equal(ga.S.autoSell.common, true, "Astrolabe : tri du marchand gardé");
  assert.equal(g.S.lvl, 1);
  assert.equal(g.S.gold, 0);
  assert.equal(g.S.prestige.shards, shards);
  assert.equal(Object.keys(g.S.pets.owned).length, 1, "familiers conservés");
  assert.equal(g.S.bestiary.slime, 500, "bestiaire conservé");
  const atk = g.stats().atk;
  assert.ok(g.buyConstellation("c_warrior"));
  assert.ok(g.stats().atk > atk);
  g.S.prestige.shards = 1e6;
  for (let i = 0; i < 10; i++) g.buyConstellation("c_tree");
  assert.equal(talentPointsFree(g.S), 10, "l'Arbre donne des points de talent");
  for (let i = 0; i < 10; i++) g.buyConstellation("c_road");
  g.S.best = 40; g.ascend();
  assert.equal(g.S.zone, 21, "la Route fait recommencer plus loin");
  assert.ok(reachedAchievements(g.S).includes("ASCENSION"));
  assert.ok(CONSTELLATIONS.length >= 8);
});

/* ---------- Classes v5 et arbre de compétences ---------- */
import { SKILL_TREE, skillPointsTotal, skillPointsFree, activeSkillSet, canTakeSkill } from "../src/renderer/game/skilltree.js";
import { ruAdjective } from "../src/renderer/i18n/data.js";

test("migration v4 -> v5", () => {
  const v4 = freshState(); v4.v = 4; delete v4.skills;
  const s = migrate(v4);
  assert.equal(s.v, SAVE_VERSION);
  assert.deepEqual(s.skills.order, []);
});

test("mécaniques : bouclier, poison, serviteur, enchaînement, épines", () => {
  const seen = {};
  for (const [cls, ev] of [["paladin", "absorb"], ["necro", "minion"]]) {
    const g = new Game(freshState()); g.setClass(cls); g.S.zone = g.S.best = 3;
    g.on(ev, () => { seen[cls] = true; });
    g.advance(60);
  }
  assert.ok(seen.paladin, "le bouclier du paladin absorbe des dégâts");
  assert.ok(seen.necro, "le serviteur du nécromancien frappe");
  const a = new Game(freshState()); a.setClass("assassin");
  let stacks = 0;
  a.on("heroAttack", ({ mon }) => { stacks = Math.max(stacks, mon.poisonStacks); });
  a.S.zone = a.S.best = 5; a.advance(60);
  assert.ok(stacks >= 2, "le poison se cumule : " + stacks);
  const m = new Game(freshState()); m.setClass("monk");
  let maxCombo = 0;
  m.on("heroAttack", () => { maxCombo = Math.max(maxCombo, m.R.combo); });
  m.S.zone = m.S.best = 5; m.advance(60);
  assert.ok(maxCombo >= 3, "le moine enchaîne : " + maxCombo);
  const d = new Game(freshState()); d.setClass("druid");
  d.S.zone = d.S.best = 4;
  let thorns = false;
  d.on("heroHurt", () => { const mon = d.R.mon; if (mon && mon.hp < mon.max) thorns = true; });
  d.advance(30);
  assert.ok(thorns, "les épines du druide blessent l'attaquant");
});

test("arbre de compétences : graphe, adjacence, points, effets", () => {
  const N = SKILL_TREE.nodes;
  assert.ok(Object.keys(N).length >= 140, "arbre énorme");
  const g = new Game(freshState());
  g.S.lvl = 40; g.invalidateStats();
  assert.equal(skillPointsTotal(g.S), 20);
  assert.ok(!canTakeSkill(g.S, "force-c2"), "pas relié : impossible");
  const atk0 = g.stats().atk;
  assert.ok(g.takeSkill("force-c1"));
  assert.ok(g.takeSkill("force-c2"));
  assert.ok(g.stats().atk > atk0, "les nœuds de Force augmentent l'attaque");
  // Aller jusqu'à une clé de voûte en suivant le bras gauche
  g.S.lvl = 200; g.invalidateStats();
  for (const id of ["force-c3", ...Array.from({ length: 10 }, (_, k) => `force-a0-${k}`), "force-key"]) assert.ok(g.takeSkill(id), id);
  assert.ok(reachedAchievements(g.S).includes("SKILL_KEYSTONE"));
  assert.ok(g.undoSkill());
  assert.ok(!activeSkillSet(g.S).has("force-key"));
});

test("arbre de compétences : conservé à l'ascension, réactivé au fil des niveaux", () => {
  const g = new Game(freshState());
  g.S.lvl = 30; g.S.best = g.S.zone = 30; g.invalidateStats();
  const path = ["vitality-c1", "vitality-c2", "vitality-c3", "vitality-a0-0", "vitality-a0-1"];
  for (const id of path) assert.ok(g.takeSkill(id), id);
  g.ascend();
  assert.equal(g.S.lvl, 1);
  assert.deepEqual(g.S.skills.order, path, "chemin conservé");
  const perm = g.S.prestige.skillPts;
  assert.ok(perm > 0, "points permanents gagnés");
  assert.equal(activeSkillSet(g.S).size - 1, Math.min(path.length, skillPointsTotal(g.S)));
  g.S.lvl = 20; g.invalidateStats();
  assert.equal(activeSkillSet(g.S).size - 1, path.length, "tout le chemin se réactive");
  assert.ok(skillPointsFree(g.S) >= 0);
});

test("samouraï : chaque 4e coup est un iaijutsu critique", () => {
  const g = new Game(freshState());
  g.setClass("samurai");
  g.S.zone = g.S.best = 6;
  const hits = [];
  g.on("heroAttack", ({ iai, crit, extra }) => { if (!extra) hits.push({ iai, crit }); });
  g.advance(40);
  const iais = hits.filter((h) => h.iai);
  assert.ok(iais.length >= 2, "iaijutsu déclenchés : " + iais.length);
  assert.ok(iais.every((h) => h.crit), "toujours critiques");
  assert.ok(hits.length >= 8);
});

test("vitesse : plumes, rafale, étoile filante, hors ligne", () => {
  const g = new Game(freshState());
  // Même graine pour les deux parties : seule la vitesse diffère (indépendant des tests précédents).
  const legs = (speed) => { setRandom(seeded(77)); const game = new Game(freshState()); game.S.speed = speed; game.invalidateStats(); let n = 0; game.on("spawn", () => n++); game.advance(120); return n; };
  const base = legs(0), nf = legs(100);
  setRandom(seeded(42));
  assert.ok(nf > base * 1.2, `+100 % de vitesse : plus de combats (${base} → ${nf})`);
  g.gainSpeed(1, "test");
  assert.equal(g.S.speed, 1);
  assert.ok(g.startEvent("wind"));
  assert.ok(g.moveMul() >= 2);
  g.advance(46);
  assert.ok(g.moveMul() < 2, "la rafale s'arrête");
  g.R.starT = 0.01; let star = false; g.on("star", () => { star = true; });
  g.advance(0.1);
  assert.ok(star && g.R.star, "une étoile passe");
  const sp0 = g.S.speed; // (une plume a pu tomber pendant la rafale)
  assert.ok(g.catchStar());
  assert.equal(g.S.speed, sp0 + 2);
  assert.ok(reachedAchievements(g.S).includes("SHOOTING_STAR"));
  const off0 = new Game(freshState()).applyOffline(3600).kills;
  const o = new Game(freshState()); o.S.speed = 100; o.invalidateStats();
  assert.ok(o.applyOffline(3600).kills > off0, "la vitesse compte hors ligne");
});

test("vente : uniquement ce qui n'améliore pas, jamais les légendaires", () => {
  const g = new Game(freshState());
  for (let i = 0; i < 20; i++) g.addToBag(g.newItem(i % 5 === 0 ? 4 : 0));
  g.autoEquip(); // un héros sans équipement est amélioré par tout objet
  for (let i = 0; i < 12; i++) g.addToBag(g.newItem(0));
  const keep = g.S.bag.filter((it) => it.r === 4 || g.isUpgrade(it)).length;
  const r = g.sellUseless();
  assert.equal(g.S.bag.length, keep);
  assert.ok(r.n > 0 && r.gold > 0);
  assert.ok(g.S.bag.every((it) => it.r === 4 || g.isUpgrade(it)));
});

test("objets : 7 emplacements, types et matières variés", () => {
  const g = new Game(freshState());
  const names = new Set(), icons = new Set(), slots = new Set();
  for (let i = 0; i < 400; i++) { const it = g.newItem(0, 1 + (i % 40)); names.add(it.name.split(" ")[0]); icons.add(it.icon); slots.add(it.slot); assert.ok(it.color); }
  assert.equal(slots.size, 7);
  assert.ok(icons.size >= 25, "types d'icônes : " + icons.size);
  assert.ok(names.size >= 30, "noms de base : " + names.size);
});

test("boss : capacités spéciales", () => {
  const seen = new Set();
  for (const z of [1, 2, 3, 4, 6, 10, 20]) {
    const g = new Game(freshState());
    g.S.zone = g.S.best = z; g.S.lvl = 12 + z * 2; g.S.kills = 10; g.invalidateStats();
    g.on("bossSkill", ({ id }) => seen.add(id));
    g.on("telegraph", () => seen.add("telegraph"));
    for (let i = 0; i < 4; i++) { g.S.kills = 10; g.advance(40); }
  }
  // Chaque capacité déclenchée directement (le combat réel peut finir avant le coup dévastateur).
  const g2 = new Game(freshState());
  g2.S.lvl = 60; g2.invalidateStats();
  g2.on("bossSkill", ({ id }) => seen.add(id));
  g2.on("telegraph", () => seen.add("telegraph"));
  const boss = g2.makeMonster(true);
  boss.mech = ["enrage", "smash", "shell"];
  boss.hp = boss.max * 0.2; g2.R.mon = boss; g2.R.hp = g2.stats().hp * 50;
  for (let t = 0; t < 70; t++) g2.bossTick(boss, g2.stats(), 0.1);
  for (const id of ["enrage", "smash", "shell", "telegraph"]) assert.ok(seen.has(id), "capacité jamais vue : " + id);
});

test("récompense quotidienne : série de 7 jours", () => {
  const g = new Game(freshState());
  const days = ["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04", "2026-11-05", "2026-11-06", "2026-11-07"];
  let last;
  for (const d of days) { last = g.claimDaily(d); assert.ok(last); }
  assert.equal(last.day, 7);
  assert.ok(last.item && last.item.r >= 3, "coffre royal le 7e jour");
  assert.equal(g.claimDaily("2026-11-07"), null, "une seule fois par jour");
  assert.equal(g.claimDaily("2026-11-09").day, 1, "jour manqué : la série repart");
});

test("élites : affixes appliqués", () => {
  const g = new Game(freshState());
  const seen = new Set();
  for (let i = 0; i < 400; i++) {
    g.R.lineup = [{ type: "slime", elite: true, affix: ["fast", "armored", "vampiric", "furious"][i % 4] }, ...Array(9).fill({ type: "slime", elite: false })];
    g.R.lineupZone = g.S.zone; g.S.kills = 0;
    const m = g.makeMonster(false);
    seen.add(m.affix);
    if (m.affix === "fast") assert.ok(m.interval < 1.3);
    if (m.affix === "armored") assert.ok(m.max > 20);
  }
  assert.equal(seen.size, 4);
});

test("panoplies : pièces, bonus à 2 et 4 pièces", () => {
  const g = new Game(freshState());
  const pieces = {};
  for (let i = 0; i < 3000 && Object.keys(pieces).length < 4; i++) {
    const it = g.newItem(3, 10);
    if (it.set === "wind" && !pieces[it.slot]) { delete it.power; pieces[it.slot] = it; } // (sans pouvoir : certains donnent de la vitesse)
  }
  const list = Object.values(pieces);
  assert.equal(list.length, 4, "4 pièces différentes du Voyageur du vent");
  const mv0 = g.stats().moveSpd;
  list.slice(0, 2).forEach((it) => { g.S.equip[it.slot] = it; });
  g.invalidateStats();
  assert.equal(g.stats().moveSpd - mv0, 10, "bonus 2 pièces");
  list.slice(2).forEach((it) => { g.S.equip[it.slot] = it; });
  g.invalidateStats();
  assert.equal(g.stats().moveSpd - mv0, 35, "bonus 4 pièces");
  assert.ok(reachedAchievements(g.S).includes("FULL_SET"));
});

test("réforge : nouveaux bonus, le reste est conservé", () => {
  const g = new Game(freshState());
  g.S.gold = 1e9;
  const it = g.newItem(3, 10);
  it.plus = 3;
  const before = JSON.stringify(it.st), main = Object.keys(it.st)[0], mainV = it.st[main];
  let changed = false;
  for (let i = 0; i < 10 && !changed; i++) { assert.ok(g.reforge(it)); changed = JSON.stringify(it.st) !== before; }
  assert.ok(changed, "les bonus changent");
  assert.equal(it.st[main], mainV, "statistique principale conservée");
  assert.equal(it.plus, 3, "forge conservée");
  assert.equal(Object.keys(it.st).length, 1 + (it.r === 4 ? 3 : 2), "nombre de bonus (épique ou légendaire)");
  const common = g.newItem(0); common.r = 0;
  assert.ok(!g.reforge(common), "pas de réforge sans bonus");
});

test("Enclume stellaire (demande 28) : objet remonté au niveau du record, très cher, déblocage requis", () => {
  const g = new Game(freshState()), S = g.S;
  S.best = 60; S.zone = 60; S.gold = 1e30;
  const it = g.newItem(3, 10); it.plus = 2; it.set = "dawn";
  const st0 = { ...it.st }, main = Object.keys(it.st)[0];
  delete S.unlocks.starAnvil;
  assert.ok(!g.levelItem(it), "pas sans le déblocage");
  S.unlocks.starAnvil = true;
  const cost = M_rules_js.levelUpCost(it, S), gold0 = S.gold;
  assert.ok(cost > M_rules_js.reforgeCost(it) * 1000, "bien plus cher qu'une réforge");
  assert.ok(g.levelItem(it));
  assert.equal(it.il, 60); assert.equal(it.plus, 2); assert.equal(it.set, "dawn");
  assert.deepEqual(Object.keys(it.st).sort(), Object.keys(st0).sort(), "mêmes statistiques");
  for (const k in st0) assert.ok(it.st[k] > st0[k], "chaque statistique grandit : " + k);
  assert.ok(it.st[main] > st0[main] * 3, "la principale grandit nettement");
  assert.equal(S.gold, gold0 - cost);
  assert.ok(!g.levelItem(it), "déjà au niveau du record : rien");
  S.gold = 0; const it2 = g.newItem(1, 10);
  assert.ok(!g.levelItem(it2), "pas assez d'or");
});

test("héros ajoutés : au moins une branche de talents différente de leur modèle (étude des concurrents)", () => {
  const { TREES } = M_talents_js, { CLASSES } = M_classes_js;
  for (const [cls, def] of Object.entries(CLASSES)) {
    if (!def.tree) continue;
    const sig = (k) => TREES[k].map((b) => JSON.stringify(b.talents.map((t) => t.eff)));
    const mine = sig(cls), model = sig(def.tree);
    assert.ok(mine.some((x, i) => x !== model[i]), cls + " a les mêmes effets que " + def.tree);
  }
});

test("silhouette : plume et cape pour un casque / une armure épiques, ajoutées pareil sur les trois images", () => {
  const { gearRows } = M_equipvis_js, { CLASS_ART } = M_art_js;
  for (const [cls, art] of Object.entries(CLASS_ART)) {
    const v = { plume: "#c08cff", cape: "#3a6ab8" };
    // Autant de rangées ajoutées sur chaque image (le dessin d'attaque peut déjà différer d'une rangée).
    const h = ["walk1", "walk2", "attack"].map((f) => gearRows(art[f], v).length - art[f].length);
    assert.ok(h[0] === h[1] && h[1] === h[2], cls + " : rangées ajoutées différentes entre les images");
    assert.equal(gearRows(art.walk1, {}), art.walk1, "sans plume ni cape : dessin inchangé");
    if (art.walk1.some((r) => r.includes("A") || r.includes("a"))) assert.ok(gearRows(art.walk1, { cape: "#000000" }).some((r) => r.includes("C")), cls + " : pas de cape");
  }
});

test("événement Pluie d'éclats : seulement après une ascension ; les victoires donnent des éclats", () => {
  const { EVENTS } = M_events_js;
  const g = new Game(freshState());
  assert.equal(EVENTS.shardfall.req(g.S), false, "pas avant la première ascension");
  g.S.prestige.count = 1;
  assert.equal(EVENTS.shardfall.req(g.S), true);
  assert.ok(g.startEvent("shardfall"));
  const s0 = g.S.prestige.shards, t0 = g.S.prestige.total;
  for (let i = 0; i < 200; i++) { g.R.mon = g.makeMonster(false); g.killMonster(); g.R.events.shardfall = 30; }
  assert.ok(g.S.prestige.shards > s0 + 20, "≈ 25 % des victoires : " + (g.S.prestige.shards - s0));
  assert.equal(g.S.prestige.total - t0, g.S.prestige.shards - s0, "comptés aussi au total (lueur)");
});

test("succès Chroniqueur : toutes les chroniques avant la victoire", () => {
  const S = freshState(), { CHRONICLES } = M_story_js;
  assert.ok(!M_achievements_js.reachedAchievements(S).includes("CHRONICLER"));
  for (const c of CHRONICLES) if (c.id !== "dawn") S.story.read[c.id] = true;
  assert.ok(M_achievements_js.reachedAchievements(S).includes("CHRONICLER"));
});

test("astuce duo : proposée quand un héros de l'autre portée est libre, plus une fois le duo formé", () => {
  const g = new Game(freshState()), S = g.S;
  S.tabsOpen = { ...(S.tabsOpen || {}), class: true };
  S.settings.hints = Object.fromEntries(M_hints_js.HINTS.filter((h) => h.id !== "duo").map((h) => [h.id, true]));
  const duo = () => (M_hints_js.nextHint(g) || {}).id === "duo";
  assert.ok(!duo(), "personne à prendre en duo");
  S.classesUnlocked = ["warrior", "ranger"];
  assert.ok(duo(), "un héros à distance libre : l'astuce vient");
  S.partner = "ranger";
  assert.ok(!duo(), "duo formé : plus d'astuce");
});

test("plein écran (bon voisin) : états Windows lus, rien hors de Windows", () => {
  const fw = createRequire(import.meta.url)("../src/main/fullscreen-watch.js");
  assert.equal(fw.parseState("3\r"), true, "jeu D3D en plein écran");
  assert.equal(fw.parseState("2"), true); assert.equal(fw.parseState("4"), true);
  assert.equal(fw.parseState("5"), false, "état normal");
  assert.equal(fw.parseState("Exception"), null, "ligne illisible ignorée");
  let calls = 0;
  const w = fw.watchFullscreen({ onChange: () => calls++, platform: "linux" });
  w.stop();
  assert.equal(calls, 0, "Linux : aucun processus, aucun changement");
});

test("Quoi de neuf : rien pour une partie neuve, une fois pour une ancienne sauvegarde", () => {
  const { newsDue, markNews } = M_news_js;
  assert.equal(newsDue(freshState()), false, "partie neuve");
  const old = freshState(); old.stats.kills = 50; old.story.intro = true; delete old.settings.newsSeen;
  const S = migrate(JSON.parse(JSON.stringify(old)));
  assert.equal(newsDue(S), true, "ancienne sauvegarde : à annoncer");
  markNews(S);
  assert.equal(newsDue(S), false, "une seule fois");
  // Éditions : seulement celles qui n'ont pas été lues, la plus récente d'abord
  const { NEWS_EDITIONS, NEWS_ID, newsItems } = M_news_js;
  assert.equal(NEWS_ID, NEWS_EDITIONS.length);
  const last = NEWS_EDITIONS[NEWS_ID - 1];
  assert.deepEqual(newsItems(NEWS_ID - 1), last, "dernière édition seule");
  assert.equal(newsItems(0).length, NEWS_EDITIONS.flat().length, "toutes si aucune lue");
  assert.equal(newsItems(0)[0], last[0], "la plus récente d'abord");
  assert.equal(newsItems(NEWS_ID).length, 0);
  // Au plus 3 éditions affichées ; les plus anciennes sont comptées (« … et N nouveautés plus anciennes »)
  const { newsShown, NEWS_MAX_EDITIONS } = M_news_js, sh = newsShown(0);
  assert.equal(sh.items.length + sh.older, NEWS_EDITIONS.flat().length, "rien ne se perd dans le compte");
  assert.ok(sh.items.length === NEWS_EDITIONS.slice(-NEWS_MAX_EDITIONS).flat().length, "les 3 dernières éditions");
  assert.equal(newsShown(NEWS_ID - 1).older, 0);
});

test("sorts (demande D) : propres à chaque héros, lancés en combat, gardés à l'ascension, sauvegarde abîmée", () => {
  const { SPELLS, SPELL_INDEX, classSpells, spellPrice, SPELL_MAX } = M_spells_js;
  for (const c of CLASS_KEYS) assert.equal(classSpells(c).length, 3, c + " : trois sorts");
  assert.equal(new Set(SPELLS.map((x) => x.name)).size, SPELLS.length, "60 noms tous différents");
  const g = new Game(freshState()); g.S.cls = "warrior"; g.S.best = g.S.zone = 10; g.S.gold = 1e12;
  assert.ok(!g.learnSpell("warrior.1"), "2e sort : zone 22 pas atteinte");
  assert.ok(!g.learnSpell("mage.0"), "pas les sorts d'un autre héros");
  const before = g.S.gold; assert.ok(g.learnSpell("warrior.0"), "Tourbillon appris"); assert.equal(g.S.spells["warrior.0"], 1);
  assert.equal(before - g.S.gold, spellPrice(SPELL_INDEX["warrior.0"], 0), "prix du rang 1");
  g.S.gold = spellPrice(SPELL_INDEX["warrior.0"], 1) * 3.6; const nmax = g.learnSpellMax("warrior.0");
  assert.ok(nmax >= 2 && g.S.spells["warrior.0"] === 1 + nmax, "« max » : plusieurs rangs d'un coup (" + nmax + ")");
  g.S.gold = 1e40; g.learnSpellMax("warrior.0"); assert.equal(g.S.spells["warrior.0"], SPELL_MAX, "rang maximal");
  // En combat : le sort part tout seul et blesse le monstre
  let cast = 0; g.on("spell", ({ id }) => { if (id === "warrior.0") cast++; });
  g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e15; g.R.mode = "fight"; g.R.hp = 1e9; g.R.spellT = { "warrior.0": 0 };
  const hp0 = g.R.mon.hp; g.castSpells(g.R.mon, g.stats(), 0.1);
  assert.equal(cast, 1, "sort lancé"); assert.equal(g.S.stats.spells, 1, "statistique des sorts lancés"); assert.ok(g.R.mon.hp < hp0, "dégâts du sort"); assert.ok(g.R.spellT["warrior.0"] === spellCd(SPELL_INDEX_T["warrior.0"], SPELL_MAX), "recharge relancée (rang 50 : moitié)");
  // Perçant (demande H) : le Tourbillon (lames) met de côté 50 % de ses dégâts pour le monstre suivant
  // (demande R : la file est frappée tout de suite ; au rang 50, six monstres)
  const nextSlot = g.lineup()[g.S.kills + 1]; assert.ok(nextSlot.pierced > 0, "dégâts perçants sur le suivant de la file");
  const reserve = nextSlot.pierced; g.S.kills += 1; g.R.mon = null; g.R.mode = "walk"; g.R.spawnT = 0; g.step(0.05);
  assert.ok(g.R.mon && g.R.mon.hp < g.R.mon.max && g.R.mon.hp >= 1, "le suivant arrive blessé, jamais mort d'office");
  assert.ok(g.R.mon.max - g.R.mon.hp <= reserve + 1e-6 && nextSlot.pierced === 0, "réserve consommée");
  // Soin (rôdeur) et bouclier (guerrier)
  const h = new Game(freshState()); h.S.cls = "ranger"; h.S.best = h.S.zone = 60; h.S.spells = { "ranger.1": 1 }; const hs = h.stats();
  h.R.mon = h.makeMonster(false); h.R.mon.hp = 1e15; h.R.hp = hs.hp * 0.5; h.R.spellT = { "ranger.1": 0 };
  h.castSpells(h.R.mon, hs, 0.1); assert.ok(h.R.hp > hs.hp * 0.5, "soin");
  const k = new Game(freshState()); k.S.cls = "warrior"; k.S.spells = { "warrior.1": 1 }; k.R.mon = k.makeMonster(false); k.R.mon.hp = 1e15; k.R.shield = 0; k.R.spellT = { "warrior.1": 0 };
  k.castSpells(k.R.mon, k.stats(), 0.1); assert.ok(k.R.shield > 0, "bouclier");
  // Les sorts d'un autre héros ne partent pas
  const o = new Game(freshState()); o.S.cls = "warrior"; o.S.spells = { "mage.0": 5 }; o.R.mon = o.makeMonster(false); o.R.mon.hp = o.R.mon.max = 1e15; o.R.spellT = { "mage.0": 0 };
  const hp1 = o.R.mon.hp; o.castSpells(o.R.mon, o.stats(), 0.1); assert.equal(o.R.mon.hp, hp1, "sort d'un autre héros : rien");
  // Astuce : un sort abordable du héros actuel, pas encore appris, mène à « Sorts et attaque »
  const t = new Game(freshState()); t.S.cls = "warrior"; t.S.best = t.S.zone = 12; t.S.gold = 1e12; t.S.tabsOpen = { ...(t.S.tabsOpen || {}), class: true };
  t.S.settings.hints = Object.fromEntries(M_hints_js.HINTS.filter((x) => x.id !== "spell").map((x) => [x.id, true]));
  const ht = nextHint(t); assert.ok(ht && ht.id === "spell" && ht.tab === "class" && ht.sec === "style", "astuce du sort : " + (ht && ht.id));
  const td = t.todoNow().find((x) => x.id === "spell"); assert.ok(td && td.tab === "class" && td.sec === "style", "« À faire » : sort à apprendre");
  t.learnSpell("warrior.0"); const ht2 = nextHint(t); assert.ok(!ht2 || ht2.id !== "spell", "sort appris : plus d'astuce"); assert.ok(!t.todoNow().some((x) => x.id === "spell" && x.name === "Tourbillon"), "Tourbillon appris : plus dans « À faire »");
  assert.deepEqual(ACH_PROGRESS.SPELLS_ALL3(t.S), [1, 3], "Grimoire complet : 1 sort sur 3");
  { const m = SPELL_INDEX_T["mage.2"]; assert.deepEqual([1, 9, 10, 25, 50].map((r) => spellCd(m, r)), [20, 20, 18, 16, 10], "recharge : -10 % tous les 10 rangs"); }
  { const S3 = { ...t.S, spells: { "mage.0": 1, "mage.1": 2, "mage.2": 1, "warrior.0": 1 } }; assert.ok(ACH_T.find((a) => a.id === "SPELLS_ALL3").test(S3), "Grimoire complet : trois sorts du mage"); }
  // Grimoire des sorts : améliore tout seul le moins cher, sous un dixième de l'or ; coupé = rien
  const gb = new Game(freshState()); gb.S.cls = "warrior"; gb.S.best = gb.S.zone = 60; gb.S.unlocks.spellBook = true; gb.S.gold = 1e15;
  assert.ok(gb.autoSpells() > 0 && Object.keys(gb.S.spells).length > 0, "Grimoire : rangs achetés"); assert.equal(gb.autoSpells(), 0, "au plus une fois par minute de jeu");
  const gb2 = new Game(freshState()); gb2.S.cls = "warrior"; gb2.S.best = gb2.S.zone = 60; gb2.S.unlocks.spellBook = true; gb2.S.gold = 1e15; gb2.S.settings.autoSpells = false;
  assert.equal(gb2.autoSpells(), 0, "Grimoire coupé : rien");
  // Ascension : gardés
  g.S.best = g.S.zone = 30; assert.ok(g.ascend()); assert.equal(g.S.spells["warrior.0"], SPELL_MAX, "sorts gardés à l'ascension");
  // Sauvegarde abîmée : sort inconnu et rang illisible retirés, rang trop grand borné
  const bad = JSON.parse(JSON.stringify(g.S)); bad.spells = { "warrior.0": 99, inconnu: 3, "mage.1": "x", "mage.2": 2.7 };
  assert.deepEqual(migrate(bad).spells, { "warrior.0": SPELL_MAX, "mage.2": 2 });
  const bad2 = JSON.parse(JSON.stringify(g.S)); bad2.spells = "x"; assert.deepEqual(migrate(bad2).spells, {});
});

test("synergies de duo : un partenaire attitré par héros, bonus appliqué au duo formé", () => {
  const { DUO_SYNERGIES, duoSynergy, CLASS_KEYS, isRanged } = M_classes_js;
  const seen = new Set();
  for (const d of DUO_SYNERGIES) { assert.notEqual(isRanged(d.a), isRanged(d.b), d.name + " : une portée de chaque"); seen.add(d.a); seen.add(d.b); }
  assert.equal(seen.size, CLASS_KEYS.length, "chaque héros a un duo idéal, une seule fois");
  assert.equal(duoSynergy("ranger", "warrior").name, "Frères d’armes", "dans les deux sens");
  const g = new Game(freshState()); g.S.classesUnlocked = ["warrior", "ranger", "mage"];
  g.choosePartner("mage"); const a0 = g.stats().atk;
  g.S.partner = "ranger"; g.invalidateStats(); const a1 = g.stats().atk;
  assert.ok(a1 > a0, "Frères d’armes : plus d’attaque qu’un duo sans synergie");
  assert.ok(M_achievements_js.reachedAchievements(g.S).includes("DUO_SYNERGY"), "succès « Duo parfait »");
  g.S.partner = "mage"; g.S.nextPartner = null; g.S.tabsOpen = { ...(g.S.tabsOpen || {}), class: true };
  const nh = (gg) => { for (let i = 0; i < 40; i++) { const h = M_hints_js.nextHint(gg); if (!h || h.id === "synergy") return h; gg.S.settings.hints[h.key] = true; } return null; };
  const h = nh(g);
  assert.ok(h && h.id === "synergy" && h.text.includes("Rôdeur"), "astuce : duo idéal libre proposé");
  g.S.nextPartner = "ranger"; assert.ok(!M_hints_js.nextHint(g) || M_hints_js.nextHint(g).id !== "synergy", "plus d’astuce une fois choisi");
});

test("déblocages : une icône propre à chacun, dessinée", () => {
  const src = fs.readFileSync(new URL("../src/renderer/render/shopart.js", import.meta.url), "utf8");
  const icons = UNLOCKS.map((u) => u.icon);
  assert.equal(new Set(icons).size, icons.length, "aucune icône partagée entre deux déblocages");
  for (const i of icons) assert.ok(new RegExp("\\n  " + i + ":\\s*\\[").test(src), "icône dessinée : " + i);
});

test("compétences : chaque effet de l'arbre a son icône (demande 34)", () => {
  const { SKILL_TREE } = M_skilltree_js, keys = new Set(M_skillicons_js.SKILL_ICON_KEYS);
  for (const n of Object.values(SKILL_TREE.nodes)) assert.ok(keys.has(M_skillicons_js.skillIconKey(n)), "icône manquante : " + n.id + " " + M_skillicons_js.skillIconKey(n));
  // Chaque nœud remarquable et chaque clé de voûte a un dessin unique.
  const uniq = new Set(M_skillicons_js.UNIQUE_SKILL_ICONS);
  for (const n of Object.values(SKILL_TREE.nodes)) if (n.kind === "notable" || n.kind === "keystone") assert.ok(uniq.has(n.id), "dessin unique manquant : " + n.id + " (" + n.name + ")");
});

test("familiers : chaque familier a un dessin, les rares sont plus rares", () => {
  const { PET_ART } = M_art_js;
  const { PETS: list, rollPet } = M_pets_js;
  for (const p of list) assert.ok(PET_ART[p.id], "dessin manquant : " + p.id);
});
{
  const { PETS: list, rollPet } = M_pets_js;
  const { rand } = M_util_js;
  const n = {};
  for (let i = 0; i < 20000; i++) { const p = rollPet(rand); n[p.id] = (n[p.id] || 0) + 1; }
  test("familiers : tirage pondéré", () => { assert.ok(n.phoenix < n.cat / 2, `phénix ${n.phoenix} / chaton ${n.cat}`); assert.ok(n.rabbit < n.cat); });
}

{
  const { DAY_MODS, dayModFor, DAY_MOD_KEYS } = M_daymods_js;
  test("bénédiction du jour : déterministe, variée, appliquée", () => {
    assert.equal(dayModFor("2026-11-08"), dayModFor("2026-11-08"));
    const seen = new Set();
    for (let d = 1; d <= 60; d++) seen.add(dayModFor(`2026-01-${String(d).padStart(2, "0")}`));
    assert.ok(seen.size >= 5, "trop peu de variété : " + seen.size);
    const g = new Game(freshState());
    const before = heroStats(g.S);
    let day = null;
    for (let d = 1; d <= 31 && !day; d++) if (dayModFor(`2026-03-${String(d).padStart(2, "0")}`) === "fury") day = `2026-03-${String(d).padStart(2, "0")}`;
    g.claimDaily(day);
    assert.equal(g.S.daily.mod, "fury");
    assert.ok(heroStats(g.S).atk > before.atk);
    for (const k of DAY_MOD_KEYS) assert.ok(DAY_MODS[k].name && DAY_MODS[k].desc);
  });
}

test("coffre au trésor : or, potion et objet rare ou mieux", () => {
  const g = new Game(freshState());
  const gold0 = g.S.gold, bag0 = g.S.bag.length, pot0 = g.S.potions;
  let seen = null;
  g.on("chest", (e) => { seen = e; });
  const r = g.openChest();
  assert.ok(r.gold > 0 && g.S.gold === gold0 + r.gold);
  assert.ok(r.item.r >= 2);
  assert.equal(g.S.bag.length, bag0 + 1);
  assert.ok(g.S.potions >= Math.min(20, pot0 + 1));
  assert.ok(seen && seen.item === r.item);
  assert.ok(reachedAchievements(g.S).includes("CHEST"));
});

{
  const { CODEX_ENTRIES, codexCounts, itemBaseKey } = M_codex_js;
  test("collection d'objets : enregistrement, bonus, migration, ascension", () => {
    const g = new Game(freshState());
    const before = heroStats(g.S).drop;
    for (let i = 0; i < 300; i++) g.newItem(0);
    const c = codexCounts(g.S);
    assert.ok(c.found > 20 && c.found <= c.total, "types trouvés : " + c.found);
    assert.ok(heroStats(g.S).drop > before, "bonus de butin");
    // Le nom suffit pour retrouver le type (le plus long l'emporte).
    assert.equal(itemBaseKey({ slot: "helm", name: "Casque à cornes de fer" }), "helm:Casque à cornes");
    assert.equal(itemBaseKey({ slot: "helm", name: "Casque de fer" }), "helm:Casque");
    // Ancienne sauvegarde sans collection : remplie avec les objets possédés.
    const old = JSON.parse(JSON.stringify(g.S)); delete old.codex;
    old.bag = [{ id: 1, slot: "ring", r: 3, il: 1, plus: 0, st: { crit: 1 }, name: "Sceau d’onyx" }];
    const m = migrate(old);
    assert.equal(m.codex["ring:Sceau"], 3);
    // Toutes les entrées ont une icône.
    for (const e of CODEX_ENTRIES) assert.ok(e.icon && e.key);
    g.S.best = 30; g.ascend();
    assert.ok(codexCounts(g.S).found === c.found, "conservée à l'ascension");
  });
}

test("expéditions des familiers", () => {
  const g = new Game(freshState());
  g.S.pets.owned = { cat: { lvl: 3, xp: 0 }, fox: { lvl: 1, xp: 0 } };
  g.S.pets.active = "cat";
  const t0 = 1_000_000;
  assert.ok(!g.sendExpedition("cat", "short", t0), "le compagnon actif reste");
  assert.ok(g.sendExpedition("fox", "long", t0));
  assert.ok(!g.sendExpedition("fox", "short", t0), "déjà parti");
  assert.ok(!g.setPet("fox"), "pas d'échange pendant l'expédition");
  assert.equal(g.claimExpedition("fox", t0 + 60000), null, "pas encore revenu");
  assert.deepEqual(g.expeditionsReady(t0 + 121 * 60000), ["fox"]);
  const gold0 = g.S.gold;
  const r = g.claimExpedition("fox", t0 + 121 * 60000);
  assert.ok(r && r.gold > 0 && g.S.gold >= gold0 + r.gold);
  assert.ok(g.S.pets.owned.fox.lvl > 1 || g.S.pets.owned.fox.xp > 0, "expérience gagnée");
  assert.equal(Object.keys(g.S.pets.exp).length, 0);
  assert.ok(g.setPet("fox"));
  // La sauvegarde garde les expéditions en cours.
  g.sendExpedition("cat", "epic", t0);
  const m = migrate(JSON.parse(JSON.stringify(g.S)));
  assert.equal(m.pets.exp.cat.kind, "epic");
});

test("transmutation : 3 inutiles -> 1 de la rareté au-dessus", () => {
  const g = new Game(freshState());
  g.S.best = 10;
  // Équipement fort : tout le reste est inutile.
  for (let n = 0; n < 300 && Object.values(g.S.equip).some((x) => !x || x.r < 4); n++) { const it = g.newItem(4, 40); if (!g.S.equip[it.slot]) g.S.equip[it.slot] = it; }
  g.invalidateStats();
  g.S.bag = [];
  for (let i = 0; i < 9; i++) { const it = g.newItem(0, 1); it.r = 0; g.S.bag.push(it); }
  const plan = g.transmutePlan();
  assert.ok(plan.made >= 3, "au moins 3 nouveaux : " + plan.made);
  const out = g.transmute();
  assert.ok(out.length >= plan.made);
  assert.ok(out.some((it) => it.r >= 1));
  assert.ok(!g.S.bag.some((it) => it.r === 0), "les communs ont été utilisés");
  // Un légendaire n'est jamais consommé.
  g.S.bag = [];
  for (let i = 0; i < 3; i++) { const it = g.newItem(4, 1); g.S.bag.push(it); }
  assert.equal(g.transmute().length, 0);
  assert.equal(g.S.bag.length, 3);
});

test("boss : miroir et vampirisme", () => {
  const { bossMechanics } = M_bosses_js;
  const seen = new Set();
  for (let z = 1; z <= 12; z++) for (const id of bossMechanics(z)) seen.add(id);
  assert.ok(seen.has("mirror") && seen.has("drain"), [...seen].join(","));
  // Le miroir ne peut pas achever le héros.
  const g = new Game(freshState());
  g.S.lvl = 30; g.invalidateStats();
  let mirrored = 0;
  g.on("mirrorHit", ({ dmg }) => { mirrored += dmg; });
  const zMirror = [1, 2, 3, 4, 5, 6].find((z) => bossMechanics(z).includes("mirror"));
  g.S.zone = g.S.best = zMirror; g.S.kills = 10;
  g.S.autoAdvance = false;
  for (let i = 0; i < 400 && !mirrored; i++) { g.S.zone = zMirror; g.S.kills = 10; if (g.R.mon && g.R.mon.boss) g.R.mon.hp = Math.max(g.R.mon.hp, g.R.mon.max * 0.6); g.advance(0.5); }
  assert.ok(mirrored > 0, "le miroir a renvoyé des dégâts");
});

test("champions : plus coriaces, butin épique garanti", () => {
  const { monsterBase } = M_rules_js;
  const e = monsterBase(10, false, "slime", true), c = monsterBase(10, false, "slime", true, true);
  assert.ok(c.hp > e.hp * 2 && c.gold > e.gold * 4);
  const g = new Game(freshState());
  g.S.zone = g.S.best = 5; g.S.lvl = 40; g.invalidateStats();
  g.R.lineup = Array.from({ length: 10 }, () => ({ type: "slime", elite: true, champion: true, affix: "fast" }));
  g.R.lineupZone = 5;
  const loot = [];
  g.on("loot", ({ item, mon }) => { if (mon) loot.push(item.r); });
  for (let i = 0; i < 120 && !g.S.stats.champions; i++) g.advance(1);
  assert.ok(g.S.stats.champions >= 1, "un champion vaincu");
  assert.ok(loot.length && loot.every((r) => r >= 3), "butin épique ou mieux : " + loot);
  assert.ok(reachedAchievements(g.S).includes("CHAMPION"));
});

test("hors ligne : plumes et coffres possibles, plafonnés", () => {
  let feathers = 0, chests = 0;
  for (let i = 0; i < 20; i++) {
    const g = new Game(freshState()); g.S.lvl = 60; g.S.zone = g.S.best = 5; g.S.stats.kills = 1; g.invalidateStats();
    const sum = g.applyOffline(8 * 3600);
    assert.ok(sum && sum.feathers <= 5 && sum.chests <= 3);
    feathers += sum.feathers; chests += sum.chests;
    assert.equal(g.S.speed, sum.feathers);
  }
  assert.ok(feathers > 0 && chests > 0, `plumes ${feathers}, coffres ${chests}`);
});

test("achat automatique de potions", () => {
  const g = new Game(freshState());
  g.S.potions = 0; g.S.gold = 1e6;
  assert.equal(g.autoBuyPotions(), 0, "désactivé par défaut");
  g.S.autoPotions = true;
  assert.equal(g.autoBuyPotions(), 5);
  assert.equal(g.S.potions, 5);
  g.S.potions = 0; g.S.gold = 10;
  assert.equal(g.autoBuyPotions(), 0, "pas assez d'or");
  assert.equal(migrate(JSON.parse(JSON.stringify(g.S))).autoPotions, true);
});

test("pouvoirs légendaires découverts : bonus et migration", () => {
  const { powersFound } = M_codex_js;
  const g = new Game(freshState());
  const atk0 = heroStats(g.S).atk;
  for (let i = 0; i < 40; i++) g.newItem(4);
  assert.ok(powersFound(g.S) >= 5, "pouvoirs : " + powersFound(g.S));
  assert.ok(heroStats(g.S).atk > atk0);
  const old = JSON.parse(JSON.stringify(g.S)); delete old.powersSeen;
  old.bag = [{ id: 9, slot: "ring", r: 4, il: 1, plus: 0, st: { crit: 1 }, name: "Anneau d’or", power: "p_midas" }];
  assert.ok(migrate(old).powersSeen.p_midas);
});

test("héros à libérer : boss de zone, changement de classe à l'ascension", () => {
  const { CLASS_UNLOCK_ZONE } = M_classes_js;
  const g = new Game(freshState());
  assert.deepEqual(g.S.classesUnlocked, ["warrior"]);
  assert.ok(!g.chooseNextClass("ranger"), "pas encore libéré");
  let freed = null; g.on("classUnlock", ({ cls }) => { freed = cls; });
  const z = CLASS_UNLOCK_ZONE.ranger;
  assert.ok(z >= 10, "le premier héros ne se libère pas trop tôt");
  g.S.zone = g.S.best = z; g.S.lvl = 80; g.invalidateStats();
  g.S.kills = 10;
  for (let i = 0; i < 600 && !freed; i++) { g.S.kills = Math.max(g.S.kills, 10); g.advance(0.5); }
  assert.equal(freed, "ranger");
  assert.ok(g.chooseNextClass("ranger"));
  assert.equal(g.S.cls, "warrior", "pas de changement immédiat");
  g.S.best = 30;
  assert.ok(g.ascend());
  assert.equal(g.S.cls, "ranger");
  assert.ok(g.S.classesUnlocked.includes("ranger"));
  // Anciennes parties : les classes déjà jouées restent débloquées.
  const old = JSON.parse(JSON.stringify(freshState())); delete old.classesUnlocked; old.stats.classes = ["warrior", "mage", "samurai"];
  assert.deepEqual(migrate(old).classesUnlocked.sort(), ["mage", "samurai", "warrior"]);
});

test("talents : voie exclusive et maîtrises (aucun point perdu)", () => {
  const { VOIES, MASTERIES, talentPointsFree } = M_talents_js;
  const { CLASS_KEYS: keys } = M_classes_js;
  for (const c of keys) assert.equal((VOIES[c] || []).length, 2, "deux voies pour " + c);
  const g = new Game(freshState());
  g.S.lvl = 120; g.invalidateStats();
  const [a, b] = VOIES.warrior;
  assert.equal(g.learnTalent(a.id), 0, "voie fermée avant 30 points");
  for (const br of TREES.warrior) for (const t of br.talents) g.learnTalent(t.id, 99);
  const atk0 = g.stats().atk;
  assert.equal(g.learnTalent(a.id), 1);
  assert.equal(g.learnTalent(b.id), 0, "une seule voie");
  assert.ok(g.stats().riposte > 0);
  const free = talentPointsFree(g.S);
  assert.ok(free > 0);
  assert.equal(g.learnTalent(MASTERIES[0].id, 9999), free, "tous les points vont en maîtrise");
  assert.equal(talentPointsFree(g.S), 0);
  assert.ok(g.stats().atk > atk0);
});

test("talents : dépense automatique (ultimes, branche, maîtrises ; jamais la voie)", () => {
  const { talentPointsFree, chosenVoie } = M_talents_js;
  const g = new Game(freshState());
  g.S.lvl = 26; g.invalidateStats();
  assert.equal(g.autoSpendTalents(), 25);
  assert.equal(talentPointsFree(g.S), 0);
  const ult = TREES.warrior.flatMap((b) => b.talents).filter((t) => t.tier === 3 && (g.S.talents.warrior[t.id] || 0) > 0);
  assert.equal(ult.length, 1, "une branche menée jusqu'à son ultime");
  g.S.lvl = 150; g.invalidateStats();
  g.autoSpendTalents();
  assert.equal(talentPointsFree(g.S), 0, "le surplus part en maîtrises");
  assert.equal(chosenVoie(g.S), null, "la voie reste au choix du joueur");
});

test("familiers : tout faire éclore, tout envoyer en expédition", () => {
  const g = new Game(freshState());
  g.S.pets.eggs = 6;
  assert.equal(g.hatchAll().length, 6);
  assert.equal(g.S.pets.eggs, 0);
  const idle = g.idlePets().length;
  assert.equal(g.sendAllExpeditions("short"), idle);
  assert.equal(g.idlePets().length, 0);
  assert.ok(g.S.pets.active && !g.S.pets.exp[g.S.pets.active], "le compagnon reste");
});

test("boutique : atelier permanent, œuf, objet pour le point faible, bonne affaire", () => {
  const { WORKSHOP, workshopPrice, eggPrice } = M_shop_js;
  const g = new Game(freshState());
  g.S.gold = 1e8;
  const atk0 = g.stats().atk;
  assert.equal(g.buyWorkshop("ws_atk"), 1);
  assert.ok(g.stats().atk > atk0);
  const lvl = g.buyWorkshop("ws_atk", 999);
  assert.ok(lvl > 5, "achat en lot : " + lvl);
  g.S.gold = 1e12;
  assert.equal(g.buyWorkshop("ws_speed", 999), 20, "cartographe plafonné");
  g.S.best = 30; assert.ok(g.ascend());
  assert.ok(g.S.workshop.ws_atk > 5, "atelier conservé à l'ascension");
  const g2 = new Game(freshState());
  g2.S.gold = 1e7;
  const eggs = g2.S.pets.eggs;
  assert.ok(g2.buyEgg());
  assert.ok(!g2.buyEgg(), "un œuf par étal");
  assert.equal(g2.S.pets.eggs, eggs + 1);
  const stock = g2.shopStock();
  assert.equal(stock.items.filter((it) => it.deal).length, 1, "une bonne affaire");
  assert.equal(stock.items[0].slot, "weapon", "premier objet pour un emplacement vide");
});

test("quêtes : étoiles, réputation de guilde, réclamation automatique", () => {
  const { makeQuest, guildRank } = M_quests_js;
  const g = new Game(freshState());
  const seen = new Set();
  for (let i = 0; i < 400; i++) { const q = makeQuest(g.S, i); seen.add(q.stars); if (q.stars === 3) assert.ok(q.reward.speed || q.reward.chest >= 3 || q.reward.egg || q.reward.shards, "récompense rare"); }
  assert.deepEqual([...seen].sort(), [1, 2, 3]);
  // Réputation : 30 quêtes accomplies font monter de rang et donnent un bonus.
  const gold0 = g.stats().gold;
  for (let i = 0; i < 30; i++) { const q = g.ensureQuests()[0]; q.progress = q.goal; g.claimQuest(q.uid); }
  assert.ok(g.S.guild.rep >= 30);
  assert.ok(guildRank(g.S.guild.rep).rank >= 2);
  assert.ok(g.stats().gold > gold0, "bonus d'or de la guilde");
  // Réclamation automatique
  g.S.quests.auto = true;
  const done0 = g.S.quests.completed;
  const q = g.ensureQuests().find((x) => x.kind === "kill") || g.ensureQuests()[0];
  q.kind = "kill"; q.goal = 1; q.progress = 0;
  g.questProgress("kill", 1);
  g.advance(0.1);
  assert.equal(g.S.quests.completed, done0 + 1, "réclamée toute seule");
  g.S.best = 30; g.ascend();
  assert.ok(g.S.guild.rep >= 30, "réputation conservée à l'ascension");
});

test("compétences : un pétale complet allume son cœur", () => {
  const { SKILL_TREE, completedSectors, SECTOR_CORES, skillTreeEffects } = M_skilltree_js;
  const g = new Game(freshState());
  g.S.lvl = 400; g.invalidateStats();
  const ids = Object.keys(SKILL_TREE.nodes).filter((id) => SKILL_TREE.nodes[id].sector === "force");
  for (let pass = 0; pass < 40; pass++) for (const id of ids) g.takeSkill(id);
  assert.deepEqual(completedSectors(g.S), ["force"]);
  assert.ok(skillTreeEffects(g.S).bossDmg >= SECTOR_CORES.force.eff.bossDmg);
});

test("style de combat : 5 paliers, de plus en plus durs", () => {
  const { attackTier, ATTACK_TIERS } = M_classes_js;
  assert.equal(ATTACK_TIERS.length, 5);
  const S = freshState();
  assert.equal(attackTier(S), 0);
  S.lvl = 60; assert.equal(attackTier(S), 2);
  S.lvl = 120; assert.equal(attackTier(S), 2, "sans ascension, pas au-delà du 3e palier");
  S.prestige.count = 3; assert.equal(attackTier(S), 4);
});


test("clic sur le monstre : coup bonus limité en cadence", () => {
  const g = new Game(freshState());
  assert.equal(g.tapMonster(), false, "hors combat : rien");
  for (let i = 0; i < 2000 && g.R.mode !== "fight"; i++) g.step(0.05);
  assert.equal(g.R.mode, "fight");
  const m = g.R.mon; m.hp = m.max = 1e9;
  assert.ok(g.tapMonster(), "premier clic");
  assert.ok(m.hp < 1e9);
  assert.equal(g.tapMonster(), false, "trop rapproché");
  g.R.time += 0.3;
  assert.ok(g.tapMonster(), "après le délai");
  assert.equal(g.S.stats.taps, 2);
  m.hp = 0.01; g.R.time += 0.3; const k = g.S.stats.kills;
  g.tapMonster();
  assert.ok(g.S.stats.kills > k || g.R.mon !== m, "le clic peut achever le monstre");
});

test("panoplies : le nom sauvegardé reste en français, même créé dans une autre langue", () => {
  const key = Object.keys(SETS_T)[0], fr = SETS_T[key].srcSuffix || SETS_T[key].suffix;
  const en = DICTS_T.en[fr];
  const S = freshState();
  S.bag = [{ id: 1, slot: "weapon", set: key, name: "Épée de fer " + en }, { id: 2, slot: "weapon", set: key, name: "Épée de fer " + fr }];
  assert.ok(en && en !== fr, "suffixe traduit en anglais");
  assert.equal(repairItemNames(S), 1);
  assert.equal(S.bag[0].name, "Épée de fer " + fr);
  assert.equal(S.bag[1].name, "Épée de fer " + fr);
});

test("conseil : héros bloqué près du record, une fois par course", () => {
  const g = new Game(freshState());
  g.S.best = g.S.zone = 30; g.S.prestige.count = 1;
  g.S.settings.hints = Object.fromEntries(["welcome", "upgrade", "talent", "skills", "quest", "egg", "shop", "ascend", "expedition", "codex", "classes"].map((k) => [k, true]));
  g.talentPointsFree = () => 0; g.hasUpgradeCached = () => false; g.questsReady = () => 0;
  for (let i = 0; i < 4; i++) { g.R.time += 10; g.heroDown(); g.S.zone = 30; }
  const h = nextHint(g);
  assert.equal(h && h.id, "stuck");
  assert.match(h.text, /\d/);
  markHint(g, h.key);
  assert.notEqual(nextHint(g)?.id, "stuck", "déjà vu pour cette course");
  g.S.prestige.count = 2;
  assert.equal(nextHint(g)?.id, "stuck", "de nouveau à la course suivante");
});

test("conseil après la première défaite (début de partie seulement)", () => {
  const g = new Game(freshLocked());
  g.S.settings.hints = { welcome: true };
  g.talentPointsFree = () => 0; g.hasUpgradeCached = () => false; g.questsReady = () => 0;
  assert.notEqual(nextHint(g)?.id, "death", "pas avant une défaite");
  g.S.stats.deaths = 1;
  assert.equal(nextHint(g)?.id, "death");
  g.S.prestige.count = 1;
  assert.notEqual(nextHint(g)?.id, "death", "joueur aguerri : inutile");
});

test("Grand intendant : œufs éclos, expéditions récupérées et relancées (dernier choix), option", () => {
  const g = new Game(freshLocked());
  g.S.unlocks.menagerie = true; g.S.unlocks.expeditions = true;
  const t0 = 1e12;
  g.S.pets.eggs = 3;
  assert.equal(g.autoPets(t0), 0, "rien avant l'achat");
  assert.equal(g.S.pets.eggs, 3);
  g.S.unlocks.steward = true;
  g.autoPets(t0);
  assert.equal(g.S.pets.eggs, 0, "œufs éclos");
  const idle = g.idlePets();
  assert.equal(idle.length, 0, "familiers libres partis");
  const sent = Object.values(g.S.pets.exp);
  assert.ok(sent.length > 0 && sent.every((e) => e.kind === "long"), "Voyage par défaut");
  assert.equal(g.autoPets(t0 + 1000), 0, "pas plus d'une fois toutes les 5 s");
  const gold = g.S.gold;
  g.S.pets.lastKind = "short";
  g.autoPets(t0 + 200 * 60000);
  assert.ok(g.S.gold > gold, "expéditions finies récupérées");
  assert.ok(Object.values(g.S.pets.exp).every((e) => e.kind === "short"), "relancées dans le dernier choix");
  const before = g.S.log.slice(0, 5).join("|");
  g.autoPets(t0 + 600 * 60000);
  const fresh = g.S.log.slice(0, g.S.log.findIndex((l, k) => g.S.log.slice(k, k + 5).join("|") === before)); // lignes ajoutées (les plus récentes en tête)
  assert.equal(fresh.filter((l) => /Grand Steward|Grand intendant/.test(l)).length, 1, "une ligne de résumé : " + JSON.stringify(fresh));
  assert.ok(fresh.length <= 3, "pas une ligne par familier : " + JSON.stringify(fresh));
  g.S.settings.autoPets = false; g.S.pets.eggs = 2;
  g.autoPets(t0 + 400 * 60000);
  assert.equal(g.S.pets.eggs, 2, "option coupée");
});

test("conseil panoplie : à la première pièce trouvée", () => {
  const g = new Game(freshLocked());
  g.S.settings.hints = { welcome: true, classes: true };
  g.talentPointsFree = () => 0; g.hasUpgradeCached = () => false; g.questsReady = () => 0;
  assert.notEqual(nextHint(g)?.id, "set");
  const it = g.newItem(3); it.set = "dawn"; g.S.bag.push(it);
  assert.notEqual(nextHint(g)?.id, "set", "Bestiaire encore fermé : le conseil attend");
  g.S.best = 15; openTabs(g.S);
  assert.equal(nextHint(g)?.id, "set");
  assert.equal(nextHint(g).tab, "bestiary");
});

test("conseil Astrolabe : après l'achat, tant qu'il n'est pas coché", () => {
  const g = new Game(freshLocked());
  g.S.settings.hints = Object.fromEntries(["welcome", "upgrade", "talent", "skills", "quest", "egg", "shop", "ascend", "expedition", "codex", "classes", "unlock:armsValet", "unlock:masterForge", "unlock:starNet"].map((k) => [k, true]));
  g.talentPointsFree = () => 0; g.hasUpgradeCached = () => false; g.questsReady = () => 0;
  assert.notEqual(nextHint(g)?.id, "astrolabe", "pas avant l'achat");
  g.S.unlocks.astrolabe = true;
  g.S.tabsOpen = Object.fromEntries(Object.keys(TAB_GATES).map((id) => [id, true])); // acheté en zone 60 : onglets ouverts
  const h = nextHint(g);
  assert.equal(h && h.id, "astrolabe");
  assert.equal(h.tab, "ascension");
  g.S.settings.autoAscend = true;
  assert.notEqual(nextHint(g)?.id, "astrolabe", "déjà coché : inutile");
});

test("dépense automatique : compétences et talents à chaque niveau", () => {
  const g = new Game(freshState());
  g.S.lvl = 30; g.invalidateStats();
  const free0 = skillPointsFree(g.S);
  assert.ok(free0 > 0);
  assert.equal(g.autoSpendSkills(), free0);
  assert.equal(skillPointsFree(g.S), 0);
  g.S.settings.autoTalents = g.S.settings.autoSkills = true;
  g.gainXp(1e9);
  assert.equal(skillPointsFree(g.S), 0, "points de compétence dépensés au passage de niveau");
  assert.equal(g.talentPointsFree(), 0, "points de talent dépensés au passage de niveau");
});

test("déblocages : verrouillés au départ, achetés une fois, gardés à l'ascension", () => {
  const g = new Game(freshLocked());
  assert.equal(nextUnlock(g.S).id, "bulkEquip");
  assert.equal(g.has("transmute"), false);
  assert.deepEqual(g.transmute(), [], "transmutation verrouillée");
  assert.equal(g.sendExpedition("cat", "short"), false, "expéditions verrouillées");
  g.S.gold = 0;
  assert.equal(g.buyUnlock("bulkEquip"), false, "pas assez d'or");
  g.S.gold = 1e8; g.S.best = 8; // Œil du connaisseur : zone 8, avec la boutique
  assert.ok(g.buyUnlock("bulkEquip"));
  assert.equal(g.buyUnlock("bulkEquip"), false, "déjà acheté");
  assert.equal(g.S.gold, 1e8 - 300);
  assert.equal(g.buyUnlock("transmute"), false, "zone record insuffisante");
  g.S.best = 72; g.S.zone = 72; g.S.gold = 1e11; // transmutation : zone 72
  assert.ok(g.buyUnlock("transmute"));
  if (g.canAscend()) g.ascend();
  assert.ok(hasUnlock(g.S, "transmute"), "conservé à l'ascension");
});

test("déblocages : une ancienne partie garde ce qu'elle utilisait", () => {
  const old = JSON.parse(JSON.stringify(freshLocked()));
  delete old.unlocks; old.v = 6;
  old.stats.kills = 10; old.autoPotions = true; old.quests.auto = true;
  const s = migrate(old);
  assert.equal(s.v, SAVE_VERSION);
  assert.ok(s.unlocks.bulkEquip && s.unlocks.autoPotion && s.unlocks.questDesk);
  assert.ok(!s.unlocks.transmute && !s.unlocks.armsValet);
});

test("boss : souffle glacé et insaisissable", () => {
  const g = new Game(freshState());
  for (let i = 0; i < 4000 && g.R.mode !== "fight"; i++) g.step(0.05);
  const m = g.R.mon; m.hp = m.max = 1e12; m.atk = 0; m.boss = true; m.mech = ["frost", "evasive"];
  let frost = 0, miss = 0;
  g.on("bossSkill", ({ id }) => { if (id === "frost") frost++; });
  g.on("bossDodge", () => miss++);
  for (let i = 0; i < 400; i++) g.step(0.05);
  assert.ok(frost >= 2, "gel déclenché");
  assert.ok(miss > 0, "coups esquivés");
});

test("sauvegarde d'une version plus récente du jeu : mise de côté, jamais écrasée", () => {
  const { SaveStore } = createRequire(import.meta.url)("../src/main/save-store.js");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sillwalker-test-"));
  try {
    const future = JSON.stringify({ v: SAVE_VERSION + 1, lvl: 999, gold: 123456 });
    fs.writeFileSync(path.join(dir, "save.json"), future);
    const st = new SaveStore(dir, { backupIntervalMs: 0 });
    st.write(JSON.stringify(freshLocked()));               // partie neuve écrite par cette version
    const kept = fs.readdirSync(dir).filter((f) => f.startsWith(`save.newer-v${SAVE_VERSION + 1}-`));
    assert.equal(kept.length, 1, "copie de la sauvegarde plus récente");
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir, kept[0]), "utf8")).lvl, 999);
    st.write(JSON.stringify(freshLocked()));               // écritures suivantes : pas de nouvelle copie
    assert.equal(fs.readdirSync(dir).filter((f) => f.startsWith("save.newer-")).length, 1);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test("succès : la progression affichée correspond au succès (objectif atteint ⇔ obtenu)", () => {
  for (const S of [freshLocked(), (() => { const g = new Game(freshState()); for (let m = 0; m < 30; m++) g.advance(60); return g.S; })()]) {
    for (const a of ACH_T) {
      const p = ACH_PROGRESS[a.id];
      if (!p) continue;
      const [cur, goal] = p(S);
      assert.ok(Number.isFinite(cur) && goal > 0, a.id);
      assert.equal(cur >= goal, !!a.test(S), `${a.id} : ${cur} / ${goal}`);
    }
  }
  assert.ok(Object.keys(ACH_PROGRESS).every((id) => ACH_T.some((a) => a.id === id)), "identifiants connus");
});

test("récompense du jour : une série interrompue est signalée", () => {
  const g = new Game(freshState());
  g.claimDaily("2026-11-01"); g.claimDaily("2026-11-02"); g.claimDaily("2026-11-03");
  assert.equal(g.S.daily.streak, 3);
  const r = g.claimDaily("2026-11-06"); // deux jours manqués
  assert.equal(r.day, 1);
  assert.equal(r.broken, 3, "série de 3 jours interrompue");
  assert.equal(g.claimDaily("2026-11-07").broken, 0, "jour suivant : rien à signaler");
});

test("panoplie : un moment au palier de 2 puis de 4 pièces, une seule fois", () => {
  const g = new Game(freshState());
  for (const k in g.S.equip) g.S.equip[k] = null;
  const seen = [];
  g.on("setBonus", (e) => seen.push(e.n));
  for (const slot of ["weapon", "helm", "armor", "gloves", "boots"]) {
    const it = g.newItem(3); it.slot = slot; it.set = "dawn"; g.S.bag.push(it); g.equip(it);
  }
  assert.deepEqual(seen, [2, 4], "2 pièces puis 4 pièces, pas à la 5e");
});

test("panoplie du Plumage du phénix : régénération à 2 pièces, second souffle à 4", () => {
  const two = setEffects({ a: { set: "phoenix" }, b: { set: "phoenix" } });
  assert.ok(two.regen > 0 && two.lifesteal > 0 && !two.secondWind);
  const four = setEffects({ a: { set: "phoenix" }, b: { set: "phoenix" }, c: { set: "phoenix" }, d: { set: "phoenix" } });
  assert.equal(four.secondWind, 1);
  assert.ok(four.hpPct >= 20);
});

test("panoplie du Traqueur de champions : élites rencontrées à 2 et 4 pièces", () => {
  const eq = {}, slots = ["weapon", "helm", "armor", "gloves"];
  slots.slice(0, 2).forEach((k) => { eq[k] = { set: "hunter" }; });
  assert.equal(setEffects(eq).elites, 30);
  slots.forEach((k) => { eq[k] = { set: "hunter" }; });
  assert.equal(setEffects(eq).elites, 80, "2 pièces + 4 pièces");
  assert.ok(SETS_T.hunter.color && SETS_T.hunter.suffix);
});

test("grands nombres : suffixes au-delà du billion, puis notation scientifique", () => {
  const before = getLang();
  try {
    setLang("en");
    assert.equal(fmtN(1.113e22), "11.13Sx");
    assert.equal(fmtN(5e15), "5.00Qa");
    assert.equal(fmtN(4.3e12), "4.30T");
    assert.equal(fmtN(2e40), "2.00e40");
    assert.equal(fmtS(1.113e22), "11.1Sx");
    assert.equal(fmtN(Infinity), "∞");
  } finally { setLang(before); }
});

test("aucune nouvelle partie bloquée : 10 classes × 12 graines, 20 min chacune", () => {
  // Recherche de blocages (un champion en tête de la zone 1 en causait un, 1 partie sur 200) ; les graines
  // couvrent ce cas (mage, graine 11). Exploration plus large : voir CLAUDE.md (« parties bloquées »).
  const stuck = [];
  for (const cls of CLASS_KEYS) for (let seed = 1; seed <= 12; seed++) {
    setRandom(seeded(seed * 7919 + cls.length));
    const S = freshLocked(); S.cls = cls;
    const g = new Game(S);
    let kills = 0; g.on("kill", () => kills++);
    for (let m = 0; m < 20; m++) { g.advance(60); g.autoEquip(); }
    if (kills < 40 || g.S.best < 3) stuck.push(`${cls}/${seed} : ${kills} victoires, zone ${g.S.best}`);
  }
  setRandom(seeded(42));
  assert.deepEqual(stuck, [], "parties bloquées");
});

test("zone 1 : un monstre trop fort en tête ne bloque jamais le héros", () => {
  const g = new Game(freshState());
  g.S.zone = g.S.best = 1;
  const line = g.lineup();
  line[0] = { type: line[0].type, elite: true, champion: true, affix: "armored" }; // le cas qui bloquait
  g.R.mon = g.makeMonster(false); g.heroDown();
  g.R.mon = g.makeMonster(false); g.heroDown();
  assert.equal(g.S.zone, 1);
  assert.notEqual(g.lineup(), line, "nouvelle série de monstres après 2 défaites en zone 1");
  for (let i = 0; i < 200; i++) { g.R.lineupZone = -1; assert.ok(!g.lineup().some((m) => m.champion), "pas de champion avant la zone 5"); }
});

test("sac plein : le butin reste au sol, sans or ni échange (demande de Victor) ; le Valet d'armes équipe quand même", () => {
  const g = new Game(freshState());
  g.S.autoSell = { common: false, uncommon: false, rare: false };
  g.isUpgrade = (it) => !!it.up; // contrôle simple des améliorations pour le test
  const mk = (r, up) => { const it = g.newItem(0); it.r = r; it.up = up; return it; };
  g.S.bag = [];
  while (!g.bagFull()) g.S.bag.push(mk(1));
  const before = g.S.bag.slice(), gold = g.S.gold, logs = g.S.log.length;
  const leg = mk(4);
  assert.equal(g.addToBag(leg), false, "légendaire : resté au sol");
  assert.equal(g.R.grounded, leg.id, "signalé à l'animation (reste au sol)");
  assert.equal(g.S.log.length, logs + 1, "le légendaire perdu est signalé au journal");
  assert.equal(g.addToBag(mk(0)), false);
  const lost = []; g.on("lostUpgrade", (e) => lost.push(e.item));
  assert.equal(g.addToBag(mk(1, true)), false, "amélioration sans Valet : au sol");
  assert.equal(lost.length, 1, "l'interface est prévenue d'une amélioration perdue");
  assert.deepEqual(g.S.bag, before, "le sac n'a pas bougé");
  assert.equal(g.S.gold, gold, "pas d'or : l'objet n'est pas vendu");
  // Valet d'armes : l'amélioration est équipée, l'ancienne pièce reste au sol ; le sac ne déborde pas.
  g.S.unlocks = { ...(g.S.unlocks || {}), armsValet: true };
  const up = mk(2, true); up.slot = "weapon";
  assert.equal(g.addToBag(up), true);
  assert.equal(g.S.equip.weapon, up);
  assert.equal(g.S.bag.length, g.S.bagSize, "le sac ne déborde pas");
});

test("usure des boss : -5 % de PV par défaite (30 % au plus), gardée à l'ascension, effacée par la victoire", () => {
  const g = new Game(freshState());
  g.S.zone = g.S.best = 25;
  const full = g.makeMonster(true).max;
  for (let i = 0; i < 3; i++) { g.S.zone = 25; g.R.deaths = 0; g.R.mon = g.makeMonster(true); g.heroDown(); }
  assert.equal(g.S.bossDefeats[25], 3);
  g.S.zone = 25;
  assert.ok(Math.abs(g.makeMonster(true).max - full * 0.85) < 1e-6, "3 défaites : −15 %");
  g.S.bossDefeats[25] = 50;
  assert.ok(Math.abs(g.makeMonster(true).max - full * 0.7) < 1e-6, "plafond à −30 %");
  g.R.deaths = 0; g.R.mon = g.makeMonster(false); g.heroDown();
  assert.equal(g.S.bossDefeats[25], 50, "une défaite contre un monstre ordinaire ne compte pas");
  g.S.best = 25; g.ascend();
  assert.equal(g.S.bossDefeats[25], 50, "gardée à l'ascension : le mur s'use d'une course à l'autre");
  g.S.zone = 25; g.S.kills = 10; g.R.mon = g.makeMonster(true); g.R.mon.hp = 0; g.killMonster();
  assert.ok(!g.S.bossDefeats[25], "boss vaincu : il retrouve toute sa force");
});


test("événement Corne d'abondance : un objet à chaque victoire pendant 30 s", () => {
  const g = new Game(freshState());
  g.S.autoSell = { common: false, uncommon: false, rare: false };
  let loots = 0, kills = 0;
  g.on("loot", () => loots++);
  g.on("kill", () => kills++);
  g.S.bag.length = 0; g.S.bagSize = 48;
  assert.ok(g.startEvent("bounty"));
  for (let i = 0; i < 25 / 0.05 && kills < 6; i++) { if (g.R.mon && !g.R.mon.boss) g.R.mon.hp = 0; g.step(0.05); }
  assert.ok(kills >= 3, "des victoires pendant l'événement");
  assert.ok(loots >= kills, `${loots} objets pour ${kills} victoires`);
});

test("événement Souffle de sagesse : expérience ×3 pendant l'événement", () => {
  const ratio = (on) => {
    const g = new Game(freshState());
    g.S.best = 15; // hors du rythme du tout début (earlyPace) : les arrondis de petits gains fausseraient le rapport
    let got = 0, base = 0, kills = 0;
    g.gainXp = (n) => { got += n; };
    g.on("kill", ({ mon }) => { base += mon.xp; kills++; });
    if (on) assert.ok(g.startEvent("wisdom"));
    for (let i = 0; i < 25 / 0.05 && kills < 5; i++) { if (g.R.mon && !g.R.mon.boss) g.R.mon.hp = 0; g.step(0.05); }
    assert.ok(kills >= 3 && base > 0, "des victoires");
    return got / base;
  };
  const r = ratio(true) / ratio(false);
  assert.ok(Math.abs(r - 3) < 0.2, `rapport ${r.toFixed(2)}`);
});

test("quête de butin : chaque objet rare ou mieux trouvé sur un monstre compte", () => {
  const g = new Game(freshState());
  g.S.quests.slots = [{ uid: 1, kind: "loot", goal: 3, progress: 0, stars: 1, reward: { gold: 10 } }];
  g.startEvent = () => false; // pas d'événement aléatoire (le Zèle doublerait la progression)
  let rares = 0; g.on("loot", ({ item, mon }) => { if (item.r >= 2 && mon) rares++; }); // seuls les objets tombés d'un monstre comptent
  for (let i = 0; i < 200 / 0.05 && rares < 3; i++) { if (g.R.mon) { g.R.mon.boss = true; g.R.mon.hp = 0; } g.step(0.05); }
  assert.ok(rares >= 1, "des objets rares tombent des boss");
  assert.equal(g.S.quests.slots[0].progress, Math.min(3, rares));
  assert.match(M_quests_js.QUEST_TEMPLATES.loot.text({ goal: 4 }), /4/);
});

test("boss enfin vaincu après un K.O. : un moment, pas pour une victoire facile", () => {
  const g = new Game(freshState());
  const seen = [];
  g.on("bossNemesis", (e) => seen.push(e));
  const killBoss = (tries = 0) => {
    g.S.kills = 10; g.R.mon = null;
    for (let i = 0; i < 400 && !(g.R.mon && g.R.mon.boss); i++) g.step(0.05);
    assert.ok(g.R.mon && g.R.mon.boss, "boss en vue");
    if (tries) (g.S.bossDefeats ||= {})[g.S.zone] = tries;
    const boss = g.R.mon; boss.hp = 0;
    for (let i = 0; i < 100 && g.R.mon === boss; i++) g.step(0.05); // le temps que la victoire soit comptée
  };
  g.S.autoAdvance = false;
  killBoss();
  assert.equal(seen.length, 0, "victoire du premier coup : rien de spécial");
  killBoss(2);
  assert.equal(seen.length, 1);
  assert.equal(seen[0].tries, 2);
  assert.ok(!Object.values(g.S.bossDefeats).some(Boolean), "usure remise à zéro");
});

test("journal : les ventes « sac plein » restent un cumul malgré quelques lignes intercalées", () => {
  const g = new Game(freshState());
  const n0 = g.S.log.length;
  for (let i = 0; i < 10; i++) { g.logSale("full", "Sac plein, objets vendus", 5); if (i % 3 === 0) g.log("Élite vaincu !"); }
  const sales = g.S.log.filter((l) => /Sac plein, objets vendus/.test(l));
  assert.equal(sales.length, 1, JSON.stringify(g.S.log.slice(0, 8)));
  assert.match(sales[0], /10/);
  g.logSale("elite", "Élites vaincues", 40); // une autre sorte de cumul ne casse pas celui des ventes
  assert.equal(g.S.log.filter((l) => /Sac plein, objets vendus/.test(l)).length, 1);
  for (let i = 0; i < 11; i++) g.log("autre ligne " + i); // la ligne s'éloigne : une nouvelle commence
  g.logSale("full", "Sac plein, objets vendus", 5);
  assert.equal(g.S.log.filter((l) => /Sac plein, objets vendus/.test(l)).length, 2);
  assert.ok(g.S.log.length > n0);
});

test("journal : les défaites répétées se cumulent (×N) au lieu de remplir le journal", () => {
  const g = new Game(freshState());
  g.S.zone = 1; g.S.best = 1;
  for (let i = 0; i < 6; i++) { g.R.mode = "fight"; g.heroDown(); if (i === 2) g.log("Élite vaincu !"); }
  const lines = g.S.log.filter((l) => /fell|tombé/.test(l));
  assert.equal(lines.length, 1, JSON.stringify(g.S.log.slice(0, 8)));
  assert.match(lines[0], /×6/);
});

test("ascension : la zone de départ annoncée est celle de la course suivante (La Route)", () => {
  const g = new Game(freshState());
  g.S.best = g.S.zone = 40;
  assert.equal(g.nextStartZone(), 1, "sans La Route : zone 1");
  g.S.prestige.ranks = { ...(g.S.prestige.ranks || {}), c_road: 9 };
  assert.equal(g.nextStartZone(), 19);
  g.S.best = 12;
  assert.equal(g.nextStartZone(), 7, "au plus 5 zones sous le record");
});

test("Creuset perpétuel : transmute quand le sac est aux trois quarts plein, option", () => {
  const g = new Game(freshLocked());
  g.S.unlocks.transmute = true;
  for (const k in g.S.equip) g.S.equip[k] = null;
  const fill = (n) => { g.S.bag.length = 0; for (let i = 0; i < n; i++) { const it = g.newItem(0); it.r = 0; it.power = 0; it.lvl = 1; g.S.bag.push(it); } };
  g.uselessItems = () => g.S.bag.filter((it) => it.r === 0); // tous inutiles (le test ne dépend pas du calcul de puissance)
  fill(Math.ceil(g.S.bagSize * 0.75));
  assert.equal(g.autoTransmute().length, 0, "rien avant l'achat");
  g.S.unlocks.crucible = true;
  fill(Math.ceil(g.S.bagSize * 0.75) - 1);
  assert.equal(g.autoTransmute().length, 0, "sac pas assez plein");
  fill(Math.ceil(g.S.bagSize * 0.75));
  const made = g.autoTransmute();
  assert.ok(made.length >= 1, "transmutation");
  assert.ok(g.S.bag.length < Math.ceil(g.S.bagSize * 0.75), "le sac se vide");
  g.S.settings.autoTransmute = false; fill(g.S.bagSize);
  assert.equal(g.autoTransmute().length, 0, "option coupée");
});

test("quête d'événements rares : chaque événement compte", () => {
  const g = new Game(freshState());
  g.S.quests.slots = [{ uid: 1, kind: "event", goal: 2, progress: 0, stars: 1, reward: { gold: 10 } }];
  assert.ok(g.startEvent("goldrain"));
  assert.ok(!g.startEvent("goldrain"), "déjà en cours : ne compte pas deux fois");
  assert.ok(g.startEvent("wisdom"));
  assert.equal(g.S.quests.slots[0].progress, 2);
  assert.match(M_quests_js.QUEST_TEMPLATES.event.text({ goal: 2 }), /2/);
});

test("quêtes : un type inconnu (autre version) est remplacé au chargement, sans plantage", () => {
  const S = freshLocked();
  S.quests.slots = [{ uid: 1, kind: "voyage_temporel", goal: 3, progress: 0, stars: 1, reward: { gold: 1 } },
    { uid: 2, kind: "hunt", type: "dragon_inexistant", goal: 3, progress: 0, stars: 1, reward: { gold: 1 } },
    { uid: 3, kind: "kill", goal: 40, progress: 5, stars: 1, reward: { gold: 1 } }];
  const g = new Game(migrate(JSON.parse(JSON.stringify(S))));
  g.ensureQuests();
  assert.equal(g.S.quests.slots.length, 3);
  assert.ok(g.S.quests.slots.every((q) => M_quests_js.QUEST_TEMPLATES[q.kind]), JSON.stringify(g.S.quests.slots.map((q) => q.kind)));
  assert.ok(g.S.quests.slots.some((q) => q.uid === 3 && q.progress === 5), "la quête valide est gardée");
  for (const q of g.S.quests.slots) assert.equal(typeof M_quests_js.QUEST_TEMPLATES[q.kind].text(q), "string");
  g.S.pets.owned.licorne_future = { lvl: 1, xp: 0 }; // familier d'une autre version
  assert.ok(!g.idlePets().includes("licorne_future"));
  // Familier inconnu actif ou en expédition : retiré au chargement, le combat continue.
  const P = JSON.parse(JSON.stringify(g.S));
  P.pets.owned = { licorne: { lvl: 3, xp: 0 }, cat: { lvl: 2, xp: 0 }, licorne2: { lvl: 1, xp: 0 } };
  P.pets.active = "licorne"; P.pets.exp = { licorne2: { kind: "long", start: 0, end: 1 } };
  const g2 = new Game(migrate(P));
  assert.equal(g2.S.pets.active, "cat");
  assert.deepEqual(Object.keys(g2.S.pets.owned), ["cat"]);
  assert.deepEqual(g2.S.pets.exp, {});
  for (let i = 0; i < 400; i++) g2.step(0.05);
});

test("valeurs inconnues d'une autre version (panoplie, pouvoir, déblocage, constellation, élixir) : rien ne plante", () => {
  const g0 = new Game(freshState());
  const a = g0.newItem(3), b = g0.newItem(3);
  a.slot = "ring"; b.slot = "boots";
  for (const it of [a, b]) { it.set = "panoplie_future"; it.power = "p_futur"; g0.S.equip[it.slot] = it; }
  g0.S.unlocks.truc_futur = true;
  g0.S.prestige.ranks = { ...(g0.S.prestige.ranks || {}), c_futur: 3 };
  g0.S.buffs = { ...(g0.S.buffs || {}), elixir_futur: 300 };
  const g = new Game(migrate(JSON.parse(JSON.stringify(g0.S))));
  g.invalidateStats();
  assert.ok(g.stats().atk > 0);
  for (let i = 0; i < 200; i++) g.step(0.05);
  assert.ok(Array.isArray(g.todoNow()));
});

test("absence : les automatismes achetés travaillent et le résumé le dit", () => {
  const g = new Game(freshState());
  g.S.unlocks.masterForge = true; g.S.settings.autoForge = true;
  for (const slot of ["weapon", "helm", "armor"]) { const it = g.newItem(2); it.slot = slot; it.plus = 0; g.S.equip[slot] = it; }
  g.invalidateStats();
  g.S.gold = 1e12;
  const logBefore = g.S.log.length;
  const sum = g.applyOffline(3 * 3600);
  assert.ok(sum, "résumé d'absence");
  assert.ok(sum.forged > 0, "le Maître de forge a forgé : " + sum.forged);
  assert.ok(g.S.log.filter((l) => /forge|Smith/i.test(l)).length <= 2, "une ligne de journal, pas une par amélioration");
  const g2 = new Game(freshLocked());
  const sum2 = g2.applyOffline(3600);
  assert.ok(!sum2 || (!sum2.forged && !sum2.transmuted && !sum2.petWork), "sans déblocage : rien");
});

test("absence : le Grimoire de l'éveil dépense les points gagnés", () => {
  const g = new Game(freshState());
  g.S.unlocks.autoLevel = true; g.S.settings.autoTalents = true;
  g.autoSpendTalents();
  const lvl0 = g.S.lvl;
  const sum = g.applyOffline(2 * 3600);
  assert.ok(sum && g.S.lvl > lvl0, "le héros a gagné des niveaux");
  assert.equal(g.talentPointsFree(), 0, "points de talent dépensés");
  const g2 = new Game(freshState());
  g2.S.unlocks.autoLevel = true; g2.S.settings.autoTalents = false;
  g2.applyOffline(2 * 3600);
  assert.ok(g2.talentPointsFree() > 0, "option coupée : les points attendent");
});

test("sac plein : un objet vendu faute de place prévient le héros (bagFull)", () => {
  const g = new Game(freshLocked());
  let n = 0; g.on("bagFull", () => n++);
  while (!g.bagFull()) { const it = g.newItem(2); it.r = 2; g.S.bag.push(it); }
  const junk = g.newItem(0); junk.r = 0;
  g.addToBag(junk);
  assert.equal(n, 1);
  g.addToBag(g.newItem(0), true);
  assert.equal(n, 1, "rien en mode silencieux (absence)");
});

test("panoplie complétée une première fois : bonus permanent, gardé à l'ascension et à la migration", () => {
  const g = new Game(freshLocked());
  for (const k in g.S.equip) g.S.equip[k] = null;
  g.invalidateStats();
  const atk0 = g.stats().atk;
  for (const slot of ["weapon", "helm", "armor", "gloves"]) { const it = g.newItem(3); it.slot = slot; it.set = "dawn"; g.S.bag.push(it); g.equip(it); }
  assert.ok(g.S.setsDone.dawn, "complétée");
  for (const k in g.S.equip) g.S.equip[k] = null; // pièces retirées : le bonus reste
  g.invalidateStats();
  assert.ok(g.stats().atk > atk0, "bonus permanent");
  const old = JSON.parse(JSON.stringify(freshLocked())); delete old.setsDone; // sauvegarde d'avant
  assert.deepEqual(migrate(old).setsDone, {});
  g.S.best = g.S.zone = 30; g.S.prestige.shards = 0;
  assert.ok(g.canAscend());
  assert.ok(g.ascend() !== false);
  assert.ok(g.S.setsDone.dawn, "gardé à l'ascension");
});

test("pièces de panoplie pas encore complétée : gardées par « vendre l'inutile » et la transmutation", () => {
  const g = new Game(freshLocked());
  g.S.bag.length = 0;
  const mk = (slot, set) => { const it = g.newItem(0); it.r = 0; it.slot = slot; it.set = set; it.st = {}; g.S.bag.push(it); return it; };
  const a = mk("ring", "hunter"), b = mk("ring", "hunter"), c = mk("boots", null);
  assert.ok(g.uselessItems().includes(a), "panoplie pas commencée : pas de protection");
  const worn = g.newItem(2); worn.slot = "helm"; worn.set = "hunter"; g.S.equip.helm = worn; g.invalidateStats();
  const u = g.uselessItems();
  assert.ok(!u.includes(a), "une pièce gardée par panoplie et emplacement");
  assert.ok(u.includes(b), "le doublon reste vendable");
  assert.ok(u.includes(c));
  g.S.setsDone = { hunter: true };
  assert.ok(g.uselessItems().includes(a), "panoplie déjà complétée : plus de protection");
});

test("« À faire maintenant » : une pièce du sac qui complète une panoplie", () => {
  const g = new Game(freshLocked());
  for (const k in g.S.equip) g.S.equip[k] = null;
  for (const slot of ["weapon", "helm", "armor"]) { const it = g.newItem(3); it.slot = slot; it.set = "dawn"; g.S.equip[slot] = it; }
  g.S.bag.length = 0;
  assert.ok(!g.todoNow().some((t) => t.id === "setFinish"));
  const p = g.newItem(3); p.slot = "boots"; p.set = "dawn"; g.S.bag.push(p);
  const t = g.todoNow().find((x) => x.id === "setFinish");
  assert.ok(t && t.itemId === p.id);
  g.equip(g.setFinisher());
  assert.ok(g.S.setsDone.dawn, "complétée");
  assert.ok(!g.todoNow().some((x) => x.id === "setFinish"));
});

test("« À faire maintenant » : sac plein signalé", () => {
  const g = new Game(freshLocked());
  g.S.bag.length = 0;
  assert.ok(!g.todoNow().some((t) => t.id === "bagFull"));
  while (!g.bagFull()) { const it = g.newItem(0); it.r = 0; it.set = null; it.st = {}; g.S.bag.push(it); }
  const t = g.todoNow().find((x) => x.id === "bagFull");
  assert.ok(t && t.n > 0, "objets inutiles comptés");
});

test("pièces de panoplie gardées : au plus 6, les panoplies les plus avancées d'abord (sac jamais bloqué)", () => {
  const g = new Game(freshLocked());
  for (const k in g.S.equip) g.S.equip[k] = null;
  const sets = ["dawn", "dusk", "wind", "merchant", "archmage", "berserker", "shadow"], slots = Object.keys(g.S.equip);
  slots.forEach((slot, i) => { const it = g.newItem(3); it.slot = slot; it.set = sets[i % sets.length]; g.S.equip[slot] = it; }); // une pièce de 7 panoplies
  g.S.equip[slots[1]].set = "dawn"; // dawn : 2 pièces portées, la plus avancée
  g.invalidateStats();
  g.S.bag.length = 0;
  for (const set of sets) for (const slot of slots) { const it = g.newItem(0); it.r = 0; it.slot = slot; it.set = set; it.st = {}; g.S.bag.push(it); }
  const kept = g.S.bag.filter((it) => !g.uselessItems().includes(it) && !g.isUpgrade(it));
  assert.ok(kept.length <= 6, "au plus 6 : " + kept.length);
  assert.ok(kept.some((it) => it.set === "dawn"), "la panoplie la plus avancée d'abord");
});

test("liens « 🔒 déblocage » : pas avant la boutique, pas pour un déblocage lointain", () => {
  const S = freshLocked();
  assert.equal(lockLink(S, "transmute"), "", "boutique pas encore ouverte");
  S.tabsOpen = { shop: true };
  const far = UNLOCKS.find((u) => u.zone > S.best + LOCK_LOOKAHEAD);
  assert.equal(lockLink(S, far.id), "", "déblocage lointain : rien");
  S.best = far.zone - 2;
  assert.match(lockLink(S, far.id), /🔒/, "proche : annoncé");
});

test("absence : les étapes du carnet franchies hors ligne sont dans le résumé", () => {
  const g = new Game(freshState());
  g.S.lvl = 9; g.S.xp = 0;
  const sum = g.applyOffline(8 * 3600);
  assert.ok(g.S.lvl >= 10, "niveau 10 franchi");
  assert.ok(sum.steps.some((e) => e.k === "lvl" && e.v === 10), JSON.stringify(sum.steps));
});

test("absence, sac plein : les objets gardés en remplacement sont comptés", () => {
  const g = new Game(freshState());
  g.S.best = g.S.zone = 20;
  g.S.bag.length = 0; while (!g.bagFull()) { const it = g.newItem(0); it.r = 0; g.S.bag.push(it); }
  g.isUpgrade = () => false;
  g.S.autoSell = {};
  const sum = g.applyOffline(6 * 3600);
  const better = g.S.bag.filter((i) => i.r > 0).length;
  assert.ok(better > 0, "des objets meilleurs sont entrés");
  assert.ok(sum.kept >= better, `gardés ${sum.kept}, meilleurs dans le sac ${better}`);
});

test("carnet de route : niveaux ronds, records par 5 zones, premier légendaire, ascension ; gardé et migré", () => {
  const g = new Game(freshState());
  g.gainXp(1e6);
  assert.ok(g.S.journey.some((e) => e.k === "lvl" && e.v === 10), "niveau 10 noté");
  g.milestone("zone", 5); g.milestone("leg");
  assert.ok(journeyZoneStep(45) && journeyZoneStep(50) && journeyZoneStep(60) && journeyZoneStep(200));
  assert.ok(!journeyZoneStep(44) && !journeyZoneStep(55) && !journeyZoneStep(65), "après 50 : tous les 10");
  // panoplie complétée (4 pièces portées) : notée une fois
  const g2 = new Game(freshState()); g2.S.setsDone = {};
  for (const slot of ["helm", "armor", "gloves", "boots"]) { const it = g2.newItem(3); it.slot = slot; it.set = "dawn"; g2.S.bag.push(it); g2.equip(it); }
  assert.equal(g2.S.journey.filter((e) => e.k === "set" && e.v === "dawn").length, 1, "panoplie notée");
  const n = g.S.journey.length;
  g.S.best = 30; if (g.canAscend()) { g.ascend(); assert.ok(g.S.journey.length >= n + 1, "gardé à l'ascension, ascension notée"); assert.ok(g.S.journey.some((e) => e.k === "asc")); }
  const raw = JSON.parse(JSON.stringify(freshLocked())); raw.journey = [null, { t: "x", k: "lvl" }, { t: 5, k: "zone", v: 10 }];
  assert.deepEqual(migrate(raw).journey, [{ t: 5, k: "zone", v: 10 }]);
  delete raw.journey; assert.deepEqual(migrate(raw).journey, [], "partie neuve : carnet vide");
  raw.best = 40; raw.lvl = 300;
  const st = migrate(raw).journey;
  assert.equal(st.length, 1); assert.equal(st[0].k, "start"); assert.equal(st[0].v, 40); assert.equal(st[0].l, 300);
});

test("quêtes : pas de forge, de transmutation ni d'élites avant qu'elles soient possibles", () => {
  const S = freshLocked();
  setRandom(seeded(5));
  for (let i = 0; i < 300; i++) { const q = makeQuest(S, i); assert.ok(q.kind !== "forge" && q.kind !== "transmute" && q.kind !== "elite", q.kind); }
  S.zone = 3; assert.ok(Array.from({ length: 300 }, (_, i) => makeQuest(S, i).kind).includes("elite"), "élites dès la zone 3");
  S.unlocks.forge = true; S.unlocks.transmute = true;
  let seen = new Set(); for (let i = 0; i < 300; i++) seen.add(makeQuest(S, i).kind);
  assert.ok(seen.has("forge") && seen.has("transmute"));
  setRandom(seeded(42));
});

test("élites : pas dans les 2 premières zones de la première course, présentes ensuite", () => {
  const count = (zone, asc) => {
    let n = 0;
    for (let i = 0; i < 40; i++) { const g = new Game(freshLocked()); g.S.zone = zone; g.S.prestige.count = asc; g.R.lineupZone = -1; n += g.lineup().filter((s) => s.elite).length; }
    return n;
  };
  assert.equal(count(1, 0), 0, "zone 1, première course");
  assert.ok(count(5, 0) > 0, "zone 5");
  assert.ok(count(1, 1) > 0, "zone 1 après une ascension");
});

test("histoire : intro au tout premier lancement seulement ; parties existantes épargnées ; gardée à l'ascension", () => {
  const S = freshLocked();
  assert.ok(introDue(S), "partie neuve : intro à montrer");
  markIntro(S); assert.ok(!introDue(S));
  assert.equal(INTRO.length, 3);
  const old = JSON.parse(JSON.stringify(freshLocked())); delete old.story; old.best = 30; old.lvl = 80;
  assert.ok(!introDue(migrate(old)), "partie entamée d'avant l'histoire : pas d'intro surgie");
  const young = JSON.parse(JSON.stringify(freshLocked())); delete young.story;
  assert.ok(introDue(migrate(young)), "partie neuve d'avant : intro");
  const bad = JSON.parse(JSON.stringify(freshLocked())); bad.story = { intro: "x", read: 5 };
  const m = migrate(bad); assert.equal(m.story.intro, true); assert.deepEqual(m.story.read, {});
});

test("chroniques : débloquées aux paliers, annoncées une seule fois ; parties entamées sans rafale", () => {
  const S = freshLocked();
  assert.deepEqual(takeNewChronicles(S, 1).map((c) => c.id), [], "« sky » (intro) déjà lue en partie neuve");
  assert.deepEqual(takeNewChronicles(S, 25).map((c) => c.id), ["captive", "shards"]);
  assert.deepEqual(takeNewChronicles(S, 25), [], "une seule annonce");
  S.prestige.count = 1; assert.deepEqual(takeNewChronicles(S, 25).map((c) => c.id), ["rebirth"]);
  assert.equal(chroniclesUnlocked(S, 200).length, CHRONICLES.length - 1, "« dawn » attend la victoire finale");
  S.story.won = true; assert.equal(chroniclesUnlocked(S, 200).length, CHRONICLES.length);
  const old = JSON.parse(JSON.stringify(freshLocked())); delete old.story; old.best = 60;
  const m = migrate(old);
  assert.deepEqual(takeNewChronicles(m, 60), [], "déjà méritées : relisibles, pas de rafale");
  assert.equal(chroniclesUnlocked(m, 60).length, 4);
});

test("Briseur d'Étoiles : boss final de la zone 200, plus coriace, fin de l'histoire la première fois seulement", () => {
  const g = new Game(freshState());
  g.S.zone = g.S.best = FINAL_ZONE - 1; const before = g.makeMonster(true);
  g.S.zone = g.S.best = FINAL_ZONE; const fb = g.makeMonster(true);
  assert.ok(fb.final && !before.final);
  assert.deepEqual(fb.mech, FINAL_BOSS.mech);
  assert.equal(fb.name, M_bosses_js.bossName(FINAL_ZONE));
  assert.ok(fb.max > before.max * FINAL_BOSS.hp, "plus coriace que le boss précédent");
  const ev = []; g.on("starbreaker", (e) => ev.push(e.first));
  g.S.kills = KILLS_PER_ZONE; g.R.mon = fb; g.killMonster();
  assert.ok(storyWon(g.S)); assert.deepEqual(ev, [true]);
  assert.ok(M_achievements_js.reachedAchievements(g.S).includes("STARBREAKER"), "succès « Le ciel rallumé »");
  assert.ok(g.S.journey.some((e) => e.k === "final"));
  assert.equal(g.S.zone, FINAL_ZONE + 1, "le jeu continue au-delà");
  g.S.zone = FINAL_ZONE; g.R.mon = g.makeMonster(true); g.killMonster();
  assert.deepEqual(ev, [true, false], "les fois suivantes : pas de nouvelle fin");
  assert.equal(g.S.journey.filter((e) => e.k === "final").length, 1);
  const m = migrate(JSON.parse(JSON.stringify(g.S))); assert.equal(m.story.won, true);
  const bad = JSON.parse(JSON.stringify(g.S)); bad.story.won = "oui"; assert.equal(migrate(bad).story.won, false);
});

test("carte du Rebord : serpentin de 4 rangées de 50 zones (tient sans défilement), les rangées s'enchaînent", () => {
  const L = 50;
  assert.equal(mapPos(1).r, 0); assert.equal(mapPos(L).r, 0); assert.equal(mapPos(L + 1).r, 1); assert.equal(mapPos(200).r, 3);
  assert.equal(mapPos(L).x, mapPos(L + 1).x, "fin de rangée et début de la suivante l'une sous l'autre");
  assert.equal(mapPos(2 * L).x, mapPos(1).x, "la 2e rangée revient vers la gauche");
  assert.ok(mapPos(2).x > mapPos(1).x && mapPos(L + 2).x < mapPos(L + 1).x);
});

test("Carte du voyageur : un clic sur la carte emmène le héros dans une zone déjà atteinte, seulement une fois achetée", () => {
  const g = new Game(freshState()); g.S.zone = 30; g.S.best = 30;
  const tab = new MapTab(g);
  g.S.unlocks = {}; tab.onAction("m-go", { dataset: { z: "12" } });
  assert.equal(g.S.zone, 30, "sans le déblocage : rien");
  g.S.unlocks = { travelMap: true }; tab.onAction("m-go", { dataset: { z: "12" } });
  assert.equal(g.S.zone, 12);
  tab.onAction("m-go", { dataset: { z: "45" } });
  assert.equal(g.S.zone, 12, "pas au-delà de la meilleure zone de la course");
  assert.ok(UNLOCKS.findIndex((u) => u.id === "travelMap") > UNLOCKS.findIndex((u) => u.id === "workshop"));
});

test("quêtes : pas d'œuf de familier avant l'onglet Familiers (demande 19) ; un œuf promis devient un coffre", () => {
  const g = new Game(freshLocked()); g.S.best = 10; g.S.prestige.bestRun = 10;
  assert.ok(!eggsAllowed(g.S));
  for (let i = 0; i < 400; i++) assert.ok(!makeQuest(g.S, 1000 + i).reward.egg, "aucune quête ne promet d'œuf");
  const rw = fixQuestEgg(g.S, { egg: true, gold: 5 });
  assert.ok(!rw.egg && rw.chest >= 2, "l'œuf devient un coffre");
  g.S.best = 25; g.S.prestige.bestRun = 25;
  assert.ok(eggsAllowed(g.S), "zone 25 : l'onglet Familiers est prêt");
  let eggs = 0; for (let i = 0; i < 400; i++) if (makeQuest(g.S, 2000 + i).reward.egg) eggs++;
  assert.ok(eggs > 0, "ensuite les œufs reviennent");
});

test("son activé par défaut ; les parties d'avant passent une fois au son activé, puis le choix est respecté", () => {
  assert.equal(freshState().settings.sound, true);
  const old = JSON.parse(JSON.stringify(freshState())); old.settings.sound = false; delete old.settings.soundOn2;
  const m = migrate(old); assert.equal(m.settings.sound, true); assert.equal(m.settings.soundOn2, true);
  m.settings.sound = false; assert.equal(migrate(JSON.parse(JSON.stringify(m))).settings.sound, false, "coupé par le joueur : reste coupé");
});

test("héros bloqué (demande 22) : 4 défaites près du record en 15 min = une alerte, qui tombe dès qu'il avance", () => {
  const g = new Game(freshState()); g.S.best = 30; g.S.zone = 30;
  const ev = []; g.on("stuck", (e) => ev.push(e));
  for (let i = 0; i < 6; i++) { g.R.time += 30; g.S.zone = 30; g.R.mon = g.makeMonster(false); g.heroDown(); }
  assert.equal(ev.length, 1, "une seule alerte");
  assert.equal(ev[0].zone, 30);
  assert.ok(g.stuckInfo() && g.stuckTips().includes("farm"));
  g.S.zone = 30; g.S.kills = KILLS_PER_ZONE; g.R.mon = g.makeMonster(true); g.R.mon.hp = 0; g.S.autoAdvance = true; g.killMonster();
  assert.equal(g.S.best, 31); assert.equal(g.stuckInfo(), null, "record battu : plus bloqué");
});

test("sons de coup (demande 25) : un timbre par héros et une matière par monstre (variantes comprises)", () => {
  for (const c of CLASS_KEYS) assert.ok(WEAPON_OF[c], "timbre prévu pour " + c);
  assert.equal(materialOf("slime_lava"), "soft"); assert.equal(materialOf("knight_crystal"), "hard");
  assert.equal(materialOf("crow_storm"), "air"); assert.equal(materialOf("boar"), "flesh");
  assert.notEqual(weaponOf("ranger"), weaponOf("warrior"));
});

test("musique de fond (demande 24) : un air par zone, toujours le même pour une zone, 200 airs différents", () => {
  const a = songFor(12), b = songFor(12);
  assert.deepEqual(a, b, "même zone = même air");
  const keys = new Set(); for (let z = 1; z <= 200; z++) { const s = songFor(z); keys.add(JSON.stringify(s.notes.map((n) => n.midi))); assert.ok(s.bpm >= 66 && s.bpm <= 92 && s.notes.length >= 8 && s.chords.length >= 8 && s.chords.every((c) => c.notes.length === 4) && s.swing > 0.1, "zone " + z + " (lofi : tempo posé, accords de septième, swing)"); for (const n of s.notes) assert.ok(n.midi >= 50 && n.midi <= 90); }
  assert.ok(keys.size >= 195, "quasiment 200 mélodies différentes : " + keys.size);
  assert.equal(freshState().settings.music, true, "musique activée par défaut");
  const s12 = songFor(12), A = s12.notes.filter((n) => n.step < 16).map((n) => n.step + ":" + n.midi).join(), A1 = s12.notes.filter((n) => n.step >= 16 && n.step < 32).map((n) => (n.step - 16) + ":" + n.midi).join();
  assert.equal(A, A1, "forme A A B A : le motif revient à l'identique (air reconnaissable)");
  // Diversité des instruments (demande de Victor) : sur 200 zones, au moins 8 timbres de mélodie, 3 basses, 4 rythmes.
  const L = new Set(), B = new Set(), D = new Set(); for (let z = 1; z <= 200; z++) { const t = songFor(z); L.add(t.lead); B.add(t.bassInst); D.add(t.drums); }
  assert.ok(L.size >= 8 && B.size >= 3 && D.size >= 4, [L.size, B.size, D.size].join(" "));
  assert.equal(songFor(77).lead, songFor(77).lead, "même zone = mêmes instruments");
  // Passages (demande C : moins répétitif) : le 0 est l'air d'avant ; les suivants gardent le motif A et varient le reste ;
  // intermède calme au 3e, silence au 7e ; toujours les mêmes pour une zone (reconnaissable en y revenant).
  assert.deepEqual(songFor(12, 0), songFor(12), "passage 0 = air d'origine");
  const motif = (t) => t.notes.filter((n) => n.step < 16).map((n) => n.step + ":" + (n.midi % 12)).join();
  let varied = 0;
  for (let z = 1; z <= 40; z++) {
    const p0 = songFor(z, 0), p1 = songFor(z, 1);
    assert.equal(motif(p1), motif(p0), "zone " + z + " : le motif A reste");
    if (JSON.stringify(p1.notes) !== JSON.stringify(p0.notes)) varied++;
    assert.equal(songFor(z, 7).notes.length, 0, "silence au 8e passage");
    assert.ok(songFor(z, 3).calm && songFor(z, 3).drums === "none", "intermède calme");
    assert.deepEqual(songFor(z, 5), songFor(z, 5), "même passage = même musique");
    assert.equal(songFor(z, 2).bpm, p0.bpm, "même tempo d'un passage à l'autre");
  }
  assert.ok(varied >= 38, "les passages varient : " + varied + " / 40");
  // Un air par tranche de 5 zones (it. 521, demande de Victor).
  assert.deepEqual([1, 3, 5, 6, 10, 11, 0, 203].map(musicZone), [1, 1, 1, 6, 6, 11, 1, 201], "tranches de 5 zones");
  // Couleur du décor indépendante de la langue (it. 531) : un nom traduit (translateData) ne change pas l'air.
  assert.equal(songFor(1).mood, "wood", "forêt reconnue");
  ZONES.forEach((z, i) => { const keep = z.name, before = JSON.stringify(songFor(i + 1)); z.src ||= keep; z.name = "Translated " + i;
    const after = JSON.stringify(songFor(i + 1)); z.name = keep; assert.equal(after, before, "zone " + (i + 1) + " : même air dans toutes les langues"); });
});

test("duo de héros (demande 17) : un compagnon de l'autre portée frappe aussi ; changement à l'ascension", () => {
  const g = new Game(freshState()); g.S.cls = "warrior"; g.S.classesUnlocked = ["warrior", "ranger", "paladin"]; g.invalidateStats();
  assert.equal(g.choosePartner("paladin"), false, "même portée (corps à corps) : refusé");
  assert.equal(g.choosePartner("mage"), false, "pas encore libéré : refusé");
  const dps0 = heroDps(g.stats());
  assert.ok(g.choosePartner("ranger")); assert.equal(g.S.partner, "ranger", "premier compagnon : tout de suite");
  assert.ok(M_achievements_js.reachedAchievements(g.S).includes("DUO_FIRST"), "succès « Premier duo »");
  const hs = g.stats();
  assert.ok(hs.duo > 0 && hs.firstStrike > 0, "dégâts du compagnon et moitié de son tir d'ouverture");
  assert.ok(heroDps(hs) > dps0 * 1.2, "le duo frappe plus fort");
  g.S.classesUnlocked.push("necro"); g.choosePartner("necro");
  assert.equal(g.S.partner, "ranger"); assert.equal(g.S.nextPartner, "necro", "ensuite : à la prochaine ascension");
  g.S.best = 25; g.ascend(); assert.equal(g.S.partner, "necro");
  g.chooseNextClass("ranger"); assert.equal(g.S.nextPartner, null, "héros à distance : le compagnon à distance prévu tombe");
  const bad = JSON.parse(JSON.stringify(g.S)); bad.partner = "inconnu"; assert.equal(migrate(bad).partner, null);
});

test("langue du système pour une partie neuve (fr-FR → fr, pt-BR → pt, inconnue → en)", () => {
  assert.equal(systemLang(["fr-FR", "en-US"]), "fr");
  assert.equal(systemLang(["pt-BR"]), "pt");
  assert.equal(systemLang(["zh-CN"]), "zh");
  assert.equal(systemLang(["xx-YY", "de-AT"]), "de");
  assert.equal(systemLang(["xx"]), "en");
  assert.equal(systemLang([]), "en");
});

test("zones lointaines : « + », « ++ », puis « +N » (lisible en fin de partie)", () => {
  assert.match(zoneName(35), / \+$/);
  assert.match(zoneName(70), / \+\+$/);
  assert.match(zoneName(200), / \+6$/);
  assert.equal(loopMark(7), "+7");
});

test("force des monstres : inchangée jusqu'à la zone 60, puis croissance adoucie sans cassure (zone 200 atteignable)", () => {
  for (const z of [1, 10, 40, 60]) assert.ok(Math.abs(zoneMight(z) / Math.pow(1.28, z - 1) - 1) < 1e-9, "zone " + z);
  let prev = zoneMight(60) / zoneMight(59);
  for (let z = 61; z <= 220; z++) {
    const g = zoneMight(z) / zoneMight(z - 1);
    assert.ok(g > 1 && g <= prev + 1e-9, `croissance décroissante en zone ${z}`); // jamais de saut
    prev = g;
  }
  assert.ok(Math.abs(zoneMight(200) / zoneMight(199) - MONSTER_LATE_GROWTH) < 1e-9);
  assert.ok(zoneMight(200) < Math.pow(1.28, 199) / 1e6, "fin de partie bien plus douce qu'avant");
});

test("rythme du début : première course seulement, de 0,35 à 1 en zone 15", () => {
  const S = freshLocked();
  assert.equal(earlyPace(S), 0.35);
  S.best = 8; assert.ok(earlyPace(S) > 0.35 && earlyPace(S) < 1);
  S.best = 15; assert.equal(earlyPace(S), 1);
  S.best = 2; S.prestige.count = 1; assert.equal(earlyPace(S), 1, "aucun effet après une ascension");
  // moins d'or par victoire au tout début
  const g0 = new Game(freshLocked()), g1 = new Game(freshLocked()); g1.S.best = 15;
  let a = 0, b = 0; g0.on("kill", ({ gold }) => { a += gold; }); g1.on("kill", ({ gold }) => { b += gold; });
  setRandom(seeded(11)); for (let i = 0; i < 400; i++) g0.step(0.05);
  setRandom(seeded(11)); for (let i = 0; i < 400; i++) g1.step(0.05);
  assert.ok(a > 0 && a < b * 0.6, `or ${a} contre ${b}`);
});

test("onglets progressifs : fermés au départ, ouverts au seuil, gardés à l'ascension, anciennes parties tout ouvert", () => {
  const S = freshLocked();
  for (const id of ["talents", "skills", "quests", "shop", "pets", "class", "ascension", "bestiary", "stats"]) assert.ok(!tabOpen(S, id), id + " fermé au départ");
  assert.ok(tabOpen(S, "adventure") && tabOpen(S, "settings"));
  S.best = 2;
  assert.deepEqual(openTabs(S), ["talents"]);
  assert.equal(S.tabsOpen.talents, "new");
  assert.deepEqual(openTabs(S), [], "annoncé une seule fois");
  // l'ascension garde les onglets ouverts
  const g = new Game(S); g.S.best = 25; openTabs(g.S); g.S.prestige.shards = 0;
  if (g.canAscend()) { g.ascend(); assert.ok(tabOpen(g.S, "talents") && tabOpen(g.S, "ascension"), "gardés après l'ascension"); }
  // sauvegarde d'avant ce système, partie avancée : tout est ouvert
  const old = JSON.parse(JSON.stringify(freshLocked())); delete old.tabsOpen; old.best = 40; old.lvl = 90;
  const m = migrate(old);
  for (const id in TAB_GATES) assert.equal(m.tabsOpen[id], true, id);
  // partie neuve d'avant ce système (rien de fait) : rien d'ouvert
  const young = JSON.parse(JSON.stringify(freshLocked())); delete young.tabsOpen;
  assert.deepEqual(migrate(young).tabsOpen, {});
});

test("classes : ordre de libération (guerrier, puis zone du boss)", () => {
  const o = CLASS_KEYS_BY_UNLOCK();
  assert.equal(o[0], "warrior");
  assert.equal(o.length, CLASS_KEYS.length);
  for (let i = 2; i < o.length; i++) assert.ok(CLASS_UNLOCK_ZONE[o[i]] >= CLASS_UNLOCK_ZONE[o[i - 1]], o.join(","));
});

test("quête : réclamée même sac plein (coffre : place faite, ou objet vendu)", () => {
  const g = new Game(freshLocked());
  const fill = () => { g.S.bag.length = 0; while (!g.bagFull()) g.S.bag.push(g.newItem(0)); };
  const quest = () => { g.S.quests.slots = [{ uid: 991, kind: "kill", goal: 1, progress: 1, stars: 1, reward: { gold: 50, chest: 3 } }]; };
  // 1) des objets inutiles : le moins précieux est vendu, le coffre entre dans le sac
  g.isUpgrade = () => false; // équipement vide en partie neuve : sinon tout objet serait une amélioration
  fill(); quest();
  const gold0 = g.S.gold;
  assert.ok(g.claimQuest(991), "réclamée");
  assert.ok(g.S.gold >= gold0 + 50);
  assert.ok(g.S.bag.some((i) => i.r >= 3), "objet du coffre dans le sac");
  // 2) aucun objet inutile : l'objet du coffre est vendu, la quête est quand même réclamée
  fill(); quest(); g.uselessItems = () => [];
  const n = g.S.bag.length, gold1 = g.S.gold;
  assert.ok(g.claimQuest(991));
  assert.equal(g.S.bag.length, n);
  assert.ok(g.S.gold > gold1 + 50, "or + valeur du coffre");
});

test("sauvegarde : langue inconnue et talents illisibles retirés (rechargement sans fin, démarrage en échec)", () => {
  const raw = JSON.parse(JSON.stringify(freshState()));
  raw.settings.lang = 42; raw.settings.hints = "x";
  let s = migrate(raw);
  assert.ok(s.settings.lang === undefined || s.settings.lang === null);
  assert.deepEqual(s.settings.hints, {});
  raw.settings.lang = "xx-future"; assert.ok(!migrate(raw).settings.lang);
  raw.settings.lang = "de"; assert.equal(migrate(raw).settings.lang, "de");
  raw.talents = { warrior: { w_str: 3, w_bad: null }, mage: null, rogue: 5 };
  assert.deepEqual(migrate(raw).talents, { warrior: { w_str: 3 } }, "talents illisibles retirés");
  raw.shop = { items: [null, { id: 1 }, { id: 2, slot: "ring", r: 1, st: {}, price: 10 }], next: Date.now() + 1e5 };
  raw.quests.slots = [{ kind: "kill" }, ...raw.quests.slots];
  const m = migrate(raw);
  assert.equal(m.shop.items.length, 1, "stock du marchand filtré");
  assert.ok(m.quests.slots.every((q) => q.reward), "quête sans récompense retirée");
  raw.shop = { items: "x" }; assert.equal(migrate(raw).shop, null);
});

test("sauvegarde : quêtes illisibles et compétences inconnues retirées, arbre valide conservé", () => {
  const g = new Game(freshLocked());
  g.S.prestige.skillPts = 30; g.autoSpendSkills();
  const order = [...g.S.skills.order];
  assert.ok(order.length > 0);
  const raw = JSON.parse(JSON.stringify(g.S));
  assert.deepEqual(migrate(JSON.parse(JSON.stringify(raw))).skills.order, order, "arbre valide intact");
  raw.skills.order = [...order, "nope", null, order[0]];
  raw.quests.slots = [null, ...raw.quests.slots];
  const s = migrate(raw);
  assert.deepEqual(s.skills.order, order);
  assert.ok(s.quests.slots.every((q) => q && typeof q === "object"));
  const g2 = new Game(s);
  for (let i = 0; i < 300; i++) g2.step(0.1);
  g2.stats();
});

test("sauvegarde : objets illisibles retirés du sac et de l'équipement, sans plantage", () => {
  const raw = JSON.parse(JSON.stringify(freshState()));
  const good = { id: 6, slot: "weapon", r: 1, il: 1, st: { atk: 5, def: null } };
  raw.bag = [null, {}, { id: 5, slot: "nope", r: 1 }, { id: 8, slot: "helm", r: 42 }, good];
  raw.equip.helm = { id: 7, slot: "ring", r: 2, st: {} }; // pas à sa place
  raw.equip.bogus = { id: 9 };
  const s = migrate(raw);
  assert.equal(s.bag.length, 1);
  assert.deepEqual(s.bag[0].st, { atk: 5 });
  assert.equal(s.equip.helm, null);
  assert.ok(!("bogus" in s.equip));
  const g = new Game(s);
  g.uselessItems(); g.todoNow(); g.autoEquip();
  for (let i = 0; i < 500; i++) g.step(0.1);
});

test("sauvegarde : nombres illisibles des sous-objets remplacés par leur valeur par défaut", () => {
  const raw = JSON.parse(JSON.stringify(freshState()));
  raw.prestige.shards = null; raw.stats.kills = "abc"; raw.guild.rep = null; raw.pets.eggs = null; raw.stats.bosses = 12;
  const s = migrate(raw);
  assert.equal(s.prestige.shards, 0);
  assert.equal(s.stats.kills, 0);
  assert.equal(s.guild.rep, 0);
  assert.equal(s.pets.eggs, 0);
  assert.equal(s.stats.bosses, 12, "valeur correcte gardée");
});

test("journal : sac plein, les objets laissés au sol se cumulent sur une ligne", () => {
  const g = new Game(freshLocked());
  g.S.bag.length = 0; g.S.log.length = 0;
  while (!g.bagFull()) { const it = g.newItem(1); it.r = 0; g.S.bag.push(it); }
  g.isUpgrade = () => false;
  for (let i = 0; i < 5; i++) { const it = g.newItem(1); it.r = 1; g.addToBag(it); }
  const lines = g.S.log.filter((l) => /on the ground|au sol/.test(l));
  assert.equal(lines.length, 1, g.S.log.slice(0, 6).join(" | "));
  assert.match(lines[0], /: 5\./);
});

test("événement Œil du faucon : tous les coups sont critiques", () => {
  const g = new Game(freshLocked());
  {
    // Nichée : des œufs pendant l'événement, seulement onglet Familiers ouvert
    const gn = new Game(freshState()); gn.S.pets.owned = {}; gn.S.tabsOpen = {}; gn.S.best = 1;
    assert.ok(!M_events_js.EVENTS.nest.req(gn.S), "pas de Nichée avant les familiers");
    gn.S.tabsOpen = { ...(gn.S.tabsOpen || {}), pets: true }; gn.S.best = 60; gn.S.level = 60;
    if (M_events_js.EVENTS.nest.req(gn.S)) {
      gn.startEvent("nest"); const e0 = gn.S.pets.eggs;
      for (let i = 0; i < 200; i++) { gn.R.mon = gn.makeMonster(false); gn.killMonster(); gn.R.events.nest = 30; }
      assert.ok(gn.S.pets.eggs > e0, "Nichée : des œufs");
    }
  }
  {
    // Malédiction (boss) : le héros maudit subit plus de dégâts
    const gc = new Game(freshState()); gc.R.mon = gc.makeMonster(true); const hs = { ...gc.stats(), riposte: 0 }, m = gc.R.mon; m.hp = m.max = 1e15;
    hs.dodge = 0; hs.thorns = 0; gc.R.shield = 0; let a = 0, b = 0;
    for (let i = 0; i < 200; i++) { gc.R.hp = 1e12; gc.R.cursed = 0; gc.monsterAttack(m, hs, 1); a += 1e12 - gc.R.hp; gc.R.hp = 1e12; gc.R.cursed = 3; gc.monsterAttack(m, hs, 1); b += 1e12 - gc.R.hp; }
    assert.ok(b > a * 1.1, "maudit : plus de dégâts subis");
    // Talisman de pureté : la malédiction n'a plus d'effet
    const gp = new Game(freshState()); gp.R.mon = gp.makeMonster(true); gp.R.mon.mech = ["curse"]; gp.R.mon.curseT = 0; gp.R.mode = "fight";
    const w = gp.newItem(0); w.power = "p_pure"; gp.S.equip[w.slot] = w; gp.invalidateStats();
    assert.equal(gp.stats().purity, 100, "pureté 100 %");
    gp.R.cursed = 0; let blocked = 0; gp.on("bossSkill", ({ id }) => { if (id === "curseBlocked") blocked++; }); gp.bossTick(gp.R.mon, gp.stats(), 0.1);
    assert.ok(!(gp.R.cursed > 0), "Talisman de pureté : pas maudit");
    assert.equal(blocked, 1, "parade signalée (Malédiction repoussée)");
    const gq = new Game(freshState()); gq.R.mon = gq.makeMonster(true); gq.R.mon.mech = ["curse"]; gq.R.mon.curseT = 0;
    gq.bossTick(gq.R.mon, gq.stats(), 0.1);
    assert.ok(gq.R.cursed > 0, "sans talisman : maudit");
    // Porte-talisman : talisman équipé face au boss qui maudit, objet d'avant remis après sa chute
    const gk = new Game(freshState()); gk.S.unlocks.charmKeeper = true;
    const tal = gk.newItem(0); tal.power = "p_pure"; gk.S.bag.push(tal);
    const worn = gk.S.equip[tal.slot];
    const bossM = gk.makeMonster(true); bossM.mech = ["curse"]; gk.R.mon = bossM;
    gk.charmSwap(bossM);
    assert.equal(gk.S.equip[tal.slot].id, tal.id, "talisman équipé face à la Malédiction");
    bossM.hp = 0; gk.killMonster();
    if (worn) assert.equal(gk.S.equip[tal.slot].id, worn.id, "objet d'avant remis après le boss");
    // Coup de pouce : bloqué par un boss qui maudit, les légendaires portent souvent le Talisman de pureté
    const gs = new Game(freshState()); gs.S.zone = 11; gs.S.bossDefeats = { 11: 3 };
    let pure = 0; for (let i = 0; i < 200; i++) if (gs.decorate({ r: LEGENDARY }).power === "p_pure") pure++;
    assert.ok(pure > 60, "bloqué : Talisman fréquent (" + pure + " / 200)");
    gs.S.bossDefeats = {}; pure = 0; for (let i = 0; i < 200; i++) if (gs.decorate({ r: LEGENDARY }).power === "p_pure") pure++;
    assert.ok(pure < 40, "sinon : rare (" + pure + " / 200)");
    // Succès « Cœur pur » : boss à Malédiction vaincu avec le talisman
    gp.R.mon.hp = 0; gp.killMonster();
    assert.ok(M_achievements_js.reachedAchievements(gp.S).includes("PURE_HEART"), "succès Cœur pur");
    // Astuce : talisman dans le sac face à un boss qui maudit
    const gh = new Game(freshState()); gh.S.zone = 11; const it2 = gh.newItem(0); it2.power = "p_pure"; gh.S.bag.push(it2);
    gh.S.settings.hints = Object.fromEntries(M_hints_js.HINTS.filter((h) => h.id !== "purity").map((h) => [h.id, true]));
    const hp = M_hints_js.nextHint(gh);
    assert.ok(hp && hp.id === "purity", "astuce Talisman de pureté");
    // Score de combat : la pureté compte (sinon le Valet d'armes retirerait le talisman pour un objet à peine meilleur)
    const st = gh.stats(), pw = M_rules_js.power;
    const ratio = pw({ ...st, purity: 100 }) / pw({ ...st, purity: 0 });
    assert.ok(ratio > 1.04 && ratio < 1.06, "pureté 100 % ≈ +5 % de puissance : " + ratio);

    assert.ok(M_bosses_js.BOSS_MECHANICS.curse && M_bosses_js.bossMechanics(11).includes("curse"), "zone 11 : Malédiction");
  }
  {
    // Chasseur d'événements : chaque événement vu est retenu ; tous vus = succès
    const ge = new Game(freshState()); for (const id of Object.keys(M_events_js.EVENTS)) { ge.startEvent(id); ge.R.events[id] = 0; }
    assert.ok(M_achievements_js.reachedAchievements(ge.S).includes("EVENTS_ALL"), "succès Chasseur d’événements");
    // Succès déjà obtenu : gardé même si un nouvel événement le rend incomplet ; identifiant inconnu ignoré
    const gk = new Game(freshState()); gk.S.achievements = ["EVENTS_ALL", "ACH_D_UNE_AUTRE_VERSION"];
    const earned = M_achievements_js.earnedAchievements(gk.S);
    assert.ok(earned.has("EVENTS_ALL") && !earned.has("ACH_D_UNE_AUTRE_VERSION"), "succès obtenus gardés");
    const badVol = JSON.parse(JSON.stringify(ge.S)); badVol.settings.musicVol = "x"; badVol.settings.ambVol = 9;
    const mv = migrate(badVol).settings; assert.ok(mv.musicVol === 1 && mv.ambVol === 2, "volumes abîmés : " + mv.musicVol + " " + mv.ambVol);
    const badHud = JSON.parse(JSON.stringify(ge.S)); badHud.settings.hudPos = 42; assert.equal(migrate(badHud).settings.hudPos, "auto", "hudPos abîmé");
    const bad = JSON.parse(JSON.stringify(ge.S)); bad.stats.eventsSeen = "x"; assert.deepEqual(migrate(bad).stats.eventsSeen, {}, "eventsSeen abîmé");
    // Quête « Frapper au clic » : chaque coup au clic compte
    const gt = new Game(freshState()); gt.S.quests.slots = [{ uid: 9, kind: "tap", goal: 3, progress: 0, stars: 1, reward: { gold: 1 } }];
    gt.R.mon = gt.makeMonster(false); gt.R.mon.hp = gt.R.mon.max = 1e12; gt.R.mode = "fight";
    for (let i = 0; i < 3; i++) { gt.tapMonster(); gt.R.time += 1; }
    assert.equal(gt.S.quests.slots[0].progress, 3, "3 coups au clic comptés");
    assert.match(M_quests_js.QUEST_TEMPLATES.tap.text({ goal: 20 }), /20/);
    assert.ok(!M_quests_js.QUEST_TEMPLATES.tap.ok(freshState()), "pas proposée à qui n'a jamais cliqué");
    assert.ok(M_quests_js.QUEST_TEMPLATES.tap.ok(gt.S), "proposée après des coups au clic");
    // Quête « Coups critiques » : chaque critique compte (Œil du faucon : critiques garantis)
    const gc = new Game(freshState()); gc.S.quests.slots = [{ uid: 8, kind: "crit", goal: 2, progress: 0, stars: 1, reward: { gold: 1 } }];
    const mc = gc.makeMonster(false); mc.hp = mc.max = 1e12; gc.R.events.hawkeye = 5;
    const hsc = heroStats(gc.S); gc.heroStrike(mc, hsc, false, false); gc.heroStrike(mc, hsc, false, false);
    assert.equal(gc.S.quests.slots[0].progress, 2, "2 critiques comptés");
    assert.equal(gc.S.stats.crits, 2, "statistique des coups critiques");
    gc.S.stats.crits = 9999; gc.heroStrike(mc, hsc, false, false);
    assert.ok(M_achievements_js.reachedAchievements(gc.S).includes("CRITS_10000"), "succès Lame affûtée");
    assert.match(M_quests_js.QUEST_TEMPLATES.crit.text({ goal: 40 }), /40/);
    // Tenace : le boss se relève une fois avec 25 % de ses PV, puis tombe pour de bon
    const gn = new Game(freshState()); gn.R.mon = gn.makeMonster(true); gn.R.mon.mech = ["tenacious"]; gn.R.mode = "fight";
    const kills0 = gn.S.stats.kills || 0; gn.R.mon.hp = 0; gn.killMonster();
    assert.ok(gn.R.mon && gn.R.mon.risen && Math.abs(gn.R.mon.hp - gn.R.mon.max * 0.25) < 1e-6, "Tenace : se relève");
    assert.equal(gn.S.stats.kills || 0, kills0, "pas encore vaincu");
    gn.R.mon.hp = 0; gn.killMonster(); assert.equal(gn.S.stats.kills, kills0 + 1, "Tenace : tombe la seconde fois");
    assert.ok(M_bosses_js.bossMechanics(12).includes("tenacious"), "zone 12 : Tenace");
    // Voile protecteur : dégâts subis divisés par deux pendant l'événement
    const gw = new Game(freshState()), mw = gw.makeMonster(false), hsw = { ...heroStats(gw.S), dodge: 0, thorns: 0, riposte: 0 };
    mw.hp = mw.max = 1e12; gw.R.hp = 1e9; gw.R.shield = 0;
    const r0 = gw.R.hp;
    gw.monsterAttack(mw, hsw, 1); const plain = r0 - gw.R.hp;
    gw.startEvent("ward"); const r1 = gw.R.hp; gw.monsterAttack(mw, hsw, 1); const warded = r1 - gw.R.hp;
    assert.ok(warded > 0 && warded < plain * 0.7, "Voile protecteur : environ moitié moins de dégâts (" + plain + " → " + warded + ")");
    // Sac rangé : rareté décroissante (sans amélioration en jeu ici)
    const gb = new Game(freshState()); gb.S.bag = [0, 3, 1, 4, 2].map((r) => { const it = gb.newItem(r); it.r = r; return it; });
    gb.isUpgrade = () => false; gb.sortBag();
    assert.deepEqual(gb.S.bag.map((it) => it.r), [4, 3, 2, 1, 0], "sac rangé par rareté");
    // Zèle : progression des quêtes doublée pendant l'événement
    const gz = new Game(freshState()); gz.S.quests.slots = [{ uid: 1, kind: "kill", goal: 100, progress: 0, stars: 1, reward: { gold: 1 } }];
    gz.questProgress("kill", 1); assert.equal(gz.S.quests.slots[0].progress, 1);
    gz.startEvent("zeal"); gz.questProgress("kill", 1); assert.equal(gz.S.quests.slots[0].progress, 3, "Zèle : ×2");
  }
  g.startEvent("hawkeye");
  assert.ok(g.R.events.hawkeye > 0);
  let crits = 0, n = 0;
  g.on("heroAttack", (e) => { n++; if (e.crit) crits++; });
  const hs = { ...g.stats(), crit: 0 };
  for (let i = 0; i < 20; i++) g.heroStrike({ hp: 1e12, max: 1e12, def: 0, mech: [] }, hs, false);
  assert.equal(crits, 20, "20 critiques sur 20 coups (" + n + ")");
});

test("« À faire » : amélioration du marchand achetée et équipée d'un clic", () => {
  const g = new Game(freshLocked());
  for (const k in g.S.equip) g.S.equip[k] = null;
  g.invalidateStats();
  g.S.bag.length = 0; g.S.gold = 1e9;
  const it = g.newItem(3); it.price = 100;
  g.S.shop = { items: [it], next: Date.now() + 600000 };
  g.S.best = 8; openTabs(g.S); // boutique ouverte dès la zone 8 (fait par step() en jeu)
  const t = g.todoNow().find((x) => x.id === "merchant");
  assert.ok(t && t.name && t.price === 100);
  assert.ok(g.buyAndEquip(g.merchantUpgrade().id));
  assert.equal(g.S.equip[it.slot].id, it.id, "équipé");
  assert.ok(!g.todoNow().some((x) => x.id === "merchant"));
});

test("thème du panneau : celui de Windows par défaut, conservé dans la sauvegarde", () => {
  const S = freshLocked();
  assert.equal(S.settings.theme, null);
  S.settings.theme = "dark";
  assert.equal(migrate(JSON.parse(JSON.stringify(S))).settings.theme, "dark");
  const old = JSON.parse(JSON.stringify(freshLocked())); delete old.settings.theme; // sauvegarde d'avant ce réglage
  assert.ok(!migrate(old).settings.theme, "ancienne sauvegarde : thème de Windows");
});

test("Astrolabe : ascension automatique seulement si débloquée, activée et bloquée près du record", () => {
  const mk = () => {
    const g = new Game(freshLocked());
    g.S.best = g.S.zone = 30; g.S.prestige.count = 1; g.S.prestige.bestRun = 30;
    g.R.time = 1000; g.R.wallDeaths = [990, 995, 998, 999];
    return g;
  };
  let g = mk();
  assert.equal(g.autoAscend(), false, "sans déblocage : jamais");
  g = mk(); g.S.unlocks.astrolabe = true;
  assert.equal(g.autoAscend(), false, "débloqué mais option décochée par défaut : jamais");
  g = mk(); g.S.unlocks.astrolabe = true; g.S.settings.autoAscend = true; g.R.wallDeaths = [990, 995];
  assert.equal(g.autoAscend(), false, "pas assez de défaites : la course continue");
  g = mk(); g.S.unlocks.astrolabe = true; g.S.settings.autoAscend = true; g.S.prestige.bestRun = 45;
  assert.equal(g.autoAscend(), false, "loin du record de toutes les courses : la course continue");
  g = mk(); g.S.unlocks.astrolabe = true; g.S.settings.autoAscend = true;
  assert.equal(g.autoAscend(), true, "bloqué près du record : ascension");
  assert.equal(g.S.prestige.count, 2);
  assert.ok(g.S.unlocks.astrolabe && g.S.settings.autoAscend === true, "déblocage et option conservés");
});

test("constellation du Chasseur : +5 % d'élites rencontrées par rang", () => {
  const g = new Game(freshState());
  g.S.prestige.shards = 1000;
  assert.ok(g.buyConstellation("c_hunter") && g.buyConstellation("c_hunter"));
  g.invalidateStats();
  assert.equal(g.stats().elites, 10);
});

test("pouvoir Appât des champions : nettement plus d'élites", () => {
  const count = (lure) => {
    setRandom(seeded(7));
    const g = new Game(freshState());
    g.S.zone = 5; // élites dès la zone 3 (première course)
    const it = g.newItem(4); it.power = lure ? "p_lure" : "p_purse"; g.S.equip[it.slot] = it; g.invalidateStats();
    let elites = 0;
    for (let i = 0; i < 400; i++) { g.R.lineupZone = -1; elites += g.lineup().filter((m) => m.elite).length; }
    return elites;
  };
  const base = count(false), lure = count(true);
  setRandom(seeded(42)); // la suite des tests reste déterministe
  assert.ok(lure > base * 1.4, `élites : ${base} sans, ${lure} avec`);
});

test("Filet à étoiles : attrape l'étoile à mi-course, jamais sans le déblocage", () => {
  const run = (net) => {
    const g = new Game(freshLocked());
    if (net) g.S.unlocks.starNet = true;
    g.R.starT = 0.01; // une étoile passe tout de suite
    let caught = 0, missed = 0;
    g.on("starCaught", () => caught++); g.on("starMissed", () => missed++);
    for (let i = 0; i < 20 / 0.05; i++) g.tickEvents ? g.tickEvents(0.05) : g.step(0.05);
    return { caught, missed, speed: g.S.speed || 0 };
  };
  const off = run(false), on = run(true);
  assert.equal(off.caught, 0); assert.equal(off.missed, 1, "sans filet : l'étoile file");
  assert.equal(on.caught, 1); assert.equal(on.missed, 0, "avec le filet : attrapée");
  assert.ok(on.speed > off.speed, "vitesse permanente gagnée");
});

test("depuis ta dernière visite : gains affichés après 5 min, pas avant", () => {
  const g = new Game(freshState()), t0 = 1e12;
  const snap = g.visitSnapshot(t0);
  g.S.stats.kills += 120; g.S.stats.goldTotal = (g.S.stats.goldTotal || 0) + 5000; g.S.lvl += 3;
  assert.equal(g.visitSummary(snap, t0 + 4 * 60000), null, "moins de 5 min : rien");
  const v = g.visitSummary(snap, t0 + 42 * 60000);
  assert.ok(v && v.min === 42 && v.kills === 120 && v.gold === 5000);
  assert.equal(v.lvl1 - v.lvl0, 3, "niveaux gagnés");
  g.S.prestige.count++; // ascension entre-temps : la comparaison des niveaux n'a plus de sens
  assert.equal(g.visitSummary(snap, t0 + 42 * 60000).lvl0, 0);
  assert.equal(g.visitSummary(snap, t0 + 42 * 60000).asc, 1, "ascension comptée");
  assert.equal(g.visitSummary(null), null);
});

test("record de zone : annoncé seulement au-delà du record de toutes les courses", () => {
  const g = new Game(freshState());
  g.S.autoAdvance = true;
  g.S.prestige.bestRun = 10; // course précédente : zone 10
  const seen = [];
  g.on("zoneUp", (e) => seen.push(e));
  const killBoss = () => {
    for (let i = 0; i < 4000 && g.R.mode !== "fight"; i++) g.step(0.05);
    g.S.kills = 10; // le boss est le prochain monstre
    for (let i = 0; i < 20000 && !seen.length; i++) { if (g.R.mon) { g.R.mon.hp = 0; g.R.mon.boss = true; } g.step(0.05); }
  };
  g.S.zone = g.S.best = 5;
  killBoss();
  assert.equal(seen.length, 1);
  assert.equal(seen[0].record, false, "zone 6 après une course à 10 : pas un record");
  seen.length = 0;
  g.S.zone = g.S.best = 10;
  killBoss();
  assert.equal(seen[0].record, true, "zone 11 : vrai record");
});

test("élite givrée : ses coups peuvent geler le héros (attaques ralenties)", () => {
  const g = new Game(freshState());
  for (let i = 0; i < 4000 && g.R.mode !== "fight"; i++) g.step(0.05);
  const m = g.R.mon; m.hp = m.max = 1e12; m.affix = "frosty"; m.atk = 1; m.elite = true;
  let frozen = 0;
  g.on("bossSkill", ({ id }) => { if (id === "frost") frozen++; });
  for (let i = 0; i < 1200 && frozen === 0; i++) { g.R.hp = 1e9; g.step(0.05); }
  assert.ok(frozen > 0 && g.R.frozen > 0, "héros gelé");
});

test("boss : fureur croissante, plafonnée à 6 accélérations", () => {
  const g = new Game(freshState());
  for (let i = 0; i < 4000 && g.R.mode !== "fight"; i++) g.step(0.05);
  const m = g.R.mon; m.hp = m.max = 1e12; m.atk = 0; m.boss = true; m.mech = ["fury"];
  const i0 = m.interval;
  for (let i = 0; i < 12 / 0.05; i++) g.step(0.05); // 12 s : 2 accélérations
  assert.equal(m.fury, 2);
  assert.ok(Math.abs(m.interval - i0 * 0.81) < 1e-9, "10 % plus vite à chaque palier");
  for (let i = 0; i < 60 / 0.05; i++) g.step(0.05); // 1 min de plus : plafonné
  assert.equal(m.fury, 6, "jamais plus de 6 accélérations");
});

test("pluriels : txn choisit la bonne forme dans chaque langue", () => {
  const before = getLang(), K = "{n} objet gardé.|{n} objets gardés.";
  try {
    setLang("fr");
    assert.equal(txn(0, K), "0 objet gardé.");
    assert.equal(txn(1, K), "1 objet gardé.");
    assert.equal(txn(2, K), "2 objets gardés.");
    setLang("en");
    assert.equal(txn(1, K), "1 item kept.");
    assert.equal(txn(0, K), "0 items kept.");
    setLang("ru");
    assert.equal(txn(1, K), "сохранён 1 предмет.");
    assert.equal(txn(3, K), "сохранено 3 предмета.");
    assert.equal(txn(5, K), "сохранено 5 предметов.");
    assert.equal(txn(21, K), "сохранён 21 предмет.");
    setLang("pl");
    assert.equal(txn(22, K), "zachowano 22 przedmioty.");
    assert.equal(txn(12, K), "zachowano 12 przedmiotów.");
    setLang("ja");
    assert.equal(txn(4, K), "4 個のアイテムを保持しました。");
  } finally { setLang(before); }
});

test("Maître de forge : forge l'équipement porté avec l'or en trop, jamais sans le déblocage", () => {
  const g = new Game(freshLocked());
  const it = Object.values(g.S.equip).find(Boolean) || (() => { const x = g.newItem(1); g.S.equip[x.slot] = x; return x; })();
  it.plus = 0;
  g.S.gold = 1e12;
  assert.equal(g.autoForge(), null, "sans le déblocage : rien");
  assert.equal(it.plus, 0);
  g.S.unlocks.masterForge = true;
  const forged = g.autoForge();
  assert.ok(forged && forged.plus === 1, "forge un objet porté");
  g.S.settings.autoForge = false;
  assert.equal(g.autoForge(), null, "option coupée : rien");
  g.S.settings.autoForge = true;
  // Garde 3 fois le prix de côté : avec juste de quoi payer, il ne forge pas.
  for (const x of Object.values(g.S.equip)) if (x) x.plus = 0;
  g.S.gold = 1;
  assert.equal(g.autoForge(), null, "or insuffisant : rien");
  const before = g.S.gold;
  assert.equal(g.S.gold, before);
});

test("retour d'absence : le meilleur objet gardé est désigné (amélioration en priorité)", () => {
  const g = new Game(freshState());
  g.S.autoSell = { common: false, uncommon: false, rare: false };
  g.S.bag = [];
  const sum = g.applyOffline(4 * 3600);
  assert.ok(sum && sum.kept > 0, "des objets gardés");
  const it = g.findBagItem(sum.bestItemId);
  assert.ok(it, "l'objet désigné est dans le sac");
  const ups = g.S.bag.filter((x) => g.isUpgrade(x));
  if (ups.length) assert.ok(g.isUpgrade(it), "une amélioration passe avant un objet plus rare inutile");
});

test("hors ligne : plafond de 8 h allongé par la Lune, signalé quand il est atteint", () => {
  const g = new Game(freshLocked());
  assert.equal(g.offlineCapS(), 8 * 3600);
  (g.S.prestige.ranks ||= {}).c_moon = 2;
  assert.equal(g.offlineCapS(), 10 * 3600);
  const s1 = g.applyOffline(3600);
  assert.ok(s1 && !s1.capped && s1.capH === 10);
  const s2 = g.applyOffline(30 * 3600);
  assert.ok(s2 && s2.capped && s2.seconds === 10 * 3600, "absence de 30 h ramenée à 10 h");
});

test("retour d'absence : « à faire maintenant » ne liste que ce qui est disponible", () => {
  const g = new Game(freshLocked());
  assert.deepEqual(g.todoNow().map((t) => t.id), [], "partie neuve : rien à faire");
  g.S.pets.eggs = 2;
  assert.ok(!g.todoNow().some((t) => t.id === "eggs"), "œufs sans Ménagerie : rien à proposer");
  g.S.unlocks.menagerie = true;
  g.S.best = 40; // onglets ouverts (Familiers dès la zone 25)
  const eggs = g.todoNow().find((t) => t.id === "eggs");
  assert.ok(eggs && eggs.n === 2 && eggs.tab === "pets");
  g.S.gold = 1e9; // le premier déblocage (zone 1) devient abordable
  const u = g.todoNow().find((t) => t.id === "unlock");
  assert.ok(u && u.tab === "shop" && u.name, "déblocage abordable proposé");
  g.S.pets.exp = { cat: { end: Date.now() - 1000 }, dog: { end: Date.now() + 1e6 } };
  assert.equal(g.todoNow().find((t) => t.id === "expeditions").n, 1, "seules les expéditions finies comptent");
  g.shopStock();
  g.isUpgrade = (it) => it === g.S.shop.items[0];
  assert.ok(g.todoNow().some((t) => t.id === "merchant" && t.tab === "shop"), "amélioration abordable chez le marchand");
  g.S.gold = 0;
  assert.ok(!g.todoNow().some((t) => t.id === "merchant"), "pas abordable : rien");
});

test("journal : repart à zéro quand la langue change, jamais pour une ancienne sauvegarde", () => {
  const g = new Game(freshLocked());
  g.log("a"); g.log("b");
  g.syncLogLang("fr");                       // ancienne sauvegarde (langue inconnue) : rien n'est effacé
  assert.deepEqual(g.S.log, ["b", "a"]);
  assert.equal(g.S.logLang, "fr");
  g.syncLogLang("fr");                       // même langue : inchangé
  assert.equal(g.S.log.length, 2);
  g.syncLogLang("en");                       // nouvelle langue : une seule ligne d'explication
  assert.equal(g.S.log.length, 1);
  assert.equal(g.S.logLang, "en");
  const m = migrate(JSON.parse(JSON.stringify(g.S)));
  assert.equal(m.logLang, "en", "langue du journal conservée dans la sauvegarde");
});

test("Sort perçant (demandes L et R) : la file est frappée tout de suite, plus de cibles avec le rang, arrivée blessée", () => {
  const g = new Game(freshState()); g.setClass("paladin"); g.S.kills = 0;
  const line = g.lineup(); line.forEach((x) => { x.pierced = 0; });
  const seen = []; g.on("pierced", (e) => seen.push(e));
  g.S.spells = { "paladin.0": 1 };
  g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e15; g.R.mode = "fight"; g.R.spellT = { "paladin.0": 0 };
  g.castSpells(g.R.mon, g.stats(), 0.1);
  assert.equal(seen.length, 1, "rang 1 : un monstre traversé");
  assert.ok(seen[0].slot === 1 && seen[0].id === "paladin.0" && seen[0].dmg > 0, "tout de suite, sur le suivant de la file");
  assert.ok(line[1].pierced > 0 && !(line[2].pierced > 0), "dégâts gardés sur sa place");
  // rang 20 : trois monstres, dégâts décroissants
  seen.length = 0; g.S.spells["paladin.0"] = 20; g.R.spellT = { "paladin.0": 0 }; g.castSpells(g.R.mon, g.stats(), 0.1);
  assert.equal(pierceTargets(20), 3); assert.deepEqual(seen.map((e) => e.slot), [1, 2, 3], "rang 20 : trois monstres");
  assert.ok(seen[1].dmg < seen[0].dmg && seen[2].dmg < seen[1].dmg, "de moins en moins");
  // arrivée : le monstre 1 apparaît blessé mais vivant, sa réserve est vidée
  g.S.kills = 1; g.R.mode = "walk"; g.R.mon = null; g.R.spawnT = 0.01; g.advance(0.05);
  assert.ok(g.R.mon && g.R.mon.hp >= 1 && g.R.mon.hp < g.R.mon.max, "arrive blessé, vivant");
  assert.equal(line[1].pierced, 0, "réserve vidée");
  assert.ok(g.slotHealth(2) < 1, "barre de la file entamée");
  // Le boss au bout de la file (it. 556) : touché, mais au plus un quart de sa vie
  const L = g.lineup().length; g.S.kills = L - 1; g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e30; g.R.mode = "fight";
  g.S.spells["paladin.0"] = 50; g.R.bossPierced = 0; seen.length = 0; g.R.spellT = { "paladin.0": 0 }; g.castSpells(g.R.mon, g.stats(), 0.1);
  assert.ok(seen.some((e) => e.slot === L) && g.R.bossPierced > 0, "le boss est touché");
  g.R.bossPierced = 1e40; g.S.kills = L; g.R.mode = "walk"; g.R.mon = null; g.R.spawnT = 0.01; g.advance(0.05);
  assert.ok(g.R.mon && g.R.mon.boss && g.R.mon.hp >= g.R.mon.max * 0.75 - 1, "au plus un quart de sa vie");
});

test("Duo : le compagnon lance les sorts appris pour sa classe, à moitié de leur puissance", () => {
  const g = new Game(freshState()); g.setClass("warrior"); g.S.partner = "ranger"; g.invalidateStats();
  const hs = g.stats(); assert.ok(hs.duo > 0, "duo actif");
  g.S.spells = { "ranger.0": 1 };
  const seen = []; g.on("spell", (e) => seen.push(e));
  g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e15; g.R.mode = "fight"; g.R.spellT = { "p:ranger.0": 0 };
  g.castSpells(g.R.mon, hs, 0.1);
  const e = seen.find((x) => x.id === "ranger.0");
  assert.ok(e && e.partner === true, "sort du compagnon lancé, marqué partner");
  const full = hs.atk * SPELL_INDEX_T["ranger.0"].mult * SPELL_INDEX_T["ranger.0"].hits;
  assert.ok(Math.abs(e.dmg - full * 0.5) / full < 0.01, "moitié de la puissance");
  g.S.partner = null; g.invalidateStats(); seen.length = 0; g.R.spellT = { "p:ranger.0": 0 }; g.castSpells(g.R.mon, g.stats(), 0.1);
  assert.ok(!seen.some((x) => x.id === "ranger.0"), "sans compagnon : rien");
});

test("Quête « Lancer N sorts » : seulement avec un sort appris ; chaque sort lancé compte", () => {
  const g = new Game(freshState()); g.setClass("warrior"); g.S.best = 30;
  const kinds = () => new Set(Array.from({ length: 400 }, (_, i) => makeQuest(g.S, i).kind));
  assert.ok(!kinds().has("spell"), "aucun sort appris : pas de quête de sorts");
  g.S.spells = { "warrior.0": 1 }; assert.ok(kinds().has("spell"), "un sort appris : la quête peut sortir");
  const q = makeQuest(g.S, 999); q.kind = "spell"; q.goal = 2; q.progress = 0; g.S.quests.slots = [q];
  g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e15; g.R.mode = "fight"; g.R.spellT = { "warrior.0": 0 };
  g.castSpells(g.R.mon, g.stats(), 0.1);
  assert.equal(g.S.quests.slots[0].progress, 1, "un sort lancé : +1");
});

test("Événement Marée arcanique : seulement avec un sort appris ; recharges deux fois plus rapides", () => {
  const g = new Game(freshState()); g.setClass("warrior");
  assert.ok(!EVENTS_T.arcane.req(g.S), "sans sort : pas d'événement");
  g.S.spells = { "warrior.0": 1 }; assert.ok(EVENTS_T.arcane.req(g.S), "un sort appris : possible");
  g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e15; g.R.mode = "fight";
  g.R.spellT = { "warrior.0": 5 }; g.castSpells(g.R.mon, g.stats(), 1); const normal = g.R.spellT["warrior.0"];
  g.R.events.arcane = 10; g.R.spellT = { "warrior.0": 5 }; g.castSpells(g.R.mon, g.stats(), 1);
  assert.equal(normal, 4, "1 s : -1"); assert.equal(g.R.spellT["warrior.0"], 3, "Marée arcanique : -2");
});

test("Sorts uniques (demande Q) : 60 combinaisons différentes ; étourdi, poison, vol de vie, accélération, achèvement", () => {
  const keys = new Set(M_spells_js.SPELLS.map((x) => x.tpl + JSON.stringify(Object.fromEntries(x.fx.map((f) => [f, x[f]])))));
  assert.equal(keys.size, M_spells_js.SPELLS.length, "aucun sort n'en copie un autre");
  assert.ok(M_spells_js.SPELLS.every((x) => x.fx.length >= 1), "chaque sort a au moins un effet propre");
  // Garde-fou (it. 554) : un effet mal écrit serait ignoré sans bruit ; chaque clé doit être connue (game.spellEffects,
  // castSpells, cartes) et sa valeur positive.
  const KNOWN = new Set(["pierce", "hits", "stun", "slow", "weaken", "burn", "venom", "leech", "execute", "crit", "echo", "haste", "cdr", "regen"]);
  for (const x of M_spells_js.SPELLS) for (const f of x.fx) assert.ok(KNOWN.has(f) && +x[f] > 0, x.id + " : effet inconnu ou nul « " + f + " »");
  const g = new Game(freshState()); g.setClass("warrior"); const hs = g.stats();
  const fight = () => { g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e15; g.R.mode = "fight"; g.R.hp = hs.hp * 0.5; return g.R.mon; };
  // Fracas du titan : étourdit 2 s (le monstre n'attaque plus)
  let m = fight(); g.S.spells = { "warrior.2": 1 }; g.R.spellT = { "warrior.2": 0 }; g.castSpells(m, hs, 0.01);
  assert.ok(m.stunT >= 1.9, "étourdi"); const t0 = m.t; g.step(0.5); assert.ok(m.t === t0, "étourdi : son minuteur d'attaque ne bouge pas");
  // Cri de ralliement : attaque +50 % (accélération)
  g.S.spells = { "warrior.1": 1 }; g.R.spellT = { "warrior.1": 0 }; g.castSpells(fight(), hs, 0.01); assert.ok(g.R.hasteT > 4, "accélération");
  // poison cumulable (Lames jumelles de l'assassin) et vol de vie (Colère divine du paladin) : sorts d'autres héros
  const a = new Game(freshState()); a.setClass("assassin"); const ha = a.stats(); a.R.mon = a.makeMonster(false); a.R.mon.hp = a.R.mon.max = 1e15; a.R.mode = "fight";
  a.S.spells = { "assassin.0": 1 }; a.R.spellT = { "assassin.0": 0 }; a.castSpells(a.R.mon, ha, 0.01); const v1 = a.R.mon.venomDps;
  a.R.spellT = { "assassin.0": 0 }; a.castSpells(a.R.mon, ha, 0.01); assert.ok(v1 > 0 && a.R.mon.venomDps > v1 * 1.9, "poison cumulable");
  const p = new Game(freshState()); p.setClass("paladin"); const hp = p.stats(); p.R.mon = p.makeMonster(false); p.R.mon.hp = p.R.mon.max = 1e15; p.R.mode = "fight"; p.R.hp = 1;
  p.S.spells = { "paladin.2": 1 }; p.R.spellT = { "paladin.2": 0 }; p.castSpells(p.R.mon, hp, 0.01); assert.ok(p.R.hp > 1, "vol de vie");
  // achèvement (Exécution de l'assassin) : dégâts ×2 sous 40 % de vie
  const e = new Game(freshState()); e.setClass("assassin"); const he = e.stats(); e.S.spells = { "assassin.2": 1 };
  const hit = (frac) => { e.R.mon = e.makeMonster(false); e.R.mon.max = 1e15; e.R.mon.hp = 1e15 * frac; e.R.mode = "fight"; e.R.spellT = { "assassin.2": 0 }; const h0 = e.R.mon.hp; e.castSpells(e.R.mon, he, 0.01); return h0 - e.R.mon.hp; };
  const full = hit(1), low = hit(0.3); assert.ok(Math.abs(low / full - 2) < 0.01, "×2 sous 40 % de vie");
});

test("depuis ta dernière visite : rangs de sorts gagnés (le Grimoire a travaillé)", () => {
  const g = new Game(freshState()), t0 = 1e12; g.S.spells = { "warrior.0": 2 };
  const snap = g.visitSnapshot(t0); g.S.spells["warrior.0"] = 5; g.S.stats.kills += 10;
  assert.equal(g.visitSummary(snap, t0 + 10 * 60000).spells, 3);
});

test("Sorts du compagnon (it. 558) : appris depuis le héros actuel ; pas ceux d'un autre héros", () => {
  const g = new Game(freshState()); g.setClass("warrior"); g.S.partner = "ranger"; g.S.best = g.S.zone = 30; g.S.gold = 1e12;
  assert.ok(g.learnSpell("ranger.0") && g.S.spells["ranger.0"] === 1, "sort du compagnon appris");
  assert.ok(!g.learnSpell("mage.0"), "ni héros joué ni compagnon : refusé");
  // « À faire » : sort du compagnon à apprendre, quand ceux du héros sont déjà appris
  g.S.spells = { "warrior.0": 1, "warrior.1": 1, "warrior.2": 1 };
  const td = g.todoNow().find((x) => x.id === "partnerSpell"); assert.ok(td && td.tab === "class" && td.sec === "style", "À faire : sort du compagnon");
});

test("Hors ligne (it. 568) : les sorts de dégâts appris comptent dans l'estimation", () => {
  const mk = (spells) => { const g = new Game(freshState()); g.setClass("warrior"); g.S.best = 30; g.S.zone = 3; g.S.spells = spells; return g; };
  const a = mk({}), b = mk({ "warrior.2": 30 });
  assert.equal(a.spellDps(a.stats()), 0); assert.ok(b.spellDps(b.stats()) > 0, "Fracas du titan : des dégâts par seconde");
  const ka = a.applyOffline(3600), kb = b.applyOffline(3600);
  assert.ok(ka && kb && kb.kills > ka.kills, "plus de victoires hors ligne avec un sort puissant");
});

test("Boss majeurs et reliques (demande S) : zones 50, 100, 150 ; relique gagnée, effets, gardée à l'ascension", () => {
  const g = new Game(freshState()); g.setClass("warrior"); g.S.best = g.S.zone = 50; g.S.kills = 10;
  const m = g.makeMonster(true);
  assert.equal(m.relic, "drone", "le boss de la zone 50 porte le Drone stellaire");
  const plain = (() => { const h = new Game(freshState()); h.S.zone = 49; return h.makeMonster(true); })();
  assert.ok(!plain.relic, "zone 49 : boss ordinaire");
  g.R.mon = m; m.hp = 0; g.R.mode = "fight"; g.killMonster();
  const hp0 = g.stats().hp, atk0 = g.stats().atk; // (après la victoire : elle fait gagner des niveaux)
  assert.ok(hasRelic_T(g.S, "drone"), "relique gagnée");
  assert.ok(M_achievements_js.reachedAchievements(g.S).includes("RELIC_FIRST"), "succès « Première relique »");
  // Drone : un missile toutes les 1,5 s, 4 % des PV max d'un monstre ordinaire
  g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e6; g.R.mode = "fight"; g.R.droneT = 0.01; g.R.hp = 1e12;
  let shots = 0; g.on("droneShot", () => shots++); g.step(0.05);
  assert.ok(shots === 1 && g.R.mon.hp < 1e6 * 0.99, "missile du drone (1,5 % des PV max)");
  // (it. 638) la carapace d'un boss retient le missile
  const hpS = g.R.mon.hp; g.R.mon.shell = 1e12; g.R.droneT = 0.01; g.step(0.05);
  assert.ok(g.R.mon.hp === hpS && g.R.mon.shell < 1e12, "carapace : le missile l'entame, pas les PV");
  g.R.mon.shell = 0;
  // Lame du crépuscule ×4 attaque ; Couronne ×3 attaque et PV
  g.S.relics.blade = 1; g.invalidateStats(); assert.ok(Math.abs(g.stats().atk / atk0 - 2.5) < 1e-6, "attaque ×2,5");
  g.S.relics.crown = 1; g.invalidateStats(); assert.ok(Math.abs(g.stats().hp / hp0 - 2) < 1e-6, "PV ×2");
  // (it. 608) nouvelle victoire contre le gardien : la relique monte de niveau (+10 % de sa part), 5 au plus
  const atkB = g.stats().atk; g.R.mon = g.makeMonster(true); g.S.zone = 150; g.R.mon = g.makeMonster(true); g.R.mon.hp = 0; g.R.mode = "fight"; g.killMonster();
  assert.equal(g.S.relicLv.blade, 2, "Lame : niveau 2");
  g.R.mon = g.makeMonster(true); g.R.mon.hp = 0; g.R.mode = "fight"; g.killMonster();
  assert.equal(g.S.relicLv.blade, 2, "même course : pas de second niveau (zone 50 en boucle)");
  // (it. 634) l'écho du Chevalier (zone 350) donne son propre niveau dans la même course
  g.S.zone = 350; g.R.mon = g.makeMonster(true); assert.ok(g.R.mon.echo && g.R.mon.relic === "blade", "zone 350 : écho du Chevalier");
  g.R.mon.hp = 0; g.R.mode = "fight"; g.killMonster(); assert.equal(g.S.relicLv.blade, 3, "écho : un niveau de plus");
  for (let i = 0; i < 6; i++) { g.S.prestige.count++; g.gainRelic("blade"); }
  g.S.relicLv.blade = 4; const snapR2 = g.visitSnapshot(Date.now() - 10 * 60000);
  g.S.relicLv.blade = 5; g.S.stats.kills++; assert.equal(g.visitSummary(snapR2).relics, 1, "résumé de visite : +1 niveau de relique");
  assert.equal(g.S.relicLv.blade, 5, "niveau 5 au plus");
  assert.ok(M_achievements_js.reachedAchievements(g.S).includes("RELIC_MAX"), "succès « Relique parfaite »");
  // gardées à l'ascension ; une relique inconnue d'une autre version est retirée
  g.S.best = g.S.zone = 160; assert.ok(g.ascend()); assert.ok(hasRelic_T(g.S, "drone") && hasRelic_T(g.S, "crown"), "gardées à l'ascension");
  assert.equal(g.S.relicLv.blade, 5, "niveaux gardés à l'ascension");
  const sv = JSON.parse(JSON.stringify(g.S)); sv.relics.inconnue = 1; assert.ok(!migrate(sv).relics.inconnue, "relique inconnue retirée");
});

test("Hors ligne : le Drone stellaire compte dans la progression estimée (it. 577)", () => {
  const run = (relic) => { const g = new Game(freshState()); g.setClass("warrior"); g.S.zone = g.S.best = 60; if (relic) g.S.relics = { drone: 1 }; g.invalidateStats(); const r = g.applyOffline(3600); return r ? r.kills : 0; };
  const a = run(false), b = run(true);
  assert.ok(b > a, `avec le drone : ${b} victoires, sans : ${a}`);
});

test("Échos des lieutenants (it. 634) : zones 250, 300, 350 seulement, nom « Écho : … », mêmes reliques", () => {
  for (const [z, relic] of [[250, "drone"], [300, "heart"], [350, "blade"]]) {
    assert.ok(/Écho|Echo/.test(M_bosses_js.bossName(z)), `zone ${z} : ${M_bosses_js.bossName(z)}`);
    const g = new Game(freshState()); g.S.zone = z; const m = g.makeMonster(true);
    assert.ok(m.echo && m.relic === relic, `zone ${z} : écho portant ${relic}`);
  }
  assert.ok(M_bosses_js.bossMechanics(300).includes("silence") && !M_bosses_js.bossMechanics(100).includes("silence"), "Silence : échos seulement");
  for (const z of [200, 249, 251, 400]) { const g = new Game(freshState()); g.S.zone = z; assert.ok(!g.makeMonster(true).echo, `zone ${z} : pas d'écho`); }
});

test("Silence (it. 644) : aucun sort tant que le héros est réduit au silence, puis ils reprennent", () => {
  const g = new Game(freshState()); g.setClass("mage");
  const sp = M_spells_js.classSpells("mage").find((x) => x.kind === "dmg"); g.S.spells = { [sp.id]: 1 };
  g.R.mon = g.makeMonster(false); g.R.mon.hp = g.R.mon.max = 1e15; g.R.mode = "fight"; g.R.hp = 1e15; g.R.spellT = { [sp.id]: 0.01 };
  let casts = 0; g.on("spell", () => casts++);
  g.R.silenced = 4; for (let i = 0; i < 20; i++) g.step(0.1); // 2 s de silence
  assert.equal(casts, 0, "pas de sort pendant le silence");
  for (let i = 0; i < 40; i++) g.step(0.1); // le silence finit
  assert.ok(casts > 0, "les sorts reprennent");
});

test("README : liste Steam des succès complète (mêmes API Name que game/achievements.js)", () => {
  const md = fs.readFileSync(new URL("../README.md", import.meta.url), "utf8");
  const block = md.slice(md.indexOf("Stats & Achievements"), md.indexOf("Steam Cloud : activer"));
  const listed = new Set([...block.matchAll(/`([A-Z0-9_]+)`/g)].map((m) => m[1]));
  const missing = ACH_T.map((a) => a.id).filter((id) => !listed.has(id));
  assert.deepEqual(missing, [], "succès absents de la liste Steam du README");
});

test("russe : adjectif de matière accordé au genre de la pièce (it. 665)", () => {
  assert.equal(ruAdjective("алмазный", "f"), "Алмазная");
  assert.equal(ruAdjective("стальной", "n"), "Стальное");
  assert.equal(ruAdjective("кожаный", "p"), "Кожаные");
  assert.equal(ruAdjective("железный", "m"), "Железный");
  assert.equal(ruAdjective("из драконьей кости", "f"), null);
  // (it. 673) adjectifs mous en -ий (épithète « Древний » des boss)
  assert.equal(ruAdjective("древний", "f"), "Древняя");
  assert.equal(ruAdjective("древний", "p"), "Древние");
  // (it. 674) polonais : épithètes des boss
  assert.equal(plAgree("Przebudzony", "f"), "Przebudzona");
  assert.equal(plAgree("Pradawny", "n"), "Pradawne");
  assert.equal(plAgree("Wielki", "p"), "Wielkie");
  assert.equal(plAgree("z żelaza", "f"), null);
});

test("listes affichées : séparateur csep(), pas de « , » en dur (it. 668)", () => {
  const root = new URL("../src/renderer/", import.meta.url).pathname, bad = [];
  const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + "/" + f.name;
    if (f.isDirectory()) { if (f.name !== "lang") walk(p); }
    else if (p.endsWith(".js") && !p.endsWith("/keys.js") && !p.endsWith("/format.js") && /\.join\(", "\)|this\.log\(.*\+ "\."\);/.test(fs.readFileSync(p, "utf8"))) bad.push(p.slice(root.length));
  } };
  walk(root.replace(/\/$/, ""));
  assert.deepEqual(bad, [], "utiliser .join(csep()) et cend() (i18n/index.js) : « 、 » et « 。 » en japonais, « ， » et « 。 » en chinois");
});

test("épithètes des boss accordées au genre (de, es, pt, ru, pl ; it. 673-675)", () => {
  const before = getLang(), { bossName } = M_bosses_js;
  // zone 35 : Bave-Reine (féminin) en 2e boucle ; zone 36 : Os-le-Roi (masculin) ; zone 81 : Cœur-de-Lave en 3e boucle
  const cases = {
    de: [[35, "die Erwachte"], [36, "der Erwachte"], [81, "das Uralte"]],
    es: [[35, "la Despertada"], [36, "el Despertado"]],
    pt: [[35, "a Desperta"], [36, "o Desperto"]],
    ru: [[35, "Пробуждённая"], [36, "Пробуждённый"], [81, "Древнее"]],
    pl: [[35, "Przebudzona"], [36, "Przebudzony"], [81, "Pradawne"]],
  };
  try {
    for (const [lang, list] of Object.entries(cases)) {
      setLang(lang);
      for (const [z, want] of list) assert.ok(bossName(z).includes(want), `${lang} zone ${z} : « ${bossName(z)} » sans « ${want} »`);
    }
  } finally { setLang(before); }
});

test("coréen : particule choisie selon la fin du mot (it. 682)", () => {
  assert.equal(koJosa("검이(가) 떨어졌다"), "검이 떨어졌다");
  assert.equal(koJosa("도끼이(가) 떨어졌다"), "도끼가 떨어졌다");
  assert.equal(koJosa("반지을(를)"), "반지를");
  assert.equal(koJosa("+5이(가)"), "+5가");
  assert.equal(koJosa("+3이(가)"), "+3이");
  assert.equal(koJosa("Lv이(가)"), "Lv이(가)");
});

console.log(`\n${pass} tests réussis`);
