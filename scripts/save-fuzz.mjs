// Sauvegardes abîmées : chaque cas corrompt une partie de la sauvegarde de dev (null, valeur inconnue…),
// puis migrate() + 200 s de jeu + absence d'une heure + actions groupées ne doivent ni planter ni produire de NaN.
// Usage : node --experimental-default-type=module scripts/save-fuzz.mjs (à relancer si on ajoute une donnée sauvegardée).
import fs from "node:fs";
const ROOT = new URL("..", import.meta.url).pathname;
const R = ROOT + "src/renderer/game/";
const { migrate, freshState } = await import(R + "state.js");
const { Game } = await import(R + "game.js");
const { KILLS_PER_ZONE } = await import(R + "data.js");
const { nextUnlock } = await import(R + "unlocks.js");
const { CONSUMABLES, CHESTS, UPGRADES, WORKSHOP } = await import(R + "shop.js");
const { CONSTELLATIONS } = await import(R + "prestige.js");
const { TREES } = await import(R + "talents.js");
const { classSpells } = await import(R + "spells.js");
/**
 * (it. 903) Moments à risque joués à coup sûr pour chaque corruption : avant, seul le hasard du combat les amenait
 * (la mort face à un boss avec bossDefeats abîmé ne plantait qu'une fois sur deux, it. 902).
 */
