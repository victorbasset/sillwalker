// Quêtes (contrats) : QUEST_SLOTS quêtes actives en même temps. Une quête
// terminée attend que le joueur réclame sa récompense ; une nouvelle prend
// alors sa place. Les objectifs et récompenses suivent la progression.
import { t as tx, txn, getLang } from "../i18n/index.js";
import { MONSTERS, ELITE, ELITE_AFFIXES, CHAMPION, GOBLIN } from "./data.js";
import { zoneDef, heroStats, heroDps, xpNeed, monsterBase, earlyPace } from "./rules.js";
import { rand, pick } from "./util.js";
import { eggsAllowed, fixQuestEgg } from "./tabs.js";
import { classSpells, spellRank } from "./spells.js";
import { PET_MAX_LVL } from "./pets.js";

export const QUEST_SLOTS = 3;
export const goldScale = (S) => 3 * Math.pow(1.25, Math.max(1, S.best) - 1); // or d'un monstre normal
export const questRerollPrice = (S) => Math.round(goldScale(S) * 25);

const randInt = (a, b) => a + Math.floor(rand() * (b - a + 1));
/** (it. 989) Pluriel français d'un nom de monstre : le nom et ses adjectifs (« rats géants », « crabes abyssaux »), rien
 *  après « de / des / du / d’ » (« loups des neiges ») ; avant : un « s » collé à la fin (« cultiste du néants »). */
