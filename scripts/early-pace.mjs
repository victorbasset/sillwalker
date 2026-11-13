// Rythme de la première heure d'une partie neuve (moyenne de 3 graines) : par tranche de temps, objets reçus,
// niveau, record de zone, déblocages achetés. Sert à régler le début de partie (demande de Victor : plus tranquille).
// Usage : node --experimental-default-type=module scripts/early-pace.mjs
import { useVirtualClock } from "./virtual-clock.mjs"; // (it. 1009) en premier : Date.now() virtuel
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { freshState } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const { nextUnlock, unlockAvailable } = await import(root + "unlocks.js");
const MARKS = [120, 300, 600, 900, 1800, 3600];
const rows = MARKS.map(() => ({ items: 0, lvl: 0, best: 0, unlocks: 0 }));
for (const seed of [1, 2, 3]) {
  setRandom(seeded(seed));
  const g = useVirtualClock(new Game(freshState()));
  let items = 0, m = 0;
  g.on("loot", () => items++);
  for (let t = 1; t <= 3600; t++) {
    g.advance(1);
    if (t % 10 === 0) g.autoEquip();
    // Le joueur vend ce qui ne l'améliore pas une fois par minute (sac plein : le butin reste au sol, it. 221).
    if (t % 60 === 0) g.sellUseless();
    const u = nextUnlock(g.S); // le joueur achète un déblocage dès qu'il le peut (au pire)
    if (u && unlockAvailable(g.S, u) && g.S.gold >= u.price) { g.S.gold -= u.price; g.S.unlocks[u.id] = true; }
    if (t === MARKS[m]) { const r = rows[m]; r.items += items / 3; r.lvl += g.S.lvl / 3; r.best += g.S.best / 3; r.unlocks += Object.keys(g.S.unlocks).length / 3; m++; }
  }
}
console.log("temps    objets  niveau  zone  déblocages");
MARKS.forEach((t, i) => { const r = rows[i]; console.log(`${String(t / 60).padStart(4)} min ${String(Math.round(r.items)).padStart(6)} ${String(Math.round(r.lvl)).padStart(7)} ${String(Math.round(r.best)).padStart(5)} ${r.unlocks.toFixed(1).padStart(10)}`); });
