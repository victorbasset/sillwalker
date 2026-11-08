// Effets qui donnent envie : pièces qui jaillissent et volent jusqu'au
// compteur d'or, butin qui saute du monstre avec un faisceau à la couleur de
// sa rareté, flash et bannière pour les légendaires, événements rares
// (rafale de vent, pluie d'or, frénésie, étoile filante à attraper).
//
// Tout est animé par la boucle à 30 FPS (aucune animation CSS, qui tournerait
// à la fréquence de l'écran) et n'existe que le temps de l'effet.
import { RARITIES, LEGENDARY } from "../game/data.js";
import { EVENTS } from "../game/events.js";
import { fmt } from "../game/format.js";
import { itemIconURL } from "./sprites.js";
import { q, el, mark } from "./dom.js";

const MAX_PARTS = 90;
const easeIn = (k) => k * k;
const easeOut = (k) => 1 - (1 - k) * (1 - k);

export class Juice {
  constructor(strip, container) {
    this.s = strip;
    this.layer = el("div", "juice", container);
    this.parts = [];
    this.pulse = 0;
    this.star = null;
    this.bind();
  }

  get active() { return this.s.active; }
  get full() { return this.s.game.S.settings.fullEffects !== false; }
  ground() { return this.s.ground; }
  goldTarget() { return { x: this.s.W - this.s.rightReserve - 80, y: 10 }; }
  bagTarget() { return { x: this.s.W - 22, y: 12 }; }

  bind() {
    const g = this.s.game;
    g.on("kill", ({ mon }) => {
      const n = mon.goblin ? 34 : mon.boss ? 28 : mon.elite ? 12 : 2;
      this.coins(this.s.monX() + 10, this.ground() - 20, n * ((g.R.events.goldrain || 0) > 0 ? 2 : 1), mon.boss || mon.goblin);
      if (mon.boss) this.flash("#ffe9a8", 0.3);
    });
    g.on("loot", ({ item, mon }) => this.loot(item, mon ? this.s.monX() + 8 : this.s.heroX + 10));
    g.on("levelUp", ({ lvl }) => { this.banner(`Niveau ${lvl} !`, "#ffe27a", this.s.heroX); this.sparkles(this.s.heroX + 18, this.ground() - 40, "#ffe27a", 10); });
    g.on("zoneUp", ({ zone, record }) => { if (record) this.banner(`Nouveau record : zone ${zone} !`, "#9fe0a8", this.s.heroX + 120); });
    g.on("event", ({ id }) => { const ev = EVENTS[id]; this.banner(`${ev.name} ! ${ev.text}`, ev.color, this.s.heroX + 60, true); this.flash(ev.color, 0.2); });
    g.on("feather", ({ gain, source, speed }) => {
      this.banner(`${source} : +${gain} % de vitesse pour toujours ! (+${speed} %)`, "#9fd8ff", this.s.heroX + 60, true);
      this.sparkles(this.s.heroX + 18, this.ground() - 50, "#9fd8ff", 14);
      this.flash("#9fd8ff", 0.25);
    });
    g.on("star", () => this.spawnStar());
    g.on("spawn", (m) => {
      if (!m.boss) return;
      this.banner(`⚔ ${m.name || "Boss"} approche !`, "#ff7a6b", this.s.monX() - 120, true);
      if (this.full) this.flash("#ff4a4a", 0.15);
    });
    g.on("starMissed", () => this.removeStar());
    g.on("starCaught", ({ gold }) => {
      const p = this.starPos();
      this.removeStar();
      this.sparkles(p.x, p.y, "#fff6c8", 18);
      this.coins(p.x, p.y, 30, true);
      this.banner(`Étoile filante attrapée ! +${fmt(gold)} or`, "#fff6c8", p.x, true);
    });
  }

  /* ---------- Particules ---------- */
  add(node, update) {
    if (!this.active) { node.remove(); return; }
    if (this.parts.length >= MAX_PARTS) this.parts.shift().node.remove();
    const part = { node, update, t: 0 };
    this.parts.push(part);
    update(part, 0); // position initiale (et ligne de bannière réservée) dès la création
  }

  place(node, x, y, extra = "") {
    const t = `translate3d(${q(x)}px,${q(y)}px,0)${extra}`;
    if (node._t !== t) { node._t = t; node.style.transform = t; mark("juice"); }
  }

