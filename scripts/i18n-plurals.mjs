const { KEYS } = await import("file:///P:/sillwalker/src/renderer/i18n/keys.js");
const L = process.argv[2];
const tab = (await import(`file:///P:/sillwalker/src/renderer/i18n/lang/${L}.js`)).default;
for (const [i, k] of KEYS.entries()) {
  // placeholders collés à une lettre dans la source française = pluriels probables
  const pl = [...k.matchAll(/[a-zéèêûô)]\{(\d)\}/gi)].map((m) => m[1]);
  if (!pl.length || tab[i] == null) continue;
  const kept = pl.filter((n) => tab[i].includes("{" + n + "}"));
  if (kept.length) console.log(L, i, JSON.stringify(k), "=>", JSON.stringify(tab[i]), "garde", kept.join(","));
}