const FR_PLURAL_SPECIAL = { "œil des profondeurs": "yeux des profondeurs", "chauve-souris": "chauves-souris", "feu follet": "feux follets", "chef de guerre orc": "chefs de guerre orcs" };
export function frPlural(name) {
  const low = name.toLowerCase();
  if (FR_PLURAL_SPECIAL[low]) return FR_PLURAL_SPECIAL[low];
  const words = low.split(" "), out = [];
  let stop = false;
  for (const w of words) {
    if (stop || /^(de|des|du|d’|d')/.test(w)) { stop = true; out.push(w); continue; }
    out.push(/[sxz]$/.test(w) ? w : /al$/.test(w) ? w.slice(0, -2) + "aux" : /(eu|au)$/.test(w) ? w + "x" : w + "s");
  }
  return out.join(" ");
}
const fr = () => getLang() === "fr";

/**
 * Modèles. make(S) -> { goal, type?, reward }. Les récompenses possibles :
 * gold, chest (rareté minimale), buff (id d'élixir), potions, egg, shards.
 */
/** (it. 1456) Le héros abat-il un gobelin doré (MONSTERS.goblin.hp × PV d'un monstre de sa zone) avant sa fuite ? (estimation
 *  sans élixirs ni sorts : prudente) */
export function goblinCatchable(S) {
  const dps = heroDps(heroStats(S, S.equip));
  return dps > 0 && monsterBase(S.zone, false).hp * MONSTERS.goblin.hp / dps < GOBLIN.flee;
}

export const QUEST_TEMPLATES = {
  kill: {
    // (it. 1356) accordé dans toutes les langues (« Победить 22 монстров » : forme fausse selon le nombre)
    text: (q) => txn(q.goal, "Vaincre {n} monstre|Vaincre {n} monstres"),
    make: (S) => { const goal = randInt(4, 8) * 10; return { goal, reward: { gold: Math.round(goal * goldScale(S) * 2.5) } }; },
  },
  hunt: {
    // (it. 2873) un monstre ne vit en général que dans une zone et le début de partie en change toutes les une à deux minutes : avant la
    // Carte du voyageur (zone 22, un clic pour y retourner), 4 chasses sur 12 aboutissaient en 2 h (quest-pace, 6 graines), un tiers
    // des quêtes immobilisé ; elles n'arrivent qu'avec la Carte
    ok: (S) => !!(S.unlocks && S.unlocks.travelMap),
    text: (q) => (fr() ? tx("Chasser {0} {1}{2}", { 0: q.goal, 1: q.goal > 1 ? frPlural(MONSTERS[q.type].name) : MONSTERS[q.type].name.toLowerCase(), 2: "" })
      : tx("Chasser : {1} ×{0}", { 0: q.goal, 1: MONSTERS[q.type].name })),
    make: (S) => {
      const type = pick(zoneDef(S.zone).monsters), goal = randInt(3, 6) * 5;
      return { goal, type, reward: { gold: Math.round(goal * goldScale(S) * 4), egg: rand() < 0.15 } };
    },
  },
  elite: {
    ok: (S) => S.zone >= ELITE.minZone || (S.prestige.count || 0) > 0, // pas d'élite avant la zone 3 en première course
    text: (q) => txn(q.goal, "Vaincre {n} élite|Vaincre {n} élites"),
    make: (S) => ({ goal: randInt(2, 4), reward: { chest: 2, gold: Math.round(goldScale(S) * 60) } }),
  },
  // (it. 946) proie : une sorte d'élite précise (son nom entre guillemets : pas d'accord à faire dans les langues à genres)
  prey: {
    ok: (S) => S.zone >= ELITE.minZone || (S.prestige.count || 0) > 0,
    text: (q) => txn(q.goal, "Vaincre {n} élite « {0} »|Vaincre {n} élites « {0} »", { 0: (ELITE_AFFIXES[q.type] || {}).name || "?" }),
    make: (S) => ({ goal: randInt(1, 2), type: pick(Object.keys(ELITE_AFFIXES)), reward: { chest: 2, gold: Math.round(goldScale(S) * 90) } }),
  },
  // (it. 1260) 17e sorte : les champions (élites dorées, environ un monstre sur 200 dès la zone 5) : un objectif de patience
  // (it. 1452) gobelins dorés attrapés (avant qu'ils ne s'enfuient) ; aussi pendant l'absence ; (it. 1456) jamais proposée
  // à un héros trop lent pour en abattre un avant sa fuite
  goblin: {
    ok: (S) => goblinCatchable(S),
    text: (q) => txn(q.goal, "Attraper {n} gobelin doré|Attraper {n} gobelins dorés"),
    make: (S) => ({ goal: randInt(1, 2), reward: { gold: Math.round(goldScale(S) * 110), potions: 2, egg: rand() < 0.2 } }),
  },
  champion: {
    ok: (S) => S.zone >= CHAMPION.minZone || (S.prestige.count || 0) > 0,
    text: (q) => txn(q.goal, "Vaincre {n} champion|Vaincre {n} champions"),
    make: (S) => ({ goal: 1, reward: { chest: 3, gold: Math.round(goldScale(S) * 120), egg: rand() < 0.3 } }),
  },
  boss: {
    text: (q) => txn(q.goal, "Vaincre {n} boss|Vaincre {n} boss"),
    make: (S) => ({ goal: randInt(2, 3), reward: { gold: Math.round(goldScale(S) * 120), egg: rand() < 0.3, shards: S.prestige.count > 0 ? randInt(1, 3) : 0 } }),
  },
  gold: {
    text: (q) => `${tx("Ramasser {0} or", { 0: q.goalText })}`,
    make: (S) => ({ goal: Math.round(goldScale(S) * randInt(150, 300)), reward: { buff: pick(["elixir", "fortune", "wisdom", "haste", "luck", "iron"]), potions: 3 } }),
  },
  forge: {
    ok: (S) => !!(S.unlocks && S.unlocks.forge), // pas de quête impossible avant l'Enclume
    text: (q) => txn(q.goal, "Forger {n} fois|Forger {n} fois"),
    make: (S) => ({ goal: randInt(2, 4), reward: { gold: Math.round(goldScale(S) * 80), potions: 2 } }),
  },
  expedition: {
    text: (q) => txn(q.goal, "Ramener {n} expédition de familier|Ramener {n} expéditions de familier"),
    // (it. 2243) aussi le Chenil des explorateurs (zone 50) : avant, dès deux familiers (Ménagerie, zone 25) la quête pouvait tomber, impossible
    ok: (S) => !!(S.unlocks && S.unlocks.expeditions) && Object.keys(S.pets.owned).length >= 2,
    make: (S) => ({ goal: randInt(1, 2), reward: { gold: Math.round(goldScale(S) * 100), egg: rand() < 0.5 } }),
  },
  transmute: {
    ok: (S) => !!(S.unlocks && S.unlocks.transmute), // pas avant le déblocage de la transmutation
    text: (q) => txn(q.goal, "Créer {n} objet par transmutation|Créer {n} objets par transmutation"),
    make: (S) => ({ goal: randInt(2, 4), reward: { chest: 2, potions: 2 } }),
  },
  loot: { // butin trouvé sur les monstres (rare ou mieux)
    text: (q) => txn(q.goal, "Trouver {n} objet rare ou mieux|Trouver {n} objets rares ou mieux"),
    make: (S) => ({ goal: randInt(3, 6), reward: { gold: Math.round(goldScale(S) * 90), potions: 2, egg: rand() < 0.2 } }),
  },
  event: { // événements rares (rafale, pluie d'or, frénésie…) : un objectif de patience
    text: (q) => txn(q.goal, "Vivre {n} événement rare|Vivre {n} événements rares"),
    make: (S) => ({ goal: randInt(1, 2), reward: { chest: 2, gold: Math.round(goldScale(S) * 100) } }),
  },
  chest: { // (it. 887-889) coffres au trésor trouvés sur le chemin (×3 le Jour des trésors) : un objectif de patience
    text: (q) => txn(q.goal, "Trouver {n} coffre au trésor|Trouver {n} coffres au trésor"),
    make: (S) => ({ goal: 1, reward: { gold: Math.round(goldScale(S) * 100), potions: 2, egg: rand() < 0.2 } }),
  },
  // (it. 3223) étoiles filantes attrapées (une toutes les 40 à 90 min, au clic ou par le Filet à étoiles) : seulement pour qui en a
  // déjà attrapé une ; objectif court, la patience est dans l'attente
  star: {
    ok: (S) => (S.stats.stars || 0) > 0,
    text: (q) => txn(q.goal, "Attraper {n} étoile filante|Attraper {n} étoiles filantes"),
    make: (S) => ({ goal: 1, reward: { gold: Math.round(goldScale(S) * 120), potions: 2 } }),
  },
  tap: { // jeu actif : coups au clic sur le monstre combattu (jamais obligatoire, rare)
    ok: (S) => (S.stats.taps || 0) > 0, // seulement pour qui a déjà frappé au clic (sinon elle traînerait)
    text: (q) => txn(q.goal, "Frapper {n} fois au clic|Frapper {n} fois au clic"),
    make: (S) => ({ goal: randInt(4, 8) * 5, reward: { gold: Math.round(goldScale(S) * 70), potions: 2 } }),
  },
  crit: { // coups critiques : pour les héros qui en portent assez (sinon elle traînerait)
    ok: (S) => heroStats(S, S.equip, { buffs: false }).crit >= 8,
    text: (q) => txn(q.goal, "Porter {n} coup critique|Porter {n} coups critiques"),
    make: (S) => ({ goal: randInt(4, 8) * 10, reward: { gold: Math.round(goldScale(S) * 80), potions: 1, egg: rand() < 0.15 } }),
  },
  spell: { // sorts lancés (it. 515) : seulement si le héros en a appris un (sinon elle traînerait)
    ok: (S) => classSpells(S.cls).some((x) => spellRank(S, x.id) > 0),
    text: (q) => txn(q.goal, "Lancer {n} sort|Lancer {n} sorts"),
    make: (S) => ({ goal: randInt(3, 6) * 5, reward: { gold: Math.round(goldScale(S) * 80), potions: 1, egg: rand() < 0.15 } }),
  },
  // (it. 1406) 18e sorte : des niveaux à gagner (avance seule, même pendant l'absence : un objectif de patience)
  // (it. 3333) expérience gagnée par le familier qui accompagne le héros (1 par victoire, 5 par élite, 10 par boss ; ×10 pendant la
  // Fête des familiers) : seulement avec un familier qui peut encore monter ; un œuf une fois sur quatre (thème)
  petxp: {
    ok: (S) => { const a = S.pets && S.pets.active, o = a && S.pets.owned && S.pets.owned[a]; return !!(o && o.lvl < PET_MAX_LVL); },
    text: (q) => txn(q.goal, "Faire gagner {n} point d’expérience à ton familier|Faire gagner {n} points d’expérience à ton familier"),
    make: (S) => { const goal = randInt(6, 12) * 10; return { goal, reward: { gold: Math.round(goal * goldScale(S) * 2.5), egg: rand() < 0.25 } }; },
  },
  level: {
    // (it. 1407) seulement si un niveau coûte au plus ≈ 500 victoires de la zone (bonus d'expérience non comptés) : un
    // héros très au-dessus de sa zone (niveau 1313 de dev-data : 0 niveau en 30 min) ne la finirait jamais
    ok: (S) => xpNeed(S.lvl) <= monsterBase(S.zone, false).xp * earlyPace(S) * 500,
    text: (q) => txn(q.goal, "Gagner {n} niveau|Gagner {n} niveaux"),
    make: (S) => ({ goal: randInt(2, 4), reward: { gold: Math.round(goldScale(S) * 90), potions: 2, egg: rand() < 0.15 } }),
  },
  zone: {
    text: (q) => `${tx("Atteindre la zone {0}", { 0: q.goal })}`,
    make: (S) => ({ goal: S.best + randInt(2, 3), reward: { chest: 3, egg: rand() < 0.4, shards: S.prestige.count > 0 ? 3 : 0 } }),
  },
};
const WEIGHTS = { kill: 3, hunt: 3, elite: 2, boss: 2, gold: 2, forge: 1, zone: 1, expedition: 1, transmute: 1, loot: 2, event: 1, tap: 1, crit: 1, spell: 1, chest: 1, prey: 1, champion: 1, level: 1, goblin: 1, star: 1, petxp: 1 };

/**
 * Difficulté : 1 à 3 étoiles. Objectif et récompenses multipliés ; les quêtes
 * 3 étoiles ajoutent une récompense rare (vitesse permanente, coffre épique,
 * œuf ou éclats d'étoile). Chaque quête rapporte `stars` points de réputation.
 */
export const STARS = [null, { w: 60, goal: 1, reward: 1 }, { w: 30, goal: 1.8, reward: 2.4 }, { w: 10, goal: 3, reward: 4.5 }];
const SPECIALS = ["speed", "chest", "egg", "shards"];

/** (it. 990) Or d'une récompense de quête au moment de la réclamer : remonté en proportion si le record a progressé
 *  depuis le tirage (une quête tirée en début de course rapportait 31 k d'or en zone 136, à côté de 102 T). */
export function questGold(S, q) {
  const g = (q && q.reward && +q.reward.gold) || 0;
  if (!g || !(q.gs > 0)) return g;
  const v = Math.round(g * Math.max(1, goldScale(S) / q.gs));
  return Number.isFinite(v) ? v : g; // sauvegarde abîmée (gs minuscule) : l'or d'origine
}

export function makeQuest(S, uid, exclude = []) {
  const kinds = Object.keys(WEIGHTS).filter((k) => !exclude.includes(k) && (!QUEST_TEMPLATES[k].ok || QUEST_TEMPLATES[k].ok(S)));
  let total = kinds.reduce((a, k) => a + WEIGHTS[k], 0), x = rand() * total, kind = kinds[0];
  for (const k of kinds) { x -= WEIGHTS[k]; if (x <= 0) { kind = k; break; } }
  const q = Object.assign({ uid, kind, progress: kind === "zone" ? S.best : 0 }, QUEST_TEMPLATES[kind].make(S));
  // Étoiles
  let y = rand() * 100, stars = 1;
  for (let s = 3; s >= 1; s--) { if (y < STARS[s].w) { stars = s; break; } y -= STARS[s].w; }
  q.stars = stars;
  q.gs = goldScale(S); // (it. 990) échelle de l'or au tirage : la récompense suit la progression (questGold)
  const st = STARS[stars];
  if (kind === "zone") q.goal += stars - 1;
  else q.goal = Math.max(1, Math.round(q.goal * st.goal));
  const rw = q.reward;
  if (rw.gold) rw.gold = Math.round(rw.gold * st.reward);
  if (rw.potions) rw.potions = Math.min(20, Math.round(rw.potions * st.reward));
  if (rw.chest && stars >= 2) rw.chest = Math.min(4, rw.chest + 1);
  if (stars === 3) {
    const sp = pick(SPECIALS.filter((s) => (s !== "shards" || S.prestige.count > 0) && (s !== "egg" || eggsAllowed(S))));
    if (sp === "speed") rw.speed = 1;
    else if (sp === "chest") rw.chest = Math.max(rw.chest || 0, 3);
    else if (sp === "egg") rw.egg = true;
    else rw.shards = (rw.shards || 0) + 3;
  }
  fixQuestEgg(S, rw); // pas d'œuf avant l'onglet Familiers
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
// (it. 905) réputation illisible (texte, NaN, infini) : 0 ; rang plafonné (avant, « 103x » bouclait sans fin)
export function guildRank(rep) {
  rep = Number.isFinite(rep) ? Math.max(0, rep) : 0;
  let r = 0, need = 0;
  while (r < 1e5) { need += guildNeed(r); if (rep < need) return { rank: r, into: rep - (need - guildNeed(r)), need: guildNeed(r) }; r++; }
  return { rank: r, into: 0, need: guildNeed(r) };
}
export const guildRankName = (r) => GUILD_RANKS[Math.min(r, GUILD_RANKS.length - 1)] + (r >= GUILD_RANKS.length ? " " + (r - GUILD_RANKS.length + 2) : "");
export function guildEffects(S) {
  const r = guildRank((S.guild && S.guild.rep) || 0).rank, out = {};
  if (r) for (const k in GUILD_BONUS) out[k] = GUILD_BONUS[k] * r;
  return out;
}

export const questText = (q, fmt) => QUEST_TEMPLATES[q.kind].text(Object.assign({ goalText: fmt ? fmt(q.goal) : q.goal }, q));
export const questDone = (q) => q.progress >= q.goal;
