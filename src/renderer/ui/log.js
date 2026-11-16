// Journal (it. 1677, demande de Victor) : il quitte l'Aventure pour Statistiques > Journal ; liste partagée.
import { t as tx } from "../i18n/index.js";
import { esc } from "../game/format.js";

/** Couleur d'une ligne du journal selon ce qu'elle raconte. */
const LOG_COLORS = [
  [/légendaire|pouvoir légendaire/i, "lg-leg"],
  [/Champion|Coffre au trésor|Étoile filante|Plume|Plumes du vent|vitesse de déplacement, pour toujours/, "lg-rare"],
  [/épique/i, "lg-epic"],
  [/Quête accomplie|revient de|L’œuf éclot|Un œuf/, "lg-good"],
  [/K.O.|est tombé|Trop dur|Dernière potion/, "lg-bad"],
];
const logClass = (l) => { const m = LOG_COLORS.find(([re]) => re.test(l)); return m ? ` class="${m[1]}"` : ""; };

/** Lignes du journal (les plus récentes d'abord), colorées selon ce qu'elles racontent. */
export const logHTML = (L, n = 60) => (L && L.length ? L.slice(0, n).map((l) => `<li${logClass(l)}>${esc(l)}</li>`).join("") : tx("<li>Ton héros se met en route.</li>"));
