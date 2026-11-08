// Bande de jeu : toute la largeur de l'écran est la carte de la zone.
// Les 10 monstres attendent à intervalles réguliers, le boss tout à droite ;
// le héros avance d'un combat à l'autre puis repart de la gauche à la zone
// suivante. Le rythme de jeu ne dépend pas de la largeur : seule la distance
// parcourue à l'écran change.
//
// Le décor est fixe (une seule toile, redessinée au changement de zone) et
// les personnages sont des éléments DOM déplacés par transform : voir dom.js.
// Ce module lit l'état de la simulation sans jamais le modifier.
import { PIXEL as P, OUTLINE } from "./art.js";
import { buildSpriteSet } from "./sprites.js";
import { RARITIES, KILLS_PER_ZONE, ELITE_AFFIXES } from "../game/data.js";
import { classDef } from "../game/classes.js";
import { bossName } from "../game/bosses.js";
import { heroVisual, visualKey } from "./equipvis.js";
import { buildHeroSprites } from "./sprites.js";
import { Juice } from "./juice.js";
import { fmt } from "../game/format.js";
import { q, FONT, mark, el, makeCanvas, sizeCanvas, drawText, drawCoin, drawBackdrop, Actor, Bar } from "./dom.js";

export const STRIP_H = 120;
const GROUND = 96, CONTACT = 44;
const LEFT = 24;            // position de départ du héros
const RIGHT_MARGIN = 300;   // le boss (2× plus large) s'arrête avant l'or, le niveau et les boutons
const FIGHTS = KILLS_PER_ZONE + 1;
const HUD_L_W = 520, HUD_R_W = 260, HUD_H = 24;

export class StripRenderer {
  constructor(container, game, { rightReserve = 0 } = {}) {
    this.root = container;
    this.game = game;
    this.rightReserve = rightReserve;
    this.W = 800; this.dpr = 0; this.cssDpr = 1;
    this.lunge = 0; this.flash = 0; this.monHit = 0; this.fadeT = 0; this.shakeT = 0; this.shakeK = "";
    this.lastDraw = 0;
    this.active = true;
    this.fx = [];
    this.slots = []; this.slotKey = null; this.corpse = null;
    this.layerKey = ""; this.hudLKey = ""; this.hudRKey = ""; this.xpKey = "";
    this.heroX = LEFT;

    this.base = makeCanvas(container, "layer base", false);
    this.stage = el("div", "stage", container);
    this.fxLayer = el("div", "fxlayer", container);
    this.fade = el("div", "fade", container);
    this.hudL = makeCanvas(container, "layer hud");
    this.hudR = makeCanvas(container, "layer hud");
    this.xp = el("div", "xpbar", container);
    this.xpFill = el("i", "", this.xp);

    this.ground = GROUND;
    this.juice = new Juice(this, container); // pièces, butin, bannières, événements
    this.resize();
    this.bindGameEvents();
  }

  /* ---------- Géométrie du parcours ---------- */
  /** Abscisse du monstre du combat i (1..FIGHTS). */
  fightX(i) { return LEFT + CONTACT + (this.W - LEFT - CONTACT - RIGHT_MARGIN) * i / FIGHTS; }
  target() { return Math.min(this.game.S.kills + 1, FIGHTS); }
  monX() { return this.fightX(this.target()); }

