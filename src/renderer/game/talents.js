// Arbres de talents : un par classe, 3 branches de 4 paliers.
// Un point par niveau (niveau 1 = 0 point). Chaque classe garde sa propre
// répartition : changer de classe ne fait rien perdre.
// Palier t d'une branche : demande TIER_REQ[t] points déjà dépensés dans
// cette branche. Le palier 3 est un talent « ultime » à 1 rang, qui demande
// d'avoir rempli toute la branche (10 + 5 + 5).
import { classDef } from "./classes.js";
import { prestigeEffects } from "./prestige.js";

export const TIER_REQ = [0, 5, 10, 20];

/** Effets possibles (clé -> libellé + unité). Valeurs additionnées. */
export const EFFECTS = {
  atkPct:      { label: "attaque", unit: "%" },
  hpPct:       { label: "points de vie", unit: "%" },
  defPct:      { label: "défense", unit: "%" },
  crit:        { label: "chances de critique", unit: " pts" },
  critDmg:     { label: "dégâts critiques", unit: "%" },
  spd:         { label: "vitesse d’attaque", unit: "%" },
  gold:        { label: "or trouvé", unit: "%" },
  xp:          { label: "expérience", unit: "%" },
  drop:        { label: "chances de butin", unit: "%" },
  bossDmg:     { label: "dégâts contre les boss", unit: "%" },
  execute:     { label: "dégâts contre les cibles sous 30 % de vie", unit: "%" },
  regen:       { label: "régénération en marchant (PV max / s)", unit: "%" },
  lifesteal:   { label: "vol de vie", unit: "%" },
  dodge:       { label: "chances d’esquive", unit: "%" },
  riposte:     { label: "chances de riposte", unit: "%" },
  doubleShot:  { label: "chances de frappe double", unit: "%" },
  shield:      { label: "bouclier au début du combat (PV max)", unit: "%" },
  poison:      { label: "poison par charge (attaque / s)", unit: "%" },
  minion:      { label: "dégâts du serviteur (attaque / s)", unit: "%" },
  combo:       { label: "enchaînement (dégâts par coup, 10 coups max)", unit: "%" },
  thorns:      { label: "épines (dégâts renvoyés)", unit: "%" },
  iai:         { label: "iaijutsu (dégâts du 4e coup, toujours critique)", unit: "%" },
  moveSpd:     { label: "vitesse de déplacement", unit: "%" },
  burn:        { label: "brûlure (attaque / s pendant 3 s)", unit: "%" },
  firstStrike: { label: "dégâts du premier coup", unit: "×", scale: 100 },
  offline:     { label: "efficacité hors ligne", unit: "%" },
  secondWind:  { label: "second souffle", unit: "" },
};

const T = (id, name, tier, max, eff, text) => ({ id, name, tier, max, eff, text });

