// Vérifie un fichier de langue : couverture et variables {n} conservées.
// Usage : node --experimental-default-type=module scripts/i18n-check.mjs es
const lang = process.argv[2];
const { KEYS } = await import("../src/renderer/i18n/keys.js");
const tab = (await import(`../src/renderer/i18n/lang/${lang}.js`)).default;
const ref = (await import("../src/renderer/i18n/lang/en.js")).default;
const ph = (s) => new Set(s.match(/\{\d+\}/g) || []);
let bad = 0;
for (const i in tab) {
  if (KEYS[i] == null) { console.log("indice inconnu", i); bad++; continue; }
  const src = ph(KEYS[i]);
  for (const p of ph(tab[i])) if (!src.has(p)) { console.log(`${i}: variable ${p} absente de la source : ${tab[i]}`); bad++; }
  // Pluriels « singulier|pluriel » (txn) : 1 forme en chinois/japonais/coréen, 3 en russe/polonais, 2 sinon.
  if (KEYS[i].includes("|")) {
    const want = ["zh", "ja", "ko"].includes(lang) ? 1 : ["ru", "pl"].includes(lang) ? 3 : 2;
    const got = tab[i].split("|").length;
    if (got !== want) { console.log(`${i}: ${got} forme(s) de pluriel au lieu de ${want} : ${tab[i]}`); bad++; }
  }
  if (/^class=|^disabled /.test(KEYS[i]) && !/^class=|^disabled /.test(tab[i])) { console.log(`${i}: attribut HTML cassé`); bad++; }
}
const missing = Object.keys(ref).filter((i) => tab[i] == null);
console.log(`${lang} : ${Object.keys(tab).length} traductions, ${missing.length} manquantes par rapport à l'anglais${missing.length ? " (" + missing.slice(0, 20).join(",") + ")" : ""}, ${bad} problème(s)`);
process.exit(bad ? 1 : 0);
