// Effets qui donnent envie : pièces qui jaillissent et volent jusqu'au
// compteur d'or, butin qui saute du monstre avec un faisceau à la couleur de
// sa rareté, flash et bannière pour les légendaires, événements rares
// (rafale de vent, pluie d'or, frénésie, étoile filante à attraper).
//
// Tout est animé par la boucle à 30 FPS (aucune animation CSS, qui tournerait
// à la fréquence de l'écran) et n'existe que le temps de l'effet.
import { isFinalZone } from "../game/story.js";
import { RELICS, majorBoss, hasRelic } from "../game/relics.js";
import { relicIconURL } from "./shopart.js";
import { SETS } from "../game/sets.js";
import { itemName } from "../i18n/data.js";
import { t as tx, fsp } from "../i18n/index.js";
import { CLASSES, duoSynergy } from "../game/classes.js";
import { RARITIES, LEGENDARY } from "../game/data.js";
import { EVENTS } from "../game/events.js";
import { BOSS_MECHANICS, agreeDefeated } from "../game/bosses.js";
import { UNLOCK_INDEX } from "../game/unlocks.js";
import { fmt, durText } from "../game/format.js";
import { itemIconURL, classPortraitURL, npcURL } from "./sprites.js";
import { npcFor } from "../game/npcs.js";
import { TAB_GATES } from "../game/tabs.js";
import { q, el, mark, makeCanvas, sizeCanvas } from "./dom.js";

const MAX_PARTS = 90;
const MAX_SPARKS = 24;

