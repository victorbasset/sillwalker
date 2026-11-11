// Essai Tauri : remplace le pont d'Electron (src/preload/preload.js) par des commandes Tauri.
// Les commandes sans équivalent dans l'essai (Steam, icône de notification, mode mini…) ne font rien.
(() => {
  const T = window.__TAURI__;
  const inv = (cmd, args) => T.core.invoke(cmd, args);
  const listen = (ch, cb) => { let off = null; T.event.listen(ch, (e) => cb(e.payload)).then((f) => { off = f; }); return () => off && off(); };
  let flush = null;
  window.sillwalker = {
    getInit: () => inv("init_get"),
    loadSave: () => inv("save_load"),
    writeSave: (json) => inv("save_write", { json: String(json) }),
    setLang: () => {},
    setPanelOpen: (open) => inv("set_panel_open", { open: !!open }),
    setHitRects: (rects) => { inv("set_hit_rects", { rects }); },
    unlockAchievements: () => {},
    ready: () => { inv("ready"); },
    setMode: () => {},
    quit: async () => { try { if (flush) await flush(); } finally { inv("app_exit"); } },
    sendStatus: () => {},
    setTrayIcons: () => {},
    getWindowSettings: async () => ({ openAtLogin: false }),
    setWindowSettings: () => {},
    layoutApplied: () => {},
    onLayout: (cb) => listen("layout", cb),
    onVisibility: (cb) => listen("visibility", cb),
    onPower: (cb) => listen("power", cb),
    onCommand: (cb) => listen("command", cb),
    onFlushRequest: (cb) => { flush = cb; return () => { flush = null; }; },
  };
})();
