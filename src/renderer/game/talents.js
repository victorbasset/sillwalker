// Arbres de talents : un par classe, 3 branches de 4 paliers.
// Un point par niveau (niveau 1 = 0 point). Chaque classe garde sa propre
// répartition : changer de classe ne fait rien perdre.
// Palier t d'une branche : demande TIER_REQ[t] points déjà dépensés dans
// cette branche. Le palier 3 est un talent « ultime » à 1 rang, qui demande
// d'avoir rempli toute la branche (10 + 5 + 5).
import { classDef, CLASSES } from "./classes.js";
import { prestigeEffects } from "./prestige.js";
import { t as tx, txn, csep } from "../i18n/index.js";
import { dec, unit } from "./format.js";

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
  regen:       { label: "des PV max régénérés par seconde en marchant", unit: "%" },
  lifesteal:   { label: "vol de vie", unit: "%" },
  dodge:       { label: "chances d’esquive", unit: "%" },
  riposte:     { label: "chances de riposte", unit: "%" },
  doubleShot:  { label: "chances de frappe double", unit: "%" },
  shield:      { label: "des PV max en bouclier au début du combat", unit: "%" },
  poison:      { label: "de l’attaque en poison par seconde, par charge (une par coup)", unit: "%" },
  minion:      { label: "de l’attaque par seconde pour le serviteur", unit: "%" },
  combo:       { label: "de dégâts par coup d’affilée (10 coups max)", unit: "%" },
  thorns:      { label: "des dégâts reçus renvoyés (épines)", unit: "%" },
  iai:         { label: "de dégâts au 4e coup (iaijutsu, toujours critique)", unit: "%" },
  moveSpd:     { label: "vitesse de déplacement", unit: "%" },
  burn:        { label: "de l’attaque en brûlure par seconde (3 s)", unit: "%" },
  firstStrike: { label: "dégâts du premier coup", unit: "×", scale: 100 },
  tapDmg:      { label: "dégâts des coups au clic", unit: "%" },
  offline:     { label: "efficacité hors ligne", unit: "%" },
  secondWind:  { label: "second souffle", unit: "" },
  elites:      { label: "élites rencontrées", unit: "%" },
  purity:      { label: "de résistance à la Malédiction et au venin des boss (durée réduite)", unit: "%" },
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

/**
 * Voies : à partir de VOIE_REQ points dépensés, chaque classe choisit UNE de
 * ses deux spécialisations (exclusives), qui change sa façon de se battre.
 */
export const VOIE_REQ = 30;
const V = (id, name, text, eff) => ({ id, name, text, eff, max: 1, tier: 4, voie: true });
export const VOIES = {
  warrior:   [V("v_wa_wall", "Voie du rempart", "Encaisser et renvoyer : riposte, épines et défense.", { riposte: 20, thorns: 25, defPct: 20 }),
              V("v_wa_carnage", "Voie du carnage", "Achever vite : énormes dégâts sur les cibles affaiblies.", { execute: 40, critDmg: 30, atkPct: 10 })],
  ranger:    [V("v_ra_sniper", "Tireur d’élite", "La première flèche décide du combat.", { firstStrike: 2, crit: 10 }),
              V("v_ra_rain", "Pluie de flèches", "Tirer, tirer encore : frappes doubles et cadence.", { doubleShot: 25, spd: 15 })],
  mage:      [V("v_ma_pyro", "Pyromancie", "Tout brûle, longtemps et fort.", { burn: 50, atkPct: 10 }),
              V("v_ma_arcane", "Arcaniste", "Des critiques dévastateurs.", { critDmg: 50, crit: 8 })],
  paladin:   [V("v_pa_bastion", "Bastion sacré", "Un bouclier de lumière énorme à chaque combat.", { shield: 30, hpPct: 20 }),
              V("v_pa_crusader", "Croisé", "Le fléau des boss.", { bossDmg: 40, atkPct: 15 })],
  assassin:  [V("v_as_venom", "Venin mortel", "Le poison fait tout le travail.", { poison: 20 }),
              V("v_as_shadow", "Ombre", "Insaisissable, et chaque coup critique fait mal.", { dodge: 15, critDmg: 40 })],
  necro:     [V("v_ne_lord", "Seigneur des morts", "Le serviteur devient la vraie menace.", { minion: 60 }),
              V("v_ne_drain", "Drain de vie", "Se nourrir de ses ennemis.", { lifesteal: 6, regen: 4, atkPct: 10 })],
  monk:      [V("v_mo_fists", "Mille poings", "Des séries encore plus longues et rapides.", { combo: 3, spd: 20 }),
              V("v_mo_serene", "Esprit serein", "Esquiver, tenir, récupérer.", { dodge: 12, hpPct: 20, regen: 3 })],
  druid:     [V("v_dr_thorns", "Ronces", "Frapper le druide, c’est se blesser.", { thorns: 60, defPct: 20 }),
              V("v_dr_pack", "Meute", "L’esprit-loup mène la chasse.", { minion: 40, atkPct: 10 })],
  samurai:   [V("v_sa_iaido", "Iaido", "Un coup sur quatre tranche tout.", { iai: 100 }),
              V("v_sa_kenjutsu", "Kenjutsu", "Deux lames, deux coups.", { doubleShot: 20, crit: 8 })],
  berserker: [V("v_be_blood", "Soif de sang", "Chaque coup soigne, chaque proie affaiblie meurt.", { lifesteal: 6, execute: 30 }),
              V("v_be_rage", "Rage aveugle", "Frapper plus fort et plus vite… en oubliant de se protéger.", { atkPct: 30, spd: 15, defPct: -20 })],
};