  bindGameEvents() {
    const g = this.game;
    g.on("heroAttack", ({ dmg, crit, mon, extra, first, iai }) => {
      this.lunge = 0.15; this.monHit = 0.12;
      const proj = this.game.classDef().projectile;
      if (proj) this.projectile(proj, this.heroX + 30, this.monX() + 6, mon.boss ? 40 : 66);
      const label = (iai ? "Iai ! " : first ? "Ouverture " : crit ? "Crit " : "") + Math.round(dmg);
      this.float(this.monX() + 14 + (extra ? 12 : 0), (mon.boss ? 20 : 46) - (extra ? 10 : 0), label, crit || first ? "#ffe27a" : "#ffffff", crit || first, true);
    });
    g.on("dodge", () => this.float(this.heroX + 16, 44, "Esquive", "#9fd8ff"));
    g.on("riposte", ({ dmg }) => this.float(this.monX() + 14, 34, "Riposte " + Math.round(dmg), "#ffb07a"));
    g.on("potion", () => this.float(this.heroX + 16, 36, "Potion !", "#ff8ad8", true));
    g.on("secondWind", () => this.float(this.heroX + 10, 36, "Second souffle !", "#ffe27a", true));
    g.on("classChange", () => { this.heroCls = null; this.minionKey = null; });
    g.on("minion", () => { this.minionLunge = 0.2; });
    g.on("bossSkill", ({ id }) => {
      const label = { enrage: ["ENRAGÉ !", "#ff4a4a"], shell: ["Carapace !", "#9fd8ff"], mirror: ["Miroir !", "#e0d8ff"], smash: ["", ""] }[id];
      if (label && label[0]) this.float(this.monX() + 20, 14, label[0], label[1], true);
    });
    g.on("telegraph", () => this.float(this.monX() + 20, 6, "!", "#ffe27a", true));
    g.on("smash", ({ dmg }) => { this.shake(0.3); this.flash = 0.25; this.float(this.heroX + 16, 36, "-" + Math.round(dmg) + " !", "#ff4a4a", true); });
    g.on("bossShieldHit", () => { this.monHit = 0.06; });
    g.on("mirrorHit", ({ dmg }) => { this.flash = Math.max(this.flash, 0.08); this.float(this.heroX + 16, 44, "-" + Math.round(dmg), "#e0d8ff", false, true); });
    g.on("flee", ({ mon }) => {
      this.float(this.monX() + 14, 40, "Il s’enfuit !", "#ffd34d", true);
      if (this.active) this.makeCorpse(mon, this.monX());
    });
    g.on("egg", () => this.float(this.heroX + 16, 30, "Un œuf !", "#ffe27a", true));
    g.on("petLevel", ({ pet }) => this.float(this.heroX - 10, 50, pet.name + " monte de niveau", "#9fe0a8"));
    g.on("questDone", () => this.float(this.heroX + 16, 30, "Quête accomplie !", "#9fd8ff", true));
    g.on("loot", ({ item }) => { if (item.r >= 4) this.shake(0.3); });
    g.on("chest", () => this.shake(0.2));
    g.on("heroHurt", ({ dmg }) => { this.flash = 0.12; this.float(this.heroX + 16, 44, "-" + Math.round(dmg), "#ff7a6b", false, true); });
    g.on("kill", ({ mon, gold }) => {
      if (mon.boss || mon.champion) this.shake(0.35);
      this.float(this.monX() + 10, 50, "+" + fmt(gold) + " or", "#ffd34d");
      if (this.active) this.makeCorpse(mon, this.monX());
    });

    g.on("heroDown", () => this.float(this.heroX + 6, 40, "K.O.", "#ff7a6b", true));
  }

  /* ---------- Effets (animés par la boucle à 30 FPS) ---------- */
  float(x, y, txt, col, big, isDamage) {
    if (!this.active) return;
    if (isDamage && this.game.S.settings.damageNumbers === false) return;
    const f = el("div", "float" + (big ? " big" : ""), this.fxLayer);
    f.textContent = txt;
    f.style.color = col;
    this.addFx(f, x, y - (big ? 14 : 12), 1, 22);
  }

  loot(x, y, color) {
    if (!this.active) return;
    const f = el("div", "loot", this.fxLayer);
    f.style.background = color;
    this.addFx(f, x, y, 1.2, 26);
  }

  /** Flèche ou boule de feu, du héros jusqu'au monstre. */
  projectile(kind, x0, x1, y) {
    if (!this.active) return;
    const f = el("div", "proj " + kind, this.fxLayer);
    this.addFx(f, x0, y, 0.16, 0, x1 - x0, true);
  }

  addFx(node, x, y, life, rise, dx = 0, keep = false) {
    if (this.fx.length > 30) this.fx.shift().node.remove();
    node.style.left = Math.round(x) + "px";
    node.style.top = Math.round(y) + "px";
    this.fx.push({ node, t: 0, life, rise, dx, keep });
  }

  updateFx(dt) {
    if (!this.fx.length) return;
    for (const f of this.fx) {
      f.t += dt;
      const k = Math.min(1, f.t / f.life);
      const y = -q(k * f.rise), x = q(k * f.dx), o = f.keep ? 1 : Math.round((1 - k) * 8) / 8;
      if (y !== f.y || x !== f.x) { f.y = y; f.x = x; f.node.style.transform = `translate3d(${x}px,${y}px,0)`; mark("fx"); }
      if (o !== f.o) { f.o = o; f.node.style.opacity = o; }
    }
    this.fx = this.fx.filter((f) => (f.t < f.life ? true : (f.node.remove(), false)));
  }

