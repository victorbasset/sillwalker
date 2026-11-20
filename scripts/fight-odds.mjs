// (it. 2880) Taux de défaite du héros par adversaire (normal, élite par sorte, champion, boss) sur des parties neuves.
// Usage : node --experimental-default-type=module scripts/fight-odds.mjs [heures=12] [graines=1,2,3] [classe=warrior]
// Repères it. 2874-2877 (guerrier, 12 h, graines 1-3) : normal 0 %, élites 31 % (Venimeux 18 % → Vampirique 50 %), champions 46 %
// (94 % avant l'it. 2874 : plus forts que le boss de leur zone), boss 57 % (le mur du record).
import { useVirtualClock } from "./virtual-clock.mjs"; // (it. 1009) en premier : Date.now() virtuel
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { freshState } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const H = +(process.argv[2] || 12), SEEDS = (process.argv[3] || "1,2,3").split(",").map(Number), CLS = process.argv[4] || "warrior";
const cat = {}, aff = {};
const add = (t, k, i) => ((t[k] ||= [0, 0])[i]++);
for (const seed of SEEDS) {
  setRandom(seeded(seed));
  const S0 = freshState();
  S0.cls = CLS;
  const g = useVirtualClock(new Game(S0));
  let cur = null;
  const kind = (m) => (m.boss ? "boss" : m.champion ? "champion" : m.elite ? "élite" : "normal");
  const count = (m, i) => {
    if (!m || m.goblin || m.poupouce) return;
    add(cat, kind(m), i);
    if (m.elite && !m.champion && !m.boss) add(aff, m.affix || "?", i);
  };
  g.on("kill", ({ mon }) => count(mon, 0));
  g.on("heroDown", () => count(cur, 1));
  for (let t = 0; t < H * 3600; t++) { cur = g.R.mon; g.advance(1); if (t % 10 === 0) g.autoEquip(); }
}
const pct = ([w, l]) => Math.round((100 * l) / Math.max(1, w + l));
const line = (k, v) => console.log(k.padEnd(12), "victoires", String(v[0]).padStart(6), " défaites", String(v[1]).padStart(5), " " + pct(v) + " %");
console.log(`${CLS}, ${H} h, graines ${SEEDS.join(",")}`);
for (const k of ["normal", "élite", "champion", "boss"]) if (cat[k]) line(k, cat[k]);
console.log("— élites par sorte —");
for (const [k, v] of Object.entries(aff).sort((a, b) => pct(b[1]) - pct(a[1]))) line(k, v);
