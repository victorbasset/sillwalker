// Musique de fond par zone (demande 24 de Victor) : petits airs chiptune originaux, légers, dans l'esprit des jeux
// Game Boy Color (aucune reprise). Rien n'est enregistré : chaque zone a sa graine, d'où sa gamme, son tempo, sa
// grille d'accords et sa mélodie (200 zones = 200 airs). Fondu enchaîné à chaque changement de zone.
// Instruments : mélodie en onde carrée douce, basse triangulaire, charleston de bruit très bas. Volume faible.
import { ZONES } from "../game/data.js";

const MAJOR = [0, 2, 4, 5, 7, 9, 11], MINOR = [0, 2, 3, 5, 7, 8, 10];
const PROG_MAJOR = [[0, 5, 3, 4], [0, 3, 4, 0], [0, 4, 5, 3], [3, 4, 0, 0]];   // I-vi-IV-V…
const PROG_MINOR = [[0, 5, 2, 6], [0, 3, 4, 0], [0, 6, 5, 4], [0, 5, 6, 4]];   // i-VI-III-VII…
const STEPS = 64; // 8 mesures de 8 croches (forme A A B A)

/** Générateur pseudo-aléatoire à graine (même zone = même air). */
function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

/** Clarté d'une couleur « #rrggbb » (0 sombre … 1 clair). */
function light(hex) { const n = parseInt(String(hex).slice(1), 16); return ((n >> 16 & 255) * 0.3 + (n >> 8 & 255) * 0.59 + (n & 255) * 0.11) / 255; }

/**
 * Partition d'une zone : { bpm, notes: [{ step, midi, len }], bass: [{ step, midi, len }], hat }.
 * Forme A A B A sur 8 mesures (motif de 2 mesures repris, pont, retour du motif) : un air qu'on reconnaît en
 * revenant dans la zone (demande de Victor). Même zone = même air, toujours.
 */
export function songFor(zone) {
  const z = Math.max(1, zone | 0), def = ZONES[(z - 1) % ZONES.length], loop = Math.floor((z - 1) / ZONES.length);
  const r = rng(z * 7919 + 13);
  const minor = light(def.sky[0]) < 0.4 || /crypt|abyss|néant|volcan|ossuaire|bastion|maudit|corrompu/i.test(def.name);
  const scale = minor ? MINOR : MAJOR;
  const progA = (minor ? PROG_MINOR : PROG_MAJOR)[Math.floor(r() * 4)], progB = (minor ? PROG_MINOR : PROG_MAJOR)[Math.floor(r() * 4)];
  const root = 57 + Math.floor(r() * 7) + (loop % 3) - 1; // un peu plus aigu d'une boucle des décors à l'autre
  const bpm = Math.round((minor ? 84 : 100) + r() * 26 + loop * 2);
  const deg = (d) => root + 12 * Math.floor(d / 7) + scale[((d % 7) + 7) % 7];
  // Un motif de 2 mesures (16 croches) : note de l'accord sur les temps forts, petits pas entre les deux.
  const phrase = (prog, start) => {
    const out = [];
    let d = 7 + prog[0];
    for (let s = 0; s < 16; s++) {
      if (s % 8 === 0) { d = Math.min(13, 7 + prog[Math.floor(s / 8) + start] + [0, 2, 4][Math.floor(r() * 3)]); out.push({ step: s, midi: deg(d), len: 2 }); s++; continue; }
      if (r() < 0.35) continue; // silence
      d = Math.max(5, Math.min(13, d + [-2, -1, -1, 1, 1, 2, 0][Math.floor(r() * 7)]));
      out.push({ step: s, midi: deg(d), len: r() < 0.25 ? 2 : 1 });
    }
    return out;
  };
  const A = phrase(progA, 0), B = phrase(progB, 0), A2 = phrase(progA, 2);
  const at = (p, off) => p.map((n) => ({ ...n, step: n.step + off }));
  // A A B A' : le motif deux fois à l'identique (mesures 1-4), le pont (5-6), puis la fin du motif (7-8).
  const notes = [...at(A, 0), ...at(A, 16), ...at(B, 32), ...at(A2, 48)];
  const bass = [];
  const prog8 = [progA[0], progA[1], progA[0], progA[1], progB[0], progB[1], progA[2], progA[3]];
  prog8.forEach((c, bar) => { const b = deg(c) - 12; bass.push({ step: bar * 8, midi: b, len: 3 }, { step: bar * 8 + 4, midi: b + 7, len: 3 }); });
  return { bpm, notes, bass, hat: r() < 0.7 };
}

const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

export class Music {
  constructor(sound) {
    this.sound = sound;       // partage le contexte audio et le volume général des effets sonores
    this.enabled = true;
    this.zone = 0;
    this.voice = null;        // { gain, song, step, next }
    this.timer = null;
  }

  /** Musique active si l'option « Musique de fond » l'est et que le son n'est pas coupé (indépendante des effets). */
  set(enabled) {
    this.enabled = !!enabled && !this.sound.muted;
    if (!this.enabled) this.stop();
    else if (this.zone) { const z = this.zone; this.zone = 0; this.setZone(z); }
  }

  /** Change d'air (fondu enchaîné de 2,5 s). */
  setZone(zone) {
    if (zone === this.zone) return;
    this.zone = zone;
    if (!this.enabled) return;
    const ctx = this.sound.audio();
    if (!ctx) return;
    const t = ctx.currentTime, old = this.voice;
    if (old) { old.gain.gain.cancelScheduledValues(t); old.gain.gain.setValueAtTime(old.gain.gain.value, t); old.gain.gain.linearRampToValueAtTime(0, t + 2.5); old.dying = t + 2.6; }
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(0.32, t + 2.5); // bas : ne pas déranger
    gain.connect(this.sound.master);
    this.voice = { gain, song: songFor(zone), step: 0, next: t + 0.1 };
    this.old = old;
    if (!this.timer) this.timer = setInterval(() => this.pump(), 120);
  }

  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    for (const v of [this.voice, this.old]) if (v) try { v.gain.disconnect(); } catch { /* déjà débranché */ }
    this.voice = this.old = null;
  }

  /** Programme les notes des 0,4 s à venir (planification en avance, horloge audio). */
  pump() {
    const ctx = this.sound.ctx;
    if (!ctx || !this.voice) return;
    if (this.old && ctx.currentTime > this.old.dying) { try { this.old.gain.disconnect(); } catch { /* */ } this.old = null; }
    const v = this.voice, stepDur = 60 / v.song.bpm / 2;
    while (v.next < ctx.currentTime + 0.4) {
      const s = v.step % STEPS, t = v.next;
      for (const n of v.song.notes) if (n.step === s) this.note(v.gain, "square", hz(n.midi), t, n.len * stepDur * 0.9, 0.09);
      for (const n of v.song.bass) if (n.step === s) this.note(v.gain, "triangle", hz(n.midi), t, n.len * stepDur * 0.9, 0.22);
      if (v.song.hat && s % 2 === 1) this.hat(v.gain, t);
      v.step++; v.next += stepDur;
    }
  }

  note(dest, type, f, t, dur, vol) {
    const ctx = this.sound.ctx, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + 0.02);
  }

  hat(dest, t) {
    const ctx = this.sound.ctx, n = Math.floor(ctx.sampleRate * 0.03);
    if (!this.hatBuf) { this.hatBuf = ctx.createBuffer(1, n, ctx.sampleRate); const d = this.hatBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n); }
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = this.hatBuf; g.gain.value = 0.025;
    s.connect(g); g.connect(dest); s.start(t);
  }
}
