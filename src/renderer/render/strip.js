// Bande de jeu : toute la largeur de l'écran est la carte de la zone.
// Les 10 monstres attendent à intervalles réguliers, le boss tout à droite ;
// le héros avance d'un combat à l'autre puis repart de la gauche à la zone
// suivante. Le rythme de jeu ne dépend pas de la largeur : seule la distance
// parcourue à l'écran change.
//
// Le décor est fixe (une seule toile, redessinée au changement de zone) et
// les personnages sont des éléments DOM déplacés par transform : voir dom.js.
// Ce module lit l'état de la simulation sans jamais le modifier.
import { CLASSES, CLASS_UNLOCK_ZONE, isRanged } from "../game/classes.js";
import { EVENTS } from "../game/events.js";
import { t as tx, fsp, tr } from "../i18n/index.js";
import { attackTier, ATTACK_TIERS, CLASS_FX } from "../game/classes.js";
import { completedSectors, skillPointsTotal, SECTORS } from "../game/skilltree.js";
import { PIXEL as P, OUTLINE } from "./art.js";
import { buildSpriteSet, outlinedFrames, glowFrames, isDarkSprite } from "./sprites.js";
import { ELITE_AFFIXES, POUPOUCE, MONSTERS } from "../game/data.js";
const POUPOUCE_PINK = "#ff9ad2"; // (it. 1605) contour et étiquette de Poupouce
import { classDef } from "../game/classes.js";
import { bossName, bossWear } from "../game/bosses.js";
import { isFinalZone, storyWon, chroniclesUnlocked, CHRONICLES } from "../game/story.js";
import { heroVisual, visualKey } from "./equipvis.js";
import { buildHeroSprites } from "./sprites.js";
import { Juice } from "./juice.js";
import { fmt, fmtShort, uS } from "../game/format.js";
import { heroHeadURL } from "./trayicons.js";
import { recordZone } from "../game/unlocks.js";
import { SPELL_INDEX, SPELL_MAX, spellRank } from "../game/spells.js";
import { RELICS, majorBoss, hasRelic, relicUpgradable, ECHO_OUTLINE } from "../game/relics.js";
import { natureOf, lifeSeed, lifeOffset } from "./monlife.js";
import { monSkillOf } from "../game/monskills.js";
import { PACK_ARTS } from "../game/game.js";
/** (it. 1853) Couleur des mots et éclats des compétences de monstres selon l'élément de la variante (monskills.js). */
const MON_EL_COLOR = { fire: "#ff8a3a", frost: "#bfe8ff", poison: "#b98cff", shadow: "#c08cff" };
/** (it. 1854) Couleur propre d'une compétence sans élément (spores : vert pâle, piqué : violet de la chauve-souris). */
/** (it. 1878) Espèces de jour (s'endorment la nuit) et de nuit (s'agitent la nuit), selon le dessin de base. */
const DIURNAL = new Set(["frog", "boar", "bear", "crab", "lizard", "snake", "beetle", "wasp", "harpy", "plant", "sporeling", "treant", "orc", "bandit", "knight", "goblin", "yeti", "scorp"]);
const NOCTURNAL = new Set(["bat", "ghost", "wolf", "eye", "skel", "mummy", "cultist", "spider", "rat", "imp", "crow"]);
/** (it. 1888) Façon de tomber, par dessin de base (les volants sans entrée tombent au sol, les autres s'affaissent). */
const CORPSE_FALL = { ghost: "rise", fireelem: "rise", slime: "squash", jelly: "squash", golem: "crumble", skel: "crumble", mummy: "crumble", treant: "crumble" };
/** (it. 1867) Craintifs : reculent plus loin quand un voisin tombe. */
const TIMID = new Set(["rat", "goblin", "bandit", "imp", "frog", "crow", "lizard"]);
const MON_SKILL_COLOR = { spores: "#d8e8a0", dive: "#c8a8ff", reassemble: "#f0e8d0", sting: "#b8f07a", howl: "#d8e4ff", slam: "#c9b89a", roots: "#8fd36a", scream: "#e8b8ff", phase: "#d8f0ff", fireball: "#ff8a3a", swarm: "#d8c8b8", web: "#f4f4f8", tombcurse: "#c08cff", boulder: "#bfe8ff", feathers: "#f0d8b0", flare: "#ff9a3a", shell: "#9fd8ff", parry: "#c9ced6", riposte: "#ffb07a", rootdeep: "#8fd36a", breath: "#ffb03a", gaze: "#c08cff", tongue: "#ff8ab0", strike: "#c8f07a", pinch: "#d8c890", charge: "#e8c8a0", roar: "#ffd8a8", rage: "#ff5a4a", sacrifice: "#ff4a5a", flutter: "#ffd34d", shock: "#fff6a8", ambush: "#b8f07a", burrow: "#c9a06a", peck: "#c8c8e8", chomp: "#e9b949", pickpocket: "#ffd34d", pollen: "#b8ffd8", thrust: "#d8e0ec", bomb: "#ffb03a" };
import { spellIconURL, relicIconURL, shopIconCanvas } from "./shopart.js";
import { CONSUMABLES } from "../game/shop.js";
import { q, FONT, mark, el, makeCanvas, sizeCanvas, drawText, drawPill, drawCoin, drawBackdrop, Actor, Bar, HudBar } from "./dom.js";

// Répliques du héros, par circonstance.
const SPEECH = {
  idle: [tx("Encore un petit monstre…"), tx("Belle journée pour une balade."), tx("Il me faudrait un plus grand sac."),
    tx("Je sens de l’or par ici."), tx("Ces bottes me font mal aux pieds."), tx("Hmm… une odeur de dragon."),
    tx("Un jour, j’écrirai mes mémoires."), tx("Tu regardes ? Je fais de mon mieux !")],
  night: [tx("Il fait sombre…"), tx("Les étoiles sont belles ce soir."), tx("Je ne dors jamais, moi.")],
  legendary: [tx("Ça brille !"), tx("Légendaire ! Enfin !"), tx("Celui-là, je le garde.")],
  ko: [tx("Aïe… je reviens."), tx("Juste une égratignure."), tx("Je l’avais presque !")],
  record: [tx("Jamais allé aussi loin !"), tx("Terre inconnue !")],
  // (it. 1277) un champion vaincu (environ un monstre sur 200) : un moment rare, il le dit
  champion: [tx("Un champion de moins !"), tx("À genoux, champion !")],
  level: [tx("Je me sens plus fort !"), tx("Encore un niveau !")],
  event: [tx("Tu as vu ça ?"), tx("C’est le moment !"), tx("Profitons-en !")],
  // (it. 937) répliques propres à certains événements (les autres gardent les répliques communes ci-dessus)
  ev_goldrain: [tx("Il pleut de l’or !")],
  ev_starfall: [tx("Fais un vœu !")],
  ev_bloodmoon: [tx("La lune saigne… ils arrivent.")],
  ev_wind: [tx("J’ai des ailes !")],
  ev_hawkeye: [tx("Je ne peux plus rater !")],
  ev_nest: [tx("Des œufs partout !")],
  ev_goblinrush: [tx("Rendez-moi cet or !")],
  // (it. 982) les sept autres événements ont aussi leur réplique
  ev_frenzy: [tx("Plus vite, plus fort !")],
  ev_bounty: [tx("Un trésor à chaque coup !")],
  ev_wisdom: [tx("Je sens que j’apprends vite…")],
  ev_shardfall: [tx("Des éclats d’étoile, partout !")],
  ev_zeal: [tx("Les quêtes, au pas de course !")],
  ev_ward: [tx("Rien ne peut m’atteindre !")],
  ev_arcane: [tx("La magie coule à flots !")],
  ev_palemoon: [tx("Ils tiennent à peine debout !")], // (it. 1242)
  ev_spring: [tx("Je me sens revivre !")], // (it. 1375)
  ev_hoard: [tx("Ça brille sous chaque pas !")], // (it. 1439)
  ev_echo: [tx("Chaque coup compte double !")], // (it. 1304)
  poupouce: [tx("Poupouce ?! Pas possible…"), tx("C’est… Poupouce ?!")], // (it. 1558) monstre rare (data.js, POUPOUCE)
  poupouceBagFull: [tx("Le sac est plein : vite, une place pour le légendaire de Poupouce !")], // (it. 1767)
  poupouceDown: [tx("Pardon, Poupouce…"), tx("Reviens vite, Poupouce !")], // (it. 1654) vaincu
  colossal: [tx("Il est immense, celui-là…"), tx("Plus il est grand, plus il tombe de haut !")], // (it. 1625) premier Colossal
  eliteNew: [tx("Une de plus pour ma collection !"), tx("Celle-là, je ne l’avais jamais battue !")],
  setFull: [tx("Panoplie au complet !"), tx("Tout est assorti, enfin !")], // (it. 1037) palier de 4 pièces
  // (it. 1038) ascension, héros libéré, œuf trouvé
  ascend: [tx("Un nouveau départ, et plus fort !"), tx("Je connais ce chemin par cœur.")],
  // (it. 1162) palier de maîtrise, grand graphe ouvert puis rempli
  mastery: [tx("Ma maîtrise s’affine."), tx("Un nouveau palier !")],
  graphOpen: [tx("Tout un monde autour de la fleur…")],
  graphFull: [tx("Plus un seul chemin à tracer !")],
  freed: [tx("Un nouvel allié !"), tx("Libre, enfin ! Merci !")],
  egg: [tx("Un œuf ! Qu’est-ce qui va en sortir ?"), tx("Tiens, un œuf…")],
  bag: [tx("Mon sac déborde !"), tx("Plus de place dans le sac…"), tx("Il faudrait vider le sac !")],
  back: [tx("Te revoilà !"), tx("Tu m’as manqué !"), tx("J’ai bien avancé, tu as vu ?")],
  nemesis: [tx("Enfin !"), tx("Cette fois, c’est la bonne !"), tx("Je savais que j’y arriverais.")],
  // (it. 1223) une réplique par bénédiction du jour, dite quand elle commence
  dm_gold: [tx("Une journée en or s’annonce !")],
  dm_wisdom: [tx("Aujourd’hui, j’apprends tout.")],
  dm_hunt: [tx("Grande chasse ! Les élites n’ont qu’à bien se tenir.")],
  dm_wind: [tx("Le vent est avec moi aujourd’hui.")],
  dm_fury: [tx("Je bous d’impatience !")],
  dm_bulwark: [tx("Rien ne passera, aujourd’hui.")],
  dm_goblins: [tx("Les gobelins sont de sortie…")],
  dm_treasure: [tx("Des coffres partout, je le sens !")],
  dm_marvels: [tx("Il va se passer des choses, aujourd’hui…")],
  dm_shadows: [tx("Aujourd’hui, je danse avec les ombres.")],
  dm_champions: [tx("Les champions sont de sortie. À moi la couronne !")], // (it. 1268)
  dm_giants: [tx("Plus ils sont gros, plus ils tombent fort.")], // (it. 1292)
  dm_momentum: [tx("Le premier coup est le bon, aujourd’hui !")], // (it. 1314)
  dm_blood: [tx("Chaque coup me redonne des forces.")], // (it. 1378)
  dm_arcana: [tx("Mes sorts reviennent en un éclair aujourd’hui !")], // (it. 1412)
  dm_poupouce: [tx("Il paraît que Poupouce rôde partout aujourd’hui…")], // (it. 1586)
  dm_pets: [tx("Les familiers sont en pleine forme aujourd’hui !")], // (it. 1700)
};

export const STRIP_H = 120;
const GROUND = 96, CONTACT = 44;
/** Couleur du contour d'un monstre élite (doré) ou champion (violet). */
const eliteColor = (m) => (m.champion ? "#c08cff" : "#ffd34d");
/** Contour du bouclier du héros et de la carapace des boss. */
const SHIELD_BLUE = "#9fd8ff";
/** Halo des objets légendaires sur le héros. */
const LEGEND_GOLD = "#ffc23d";
/** Combat de boss : les barres de vie sous les pieds, à cette distance du sol (it. 580). */
const BOSS_BAR_DY = 5;
const LEFT = 24;            // position de départ du héros
const RIGHT_MARGIN = 300;   // le boss (2× plus large) s'arrête avant l'or, le niveau et les boutons
const HUD_L_W = 520, HUD_R_W = 260, HUD_H = 24;
const HUD_BAR_PILL = 224; // (it. 1531) largeur d'une pastille de barre de vie (styles.css .hudbar)
const CENTER_HUD_W = 2400; // au-delà : informations au milieu de la bande (écrans ultra-larges)
// Caractères pleine chasse (chinois, japonais, coréen, ponctuation « ！ ») : deux fois la largeur d'un chiffre.
const WIDE_CHARS = /[\u1100-\u11ff\u2e80-\u9fff\uac00-\ud7af\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]/g;

// (it. 708) « Champion rapide » / « Fast champion » / « Schneller Champion » : ordre de la langue (clé « Champion {0} »)
const upFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const MAX_DMG_FLOATS = 6;
const BOSS_OUTLINE = "rgba(232, 238, 255, 0.55)"; // (it. 1019)
const DARK_OUTLINE = "rgba(220, 228, 245, 0.35)"; // (it. 1020)
/** Entaille des rangs 2 à 4 avec sa lueur, dessinée une fois (it. 1065) : lame de 12 × 24 (quatre blocs en diagonale) et
 *  sa lame croisée, dans une marge de SLASH_M px pour la lueur ; mêmes ombres que les anciens filtres CSS. */
const SLASH_M = 22, slashCache = new Map();
/** Rayon du halo des projectiles par rang d'attaque (styles.css, .projglow ; it. 1066). */
const PROJ_GLOW = [0, 8, 10, 14, 22];
function bakedSlash(t, c) {
  const key = t + c;
  if (slashCache.has(key)) return slashCache.get(key);
  const K = 3, W = 12 + 2 * SLASH_M, H = 24 + 2 * SLASH_M;
  const canvas = () => { const cv = document.createElement("canvas"); cv.width = W * K; cv.height = H * K; return cv; };
  let cv = canvas();
  const x = cv.getContext("2d");
  x.fillStyle = c;
  for (let i = 0; i < 4; i++) { x.fillRect((SLASH_M + i * 3) * K, (SLASH_M + i * 6) * K, 3 * K, 6 * K); x.fillRect((SLASH_M + 9 - i * 3) * K, (SLASH_M + i * 6) * K, 3 * K, 6 * K); }
  // comme une suite de filtres CSS : chaque ombre s'applique à l'image déjà obtenue (lame + ombres précédentes)
  const glows = t === 2 ? [[c, 3]] : t === 3 ? [[c, 3], [c, 8]] : [["#fff", 4], [c, 10], [c, 18]];
  for (const [col, r] of glows) {
    const next = canvas(), y = next.getContext("2d");
    y.shadowColor = col; y.shadowBlur = r * K; y.drawImage(cv, 0, 0);
    cv = next;
  }
  const url = cv.toDataURL();
  slashCache.set(key, url);
  return url;
}

export class StripRenderer {
  constructor(container, game, { rightReserve = 0 } = {}) {
    this.root = container;
    this.game = game;
    this.rightReserve = rightReserve;
    this.W = 800; this.dpr = 0; this.cssDpr = 1;
    this.lunge = 0; this.flash = 0; this.monHit = 0; this.fadeT = 0; this.shakeT = 0; this.shakeK = "";
    this.lastDraw = 0;
    this.active = true;
    this.fx = [];
    this.slots = []; this.slotKey = null; this.corpse = null;
    this.layerKey = ""; this.hudLKey = ""; this.hudRKey = ""; this.xpKey = "";
    this.heroX = LEFT;

    this.base = makeCanvas(container, "layer base", false);
    this.stage = el("div", "stage", container);
    this.fxLayer = el("div", "fxlayer", container);
    this.fade = el("div", "fade", container);
    this.hudL = makeCanvas(container, "layer hud");
    this.hudR = makeCanvas(container, "layer hud");
    // (it. 1531, demande de Victor) barres de vie du héros et du monstre affronté dans la rangée d'informations
    this.hpHero = new HudBar(container, "hero"); this.hpMon = new HudBar(container, "mon"); this.monIcons = new Map();
    this.xp = el("div", "xpbar", container);
    this.xpFill = el("i", "", this.xp);

    this.ground = GROUND;
    this.juice = new Juice(this, container); // pièces, butin, bannières, événements
    this.resize();
    this.bindGameEvents();
  }

  /* ---------- Géométrie du parcours ---------- */
  /** (it. 1852) Combats de la série en cours : ses monstres (7 à 13) puis le boss. */
  fights() { return this.game.lineup().length + 1; }
  /** Abscisse du monstre du combat i (1..fights()) : la série occupe toute la bande, plus ou moins serrée. */
  fightX(i) { return LEFT + CONTACT + (this.W - LEFT - CONTACT - RIGHT_MARGIN) * i / this.fights(); }
  target() { return Math.min(this.game.S.kills + 1, this.fights()); }
  monX() { return this.fightX(this.target()); }

