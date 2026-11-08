// Mode mini : petit encart près de l'horloge. Le héros à gauche, le monstre
// qui approche puis se bat, et à droite niveau / or / zone.
import { t as tx } from "../i18n/index.js";
import { PIXEL as P } from "./art.js";
import { buildSpriteSet, buildHeroSprites } from "./sprites.js";
import { heroVisual, visualKey } from "./equipvis.js";
import { fmt, fmtShort } from "../game/format.js";
import { xpNeed } from "../game/rules.js";
import { mark, el, makeCanvas, sizeCanvas, drawBackdrop, Actor, Bar } from "./dom.js";

export const MINI_W = 340, MINI_H = 64;
const SCENE_W = 232, GROUND = 58, HERO_X = 8, CONTACT = 44;

export class MiniRenderer {
  constructor(container, game) {
    this.root = container;
    this.game = game;
    this.dpr = 0; this.cssDpr = 1;
    this.lunge = 0; this.flash = 0; this.monHit = 0;
    this.lastDraw = 0; this.sceneKey = ""; this.infoKey = "";
    this.scene = el("div", "mini-scene", container);
    this.base = makeCanvas(this.scene, "layer base", false);
    this.stage = el("div", "stage", this.scene);
    this.info = el("div", "mini-info", container);
    this.lvl = el("div", "mini-lvl", this.info);
    this.gold = el("div", "mini-gold", this.info);
    this.zone = el("div", "mini-zone", this.info);
    this.xp = el("i", "", el("div", "mini-xp", this.info)); // barre d'expérience fine
    this.xpW = -1;
    this.monActor = null; this.monRef = null;
    game.on("heroAttack", () => { this.lunge = 0.15; this.monHit = 0.12; });
    game.on("heroHurt", () => { this.flash = 0.12; });
    game.on("tap", () => { this.monHit = 0.12; });
    // Clic sur le monstre combattu : coup bonus (sans agrandir l'encart).
    this.tap = el("button", "minitap", this.root);
    this.tap.hidden = true;
    this.tap.title = tx("Clique pour frapper !");
    this.tap.setAttribute("aria-label", tx("Frapper le monstre"));
    this.tap.addEventListener("click", (e) => e.stopPropagation());
    this.tap.addEventListener("pointerdown", (e) => { e.stopPropagation(); e.preventDefault(); game.tapMonster(); });
    this.resize();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.cssDpr = dpr;
    const spriteDpr = Math.max(1, Math.round(dpr));
    if (spriteDpr !== this.dpr) {
      this.dpr = spriteDpr;
      this.sprites = buildSpriteSet(spriteDpr);
      this.stage.replaceChildren();
      this.hero = null; this.heroCls = null;
      this.heroBar = new Bar(this.stage, "#6fd17f");
      this.heroBar.el.style.transform = `translate3d(${HERO_X + 3}px,4px,0)`;
      this.monActor = null; this.monRef = null;
    }
    sizeCanvas(this.base, SCENE_W, MINI_H, dpr);
    this.sceneKey = "";
  }

  setActive() { this.lastDraw = 0; }