  setActive(on) {
    this.active = on;
    if (!on) { this.fxLayer.replaceChildren(); this.fx.length = 0; if (this.juice) this.juice.clear(); }
    this.lastDraw = 0;
  }

  /* ---------- Dimensions ---------- */
  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.cssDpr = dpr;
    this.W = this.root.clientWidth || 800;
    const spriteDpr = Math.max(1, Math.round(dpr));
    if (spriteDpr !== this.dpr) { this.dpr = spriteDpr; this.sprites = buildSpriteSet(spriteDpr); this.buildHero(); }
    sizeCanvas(this.base, this.W, STRIP_H, dpr);
    sizeCanvas(this.hudL, Math.min(HUD_L_W, this.W), HUD_H, dpr);
    sizeCanvas(this.hudR, HUD_R_W, HUD_H, dpr);
    this.skyKey = "";
    this.hudR.c.style.left = (this.W - HUD_R_W - this.rightReserve) + "px";
    this.layerKey = ""; this.hudLKey = ""; this.hudRKey = ""; this.slotKey = null;
  }

  /** Étoiles fixes (même tirage à chaque fois), d'autant plus visibles qu'il fait nuit. */
  drawStars(ctx, alpha) {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < this.W / 18; i++) {
      const x = Math.floor(rnd() * this.W), y = 4 + Math.floor(rnd() * 36), big = rnd() < 0.15;
      ctx.fillStyle = big ? "#fff6c8" : "#dfe7ff";
      ctx.fillRect(x, y, big ? 2 : 1, big ? 2 : 1);
    }
    ctx.globalAlpha = 1;
  }

  /** Niveau de nuit (0 = jour, 1 = nuit) selon l'heure réelle. */
  nightLevel() {
    if (this.game.S.settings && this.game.S.settings.dayNight === false) return { night: 0, dusk: false };
    const d = new Date(), h = d.getHours() + d.getMinutes() / 60;
    // 0 = plein jour, 1 = pleine nuit ; aube 5 h-7 h, crépuscule 19 h-21 h 30.
    let night = 0;
    if (h >= 21.5 || h < 5) night = 1;
    else if (h >= 19) night = (h - 19) / 2.5;
    else if (h < 7) night = 1 - (h - 5) / 2;
    return { night: Math.round(night * 20) / 20, dusk: night > 0 && night < 1 && h > 12 };
  }

  /** Décor fixe + teinte de l'heure, cuits dans une seule toile. Aucun calque
   *  semi-transparent à mélanger à chaque image : la nuit ne coûte rien. */
  drawBase() {
    const { night, dusk } = this.nightLevel(), ctx = this.base.ctx;
    drawBackdrop(ctx, this.W, STRIP_H, GROUND, this.game.zoneDef(), this.game.S.zone);
    if (night > 0) {
      ctx.fillStyle = dusk ? "#3a1f4a" : "#0b1030";
      ctx.globalAlpha = night * 0.45;
      ctx.fillRect(0, 0, this.W, STRIP_H);
      ctx.globalAlpha = 1;
      this.drawStars(ctx, Math.max(0, night * 1.4 - 0.4));
    }
    mark("backdrop");
  }

  buildHero() {
    this.stage.replaceChildren();
    this.slots = []; this.slotKey = null; this.corpse = null; this.hero = null; this.heroCls = null; this.pet = null; this.petId = undefined;
    this.minion = null; this.minionKey = undefined;
    this.heroBar = new Bar(this.stage, "#6fd17f");
    this.slash = el("div", "slash", this.stage);
  }

  /** Serviteur (nécromancien : squelette, druide : loup) quand la stat « minion » est active. */
  syncMinion() {
    const hs = this.game.stats(), kind = hs.minion > 0 ? (this.game.classDef().minion || "skel") : null;
    if (kind === this.minionKey) return;
    if (this.minion) this.minion.remove();
    this.minion = null;
    this.minionKey = kind;
    if (kind) this.minion = new Actor(this.stage, this.sprites.minions[kind], "minion");
  }

  /** Familier actif : suit le héros à quelques pas. */
  syncPet() {
    const id = this.game.S.pets.active;
    if (id === this.petId) return;
    if (this.pet) this.pet.remove();
    this.pet = null;
    this.petId = id;
    const set = id && this.sprites.pets[id];
    if (set) { this.pet = new Actor(this.stage, set.frames, "pet"); this.pet.fly = set.fly; }
  }

  /** (Re)crée le sprite du héros pour la classe active. */
  syncHero() {
    const cls = this.game.S.cls;
    const vis = heroVisual(this.game.S), key = cls + "|" + visualKey(vis);
    if (key === this.heroCls && this.hero) return;
    if (this.hero) this.hero.remove();
    const h = buildHeroSprites(cls, vis, this.dpr); // habillé selon l'équipement
    this.hero = new Actor(this.stage, [h.walk1, h.walk2, h.attack], "hero");
    this.heroCls = key;
    this.hero.el.classList.toggle("legend", vis.aura); // halo des objets légendaires
    this.heroBarX = null;
  }

  monsterActor(type, boss) {
    const set = this.sprites.monsters[type];
    const a = new Actor(this.stage, boss ? set.boss : set.normal, boss ? "boss" : "");
    a.fly = set.fly; a.boss = boss;
    if (boss) a.addCrown();
    return a;
  }

  monY(a, bob) {
    let y = GROUND - a.h + (a.boss ? P * 2 : P);
    if (a.fly) y -= (a.boss ? 18 : 26) + bob;
    return y;
  }

  /** Monstres qui attendent le long du parcours (recréés à chaque nouvelle série). */
  syncSlots() {
    const g = this.game, line = g.lineup(), Z = g.zoneDef();
    if (this.slotKey === line) return;
    for (const s of this.slots) s.remove();
    this.slots = [];
    for (let k = 0; k < FIGHTS; k++) {
      const boss = k === FIGHTS - 1;
      const a = this.monsterActor(boss ? Z.boss : line[k].type, boss);
      if (boss) {
        const tag = el("div", "affix bossname", a.el);
        tag.textContent = bossName(this.game.S.zone);
      }
      if (!boss && line[k].elite) {
        a.el.classList.add(line[k].champion ? "champion" : "elite");
        const af = ELITE_AFFIXES[line[k].affix];
        if (line[k].champion) { const tag = el("div", "affix champ", a.el); tag.textContent = "Champion" + (af ? " " + af.name.toLowerCase() : ""); }
        else if (af) { const tag = el("div", "affix", a.el); tag.textContent = af.name; tag.style.color = af.color; }
      }
      if (!boss && line[k].goblin) a.el.classList.add("goblin");
      a.flame = el("div", "flame", a.el);
      a.flame.style.left = Math.round(a.w / 2 - 6) + "px";
      a.flame.hidden = true;
      a.bar = new Bar(a.el, "#ff6b5a", "mon");
      a.bar.el.style.left = Math.round(a.w / 2 - 19) + "px";
      a.bar.el.style.top = (boss ? -22 : -10) + "px";
      a.bar.visible(false);
      a.move(this.fightX(k + 1), this.monY(a, 0));
      this.slots.push(a);
    }
    this.slotKey = line;
  }

  makeCorpse(mon, x) {
    if (this.corpse) this.corpse.remove();
    const a = this.monsterActor(mon.type, mon.boss);
    if (mon.elite) a.el.classList.add(mon.champion ? "champion" : "elite");
    a.show(0);
    a.move(x, this.monY(a, 0));
    this.corpse = a;
  }

  shake(t) { if (this.active && this.game.S.settings.fullEffects !== false) this.shakeT = Math.max(this.shakeT, t); }

  /* ---------- Image ---------- */
  draw(now) {
    const dt = this.lastDraw ? Math.min(0.25, (now - this.lastDraw) / 1000) : 0;
    const first = !this.lastDraw;
    this.lastDraw = now;
    this.lunge = Math.max(0, this.lunge - dt); this.flash = Math.max(0, this.flash - dt); this.monHit = Math.max(0, this.monHit - dt);
    const game = this.game, S = game.S, R = game.R;

    // Décor fixe : redessiné seulement au changement de zone ou de taille.
    const key = S.zone + ":" + this.W + ":" + this.cssDpr;
    if (key !== this.layerKey) {
      if (this.layerKey && !first) this.fadeT = 0.5; // fondu de transition entre zones
      this.layerKey = key;
      this.skyKey = "";
    }
    // Cycle jour / nuit : vérifié une fois par minute, décor redessiné si besoin.
    const minute = Math.floor(Date.now() / 60000);
    if (minute !== this.skyMinute || !this.skyKey) {
      this.skyMinute = minute;
      const k = JSON.stringify(this.nightLevel());
      if (k !== this.skyKey) { this.skyKey = k; this.drawBase(); }
    }
    this.updateFx(dt);
    this.juice.update(dt);
    // Tremblement de la scène (boss vaincu, coup dévastateur, légendaire, coffre) : par pas de 3 px.
    if (this.shakeT > 0 || this.shakeK) {
      this.shakeT = Math.max(0, this.shakeT - dt);
      const amp = this.shakeT > 0 ? P * (this.shakeT > 0.15 ? 2 : 1) : 0;
      const k = amp ? `translate3d(${(Math.random() < 0.5 ? -1 : 1) * amp}px,${(Math.random() < 0.5 ? -1 : 1) * (amp / P | 0) * P}px,0)` : "";
      if (k !== this.shakeK) { this.shakeK = k; this.stage.style.transform = k; mark("shake"); }
    }
    this.syncSlots();

    // Monstres en attente / combat en cours
    const cur = Math.min(S.kills, FIGHTS - 1);
    const idle = Math.floor(R.time * 2) % 2, busy = Math.floor(R.time * 4) % 2;
    for (let k = 0; k < FIGHTS; k++) {
      const a = this.slots[k];
      const alive = k >= S.kills;
      a.visible(alive);
      if (!alive) continue;
      const fighting = k === cur && R.mon;
      a.show(fighting ? busy : idle);
      const bob = fighting && a.fly ? Math.sin(R.time * 5) * 3 : 0;
      a.move(this.fightX(k + 1) + (fighting && this.monHit > 0 ? 3 : 0), this.monY(a, bob));
      a.bar.visible(!!fighting);
      if (fighting) a.bar.set(R.mon.hp / R.mon.max);
      const burning = !!(fighting && R.mon.burnT > 0);
      if (a.flame.hidden === burning) { a.flame.hidden = !burning; mark("flame"); }
      const enraged = !!(fighting && R.mon.enraged), shelled = !!(fighting && R.mon.shell > 0);
      if (a.el.classList.contains("enraged") !== enraged) { a.el.classList.toggle("enraged", enraged); mark("boss"); }
      if (a.el.classList.contains("shelled") !== shelled) { a.el.classList.toggle("shelled", shelled); mark("boss"); }
      const poisoned = !!(fighting && R.mon.poisonT > 0);
      if (a.el.classList.contains("poisoned") !== poisoned) { a.el.classList.toggle("poisoned", poisoned); mark("poison"); }
    }
    if (this.corpse) {
      if (R.corpse) this.corpse.alpha(Math.max(0, R.corpse.t / 0.45));
      else { this.corpse.remove(); this.corpse = null; }
    }

    // Héros : avance de l'étape précédente vers le prochain combat.
    this.syncHero();
    const cls = this.game.classDef(), reach = cls.contact, melee = !cls.projectile;
    const t = this.target();
    const from = t === 1 ? LEFT : Math.max(LEFT, this.fightX(t - 1) - reach), to = Math.max(LEFT, this.fightX(t) - reach);
    const x = R.mode === "walk" ? from + (to - from) * game.legProgress() : to;
    if (!first && x < this.heroX - 160) this.fadeT = Math.max(this.fadeT, 0.4); // retour au départ
    this.heroX = x;
    const walkF = Math.floor(R.time * 6) % 2;
    let frame = 0, bob = 0;
    if (R.mode === "walk") { frame = walkF; bob = walkF ? -P : 0; }
    if (R.mode === "fight" && this.lunge > 0) frame = 2;
    this.hero.show(frame);
    const fr = this.hero.frames[frame];
    this.hero.move(x + (this.lunge > 0 && melee ? 6 : 0) + (this.flash > 0 ? -3 : 0), GROUND - fr.ch + P + bob);
    this.hero.alpha(R.mode === "dead" ? 0.35 : 1);
    const bx = q(x + 3);
    if (bx !== this.heroBarX) { this.heroBarX = bx; this.heroBar.el.style.transform = `translate3d(${bx}px,${GROUND - this.hero.h - 2}px,0)`; mark("move"); }
    this.heroBar.set(R.hp / game.stats().hp);
    this.syncPet();
    this.syncMinion();
    if (this.minion) {
      this.minionLunge = Math.max(0, (this.minionLunge || 0) - dt);
      const mf = this.minion.frames[0], fighting = R.mode === "fight" && R.mon;
      // Au combat, le serviteur se place au contact du monstre ; sinon il précède le héros.
      const mx = fighting ? this.monX() - mf.cw - 2 + (this.minionLunge > 0 ? 4 : 0) : x + this.hero.w + 4;
      this.minion.show(Math.floor(R.time * (fighting ? 4 : 5)) % 2);
      this.minion.move(mx, GROUND - mf.ch + 2);
      this.minion.alpha(R.mode === "dead" ? 0.35 : 0.9);
    }
    // Bouclier sacré (paladin) : halo autour du héros tant qu'il tient.
    const shielded = R.mode === "fight" && R.shield > 0;
    if (this.hero.el.classList.contains("shielded") !== shielded) { this.hero.el.classList.toggle("shielded", shielded); mark("shield"); }
    if (this.pet) {
      const pf = this.pet.frames[0], moving = R.mode === "walk";
      this.pet.show(Math.floor(R.time * (moving ? 5 : 2)) % 2);
      const py = this.pet.fly ? GROUND - pf.ch - 34 + Math.round(Math.sin(R.time * 3) * 3) : GROUND - pf.ch + 2;
      this.pet.move(x - pf.cw - 4, py);
      this.pet.alpha(R.mode === "dead" ? 0.35 : 1);
    }
    const slashOn = melee && R.mode === "fight" && this.lunge > 0.07 && R.mon;
    if (slashOn) {
      const sx = q(this.monX() + 4);
      if (sx !== this.slashX) { this.slashX = sx; this.slash.style.transform = `translate3d(${sx}px,${q(GROUND - 36)}px,0)`; }
    }
    if (this.slash.classList.contains("on") !== !!slashOn) { this.slash.classList.toggle("on", !!slashOn); mark("slash"); }

    // Fondu (changement de zone, retour au départ)
    if (this.fadeT > 0) this.fadeT = Math.max(0, this.fadeT - dt);
    const fo = Math.round(Math.min(1, this.fadeT / 0.4) * 8) / 8;
    if (fo !== this.fadeO) { this.fadeO = fo; this.fade.style.opacity = fo; mark("fade"); }

    this.drawHudLeft();
    this.drawHudRight();
    const xpPct = (100 * S.xp / game.xpNeed()).toFixed(1);
    if (xpPct !== this.xpKey) { this.xpKey = xpPct; this.xpFill.style.transform = `scaleX(${xpPct / 100})`; mark("xp"); }
  }

  /* ---------- ATH (redessinés seulement quand le texte change) ---------- */
  drawHudLeft() {
    const S = this.game.S, label = "Zone " + S.zone + "  " + this.game.zoneName(), key = label + "|" + S.kills;
    if (key === this.hudLKey) return;
    this.hudLKey = key; mark("hud");
    const ctx = this.hudL.ctx;
    ctx.clearRect(0, 0, HUD_L_W, HUD_H);
    drawText(ctx, label, 10, 18, "#ffffff");
    ctx.font = FONT;
    let px = 14 + ctx.measureText(label).width + 6;
    for (let i = 0; i < KILLS_PER_ZONE; i++) { ctx.fillStyle = OUTLINE; ctx.fillRect(px - 1, 8, 8, 8); ctx.fillStyle = i < S.kills ? "#ffd34d" : "#4a4560"; ctx.fillRect(px, 9, 6, 6); px += 9; }
    ctx.fillStyle = OUTLINE; ctx.fillRect(px + 1, 6, 12, 12);
    ctx.fillStyle = S.kills >= KILLS_PER_ZONE ? "#ff6b5a" : "#6b3040"; ctx.fillRect(px + 2, 7, 10, 10);
    ctx.fillStyle = OUTLINE; ctx.fillRect(px + 4, 10, 2, 2); ctx.fillRect(px + 8, 10, 2, 2);
  }

  drawHudRight() {
    const S = this.game.S, gt = fmt(S.gold), lvlTxt = "Niv. " + S.lvl, key = gt + "|" + lvlTxt;
    if (key === this.hudRKey) return;
    this.hudRKey = key; mark("hud");
    const ctx = this.hudR.ctx, right = HUD_R_W - 10;
    ctx.clearRect(0, 0, HUD_R_W, HUD_H);
    drawText(ctx, lvlTxt, right, 18, "#ffffff", "right");
    ctx.font = FONT;
    const lw = ctx.measureText(lvlTxt).width;
    drawText(ctx, gt, right - 14 - lw, 18, "#ffd34d", "right");
    ctx.font = FONT;
    drawCoin(ctx, right - 14 - lw - ctx.measureText(gt).width - 14, 7);
  }
}
