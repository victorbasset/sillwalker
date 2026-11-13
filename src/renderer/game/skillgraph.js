// Grand graphe de compétences (demande D de Victor, it. 1075) : AUTOUR de la fleur (skilltree.js), grisé tant que la
// fleur n'est pas entièrement acquise. Il sert les points de compétence en surplus et propose de vrais choix :
//
//  - 6 régions, une par pétale, dans le prolongement de sa clé de voûte (une porte relie la clé à la région) ;
//  - dans chaque région, 3 VOIES exclusives (on n'en suit qu'une : prendre le premier nœud d'une voie ferme les deux
//    autres), de 30 nœuds chacune, avec 3 nœuds remarquables et une clé de voie au bout ;
//  - la 3e voie de chaque région est une voie de SYNERGIE (précision de Victor) : elle fait compter un axe dans un autre
//    (« si je suis tanky, je tape plus fort », « plus je suis riche, plus je fais mal ») ;
//  - un anneau extérieur relie le bout des voies d'une région à l'autre, avec un pont entre pétales voisins et une
//    grande couronne par région.
//
// Points : ceux qui restent une fois la fleur entière payée (1 par nœud). Les nœuds choisis (S.skills.outer, dans
// l'ordre) sont gardés à l'ascension, comme ceux de la fleur : ils se réactivent dès que la fleur est de nouveau
// complète, dans la limite des points. Effets ordinaires (talents.js > EFFECTS) et effets de synergie (syn*, appliqués
// dans heroStats, rules.js). Affichage : ui/tabs/skills.js (étape D2) ; équilibrage : étape D5.
import { SKILL_TREE, SKILL_NODE_COUNT, SECTORS, skillPointsTotal } from "./skilltree.js";

// Effets de synergie (syn*) : libellés dans talents.js (EFFECTS), calcul dans synergyEffects ci-dessous.

/** Les trois voies de chaque région (ordre de SECTORS). small : effets des petits nœuds (en boucle) ; notables : 3 ;
 *  end : clé de voie. La 3e voie de chaque région est celle de synergie. */
