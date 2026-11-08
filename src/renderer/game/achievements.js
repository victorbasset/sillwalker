// Succès. `id` doit correspondre exactement à l'« API Name » déclaré dans
// Steamworks (Stats & Achievements). Ajouter un succès = une ligne ici.
import { TREES } from "./talents.js";
import { PETS } from "./pets.js";
import { MONSTERS } from "./data.js";
import { CLASS_KEYS } from "./classes.js";
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
  { id: "MASTER_OF_ALL",   name: "Maître de toutes les classes", test: (S) => CLASS_KEYS.every((c) => (S.stats.classes || []).includes(c)) },
  { id: "ALL_CLASSES",     name: "Polyvalent : jouer les 3 classes", test: (S) => (S.stats.classes || []).length >= 3 },
];

/** Identifiants des succès dont la condition est remplie. */
export const reachedAchievements = (S) => ACHIEVEMENTS.filter((a) => a.test(S)).map((a) => a.id);
