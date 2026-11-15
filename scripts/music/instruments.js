// Instruments de la bande originale (docs/MUSIQUE.md). Chaque instrument : (studio, piste, t, midi, durée, vélocité).
// Synthèse soignée possible ici (rendu hors ligne) : plusieurs oscillateurs par note, filtres animés, Karplus-Strong…
import { hz } from "./engine.js";

const env = (g, t, a, peak, d, s, rel, end) => {
  // attaque, décroissance vers le palier, relâchement après la fin de la note
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a);
  g.gain.setTargetAtTime(peak * s, t + a, d);
  g.gain.setValueAtTime(peak * s, end); g.gain.setTargetAtTime(0, end, rel);
};
const osc = (c, type, f, t, stop, detune = 0) => { const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = detune; o.start(t); o.stop(stop); return o; };

/** Piano électrique (façon Rhodes) en FM : porteuse sinus modulée par un sinus ×1 dont l'indice décroît (attaque
 *  « tine »), plus une cloche ×14 très courte ; trémolo stéréo doux. */
export function epiano(st, ch, t, m, dur, vel = 0.8) {
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 2.5;
  const out = c.createGain(); env(out, t, 0.004, 0.22 * vel, 1.2, 0.35, 0.35, end); out.connect(ch.in);
  const car = osc(c, "sine", f, t, stop), mod = osc(c, "sine", f, t, stop), mg = c.createGain();
  mg.gain.setValueAtTime(f * 2.2 * vel, t); mg.gain.setTargetAtTime(f * 0.35, t, 0.12);
  mod.connect(mg); mg.connect(car.frequency); car.connect(out);
  const tine = osc(c, "sine", f * 14, t, t + 0.2), tg = c.createGain(); tg.gain.setValueAtTime(0.03 * vel, t); tg.gain.setTargetAtTime(0, t, 0.015); tine.connect(tg); tg.connect(out);
  const car2 = osc(c, "sine", f, t, stop, 6), g2 = c.createGain(); g2.gain.value = 0.35; car2.connect(g2); g2.connect(out);
}

/** Guitare / harpe pincée : Karplus-Strong calculé dans un tampon (corde amortie), puis légère caisse filtrée. */
const ksCache = new Map();
export function pluck(st, ch, t, m, dur, vel = 0.8, bright = 0.5) {
  const c = st.ctx, f = hz(m), key = m + ":" + bright;
  let buf = ksCache.get(key);
  if (!buf) {
    const sr = c.sampleRate, len = Math.floor(sr * 2.2), N = Math.max(2, Math.round(sr / f)), b = c.createBuffer(1, len, sr), d = b.getChannelData(0);
    const line = new Float32Array(N); let r = 12345 + m;
    for (let i = 0; i < N; i++) { r = (r * 1103515245 + 12345) >>> 0; line[i] = ((r / 4294967296) * 2 - 1); }
    let idx = 0, damp = 0.5 + bright * 0.45;
    for (let i = 0; i < len; i++) {
      const a = line[idx], bb = line[(idx + 1) % N];
      const y = (a * damp + bb * (1 - damp)) * 0.996;
      d[i] = a; line[idx] = y; idx = (idx + 1) % N;
    }
    buf = b; ksCache.set(key, buf);
  }
  const s = c.createBufferSource(); s.buffer = buf;
  const g = c.createGain(); g.gain.setValueAtTime(0.5 * vel, t); g.gain.setValueAtTime(0.5 * vel, t + dur); g.gain.setTargetAtTime(0, t + dur, 0.12);
  const body = c.createBiquadFilter(); body.type = "peaking"; body.frequency.value = 200; body.Q.value = 1; body.gain.value = 3;
  s.connect(body); body.connect(g); g.connect(ch.in); s.start(t); s.stop(t + Math.min(2.2, dur + 0.8));
}

