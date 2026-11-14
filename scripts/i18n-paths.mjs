// (it. 1306) Chemins « Onglet > Sous-section » cités sans guillemets dans un texte (Quoi de neuf, aides) : chaque
// traduction doit reprendre les libellés tels que traduits dans le jeu (i18n-quotes ne voit que les « … » ;
// « 图鉴 > 套装 » au lieu de « 怪物图鉴 », it. 1305-1306). Lancé par npm test.
const ROOT = new URL("../src/renderer/i18n/", import.meta.url).href;
const { KEYS } = await import(ROOT + "keys.js");
const langs = ["en","de","es","pt","pl","ru","zh","ja","ko"];
const L = {}; for (const l of langs) L[l] = (await import(ROOT + `lang/${l}.js`)).default;
const idx = new Map(KEYS.map((k, i) => [k, i]));
let bad = 0, n = 0;
KEYS.forEach((k, i) => {
  for (const m of k.matchAll(/([A-ZÀ-Ý][\p{L}’' ]{2,40}?) > ([A-ZÀ-Ý][\p{L}’' ]{2,40}?)(?= ?[:,.(;)]|$| :)/gu)) {
    const parts = [m[1].trim(), m[2].trim()].filter((p) => idx.has(p));
    if (!parts.length) continue; n++;
    for (const l of langs) { const tr = L[l][i]; if (!tr) continue;
      for (const p of parts) { const want = L[l][idx.get(p)]; if (want && !tr.includes(want)) { bad++; console.log(l, i, JSON.stringify(p), "→", JSON.stringify(want), "absent de :", tr.slice(0, 90)); } } }
  }
});
console.log(`i18n-paths : ${n} chemins « Onglet > Sous-section », ${bad} écart(s)`);
if (bad) process.exit(1);
