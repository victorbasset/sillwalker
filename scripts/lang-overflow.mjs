// Défilement des onglets dans chaque langue et à plusieurs largeurs (Linux, écran virtuel) : les langues aux mots
// longs (allemand, russe…) peuvent faire déborder un onglet qui tient en français. Travaille sur des COPIES de
// dev-data, et une partie de fin de partie à 1280 px (it. 986). Usage : node scripts/lang-overflow.mjs [langues=de,ru,…] [largeurs=1920,1600,1366,1280]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
// (it. 2276) « all » = les 10 langues : avant, il était pris pour UNE langue inconnue (repli sur le français) et les mesures « all 1280 »
// ne couvraient qu'une langue
const ALL_LANGS = "fr,en,es,pt,de,pl,ru,zh,ja,ko";
const langs = (!process.argv[2] || process.argv[2] === "all" ? ALL_LANGS : process.argv[2]).split(",");
// (it. 1047) 1600 px aussi : écrans 1600 × 900, 1680 × 1050 ; la fin de partie y défilait en russe sans qu'aucune mesure le voie
const widths = (process.argv[3] || "1920,1600,1366,1280").split(",").map(Number);
const base = JSON.parse(fs.readFileSync(path.join(root, "dev-data", "save.json"), "utf8"));
// (it. 746) pire cas aussi : TOUS les déblocages achetés (leurs options et rangées s'affichent ; it. 744 : les 6 cases
// d'automatismes faisaient défiler Aventure en allemand à 1280 sans qu'aucun contrôle le voie)
const { UNLOCKS } = await import(path.join(root, "src/renderer/game/unlocks.js"));
const allUnlocks = Object.fromEntries(UNLOCKS.map((u) => [u.id, true]));
let bad = 0;
// (it. 1059) plusieurs langues : le script se relance pour chacune, PAR à la fois (3 par défaut ; 5 min 15 → ≈ 2 min) ;
// sorties remises dans l'ordre des langues, défauts additionnés. PAR=1 : à la suite, comme avant.
const PAR = Math.max(1, +process.env.PAR || 3);
if (langs.length > 1 && PAR > 1 && !process.env.OVF_CHILD) {
  const { spawn } = await import("node:child_process");
  const outs = new Array(langs.length).fill("");
  const queue = langs.map((l, i) => i);
  await Promise.all(Array.from({ length: Math.min(PAR, langs.length) }, async () => {
    while (queue.length) {
      const i = queue.shift();
      await new Promise((done) => {
        const p = spawn(process.execPath, [new URL(import.meta.url).pathname, langs[i], widths.join(",")], { env: { ...process.env, OVF_CHILD: "1" }, stdio: ["ignore", "pipe", "ignore"] });
        p.stdout.on("data", (d) => (outs[i] += d));
        p.on("close", done);
      });
    }
  }));
  for (const o of outs) {
    for (const line of o.split("\n")) if (line && !/mesure\(s\) en défaut|aucun défilement ni mot coupé/.test(line)) console.log(line);
    const m = o.match(/(\d+) mesure\(s\) en défaut/); if (m) bad += +m[1];
    if (!/mesure\(s\) en défaut|aucun défilement ni mot coupé/.test(o)) { bad++; console.log("(langue sans résultat)"); }
  }
  console.log(bad ? `${bad} mesure(s) en défaut (défilement, débordement ou mot coupé)` : "aucun défilement ni mot coupé");
  process.exit(bad ? 1 : 0);
}
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
    const finWidths = (process.env.FIN_WIDTHS || "1280,1600").split(",").map(Number).filter((fw) => widths.includes(fw) || process.env.FIN_WIDTHS);
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
    // (it. 2976) partie d'une SEMAINE (simulate.js 168 warrior, record 353, scripts/fixtures/week-save.json) à 1280 px : PV et attaque
    // en milliards (« 2,58 млрд » coupé, it. 2975), or en suffixes longs ; la fin de partie (48 h) n'y arrive pas. NO_WEEK=1 pour sauter.
    // Régénérer : DUMP=scripts/fixtures/week-save.json node … scripts/simulate.js 168 warrior (puis vider son journal, « log »)
    const weekFile = path.join(root, "scripts", "fixtures", "week-save.json");
    if (fs.existsSync(weekFile) && !process.env.NO_WEEK) {
      const wk = JSON.parse(fs.readFileSync(weekFile, "utf8"));
      fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...wk, last: Date.now(), settings: { ...(wk.settings || {}), lang } }));
      let out = "";
      try {
        out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
          "--ghost", "--no-sandbox", "--release-ui", `--user-data=${dir}`, "--width=1280", "--overflow-report", "--exit-after=25"],
          { encoding: "utf8", timeout: 70000, stdio: ["ignore", "pipe", "pipe"] });
      } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
      const m = out.match(/\[overflow\] (\d+) (.*)/);
      const res = m ? m[2].trim() : "pas de mesure";
      if (res !== "aucun") bad++;
      console.log(`${lang.padEnd(3)} semaine 1280 : ${res}`);
    }
    // (it. 3116) partie d'une HEURE (simulate.js 1 warrior, zone 39, record 40, 8 déblocages, aucune ascension ni constellation) à
    // 1280 px : l'Ascension défilait (19 constellations en liste, it. 3114), les Talents aussi en russe (ultime verrouillé, it. 3115) ;
    // aucune autre sauvegarde de test n'est à ce stade. NO_HOUR=1 pour sauter. Régénérer : DUMP=scripts/fixtures/hour-save.json node …
    // scripts/simulate.js 1 warrior (puis vider son journal, « log »)
    const hourFile = path.join(root, "scripts", "fixtures", "hour-save.json");
    // (it. 3122) aussi à 1600 px : Succès en polonais (succès en cours sur deux lignes) défilait de 18 px à cette largeur seulement
    if (fs.existsSync(hourFile) && !process.env.NO_HOUR) for (const hw of [1280, 1600]) {
      const hr = JSON.parse(fs.readFileSync(hourFile, "utf8"));
      fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...hr, last: Date.now(), settings: { ...(hr.settings || {}), lang } }));
      let out = "";
      try {
        out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
          "--ghost", "--no-sandbox", "--release-ui", `--user-data=${dir}`, `--width=${hw}`, "--overflow-report", "--exit-after=25"],
          { encoding: "utf8", timeout: 70000, stdio: ["ignore", "pipe", "pipe"] });
      } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
      const m = out.match(/\[overflow\] (\d+) (.*)/);
      const res = m ? m[2].trim() : "pas de mesure";
      if (res !== "aucun") bad++;
      console.log(`${lang.padEnd(3)} heure ${hw} : ${res}`);
    }
    // (it. 3149) partie de 6 HEURES (simulate.js 6 druid, scripts/fixtures/sixh-save.json) à 1280 px : héros bloqué devant un boss majeur,
    // l'Aventure défilait de 11 px en russe (carte de la zone pleine, it. 3139). NO_SIXH=1 pour sauter.
    const sixhFile = path.join(root, "scripts", "fixtures", "sixh-save.json");
    if (fs.existsSync(sixhFile) && !process.env.NO_SIXH) {
      const sx = JSON.parse(fs.readFileSync(sixhFile, "utf8"));
      fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...sx, last: Date.now(), settings: { ...(sx.settings || {}), lang } }));
      let out = "";
      try {
        out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
          "--ghost", "--no-sandbox", "--release-ui", `--user-data=${dir}`, "--width=1280", "--overflow-report", "--exit-after=25"],
          { encoding: "utf8", timeout: 70000, stdio: ["ignore", "pipe", "pipe"] });
      } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
      const m = out.match(/\[overflow\] (\d+) (.*)/);
      const res = m ? m[2].trim() : "pas de mesure";
      if (res !== "aucun") bad++;
      console.log(`${lang.padEnd(3)} 6h 1280 : ${res}`);
    }
    // (it. 3113) partie NEUVE (premier lancement, aucune sauvegarde) à 1280 px : « Zone précédente » grisée sans bulle en zone 1,
    // qu'aucune sauvegarde de test ne montrait (toutes sont avancées). NO_NEW=1 pour sauter.
    if (!process.env.NO_NEW) {
      const nd = fs.mkdtempSync(path.join(os.tmpdir(), "sw-ovf-neuve-"));
      let out = "";
      try {
        out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
          "--ghost", "--no-sandbox", "--release-ui", `--user-data=${nd}`, `--lang=${lang}`, "--width=1280", "--overflow-report", "--exit-after=20"],
          { encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "pipe"] });
      } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
      fs.rmSync(nd, { recursive: true, force: true });
      const m = out.match(/\[overflow\] (\d+) (.*)/);
      const res = m ? m[2].trim() : "pas de mesure";
      if (res !== "aucun") bad++;
      console.log(`${lang.padEnd(3)} neuve 1280 : ${res}`);
    }
    // (it. 1048) fin de partie, 1920 px, « Taille de l'interface » à 130 % (zoom du panneau seul : les @media voyaient la
    // fenêtre ; Boutique, Bestiaire, Statistiques défilaient, it. 1046). NO_ZOOM=1 pour sauter cette mesure.
    // (it. 3156) aussi la partie d'une HEURE : Succès en polonais défilait de 53 px à 130 % (succès en cours sur deux lignes)
    if (!process.env.NO_ZOOM) for (const [zf, ztag] of [[endFile, "fin"], [path.join(root, "scripts", "fixtures", "hour-save.json"), "heure"]]) {
      if (!fs.existsSync(zf)) continue;
      const end = JSON.parse(fs.readFileSync(zf, "utf8"));
      fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...end, last: Date.now(), settings: { ...(end.settings || {}), lang, uiScale: 1.3 } }));
      fs.writeFileSync(path.join(dir, "settings.json"), JSON.stringify({ panelZoom: 1.3 }));
      let out = "";
      try {
        out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
          "--ghost", "--no-sandbox", "--release-ui", `--user-data=${dir}`, "--width=1920", "--overflow-report", "--exit-after=20"],
          { encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "pipe"] });
      } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
      fs.rmSync(path.join(dir, "settings.json"), { force: true });
      const m = out.match(/\[overflow\] (\d+) (.*)/);
      const res = m ? m[2].trim() : "pas de mesure";
      if (res !== "aucun") bad++;
      console.log(`${lang.padEnd(3)} ${ztag} 1920 × 130 % : ${res}`);
    }
    // (it. 1286) état « tout au maximum » (scripts/max-save.mjs : toutes les collections, compteurs géants) à 1920 et
    // 1280 px : en russe, les Statistiques y défilaient de 4 px (it. 1285) sans qu'aucune autre mesure le voie.
    // NO_MAX=1 pour sauter ces mesures.
    if (!process.env.NO_MAX) {
      const maxFile = path.join(dir, "max.json");
      execFileSync(process.execPath, ["--experimental-default-type=module", path.join(root, "scripts", "max-save.mjs"), maxFile], { stdio: "ignore" });
      for (const mw of [1920, 1280]) {
        const mx = JSON.parse(fs.readFileSync(maxFile, "utf8"));
        fs.writeFileSync(path.join(dir, "save.json"), JSON.stringify({ ...mx, last: Date.now(), settings: { ...(mx.settings || {}), lang, newsSeen: 999 } }));
        let out = "";
        try {
          out = execFileSync("xvfb-run", ["-a", "-s", "-screen 0 1920x1080x24", path.join(root, "node_modules/.bin/electron"), root,
            "--ghost", "--no-sandbox", "--release-ui", `--user-data=${dir}`, `--width=${mw}`, "--overflow-report", "--exit-after=20"],
            { encoding: "utf8", timeout: 60000, stdio: ["ignore", "pipe", "pipe"] });
        } catch (e) { out = String(e.stdout || "") + String(e.message || ""); }
        const m = out.match(/\[overflow\] (\d+) (.*)/);
        const res = m ? m[2].trim() : "pas de mesure";
        if (res !== "aucun") bad++;
        console.log(`${lang.padEnd(3)} max ${mw} : ${res}`);
      }
    }
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
console.log(bad ? `${bad} mesure(s) en défaut (défilement, débordement ou mot coupé)` : "aucun défilement ni mot coupé");
process.exitCode = bad ? 1 : 0;
