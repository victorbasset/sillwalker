// Effets qui donnent envie : pièces qui jaillissent et volent jusqu'au
// compteur d'or, butin qui saute du monstre avec un faisceau à la couleur de
// sa rareté, flash et bannière pour les légendaires, événements rares
// (rafale de vent, pluie d'or, frénésie, étoile filante à attraper).
//
// Tout est animé par la boucle à 30 FPS (aucune animation CSS, qui tournerait
// à la fréquence de l'écran) et n'existe que le temps de l'effet.
import { SETS } from "../game/sets.js";
import { itemName } from "../i18n/data.js";
import { t as tx, fsp } from "../i18n/index.js";
import { CLASSES } from "../game/classes.js";
import { RARITIES, LEGENDARY } from "../game/data.js";
import { EVENTS } from "../game/events.js";
import { UNLOCK_INDEX } from "../game/unlocks.js";
import { fmt } from "../game/format.js";
import { itemIconURL } from "./sprites.js";
import { q, el, mark, makeCanvas, sizeCanvas } from "./dom.js";

const MAX_PARTS = 90;

// Météo de chaque zone : quelques particules qui flottent (désactivées avec
// « Effets complets »). vx / vy en px/s, sway : balancement, rate : par seconde et par 1000 px.
const WEATHER = {
  "Forêt des murmures": "leaf", "Marais brumeux": "spore", "Forge volcanique": "ember", "Désert brûlant": "dust",
  "Toundra gelée": "snow", "Jungle étouffante": "leaf", "Ruines célestes": "mote", "Abysses ardents": "ember",
  "Égouts oubliés": "drip", "Pyramide maudite": "dust", "Pics enneigés": "snow", "Nid des harpies": "feather",
  "Cœur du volcan": "ember", "Bastion noir": "ash", "Caverne de cristal": "mote", "Bois corrompu": "spore",
  "Pic des wyvernes": "dust", "Royaume du néant": "mote", "Récif abyssal": "bubble", "Volcan des wyvernes": "ember",
  "Crypte oubliée": "ash", "Grotte suintante": "drip", "Côte des naufragés": "feather",
  "Champignonnière géante": "spore", "Cité engloutie": "bubble", "Mines naines": "ash", "Verger enchanté": "leaf", "Désert de verre": "dust", "Trône des tempêtes": "feather", "Ossuaire des titans": "ash", "Steppe des loups": "dust", "Lagon de corail": "bubble", "Glacier hurlant": "snow",
};
const WX = {
  snow:    { c: ["#ffffff", "#e6f1fa"], vx: -14, vy: 24, sway: 10, rate: 3 },
  leaf:    { c: ["#6cbf4f", "#c9a03a", "#a8562b"], vx: -30, vy: 18, sway: 14, rate: 1 },
  spore:   { c: ["#c9e8a0", "#e8f0c0"], vx: -4, vy: -9, sway: 8, rate: 1.2 },
  ember:   { c: ["#ff9a3a", "#ffd34d", "#e2552b"], vx: 6, vy: -28, sway: 6, rate: 2.5 },
  dust:    { c: ["#f0d8a0", "#d8b878"], vx: -70, vy: 2, sway: 2, rate: 1.5, side: true },
  mote:    { c: ["#e0d8ff", "#9fe8ff", "#ffffff"], vx: -3, vy: -7, sway: 10, rate: 1.2 },
  drip:    { c: ["#7fb0d8"], vx: 0, vy: 90, sway: 0, rate: 1, tall: true },
  ash:     { c: ["#8a8f99", "#5c616b"], vx: -8, vy: 14, sway: 6, rate: 1.5 },
  feather: { c: ["#f4f0e8", "#e8c8a0"], vx: -20, vy: 12, sway: 18, rate: 0.6 },
  bubble:  { c: ["#9fe8ff"], vx: 0, vy: -22, sway: 6, rate: 1.5, ring: true },
};
const WX_MAX = 48;
const easeIn = (k) => k * k;
const easeOut = (k) => 1 - (1 - k) * (1 - k);

