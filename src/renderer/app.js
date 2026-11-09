// Point d'entrée du renderer : relie simulation, rendu, interface et
// processus principal (via window.sillwalker exposé par le preload).
//
// Trois modes d'affichage, choisis par le processus principal :
//   strip : la bande (+ panneau de gestion qui se déploie)
//   mini  : petit encart près de l'horloge
//   icon  : fenêtre masquée, seule l'icône de notification (animée) reste
// La simulation tourne en permanence, quel que soit le mode.
import { TAB_GATES } from "./game/tabs.js";
import { INTRO, introDue, markIntro, CHRONICLES, chroniclesUnlocked } from "./game/story.js";
import { journeyText } from "./ui/tabs/stats.js";
import { getLang, setLang, DEFAULT_LANG, LANGS, txn, systemLang } from "./i18n/index.js";
import { translateData, repairItemNames } from "./i18n/data.js";
import { itemName } from "./i18n/data.js";
import { t as tx } from "./i18n/index.js";
import { todoLabel } from "./ui/todo.js";
import { CLASSES } from "./game/classes.js";
import { PET_INDEX } from "./game/pets.js";
import { activeDayMod } from "./game/daymods.js";
import { Game } from "./game/game.js";
import { freshState, migrate, SAVE_VERSION } from "./game/state.js";
import { reachedAchievements, ACHIEVEMENTS } from "./game/achievements.js";
import { fmt, esc } from "./game/format.js";
import { StripRenderer } from "./render/strip.js";
import { MiniRenderer } from "./render/mini.js";
import { changes, applyUiScale, applyTheme } from "./render/dom.js";
import { makeTrayIcons } from "./render/trayicons.js";
import { Sound } from "./render/sound.js";
import { nextHint, markHint } from "./ui/hints.js";
import { heroVisual, visualKey } from "./render/equipvis.js";
import { Panel } from "./ui/panel.js";
import { initClickThrough } from "./ui/clickthrough.js";
import { recordZone } from "./game/unlocks.js";

const api = window.sillwalker;
const FRAME_MS = 1000 / 30;         // rendu plafonné à 30 images/s
const BATTERY_FRAME_MS = 1000 / 20; // portable sur batterie : 20 images/s suffisent
const IDLE_FRAME_MS = 1000 / 10;    // personne devant l'écran depuis 5 min : 10 images/s
const MINI_FRAME_MS = 1000 / 15;    // mode mini : petite vue, 15 images/s suffisent
const SIM_BG_MS = 500;              // cadence de simulation quand rien n'est affiché
const MAX_DT = 1;                   // au-delà de 5 s d'écart : progression hors ligne
const OFFLINE_TOAST_MIN_S = 120;    // absence plus courte : résumé dans le journal seulement (pas de bulle)
const AUTOSAVE_MS = 15000;
const PANEL_ANIM_MS = 180;

const $ = (s) => document.querySelector(s);
const perf = (window.__perf = { frames: 0, paints: 0, sims: 0, since: performance.now() });

