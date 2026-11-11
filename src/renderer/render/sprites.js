// Transforme le pixel art en canvas prêts à dessiner (mis en cache).
import { STARBREAKER_ART } from "./art-monsters2.js";
import { OUTLINE, PIXEL, CLASS_ART, MONSTER_ART, ICON_ART, PET_ART, SLOT_ICON } from "./art.js";
import { RARITIES, MONSTERS } from "../game/data.js";
import { dressPalette, visualKey, gearRows } from "./equipvis.js";
// (it. 769) Canevas des images (icônes, portraits, monstres) : jamais affichés, seulement convertis en image (toDataURL).
// Dessinés par le processeur : sous Windows avec la carte graphique, chaque conversion d'un canevas accéléré relisait
// l'image depuis la carte, de façon bloquante (premières ouvertures du panneau et des onglets lentes chez Victor).
export const SOFT = { willReadFrequently: true };

export function buildSprite(rows, pal, scale, flip, dpr = 1) {
  const h = rows.length, w = Math.max(...rows.map((r) => r.length)), g = [];
  for (let y = 0; y < h; y++) {
    g[y] = [];
    for (let x = 0; x < w; x++) {
      const ch = rows[y][x] || ".";
      g[y][flip ? w - 1 - x : x] = ch === "." ? null : pal[ch];
    }
  }
  const s = scale * dpr, c = document.createElement("canvas");
  c.width = (w + 2) * s; c.height = (h + 2) * s;
  const ctx = c.getContext("2d", SOFT);
  ctx.fillStyle = OUTLINE;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (g[y][x])
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) ctx.fillRect((x + 1 + dx) * s, (y + 1 + dy) * s, s, s);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (g[y][x]) {
    ctx.fillStyle = g[y][x];
    ctx.fillRect((x + 1) * s, (y + 1) * s, s, s);
  }
  c.cw = c.width / dpr; c.ch = c.height / dpr; // taille logique (px CSS)
  return c;
}

/**
 * Contour coloré dessiné une fois dans l'image (élites, champions : it. 595). Avant, un filtre CSS de 4 ombres, recalculé
 * à chaque image : ≈ +0,5 point d'un cœur par monstre contouré (5,6 points sur une file entière). Côtés gauche, droit et
 * haut, comme l'ancien filtre (pas sous les pieds) ; l'image grandit d'un pixel CSS à gauche, à droite et en haut.
 */
const outlineCache = new WeakMap();
export function outlinedFrames(frames, color, dpr = 1) {
  return frames.map((f) => {
    let m = outlineCache.get(f);
    if (!m) outlineCache.set(f, (m = new Map()));
    if (!m.has(color)) {
      const p = Math.max(1, Math.round(dpr)), c = document.createElement("canvas");
      c.width = f.width + 2 * p; c.height = f.height + p;
      const ctx = c.getContext("2d", SOFT);
      for (const [x, y] of [[0, p], [2 * p, p], [p, 0]]) ctx.drawImage(f, x, y);
      ctx.globalCompositeOperation = "source-in"; ctx.fillStyle = color; ctx.fillRect(0, 0, c.width, c.height);
      ctx.globalCompositeOperation = "source-over"; ctx.drawImage(f, p, p);
      c.cw = c.width / dpr; c.ch = c.height / dpr;
      m.set(color, c);
    }
    return m.get(color);
  });
}

/**
 * Halo des objets légendaires dessiné dans l'image (it. 597 ; avant : filtre CSS drop-shadow recalculé à chaque image,
 * ≈ 0,4-0,9 point d'un cœur en permanence en fin de partie). Halo de 2 pixels, à gauche, à droite et en haut (comme
 * outlinedFrames : Actor.reframe garde le personnage en place), plus pâle au bord.
 */
