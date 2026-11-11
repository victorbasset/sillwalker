// (it. 772) Dev : `npm run fontbench`. Sous Windows, chez Victor, la mise en forme du texte (ShapeText) coûte ≈ 30 fois
// plus que sur le serveur (3 s en 10 s de trace). Mesure, pour chaque police du jeu, le temps de mise en page d'un même
// texte (mots tous différents : pas de cache), en texte simple puis avec des symboles. Résultat dans le terminal.
const WORDS = "équipement héros zone talent compétence quête boutique familier ascension bestiaire statistiques réglages or niveau dégâts".split(" ");
const SYMBOLS = " → ★ ⚔ × • ✦ ♥ ⏱ ✓";

function sample(n, withSymbols, seed) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const w = WORDS[(i * 7 + seed) % WORDS.length];
    out.push(`${w} ${seed}${i} ${(i * 13.7 + seed).toFixed(1)}${withSymbols ? SYMBOLS.slice(0, 2 + (i % 9) * 2) : ""}`);
  }
  return out;
}

function measure(family, withSymbols, seed) {
  const box = document.createElement("div");
  box.style.cssText = `position:absolute;left:0;top:0;width:900px;visibility:hidden;font:16px ${family};`;
  for (const line of sample(400, withSymbols, seed)) { const d = document.createElement("div"); d.textContent = line; box.appendChild(d); }
  document.body.appendChild(box);
  const t = performance.now();
  void box.offsetHeight;
  const ms = performance.now() - t;
  box.remove();
  return ms;
}

export async function fontBench() {
  await document.fonts.ready;
  const fams = ['"Geist Pixel"', '"Pixelify Sans"', '"DotGothic16"', "system-ui", "monospace", "var(--font-text)"];
  // échauffement : polices chargées, une fois
  for (const f of fams) measure(f.startsWith("var") ? getComputedStyle(document.body).fontFamily : f, true, 1);
  const lines = [];
  for (const f of fams) {
    const fam = f.startsWith("var") ? getComputedStyle(document.body).fontFamily : f;
    let plain = 0, sym = 0;
    for (let r = 0; r < 3; r++) { plain += measure(fam, false, 100 + r); sym += measure(fam, true, 200 + r); }
    lines.push(`${f.padEnd(18)} texte ${Math.round(plain / 3)} ms, avec symboles ${Math.round(sym / 3)} ms`);
  }
  console.warn("[fontbench] 400 lignes mises en page (moyenne de 3) :\n" + lines.join("\n"));
}