  /** Pièces : jaillissent, rebondissent, puis filent vers le compteur d'or. */
  coins(x, y, n, big) {
    if (!this.active) return;
    if (!this.full) n = Math.min(n, 3); // effets réduits
    for (let i = 0; i < n; i++) {
      const node = el("div", "coin" + (big && i % 4 === 0 ? " big" : ""), this.layer);
      const st = { x, y, vx: (Math.random() - 0.5) * (big ? 240 : 120), vy: -(90 + Math.random() * (big ? 170 : 90)), home: 0.75 + i * 0.025, hx: 0, hy: 0 };
      this.add(node, (p, dt) => {
        if (p.t < st.home) {
          st.vy += 520 * dt; st.x += st.vx * dt; st.y += st.vy * dt;
          if (st.y > this.ground() - 6) { st.y = this.ground() - 6; st.vy *= -0.45; st.vx *= 0.6; }
          this.place(node, st.x, st.y);
          return true;
        }
        if (!st.hx) { st.hx = st.x; st.hy = st.y; st.ht = p.t; }
        const k = Math.min(1, (p.t - st.ht) / 0.55), tg = this.goldTarget();
        this.place(node, st.hx + (tg.x - st.hx) * easeIn(k), st.hy + (tg.y - st.hy) * easeIn(k) - Math.sin(k * Math.PI) * 30);
        if (k >= 1) { this.pulse = 0.3; return false; }
        return true;
      });
    }
  }

  /** Butin : l'icône saute du monstre, puis va dans le sac. Faisceau pour rare et mieux. */
  loot(item, x) {
    if (!this.active) return;
    const r = item.r, color = RARITIES[r].color, y0 = this.ground() - 24;
    if (r >= 2 && (this.full || r >= LEGENDARY)) {
      const beam = el("div", "beam" + (r >= LEGENDARY ? " legendary" : ""), this.layer);
      beam.style.setProperty("--c", color);
      this.place(beam, x - 4, 0);
      this.add(beam, (p) => { const o = Math.round((1 - p.t / 2.2) * 10) / 10; if (beam._o !== o) { beam._o = o; beam.style.opacity = Math.max(0, o); } return p.t < 2.2; });
    }
    const img = el("img", "itemfx rb" + r, this.layer);
    img.src = itemIconURL(item);
    const st = { vx: 30 + Math.random() * 30, vy: -170, x, y: y0 };
    this.add(img, (p, dt) => {
      if (p.t < 1.1) {
        st.vy += 380 * dt; st.x += st.vx * dt; st.y = Math.min(y0, st.y + st.vy * dt);
        this.place(img, st.x, st.y);
        return true;
      }
      if (!st.hx) { st.hx = st.x; st.hy = st.y; st.ht = p.t; }
      const k = Math.min(1, (p.t - st.ht) / 0.6), tg = this.bagTarget();
      this.place(img, st.hx + (tg.x - st.hx) * easeIn(k), st.hy + (tg.y - st.hy) * easeIn(k), ` scale(${(1 - k * 0.6).toFixed(2)})`);
      return k < 1;
    });
    if (r === LEGENDARY) {
      this.flash("#ffb733", 0.45);
      this.banner(`★ LÉGENDAIRE ! ${item.name}`, color, x, true);
      this.sparkles(x + 8, y0 - 20, color, 20);
    } else if (r === 3) this.banner(`Épique : ${item.name}`, color, x);
  }

  /** Bannière qui surgit au-dessus de la scène. */
  banner(text, color, x, big) {
    if (!this.active) return;
    const node = el("div", "banner" + (big ? " big" : ""), this.layer);
    node.textContent = text;
    node.style.color = color;
    const life = big ? 3.2 : 2.4, cx = Math.max(160, Math.min(this.s.W - 360, x));
    // Une ligne par bannière simultanée (3 lignes max) pour qu'elles ne se chevauchent pas.
    const used = new Set(this.parts.filter((p) => p.slot != null).map((p) => p.slot));
    const slot = [0, 1, 2].find((i) => !used.has(i)) ?? 0;
    this.add(node, (p) => {
      p.slot = slot;
      const k = p.t / life, pop = p.t < 0.18 ? 0.6 + (p.t / 0.18) * 0.5 : p.t < 0.3 ? 1.1 - (p.t - 0.18) : 1;
      this.place(node, cx, 28 + slot * 24 - easeOut(Math.min(1, k)) * 6, ` translate(-50%,0) scale(${pop.toFixed(2)})`);
      const o = k > 0.8 ? Math.round((1 - (k - 0.8) / 0.2) * 8) / 8 : 1;
      if (node._o !== o) { node._o = o; node.style.opacity = o; }
      return k < 1;
    });
  }