const glowCache = new WeakMap();
export function glowFrames(frames, color, dpr = 1) {
  return frames.map((f) => {
    let m = glowCache.get(f);
    if (!m) glowCache.set(f, (m = new Map()));
    if (!m.has(color)) {
      const p = Math.max(1, Math.round(dpr)), c = document.createElement("canvas");
      c.width = f.width + 4 * p; c.height = f.height + 2 * p;
      const ctx = c.getContext("2d", SOFT), layer = (offs, alpha) => {
        const t = document.createElement("canvas"); t.width = c.width; t.height = c.height;
        const tc = t.getContext("2d", SOFT);
        for (const [x, y] of offs) tc.drawImage(f, 2 * p + x * p, 2 * p + y * p);
        tc.globalCompositeOperation = "source-in"; tc.fillStyle = color; tc.fillRect(0, 0, t.width, t.height);
        ctx.globalAlpha = alpha; ctx.drawImage(t, 0, 0); ctx.globalAlpha = 1;
      };
      layer([[-2, 0], [2, 0], [0, -2], [-1, -1], [1, -1]], 0.35);
      layer([[-1, 0], [1, 0], [0, -1]], 0.75);
      ctx.drawImage(f, 2 * p, 2 * p);
      c.cw = c.width / dpr; c.ch = c.height / dpr;
      m.set(color, c);
    }
    return m.get(color);
  });
}

const spriteSets = new Map();
/** Jeu de sprites pour une échelle d'affichage (partagé par la bande et l'encart mini). */
export function buildSpriteSet(dpr) {
  if (!spriteSets.has(dpr)) spriteSets.set(dpr, makeSpriteSet(dpr));
  return spriteSets.get(dpr);
}

function makeSpriteSet(dpr) {
  // Un jeu de sprites par classe : heroes.warrior, heroes.ranger, heroes.mage.
  const heroes = {};
  for (const cls in CLASS_ART) {
    const art = CLASS_ART[cls];
    heroes[cls] = {
      walk1: buildSprite(art.walk1, art.pal, PIXEL, false, dpr),
      walk2: buildSprite(art.walk2, art.pal, PIXEL, false, dpr),
      attack: buildSprite(art.attack, art.pal, PIXEL, false, dpr),
    };
  }
  // Un jeu par monstre de MONSTERS : dessin de base (art) + couleurs propres (recolor).
  // Construits à la demande : seuls les monstres réellement croisés coûtent de la mémoire.
  const monsters = {};
  for (const k in MONSTERS) {
    let cache = null;
    Object.defineProperty(monsters, k, {
      enumerable: true,
      get() {
        if (!cache) {
          const a = MONSTER_ART[MONSTERS[k].art || k], pal = { ...a.pal, ...(MONSTERS[k].recolor || {}) };
          cache = {
            fly: !!a.fly,
            normal: a.frames.map((r) => buildSprite(r, pal, PIXEL, true, dpr)),
            get boss() { return (this._boss ||= a.frames.map((r) => buildSprite(r, pal, PIXEL * 2, true, dpr))); },
          };
        }
        return cache;
      },
    });
  }
  // Familiers : plus petits que le héros, tournés vers la droite.
  const pets = {};
  for (const k in PET_ART) {
    const a = PET_ART[k];
    pets[k] = { fly: !!a.fly, frames: a.frames.map((r) => buildSprite(r, a.pal, PIXEL - 1, false, dpr)) };
  }
  // Serviteurs (nécromancien : squelette, druide : loup) : alliés, tournés vers la droite.
  const minions = {};
  for (const k of ["skel", "wolf"]) {
    const a = MONSTER_ART[k];
    minions[k] = a.frames.map((r) => buildSprite(r, a.pal, PIXEL - 1, false, dpr));
  }
  // Le Briseur d'Étoiles : un seul jeu, en taille de boss, construit à la demande (zone 200 seulement).
  let sb = null;
  const starbreaker = () => (sb ||= { fly: false, normal: STARBREAKER_ART.frames.map((r) => buildSprite(r, STARBREAKER_ART.pal, PIXEL, true, dpr)),
    get boss() { return (this._boss ||= STARBREAKER_ART.frames.map((r) => buildSprite(r, STARBREAKER_ART.pal, PIXEL * 2, true, dpr))); } });
  return { heroes, monsters, pets, minions, get starbreaker() { return starbreaker(); } };
}

