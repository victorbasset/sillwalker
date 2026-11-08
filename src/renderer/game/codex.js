// Collection d'objets : chaque type d'objet (Épée, Capuche, Talisman…) trouvé
// au moins une fois entre dans la collection, avec la meilleure rareté obtenue.
// Bonus permanents (conservés à l'ascension) :
//   - chaque type trouvé            : +0,5 % de chances de butin ;
//   - chaque type trouvé en épique  : +1 % d'or ;
//   - chaque type trouvé légendaire : +1 % d'attaque.
import { ITEM_BASES, SLOT_KEYS } from "./data.js";

export const CODEX_BONUS = { found: { drop: 0.5 }, epic: { gold: 1 }, legendary: { atkPct: 1 } };

/** Clé de collection d'un type d'objet. */
export const codexKey = (slot, baseName) => slot + ":" + baseName;

/** Toutes les entrées de la collection, dans l'ordre des emplacements. */
export const CODEX_ENTRIES = SLOT_KEYS.flatMap((slot) => ITEM_BASES[slot].map((b) => ({ key: codexKey(slot, b.n), slot, name: b.n, icon: b.icon })));

/** Retrouve le type d'un objet (objets d'avant la collection : par le nom). */
export function itemBaseKey(it) {
  if (it.base) return it.base;
  const list = ITEM_BASES[it.slot] || [];
  let best = null;
  for (const b of list) if (it.name && (it.name === b.n || it.name.startsWith(b.n + " ")) && (!best || b.n.length > best.n.length)) best = b;
  return best ? codexKey(it.slot, best.n) : null;
}

/** Enregistre un objet ; renvoie true si c'est une nouveauté (type ou rareté). */
export function codexRecord(S, it) {
  const k = itemBaseKey(it);
  if (!k) return false;
  const C = (S.codex ||= {});
  if (C[k] != null && C[k] >= it.r) return false;
  const isNew = C[k] == null;
  C[k] = it.r;
  return isNew ? "new" : "better";
}

export function codexEffects(S) {
  const C = S.codex || {}, out = {};
  let found = 0, epic = 0, leg = 0;
  for (const k in C) { found++; if (C[k] >= 3) epic++; if (C[k] >= 4) leg++; }
  const add = (eff, n) => { if (n) for (const s in eff) out[s] = (out[s] || 0) + eff[s] * n; };
  add(CODEX_BONUS.found, found); add(CODEX_BONUS.epic, epic); add(CODEX_BONUS.legendary, leg);
  return out;
}

export function codexCounts(S) {
  const C = S.codex || {};
  let found = 0, epic = 0, leg = 0;
  for (const e of CODEX_ENTRIES) { const r = C[e.key]; if (r == null) continue; found++; if (r >= 3) epic++; if (r >= 4) leg++; }
  return { found, epic, leg, total: CODEX_ENTRIES.length };
}
