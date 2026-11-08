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
  { name: "Forêt des murmures", monsters: ["slime", "mush"], boss: "mush",
    sky: ["#78c3e0", "#c5ead8"], far: "#6aa486", near: "#3f7a55", g1: "#6cbf4f", g2: "#7a5233", g3: "#5c3c25", prop: "tree" },
  { name: "Grotte suintante", monsters: ["bat", "slime"], boss: "slime",
    sky: ["#22263d", "#3b4464"], far: "#343a5a", near: "#262a44", g1: "#5b6386", g2: "#3a3f5c", g3: "#2a2e45", prop: "rock" },
  { name: "Crypte oubliée", monsters: ["skel", "bat"], boss: "skel",
    sky: ["#251e33", "#4a385e"], far: "#3b2f4f", near: "#2c2340", g1: "#7c7590", g2: "#4b4560", g3: "#36314a", prop: "tomb" },
  { name: "Marais brumeux", monsters: ["mush", "slime", "plant"], boss: "slime",
    sky: ["#8da698", "#c9d3b6"], far: "#728e6f", near: "#4b684d", g1: "#5f8a4a", g2: "#4a5a3a", g3: "#37432b", prop: "tree" },
  { name: "Forge volcanique", monsters: ["skel", "bat", "imp"], boss: "skel",
    sky: ["#3f1a20", "#a8482c"], far: "#6b2b25", near: "#3d1a1b", g1: "#8a3a2a", g2: "#3b2424", g3: "#2a1919", prop: "rock" },
  { name: "Désert brûlant", monsters: ["scorp", "skel"], boss: "scorp",
    sky: ["#f0b46a", "#fbe3b0"], far: "#d9a05b", near: "#a8743a", g1: "#e8c27a", g2: "#c99a5a", g3: "#a87a42", prop: "cactus" },
  { name: "Toundra gelée", monsters: ["wolf", "ghost"], boss: "wolf",
    sky: ["#9fc3e0", "#e6f1fa"], far: "#b9cfe0", near: "#7d9bb5", g1: "#f4f8fc", g2: "#cfdbe6", g3: "#a9bccd", prop: "crystal" },
  { name: "Jungle étouffante", monsters: ["plant", "bat", "scorp"], boss: "plant",
    sky: ["#4f8a5a", "#a8d29a"], far: "#3f7a45", near: "#25552e", g1: "#4fae3f", g2: "#5a3f22", g3: "#3f2a17", prop: "tree" },
  { name: "Ruines célestes", monsters: ["golem", "ghost"], boss: "golem",
    sky: ["#b49ad8", "#f2d6ea"], far: "#9a86c0", near: "#6e5f94", g1: "#d8d2e8", g2: "#8f86a8", g3: "#6f6788", prop: "pillar" },
  { name: "Abysses ardents", monsters: ["imp", "ghost", "golem"], boss: "imp",
    sky: ["#1a0f24", "#4a1830"], far: "#3a1a32", near: "#24101f", g1: "#7a2a3a", g2: "#2a1420", g3: "#1a0c14", prop: "crystal" },
  { name: "Égouts oubliés", monsters: ["rat", "rat_plague", "slime_toxic"], boss: "spider_widow",
    sky: ["#1f2a24", "#3a4a3a"], far: "#2a3a30", near: "#1a241e", g1: "#4a5a3a", g2: "#2a3024", g3: "#1a2018", prop: "rock" },
  { name: "Pyramide maudite", monsters: ["mummy", "scorp_obsid", "skel"], boss: "mummy",
    sky: ["#e0a050", "#f8d890"], far: "#c88a40", near: "#a06a2a", g1: "#e8c27a", g2: "#b88a4a", g3: "#906a3a", prop: "pillar" },
  { name: "Pics enneigés", monsters: ["yeti", "slime_frost", "wolf"], boss: "yeti",
    sky: ["#a8c8e8", "#f0f6fc"], far: "#d0e0f0", near: "#90a8c0", g1: "#ffffff", g2: "#d8e4f0", g3: "#b0c4d8", prop: "crystal" },
  { name: "Nid des harpies", monsters: ["harpy", "bat_vampire", "goblin_raider"], boss: "harpy",
    sky: ["#e88a6a", "#f8d0a0"], far: "#b86a5a", near: "#7a4a3a", g1: "#a87a5a", g2: "#6a4a3a", g3: "#4a3226", prop: "rock" },
  { name: "Cœur du volcan", monsters: ["fireelem", "slime_lava", "skel_fire"], boss: "golem_lava",
    sky: ["#2a0a0a", "#c84a1a"], far: "#7a2a1a", near: "#4a1a10", g1: "#e2552b", g2: "#3a1a14", g3: "#2a100a", prop: "crystal" },
  { name: "Côte des naufragés", monsters: ["crab", "plant_mandra", "ghost_flame"], boss: "crab",
    sky: ["#5ab0d8", "#c8eaf8"], far: "#4a90b8", near: "#2a6a8a", g1: "#f0dca8", g2: "#d8c08a", g3: "#b89a6a", prop: "tree" },
  { name: "Bastion noir", monsters: ["darkknight", "skel_fire", "goblin_raider"], boss: "darkknight",
    sky: ["#14121f", "#3a3550"], far: "#2a2638", near: "#1a1724", g1: "#4a4560", g2: "#2a2638", g3: "#1a1724", prop: "tomb" },
  { name: "Caverne de cristal", monsters: ["golem_crystal", "spider_widow", "skel_frost", "imp_frost"], boss: "golem_crystal",
    sky: ["#1a2a4a", "#4a6aa8"], far: "#3a5a8a", near: "#2a3a6a", g1: "#9fe8ff", g2: "#3a4a7a", g3: "#2a3460", prop: "crystal" },
  { name: "Bois corrompu", monsters: ["treant", "mush_venom", "wolf_shadow"], boss: "treant_rot",
    sky: ["#3a2a4a", "#7a5a8a"], far: "#4a3a5a", near: "#2a2038", g1: "#5a4a6a", g2: "#3a2a3a", g3: "#2a1a2a", prop: "tree" },
  { name: "Pic des wyvernes", monsters: ["drake", "harpy", "bat_vampire"], boss: "drake",
    sky: ["#d88a5a", "#f8e0b0"], far: "#a87a6a", near: "#7a5a4a", g1: "#b8a08a", g2: "#7a6a5a", g3: "#5a4a3a", prop: "rock" },
  { name: "Royaume du néant", monsters: ["eye", "ghost_flame", "imp"], boss: "eye",
    sky: ["#0a0614", "#2a1a4a"], far: "#1a1030", near: "#120a22", g1: "#4a3a7a", g2: "#2a1a4a", g3: "#1a1030", prop: "pillar" },
  { name: "Récif abyssal", monsters: ["crab_abyss", "eye_deep", "slime_frost"], boss: "crab_abyss",
    sky: ["#0a2a4a", "#2a6a9a"], far: "#1a4a6a", near: "#0a2a4a", g1: "#3a8aa8", g2: "#1a4a6a", g3: "#0a2a4a", prop: "crystal" },
  { name: "Volcan des wyvernes", monsters: ["drake_fire", "fireelem", "slime_lava"], boss: "drake_fire",
    sky: ["#3a0a0a", "#e2552b"], far: "#8a2a1a", near: "#4a1a10", g1: "#5a2a1a", g2: "#3a1a10", g3: "#2a0a08", prop: "rock" },
];
