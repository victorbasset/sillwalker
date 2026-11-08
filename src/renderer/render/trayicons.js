// Icônes de la zone de notification : la tête du héros (classe + casque),
// cadrée au plus serré pour remplir les 16 px (32 px en haute densité)
// imposés par Windows. Une image par état : marche (2), combat (2), K.O., butin.
import { OUTLINE } from "./art.js";
import { CLASS_HEADS } from "./heroart.js";
import { dressPalette } from "./equipvis.js";

function grid(cls, visual) {
  const head = CLASS_HEADS[cls] || CLASS_HEADS.warrior, pal = dressPalette(head.pal, visual);
  const rows = head.rows;
  let x0 = 99, x1 = 0;
  for (const r of rows) for (let i = 0; i < r.length; i++) if (r[i] !== ".") { x0 = Math.min(x0, i); x1 = Math.max(x1, i); }
  return rows.map((r) => Array.from({ length: x1 - x0 + 1 }, (_, i) => (r[x0 + i] && r[x0 + i] !== "." ? pal[r[x0 + i]] : null)));
}

function gray(c) {
  const v = [1, 3, 5].map((i) => parseInt(c.substr(i, 2), 16));
  const l = Math.round((0.3 * v[0] + 0.59 * v[1] + 0.11 * v[2]) * 0.7);
  return `rgb(${l},${l},${l})`;
}

function draw(g, size, { dx = 0, dy = 0, dead = false, overlay = [] } = {}) {
  const h = g.length + 2, w = g[0].length + 2, s = Math.max(1, Math.floor(size / Math.max(w, h)));
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const ox = Math.floor((size - w * s) / 2) + dx * s, oy = Math.floor((size - h * s) / 2) + dy * s;
  const cell = (x, y, col) => { ctx.fillStyle = col; ctx.fillRect(ox + x * s, oy + y * s, s, s); };
  g.forEach((row, y) => row.forEach((col, x) => {
    if (col) for (const [ax, ay] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!(g[y + ay] && g[y + ay][x + ax])) cell(x + 1 + ax, y + 1 + ay, OUTLINE);
  }));
  g.forEach((row, y) => row.forEach((col, x) => { if (col) cell(x + 1, y + 1, dead ? gray(col) : col); }));
  if (dead) ctx.globalAlpha = 1;
  for (const [x, y, col] of overlay) { ctx.fillStyle = col; ctx.fillRect(x * size / 16, y * size / 16, size / 16, size / 16); }
  return c.toDataURL();
}

/** { walk: [{x1, x2}, {x1, x2}], fight: [...], dead: [...], loot: [...] } */
export function makeTrayIcons(cls, visual) {
  const g = grid(cls, visual);
  const both = (opts) => ({ x1: draw(g, 16, opts), x2: draw(g, 32, opts) });
  const HIT = "#ff4a4a", SPARK = "#ffd34d";
  return {
    walk: [both({}), both({ dy: -1 })],
    fight: [both({ dx: 1 }), both({ dx: -1, overlay: [[15, 3, HIT], [14, 6, HIT], [15, 9, HIT]] })],
    dead: [both({ dead: true }), both({ dead: true, dy: 1 })],
    loot: [both({ overlay: [[0, 0, SPARK], [2, 0, SPARK], [1, 1, "#ffffff"], [0, 2, SPARK], [2, 2, SPARK]] }), both({})],
  };
}
