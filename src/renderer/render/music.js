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
  // Orchestration (demande de Victor : bien plus de diversité d'instruments) : selon le décor, puis la graine.
  const n = def.name.toLowerCase(), pickOf = (list) => list[Math.floor(r() * list.length)];
  const mood = /forêt|jungle|verger|bois|champignon/.test(n) ? "wood" : /toundra|glac|neige|cristal|givr/.test(n) ? "ice"
    : /volcan|lave|forge|abysses ardents|cœur/.test(n) ? "fire" : /crypt|ossuaire|égout|grotte|maudit|néant|bastion|mines/.test(n) ? "dark"
    : /récif|lagon|cité engloutie|côte|marais/.test(n) ? "sea" : /ruines célestes|nid|tempête|pic/.test(n) ? "sky" : "any";
  const LEADS = { wood: ["flute", "pluck", "pulse25", "whistle"], ice: ["bell", "marimba", "flute", "pulse12"], fire: ["brass", "strings", "pulse50", "pulse25"],
    dark: ["organ", "bell", "strings", "pulse12"], sea: ["marimba", "flute", "pluck", "bell"], sky: ["whistle", "bell", "pulse25", "flute"],
    any: ["pulse12", "pulse25", "pulse50", "flute", "pluck", "bell", "organ", "brass", "marimba", "strings", "whistle"] };
  const lead = r() < 0.75 ? pickOf(LEADS[mood]) : pickOf(LEADS.any);
  const bassInst = pickOf(mood === "dark" || mood === "fire" ? ["pulsebass", "sub", "triangle"] : ["triangle", "sub", "pluckbass", "pulsebass"]);
  const drums = pickOf(minor ? ["march", "heavy", "soft", "none"] : ["shuffle", "march", "soft", "shaker", "none"]);
  // Voix d'accompagnement : arpège des accords ou tierce sous la mélodie (pas les deux).
  const extra = r(), arp = extra < 0.4 ? pickOf(["pluck", "bell", "pulse12", "marimba"]) : null, harm = extra >= 0.4 && extra < 0.7;
  const arps = [];
  if (arp) prog8.forEach((c, bar) => { for (let k = 0; k < 4; k++) arps.push({ step: bar * 8 + k * 2, midi: deg(c + [0, 2, 4, 7][k]) + 12, len: 1 }); });
  return { bpm, notes, bass, hat: drums !== "none", lead, bassInst, drums, arp, arps, harm };
}