// Météo de chaque zone : quelques particules qui flottent (désactivées avec
// « Effets complets »). vx / vy en px/s, sway : balancement, rate : par seconde et par 1000 px.
export const WEATHER = {
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

/** (it. 1079) Lieu d'un PNJ (game/npcs.js), dessiné sur le canevas d'une cinématique ; x : bord gauche de la porte,
 *  gy : le sol. frog : une maisonnette sur un grand nénuphar, au bord de l'eau. */
function npcPlace(ctx, art, x, gy, t) {
  if (art === "frog") {
    ctx.fillStyle = "#2f5f8a"; ctx.fillRect(x - 70, gy - 6, 180, 6);                    // l'eau
    ctx.fillStyle = "#4f8fbf"; for (let i = 0; i < 6; i++) ctx.fillRect(x - 60 + ((i * 31 + Math.floor(t * 8)) % 170), gy - 5, 8, 1);
    ctx.fillStyle = "#3e7a30"; ctx.fillRect(x - 46, gy - 12, 132, 6);                     // le nénuphar
    ctx.fillStyle = "#5fae4a"; ctx.fillRect(x - 40, gy - 14, 120, 4);
    ctx.fillStyle = "#e8c98a"; ctx.fillRect(x - 14, gy - 60, 70, 48);                     // la maisonnette
    ctx.fillStyle = "#8a5ad0"; for (let r = 0; r < 14; r++) ctx.fillRect(x - 20 + r, gy - 74 + r, 82 - 2 * r, 1); // toit violet
    ctx.fillStyle = "#6b4226"; ctx.fillRect(x, gy - 42, 22, 30);                          // la porte
    ctx.fillStyle = "#ffd34d"; ctx.fillRect(x + 32, gy - 50, 12, 10);                     // fenêtre allumée
    ctx.fillStyle = "#e2552b"; ctx.fillRect(x + 66, gy - 26, 3, 14); ctx.fillRect(x + 62, gy - 30, 11, 4); // fleur
  }
  if (art === "owl") { // (it. 1086) Plume : un poteau au carrefour, le panneau des contrats couvert d'affiches
    ctx.fillStyle = "#6b4226"; ctx.fillRect(x + 8, gy - 64, 6, 64);                                   // poteau
    ctx.fillStyle = "#8a5a33"; ctx.fillRect(x + 26, gy - 70, 76, 46);                                 // panneau
    ctx.fillStyle = "#5a3a20"; ctx.fillRect(x + 26, gy - 70, 76, 3); ctx.fillRect(x + 50, gy - 24, 5, 24); ctx.fillRect(x + 80, gy - 24, 5, 24);
    const posters = ["#f4f0e8", "#ffd34d", "#f4f0e8", "#9fd8ff", "#f4f0e8"];
    posters.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x + 31 + i * 14, gy - 62 + (i % 2) * 8, 10, 14); ctx.fillStyle = "#c0392b"; ctx.fillRect(x + 35 + i * 14, gy - 63 + (i % 2) * 8, 2, 2); });
    ctx.fillStyle = "#c08a5a"; ctx.fillRect(x - 40, gy - 3, 160, 3);                                  // le carrefour
    if (t > 1 && t < 3) { ctx.fillStyle = "#f4f0e8"; const k = (t - 1) / 2; ctx.fillRect(Math.round(x + 60 - k * 50), Math.round(gy - 80 + Math.sin(k * 6) * 6), 6, 4); } // une lettre qui vole
  }
  if (art === "smith") { // (it. 1087) Bram : un atelier de serrurier, une enclume, des clés pendues, une cage ouverte
    ctx.fillStyle = "#6b6488"; ctx.fillRect(x - 16, gy - 62, 64, 62);                                   // l'atelier (pierre)
    ctx.fillStyle = "#4a3a2a"; for (let r = 0; r < 10; r++) ctx.fillRect(x - 22 + r, gy - 72 + r, 76 - 2 * r, 1); // toit
    ctx.fillStyle = "#3a2a1a"; ctx.fillRect(x, gy - 40, 22, 40);                                         // la porte
    ctx.fillStyle = "#ffd34d"; for (let i = 0; i < 3; i++) ctx.fillRect(x + 30 + i * 5, gy - 52, 2, 6);  // clés pendues
    ctx.fillStyle = "#3a3550"; ctx.fillRect(x + 60, gy - 14, 22, 6); ctx.fillRect(x + 66, gy - 8, 10, 8); // enclume
    const open = Math.min(1, Math.max(0, (t - 2.6) / 0.6));                                                // une cage qui s'ouvre
    ctx.fillStyle = "#9a96b8"; for (let i = 0; i < 4; i++) ctx.fillRect(x + 96 + i * 8, Math.round(gy - 34 - open * 20), 2, 30);
    ctx.fillRect(x + 94, gy - 4, 30, 4);
    if (t > 1 && t < 2.6 && Math.floor(t * 8) % 2) { ctx.fillStyle = "#ffe27a"; ctx.fillRect(x + 70, gy - 20, 2, 2); ctx.fillRect(x + 74, gy - 22, 2, 2); } // étincelles
  }
  if (art === "carto") { // (it. 1088) Sola : une tour de guet en bois, des cartes épinglées, une longue-vue
    ctx.fillStyle = "#7a5233"; ctx.fillRect(x - 10, gy - 58, 6, 58); ctx.fillRect(x + 36, gy - 58, 6, 58); // pieds (la bande fait 120 px)
    ctx.fillStyle = "#5a3a20"; for (let y = gy - 50; y < gy; y += 14) ctx.fillRect(x - 10, y, 52, 3);       // barreaux
    ctx.fillStyle = "#8a5a33"; ctx.fillRect(x - 16, gy - 66, 64, 10);                                       // plateforme
    ctx.fillStyle = "#e8d8a8"; for (let i = 0; i < 3; i++) ctx.fillRect(x - 12 + i * 20, gy - 84 + (i % 2) * 3, 14, 16); // cartes
    ctx.fillStyle = "#c0392b"; for (let i = 0; i < 3; i++) ctx.fillRect(x - 6 + i * 20, gy - 84 + (i % 2) * 3, 2, 2);
    const sw = Math.sin(t * 2) * 3; ctx.fillStyle = "#ffd34d"; ctx.fillRect(Math.round(x + 48 + sw), gy - 74, 16, 3); // longue-vue
    ctx.fillStyle = "#3a2a1a"; ctx.fillRect(x, gy - 34, 22, 34);                                            // porte de la cabane du bas
  }
  if (art === "natur") { // (it. 1089) Fenouil : une tente de toile, des bocaux luisants, un papillon qui s'échappe
    ctx.fillStyle = "#c8a86a"; for (let r = 0; r < 44; r++) ctx.fillRect(x + 11 - r, gy - 44 + r, 2 * r + 1, 1);                    // la tente
    ctx.fillStyle = "#8a6a3a"; for (let r = 0; r < 30; r++) ctx.fillRect(x + 11 - Math.floor(r / 2), gy - 30 + r, r + 1, 1); // l'entrée
    const jars = ["#7fd4ff", "#9fe0a8", "#c99bff", "#ffd34d"];
    jars.forEach((c, i) => { ctx.fillStyle = "#e8eef8"; ctx.fillRect(x + 64 + i * 12, gy - 16, 9, 14); ctx.fillStyle = c; ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 3 + i); ctx.fillRect(x + 66 + i * 12, gy - 12, 5, 9); ctx.globalAlpha = 1; });
    ctx.fillStyle = "#6b4226"; ctx.fillRect(x + 60, gy - 2, 54, 2);                                     // la table
    if (t > 1.2) { const k = t - 1.2, bx = x + 80 + k * 40, by = gy - 30 - k * 18 + Math.sin(k * 9) * 5; ctx.fillStyle = Math.floor(t * 8) % 2 ? "#ffb7d5" : "#ff8ad8"; ctx.fillRect(Math.round(bx), Math.round(by), 3, 2); ctx.fillRect(Math.round(bx) + 4, Math.round(by), 3, 2); } // un papillon
  }
  if (art === "rocket") { // (it. 1082) Orbo : une fusée bricolée en haut d'une colline
    ctx.fillStyle = "#3e5a3a"; for (let r = 0; r < 18; r++) ctx.fillRect(x - 70 + r * 2, gy - r, 200 - r * 4, 1); // la colline
    const rx = x + 44, ry = gy - 18, shake = t > 2 && t < 2.6 ? Math.round(Math.sin(t * 60)) : 0;      // la fusée tremble
    ctx.fillStyle = "#e8eef8"; ctx.fillRect(rx + shake, ry - 58, 18, 50);                            // corps
    ctx.fillStyle = "#e2552b"; for (let r = 0; r < 10; r++) ctx.fillRect(rx + shake + r, ry - 68 + r, 18 - 2 * r, 1); // pointe
    ctx.fillRect(rx + shake - 6, ry - 20, 6, 14); ctx.fillRect(rx + shake + 18, ry - 20, 6, 14);   // ailerons
    ctx.fillStyle = "#9fd8ff"; ctx.fillRect(rx + shake + 5, ry - 46, 8, 8);                          // hublot
    if (t > 2 && t < 2.6) { ctx.fillStyle = Math.floor(t * 20) % 2 ? "#ffd34d" : "#e8873a"; ctx.fillRect(rx + shake + 4, ry - 8, 10, 6); } // une flamme… qui s'éteint
    ctx.fillStyle = "#6b4226"; ctx.fillRect(x, gy - 30, 22, 20);                                      // la cabane à outils (sa porte)
    ctx.fillStyle = "#8a5ad0"; for (let r = 0; r < 6; r++) ctx.fillRect(x - 4 + r, gy - 36 + r, 30 - 2 * r, 1);
  }
}

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
  // Mode centré (écran ultra-large) : les pièces et le butin filent vers le milieu, là où sont l'or et les boutons.
  goldTarget() { return { x: this.s.centerHud ? this.s.W / 2 + 60 : this.s.W - this.s.rightReserve - 80, y: 10 }; }
  bagTarget() { return { x: this.s.centerHud && this.s.hudSpan ? this.s.hudSpan[1] - 20 : this.s.W - 22, y: 12 }; }

  bind() {
    const g = this.s.game;
    g.on("kill", ({ mon }) => {
      const n = mon.goblin ? 34 : mon.boss ? 28 : mon.champion ? 30 : mon.elite ? 12 : 2;
      if (mon.champion) { this.banner(tx("Champion vaincu !"), "#c08cff", this.s.monX(), true); this.flash("#c08cff", 0.25); }
      this.coins(this.s.monX() + 10, this.ground() - 20, n * ((g.R.events.goldrain || 0) > 0 ? 2 : 1), mon.boss || mon.goblin);
      if (mon.boss) this.flash("#ffe9a8", 0.3);
    });
    g.on("bossNemesis", ({ name, fem, gender }) => this.banner(agreeDefeated(tx(fem ? "{0} enfin vaincue !" : "{0} enfin vaincu !", { 0: name }), gender), "#ffb733", this.s.monX() - 40)); // (it. 960, 966)
    g.on("loot", ({ item, mon, chest, ground }) => this.loot(item, chest ? this.s.heroX + 50 : mon ? this.s.monX() + 8 : this.s.heroX + 10, ground));
    g.on("levelUp", ({ lvl }) => { this.banner(`${tx("Niveau {0} !", { 0: lvl })}`, "#ffe27a", this.s.heroX); this.sparkles(this.s.heroX + 18, this.ground() - 40, "#ffe27a", 10); });
    g.on("zoneUp", ({ zone, record }) => {
      if (!record) return;
      // Grand palier (zone 50, 100, 150, 200…) : bannière dorée, plus marquante qu'un record ordinaire.
      if (isFinalZone(zone)) this.cinematic("arrive");
      else if (zone % 50 === 0) this.banner(`✦ ${tx("Cap franchi : zone {0} !", { 0: zone })}`, "#ffd34d", this.s.heroX + 120, true);
      else this.banner(`${tx("Nouveau record : zone {0} !", { 0: zone })}`, "#9fe0a8", this.s.heroX + 120);
      // Boss majeur (demande S) : scène d'arrivée, avec la relique qu'il garde (tant qu'elle n'est pas gagnée).
      const mb = majorBoss(zone);
      if (mb && !hasRelic(g.S, mb.relic)) this.cinematic("arrive", { major: mb });
    });
    g.on("starbreaker", ({ first }) => { if (first) this.cinematic("dawn"); });
    // Relique gagnée (demande S) : son nom et son effet, puis son histoire phrase par phrase.
    g.on("relic", ({ id }) => { if (RELICS[id]) this.cinematic("relic", { id }); });
    g.on("relicReplay", ({ id }) => { if (RELICS[id]) this.cinematic("relic", { id, force: true }); }); // ▶ des chroniques
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
    g.on("classUnlock", ({ cls }) => { // un moment de l'histoire : petite cinématique (la cage s'ouvre)
      this.sparkles(this.s.heroX + 18, this.ground() - 40, "#9fe0a8", 16);
      this.cinematic("freed", { cls });
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
      // Ses capacités, en petit dessous : le joueur sait ce qui l'attend sans ouvrir le panneau.
      const mech = (m.mech || []).map((id) => BOSS_MECHANICS[id] && BOSS_MECHANICS[id].name).filter(Boolean);
      if (mech.length) this.banner(mech.join(" · "), "#ffb0a0", this.s.monX() - 120, false);
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
  add(node, update, keep = false) {
    if (!this.active) { node.remove(); return; }
    // (it. 826) trop d'effets : le plus ancien qui n'est pas une cinématique part (avant, en combat chargé, la
    // cinématique en cours pouvait être retirée sans finir : this.cine restait « en cours » et toutes les suivantes
    // attendaient jusqu'au prochain lancement)
    if (this.parts.length >= MAX_PARTS) {
      const i = this.parts.findIndex((p) => !p.keep);
      if (i >= 0) this.parts.splice(i, 1)[0].node.remove();
    }
    const part = { node, update, t: 0, keep };
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
        if (k >= 1) { this.pulse = 0.3; this.s.game.emit("coinIn", { big: big && i % 4 === 0 }); return false; } // son de la pièce qui rentre
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
      if (ground) { // sac plein : l'objet reste au sol, clignote puis s'efface (perdu)
        const k = (p.t - 1.1) / 3;
        if (k >= 1) return false;
        img.style.opacity = k < 0.6 ? (Math.floor(p.t * 4) % 2 ? 0.55 : 1) : (1 - k) * 2.5;
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

  /**
   * Petites cinématiques de l'histoire (demandes de Victor) : une seule pièce animée (un calque + un canevas d'étoiles)
   * pour ne pas saturer MAX_PARTS ; textes en « pages » (titre + sous-titre) qui se succèdent. Un clic les passe ;
   * toujours jouées (même effets réduits).
   *  intro   : premier lancement ; un ciel étoilé se brise, les éclats tombent sur le Rebord, « SILLWALKER » (7 s) ;
   *  arrive  : zone 200, le Briseur d'Étoiles se montre, éclairs, le ciel se fissure au-dessus de lui (5 s) ;
   *  dawn    : il est vaincu, ses éclats remontent et rallument le ciel (12 s), puis enchaîne sur le générique ;
   *  credits : générique de fin personnalisé (statistiques de la partie), sur le ciel rallumé ;
   *  freed   : un héros prisonnier est libéré (data : { cls }) : sa cage s'ouvre, étincelles, « X est libre ! » (5 s) ;
   *  chronicle : nouvelle chronique (data : { title, n, total }) : le ciel montre une étoile de plus par chronique
   *              découverte, la nouvelle s'allume au centre (5 s). Le ciel se rallume ainsi peu à peu jusqu'à la fin.
   */
  cinematic(kind, data = {}) {
    if (!this.active) return;
    // Réglage « Cinématiques » (étude des concurrents : ne jamais interrompre) : coupées, sauf l'intro du premier
    // lancement et celles demandées exprès (▶ des chroniques : data.force).
    if (this.s.game.S.settings.cinematics === false && kind !== "intro" && !data.force) return;
    // Une cinématique en cours : la suivante attend son tour (zone 10 : héros libéré puis chronique, l'une
    // remplaçait l'autre). File courte : au-delà de 3, les plus anciennes en attente sont oubliées.
    // une cinématique disparue de l'écran (retirée, couche vidée) ne bloque plus la file
    if (this.cine && this.cine.node && !this.cine.node.isConnected) this.cine = null;
    if (this.cine && !this.cine.done) {
      const Q = (this.cineQueue ||= []);
      Q.push([kind, data]);
      if (Q.length > 3) Q.shift();
      return;
    }
    const W = this.s.W, H = this.layer.clientHeight || 120, S = this.s.game.S;
    // « hit » : la fenêtre capte les clics au-dessus du calque (sinon le clic « passer » traversait vers le bureau).
    const node = el("div", "cine hit " + kind, this.layer), cv = makeCanvas(node, "cine-sky"), dpr = window.devicePixelRatio || 1;
    sizeCanvas(cv, W, H, dpr);
    const ctx = cv.ctx;
    const title = el("div", "cine-title", node), sub = el("div", "cine-sub", node), skip = el("div", "cine-skip", node);
    skip.textContent = tx("clic : passer");
    // Pages : [titre, sous-titre], à partir de `start`, chacune `step` secondes (la dernière tient jusqu'à la fin).
    const PAGES = {
      intro: { start: 3, step: 9, pages: [["Sillwalker", tx("Le Rebord, il y a mille ans…")]] },
      arrive: { start: 0.6, step: 9, pages: [data.major ? [tx(data.major.name), tx("Il garde une relique : {0}", { 0: tx(RELICS[data.major.relic].name) })]
        : [tx("Le Briseur d’Étoiles"), tx("Le Briseur d’Étoiles t’attend !")]] },
      // (pages construites pour toutes les scènes : une chronique a aussi un data.id, qui n'est pas une relique)
      relic: { start: 1, step: 5.5, pages: kind === "relic" && RELICS[data.id] ? [[`✦ ${tx(RELICS[data.id].name)}`, tx(RELICS[data.id].effect)],
        ...sentences(tx(RELICS[data.id].story)).map((s) => [tx(RELICS[data.id].name), s])] : [["", ""]] },
      dawn: { start: 3, step: 20, pages: [[tx("Le ciel se rallume"), tx("Les héros sont libres.")]] },
      freed: { start: 1.4, step: 9, pages: [[tx("{0} est libre !", { 0: (CLASSES[data.cls] || {}).name || "" }), tx("Un héros de plus marche sur le Rebord.")]] },
      // Demande 31 : le titre, puis la première phrase de la chronique, sur une scène propre à chacune.
      chronicle: { start: 0.8, step: 3.6, pages: [[`📜 ${data.title || ""}`, tx("Chronique {0} / {1}", { 0: data.n || 1, 1: data.total || 1 })],
        ...(data.text ? [[data.title || "", firstSentence(data.text)]] : [])] },
      // (it. 1079, demande E de Victor) rencontre d'un PNJ quand son onglet s'ouvre : son nom, puis sa première réplique
      npc: { start: 3.2, step: 3.4, pages: kind === "npc" && npcFor(data.tab) ? [[tx(npcFor(data.tab).name), tx("Nouvel onglet : {0} !", { 0: tx(TAB_GATES[data.tab]?.label || "") })],
        [tx(npcFor(data.tab).name), tx(npcFor(data.tab).lines[0])]] : [["", ""]] },
      credits: { start: 0.8, step: 3.2, pages: [
        ["Sillwalker", tx("Le Briseur d’Étoiles est vaincu")],
        [tx("Héros libérés : {0}", { 0: (S.classesUnlocked || []).length }), tx("Ascensions : {0}", { 0: fmt((S.prestige && S.prestige.count) || 0) })],
        [tx("Monstres vaincus : {0}", { 0: fmt(S.stats.kills || 0) }), tx("Temps de jeu : {0}", { 0: durText(S.stats.playTime || 0) })],
        ["Sillwalker", tx("Imaginé par Victor Basset")],
        [tx("Merci d’avoir joué !"), tx("Le voyage continue au-delà du Rebord…")]] },
    }[kind];
    title.textContent = PAGES.pages[0][0]; sub.textContent = PAGES.pages[0][1]; // invisibles jusqu'à leur tour
    const cageX = Math.round(W / 2 - 230), cageY = Math.round(H * 0.18);
    if (kind === "freed" && data.cls) {
      const img = el("img", "cine-hero", node);
      img.src = classPortraitURL(data.cls);
      img.style.left = cageX + "px"; img.style.top = cageY + "px";
    }
    if ((kind === "relic" && RELICS[data.id]) || (kind === "arrive" && data.major)) { // la relique, au-dessus du titre
      const img = el("img", "cine-relic", node);
      img.src = relicIconURL(data.id || data.major.relic, 4); img.alt = "";
    }
    if (kind === "chronicle" && data.id) node.classList.add("chr-" + data.id); // ambiance de couleur (styles.css)
    // (it. 1079) rencontre d'un PNJ : le héros marche jusqu'à sa maison et y entre, puis le PNJ apparaît sur le seuil
    const npc = kind === "npc" ? npcFor(data.tab) : null, homeX = Math.round(W / 2 - 300), homeY = this.ground();
    let npcHero = null, npcImg = null;
    if (npc) {
      npcHero = el("img", "cine-npchero", node); npcHero.src = classPortraitURL(S.cls); npcHero.alt = "";
      npcImg = el("img", "cine-npc", node); npcImg.src = npcURL(npc.art); npcImg.alt = "";
      npcImg.style.left = (homeX - 10) + "px"; npcImg.style.top = (homeY - 54) + "px"; npcImg.style.opacity = "0"; // sur le seuil
    }
    const life = { intro: 7, arrive: 5, dawn: 12, chronicle: data.text ? 10 : 5, freed: 5, npc: 10 }[kind] || PAGES.start + PAGES.pages.length * PAGES.step + 0.6;
    // bx : dawn, là où le Briseur tombe ; arrive, sa place au bout de la bande.
    const bx = kind === "dawn" ? Math.min(W - 220, this.s.monX() + 20) : W - (this.s.rightReserve || 0) - 260, by = this.ground() - 30;
    // Étoiles : dawn, elles montent du Briseur vaincu ; credits, déjà au ciel ; intro, au ciel puis elles tombent.
    // chronicle : une étoile par chronique découverte (sur 9 points du ciel), la dernière est la nouvelle.
    const n = kind === "chronicle" ? data.n || 1 : { dawn: 70, credits: 80, intro: 60 }[kind] || 0;
    const seeded = (i) => { const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x); };
    const stars = Array.from({ length: kind === "chronicle" ? Math.max(0, n - 1) : n }, (_, i) => kind === "chronicle" ? ({
      tx: 40 + seeded(i) * (W - 80), ty: 8 + seeded(i + 50) * (H * 0.45), d: 1, start: -10, ph: i, big: true, fall: 99, fx: 0, gy: 0 }) : ({
      tx: 20 + Math.random() * (W - 40), ty: 6 + Math.random() * (H * 0.6), d: 1.2 + Math.random() * 2.2,
      start: kind === "dawn" ? 0.8 + i * 0.03 + Math.random() * 0.6 : -10, ph: Math.random() * 6, big: Math.random() < 0.15,
      fall: 1.8 + Math.random() * 0.8, fx: (Math.random() - 0.5) * 120, gy: this.ground() - 2 - Math.random() * 6 }));
    const state = { done: false, node };
    this.cine = state;
    node.addEventListener("click", () => { state.done = true; });
    this.s.game.emit("cinematic", { kind, id: data.id });
    if (this.onHits) setTimeout(this.onHits, 0); // zones cliquables de la fenêtre à recalculer
    let lastDraw = -1, page = -1;
    this.add(node, (p) => {
      const t = p.t, fadeIn = Math.min(1, t / 0.8), fadeOut = state.done ? 0 : Math.min(1, (life - t) / 0.8);
      const k = Math.max(0, Math.min(fadeIn, fadeOut));
      if (state.done || t >= life) {
        if (this.cine === state) this.cine = null;
        if (this.onHits) setTimeout(this.onHits, 0); // le calque disparaît : les clics retraversent la bande
        // Générique après la victoire (sauf si on a passé la scène), puis la cinématique suivante en attente.
        if (kind === "dawn" && !state.done) (this.cineQueue ||= []).unshift(["credits", {}]);
        const next = this.cineQueue && this.cineQueue.shift();
        if (next) setTimeout(() => this.cinematic(next[0], next[1]), 300);
        return false;
      }
      node.style.opacity = k.toFixed(2);
      // Page en cours : titre puis sous-titre, en fondu ; la page suivante remplace la précédente.
      const pi = Math.min(PAGES.pages.length - 1, Math.floor((t - PAGES.start) / PAGES.step));
      if (pi >= 0) {
        if (pi !== page) { page = pi; title.textContent = PAGES.pages[pi][0]; sub.textContent = PAGES.pages[pi][1]; }
        const at = PAGES.start + pi * PAGES.step, end = pi < PAGES.pages.length - 1 ? at + PAGES.step : life + 1;
        const vis = (d) => Math.max(0, Math.min(1, (t - at - d) / 0.5, (end - t) / 0.4));
        title.style.opacity = vis(0).toFixed(2);
        sub.style.opacity = vis(kind === "credits" ? 0.3 : 1.2).toFixed(2);
      }
      if (Math.floor(t * 15) === lastDraw) return true; // canevas à 15 images/s : assez pour des étoiles
      lastDraw = Math.floor(t * 15);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (kind === "arrive") { // éclairs violets : deux fois, le ciel se fend derrière le Briseur
        const f = (t > 0.9 && t < 1.05) || (t > 1.5 && t < 1.6) ? 0.55 : 0;
        if (f) { ctx.fillStyle = `rgba(179,107,255,${f})`; ctx.fillRect(0, 0, W, H); }
        for (let i = 0; i < 3; i++) { // fissure dans le ciel, au-dessus de lui
          ctx.fillStyle = "#c99bff"; const x = bx - 30 + i * 30, h = Math.min(H * 0.5, t * 60);
          for (let y = 0; y < h; y += 4) ctx.fillRect(Math.round(x + Math.sin(y * 0.3 + i) * 4), y, 2, 3);
        }
        return true;
      }
      if (kind === "intro" && t > 1.6 && t < 1.75) { ctx.fillStyle = "rgba(179,107,255,0.5)"; ctx.fillRect(0, 0, W, H); } // le ciel se brise
      for (const s of stars) {
        let x, y, e = 1;
        if (kind === "intro" && t > s.fall) { // l'éclat tombe sur le Rebord et y reste
          const u = Math.min(1, (t - s.fall) / 0.9);
          x = s.tx + s.fx * u; y = s.ty + (s.gy - s.ty) * easeIn(u); e = u < 1 ? 0.5 : 1;
          ctx.fillStyle = "#c99bff"; ctx.globalAlpha = 1;
          if (u < 1) { ctx.globalAlpha = 0.4; ctx.fillRect(Math.round(x), Math.round(y) - 6, 1, 6); ctx.globalAlpha = 1; } // traînée
          ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 2);
          continue;
        }
        const u = (t - s.start) / s.d;
        if (u <= 0) continue;
        e = Math.min(1, u); x = bx + (s.tx - bx) * easeOut(e); y = by + (s.ty - by) * easeOut(e);
        const tw = e >= 1 ? 0.6 + 0.4 * Math.sin(t * 3 + s.ph) : 1;
        ctx.globalAlpha = tw;
        ctx.fillStyle = s.big ? "#fff6c8" : "#ffe27a";
        const z = s.big ? 2 : 1;
        ctx.fillRect(Math.round(x) - z, Math.round(y), 2 * z + 1, 1);
        ctx.fillRect(Math.round(x), Math.round(y) - z, 1, 2 * z + 1);
        if (e < 1) { ctx.globalAlpha = 0.35; ctx.fillRect(Math.round(x), Math.round(y) + 2, 1, 4); } // traînée
      }
      if (kind === "freed") { // barreaux de la cage qui remontent (t 0,9 → 1,6), puis étincelles vertes
        const up = Math.min(1, Math.max(0, (t - 0.9) / 0.7)), bw = 52, bh = 56;
        ctx.fillStyle = "#9a96b8";
        for (let i = 0; i < 5; i++) ctx.fillRect(cageX - 4 + i * 12, Math.round(cageY - 4 - up * (bh + 10)), 3, bh);
        ctx.fillStyle = "#6a6488"; ctx.fillRect(cageX - 8, cageY + bh - 4, bw + 8, 4); // socle
        if (up >= 1) for (let i = 0; i < 18; i++) {
          const a = i * 0.35 + t * 2, rr = 10 + ((t - 1.6) * 40 + i * 7) % 46;
          ctx.globalAlpha = Math.max(0, 1 - rr / 56); ctx.fillStyle = i % 3 ? "#9fe0a8" : "#fff6c8";
          ctx.fillRect(Math.round(cageX + 22 + Math.cos(a) * rr), Math.round(cageY + 26 + Math.sin(a) * rr * 0.6), 2, 2);
        }
        ctx.globalAlpha = 1;
      }
      if (npc) { // maison du PNJ, le héros qui y entre, le PNJ sur le seuil
        npcPlace(ctx, npc.art, homeX, homeY, t);
        const walk = Math.min(1, Math.max(0, (t - 0.6) / 1.8)), gone = Math.min(1, Math.max(0, (t - 2.4) / 0.5));
        npcHero.style.left = Math.round(homeX - 170 + walk * 150) + "px"; npcHero.style.top = (homeY - 52) + "px";
        npcHero.style.opacity = (1 - gone).toFixed(2);
        npcImg.style.opacity = Math.min(1, Math.max(0, (t - 2.9) / 0.5)).toFixed(2);
      }
      if (kind === "chronicle" && data.id) chronicleScene(ctx, data.id, t, W, H, this.ground());
      if (kind === "chronicle") { // la nouvelle étoile s'allume au centre : croix qui grandit puis scintille
        const u = Math.min(1, Math.max(0, (t - 0.5) / 0.8)), cx = Math.round(W / 2), cy = Math.round(H * 0.12), r = Math.round(2 + u * 6);
        ctx.globalAlpha = u * (0.75 + 0.25 * Math.sin(t * 5));
        ctx.fillStyle = "#fff6c8"; ctx.fillRect(cx - r, cy, 2 * r + 1, 1); ctx.fillRect(cx, cy - r, 1, 2 * r + 1);
        ctx.fillStyle = "#ffe27a"; ctx.fillRect(cx - 1, cy - 1, 3, 3);
        ctx.globalAlpha = 1;
      }
      ctx.globalAlpha = 1;
      return true;
    }, true); // cinématique : jamais retirée pour faire de la place (it. 826)
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
    // (it. 993) au plus MAX_SPARKS étincelles vivantes : en fin de partie (combats denses, sorts de haut rang), ≈ 60
    // bougeaient en permanence et coûtaient au GPU ; une nouvelle salve en crée moins quand l'écran en est plein
    n = Math.min(n, MAX_SPARKS - this.layer.getElementsByClassName("spark").length);
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
    // Pluie d'éclats : petites étoiles violettes qui tombent autour du héros.
    if ((E.shardfall || 0) > 0 && Math.random() < dt * 8) {
      const node = el("div", "spark shardrain", this.layer), x = Math.max(0, Math.min(W - 10, this.s.heroX - 100 + Math.random() * 600));
      node.style.background = Math.random() < 0.3 ? "#fff6c8" : "#c99bff";
      this.add(node, (p) => { this.place(node, x, -8 + p.t * 120); return p.t < 0.9; });
    }
    // Nichée : plumes duveteuses qui descendent en se balançant autour du héros.
    if ((E.nest || 0) > 0 && Math.random() < dt * 5) {
      const node = el("div", "spark nestdown", this.layer), x = Math.max(0, Math.min(W - 10, this.s.heroX - 100 + Math.random() * 600)), ph = Math.random() * 6;
      node.style.background = Math.random() < 0.4 ? "#fff3dc" : "#f0c987";
      this.add(node, (p) => { this.place(node, x + Math.sin(ph + p.t * 7) * 10, -8 + p.t * 70); return p.t < 1.4; });
    }
    // Duo idéal (synergie) : de temps en temps, une étincelle dorée file entre les deux héros.
    const st = this.s, gS = st.game.S;
    if (st.partner && st.partnerX != null && Math.random() < dt * 0.6 && duoSynergy(gS.cls, gS.partner)) {
      const node = el("div", "spark duolink", this.layer), x0 = st.partnerX + 12, x1 = st.heroX + 12, y = 58 + Math.random() * 14;
      this.add(node, (p) => { this.place(node, x0 + (x1 - x0) * p.t, y - Math.sin(p.t * Math.PI) * 10); node.style.opacity = String(1 - p.t * 0.6); return p.t < 1; });
    }
    // Zèle : étincelles bleues qui montent du héros (les quêtes avancent deux fois plus vite).
    if ((E.zeal || 0) > 0 && Math.random() < dt * 4) {
      const node = el("div", "spark zealup", this.layer), x = this.s.heroX - 10 + Math.random() * 40, y0 = 40 + Math.random() * 20;
      node.style.background = Math.random() < 0.3 ? "#e6f7ff" : "#7fd4ff";
      this.add(node, (p) => { this.place(node, x, y0 - p.t * 45); node.style.opacity = String(1 - p.t); return p.t < 1; });
    }
    const frenzy = (E.frenzy || 0) > 0;
    if (this.s.hero && this.s.hero.el.classList.contains("frenzy") !== frenzy) this.s.hero.el.classList.toggle("frenzy", frenzy);
    const hawk = (E.hawkeye || 0) > 0; // Œil du faucon : halo orangé (tous les coups critiques)
    if (this.s.hero && this.s.hero.el.classList.contains("hawkeye") !== hawk) this.s.hero.el.classList.toggle("hawkeye", hawk);
    // Accélération d'un sort (demande Q) : halo orangé vif autour du héros
    const hasted = (this.s.game?.R.hasteT || 0) > 0;
    if (this.s.hero && this.s.hero.el.classList.contains("hasted") !== hasted) this.s.hero.el.classList.toggle("hasted", hasted);
    const arc = (E.arcane || 0) > 0; // Marée arcanique : halo violet (sorts rechargés deux fois plus vite)
    if (this.s.hero && this.s.hero.el.classList.contains("arcane") !== arc) this.s.hero.el.classList.toggle("arcane", arc);
    const ward = (E.ward || 0) > 0; // Voile protecteur : halo bleu pâle (dégâts subis divisés par deux)
    if (this.s.hero && this.s.hero.el.classList.contains("ward") !== ward) this.s.hero.el.classList.toggle("ward", ward);
    // Silence (échos, it. 647) : héros terni tant qu'il ne peut plus lancer de sorts (4 s)
    const sil = this.s.game.R.mode === "fight" && (this.s.game.R.silenced || 0) > 0;
    if (this.s.hero && this.s.hero.el.classList.contains("silenced") !== sil) this.s.hero.el.classList.toggle("silenced", sil);
    const ven = this.s.game.R.mode === "fight" && (this.s.game.R.venomT || 0) > 0; // Venin (boss, it. 878) : halo vert
    if (this.s.hero && this.s.hero.el.classList.contains("venom") !== ven) this.s.hero.el.classList.toggle("venom", ven);
    const curse = this.s.game.R.mode === "fight" && (this.s.game.R.cursed || 0) > 0; // Malédiction (boss) : halo violet
    if (this.s.hero && this.s.hero.el.classList.contains("cursed") !== curse) this.s.hero.el.classList.toggle("cursed", curse);
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
    // (it. 874) rien sur les pastilles d'informations : une particule qui les touche n'est pas dessinée
    const hud = this.s.hudBands ? this.s.hudBands() : null, onHud = (p) => hud && p.y < hud.h && hud.bands.some(([a, b]) => p.x + 6 > a && p.x < b);
    // (it. 875) ni sur le nom du boss et la relique qu'il garde (rectangles mis en cache par la bande, mesurés une fois par série)
    const obs = this.s.bossObstacles ? this.s.bossObstacles() : [], onObs = (p) => obs.some((o) => p.x + 6 > o.l && p.x < o.r && p.y + 6 > o.t && p.y < o.b);
    for (const p of this.wx) {
      if (onHud(p) || onObs(p)) continue;
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

  clear() { this.layer.replaceChildren(); this.parts.length = 0; this.cine = null; this.star = null; this.wx.length = 0; this.wxKind = null; this.wxc = null; this.wxKey = ""; }
}

/** Première phrase d'un texte (sous-titre court d'une cinématique). */
/** Phrases d'un texte (histoire d'une relique : une page par phrase). */
function sentences(text) {
  return (String(text).match(/[^.!?…。！？]+[.!?…。！？]*/g) || [String(text)]).map((s) => s.trim()).filter((s) => s.length > 1);
}

function firstSentence(text) {
  const m = String(text).match(/^.{20,}?[.!?…。！？](?=\s|$)/s);
  const s = (m ? m[0] : String(text)).replace(/\s+/g, " ").trim();
  return s.length > 120 ? s.slice(0, 117).trimEnd() + "…" : s;
}

/**
 * Décor d'une chronique (demande 31) : une petite scène en pixels, dessinée sur les côtés de la bande (le texte
 * est au centre). t : secondes depuis le début ; gy : hauteur du sol.
 */
function chronicleScene(ctx, id, t, W, H, gy) {
  const R = (x, y, w, h) => ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  const rnd = (i) => { const x = Math.sin(i * 91.7 + 3.3) * 43758.5453; return x - Math.floor(x); };
  const L = Math.round(W * 0.2), Rx = Math.round(W * 0.8);
  ctx.globalAlpha = 1;
  if (id === "captive") { // une cage s'ouvre sur un héros captif, étincelles vertes
    for (const cx of [L, Rx]) {
      const up = Math.min(1, Math.max(0, (t - 1.5) / 1.2)), bh = 50, top = gy - bh;
      ctx.fillStyle = "#1a1830"; R(cx + 14, top + 14, 10, 32); R(cx + 15, top + 6, 8, 8); // silhouette
      ctx.fillStyle = "#9a96b8";
      for (let i = 0; i < 5; i++) R(cx + i * 10, top - up * (bh + 20), 3, bh);
      ctx.fillStyle = "#6a6488"; R(cx - 4, gy - 4, 50, 4);
      if (up >= 1) for (let i = 0; i < 14; i++) {
        const a = i * 0.45 + t * 2, rr = (t * 30 + i * 9) % 50;
        ctx.globalAlpha = Math.max(0, 1 - rr / 50); ctx.fillStyle = i % 3 ? "#9fe0a8" : "#fff6c8";
        R(cx + 18 + Math.cos(a) * rr, top + 24 + Math.sin(a) * rr * 0.6, 2, 2);
      }
      ctx.globalAlpha = 1;
    }
  } else if (id === "shards") { // des éclats d'étoile tombent et brillent au sol
    for (let i = 0; i < 40; i++) {
      const x = rnd(i) * W, start = rnd(i + 40) * 6, u = Math.min(1, Math.max(0, (t - start) / 1.1));
      if (u <= 0) continue;
      const y = -6 + (gy - 4) * u * u;
      ctx.fillStyle = i % 4 ? "#c99bff" : "#ffe27a";
      if (u < 1) { ctx.globalAlpha = 0.35; R(x, y - 8, 1, 8); ctx.globalAlpha = 1; R(x - 1, y, 3, 3); }
      else { ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4 + i); R(x - 1, gy - 4, 3, 2); R(x, gy - 6, 1, 6); ctx.globalAlpha = 1; }
    }
  } else if (id === "rebirth") { // une colonne de lumière, le héros se relève, étincelles qui montent
    for (const cx of [L, Rx]) {
      const h = Math.min(gy, (t - 0.6) * 60);
      if (h <= 0) continue;
      ctx.globalAlpha = 0.25 + 0.1 * Math.sin(t * 3); ctx.fillStyle = "#fff1b0"; R(cx - 14, gy - h, 28, h);
      ctx.globalAlpha = 0.5; R(cx - 5, gy - h, 10, h);
      ctx.globalAlpha = 1; ctx.fillStyle = "#2a2240";
      const rise = Math.min(1, Math.max(0, (t - 2) / 1.5)); // silhouette : à genoux, puis debout
      R(cx - 5, gy - 14 - rise * 16, 10, 14 + rise * 16); R(cx - 4, gy - 22 - rise * 16, 8, 8);
      for (let i = 0; i < 12; i++) {
        const k = ((t * 0.5 + rnd(i)) % 1);
        ctx.globalAlpha = 1 - k; ctx.fillStyle = "#ffe27a"; R(cx - 16 + rnd(i + 9) * 32, gy - k * gy, 2, 2);
      }
      ctx.globalAlpha = 1;
    }
  } else if (id === "bastion") { // une forteresse noire, fenêtres rouges, braises
    const bx = Rx - 70, base = gy, rise = Math.min(1, t / 1.5);
    ctx.fillStyle = "#08060f";
    const towers = [[0, 46], [26, 64], [60, 52], [92, 70], [124, 44]];
    for (const [dx, h] of towers) {
      const hh = h * rise; R(bx + dx, base - hh, 24, hh);
      for (let k = 0; k < 3; k++) R(bx + dx + k * 9, base - hh - 5, 5, 5); // créneaux
    }
    R(bx, base - 30 * rise, 150, 30 * rise);
    if (rise >= 1) for (const [dx, h] of towers) {
      ctx.fillStyle = Math.sin(t * 7 + dx) > -0.3 ? "#ff5a3a" : "#a8321e"; R(bx + dx + 10, base - h + 14, 4, 6);
    }
    for (let i = 0; i < 16; i++) {
      const k = (t * 0.35 + rnd(i)) % 1;
      ctx.globalAlpha = 1 - k; ctx.fillStyle = i % 2 ? "#ff7a3a" : "#ffb733";
      R(bx - 40 + rnd(i + 3) * 230, base - k * (base - 6), 2, 2);
    }
    ctx.globalAlpha = 1;
  } else if (id === "forge") { // enclumes sombres, coups de marteau et gerbes d'étincelles
    for (const cx of [L, Rx]) {
      ctx.fillStyle = "#0c0910"; R(cx - 32, gy - 24, 64, 10); R(cx - 14, gy - 14, 28, 10); R(cx - 24, gy - 4, 48, 4); // enclume
      ctx.fillStyle = "#3a2c34"; R(cx - 30, gy - 24, 60, 2);
      const beat = (t * 1.2) % 1, hit = beat < 0.12;
      ctx.fillStyle = "#3a2c34"; R(cx + 8, gy - 60 + (hit ? 24 : 0), 8, 26); R(cx - 4, gy - 68 + (hit ? 24 : 0), 34, 10); // marteau
      if (hit) { ctx.globalAlpha = 0.5; ctx.fillStyle = "#ffb733"; R(cx - 40, gy - 30, 80, 6); ctx.globalAlpha = 1; }
      for (let i = 0; i < 22; i++) {
        const k = (beat + rnd(i)) % 1, a = -Math.PI / 2 + (rnd(i + 9) - 0.5) * 2.4;
        ctx.globalAlpha = 1 - k; ctx.fillStyle = i % 3 ? "#ff8a3a" : "#ffe27a";
        R(cx + Math.cos(a) * k * 70, gy - 28 + Math.sin(a) * k * 70, 3, 3);
      }
      ctx.globalAlpha = 1;
    }
  } else if (id === "voices") { // éclats suspendus qui murmurent : ondes qui s'élargissent
    for (let i = 0; i < 6; i++) {
      const x = (i % 2 ? Rx : L) + (rnd(i) - 0.5) * 120, y = gy - 30 - rnd(i + 3) * 40 + Math.sin(t * 2 + i) * 4;
      ctx.fillStyle = "#e8e4ff"; R(x - 1, y - 3, 3, 7); R(x - 3, y - 1, 7, 3);
      const k = ((t * 0.6 + rnd(i + 7)) % 1), r = 4 + k * 26;
      ctx.globalAlpha = (1 - k) * 0.6; ctx.fillStyle = "#b36bff";
      for (let a = 0; a < 16; a++) { const an = a / 16 * Math.PI * 2; R(x + Math.cos(an) * r, y + Math.sin(an) * r * 0.6, 2, 2); }
      ctx.globalAlpha = 1;
    }
  } else if (id === "beyond") { // brumes qui dérivent sur des terres sans carte
    for (let b = 0; b < 4; b++) {
      ctx.globalAlpha = 0.16; ctx.fillStyle = b % 2 ? "#b8b4d8" : "#8a86a8";
      const y = gy - 14 - b * 13, off = ((t * (14 + b * 6)) % (W + 400)) - 400;
      for (let x = off; x < W; x += 420) R(x, y, 300, 9);
    }
    ctx.globalAlpha = 0.5; ctx.fillStyle = "#6a6488"; // sol qui ondule, comme replié sur lui-même
    for (let x = 0; x < W; x += 6) R(x, gy - 2 + Math.round(Math.sin(x * 0.03 + t * 2) * 2), 6, 2);
    ctx.globalAlpha = 1;
  } else if (id === "crack") { // une fissure de lumière traverse le ciel, des lueurs en tombent
    const len = Math.min(1, Math.max(0, (t - 0.6) / 2.4)) * W;
    // Tout en haut de la bande : le titre est juste en dessous.
    const cyb = 7;
    let y = cyb;
    for (let x = 0; x < len; x += 8) {
      const ny = cyb + Math.sin(x * 0.05) * 3 + (rnd(Math.floor(x / 8)) - 0.5) * 5;
      ctx.globalAlpha = 0.35; ctx.fillStyle = "#7fd6ff"; R(x, Math.min(y, ny) - 2, 8, Math.abs(ny - y) + 5);
      ctx.globalAlpha = 1; ctx.fillStyle = "#e8fbff"; R(x, Math.min(y, ny), 8, Math.max(1, Math.abs(ny - y)) + 1);
      y = ny;
    }
    for (let i = 0; i < 20; i++) {
      const x0 = rnd(i) * len, k = (t * 0.4 + rnd(i + 7)) % 1;
      ctx.globalAlpha = 1 - k; ctx.fillStyle = "#bdefff"; R(x0, cyb + k * (gy - cyb), 2, 2);
    }
    ctx.globalAlpha = 1;
  } else if (id === "oath") { // des runes violettes tournent autour d'un point, puis une lumière claire les dissipe
    const cx = L + 40, cy = gy - 30, clear = Math.min(1, Math.max(0, (t - 3.2) / 1.6));
    for (let i = 0; i < 12; i++) {
      const a = t * 1.6 + (i / 12) * Math.PI * 2, r = 26 + clear * 60;
      ctx.globalAlpha = (1 - clear) * (0.6 + 0.4 * Math.sin(t * 5 + i)); ctx.fillStyle = i % 3 ? "#8a4cd8" : "#c08cff";
      R(cx + Math.cos(a) * r * 1.6 - 2, cy + Math.sin(a) * r * 0.6 - 2, 4, 4);
    }
    if (t > 2.6) { // la gemme du talisman s'allume, puis sa lumière s'étend
      const k = Math.min(1, (t - 2.6) / 0.8);
      ctx.globalAlpha = k; ctx.fillStyle = "#ffd34d"; R(cx - 4, cy - 6, 8, 2); R(cx - 6, cy - 4, 12, 8); R(cx - 4, cy + 4, 8, 2);
      ctx.fillStyle = "#9fe0ff"; R(cx - 3, cy - 3, 6, 6); ctx.fillStyle = "#ffffff"; R(cx - 2, cy - 2, 2, 2);
      for (let s = 0; s < 4; s++) { ctx.globalAlpha = 0.18 * clear * (1 - s / 4); ctx.fillStyle = "#e8fbff"; const w = 30 + s * 30 + clear * 60; R(cx - w, cy - 2 - s * 3, w * 2, 4 + s * 6); }
    }
    ctx.globalAlpha = 1;
  } else if (id === "threshold") { // au loin, la silhouette immense du Briseur, ses yeux s'allument
    const cx = Rx, pulse = 0.5 + 0.5 * Math.sin(t * 2);
    ctx.fillStyle = "#8a3cff"; // halo doux : bandes de plus en plus larges et pâles
    for (let k = 0; k < 6; k++) { ctx.globalAlpha = (0.09 - k * 0.012) * (0.6 + 0.4 * pulse); R(cx - 30 - k * 14, gy - 100 - k * 6, 60 + k * 28, 100 + k * 6); }
    ctx.globalAlpha = Math.min(1, t / 2); ctx.fillStyle = "#05030a";
    R(cx - 24, gy - 70, 48, 70); R(cx - 16, gy - 90, 32, 22); R(cx - 40, gy - 64, 16, 40); R(cx + 24, gy - 64, 16, 40);
    R(cx - 20, gy - 98, 6, 10); R(cx + 14, gy - 98, 6, 10); // cornes
    if (t > 2.4) { ctx.globalAlpha = 0.7 + 0.3 * pulse; ctx.fillStyle = "#ff3a6a"; R(cx - 9, gy - 82, 5, 3); R(cx + 4, gy - 82, 5, 3); }
    if (t < 2.5) for (let i = 0; i < 10; i++) { // le vent souffle encore… puis plus rien
      ctx.globalAlpha = 0.4 * (1 - t / 2.5); ctx.fillStyle = "#e8e4ff";
      R(W - ((t * 700 + rnd(i) * W) % W), 10 + rnd(i + 4) * (gy - 20), 40, 1);
    }
    ctx.globalAlpha = 1;
  }
  ctx.globalAlpha = 1;
}
