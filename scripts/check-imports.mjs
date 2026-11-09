// Imports oubliés : une constante en majuscules (LEGENDARY, SETS, KILLS_PER_ZONE…) utilisée dans un module
// de src/renderer sans y être importée ni déclarée provoque une ReferenceError seulement à l'exécution
// (que la vérification de syntaxe ne voit pas). Heuristique : chaînes, gabarits et commentaires retirés,
// puis chaque identifiant TOUT_EN_MAJUSCULES doit être importé, déclaré (const/let/function/class) ou global.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../src/renderer");
const GLOBALS = new Set(["NaN", "JSON", "URL", "DOM", "HTML", "CSS", "API", "SVG", "PNG", "UTF", "ID", "OK", "TODO", "FPS", "RGB", "PV", "HP", "XP", "UI"]);
const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (!/i18n[\\/]lang$/.test(p)) walk(p); } else if (p.endsWith(".js")) files.push(p); } };
walk(ROOT);

// Retire commentaires et chaînes (y compris le texte des gabarits, en gardant le code de ${…}).
function codeOnly(src) {
  let out = "", i = 0;
  const stack = []; // gabarits imbriqués : profondeur d'accolades dans ${…}
  while (i < src.length) {
    const c = src[i], n = src[i + 1];
    const inTpl = stack.length && stack[stack.length - 1] === -1;
    if (inTpl) { // texte d'un gabarit
      if (c === "\\") { i += 2; continue; }
      if (c === "`") { stack.pop(); i++; out += " "; continue; }
      if (c === "$" && n === "{") { stack[stack.length - 1] = 0; stack.push(-2); i += 2; out += " "; continue; }
      i++; continue;
    }
    if (c === "/" && n === "/") { while (i < src.length && src[i] !== "\n") i++; continue; }
    if (c === "/" && n === "*") { i = src.indexOf("*/", i + 2); i = i < 0 ? src.length : i + 2; continue; }
    if (c === "'" || c === '"') { const q = c; i++; while (i < src.length && src[i] !== q) { if (src[i] === "\\") i++; i++; } i++; out += " ''"; continue; }
    if (c === "`") { stack.push(-1); i++; out += " "; continue; }
    if (stack.length && stack[stack.length - 1] === -2) { // code d'un ${…}
      if (c === "{") { stack.push(-3); }
      else if (c === "}") { stack.pop(); stack[stack.length - 1] = -1; i++; out += " "; continue; }
    } else if (stack.length && stack[stack.length - 1] === -3 && c === "}") { stack.pop(); out += c; i++; continue; }
    else if (stack.length && stack[stack.length - 1] === -3 && c === "{") { stack.push(-3); }
    out += c; i++;
  }
  return out;
}

let problems = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  // Lignes d'import / de réexport retirées (« PIXEL as P » : seul P est utilisé) ; expressions régulières « /^…/ » aussi.
  const code = codeOnly(src).split("\n").filter((l) => !/^\s*(import|export\s*\{[^}]*\}\s*from)\b/.test(l)).join("\n").replace(/\/\^[^/\n]*\//g, " ");
  const known = new Set(GLOBALS);
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from/g)) for (const part of m[1].split(",")) { const name = part.trim().split(/\s+as\s+/).pop().trim(); if (name) known.add(name); }
  for (const m of src.matchAll(/import\s+(\*\s+as\s+)?([A-Za-z_$][\w$]*)\s+from/g)) known.add(m[2]);
  for (const m of code.matchAll(/\b(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)) known.add(m[1]);
  for (const m of code.matchAll(/,\s*([A-Z][A-Z0-9_]*)\s*=(?!=)/g)) known.add(m[1]); // const A = 1, B = 2
  for (const m of code.matchAll(/\b(?:const|let|var)\s*\{([^}]*)\}/g)) for (const p of m[1].split(",")) known.add(p.split(":").pop().trim());
  const used = new Set();
  for (const m of code.matchAll(/(?<![\w$.])([A-Z][A-Z0-9_]{2,})\b(?!\s*:)/g)) used.add(m[1]);
  const missing = [...used].filter((n) => !known.has(n));
  if (missing.length) { problems += missing.length; console.log(`${path.relative(ROOT, f)} : ${missing.join(", ")}`); }
}
console.log(problems ? `${problems} identifiant(s) non importé(s)` : "Imports : OK");
process.exit(problems ? 1 : 0);
