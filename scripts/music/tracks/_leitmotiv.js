// Démonstration du leitmotiv dans ses 4 habits (tâche 3 de docs/MUSIQUE.md) : 1 mesure d'introduction + le thème
// (8 mesures) ; le dernier habit finit par sa coda ♭VI – ♭VII – I. Utilisé par leit-<habit>.js.
import * as I from "../instruments.js";
import { THEME, DRESSES, realize, chordAt, rootAt } from "../theme.js";

export function leitmotiv(name) {
  const D = DRESSES[name], coda = D.coda ? D.coda.length : 0;
  return {
    bpm: D.bpm, bars: 9 + coda, tail: 5,
    async render(st) {
      const lead = st.channel("lead", { db: -1, pan: 0.05, verb: 0.3, delay: 0.12, duck: 0.12 });
      const lead2 = st.channel("lead2", { db: -6, pan: -0.2, verb: 0.35, delay: 0.1, duck: 0.12 });
      const keys = st.channel("keys", { db: -7, pan: -0.25, verb: 0.25, duck: 0.25 });
      const arp = st.channel("arp", { db: -10, pan: 0.35, verb: 0.25, delay: 0.2, duck: 0.3 });
      const padc = st.channel("pad", { db: -12, verb: 0.45, duck: 0.45, hp: 160 });
      const bass = st.channel("bass", { db: -7, duck: 0.35 });
      const drums = st.channel("drums", { db: -7, verb: 0.06, lp: 10000 });
      const perc = st.channel("perc", { db: -6, verb: 0.3 });
      const fx = st.channel("fx", { db: -11, verb: 0.2 });
      const bars = 9 + coda, end = st.at(bars);
      const chordOf = (bar) => (bar >= 9 ? null : bar === 0 ? 0 : bar - 1);
      const cAt = (bar, size, opts) => (bar >= 9 ? (D.coda[bar - 9] === 0 ? chordAt({ ...D, prog: [0] }, 0, size, opts) : chordAt({ ...D, prog: [D.coda[bar - 9]] }, 0, size, opts)) : chordAt(D, chordOf(bar), size, opts));
      const rAt = (bar) => (bar >= 9 ? rootAt({ ...D, prog: [D.coda[bar - 9]] }, 0) : rootAt(D, chordOf(bar)));
      const mel = realize(THEME, { tonic: D.tonic + 12, scale: D.scale, at: 4 });
      if (name === "ledge") st.setWow(10, 0); else if (name === "starpath") st.setWow(4, 0); else st.setWow(2, 0);
      if (name === "ledge") I.vinyl(st, fx, 0, end, 6, 0.8);
      for (let bar = 0; bar < bars; bar++) {
        const t = st.at(bar), ch = cAt(bar, name === "ledge" ? 5 : 4), root = rAt(bar);
        if (name === "ledge") {
          ch.slice(1).forEach((m, i) => I.epiano(st, keys, t + i * 0.014, m, st.bar * 0.95, 0.55));
          [0, 1, 2, 3, 4, 3, 2, 1].forEach((n, j) => I.pluck(st, arp, t + j * st.beat / 2 + (j % 2 ? 0.03 : 0), ch[n % ch.length] + 12, st.beat / 2, 0.45, 0.55));
          I.sub(st, bass, t, root, st.beat * 1.5, 0.85); I.sub(st, bass, t + st.beat * 2.5, root + 7, st.beat * 1.2, 0.6);
          for (let b = 0; b < 4; b++) { if (b === 0 || (b === 2 && bar % 2)) I.kick(st, drums, st.at(bar, b), 0.85); if (b === 1 || b === 3) I.snare(st, drums, st.at(bar, b), 0.65); for (let e = 0; e < 2; e++) I.hat(st, drums, st.at(bar, b + e * 0.5 + (e ? 0.08 : 0)), e ? 0.3 : 0.45); }
        } else if (name === "starpath") {
          I.pad(st, padc, t, ch[0] + 12, st.bar, 0.6, { cut: 2400 });
          for (let j = 0; j < 16; j++) I.pluck(st, arp, t + j * st.beat / 4, ch[[0, 1, 2, 3, 2, 1, 2, 3][j % 8]] + 12 + (j >= 8 ? 12 : 0), st.beat / 4, 0.4, 0.7);
          [0, 1.5, 2.5, 3].forEach((b, i) => I.pluckbass(st, bass, st.at(bar, b), root + (i === 2 ? 12 : 0), st.beat * (i ? 0.5 : 1.2), 0.85));
          for (let b = 0; b < 4; b++) { if (b === 0 || b === 2.5 || (b === 2 && bar % 2)) I.kick(st, drums, st.at(bar, b), 0.8); if (b === 1 || b === 3) I.clap(st, drums, st.at(bar, b), 0.6); for (let e = 0; e < 4; e++) I.shaker(st, drums, st.at(bar, b + e / 4), e % 2 ? 0.4 : 0.7); }
        } else if (name === "embers") {
          ch.forEach((m) => I.strings(st, keys, t, m, st.bar * 0.98, 0.55, { attack: 0.5 }));
          I.pad(st, padc, t, root + 24, st.bar, 0.55, { cut: 1300 });
          I.sub(st, bass, t, root, st.bar * 0.9, 0.9);
          I.tom(st, perc, st.at(bar, 0), 38, 0.85, true); I.tom(st, perc, st.at(bar, 2.5), 45, 0.6); I.tom(st, perc, st.at(bar, 3), 43, 0.65); I.tom(st, perc, st.at(bar, 3.5), 40, 0.7);
          for (let b = 0; b < 4; b++) { if (b === 1 || b === 3) I.snare(st, drums, st.at(bar, b), 0.55); I.hat(st, drums, st.at(bar, b + 0.5), 0.3); }
        } else { // starbreaker
          I.pad(st, padc, t, ch[0] + 12, st.bar, 0.75, { cut: 3200, voices: 7 }); I.pad(st, padc, t, ch[2] + 12, st.bar, 0.55, { cut: 3200, voices: 7 });
          ch.forEach((m) => I.choir(st, keys, t, m, st.bar * 0.98, 0.45));
          for (let j = 0; j < 16; j++) I.bell(st, arp, t + j * st.beat / 4, ch[[0, 1, 2, 3][j % 4]] + 24, st.beat / 4, 0.3, { ring: 0.6 });
          for (let e = 0; e < 8; e++) I.pluckbass(st, bass, st.at(bar, e / 2), root + (e % 2 ? 12 : 0), st.beat * 0.45, 0.85);
          if (bar % 4 === 1 || bar === 9) I.crash(st, drums, t, 0.6);
          for (let b = 0; b < 4; b++) { I.kick(st, drums, st.at(bar, b), b % 2 ? 0.7 : 0.95); if (b === 1 || b === 3) { I.snare(st, drums, st.at(bar, b), 0.8); I.clap(st, drums, st.at(bar, b), 0.5); } for (let e = 0; e < 2; e++) I.hat(st, drums, st.at(bar, b + e * 0.5), e ? 0.5 : 0.35, e === 1); }
          if (bar === 8) I.riser(st, fx, t, st.bar, 0.8);
        }
      }
      // la mélodie
      for (const n of mel) {
        const t = st.at(0, n.beat), d = n.len * st.beat * 0.95;
        if (name === "ledge") I.flute(st, lead, t, n.midi, d, 0.8);
        else if (name === "starpath") { I.bell(st, lead, t, n.midi, d, 0.7, { ring: 1.4 }); I.chip(st, lead2, t, n.midi, d, 0.6); }
        else if (name === "embers") { I.strings(st, lead, t, n.midi, d, 0.9, { attack: 0.08 }); I.choir(st, lead2, t, n.midi - 12, d, 0.6); }
        else { I.chip(st, lead, t, n.midi + 12, d, 0.8, { glide: 1 }); I.strings(st, lead2, t, n.midi, d, 0.9, { attack: 0.05 }); }
      }
      if (coda) { // coda : la tonique tenue au-dessus de ♭VI – ♭VII – I
        I.chip(st, lead, st.at(9), D.tonic + 24, st.bar * 2.9, 0.7); I.strings(st, lead2, st.at(9), D.tonic + 12, st.bar * 2.9, 0.9);
        I.crash(st, drums, st.at(11), 0.8); I.tom(st, perc, st.at(11), 38, 0.9, true);
      }
    },
  };
}
