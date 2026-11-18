// Rythme de la première heure d'une partie neuve (moyenne de 3 graines) : par tranche de temps, objets reçus,
// niveau, record de zone, déblocages achetés. Sert à régler le début de partie (demande de Victor : plus tranquille).
// Usage : node --experimental-default-type=module scripts/early-pace.mjs
// (it. 1445) SEEDS=10 devant la commande : moyenne de 10 graines (3 par défaut, repères du journal) ; la dernière ligne
// donne l'écart entre graines à 60 min (bruit : sur 3 graines, ±3 niveaux et ±3 zones, it. 1444).
// (it. 1830) CLS=assassin : un héros précis.
import { useVirtualClock } from "./virtual-clock.mjs"; // (it. 1009) en premier : Date.now() virtuel
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { freshState } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const { nextUnlock, unlockAvailable } = await import(root + "unlocks.js");
// (it. 2292) CLS inconnu : la partie tournait avec une classe absente, sans erreur (même piège que simulate.js, it. 2291)
const { CLASS_KEYS_BY_UNLOCK } = await import(root + "classes.js");
if (process.env.CLS && !CLASS_KEYS_BY_UNLOCK().includes(process.env.CLS)) { console.error(`Classe inconnue : ${process.env.CLS} (classes : ${CLASS_KEYS_BY_UNLOCK().join(", ")})`); process.exit(1); }
const MARKS = [120, 300, 600, 900, 1800, 3600];
const rows = MARKS.map(() => ({ items: 0, lvl: 0, best: 0, unlocks: 0 }));
const N = Math.max(1, +process.env.SEEDS || 3), last = [];
for (let seed = 1; seed <= N; seed++) {
  setRandom(seeded(seed));
  // (it. 1830) CLS=<classe> devant la commande : première heure d'un héros précis (sinon celui de la partie neuve)
  const st0 = freshState();
  if (process.env.CLS) st0.cls = process.env.CLS;
  const g = useVirtualClock(new Game(st0));
  let items = 0, m = 0;
  g.on("loot", () => items++);
  for (let t = 1; t <= 3600; t++) {
    g.advance(1);
    if (t % 10 === 0) g.autoEquip();
    // Le joueur vend ce qui ne l'améliore pas une fois par minute (sac plein : le butin reste au sol, it. 221).
    if (t % 60 === 0) g.sellUseless();
    const u = nextUnlock(g.S); // le joueur achète un déblocage dès qu'il le peut (au pire)
    if (u && unlockAvailable(g.S, u) && g.S.gold >= u.price) { g.S.gold -= u.price; g.S.unlocks[u.id] = true; }
    if (t === MARKS[m]) { const r = rows[m]; r.items += items / N; r.lvl += g.S.lvl / N; r.best += g.S.best / N; r.unlocks += Object.keys(g.S.unlocks).length / N; m++; }
    if (t === 3600) last.push({ lvl: g.S.lvl, best: g.S.best });
  }
}
console.log("temps    objets  niveau  zone  déblocages");
MARKS.forEach((t, i) => { const r = rows[i]; console.log(`${String(t / 60).padStart(4)} min ${String(Math.round(r.items)).padStart(6)} ${String(Math.round(r.lvl)).padStart(7)} ${String(Math.round(r.best)).padStart(5)} ${r.unlocks.toFixed(1).padStart(10)}`); });
// (it. 1445) écart entre graines à 60 min
const span = (k) => `${Math.min(...last.map((x) => x[k]))}–${Math.max(...last.map((x) => x[k]))}`;
console.log(`${N} graines · à 60 min : niveau ${span("lvl")}, zone ${span("best")}`);