export const TREES = {
  berserker: [
    { name: "Carnage", talents: [
      T("be_axe", "Hache lourde", 0, 10, { atkPct: 3 }),
      T("be_cleave", "Fendoir", 1, 5, { critDmg: 12 }),
      T("be_finish", "Achever", 2, 5, { execute: 12 }),
      T("be_butcher", "Boucher des champs", 3, 1, { execute: 60, bossDmg: 20 }, "Ultime : +60 % de dégâts contre les cibles affaiblies et +20 % contre les boss."),
    ] },
    { name: "Sang", talents: [
      T("be_thick", "Peau épaisse", 0, 10, { hpPct: 4 }),
      T("be_drink", "Boire le sang", 1, 5, { lifesteal: 1.5 }),
      T("be_scars", "Cicatrices", 2, 5, { thorns: 8 }),
      T("be_undying", "Rage immortelle", 3, 1, { secondWind: 1, lifesteal: 5 }, "Ultime : second souffle et +5 % de vol de vie."),
    ] },
    { name: "Frénésie", talents: [
      T("be_wild", "Sauvagerie", 0, 10, { spd: 3 }),
      T("be_howl", "Hurlement", 1, 5, { firstStrike: 0.4 }),
      T("be_storm", "Tourbillon", 2, 5, { doubleShot: 6 }),
      T("be_frenzy", "Frénésie sanglante", 3, 1, { combo: 3, spd: 25 }, "Ultime : enchaînement +3 % par coup et +25 % de vitesse d’attaque."),
    ] },
  ],
  samurai: [
    { name: "Lame", talents: [
      T("sa_edge", "Fil du sabre", 0, 10, { atkPct: 3 }),
      T("sa_clean", "Coupe nette", 1, 5, { critDmg: 12 }),
      T("sa_rock", "Tranche-roc", 2, 5, { bossDmg: 10 }),
      T("sa_heaven", "Lame céleste", 3, 1, { iai: 80, critDmg: 30 }, "Ultime : iaijutsu +80 % et +30 % de dégâts critiques."),
    ] },
    { name: "Bushido", talents: [
      T("sa_disc", "Discipline", 0, 10, { hpPct: 4 }),
      T("sa_parry", "Parade", 1, 5, { dodge: 3 }),
      T("sa_honor", "Honneur", 2, 5, { riposte: 6 }),
      T("sa_last", "Dernier samouraï", 3, 1, { secondWind: 1, defPct: 25 }, "Ultime : second souffle et +25 % de défense."),
    ] },
    { name: "Voie du vent", talents: [
      T("sa_light", "Pas léger", 0, 10, { spd: 3 }),
      T("sa_draw", "Dégainé", 1, 5, { firstStrike: 0.4 }),
      T("sa_twin", "Double coupe", 2, 5, { doubleShot: 6 }),
      T("sa_storm", "Tempête d’acier", 3, 1, { iai: 40, spd: 20 }, "Ultime : iaijutsu +40 % et +20 % de vitesse d’attaque."),
    ] },
  ],
  paladin: [
    { name: "Lumière", talents: [
      T("pa_fervor", "Ferveur", 0, 10, { atkPct: 3 }),
      T("pa_judge", "Jugement", 1, 5, { bossDmg: 10 }),
      T("pa_smite", "Châtiment", 2, 5, { execute: 10 }),
      T("pa_wrath", "Colère divine", 3, 1, { atkPct: 20, critDmg: 30 }, "Ultime : +20 % d’attaque et +30 % de dégâts critiques."),
    ] },
    { name: "Bastion", talents: [
      T("pa_faith", "Foi", 0, 10, { hpPct: 4 }),
      T("pa_aegis", "Égide", 1, 5, { shield: 4 }),
      T("pa_rampart", "Rempart", 2, 5, { defPct: 8 }),
      T("pa_martyr", "Martyr", 3, 1, { secondWind: 1, shield: 20 }, "Ultime : second souffle et bouclier +20 %."),
    ] },
    { name: "Grâce", talents: [
      T("pa_prayer", "Prière", 0, 10, { regen: 1 }),
      T("pa_bless", "Bénédiction", 1, 5, { xp: 5 }),
      T("pa_hands", "Imposition des mains", 2, 5, { lifesteal: 2 }),
      T("pa_aura", "Aura sacrée", 3, 1, { thorns: 25, regen: 5 }, "Ultime : renvoie 25 % des dégâts reçus, régénération +5 %."),
    ] },
  ],
  assassin: [
    { name: "Lames", talents: [
      T("as_hone", "Affûtage", 0, 10, { atkPct: 3 }),
      T("as_low", "Coup bas", 1, 5, { critDmg: 15 }),
      T("as_exec", "Exécution", 2, 5, { execute: 15 }),
      T("as_silent", "Mort silencieuse", 3, 1, { crit: 15, critDmg: 60 }, "Ultime : +15 pts de critique et +60 % de dégâts critiques."),
    ] },
    { name: "Venin", talents: [
      T("as_tox", "Toxines", 0, 10, { poison: 2 }),
      T("as_slow", "Venin lent", 1, 5, { bossDmg: 8 }),
      T("as_fever", "Fièvre", 2, 5, { poison: 4 }),
      T("as_plague", "Pandémie", 3, 1, { poison: 25, spd: 10 }, "Ultime : poison +25 % par charge et +10 % de vitesse."),
    ] },
    { name: "Ombre", talents: [
      T("as_soft", "Pas feutrés", 0, 10, { dodge: 1 }),
      T("as_pick", "Vol à la tire", 1, 5, { gold: 6 }),
      T("as_vanish", "Disparition", 2, 5, { firstStrike: 0.5 }),
      T("as_shadow", "Ombre", 3, 1, { dodge: 10, secondWind: 1 }, "Ultime : +10 % d’esquive et second souffle."),
    ] },
  ],
  necro: [
    { name: "Légion", talents: [
      T("ne_bones", "Os renforcés", 0, 10, { minion: 4 }),
      T("ne_horde", "Horde", 1, 5, { minion: 6 }),
      T("ne_command", "Commandement", 2, 5, { bossDmg: 10 }),
      T("ne_lord", "Seigneur des morts", 3, 1, { minion: 60 }, "Ultime : le serviteur inflige +60 % de l’attaque par seconde."),
    ] },
    { name: "Drain", talents: [
      T("ne_siphon", "Siphon", 0, 10, { lifesteal: 0.5 }),
      T("ne_chill", "Toucher glacé", 1, 5, { atkPct: 5 }),
      T("ne_curse", "Malédiction", 2, 5, { execute: 15 }),
      T("ne_reaper", "Faucheuse", 3, 1, { execute: 40, lifesteal: 5 }, "Ultime : +40 % de dégâts sous 30 % de vie, vol de vie +5 %."),
    ] },
    { name: "Pacte", talents: [
      T("ne_ritual", "Rituel", 0, 10, { xp: 4 }),
      T("ne_offer", "Offrande", 1, 5, { drop: 5 }),
      T("ne_night", "Nuit éternelle", 2, 5, { offline: 10 }),
      T("ne_lich", "Liche", 3, 1, { hpPct: 30, secondWind: 1 }, "Ultime : +30 % de PV et second souffle."),
    ] },
  ],
  monk: [
    { name: "Poings", talents: [
      T("mo_iron", "Paumes de fer", 0, 10, { atkPct: 3 }),
      T("mo_flurry", "Rafale", 1, 5, { spd: 4 }),
      T("mo_hundred", "Cent poings", 2, 5, { doubleShot: 5 }),
      T("mo_palm", "Paume vibrante", 3, 1, { combo: 4, critDmg: 40 }, "Ultime : enchaînement +4 % par coup et +40 % de dégâts critiques."),
    ] },
    { name: "Harmonie", talents: [
      T("mo_breath", "Souffle", 0, 10, { regen: 1 }),
      T("mo_flow", "Esquive fluide", 1, 5, { dodge: 3 }),
      T("mo_counter", "Contre", 2, 5, { riposte: 6 }),
      T("mo_nirvana", "Nirvana", 3, 1, { dodge: 10, secondWind: 1 }, "Ultime : +10 % d’esquive et second souffle."),
    ] },
    { name: "Discipline", talents: [
      T("mo_medit", "Méditation", 0, 10, { xp: 4 }),
      T("mo_focus", "Concentration", 1, 5, { combo: 1 }),
      T("mo_diamond", "Corps de diamant", 2, 5, { defPct: 10 }),
      T("mo_awake", "Éveil", 3, 1, { combo: 3, atkPct: 20 }, "Ultime : enchaînement +3 % par coup et +20 % d’attaque."),
    ] },
  ],
  druid: [
    { name: "Ronces", talents: [
      T("dr_bark", "Écorce", 0, 10, { thorns: 3 }),
      T("dr_spiky", "Épineux", 1, 5, { defPct: 6 }),
      T("dr_vines", "Lianes", 2, 5, { bossDmg: 8 }),
      T("dr_oak", "Cœur de chêne", 3, 1, { thorns: 50, hpPct: 20 }, "Ultime : épines +50 % et +20 % de PV."),
    ] },
    { name: "Nature", talents: [
      T("dr_sap", "Sève", 0, 10, { regen: 1 }),
      T("dr_bloom", "Floraison", 1, 5, { hpPct: 5 }),
      T("dr_symb", "Symbiose", 2, 5, { lifesteal: 2 }),
      T("dr_renew", "Renouveau", 3, 1, { secondWind: 1, regen: 6 }, "Ultime : second souffle et régénération +6 %."),
    ] },
    { name: "Sauvage", talents: [
      T("dr_instinct", "Instinct", 0, 10, { atkPct: 3 }),
      T("dr_claws", "Griffes", 1, 5, { crit: 2 }),
      T("dr_pack", "Meute", 2, 5, { minion: 8 }),
      T("dr_spirit", "Esprit animal", 3, 1, { spd: 20, atkPct: 20 }, "Ultime : +20 % de vitesse et +20 % d’attaque."),
    ] },
  ],
  warrior: [
    { name: "Force", talents: [
      T("w_strength", "Bras de fer", 0, 10, { atkPct: 3 }),
      T("w_heavy", "Coups lourds", 1, 5, { critDmg: 10 }),
      T("w_execute", "Coup de grâce", 2, 5, { execute: 10 }),
      T("w_fury", "Fureur", 3, 1, { atkPct: 25, spd: 15 }, "Ultime : +25 % d’attaque et +15 % de vitesse d’attaque."),
    ] },
    { name: "Robustesse", talents: [
      T("w_const", "Constitution", 0, 10, { hpPct: 4 }),
      T("w_iron", "Peau de fer", 1, 5, { defPct: 6 }),
      T("w_counter", "Riposte aiguisée", 2, 5, { riposte: 5 }),
      T("w_stand", "Inébranlable", 3, 1, { secondWind: 1 }, "Ultime : une fois par combat, survit à un coup fatal avec 30 % de ses PV."),
    ] },
    { name: "Conquête", talents: [
      T("w_loot", "Pillard", 0, 10, { gold: 4 }),
      T("w_veteran", "Vétéran", 1, 5, { xp: 4 }),
      T("w_kings", "Tueur de rois", 2, 5, { bossDmg: 8 }),
      T("w_royal", "Butin royal", 3, 1, { drop: 30, gold: 20 }, "Ultime : +30 % de chances de butin et +20 % d’or."),
    ] },
  ],
  ranger: [
    { name: "Précision", talents: [
      T("r_lynx", "Œil de lynx", 0, 10, { crit: 1 }),
      T("r_weak", "Points faibles", 1, 5, { critDmg: 12 }),
      T("r_open", "Tir d’ouverture", 2, 5, { firstStrike: 0.4 }),
      T("r_sniper", "Tireur d’élite", 3, 1, { crit: 10, critDmg: 50 }, "Ultime : +10 pts de critique et +50 % de dégâts critiques."),
    ] },
    { name: "Agilité", talents: [
      T("r_quick", "Doigts agiles", 0, 10, { spd: 3 }),
      T("r_dodge", "Esquive", 1, 5, { dodge: 3 }),
      T("r_double", "Tir double", 2, 5, { doubleShot: 5 }),
      T("r_volley", "Volée", 3, 1, { doubleShot: 15, spd: 15 }, "Ultime : +15 % de tir double et +15 % de vitesse d’attaque."),
    ] },
    { name: "Survie", talents: [
      T("r_endure", "Endurance", 0, 10, { hpPct: 4 }),
      T("r_bandage", "Pansements", 1, 5, { regen: 2 }),
      T("r_predator", "Prédateur", 2, 5, { lifesteal: 2 }),
      T("r_instinct", "Instinct", 3, 1, { secondWind: 1, dodge: 5 }, "Ultime : second souffle (survit une fois par combat à un coup fatal) et +5 % d’esquive."),
    ] },
  ],
  mage: [
    { name: "Feu", talents: [
      T("m_spark", "Étincelle", 0, 10, { burn: 3 }),
      T("m_blaze", "Brasier", 1, 5, { bossDmg: 8 }),
      T("m_scorch", "Calcination", 2, 5, { execute: 12 }),
      T("m_phoenix", "Phénix", 3, 1, { secondWind: 1, burn: 20 }, "Ultime : renaît une fois par combat (30 % de PV) et brûlure +20 %."),
    ] },
    { name: "Arcanes", talents: [
      T("m_power", "Puissance arcanique", 0, 10, { atkPct: 3 }),
      T("m_focus", "Focalisation", 1, 5, { crit: 2 }),
      T("m_surge", "Surcharge", 2, 5, { critDmg: 15 }),
      T("m_arch", "Archimage", 3, 1, { atkPct: 30 }, "Ultime : +30 % d’attaque."),
    ] },
    { name: "Savoir", talents: [
      T("m_lore", "Érudition", 0, 10, { xp: 4 }),
      T("m_transmute", "Transmutation", 1, 5, { gold: 5 }),
      T("m_dream", "Rêverie", 2, 5, { offline: 8 }),
      T("m_shield", "Bouclier de mana", 3, 1, { hpPct: 30, defPct: 30 }, "Ultime : +30 % de PV et +30 % de défense."),
    ] },
  ],
};