/** Nappe large : 5 dents de scie désaccordées (supersaw), réparties en stéréo, passe-bas qui s'ouvre lentement. */
export function pad(st, ch, t, m, dur, vel = 0.6, { cut = 1800, open = 1.2 } = {}) {
  const c = st.ctx, f = hz(m), end = t + dur, stop = end + 3;
  const flt = c.createBiquadFilter(); flt.type = "lowpass"; flt.Q.value = 0.6;
  flt.frequency.setValueAtTime(cut * 0.4, t); flt.frequency.linearRampToValueAtTime(cut, t + Math.min(dur, open));
  const g = c.createGain(); env(g, t, Math.min(0.8, dur * 0.3), 0.05 * vel, 1, 0.9, 0.9, end);
  flt.connect(g); g.connect(ch.in);
  [-14, -6, 0, 7, 15].forEach((dt, i) => {
    const o = osc(c, "sawtooth", f, t, stop, dt), p = c.createStereoPanner(); p.pan.value = [-0.8, -0.4, 0, 0.4, 0.8][i];
    o.connect(p); p.connect(flt);
  });
}

/** Basse sub (sinus) avec un soupçon d'harmonique pour qu'elle s'entende sur de petits haut-parleurs. */
export function sub(st, ch, t, m, dur, vel = 0.8) {
  const c = st.ctx, f = hz(m), end = t + dur;
  const g = c.createGain(); env(g, t, 0.01, 0.42 * vel, 0.4, 0.85, 0.06, end); g.connect(ch.in);
  osc(c, "sine", f, t, end + 0.5).connect(g);
  const h = c.createGain(); h.gain.value = 0.12; osc(c, "triangle", f * 2, t, end + 0.5).connect(h); h.connect(g);
}

// ---- batterie lofi (bruit à graine : rendu identique) ----
let noiseBuf = null;
function noise(c) {
  if (!noiseBuf) { const n = c.sampleRate * 1; noiseBuf = c.createBuffer(1, n, c.sampleRate); const d = noiseBuf.getChannelData(0); let r = 99; for (let i = 0; i < n; i++) { r = (r * 1664525 + 1013904223) >>> 0; d[i] = (r / 4294967296) * 2 - 1; } }
  return noiseBuf;
}
/** Grosse caisse ronde : sinus 150 → 48 Hz, clic doux ; note le temps pour la compression en sidechain. */
export function kick(st, ch, t, vel = 0.9) {
  const c = st.ctx, o = c.createOscillator(), g = c.createGain();
  o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.11);
  g.gain.setValueAtTime(0.9 * vel, t); g.gain.setTargetAtTime(0, t + 0.04, 0.09);
  o.connect(g); g.connect(ch.in); o.start(t); o.stop(t + 0.6);
  const s = c.createBufferSource(), sg = c.createGain(), sf = c.createBiquadFilter(); s.buffer = noise(c); sf.type = "bandpass"; sf.frequency.value = 2500;
  sg.gain.setValueAtTime(0.08 * vel, t); sg.gain.setTargetAtTime(0, t, 0.006); s.connect(sf); sf.connect(sg); sg.connect(ch.in); s.start(t, 0.1); s.stop(t + 0.05);
  st.kicks.push(t);
}
/** Caisse claire feutrée (lofi) : bruit filtré + corps sinus 190 Hz. */
export function snare(st, ch, t, vel = 0.8) {
  const c = st.ctx, s = c.createBufferSource(), g = c.createGain(), bp = c.createBiquadFilter();
  s.buffer = noise(c); bp.type = "bandpass"; bp.frequency.value = 1800; bp.Q.value = 0.7;
  g.gain.setValueAtTime(0.32 * vel, t); g.gain.setTargetAtTime(0, t, 0.06); s.connect(bp); bp.connect(g); g.connect(ch.in); s.start(t, 0.3); s.stop(t + 0.4);
  const o = c.createOscillator(), og = c.createGain(); o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(150, t + 0.06);
  og.gain.setValueAtTime(0.18 * vel, t); og.gain.setTargetAtTime(0, t, 0.035); o.connect(og); og.connect(ch.in); o.start(t); o.stop(t + 0.3);
}
/** Charleston : bruit aigu très court (fermé) ou plus long (ouvert). */
export function hat(st, ch, t, vel = 0.5, open = false) {
  const c = st.ctx, s = c.createBufferSource(), g = c.createGain(), hp = c.createBiquadFilter();
  s.buffer = noise(c); hp.type = "highpass"; hp.frequency.value = 7500;
  g.gain.setValueAtTime(0.12 * vel, t); g.gain.setTargetAtTime(0, t, open ? 0.09 : 0.018);
  s.connect(hp); hp.connect(g); g.connect(ch.in); s.start(t, 0.55 + (t % 0.3)); s.stop(t + (open ? 0.5 : 0.12));
}
