// Morceau 4 « Le Briseur d'Étoiles » (zones 151-200 ; docs/MUSIQUE.md, tâche 7) : final galactique, ré majeur
// triomphant, 100 bpm, 60 mesures en boucle (≈ 2 min 24). Nappes supersaw à 7 voix, arpèges rapides de cloches,
// chœur, batterie pleine ; le leitmotiv culmine, puis la coda ♭VI – ♭VII – I (le « lever d'étoiles »).
// Forme : intro 8 · A 8 · A' 8 · pont cosmique 8 · espace 4 · montée 4 · A'' 8 · coda 4 · outro 8.
// (leçons des morceaux 1-3, rendu par pistes : la puce devant, cordes d'accompagnement dans leur registre, un piano
// pour les bas-médiums, toms modérés)
import * as I from "../instruments.js";
import { THEME, realize } from "../theme.js";

const V = {
  D: [[54, 57, 62, 66], 38], A: [[52, 57, 61, 64], 33], Bm: [[54, 57, 59, 62], 35], G: [[55, 59, 62, 66], 31],
  Fsm: [[54, 57, 61, 64], 42], Bb: [[53, 58, 62, 65], 34], C: [[55, 60, 64, 67], 36],
};
// Grille du thème : I V vi IV | I V V I
const THEME_PROG = ["D", "A", "Bm", "G", "D", "A", "A", "D"];
// Pont cosmique : IV V iii vi | ♭VI ♭VII I V
const BRIDGE_PROG = ["G", "A", "Fsm", "Bm", "Bb", "C", "D", "A"];
const BRIDGE_MEL = [
  [0, 83, 2], [2, 81, 1], [3, 79, 1],
  [4, 81, 1.5], [5.5, 83, 0.5], [6, 85, 2],
  [8, 85, 1], [9, 81, 1], [10, 78, 2],
  [12, 78, 1], [13, 81, 1], [14, 83, 2],
  [16, 82, 2], [18, 81, 1], [19, 77, 1],
  [20, 79, 1.5], [21.5, 81, 0.5], [22, 84, 2],
  [24, 86, 3], [27, 85, 1],
  [28, 85, 2], [30, 81, 2],
];
const SECTIONS = [["intro", 8], ["A", 8], ["A2", 8], ["B", 8], ["space", 4], ["build", 4], ["A3", 8], ["coda", 4], ["outro", 8]];
const BARS = SECTIONS.reduce((a, [, n]) => a + n, 0);
const CODA_PROG = ["Bb", "C", "D", "D"];

