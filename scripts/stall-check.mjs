// (it. 1964) Parties figées dans des sauvegardes AVANCÉES : fuzz.mjs ne joue que des parties neuves ; l'impasse de
// l'it. 1958 (boss qui se régénère plus vite qu'on ne le blesse, contre un héros qui encaisse tout : ni victoire ni
// défaite pendant des heures) n'est apparue que sur dev-data. Ici : chaque sauvegarde de référence, les 20 héros,
// 2 h de jeu (horloge virtuelle) ; signale une période de 5 min sans victoire ni défaite.
// Usage : node --experimental-default-type=module scripts/stall-check.mjs [heures=2]   (STALL_DAYMOD=<clé|all>)
import { useVirtualClock } from "./virtual-clock.mjs"; // en premier : Date.now() virtuel
import { readFileSync } from "node:fs";
const root = new URL("../src/renderer/game/", import.meta.url).href;
const { Game } = await import(root + "game.js");
const { migrate } = await import(root + "state.js");
const { setRandom, seeded } = await import(root + "util.js");
const { CLASS_KEYS } = await import(root + "classes.js");
// STALL_DAYMOD=all : une bénédiction du jour différente pour chaque héros (elles changent la file : élites, champions…)
const { DAY_MOD_KEYS } = await import(root + "daymods.js");
const DM = process.env.STALL_DAYMOD || "";
const H = +process.argv[2] || 2;
const here = new URL("./", import.meta.url).pathname;
// (it. 2982) « semaine » : la partie d'une semaine (record 353, constellations au maximum ; it. 2976, y a trouvé deux défauts et un plantage)
const SAVES = { "dev-data": here + "../dev-data/save.json", fin: here + "fixtures/endgame-save.json", "0.1.2": here + "fixtures/save-0.1.2.json", semaine: here + "fixtures/week-save.json", heure: here + "fixtures/hour-save.json", "6h": here + "fixtures/sixh-save.json" };
// (it. 3177) « 6h » : la partie de 6 heures (druide, it. 3149), entre l'heure et la fin de partie
// (it. 3128) « heure » : la partie d'une heure (zone 39, aucune ascension ; it. 3116)
let bad = 0, n = 0;
for (const [label, path] of Object.entries(SAVES)) {
  const raw = readFileSync(path, "utf8");
  for (const cls of CLASS_KEYS) {
    setRandom(seeded(cls.length * 131 + label.length));
    const S = migrate(JSON.parse(raw)); if (!S) { console.log(`illisible : ${label}`); continue; }
    S.cls = cls; S.last = Date.now();
    if (DM && S.daily) S.daily.mod = DM === "all" ? DAY_MOD_KEYS[CLASS_KEYS.indexOf(cls) % DAY_MOD_KEYS.length] : DM;
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
