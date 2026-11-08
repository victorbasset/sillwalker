// Transforme le pixel art en canvas prêts à dessiner (mis en cache).
import { OUTLINE, PIXEL, CLASS_ART, MONSTER_ART, ICON_ART, PET_ART, SLOT_ICON } from "./art.js";
import { RARITIES, MONSTERS } from "../game/data.js";
import { dressPalette, visualKey } from "./equipvis.js";

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
  const ctx = c.getContext("2d");
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

export function buildSpriteSet(dpr) {
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
  const monsters = {};
  for (const k in MONSTERS) {
    const a = MONSTER_ART[MONSTERS[k].art || k], pal = { ...a.pal, ...(MONSTERS[k].recolor || {}) };
    monsters[k] = {
      fly: !!a.fly,
      normal: a.frames.map((r) => buildSprite(r, pal, PIXEL, true, dpr)),
      boss: a.frames.map((r) => buildSprite(r, pal, PIXEL * 2, true, dpr)),
    };
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
  return { heroes, monsters, pets, minions };
}

const dressedCache = new Map();
/** Sprites du héros d'une classe, habillé selon son équipement (voir equipvis.js). */
export function buildHeroSprites(cls, visual, dpr, scale = PIXEL) {
  const key = cls + "|" + visualKey(visual) + "|" + dpr + "|" + scale;
  let set = dressedCache.get(key);
  if (!set) {
    const art = CLASS_ART[cls] || CLASS_ART.warrior, pal = dressPalette(art.pal, visual);
    set = {
      walk1: buildSprite(art.walk1, pal, scale, false, dpr),
      walk2: buildSprite(art.walk2, pal, scale, false, dpr),
      attack: buildSprite(art.attack, pal, scale, false, dpr),
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

const portraitCache = {};
/** Portrait d'une classe (data URL) pour l'interface. */
export function classPortraitURL(cls) {
  if (!portraitCache[cls]) {
    const art = CLASS_ART[cls];
    portraitCache[cls] = buildSprite(art.walk1, art.pal, 4, false, 1).toDataURL();
  }
  return portraitCache[cls];
}

const artCache = {};
/** Portrait d'un familier (data URL). */
export function petURL(id) {
  const k = "pet:" + id;
  if (!artCache[k]) { const a = PET_ART[id]; artCache[k] = buildSprite(a.frames[0], a.pal, 4, false, 1).toDataURL(); }
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
