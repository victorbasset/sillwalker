// Classes jouables. Chaque classe modifie les statistiques de base et apporte
// un passif (mêmes clés que les talents, voir talents.js > EFFECTS).
// contact : distance (px) à laquelle le héros s'arrête pour combattre (rendu).
// projectile : effet visuel de l'attaque à distance (rendu).
export const CLASSES = {
  warrior: {
    name: "Guerrier",
    role: "Robuste, au corps à corps",
    desc: "Encaisse les coups et rend la pareille.",
    mul: { hp: 1.3, atk: 1, def: 1.25 },
    add: {},
    passive: { riposte: 15 },
    passiveText: "Riposte : 15 % de chances de contre-attaquer (50 % de son attaque) quand il est touché.",
    contact: 44,
    projectile: null,
  },
  ranger: {
    name: "Rôdeur",
    role: "Rapide, à distance",
    desc: "Décoche ses flèches avant que l’ennemi n’arrive au contact.",
    mul: { hp: 0.9, atk: 0.95, def: 1 },
    add: { crit: 10, spd: 25 },
    passive: { firstStrike: 2 },
    passiveText: "Tir d’ouverture : la première flèche de chaque combat inflige 3 fois plus de dégâts.",
    contact: 110,
    projectile: "arrow",
  },
  mage: {
    name: "Mage",
    role: "Puissant mais fragile, à distance",
    desc: "Ses boules de feu laissent les monstres en flammes.",
    mul: { hp: 0.75, atk: 1.4, def: 0.8 },
    add: {},
    passive: { burn: 25 },
    passiveText: "Brûlure : chaque sort enflamme la cible, qui perd 25 % de l’attaque du mage par seconde pendant 3 s.",
    contact: 110,
    projectile: "fire",
  },
  paladin: {
    name: "Paladin",
    role: "Tank sacré, au corps à corps",
    desc: "Un bouclier de lumière le protège au début de chaque combat.",
    mul: { hp: 1.2, atk: 0.95, def: 1.4 },
    add: {},
    passive: { shield: 20 },
    passiveText: "Bouclier sacré : chaque combat commence avec un bouclier égal à 20 % de ses PV max, qui absorbe les dégâts.",
    contact: 44,
    projectile: null,
  },
  assassin: {
    name: "Assassin",
    role: "Critiques et poison, au corps à corps",
    desc: "Frappe vite, frappe juste, et laisse le poison finir le travail.",
    mul: { hp: 0.85, atk: 1.1, def: 0.9 },
    add: { crit: 15 },
    passive: { poison: 15, dodge: 10 },
    passiveText: "Lames empoisonnées : chaque coup ajoute une charge de poison (15 % de l’attaque par seconde, 5 charges max, 4 s). +10 % d’esquive.",
    contact: 44,
    projectile: null,
  },
  necro: {
    name: "Nécromancien",
    role: "Invocateur, à distance",
    desc: "Un serviteur squelette se bat à ses côtés.",
    mul: { hp: 0.8, atk: 1.25, def: 0.9 },
    add: {},
    passive: { minion: 30 },
    passiveText: "Serviteur squelette : un squelette inflige en continu 30 % de l’attaque du nécromancien par seconde.",
    contact: 110,
    projectile: "shadow",
    minion: "skel",
  },
  monk: {
    name: "Moine",
    role: "Rafales de coups, au corps à corps",
    desc: "Chaque coup d’une série frappe plus fort que le précédent.",
    mul: { hp: 1.05, atk: 0.9, def: 1 },
    add: { spd: 40 },
    passive: { combo: 3 },
    passiveText: "Enchaînement : chaque coup d’un même combat inflige +3 % de dégâts (jusqu’à 10 coups, soit +30 %).",
    contact: 44,
    projectile: null,
  },
  druid: {
    name: "Druide",
    role: "Nature et épines, à distance",
    desc: "Les ronces renvoient les coups, la sève referme les plaies.",
    mul: { hp: 1.15, atk: 1.15, def: 1.1 },
    add: {},
    passive: { thorns: 40, regen: 4 },
    passiveText: "Épines : renvoie 40 % des dégâts reçus à l’attaquant. Régénération +4 % des PV max par seconde en marchant.",
    contact: 110,
    projectile: "leaf",
    minion: "wolf",
  },
  samurai: {
    name: "Samouraï",
    role: "Maître du sabre, au corps à corps",
    desc: "Patient et précis : sa lame frappe comme l’éclair au bon moment.",
    mul: { hp: 1.05, atk: 1, def: 1.1 },
    add: { crit: 5 },
    passive: { iai: 50 },
    passiveText: "Iaijutsu : chaque 4e coup d’un combat est un coup critique garanti qui inflige +50 % de dégâts.",
    contact: 44,
    projectile: null,
  },
  berserker: {
    name: "Berserker",
    role: "Rage et hache, au corps à corps",
    desc: "Plus l’ennemi saigne, plus il frappe fort ; chaque coup le soigne.",
    mul: { hp: 1.15, atk: 1.2, def: 0.85 },
    add: { spd: 10 },
    passive: { lifesteal: 6, execute: 35 },
    passiveText: "Rage sanguinaire : 6 % des dégâts infligés rendent des PV, et +35 % de dégâts contre les cibles sous 30 % de vie.",
    contact: 44,
    projectile: null,
  },

  // ---- Héros libérés plus loin sur le Rebord (demande 17 de Victor : 20 héros jusqu'à la zone 200). ----
  // tree : arbre de talents copié de ce héros (identifiants préfixés), en attendant des arbres propres.
  arbalest: {
    name: "Arbalétrière", role: "Tirs puissants, à distance", desc: "Ses carreaux traversent les armures des plus grands.",
    mul: { hp: 0.9, atk: 1.15, def: 0.95 }, add: { crit: 5 },
    passive: { doubleShot: 20, bossDmg: 15 },
    passiveText: "Carreaux jumeaux : 20 % de chances de tirer deux fois, +15 % de dégâts contre les boss.",
    contact: 110, projectile: "bolt", tree: "ranger", treePrefix: "ab_",
  },
  lancer: {
    name: "Lancier", role: "Allonge et premier coup, au corps à corps", desc: "Sa lance frappe avant que l’ennemi ne l’atteigne.",
    mul: { hp: 1.15, atk: 1.05, def: 1.15 }, add: {},
    passive: { firstStrike: 1, dodge: 8 },
    passiveText: "Allonge : le premier coup de chaque combat inflige 2 fois plus de dégâts. +8 % d’esquive.",
    contact: 56, projectile: null, tree: "warrior", treePrefix: "la_",
  },
  priestess: {
    name: "Prêtresse", role: "Lumière et soins, à distance", desc: "Une lumière douce la protège et referme ses plaies.",
    mul: { hp: 1.05, atk: 1.05, def: 1.1 }, add: {},
    passive: { shield: 15, regen: 5 },
    passiveText: "Grâce : chaque combat commence avec un bouclier de 15 % des PV max. Régénération +5 % des PV max par seconde en marchant.",
    contact: 110, projectile: "holy", tree: "paladin", treePrefix: "pr_",
  },
  gladiator: {
    name: "Gladiatrice", role: "Bouclier et glaive, au corps à corps", desc: "Chaque coup reçu lui donne l’occasion d’en rendre deux.",
    mul: { hp: 1.25, atk: 1.05, def: 1.2 }, add: {},
    passive: { riposte: 20, lifesteal: 4 },
    passiveText: "Arène : 20 % de chances de riposter quand elle est touchée ; 4 % des dégâts infligés rendent des PV.",
    contact: 44, projectile: null, tree: "warrior", treePrefix: "gl_",
  },
  shaman: {
    name: "Chaman", role: "Esprits et totems, à distance", desc: "L’esprit-loup se bat pour lui, les ronces le protègent.",
    mul: { hp: 1.0, atk: 1.2, def: 1.0 }, add: {},
    passive: { minion: 25, thorns: 20 },
    passiveText: "Esprit-loup : un loup inflige en continu 25 % de l’attaque du chaman par seconde. Épines : renvoie 20 % des dégâts reçus.",
    contact: 110, projectile: "spirit", minion: "wolf", tree: "druid", treePrefix: "sh_",
  },
  bladedancer: {
    name: "Danseuse de lames", role: "Tourbillon de lames, au corps à corps", desc: "Elle danse entre les coups et frappe deux fois plus souvent.",
    mul: { hp: 0.95, atk: 1.05, def: 0.95 }, add: { spd: 20 },
    passive: { doubleShot: 15, combo: 2, dodge: 8 },
    passiveText: "Tourbillon : 15 % de chances de frapper deux fois, chaque coup d’un combat +2 % de dégâts (10 coups max), +8 % d’esquive.",
    contact: 44, projectile: null, tree: "assassin", treePrefix: "bd_",
  },
  cryomancer: {
    name: "Cryomancienne", role: "Glace et critiques, à distance", desc: "Ses éclats de glace brisent les ennemis d’un seul coup.",
    mul: { hp: 0.8, atk: 1.3, def: 0.85 }, add: { crit: 10 },
    passive: { critDmg: 60, bossDmg: 15 },
    passiveText: "Éclats de givre : +60 % de dégâts critiques et +15 % de dégâts contre les boss.",
    contact: 110, projectile: "ice", tree: "mage", treePrefix: "cr_",
  },
  bard: {
    name: "Barde", role: "Chants et fortune, à distance", desc: "Ses chansons pressent le pas et remplissent la bourse.",
    mul: { hp: 0.95, atk: 1.0, def: 0.95 }, add: { spd: 20 },
    passive: { gold: 25, xp: 25 },
    passiveText: "Ballade : +25 % d’or et +25 % d’expérience.",
    contact: 110, projectile: "note", tree: "monk", treePrefix: "ba_",
  },
  starwarden: {
    name: "Gardien des étoiles", role: "Lame céleste, au corps à corps", desc: "Le dernier gardien du ciel brisé, armé d’une lame d’étoile.",
    mul: { hp: 1.25, atk: 1.2, def: 1.2 }, add: {},
    passive: { shield: 15, execute: 30, bossDmg: 20 },
    passiveText: "Lame d’étoile : bouclier de 15 % des PV max au début de chaque combat, +30 % de dégâts contre les cibles affaiblies et +20 % contre les boss.",
    contact: 44, projectile: null, tree: "samurai", treePrefix: "sw_",
  },
  artificer: {
    name: "Artificière", role: "Bombes et feu, à distance", desc: "Ses bombes laissent le terrain en flammes et achèvent les blessés.",
    mul: { hp: 0.9, atk: 1.25, def: 0.9 }, add: {},
    passive: { burn: 30, execute: 25 },
    passiveText: "Poudre noire : chaque bombe enflamme la cible (30 % de l’attaque par seconde pendant 3 s), +25 % de dégâts contre les cibles affaiblies.",
    contact: 110, projectile: "bomb", tree: "mage", treePrefix: "ar_",
  },
};
export const CLASS_KEYS = Object.keys(CLASSES);

