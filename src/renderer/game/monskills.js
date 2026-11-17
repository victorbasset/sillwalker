// (it. 1853, journée des monstres, demande de Victor : « chaque monstre aurait des compétences visibles qui lui sont
// propres ; prends ton temps pour faire chaque compétence ») Compétences des monstres ordinaires, par famille (dessin de
// base : `def.art || type`). Chaque compétence se voit sur la bande (mouvement du monstre, mot, effet), s'entend
// (sound.js) et se lit au Bestiaire (infobulle de la carte). Les variantes recolorées d'une famille gardent sa compétence,
// teintée de leur élément (feu, givre, poison, ombre), qui y ajoute un effet.
//
// Les monstres des boss de zone n'en ont pas (ils ont leurs capacités, bosses.js) ; les élites gardent leurs affixes en plus.
// Puissance : chaque compétence doit se sentir sans renverser l'équilibre (balance.mjs, semaine simulate.js 168).
import { MONSTERS } from "./data.js";

/**
 * Familles → compétence. every / first : secondes entre deux usages / avant le premier ; tell : durée (s) de l'annonce
 * visible avant l'effet (le monstre se prépare). Les textes sont des clés de traduction (tx à l'affichage).
 */
export const MON_SKILLS = {
  // Gluants : se ramassent, puis bondissent sur le héros
  slime: { id: "leap", name: "Bond gluant", every: 6, first: 2.5, tell: 0.5, mult: 1.4,
    desc: "Toutes les 6 s, se ramasse puis bondit sur le héros : un coup à 140 % de son attaque." },
  // (it. 1854) Chauves-souris : prennent de la hauteur, puis piquent ; le vampire boit le sang qu'il fait couler
  bat: { id: "dive", name: "Piqué", every: 5, first: 2, tell: 0.6, mult: 1.3,
    desc: "Toutes les 5 s, prend de la hauteur puis pique sur le héros : un coup à 130 % de son attaque." },
  bat_vampire: { id: "dive", name: "Morsure du vampire", every: 5, first: 2, tell: 0.6, mult: 1.3, drain: 0.5,
    desc: "Toutes les 5 s, prend de la hauteur puis pique sur le héros : un coup à 130 % de son attaque, dont il boit la moitié pour se soigner." },
  // (it. 1854) Champignards : gonflent, puis lâchent un nuage de spores qui étourdit le héros
  mush: { id: "spores", name: "Nuage de spores", every: 7, first: 3, tell: 0.6, stun: 0.8,
    desc: "Toutes les 7 s, gonfle puis lâche un nuage de spores : le héros, étourdi, ne frappe plus pendant 0,8 s." },
  // (it. 1855) Squelettes : abattus une première fois, ils s'écroulent en tas d'os puis se remontent (pas de minuterie)
  skel: { id: "reassemble", name: "Os qui se reforment", every: 1e9, first: 1e9, tell: 0, back: 0.3, down: 0.8,
    desc: "La première fois qu’il tombe, s’écroule en tas d’os puis se reforme avec 30 % de ses PV." },
  // (it. 1855) Scorpions : lèvent la queue, puis piquent ; le dard empoisonne toujours
  scorp: { id: "sting", name: "Dard", every: 6, first: 3, tell: 0.7, mult: 1, venom: 1.5,
    desc: "Toutes les 6 s, lève la queue puis pique : un coup de plus, qui empoisonne le héros 1,5 s." },
  // (it. 1856) Loups : hurlent (la meute qui attend répond), puis attaquent plus vite
  wolf: { id: "howl", name: "Hurlement de meute", every: 8, first: 2, tell: 0.6, haste: { s: 3, k: 0.7 },
    desc: "Toutes les 8 s, hurle (la meute lui répond) puis attaque 30 % plus vite pendant 3 s." },
  // (it. 1856) Golems : arment lentement leur poing, puis l'abattent
  golem: { id: "slam", name: "Poing de pierre", every: 8, first: 4, tell: 0.9, mult: 2.2,
    desc: "Toutes les 8 s, arme lentement son poing puis l’abat : un coup à 220 % de son attaque, que le héros peut esquiver." },
  // (it. 1857) Plantes carnivores : lancent leurs racines, enlacent le héros et se nourrissent ; la mandragore hurle
  plant: { id: "roots", name: "Racines", every: 7, first: 3, tell: 0.6, stun: 1, regen: 0.03,
    desc: "Toutes les 7 s, lance ses racines : le héros, enlacé, ne frappe plus pendant 1 s, et la plante regagne 3 % de ses PV." },
  plant_mandra: { id: "scream", name: "Cri de la mandragore", every: 8, first: 3, tell: 0.5, stun: 0.5, silence: 2,
    desc: "Toutes les 8 s, pousse un cri perçant : le héros est étourdi 0,5 s et réduit au silence 2 s (plus aucun sort)." },
  // (it. 1857) Spectres : deviennent intangibles, les coups du héros les traversent
  ghost: { id: "phase", name: "Intangible", every: 7, first: 3, tell: 0.4, phase: 1.5,
    desc: "Toutes les 7 s, devient intangible pendant 1,5 s : les coups du héros le traversent." },
  // (it. 1858) Diablotins : font naître une flamme entre leurs mains, puis la lancent
  imp: { id: "fireball", name: "Boule de feu", every: 6, first: 2.5, tell: 0.6, mult: 1.2,
    desc: "Toutes les 6 s, fait naître une boule de feu puis la lance sur le héros : un coup à 120 % de son attaque." },
  // (it. 1858) Rats : couinent, puis se jettent sur le héros en trois morsures rapides
  rat: { id: "swarm", name: "Grouillement", every: 7, first: 3, tell: 0.4, mult: 1.2, bites: 3,
    desc: "Toutes les 7 s, couine puis se jette sur le héros : trois morsures rapides à 40 % de son attaque." },
  // (it. 1858) Araignées : tissent une toile qui englue le héros ; la veuve noire mord en plus
  spider: { id: "web", name: "Toile", every: 8, first: 3, tell: 0.6, slow: 2,
    desc: "Toutes les 8 s, tisse une toile : les attaques du héros ralentissent de 40 % pendant 2 s." },
  spider_widow: { id: "web", name: "Toile de la veuve", every: 8, first: 3, tell: 0.6, slow: 2, venom: 1.5,
    desc: "Toutes les 8 s, tisse une toile et mord : les attaques du héros ralentissent de 40 % pendant 2 s, et il est empoisonné 1,5 s." },
  // (it. 1859) Momies : lèvent les bras et maudissent le héros
  mummy: { id: "tombcurse", name: "Malédiction du tombeau", every: 9, first: 3, tell: 0.7, curse: 3,
    desc: "Toutes les 9 s, lève les bras et maudit le héros pendant 3 s : il subit 15 % de dégâts en plus et son vol de vie ne le soigne plus." },
  // (it. 1859) Yétis : se frappent la poitrine, puis jettent un bloc de glace
  yeti: { id: "boulder", name: "Bloc de glace", every: 9, first: 4, tell: 0.8, mult: 1.8, freeze: 1,
    desc: "Toutes les 9 s, se frappe la poitrine puis jette un bloc de glace : un coup à 180 % de son attaque, qui gèle le héros 1 s." },
  // (it. 1859) Harpies : battent des ailes et décochent une rafale de plumes
  harpy: { id: "feathers", name: "Rafale de plumes", every: 6, first: 2.5, tell: 0.5, mult: 1.2, bites: 4,
    desc: "Toutes les 6 s, bat des ailes et décoche quatre plumes : quatre coups à 30 % de son attaque, chacun esquivable." },
  // (it. 1860) Élémentaires de feu : grandissent dans un brasier, puis explosent sur le héros
  fireelem: { id: "flare", name: "Flambée", every: 7, first: 3, tell: 0.7, mult: 1.5,
    desc: "Toutes les 7 s, grandit dans un brasier puis explose sur le héros : un coup à 150 % de son attaque." },
  // (it. 1860) Crabes : se replient dans leur carapace
  crab: { id: "shell", name: "Carapace", every: 9, first: 4, tell: 0.4, guard: 2, cut: 0.7,
    desc: "Toutes les 9 s, se replie dans sa carapace pendant 2 s : il ne subit plus que 30 % des dégâts." },
  // (it. 1860) Chevaliers noirs : lèvent leur bouclier, puis ripostent
  darkknight: { id: "parry", name: "Parade et riposte", every: 8, first: 3, tell: 0.3, guard: 1.2, cut: 0.8, mult: 1.3,
    desc: "Toutes les 8 s, lève son bouclier pendant 1,2 s (80 % des dégâts bloqués), puis riposte : un coup à 130 % de son attaque." },
  // (it. 1860) Sylvains : plongent leurs racines dans le sol et s'en nourrissent ; le sylvain pourri empoisonne
  treant: { id: "rootdeep", name: "Enracinement", every: 10, first: 4, tell: 0.6, heal: 0.08,
    desc: "Toutes les 10 s, plonge ses racines dans le sol et regagne 8 % de ses PV." },
  treant_rot: { id: "rootdeep", name: "Racines pourries", every: 10, first: 4, tell: 0.6, heal: 0.08, venom: 1.5,
    desc: "Toutes les 10 s, plonge ses racines dans le sol : il regagne 8 % de ses PV, et la pourriture empoisonne le héros 1,5 s." },
  // (it. 1862) Wyvernes : se cabrent, puis crachent un souffle (trois coups rapides)
  drake: { id: "breath", name: "Souffle", every: 8, first: 3, tell: 0.7, mult: 1.5, bites: 3,
    desc: "Toutes les 8 s, se cabre puis crache son souffle : trois coups rapides à 50 % de son attaque." },
  // (it. 1862) Tyrannœils : s'écarquillent, le héros pétrifié ne frappe plus
  eye: { id: "gaze", name: "Regard pétrifiant", every: 9, first: 3, tell: 0.7, stun: 1.2,
    desc: "Toutes les 9 s, s’écarquille et fixe le héros : pétrifié, il ne frappe plus pendant 1,2 s." },
  // (it. 1862) Crapauds : coup de langue, de loin
  frog: { id: "tongue", name: "Coup de langue", every: 5, first: 2, tell: 0.4, mult: 1,
    desc: "Toutes les 5 s, gonfle la gorge puis fouette le héros de sa langue : un coup de plus." },
  // (it. 1862) Serpents : se lovent, puis frappent deux fois
  snake: { id: "strike", name: "Frappe éclair", every: 6, first: 2.5, tell: 0.5, mult: 1.2, bites: 2,
    desc: "Toutes les 6 s, se love puis frappe deux fois, très vite : deux coups à 60 % de son attaque." },
};

