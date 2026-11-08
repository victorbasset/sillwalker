// Catalogue de la boutique. Les prix suivent la meilleure zone atteinte
// (même progression que l'or gagné : ×1,25 par zone), pour rester utiles
// toute la partie sans pouvoir être contournés en retournant farmer en zone 1.
import { BAG_SIZE, BAG_MAX } from "./data.js";

export const SHOP_REFRESH_S = 15 * 60;   // renouvellement du marchand
export const SHOP_SLOTS = 4;
export const BUFF_CAP_S = 2 * 3600;      // durée maximale cumulable d'un élixir
export const POTION_MAX = 20;
export const POTION_HEAL = 0.5;          // part des PV rendus
export const POTION_THRESHOLD = 0.3;     // bue sous 30 % de vie
export const POTION_COOLDOWN = 8;        // secondes entre deux potions

export const zoneScale = (S) => Math.pow(1.25, Math.max(1, S.best) - 1);

/** Consommables. Les effets « buff » sont lus par rules.js (BUFF_EFFECTS). */
export const CONSUMABLES = [
  { id: "potion",  name: "Potion de soin",       base: 12,  kind: "stock",
    desc: "Bue automatiquement sous 30 % de vie : rend 50 % des PV. Stock maximal : 20." },
  { id: "elixir",  name: "Élixir de force",      base: 150, kind: "buff", duration: 600,
    desc: "+25 % d’attaque pendant 10 min de jeu (cumulable jusqu’à 2 h)." },
  { id: "fortune", name: "Parchemin de fortune", base: 120, kind: "buff", duration: 600,
    desc: "+50 % d’or pendant 10 min de jeu (cumulable jusqu’à 2 h)." },
  { id: "wisdom",  name: "Parchemin de savoir",  base: 120, kind: "buff", duration: 600,
    desc: "+50 % d’expérience pendant 10 min de jeu (cumulable jusqu’à 2 h)." },
];
export const BUFF_EFFECTS = { elixir: { atkPct: 25 }, fortune: { gold: 50 }, wisdom: { xp: 50 } };

/** Coffres : un objet de la meilleure zone, rareté minimale garantie. */
export const CHESTS = [
  { id: "chest_wood",  name: "Coffre en bois", minRarity: 1, base: 60,
    desc: "Un objet peu commun ou mieux." },
  { id: "chest_iron",  name: "Coffre ferré",   minRarity: 2, base: 350,
    desc: "Un objet rare ou mieux." },
  { id: "chest_royal", name: "Coffre royal",   minRarity: 3, base: 2200,
    desc: "Un objet épique ou légendaire." },
];

/** Améliorations permanentes. */
export const UPGRADES = [
  { id: "bag", name: "Sac plus grand", base: 400, growth: 4, max: (BAG_MAX - BAG_SIZE) / 6,
    desc: "+6 places dans le sac (jusqu’à 48)." },
];

export const consumablePrice = (c, S) => Math.round(c.base * zoneScale(S));
export const chestPrice = (c, S) => Math.round(c.base * zoneScale(S));
export const upgradePrice = (u, S) => Math.round(u.base * Math.pow(u.growth, S.upgrades[u.id] || 0));
export const rerollPrice = (S) => Math.round(50 * zoneScale(S));
