// Point d'entrée du renderer : relie simulation, rendu, interface et
// processus principal (via window.sillwalker exposé par le preload).
//
// Trois modes d'affichage, choisis par le processus principal :
//   strip : la bande (+ panneau de gestion qui se déploie)
//   mini  : petit encart près de l'horloge
//   icon  : fenêtre masquée, seule l'icône de notification (animée) reste
// La simulation tourne en permanence, quel que soit le mode.
import { Game } from "./game/game.js";
import { freshState, migrate } from "./game/state.js";
import { reachedAchievements } from "./game/achievements.js";
import { fmt, esc } from "./game/format.js";
import { StripRenderer } from "./render/strip.js";
import { MiniRenderer } from "./render/mini.js";
import { changes } from "./render/dom.js";
import { makeTrayIcons } from "./render/trayicons.js";
import { Sound } from "./render/sound.js";
import { nextHint, markHint } from "./ui/hints.js";
import { heroVisual, visualKey } from "./render/equipvis.js";
import { Panel } from "./ui/panel.js";
import { initClickThrough } from "./ui/clickthrough.js";

const api = window.sillwalker;
const FRAME_MS = 1000 / 30;         // rendu plafonné à 30 images/s
const SIM_BG_MS = 500;              // cadence de simulation quand rien n'est affiché
const MAX_DT = 1;                   // au-delà de 5 s d'écart : progression hors ligne
const AUTOSAVE_MS = 15000;
const PANEL_ANIM_MS = 180;

const $ = (s) => document.querySelector(s);
const perf = (window.__perf = { frames: 0, paints: 0, sims: 0, since: performance.now() });

