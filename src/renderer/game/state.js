// Format de la sauvegarde + migrations. Toute nouvelle donnée persistante
// doit avoir une valeur par défaut ici et, si besoin, une étape de migration.
import { SLOT_KEYS, LEGENDARY, BAG_SIZE, RARITIES } from "./data.js";
import { CLASSES, CLASS_UNLOCK_ZONE, canPartner } from "./classes.js";
import { codexRecord } from "./codex.js";
import { grandfatherUnlocks } from "./unlocks.js";
import { PET_INDEX } from "./pets.js";
import { SKILL_TREE } from "./skilltree.js";
import { LANGS } from "../i18n/index.js";
import { seedTabs } from "./tabs.js";
import { chroniclesUnlocked } from "./story.js";

export const SAVE_VERSION = 8;

export function freshState(now = Date.now()) {
  return {
    v: SAVE_VERSION,
    lvl: 1, xp: 0, gold: 0,
    zone: 1, best: 1, kills: 0,
    equip: Object.fromEntries(SLOT_KEYS.map((k) => [k, null])),
    bag: [],
    autoAdvance: true,
    autoSell: { common: false, uncommon: false, rare: false },
    autoPotions: false, // rachète des potions automatiquement sous AUTO_POTIONS
    last: now,
    nextId: 1,
    stats: { kills: 0, deaths: 0, bosses: 0, legendaries: 0, elites: 0, purchases: 0, classes: ["warrior"] },
    achievements: [],   // identifiants déjà signalés à Steam
    log: [],
    bossDefeats: {},    // { zone: défaites contre son boss } jusqu’à sa victoire (usure des boss, bosses.js)
    logLang: null,      // langue dans laquelle le journal est écrit (repart à zéro si elle change)
    cls: "warrior",     // classe active (voir classes.js)
    classesUnlocked: ["warrior"], // héros libérés (classes.js > CLASS_UNLOCK_ZONE)
    nextCls: null,      // classe choisie pour la prochaine ascension
    partner: null,      // héros compagnon du duo (demande 17) : autre portée que le héros principal
    nextPartner: null,  // compagnon choisi pour la prochaine ascension
    talents: {},        // { classe: { idTalent: rang } } : chaque classe garde ses talents
    buffs: {},          // { elixir: secondes restantes, ... }
    potions: 3,
    bagSize: BAG_SIZE,
    upgrades: {},       // améliorations achetées { bag: 2 }
    unlocks: {},        // déblocages achetés (game/unlocks.js), conservés à l'ascension
    workshop: {},       // atelier : { ws_atk: niveau, ... } (conservé à l'ascension)
    shop: null,         // { items: [...], next: horodatage du prochain renouvellement }
    // v4
    prestige: { shards: 0, total: 0, count: 0, ranks: {} }, // ascension et constellations
    quests: { slots: [], completed: 0, nextUid: 1, auto: false },
    guild: { rep: 0 },      // réputation de la guilde (quests.js), conservée à l'ascension
    pets: { owned: {}, active: null, eggs: 0, exp: {} },     // owned : { id: { lvl, xp } } ; exp : expéditions en cours
    bestiary: {},                                            // { typeDeMonstre: victoires }
    // v5
    skills: { order: [] },  // arbre de compétences : nœuds choisis, dans l'ordre (conservé à l'ascension)
    // v6
    speed: 0,               // vitesse de déplacement permanente (%), voir events.js
    settings: { sound: true, soundOn2: true, music: true, muted: false, volume: 0.4, dayNight: true, damageNumbers: true, fullEffects: true, weather: true, eco: false, lang: null, theme: null }, // theme : null = sombre (défaut), "auto" (Windows), "light" ou "dark"
    daily: { last: null, streak: 0 },   // récompense quotidienne (série de jours consécutifs)
    codex: {},              // collection d'objets { "slot:Type": meilleure rareté }, voir codex.js
    powersSeen: {},         // pouvoirs légendaires découverts { id: true }
    tabsOpen: {},
    story: { intro: false, read: { sky: true }, won: false }, // « sky » : c'est l'intro // histoire (story.js) : intro vue, chroniques annoncées
    journey: [],            // carnet de route : grandes étapes datées [{ t, k: lvl|zone|leg|cls|asc, v }] (game.milestone)           // onglets du panneau déjà ouverts { id: true | "new" } (tabs.js : déblocage progressif)
    setsDone: {},           // panoplies complétées (4 pièces portées) au moins une fois { id: true }, voir codex.js
  };
}

