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
}
const base = JSON.parse(fs.readFileSync(ROOT + "dev-data/save.json", "utf8"));
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
let fails = 0;
for (const [name, f] of sweep) { const r = check(f, 1000); if (r) { fails++; console.log(r, name); } }
console.log(fails ? "ÉCHECS du balayage : " + fails + " / " + sweep.length : "ok balayage (" + sweep.length + " corruptions)");
