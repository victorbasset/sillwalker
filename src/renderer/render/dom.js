// Briques de rendu partagées (bande et mode mini).
// Principe de performance : chaque image composée coûte cher à Chromium,
// quelle que soit sa taille. On ne touche donc au DOM que si un pixel change,
// et on aligne les mouvements sur la grille de pixel art (P = 3 px).
import { OUTLINE, PIXEL as P } from "./art.js";
import { ZONES } from "../game/data.js";

export const q = (v) => Math.round(v / P) * P;
export const FONT = "400 13px 'Geist Pixel', 'Pixelify Sans', 'DotGothic16', 'Microsoft YaHei', 'Malgun Gothic', sans-serif";

/** Compteur de modifications visibles (instrumentation du banc de mesure). */
export const changes = { n: 0, why: {} };
export const mark = (k) => { changes.n++; changes.why[k] = (changes.why[k] || 0) + 1; };

export function el(tag, cls, parent) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (parent) parent.appendChild(e);
  return e;
}

export function makeCanvas(parent, cls, alpha = true) {
  const c = el("canvas", cls, parent);
  return { c, ctx: c.getContext("2d", { alpha }) };
}

/** Dimensionne une toile en tenant compte de l'échelle d'affichage. */
export function sizeCanvas({ c, ctx }, w, h, dpr) {
  c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
  c.style.width = w + "px"; c.style.height = h + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
}

export function mix(a, b, t) {
  const p = (x) => [1, 3, 5].map((i) => parseInt(x.substr(i, 2), 16));
  const A = p(a), B = p(b);
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",") + ")";
}

export function drawText(ctx, t, x, y, col, align, font = FONT) {
  ctx.font = font;
  ctx.textAlign = align || "left";
  ctx.lineWidth = 2; ctx.strokeStyle = OUTLINE; ctx.strokeText(t, x, y);
  ctx.fillStyle = col; ctx.fillText(t, x, y);
}

/** Fond sombre arrondi derrière l'ATH : lisible sur tous les décors (neige, désert…). */
export function drawPill(ctx, x0, x1, h) {
  ctx.fillStyle = "rgba(20, 18, 31, 0.72)";
  const r = 4, y0 = 1, y1 = h - 1;
  ctx.beginPath();
  ctx.moveTo(x0 + r, y0); ctx.lineTo(x1 - r, y0); ctx.quadraticCurveTo(x1, y0, x1, y0 + r);
  ctx.lineTo(x1, y1 - r); ctx.quadraticCurveTo(x1, y1, x1 - r, y1); ctx.lineTo(x0 + r, y1);
  ctx.quadraticCurveTo(x0, y1, x0, y1 - r); ctx.lineTo(x0, y0 + r); ctx.quadraticCurveTo(x0, y0, x0 + r, y0);
  ctx.fill();
}

/** Pièce d'or en pixel art. */
export function drawCoin(ctx, x, y) {
  ctx.fillStyle = OUTLINE; ctx.fillRect(x, y, 11, 11);
  ctx.fillStyle = "#ffd34d"; ctx.fillRect(x + 1, y + 1, 9, 9);
  ctx.fillStyle = "#c99a1a"; ctx.fillRect(x + 4, y + 3, 3, 5);
}

const hash = (n) => ((n * 2654435761) >>> 0) % 1000;

