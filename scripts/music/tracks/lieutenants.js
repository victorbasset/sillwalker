// Morceau 3 « Les Lieutenants » (zones 101-150 ; docs/MUSIQUE.md, tâche 6) : épique sombre, sol mineur harmonique,
// 96 bpm, 56 mesures en boucle (≈ 2 min 20). Le leitmotiv aux cordes puis à la « puce » doublée des cordes (couleur
// des musiques de boss de Terraria), ostinato de harpe, timbales et toms façon taiko, chœur.
// Forme : intro 8 · A 8 · A' 8 · pont 8 · mystère 4 · montée 4 · A'' 8 · outro 8.
// (leçon de l'esquisse, trop sombre : −36 dB à 8 kHz) de la clarté : ostinato brillant, charlestons, célesta.
import * as I from "../instruments.js";
import { THEME, realize } from "../theme.js";

const V = {
  Gm: [[50, 55, 58, 62], 31], Cm: [[51, 55, 60, 63], 36], Eb: [[51, 55, 58, 63], 39], D: [[50, 54, 57, 62], 38], F: [[53, 57, 60, 65], 41],
};
// Grille du thème (sol mineur harmonique) : i iv VI V | i iv V i
const THEME_PROG = ["Gm", "Cm", "Eb", "D", "Gm", "Cm", "D", "Gm"];
// Pont héroïque : VI VII i V | iv V VI V
const BRIDGE_PROG = ["Eb", "F", "Gm", "D", "Cm", "D", "Eb", "D"];
const BRIDGE_MEL = [
  [0, 75, 2], [2, 74, 1], [3, 72, 1],
  [4, 72, 1.5], [5.5, 74, 0.5], [6, 77, 2],
  [8, 79, 3], [11, 77, 0.5], [11.5, 75, 0.5],
  [12, 74, 2], [14, 78, 2],
  [16, 75, 2], [18, 79, 2],
  [20, 78, 1.5], [21.5, 74, 0.5], [22, 81, 2],
  [24, 82, 2], [26, 79, 1], [27, 75, 1],
  [28, 78, 4],
];
const SECTIONS = [["intro", 8], ["A", 8], ["A2", 8], ["B", 8], ["mystery", 4], ["build", 4], ["A3", 8], ["outro", 8]];
const BARS = SECTIONS.reduce((a, [, n]) => a + n, 0);

