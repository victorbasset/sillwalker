// Vitrine des instruments (tâche 2 de docs/MUSIQUE.md) : le même petit thème joué tour à tour par chaque timbre, sur
// une nappe, une basse et une batterie lofi ; pour que Victor juge les sons avant les vrais morceaux.
import * as I from "../instruments.js";
const THEME = [[0, 74, 1], [1, 76, 0.5], [1.5, 78, 0.5], [2, 81, 1.5], [3.5, 78, 0.5], [4, 76, 1], [5, 74, 0.5], [5.5, 73, 0.5], [6, 74, 2]]; // en temps
export default {
  bpm: 84, bars: 22, tail: 5,
  async render(st) {
    st.setWow(9, 0);
    const lead = st.channel("lead", { db: -2, pan: 0.1, verb: 0.28, delay: 0.14, duck: 0.15 });
    const keys = st.channel("keys", { db: -7, pan: -0.25, verb: 0.25, duck: 0.25 });
    const padc = st.channel("pad", { db: -12, verb: 0.45, duck: 0.45, hp: 160 });
    const bass = st.channel("bass", { db: -5, duck: 0.3 });
    const drums = st.channel("drums", { db: -6, verb: 0.06, lp: 10000 });
    const perc = st.channel("perc", { db: -4, verb: 0.3 });
    const fx = st.channel("fx", { db: -10, verb: 0.2 });
    const CH = [[62, 66, 69, 73], [59, 62, 66, 69], [55, 59, 62, 66], [57, 61, 64, 67]], BASS = [38, 35, 31, 33];
    const VOICES = [
      ["flûte", (t, m, d) => I.flute(st, lead, t, m, d, 0.8)],
      ["puce", (t, m, d) => I.chip(st, lead, t, m, d, 0.8, { glide: 1 })],
      ["cloche", (t, m, d) => I.bell(st, lead, t, m, d, 0.7)],
      ["guitare", (t, m, d) => I.pluck(st, lead, t, m - 12, d, 0.8, 0.65)],
      ["cordes", (t, m, d) => I.strings(st, lead, t, m - 12, d, 0.8)],
      ["chœur", (t, m, d) => I.choir(st, lead, t, m - 12, d, 0.75)],
      ["piano él.", (t, m, d) => I.epiano(st, lead, t, m, d, 0.8)],
    ];
    I.vinyl(st, fx, 0, st.at(22), 6, 0.8);
    for (let bar = 0; bar < 22; bar++) {
      const k = bar % 4, t = st.at(bar), epic = bar >= 14;
      CH[k].forEach((m, i) => I.epiano(st, keys, t + i * 0.012, m, st.bar * 0.95, 0.55));
      I.pad(st, padc, t, CH[k][0] + 12, st.bar, 0.6);
      if (epic) I.pluckbass(st, bass, t, BASS[k], st.beat * 1.5, 0.9); else I.sub(st, bass, t, BASS[k], st.beat * 1.5, 0.9);
      I.sub(st, bass, t + st.beat * 2.5, BASS[k], st.beat * 1.2, 0.6);
      for (let b = 0; b < 4; b++) {
        if (b === 0 || (b === 2 && bar % 2)) I.kick(st, drums, st.at(bar, b));
        if (b === 1 || b === 3) I.snare(st, drums, st.at(bar, b), 0.7);
        for (let e = 0; e < 2; e++) I.hat(st, drums, st.at(bar, b + e * 0.5 + (e ? 0.07 : 0)), e ? 0.35 : 0.5);
        if (epic) I.shaker(st, drums, st.at(bar, b + 0.25), 0.6);
      }
      if (epic && bar % 2 === 0) { I.tom(st, perc, st.at(bar, 0), 43, 0.7, true); I.tom(st, perc, st.at(bar, 3.5), 50, 0.6); }
    }
    // une voix toutes les 2 mesures (le thème dure 2 mesures), à partir de la mesure 2
    VOICES.forEach(([, play], v) => THEME.forEach(([b, m, d]) => play(st.at(2 + v * 2, b), m, d * st.beat * 0.95)));
    I.riser(st, fx, st.at(13), st.bar, 0.8); I.crash(st, drums, st.at(14), 0.7);
    // final : chœur + cordes + cloches ensemble
    THEME.forEach(([b, m, d]) => { const t = st.at(16, b), dd = d * st.beat * 0.95; I.strings(st, lead, t, m - 12, dd, 0.8); I.choir(st, lead, t, m - 24, dd, 0.6); I.bell(st, lead, t, m + 12, dd, 0.4); });
    THEME.forEach(([b, m, d]) => { const t = st.at(18, b), dd = d * st.beat * 0.95; I.chip(st, lead, t, m, dd, 0.7); I.flute(st, lead, t, m + 12, dd, 0.5); });
  },
};
