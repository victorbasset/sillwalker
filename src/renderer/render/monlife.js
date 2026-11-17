// (it. 1850, journée des monstres, demande de Victor : « que le Rebord devienne plus vivant, comme si on parcourait
// vraiment une zone ; que les monstres paraissent dotés d'une intelligence ») Vie des monstres qui attendent leur tour
// sur la bande : chacun bouge selon sa nature, à son propre rythme, et réagit quand le héros approche.
//
// Tout est calculé à partir du temps de jeu et d'une graine propre à chaque place : pas d'état à sauver, pas d'animation
// CSS (CLAUDE.md : une animation CSS permanente sur la bande coûte ≈ 9 points d'un cœur). Les positions passent par
// Actor.move, qui n'écrit dans la page que lorsque la position change d'un pas de pixel (3 px) : un monstre qui flâne à
// 6 px/s ne coûte que deux écritures par seconde.

/** Natures (selon le dessin de base, `def.art || type`) ; les volants (set.fly) planent, quelle que soit leur nature. */
const NATURE = {
  // sautillent sur place, de temps en temps
  slime: "hop", frog: "hop",
  // filent par à-coups, puis s'arrêtent net
  rat: "skitter", spider: "skitter", scorp: "skitter", beetle: "skitter", lizard: "skitter", snake: "skitter", crab: "skitter",
  // colosses : presque immobiles, un pas de temps en temps
  golem: "still", plant: "still", treant: "still", mummy: "still", worm: "still",
  // la mimique se fait passer pour un coffre : elle ne bouge pas d'un pixel tant qu'on ne l'attaque pas
  mimic: "statue",
  // (it. 1882) Poupouce : trottine par petites courses vives, et quand le héros approche, il recule pour filer
  poupouce: "cat",
};
/** (it. 1867, 1923) Craintifs (reculent plus loin, s'écartent des prédateurs) et prédateurs. Dessin de base. */
export const TIMID = new Set(["rat", "goblin", "bandit", "imp", "frog", "crow", "lizard"]);
export const PREDATORS = new Set(["wolf", "bear", "snake", "drake", "boar", "spider", "yeti"]);
/**
 * (it. 2004-2022, extrait à l'it. 2023) Geste imposé par le climat de la zone (météo de juice.js WEATHER), ou null.
 *  art : dessin de base ; el : élément de la variante (monskills elementOf : fire, frost, poison, shadow) ; wx : météo.
 *  neige : qui n'est pas fait pour le froid grelotte ; braises : yétis et variantes de givre s'affaissent ; sous l'eau
 *  (bulles) : créatures de feu aussi ; spores : on éternue (sauf champignons et plantes) ; cendres : on tousse (même geste ;
 *  pas les golems, squelettes, momies, élémentaires de feu).
 */
export function climateGesture(art, el, wx) {
  if (wx === "snow" && art !== "yeti" && el !== "frost") return "rattle";
  if (wx === "ember" && (art === "yeti" || el === "frost")) return "still";
  if (wx === "bubble" && (art === "imp" || art === "fireelem" || el === "fire")) return "still";
  if (wx === "spore" && !["mush", "sporeling", "plant", "treant"].includes(art)) return "sneeze";
  if (wx === "ash" && !["golem", "skel", "fireelem", "mummy"].includes(art)) return "sneeze";
  return null;
}
/**
 * (it. 1936-1992) Geste au repos propre à l'espèce (dessin de base) : l'araignée remonte sur son fil, plantes, sylvains,
 * cultiste, serpent et harpie se balancent, la momie traîne le pas, sanglier et crabe grattent / font un pas de côté, ours,
 * wyverne et scorpion se dressent, squelette et guêpe s'entrechoquent / bourdonnent, bandit et diablotin se retournent, orc,
 * yéti, méduse, tyrannœil, élémentaire de feu et champignons battent ou palpitent, chevaliers saluent, le loup lève la tête,
 * le lézard se camoufle. Sans entrée : le geste de sa nature.
 */
export const ART_GEST = { spider: "spider", plant: "sway", treant: "sway", mummy: "shuffle", boar: "paw", bear: "rear", skel: "rattle", bandit: "look", cultist: "sway", orc: "beat", knight: "salute", darkknight: "salute",
            // (it. 1949) le yéti se frappe la poitrine, la méduse pulse, le serpent ondule, le crabe fait un pas de côté, le loup
            // lève la tête (un petit hurlement muet)
            yeti: "beat", jelly: "beat", snake: "sway", crab: "paw", wolf: "howl",
            // (it. 1973) la guêpe bourdonne, le diablotin espiègle se retourne, la harpie se balance, la wyverne se cabre, le
            // tyrannœil et l'élémentaire de feu palpitent
            wasp: "rattle", imp: "look", harpy: "sway", drake: "rear", eye: "beat", fireelem: "beat",
            // (it. 1985) le lézard se fond dans le décor (camouflage, comme son Embuscade)
            lizard: "camo",
            // (it. 1992) champignards et champignons errants se gonflent (spores), le scorpion dresse la queue
            mush: "beat", sporeling: "beat", scorp: "rear" };
