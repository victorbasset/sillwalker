// Vérifie la syntaxe de tous les fichiers JavaScript (les modules de l'interface
// ne sont pas chargés par les tests de logique : une faute de frappe y passerait inaperçue).
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (p.endsWith(".js")) files.push(p); } })("src");
let bad = 0;
for (const f of files) {
  const module = f.includes("renderer");
  const r = spawnSync(process.execPath, [...(module ? ["--experimental-default-type=module"] : []), "--check", f], { encoding: "utf8" });
  if (r.status !== 0) { bad++; console.log("ERREUR de syntaxe :", f, "\n", r.stderr.split("\n").slice(0, 4).join("\n")); }
}
console.log(`syntaxe : ${files.length - bad} / ${files.length} fichiers corrects`);
process.exit(bad ? 1 : 0);
