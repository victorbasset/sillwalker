// Effets sonores synthétisés (Web Audio, aucun fichier). Coupés par défaut :
// Sillwalker vit en bas de l'écran pendant qu'on fait autre chose.
// Chaque son est limité en fréquence pour ne jamais devenir agaçant.

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
    if (now - (this.last[id] || 0) < ms) return false;
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

  noise(start, dur, gain = 0.3) {
    const ctx = this.ctx, t = ctx.currentTime + start, n = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = buf; g.gain.value = gain;
    s.connect(g); g.connect(this.master);
    s.start(t);
  }

  /** Coup du héros : timbre de son arme, modifié par la matière de l'ennemi ; plus fort et plus clair en critique. */
  hit(cls, monType, crit) {
    if (!this.enabled || !this.ensure() || !this.throttle("hit", 140)) return;
    const w = weaponOf(cls), mat = materialOf(monType);
    const p = (mat === "soft" ? 0.72 : mat === "hard" ? 1.25 : mat === "air" ? 1.12 : 1) * (0.94 + Math.random() * 0.12) * (crit ? 1.15 : 1);
    const g = crit ? 1.35 : 1;
    switch (w) {
      case "blade": this.noise(0, 0.045, 0.16 * g); this.tone(1400 * p, 0, 0.06, "square", 0.05 * g, 0.5); break;
      case "blunt": this.noise(0, 0.07, 0.2 * g); this.tone(150 * p, 0, 0.1, "triangle", 0.3 * g, 0.55); break;
      case "spear": this.noise(0, 0.035, 0.15 * g); this.tone(900 * p, 0, 0.05, "triangle", 0.12 * g, 0.7); break;
      case "bow": this.tone(720 * p, 0, 0.09, "triangle", 0.16 * g, 0.5); this.noise(0.02, 0.02, 0.06 * g); break;
      case "fire": this.noise(0, 0.12, 0.1 * g); this.tone(220 * p, 0, 0.12, "square", 0.06 * g, 0.5); break;
      case "ice": this.tone(1800 * p, 0, 0.07, "triangle", 0.1 * g, 1.4); this.tone(2600 * p, 0.03, 0.05, "triangle", 0.06 * g); break;
      case "shadow": this.tone(320 * p, 0, 0.11, "triangle", 0.14 * g, 1.4); break;
      case "holy": this.tone(880 * p, 0, 0.1, "triangle", 0.11 * g); this.tone(1320 * p, 0.02, 0.1, "triangle", 0.07 * g); break;
      case "note": this.tone([523, 587, 659, 784][Math.floor(Math.random() * 4)] * p, 0, 0.12, "triangle", 0.13 * g); break;
    }
    // Impact selon la matière : « splotch » mou, clac sec, souffle léger.
    if (mat === "soft") this.tone(110 * p, 0.02, 0.08, "triangle", 0.12 * g, 0.6);
    else if (mat === "hard") this.tone(2200 * p, 0.015, 0.03, "square", 0.04 * g);
  }

  play(id) {
    if (!this.enabled || !this.ensure()) return;
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
      case "coin": if (this.throttle(id, 90)) { this.tone(NOTES.E6, 0, 0.06, "square", 0.12); this.tone(NOTES.G6, 0.05, 0.1, "square", 0.12); } break;
      case "loot": this.tone(NOTES.C6, 0, 0.08, "triangle", 0.3); this.tone(NOTES.E6, 0.07, 0.12, "triangle", 0.3); break;
      case "legendary":
        [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6, NOTES.E6, NOTES.G6].forEach((f, i) => this.tone(f, i * 0.08, 0.25, "square", 0.22));
        break;
      case "level": [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6].forEach((f, i) => this.tone(f, i * 0.07, 0.14, "triangle", 0.3)); break;
      case "boss": this.tone(110, 0, 0.35, "sawtooth", 0.35, 0.4); this.noise(0, 0.2, 0.3); break;
      case "smash": this.tone(80, 0, 0.3, "square", 0.4, 0.5); this.noise(0, 0.15, 0.35); break;
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
    game.on("kill", ({ mon }) => { this.play("coin"); if (mon.boss) this.play("boss"); });
    game.on("loot", ({ item }) => { if (item.r >= 4) this.play("legendary"); else if (item.r >= 2) this.play("loot"); });
    game.on("levelUp", () => this.play("level"));
    game.on("unlock", () => this.play("chest"));
    game.on("smash", () => this.play("smash"));
    game.on("event", () => this.play("event"));
    game.on("feather", () => this.play("event"));
    game.on("starCaught", () => this.play("star"));
    game.on("chest", () => this.play("chest"));
    game.on("expedition", () => this.play("loot"));
    game.on("codex", () => this.play("codex"));
    game.on("heroDown", () => this.play("ko"));
    // Moments marquants qui n'avaient pas de son
    game.on("cinematic", ({ kind }) => { if (kind === "intro" || kind === "credits" || kind === "chronicle" || kind === "freed") this.play(kind); });
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
