// Recherche de parties bloquées. Usage : node --experimental-default-type=module scripts/fuzz.mjs [graines=60] [minutes=20]
// Exploration : beaucoup de nouvelles parties (graines différentes), 20 min chacune, joueur passif ;
// signale celles qui ne progressent pas (blocage).
import { useVirtualClock } from "./virtual-clock.mjs"; // (it. 1009) en premier : Date.now() virtuel
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { freshState } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const { CLASS_KEYS } = await import(root + "classes.js");
const SEEDS = +process.argv[2] || 60, MIN = +process.argv[3] || 20;
let bad = 0, n = 0;
for (const cls of CLASS_KEYS) for (let seed = 1; seed <= SEEDS; seed++) {
  setRandom(seeded(seed * 7919 + cls.length));
  const S = freshState(); S.cls = cls;
  const g = useVirtualClock(new Game(S));
  let kills = 0; g.on("kill", () => kills++);
  for (let m = 0; m < MIN; m++) { g.advance(60); g.autoEquip(); }
  n++;
  if (kills < 40 || g.S.best < 3) {
    bad++;
    console.log(`BLOQUÉ ${cls} graine ${seed} : ${kills} victoires, zone ${g.S.zone}/${g.S.best}, niv ${g.S.lvl}, ${g.S.stats.deaths} K.O.`,
      JSON.stringify((g.lineup() || []).slice(0, 2)));
  }
}
console.log(`${n} parties, ${bad} bloquées`);
