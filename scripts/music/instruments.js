// Instruments de la bande originale (docs/MUSIQUE.md). Chaque instrument : (studio, piste, t, midi, durée, vélocité…).
// Rendu hors ligne : la synthèse peut être riche (plusieurs oscillateurs par note, filtres animés, Karplus-Strong,
// formants). Les oscillateurs mélodiques se branchent sur le pleurage de bande commun (st.wobble).
import { hz } from "./engine.js";

const env = (g, t, a, peak, d, s, rel, end) => {
  // attaque, décroissance vers le palier, relâchement après la fin de la note
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a);
  g.gain.setTargetAtTime(peak * s, t + a, d);
  g.gain.setValueAtTime(peak * s, Math.max(end, t + a)); g.gain.setTargetAtTime(0, Math.max(end, t + a), rel);
};
const osc = (c, type, f, t, stop, detune = 0) => { const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = detune; o.start(t); o.stop(stop); return o; };
/** Vibrato : un oscillateur lent sur la hauteur (cents), qui s'installe après `delay` secondes. */
function vibrato(c, o, t, stop, rate, cents, delay = 0.25) {
  const l = c.createOscillator(), g = c.createGain(); l.frequency.value = rate;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(cents, t + delay + 0.3);
  l.connect(g); g.connect(o.detune); l.start(t); l.stop(stop);
}

// ---------------------------------------------------------------- claviers et cordes pincées

/** Piano électrique (façon Rhodes) en FM : porteuse modulée ×1 dont l'indice décroît (attaque « tine »), cloche ×14
 *  très courte, deuxième porteuse désaccordée (chœur). */
export function epiano(st, ch, t, m, dur, vel = 0.8, { bright = 1 } = {}) {
  [t, vel] = st.humanize(t, vel, 0.008, 0.08);
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 2.5;
  const out = c.createGain(); env(out, t, 0.004, 0.22 * vel, 1.2, 0.35, 0.35, end); out.connect(ch.in);
  const car = st.wobble(osc(c, "sine", f, t, stop)), mod = st.wobble(osc(c, "sine", f, t, stop)), mg = c.createGain();
  mg.gain.setValueAtTime(f * 2.2 * vel * bright, t); mg.gain.setTargetAtTime(f * 0.35 * bright, t, 0.12);
  mod.connect(mg); mg.connect(car.frequency); car.connect(out);
  const tine = osc(c, "sine", f * 14, t, t + 0.2), tg = c.createGain(); tg.gain.setValueAtTime(0.03 * vel * bright, t); tg.gain.setTargetAtTime(0, t, 0.015); tine.connect(tg); tg.connect(out);
  const car2 = st.wobble(osc(c, "sine", f, t, stop, 6)), g2 = c.createGain(); g2.gain.value = 0.35; car2.connect(g2); g2.connect(out);
}

