// (it. 1964) Parties figées dans des sauvegardes AVANCÉES : fuzz.mjs ne joue que des parties neuves ; l'impasse de
// l'it. 1958 (boss qui se régénère plus vite qu'on ne le blesse, contre un héros qui encaisse tout : ni victoire ni
// défaite pendant des heures) n'est apparue que sur dev-data. Ici : chaque sauvegarde de référence, les 20 héros,
// 2 h de jeu (horloge virtuelle) ; signale une période de 5 min sans victoire ni défaite.
// Usage : node --experimental-default-type=module scripts/stall-check.mjs [heures=2]
import { useVirtualClock } from "./virtual-clock.mjs"; // en premier : Date.now() virtuel
import { readFileSync } from "node:fs";
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { migrate } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const { CLASS_KEYS } = await import(root + "classes.js");
const H = +process.argv[2] || 2;
const here = new URL("./", import.meta.url).pathname;
const SAVES = { "dev-data": here + "../dev-data/save.json", fin: here + "fixtures/endgame-save.json", "0.1.2": here + "fixtures/save-0.1.2.json" };
let bad = 0, n = 0;
for (const [label, path] of Object.entries(SAVES)) {
  const raw = readFileSync(path, "utf8");
  for (const cls of CLASS_KEYS) {
    setRandom(seeded(cls.length * 131 + label.length));
    const S = migrate(JSON.parse(raw)); if (!S) { console.log(`illisible : ${label}`); continue; }
    S.cls = cls; S.last = Date.now();
    const g = useVirtualClock(new Game(S));
    let events = 0, quiet = 0, worst = 0;
    g.on("kill", () => events++); g.on("heroDown", () => events++);
    for (let m = 0; m < H * 60; m++) {
      const before = events; g.advance(60);
      quiet = events === before ? quiet + 1 : 0; worst = Math.max(worst, quiet);
    }
    n++;
    if (worst >= 5) { bad++; console.log(`FIGÉE ${label} ${cls} : ${worst} min sans victoire ni défaite, zone ${g.S.zone}, ${g.R.mon ? g.R.mon.type + (g.R.mon.boss ? " (boss)" : "") : "-"}`); }
  }
}
console.log(`${n} parties, ${bad} figées`);
