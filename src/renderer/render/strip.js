// Bande de jeu : toute la largeur de l'écran est la carte de la zone.
// Les 10 monstres attendent à intervalles réguliers, le boss tout à droite ;
// le héros avance d'un combat à l'autre puis repart de la gauche à la zone
// suivante. Le rythme de jeu ne dépend pas de la largeur : seule la distance
// parcourue à l'écran change.
//
// Le décor est fixe (une seule toile, redessinée au changement de zone) et
// les personnages sont des éléments DOM déplacés par transform : voir dom.js.
// Ce module lit l'état de la simulation sans jamais le modifier.
import { CLASSES, CLASS_UNLOCK_ZONE, isRanged } from "../game/classes.js";
import { EVENTS } from "../game/events.js";
import { t as tx, fsp } from "../i18n/index.js";
import { attackTier, ATTACK_TIERS, CLASS_FX } from "../game/classes.js";
import { completedSectors, skillPointsTotal, SECTORS } from "../game/skilltree.js";
import { PIXEL as P, OUTLINE } from "./art.js";
import { buildSpriteSet } from "./sprites.js";
import { RARITIES, KILLS_PER_ZONE, ELITE_AFFIXES } from "../game/data.js";
import { classDef } from "../game/classes.js";
import { bossName, bossWear } from "../game/bosses.js";
import { isFinalZone, storyWon, chroniclesUnlocked, CHRONICLES } from "../game/story.js";
import { heroVisual, visualKey } from "./equipvis.js";
import { buildHeroSprites } from "./sprites.js";
import { Juice } from "./juice.js";
import { fmt } from "../game/format.js";
import { recordZone } from "../game/unlocks.js";
import { q, FONT, mark, el, makeCanvas, sizeCanvas, drawText, drawPill, drawCoin, drawBackdrop, Actor, Bar } from "./dom.js";

// Répliques du héros, par circonstance.
const SPEECH = {
  idle: [tx("Encore un petit monstre…"), tx("Belle journée pour une balade."), tx("Il me faudrait un plus grand sac."),
    tx("Je sens de l’or par ici."), tx("Ces bottes me font mal aux pieds."), tx("Hmm… une odeur de dragon."),
    tx("Un jour, j’écrirai mes mémoires."), tx("Tu regardes ? Je fais de mon mieux !")],
  night: [tx("Il fait sombre…"), tx("Les étoiles sont belles ce soir."), tx("Je ne dors jamais, moi.")],
  legendary: [tx("Ça brille !"), tx("Légendaire ! Enfin !"), tx("Celui-là, je le garde.")],
  ko: [tx("Aïe… je reviens."), tx("Juste une égratignure."), tx("Je l’avais presque !")],
  record: [tx("Jamais allé aussi loin !"), tx("Terre inconnue !")],
  level: [tx("Je me sens plus fort !"), tx("Encore un niveau !")],
  event: [tx("Tu as vu ça ?"), tx("C’est le moment !"), tx("Profitons-en !")],
  bag: [tx("Mon sac déborde !"), tx("Plus de place dans le sac…"), tx("Il faudrait vider le sac !")],
  back: [tx("Te revoilà !"), tx("Tu m’as manqué !"), tx("J’ai bien avancé, tu as vu ?")],
  nemesis: [tx("Enfin !"), tx("Cette fois, c’est la bonne !"), tx("Je savais que j’y arriverais.")],
};

