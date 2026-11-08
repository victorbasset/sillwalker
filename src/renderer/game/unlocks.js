// Déblocages : automatismes et fonctionnalités achetés une fois pour toutes à
// la boutique (conservés à l'ascension). Le joueur commence avec un jeu simple
// et le rend plus confortable petit à petit : c'est la progression qui se voit.
//
// Avant l'achat, l'action manuelle reste possible (équiper objet par objet,
// réclamer une quête à la fois…). Chaque déblocage demande une zone record :
// ils s'étalent sur plusieurs courses, pas seulement sur l'or du moment.

/** Dans l'ordre d'achat conseillé. icon = icône de la boutique (render/shopart.js). */
export const UNLOCKS = [
  { id: "bulkEquip",   price: 300, zone: 1,     icon: "eye",      name: "Œil du connaisseur",       desc: "Boutons « Équiper le meilleur » et « Vendre ce qui n’améliore pas »." },
  { id: "menagerie",   price: 800, zone: 3,     icon: "kennel2",  name: "Ménagerie",                desc: "Fait éclore les œufs de familiers : un compagnon suit ton héros et le renforce." },
  { id: "autoPotion",  price: 2000, zone: 5,    icon: "potion",   name: "Ceinture d’alchimiste",    desc: "Rachète tout seul des potions de soin quand le stock baisse." },
  { id: "forge",       price: 5000, zone: 8,    icon: "anvil",    name: "Enclume",                  desc: "Forge (+1 à +10) et réforge des objets." },
  { id: "autoSell",    price: 15000, zone: 10,    icon: "ws_gold",  name: "Tri du marchand",          desc: "Vend dès qu’ils tombent les objets des raretés choisies." },
  { id: "workshop",    price: 30000, zone: 12,  icon: "gear",     name: "Atelier",                  desc: "Améliorations permanentes de la boutique (attaque, PV, or, vitesse)." },
  { id: "bulkPoints",  price: 60000, zone: 15,   icon: "book",     name: "Manuel du stratège",       desc: "Dépense en un clic tous les points de talent et de compétence." },
  { id: "questDesk",   price: 200000, zone: 20,   icon: "map",      name: "Bureau des contrats",      desc: "Réclame toutes les quêtes d’un coup, ou automatiquement." },
  { id: "expeditions", price: 600000, zone: 25,   icon: "kennel",   name: "Chenil des explorateurs",  desc: "Tes familiers libres partent en expédition (même jeu fermé)." },
  { id: "petBulk",     price: 2000000, zone: 30,  icon: "egg",      name: "Nid douillet",             desc: "Fait éclore tous les œufs et gère toutes les expéditions en un clic." },
  { id: "transmute",   price: 6000000, zone: 35,  icon: "cauldron", name: "Creuset du transmutateur", desc: "Transforme 3 objets inutiles en 1 objet de la rareté au-dessus." },
  { id: "autoLevel",   price: 20000000, zone: 40,  icon: "keys",     name: "Grimoire de l’éveil",      desc: "À chaque niveau, les points se dépensent tout seuls (option)." },
  { id: "armsValet",   price: 60000000, zone: 45, icon: "ws_atk",   name: "Valet d’armes",            desc: "Équipe tout seul un objet plus puissant dès qu’il tombe (option)." },
  { id: "masterForge", price: 200000000, zone: 50, icon: "anvil",   name: "Maître de forge",          desc: "Forge tout seul l’équipement porté avec l’or en trop (option)." },
];
export const UNLOCK_INDEX = Object.fromEntries(UNLOCKS.map((u) => [u.id, u]));

/** Meilleure zone atteinte, toutes courses confondues (les déblocages s'ouvrent avec elle). */
export const recordZone = (S) => Math.max(S.best || 1, (S.prestige && S.prestige.bestRun) || 0);
/** Le déblocage est-il en vente (zone record suffisante) ? */
export const unlockAvailable = (S, u) => recordZone(S) >= (u.zone || 1);

/** Le déblocage est-il acquis ? */
export const hasUnlock = (S, id) => !!(S.unlocks && S.unlocks[id]);

/** Prochain déblocage à acheter (le moins cher pas encore acquis). */
export const nextUnlock = (S) => UNLOCKS.find((u) => !hasUnlock(S, u.id)) || null;

/**
 * Parties d'avant les déblocages : on garde ce que le joueur utilisait déjà
 * (rien ne doit cesser de marcher), le reste s'achète.
 */
export function grandfatherUnlocks(S) {
  const u = (S.unlocks ||= {});
  const st = S.stats || {};
  if ((st.kills || 0) > 0) u.bulkEquip = true;
  if (S.pets && Object.keys(S.pets.owned || {}).length) u.menagerie = true;
  const items = [...(S.bag || []), ...Object.values(S.equip || {})].filter(Boolean);
  if (items.some((it) => it.plus > 0) || (st.reforges || 0) > 0) u.forge = true;
  if (S.workshop && Object.values(S.workshop).some((v) => v > 0)) u.workshop = true;
  if (S.autoPotions) u.autoPotion = true;
  if (S.autoSell && Object.values(S.autoSell).some(Boolean)) u.autoSell = true;
  if (S.quests && S.quests.auto) u.questDesk = true;
  if ((st.expeditions || 0) > 0 || (S.pets && Object.keys(S.pets.exp || {}).length)) u.expeditions = true;
  if ((st.transmutes || 0) > 0) u.transmute = true;
  if (S.settings && (S.settings.autoTalents || S.settings.autoSkills)) { u.autoLevel = true; u.bulkPoints = true; }
  return u;
}
