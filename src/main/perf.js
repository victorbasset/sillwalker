// Banc de mesure (dev) : `npm run perf`. Mesure RAM et CPU de tous les
// processus Electron dans plusieurs situations, écrit perf-report.json et quitte.
const fs = require("fs");
const path = require("path");
const os = require("os");
const { app } = require("electron");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function sample() {
  const m = app.getAppMetrics();
  const out = { cpu: 0, ws: 0, priv: 0, byType: {} };
  for (const p of m) {
    const t = (out.byType[p.type] ||= { cpu: 0, ws: 0, priv: 0 });
    t.cpu += p.cpu.percentCPUUsage; t.ws += p.memory.workingSetSize; t.priv += p.memory.privateBytes || 0;
    out.cpu += p.cpu.percentCPUUsage; out.ws += p.memory.workingSetSize; out.priv += p.memory.privateBytes || 0;
  }
  return out;
}

async function measure(label, seconds, wc) {
  sample(); // remet les compteurs CPU à zéro
  const p0 = await wc.executeJavaScript("({...window.__perf, now: performance.now()})");
  const rows = [];
  for (let i = 0; i < seconds; i++) { await sleep(1000); rows.push(sample()); }
  const p1 = await wc.executeJavaScript("({...window.__perf, now: performance.now()})");
  const avg = (f) => rows.reduce((a, r) => a + f(r), 0) / rows.length;
  const types = Object.keys(rows[rows.length - 1].byType);
  const secs = (p1.now - p0.now) / 1000;
  const res = {
    label,
    // getAppMetrics() renvoie un % de la machine entière (tous cœurs) :
    // vérifié contre les temps CPU de Windows. On l'exprime aussi en % d'un cœur.
    cpuPctOfOneCore: +(avg((r) => r.cpu) * os.cpus().length).toFixed(2),
    cpuPctOfMachine: +avg((r) => r.cpu).toFixed(3),
    workingSetMB: +(avg((r) => r.ws) / 1024).toFixed(1),
    privateMB: +(avg((r) => r.priv) / 1024).toFixed(1),
    ticksPerSec: +((p1.frames - p0.frames) / secs).toFixed(1),
    screenUpdatesPerSec: +((p1.paints - p0.paints) / secs).toFixed(1),
    simTicksPerSec: +((p1.sims - p0.sims) / secs).toFixed(1),
    byType: Object.fromEntries(types.map((t) => [t, {
      cpuOneCore: +(avg((r) => r.byType[t]?.cpu || 0) * os.cpus().length).toFixed(2),
      wsMB: +(avg((r) => r.byType[t]?.ws || 0) / 1024).toFixed(1),
    }])),
  };
  console.log("[perf]", JSON.stringify(res));
  return res;
}

async function runPerf(strip, { warmup = 10, phase = 30 } = {}) {
  const wc = strip.win.webContents;
  await sleep(warmup * 1000);
  const results = [];
  results.push(await measure("bande visible, panneau fermé", phase, wc));
  strip.send("command", "open-panel");
  await sleep(1500);
  results.push(await measure("panneau ouvert", Math.round(phase / 2), wc));
  strip.send("command", "toggle-panel");
  await sleep(1500);
  await strip.setMode("mini");
  await sleep(1500);
  results.push(await measure("mode mini", phase, wc));
  await strip.setMode("icon");
  await sleep(1500);
  results.push(await measure("icône seule (simulation seule)", phase, wc));
  await strip.setMode("strip");
  const report = {
    date: new Date().toISOString(),
    electron: process.versions.electron,
    cpu: os.cpus()[0].model, cores: os.cpus().length,
    screen: strip.win.getBounds(),
    results,
  };
  const file = path.join(process.cwd(), "perf-report.json");
  fs.writeFileSync(file, JSON.stringify(report, null, 2));
  console.log("[perf] rapport écrit dans", file);
  app.quit();
}

module.exports = { runPerf };
