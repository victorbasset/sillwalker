// (it. 2870) Rythme des quêtes : pour chaque sorte, nombre tirées, accomplies et durée moyenne entre le tirage et l'accomplissement,
// sur des parties neuves (joueur simulé minimal : équipe le meilleur objet, réclame les quêtes accomplies).
// Usage : node --experimental-default-type=module scripts/quest-pace.mjs [heures=12] [graines=1,2,3]
// Le joueur simulé n'achète aucun déblocage : pas de Carte du voyageur, donc pas de chasse depuis l'it. 2873.
// Repère it. 2869 (12 h, graines 1-3) : « Vaincre N monstres » 11 min, chasses 69 min (monstre d'une seule zone), champions 159 min.
import { useVirtualClock } from "./virtual-clock.mjs"; // (it. 1009) en premier : Date.now() virtuel
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { freshState } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const { questDone } = await import(root + "quests.js");
const H = +(process.argv[2] || 12), SEEDS = (process.argv[3] || "1,2,3").split(",").map(Number);
const st = {};
for (const seed of SEEDS) {
  setRandom(seeded(seed));
  const g = useVirtualClock(new Game(freshState()));
  const born = {};
  for (let t = 0; t < H * 3600; t += 1) {
    g.advance(1);
    if (t % 10 === 0) g.autoEquip();
    for (const q of g.S.quests.slots) {
      if (!(q.uid in born)) born[q.uid] = { t, kind: q.kind, done: null };
      if (questDone(q) && born[q.uid].done == null) born[q.uid].done = t;
    }
    if (t % 5 === 0) for (const q of [...g.S.quests.slots]) if (questDone(q)) g.claimQuest(q.uid);
  }
  for (const b of Object.values(born)) {
    const s = (st[b.kind] ||= { n: 0, done: 0, dur: 0 });
    s.n++;
    if (b.done != null) { s.done++; s.dur += b.done - b.t; }
  }
}
console.log(`${H} h, graines ${SEEDS.join(",")}`);
for (const [k, s] of Object.entries(st).sort((a, b) => b[1].n - a[1].n))
  console.log(k.padEnd(11), "tirées", String(s.n).padStart(3), " accomplies", String(s.done).padStart(3), " durée moyenne", s.done ? Math.round(s.dur / s.done / 60) + " min" : "-");
