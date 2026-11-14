// Bénédiction du jour : chaque jour (date locale), un modificateur différent
// s'applique à toute la partie. Le même pour tous les joueurs ce jour-là
// (choisi à partir de la date), ce qui donne une raison de revenir.
// `eff` : mêmes clés que les talents (talents.js > EFFECTS) ;
// `elite` / `goblin` : multiplicateurs des chances d'apparition ; `chest` : des coffres au trésor ; `events` : des événements rares.
export const DAY_MODS = {
  gold:    { icon: "💰", name: "Jour de fortune",   desc: "+50 % d’or.",                         eff: { gold: 50 } },
  wisdom:  { icon: "📜", name: "Jour du savoir",    desc: "+50 % d’expérience.",                  eff: { xp: 50 } },
  hunt:    { icon: "⚔", name: "Grande chasse",     desc: "Élites ×3, +25 % de chances de butin.", eff: { drop: 25 }, elite: 3 },
  wind:    { icon: "🍃", name: "Jour du vent",      desc: "+20 % de vitesse de déplacement.",     eff: { moveSpd: 20 } },
  fury:    { icon: "🔥", name: "Jour de furie",     desc: "+20 % d’attaque, +10 % de critique.",   eff: { atkPct: 20, crit: 10 } },
  bulwark: { icon: "🛡", name: "Jour du rempart",   desc: "+25 % de PV et de défense.",            eff: { hpPct: 25, defPct: 25 } },
  goblins: { icon: "👺", name: "Fête des gobelins", desc: "Gobelins voleurs ×4.",                  eff: { gold: 15 }, goblin: 4 },
  // (it. 887) une journée de trouvailles : coffres sur le chemin, en jeu comme pendant l'absence
  treasure: { icon: "💎", name: "Jour des trésors", desc: "Coffres au trésor ×3 sur le chemin.",   eff: {}, chest: 3 },
  // (it. 938) une journée de prodiges : événements rares deux fois plus fréquents (collection plus rapide)
  marvels: { icon: "🌠", name: "Jour des prodiges", desc: "Événements rares ×2.",                   eff: {}, events: 2 },
  // (it. 1222) journée défensive et réactive : esquiver puis rendre les coups
  shadows: { icon: "🌙", name: "Jour des ombres",   desc: "+15 % d’esquive, +20 % de riposte.",     eff: { dodge: 15, riposte: 20 } },
};
export const DAY_MOD_KEYS = Object.keys(DAY_MODS);

/** Empreinte FNV-1a d'un texte. */
function fnv(str) {
  let h = 2166136261;
  for (const c of String(str)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}
/** (it. 1237) Bénédictions d'origine : leur calendrier ne doit plus bouger. Chaque bénédiction ajoutée après (la n-ième)
 *  prend la place du jour avec une chance de 1 sur n (tirage « réservoir » : répartition toujours uniforme). Avant,
 *  ajouter le Jour des ombres (it. 1222) changeait le modulo : 27 jours sur 30 changeaient de bénédiction, celle du
 *  jour même comprise pour qui mettait le jeu à jour en cours de journée. */
const DAY_MODS_BASE = 9;
/** Modificateur du jour "AAAA-MM-JJ" (déterministe). */
export function dayModFor(day) {
  let k = DAY_MOD_KEYS[fnv(day) % DAY_MODS_BASE];
  for (let i = DAY_MODS_BASE; i < DAY_MOD_KEYS.length; i++) if (fnv(day + "#" + i) % (i + 1) === 0) k = DAY_MOD_KEYS[i];
  return k;
}

/** Modificateur actif de la partie (ou null). */
export const activeDayMod = (S) => DAY_MODS[S.daily?.mod] || null;

export function dayModEffects(S) {
  const m = activeDayMod(S);
  return m ? { ...m.eff } : {};
}

/** (it. 1226) Collection des bénédictions : chacune déjà vécue donne +1 % d'expérience pour toujours (10 au plus). */
export const BLESSING_SEEN_BONUS = { xp: 1 };
export function blessingsSeenEffects(S) {
  const seen = (S && S.daily && S.daily.seen) || {}, n = DAY_MOD_KEYS.filter((k) => seen[k]).length, out = {};
  if (n) for (const k in BLESSING_SEEN_BONUS) out[k] = BLESSING_SEEN_BONUS[k] * n;
  return out;
}
