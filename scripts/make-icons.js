// Génère les icônes à partir du pixel art du héros (aucune dépendance) :
//   build/icon.ico + build/icon.png  (exécutable / Steam)
//   assets/tray.png + assets/tray@2x.png (zone de notification)
//   npm run icons
import fs from "node:fs";
import zlib from "node:zlib";
import { HERO_ART, HERO_HEAD, OUTLINE } from "../src/renderer/render/art.js";

const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = (buf) => { let c = -1; for (const b of buf) c = CRC[(c ^ b) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(w, h, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.substr(i, 2), 16));

/** Grille de couleurs (avec contour) à partir de lignes de pixel art. */
function grid(rows, pal) {
  const w = Math.max(...rows.map((r) => r.length)) + 2, h = rows.length + 2;
  const g = Array.from({ length: h }, () => Array(w).fill(null));
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch !== ".") g[y + 1][x + 1] = pal[ch]; }));
  const out = g.map((r) => r.slice());
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (!g[y][x]) {
    if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => g[y + dy]?.[x + dx])) out[y][x] = OUTLINE;
  }
  return out;
}

function render(size, g, { bg, dx = 0, dy = 0, gray = false, overlay = [] } = {}) {
  const buf = Buffer.alloc(size * size * 4);
  const put = (x, y, c, a = 255) => {
    const i = (y * size + x) * 4; let [r, gg, b] = hex(c);
    if (gray && c !== OUTLINE) { const l = Math.round(0.3 * r + 0.59 * gg + 0.11 * b); r = gg = b = Math.round(l * 0.75); a = 170; }
    buf[i] = r; buf[i + 1] = gg; buf[i + 2] = b; buf[i + 3] = a;
  };
  if (bg) {
    const rad = Math.round(size * 0.18), m = Math.max(0, Math.round(size * 0.03));
    for (let y = m; y < size - m; y++) for (let x = m; x < size - m; x++) {
      const cx = Math.min(Math.max(x, m + rad), size - m - 1 - rad), cy = Math.min(Math.max(y, m + rad), size - m - 1 - rad);
      if ((x - cx) ** 2 + (y - cy) ** 2 <= rad * rad) put(x, y, y > size * 0.74 ? "#3f7a55" : "#2a2846");
    }
  }
  const gw = g[0].length, gh = g.length;
  const s = Math.max(1, Math.floor((size * (bg ? 0.7 : 1)) / Math.max(gw, gh)));
  const ox = Math.floor((size - gw * s) / 2) + dx * s, oy = (bg ? Math.floor(size * 0.74) - gh * s + s : Math.floor((size - gh * s) / 2)) + dy * s;
  const cell = (x, y, c) => {
    for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++) {
      const px = ox + x * s + xx, py = oy + y * s + yy;
      if (px >= 0 && py >= 0 && px < size && py < size) put(px, py, c);
    }
  };
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) if (g[y][x]) cell(x, y, g[y][x]);
  for (const [x, y, c] of overlay) cell(x, y, c);
  return png(size, size, buf);
}

function ico(images) {
  const head = Buffer.alloc(6 + images.length * 16);
  head.writeUInt16LE(1, 2); head.writeUInt16LE(images.length, 4);
  let off = head.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    head[e] = size >= 256 ? 0 : size; head[e + 1] = size >= 256 ? 0 : size;
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(data.length, e + 8); head.writeUInt32LE(off, e + 12);
    off += data.length;
  });
  return Buffer.concat([head, ...images.map((i) => i.data)]);
}

const body = grid(HERO_ART.walk1, HERO_ART.pal);
const head = grid(HERO_HEAD, HERO_ART.pal);
fs.mkdirSync("build", { recursive: true });
fs.mkdirSync("assets", { recursive: true });
const sizes = [16, 24, 32, 48, 64, 128, 256];
fs.writeFileSync("build/icon.ico", ico(sizes.map((size) => ({ size, data: render(size, size < 32 ? head : body, { bg: size >= 32 }) }))));
fs.writeFileSync("build/icon.png", render(512, body, { bg: true }));
// Icône de notification + images de l'animation du mode « icône seule ».
const SPARK = "#ffd34d", HIT = "#ff5a5a";
const TRAY = {
  "tray": {},
  "tray-walk-a": {},
  "tray-walk-b": { dy: -1 },
  "tray-fight-a": { dx: 1 },
  "tray-fight-b": { dx: -1, overlay: [[13, 2, HIT], [12, 4, HIT], [13, 6, HIT]] },
  "tray-dead": { gray: true },
  "tray-loot": { overlay: [[0, 0, SPARK], [2, 0, SPARK], [1, 1, "#ffffff"], [0, 2, SPARK], [2, 2, SPARK]] },
};
fs.mkdirSync("assets/tray", { recursive: true });
for (const [name, opts] of Object.entries(TRAY)) {
  const dir = name === "tray" ? "assets" : "assets/tray";
  fs.writeFileSync(`${dir}/${name}.png`, render(16, head, opts));
  fs.writeFileSync(`${dir}/${name}@2x.png`, render(32, head, opts));
}
console.log("Icônes générées : build/icon.ico, build/icon.png, assets/tray*.png");