/** Guitare / harpe pincée : Karplus-Strong calculé dans un tampon (corde amortie), caisse de résonance. */
const ksCache = new Map();
function ksBuffer(c, m, bright, len) {
  const key = m + ":" + bright + ":" + len;
  let buf = ksCache.get(key);
  if (buf) return buf;
  const sr = c.sampleRate, n = Math.floor(sr * len), f = hz(m), N = Math.max(2, Math.round(sr / f)), b = c.createBuffer(1, n, sr), d = b.getChannelData(0);
  const line = new Float32Array(N); let r = 12345 + m * 7;
  for (let i = 0; i < N; i++) { r = (r * 1103515245 + 12345) >>> 0; line[i] = ((r / 4294967296) * 2 - 1); }
  let idx = 0; const damp = 0.5 + bright * 0.45, loss = 0.9965 - (m < 48 ? 0.002 : 0);
  for (let i = 0; i < n; i++) {
    const a = line[idx], bb = line[(idx + 1) % N];
    d[i] = a; line[idx] = (a * damp + bb * (1 - damp)) * loss; idx = (idx + 1) % N;
  }
  ksCache.set(key, b); return b;
}
export function pluck(st, ch, t, m, dur, vel = 0.8, bright = 0.5) {
  [t, vel] = st.humanize(t, vel, 0.006, 0.1);
  const c = st.ctx, s = c.createBufferSource(); s.buffer = ksBuffer(c, m, bright, 2.2);
  s.detune.value = 0; st.wobble(s);
  const g = c.createGain(); g.gain.setValueAtTime(0.5 * vel, t); g.gain.setValueAtTime(0.5 * vel, t + dur); g.gain.setTargetAtTime(0, t + dur, 0.12);
  const body = c.createBiquadFilter(); body.type = "peaking"; body.frequency.value = 200; body.Q.value = 1; body.gain.value = 3;
  s.connect(body); body.connect(g); g.connect(ch.in); s.start(t); s.stop(t + Math.min(2.2, dur + 0.8));
}
/** Basse pincée (Karplus-Strong grave, plus sombre) avec un sinus sous la fondamentale pour le poids. */
export function pluckbass(st, ch, t, m, dur, vel = 0.8) {
  [t, vel] = st.humanize(t, vel, 0.004, 0.06);
  const c = st.ctx, s = c.createBufferSource(); s.buffer = ksBuffer(c, m, 0.15, 2.5);
  const g = c.createGain(); g.gain.setValueAtTime(0.55 * vel, t); g.gain.setValueAtTime(0.55 * vel, t + dur); g.gain.setTargetAtTime(0, t + dur, 0.07);
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900;
  s.connect(lp); lp.connect(g); g.connect(ch.in); s.start(t); s.stop(t + dur + 0.6);
  const so = osc(c, "sine", hz(m), t, t + dur + 0.4), sg = c.createGain(); env(sg, t, 0.008, 0.25 * vel, 0.4, 0.7, 0.06, t + dur); so.connect(sg); sg.connect(ch.in);
}

/** Cloche / célesta en FM (rapport 1:3,5 : partiels inharmoniques de cloche), longue résonance. */
export function bell(st, ch, t, m, dur, vel = 0.7, { ratio = 3.5, index = 1.6, ring = 2.2 } = {}) {
  [t, vel] = st.humanize(t, vel, 0.006, 0.08);
  const c = st.ctx, f = hz(m), stop = t + Math.max(dur, ring) + 1;
  const out = c.createGain(); out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(0.16 * vel, t + 0.003); out.gain.setTargetAtTime(0, t + 0.003, ring / 3); out.connect(ch.in);
  const car = st.wobble(osc(c, "sine", f, t, stop)), mod = osc(c, "sine", f * ratio, t, stop), mg = c.createGain();
  mg.gain.setValueAtTime(f * index * vel, t); mg.gain.setTargetAtTime(f * 0.15, t, 0.4);
  mod.connect(mg); mg.connect(car.frequency); car.connect(out);
}

// ---------------------------------------------------------------- vents et leads

/** Flûte : sinus + triangle doux, souffle (bruit filtré autour de la note) surtout à l'attaque, vibrato qui
 *  s'installe ; légère montée de hauteur à l'attaque (comme une vraie flûte). */
export function flute(st, ch, t, m, dur, vel = 0.7) {
  [t, vel] = st.humanize(t, vel, 0.01, 0.06);
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 1;
  const out = c.createGain(); env(out, t, 0.06, 0.14 * vel, 0.3, 0.85, 0.12, end); out.connect(ch.in);
  const o = st.wobble(osc(c, "sine", f, t, stop)); o.detune.setValueAtTime(-25, t); o.detune.linearRampToValueAtTime(0, t + 0.07);
  vibrato(c, o, t, stop, 5.2, 14, 0.3); o.connect(out);
  const o2 = osc(c, "triangle", f * 2, t, stop), g2 = c.createGain(); g2.gain.value = 0.12; o2.connect(g2); g2.connect(out);
  const n = c.createBufferSource(), bp = c.createBiquadFilter(), ng = c.createGain(); n.buffer = noise(c); n.loop = true;
  bp.type = "bandpass"; bp.frequency.value = f * 2; bp.Q.value = 2.5;
  ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(0.09 * vel, t + 0.03); ng.gain.setTargetAtTime(0.025 * vel, t + 0.05, 0.08); ng.gain.setValueAtTime(0.025 * vel, end); ng.gain.setTargetAtTime(0, end, 0.08);
  n.connect(bp); bp.connect(ng); ng.connect(ch.in); n.start(t, (m % 7) * 0.1); n.stop(stop);
}

