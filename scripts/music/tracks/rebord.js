// Morceau 1 « Le Rebord » (zones 1-50 ; docs/MUSIQUE.md, tâche 4) : lofi chaud aux couleurs de Terraria, ré majeur,
// 82 bpm, 48 mesures en boucle (≈ 2 min 20). Le leitmotiv (theme.js) à la flûte puis à la « puce », un pont nouveau.
// Forme : intro 4 · A 8 · A' 8 · B 8 · respiration 4 · A'' 8 · outro 8.
import * as I from "../instruments.js";
import { THEME, realize } from "../theme.js";

// Accords voicés à la main (registre médium, sans fondamentale : la basse la joue) : [notes], basse.
const V = {
  Dmaj9: [[54, 57, 61, 64], 38], Bm9: [[50, 57, 61, 66], 35], Gmaj9: [[54, 57, 59, 62], 31],
  A13sus: [[55, 59, 62, 66], 33], A13: [[55, 59, 61, 66], 33],
  Gmaj7: [[59, 62, 66, 69], 31], A6: [[57, 61, 64, 66], 33], Fsm7: [[57, 61, 64, 66], 42], Bm7: [[57, 59, 62, 66], 35],
  Em9: [[55, 59, 62, 66], 40], Dmaj7: [[54, 57, 61, 64], 38], A7: [[55, 59, 61, 64], 33],
};
// Grille du thème (8 mesures) : I vi IV V | I vi V I ; la 4ᵉ mesure : sus4 puis résolution
const THEME_PROG = [["Dmaj9"], ["Bm9"], ["Gmaj9"], ["A13sus", "A13"], ["Dmaj9"], ["Bm9"], ["A13sus", "A13"], ["Dmaj9"]];
const BRIDGE_PROG = [["Gmaj7"], ["A6"], ["Fsm7"], ["Bm7"], ["Em9"], ["A13sus", "A7"], ["Dmaj7"], ["Bm7", "A7"]];
// Mélodie du pont : [temps, midi, durée]
const BRIDGE_MEL = [
  [0, 74, 0.5], [0.5, 76, 0.5], [1, 78, 1.5], [2.5, 76, 0.5], [3, 74, 1],
  [4, 73, 1.5], [5.5, 74, 0.5], [6, 76, 2],
  [8, 73, 0.5], [8.5, 76, 0.5], [9, 81, 1.5], [10.5, 78, 0.5], [11, 76, 1],
  [12, 78, 1], [13, 76, 0.5], [13.5, 74, 0.5], [14, 71, 2],
  [16, 71, 0.5], [16.5, 74, 0.5], [17, 78, 1.5], [18.5, 79, 0.5], [19, 78, 1],
  [20, 76, 1.5], [21.5, 74, 0.5], [22, 76, 1], [23, 73, 1],
  [24, 73, 0.5], [24.5, 74, 0.5], [25, 76, 1], [26, 78, 1.5], [27.5, 81, 0.5],
  [28, 83, 1.5], [29.5, 81, 0.5], [30, 79, 1], [31, 76, 1],
];
const SECTIONS = [["intro", 4], ["A", 8], ["A2", 8], ["B", 8], ["breath", 4], ["A3", 8], ["outro", 8]];
const BARS = SECTIONS.reduce((a, [, n]) => a + n, 0);

