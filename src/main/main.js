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

  app.whenReady().then(() => {
    if (steam.init({ isDev: flags.isDev }) === "relaunch") { app.quit(); return; }

    const settings = new Settings();
    const store = new SaveStore(app.getPath("userData"), { backupIntervalMs: config.BACKUP_INTERVAL_MS });
    const url = serveDirectory(path.join(__dirname, "..", "renderer"));

    strip = new StripWindow({
      settings,
      preload: path.join(__dirname, "..", "preload", "preload.js"),
      url,
      devTools: flags.isDev,
      openDevTools: flags.devTools,
      ghost: flags.ghost,
    });
    trayCtl = createTray({ strip, isDev: flags.isDev, steam });

    /* ---------- IPC ---------- */
    ipcMain.handle("init:get", () => ({
      isDev: flags.isDev,
      devSpeed: flags.devSpeed,
      layout: strip.layout(),
      visible: strip.renderVisible(),
      version: app.getVersion(),
      steam: { available: steam.available, status: steam.status },
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
    ipcMain.on("hero:status", (_e, st) => trayCtl && trayCtl.setStatus(st));
    // Réglages de fenêtre depuis le panneau (mêmes actions que le menu de l'icône)
    const { loginItemOptions } = require("./tray");
    ipcMain.handle("win:get", () => ({ openAtLogin: app.getLoginItemSettings(loginItemOptions()).openAtLogin }));
    ipcMain.on("win:set", (_e, s) => {
      if (!s || typeof s !== "object") return;
      if (s.edge === "top" || s.edge === "bottom") strip.setEdge(s.edge);
      if (typeof s.opacity === "number" && s.opacity >= 0.2 && s.opacity <= 1) strip.setOpacity(s.opacity);
      if (typeof s.openAtLogin === "boolean") app.setLoginItemSettings({ openAtLogin: s.openAtLogin, ...loginItemOptions() });
      if (trayCtl) trayCtl.rebuild();
    });
    ipcMain.on("tray:icons", (_e, set) => {
      if (trayCtl) trayCtl.setIcons(set);
      // Dev : enregistre l'icône (32 px) à côté de la capture pour vérification.
      if (flags.shot && set && set.walk) try {
        fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, "-tray32.png"), Buffer.from(String(set.walk[0].x2).split(",")[1], "base64"));
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
      if (flags.selftest) require("./selftest").runSelfTest(strip);
      if (flags.demo) setTimeout(() => strip.win.webContents.executeJavaScript("window.__demo && window.__demo()"), 800);
      if (flags.perf) require("./perf").runPerf(strip, typeof flags.perf === "string" ? { phase: +flags.perf } : {});
    });

    /* ---------- Robustesse ---------- */
    strip.win.webContents.on("render-process-gone", (_e, d) => {
      console.error("[main] renderer arrêté :", d.reason);
      if (!quitting && d.reason !== "clean-exit") strip.win.reload();
    });
    // Arrêt / déconnexion de Windows : dernière sauvegarde.
    strip.win.on("query-session-end", () => { flushRenderer(); });
    powerMonitor.on("lock-screen", () => strip.setLocked(true));
    powerMonitor.on("unlock-screen", () => strip.setLocked(false));
  });

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
