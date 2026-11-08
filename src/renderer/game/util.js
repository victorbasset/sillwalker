// Aléatoire centralisé : remplaçable (graine fixe) pour les tests.
let random = Math.random;
export function setRandom(fn) { random = fn || Math.random; }
export const rand = () => random();
export const rnd = (a, b) => a + random() * (b - a);
export const pick = (arr) => arr[Math.floor(random() * arr.length)];
export function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Générateur déterministe (mulberry32) pour les tests.
export function seeded(seed) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