  draw(now) {
    const dt = this.lastDraw ? Math.min(0.25, (now - this.lastDraw) / 1000) : 0;
    this.lastDraw = now;
    this.lunge = Math.max(0, this.lunge - dt); this.flash = Math.max(0, this.flash - dt); this.monHit = Math.max(0, this.monHit - dt);
    const game = this.game, S = game.S, R = game.R;

    const key = S.zone + ":" + this.cssDpr;
    if (key !== this.sceneKey) {
      this.sceneKey = key;
      drawBackdrop(this.base.ctx, SCENE_W, MINI_H, GROUND, game.zoneDef(), S.zone);
      mark("backdrop");
    }

    // Monstre en cours (ou cadavre qui s'efface)
    const m = R.mon || (R.corpse && R.corpse.mon);
    if (m !== this.monRef) {
      if (this.monActor) { this.monActor.remove(); this.monActor.bar.el.remove(); }
      this.monActor = null; this.monRef = m;
      if (m) {
        const set = this.sprites.monsters[m.type];
        const a = new Actor(this.stage, set.normal); // le boss garde la taille normale ici
        a.fly = set.fly;
        if (m.boss) a.addCrown();
        if (m.elite) a.el.classList.add("elite");
        a.bar = new Bar(this.stage, "#ff6b5a"); // à la même hauteur que celle du héros
        a.barX = null;
        this.monActor = a;
      }
    }
    if (this.monActor) {
      const a = this.monActor, alive = m === R.mon;
      a.show(Math.floor(R.time * 4) % 2);
      let y = GROUND - a.h + P;
      if (a.fly) y -= 12 + (alive ? Math.sin(R.time * 5) * 2 : 0);
      const dist = alive ? m.dist : 0;
      a.move(HERO_X + CONTACT + dist * 0.55 + (this.monHit > 0 ? 3 : 0), y);
      a.alpha(alive ? Math.min(1, m.age / 0.4) : Math.max(0, R.corpse.t / 0.45));
      if (a.bar.el.style.opacity !== String(a.alphaV)) a.bar.el.style.opacity = a.alphaV;
      a.bar.visible(alive);
      const tapOn = alive && R.mode === "fight";
      if (this.tap.hidden === tapOn) { this.tap.hidden = !tapOn; mark("tap"); }
      if (tapOn && this.tapX !== a.x) { this.tapX = a.x; this.tap.style.left = (a.x - 8) + "px"; this.tap.style.width = (a.w + 16) + "px"; }
      if (alive) {
        a.bar.set(m.hp / m.max);
        const bx = a.x + Math.round(a.w / 2 - 19);
        if (bx !== a.barX) { a.barX = bx; a.bar.el.style.transform = `translate3d(${bx}px,4px,0)`; }
      }
    }

    // Héros (sur place : c'est le monstre qui arrive). Sprite selon la classe.
    const vis = heroVisual(S), heroKey = S.cls + "|" + visualKey(vis);
    if (this.heroCls !== heroKey || !this.hero) {
      if (this.hero) this.hero.remove();
      const h = buildHeroSprites(S.cls, vis, this.dpr, 2); // plus petit : l'encart ne fait que 64 px
      this.hero = new Actor(this.stage, [h.walk1, h.walk2, h.attack]);
      this.heroCls = heroKey;
      this.hero.el.classList.toggle("legend", vis.aura);
    }
    const walkF = Math.floor(R.time * 6) % 2;
    let frame = 0, bob = 0;
    if (R.mode === "walk") { frame = walkF; bob = walkF ? -P : 0; }
    if (R.mode === "fight" && this.lunge > 0) frame = 2;
    this.hero.show(frame);
    const fr = this.hero.frames[frame];
    this.hero.move(HERO_X + (this.lunge > 0 ? 6 : 0) + (this.flash > 0 ? -3 : 0), GROUND - fr.ch + P + bob);
    this.hero.alpha(R.mode === "dead" ? 0.35 : 1);
    this.heroBar.set(R.hp / game.stats().hp);

    // Étoile filante : un bouton dans l'encart tant qu'elle passe
    const star = !!R.star;
    if (star !== !!this.starBtn) {
      if (star) {
        this.starBtn = el("button", "ministar", this.root);
        this.starBtn.title = tx("Attrape l’étoile filante !");
        this.starBtn.innerHTML = "<i></i>";
        this.starBtn.addEventListener("click", (e) => { e.stopPropagation(); game.catchStar(); });
      } else { this.starBtn.remove(); this.starBtn = null; }
      mark("star");
    }

    // Barre d'expérience (largeur arrondie au pour cent)
    const xw = Math.max(0, Math.min(100, Math.floor((100 * S.xp) / xpNeed(S.lvl))));
    if (xw !== this.xpW) { this.xpW = xw; this.xp.style.width = xw + "%"; mark("hud"); }

    // Infos (texte DOM, mis à jour seulement s'il change)
    const info = S.lvl + "|" + fmt(S.gold) + "|" + S.zone + "|" + S.kills;
    if (info !== this.infoKey) {
      this.infoKey = info; mark("hud");
      this.lvl.textContent = tx("Niv. ") + S.lvl;
      this.gold.textContent = fmtShort(S.gold);
      this.zone.textContent = tx("Zone ") + S.zone + " · " + Math.min(S.kills, 10) + "/10";
    }
  }
}

