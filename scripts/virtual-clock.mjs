// Horloge virtuelle des simulations (it. 1009). La boutique (renouvellement de l'étal, Marchand attitré), les
// expéditions et les familiers lisent Date.now() ; une semaine simulée ne dure que quelques minutes réelles : l'étal
// ne se renouvelait presque jamais, aucune expédition ne revenait, et le résultat dépendait de la vitesse de la
// machine et de l'heure (mage, semaine : 184 ou 291 avec le même code). Importé EN PREMIER (avant la création de la
// partie) : Date.now() part d'une date fixe ; useVirtualClock(g) le fait avancer avec chaque g.advance(dt).
const START = Date.UTC(2026, 0, 5, 12, 0, 0);
let vt = START;
export const realNow = Date.now.bind(Date); // durée réelle d'exécution (affichage)
Date.now = () => vt;
export const virtualNow = () => vt;
export function useVirtualClock(g) {
  const adv = g.advance.bind(g);
  g.advance = (dt, ...rest) => { const r = adv(dt, ...rest); vt += dt * 1000; return r; };
  return g;
}