/** Lead « puce sonore » doux (couleur Terraria) : onde rectangulaire 25 % par série de Fourier (bande limitée,
 *  sans repliement), passe-bas pour l'arrondir, petit glissé d'attaque et vibrato. */
const pulseWaves = new Map();
function pulseWave(c, duty) {
  if (!pulseWaves.has(duty)) {
    const N = 40, re = new Float32Array(N), im = new Float32Array(N);
    for (let n = 1; n < N; n++) im[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * duty) * Math.pow(0.97, n);
    pulseWaves.set(duty, c.createPeriodicWave(re, im));
  }
  return pulseWaves.get(duty);
}
export function chip(st, ch, t, m, dur, vel = 0.7, { duty = 0.25, cut = 3200, glide = 0 } = {}) {
  [t, vel] = st.humanize(t, vel, 0.005, 0.06);
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 0.6;
  const o = c.createOscillator(); o.setPeriodicWave(pulseWave(c, duty)); o.frequency.setValueAtTime(glide ? hz(m - glide) : f, t);
  if (glide) o.frequency.exponentialRampToValueAtTime(f, t + 0.05);
  o.start(t); o.stop(stop); st.wobble(o); vibrato(c, o, t, stop, 5.8, 10, 0.35);
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = cut; lp.Q.value = 0.7;
  const out = c.createGain(); env(out, t, 0.008, 0.075 * vel, 0.25, 0.75, 0.06, end);
  o.connect(lp); lp.connect(out); out.connect(ch.in);
}

// ---------------------------------------------------------------- nappes, cordes, chœur

/** Nappe large : 5 dents de scie désaccordées (supersaw), réparties en stéréo, passe-bas qui s'ouvre lentement. */
export function pad(st, ch, t, m, dur, vel = 0.6, { cut = 1800, open = 1.2, voices = 5 } = {}) {
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 3;
  const flt = c.createBiquadFilter(); flt.type = "lowpass"; flt.Q.value = 0.6;
  flt.frequency.setValueAtTime(cut * 0.4, t); flt.frequency.linearRampToValueAtTime(cut, t + Math.min(dur, open));
  const g = c.createGain(); env(g, t, Math.min(0.8, dur * 0.3), 0.05 * vel, 1, 0.9, 0.9, end);
  flt.connect(g); g.connect(ch.in);
  const det = voices === 7 ? [-21, -14, -6, 0, 7, 15, 22] : [-14, -6, 0, 7, 15], pans = det.map((_, i) => -0.85 + 1.7 * i / (det.length - 1));
  det.forEach((dt, i) => { const o = st.wobble(osc(c, "sawtooth", f, t, stop, dt)), p = c.createStereoPanner(); p.pan.value = pans[i]; o.connect(p); p.connect(flt); });
}

/** Cordes d'ensemble : dents de scie désaccordées, attaque lente, filtre qui suit la vélocité, vibrato d'ensemble. */
export function strings(st, ch, t, m, dur, vel = 0.7, { attack = 0.35 } = {}) {
  [t, vel] = st.humanize(t, vel, 0.012, 0.06);
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 2;
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1200 + 2600 * vel; lp.Q.value = 0.5;
  const hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 110;
  const g = c.createGain(); env(g, t, attack, 0.055 * vel, 1.5, 0.92, 0.45, end);
  lp.connect(hp); hp.connect(g); g.connect(ch.in);
  [[-9, -0.6, 5.1], [0, 0, 5.6], [8, 0.6, 4.8]].forEach(([dt, pan, rate]) => {
    const o = st.wobble(osc(c, "sawtooth", f, t, stop, dt)), p = c.createStereoPanner(); p.pan.value = pan;
    vibrato(c, o, t, stop, rate, 9, 0.4); o.connect(p); p.connect(lp);
  });
}

/** Chœur « aah » : dents de scie filtrées par trois formants de la voyelle A (≈ 800, 1150, 2900 Hz), deux voix
 *  désaccordées, attaque douce. */