// Formes d'onde « pulse » (rapport cyclique 12,5 / 25 / 50 %) façon Game Boy, par séries de Fourier.
const PULSES = { pulse12: 0.125, pulse25: 0.25, pulse50: 0.5 };

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
    const v = this.voice, song = v.song, stepDur = 60 / song.bpm / 2;
    while (v.next < ctx.currentTime + 0.4) {
      const s = v.step % STEPS, t = v.next;
      for (const n of song.notes) if (n.step === s) {
        this.play(v.gain, song.lead || "pulse50", hz(n.midi), t, n.len * stepDur * 0.9, 1);
        if (song.harm) this.play(v.gain, song.lead || "pulse50", hz(n.midi - 4), t, n.len * stepDur * 0.9, 0.5); // tierce dessous
      }
      for (const n of song.bass) if (n.step === s) this.play(v.gain, song.bassInst || "triangle", hz(n.midi), t, n.len * stepDur * 0.9, 1);
      if (song.arp) for (const n of song.arps) if (n.step === s) this.play(v.gain, song.arp, hz(n.midi), t, stepDur * 1.6, 0.45);
      this.drum(v.gain, song.drums || (song.hat ? "soft" : "none"), s, t);
      v.step++; v.next += stepDur;
    }
  }

  /** Une note d'un instrument : oscillateur(s), enveloppe et filtre propres à chaque timbre. */
  play(dest, inst, f, t, dur, k) {
    const ctx = this.sound.ctx;
    const env = (g, peak, a, d) => { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(a + 0.02, d)); };
    const osc = (type, freq, g, detune = 0) => {
      const o = ctx.createOscillator();
      if (PULSES[type]) o.setPeriodicWave(this.pulseWave(type)); else o.type = type;
      o.frequency.setValueAtTime(freq, t); if (detune) o.detune.setValueAtTime(detune, t);
      o.connect(g); o.start(t); o.stop(t + dur + 0.6); return o;
    };
    const out = (vol) => { const g = ctx.createGain(); g.connect(dest); return [g, vol * k]; };
    switch (inst) {
      case "pulse12": case "pulse25": case "pulse50": { const [g, v] = out(0.08); env(g, v, 0.01, dur); osc(inst, f, g); break; }
      case "flute": { const [g, v] = out(0.13); env(g, v, 0.06, dur); const o = osc("sine", f, g); const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 5.5; lg.gain.value = f * 0.012; lfo.connect(lg); lg.connect(o.frequency); lfo.start(t); lfo.stop(t + dur + 0.6); break; }
      case "whistle": { const [g, v] = out(0.1); env(g, v, 0.03, dur); osc("sine", f * 2, g); break; }
      case "bell": { const [g, v] = out(0.12); env(g, v, 0.005, dur + 0.5); osc("sine", f, g); const [g2, v2] = out(0.05); env(g2, v2, 0.005, dur * 0.6); osc("sine", f * 2.76, g2); break; }
      case "marimba": { const [g, v] = out(0.15); env(g, v, 0.004, Math.min(dur, 0.35)); osc("sine", f, g); const [g2, v2] = out(0.04); env(g2, v2, 0.003, 0.08); osc("sine", f * 4, g2); break; }
      case "pluck": { const [g, v] = out(0.12); env(g, v, 0.004, Math.min(dur, 0.4)); osc("triangle", f, g); break; }
      case "organ": { const [g, v] = out(0.06); env(g, v, 0.02, dur); osc("sine", f, g); osc("sine", f * 2, g); osc("sine", f * 3, g, 3); break; }
      case "brass": case "strings": {
        const flt = ctx.createBiquadFilter(); flt.type = "lowpass"; flt.Q.value = inst === "brass" ? 4 : 1;
        flt.frequency.setValueAtTime(inst === "brass" ? f * 1.5 : f * 3, t); if (inst === "brass") flt.frequency.exponentialRampToValueAtTime(f * 5, t + 0.08);
        const [g, v] = out(inst === "brass" ? 0.07 : 0.06); flt.connect(g);
        const g0 = ctx.createGain(); g0.connect(flt); env(g0, 1, inst === "brass" ? 0.03 : 0.12, dur);
        osc("sawtooth", f, g0); if (inst === "strings") osc("sawtooth", f, g0, 9); g.gain.value = v; break;
      }
      case "sub": { const [g, v] = out(0.3); env(g, v, 0.01, dur); osc("sine", f, g); break; }
      case "pulsebass": { const [g, v] = out(0.08); env(g, v, 0.01, dur); osc("pulse25", f, g); break; }
      case "pluckbass": { const [g, v] = out(0.25); env(g, v, 0.004, Math.min(dur, 0.3)); osc("triangle", f, g); break; }
      default: { const [g, v] = out(0.22); env(g, v, 0.01, dur); osc("triangle", f, g); }
    }
  }

  pulseWave(type) {
    this.waves ||= {};
    if (!this.waves[type]) {
      const d = PULSES[type], N = 32, re = new Float32Array(N), im = new Float32Array(N);
      for (let n = 1; n < N; n++) im[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * d);
      this.waves[type] = this.sound.ctx.createPeriodicWave(re, im);
    }
    return this.waves[type];
  }

  /** Percussions : charleston, grosse caisse (sinus qui descend), caisse claire (bruit), shaker. */
  drum(dest, kit, s, t) {
    if (kit === "none") return;
    const beat = s % 8;
    if (kit === "soft") { if (s % 2 === 1) this.noiseHit(dest, t, 0.03, 0.022, 7000); return; }
    if (kit === "shaker") { this.noiseHit(dest, t, 0.04, s % 2 ? 0.02 : 0.012, 9000); if (beat === 0) this.kick(dest, t, 0.25); return; }
    if (beat === 0 || (kit === "heavy" && beat === 3)) this.kick(dest, t, kit === "heavy" ? 0.4 : 0.3);
    if (beat === 4) this.noiseHit(dest, t, 0.09, 0.06, 2500);
    if (kit === "shuffle" ? s % 3 === 1 : s % 2 === 1) this.noiseHit(dest, t, 0.025, 0.02, 7000);
  }

  kick(dest, t, vol) {
    const ctx = this.sound.ctx, o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + 0.17);
  }

  noiseHit(dest, t, len, vol, cut) {
    const ctx = this.sound.ctx;
    if (!this.noiseBuf) { const n = Math.floor(ctx.sampleRate * 0.12); this.noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate); const d = this.noiseBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; }
    const s = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    f.type = "highpass"; f.frequency.value = cut;
    s.buffer = this.noiseBuf; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    s.connect(f); f.connect(g); g.connect(dest); s.start(t); s.stop(t + len + 0.01);
  }
}
