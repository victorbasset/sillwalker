// Sorts (demande D de Victor : « différents pour chaque héros ») : chaque héros a ses trois sorts, appris dans
// « Sorts et attaque » (onglet Héros). Ils s'ajoutent à l'attaque de base : chacun se lance tout seul en combat dès qu'il est
// rechargé, avec son animation (render/strip.js) et son son. Débloqués par la zone record (6, 22, 50), achetés puis
// améliorés avec de l'or (rangs 1 à SPELL_MAX) ; chaque héros garde les siens à l'ascension.
import { CLASS_FX } from "./classes.js";

// it. 477 : plus de plafond à 10 (en fin de partie, tout se maximisait d'un coup) : le prix ×2,5 par rang fait la limite.
export const SPELL_MAX = 50;
export const SPELL_ZONES = [10, 22, 50]; // 10 : l'onglet Héros s'ouvre en zone 10 (tabs.js)

/** Mécaniques communes (tpl) : dmg = mult × attaque par coup (hits coups), heal / shield = % des PV max. */
export const SPELL_TEMPLATES = {
  // pierce (demande H) : part des dégâts qui traverse et frappe le monstre suivant dès son apparition.
  bolt:   { cd: 8,  kind: "dmg",    mult: 1.5, hits: 1, pierce: 0.6, color: "#fff27a" },
  gust:   { cd: 6,  kind: "dmg",    mult: 0.6, hits: 2, pierce: 0.5, color: "#bfefff" },
  mend:   { cd: 12, kind: "heal",   pct: 8,             color: "#7dff9a" },
  fire:   { cd: 10, kind: "dmg",    mult: 2.2, hits: 1, color: "#ff9a3a" },
  aegis:  { cd: 15, kind: "shield", pct: 8,             color: "#ffe9a8" },
  meteor: { cd: 20, kind: "dmg",    mult: 5,   hits: 1, color: "#ff5a3a" },
};

/** Les trois sorts de chaque héros : [mécanique, nom] (zones 6, 22, 50 ; le troisième est toujours le plus fort). */
const CLASS_SPELLS = {
  warrior:     [["gust", "Tourbillon"], ["aegis", "Cri de ralliement"], ["meteor", "Fracas du titan"]],
  ranger:      [["gust", "Volée de flèches"], ["mend", "Herbes médicinales"], ["meteor", "Pluie de flèches"]],
  mage:        [["fire", "Boule de feu"], ["aegis", "Bouclier arcanique"], ["meteor", "Météore"]],
  paladin:     [["bolt", "Jugement"], ["mend", "Imposition des mains"], ["meteor", "Colère divine"]],
  assassin:    [["gust", "Lames jumelles"], ["aegis", "Voile d’ombre"], ["meteor", "Exécution"]],
  necro:       [["bolt", "Trait d’ombre"], ["mend", "Siphon de vie"], ["meteor", "Nuée d’os"]],
  monk:        [["gust", "Rafale de poings"], ["mend", "Méditation"], ["meteor", "Paume du dragon"]],
  druid:       [["bolt", "Épines"], ["mend", "Régénération"], ["meteor", "Colère de la forêt"]],
  samurai:     [["gust", "Double tranchant"], ["aegis", "Garde parfaite"], ["meteor", "Lame céleste"]],
  berserker:   [["gust", "Frénésie de lames"], ["mend", "Soif de sang"], ["meteor", "Coup de massue"]],
  arbalest:    [["bolt", "Carreau perforant"], ["aegis", "Pavois"], ["meteor", "Salve d’artillerie"]],
  lancer:      [["gust", "Estocade"], ["aegis", "Mur de piques"], ["meteor", "Charge héroïque"]],
  priestess:   [["bolt", "Rayon sacré"], ["mend", "Prière"], ["meteor", "Lumière de l’aube"]],
  gladiator:   [["gust", "Enchaînement"], ["aegis", "Bouclier du champion"], ["meteor", "Ovation"]],
  shaman:      [["bolt", "Foudre des ancêtres"], ["mend", "Esprit guérisseur"], ["meteor", "Tempête"]],
  bladedancer: [["gust", "Danse des lames"], ["aegis", "Pas de l’ombre"], ["meteor", "Valse mortelle"]],
  cryomancer:  [["bolt", "Javelot de glace"], ["aegis", "Armure de givre"], ["meteor", "Blizzard"]],
  bard:        [["gust", "Accord dissonant"], ["mend", "Chant apaisant"], ["meteor", "Crescendo final"]],
  starwarden:  [["bolt", "Étoile filante"], ["aegis", "Égide stellaire"], ["meteor", "Chute d’étoile"]],
  artificer:   [["fire", "Grenade"], ["aegis", "Bouclier mécanique"], ["meteor", "Bombe à fragmentation"]],
};

export const SPELLS = Object.entries(CLASS_SPELLS).flatMap(([cls, list]) => list.map(([tpl, name], i) =>
  ({ id: `${cls}.${i}`, cls, tpl, name, zone: SPELL_ZONES[i], ...SPELL_TEMPLATES[tpl], color: CLASS_FX[cls] || SPELL_TEMPLATES[tpl].color })));
export const SPELL_INDEX = Object.fromEntries(SPELLS.map((s) => [s.id, s]));
/** Sorts d'un héros (liste vide pour un héros inconnu). */
export const classSpells = (cls) => SPELLS.filter((s) => s.cls === cls);

/** Puissance des sorts lancés par le compagnon du duo (it. 513) : la moitié. */
export const PARTNER_SPELL = 0.5;

/** Puissance d'un sort au rang r (1 à SPELL_MAX) : +25 % par rang au-delà du premier. */
export const spellScale = (r) => 1 + 0.25 * Math.max(0, r - 1);
/** Prix du rang suivant (rang actuel r, 0 = pas encore appris) : suit l'or de la zone de déblocage. */
export const spellPrice = (sp, r) => Math.round(3 * Math.pow(1.25, sp.zone - 1) * 400 * Math.pow(2.5, r));
export const spellRank = (S, id) => Math.max(0, Math.min(SPELL_MAX, (S.spells && +S.spells[id]) || 0));

/** Recharge au rang r (it. 501, palier de progression) : -10 % tous les 10 rangs (rang 50 : moitié). */
export const spellCd = (sp, r) => Math.round(sp.cd * (1 - 0.1 * Math.floor(Math.max(0, r) / 10)) * 10) / 10;

/** Valeur du sort au rang r : dégâts en multiple de l'attaque (par coup), ou part des PV max. */
export function spellValue(sp, r) {
  const k = spellScale(r);
  return sp.kind === "dmg" ? sp.mult * k : sp.pct * k;
}
