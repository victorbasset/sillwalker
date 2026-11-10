import { WEATHER } from "./juice.js";

// Effets sonores synthétisés (Web Audio, aucun fichier). Coupés par défaut :
// Sillwalker vit en bas de l'écran pendant qu'on fait autre chose.
// Chaque son est limité en fréquence pour ne jamais devenir agaçant.

// Gamme des pièces enchaînées (pentatonique, deux octaves) : chaque victoire rapprochée sonne un cran plus haut.
const COIN_SCALE = [1318.5, 1480, 1661, 1975.5, 2217.5, 2637, 2217.5, 1975.5]; // monte puis redescend (boucle)
const NOTES = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G6: 1568, D6: 1174.66 };

// Sons de coup variés (demande 25 de Victor) : un timbre par arme (donc par héros) et un « modificateur » par
// matière de l'ennemi touché (hauteur, bruit), plus un léger désaccord aléatoire : moins répétitif.
export const WEAPON_OF = {
  warrior: "blade", assassin: "blade", samurai: "blade", gladiator: "blade", bladedancer: "blade", starwarden: "blade",
  paladin: "blunt", monk: "blunt", berserker: "blunt", lancer: "spear",
  ranger: "bow", arbalest: "bow", mage: "fire", artificer: "fire", cryomancer: "ice",
  necro: "shadow", druid: "shadow", shaman: "shadow", priestess: "holy", bard: "note",
};
// Matière des monstres (par dessin de base) : mou, dur (os, pierre, métal, carapace), volant ; chair par défaut.
const MATERIAL = {
  soft: ["slime", "jelly", "mush", "sporeling", "worm", "frog", "plant", "ghost", "treant"],
  hard: ["skel", "golem", "knight", "darkknight", "beetle", "crab", "scorp", "mimic", "mummy"],
  air: ["bat", "crow", "harpy", "wasp", "eye", "imp", "fireelem"],
};
const MAT_INDEX = Object.fromEntries(Object.entries(MATERIAL).flatMap(([m, list]) => list.map((k) => [k, m])));
/** Matière d'un type de monstre (variantes : « slime_lava » → « slime »). */
export const materialOf = (type) => MAT_INDEX[String(type || "").split("_")[0]] || "flesh";
export const weaponOf = (cls) => WEAPON_OF[cls] || "blade";

