// Capacités spéciales des boss. Chaque boss de zone en reçoit une (deux à
// partir de la 2e boucle des zones), choisie selon la zone : on sait donc à
// l'avance ce qui attend le héros (affiché dans le panneau Zone).
import { t as tx } from "../i18n/index.js";
import { ZONES } from "./data.js";
import { loopMark } from "./rules.js";
import { FINAL_BOSS, isFinalZone } from "./story.js";
import { majorBoss, majorName } from "./relics.js";

export const BOSS_MECHANICS = {
  enrage: { name: "Enragé", desc: "Sous 30 % de vie, frappe 40 % plus vite et 20 % plus fort." },
  smash:  { name: "Coup dévastateur", desc: "Toutes les 6 s, annonce puis assène un coup ×2,5 (esquivable)." },
  shell:  { name: "Carapace", desc: "À 50 % de vie, se couvre d’un bouclier de 25 % de ses PV max." },
  regen:  { name: "Régénération", desc: "Récupère 2 % de ses PV par seconde, sauf s’il brûle ou est empoisonné." },
  mirror: { name: "Miroir", desc: "Toutes les 8 s, s’entoure d’un miroir pendant 2 s : renvoie 40 % des dégâts reçus (sans pouvoir achever le héros)." },
  drain:  { name: "Vampirisme", desc: "Récupère 40 % des dégâts qu’il inflige." },
  frost:  { name: "Souffle glacé", desc: "Toutes les 7 s, gèle le héros : ses attaques ralentissent de 40 % pendant 3 s." },
  evasive: { name: "Insaisissable", desc: "Esquive 20 % des coups du héros (les coups au clic touchent toujours)." },
  fury:   { name: "Fureur croissante", desc: "Toutes les 5 s, frappe 10 % plus vite (jusqu’à 6 fois) : il faut l’abattre vite." },
  // Étude des concurrents (variété) : une 10e capacité.
  // Variété : contre les héros qui se soignent en continu (régénération, vol de vie).
  curse: { name: "Malédiction", desc: "Toutes les 9 s, maudit le héros pendant 3 s : il subit 15 % de dégâts en plus et son vol de vie ne le soigne plus." },
  // Variété : contre les héros qui comptent sur un dernier coup ; une seconde charge à prévoir.
  tenacious: { name: "Tenace", desc: "Une fois par combat, se relève avec 25 % de ses PV quand il devrait tomber." },
  bulwark: { name: "Peau de pierre", desc: "Subit 30 % de dégâts en moins tant qu’il lui reste plus de 70 % de ses PV : la première charge est la plus dure." },
};
/** Cuirasse : réduction des dégâts au-dessus du seuil de PV. */
export const BULWARK = { above: 0.7, cut: 0.3 };
export const FURY = { every: 5, speed: 0.9, max: 6 };
const ORDER = ["enrage", "smash", "shell", "regen", "mirror", "drain", "frost", "evasive", "fury", "bulwark", "curse", "tenacious"];
export const TENACIOUS = { back: 0.25 };
export const CURSE = { every: 9, first: 6, s: 3, hurt: 0.15 };

/** Nom propre du boss de chaque zone (dans l'ordre de ZONES). */
export const BOSS_NAMES = [
  "Morille la Ronde", "Bave-Reine", "Os-le-Roi", "Gluant des tourbières", "Le Forgeron d’Os",
  "Dard-de-Sable", "Croc-Blanc l’Ancien", "Mâchoire Verte", "Gardien des Nuées", "Seigneur Cornu",
  "La Veuve des Égouts", "Pharaon Sans-Nom", "Grand Yéti", "Mère des Harpies", "Cœur-de-Lave",
  "Pince-Abysse", "Le Chevalier Noir", "Colosse de Cristal",
  "Vieux-Tronc le Pourri", "Aile-de-Tempête", "L’Œil qui ne dort pas", "Carapace-des-Abysses", "Ignivore, mère des wyvernes",
  "Chapeau-Pourpre", "Le Roi Sans-Chair", "Croc-de-Lune", "Serpent des Coraux", "Hurle-Givre",
  "L’Œil des Profondeurs", "Roc-Barbu", "Grand-Père Saule", "Reine de Verre", "Le Seigneur des Orages",
];
/** Nom du boss de la zone z (titre « l'Éveillé » à partir de la 2e boucle). */
export function bossName(z) {
  if (isFinalZone(z)) return tx(FINAL_BOSS.name); // le Briseur d'Étoiles (story.js)
  const mb = majorBoss(z); if (mb) return majorName(mb); // boss majeur (ou écho), gardien d'une relique (relics.js)
  const i = (z - 1) % ZONES.length, loop = Math.floor((z - 1) / ZONES.length);
  return (BOSS_NAMES[i] || "Boss") + (loop === 1 ? tx(" l’Éveillé") : loop >= 2 ? tx(" l’Ancestral") + " " + loopMark(loop - 1) : "");
}

/**
 * Usure des boss (anti-mur) : chaque défaite du héros contre le boss d'une zone lui retire 5 % de ses PV
 * (30 % au plus), même d'une course à l'autre ; dès qu'il est vaincu, il retrouve toute sa force.
 * Le premier essai garde tout son défi ; un héros bloqué finit par passer.
 */
export const BOSS_WEAR = { per: 0.05, max: 0.3 };
export const bossWear = (S, z) => Math.min(BOSS_WEAR.max, BOSS_WEAR.per * ((S.bossDefeats && S.bossDefeats[z]) || 0));

/** Capacités du boss de la zone z. */
export function bossMechanics(z) {
  if (isFinalZone(z)) return FINAL_BOSS.mech.slice();
  const mb = majorBoss(z); if (mb) return mb.mech.slice();
  const i = (z - 1) % ORDER.length, list = [ORDER[i]];
  if (z > ZONES.length) list.push(ORDER[(i + 3) % ORDER.length]); // 2e boucle : deux capacités
  return list;
}
