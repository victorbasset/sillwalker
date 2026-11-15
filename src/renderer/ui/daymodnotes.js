// (it. 1415) Précisions d'une bénédiction du jour qui ne sert pas encore (élites, champions ou sorts pas encore là) :
// partagées par la pastille du panneau et la bulle du mode mini.
import { t as tx } from "../i18n/index.js";
import { ELITE, CHAMPION } from "../game/data.js";
import { classSpells, spellRank, SPELL_ZONES } from "../game/spells.js";

export function dayModNotes(S, dm) {
  if (!dm) return [];
  const first = !((S.prestige && S.prestige.count) > 0), out = [];
  if (dm.elite && S.zone < ELITE.minZone && first) out.push(tx("Les élites apparaissent à partir de la zone {0}.", { 0: ELITE.minZone }));
  if (dm.champion && S.zone < CHAMPION.minZone && first) out.push(tx("Les champions apparaissent à partir de la zone {0}.", { 0: CHAMPION.minZone }));
  if (dm.spellCdr && !classSpells(S.cls).some((x) => spellRank(S, x.id) > 0)) out.push(tx("Les sorts s’apprennent à partir de la zone {0}.", { 0: SPELL_ZONES[0] }));
  return out;
}
