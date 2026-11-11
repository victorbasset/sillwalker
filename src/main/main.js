// Processus principal : cycle de vie, fenêtre, zone de notification,
// sauvegarde, Steam. Le jeu lui-même tourne dans le renderer.
const path = require("path");
const fs = require("fs");
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
            let w = 0; for (const li of document.querySelectorAll(".lines li")) if (li.getClientRects().length && li.scrollWidth > li.clientWidth + 1) w++; if (w) out.push(id + "-large=" + w); }
          P.showNews(); const nb = document.querySelector("#modal .panel"), no = nb ? nb.scrollHeight - nb.clientHeight : 0;
          if (no > 2) out.push("news=" + no); document.querySelector("#modal [data-action=closemodal]")?.click();
          // Héros > Sorts et attaque (sorts du héros + style de l'attaque de base)
          // (it. 553) pour les 20 héros : les cartes à deux effets passent sur deux lignes ; le pire est signalé
          { P.setTab("class"); P.tabs.class.sec = "style"; const G = window.__game, keep = G.S.cls; let worst = 0, who = "";
            for (const c of [...new Set((window.__spellsAll || []).map((x) => x.cls))].concat(keep)) { G.S.cls = c; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > worst) { worst = o; who = c; } }
            G.S.cls = keep; P.renderAll(); if (worst > 2) out.push("sorts=" + worst + "(" + who + ")"); P.tabs.class.sec = "freed"; }
          // Statistiques > Succès (la liste grandit avec chaque succès ; les noms longs du russe passent sur deux lignes)
          if (P.tabs.stats) { P.setTab("stats"); P.tabs.stats.sec = "ach"; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("succès=" + o); P.tabs.stats.sec = "numbers"; }
          P.kept.clear(); P.setTab("adventure"); P.renderAll();
          for (const k of ["hero-todo", "hero-chron", "hero-stats", "rates"]) {
            const d = document.querySelector("[data-keep=" + k + "]"); if (!d) continue; d.querySelector("summary").click();
            const m = document.getElementById("modal"), mb = m.querySelector(".panel"), mo = mb.scrollHeight - mb.clientHeight;
            if (mo > 2) out.push(k + "=" + mo); m.hidden = true; }
          return innerWidth + " " + (out.join(" ") || "aucun"); })()`).catch((e) => "erreur " + e.message);
        console.log("[overflow] " + r);
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
    strip.win.webContents.on("console-message", (e) => {
      const level = e.level ?? e.params?.level;
      if (level !== "error" && level !== 3) return;
      try {
        if (fs.existsSync(errLog) && fs.statSync(errLog).size > 200 * 1024) fs.renameSync(errLog, errLog + ".old");
        fs.appendFileSync(errLog, `${new Date().toISOString()} v${app.getVersion()} ${e.message ?? e.params?.message} (${e.sourceId ?? ""}:${e.lineNumber ?? ""})\n`);
      } catch { /* journal facultatif */ }
    });
    if (flags.isDev) strip.win.webContents.on("console-message", (e) => {
      const level = e.level ?? e.params?.level;
      if (level === "warning" || level === "error" || level === 2 || level === 3) console.log(`[renderer ${level}] ${e.message ?? e.params?.message} (${e.sourceId ?? ""}:${e.lineNumber ?? ""})`);
    });
    strip.win.webContents.on("render-process-gone", (_e, d) => {
      console.error("[main] renderer arrêté :", d.reason);
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
    const fsWatch = watchFullscreen({ onChange: (on) => strip.setFullscreenApp(on), enabled: () => strip.settings.get("hideOnFullscreen") !== false });
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
