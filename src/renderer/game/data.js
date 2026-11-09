// Données de jeu pures (aucune dépendance au DOM ni au rendu).
// Pour ajouter du contenu : une zone dans ZONES, un monstre dans MONSTERS
// (+ son sprite dans render/art.js), un nom d'objet dans ITEM_BASES / ITEM_SUFFIXES.

export const RARITIES = [
  { id: "common",    name: "Commun",      weight: 60, mult: 1,    affixes: 0, color: "#b8bec6" },
  { id: "uncommon",  name: "Peu commun",  weight: 25, mult: 1.25, affixes: 1, color: "#5fd36f" },
  { id: "rare",      name: "Rare",        weight: 10, mult: 1.55, affixes: 1, color: "#6aa8ff" },
  { id: "epic",      name: "Épique",      weight: 4,  mult: 1.9,  affixes: 2, color: "#c08cff" },
  { id: "legendary", name: "Légendaire",  weight: 1,  mult: 2.4,  affixes: 3, color: "#ffb733" },
];
export const LEGENDARY = 4;

export const DROP_CHANCE = 0.35;
export const BAG_SIZE = 24;          // taille de départ (agrandissable en boutique)
export const BAG_MAX = 48;
export const KILLS_PER_ZONE = 10;
export const MAX_PLUS = 10;
export const OFFLINE_CAP_S = 8 * 3600;
export const LOG_SIZE = 40;

// Rythme du combat, en pixels « monde ». Il ne dépend PAS de la largeur de
// l'écran : un joueur en 4K progresse aussi vite qu'un joueur en 1366 px.
export const WALK_SPEED = 26;      // défilement du décor quand le héros marche
export const MONSTER_SPEED = 34;   // vitesse d'approche propre des monstres
export const SPAWN_DIST = 150;     // distance d'apparition devant le héros
export const SPAWN_DELAY = [0.8, 1.6];
export const SIM_STEP = 0.05;      // pas maximal de simulation (s)

// scale : puissance de la statistique principale par rapport à une arme / armure.
export const SLOTS = {
  weapon: { name: "Arme",     main: "atk" },
  helm:   { name: "Casque",   main: "hp" },
  armor:  { name: "Armure",   main: "def" },
  gloves: { name: "Gants",    main: "atk", scale: 0.6 },
  boots:  { name: "Bottes",   main: "spd" },
  ring:   { name: "Anneau",   main: "crit" },
  amulet: { name: "Amulette", main: "hp",  scale: 0.7 },
};
export const SLOT_KEYS = Object.keys(SLOTS);

export const STAT_NAMES = {
  hp: "Points de vie", atk: "Attaque", def: "Défense",
  crit: "Critique", spd: "Vitesse d’attaque", gold: "Or trouvé",
};
export const PCT_STATS = { crit: 1, spd: 1, gold: 1 };

// Types d'objets par emplacement : nom, icône (render/art.js > ICON_ART) et
// famille de matière (metal, leather, cloth, wood, gem) qui choisit les matériaux.
const B = (n, icon, kind) => ({ n, icon, kind });
export const ITEM_BASES = {
  weapon: [B("Épée", "sword", "metal"), B("Hache", "axe", "metal"), B("Dague", "dagger", "metal"), B("Masse", "mace", "metal"),
    B("Lance", "spear", "metal"), B("Sabre", "katana", "metal"), B("Marteau", "hammer", "metal"), B("Faux", "scythe", "metal"),
    B("Bâton", "staff", "wood"), B("Arc", "bow", "wood"), B("Hallebarde", "spear", "metal"), B("Cimeterre", "katana", "metal")],
  helm: [B("Casque", "helm", "metal"), B("Heaume", "greathelm", "metal"), B("Capuche", "hood", "cloth"), B("Bandeau", "band", "cloth"),
    B("Couronne", "crown", "metal"), B("Chapeau", "hat", "cloth"), B("Casque à cornes", "horned", "metal"), B("Masque", "mask", "leather")],
  armor: [B("Cuirasse", "plate", "metal"), B("Cotte de mailles", "mail", "metal"), B("Tunique", "tunic", "leather"),
    B("Robe", "robe", "cloth"), B("Brigandine", "tunic", "leather"), B("Plastron", "plate", "metal"), B("Manteau", "robe", "cloth")],
  gloves: [B("Gants", "glove", "leather"), B("Gantelets", "gauntlet", "metal"), B("Mitaines", "glove", "cloth"), B("Brassards", "gauntlet", "metal")],
  boots: [B("Bottes", "boots", "leather"), B("Sandales", "sandals", "leather"), B("Grèves", "greaves", "metal"),
    B("Jambières", "greaves", "metal"), B("Souliers", "boots", "cloth")],
  ring: [B("Anneau", "ring", "metal"), B("Bague", "ring", "gem"), B("Chevalière", "signet", "metal"), B("Sceau", "signet", "gem")],
  amulet: [B("Amulette", "amulet", "metal"), B("Pendentif", "amulet", "gem"), B("Talisman", "talisman", "gem"), B("Médaillon", "medal", "metal")],
};

