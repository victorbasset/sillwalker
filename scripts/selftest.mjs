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
// Groupe de processus à part (hors Windows) : si ce lanceur est interrompu (Ctrl+C, itération arrêtée par son délai),
// tout l'arbre xvfb-run / Electron est arrêté avec lui au lieu de tourner orphelin (it. 863 : 3 h 20 vu sur le serveur).
const group = process.platform !== "win32";
const child = spawn(cmd, cargs, { cwd: ROOT, shell: !linux && process.platform === "win32", detached: group });
const stop = () => { try { if (group) process.kill(-child.pid, "SIGTERM"); else child.kill(); } catch {} };
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) process.on(sig, () => { stop(); fs.rmSync(tmp, { recursive: true, force: true }); process.exit(1); });
// Dernier recours, au cas où l'application ne quitterait pas d'elle-même (son propre garde-fou est à 10 min).
const hard = setTimeout(() => { console.error("[selftest] ÉCHEC : l'application ne quitte pas, arrêtée"); stop(); }, 15 * 60 * 1000);
let out = "";
for (const s of [child.stdout, child.stderr]) s.on("data", (d) => { out += d; process.stdout.write(d); });
child.on("close", () => {
  clearTimeout(hard);
  fs.rmSync(tmp, { recursive: true, force: true });
  // Code de sortie fiable (l'application quitte toujours normalement) : échec si une vérification échoue
  // ou si le bilan « N/N vérifications réussies » manque ou n'est pas complet.
  const m = out.match(/\[selftest\] (\d+)\/(\d+) vérifications réussies/);
  const ok = m && m[1] === m[2] && !/\[selftest\] ÉCHEC/.test(out);
  if (!ok) console.error("[selftest] BILAN : échec (code de sortie 1)");
  process.exit(ok ? 0 : 1);
});