export const STRIP_H = 120;
const GROUND = 96, CONTACT = 44;
const LEFT = 24;            // position de départ du héros
const RIGHT_MARGIN = 300;   // le boss (2× plus large) s'arrête avant l'or, le niveau et les boutons
const FIGHTS = KILLS_PER_ZONE + 1;
const HUD_L_W = 520, HUD_R_W = 260, HUD_H = 24;
const CENTER_HUD_W = 2400; // au-delà : informations au milieu de la bande (écrans ultra-larges)

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
      const S = this.game.S, tier = attackTier(S), color = CLASS_FX[S.cls] || "#ffffff";
      const proj = this.game.classDef().projectile, py = mon.boss ? 40 : 66;
      if (proj) {
        this.projectile(proj, this.heroX + 30, this.monX() + 6, py, tier, color);
        if (tier >= 3 && !extra) { this.projectile(proj, this.heroX + 30, this.monX() + 6, py - 12, tier, color); this.projectile(proj, this.heroX + 30, this.monX() + 6, py + 9, tier, color); }
      }
      // Impact : étincelles à partir du palier 3, onde de choc au palier 5.
      if (this.active && this.juice.full && tier >= 2) {
        this.juice.sparkles(this.monX() + 12, py - 4, color, 3 + tier * 2);
        if (tier >= 4 && (crit || iai)) { this.juice.flash(color, 0.12); this.shake(0.12); }
      }
      const label = (iai ? tx("Iai ! ") : first ? tx("Ouverture ") : crit ? tx("Crit ") : "") + fmt(dmg);
      this.float(this.monX() + 14 + (extra ? 12 : 0), (mon.boss ? 20 : 46) - (extra ? 10 : 0), label, crit || first ? "#ffe27a" : "#ffffff", crit || first, true);
    });
    g.on("tap", ({ dmg }) => {
      this.monHit = 0.1;
      this.float(this.monX() + 4 + Math.round(Math.random() * 20), 30 + Math.round(Math.random() * 16), fmt(dmg), "#9fd8ff", false, true);
      if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 12, this.ground - 30, "#9fd8ff", 4);
    });
    g.on("loot", ({ item }) => { if (item.r >= 4) this.say(SPEECH.legendary, true); });
    // Boss : la bannière « … approche ! » l'annonce déjà, et une bulle cacherait son nom (voir say()).
    g.on("heroDown", () => this.say(SPEECH.ko, true));
    g.on("zoneUp", ({ record }) => { if (record) this.say(SPEECH.record); });
    g.on("levelUp", () => this.say(SPEECH.level));
    g.on("event", () => this.say(SPEECH.event));
    g.on("bagFull", () => this.say(SPEECH.bag)); // ordinaire : au plus une réplique toutes les 45 s // ordinaire : pas de bulle sur le nom d'un boss
    g.on("bossNemesis", () => this.say(SPEECH.nemesis, true));
    g.on("bossDodge", () => this.float(this.monX() + 14, 40, tx("Raté !"), "#c8c8d8"));
    g.on("dodge", () => this.float(this.heroX + 16, 44, tx("Esquive"), "#9fd8ff"));
    g.on("riposte", ({ dmg }) => this.float(this.monX() + 14, 34, tx("Riposte ") + Math.round(dmg), "#ffb07a"));
    g.on("potion", () => this.float(this.heroX + 16, 36, tx("Potion !"), "#ff8ad8", true));
    g.on("secondWind", () => this.float(this.heroX + 10, 36, tx("Second souffle !"), "#ffe27a", true));
    g.on("classChange", () => { this.heroCls = null; this.minionKey = null; });
    g.on("minion", () => { this.minionLunge = 0.2; });
    // Compagnon : coup (pose d'attaque) et, à distance, un projectile de sa classe vers le monstre.
    g.on("partnerHit", () => {
      this.partnerAtk = 0.25;
      const pd = CLASSES[this.partnerCls];
      if (pd && pd.projectile && this.partner && g.R.mon) this.projectile(pd.projectile, (this.partnerX || this.heroX) + 24, this.monX() + 6, g.R.mon.boss ? 46 : 70, 0, "#fff");
    });
    g.on("bossSkill", ({ id }) => {
      const label = { enrage: [tx("ENRAGÉ !"), "#ff4a4a"], shell: [tx("Carapace !"), "#9fd8ff"], mirror: [tx("Miroir !"), "#e0d8ff"], frost: [tx("Gelé !"), "#bfe8ff"], smash: ["", ""], fury: [tx("Fureur !"), "#ff9a4a"] }[id];
      if (id === "frost") { this.float(this.heroX + 10, 30, tx("Gelé !"), "#bfe8ff", true); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 18, this.ground - 30, "#bfe8ff", 8); return; }
      if (label && label[0]) this.float(this.monX() + 20, 14, label[0], label[1], true);
    });
    g.on("telegraph", () => this.float(this.monX() + 20, 6, "!", "#ffe27a", true));
    g.on("smash", ({ dmg }) => { this.shake(0.3); this.flash = 0.25; this.float(this.heroX + 16, 36, "-" + Math.round(dmg) + fsp() + "!", "#ff4a4a", true); });
    g.on("bossShieldHit", () => { this.monHit = 0.06; });
    g.on("mirrorHit", ({ dmg }) => { this.flash = Math.max(this.flash, 0.08); this.float(this.heroX + 16, 44, "-" + Math.round(dmg), "#e0d8ff", false, true); });
    g.on("flee", ({ mon }) => {
      this.float(this.monX() + 14, 40, tx("Il s’enfuit !"), "#ffd34d", true);
      if (this.active) this.makeCorpse(mon, this.monX());
    });
    g.on("egg", () => this.float(this.heroX + 16, 30, tx("Un œuf !"), "#ffe27a", true));
    g.on("petLevel", ({ pet }) => this.float(this.heroX - 10, 50, pet.name + tx(" monte de niveau"), "#9fe0a8"));
    g.on("questDone", () => this.float(this.heroX + 16, 30, tx("Quête accomplie !"), "#9fd8ff", true));
    g.on("loot", ({ item }) => { if (item.r >= 4) this.shake(0.3); });
    g.on("chest", () => this.shake(0.2));
    g.on("heroHurt", ({ dmg }) => { this.flash = 0.12; this.float(this.heroX + 16, 44, "-" + Math.round(dmg), "#ff7a6b", false, true); });
    g.on("kill", ({ mon, gold }) => {
      if (mon.boss || mon.champion) this.shake(0.35);
      this.float(this.monX() + 10, 50, "+" + tx("{0} or", { 0: fmt(gold) }), "#ffd34d");
      if (this.active) this.makeCorpse(mon, this.monX());
    });

    g.on("heroDown", () => this.float(this.heroX + 6, 40, "K.O.", "#ff7a6b", true));
  }

  /* ---------- Répliques du héros ---------- */
  /** Le héros dit une réplique tirée de la liste (au plus une toutes les 45 s, sauf si urgent). */
  /** Retour du joueur après une absence : le héros l'accueille. */
  welcomeBack() { this.say(SPEECH.back); } // réplique ordinaire : jamais sur le nom d'un boss

  say(list, urgent = false) {
    if (!this.active || this.game.S.settings.fullEffects === false || !list) return;
    const now = this.game.R.time;
    if (!urgent && now - (this.saidAt ?? -1e9) < 45) return;
    const G = this.game; // pas de bulle sur le nom du boss (présent, ou le prochain monstre)
    if (!urgent && ((G.R.mon && G.R.mon.boss) || G.S.kills >= KILLS_PER_ZONE)) return;
    if (urgent && now - (this.saidAt ?? -1e9) < 6) return;
    this.saidAt = now;
    this.bubble.textContent = list[Math.floor(Math.random() * list.length)];
    this.bubble.hidden = false;
    this.bubbleT = 3.5;
    this.bubbleX = null;
    this.bubbleW = this.bubble.offsetWidth || 0; // mesurée une fois par réplique
    mark("speech");
  }
  updateSpeech(dt, x) {
    if (this.bubbleT > 0) {
      this.bubbleT -= dt;
      if (this.bubbleT <= 0) { this.bubble.hidden = true; mark("speech"); return; }
      let bx = q(x + this.hero.w / 2);
      if (this.centerHud && this.hudSpan && this.bubbleW) { // informations au milieu : la bulle passe à côté du bloc
        const [a, b] = this.hudSpan, half = this.bubbleW / 2;
        if (bx + half > a - 4 && bx - half < b + 4) bx = q(bx < (a + b) / 2 ? a - 4 - half : b + 4 + half);
      } else {
        // En début de zone, la bulle passerait sur la pastille de zone (en haut à gauche) : on la décale à sa droite.
        if (this.bubbleW && this.hudLRight && bx - this.bubbleW / 2 < this.hudLRight + 4) bx = q(this.hudLRight + 4 + this.bubbleW / 2);
        // Près du bord droit : pas sur la pastille or / niveau.
        if (this.bubbleW && this.hudRLeft && bx + this.bubbleW / 2 > this.hudRLeft - 4) bx = q(this.hudRLeft - 4 - this.bubbleW / 2);
      }
      if (bx !== this.bubbleX) { this.bubbleX = bx; this.bubble.style.transform = `translate3d(${bx}px,${GROUND - this.hero.h - 30}px,0) translateX(-50%)`; mark("speech"); }
    } else if (this.game.R.mode === "walk" && Math.random() < dt / 240) {
      const night = this.nightLevel().night >= 0.8;
      this.say(night && Math.random() < 0.4 ? SPEECH.night : SPEECH.idle);
    }
  }

  /* ---------- Effets (animés par la boucle à 30 FPS) ---------- */
  float(x, y, txt, col, big, isDamage) {
    if (!this.active) return;
    if (isDamage && this.game.S.settings.damageNumbers === false) return;
    // Face à un boss, les nombres partent plus bas : en montant, ils ne recouvrent plus son nom (en haut de la bande).
    const m = this.game.R.mon;
    if (m && m.boss && Math.abs(x - this.monX()) < 90) y = Math.max(y, 46);
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
  projectile(kind, x0, x1, y, tier = 0, color = "#fff") {
    if (!this.active) return;
    const f = el("div", "proj " + kind + " t" + tier, this.fxLayer);
    f.style.setProperty("--c", color);
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
    // Écran très large (Odyssey G9, demande 21) : zone, or, niveau et boutons regroupés au milieu, dans une languette
    // qui déplie le panneau, au lieu des deux bouts de l'écran. Écrans ordinaires : inchangés.
    this.centerHud = this.W >= CENTER_HUD_W;
    this.root.classList.toggle("hud-center", this.centerHud);
    document.body.classList.toggle("hud-center", this.centerHud); // bulles centrées elles aussi (styles.css)
    if (!this.centerHud) { this.hudL.c.style.left = "0px"; const b = this.root.querySelector(".strip-btns"); if (b) b.style.left = ""; }
    this.layerKey = ""; this.hudLKey = ""; this.hudRKey = ""; this.slotKey = null;
  }

  /** Part du ciel étoilé, selon l'histoire : le Briseur a éteint les étoiles ; chaque chronique en rallume, la
   *  victoire finale les rallume toutes (et davantage). */
  starShare() {
    const S = this.game.S;
    if (storyWon(S)) return 1.3;
    return 0.15 + 0.85 * chroniclesUnlocked(S, recordZone(S)).length / CHRONICLES.length;
  }

  /** Étoiles fixes (même tirage à chaque fois, les nouvelles s'ajoutent sans déplacer les autres), d'autant plus
   *  visibles qu'il fait nuit ; leur nombre suit l'histoire (starShare). */
  drawStars(ctx, alpha) {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647), won = storyWon(this.game.S);
    for (let i = 0; i < Math.round(this.W / 18 * this.starShare()); i++) {
      const x = Math.floor(rnd() * this.W), y = 4 + Math.floor(rnd() * 36), big = rnd() < 0.15;
      ctx.fillStyle = big ? (won ? "#ffe27a" : "#fff6c8") : "#dfe7ff";
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
    this.minion = null; this.minionKey = undefined; this.partner = null; this.partnerCls = undefined;
    this.wisps = []; this.coreKey = null;
    this.heroBar = new Bar(this.stage, "#6fd17f");
    this.slash = el("div", "slash", this.stage);
    this.bubble = el("div", "speech", this.stage);
    this.bubble.hidden = true;
    // Zone cliquable sur le monstre combattu : un clic = coup bonus.
    this.tap = el("button", "tapzone hit", this.stage);
    this.tap.hidden = true;
    this.tap.title = tx("Clique pour frapper !");
    this.tap.setAttribute("aria-label", tx("Frapper le monstre"));
    this.tap.addEventListener("pointerdown", (e) => { e.preventDefault(); this.tapAt = { x: e.offsetX, y: e.offsetY }; this.game.tapMonster(); });
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

  /** Compagnon du duo (demande 17) : sprite de sa classe ; à distance il reste derrière le héros et tire, au corps à
   *  corps il va au contact du monstre. */
  syncPartner() {
    const cls = this.game.S.partner || null;
    if (cls === this.partnerCls) return;
    if (this.partner) this.partner.remove();
    this.partner = null;
    this.partnerCls = cls;
    const set = cls && this.sprites.heroes[cls];
    if (set) this.partner = new Actor(this.stage, [set.walk1, set.walk2, set.attack], "hero partner");
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

  monsterActor(type, boss, final) {
    const set = final ? this.sprites.starbreaker : this.sprites.monsters[type];
    const a = new Actor(this.stage, boss ? set.boss : set.normal, boss ? "boss" + (final ? " final" : "") : "");
    a.fly = set.fly; a.boss = boss;
    if (boss && !final) a.addCrown(); // le Briseur porte sa propre couronne d'éclats
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
      const a = this.monsterActor(boss ? Z.boss : line[k].type, boss, boss && isFinalZone(g.S.zone)); // final : le Briseur d'Étoiles
      if (boss) {
        const tag = el("div", "affix bossname", a.el);
        const wear = bossWear(this.game.S, this.game.S.zone); // usé par les défaites du héros : on le montre
        // Boss qui retient un héros pas encore libéré : on le dit (sinon il fallait ouvrir l'onglet Classe).
        const S = this.game.S, captive = Object.keys(CLASS_UNLOCK_ZONE).find((c) => CLASS_UNLOCK_ZONE[c] === S.zone && !(S.classesUnlocked || []).includes(c));
        tag.textContent = bossName(S.zone) + (wear ? " · " + tx("−{0} % PV", { 0: Math.round(wear * 100) }) : "")
          + (captive ? " · " + tx("captif : {0}", { 0: CLASSES[captive].name }) : "");
        // Boss très grand (ou volant) : le nom ne doit pas sortir par le haut de la bande.
        const y0 = this.monY(a, 4);
        if (y0 - 40 < 2) tag.style.top = (2 - y0) + "px";
      }
      if (!boss && line[k].elite) {
        a.el.classList.add(line[k].champion ? "champion" : "elite");
        const af = ELITE_AFFIXES[line[k].affix];
        if (line[k].champion) { const tag = el("div", "affix champ", a.el); tag.textContent = tx("Champion") + (af ? " " + af.name.toLowerCase() : ""); }
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
    const a = this.monsterActor(mon.type, mon.boss, !!mon.final);
    if (mon.elite) a.el.classList.add(mon.champion ? "champion" : "elite");
    a.show(0);
    a.move(x, this.monY(a, 0));
    this.corpse = a;
  }

  shake(t) { if (this.active && this.game.S.settings.fullEffects !== false) this.shakeT = Math.max(this.shakeT, t); }

  /**
   * Cœurs des pétales de compétences : aura de la couleur du premier secteur
   * complété, et un feu follet par cœur allumé qui tourne autour du héros.
   */
  drawCores(x, R) {
    const S = this.game.S, key = S.skills.order.length + ":" + skillPointsTotal(S);
    if (key !== this.coreKey) {
      this.coreKey = key;
      const done = completedSectors(S), colors = done.map((id) => SECTORS.find((s) => s.id === id).color);
      for (const w of this.wisps || []) w.remove();
      this.wisps = colors.map((c) => { const w = el("div", "wisp", this.stage); w.style.setProperty("--c", c); return w; });
      this.hero.el.classList.toggle("cored", colors.length > 0);
      if (colors.length) this.hero.el.style.setProperty("--aura", colors[0]);
      mark("cores");
    }
    if (!this.wisps || !this.wisps.length) return;
    const cx = x + this.hero.w / 2, cy = GROUND - this.hero.h / 2 - 4, n = this.wisps.length;
    this.wisps.forEach((w, i) => {
      const a = R.time * 1.6 + (i * Math.PI * 2) / n;
      const t = `translate3d(${q(cx + Math.cos(a) * 26 - 3)}px,${q(cy + Math.sin(a) * 12 - 3)}px,0)`;
      if (w._t !== t) { w._t = t; w.style.transform = t; w.style.zIndex = Math.sin(a) > 0 ? 3 : 1; mark("wisp"); }
    });
  }

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
      // Clé du décor : heure (nuit) et étoiles rallumées par l'histoire (une chronique de plus = redessiner).
      const k = JSON.stringify(this.nightLevel()) + this.starShare().toFixed(3);
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
    // Zone de clic calée sur le monstre combattu
    const tapOn = R.mode === "fight" && !!R.mon && !!this.slots[cur] && this.slots[cur].shown;
    if (this.tap.hidden === tapOn) { this.tap.hidden = !tapOn; mark("tap"); }
    if (tapOn) {
      const a = this.slots[cur], tk = a.tx + "|" + a.w;
      if (tk !== this.tapKey) {
        this.tapKey = tk;
        const [ax, ay] = a.tx.split(",").map(Number);
        this.tap.style.cssText = `width:${a.w + 18}px;height:${a.h + 18}px;transform:translate3d(${ax - 9}px,${ay - 12}px,0)`;
      }
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
    this.syncPartner();
    if (this.partner) {
      this.partnerAtk = Math.max(0, (this.partnerAtk || 0) - dt);
      const pf = this.partner.frames[0], fighting = R.mode === "fight" && R.mon, ranged = isRanged(this.partnerCls);
      // Corps à corps : au contact du monstre, juste devant lui ; à distance : quelques pas derrière le héros.
      const px = fighting && !ranged ? this.monX() - pf.cw + 6 : x - pf.cw + 6;
      this.partner.show(this.partnerAtk > 0 ? 2 : Math.floor(R.time * (fighting ? 2 : 5) + 1) % 2);
      this.partner.move(px, GROUND - pf.ch);
      this.partner.alpha(R.mode === "dead" ? 0.35 : 1);
      this.partnerX = px;
    }
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
    const frozen = R.mode === "fight" && R.frozen > 0;
    if (this.hero.el.classList.contains("frozen") !== frozen) { this.hero.el.classList.toggle("frozen", frozen); mark("frost"); }
    if (this.pet) {
      const pf = this.pet.frames[0], moving = R.mode === "walk";
      this.pet.show(Math.floor(R.time * (moving ? 5 : 2)) % 2);
      const py = this.pet.fly ? GROUND - pf.ch - 34 + Math.round(Math.sin(R.time * 3) * 3) : GROUND - pf.ch + 2;
      // Compagnon du duo derrière le héros (à distance, ou en marche) : le familier passe derrière lui, pas devant son visage.
      const back = this.partner && this.partnerX < x ? this.partnerX : x;
      this.pet.move(back - pf.cw - 4, py);
      this.pet.alpha(R.mode === "dead" ? 0.35 : 1);
    }
    this.drawCores(x, R);
    const slashOn = melee && R.mode === "fight" && this.lunge > 0.07 && R.mon;
    if (slashOn) {
      const sx = q(this.monX() + 4);
      if (sx !== this.slashX || this.slashScaleK !== this.slashTier) {
        this.slashX = sx; this.slashScaleK = this.slashTier;
        const k = [1, 1.35, 1.7, 2.1, 2.7][attackTier(S)] || 1;
        this.slash.style.transform = `translate3d(${sx}px,${q(GROUND - 36)}px,0) scale(${k})`;
      }
    }
    if (this.slash.classList.contains("on") !== !!slashOn) { this.slash.classList.toggle("on", !!slashOn); mark("slash"); }
    // Style de la lame selon le palier d'attaque (taille, couleur, lame croisée, lueur).
    const tierKey = S.cls + ":" + attackTier(S);
    if (tierKey !== this.slashTier) {
      const t = attackTier(S);
      if (this.slashTier && +this.slashTier.split(":")[1] < t && this.slashTier.split(":")[0] === S.cls)
        this.juice.banner(`${tx("Style de combat : {0} !", { 0: ATTACK_TIERS[t].name })}`, CLASS_FX[S.cls] || "#fff", this.heroX + 80, true);
      this.slashTier = tierKey;
      this.slash.className = "slash t" + t + (slashOn ? " on" : "");
      this.slash.style.setProperty("--c", CLASS_FX[S.cls] || "#fff");
    }

    this.updateSpeech(dt, x);
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
    const S = this.game.S, label = tx("Zone ") + S.zone + "  " + this.game.zoneName();
    // Record à battre (toutes courses confondues), tant que la course actuelle est en dessous.
    // Événement en cours (nom et secondes restantes, dans sa couleur), sinon le record à battre.
    const ev = Object.entries(this.game.R.events || {}).find(([id, t]) => t > 0 && EVENTS[id]);
    // Héros bloqué (demande 22) : « ⚠ bloqué » en rouge, visible d'un coup d'œil sans ouvrir le panneau.
    const stuck = this.game.stuckInfo();
    const rec = recordZone(S), recTxt = ev ? `${EVENTS[ev[0]].name} ${Math.ceil(ev[1])} s` : stuck ? "⚠ " + tx("bloqué") : S.zone < rec ? tx("record {0}", { 0: rec }) : "";
    const recCol = ev ? EVENTS[ev[0]].color : stuck ? "#ff6b5a" : "#a29ec2";
    const key = label + "|" + S.kills + "|" + recTxt;
    if (key === this.hudLKey) return;
    this.hudLKey = key; mark("hud");
    const ctx = this.hudL.ctx;
    ctx.clearRect(0, 0, HUD_L_W, HUD_H);
    ctx.font = FONT;
    const lw0 = ctx.measureText(label).width, rw = recTxt ? ctx.measureText(recTxt).width + 10 : 0;
    this.hudLRight = Math.min(HUD_L_W - 2, 14 + lw0 + 6 + KILLS_PER_ZONE * 9 + 18 + rw); // bord droit de la pastille (bulle du héros)
    drawPill(ctx, 3, this.hudLRight, HUD_H);
    if (this.centerHud) { this.hudLX = Math.round(this.W / 2 - 6 - this.hudLRight); this.hudL.c.style.left = this.hudLX + "px"; this.placeTab(); }
    drawText(ctx, label, 10, 17, "#ffffff");
    ctx.font = FONT;
    let px = 14 + ctx.measureText(label).width + 6;
    for (let i = 0; i < KILLS_PER_ZONE; i++) { ctx.fillStyle = OUTLINE; ctx.fillRect(px - 1, 8, 8, 8); ctx.fillStyle = i < S.kills ? "#ffd34d" : "#4a4560"; ctx.fillRect(px, 9, 6, 6); px += 9; }
    ctx.fillStyle = OUTLINE; ctx.fillRect(px + 1, 6, 12, 12);
    ctx.fillStyle = S.kills >= KILLS_PER_ZONE ? "#ff6b5a" : "#6b3040"; ctx.fillRect(px + 2, 7, 10, 10);
    ctx.fillStyle = OUTLINE; ctx.fillRect(px + 4, 10, 2, 2); ctx.fillRect(px + 8, 10, 2, 2);
    if (recTxt) drawText(ctx, recTxt, px + 20, 17, recCol);
  }

  /** Mode centré : boutons après la pastille or / niveau ; languette cliquable sur les deux pastilles. */
  placeTab() {
    const L = (this.hudLX || 0) + 3, Rr = this.hudRRight || this.W / 2;
    const btns = this.root.querySelector(".strip-btns"), tab = this.root.querySelector("#hud-tab");
    if (btns) btns.style.left = (Rr + 6) + "px";
    if (tab) { tab.style.left = L + "px"; tab.style.width = Math.max(0, Rr - L) + "px"; }
    this.hudSpan = [L, Rr + 6 + (btns ? btns.offsetWidth : 60)];
    if (this.onTab) this.onTab();
  }

  drawHudRight() {
    const S = this.game.S, gt = fmt(S.gold).replace(/[  ]/g, " "), // espaces fines : absentes de la police pixel du canevas
      lvlTxt = tx("Niv. ") + S.lvl, key = gt + "|" + lvlTxt;
    if (key === this.hudRKey) return;
    this.hudRKey = key; mark("hud");
    const ctx = this.hudR.ctx, right = HUD_R_W - 10;
    ctx.clearRect(0, 0, HUD_R_W, HUD_H);
    ctx.font = FONT;
    const lw = ctx.measureText(lvlTxt).width;
    const pillL = Math.max(2, right - 14 - lw - ctx.measureText(gt).width - 22);
    this.hudRLeft = this.W - HUD_R_W - this.rightReserve + pillL; // bord gauche de la pastille or / niveau (bulle du héros)
    if (this.centerHud) { // pastille or / niveau juste à droite du milieu, puis les boutons
      const x = Math.round(this.W / 2 + 6 - pillL);
      this.hudR.c.style.left = x + "px";
      this.hudRRight = x + HUD_R_W - 3;
      this.hudRLeft = x + pillL;
      this.placeTab();
    }
    drawPill(ctx, pillL, HUD_R_W - 3, HUD_H);
    drawText(ctx, lvlTxt, right, 17, "#ffffff", "right");
    drawText(ctx, gt, right - 14 - lw, 17, "#ffd34d", "right");
    ctx.font = FONT;
    drawCoin(ctx, right - 14 - lw - ctx.measureText(gt).width - 14, 7);
  }
}