// Matériaux par famille, du plus modeste au plus précieux. Le matériau dépend
// du niveau de l'objet (maxIl = niveau d'objet maximal pour ce matériau).
const M = (n, color, maxIl) => ({ n, color, maxIl });
export const MATERIALS = {
  metal: [M("de bronze", "#c98a4a", 3), M("de fer", "#9aa3ad", 6), M("d’acier", "#c9d1dc", 10), M("d’argent", "#eef3f8", 15),
    M("de mithril", "#8fd8ff", 21), M("d’obsidienne", "#5a4a7a", 28), M("de cristal", "#b8f0ff", 36), M("d’os de dragon", "#e8dcc0", 46), M("d’étoile", "#ffe9a8", 1e9)],
  leather: [M("de cuir", "#8a5a2b", 5), M("de cuir épais", "#6b4226", 11), M("de cuir de loup", "#7a7a86", 18),
    M("de peau de wyverne", "#4f8a5a", 28), M("d’écailles de dragon", "#b8322a", 40), M("de cuir céleste", "#6a8fd8", 1e9)],
  cloth: [M("de lin", "#d8cfb8", 5), M("de laine", "#a87a5a", 11), M("de soie", "#d86a9a", 18), M("de velours", "#7a3a8a", 26),
    M("de soie d’araignée", "#dfe7f2", 36), M("de tissu céleste", "#6ab0ff", 1e9)],
  wood: [M("de chêne", "#8a5a2b", 6), M("d’if", "#a0713c", 14), M("de bois de fer", "#5a4a3a", 24), M("de bois-esprit", "#5fae4a", 36), M("de bois d’étoile", "#ffe27a", 1e9)],
  gem: [M("de quartz", "#e8eef5", 5), M("d’améthyste", "#a86ad8", 12), M("de saphir", "#4a7ad8", 20), M("de rubis", "#d8324a", 30),
    M("d’émeraude", "#3ac86a", 40), M("de diamant", "#dff8ff", 1e9)],
};
export const materialFor = (kind, il) => {
  const list = MATERIALS[kind] || MATERIALS.metal;
  const i = list.findIndex((m) => il <= m.maxIl);
  return { mat: list[i < 0 ? list.length - 1 : i], tier: i < 0 ? list.length - 1 : i };
};

// Suffixes des objets rares et mieux (index = rareté ; communs et peu communs n'en ont pas).
export const ITEM_SUFFIXES = [
  [],
  [],
  ["des marées", "du loup gris", "de braise", "du givre", "du chasseur", "de l’éclaireur", "du voyageur", "des bourrasques",
    "du faucon", "de la rosée", "des collines", "du sanglier", "de l’aube", "du crépuscule"],
  ["du roi-liche", "des tempêtes", "de l’abîme", "du chevalier noir", "de la tour d’ivoire", "des sept vents", "du serment brisé",
    "de la reine des neiges", "du dernier bastion", "de l’éclipse", "du vieux dragon", "des ombres sans nom"],
  ["de l’Aube éternelle", "du Dernier Dragon", "des Mille Lunes", "du Roi oublié", "de l’Étoile déchue", "des Titans",
    "du Phénix", "de la Fin des temps", "du Premier Héros"],
];
/** Teintes des objets en tissu / cuir selon la rareté (pour l'icône et le personnage). */
export const DYES = ["#8a8072", "#4f8a3a", "#3a6ac8", "#7a3ab8", "#d88a1a"];

