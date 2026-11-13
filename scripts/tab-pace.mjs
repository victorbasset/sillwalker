// Moment d'ouverture de chaque onglet (tabs.js) dans une partie neuve, en minutes de jeu (3 graines, 3 h max).
// Sert à vérifier qu'ils s'ouvrent espacés. Usage : node --experimental-default-type=module scripts/tab-pace.mjs
import { useVirtualClock } from "./virtual-clock.mjs"; // (it. 1009) en premier : Date.now() virtuel
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { freshState } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const { nextUnlock, unlockAvailable } = await import(root + "unlocks.js");
for (const seed of [1, 2, 3]) {
  setRandom(seeded(seed));
  const g = useVirtualClock(new Game(freshState())); const at = {};
  g.on("tabOpen", ({ ids }) => ids.forEach((id) => { at[id] = t; }));
  let t = 0;
  for (; t < 3 * 3600; t++) {
    g.advance(1);
    if (t % 10 === 0) { g.autoEquip(); g.autoSpendTalents?.(); }
    const u = nextUnlock(g.S); if (u && unlockAvailable(g.S, u) && g.S.gold >= u.price) { g.S.gold -= u.price; g.S.unlocks[u.id] = true; }
    if (Object.keys(at).length >= 9) break;
  }
  console.log("graine", seed, Object.entries(at).map(([k, v]) => `${k} ${Math.round(v / 60)} min`).join(" · "), "| zone", g.S.best);
}
