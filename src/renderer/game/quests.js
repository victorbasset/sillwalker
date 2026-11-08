// Quêtes (contrats) : QUEST_SLOTS quêtes actives en même temps. Une quête
// terminée attend que le joueur réclame sa récompense ; une nouvelle prend
// alors sa place. Les objectifs et récompenses suivent la progression.
import { t as tx, getLang } from "../i18n/index.js";
import { MONSTERS } from "./data.js";
import { zoneDef } from "./rules.js";
import { rand, pick } from "./util.js";

export const QUEST_SLOTS = 3;
export const goldScale = (S) => 3 * Math.pow(1.25, Math.max(1, S.best) - 1); // or d'un monstre normal
export const questRerollPrice = (S) => Math.round(goldScale(S) * 25);

const randInt = (a, b) => a + Math.floor(rand() * (b - a + 1));
const plural = (n, s, p = s + "s") => (n > 1 ? p : s);
const fr = () => getLang() === "fr";

/**
 * Modèles. make(S) -> { goal, type?, reward }. Les récompenses possibles :
 * gold, chest (rareté minimale), buff (id d'élixir), potions, egg, shards.
 */
export const QUEST_TEMPLATES = {
  kill: {
    text: (q) => `${tx("Vaincre {0} monstres", { 0: q.goal })}`,
    make: (S) => { const goal = randInt(4, 8) * 10; return { goal, reward: { gold: Math.round(goal * goldScale(S) * 2.5) } }; },
  },
  hunt: {
    text: (q) => (fr() ? tx("Chasser {0} {1}{2}", { 0: q.goal, 1: MONSTERS[q.type].name.toLowerCase(), 2: q.goal > 1 && !/s$/.test(MONSTERS[q.type].name) ? "s" : "" })
      : tx("Chasser : {1} ×{0}", { 0: q.goal, 1: MONSTERS[q.type].name })),
    make: (S) => {
      const type = pick(zoneDef(S.zone).monsters), goal = randInt(3, 6) * 5;
      return { goal, type, reward: { gold: Math.round(goal * goldScale(S) * 4), egg: rand() < 0.15 } };
    },
  },
  elite: {
    text: (q) => (fr() ? tx("Vaincre {0} {1}", { 0: q.goal, 1: plural(q.goal, "élite") }) : tx("Vaincre {0} élites", { 0: q.goal })),
    make: (S) => ({ goal: randInt(2, 4), reward: { chest: 2, gold: Math.round(goldScale(S) * 60) } }),
  },
  boss: {
    text: (q) => `${tx("Vaincre {0} boss", { 0: q.goal })}`,
    make: (S) => ({ goal: randInt(2, 3), reward: { gold: Math.round(goldScale(S) * 120), egg: rand() < 0.3, shards: S.prestige.count > 0 ? randInt(1, 3) : 0 } }),
  },
  gold: {
    text: (q) => `${tx("Ramasser {0} or", { 0: q.goalText })}`,
    make: (S) => ({ goal: Math.round(goldScale(S) * randInt(150, 300)), reward: { buff: pick(["elixir", "fortune", "wisdom", "haste", "luck", "iron"]), potions: 3 } }),
  },
  forge: {
    text: (q) => tx("Forger {0} fois", { 0: q.goal }),
    make: (S) => ({ goal: randInt(2, 4), reward: { gold: Math.round(goldScale(S) * 80), potions: 2 } }),
  },
  expedition: {
    text: (q) => (fr() ? tx("Ramener {0} {1} de familier", { 0: q.goal, 1: plural(q.goal, "expédition") }) : tx("Ramener {0} expéditions de familier", { 0: q.goal })),
    ok: (S) => Object.keys(S.pets.owned).length >= 2,
    make: (S) => ({ goal: randInt(1, 2), reward: { gold: Math.round(goldScale(S) * 100), egg: rand() < 0.5 } }),
  },
  transmute: {
    text: (q) => (fr() ? tx("Créer {0} {1} par transmutation", { 0: q.goal, 1: plural(q.goal, "objet") }) : tx("Créer {0} objets par transmutation", { 0: q.goal })),
    make: (S) => ({ goal: randInt(2, 4), reward: { chest: 2, potions: 2 } }),
  },
  zone: {
    text: (q) => `${tx("Atteindre la zone {0}", { 0: q.goal })}`,
    make: (S) => ({ goal: S.best + randInt(2, 3), reward: { chest: 3, egg: rand() < 0.4, shards: S.prestige.count > 0 ? 3 : 0 } }),
  },
};
const WEIGHTS = { kill: 3, hunt: 3, elite: 2, boss: 2, gold: 2, forge: 1, zone: 1, expedition: 1, transmute: 1 };

