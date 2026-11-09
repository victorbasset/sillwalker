// « À faire maintenant » : libellé de chaque action disponible (game.todoNow()), partagé par le résumé
// d'absence (panneau) et la bulle d'aide du mode mini.
import { t as tx, txn } from "../i18n/index.js";

const LABELS = {
  quests: (t) => txn(t.n, "{n} quête à réclamer|{n} quêtes à réclamer"),
  upgrade: () => tx("Un objet plus puissant t’attend dans le sac"),
  talents: (t) => txn(t.n, "{n} point de talent à dépenser →|{n} points de talent à dépenser →").replace(/ →$/, ""),
  skills: (t) => txn(t.n, "{n} point de compétence à dépenser|{n} points de compétence à dépenser"),
  unlock: (t) => tx("Déblocage abordable : {0}", { 0: t.name }),
  eggs: (t) => txn(t.n, "{n} œuf à faire éclore|{n} œufs à faire éclore"),
  expeditions: (t) => txn(t.n, "{n} expédition terminée|{n} expéditions terminées"),
  merchant: () => tx("Le marchand propose une amélioration"),
};

/** Libellé d'une action de todoNow(). */
export const todoLabel = (t) => (LABELS[t.id] ? LABELS[t.id](t) : t.id);