export default {
  bpm: 96, bars: BARS, tail: 7, loop: true,
  async render(st) {
    const melo = st.channel("melo", { db: 0, pan: 0.1, verb: 0.38, delay: 0.06, duck: 0.12 });
    // (rendu par pistes) toms trop forts (−19,9 dB rms, la piste la plus forte) ; puce et célesta timides ;
    // trou à 250 Hz : cordes d'accompagnement ramenées dans leur registre (violoncelles, altos)
    const chip = st.channel("chip", { db: 6, pan: -0.15, verb: 0.3, delay: 0.15, duck: 0.1 });
    const choirc = st.channel("choir", { db: -5, pan: -0.2, verb: 0.55, duck: 0.2 });
    const strc = st.channel("strings", { db: -6, pan: 0.3, verb: 0.45, duck: 0.25, hp: 90 });
    const harp = st.channel("harp", { db: -6, pan: -0.45, verb: 0.3, delay: 0.12, duck: 0.25, hp: 160 });
    const cel = st.channel("celesta", { db: -1, pan: 0.5, verb: 0.5, delay: 0.25 });
    const drone = st.channel("drone", { db: -11, verb: 0.5, duck: 0.35, hp: 70 });
    const bass = st.channel("bass", { db: -9, duck: 0.25 });
    const perc = st.channel("perc", { db: -7, verb: 0.3 });
    const snarec = st.channel("snare", { db: -5, verb: 0.3, pan: 0.03 });
    const hatc = st.channel("hats", { db: -4, pan: 0.2, lp: 13000 });
    const fx = st.channel("fx", { db: -9, verb: 0.3 });
    st.setWow(2, 0);

    let bar0 = 0;
    for (const [name, n] of SECTIONS) {
      const t0 = bar0, prog = name === "B" ? BRIDGE_PROG : THEME_PROG;
      for (let k = 0; k < n; k++) {
        const bar = t0 + k, [notes, root] = V[prog[k % 8]], t = st.at(bar);
        const full = name === "A" || name === "A2" || name === "B" || name === "A3";
        // nappe grave tenue (la note fondamentale + quinte), toujours là
        I.pad(st, drone, t, root + 24, st.bar, 0.6, { cut: 1400 }); I.pad(st, drone, t, root + 31, st.bar, 0.4, { cut: 1400 });
        // ostinato de harpe : croches répétées (fondamentale, quinte, octave, tierce), brillant
        if (!(name === "intro" && k < 4) && name !== "mystery") {
          const os = [notes[1] + 12, notes[2] + 12, notes[3] + 12, notes[2] + 12, notes[1] + 24, notes[2] + 12, notes[3] + 12, notes[2] + 12];
          const hv = name === "intro" ? 0.3 + 0.08 * (k - 4) : name === "outro" ? 0.45 - 0.05 * k : 0.5;
          os.forEach((m, j) => I.pluck(st, harp, st.at(bar, j / 2), m, st.beat * 0.45, hv + (j % 2 ? 0 : 0.08), 0.85));
        }
        // cordes et chœur en accords
        if (full) notes.forEach((m) => I.strings(st, strc, t, m, st.bar * 0.98, 0.7, { attack: 0.4 }));
        if (name === "intro" || full) notes.slice(0, 3).forEach((m) => I.choir(st, choirc, t, m + 12, st.bar * 0.98, name === "intro" ? 0.25 + 0.05 * k : 0.45));
        // basse : sub tenu
        if (name !== "mystery") I.sub(st, bass, t, root + 12, st.bar * 0.9, 0.75);
        // ---- percussions façon taiko ----
        if (full) {
          [[0, 38, 0.95, true], [1.5, 43, 0.7], [2.5, 38, 0.8], [3.5, 45, 0.6]].forEach(([b, m, v, long]) => I.tom(st, perc, st.at(bar, b), m, v, !!long));
          I.snare(st, snarec, st.at(bar, 2), 0.85);
          const hsub = name === "A3" ? 4 : 2; for (let e = 0; e < 4 * hsub; e++) I.hat(st, hatc, st.at(bar, e / hsub), e % 2 ? 0.35 : 0.55);
          if (k === n - 1) for (let r = 0; r < 8; r++) I.tom(st, perc, st.at(bar, 2 + r / 4), 45 - Math.floor(r / 2) * 2, 0.4 + r * 0.06);
        } else if (name === "intro" && k % 2 === 0) I.tom(st, perc, t, 31, 0.85, true);
        else if (name === "build") { const sub = k < 2 ? 2 : 4; for (let r = 0; r < 4 * sub; r++) I.tom(st, perc, st.at(bar, r / sub), [38, 43, 45][r % 3], 0.35 + 0.55 * (k * 4 * sub + r) / (16 * sub)); }
        else if (name === "outro") { if (k % 2 === 0) I.tom(st, perc, t, 31, 0.9 - 0.08 * k, true); if (k < 4) for (let e = 0; e < 8; e++) I.hat(st, hatc, st.at(bar, e / 2), 0.3); }
        if (k === 0 && (name === "A" || name === "B" || name === "A3")) I.crash(st, hatc, t, name === "A3" ? 0.9 : 0.65);
      }
      // ---- mélodies ----
      const theme = realize(THEME, { tonic: 67, scale: "harmonic", at: t0 * 4 });
      if (name === "A") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.95; I.strings(st, melo, t, nt.midi + 12, d, 0.95, { attack: 0.05 }); I.choir(st, choirc, t, nt.midi, d, 0.5); });
      if (name === "A2") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.85, { duty: 0.125, glide: nt.len >= 1 ? 1 : 0 }); I.strings(st, melo, t, nt.midi, d, 0.9, { attack: 0.04 }); });
      if (name === "B") BRIDGE_MEL.forEach(([b, m, l]) => { const t = st.at(t0, b), d = l * st.beat * 0.95; I.strings(st, melo, t, m, d, 0.95, { attack: 0.08 }); I.choir(st, choirc, t, m - 12, d, 0.6); });
      if (name === "mystery") realize(THEME.slice(0, 9), { tonic: 79, scale: "harmonic", at: t0 * 4 }).forEach((nt) => I.bell(st, cel, st.at(0, nt.beat), nt.midi, nt.len * st.beat, 0.5, { ring: 2 }));
      if (name === "A3") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.9, { duty: 0.125, glide: nt.len >= 1 ? 1 : 0 }); I.strings(st, melo, t, nt.midi + 12, d, 0.95, { attack: 0.04 }); I.choir(st, choirc, t, nt.midi, d, 0.6); });
      if (full(name)) for (let k = 0; k < n; k += 2) I.bell(st, cel, st.at(t0 + k, 3.5), 91 + (k % 4 ? 2 : 0), st.beat * 0.5, 0.25, { ring: 1.2 }); // scintillements
      if (name === "build") I.riser(st, fx, st.at(t0), st.bar * 4, 0.9);
      if (name === "intro") I.riser(st, fx, st.at(t0 + 6), st.bar * 2, 0.6);
      bar0 += n;
    }
    function full(name) { return name === "A" || name === "A2" || name === "B" || name === "A3"; }
  },
};
