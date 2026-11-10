import { bossMechanics } from "../game/bosses.js";
// Conseils contextuels : chacun s'affiche une seule fois, au moment où il
// devient utile, dans la bulle de la bande. Un clic ouvre l'onglet concerné.
// Les conseils déjà vus sont retenus dans S.settings.hints.
import { t as tx } from "../i18n/index.js";
import { ASCEND_MIN_ZONE, shardsFor } from "../game/prestige.js";
import { skillPointsFree } from "../game/skilltree.js";
import { nextUnlock, hasUnlock, unlockAvailable } from "../game/unlocks.js";
import { fmt } from "../game/format.js";
import { tabOpen } from "../game/tabs.js";
import { CLASS_KEYS, CLASSES, canPartner, DUO_SYNERGIES } from "../game/classes.js";

/** Partenaire idéal (synergie) du héros, libre et pas encore choisi ; null sinon. */
const idealMate = (S) => {
  const d = DUO_SYNERGIES.find((x) => x.a === S.cls || x.b === S.cls), m = d && (d.a === S.cls ? d.b : d.a);
  return m && S.partner && S.partner !== m && S.nextPartner !== m && canPartner(S, S.cls, m) ? { mate: m, d } : null;
};

/** { id, text, tab, when(game) } — dans l'ordre de priorité. */
export const HINTS = [
  { id: "welcome", tab: "adventure", text: tx("Bienvenue dans Sillwalker ! Ton héros avance et se bat tout seul. Clique ici (ou sur ⌃ à droite) pour ouvrir le panneau."),
    when: (g) => g.S.stats.kills < 30 },
  { id: "death", tab: "adventure", text: tx("Ton héros est tombé ? Pas de panique : il recule un peu, puis repart tout seul. Un meilleur équipement (▲ dans le sac) l’aidera à passer. Clique ici."),
    when: (g) => g.S.stats.deaths > 0 && g.S.prestige.count === 0 && g.S.best <= 15 },
  { id: "upgrade", tab: "adventure", text: tx("Un objet plus puissant t’attend dans le sac (▲) : double-clique dessus pour l’équiper (ou clique ici pour ouvrir le sac)."),
    when: (g) => g.hasUpgradeCached() },
  { id: "talent", tab: "talents", text: tx("Niveau supérieur : tu as un point de talent à dépenser. Clique ici !"),
    when: (g) => g.talentPointsFree() > 0 },
  { id: "skills", tab: "skills", text: tx("L’arbre de compétences s’ouvre : 1 point tous les 2 niveaux. Clique ici pour le découvrir."),
    when: (g) => skillPointsFree(g.S) >= 2 },
  { id: "quest", tab: "quests", text: tx("Quête accomplie ! Clique ici pour réclamer ta récompense."),
    when: (g) => g.questsReady() > 0 },
  { id: "egg", tab: "pets", text: tx("Tu as trouvé un œuf ! Clique ici pour le faire éclore."),
    when: (g) => g.S.pets.eggs > 0 && hasUnlock(g.S, "menagerie") },
  { id: "shop", tab: "shop", text: tx("Ta bourse se remplit : la boutique vend potions, élixirs et coffres. Clique ici."),
    when: (g) => g.S.gold > 2000 && (g.S.stats.purchases || 0) === 0 },
  { id: "ascend", tab: "ascension", text: `${tx("Zone {0} atteinte : l’Ascension est disponible ! Clique ici pour en savoir plus.", { 0: ASCEND_MIN_ZONE })}`,
    when: (g) => g.canAscend() && g.S.prestige.count === 0 },
  { id: "expedition", tab: "pets", text: tx("Tu as plusieurs familiers : ceux qui ne t’accompagnent pas peuvent partir en expédition et rapporter or, œufs et objets. Clique ici."),
    when: (g) => hasUnlock(g.S, "expeditions") && Object.keys(g.S.pets.owned).length >= 2 && !Object.keys(g.S.pets.exp || {}).length && !(g.S.stats.expeditions > 0) },
  { id: "set", tab: "bestiary", text: tx("Une pièce de panoplie ! Porte 2 puis 4 pièces de la même panoplie pour des bonus ; chaque panoplie complétée une première fois rend aussi ton héros plus fort pour toujours. Toutes les panoplies sont dans le Bestiaire : clique ici."),
    when: (g) => [...g.S.bag, ...Object.values(g.S.equip)].some((it) => it && it.set) },
  { id: "codex", tab: "bestiary", text: tx("Chaque nouveau type d’objet rejoint ta collection et donne un bonus permanent. Clique ici pour la voir."),
    when: (g) => Object.keys(g.S.codex || {}).length >= 8 },
  { id: "classes", tab: "class", text: tx("D’autres héros sont retenus prisonniers par des boss de zone. Libère-les, puis change de héros en faisant une ascension."),
    when: (g) => g.S.best >= 2 && (g.S.classesUnlocked || []).length <= 1 },
  { id: "duo", tab: "class", text: tx("Un héros de l’autre portée est libre : forme un duo ! Il combattra aux côtés de ton héros. Clique ici."),
    when: (g) => !g.S.partner && CLASS_KEYS.some((c) => canPartner(g.S, g.S.cls, c)) },
  { id: "synergy", tab: "class", text: null, perRun: true,
    textFn: (g) => { const x = idealMate(g.S); return tx("Le duo idéal de ton héros est libre : {0} ({1}). Choisis-le comme compagnon pour la prochaine ascension. Clique ici.", { 0: CLASSES[x.mate].name, 1: tx(x.d.name) }); },
    when: (g) => !!idealMate(g.S) },
  // Le boss de la zone maudit et un Talisman de pureté attend dans le sac : le proposer (parade à la Malédiction).
  { id: "purity", tab: "adventure", text: null, perRun: true,
    textFn: () => tx("Le boss de cette zone maudit ton héros : le Talisman de pureté qui dort dans ton sac l’en protégerait. Clique ici."),
    when: (g) => bossMechanics(g.S.zone).includes("curse") && !Object.values(g.S.equip).some((it) => it && it.power === "p_pure") && g.S.bag.some((it) => it && it.power === "p_pure") },
  { id: "stuck", tab: "ascension", text: null, perRun: true,
    textFn: (g) => tx("Ton héros bloque près de son record. Une ascension rapporterait {0} éclats d’étoile et le rendrait bien plus fort. Clique ici.", { 0: shardsFor(g.S.best) }),
    when: (g) => g.canAscend() && g.S.prestige.count > 0 && (g.R.wallDeaths || []).filter((t) => g.R.time - t < 900).length >= 4 },
  { id: "unlock", tab: "shop", text: null, perUnlock: true,
    textFn: (g) => { const u = nextUnlock(g.S); return tx("Nouveau déblocage à ta portée : {0} ({1} or). Clique ici pour la boutique.", { 0: u.name, 1: fmt(u.price) }); },
    when: (g) => { const u = nextUnlock(g.S); return !!u && unlockAvailable(g.S, u) && g.S.gold >= u.price; } },
  { id: "astrolabe", tab: "ascension", text: tx("Astrolabe acquis ! Il est éteint au départ : coche-le dans l’onglet Ascension pour qu’il fasse l’ascension à ta place quand ton héros bloque. Clique ici."),
    when: (g) => hasUnlock(g.S, "astrolabe") && g.S.settings.autoAscend !== true },
  { id: "anvil", tab: "adventure", text: tx("Enclume stellaire acquise ! Clique un objet plus ancien que ton record : « Mettre au niveau » le remonte (très cher). Clique ici."),
    when: (g) => hasUnlock(g.S, "starAnvil") },
  { id: "tap", tab: null, text: tx("Astuce : clique sur le monstre que ton héros combat pour lui porter des coups bonus !"),
    when: (g) => g.S.stats.kills >= 40 && !(g.S.stats.taps > 0) },
  // Son (refonte it. 432-454) : les réglages fins existent, encore faut-il le savoir. Une fois, son allumé, après un peu de jeu.
  { id: "sound", tab: "settings", text: tx("Le son te plaît à moitié ? Réglages > Son : volumes séparés de la musique et de l’ambiance, « Écouter » pour essayer, touche C pour tout couper. Clique ici."),
    when: (g) => g.S.stats.kills >= 300 && g.S.settings.sound !== false && !g.S.settings.muted },
  { id: "speed", tab: "stats", text: tx("La vitesse est le bonus le plus précieux : guette les plumes du vent et clique sur les étoiles filantes !"),
    when: (g) => (g.S.speed || 0) > 0 },
];

/** Clé « déjà vu » : une fois pour toutes, ou une fois par course (perRun). */
const hintKey = (game, h) => (h.perRun ? h.id + ":" + game.S.prestige.count : h.perUnlock ? h.id + ":" + (nextUnlock(game.S) || {}).id : h.id);

/** Prochain conseil à montrer (ou null), sans le marquer comme vu. */
export function nextHint(game) {
  const seen = (game.S.settings.hints ||= {});
  const h = HINTS.find((x) => !seen[hintKey(game, x)] && (!x.tab || tabOpen(game.S, x.tab)) && x.when(game)); // onglet encore fermé : conseil plus tard
  return h ? { ...h, key: hintKey(game, h), text: h.textFn ? h.textFn(game) : h.text } : null;
}
export const markHint = (game, id) => { (game.S.settings.hints ||= {})[id] = true; };
