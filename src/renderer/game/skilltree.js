// Arbre de compétences : un grand graphe commun à toutes les classes.
//
//  - Un nœud central (déjà acquis), 6 secteurs en étoile.
//  - Chaque secteur : une chaîne de 3 nœuds, puis deux bras de 5 + 3 petits
//    nœuds, chacun avec 2 nœuds remarquables, qui se rejoignent sur une clé de
//    voûte (effet puissant, souvent à double tranchant).
//  - Des passerelles relient les secteurs voisins (on peut circuler en anneau).
//  - On ne peut prendre qu'un nœud relié à un nœud déjà acquis.
//
// Points : 1 par tranche de 2 niveaux + des points permanents gagnés à chaque
// ascension. Le chemin choisi (S.skills.order) est conservé à l'ascension :
// les premiers nœuds se réactivent tout seuls au fil des niveaux.
//
// Pour ajouter du contenu : modifier SECTORS (effets, noms, clé de voûte).
import { prestigeEffects } from "./prestige.js";

export const SECTORS = [
  { id: "force", name: "Force", color: "#e2552b",
    small: [{ atkPct: 2 }, { critDmg: 5 }, { atkPct: 2 }, { bossDmg: 3 }],
    notables: [
      { name: "Bras de titan", eff: { atkPct: 10 } }, { name: "Coup fatal", eff: { critDmg: 25, execute: 10 } },
      { name: "Tueur de géants", eff: { bossDmg: 20 } }, { name: "Massacre", eff: { atkPct: 8, doubleShot: 5 } },
    ],
    keystone: { name: "Brute", eff: { atkPct: 40, critDmg: -40 }, text: "+40 % d’attaque, mais −40 % de dégâts critiques." } },
  { id: "agility", name: "Agilité", color: "#5fd36f",
    small: [{ spd: 2 }, { crit: 1 }, { dodge: 1 }, { spd: 2 }],
    notables: [
      { name: "Réflexes", eff: { dodge: 5, spd: 5 } }, { name: "Précision mortelle", eff: { crit: 5, critDmg: 15 } },
      { name: "Vent du nord", eff: { spd: 12 } }, { name: "Danse des lames", eff: { doubleShot: 8, dodge: 3 } },
    ],
    keystone: { name: "Tempête de lames", eff: { spd: 45, hpPct: -15 }, text: "+45 % de vitesse d’attaque, mais −15 % de PV." } },
  { id: "arcane", name: "Arcanes", color: "#c08cff",
    small: [{ burn: 2 }, { execute: 3 }, { poison: 1 }, { minion: 2 }],
    notables: [
      { name: "Pyromancie", eff: { burn: 12 } }, { name: "Venin noir", eff: { poison: 6 } },
      { name: "Invocation", eff: { minion: 15 } }, { name: "Coup de grâce", eff: { execute: 20 } },
    ],
    keystone: { name: "Flamme intérieure", eff: { burn: 60, poison: 15, atkPct: -10 }, text: "Brûlure +60 % et poison +15 %, mais −10 % d’attaque." } },
  { id: "vitality", name: "Vitalité", color: "#ff7a6b",
    small: [{ hpPct: 3 }, { defPct: 3 }, { regen: 0.5 }, { hpPct: 3 }],
    notables: [
      { name: "Constitution de fer", eff: { hpPct: 12 } }, { name: "Carapace", eff: { defPct: 15, shield: 5 } },
      { name: "Sang chaud", eff: { regen: 3, lifesteal: 1 } }, { name: "Ronces", eff: { thorns: 15 } },
    ],
    keystone: { name: "Colosse", eff: { hpPct: 50, shield: 15, spd: -15 }, text: "+50 % de PV et bouclier +15 %, mais −15 % de vitesse d’attaque." } },
  { id: "fortune", name: "Fortune", color: "#ffd34d",
    small: [{ gold: 3 }, { xp: 3 }, { drop: 2 }, { gold: 3 }],
    notables: [
      { name: "Trésorier", eff: { gold: 15 } }, { name: "Érudit", eff: { xp: 15 } },
      { name: "Chasseur de trésors", eff: { drop: 12 } }, { name: "Rêveur", eff: { offline: 15 } },
    ],
    keystone: { name: "Midas", eff: { gold: 100, xp: -20 }, text: "Or ×2, mais −20 % d’expérience." } },
  { id: "mastery", name: "Maîtrise", color: "#6aa8ff",
    small: [{ riposte: 1 }, { lifesteal: 0.3 }, { firstStrike: 0.1 }, { combo: 0.3 }],
    notables: [
      { name: "Contre-attaque", eff: { riposte: 8 } }, { name: "Première frappe", eff: { firstStrike: 0.8 } },
      { name: "Rythme", eff: { combo: 2 } }, { name: "Vampirisme", eff: { lifesteal: 3 } },
    ],
    keystone: { name: "Immortel", eff: { secondWind: 1, regen: 5, atkPct: -5 }, text: "Second souffle et régénération +5 %, mais −5 % d’attaque." } },
];

