// Processus principal : cycle de vie, fenêtre, zone de notification,
// sauvegarde, Steam. Le jeu lui-même tourne dans le renderer.
const path = require("path");
const fs = require("fs");
const os = require("os");
const { app, ipcMain, powerMonitor } = require("electron");
const config = require("../shared/config");
const flags = require("./flags");
const { registerScheme, serveDirectory } = require("./protocol");

if (flags.userData) app.setPath("userData", path.resolve(flags.userData));
app.setAppUserModelId("com.sillwalker.game");
registerScheme();
// Effets sonores (désactivés par défaut) : pas besoin d'un clic pour démarrer l'audio.
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
// Tests (--ghost) : la fenêtre est hors de l'écran ; sans ceci, Windows la croirait cachée et elle ne serait plus dessinée.
if (process.argv.includes("--ghost")) app.commandLine.appendSwitch("disable-features", "CalculateNativeWinOcclusion");

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  start();
}

function start() {
  const { Settings } = require("./settings");
  const { SaveStore } = require("./save-store");
  const { Steam } = require("./steam");
  const { StripWindow } = require("./strip-window");
  const { createTray } = require("./tray");

  const steam = new Steam();
  let strip = null, trayCtl = null, lastSaveText = null, quitting = false;

  app.on("second-instance", () => { if (strip && !strip.isShown()) strip.toggle(); });
  app.on("window-all-closed", () => { /* appli de zone de notification : on reste ouvert */ });

  // macOS : pas d'icône dans le Dock (comme sous Windows, où la bande n'a pas de bouton dans la barre des tâches) ;
  // le jeu se pilote par la bande, le panneau et l'icône de la barre des menus.
  if (process.platform === "darwin" && app.dock) app.dock.hide();
  app.whenReady().then(() => {
    if (steam.init({ isDev: flags.isDev }) === "relaunch") { app.quit(); return; }

    const settings = new Settings();
    // (it. 837, demande de Victor) Lancé à la main, le jeu doit se voir tout de suite, sinon le joueur croit qu'il ne
    // marche pas : premier lancement -> bande ; mode icône resté d'une session précédente -> dernier mode affiché.
    // Démarrage avec la session (lancement automatique : machine allumée depuis moins de 3 min) : réglage respecté.
    const atLogin = !!app.getLoginItemSettings().wasOpenedAtLogin || os.uptime() < 180;
    if (settings.isNew) settings.set("mode", "strip");
    else if (!atLogin && settings.get("mode") === "icon") settings.set("mode", settings.get("lastShownMode") === "mini" ? "mini" : "strip");
    require("./i18n").setLang(settings.get("lang") || "en");
    const store = new SaveStore(app.getPath("userData"), { backupIntervalMs: config.BACKUP_INTERVAL_MS });
    const url = serveDirectory(path.join(__dirname, "..", "renderer"));

    strip = new StripWindow({
      settings,
      preload: path.join(__dirname, "..", "preload", "preload.js"),
      url,
      devTools: flags.isDev,
      openDevTools: flags.devTools,
      ghost: flags.ghost,
      testWidth: flags.width,
    });
    if (flags.trace) require("./trace").startTrace(strip.win.webContents, flags.trace, app.getPath("temp"));
    if (!flags.ghost) trayCtl = createTray({ strip, isDev: flags.isDev, steam }); // tests : pas d'icône de notification

    /* ---------- IPC ---------- */
    ipcMain.handle("init:get", () => ({
      isDev: flags.isDev,
      devControls: flags.isDev && !flags.releaseUi,
      crawl: flags.crawl,
      fontBench: flags.fontBench,
      devSpeed: flags.devSpeed,
      layout: strip.layout(),
      visible: strip.renderVisible(),
      version: app.getVersion(),
      steam: { available: steam.available, status: steam.status },
      onBattery: onBattery(), idle: isIdle(),
    }));

    ipcMain.handle("save:load", () => {
      const local = store.load();
      const cloud = steam.cloudRead();
      // Steam Cloud : on garde la sauvegarde la plus récente.
      if (cloud && typeof cloud.v === "number" && (!local.data || (cloud.last || 0) > (local.data.last || 0))) {
        console.log("[save] Steam Cloud plus récent que la sauvegarde locale");
        return { data: cloud, source: "cloud", notice: local.data ? "Partie synchronisée depuis Steam Cloud." : undefined };
      }
      console.log("[save] chargée depuis :", local.source);
      return local;
    });

    ipcMain.handle("save:write", (_e, text) => {
      store.write(String(text));
      lastSaveText = text;
      steam.cloudWrite(text, false);
      return true;
    });

    ipcMain.handle("panel:set", (_e, open) => strip.setPanelOpen(open));
    ipcMain.on("mode:set", (_e, mode) => strip.setMode(String(mode)));
    ipcMain.on("app:quit", () => app.quit());
    // (it. 815) page des avis (adresse fixe de config.js, jamais une adresse venue de la page) ; pas pendant les tests
    ipcMain.on("app:feedback", () => {
      if (flags.ghost || flags.crawl || flags.selftest) { console.log("[feedback] (test) " + config.FEEDBACK_URL); return; }
      require("electron").shell.openExternal(config.FEEDBACK_URL).catch(() => {});
    });
    // Langue de la page : traduit aussi le menu de l'icône (et s'en souvient pour le prochain lancement).
    ipcMain.on("lang:set", (_e, id) => {
      const i18n = require("./i18n");
      if (id === i18n.getLang() && settings.get("lang") === id) return;
      i18n.setLang(id); settings.set("lang", i18n.getLang());
      if (trayCtl) trayCtl.rebuild();
    });
    ipcMain.on("hero:status", (_e, st) => {
      if (trayCtl) trayCtl.setStatus(st);
      if (st && st.lvl) steam.setPresence(st);
    });
    // Réglages de fenêtre depuis le panneau (mêmes actions que le menu de l'icône)
    const { loginItemOptions } = require("./tray");
    ipcMain.handle("win:get", () => ({ openAtLogin: app.getLoginItemSettings(loginItemOptions()).openAtLogin }));
    ipcMain.on("win:set", (_e, s) => {
      if (!s || typeof s !== "object") return;
      if (s.edge === "top" || s.edge === "bottom") strip.setEdge(s.edge);
      if (typeof s.opacity === "number" && s.opacity >= 0.05 && s.opacity <= 1) strip.setOpacity(s.opacity);
      if (typeof s.panelZoom === "number" && s.panelZoom >= 1 && s.panelZoom <= 1.5) strip.setPanelZoom(s.panelZoom); // (it. 948)
      if (typeof s.openAtLogin === "boolean") app.setLoginItemSettings({ openAtLogin: s.openAtLogin, ...loginItemOptions() });
      if (trayCtl) trayCtl.rebuild();
    });
    ipcMain.on("tray:icons", (_e, set) => {
      if (trayCtl) trayCtl.setIcons(set);
      // Dev : enregistre l'icône (32 px) à côté de la capture pour vérification.
      if (flags.shot && set && set.walk) try {
        for (const [k, n] of [["x1", 16], ["x2", 32]]) fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, `-tray${n}.png`), Buffer.from(String(set.walk[0][k]).split(",")[1], "base64"));
      } catch { /* sans importance */ }
    });
    ipcMain.on("mouse:rects", (_e, rects) => strip.setHitRects(rects));
    ipcMain.on("win:drag", (_e, phase) => (phase === "start" ? strip.dragStart() : strip.dragEnd()));
    ipcMain.on("achievements:unlock", (_e, ids) => { if (Array.isArray(ids)) steam.unlock(ids.map(String)); });

    ipcMain.once("app:ready", () => {
      if (strip.isShown()) strip.reveal();
      if (flags.mode) strip.setMode(flags.mode);
      if (flags.openPanel) setTimeout(() => strip.send("command", "open-panel"), 300);
      if (flags.tab) setTimeout(() => strip.send("command", "tab:" + flags.tab), 300);
      if (flags.shot) setTimeout(async () => {
        const img = await strip.win.webContents.capturePage();
        fs.writeFileSync(path.resolve(flags.shot), img.toPNG());
        // Extraits gauche/droite lisibles même sur un très large écran.
        const { width, height } = img.getSize();
        const w = Math.min(width, 900);
        fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, "-left.png"), img.crop({ x: 0, y: 0, width: w, height }).toPNG());
        fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, "-right.png"), img.crop({ x: width - w, y: 0, width: w, height }).toPNG());
        const cw = Math.min(width, 1900);
        fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, "-center.png"), img.crop({ x: Math.round((width - cw) / 2), y: 0, width: cw, height }).toPNG());
        console.log("[dev] capture :", path.resolve(flags.shot), strip.win.getBounds());
      }, flags.shotDelay || (flags.openPanel || flags.tab ? 1500 : 1000));
      if (flags.exitAfter) setTimeout(async () => {
        try { console.log("[dev] compteurs :", JSON.stringify(await strip.win.webContents.executeJavaScript("window.__perf"))); } catch {}
        app.quit();
      }, flags.exitAfter * 1000);
      // Une erreur imprévue de l'autotest ne doit pas le laisser figé : elle compte comme un échec et on quitte.
      if (flags.selftest) require("./selftest").runSelfTest(strip).catch((e) => { console.log("[selftest] ÉCHEC erreur imprévue : " + (e && e.message)); app.exit(1); });
      if (flags.dumpText) setTimeout(async () => {
        const wc = strip.win.webContents, tabs = ["adventure", "talents", "skills", "quests", "shop", "pets", "class", "ascension", "bestiary", "stats", "map", "settings"];
        let out = "";
        for (const t of tabs) {
          strip.send("command", "tab:" + t);
          await new Promise((r) => setTimeout(r, 700));
          out += `=== ${t}\n` + await wc.executeJavaScript(`(() => {
            const p = document.querySelector("#panel") || document.body;
            const extra = [...document.querySelectorAll("[title], [aria-label]")].map((e) => (e.title || "") + " | " + (e.getAttribute("aria-label") || ""));
            return p.innerText + "\\n--- attributs\\n" + extra.join("\\n");
          })()`) + "\n";
        }
        out += "=== strip\n" + await wc.executeJavaScript("document.body.innerText");
        fs.writeFileSync(path.resolve(flags.dumpText), out);
        console.log("[dev] texte :", path.resolve(flags.dumpText));
        app.quit();
      }, 1500);
      // Défilement de chaque onglet (langues aux mots longs, petits écrans) : « [overflow] aucun » ou « onglet=px … ».
      if (flags.overflowReport) setTimeout(async () => {
        const r = await strip.win.webContents.executeJavaScript(`(() => { const p = document.getElementById("panel"), P = window.__panel, out = []; P.kept.clear();
          for (const id of ["adventure","talents","skills","quests","shop","pets","class","ascension","bestiary","stats","map","settings"]) {
            const b = document.querySelector("[data-tab=" + id + "]"); if (!b || !b.getClientRects().length) continue;
            P.setTab(id); P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(id + "=" + o);
            // (it. 543) ligne de liste plus large que sa colonne (débordement horizontal)
            let w = 0; for (const li of document.querySelectorAll(".lines li")) if (li.getClientRects().length && li.scrollWidth > li.clientWidth + 1) w++; if (w) out.push(id + "-large=" + w);
            // (it. 849) libellé d'un seul mot trop long qui passe sous sa valeur (« Gegenstandssammlung44 / 44 »)
            let c = 0, cw = []; for (const sp of document.querySelectorAll(".lines li > span:first-child")) if (sp.getClientRects().length && sp.scrollWidth > sp.clientWidth + 1) { c++; cw.push(sp.textContent.trim().slice(0, 30) + " (" + ((sp.nextElementSibling || {}).textContent || "").trim().slice(0, 20) + ")"); } if (c) out.push(id + "-chevauche=" + c + "[" + cw.join(" / ") + "]"); // (it. 935) libellé et valeur cités
            // (it. 864) tuiles du héros (Points de vie, Attaque…) : libellé ou valeur coupé (« Punkty ży… »)
            const tl = []; for (const e of document.querySelectorAll("[data-pane=" + id + "]:not([hidden]) .tile > span, [data-pane=" + id + "]:not([hidden]) .tile > b")) if (e.getClientRects().length && e.scrollWidth > e.clientWidth + 1) tl.push(e.textContent.trim().slice(0, 24) + "/" + e.clientWidth + "<" + e.scrollWidth); if (tl.length) out.push(id + "-tuile=" + tl.length + "(" + tl.join(" ; ") + ")");
            // (it. 865) mot coupé en plein milieu sur deux lignes, sans trait d'union (« Восстанавлив / ает ») ; les écritures
            // sans espaces (chinois, japonais) se coupent normalement entre deux caractères : ignorées ; le coréen
            // (it. 866 : word-break keep-all, mots entiers) est contrôlé comme les autres
            const cut = new Set(), pane = document.querySelector("[data-pane=" + id + "]:not([hidden])");
            if (pane) { const tw = document.createTreeWalker(pane, NodeFilter.SHOW_TEXT), rg = document.createRange();
              for (let n; (n = tw.nextNode());) { if (!n.parentElement.getClientRects().length) continue;
                for (const m of n.data.matchAll(/[\\p{L}\\p{M}]{4,}/gu)) { if (/[\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}]/u.test(m[0])) continue;
                  rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length); const rs = [...rg.getClientRects()].filter((x) => x.width > 0);
                  // (it. 879) après un trait d'union conditionnel (\u00AD, « Panzer-/handschuhe ») : le tiret dessiné en fin de ligne
                  // est compté avec la suite du mot ; coupure voulue, pas un mot coupé
                  if (n.data[m.index - 1] === "\u00AD") rs.shift();
                  if (rs.length > 1 && Math.abs(rs[rs.length - 1].top - rs[0].top) > 2) cut.add(m[0]); } } }
            if (cut.size) out.push(id + "-coupé=" + [...cut].slice(0, 4).join("/"));
            // (it. 1001) titre de panneau en chinois ou en japonais coupé entre deux caractères (« 装 / 備 » à côté d'un
            // sous-titre) : non vu par la mesure des mots coupés, qui ignore ces écritures
            const th = []; if (pane) for (const h of pane.querySelectorAll(".panel > h2")) { const n = [...h.childNodes].find((x) => x.nodeType === 3 && x.data.trim());
              if (!n || !h.getClientRects().length || !/[\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}]/u.test(n.data)) continue;
              const rg = document.createRange(); rg.selectNodeContents(n); const rs = [...rg.getClientRects()].filter((x) => x.width > 0);
              if (rs.length > 1 && Math.abs(rs[rs.length - 1].top - rs[0].top) > 2) th.push(n.data.trim()); }
            if (th.length) out.push(id + "-titre=" + th.slice(0, 4).join("/")); }
          P.showNews(); const nb = document.querySelector("#modal .panel"), no = nb ? nb.scrollHeight - nb.clientHeight : 0;
          if (no > 2) out.push("news=" + no); document.querySelector("#modal [data-action=closemodal]")?.click();
          // Héros > Sorts et attaque (sorts du héros + style de l'attaque de base)
          // (it. 553) pour les 20 héros : les cartes à deux effets passent sur deux lignes ; le pire est signalé
          { P.setTab("class"); P.tabs.class.sec = "style"; const G = window.__game, keep = G.S.cls; let worst = 0, who = "";
            for (const c of [...new Set((window.__spellsAll || []).map((x) => x.cls))].concat(keep)) { G.S.cls = c; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > worst) { worst = o; who = c; } }
            G.S.cls = keep; P.renderAll(); if (worst > 2) out.push("sorts=" + worst + "(" + who + ")"); P.tabs.class.sec = "freed"; }
          // Statistiques > Succès (la liste grandit avec chaque succès ; les noms longs du russe passent sur deux lignes)
          if (P.tabs.stats) { P.setTab("stats"); P.tabs.stats.sec = "ach"; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("succès=" + o); P.tabs.stats.sec = "numbers"; }
          // (it. 1013-1014) sous-sections autres que celle par défaut (seule celle-ci était mesurée) : « onglet-section=N »
          const SUBS = { bestiary: ["codex", "powers", "sets", "bosses", "elites", "events"], shop: ["unlocks", "workshop"],
            stats: ["journey"], pets: ["unknown"], class: ["locked"] };
          for (const [tab, secs] of Object.entries(SUBS)) { if (!P.tabs[tab]) continue;
            const bt = document.querySelector("[data-tab=" + tab + "]"); if (!bt || !bt.getClientRects().length) continue;
            P.setTab(tab); const keepSec = P.tabs[tab].sec;
            for (const sec of secs) { P.tabs[tab].sec = sec; P.renderAll(); if (P.tabs[tab].sec !== sec) continue;
              const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(tab + "-" + sec + "=" + o); }
            P.tabs[tab].sec = keepSec; P.renderAll(); }
          // (it. 929) tous les déblocages SAUF le dernier : la carte « Prochain déblocage » réapparaît (avec tous, elle
          // disparaît : l'it. 928 a trouvé 11 px de défilement en russe à 1280 sans qu'aucune mesure le voie) ; prêt et pas prêt
          { const G = window.__game, S = G.S, ks = Object.keys(S.unlocks || {}), last = ks[ks.length - 1], keepG = S.gold;
            if (last) { delete S.unlocks[last]; P.setTab("adventure");
              for (const [gold, tag] of [[1e300, "prêt"], [1, "pas-prêt"]]) { S.gold = gold; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("adventure-avant-dernier-" + tag + "=" + o); }
              S.unlocks[last] = true; S.gold = keepG; } }
          // (it. 939) Statistiques sous chaque bénédiction du jour : « aujourd'hui … » allonge certaines valeurs (coffre,
          // élite, gobelin) ; « Schatztruhe » passait sous sa valeur les Jours des trésors seulement (défaut intermittent)
          // (it. 940) toutes les bénédictions, Aventure (puce de la bénédiction) comprise
          { const D = window.__game.S.daily, km = D.mod;
            for (const t of ["adventure", "stats"]) { if (!P.tabs[t]) continue; P.setTab(t); if (t === "stats") P.tabs.stats.sec = "numbers";
              for (const m of window.__dayMods || []) { D.mod = m; window.__game.invalidateStats(); P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(t + "-" + m + "=" + o);
                let c = 0; for (const sp of document.querySelectorAll("[data-pane=" + t + "]:not([hidden]) .lines li > span:first-child")) if (sp.getClientRects().length && sp.scrollWidth > sp.clientWidth + 1) c++; if (c) out.push(t + "-" + m + "-chevauche=" + c);
                for (const e of document.querySelectorAll("[data-pane=" + t + "]:not([hidden]) .chip:not(.daymod)")) if (e.getClientRects().length && e.scrollWidth > e.clientWidth + 1) out.push(t + "-" + m + "-puce-coupée"); } }
            D.mod = km; window.__game.invalidateStats(); }
          P.kept.clear(); P.setTab("adventure"); P.renderAll();
          for (const k of ["hero-todo", "hero-chron", "hero-stats", "rates"]) {
            const d = document.querySelector("[data-keep=" + k + "]"); if (!d) continue; d.querySelector("summary").click();
            const m = document.getElementById("modal"), mb = m.querySelector(".panel"), mo = mb.scrollHeight - mb.clientHeight;
            if (mo > 2) out.push(k + "=" + mo); m.hidden = true; }
          return innerWidth + " " + (out.join(" ") || "aucun"); })()`).catch((e) => "erreur " + e.message);
        // (it. 1027) astuces : chacune dans la bulle (trois lignes au plus, it. 1026) ; celles qui seraient coupées par « … »
        const hc = await strip.win.webContents.executeJavaScript(`(async () => { const H = (await import("./ui/hints.js")).HINTS, G = window.__game,
            t = document.getElementById("toast"), b = document.body, open = b.classList.contains("panel-open"), keep = [t.hidden, t.innerHTML], cut = [];
          b.classList.remove("panel-open"); t.hidden = false;
          for (const h of H) { let txt = h.text; if (!txt && h.textFn) { try { txt = h.textFn(G); } catch { txt = null; } } if (!txt) continue;
            t.innerHTML = '<span class="hint">💡</span> ' + txt; if (t.scrollHeight > t.clientHeight + 2) cut.push(h.id); }
          t.hidden = keep[0]; t.innerHTML = keep[1]; if (open) b.classList.add("panel-open");
          return cut.length ? "astuce-coupée=" + cut.join("/") : ""; })()`).catch((e) => "astuces : erreur " + e.message);
        const rr = hc ? (/ aucun$/.test(r) ? r.replace(/ aucun$/, " " + hc) : r + " " + hc) : r;
        console.log("[overflow] " + rr);
        app.quit();
      }, 3000);
      // (it. 789) --tour : la bande seule 12 s, puis le panneau et cinq onglets (4 s chacun), puis la bande de nouveau
      if (flags.tour) [[12, "tab:adventure"], [16, "tab:skills"], [20, "tab:map"], [24, "tab:class"], [28, "tab:pets"], [32, "toggle-panel"]]
        .forEach(([t, c]) => setTimeout(() => strip.send("command", c), t * 1000));
      // (it. 807) --trailer : minutage fixe des scènes filmées pour la bande-annonce (scripts/trailer/make.sh coupe aux
      // mêmes secondes). Cinématiques forcées (réglage ignoré), panneau ouvert sur quelques onglets à la fin.
      if (flags.trailer) {
        const run = (code) => strip.win.webContents.executeJavaScript(code).catch((e) => console.log("[trailer]", e.message));
        const cine = (kind, data = "{}") => `window.__strip.juice.cinematic("${kind}", Object.assign(${data}, { force: true }))`;
        [[2, cine("intro")],
          [26, `import("./game/relics.js").then((m) => ${cine("arrive", "{ major: m.MAJOR_BOSSES[0] }")})`],
          [38, cine("relic", '{ id: "drone" }')],
          [56, cine("freed", '{ cls: "mage" }')],
          [96, cine("dawn")],
        ].forEach(([t, code]) => setTimeout(() => run(code), t * 1000));
        [[66, "tab:skills"], [71, "tab:map"], [76, "tab:class"], [81, "tab:pets"], [86, "toggle-panel"]]
          .forEach(([t, c]) => setTimeout(() => strip.send("command", c), t * 1000));
      }
      if (flags.stage) { try { const code = fs.readFileSync(flags.stage, "utf8"); setTimeout(() => strip.win.webContents.executeJavaScript(code).catch((e) => console.log("[stage]", e.message)), 600); } catch (e) { console.log("[stage] lecture : " + e.message); } }
      if (flags.demo) setTimeout(() => strip.win.webContents.executeJavaScript("window.__demo && window.__demo()"), 800);
      // (it. 767) Dev : accélération graphique (lenteurs signalées par Victor sous Windows)
      if (flags.isDev) setTimeout(() => { try { const g = app.getGPUFeatureStatus(); console.log(`[dev] carte graphique : dessin ${g.gpu_compositing}, rendu ${g.rasterization}, canevas ${g["2d_canvas"]}, WebGL ${g.webgl}`); } catch { /* sans importance */ } }, 3000);
      if (flags.perf) require("./perf").runPerf(strip, typeof flags.perf === "string" ? { phase: +flags.perf } : {});
    });

    /* ---------- Robustesse ---------- */
    // Dev : erreurs et avertissements de l'interface recopiés dans la console.
    // (it. 828) Journal des erreurs pour les joueurs (userData/errors.log, 200 Ko au plus, l'ancien gardé en .old) : un
    // joueur qui signale un bug peut le joindre à son avis. Seulement les erreurs, avec la version du jeu.
    const errLog = path.join(app.getPath("userData"), "errors.log");
    const logError = (text) => {
      try {
        if (fs.existsSync(errLog) && fs.statSync(errLog).size > 200 * 1024) fs.renameSync(errLog, errLog + ".old");
        fs.appendFileSync(errLog, `${new Date().toISOString()} v${app.getVersion()} ${text}\n`);
      } catch { /* journal facultatif */ }
    };
    strip.win.webContents.on("console-message", (e) => {
      const level = e.level ?? e.params?.level;
      if (level !== "error" && level !== 3) return;
      logError(`${e.message ?? e.params?.message} (${e.sourceId ?? ""}:${e.lineNumber ?? ""})`);
    });
    // (it. 829) aussi les erreurs du processus principal et les plantages de la page (« le jeu s'est fermé »)
    process.on("uncaughtException", (err) => { logError("[principal] " + (err && err.stack || err)); console.error(err); });
    process.on("unhandledRejection", (err) => { logError("[principal, promesse] " + (err && err.stack || err)); });
    if (flags.isDev) strip.win.webContents.on("console-message", (e) => {
      const level = e.level ?? e.params?.level;
      if (level === "warning" || level === "error" || level === 2 || level === 3) console.log(`[renderer ${level}] ${e.message ?? e.params?.message} (${e.sourceId ?? ""}:${e.lineNumber ?? ""})`);
    });
    strip.win.webContents.on("render-process-gone", (_e, d) => {
      console.error("[main] renderer arrêté :", d.reason);
      if (d.reason !== "clean-exit") logError("[page arrêtée] " + d.reason + (d.exitCode != null ? " (code " + d.exitCode + ")" : ""));
      if (!quitting && d.reason !== "clean-exit") strip.win.reload();
    });
    // Arrêt / déconnexion de Windows : dernière sauvegarde.
    strip.win.on("query-session-end", () => { flushRenderer(); });
    // Portable débranché : la bande s'anime moins souvent (économie de batterie), retour à la normale sur secteur.
    // Personne devant l'écran (5 min sans souris ni clavier) : animation au ralenti ; vérifié toutes les 5 s.
    let lastPower = "";
    const sendPower = () => {
      const p = { onBattery: onBattery(), idle: isIdle() }, k = JSON.stringify(p);
      if (k !== lastPower) { lastPower = k; strip.send("power", p); }
    };
    powerMonitor.on("on-battery", sendPower);
    powerMonitor.on("on-ac", sendPower);
    setInterval(sendPower, 5000);
    // Bon voisin : cachée devant une application en plein écran (Windows ; réglage dans le menu de l'icône).
    const { watchFullscreen } = require("./fullscreen-watch");
    // lancé à la main : surveillance après 20 s, le temps que le joueur voie la bande (une fausse détection de plein
    // écran au démarrage la cacherait aussitôt : « le jeu ne marche pas »)
    let fsWatch = { stop() {} };
    setTimeout(() => { if (!quitting) fsWatch = watchFullscreen({ onChange: (on) => strip.setFullscreenApp(on), enabled: () => strip.settings.get("hideOnFullscreen") !== false }); }, atLogin ? 0 : 20000);
    app.on("before-quit", () => fsWatch.stop());
    powerMonitor.on("lock-screen", () => strip.setLocked(true));
    powerMonitor.on("unlock-screen", () => strip.setLocked(false));
  });

  /** Personne devant l'écran depuis 5 min ? (--idle en dev pour le simuler.) */
  function isIdle() { try { return flags.idle || powerMonitor.getSystemIdleTime() >= 300; } catch { return false; } }

  /** Sur batterie ? (--battery en dev pour le simuler et le mesurer.) */
  function onBattery() { try { return flags.battery || powerMonitor.isOnBatteryPower(); } catch { return false; } }

  /** Demande au renderer une dernière sauvegarde, avec délai maximal. */
  function flushRenderer() {
    if (!strip || strip.win.isDestroyed()) return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => { clearTimeout(t); ipcMain.off("app:flush-done", done); resolve(); };
      const t = setTimeout(done, config.FLUSH_TIMEOUT_MS);
      ipcMain.on("app:flush-done", done);
      strip.send("app:flush");
    });
  }

  app.on("before-quit", (e) => {
    if (quitting) return;
    quitting = true;
    e.preventDefault();
    const t0 = Date.now();
    flushRenderer().finally(() => {
      console.log(`[main] fermeture : sauvegarde finale en ${Date.now() - t0} ms`);
      if (lastSaveText) steam.cloudWrite(lastSaveText, true);
      if (trayCtl) trayCtl.tray.destroy();
      app.quit();
    });
  });
}
