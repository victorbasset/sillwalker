// Capacités spéciales des boss. Chaque boss de zone en reçoit une (deux à
// partir de la 2e boucle des zones), choisie selon la zone : on sait donc à
// l'avance ce qui attend le héros (affiché dans le panneau Zone).
import { t as tx } from "../i18n/index.js";
import { ZONES } from "./data.js";

export const BOSS_MECHANICS = {
  enrage: { name: "Enragé", desc: "Sous 30 % de vie, frappe 40 % plus vite et 20 % plus fort." },
  smash:  { name: "Coup dévastateur", desc: "Toutes les 6 s, annonce puis assène un coup ×2,5 (esquivable)." },
  shell:  { name: "Carapace", desc: "À 50 % de vie, se couvre d’un bouclier de 25 % de ses PV max." },
  regen:  { name: "Régénération", desc: "Récupère 2 % de ses PV par seconde, sauf s’il brûle ou est empoisonné." },
  mirror: { name: "Miroir", desc: "Toutes les 8 s, s’entoure d’un miroir pendant 2 s : renvoie 40 % des dégâts reçus (sans pouvoir achever le héros)." },
  drain:  { name: "Vampirisme", desc: "Récupère 40 % des dégâts qu’il inflige." },
};
const ORDER = ["enrage", "smash", "shell", "regen", "mirror", "drain"];

/** Nom propre du boss de chaque zone (dans l'ordre de ZONES). */
export const BOSS_NAMES = [
  "Morille la Ronde", "Bave-Reine", "Os-le-Roi", "Gluant des tourbières", "Le Forgeron d’Os",
  "Dard-de-Sable", "Croc-Blanc l’Ancien", "Mâchoire Verte", "Gardien des Nuées", "Seigneur Cornu",
  "La Veuve des Égouts", "Pharaon Sans-Nom", "Grand Yéti", "Mère des Harpies", "Cœur-de-Lave",
  "Pince-Abysse", "Le Chevalier Noir", "Colosse de Cristal",
  "Vieux-Tronc le Pourri", "Aile-de-Tempête", "L’Œil qui ne dort pas", "Carapace-des-Abysses", "Ignivore, mère des wyvernes",
  "Chapeau-Pourpre", "Le Roi Sans-Chair", "Croc-de-Lune", "Serpent des Coraux", "Hurle-Givre",
];
/** Nom du boss de la zone z (titre « l'Éveillé » à partir de la 2e boucle). */
export function bossName(z) {
  const i = (z - 1) % ZONES.length, loop = Math.floor((z - 1) / ZONES.length);
  return (BOSS_NAMES[i] || "Boss") + (loop === 1 ? tx(" l’Éveillé") : loop >= 2 ? tx(" l’Ancestral") + " " + "+".repeat(loop - 1) : "");
}

/** Capacités du boss de la zone z. */
export function bossMechanics(z) {
  const i = (z - 1) % ORDER.length, list = [ORDER[i]];
  if (z > ZONES.length) list.push(ORDER[(i + 3) % ORDER.length]); // 2e boucle : deux capacités
  return list;
}
