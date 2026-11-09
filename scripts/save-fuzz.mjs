// Sauvegardes abîmées : chaque cas corrompt une partie de la sauvegarde de dev (null, valeur inconnue…),
// puis migrate() + 200 s de jeu + absence d'une heure + actions groupées ne doivent ni planter ni produire de NaN.
// Usage : node --experimental-default-type=module scripts/save-fuzz.mjs (à relancer si on ajoute une donnée sauvegardée).
import fs from "node:fs";
const ROOT = new URL("..", import.meta.url).pathname;
const R = ROOT + "src/renderer/game/";
const { migrate } = await import(R + "state.js");
const { Game } = await import(R + "game.js");
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
for (const [name, f] of Object.entries(cases)) {
  const o = JSON.parse(JSON.stringify(base)); f(o);
  try {
    const s = migrate(o); const g = new Game(s);
    for (let i = 0; i < 2000; i++) g.step(0.1);
    g.todoNow(); g.uselessItems(); g.stats(); g.autoEquip(); g.applyOffline(3600);
    for (const m of ["hatchAll", "claimAllExpeditions", "autoSpendTalents", "autoSpendSkills"]) g[m]?.();
    const bad = ["gold", "xp", "lvl", "zone"].filter((k) => !Number.isFinite(g.S[k]));
    console.log(bad.length ? "NaN " + bad : "ok", name);
  } catch (e) { console.log("ERREUR", name, e.message, (e.stack.split("\n")[1] || "").trim()); }
}
