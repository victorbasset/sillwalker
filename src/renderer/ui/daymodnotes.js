// (it. 1415) Précisions d'une bénédiction du jour qui ne sert pas encore (élites, champions ou sorts pas encore là) :
// partagées par la pastille du panneau et la bulle du mode mini.
import { t as tx } from "../i18n/index.js";
import { ELITE, CHAMPION } from "../game/data.js";
import { classSpells, spellRank, SPELL_ZONES } from "../game/spells.js";
import { tabOpen } from "../game/tabs.js";
import { ASCEND_MIN_ZONE } from "../game/prestige.js";

export function dayModNotes(S, dm) {
  if (!dm) return [];
  const first = !((S.prestige && S.prestige.count) > 0), out = [];
  if (dm.elite && S.zone < ELITE.minZone && first) out.push(tx("Les élites apparaissent à partir de la zone {0}.", { 0: ELITE.minZone }));
  if (dm.champion && S.zone < CHAMPION.minZone && first) out.push(tx("Les champions apparaissent à partir de la zone {0}.", { 0: CHAMPION.minZone }));
  if (dm.spellCdr && !classSpells(S.cls).some((x) => spellRank(S, x.id) > 0)) out.push(tx("Les sorts s’apprennent à partir de la zone {0}.", { 0: SPELL_ZONES[0] }));
  // (it. 1703) Jour des familiers sans familier actif
  if (dm.pets && !(S.pets && S.pets.active)) out.push(tabOpen(S, "pets") ? tx("Aucun familier actif : choisis-en un (Familiers).") : tx("Les familiers sortent des œufs des boss, des élites et des quêtes."));
  // (it. 3202) Jour des étoiles avant la zone de la première ascension
  if (dm.shards && (S.best || 0) < ASCEND_MIN_ZONE) out.push(tx("L’ascension devient possible à partir de la zone {0}.", { 0: ASCEND_MIN_ZONE }));
  // (it. 3256) Jour du zèle avant l'ouverture de l'onglet des quêtes (tout début de partie)
  if (dm.quests && !tabOpen(S, "quests")) out.push(tx("Les quêtes s’ouvrent après les premières minutes de jeu."));
  // (it. 3292) Jour de la forge avant l'Enclume (déblocage de la boutique)
  if (dm.forge && !(S.unlocks && S.unlocks.forge)) out.push(tx("La forge s’achète dans la boutique : l’Enclume."));
  return out;
}