export const REGIONS = {
  force: [
    { name: "Voie du bourreau", small: [{ atkPct: 2 }, { critDmg: 4 }], notables: [{ name: "Hache du bourreau", eff: { atkPct: 8 } }, { name: "Sentence", eff: { execute: 12 } }, { name: "Coup d’estoc", eff: { critDmg: 20 } }], end: { name: "Exécuteur", eff: { atkPct: 25, execute: 20 } } },
    { name: "Voie du chasseur de géants", small: [{ bossDmg: 3 }, { atkPct: 1 }], notables: [{ name: "Briseur de remparts", eff: { bossDmg: 15 } }, { name: "Pas du géant", eff: { atkPct: 6, hpPct: 4 } }, { name: "Dernier rempart", eff: { bossDmg: 20 } }], end: { name: "Tueur de titans", eff: { bossDmg: 50 } } },
    { name: "Voie du sang guerrier", small: [{ atkPct: 1.5 }, { hpPct: 1.5 }], notables: [{ name: "Corps aguerri", eff: { synAtkHp: 2 } }, { name: "Force vive", eff: { atkPct: 6 } }, { name: "Muscles d’acier", eff: { synAtkHp: 3 } }], end: { name: "Sang du guerrier", eff: { synAtkHp: 5, atkPct: 10 } } },
  ],
  agility: [
    { name: "Voie du vent", small: [{ spd: 2 }, { moveSpd: 2 }], notables: [{ name: "Bourrasque", eff: { spd: 8 } }, { name: "Pieds ailés", eff: { moveSpd: 10 } }, { name: "Cyclone", eff: { spd: 10 } }], end: { name: "Ouragan", eff: { spd: 25 } } },
    { name: "Voie de l’ombre", small: [{ dodge: 0.6 }, { crit: 0.6 }], notables: [{ name: "Silhouette", eff: { dodge: 3 } }, { name: "Œil de lynx", eff: { crit: 3 } }, { name: "Insaisissable", eff: { dodge: 4 } }], end: { name: "Fantôme", eff: { dodge: 6, crit: 6 } } },
    { name: "Voie de la lame vive", small: [{ spd: 1.5 }, { critDmg: 3 }], notables: [{ name: "Lame rapide", eff: { synSpdCrit: 2 } }, { name: "Tranchant", eff: { critDmg: 12 } }, { name: "Mille coupures", eff: { synSpdCrit: 3 } }], end: { name: "Tempête tranchante", eff: { synSpdCrit: 5, spd: 10 } } },
  ],
  arcane: [
    { name: "Voie du brasier", small: [{ burn: 3 }, { atkPct: 1 }], notables: [{ name: "Cendres", eff: { burn: 15 } }, { name: "Fournaise", eff: { burn: 15 } }, { name: "Âme ardente", eff: { burn: 20, atkPct: 4 } }], end: { name: "Incendie", eff: { burn: 60 } } },
    { name: "Voie des serviteurs", small: [{ minion: 3 }, { poison: 0.6 }], notables: [{ name: "Familier d’ombre", eff: { minion: 15 } }, { name: "Crocs venimeux", eff: { poison: 4 } }, { name: "Légion", eff: { minion: 20 } }], end: { name: "Nécromant", eff: { minion: 50, poison: 6 } } },
    { name: "Voie de l’étincelle", small: [{ burn: 2 }, { crit: 0.5 }], notables: [{ name: "Étincelle", eff: { synCritBurn: 1 } }, { name: "Œil du mage", eff: { crit: 3 } }, { name: "Feu précis", eff: { synCritBurn: 1.5 } }], end: { name: "Brasier critique", eff: { synCritBurn: 2.5, crit: 4 } } },
  ],
  vitality: [
    { name: "Voie du rempart", small: [{ hpPct: 2 }, { defPct: 2 }], notables: [{ name: "Muraille", eff: { defPct: 12 } }, { name: "Cœur solide", eff: { hpPct: 10 } }, { name: "Égide", eff: { shield: 8 } }], end: { name: "Forteresse", eff: { hpPct: 25, defPct: 20, shield: 10 } } },
    { name: "Voie de la sève", small: [{ regen: 0.6 }, { lifesteal: 0.3 }], notables: [{ name: "Sève vive", eff: { regen: 3 } }, { name: "Soif", eff: { lifesteal: 2 } }, { name: "Racines", eff: { regen: 4, thorns: 8 } }], end: { name: "Arbre-monde", eff: { regen: 8, lifesteal: 4 } } },
    { name: "Voie du colosse furieux", small: [{ hpPct: 1.5 }, { atkPct: 1 }], notables: [{ name: "Corpulence", eff: { synHpAtk: 2 } }, { name: "Carrure", eff: { hpPct: 8 } }, { name: "Poids du monde", eff: { synHpAtk: 3 } }], end: { name: "Colosse furieux", eff: { synHpAtk: 5, hpPct: 10 } } },
  ],
  fortune: [
    { name: "Voie du trésor", small: [{ gold: 4 }, { drop: 2 }], notables: [{ name: "Bourse pleine", eff: { gold: 20 } }, { name: "Flair", eff: { drop: 12 } }, { name: "Coffre-fort", eff: { gold: 25 } }], end: { name: "Roi de l’or", eff: { gold: 80, drop: 15 } } },
    { name: "Voie du savoir", small: [{ xp: 4 }, { offline: 2 }], notables: [{ name: "Bibliothèque", eff: { xp: 20 } }, { name: "Songes", eff: { offline: 12 } }, { name: "Sagesse", eff: { xp: 25 } }], end: { name: "Archiviste", eff: { xp: 60, offline: 15 } } },
    { name: "Voie de l’or tranchant", small: [{ gold: 2 }, { atkPct: 1 }], notables: [{ name: "Pièce aiguisée", eff: { synGoldAtk: 0.4 } }, { name: "Fortune", eff: { gold: 15 } }, { name: "Lame dorée", eff: { synGoldAtk: 0.6 } }], end: { name: "Midas guerrier", eff: { synGoldAtk: 1, gold: 20 } } },
  ],
  mastery: [
    { name: "Voie du contre", small: [{ riposte: 0.8 }, { thorns: 2 }], notables: [{ name: "Parade", eff: { riposte: 5 } }, { name: "Ronces d’acier", eff: { thorns: 12 } }, { name: "Riposte parfaite", eff: { riposte: 6 } }], end: { name: "Maître d’armes", eff: { riposte: 12, thorns: 20 } } },
    { name: "Voie du rythme", small: [{ combo: 0.3 }, { firstStrike: 0.08 }], notables: [{ name: "Cadence", eff: { combo: 1.5 } }, { name: "Ouverture", eff: { firstStrike: 0.6 } }, { name: "Crescendo", eff: { combo: 2 } }], end: { name: "Virtuose", eff: { combo: 4, firstStrike: 1 } } },
    { name: "Voie de la danse mortelle", small: [{ dodge: 0.5 }, { atkPct: 1 }], notables: [{ name: "Pas de côté", eff: { synDodgeAtk: 0.6 } }, { name: "Esquive", eff: { dodge: 3 } }, { name: "Danse mortelle", eff: { synDodgeAtk: 1 } }], end: { name: "Ombre dansante", eff: { synDodgeAtk: 1.5, dodge: 4 } } },
  ],
};

