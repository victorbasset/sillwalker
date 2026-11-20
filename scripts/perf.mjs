// (it. 2052) Mesure --perf sur une COPIE NEUVE de dev-data (CLAUDE.md : « toujours mesurer sur une copie neuve ») : avant,
// `npm run perf` lançait le jeu sur ./dev-data lui-même, qui avançait à chaque mesure (autre zone, autre combat) et dont
// l'autotest, stall-check et les captures partent aussi. Usage : node scripts/perf.mjs [options Electron en plus]
// (perf:linux : sous xvfb-run, avec --no-sandbox).
import { cpSync, mkdtempSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const dir = mkdtempSync(join(tmpdir(), "sillwalker-perf-"));
cpSync(join(root, "dev-data"), dir, { recursive: true });
// (it. 2984) PERF_SAVE=<fichier.json> : mesurer une autre partie (ex. scripts/fixtures/week-save.json, une semaine de jeu), heure de
// sauvegarde remise à maintenant (sinon l'absence simulée au lancement change l'état mesuré)
if (process.env.PERF_SAVE) {
  const s = JSON.parse(readFileSync(process.env.PERF_SAVE, "utf8"));
  writeFileSync(join(dir, "save.json"), JSON.stringify({ ...s, last: Date.now(), settings: { ...(s.settings || {}), newsSeen: 99999 } }));
}
const electron = createRequire(import.meta.url)("electron");
const r = spawnSync(electron, [".", "--perf", "--ghost", `--user-data=${dir}`, ...process.argv.slice(2)], { cwd: root, stdio: "inherit" });
rmSync(dir, { recursive: true, force: true });
process.exit(r.status ?? 1);