export function choir(st, ch, t, m, dur, vel = 0.6) {
  [t, vel] = st.humanize(t, vel, 0.015, 0.05);
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 2.5;
  const g = c.createGain(); env(g, t, 0.45, 0.1 * vel, 1.5, 0.9, 0.7, end); g.connect(ch.in);
  const mix = c.createGain(); mix.gain.value = 1;
  [[800, 6, 1], [1150, 7, 0.6], [2900, 9, 0.25]].forEach(([fr, q, amp]) => { const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = fr; bp.Q.value = q; const a = c.createGain(); a.gain.value = amp * 2.2; mix.connect(bp); bp.connect(a); a.connect(g); });
  [[-7, -0.5], [6, 0.5], [0, 0]].forEach(([dt, pan]) => { const o = st.wobble(osc(c, "sawtooth", f, t, stop, dt)), p = c.createStereoPanner(); p.pan.value = pan; vibrato(c, o, t, stop, 4.6 + pan, 12, 0.5); o.connect(p); p.connect(mix); });
}

// ---------------------------------------------------------------- basses

/** Basse sub (sinus) avec un soupçon d'harmonique pour qu'elle s'entende sur de petits haut-parleurs. */
export function sub(st, ch, t, m, dur, vel = 0.8) {
  const c = st.ctx, f = hz(m), end = t + dur;
  const g = c.createGain(); env(g, t, 0.01, 0.42 * vel, 0.4, 0.85, 0.06, end); g.connect(ch.in);
  osc(c, "sine", f, t, end + 0.5).connect(g);
  const h = c.createGain(); h.gain.value = 0.12; osc(c, "triangle", f * 2, t, end + 0.5).connect(h); h.connect(g);
}

// ---------------------------------------------------------------- percussions (bruit à graine : rendu identique)

