// Morceau d'essai (8 mesures) : valide la chaîne de rendu (tâche 1 de docs/MUSIQUE.md).
import * as I from "../instruments.js";
export default {
  bpm: 82, bars: 8, tail: 4,
  async render(st) {
    const keys = st.channel("keys", { db: -3, pan: -0.15, verb: 0.25, delay: 0.08, duck: 0.25 });
    const gtr = st.channel("gtr", { db: -6, pan: 0.35, verb: 0.2, delay: 0.15, duck: 0.2 });
    const padc = st.channel("pad", { db: -10, verb: 0.4, duck: 0.5, hp: 150 });
    const bass = st.channel("bass", { db: -4, verb: 0, duck: 0.35 });
    const drums = st.channel("drums", { db: -5, verb: 0.08, lp: 9000 });
    // grille I-vi-IV-V en ré majeur (Dmaj7, Bm7, Gmaj7, A7) ×2
    const CH = [[62, 66, 69, 73], [59, 62, 66, 69], [55, 59, 62, 66], [57, 61, 64, 67]], BASS = [38, 35, 31, 33];
    for (let bar = 0; bar < 8; bar++) {
      const k = bar % 4, t = st.at(bar);
      CH[k].forEach((m, i) => I.epiano(st, keys, t + i * 0.012, m, st.bar * 0.95, 0.7));
      I.pad(st, padc, t, CH[k][0] + 12, st.bar, 0.6);
      I.sub(st, bass, t, BASS[k], st.beat * 1.5, 0.9); I.sub(st, bass, t + st.beat * 2.5, BASS[k], st.beat * 1.2, 0.7);
      [0, 1, 2, 3, 2, 1, 2, 3].forEach((n, j) => I.pluck(st, gtr, t + j * st.beat / 2, CH[k][n] + 12, st.beat / 2, 0.55, 0.6));
      for (let b = 0; b < 4; b++) {
        if (b === 0 || (b === 2 && bar % 2)) I.kick(st, drums, st.at(bar, b));
        if (b === 1 || b === 3) I.snare(st, drums, st.at(bar, b), 0.7);
        for (let e = 0; e < 2; e++) I.hat(st, drums, st.at(bar, b + e * 0.5 + (e ? 0.06 : 0)), e ? 0.35 : 0.5);
      }
    }
  },
};
