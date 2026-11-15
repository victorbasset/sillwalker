// Morceau 2 « Sentiers d'étoiles » (zones 51-100 ; docs/MUSIQUE.md, tâche 5) : aventure, si mineur, 92 bpm,
// 56 mesures en boucle (≈ 2 min 26). Le leitmotiv en mineur à la « puce », arpèges de guitare en doubles croches avec
// écho pointé, basse syncopée, premières nappes galactiques dans le pont.
// Forme : intro 8 · A 8 · A' 8 · pont 8 · suspension 4 · montée 4 · A'' 8 · outro 8.
import * as I from "../instruments.js";
import { THEME, realize } from "../theme.js";

// Accords voicés à la main (sans fondamentale, la basse la joue) : [notes], basse
const V = {
  Bm9: [[50, 54, 57, 61], 35], Gmaj9: [[54, 57, 59, 62], 31], Dadd9: [[54, 57, 62, 64], 38], A6add9: [[57, 59, 61, 64], 33],
  Em9: [[55, 59, 62, 66], 40],
};
// Grille du thème (si mineur) : i VI III VII | iv VI VII i
const THEME_PROG = ["Bm9", "Gmaj9", "Dadd9", "A6add9", "Em9", "Gmaj9", "A6add9", "Bm9"];
// Pont : VI III VII i ×2 (l'élan qui « s'envole » vers le relatif majeur)
const BRIDGE_PROG = ["Gmaj9", "Dadd9", "A6add9", "Bm9", "Gmaj9", "Dadd9", "A6add9", "Bm9"];
const BRIDGE_MEL = [
  [0, 83, 1.5], [1.5, 81, 0.5], [2, 79, 1], [3, 78, 1],
  [4, 78, 1.5], [5.5, 76, 0.5], [6, 74, 1], [7, 73, 1],
  [8, 73, 0.5], [8.5, 76, 0.5], [9, 81, 1.5], [10.5, 79, 0.5], [11, 76, 1],
  [12, 78, 3], [15, 74, 0.5], [15.5, 76, 0.5],
  [16, 83, 1], [17, 86, 1], [18, 83, 1], [19, 81, 1],
  [20, 78, 1.5], [21.5, 81, 0.5], [22, 78, 1], [23, 76, 1],
  [24, 76, 0.5], [24.5, 78, 0.5], [25, 81, 1], [26, 85, 1], [27, 83, 1],
  [28, 83, 3], [31, 78, 1],
];
const SECTIONS = [["intro", 8], ["A", 8], ["A2", 8], ["B", 8], ["space", 4], ["build", 4], ["A3", 8], ["outro", 8]];
const BARS = SECTIONS.reduce((a, [, n]) => a + n, 0);