const isObj = (o) => o && typeof o === "object" && !Array.isArray(o);

/** Renvoie un état valide à partir de données brutes (ou null si inutilisables). */
export function migrate(raw) {
  if (!isObj(raw) || typeof raw.v !== "number") return null;
  let o = JSON.parse(JSON.stringify(raw));
  if (o.v === 1) {
    // v1 (prototype navigateur) -> v2 : compteur de légendaires et succès.
    const all = [...(o.bag || []), ...Object.values(o.equip || {})].filter(Boolean);
    o.stats = Object.assign({}, o.stats, { legendaries: all.some((i) => i.r === LEGENDARY) ? 1 : 0 });
    o.achievements = [];
    o.v = 2;
  }
  if (o.v === 2) {
    // v2 -> v3 : classes, talents, boutique. Les anciennes parties sont des guerriers.
    Object.assign(o, { cls: "warrior", talents: {}, buffs: {}, potions: 3, bagSize: BAG_SIZE, upgrades: {}, shop: null });
    o.stats = Object.assign({ elites: 0, purchases: 0, classes: ["warrior"] }, o.stats);
    o.v = 3;
  }
  if (o.v === 3) {
    // v3 -> v4 : ascension, quêtes, familiers, bestiaire.
    const f = freshState();
    Object.assign(o, { prestige: f.prestige, quests: f.quests, pets: f.pets, bestiary: {} });
    o.v = 4;
  }
  if (o.v === 4) {
    // v4 -> v5 : arbre de compétences.
    o.skills = { order: [] };
    o.v = 5;
  }
  if (o.v === 5) {
    // v5 -> v6 : vitesse permanente, nouveaux emplacements (amulette, gants).
    o.speed = 0;
    o.v = 6;
  }
  if (o.v === 6) {
    // v6 -> v7 : déblocages en boutique. On garde ce que le joueur utilisait déjà.
    grandfatherUnlocks(o);
    o.v = 7;
  }
  if (o.v === 7) {
    // v7 -> v8 : nouveaux déblocages (ménagerie, enclume, atelier) : même règle.
    grandfatherUnlocks(o);
    o.v = 8;
  }
  if (o.v !== SAVE_VERSION) return null;
  const def = freshState(o.last || Date.now());
  const s = Object.assign(freshState(o.last || Date.now()), o);
  s.equip = Object.assign(def.equip, isObj(o.equip) ? o.equip : {});
  // Objets illisibles (null, emplacement ou rareté inconnus) : retirés, sinon ils font planter le tri du sac,
  // « À faire », la vente… Un objet porté doit être à sa place ; ses statistiques illisibles sont écartées.
  const okItem = (it) => isObj(it) && SLOT_KEYS.includes(it.slot) && Number.isInteger(it.r) && !!RARITIES[it.r];
  const fixItem = (it) => {
    if (!isObj(it.st)) it.st = {};
    for (const k in it.st) if (!Number.isFinite(it.st[k])) delete it.st[k];
    return it;
  };
  for (const k of Object.keys(s.equip)) {
    const it = s.equip[k];
    if (!SLOT_KEYS.includes(k)) delete s.equip[k];
    else if (it != null && !(okItem(it) && it.slot === k)) s.equip[k] = null;
    else if (it) fixItem(it);
  }
  s.stats = Object.assign(def.stats, isObj(o.stats) ? o.stats : {});
  s.autoSell = Object.assign(def.autoSell, isObj(o.autoSell) ? o.autoSell : {});
  s.bag = Array.isArray(s.bag) ? s.bag.filter(okItem).map(fixItem) : [];
  // Stock du marchand illisible : renouvelé (null) ; objets illisibles retirés.
  if (!isObj(s.shop) || !Array.isArray(s.shop.items) || !Number.isFinite(s.shop.next)) s.shop = null;
  else s.shop.items = s.shop.items.filter((it) => okItem(it) && Number.isFinite(it.price)).map(fixItem);
  if (!Array.isArray(s.log)) s.log = [];
  if (!Array.isArray(s.achievements)) s.achievements = [];
  if (!CLASSES[s.cls]) s.cls = "warrior";
  // Héros débloqués : avant ce système, toutes les classes étaient libres ; on garde celles déjà jouées.
  // Ainsi que les héros des zones dont le boss a déjà été vaincu.
  if (!Array.isArray(o.classesUnlocked)) {
    const best = Math.max(s.best || 1, (s.prestige && s.prestige.bestRun) || 0);
    const beaten = Object.keys(CLASS_UNLOCK_ZONE).filter((c) => best > CLASS_UNLOCK_ZONE[c]);
    s.classesUnlocked = [...new Set(["warrior", s.cls, ...(s.stats.classes || []), ...beaten])].filter((c) => CLASSES[c]);
  }
  // Liste lisible : héros inconnus (autre version) ou valeurs abîmées retirés, le guerrier toujours libre.
  else s.classesUnlocked = [...new Set(["warrior", ...o.classesUnlocked.filter((c) => typeof c === "string" && CLASSES[c])])];
  if (s.nextCls && !CLASSES[s.nextCls]) s.nextCls = null;
  // Duo : compagnon inconnu, pas encore libéré ou de même portée que le héros : retiré.
  if (s.partner != null && !canPartner(s, s.cls, s.partner)) s.partner = null;
  if (s.nextPartner != null && !CLASSES[s.nextPartner]) s.nextPartner = null;
  for (const k of ["talents", "buffs", "upgrades", "bestiary", "workshop"]) if (!isObj(s[k])) s[k] = {};
  // Talents par classe ({ classe: { talent: rang } }) : entrées illisibles retirées (elles faisaient échouer le démarrage).
  for (const c of Object.keys(s.talents)) {
    if (!isObj(s.talents[c])) { delete s.talents[c]; continue; }
    for (const id of Object.keys(s.talents[c])) if (!Number.isFinite(s.talents[c][id])) delete s.talents[c][id];
  }
  if (!isObj(o.setsDone)) { // apparu après coup : une panoplie complète déjà portée compte
    s.setsDone = {};
    const n = {}; for (const it of Object.values(s.equip)) if (it && it.set) n[it.set] = (n[it.set] || 0) + 1;
    for (const id in n) if (n[id] >= 4) s.setsDone[id] = true;
  }
  if (!isObj(o.powersSeen)) { s.powersSeen = {}; for (const it of [...s.bag, ...Object.values(s.equip)]) if (it && it.power) s.powersSeen[it.power] = true; }
  if (!isObj(o.codex)) { // collection apparue après coup : on y met les objets déjà possédés
    s.codex = {};
    for (const it of [...s.bag, ...Object.values(s.equip)]) if (it) codexRecord(s, it);
  }
  s.prestige = Object.assign(def.prestige, isObj(o.prestige) ? o.prestige : {});
  if (!isObj(s.prestige.ranks)) s.prestige.ranks = {};
  s.quests = Object.assign(def.quests, isObj(o.quests) ? o.quests : {});
  // Quêtes illisibles retirées (ensureQuests en propose de nouvelles) ; leur sorte inconnue est traitée là-bas.
  s.quests.slots = Array.isArray(s.quests.slots) ? s.quests.slots.filter((q) => isObj(q) && isObj(q.reward)) : [];
  for (const q of s.quests.slots) if (!q.stars) q.stars = 1;
  s.guild = Object.assign(def.guild, isObj(o.guild) ? o.guild : {});
  s.pets = Object.assign(def.pets, isObj(o.pets) ? o.pets : {});
  if (!isObj(s.pets.owned)) s.pets.owned = {};
  if (!isObj(s.pets.exp)) s.pets.exp = {};
  // Familiers inconnus (sauvegarde d'une autre version) : retirés, sinon leur nom manque partout (combat, journal).
  for (const id of Object.keys(s.pets.owned)) if (!PET_INDEX[id]) delete s.pets.owned[id];
  for (const id of Object.keys(s.pets.exp)) if (!PET_INDEX[id] || !s.pets.owned[id]) delete s.pets.exp[id];
  if (s.pets.active && !s.pets.owned[s.pets.active]) s.pets.active = Object.keys(s.pets.owned)[0] || null;
  s.skills = Object.assign(def.skills, isObj(o.skills) ? o.skills : {});
  // Nœuds inconnus (autre version) ou doublons retirés : skillTreeEffects lit chaque nœud.
  s.skills.order = Array.isArray(s.skills.order) ? [...new Set(s.skills.order)].filter((id) => typeof id === "string" && SKILL_TREE.nodes[id]) : [];
  s.prestige.skillPts = Math.max(0, Math.floor(+s.prestige.skillPts || 0));
  s.speed = Math.max(0, +s.speed || 0);
  s.settings = Object.assign(def.settings, isObj(o.settings) ? o.settings : {});
  // Langue inconnue (autre version, valeur abîmée) : la page se rechargeait en boucle pour l'appliquer (app.js).
  if (s.settings.lang != null && !LANGS.some((l) => l.id === s.settings.lang)) delete s.settings.lang;
  if (s.settings.hints != null && !isObj(s.settings.hints)) s.settings.hints = {};
  s.daily = Object.assign(def.daily, isObj(o.daily) ? o.daily : {});
  s.potions = Math.max(0, Math.floor(+s.potions || 0));
  s.bagSize = Math.max(BAG_SIZE, Math.floor(+s.bagSize || BAG_SIZE));
  for (const k of ["lvl", "zone", "best", "nextId"]) s[k] = Math.max(1, Math.floor(+s[k] || 1));
  for (const k of ["xp", "gold", "kills"]) s[k] = Math.max(0, +s[k] || 0);
  // Nombres illisibles dans les sous-objets (un NaN ou un Infinity d'un bug passé est enregistré « null ») :
  // valeur par défaut, sinon il se propagerait (éclats, réputation, statistiques…) et pourrait bloquer la partie.
  // Onglets progressifs, apparus après coup : tout ce que le joueur connaissait déjà reste ouvert.
  if (!isObj(o.tabsOpen)) seedTabs(s);
  s.journey = Array.isArray(s.journey) ? s.journey.filter((e) => isObj(e) && Number.isFinite(e.t) && typeof e.k === "string").slice(-120) : [];
  // Histoire apparue après coup : une partie déjà entamée ne revoit pas l'intro surgir (relisible dans les Chroniques).
  if (!isObj(o.story)) {
    s.story = { intro: (s.best > 1 || s.lvl > 1), read: {} };
    // Chroniques déjà méritées par une partie entamée : relisibles, mais pas annoncées en rafale.
    for (const c of chroniclesUnlocked(s, Math.max(s.best || 1, (s.prestige && s.prestige.bestRun) || 0))) s.story.read[c.id] = true;
  }
  else { if (typeof s.story.intro !== "boolean") s.story.intro = true; if (!isObj(s.story.read)) s.story.read = {}; }
  if (typeof s.story.won !== "boolean") s.story.won = false;
  if (typeof s.story.wonAt !== "number") delete s.story.wonAt;
  // Son activé par défaut (demande de Victor, 2026-11-09) : une seule fois pour les parties d'avant, où il était coupé
  // d'office ; ensuite le choix du joueur (bouton haut-parleur, Réglages) est respecté.
  if (!isObj(o.settings) || o.settings.soundOn2 !== true) { s.settings.sound = true; s.settings.soundOn2 = true; }
  // Carnet apparu après coup, partie déjà entamée : une première entrée situe le point de départ.
  if (!Array.isArray(o.journey) && (s.best > 1 || s.lvl > 1)) s.journey.push({ t: Date.now(), k: "start", v: s.best, l: s.lvl });
  const ref = freshState(); // def a été fusionné dans s : référence intacte à part
  for (const k of ["stats", "prestige", "guild", "pets", "skills", "daily"]) {
    for (const f in ref[k]) if (typeof ref[k][f] === "number" && !Number.isFinite(s[k][f])) s[k][f] = ref[k][f];
  }
  return s;
}
