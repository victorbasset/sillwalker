// Les dix premières minutes d'une partie neuve (3 graines) : seconde de la première fois pour chaque récompense
// (objet, rare, épique, légendaire, élite, boss, niveaux, œuf, quête, événement, premier déblocage payable).
// Usage : node --experimental-default-type=module scripts/first-minutes.mjs
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { freshState } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
for (const seed of [1, 2, 3]) {
  setRandom(seeded(seed));
  const g = new Game(freshState());
  const first = {}; let t = 0;
  const mark = (k) => { if (!(k in first)) first[k] = Math.round(t); };
  g.on("loot", ({ item }) => { mark("objet"); if (item.r >= 2) mark("rare"); if (item.r >= 3) mark("épique"); if (item.r >= 4) mark("légendaire"); });
  g.on("kill", ({ mon }) => { if (mon.boss) mark("boss"); if (mon.elite) mark("élite"); });
  g.on("levelUp", ({ lvl }) => mark("niv" + lvl));
  g.on("event", () => mark("événement"));
  g.on("questDone", () => mark("quête"));
  for (; t < 900; t += 1) { g.advance(1); if (t % 10 === 0) g.autoEquip(); if (g.S.pets.eggs) mark("œuf"); if (g.S.gold >= 300) mark("300 or (1er déblocage)"); }
  console.log("graine", seed, "zone", g.S.best, "niv", g.S.lvl, JSON.stringify(first));
}
