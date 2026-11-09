// Auto-test de l'interface (dev) : `npx electron . --selftest --user-data=...`
// Les événements souris sont injectés dans la page (sendInputEvent) : la vraie
// souris de l'utilisateur n'est jamais déplacée.
const { app } = require("electron");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runSelfTest(strip) {
  const wc = strip.win.webContents;
  const js = (code) => wc.executeJavaScript(code).catch((e) => { console.log("[selftest] ÉCHEC script :", code.slice(0, 140)); throw e; });
  const state = (expr) => js(`(() => { const S = window.__game.S; return ${expr}; })()`);
  // Le profil de test s'accumule d'une exécution à l'autre : la vitesse permanente doit pouvoir encore monter.
  await js("window.__game.S.speed = Math.min(window.__game.S.speed || 0, 100)");
  // Déblocages achetés (le parcours teste les commandes automatiques).
  await js("Object.assign(window.__game.S.unlocks ||= {}, Object.fromEntries([\"bulkEquip\", \"menagerie\", \"forge\", \"workshop\", \"autoPotion\", \"autoSell\", \"bulkPoints\", \"questDesk\", \"expeditions\", \"petBulk\", \"transmute\", \"autoLevel\"].map((k) => [k, true]))); window.__game.changed()");
  const rectOf = (sel) => js(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); e.scrollIntoView({ block: "nearest" }); const r = e.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), w: r.width }; })()`);
  const move = async (x, y) => { wc.sendInputEvent({ type: "mouseMove", x, y }); await sleep(150); };
  /** Attend qu'une condition soit vraie (machine chargée : animations plus lentes). */
  const until = async (test, ms = 3000) => { for (let t = 0; t < ms; t += 100) { if (await test()) return true; await sleep(100); } return !!(await test()); };
  const click = async (sel) => {
    const p = await rectOf(sel);
    await move(p.x, p.y);
    wc.sendInputEvent({ type: "mouseDown", x: p.x, y: p.y, button: "left", clickCount: 1 });
    wc.sendInputEvent({ type: "mouseUp", x: p.x, y: p.y, button: "left", clickCount: 1 });
    await sleep(100);
  };
  const results = [];
  const check = (name, ok, extra = "") => { results.push(ok); console.log(`[selftest] ${ok ? "OK  " : "ÉCHEC"} ${name}${extra ? " — " + extra : ""}`); };
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
      .filter((e) => { if (e.closest("[hidden]")) return false; const cs = getComputedStyle(e); return cs.visibility !== "hidden" && cs.display !== "none"; })
      .map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
    for (let x = 100; x < innerWidth - 100; x += 50) if (!R.some((r) => x > r.left - 80 && x < r.right + 80 && y > r.top - 20 && y < r.bottom + 20)) return x;
    return -1;
  })()`);
  check("zone vide de la bande : clics traversants", emptyX > 0 && !strip.hitTest(b0.x + emptyX, b0.y + b0.height - 40), `x = ${emptyX}`);

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

  // Fermeture
  await click("#panel .close");
  check("panneau refermé", await until(async () => !(await js("document.body.classList.contains('panel-open')"))));
  check("panneau refermé : sa zone laisse passer les clics", await until(() => !strip.hitTest(b0.x + pr.x, b0.y + pr.y)));

  // Mode mini depuis la bande
  await click("#mini-btn");
  await sleep(900);
  let b = bounds();
  check("bouton mini : passe en mode mini", strip.mode() === "mini" && b.width === 340 && b.height === 64, JSON.stringify(b));
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
  // Un seul clic sur un talent disponible = +1 rang.
  const learnable = await js(`(() => { const b = document.querySelector('.talent.can[data-action="t-learn"]'); return b ? b.dataset.id : null; })()`);
  if (learnable) { await click(`.talent[data-tid="${learnable}"] .tn`); await sleep(200); }
  const spent1 = await state("Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0)");
  check("onglet Talents : un clic sur un talent dépense un point", spent1 === spent0 + 1, `${spent0} -> ${spent1}`);
  await click('[data-action="t-auto"]');
  await sleep(200);
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
  // Vendre ce qui n'améliore pas (avec confirmation)
  await js("(() => { const g = window.__game; for (let n = 0; n < 200 && Object.keys(g.S.equip).some((k) => !g.S.equip[k] || g.S.equip[k].r < 3); n++) { const it = g.newItem(3, g.S.best + 10); if (!g.S.equip[it.slot] || g.S.equip[it.slot].r < 3) g.S.equip[it.slot] = it; } g.S.bag.splice(0, 12); for (let i = 0; i < 6; i++) g.addToBag(g.newItem(0, 1)); g.changed() })()");
  await click('[data-tab="adventure"]');
  await sleep(200);
  const bag0 = await state("S.bag.length"), useless = await js("window.__game.uselessItems().length");
  await click('[data-action="sellless"]');
  await sleep(150);
  await click('[data-action="confirm-ok"]');
  await sleep(150);
  check("vendre ce qui n'améliore pas (après confirmation)", useless > 0 && (await state("S.bag.length")) === bag0 - useless, `${bag0} -> ${await state("S.bag.length")} (${useless} inutiles)`);
  // Transmutation (3 communs inutiles -> 1 peu commun), avec confirmation
  await js("(() => { const g = window.__game; g.S.bag.splice(0, 12); for (let i = 0; i < 3; i++) { const it = g.newItem(0, 1); it.r = 0; g.S.bag.push(it); } g.changed() })()");
  await click('[data-tab="adventure"]');
  await sleep(200);
  const tr0 = await js("window.__game.S.stats.transmutes || 0");
  await click('[data-action="transmute"]');
  await sleep(150);
  await click('[data-action="confirm-ok"]');
  await sleep(150);
  check("transmutation (après confirmation)", (await js("window.__game.S.stats.transmutes || 0")) > tr0, `${tr0} -> ${await js("window.__game.S.stats.transmutes || 0")}`);
  // Familiers : envoyer un familier en expédition
  await js("(() => { const P = window.__game.S.pets; P.owned.cat ||= { lvl: 1, xp: 0 }; P.owned.fox ||= { lvl: 1, xp: 0 }; P.active = 'cat'; P.exp = {}; window.__game.changed() })()");
  await click('[data-tab="pets"]');
  await sleep(200);
  await click('[data-action="p-exp"][data-id="fox"][data-kind="short"]');
  await sleep(150);
  check("familiers : départ en expédition", (await js("!!(window.__game.S.pets.exp || {}).fox")));
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
  await click('[data-action="se-opacity"][data-v="0.7"]');
  await sleep(300);
  check("réglages : opacité appliquée par la fenêtre", strip.settings.get("opacity") === 0.7);
  await click('[data-action="se-theme"][data-v="dark"]');
  await sleep(150);
  check("réglages : thème sombre choisi", (await js("document.documentElement.dataset.theme")) === "dark" && (await state("S.settings.theme")) === "dark");
  await click('[data-action="se-theme"][data-v=""]');
  await sleep(150);
  check("réglages : retour au thème de Windows", !(await js("document.documentElement.dataset.theme || ''")) && (await state("S.settings.theme")) === null);
  await click(`[data-action="se-opacity"][data-v="${op0}"]`);
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
  // M : réduire en mode mini (puis retour à la bande pour la suite du parcours)
  wc.sendInputEvent({ type: "keyDown", keyCode: "M" }); wc.sendInputEvent({ type: "char", keyCode: "m" }); wc.sendInputEvent({ type: "keyUp", keyCode: "M" });
  await until(async () => strip.mode() === "mini", 3000);
  check("raccourci M : mode mini", strip.mode() === "mini");
  await strip.setMode("strip");
  await until(async () => strip.mode() === "strip" && bounds().height > 64, 6000);
  await sleep(500);
  // Rouvrir le panneau (plusieurs essais : la bande peut mettre un instant à se réafficher)
  for (let k = 0; k < 5 && !(await js("document.body.classList.contains('panel-shown')")); k++) {
    // Clic souris d'abord (vrai parcours) ; s'il n'aboutit pas, clic direct dans la page (coordonnées pas encore à jour sous xvfb).
    if (!(await js("document.body.classList.contains('panel-open')"))) { if (k < 2) await click("#menu-btn"); else await js("document.querySelector('#menu-btn').click()"); }
    await until(async () => js("document.body.classList.contains('panel-shown')"), 1500);
  }
  check("retour à la bande : panneau rouvert", await js("document.body.classList.contains('panel-shown')"));
  await sleep(600); // fin de l'animation d'ouverture : les onglets ne bougent plus
  for (let k = 0; k < 3 && (await js("document.querySelectorAll('.beast').length")) < 11; k++) {
    await click('[data-tab="bestiary"]');
    await until(async () => (await js("document.querySelectorAll('.beast').length")) >= 11, 1500);
  }
  check("onglet Bestiaire : affiché", (await js("document.querySelectorAll('.beast').length")) >= 11);
  // Sommaire du Bestiaire : un clic amène la section « Élites » (en bas de l'onglet) dans la vue.
  await click('.bjump [data-to="bj-elites"]');
  await sleep(300);
  const elTop = await js("(() => { const h = document.getElementById('bj-elites'); const r = h && h.getBoundingClientRect(); return r ? Math.round(r.top) : -1; })()");
  const vis = await js("(() => { const h = document.getElementById('bj-elites'), r = h.getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight; })()");
  check("Bestiaire : le sommaire mène à la section", vis, "haut de la section à " + elTop);
  // Résumé d'absence : « À faire maintenant » mène droit à l'onglet (ici les œufs → Familiers).
  await js("delete window.__game.S.unlocks.armsValet; window.__game.S.gold = Math.max(window.__game.S.gold, 1e9); window.__game.S.pets.eggs = Math.max(1, window.__game.S.pets.eggs); window.__showOffline({ duration: '2 h 5 min', zone: 'Zone', kills: 1234, gold: 56789, xp: 4321, newLevel: 0, kept: 3, best: 3, feathers: 1, chests: 1, capped: true, capH: 10, bestItemId: (window.__game.S.bag[0] || {}).id })");
  await sleep(300);
  const todo = await js("[...document.querySelectorAll('#modal:not([hidden]) .linkbtn[data-tab]')].map((b) => b.dataset.tab)");
  check("retour d'absence : actions « à faire maintenant »", todo.includes("pets"), JSON.stringify(todo));
  const buyId = await js("(document.querySelector('#modal:not([hidden]) .linkbtn[data-action=goal-buy]') || {}).dataset?.id || null");
  check("retour d'absence : déblocage payable proposé à l'achat", buyId === "armsValet", buyId);
  check("retour d'absence : le focus clavier est sur « Continuer »", (await js("document.activeElement && document.activeElement.dataset.action")) === "closemodal");
  if (process.env.SELFTEST_SHOT) require("fs").writeFileSync(process.env.SELFTEST_SHOT, (await wc.capturePage()).toPNG());
  await click('#modal .linkbtn[data-tab="pets"]');
  await sleep(200);
  check("retour d'absence : le bouton ferme le résumé et ouvre l'onglet", (await js("document.querySelector('#modal').hidden && document.querySelector('[data-tab=pets]').getAttribute('aria-selected') === 'true'")));
  // « Depuis ta dernière visite » : ligne en haut de la carte du héros, un clic la masque.
  await click('[data-tab="adventure"]');
  await js("(() => { const S = window.__game.S; window.__panel.sinceVisit = window.__game.visitSummary({ t: Date.now() - 42 * 60000, gold: 0, kills: 0, lvl: Math.max(1, S.lvl - 2), asc: S.prestige.count, leg: 0, best: 0 }); window.__panel.renderAll(); })()");
  await sleep(200);
  // Deux pièces d'une même panoplie portées (copie de test) : l'étiquette de la fiche du héros apparaît.
  await js("(() => { const E = window.__game.S.equip; const its = Object.values(E).filter(Boolean).slice(0, 2); its.forEach((it) => { it.set = 'dawn'; }); window.__game.invalidateStats(); window.__panel.renderAll(); })()");
  await sleep(100);
  const setTip = await js("(document.querySelector('#p-hero .chip.set') || {}).title || null");
  check("panoplie : bonus au survol de l'étiquette", setTip.split("\n").length === 2, JSON.stringify(setTip));
  // Prochain déblocage prêt : un clic sur la carte du héros l'achète (sans passer par la boutique).
  // (Valet d'armes remis en vente et payable : contrôle reproductible d'un passage à l'autre.)
  await js("(() => { const S = window.__game.S; delete S.unlocks.armsValet; S.gold = Math.max(S.gold, 1e9); window.__panel.renderAll(); })()");
  await sleep(100);
  const goalId = await js("(document.querySelector('#p-hero .goal[data-action=goal-buy]') || {}).dataset?.id || null");
  if (goalId) await js("document.querySelector('#p-hero .goal[data-action=goal-buy]').click()");
  await sleep(150);
  check("prochain déblocage : acheté d'un clic", goalId === "armsValet" && await js("!!window.__game.S.unlocks.armsValet"), goalId);
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
  if (process.env.SELFTEST_SHOT3) require("fs").writeFileSync(process.env.SELFTEST_SHOT3, (await wc.capturePage()).toPNG());
  await click("#menu-btn");
  await sleep(400);

  const failed = results.filter((r) => !r).length;
  console.log(`[selftest] ${results.length - failed}/${results.length} vérifications réussies — clic sur « Quitter »`);
  await click(".ptop .quit");
  await sleep(150);
  if (!(await js("!document.getElementById('confirm').hidden"))) console.log("[selftest] ÉCHEC la confirmation de sortie n'apparaît pas");
  else console.log("[selftest] OK   « Quitter » demande confirmation");
  await click('[data-action="confirm-ok"]');
}

module.exports = { runSelfTest };
