// (it. 772) Dev : `npm run fontbench`. Sous Windows, chez Victor, la mise en forme du texte (ShapeText) coûte ≈ 30 fois
// plus que sur le serveur (3 s en 10 s de trace). Mesure, pour chaque police du jeu, le temps de mise en page d'un même
// texte (mots tous différents : pas de cache), en texte simple puis avec des symboles. Résultat dans le terminal.
const WORDS = "équipement héros zone talent compétence quête boutique familier ascension bestiaire statistiques réglages or niveau dégâts".split(" ");
const SYMBOLS = " → ★ ⚔ × • ✦ ♥ ⏱ ✓";

// (it. 773) mots aléatoires, tous différents : Chromium garde la forme des mots déjà vus (le premier essai ne mesurait
// que ce cache)
let rnd = 12345;
const letter = () => { rnd = (rnd * 1103515245 + 12345) & 0x7fffffff; return "abcdefghijklmnopqrstuvwxyzéèàçêô"[rnd % 32]; };
const word = () => Array.from({ length: 4 + (rnd % 6) }, letter).join("");
function sample(n, withSymbols, seed) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const w = WORDS[(i * 7 + seed) % WORDS.length] + " " + word() + " " + word() + " " + word();
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

// (it. 773) Chez Victor, ces polices sont aussi rapides qu'ici (2 à 16 ms) : la lenteur vient du vrai panneau.
// Mise en page des VRAIS onglets (copies invisibles dans #panel), telle quelle puis avec une variante de style :
// la variante qui fait chuter le temps désigne la cause.
const VARIANTS = [
  ["tel quel", ""],
  ["police Arial partout", "font-family: Arial, sans-serif !important;"],
  ["police Geist seule", 'font-family: "Geist Pixel" !important;'],
  ["graisse 400 partout", "font-weight: 400 !important;"],
  ["une seule taille (14px)", "font-size: 14px !important;"],
  ["sans espacement de lettres ni ombres", "letter-spacing: normal !important; text-shadow: none !important;"],
];
const NO_EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{fe0f}\u{2605}\u{2606}]/gu;

function layoutClone(pane, css, stripEmoji) {
  const host = document.getElementById("panel") || document.body;
  const c = pane.cloneNode(true);
  c.hidden = false;
  c.style.cssText = "position:absolute;left:0;top:0;width:100%;visibility:hidden;pointer-events:none;";
  if (css) { c.classList.add("fb-var"); document.getElementById("fb-style").textContent = `.fb-var, .fb-var * { ${css} }`; }
  if (stripEmoji) { const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); for (let n; (n = w.nextNode());) n.data = n.data.replace(NO_EMOJI, ""); }
  host.appendChild(c);
  const t = performance.now();
  void c.offsetHeight;
  const ms = performance.now() - t;
  c.remove();
  return ms;
}

export function paneBench() {
  const P = window.__panel;
  if (!P) return;
  if (!document.getElementById("fb-style")) { const s = document.createElement("style"); s.id = "fb-style"; document.head.appendChild(s); }
  const ids = ["skills", "talents", "quests", "shop", "pets"].filter((id) => P.tabs[id]);
  for (const id of ids) { const pane = P.root.querySelector(`[data-pane="${id}"]`); if (!pane.childElementCount) P.tabs[id].render(pane); }
  const rows = [...VARIANTS.map(([n, css]) => [n, css, false]), ["sans emoji ni étoiles", "", true]];
  const res = rows.map(() => 0);
  // premier passage : formes des mots pas encore en cache (ce que paie le joueur au premier affichage)
  const first = ids.map((id) => `${id} ${Math.round(layoutClone(P.root.querySelector(`[data-pane="${id}"]`), "", false))} ms`).join(" / ");
  for (let r = 0; r < 3; r++) rows.forEach(([, css, se], i) => { for (const id of ids) res[i] += layoutClone(P.root.querySelector(`[data-pane="${id}"]`), css, se); });
  document.getElementById("fb-style").textContent = "";
  console.warn(`[fontbench] vrais onglets, premier passage : ${first}\n[fontbench] ensuite (cache rempli), moyenne de 3 :\n` + rows.map(([n], i) => `${n.padEnd(38)} ${Math.round(res[i] / 3)} ms`).join("\n"));
}
