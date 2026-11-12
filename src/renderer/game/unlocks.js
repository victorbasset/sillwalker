// Déblocages : automatismes et fonctionnalités achetés une fois pour toutes à
// la boutique (conservés à l'ascension). Le joueur commence avec un jeu simple
// et le rend plus confortable petit à petit : c'est la progression qui se voit.
//
// Avant l'achat, l'action manuelle reste possible (équiper objet par objet,
// réclamer une quête à la fois…). Chaque déblocage demande une zone record :
// ils s'étalent sur plusieurs courses, pas seulement sur l'or du moment.

/** Dans l'ordre d'achat conseillé. icon = icône de la boutique (render/shopart.js). */
// Premiers déblocages avec l'ouverture de la boutique (zone 8). Zones étalées jusqu'à la zone 200 (demande de Victor : ne pas tout débloquer trop vite) ; prix ≈ or d'un monstre
// de la zone × (100 + 8 × zone), arrondis. Les déblocages déjà achetés restent acquis.
export const UNLOCKS = [
  { id: "bulkEquip",   price: 300, zone: 8,     icon: "eye",      name: "Œil du connaisseur",       desc: "Boutons « Équiper le meilleur » et « Vendre ce qui n’améliore pas »." },
  { id: "autoPotion",  price: 1400, zone: 9,    icon: "potion",   name: "Ceinture d’alchimiste",    desc: "Rachète tout seul des potions de soin quand le stock baisse." },
  { id: "forge",       price: 4100, zone: 11,    icon: "anvil",    name: "Enclume",                  desc: "Forge (+1 à +10) et réforge des objets." },
  { id: "autoSell",    price: 12000, zone: 14,    icon: "ws_gold",  name: "Tri du marchand",          desc: "Vend dès qu’ils tombent les objets des raretés choisies." },
  { id: "workshop",    price: 33000, zone: 18,  icon: "gear",     name: "Atelier",                  desc: "Améliorations permanentes de la boutique (attaque, PV, or, expérience, vitesse)." },
  { id: "travelMap",   price: 90000, zone: 22,  icon: "map",      name: "Carte du voyageur",        desc: "Un clic sur la carte du Rebord emmène ton héros dans une zone déjà atteinte." },
  { id: "menagerie",   price: 200000, zone: 25,     icon: "kennel2",  name: "Ménagerie",                desc: "Fait éclore les œufs de familiers : un compagnon suit ton héros et le renforce." },
  { id: "bulkPoints",  price: 1.1e6, zone: 32,   icon: "book",     name: "Manuel du stratège",       desc: "Dépense en un clic tous les points de talent et de compétence." },
  { id: "questDesk",   price: 7.8e6, zone: 40,   icon: "contract",      name: "Bureau des contrats",      desc: "Réclame toutes les quêtes d’un coup, ou automatiquement." },
  { id: "spellBook",   price: 3e7, zone: 45,   icon: "grimoire", name: "Grimoire des sorts",       desc: "Améliore tout seul le sort le moins cher de ton héros ou de son compagnon, tant qu’il coûte moins d’un dixième de ton or (option)." },
  { id: "expeditions", price: 8.7e7, zone: 50,   icon: "kennel",   name: "Chenil des explorateurs",  desc: "Tes familiers libres partent en expédition (même jeu fermé)." },
  { id: "petBulk",     price: 9.4e8, zone: 60,  icon: "egg",      name: "Nid douillet",             desc: "Fait éclore tous les œufs et gère toutes les expéditions en un clic." },
  { id: "transmute",   price: 1.6e10, zone: 72,  icon: "cauldron", name: "Creuset du transmutateur", desc: "Transforme 3 objets inutiles en 1 objet de la rareté au-dessus." },
  { id: "autoLevel",   price: 3.4e11, zone: 85,  icon: "keys",     name: "Grimoire de l’éveil",      desc: "À chaque niveau, les points se dépensent tout seuls (option)." },
  { id: "armsValet",   price: 1.1e13, zone: 100, icon: "ws_atk",   name: "Valet d’armes",            desc: "Équipe tout seul un objet plus puissant dès qu’il tombe (option)." },
  { id: "masterForge", price: 3.5e14, zone: 115, icon: "hammer",   name: "Maître de forge",          desc: "Forge tout seul l’équipement porté avec l’or en trop (option)." },
  { id: "charmKeeper", price: 2e15, zone: 122, icon: "talisman",    name: "Porte-talisman",           desc: "Face à un boss qui maudit ou empoisonne, équipe tout seul le Talisman de pureté du sac, puis remet l’objet d’avant." },
  { id: "starNet",     price: 1.1e16, zone: 130, icon: "star",    name: "Filet à étoiles",          desc: "Attrape tout seul les étoiles filantes que tu n’as pas cliquées à temps." },
  { id: "starAnvil",   price: 1e17, zone: 140, icon: "staranvil",   name: "Enclume stellaire",        desc: "Remonte un objet au niveau de ton record de zone (statistiques, rareté, forge, pouvoir et panoplie conservés). Très cher." },
  { id: "astrolabe",   price: 1.1e18, zone: 150, icon: "astro",   name: "Astrolabe",                desc: "Fait l’ascension tout seul quand le héros bloque près de son record (option, à activer)." },
  { id: "steward",     price: 1.1e20, zone: 170, icon: "bell", name: "Grand intendant",         desc: "Fait éclore les œufs et renvoie tout seul les familiers en expédition (option)." },
  { id: "skyChart",    price: 6e21, zone: 185, icon: "c_north", name: "Carte du ciel",           desc: "Place tout seul les éclats d’étoile dans la constellation la moins chère, après chaque ascension (option)." },
  { id: "crucible",    price: 1e23, zone: 200, icon: "everfire", name: "Creuset perpétuel",      desc: "Transmute tout seul les objets inutiles quand le sac se remplit (option)." },
  { id: "starSmith",   price: 3e25, zone: 230, icon: "starsmith", name: "Forgeron des astres",    desc: "Remonte tout seul l’équipement porté au niveau de ton record, avec l’or en trop (option)." },
  // (it. 732) au-delà du Rebord : élixirs et parchemins rachetés quand leur effet s'achève
  { id: "herbalist",   price: 1e28, zone: 260, icon: "herbalist", name: "Herboriste perpétuel",   desc: "Rachète tout seul les élixirs et parchemins quand leur effet s’achève, avec l’or en trop (option)." },
  // (it. 736) au-delà du Rebord : le marchand sert le héros tout seul
  { id: "trader",      price: 2e31, zone: 300, icon: "trader",    name: "Marchand attitré",       desc: "Achète et équipe tout seul l’objet du marchand qui renforce le plus ton héros, avec l’or en trop (option)." },
  // (it. 712) au-delà du Rebord : l'Enclume stellaire sans clic
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