/** Durée (s) de chaque geste ; par défaut 1 s pour les colosses, 0,6 s sinon. */
const GEST_D = { camo: 2.2, howl: 0.9, spider: 1.6, sway: 1.4, rear: 1.2, paw: 0.9, look: 1.6, beat: 0.9, salute: 0.8 };
/** (it. 2024) Geste au repos : le climat de la zone d'abord, puis l'espèce, puis la nature. Renvoie { nat, d }. */
export function gestureOf(art, nature, el, wx) {
  const nat = climateGesture(art, el, wx) || ART_GEST[art] || nature;
  return { nat, d: GEST_D[nat] || (nature === "still" ? 1 : 0.6) };
}
/**
 * (it. 1933-2022, extrait à l'it. 2025) Mouvement d'un geste au repos à l'avancement p (0 → 1) : { dx, dy } en px (dy < 0 :
 * vers le haut), et flip (« look » : le monstre se retourne) ; le fil de l'araignée est dessiné par strip.js.
 */
export function gestureMotion(nat, p) {
  const sn = Math.sin(p * Math.PI);
  let dx = 0, dy = 0, flip;
  switch (nat) {
    case "spider": dy = -sn * 24; break;
    case "skitter": dx = Math.floor(p * 6) % 2 ? 3 : -3; break;
    case "look": flip = p < 0.3 ? false : p < 0.65; break;
    case "beat": dy = Math.floor(p * 8) % 2 ? -3 : 0; break;
    case "salute": dy = Math.floor(p * 4) % 2 ? 0 : -3; break;
    case "sneeze": dx = p > 0.55 && p < 0.7 ? -6 : 0; dy = p > 0.3 && p < 0.55 ? -3 : 0; break;
    case "paw": dx = Math.floor(p * 6) % 2 ? 3 : 0; break;
    case "rear": dy = -Math.round(Math.min(1, sn * 1.6) * 2) * 3; break;
    case "rattle": dx = Math.floor(p * 16) % 2 ? 3 : -3; break;
    case "sway": dx = Math.round(Math.sin(p * Math.PI * 2) * 1.4) * 3; break;
    case "shuffle": dx = p < 0.5 ? -3 : p < 0.8 ? -6 : -3; break;
    case "still": dy = sn * 3; break;
    // (it. 1938) 6 px, pas 9 : un volant au plus haut de sa croisière touchait la rangée d'informations (26 px)
    case "fly": dy = -sn * 6; break;
    case "hop": dy = -sn * 7; break;
    // (it. 1949) le loup : la tête levée suffit (howlT) ; le lézard camouflé ne bouge pas
    case "howl": case "camo": break;
    default: dy = -sn * 3;
  }
  return { dx: dx || 0, dy: dy || 0, flip };
}
/** Natures par défaut : les autres marchent (flânent autour de leur place). */
export const natureOf = (art, fly) => (fly ? "fly" : NATURE[art] || "wander");

/** Graine d'une place (zone, rang) : chaque monstre a son rythme, stable pendant toute la série. */
export function lifeSeed(zone, k) {
  let h = (zone * 73856093) ^ (k * 19349663);
  h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
  return ((h ^ (h >>> 15)) >>> 0) / 4294967296;
}

const smooth = (t) => t * t * (3 - 2 * t);
/** Bruit lisse dans [-1, 1] : interpolation entre des valeurs tirées toutes les `period` secondes. */
function drift(t, seed, period) {
  const u = t / period + seed * 97, i = Math.floor(u), f = smooth(u - i);
  const v = (n) => (Math.sin((n + seed * 13) * 12.9898) * 43758.5453) % 1;
  return v(i) * (1 - f) + v(i + 1) * f;
}

/**
 * Décalage d'un monstre en attente à l'instant t.
 *  nature : voir NATURE ; seed : lifeSeed ; heroDist : distance (px) entre le héros et la place du monstre ;
 *  boss : les boss gardent leur place (un balancement à peine).
 * Renvoie { dx, dy, face } : décalage horizontal et vertical (px), face = 1 tourné vers le héros (gauche), -1 vers la droite.
 */
