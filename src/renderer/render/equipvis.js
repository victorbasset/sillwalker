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
  };
}
export const visualKey = (v) => [v.A, v.H, v.W, v.K, v.G, v.Q, v.aura].join("|");

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
  return p;
}
