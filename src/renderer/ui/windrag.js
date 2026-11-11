// Déplacer la fenêtre à la souris (it. 835, demande d'un joueur) : la bande vers un autre écran (ou en haut / en
// bas), le mode mini n'importe où. Appui puis glissement de plus de 5 px : le processus principal fait suivre le
// curseur à la fenêtre jusqu'au relâchement. Le clic qui suit un glissement est ignoré (il ouvrirait le panneau ou
// agrandirait le mode mini). Un simple clic garde son effet habituel.
export const DRAG_THRESHOLD = 5;

export function makeWindowDraggable(el, api, { onStart } = {}) {
  let down = null, dragging = false, swallow = false, swallowTimer = 0;
  el.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const btn = e.target.closest && e.target.closest("button");
    if (btn && btn !== el) return; // boutons posés dessus (son, réduire, étoile…) : clic normal
    down = { x: e.clientX, y: e.clientY, id: e.pointerId }; // la fenêtre ne bouge pas avant le seuil
  });
  el.addEventListener("pointermove", (e) => {
    if (!down || dragging) return;
    if (!(e.buttons & 1)) { down = null; return; }
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) <= DRAG_THRESHOLD) return;
    dragging = true;
    try { el.setPointerCapture(down.id); } catch { /* pointeur déjà relâché */ }
    if (onStart) onStart();
    document.body.classList.add("win-dragging");
    api.dragWindow?.("start");
  });
  const end = () => {
    down = null;
    if (!dragging) return;
    dragging = false;
    document.body.classList.remove("win-dragging");
    api.dragWindow?.("end");
    swallow = true;
    clearTimeout(swallowTimer);
    swallowTimer = setTimeout(() => { swallow = false; }, 400);
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener("lostpointercapture", end);
  window.addEventListener("blur", end);
  el.addEventListener("click", (e) => {
    if (!swallow) return;
    swallow = false;
    e.stopImmediatePropagation();
    e.preventDefault();
  }, true);
  return { isDragging: () => dragging };
}
