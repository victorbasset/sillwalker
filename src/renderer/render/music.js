// Musique de fond (demande 24 de Victor ; it. 520-521 : « un mélange de Terraria et de Lofi Girl », un air toutes les
// 5 zones) : airs originaux générés (aucune reprise, rien d'enregistré). La 1re zone de chaque tranche donne la graine,
// d'où la gamme, le tempo, la grille d'accords, la mélodie et la couleur du décor. Fondu enchaîné au changement d'air.
// Instruments : mélodie en onde carrée douce, basse triangulaire, charleston de bruit très bas. Volume faible.
import { ZONES } from "../game/data.js";

const MAJOR = [0, 2, 4, 5, 7, 9, 11], MINOR = [0, 2, 3, 5, 7, 8, 10];
// Grilles (it. 520, demande de Victor : « un mélange de Terraria et de Lofi Girl ») : enchaînements jazzy (ii-V-I,
// I-vi-ii-V…) joués en accords de septième par un piano électrique doux.
const PROG_MAJOR = [[0, 5, 3, 4], [1, 4, 0, 0], [0, 5, 1, 4], [3, 2, 1, 0], [0, 3, 2, 5], [3, 4, 2, 5]];
const PROG_MINOR = [[0, 5, 2, 6], [0, 3, 6, 2], [0, 6, 5, 4], [3, 6, 2, 5], [0, 3, 4, 0], [5, 4, 0, 0]];
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
export function songFor(zone, pass = 0) {
  const z = Math.max(1, zone | 0), def = ZONES[(z - 1) % ZONES.length], loop = Math.floor((z - 1) / ZONES.length);
  const r = rng(z * 7919 + 13), rBase = r;
  const minor = light(def.sky[0]) < 0.4 || /crypt|abyss|néant|volcan|ossuaire|bastion|maudit|corrompu/i.test(def.name);
  const scale = minor ? MINOR : MAJOR;
  const PR = minor ? PROG_MINOR : PROG_MAJOR;
  const progA = PR[Math.floor(r() * PR.length)], progB = PR[Math.floor(r() * PR.length)];
  const root = 57 + Math.floor(r() * 7) + (loop % 3) - 1; // un peu plus aigu d'une boucle des décors à l'autre
  // Lofi : tempo posé (68 à 90), un peu plus lent dans les zones sombres.
  const bpm = Math.min(92, Math.round((minor ? 68 : 74) + r() * 14 + loop));
  const deg = (d) => root + 12 * Math.floor(d / 7) + scale[((d % 7) + 7) % 7];
  // Un motif de 2 mesures (16 croches) : note de l'accord sur les temps forts, petits pas entre les deux.
  const phrase = (prog, start, r = rBase) => {
    const out = [];
    let d = 7 + prog[0];
    for (let s = 0; s < 16; s++) {
      if (s % 8 === 0) { d = Math.min(13, 7 + prog[Math.floor(s / 8) + start] + [0, 2, 4][Math.floor(r() * 3)]); out.push({ step: s, midi: deg(d), len: 2 }); s++; continue; }
      if (r() < 0.5) continue; // silence : une mélodie qui respire (lofi)
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
  // Timbre de la mélodie selon le décor (la couleur « Terraria » de chaque zone) ; les ondes carrées restent rares et douces.
  const LEADS = { wood: ["flute", "pluck", "marimba", "whistle"], ice: ["bell", "marimba", "flute", "epiano"], fire: ["strings", "pluck", "pulse25", "epiano"],
    dark: ["bell", "strings", "epiano", "pulse12"], sea: ["marimba", "flute", "pluck", "bell"], sky: ["whistle", "bell", "flute", "pulse12"],
    any: ["pulse12", "pulse25", "flute", "pluck", "bell", "marimba", "strings", "whistle", "epiano"] };
  const lead = r() < 0.75 ? pickOf(LEADS[mood]) : pickOf(LEADS.any);
  const bassInst = pickOf(mood === "dark" || mood === "fire" ? ["sub", "sub", "triangle", "pulsebass"] : ["sub", "triangle", "pluckbass"]);
  // Percussions lofi (boom-bap feutré) le plus souvent ; parfois juste un shaker ou rien.
  const drums = pickOf(["lofi", "lofi", "lofi2", "lofi2", "shaker", "soft", "none"]);
  // Accords de septième au piano électrique, une fois par mesure, parfois relancés à contretemps.
  const resync = r() < 0.5, chords = [];
  prog8.forEach((c, bar) => { const ch = [0, 2, 4, 6].map((k) => deg(c + k)); chords.push({ step: bar * 8, notes: ch, len: resync ? 5 : 7 }); if (resync) chords.push({ step: bar * 8 + 5, notes: ch, len: 3 }); });
  const swing = 0.16 + r() * 0.12; // retard des croches à contretemps (balancement lofi)
  // Voix d'accompagnement : arpège des accords ou tierce sous la mélodie (pas les deux).
  const extra = r(), arp = extra < 0.3 ? pickOf(["pluck", "bell", "marimba"]) : null, harm = extra >= 0.3 && extra < 0.45;
  const arps = [];
  if (arp) prog8.forEach((c, bar) => { for (let k = 0; k < 4; k++) arps.push({ step: bar * 8 + k * 2, midi: deg(c + [0, 2, 4, 7][k]) + 12, len: 1 }); });
  // Couleur du décor (it. 521) : passe-bas plus ou moins ouvert, écho plus ou moins présent.
  const COLOR = { wood: [2600, 0.18], ice: [3400, 0.3], fire: [2200, 0.12], dark: [1700, 0.22], sea: [2400, 0.34], sky: [3600, 0.3], any: [2600, 0.18] };
  const [cutoff, echo] = COLOR[mood];
  const song = { bpm, notes, bass, hat: drums !== "none", lead, bassInst, drums, arp, arps, harm, chords, swing, vinyl: true, cutoff, echo, mood };
  if (!(pass > 0)) return song;
  // Passages suivants (demande C de Victor : « moins répétitives ») : le motif A reste (on reconnaît la zone), le
  // reste varie à chaque passage ; un intermède calme tous les 4 passages, un silence tous les 8 pour respirer.
  // Tirage à part (graine zone + passage) : le passage 0 reste exactement l'air d'avant.
  const r2 = rng(z * 7919 + 13 + pass * 104729), pick2 = (list) => list[Math.floor(r2() * list.length)];
  if (pass % 8 === 7) return { ...song, notes: [], bass: [], arps: [], chords: [], arp: null, drums: "none", hat: false, harm: false, rest: true };
  if (pass % 4 === 3) { // intermède : basse tenue et quelques notes de cloche sur les temps forts, sans percussions
    const calm = notes.filter((nt) => nt.step % 8 === 0).map((nt) => ({ ...nt, len: 4 }));
    return { ...song, notes: calm, lead: pick2(["bell", "marimba", "flute", "epiano"]), drums: "none", hat: false, harm: false, arp: null, arps: [], calm: true };
  }
  const B2 = phrase(progB, 0, r2), A3 = phrase(progA, 2, r2), A4 = phrase(progA, 0, r2);
  let vnotes = [...at(A, 0), ...at(r2() < 0.5 ? A : A4, 16), ...at(B2, 32), ...at(A3, 48)];
  const lead2 = r2() < 0.5 ? lead : pick2(LEADS[mood]);
  if (r2() < 0.3 && lead2 !== "whistle") vnotes = vnotes.map((nt) => ({ ...nt, midi: nt.midi + 12 })); // une octave plus haut
  const drums2 = r2() < 0.6 ? drums : pick2(["lofi", "lofi2", "shaker", "soft"]);
  return { ...song, notes: vnotes, lead: lead2, drums: drums2, hat: drums2 !== "none", harm: r2() < 0.3 ? !harm : harm };
}

/** Demande de Victor (it. 521, « ça change trop régulièrement ») : un même air pour 5 zones de suite (1-5, 6-10…),
 *  celui de la première zone de la tranche. */
export const MUSIC_BLOCK = 5;
export const musicZone = (zone) => Math.floor((Math.max(1, zone | 0) - 1) / MUSIC_BLOCK) * MUSIC_BLOCK + 1;

// Formes d'onde « pulse » (rapport cyclique 12,5 / 25 / 50 %) façon Game Boy, par séries de Fourier.
const PULSES = { pulse12: 0.125, pulse25: 0.25, pulse50: 0.5 };

const MUSIC_GAIN = 0.32; // niveau d'origine de la musique (multiplié par le réglage « Musique »)
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

  /** Volume propre de la musique (Réglages, 0 à 2 ; 1 = niveau d'origine) : appliqué tout de suite à l'air en cours. */
  setLevel(level) {
    this.level = Math.max(0, Math.min(2, +level || 0));
    const ctx = this.sound.ctx, v = this.voice;
    if (ctx && v && !v.dying) { const t = ctx.currentTime; v.gain.gain.cancelScheduledValues(t); v.gain.gain.setTargetAtTime(MUSIC_GAIN * this.level, t, 0.15); }
  }

  /** Change d'air (fondu enchaîné de 2,5 s) : un air par tranche de MUSIC_BLOCK zones (demande de Victor). */
  setZone(zone) {
    zone = musicZone(zone);
    if (zone === this.zone) return;
    this.zone = zone;
    if (!this.enabled) return;
    const ctx = this.sound.audio();
    if (!ctx) return;
    const t = ctx.currentTime, old = this.voice;
    if (old) { old.gain.gain.cancelScheduledValues(t); old.gain.gain.setValueAtTime(old.gain.gain.value, t); old.gain.gain.linearRampToValueAtTime(0, t + 2.5); old.dying = t + 2.6; }
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(MUSIC_GAIN * (this.level ?? 1), t + 2.5); // bas : ne pas déranger
    // Son chaud et feutré (lofi) : un passe-bas sur toute la musique.
    const song = songFor(zone);
    const flt = ctx.createBiquadFilter(); flt.type = "lowpass"; flt.frequency.value = song.cutoff || 2600; flt.Q.value = 0.5;
    gain.connect(flt); flt.connect(this.sound.master);
    // Écho doux (couleur du décor) : une croche pointée, quelques répétitions qui s'éteignent.
    const dl = ctx.createDelay(1), fb = ctx.createGain(), wet = ctx.createGain();
    dl.delayTime.value = Math.min(0.9, 60 / song.bpm * 0.75); fb.gain.value = 0.32; wet.gain.value = song.echo || 0;
    flt.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(this.sound.master);
    this.voice = { gain, flt, wet, dl, fb, song, step: 0, next: t + 0.1 };
    this.old = old;
    if (!this.timer) this.timer = setInterval(() => this.pump(), 120);
  }

  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    for (const v of [this.voice, this.old]) if (v) try { v.gain.disconnect(); v.flt?.disconnect(); v.wet?.disconnect(); v.dl?.disconnect(); v.fb?.disconnect(); } catch { /* déjà débranché */ }
    this.voice = this.old = null;
  }

  /** Programme les notes des 0,4 s à venir (planification en avance, horloge audio). */
  pump() {
    const ctx = this.sound.ctx;
    if (!ctx || !this.voice) return;
    // Ancien air éteint (écho compris : la boucle retard-réinjection doit être débranchée, sinon elle reste en mémoire).
    if (this.old && ctx.currentTime > this.old.dying + 3) { try { this.old.gain.disconnect(); this.old.flt?.disconnect(); this.old.wet?.disconnect(); this.old.dl?.disconnect(); this.old.fb?.disconnect(); } catch { /* */ } this.old = null; }
    const v = this.voice, stepDur = 60 / v.song.bpm / 2;
    while (v.next < ctx.currentTime + 0.4) {
      const s = v.step % STEPS;
      // Nouveau passage : variation de l'air (même tempo), intermède ou silence (songFor, demande C).
      if (s === 0 && v.step > 0) v.song = songFor(this.zone, Math.floor(v.step / STEPS));
      this.scheduleStep(v.gain, v.song, s, v.next, stepDur, this.boss);
      v.step++; v.next += stepDur;
    }
  }

  /** Un pas (croche) d'un air, programmé à l'instant base : le jeu (pump) et le rendu hors ligne (schedulePass, autotest)
   *  passent par ici, l'autotest mesure donc exactement ce que le joueur entend. boss : combat de boss (plus intense). */
  scheduleStep(dest, song, s, base, stepDur, boss = false) {
    // Swing : les croches à contretemps arrivent un peu en retard.
    const t = base + (s % 2 ? (song.swing || 0) * stepDur : 0);
    if (song.chords) for (const c of song.chords) if (c.step === s) for (const m of c.notes) this.play(dest, "epiano", hz(m), t, c.len * stepDur * 0.95, 0.55);
    // Craquements de vinyle : quelques petits clics très bas.
    if (song.vinyl && Math.random() < 0.18) this.noiseHit(dest, base + Math.random() * stepDur, 0.006, 0.01 + Math.random() * 0.012, 3000);
    for (const n of song.notes) if (n.step === s) {
      this.play(dest, song.lead || "pulse50", hz(n.midi), t, n.len * stepDur * 0.9, 1);
      // tierce dessous
      if (song.harm) this.play(dest, song.lead || "pulse50", hz(n.midi - 4), t, n.len * stepDur * 0.9, 0.5);
    }
    for (const n of song.bass) if (n.step === s) {
      this.play(dest, song.bassInst || "triangle", hz(n.midi), t, n.len * stepDur * 0.9, 1);
      // combat de boss : basse doublée plus grave
      if (boss) this.play(dest, "sub", hz(n.midi - 12), t, n.len * stepDur * 0.9, 0.6);
    }
    if (song.arp) for (const n of song.arps) if (n.step === s) this.play(dest, song.arp, hz(n.midi), t, stepDur * 1.6, 0.45);
    // Combat de boss : percussions lourdes, même pendant un intermède ou un silence (la tension monte).
    this.drum(dest, boss ? "heavy" : song.drums || (song.hat ? "soft" : "none"), s, t);
  }

  /** Rendu hors ligne d'un passage complet (autotest, extraits) : même chaîne que setZone (passe-bas, écho), notes
   *  programmées d'un coup à partir de t0. Renvoie la durée du passage. */
  schedulePass(song, t0 = 0.05, boss = false) {
    const ctx = this.sound.ctx, gain = ctx.createGain(); gain.gain.value = MUSIC_GAIN;
    const flt = ctx.createBiquadFilter(); flt.type = "lowpass"; flt.frequency.value = song.cutoff || 2600; flt.Q.value = 0.5;
    const dl = ctx.createDelay(1), fb = ctx.createGain(), wet = ctx.createGain();
    dl.delayTime.value = Math.min(0.9, 60 / song.bpm * 0.75); fb.gain.value = 0.32; wet.gain.value = song.echo || 0;
    gain.connect(flt); flt.connect(this.sound.master); flt.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(this.sound.master);
    const stepDur = 60 / song.bpm / 2;
    for (let s = 0; s < STEPS; s++) this.scheduleStep(gain, song, s, t0 + s * stepDur, stepDur, boss);
    return STEPS * stepDur;
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
      case "epiano": { // piano électrique doux (façon Rhodes) : sinus + harmonique légère, attaque ronde
        // (it. 528 : 2 oscillateurs par note au lieu de 4 : la musique coûtait ≈ 4,5 points de processeur)
        const [g, v] = out(0.1); env(g, v, 0.012, dur + 0.3); osc("sine", f, g, 3);
        const [g2, v2] = out(0.018); env(g2, v2, 0.005, Math.min(dur, 0.5)); osc("sine", f * 2, g2);
        break;
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
    if (kit === "lofi" || kit === "lofi2") { // boom-bap feutré : grosse caisse ronde, caisse claire étouffée sur 2 et 4, charleston doux
      if (beat === 0 || (kit === "lofi" ? beat === 5 : beat === 3 || beat === 7 && s % 16 === 15)) this.kick(dest, t, 0.26);
      if (beat === 2 || beat === 6) { this.noiseHit(dest, t, 0.11, 0.035, 1400); this.noiseHit(dest, t, 0.03, 0.02, 4000); }
      this.noiseHit(dest, t, 0.02, s % 2 ? 0.014 : 0.009, 8000);
      return;
    }
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
