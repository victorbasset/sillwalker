// Morceau 5 « La Dernière Étoile » (zone 200 seulement, le combat contre le Briseur d'Étoiles ; demande de Victor du
// 18/11 : « une musique épique unique de la même qualité que les 4 autres »). Ré mineur harmonique dramatique puis ré
// majeur triomphant, 116 bpm (le plus rapide de la bande originale), 68 mesures en boucle (≈ 2 min 21).
// Forme : intro 8 · A 8 (mineur, cordes + chœur, taiko) · A' 8 (puce + nappes, arpèges) · pont héroïque 8 (vers le
// majeur) · montée 4 · A'' 8 (MAJEUR : tout l'orchestre) · souffle 4 (chœur et cloches) · A''' 8 (puce à l'octave
// haute, le sommet) · coda 4 (♭VI – ♭VII – I) · outro 8 (retour au mineur, boucle).
// Identité : l'orchestre des Lieutenants (cordes, chœur, toms) ET la galaxie du Briseur (puce, supersaw, cloches) réunis,
// plus vite ; la grosse caisse pousse en croches dans les grands moments.
import * as I from "../instruments.js";
import { THEME, realize } from "../theme.js";

const V = {
  // ré mineur harmonique
  Dm: [[50, 53, 57, 62], 38], Gm: [[50, 55, 58, 62], 43], Bb: [[50, 53, 58, 62], 34], A: [[49, 52, 57, 61], 33],
  C: [[48, 52, 55, 60], 36], F: [[48, 53, 57, 60], 41],
  // ré majeur
  D: [[54, 57, 62, 66], 38], Am: [[52, 57, 61, 64], 33], Bm: [[54, 57, 59, 62], 35], G: [[55, 59, 62, 66], 31],
};
// Grilles du thème : mineur i iv VI V | i iv V i ; majeur I V vi IV | I V V I
const MINOR_PROG = ["Dm", "Gm", "Bb", "A", "Dm", "Gm", "A", "Dm"];
const MAJOR_PROG = ["D", "Am", "Bm", "G", "D", "Am", "Am", "D"];
// Pont héroïque : VI VII i V | iv V VI VII (la dernière mesure ouvre sur le majeur)
const BRIDGE_PROG = ["Bb", "C", "Dm", "A", "Gm", "A", "Bb", "C"];
const BRIDGE_MEL = [
  [0, 77, 2], [2, 76, 1], [3, 74, 1],
  [4, 76, 1.5], [5.5, 77, 0.5], [6, 79, 2],
  [8, 81, 3], [11, 79, 0.5], [11.5, 77, 0.5],
  [12, 76, 2], [14, 73, 2],
  [16, 74, 2], [18, 79, 2],
  [20, 76, 1.5], [21.5, 77, 0.5], [22, 81, 2],
  [24, 82, 2], [26, 81, 1], [27, 79, 1],
  [28, 81, 2], [30, 84, 2],
];
const SECTIONS = [["intro", 8], ["A", 8], ["A2", 8], ["B", 8], ["build", 4], ["A3", 8], ["breath", 4], ["A4", 8], ["coda", 4], ["outro", 8]];
const BARS = SECTIONS.reduce((a, [, n]) => a + n, 0);
const CODA_PROG = ["Bb", "C", "D", "D"];