  bindGameEvents() {
    const g = this.game;
    g.on("heroAttack", ({ dmg, crit, mon, extra, first, iai }) => {
      this.lunge = 0.15; this.monHit = 0.12;
      // Lame du crépuscule (relique, it. 624) : les coups critiques prennent sa teinte violette
      const S = this.game.S, tier = attackTier(S), color = (crit || iai) && hasRelic(S, "blade") ? "#b48cff" : CLASS_FX[S.cls] || "#ffffff";
      const proj = this.game.classDef().projectile, py = mon.boss ? 40 : 66;
      if (proj) {
        this.projectile(proj, this.heroX + 30, this.monX() + 6, py, tier, color);
        if (tier >= 3 && !extra) { this.projectile(proj, this.heroX + 30, this.monX() + 6, py - 12, tier, color); this.projectile(proj, this.heroX + 30, this.monX() + 6, py + 9, tier, color); }
      }
      // Impact : étincelles à partir du palier 3, onde de choc au palier 5.
      if (this.active && this.juice.full && tier >= 2) {
        this.juice.sparkles(this.monX() + 12, py - 4, color, 3 + tier * 2);
        // (it. 993) flash et secousse des critiques au plus toutes les 1,5 s : en fin de partie (attaques rapides, beaucoup
        // de critiques), toute la bande clignotait et tremblait sans arrêt (voile plein écran recomposé à chaque image)
        const t = this.game.R.time;
        if (tier >= 4 && (crit || iai) && !(t - (this._critFxT ?? -9) < 1.5)) { this._critFxT = t; this.juice.flash(color, 0.12); this.shake(0.12); }
      }
      const label = (iai ? tx("Iai ! ") : first ? tx("Ouverture ") : crit ? tx("Crit ") : "") + fmt(dmg);
      this.float(this.monX() + 14 + (extra ? 12 : 0), (mon.boss ? 20 : 46) - (extra ? 10 : 0), label, crit || first ? "#ffe27a" : "#ffffff", crit || first, true);
    });
    g.on("tap", ({ dmg }) => {
      this.monHit = 0.1;
      this.float(this.monX() + 4 + Math.round(Math.random() * 20), 30 + Math.round(Math.random() * 16), fmt(dmg), "#9fd8ff", false, true);
      if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 12, this.ground - 30, "#9fd8ff", 4);
    });
    g.on("loot", ({ item }) => { if (item.r >= 4) this.say(SPEECH.legendary, true); });
    // Boss : la bannière « … approche ! » l'annonce déjà, et une bulle cacherait son nom (voir say()).
    g.on("heroDown", () => this.say(SPEECH.ko, true));
    g.on("zoneUp", ({ record }) => { if (record) this.say(SPEECH.record); });
    g.on("levelUp", () => { this.say(SPEECH.level); this.lvlFlash = g.R.time + 1.2; }); // (it. 1570) la jauge d'XP brille
    g.on("event", ({ id } = {}) => this.say(SPEECH["ev_" + id] || SPEECH.event));
    g.on("eliteNew", () => this.say(SPEECH.eliteNew)); // (it. 956)
    g.on("spawn", (m) => {
      // (it. 1558) ; (it. 1767) sac plein : son légendaire serait perdu (règle de Victor) : le héros prévient à temps
      if (m && m.poupouce) this.say(g.bagFull() ? SPEECH.poupouceBagFull : SPEECH.poupouce, true);
      else if (m && m.affix === "colossal" && !((g.S.stats || {}).affixesSeen || {}).colossal) this.say(SPEECH.colossal, true); // (it. 1625) tant qu'aucun n'est vaincu
      // (it. 1894) entrée en scène d'un boss de zone : il se dresse de toute sa hauteur, la bande tremble, « !! » (les
      // lieutenants et le Briseur ont leur propre mise en scène)
      if (m && m.boss && !m.final && !m.major) {
        this.mfx = { id: "bossIntro", phase: "go", t: 0, d: 0.9 };
        this.shake(0.15);
        this.float(this.monX() + 24, 8, "!!", "#ff9a7a", true);
      }
    });
    g.on("setBonus", ({ n }) => { if (n >= 4) this.say(SPEECH.setFull, true); }); // (it. 1037)
    g.on("masteryStep", () => this.say(SPEECH.mastery, true)); // (it. 1162) rare (une fois par palier dans la partie) : comme un grand moment
    g.on("graphOpen", () => this.say(SPEECH.graphOpen, true));
    g.on("graphFull", () => this.say(SPEECH.graphFull, true));
    g.on("ascend", () => setTimeout(() => this.say(SPEECH.ascend, true), 1500)); // (it. 1038) après le bandeau
    g.on("classUnlock", () => this.say(SPEECH.freed, true));
    g.on("egg", () => this.say(SPEECH.egg));
    g.on("bagFull", () => this.say(SPEECH.bag)); // ordinaire : au plus une réplique toutes les 45 s // ordinaire : pas de bulle sur le nom d'un boss
    g.on("bossNemesis", () => this.say(SPEECH.nemesis, true));
    g.on("bossDodge", () => this.float(this.monX() + 14, 40, tx("Raté !"), "#c8c8d8"));
    // (it. 1254) élite régénérante : sa vie qui remonte se voit (comme un nombre de dégâts : réglage « Nombres de dégâts »)
    g.on("monRegen", ({ amount } = {}) => { if (amount >= 1) this.float(this.monX() + 8, 50, "+" + fmt(Math.round(amount)), "#5fe0b0", false, true); });
    g.on("dodge", () => this.float(this.heroX + 16, 44, tx("Esquive"), "#9fd8ff"));
    g.on("riposte", ({ dmg }) => this.float(this.monX() + 14, 34, tx("Riposte ") + fmt(Math.round(dmg)), "#ffb07a"));
    g.on("potion", () => this.float(this.heroX + 16, 36, tx("Potion !"), "#ff8ad8", true));
    g.on("secondWind", () => this.float(this.heroX + 10, 36, tx("Second souffle !"), "#ffe27a", true));
    g.on("classChange", () => { this.heroCls = null; this.minionKey = null; });
    g.on("minion", () => { this.minionLunge = 0.2; });
    // Compagnon : coup (pose d'attaque) et, à distance, un projectile de sa classe vers le monstre.
    g.on("partnerHit", () => {
      this.partnerAtk = 0.25;
      const pd = CLASSES[this.partnerCls];
      if (pd && pd.projectile && this.partner && g.R.mon) this.projectile(pd.projectile, (this.partnerX || this.heroX) + 24, this.monX() + 6, g.R.mon.boss ? 46 : 70, 0, "#fff");
    });
    // (it. 1853) compétences des monstres (monskills.js) : le monstre combattu se prépare (« tell »), puis agit ; le
    // mouvement est appliqué dans la boucle des monstres (monSkillPose), le mot s'affiche quand il agit
    // (it. 1865) bandit : l'or volé file du héros vers lui (et revient quand il tombe)
    g.on("goldStolen", ({ amount }) => this.float(this.heroX + 10, 44, tx("{0} or", { 0: "−" + fmt(amount) }), "#ffd34d"));
    g.on("goldBack", ({ amount }) => this.float(this.heroX + 10, 44, tx("{0} or", { 0: "+" + fmt(amount) }), "#ffe27a"));
    g.on("monSkill", ({ id, el, phase }) => {
      // (it. 1860) garde : la pose dure toute la garde (carapace 2 s, parade 1,2 s)
      // (it. 1864) caché (embuscade, fouissement) : la pose dure toute la cachette ; « out » : il surgit
      this.mfx = { id, el, phase, t: 0, d: phase === "tell" ? 0.5 : id === "reassemble" ? 0.9 : id === "shell" ? 2 : id === "parry" ? 1.2 : id === "flutter" ? 2 : (id === "ambush" || id === "burrow") && phase === "go" ? 1.5 : 0.45 };
      if (phase === "out") { const w = { ambush: tx("Embuscade !"), burrow: tx("Il jaillit !") }[id]; if (w) this.float(this.monX() + 14, 18, w, MON_EL_COLOR[el] || MON_SKILL_COLOR[id], true); if (id === "burrow") this.shake(0.15); return; }
      // (it. 1885) annonce lisible : un petit « ! » de la couleur de la compétence au-dessus du monstre qui se prépare
      if (phase === "tell" && id !== "reassemble") this.float(this.monX() + 18, 26, "!", MON_EL_COLOR[el] || MON_SKILL_COLOR[id] || "#ffd34d");
      if (phase !== "go") return;
      const col = MON_EL_COLOR[el] || MON_SKILL_COLOR[id] || "#a8f07a", word = { leap: tx("Bond !"), dive: tx("Piqué !"), spores: tx("Spores !"), reassemble: tx("Il se reforme !"), sting: tx("Dard !"), howl: tx("Ahouuu !"), slam: tx("Poing de pierre !"), roots: tx("Enlacé !"), scream: tx("Cri !"), phase: tx("Intangible !"), fireball: tx("Boule de feu !"), swarm: tx("Grouillement !"), web: tx("Englué !"), tombcurse: tx("Malédiction !"), boulder: tx("Bloc de glace !"), feathers: tx("Plumes !"), flare: tx("Flambée !"), shell: tx("Carapace !"), parry: tx("Parade !"), riposte: tx("Riposte !"), rootdeep: tx("Enracinement !"), breath: tx("Souffle !"), gaze: tx("Pétrifié !"), tongue: tx("Coup de langue !"), strike: tx("Frappe éclair !"), pinch: tx("Coincé !"), charge: tx("Charge !"), roar: tx("Grrraah !"), rage: tx("Rage !"), sacrifice: tx("Sacrifice !"), flutter: tx("Vol erratique !"), shock: tx("Décharge !"), ambush: tx("Disparu !"), burrow: tx("Sous terre !"), peck: tx("Aveuglé !"), chomp: tx("Clac !"), pickpocket: tx("Vol à la tire !"), pollen: tx("Engourdi !"), thrust: tx("Estoc !"), bomb: tx("Boum !") }[id];
      // (it. 1865) pollen : poussière lumineuse sur le héros ; bombe : explosion et secousse
      if (id === "pollen" && this.active && this.juice.full) this.juice.sparkles(this.heroX + 14, this.ground - 30, "#b8ffd8", 14);
      if (id === "bomb") { this.shake(0.18); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 16, this.ground - 22, "#ffb03a", 16); }
      // (it. 1864) sacrifice : le sang du cultiste ; décharge : éclairs sur le héros ; fouissement : terre soulevée
      if (id === "sacrifice" && this.active && this.juice.full) { this.juice.sparkles(this.monX() + 14, this.ground - 24, "#c0202a", 10); this.juice.sparkles(this.heroX + 16, this.ground - 30, "#ff4a5a", 10); }
      if (id === "shock" && this.active && this.juice.full) this.juice.sparkles(this.heroX + 16, this.ground - 34, el ? col : "#fff6a8", 14);
      if (id === "burrow" && this.active && this.juice.full) this.juice.sparkles(this.monX() + 16, this.ground - 2, "#c9a06a", 12);
      // (it. 1863) charge : poussière et secousse ; rugissement : petite secousse ; rage : vapeur rouge autour de l'orc
      if (id === "charge") { this.shake(0.15); if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 20, this.ground - 4, "#c9b89a", 10); }
      if (id === "roar") this.shake(0.1);
      if (id === "rage" && this.active && this.juice.full) this.juice.sparkles(this.monX() + 14, this.ground - 30, "#ff5a4a", 12);
      // (it. 1862) souffle : un jet d'étincelles de la gueule au héros ; langue : une ligne rose qui claque jusqu'au héros
      if (id === "breath" && this.active && this.juice.full) for (let i = 0; i < 5; i++) this.juice.sparkles(this.heroX + 18 + (this.monX() - this.heroX - 18) * i / 5, this.ground - 30 - i, el ? col : "#ffb03a", 3);
      if (id === "tongue" && this.active && this.juice.full) for (let i = 0; i < 4; i++) this.juice.sparkles(this.heroX + 20 + (this.monX() - this.heroX - 20) * i / 4, this.ground - 14, "#ff8ab0", 2);
      // (it. 1860) flambée : gerbe de flammes autour de l'élémentaire ; enracinement : sève verte qui monte du sol
      if (id === "flare") { this.shake(0.12); if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 14, this.ground - 26, "#ffb03a", 16); }
      if (id === "rootdeep" && this.active && this.juice.full) this.juice.sparkles(this.monX() + 16, this.ground - 6, "#8fd36a", 12);
      // (it. 1859) bloc de glace : éclats blancs sur le héros, secousse ; plumes : une traînée de plumes jusqu'au héros
      if (id === "boulder") { this.shake(0.15); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 16, this.ground - 30, "#e8f6ff", 14); }
      if (id === "feathers" && this.active && this.juice.full) for (let i = 0; i < 4; i++) this.juice.sparkles(this.heroX + 20 + (this.monX() - this.heroX - 20) * i / 4, this.ground - 34 + i * 3, "#f0d8b0", 3);
      // (it. 1858) boule de feu : la flamme part des mains du diablotin et éclate sur le héros ; toile : fils sur le héros
      if (id === "fireball" && this.active && this.juice.full) { this.juice.sparkles(this.monX() + 8, this.ground - 30, el ? col : "#ff8a3a", 10); this.juice.sparkles(this.heroX + 16, this.ground - 30, el ? col : "#ffd34d", 12); }
      if (id === "web" && this.active && this.juice.full) this.juice.sparkles(this.heroX + 14, this.ground - 28, "#f4f4f8", 14);
      if (id === "scream") this.shake(0.12);
      // (it. 1856) la meute répond : les loups qui attendent dans la file relèvent la tête un instant
      if (id === "howl") for (const a of this.slots) if (a.art === "wolf") a.howlT = 0.7 + Math.random() * 0.4;
      if (id === "slam") this.shake(0.15);
      // (it. 1874) version de boss : mot dans la couleur des boss, secousse et gerbe d'étincelles autour de lui
      const bossSk = !!(this.game.R.mon && this.game.R.mon.boss);
      // (it. 1899) élite : mot doré, champion : violet (comme leur contour)
      const rm = this.game.R.mon, rankCol = bossSk ? "#ff9a7a" : rm && rm.champion ? "#c08cff" : rm && rm.elite ? "#ffd34d" : col;
      if (word) this.float(this.monX() + 14, bossSk ? 10 : 18, word, rankCol, true);
      if (bossSk) { this.shake(0.2); if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 24, this.ground - 40, "#ff9a7a", 14); }
      if (this.active && this.juice.full) {
        this.juice.sparkles(this.heroX + 18, this.ground - 24, col, 8);
        // (it. 1854) spores : le nuage part du champignon et enveloppe le héros
        if (id === "spores") { this.juice.sparkles(this.monX() + 14, this.ground - 18, col, 12); this.juice.sparkles(this.heroX + 10, this.ground - 34, col, 10); }
      }
    });
    g.on("bossSkill", ({ id }) => {
      const label = { enrage: [tx("ENRAGÉ !"), "#ff4a4a"], shell: [tx("Carapace !"), "#9fd8ff"], mirror: [tx("Miroir !"), "#e0d8ff"], frost: [tx("Gelé !"), "#bfe8ff"], smash: ["", ""], fury: [tx("Fureur !"), "#ff9a4a"], bulwark: [tx("Peau de pierre brisée !"), "#c9ced6"], curse: [tx("Maudit !"), "#b07cff"], curseBlocked: [tx("Malédiction repoussée !"), "#bfefff"], venomBlocked: [tx("Venin repoussé !"), "#bfefff"], tenacious: [tx("Il se relève !"), "#ff9a4a"] }[id];
      if (id === "tenacious") { this.shake(0.25); if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 20, this.ground - 30, "#ff9a4a", 10); }
      if (id === "venom") { this.float(this.heroX + 10, 30, tx("Empoisonné !"), "#8fe36a", true); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 18, this.ground - 30, "#8fe36a", 8); return; }
      if (id === "silence") { this.float(this.heroX + 10, 30, tx("Silence !"), "#c9b8f0", true); return; }
      // (it. 1849) pouvoirs uniques des lieutenants et du Briseur
      if (id === "chains") { this.float(this.heroX + 10, 30, tx("Enchaîné !"), "#c8ccd4", true); this.shake(0.12); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 18, this.ground - 30, "#c08a3a", 8); return; }
      if (id === "ashes") { this.float(this.monX() + 20, 14, tx("Renaît des cendres !"), "#ff9a3a", true); this.shake(0.2); if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 20, this.ground - 30, "#ff7a2a", 14); return; }
      if (id === "eclipse") { this.float(this.heroX + 10, 30, tx("Éclipse !"), "#c88cff", true); if (this.active && this.juice.full) this.juice.sparkles(this.monX() + 20, this.ground - 40, "#ffd25a", 10); return; }
      if (id === "shards") { this.float(this.monX() + 20, 14, tx("Ciel brisé !"), "#7ff3ff", true); this.shake(0.18); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 18, this.ground - 50, "#ffe27a", 14); return; }
      // (it. 1382) élite explosive : éclat orange sur le héros
      if (id === "explode") { this.float(this.heroX + 10, 30, tx("Explosion !"), "#ff6a3a", true); this.shake(0.2); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 18, this.ground - 30, "#ff6a3a", 10); return; }
      if (id === "frost") { this.float(this.heroX + 10, 30, tx("Gelé !"), "#bfe8ff", true); if (this.active && this.juice.full) this.juice.sparkles(this.heroX + 18, this.ground - 30, "#bfe8ff", 8); return; }
      if (label && label[0]) this.float(this.monX() + 20, 14, label[0], label[1], true);
    });
    // Sorts (demande D) : chacun son animation ; dégâts en chiffres de la couleur du sort.
    // Sorts (demandes D et I : « spectaculaires et bien visibles ») : nom du sort en grand, puis l'effet de sa
    // mécanique (éclair zébré pleine hauteur, croissants de lame, boule de feu qui explose, météore avec traînée,
    // colonne de soin, dôme de bouclier) ; dégâts en gros chiffres de la couleur du héros.
    g.on("spell", ({ id, dmg, amount, partner, echo, crit }) => {
      if (!this.active) return;
      const sp = SPELL_INDEX[id]; if (!sp) return;
      this.spellFx(sp, dmg, amount, partner);
      // Effets marquants (demande Q) : un mot au-dessus du monstre
      if (sp.stun) this.float(this.monX() + 14, 14, tx("Étourdi !"), "#fff6a8", true);
      if (echo) this.float(this.monX() + 14, 20, tx("Écho !"), sp.color, true);
      else if (crit) this.float(this.monX() + 14, 20, tx("Critique !"), "#ffd34d", true);
    });
    // Nouveau sort appris (rang 1) : un bandeau de fête dans la bande, avec l'icône du sort.
    g.on("spellLearned", ({ id, rank }) => {
      const sp = SPELL_INDEX[id]; if (!sp || !this.active) return;
      // Palier (tous les 10 rangs, it. 507) : la recharge raccourcit, un bandeau le dit.
      if (rank > 1 && rank % 10 === 0) { this.juice.banner(tx("{0} : recharge −10 % !", { 0: tr(sp.name) }), sp.color, this.heroX + 80, false); return; }
      if (rank !== 1) return;
      this.juice.banner(tx("Nouveau sort : {0} !", { 0: tr(sp.name) }), sp.color, this.heroX + 80, true);
      const ic = el("div", "spellfx icon", this.fxLayer); const im = el("img", "", ic); im.src = spellIconURL(sp.tpl, sp.color, 3, sp.fx?.[0]); this.addFx(ic, this.heroX + 2, 4, 1.4, 26);
      if (this.juice.full) this.juice.sparkles(this.heroX + 16, this.ground - 30, sp.color, 10);
    });
    // Sort perçant (demande H) : le monstre suivant arrive déjà blessé.
    // Perçage (demandes L et R) : au lancer, le trait file jusqu'à chaque monstre traversé de la file ; à l'impact, ses
    // dégâts s'affichent sur lui et sa barre de vie entamée apparaît (il arrivera blessé).
    g.on("pierced", ({ dmg, id, slot, k = 1 }) => {
      if (!this.active || slot == null) return;
      const c = SPELL_INDEX[id]?.color || "#bfefff", hx = this.monX() + 10, tx0 = this.fightX(slot + 1) + 14;
      const fly = Math.max(0.1, Math.min(0.28, (tx0 - hx) / 900)), delay = 60 + (k - 1) * 90;
      setTimeout(() => {
        if (!this.active) return;
        const n = el("div", "spellfx slash pierce", this.fxLayer); n.style.setProperty("--c", c); el("i", "", n); this.addFx(n, hx, 48, fly, 0, Math.max(10, tx0 - hx));
        setTimeout(() => {
          if (!this.active) return;
          // (it. 996) chaîne de perçage : anneau, étincelles et mot « transpercé » sur le premier monstre seulement, un simple
          // nombre plus discret sur les suivants (en fin de partie, « −3 M · transpercé » couvrait toute la file)
          if (this.juice.full && k === 1) { const r = el("div", "spellfx ring", this.fxLayer); r.style.setProperty("--c", c); el("i", "", r); this.addFx(r, tx0 - 8, this.ground - 26, 0.5, 0); this.juice.sparkles(tx0, this.ground - 26, c, 5); }
          if (this.game.S.settings.damageNumbers !== false) this.float(tx0, 30, "-" + fmt(Math.round(dmg)) + (k === 1 ? " · " + tx("transpercé") : ""), "#bfefff", k === 1, true);
          const a = this.slots[slot]; if (a && a.bar) { a.bar.visible(true); a.bar.set(this.game.slotHealth(slot)); }
        }, fly * 1000);
      }, delay);
    });
    // Drone stellaire (demande S) : un missile bleu du drone jusqu'au monstre, ses dégâts au-dessus.
    g.on("droneShot", ({ dmg }) => {
      if (!this.active) return;
      const hx = this.heroX - 8, mx = this.monX() + 14;
      const n = el("div", "spellfx slash pierce", this.fxLayer); n.style.setProperty("--c", "#3fa9ff"); el("i", "", n); this.addFx(n, hx, 22, 0.18, 0, Math.max(10, mx - hx));
      if (this.game.S.settings.damageNumbers !== false) setTimeout(() => { if (this.active) this.float(mx, 24, "-" + fmt(Math.round(dmg)), "#7fc8ff"); }, 180);
    });
    // Relique obtenue : grand bandeau, étincelles ; le héros la porte aussitôt (syncHero).
    g.on("relic", ({ id }) => {
      if (!this.active || !RELICS[id]) return;
      this.juice.banner(tx("Relique obtenue : {0} !", { 0: tx(RELICS[id].name) }), "#ffd34d", this.heroX + 80, true);
      if (this.juice.full) this.juice.sparkles(this.heroX + 16, this.ground - 30, "#ffd34d", 14);
      this.shake(0.3);
    });
    // Cœur de l'aube (it. 621) : la vie regagnée, en vert, toutes les 3 s de combat.
    g.on("relicHeal", ({ amount }) => {
      if (!this.active || this.game.S.settings.damageNumbers === false) return;
      this.float(this.heroX - 6, 58, "+" + fmt(Math.round(amount)), "#7dff9a"); // à gauche, près du cœur : loin des nombres de dégâts
    });
    // Relique renforcée (it. 608) : nouvelle victoire contre son gardien.
    g.on("relicUp", ({ id, lv }) => {
      if (!this.active || !RELICS[id]) return;
      this.juice.banner(`✦ ${tx("{0} : niveau {1} !", { 0: tx(RELICS[id].name), 1: lv })}`, "#ffd34d", this.heroX + 80, true);
    });
    g.on("telegraph", () => this.float(this.monX() + 20, 6, "!", "#ffe27a", true));
    g.on("smash", ({ dmg }) => { this.shake(0.3); this.flash = 0.25; this.float(this.heroX + 16, 36, "-" + fmt(Math.round(dmg)) + fsp() + "!", "#ff4a4a", true); });
    g.on("bossShieldHit", () => { this.monHit = 0.06; });
    g.on("mirrorHit", ({ dmg }) => { this.flash = Math.max(this.flash, 0.08); this.float(this.heroX + 16, 44, "-" + fmt(Math.round(dmg)), "#e0d8ff", false, true); });
    g.on("flee", ({ mon }) => {
      this.float(this.monX() + 14, 40, tx("Il s’enfuit !"), "#ffd34d", true);
      if (this.active) this.makeCorpse(mon, this.monX());
    });
    g.on("egg", () => this.float(this.heroX + 16, 30, tx("Un œuf !"), "#ffe27a", true));
    g.on("petLevel", ({ pet }) => this.float(this.heroX - 10, 50, pet.name + tx(" monte de niveau"), "#9fe0a8"));
    g.on("questDone", () => this.float(this.heroX + 16, 30, tx("Quête accomplie !"), "#9fd8ff", true));
    g.on("loot", ({ item }) => { if (item.r >= 4) this.shake(0.3); });
    g.on("chest", () => this.shake(0.2));
    g.on("heroHurt", ({ dmg }) => { this.flash = 0.12; this.float(this.heroX + 16, 44, "-" + fmt(Math.round(dmg)), "#ff7a6b", false, true); });
    g.on("kill", ({ mon, gold }) => {
      if (mon.boss || mon.champion) this.shake(0.35);
      if (mon.champion && !mon.boss) this.say(SPEECH.champion);
      // (it. 1654) Poupouce vaincu : la réplique remplace celle de son arrivée (souvent dite il y a moins de 6 s)
      if (mon.poupouce) { this.saidAt = -1e9; this.say(SPEECH.poupouceDown, true); }
      this.float(this.monX() + 10, 50, "+" + tx("{0} or", { 0: fmt(gold) }), "#ffd34d");
      if (this.active) this.makeCorpse(mon, this.monX());
    });

    g.on("heroDown", () => this.float(this.heroX + 6, 40, "K.O.", "#ff7a6b", true));
    // (it. 1867, journée des monstres : comportements de groupe) mort d'un voisin : les suivants de la file sursautent et
    // reculent d'un pas (les craintifs plus loin) ; héros à terre : la file sautille de joie, chacun à son tour
    g.on("kill", () => {
      // l'événement part avant que le compte avance : le mort est à S.kills, ses voisins juste après
      const k0 = Math.min(this.game.S.kills + 1, this.slots.length - 1);
      // (it. 1913) un membre de la meute tombe : ses congénères ne reculent pas, ils s'avancent, furieux (« ! » rouge)
      const dead = this.slots[k0 - 1], packId = dead ? dead.packSeed ?? dead.lifeSeed : null;
      let shouted = false;
      for (let k = k0; k < Math.min(k0 + 3, this.slots.length - 1); k++) {
        const a = this.slots[k]; if (!a) continue;
        if (a.packSeed != null && a.packSeed === packId) {
          a.react = { kind: "fury", t: 0, d: 0.9, delay: (k - k0) * 0.1 };
          if (!shouted && a.tx) { shouted = true; const [fx, fy] = a.tx.split(",").map(Number); this.float(fx + a.w / 2, fy - 4, "!", "#ff5a4a", true); }
          continue;
        }
        if (a.brave) continue;
        a.react = { kind: "startle", t: 0, d: 0.7 + (k - k0) * 0.1, far: TIMID.has(a.art) ? 2 : 1, delay: (k - k0) * 0.08 };
      }
    });
    g.on("heroDown", () => {
      for (let k = 0; k < this.slots.length; k++) { const a = this.slots[k]; if (a) a.react = { kind: "cheer", t: 0, d: 1.2, delay: (k % 4) * 0.12 }; }
    });
    // (it. 1882) un sort du héros impressionne la file : les deux suivants sursautent
    g.on("spell", ({ partner }) => {
      if (partner) return;
      const k0 = Math.min(this.game.S.kills + 1, this.slots.length - 1);
      for (let k = k0; k < Math.min(k0 + 2, this.slots.length - 1); k++) { const a = this.slots[k]; if (a && !a.react && !a.brave) a.react = { kind: "startle", t: 0, d: 0.6, far: TIMID.has(a.art) ? 2 : 1, delay: (k - k0) * 0.1 }; }
    });
  }

  /* ---------- Répliques du héros ---------- */
  /** Le héros dit une réplique tirée de la liste (au plus une toutes les 45 s, sauf si urgent). */
  /** Retour du joueur après une absence : le héros l'accueille. */
  welcomeBack() { this.say(SPEECH.back); }
  /** (it. 1223) Bénédiction du jour qui commence : la réplique du héros (urgente : passe même après « Te revoilà ! »). */
  dayLine(mod) { this.say(SPEECH["dm_" + mod], true); } // réplique ordinaire : jamais sur le nom d'un boss

  say(list, urgent = false) {
    if (!this.active || this.game.S.settings.fullEffects === false || !list) return;
    if (this.juice && this.juice.npcScene()) return; // (it. 1216) le PNJ parle : le héros ne commente pas un combat masqué
    const now = this.game.R.time;
    if (!urgent && now - (this.saidAt ?? -1e9) < 45) return;
    const G = this.game; // pas de bulle sur le nom du boss (présent, ou le prochain monstre)
    if (!urgent && ((G.R.mon && G.R.mon.boss) || G.S.kills >= G.lineup().length)) return;
    if (urgent && now - (this.saidAt ?? -1e9) < 6) return;
    this.saidAt = now;
    this.bubble.textContent = list[Math.floor(Math.random() * list.length)];
    this.bubble.hidden = false;
    this.bubbleT = 3.5;
    this.bubbleUrgent = urgent;
    this.bubbleX = null;
    this.bubbleW = this.bubble.offsetWidth || 0; // mesurée une fois par réplique
    this.bubbleH = this.bubble.offsetHeight || 20;
    mark("speech");
  }
  updateSpeech(dt, x) {
    if (this.bubbleT > 0) {
      this.bubbleT -= dt;
      // Réplique ordinaire dite juste avant l'arrivée d'un boss (passage de niveau au dernier monstre) : elle cachait
      // son nom pendant 3 s (vu it. 859, premier boss d'une partie neuve) ; elle s'efface dès qu'il est là.
      const bm = this.game.R.mon;
      if (!this.bubbleUrgent && bm && bm.boss) this.bubbleT = 0;
      if (this.bubbleT <= 0) { this.bubble.hidden = true; mark("speech"); return; }
      let bx = q(x + this.hero.w / 2);
      if (this.centerHud && this.hudSpan && this.bubbleW) { // informations au milieu : la bulle passe à côté du bloc
        const [a, b] = this.hudSpan, half = this.bubbleW / 2;
        if (bx + half > a - 4 && bx - half < b + 4) bx = q(bx < (a + b) / 2 ? a - 4 - half : b + 4 + half);
      } else {
        // En début de zone, la bulle passerait sur la pastille de zone (en haut à gauche) : on la décale à sa droite.
        if (this.bubbleW && this.hudLRight && bx - this.bubbleW / 2 < this.hudLRight + 4) bx = q(this.hudLRight + 4 + this.bubbleW / 2);
        // Près du bord droit : pas sur la pastille or / niveau.
        if (this.bubbleW && this.hudRLeft && bx + this.bubbleW / 2 > this.hudRLeft - 4) bx = q(this.hudRLeft - 4 - this.bubbleW / 2);
      }
      if (bx !== this.bubbleX) { this.bubbleX = bx; this.bubble.style.transform = `translate3d(${bx}px,${GROUND - this.hero.h - 30}px,0) translateX(-50%)`; mark("speech"); }
    } else if (this.game.R.mode === "walk" && Math.random() < dt / 240) {
      const night = this.nightLevel().night >= 0.8;
      this.say(night && Math.random() < 0.4 ? SPEECH.night : SPEECH.idle);
    }
  }

  /* ---------- Effets (animés par la boucle à 30 FPS) ---------- */
  float(x, y, txt, col, big, isDamage) {
    if (!this.active) return;
    if (this.juice && this.juice.npcScene()) return; // (it. 1215) rencontre d'un PNJ : pas de nombres sans monstre
    if (isDamage && this.game.S.settings.damageNumbers === false) return;
    // (it. 997) en fin de partie (coups, sorts, compagnon, drone), une douzaine de nombres montaient en même temps : les
    // petits nombres de dégâts ordinaires s'arrêtent à MAX_DMG_FLOATS visibles ; les grands (critiques, mots) passent
    if (isDamage && !big && this.fx.reduce((a, e) => a + (e.box ? 1 : 0), 0) >= MAX_DMG_FLOATS) return;
    // Face à un boss, les nombres partent plus bas : en montant, ils ne recouvrent plus son nom (en haut de la bande).
    const m = this.game.R.mon;
    const nearBoss = m && m.boss && Math.abs(x - this.monX()) < 90;
    if (nearBoss) y = Math.max(y, 46);
    // (it. 1571) sous une pastille de la rangée du haut (zone, barres de vie, or) : même départ bas, pour finir sa montée
    // (22 px) sous la rangée plutôt que sur la pastille
    const hb = this.hudBands(), underHud = hb.bands.some(([a, b]) => x > a - 20 && x < b + 20);
    if (!nearBoss && underHud) y = Math.max(y, hb.h + 20);
    // Nombres qui tombent au même endroit au même instant (fin de partie : coup, critique et dégâts reçus) : chacun
    // cherche une place libre parmi les nombres encore jeunes, au-dessus puis au-dessous, sinon de côté (it. 846).
    // Largeur estimée sans mesure de mise en page : les caractères chinois, japonais et coréens sont deux fois plus larges
    // (it. 862 : « 会心 116k » et « 凍結！ » se recouvraient au-dessus du héros, comptés comme des chiffres).
    const str = String(txt), wide = (str.match(WIDE_CHARS) || []).length;
    // (la police de secours de ces écritures est aussi un peu plus haute : 21 px au lieu de 19 en grand).
    const w = (str.length + wide) * (big ? 8 : 7) + 4, h = (big ? 19 : 17) + (wide ? 2 : 0);
    // (it. 860) …ni, décalés de côté ou en montant, sur la fin de son nom ou la relique qu'il garde.
    // (it. 1562) le nom du boss s'étend vers la gauche au-dessus du héros : les nombres du héros (critiques, esquives),
    // loin du boss, montaient dessus ; ils l'évitent dès que le nom est affiché (combat du boss, ou boss en attente au
    // bout de la file)
    // (it. 1653) la bulle de parole du héros aussi : en fin de partie, le nom d'un sort (« Volley of Arr… ») passait dessous
    const obs = [...(this.bossTag && this.bossTag.isConnected ? this.bossObstacles() : []), ...this.speechObstacle()];
    const at = this.freeSpot(x, y - (big ? 14 : 12), w, h, nearBoss || underHud ? y - (big ? 14 : 12) : 0, obs.length ? obs : null);
    const f = el("div", "float" + (big ? " big" : ""), this.fxLayer);
    f.textContent = txt;
    f.style.color = col;
    // (it. 1591) sous une pastille du haut (près du boss aussi) : la montée s'arrête sous la rangée
    // (it. 1641, 1651) ailleurs, un nombre empilé tout en haut montait encore de 22 px et sortait de la fenêtre, coupé à
    // moitié (revues en coréen et en anglais) : il naît à y ≥ 0 et sa montée s'arrête 2 px au-dessus du bord au plus
    this.addFx(f, at.x, at.y, 1, underHud ? Math.max(4, Math.min(22, at.y - hb.h - 2)) : Math.max(4, Math.min(22, at.y + 2)));
    const e = this.fx[this.fx.length - 1];
    e.box = { x: at.x, y: at.y, w, h };
  }

  /** Place la plus proche de (x, y) où un texte w × h (centré sur x) ne recouvre aucun nombre flottant récent. */
  freeSpot(x, y, w, h, minY = 0, obs = null) { // (it. 1651) 0 et non −6 : le nombre le plus haut naissait déjà coupé
    const live = this.fx.filter((f) => f.box && f.t < 0.7);
    if (!live.length && !obs?.length) return { x, y };
    // Obstacles fixes (nom du boss, relique) : le texte ne doit pas les toucher tant qu'il est bien visible, c'est-à-dire
    // jusqu'aux deux tiers de sa montée (22 px ; ensuite il est presque effacé).
    const lift = 15;
    const hits = (cx, cy) => live.some((f) => {
      const b = f.box, bx = b.x + (f.x || 0), by = b.y + (f.y || 0);
      return Math.abs(cx - bx) * 2 < w + b.w && cy < by + b.h && by < cy + h;
    }) || (obs && obs.some((o) => cx - w / 2 < o.r && o.l < cx + w / 2 && cy - lift < o.b && o.t < cy + h));
    // D'abord empilés (au-dessus, au-dessous), puis de côté (face à un boss, il n'y a de place que pour 2 ou 3 rangées).
    // (it. 1070, demande de Victor) les nombres partaient trop loin à droite du monstre : en fin de partie, un sur trois
    // était décalé d'un à trois pas de côté (≈ 60 à 180 px), toujours à droite d'abord. Maintenant : toutes les rangées
    // au-dessus du point, puis au-dessous, puis de petits pas de côté (demi-largeur + 4 px, deux au plus), à gauche et à
    // droite tour à tour ; sinon sur place. Face à un boss (obstacles : son nom, large, au-dessus de lui), les anciens
    // grands pas : il faut sortir de la largeur du nom.
    const boss = !!obs?.length, rows = boss ? [0, -h, h, -2 * h, 2 * h, 3 * h] : [0, -h, -2 * h, -3 * h, h, 2 * h, 3 * h];
    const side = Math.round(w * 0.5) + (boss ? 16 : 4);
    for (const dx of boss ? [0, side, -side, 2 * side, -2 * side, 3 * side] : [0, -side, side, -2 * side, 2 * side]) for (const dy of rows) {
      const cx = x + dx, cy = Math.max(minY, Math.min(GROUND - h - 4, y + dy));
      if (!hits(cx, cy)) return { x: cx, y: cy };
    }
    return { x, y };
  }

  /** Nom du boss et relique qu'il garde, en coordonnées de la couche des effets (mesurés une fois par série de monstres
   *  ou après un déplacement du nom : pas de mesure de mise en page à chaque nombre). */
  /** (it. 1653) Rectangle de la bulle de parole affichée (vide sinon), dans les coordonnées des effets. */
  speechObstacle() {
    if (this.bubble.hidden || this.bubbleX == null || !this.bubbleW) return [];
    const t = GROUND - this.hero.h - 30;
    return [{ l: this.bubbleX - this.bubbleW / 2 - 2, r: this.bubbleX + this.bubbleW / 2 + 2, t: t - 2, b: t + (this.bubbleH || 20) + 2 }];
  }

  bossObstacles() {
    if (this.bossObs) return this.bossObs;
    const base = this.fxLayer.getBoundingClientRect();
    this.bossObs = [this.bossTag, this.bossRelic].filter((e) => e && e.isConnected).map((e) => e.getBoundingClientRect())
      .filter((r) => r.width).map((r) => ({ l: r.left - base.left - 2, r: r.right - base.left + 2, t: r.top - base.top - 2, b: r.bottom - base.top + 2 }));
    return this.bossObs;
  }

  loot(x, y, color) {
    if (!this.active) return;
    const f = el("div", "loot", this.fxLayer);
    f.style.background = color;
    this.addFx(f, x, y, 1.2, 26);
  }

  /** Flèche ou boule de feu, du héros jusqu'au monstre. */
  /** Effet visuel d'un sort (voir g.on("spell")). */
  spellFx(sp, dmg, amount, partner = false) {
    const tpl = sp.tpl, c = sp.color, full = this.juice.full, G = this.ground;
    // Sort du compagnon (it. 513) : part de sa position.
    const mx = this.monX() + 14, hx = (partner && this.partnerX ? this.partnerX : this.heroX) + 16;
    const fx = (cls, x, y, life, rise = 0, dx = 0) => { const n = el("div", "spellfx " + cls, this.fxLayer); n.style.setProperty("--c", c); el("i", "", n); this.addFx(n, x, y, life, rise, dx); return n; };
    // « Effets complets » décoché (Réglages) : sorts sobres, sans anneaux ni dôme (moins de calcul).
    const ring = (x, y, big) => (full ? fx("ring" + (big ? " big" : ""), x, y, 0.6) : null);
    const later = (ms, f) => setTimeout(() => { if (this.active) f(); }, ms);
    this.float(hx, 2, tr(sp.name), c, true); // le nom du sort, en grand
    // Sort maîtrisé (rang maximal, it. 544) : un éclat d'étoiles dorées autour du lanceur.
    if (full && spellRank(this.game.S, sp.id) >= SPELL_MAX) this.juice.sparkles(hx, this.ground - 34, "#ffd34d", 8);
    { const ic = el("div", "spellfx icon", this.fxLayer); const im = el("img", "", ic); im.src = spellIconURL(tpl, c, 3, sp.fx?.[0]); this.addFx(ic, hx - 14, 6, 0.9, 18); } // son icône, qui monte
    if (tpl === "bolt") {
      fx("bolt", mx - 4, 0, 0.45); this.flash = Math.max(this.flash, 0.22);
      later(60, () => fx("bolt", mx + 6, 0, 0.35)); ring(mx + 6, G - 20);
      if (full) this.juice.sparkles(mx + 6, G - 22, c, 8);
    } else if (tpl === "gust") {
      for (let k = 0; k < 3; k++) later(k * 70, () => fx("slash", hx + 10, 44 + k * 10, 0.3, 0, mx - hx - 6));
      later(260, () => { ring(mx + 6, G - 26); if (full) this.juice.sparkles(mx + 6, G - 26, c, 6); });
    } else if (tpl === "fire") {
      fx("fireball", hx + 10, 48, 0.28, 0, mx - hx - 6);
      later(270, () => { ring(mx + 6, G - 26, true); this.flash = Math.max(this.flash, 0.15); if (full) this.juice.sparkles(mx + 6, G - 26, c, 10); });
    } else if (tpl === "meteor") {
      fx("meteor", mx - 90, -20, 0.4, -(G - 20), 90);
      later(380, () => { ring(mx + 6, G - 16, true); later(80, () => ring(mx + 6, G - 16, true)); this.shake(0.4); this.flash = Math.max(this.flash, 0.3); if (full) this.juice.sparkles(mx + 6, G - 18, c, 13); });
    } else if (tpl === "mend") {
      if (full) fx("column", hx - 10, G - 90, 0.7, 20); ring(hx, G - 26);
      if (full) this.juice.sparkles(hx, G - 30, c, 7);
      if (amount > 0) this.float(hx, 40, "+" + fmt(Math.round(amount)), "#7dff9a", true, true);
    } else if (tpl === "aegis") {
      if (full) fx("dome", hx - 30, G - 66, 0.9); if (full) this.juice.sparkles(hx, G - 30, "#bfefff", 7);
    }
    // Perçant : le trait continue sa course au-delà du monstre, vers le suivant.
    if (dmg > 0 && this.game.S.settings.damageNumbers !== false) later(tpl === "meteor" ? 380 : tpl === "fire" ? 270 : 0, () => this.float(mx, 26, "-" + fmt(Math.round(dmg)), c, true, true));
  }

  projectile(kind, x0, x1, y, tier = 0, color = "#fff") {
    if (!this.active) return;
    // (it. 1066) lueur des rangs 1 à 4 : un halo en dégradé radial qui voyage derrière le projectile (peint une fois),
    // plus de filtre drop-shadow : jusqu'à trois ombres sur trois projectiles par coup, recalculées à chaque image,
    // ≈ 7 points d'un cœur en fin de partie avec un héros à distance (31,5 → 24,5 %)
    if (tier >= 1) {
      const R = PROJ_GLOW[tier], g = el("div", "projglow t" + tier, this.fxLayer);
      g.style.setProperty("--c", color);
      this.addFx(g, x0 + 6 - R, y + 3 - R, 0.16, 0, x1 - x0, true);
    }
    const f = el("div", "proj " + kind + " t" + tier, this.fxLayer);
    f.style.setProperty("--c", color);
    this.addFx(f, x0, y, 0.16, 0, x1 - x0, true);
  }

  addFx(node, x, y, life, rise, dx = 0, keep = false) {
    if (this.fx.length > 30) this.fx.shift().node.remove();
    node.style.left = Math.round(x) + "px";
    node.style.top = Math.round(y) + "px";
    // (it. 1064) anneaux et dôme grandissent ici, dans la boucle d'images, plus par une animation CSS : tant qu'une
    // animation CSS tourne, le compositeur repeint la bande à son propre rythme ; en fin de partie (un anneau presque
    // toujours en vie), elle coûtait ≈ 5 points d'un cœur (37 → 32 %)
    const grow = node.classList.contains("ring") ? [0.2, 1.3] : node.classList.contains("dome") ? [0.3, 1] : null;
    this.fx.push({ node, t: 0, life, rise, dx, keep, grow, inner: grow && node.firstChild });
  }

  updateFx(dt) {
    if (!this.fx.length) return;
    for (const f of this.fx) {
      f.t += dt;
      const k = Math.min(1, f.t / f.life);
      const y = -q(k * f.rise), x = q(k * f.dx), o = f.keep ? 1 : Math.round((1 - k) * 8) / 8;
      if (y !== f.y || x !== f.x) { f.y = y; f.x = x; f.node.style.transform = `translate3d(${x}px,${y}px,0)`; mark("fx"); }
      if (o !== f.o) { f.o = o; f.node.style.opacity = o; }
      if (f.grow) {
        const e = 1 - (1 - k) * (1 - k), sc = Math.round((f.grow[0] + (f.grow[1] - f.grow[0]) * e) * 20) / 20;
        if (sc !== f.sc) { f.sc = sc; f.inner.style.transform = `scale(${sc})`; }
      }
    }
    this.fx = this.fx.filter((f) => (f.t < f.life ? true : (f.node.remove(), false)));
  }

  setActive(on) {
    this.active = on;
    if (!on) { this.fxLayer.replaceChildren(); this.fx.length = 0; if (this.juice) this.juice.clear(); }
    this.lastDraw = 0;
  }

  /* ---------- Dimensions ---------- */
  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.cssDpr = dpr;
    this.W = this.root.clientWidth || 800; this.bossObs = null; // positions du nom et de la relique à remesurer
    const spriteDpr = Math.max(1, Math.round(dpr));
    if (spriteDpr !== this.dpr) { this.dpr = spriteDpr; this.sprites = buildSpriteSet(spriteDpr); this.buildHero(); }
    sizeCanvas(this.base, this.W, STRIP_H, dpr);
    sizeCanvas(this.hudL, Math.min(HUD_L_W, this.W), HUD_H, dpr);
    sizeCanvas(this.hudR, HUD_R_W, HUD_H, dpr);
    this.skyKey = "";
    // (it. 1546) place réelle des boutons (polices, échelle d'affichage de Windows) : jamais moins de 10 px d'air
    const btns = this.root.querySelector(".strip-btns");
    if (btns && btns.offsetWidth) this.rightReserve = Math.max(this.rightReserve, btns.offsetWidth + 8 + 10);
    this.hudR.c.style.left = (this.W - HUD_R_W - this.rightReserve) + "px";
    // Écran très large (Odyssey G9, demande 21) : zone, or, niveau et boutons regroupés au milieu, dans une languette
    // qui déplie le panneau, au lieu des deux bouts de l'écran. Écrans ordinaires : inchangés.
    // Réglage « Informations de la bande » : au milieu ou aux bords sur tout écran (portable, Mac…), sinon automatique.
    const pos = (this.game.S.settings && this.game.S.settings.hudPos) || "auto";
    this.centerHud = pos === "center" ? this.W >= HUD_L_W + HUD_R_W : pos === "edges" ? false : this.W >= CENTER_HUD_W;
    this.root.classList.toggle("hud-center", this.centerHud);
    document.body.classList.toggle("hud-center", this.centerHud); // bulles centrées elles aussi (styles.css)
    if (!this.centerHud) { this.hudL.c.style.left = "0px"; const b = this.root.querySelector(".strip-btns"); if (b) b.style.left = ""; }
    this.layerKey = ""; this.hudLKey = ""; this.hudRKey = ""; this.slotKey = null;
  }

  /** Part du ciel étoilé, selon l'histoire : le Briseur a éteint les étoiles ; chaque chronique en rallume, la
   *  victoire finale les rallume toutes (et davantage). */
  starShare() {
    const S = this.game.S;
    if (storyWon(S)) return 1.3;
    return 0.15 + 0.85 * chroniclesUnlocked(S, recordZone(S)).length / CHRONICLES.length;
  }

  /** Étoiles fixes (même tirage à chaque fois, les nouvelles s'ajoutent sans déplacer les autres), d'autant plus
   *  visibles qu'il fait nuit ; leur nombre suit l'histoire (starShare). */
  drawStars(ctx, alpha, share = this.starShare()) {
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647), won = storyWon(this.game.S);
    for (let i = 0; i < Math.round(this.W / 18 * share); i++) {
      const x = Math.floor(rnd() * this.W), y = 4 + Math.floor(rnd() * 36), big = rnd() < 0.15;
      ctx.fillStyle = big ? (won ? "#ffe27a" : "#fff6c8") : "#dfe7ff";
      ctx.fillRect(x, y, big ? 2 : 1, big ? 2 : 1);
    }
    ctx.globalAlpha = 1;
  }

  /** Niveau de nuit (0 = jour, 1 = nuit) selon l'heure réelle. */
  nightLevel() {
    if (this.game.S.settings && this.game.S.settings.dayNight === false) return { night: 0, dusk: false };
    const d = new Date(), h = d.getHours() + d.getMinutes() / 60;
    // 0 = plein jour, 1 = pleine nuit ; aube 5 h-7 h, crépuscule 19 h-21 h 30.
    let night = 0;
    if (h >= 21.5 || h < 5) night = 1;
    else if (h >= 19) night = (h - 19) / 2.5;
    else if (h < 7) night = 1 - (h - 5) / 2;
    return { night: Math.round(night * 20) / 20, dusk: night > 0 && night < 1 && h > 12 };
  }

  /** Décor fixe + teinte de l'heure, cuits dans une seule toile. Aucun calque
   *  semi-transparent à mélanger à chaque image : la nuit ne coûte rien. */
  drawBase() {
    const { night, dusk } = this.nightLevel(), ctx = this.base.ctx;
    drawBackdrop(ctx, this.W, STRIP_H, GROUND, this.game.zoneDef(), this.game.S.zone);
    if (this.bloodSky) { // Lune de sang : voile rouge sur le ciel et lune rouge en pixels
      ctx.fillStyle = "rgba(170, 20, 40, 0.28)"; ctx.fillRect(0, 0, this.W, GROUND);
      const cx = Math.round(this.W * 0.62 / P) * P, cy = 3 * P, r = 3;
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + 1) {
        ctx.fillStyle = x + y < -1 ? "#ff8a8a" : "#d8303e"; ctx.fillRect(cx + x * P, cy + y * P, P, P);
      }
    }
    if (this.paleSky) { // (it. 1244) Lune pâle : voile gris-bleu délavé et grande lune blanche, mi-voilée
      ctx.fillStyle = "rgba(200, 210, 235, 0.22)"; ctx.fillRect(0, 0, this.W, GROUND);
      const cx = Math.round(this.W * 0.38 / P) * P, cy = 3 * P, r = 3;
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + 1) {
        ctx.fillStyle = x > 0 ? "#b9bfd6" : "#f2f4ff"; ctx.fillRect(cx + x * P, cy + y * P, P, P);
      }
    }
    if (this.starSky) { // (it. 917) Nuée d'étoiles : ciel assombri et constellé (toutes les étoiles, même de jour)
      ctx.fillStyle = "#0b1030"; ctx.globalAlpha = 0.3; ctx.fillRect(0, 0, this.W, GROUND); ctx.globalAlpha = 1;
      this.drawStars(ctx, 0.85, 1);
    }
    if (night > 0) {
      ctx.fillStyle = dusk ? "#3a1f4a" : "#0b1030";
      ctx.globalAlpha = night * 0.45;
      ctx.fillRect(0, 0, this.W, STRIP_H);
      ctx.globalAlpha = 1;
      this.drawStars(ctx, Math.max(0, night * 1.4 - 0.4));
    }
    mark("backdrop");
  }

  buildHero() {
    this.stage.replaceChildren();
    this.slots = []; this.slotKey = null; this.corpse = null; this.hero = null; this.heroCls = null; this.pet = null; this.petId = undefined;
    this.minion = null; this.minionKey = undefined; this.partner = null; this.partnerCls = undefined;
    this.wisps = []; this.coreKey = null;
    this.heroBar = new Bar(this.stage, "#6fd17f");
    this.slash = el("div", "slash", this.stage);
    this.bubble = el("div", "speech", this.stage);
    this.bubble.hidden = true;
    // Zone cliquable sur le monstre combattu : un clic = coup bonus.
    this.tap = el("button", "tapzone hit", this.stage);
    this.tap.hidden = true;
    this.tap.title = tx("Clique pour frapper !");
    this.tap.setAttribute("aria-label", tx("Frapper le monstre"));
    this.tap.addEventListener("pointerdown", (e) => { e.preventDefault(); this.tapAt = { x: e.offsetX, y: e.offsetY }; this.game.tapMonster(); });
  }

  /** Serviteur (nécromancien : squelette, druide : loup) quand la stat « minion » est active. */
  syncMinion() {
    const hs = this.game.stats(), kind = hs.minion > 0 ? (this.game.classDef().minion || "skel") : null;
    if (kind === this.minionKey) return;
    if (this.minion) this.minion.remove();
    this.minion = null;
    this.minionKey = kind;
    if (kind) this.minion = new Actor(this.stage, this.sprites.minions[kind], "minion");
  }

  /** Compagnon du duo (demande 17) : sprite de sa classe ; à distance il reste derrière le héros et tire, au corps à
   *  corps il va au contact du monstre. */
  syncPartner() {
    const cls = this.game.S.partner || null;
    if (cls === this.partnerCls) return;
    if (this.partner) this.partner.remove();
    this.partner = null;
    this.partnerCls = cls;
    const set = cls && this.sprites.heroes[cls];
    if (set) this.partner = new Actor(this.stage, [set.walk1, set.walk2, set.attack], "hero partner");
  }

  /** Familier actif : suit le héros à quelques pas. */
  syncPet() {
    const id = this.game.S.pets.active;
    if (id === this.petId) return;
    if (this.pet) this.pet.remove();
    this.pet = null;
    this.petId = id;
    const set = id && this.sprites.pets[id];
    if (set) { this.pet = new Actor(this.stage, set.frames, "pet"); this.pet.fly = set.fly; }
  }

  /** (Re)crée le sprite du héros pour la classe active. */
  syncHero() {
    const cls = this.game.S.cls;
    // (it. 572) les reliques gagnées font partie de l'apparence : drone qui l'accompagne, couronne, petites icônes
    const relics = Object.keys(this.game.S.relics || {}).filter((id) => RELICS[id]).sort();
    const vis = heroVisual(this.game.S), key = cls + "|" + visualKey(vis) + "|" + relics.join(",");
    if (key === this.heroCls && this.hero) return;
    if (this.hero) this.hero.remove();
    const h = buildHeroSprites(cls, vis, this.dpr); // habillé selon l'équipement
    this.hero = new Actor(this.stage, [h.walk1, h.walk2, h.attack], "hero");
    this.heroCls = key;
    // halo des objets légendaires : dessiné dans l'image (it. 597), plus de filtre CSS sur la bande
    this.hero.aura = vis.aura;
    if (vis.aura) this.hero.reframe(glowFrames(this.hero.base, LEGEND_GOLD, this.dpr));
    // Reliques (demande S) : le drone vole près du héros, la couronne se pose sur sa tête, cœur et lame au-dessus.
    for (const id of relics) {
      if (id === "drone") { const im = el("img", "relic-drone", this.hero.el); im.src = relicIconURL("drone", 3); im.alt = ""; }
      // (it. 582) placées en pixels d'après le sprite : le cadre de l'acteur n'a pas de largeur propre
      else if (id === "crown") { const im = el("img", "relic-crown", this.hero.el); im.src = relicIconURL("crown", 2); im.alt = ""; im.style.left = Math.round(this.hero.w / 2 - 9) + "px"; }
    }
    const minis = relics.filter((id) => id === "heart" || id === "blade");
    if (minis.length) {
      const row = el("div", "relic-mini", this.hero.el); row.style.top = Math.round(this.hero.h * 0.42) + "px";
      for (const id of minis) { const im = el("img", "", row); im.src = relicIconURL(id, 1); im.alt = ""; }
    }
    this.heroBarX = null;
  }

  /** outline : couleur du contour dessiné dans l'image (élite, champion), ou rien. */
  // (it. 1847) art : dessin d'un lieutenant du Briseur (relics.js, MAJOR_BOSSES.art), à la place de celui du boss de la zone
  monsterActor(type, boss, final, outline, big = false, art = null) {
    const set = final ? this.sprites.starbreaker : (art && this.sprites.major(art)) || this.sprites.monsters[type];
    const frames = boss || big ? set.boss : set.normal; // (it. 1618) élite Colossale : à la taille d'un boss, sans couronne
    // (it. 1020) monstre ordinaire sombre : contour très discret (plus pâle que celui des boss, sans rappeler l'or des élites)
    if (!outline && isDarkSprite(frames)) outline = DARK_OUTLINE;
    // (it. 1208) classe « mon » : les monstres se cachent pendant la rencontre d'un PNJ (juice.js, .stage.npc-scene)
    const a = new Actor(this.stage, outline ? outlinedFrames(frames, outline, this.dpr) : frames, "mon" + (boss ? " boss" + (final ? " final" : "") : ""));
    a.fly = set.fly; a.boss = boss;
    if (boss && !final && !(art && this.sprites.major(art))) a.addCrown(); // le Briseur et ses lieutenants ont leur propre coiffe
    return a;
  }

  /** (it. 701) Écho d'un lieutenant (zones 250, 300, 350) : contour spectral bleu pâle dessiné dans l'image, pour le
   *  distinguer de l'original (même sprite). */
  // (it. 1019) tout boss a un contour : pâle et discret, sinon celui de l'écho. Sans lui, un boss sombre se perdait dans
  // un décor sombre (Carapace des Abysses, bleu nuit, au Récif abyssal de nuit). Dessiné dans l'image (outlinedFrames),
  // pas en filtre CSS (it. 595 : ≈ 0,5 point par ombre empilée)
  /** (it. 1853) Pose du monstre combattu pendant sa compétence (monskills.js) : décalage { dx, dy } ou null. */
  monSkillPose(dt) {
    const f = this.mfx; if (!f) return null;
    f.t += dt; const p = f.t / f.d;
    if (p >= 1) { this.mfx = null; return null; }
    if (f.id === "dive") {
      // chauve-souris : monte de 16 px pendant l'annonce, puis fond sur le héros et remonte à sa place
      if (f.phase === "tell") return { dx: 0, dy: -16 * Math.min(1, p * 1.5) };
      const reach = Math.min(44, Math.max(10, this.monX() - this.heroX - 24));
      const dive = p < 0.5 ? p / 0.5 : 1 - (p - 0.5) / 0.5; // aller, puis retour
      return { dx: -dive * reach, dy: -16 * (1 - dive) + 10 * dive };
    }
    if (f.id === "roots") {
      // plante : se ramasse, puis se tend vers le héros (ses racines filent au sol) et se redresse en se nourrissant
      if (f.phase === "tell") return { dx: 2, dy: 2 };
      return { dx: -Math.sin(p * Math.PI) * 8, dy: 0 };
    }
    if (f.id === "scream") {
      // mandragore : se tasse, puis jaillit d'un coup en hurlant (vibre)
      if (f.phase === "tell") return { dx: 0, dy: 3 };
      return { dx: (Math.floor(p * 20) % 2 ? 3 : -3) * (1 - p), dy: -4 * (1 - p) };
    }
    if (f.id === "phase") {
      // spectre : flotte un peu plus haut pendant qu'il passe dans l'autre monde
      if (f.phase === "tell") return { dx: 0, dy: -2 };
      return { dx: 0, dy: -4 * Math.sin(p * Math.PI) };
    }
    if (f.id === "fireball") {
      // diablotin : lève les bras en flottant un peu, puis jette la boule d'un coup sec
      if (f.phase === "tell") return { dx: 2, dy: -3 * Math.min(1, p * 2) };
      return { dx: -Math.sin(p * Math.PI) * 6, dy: -3 * (1 - p) };
    }
    if (f.id === "swarm") {
      // rat : piaffe sur place, puis trois allers-retours éclair vers le héros
      if (f.phase === "tell") return { dx: Math.floor(p * 12) % 2 ? 2 : -2, dy: 0 };
      const reach = Math.min(20, Math.max(10, this.monX() - this.heroX - 28));
      return { dx: -Math.abs(Math.sin(p * Math.PI * 3)) * reach, dy: 0 };
    }
    if (f.id === "web") {
      // araignée : se hisse sur ses pattes, puis se rabat en projetant ses fils
      if (f.phase === "tell") return { dx: 0, dy: -4 };
      return { dx: -3 * Math.sin(p * Math.PI), dy: -4 * (1 - p) };
    }
    if (f.id === "chomp") {
      // mimique : le couvercle s'entrouvre (petit soulèvement), puis elle bondit gueule ouverte
      if (f.phase === "tell") return { dx: 0, dy: -2 };
      const reach = Math.min(20, Math.max(10, this.monX() - this.heroX - 30));
      return { dx: -reach * Math.sin(p * Math.PI), dy: -8 * Math.sin(p * Math.PI) };
    }
    if (f.id === "pickpocket") {
      // bandit : feinte d'un pas de côté, puis file au contact et repart aussitôt
      if (f.phase === "tell") return { dx: 3, dy: 0 };
      const reach = Math.min(26, Math.max(10, this.monX() - this.heroX - 26));
      return { dx: -reach * Math.sin(p * Math.PI), dy: 0 };
    }
    if (f.id === "pollen") {
      // champignon errant : se secoue (petit bond) en lâchant son pollen
      if (f.phase === "tell") return { dx: 0, dy: 2 };
      return { dx: 0, dy: -4 * Math.sin(p * Math.PI * 2) };
    }
    if (f.id === "thrust") {
      // chevalier errant : recule pour armer, puis se fend loin en avant
      if (f.phase === "tell") return { dx: 5, dy: 0 };
      const reach = Math.min(24, Math.max(10, this.monX() - this.heroX - 28));
      return { dx: p < 0.3 ? 5 - (reach + 5) * (p / 0.3) : -reach * (1 - (p - 0.3) / 0.7), dy: 0 };
    }
    if (f.id === "bomb") {
      // gobelin : recule en allumant la mèche (tremblote), puis lance d'un geste ample
      if (f.phase === "tell") return { dx: 4 * Math.min(1, p * 2) + (Math.floor(p * 16) % 2 ? 1 : 0), dy: 0 };
      return { dx: 4 - 8 * Math.sin(p * Math.PI), dy: -3 * Math.sin(p * Math.PI) };
    }
    if (f.id === "bossIntro") {
      // boss : se dresse (monte de 6 px) et tremble, puis se pose, prêt au combat
      const up = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7;
      return { dx: p < 0.5 ? (Math.floor(p * 24) % 2 ? 1 : -1) : 0, dy: -6 * up };
    }
    if (f.id === "sacrifice") {
      // cultiste : se plie (se taille la paume), puis se redresse bras tendus vers le héros
      if (f.phase === "tell") return { dx: 0, dy: 3 * Math.min(1, p * 2) };
      return { dx: -5 * Math.sin(p * Math.PI), dy: 3 * (1 - p) };
    }
    if (f.id === "flutter") {
      // guêpe : zigzague (droite-gauche, haut-bas) tant que dure son vol erratique
      return { dx: Math.sin(f.t * 22) * 6, dy: Math.cos(f.t * 17) * 4 };
    }
    if (f.id === "shock") {
      // méduse : se contracte, puis tressaille en lâchant la décharge
      if (f.phase === "tell") return { dx: 0, dy: 2 };
      return { dx: Math.floor(p * 24) % 2 ? 2 : -2, dy: 0 };
    }
    if (f.id === "ambush") {
      // lézard : se tapit (presque effacé : transparence de phaseT), puis bondit hors de sa cachette
      if (f.phase === "tell") return { dx: 2, dy: 2 };
      if (f.phase === "go") return { dx: 4, dy: 3 };
      return { dx: -14 * Math.sin(p * Math.PI), dy: -6 * Math.sin(p * Math.PI) };
    }
    if (f.id === "burrow") {
      // ver : s'enfonce sous terre (descend de 18 px), puis jaillit plus près du héros
      if (f.phase === "tell") return { dx: 0, dy: 3 };
      if (f.phase === "go") return { dx: 0, dy: 18 * Math.min(1, p * 4) };
      const reach = Math.min(30, Math.max(10, this.monX() - this.heroX - 30));
      return { dx: -reach * Math.sin(p * Math.PI), dy: 18 * (1 - Math.min(1, p * 3)) - 10 * Math.sin(p * Math.PI) };
    }
    if (f.id === "peck") {
      // corbeau : prend son élan en arrière, puis pique droit vers le visage du héros
      if (f.phase === "tell") return { dx: 4, dy: -4 };
      const reach = Math.min(36, Math.max(10, this.monX() - this.heroX - 24));
      return { dx: -reach * Math.sin(p * Math.PI), dy: -4 + 4 * p };
    }
    if (f.id === "pinch") {
      // scarabée : s'avance, mandibules ouvertes, puis serre (petite secousse)
      if (f.phase === "tell") return { dx: -3, dy: 0 };
      return { dx: -6 * Math.sin(p * Math.PI) + (Math.floor(p * 12) % 2 ? 1 : 0), dy: 0 };
    }
    if (f.id === "charge") {
      // sanglier : recule en grattant le sol, puis fonce sur le héros et revient
      if (f.phase === "tell") return { dx: 6 * Math.min(1, p * 1.5) + (Math.floor(p * 10) % 2 ? 1 : 0), dy: 0 };
      const reach = Math.min(48, Math.max(10, this.monX() - this.heroX - 26));
      return { dx: p < 0.35 ? 6 - (reach + 6) * (p / 0.35) : -reach * (1 - (p - 0.35) / 0.65), dy: 0 };
    }
    if (f.id === "roar") {
      // ours : se dresse sur ses pattes arrière, puis rugit en tremblant
      if (f.phase === "tell") return { dx: 2, dy: -4 * Math.min(1, p * 2) };
      return { dx: Math.floor(p * 18) % 2 ? 2 : 0, dy: -4 * (1 - p) };
    }
    if (f.id === "rage") {
      // orc : se frappe la poitrine (deux sursauts), puis se ramasse, prêt à cogner
      if (f.phase === "tell") return { dx: 0, dy: Math.floor(p * 6) % 2 ? -2 : 0 };
      return { dx: -2, dy: 1 };
    }
    if (f.id === "breath") {
      // wyverne : se cabre (recule et monte), puis tend le cou en crachant
      if (f.phase === "tell") return { dx: 4 * Math.min(1, p * 2), dy: -5 * Math.min(1, p * 2) };
      return { dx: 4 - 10 * Math.sin(p * Math.PI), dy: -5 * (1 - p) };
    }
    if (f.id === "gaze") {
      // tyrannœil : s'immobilise en se haussant (fixité), puis tremble en lâchant son regard
      if (f.phase === "tell") return { dx: 0, dy: -3 };
      return { dx: Math.floor(p * 16) % 2 ? 1 : -1, dy: -3 * (1 - p) };
    }
    if (f.id === "tongue") {
      // crapaud : gonfle (tassé), puis se projette d'un petit coup en avant
      if (f.phase === "tell") return { dx: 0, dy: 2 };
      return { dx: -4 * Math.sin(p * Math.PI), dy: 0 };
    }
    if (f.id === "strike") {
      // serpent : se love (recule), puis deux détentes éclair vers le héros
      if (f.phase === "tell") return { dx: 5, dy: 1 };
      const reach = Math.min(22, Math.max(10, this.monX() - this.heroX - 28));
      return { dx: -Math.abs(Math.sin(p * Math.PI * 2)) * reach, dy: 0 };
    }
    if (f.id === "flare") {
      // élémentaire : grandit (monte en vibrant) pendant l'annonce, puis jaillit vers le héros
      if (f.phase === "tell") return { dx: Math.floor(p * 14) % 2 ? 1 : -1, dy: -4 * p };
      return { dx: -10 * Math.sin(p * Math.PI), dy: -4 * (1 - p) };
    }
    if (f.id === "shell") return { dx: 2, dy: 4 }; // crabe : tassé dans sa carapace, en retrait
    if (f.id === "parry") return f.phase === "tell" ? { dx: 1, dy: 0 } : { dx: 4, dy: 0 }; // chevalier : un pas en arrière, bouclier levé
    if (f.id === "riposte") return { dx: -12 * Math.sin(p * Math.PI), dy: 0 }; // fente en avant
    if (f.id === "rootdeep") {
      // sylvain : s'enfonce un peu dans le sol, puis se redresse gonflé de sève
      if (f.phase === "tell") return { dx: 0, dy: 3 * Math.min(1, p * 2) };
      return { dx: 0, dy: 3 * (1 - p) - 2 * Math.sin(p * Math.PI) };
    }
    if (f.id === "tombcurse") {
      // momie : se dresse lentement, bras levés, puis se penche vers le héros en lançant sa malédiction
      if (f.phase === "tell") return { dx: 0, dy: -3 * Math.min(1, p * 1.5) };
      return { dx: -4 * Math.sin(p * Math.PI), dy: -3 * (1 - p) };
    }
    if (f.id === "boulder") {
      // yéti : se frappe la poitrine (deux secousses sur place), puis jette le bloc en se penchant en avant
      if (f.phase === "tell") return { dx: Math.floor(p * 6) % 2 ? 2 : 0, dy: Math.floor(p * 6) % 2 ? -2 : 0 };
      return { dx: -8 * Math.sin(p * Math.PI), dy: 2 * Math.sin(p * Math.PI) };
    }
    if (f.id === "feathers") {
      // harpie : bat des ailes vite (monte et descend), puis recule d'un coup en lâchant la rafale
      if (f.phase === "tell") return { dx: 0, dy: Math.floor(p * 10) % 2 ? -4 : 0 };
      return { dx: 6 * Math.sin(p * Math.PI), dy: -4 * (1 - p) };
    }
    if (f.id === "howl") {
      // loup : se dresse, museau levé, le temps du hurlement
      if (f.phase === "tell") return { dx: 2, dy: -3 };
      return { dx: 0, dy: p < 0.6 ? -3 : 0 };
    }
    if (f.id === "slam") {
      // golem : se penche lentement en arrière pour armer, puis s'abat en avant et revient
      if (f.phase === "tell") return { dx: 6 * Math.min(1, p * 1.4), dy: -2 * Math.min(1, p * 1.4) };
      // frappe : d'armé (+6 px) à abattu (−12 px) en un quart du temps, puis retour lent à sa place
      if (p < 0.25) { const h = p / 0.25; return { dx: 6 - 18 * h, dy: -2 + 4 * h }; }
      const back = 1 - (p - 0.25) / 0.75;
      return { dx: -12 * back, dy: 2 * back };
    }
    if (f.id === "reassemble") {
      // squelette : s'écroule d'un coup (tas d'os au sol), reste à terre, puis se redresse
      const down = p < 0.15 ? p / 0.15 : p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3;
      return { dx: 0, dy: 9 * down };
    }
    if (f.id === "sting") {
      // scorpion : se cabre (recule et se dresse) pendant l'annonce, puis se détend vers le héros
      if (f.phase === "tell") return { dx: 4, dy: -3 };
      const arc = Math.sin(p * Math.PI);
      return { dx: -arc * Math.min(18, Math.max(10, this.monX() - this.heroX - 30)), dy: 0 };
    }
    if (f.id === "spores") {
      // champignard : se tasse en gonflant, puis se détend d'un coup en lâchant le nuage
      if (f.phase === "tell") return { dx: 0, dy: 3 };
      return { dx: 0, dy: -Math.sin(p * Math.PI) * 6 };
    }
    if (f.id === "leap") {
      // gluant : se ramasse (écrasé vers le sol), puis bondit vers le héros en arc et retombe à sa place
      if (f.phase === "tell") return { dx: 0, dy: 3 };
      const arc = Math.sin(p * Math.PI);
      return { dx: -arc * Math.min(40, Math.max(10, this.monX() - this.heroX - 30)), dy: -arc * 22 };
    }
    return null;
  }

  bossOutline() { return majorBoss(this.game.S.zone)?.echo ? ECHO_OUTLINE : BOSS_OUTLINE; }

  monY(a, bob) {
    let y = GROUND - a.h + (a.boss ? P * 2 : P);
    if (a.fly) y -= (a.boss ? 18 : 26) + bob;
    return y;
  }

  /** Monstres qui attendent le long du parcours (recréés à chaque nouvelle série). */
  syncSlots() {
    const g = this.game, line = g.lineup(), Z = g.zoneDef();
    if (this.slotKey === line) return;
    for (const s of this.slots) s.remove();
    this.slots = [];
    // (it. 1458-1459) cibles des quêtes en cours : chasse (sorte de monstre), proie (sorte d'élite), champions, gobelins dorés
    const openQ = ((g.S.quests && g.S.quests.slots) || []).filter((q) => q && q.progress < q.goal);
    const huntTypes = new Set(openQ.filter((q) => q.kind === "hunt").map((q) => q.type));
    const preyAffixes = new Set(openQ.filter((q) => q.kind === "prey").map((q) => q.type));
    const wantChamp = openQ.some((q) => q.kind === "champion"), wantGoblin = openQ.some((q) => q.kind === "goblin");
    for (let k = 0; k < this.fights(); k++) {
      const boss = k === this.fights() - 1;
      // final : le Briseur d'Étoiles ; élite / champion : contour doré / violet dans l'image
      const a = this.monsterActor(boss ? Z.boss : line[k].type, boss, boss && isFinalZone(g.S.zone), boss ? this.bossOutline() : line[k].elite ? eliteColor(line[k]) : line[k].poupouce ? POUPOUCE_PINK : null, !boss && line[k].affix === "colossal", boss ? majorBoss(g.S.zone)?.art : null); // (it. 1605) Poupouce : contour rose
      // Boss majeur ou Briseur (demande S) : la relique qu'il garde flotte au-dessus de lui, tant qu'elle n'est pas gagnée.
      const carried = boss && (majorBoss(g.S.zone)?.relic || (isFinalZone(g.S.zone) ? "crown" : null));
      // (it. 613) aussi tant qu'elle peut encore monter de niveau (déjà gagnée : un peu plus pâle)
      if (boss) { this.bossRelic = null; this.bossObs = null; }
      if (carried && relicUpgradable(g.S, carried, !!majorBoss(g.S.zone)?.echo)) { const im = el("img", "relic-carried", a.el); this.bossRelic = im; im.onload = () => { this.bossObs = null; }; im.src = relicIconURL(carried, 3); im.alt = ""; im.title = tx(RELICS[carried].name); im.style.left = (a.w + 3) + "px"; if (hasRelic(g.S, carried)) im.classList.add("owned"); }
      if (boss) {
        const tag = el("div", "affix bossname", a.el);
        this.bossTag = tag; this.bossW = a.w;
        const wear = bossWear(this.game.S, this.game.S.zone); // usé par les défaites du héros : on le montre
        // Boss qui retient un héros pas encore libéré : on le dit (sinon il fallait ouvrir l'onglet Classe).
        const S = this.game.S, captive = Object.keys(CLASS_UNLOCK_ZONE).find((c) => CLASS_UNLOCK_ZONE[c] === S.zone && !(S.classesUnlocked || []).includes(c));
        tag.textContent = bossName(S.zone) + (wear ? " · " + tx("−{0} % PV", { 0: Math.round(wear * 100) }) : "")
          + (captive ? " · " + tx("captif : {0}", { 0: CLASSES[captive].name }) : "");
        // Boss très grand (ou volant) : le nom ne doit pas sortir par le haut de la bande.
        const y0 = this.monY(a, 4);
        if (y0 - 40 < 2) tag.style.top = (2 - y0) + "px";
        this.placeBossName();
      }
      // (it. 1477) une élite (ou un champion) du type chassé compte aussi pour la quête de chasse : marque ◆ sur son étiquette
      if (!boss && line[k].elite) {
        a.el.classList.add(line[k].champion ? "champion" : "elite");
        const af = ELITE_AFFIXES[line[k].affix];
        // (it. 947) ✦ : sorte jamais vaincue (elle compte pour la collection du Bestiaire et le succès « Tueur d'élites »)
        const fresh = af && !((this.game.S.stats && this.game.S.stats.affixesSeen) || {})[line[k].affix] ? " ✦" : "";
        if (line[k].champion) { const tag = el("div", "affix champ", a.el); tag.textContent = (af ? upFirst(tx("Champion {0}", { 0: af.name.toLowerCase() })) : tx("Champion")) + fresh + (wantChamp || preyAffixes.has(line[k].affix) || huntTypes.has(line[k].type) ? " ◆" : ""); }
        else if (af) { const tag = el("div", "affix", a.el); tag.textContent = af.name + fresh + (preyAffixes.has(line[k].affix) || huntTypes.has(line[k].type) ? " ◆" : ""); tag.style.color = af.color; }
      }
      if (!boss && line[k].goblin) a.el.classList.add("goblin");
      // (it. 1458) monstre visé par une quête de chasse en cours : petite marque ◆ (posée avec la série, pas à chaque image)
      if (!boss && line[k].poupouce) { const tag = el("div", "affix", a.el); tag.textContent = POUPOUCE.name + (+(this.game.S.stats || {}).poupouce > 0 ? "" : " ✦"); tag.style.color = POUPOUCE_PINK; } // (it. 1608) ✦ : jamais vaincu, comme les élites // (it. 1546)
      if (!boss && !line[k].elite && ((line[k].goblin && wantGoblin) || (!line[k].goblin && huntTypes.has(line[k].type)))) el("div", "affix qmark", a.el).textContent = "◆";
      // (it. 1618) monstre haut (élite Colossale, à la taille d'un boss) : son étiquette reste sous la rangée du haut
      // (variable CSS : clearQueueTags remet style.top à zéro)
      if (!boss) { const y0 = this.monY(a, 4); if (y0 - 24 < 28) a.el.style.setProperty("--tagtop", (28 - y0) + "px"); }
      a.flame = el("div", "flame", a.el);
      a.flame.style.left = Math.round(a.w / 2 - 6) + "px";
      a.flame.hidden = true;
      a.bar = new Bar(a.el, "#ff6b5a", "mon");
      a.bar.el.style.left = Math.round(a.w / 2 - 19) + "px";
      // boss : sous ses pieds, plus large (voir BOSS_BAR_DY)
      a.bar.el.style.top = (boss ? a.h + BOSS_BAR_DY : -10) + "px";
      if (boss) a.bar.el.classList.add("bossbar");
      a.bar.visible(false);
      a.move(this.fightX(k + 1), this.monY(a, 0));
      // (it. 1850) vie en attente : nature selon le dessin de base, rythme propre à la place (monlife.js)
      // (it. 1883) a.brave : élite ou champion, téméraire (ne sursaute pas, arpente plus large)
      { const def = MONSTERS[boss ? Z.boss : line[k].type] || {}; a.art = def.art || (boss ? Z.boss : line[k].type); a.nature = natureOf(a.art, !!a.fly); a.skillId = monSkillOf(boss ? Z.boss : line[k].type)?.id || null; a.brave = !boss && !!(line[k] && line[k].elite); a.nextGesture = 6 + lifeSeed(g.S.zone, k + 31) * 20; a.lifeSeed = lifeSeed(g.S.zone, k); }
      // (it. 1903) meutes et nuées : deux voisins (ou plus) de la même espèce qui marchent ou volent suivent le même chef de
      // file (son rythme, son regard) avec un peu de jeu propre : une meute de loups, un vol de chauves-souris ; (it. 1905)
      // espèces grégaires seulement (game.js PACK_ARTS) : deux ours voisins restent chacun de son côté
      { const p = this.slots[this.slots.length - 1];
        a.packSeed = !boss && p && !p.bossSlot && p.art === a.art && PACK_ARTS.has(a.art) && (a.nature === "wander" || a.nature === "fly") ? (p.packSeed ?? p.lifeSeed) : null; }
      a.bossSlot = boss;
      this.slots.push(a);
    }
    this.slotKey = line;
    this.placeBossName(); // étiquettes de la file dégagées du nom du boss (it. 892)
  }

  makeCorpse(mon, x) {
    if (this.corpse) this.corpse.remove();
    const a = this.monsterActor(mon.type, mon.boss, !!mon.final, mon.elite ? eliteColor(mon) : mon.boss ? this.bossOutline() : mon.poupouce ? POUPOUCE_PINK : null, !mon.boss && mon.affix === "colossal", mon.boss ? mon.art : null);
    if (mon.elite) a.el.classList.add(mon.champion ? "champion" : "elite");
    a.show(0);
    a.move(x, this.monY(a, 0));
    // (it. 1888) chute propre à chaque famille (corpseFall) : départ, et sol pour les volants qui tombent
    const def = MONSTERS[mon.type] || {}, art = def.art || mon.type;
    a.fall = { kind: mon.boss ? "boss" : CORPSE_FALL[art] || (a.fly ? "drop" : "sink"), x, y0: this.monY(a, 0), ground: GROUND - a.h + P };
    this.corpse = a;
  }

  /** (it. 1888) Chute du monstre vaincu pendant qu'il s'efface (p : 0 → 1). */
  corpseFall(a, p) {
    const f = a.fall; if (!f) return;
    let dx = 0, dy = 0;
    switch (f.kind) {
      case "drop": dy = (f.ground - f.y0) * Math.min(1, p * 1.6) ** 2; break; // volant : tombe au sol
      case "rise": dy = -14 * p; break; // spectre, feu follet : monte en se dissipant
      case "squash": dy = 5 * p; break; // gluant, méduse : s'affaisse
      case "crumble": dy = 8 * p; dx = Math.floor(p * 10) % 2 ? 1 : -1; break; // golem, squelette : s'effondre en tremblant
      case "boss": dy = 4 * p; break;
      default: dy = 3 * p; // les autres tombent un peu
    }
    a.move(f.x + dx, f.y0 + dy);
  }

  shake(t) { if (this.active && this.game.S.settings.fullEffects !== false) this.shakeT = Math.max(this.shakeT, t); }

  /**
   * Cœurs des pétales de compétences : aura de la couleur du premier secteur
   * complété, et un feu follet par cœur allumé qui tourne autour du héros.
   */
  drawCores(x, R) {
    const S = this.game.S, key = S.skills.order.length + ":" + skillPointsTotal(S);
    if (key !== this.coreKey) {
      this.coreKey = key;
      const done = completedSectors(S), colors = done.map((id) => SECTORS.find((s) => s.id === id).color);
      for (const w of this.wisps || []) w.remove();
      this.wisps = colors.map((c) => { const w = el("div", "wisp", this.stage); w.style.setProperty("--c", c); return w; });
      this.hero.el.classList.toggle("cored", colors.length > 0);
      if (colors.length) this.hero.el.style.setProperty("--aura", colors[0]);
      mark("cores");
    }
    if (!this.wisps || !this.wisps.length) return;
    const cx = x + this.hero.w / 2, cy = GROUND - this.hero.h / 2 - 4, n = this.wisps.length;
    this.wisps.forEach((w, i) => {
      // (it. 725) effets complets coupés (dont « réduire les animations » du système) : feux follets immobiles autour du héros
      const a = (this.game.S.settings.fullEffects === false ? 0.6 : R.time * 1.6) + (i * Math.PI * 2) / n;
      // (it. 724, demande V) perspective : plus petit derrière le héros, plus grand devant (2 tailles, pas de flou)
      const t = `translate3d(${q(cx + Math.cos(a) * 26 - 3)}px,${q(cy + Math.sin(a) * 12 - 3)}px,0) scale(${Math.sin(a) > 0 ? 1.2 : 0.75})`;
      if (w._t !== t) { w._t = t; w.style.transform = t; w.style.zIndex = Math.sin(a) > 0 ? 3 : 1; mark("wisp"); }
    });
  }

  /* ---------- Image ---------- */
  draw(now) {
    const dt = this.lastDraw ? Math.min(0.25, (now - this.lastDraw) / 1000) : 0;
    const first = !this.lastDraw;
    this.lastDraw = now;
    this.lunge = Math.max(0, this.lunge - dt); this.flash = Math.max(0, this.flash - dt); this.monHit = Math.max(0, this.monHit - dt);
    const game = this.game, S = game.S, R = game.R;

    // Décor fixe : redessiné seulement au changement de zone ou de taille.
    const key = S.zone + ":" + this.W + ":" + this.cssDpr;
    if (key !== this.layerKey) {
      if (this.layerKey && !first) this.fadeT = 0.5; // fondu de transition entre zones
      this.layerKey = key;
      this.skyKey = "";
    }
    // Cycle jour / nuit : vérifié une fois par minute, décor redessiné si besoin.
    const minute = Math.floor(Date.now() / 60000);
    if (minute !== this.skyMinute || !this.skyKey) {
      this.skyMinute = minute;
      // Clé du décor : heure (nuit) et étoiles rallumées par l'histoire (une chronique de plus = redessiner).
      this.nightV = this.nightLevel().night; // (it. 1878) rythme des monstres (jour / nuit), relu une fois par minute
      const k = JSON.stringify(this.nightLevel()) + this.starShare().toFixed(3);
      if (k !== this.skyKey) { this.skyKey = k; this.drawBase(); }
    }
    // (it. 916) Lune de sang : ciel rougi et lune rouge, cuits une fois dans le décor (rien à chaque image), avec un fondu
    const blood = (R.events.bloodmoon || 0) > 0;
    if (blood !== !!this.bloodSky) { this.bloodSky = blood; this.drawBase(); this.fadeT = 0.5; }
    const starry = (R.events.starfall || 0) > 0; // (it. 917) Nuée d'étoiles, même principe
    if (starry !== !!this.starSky) { this.starSky = starry; this.drawBase(); this.fadeT = 0.5; }
    const pale = (R.events.palemoon || 0) > 0; // (it. 1244) Lune pâle, même principe
    if (pale !== !!this.paleSky) { this.paleSky = pale; this.drawBase(); this.fadeT = 0.5; }
    this.updateFx(dt);
    this.juice.update(dt);
    // Tremblement de la scène (boss vaincu, coup dévastateur, légendaire, coffre) : par pas de 3 px.
    if (this.shakeT > 0 || this.shakeK) {
      this.shakeT = Math.max(0, this.shakeT - dt);
      const amp = this.shakeT > 0 ? P * (this.shakeT > 0.15 ? 2 : 1) : 0;
      const k = amp ? `translate3d(${(Math.random() < 0.5 ? -1 : 1) * amp}px,${(Math.random() < 0.5 ? -1 : 1) * (amp / P | 0) * P}px,0)` : "";
      if (k !== this.shakeK) { this.shakeK = k; this.stage.style.transform = k; mark("shake"); }
    }
    this.syncSlots();

    // Monstres en attente / combat en cours
    const cur = Math.min(S.kills, this.fights() - 1), line = game.lineup();
    // (it. 1890) bavardage : de loin en loin, deux voisins loin du héros se tournent l'un vers l'autre (hochements)
    this.chatT = (this.chatT ?? 8) - dt;
    if (this.chatT <= 0) {
      this.chatT = 10 + Math.random() * 8;
      const k = cur + 2 + Math.floor(Math.random() * Math.max(1, this.fights() - cur - 4)), A = this.slots[k], B = this.slots[k + 1];
      if (A && B && k + 1 < this.fights() - 1 && !A.react && !B.react && Math.abs(this.fightX(k + 1) - this.heroX) > 220) { A.chat = { t: 2, side: -1 }; B.chat = { t: 2, side: 1 }; }
    }
    const idle = Math.floor(R.time * 2) % 2, busy = Math.floor(R.time * 4) % 2;
    for (let k = 0; k < this.fights(); k++) {
      const a = this.slots[k];
      const alive = k >= S.kills;
      a.visible(alive);
      if (!alive) continue;
      const fighting = k === cur && R.mon;
      a.show(fighting ? busy : idle);
      const bob = fighting && a.fly ? Math.sin(R.time * 5) * 3 : 0;
      // (it. 1850) en attente : il vit sa vie (flâne, plane, sautille…) et se tourne vers le héros qui approche
      const pose = fighting ? this.monSkillPose(dt) : null; // (it. 1853) compétence en cours : bond, élan…
      let life = fighting ? null : lifeOffset(a.nature, a.lifeSeed || 0, R.time, Math.abs(this.fightX(k + 1) - this.heroX), k === this.fights() - 1);
      if (life && a.packSeed != null) {
        // (it. 1903) suit le chef de meute : 65 % de son mouvement, 35 % du sien, même regard
        const lead = lifeOffset(a.nature, a.packSeed, R.time - 0.25, Math.abs(this.fightX(k + 1) - this.heroX), false);
        life = { dx: Math.round((lead.dx * 0.65 + life.dx * 0.35) * 10) / 10 || 0, dy: a.nature === "fly" ? life.dy : lead.dy, face: lead.face };
      }
      // (it. 1880) ils sentent la faiblesse : héros sous 30 % de vie en plein combat, la file s'avance un peu vers lui (les
      // boss restent à leur place) ; elle recule quand il se rétablit
      if (!fighting && k < this.fights() - 1) {
        const hsMax = this.game.stats().hp, weak = R.mode === "fight" && hsMax > 0 && R.hp / hsMax < 0.3;
        // (it. 1906) meute : quand un congénère se bat, ceux qui le suivent s'avancent, impatients de prendre la relève
        const fs = R.mon && cur >= 0 ? this.slots[cur] : null, pack = fs && a.packSeed != null && (fs.packSeed ?? fs.lifeSeed) === a.packSeed && k > cur;
        a.eager = (a.eager || 0) + ((weak ? 1 : pack ? 0.7 : 0) - (a.eager || 0)) * Math.min(1, dt * 2);
      }
      // (it. 1878) jour et nuit : la nuit, les espèces de jour bougent à peine et s'endorment (« z »), celles de nuit
      // s'agitent ; l'entrain change lentement (pas de saut à la tombée de la nuit)
      if (!fighting) {
        const nv = this.nightV || 0, want = DIURNAL.has(a.art) ? 1 - 0.75 * nv : NOCTURNAL.has(a.art) ? 1 + 0.4 * nv : 1;
        a.act = a.act == null ? want : a.act + (want - a.act) * Math.min(1, dt * 0.5);
        if (DIURNAL.has(a.art) && nv >= 0.8 && a.tx && k < this.fights() - 1) {
          a.zzzT = (a.zzzT ?? 2 + Math.random() * 6) - dt;
          if (a.zzzT <= 0) { a.zzzT = 6 + Math.random() * 6; const [zx, zy] = a.tx.split(",").map(Number); this.float(zx + a.w - 4, zy + 2, "z", "#c8d0ff"); }
        }
      }
      // (it. 1877) geste au repos : de loin en loin, un monstre qui attend fait un petit bond qui rappelle sa compétence
      // (trois étincelles de sa couleur) ; jamais la mimique (elle joue le coffre), ni pendant une autre réaction
      if (!fighting && a.skillId && !a.react && a.nature !== "statue" && k < this.fights() - 1) {
        a.nextGesture -= dt;
        if (a.nextGesture <= 0) {
          a.nextGesture = 18 + Math.random() * 20;
          a.react = { kind: "gesture", t: 0, d: 0.6, delay: 0 };
          if (this.active && this.juice.full && a.tx) { const [gx, gy] = a.tx.split(",").map(Number); this.juice.sparkles(gx + a.w / 2, gy + 4, MON_SKILL_COLOR[a.skillId] || "#e8e0ff", 3); }
        }
      }
      // (it. 1867) réactions de groupe : sursaut (mort d'un voisin), joie (héros à terre)
      let rdx = 0, rdy = 0;
      // (it. 1868) monstre ordinaire très blessé (sous 25 % de vie) : il recule en tremblant, prêt à fuir (les craintifs
      // plus loin) ; pas pendant une compétence (sa pose l'emporte)
      if (fighting && !R.mon.boss && !pose && R.mon.max > 0 && R.mon.hp / R.mon.max < 0.25) {
        rdx = (TIMID.has(a.art) ? 9 : 5) + (Math.floor(R.time * 9) % 2 ? 1 : 0);
      }
      if (!fighting && a.react) {
        const r = a.react; r.t += dt;
        const p = (r.t - r.delay) / r.d;
        if (p >= 1) a.react = null;
        else if (p > 0) {
          if (r.kind === "startle") { const b = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8; rdx = 8 * r.far * b; rdy = p < 0.2 ? -4 * Math.sin(p / 0.2 * Math.PI) : 0; }
          else if (r.kind === "fury") { const b = p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75; rdx = -8 * b + (Math.floor(r.t * 20) % 2 ? 1 : -1) * (p < 0.6 ? 1 : 0); }
          else if (r.kind === "gesture") rdy = -Math.sin(p * Math.PI) * 3;
          else rdy = -Math.abs(Math.sin(p * Math.PI * 3)) * 5;
        }
      }
      // (it. 1856) loup de la file qui répond au hurlement : tête levée (petit bond vers le haut), puis repos
      let answer = 0;
      if (!fighting && a.howlT > 0) { a.howlT -= dt; answer = a.howlT > 0.25 ? -3 : 0; }
      a.move(this.fightX(k + 1) + (fighting && this.monHit > 0 ? 3 : 0) + (life ? life.dx * (a.act ?? 1) * (a.brave ? 1.3 : 1) : 0) + (pose ? pose.dx : 0) + rdx - (fighting ? 0 : 9 * (a.eager || 0)), this.monY(a, bob) + (life ? life.dy : 0) + (pose ? pose.dy : 0) + answer + rdy);
      // (it. 1857) spectre intangible : à demi effacé tant que les coups le traversent
      if (fighting || a.phased) { const ph = !!(fighting && R.mon.phaseT > 0); if (a.phased !== ph) { a.phased = ph; a.alpha(ph ? 0.375 : 1); } }
      // (it. 1890) bavardage : celui de gauche se tourne vers la droite, l'autre garde sa face ; petits hochements
      let chatDy = 0, chatFlip = null;
      if (!fighting && a.chat) { a.chat.t -= dt; if (a.chat.t <= 0) a.chat = null; else { chatFlip = a.chat.side < 0; chatDy = Math.floor(a.chat.t * 5 + (a.chat.side > 0 ? 1 : 0)) % 2 ? -2 : 0; } }
      if (chatDy && a.tx) { const [cx, cy] = a.tx.split(",").map(Number); a.move(cx, cy + chatDy); }
      const flip = chatFlip ?? !!(life && life.face < 0);
      if (a.flipped !== flip) { a.flipped = flip; a.el.classList.toggle("flip", flip); mark("flip"); }
      // Barre : le monstre combattu, ou un monstre de la file déjà blessé par un perçage (demande R : visible jusqu'à son tour).
      const pierced = !fighting && (k === line.length ? R.bossPierced > 0 : line[k]?.pierced > 0);
      a.bar.visible(!!fighting || pierced);
      if (fighting) a.bar.set(R.mon.hp / R.mon.max); else if (pierced) a.bar.set(game.slotHealth(k));
      const burning = !!(fighting && R.mon.burnT > 0);
      if (a.flame.hidden === burning) { a.flame.hidden = !burning; mark("flame"); }
      const enraged = !!(fighting && R.mon.enraged), shelled = !!(fighting && R.mon.shell > 0);
      if (a.el.classList.contains("enraged") !== enraged) { a.el.classList.toggle("enraged", enraged); mark("boss"); }
      // carapace : contour bleu dessiné dans l'image (it. 596), plus de filtre CSS
      if (a.el.classList.contains("shelled") !== shelled) { a.el.classList.toggle("shelled", shelled); a.reframe(shelled ? outlinedFrames(a.base, SHIELD_BLUE, this.dpr) : null); mark("boss"); }
      const poisoned = !!(fighting && (R.mon.poisonT > 0 || R.mon.venomT > 0));
      if (a.el.classList.contains("poisoned") !== poisoned) { a.el.classList.toggle("poisoned", poisoned); mark("poison"); }
      // Effets des sorts sur le monstre (demande Q) : étourdi, ralenti, affaibli.
      for (const [cls, on] of [["stunned", fighting && R.mon.stunT > 0], ["slowed", fighting && R.mon.slowT > 0], ["weakened", fighting && R.mon.weakT > 0]])
        if (a.el.classList.contains(cls) !== !!on) { a.el.classList.toggle(cls, !!on); mark("spellfx"); }
    }
    // Zone de clic calée sur le monstre combattu
    const tapOn = R.mode === "fight" && !!R.mon && !!this.slots[cur] && this.slots[cur].shown;
    if (this.tap.hidden === tapOn) { this.tap.hidden = !tapOn; mark("tap"); }
    if (tapOn) {
      const a = this.slots[cur], tk = a.tx + "|" + a.w;
      if (tk !== this.tapKey) {
        this.tapKey = tk;
        const [ax, ay] = a.tx.split(",").map(Number);
        this.tap.style.cssText = `width:${a.w + 18}px;height:${a.h + 18}px;transform:translate3d(${ax - 9}px,${ay - 12}px,0)`;
      }
    }
    if (this.corpse) {
      if (R.corpse) { this.corpse.alpha(Math.max(0, R.corpse.t / 0.45)); this.corpseFall(this.corpse, 1 - Math.max(0, R.corpse.t / 0.45)); }
      else { this.corpse.remove(); this.corpse = null; }
    }

    // Héros : avance de l'étape précédente vers le prochain combat.
    this.syncHero();
    const cls = this.game.classDef(), reach = cls.contact, melee = !cls.projectile;
    const t = this.target();
    const from = t === 1 ? LEFT : Math.max(LEFT, this.fightX(t - 1) - reach), to = Math.max(LEFT, this.fightX(t) - reach);
    const x = R.mode === "walk" ? from + (to - from) * game.legProgress() : to;
    if (!first && x < this.heroX - 160) this.fadeT = Math.max(this.fadeT, 0.4); // retour au départ
    this.heroX = x;
    const walkF = Math.floor(R.time * 6) % 2;
    let frame = 0, bob = 0;
    if (R.mode === "walk") { frame = walkF; bob = walkF ? -P : 0; }
    if (R.mode === "fight" && this.lunge > 0) frame = 2;
    this.hero.show(frame);
    const fr = this.hero.frames[frame];
    this.hero.move(x + (this.lunge > 0 && melee ? 6 : 0) + (this.flash > 0 ? -3 : 0), GROUND - fr.ch + P + bob);
    this.hero.alpha(R.mode === "dead" ? 0.35 : 1);
    // Demande de Victor (it. 580) : contre un boss, les barres de vie passent sous les pieds (sur le sol) : au-dessus,
    // celle du boss se cachait sous son nom en haut de la bande, et celle du héros sous les nombres de dégâts.
    const vsBoss = R.mode === "fight" && !!(R.mon && R.mon.boss);
    const bx = q(x + 3), by = vsBoss ? GROUND + BOSS_BAR_DY : GROUND - this.hero.h - 2;
    if (bx !== this.heroBarX || by !== this.heroBarY) { this.heroBarX = bx; this.heroBarY = by; this.heroBar.el.style.transform = `translate3d(${bx}px,${by}px,0)`; mark("move"); }
    this.heroBar.set(R.hp / game.stats().hp);
    this.heroBar.setShield(R.mode === "fight" ? (R.shield || 0) / game.stats().hp : 0);
    this.syncPet();
    this.syncMinion();
    this.syncPartner();
    if (this.partner) {
      this.partnerAtk = Math.max(0, (this.partnerAtk || 0) - dt);
      const pf = this.partner.frames[0], fighting = R.mode === "fight" && R.mon, ranged = isRanged(this.partnerCls);
      // Corps à corps : au contact du monstre, juste devant lui ; à distance : quelques pas derrière le héros.
      // (it. 1209, demande de Victor) héros à distance (mage, archer…) et compagnon au corps à corps : en marche aussi, le
      // compagnon passe devant (le mage menait la marche, son guerrier derrière lui)
      const leads = !ranged && !melee;
      // (it. 1802, demande de Victor) compagnon à distance derrière un héros au corps à corps : un vrai écart (avant : 6 px
      // de recouvrement, l'arbalétrier disparaissait derrière le samouraï et ses flèches partaient de derrière lui)
      const gapBack = ranged && melee ? 16 : -6;
      // (it. 1807) deux combattants au corps à corps : au même point de contact ils se cachaient l'un l'autre ; le compagnon
      // se tient 20 px en retrait (les deux restent lisibles)
      // (it. 1818) serviteur (nécromancien…) au contact : le compagnon combattant se tient 18 px derrière lui
      const px = fighting && !ranged ? this.monX() - pf.cw + 6 - (melee ? 20 : this.minion ? 18 : 0) : leads ? x + this.hero.w - 6 : x - pf.cw - gapBack;
      this.partner.show(this.partnerAtk > 0 ? 2 : Math.floor(R.time * (fighting ? 2 : 5) + 1) % 2);
      this.partner.move(px, GROUND - pf.ch);
      this.partner.alpha(R.mode === "dead" ? 0.35 : 1);
      this.partnerX = px;
    }
    if (this.minion) {
      this.minionLunge = Math.max(0, (this.minionLunge || 0) - dt);
      const mf = this.minion.frames[0], fighting = R.mode === "fight" && R.mon;
      // Au combat, le serviteur se place au contact du monstre ; sinon il précède le héros.
      // (it. 1818) en marche, devant le compagnon s'il mène (les deux se superposaient devant le héros)
      const ahead = this.partner && this.partnerX > x ? this.partnerX + this.partner.frames[0].cw - 2 : x + this.hero.w + 4;
      const mx = fighting ? this.monX() - mf.cw - 2 + (this.minionLunge > 0 ? 4 : 0) : ahead;
      this.minion.show(Math.floor(R.time * (fighting ? 4 : 5)) % 2);
      this.minion.move(mx, GROUND - mf.ch + 2);
      this.minion.alpha(R.mode === "dead" ? 0.35 : 0.9);
    }
    // Bouclier sacré (paladin) : halo autour du héros tant qu'il tient.
    const shielded = R.mode === "fight" && R.shield > 0;
    if (this.hero.el.classList.contains("shielded") !== shielded) {
      // contour bleu dessiné dans l'image (it. 596) : le filtre CSS de 4 ombres coûtait à chaque image
      this.hero.el.classList.toggle("shielded", shielded); const own = this.hero.aura ? glowFrames(this.hero.base, LEGEND_GOLD, this.dpr) : this.hero.base;
      this.hero.reframe(shielded ? outlinedFrames(own, SHIELD_BLUE, this.dpr) : own); mark("shield");
    }
    const frozen = R.mode === "fight" && R.frozen > 0;
    if (this.hero.el.classList.contains("frozen") !== frozen) { this.hero.el.classList.toggle("frozen", frozen); mark("frost"); }
    if (this.pet) {
      const pf = this.pet.frames[0], moving = R.mode === "walk";
      this.pet.show(Math.floor(R.time * (moving ? 5 : 2)) % 2);
      const py = this.pet.fly ? GROUND - pf.ch - 34 + Math.round(Math.sin(R.time * 3) * 3) : GROUND - pf.ch + 2;
      // Compagnon du duo derrière le héros (à distance, ou en marche) : le familier passe derrière lui, pas devant son visage.
      const back = this.partner && this.partnerX < x ? this.partnerX : x;
      this.pet.move(back - pf.cw - 4, py);
      this.pet.alpha(R.mode === "dead" ? 0.35 : 1);
    }
    this.drawCores(x, R);
    const slashOn = melee && R.mode === "fight" && this.lunge > 0.07 && R.mon;
    if (slashOn) {
      const sx = q(this.monX() + 4);
      if (sx !== this.slashX || this.slashScaleK !== this.slashTier) {
        this.slashX = sx; this.slashScaleK = this.slashTier;
        const k = [1, 1.35, 1.7, 2.1, 2.7][attackTier(S)] || 1;
        this.slash.style.transform = `translate3d(${sx}px,${q(GROUND - 36)}px,0) scale(${k})`;
      }
    }
    if (this.slash.classList.contains("on") !== !!slashOn) { this.slash.classList.toggle("on", !!slashOn); mark("slash"); }
    // Style de la lame selon le palier d'attaque (taille, couleur, lame croisée, lueur).
    const tierKey = S.cls + ":" + attackTier(S);
    if (tierKey !== this.slashTier) {
      const t = attackTier(S);
      if (this.slashTier && +this.slashTier.split(":")[1] < t && this.slashTier.split(":")[0] === S.cls)
        this.juice.banner(`${tx("Attaque de base : {0} !", { 0: ATTACK_TIERS[t].name })}`, CLASS_FX[S.cls] || "#fff", this.heroX + 80, true);
      this.slashTier = tierKey;
      // (it. 1065) rangs 2 à 4 : lueur dessinée une fois dans une image (bakedSlash), plus de filtre drop-shadow ; la lame
      // s'allume à chaque coup et le filtre (trois ombres jusqu'à 18 px au rang 4) était recalculé sans cesse : ≈ 8 points
      // d'un cœur en fin de partie (bande 32 → 24 %)
      const img = t >= 2 ? bakedSlash(t, CLASS_FX[S.cls] || "#fff") : null;
      this.slash.className = "slash t" + t + (img ? " baked" : "") + (slashOn ? " on" : "");
      this.slash.style.setProperty("--c", CLASS_FX[S.cls] || "#fff");
      this.slash.style.backgroundImage = img ? `url(${img})` : "";
    }

    this.updateSpeech(dt, x);
    // Fondu (changement de zone, retour au départ)
    if (this.fadeT > 0) this.fadeT = Math.max(0, this.fadeT - dt);
    const fo = Math.round(Math.min(1, this.fadeT / 0.4) * 8) / 8;
    if (fo !== this.fadeO) { this.fadeO = fo; this.fade.style.opacity = fo; mark("fade"); }

    this.drawHudLeft();
    this.drawHudRight();
    this.updateHudBars();
    const xpPct = (100 * S.xp / game.xpNeed()).toFixed(1);
    if (xpPct !== this.xpKey) { this.xpKey = xpPct; this.xpFill.style.transform = `scaleX(${xpPct / 100})`; mark("xp"); }
  }

  /* ---------- ATH (redessinés seulement quand le texte change) ---------- */
  drawHudLeft() {
    const S = this.game.S, label = tx("Zone ") + S.zone + "  " + this.game.zoneName();
    // Record à battre (toutes courses confondues), tant que la course actuelle est en dessous.
    // Événement en cours (nom et secondes restantes, dans sa couleur), sinon le record à battre.
    const ev = Object.entries(this.game.R.events || {}).find(([id, t]) => t > 0 && EVENTS[id]);
    // Héros bloqué (demande 22) : « ⚠ bloqué » en rouge, visible d'un coup d'œil sans ouvrir le panneau.
    const stuck = this.game.stuckInfo();
    const rec = recordZone(S), recTxt = ev ? `${EVENTS[ev[0]].name} ${uS(Math.ceil(ev[1]))}` : stuck ? "⚠ " + tx("bloqué") : S.zone < rec ? tx("record {0}", { 0: rec }) : "";
    const recCol = ev ? EVENTS[ev[0]].color : stuck ? "#ff6b5a" : "#a29ec2";
    const key = label + "|" + S.kills + "/" + this.game.lineup().length + "|" + recTxt; // (it. 1852) longueur de la série
    if (key === this.hudLKey) return;
    this.hudLKey = key; mark("hud");
    const ctx = this.hudL.ctx;
    ctx.clearRect(0, 0, HUD_L_W, HUD_H);
    ctx.font = FONT;
    const lw0 = ctx.measureText(label).width, rw = recTxt ? ctx.measureText(recTxt).width + 10 : 0;
    this.hudLRight = Math.min(HUD_L_W - 2, 14 + lw0 + 6 + this.game.lineup().length * 9 + 18 + rw); // bord droit de la pastille (bulle du héros)
    drawPill(ctx, 3, this.hudLRight, HUD_H);
    if (this.centerHud) { this.hudLX = Math.round(this.W / 2 - 6 - this.hudLRight); this.hudL.c.style.left = this.hudLX + "px"; this.placeTab(); }
    drawText(ctx, label, 10, 17, "#ffffff");
    ctx.font = FONT;
    let px = 14 + ctx.measureText(label).width + 6;
    for (let i = 0, nk = this.game.lineup().length; i < nk; i++) { ctx.fillStyle = OUTLINE; ctx.fillRect(px - 1, 8, 8, 8); ctx.fillStyle = i < S.kills ? "#ffd34d" : "#4a4560"; ctx.fillRect(px, 9, 6, 6); px += 9; }
    ctx.fillStyle = OUTLINE; ctx.fillRect(px + 1, 6, 12, 12);
    ctx.fillStyle = S.kills >= this.game.lineup().length ? "#ff6b5a" : "#6b3040"; ctx.fillRect(px + 2, 7, 10, 10);
    ctx.fillStyle = OUTLINE; ctx.fillRect(px + 4, 10, 2, 2); ctx.fillRect(px + 8, 10, 2, 2);
    if (recTxt) drawText(ctx, recTxt, px + 20, 17, recCol);
  }

  /** (it. 1531, demande de Victor) Barres de vie du héros et du monstre affronté dans la rangée d'informations (réglage
   *  « Barres de vie en haut de la bande », activé par défaut). Mode centré : à gauche de la pastille de la zone et après
   *  les boutons ; aux bords : à la suite de la pastille de la zone, s'il y a la place. Le monstre seulement en combat. */
  updateHudBars() {
    const g = this.game, S = g.S, R = g.R, BW = HUD_BAR_PILL, gap = 8;
    let hx = 0, mx = 0, fits = false, monFits = false;
    if (S.settings.hudBars !== false) {
      if (this.centerHud && this.hudSpan) { hx = Math.round((this.hudLX || 0) + 3 - gap - BW); mx = Math.round(this.hudSpan[1] + gap); fits = hx >= 0; monFits = fits && mx + BW <= this.W; }
      // aux bords : les deux à la suite de la pastille de la zone (avant la pastille or / niveau, le monstre passait sur le
      // nom du boss, qui s'étend vers la gauche depuis le boss)
      // (écran étroit : la barre du héros seule, s'il n'y a pas la place pour les deux)
      else { hx = Math.round((this.hudLRight || 0) + gap); mx = hx + BW + gap; const lim = (this.hudRLeft || this.W) - 300; fits = hx + BW + 24 <= lim; monFits = mx + BW + 24 <= lim; }
    }
    // (it. 1536, demande de Victor) la barre du monstre reste affichée entre deux combats : le dernier monstre, vide
    const fight = R.mode === "fight" && R.mon;
    this.hpHero.visible(fits); this.hpMon.visible(monFits);
    this.hpBars = fits ? [[hx, hx + BW]].concat(monFits ? [[mx, mx + BW]] : []) : null;
    if (!fits) return;
    const hs = g.stats(), hp = Math.max(0, R.hp), sh = R.mode === "fight" ? (R.shield || 0) : 0;
    this.hpHero.place(hx);
    this.hpHero.icon(heroHeadURL(S.cls, heroVisual(S), 36), this.heroCls);
    // (it. 1535) K.O. : « K.O. · 3 s » (temps avant le retour) au lieu d'un « 0 » sans explication
    if (R.mode === "dead") this.hpHero.set(0, hs.hp, 0, tx("K.O. · {0} s", { 0: Math.max(1, Math.ceil(R.deadT || 0)) }));
    else this.hpHero.set(hp, hs.hp, sh, fmtShort(hp), sh > 0 ? "+" + fmtShort(sh) : "");
    if (!monFits) return;
    this.hpMon.place(mx);
    // (it. 1539, demande de Victor) entre deux combats : le prochain monstre de la file (ou le boss), et non un « 0 »
    // (calcul en cache : zone et rang dans la file inchangés, au plus deux fois par seconde pour suivre un perçage)
    const nk = S.zone + "|" + S.kills, now = performance.now();
    if (!fight && (nk !== this.nextFoeKey || now - (this.nextFoeT || 0) > 500)) { this.nextFoeKey = nk; this.nextFoeT = now; this.nextFoeVal = g.nextFoe(); }
    const m = fight ? R.mon : this.nextFoeVal;
    if (!m) { this.hpMon.set(0, 1, 0, "—"); return; }
    const msh = m.shell > 0 ? m.shell : 0;
    const art = m.boss ? majorBoss(S.zone)?.art : null; // (it. 1847) lieutenant du Briseur : son propre dessin
    const ik = m.type + "|" + !!m.boss + "|" + isFinalZone(S.zone) + "|" + (art || "");
    if (!this.monIcons.has(ik)) {
      const set = isFinalZone(S.zone) && m.boss ? this.sprites.starbreaker : (art && this.sprites.major(art)) || this.sprites.monsters[m.type];
      const f = set && (m.boss ? set.boss : set.normal);
      let url = "";
      try { url = f && f[0] ? f[0].toDataURL() : ""; } catch (e) { url = ""; }
      this.monIcons.set(ik, url);
    }
    this.hpMon.icon(this.monIcons.get(ik), ik);
    this.hpMon.set(Math.max(0, m.hp), m.max, msh, fmtShort(Math.max(0, m.hp)), msh > 0 ? "+" + fmtShort(msh) : "");
  }

  /** (it. 874) Bandes horizontales [début, fin] occupées par les pastilles d'informations (hauteur HUD_H, en haut) :
   *  la météo (bulles, flocons, feuilles…) n'y est pas dessinée, elle passait par-dessus « Zone 55 · Récif… ». */
  hudBands() {
    const H = HUD_H + 2;
    if (this.centerHud && this.hudSpan) return { h: H, bands: [this.hudSpan].concat(this.hpBars || []) };
    const bands = [];
    if (this.hudLRight) bands.push([0, this.hudLRight + 2]);
    if (this.hudRLeft) bands.push([this.hudRLeft - 2, this.W]);
    if (this.hpBars) bands.push(...this.hpBars); // (it. 1531) barres de vie : la météo ne passe pas dessus
    return { h: H, bands };
  }

  /** Mode centré : boutons après la pastille or / niveau ; languette cliquable sur les deux pastilles. */
  placeTab() {
    const L = (this.hudLX || 0) + 3, Rr = this.hudRRight || this.W / 2;
    const btns = this.root.querySelector(".strip-btns"), tab = this.root.querySelector("#hud-tab");
    if (btns) btns.style.left = (Rr + 6) + "px";
    if (tab) { tab.style.left = L + "px"; tab.style.width = Math.max(0, Rr - L) + "px"; }
    this.hudSpan = [L, Rr + 6 + (btns ? btns.offsetWidth : 60)];
    if (this.onTab) this.onTab();
  }

  /** Nom du boss (it. 854) : il s'étend vers la gauche depuis le boss ; un nom long (allemand : « Abgrundpanzer der
   *  Erwachte · −10 % LP ») passait sous la pastille or / niveau. On le décale vers la gauche juste ce qu'il faut. */
  placeBossName() {
    const t = this.bossTag;
    if (!t || !t.isConnected) return;
    let off = 40;
    if (!this.centerHud && this.hudRLeft) off -= Math.max(0, this.fightX(this.fights()) + this.bossW / 2 + off - (this.hudRLeft - 8));
    const v = `calc(-100% + ${Math.round(off)}px) 0`;
    if (t.style.translate !== v || this.tagsFor !== this.slotKey) { t.style.translate = v; this.bossObs = null; this.tagsFor = this.slotKey; this.clearQueueTags(); }
  }

  /**
   * (it. 892) Le nom du boss s'étend vers la gauche au-dessus de la file : l'étiquette d'affixe d'une élite (souvent
   * un monstre volant, plus haut) pouvait passer dessous (« Furieux » sur « Carapace-des-Abysses »). Elle passe alors
   * sous le monstre (décalée à gauche, elle s'éloignait de lui et se chevauchait avec la voisine). Mesuré seulement
   * quand la série ou la place du nom change (jamais à chaque image).
   */
  clearQueueTags() {
    const t = this.bossTag;
    if (!t || !t.isConnected) return;
    const b = t.getBoundingClientRect();
    for (const a of this.slots.slice(0, -1)) {
      const tag = a.el.querySelector(".affix");
      if (!tag) continue;
      tag.style.top = "";
      const r = tag.getBoundingClientRect();
      if (r.right > b.left - 4 && r.left < b.right && r.bottom > b.top - 2 && r.top < b.bottom + 2) tag.style.top = (a.h + 1) + "px";
    }
  }

  drawHudRight() {
    const S = this.game.S, gt = fmt(S.gold).replace(/[  ]/g, " "), // espaces fines : absentes de la police pixel du canevas
      lvlTxt = tx("Niv. ") + S.lvl,
      // (it. 1340) élixirs, parchemins et encens actifs : une icône chacun devant l'or (4 au plus, puis « +N »),
      // redessinés seulement quand la liste change (pas à chaque seconde)
      buffs = CONSUMABLES.filter((c) => c.kind === "buff" && (S.buffs[c.id] || 0) > 0).map((c) => c.id),
      // (it. 1546, retour d'un joueur : « on sait pas où est l'xp, on monte de niveau sans savoir comment ») jauge
      // d'expérience sous le niveau, par pas de 2 % (redessinée au plus 50 fois par niveau)
      xpStep = Math.min(50, Math.floor(50 * S.xp / Math.max(1, this.game.xpNeed()))),
      flash = (this.lvlFlash || 0) > this.game.R.time, // (it. 1570) niveau gagné : jauge dorée, pleine, un instant
      key = gt + "|" + lvlTxt + "|" + buffs.join(",") + "|" + xpStep + "|" + flash;
    if (key === this.hudRKey) return;
    this.hudRKey = key; mark("hud");
    const ctx = this.hudR.ctx, right = HUD_R_W - 10;
    ctx.clearRect(0, 0, HUD_R_W, HUD_H);
    ctx.font = FONT;
    const lw = ctx.measureText(lvlTxt).width;
    const shown = buffs.length > 4 ? buffs.slice(0, 3) : buffs, more = buffs.length - shown.length,
      moreTxt = more ? "+" + more : "", iconsW = shown.length * 21 + (more ? ctx.measureText(moreTxt).width + 4 : 0) + (buffs.length ? 6 : 0);
    const pillL = Math.max(2, right - 14 - lw - ctx.measureText(gt).width - 22 - iconsW);
    this.hudRLeft = this.W - HUD_R_W - this.rightReserve + pillL; // bord gauche de la pastille or / niveau (bulle du héros)
    if (this.centerHud) { // pastille or / niveau juste à droite du milieu, puis les boutons
      const x = Math.round(this.W / 2 + 6 - pillL);
      this.hudR.c.style.left = x + "px";
      this.hudRRight = x + HUD_R_W - 3;
      this.hudRLeft = x + pillL;
      this.placeTab();
    }
    this.placeBossName();
    drawPill(ctx, pillL, HUD_R_W - 3, HUD_H);
    drawText(ctx, lvlTxt, right, 15, "#ffffff", "right");
    const gw = Math.round(lw), gx = right - gw;
    ctx.fillStyle = "#3a3458"; ctx.fillRect(gx, 18, gw, 3);
    ctx.fillStyle = flash ? "#ffe27a" : "#b48cff"; ctx.fillRect(gx, 18, flash ? gw : Math.round(gw * xpStep / 50), 3);
    drawText(ctx, gt, right - 14 - lw, 16, "#ffd34d", "right");
    ctx.font = FONT;
    drawCoin(ctx, right - 14 - lw - ctx.measureText(gt).width - 14, 6);
    let bx = pillL + 8;
    for (const id of shown) { const ic = shopIconCanvas(id, 2); ctx.drawImage(ic, bx, Math.round((HUD_H - ic.height) / 2)); bx += 21; }
    if (more) drawText(ctx, moreTxt, bx + 1, 17, "#cfc6e8", "left");
  }
}
