// Défilement des onglets dans chaque langue et à plusieurs largeurs (Linux, écran virtuel) : les langues aux mots
// longs (allemand, russe…) peuvent faire déborder un onglet qui tient en français. Travaille sur des COPIES de
// dev-data. Usage : node scripts/lang-overflow.mjs [langues=de,ru,…] [largeurs=1920,1366,1280]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const langs = (process.argv[2] || "fr,en,es,pt,de,pl,ru,zh,ja,ko").split(",");
const widths = (process.argv[3] || "1920,1366,1280").split(",").map(Number);
const base = JSON.parse(fs.readFileSync(path.join(root, "dev-data", "save.json"), "utf8"));
let bad = 0;
for (const lang of langs) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sw-ovf-"));
  try {
    // (it. 579) pire cas : les quatre reliques gagnées (ligne du drone dans les statistiques, en-tête de la carte)
    fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...base, relics: { drone: 1, heart: 1, blade: 1, crown: 1 }, settings: { ...base.settings, lang } }));
    for (const w of widths) {
      let out = "";
      try {
        out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
          "--ghost", "--no-sandbox", "--release-ui", `--user-data=${dir}`, `--width=${w}`, "--overflow-report", "--exit-after=20"],
          { encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "pipe"] });
      } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
      const m = out.match(/\[overflow\] (\d+) (.*)/);
      const res = m ? m[2].trim() : "pas de mesure";
      if (res !== "aucun") bad++;
      console.log(`${lang.padEnd(3)} ${String(w).padStart(4)} : ${res}`);
    }
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
console.log(bad ? `${bad} mesure(s) avec défilement` : "aucun défilement");
process.exitCode = bad ? 1 : 0;