export default {
  // (9d, retour d'un joueur : « la quatrième ressemble pas mal à la troisième ») une identité à lui : synthwave
  // galactique (grosse caisse sur chaque temps, charlestons ouverts à contretemps, nappes qui pompent, thème à la puce
  // et aux cloches, sans cordes ni chœur sur le thème ni toms façon taiko : c'est la couleur des Lieutenants), 108 bpm
  bpm: 108, bars: BARS, tail: 7, loop: true,
  async render(st) {
    const chip = st.channel("chip", { db: 5, pan: -0.1, verb: 0.3, delay: 0.18, duck: 0.12 });
    const melo = st.channel("melo", { db: 0, pan: 0.12, verb: 0.38, delay: 0.06, duck: 0.12 });
    const choirc = st.channel("choir", { db: -5, pan: -0.25, verb: 0.55, duck: 0.25 });
    const strc = st.channel("strings", { db: -6, pan: 0.3, verb: 0.45, duck: 0.25, hp: 90 });
    const keys = st.channel("keys", { db: -10, pan: -0.35, verb: 0.25, duck: 0.25, hp: 120 });
    // (rendu par pistes) arpège de cloches trop discret pour un final « galactique », aigus à −22 dB à 8 kHz ; grosse
    // caisse la plus forte des pistes
    const arp = st.channel("arp", { db: -2, pan: 0.45, verb: 0.35, delay: 0.25, duck: 0.3, hp: 300 });
    const padc = st.channel("pad", { db: -8, verb: 0.5, duck: 0.8, hp: 150 });
    const bass = st.channel("bass", { db: -8, duck: 0.3 });
    const kickc = st.channel("kick", { db: -8, lp: 7000 });
    const snarec = st.channel("snare", { db: -5, verb: 0.25, pan: 0.03 });
    const clapc = st.channel("clap", { db: -2, verb: 0.25, pan: -0.05 });
    const hatc = st.channel("hats", { db: -1, pan: 0.2, lp: 14000 });
    const perc = st.channel("perc", { db: -8, verb: 0.3 });
    const fx = st.channel("fx", { db: -8, verb: 0.35 });
    st.setWow(2, 0);

    let bar0 = 0;
    for (const [name, n] of SECTIONS) {
      const t0 = bar0, prog = name === "B" ? BRIDGE_PROG : name === "coda" ? CODA_PROG : THEME_PROG;
      const full = name === "A" || name === "A2" || name === "B" || name === "A3" || name === "coda";
      for (let k = 0; k < n; k++) {
        const bar = t0 + k, [notes, root] = V[prog[k % prog.length]], t = st.at(bar);
        const big = name === "B" || name === "A3" || name === "coda";
        // nappes supersaw (deux, à 7 voix dans les grands moments)
        I.pad(st, padc, t, notes[0] + 12, st.bar, big ? 0.8 : 0.55, { cut: big ? 3800 : 2400, voices: big ? 7 : 5 });
        I.pad(st, padc, t, notes[2] + 12, st.bar, big ? 0.6 : 0.4, { cut: big ? 3800 : 2400, voices: big ? 7 : 5 });
        // arpège de cloches en doubles croches (scintillement galactique)
        const av = name === "intro" ? 0.12 + 0.03 * k : name === "outro" ? 0.35 - 0.03 * k : name === "space" ? 0.25 : 0.33;
        for (let j = 0; j < 16; j++) I.bell(st, arp, st.at(bar, j / 4), notes[[0, 1, 2, 3, 2, 1, 3, 2][j % 8]] + 24 + (j >= 8 ? 12 : 0), st.beat * 0.25, av, { ring: 0.5, index: 1.2 });
        // piano (bas-médiums) et cordes d'accompagnement dans leur registre
        // piano en accords répétés à la croche (pulsation synthwave) ; cordes seulement dans le pont, chœur dans l'espace et la coda
        if (full) for (let e = 0; e < 8; e++) notes.forEach((m, i) => I.epiano(st, keys, st.at(bar, e / 2) + i * 0.006, m, st.beat * 0.4, e % 2 ? 0.32 : 0.42, { bright: 1.6 }));
        if (name === "B") notes.forEach((m) => I.strings(st, strc, t, m, st.bar * 0.98, 0.55, { attack: 0.3 }));
        if (name === "space" || name === "coda") notes.slice(0, 3).forEach((m) => I.choir(st, choirc, t, m + 12, st.bar * 0.98, 0.4));
        // basse : croches en octaves (pompe), tenue dans l'espace
        if (full || name === "build" || (name === "outro" && k < 6)) for (let e = 0; e < 8; e++) I.pluckbass(st, bass, st.at(bar, e / 2), root + (e % 2 ? 12 : 0), st.beat * 0.45, e % 2 ? 0.65 : 0.85);
        else if (name === "space" || (name === "intro" && k >= 4)) I.sub(st, bass, t, root + 12, st.bar * 0.9, 0.6);
        // ---- batterie ----
        if (full) {
          for (let b = 0; b < 4; b++) I.kick(st, kickc, st.at(bar, b), b % 2 ? 0.8 : 0.95); // sur chaque temps
          [1, 3].forEach((b) => { I.snare(st, snarec, st.at(bar, b), 0.7); I.clap(st, clapc, st.at(bar, b), 0.7); });
          for (let e = 0; e < 8; e++) I.hat(st, hatc, st.at(bar, e / 2), e % 2 ? 0.6 : 0.25, e % 2 === 1); // ouverts à contretemps
          if (name === "A3") for (let e = 0; e < 16; e++) I.shaker(st, perc, st.at(bar, e / 4), e % 2 ? 0.35 : 0.55);
          if (k === n - 1 && name !== "coda") for (let r = 0; r < 8; r++) I.snare(st, snarec, st.at(bar, 2 + r / 4), 0.3 + r * 0.08);
          if (k % 4 === 0) I.crash(st, hatc, t, k === 0 ? 0.85 : 0.5);
        } else if (name === "intro" && k >= 4) {
          I.kick(st, kickc, st.at(bar, 0), 0.7); I.kick(st, kickc, st.at(bar, 2), 0.55);
        } else if (name === "build") {
          for (let b = 0; b < 4; b++) I.kick(st, kickc, st.at(bar, b), 0.8);
          const sub = k < 2 ? 2 : k < 3 ? 4 : 8; for (let r = 0; r < 4 * sub; r++) I.snare(st, snarec, st.at(bar, r / sub), 0.2 + 0.55 * (k * 4 * sub + r) / (16 * sub));
        } else if (name === "outro" && k < 6) {
          I.kick(st, kickc, st.at(bar, 0), 0.8 - 0.08 * k); I.clap(st, clapc, st.at(bar, 1), 0.35); I.clap(st, clapc, st.at(bar, 3), 0.35);
          for (let e = 0; e < 8; e++) I.hat(st, hatc, st.at(bar, e / 2), (e % 2 ? 0.45 : 0.3) * (1 - k / 7));
        }
      }
      // ---- mélodies ----
      const theme = realize(THEME, { tonic: 74, scale: "major", at: t0 * 4 });
      if (name === "intro") realize(THEME.slice(0, 9), { tonic: 86, scale: "major", at: t0 * 4 + 16 }).forEach((nt) => I.chip(st, chip, st.at(0, nt.beat), nt.midi, nt.len * st.beat * 0.9, 0.4));
      if (name === "A") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.85, { glide: nt.len >= 1 ? 1 : 0 }); I.bell(st, fx, t, nt.midi + 24, d, 0.3, { ring: 1 }); });
      if (name === "A2") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.8, { duty: 0.25, glide: nt.len >= 1 ? 1 : 0 }); I.chip(st, melo, t, nt.midi, d, 0.55, { duty: 0.5 }); });
      if (name === "B") BRIDGE_MEL.forEach(([b, m, l]) => { const t = st.at(t0, b), d = l * st.beat * 0.93; I.bell(st, fx, t, m, d, 0.6, { ring: 1.8 }); I.chip(st, chip, t, m, d, 0.75); I.strings(st, melo, t, m - 12, d, 0.8, { attack: 0.06 }); });
      if (name === "space") realize(THEME.slice(0, 9), { tonic: 86, scale: "major", at: t0 * 4 }).forEach((nt) => I.bell(st, fx, st.at(0, nt.beat), nt.midi, nt.len * st.beat, 0.55, { ring: 2.2 }));
      if (name === "A3") theme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.9, { glide: nt.len >= 1 ? 1 : 0 }); I.chip(st, melo, t, nt.midi, d, 0.55, { duty: 0.5 }); I.bell(st, fx, t, nt.midi + 24, d, 0.35, { ring: 1 }); });
      if (name === "coda") { // la tonique tenue au-dessus de ♭VI – ♭VII – I, puis le grand accord
        I.chip(st, chip, st.at(t0), 86, st.bar * 2.9, 0.75); I.strings(st, melo, st.at(t0), 86, st.bar * 3.9, 0.95, { attack: 0.1 }); I.choir(st, choirc, st.at(t0), 74, st.bar * 3.9, 0.6);
        I.tom(st, perc, st.at(t0 + 2), 31, 0.95, true); I.crash(st, hatc, st.at(t0 + 2), 0.9);
      }
      if (name === "build") I.riser(st, fx, st.at(t0), st.bar * 4, 0.9);
      if (name === "intro") I.riser(st, fx, st.at(t0 + 6), st.bar * 2, 0.6);
      bar0 += n;
    }
  },
};