async function boot() {
  const init = await api.getInit();
  const loaded = await api.loadSave();
  const migrated = migrate(loaded.data);
  // Sauvegarde d'une version plus récente du jeu (illisible ici) : partie neuve, mais dans la langue du joueur ;
  // le processus principal met l'ancienne de côté (save.newer-v*.json) avant de l'écraser.
  const newerSave = !migrated && loaded.data && loaded.data.v > SAVE_VERSION;
  const fresh = migrated || freshState();
  if (newerSave && typeof loaded.data.settings?.lang === "string") fresh.settings.lang = loaded.data.settings.lang;
  const game = new Game(fresh);
  // Langue : celle de la sauvegarde (copiée dans localStorage, lue dès le chargement des modules).
  // Partie neuve sans langue choisie : celle du système (un Windows en français démarre en français).
  const wanted = game.S.settings.lang || systemLang();
  // Recharger seulement si la langue voulue est valide (sinon rechargement sans fin) et une seule fois par lancement.
  const reloaded = (() => { try { return sessionStorage.getItem("langReload"); } catch { return wanted; } })();
  if (wanted !== getLang() && LANGS.some((l) => l.id === wanted) && reloaded !== wanted) {
    try { sessionStorage.setItem("langReload", wanted); } catch { /* stockage indisponible */ }
    setLang(wanted); location.reload(); return;
  }
  game.S.settings.lang = wanted;
  game.syncLogLang(wanted);
  translateData();
  repairItemNames(game.S);
  // Animations réduites demandées par Windows : effets sobres par défaut (une seule fois, modifiable ensuite).
  if (!game.S.settings.motionChecked) {
    game.S.settings.motionChecked = true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) game.S.settings.fullEffects = false;
  }
  document.documentElement.lang = wanted;
  // Textes fixes de index.html (attributs d'aide et d'accessibilité).
  for (const [sel, attr, src] of [
    ["#panel", "aria-label", "Panneau de gestion"], ["#strip", "aria-label", "Le héros traverse la zone et combat"],
    ["#mini-btn", "title", "Réduire en mode mini"], ["#mini-btn", "aria-label", "Réduire en mode mini"],
    ["#menu-btn", "title", "Ouvrir le panneau (héros, sac, zone)"], ["#menu-btn", "aria-label", "Ouvrir le panneau de gestion"],
    ["#hud-tab", "title", "Ouvrir le panneau (héros, sac, zone)"], ["#hud-tab", "aria-label", "Ouvrir le panneau de gestion"],
    ["#mini", "title", "Cliquer pour agrandir"], ["#mini-icon", "title", "Réduire en icône (zone de notification)"], ["#mini-icon", "aria-label", "Réduire en icône"],
    ["#mini-expand", "title", "Agrandir en bande"], ["#mini-expand", "aria-label", "Agrandir en bande"],
  ]) { const e = document.querySelector(sel); if (e) e.setAttribute(attr, tx(src)); }
  api.setLang?.(wanted);
  if (init.isDev) window.__game = game; // inspection par l'auto-test (dev uniquement)
  // Messages de récupération (envoyés en français par le processus principal) : traduits, et aussi en bulle.
  const saveNotice = newerSave ? tx("Ta sauvegarde vient d’une version plus récente du jeu : elle est gardée à part (save.newer). Reprends cette version pour la retrouver.") : loaded.notice ? tx(loaded.notice) : null;
  if (saveNotice) { game.log(saveNotice); setTimeout(() => showToast(`⚠ ${esc(saveNotice)}`, null, 20000), 3000); }

  const body = document.body;
  applyUiScale(game.S.settings.uiScale);
  applyTheme(game.S.settings.theme);
  if (init.isDev) window.__applyTheme = applyTheme; // auto-test (dev)
  const strip = new StripRenderer($("#strip"), game, { rightReserve: 64 });
  const mini = new MiniRenderer($("#mini"), game);
  const clickThrough = initClickThrough(api);
  strip.juice.onHits = () => clickThrough.refresh(); // cinématiques : le calque se clique (« passer »)
  // Infobulles de la bande : celles du système (title) ne s'affichent pas dans cette fenêtre sans focus ; la nôtre
  // apparaît juste au-dessus de l'élément survolé (la fenêtre a de la place au-dessus de la bande, comme les bulles).
  {
    const stip = document.createElement("div");
    stip.className = "gtip stip"; stip.hidden = true; stip.setAttribute("role", "tooltip");
    document.body.appendChild(stip);
    const strip = document.getElementById("strip");
    strip.addEventListener("mouseover", (e) => {
      const el = e.target.closest && e.target.closest("[title], [data-title]");
      if (!el) { stip.hidden = true; return; }
      if (el.hasAttribute("title")) { el.dataset.title = el.getAttribute("title"); el.removeAttribute("title"); }
      if (!el.dataset.title) { stip.hidden = true; return; }
      stip.textContent = el.dataset.title; stip.hidden = false;
      const r = el.getBoundingClientRect(), w = stip.offsetWidth, h = stip.offsetHeight;
      stip.style.left = Math.max(4, Math.min(window.innerWidth - w - 4, r.left + r.width / 2 - w / 2)) + "px";
      stip.style.top = Math.max(4, r.top - h - 6) + "px";
    });
    strip.addEventListener("mouseout", (e) => { if (!e.relatedTarget || !strip.contains(e.relatedTarget)) stip.hidden = true; });
    strip.addEventListener("mousedown", () => { stip.hidden = true; });
  }
  const sound = new Sound();
  sound.bind(game);
  let currentLayout = init.layout;
  /** Applique les réglages du joueur (son, etc. ; le rendu les lit directement). */
  const applySettings = () => sound.set(game.S.settings.sound, game.S.settings.volume);
  applySettings();
  let speed = init.isDev && init.devSpeed ? init.devSpeed : 1;
  let mode = null, visible = false, pendingOffline = null; // pendingOffline : résumé d’absence en attente (mode mini)

  /* ---------- Panneau (animation CSS seule : la fenêtre ne change pas de taille) ---------- */
  const menuBtn = $("#menu-btn"), badge = $("#menu-badge"), toast = $("#toast");
  let panelOpen = false, panelTimer = 0;
  const panel = new Panel($("#panel"), game, {
    isDev: init.devControls ?? init.isDev, // commandes de vitesse : cachées avec --release-ui
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
    panel.fitTabs();
    // Deux images : le panneau est d'abord rendu hors champ, puis glisse.
    // Classe ajoutée après un premier rendu (pour que la transition joue). Le minuteur prend le relais
    // si le navigateur ne livre pas d'image d'animation (fenêtre hors écran, écran en veille…).
    const show = () => { if (panelOpen) body.classList.add("panel-shown"); };
    requestAnimationFrame(() => requestAnimationFrame(show));
    setTimeout(show, 60);
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
  // Languette du milieu (écran ultra-large) : un clic sur l'or, le niveau ou la zone déplie le panneau.
  $("#hud-tab").addEventListener("click", togglePanel);
  strip.onTab = () => clickThrough.refresh();
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
      // Résumé d'absence gardé pendant le mode mini : montré dès qu'on agrandit.
      if (mode === "strip" && pendingOffline) { const sum = pendingOffline; pendingOffline = null; mini.setHint(null); setTimeout(() => showOffline(sum), 400); }
      clickThrough.refresh();
    }
  }

  /* ---------- Bulle de la bande : résumé hors ligne et conseils ---------- */
  let toastTimer = 0, toastAction = null, toastUntil = 0;
  // Pendant la cinématique d'introduction (premier lancement), aucun conseil : les bulles de l'histoire passent d'abord.
  let hintHold = 0;
  // Bulles en file : une nouvelle bulle (récompense du jour…) attend la fermeture de celle affichée
  // (résumé d'absence…) au lieu de la remplacer ; sinon le résumé était perdu au bout de 2,5 s.
  const toastQueue = [];
  function showToast(html, action, ms = 15000, queue = true) {
    if (queue && !toast.hidden && Date.now() < toastUntil) { toastQueue.push([html, action, ms]); return; }
    toast.innerHTML = html;
    toast.hidden = false;
    toastAction = action;
    toastUntil = Date.now() + ms;
    clickThrough.refresh();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, ms);
  }
  function hideToast() {
    toast.hidden = true; toastAction = null; toastUntil = 0; clickThrough.refresh();
    const next = toastQueue.shift();
    if (next) setTimeout(() => showToast(...next), 400);
  }
  /** Étape du carnet franchie pendant l'absence (la dernière, la plus marquante) : une ligne en plus dans la bulle. */
  const stepText = (sum) => (sum.steps || []).map(journeyText).filter(Boolean).pop() || "";
  const stepLine = (sum) => { const t = stepText(sum); return t ? `<br>✦ <b>${esc(t)}</b>` : ""; };
  function showOffline(sum) {
    // Absence très courte (mise en veille d'une minute…) : le journal suffit, pas de bulle qui dérange.
    if (sum.seconds < OFFLINE_TOAST_MIN_S) return;
    if (mode === "mini") {
      pendingOffline = sum;
      mini.setHint(`${tx("Pendant ton absence ({0}) :", { 0: sum.duration })} ${txn(sum.kills, "{n} monstre|{n} monstres", { n: fmt(sum.kills) })}, +${tx("{0} or", { 0: fmt(sum.gold) })}${stepText(sum) ? " · ✦ " + stepText(sum) : ""}`);
      return;
    }
    strip.welcomeBack();
    showToast(`${tx("Pendant ton absence ({0}) :", { 0: esc(sum.duration) })} ${txn(sum.kills, "{n} monstre|{n} monstres", { n: `<b>${fmt(sum.kills)}</b>` })}, <b>+${fmt(sum.gold)}</b> ${tx("or{0}{1}{2}. Cliquer pour le détail.", { 0: sum.newLevel ? tx(", niveau ") + sum.newLevel : "", 1: sum.feathers ? `, <b>${txn(sum.feathers, "{n} plume du vent|{n} plumes du vent")}</b>` : "", 2: sum.chests ? ", " + txn(sum.chests, "{n} coffre|{n} coffres", { n: `<b>${sum.chests}</b>` }) : "" })}${stepLine(sum)}`,
      () => { openPanel(); panel.showOfflineSummary(sum); });
  }
  toast.addEventListener("click", () => {
    clearTimeout(toastTimer);
    const act = toastAction;
    hideToast(); // la bulle suivante de la file, s'il y en a une
    act?.();
  });
  /** Conseils : un à la fois, quand la bulle est libre (panneau ouvert ou fermé). */
  function checkHints() {
    if (mode === "mini") { if (pendingOffline) return; const h = nextHint(game); mini.setHint(h && h.text); return; }
    // Panneau ouvert compris (demande de Victor : l'astuce à l'ampoule ne s'affichait plus le menu déplié).
    if (window.__noHints) return; // auto-test (dev) : bulles réservées aux contrôles
    // File pleine (intro…) ou cinématique d'introduction en cours : attendre.
    if (mode !== "strip" || !toast.hidden || Date.now() < toastUntil || toastQueue.length || Date.now() < hintHold) return;
    const h = nextHint(game);
    if (!h) return;
    markHint(game, h.key);
    showToast(`<span class="hint">💡</span> ${esc(h.text)}`, h.tab ? () => { openPanel(); panel.setTab(h.tab); } : null, 14000);
  }

  /* ---------- Succès Steam ---------- */
  let achDirty = true;
  game.on("change", () => { achDirty = true; });
  function checkAchievements(resync) {
    achDirty = false;
    const reached = reachedAchievements(game.S);
    const fresh = reached.filter((id) => !game.S.achievements.includes(id));
    if (fresh.length) {
      game.S.achievements.push(...fresh);
      const names = fresh.map((id) => ACHIEVEMENTS.find((x) => x.id === id)?.name || id);
      if (resync) setTimeout(() => showToast(`🏆 ${fresh.length > 1 ? `${fresh.length} ${tx("nouveaux succès")}` : tx("Nouveau succès")} : <b>${names.map(esc).join("</b>, <b>")}</b>`, () => { openPanel(); panel.setTab("stats"); }, 12000), 4000);
      else for (const n of names) { strip.juice.banner(`${tx("🏆 Succès : {0}", { 0: n })}`, "#ffd34d", strip.heroX + 80, true); sound.play("level"); }
    }
    // Au démarrage on renvoie tout : rattrape les succès débloqués sans Steam.
    const send = resync ? reached : fresh;
    if (send.length) api.unlockAchievements(send);
  }

  /* ---------- État pour l'icône de notification ---------- */
  let lastStatus = null, statusT = 0;
  game.on("loot", ({ item }) => { if (item.r >= 2) api.sendStatus({ loot: item.r }); });
  function sendStatus(force) {
    const S = game.S, st = { state: game.R.mode, lvl: S.lvl, zone: S.zone, best: recordZone(S), kills: Math.min(S.kills, 10), gold: fmt(S.gold), cls: game.classDef().name };
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
  let lastSim = Date.now(), frameTimer = 0, onBattery = !!init.onBattery, idle = !!init.idle; // sur batterie : moins d’images par seconde
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
    // Pastille du bouton du panneau : une action attend (quêtes, sac, points, déblocage…) ; recalculée toutes les 2 s.
    if (perf.sims % 60 === 1) {
      const todo = game.todoNow(), title = tx("Ouvrir le panneau (héros, sac, zone)") + (todo.length ? "\n" + todo.map((t) => "• " + todoLabel(t)).join("\n") : "");
      if (!todo.length !== badge.hidden) badge.hidden = !todo.length;
      if (menuBtn.title !== title) menuBtn.title = title;
    }
    sendStatus(false);
    if (perf.sims % 60 === 0) checkHints(); // toutes les 2 s environ
  }
  function frame() {
    simulate();
    const before = changes.n, now = performance.now();
    if (mode === "strip") strip.draw(now); else mini.draw(now);
    if (changes.n !== before) perf.paints++;
    perf.why = changes.why;
    panel.update(frameMs() / 1000);
    perf.frames++;
    if (perf.frames % 15 === 0 || (strip.juice.star && perf.frames % 3 === 0)) clickThrough.refresh(); // 2 fois/s (10 fois/s si une étoile passe)
  }
  /** Cadence d'affichage : la plus lente des contraintes (absent, batterie, mode mini). */
  function frameMs() { return Math.max(mode === "mini" ? MINI_FRAME_MS : FRAME_MS, onBattery ? BATTERY_FRAME_MS : 0, idle ? IDLE_FRAME_MS : 0); }
  function restartLoop() {
    clearInterval(frameTimer);
    frameTimer = 0;
    const show = visible && (mode === "strip" || mode === "mini");
    strip.setActive(show && mode === "strip");
    mini.setActive(show && mode === "mini");
    if (show) { frameTimer = setInterval(frame, frameMs()); frame(); }
  }
  function setVisible(v) {
    visible = v;
    if (!v && panelOpen) closePanel(true);
    restartLoop();
  }
  setInterval(() => { if (!frameTimer) simulate(); }, SIM_BG_MS); // la simulation ne s'arrête jamais
  api.onVisibility(setVisible);
  api.onPower?.(({ onBattery: b, idle: i }) => { if (!!b !== onBattery || !!i !== idle) { onBattery = !!b; idle = !!i; restartLoop(); } });
  api.onLayout((l) => { applyLayout(l); api.layoutApplied(); });
  api.onCommand((cmd) => {
    if (cmd === "toggle-panel") togglePanel();
    if (cmd === "open-panel") openPanel();
    if (cmd.startsWith("tab:")) { openPanel(); panel.setTab(cmd.slice(4)); }
  });

  window.addEventListener("resize", () => {
    if (mode === "strip") { strip.resize(); if (frameTimer) strip.draw(performance.now()); }
    if (panelOpen) panel.fitTabs();
    else if (mode === "mini") mini.resize();
  });

  /* ---------- Démo des effets (dev) : --demo ---------- */
  if (init.isDev) window.__panel = panel; // auto-test (dev)
  if (init.isDev) window.__strip = strip; // auto-test (dev) : cinématiques
  if (init.isDev && init.crawl) setTimeout(() => { openPanel(); import("./dev/crawl.js").then((m) => m.crawl()); }, 2500); // --crawl
  if (init.isDev) window.__showToast = showToast; // auto-test (dev) : file des bulles
  // Auto-test (dev) : vider la file des bulles (sinon une annonce restée en attente fausse les contrôles de bulles).
  if (init.isDev) window.__clearToasts = () => { toastQueue.length = 0; hideToast(); };
  if (init.isDev) window.__checkHints = () => checkHints(); // auto-test (dev)
  if (init.isDev) window.__stepLine = stepLine; // auto-test (dev) : ligne d'étape de la bulle de retour
  if (init.isDev) window.__showOffline = (sum) => { openPanel(); panel.showOfflineSummary(sum); }; // auto-test (dev)
  if (init.isDev) window.__demo = () => {
    game.startEvent("wind");
    strip.juice.coins(strip.monX(), strip.ground - 20, 28, true);
    strip.juice.loot(game.newItem(4), strip.monX() + 8);
    setTimeout(() => strip.juice.loot(game.newItem(2), strip.monX() + 40), 400);
    game.R.starT = 0.05;
    setTimeout(() => game.openChest(), 900);
    const L = game.lineup().map((x) => ({ ...x }));
    for (let i = game.S.kills + 1; i < L.length; i += 3) Object.assign(L[i], { elite: true, champion: true, goblin: false, affix: "furious" });
    game.R.lineup = L;
  };

  /* ---------- Récompense quotidienne (au lancement et à minuit) ---------- */
  const localDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  function checkDaily() {
    const before = game.S.daily?.mod;
    const r = game.claimDaily(localDay());
    const dm = activeDayMod(game.S);
    if (!r) {
      if (dm && before && before !== game.S.daily.mod) setTimeout(() => showToast(`${dm.icon} ${tx("Bénédiction du jour :")} <b>${esc(dm.name)}</b> — ${esc(dm.desc)}`, () => openPanel(), 12000), 2500);
      return;
    }
    setTimeout(() => showToast(`${tx("🎁 Récompense du jour")} <b>${r.day}/7</b> : <b>+${fmt(r.gold)}</b> ${tx("or{0}{1}. Reviens demain pour continuer la série !{2}", { 0: r.potions ? tx(", 2 potions") : "", 1: r.item ? `, <b>${esc(itemName(r.item))}</b>` : "", 2: dm ? `<br>${dm.icon} ${tx("Bénédiction du jour :")} <b>${esc(dm.name)}</b> — ${esc(dm.desc)}` : "" })}${r.broken ? `<br><span class="note">${txn(r.broken, "(série d’{n} jour interrompue : elle recommence)|(série de {n} jours interrompue : elle recommence)")}</span>` : ""}`,
      () => openPanel(), 15000), firstVisit ? 18000 : 2500);
  }
  // Tout premier lancement : la bulle de bienvenue (comment ouvrir le panneau) passe avant la récompense du jour.
  const firstVisit = !game.S.stats.kills && !(game.S.settings.hints || {}).welcome;
  // Introduction de l'histoire (story.js) : trois bulles au tout premier lancement, un clic passe à la suivante.
  if (introDue(game.S)) {
    markIntro(game.S);
    // Petite cinématique d'abord (le ciel se brise), puis les trois bulles de l'histoire.
    hintHold = Date.now() + 9000;
    setTimeout(() => strip.juice.cinematic("intro"), 800);
    setTimeout(() => INTRO.forEach((line) => showToast(`<span class="story">📜</span> ${esc(tx(line))}`, null, 14000)), 8200);
  }
  setInterval(checkDaily, 60000);

  /* ---------- Héros libéré ---------- */
  /* ---------- Onglet débloqué (tabs.js) : annonce sobre, un clic l'ouvre ---------- */
  // Nouvelle chronique : bulle sobre ; un clic ouvre le panneau sur la carte du héros, bloc des chroniques déplié.
  game.on("chronicle", ({ ids }) => {
    for (const id of ids) {
      const c = CHRONICLES.find((x) => x.id === id);
      if (!c) continue;
      // Petite cinématique d'abord (une seule à la fois ; pas pour « Le ciel rallumé », que la victoire met déjà en scène).
      if (id !== "dawn" && ids.indexOf(id) === ids.length - 1) strip.juice.cinematic("chronicle", { title: tx(c.title), n: chroniclesUnlocked(game.S, recordZone(game.S)).length, total: CHRONICLES.length });
      showToast(`<span class="story">📜</span> ${tx("Nouvelle chronique : {0}", { 0: `<b>${esc(tx(c.title))}</b>` })}`, () => { panel.kept.add("hero-chron"); openPanel(); panel.setTab("adventure"); panel.renderAll(); }, 12000);
    }
  });
  game.on("tabOpen", ({ ids }) => {
    sound.play("tab");
    for (const id of ids) {
      const desc = TAB_GATES[id] ? tx(TAB_GATES[id].desc) : "";
      if (TAB_GATES[id]?.hint) markHint(game, TAB_GATES[id].hint); // l'annonce dit déjà la même chose : pas de deuxième bulle
      showToast(`✦ ${tx("Nouvel onglet : {0} !", { 0: `<b>${esc(panel.tabLabel(id))}</b>` })} ${esc(desc)}`, () => { openPanel(); panel.setTab(id); }, 10000);
    }
    panel.dirty = true;
  });
  // Sac plein et une amélioration restée au sol : bulle (au plus une toutes les 3 min) ; un clic ouvre le sac.
  let lostUpAt = 0;
  game.on("lostUpgrade", ({ item }) => {
    if (Date.now() - lostUpAt < 180000) return;
    lostUpAt = Date.now();
    showToast(`🎒 ${tx("Sac plein : une amélioration est restée au sol ({0}) ! Fais de la place dans le sac.", { 0: `<b>${esc(itemName(item))}</b>` })}`, () => { openPanel(); panel.setTab("adventure"); panel.renderAll(); }, 12000);
  });
  game.on("classUnlock", ({ cls }) => {
    if (mode !== "strip") sound.play("legendary"); // dans la bande, la cinématique a son propre son
    setTimeout(() => showToast(`🗝 <b>${esc(CLASSES[cls].name)}</b> ${tx("est libéré ! Choisis-le dans l’onglet Classe : tu le joueras à ta prochaine ascension.")}`, () => { openPanel(); panel.setTab("class"); }, 15000), 5200); // après la cinématique
  });

  /* ---------- Retour d'expédition des familiers ---------- */
  let expReady = game.expeditionsReady().length;
  function checkExpeditions() {
    const ready = game.expeditionsReady();
    if (ready.length > expReady) {
      const name = PET_INDEX[ready[ready.length - 1]]?.name || tx("Un familier");
      showToast(`🐾 <b>${esc(name)}</b> ${tx("est revenu d’expédition ! Clique ici pour récupérer son butin.")}`, () => { openPanel(); panel.setTab("pets"); }, 15000);
      game.changed();
    }
    expReady = ready.length;
  }
  setInterval(checkExpeditions, 5000);
  game.on("expedition", () => { expReady = game.expeditionsReady().length; });

  /* ---------- Démarrage ---------- */
  const away = (Date.now() - (game.S.last || Date.now())) / 1000;
  if (game.S.stats.kills > 0) { const sum = game.applyOffline(away); if (sum) showOffline(sum); }
  checkAchievements(true);
  checkDaily();
  await Promise.all([document.fonts.load("13px 'Geist Pixel'"), document.fonts.load("600 13px 'Pixelify Sans'")]).catch(() => {});
  await document.fonts.ready;
  applyLayout(init.layout);
  setVisible(init.visible !== false);
  sendStatus(true);
  syncTrayIcons();
  saveNow();
  api.ready();
}

boot().catch((e) => { console.error(e); document.body.textContent = tx("Erreur au démarrage : ") + e.message; });