/**
 * Maîtrises : rangs illimités, communs à toutes les classes, ouverts à partir de
 * MASTERY_REQ points dépensés. Aucun point n'est jamais perdu.
 */
export const MASTERY_REQ = 40;
export const MASTERIES = [
  { id: "ms_power", name: "Maîtrise : puissance", eff: { atkPct: 1.5 }, max: Infinity, tier: 5, mastery: true },
  { id: "ms_body", name: "Maîtrise : endurance", eff: { hpPct: 2, defPct: 1 }, max: Infinity, tier: 5, mastery: true },
  { id: "ms_fortune", name: "Maîtrise : fortune", eff: { gold: 2, drop: 0.5 }, max: Infinity, tier: 5, mastery: true },
];

// Héros ajoutés par la demande 17 : arbre et voies copiés d'un héros proche (classes.js : tree, treePrefix), avec
// des identifiants préfixés pour que chaque héros garde ses propres rangs. Les noms (déjà traduits) sont les mêmes.
// Noms propres à chaque héros (branches, talents ultimes, puis les 9 autres talents par branche dans l'ordre) :
// mêmes effets que l'arbre d'origine, autre identité.
const TREE_NAMES = {
  arbalest: [["Visée", "Mécanisme", "Embuscade"], ["Carreau perforant", "Rechargement éclair", "Piège du chasseur"], ["Lunette", "Fêlure d’armure", "Premier carreau", "Manivelle huilée", "Pas de côté", "Double détente", "Cuir épais", "Herbes du maquis", "Carreaux barbelés"]],
  lancer: [["Hampe", "Phalange", "Avant-garde"], ["Charge du lancier", "Mur de piques", "Étendard conquérant"], ["Bras de lance", "Pointe aiguisée", "Coup d’estoc", "Cuirasse", "Bouclier rond", "Contre-pique", "Butin de guerre", "Ancien soldat", "Tueur de géants"]],
  priestess: [["Aube", "Sanctuaire", "Bénédiction"], ["Jugement solaire", "Dernière prière", "Aura de l’aube"], ["Zèle", "Sentence", "Rayon purificateur", "Foi inébranlable", "Voile de lumière", "Murs du temple", "Psaume", "Révélation", "Mains guérisseuses"]],
  gladiator: [["Arène", "Bouclier", "Gloire"], ["Coup de grâce", "Endurance du champion", "Faveur de la foule"], ["Biceps de bronze", "Coup de taille", "Mise à mort", "Endurance de l’arène", "Cuir de bœuf", "Contre-attaque", "Pièces du public", "Expérience des jeux", "Tueuse de champions"]],
  shaman: [["Totems", "Esprits", "Meute"], ["Totem d’écorce", "Souffle des ancêtres", "Esprit de la meute"], ["Écorce vive", "Ronces", "Racines", "Sève sacrée", "Bourgeons", "Lien vital", "Hurlement", "Crocs", "Appel de la meute"]],
  bladedancer: [["Tranchants", "Venins", "Voiles"], ["Danse mortelle", "Poison des fleurs", "Pas de l’ombre"], ["Lames effilées", "Coupe tournoyante", "Dernier pas", "Pointes empoisonnées", "Venin rampant", "Fièvre noire", "Pieds légers", "Doigts de fée", "Entrée en scène"]],
  cryomancer: [["Givre", "Glace", "Cristal"], ["Hiver éternel", "Zéro absolu", "Armure de cristal"], ["Morsure du froid", "Pic de glace", "Gel profond", "Puissance glaciale", "Cristaux acérés", "Éclats tranchants", "Savoir des glaces", "Alchimie du froid", "Sommeil hivernal"]],
  bard: [["Rythme", "Mélodie", "Refrain"], ["Crescendo", "Berceuse", "Hymne héroïque"], ["Accords puissants", "Tempo", "Contre-chant", "Souffle long", "Pas de danse", "Réplique", "Ballade du voyageur", "Mesure", "Voix d’airain"]],
  starwarden: [["Étoiles", "Serment", "Constellations"], ["Lame d’étoile filante", "Dernier gardien", "Pluie d’étoiles"], ["Fil d’étoile", "Éclat céleste", "Brise-astres", "Garde stellaire", "Esquive lunaire", "Riposte d’argent", "Pas de comète", "Éclair premier", "Double étoile"]],
  artificer: [["Poudre", "Mécanique", "Blindage"], ["Grande explosion", "Chef-d’œuvre", "Armure d’acier"], ["Mèche", "Charge creuse", "Dernière salve", "Poudre fine", "Viseur", "Surpression", "Notes d’atelier", "Récupération", "Montage nocturne"]],
};
// Voies des héros ajoutés : [nom, description] (mêmes effets que celles du héros d'origine).
const VOIE_NAMES = {
  arbalest: [["Tireuse d’élite", "Le premier carreau décide du combat."], ["Grêle de carreaux", "Tirer, tirer encore : tirs doubles et cadence."]],
  lancer: [["Voie de la phalange", "Tenir la ligne : riposte, épines et défense."], ["Voie de la charge", "Achever vite : énormes dégâts sur les cibles affaiblies."]],
  priestess: [["Voie du sanctuaire", "Un immense bouclier de lumière à chaque combat."], ["Voie du jugement", "La lumière frappe les boss sans pitié."]],
  gladiator: [["Voie du bouclier", "Encaisser et rendre coup pour coup : riposte, épines et défense."], ["Voie de la foule", "Achever sous les vivats : énormes dégâts sur les cibles affaiblies."]],
  shaman: [["Voie de l’écorce", "Frapper le chaman, c’est se blesser."], ["Voie de l’esprit-loup", "L’esprit-loup mène la chasse."]],
  bladedancer: [["Danse venimeuse", "Le poison fait tout le travail."], ["Danse des ombres", "Insaisissable, et chaque coup critique fait mal."]],
  cryomancer: [["Voie du blizzard", "Le froid mord longtemps et fort."], ["Voie du cristal", "Des critiques qui brisent tout."]],
  bard: [["Voie du crescendo", "Des séries encore plus longues et rapides."], ["Voie de la ballade", "Esquiver, tenir, récupérer en chantant."]],
  starwarden: [["Voie de l’étoile filante", "Un coup sur quatre tranche le ciel."], ["Voie des constellations", "Deux lames d’étoile, deux coups."]],
  artificer: [["Voie de la poudre", "Tout brûle, longtemps et fort."], ["Voie de la précision", "Des critiques dévastateurs."]],
};
// Greffes (étude des concurrents : « héros trop semblables ») : chaque héros ajouté remplace une branche de son
// modèle par les effets d'une branche d'un autre héros, plus proche de son thème (valeurs déjà équilibrées, mêmes
// rangs). [branche remplacée, héros source, branche source]. Les noms restent ceux du héros.
const GRAFTS = {
  arbalest: [2, "warrior", 2],     // Survie → Conquête : chasseuse de primes (or, expérience, butin, boss)
  lancer: [1, "samurai", 1],       // Robustesse → Bushido : la phalange (esquive, riposte)
  priestess: [0, "druid", 1],      // Lumière → Nature : soins (régénération, vol de vie)
  gladiator: [2, "berserker", 1],  // Conquête → Sang : l'arène (vol de vie, épines)
  shaman: [2, "necro", 0],         // Sauvage → Légion : les esprits invoqués
  bladedancer: [1, "monk", 0],     // Venin → Poings : la danse (vitesse, coups doubles, combos)
  cryomancer: [0, "ranger", 0],    // Givre → Précision : éclats de glace critiques (plus de brûlure chez la cryomancienne)
  bard: [0, "warrior", 2],         // Rythme → Conquête : la ballade rapporte or et expérience
  starwarden: [1, "paladin", 1],   // Bushido → Bastion : boucliers d'étoile
  artificer: [2, "berserker", 2],  // Savoir → Frénésie : cadence des machines (Arcanes gardées : sa puissance)
};
// Voies mêlées (idée d de l'étude des concurrents : « héros trop semblables ») : chaque voie d'un héros ajouté est la
// moitié de deux voies existantes, choisies pour son thème (valeurs déjà équilibrées : la somme garde le même poids).
// Identifiants inchangés : les sauvegardes gardent la voie choisie.
const VOIE_BLENDS = {
  arbalest:    [["v_ra_sniper", "v_pa_crusader"], ["v_ra_rain", "v_sa_kenjutsu"]],
  lancer:      [["v_wa_wall", "v_pa_bastion"], ["v_wa_carnage", "v_ra_sniper"]],
  priestess:   [["v_pa_bastion", "v_mo_serene"], ["v_pa_crusader", "v_ma_pyro"]],
  gladiator:   [["v_wa_wall", "v_be_blood"], ["v_wa_carnage", "v_be_rage"]],
  shaman:      [["v_dr_thorns", "v_ne_drain"], ["v_dr_pack", "v_ne_lord"]],
  bladedancer: [["v_as_venom", "v_mo_fists"], ["v_as_shadow", "v_sa_kenjutsu"]],
  cryomancer:  [["v_ma_pyro", "v_mo_serene"], ["v_ma_arcane", "v_sa_iaido"]],
  bard:        [["v_mo_fists", "v_ra_rain"], ["v_mo_serene", "v_pa_bastion"]],
  starwarden:  [["v_sa_iaido", "v_pa_crusader"], ["v_sa_kenjutsu", "v_ma_arcane"]],
  artificer:   [["v_ma_pyro", "v_wa_carnage"], ["v_ma_arcane", "v_ra_sniper"]],
};
const BASE_VOIES = Object.fromEntries(Object.values(VOIES).flat().map((v) => [v.id, v]));
function blendEff(a, b) {
  const out = {};
  for (const src of [BASE_VOIES[a], BASE_VOIES[b]]) for (const k in (src && src.eff) || {}) out[k] = (out[k] || 0) + src.eff[k] / 2;
  for (const k in out) out[k] = Math.round(out[k] * 2) / 2;
  return out;
}
for (const [cls, def] of Object.entries(CLASSES)) {
  if (!def.tree || TREES[cls]) continue;
  const p = def.treePrefix, names = TREE_NAMES[cls];
  TREES[cls] = TREES[def.tree].map((b, bi) => ({ ...b, name: names ? names[0][bi] : b.name,
    talents: b.talents.map((t, ti) => ({ ...t, id: p + t.id, name: !names ? t.name : t.tier === 3 ? names[1][bi] : (names[2] && names[2][bi * 3 + ti]) || t.name })) }));
  const g = GRAFTS[cls];
  if (g && TREES[g[1]] && TREES[g[1]][g[2]]) {
    const src = TREES[g[1]][g[2]].talents;
    TREES[cls][g[0]].talents = TREES[cls][g[0]].talents.map((t, ti) => (src[ti] ? { ...t, eff: { ...src[ti].eff }, max: src[ti].max } : t));
  }
  if (VOIES[def.tree]) VOIES[cls] = VOIES[def.tree].map((v, vi) => ({ ...v, id: p + v.id, ...(VOIE_NAMES[cls] ? { name: VOIE_NAMES[cls][vi][0], text: VOIE_NAMES[cls][vi][1] } : {}),
    ...(VOIE_BLENDS[cls] && VOIE_BLENDS[cls][vi] ? { eff: blendEff(...VOIE_BLENDS[cls][vi]) } : {}) }));
}

