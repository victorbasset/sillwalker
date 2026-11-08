// Clics traversants : la fenêtre ignore la souris (les clics passent aux
// fenêtres derrière) sauf au-dessus des éléments `.hit`.
//
// La page déclare au processus principal les rectangles de ses éléments
// cliquables ; c'est lui qui compare la position du curseur (20 fois/s) et
// rend la fenêtre cliquable au besoin. Aucun mouvement de souris n'est
// transmis à la page tant qu'on ne survole pas un élément cliquable : le jeu
// ne consomme donc rien quand on bouge la souris ailleurs (en jouant, par ex.).
export function initClickThrough(api) {
  let last = "";
  function rects() {
    const out = [];
    for (const el of document.querySelectorAll(".hit")) {
      if (el.hidden || el.closest("[hidden]")) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const r = el.getBoundingClientRect();
      if (r.width && r.height) out.push([Math.floor(r.left), Math.floor(r.top), Math.ceil(r.width), Math.ceil(r.height)]);
    }
    return out;
  }
  return {
    /** À appeler quand la mise en page change (panneau, toast, mode...). */
    refresh() {
      const r = rects(), key = JSON.stringify(r);
      if (key === last) return;
      last = key;
      api.setHitRects(r);
    },
  };
}