/** Élément d'une variante, lu dans sa clé (jamais dans le nom affiché, traduit) : il teinte la compétence de sa famille. */
export function elementOf(type) {
  if (/_(lava|fire)$/.test(type)) return "fire";
  if (/_(frost|polar)$/.test(type)) return "frost";
  if (/_(toxic|venom|poison|plague)$/.test(type)) return "poison";
  if (/_(void|abyss|shadow|obsid)$/.test(type)) return "shadow";
  return null;
}
/** Effet ajouté par l'élément (texte affiché après la description). */
export const ELEMENT_TEXT = {
  fire: "Brûlant : ce coup frappe 20 % plus fort.",
  frost: "Glacé : ce coup gèle le héros 1,5 s (attaques ralenties).",
  poison: "Toxique : ce coup empoisonne le héros 1,5 s.",
  shadow: "Ténébreux : ce coup maudit le héros 2 s.",
};

/** Compétence d'une sorte de monstre (ou null) : { id, name, desc, every, first, tell, mult, el }. */
export function monSkillOf(type) {
  const def = MONSTERS[type]; if (!def) return null;
  // une sorte peut avoir sa propre version (bat_vampire), sinon celle de sa famille (dessin de base)
  const sk = MON_SKILLS[type] || MON_SKILLS[def.art || type];
  return sk ? { ...sk, el: elementOf(type) } : null;
}
