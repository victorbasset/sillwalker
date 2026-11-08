// Succès. `id` doit correspondre exactement à l'« API Name » déclaré dans
// Steamworks (Stats & Achievements). Ajouter un succès = une ligne ici.
import { TREES } from "./talents.js";
import { PETS } from "./pets.js";
import { MONSTERS } from "./data.js";
import { CLASS_KEYS } from "./classes.js";
import { setCounts } from "./sets.js";
import { SKILL_TREE, activeSkillSet } from "./skilltree.js";

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
  { id: "TALENT_ULTIMATE", name: "Talent ultime",      test: (S) => Object.values(S.talents || {}).some((r) => Object.keys(r).some((id) => ULTIMATES.has(id) && r[id] > 0)) },
  { id: "ASCENSION",       name: "Première ascension", test: (S) => (S.prestige?.count || 0) >= 1 },
  { id: "ASCENSION_5",     name: "Cinq ascensions",    test: (S) => (S.prestige?.count || 0) >= 5 },
  { id: "PET_FIRST",       name: "Premier familier",   test: (S) => Object.keys(S.pets?.owned || {}).length >= 1 },
  { id: "PETS_ALL",        name: "Ménagerie complète", test: (S) => PETS.every((p) => S.pets?.owned?.[p.id]) },
  { id: "QUESTS_25",       name: "25 quêtes accomplies", test: (S) => (S.quests?.completed || 0) >= 25 },
  { id: "GOBLIN",          name: "Attrape-gobelin",    test: (S) => (S.stats.goblins || 0) >= 1 },
  { id: "BESTIARY_ALL",    name: "Bestiaire complet",  test: (S) => Object.keys(MONSTERS).every((k) => (S.bestiary?.[k] || 0) > 0) },
  { id: "SKILL_KEYSTONE",  name: "Clé de voûte",       test: (S) => [...activeSkillSet(S)].some((id) => SKILL_TREE.nodes[id].kind === "keystone") },
  { id: "SKILL_100",       name: "100 compétences",    test: (S) => activeSkillSet(S).size - 1 >= 100 },
  { id: "FEATHER",         name: "Plume du vent",      test: (S) => (S.stats.feathers || 0) >= 1 },
  { id: "SHOOTING_STAR",   name: "Vœu exaucé (étoile filante)", test: (S) => (S.stats.stars || 0) >= 1 },
  { id: "SPEED_25",        name: "Rapide comme le vent (+25 % de vitesse)", test: (S) => (S.speed || 0) >= 25 },
  { id: "FULL_SET",        name: "Panoplie complète (4 pièces)", test: (S) => Object.values(setCounts(S.equip || {})).some((n) => n >= 4) },
  { id: "MASTER_OF_ALL",   name: "Maître de toutes les classes", test: (S) => CLASS_KEYS.every((c) => (S.stats.classes || []).includes(c)) },
  { id: "ALL_CLASSES",     name: "Polyvalent : jouer les 3 classes", test: (S) => (S.stats.classes || []).length >= 3 },
  { id: "ZONE_50",         name: "Zone 50",            test: (S) => S.best >= 50 },
  { id: "LEVEL_100",       name: "Niveau 100",         test: (S) => S.lvl >= 100 },
  { id: "KILLS_1000",      name: "Mille victoires",    test: (S) => (S.stats.kills || 0) >= 1000 },
  { id: "KILLS_10000",     name: "Dix mille victoires", test: (S) => (S.stats.kills || 0) >= 10000 },
  { id: "BOSSES_100",      name: "Tueur de boss (100)", test: (S) => (S.stats.bosses || 0) >= 100 },
  { id: "GOLD_MILLION",    name: "Millionnaire (1 M d’or gagnés)", test: (S) => (S.stats.goldTotal || 0) >= 1e6 },
  { id: "BIG_HIT",         name: "Coup monstrueux (10 000 dégâts)", test: (S) => (S.stats.maxHit || 0) >= 10000 },
  { id: "PHOENIX",         name: "Renaissance (obtenir le phénix)", test: (S) => !!S.pets?.owned?.phoenix },
  { id: "DAILY_7",         name: "Fidèle : 7 jours d’affilée", test: (S) => (S.daily?.streak || 0) >= 7 },
  { id: "PLAY_10H",        name: "Compagnon de route (10 h de jeu)", test: (S) => (S.stats.playTime || 0) >= 36000 },
  { id: "REFORGE_10",      name: "Forgeron (10 reforges)", test: (S) => (S.stats.reforges || 0) >= 10 },
  { id: "EVENTS_10",       name: "Chanceux (10 événements rares)", test: (S) => (S.stats.events || 0) >= 10 },
  { id: "CHEST",           name: "Chasseur de trésors (un coffre)", test: (S) => (S.stats.chests || 0) >= 1 },
  { id: "POTIONS_50",      name: "Alchimiste (50 potions bues)", test: (S) => (S.stats.potionsUsed || 0) >= 50 },
];

/** Identifiants des succès dont la condition est remplie. */
export const reachedAchievements = (S) => ACHIEVEMENTS.filter((a) => a.test(S)).map((a) => a.id);