export class Juice {
  constructor(strip, container) {
    this.s = strip;
    this.layer = el("div", "juice", container);
    this.parts = [];
    this.pulse = 0;
    this.star = null;
    this.wx = [];
    this.wxKind = null;
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
      const n = mon.goblin ? 34 : mon.boss ? 28 : mon.champion ? 30 : mon.elite ? 12 : 2;
      if (mon.champion) { this.banner(tx("Champion vaincu !"), "#c08cff", this.s.monX(), true); this.flash("#c08cff", 0.25); }
      this.coins(this.s.monX() + 10, this.ground() - 20, n * ((g.R.events.goldrain || 0) > 0 ? 2 : 1), mon.boss || mon.goblin);
      if (mon.boss) this.flash("#ffe9a8", 0.3);
    });
    g.on("bossNemesis", ({ name }) => this.banner(tx("{0} enfin vaincu !", { 0: name }), "#ffb733", this.s.monX() - 40));
    g.on("loot", ({ item, mon, chest, ground }) => this.loot(item, chest ? this.s.heroX + 50 : mon ? this.s.monX() + 8 : this.s.heroX + 10, ground));
    g.on("levelUp", ({ lvl }) => { this.banner(`${tx("Niveau {0} !", { 0: lvl })}`, "#ffe27a", this.s.heroX); this.sparkles(this.s.heroX + 18, this.ground() - 40, "#ffe27a", 10); });
    g.on("zoneUp", ({ zone, record }) => {
      if (!record) return;
      // Grand palier (zone 50, 100, 150, 200…) : bannière dorée, plus marquante qu'un record ordinaire.
      if (zone % 50 === 0) this.banner(`✦ ${tx("Cap franchi : zone {0} !", { 0: zone })}`, "#ffd34d", this.s.heroX + 120, true);
      else this.banner(`${tx("Nouveau record : zone {0} !", { 0: zone })}`, "#9fe0a8", this.s.heroX + 120);
    });
    g.on("setBonus", ({ id, n }) => { // panoplie : palier de 2 ou 4 pièces atteint
      const st = SETS[id]; if (!st) return;
      this.banner(`◆ ${tx("{0} : bonus {1} pièces !", { 0: st.name, 1: n })}`, st.color, this.s.heroX + 60, n >= 4);
      this.sparkles(this.s.heroX + 18, this.ground() - 40, st.color, n >= 4 ? 18 : 10);
    });
    g.on("ascend", ({ count, gain } = {}) => { // nouvelle course : moment marquant, mais bref
      this.banner(`✦ ${tx("Ascension n° {0} ! +{1} éclats d’étoile", { 0: count, 1: gain })}`, "#c9b8ff", this.s.heroX + 40, true);
      this.sparkles(this.s.heroX + 18, this.ground() - 40, "#e0d8ff", 20);
    });
    g.on("event", ({ id }) => { const ev = EVENTS[id]; this.banner(`${ev.name}${fsp()}! ${ev.text}`, ev.color, this.s.heroX + 60, true); this.flash(ev.color, 0.2); });
    g.on("unlock", ({ id }) => {
      const u = UNLOCK_INDEX[id];
      this.banner(`🔓 ${tx("Débloqué : {0} !", { 0: u ? u.name : id })}`, "#ffd34d", this.s.heroX + 80, true);
      this.sparkles(this.s.heroX + 18, this.ground() - 40, "#ffd34d", 16);
      this.flash("#ffe9a8", 0.2);
    });
    g.on("classUnlock", ({ cls }) => {
      this.banner(`${tx("Héros libéré : {0} !", { 0: CLASSES[cls].name })}`, "#9fe0a8", this.s.heroX + 80, true);
      this.sparkles(this.s.heroX + 18, this.ground() - 40, "#9fe0a8", 16);
      this.flash("#9fe0a8", 0.25);
    });
    g.on("feather", ({ gain, source, speed }) => {
      this.banner(`${source}${fsp()}${tx(": +{0} % de vitesse pour toujours ! (+{1} %)", { 0: gain, 1: speed })}`, "#9fd8ff", this.s.heroX + 60, true);
      this.sparkles(this.s.heroX + 18, this.ground() - 50, "#9fd8ff", 14);
      this.flash("#9fd8ff", 0.25);
    });
    g.on("star", () => this.spawnStar());
    g.on("spawn", (m) => {
      if (!m.boss) return;
      this.banner(`${tx("⚔ {0} approche !", { 0: m.name || tx("Boss") })}`, "#ff7a6b", this.s.monX() - 120, true);
      if (this.full) this.flash("#ff4a4a", 0.15);
    });
    g.on("starMissed", () => this.removeStar());
    g.on("chest", ({ gold }) => this.chest(gold));
    g.on("starCaught", ({ gold }) => {
      const p = this.starPos();
      this.removeStar();
      this.sparkles(p.x, p.y, "#fff6c8", 18);
      this.coins(p.x, p.y, 30, true);
      this.banner(`${tx("Étoile filante attrapée ! +{0} or", { 0: fmt(gold) })}`, "#fff6c8", p.x, true);
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
        if (ground) { // sac plein : l'objet reste au sol, clignote puis s'efface (perdu)
        const k = (p.t - 1.1) / 3;
        if (k >= 1) return false;
        img.style.opacity = k < 0.6 ? (Math.floor(p.t * 4) % 2 ? 0.55 : 1) : (1 - k) * 2.5;
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
  loot(item, x, ground) {
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
      this.banner(`${tx("★ LÉGENDAIRE ! {0}", { 0: itemName(item) })}`, color, x, true);
      this.sparkles(x + 8, y0 - 20, color, 20);
    } else if (r === 3) this.banner(`${tx("Épique : {0}", { 0: itemName(item) })}`, color, x);
  }

  /** Bannière qui surgit au-dessus de la scène. */
  banner(text, color, x, big) {
    if (!this.active) return;
    const node = el("div", "banner" + (big ? " big" : ""), this.layer);
    node.textContent = text;
    node.style.color = color;
    // Centrée sur x, mais jamais coupée par les bords de l'écran (largeur mesurée une fois).
    const half = Math.ceil((node.offsetWidth || 300) * 1.1 / 2) + 8;
    const life = big ? 3.2 : 2.4, cx = Math.max(half, Math.min(this.s.W - (this.s.rightReserve || 0) - 160 - half, x));
    // Une ligne par bannière simultanée (3 lignes max) pour qu'elles ne se chevauchent pas.
    const used = new Set(this.parts.filter((p) => p.slot != null).map((p) => p.slot));
    let slot = [0, 1, 2].find((i) => !used.has(i));
    if (slot == null) { // toutes les lignes prises : la plus ancienne bannière laisse sa place
      const old = this.parts.find((p) => p.slot != null);
      slot = old.slot;
      old.node.remove();
      this.parts.splice(this.parts.indexOf(old), 1);
    }
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
    const hawk = (E.hawkeye || 0) > 0; // Œil du faucon : halo orangé (tous les coups critiques)
    if (this.s.hero && this.s.hero.el.classList.contains("hawkeye") !== hawk) this.s.hero.el.classList.toggle("hawkeye", hawk);
  }

  /* ---------- Coffre au trésor ---------- */
  chest(gold) {
    if (!this.active) return;
    const x = this.s.heroX + 46, y = this.ground() - 18, node = el("div", "chest", this.layer);
    node.innerHTML = "<i class=\"lid\"></i><i class=\"box\"></i>";
    let opened = false;
    this.add(node, (p) => {
      this.place(node, x, y - (p.t < 0.25 ? Math.sin(p.t / 0.25 * Math.PI) * 10 : 0));
      if (!opened && p.t > 0.45) {
        opened = true;
        node.classList.add("open");
        this.coins(x + 8, y - 4, 26, true);
        this.sparkles(x + 8, y - 10, "#ffd34d", 16);
        if (this.full) this.flash("#ffe9a8", 0.2);
      }
      node.style.opacity = p.t > 2.6 ? String(Math.max(0, 1 - (p.t - 2.6) / 0.4)) : "";
      return p.t < 3;
    });
    this.banner(`${tx("Coffre au trésor ! +{0} or", { 0: fmt(gold) })}`, "#ffd34d", x, true);
  }

  /* ---------- Étoile filante (cliquable) ---------- */
  spawnStar() {
    if (!this.active) return;
    this.removeStar();
    const node = el("button", "star hit", this.layer);
    node.title = tx("Attrape l’étoile filante !");
    node.setAttribute("aria-label", tx("Attraper l’étoile filante"));
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
    this.weather(dt);
    if (!this.parts.length) return;
    for (const p of this.parts) { p.t += dt; p.alive = p.update(p, dt); }
    this.parts = this.parts.filter((p) => (p.alive ? true : (p.node.remove(), false)));
  }

  /* ---------- Météo de la zone ---------- */
  // Toutes les particules dans une seule toile, redessinée 15 fois par seconde
  // et seulement si un pixel a bougé : un seul calque à composer au lieu d'un
  // élément par flocon.
  weather(dt) {
    const kind = this.full && this.s.game.S.settings.weather !== false ? WEATHER[this.s.game.zoneDef().src || this.s.game.zoneDef().name] || null : null;
    if (kind !== this.wxKind) { this.clearWeather(); this.wxKind = kind; }
    if (!kind) return;
    const k = WX[kind], W = this.s.W, G = this.ground();
    if (this.wx.length < WX_MAX && Math.random() < dt * k.rate * 2 * W / 1000) {
      const x0 = k.side ? W + 10 : Math.random() * W, y0 = k.side ? 10 + Math.random() * (G - 20) : k.vy > 0 ? -6 : G - 4;
      this.wx.push({ c: k.c[Math.floor(Math.random() * k.c.length)], x0, y0, sp: 0.7 + Math.random() * 0.6, ph: Math.random() * 6.28, t: 0 });
    }
    let key = "";
    this.wx = this.wx.filter((p) => {
      p.t += dt;
      p.x = q(p.x0 + k.vx * p.sp * p.t + Math.sin(p.t * 1.7 + p.ph) * k.sway); p.y = q(p.y0 + k.vy * p.sp * p.t);
      const alive = p.y > -10 && p.y < G + 2 && p.x > -20 && p.x < W + 20 && p.t < 12;
      if (alive) key += p.x + "," + p.y + ";";
      return alive;
    });
    this.wxClock = (this.wxClock || 0) + dt;
    if (this.wxClock < 1 / 15 || key === this.wxKey) return;
    this.wxClock = 0; this.wxKey = key;
    const cv = this.wxCanvas();
    const ctx = cv.ctx;
    ctx.clearRect(0, 0, W, G + 4);
    ctx.globalAlpha = k.ring || k.tall ? 0.6 : 0.9;
    for (const p of this.wx) {
      ctx.fillStyle = p.c;
      if (k.ring) { ctx.fillRect(p.x + 1, p.y, 4, 1); ctx.fillRect(p.x + 1, p.y + 5, 4, 1); ctx.fillRect(p.x, p.y + 1, 1, 4); ctx.fillRect(p.x + 5, p.y + 1, 1, 4); }
      else if (k.tall) ctx.fillRect(p.x, p.y, 2, 6);
      else ctx.fillRect(p.x, p.y, 3, 3);
    }
    ctx.globalAlpha = 1;
    mark("weather");
  }
  wxCanvas() {
    const W = this.s.W, H = this.ground() + 4, dpr = this.s.cssDpr || 1, sz = W + "x" + H + "x" + dpr;
    if (!this.wxc || !this.wxc.c.isConnected) { this.wxc = makeCanvas(null, "wxc"); this.layer.prepend(this.wxc.c); this.wxSize = ""; }
    if (this.wxSize !== sz) { this.wxSize = sz; sizeCanvas(this.wxc, W, H, dpr); }
    return this.wxc;
  }
  clearWeather() {
    this.wx.length = 0; this.wxKey = "";
    if (this.wxc) { this.wxc.c.remove(); this.wxc = null; }
  }

  clear() { this.layer.replaceChildren(); this.parts.length = 0; this.star = null; this.wx.length = 0; this.wxKind = null; this.wxc = null; this.wxKey = ""; }
}