const UNIT = 34; // espacement (unités de dessin)

function build() {
  const nodes = {}, edges = [];
  const add = (id, x, y, kind, data) => { nodes[id] = { id, x: Math.round(x), y: Math.round(y), kind, links: [], ...data }; return id; };
  const link = (a, b) => { nodes[a].links.push(b); nodes[b].links.push(a); edges.push([a, b]); };
  const polar = (angle, r) => [Math.cos(angle) * r * UNIT, Math.sin(angle) * r * UNIT];
  add("root", 0, 0, "root", { name: "Origine", eff: {}, sector: null });

  const armNodes = {}; // pour les passerelles : armNodes[secteur][bras][rayon]
  SECTORS.forEach((sec, si) => {
    const base = -Math.PI / 2 + si * (Math.PI * 2 / SECTORS.length);
    let small = 0;
    const smallEff = () => sec.small[small++ % sec.small.length];
    // Chaîne d'entrée
    let prev = "root";
    for (let r = 1; r <= 3; r++) {
      const id = add(`${sec.id}-c${r}`, ...polar(base, r * 1.15), "small", { sector: sec.id, eff: smallEff() });
      link(prev, id); prev = id;
    }
    const trunk = prev;
    armNodes[sec.id] = [];
    const ends = [];
    [-1, 1].forEach((side, ai) => {
      const spread = 0.2;
      let p = trunk, notable = 0;
      armNodes[sec.id][ai] = {};
      const pattern = ["s", "s", "s", "s", "s", "n", "s", "s", "s", "n"];
      pattern.forEach((kind, k) => {
        const r = 4 + k * 0.95;
        const ang = base + side * spread * (1 + Math.sin((k / (pattern.length - 1)) * Math.PI) * 0.9);
        const id = `${sec.id}-a${ai}-${k}`;
        if (kind === "n") {
          const n = sec.notables[ai * 2 + notable++];
          add(id, ...polar(ang, r), "notable", { sector: sec.id, name: n.name, eff: n.eff });
        } else add(id, ...polar(ang, r), "small", { sector: sec.id, eff: smallEff() });
        link(p, id); p = id;
        armNodes[sec.id][ai][k] = id;
      });
      ends.push(p);
    });
    const ks = add(`${sec.id}-key`, ...polar(base, 14.2), "keystone", { sector: sec.id, name: sec.keystone.name, eff: sec.keystone.eff, text: sec.keystone.text });
    ends.forEach((e) => link(e, ks));
  });
  // Passerelles entre secteurs voisins (au milieu et vers l'extérieur des bras)
  SECTORS.forEach((sec, si) => {
    const next = SECTORS[(si + 1) % SECTORS.length];
    for (const k of [2, 7]) link(armNodes[sec.id][1][k], armNodes[next.id][0][k]);
  });
  return { nodes, edges };
}

export const SKILL_TREE = build();
export const SKILL_NODE_COUNT = Object.keys(SKILL_TREE.nodes).length - 1; // hors origine

