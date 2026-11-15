// (it. 1544, signalé par Victor) Un bouton enfoncé descend de 2 px (styles.css, button:active). Un clic sur son rebord
// haut : le bouton s'enfonce sous le curseur, le relâchement tombe juste au-dessus, hors du bouton, et le navigateur
// n'envoie pas le clic (bouton « Renouveler l'étal »). Si le bouton pressé est relâché à 4 px au plus de son cadre,
// on le clique quand même.
export function installPressFix(root = window) {
  let pressed = null;
  root.addEventListener("pointerdown", (e) => { pressed = e.button === 0 ? e.target.closest?.("button") || null : null; }, true);
  root.addEventListener("pointerup", (e) => {
    const b = pressed; pressed = null;
    if (!b || b.disabled || !b.isConnected || b.contains(e.target)) return;
    const r = b.getBoundingClientRect(), m = 4;
    if (e.clientX >= r.left - m && e.clientX <= r.right + m && e.clientY >= r.top - m && e.clientY <= r.bottom + m) b.click();
  }, true);
}
