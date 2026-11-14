// Succès. `id` doit correspondre exactement à l'« API Name » déclaré dans
// Steamworks (Stats & Achievements). Ajouter un succès = une ligne ici.
import { EVENTS } from "./events.js";
import { DAY_MOD_KEYS } from "./daymods.js";
import { TREES } from "./talents.js";
import { PETS } from "./pets.js";
import { MONSTERS, ZONES, ELITE_AFFIXES } from "./data.js";
import { UNLOCKS } from "./unlocks.js";
import { CLASS_KEYS, duoSynergy } from "./classes.js";
import { setCounts } from "./sets.js";
import { codexCounts } from "./codex.js";
import { POWERS } from "./powers.js";
import { SKILL_TREE, activeSkillSet } from "./skilltree.js";
import { activeGraphSet, GRAPH_MAX_TAKE } from "./skillgraph.js";
import { CHRONICLES } from "./story.js";
import { RELIC_IDS, RELIC_MAX_LV, hasRelic, relicLevel, ECHO_BOSSES } from "./relics.js";
import { classSpells, spellRank } from "./spells.js";

/** (it. 1232) Bénédictions du jour déjà vécues (succès « Toutes les bénédictions du jour »), parmi celles qui existent. */
const blessingsSeenCount = (S) => DAY_MOD_KEYS.filter((k) => ((S.daily && S.daily.seen) || {})[k]).length;
/** Le plus de sorts appris par un même héros (0 à 3). */
const spellsBest = (S) => Math.max(0, ...CLASS_KEYS.map((c) => classSpells(c).filter((x) => spellRank(S, x.id) > 0).length));
/** Événements rares déjà vus (succès « Chasseur d’événements »), parmi ceux qui existent encore. */
const eventsSeenCount = (S) => Object.keys((S.stats && S.stats.eventsSeen) || {}).filter((id) => EVENTS[id]).length;

/** (it. 943) Sortes d'élites vaincues (succès « Tueur d'élites »), parmi celles qui existent encore. */
const affixesSeenCount = (S) => Object.keys((S.stats && S.stats.affixesSeen) || {}).filter((id) => ELITE_AFFIXES[id]).length;

/** Chroniques lues (annoncées), sans « Le ciel rallumé » qui suit la victoire finale. */
const chronRead = (S) => CHRONICLES.filter((c) => c.id !== "dawn" && S.story && S.story.read && S.story.read[c.id]).length;

const ULTIMATES = new Set(Object.values(TREES).flatMap((tree) => tree.flatMap((b) => b.talents.filter((t) => t.tier === 3).map((t) => t.id))));