/** Ponts de l'anneau entre deux pétales voisins (SECTORS[i] et SECTORS[i + 1]) et couronnes des régions. */
const BRIDGES = [
  { name: "Élan furieux", eff: { atkPct: 10, spd: 10 } },          // force · agilité
  { name: "Vif-argent", eff: { spd: 10, burn: 20 } },               // agilité · arcanes
  { name: "Sang maudit", eff: { poison: 4, hpPct: 10 } },           // arcanes · vitalité
  { name: "Rente du gardien", eff: { hpPct: 10, gold: 25 } },       // vitalité · fortune
  { name: "Leçon payée", eff: { gold: 25, combo: 2 } },             // fortune · maîtrise
  { name: "Discipline", eff: { combo: 2, atkPct: 10 } },            // maîtrise · force
];
const CROWNS = {
  force: { name: "Couronne de la Force", eff: { atkPct: 30 } },
  agility: { name: "Couronne de l’Agilité", eff: { spd: 20, crit: 5 } },
  arcane: { name: "Couronne des Arcanes", eff: { burn: 50, minion: 30 } },
  vitality: { name: "Couronne de la Vitalité", eff: { hpPct: 30, defPct: 20 } },
  fortune: { name: "Couronne de la Fortune", eff: { gold: 60, xp: 30 } },
  mastery: { name: "Couronne de la Maîtrise", eff: { combo: 3, riposte: 8 } },
};

const UNIT = 34;                // même échelle que la fleur
const BRANCH_LEN = 30;          // nœuds par voie
const NOTABLE_AT = [7, 15, 23]; // positions des remarquables (la clé de voie est le dernier)
const RING_PER = 12;            // nœuds d'anneau par région

