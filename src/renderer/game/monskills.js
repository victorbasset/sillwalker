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