// Monstres : nom + modificateurs de statistiques par rapport à la base de la zone.
// fly (vol) est une propriété du sprite, voir render/art.js.
export const MONSTERS = {
  slime: { name: "Gluant",            hp: 1.1,  atk: 0.85, interval: 1 },
  mush:  { name: "Champignard",       hp: 1,    atk: 1,    interval: 1 },
  bat:   { name: "Chauve-souris",     hp: 0.8,  atk: 1,    interval: 0.85 },
  skel:  { name: "Squelette",         hp: 1,    atk: 1.15, interval: 1 },
  scorp: { name: "Scorpion",          hp: 0.9,  atk: 1.2,  interval: 1 },
  wolf:  { name: "Loup des neiges",   hp: 0.9,  atk: 1,    interval: 0.8 },
  golem: { name: "Golem de pierre",   hp: 1.6,  atk: 0.8,  interval: 1.3 },
  plant: { name: "Plante carnivore",  hp: 1.2,  atk: 1.1,  interval: 1.1 },
  ghost: { name: "Spectre",           hp: 0.75, atk: 1.1,  interval: 1 },
  imp:   { name: "Diablotin",         hp: 0.85, atk: 1.25, interval: 0.9 },
  rat:        { name: "Rat géant",         hp: 0.7,  atk: 0.9,  interval: 0.7 },
  spider:     { name: "Araignée",          hp: 0.85, atk: 1.15, interval: 0.85 },
  mummy:      { name: "Momie",             hp: 1.4,  atk: 1,    interval: 1.2 },
  yeti:       { name: "Yéti",              hp: 1.5,  atk: 1.15, interval: 1.3 },
  harpy:      { name: "Harpie",            hp: 0.8,  atk: 1.2,  interval: 0.8 },
  fireelem:   { name: "Élémentaire de feu", hp: 0.9, atk: 1.35, interval: 1 },
  crab:       { name: "Crabe des récifs",  hp: 1.3,  atk: 0.9,  interval: 1.1 },
  darkknight: { name: "Chevalier noir",    hp: 1.35, atk: 1.25, interval: 1.1 },
  treant:     { name: "Sylvain",           hp: 1.7,  atk: 0.95, interval: 1.3 },
  drake:      { name: "Wyverne",           hp: 1.1,  atk: 1.3,  interval: 0.9 },
  eye:        { name: "Tyrannœil",         hp: 1,    atk: 1.4,  interval: 1 },
  // Deuxième fournée (dessins dans render/art-monsters2.js).
  frog:       { name: "Crapaud",           hp: 1.1,  atk: 0.9,  interval: 1 },
  snake:      { name: "Serpent",           hp: 0.8,  atk: 1.2,  interval: 0.85 },
  beetle:     { name: "Scarabée",          hp: 1.4,  atk: 0.85, interval: 1.1 },
  boar:       { name: "Sanglier",          hp: 1.2,  atk: 1.1,  interval: 1 },
  bear:       { name: "Ours brun",         hp: 1.6,  atk: 1.15, interval: 1.3 },
  orc:        { name: "Orc",               hp: 1.3,  atk: 1.2,  interval: 1.15 },
  cultist:    { name: "Cultiste",          hp: 0.85, atk: 1.3,  interval: 1 },
  wasp:       { name: "Guêpe géante",      hp: 0.7,  atk: 1.15, interval: 0.7 },
  jelly:      { name: "Méduse",            hp: 0.9,  atk: 1,    interval: 0.9 },
  lizard:     { name: "Lézard",            hp: 1,    atk: 1.05, interval: 0.9 },
  worm:       { name: "Ver des sables",    hp: 1.5,  atk: 0.95, interval: 1.2 },
  mimic:      { name: "Mimique",           hp: 1.3,  atk: 1.35, interval: 1.1, gold: 2.5 },
  bandit:     { name: "Bandit",            hp: 0.95, atk: 1.2,  interval: 0.95 },
  crow:       { name: "Corbeau",           hp: 0.65, atk: 1.05, interval: 0.75 },
  sporeling:  { name: "Champignon errant", hp: 1,    atk: 0.95, interval: 1 },
  knight:     { name: "Chevalier errant",  hp: 1.4,  atk: 1.15, interval: 1.15 },
  frog_poison:   { name: "Grenouille toxique",   art: "frog",    recolor: { G: "#5a7ae8", g: "#3a4ab8", L: "#ffd34d" }, hp: 0.9, atk: 1.25, interval: 0.95 },
  beetle_lava:   { name: "Scarabée de lave",     art: "beetle",  recolor: { B: "#e2552b", b: "#8a2a1a", S: "#ffd34d" }, hp: 1.4, atk: 1.05, interval: 1.1 },
  beetle_gold:   { name: "Scarabée d’or",        art: "beetle",  recolor: { B: "#e9b949", b: "#a87a1a", S: "#fff6c8" }, hp: 1.3, atk: 0.9, interval: 1.1, gold: 2 },
  lizard_lava:   { name: "Salamandre géante",    art: "lizard",  recolor: { G: "#e2552b", g: "#8a2a1a", Y: "#ffd34d" }, hp: 1.05, atk: 1.25, interval: 0.9 },
  lizard_sand:   { name: "Varan",                art: "lizard",  recolor: { G: "#c9a06a", g: "#8a6a3a", Y: "#f0dca8" }, hp: 1.2, atk: 1.1, interval: 1 },
  snake_sand:    { name: "Vipère des sables",    art: "snake",   recolor: { G: "#d8b878", g: "#a8884a", Y: "#8a5a2b" }, hp: 0.8, atk: 1.3, interval: 0.85 },
  snake_frost:   { name: "Serpent de givre",     art: "snake",   recolor: { G: "#9fd8ff", g: "#5a9ac8", Y: "#ffffff" }, hp: 1, atk: 1.1, interval: 0.95 },
  snake_sea:     { name: "Serpent de mer",       art: "snake",   recolor: { G: "#2a8aa8", g: "#1a5a7a", Y: "#9fe8ff" }, hp: 1.2, atk: 1.25, interval: 0.9 },
  bandit_desert: { name: "Pillard du désert",    art: "bandit",  recolor: { K: "#e8d8b0", R: "#c97a3a", A: "#c9a06a", a: "#8a6a3a" }, hp: 1, atk: 1.2, interval: 0.95 },
  bandit_pirate: { name: "Pirate",               art: "bandit",  recolor: { K: "#c0392b", R: "#f4f0e8", A: "#2a4f7a", a: "#1a3050" }, hp: 1.1, atk: 1.25, interval: 1 },
  bear_polar:    { name: "Ours polaire",         art: "bear",    recolor: { B: "#f4f8fc", b: "#c9d6e3", L: "#a9b6c6" }, hp: 1.8, atk: 1.15, interval: 1.3 },
  bear_cave:     { name: "Ours des cavernes",    art: "bear",    recolor: { B: "#4a4560", b: "#2a2638", L: "#7a7590" }, hp: 1.9, atk: 1.2, interval: 1.35 },
  orc_frost:     { name: "Orc des glaces",       art: "orc",     recolor: { G: "#7ab0d8", g: "#4a80a8", A: "#e8eef5", a: "#a9b6c6" }, hp: 1.4, atk: 1.15, interval: 1.2 },
  orc_war:       { name: "Chef de guerre orc",   art: "orc",     recolor: { G: "#8a3a2a", g: "#5a2018", A: "#2a2638", a: "#14121f", M: "#e9b949" }, hp: 1.5, atk: 1.35, interval: 1.2 },
  crow_storm:    { name: "Corbeau d’orage",      art: "crow",    recolor: { K: "#4a5a8a", k: "#2a3a6a", Y: "#9fe8ff", E: "#ffffff" }, hp: 0.75, atk: 1.2, interval: 0.75 },
  cultist_fire:  { name: "Pyromancien",          art: "cultist", recolor: { R: "#e2552b", r: "#8a2a1a", Y: "#ffd34d" }, hp: 0.85, atk: 1.4, interval: 1 },
  cultist_void:  { name: "Cultiste du néant",    art: "cultist", recolor: { R: "#4a2a7a", r: "#2a1a4a", Y: "#c08cff", E: "#c08cff" }, hp: 0.95, atk: 1.4, interval: 1 },
  jelly_fire:    { name: "Méduse de braise",     art: "jelly",   recolor: { P: "#ff9a3a", p: "#c0562b", W: "#ffe27a" }, hp: 0.9, atk: 1.2, interval: 0.9 },
  jelly_abyss:   { name: "Méduse abyssale",      art: "jelly",   recolor: { P: "#3a8ac8", p: "#1a5a8a", W: "#9fe8ff", E: "#ffffff" }, hp: 1.1, atk: 1.2, interval: 0.9 },
  mimic_gold:    { name: "Mimique dorée",        art: "mimic",   recolor: { B: "#e9b949", b: "#a87a1a", Y: "#fff6c8" }, hp: 1.4, atk: 1.35, interval: 1.1, gold: 4 },
  wasp_venom:    { name: "Frelon",               art: "wasp",    recolor: { Y: "#ff7a3a", K: "#3a1a10" }, hp: 0.75, atk: 1.3, interval: 0.7 },
  knight_rust:   { name: "Chevalier rouillé",    art: "knight",  recolor: { M: "#a8704a", m: "#7a4a2a", W: "#c98a5a" }, hp: 1.3, atk: 1.05, interval: 1.2 },
  knight_crystal:{ name: "Chevalier de cristal", art: "knight",  recolor: { M: "#9fe8ff", m: "#5ab0d8", W: "#ffffff", R: "#c08cff" }, hp: 1.6, atk: 1.2, interval: 1.2 },
  sporeling_glow:{ name: "Champignon luisant",   art: "sporeling", recolor: { M: "#7affc8", m: "#3ab88a", W: "#ffffff" }, hp: 1, atk: 1.05, interval: 1 },
  // Variantes : même dessin (art), autres couleurs (recolor) et caractéristiques.
  slime_lava:  { name: "Gluant de lave",       art: "slime", recolor: { G: "#e2552b", D: "#a8322a" }, hp: 1.1, atk: 1.2, interval: 1 },
  slime_frost: { name: "Gluant de givre",      art: "slime", recolor: { G: "#9fd8ff", D: "#5a9ac8" }, hp: 1.3, atk: 0.8, interval: 1.2 },
  slime_toxic: { name: "Gluant toxique",       art: "slime", recolor: { G: "#a86ad8", D: "#6a3a9a" }, hp: 1, atk: 1.1, interval: 0.9 },
  mush_venom:  { name: "Champignard vénéneux", art: "mush",  recolor: { R: "#8a3ab8", W: "#d8ff8a" }, hp: 1, atk: 1.2, interval: 1 },
  bat_vampire: { name: "Vampire",              art: "bat",   recolor: { W: "#5a1a2a", B: "#a8322a", E: "#ffe27a" }, hp: 0.9, atk: 1.2, interval: 0.8 },
  skel_fire:   { name: "Squelette ardent",     art: "skel",  recolor: { B: "#ffb07a", E: "#ffe27a", s: "#e2552b" }, hp: 1, atk: 1.3, interval: 1 },
  skel_frost:  { name: "Squelette de givre",   art: "skel",  recolor: { B: "#cfe8ff", E: "#4a9aff", s: "#9fd8ff" }, hp: 1.2, atk: 1.05, interval: 1.1 },
  scorp_obsid: { name: "Scorpion d’obsidienne", art: "scorp", recolor: { O: "#4a3a6a", D: "#2a2040", C: "#7a5ab0", T: "#ff4a8a" }, hp: 1.2, atk: 1.2, interval: 1 },
  wolf_shadow: { name: "Loup des ombres",      art: "wolf",  recolor: { W: "#4a4560", G: "#2a2638", E: "#ff4a4a" }, hp: 0.9, atk: 1.2, interval: 0.75 },
  golem_lava:  { name: "Golem de lave",        art: "golem", recolor: { S: "#5a3a3a", D: "#3a2424", E: "#ffb733", M: "#e2552b" }, hp: 1.7, atk: 1, interval: 1.3 },
  golem_crystal: { name: "Golem de cristal",   art: "golem", recolor: { S: "#9fe8ff", D: "#5ab0d8", E: "#ffffff", M: "#c08cff" }, hp: 1.8, atk: 0.9, interval: 1.35 },
  plant_mandra: { name: "Mandragore",          art: "plant", recolor: { R: "#a86ad8", G: "#5a8a3a" }, hp: 1.1, atk: 1.25, interval: 1 },
  ghost_flame: { name: "Feu follet",           art: "ghost", recolor: { W: "#ffd38a", B: "#ff8a3a", E: "#a8322a" }, hp: 0.7, atk: 1.25, interval: 0.9 },
  imp_frost:   { name: "Démon des glaces",     art: "imp",   recolor: { R: "#5a9ad8", D: "#2a5a9a", W: "#3a4a7a", Y: "#ffffff" }, hp: 0.95, atk: 1.2, interval: 0.95 },
  spider_widow: { name: "Veuve noire",         art: "spider", recolor: { B: "#14121f", R: "#ff3a3a" }, hp: 1, atk: 1.35, interval: 0.9 },
  rat_plague:  { name: "Rat pestiféré",        art: "rat",   recolor: { G: "#6a8a4a", D: "#4a5a2a", P: "#a8d86a" }, hp: 0.8, atk: 1, interval: 0.7 },
  treant_rot:  { name: "Sylvain pourri",      art: "treant", recolor: { G: "#6a5a8a", g: "#4a3a6a", B: "#4a3a3a", b: "#2a2020", E: "#a8ff6a" }, hp: 1.8, atk: 1.05, interval: 1.3 },
  drake_fire:  { name: "Wyverne de feu",      art: "drake", recolor: { G: "#c0392b", g: "#7a1e1e", W: "#ff9a3a", Y: "#ffe27a" }, hp: 1.15, atk: 1.4, interval: 0.9 },
  eye_deep:    { name: "Œil des profondeurs", art: "eye",   recolor: { P: "#2a6a8a", p: "#1a4a6a", B: "#3ad8a8" }, hp: 1.1, atk: 1.45, interval: 1 },
  crab_abyss:  { name: "Crabe abyssal",       art: "crab",  recolor: { R: "#3a4a8a", r: "#2a2a5a", W: "#7fd6ff" }, hp: 1.5, atk: 1.1, interval: 1.1 },
  goblin_raider: { name: "Gobelin pillard",    art: "goblin", recolor: { Y: "#8a5a2b", D: "#5a3a1a", W: "#c9ced6" }, hp: 0.9, atk: 1.15, interval: 0.85 },
  // Rare (GOBLIN.chance) dans n'importe quelle zone : ne se bat pas, s'enfuit
  // au bout de GOBLIN.flee secondes, mais rapporte énormément d'or.
  goblin: { name: "Gobelin doré",     hp: 0.7,  atk: 0,    interval: 1, gold: 15, xp: 2 },
};
export const GOBLIN = { chance: 0.015, flee: 4 };

