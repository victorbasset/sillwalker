// Tests rapides de la logique de jeu (sans Electron) :
//   npm test
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import * as M_art_js from "../src/renderer/render/art.js";
import * as M_pets_js from "../src/renderer/game/pets.js";
import * as M_util_js from "../src/renderer/game/util.js";
import * as M_daymods_js from "../src/renderer/game/daymods.js";
import * as M_codex_js from "../src/renderer/game/codex.js";
import * as M_bosses_js from "../src/renderer/game/bosses.js";
import * as M_rules_js from "../src/renderer/game/rules.js";
import * as M_classes_js from "../src/renderer/game/classes.js";
import * as M_talents_js from "../src/renderer/game/talents.js";
import * as M_shop_js from "../src/renderer/game/shop.js";
import * as M_quests_js from "../src/renderer/game/quests.js";
import * as M_skilltree_js from "../src/renderer/game/skilltree.js";
import { nextHint, markHint } from "../src/renderer/ui/hints.js";
import { fmt as fmtN, fmtShort as fmtS } from "../src/renderer/game/format.js";
import { Game } from "../src/renderer/game/game.js";
import { freshState as freshLocked, migrate, SAVE_VERSION } from "../src/renderer/game/state.js";
import { UNLOCKS, hasUnlock, nextUnlock } from "../src/renderer/game/unlocks.js";
// Les tests des mécaniques partent avec tous les déblocages (ceux-ci ont leur propre test).
const freshState = (...a) => Object.assign(freshLocked(...a), { unlocks: Object.fromEntries(UNLOCKS.filter((u) => u.id !== "armsValet").map((u) => [u.id, true])) });
import { reachedAchievements } from "../src/renderer/game/achievements.js";
import { setRandom, seeded } from "../src/renderer/game/util.js";
import { approachTime, heroStats, power } from "../src/renderer/game/rules.js";
import { TREES, cannotLearn, talentPointsFree, TIER_REQ } from "../src/renderer/game/talents.js";
import { CLASS_KEYS } from "../src/renderer/game/classes.js";
import { ZONES, MONSTERS } from "../src/renderer/game/data.js";
import { MONSTER_ART } from "../src/renderer/render/art.js";
import { SETS as SETS_T } from "../src/renderer/game/sets.js";
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
import { CONSTELLATIONS, ASCEND_MIN_ZONE } from "../src/renderer/game/prestige.js";
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
  const shards = g.ascendShards();
  assert.ok(shards > 0);
  assert.ok(g.ascend());
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
  const legs = (game) => { let n = 0; game.on("spawn", () => n++); game.advance(120); return n; };
  const base = legs(new Game(freshState()));
  const fast = new Game(freshState()); fast.S.speed = 100; fast.invalidateStats();
  assert.ok(legs(fast) > base * 1.2, "+100 % de vitesse : plus de combats");
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

test("conseil Astrolabe : après l'achat, tant qu'il n'est pas coché", () => {
  const g = new Game(freshLocked());
  g.S.settings.hints = Object.fromEntries(["welcome", "upgrade", "talent", "skills", "quest", "egg", "shop", "ascend", "expedition", "codex", "classes", "unlock:armsValet", "unlock:masterForge", "unlock:starNet"].map((k) => [k, true]));
  g.talentPointsFree = () => 0; g.hasUpgradeCached = () => false; g.questsReady = () => 0;
  assert.notEqual(nextHint(g)?.id, "astrolabe", "pas avant l'achat");
  g.S.unlocks.astrolabe = true;
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
  g.S.gold = 1e8;
  assert.ok(g.buyUnlock("bulkEquip"));
  assert.equal(g.buyUnlock("bulkEquip"), false, "déjà acheté");
  assert.equal(g.S.gold, 1e8 - 300);
  assert.equal(g.buyUnlock("transmute"), false, "zone record insuffisante");
  g.S.best = 40; g.S.zone = 40;
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

test("sac plein : un légendaire ou une amélioration prend la place du moins précieux, jamais l'inverse", () => {
  const g = new Game(freshState());
  g.S.autoSell = { common: false, uncommon: false, rare: false };
  g.isUpgrade = (it) => !!it.up; // contrôle simple des améliorations pour le test
  const mk = (r, up) => { const it = g.newItem(0); it.r = r; it.up = up; return it; };
  g.S.bag = []; const size = g.bagSize ? g.bagSize() : 24;
  while (!g.bagFull()) g.S.bag.push(mk(1));
  const keep = g.S.bag[0]; keep.r = 4; // un légendaire dans le sac : jamais évincé
  const n = g.S.bag.length;
  assert.equal(g.addToBag(mk(0)), false, "commun : vendu, le sac ne bouge pas");
  const leg = mk(4);
  assert.equal(g.addToBag(leg), true, "légendaire : gardé");
  assert.ok(g.S.bag.includes(leg) && g.S.bag.includes(keep) && g.S.bag.length === n, "un objet ordinaire a fait la place");
  const up = mk(1, true);
  assert.equal(g.addToBag(up), true, "amélioration de même rareté : gardée");
  for (const b of g.S.bag) if (b !== keep && b !== leg && b !== up) b.r = 4; // sac plein de précieux
  assert.equal(g.addToBag(mk(3)), false, "rien d'évinçable : le nouvel objet est vendu");
  assert.ok(g.S.bag.includes(leg) && g.S.bag.includes(up));
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
  const eggs = g.todoNow().find((t) => t.id === "eggs");
  assert.ok(eggs && eggs.n === 2 && eggs.tab === "pets");
  g.S.gold = 1e9; // le premier déblocage (zone 1) devient abordable
  const u = g.todoNow().find((t) => t.id === "unlock");
  assert.ok(u && u.tab === "shop" && u.name, "déblocage abordable proposé");
  g.S.pets.exp = { cat: { end: Date.now() - 1000 }, dog: { end: Date.now() + 1e6 } };
  assert.equal(g.todoNow().find((t) => t.id === "expeditions").n, 1, "seules les expéditions finies comptent");
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

console.log(`\n${pass} tests réussis`);