/** Décor fixe d'une zone : ciel, collines, éléments de décor, sol. */
export function drawBackdrop(ctx, W, H, ground, Z, seed = 0) {
  const band = ground / 4;
  for (let i = 0; i < 4; i++) { ctx.fillStyle = mix(Z.sky[0], Z.sky[1], i / 3); ctx.fillRect(0, Math.floor(i * band), W, Math.ceil(band) + 1); }
  // Boucles suivantes (« l'Éveillé », « l'Ancestral ») : ciel teinté de pourpre, de plus en plus.
  const loop = seed > 0 ? Math.floor((seed - 1) / ZONES.length) : 0;
  if (loop > 0) { ctx.fillStyle = `rgba(160, 20, 70, ${Math.min(0.4, 0.22 * loop)})`; ctx.fillRect(0, 0, W, ground); }
  ctx.fillStyle = Z.far;
  for (let x = 0; x < W; x += P) {
    const wx = x + seed * 37;
    const h = q(24 + 10 * Math.sin(wx / 47) + 6 * Math.sin(wx / 19)) * ground / 96;
    ctx.fillRect(x, ground - h, P, h);
  }
  const gap = 120;
  for (let i = 0; i < W / gap + 1; i++) {
    const hv = hash(i + 7 + seed * 13);
    if (hv % 3 === 0) continue;
    drawProp(ctx, q(i * gap + (hv % 40)), ground, Z.prop, Math.max(2, Math.round((3 + hv % 3) * ground / 96)), Z.near);
  }
  ctx.fillStyle = Z.g2; ctx.fillRect(0, ground, W, H - ground);
  ctx.fillStyle = Z.g1; ctx.fillRect(0, ground, W, P * 2);
  ctx.fillStyle = Z.g3;
  for (let k = 0; k < W / 24 + 1; k++) {
    const xx = q(k * 24), hv = hash(k + seed);
    if (ground + 15 >= H) continue;
    if (hv % 2) ctx.fillRect(xx, ground + 9, P * 2, P); else ctx.fillRect(xx + 9, ground + 15, P, P);
  }
}

function drawProp(ctx, x, ground, kind, size, col) {
  ctx.fillStyle = col;
  if (kind === "tree") {
    ctx.fillRect(x + P * 2, ground - P * 3, P * 2, P * 3);
    for (let k = 0; k < size; k++) { const wb = 2 + k * 2; ctx.fillRect(x + P * 3 - wb * P / 2, ground - P * 3 - (size - k) * P * 2, wb * P, P * 2); }
  } else if (kind === "cactus") {
    const h = (size + 2) * P * 2;
    ctx.fillRect(x + P * 2, ground - h, P * 2, h);
    ctx.fillRect(x, ground - h + P * 4, P, P * 4); ctx.fillRect(x, ground - h + P * 7, P * 2, P);
    ctx.fillRect(x + P * 5, ground - h + P * 2, P, P * 4); ctx.fillRect(x + P * 4, ground - h + P * 5, P * 2, P);
  } else if (kind === "crystal") {
    for (let k = 0; k < size + 1; k++) { const wb = k < 2 ? 1 + k * 2 : 5; ctx.fillRect(x + P * 3 - wb * P / 2 + P / 2, ground - (size + 1 - k) * P * 2, wb * P, P * 2); }
    ctx.fillStyle = "rgba(255,255,255,.35)";
    ctx.fillRect(x + P * 3, ground - (size + 1) * P * 2 + P * 2, P, P * 4);
  } else if (kind === "pillar") {
    const h = (size + 3) * P * 2;
    ctx.fillRect(x + P, ground - h, P * 4, h);
    ctx.fillRect(x, ground - h - P, P * 6, P); ctx.fillRect(x, ground - P, P * 6, P);
    ctx.fillStyle = "rgba(0,0,0,.2)";
    ctx.fillRect(x + P * 3, ground - h, P, h);
  } else if (kind === "shroom") {
    // Champignon géant : pied clair, chapeau large
    const h = (size + 2) * P * 2;
    ctx.fillRect(x + P * 2, ground - h + P * 3, P * 2, h - P * 3);
    ctx.fillRect(x - P, ground - h + P, P * 8, P * 2); ctx.fillRect(x, ground - h, P * 6, P);
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.fillRect(x + P, ground - h + P, P, P); ctx.fillRect(x + P * 4, ground - h + P * 2, P, P);
  } else if (kind === "bones") {
    // Côtes d'un squelette géant à moitié enterré
    const h = (size + 1) * P * 2;
    for (let k = 0; k < 3; k++) { const xx = x + k * P * 3; ctx.fillRect(xx, ground - h + k * P, P, h - k * P); ctx.fillRect(xx, ground - h + k * P, P * 2, P); }
    ctx.fillRect(x - P, ground - P * 2, P * 10, P);
  } else if (kind === "lantern") {
    // Poteau de mine avec lanterne
    const h = (size + 3) * P * 2;
    ctx.fillRect(x + P * 2, ground - h, P, h); ctx.fillRect(x + P * 2, ground - h, P * 3, P);
    ctx.fillStyle = "#ffd34d"; ctx.fillRect(x + P * 4, ground - h + P, P * 2, P * 2);
  } else if (kind === "blossom") {
    // Arbre en fleurs
    ctx.fillRect(x + P * 2, ground - P * 4, P * 2, P * 4);
    ctx.fillStyle = "#f8c8d8";
    for (let k = 0; k < size; k++) { const wb = 3 + k * 2; ctx.fillRect(x + P * 3 - wb * P / 2, ground - P * 4 - (size - k) * P * 2, wb * P, P * 2); }
  } else if (kind === "coral") {
    // Corail branchu
    const h = (size + 1) * P * 2;
    ctx.fillRect(x + P * 2, ground - h, P, h); ctx.fillRect(x, ground - h + P * 3, P, P * 3); ctx.fillRect(x, ground - h + P * 5, P * 2, P);
    ctx.fillRect(x + P * 4, ground - h + P * 2, P, P * 4); ctx.fillRect(x + P * 3, ground - h + P * 5, P * 2, P);
  } else if (kind === "rock") {
    for (let k = 0; k < size; k++) { const wb = 1 + k * 2; ctx.fillRect(x + P * 3 - wb * P / 2 + P / 2, ground - (size - k) * P * 2, wb * P, P * 2); }
  } else {
    const h = size * P * 2;
    ctx.fillRect(x, ground - h, P * 6, h); ctx.fillRect(x + P, ground - h - P, P * 4, P);
    ctx.fillStyle = "rgba(0,0,0,.25)";
    ctx.fillRect(x + P * 2, ground - h + P * 2, P * 2, P * 4); ctx.fillRect(x + P, ground - h + P * 3, P * 4, P);
  }
}