/**
 * Héros à libérer : chaque classe (sauf le guerrier) est retenue prisonnière
 * dans une zone ; vaincre le boss de cette zone la débloque. On change de
 * classe uniquement en faisant une ascension.
 */
export const CLASS_UNLOCK_ZONE = { ranger: 10, necro: 15, mage: 20, berserker: 26, paladin: 32, assassin: 38, monk: 44, samurai: 50, druid: 58,
  // Demande 17 : les héros suivants s'étalent jusqu'au bout du Rebord (un tous les 14 zones environ).
  arbalest: 66, lancer: 80, priestess: 94, gladiator: 108, shaman: 122, bladedancer: 136, cryomancer: 150, bard: 164, starwarden: 178, artificer: 192 };
/** Classes dans l'ordre où on les libère (guerrier d'abord, puis zone du boss qui les retient). */
export const CLASS_KEYS_BY_UNLOCK = () => [...CLASS_KEYS].sort((a, b) => (CLASS_UNLOCK_ZONE[a] || 0) - (CLASS_UNLOCK_ZONE[b] || 0));
/**
 * Style de combat : 5 paliers d'animation d'attaque, de plus en plus
 * impressionnants et de plus en plus durs à atteindre (niveau + ascensions).
 */
export const ATTACK_TIERS = [
  { name: "Novice", lvl: 1, asc: 0 },
  { name: "Aguerri", lvl: 25, asc: 0 },
  { name: "Maître", lvl: 50, asc: 0 },
  { name: "Grand maître", lvl: 75, asc: 1 },
  { name: "Légendaire", lvl: 100, asc: 3 },
];
export function attackTier(S) {
  const asc = (S.prestige && S.prestige.count) || 0;
  let t = 0;
  ATTACK_TIERS.forEach((x, i) => { if (S.lvl >= x.lvl && asc >= x.asc) t = i; });
  return t;
}
/** Couleur des effets d'attaque de chaque classe. */
export const CLASS_FX = { warrior: "#dfe7ef", ranger: "#9fe0a8", mage: "#ffb733", paladin: "#ffe27a", assassin: "#ff4a6a", necro: "#7dff9a", monk: "#ff9a3a", druid: "#8fd86a", samurai: "#9fd8ff", berserker: "#ff5a3a" };

export const isClassUnlocked = (S, cls) => cls === "warrior" || (S.classesUnlocked || []).includes(cls);
export const classDef = (id) => CLASSES[id] || CLASSES.warrior;
