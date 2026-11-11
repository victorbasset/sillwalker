// (it. 770) Dev : `npm start -- --trace=10` enregistre une trace Chromium de la page pendant 10 s dès le lancement (ouvrir
// le panneau et quelques onglets pendant ce temps), puis affiche dans le terminal où part le temps du fil principal de
// la page : temps PROPRE de chaque étape (style, mise en page, polices, images…), sans compter ses sous-étapes.
// Né des lenteurs de Victor sous Windows : mise en page de 100 à 540 ms par onglet, contre 10 à 30 ms sur le serveur.
const fs = require("fs");
const path = require("path");

const CATEGORIES = [
  "devtools.timeline", "disabled-by-default-devtools.timeline", "blink", "blink.fonts", "fonts", "loading",
  "blink_style", "disabled-by-default-blink.debug.layout", "v8.execute", "toplevel",
].join(",");

/** Temps propre (µs) par nom d'événement, fil principal de la page ; aussi le total par nom. */
function summarize(events) {
  const threads = new Map();
  for (const e of events) {
    if (e.ph === "M" && e.name === "thread_name" && e.args && e.args.name === "CrRendererMain") threads.set(e.pid + ":" + e.tid, true);
  }
  const byThread = new Map();
  for (const e of events) {
    if (e.ph !== "X" || !threads.has(e.pid + ":" + e.tid) || typeof e.dur !== "number") continue;
    const k = e.pid + ":" + e.tid;
    if (!byThread.has(k)) byThread.set(k, []);
    byThread.get(k).push(e);
  }
  const self = new Map(), total = new Map(), count = new Map();
  for (const list of byThread.values()) {
    list.sort((a, b) => a.ts - b.ts || b.dur - a.dur);
    const stack = [];
    for (const e of list) {
      while (stack.length && stack[stack.length - 1].ts + stack[stack.length - 1].dur <= e.ts) stack.pop();
      const parent = stack[stack.length - 1];
      if (parent) self.set(parent.name, (self.get(parent.name) || 0) - e.dur);
      self.set(e.name, (self.get(e.name) || 0) + e.dur);
      total.set(e.name, (total.get(e.name) || 0) + e.dur);
      count.set(e.name, (count.get(e.name) || 0) + 1);
      stack.push(e);
    }
  }
  return { self, total, count };
}

function startTrace(webContents, seconds, outDir) {
  const dbg = webContents.debugger, events = [];
  try { dbg.attach("1.3"); } catch (e) { console.log("[trace] impossible :", e.message); return; }
  dbg.on("message", (_e, method, params) => {
    if (method === "Tracing.dataCollected") events.push(...params.value);
    if (method !== "Tracing.tracingComplete") return;
    try { dbg.detach(); } catch { /* déjà détaché */ }
    const file = path.join(outDir, "trace-sillwalker.json");
    try { fs.writeFileSync(file, JSON.stringify(events)); } catch { /* résumé quand même */ }
    const { self, total, count } = summarize(events);
    const ms = (v) => (v / 1000).toFixed(0).padStart(6);
    const top = [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
    console.log(`[trace] ${seconds} s, fil principal de la page : temps propre | total | nombre, par étape`);
    for (const [name, v] of top) console.log(`[trace] ${ms(v)} ms | ${ms(total.get(name))} ms | ${String(count.get(name)).padStart(5)} × ${name}`);
    console.log("[trace] trace complète : " + file);
  });
  dbg.sendCommand("Tracing.start", { categories: CATEGORIES, transferMode: "ReportEvents" })
    .then(() => { console.log(`[trace] enregistrement ${seconds} s : ouvre le panneau et quelques onglets`); setTimeout(() => dbg.sendCommand("Tracing.end").catch(() => {}), seconds * 1000); })
    .catch((e) => console.log("[trace] impossible :", e.message));
}

module.exports = { startTrace, summarize };