export default {
  bpm: 116, bars: BARS, tail: 7, loop: true,
  async render(st) {
    const chip = st.channel("chip", { db: 5, pan: -0.1, verb: 0.3, delay: 0.16, duck: 0.12 });
    const melo = st.channel("melo", { db: 1, pan: 0.12, verb: 0.4, delay: 0.05, duck: 0.12 });
    const choirc = st.channel("choir", { db: -3, pan: -0.25, verb: 0.55, duck: 0.2 });
    const strc = st.channel("strings", { db: -4, pan: 0.3, verb: 0.45, duck: 0.2, hp: 90 });
    const low = st.channel("lowstr", { db: -5, pan: -0.3, verb: 0.3, duck: 0.25, hp: 60 });
    const arp = st.channel("arp", { db: -3, pan: 0.45, verb: 0.35, delay: 0.22, duck: 0.3, hp: 300 });
    const padc = st.channel("pad", { db: -8, verb: 0.5, duck: 0.7, hp: 150 });
    const bass = st.channel("bass", { db: -8, duck: 0.3 });
    const kickc = st.channel("kick", { db: -8, lp: 7000 });
    const snarec = st.channel("snare", { db: -5, verb: 0.25, pan: 0.03 });
    const hatc = st.channel("hats", { db: 0, pan: 0.2, lp: 14000 });
    const perc = st.channel("perc", { db: -9, verb: 0.35 });
    const fx = st.channel("fx", { db: -8, verb: 0.35 });
    st.setWow(1.5, 0);

    let bar0 = 0;
    for (const [name, n] of SECTIONS) {
      const t0 = bar0;
      const prog = name === "B" ? BRIDGE_PROG : name === "coda" ? CODA_PROG : name === "A3" || name === "A4" || name === "breath" ? MAJOR_PROG : MINOR_PROG;
      const full = name === "A" || name === "A2" || name === "B" || name === "A3" || name === "A4" || name === "coda";
      const major = name === "A3" || name === "A4" || name === "breath" || name === "coda";
      for (let k = 0; k < n; k++) {
        const bar = t0 + k, [notes, root] = V[prog[k % prog.length]], t = st.at(bar);
        const big = name === "B" || name === "A3" || name === "A4" || name === "coda";
        // nappes : supersaw (galaxie) dès A', cordes tenues (orchestre) partout sauf l'intro du début
        if (name !== "intro" || k >= 4) I.pad(st, padc, t, notes[0] + 12, st.bar, big ? 0.75 : 0.5, { cut: big ? 3800 : 2200, voices: big ? 7 : 5 });
        if (name === "A" || name === "B" || major) notes.forEach((m) => I.strings(st, strc, t, m, st.bar * 0.98, big ? 0.6 : 0.45, { attack: 0.25 }));
        // ostinato de cordes graves en croches (moteur du morceau), plus discret dans l'intro et l'outro
        const ov = name === "intro" ? 0.25 + 0.05 * k : name === "outro" ? 0.55 - 0.06 * k : name === "build" ? 0.6 : 0.7;
        if (!(name === "outro" && k >= 6)) for (let e = 0; e < 8; e++) I.strings(st, low, st.at(bar, e / 2), root + 12 + (e % 4 === 3 ? 7 : 0), st.beat * 0.42, ov, { attack: 0.02 });
        // arpège de cloches en doubles croches (galaxie) dans A', le pont, le final majeur
        if (name === "A2" || name === "B" || name === "A3" || name === "A4" || name === "breath") for (let j = 0; j < 16; j++) I.bell(st, arp, st.at(bar, j / 4), notes[[0, 1, 2, 3, 2, 1, 3, 2][j % 8]] + 24 + (j >= 8 ? 12 : 0), st.beat * 0.25, 0.3, { ring: 0.5, index: 1.2 });
        // chœur : intro qui monte, pont et final
        if (name === "intro" || name === "B" || major) notes.slice(0, 3).forEach((m) => I.choir(st, choirc, t, m + 12, st.bar * 0.98, name === "intro" ? 0.2 + 0.04 * k : 0.45));
        // basse : croches en octaves dans les grands moments, sub tenue ailleurs
        if (full || name === "build") for (let e = 0; e < 8; e++) I.pluckbass(st, bass, st.at(bar, e / 2), root + (e % 2 ? 12 : 0), st.beat * 0.45, e % 2 ? 0.65 : 0.85);
        else I.sub(st, bass, t, root + 12, st.bar * 0.9, name === "intro" ? 0.3 + 0.05 * k : 0.5);
        // ---- batterie ----
        if (full) {
          // grosse caisse en croches dans le final majeur (la poussée finale), sur les temps ailleurs
          const kicks = name === "A3" || name === "A4" ? 8 : 4;
          for (let b = 0; b < kicks; b++) I.kick(st, kickc, st.at(bar, b * 4 / kicks), b % 2 ? 0.75 : 0.95);
          [1, 3].forEach((b) => I.snare(st, snarec, st.at(bar, b), 0.75));
          for (let e = 0; e < 8; e++) I.hat(st, hatc, st.at(bar, e / 2), e % 2 ? 0.55 : 0.3, (name === "A3" || name === "A4") && e % 2 === 1);
          // taiko : toms sur les temps forts (A et pont), roulement en fin de section
          if (name === "A" || name === "B") { I.tom(st, perc, st.at(bar, 0), 41, 0.75); I.tom(st, perc, st.at(bar, 2.5), 45, 0.55); }
          if (k === n - 1 && name !== "coda") for (let r = 0; r < 8; r++) I.tom(st, perc, st.at(bar, 2 + r / 4), 45 - r, 0.35 + r * 0.07);
          if (k % 4 === 0) I.crash(st, hatc, t, k === 0 ? 0.85 : 0.5);
        } else if (name === "intro") {
          // timbales roulées puis coups espacés : l'orage avant le combat
          if (k < 4) for (let r = 0; r < 8; r++) I.tom(st, perc, st.at(bar, r / 2), 38, 0.12 + 0.03 * k + 0.01 * r);
          else { I.tom(st, perc, st.at(bar, 0), 38, 0.8, true); I.kick(st, kickc, st.at(bar, 0), 0.7); I.kick(st, kickc, st.at(bar, 2), 0.55); }
        } else if (name === "build") {
          for (let b = 0; b < 4; b++) I.kick(st, kickc, st.at(bar, b), 0.8);
          const sub = k < 2 ? 2 : k < 3 ? 4 : 8; for (let r = 0; r < 4 * sub; r++) I.snare(st, snarec, st.at(bar, r / sub), 0.2 + 0.55 * (k * 4 * sub + r) / (16 * sub));
        } else if (name === "outro" && k < 6) {
          I.tom(st, perc, st.at(bar, 0), 38, 0.7 - 0.08 * k, true); I.kick(st, kickc, st.at(bar, 0), 0.75 - 0.08 * k);
          for (let e = 0; e < 8; e++) I.hat(st, hatc, st.at(bar, e / 2), (e % 2 ? 0.4 : 0.25) * (1 - k / 7));
        }
      }
      // ---- mélodies ----
      const minorTheme = realize(THEME, { tonic: 62, scale: "harmonic", at: t0 * 4 });
      const majorTheme = realize(THEME, { tonic: 74, scale: "major", at: t0 * 4 });
      if (name === "intro") realize(THEME.slice(0, 9), { tonic: 74, scale: "harmonic", at: t0 * 4 + 16 }).forEach((nt) => I.bell(st, fx, st.at(0, nt.beat), nt.midi, nt.len * st.beat, 0.5, { ring: 2.2 }));
      // A : le thème en mineur aux cordes, doublé du chœur à l'octave grave
      if (name === "A") minorTheme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.94; I.strings(st, melo, t, nt.midi + 12, d, 0.85, { attack: 0.06 }); I.choir(st, choirc, t, nt.midi, d, 0.4); });
      // A' : la puce (couleur des boss) doublée des cordes, en mineur
      if (name === "A2") minorTheme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.85, { duty: 0.125, glide: nt.len >= 1 ? 1 : 0 }); I.strings(st, melo, t, nt.midi, d, 0.55, { attack: 0.05 }); });
      if (name === "B") BRIDGE_MEL.forEach(([b, m, l]) => { const t = st.at(t0, b), d = l * st.beat * 0.93; I.strings(st, melo, t, m, d, 0.8, { attack: 0.08 }); I.chip(st, chip, t, m + 12, d, 0.6); I.bell(st, fx, t, m + 12, d, 0.4, { ring: 1.6 }); });
      // A'' : le thème en MAJEUR, triomphe : puce à l'octave, cordes, chœur, cloches
      if (name === "A3") majorTheme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 12, d, 0.9, { glide: nt.len >= 1 ? 1 : 0 }); I.strings(st, melo, t, nt.midi, d, 0.75, { attack: 0.05 }); I.choir(st, choirc, t, nt.midi - 12, d, 0.45); I.bell(st, fx, t, nt.midi + 24, d, 0.3); });
      // souffle : le début du thème aux cloches et au chœur, en majeur, batterie coupée
      if (name === "breath") realize(THEME.slice(0, 9), { tonic: 86, scale: "major", at: t0 * 4 }).forEach((nt) => { const t = st.at(0, nt.beat); I.bell(st, fx, t, nt.midi, nt.len * st.beat, 0.55, { ring: 2.2 }); I.choir(st, choirc, t, nt.midi - 12, nt.len * st.beat, 0.35); });
      // dernier thème : le sommet, la puce une octave plus haut, cordes et chœur à l'unisson du thème
      if (name === "A4") majorTheme.forEach((nt) => { const t = st.at(0, nt.beat), d = nt.len * st.beat * 0.92; I.chip(st, chip, t, nt.midi + 24, d, 0.8, { glide: nt.len >= 1 ? 1 : 0 }); I.chip(st, chip, t, nt.midi + 12, d, 0.6, { duty: 0.125 }); I.strings(st, melo, t, nt.midi + 12, d, 0.75, { attack: 0.05 }); I.choir(st, choirc, t, nt.midi, d, 0.5); });
      if (name === "breath") I.riser(st, fx, st.at(t0 + 2), st.bar * 2, 0.7);
      if (name === "coda") { // la tonique tenue au-dessus de ♭VI – ♭VII – I, puis le grand accord
        I.chip(st, chip, st.at(t0), 86, st.bar * 2.9, 0.8); I.strings(st, melo, st.at(t0), 86, st.bar * 3.9, 0.95, { attack: 0.1 }); I.choir(st, choirc, st.at(t0), 74, st.bar * 3.9, 0.65);
        I.tom(st, perc, st.at(t0 + 2), 31, 0.95, true); I.crash(st, hatc, st.at(t0 + 2), 0.95);
      }
      if (name === "outro") realize(THEME.slice(0, 9), { tonic: 74, scale: "harmonic", at: t0 * 4 }).forEach((nt) => I.bell(st, fx, st.at(0, nt.beat), nt.midi, nt.len * st.beat, 0.4, { ring: 2.2 }));
      if (name === "build") I.riser(st, fx, st.at(t0), st.bar * 4, 0.9);
      if (name === "intro") I.riser(st, fx, st.at(t0 + 6), st.bar * 2, 0.6);
      bar0 += n;
    }
  },
};
