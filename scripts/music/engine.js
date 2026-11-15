// Moteur de studio de la bande originale (docs/MUSIQUE.md) : rendu HORS du jeu, dans un OfflineAudioContext.
// Un morceau = des pistes (instrument + notes) envoyées dans une console : par piste volume, panoramique, envois vers
// la réverbération et l'écho, compression en sidechain (la piste « respire » sur la grosse caisse) ; bus maître :
// égaliseur, compresseur de bus, limiteur. Rien de tout ça ne tourne dans le jeu, qui ne lit que le fichier final.

export const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

/** Générateur pseudo-aléatoire à graine : un rendu identique à chaque fois (bruits, humanisation). */
export function rng(seed = 1) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

export class Studio {
  /** bpm, mesures en 4/4 ; sr : fréquence d'échantillonnage. */
  constructor(ctx, { bpm }) {
    this.ctx = ctx; this.bpm = bpm; this.beat = 60 / bpm; this.bar = this.beat * 4;
    this.rand = rng(20261115);
    // ---- bus maître : correction douce, compression de bus, limiteur ----
    const c = ctx;
    this.master = c.createGain(); this.master.gain.value = 1;
    const low = c.createBiquadFilter(); low.type = "highpass"; low.frequency.value = 28; low.Q.value = 0.7; // sous-graves inutiles
    const shelfL = c.createBiquadFilter(); shelfL.type = "lowshelf"; shelfL.frequency.value = 120; shelfL.gain.value = 1.0;
    const mud = c.createBiquadFilter(); mud.type = "peaking"; mud.frequency.value = 320; mud.Q.value = 0.9; mud.gain.value = -1.5; // la « boue » des bas-médiums
    const air = c.createBiquadFilter(); air.type = "highshelf"; air.frequency.value = 9000; air.gain.value = 1.5; // un peu d'air
    const glue = c.createDynamicsCompressor(); glue.threshold.value = -18; glue.knee.value = 8; glue.ratio.value = 2; glue.attack.value = 0.03; glue.release.value = 0.25;
    this.makeup = c.createGain(); this.makeup.gain.value = 1.4;
    const lim = c.createDynamicsCompressor(); lim.threshold.value = -3; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.001; lim.release.value = 0.08;
    this.master.connect(low); low.connect(shelfL); shelfL.connect(mud); mud.connect(air); air.connect(glue); glue.connect(this.makeup); this.makeup.connect(lim); lim.connect(c.destination);
    // ---- réverbération (convolution, impulsion générée : grande salle douce) ----
    this.reverb = c.createConvolver(); this.reverb.buffer = this.impulse(3.2, 2.6, 0.02);
    const rvRet = c.createGain(); rvRet.gain.value = 0.9;
    const rvHp = c.createBiquadFilter(); rvHp.type = "highpass"; rvHp.frequency.value = 220; // pas de grave dans la réverbération (clarté)
    const rvLp = c.createBiquadFilter(); rvLp.type = "lowpass"; rvLp.frequency.value = 7500;
    this.reverb.connect(rvHp); rvHp.connect(rvLp); rvLp.connect(rvRet); rvRet.connect(this.master);
    // ---- écho stéréo (croche pointée à gauche, noire à droite), filtré ----
    this.delayIn = c.createGain();
    const dL = c.createDelay(2), dR = c.createDelay(2), fb = c.createGain(), dlp = c.createBiquadFilter(), mL = c.createStereoPanner(), mR = c.createStereoPanner();
    dL.delayTime.value = this.beat * 0.75; dR.delayTime.value = this.beat; fb.gain.value = 0.35; dlp.type = "lowpass"; dlp.frequency.value = 3500;
    mL.pan.value = -0.7; mR.pan.value = 0.7;
    this.delayIn.connect(dlp); dlp.connect(dL); dlp.connect(dR); dL.connect(mL); dR.connect(mR); mL.connect(this.master); mR.connect(this.master);
    dL.connect(fb); fb.connect(dlp); dR.connect(this.reverb);
    this.channels = {}; this.kicks = [];
  }