/** Index id -> { talent, branch, cls } pour toutes les classes (branch : n° de branche, "voie" ou "mastery"). */
export const TALENT_INDEX = {};
for (const cls in TREES) TREES[cls].forEach((b, bi) => b.talents.forEach((t) => { TALENT_INDEX[t.id] = { talent: t, branch: bi, cls }; }));
for (const cls in VOIES) for (const v of VOIES[cls]) TALENT_INDEX[v.id] = { talent: v, branch: "voie", cls };
for (const m of MASTERIES) TALENT_INDEX[m.id] = { talent: m, branch: "mastery", cls: "*" };

/** Voie choisie par la classe active (ou null). */
export const chosenVoie = (S, cls = S.cls) => (VOIES[cls] || []).find((v) => (S.talents[cls] || {})[v.id] > 0) || null;

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
  if (!ix || (ix.cls !== S.cls && ix.cls !== "*")) return tx("Talent d’un autre héros");
  const rank = classTalents(S)[id] || 0;
  if (rank >= ix.talent.max) return tx("Rang maximal atteint");
  if (ix.branch === "voie") {
    const cur = chosenVoie(S);
    if (cur && cur.id !== id) return tx("Voie déjà choisie : {0} (réinitialise les talents pour changer)", { 0: cur.name });
    if (talentPointsSpent(S) < VOIE_REQ) return txn(VOIE_REQ, "Demande {n} point dépensé dans les talents|Demande {n} points dépensés dans les talents");
    if (talentPointsFree(S) <= 0) return tx("Aucun point disponible (1 point par niveau)");
    return null;
  }
  if (ix.branch === "mastery") {
    if (talentPointsSpent(S) < MASTERY_REQ) return txn(MASTERY_REQ, "Demande {n} point dépensé dans les talents|Demande {n} points dépensés dans les talents");
    if (talentPointsFree(S) <= 0) return tx("Aucun point disponible (1 point par niveau)");
    return null;
  }
  const need = TIER_REQ[ix.talent.tier];
  if (branchSpent(S, ix.branch) < need) return txn(need, "Demande {n} point dans la branche {0}|Demande {n} points dans la branche {0}", { 0: TREES[S.cls][ix.branch].name });
  if (talentPointsFree(S) <= 0) return tx("Aucun point disponible (1 point par niveau)");
  return null;
}

