// Lance l'autotest sur une COPIE de dev-data (sauvegarde et réglages) dans un dossier temporaire :
// les contrôles modifient l'état (déblocages, objets…) ; sans copie, ces changements s'accumulaient d'un passage
// à l'autre dans dev-data et finissaient par fausser des contrôles. Usage : node scripts/selftest.mjs [--linux]
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sillwalker-selftest-"));
for (const f of ["save.json", "settings.json"]) {
  const src = path.join(ROOT, "dev-data", f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(tmp, f));
}
const electron = path.join(ROOT, "node_modules", ".bin", process.platform === "win32" ? "electron.cmd" : "electron");
const args = [".", "--selftest", "--ghost", `--user-data=${tmp}`];
const linux = process.argv.includes("--linux");
// Sortie recopiée au fil de l'eau (un blocage reste lisible), et gardée pour le bilan.
const cmd = linux ? "xvfb-run" : electron;
const cargs = linux ? ["-a", "-s", "-screen 0 1920x1080x24", electron, ...args, "--no-sandbox"] : args;
const child = spawn(cmd, cargs, { cwd: ROOT, shell: !linux && process.platform === "win32" });
let out = "";
for (const s of [child.stdout, child.stderr]) s.on("data", (d) => { out += d; process.stdout.write(d); });
child.on("close", () => {
  fs.rmSync(tmp, { recursive: true, force: true });
  // Code de sortie fiable (l'application quitte toujours normalement) : échec si une vérification échoue
  // ou si le bilan « N/N vérifications réussies » manque ou n'est pas complet.
  const m = out.match(/\[selftest\] (\d+)\/(\d+) vérifications réussies/);
  const ok = m && m[1] === m[2] && !/\[selftest\] ÉCHEC/.test(out);
  if (!ok) console.error("[selftest] BILAN : échec (code de sortie 1)");
  process.exit(ok ? 0 : 1);
});
