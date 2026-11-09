// Rangées à défilement latéral (demande 32 de Victor) : plutôt qu'une longue page qui défile verticalement,
// une rangée de cartes qui défile de côté, à la molette (sans Maj) ou en appuyant puis en glissant.
// Usage : un conteneur `<div class="hscroll" data-hs="clé">` ; la clé sert à garder la position d'un rendu à l'autre.
// `data-hs-start` sur une carte : position de départ (la première fois), par exemple le prochain déblocage.

const DRAG_MIN = 6; // pixels avant qu'un appui devienne un glissement (en dessous, c'est un clic normal)

/** Fondu sur le bord où il reste des cartes cachées (pas de texte d'aide : demande de Victor). */
export function edgeHints(row) {
  const max = row.scrollWidth - row.clientWidth;
  row.classList.toggle("more-l", max > 1 && row.scrollLeft > 1);
  row.classList.toggle("more-r", max > 1 && row.scrollLeft < max - 1);
}

/** Branche la molette et le glisser sur `root` (délégation : marche pour les rangées créées plus tard). */
export function initHScroll(root) {
  root.addEventListener("scroll", (e) => { if (e.target.classList && e.target.classList.contains("hscroll")) edgeHints(e.target); }, true);
  root.addEventListener("wheel", (e) => {
    const row = e.target.closest && e.target.closest(".hscroll");
    if (!row || row.scrollWidth <= row.clientWidth + 1) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const max = row.scrollWidth - row.clientWidth;
    // Au bout de la rangée, la molette reprend son rôle normal (la page peut défiler).
    if ((d < 0 && row.scrollLeft <= 0) || (d > 0 && row.scrollLeft >= max - 1)) return;
    row.scrollLeft += d * (e.deltaMode === 1 ? 32 : 1);
    e.preventDefault();
  }, { passive: false });

  let drag = null;
  root.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const row = e.target.closest && e.target.closest(".hscroll");
    if (!row || row.scrollWidth <= row.clientWidth + 1) return;
    drag = { row, x: e.clientX, left: row.scrollLeft, moved: false, id: e.pointerId };
  });
  root.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < DRAG_MIN) return;
    if (!drag.moved) { drag.moved = true; drag.row.classList.add("dragging"); try { drag.row.setPointerCapture(e.pointerId); } catch { /* déjà relâché */ } }
    drag.row.scrollLeft = drag.left - dx;
  });
  const end = () => {
    if (!drag) return;
    const d = drag; drag = null;
    d.row.classList.remove("dragging");
    // Un glissement ne doit pas finir en clic sur le bouton sous le pointeur.
    // Seulement le clic qui suit aussitôt le relâchement : s'il ne vient pas, le clic suivant ne doit pas être avalé.
    if (d.moved) {
      const eat = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
      root.addEventListener("click", eat, { capture: true, once: true });
      setTimeout(() => root.removeEventListener("click", eat, { capture: true }), 60);
    }
  };
  root.addEventListener("pointerup", end);
  root.addEventListener("pointercancel", end);
}

/** Positions des rangées avant un nouveau rendu (clé → scrollLeft). */
export function saveHScroll(root, store) {
  for (const row of root.querySelectorAll(".hscroll[data-hs]")) store.set(row.dataset.hs, row.scrollLeft);
}

/** Après le rendu : position gardée, ou la première fois la carte `data-hs-start`. */
export function restoreHScroll(root, store) {
  for (const row of root.querySelectorAll(".hscroll[data-hs]")) {
    const k = row.dataset.hs;
    if (store.has(k)) { row.scrollLeft = store.get(k); edgeHints(row); continue; }
    const start = row.querySelector("[data-hs-start]");
    if (start) row.scrollLeft = Math.max(0, start.offsetLeft - row.offsetLeft - 8);
    store.set(k, row.scrollLeft);
    edgeHints(row);
  }
}