export default {
  bpm: 92, bars: BARS, tail: 6, loop: true,
  async render(st) {
    // niveaux posés d'après les leçons du morceau 1 (rendu par pistes) : le lead devant, charlestons audibles
    const chip = st.channel("chip", { db: 4, pan: -0.1, verb: 0.28, delay: 0.2, duck: 0.1 });
    const bellc = st.channel("bell", { db: -4, pan: 0.4, verb: 0.4, delay: 0.25 });
    const arp = st.channel("arp", { db: -6, pan: 0.45, verb: 0.25, delay: 0.3, duck: 0.3, hp: 200 });
    // (rendu par pistes : trou à 250 Hz, −13 dB) le piano électrique dans son registre naturel comble les bas-médiums
    const keys = st.channel("keys", { db: -9, pan: -0.35, verb: 0.25, duck: 0.25, hp: 120 });
    const padc = st.channel("pad", { db: -9, verb: 0.55, duck: 0.45, hp: 180 });
    const strc = st.channel("strings", { db: -5, pan: 0.2, verb: 0.4, duck: 0.25 });
    const choirc = st.channel("choir", { db: -8, pan: -0.2, verb: 0.55, duck: 0.3 });
    const bass = st.channel("bass", { db: -7, duck: 0.3 });
    const kickc = st.channel("kick", { db: -6, lp: 7000 });
    const snarec = st.channel("snare", { db: -6, verb: 0.15, pan: 0.03 });
    const clapc = st.channel("clap", { db: -1, verb: 0.2, pan: -0.05 });
    const hatc = st.channel("hats", { db: -4, pan: 0.2, lp: 13000 });
    const shk = st.channel("shaker", { db: -6, pan: -0.3 });
    const fx = st.channel("fx", { db: -9, verb: 0.3 });
    st.setWow(4, 0);

    let bar0 = 0;
    for (const [name, n] of SECTIONS) {
      const t0 = bar0, prog = name === "B" ? BRIDGE_PROG : THEME_PROG;
      for (let k = 0; k < n; k++) {
        const bar = t0 + k, [notes, root] = V[prog[k % 8]], t = st.at(bar);
        const full = name === "A" || name === "A2" || name === "B" || name === "A3";
        // arpège de guitare en doubles croches sur deux octaves (s'ouvre pendant l'intro)
        const span = [...notes, ...notes.map((m) => m + 12)], pat = [0, 2, 4, 6, 5, 3, 4, 2];
        const av = name === "intro" ? 0.25 + 0.3 * (k / n) : name === "space" ? 0.3 : name === "outro" ? 0.45 - 0.2 * (k / n) : 0.45;
        for (let j = 0; j < 16; j++) I.pluck(st, arp, st.at(bar, j / 4), span[pat[j % 8]] + 12, st.beat * 0.3, av + (j % 4 === 0 ? 0.1 : 0), 0.75);
        // nappe : toujours, plus large dans le pont et le sommet
        I.pad(st, padc, t, notes[1] + 12, st.bar, name === "B" || name === "A3" ? 0.75 : 0.5, { cut: name === "B" || name === "A3" ? 3200 : 2000, voices: name === "B" || name === "A3" ? 7 : 5 });
        if (full || name === "space") notes.forEach((m, i) => I.epiano(st, keys, t + i * 0.012, m, st.bar * 0.9, 0.45, { bright: 1.5 }));
        if (name === "A2" || name === "A3") notes.slice(1).forEach((m) => I.strings(st, strc, t, m + 12, st.bar * 0.98, 0.4, { attack: 0.5 }));
        if (name === "A3" || name === "B") notes.slice(0, 3).forEach((m) => I.choir(st, choirc, t, m + 12, st.bar * 0.98, 0.4));
        // basse syncopée (fondamentale, octave, quinte)
        if (name !== "space" && !(name === "intro" && k < 4) && !(name === "outro" && k >= 6)) {
          [[0, 0, 0.6], [0.75, 0, 0.5], [1.5, 12, 0.45], [2.5, 7, 0.45], [3, 0, 0.6]].forEach(([b, iv, len], i) => I.pluckbass(st, bass, st.at(bar, b), root + iv, st.beat * len, i ? 0.7 : 0.9));
        }
        // ---- batterie ----
        if (full) {
          [0, 2, 2.75].forEach((b) => I.kick(st, kickc, st.at(bar, b), b ? 0.8 : 0.95));
          [1, 3].forEach((b) => { I.snare(st, snarec, st.at(bar, b), 0.7); I.clap(st, clapc, st.at(bar, b), 0.6); });
          for (let e = 0; e < 8; e++) I.hat(st, hatc, st.at(bar, e / 2), e % 2 ? 0.4 : 0.55, e === 7);
          for (let e = 0; e < 16; e++) I.shaker(st, shk, st.at(bar, e / 4), e % 2 ? 0.45 : 0.7);
          if (k === n - 1) for (let r = 0; r < 4; r++) I.snare(st, snarec, st.at(bar, 3 + r / 4), 0.3 + r * 0.12);
        } else if (name === "intro" && k >= 4) {
          for (let e = 0; e < 16; e++) I.shaker(st, shk, st.at(bar, e / 4), (e % 2 ? 0.35 : 0.55) * (k - 3) / 4);
          if (k >= 6) I.kick(st, kickc, st.at(bar, 0), 0.6);
        } else if (name === "build") {
          for (let b = 0; b < 4; b++) I.kick(st, kickc, st.at(bar, b), 0.75 + 0.05 * k);
          const sub = k < 2 ? 2 : 4; for (let r = 0; r < 4 * sub; r++) I.snare(st, snarec, st.at(bar, r / sub), 0.2 + 0.5 * (k * 4 * sub + r) / (16 * sub));
        } else if (name === "outro" && k < 6) {
          I.kick(st, kickc, st.at(bar, 0), 0.8); I.clap(st, clapc, st.at(bar, 1), 0.4); I.clap(st, clapc, st.at(bar, 3), 0.4);
          for (let e = 0; e < 16; e++) I.shaker(st, shk, st.at(bar, e / 4), (e % 2 ? 0.35 : 0.55) * (1 - k / 7));
        }
        if (k === 0 && (name === "A" || name === "B" || name === "A3")) I.crash(st, hatc, t, name === "A3" ? 0.85 : 0.6);
        if (name === "intro" && k % 2 === 1) I.bell(st, bellc, st.at(bar, 2.5), notes[3] + 24, st.beat, 0.35, { ring: 2 });
      }
      // ---- mélodies ----
      const theme = realize(THEME, { tonic: 71, scale: "minor", at: t0 * 4 });
      if (name === "A") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi, d, 0.8, { glide: nt.len >= 1 ? 1 : 0 }); I.bell(st, bellc, t, nt.midi + 12, d, 0.35, { ring: 1.2 }); });
      if (name === "A2") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi, d, 0.8, { glide: nt.len >= 1 ? 1 : 0 }); I.strings(st, strc, t, nt.midi - 12, d, 0.75, { attack: 0.06 }); });
      if (name === "B") BRIDGE_MEL.forEach(([b, m, l]) => { const t = st.at(t0, b), d = l * st.beat * 0.93; I.bell(st, bellc, t, m, d, 0.6, { ring: 1.6 }); I.chip(st, chip, t, m - 12, d, 0.6); });
      if (name === "space") realize(THEME.slice(0, 9), { tonic: 71, scale: "minor", at: t0 * 4 }).forEach((nt) => I.chip(st, chip, st.at(0, nt.beat), nt.midi + 12, nt.len * st.beat * 0.9, 0.55));
      if (name === "A3") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.8, { glide: nt.len >= 1 ? 1 : 0 }); I.strings(st, strc, t, nt.midi, d, 0.85, { attack: 0.05 }); I.bell(st, bellc, t, nt.midi + 12, d, 0.3, { ring: 1 }); });
      if (name === "build") I.riser(st, fx, st.at(t0), st.bar * 4, 0.9);
      bar0 += n;
    }
  },
};