async function boot() {
  const init = await api.getInit();
  const loaded = await api.loadSave();
  const game = new Game(migrate(loaded.data) || freshState());
  if (init.isDev) window.__game = game; // inspection par l'auto-test (dev uniquement)
  if (loaded.notice) game.log(loaded.notice);

  const body = document.body;
  const strip = new StripRenderer($("#strip"), game, { rightReserve: 64 });
  const mini = new MiniRenderer($("#mini"), game);
  const clickThrough = initClickThrough(api);
  const sound = new Sound();
  sound.bind(game);
  let currentLayout = init.layout;
  /** Applique les réglages du joueur (son, etc. ; le rendu les lit directement). */
  const applySettings = () => sound.set(game.S.settings.sound, game.S.settings.volume);
  applySettings();
  let speed = init.isDev && init.devSpeed ? init.devSpeed : 1;
  let mode = null, visible = false;

  /* ---------- Panneau (animation CSS seule : la fenêtre ne change pas de taille) ---------- */
  const menuBtn = $("#menu-btn"), badge = $("#menu-badge"), toast = $("#toast");
  let panelOpen = false, panelTimer = 0;
  const panel = new Panel($("#panel"), game, {
    isDev: init.isDev,
    speed,
    onSpeed: (v) => { speed = v; },
    onClose: () => closePanel(),
    onReset: () => { game.reset(); saveNow(); },
    onMini: () => api.setMode("mini"),
    onQuit: () => api.quit(),
    settings: { api, sound, getLayout: () => currentLayout, onChange: () => { applySettings(); strip.skyKey = ""; saveNow(); } },
  });

  function openPanel() {
    if (panelOpen || mode !== "strip" || !visible) return;
    panelOpen = true;
    clearTimeout(panelTimer);
    body.classList.add("panel-open");
    panel.setOpen(true);
    menuBtn.setAttribute("aria-expanded", "true");
    // Deux images : le panneau est d'abord rendu hors champ, puis glisse.
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add("panel-shown")));
    api.setPanelOpen(true);
    clickThrough.refresh();
    setTimeout(() => clickThrough.refresh(), PANEL_ANIM_MS);
  }
  function closePanel(instant) {
    if (!panelOpen) return;
    panelOpen = false;
    body.classList.remove("panel-shown");
    menuBtn.setAttribute("aria-expanded", "false");
    const finish = () => {
      if (panelOpen) return;
      body.classList.remove("panel-open");
      panel.setOpen(false);
      clickThrough.refresh();
    };
    clearTimeout(panelTimer);
    if (instant) finish(); else panelTimer = setTimeout(finish, PANEL_ANIM_MS);
    api.setPanelOpen(false);
    saveNow();
  }
  const togglePanel = () => (panelOpen ? closePanel() : openPanel());
  menuBtn.addEventListener("click", togglePanel);
  document.addEventListener("keydown", (e) => {
    if (!panelOpen) return;
    if (e.key === "Escape") { panel.onEscape(); return; }
    if (panel.onKey(e)) e.preventDefault();
  });

  /* ---------- Boutons de mode ---------- */
  $("#mini-btn").addEventListener("click", () => api.setMode("mini"));
  $("#mini-expand").addEventListener("click", (e) => { e.stopPropagation(); api.setMode("strip"); });
  $("#mini-icon").addEventListener("click", (e) => { e.stopPropagation(); api.setMode("icon"); });
  $("#mini").addEventListener("click", () => api.setMode("strip"));

  /* ---------- Mise en page imposée par le processus principal ---------- */
  function applyLayout(l) {
    currentLayout = l;
    body.classList.toggle("edge-top", l.edge === "top");
    body.classList.toggle("edge-bottom", l.edge !== "top");
    const root = document.documentElement.style;
    root.setProperty("--panel-h", l.panelHeight + "px");
    root.setProperty("--strip", l.stripHeight + "px");
    root.setProperty("--strip-opacity", String(l.opacity));
    if (l.mode !== mode) {
      if (mode === "strip" && panelOpen) closePanel(true);
      mode = l.mode;
      body.classList.toggle("mode-strip", mode === "strip");
      body.classList.toggle("mode-mini", mode === "mini");
      $("#mini").hidden = mode !== "mini";
      $("#strip").hidden = mode !== "strip";
      if (mode === "strip") strip.resize();
      if (mode === "mini") mini.resize();
      restartLoop();
      clickThrough.refresh();
    }
  }

  /* ---------- Bulle de la bande : résumé hors ligne et conseils ---------- */
  let toastTimer = 0, toastAction = null, toastUntil = 0;
  function showToast(html, action, ms = 15000) {
    toast.innerHTML = html;
    toast.hidden = false;
    toastAction = action;
    toastUntil = Date.now() + ms;
    clickThrough.refresh();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; toastAction = null; clickThrough.refresh(); }, ms);
  }
  function showOffline(sum) {
    showToast(`Pendant ton absence (${esc(sum.duration)}) : <b>${fmt(sum.kills)}</b> monstres, <b>+${fmt(sum.gold)}</b> or${sum.newLevel ? ", niveau " + sum.newLevel : ""}. Cliquer pour le détail.`,
      () => { openPanel(); panel.showOfflineSummary(sum); });
  }
  toast.addEventListener("click", () => {
    toast.hidden = true;
    clickThrough.refresh();
    clearTimeout(toastTimer);
    const act = toastAction;
    toastAction = null;
    act?.();
  });
  /** Conseils : un à la fois, quand la bulle est libre et le panneau fermé. */
  function checkHints() {
    if (mode !== "strip" || panelOpen || !toast.hidden || Date.now() < toastUntil) return;
    const h = nextHint(game);
    if (!h) return;
    markHint(game, h.id);
    showToast(`<span class="hint">💡</span> ${esc(h.text)}`, () => { openPanel(); panel.setTab(h.tab); }, 14000);
  }

  /* ---------- Succès Steam ---------- */
  let achDirty = true;
  game.on("change", () => { achDirty = true; });
  function checkAchievements(resync) {
    achDirty = false;
    const reached = reachedAchievements(game.S);
    const fresh = reached.filter((id) => !game.S.achievements.includes(id));
    if (fresh.length) game.S.achievements.push(...fresh);
    // Au démarrage on renvoie tout : rattrape les succès débloqués sans Steam.
    const send = resync ? reached : fresh;
    if (send.length) api.unlockAchievements(send);
  }

  /* ---------- État pour l'icône de notification ---------- */
  let lastStatus = null, statusT = 0;
  game.on("loot", ({ item }) => { if (item.r >= 2) api.sendStatus({ loot: item.r }); });
  function sendStatus(force) {
    const S = game.S, st = { state: game.R.mode, lvl: S.lvl, zone: S.zone, kills: Math.min(S.kills, 10), gold: fmt(S.gold), cls: game.classDef().name };
    const now = Date.now();
    const same = lastStatus && Object.keys(st).every((k) => st[k] === lastStatus[k]);
    // Changement d'état (combat, K.O.) : tout de suite ; le reste : 1 fois/s max.
    const urgent = !lastStatus || st.state !== lastStatus.state;
    if (same || (!force && !urgent && now - statusT < 1000)) return;
    lastStatus = st; statusT = now;
    api.sendStatus(st);
  }

  /* ---------- Icône de notification : tête du héros (classe + casque) ---------- */
  let trayKey = "";
  function syncTrayIcons() {
    const v = heroVisual(game.S), key = game.S.cls + "|" + visualKey(v);
    if (key === trayKey) return;
    trayKey = key;
    api.setTrayIcons(makeTrayIcons(game.S.cls, v));
  }
  game.on("change", () => { if (game.S.cls + "|" + visualKey(heroVisual(game.S)) !== trayKey) syncTrayIcons(); });

  /* ---------- Sauvegarde ---------- */
  function saveNow() {
    game.S.last = Date.now();
    return api.writeSave(JSON.stringify(game.S)).catch((e) => console.error("save", e));
  }
  setInterval(saveNow, AUTOSAVE_MS);
  api.onFlushRequest(async () => { checkAchievements(false); await saveNow(); });

  /* ---------- Boucles ---------- */
  let lastSim = Date.now(), frameTimer = 0;
  function simulate() {
    const now = Date.now();
    let dt = (now - lastSim) / 1000;
    lastSim = now;
    if (dt < 0) dt = 0;
    if (dt > 5) {
      // Mise en veille du PC, etc. : on traite l'écart comme du hors ligne.
      const sum = game.applyOffline(dt);
      if (sum) showOffline(sum);
      dt = 0;
    }
    if (!window.__pause) game.advance(Math.min(dt, MAX_DT) * speed); // __pause : auto-test (dev)
    perf.sims++;
    if (achDirty) checkAchievements(false);
    const up = game.hasUpgradeCached() || game.talentPointsFree() > 0;
    if (up !== !badge.hidden) badge.hidden = !up;
    sendStatus(false);
    if (perf.sims % 60 === 0) checkHints(); // toutes les 2 s environ
  }
  function frame() {
    simulate();
    const before = changes.n, now = performance.now();
    if (mode === "strip") strip.draw(now); else mini.draw(now);
    if (changes.n !== before) perf.paints++;
    perf.why = changes.why;
    panel.update(FRAME_MS / 1000);
    perf.frames++;
    if (perf.frames % 15 === 0 || (strip.juice.star && perf.frames % 3 === 0)) clickThrough.refresh(); // 2 fois/s (10 fois/s si une étoile passe)
  }
  function restartLoop() {
    clearInterval(frameTimer);
    frameTimer = 0;
    const show = visible && (mode === "strip" || mode === "mini");
    strip.setActive(show && mode === "strip");
    mini.setActive(show && mode === "mini");
    if (show) { frameTimer = setInterval(frame, FRAME_MS); frame(); }
  }
  function setVisible(v) {
    visible = v;
    if (!v && panelOpen) closePanel(true);
    restartLoop();
  }
  setInterval(() => { if (!frameTimer) simulate(); }, SIM_BG_MS); // la simulation ne s'arrête jamais
  api.onVisibility(setVisible);
  api.onLayout((l) => { applyLayout(l); api.layoutApplied(); });
  api.onCommand((cmd) => {
    if (cmd === "toggle-panel") togglePanel();
    if (cmd === "open-panel") openPanel();
    if (cmd.startsWith("tab:")) { openPanel(); panel.setTab(cmd.slice(4)); }
  });

  window.addEventListener("resize", () => {
    if (mode === "strip") { strip.resize(); if (frameTimer) strip.draw(performance.now()); }
    else if (mode === "mini") mini.resize();
  });

  /* ---------- Démo des effets (dev) : --demo ---------- */
  if (init.isDev) window.__demo = () => {
    game.startEvent("wind");
    strip.juice.coins(strip.monX(), strip.ground - 20, 28, true);
    strip.juice.loot(game.newItem(4), strip.monX() + 8);
    setTimeout(() => strip.juice.loot(game.newItem(2), strip.monX() + 40), 400);
    game.R.starT = 0.05;
  };

  /* ---------- Récompense quotidienne (au lancement et à minuit) ---------- */
  const localDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  function checkDaily() {
    const r = game.claimDaily(localDay());
    if (!r) return;
    setTimeout(() => showToast(`🎁 Récompense du jour <b>${r.day}/7</b> : <b>+${fmt(r.gold)}</b> or${r.potions ? ", 2 potions" : ""}${r.item ? `, <b>${esc(r.item.name)}</b>` : ""}. Reviens demain pour continuer la série !`,
      () => openPanel(), 15000), 2500);
  }
  setInterval(checkDaily, 60000);

  /* ---------- Démarrage ---------- */
  const away = (Date.now() - (game.S.last || Date.now())) / 1000;
  if (game.S.stats.kills > 0) { const sum = game.applyOffline(away); if (sum) showOffline(sum); }
  checkAchievements(true);
  checkDaily();
  await document.fonts.ready;
  applyLayout(init.layout);
  setVisible(init.visible !== false);
  sendStatus(true);
  syncTrayIcons();
  saveNow();
  api.ready();
}

boot().catch((e) => { console.error(e); document.body.textContent = "Erreur au démarrage : " + e.message; });
