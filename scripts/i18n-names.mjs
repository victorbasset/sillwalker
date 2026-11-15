// (it. 1374) Noms du jeu (consommables, événements, familiers, déblocages, bénédictions, affixes d'élites, panoplies,
// reliques, constellations, atelier, coffres) cités dans d'autres textes : la traduction devrait reprendre le nom
// tel que traduit. Pas dans npm test : les déclinaisons (génitifs allemands, « 의 » coréen, russe et polonais par
// défaut exclus) donnent des faux positifs à juger à la main. A trouvé « 대장장이 장인 » (it. 1372) et « 狂戦士の怒りの »
// (it. 1373). Usage : node --experimental-default-type=module scripts/i18n-names.mjs [en,de,es,pt,zh,ja,ko]
const R = new URL("../src/renderer/", import.meta.url).href;
const { KEYS } = await import(R + "i18n/keys.js");
const { CONSUMABLES } = await import(R + "game/shop.js");
const { EVENTS } = await import(R + "game/events.js");
const { PETS } = await import(R + "game/pets.js");
const { UNLOCKS } = await import(R + "game/unlocks.js");
const { DAY_MODS } = await import(R + "game/daymods.js");
const { ELITE_AFFIXES } = await import(R + "game/data.js");
const { SETS } = await import(R + "game/sets.js");
const { RELICS } = await import(R + "game/relics.js");
const { CONSTELLATIONS } = await import(R + "game/prestige.js");
const { WORKSHOP, CHESTS } = await import(R + "game/shop.js");
const names = [...Object.values(ELITE_AFFIXES).map((e) => e.name), ...Object.values(SETS).map((e) => e.name), ...Object.values(RELICS).map((e) => e.name), ...CONSTELLATIONS.map((c) => c.name), ...WORKSHOP.map((c) => c.name), ...CHESTS.map((c) => c.name), ...CONSUMABLES.map((c) => c.name), ...Object.values(EVENTS).map((e) => e.name), ...PETS.map((p) => p.name), ...UNLOCKS.map((u) => u.name), ...Object.values(DAY_MODS).map((d) => d.name)].filter((n) => n && n.length >= 6);
const langs = (process.argv[2] || "en,de,es,pt,zh,ja,ko").split(",");
const L = {}; for (const l of langs) L[l] = (await import(R + `i18n/lang/${l}.js`)).default;
const idx = new Map(KEYS.map((k, i) => [k, i]));
let n = 0;
for (const name of names) { const ni = idx.get(name); if (ni == null) continue;
  KEYS.forEach((k, i) => { if (i === ni || !k.includes(name)) return;
    for (const l of langs) { const tr = L[l][i], want = L[l][ni]; if (!tr || !want) continue;
      if (!tr.toLowerCase().includes(want.toLowerCase())) { n++; console.log(l, i, "«" + name + "» →", JSON.stringify(want), "|", tr.slice(0, 110)); } } }); }
console.log("écarts :", n);