  /** Impulsion de réverbération stéréo : bruit qui décroît (duree s, decroissance), prédélai, deux canaux décorrélés. */
  impulse(dur, decay, pre) {
    const c = this.ctx, n = Math.floor(dur * c.sampleRate), b = c.createBuffer(2, n, c.sampleRate), p = Math.floor(pre * c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch), r = rng(77 + ch * 991);
      let lp = 0;
      for (let i = p; i < n; i++) {
        const x = (i - p) / (n - p);
        lp = lp * 0.55 + (r() * 2 - 1) * 0.45; // un peu plus sombre qu'un bruit blanc
        d[i] = lp * Math.pow(1 - x, decay) * (i - p < 300 ? (i - p) / 300 : 1);
      }
    }
    return b;
  }

  /** Une piste de la console : volume (dB), panoramique, envois réverbération / écho, sidechain (0 à 1). */
  channel(name, { db = 0, pan = 0, verb = 0.15, delay = 0, duck = 0, lp = 0, hp = 0 } = {}) {
    const c = this.ctx, inp = c.createGain(), duckG = c.createGain(), vol = c.createGain(), pn = c.createStereoPanner();
    let head = inp;
    if (hp) { const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp; head.connect(f); head = f; }
    if (lp) { const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = lp; head.connect(f); head = f; }
    head.connect(duckG); duckG.connect(vol); vol.gain.value = Math.pow(10, db / 20); vol.connect(pn); pn.pan.value = pan; pn.connect(this.master);
    if (verb) { const s = c.createGain(); s.gain.value = verb; pn.connect(s); s.connect(this.reverb); }
    if (delay) { const s = c.createGain(); s.gain.value = delay; pn.connect(s); s.connect(this.delayIn); }
    const ch = { name, in: inp, duck: duckG, duckAmt: duck };
    this.channels[name] = ch;
    return ch;
  }

  /** Sidechain : chaque piste « respire » sous la grosse caisse (à appeler une fois toutes les notes posées). */
  applyDucking() {
    for (const ch of Object.values(this.channels)) {
      if (!ch.duckAmt) continue;
      const g = ch.duck.gain; g.setValueAtTime(1, 0);
      for (const t of this.kicks) { g.setValueAtTime(1, Math.max(0, t - 0.005)); g.linearRampToValueAtTime(1 - ch.duckAmt, t + 0.01); g.setTargetAtTime(1, t + 0.02, this.beat * 0.22); }
    }
  }

  /** Temps (s) d'une position en mesures (bar) + temps (beat) + fraction. */
  at(bar, beat = 0) { return bar * this.bar + beat * this.beat; }
}

/** Écrit un AudioBuffer stéréo en WAV 24 bits (Uint8Array). */
export function wav24(buf) {
  const ch = [buf.getChannelData(0), buf.getChannelData(1)], n = ch[0].length, out = new Uint8Array(44 + n * 6), v = new DataView(out.buffer);
  const str = (o, s) => { for (let i = 0; i < s.length; i++) out[o + i] = s.charCodeAt(i); };
  str(0, "RIFF"); v.setUint32(4, 36 + n * 6, true); str(8, "WAVE"); str(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 2, true);
  v.setUint32(24, buf.sampleRate, true); v.setUint32(28, buf.sampleRate * 6, true); v.setUint16(32, 6, true); v.setUint16(34, 24, true); str(36, "data"); v.setUint32(40, n * 6, true);
  let o = 44;
  for (let i = 0; i < n; i++) for (let c = 0; c < 2; c++) {
    let s = Math.max(-1, Math.min(1, ch[c][i])) * 8388607; s = Math.round(s); if (s < 0) s += 16777216;
    out[o++] = s & 255; out[o++] = (s >> 8) & 255; out[o++] = (s >> 16) & 255;
  }
  return out;
}
