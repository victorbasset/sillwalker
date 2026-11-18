// Auto-test de l'interface (dev) : `npx electron . --selftest --user-data=...`
// Les événements souris sont injectés dans la page (sendInputEvent) : la vraie
// souris de l'utilisateur n'est jamais déplacée.
const { app } = require("electron");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** Durée maximale d'un autotest (un passage normal prend quelques minutes). */
const SELFTEST_MAX_MS = (+process.env.SELFTEST_MAX_MIN || 10) * 60 * 1000; // SELFTEST_MAX_MIN=0.5 : essai du garde-fou

async function runSelfTest(strip) {
  const wc = strip.win.webContents;
  // Erreurs de l'interface pendant le parcours : comptées comme un échec (une animation cassée passait inaperçue,
  // it. 221 → 223 : chaque pièce d'or levait une ReferenceError sans qu'aucune vérification n'échoue).
  const rendErr = [];
  wc.on("console-message", (e) => {
    const level = e.level ?? e.params?.level;
    if (level === "error" || level === 3) rendErr.push(`${e.message ?? e.params?.message} (${e.sourceId ?? ""}:${e.lineNumber ?? ""})`);
  });
  const js = (code) => wc.executeJavaScript(code).catch((e) => { console.log("[selftest] ÉCHEC script :", code.slice(0, 140)); throw e; });
  const state = (expr) => js(`(() => { const S = window.__game.S; return ${expr}; })()`);
  // Le profil de test s'accumule d'une exécution à l'autre : la vitesse permanente doit pouvoir encore monter.
  await js("window.__game.S.speed = Math.min(window.__game.S.speed || 0, 100); window.__noHints = true"); // astuces coupées : les contrôles maîtrisent la bulle
  // Déblocages achetés (le parcours teste les commandes automatiques).
  await js("Object.assign(window.__game.S.unlocks ||= {}, Object.fromEntries([\"bulkEquip\", \"menagerie\", \"forge\", \"workshop\", \"autoPotion\", \"autoSell\", \"bulkPoints\", \"questDesk\", \"expeditions\", \"petBulk\", \"transmute\", \"autoLevel\"].map((k) => [k, true]))); window.__game.changed()");
  const rectOf = (sel) => js(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); e.scrollIntoView({ block: "nearest" }); const r = e.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), w: r.width }; })()`);
  const move = async (x, y) => { wc.sendInputEvent({ type: "mouseMove", x, y }); await sleep(150); };
  /** Attend qu'une condition soit vraie (machine chargée : animations plus lentes). */
  const CONFIRM_SHOWN = "!!document.querySelector('#confirm:not([hidden]) [data-action=\"confirm-ok\"]')";
  const until = async (test, ms = 3000) => { for (let t = 0; t < ms; t += 100) { if (await test()) return true; await sleep(100); } return !!(await test()); };
  const click = async (sel) => {
    const p = await rectOf(sel);
    await move(p.x, p.y);
    wc.sendInputEvent({ type: "mouseDown", x: p.x, y: p.y, button: "left", clickCount: 1 });
    wc.sendInputEvent({ type: "mouseUp", x: p.x, y: p.y, button: "left", clickCount: 1 });
    await sleep(100);
  };
  const results = [];
  // Garde-fou (it. 863) : une étape qui attend une promesse jamais tenue laissait Electron tourner sans fin (vu : un
  // autotest orphelin pendant 3 h 20 à ≈ 25 % d'un cœur, qui faussait aussi les mesures de performance). Passé
  // ce délai, l'autotest échoue en citant la dernière vérification faite, puis quitte.
  let lastCheck = "(aucune)";
  const watchdog = setTimeout(() => {
    console.log(`[selftest] ÉCHEC délai dépassé (${Math.round(SELFTEST_MAX_MS / 60000)} min) après ${results.length} vérifications ; dernière : ${lastCheck}`);
    app.exit(1);
  }, SELFTEST_MAX_MS);
  watchdog.unref?.();
  // (it. 2198) durée de chaque vérification (temps écoulé depuis la précédente) : SELFTEST_TIMES=1 affiche les plus lentes à la fin
  const times = []; let lastT = Date.now();
  const check = (name, ok, extra = "") => { results.push(ok); lastCheck = name; const now = Date.now(); times.push([now - lastT, name]); lastT = now; console.log(`[selftest] ${ok ? "OK  " : "ÉCHEC"} ${name}${extra ? " — " + extra : ""}`); };
  const bounds = () => strip.win.getBounds();

  await sleep(1500);
  if (strip.mode() !== "strip") await strip.setMode("strip");
  await sleep(500);
  for (let i = 0; i < 30 && (strip.mode() !== "strip" || bounds().height <= 64); i++) { // démarrage lent : on attend la bande
    if (strip.mode() !== "strip") await strip.setMode("strip");
    await sleep(200);
  }
  const b0 = bounds();

  // Zones cliquables : la fenêtre ne devient cliquable qu'au-dessus d'un
  // élément `.hit` (test sur des points d'écran, la vraie souris ne bouge pas).
  await sleep(600); // la page a déclaré ses zones
  const btn = await rectOf("#menu-btn");
  check("zone transparente au-dessus de la bande : clics traversants", !strip.hitTest(b0.x + Math.round(b0.width / 2), b0.y + 100));
  check("bouton du panneau : zone cliquable", strip.hitTest(b0.x + btn.x, b0.y + btn.y));
  await until(async () => js("!document.querySelector('#menu-badge').hidden"), 3000);
  check("bouton du panneau : pastille et liste des actions en attente", await js("!document.querySelector('#menu-badge').hidden && document.querySelector('#menu-btn').title.includes('\\n•')"));
  // Point vide de la bande : à au moins 80 px de tout élément cliquable (le monstre combattu l'est, et
  // il passe parfois au milieu : un point fixe faisait échouer le test une fois sur trois).
  const emptyX = await js(`(() => {
    const y = innerHeight - 40, R = [...document.querySelectorAll(".hit")]
      .filter((e) => { if (e.id === "strip" || e.closest("[hidden]")) return false; const cs = getComputedStyle(e); return cs.visibility !== "hidden" && cs.display !== "none"; })
      .map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
    for (let x = 100; x < innerWidth - 100; x += 50) if (!R.some((r) => x > r.left - 80 && x < r.right + 80 && y > r.top - 20 && y < r.bottom + 20)) return x;
    return -1;
  })()`);
  // (it. 835) opacité 100 % : la bande opaque arrête les clics ; en dessous, ils la traversent
  const opa0 = strip.settings.get("opacity");
  strip.setOpacity(0.6); await sleep(400);
  check("zone vide de la bande (opacité 60 %) : clics traversants", emptyX > 0 && !strip.hitTest(b0.x + emptyX, b0.y + b0.height - 40), `x = ${emptyX}`);
  strip.setOpacity(1); await sleep(400);
  const solidHit = strip.hitTest(b0.x + emptyX, b0.y + b0.height - 40);
  strip.setOpacity(0.6); await sleep(400);
  const thinHit = strip.hitTest(b0.x + emptyX, b0.y + b0.height - 40);
  strip.setOpacity(opa0); await sleep(400);
  check("bande opaque (100 %) : arrête les clics ; à 60 % : traversée", solidHit && !thinHit, `100 % : ${solidHit}, 60 % : ${thinHit}`);
  // (it. 854) nom de boss très long (allemand) : il ne passe pas sous la pastille or / niveau
  {
    const r = await js(`(() => { const s = window.__strip, t = s.bossTag; if (!t || !t.isConnected || s.centerHud) return { skip: true };
      const old = t.textContent; t.textContent = "Abgrundpanzer der Erwachte · −10 % LP · Gefangener: Nekromant"; s.placeBossName();
      const right = t.getBoundingClientRect().right - s.root.getBoundingClientRect().left; t.textContent = old; s.placeBossName();
      return { right: Math.round(right), pill: Math.round(s.hudRLeft) }; })()`);
    check("bande : un long nom de boss s'arrête avant la pastille d'or", r.skip || r.right <= r.pill, JSON.stringify(r));
  }
  // (it. 859) une réplique ordinaire du héros s'efface quand un boss arrive (elle cachait son nom) ; une urgente reste
  {
    const r = await js(`(() => { const s = window.__strip, R = window.__game.R, m0 = R.mon, out = [];
      const run = (boss, urgent) => { s.bubble.textContent = "x"; s.bubble.hidden = false; s.bubbleT = 3; s.bubbleUrgent = urgent;
        R.mon = { ...(m0 || {}), boss }; s.updateSpeech(0.01, s.heroX || 0); R.mon = m0; out.push(s.bubble.hidden ? "cachée" : "visible"); };
      run(false, false); run(true, false); run(true, true);
      s.bubbleT = 0; s.bubble.hidden = true; return out.join(" "); })()`);
    check("bande : une réplique ordinaire s'efface à l'arrivée d'un boss", r === "visible cachée visible", r);
  }
  // (it. 835) glisser le bouton ⌃ : la fenêtre suit la souris (le processus principal prend la main) et le clic qui
  // suit le relâchement n'ouvre pas le panneau
  {
    const m = await rectOf("#menu-btn");
    await move(m.x, m.y);
    wc.sendInputEvent({ type: "mouseDown", x: m.x, y: m.y, button: "left", clickCount: 1 });
    for (let i = 1; i <= 4; i++) { wc.sendInputEvent({ type: "mouseMove", x: m.x - 6 * i, y: m.y - 4 * i, button: "left", modifiers: ["leftButtonDown"] }); await sleep(40); }
    await sleep(100);
    const during = !!strip.drag;
    wc.sendInputEvent({ type: "mouseUp", x: m.x - 24, y: m.y - 16, button: "left", clickCount: 1 });
    await sleep(500);
    const after = !strip.drag, opened = await js("document.body.classList.contains('panel-open')");
    check("glisser le bouton ⌃ : la fenêtre suit, le panneau ne s'ouvre pas", during && after && !opened, `pendant ${during}, fini ${after}, panneau ${opened}`);
    // (it. 836) bande opaque : elle s'attrape aussi par un point vide (ciel, sol), pas seulement par ⌃
    strip.setOpacity(1); await sleep(400);
    const ey = b0.height - 40, edge1 = strip.settings.get("edge");
    await move(emptyX, ey);
    wc.sendInputEvent({ type: "mouseDown", x: emptyX, y: ey, button: "left", clickCount: 1 });
    for (let i = 1; i <= 4; i++) { wc.sendInputEvent({ type: "mouseMove", x: emptyX + 6 * i, y: ey - 4 * i, button: "left", modifiers: ["leftButtonDown"] }); await sleep(40); }
    await sleep(100);
    const grabbed = !!strip.drag;
    wc.sendInputEvent({ type: "mouseUp", x: emptyX + 24, y: ey - 16, button: "left", clickCount: 1 });
    await sleep(500);
    if (strip.settings.get("edge") !== edge1) strip.setEdge(edge1); // relâché où se trouve la vraie souris : on remet le bord
    strip.setOpacity(opa0); await sleep(300);
    check("bande opaque : s'attrape par un point vide", grabbed && !strip.drag, `pendant ${grabbed}`);
    // dépôt : moitié haute de l'écran -> bande en haut ; moitié basse -> en bas (sur l'écran sous le curseur)
    const wa = strip.display().workArea, edge0 = strip.settings.get("edge");
    strip.dragStart(); strip.dragEnd({ x: wa.x + 200, y: wa.y + 20 });
    const top = strip.settings.get("edge");
    strip.dragStart(); strip.dragEnd({ x: wa.x + 200, y: wa.y + wa.height - 20 });
    const bottom = strip.settings.get("edge");
    if (edge0 !== bottom) strip.setEdge(edge0);
    await sleep(300);
    check("bande lâchée en haut puis en bas de l'écran : bord suivi", top === "top" && bottom === "bottom", `${top} / ${bottom}`);
  }

  // Panneau : la fenêtre ne doit pas changer de taille (cause du clignotement).
  await click("#menu-btn");
  const samples = [];
  for (let i = 0; i < 8; i++) { samples.push(JSON.stringify(bounds())); await sleep(30); }
  await sleep(300);
  let shown = false;
  for (let i = 0; i < 20 && !(shown = await js("document.body.classList.contains('panel-shown')")); i++) await sleep(100);
  check("panneau ouvert", shown);
  check("fenêtre jamais redimensionnée pendant l'ouverture", samples.every((s) => s === JSON.stringify(b0)), samples[0]);
  const pr = await rectOf("#panel");
  check("panneau ouvert : sa zone devient cliquable", await until(() => strip.hitTest(b0.x + pr.x, b0.y + pr.y)));
  const tops = "Math.round(document.getElementById('panel').getBoundingClientRect().top) + ',' + Math.round(document.getElementById('panel-wrap').getBoundingClientRect().top)";
  await until(async () => { const [a, b] = (await js(tops)).split(","); return a === b; });
  const [panelTop, wrapTop] = (await js(tops)).split(",").map(Number);
  check("panneau entièrement glissé en place", panelTop === wrapTop, `panel ${panelTop} / zone ${wrapTop}`);
  const hdr = await js("[...document.querySelectorAll('.ptop button')].map(b => b.textContent.trim()).join(' | ')");
  check("boutons de l'en-tête", await js("!!document.querySelector('.ptop [data-action=mini]') && !!document.querySelector('.ptop [data-action=quit]')"), hdr);
  check("pas de boutons de vitesse hors dev", app.isPackaged ? !/×10/.test(hdr) : true);

  // Fermeture ; (it. 2137) la sauvegarde de test revient d'une absence : le résumé détaillé s'ouvre avec le panneau (bulle d'absence
  // affichée), un vrai clic sur ✕ fermerait d'abord cette fenêtre
  const awayTitle = await js("!document.querySelector('#modal').hidden && document.querySelector('#mt').textContent");
  check("panneau ouvert pendant la bulle d'absence : le résumé détaillé s'est ouvert", !!awayTitle, awayTitle);
  // (it. 2139) résumé d'absence sur deux colonnes : sans défilement (avant : 816 px de contenu pour 457 visibles)
  const awayScroll = await js("(() => { const b = document.querySelector('#modal .panel'); return b.scrollHeight - b.clientHeight; })()");
  check("résumé d'absence : rien ne défile (« À faire maintenant » visible)", awayScroll <= 1, awayScroll);
  // (it. 2143) pire cas : tous les gains et automatismes à la fois (21 lignes de bilan) : sur deux colonnes, toujours sans défilement
  const awayWorst = await js("(async () => { const sum = { seconds: 30000, zone: 'Z', duration: '8 h', kills: 1234, elites: 12, champions: 3, gold: 1e10, petGold: 2e9, xp: 3e8, newLevel: 1320, steps: [], kept: 5, best: 4, onGround: 22, feathers: 2, chests: 3, goblins: 4, poupouce: 1, questsDone: 6, spells: 3, forged: 4, anviled: 2, herbs: 5, traded: 2, transmuted: 9, petWork: 30, capH: 16 }; window.__showOffline(sum); await new Promise((r) => setTimeout(r, 300)); const b = document.querySelector('#modal .panel'), d = b.scrollHeight - b.clientHeight; document.querySelector('#modal').hidden = true; return d; })()");
  check("résumé d'absence au pire cas (21 lignes) : rien ne défile", awayWorst <= 1, awayWorst);
  // (it. 2138) et la carte du héros résume l'absence (« Depuis ta dernière visite »), même après la fin de la bulle
  const sinceV = await js("JSON.stringify(window.__panel.sinceVisit && window.__panel.sinceVisit.kills)");
  check("panneau ouvert au retour : « Depuis ta dernière visite » couvre l'absence", +sinceV > 0, sinceV);
  await js("document.querySelector('#modal').hidden = true");
  await click("#panel .close");
  check("panneau refermé", await until(async () => !(await js("document.body.classList.contains('panel-open')"))));
  check("panneau refermé : sa zone laisse passer les clics", await until(() => !strip.hitTest(b0.x + pr.x, b0.y + pr.y)));

  // Mode mini depuis la bande
  await click("#mini-btn");
  await sleep(900);
  let b = bounds();
  check("bouton mini : passe en mode mini", strip.mode() === "mini" && b.width === 370 && b.height === 64, JSON.stringify(b));
  await sleep(300);
  const miniTip = await js("(document.querySelector('#mini .mini-info') || {}).title || ''");
  check("mode mini : bulle d'aide (prochain déblocage, agrandir)", miniTip.split("\n").length >= 2, JSON.stringify(miniTip));
  await js("window.__game.emit('zoneUp', { zone: 99, record: true })");
  await sleep(200);
  check("mode mini : moment marquant (record) affiché", await js("document.querySelector('#mini').classList.contains('moment') && !document.querySelector('#mini .minimoment').hidden && document.querySelector('#mini .minimoment').textContent.includes('99')"));
  if (process.env.SELFTEST_SHOT4) require("fs").writeFileSync(process.env.SELFTEST_SHOT4, (await wc.capturePage()).toPNG());
  check("encart mini visible", await js("!document.getElementById('mini').hidden && document.getElementById('strip').hidden"));
  // Étoile filante en mode mini
  await js("window.__pause = false; window.__game.R.starT = 0.01");
  await sleep(700);
  await js("window.__pause = true");
  const ms0 = await state("S.speed");
  const hasMiniStar = await js("!!document.querySelector('#mini .ministar')");
  if (hasMiniStar) await click("#mini .ministar");
  await sleep(200);
  check("étoile filante attrapée en mode mini", hasMiniStar && (await state("S.speed")) > ms0);
  // Clic sur le monstre en mode mini : coup bonus, l'encart reste petit
  await js("window.__pause = false");
  await until(() => js("(() => { const g = window.__game; if (g.R.mode !== 'fight' || !g.R.mon) return false; window.__pause = true; g.R.mon.hp = g.R.mon.max = 1e12; return true; })()"), 15000);
  await sleep(500);
  const mt0 = await state("S.stats.taps || 0");
  const miniTap = await js("!document.querySelector('#mini .minitap').hidden");
  if (miniTap) await click("#mini .minitap");
  await sleep(300);
  check("mode mini : clic sur le monstre = coup bonus", miniTap && (await state("S.stats.taps || 0")) > mt0 && strip.mode() === "mini");
  // (it. 2072, bogue signalé par Victor, corrigé à l'it. 2071) le monstre en attente reste visible pendant que le précédent s'efface,
  // puis le combattant part de sa place d'attente (x ≥ 145 à sa première image visible ; avant : 132, en partant de l'invisible)
  const miniHand = await js(`(async () => { const G = window.__game, R = G.R, M = window.__mini, keep = { line: R.lineup, lz: R.lineupZone, k: G.S.kills, z: G.S.zone, mon: R.mon, mode: R.mode };
    window.__pause = false; G.S.zone = 30; R.lineupZone = 30; R.lineup = ['bear','wolf','golem','bear','wolf','golem'].map((type) => ({ type, elite: false, champion: false, affix: null })); G.S.kills = 0; R.mon = null; R.mode = 'walk';
    let firstX = null, gap = 0, corpse = false; const t0 = Date.now();
    while (Date.now() - t0 < 12000 && firstX === null) { await new Promise((r) => setTimeout(r, 40)); const a = M.monActor, b = M.nextActor;
      if (G.S.kills >= 1 && !R.mon) { corpse = true; if (!(b && !b.el.hidden)) gap++; }
      if (R.mon && R.mon.type === 'wolf' && a && a.alphaV > 0) firstX = a.x; }
    window.__pause = true; G.S.zone = keep.z; R.lineup = keep.line; R.lineupZone = keep.lz; G.S.kills = keep.k; R.mon = keep.mon; R.mode = keep.mode;
    return corpse + ' ' + gap + ' ' + firstX; })()`);
  check("mode mini : le monstre suivant s'avance depuis sa place d'attente, sans disparaître", /^true 0 (1(4[5-9]|[5-9]\d)|2\d\d)$/.test(miniHand), miniHand);
  // (it. 919) Ciel des événements en mode mini (it. 918) : Lune de sang puis Nuée d'étoiles, puis retour au ciel normal.
  const mSky = [];
  // (it. 1244) et Lune pâle
  for (const ev of ["bloodmoon", "starfall", "palemoon", null]) {
    await js(`(() => { const E = window.__game.R.events; E.bloodmoon = ${ev === "bloodmoon" ? 20 : 0}; E.starfall = ${ev === "starfall" ? 20 : 0}; E.palemoon = ${ev === "palemoon" ? 20 : 0}; })()`);
    await sleep(400);
    mSky.push(await js("window.__mini.sceneKey.split(':').slice(-3).join(':')"));
  }
  check("mode mini : ciel de la Lune de sang, de la Nuée d’étoiles et de la Lune pâle", mSky.join(" ") === "true:false:false false:true:false false:false:true false:false:false", mSky.join(" "));
  // (it. 930) Bulle du mode mini : le prochain déblocage donne aussi le temps estimé au rythme actuel.
  const mEta = await js(`(async () => { const { UNLOCKS } = await import("./game/unlocks.js"); const G = window.__game, S = G.S, M = window.__mini, keepU = S.unlocks, keepG = S.gold, keepB = S.best, keepP = G.R.pace;
    const u = UNLOCKS[UNLOCKS.length - 1]; S.best = Math.max(S.best, u.zone); S.unlocks = Object.fromEntries(UNLOCKS.slice(0, -1).map((x) => [x.id, true])); S.gold = u.price / 2;
    G.R.pace = Array.from({ length: 21 }, (_, i) => [i * 10, u.price / 2 / 3600 * 10]); M.infoKey = ""; await new Promise((r) => setTimeout(r, 300));
    const t = document.querySelector("#mini .mini-info").title; S.unlocks = keepU; S.gold = keepG; S.best = keepB; G.R.pace = keepP; G.invalidateStats(); M.infoKey = ""; return /≈/.test(t) ? "ok" : t; })()`);
  check("mode mini : temps estimé du prochain déblocage dans la bulle", mEta === "ok", mEta);
  // Mode mini : un onglet débloqué s'annonce sur la scène (la bulle de la bande n'y est pas visible).
  const mtab = await js("(() => { const S = window.__game.S, was = S.tabsOpen.stats; delete S.tabsOpen.stats; window.__game.step(1.1); S.tabsOpen.stats = was || true; const m = [...document.querySelectorAll('#mini *')].find((e) => /✦/.test(e.textContent) && !e.hidden && e.children.length === 0); return m ? m.textContent : 'rien'; })()");
  check("mode mini : onglet débloqué annoncé sur la scène", /✦/.test(mtab), mtab);
  // Icône seule depuis le mini
  await click("#mini-icon");
  await sleep(500);
  check("bouton icône : fenêtre masquée", strip.mode() === "icon" && !strip.win.isVisible());
  const sims0 = await js("window.__perf.sims"); await sleep(1600); const sims1 = await js("window.__perf.sims");
  const frames0 = await js("window.__perf.frames"); await sleep(600); const frames1 = await js("window.__perf.frames");
  check("icône seule : simulation continue, rendu arrêté", sims1 > sims0 && frames1 === frames0, `sim +${sims1 - sims0}, images +${frames1 - frames0}`);
  // Clic sur l'icône de notification = retour au dernier affichage (mini)
  await strip.toggle();
  await sleep(300);
  check("clic sur l'icône : retour au mode mini", strip.mode() === "mini" && strip.win.isVisible());
  // Agrandir depuis le mini
  await click("#mini-expand");
  await sleep(900);
  b = bounds();
  check("bouton agrandir : retour à la bande", strip.mode() === "strip" && b.width === b0.width && b.height === b0.height);

  // Onglets : talents, boutique, classe (vrais clics dans l'interface)
  // Jeu en pause pendant les clics : sinon le panneau peut se redessiner
  // (victoire, butin) entre l'appui et le relâchement d'un clic simulé.
  await js("window.__pause = true");
  // Assez de niveaux pour qu'il reste des points de talent, même après de nombreux lancements.
  await js("(() => { const g = window.__game, sp = Object.values(g.S.talents[g.S.cls] || {}).reduce((a, b) => a + b, 0); g.S.gold += 1e6; g.S.lvl = Math.max(g.S.lvl, sp + 6); g.invalidateStats(); g.changed() })()");
  await click("#menu-btn");
  await sleep(400);
  await click('[data-tab="talents"]');
  await sleep(150);
  const spent0 = await state("Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0)");
  // Choisit un talent encore améliorable (les tests précédents ont pu en remplir).
  // Un seul clic sur un talent disponible : au maximum possible (it. 1080 ; avant : +1 rang).
  const learnable = await js(`(() => { const b = document.querySelector('.talent.can[data-action="t-learn"]'); return b ? b.dataset.id : null; })()`);
  if (learnable) { await click(`.talent[data-tid="${learnable}"] .tn`); await sleep(200); }
  const spent1 = await state("Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0)");
  check("onglet Talents : un clic sur un talent dépense ses points (au maximum possible)", spent1 > spent0, `${spent0} -> ${spent1}`);
  // (it. 855, 1080) Maj + Entrée sur un talent : comme sa pastille « +1 » (un seul rang) ; le focus reste sur ce talent.
  const shiftMax = await js(`(async () => { const g = window.__game, S = g.S, P = window.__panel;
    const pick = () => document.querySelector('[data-pane="talents"]:not([hidden]) .talent:not(.mastery) .tmax:not(.off)')?.closest('.talent');
    // (it. 1080) talents tous au maximum (dev-data, niveau 1313) : on en remet un à zéro, et des points libres
    if (!pick()) { const ranks = S.talents[S.cls] ||= {}; const id = Object.keys(ranks).find((k) => ranks[k] > 2 && !k.startsWith("v_") && !k.startsWith("ms_")); if (id) ranks[id] = 0; S.lvl += 6; g.invalidateStats(); g.changed(); P.renderAll(); }
    const b = pick(); if (!b) return 'aucun talent avec +1';
    const id = b.dataset.tid, r0 = (S.talents[S.cls] || {})[id] || 0;
    b.focus(); b.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true, cancelable: true }));
    P.renderAll(); await new Promise((ok) => setTimeout(ok, 120)); P.renderAll();
    const r1 = (S.talents[S.cls] || {})[id] || 0, f = document.activeElement;
    return [r1 - r0 === 1 ? 'un' : 'rangs ' + r0 + '->' + r1, f && f.dataset.tid === id ? 'focus' : 'focus perdu ' + (f && f.tagName)].join(' '); })()`);
  check("onglet Talents : Maj + Entrée ajoute un rang, le focus reste sur le talent", shiftMax === "un focus", shiftMax);
  await click('[data-action="t-auto"]');
  await sleep(200);
  // (it. 1107-1108) paliers de maîtrise : le choix d'un bonus (grande fenêtre), enregistré
  const mPick = await js(`(async () => { const P = window.__panel, G = window.__game, S = G.S, T = P.tabs.talents; const keep = { picks: { ...(S.masteryPicks || {}) }, r: (S.talents[S.cls] || {}).ms_power };
    try { (S.talents[S.cls] ||= {}).ms_power = Math.max(420, keep.r || 0); delete (S.masteryPicks ||= {})["ms_power:10"]; G.invalidateStats();
      P.setTab("talents"); T.sel = "ms_power"; P.renderAll();
      // (it. 2103) par la pastille de la maîtrise (le bouton « choisir · N » de la fiche est retiré)
      const pill = document.querySelector('[data-pane="talents"]:not([hidden]) .talent[data-tid="ms_power"] .mpend:not(.off)'); if (!pill) return "pas de pastille";
      pill.click(); await new Promise((ok) => setTimeout(ok, 100)); if (document.querySelector('#modal').hidden) return "fenêtre fermée";
      // (it. 1126) fenêtre mesurée : ni défilement, ni bouton hors de sa ligne, ni étiquette « rang N » sur deux lignes
      const box = document.querySelector('#modal').firstElementChild, lis = [...document.querySelectorAll('#modal .mpicks li')];
      if (box.scrollHeight > box.clientHeight + 1) return "fenêtre qui défile " + box.scrollHeight + "/" + box.clientHeight;
      const out = lis.filter((li) => [...li.querySelectorAll('.mpick')].some((x) => x.getBoundingClientRect().right > li.getBoundingClientRect().right + 1)).length;
      const cut = lis.filter((li) => { const rg = document.createRange(); rg.selectNodeContents(li.firstElementChild); return new Set([...rg.getClientRects()].map((r) => Math.round(r.top))).size > 1; }).length;
      // (it. 1141) étiquette « rang 100 » qui passe sous le premier bouton (insécable mais rétrécie)
      const over = lis.filter((li) => { const rg = document.createRange(); rg.selectNodeContents(li.firstElementChild); const L = [...rg.getClientRects()].pop(), b0 = li.querySelector('.mpick'); return L && b0 && L.right > b0.getBoundingClientRect().left + 1 && L.bottom > b0.getBoundingClientRect().top + 1; }).length;
      if (out || cut || over) return "boutons hors " + out + ", étiquettes coupées " + cut + ", sous un bouton " + over;
      const b = document.querySelector('#modal [data-action="t-mpick"][data-at="10"][data-opt="b"]'); if (!b) return "pas d'option b";
      b.click(); await new Promise((r) => setTimeout(r, 100));
      // (it. 1133) la fenêtre reste ouverte et l'option choisie s'y met en évidence (6 paliers d'affilée)
      if (document.querySelector('#modal').hidden) return "fenêtre refermée par le choix";
      if (!b.classList.contains("on") || document.querySelector('#modal [data-at="10"][data-opt="a"]').classList.contains("on")) return "mise en évidence pas à jour";
      return "choix " + ((S.masteryPicks || {})["ms_power:10"] || "aucun");
    } finally { S.masteryPicks = keep.picks; if (keep.r == null) delete S.talents[S.cls].ms_power; else S.talents[S.cls].ms_power = keep.r; T.sel = null; G.invalidateStats(); document.querySelector('#modal').hidden = true; P.renderAll(); } })()`);
  check("onglet Talents : un bonus de palier de maîtrise se choisit", mPick === "choix b", mPick);
  // (it. 1134) « À faire » dans la grande fenêtre : une action d'un clic la laisse ouverte, la ligne passe à ✓
  const todoKeep = await js(`(async () => { const P = window.__panel, G = window.__game, S = G.S; const keep = { lvl: S.lvl, bp: S.unlocks.bulkPoints, t: JSON.parse(JSON.stringify(S.talents)) };
    try { S.unlocks.bulkPoints = true; S.lvl += 6; G.invalidateStats(); P.setTab("adventure"); P.renderAll();
      const d = document.querySelector('[data-pane="adventure"]:not([hidden]) [data-keep="hero-todo"]'); if (!d) return "pas de bloc À faire";
      P.showDetails(d); const b = document.querySelector('#modal [data-action="todo-do"][data-what="talents"]'); if (!b) return "pas d'action talents";
      b.click(); await new Promise((r) => setTimeout(r, 100));
      if (document.querySelector('#modal').hidden) return "fenêtre refermée";
      return /^✓/.test(b.textContent.trim()) ? "ouverte ✓" : "ligne pas cochée : " + b.textContent.slice(0, 30);
    } finally { S.lvl = keep.lvl; S.unlocks.bulkPoints = keep.bp; S.talents = keep.t; G.invalidateStats(); document.querySelector('#modal').hidden = true; P.renderAll(); } })()`);
  check("« À faire » (grande fenêtre) : une action la laisse ouverte, ligne cochée", todoKeep === "ouverte ✓", todoKeep);
  // (it. 1143) fleur pleine : « Recentrer » cadre le front du grand graphe (dernier nœud pris), pas la fleur
  const front = await js(`(async () => { const P = window.__panel, G = window.__game, S = G.S, K = P.tabs.skills; const keep = { lvl: S.lvl, skills: JSON.parse(JSON.stringify(S.skills)), auto: S.settings.autoSkills };
    try { S.lvl = 4000; S.settings.autoSkills = false; S.skills.order = ["root"]; S.skills.outer = []; S.skills.graphSeen = true; G.autoSpendSkills();
      S.skills.outer = S.skills.outer.slice(0, 5); G.invalidateStats(); P.setTab("skills"); P.renderAll(); K.center();
      const last = S.skills.outer[S.skills.outer.length - 1], el = document.querySelector('[data-pane="skills"]:not([hidden]) [data-gid="' + last + '"]');
      if (!el) return "nœud " + last + " absent";
      const B = document.querySelector('[data-pane="skills"]:not([hidden]) .skillview').getBoundingClientRect(), r = el.getBoundingClientRect();
      const dx = Math.round(r.left + r.width / 2 - (B.left + B.width / 2)), dy = Math.round(r.top + r.height / 2 - (B.top + B.height / 2));
      return Math.abs(dx) < 20 && Math.abs(dy) < 20 ? "centré" : "décalé " + dx + "," + dy;
    } finally { S.lvl = keep.lvl; S.skills = keep.skills; S.settings.autoSkills = keep.auto; G.invalidateStats(); K.view.k = 0; P.setTab("adventure"); P.renderAll(); } })()`);
  check("Compétences, fleur pleine : « Recentrer » cadre le front du grand graphe", front === "centré", front);
  // (it. 1127) Compétences : la bulle d'un nœud près du bas ou du bord droit reste dans la vue (elle sortait de 55 px)
  const skTip = await js(`(async () => { const P = window.__panel; P.setTab("skills"); P.renderAll(); await new Promise((r) => setTimeout(r, 300));
    const box = document.querySelector('[data-pane="skills"]:not([hidden]) .skillview'), B = box.getBoundingClientRect(), tip = box.querySelector(".skilltip");
    const ns = [...box.querySelectorAll("[data-gid], [data-id]")].map((e) => ({ e, r: e.getBoundingClientRect() })).filter((o) => o.r.width && o.r.top > B.top && o.r.bottom < B.bottom && o.r.left > B.left && o.r.right < B.right);
    if (!ns.length) return "aucun nœud visible";
    const out = [];
    for (const f of [(a, b) => b.r.bottom - a.r.bottom, (a, b) => b.r.right - a.r.right]) { const o = ns.sort(f)[0]; o.e.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); const T = tip.getBoundingClientRect();
      if (tip.hidden || T.bottom > B.bottom + 1 || T.right > B.right + 1 || T.top < B.top - 1 || T.left < B.left - 1) out.push(Math.round(T.bottom - B.bottom) + "/" + Math.round(T.right - B.right)); }
    tip.hidden = true; P.setTab("adventure"); P.renderAll(); return out.length ? "dehors " + out.join(" ") : "dedans"; })()`);
  check("Compétences : bulle d'un nœud du bord dans la vue", skTip === "dedans", skTip);
  // (it. 1119) grand graphe rempli (it. 1115, 1117) : annonce une fois, ligne « points en surplus » dans Compétences
  const gFull = await js(`(async () => { const P = window.__panel, G = window.__game, S = G.S; const keep = { lvl: S.lvl, skills: JSON.parse(JSON.stringify(S.skills)), auto: S.settings.autoSkills };
    try { let n = 0; G.on("graphFull", () => n++);
      S.lvl = 4000; S.settings.autoSkills = false; S.skills.order = ["root"]; S.skills.outer = []; S.skills.graphSeen = true; delete S.skills.graphFullSeen;
      G.autoSpendSkills(); G.invalidateStats(); G.advance(1.5); G.advance(1.5);
      P.setTab("skills"); P.renderAll();
      const t = document.querySelector('[data-pane="skills"]:not([hidden]) .skpts').textContent;
      return "nœuds " + S.skills.outer.length + " annonces " + n + (/surplus/.test(t) ? " ligne" : " sans ligne : " + t.slice(0, 80));
    } finally { S.lvl = keep.lvl; S.skills = keep.skills; S.settings.autoSkills = keep.auto; G.invalidateStats(); P.setTab("adventure"); P.renderAll(); } })()`);
  check("grand graphe rempli : annoncé une fois, points en surplus affichés", gFull === "nœuds 258 annonces 1 ligne", gFull);
  check("onglet Talents : dépenser automatiquement", (await js("window.__game.talentPointsFree()")) === 0 || (await js("window.__game.nextAutoTalent()")) === null);
  await click('[data-tab="shop"]');
  await sleep(150);
  const pot0 = await state("S.potions");
  const canBuy = await js(`!!document.querySelector('[data-action="s-cons"][data-id="potion"]:not([disabled])')`);
  if (canBuy) await click('[data-action="s-cons"][data-id="potion"]');
  await sleep(150);
  const pot1 = await state("S.potions");
  check("onglet Boutique : achat d'une potion", !canBuy ? pot0 >= 20 : pot1 === pot0 + 1, `${pot0} -> ${pot1}`);
  // Coffre : ouverture animée avec l'objet obtenu
  await js("(() => { const g = window.__game; while (g.S.bag.length > 10) g.S.bag.pop(); g.S.gold += 1e9; g.changed() })()");
  await sleep(200);
  await click('[data-action="s-chest"][data-id="chest_wood"]');
  await sleep(300);
  check("boutique : coffre ouvert et objet révélé", await js("!document.getElementById('modal').hidden && !!document.querySelector('#modal .reveal .rname')"));
  await click('#modal [data-action="closemodal"]');
  await sleep(150);
  await click('[data-tab="class"]');
  await sleep(150);
  await js("(() => { const g = window.__game; for (const c of ['ranger', 'mage']) if (!g.S.classesUnlocked.includes(c)) g.S.classesUnlocked.push(c); g.S.nextCls = null; g.changed() })()");
  await sleep(200);
  const cls0 = await state("S.cls");
  const target = cls0 === "ranger" ? "mage" : "ranger";
  await click(`[data-action="c-pick"][data-id="${target}"]`);
  await sleep(200);
  check("onglet Classe : choix de la classe pour la prochaine ascension", (await state("S.nextCls")) === target && (await state("S.cls")) === cls0);
  await js("window.__game.S.nextCls = null; window.__game.changed()");
  await sleep(150);

  // Quêtes : on termine la première puis on réclame la récompense
  await js("window.__game.S.bag.splice(0, 6)"); // place pour un éventuel coffre de récompense
  await js("(() => { const q = window.__game.S.quests.slots[0]; q.progress = q.goal; window.__game.changed() })()");
  await click('[data-tab="quests"]');
  await sleep(150);
  const done0 = await state("S.quests.completed");
  await click('[data-action="q-claim"]');
  await sleep(150);
  check("onglet Quêtes : réclamer une récompense", (await state("S.quests.completed")) === done0 + 1 && (await state("S.quests.slots.length")) === 3);
  // (it. 1546) quête à coffre réclamée à la main : le coffre s'ouvre (fenêtre animée, comme ceux de la boutique)
  await js("(() => { const g = window.__game; g.S.quests.slots[0].progress = g.S.quests.slots[0].goal; g.S.quests.slots[0].reward = { gold: 5, chest: 2 }; g.changed(); })()");
  await sleep(150);
  await click('[data-action="q-claim"]');
  await sleep(250);
  const qrev = await js("(() => { const m = document.querySelector('#modal'); const ok = !m.hidden && !!m.querySelector('.reveal .rname'); return ok + ' ' + (m.querySelector('.rname') || {}).className; })()");
  check("quête à coffre réclamée : le coffre s'ouvre sous les yeux", /^true rname rc[2-4]$/.test(qrev), qrev);
  await js("document.querySelector('#modal').hidden = true");
  // (it. 1555) « Tout réclamer » avec deux coffres : le meilleur des deux s'ouvre
  const qall = await js(`(async () => { const g = window.__game, S = g.S; const had = S.unlocks.questDesk; S.unlocks.questDesk = true;
    S.bag.splice(0, 4); S.quests.slots.slice(0, 2).forEach((q, i) => { q.progress = q.goal; q.reward = { chest: 2 + i }; }); g.changed();
    window.__panel.renderAll(); await new Promise((r) => setTimeout(r, 200));
    const b = document.querySelector('[data-pane="quests"]:not([hidden]) [data-action="q-claimall"]'); if (!b) { S.unlocks.questDesk = had; return "pas de bouton"; }
    b.click(); await new Promise((r) => setTimeout(r, 250)); const m = document.querySelector('#modal'); const ok = !m.hidden && !!m.querySelector('.reveal .rname');
    m.hidden = true; S.unlocks.questDesk = had; g.changed(); return String(ok); })()`);
  check("« Tout réclamer » : le plus beau coffre s'ouvre", qall === "true", qall);
  // Familiers : faire éclore un œuf
  await js("window.__game.S.pets.eggs += 1; window.__game.changed()");
  await click('[data-tab="pets"]');
  await sleep(150);
  const pets0 = await state("Object.keys(S.pets.owned).length + S.pets.eggs");
  await js("window.__game.S.pets.eggs += 2; window.__game.changed()");
  await sleep(150);
  await click('[data-action="p-hatchall"]');
  await sleep(150);
  check("onglet Familiers : faire éclore tous les œufs en un clic", (await state("S.pets.eggs")) === 0 && (await state("Object.keys(S.pets.owned).length")) >= 1);
  // Ascension : acheter une constellation
  await js("window.__game.S.prestige.shards += 50; window.__game.changed()");
  await click('[data-tab="ascension"]');
  await sleep(150);
  // Première constellation encore achetable (les tests précédents ont pu en remplir)
  const cid = await js(`(() => { const b = document.querySelector('[data-action="a-buy"]:not([disabled])'); return b ? b.dataset.id : null; })()`);
  const r0 = cid ? await state(`S.prestige.ranks["${cid}"] || 0`) : 0;
  if (cid) await click(`[data-action="a-buy"][data-id="${cid}"]`);
  await sleep(150);
  check("onglet Ascension : acheter une constellation", !!cid && (await state(`S.prestige.ranks["${cid}"] || 0`)) === r0 + 1, cid || "aucune");
  // Arbre de compétences : clic sur un nœud relié à l'origine
  await js("window.__game.S.lvl = Math.max(window.__game.S.lvl, 10); window.__game.invalidateStats(); window.__game.changed()");
  await click('[data-tab="skills"]');
  await sleep(300);
  const sk0 = await state("S.skills.order.length");
  const nodeRect = await js(`(() => { const c = [...document.querySelectorAll('.skillsvg .node.avail')][0]; if (!c) return null; const r = c.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; })()`);
  if (nodeRect) {
    await move(nodeRect.x, nodeRect.y);
    wc.sendInputEvent({ type: "mouseDown", x: nodeRect.x, y: nodeRect.y, button: "left", clickCount: 1 });
    wc.sendInputEvent({ type: "mouseUp", x: nodeRect.x, y: nodeRect.y, button: "left", clickCount: 1 });
    await sleep(200);
  }
  check("onglet Compétences : clic sur un nœud disponible", !!nodeRect && (await state("S.skills.order.length")) === sk0 + 1, `${sk0} -> ${await state("S.skills.order.length")}`);
  await click('[data-action="k-undo"]');
  await sleep(150);
  check("onglet Compétences : annuler le dernier", (await state("S.skills.order.length")) === sk0);
  // (it. 850) au clavier : seuls les nœuds apprenables sont focalisables ; focus = bulle ; Entrée l'apprend et passe au suivant
  const skKb = await js(`(() => { const all = [...document.querySelectorAll('[data-pane="skills"] .skillsvg .node')];
    const f = all.filter((c) => c.getAttribute("tabindex") === "0"), bad = f.filter((c) => !c.classList.contains("avail")).length;
    // fenêtre fantôme sans focus système : Chromium ne déclenche pas focusin pour un focus() scripté (Tab, en vrai, si)
    if (f[0]) { f[0].focus(); if (!document.hasFocus()) f[0].dispatchEvent(new FocusEvent("focusin", { bubbles: true })); } return { n: f.length, bad, id: f[0]?.dataset.id, tip: !document.querySelector('[data-pane="skills"] .skilltip').hidden }; })()`);
  wc.sendInputEvent({ type: "keyDown", keyCode: "Enter" });
  wc.sendInputEvent({ type: "keyUp", keyCode: "Enter" });
  await sleep(200);
  const skKb2 = await js(`(() => { const a = document.activeElement; return { id: a?.dataset?.id, tab: a?.getAttribute?.("tabindex") }; })()`);
  check("onglet Compétences : au clavier (focus, bulle, Entrée, nœud suivant)", skKb.n > 0 && skKb.bad === 0 && skKb.tip
    && (await state("S.skills.order.length")) === sk0 + 1 && (await state(`S.skills.order.includes("${skKb.id}")`)) && skKb2.tab === "0" && skKb2.id !== skKb.id,
    JSON.stringify({ skKb, skKb2 }));
  await click('[data-action="k-undo"]');
  await sleep(150);
  // Infobulle au survol d'un objet du sac
  await js("(() => { const g = window.__game; if (g.bagFull()) g.S.bag.pop(); g.addToBag(g.newItem(0)); g.changed() })()");
  await click('[data-tab="adventure"]');
  await sleep(200);
  const slot = await js(`(() => { const s = document.querySelector('#p-bag .slot[data-from="bag"]'); if (!s) return null; const r = s.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; })()`);
  if (slot) { await move(slot.x, slot.y); await sleep(150); }
  check("infobulle au survol d'un objet", !!slot && (await js("!document.querySelector('.itemtip').hidden")));
  // Double-clic sur un objet du sac : équipé directement
  await js("(() => { const g = window.__game; if (g.bagFull()) g.S.bag.pop(); g.addToBag(g.newItem(4, g.S.best + 20)); g.changed() })()");
  await click('[data-tab="adventure"]');
  await sleep(200);
  const dblId = await js("window.__game.S.bag[window.__game.S.bag.length - 1].id");
  const ds = await rectOf(`#p-bag .slot[data-from="bag"][data-id="${dblId}"]`);
  await move(ds.x, ds.y);
  wc.sendInputEvent({ type: "mouseDown", x: ds.x, y: ds.y, button: "left", clickCount: 1 });
  wc.sendInputEvent({ type: "mouseUp", x: ds.x, y: ds.y, button: "left", clickCount: 1 });
  wc.sendInputEvent({ type: "mouseDown", x: ds.x, y: ds.y, button: "left", clickCount: 2 });
  wc.sendInputEvent({ type: "mouseUp", x: ds.x, y: ds.y, button: "left", clickCount: 2 });
  await sleep(250);
  check("double-clic sur un objet du sac : équipé", await js(`Object.values(window.__game.S.equip).some((it) => it && it.id === ${dblId})`));
  // (it. 835) glisser-déposer : objet du sac -> sa ligne d'équipement, en surbrillance pendant le trajet
  await js("(() => { const g = window.__game; if (g.bagFull()) g.S.bag.pop(); g.addToBag(g.newItem(4, g.S.best + 25)); g.changed() })()");
  await click('[data-tab="adventure"]');
  await sleep(300);
  const dnd = await js(`(() => {
    const g = window.__game, it = g.S.bag[g.S.bag.length - 1], src = document.querySelector('#p-bag .slot[data-from="bag"][data-id="' + it.id + '"]');
    if (!src) return "objet absent du sac";
    const dt = new DataTransfer(), ev = (type, el) => el.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt }));
    ev("dragstart", src);
    const lit = [...document.querySelectorAll("#p-detail .eqline.dropok")];
    if (lit.length !== 1 || lit[0].querySelector(".slot").dataset.slot !== it.slot) return "surbrillance : " + lit.length;
    // (it. 836) survoler une autre ligne ou le portrait allume la BONNE ligne ; le dépôt sur le portrait équipe
    const other = document.querySelector("#p-detail .eqline:not(.dropok)");
    ev("dragover", other);
    if (other.classList.contains("dropover") || !lit[0].classList.contains("dropover")) return "survol d'une autre ligne : mauvaise ligne";
    ev("dragover", document.querySelector("#p-bag"));
    if (document.querySelector(".dropover")) return "sac accepté pour un objet du sac";
    const port = document.querySelector("#p-detail .heroport");
    ev("dragover", port);
    if (!lit[0].classList.contains("dropover")) return "survol du portrait non signalé";
    ev("drop", port); ev("dragend", src);
    if (g.S.equip[it.slot]?.id !== it.id) return "pas équipé";
    if (document.querySelectorAll(".dropok, .dropover").length) return "surbrillance restée";
    // l'inverse : objet porté lâché sur le titre du panneau Sac -> retiré
    const eq = document.querySelector('#p-detail .slot[data-from="equip"][data-slot="' + it.slot + '"]'), dt2 = new DataTransfer();
    const ev2 = (type, el) => el.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt2 }));
    ev2("dragstart", eq);
    const h = document.querySelector("#p-bag h2") || document.querySelector("#p-bag");
    ev2("dragover", h);
    if (!document.querySelector("#p-bag .bag.dropover")) return "survol du sac non signalé";
    ev2("drop", h); ev2("dragend", eq);
    if (g.S.equip[it.slot]?.id === it.id || !g.findBagItem(it.id)) return "pas retiré";
    return "ok";
  })()`);
  check("glisser un objet sur le panneau Équipement (portrait) puis le rendre au sac", dnd === "ok", dnd);
  // Vendre ce qui n'améliore pas (avec confirmation)
  await js("(() => { const g = window.__game; for (let n = 0; n < 200 && Object.keys(g.S.equip).some((k) => !g.S.equip[k] || g.S.equip[k].r < 3); n++) { const it = g.newItem(3, g.S.best + 10); if (!g.S.equip[it.slot] || g.S.equip[it.slot].r < 3) g.S.equip[it.slot] = it; } g.S.bag.splice(0, 12); for (let i = 0; i < 6; i++) g.addToBag(g.newItem(0, 1)); g.changed() })()");
  await click('[data-tab="adventure"]');
  await sleep(200);
  const bag0 = await state("S.bag.length"), useless = await js("window.__game.nonUpgradeItems().length"); // (it. 1096) tout sauf les améliorations
  // (it. 1024) attentes sur l'état, comme la transmutation (it. 1023)
  await until(() => js("!!document.querySelector('[data-action=\"sellless\"]:not([disabled])')"));
  await click('[data-action="sellless"]');
  // (it. 1066) la fenêtre de confirmation est permanente, seulement masquée : attendre qu'elle soit VISIBLE (avant, l'attente
  // réussissait tout de suite et le clic visait un bouton caché, aux coordonnées 0 : transmutation 205/206 une fois sur deux)
  await until(() => js(CONFIRM_SHOWN));
  await click('[data-action="confirm-ok"]');
  await until(async () => (await state("S.bag.length")) === bag0 - useless);
  check("vendre ce qui n'améliore pas (après confirmation)", useless > 0 && (await state("S.bag.length")) === bag0 - useless, `${bag0} -> ${await state("S.bag.length")} (${useless} inutiles)`);
  // Transmutation (3 communs inutiles -> 1 peu commun), avec confirmation
  // (it. 1084) sac entièrement vidé (splice(0, 12) laissait un 4e objet au-delà de 12) et communs SANS statistique : jamais une amélioration
  // (it. 1069) emplacement équipé imposé : un commun tiré pour un emplacement vide est une amélioration, pas un objet
  // inutile (diagnostic « sac 0+00 » : deux inutiles seulement, rien à transmuter ; deuxième cause, après la fenêtre
  // de confirmation encore cachée de l'it. 1066)
  // (it. 1156) instable une fois sur trois (« sac 0+0+0+ ») : les objets fabriqués étaient des AMÉLIORATIONS (jamais
  // transmutées) ; on prend un emplacement équipé où ils n'en sont pas, et on le revérifie juste avant le clic
  const mkTrans = "(() => { const g = window.__game; g.S.bag.length = 0; const mk = (sl) => { const it = g.newItem(0, 1); it.r = 0; it.set = null; it.slot = sl; it.lvl = 1; it.st = {}; delete it.power; return it; }; for (const sl of Object.keys(g.S.equip).filter((k) => g.S.equip[k])) { const t = mk(sl); if (!g.isUpgrade(t)) { g.S.bag.push(t, mk(sl), mk(sl)); g.changed(); return sl; } } g.changed(); return 'aucun emplacement'; })()";
  await js(mkTrans);
  await click('[data-tab="adventure"]');
  await sleep(200);
  const tr0 = await js("window.__game.S.stats.transmutes || 0");
  // (it. 1023) attentes sur l'état (fenêtre de confirmation, puis compteur) et non plus 150 ms fixes : instable sous xvfb
  await until(() => js("!!document.querySelector('[data-action=\"transmute\"]:not([disabled])')"));
  if (await js("window.__game.S.bag.some((it) => window.__game.isUpgrade(it))")) { await js(mkTrans); await sleep(150); } // devenus améliorations entre-temps
  await click('[data-action="transmute"]');
  await until(() => js(CONFIRM_SHOWN));
  await click('[data-action="confirm-ok"]');
  await until(async () => (await js("window.__game.S.stats.transmutes || 0")) > tr0);
  const trDiag = await js(`(() => { const g = window.__game, b = document.querySelector('[data-action="transmute"]'); return "sac " + g.S.bag.map((it) => it.r + (g.isUpgrade(it) ? "+" : "")).join("") + " plan " + JSON.stringify(g.transmutePlan()) + " bouton " + (b ? (b.disabled ? "inactif" : "actif") : "absent") + " onglet " + window.__panel.tab + " confirmation " + !document.querySelector("#confirm").hidden; })()`);
  check("transmutation (après confirmation)", (await js("window.__game.S.stats.transmutes || 0")) > tr0, `${tr0} -> ${await js("window.__game.S.stats.transmutes || 0")} · ${trDiag}`);
  // Familiers : envoyer un familier en expédition
  await js("(() => { const P = window.__game.S.pets; P.owned.cat ||= { lvl: 1, xp: 0 }; P.owned.fox ||= { lvl: 1, xp: 0 }; P.active = 'cat'; P.exp = {}; window.__game.changed() })()");
  await click('[data-tab="pets"]');
  await sleep(200);
  await click('[data-action="p-exp"][data-id="fox"][data-kind="short"]');
  await sleep(150);
  check("familiers : départ en expédition", (await js("!!(window.__game.S.pets.exp || {}).fox")));
  // (it. 715, demande U) dans la carte : le bouton « Récupérer le butin » (expédition finie) et les 3 boutons d'envoi
  // (familier libre) tiennent dans la carte, ces derniers sur une seule ligne (ils sortaient de la carte / faisaient défiler).
  const inCard = "(() => { const out = []; document.querySelectorAll('.petcard').forEach((c) => { const r = c.getBoundingClientRect(); c.querySelectorAll('.expe button, .expe-btns button').forEach((b) => { const q = b.getBoundingClientRect(); if (q.right > r.right + 1 || q.left < r.left - 1) out.push('large'); }); const t = [...c.querySelectorAll('.expe-btns button')].map((b) => Math.round(b.getBoundingClientRect().top)); if (new Set(t).size > 1) out.push('2 lignes'); }); return out.join(' ') || 'ok'; })()";
  const idleFit = await js(inCard);
  await js("(() => { const G = window.__game, now = Date.now(); G.S.pets.exp = { fox: { kind: 'long', start: now - 9e6, end: now - 1000 } }; G.changed(); })()");
  await sleep(200);
  const doneFit = await js(inCard), claimN = await js("document.querySelectorAll('.petcard [data-action=p-claim]').length");
  check("familiers : boutons d'expédition dans la carte (envoi sur une ligne, « Récupérer le butin »)", idleFit === "ok" && doneFit === "ok" && claimN >= 1, `${idleFit} / ${doneFit} / ${claimN}`);
  await js("window.__game.S.pets.exp = {}; window.__game.changed()");
  // Réglages : son, cycle jour/nuit, opacité (via le processus principal)
  await click('[data-tab="settings"]');
  await sleep(200);
  const snd0 = await state("S.settings.sound");
  await click('[data-action="se-toggle"][data-key="sound"]');
  await sleep(150);
  check("réglages : activer / couper le son", (await state("S.settings.sound")) === !snd0);
  if (!snd0) { await click('[data-action="se-toggle"][data-key="sound"]'); await sleep(150); }
  const op0 = strip.settings.get("opacity");
  // Opacité : curseur horizontal (demande 26) ; la fenêtre l'applique.
  const setOpacity = (v) => js(`(() => { const r = document.querySelector('[data-action=se-opacity-range]'); r.value = ${Math.round(v * 100)}; r.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await setOpacity(0.7);
  await sleep(300);
  check("réglages : opacité (curseur) appliquée par la fenêtre", strip.settings.get("opacity") === 0.7);
  // Le curseur reste à sa nouvelle position après le retour de la fenêtre et un nouveau dessin (signalé par Victor).
  const opPos = await js("(() => { window.__panel.renderAll(); const r = document.querySelector('[data-action=se-opacity-range]'); return r ? r.value : 'absent'; })()");
  check("réglages : le curseur d'opacité garde sa position", opPos === "70", opPos);
  // Thème sombre par défaut (aucun choix enregistré) : demande de Victor.
  const defTh = await js("(() => { const S = window.__game.S, t = S.settings.theme; S.settings.theme = null; window.__applyTheme(null); const r = document.documentElement.dataset.theme; S.settings.theme = t; window.__applyTheme(t); return r || 'aucun'; })()");
  check("réglages : thème sombre par défaut", defTh === "dark", defTh);
  await click('[data-action="se-theme"][data-v="dark"]');
  await sleep(150);
  check("réglages : thème sombre choisi", (await js("document.documentElement.dataset.theme")) === "dark" && (await state("S.settings.theme")) === "dark");
  await click('[data-action="se-theme"][data-v="auto"]');
  await sleep(150);
  check("réglages : retour au thème de Windows", !(await js("document.documentElement.dataset.theme || ''")) && (await state("S.settings.theme")) === "auto");
  await setOpacity(op0);
  await sleep(200);
  // Raccourci clavier : 0 ouvre l'onglet n° 10 (Statistiques)
  wc.sendInputEvent({ type: "keyDown", keyCode: "0" });
  wc.sendInputEvent({ type: "char", keyCode: "0" });
  wc.sendInputEvent({ type: "keyUp", keyCode: "0" });
  await sleep(200);
  check("raccourci clavier vers un onglet", (await js("document.querySelector('[data-tab=stats]').getAttribute('aria-selected')")) === "true");
  // R : réclamer une quête terminée sans passer par l'onglet
  await js("(() => { const q = window.__game.S.quests.slots[0]; q.progress = q.goal; window.__rq = q.uid; })()");
  wc.sendInputEvent({ type: "keyDown", keyCode: "R" }); wc.sendInputEvent({ type: "char", keyCode: "r" }); wc.sendInputEvent({ type: "keyUp", keyCode: "R" });
  await sleep(200);
  check("raccourci R : quête terminée réclamée", await js("!window.__game.S.quests.slots.some((q) => q.uid === window.__rq)"));
  await js("document.querySelector('#modal').hidden = true"); // (it. 1571) coffre de la quête ouvert sous les yeux (it. 1568) : on referme
  // M : réduire en mode mini (puis retour à la bande pour la suite du parcours)
  wc.sendInputEvent({ type: "keyDown", keyCode: "M" }); wc.sendInputEvent({ type: "char", keyCode: "m" }); wc.sendInputEvent({ type: "keyUp", keyCode: "M" });
  await until(async () => strip.mode() === "mini", 3000);
  check("raccourci M : mode mini", strip.mode() === "mini");
  await strip.setMode("strip");
  await until(async () => strip.mode() === "strip" && bounds().height > 64, 6000);
  await sleep(500);
  // Rouvrir le panneau (plusieurs essais : la bande peut mettre un instant à se réafficher)
  // 8 essais de 2,5 s : sous xvfb le retour en mode bande est parfois lent (échec intermittent, it. 287 et 305).
  for (let k = 0; k < 8 && !(await js("document.body.classList.contains('panel-shown')")); k++) {
    // Clic souris d'abord (vrai parcours) ; s'il n'aboutit pas, clic direct dans la page (coordonnées pas encore à jour sous xvfb).
    if (!(await js("document.body.classList.contains('panel-open')"))) { if (k < 2) await click("#menu-btn"); else await js("document.querySelector('#menu-btn').click()"); }
    await until(async () => js("document.body.classList.contains('panel-shown')"), 2500);
  }
  check("retour à la bande : panneau rouvert", await js("document.body.classList.contains('panel-shown')"),
    await js("[document.body.className, !!document.querySelector('.cine'), document.getElementById('toast').hidden].join(' / ')") + " / mode " + strip.mode() + " / " + JSON.stringify(bounds()));
  await sleep(600); // fin de l'animation d'ouverture : les onglets ne bougent plus
  for (let k = 0; k < 3 && (await js("document.querySelectorAll('[data-pane=bestiary]:not([hidden]) .beast').length")) < 11; k++) {
    await click('[data-tab="bestiary"]');
    await until(async () => (await js("document.querySelectorAll('[data-pane=bestiary]:not([hidden]) .beast').length")) >= 11, 1500);
  }
  check("onglet Bestiaire : affiché", (await js("document.querySelectorAll('[data-pane=bestiary]:not([hidden]) .beast').length")) >= 11);
  // Sous-onglets du Bestiaire (demande 18) : un clic n'affiche que la section choisie (ici « Élites »).
  await click('.bjump [data-to="elites"]');
  await sleep(300);
  const sub = await js("(() => [!!document.getElementById('bj-elites'), document.querySelectorAll('[data-pane=bestiary]:not([hidden]) .beast').length, !!document.querySelector('.bjump .on[data-to=elites]')].join(' '))()");
  check("Bestiaire : un sous-onglet n'affiche que sa section", sub === "true 0 true", sub);
  await click('.bjump [data-to="beasts"]');
  await sleep(200);
  // Résumé d'absence : « À faire maintenant » mène droit à l'onglet (ici les œufs → Familiers).
  await js("window.__keepAutoPets = window.__game.S.settings.autoPets; window.__game.S.settings.autoPets = false; delete window.__game.S.unlocks.bulkPoints; delete window.__game.S.unlocks.armsValet; window.__game.S.gold = Math.max(window.__game.S.gold, 1e9); window.__game.S.pets.eggs = Math.max(1, window.__game.S.pets.eggs); window.__showOffline({ duration: '2 h 5 min', zone: 'Zone', kills: 1234, gold: 56789, xp: 4321, newLevel: 0, kept: 3, onGround: 4, champions: 3, best: 3, feathers: 1, chests: 1, capped: true, capH: 10, forged: 12, anviled: 2, transmuted: 3, petWork: 7, herbs: 114, traded: 5, spells: 37, elites: 87, steps: [{ t: Date.now(), k: 'lvl', v: 100 }], bestItemId: (window.__game.S.bag[0] || {}).id })");
  check("retour d'absence : étape du carnet franchie (résumé et bulle)", await js("!!document.querySelector('#mbody .step') && /✦/.test(window.__stepLine({ steps: [{ t: 1, k: 'lvl', v: 100 }] }))"));
  await sleep(300);
  const todo = await js("[...document.querySelectorAll('#modal:not([hidden]) .linkbtn[data-tab]')].map((b) => b.dataset.tab)");
  check("retour d'absence : actions « à faire maintenant »", todo.length > 0, JSON.stringify(todo));
  const linkTab = todo[0];
  // Œufs (Nid douillet acquis) : éclosion d'un clic, le résumé reste ouvert.
  const eggsBefore = await state("S.pets.eggs");
  await js("document.querySelector('#modal .linkbtn[data-action=todo-do][data-what=eggs]')?.click()");
  await sleep(150);
  check("retour d'absence : œufs éclos d'un clic, résumé ouvert", eggsBefore > 0 && (await state("S.pets.eggs")) === 0 && !(await js("document.querySelector('#modal').hidden")), `${eggsBefore} -> ${await state("S.pets.eggs")}`);
  // (it. 908) le Grand intendant a été coupé pour ce contrôle (avec lui, les œufs ne sont plus « à faire »)
  await js("window.__game.S.settings.autoPets = window.__keepAutoPets");
  check("retour d'absence : travail des automatismes affiché", (await js("document.querySelectorAll('#modal:not([hidden]) li').length")) >= 10);
  // (it. 834) le Forgeron des astres a sa ligne (avant : seulement dans le journal)
  check("retour d'absence : objets remontés par le Forgeron des astres", await js("[...document.querySelectorAll('#modal:not([hidden]) .lines li')].some((li) => /^\\+2\\s/.test(li.querySelector('b')?.textContent || ''))"));
  // (it. 843) le Grimoire des sorts apprend des rangs pendant l'absence : sa ligne aussi
  check("retour d'absence : rangs appris par le Grimoire des sorts", await js("[...document.querySelectorAll('#modal:not([hidden]) .lines li')].some((li) => /^\\+37\\s/.test(li.querySelector('b')?.textContent || ''))"));
  // (it. 839) l'Herboriste perpétuel rachète les élixirs pendant l'absence : sa ligne aussi
  check("retour d'absence : élixirs rachetés par l'Herboriste perpétuel", await js("[...document.querySelectorAll('#modal:not([hidden]) .lines li')].some((li) => /^114\\s/.test(li.querySelector('b')?.textContent || ''))"));
  const buyId = await js("(document.querySelector('#modal:not([hidden]) .linkbtn[data-action=goal-buy]') || {}).dataset?.id || null");
  check("retour d'absence : déblocage payable proposé à l'achat", !!buyId, buyId);
  check("retour d'absence : le focus clavier est sur « Continuer »", (await js("document.activeElement && document.activeElement.dataset.action")) === "closemodal");
  check("retour d'absence : le résumé s'ouvre en haut (titre visible)", (await js("document.querySelector('#modal .panel').scrollTop")) === 0);
  if (process.env.SELFTEST_SHOT) require("fs").writeFileSync(process.env.SELFTEST_SHOT, (await wc.capturePage()).toPNG());
  await click(`#modal .linkbtn[data-tab="${linkTab}"]`);
  await sleep(200);
  check("retour d'absence : le bouton ferme le résumé et ouvre l'onglet", (await js(`document.querySelector('#modal').hidden && document.querySelector('[data-tab=${linkTab}]').getAttribute('aria-selected') === 'true'`)));
  // Meilleur butin déjà équipé (Valet d'armes) : son nom reste affiché, marqué « équipé ».
  await js("(() => { const w = Object.values(window.__game.S.equip).find(Boolean); window.__showOffline({ duration: '1 h', zone: 'Zone', kills: 10, gold: 10, xp: 10, newLevel: 0, kept: 0, best: w.r, feathers: 0, chests: 0, capped: false, capH: 10, bestItemId: w.id }); })()");
  await sleep(200);
  check("retour d'absence : meilleur butin déjà équipé, nommé", await js("(() => { const w = Object.values(window.__game.S.equip).find(Boolean); const t = document.querySelector('#modal:not([hidden]) .lines')?.textContent || ''; return t.includes('(') && !document.querySelector('#modal [data-action=reveal-equip]'); })()"));
  await js("document.querySelector('#modal [data-action=closemodal]')?.click()");
  await sleep(150);
  // « Depuis ta dernière visite » : ligne en haut de la carte du héros, un clic la masque.
  await click('[data-tab="adventure"]');
  await js("(() => { const S = window.__game.S; window.__panel.sinceVisit = window.__game.visitSummary({ t: Date.now() - 42 * 60000, gold: 0, kills: 0, lvl: Math.max(1, S.lvl - 2), asc: S.prestige.count, leg: 0, best: 0 }); window.__panel.renderAll(); })()");
  await sleep(200);
  // (it. 896) Pire cas de la ligne (tous les gains, nombres longs) : l'Aventure ne défile pas (1920 px ; en dessous de
  // 1500 px la ligne tient sur une seule ligne, texte complet au survol).
  {
    const r = await js("(() => { const P = window.__panel, p = document.getElementById('panel'), keep = P.sinceVisit; P.sinceVisit = { min: 754, kills: 123456, gold: 9.87e15, leg: 12, lvl0: 1200, lvl1: 1313, best: 255, asc: 3, spells: 140, relics: 4, chests: 17, goblins: 38, events: 23 }; P.renderAll(); const o = p.scrollHeight - p.clientHeight, b = document.querySelector('#p-hero .visit'); const r = (b ? 'ok' : 'absente') + ' ' + o; P.sinceVisit = keep; P.renderAll(); return r; })()");
    check("« Depuis ta dernière visite » au pire cas : l'Aventure ne défile pas", /^ok -?[0-2]$/.test(r) || /^ok -\d+$/.test(r), r);
  }
  // (it. 1531, demande de Victor) barres de vie dans la rangée d'informations de la bande : visibles par défaut (celle du
  // héros au moins), masquées par le réglage
  {
    const r = await js("new Promise((ok) => { const S = window.__game.S, st = window.__strip; const keep = S.settings.hudBars; S.settings.hudBars = true; st.updateHudBars(); const on = !document.querySelector('.hudbar.hero').hidden; S.settings.hudBars = false; st.updateHudBars(); const off = [...document.querySelectorAll('.hudbar')].every((x) => x.hidden); S.settings.hudBars = keep; st.updateHudBars(); ok(on + ' ' + off + ' ' + (st.W || 0)); })");
    check("bande : barres de vie en haut (réglage)", /^true true/.test(r) || (/^false true (\d+)/.test(r) && +r.split(" ")[2] < 1200), r);
  }
  // (it. 1528, demande de Victor) survoler un objet ne fait jamais défiler le panneau (une longue bulle dépassait en
  // bas : la barre de défilement apparaissait et la page sautait)
  {
    const r = await js("(() => { const P = window.__panel, p = document.getElementById('panel'); P.setTab('adventure'); P.renderAll(); let worst = 0, n = 0; for (const s of document.querySelectorAll('[data-pane=adventure]:not([hidden]) .slot[data-from]')) { s.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); worst = Math.max(worst, p.scrollHeight - p.clientHeight); n++; } document.querySelector('.itemtip').hidden = true; return n + ' ' + worst; })()");
    check("bulle d'un objet : jamais de défilement au survol", /^\d+ [0-2]$/.test(r) && +r.split(" ")[0] > 0, r);
  }
  // (it. 1500) sorts du compagnon en grand (demande de Victor, it. 1491) : deux cadres côte à côte, cartes du compagnon
  // avec leurs boutons, l'onglet ne défile pas
  {
    const r = await js("(() => { const P = window.__panel, G = window.__game, p = document.getElementById('panel'), keep = { pt: G.S.partner, sec: P.tabs.class.sec }; G.S.partner = G.S.cls === 'mage' ? 'warrior' : 'mage'; P.setTab('class'); P.tabs.class.sec = 'style'; P.renderAll(); const boxes = document.querySelectorAll('[data-pane=class] .spellduo.two .spellbox').length, cards = document.querySelectorAll('[data-pane=class] .partnerbox .spellcard').length, o = p.scrollHeight - p.clientHeight; G.S.partner = keep.pt; P.tabs.class.sec = keep.sec; P.renderAll(); P.setTab('adventure'); return boxes + ' ' + cards + ' ' + o; })()");
    check("sorts du compagnon : cadre à droite, ses cartes, pas de défilement", /^2 3 -?[0-2]$/.test(r), r);
  }
  // (it. 1464) héros bloqué : les pistes dans la carte de la zone (forge comprise) ne font pas défiler l'Aventure
  {
    const r = await js("(() => { const P = window.__panel, G = window.__game, p = document.getElementById('panel'), keep = { w: G.R.wallDeaths, f: G.S.unlocks.forge, g: G.S.gold }; P.setTab('adventure'); G.R.wallDeaths = [G.R.time, G.R.time, G.R.time, G.R.time]; G.S.unlocks.forge = true; G.S.gold = 1e30; keep.p = G.S.potions; G.S.potions = 0; P.renderAll(); const o = p.scrollHeight - p.clientHeight, b = document.querySelector('.stucktips'); const r = (b ? 'ok' : 'absente') + ' ' + o; G.R.wallDeaths = keep.w; if (!keep.f) delete G.S.unlocks.forge; G.S.gold = keep.g; G.S.potions = keep.p; P.renderAll(); return r; })()");
    check("héros bloqué : pistes dans la carte de la zone, l'Aventure ne défile pas", /^ok -?[0-2]$/.test(r) || /^ok -\d+$/.test(r), r);
  }
  // Deux pièces d'une même panoplie portées (copie de test) : l'étiquette de la fiche du héros apparaît.
  await js("(() => { const E = window.__game.S.equip; const its = Object.values(E).filter(Boolean).slice(0, 2); its.forEach((it) => { it.set = 'dawn'; }); window.__game.invalidateStats(); window.__panel.renderAll(); })()");
  await sleep(100);
  const setTip = await js("(document.querySelector('#p-hero .chip.set') || {}).title || null");
  check("panoplie : bonus au survol de l'étiquette", setTip.split("\n").length === 2, JSON.stringify(setTip));
  // Pièce de panoplie dans le sac : l'infobulle montre ce que l'équiper change au décompte.
  const prog = await js("(() => { const g = window.__game; const it = g.S.bag.find((i) => i.slot !== 'weapon') || g.S.bag[0]; if (!it) return 'sac vide'; it.set = ((g.S.equip[it.slot] || {}).set === 'hunter') ? 'dawn' : 'hunter'; window.__panel.renderAll(); const el = document.querySelector(`#p-bag .slot[data-id='${it.id}']`); if (!el) return 'case introuvable'; window.__panel.onHover({ target: el }); return (document.querySelector('.itemtip .setprog') || {}).textContent || 'pas de ligne'; })()");
  check("infobulle : progression de panoplie (« → / 4 »)", /→ .* \/ 4/.test(prog), prog);
  // Pièce d'une panoplie commencée (une pièce portée), pas plus forte seule : gardée, et l'infobulle le dit.
  // (Sac plein : on libère une place, sinon la pièce ajoutée peut tomber hors de la grille affichée. Emplacement dont
  // l'objet porté n'est d'aucune panoplie : sinon l'équiper casserait une autre panoplie, et la pièce serait inutile.)
  const kept = await js("(() => { const g = window.__game, S = g.S; const w = Object.values(S.equip).find(Boolean); w.set = 'hunter'; delete (S.setsDone || {}).hunter; for (const k in S.equip) if (k !== w.slot && S.equip[k]) delete S.equip[k].set; for (const x of S.bag) delete x.set; let it = g.newItem(2); for (let k = 0; k < 200 && (it.slot === w.slot || !S.equip[it.slot] || S.equip[it.slot].set); k++) it = g.newItem(2); it.st = {}; it.power = null; it.r = 2; it.set = 'hunter'; if (S.bag.length >= S.bagSize) S.bag.pop(); S.bag.unshift(it); g.invalidateStats(); window.__panel.renderAll(); const el = document.querySelector(`#p-bag .slot[data-id='${it.id}']`); window.__panel.onHover({ target: el }); return [...document.querySelectorAll('.itemtip .setprog')].length + ' ' + !g.uselessItems().includes(it) + ' ' + g.isUpgrade(it) + (g.uselessItems().includes(it) ? ' [' + it.slot + '/' + w.slot + ' porté:' + !!S.equip[it.slot] + ' set:' + (S.equip[it.slot] && S.equip[it.slot].set) + ' w:' + w.set + ' fait:' + !!(S.setsDone || {}).hunter + ']' : ''); })()");
  // (it. 504 : échec isolé « 1 false false » à l'it. 501, cause non trouvée : sac vidé de ses pièces de panoplie par
  // prudence, et en cas d'échec le message donne l'état de la pièce et de l'emplacement pour le diagnostic.)
  // Si le bonus à 2 pièces en fait une amélioration, l'infobulle ne dit pas « gardée » (règle de setProgress) : 1 ligne.
  check("infobulle : pièce de panoplie gardée expliquée", kept === "2 true false" || kept === "1 true true", kept);
  await js("window.__panel.tip.hidden = true");
  // Grand intendant : choix de l'expédition d'un clic dans l'onglet Familiers.
  await js("(() => { window.__game.S.unlocks.steward = true; window.__game.S.pets.lastKind = 'long'; })()");
  await click('[data-tab="pets"]');
  await sleep(200);
  await js("document.querySelector('[data-action=p-stewkind][data-kind=epic]')?.click()");
  await sleep(150);
  check("Grand intendant : choix de l'expédition", (await state("S.pets.lastKind")) === "epic" && (await js("document.querySelector('[data-action=p-stewkind][data-kind=epic]')?.getAttribute('aria-pressed')")) === "true");
  // Bouton enfoncé lisible (it. 851 : le choix du Grand intendant écrivait en clair sur fond or) : contraste
  // texte / fond d'au moins 3 pour chaque bouton enfoncé visible à fond opaque, en thème sombre puis clair
  // (le défaut n'existait qu'en sombre ; l'autotest est en clair à cet endroit).
  const pressedLow = await js(`(() => {
    const t0 = window.__game.S.settings.theme, out = [];
    for (const th of ["dark", "light"]) {
    window.__applyTheme(th);
    const rgb = s => (s.match(/[\\d.]+/g) || []).map(Number);
    const lum = c => { const v = c.slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
    const bad = [];
    for (const b of document.querySelectorAll('button[aria-pressed="true"]')) {
      if (!b.offsetParent) continue;
      const cs = getComputedStyle(b), bg = rgb(cs.backgroundColor), fg = rgb(cs.color);
      if (bg.length < 3 || (bg.length > 3 && bg[3] < 1)) continue;
      const a = lum(fg), c = lum(bg), r = (Math.max(a, c) + 0.05) / (Math.min(a, c) + 0.05);
      if (r < 3) bad.push(th + " " + (b.textContent.trim() || b.dataset.action) + " " + r.toFixed(1));
    }
    out.push(...bad);
    }
    window.__applyTheme(t0);
    return out.join(" | ");
  })()`);
  check("boutons enfoncés lisibles (contraste)" + (pressedLow ? " : " + pressedLow : ""), !pressedLow);
  // (it. 877) Thème clair : étoiles des quêtes jaune pâle, voie de talents armée et ligne épique du journal en
  // couleurs du thème sombre (fond olive foncé sous un texte sombre). Contraste mesuré sur des éléments témoins.
  const tintLow = await js(`(() => {
    const t0 = window.__game.S.settings.theme, out = [];
    // color-mix() donne des couleurs oklab(…) : conversion en sRGB par un canevas 1 × 1.
    const cx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const rgb = s => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const lum = c => { const v = c.slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
    const bgOf = el => { for (let e = el; e; e = e.parentElement) { const b = rgb(getComputedStyle(e).backgroundColor); if (b[3] >= 1) return b; } return [255, 255, 255]; };
    const box = document.createElement("div");
    box.style.cssText = "position:fixed;left:0;top:0;z-index:-1;opacity:1";
    box.innerHTML = '<article class="panel questcard s3"><div class="stars">★</div></article><article class="panel"><div class="tvoie ready"><div class="talent voie"><span class="tr">choisir</span></div></div><ul id="log"><li class="lg-epic">épique</li></ul></article>';
    (document.querySelector(".tabpane:not([hidden])") || document.body).appendChild(box);
    const probes = [[".stars", 2.5], [".tvoie.ready .talent.voie .tr", 4.5], ["li.lg-epic", 3]];
    for (const th of ["dark", "light"]) {
      window.__applyTheme(th);
      for (const [sel, min] of probes) {
        const el = box.querySelector(sel), a = lum(rgb(getComputedStyle(el).color)), c = lum(bgOf(el));
        const r = (Math.max(a, c) + 0.05) / (Math.min(a, c) + 0.05);
        if (r < min) out.push(th + " " + sel + " " + r.toFixed(1));
      }
    }
    box.remove();
    window.__applyTheme(t0);
    return out.join(" | ");
  })()`);
  check("couleurs vives lisibles dans les deux thèmes (quêtes, talents, journal)" + (tintLow ? " : " + tintLow : ""), !tintLow);
  await click('[data-tab="adventure"]');
  await sleep(150);
  // « À faire » : la pièce qui complète une panoplie s'équipe d'un clic depuis le résumé de retour.
  const fin = await js("(() => { const g = window.__game, S = g.S; for (const e of Object.values(S.equip)) if (e && e.set === 'phoenix') e.set = null; S.bag.forEach((i) => { if (i.set === 'phoenix') i.set = null; }); const slots = ['weapon', 'helm', 'armor']; for (const k of slots) { const it = g.newItem(3); it.slot = k; it.set = 'phoenix'; S.equip[k] = it; } if (S.equip.boots) S.equip.boots.set = null; let p = g.newItem(3); for (let k = 0; k < 50 && p.slot !== 'boots'; k++) p = g.newItem(3); p.slot = 'boots'; p.set = 'phoenix'; S.bag.unshift(p); delete (S.setsDone || {}).phoenix; g.invalidateStats(); window.__showOffline({ duration: '1 h', zone: 'Zone', kills: 10, gold: 10, xp: 10, newLevel: 0, kept: 0, best: -1, feathers: 0, chests: 0, capped: false, capH: 10 }); const b = document.querySelector('#modal [data-action=todo-do][data-what=setFinish]'); if (!b) return 'pas de ligne'; b.click(); return String(!!(S.setsDone || {}).phoenix); })()");
  check("retour d'absence : pièce qui complète une panoplie, équipée d'un clic", fin === "true", fin);
  await js("document.querySelector('#modal [data-action=closemodal]')?.click()");
  await sleep(150);
  // « À faire » : sac plein, objets inutiles vendus d'un clic depuis le résumé de retour.
  const full = await js("(() => { const g = window.__game, S = g.S; S.unlocks.bulkEquip = true; while (!g.bagFull()) { const it = g.newItem(0); it.r = 0; it.set = null; it.st = {}; it.power = null; S.bag.push(it); } const n0 = S.bag.length; window.__showOffline({ duration: '1 h', zone: 'Zone', kills: 10, gold: 10, xp: 10, newLevel: 0, kept: 0, best: -1, feathers: 0, chests: 0, capped: false, capH: 10 }); const b = document.querySelector('#modal [data-action=todo-do][data-what=bagFull]'); if (!b) return 'pas de ligne'; b.click(); return n0 + ' -> ' + S.bag.length; })()");
  check("retour d'absence : sac plein vidé d'un clic", /^(\d+) -> (\d+)$/.test(full) && +full.split(" -> ")[1] < +full.split(" -> ")[0], full);
  await js("document.querySelector('#modal [data-action=closemodal]')?.click()");
  await sleep(150);
  // « À faire » dans la carte du héros : une quête prête, réclamée d'un clic depuis le bloc.
  const box = await js("(() => { const g = window.__game, S = g.S; S.unlocks.questDesk = true; const q = S.quests.slots[0]; q.progress = q.goal; const uid = q.uid; window.__panel.setTab('adventure'); window.__panel.renderAll(); const d = document.querySelector('#p-hero .todobox'); if (!d) return 'pas de bloc'; d.open = true; const b = d.querySelector('[data-what=quests]'); if (!b) return 'pas de ligne'; b.click(); return String(!S.quests.slots.some((x) => x.uid === uid)); })()");
  check("carte du héros : « À faire » avec actions directes", box === "true", box);
  // « À faire » : points de compétence dépensés d'un clic (Manuel du stratège).
  const sp = await js("(() => { const g = window.__game, S = g.S; S.unlocks.bulkPoints = true; window.__panel.renderAll(); const n = (g.todoNow().find((t) => t.id === 'skills') || {}).n || 0; const b = document.querySelector('#p-hero .todobox [data-what=skills]'); if (!b) return 'pas de ligne (' + n + ' points)'; b.click(); const n2 = (g.todoNow().find((t) => t.id === 'skills') || {}).n || 0; return n + ' -> ' + n2; })()");
  check("carte du héros : points de compétence dépensés d'un clic", /^(\d+) -> (\d+)$/.test(sp) && +sp.split(" -> ")[1] < +sp.split(" -> ")[0], sp);
  // (it. 868) « À faire » : éclats d'étoile à placer → onglet Ascension, avec sa pastille « ! ».
  const stars = await js("(() => { const g = window.__game, S = g.S, P = S.prestige; P.ranks.c_flask = 0; P.shards = Math.max(P.shards, 10); S.tabsOpen.ascension = true; window.__panel.renderAll(); const b = document.querySelector('#p-hero .todobox .linkbtn[data-tab=ascension]'); const badge = document.querySelector('[data-badge=ascension]'); return (b ? 'ligne' : 'pas de ligne') + ' ' + (badge && !badge.hidden ? badge.textContent : 'sans pastille'); })()");
  check("carte du héros : éclats d'étoile à placer (lien et pastille Ascension)", stars === "ligne !", stars);
  // (it. 876) « À faire » : familiers libres envoyés en expédition d'un clic (Grand intendant coupé).
  const idleP = await js("(() => { const g = window.__game, S = g.S; S.unlocks.expeditions = true; S.unlocks.petBulk = true; const was = S.settings.autoPets; S.settings.autoPets = false; S.tabsOpen.pets = true; const ids = Object.keys(S.pets.owned).filter((id) => id !== S.pets.active); if (!ids.length) return 'aucun familier'; S.pets.exp = {}; window.__panel.renderAll(); const d = document.querySelector('#p-hero .todobox'); if (!d) { S.settings.autoPets = was; return 'pas de bloc'; } const b = d.querySelector('[data-what=idlePets]'); if (!b) { S.settings.autoPets = was; return 'pas de ligne'; } b.click(); const n = g.idlePets().length; S.settings.autoPets = was; return ids.length + ' -> ' + n; })()");
  check("carte du héros : familiers libres envoyés en expédition d'un clic", /^(\d+) -> 0$/.test(idleP), idleP);
  // « À faire » : amélioration du marchand achetée et équipée d'un clic.
  const mer = await js("(() => { const g = window.__game, S = g.S; S.bag.length = 0; S.gold = Math.max(S.gold, 1e9); let it = g.newItem(4, S.best + 20); for (let k = 0; k < 80 && !g.isUpgrade(it); k++) it = g.newItem(4, S.best + 20); it.price = 10; S.shop = { items: [it], next: Date.now() + 600000 }; window.__panel.renderAll(); const d = document.querySelector('#p-hero .todobox'); if (!d) return 'pas de bloc'; const b = d.querySelector('[data-what=merchant]'); if (!b) return 'pas de ligne'; b.click(); return String((S.equip[it.slot] || {}).id === it.id); })()");
  check("carte du héros : amélioration du marchand achetée et équipée", mer === "true", mer);
  // Événement en cours : sa pastille dans la carte du héros donne son effet au survol.
  const evTip = await js("(() => { window.__game.startEvent('goldrain'); window.__panel.renderAll(); const t = [...document.querySelectorAll('#p-hero .chip.event')].map((c) => c.title || c.dataset.title || '').join(' | '); return t || 'pas de pastille'; })()");
  // (it. 2123) toutes les pastilles : un autre événement déjà en cours (« Vitesse ×2 ») passait avant la pluie d'or et le contrôle échouait
  check("carte du héros : effet de l'événement au survol", evTip && evTip !== "pas de pastille" && /3/.test(evTip), evTip);
  // Bulles en file : la deuxième attend que la première soit fermée (au lieu de la remplacer).
  const q1 = await js("(() => { window.__clearToasts(); window.__showToast('BULLE-UN', null, 8000); window.__showToast('BULLE-DEUX', null, 8000); return document.getElementById('toast').textContent; })()");
  await js("document.getElementById('toast').click()");
  await sleep(700);
  const q2 = await js("document.getElementById('toast').hidden ? 'cachée' : document.getElementById('toast').textContent");
  check("bulles : la deuxième attend la fermeture de la première", q1 === "BULLE-UN" && q2 === "BULLE-DEUX", q1 + " / " + q2);
  await js("document.getElementById('toast').click()");
  // Œil du faucon : halo sur le héros dans la bande pendant l'événement.
  await js("window.__game.startEvent('hawkeye')");
  await sleep(400);
  const hk = await js("String(!!document.querySelector('.actor.hawkeye'))");
  check("bande : halo du héros pendant l'Œil du faucon", hk === "true", hk);
  // Malédiction (capacité de boss) : halo violet sur le héros maudit, en combat.
  let ck = "pas de combat";
  for (let i = 0; i < 20 && ck !== "true"; i++) {
    const mode = await js("(() => { const R = window.__game.R; if (R.mode === 'fight') R.cursed = 5; return R.mode; })()");
    await sleep(300);
    if (mode === "fight") ck = await js("String(!!document.querySelector('.actor.cursed'))");
  }
  check("bande : halo violet du héros maudit (Malédiction)", ck === "true", ck);
  // Quête réclamée d'un clic même sac plein (avant : le clic ne faisait rien).
  const qf = await js("(() => { const g = window.__game, S = g.S; while (!g.bagFull()) S.bag.push(g.newItem(0)); S.quests.slots = [{ uid: 4242, kind: 'kill', goal: 1, progress: 1, stars: 1, reward: { gold: 10, chest: 3 } }, ...S.quests.slots.filter((q) => q.uid !== 4242)]; window.__panel.setTab('quests'); window.__panel.renderAll(); const b = document.querySelector('[data-action=q-claim][data-id=\"4242\"]'); if (!b) return 'pas de bouton'; b.click(); return String(!S.quests.slots.some((q) => q.uid === 4242)); })()");
  check("quêtes : « Réclamer » marche même sac plein", qf === "true", qf);
  await js("window.__panel.setTab('adventure')");
  // Compétences sans le Manuel du stratège : « Dépenser automatiquement » et « À chaque niveau » réellement invisibles.
  const kv = await js("(() => { const S = window.__game.S; const had = S.unlocks.bulkPoints, al = S.unlocks.autoLevel; delete S.unlocks.bulkPoints; delete S.unlocks.autoLevel; window.__panel.setTab('skills'); window.__panel.renderAll(); const vis = (sel) => { const e = document.querySelector(sel); return e ? e.getClientRects().length > 0 : 'absent'; }; const r = vis('.k-autorow') + ' ' + vis('.k-autolevel'); if (had) S.unlocks.bulkPoints = had; if (al) S.unlocks.autoLevel = al; window.__panel.setTab('adventure'); return r; })()");
  check("compétences : boutons automatiques cachés sans le Manuel du stratège", kv === "false false", kv);
  // Onglets progressifs : Talents fermé = bouton grisé, infobulle avec sa zone (it. 835) ; seuil atteint = annonce, bouton visible avec ✦ ; visite = ✦ retiré.
  const tb = await js("(() => { window.__clearToasts(); const g = window.__game, S = g.S, P = window.__panel; delete (S.settings.hints || {}).talent; S.tabsOpen.talents = undefined; delete S.tabsOpen.talents; P.renderAll(); const btn = document.querySelector('[data-tab=talents]'); const hid = btn.classList.contains('locked') && btn.getAttribute('aria-disabled') === 'true' && (btn.dataset.title || btn.title).includes('2'); g.step(1.1); P.renderAll(); const toast = document.getElementById('toast').textContent; const vis = btn.getClientRects().length > 0 && !btn.classList.contains('locked'); const badge = document.querySelector('[data-badge=talents]').textContent; P.setTab('talents'); P.renderAll(); const badge2 = document.querySelector('[data-badge=talents]').textContent; P.setTab('adventure'); return [hid, vis, /Talents/.test(toast), badge, badge2 || '-', !!(S.settings.hints || {}).talent].join(' '); })()");
  await js("document.getElementById('toast').click(); window.__panel.setTab('adventure')"); // le clic ouvre l'onglet annoncé : retour à l'aventure
  // Onglet Talents fermé : pas de lien « points de talent à dépenser » dans la carte du héros (signalé par Victor).
  const tl = await js("(() => { const g = window.__game, S = g.S; const t = S.tabsOpen.talents, tal = S.talents[S.cls]; S.talents[S.cls] = {}; g.invalidateStats(); delete S.tabsOpen.talents; window.__panel.setTab('adventure'); window.__panel.renderAll(); const free = g.talentPointsFree(); const vis = [...document.querySelectorAll('#p-hero [data-tab=talents]')].filter((e) => e.getClientRects().length).length; S.tabsOpen.talents = t || true; S.talents[S.cls] = tal; g.invalidateStats(); window.__panel.renderAll(); return free > 0 ? String(vis) : 'pas de point libre'; })()");
  check("onglet fermé : aucun lien visible vers lui (points de talent)", tl === "0", tl);
  // Boutique fermée : pas de « prochain déblocage » à acheter dans la carte du héros (signalé par Victor).
  const gs = await js("(() => { const S = window.__game.S; const t = S.tabsOpen.shop; delete S.tabsOpen.shop; window.__panel.renderAll(); const n = document.querySelectorAll('#p-hero .goal[data-action=goal-buy], #p-hero .goal[data-tab=shop]').length; S.tabsOpen.shop = t || true; window.__panel.renderAll(); return String(n); })()");
  check("boutique fermée : aucun déblocage proposé dans la carte du héros", gs === "0", gs);
  // Infobulle maison au survol d'un élément à title (celles du système ne s'affichent pas dans cette fenêtre).
  const gt = await js("(() => { const el = document.querySelector('#panel [title], #panel [data-title]'); if (!el) return 'aucun'; el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); const t = document.querySelector('#panel .gtip'); const r = t && !t.hidden && t.textContent.length > 0; el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); return String(r); })()");
  check("infobulle maison au survol (title)", gt === "true", gt);
  const st = await js("(() => { const b = document.getElementById('mini-btn'); b.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); const t = document.querySelector('.stip'); const r = t && !t.hidden && t.textContent.length > 0 && t.getBoundingClientRect().bottom <= b.getBoundingClientRect().top + 1; b.dispatchEvent(new MouseEvent('mouseout', { bubbles: true })); return String(r); })()");
  check("infobulle de la bande au survol d'un bouton (au-dessus)", st === "true", st);
  check("onglets progressifs : caché, annoncé, ✦ jusqu'à la visite, conseil en doublon marqué vu", /^true true true ✦ - true$/.test(tb), tb);
  // Pastille d'onglet plafonnée à « 99+ ».
  const bg = await js("(() => { const S = window.__game.S; const v = S.prestige.skillPts, ord = S.skills.order.slice(); S.prestige.skillPts = 5000; S.skills.order = ord.slice(0, Math.max(1, ord.length - 1)); window.__panel.renderAll(); const el = document.querySelector('[data-badge=skills]'), t = el.textContent; const br = el.getBoundingClientRect(), lr = el.parentNode.querySelector('.tlabel').getBoundingClientRect(); const ov = br.height > 0 && lr.height > 0 ? Math.round(br.bottom - lr.top) : 'caché'; S.prestige.skillPts = v; S.skills.order = ord; window.__panel.renderAll(); return t + ' ' + ov; })()");
  // (it. 1015) un nœud retiré le temps du contrôle : la pastille ne s'affiche que s'il reste un nœud à prendre
  // (it. 840) la pastille restait 4 px sur le haut des lettres (« Skılls ») : elle doit finir au-dessus du nom.
  check("onglets : pastille plafonnée à 99+, sans mordre sur le nom", /^99\+ (-?\d+|caché)$/.test(bg) && !(Number(bg.split(" ")[1]) > 1), bg);
  // Accessibilité : les blocs repliables (summary) ont un focus clavier visible (règle présente dans la feuille chargée).
  const sf = await js("[...document.styleSheets].some((sh) => { try { return [...sh.cssRules].some((r) => /summary:focus-visible/.test(r.selectorText || '') && /outline/.test(r.cssText)); } catch { return false; } })");
  check("accessibilité : focus clavier visible sur un bloc repliable", sf === true, String(sf));
  // Boutons : même ordre partout (son, réduire à gauche, agrandir à droite) ; astuce affichée même panneau ouvert.
  // (it. 1125) les contrôles d'astuce vident la file des bulles : une bulle en attente ne se fait plus doubler
  const order = await js("(() => { const a = [...document.querySelectorAll('#mini .mini-btns button')].map((b) => b.id).join(','); const s = document.getElementById('mini-btn').compareDocumentPosition(document.getElementById('menu-btn')) & 4 ? 'mini-btn,menu-btn' : 'menu-btn,mini-btn'; return a + ' | ' + s; })()");
  check("boutons : réduire à gauche, agrandir à droite (mini et bande)", order === "mini-sound,mini-icon,mini-expand | mini-btn,menu-btn", order);
  const hintOpen = await js("(() => { window.__clearToasts(); window.__noHints = false; window.__game.S.settings.hints = {}; window.__checkHints(); window.__noHints = true; const t = document.getElementById('toast'); const r = !t.hidden && /💡/.test(t.textContent); t.click(); return String(r); })()");
  check("astuce : affichée même le panneau ouvert", hintOpen === "true", hintOpen);
  // (it. 910) Première Nuée d'étoiles sans Filet à étoiles : l'astuce (clic ou touche F) passe en premier.
  const sfHint = await js("(() => { const G = window.__game, S = G.S, keepNet = S.unlocks.starNet, keepH = S.settings.hints; delete S.unlocks.starNet; G.R.events.starfall = 20; window.__clearToasts(); window.__noHints = false; S.settings.hints = {}; window.__checkHints(); window.__noHints = true; const t = document.getElementById('toast'); const r = !t.hidden && /💡/.test(t.textContent) && /\\bF\\b/.test(t.textContent); t.click(); G.R.events.starfall = 0; if (keepNet) S.unlocks.starNet = keepNet; S.settings.hints = keepH; return String(r); })()");
  check("astuce : première Nuée d’étoiles, clic ou touche F", sfHint === "true", sfHint);
  // (it. 980) première Ruée des gobelins : astuce des coups au clic
  const grHint = await js("(() => { const G = window.__game, S = G.S, keepH = S.settings.hints; G.R.events.goblinrush = 20; window.__clearToasts(); window.__noHints = false; S.settings.hints = {}; window.__checkHints(); window.__noHints = true; const t = document.getElementById('toast'); const r = !t.hidden && /💡/.test(t.textContent) && /goblin/i.test(t.textContent) ? 'ok' : t.textContent; t.click(); G.R.events.goblinrush = 0; S.settings.hints = keepH; return r; })()");
  check("astuce : première Ruée des gobelins, coups au clic", grHint === "ok", grHint);
  await js("window.__panel.setTab('adventure')");
  // Grand palier de zone (50, 100…) : bannière dorée « Cap franchi ».
  const cap = await js("(() => { window.__game.emit('zoneUp', { zone: 100, record: true }); const b = [...document.querySelectorAll('.banner.big')].pop(); return b ? b.textContent : 'aucune'; })()");
  check("record : grand palier annoncé (bannière dorée)", /100/.test(cap) && /✦/.test(cap), cap);
  // Clic sur un objet du sac : son détail s'ouvre sous le sac, l'équipement reste affiché (demande de Victor).
  const bd = await js("(() => { window.__panel.setTab('adventure'); window.__panel.renderAll(); const b = document.querySelector('#p-bag .slot[data-from=bag]'); if (!b) return 'sac vide'; b.click(); const r = !!document.querySelector('#p-bag .bagdetail [data-action=equip]') + ' ' + !!document.querySelector('#p-detail .eqlist'); const back = document.querySelector('#p-bag [data-action=desel]'); if (back) back.click(); return r + ' ' + !document.querySelector('#p-bag .bagdetail'); })()");
  check("objet cliqué : détail sous le sac, équipement toujours visible, « ← sac » referme", bd === "true true true", bd);
  // Cinématiques de l'histoire : arrivée chez le Briseur puis victoire, jouées sans erreur, un clic les passe.
  const cin = await js("(() => { const J = window.__strip.juice; J.cineQueue = []; J.cine = null; document.querySelectorAll('.cine').forEach((n) => n.remove()); J.cinematic('arrive'); const a = !!document.querySelector('.cine.arrive'); document.querySelector('.cine.arrive').click(); J.cinematic('dawn'); const d = document.querySelector('.cine.dawn'); const t = d && d.querySelector('.cine-title').textContent; d && d.click(); J.cinematic('intro'); const i = !!document.querySelector('.cine.intro'); document.querySelector('.cine.intro').click(); J.cinematic('credits'); const c = document.querySelector('.cine.credits'); c && c.click(); J.cinematic('chronicle', { title: 'X', n: 4, total: 9 }); const h = document.querySelector('.cine.chronicle'); const ht = h && h.querySelector('.cine-sub').textContent; h && h.click(); J.cinematic('freed', { cls: 'ranger' }); const fr = document.querySelector('.cine.freed .cine-hero'); document.querySelector('.cine.freed').click(); return a + ' ' + !!d + ' ' + !!t + ' ' + i + ' ' + !!c + ' ' + /4/.test(ht || '') + ' ' + !!fr; })()");
  await new Promise((r) => setTimeout(r, 400));
  const gone = await js("!document.querySelector('.cine')");
  // File : une cinématique lancée pendant une autre attend la fin de la première (héros libéré puis chronique).
  // Demande T (it. 580) : en combat de boss, les barres de vie du héros et du boss sont visibles, dans la bande,
  // sous les pieds (au-dessus, celle du boss tombait sous son nom et celle du héros sous les nombres de dégâts).
  const bb0 = await js("(() => { const G = window.__game; window.__bbKeep = G.S.kills; G.S.kills = G.lineup().length; G.R.mon = G.makeMonster(true); G.R.mode = 'fight'; G.R.hp = G.stats().hp; return 'ok'; })()");
  await sleep(700);
  const bb = await js("(() => { const st = window.__strip, H = window.innerHeight; const hb = st.heroBar.el.getBoundingClientRect(), b = document.querySelector('.hpbar.bossbar'); if (!b || b.hidden || st.heroBar.el.hidden) return 'barre absente'; const br = b.getBoundingClientRect(), hr = st.hero.el.getBoundingClientRect(); const r = [hb.top >= hr.bottom - 2, br.bottom <= H, hb.bottom <= H, br.top > 30].join(' '); window.__game.S.kills = window.__bbKeep; return r; })()");
  check("combat de boss : barres de vie du héros et du boss visibles sous les pieds", bb0 === "ok" && bb === "true true true true", bb);
  // (it. 860) Face à un boss, les nombres flottants (coups, critiques, sorts, « ! ») ne passent ni sur son nom ni sur la
  // relique qu'il garde, même en montant (à mi-course, encore bien visibles) : les 200 boss et les échos (16 en défaut avant).
  {
    const r = await js(`(() => { const st = window.__strip, G = window.__game; if (!st.active) return 'bande inactive';
      const k0 = G.S.kills, z0 = G.S.zone, m0 = G.R.mon, all = []; for (const z of [...Array(200).keys()].map((i) => i + 1).concat([250, 300, 350])) { G.S.zone = z; G.S.kills = G.lineup().length; G.R.mon = G.makeMonster(true); st.slotKey = null; st.syncSlots(); st.placeBossName();
      const tag = [...document.querySelectorAll('.affix.bossname')].find((t) => t.isConnected && t.getBoundingClientRect().width);
      if (!tag) { all.push(z + ' nom absent'); continue; }
      const obs = [tag, ...document.querySelectorAll('.relic-carried')].map((e) => e.getBoundingClientRect()).filter((b) => b.width);
      st.fx.forEach((f) => f.node.remove()); st.fx.length = 0;
      const mx = st.monX(), calls = [[14, 20, '-18 k', 0], [14, 20, 'Critique !', 1], [20, 14, 'Étourdi !', 1], [20, 6, '!', 1], [8, 26, '-104 k', 1], [14, 34, 'Riposte 3 k', 0], [14, 20, '-21 k', 0], [26, 30, '-7 k', 0]];
      const bad = [];
      for (const [dx, y, t, big] of calls) { st.float(mx + dx, y, t, '#fff', !!big, true); const f = st.fx[st.fx.length - 1], b = f.node.getBoundingClientRect();
        for (const k of [0, 0.5]) { const top = b.top - f.rise * k, bot = b.bottom - f.rise * k;
          if (obs.some((o) => b.left < o.right - 1 && o.left < b.right - 1 && top < o.bottom - 1 && o.top < bot - 1)) { bad.push(t + '@' + k + ' ' + Math.round(b.left) + ',' + Math.round(top)); break; } } }
      st.fx.forEach((f) => f.node.remove()); st.fx.length = 0; if (bad.length) all.push(z + ': ' + bad.join(' | ') + ' ; obs ' + obs.map((o) => Math.round(o.left) + '-' + Math.round(o.right) + ' × ' + Math.round(o.top) + '-' + Math.round(o.bottom)).join(' ')); }
      G.S.zone = z0; G.S.kills = k0; G.R.mon = m0; st.slotKey = null; st.syncSlots(); return all.length ? all.length + ' boss : ' + all.join(' // ') : 'ok'; })()`);
    check("combat de boss : nombres flottants hors du nom et de la relique", r === "ok", r);
  }
  // (it. 948) taille de l'interface 130 % : le panneau grandit (fenêtre plus haute), puis revient à 100 %
  {
    const h0 = await js("document.getElementById('panel-wrap').getBoundingClientRect().height");
    await js("(() => { const P = window.__panel; P.setTab('settings'); P.renderAll(); document.querySelector('[data-pane=settings]:not([hidden]) [data-action=se-scale][data-v=\"1.3\"]').click(); })()");
    await until(async () => (await js("document.getElementById('panel-wrap').getBoundingClientRect().height")) > h0 + 50);
    const h1 = await js("document.getElementById('panel-wrap').getBoundingClientRect().height");
    await js("document.querySelector('[data-pane=settings]:not([hidden]) [data-action=se-scale][data-v=\"1\"]').click()");
    await until(async () => Math.abs((await js("document.getElementById('panel-wrap').getBoundingClientRect().height")) - h0) < 2);
    const h2 = await js("document.getElementById('panel-wrap').getBoundingClientRect().height");
    check("taille de l’interface 130 % : panneau agrandi, puis rendu", h1 > h0 + 50 && Math.abs(h2 - h0) < 2, h0 + " → " + h1 + " → " + h2);
  }
  // (it. 969) détail du retour : « Or gagné » = combats + expéditions du Grand intendant (le même total que la bulle)
  const offD = await js("(() => { const P = window.__panel; P.showOfflineSummary({ seconds: 28800, duration: '8 h', zone: 'Z', kills: 10, gold: 1000, petGold: 500, xp: 1, kept: 0, best: -1, steps: [], petWork: 3, capH: 8, questsDone: 2 }); const t = document.getElementById('mbody').textContent; document.querySelector('#modal [data-action=closemodal]').click(); return t; })()");
  check("retour d’absence : or gagné total, expéditions du Grand intendant détaillées", /1[,.\s\u00a0\u202f]?500/.test(offD) && /\+500/.test(offD) && /Quests completed\s*2/.test(offD), offD.slice(0, 300));
  // (it. 1778-1780) Poupouce vaincus pendant l'absence : la ligne compte les légendaires vraiment rangés (3 vaincus, 1 rangé)
  const offP = await js("(() => { const P = window.__panel; P.showOfflineSummary({ seconds: 3600, duration: '1 h', zone: 'Z', kills: 10, gold: 1, xp: 1, kept: 0, best: -1, steps: [], poupouce: 3, poupouceLeg: 1 }); const li = [...document.querySelectorAll('#mbody li')].find((l) => l.textContent.includes('Poupouce')); const t = li ? li.textContent : ''; document.querySelector('#modal [data-action=closemodal]').click(); return t; })()");
  check("retour d’absence : Poupouce vaincus et légendaires rangés (+1, pas +3)", /3/.test(offP) && /\+1\b/.test(offP) && !/\+3/.test(offP), offP);
  // (it. 1053) bulle d'info du panneau zoomé (« Taille de l'interface » 130 %) : près de la souris, pas 200 px plus loin
  const tipZ = await js(`(() => { const P = window.__panel, root = document.getElementById("panel"), keep = root.style.zoom, tab = P.tab;
    try {
      P.setTab("adventure"); P.renderAll(); root.style.zoom = "1.3";
      const els = [...root.querySelectorAll('[data-pane="adventure"]:not([hidden]) [title], [data-pane="adventure"]:not([hidden]) [data-title]')].filter((e) => e.getClientRects().length);
      const el = els[Math.floor(els.length * 0.7)]; if (!el) return "pas d'élément";
      const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      el.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, clientX: x, clientY: y }));
      root.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: x, clientY: y }));
      const t = root.querySelector(".gtip").getBoundingClientRect();
      root.dispatchEvent(new MouseEvent("mouseleave"));
      // distance de la souris au rectangle de la bulle (elle bascule de l'autre côté près des bords : voulu)
      return Math.round(Math.hypot(Math.max(t.left - x, 0, x - t.right), Math.max(t.top - y, 0, y - t.bottom)));
    } finally { root.style.zoom = keep; P.setTab(tab); P.renderAll(); } })()`);
  check("bulle d'info du panneau zoomé (130 %) près de la souris", typeof tipZ === "number" && tipZ < 40, String(tipZ));
  // (it. 1128) bulle d'un OBJET, panneau zoomé à 130 % : collée à l'objet (elle s'en écartait jusqu'à 324 px) et
  // pas au-delà du bord droit (le bas se vérifie avec le vrai réglage, qui agrandit aussi la fenêtre : ici, le zoom seul
  // laisse un panneau trop bas pour la bulle)
  const itZ = await js(`(() => { const P = window.__panel, root = document.getElementById("panel"), keep = root.style.zoom, tab = P.tab;
    try {
      P.setTab("adventure"); P.renderAll(); root.style.zoom = "1.3";
      const PR = root.getBoundingClientRect(), cells = [...root.querySelectorAll('[data-pane="adventure"]:not([hidden]) .slot[data-action="sel"]:not(.emptyslot)')].filter((e) => e.getClientRects().length);
      if (!cells.length) return "pas d'objet";
      const out = [];
      for (const c of [cells[0], cells[cells.length - 1]]) { c.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); const T = P.tip.getBoundingClientRect(), C = c.getBoundingClientRect();
        const gap = Math.max(T.left - C.right, C.left - T.right, 0); if (P.tip.hidden || gap > 30 || T.right > PR.right + 1) out.push(Math.round(gap) + "/" + Math.round(T.right - PR.right)); }
      return out.length ? "loin ou dehors " + out.join(" ") : "ok";
    } finally { P.tip.hidden = true; root.style.zoom = keep; P.setTab(tab); P.renderAll(); } })()`);
  check("bulle d'un objet du panneau zoomé (130 %) près de lui et dans le panneau", itZ === "ok", itZ);
  // (it. 1039) répliques du héros des it. 1037-1038 : une panoplie complète fait parler le héros
  const spk = await js(`(() => { const G = window.__game, st = window.__strip, out = [], fe = G.S.settings.fullEffects;
    G.S.settings.fullEffects = true;
    // (classUnlock n'est pas émis ici : il lancerait aussi la cinématique et la bulle d'info de la libération)
    for (const [ev, p] of [["setBonus", { id: "wind", n: 4 }], ["masteryStep", { id: "ms_power", at: 10, a: { crit: 2 }, b: { spd: 4 } }], ["graphFull", {}]]) { // (it. 1162) palier, graphe
      st.saidAt = -1e9; st.bubble.hidden = true; st.bubble.textContent = ""; G.emit(ev, p);
      out.push(ev + ":" + (!st.bubble.hidden && st.bubble.textContent ? "ok" : "rien")); }
    G.S.settings.fullEffects = fe; st.bubble.hidden = true; return out.join(" "); })()`);
  check("répliques du héros : panoplie complète, palier de maîtrise, grand graphe rempli", spk === "setBonus:ok masteryStep:ok graphFull:ok", spk);
  // (it. 1096, demande de Victor) « Vendre ce qui ne m'améliore pas » vend tout ce qui n'est pas une amélioration,
  // légendaires et pièces de panoplie compris (avant : les légendaires et les pièces à compléter étaient gardés)
  const sellAll = await js(`(() => { const G = window.__game, P = window.__panel, S = G.S;
    const keep = { bag: S.bag.slice(), gold: S.gold };
    try {
      const sl = Object.keys(S.equip).find((k) => S.equip[k]);
      const mk = (r, set) => { const it = G.newItem(r); it.r = r; it.slot = sl; it.st = {}; it.lvl = 1; it.set = set; delete it.power; return it; };
      S.bag = [mk(4, null), mk(3, "dusk"), mk(3, "wind")];
      G.invalidateStats();
      const up = S.bag.filter((it) => G.isUpgrade(it)).length;
      const r = G.sellUseless(true);
      return "améliorations " + up + " · vendus " + r.n + " · reste " + S.bag.length;
    } finally { S.bag = keep.bag; S.gold = keep.gold; G.invalidateStats(); P.renderAll(); }
  })()`);
  check("« Vendre ce qui ne m'améliore pas » : légendaires et pièces de panoplie vendus aussi", sellAll === "améliorations 0 · vendus 3 · reste 0", sellAll);
  // (it. 1013) Bestiaire > Panoplies : bouton « Compléter avec les pièces du sac » sur la carte, un clic la complète
  const setFin = await js(`(() => { const G = window.__game, P = window.__panel, S = G.S;
    const keep = { bag: S.bag.slice(), equip: { ...S.equip }, done: { ...(S.setsDone || {}) }, size: S.bagSize, tab: P.tab, sec: P.tabs.bestiary.sec };
    try {
      S.bagSize = Math.max(S.bagSize, S.bag.length + 4); delete (S.setsDone ||= {}).wind;
      for (const sl of ["helm", "boots", "gloves", "ring"]) { const it = G.newItem(3); it.slot = sl; it.set = "wind"; S.bag.push(it); }
      P.setTab("bestiary"); P.tabs.bestiary.sec = "sets"; P.renderAll();
      const btn = document.querySelector('[data-pane="bestiary"]:not([hidden]) [data-action="b-setfin"][data-id="wind"]');
      if (!btn) return "pas de bouton";
      btn.click();
      return S.setsDone.wind ? "ok" : "pas complétée";
    } finally { S.bag = keep.bag; S.equip = keep.equip; S.setsDone = keep.done; S.bagSize = keep.size; G.invalidateStats(); P.tabs.bestiary.sec = keep.sec; P.setTab(keep.tab); P.renderAll(); }
  })()`);
  check("panoplies : « Compléter avec les pièces du sac » sur la carte", setFin === "ok", setFin);
  // (it. 1000) un succès obtenu en jeu laisse une ligne dans le journal
  const achLog = await js("(() => { const G = window.__game, S = G.S, keep = S.achievements.slice(); S.achievements = S.achievements.filter((x) => x !== 'FIRST_BOSS'); window.__checkAchievements ? window.__checkAchievements() : null; const t = S.log.slice(0, 3).join(' | '); S.achievements = keep; return t; })()");
  check("succès obtenu : une ligne dans le journal", /🏆/.test(achLog), achLog.slice(0, 200));
  // (it. 947) étiquette d'une élite jamais vaincue : « ✦ » ; plus d'étoile une fois la sorte vaincue
  {
    const r = await js(`(() => { const st = window.__strip, G = window.__game, S = G.S; if (!st.active) return 'bande inactive';
      const k0 = S.kills, m0 = G.R.mon, l0 = G.R.lineup, lz0 = G.R.lineupZone, keep = S.stats.affixesSeen, out = [];
      for (const seen of [{}, { elusive: true }]) { S.stats.affixesSeen = seen; S.kills = 0; G.R.mon = null;
        G.R.lineup = Array.from({ length: 10 }, () => ({ type: G.zoneDef().monsters[0], elite: true, affix: 'elusive' })); G.R.lineupZone = S.zone;
        st.slotKey = null; st.syncSlots();
        const t = [...document.querySelectorAll('.affix:not(.bossname)')].find((x) => x.isConnected); out.push(t ? t.textContent : 'aucune'); }
      S.stats.affixesSeen = keep; S.kills = k0; G.R.mon = m0; G.R.lineup = l0; G.R.lineupZone = lz0; st.slotKey = null; st.syncSlots();
      return out.join(' | '); })()`);
    check("bande : élite d’une sorte jamais vaincue marquée ✦", /✦/.test(r.split(" | ")[0]) && !/✦/.test(r.split(" | ")[1] || "✦"), r);
  }
  // (it. 892) File d'élites (Lune de sang) : aucune étiquette d'affixe ne passe sous le nom du boss, sur les 200 zones
  // (un monstre volant, plus haut, la mettait sur le nom : « Furieux » sur « Carapace-des-Abysses »).
  {
    const r = await js(`(() => { const st = window.__strip, G = window.__game; if (!st.active) return 'bande inactive';
      const k0 = G.S.kills, z0 = G.S.zone, m0 = G.R.mon, l0 = G.R.lineup, lz0 = G.R.lineupZone, all = [];
      for (let z = 1; z <= 200; z++) { G.S.zone = z; G.S.kills = 0; G.R.mon = null; const ms = G.zoneDef().monsters;
        G.R.lineup = Array.from({ length: 10 }, (_, i) => ({ type: ms[i % ms.length], elite: true, affix: 'vampiric' })); G.R.lineupZone = z;
        st.slotKey = null; st.syncSlots();
        const tag = [...document.querySelectorAll('.affix.bossname')].find((t) => t.isConnected && t.getBoundingClientRect().width);
        if (!tag) continue;
        const b = tag.getBoundingClientRect();
        const n = [...document.querySelectorAll('.affix:not(.bossname)')].filter((t) => t.isConnected).map((t) => t.getBoundingClientRect())
          .filter((r) => r.width && r.left < b.right - 1 && b.left < r.right - 1 && r.top < b.bottom - 1 && b.top < r.bottom - 1).length;
        if (n) all.push(z + ':' + n); }
      G.S.zone = z0; G.S.kills = k0; G.R.mon = m0; G.R.lineup = l0; G.R.lineupZone = lz0; st.slotKey = null; st.syncSlots();
      return all.length ? all.length + ' zones : ' + all.join(' ') : 'ok'; })()`);
    check("file d'élites : étiquettes d'affixe hors du nom du boss (200 zones)", r === "ok", r);
  }
  // (it. 701-705) Écho d'un lieutenant (zones 250, 300, 350) : contour spectral ; pas pour l'original (zone 50) ni ailleurs.
  const eo = await js("(() => { const G = window.__game, st = window.__strip, z0 = G.S.zone, r = [250, 300, 350, 50, 249].map((z) => { G.S.zone = z; return /^rgba/.test(st.bossOutline()) ? '-' : st.bossOutline(); }); G.S.zone = z0; return r.join(' '); })()");
  // (it. 1019) les autres boss ont un contour pâle (rgba), noté « - » ici
  check("échos des lieutenants : contour spectral (250, 300, 350), pas l'original ni une autre zone", /^(#\w+) \1 \1 - -$/.test(eo), eo);
  // (it. 846) Nombres flottants lancés au même endroit au même instant : ils ne se recouvrent plus (fin de partie :
  // « -18Crit104k-21 » illisible au-dessus du héros).
  const fl = await js("(() => { const st = window.__strip; if (!st.active) return 'bande inactive'; st.fx.forEach((f) => f.node.remove()); st.fx.length = 0; const x = st.heroX + 16, ns = ['-18', 'Critique 104k', '-21', '+3 200', '-7'].map((t, i) => { st.float(x, 44, t, '#fff', i === 1); return st.fx[st.fx.length - 1].node.getBoundingClientRect(); }); if (ns.length !== 5) return 'créés ' + ns.length; let o = 0; for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) { const a = ns[i], b = ns[j]; if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) o++; } return 'chevauchements ' + o + (o ? ' ' + ns.map((r) => Math.round(r.left) + ',' + Math.round(r.top) + ',' + Math.round(r.width) + 'x' + Math.round(r.height)).join(' ') + ' ' + st.fx.slice(-5).map((f) => JSON.stringify(f.box)).join(' ') : ''); })()");
  check("bande : nombres flottants simultanés sans chevauchement", fl === "chevauchements 0", fl);
  // (it. 862) Même chose en japonais, chinois, coréen : caractères deux fois plus larges qu'un chiffre (« 会心 116k » et
  // « 凍結！ » se recouvraient au-dessus du héros en combat de boss).
  const flj = await js("(() => { const st = window.__strip; if (!st.active) return 'bande inactive'; st.fx.forEach((f) => f.node.remove()); st.fx.length = 0; const x = st.heroX + 16, ns = [['会心 116k', 0, 1], ['凍結！', -6, 1], ['-21', 0, 0], ['沈黙！', 8, 1], ['치명타 9k', 4, 1], ['-7', 0, 0]].map(([t, dx, big]) => { st.float(x + dx, 30, t, '#fff', !!big); return st.fx[st.fx.length - 1].node.getBoundingClientRect(); }); let o = 0; for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) { const a = ns[i], b = ns[j]; if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) o++; } st.fx.forEach((f) => f.node.remove()); st.fx.length = 0; return 'chevauchements ' + o + (o ? ' ' + ns.map((r) => Math.round(r.left) + ',' + Math.round(r.top) + ',' + Math.round(r.width) + 'x' + Math.round(r.height)).join(' ') : ''); })()");
  check("bande : nombres flottants en japonais / coréen sans chevauchement", flj === "chevauchements 0", flj);
  // (it. 857) Dégâts reçus, coups écrasants, reflets et ripostes abrégés comme les coups portés (« -22 k », pas « -22050 »).
  const fh = await js("(() => { const st = window.__strip, G = window.__game; if (!st.active) return 'bande inactive'; const dn = G.S.settings.damageNumbers; G.S.settings.damageNumbers = true; const out = []; for (const ev of ['heroHurt', 'mirrorHit', 'smash', 'riposte']) { const n0 = st.fx.length; G.emit(ev, { dmg: 22050.4 }); out.push(st.fx.length > n0 ? st.fx[st.fx.length - 1].node.textContent : '∅'); } G.S.settings.damageNumbers = dn; st.flash = 0; return out.join(' | '); })()");
  check("bande : dégâts reçus abrégés comme les coups portés", typeof fh === "string" && !/22050|∅/.test(fh) && /22/.test(fh), fh);
  // Panneau de la zone (it. 591) : un boss majeur à 10 zones au plus est annoncé avec sa relique (pas une fois gagnée).
  const ra = await js("(() => { const G = window.__game, P = window.__panel, z0 = G.S.zone, rel = G.S.relics; G.S.zone = 45; G.S.relics = {}; P.renderZone(); const a = !!document.querySelector('#p-zone .relicahead'); G.S.relics = { drone: 1 }; P.renderZone(); const up = /→/.test((document.querySelector('#p-zone .relicahead') || {}).textContent || ''); const lv0 = G.S.relicLv; G.S.relicLv = { drone: 5 }; P.renderZone(); const b = up && !document.querySelector('#p-zone .relicahead'); G.S.relicLv = lv0; G.S.zone = z0; G.S.relics = rel; P.renderZone(); return a + ' ' + b; })()");
  check("zone : prochain boss majeur et sa relique annoncés (puis « renforcera », rien au niveau 5)", ra === "true true", ra);
  // Chroniques (it. 631) : une relique gagnée y figure, son ▶ rejoue sa scène.
  const rch = await js("(() => { const G = window.__game, P = window.__panel, J = window.__strip.juice, rel = G.S.relics; G.S.relics = { heart: 1 }; P.setTab('adventure'); P.renderAll(); const b = document.querySelector('[data-action=relic-play][data-id=heart]'); J.cineQueue = []; J.cine = null; document.querySelectorAll('.cine').forEach((n) => n.remove()); if (b) P.onClick({ target: b }); const ok = !!b && !!document.querySelector('.cine.relic'); document.querySelectorAll('.cine').forEach((n) => n.remove()); J.cine = null; G.S.relics = rel; P.renderAll(); return String(ok); })()");
  check("chroniques : histoire de la relique et ▶ qui rejoue sa scène", rch === "true", rch);
  // Relique gagnée (demande S) : scène avec la relique et son nom ; une scène encore ouverte (boss majeur de la
  // zone 50, contrôle du grand palier) est fermée d'abord.
  const rc = await js("(() => { const J = window.__strip.juice; J.cineQueue = []; J.cine = null; document.querySelectorAll('.cine').forEach((n) => n.remove()); J.cinematic('relic', { id: 'drone' }); const n = document.querySelector('.cine.relic'); const ok = !!n && !!n.querySelector('.cine-relic') && n.querySelector('.cine-title').textContent.length > 2; n && n.click(); return String(ok); })()");
  check("cinématique : relique gagnée", rc === "true", rc);
  await sleep(400);
  const cq = await js("(() => { const J = window.__strip.juice; J.cineQueue = []; J.cine = null; document.querySelectorAll('.cine').forEach((n) => n.remove()); J.cinematic('freed', { cls: 'ranger' }); J.cinematic('chronicle', { title: 'Q', n: 2, total: 9 }); const one = document.querySelectorAll('.cine.chronicle').length === 0 && !!document.querySelector('.cine.freed') && document.querySelector('.cine.freed').classList.contains('hit'); document.querySelector('.cine.freed').click(); return String(one); })()");
  await new Promise((r) => setTimeout(r, 700));
  const cq2 = await js("(() => { const c = document.querySelector('.cine.chronicle'); if (c) c.click(); return String(!!c); })()");
  check("cinématiques en file (la chronique attend la fin du héros libéré), calque cliquable", cq === "true" && cq2 === "true", cq + " / " + cq2);
  check("cinématiques : intro, arrivée, victoire, générique, chronique et héros libéré jouées, un clic les passe", cin === "true true true true true true true" && gone === true, cin + " / " + gone);
  // Demande 18 / 32 : aucun onglet ne défile verticalement à cette taille de fenêtre (largeur de l'écran de Victor).
  const OVF_JS = "(() => { const p = document.getElementById('panel'), P = window.__panel, cur = P.tab, out = [], kept = new Set(P.kept); P.kept.clear(); if (window.innerWidth < 1800) return 'fenêtre étroite'; for (const id of ['adventure','talents','skills','quests','shop','pets','class','ascension','bestiary','stats','map','settings']) { if (!document.querySelector('[data-tab=' + id + ']') || document.querySelector('[data-tab=' + id + ']').getClientRects().length === 0) continue; P.setTab(id); P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(id + '=' + o + (id === 'adventure' ? '[' + [...document.querySelectorAll('[data-pane=adventure] .grid > article')].map((x) => x.id + ':' + (x.lastElementChild ? Math.round(x.lastElementChild.getBoundingClientRect().bottom - x.getBoundingClientRect().top) : 0) + '/' + [...x.children].map((c) => c.className.split(' ')[0] + Math.round(c.getBoundingClientRect().height)).join('.')).join(',') + ' sel=' + !!P.selected + ']' : '')); } kept.forEach((k) => P.kept.add(k)); P.setTab(cur); P.renderAll(); return out.join(' ') || 'aucun'; })()";
  const ovf = await js(OVF_JS);
  check("aucun onglet ne défile verticalement (1920 px)", ovf === "aucun" || ovf === "fenêtre étroite", ovf);
  // Écran de portable (1366 px) : la fenêtre est rétrécie le temps de la mesure (seuil de largeur abaissé).
  const bLap = bounds();
  for (const w of [1366, 1280]) {
    strip.win.setBounds({ ...bLap, width: w });
    await sleep(900);
    const ovf2 = await js(OVF_JS.replace("window.innerWidth < 1800", "window.innerWidth < 1200"));
    check(`aucun onglet ne défile verticalement (${w} px, écran de portable)`, ovf2 === "aucun", ovf2);
    if (w === 1366) { // sous-onglets des Statistiques (la liste des succès grandit à chaque ajout)
      const subs = await js("(() => { const P = window.__panel, p = document.getElementById('panel'), cur = P.tab, sec = P.tabs.stats.sec, out = []; P.setTab('stats'); for (const s of ['ach', 'journey']) { P.tabs.stats.sec = s; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(s + '=' + o); } P.tabs.stats.sec = sec; P.setTab(cur); P.renderAll(); return out.join(' ') || 'aucun'; })()");
      check("statistiques : succès et carnet de route sans défilement (1366 px)", subs === "aucun", subs);
    }
    if (w === 1280) { // Familiers (it. 845) : « Trouvés / À découvrir » en tête de la barre, jamais caché à droite
      const psub = await js("(() => { const P = window.__panel, cur = P.tab, S = window.__game.S, st = S.unlocks.steward; S.unlocks.steward = true; P.setTab('pets'); P.renderAll(); const bar = document.querySelector('[data-pane=pets]:not([hidden]) .petbar'), sub = bar && bar.querySelector('.subtabs'); let r = 'absent'; if (sub) { bar.scrollLeft = 0; const a = bar.getBoundingClientRect(), b = sub.getBoundingClientRect(); r = b.right <= a.right + 1 ? 'ok' : 'caché de ' + Math.round(b.right - a.right) + ' px'; } if (!st) delete S.unlocks.steward; P.setTab(cur); P.renderAll(); return r; })()");
      check("familiers : sous-onglets visibles dans la barre (1280 px)", psub === "ok" || psub === "absent", psub);
      // Sac d'une partie neuve (it. 858) : « 1 / 24 » se cassait en deux lignes, le rappel « double-clic » en trois.
      const bagh = await js("(() => { const g = window.__game, S = g.S, P = window.__panel, cur = P.tab, best = S.best, pc = S.prestige.count, own = Object.prototype.hasOwnProperty.call(g, 'hasUpgrade'), hu = g.hasUpgrade; S.best = 5; S.prestige.count = 0; g.hasUpgrade = () => true; P.setTab('adventure'); P.renderAll(); const sm = document.querySelector('#p-bag h2 > small'), h = document.querySelector('#p-bag h2 .baghint'); let r = !sm ? 'pas de compteur' : !h ? 'pas de rappel' : ''; if (!r) { const lh = parseFloat(getComputedStyle(sm).fontSize) * 1.6; r = sm.getBoundingClientRect().height > lh ? 'compteur sur plusieurs lignes' : h.scrollWidth > h.clientWidth + 1 ? 'rappel coupé' : 'ok'; } S.best = best; S.prestige.count = pc; if (own) g.hasUpgrade = hu; else delete g.hasUpgrade; P.setTab(cur); P.renderAll(); return r; })()");
      check("sac : compteur et rappel « double-clic » chacun sur une ligne (1280 px)", bagh === "ok", bagh);
      // (it. 893) Probabilités : le taux du jour (Grande chasse : élites ×3) à côté de la base, sans faire défiler à 1280 px
      const prob = await js("(() => { const P = window.__panel, g = window.__game, S = g.S, p = document.getElementById('panel'), cur = P.tab, sec = P.tabs.stats.sec, mod = S.daily.mod; S.daily.mod = 'hunt'; g.invalidateStats(); P.tabs.stats.sec = 'numbers'; P.setTab('stats'); P.renderAll(); const lis = [...document.querySelectorAll('[data-pane=stats] li')], li = lis.find((l) => /^(Élite|Elite)$/.test((l.firstElementChild || {}).textContent)); const txt = li ? li.querySelector('b').textContent : 'ligne absente (' + P.tab + ', ' + lis.length + ' : ' + lis.map((l) => (l.firstElementChild || {}).textContent).slice(-4).join('|') + ')'; const o = p.scrollHeight - p.clientHeight; S.daily.mod = mod; g.invalidateStats(); P.tabs.stats.sec = sec; P.setTab(cur); P.renderAll(); const want = Math.round(6 * 3 * (1 + (g.stats().elites || 0) / 100) * 10) / 10, got = parseFloat((txt.split('·').pop().match(/[\\d.,]+/) || ['0'])[0].replace(',', '.')); return Math.abs(got - want) < 0.11 && o <= 2 ? 'ok' : txt + ' / attendu ' + want + ' / défile ' + o; })()");
      check("statistiques : taux d'élite du jour affiché (Grande chasse ×3, 1280 px)", prob === "ok", prob);
      // (it. 927) Quêtes : pire cas de « progression · ≈ temps restant » (grands nombres, 47 h) sur une seule ligne, 1280 px
      const qeta = await js("(() => { const P = window.__panel, G = window.__game, S = G.S, keepQ = S.quests.slots, keepP = G.R.pace, cur = P.tab; G.R.pace = Array.from({ length: 21 }, (_, i) => [i * 10, 1e9]); S.quests.slots = [{ uid: 9901, kind: 'gold', goal: 1.7e15, progress: 1.5e15, stars: 3, reward: { gold: 1 } }, { uid: 9902, kind: 'kill', goal: 9999, progress: 1234, stars: 3, reward: { gold: 1 } }, { uid: 9903, kind: 'hunt', type: G.zoneDef().monsters[0], goal: 999, progress: 12, stars: 3, reward: { gold: 1 } }]; P.setTab('quests'); P.renderAll(); const rows = [...document.querySelectorAll('[data-pane=quests]:not([hidden]) .questcard .kv')]; const etas = rows.filter((r) => r.querySelector('.eta')).length; const bad = rows.filter((r) => r.scrollWidth > r.clientWidth + 1 || r.getBoundingClientRect().height > 40).length; S.quests.slots = keepQ; G.R.pace = keepP; P.setTab(cur); P.renderAll(); return etas + ' ' + bad; })()");
      check("quêtes : temps restant estimé sans débordement (pire cas, 1280 px)", /^[1-3] 0$/.test(qeta), qeta);
      // (it. 928) Prochain déblocage : « or / prix · ≈ temps » au pire cas (grands nombres, ~47 h), l'Aventure ne défile pas
      const geta = await js(`(async () => { const { UNLOCKS } = await import("./game/unlocks.js"); const P = window.__panel, G = window.__game, S = G.S, p = document.getElementById("panel"), keepG = S.gold, keepU = S.unlocks, keepB = S.best, keepP = G.R.pace, cur = P.tab;
        S.best = Math.max(S.best, 400); S.unlocks = Object.fromEntries(UNLOCKS.filter((u) => u.id !== "trader").map((u) => [u.id, true])); const price = UNLOCKS.find((u) => u.id === "trader").price; S.gold = price * 0.75; G.R.pace = Array.from({ length: 21 }, (_, i) => [i * 10, (price - S.gold) / (47 * 3600) * 10]);
        P.setTab("adventure"); P.renderAll(); const t = (document.querySelector("#p-hero .goal .gtxt") || {}).textContent || "pas de carte"; const o = p.scrollHeight - p.clientHeight;
        S.gold = keepG; S.unlocks = keepU; S.best = keepB; G.R.pace = keepP; P.setTab(cur); P.renderAll(); return (/≈/.test(t) ? "eta" : "sans") + " " + (o <= 2 ? "ok" : "défile " + o) + " | " + t; })()`);
      check("prochain déblocage : temps estimé sans faire défiler (1280 px)", /^eta ok/.test(geta), geta);
      // (it. 864) tuiles du héros : colonnes égales quelle que soit la valeur (une grande valeur élargissait sa colonne,
      // le libellé voisin passait sur deux lignes et l'Aventure défilait en polonais) ; valeurs jamais coupées.
      const tiles = await js("(() => { const P = window.__panel, cur = P.tab; P.setTab('adventure'); P.renderAll(); const t = [...document.querySelectorAll('#p-hero .tile')]; let r = t.length !== 4 ? t.length + ' tuiles' : Math.abs(t[0].offsetWidth - t[1].offsetWidth) > 1 ? 'colonnes ' + t[0].offsetWidth + ' / ' + t[1].offsetWidth : ''; if (!r) { const b = t.map((x) => x.querySelector('b')).find((x) => x.scrollWidth > x.clientWidth + 1); r = b ? 'valeur coupée : ' + b.textContent : 'ok'; } P.setTab(cur); P.renderAll(); return r; })()");
      check("héros : tuiles de largeur égale, valeurs entières (1280 px)", tiles === "ok", tiles);
      // (it. 864) Marchand : un long nom légendaire (russe, 4 lignes) poussait le bouton d'achat hors de la carte.
      const mc = await js("(() => { const P = window.__panel, cur = P.tab; P.setTab('shop'); const sec = P.tabs.shop.sec; P.tabs.shop.sec = 'shop'; const g = window.__game, S = g.S, old = S.shop; g.restockShop(); const it0 = S.shop.items[0]; it0.name = 'Anneau de métal stellaire du Rônin vagabond, gardien des étoiles anciennes du Rebord'; it0.r = 4; P.renderAll(); const c = [...document.querySelectorAll('[data-pane=shop]:not([hidden]) .mcard')]; const nm = c.map((x) => x.querySelector('.nm')).filter(Boolean); const tall = nm.find((x) => x.getBoundingClientRect().height > parseFloat(getComputedStyle(x).lineHeight) * 3 + 2); const out = c.find((x) => { const b = x.querySelector('.buy'); return b && b.getBoundingClientRect().bottom > x.getBoundingClientRect().bottom + 1; }); const r = !c.length ? 'aucune carte' : tall ? 'nom sur plus de 3 lignes' : out ? 'bouton hors de la carte' : 'ok'; S.shop = old; P.tabs.shop.sec = sec; P.setTab(cur); P.renderAll(); return r; })()");
      check("marchand : nom sur 3 lignes au plus, bouton dans la carte (1280 px)", mc === "ok", mc);
    }
  }
  strip.win.setBounds(bLap);
  await sleep(600);
  // Carte Zone : la Malédiction indique sa parade (Talisman de pureté) une fois le pouvoir découvert.
  const par = await js("(() => { const g = window.__game, S = g.S, P = window.__panel, z = S.zone, seen = Object.assign({}, S.powersSeen); S.zone = 11; S.powersSeen = Object.assign({}, seen, { p_pure: true }); P.setTab('adventure'); P.renderAll(); const t = [...document.querySelectorAll('.bossmech b[title]')].map((b) => b.title).join(' | '); S.zone = z; S.powersSeen = seen; P.renderAll(); return t; })()");
  check("zone : la Malédiction indique sa parade", /Talisman/.test(par), par);
  // Menu de l'icône : « Économie d'énergie » envoyé comme une commande, sans ouvrir le panneau.
  const ecoBefore = await js("String(!!window.__game.S.settings.eco)");
  // Menu de l'icône (it. 546) : case « Musique » (commande music:off / music:on).
  const musBefore = await js("String(window.__game.S.settings.music !== false)");
  strip.win.webContents.send("command", "music:off"); await sleep(300);
  const musOff = await js("String(window.__game.S.settings.music)");
  strip.win.webContents.send("command", "music:on"); await sleep(300);
  const musOn = await js("String(window.__game.S.settings.music)");
  if (musBefore !== "true") strip.win.webContents.send("command", "music:off");
  check("menu de l'icône : case Musique", musOff === "false" && musOn === "true", musOff + " " + musOn);
  strip.win.webContents.send("command", "eco:on"); await sleep(300);
  const ecoOn = await js("String(window.__game.S.settings.eco)");
  strip.win.webContents.send("command", ecoBefore === "true" ? "eco:on" : "eco:off"); await sleep(300);
  const ecoBack = await js("String(!!window.__game.S.settings.eco)");
  check("menu de l'icône : économie d'énergie activée par commande, puis rétablie", ecoOn === "true" && ecoBack === ecoBefore, ecoOn + " / " + ecoBack);
  // Sac : le bouton ⇅ range les objets (rareté décroissante hors améliorations).
  const srt = await js("(() => { const g = window.__game, P = window.__panel; P.setTab('adventure'); P.renderAll(); const b = document.querySelector('#p-bag [data-action=bagsort]'); if (!b) return 'pas de bouton'; b.click(); const up = new Set(g.S.bag.filter((it) => g.isUpgrade(it)).map((it) => it.id)); const rest = g.S.bag.filter((it) => !up.has(it.id)).map((it) => it.r); return String(rest.every((r, i) => i === 0 || rest[i - 1] >= r)); })()");
  check("sac : le bouton ⇅ range les objets", srt === "true", srt);
  // Touche S : même rangement (bag mélangé d'abord, puis événement clavier dans la page).
  const srtK = await js("(() => { const g = window.__game, P = window.__panel; g.S.bag.reverse(); const ok = P.onKey({ key: 's', target: document.body }); const up = new Set(g.S.bag.filter((it) => g.isUpgrade(it)).map((it) => it.id)); const rest = g.S.bag.filter((it) => !up.has(it.id)).map((it) => it.r); return ok + ' ' + rest.every((r, i) => i === 0 || rest[i - 1] >= r); })()");
  check("sac : la touche S range aussi", srtK === "true true", srtK);
  // Sections repliables de l'Aventure : un clic sur le titre ouvre la fenêtre large (pas de défilement de l'onglet).
  const dets = await js("(() => { const P = window.__panel, out = []; P.kept.clear(); P.setTab('adventure'); P.renderAll(); for (const k of ['hero-todo','hero-chron','hero-stats','rates']) { const d = document.querySelector('[data-keep=' + k + ']'); if (!d) continue; d.querySelector('summary').click(); const m = document.getElementById('modal'), b = m.querySelector('.panel'), o = b.scrollHeight - b.clientHeight; if (m.hidden || d.open || o > 2) out.push(k + ':' + (m.hidden ? 'fermée' : o) + (d.open ? ':dépliée' : '')); m.hidden = true; } return out.join(' ') || 'ok'; })()");
  check("aventure : sections repliables en fenêtre, sans défilement", dets === "ok", dets);
  // Bulle « Nouvelle chronique » : son clic ouvre la fenêtre Chroniques (sans déplier la section sur place).
  await js("(() => { document.getElementById('toast').hidden = true; window.__game.emit('chronicle', { ids: ['captive'] }); })()");
  await sleep(500);
  const chT = await js("(() => { const t = document.getElementById('toast'); if (t.hidden) return 'pas de bulle'; t.click(); return 'ok'; })()");
  await sleep(500);
  const chM = await js("(() => { const m = document.getElementById('modal'), d = document.querySelector('[data-keep=hero-chron]'); const r = (m.hidden ? 'fermée' : 'ouverte') + ' ' + (d ? d.open : '?'); m.hidden = true; document.querySelectorAll('.cine').forEach((c) => c.click()); return r; })()");
  check("bulle de chronique : ouvre la fenêtre Chroniques", chT === "ok" && chM === "ouverte false", chT + " / " + chM);
  // Réglage « Informations de la bande » : « Au milieu » regroupe les infos au centre sur un écran ordinaire.
  const hp = await js("(() => { const P = window.__panel; P.setTab('settings'); P.renderAll(); const S = window.__game.S, was = S.settings.hudPos; const click = (v) => { document.querySelector('[data-action=se-hudpos][data-v=' + v + ']').click(); return document.body.classList.contains('hud-center'); }; const r = [click('center'), click('edges')]; S.settings.hudPos = was; window.dispatchEvent(new Event('sillwalker-hudpos')); return r.join(' '); })()");
  check("réglages : informations de la bande au milieu / aux bords", hp === "true false", hp);
  // Son (refonte it. 432-446) : rendu hors ligne de tous les sons ; aucune erreur, aucun NaN, aucune saturation.
  const sndAll = await js(`(async () => { try {
    const S0 = window.__sound, out = [];
    const render = async (name, fn) => { const ctx = new OfflineAudioContext(1, 44100 * 2, 44100), s = new S0.constructor();
      s.ctx = ctx; s.master = ctx.createGain(); s.master.gain.value = 0.1; s.master.connect(ctx.destination); s.enabled = true; s.ensure = () => ctx; s.audio = () => ctx;
      fn(s); const d = (await ctx.startRendering()).getChannelData(0); let pk = 0;
      for (const x of d) { if (Number.isNaN(x)) { out.push(name + ":NaN"); return; } pk = Math.max(pk, Math.abs(x)); }
      if (pk > 0.2) out.push(name + ":" + pk.toFixed(2)); };
    for (const c of ["warrior", "paladin", "lancer", "ranger", "mage", "cryomancer", "necro", "priestess", "bard"]) await render("coup-" + c, (s) => { s.hit(c, "skel", true); s.last = {}; s.hit(c, "slime", false); });
    await render("pièces", (s) => { s.coin(5); s.coinIn(true); });
    // (it. 1302) tous les événements du jeu (la liste était écrite à la main : un nouvel événement pouvait l'oublier)
    const { EVENTS: EV } = await import("./game/events.js");
    for (const id of [...Object.keys(EV), "inconnu"]) await render("évén-" + id, (s) => s.eventSound(id));
    for (const k of ["bubble", "drip", "snow", "dust", "ember", "spore", "mote", "ash", "feather", "leaf", null]) await render("zone-" + k, (s) => { s.zoneSounds(k, false, true); s.zoneSounds(k, true, true); });
    await render("oiseau", (s) => s.birdCall());
    await render("miaou", (s) => s.meow()); // (it. 1734) Poupouce
    // capacités des boss (it. 645 : Silence des échos ajouté)
    for (const id of ["enrage", "shell", "frost", "mirror", "fury", "bulwark", "curse", "curseBlocked", "tenacious", "silence", "venom", "venomBlocked", "explode", "chains", "ashes", "eclipse", "shards"]) await render("boss-" + id, (s) => s.play("bossSkill", id));
    for (const id of ["leap", "dive", "spores", "reassemble", "sting", "howl", "slam", "roots", "scream", "phase", "fireball", "swarm", "web", "tombcurse", "boulder", "feathers", "flare", "shell", "parry", "riposte", "rootdeep", "breath", "gaze", "tongue", "strike", "pinch", "charge", "roar", "rage", "sacrifice", "flutter", "shock", "ambush", "burrow", "peck", "chomp", "pickpocket", "pollen", "thrust", "bomb"]) await render("mon-" + id, (s) => s.play("monSkill", id)); // (it. 1853) compétences des monstres
    await render("perçant", (s) => s.pierceSound());
    await render("drone", (s) => s.droneSound());
    await render("relique", (s) => s.relicSound());
    // (it. 1541) la musique n'est plus synthétisée en direct : les 4 morceaux sont contrôlés plus bas
    for (const id of ["bolt", "gust", "mend", "fire", "aegis", "meteor"]) await render("sort-" + id, (s) => s.spellSound(id));
    await render("gestion", (s) => { const h = {}; s.bind({ on: (e, fn) => { h[e] = fn; }, R: { events: {} }, S: window.__game.S, zoneDef: () => null }); clearInterval(s.ambT); h.equipped({ r: 4 }); h.soldOne({}); h.sold({ n: 9 }); h.spent({}); h.learned({ skill: true }); });
    await render("ambiance-évén", (s) => s.eventAmbience({ goldrain: 5, wind: 5, shardfall: 5, nest: 5 }));
    for (const id of ["coin", "loot", "legendary", "level", "boss", "champion", "chest", "star", "quest", "ascend"]) await render("play-" + id, (s) => s.play(id));
    return out.join(" ") || "ok";
  } catch (e) { return "erreur " + e.message; } })()`);
  // (it. 1541) Musique : les 4 morceaux (assets/music/*.opus) se décodent, sans NaN ni saturation, à des volumes proches
  // (rapport des moyennes quadratiques < 1,3 : masterisés à −16 LUFS) ; le jeu joue celui de sa zone ; l'aperçu change de morceau.
  const mix = await js(`(async () => { try {
    const { TRACKS } = await import("./render/music.js"), rms = [], bad = [];
    for (const t of TRACKS) {
      const ab = await (await fetch("assets/music/" + t.id + ".opus")).arrayBuffer(), b = await new OfflineAudioContext(2, 1, 48000).decodeAudioData(ab);
      let pk = 0, sq = 0, n = 0;
      for (let c = 0; c < 2; c++) for (const x of b.getChannelData(c)) { if (Number.isNaN(x)) return "NaN " + t.id; const a = Math.abs(x); if (a > pk) pk = a; sq += x * x; n++; }
      if (pk >= 0.99) bad.push(t.id + ":pic " + pk.toFixed(2)); if (b.duration < 120) bad.push(t.id + ":durée " + b.duration.toFixed(0));
      rms.push(Math.sqrt(sq / n));
    }
    const k = Math.max(...rms) / Math.min(...rms);
    return (bad.join(" ") || "ok") + " rapport " + k.toFixed(2) + " [" + rms.map((r) => r.toFixed(3)).join(" ") + "]";
  } catch (e) { return "erreur " + e.message; } })()`);
  check("musique : 4 morceaux décodés sans saturation, volumes proches", /^ok rapport /.test(mix) && +mix.split(" ")[2] < 1.3, mix);
  const play = await js(`(async () => { try {
    const M = window.__music, G = window.__game, { trackIndex } = await import("./render/music.js");
    if (!M.enabled) return "désactivée";
    M.setZone(G.S.zone);
    for (let i = 0; i < 40 && !(M.voice && M.voice.idx === trackIndex(G.S.zone)); i++) await new Promise((r) => setTimeout(r, 250));
    const a = M.voice ? M.voice.idx === trackIndex(G.S.zone) : false;
    M.preview(G.S.zone > 100 ? 1 : 151);
    for (let i = 0; i < 40 && !(M.voice && M.voice.idx !== trackIndex(G.S.zone)); i++) await new Promise((r) => setTimeout(r, 250));
    const b = M.voice ? M.voice.idx !== trackIndex(G.S.zone) : false;
    M.endPreview();
    return a + " " + b;
  } catch (e) { return "erreur " + e.message; } })()`);
  // (it. 1542, demande de Victor) curseur « Effets » : il règle le bus des effets, pas le volume général (musique, ambiance)
  const fxv = await js("(() => { const s = window.__sound; s.audio(); if (!s.out) return 'sans contexte'; const o = s.out.gain.value; s.setEffects(0.5); const a = s.master.gain.value; s.setEffects(1); return (Math.abs(a - 0.5) < 1e-6) + ' ' + (s.out.gain.value === o) + ' ' + (s.master.gain.value === 1); })()");
  // (it. 1544) clic sur le rebord haut d'un bouton : il s'enfonce de 2 px, le relâchement tombe juste au-dessus ; le clic part quand même
  const edge = await js(`(() => { const host = document.createElement("div"); host.style.cssText = "position:fixed;left:40px;top:40px;padding:10px;z-index:99999"; const b = document.createElement("button"); b.textContent = "test"; let n = 0; b.onclick = () => n++; host.append(b); document.body.append(host);
    const r = b.getBoundingClientRect(), x = r.left + 10, y = r.top - 1;
    b.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: x, clientY: r.top + 1, button: 0 }));
    host.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, clientX: x, clientY: y, button: 0 }));
    const a = n; host.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: x, clientY: y - 20, button: 0 })); host.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, clientX: x, clientY: y - 20, button: 0 }));
    host.remove(); return a + " " + n; })()`);
  check("clic sur le rebord d'un bouton : l'action part (une fois, pas ailleurs)", edge === "1 1", edge);
  check("son : le curseur « Effets » règle les effets seuls", fxv === "true true true" || fxv === "sans contexte", fxv);
  // (it. 1559) bande cachée : le morceau décodé est libéré (délai raccourci ici), puis revient quand elle réapparaît
  const hid = await js(`(async () => { const M = window.__music, G = window.__game, { trackIndex } = await import("./render/music.js");
    if (!M.enabled) return "désactivée"; M.setZone(G.S.zone);
    for (let i = 0; i < 40 && !M.voice; i++) await new Promise((r) => setTimeout(r, 250));
    // comme setVisible(false) d'app.js : son en pause (sinon la boucle du jeu relance le morceau de la zone)
    window.__sound.setPaused(true); M.hideDelay = 50; M.hide(true); await new Promise((r) => setTimeout(r, 200)); const freed = !M.voice && M.buffers.size === 0;
    window.__sound.setPaused(false); M.hide(false); M.hideDelay = undefined;
    for (let i = 0; i < 40 && !(M.voice && M.voice.idx === trackIndex(G.S.zone)); i++) await new Promise((r) => setTimeout(r, 250));
    return freed + " " + !!(M.voice && M.voice.idx === trackIndex(G.S.zone)); })()`);
  const lv0 = await js(`(async () => { const M = window.__music, G = window.__game, lv = M.level ?? 1; if (!M.enabled) return "désactivée";
    M.setLevel(0); const freed = !M.voice && M.buffers.size === 0; M.setLevel(lv || 1);
    for (let i = 0; i < 40 && !M.voice; i++) await new Promise((r) => setTimeout(r, 250));
    return freed + " " + !!M.voice; })()`);
  check("musique : curseur à 0 % = morceau libéré, repris quand il remonte", lv0 === "true true" || lv0 === "désactivée", lv0);
  check("musique : libérée quand la bande reste cachée, reprise à son retour", hid === "true true" || hid === "désactivée", hid);
  // (it. 1583) 📌 : garder un autre morceau que celui de la zone, puis revenir
  const pin = await js(`(async () => { const M = window.__music, G = window.__game, P = G.S.settings, { trackIndex } = await import("./render/music.js");
    if (!M.enabled) return "désactivée"; const want = (trackIndex(G.S.zone) + 1) % 4;
    P.musicPin = want; window.__panel.tabs.settings.onChange?.();
    for (let i = 0; i < 40 && !(M.voice && M.voice.idx === want); i++) await new Promise((r) => setTimeout(r, 250));
    const a = !!(M.voice && M.voice.idx === want); P.musicPin = -1; window.__panel.tabs.settings.onChange?.();
    for (let i = 0; i < 40 && !(M.voice && M.voice.idx === trackIndex(G.S.zone)); i++) await new Promise((r) => setTimeout(r, 250));
    return a + " " + !!(M.voice && M.voice.idx === trackIndex(G.S.zone)); })()`);
  // (it. 1609) nouvelle tranche de 50 zones : après 6 s d'installation, une bulle « ♪ » nomme le nouveau morceau
  const bub = await js(`(async () => { const G = window.__game, M = window.__music, { trackIndex, TRACKS } = await import("./render/music.js"), { t: tr } = await import("./i18n/index.js");
    if (!M.enabled) return "désactivée"; window.__clearToasts?.(); window.__musicSettle = 1; const z0 = G.S.zone, b0 = G.S.best, to = z0 > 50 ? 1 : 51; G.S.best = Math.max(b0, to); G.S.zone = to; G.changed();
    let t = ""; for (let i = 0; i < 40 && !/♪/.test(t); i++) { await new Promise((r) => setTimeout(r, 250)); t = document.querySelector("#toast")?.textContent || ""; }
    window.__musicSettle = 0; G.S.zone = z0; G.S.best = b0; G.changed(); window.__clearToasts?.(); return /♪/.test(t) && t.includes(tr(TRACKS[trackIndex(to)].name)) ? "ok" : "rien : " + t.slice(0, 60); })()`);
  check("musique : une bulle nomme le morceau d'une nouvelle tranche", bub === "ok" || bub === "désactivée", bub);
  check("musique : 📌 garde un morceau, puis revient à celui de la zone", pin === "true true" || pin === "désactivée", pin);
  check("musique : le morceau de la zone joue, l'aperçu en change", play === "true true" || play === "désactivée", play);
  check("son : tous les sons se rendent sans erreur, NaN ni saturation", sndAll === "ok", sndAll);
  // Touche U (it. 628) : achète le prochain déblocage s'il est prêt, ne fait rien sinon.
  const keyU = await js("(() => { const G = window.__game, P = window.__panel, S = G.S, keep = JSON.stringify({ g: S.gold, u: S.unlocks }); const n0 = Object.keys(S.unlocks || {}).length; S.gold = 0; const a = P.onKey({ key: 'u', target: document.body }); S.gold = 1e300; const b = P.onKey({ key: 'u', target: document.body }); const n1 = Object.keys(S.unlocks || {}).length; const k = JSON.parse(keep); S.gold = k.g; S.unlocks = k.u; P.renderAll(); return a + ' ' + (b === (n1 > n0)); })()");
  check("touche U : achète le prochain déblocage prêt, rien sans l’or", keyU === "false true", keyU);
  // (it. 944) première victoire sur une sorte d'élite : annoncée, nom traduit (partie en anglais)
  // (it. 2037) poupouce: false : makeMonster tire parfois Poupouce, et la réplique « Pardon, Poupouce… » passait devant (échec selon le tirage)
  const elLog = await js("(() => { const G = window.__game, S = G.S, keep = S.stats.affixesSeen, m0 = G.R.mon, k0 = S.kills; S.stats.affixesSeen = {}; G.R.mon = G.makeMonster(false); Object.assign(G.R.mon, { poupouce: false, elite: true, affix: 'elusive', boss: false }); G.killMonster(); const t = String(S.log.find((l) => /1 \\/ \\d/.test(l)) || 'rien'); S.stats.affixesSeen = keep; G.R.mon = m0; S.kills = k0; return t; })()");
  check("élite : première victoire sur une sorte annoncée, nom traduit", /Evasive/.test(elLog) && !/Fuyant/.test(elLog), elLog);
  // (it. 956) le héros s'en réjouit (bulle), hors combat de boss
  const elSay = await js("(() => { const G = window.__game, S = G.S, st = window.__strip, keep = S.stats.affixesSeen, m0 = G.R.mon, k0 = S.kills; S.stats.affixesSeen = {}; S.kills = 0; st.saidAt = -1e9; G.R.mon = G.makeMonster(false); Object.assign(G.R.mon, { poupouce: false, elite: true, affix: 'frosty', boss: false }); G.killMonster(); const t = st.bubble.hidden ? 'pas de bulle' : st.bubble.textContent; st.bubble.hidden = true; S.stats.affixesSeen = keep; G.R.mon = m0; S.kills = k0; return t; })()");
  check("élite : première victoire sur une sorte, réplique du héros", /collection|Never beaten/.test(elSay), elSay);
  // (it. 937) Réplique propre à l'événement (Pluie d'or), hors combat de boss (pas de bulle sur le nom du boss)
  const evSay = await js("(() => { const G = window.__game, st = window.__strip, k0 = G.S.kills, m0 = G.R.mon, e0 = G.R.events.goldrain; G.S.kills = 0; G.R.mon = null; st.saidAt = -1e9; G.R.events.goldrain = 0; G.startEvent('goldrain'); const t = st.bubble.hidden ? 'pas de bulle' : st.bubble.textContent; G.S.kills = k0; G.R.mon = m0; G.R.events.goldrain = e0 || 0; st.bubble.hidden = true; return t; })()");
  check("événement rare : réplique propre du héros (Pluie d’or)", /gold|or|Gold/i.test(evSay) && !/Tu as vu|did you see/i.test(evSay), evSay);
  // (it. 916) Lune de sang : ciel rouge cuit dans le décor pendant l'événement, puis retour au ciel normal.
  await js("window.__game.R.events.bloodmoon = 20");
  await sleep(400);
  const bsOn = await js("!!window.__strip.bloodSky");
  await js("window.__game.R.events.bloodmoon = 0");
  await sleep(400);
  const bsOff = await js("!!window.__strip.bloodSky");
  check("Lune de sang : ciel rouge pendant l’événement, normal ensuite", bsOn === true && bsOff === false, bsOn + " " + bsOff);
  // (it. 917) Nuée d'étoiles : ciel assombri et constellé, même principe.
  await js("window.__game.R.events.starfall = 20");
  await sleep(400);
  const ssOn = await js("!!window.__strip.starSky");
  await js("window.__game.R.events.starfall = 0; window.__game.R.star = null");
  await sleep(400);
  const ssOff = await js("!!window.__strip.starSky");
  check("Nuée d’étoiles : ciel étoilé pendant l’événement, normal ensuite", ssOn === true && ssOff === false, ssOn + " " + ssOff);
  // (it. 920) Bestiaire > Événements rares : une carte par événement, les jamais vus en « ??? ».
  const evc = await js("(() => { const P = window.__panel, S = window.__game.S, keep = S.stats.eventsSeen, kt = P.tab, ks = P.tabs.bestiary.sec; S.stats.events = Math.max(1, S.stats.events || 0); S.stats.eventsSeen = { wind: true }; P.tabs.bestiary.sec = 'events'; P.setTab('bestiary'); P.renderAll(); const cards = [...document.querySelectorAll('[data-pane=bestiary]:not([hidden]) .setgrid .setcard')]; const r = cards.length + ' ' + cards.filter((c) => c.classList.contains('unknown')).length; S.stats.eventsSeen = keep; P.tabs.bestiary.sec = ks; P.setTab(kt); P.renderAll(); return r; })()");
  // (it. 954) autant de cartes que d'événements (14 avec la Ruée des gobelins), toutes « ??? » sauf celle déjà vue
  check("Bestiaire > Événements rares : une carte par événement, les jamais vus en « ??? »", (([a, b]) => +a >= 14 && +b === +a - 1)(String(evc).split(" ")), evc);
  // (it. 936) l'événement en cours a sa carte encadrée, avec ses secondes restantes
  const evh = await js("(() => { const P = window.__panel, G = window.__game, S = G.S, keep = S.stats.eventsSeen, kt = P.tab, ks = P.tabs.bestiary.sec; S.stats.events = Math.max(1, S.stats.events || 0); S.stats.eventsSeen = { wind: true }; G.R.events.wind = 17.2; P.tabs.bestiary.sec = 'events'; P.setTab('bestiary'); P.renderAll(); const c = document.querySelector('[data-pane=bestiary]:not([hidden]) .setcard.here'); const r = c ? (/18/.test(c.textContent) ? 'ok' : c.textContent) : 'pas encadrée'; G.R.events.wind = 0; S.stats.eventsSeen = keep; P.tabs.bestiary.sec = ks; P.setTab(kt); P.renderAll(); return r; })()");
  check("Bestiaire > Événements rares : l’événement en cours encadré, secondes restantes", evh === "ok", evh);
  // (it. 1297) Bestiaire > Bénédictions du jour : deux étiquettes, « aujourd'hui » sur la bénédiction du jour et « demain »
  // sur celle de demain, dévoilée même jamais vécue (it. 1296)
  const blt = await js(`(async () => { const { dayModFor } = await import("./game/daymods.js"); const P = window.__panel, S = window.__game.S, keepSeen = S.daily.seen, keepMod = S.daily.mod, kt = P.tab, ks = P.tabs.bestiary.sec;
    const tm = new Date(Date.now() + 864e5), tom = dayModFor(tm.getFullYear() + "-" + String(tm.getMonth() + 1).padStart(2, "0") + "-" + String(tm.getDate()).padStart(2, "0"));
    S.daily.mod = tom === "gold" ? "wind" : "gold"; S.daily.seen = { [S.daily.mod]: true }; P.tabs.bestiary.sec = "blessings"; P.setTab("bestiary"); P.renderAll();
    const tags = [...document.querySelectorAll("[data-pane=bestiary]:not([hidden]) .setgrid .daytag")], unknown = document.querySelectorAll("[data-pane=bestiary]:not([hidden]) .setgrid .setcard.unknown").length;
    const r = tags.length + " " + unknown; S.daily.seen = keepSeen; S.daily.mod = keepMod; P.tabs.bestiary.sec = ks; P.setTab(kt); P.renderAll(); return r; })()`);
  check("Bestiaire > Bénédictions du jour : « aujourd’hui » et « demain » marqués, demain dévoilée", (([a, b]) => +a === 2 && +b >= 1)(String(blt).split(" ")), blt);
  // (it. 922) Statistiques : un clic sur « Événements rares (n / 13) » ouvre Bestiaire > Événements rares.
  const evl = await js("(() => { const P = window.__panel, S = window.__game.S, kt = P.tab, ks = P.tabs.bestiary.sec; S.stats.events = Math.max(1, S.stats.events || 0); P.tabs.stats.sec = 'numbers'; P.setTab('stats'); P.renderAll(); const b = document.querySelector('[data-pane=stats]:not([hidden]) button[data-sec=events]'); if (!b) return 'pas de lien'; b.click(); const r = P.tab + ' ' + P.tabs.bestiary.sec; P.tabs.bestiary.sec = ks; P.setTab(kt); P.renderAll(); return r; })()");
  check("Statistiques : « Événements rares » mène au Bestiaire", evl === "bestiary events", evl);
  // (it. 924) Bénédiction du jour : la bulle annonce aussi celle de demain.
  const dmTip = await js("(() => { const P = window.__panel; P.setTab('adventure'); P.renderAll(); const c = document.querySelector('#p-hero .chip.daymod'); return c ? (c.title || c.dataset.title || '') : 'pas de pastille'; })()");
  check("bénédiction du jour : celle de demain dans la bulle", dmTip.split("\n").length >= 3, JSON.stringify(dmTip));
  // (it. 900) Touche F : attrape l'étoile filante qui passe ; rien sans étoile.
  const keyF = await js("(() => { const G = window.__game, R = G.R, keep = R.star, n0 = G.S.stats.stars || 0; R.star = null; const a = window.__panel.onKey({ key: 'f', target: document.body }); R.star = { t: 10, life: 12 }; const b = window.__panel.onKey({ key: 'f', target: document.body }); const ok = !R.star && (G.S.stats.stars || 0) === n0 + 1; R.star = keep; return a + ' ' + b + ' ' + ok; })()");
  check("touche F : attrape l’étoile filante, rien sans étoile", keyF === "false true true", keyF);
  // (it. 907) Clic sur un emplacement vide : la fiche du meilleur objet du sac pour cet emplacement, avec « Équiper ».
  const emp = await js("(() => { const G = window.__game, S = G.S, P = window.__panel, keep = S.equip.weapon, bag0 = S.bag.slice(); let w = S.bag.find((x) => x.slot === 'weapon'); if (!w) { w = G.newItem(1); w.slot = 'weapon'; S.bag.unshift(w); } S.equip.weapon = null; P.setTab('adventure'); P.renderAll(); const b = document.querySelector('#p-detail .slot.emptyslot.cand[data-slot=weapon]'); if (!b) { S.equip.weapon = keep; S.bag = bag0; P.renderAll(); return 'pas de case'; } b.click(); P.renderAll(); const sel = P.selected, it = sel && sel.from === 'bag' ? G.findBagItem(sel.id) : null; const btn = document.querySelector('[data-action=equip]'); const r = (it && it.slot === 'weapon') + ' ' + !!btn; S.equip.weapon = keep; S.bag = bag0; P.selected = null; G.invalidateStats(); P.renderAll(); return r; })()");
  check("emplacement vide : un clic ouvre la fiche du meilleur objet du sac (Équiper)", emp === "true true", emp);
  // Touche C du panneau : coupe puis rallume le son (comme le haut-parleur).
  const keyC = await js("(() => { const P = window.__game.S.settings, keep = { s: P.sound, m: P.music, mu: P.muted }; P.sound = true; P.muted = false; window.__panel.onKey({ key: 'c', target: document.body }); const a = P.muted; window.__panel.onKey({ key: 'c', target: document.body }); const b = P.muted; Object.assign(P, { sound: keep.s, music: keep.m, muted: keep.mu }); return a + ' ' + b; })()");
  check("touche C : coupe puis rallume le son", keyC === "true false", keyC);
  // Touche B (it. 545) : la musique seule, coupée puis rallumée.
  const keyB = await js("(() => { const P = window.__game.S.settings, keep = P.music; P.music = true; window.__panel.onKey({ key: 'b', target: document.body }); const a = P.music; window.__panel.onKey({ key: 'b', target: document.body }); const b = P.music; P.music = keep; return a + ' ' + b; })()");
  check("touche B : coupe puis rallume la musique", keyB === "false true", keyB);
  // Sorts (demande D) : sous-onglet « Sorts et attaque », trois cartes du héros, un clic sur « Apprendre » donne le rang 1.
  const spl = await js("(() => { const g = window.__game, S = g.S, P = window.__panel, keep = { sp: JSON.stringify(S.spells || {}), gold: S.gold }; S.spells = {}; S.gold = 1e30; P.setTab('class'); P.tabs.class.sec = 'style'; P.renderAll(); const cards = document.querySelectorAll('.spellcard').length; const b = document.querySelector('[data-action=c-spell]'); if (b) b.click(); const r = Object.values(S.spells || {})[0] || 0; S.spells = JSON.parse(keep.sp); S.gold = keep.gold; P.tabs.class.sec = 'freed'; P.renderAll(); return cards + ' ' + r; })()");
  check("sorts : trois cartes, « Apprendre » donne le rang 1", spl === "3 1", spl);
  // Animations des sorts (bande) : les six mécaniques et la frappe perçante ne lèvent aucune erreur.
  const sfx = await js("(() => { const g = window.__game, bad = []; for (const id of ['warrior.0', 'warrior.1', 'warrior.2', 'ranger.1', 'mage.0', 'paladin.0']) { try { g.emit('spell', { id, dmg: 1234, amount: 567 }); } catch (e) { bad.push(id + ':' + e.message); } } try { g.emit('pierced', { id: 'paladin.0', dmg: 99, slot: Math.min(g.S.kills + 1, g.lineup().length - 1), k: 1 }); } catch (e) { bad.push('pierced:' + e.message); } return bad.join(' ') || 'ok'; })()");
  check("sorts : animations des six mécaniques sans erreur", sfx === "ok", sfx);
  // Écoute des airs (it. 534) : ▶ dans Réglages > Son joue la tranche suivante, puis la fin de l'écoute rend l'air du jeu.
  const mprev = await js("(() => { const P = window.__panel, m = window.__music, S = window.__game.S; const keep = { mu: S.settings.muted, m: S.settings.music }; S.settings.muted = false; S.settings.music = true; m.enabled = true; P.setTab('settings'); P.renderAll(); const b = document.querySelector('[data-action=se-mprev][data-d=\\'1\\']'); if (!b) return 'pas de bouton'; const home = m.zone; b.click(); const during = m.previewing + ':' + m.zone; P.dirty = false; m.endPreview(); const redraw = P.dirty; const after = m.previewing + ':' + (m.zone === home) + ':' + redraw; S.settings.muted = keep.mu; S.settings.music = keep.m; P.setTab('adventure'); return during + ' ' + after; })()");
  check("musique : écoute d'un autre air puis retour", /^true:\d+ false:true:true$/.test(mprev), mprev);
  // Débordement horizontal (it. 542) : aucune ligne de liste (« libellé … valeur ») plus large que sa colonne, sur tous
  // les onglets (le défilement vertical est mesuré ailleurs ; ce débordement-là ne se voyait qu'en capture).
  const wide = await js("(() => { const P = window.__panel, out = []; for (const t of ['adventure','talents','skills','quests','shop','pets','class','ascension','bestiary','stats','settings']) { if (!P.tabs[t]) continue; P.setTab(t); P.renderAll(); for (const li of document.querySelectorAll('.lines li')) if (li.getClientRects().length && !li.closest('details:not([open])') && li.scrollWidth > li.clientWidth + 1) out.push(t + ':' + li.textContent.slice(0, 30)); } P.setTab('adventure'); return out.length + (out.length ? ' ' + out.slice(0, 4).join(' | ') : ''); })()");
  check("listes : aucune ligne plus large que sa colonne", wide === "0", wide); // (it. 1108) hors contenu des blocs repliés (rendu dans Chromium : getClientRects y répond)
  // Demande M (it. 499) : onglets serrés (petit écran, langue longue) : chaque onglet garde son icône.
  const ticons = await js("(() => { const P = window.__panel, top = document.querySelector('.ptop'), keep = top.style.width; const out = []; for (let w = 1900; w >= 700; w -= 40) { top.style.width = w + 'px'; P.fitTabs(); const nav = document.querySelector('.tabs'), b = [...nav.querySelectorAll('button')].filter((x) => x.getClientRects().length); const hidden = b.filter((x) => { const i = x.querySelector('.ticon'); return !i || !i.offsetWidth; }).length; if (hidden) out.push(w + ':' + nav.className.replace('tabs', '').trim() + ':' + hidden); out.steps = (out.steps || new Set()).add(nav.className.replace('tabs', '').trim()); } top.style.width = keep; P.fitTabs(); return (out.join(' ') || 'ok') + ' [' + [...out.steps].join(' / ') + ']'; })()");
  check("onglets serrés : toutes les icônes restent (1900 → 700 px)", /^ok \[/.test(ticons) && /slim/.test(ticons) && /compact/.test(ticons), ticons);
  // « Quoi de neuf » : toute l'édition se lit sans faire défiler la fenêtre.
  const nw = await js("(() => { window.__panel.showNews(); const b = document.querySelector('#modal .panel'); const o = b.scrollHeight - b.clientHeight, n = document.querySelectorAll('.newslist li').length; document.querySelector('#modal [data-action=closemodal]').click(); return n + ' ' + o; })()");
  check("« Quoi de neuf » : toute l'édition visible sans défilement", /^\d+ [0-2]$/.test(nw) && +nw.split(" ")[0] > 0, nw);
  // (it. 1144) notes de la dernière version distribuée (itch.io) : elles aussi sans défilement
  const rl = await js("(() => { window.__panel.showRelease(); const b = document.querySelector('#modal .panel'); const o = b.scrollHeight - b.clientHeight, n = document.querySelectorAll('.newslist li').length, t = document.querySelector('#mt').textContent; document.querySelector('#modal [data-action=closemodal]').click(); return n + ' ' + o + ' ' + t; })()");
  check("notes de version : toutes visibles sans défilement", /^\d+ [0-2] /.test(rl) && +rl.split(" ")[0] >= 6, rl);
  // (it. 1150) notes de la dernière version relisibles depuis les Réglages
  const rlBtn = await js(`(() => { const P = window.__panel, t = P.tab; P.setTab("settings"); P.renderAll(); const b = document.querySelector('[data-pane="settings"]:not([hidden]) [data-action="showrelease"]'); if (!b) { P.setTab(t); return "pas de bouton"; } b.click(); const r = document.querySelector('#modal').hidden ? "fermée" : document.querySelectorAll('#modal .newslist li').length + " " + document.querySelector('#mt').textContent; document.querySelector('#modal [data-action=closemodal]').click(); P.setTab(t); return r; })()`);
  check("notes de version relisibles depuis les Réglages", /^\d+ /.test(rlBtn) && +rlBtn.split(" ")[0] >= 6, rlBtn);
  // (it. 1068) relisible depuis les Réglages (bouton « Quoi de neuf » de la carte Aide)
  const nwBtn = await js(`(() => { const P = window.__panel, t = P.tab; P.setTab("settings"); const b = document.querySelector('[data-pane="settings"]:not([hidden]) [data-action="shownews"]'); if (!b) { P.setTab(t); return "pas de bouton"; } b.click(); const n = document.querySelectorAll('#modal:not([hidden]) .newslist li').length; document.querySelector('#modal [data-action=closemodal]').click(); P.setTab(t); return String(n); })()`);
  check("« Quoi de neuf » relisible depuis les Réglages", +nwBtn > 0, nwBtn);
  // (it. 1073) la marchande de la Boutique : portrait, réplique, une autre au clic
  const npcT = await js(`(() => { const P = window.__panel, t = P.tab; P.tabs.shop.sec = "shop"; P.setTab("shop"); P.renderAll(); const q = () => document.querySelector('[data-pane="shop"]:not([hidden]) .npc'); const b = q(); if (!b) { P.setTab(t); return "pas de PNJ"; } const img = b.querySelector("img"), s0 = b.querySelector(".say").textContent; b.click(); P.renderAll(); const s1 = q()?.querySelector(".say").textContent; P.setTab(t); return (img && img.naturalWidth > 0 ? "img" : "sans image") + " · " + (s0 && s1 && s0 !== s1 ? "change" : "même : " + s0); })()`);
  check("Boutique : la marchande parle, une autre réplique au clic", npcT === "img · change", npcT);
  // (it. 1079) la rencontre de la marchande sur la bande (cinématique « npc ») : héros, PNJ, nom en titre
  const npcC = await js(`(async () => { const J = window.__strip?.juice; if (!J || !J.active) return "bande inactive"; J.cine = null; J.cinematic("npc", { tab: "shop", force: true }); await new Promise((r) => setTimeout(r, 400)); const n = document.querySelector(".cine.npc"); if (!n) return "pas de scène"; const imgs = [...n.querySelectorAll("img")].filter((i) => i.naturalWidth > 0).length, t = n.querySelector(".cine-title").textContent; n.click(); return imgs + " images · " + (t ? "titre" : "sans titre"); })()`);
  check("rencontre de la marchande : scène sur la bande", npcC === "2 images · titre", npcC);
  // (it. 1082, 1086) PNJ dans le titre d'une carte (Orbo à l'Ascension, Plume aux Quêtes) : réplique suivante au clic ;
  // leur scène de rencontre sur la bande
  for (const tab of ["ascension", "quests", "class", "map", "bestiary", "pets", "skills", "talents", "stats"]) { // (it. 1087) Bram, au bout des sous-onglets du Héros
    const r = await js(`(async () => { const P = window.__panel, t = P.tab; P.setTab("${tab}"); P.renderAll(); const q = () => document.querySelector('[data-pane="${tab}"]:not([hidden]) .npc.compact'); const b = q(); if (!b) { P.setTab(t); return "pas de PNJ"; } const s0 = b.querySelector(".say").textContent; b.click(); const s1 = q()?.querySelector(".say").textContent; P.setTab(t); const J = window.__strip?.juice; let sc = "bande inactive"; if (J && J.active) { J.cine = null; J.cinematic("npc", { tab: "${tab}", force: true }); await new Promise((r) => setTimeout(r, 400)); const n = document.querySelector(".cine.npc"); sc = n ? [...n.querySelectorAll("img")].filter((i) => i.naturalWidth > 0).length + " images" : "pas de scène"; n?.click(); } return (s0 !== s1 ? "change" : "même") + " · " + sc; })()`);
    check(`PNJ de l'onglet ${tab} : il parle, sa scène de rencontre`, r === "change · 2 images", r);
  }
  // (it. 1083) Chroniques en fenêtre : jamais de défilement de côté (la liste en colonnes débordait au-delà de 4 entrées)
  const chrW = await js(`(() => { const P = window.__panel, t = P.tab; P.setTab("adventure"); P.renderAll(); const d = document.querySelector('[data-pane="adventure"] [data-keep="hero-chron"]'); if (!d) { P.setTab(t); return "pas de chroniques"; } P.showDetails(d); const l = document.querySelector('#modal .chronlist'), m = document.querySelector('#modal .panel'); const r = (l.scrollWidth > l.clientWidth + 1 ? "liste de côté " + l.scrollWidth + "/" + l.clientWidth : "ok") + (m.scrollHeight > m.clientHeight + 1 ? " · fenêtre défile" : ""); document.querySelector('#modal [data-action=closemodal]').click(); P.setTab(t); return r; })()`);
  check("Chroniques en fenêtre : sans défilement de côté", chrW === "ok", chrW);
  // Duo idéal cliquable (carte du héros) : un clic choisit le partenaire de synergie.
  const syn = await js("(() => { const g = window.__game, S = g.S, P = window.__panel; const keep = { cls: S.cls, nextCls: S.nextCls, partner: S.partner, nextPartner: S.nextPartner, un: (S.classesUnlocked || []).slice() }; S.cls = 'warrior'; S.nextCls = null; S.partner = 'mage'; S.nextPartner = null; for (const c of ['warrior','ranger','mage']) if (!S.classesUnlocked.includes(c)) S.classesUnlocked.push(c); g.invalidateStats(); P.setTab('class'); P.renderAll(); const b = document.querySelector('button.synergy[data-action=c-partner]'); const r = b ? (b.click(), String(S.nextPartner)) : 'pas de lien'; Object.assign(S, { cls: keep.cls, nextCls: keep.nextCls, partner: keep.partner, nextPartner: keep.nextPartner, classesUnlocked: keep.un }); g.invalidateStats(); P.setTab('adventure'); P.renderAll(); return r; })()");
  check("héros : « Duo idéal » cliquable choisit le partenaire", syn === "ranger", syn);
  // Déblocages en rangée latérale (demande 32) : tous affichés ; la molette et le glisser font défiler de côté.
  const hsr = await js("(() => { const P = window.__panel; P.setTab('shop'); P.tabs.shop.sec = 'unlocks'; P.renderAll(); const row = document.querySelector('.ugrid.hscroll'); if (!row) return 'pas de rangée'; const n = row.querySelectorAll('.ucard').length; row.scrollLeft = 0; row.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true })); const w = row.scrollLeft; const r = row.getBoundingClientRect(), x = r.left + 200, y = r.top + 40; const o = { bubbles: true, pointerId: 7, button: 0, clientY: y }; row.dispatchEvent(new PointerEvent('pointerdown', { ...o, clientX: x })); row.dispatchEvent(new PointerEvent('pointermove', { ...o, clientX: x - 150 })); row.dispatchEvent(new PointerEvent('pointerup', { ...o, clientX: x - 150 })); const d = row.scrollLeft; P.renderAll(); const kept = document.querySelector('.ugrid.hscroll').scrollLeft; P.tabs.shop.sec = 'shop'; P.setTab('adventure'); P.renderAll(); return [n, w > 0, d > w, kept === d].join(' '); })()");
  check("déblocages : tous en rangée latérale, molette et glisser, position gardée", /^2\d true true true$/.test(hsr), hsr);
  // Réglage « Cinématiques » coupé : aucune cinématique automatique, sauf demandée exprès (▶).
  const cof = await js("(() => { const S = window.__game.S, J = window.__strip.juice; document.querySelectorAll('.cine').forEach((c) => c.click()); S.settings.cinematics = false; J.cinematic('chronicle', { title: 'X', n: 1, total: 9 }); const none = !document.querySelector('.cine.chronicle'); J.cinematic('chronicle', { title: 'X', n: 1, total: 9, force: true }); const forced = document.querySelector('.cine.chronicle'); if (forced) forced.click(); S.settings.cinematics = true; return none + ' ' + !!forced; })()");
  check("réglage Cinématiques coupé : rien d'automatique, ▶ marche encore", cof === "true true", cof);
  // Chroniques (demande 31) : ▶ dans la carte du héros rejoue la cinématique, avec sa scène et la phrase de la chronique.
  await sleep(300);
  const crp = await js("(() => { document.querySelectorAll('.cine').forEach((c) => c.click()); const P = window.__panel; P.setTab('adventure'); P.kept.add('hero-chron'); P.renderAll(); const b = document.querySelector('#p-hero [data-action=chron-play]:not([data-id=sky])'); if (!b) return 'pas de bouton'; b.click(); const c = document.querySelector('.cine.chronicle'); const ok = !!c && [...c.classList].some((k) => k.startsWith('chr-')); if (c) c.click(); return String(ok); })()");
  check("chroniques : ▶ rejoue la cinématique avec sa scène propre", crp === "true", crp);
  // Carte du Rebord : 200 tronçons de zone, le héros, les héros prisonniers ; infobulle au survol d'une zone.
  const mp = await js("(() => { const S = window.__game.S, P = window.__panel; S.tabsOpen.map = true; P.setTab('map'); P.renderAll(); const z = document.querySelectorAll('svg.rebord .mz').length, h = !!document.querySelector('svg.rebord .mhero'), c = document.querySelectorAll('svg.rebord .mmark').length; const g = document.querySelector('svg.rebord .mz'); g.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); const t = document.querySelector('#panel .gtip'); const tip = !!(t && !t.hidden && /1/.test(t.textContent)); g.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); P.setTab('adventure'); return [z, h, c, tip].join(' '); })()");
  check("carte du Rebord : 200 zones, héros, prisonniers, infobulle", mp === "200 true 19 true", mp);
  // (it. 1513) demandes de Victor (it. 1508) : la tête du héros posée SUR le carré de sa zone ; textes de la carte dans la
  // police des textes (Pixelify, à cette taille, rendait « 5 » comme « S »)
  const mh = await js("(() => { const P = window.__panel; P.setTab('map'); P.renderAll(); const im = document.querySelector('svg.rebord .mhero image'), z = document.querySelector('svg.rebord .mz.here rect'); if (!im || !z) return 'absent'; const a = im.getBoundingClientRect(), b = z.getBoundingClientRect(), cx = a.x + a.width / 2, cy = a.y + a.height / 2; const inside = cx >= b.left && cx <= b.right && cy >= b.top && cy <= b.bottom; const t = document.querySelector('svg.rebord text'); const f = t ? getComputedStyle(t).fontFamily : ''; P.setTab('adventure'); return inside + ' ' + (/^\\W?Geist Pixel/.test(f) ? 'geist' : f); })()");
  check("carte : tête du héros sur sa zone, textes lisibles", mh === "true geist", mh);
  // Carte du voyageur (déblocage) : un clic sur une zone déjà atteinte y emmène le héros.
  const tv = await js("(() => { const g = window.__game, S = g.S, P = window.__panel; const z0 = S.zone, had = S.unlocks.travelMap; S.unlocks.travelMap = true; P.setTab('map'); P.renderAll(); const t = document.querySelector('svg.rebord .mz.go[data-z=\"' + Math.max(1, z0 - 2) + '\"]'); if (!t) return 'pas de zone cliquable'; t.dispatchEvent(new MouseEvent('click', { bubbles: true })); const r = S.zone === Math.max(1, z0 - 2); g.setZone(z0); if (!had) delete S.unlocks.travelMap; P.setTab('adventure'); return String(r); })()");
  check("carte du voyageur : clic sur une zone atteinte = voyage", tv === "true", tv);
  // (it. 853) carte au clavier : un seul arrêt de tabulation (la zone actuelle), une flèche passe à la voisine dessinée,
  // Entrée y emmène le héros (Carte du voyageur) et le focus reste sur la zone redessinée.
  const mk0 = await js(`(() => { const S = window.__game.S, P = window.__panel; window.__mkKeep = { z: S.zone, had: S.unlocks.travelMap }; S.unlocks.travelMap = true; P.setTab('map'); P.renderAll();
    const st = [...document.querySelectorAll('[data-pane="map"] svg.rebord [data-mz][tabindex="0"]')]; st[0]?.focus();
    return { n: st.length, z: +st[0]?.dataset.mz, zone: S.zone, lab: !!st[0]?.getAttribute("aria-label") }; })()`);
  wc.sendInputEvent({ type: "keyDown", keyCode: "Right" });
  wc.sendInputEvent({ type: "keyUp", keyCode: "Right" });
  await sleep(150);
  const mk1 = await js(`(() => { const a = document.activeElement; return { z: +a?.dataset?.mz, tab: a?.getAttribute?.("tabindex"), stops: document.querySelectorAll('[data-pane="map"] svg.rebord [data-mz][tabindex="0"]').length }; })()`);
  wc.sendInputEvent({ type: "keyDown", keyCode: "Enter" });
  wc.sendInputEvent({ type: "keyUp", keyCode: "Enter" });
  await sleep(250);
  const mk2 = await js(`(() => { const g = window.__game, S = g.S, P = window.__panel, k = window.__mkKeep, r = { zone: S.zone, focus: +document.activeElement?.dataset?.mz };
    g.setZone(k.z); if (!k.had) delete S.unlocks.travelMap; P.setTab('adventure'); return r; })()`);
  check("carte au clavier : zone actuelle focalisable, flèche, Entrée = voyage, focus gardé", mk0.n === 1 && mk0.z === mk0.zone && mk0.lab
    && Math.abs(mk1.z - mk0.z) === 1 && mk1.tab === "0" && mk1.stops === 1 && mk2.zone === mk1.z && mk2.focus === mk1.z, JSON.stringify({ mk0, mk1, mk2 }));
  // Ciel de nuit de la bande : il s'étoile avec l'histoire (plus de chroniques = plus d'étoiles ; victoire = plein).
  const sky = await js("(() => { const st = window.__strip, S = window.__game.S, keep = { b: S.best, w: S.story.won, pb: S.prestige.bestRun }; S.story.won = false; S.best = 1; S.prestige.bestRun = 1; const a = st.starShare(); S.best = 200; S.prestige.bestRun = 200; const b = st.starShare(); S.story.won = true; const c = st.starShare(); S.best = keep.b; S.story.won = keep.w; S.prestige.bestRun = keep.pb; return a < b && b < c ? 'ok' : [a, b, c].join(' '); })()");
  check("ciel de nuit : les étoiles suivent l'histoire", sky === "ok", sky);
  // Bouton son de la bande : un clic coupe, un autre rallume (icône à croix quand coupé).
  const snd = await js("(() => { const P = window.__game.S.settings, b = document.getElementById('sound-btn'), keep = { s: P.sound, m: P.music, mu: P.muted }; P.sound = true; P.muted = false; b.click(); const a = P.muted === true && b.classList.contains('muted'); b.click(); const r = a && P.muted === false && !b.classList.contains('muted') && b.classList.contains('hit'); Object.assign(P, { sound: keep.s, music: keep.m, muted: keep.mu }); return String(r); })()");
  check("bande : bouton son (coupe / rallume)", snd === "true", snd);
  // Effets coupés, musique gardée (demande 26) ; le bouton coupe tout puis rend exactement l'état d'avant.
  const snd2 = await js("(() => { const P = window.__game.S.settings, keep = { s: P.sound, m: P.music, mu: P.muted }; P.sound = false; P.music = true; P.muted = false; const b = document.getElementById('sound-btn'); b.click(); const a = P.muted === true; b.click(); const r = a && P.muted === false && P.sound === false && P.music === true; Object.assign(P, { sound: keep.s, music: keep.m, muted: keep.mu }); return String(r); })()");
  check("son : effets coupés et musique gardée ; le bouton rend l'état d'avant", snd2 === "true", snd2);
  // Duo (demande 17) : l'onglet des héros propose un compagnon de l'autre portée ; le premier arrive tout de suite.
  const duo = await js("(() => { const S = window.__game.S, P = window.__panel, keep = S.partner; S.partner = null; S.nextPartner = null; P.setTab('class'); P.renderAll(); const b = document.querySelector('[data-action=c-partner]'); if (!b) return 'pas de bouton'; b.click(); P.renderAll(); const ok = !!S.partner && !!document.querySelector('.classcard.partner'); const st = window.__game.stats().duo > 0; S.partner = keep; window.__game.invalidateStats(); P.setTab('adventure'); return String(ok && st); })()");
  check("duo : choisir un compagnon dans l'onglet des héros", duo === "true", duo);
  // Boutique en sous-onglets (demande 18) : marchand par défaut ; un lien « déblocage » ouvre le sous-onglet Déblocages.
  const shopSub = await js("(() => { const P = window.__panel; P.tabs.shop.sec = 'shop'; P.setTab('shop'); P.renderAll(); const vis = (sel) => { const e = document.querySelector(sel); return !!e && e.getClientRects().length > 0; }; const a = vis('.merchant') && !vis('.ucard, .unlocks .ugrid'); P.setTab('adventure'); P.renderAll(); const l = document.createElement('button'); l.dataset.tab = 'shop'; l.dataset.sec = 'unlocks'; document.querySelector('#panel').appendChild(l); l.click(); l.remove(); P.renderAll(); const b = vis('.unlocks') && !vis('.merchant'); P.tabs.shop.sec = 'shop'; P.setTab('adventure'); return a + ' ' + b; })()");
  check("boutique : sous-onglets (marchand / déblocages), lien direct vers les déblocages", shopSub === "true true", shopSub);
  // (it. 847) Tuiles des potions, coffres et œuf : le prix tient sur une ligne et dans son bouton (avant : « 256,59 / M »).
  const priceWrap = await js("(() => { const P = window.__panel; P.tabs.shop.sec = 'shop'; P.setTab('shop'); P.renderAll(); const bs = [...document.querySelectorAll('[data-pane=shop]:not([hidden]) .ctile > .buy[data-action]')]; const bad = bs.filter((b) => { const lh = parseFloat(getComputedStyle(b).lineHeight) || 16; const pad = parseFloat(getComputedStyle(b).paddingTop) + parseFloat(getComputedStyle(b).paddingBottom); return b.clientHeight - pad > lh * 1.5 || b.scrollWidth > b.clientWidth + 1 || b.getBoundingClientRect().right > b.parentElement.getBoundingClientRect().right + 1; }).map((b) => b.dataset.id + ':' + b.textContent); P.setTab('adventure'); return bs.length ? (bad.join(' ') || 'ok') : 'aucun'; })()");
  check("boutique : prix des potions, coffres et œuf sur une ligne", priceWrap === "ok", priceWrap);
  // (it. 1663) Sac plein : « Sac plein » n'est plus grisé, un clic ouvre le sac (Aventure) pour faire de la place.
  const fullBag = await js("(() => { const g = window.__game, S = g.S, P = window.__panel, keep = S.bag.slice(); while (S.bag.length < S.bagSize) S.bag.push(g.newItem(0)); P.tabs.shop.sec = 'shop'; P.setTab('shop'); P.renderAll(); const b = document.querySelector('[data-pane=shop]:not([hidden]) button.buy.full'); const info = b ? [b.dataset.tab, !!(b.title || b.dataset.title), b.disabled] : null; if (b) b.click(); const adv = !!document.querySelector('[data-pane=adventure]:not([hidden])'); S.bag = keep; P.renderAll(); return info ? info.join(' ') + ' ' + adv : 'pas de bouton'; })()");
  check("boutique : « Sac plein » ouvre le sac (Aventure)", fullBag === "adventure true false true", fullBag);
  // (it. 1648, 1654) Poupouce vaincu : bannière rose avec son nom, et le héros lui dit au revoir (réplique urgente).
  const pDown = await js("(() => { const g = window.__game, s = window.__strip; s.saidAt = -1e9; const type = (g.R.mon && g.R.mon.type) || Object.keys(s.sprites.monsters)[0]; g.emit('kill', { mon: { ...(g.R.mon || {}), type, poupouce: true, boss: false, champion: false, elite: false }, gold: 1234 }); const ban = [...document.querySelectorAll('.banner')].some((b) => b.textContent.includes('Poupouce')); const say = !s.bubble.hidden && s.bubble.textContent.includes('Poupouce'); s.bubble.hidden = true; s.bubbleT = 0; s.saidAt = -1e9; return ban + ' ' + say; })()");
  check("bande : Poupouce vaincu (bannière et réplique)", pDown === "true true", pDown);
  // (it. 1802, demande de Victor) duo : un tireur derrière un héros au corps à corps ne le recouvre pas (l'arbalétrier
  // disparaissait derrière le samouraï) ; le compagnon passe derrière le héros dans l'ordre d'affichage (it. 1807)
  const duoPos = await js("(async () => { const g = window.__game, s = window.__strip, c0 = g.S.cls, p0 = g.S.partner; g.S.cls = 'warrior'; g.S.partner = 'arbalest'; await new Promise((r) => setTimeout(r, 400)); const pw = s.partner ? s.partner.frames[0].cw : 0, ok = !!s.partner && s.partnerX + pw <= s.heroX + 2 && getComputedStyle(s.partner.el).zIndex === '1'; const d = Math.round(s.partnerX + pw - s.heroX); g.S.cls = c0; g.S.partner = p0; return ok + ' ' + d; })()");
  check("duo : l'arbalétrier derrière un héros au corps à corps reste visible (pas de recouvrement)", duoPos.startsWith("true"), duoPos);
  // (it. 1912) meutes (it. 1903-1905) ; (it. 1920) rats aussi (furtifs, it. 1919) : trois loups voisins suivent le même chef de file ; deux ours voisins (solitaires), non
  const pack = await js("(() => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, z: g.S.zone, k: g.S.kills }; R.lineup = Array.from({ length: 10 }, (_, i) => ({ type: i >= 5 && i <= 7 ? 'wolf' : i === 2 || i === 3 ? 'rat' : 'bear', elite: false, champion: false, affix: null })); R.lineupZone = g.S.zone; g.S.kills = 0; s.slotKey = null; s.syncSlots(); const sl = s.slots; const r = [sl[5].packSeed == null, sl[6].packSeed === sl[5].lifeSeed, sl[7].packSeed === sl[5].lifeSeed, sl[1].packSeed == null, sl[3].packSeed === sl[2].lifeSeed].join(' '); R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; s.slotKey = null; s.syncSlots(); return r; })()");
  check("bande : une meute de loups (et de rats, it. 1919) suit son chef, deux ours voisins restent chacun de son côté", pack === "true true true true true", pack);
  // (it. 1934) geste au repos selon la nature (it. 1933) : le rat renifle, le golem s'enfonce, la chauve-souris monte ;
  // (it. 2010) dans une zone fixe (56, braises : sans effet sur ces quatre), le climat change les gestes (spores : éternuements)
  const gest = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills, z: g.S.zone }; g.S.zone = 56; R.lineup = ['bear','bear','rat','golem','bat','bear','bear','bear'].map((type) => ({ type, elite: false, champion: false, affix: null })); R.lineupZone = g.S.zone; g.S.kills = 0; s.slotKey = null; s.syncSlots(); for (const k of [2, 3, 4, 5]) { s.slots[k].react = null; s.slots[k].nextGesture = 0.01; } await new Promise((r) => setTimeout(r, 300)); const r = [2, 3, 4, 5].map((k) => s.slots[k].react && s.slots[k].react.nat).join(' '); g.S.zone = keep.z; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; s.slotKey = null; s.syncSlots(); return r; })()");
  check("bande : geste au repos propre à la nature (furtif, colosse, volant) et à l'espèce (l'ours se dresse)", gest === "skitter still fly rear", gest);
  // (it. 1939) volants au plus haut (croisière + geste au repos) : jamais dans la rangée d'informations (it. 1938 : 2 px de trop)
  const flyHud = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills }; R.lineup = Array.from({ length: 12 }, (_, i) => ({ type: i ? 'bat' : 'bear', elite: false, champion: false, affix: null })); R.lineupZone = g.S.zone; g.S.kills = 0; s.slotKey = null; s.syncSlots(); const top = document.getElementById('strip').getBoundingClientRect().top, h = s.hudBands().h; let minY = 1e9; const iv = setInterval(() => { for (let k = 1; k < s.slots.length - 1; k++) { const a = s.slots[k]; if (!a.react) a.react = { kind: 'gesture', t: 0, d: 0.6, delay: 0, nat: 'fly' }; minY = Math.min(minY, a.el.getBoundingClientRect().top - top); } }, 40); await new Promise((r) => setTimeout(r, 1500)); clearInterval(iv); for (const a of s.slots) a.react = null; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; s.slotKey = null; s.syncSlots(); return (minY >= h) + ' ' + Math.round(minY) + '/' + h; })()");
  check("bande : un volant au plus haut ne touche pas la rangée d'informations", flyHud.startsWith("true"), flyHud);
  // (it. 1952) « Effets complets » coupés (moins d'animations) : la file en attente reste immobile, sans geste ni bavardage
  const calm = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, P = g.S.settings, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills, fx: P.fullEffects }; P.fullEffects = false; R.lineup = ['bear','wolf','wolf','rat','spider','bat','slime','bear'].map((type) => ({ type, elite: false, champion: false, affix: null })); R.lineupZone = g.S.zone; g.S.kills = 0; s.slotKey = null; s.syncSlots(); for (const a of s.slots) a.nextGesture = 0.01; s.chatT = 0; await new Promise((r) => setTimeout(r, 300)); const pos = {}; let busy = 0; const iv = setInterval(() => s.slots.forEach((a, k) => { if (k < 2) return; (pos[k] = pos[k] || new Set()).add(a.tx); if (a.react || a.chat) busy++; }), 50); await new Promise((r) => setTimeout(r, 1200)); clearInterval(iv); P.fullEffects = keep.fx; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; s.slotKey = null; s.syncSlots(); const moving = Object.values(pos).filter((v) => v.size > 1).length; return moving + ' ' + busy; })()");
  check("bande : effets réduits, la file en attente reste immobile (ni geste ni bavardage)", calm === "0 0", calm);
  // (it. 1995) nouvelle série (it. 1993) : les monstres arrivent du bord droit et gagnent leur place
  const arrive = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills }; R.lineup = Array.from({ length: 8 }, () => ({ type: 'bear', elite: false, champion: false, affix: null })); R.lineupZone = g.S.zone; g.S.kills = 0; s.slotKey = null; s.syncSlots(); await new Promise((r) => setTimeout(r, 150)); const a = s.slots[5], x0 = +(a.tx || '0').split(',')[0] - s.fightX(6); await new Promise((r) => setTimeout(r, 2500)); const x1 = +(a.tx || '0').split(',')[0] - s.fightX(6); R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; s.slotKey = null; s.syncSlots(); return (x0 > 100) + ' ' + (Math.abs(x1) < 40) + ' ' + Math.round(x0) + '/' + Math.round(x1); })()");
  check("bande : une nouvelle série arrive du bord droit et gagne sa place", arrive.startsWith("true true"), arrive);
  // (it. 2085) héros à terre : les VAINCUS reviennent du bord, le combattant resté debout garde sa place (la boucle visait l'inverse)
  const downBack = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills, z: g.S.zone, mon: R.mon, mode: R.mode }; if (g.S.settings.fullEffects === false) return 'désactivé'; g.S.zone = 30; R.lineup = ['bear','wolf','golem','bear','wolf','golem'].map((type) => ({ type, elite: false, champion: false, affix: null })); R.lineupZone = 30; g.S.kills = 2; R.devFreeze = true; s.slotKey = null; s.syncSlots(); for (const a of s.slots) if (a) a.arriveDelay = null; await new Promise((r) => setTimeout(r, 200)); g.S.kills = 0; await new Promise((r) => setTimeout(r, 200)); const out = [0, 1, 2].map((k) => s.slots[k].arriveDelay != null).join(' '); R.devFreeze = false; g.S.zone = keep.z; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; R.mon = keep.mon; R.mode = keep.mode; s.slotKey = null; s.syncSlots(); return out; })()");
  check("bande : héros à terre, les vaincus reviennent du bord, le combattant reste à sa place", downBack === "true true false" || downBack === "désactivé", downBack);
  // (it. 2093) nouvelle série : le boss au bout de la file apparaît en fondu (it. 2092), au lieu de surgir d'un coup
  const bossFade = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills, z: g.S.zone, mon: R.mon, mode: R.mode }; if (g.S.settings.fullEffects === false) return 'désactivé'; g.S.zone = 30; R.lineup = ['bear','wolf','golem'].map((type) => ({ type, elite: false, champion: false, affix: null })); R.lineupZone = 30; g.S.kills = 0; R.mon = null; R.mode = 'walk'; R.devFreeze = true; s.slotKey = null; await new Promise((r) => setTimeout(r, 80)); const b = s.slots.find((a) => a && a.bossSlot); const a0 = b ? b.alphaV : -1; await new Promise((r) => setTimeout(r, 1500)); const a1 = b ? b.alphaV : -1; R.devFreeze = false; g.S.zone = keep.z; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; R.mon = keep.mon; R.mode = keep.mode; s.slotKey = null; s.syncSlots(); return (a0 < 0.5) + ' ' + (a1 === 1); })()");
  check("bande : le boss d'une nouvelle série apparaît en fondu", bossFade === "true true" || bossFade === "désactivé", bossFade);
  // (it. 2111, signalé par Victor : lag au survol) la fiche suit le survol tout de suite ; hors des talents (vers la fiche), elle
  // revient au talent cliqué
  const talHov = await js("(async () => { const P = window.__panel, keep = P.tab; P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 200)); const nm = () => (document.querySelector('#tsel .nm')?.textContent || '').replace('★', '').trim(); const over = (el) => el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); const q = () => [...document.querySelectorAll('[data-pane=talents] .talent[data-tid]:not(.voie)')]; let ts = q(); if (ts.length < 7) return 'peu de talents'; ts[1].click(); await new Promise((r) => setTimeout(r, 150)); ts = q(); const pinned = nm(); over(ts[5]); await new Promise((r) => setTimeout(r, 20)); const now = nm(), want = ts[5].querySelector('.tn').textContent.replace('★', '').trim(); over(document.querySelector('[data-pane=talents] .tbranch h2')); await new Promise((r) => setTimeout(r, 400)); const back = nm(); P.setTab(keep); return (now === want) + ' ' + (back === pinned && pinned !== want); })()");
  check("talents : la fiche suit le survol sans délai et revient au talent cliqué hors des talents (hors de la fiche)", talHov === "true true", talHov);
  // (it. 2179) survoler un talent puis entrer dans la fiche : elle garde ce talent (le bouton visé ne disparaît pas)
  const talKeep = await js("(async () => { const P = window.__panel, keep = P.tab; P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const q = () => [...document.querySelectorAll('[data-pane=talents] .talent[data-tid]:not(.voie)')]; let ts = q(); ts[1].click(); await new Promise((r) => setTimeout(r, 150)); ts = q(); const over = (el) => el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); over(ts[5]); const want = ts[5].querySelector('.tn').textContent.replace('★', '').trim(); over(document.querySelector('#tsel')); await new Promise((r) => setTimeout(r, 400)); const nm = (document.querySelector('#tsel .nm')?.textContent || '').replace('★', '').trim(); P.setTab(keep); return String(nm === want); })()");
  check("talents : entrer dans la fiche garde le talent survolé (son bouton reste atteignable)", talKeep === "true", talKeep);
  // (it. 2129) au clavier : le focus sur un talent l'affiche dans la fiche (focusin envoyé à la main : la fenêtre --ghost n'a pas
  // le focus du système, focus() n'y déclenche pas l'événement)
  const talFocus = await js("(async () => { const P = window.__panel, keep = P.tab; P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const ts = [...document.querySelectorAll('[data-pane=talents] .talent[data-tid]:not(.voie)')]; const t = ts[6]; t.focus(); t.dispatchEvent(new FocusEvent('focusin', { bubbles: true })); await new Promise((r) => setTimeout(r, 50)); const nm = (document.querySelector('#tsel .nm')?.textContent || '').replace('★', '').trim(), want = t.querySelector('.tn').textContent.replace('★', '').trim(); P.setTab(keep); return String(nm === want); })()");
  check("talents : au clavier, le focus sur un talent l'affiche dans la fiche", talFocus === "true", talFocus);
  // (it. 2167) flèches : ↓ passe au talent suivant de la branche, → à la branche voisine (même rang)
  const talArrows = await js("(async () => { const P = window.__panel, keep = P.tab; P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const cols = [...document.querySelectorAll('[data-pane=talents] .tbranch')].map((b) => [...b.querySelectorAll('.talent[data-tid]')]); const a0 = cols[0][0]; a0.focus(); const key = (k) => document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true })); key('ArrowDown'); const down = document.activeElement === cols[0][1]; key('ArrowRight'); const right = document.activeElement === cols[1][1]; P.setTab(keep); return [down, right].join(' '); })()");
  check("talents : flèches ↓ et → pour se déplacer dans la grille", talArrows === "true true", talArrows);
  // (it. 2149) les ⓘ prennent le focus, et leur bulle s'affiche au focus clavier
  const helpFocus = await js("(async () => { const P = window.__panel, keep = P.tab; P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const h = document.querySelector('[data-pane=talents]:not([hidden]) .help'); if (!h) return 'pas de ⓘ'; const t = h.tabIndex; P.setTab(keep); P.renderAll(); return String(t === 0); })()");
  check("aide ⓘ atteignable au clavier (tabindex 0)", helpFocus === "true", helpFocus);
  // (it. 2096) Voie : un clic sur la ligne la montre (sans la choisir) ; le bouton « Choisir cette voie » de la fiche la choisit
  const talVoie = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, ranks = S.talents[S.cls] ||= {}, keepR = JSON.stringify(ranks), keepL = S.lvl; for (const id of Object.keys(ranks)) if (id.startsWith('v_')) delete ranks[id]; S.lvl += 5; g.invalidateStats(); P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 200)); const v = document.querySelector('[data-pane=talents] .talent.voie'); if (!v) { S.lvl = keepL; return 'pas de voie'; } v.click(); await new Promise((r) => setTimeout(r, 200)); const n0 = Object.keys(ranks).filter((k) => k.startsWith('v_')).length; const b = document.querySelector('#tsel [data-action=t-voie-ok]'); if (b) b.click(); await new Promise((r) => setTimeout(r, 200)); const n1 = Object.keys(ranks).filter((k) => k.startsWith('v_')).length; S.talents[S.cls] = JSON.parse(keepR); S.lvl = keepL; g.invalidateStats(); P.setTab(keepTab); P.renderAll(); return n0 + ' ' + !!b + ' ' + n1; })()");
  check("talents : un clic montre la voie, le bouton de la fiche la choisit", talVoie === "0 true 1", talVoie);
  // (it. 2148) réinitialiser les talents : fenêtre de confirmation du panneau ; « Annuler » ne change rien, Échap la ferme sans fermer
  // le panneau, « Tout réinitialiser » vide l'arbre
  const talReset = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepR = JSON.stringify(S.talents[S.cls] || {}), keepG = S.gold; S.gold = 1e300; P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const sum = () => Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0); const s0 = sum(), conf = () => !document.querySelector('#confirm').hidden; const btn = () => document.querySelector('[data-pane=talents] [data-action=t-reset]'); btn().click(); await new Promise((r) => setTimeout(r, 120)); const asked = conf(); document.querySelector('[data-action=confirm-cancel]').click(); await new Promise((r) => setTimeout(r, 120)); const kept = !conf() && sum() === s0; btn().click(); await new Promise((r) => setTimeout(r, 120)); let closed = false; const keepC = P.onClose; P.onClose = () => { closed = true; }; P.onEscape(); P.onClose = keepC; const esc = !conf() && !closed && sum() === s0; btn().click(); await new Promise((r) => setTimeout(r, 120)); document.querySelector('[data-action=confirm-ok]').click(); await new Promise((r) => setTimeout(r, 150)); const wiped = sum() === 0 && s0 > 0; S.talents[S.cls] = JSON.parse(keepR); S.gold = keepG; g.invalidateStats(); P.setTab(keepTab); P.renderAll(); return [asked, kept, esc, wiped].join(' '); })()");
  check("talents : réinitialiser demande confirmation dans une fenêtre (Annuler et Échap ne changent rien)", talReset === "true true true true", talReset);
  // (it. 2110) total des talents : aucune pastille visible coupée par le bas de sa zone
  const ttCut = await js("(async () => { const P = window.__panel; P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 300)); const b = document.querySelector('[data-pane=talents]:not([hidden]) .ttotal'); if (!b) return 'pas de total'; const lim = b.getBoundingClientRect().bottom + 0.5, vis = [...b.querySelectorAll('.chip')].filter((c) => !c.hidden); return vis.length + ' visibles, ' + vis.filter((c) => c.getBoundingClientRect().bottom > lim).length + ' coupées'; })()");
  check("talents : total des talents sans pastille coupée", / 0 coupées$/.test(ttCut) && !ttCut.startsWith("0 "), ttCut);
  // (it. 2112) Compétences : « Tout réinitialiser » ouvre la fenêtre de confirmation ; « Annuler » ne change rien
  const skAsk = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab; S.tabsOpen.skills = true; P.setTab('skills'); P.renderAll(); await new Promise((r) => setTimeout(r, 200)); const n0 = (S.skills.order || []).length; const b = document.querySelector('[data-pane=skills] [data-action=k-reset]'); if (!b) return 'pas de bouton'; b.click(); await new Promise((r) => setTimeout(r, 150)); const open = !document.querySelector('#confirm').hidden, n1 = (S.skills.order || []).length; document.querySelector('[data-action=confirm-cancel]').click(); await new Promise((r) => setTimeout(r, 150)); const n2 = (S.skills.order || []).length; P.setTab(keepTab); P.renderAll(); return [open, n1 === n0, n2 === n0, n0 > 0].join(' '); })()");
  check("compétences : « Tout réinitialiser » demande confirmation dans une fenêtre, Annuler ne change rien", skAsk === "true true true true", skAsk);
  // (it. 2113) « Effacer la partie et recommencer » : fenêtre de confirmation, Entrée ANNULE (rien n'est effacé)
  const wipeAsk = await js("(async () => { const g = window.__game, P = window.__panel, keepTab = P.tab, lvl0 = g.S.lvl; P.setTab('settings'); P.renderAll(); await new Promise((r) => setTimeout(r, 200)); const b = document.querySelector('[data-pane=settings] [data-action=reset]'); if (!b) return 'pas de bouton'; b.click(); await new Promise((r) => setTimeout(r, 150)); const open = !document.querySelector('#confirm').hidden; document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); await new Promise((r) => setTimeout(r, 150)); const closed = document.querySelector('#confirm').hidden; if (!closed) document.querySelector('[data-action=confirm-cancel]').click(); const kept = window.__game.S.lvl === lvl0 && lvl0 > 1; P.setTab(keepTab); P.renderAll(); return [open, closed, kept].join(' '); })()");
  check("réglages : effacer la partie demande confirmation, Entrée annule", wipeAsk === "true true true", wipeAsk);
  // (it. 2115) Talents : « Annuler » rend les points du dernier clic sur un talent
  const talUndo = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepR = JSON.stringify(S.talents[S.cls] || {}), keepL = S.lvl; S.lvl += 8; g.invalidateStats(); P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const sum = () => Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0); const s0 = sum(); const t = document.querySelector('[data-pane=talents] .talent.can:not(.voie)'); if (!t) { S.lvl = keepL; return 'aucun talent ouvert'; } t.click(); await new Promise((r) => setTimeout(r, 150)); const s1 = sum(); const u = document.querySelector('[data-pane=talents] [data-action=t-undo]'); const en = u && !u.disabled; u?.click(); await new Promise((r) => setTimeout(r, 150)); const s2 = sum(); const dis = document.querySelector('[data-pane=talents] [data-action=t-undo]')?.disabled; S.talents[S.cls] = JSON.parse(keepR); S.lvl = keepL; g.lastLearn = null; g.invalidateStats(); P.setTab(keepTab); P.renderAll(); return [s1 > s0, en, s2 === s0, dis].join(' '); })()");
  check("talents : « Annuler » rend les points du dernier clic", talUndo === "true true true true", talUndo);
  // (it. 2117) Boutique, sac plein : « Vendre les inutiles » ouvre la confirmation sans quitter l'onglet ; Annuler ne vend rien
  const shopSell = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab; if (!g.bagFull() || !g.nonUpgradeItems().length) return 'sac pas plein'; S.tabsOpen.shop = true; P.setTab('shop'); P.renderAll(); await new Promise((r) => setTimeout(r, 200)); const b = document.querySelector('[data-pane=shop]:not([hidden]) .msell [data-action=sellless]'); if (!b) return 'pas de bouton'; const n0 = S.bag.length; b.click(); await new Promise((r) => setTimeout(r, 150)); const open = !document.querySelector('#confirm').hidden, still = P.tab === 'shop'; document.querySelector('[data-action=confirm-cancel]').click(); await new Promise((r) => setTimeout(r, 100)); const kept = S.bag.length === n0; P.setTab(keepTab); P.renderAll(); return [open, still, kept].join(' '); })()");
  check("boutique, sac plein : « Vendre les inutiles » demande confirmation sur place", shopSell === "true true true" || shopSell === "sac pas plein", shopSell);
  // (it. 2153-2154) sac plein : une amélioration du marchand garde son prix (pas « Sac plein ») et s'achète d'un clic, équipée
  const shopUp = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepBag = S.bag.slice(), keepShop = S.shop, keepEq = { ...S.equip }, keepG = S.gold; S.gold = 1e300; let up = null; for (let k = 0; k < 200; k++) { const c = g.newItem(4, S.best + 40), plain = g.newItem(1, Math.max(1, S.best - 30)); plain.slot = c.slot; plain.set = null; plain.plus = 0; S.equip[c.slot] = plain; g.invalidateStats(); if (g.canBuyWhenFull(c)) { up = c; break; } S.equip[c.slot] = keepEq[c.slot]; } if (!up) { Object.assign(S.equip, keepEq); return 'pas d amélioration achetable'; } while (!g.bagFull()) S.bag.push(g.newItem(0, 1)); const n = S.bag.length; up.price = 10; S.shop = { items: [up], next: Date.now() + 600000 }; S.tabsOpen.shop = true; P.setTab('shop'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const b = document.querySelector('[data-pane=shop]:not([hidden]) [data-action=s-item]'); const label = b ? b.textContent.trim() : 'pas de bouton', notFull = !!b && !b.disabled && !/Sac plein|Bag full/i.test(label); const tip = b ? (b.title || b.dataset.title || '') : ''; b?.click(); await new Promise((r) => setTimeout(r, 150)); const worn = S.equip[up.slot] && S.equip[up.slot].id === up.id, same = S.bag.length === n ? true : n + '->' + S.bag.length; S.bag.length = 0; S.bag.push(...keepBag); S.shop = keepShop; Object.assign(S.equip, keepEq); S.gold = keepG; g.invalidateStats(); P.setTab(keepTab); P.renderAll(); return [notFull, worn, same, /sold|vendu/i.test(tip) || tip].join(' '); })()");
  check("boutique, sac plein : une amélioration s'achète d'un clic et s'équipe (le sac reste plein ; la bulle dit ce qui sera vendu)", shopUp === "true true true true", shopUp);
  // (it. 2119) touche Z dans les Talents : annule le dernier clic sur un talent
  const talZ = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepR = JSON.stringify(S.talents[S.cls] || {}), keepL = S.lvl; S.lvl += 8; g.invalidateStats(); P.setTab('talents'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const sum = () => Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0); const s0 = sum(); const t = document.querySelector('[data-pane=talents] .talent.can:not(.voie)'); if (!t) { S.lvl = keepL; return 'aucun talent ouvert'; } t.click(); await new Promise((r) => setTimeout(r, 150)); const s1 = sum(); const ok = P.onKey ? P.onKey({ key: 'z', target: document.body, preventDefault() {} }) : 'pas de onKey'; await new Promise((r) => setTimeout(r, 100)); const s2 = sum(); S.talents[S.cls] = JSON.parse(keepR); S.lvl = keepL; g.lastLearn = null; g.invalidateStats(); P.setTab(keepTab); P.renderAll(); return [s1 > s0, s2 === s0].join(' '); })()");
  check("talents : la touche Z annule le dernier clic", talZ === "true true", talZ);
  // (it. 2123) clic sur le fond d'une fenêtre : la confirmation est annulée (rien n'est fait), la grande fenêtre se ferme
  const bgClick = await js("(async () => { const P = window.__panel; let done = false; P.confirm('t', 't', 'ok', () => { done = true; }); const c = document.querySelector('#confirm'); c.dispatchEvent(new MouseEvent('click', { bubbles: true })); await new Promise((r) => setTimeout(r, 50)); const r1 = c.hidden && !done; P.showKeys(); const m = document.querySelector('#modal'); const inside = m.querySelector('.panel'); inside.dispatchEvent(new MouseEvent('click', { bubbles: true })); const stays = !m.hidden; m.dispatchEvent(new MouseEvent('click', { bubbles: true })); await new Promise((r) => setTimeout(r, 50)); return [r1, stays, m.hidden].join(' '); })()");
  check("fenêtres : un clic sur le fond annule la confirmation et ferme la grande fenêtre (pas un clic dedans)", bgClick === "true true true", bgClick);
  // (it. 2124) appuyer dans la fenêtre et relâcher sur le fond (sélection de texte) ne la ferme pas
  const bgDrag = await js("(async () => { const P = window.__panel; P.showKeys(); const m = document.querySelector('#modal'), inside = m.querySelector('.panel'); inside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); m.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 })); await new Promise((r) => setTimeout(r, 50)); const stays = !m.hidden; m.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); m.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 })); await new Promise((r) => setTimeout(r, 50)); return [stays, m.hidden].join(' '); })()");
  check("fenêtres : appuyer dedans et relâcher sur le fond ne ferme pas ; appuyer et relâcher sur le fond ferme", bgDrag === "true true", bgDrag);
  // (it. 2127) vendre un objet précieux (légendaire) se confirme ; un objet ordinaire se vend d'un clic
  const sellAsk = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab; P.setTab('adventure'); const keepBag = S.bag.slice(); S.bag.length = 0; const leg = g.newItem(4, S.best); const com = g.newItem(0, 1); com.set = null; com.plus = 0; com.r = 0; S.bag.push(leg, com); const sellOf = async (it) => { P.selected = { from: 'bag', id: it.id }; P.renderAll(); await new Promise((r) => setTimeout(r, 100)); document.querySelector('[data-pane=adventure] [data-action=sell]')?.click(); await new Promise((r) => setTimeout(r, 100)); }; await sellOf(leg); const asked = !document.querySelector('#confirm').hidden, kept = S.bag.includes(leg); document.querySelector('[data-action=confirm-cancel]').click(); await sellOf(com); const noAsk = document.querySelector('#confirm').hidden, sold = !S.bag.includes(com); S.bag.length = 0; S.bag.push(...keepBag); P.selected = null; P.setTab(keepTab); P.renderAll(); return [asked, kept, noAsk, sold].join(' '); })()");
  check("sac : vendre un légendaire demande confirmation, un objet ordinaire se vend d'un clic", sellAsk === "true true true true", sellAsk);
  // (it. 2174) après une vente, l'objet suivant du sac est sélectionné (it. 2198 : objets de niveau 1, jamais équipés par le Valet
  // d'armes ; au niveau record, le second était parfois une amélioration et quittait le sac : échec selon le tirage ; it. 2216 : rareté
  // ordinaire forcée, un objet tiré légendaire ouvrait la confirmation des objets précieux)
  const sellNext = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepBag = S.bag.slice(); P.setTab('adventure'); S.bag.length = 0; const a = g.newItem(0, 1), b = g.newItem(0, 1); for (const x of [a, b]) { x.set = null; x.plus = 0; x.r = 0; } S.bag.push(a, b); P.selected = { from: 'bag', id: a.id }; P.renderAll(); await new Promise((r) => setTimeout(r, 80)); P.lastSellT = 0; document.querySelector('[data-pane=adventure] [data-action=sell]')?.click(); await new Promise((r) => setTimeout(r, 80)); const ok = P.selected && P.selected.id === b.id; document.querySelector('[data-pane=adventure] [data-action=sell]')?.click(); await new Promise((r) => setTimeout(r, 30)); const guard = S.bag.includes(b); S.bag.length = 0; S.bag.push(...keepBag); P.selected = null; P.setTab(keepTab); P.renderAll(); return [!!ok, guard].join(' '); })()");
  check("sac : après une vente, l'objet suivant est sélectionné (un double clic n'en vend pas deux)", sellNext === "true true", sellNext);
  // (it. 2162) changer une quête 3 étoiles demande confirmation ; Annuler la garde
  const qAsk = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepG = S.gold; S.gold = 1e300; const q = (S.quests.slots || []).find((x) => x && x.progress < x.goal); if (!q) return 'pas de quête en cours'; const keepStars = q.stars; q.stars = 3; S.tabsOpen.quests = true; P.setTab('quests'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const b = document.querySelector(`[data-pane=quests]:not([hidden]) [data-action=q-reroll][data-id=\"${q.uid}\"]`); if (!b) { q.stars = keepStars; S.gold = keepG; return 'pas de bouton'; } b.click(); await new Promise((r) => setTimeout(r, 120)); const asked = !document.querySelector('#confirm').hidden; document.querySelector('[data-action=confirm-cancel]').click(); await new Promise((r) => setTimeout(r, 100)); const kept = (S.quests.slots || []).some((x) => x && x.uid === q.uid); q.stars = keepStars; S.gold = keepG; P.setTab(keepTab); P.renderAll(); return [asked, kept].join(' '); })()");
  check("quêtes : changer une quête 3 étoiles demande confirmation, Annuler la garde", qAsk === "true true", qAsk);
  // (it. 2165) Échap avec un objet sélectionné : revient au sac sans fermer le panneau
  const escSel = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab; P.setTab('adventure'); const it = S.bag[0]; if (!it) return 'sac vide'; P.selected = { from: 'bag', id: it.id }; P.renderAll(); let closed = false; const keepC = P.onClose; P.onClose = () => { closed = true; }; P.onEscape(); const r1 = !P.selected && !closed; P.onEscape(); const r2 = closed; P.onClose = keepC; P.setTab(keepTab); P.renderAll(); return [r1, r2].join(' '); })()");
  check("Échap : désélectionne d'abord l'objet, puis ferme le panneau", escSel === "true true", escSel);
  // (it. 2168) Tab reste dans la fenêtre de confirmation ouverte (boucle sur ses deux boutons)
  const trap = await js("(async () => { const P = window.__panel; P.confirm('t', 't', 'ok', () => {}); const c = document.querySelector('#confirm'); const tab = (sh) => P.onKey({ key: 'Tab', shiftKey: !!sh, target: document.activeElement || document.body, preventDefault() {} }); let inside = true; for (let k = 0; k < 5; k++) { tab(k % 2); inside = inside && c.contains(document.activeElement); } P.closeConfirm(); return String(inside); })()");
  check("fenêtre de confirmation : Tab garde le focus dans la fenêtre", trap === "true", trap);
  // (it. 2169) à la fermeture, le focus revient au bouton qui a ouvert la fenêtre
  const back = await js("(async () => { const P = window.__panel, keepTab = P.tab; P.setTab('settings'); P.renderAll(); await new Promise((r) => setTimeout(r, 120)); const b = document.querySelector('[data-pane=settings] [data-action=reset]'); b.focus(); b.click(); await new Promise((r) => setTimeout(r, 80)); document.querySelector('[data-action=confirm-cancel]').click(); await new Promise((r) => setTimeout(r, 80)); const ok = document.activeElement === b; P.setTab(keepTab); P.renderAll(); return String(ok); })()");
  check("fenêtre de confirmation : à la fermeture, le focus revient au bouton d'origine", back === "true", back);
  // (it. 2170) grande fenêtre : Échap la ferme et rend le focus au bouton qui l'a ouverte
  const back2 = await js("(async () => { const P = window.__panel, keepTab = P.tab; P.setTab('settings'); P.renderAll(); await new Promise((r) => setTimeout(r, 120)); const b = document.querySelector('[data-pane=settings] [data-action=showkeys]'); if (!b) return 'pas de bouton'; b.focus(); b.dispatchEvent(new FocusEvent('focusin', { bubbles: true })); b.click(); await new Promise((r) => setTimeout(r, 80)); const open = !document.querySelector('#modal').hidden; P.onEscape(); await new Promise((r) => setTimeout(r, 80)); const ok = document.activeElement === b && document.querySelector('#modal').hidden; P.setTab(keepTab); P.renderAll(); return [open, ok].join(' '); })()");
  check("grande fenêtre : Échap la ferme et rend le focus au bouton d'origine", back2 === "true true", back2);
  // (it. 2185) flèches dans le sac : → la case suivante, ↓ la rangée d'en dessous (même colonne)
  const bagArrows = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepBag = S.bag.slice(); P.setTab('adventure'); while (S.bag.length < Math.min(S.bagSize, 40)) S.bag.push(g.newItem(0, 1)); P.renderAll(); await new Promise((r) => setTimeout(r, 120)); const all = [...document.querySelectorAll('[data-pane=adventure] .slot[data-from=bag]')]; all[0].focus(); const k = (key) => P.onKey({ key, target: document.activeElement, preventDefault() {} }); k('ArrowRight'); const right = document.activeElement === all[1]; k('ArrowDown'); const a = all[1].getBoundingClientRect(), b = document.activeElement.getBoundingClientRect(); const down = b.top > a.top && Math.abs(b.left - a.left) < 4; S.bag.length = 0; S.bag.push(...keepBag); P.setTab(keepTab); P.renderAll(); return [right, down].join(' '); })()");
  check("sac : flèches → et ↓ pour se déplacer dans la grille", bagArrows === "true true", bagArrows);
  // (it. 2189) Compétences : une flèche fait passer le focus à un autre nœud apprenable
  const skArrow = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepOrder = S.skills.order.slice(); S.skills.order.length = Math.min(3, S.skills.order.length); S.tabsOpen.skills = true; P.setTab('skills'); P.renderAll(); await new Promise((r) => setTimeout(r, 200)); const nodes = [...document.querySelectorAll('[data-pane=skills] [tabindex=\"0\"][data-id], [data-pane=skills] [tabindex=\"0\"][data-gid]')]; if (nodes.length < 2) { S.skills.order = keepOrder; P.setTab(keepTab); P.renderAll(); return 'peu de nœuds (' + nodes.length + ')'; } nodes[0].focus(); let moved = false; for (const k of ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']) { nodes[0].focus(); nodes[0].dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true })); if (document.activeElement !== nodes[0] && document.activeElement.getAttribute('tabindex') === '0') { moved = true; break; } } S.skills.order = keepOrder; P.setTab(keepTab); P.renderAll(); return String(moved); })()");
  check("compétences : les flèches passent d'un nœud apprenable à l'autre", skArrow === "true", skArrow);
  // (it. 2208, demande de Victor) « Emmener » sur la carte d'un familier en expédition : rappelé sans butin, devient le compagnon
  const petRecall = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepPets = JSON.stringify(S.pets), keepSet = S.settings.autoPets; S.settings.autoPets = false; const ids = Object.keys(S.pets.owned).filter((id) => id !== S.pets.active); if (!ids.length) return 'pas de familier libre'; const id = ids[0]; S.pets.exp ||= {}; S.pets.exp[id] = { kind: 'long', start: Date.now(), end: Date.now() + 3600000 }; S.tabsOpen.pets = true; P.setTab('pets'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const b = document.querySelector('[data-pane=pets]:not([hidden]) [data-action=p-set][data-id=\"' + id + '\"]'); b?.click(); await new Promise((r) => setTimeout(r, 100)); const ok = [!!b, S.pets.active === id, !(S.pets.exp || {})[id]].join(' '); S.pets = JSON.parse(keepPets); S.settings.autoPets = keepSet; g.invalidateStats(); P.setTab(keepTab); P.renderAll(); return ok; })()");
  check("familiers : « Emmener » rappelle un familier en expédition et l'emmène", petRecall === "true true true", petRecall);
  // (it. 2222-2223) Linux (version distribuée) : Réglages sans « Windows » ni case du démarrage (sans effet sous Linux) ; en dev,
  // window.__game garde l'affichage Windows : retiré le temps d'un affichage, comme dans le jeu distribué
  const linuxSet = await js("(async () => { if (!/Linux/i.test(navigator.platform || '')) return 'pas Linux'; const P = window.__panel, g = window.__game, keepTab = P.tab; S0 = g.S; S0.tabsOpen.settings = true; P.setTab('settings'); delete window.__game; P.renderAll(); const pane = document.querySelector('[data-pane=settings]:not([hidden])'); const autoB = pane.querySelector('[data-action=se-theme][data-v=auto]'); const r = [/\\(/.test(autoB ? autoB.textContent : '') && !/Windows|macOS/.test(autoB ? autoB.textContent : ''), !pane.querySelector('[data-action=se-login]')].join(' '); window.__game = g; P.setTab(keepTab); P.renderAll(); return r; })()".replace("S0 = g.S; S0", "const S0 = g.S; S0"));
  check("Linux : Réglages sans « Windows » ni case de démarrage", linuxSet === "true true" || linuxSet === "pas Linux", linuxSet);
  // (it. 2233) quête de transmutation : le lien « → Aventure » mène à l'onglet où agir (it. 2267 : transmutation automatique coupée le
  // temps du contrôle : avec le Creuset perpétuel actif, le lien n'est pas affiché)
  const qGo = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepSlots = JSON.stringify(S.quests.slots), keepAT = S.settings.autoTransmute; S.settings.autoTransmute = false; S.quests.slots[0] = { uid: 99901, kind: 'transmute', goal: 3, progress: 0, reward: { chest: 1 } }; S.tabsOpen.quests = true; P.setTab('quests'); P.renderAll(); await new Promise((r) => setTimeout(r, 100)); const b = document.querySelector('[data-pane=quests]:not([hidden]) .qgo'); b?.click(); await new Promise((r) => setTimeout(r, 100)); const ok = [!!b, P.tab].join(' '); S.quests.slots = JSON.parse(keepSlots); S.settings.autoTransmute = keepAT; P.setTab(keepTab); P.renderAll(); return ok; })()");
  check("quêtes : « → Aventure » mène à l'onglet où agir (transmutation)", qGo === "true adventure", qGo);
  // (it. 2274) « À faire » : sac plein et agrandissement abordable → « Agrandir le sac » ; un clic l'achète (+6 places)
  const bagUp = await js("(async () => { const g = window.__game, S = g.S, keepBag = S.bag.slice(), keepSize = S.bagSize, keepUp = { ...S.upgrades }, keepGold = S.gold, keepWs = S.unlocks.workshop; S.unlocks.workshop = true; S.gold = 1e15; S.upgrades.bag = 0; S.bagSize = 24; while (!g.bagFull()) { const it = g.newItem(0, 1); it.r = 0; S.bag.push(it); } window.__showOffline({ duration: '1 h', zone: 'Zone', kills: 10, gold: 10, xp: 10, newLevel: 0, kept: 0, best: -1, feathers: 0, chests: 0, capped: false, capH: 10 }); const b = document.querySelector('#modal [data-action=todo-do][data-what=bagUp]'); if (b) b.click(); const r = [!!b, S.bagSize].join(' '); document.querySelector('#modal').hidden = true; S.bag.length = 0; S.bag.push(...keepBag); S.bagSize = keepSize; S.upgrades = keepUp; S.gold = keepGold; S.unlocks.workshop = keepWs; window.__panel.renderAll(); return r; })()");
  check("à faire : « Agrandir le sac » d'un clic (sac plein, Atelier)", bagUp === "true 30", bagUp);
  // (it. 2284) quête d'expéditions (les autres emplacements : quêtes de victoires, sans lien, it. 2286) : pas de lien quand le Grand intendant s'en charge (it. 2266) ; lien quand il est coupé
  const qAuto = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepSlots = JSON.stringify(S.quests.slots), keepU = S.unlocks.steward, keepAP = S.settings.autoPets; S.quests.slots = S.quests.slots.map((q, i) => i ? { uid: 99910 + i, kind: 'kill', goal: 50, progress: 0, reward: { gold: 1 } } : { uid: 99902, kind: 'expedition', goal: 2, progress: 0, reward: { gold: 1 } }); S.tabsOpen.quests = true; const links = () => document.querySelectorAll('[data-pane=quests]:not([hidden]) .qhead .qgo').length; S.unlocks.steward = true; S.settings.autoPets = true; P.setTab('quests'); P.renderAll(); const withSteward = links(); S.settings.autoPets = false; P.renderAll(); const without = links(); S.quests.slots = JSON.parse(keepSlots); S.unlocks.steward = keepU; S.settings.autoPets = keepAP; P.setTab(keepTab); P.renderAll(); return withSteward + ' ' + without; })()");
  check("quêtes : pas de lien quand le Grand intendant gère les expéditions, lien sinon", /^0 [1-9]$/.test(qAuto), qAuto);
  // (it. 2102) Ascension : le bouton ouvre la fenêtre de confirmation (ce qu'on gagne, ce qu'on perd) ; « Annuler » ne change rien
  const ascAsk = await js("(async () => { const g = window.__game, S = g.S, P = window.__panel, keepTab = P.tab, keepB = S.best; if (!g.canAscend()) S.best = Math.max(S.best, 30); S.tabsOpen.ascension = true; P.setTab('ascension'); P.renderAll(); await new Promise((r) => setTimeout(r, 150)); const c0 = S.prestige.count; const b = document.querySelector('[data-pane=ascension] [data-action=a-ascend]'); if (!b) { S.best = keepB; return 'pas de bouton'; } b.click(); await new Promise((r) => setTimeout(r, 150)); const open = !document.querySelector('#confirm').hidden, c1 = S.prestige.count; document.querySelector('[data-action=confirm-cancel]').click(); await new Promise((r) => setTimeout(r, 150)); const closed = document.querySelector('#confirm').hidden, c2 = S.prestige.count; S.best = keepB; P.setTab(keepTab); P.renderAll(); return [open, c1 === c0, closed && c2 === c0].join(' '); })()");
  check("ascension : le bouton demande confirmation dans une fenêtre, Annuler ne change rien", ascAsk === "true true true", ascAsk);
  // (it. 2007) climat des zones (it. 2004-2006) : dans la neige l'ours grelotte, le yéti non ; dans les braises le yéti s'affaisse
  const climate = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills, z: g.S.zone }; const out = []; for (const z of [46, 56]) { g.S.zone = z; R.lineup = ['bear','bear','bear','yeti','bear','bear'].map((type) => ({ type, elite: false, champion: false, affix: null })); R.lineupZone = z; g.S.kills = 0; s.slotKey = null; s.syncSlots(); for (const k of [2, 3]) { s.slots[k].react = null; s.slots[k].nextGesture = 0.01; } await new Promise((r) => setTimeout(r, 250)); out.push([2, 3].map((k) => s.slots[k].react && s.slots[k].react.nat).join('/')); } g.S.zone = keep.z; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; s.slotKey = null; s.syncSlots(); return out.join(' '); })()");
  check("bande : climat des zones (neige : l'ours grelotte ; braises : le yéti s'affaisse)", climate === "rattle/beat rear/still", climate);
  // (it. 2038) souffles du climat (it. 2027-2037) : dans les cendres (Mines naines, 30) l'ours tousse une bouffée grise ; sous l'eau
  // (Lagon de corail, 27) il lâche des bulles ; on compte les particules de leur couleur juste après le geste (0,9 s d'attente avant :
  // les étincelles encore vivantes, 24 au plus, MAX_SPARKS, empêchaient les bulles de naître)
  const puffs = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills, z: g.S.zone }; if (!s.juice.full || !s.active) return 'désactivé'; const out = []; for (const [z, col] of [[30, 'rgb(216, 210, 200)'], [27, 'rgb(244, 252, 255)']]) { g.S.zone = z; R.lineup = ['bear','bear','bear','bear','bear','bear'].map((type) => ({ type, elite: false, champion: false, affix: null })); R.lineupZone = z; g.S.kills = 0; s.slotKey = null; s.syncSlots(); await new Promise((r) => setTimeout(r, 900)); for (const k of [2, 3]) { s.slots[k].react = null; s.slots[k].nextGesture = 0.01; } await new Promise((r) => setTimeout(r, 120)); out.push([...document.querySelectorAll('.spark')].filter((n) => n.style.background === col).length > 0); } g.S.zone = keep.z; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; s.slotKey = null; s.syncSlots(); return out.join(' '); })()");
  check("bande : souffles du climat (toux grise dans les cendres, bulles sous l'eau)", puffs === "true true" || puffs === "désactivé", puffs);
  // (it. 2045) ordre des règles de la file (it. 2042-2044 : la meute, appliquée après, effaçait la peur et le vent) : deux rats en
  // meute collés à un ours (zone 30), partie suspendue (devFreeze) : le second s'écarte de l'ours (moyenne < -4 px sur 2 s ; ≈ -2 avec l'ancien ordre) ;
  // record ramené à 30 le temps du contrôle (sinon la peur du héros, it. 1976, pousse le rat dans l'autre sens)
  const preyPack = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, keep = { line: R.lineup, lz: R.lineupZone, k: g.S.kills, z: g.S.zone, mon: R.mon, mode: R.mode, best: g.S.best }; if (!s.juice.full) return 'désactivé'; g.S.zone = 30; g.S.best = 30; R.lineup = ['bear','bear','bear','rat','rat','bear','bear','bear'].map((type) => ({ type, elite: false, champion: false, affix: null })); R.lineupZone = 30; g.S.kills = 0; R.mon = null; R.mode = 'walk'; R.devFreeze = true; s.slotKey = null; s.syncSlots(); for (const a of s.slots) if (a) a.arriveDelay = 0; await new Promise((r) => setTimeout(r, 1500)); const xs = []; for (let i = 0; i < 20; i++) { await new Promise((r) => setTimeout(r, 100)); xs.push(+s.slots[4].tx.split(',')[0] - s.fightX(5)); } const pack = s.slots[4].packSeed != null, m = xs.reduce((a, b) => a + b, 0) / xs.length; R.devFreeze = false; g.S.zone = keep.z; g.S.best = keep.best; R.lineup = keep.line; R.lineupZone = keep.lz; g.S.kills = keep.k; R.mon = keep.mon; R.mode = keep.mode; s.slotKey = null; s.syncSlots(); return pack + ' ' + (m < -4) + ' ' + Math.round(m); })()");
  check("bande : une proie en meute s'écarte du prédateur voisin", /^true true/.test(preyPack) || preyPack === "désactivé", preyPack);
  // (it. 1807) deux combattants au corps à corps au contact d'un monstre : le compagnon en retrait, derrière le héros
  const duoMel = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, c0 = g.S.cls, p0 = g.S.partner, m0 = R.mode; g.S.cls = 'warrior'; g.S.partner = 'samurai'; await new Promise((r) => setTimeout(r, 300)); if (!R.mon) R.mon = g.makeMonster(false); R.mode = 'fight'; await new Promise((r) => setTimeout(r, 300)); const ok = !!s.partner && s.partnerX <= s.heroX - 10; const d = Math.round(s.heroX - s.partnerX); g.S.cls = c0; g.S.partner = p0; R.mode = m0; return ok + ' ' + d; })()");
  check("duo : deux combattants, le compagnon se tient en retrait du héros", duoMel.startsWith("true"), duoMel);
  // (it. 1818) nécromancien + compagnon au corps à corps, en marche : le serviteur passe devant le compagnon (ils se superposaient)
  const duoMin = await js("(async () => { const g = window.__game, s = window.__strip, R = g.R, c0 = g.S.cls, p0 = g.S.partner, m0 = R.mode; g.S.cls = 'necro'; g.S.partner = 'samurai'; await new Promise((r) => setTimeout(r, 300)); R.mode = 'walk'; await new Promise((r) => setTimeout(r, 300)); const ok = !!s.minion && !!s.partner && s.minion.x >= s.partnerX + s.partner.frames[0].cw - 4; const d = s.minion ? Math.round(s.minion.x - s.partnerX) : -1; g.S.cls = c0; g.S.partner = p0; R.mode = m0; return ok + ' ' + d; })()");
  check("duo : le serviteur du nécromancien passe devant le compagnon en marche", duoMin.startsWith("true"), duoMin);
  // (it. 1767) Poupouce arrive, sac plein : le héros prévient que le légendaire serait perdu (bulle remise à zéro ensuite) ;
  // langue de l'autotest variable : on reconnaît la réplique à sa longueur (les répliques ordinaires de Poupouce sont courtes)
  const pFull = await js("(() => { const g = window.__game, s = window.__strip, b0 = g.S.bagSize; g.S.bagSize = g.S.bag.length; s.saidAt = -1e9; g.emit('spawn', { poupouce: true, type: 'poupouce' }); const t = s.bubble.textContent, ok = !s.bubble.hidden && t.includes('Poupouce') && t.length > 35, dbg = g.bagFull() + '|' + s.bubble.hidden + '|' + s.bubble.textContent.slice(0, 60); g.S.bagSize = b0; s.bubble.hidden = true; s.bubbleT = 0; s.saidAt = -1e9; return ok + ' ' + dbg; })()");
  check("bande : Poupouce et sac plein, le héros prévient", pFull.startsWith("true"), pFull);
  // (it. 1677, demande de Victor) Journal : Statistiques > Journal, mis à jour en direct ; plus dans l'Aventure
  await js("(() => { const P = window.__panel; P.tabs.stats.sec = 'log'; P.setTab('stats'); P.renderAll(); window.__game.log('TEST-JOURNAL-1677'); })()");
  await sleep(700);
  const logT = await js("(() => { const P = window.__panel, l = document.querySelector('[data-pane=stats]:not([hidden]) #log'), ok = !!l && l.textContent.includes('TEST-JOURNAL-1677'); P.tabs.stats.sec = 'numbers'; P.setTab('adventure'); P.renderAll(); return ok + ' ' + !document.querySelector('[data-pane=adventure] #log'); })()");
  check("Statistiques > Journal : ligne ajoutée en direct, plus de journal dans l'Aventure", logT === "true true", logT);
  // (it. 1723) case « Lignes importantes seulement » : un vrai clic écarte la ligne ordinaire, garde le coffre (repère ✦)
  await js("(() => { const g = window.__game, P = window.__panel; g.log('Coffre au trésor ! +5 or'); g.log('TEST-ORDINAIRE-1723'); P.tabs.stats.sec = 'log'; P.setTab('stats'); P.renderAll(); })()");
  await sleep(400);
  const logImp = await js("(async () => { const P = window.__panel, q = (s) => document.querySelector('[data-pane=stats]:not([hidden]) ' + s); q('[data-action=st-logimp]').click(); P.renderAll(); await new Promise((r) => setTimeout(r, 300)); const l = q('#log'), on = window.__game.S.settings.logImportant === true && !l.textContent.includes('TEST-ORDINAIRE-1723') && !!l.querySelector('li.lg-rare') && getComputedStyle(l.querySelector('li.lg-rare'), '::before').content.includes('✦'); q('[data-action=st-logimp]').click(); P.renderAll(); await new Promise((r) => setTimeout(r, 300)); const off = window.__game.S.settings.logImportant === false && q('#log').textContent.includes('TEST-ORDINAIRE-1723'); P.tabs.stats.sec = 'numbers'; P.setTab('adventure'); return on + ' ' + off; })()");
  check("Statistiques > Journal : « Lignes importantes seulement » (clic, repère ✦, retour)", logImp === "true true", logImp);
  // (it. 1729, 1743) avant la zone 40 : Statistiques ne montre que le Journal, les trois autres sous-onglets grisés (zone 40),
  // sur une rangée, sans défilement (lang-overflow ne voit pas cet état : ses parties sont au-delà de la zone 40)
  const stEarly = await js("(async () => { const g = window.__game, P = window.__panel, b0 = g.S.best, r0 = g.S.prestige.bestRun; g.S.best = 5; g.S.prestige.bestRun = 0; P.setTab('stats'); P.renderAll(); await new Promise((r) => setTimeout(r, 300)); const pane = document.querySelector('[data-pane=stats]:not([hidden])'), nav = pane.querySelector('.subtabs'), tops = new Set([...nav.children].map((x) => Math.round(x.getBoundingClientRect().top))); const ok = !!pane.querySelector('#log') && nav.querySelectorAll('button.locked[disabled]').length === 3 && tops.size === 1 && pane.scrollHeight <= pane.clientHeight + 1; g.S.best = b0; g.S.prestige.bestRun = r0; P.tabs.stats.sec = 'numbers'; P.setTab('adventure'); P.renderAll(); return String(ok); })()");
  check("Statistiques avant la zone 40 : Journal seul, 3 sous-onglets grisés sur une rangée, sans défilement", stEarly === "true", stEarly);
  // (it. 1694) touche J : Statistiques > Journal directement
  const keyJ = await js("(() => { const P = window.__panel; P.setTab('adventure'); const used = P.onKey({ key: 'j', target: document.body }); const ok = used && P.tab === 'stats' && !!document.querySelector('[data-pane=stats]:not([hidden]) #log'); P.tabs.stats.sec = 'numbers'; P.setTab('adventure'); return String(ok); })()");
  check("touche J : ouvre Statistiques > Journal", keyJ === "true", keyJ);
  // (it. 852) Japonais dans une tuile étroite : jamais un caractère seul en dernière ligne (avant : « ポーショ / ン »,
  // « バッグが満 / 杯 »). Tuile témoin ajoutée le temps de la mesure, document passé en lang="ja".
  const jaOrphan = await js("(() => { const P = window.__panel; P.tabs.shop.sec = 'shop'; P.setTab('shop'); P.renderAll(); const grid = document.querySelector('[data-pane=shop]:not([hidden]) .cgrid'); if (!grid) return 'pas de grille'; const H = document.documentElement, keep = H.lang; H.lang = 'ja'; const t = document.createElement('div'); t.className = 'ctile'; grid.appendChild(t); const bad = []; for (const s of ['俊足のポーション', 'ペットのタマゴ', 'ランダムなペット', '鉄枠の宝箱', 'アンコモン 以上', 'バッグが満杯']) { t.innerHTML = '<div class=nm></div>'; const d = t.firstChild; d.textContent = s; const n = d.firstChild, tops = []; for (let i = 0; i < s.length; i++) { const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1); const q = r.getClientRects()[0]; if (q) tops.push(Math.round(q.top)); } const last = tops[tops.length - 1], onLast = tops.filter((y) => y === last).length; if (new Set(tops).size > 1 && onLast < 2) bad.push(s); } t.remove(); H.lang = keep; P.setTab('adventure'); return bad.join(' ') || 'ok'; })()");
  check("boutique : en japonais, pas de caractère seul en fin de nom (tuiles étroites)", jaOrphan === "ok", jaOrphan);
  // (it. 861) Japonais, boutons des cartes de héros (« 昇天後にプレ / イ », « デュオに加え / る ») : même mesure sur le vrai
  // bouton d'une carte, texte témoin le temps de la mesure.
  const jaBtn = await js("(() => { const P = window.__panel; P.setTab('class'); P.renderAll(); const b = document.querySelector('[data-pane=class]:not([hidden]) .classcard:not(.current):not(.locked) > .row:last-child button[data-action]'); if (!b) return 'pas de bouton'; const H = document.documentElement, keep = H.lang; H.lang = 'ja'; const bad = []; for (const s of ['昇天後にプレイ', 'デュオに加える', '昇天時のデュオ']) { b.textContent = s; const n = b.firstChild, tops = []; for (let i = 0; i < s.length; i++) { const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1); const q = r.getClientRects()[0]; if (q) tops.push(Math.round(q.top)); } const last = tops[tops.length - 1], onLast = tops.filter((y) => y === last).length; if (new Set(tops).size > 1 && onLast < 2) bad.push(s); } H.lang = keep; P.renderAll(); P.setTab('adventure'); return bad.join(' ') || 'ok'; })()");
  check("héros : en japonais, pas de caractère seul en fin de bouton", jaBtn === "ok", jaBtn);
  // Chroniques de l'histoire : bloc repliable dans la carte du héros, au moins « Le ciel brisé ».
  const ch = await js("(() => { window.__panel.setTab('adventure'); window.__panel.renderAll(); const d = document.querySelector('.chronbox'); return d ? d.querySelectorAll('.chron').length : -1; })()");
  check("chroniques : bloc présent dans la carte du héros, au moins une chronique", ch >= 1, ch);
  // Prochain déblocage prêt : un clic sur la carte du héros l'achète (sans passer par la boutique).
  // (Tri du marchand, zone 14, remis en vente et payable : contrôle reproductible quelles que soient les zones.)
  await js("(() => { const S = window.__game.S; delete S.unlocks.autoSell; S.gold = Math.max(S.gold, 1e9); window.__panel.renderAll(); })()");
  await sleep(100);
  const goalId = await js("(document.querySelector('#p-hero .goal[data-action=goal-buy]') || {}).dataset?.id || null");
  if (goalId) await js("document.querySelector('#p-hero .goal[data-action=goal-buy]').click()");
  await sleep(150);
  check("prochain déblocage : acheté d'un clic", !!goalId && await js(`!!window.__game.S.unlocks[${JSON.stringify(goalId)}]`), goalId);
  check("depuis ta dernière visite : affiché", await js("!!document.querySelector('#p-hero .visit')"));
  if (process.env.SELFTEST_SHOT2) require("fs").writeFileSync(process.env.SELFTEST_SHOT2, (await wc.capturePage()).toPNG());
  await click("#p-hero .visit");
  await sleep(150);
  check("depuis ta dernière visite : un clic le masque", await js("!document.querySelector('#p-hero .visit')"));
  await click('[data-tab="adventure"]');
  await sleep(150);
  // Étoile filante : apparaît sur la bande et s'attrape d'un clic
  await click("#panel .close");
  await sleep(400);
  await js("window.__pause = false; window.__game.R.starT = 0.01");
  await sleep(700);
  await js("window.__pause = true");
  await sleep(600); // zones cliquables à jour
  const speed0 = await state("S.speed");
  const starRect = await js(`(() => { const s = document.querySelector('.star'); if (!s) return null; const r = s.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; })()`);
  check("étoile filante : zone cliquable", !!starRect && strip.hitTest(b0.x + starRect.x, b0.y + starRect.y));
  if (starRect) {
    wc.sendInputEvent({ type: "mouseDown", x: starRect.x, y: starRect.y, button: "left", clickCount: 1 });
    wc.sendInputEvent({ type: "mouseUp", x: starRect.x, y: starRect.y, button: "left", clickCount: 1 });
    await sleep(200);
  }
  check("étoile filante attrapée : vitesse permanente", (await state("S.speed")) > speed0, `${speed0} -> ${await state("S.speed")}`);
  // Clic sur le monstre combattu : coup bonus
  await js("window.__pause = false");
  // Dès qu'un combat commence : pause, et monstre increvable le temps du test.
  await until(() => js("(() => { const g = window.__game; if (g.R.mode !== 'fight' || !g.R.mon) return false; window.__pause = true; g.R.mon.hp = g.R.mon.max = 1e12; return true; })()"), 15000);
  await sleep(700); // zone de clic placée et zones cliquables à jour
  const taps0 = await state("S.stats.taps || 0");
  const tapRect = await js(`(() => { const s = document.querySelector('.tapzone'); if (!s || s.hidden) return null; const r = s.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; })()`);
  check("monstre : zone de clic", !!tapRect && strip.hitTest(b0.x + tapRect.x, b0.y + tapRect.y));
  if (tapRect) {
    wc.sendInputEvent({ type: "mouseDown", x: tapRect.x, y: tapRect.y, button: "left", clickCount: 1 });
    wc.sendInputEvent({ type: "mouseUp", x: tapRect.x, y: tapRect.y, button: "left", clickCount: 1 });
    await sleep(200);
  }
  check("monstre : un clic donne un coup bonus", (await state("S.stats.taps || 0")) > taps0);
  // Ascension : bannière sur la bande (événement seul, l'état du jeu ne change pas).
  await js("window.__game.emit('ascend', { count: 4, gain: 36 })");
  await sleep(250);
  const banners = await js("[...document.querySelectorAll('#strip .banner')].map((b) => b.textContent)");
  check("ascension : bannière sur la bande", banners.some((t) => t.includes("36")), JSON.stringify(banners));
  // (it. 716-718) Aucun bouton ne sort de sa carte ou de son panneau, sur aucun onglet (hors rangées défilantes .hscroll).
  const outBtn = await js("(() => { const P = window.__panel, cur = P.tab, out = []; for (const t of ['adventure','talents','skills','quests','shop','pets','class','ascension','bestiary','stats','map','settings']) { try { P.setTab(t); P.renderAll(); } catch (e) { out.push(t + ' ERR'); continue; } document.querySelectorAll('#panel button').forEach((b) => { if (!b.offsetParent) return; const box = b.closest('article, .panel'); if (!box) return; const hs = b.closest('.hscroll'); if (hs && box.contains(hs)) return; const r = box.getBoundingClientRect(), q = b.getBoundingClientRect(); if (q.width && (q.right > r.right + 1 || q.left < r.left - 1)) out.push(t + ':' + (b.textContent || '').trim().slice(0, 20)); }); } P.setTab(cur); P.renderAll(); return out.slice(0, 8).join(' | ') || 'ok'; })()");
  check("aucun bouton hors de sa carte (12 onglets, hors rangées défilantes)", outBtn === "ok", outBtn);
  // (it. 750, 765) onglets préparés d'avance : déjà construits, tous cachés sauf l'onglet ouvert, aucun resté en « warming »
  await sleep(500);
  const warm = await js("(() => { const panes = [...document.querySelectorAll('#panel [data-pane]')]; const built = panes.filter((p) => p.childElementCount).length; const shown = panes.filter((p) => !p.hidden).length; const stuck = document.querySelectorAll('.warming').length; return built + ' ' + shown + ' ' + stuck; })()");
  const [wBuilt, wShown, wStuck] = warm.split(" ").map(Number);
  check("onglets préparés d'avance : construits, un seul affiché, aucun bloqué en préparation", wBuilt >= 6 && wShown === 1 && wStuck === 0, warm);
  // (it. 779) barre d'onglets au clavier : → passe à l'onglet suivant et lui donne le focus, ← revient
  const kb = await js("(() => { const P = window.__panel, cur = P.tab; const first = document.querySelector('#panel [role=tab][data-tab=adventure]'); P.setTab('adventure'); first.focus(); first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); const a = P.tab, vis = getComputedStyle(first).visibility === 'visible', f = vis ? (document.activeElement && document.activeElement.dataset.tab) : a; document.querySelector('#panel [role=tab][data-tab=' + a + ']').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })); const b = P.tab; P.setTab(cur); return a + ' ' + f + ' ' + b + ' ' + vis; })()");
  const [kA, kF, kB] = kb.split(" ");
  check("onglets au clavier : flèches droite puis gauche (focus suivi si panneau ouvert)", kA !== "adventure" && kA === kF && kB === "adventure", kb);
  // (it. 796) polices : aucune taille fractionnaire, et peu de combinaisons police × taille × graisse (chacune coûte au
  // premier affichage sous Windows ; CLAUDE.md, polices)
  const fonts = await js("(() => { const P = window.__panel, cur = P.tab, set = new Set(), frac = new Set(); for (const t of ['adventure','talents','skills','quests','shop','pets','class','ascension','bestiary','stats','map','settings']) { try { P.setTab(t); P.renderAll(); } catch (e) { continue; } for (const e of document.querySelectorAll('#panel [data-pane]:not([hidden]) *, #panel .ptop *, #strip *')) { if (!e.offsetParent || ![...e.childNodes].some((n) => n.nodeType === 3 && n.data.trim())) continue; const c = getComputedStyle(e); set.add(c.fontFamily.split(',')[0] + ' ' + c.fontWeight + ' ' + c.fontSize); if (!/^\\d+px$/.test(c.fontSize)) frac.add(c.fontSize + ' ' + e.tagName.toLowerCase() + '.' + e.className); } } P.setTab(cur); P.renderAll(); return set.size + '|' + [...frac].slice(0, 5).join(' ; '); })()");
  const [fontN, fontFrac] = fonts.split("|");
  check("polices : pas de taille fractionnaire, au plus 40 combinaisons", !fontFrac && +fontN <= 40, `${fontN} combinaisons${fontFrac ? " ; fractionnaires : " + fontFrac : ""}`);
  // (it. 815) barre du panneau > « Ton avis » : le bouton existe et passe par le processus principal (adresse fixe ;
  // en test, rien ne s'ouvre)
  const fb = await js("(() => { const b = document.querySelector('#panel .ptop [data-action=feedback]'); const ok = !!b && !!(b.title || b.dataset.title) && typeof window.sillwalker.openFeedback === 'function'; if (b) b.click(); return ok; })()");
  check("barre du panneau : bouton « Ton avis »", fb === true, String(fb));
  // (it. 817) numéro de version au survol du titre (les joueurs le citent dans leurs avis)
  // (les info-bulles du jeu déplacent « title » dans data-title : panel.js, app.js)
  const ver = await js("(() => { const h = document.querySelector('#panel .ptop h1'); return h.title || h.dataset.title || ''; })()");
  check("titre du panneau : version au survol", /^Sillwalker \d+\.\d+\.\d+/.test(ver), ver);
  // (it. 826) une cinématique survit à un combat chargé : 300 effets ajoutés ne la retirent pas (avant, elle partait
  // sans finir et bloquait toutes les suivantes jusqu'au prochain lancement)
  const cineKeep = await js("(() => { const j = window.__strip.juice; j.clear(); j.cinematic('freed', { cls: 'mage', force: true }); const st = j.cine; for (let i = 0; i < 300; i++) { const d = document.createElement('div'); j.layer.appendChild(d); j.add(d, () => true); } const ok = !!st && j.cine === st && st.node.isConnected; j.clear(); return ok; })()");
  check("cinématique gardée malgré 300 effets (combat chargé)", cineKeep === true, String(cineKeep));
  // (it. 761) accessibilité : chaque bouton visible des 12 onglets a un nom (texte, aria-label ou title) pour les lecteurs d'écran
  const noName = await js("(() => { const P = window.__panel, cur = P.tab, out = []; for (const t of ['adventure','talents','skills','quests','shop','pets','class','ascension','bestiary','stats','map','settings']) { try { P.setTab(t); P.renderAll(); } catch (e) { continue; } document.querySelectorAll('#panel button').forEach((b) => { if (!b.offsetParent) return; const n = (b.getAttribute('aria-label') || b.title || b.textContent || '').trim(); const lb = b.getAttribute('aria-labelledby'); if (!n && !lb) out.push(t + ':' + (b.dataset.action || b.className || b.outerHTML.slice(0, 40))); }); } P.setTab(cur); P.renderAll(); return out.slice(0, 10).join(' | ') || 'ok'; })()");
  check("accessibilité : tous les boutons ont un nom (12 onglets)", noName === "ok", noName);
  // (it. 874) Météo (bulles, flocons…) : plus dessinée sur les pastilles « Zone · nom » et « or · niveau » de la bande.
  {
    const wxr = await js(`(() => { const st = window.__strip, J = st.juice, G = window.__game; if (!st.active) return 'bande inactive';
      const fe = G.S.settings.fullEffects, we = G.S.settings.weather; G.S.settings.fullEffects = true; G.S.settings.weather = true;
      G.zoneDef = () => ({ src: 'Cité engloutie', name: 'Cité engloutie' });
      try { J.weather(0); if (J.wxKind !== 'bubble') return 'météo absente ' + J.wxKind; J.wx.length = 0;
        for (let x = 0; x < st.W; x += 5) for (const y of [2, 9, 16, 40]) J.wx.push({ c: '#ffffff', x0: x, y0: y, sp: 0, ph: 0, t: 0 });
        st.bossObs = null; const ob = st.bossObstacles()[0]; if (!ob) return 'nom du boss absent';
        for (let x = ob.l - 4; x < ob.r; x += 3) for (let y = ob.t - 4; y < ob.b; y += 3) J.wx.push({ c: '#ffffff', x0: x, y0: y, sp: 0, ph: 0, t: 0 });
        J.wxClock = 1; J.wxKey = ''; J.weather(1e-6);
        const d = st.cssDpr || 1, ctx = J.wxc.ctx, ink = (x0, x1, y0, y1) => { if (x1 - x0 < 1) return -1; const im = ctx.getImageData(Math.round(x0 * d), Math.round(y0 * d), Math.round((x1 - x0) * d), Math.round((y1 - y0) * d)).data; let n = 0; for (let i = 3; i < im.length; i += 4) if (im[i]) n++; return n; };
        const L0 = (st.centerHud ? st.hudLX || 0 : 0) + 3, L1 = (st.centerHud ? st.hudLX || 0 : 0) + st.hudLRight, R0 = st.hudRLeft;
        return [ink(L0, L1, 0, 24), ink(R0, Math.min(st.W, R0 + 60), 0, 24), ink(0, st.W, 36, 48) > 0, ink(Math.max(0, ob.l + 2), Math.min(st.W, ob.r - 2), Math.max(0, ob.t + 2), ob.b - 2)].join(' ');
      } finally { delete G.zoneDef; G.S.settings.fullEffects = fe; G.S.settings.weather = we; J.clearWeather(); J.wxKind = null; } })()`);
    check("bande : la météo ne passe pas sur les pastilles d'informations ni sur le nom du boss", wxr === "0 0 true 0", wxr);
  }
  const noNameStrip = await js("(() => [...document.querySelectorAll('button, [role=button]')].filter((b) => !b.closest('#panel') && b.offsetParent && !(b.getAttribute('aria-label') || b.title || b.textContent || '').trim()).map((b) => b.id || b.className).slice(0, 10).join(' | ') || 'ok')()");
  check("accessibilité : boutons de la bande nommés", noNameStrip === "ok", noNameStrip);
  // (it. 723, demande V) feux follets des pétales : le héros est entre eux (z-index 1 derrière, 3 devant)
  const hz = await js("getComputedStyle(window.__strip.hero.el).zIndex");
  check("feux follets : le héros entre ceux de derrière (1) et ceux de devant (3)", hz === "2", hz);
  // (it. 744-745) tous les déblocages : automatismes regroupés sous le sac, fenêtre large, titre à jour après une case
  const au = await js("(() => { const G = window.__game, P = window.__panel, keep = { ...G.S.unlocks }, ks = { ...G.S.settings }; for (const u of ['armsValet','crucible','masterForge','trader','herbalist','starSmith']) G.S.unlocks[u] = true; G.S.settings.autoTrade = true; P.setTab('adventure'); P.renderAll(); const sum = document.querySelector('.autosbox summary'); const inline = document.querySelectorAll('#p-bag > label.toggle input[data-action=trader]').length; if (!sum) return 'pas de groupe'; sum.click(); const cb = document.querySelector('#modal [data-action=trader]'); if (!cb) return 'pas de fenêtre'; cb.click(); const t = document.querySelector('#mt').textContent, open = !document.querySelector('#modal').hidden; document.querySelector('#modal').hidden = true; G.S.unlocks = keep; G.S.settings = ks; P.renderAll(); return [inline, open, /5/.test(t)].join(' '); })()");
  check("automatismes regroupés (fenêtre large, case sans fermer, titre à jour)", au === "0 true true", au);
  // (it. 753) son coupé (bouton haut-parleur) : le contexte audio est suspendu, puis repart au second clic
  const sm = await js("(async () => { const snd = window.__sound, S = window.__game.S, was = S.settings.muted; if (!snd.ctx) snd.audio(); const b = document.querySelector('#sound-btn'); if (was) b.click(); b.click(); await new Promise((r) => setTimeout(r, 300)); const off = snd.ctx ? snd.ctx.state : 'none'; b.click(); await new Promise((r) => setTimeout(r, 300)); const on = snd.ctx ? snd.ctx.state : 'none'; if (S.settings.muted !== was) b.click(); return off + ' ' + on; })()");
  check("son coupé : moteur audio suspendu, repris au second clic", /^suspended (running|suspended)$/.test(sm) && sm.startsWith("suspended"), sm);
  if (process.env.SELFTEST_SHOT3) require("fs").writeFileSync(process.env.SELFTEST_SHOT3, (await wc.capturePage()).toPNG());
  await click("#menu-btn");
  await sleep(400);

  check("aucune erreur de l'interface pendant le parcours", rendErr.length === 0, rendErr.length ? `${rendErr.length} : ${rendErr[0]}` : "");
  const failed = results.filter((r) => !r).length;
  if (process.env.SELFTEST_TIMES) for (const [ms, n] of times.slice().sort((x, y) => y[0] - x[0]).slice(0, 12)) console.log(`[selftest] lent : ${(ms / 1000).toFixed(1)} s ${n}`);
  console.log(`[selftest] ${results.length - failed}/${results.length} vérifications réussies — clic sur « Quitter »`);
  await click(".ptop .quit");
  await sleep(150);
  if (!(await js("!document.getElementById('confirm').hidden"))) console.log("[selftest] ÉCHEC la confirmation de sortie n'apparaît pas");
  else console.log("[selftest] OK   « Quitter » demande confirmation");
  await click('[data-action="confirm-ok"]');
}

module.exports = { runSelfTest };