let noiseBuf = null;
function noise(c) {
  if (!noiseBuf) { const n = c.sampleRate * 2; noiseBuf = c.createBuffer(1, n, c.sampleRate); const d = noiseBuf.getChannelData(0); let r = 99; for (let i = 0; i < n; i++) { r = (r * 1664525 + 1013904223) >>> 0; d[i] = (r / 4294967296) * 2 - 1; } }
  return noiseBuf;
}
const noiseHit = (st, ch, t, { type = "bandpass", f = 2000, q = 0.7, vol = 0.3, decay = 0.05, len = 0.6, off = 0.3 }) => {
  const c = st.ctx, s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noise(c); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  g.gain.setValueAtTime(vol, t); g.gain.setTargetAtTime(0, t, decay);
  s.connect(fl); fl.connect(g); g.connect(ch.in); s.start(t, off); s.stop(t + len);
};
/** Grosse caisse ronde : sinus 150 → 48 Hz, clic doux ; note le temps pour la compression en sidechain. */
export function kick(st, ch, t, vel = 0.9) {
  [t, vel] = st.humanize(t, vel, 0.002, 0.04);
  const c = st.ctx, o = c.createOscillator(), g = c.createGain();
  o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.11);
  g.gain.setValueAtTime(0.9 * vel, t); g.gain.setTargetAtTime(0, t + 0.04, 0.09);
  o.connect(g); g.connect(ch.in); o.start(t); o.stop(t + 0.6);
  noiseHit(st, ch, t, { f: 2500, vol: 0.08 * vel, decay: 0.006, len: 0.05, off: 0.1 });
  st.kicks.push(t);
}
/** Caisse claire feutrée (lofi) : bruit filtré + corps sinus 190 Hz. */
export function snare(st, ch, t, vel = 0.8) {
  [t, vel] = st.humanize(t, vel, 0.004, 0.08);
  const c = st.ctx;
  noiseHit(st, ch, t, { f: 1800, vol: 0.32 * vel, decay: 0.06, len: 0.4, off: 0.3 });
  const o = c.createOscillator(), og = c.createGain(); o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(150, t + 0.06);
  og.gain.setValueAtTime(0.18 * vel, t); og.gain.setTargetAtTime(0, t, 0.035); o.connect(og); og.connect(ch.in); o.start(t); o.stop(t + 0.3);
}
/** Claquement de mains / « rim » léger (bruit court bande étroite, trois micro-attaques). */
export function clap(st, ch, t, vel = 0.6) {
  [t, vel] = st.humanize(t, vel, 0.004, 0.08);
  [0, 0.011, 0.022].forEach((d, i) => noiseHit(st, ch, t + d, { f: 1300, q: 1.4, vol: (i === 2 ? 0.28 : 0.16) * vel, decay: i === 2 ? 0.05 : 0.008, len: 0.3, off: 0.5 + i * 0.1 }));
}
/** Charleston : bruit aigu très court (fermé) ou plus long (ouvert). */
export function hat(st, ch, t, vel = 0.5, open = false) {
  [t, vel] = st.humanize(t, vel, 0.006, 0.15);
  noiseHit(st, ch, t, { type: "highpass", f: 7500, vol: 0.12 * vel, decay: open ? 0.09 : 0.018, len: open ? 0.5 : 0.12, off: 0.55 + (t % 0.3) });
}
/** Shaker : bruit aigu en souffle (attaque arrondie). */
export function shaker(st, ch, t, vel = 0.4) {
  [t, vel] = st.humanize(t, vel, 0.008, 0.15);
  const c = st.ctx, s = c.createBufferSource(), hp = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noise(c); hp.type = "highpass"; hp.frequency.value = 6000;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.07 * vel, t + 0.02); g.gain.setTargetAtTime(0, t + 0.025, 0.03);
  s.connect(hp); hp.connect(g); g.connect(ch.in); s.start(t, 0.8 + (t % 0.4)); s.stop(t + 0.2);
}
/** Cymbale (crash) : bruit aigu long, deux bandes, pour marquer le début des sections. */
export function crash(st, ch, t, vel = 0.6) {
  noiseHit(st, ch, t, { type: "highpass", f: 5000, vol: 0.14 * vel, decay: 0.8, len: 3, off: 0.2 });
  noiseHit(st, ch, t, { f: 3200, q: 0.5, vol: 0.06 * vel, decay: 0.35, len: 2, off: 1.1 });
}
/** Tom / timbale : sinus qui descend, peau (bruit bas) ; « timpani » plus grave et plus long. */
export function tom(st, ch, t, m, vel = 0.8, long = false) {
  [t, vel] = st.humanize(t, vel, 0.004, 0.06);
  const c = st.ctx, f = hz(m), o = c.createOscillator(), g = c.createGain();
  o.frequency.setValueAtTime(f * 1.5, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.06);
  g.gain.setValueAtTime(0.6 * vel, t); g.gain.setTargetAtTime(0, t + 0.02, long ? 0.45 : 0.16);
  o.connect(g); g.connect(ch.in); o.start(t); o.stop(t + (long ? 2.5 : 1));
  noiseHit(st, ch, t, { type: "lowpass", f: 900, vol: 0.12 * vel, decay: 0.03, len: 0.2, off: 1.3 });
  st.kicks.push(t);
}

// ---------------------------------------------------------------- effets d'arrangement

/** Montée : bruit filtré dont le passe-bas monte sur `dur` (transition vers une section). */
export function riser(st, ch, t, dur, vel = 0.5) {
  const c = st.ctx, s = c.createBufferSource(), lp = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noise(c); s.loop = true; lp.type = "lowpass"; lp.Q.value = 3;
  lp.frequency.setValueAtTime(300, t); lp.frequency.exponentialRampToValueAtTime(9000, t + dur);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.07 * vel, t + dur); g.gain.setTargetAtTime(0, t + dur, 0.05);
  s.connect(lp); lp.connect(g); g.connect(ch.in); s.start(t); s.stop(t + dur + 0.5);
}
/** Craquements de vinyle sur [t0, t1] : clics brefs à des instants pseudo-aléatoires + souffle très bas. */
export function vinyl(st, ch, t0, t1, density = 7, vol = 0.5) {
  const c = st.ctx, r = (() => { let s = 4242; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); })();
  for (let t = t0; t < t1; t += r() * 2 / density) noiseHit(st, ch, t, { type: "highpass", f: 2500 + r() * 3000, vol: (0.02 + r() * 0.05) * vol, decay: 0.0015, len: 0.02, off: r() });
  const s = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noise(c); s.loop = true; bp.type = "bandpass"; bp.frequency.value = 5000; bp.Q.value = 0.4; g.gain.value = 0.006 * vol;
  s.connect(bp); bp.connect(g); g.connect(ch.in); s.start(t0); s.stop(t1);
}