function exercise(g) {
  const S = g.S, R = g.R;
  R.mon = g.makeMonster(true); g.heroDown();                                    // mort face à un boss
  R.mode = "walk"; R.mon = g.makeMonster(true); R.mon.hp = 0; S.kills = KILLS_PER_ZONE; g.killMonster(); // boss vaincu
  g.startEvent("bloodmoon"); g.tickEvents(31);                                  // événement rare et son bilan
  g.openChest(); R.star = { t: 5, life: 12 }; g.catchStar();                    // coffre, étoile filante
  S.gold = 1e30; const u = nextUnlock(S); if (u) g.buyUnlock(u.id);             // achat d'un déblocage
  for (const q of [...(S.quests.slots || [])]) if (q) g.claimQuest(q.uid);      // quêtes réclamées
  g.visitSummary(g.visitSnapshot(0));
  // (it. 904) actions du joueur : sac, forge, boutique, potion, familiers, points, zone, quête, récompense, ascension
  g.sortBag(); const it = S.bag[0];
  if (it) { g.forge(it); g.reforge(it); g.equip(it); }
  g.unequip("weapon"); g.transmute(); g.sellUseless(); if (S.bag[0]) g.sell(S.bag[0]);
  for (const c of CONSUMABLES) g.buyConsumable(c.id);
  for (const c of CHESTS) g.buyChest(c.id);
  g.buyEgg(); g.restockShop(); if (S.shop && S.shop.items && S.shop.items[0]) g.buyShopItem(S.shop.items[0].id);
  for (const x of UPGRADES) g.buyUpgrade(x.id);
  for (const x of WORKSHOP) g.buyWorkshop(x.id);
  R.hp = 1; R.potionCd = 0; g.drinkPotion(g.stats());
  g.hatchEgg(); const pet = Object.keys(S.pets.owned || {})[0]; if (pet) { g.setPet(pet); g.sendExpedition(pet, "short"); }
  const sp = classSpells(S.cls)[0]; if (sp) g.learnSpell(sp.id);
  const tr = TREES[S.cls]; if (tr) g.learnTalent(tr[0].talents[0].id);
  for (const c of CONSTELLATIONS) g.buyConstellation(c.id, { quiet: true });
  g.setZone(1); const q = (S.quests.slots || [])[0]; if (q) g.rerollQuest(q.uid);
  g.claimDaily("2030-01-01");
  S.best = Math.max(S.best, 40); g.ascend();
}
// (it. 999) FUZZ_BASE=fin : la partie de fin de partie (scripts/fixtures/endgame-save.json : 20 ascensions, reliques,
// automatismes, compagnon) au lieu de dev-data ; des champs absents de dev-data y sont abîmés à leur tour
// (it. 1149) FUZZ_BASE=0.1.2 : une partie de la version 0.1.2 (scripts/fixtures/save-0.1.2.json), qui passe aussi par
// migrate() avec des données d'une version plus ancienne
const BASES = { fin: "scripts/fixtures/endgame-save.json", "0.1.2": "scripts/fixtures/save-0.1.2.json" };
const base = JSON.parse(fs.readFileSync(ROOT + (BASES[process.env.FUZZ_BASE] || "dev-data/save.json"), "utf8"));
const cases = {
  questsNull: (o) => { o.quests.slots = [null, { kind: "kill" }]; },
  talentsBad: (o) => { o.talents = { nope: 3, w_str: null }; },
  petOwnedBad: (o) => { const k = Object.keys(o.pets.owned)[0]; o.pets.owned[k] = null; },
  petLvlNaN: (o) => { const k = Object.keys(o.pets.owned)[0]; o.pets.owned[k] = { lvl: null, xp: "x" }; },
  shopBad: (o) => { o.shop = { items: [null, { id: 1 }], next: "x" }; },
  buffsBad: (o) => { o.buffs = { nope: 99, elixir: null }; },
  upgradesBad: (o) => { o.upgrades = { nope: 5, bag: null }; },
  ranksBad: (o) => { o.prestige.ranks = { nope: 4, warrior: null }; },
  skillsBad: (o) => { o.skills = { order: [null, "nope"], nope: 3 }; },
  expBad: (o) => { const k = Object.keys(o.pets.owned)[1]; o.pets.exp = { [k]: { kind: "nope", end: null } }; },
  dailyBad: (o) => { o.daily = { mod: "nope", day: null, streak: "x" }; },
  achBad: (o) => { o.achievements = [null, 5, "nope"]; },
  bestiaryBad: (o) => { o.bestiary = { nope: null, x: "y" }; },
  workshopBad: (o) => { o.workshop = { nope: 3, w1: null }; },
  logBad: (o) => { o.log = [null, 5, {}]; },
  tabsBad: (o) => { o.tabsOpen = { talents: null, nope: "x", shop: 5 }; },
  tabsNotObj: (o) => { o.tabsOpen = "x"; },
  journeyBad: (o) => { o.journey = [null, 5, { t: "x" }, { t: 1, k: "zone", v: 5 }, { t: 2, k: "nope" }]; },
  journeyChron: (o) => { o.journey = [{ t: 1, k: "chron", v: "nope" }, { t: 2, k: "chron" }, { t: 3, k: "chron", v: "forge" }]; },
  themeBad: (o) => { o.settings.theme = 42; },
  eventsSeenBad: (o) => { o.stats.eventsSeen = "tout"; },
  newsBad: (o) => { o.settings.newsSeen = "x"; o.settings.eco = "oui"; o.settings.cinematics = null; },
  // Duo, héros libérés et histoire (it. 278)
  partnerBad: (o) => { o.partner = "nope"; o.nextPartner = 42; },
  partnerSameRange: (o) => { o.cls = "warrior"; o.partner = "berserker"; o.classesUnlocked = ["warrior", "berserker"]; },
  heroesBad: (o) => { o.classesUnlocked = [null, "nope", 5, "warrior", "mage"]; o.nextCls = "nope"; },
  storyBad: (o) => { o.story = { intro: "x", read: null, won: 5, wonAt: "y" }; },
  settingsBad: (o) => { o.settings = { lang: 42, autoPets: "x", hints: null }; },
};
// --write-all <dossier> : écrit une sauvegarde qui cumule toutes les corruptions (pour lancer l'interface dessus :
// electron . --crawl --ghost --user-data=<dossier>), sans rien tester ici.
const wa = process.argv.indexOf("--write-all");
if (wa > 0) {
  const o = JSON.parse(JSON.stringify(base));
  const only = process.argv[wa + 2] ? process.argv[wa + 2].split(",") : null; // liste de cas facultative
  for (const [n, f] of Object.entries(cases)) if (!only || only.includes(n)) f(o);
  if (!only) { o.bag.push(null, { slot: "zzz", r: 3 }); o.prestige.shards = null; }
  fs.mkdirSync(process.argv[wa + 1], { recursive: true });
  fs.writeFileSync(process.argv[wa + 1] + "/save.json", JSON.stringify(o));
  console.log("sauvegarde abîmée écrite :", Object.keys(cases).length, "corruptions");
  process.exit(0);
}
/** Une corruption : migrate() + jeu + absence + actions groupées ; renvoie "" si tout va bien, sinon la raison. */
function check(f, steps) {
  const o = JSON.parse(JSON.stringify(base)); f(o);
  try {
    const s = migrate(o); const g = new Game(s);
    for (let i = 0; i < steps; i++) g.step(0.1);
    exercise(g);
    g.todoNow(); g.uselessItems(); g.stats(); g.autoEquip(); g.applyOffline(3600);
    for (const m of ["hatchAll", "claimAllExpeditions", "autoSpendTalents", "autoSpendSkills"]) g[m]?.();
    const bad = ["gold", "xp", "lvl", "zone"].filter((k) => !Number.isFinite(g.S[k]));
    // Réglages affichés en nombre (Réglages > Son) : un NaN s'y voyait (« NaN % », it. 873).
    for (const k of ["volume", "musicVol", "ambVol"]) if (!Number.isFinite(g.S.settings[k])) bad.push("settings." + k);
    return bad.length ? "NaN " + bad : "";
  } catch (e) { return "ERREUR " + e.message + " " + (e.stack.split("\n")[1] || "").trim(); }
}
for (const [name, f] of Object.entries(cases)) { const r = check(f, 2000); console.log(r || "ok", name); }
// Balayage (it. 873) : chaque donnée de la partie (premier niveau, puis champs des sous-objets) reçoit tour à tour
// une valeur absurde ; une donnée sauvegardée ajoutée plus tard y passe d'office, sans écrire de cas (≈ 900 cas, 40 s).
const VALS = [null, "x", 42, [], {}, -1, true];
const NESTED = ["prestige", "quests", "guild", "pets", "skills", "settings", "daily", "stats", "story", "shop", "autoSell", "equip"];
const fresh = freshState(), sweep = [];
for (const k of Object.keys(fresh)) for (const v of VALS) sweep.push([k + " = " + JSON.stringify(v), (o) => { o[k] = structuredClone(v); }]);
for (const k of NESTED) {
  for (const f of Object.keys({ ...(fresh[k] || {}), ...(base[k] || {}) })) for (const v of VALS) {
    sweep.push([k + "." + f + " = " + JSON.stringify(v), (o) => { if (o[k] && typeof o[k] === "object") o[k][f] = structuredClone(v); else o[k] = { [f]: structuredClone(v) }; }]);
  }
}
// (it. 905) champs d'un objet du sac et d'un objet porté, d'une quête, d'un familier possédé et d'une expédition
const deep = [
  ["bag[0]", (o) => o.bag && o.bag[0]], ["equip.weapon", (o) => o.equip && o.equip.weapon],
  ["quests.slots[0]", (o) => o.quests && o.quests.slots && o.quests.slots[0]],
  ["quests.slots[0].reward", (o) => o.quests && o.quests.slots && o.quests.slots[0] && o.quests.slots[0].reward],
  ["pets.owned[0]", (o) => o.pets && o.pets.owned && Object.values(o.pets.owned)[0]],
  ["pets.exp[0]", (o) => o.pets && o.pets.exp && Object.values(o.pets.exp)[0]],
];
for (const [label, get] of deep) {
  const t = get(base);
  if (!t || typeof t !== "object") { console.log("(absent de la sauvegarde de dev : " + label + ")"); continue; }
  for (const f of Object.keys(t)) for (const v of VALS) sweep.push([label + "." + f + " = " + JSON.stringify(v), (o) => { const x = get(o); if (x) x[f] = structuredClone(v); }]);
}
let fails = 0;
for (const [name, f] of sweep) { if (process.env.FUZZ_TRACE) console.log("…", name); const r = check(f, 1000); if (r) { fails++; console.log(r, name); } }
console.log(fails ? "ÉCHECS du balayage : " + fails + " / " + sweep.length : "ok balayage (" + sweep.length + " corruptions)");
