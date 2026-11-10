// Comparaison d'équilibrage sur les 10 classes : record atteint en N heures simulées (moyenne et par classe).
// Une seule simulation suit une trajectoire aléatoire ; seule la moyenne des 10 classes permet de conclure.
// Usage : [HEROES=all|liste] node scripts/balance.mjs [heures=12] [commit]   — avec un commit, compare l'ancienne version à l'actuelle
// (copie de travail temporaire via git worktree, supprimée à la fin).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const HOURS = +process.argv[2] || 12, REV = process.argv[3];
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
// HEROES=all : les 20 héros (les 10 nouveaux en plus, ≈ 2 fois plus long) ; ou une liste « lancer,bard ».
const BASE = ["warrior", "ranger", "mage", "paladin", "assassin", "necro", "monk", "druid", "samurai", "berserker"];
const NEW = ["arbalest", "lancer", "priestess", "gladiator", "shaman", "bladedancer", "cryomancer", "bard", "starwarden", "artificer"];
const CLASSES = process.env.HEROES === "all" ? [...BASE, ...NEW] : process.env.HEROES ? process.env.HEROES.split(",") : BASE;

function run(dir) {
  const out = {};
  for (const c of CLASSES) {
    const txt = execFileSync(process.execPath, ["--experimental-default-type=module", "scripts/simulate.js", String(HOURS), c], { cwd: dir, encoding: "utf8", timeout: 300000 });
    let best = 0, on = false;
    for (const line of txt.split("\n")) { // tableau des courses : colonne « best »
      if (/run\s*│\s*best/.test(line)) { on = true; continue; }
      const m = on && line.match(/│\s*\d+\s*│\s*\d+\s*│\s*(\d+)\s*│/);
      if (m) best = Math.max(best, +m[1]);
    }
    out[c] = best;
  }
  const avg = Object.values(out).reduce((a, b) => a + b, 0) / CLASSES.length;
  return { out, avg };
}
const show = (label, r) => console.log(`${label.padEnd(10)} moyenne ${r.avg.toFixed(1)} | ` + CLASSES.map((c) => `${c} ${r.out[c]}`).join(", "));

let old = null;
if (REV) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sillwalker-bal-"));
  try {
    execFileSync("git", ["worktree", "add", "-q", dir, REV], { cwd: ROOT });
    fs.symlinkSync(path.join(ROOT, "node_modules"), path.join(dir, "node_modules"));
    old = run(dir);
  } finally {
    try { execFileSync("git", ["worktree", "remove", "--force", dir], { cwd: ROOT }); } catch { fs.rmSync(dir, { recursive: true, force: true }); }
    try { execFileSync("git", ["worktree", "prune"], { cwd: ROOT }); } catch { /* sans importance */ }
  }
  show(REV.slice(0, 10), old);
}
const now = run(ROOT);
show("actuel", now);
if (old) console.log(`écart moyen : ${(now.avg - old.avg >= 0 ? "+" : "")}${(now.avg - old.avg).toFixed(1)} zone(s) (±1,5 : bruit des trajectoires)`);
