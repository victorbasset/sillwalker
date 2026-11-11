// Cohérence des libellés cités : un texte français qui cite « X » (nom de bouton, d'onglet, de déblocage…), X étant
// lui-même une clé traduite, doit citer dans chaque langue la traduction de X, pas un autre mot (arrivé trois fois :
// « Écouter », « Ascension », « Tri du marchand »).
// Usage : node --experimental-default-type=module scripts/i18n-quotes.mjs [langues]   (0 problème attendu)
// (it. 679) Même règle pour les noms de héros cités dans « Quoi de neuf » (it. 677 : « プリーステス » au lieu de « 司祭 »).
const { KEYS } = await import("../src/renderer/i18n/keys.js");
const { NEWS_EDITIONS } = await import("../src/renderer/game/news.js");
const { CLASSES } = await import("../src/renderer/game/classes.js");
const HERO_NAMES = Object.values(CLASSES).map((c) => c.name);
const NEWS = new Set(NEWS_EDITIONS.flat());
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
    const cited = [...k.matchAll(/«\s*([^»]+?)\s*»/g)].map((m) => m[1]);
    if (NEWS.has(k)) for (const n of HERO_NAMES) if (new RegExp(`(^|[^\\p{L}])${n}([^\\p{L}]|$)`, "u").test(k)) cited.push(n);
    for (const c of cited) {
      const m = [null, c];
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
