// Défilement des onglets dans chaque langue et à plusieurs largeurs (Linux, écran virtuel) : les langues aux mots
// longs (allemand, russe…) peuvent faire déborder un onglet qui tient en français. Travaille sur des COPIES de
// dev-data, et une partie de fin de partie à 1280 px (it. 986). Usage : node scripts/lang-overflow.mjs [langues=de,ru,…] [largeurs=1920,1366,1280]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const langs = (process.argv[2] || "fr,en,es,pt,de,pl,ru,zh,ja,ko").split(",");
const widths = (process.argv[3] || "1920,1366,1280").split(",").map(Number);
const base = JSON.parse(fs.readFileSync(path.join(root, "dev-data", "save.json"), "utf8"));
// (it. 746) pire cas aussi : TOUS les déblocages achetés (leurs options et rangées s'affichent ; it. 744 : les 6 cases
// d'automatismes faisaient défiler Aventure en allemand à 1280 sans qu'aucun contrôle le voie)
const { UNLOCKS } = await import(path.join(root, "src/renderer/game/unlocks.js"));
const allUnlocks = Object.fromEntries(UNLOCKS.map((u) => [u.id, true]));
let bad = 0;
for (const lang of langs) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sw-ovf-"));
  try {
    // (it. 579) pire cas : les quatre reliques gagnées (ligne du drone dans les statistiques, en-tête de la carte)
    fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...base, unlocks: allUnlocks, best: Math.max(base.best || 1, 310), relics: { drone: 1, heart: 1, blade: 1, crown: 1 }, settings: { ...base.settings, lang } }));
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
    // (it. 986) partie de FIN de partie (simulate.js 48 h, scripts/fixtures/endgame-save.json) à 1280 px : 20 ascensions,
    // automatismes, constellations au maximum… L'it. 985 y a trouvé Ascension (80 px) et Aventure (35 px), invisibles
    // avec dev-data. Régénérer : DUMP=scripts/fixtures/endgame-save.json node … scripts/simulate.js 48 warrior
    const endFile = path.join(root, "scripts", "fixtures", "endgame-save.json");
    // (it. 1025) FIN_WIDTHS=1280,1366,1920 : la fin de partie à d'autres largeurs (1280 seulement par défaut)
    const finWidths = (process.env.FIN_WIDTHS || "1280").split(",").map(Number).filter((fw) => widths.includes(fw) || process.env.FIN_WIDTHS);
    if (fs.existsSync(endFile)) for (const fw of finWidths) {
      const end = JSON.parse(fs.readFileSync(endFile, "utf8"));
      fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...end, last: Date.now(), settings: { ...(end.settings || {}), lang } }));
      let out = "";
      try {
        out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
          "--ghost", "--no-sandbox", "--release-ui", `--user-data=${dir}`, `--width=${fw}`, "--overflow-report", "--exit-after=20"],
          { encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "pipe"] });
      } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
      const m = out.match(/\[overflow\] (\d+) (.*)/);
      const res = m ? m[2].trim() : "pas de mesure";
      if (res !== "aucun") bad++;
      console.log(`${lang.padEnd(3)} fin ${fw} : ${res}`);
    }
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
console.log(bad ? `${bad} mesure(s) en défaut (défilement, débordement ou mot coupé)` : "aucun défilement ni mot coupé");
process.exitCode = bad ? 1 : 0;
