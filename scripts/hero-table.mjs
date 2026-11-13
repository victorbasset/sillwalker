// Tableau d'équilibrage des 20 héros (it. 1012) : record des courses en N heures, moyenne de plusieurs graines,
// simulations en parallèle (horloge virtuelle : résultats reproductibles). Trié du plus faible au plus fort.
//   node --experimental-default-type=module scripts/hero-table.mjs [heures=12] [graines=7,3,11] [parallèle=8]
// Repère (it. 1017, 12 h, graines 7/3/11, Maîtrises dépensées) : de 61,3 (artificier) à 66,3 (paladin), moyenne ≈ 63,7.
import { spawn } from "node:child_process";
import { CLASSES } from "../src/renderer/game/classes.js";

const HOURS = process.argv[2] || "12", SEEDS = (process.argv[3] || "7,3,11").split(","), PAR = +process.argv[4] || 8;
const jobs = [];
for (const cls of Object.keys(CLASSES)) for (const seed of SEEDS) jobs.push({ cls, seed });
const res = {};
function run(job) {
  return new Promise((done) => {
    const p = spawn(process.execPath, ["--experimental-default-type=module", new URL("./simulate.js", import.meta.url).pathname, HOURS, job.cls],
      { env: { ...process.env, SEED: job.seed }, stdio: ["ignore", "pipe", "ignore"] });
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.on("close", () => {
      // meilleur record parmi les courses (colonne « best » du tableau des courses)
      const part = out.split("Courses (une")[1] || "";
      const best = Math.max(0, ...[...part.matchAll(/│\s*\d+\s*│\s*\d+\s*│\s*(\d+)\s*│/g)].map((m) => +m[1]));
      (res[job.cls] ||= []).push(best);
      done();
    });
  });
}
const queue = jobs.slice();
await Promise.all(Array.from({ length: PAR }, async () => { while (queue.length) await run(queue.shift()); }));
const rows = Object.entries(res).map(([cls, v]) => ({ cls, v, avg: v.reduce((a, b) => a + b, 0) / v.length })).sort((a, b) => a.avg - b.avg);
const all = rows.reduce((a, r) => a + r.avg, 0) / rows.length;
for (const r of rows) console.log(`${r.cls.padEnd(12)} ${r.v.join(" ").padEnd(12)} moy ${r.avg.toFixed(1)}  (${r.avg >= all ? "+" : ""}${(r.avg - all).toFixed(1)})`);
console.log(`moyenne ${all.toFixed(1)} · écart ${(rows.at(-1).avg - rows[0].avg).toFixed(1)} zones · ${HOURS} h, graines ${SEEDS.join("/")}`);