export default {
  bpm: 82, bars: BARS, tail: 6, loop: true,
  async render(st) {
    const SW = 0.17; // swing : retard des croches à contretemps (en temps)
    const sw = (beat) => (Math.abs(beat % 1 - 0.5) < 1e-6 ? beat + SW : beat);
    // (4b) niveaux d'après le rendu par pistes (stems.py) : le piano électrique chargeait 250 Hz et cachait le reste ;
    // la puce (qui porte le thème), les charlestons, la cloche, les cordes et la nappe étaient presque inaudibles
    const keys = st.channel("keys", { db: -8, pan: -0.3, verb: 0.22, delay: 0.05, duck: 0.22, hp: 180 });
    const gtr = st.channel("gtr", { db: -5, pan: 0.55, verb: 0.2, delay: 0.16, duck: 0.2, hp: 180 });
    const flute = st.channel("flute", { db: -2, pan: 0.15, verb: 0.32, delay: 0.12, duck: 0.1 });
    const chip = st.channel("chip", { db: 4, pan: -0.15, verb: 0.25, delay: 0.18, duck: 0.1 });
    const bellc = st.channel("bell", { db: -3, pan: 0.45, verb: 0.4, delay: 0.2 });
    const padc = st.channel("pad", { db: -11, verb: 0.5, duck: 0.45, hp: 200 });
    const strc = st.channel("strings", { db: -7, pan: 0.25, verb: 0.4, duck: 0.3 });
    const bass = st.channel("bass", { db: -8, duck: 0.3 });
    const kickc = st.channel("kick", { db: -7, lp: 6000 });
    const snarec = st.channel("snare", { db: -6, verb: 0.12, pan: 0.03 });
    const hatc = st.channel("hats", { db: -3, pan: 0.18, lp: 12000 });
    const fx = st.channel("fx", { db: -12, verb: 0.15 });
    I.vinyl(st, fx, 0, st.at(BARS), 6, 0.9);
    st.setWow(9, 0);

    let bar0 = 0;
    for (const [name, n] of SECTIONS) {
      const t0 = bar0;
      const prog = name === "B" ? BRIDGE_PROG : THEME_PROG;
      for (let k = 0; k < n; k++) {
        const bar = t0 + k, cells = prog[k % 8], half = cells.length === 2;
        cells.forEach((cname, ci) => {
          const [notes, root] = V[cname], beat = half ? ci * 2 : 0, len = half ? 2 : 4, t = st.at(bar, beat);
          // piano électrique : arpégé très légèrement (la main ne frappe jamais tout d'un coup)
          const kv = name === "intro" || name === "breath" ? 0.45 : name === "outro" && k >= 4 ? 0.4 : 0.55;
          notes.forEach((m, i) => I.epiano(st, keys, t + i * 0.016, m, st.beat * len * 0.94, kv - i * 0.03, { bright: 1.7 }));
          // basse : fondamentale, quinte ou octave en relance, approche chromatique vers la mesure suivante
          const drumsOn = name !== "intro" && name !== "breath" && !(name === "outro" && k >= 6);
          if (name !== "intro" && !(name === "outro" && k >= 6)) {
            I.pluckbass(st, bass, t, root, st.beat * (half ? 1.4 : 1.6), 0.85);
            if (!half) I.pluckbass(st, bass, st.at(bar, sw(2.5)), root + (k % 2 ? 12 : 7), st.beat * 0.9, 0.6);
          }
          // guitare : arpèges en croches dans A', B, A'' (pas dans l'intro, la respiration)
          if (name === "A2" || name === "B" || name === "A3" || (name === "outro" && k < 4)) {
            const pat = [0, 2, 1, 3, 2, 1, 3, 2];
            for (let j = 0; j < len * 2; j++) I.pluck(st, gtr, st.at(bar, sw(beat + j / 2)), notes[pat[j] % notes.length] + 12, st.beat * 0.5, 0.42 + (j % 2 ? 0 : 0.08), 0.55);
          }
          // nappe et cordes : dans le pont et le dernier A
          if (name === "B" || name === "A3") I.pad(st, padc, t, notes[1] + 12, st.beat * len, 0.55, { cut: 2200 });
          if (name === "A3") notes.slice(1).forEach((m) => I.strings(st, strc, t, m + 12, st.beat * len * 0.98, 0.45, { attack: 0.6 }));
          void drumsOn;
        });
        // ---- batterie lofi ----
        const drums = !(name === "intro" || name === "breath" || (name === "outro" && k >= 6));
        const last = k === n - 1;
        if (drums) {
          const thin = name === "outro" && k >= 4;
          if (!thin) { I.kick(st, kickc, st.at(bar, 0), 0.9); I.kick(st, kickc, st.at(bar, sw(2.5)), 0.75); if (k % 2) I.kick(st, kickc, st.at(bar, 1.75), 0.45); }
          I.snare(st, snarec, st.at(bar, 1), 0.7); I.snare(st, snarec, st.at(bar, 3), 0.75);
          if (k % 4 === 3) I.snare(st, snarec, st.at(bar, 3.75), 0.22); // note fantôme
          for (let e = 0; e < 8; e++) { const b = sw(e / 2); I.hat(st, hatc, st.at(bar, b), e % 2 ? 0.32 : 0.5 + (e % 4 === 0 ? 0.1 : 0), e === 7 && k % 4 === 3); }
          if (last && name !== "outro") for (let r = 0; r < 4; r++) I.snare(st, snarec, st.at(bar, 3 + r / 4), 0.25 + r * 0.12); // petit roulement
        } else if (name === "breath") { for (let e = 0; e < 4; e++) I.shaker(st, hatc, st.at(bar, e + 0.5), 0.55); }
        if (k === 0 && (name === "A3" || name === "B")) I.crash(st, hatc, st.at(bar, 0), name === "A3" ? 0.7 : 0.45);
      }
      // ---- mélodies ----
      const theme = realize(THEME, { tonic: 74, scale: "major", at: t0 * 4 });
      if (name === "intro") realize(THEME.slice(0, 9), { tonic: 86, scale: "major", at: t0 * 4 + 8 }).forEach((nt) => I.bell(st, bellc, st.at(0, nt.beat), nt.midi, nt.len * st.beat, 0.4, { ring: 1.6 }));
      if (name === "A") theme.forEach((nt) => I.flute(st, flute, st.at(0, nt.beat), nt.midi, nt.len * st.beat * 0.94, 0.8));
      if (name === "A2") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi, d, 0.75, { glide: nt.len >= 1 ? 1 : 0 }); I.flute(st, flute, t, nt.midi - 12, d, 0.45); });
      if (name === "B") BRIDGE_MEL.forEach(([b, m, l]) => { const t = st.at(t0, b), d = l * st.beat * 0.93; I.bell(st, bellc, t, m, d, 0.55, { ring: 1.4 }); I.flute(st, flute, t, m - 12, d, 0.5); });
      if (name === "breath") realize(THEME.slice(0, 9), { tonic: 74, scale: "major", at: t0 * 4 }).forEach((nt) => I.flute(st, flute, st.at(0, nt.beat), nt.midi, nt.len * st.beat * 0.95, 0.6));
      if (name === "A3") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi, d, 0.8, { glide: nt.len >= 1 ? 1 : 0 }); I.flute(st, flute, t, nt.midi + 12, d, 0.5); });
      if (name === "outro") realize(THEME.slice(-8), { tonic: 74, scale: "major", at: t0 * 4 - 12 + 4 }).forEach((nt) => I.flute(st, flute, st.at(0, nt.beat), nt.midi, nt.len * st.beat * 0.95, 0.5));
      if (name === "breath") { st.setWow(18, st.at(t0)); st.setWow(9, st.at(t0 + n)); }
      if (name === "A3") I.riser(st, fx, st.at(t0 - 1), st.bar, 0.6);
      bar0 += n;
    }
  },
};
