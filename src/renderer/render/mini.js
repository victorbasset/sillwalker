// Mode mini : petit encart près de l'horloge. Le héros à gauche, le monstre
// qui approche puis se bat, et à droite niveau / or / zone.
import { TAB_GATES, tabOpen } from "../game/tabs.js";
import { CHRONICLES } from "../game/story.js";
import { t as tx, fsp, colon, csep } from "../i18n/index.js";
import { itemName } from "../i18n/data.js";
import { todoLabel } from "../ui/todo.js";
import { SETS } from "../game/sets.js";
import { EVENTS } from "../game/events.js";
import { PIXEL as P } from "./art.js";
import { majorBoss, ECHO_OUTLINE } from "../game/relics.js";
import { buildSpriteSet, buildHeroSprites, outlinedFrames, glowFrames } from "./sprites.js";
import { heroVisual, visualKey } from "./equipvis.js";
import { fmt, fmtShort, uS, durText } from "../game/format.js";
import { xpNeed } from "../game/rules.js";
import { nextUnlock, unlockAvailable, recordZone } from "../game/unlocks.js";
import { SPELL_INDEX } from "../game/spells.js";
import { spellIconURL, relicIconURL } from "./shopart.js";
import { mark, el, makeCanvas, sizeCanvas, drawBackdrop, Actor, Bar } from "./dom.js";
import { agreeDefeated } from "../game/bosses.js"; // (it. 966) accord du « enfin vaincu »