// Monstres d'élite : rares, plus coriaces, bien plus rentables.
export const ELITE = { chance: 0.06, hp: 3, atk: 1.5, gold: 4, xp: 3, minRarity: 1 };
// Champions : très rares, encore plus coriaces (en plus des bonus d'élite), butin épique garanti.
export const CHAMPION = { minZone: 5, chance: 0.005, // pas de champion en tout début de partie (zone < 5)
  hp: 2.5, atk: 1.3, gold: 5, xp: 4, minRarity: 3 };
/** Affixes des élites : chaque élite en reçoit un (nom affiché au-dessus de lui). */
export const ELITE_AFFIXES = {
  fast:     { name: "Rapide",     color: "#9fd8ff", interval: 0.6 },
  armored:  { name: "Blindé",     color: "#c9ced6", hp: 1.6 },
  vampiric: { name: "Vampirique", color: "#ff4a6a", lifesteal: 0.5 },
  furious:  { name: "Furieux",    color: "#ff9a3a", atk: 1.4 },
};

// Les zones bouclent : après la dernière, on repart de la première avec des
// monstres plus forts (« Forêt des murmures + »).
// sky/far/near/g1..g3/prop sont des indications de décor lues par le rendu.
export const ZONES = [
  { name: "Forêt des murmures", monsters: ["slime", "mush", "frog", "boar", "crow", "sporeling", "snake", "bear"], boss: "mush",
    sky: ["#78c3e0", "#c5ead8"], far: "#6aa486", near: "#3f7a55", g1: "#6cbf4f", g2: "#7a5233", g3: "#5c3c25", prop: "tree" },
  { name: "Grotte suintante", monsters: ["bat", "slime", "beetle", "spider", "rat", "sporeling_glow", "worm"], boss: "slime",
    sky: ["#22263d", "#3b4464"], far: "#343a5a", near: "#262a44", g1: "#5b6386", g2: "#3a3f5c", g3: "#2a2e45", prop: "rock" },
  { name: "Crypte oubliée", monsters: ["skel", "bat", "ghost", "cultist", "rat", "knight_rust", "mimic"], boss: "skel",
    sky: ["#251e33", "#4a385e"], far: "#3b2f4f", near: "#2c2340", g1: "#7c7590", g2: "#4b4560", g3: "#36314a", prop: "tomb" },
  { name: "Marais brumeux", monsters: ["mush", "slime", "plant", "frog", "frog_poison", "snake", "mush_venom"], boss: "slime",
    sky: ["#8da698", "#c9d3b6"], far: "#728e6f", near: "#4b684d", g1: "#5f8a4a", g2: "#4a5a3a", g3: "#37432b", prop: "tree" },
  { name: "Forge volcanique", monsters: ["skel", "bat", "imp", "beetle_lava", "orc", "lizard_lava", "skel_fire"], boss: "skel",
    sky: ["#3f1a20", "#a8482c"], far: "#6b2b25", near: "#3d1a1b", g1: "#8a3a2a", g2: "#3b2424", g3: "#2a1919", prop: "rock" },
  { name: "Désert brûlant", monsters: ["scorp", "skel", "snake_sand", "beetle_gold", "worm", "bandit_desert", "lizard_sand"], boss: "scorp",
    sky: ["#f0b46a", "#fbe3b0"], far: "#d9a05b", near: "#a8743a", g1: "#e8c27a", g2: "#c99a5a", g3: "#a87a42", prop: "cactus" },
  { name: "Toundra gelée", monsters: ["wolf", "ghost", "bear_polar", "orc_frost", "snake_frost", "crow", "slime_frost"], boss: "wolf",
    sky: ["#9fc3e0", "#e6f1fa"], far: "#b9cfe0", near: "#7d9bb5", g1: "#f4f8fc", g2: "#cfdbe6", g3: "#a9bccd", prop: "crystal" },
  { name: "Jungle étouffante", monsters: ["plant", "bat", "scorp", "wasp", "frog_poison", "lizard", "snake"], boss: "plant",
    sky: ["#4f8a5a", "#a8d29a"], far: "#3f7a45", near: "#25552e", g1: "#4fae3f", g2: "#5a3f22", g3: "#3f2a17", prop: "tree" },
  { name: "Ruines célestes", monsters: ["golem", "ghost", "crow_storm", "knight", "cultist", "mimic_gold"], boss: "golem",
    sky: ["#b49ad8", "#f2d6ea"], far: "#9a86c0", near: "#6e5f94", g1: "#d8d2e8", g2: "#8f86a8", g3: "#6f6788", prop: "pillar" },
  { name: "Abysses ardents", monsters: ["imp", "ghost", "golem", "cultist_fire", "beetle_lava", "jelly_fire", "lizard_lava"], boss: "imp",
    sky: ["#1a0f24", "#4a1830"], far: "#3a1a32", near: "#24101f", g1: "#7a2a3a", g2: "#2a1420", g3: "#1a0c14", prop: "crystal" },
  { name: "Égouts oubliés", monsters: ["rat", "rat_plague", "slime_toxic", "frog_poison", "worm", "bandit", "spider"], boss: "spider_widow",
    sky: ["#1f2a24", "#3a4a3a"], far: "#2a3a30", near: "#1a241e", g1: "#4a5a3a", g2: "#2a3024", g3: "#1a2018", prop: "rock" },
  { name: "Pyramide maudite", monsters: ["mummy", "scorp_obsid", "skel", "beetle_gold", "snake_sand", "cultist", "mimic_gold"], boss: "mummy",
    sky: ["#e0a050", "#f8d890"], far: "#c88a40", near: "#a06a2a", g1: "#e8c27a", g2: "#b88a4a", g3: "#906a3a", prop: "pillar" },
  { name: "Pics enneigés", monsters: ["yeti", "slime_frost", "wolf", "bear_polar", "crow_storm", "orc_frost"], boss: "yeti",
    sky: ["#a8c8e8", "#f0f6fc"], far: "#d0e0f0", near: "#90a8c0", g1: "#ffffff", g2: "#d8e4f0", g3: "#b0c4d8", prop: "crystal" },
  { name: "Nid des harpies", monsters: ["harpy", "bat_vampire", "goblin_raider", "crow", "wasp_venom", "bandit"], boss: "harpy",
    sky: ["#e88a6a", "#f8d0a0"], far: "#b86a5a", near: "#7a4a3a", g1: "#a87a5a", g2: "#6a4a3a", g3: "#4a3226", prop: "rock" },
  { name: "Cœur du volcan", monsters: ["fireelem", "slime_lava", "skel_fire", "lizard_lava", "beetle_lava", "jelly_fire", "imp"], boss: "golem_lava",
    sky: ["#2a0a0a", "#c84a1a"], far: "#7a2a1a", near: "#4a1a10", g1: "#e2552b", g2: "#3a1a14", g3: "#2a100a", prop: "crystal" },
  { name: "Côte des naufragés", monsters: ["crab", "plant_mandra", "ghost_flame", "bandit_pirate", "jelly", "frog", "crow"], boss: "crab",
    sky: ["#5ab0d8", "#c8eaf8"], far: "#4a90b8", near: "#2a6a8a", g1: "#f0dca8", g2: "#d8c08a", g3: "#b89a6a", prop: "tree" },
  { name: "Bastion noir", monsters: ["darkknight", "skel_fire", "goblin_raider", "knight_rust", "orc_war", "cultist", "bandit"], boss: "darkknight",
    sky: ["#14121f", "#3a3550"], far: "#2a2638", near: "#1a1724", g1: "#4a4560", g2: "#2a2638", g3: "#1a1724", prop: "tomb" },
  { name: "Caverne de cristal", monsters: ["golem_crystal", "spider_widow", "skel_frost", "imp_frost", "beetle", "sporeling_glow", "knight_crystal"], boss: "golem_crystal",
    sky: ["#1a2a4a", "#4a6aa8"], far: "#3a5a8a", near: "#2a3a6a", g1: "#9fe8ff", g2: "#3a4a7a", g3: "#2a3460", prop: "crystal" },
  { name: "Bois corrompu", monsters: ["treant", "mush_venom", "wolf_shadow", "sporeling", "bear_cave", "crow", "snake"], boss: "treant_rot",
    sky: ["#3a2a4a", "#7a5a8a"], far: "#4a3a5a", near: "#2a2038", g1: "#5a4a6a", g2: "#3a2a3a", g3: "#2a1a2a", prop: "tree" },
  { name: "Pic des wyvernes", monsters: ["drake", "harpy", "bat_vampire", "crow_storm", "orc_war", "lizard"], boss: "drake",
    sky: ["#d88a5a", "#f8e0b0"], far: "#a87a6a", near: "#7a5a4a", g1: "#b8a08a", g2: "#7a6a5a", g3: "#5a4a3a", prop: "rock" },
  { name: "Royaume du néant", monsters: ["eye", "ghost_flame", "imp", "cultist_void", "wolf_shadow", "knight", "jelly_abyss"], boss: "eye",
    sky: ["#0a0614", "#2a1a4a"], far: "#1a1030", near: "#120a22", g1: "#4a3a7a", g2: "#2a1a4a", g3: "#1a1030", prop: "pillar" },
  { name: "Récif abyssal", monsters: ["crab_abyss", "eye_deep", "slime_frost", "jelly_abyss", "snake_sea", "bandit_pirate"], boss: "crab_abyss",
    sky: ["#0a2a4a", "#2a6a9a"], far: "#1a4a6a", near: "#0a2a4a", g1: "#3a8aa8", g2: "#1a4a6a", g3: "#0a2a4a", prop: "crystal" },
  { name: "Volcan des wyvernes", monsters: ["drake_fire", "fireelem", "slime_lava", "lizard_lava", "orc_war", "cultist_fire", "skel_fire"], boss: "drake_fire",
    sky: ["#3a0a0a", "#e2552b"], far: "#8a2a1a", near: "#4a1a10", g1: "#5a2a1a", g2: "#3a1a10", g3: "#2a0a08", prop: "rock" },
  // Zones ajoutées : de nouveaux décors et de nouveaux mélanges de monstres pour les boucles suivantes.
  { name: "Champignonnière géante", monsters: ["mush", "mush_venom", "sporeling", "sporeling_glow", "frog", "beetle", "snake"], boss: "mush_venom",
    sky: ["#2a1a3a", "#6a3a6a"], far: "#4a2a4a", near: "#2e1a32", g1: "#8a5a8a", g2: "#3a2238", g3: "#2a1828", prop: "shroom" },
  { name: "Ossuaire des titans", monsters: ["skel", "skel_frost", "ghost", "cultist", "rat_plague", "bat", "knight_rust"], boss: "skel_frost",
    sky: ["#3a3a4a", "#8a8a9a"], far: "#5a5a6a", near: "#3a3a48", g1: "#c8c0a8", g2: "#6a6458", g3: "#4a4640", prop: "bones" },
  { name: "Steppe des loups", monsters: ["wolf", "wolf_shadow", "boar", "crow", "bandit", "orc", "bear"], boss: "wolf_shadow",
    sky: ["#c8a868", "#f0e0b0"], far: "#a89060", near: "#7a6a44", g1: "#b8a060", g2: "#8a7444", g3: "#6a5832", prop: "rock" },
  { name: "Lagon de corail", monsters: ["jelly", "crab", "snake_sea", "frog", "plant", "bandit_pirate", "jelly_fire"], boss: "snake_sea",
    sky: ["#3ac0c8", "#c8f4ec"], far: "#2a9aa8", near: "#1a6a7a", g1: "#f4e0b8", g2: "#d8bc88", g3: "#b89a68", prop: "coral" },
  { name: "Glacier hurlant", monsters: ["imp_frost", "slime_frost", "snake_frost", "orc_frost", "bear_polar", "skel_frost", "crow_storm"], boss: "orc_frost",
    sky: ["#6a8ab8", "#d8e8f8"], far: "#a8c0e0", near: "#7088b0", g1: "#e8f4ff", g2: "#b8cce4", g3: "#90a8c8", prop: "crystal" },
  { name: "Cité engloutie", monsters: ["jelly_abyss", "snake_sea", "crab_abyss", "ghost", "eye_deep", "bandit_pirate", "knight_rust"], boss: "eye_deep",
    sky: ["#0a3a4a", "#3a8a9a"], far: "#1a5a6a", near: "#0a3a48", g1: "#5aa8a0", g2: "#1a4a50", g3: "#0a3038", prop: "pillar" },
  { name: "Mines naines", monsters: ["golem", "beetle", "rat", "goblin_raider", "spider", "worm", "golem_crystal"], boss: "golem",
    sky: ["#2a2018", "#5a4430"], far: "#4a3828", near: "#2e2218", g1: "#8a6a4a", g2: "#4a3828", g3: "#30241a", prop: "lantern" },
  { name: "Verger enchanté", monsters: ["plant", "plant_mandra", "wasp", "imp", "boar", "sporeling_glow", "treant"], boss: "treant",
    sky: ["#f0b8c8", "#fde8ec"], far: "#c88aa8", near: "#9a5a7a", g1: "#9fd86a", g2: "#6a9a4a", g3: "#4a7034", prop: "blossom" },
  { name: "Désert de verre", monsters: ["scorp", "scorp_obsid", "lizard_sand", "snake_sand", "bandit_desert", "mummy", "beetle_gold"], boss: "scorp_obsid",
    sky: ["#f0c890", "#fff0d0"], far: "#d8b080", near: "#b88a58", g1: "#f4e0b0", g2: "#d8bc88", g3: "#b89a68", prop: "crystal" },
  { name: "Trône des tempêtes", monsters: ["crow_storm", "harpy", "drake", "knight_crystal", "darkknight", "cultist_void", "eye"], boss: "darkknight",
    sky: ["#1a1a3a", "#4a4a8a"], far: "#2a2a5a", near: "#1a1a3a", g1: "#6a6aa8", g2: "#2a2a5a", g3: "#1a1a3a", prop: "pillar" },
];