function build() {
  const nodes = {}, edges = [];
  const add = (id, x, y, kind, data) => { nodes[id] = { id, x: Math.round(x), y: Math.round(y), kind, links: [], ...data }; return id; };
  const link = (a, b) => { nodes[a].links.push(b); nodes[b].links.push(a); edges.push([a, b]); };
  const polar = (angle, r) => [Math.cos(angle) * r * UNIT, Math.sin(angle) * r * UNIT];
  const n6 = SECTORS.length, ringR = 36.5, ring = [], toFlower = [];
  SECTORS.forEach((sec, si) => {
    const base = -Math.PI / 2 + si * (Math.PI * 2 / n6);
    const gate = add(`${sec.id}-gate`, ...polar(base, 16.4), "gate", { region: sec.id, name: "Porte", eff: { [Object.keys(sec.small[0])[0]]: 2 * Object.values(sec.small[0])[0] } });
    // la porte s'ouvre depuis la clé de voûte du pétale (nœud de la fleur : lien d'un seul côté, trait à part pour le dessin)
    nodes[gate].links.push(`${sec.id}-key`); toFlower.push([`${sec.id}-key`, gate]);
    REGIONS[sec.id].forEach((br, bi) => {
      const ang0 = base + (bi - 1) * 0.3;
      let p = gate, notable = 0;
      for (let k = 0; k < BRANCH_LEN; k++) {
        const r = 17.6 + k * 0.58;
        // les voies s'écartent puis se resserrent un peu vers l'anneau
        const ang = ang0 + (bi - 1) * 0.06 * Math.sin((k / BRANCH_LEN) * Math.PI);
        const id = `${sec.id}-v${bi}-${k}`, data = { region: sec.id, branch: bi };
        if (k === BRANCH_LEN - 1) add(id, ...polar(ang, r), "voiekey", { ...data, name: br.end.name, eff: br.end.eff });
        else if (NOTABLE_AT.includes(k)) { const n = br.notables[notable++]; add(id, ...polar(ang, r), "notable", { ...data, name: n.name, eff: n.eff }); }
        else add(id, ...polar(ang, r), "small", { ...data, eff: br.small[k % br.small.length] });
        if (k === 0) nodes[id].group = `${sec.id}-voie`; // premier nœud : choix de la voie (exclusif)
        link(p, id); p = id;
      }
    });
    // Anneau : de l'angle de cette région à la suivante ; couronne au droit de la région, pont au milieu
    for (let j = 0; j < RING_PER; j++) {
      const ang = base + (j / RING_PER) * (Math.PI * 2 / n6), id = `${sec.id}-r${j}`;
      if (j === 0) add(id, ...polar(ang, ringR), "crown", { region: sec.id, ring: true, name: CROWNS[sec.id].name, eff: CROWNS[sec.id].eff });
      else if (j === RING_PER / 2) add(id, ...polar(ang, ringR), "notable", { region: sec.id, ring: true, name: BRIDGES[si].name, eff: BRIDGES[si].eff });
      else add(id, ...polar(ang, ringR), "small", { region: sec.id, ring: true, eff: j % 2 ? { atkPct: 1.5 } : { hpPct: 1.5 } });
      ring.push(id);
    }
  });
  ring.forEach((id, i) => link(id, ring[(i + 1) % ring.length]));
  // Le bout de chaque voie rejoint l'anneau : la voie centrale sur la couronne, les autres sur ses voisins
  SECTORS.forEach((sec, si) => {
    const at = si * RING_PER, L = ring.length;
    link(`${sec.id}-v1-${BRANCH_LEN - 1}`, ring[at]);
    link(`${sec.id}-v0-${BRANCH_LEN - 1}`, ring[(at - 1 + L) % L]);
    link(`${sec.id}-v2-${BRANCH_LEN - 1}`, ring[(at + 1) % L]);
  });
  return { nodes, edges, toFlower };
}

export const SKILL_GRAPH = build();
export const SKILL_GRAPH_COUNT = Object.keys(SKILL_GRAPH.nodes).length;

const outer = (S) => (S.skills && S.skills.outer) || [];
const flowerOrder = (S) => (S.skills && S.skills.order) || [];

/** La fleur est-elle entièrement acquise (et active) ? Condition d'ouverture du grand graphe. */
export const flowerComplete = (S) => flowerOrder(S).length >= SKILL_NODE_COUNT && skillPointsTotal(S) >= SKILL_NODE_COUNT;

/** Points disponibles pour le grand graphe : au-delà de la fleur entière. */
export const graphPointsTotal = (S) => flowerComplete(S) ? Math.max(0, skillPointsTotal(S) - SKILL_NODE_COUNT) : 0;
export const graphPointsFree = (S) => Math.max(0, graphPointsTotal(S) - outer(S).length);

/** Nœuds actifs du grand graphe : les N premiers choisis (N = points disponibles), comme pour la fleur. */
export function activeGraphSet(S) {
  return new Set(outer(S).slice(0, graphPointsTotal(S)));
}

/** Voie déjà choisie dans une région (indice), ou -1. */
export function chosenBranch(S, region) {
  for (const id of outer(S)) { const n = SKILL_GRAPH.nodes[id]; if (n && n.region === region && n.branch != null) return n.branch; }
  return -1;
}

/** Un nœud peut-il être pris ? Relié à un nœud déjà acquis (fleur entière ou grand graphe), point libre, et pas dans
 *  une voie fermée par le choix d'une autre voie de la même région. */
export function canTakeGraph(S, id) {
  const n = SKILL_GRAPH.nodes[id];
  if (!n || outer(S).includes(id) || graphPointsFree(S) <= 0) return false;
  if (n.branch != null) { const c = chosenBranch(S, n.region); if (c >= 0 && c !== n.branch) return false; }
  const chosen = new Set(outer(S));
  return n.links.some((l) => chosen.has(l) || (SKILL_TREE.nodes[l] && l.endsWith("-key")));
}

/** Prendre un nœud du grand graphe (Game.takeGraph). */
export function takeGraphNode(S, id) {
  if (!canTakeGraph(S, id)) return false;
  (S.skills.outer ||= []).push(id);
  return true;
}