/** Image <img> d'un sprite (data URL mémorisée par toile). */
const urlCache = new WeakMap();
function spriteImg(sprite, parent) {
  let url = urlCache.get(sprite);
  if (!url) { url = sprite.toDataURL(); urlCache.set(sprite, url); }
  const img = el("img", "frame", parent);
  img.src = url; img.width = sprite.cw; img.height = sprite.ch; img.alt = "";
  return img;
}

/** Personnage : plusieurs images superposées, une seule visible. */
export class Actor {
  constructor(parent, frames, cls = "") {
    this.el = el("div", "actor " + cls, parent);
    this.frames = frames; this.base = frames;
    this.imgs = frames.map((f) => spriteImg(f, this.el));
    this.w = frames[0].cw; this.h = frames[0].ch;
    this.cur = -1; this.tx = null; this.alphaV = null; this.shown = true;
  }
  show(i) {
    if (i === this.cur) return;
    if (this.cur >= 0) this.imgs[this.cur].classList.remove("on");
    this.imgs[i].classList.add("on");
    this.cur = i; mark("frame");
  }
  move(x, y) {
    x = q(x); y = q(y);
    const t = x + "," + y;
    if (t !== this.tx) { this.tx = t; this.x = x; this.el.style.transform = `translate3d(${x}px,${y}px,0)`; mark("move"); }
  }
  alpha(a) {
    a = Math.round(a * 8) / 8;
    if (a !== this.alphaV) { this.alphaV = a; this.el.style.opacity = a; mark("alpha"); }
  }
  visible(v) {
    if (v !== this.shown) { this.shown = v; this.el.hidden = !v; mark("vis"); }
  }
  /**
   * Autres images de mêmes poses (contour dessiné : sprites.js outlinedFrames, it. 596) ; plus grandes que les images
   * de base (contour à gauche, à droite et en haut) : décalées pour que le personnage ne bouge pas. Sans argent : la base.
   */
  reframe(frames) {
    frames = frames || this.base;
    if (frames === this.frames) return;
    this.frames = frames;
    frames.forEach((f, i) => {
      const img = this.imgs[i], b = this.base[i];
      let url = urlCache.get(f);
      if (!url) { url = f.toDataURL(); urlCache.set(f, url); }
      img.src = url; img.width = f.cw; img.height = f.ch;
      img.style.left = -(f.cw - b.cw) / 2 + "px"; img.style.top = -(f.ch - b.ch) + "px";
    });
    mark("frame");
  }
  addCrown() {
    const crown = el("div", "crown", this.el);
    crown.style.left = Math.round(this.w / 2 - P * 3) + "px";
  }
  remove() { this.el.remove(); }
}

