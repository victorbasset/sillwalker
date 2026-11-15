// Leitmotiv de la bande originale (tâche 3 de docs/MUSIQUE.md) : écrit en DEGRÉS de gamme (0 = tonique, 1 = 2ᵉ degré,
// −3 = quinte grave…), pour passer d'un habit à l'autre (majeur / mineur, tonalité, octave) en restant reconnaissable.
// Question (4 mesures) qui monte et reste en suspens, réponse (4 mesures) qui redescend se poser sur la tonique.
// Chaque note : [degré, temps de départ (en temps), durée (en temps)].

export const QUESTION = [
  [0, 0, 1], [-3, 1, 0.5], [0, 1.5, 0.5], [1, 2, 1], [2, 3, 1],             // rebond sur la quinte grave, puis on monte
  [1, 4, 1.5], [0, 5.5, 0.5], [-2, 6, 1], [-3, 7, 1],                         // on retombe doucement
  [-4, 8, 0.5], [-3, 8.5, 0.5], [-2, 9, 1], [0, 10, 1], [1, 11, 0.5], [2, 11.5, 0.5], // montée…
  [4, 12, 2.5], [3, 14.5, 0.5], [2, 15, 1],                                   // … jusqu'au grand saut (sixte), en suspens
];
export const ANSWER = [
  [0, 0, 1], [-3, 1, 0.5], [0, 1.5, 0.5], [1, 2, 1], [2, 3, 1],
  [1, 4, 1.5], [0, 5.5, 0.5], [-2, 6, 1], [-3, 7, 1],
  [2, 8, 1], [1, 9, 0.5], [0, 9.5, 0.5], [-1, 10, 1], [1, 11, 1],              // la descente…
  [0, 12, 3], [-3, 15, 0.5], [-1, 15.5, 0.5],                                 // … se pose sur la tonique, levée vers la reprise
];
export const THEME = [...QUESTION, ...ANSWER.map(([d, b, l]) => [d, b + 16, l])]; // 8 mesures, 32 temps

export const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  harmonic: [0, 2, 3, 5, 7, 8, 11],   // mineur harmonique : sensible vers la tonique (cadences épiques)
  lydian: [0, 2, 4, 6, 7, 9, 11],     // majeur « suspendu dans l'espace » (galactique)
};

/** Hauteur MIDI d'un degré dans une gamme (tonique MIDI `tonic`). Degrés négatifs : octaves en dessous. */
export function degree(tonic, scale, d) {
  const s = SCALES[scale] || scale, n = s.length, o = Math.floor(d / n);
  return tonic + 12 * o + s[((d % n) + n) % n];
}

/** Le motif réalisé : [{ beat, midi, len }] (décalage `at` en temps, transposition en degrés `shift`, `octave`). */
export function realize(motif, { tonic, scale = "major", at = 0, shift = 0, octave = 0, swap = null } = {}) {
  return motif.map(([d, b, l]) => {
    let dd = d + shift; if (swap && swap[dd] != null) dd = swap[dd];
    return { beat: at + b, midi: degree(tonic, scale, dd) + 12 * octave, len: l };
  });
}

/** Accord bâti par tierces sur le degré `root` de la gamme : 3 sons (triade), 4 (septième), 5 (neuvième) ; `bass`
 *  en plus, une octave sous la fondamentale. Renvoie les hauteurs MIDI, de la plus grave à la plus aiguë. */
export function chord(tonic, scale, root, size = 4, { inv = 0, octave = 0 } = {}) {
  const out = [];
  for (let k = 0; k < size; k++) out.push(degree(tonic, scale, root + 2 * k) + 12 * octave);
  for (let i = 0; i < inv; i++) out.push(out.shift() + 12); // renversement : la fondamentale passe en haut
  return out.sort((a, b) => a - b);
}

/** Grilles des 4 habits du thème (un accord par mesure, degrés de la gamme de chaque morceau), sur 8 mesures. */
export const DRESSES = {
  // (vérifié note à note : la réponse se pose sur la tonique à la 8ᵉ mesure, qui porte donc l'accord I)
  // 1. Le Rebord : ré majeur, lofi : I – vi – IV – V, puis I – vi – V – I (accords de 7e / 9e)
  ledge: { tonic: 62, scale: "major", bpm: 82, prog: [0, 5, 3, 4, 0, 5, 4, 0] },
  // 2. Sentiers d'étoiles : si mineur, aventure : i – VI – III – VII (le grand élan mineur), puis iv – VI – VII – i
  starpath: { tonic: 59, scale: "minor", bpm: 92, prog: [0, 5, 2, 6, 3, 5, 6, 0] },
  // 3. Les Lieutenants : sol mineur sombre, harmonique : i – iv – VI – V (dominante majeure, tension), puis i – iv – V – i
  //    (iv en 2ᵉ mesure : sur VI, le la de la mélodie faisait un triton contre le mi ♭ de la basse)
  embers: { tonic: 55, scale: "harmonic", bpm: 96, prog: [0, 3, 5, 4, 0, 3, 4, 0] },
  // 4. Le Briseur d'Étoiles : ré majeur triomphant, une octave plus haut ; I – V – vi – IV, puis I – V – V – I ; coda
  //    ♭VI – ♭VII – I (accords empruntés au mineur : le « lever d'étoiles » galactique), après le thème (sous la mélodie,
  //    ♭VI frottait : mi contre si ♭)
  starbreaker: { tonic: 62, scale: "major", bpm: 100, prog: [0, 4, 5, 3, 0, 4, 4, 0], coda: ["bVI", "bVII", 0] },
};

/** Accord d'une case de grille : degré de la gamme, ou accord emprunté « bVI » / « bVII » (au mode mineur). */
export function chordAt(dress, step, size = 4, opts = {}) {
  const c = dress.prog[step % dress.prog.length];
  if (c === "bVI") return chord(dress.tonic, "minor", 5, size, opts);
  if (c === "bVII") return chord(dress.tonic, "minor", 6, size, opts);
  return chord(dress.tonic, dress.scale, c, size, opts);
}
/** Fondamentale (MIDI, octave basse) d'une case de grille. */
export function rootAt(dress, step, octave = -2) {
  const c = dress.prog[step % dress.prog.length];
  if (c === "bVI") return degree(dress.tonic, "minor", 5) + 12 * octave;
  if (c === "bVII") return degree(dress.tonic, "minor", 6) + 12 * octave;
  return degree(dress.tonic, dress.scale, c) + 12 * octave;
}
