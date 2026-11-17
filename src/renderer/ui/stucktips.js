// (it. 1464) Pistes pour débloquer le héros (game.stuckTips), partagées par la bulle d'alerte (app.js) et la carte de la
// zone dans l'Aventure (panel.js).
import { t as tx } from "../i18n/index.js";

const STUCK_TIPS = { equip: "équipe le meilleur ▲", talents: "dépense tes points de talent", forge: "forge ton équipement avec ton or", potions: "rachète des potions",
  ascend: "une ascension le rendra bien plus fort", farm: "laisse-le farmer un peu plus bas",
  // (it. 2062) devant un lieutenant ou le Briseur
  relics: "renforce tes reliques" }; // (bulle de chaque relique : « un niveau par course, en battant de nouveau son gardien »)

/** Les n premières pistes, traduites. */
export const stuckTipsText = (game, n = 2) => game.stuckTips().slice(0, n).map((k) => tx(STUCK_TIPS[k])).filter(Boolean);