export const ACHIEVEMENTS = [
  { id: "FIRST_BOSS",      name: "Premier boss",       test: (S) => S.stats.bosses >= 1 },
  { id: "LEVEL_10",        name: "Niveau 10",          test: (S) => S.lvl >= 10 },
  { id: "FIRST_LEGENDARY", name: "Premier légendaire", test: (S) => S.stats.legendaries >= 1 },
  { id: "ZONE_10",         name: "Zone 10",            test: (S) => S.best >= 10 },
  { id: "ZONE_25",         name: "Zone 25",            test: (S) => S.best >= 25 },
  { id: "LEVEL_50",        name: "Niveau 50",          test: (S) => S.lvl >= 50 },
  { id: "ELITE_HUNTER",    name: "Chasseur d’élites (10)", test: (S) => (S.stats.elites || 0) >= 10 },
  { id: "FIRST_PURCHASE",  name: "Premier achat",      test: (S) => (S.stats.purchases || 0) >= 1 },
  { id: "TALENT_ULTIMATE", name: "Talent ultime",      test: (S) => Object.values(S.talents || {}).some((r) => Object.keys(r || {}).some((id) => ULTIMATES.has(id) && r[id] > 0)) },
  { id: "ASCENSION",       name: "Première ascension", test: (S) => (S.prestige?.count || 0) >= 1 },
  { id: "ASCENSION_5",     name: "Cinq ascensions",    test: (S) => (S.prestige?.count || 0) >= 5 },
  { id: "PET_FIRST",       name: "Premier familier",   test: (S) => Object.keys(S.pets?.owned || {}).length >= 1 },
  { id: "PETS_ALL",        name: "Ménagerie complète", test: (S) => PETS.every((p) => S.pets?.owned?.[p.id]) },
  { id: "QUESTS_25",       name: "25 quêtes accomplies", test: (S) => (S.quests?.completed || 0) >= 25 },
  { id: "GOBLIN",          name: "Attrape-gobelin",    test: (S) => (S.stats.goblins || 0) >= 1 },
  { id: "BESTIARY_ALL",    name: "Bestiaire complet",  test: (S) => Object.keys(MONSTERS).every((k) => (S.bestiary?.[k] || 0) > 0) },
  { id: "SKILL_KEYSTONE",  name: "Clé de voûte",       test: (S) => [...activeSkillSet(S)].some((id) => SKILL_TREE.nodes[id].kind === "keystone") },
  { id: "SKILL_100",       name: "100 compétences",    test: (S) => activeSkillSet(S).size - 1 >= 100 },
  // (it. 1136) grand graphe autour de la fleur : premier nœud, puis rempli (une voie par région, 258 nœuds)
  { id: "GRAPH_FIRST",     name: "Au-delà de la fleur", test: (S) => activeGraphSet(S).size > 0 },
  { id: "GRAPH_FULL",      name: "Le grand graphe accompli", test: (S) => activeGraphSet(S).size >= GRAPH_MAX_TAKE },
  { id: "FEATHER",         name: "Plume du vent",      test: (S) => (S.stats.feathers || 0) >= 1 },
  { id: "SHOOTING_STAR",   name: "Vœu exaucé (étoile filante)", test: (S) => (S.stats.stars || 0) >= 1 },
  { id: "SPEED_25",        name: "Rapide comme le vent (+25 % de vitesse)", test: (S) => (S.speed || 0) >= 25 },
  // (it. 1008) ou une panoplie déjà complétée : la tâche « … complètent la panoplie » remet aussitôt l'équipement d'avant
  // s'il était plus fort (it. 1007) ; les 4 pièces n'étaient alors jamais portées au moment du contrôle des succès
  { id: "FULL_SET",        name: "Panoplie complète (4 pièces)", test: (S) => Object.keys(S.setsDone || {}).length > 0 || Object.values(setCounts(S.equip || {})).some((n) => n >= 4) },
  { id: "MASTER_OF_ALL",   name: "Maître de tous les héros", test: (S) => CLASS_KEYS.every((c) => (S.stats.classes || []).includes(c)) },
  { id: "ALL_CLASSES",     name: "Polyvalent : jouer 3 héros", test: (S) => (S.stats.classes || []).length >= 3 },
  // Duo et héros (demande 17)
  { id: "DUO_FIRST",       name: "Premier duo",        test: (S) => !!S.partner },
  { id: "HEROES_10",       name: "Dix héros libérés",  test: (S) => (S.classesUnlocked || []).length >= 10 },
  { id: "EVENTS_ALL",      name: "Chasseur d’événements", test: (S) => eventsSeenCount(S) >= Object.keys(EVENTS).length },
  // (it. 1293) nom sans nombre : « Dix jours bénis » devenait faux à chaque nouvelle bénédiction (12 à l'it. 1292)
  { id: "BLESSINGS_ALL",   name: "Toutes les bénédictions du jour", test: (S) => blessingsSeenCount(S) >= DAY_MOD_KEYS.length }, // (it. 1232)
  { id: "ELITES_ALL",      name: "Tueur d’élites",     test: (S) => affixesSeenCount(S) >= Object.keys(ELITE_AFFIXES).length },
  { id: "PURE_HEART",      name: "Cœur pur",           test: (S) => (S.stats.pureBoss || 0) > 0 },
  { id: "DUO_SYNERGY",     name: "Duo parfait",        test: (S) => !!duoSynergy(S.cls, S.partner) },
  { id: "CHRONICLER",      name: "Chroniqueur",        test: (S) => chronRead(S) >= CHRONICLES.length - 1 },
  { id: "HEROES_ALL",      name: "Tous les héros libérés", test: (S) => CLASS_KEYS.every((c) => c === "warrior" || (S.classesUnlocked || []).includes(c)) },
  { id: "STARBREAKER",     name: "Le ciel rallumé",    test: (S) => !!(S.story && S.story.won) }, // Briseur d'Étoiles vaincu
  { id: "ZONE_50",         name: "Zone 50",            test: (S) => S.best >= 50 },
  { id: "LEVEL_100",       name: "Niveau 100",         test: (S) => S.lvl >= 100 },
  { id: "KILLS_1000",      name: "Mille victoires",    test: (S) => (S.stats.kills || 0) >= 1000 },
  { id: "KILLS_10000",     name: "Dix mille victoires", test: (S) => (S.stats.kills || 0) >= 10000 },
  { id: "BOSSES_100",      name: "Tueur de boss (100)", test: (S) => (S.stats.bosses || 0) >= 100 },
  { id: "GOLD_MILLION",    name: "Millionnaire (1 M d’or gagnés)", test: (S) => (S.stats.goldTotal || 0) >= 1e6 },
  { id: "SPELLS_1000",     name: "Mage de bataille (1 000 sorts lancés)", test: (S) => (+S.stats.spells || 0) >= 1000 },
  { id: "SPELLS_ALL3",     name: "Grimoire complet (les trois sorts d’un héros)", test: (S) => spellsBest(S) >= 3 },
  { id: "CRITS_10000",     name: "Lame affûtée (10 000 coups critiques)", test: (S) => (+S.stats.crits || 0) >= 10000 },
  { id: "BIG_HIT",         name: "Coup monstrueux (10 000 dégâts)", test: (S) => (S.stats.maxHit || 0) >= 10000 },
  { id: "PHOENIX",         name: "Renaissance (obtenir le phénix)", test: (S) => !!S.pets?.owned?.phoenix },
  { id: "DAILY_7",         name: "Fidèle : 7 jours d’affilée", test: (S) => (S.daily?.streak || 0) >= 7 },
  { id: "PLAY_10H",        name: "Compagnon de route (10 h de jeu)", test: (S) => (S.stats.playTime || 0) >= 36000 },
  { id: "REFORGE_10",      name: "Forgeron (10 reforges)", test: (S) => (S.stats.reforges || 0) >= 10 },
  { id: "EVENTS_10",       name: "Chanceux (10 événements rares)", test: (S) => (S.stats.events || 0) >= 10 },
  { id: "CHEST",           name: "Chasseur de trésors (un coffre)", test: (S) => (S.stats.chests || 0) >= 1 },
  { id: "CODEX_HALF",      name: "Collectionneur (la moitié des objets)", test: (S) => { const c = codexCounts(S); return c.found * 2 >= c.total; } },
  { id: "CODEX_ALL",       name: "Grand collectionneur (tous les objets)", test: (S) => { const c = codexCounts(S); return c.found >= c.total; } },
  { id: "EXPEDITIONS_10",  name: "Explorateurs (10 expéditions)", test: (S) => (S.stats.expeditions || 0) >= 10 },
  { id: "CHAMPION",        name: "Tueur de champion", test: (S) => (S.stats.champions || 0) >= 1 },
  // (it. 1266) un objectif lointain après le premier champion (≈ 5000 monstres ; la quête de champion y aide)
  { id: "CHAMPIONS_25",    name: "Fléau des champions (25 champions)", test: (S) => (S.stats.champions || 0) >= 25 },
  { id: "POWERS_ALL",      name: "Tous les pouvoirs légendaires", test: (S) => Object.keys(S.powersSeen || {}).length >= POWERS.length },
  { id: "POTIONS_50",      name: "Alchimiste (50 potions bues)", test: (S) => (S.stats.potionsUsed || 0) >= 50 },
  { id: "UNLOCK_FIRST",    name: "Premier déblocage", test: (S) => Object.keys(S.unlocks || {}).length >= 1 },
  { id: "UNLOCK_ALL",      name: "Tout débloqué", test: (S) => UNLOCKS.every((u) => S.unlocks && S.unlocks[u.id]) },
  { id: "TAPS_1000",       name: "Mille clics (coups bonus)", test: (S) => (S.stats.taps || 0) >= 1000 },
  { id: "WORLD_TOUR",      name: "Tour du monde (toutes les zones)", test: (S) => Math.max(S.best, (S.prestige && S.prestige.bestRun) || 0) >= ZONES.length },
  // Reliques des boss majeurs (demande S, it. 583)
  { id: "RELIC_FIRST",     name: "Première relique",   test: (S) => RELIC_IDS.some((id) => hasRelic(S, id)) },
  { id: "RELICS_ALL",      name: "Les quatre reliques", test: (S) => RELIC_IDS.every((id) => hasRelic(S, id)) },
  { id: "RELIC_MAX",       name: "Relique parfaite (niveau 5)", test: (S) => RELIC_IDS.some((id) => relicLevel(S, id) >= RELIC_MAX_LV) },
  // (it. 803) échos des lieutenants au-delà du Rebord (zones 250, 300, 350) : battu = record au-delà de sa zone
  { id: "ECHO_FIRST",      name: "Écho dissipé",       test: (S) => rec(S) > ECHO_BOSSES[0].zone },
  { id: "ECHOES_ALL",      name: "Les trois échos",    test: (S) => rec(S) > ECHO_BOSSES[ECHO_BOSSES.length - 1].zone },
];

