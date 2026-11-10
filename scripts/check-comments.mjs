// Commentaire « // » qui avale du code : ajouté au milieu d'une ligne (objet littéral, liste de déclarations, appel),
// il transforme la fin de la ligne en commentaire sans erreur de syntaxe (arrivé quatre fois : `kept`, son des records,
// `by` de la cinématique, sorts gardés à l'ascension). Heuristique : le code avant « // » ne finit pas une instruction ou un élément (; { } ( [ , =>)
// et le commentaire, lui, finit comme du code (« ; » ou « , »). Mettre le commentaire sur sa propre ligne, au-dessus.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (!/i18n[\\/]lang$|node_modules/.test(p)) walk(p); } else if (/\.(m?js)$/.test(p)) files.push(p); } };
walk(path.join(ROOT, "src")); walk(path.join(ROOT, "scripts"));
files.push(...process.argv.slice(2)); // fichiers en plus (contrôle du contrôle)

/** Position du « // » de commentaire hors chaîne, ou -1 (chaînes simples, doubles et gabarits sur la ligne). */
function commentAt(line) {
  let q = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === "\\") i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === "`") q = c;
    else if (c === "/" && line[i + 1] === "/" && line[i - 1] !== ":" && line[i - 1] !== "\\") return i; // ni URL ni regex
  }
  return -1;
}

const bad = [];
for (const f of files) fs.readFileSync(f, "utf8").split("\n").forEach((l, i) => {
  const at = commentAt(l);
  if (at <= 0) return;
  const code = l.slice(0, at).trimEnd(), com = l.slice(at + 2).trimEnd();
  if (!code.trim()) return;
  // Propriétés d'objet dans le commentaire (« clé: valeur, ») : un objet littéral avalé (it. 469, liste de ce que
  // l'ascension garde), quelle que soit la fin du code.
  // (Un exemple de format entre accolades, « { clé: valeur, … } », est une documentation : ignoré.)
  if (/\b[a-zA-Z_$][\w$]*: [a-zA-Z_$][\w$.]*(\([^)]*\))?,/.test(com.replace(/\{[^}]*\}?/g, ""))) { bad.push(`${path.relative(ROOT, f)}:${i + 1}: ${l.trim().slice(0, 150)}`); return; }
  // « ); » en fin de commentaire : presque toujours un appel avalé, quelle que soit la fin du code.
  const callTail = /\)\s*;$/.test(com);
  if (!callTail && /[;{}(\[,]$|=>$/.test(code)) return;
  if (callTail || /[;,]$/.test(com)) bad.push(`${path.relative(ROOT, f)}:${i + 1}: ${l.trim().slice(0, 150)}`);
});
if (bad.length) {
  console.error("Commentaire « // » qui semble avaler du code (le mettre sur sa propre ligne) :\n" + bad.join("\n"));
  process.exit(1);
}
console.log(`commentaires : ${files.length} fichiers, aucun code avalé`);
