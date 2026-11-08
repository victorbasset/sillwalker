// Quêtes (contrats) : QUEST_SLOTS quêtes actives en même temps. Une quête
// terminée attend que le joueur réclame sa récompense ; une nouvelle prend
// alors sa place. Les objectifs et récompenses suivent la progression.
import { MONSTERS } from "./data.js";
import { zoneDef } from "./rules.js";
import { rand, pick } from "./util.js";

export const QUEST_SLOTS = 3;
export const goldScale = (S) => 3 * Math.pow(1.25, Math.max(1, S.best) - 1); // or d'un monstre normal
export const questRerollPrice = (S) => Math.round(goldScale(S) * 25);

const randInt = (a, b) => a + Math.floor(rand() * (b - a + 1));
const plural = (n, s, p = s + "s") => (n > 1 ? p : s);

/**
 * Modèles. make(S) -> { goal, type?, reward }. Les récompenses possibles :
 * gold, chest (rareté minimale), buff (id d'élixir), potions, egg, shards.
 */
export const QUEST_TEMPLATES = {
  kill: {
    text: (q) => `Vaincre ${q.goal} monstres`,
    make: (S) => { const goal = randInt(4, 8) * 10; return { goal, reward: { gold: Math.round(goal * goldScale(S) * 2.5) } }; },
  },
  hunt: {
    text: (q) => `Chasser ${q.goal} ${MONSTERS[q.type].name.toLowerCase()}${q.goal > 1 && !/s$/.test(MONSTERS[q.type].name) ? "s" : ""}`,
    make: (S) => {
      const type = pick(zoneDef(S.zone).monsters), goal = randInt(3, 6) * 5;
      return { goal, type, reward: { gold: Math.round(goal * goldScale(S) * 4), egg: rand() < 0.15 } };
    },
  },
  elite: {
    text: (q) => `Vaincre ${q.goal} ${plural(q.goal, "élite")}`,
    make: (S) => ({ goal: randInt(2, 4), reward: { chest: 2, gold: Math.round(goldScale(S) * 60) } }),
  },
  boss: {
    text: (q) => `Vaincre ${q.goal} boss`,
    make: (S) => ({ goal: randInt(2, 3), reward: { gold: Math.round(goldScale(S) * 120), egg: rand() < 0.3, shards: S.prestige.count > 0 ? randInt(1, 3) : 0 } }),
  },
  gold: {
    text: (q) => `Ramasser ${q.goalText} or`,
    make: (S) => ({ goal: Math.round(goldScale(S) * randInt(150, 300)), reward: { buff: pick(["elixir", "fortune", "wisdom"]), potions: 3 } }),
  },
  forge: {
    text: (q) => `Forger ${q.goal} ${plural(q.goal, "fois", "fois")}`,
    make: (S) => ({ goal: randInt(2, 4), reward: { gold: Math.round(goldScale(S) * 80), potions: 2 } }),
  },
  expedition: {
    text: (q) => `Ramener ${q.goal} ${plural(q.goal, "expédition")} de familier`,
    ok: (S) => Object.keys(S.pets.owned).length >= 2,
    make: (S) => ({ goal: randInt(1, 2), reward: { gold: Math.round(goldScale(S) * 100), egg: rand() < 0.5 } }),
  },
  transmute: {
    text: (q) => `Créer ${q.goal} ${plural(q.goal, "objet")} par transmutation`,
    make: (S) => ({ goal: randInt(2, 4), reward: { chest: 2, potions: 2 } }),
  },
  zone: {
    text: (q) => `Atteindre la zone ${q.goal}`,
    make: (S) => ({ goal: S.best + randInt(2, 3), reward: { chest: 3, egg: rand() < 0.4, shards: S.prestige.count > 0 ? 3 : 0 } }),
  },
};
const WEIGHTS = { kill: 3, hunt: 3, elite: 2, boss: 2, gold: 2, forge: 1, zone: 1, expedition: 1, transmute: 1 };

export function makeQuest(S, uid, exclude = []) {
  const kinds = Object.keys(WEIGHTS).filter((k) => !exclude.includes(k) && (!QUEST_TEMPLATES[k].ok || QUEST_TEMPLATES[k].ok(S)));
  let total = kinds.reduce((a, k) => a + WEIGHTS[k], 0), x = rand() * total, kind = kinds[0];
  for (const k of kinds) { x -= WEIGHTS[k]; if (x <= 0) { kind = k; break; } }
  const q = Object.assign({ uid, kind, progress: kind === "zone" ? S.best : 0 }, QUEST_TEMPLATES[kind].make(S));
  return q;
}

export const questText = (q, fmt) => QUEST_TEMPLATES[q.kind].text(Object.assign({ goalText: fmt ? fmt(q.goal) : q.goal }, q));
export const questDone = (q) => q.progress >= q.goal;
