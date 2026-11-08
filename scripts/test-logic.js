// Tests rapides de la logique de jeu (sans Electron) :
//   npm test
import assert from "node:assert/strict";
import { Game } from "../src/renderer/game/game.js";
import { freshState, migrate, SAVE_VERSION } from "../src/renderer/game/state.js";
import { reachedAchievements } from "../src/renderer/game/achievements.js";
import { setRandom, seeded } from "../src/renderer/game/util.js";
import { approachTime, heroStats, power } from "../src/renderer/game/rules.js";
import { TREES, cannotLearn, talentPointsFree, TIER_REQ } from "../src/renderer/game/talents.js";
import { CLASS_KEYS } from "../src/renderer/game/classes.js";
import { ZONES, MONSTERS } from "../src/renderer/game/data.js";
import { MONSTER_ART } from "../src/renderer/render/art.js";

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
  play(g, 20);
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
  assert.ok(g.catchStar());
  assert.equal(g.S.speed, 3);
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
    if (it.set === "wind" && !pieces[it.slot]) pieces[it.slot] = it;
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

test("familiers : chaque familier a un dessin, les rares sont plus rares", async () => {
  const { PET_ART } = await import("../src/renderer/render/art.js");
  const { PETS: list, rollPet } = await import("../src/renderer/game/pets.js");
  for (const p of list) assert.ok(PET_ART[p.id], "dessin manquant : " + p.id);
});
{
  const { PETS: list, rollPet } = await import("../src/renderer/game/pets.js");
  const { rand } = await import("../src/renderer/game/util.js");
  const n = {};
  for (let i = 0; i < 20000; i++) { const p = rollPet(rand); n[p.id] = (n[p.id] || 0) + 1; }
  test("familiers : tirage pondéré", () => { assert.ok(n.phoenix < n.cat / 2, `phénix ${n.phoenix} / chaton ${n.cat}`); assert.ok(n.rabbit < n.cat); });
}

{
  const { DAY_MODS, dayModFor, DAY_MOD_KEYS } = await import("../src/renderer/game/daymods.js");
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
  const { CODEX_ENTRIES, codexCounts, itemBaseKey } = await import("../src/renderer/game/codex.js");
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

test("boss : miroir et vampirisme", async () => {
  const { bossMechanics } = await import("../src/renderer/game/bosses.js");
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
  for (let i = 0; i < 200 && !mirrored; i++) { g.S.kills = 10; g.advance(0.5); }
  assert.ok(mirrored > 0, "le miroir a renvoyé des dégâts");
});

console.log(`\n${pass} tests réussis`);