/** Somme des effets : passif de classe + talents de la classe active. */
export function talentEffects(S) {
  const out = {};
  const add = (eff, n = 1) => { for (const k in eff) out[k] = (out[k] || 0) + eff[k] * n; };
  add(classDef(S.cls).passive);
  const ranks = S.talents[S.cls] || {};
  for (const id in ranks) { const ix = TALENT_INDEX[id]; if (ix && (ix.cls === S.cls || ix.cls === "*")) add(ix.talent.eff, Math.min(ranks[id], ix.talent.max)); }
  return out;
}

/** Description lisible d'un ensemble d'effets (pour l'interface). */
export function describeEffects(eff, n = 1) {
  return Object.entries(eff).map(([k, v]) => {
    const e = EFFECTS[k];
    if (!e) return "";
    if (k === "secondWind") return tx("second souffle (survit une fois par combat à un coup fatal)");
    const val = v * n * (e.scale || 1), sign = val < 0 ? "−" : "+";
    const txt = dec((Math.round(Math.abs(val) * 10) / 10).toString());
    if (e.unit === " pts") return `${sign}${txn(Math.abs(val), "{n} pt|{n} pts", { n: txt })} ${e.label}`; // « pts » traduit (Pkt., оч.…)
    return e.unit === "×" || e.unit === "%" ? `${sign}${txt}${unit("%")} ${e.label}` : `${sign}${txt}${e.unit} ${e.label}`;
  }).filter(Boolean).join(csep());
}
