// Pont sécurisé entre le renderer (sans accès Node) et le processus principal.
// Le preload est « sandboxé » : il ne peut charger que le module electron.
const { contextBridge, ipcRenderer } = require("electron");

const listen = (channel, cb) => {
  const fn = (_e, payload) => cb(payload);
  ipcRenderer.on(channel, fn);
  return () => ipcRenderer.off(channel, fn);
};

contextBridge.exposeInMainWorld("sillwalker", {
  getInit: () => ipcRenderer.invoke("init:get"),
  loadSave: () => ipcRenderer.invoke("save:load"),
  writeSave: (json) => ipcRenderer.invoke("save:write", json),
  setLang: (id) => ipcRenderer.send("lang:set", String(id)),
  setPanelOpen: (open) => ipcRenderer.invoke("panel:set", !!open),
  setHitRects: (rects) => ipcRenderer.send("mouse:rects", rects),
  unlockAchievements: (ids) => ipcRenderer.send("achievements:unlock", ids),
  ready: () => ipcRenderer.send("app:ready"),
  setMode: (mode) => ipcRenderer.send("mode:set", mode),       // "strip" | "mini" | "icon"
  quit: () => ipcRenderer.send("app:quit"),
  sendStatus: (st) => ipcRenderer.send("hero:status", st),     // pour l'icône de notification
  setTrayIcons: (set) => ipcRenderer.send("tray:icons", set),  // têtes du héros (data URL 16 et 32 px)
  getWindowSettings: () => ipcRenderer.invoke("win:get"),       // { openAtLogin }
  setWindowSettings: (s) => ipcRenderer.send("win:set", s),    // { edge?, opacity?, openAtLogin? }
  layoutApplied: () => ipcRenderer.send("layout:applied"),

  onLayout: (cb) => listen("layout", cb),
  onVisibility: (cb) => listen("visibility", cb),
  onCommand: (cb) => listen("command", cb),
  // Le processus principal demande une dernière sauvegarde avant de quitter.
  onFlushRequest: (cb) => listen("app:flush", async () => {
    try { await cb(); } finally { ipcRenderer.send("app:flush-done"); }
  }),
});
