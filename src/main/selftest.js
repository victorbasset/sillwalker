// Auto-test de l'interface (dev) : `npx electron . --selftest --user-data=...`
// Les événements souris sont injectés dans la page (sendInputEvent) : la vraie
// souris de l'utilisateur n'est jamais déplacée.
const { app } = require("electron");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  await js("(() => { const g = window.__game; g.S.bag.splice(0, 12); for (let i = 0; i < 3; i++) { const it = g.newItem(0, 1); it.r = 0; it.set = null; g.S.bag.push(it); } g.changed() })()");
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
  for (let k = 0; k < 3 && (await js("document.querySelectorAll('.beast').length")) < 11; k++) {
    await click('[data-tab="bestiary"]');
    await until(async () => (await js("document.querySelectorAll('.beast').length")) >= 11, 1500);
  }
  check("onglet Bestiaire : affiché", (await js("document.querySelectorAll('.beast').length")) >= 11);
  // Sous-onglets du Bestiaire (demande 18) : un clic n'affiche que la section choisie (ici « Élites »).
  await click('.bjump [data-to="elites"]');
  await sleep(300);
  const sub = await js("(() => [!!document.getElementById('bj-elites'), document.querySelectorAll('.beast').length, !!document.querySelector('.bjump .on[data-to=elites]')].join(' '))()");
  check("Bestiaire : un sous-onglet n'affiche que sa section", sub === "true 0 true", sub);
  await click('.bjump [data-to="beasts"]');
  await sleep(200);
  // Résumé d'absence : « À faire maintenant » mène droit à l'onglet (ici les œufs → Familiers).
  await js("delete window.__game.S.unlocks.bulkPoints; delete window.__game.S.unlocks.armsValet; window.__game.S.gold = Math.max(window.__game.S.gold, 1e9); window.__game.S.pets.eggs = Math.max(1, window.__game.S.pets.eggs); window.__showOffline({ duration: '2 h 5 min', zone: 'Zone', kills: 1234, gold: 56789, xp: 4321, newLevel: 0, kept: 3, best: 3, feathers: 1, chests: 1, capped: true, capH: 10, forged: 12, transmuted: 3, petWork: 7, steps: [{ t: Date.now(), k: 'lvl', v: 100 }], bestItemId: (window.__game.S.bag[0] || {}).id })");
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
  check("retour d'absence : travail des automatismes affiché", (await js("document.querySelectorAll('#modal:not([hidden]) li').length")) >= 10);
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
  const kept = await js("(() => { const g = window.__game, S = g.S; const w = Object.values(S.equip).find(Boolean); w.set = 'hunter'; delete (S.setsDone || {}).hunter; for (const k in S.equip) if (k !== w.slot && S.equip[k]) delete S.equip[k].set; let it = g.newItem(2); for (let k = 0; k < 200 && (it.slot === w.slot || !S.equip[it.slot] || S.equip[it.slot].set); k++) it = g.newItem(2); it.st = {}; it.power = null; it.r = 2; it.set = 'hunter'; if (S.bag.length >= S.bagSize) S.bag.pop(); S.bag.unshift(it); g.invalidateStats(); window.__panel.renderAll(); const el = document.querySelector(`#p-bag .slot[data-id='${it.id}']`); window.__panel.onHover({ target: el }); return [...document.querySelectorAll('.itemtip .setprog')].length + ' ' + !g.uselessItems().includes(it) + ' ' + g.isUpgrade(it); })()");
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
  // « À faire » : amélioration du marchand achetée et équipée d'un clic.
  const mer = await js("(() => { const g = window.__game, S = g.S; S.bag.length = 0; S.gold = Math.max(S.gold, 1e9); let it = g.newItem(4, S.best + 20); for (let k = 0; k < 80 && !g.isUpgrade(it); k++) it = g.newItem(4, S.best + 20); it.price = 10; S.shop = { items: [it], next: Date.now() + 600000 }; window.__panel.renderAll(); const d = document.querySelector('#p-hero .todobox'); if (!d) return 'pas de bloc'; const b = d.querySelector('[data-what=merchant]'); if (!b) return 'pas de ligne'; b.click(); return String((S.equip[it.slot] || {}).id === it.id); })()");
  check("carte du héros : amélioration du marchand achetée et équipée", mer === "true", mer);
  // Événement en cours : sa pastille dans la carte du héros donne son effet au survol.
  const evTip = await js("(() => { window.__game.startEvent('goldrain'); window.__panel.renderAll(); return (document.querySelector('#p-hero .chip.event') || {}).title || 'pas de pastille'; })()");
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
  // Onglets progressifs : Talents fermé = bouton caché ; seuil atteint = annonce, bouton visible avec ✦ ; visite = ✦ retiré.
  const tb = await js("(() => { window.__clearToasts(); const g = window.__game, S = g.S, P = window.__panel; delete (S.settings.hints || {}).talent; S.tabsOpen.talents = undefined; delete S.tabsOpen.talents; P.renderAll(); const btn = document.querySelector('[data-tab=talents]'); const hid = btn.getClientRects().length === 0; g.step(1.1); P.renderAll(); const toast = document.getElementById('toast').textContent; const vis = btn.getClientRects().length > 0; const badge = document.querySelector('[data-badge=talents]').textContent; P.setTab('talents'); P.renderAll(); const badge2 = document.querySelector('[data-badge=talents]').textContent; P.setTab('adventure'); return [hid, vis, /Talents/.test(toast), badge, badge2 || '-', !!(S.settings.hints || {}).talent].join(' '); })()");
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
  const bg = await js("(() => { const S = window.__game.S; const v = S.prestige.skillPts; S.prestige.skillPts = 5000; window.__panel.renderAll(); const t = document.querySelector('[data-badge=skills]').textContent; S.prestige.skillPts = v; window.__panel.renderAll(); return t; })()");
  check("onglets : pastille plafonnée à 99+", bg === "99+", bg);
  // Accessibilité : les blocs repliables (summary) ont un focus clavier visible (règle présente dans la feuille chargée).
  const sf = await js("[...document.styleSheets].some((sh) => { try { return [...sh.cssRules].some((r) => /summary:focus-visible/.test(r.selectorText || '') && /outline/.test(r.cssText)); } catch { return false; } })");
  check("accessibilité : focus clavier visible sur un bloc repliable", sf === true, String(sf));
  // Boutons : même ordre partout (son, réduire à gauche, agrandir à droite) ; astuce affichée même panneau ouvert.
  const order = await js("(() => { const a = [...document.querySelectorAll('#mini .mini-btns button')].map((b) => b.id).join(','); const s = document.getElementById('mini-btn').compareDocumentPosition(document.getElementById('menu-btn')) & 4 ? 'mini-btn,menu-btn' : 'menu-btn,mini-btn'; return a + ' | ' + s; })()");
  check("boutons : réduire à gauche, agrandir à droite (mini et bande)", order === "mini-sound,mini-icon,mini-expand | mini-btn,menu-btn", order);
  const hintOpen = await js("(() => { document.getElementById('toast').click(); window.__noHints = false; window.__game.S.settings.hints = {}; window.__checkHints(); window.__noHints = true; const t = document.getElementById('toast'); const r = !t.hidden && /💡/.test(t.textContent); t.click(); return String(r); })()");
  check("astuce : affichée même le panneau ouvert", hintOpen === "true", hintOpen);
  await js("window.__panel.setTab('adventure')");
  // Grand palier de zone (50, 100…) : bannière dorée « Cap franchi ».
  const cap = await js("(() => { window.__game.emit('zoneUp', { zone: 100, record: true }); const b = [...document.querySelectorAll('.banner.big')].pop(); return b ? b.textContent : 'aucune'; })()");
  check("record : grand palier annoncé (bannière dorée)", /100/.test(cap) && /✦/.test(cap), cap);
  // Clic sur un objet du sac : son détail s'ouvre sous le sac, l'équipement reste affiché (demande de Victor).
  const bd = await js("(() => { window.__panel.setTab('adventure'); window.__panel.renderAll(); const b = document.querySelector('#p-bag .slot[data-from=bag]'); if (!b) return 'sac vide'; b.click(); const r = !!document.querySelector('#p-bag .bagdetail [data-action=equip]') + ' ' + !!document.querySelector('#p-detail .eqlist'); const back = document.querySelector('#p-bag [data-action=desel]'); if (back) back.click(); return r + ' ' + !document.querySelector('#p-bag .bagdetail'); })()");
  check("objet cliqué : détail sous le sac, équipement toujours visible, « ← sac » referme", bd === "true true true", bd);
  // Cinématiques de l'histoire : arrivée chez le Briseur puis victoire, jouées sans erreur, un clic les passe.
  const cin = await js("(() => { const J = window.__strip.juice; J.cinematic('arrive'); const a = !!document.querySelector('.cine.arrive'); document.querySelector('.cine.arrive').click(); J.cinematic('dawn'); const d = document.querySelector('.cine.dawn'); const t = d && d.querySelector('.cine-title').textContent; d && d.click(); J.cinematic('intro'); const i = !!document.querySelector('.cine.intro'); document.querySelector('.cine.intro').click(); J.cinematic('credits'); const c = document.querySelector('.cine.credits'); c && c.click(); J.cinematic('chronicle', { title: 'X', n: 4, total: 9 }); const h = document.querySelector('.cine.chronicle'); const ht = h && h.querySelector('.cine-sub').textContent; h && h.click(); J.cinematic('freed', { cls: 'ranger' }); const fr = document.querySelector('.cine.freed .cine-hero'); document.querySelector('.cine.freed').click(); return a + ' ' + !!d + ' ' + !!t + ' ' + i + ' ' + !!c + ' ' + /4/.test(ht || '') + ' ' + !!fr; })()");
  await new Promise((r) => setTimeout(r, 400));
  const gone = await js("!document.querySelector('.cine')");
  // File : une cinématique lancée pendant une autre attend la fin de la première (héros libéré puis chronique).
  const cq = await js("(() => { const J = window.__strip.juice; J.cinematic('freed', { cls: 'ranger' }); J.cinematic('chronicle', { title: 'Q', n: 2, total: 9 }); const one = document.querySelectorAll('.cine.chronicle').length === 0 && !!document.querySelector('.cine.freed') && document.querySelector('.cine.freed').classList.contains('hit'); document.querySelector('.cine.freed').click(); return String(one); })()");
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
  }
  strip.win.setBounds(bLap);
  await sleep(600);
  // Carte Zone : la Malédiction indique sa parade (Talisman de pureté) une fois le pouvoir découvert.
  const par = await js("(() => { const g = window.__game, S = g.S, P = window.__panel, z = S.zone, seen = Object.assign({}, S.powersSeen); S.zone = 11; S.powersSeen = Object.assign({}, seen, { p_pure: true }); P.setTab('adventure'); P.renderAll(); const t = [...document.querySelectorAll('.bossmech b[title]')].map((b) => b.title).join(' | '); S.zone = z; S.powersSeen = seen; P.renderAll(); return t; })()");
  check("zone : la Malédiction indique sa parade", /Talisman/.test(par), par);
  // Menu de l'icône : « Économie d'énergie » envoyé comme une commande, sans ouvrir le panneau.
  const ecoBefore = await js("String(!!window.__game.S.settings.eco)");
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
    for (const id of ["wind", "goldrain", "frenzy", "bounty", "wisdom", "hawkeye", "shardfall", "zeal", "nest", "ward", "inconnu"]) await render("évén-" + id, (s) => s.eventSound(id));
    for (const k of ["bubble", "drip", "snow", "dust", "ember", "spore", "mote", "ash", "feather", "leaf", null]) await render("zone-" + k, (s) => { s.zoneSounds(k, false, true); s.zoneSounds(k, true, true); });
    await render("oiseau", (s) => s.birdCall());
    for (const id of ["bolt", "gust", "mend", "fire", "aegis", "meteor"]) await render("sort-" + id, (s) => s.spellSound(id));
    await render("gestion", (s) => { const h = {}; s.bind({ on: (e, fn) => { h[e] = fn; }, R: { events: {} }, S: window.__game.S, zoneDef: () => null }); clearInterval(s.ambT); h.equipped({ r: 4 }); h.soldOne({}); h.sold({ n: 9 }); h.spent({}); h.learned({ skill: true }); });
    await render("ambiance-évén", (s) => s.eventAmbience({ goldrain: 5, wind: 5, shardfall: 5, nest: 5 }));
    for (const id of ["coin", "loot", "legendary", "level", "boss", "chest", "star", "quest", "ascend"]) await render("play-" + id, (s) => s.play(id));
    return out.join(" ") || "ok";
  } catch (e) { return "erreur " + e.message; } })()`);
  check("son : tous les sons se rendent sans erreur, NaN ni saturation", sndAll === "ok", sndAll);
  // Touche C du panneau : coupe puis rallume le son (comme le haut-parleur).
  const keyC = await js("(() => { const P = window.__game.S.settings, keep = { s: P.sound, m: P.music, mu: P.muted }; P.sound = true; P.muted = false; window.__panel.onKey({ key: 'c', target: document.body }); const a = P.muted; window.__panel.onKey({ key: 'c', target: document.body }); const b = P.muted; Object.assign(P, { sound: keep.s, music: keep.m, muted: keep.mu }); return a + ' ' + b; })()");
  check("touche C : coupe puis rallume le son", keyC === "true false", keyC);
  // « Quoi de neuf » : toute l'édition se lit sans faire défiler la fenêtre.
  const nw = await js("(() => { window.__panel.showNews(); const b = document.querySelector('#modal .panel'); const o = b.scrollHeight - b.clientHeight, n = document.querySelectorAll('.newslist li').length; document.querySelector('#modal [data-action=closemodal]').click(); return n + ' ' + o; })()");
  check("« Quoi de neuf » : toute l'édition visible sans défilement", /^\d+ [0-2]$/.test(nw) && +nw.split(" ")[0] > 0, nw);
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
  // Carte du voyageur (déblocage) : un clic sur une zone déjà atteinte y emmène le héros.
  const tv = await js("(() => { const g = window.__game, S = g.S, P = window.__panel; const z0 = S.zone, had = S.unlocks.travelMap; S.unlocks.travelMap = true; P.setTab('map'); P.renderAll(); const t = document.querySelector('svg.rebord .mz.go[data-z=\"' + Math.max(1, z0 - 2) + '\"]'); if (!t) return 'pas de zone cliquable'; t.dispatchEvent(new MouseEvent('click', { bubbles: true })); const r = S.zone === Math.max(1, z0 - 2); g.setZone(z0); if (!had) delete S.unlocks.travelMap; P.setTab('adventure'); return String(r); })()");
  check("carte du voyageur : clic sur une zone atteinte = voyage", tv === "true", tv);
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
  if (process.env.SELFTEST_SHOT3) require("fs").writeFileSync(process.env.SELFTEST_SHOT3, (await wc.capturePage()).toPNG());
  await click("#menu-btn");
  await sleep(400);

  check("aucune erreur de l'interface pendant le parcours", rendErr.length === 0, rendErr.length ? `${rendErr.length} : ${rendErr[0]}` : "");
  const failed = results.filter((r) => !r).length;
  console.log(`[selftest] ${results.length - failed}/${results.length} vérifications réussies — clic sur « Quitter »`);
  await click(".ptop .quit");
  await sleep(150);
  if (!(await js("!document.getElementById('confirm').hidden"))) console.log("[selftest] ÉCHEC la confirmation de sortie n'apparaît pas");
  else console.log("[selftest] OK   « Quitter » demande confirmation");
  await click('[data-action="confirm-ok"]');
}

module.exports = { runSelfTest };
