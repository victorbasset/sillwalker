// (it. 914) Les nombres de la page du magasin Steam (steam/store-page.md, 10 langues) suivent le contenu du jeu :
// héros, compétences, régions, monstres, automatismes, événements rares, capacités de boss, élites, sortes de quêtes.
// Lancé par npm test : un ajout de contenu qui rend la page fausse fait échouer les tests (comme les succès Steam).
// Chaque section de langue a la même liste « vraie progression » ; ses nombres, dans l'ordre, sont comparés au code.
import fs from "node:fs";
const R = "../src/renderer/game/";
const { CLASSES } = await import(R + "classes.js");
const { SKILL_TREE } = await import(R + "skilltree.js");
const { ZONES, MONSTERS, ELITE_AFFIXES } = await import(R + "data.js");
const { UNLOCKS } = await import(R + "unlocks.js");
const { EVENTS } = await import(R + "events.js");
const { BOSS_MECHANICS } = await import(R + "bosses.js");
const { QUEST_TEMPLATES } = await import(R + "quests.js");
const n = (o) => Object.keys(o).length;
// [nom, valeur du jeu, règle] : "=" exact, "≤" la page dit « plus de N » (N ne doit pas dépasser le jeu)
const EXPECT = [
  ["héros", n(CLASSES), "="],
  ["compétences", Object.values(SKILL_TREE.nodes).filter((x) => x.kind !== "root").length, "="],
  ["régions", ZONES.length, "≤"],
  ["monstres", n(MONSTERS), "≤"],
  ["automatismes", UNLOCKS.length, "="],
  ["événements rares", n(EVENTS), "="],
  ["capacités de boss", n(BOSS_MECHANICS), "="],
  ["sortes d'élites", n(ELITE_AFFIXES), "="],
  ["sortes de quêtes", n(QUEST_TEMPLATES), "="],
];
const page = fs.readFileSync(new URL("../steam/store-page.md", import.meta.url), "utf8");
const sections = page.split(/\n## /).slice(1).filter((s) => s.includes("[list]"));
const bad = [];
for (const sec of sections) {
  const lang = sec.split("\n")[0].trim();
  const list = sec.slice(sec.indexOf("[list]"), sec.indexOf("[/list]"));
  const nums = (list.match(/\d+/g) || []).map(Number);
  if (nums.length !== EXPECT.length) { bad.push(`${lang} : ${nums.length} nombres dans la liste, ${EXPECT.length} attendus (${nums.join(", ")})`); continue; }
  EXPECT.forEach(([what, v, rule], i) => {
    const ok = rule === "=" ? nums[i] === v : nums[i] <= v;
    if (!ok) bad.push(`${lang} : ${what} = ${nums[i]} sur la page, ${v} dans le jeu`);
  });
}
if (sections.length < 10) bad.push(`${sections.length} sections de langue trouvées, 10 attendues`);
if (bad.length) { console.error("steam/store-page.md à mettre à jour :\n  " + bad.join("\n  ")); process.exit(1); }
console.log(`steam-store-check : nombres de la page du magasin à jour (${sections.length} langues)`);