export const MINI_H = 64;
const SCENE_W = 212, GROUND = 58, HERO_X = 8, CONTACT = 44;

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
    this.hintDot = el("div", "minihint", this.info); // un conseil attend : un clic agrandit l'encart et l'affiche
    this.hintDot.textContent = "💡";
    this.hintDot.hidden = true;
    this.xp = el("i", "", el("div", "mini-xp", this.info)); // barre d'expérience fine
    this.goalWrap = el("div", "mini-goal", this.info); // progression vers le prochain déblocage
    this.goal = el("i", "", this.goalWrap);
    this.xpW = -1;
    this.monActor = null; this.monRef = null;
    game.on("heroAttack", () => { this.lunge = 0.15; this.monHit = 0.12; });
    game.on("heroHurt", () => { this.flash = 0.12; });
    // Sort (demande D) : son icône apparaît brièvement au-dessus du héros (effet léger, le mode mini est petit).
    game.on("spell", ({ id }) => {
      const sp = SPELL_INDEX[id]; if (!sp || !this.stage || !this.stage.isConnected) return;
      const im = el("img", "minispell", this.stage); im.src = spellIconURL(sp.tpl, sp.color, 2, sp.fx?.[0]);
      im.style.transform = `translate3d(${HERO_X + 22}px,14px,0)`;
      setTimeout(() => im.remove(), 700);
    });
    game.on("tap", () => { this.monHit = 0.12; });
    // Moments marquants, sobres : un liseré doré et un mot sur la scène pendant quelques secondes, une seule fois.
    this.moment = el("div", "minimoment", this.scene);
    this.moment.hidden = true;
    game.on("loot", ({ item }) => { if (item && item.r >= 4) this.showMoment("★ " + tx("Légendaire") + fsp() + "!", itemName(item)); });
    game.on("setBonus", ({ id, n }) => { if (SETS[id]) this.showMoment("◆ " + tx("{0} : bonus {1} pièces !", { 0: SETS[id].name, 1: n })); });
    game.on("bossNemesis", ({ name, fem, gender }) => this.showMoment(agreeDefeated(tx(fem ? "{0} enfin vaincue !" : "{0} enfin vaincu !", { 0: name }), gender)));
    game.on("event", ({ id }) => { const ev = EVENTS[id]; if (ev) this.showMoment(ev.name + fsp() + "!", ev.text); });
    game.on("starbreaker", ({ first }) => { if (first) this.showMoment("✦ " + tx("Le Briseur d’Étoiles est vaincu")); });
    game.on("chronicle", ({ ids }) => { const c = CHRONICLES.find((x) => x.id === ids[0]); if (c) this.showMoment("📜 " + tx(c.title)); });
    // Onglet débloqué : la bulle de la bande n'est pas visible en mode mini, l'annonce passe par la scène.
    game.on("tabOpen", ({ ids }) => this.showMoment("✦ " + tx("Nouvel onglet : {0} !", { 0: ids.map((id) => tx(TAB_GATES[id]?.label || id)).join(csep()) })));
    game.on("zoneUp", ({ zone, record }) => { if (record) this.showMoment(zone % 50 === 0 ? "✦ " + tx("Cap franchi : zone {0} !", { 0: zone }) : tx("Nouveau record : zone {0} !", { 0: zone })); });
    game.on("ascend", ({ count, gain } = {}) => this.showMoment("✦ " + tx("Ascension n° {0} ! +{1} éclats d’étoile", { 0: count, 1: gain })));
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
      this.hero = null; this.heroCls = null; this.partner = null; this.partnerCls = undefined; this.heroOff = 0;
      this.heroBar = new Bar(this.stage, "#6fd17f");
      this.heroBar.el.style.transform = `translate3d(${HERO_X + 3}px,4px,0)`;
      this.monActor = null; this.monRef = null;
    }
    sizeCanvas(this.base, SCENE_W, MINI_H, dpr);
    this.sceneKey = "";
  }

  /** Indique qu'un conseil attend (affiché en grand une fois l'encart agrandi). */
  setHint(text) {
    const on = !!text;
    if (this.hintDot.hidden === on) { this.hintDot.hidden = !on; mark("hud"); }
    if (on) this.hintDot.title = tx("Un conseil t’attend : clique pour agrandir.") + "\n" + text;
  }

  /** Moment marquant : texte sur la scène et liseré doré (4 s), sans boucle ni clignotement. */
  showMoment(text, title) {
    clearTimeout(this.momentTimer);
    this.moment.textContent = text;
    this.moment.title = title || "";
    this.moment.hidden = false;
    this.root.classList.remove("moment"); void this.root.offsetWidth; this.root.classList.add("moment");
    mark("moment");
    this.momentTimer = setTimeout(() => { this.moment.hidden = true; this.root.classList.remove("moment"); mark("moment"); }, 4000);
  }

  setActive() { this.lastDraw = 0; }

  draw(now) {
    const dt = this.lastDraw ? Math.min(0.25, (now - this.lastDraw) / 1000) : 0;
    this.lastDraw = now;
    this.lunge = Math.max(0, this.lunge - dt); this.flash = Math.max(0, this.flash - dt); this.monHit = Math.max(0, this.monHit - dt);
    const game = this.game, S = game.S, R = game.R;

    // (it. 918) ciel des événements, comme sur la bande (it. 916-917) : Lune de sang rouge, Nuée d'étoiles constellée
    const blood = (R.events.bloodmoon || 0) > 0, starry = (R.events.starfall || 0) > 0;
    const key = S.zone + ":" + this.cssDpr + ":" + blood + ":" + starry;
    if (key !== this.sceneKey) {
      this.sceneKey = key;
      const ctx = this.base.ctx;
      drawBackdrop(ctx, SCENE_W, MINI_H, GROUND, game.zoneDef(), S.zone);
      if (blood) {
        ctx.fillStyle = "rgba(170, 20, 40, 0.28)"; ctx.fillRect(0, 0, SCENE_W, GROUND);
        const cx = Math.round(SCENE_W * 0.7 / P) * P, cy = 3 * P;
        for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) if (x * x + y * y <= 5) { ctx.fillStyle = x + y < -1 ? "#ff8a8a" : "#d8303e"; ctx.fillRect(cx + x * P, cy + y * P, P, P); }
      }
      if (starry) {
        ctx.fillStyle = "rgba(11, 16, 48, 0.3)"; ctx.fillRect(0, 0, SCENE_W, GROUND);
        let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
        ctx.fillStyle = "#e8ecff";
        for (let i = 0; i < 14; i++) ctx.fillRect(Math.floor(rnd() * SCENE_W), 2 + Math.floor(rnd() * (GROUND * 0.55)), 1, 1);
      }
      mark("backdrop");
    }

    // Monstre en cours (ou cadavre qui s'efface)
    const m = R.mon || (R.corpse && R.corpse.mon);
    if (m !== this.monRef) {
      if (this.monActor) { this.monActor.remove(); this.monActor.bar.el.remove(); }
      this.monActor = null; this.monRef = m;
      if (m) {
        const set = m.final ? this.sprites.starbreaker : this.sprites.monsters[m.type]; // final : le Briseur d'Étoiles
        // le boss garde la taille normale ici ; élite / champion : contour dessiné dans l'image (it. 595)
        // (it. 702) écho d'un lieutenant : contour spectral, comme sur la bande
        const echo = m.boss && majorBoss(this.game.S.zone)?.echo;
        const a = new Actor(this.stage, m.elite ? outlinedFrames(set.normal, m.champion ? "#c08cff" : "#ffd34d", this.dpr)
          : echo ? outlinedFrames(set.normal, ECHO_OUTLINE, this.dpr) : set.normal);
        a.fly = set.fly;
        if (m.boss && !m.final) a.addCrown();
        if (m.final) a.el.classList.add("final");
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
    const crown = !!(S.relics && S.relics.crown); // Couronne d'étoiles (relique) : aussi sur le héros du mode mini
    const vis = heroVisual(S), heroKey = S.cls + "|" + visualKey(vis) + (crown ? "|crown" : "");
    if (this.heroCls !== heroKey || !this.hero) {
      if (this.hero) this.hero.remove();
      const h = buildHeroSprites(S.cls, vis, this.dpr, 2); // plus petit : l'encart ne fait que 64 px
      this.hero = new Actor(this.stage, [h.walk1, h.walk2, h.attack]);
      this.heroCls = heroKey;
      // halo des objets légendaires dessiné dans l'image (it. 598), comme sur la bande
      if (vis.aura) this.hero.reframe(glowFrames(this.hero.base, "#ffc23d", this.dpr));
      if (crown) { const im = el("img", "relic-crown", this.hero.el); im.src = relicIconURL("crown", 1); im.alt = ""; im.style.left = Math.round(this.hero.w / 2 - 4) + "px"; im.style.width = "9px"; im.style.top = "0px"; }
    }
    const walkF = Math.floor(R.time * 6) % 2;
    let frame = 0, bob = 0;
    if (R.mode === "walk") { frame = walkF; bob = walkF ? -P : 0; }
    if (R.mode === "fight" && this.lunge > 0) frame = 2;
    // Compagnon du duo : à la place du héros au bord de l'encart, le héros avance d'un pas (même petite échelle).
    const pcls = S.partner || null;
    if (pcls !== this.partnerCls) {
      if (this.partner) this.partner.remove();
      this.partner = null; this.partnerCls = pcls;
      if (pcls) { const ps = buildHeroSprites(pcls, {}, this.dpr, 2); this.partner = new Actor(this.stage, [ps.walk1, ps.walk2, ps.attack]); }
    }
    const off = this.partner ? 14 : 0;
    if (this.partner) {
      const pf = R.mode === "walk" ? 1 - walkF : 0, pfr = this.partner.frames[pf];
      this.partner.show(pf);
      this.partner.move(HERO_X - 4, GROUND - pfr.ch + P + (R.mode === "walk" && !walkF ? -P : 0));
      this.partner.alpha(R.mode === "dead" ? 0.35 : 1);
    }
    if (off !== this.heroOff) { this.heroOff = off; this.heroBar.el.style.transform = `translate3d(${HERO_X + 3 + off}px,4px,0)`; }
    this.hero.show(frame);
    const fr = this.hero.frames[frame];
    this.hero.move(HERO_X + off + (this.lunge > 0 ? 6 : 0) + (this.flash > 0 ? -3 : 0), GROUND - fr.ch + P + bob);
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
    // (it. 895) événement rare en cours : son nom et ses secondes à la place de la zone, comme sur la bande (avant, le
    // mode mini ne l'annonçait qu'à son début)
    const ev = Object.entries(R.events || {}).find(([id, t]) => t > 0 && EVENTS[id]);
    const info = S.lvl + "|" + fmt(S.gold) + "|" + S.zone + "|" + S.kills + "|" + (ev ? ev[0] + Math.ceil(ev[1]) : "");
    if (info !== this.infoKey) {
      this.infoKey = info; mark("hud");
      this.lvl.textContent = tx("Niv. ") + S.lvl;
      this.gold.textContent = fmtShort(S.gold);
      this.zone.textContent = ev ? `${EVENTS[ev[0]].name} ${uS(Math.ceil(ev[1]))}` : tx("Zone ") + S.zone + " · " + Math.min(S.kills, 10) + "/10";
      this.zone.style.color = ev ? EVENTS[ev[0]].color : "";
      const u = tabOpen(S, "shop") ? nextUnlock(S) : null, rec = recordZone(S), tip = []; // pas de déblocage avant la boutique
      // Bulle d'aide sur toute la zone d'infos (la barre d'objectif ne fait que 2 px) : record et prochain déblocage.
      if (ev) tip.push(EVENTS[ev[0]].name + colon() + EVENTS[ev[0]].text, tx("Zone ") + S.zone + " · " + Math.min(S.kills, 10) + "/10");
      if (S.zone < rec) tip.push(tx("Meilleure zone (toutes courses)") + colon() + rec);
      this.goalWrap.hidden = false;
      if (!u) { // tout est débloqué : la barre suit le record de toutes les courses
        this.goal.style.width = Math.round(Math.min(1, S.zone / rec) * 100) + "%";
        this.goalWrap.classList.toggle("ready", S.zone >= rec);
      }
      if (u) {
        const ok = unlockAvailable(S, u), k = ok ? Math.min(1, S.gold / u.price) : Math.min(1, rec / u.zone);
        this.goal.style.width = Math.round(k * 100) + "%";
        this.goalWrap.classList.toggle("ready", ok && S.gold >= u.price);
        // (it. 930) temps estimé au rythme actuel, comme sur la carte du héros (it. 928)
        const eta = ok && S.gold < u.price ? game.goldEta(u.price - S.gold) : null, etaTxt = eta != null && eta < 48 * 3600 ? " · " + tx("≈ {0}", { 0: durText(Math.max(60, eta)) }) : "";
        tip.push(tx("Prochain déblocage") + colon() + u.name + " · " + (ok ? `${fmt(S.gold)} / ${tx("{0} or", { 0: fmt(u.price) })}${etaTxt}` : tx("Zone record {0}", { 0: u.zone })));
      }
      // Actions qui attendent le joueur (quêtes, sac, déblocage…) : un point doré près du niveau, détail au survol.
      const todo = game.todoNow();
      if (todo.length) tip.push(tx("À faire maintenant") + colon().trimEnd() + "\n  • " + todo.map(todoLabel).join("\n  • "));
      this.info.classList.toggle("todo", todo.length > 0);
      this.info.classList.toggle("stuck", !!this.game.stuckInfo()); // héros bloqué : liseré rouge (demande 22)
      tip.push(tx("Cliquer pour agrandir"));
      this.info.title = tip.join("\n");
    }
  }
}

