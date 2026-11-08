// Conseils contextuels : chacun s'affiche une seule fois, au moment où il
// devient utile, dans la bulle de la bande. Un clic ouvre l'onglet concerné.
// Les conseils déjà vus sont retenus dans S.settings.hints.
import { ASCEND_MIN_ZONE } from "../game/prestige.js";
import { skillPointsFree } from "../game/skilltree.js";

/** { id, text, tab, when(game) } — dans l'ordre de priorité. */
export const HINTS = [
  { id: "welcome", tab: "adventure", text: "Bienvenue dans Sillwalker ! Ton héros avance et se bat tout seul. Clique ici (ou sur ⌃ à droite) pour ouvrir le panneau.",
    when: (g) => g.S.stats.kills < 30 },
  { id: "upgrade", tab: "adventure", text: "Un objet plus puissant t’attend dans le sac (▲). Clique ici pour l’équiper.",
    when: (g) => g.hasUpgradeCached() },
  { id: "talent", tab: "talents", text: "Niveau supérieur : tu as un point de talent à dépenser. Clique ici !",
    when: (g) => g.talentPointsFree() > 0 },
  { id: "skills", tab: "skills", text: "L’arbre de compétences s’ouvre : 1 point tous les 2 niveaux. Clique ici pour le découvrir.",
    when: (g) => skillPointsFree(g.S) >= 2 },
  { id: "quest", tab: "quests", text: "Quête accomplie ! Clique ici pour réclamer ta récompense.",
    when: (g) => g.questsReady() > 0 },
  { id: "egg", tab: "pets", text: "Tu as trouvé un œuf ! Clique ici pour le faire éclore.",
    when: (g) => g.S.pets.eggs > 0 },
  { id: "shop", tab: "shop", text: "Ta bourse se remplit : la boutique vend potions, élixirs et coffres. Clique ici.",
    when: (g) => g.S.gold > 2000 && (g.S.stats.purchases || 0) === 0 },
  { id: "ascend", tab: "ascension", text: `Zone ${ASCEND_MIN_ZONE} atteinte : l’Ascension est disponible ! Clique ici pour en savoir plus.`,
    when: (g) => g.canAscend() && g.S.prestige.count === 0 },
  { id: "expedition", tab: "pets", text: "Tu as plusieurs familiers : ceux qui ne t’accompagnent pas peuvent partir en expédition et rapporter or, œufs et objets. Clique ici.",
    when: (g) => Object.keys(g.S.pets.owned).length >= 2 && !Object.keys(g.S.pets.exp || {}).length && !(g.S.stats.expeditions > 0) },
  { id: "codex", tab: "bestiary", text: "Chaque nouveau type d’objet rejoint ta collection et donne un bonus permanent. Clique ici pour la voir.",
    when: (g) => Object.keys(g.S.codex || {}).length >= 8 },
  { id: "classes", tab: "class", text: "D’autres héros sont retenus prisonniers par des boss de zone. Libère-les, puis change de classe en faisant une ascension.",
    when: (g) => g.S.best >= 2 && (g.S.classesUnlocked || []).length <= 1 },
  { id: "speed", tab: "stats", text: "La vitesse est le bonus le plus précieux : guette les plumes du vent et clique sur les étoiles filantes !",
    when: (g) => (g.S.speed || 0) > 0 },
];

/** Prochain conseil à montrer (ou null), sans le marquer comme vu. */
export function nextHint(game) {
  const seen = (game.S.settings.hints ||= {});
  return HINTS.find((h) => !seen[h.id] && h.when(game)) || null;
}
export const markHint = (game, id) => { (game.S.settings.hints ||= {})[id] = true; };
