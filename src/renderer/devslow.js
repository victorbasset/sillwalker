// (it. 767) Lenteurs sous Windows signalées par Victor (images de 200 à 1000 ms au lancement). Sous le protocole app://
// du jeu, Chromium n'attribue aucun script aux images longues (« long-animation-frame » : liste de scripts vide) :
// on chronomètre donc nous-mêmes les rappels (minuteries, images, temps libre, événements). Seulement en dev
// (window.__devSlow, posé par app.js pour npm start) : « [lent] … » dans le terminal au-delà de 100 ms.
// Hors dev, les enveloppes ne coûtent que deux lectures d'horloge par rappel.
const LIMIT = 100;
// (it. 769) temps passé à convertir des canevas en images, compté pendant chaque rappel lent
const conv = { ms: 0, n: 0 };
const toURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function (...a) {
  if (!window.__devSlow) return toURL.apply(this, a);
  const t = performance.now();
  try { return toURL.apply(this, a); } finally { conv.ms += performance.now() - t; conv.n++; }
};
const label = (fn) => fn.name || String(fn).replace(/\s+/g, " ").slice(0, 80);
const timed = (kind, fn) => function (...args) {
  if (!window.__devSlow) return fn.apply(this, args);
  const t = performance.now(), c0 = conv.ms, n0 = conv.n;
  try { return fn.apply(this, args); }
  finally {
    const ms = performance.now() - t;
    if (ms > LIMIT) console.warn(`[lent] ${kind} « ${label(fn).slice(0, 50)} » : ${Math.round(ms)} ms (à ${(t / 1000).toFixed(1)} s), dont images de canevas ${Math.round(conv.ms - c0)} ms (${conv.n - n0})`);
  }
};

const wrapTimer = (name) => {
  const orig = window[name];
  window[name] = function (fn, ...rest) { return orig.call(window, typeof fn === "function" ? timed(name, fn) : fn, ...rest); };
};
for (const n of ["setTimeout", "setInterval", "requestAnimationFrame", "requestIdleCallback"]) if (window[n]) wrapTimer(n);

// Écouteurs d'événements : même rappel enveloppé une seule fois, pour que removeEventListener le retrouve.
const wrapped = new WeakMap();
const add = EventTarget.prototype.addEventListener, remove = EventTarget.prototype.removeEventListener;
EventTarget.prototype.addEventListener = function (type, fn, opts) {
  if (typeof fn !== "function") return add.call(this, type, fn, opts);
  let w = wrapped.get(fn);
  if (!w) { w = timed("événement " + type, fn); wrapped.set(fn, w); }
  return add.call(this, type, w, opts);
};
EventTarget.prototype.removeEventListener = function (type, fn, opts) {
  return remove.call(this, type, (typeof fn === "function" && wrapped.get(fn)) || fn, opts);
};