/** Barre de vie : seule la transformation du remplissage change. */
export class Bar {
  constructor(parent, color, cls = "") {
    this.el = el("div", "hpbar " + cls, parent);
    this.fill = el("i", "", this.el);
    this.fill.style.background = color;
    this.v = null; this.shown = true;
  }
  set(f) {
    f = Math.round(Math.max(0, Math.min(1, f)) * 36) / 36;
    if (f !== this.v) { this.v = f; this.fill.style.transform = `scaleX(${f})`; mark("bar"); }
  }
  visible(v) {
    if (v !== this.shown) { this.shown = v; this.el.hidden = !v; mark("vis"); }
  }
  /** Bouclier (demande de Victor : le voir sur la barre) : segment bleu-blanc après les PV ; s'il dépasse le maximum,
   *  il se cale au bout et recouvre les PV. s = bouclier / PV max. */
  setShield(s) {
    const w = Math.round(Math.max(0, Math.min(1, s)) * 36);
    if (w === this.shw && this.v === this.shv) return;
    this.shw = w; this.shv = this.v;
    if (!this.sh) { this.sh = el("b", "sh", this.el); }
    const left = Math.min(Math.round((this.v || 0) * 36), 36 - w);
    this.sh.style.width = w + "px"; this.sh.style.left = left + "px"; this.sh.hidden = !w; mark("bar");
  }
}

/** Agrandissement uniforme du panneau (accessibilité). */
/** Thème du panneau : null = celui de Windows, "light" ou "dark" (styles.css : :root[data-theme]). */
/** Thème du panneau : "auto" = celui de Windows, "light", sinon sombre (par défaut, demande de Victor). */
export const themeOf = (t) => (t === "light" || t === "auto" ? t : "dark");
export function applyTheme(t) {
  const r = document.documentElement, v = themeOf(t);
  if (v === "auto") delete r.dataset.theme; else r.dataset.theme = v;
}
let uiScaleWanted = 1, uiScaleHooked = false, uiScaleWinReady = false;
/** (it. 949) À appeler une fois l'écoute de la mise en page en place (app.js) : avant, la réponse de la fenêtre agrandie
 *  se perdait au lancement (panneau de 500 px dans une fenêtre de 650 px, bande blanche en haut). */
export function uiScaleWindowReady() { uiScaleWinReady = true; applyUiScaleNow(); }
/** Zoom réellement appliqué : le choix du joueur, borné pour que le panneau garde au moins 1280 px CSS de large
 *  (la plus petite largeur prévue) : à 130 % sur un écran de 1366 px, colonnes trop étroites et valeurs coupées (it. 949). */
export const effectiveUiScale = (z, width = window.innerWidth) => Math.max(1, Math.min(+z || 1, (width || 1280) / 1280));
export function applyUiScale(z) {
  uiScaleWanted = +z || 1;
  if (!uiScaleHooked) { uiScaleHooked = true; window.addEventListener("resize", () => applyUiScaleNow()); }
  applyUiScaleNow();
}
function applyUiScaleNow() {
  const z = effectiveUiScale(uiScaleWanted);
  const p = document.getElementById("panel"); if (p) p.style.zoom = z !== 1 ? String(z) : "";
  // (it. 949) les onglets dessinés à la hauteur du panneau (Carte, Compétences) la divisent par le zoom
  document.documentElement.style.setProperty("--ui-zoom", String(z));
  // (it. 948) la fenêtre agrandit le panneau d'autant (processus principal : strip-window.js > panelHeight)
  if (uiScaleWinReady) try { window.sillwalker?.setWindowSettings?.({ panelZoom: Math.min(1.5, z) }); } catch { /* hors Electron */ }
}