const dressedCache = new Map();
/** Sprites du héros d'une classe, habillé selon son équipement (voir equipvis.js). */
export function buildHeroSprites(cls, visual, dpr, scale = PIXEL) {
  const key = cls + "|" + visualKey(visual) + "|" + dpr + "|" + scale;
  let set = dressedCache.get(key);
  if (!set) {
    const art = CLASS_ART[cls] || CLASS_ART.warrior, pal = dressPalette(art.pal, visual);
    set = {
      walk1: buildSprite(gearRows(art.walk1, visual), pal, scale, false, dpr),
      walk2: buildSprite(gearRows(art.walk2, visual), pal, scale, false, dpr),
      attack: buildSprite(gearRows(art.attack, visual), pal, scale, false, dpr),
    };
    if (dressedCache.size > 40) dressedCache.clear();
    dressedCache.set(key, set);
  }
  return set;
}

const iconCache = {};
/** Icône d'un objet (data URL) : forme selon son type, couleurs selon sa matière et sa rareté. */
export function itemIconURL(it) {
  const icon = it.icon && ICON_ART[it.icon] ? it.icon : SLOT_ICON[it.slot] || "sword";
  const color = it.color || RARITIES[it.r].color;
  const k = icon + color + it.r;
  if (!iconCache[k]) {
    const pal = { X: "#2a2638", M: color, R: RARITIES[it.r].color, K: "#8a5a2b", W: "#ffffff" };
    iconCache[k] = buildSprite(ICON_ART[icon], pal, 4, false, 1).toDataURL();
  }
  return iconCache[k];
}

const dressedPortraitCache = new Map();
/** Portrait du héros habillé de son équipement (data URL), pour le panneau. */
export function dressedPortraitURL(cls, visual) {
  const key = cls + "|" + visualKey(visual);
  if (!dressedPortraitCache.has(key)) {
    const art = CLASS_ART[cls] || CLASS_ART.warrior;
    if (dressedPortraitCache.size > 20) dressedPortraitCache.clear();
    dressedPortraitCache.set(key, buildSprite(art.walk1, dressPalette(art.pal, visual), 4, false, 1).toDataURL());
  }
  return dressedPortraitCache.get(key);
}

const portraitCache = {};
/** Portrait d'une classe (data URL) pour l'interface. */
/** Le Briseur d'Étoiles en petite image (carte du Rebord). */
let sbURL = null;
export function starbreakerURL() { return (sbURL ||= buildSprite(STARBREAKER_ART.frames[0], STARBREAKER_ART.pal, 3, true, 1).toDataURL()); }

export function classPortraitURL(cls) {
  if (!portraitCache[cls]) {
    const art = CLASS_ART[cls];
    portraitCache[cls] = squareURL(buildSprite(art.walk1, art.pal, 4, false, 1), 4);
  }
  return portraitCache[cls];
}

/**
 * Portrait carré (data URL) : le sprite, étroit et haut (héros) ou large et bas (familiers), centré sur une toile
 * carrée, décalé d'un nombre entier de pixels d'art. Les cadres de l'interface sont carrés : sans cela, le sprite
 * était étiré (« écrasé ») pour les remplir.
 */
function squareURL(c, scale) {
  const side = Math.max(c.width, c.height), q = document.createElement("canvas");
  q.width = q.height = side;
  const snap = (v) => Math.floor(v / scale) * scale;
  const cx = q.getContext("2d", SOFT);
  cx.imageSmoothingEnabled = false;
  cx.drawImage(c, snap((side - c.width) / 2), snap((side - c.height) / 2));
  return q.toDataURL();
}

const artCache = {};
/** Portrait d'un familier (data URL). */
export function petURL(id) {
  const k = "pet:" + id;
  if (!artCache[k]) { const a = PET_ART[id]; artCache[k] = squareURL(buildSprite(a.frames[0], a.pal, 4, false, 1), 4); }
  return artCache[k];
}
/** Portrait d'un monstre (data URL), éventuellement en silhouette. */
export function monsterURL(type, silhouette = false) {
  const k = "mon:" + type + silhouette;
  if (!artCache[k]) {
    const a = MONSTER_ART[MONSTERS[type].art || type], full = { ...a.pal, ...(MONSTERS[type].recolor || {}) };
    const pal = silhouette ? Object.fromEntries(Object.keys(full).map((c) => [c, "#3a3760"])) : full;
    artCache[k] = buildSprite(a.frames[0], pal, 3, true, 1).toDataURL();
  }
  return artCache[k];
}