export function lifeOffset(nature, seed, t, heroDist, boss = false) {
  // Vigilance : à moins de 150 px, le monstre a vu le héros ; il revient à sa place et lui fait face (à 60 px : en place)
  const alert = heroDist < 150 ? Math.min(1, (150 - heroDist) / 90) : 0, calm = 1 - alert;
  // (it. 1883) le boss garde sa place mais respire : balancement lent ; il se redresse quand le héros approche
  if (boss) return { dx: Math.round(Math.sin(t * 0.6 + seed * 6) * 3 * calm) || 0, dy: -2 * alert, face: 1 };
  let dx = 0, dy = 0, face = 1;
  switch (nature) {
    case "statue": {
      // (it. 1916) immobile tant que le héros est loin ; quand son tour approche (héros à moins de 140 px), elle se trahit : un frisson de 0,15 s
      // toutes les 2,5 à 4 s, le couvercle qui tressaille
      const per = 2.5 + seed * 1.5, ph = (t + seed * per) % per;
      if (alert > 0.1 && ph < 0.15) { dx = Math.floor(ph * 40) % 2 ? 3 : -3; dy = -3; } // un pixel du dessin (3 px : Actor.move arrondit)
      break;
    }
    case "cat": {
      // petites courses vives (comme un furtif), mais le héros qui approche le fait reculer, dos tourné : il veut filer
      const per = 1.4 + seed, i = Math.floor((t + seed * 3) / per), ph = ((t + seed * 3) % per) / per;
      const at = (n) => ((Math.sin((n + seed * 23) * 6.7) * 5813.1) % 1) * 16;
      const from = at(i - 1), to = at(i), go = Math.min(1, ph / 0.2);
      dx = (from + (to - from) * smooth(go)) * calm + 14 * alert;
      face = alert > 0.2 ? -1 : go < 1 && to > from ? -1 : 1;
      return { dx: dx || 0, dy: 0, face };
    }
    case "fly": {
      // plane : grand balancement lent et dérive de part et d'autre de sa place, ailes au vent
      dx = drift(t, seed, 2.4) * 20 * calm;
      // (it. 1868) altitude propre : chaque volant croise plus haut ou plus bas, et elle change lentement (montée, descente)
      const cruise = -2 - seed * 4 + drift(t, seed * 3.7, 9) * 4 * calm; // au plus ≈ 12 px plus haut : la rangée d'informations (24 px) reste dégagée
      dy = cruise + Math.sin(t * (1.6 + seed) + seed * 6) * 4 - 2;
      const v = drift(t + 0.2, seed, 2.4) - drift(t, seed, 2.4);
      face = calm > 0.5 && v > 0.01 ? -1 : 1; // part vers la droite : il tourne le dos au héros
      break;
    }
    case "hop": {
      // un bond toutes les 2,5 à 4 s ; entre deux, il se ramasse sur place
      const per = 2.5 + seed * 1.5, ph = ((t + seed * per) % per) / per;
      if (ph > 0.85) dy = -Math.sin((ph - 0.85) / 0.15 * Math.PI) * (5 + 4 * calm);
      dx = drift(t, seed, per * 2) * 8 * calm;
      break;
    }
    case "skitter": {
      // file vite sur quelques pixels, puis se fige : un insecte, un reptile aux aguets
      const per = 1.8 + seed * 1.6, i = Math.floor((t + seed * 5) / per), ph = ((t + seed * 5) % per) / per;
      const at = (n) => ((Math.sin((n + seed * 31) * 7.13) * 9301.17) % 1) * 18;
      const from = at(i - 1), to = at(i), go = Math.min(1, ph / 0.18);
      dx = (from + (to - from) * smooth(go)) * calm;
      face = calm > 0.5 && go < 1 && to > from ? -1 : 1;
      break;
    }
    case "still": {
      // colosse : un pas d'un côté ou de l'autre de loin en loin
      dx = Math.round(drift(t, seed, 7) * 2) * 3 * calm;
      break;
    }
    default: { // wander : choisit un point à ±30 px de sa place, y marche (≈ 12 px/s), s'arrête, puis repart ailleurs
      const per = 3 + seed * 2.5, u = t + seed * 11, i = Math.floor(u / per), ph = (u % per) / per;
      const at = (n) => ((Math.sin((n + seed * 17) * 5.31) * 7919.3) % 1) * 30;
      const from = at(i - 1), to = at(i), md = Math.min(0.7, Math.abs(to - from) / 12 / per), go = md > 0 ? Math.min(1, ph / md) : 1;
      dx = (from + (to - from) * smooth(go)) * calm;
      face = calm > 0.5 && go < 1 && to > from ? -1 : 1; // marche vers la droite : dos au héros ; à l'arrêt, il regarde vers lui
    }
  }
  return { dx: dx || 0, dy: dy || 0, face }; // (|| 0 : pas de « -0 » quand calm vaut 0)
}