/**
 * Difficulté : 1 à 3 étoiles. Objectif et récompenses multipliés ; les quêtes
 * 3 étoiles ajoutent une récompense rare (vitesse permanente, coffre épique,
 * œuf ou éclats d'étoile). Chaque quête rapporte `stars` points de réputation.
 */
export const STARS = [null, { w: 60, goal: 1, reward: 1 }, { w: 30, goal: 1.8, reward: 2.4 }, { w: 10, goal: 3, reward: 4.5 }];
const SPECIALS = ["speed", "chest", "egg", "shards"];

export function makeQuest(S, uid, exclude = []) {
  const kinds = Object.keys(WEIGHTS).filter((k) => !exclude.includes(k) && (!QUEST_TEMPLATES[k].ok || QUEST_TEMPLATES[k].ok(S)));
  let total = kinds.reduce((a, k) => a + WEIGHTS[k], 0), x = rand() * total, kind = kinds[0];
  for (const k of kinds) { x -= WEIGHTS[k]; if (x <= 0) { kind = k; break; } }
  const q = Object.assign({ uid, kind, progress: kind === "zone" ? S.best : 0 }, QUEST_TEMPLATES[kind].make(S));
  // Étoiles
  let y = rand() * 100, stars = 1;
  for (let s = 3; s >= 1; s--) { if (y < STARS[s].w) { stars = s; break; } y -= STARS[s].w; }
  q.stars = stars;
  const st = STARS[stars];
  if (kind === "zone") q.goal += stars - 1;
  else q.goal = Math.max(1, Math.round(q.goal * st.goal));
  const rw = q.reward;
  if (rw.gold) rw.gold = Math.round(rw.gold * st.reward);
  if (rw.potions) rw.potions = Math.min(20, Math.round(rw.potions * st.reward));
  if (rw.chest && stars >= 2) rw.chest = Math.min(4, rw.chest + 1);
  if (stars === 3) {
    const sp = pick(SPECIALS.filter((s) => s !== "shards" || S.prestige.count > 0));
    if (sp === "speed") rw.speed = 1;
    else if (sp === "chest") rw.chest = Math.max(rw.chest || 0, 3);
    else if (sp === "egg") rw.egg = true;
    else rw.shards = (rw.shards || 0) + 3;
  }
  return q;
}

/**
 * Guilde des aventuriers : la réputation (étoiles des quêtes accomplies) fait
 * monter de rang. Chaque rang donne un bonus permanent (conservé à l'ascension)
 * et un coffre.
 */
export const GUILD_RANKS = [tx("Recrue"), tx("Apprenti"), tx("Aventurier"), tx("Vétéran"), tx("Expert"), tx("Champion"), tx("Héros"), tx("Légende"), tx("Mythe"), tx("Immortel")];
export const GUILD_BONUS = { gold: 3, xp: 3 }; // par rang
export const guildNeed = (rank) => Math.round(5 * Math.pow(rank + 1, 1.6)); // réputation pour passer au rang suivant
export function guildRank(rep) { let r = 0, need = 0; while (true) { need += guildNeed(r); if (rep < need) return { rank: r, into: rep - (need - guildNeed(r)), need: guildNeed(r) }; r++; } }
export const guildRankName = (r) => GUILD_RANKS[Math.min(r, GUILD_RANKS.length - 1)] + (r >= GUILD_RANKS.length ? " " + (r - GUILD_RANKS.length + 2) : "");
export function guildEffects(S) {
  const r = guildRank((S.guild && S.guild.rep) || 0).rank, out = {};
  if (r) for (const k in GUILD_BONUS) out[k] = GUILD_BONUS[k] * r;
  return out;
}

export const questText = (q, fmt) => QUEST_TEMPLATES[q.kind].text(Object.assign({ goalText: fmt ? fmt(q.goal) : q.goal }, q));
export const questDone = (q) => q.progress >= q.goal;