  flash(color, strength) {
    if (!this.active || !this.full) return;
    const node = el("div", "flash", this.layer);
    node.style.background = color;
    this.add(node, (p) => {
      const o = Math.max(0, Math.round(strength * (1 - p.t / 0.5) * 20) / 20);
      if (node._o !== o) { node._o = o; node.style.opacity = o; mark("juice"); }
      return p.t < 0.5;
    });
  }

  sparkles(x, y, color, n) {
    if (!this.active) return;
    for (let i = 0; i < n; i++) {
      const node = el("div", "spark", this.layer);
      node.style.background = color;
      const a = (i / n) * Math.PI * 2, sp = 40 + Math.random() * 50;
      this.add(node, (p) => {
        const k = p.t / 0.8;
        this.place(node, x + Math.cos(a) * sp * easeOut(k), y + Math.sin(a) * sp * easeOut(k) * 0.6);
        const o = Math.round((1 - k) * 8) / 8;
        if (node._o !== o) { node._o = o; node.style.opacity = o; }
        return k < 1;
      });
    }
  }

  /* ---------- Événements en cours ---------- */
  ambient(dt) {
    const E = this.s.game.R.events, W = this.s.W;
    // Rafale de vent : traînées blanches qui filent vers la gauche.
    if ((E.wind || 0) > 0 && Math.random() < dt * 8) {
      const node = el("div", "streak", this.layer), y = 20 + Math.random() * (this.ground() - 30), x0 = this.s.heroX + 200 + Math.random() * 500;
      this.add(node, (p) => { this.place(node, x0 - p.t * 900, y); return p.t < 0.7; });
    }
    // Pluie d'or : pièces qui tombent du ciel autour du héros.
    if ((E.goldrain || 0) > 0 && Math.random() < dt * 10) {
      const node = el("div", "coin", this.layer), x = Math.max(0, Math.min(W - 10, this.s.heroX - 100 + Math.random() * 600));
      this.add(node, (p) => { this.place(node, x, -8 + p.t * 140); return p.t < 0.8; });
    }
    const frenzy = (E.frenzy || 0) > 0;
    if (this.s.hero && this.s.hero.el.classList.contains("frenzy") !== frenzy) this.s.hero.el.classList.toggle("frenzy", frenzy);
  }

  /* ---------- Étoile filante (cliquable) ---------- */
  spawnStar() {
    if (!this.active) return;
    this.removeStar();
    const node = el("button", "star hit", this.layer);
    node.title = "Attrape l’étoile filante !";
    node.setAttribute("aria-label", "Attraper l’étoile filante");
    node.innerHTML = "<i></i>";
    node.addEventListener("click", () => this.s.game.catchStar());
    this.star = node;
    this.onStarChange?.();
  }
  removeStar() { if (this.star) { this.star.remove(); this.star = null; this.onStarChange?.(); } }
  starPos() {
    const st = this.s.game.R.star, k = st ? 1 - st.t / st.life : 1;
    const x0 = Math.min(this.s.W - 200, this.s.heroX + 750), x1 = Math.max(40, this.s.heroX - 150);
    return { x: x0 + (x1 - x0) * k, y: 10 + k * 34 };
  }

  update(dt) {
    if (this.pulse > 0) {
      this.pulse = Math.max(0, this.pulse - dt);
      const sc = (1 + this.pulse * 1.1).toFixed(2);
      if (this.s.hudR.c._sc !== sc) { this.s.hudR.c._sc = sc; this.s.hudR.c.style.transform = `scale(${sc})`; mark("juice"); }
    }
    if (this.star) { const p = this.starPos(); this.place(this.star, p.x, p.y); }
    this.ambient(dt);
    if (!this.parts.length) return;
    for (const p of this.parts) { p.t += dt; p.alive = p.update(p, dt); }
    this.parts = this.parts.filter((p) => (p.alive ? true : (p.node.remove(), false)));
  }

  clear() { this.layer.replaceChildren(); this.parts.length = 0; this.star = null; }
}