/** (it. 1078) Échelle de tous les effets du graphe (équilibre ; partie de fin de partie, graphe complet : à 1, puissance
 *  ×126, une soixantaine de zones ; à 0,3, attaque ×2,3, PV ×1,4, puissance ×6,1, ≈ 23 zones). Les valeurs écrites dans
 *  REGIONS restent lisibles ; l'échelle s'applique ici. */
export const GRAPH_SCALE = 0.3;

/** Effets du grand graphe (effets ordinaires et syn*). */
export function skillGraphEffects(S) {
  const out = {};
  for (const id of activeGraphSet(S)) {
    const eff = SKILL_GRAPH.nodes[id]?.eff || {};
    for (const k in eff) out[k] = (out[k] || 0) + eff[k] * GRAPH_SCALE;
  }
  return out;
}

/**
 * (it. 1078) Étage du grand graphe, appliqué À PART dans heroStats (rules.js) : attaque, PV et défense du graphe
 * MULTIPLIENT le résultat (en fin de partie, les autres sources totalisent des milliers de % : un +1 % additif ne
 * valait rien, +0,007 % pour 5 nœuds). Les synergies suivent le DOUBLEMENT des PV / de l'attaque (log2 du multiplicateur
 * total, sinon les bonus énormes de fin de partie les emballaient), la puissance de 10 de l'or, l'esquive, la vitesse
 * et les critiques (plafonnées par le jeu). ge : effets du graphe ; t : totaux des autres sources ; gold : or possédé.
 * Renvoie { atk, hp, def } (% multiplicatifs) et { critDmg, burn } (% additifs).
 */
export function graphLayer(ge, t, gold) {
  const v = (o, k) => o[k] || 0;
  const hpRatio = (1 + Math.max(0, v(t, "hpPct")) / 100) * (1 + v(ge, "hpPct") / 100);
  const atkRatio = (1 + Math.max(0, v(t, "atkPct")) / 100) * (1 + v(ge, "atkPct") / 100);
  return {
    atk: v(ge, "atkPct") + v(ge, "synHpAtk") * Math.log2(hpRatio) + v(ge, "synGoldAtk") * Math.log10(1 + Math.max(0, gold || 0))
      + v(ge, "synDodgeAtk") * Math.min(40, Math.max(0, v(t, "dodge") + v(ge, "dodge"))),
    hp: v(ge, "hpPct") + v(ge, "synAtkHp") * Math.log2(atkRatio),
    def: v(ge, "defPct"),
    critDmg: v(ge, "synSpdCrit") * Math.min(300, Math.max(0, v(t, "spd") + v(ge, "spd"))) / 10,
    burn: v(ge, "synCritBurn") * Math.min(75, Math.max(0, 5 + v(t, "crit") + v(ge, "crit"))),
  };
}
/** Clés du graphe traitées par graphLayer (les autres s'ajoutent aux totaux comme partout). */
export const GRAPH_LAYER_KEYS = new Set(["atkPct", "hpPct", "defPct", "synHpAtk", "synGoldAtk", "synAtkHp", "synSpdCrit", "synCritBurn", "synDodgeAtk"]);

/** Voie suivie par défaut quand le joueur laisse le jeu dépenser (et dans simulate.js) : la plus utile au combat. */
export const DEFAULT_BRANCH = { force: 0, agility: 2, arcane: 2, vitality: 2, fortune: 2, mastery: 2 };

/** Prochain nœud à prendre automatiquement : dans la voie déjà choisie (sinon la voie par défaut), grands nœuds
 *  d'abord, puis le plus proche de la fleur. null s'il n'y en a plus. */
export function nextGraphNode(S) {
  const N = SKILL_GRAPH.nodes;
  const ok = Object.keys(N).filter((id) => {
    if (!canTakeGraph(S, id)) return false;
    const n = N[id];
    if (n.group) { const c = chosenBranch(S, n.region); return c >= 0 ? c === n.branch : n.branch === DEFAULT_BRANCH[n.region]; }
    return true;
  });
  if (!ok.length) return null;
  const w = (n) => ({ voiekey: -3, crown: -3, notable: -2, gate: -1 }[n.kind] || 0) * 400 + Math.hypot(n.x, n.y);
  return ok.sort((a, b) => w(N[a]) - w(N[b]))[0];
}