/** Index id -> { talent, branch } pour toutes les classes. */
export const TALENT_INDEX = {};
for (const cls in TREES) TREES[cls].forEach((b, bi) => b.talents.forEach((t) => { TALENT_INDEX[t.id] = { talent: t, branch: bi, cls }; }));

/** 1 point par niveau, plus les points offerts par la constellation de l'Arbre. */
export const talentPointsTotal = (S) => Math.max(0, S.lvl - 1) + (prestigeEffects(S).talentPts || 0);
export const classTalents = (S) => (S.talents[S.cls] ||= {});
export function talentPointsSpent(S, cls = S.cls) {
  const r = S.talents[cls] || {};
  return Object.values(r).reduce((a, b) => a + b, 0);
}
export const talentPointsFree = (S) => talentPointsTotal(S) - talentPointsSpent(S);
export function branchSpent(S, branch, cls = S.cls) {
  const r = S.talents[cls] || {};
  return TREES[cls][branch].talents.reduce((a, t) => a + (r[t.id] || 0), 0);
}

/** Raison pour laquelle on ne peut pas monter ce talent (ou null si possible). */
export function cannotLearn(S, id) {
  const ix = TALENT_INDEX[id];
  if (!ix || ix.cls !== S.cls) return "Talent d’une autre classe";
  const rank = classTalents(S)[id] || 0;
  if (rank >= ix.talent.max) return "Rang maximal atteint";
  const need = TIER_REQ[ix.talent.tier];
  if (branchSpent(S, ix.branch) < need) return `Demande ${need} points dans la branche ${TREES[S.cls][ix.branch].name}`;
  if (talentPointsFree(S) <= 0) return "Aucun point disponible (1 point par niveau)";
  return null;
}

/** Somme des effets : passif de classe + talents de la classe active. */
export function talentEffects(S) {
  const out = {};
  const add = (eff, n = 1) => { for (const k in eff) out[k] = (out[k] || 0) + eff[k] * n; };
  add(classDef(S.cls).passive);
  const ranks = S.talents[S.cls] || {};
  for (const id in ranks) { const ix = TALENT_INDEX[id]; if (ix && ix.cls === S.cls) add(ix.talent.eff, Math.min(ranks[id], ix.talent.max)); }
  return out;
}

/** Description lisible d'un ensemble d'effets (pour l'interface). */
export function describeEffects(eff, n = 1) {
  return Object.entries(eff).map(([k, v]) => {
    const e = EFFECTS[k];
    if (!e) return "";
    if (k === "secondWind") return "second souffle";
    const val = v * n * (e.scale || 1), sign = val < 0 ? "−" : "+";
    const txt = (Math.round(Math.abs(val) * 10) / 10).toString().replace(".", ",");
    return e.unit === "×" ? `${sign}${txt} % ${e.label}` : `${sign}${txt}${e.unit === "%" ? " %" : e.unit} ${e.label}`;
  }).filter(Boolean).join(", ");
}
