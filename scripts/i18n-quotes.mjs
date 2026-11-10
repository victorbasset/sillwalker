// Cohérence des libellés cités : un texte français qui cite « X » (nom de bouton, d'onglet, de déblocage…), X étant
// lui-même une clé traduite, doit citer dans chaque langue la traduction de X, pas un autre mot (arrivé trois fois :
// « Écouter », « Ascension », « Tri du marchand »).
// Usage : node --experimental-default-type=module scripts/i18n-quotes.mjs [langues]   (0 problème attendu)
const { KEYS } = await import("../src/renderer/i18n/keys.js");
const langs = (process.argv[2] || "en,es,pt,de,pl,ru,zh,ja,ko").split(",");
const index = new Map(KEYS.map((k, i) => [k, i]));
const norm = (s) => String(s).toLowerCase().normalize("NFKC").replace(/[«»“”„"'’‘「」『』]/g, "").replace(/\s+/g, " ").trim();
let total = 0;
for (const l of langs) {
  const tab = (await import(`../src/renderer/i18n/lang/${l}.js`)).default;
  const out = [];
  KEYS.forEach((k, i) => {
    const tr = tab[i];
    if (typeof tr !== "string") return;
    for (const m of k.matchAll(/«\s*([^»]+?)\s*»/g)) {
      const j = index.get(m[1]);
      if (j == null || typeof tab[j] !== "string") continue; // citation qui n'est pas un libellé du jeu
      // Le libellé peut être décliné (majuscule, pluriel…) : on accepte la traduction exacte ou son début (5 lettres).
      const want = norm(tab[j]), got = norm(tr);
      if (!got.includes(want) && !(want.length > 5 && got.includes(want.slice(0, Math.max(5, Math.floor(want.length * 0.7)))))) {
        out.push(`  ${i} « ${m[1]} » → attendu « ${tab[j]} » dans : ${tr.slice(0, 110)}`);
      }
    }
  });
  total += out.length;
  if (out.length) console.log(`${l} : ${out.length} problème(s)\n` + out.join("\n"));
}
console.log(`i18n-quotes : ${total} problème(s) de libellé cité (${langs.length} langues)`);
process.exitCode = total ? 1 : 0;