/** Identifiants des succès dont la condition est remplie. */
export const reachedAchievements = (S) => ACHIEVEMENTS.filter((a) => a.test(S)).map((a) => a.id);
/** Succès obtenus : atteints maintenant ou déjà obtenus un jour (S.achievements) ; une nouveauté (un 10e événement,
 *  de nouveaux objets…) ne retire jamais une étoile. Les identifiants inconnus (autre version) sont ignorés. */
export function earnedAchievements(S) {
  const out = new Set(reachedAchievements(S)), known = new Set(ACHIEVEMENTS.map((a) => a.id));
  for (const id of Array.isArray(S.achievements) ? S.achievements : []) if (known.has(id)) out.add(id);
  return out;
}

/**
 * Progression des succès chiffrés : [actuel, objectif] (affichée dans l'onglet Statistiques tant qu'ils
 * ne sont pas obtenus). Les succès « oui / non » n'en ont pas.
 */
const rec = (S) => Math.max(S.best, (S.prestige && S.prestige.bestRun) || 0);
export const ACH_PROGRESS = {
  EVENTS_ALL: (S) => [eventsSeenCount(S), Object.keys(EVENTS).length],
  BLESSINGS_ALL: (S) => [blessingsSeenCount(S), DAY_MOD_KEYS.length],
  CHAMPIONS_25: (S) => [S.stats.champions || 0, 25],
  ELITES_ALL: (S) => [affixesSeenCount(S), Object.keys(ELITE_AFFIXES).length],
  HEROES_10: (S) => [(S.classesUnlocked || []).length, 10],
  CHRONICLER: (S) => [chronRead(S), CHRONICLES.length - 1],
  HEROES_ALL: (S) => [new Set(["warrior", ...(S.classesUnlocked || [])]).size, CLASS_KEYS.length],
  LEVEL_10: (S) => [S.lvl, 10], LEVEL_50: (S) => [S.lvl, 50], LEVEL_100: (S) => [S.lvl, 100],
  ZONE_10: (S) => [rec(S), 10], ZONE_25: (S) => [rec(S), 25], ZONE_50: (S) => [rec(S), 50], WORLD_TOUR: (S) => [rec(S), ZONES.length],
  ELITE_HUNTER: (S) => [S.stats.elites || 0, 10],
  ASCENSION_5: (S) => [(S.prestige && S.prestige.count) || 0, 5],
  PETS_ALL: (S) => [Object.keys((S.pets && S.pets.owned) || {}).length, PETS.length],
  QUESTS_25: (S) => [(S.quests && S.quests.completed) || 0, 25],
  BESTIARY_ALL: (S) => [Object.keys(MONSTERS).filter((k) => (S.bestiary && S.bestiary[k]) > 0).length, Object.keys(MONSTERS).length],
  SKILL_100: (S) => [Math.max(0, activeSkillSet(S).size - 1), 100],
  GRAPH_FULL: (S) => [activeGraphSet(S).size, GRAPH_MAX_TAKE],
  SPEED_25: (S) => [Math.floor(S.speed || 0), 25],
  MASTER_OF_ALL: (S) => [CLASS_KEYS.filter((c) => (S.stats.classes || []).includes(c)).length, CLASS_KEYS.length],
  ALL_CLASSES: (S) => [(S.stats.classes || []).length, 3],
  KILLS_1000: (S) => [S.stats.kills || 0, 1000], KILLS_10000: (S) => [S.stats.kills || 0, 10000],
  BOSSES_100: (S) => [S.stats.bosses || 0, 100],
  GOLD_MILLION: (S) => [Math.floor(S.stats.goldTotal || 0), 1e6],
  SPELLS_1000: (S) => [Math.floor(+S.stats.spells || 0), 1000],
  SPELLS_ALL3: (S) => [spellsBest(S), 3],
  CRITS_10000: (S) => [Math.floor(+S.stats.crits || 0), 10000],
  BIG_HIT: (S) => [Math.floor(S.stats.maxHit || 0), 10000],
  DAILY_7: (S) => [(S.daily && S.daily.streak) || 0, 7],
  PLAY_10H: (S) => [Math.floor((S.stats.playTime || 0) / 3600), 10],
  REFORGE_10: (S) => [S.stats.reforges || 0, 10],
  EVENTS_10: (S) => [S.stats.events || 0, 10],
  CODEX_HALF: (S) => { const c = codexCounts(S); return [c.found, Math.ceil(c.total / 2)]; },
  CODEX_ALL: (S) => { const c = codexCounts(S); return [c.found, c.total]; },
  EXPEDITIONS_10: (S) => [S.stats.expeditions || 0, 10],
  POWERS_ALL: (S) => [Object.keys(S.powersSeen || {}).length, POWERS.length],
  POTIONS_50: (S) => [S.stats.potionsUsed || 0, 50],
  UNLOCK_ALL: (S) => [UNLOCKS.filter((u) => S.unlocks && S.unlocks[u.id]).length, UNLOCKS.length],
  TAPS_1000: (S) => [S.stats.taps || 0, 1000],
  ECHOES_ALL: (S) => [ECHO_BOSSES.filter((b) => rec(S) > b.zone).length, ECHO_BOSSES.length],
};
