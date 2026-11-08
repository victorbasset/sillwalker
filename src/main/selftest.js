// Auto-test de l'interface (dev) : `npx electron . --selftest --user-data=...`
// Les événements souris sont injectés dans la page (sendInputEvent) : la vraie
// souris de l'utilisateur n'est jamais déplacée.
const { app } = require("electron");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runSelfTest(strip) {
  const wc = strip.win.webContents;
  const js = (code) => wc.executeJavaScript(code).catch((e) => { console.log("[selftest] ÉCHEC script :", code.slice(0, 140)); throw e; });
  const state = (expr) => js(`(() => { const S = window.__game.S; return ${expr}; })()`);
  const rectOf = (sel) => js(`(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), w: r.width }; })()`);
  const move = async (x, y) => { wc.sendInputEvent({ type: "mouseMove", x, y }); await sleep(150); };
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
  const b0 = bounds();

  // Zones cliquables : la fenêtre ne devient cliquable qu'au-dessus d'un
  // élément `.hit` (test sur des points d'écran, la vraie souris ne bouge pas).
  await sleep(600); // la page a déclaré ses zones
  const btn = await rectOf("#menu-btn");
  check("zone transparente au-dessus de la bande : clics traversants", !strip.hitTest(b0.x + Math.round(b0.width / 2), b0.y + 100));
  check("bouton du panneau : zone cliquable", strip.hitTest(b0.x + btn.x, b0.y + btn.y));
  check("zone vide de la bande : clics traversants", !strip.hitTest(b0.x + Math.round(b0.width / 2), b0.y + b0.height - 40));

  // Panneau : la fenêtre ne doit pas changer de taille (cause du clignotement).
  await click("#menu-btn");
  const samples = [];
  for (let i = 0; i < 8; i++) { samples.push(JSON.stringify(bounds())); await sleep(30); }
  await sleep(300);
  const shown = await js("document.body.classList.contains('panel-shown')");
  check("panneau ouvert", shown);
  check("fenêtre jamais redimensionnée pendant l'ouverture", samples.every((s) => s === JSON.stringify(b0)), samples[0]);
  const pr = await rectOf("#panel");
  check("panneau ouvert : sa zone devient cliquable", strip.hitTest(b0.x + pr.x, b0.y + pr.y));
  const panelTop = await js("Math.round(document.getElementById('panel').getBoundingClientRect().top)");
  const wrapTop = await js("Math.round(document.getElementById('panel-wrap').getBoundingClientRect().top)");
  check("panneau entièrement glissé en place", panelTop === wrapTop, `panel ${panelTop} / zone ${wrapTop}`);
  const hdr = await js("[...document.querySelectorAll('.ptop button')].map(b => b.textContent.trim()).join(' | ')");
  check("boutons de l'en-tête", /Mode mini/.test(hdr) && /Quitter/.test(hdr), hdr);
  check("pas de boutons de vitesse hors dev", app.isPackaged ? !/×10/.test(hdr) : true);

  // Fermeture
  await click("#panel .close");
  await sleep(400);
  check("panneau refermé", !(await js("document.body.classList.contains('panel-open')")));
  check("panneau refermé : sa zone laisse passer les clics", !strip.hitTest(b0.x + pr.x, b0.y + pr.y));

  // Mode mini depuis la bande
  await click("#mini-btn");
  await sleep(900);
  let b = bounds();
  check("bouton mini : passe en mode mini", strip.mode() === "mini" && b.width === 340 && b.height === 64, JSON.stringify(b));
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
  await js("window.__game.S.gold += 1e6; window.__game.S.lvl = Math.max(window.__game.S.lvl, 5); window.__game.invalidateStats(); window.__game.changed()");
  await click("#menu-btn");
  await sleep(400);
  await click('[data-tab="talents"]');
  await sleep(150);
  const spent0 = await state("Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0)");
  // Choisit un talent encore améliorable (les tests précédents ont pu en remplir).
  const learnable = await js(`(() => { const b = [...document.querySelectorAll('.talent:not(.locked):not(.maxed)')][0]; return b ? b.dataset.id : null; })()`);
  if (learnable) { await click(`.talent[data-id="${learnable}"]`); await sleep(150); }
  await click('[data-action="t-learn"][data-n="1"]');
  await sleep(150);
  const spent1 = await state("Object.values(S.talents[S.cls] || {}).reduce((a, b) => a + b, 0)");
  check("onglet Talents : « Apprendre » dépense un point", spent1 === spent0 + 1, `${spent0} -> ${spent1}`);
  await click('[data-tab="shop"]');
  await sleep(150);
  const pot0 = await state("S.potions");
  const canBuy = await js(`!!document.querySelector('[data-action="s-cons"][data-id="potion"]:not([disabled])')`);
  if (canBuy) await click('[data-action="s-cons"][data-id="potion"]');
  await sleep(150);
  const pot1 = await state("S.potions");
  check("onglet Boutique : achat d'une potion", !canBuy ? pot0 >= 20 : pot1 === pot0 + 1, `${pot0} -> ${pot1}`);
  await click('[data-tab="class"]');
  await sleep(150);
  const cls0 = await state("S.cls");
  const target = cls0 === "ranger" ? "mage" : "ranger";
  await click(`[data-action="c-pick"][data-id="${target}"]`);
  await sleep(200);
  check("onglet Classe : changement de classe", (await state("S.cls")) === target);
  await click(`[data-action="c-pick"][data-id="${cls0}"]`);
  await sleep(200);

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
  await click('[data-action="p-hatch"]');
  await sleep(150);
  check("onglet Familiers : faire éclore un œuf", (await state("S.pets.eggs")) >= 0 && (await state("Object.keys(S.pets.owned).length")) >= 1 && (await state("Object.keys(S.pets.owned).length + S.pets.eggs")) <= pets0);
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
  await click(`[data-action="se-opacity"][data-v="${op0}"]`);
  await sleep(200);
  // Raccourci clavier : 0 ouvre l'onglet n° 10 (Statistiques)
  wc.sendInputEvent({ type: "keyDown", keyCode: "0" });
  wc.sendInputEvent({ type: "char", keyCode: "0" });
  wc.sendInputEvent({ type: "keyUp", keyCode: "0" });
  await sleep(200);
  check("raccourci clavier vers un onglet", (await js("document.querySelector('[data-tab=stats]').getAttribute('aria-selected')")) === "true");
  await click('[data-tab="bestiary"]');
  await sleep(150);
  check("onglet Bestiaire : affiché", (await js("document.querySelectorAll('.beast').length")) >= 11);
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
