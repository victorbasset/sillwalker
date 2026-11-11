// (it. 818) Éditions de « Quoi de neuf » (game/news.js) prêtes à coller dans un devlog itch.io / une annonce Steam.
// Usage : node --experimental-default-type=module scripts/devlog.mjs [première édition] [dernière] [langue=en]
//   ex. : … devlog.mjs 27 30 en   (sans numéros : la dernière édition seulement)
const { NEWS_EDITIONS } = await import("../src/renderer/game/news.js");
const { setLang, t: tx } = await import("../src/renderer/i18n/index.js");
const n = NEWS_EDITIONS.length;
const from = +process.argv[2] || n, to = +process.argv[3] || from, lang = process.argv[4] || "en";
setLang(lang);
for (let e = from; e <= Math.min(to, n); e++) {
  console.log(`### ${lang === "fr" ? "Édition" : "Update"} ${e}\n`);
  for (const line of NEWS_EDITIONS[e - 1]) console.log(`- ${tx(line)}`);
  console.log("");
}
