// Effets sonores synthétisés (Web Audio, aucun fichier). Coupés par défaut :
// Sillwalker vit en bas de l'écran pendant qu'on fait autre chose.
// Chaque son est limité en fréquence pour ne jamais devenir agaçant.

const NOTES = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G6: 1568, D6: 1174.66 };

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

  play(id) {
    if (!this.enabled || !this.ensure()) return;
    switch (id) {
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
    game.on("heroAttack", ({ crit, iai }) => this.play(crit || iai ? "crit" : "hit"));
    game.on("tap", () => this.play("hit"));
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
    game.on("starbreaker", () => this.play("legendary"));
    game.on("zoneUp", ({ zone, record }) => { if (record) this.play(zone % 50 === 0 ? "legendary" : "record"); });
    game.on("ascend", () => this.play("ascend"));
    game.on("setBonus", () => this.play("level"));
    game.on("bossNemesis", () => this.play("legendary"));
    game.on("questDone", () => this.play("quest"));
  }
}