export class Sound {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.volume = 0.4;
    this.last = {};
  }

  set(enabled, volume) {
    this.enabled = !!enabled;
    this.volume = Math.max(0, Math.min(1, +volume || 0));
    if (this.master) this.master.gain.value = this.volume * 0.25;
  }

  ensure() {
    if (!this.enabled) return null;
    return this.audio();
  }

  /** Contexte audio, même effets coupés (la musique en a besoin) ; null si tout est coupé (bouton haut-parleur). */
  audio() {
    if (this.muted) return null;
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume * 0.25;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  /** Limite : au plus un son de ce type toutes les `ms` millisecondes. */
  throttle(id, ms) {
    const now = performance.now();
    if (id in this.last && now - this.last[id] < ms) return false; // jamais joué : toujours permis (même juste après le lancement)
    this.last[id] = now;
    return true;
  }

  tone(freq, start, dur, type = "square", gain = 0.5, slide = 0) {
    const ctx = this.ctx, t = ctx.currentTime + start;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * slide), t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.02);
  }

  /** Bruit qui s'éteint. `freq` : filtre passe-bande (couleur du bruit : sourd, sec, sifflant) ; 0 = bruit blanc. */
  noise(start, dur, gain = 0.3, freq = 0, q = 1) {
    const ctx = this.ctx, t = ctx.currentTime + start, n = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = buf; g.gain.value = gain;
    if (freq > 0) { const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q; s.connect(f); f.connect(g); }
    else s.connect(g);
    g.connect(this.master);
    s.start(t);
  }

  /** Souffle : bruit filtré dont la couleur glisse de f0 à f1 (vent, étoile filante), avec une montée douce. */
  whoosh(start, dur, f0, f1, gain = 0.15, q = 2) {
    const ctx = this.ctx, t = ctx.currentTime + start, n = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = buf; f.type = "bandpass"; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(this.master);
    s.start(t);
  }

  /** Événement rare (demande C) : chacun a sa signature au moment où il commence. */
  eventSound(id) {
    const N = NOTES;
    switch (id) {
      case "wind": this.whoosh(0, 1.2, 300, 1400, 0.7, 1.5); this.whoosh(0.4, 1.0, 600, 250, 0.4, 2); break; // rafale qui passe
      case "goldrain": for (let i = 0; i < 9; i++) { const f = COIN_SCALE[(i * 3) % COIN_SCALE.length]; this.tone(f, i * 0.07, 0.14, "sine", 0.1); this.tone(f * 2.76, i * 0.07, 0.07, "sine", 0.03); } break; // averse de pièces
      case "frenzy": for (let i = 0; i < 6; i++) { const t = 0.32 * (1 - Math.pow(0.8, i)) * 3; this.tone(110, t, 0.08, "triangle", 0.25, 0.6); this.noise(t, 0.04, 0.08, 1800, 1); } break; // roulement qui accélère
      case "bounty": this.noise(0, 0.06, 0.15, 500, 0.8); [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => this.tone(f, 0.08 + i * 0.05, 0.22, "triangle", 0.16)); break; // corne qui déborde
      case "wisdom": [N.C5, N.G5, N.E6].forEach((f, i) => this.tone(f, i * 0.12, 0.9, "sine", 0.09)); break; // accord doux qui s'ouvre
      case "hawkeye": this.tone(2400, 0, 0.35, "triangle", 0.18, 0.62); this.tone(2500, 0.05, 0.3, "sine", 0.1, 0.6); break; // cri du faucon
      case "shardfall": [N.G6, N.E6, N.C6, N.G5 * 2, N.E6].forEach((f, i) => this.tone(f * 1.5, i * 0.09, 0.3, "sine", 0.13)); break; // éclats cristallins
      case "zeal": [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => this.tone(f, i * 0.06, 0.1, "square", 0.16)); this.tone(N.C6, 0.26, 0.3, "square", 0.14); break; // petite fanfare
      case "nest": for (let i = 0; i < 3; i++) this.tone(2000 + i * 300, i * 0.13, 0.08, "sine", 0.17, 1.4); break; // pépiements
      case "ward": this.tone(N.E5, 0, 0.8, "sine", 0.08, 1.5); this.tone(N.E5 * 1.01, 0, 0.8, "sine", 0.06, 1.5); this.whoosh(0, 0.6, 2000, 4000, 0.05, 3); break; // voile qui se lève
      default: [N.G5, N.C6, N.G6].forEach((f, i) => this.tone(f, i * 0.06, 0.18, "triangle", 0.25)); break;
    }
  }

  /** Ambiance pendant un événement (4 fois par seconde) : discrète, aléatoire, jamais en boucle audible. */
  eventAmbience(E) {
    if (!this.enabled || !E || !this.ensure()) return;
    if ((E.goldrain || 0) > 0 && Math.random() < 0.55) { const f = COIN_SCALE[Math.floor(Math.random() * COIN_SCALE.length)] * (0.98 + Math.random() * 0.04); this.tone(f, Math.random() * 0.2, 0.1, "sine", 0.035); this.tone(f * 2.76, 0, 0.05, "sine", 0.012); }
    if ((E.wind || 0) > 0 && Math.random() < 0.12) this.whoosh(0, 1.4 + Math.random(), 250 + Math.random() * 200, 700 + Math.random() * 900, 0.2, 1.2);
    if ((E.shardfall || 0) > 0 && Math.random() < 0.15) this.tone(2600 + Math.random() * 1400, 0, 0.25, "sine", 0.025);
    if ((E.nest || 0) > 0 && Math.random() < 0.06) this.tone(2100 + Math.random() * 500, 0, 0.07, "sine", 0.03, 1.4);
  }

  /** Ambiance de la zone (demande C : « dans une zone d'eau des petits bruits de bulle… ») : quelques sons épars,
   *  tirés au hasard (4 tirages par seconde), selon le décor (météo de juice.js) ; prairies : oiseaux le jour,
   *  grillons la nuit. Bien plus bas que les effets : un fond, pas un bruit. */
  /** Bouton « Écouter » des Réglages : de quoi régler les volumes à l'oreille (une victoire avec ses pièces, un coup,
   *  puis l'ambiance de la zone actuelle par son propre curseur). */
  sample(cls, kind, night) {
    if (!this.enabled || !this.ensure()) return;
    this.hit(cls, "wolf", false);
    this.coin(5);
    setTimeout(() => { if (this.enabled) { this.last = {}; this.hit(cls, "skel", true); } }, 450);
    setTimeout(() => {
      if (!this.enabled || this.ambLevel === 0) return;
      if (!this.ambBus || this.ambBus.context !== this.ctx) { this.ambBus = this.ctx.createGain(); this.ambBus.gain.value = this.ambLevel ?? 1; this.ambBus.connect(this.master); }
      const master = this.master; this.master = this.ambBus;
      try { this.zoneSounds(kind, night, true); } finally { this.master = master; }
    }, 1000);
  }

  /** Volume propre de l'ambiance des zones (Réglages, 0 à 2 ; 1 = niveau d'origine). */
  setAmbience(level) { this.ambLevel = Math.max(0, Math.min(2, +level || 0)); if (this.ambBus) this.ambBus.gain.value = this.ambLevel; }

  zoneAmbience(kind, night) {
    if (!this.enabled || !this.ensure() || this.ambLevel === 0) return;
    // Tous les sons de l'ambiance passent par un bus à part (son curseur de volume) : on détourne « master » le temps du tirage.
    if (!this.ambBus || this.ambBus.context !== this.ctx) { this.ambBus = this.ctx.createGain(); this.ambBus.gain.value = this.ambLevel ?? 1; this.ambBus.connect(this.master); }
    const master = this.master; this.master = this.ambBus;
    try { this.zoneSounds(kind, night); } finally { this.master = master; }
  }

  zoneSounds(kind, night, force = false) {
    const r = force ? 0.001 : Math.random(), j = () => 0.9 + Math.random() * 0.2; // force : l'échantillon du bouton « Écouter »
    switch (kind) {
      case "bubble": // bulles qui remontent : petits « blop » montants, souvent en grappe
        if (r < 0.22) { const n = 1 + Math.floor(Math.random() * 3); for (let i = 0; i < n; i++) this.tone(260 * j() + i * 90, i * 0.07, 0.07, "sine", 0.05, 2.6); } break;
      case "drip": // gouttes dans une grotte : « ploc » et son écho
        if (r < 0.1) { const f = 1300 * j(); this.tone(f, 0, 0.06, "sine", 0.06, 0.55); this.tone(f, 0.18, 0.06, "sine", 0.015, 0.55); } break;
      case "snow": // vent froid, long et grave
        if (r < 0.05) this.whoosh(0, 2.5 + Math.random() * 1.5, 180, 420, 0.2, 1.2); break;
      case "dust": // vent sec du désert
        if (r < 0.06) this.whoosh(0, 1.8 + Math.random(), 500, 1100, 0.16, 1.4); break;
      case "ember": // braises qui crépitent, parfois un grondement sourd
        if (r < 0.35) { const n = 1 + Math.floor(Math.random() * 3); for (let i = 0; i < n; i++) this.noise(i * 0.04 + Math.random() * 0.05, 0.012, 0.09, 2500 * j(), 2); }
        if (r > 0.985) this.tone(55, 0, 1.2, "triangle", 0.08, 0.8); break;
      case "spore": // marais : coassements (nuit et jour), bulle de vase
        if (r < 0.06) { const f = 140 * j(); this.tone(f, 0, 0.09, "square", 0.025, 0.8); this.tone(f, 0.13, 0.09, "square", 0.02, 0.8); }
        else if (r > 0.97) this.tone(90 * j(), 0, 0.1, "sine", 0.06, 2); break;
      case "mote": // ruines célestes, cristal, néant : carillons lointains, lents
        if (r < 0.05) { const f = [NOTES.E6, NOTES.G6, NOTES.C6, NOTES.D6][Math.floor(Math.random() * 4)]; this.tone(f, 0, 1.4, "sine", 0.05); this.tone(f * 1.5, 0.3, 1, "sine", 0.024); } break;
      case "ash": // cryptes, mines, bastion : écho métallique lointain, battement grave
        if (r < 0.03) { this.tone(1900 * j(), 0, 0.05, "square", 0.012); this.tone(1900 * j(), 0.25, 0.05, "square", 0.006); }
        else if (r > 0.985) this.tone(70, 0, 0.6, "sine", 0.06, 0.9); break;
      case "feather": // côte, nids, tempêtes : cris d'oiseaux de mer, bourrasques
        if (r < 0.04) this.tone(1600 * j(), 0, 0.35, "triangle", 0.05, 0.65);
        else if (r > 0.96) this.whoosh(0, 1.6, 300, 900, 0.09, 1.3); break;
      default: // forêts et prairies : gazouillis le jour, grillons la nuit
        if (night) { if (r < 0.2) for (let i = 0; i < 3; i++) this.tone(4200 * j(), i * 0.05, 0.03, "sine", 0.02); }
        else if (r < (kind === "leaf" ? 0.03 : 0.018)) this.birdCall(); // ≈ toutes les 8 s en forêt, 14 s en prairie
    }
  }

  /** Chant d'oiseau (retour de Victor : trop proche du critique, trop fréquent) : un trille rapide ou un gazouillis
   *  vibré qui DESCEND (le critique, lui, est une note seule qui monte), doux. */
  birdCall() {
    const ctx = this.ctx, t0 = ctx.currentTime, base = 3000 + Math.random() * 900;
    if (Math.random() < 0.5) { // trille : 5 à 8 notes très brèves qui alternent
      const n = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) this.tone(base * (i % 2 ? 1.12 : 1) * (1 - i * 0.015), i * 0.045, 0.03, "sine", 0.03);
      return;
    }
    // gazouillis : une note vibrée (modulation rapide) qui glisse vers le bas, parfois répétée
    for (let k = 0; k < (Math.random() < 0.5 ? 1 : 2); k++) {
      const t = t0 + k * 0.32, o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(base, t); o.frequency.exponentialRampToValueAtTime(base * 0.78, t + 0.22);
      lfo.frequency.value = 28 + Math.random() * 10; lg.gain.value = base * 0.06; lfo.connect(lg); lg.connect(o.frequency);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.03, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
      o.connect(g); g.connect(this.master); o.start(t); lfo.start(t); o.stop(t + 0.26); lfo.stop(t + 0.26);
    }
  }

  /** Pièce qui rentre dans la bourse (demande de Victor : « un son pour chaque pièce qui rentre ») : petit tintement
   *  bref et clair, un cran plus haut à chaque pièce d'une même rafale (la rafale « monte »), plus rond pour une
   *  grosse pièce. Volume bas : il y en a beaucoup. */
  coinIn(big) {
    if (!this.enabled || !this.ensure() || !this.throttle("coinIn", 28)) return;
    const now = performance.now();
    this.inStep = now - (this.inT || 0) < 450 ? Math.min((this.inStep || 0) + 1, 14) : 0;
    this.inT = now;
    const f = 1975.5 * Math.pow(2, this.inStep / 12) * (0.995 + Math.random() * 0.01), g = big ? 0.075 : 0.05;
    this.tone(f, 0, 0.07, "sine", g);
    this.tone(f * 2.76, 0, 0.035, "sine", g * 0.3);
    if (big) this.tone(f / 2, 0, 0.12, "triangle", g * 0.6);
  }

  /** Pièce (demande C de Victor : satisfaction) : un tintement métallique (fondamentale + harmonique non entière,
   *  comme une vraie pièce), qui monte d'un cran à chaque victoire enchaînée (gamme pentatonique, retombe après une
   *  pause) ; `n` pièces = petite cascade (élites, boss). */
  coin(n = 1) {
    if (!this.enabled || !this.ensure()) return;
    const now = performance.now();
    this.coinStep = now - (this.coinT || 0) < 4000 ? ((this.coinStep || 0) + 1) % COIN_SCALE.length : 0;
    this.coinT = now;
    for (let i = 0; i < Math.min(n, 6); i++) {
      const f = COIN_SCALE[(this.coinStep + i) % COIN_SCALE.length] * (0.995 + Math.random() * 0.01), t = i * 0.055;
      this.tone(f, t, 0.16, "sine", 0.11);
      this.tone(f * 2.76, t, 0.09, "sine", 0.035); // partiel inharmonique : le « ting » du métal
      this.tone(f * 5.4, t + 0.004, 0.04, "triangle", 0.025);
    }
  }

  /** Coup du héros : timbre de son arme, modifié par la matière de l'ennemi ; plus fort et plus clair en critique. */
  hit(cls, monType, crit) {
    if (!this.enabled || !this.ensure() || !this.throttle("hit", 140)) return;
    const w = weaponOf(cls), mat = materialOf(monType);
    const p = (mat === "soft" ? 0.72 : mat === "hard" ? 1.25 : mat === "air" ? 1.12 : 1) * (0.94 + Math.random() * 0.12) * (crit ? 1.15 : 1);
    // Variété (demande C : « très répétitif ») : volume, couleur du bruit et durée tirés à chaque coup, et l'un de trois
    // gestes par arme (coup simple, coup appuyé avec souffle, coup bref), jamais deux fois de suite le même.
    const g = (crit ? 1.35 : 1) * (0.82 + Math.random() * 0.3), c = 0.7 + Math.random() * 0.7, dl = 0.85 + Math.random() * 0.35;
    let v = Math.floor(Math.random() * 3); if (v === this.lastHitV) v = (v + 1) % 3; this.lastHitV = v;
    if (v === 1) this.noise(0, 0.05, 0.05 * g, 2600 * c, 0.8); // souffle de l'élan, avant l'impact
    const s = v === 1 ? 0.025 : 0;
    switch (w) {
      case "blade": this.noise(s, 0.045 * dl, 0.16 * g, 3200 * c, 0.9); this.tone(1400 * p * (v === 2 ? 1.2 : 1), s, 0.06 * dl, "square", 0.05 * g, 0.5); break;
      case "blunt": this.noise(s, 0.07 * dl, 0.2 * g, 700 * c, 0.8); this.tone(150 * p * (v === 2 ? 0.85 : 1), s, 0.1 * dl, "triangle", 0.3 * g, 0.55); break;
      case "spear": this.noise(s, 0.035 * dl, 0.15 * g, 2200 * c, 1); this.tone(900 * p, s, 0.05 * dl, "triangle", 0.12 * g, v === 2 ? 0.9 : 0.7); break;
      case "bow": this.tone(720 * p * (v === 2 ? 1.1 : 1), s, 0.09 * dl, "triangle", 0.16 * g, 0.5); this.noise(s + 0.02, 0.02, 0.06 * g, 4000 * c, 1.2); break;
      case "fire": this.noise(s, 0.12 * dl, 0.1 * g, 900 * c, 0.6); this.tone(220 * p, s, 0.12 * dl, "square", 0.06 * g, v === 2 ? 0.35 : 0.5); break;
      case "ice": this.tone(1800 * p, 0, 0.07, "triangle", 0.1 * g, 1.4); this.tone(2600 * p, 0.03, 0.05, "triangle", 0.06 * g); break;
      case "shadow": this.tone(320 * p, 0, 0.11, "triangle", 0.14 * g, 1.4); break;
      case "holy": this.tone(880 * p, 0, 0.1, "triangle", 0.11 * g); this.tone(1320 * p, 0.02, 0.1, "triangle", 0.07 * g); break;
      case "note": this.tone([523, 587, 659, 784][Math.floor(Math.random() * 4)] * p, 0, 0.12, "triangle", 0.13 * g); break;
    }
    // Impact selon la matière : « splotch » mou, clac sec, souffle léger.
    if (crit) this.tone(2400 * c, 0.01, 0.12, "triangle", 0.05, 1.3); // critique : un « shing » clair qui monte
    if (mat === "soft") this.tone(110 * p, 0.02, 0.08, "triangle", 0.12 * g, 0.6);
    else if (mat === "hard") this.tone(2200 * p, 0.015, 0.03, "square", 0.04 * g);
  }

  /** Motif d'une chronique (demande 31) : une ambiance par chapitre de l'histoire (fréquences en Hz). */
  chronicleMotif(cid) {
    const T = (f, at, d, type, v, sl) => this.tone(f, at, d, type, v, sl);
    switch (cid) {
      case "captive": // la cage cède, espoir : arpège majeur montant
        this.noise(1.5, 0.15, 0.25); [523, 659, 784, 1047].forEach((f, i) => T(f, 2.2 + i * 0.16, 0.5, "square", 0.12));
        [523, 659, 784].forEach((f) => T(f, 2.9, 2.2, "triangle", 0.14)); break;
      case "shards": // des éclats qui tintent en tombant
        for (let i = 0; i < 12; i++) T([1568, 1319, 1175, 1047, 1319, 1760][i % 6], 0.3 + i * 0.33, 0.3, "triangle", 0.1);
        T(262, 0.3, 4, "triangle", 0.12); T(392, 0.3, 4, "triangle", 0.08); break;
      case "rebirth": // lumière qui grandit : accord tenu qui s'ouvre
        [262, 330, 392].forEach((f, i) => T(f, 0.6 + i * 0.5, 4, "triangle", 0.13)); T(523, 2.2, 3, "triangle", 0.12); T(1047, 2.6, 2.4, "sine", 0.08); break;
      case "bastion": // tambour grave et accord mineur menaçant
        for (let i = 0; i < 6; i++) { T(70, i * 0.6, 0.25, "square", 0.22, 0.5); this.noise(i * 0.6, 0.08, 0.15); }
        [220, 262, 330].forEach((f) => T(f, 1.2, 3.2, "sawtooth", 0.07)); T(196, 3.6, 2, "sawtooth", 0.08); break;
      case "forge": // coups de marteau sur l'enclume, puis un accord qui se libère
        for (let i = 0; i < 5; i++) { this.noise(i * 0.83, 0.05, 0.3); T(1568, i * 0.83, 0.25, "square", 0.08, 0.7); T(110, i * 0.83, 0.2, "triangle", 0.25); }
        [392, 494, 587, 784].forEach((f, i) => T(f, 4.3 + i * 0.12, 1.6, "triangle", 0.13)); break;
      case "voices": // murmures cristallins, glissés et lointains
        for (let i = 0; i < 9; i++) T([1047, 1175, 1397, 1568, 1319][i % 5], 0.4 + i * 0.55, 0.9, "sine", 0.07, 1.2);
        T(196, 0.4, 5, "triangle", 0.07); T(294, 2.2, 3.5, "triangle", 0.06); break;
      case "beyond": // brume : notes lentes, flottantes, sans appui
        [392, 466, 523, 466, 349, 392].forEach((f, i) => T(f, 0.4 + i * 0.9, 1.4, "sine", 0.12)); T(196, 0.4, 5.5, "triangle", 0.08); break;
      case "crack": // le ciel se fissure : craquement, puis tintement cristallin
        this.noise(0.6, 0.9, 0.25); T(1760, 1.6, 1.6, "triangle", 0.1); T(2349, 1.9, 1.4, "triangle", 0.07);
        [523, 784, 1175].forEach((f, i) => T(f, 2.6 + i * 0.3, 2.2, "triangle", 0.12)); break;
      case "oath": // serment maudit : notes dissonantes qui descendent, puis un accord pur (le talisman)
        [880, 830, 784, 740].forEach((f, i) => T(f * 0.5, i * 0.45, 0.6, "sine", 0.1));
        [523, 659, 784].forEach((f) => T(f, 2.8, 2.4, "triangle", 0.1)); T(1568, 3.2, 1.6, "triangle", 0.06); break;
      case "threshold": // silence pesant, battement grave, deux notes sombres
        for (let i = 0; i < 5; i++) T(55, 0.5 + i * 1.1, 0.4, "sine", 0.3, 0.6);
        T(233, 2.4, 2.5, "sawtooth", 0.07); T(220, 4.2, 2.5, "sawtooth", 0.08); break;
      default: return false;
    }
    return true;
  }

  play(id, extra) {
    if (!this.enabled || !this.ensure()) return;
    if (id === "chronicle" && extra && this.chronicleMotif(extra)) return;
    switch (id) {
      case "doom": // le Briseur se montre : grondement et accords graves qui descendent
        this.noise(0, 1.2, 0.35); this.tone(220, 0.1, 0.9, "sawtooth", 0.25, 0.5); this.tone(165, 0.9, 1.1, "sawtooth", 0.25, 0.6);
        this.tone(110, 1.6, 1.6, "square", 0.22, 0.7); break;
      case "dawn": // le ciel se rallume : arpège montant puis accord tenu, et des étoiles qui tintent
        [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6].forEach((f, i) => this.tone(f, i * 0.18, 0.5, "triangle", 0.3));
        [NOTES.C5, NOTES.E5, NOTES.G5].forEach((f) => this.tone(f, 0.8, 2.6, "triangle", 0.18));
        this.tone(NOTES.C6, 0.8, 2.6, "square", 0.08);
        for (let i = 0; i < 10; i++) this.tone([NOTES.E6, NOTES.G6, NOTES.D6, NOTES.C6][i % 4], 1.4 + i * 0.32, 0.25, "triangle", 0.12);
        [NOTES.D5, NOTES.G5, NOTES.A5, NOTES.D6].forEach((f, i) => this.tone(f, 4.8 + i * 0.18, 0.5, "triangle", 0.25));
        [NOTES.G5, NOTES.C6, NOTES.E6].forEach((f) => this.tone(f, 5.6, 3, "triangle", 0.16)); break;
      case "intro": // un ciel qui tinte, puis se brise : fracas, éclats qui tombent, accord grave
        [NOTES.G6, NOTES.E6, NOTES.C6, NOTES.E6].forEach((f, i) => this.tone(f, i * 0.3, 0.4, "triangle", 0.12));
        this.noise(1.6, 0.7, 0.4); this.tone(NOTES.C6, 1.6, 1.2, "square", 0.15, 0.25); this.tone(NOTES.G5, 1.75, 1.2, "square", 0.12, 0.25);
        [NOTES.C5, NOTES.G5].forEach((f) => this.tone(f / 2, 3, 2.5, "triangle", 0.22)); this.tone(NOTES.E5, 3.2, 2.3, "triangle", 0.14); break;
      case "credits": // générique : mélodie douce, deux phrases
        [NOTES.E5, NOTES.G5, NOTES.A5, NOTES.G5, NOTES.E5, NOTES.D5, NOTES.E5, NOTES.C5,
         NOTES.E5, NOTES.G5, NOTES.C6, NOTES.D6, NOTES.C6, NOTES.A5, NOTES.G5, NOTES.C6].forEach((f, i) => this.tone(f, i * 0.5, 0.6, "triangle", 0.2));
        [0, 2, 4, 6].forEach((b) => this.tone(NOTES.C5 / 2, b, 1.9, "triangle", 0.12)); break;
      case "freed": // serrure qui cède, puis fanfare courte
        this.noise(0.85, 0.12, 0.3); this.tone(NOTES.A5, 0.9, 0.15, "square", 0.15, 0.5); this.tone(NOTES.E5, 1.05, 0.2, "square", 0.12, 0.6);
        [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6].forEach((f, i) => this.tone(f, 1.5 + i * 0.12, 0.35, "square", 0.18));
        [NOTES.E5, NOTES.G5, NOTES.C6].forEach((f) => this.tone(f, 2, 1.4, "triangle", 0.16)); break;
      case "chronicle": // une étoile s'allume : trois notes cristallines et une résonance
        [NOTES.G5, NOTES.C6, NOTES.E6].forEach((f, i) => this.tone(f, 0.5 + i * 0.22, 0.6, "triangle", 0.2));
        this.tone(NOTES.G6, 1.2, 1.8, "triangle", 0.1); this.tone(NOTES.C5, 0.5, 2.2, "triangle", 0.12); break;
      case "hit": if (this.throttle(id, 140)) this.noise(0, 0.05, 0.18); break;
      case "crit": if (this.throttle(id, 200)) { this.noise(0, 0.06, 0.25); this.tone(NOTES.A5, 0, 0.08, "square", 0.15, 0.6); } break;
      case "coin": if (this.throttle(id, 90)) this.coin(1); break;
      case "loot": this.tone(NOTES.C6, 0, 0.08, "triangle", 0.3); this.tone(NOTES.E6, 0.07, 0.12, "triangle", 0.3); break;
      case "legendary":
        [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6, NOTES.E6, NOTES.G6].forEach((f, i) => this.tone(f, i * 0.08, 0.25, "square", 0.22));
        break;
      case "level": [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6].forEach((f, i) => this.tone(f, i * 0.07, 0.14, "triangle", 0.3)); break;
      case "boss": this.tone(110, 0, 0.35, "sawtooth", 0.35, 0.4); this.noise(0, 0.2, 0.3); break;
      case "smash": this.tone(80, 0, 0.3, "square", 0.4, 0.5); this.noise(0, 0.15, 0.35); break;
      // Capacités de boss : un son court et reconnaissable pour chacune (extra = id de la capacité)
      case "bossSkill":
        if (this.throttle("bs-" + extra, 1000)) switch (extra) {
          case "enrage": this.tone(90, 0, 0.35, "sawtooth", 0.3, 0.6); this.noise(0, 0.2, 0.2); break; // grondement
          case "shell": this.tone(1200, 0, 0.08, "square", 0.12); this.tone(900, 0.06, 0.12, "square", 0.1); break; // carapace qui se ferme
          case "frost": this.tone(2200, 0, 0.1, "triangle", 0.1, 1.3); this.tone(3000, 0.05, 0.12, "triangle", 0.07); break; // cristaux
          case "mirror": this.tone(1600, 0, 0.15, "sine", 0.12); this.tone(1650, 0, 0.15, "sine", 0.1); break; // reflet qui vibre
          case "fury": this.tone(180, 0, 0.12, "sawtooth", 0.18, 1.5); break; // montée
          case "bulwark": this.noise(0, 0.12, 0.25); this.tone(140, 0, 0.18, "triangle", 0.2, 0.5); break; // pierre qui se fend
          case "curseBlocked": this.tone(NOTES.E6, 0, 0.1, "triangle", 0.12); this.tone(NOTES.G6, 0.08, 0.16, "triangle", 0.1); break; // parade : tintement clair
          case "tenacious": this.tone(70, 0, 0.3, "sawtooth", 0.28, 2.2); this.noise(0.05, 0.15, 0.2); break; // grondement qui remonte : il se relève
          case "curse": [NOTES.A5, NOTES.E5, NOTES.A5 / 2].forEach((f, i) => this.tone(f * 0.94, i * 0.08, 0.22, "sine", 0.14, 0.92)); break; // accord dissonant qui descend
        }
        break;
      case "event": [NOTES.G5, NOTES.C6, NOTES.G6].forEach((f, i) => this.tone(f, i * 0.06, 0.18, "triangle", 0.25)); break;
      case "star": [NOTES.E6, NOTES.G6, NOTES.C6, NOTES.G6].forEach((f, i) => this.tone(f * 1.0, i * 0.05, 0.2, "sine", 0.3)); break;
      case "chest": this.noise(0, 0.08, 0.2); [NOTES.C5, NOTES.G5, NOTES.C6, NOTES.E6, NOTES.G6].forEach((f, i) => this.tone(f, 0.12 + i * 0.06, 0.16, "square", 0.2)); break;
      case "codex": if (this.throttle(id, 1500)) { this.tone(NOTES.G5, 0, 0.08, "sine", 0.2); this.tone(NOTES.D6, 0.07, 0.14, "sine", 0.2); } break;
      case "ko": this.tone(330, 0, 0.5, "triangle", 0.3, 0.4); break;
      case "tab": if (this.throttle(id, 1500)) { this.tone(NOTES.A5, 0, 0.12, "sine", 0.2); this.tone(NOTES.E6, 0.1, 0.22, "sine", 0.2); } break; // onglet débloqué : doux
      case "quest": if (this.throttle(id, 1000)) { this.tone(NOTES.D6, 0, 0.08, "triangle", 0.22); this.tone(NOTES.G6, 0.07, 0.14, "triangle", 0.22); } break;
      case "record": [NOTES.C5, NOTES.G5, NOTES.C6, NOTES.E6].forEach((f, i) => this.tone(f, i * 0.09, 0.2, "triangle", 0.28)); break;
      case "ascend": [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6, NOTES.E6, NOTES.G6, NOTES.C6 * 2].forEach((f, i) => this.tone(f, i * 0.1, 0.35, "sine", 0.25)); break;
      default: break;
    }
  }

  /** Branche les sons sur les événements du jeu. */
  bind(game) {
    game.on("heroAttack", ({ crit, iai }) => { const m = game.R.mon; this.hit(game.S.cls, m && m.type, crit || iai); });
    game.on("tap", () => this.play("hit"));
    game.on("partnerHit", () => { const m = game.R.mon; if (game.S.partner) this.hit(game.S.partner, m && m.type, false); }); // compagnon du duo
    // Victoire : le tintement de la victoire s'efface si les pièces volent vers la bourse (chacune sonne en rentrant) ;
    // il reste quand aucune pièce n'est animée (mode mini, effets réduits, bande cachée).
    game.on("kill", ({ mon }) => { if (performance.now() - (this.inT || 0) > 3000) this.coin(mon.boss ? 5 : mon.elite ? 3 : 1); if (mon.boss) this.play("boss"); });
    game.on("coinIn", ({ big }) => this.coinIn(big));
    // Moments qui n'avaient pas de son (suite de la demande C) ; les plus fréquents sont limités dans le temps.
    const on = (ev, ms, fn) => game.on(ev, (p) => { if (this.enabled && this.ensure() && this.throttle("ev-" + ev, ms)) fn(p); });
    const N = NOTES;
    on("dodge", 400, () => this.whoosh(0, 0.18, 900, 2600, 0.25, 1.5)); // esquive : souffle bref qui monte
    on("bossDodge", 400, () => this.whoosh(0, 0.18, 2200, 800, 0.2, 1.5)); // le boss esquive : souffle qui descend
    on("riposte", 300, () => { this.tone(2900, 0, 0.05, "square", 0.04); this.tone(1900, 0.02, 0.12, "triangle", 0.08, 0.9); }); // parade : clac métallique
    on("telegraph", 500, () => { this.tone(N.A5, 0, 0.07, "square", 0.07); this.tone(N.A5, 0.12, 0.07, "square", 0.07); }); // le boss prépare un coup : deux bips
    on("potion", 800, () => { for (let i = 0; i < 3; i++) this.tone(320 + i * 90, i * 0.08, 0.07, "sine", 0.12, 1.8); }); // potion : glouglou qui monte
    on("secondWind", 1000, () => { this.tone(60, 0, 0.12, "sine", 0.3); this.tone(60, 0.22, 0.12, "sine", 0.3); [N.C5, N.G5, N.C6].forEach((f, i) => this.tone(f, 0.45 + i * 0.07, 0.25, "triangle", 0.1)); }); // cœur qui bat, puis élan
    on("respawn", 1000, () => [N.C5, N.E5, N.G5].forEach((f, i) => this.tone(f, i * 0.09, 0.2, "sine", 0.09))); // le héros se relève
    on("egg", 1000, () => { this.noise(0, 0.03, 0.12, 3000, 2); this.noise(0.08, 0.03, 0.1, 3400, 2); [N.E6, N.G6].forEach((f, i) => this.tone(f, 0.18 + i * 0.08, 0.18, "sine", 0.1)); }); // coquille, puis surprise
    on("shardDrop", 300, () => { this.tone(N.E6 * 1.5, 0, 0.35, "sine", 0.07); this.tone(N.E6 * 2.25, 0.05, 0.3, "sine", 0.03); }); // éclat d'étoile
    on("petLevel", 1000, () => [N.G5, N.C6, N.E6].forEach((f, i) => this.tone(f, i * 0.06, 0.12, "triangle", 0.12))); // le familier grandit
    on("transmute", 600, () => { this.whoosh(0, 0.5, 600, 3000, 0.15, 3); [N.C6, N.E6, N.G6].forEach((f, i) => this.tone(f, 0.35 + i * 0.05, 0.2, "sine", 0.07)); }); // tourbillon magique
    on("daily", 3000, () => [N.C5, N.E5, N.G5, N.C6, N.G5, N.C6].forEach((f, i) => this.tone(f, i * 0.08, 0.16, "triangle", 0.12))); // récompense du jour
    on("flee", 1000, () => [N.G5, N.E5, N.C5].forEach((f, i) => this.tone(f * 1.2, i * 0.07, 0.1, "square", 0.05))); // le gobelin s'échappe : petite moquerie qui descend
    game.on("loot", ({ item }) => { if (item.r >= 4) this.play("legendary"); else if (item.r >= 2) this.play("loot"); });
    game.on("levelUp", () => this.play("level"));
    game.on("unlock", () => this.play("chest"));
    game.on("smash", () => this.play("smash"));
    game.on("bossSkill", ({ id }) => { if (id !== "smash") this.play("bossSkill", id); }); // smash a déjà son coup
    game.on("event", ({ id }) => { if (this.enabled && this.ensure()) this.eventSound(id); });
    // Étoile filante : sifflement qui descend à son passage ; petite chute de deux notes si elle s'échappe.
    game.on("star", () => { if (this.enabled && this.ensure()) { this.whoosh(0, 0.9, 5000, 1500, 0.35, 4); this.tone(NOTES.E6 * 2, 0, 0.5, "sine", 0.08, 0.5); } });
    game.on("starMissed", () => { if (this.enabled && this.ensure()) { this.tone(NOTES.E6, 0, 0.15, "sine", 0.06); this.tone(NOTES.C6, 0.12, 0.25, "sine", 0.05); } });
    clearInterval(this.ambT);
    this.ambT = setInterval(() => {
      if (document.hidden) return;
      this.eventAmbience(game.R && game.R.events);
      const z = game.zoneDef && game.zoneDef(), S = game.S;
      if (z && S.settings.zoneAmbience !== false) {
        const h = new Date().getHours(), night = S.settings.dayNight !== false && (h >= 21 || h < 6);
        this.zoneAmbience(WEATHER[z.src || z.name] || null, night);
      }
    }, 250);
    game.on("feather", () => this.play("event"));
    game.on("starCaught", () => { this.play("star"); this.coin(4); }); // attrapée : l'étoile tinte, puis l'or tombe
    game.on("chest", () => this.play("chest"));
    game.on("expedition", () => this.play("loot"));
    game.on("codex", () => this.play("codex"));
    game.on("heroDown", () => this.play("ko"));
    // Moments marquants qui n'avaient pas de son
    game.on("cinematic", ({ kind, id }) => { if (kind === "intro" || kind === "credits" || kind === "chronicle" || kind === "freed") this.play(kind, id); });
    game.on("starbreaker", ({ first }) => this.play(first ? "dawn" : "legendary"));
    game.on("zoneUp", ({ zone, record }) => {
      // Arrivée chez le Briseur d'Étoiles (zone 200) : grondement ; grand palier : fanfare ; record : petit son.
      if (record) this.play(zone === 200 ? "doom" : zone % 50 === 0 ? "legendary" : "record");
    });
    game.on("ascend", () => this.play("ascend"));
    game.on("setBonus", () => this.play("level"));
    game.on("bossNemesis", () => this.play("legendary"));
    game.on("questDone", () => this.play("quest"));
  }
}
