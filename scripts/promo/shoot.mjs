// (it. 1168) Filme les plans de scripts/promo/shots.json avec record.sh (un écran virtuel par plan, deux à la fois).
// Usage : FF=<ffmpeg> node scripts/promo/shoot.mjs <dossier-de-sortie> [id1,id2…]
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const OUT = path.resolve(process.argv[2] || "promo-out"), ONLY = process.argv[3] ? process.argv[3].split(",") : null;
const SAVES = { mid: "scripts/fixtures/save-0.1.2.json", end: "scripts/fixtures/endgame-save.json" };
// Prélude : bulles vidées en continu, astuces coupées, effets complets, annonces déjà vues (graphe, nouveautés)
const PRELUDE = `(() => { const G = window.__game, st = window.__strip, P = window.__panel;
  window.__noHints = true; G.S.settings.fullEffects = true; G.S.skills.graphSeen = true; G.S.skills.graphFullSeen = true;
  const clr = () => { try { window.__clearToasts && window.__clearToasts(); } catch {} }; clr(); setInterval(clr, 250);
  setInterval(() => console.warn("[hx] " + Date.now() + " " + Math.round(st.heroX)), 100); // (it. 1174) caméra qui suit le héros
  try { STAGE } catch (e) { console.log("[stage] " + e.message); } })();`;
fs.mkdirSync(OUT, { recursive: true });
const shots = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/promo/shots.json"), "utf8")).shots.filter((s) => !ONLY || ONLY.includes(s.id));
const run = (s, disp) => new Promise((ok) => {
  const st = path.join(OUT, s.id + ".stage.js");
  const pre = (s.numbers ? "" : "G.S.settings.damageNumbers = false; ") + (s.zone ? `G.setZone(${s.zone}); ` : "");
  fs.writeFileSync(st, PRELUDE.replace("STAGE", pre + (s.js || "")));
  const p = spawn("bash", ["scripts/promo/record.sh", SAVES[s.save] || s.save, st, String(s.secs), path.join(OUT, s.id + ".mp4"), String(disp), String(s.wait || 6)], { cwd: ROOT, stdio: "ignore", env: { ...process.env, EXTRA: s.args || "" } });
  p.on("exit", (c) => { console.log(`${s.id} : ${c === 0 ? "ok" : "échec " + c}`); ok(); });
});
const queue = [...shots];
await Promise.all([91, 92].map(async (disp) => { while (queue.length) await run(queue.shift(), disp); }));
