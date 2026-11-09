// Apparence du héros selon son équipement : la couleur de l'armure, du
// casque, de l'arme, des bottes, des gants et de l'amulette portés se voit sur le personnage, et un
// halo doré apparaît quand un objet légendaire est équipé.
import { RARITIES, LEGENDARY } from "../game/data.js";

const colorOf = (it) => (it ? it.color || RARITIES[it.r].color : null);

export function heroVisual(S) {
  const e = S.equip || {};
  return {
    A: colorOf(e.armor), H: colorOf(e.helm), W: colorOf(e.weapon), K: colorOf(e.boots), G: colorOf(e.gloves), Q: colorOf(e.amulet),
    aura: Object.values(e).some((it) => it && it.r === LEGENDARY),
    // Silhouette (étude des concurrents : l'équipement se voit sur le personnage) : plume d'un casque épique ou
    // légendaire, cape d'une armure épique ou légendaire.
    plume: e.helm && e.helm.r >= 3 ? RARITIES[e.helm.r].color : null,
    cape: e.armor && e.armor.r >= 3 ? colorOf(e.armor) : null,
  };
}
export const visualKey = (v) => [v.A, v.H, v.W, v.K, v.G, v.Q, v.aura, v.plume, v.cape].join("|");

/**
 * Dessin du héros avec plume et cape (lettres P et C, couleurs dans dressPalette). Trouvé d'après le dessin : la
 * plume au-dessus de la plus haute rangée de casque (H), la cape derrière l'armure (A / a, à gauche : le héros
 * regarde à droite), qui retombe de deux rangées. Deux rangées ajoutées en haut pour la plume (toutes les images
 * d'une même classe pareil : pas de saut).
 */
export function gearRows(rows, v) {
  if (!v.plume && !v.cape) return rows;
  let g = rows.map((r) => r.split(""));
  const set = (y, x, ch) => { if (y >= 0 && y < g.length && x >= 0 && (g[y][x] === undefined || g[y][x] === ".")) { while (g[y].length < x) g[y].push("."); g[y][x] = ch; } };
  if (v.cape) {
    const armorRows = g.map((r, y) => [y, r.findIndex((c) => c === "A" || c === "a")]).filter(([, x]) => x >= 0);
    if (armorRows.length) {
      for (const [y, x] of armorRows) set(y, x - 1, "C");
      const [ly, lx] = armorRows[armorRows.length - 1];
      set(ly + 1, lx - 1, "C"); set(ly + 2, lx - 2, "C");
    }
  }
  if (v.plume) {
    // Les deux rangées sont ajoutées même sans casque dessiné sur cette image : même hauteur pour toutes.
    const top = g.findIndex((r) => r.includes("H"));
    g = [[], [], ...g];
    if (top >= 0) {
      const xs = g[top + 2].map((c, i) => (c === "H" ? i : -1)).filter((i) => i >= 0), cx = xs[Math.floor(xs.length / 2)];
      set(top + 1, cx, "P"); set(top, cx, "P"); set(top, cx - 1, "P"); set(top + 1, cx - 1, "P"); set(top, cx - 2, "P");
    }
  }
  return g.map((r) => r.join(""));
}

/** Assombrit (f < 1) ou éclaircit (f > 1) une couleur #rrggbb. */
export function shade(hex, f) {
  const c = [1, 3, 5].map((i) => parseInt(hex.substr(i, 2), 16));
  const out = c.map((v) => Math.max(0, Math.min(255, Math.round(f < 1 ? v * f : v + (255 - v) * (f - 1)))));
  return "#" + out.map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** Palette du personnage habillée de son équipement. */
export function dressPalette(pal, v) {
  const p = { ...pal };
  if (v.A) { p.A = v.A; p.a = shade(v.A, 0.68); }
  if (v.H && p.H) { p.H = v.H; p.h = shade(v.H, 0.68); }
  if (v.W) { p.W = v.W; p.w = shade(v.W, 0.62); }
  if (v.K) p.K = shade(v.K, 0.75);
  // Gants (mains) et amulette (pendentif) ; sinon couleur d'origine (peau, armure portée).
  if (p.N) p.N = v.G ? shade(v.G, 0.85) : p.S;
  if (p.Q) p.Q = v.Q ? shade(v.Q, 1.15) : p[p._q || "A"];
  if (v.plume) p.P = v.plume;
  if (v.cape) p.C = shade(v.cape, 0.55);
  return p;
}
