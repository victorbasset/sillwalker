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
  poison: "Toxique : ce coup empoisonne le héros 3 s.",
  shadow: "Ténébreux : ce coup maudit le héros 2 s.",
};

/** Compétence d'une sorte de monstre (ou null) : { id, name, desc, every, first, tell, mult, el }. */
export function monSkillOf(type) {
  const def = MONSTERS[type]; if (!def) return null;
  const sk = MON_SKILLS[def.art || type];
  return sk ? { ...sk, el: elementOf(type) } : null;
}