/** Points de compétence : 1 tous les 2 niveaux + points permanents d'ascension. */
export const skillPointsTotal = (S) => Math.floor(S.lvl / 2) + ((S.prestige && S.prestige.skillPts) || 0) + (prestigeEffects(S).skillPts || 0);
/** Points permanents gagnés par une ascension depuis ce record. */
export const ascensionSkillPoints = (best) => Math.max(0, Math.floor((best - 10) / 3));

const order = (S) => (S.skills && S.skills.order) || [];
/** Nœuds actifs : les N premiers du chemin choisi (N = points disponibles). */
export function activeSkillSet(S) {
  const set = new Set(["root"]);
  for (const id of order(S).slice(0, skillPointsTotal(S))) set.add(id);
  return set;
}
export const skillPointsFree = (S) => Math.max(0, skillPointsTotal(S) - order(S).length);

/** Un nœud peut-il être ajouté au chemin ? (relié à un nœud déjà choisi) */
/** (it. 1015) Points libres ET au moins un nœud prenable : l'arbre entièrement pris (fin de partie), les points qui
    continuent d'arriver ne servent à rien ; la tâche « points de compétence », l'astuce et la pastille de l'onglet
    restaient affichées pour toujours (partie de fin de partie : 362 points, 144 nœuds sur 144). */
export function skillSpendable(S) {
  return skillPointsFree(S) > 0 && Object.keys(SKILL_TREE.nodes).some((id) => canTakeSkill(S, id));
}
export function canTakeSkill(S, id) {
  const n = SKILL_TREE.nodes[id];
  if (!n || id === "root" || order(S).includes(id)) return false;
  if (skillPointsFree(S) <= 0) return false;
  const chosen = new Set(["root", ...order(S)]);
  return n.links.some((l) => chosen.has(l));
}

/**
 * Cœurs de pétale : quand TOUS les nœuds d'un secteur sont actifs, son cœur
 * s'allume : un bonus puissant, une aura autour du héros et un feu follet de
 * la couleur du secteur qui tourne autour de lui.
 */
export const SECTOR_CORES = {
  force:    { name: "Cœur de la Force",    eff: { atkPct: 25, bossDmg: 25 } },
  agility:  { name: "Cœur de l’Agilité",   eff: { spd: 20, dodge: 8, moveSpd: 8 } },
  arcane:   { name: "Cœur des Arcanes",    eff: { burn: 30, minion: 30, poison: 5 } },
  vitality: { name: "Cœur de la Vitalité", eff: { hpPct: 30, regen: 8, shield: 10 } },
  fortune:  { name: "Cœur de la Fortune",  eff: { gold: 50, drop: 20, xp: 15 } },
  mastery:  { name: "Cœur de la Maîtrise", eff: { combo: 4, riposte: 10, critDmg: 25 } },
};
const SECTOR_NODES = {};
for (const id in SKILL_TREE.nodes) { const s = SKILL_TREE.nodes[id].sector; if (s) (SECTOR_NODES[s] ||= []).push(id); }
export const sectorProgress = (S, sec, active = activeSkillSet(S)) => ({ done: SECTOR_NODES[sec].filter((id) => active.has(id)).length, total: SECTOR_NODES[sec].length });
/** Secteurs entièrement acquis (dans l'ordre de SECTORS). */
export function completedSectors(S) {
  const active = activeSkillSet(S);
  return SECTORS.map((s) => s.id).filter((id) => SECTOR_NODES[id].every((n) => active.has(n)));
}

export function skillTreeEffects(S) {
  const out = {};
  for (const id of activeSkillSet(S)) {
    const eff = SKILL_TREE.nodes[id].eff;
    for (const k in eff) out[k] = (out[k] || 0) + eff[k];
  }
  for (const sec of completedSectors(S)) for (const k in SECTOR_CORES[sec].eff) out[k] = (out[k] || 0) + SECTOR_CORES[sec].eff[k];
  return out;
}
