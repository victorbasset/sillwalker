// (it. 3070) Textes rognés par un cadre (overflow caché) dans chaque onglet du panneau : la mesure des débordements (lang-overflow)
// ne voit que ce qui fait défiler ; un texte coupé par son cadre lui échappe (it. 3069 : « …delà du Rebord » sur la Carte).
// Exclus : rangées défilantes (.hscroll), textes tronqués exprès (text-overflow: ellipsis), éléments invisibles. Textes SVG :
// comparés au cadre du dessin. Affiche « CPROBE N » (0 attendu) et les premiers cas (onglet, texte, débord en px).
// Usage : --open-panel --width=1280 --stage=scripts/stage/clip-probe.js --exit-after=30 sur une copie.
(async () => {
  await new Promise((r) => setTimeout(r, 4000));
  const P = window.__panel, out = [];
  const tabs = [...document.querySelectorAll("[data-tab]")].map((b) => b.dataset.tab).filter((v, i, a) => v && a.indexOf(v) === i);
  for (const tab of tabs) {
    P.setTab(tab); P.renderAll(); await new Promise((r) => setTimeout(r, 250));
    const pane = document.querySelector(`[data-pane="${tab}"]:not([hidden])`); if (!pane) continue;
    for (const el of pane.querySelectorAll("*")) {
      if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      // (it. 3084) « … » demandé sur un conteneur flex ou grid : le navigateur ne le dessine pas, le texte est coupé net (« Compag »,
      // it. 3083) : ce cas n'est pas exclu
      const flexy = (st) => /flex|grid/.test(st.display);
      const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none" || (cs.textOverflow === "ellipsis" && !flexy(cs))) continue;
      if (el.closest(".hscroll")) continue;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      // l'élément coupe lui-même son texte (overflow caché, sans « … » réellement dessiné : bouton flex de l'it. 3083)
      if (!(el instanceof SVGElement) && /hidden|clip/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 2) {
        out.push(tab + " « " + el.textContent.trim().slice(0, 30) + " » " + (el.scrollWidth - el.clientWidth) + " px (lui-même)"); continue;
      }
      // cadre qui coupe, axe par axe (une liste qui défile verticalement, overflow-y: auto, n'est pas un défaut)
      let cx = null, cy = null;
      if (el instanceof SVGElement) { if (!el.closest("svg.rebord")) continue; cx = cy = el.ownerSVGElement; } // dessins fixes seulement (le grand graphe des Compétences se déplace : hors de vue exprès)
      else for (let a = el.parentElement; a && a !== pane.parentElement && !(cx && cy); a = a.parentElement) {
        const s = getComputedStyle(a); if (s.textOverflow === "ellipsis" && !flexy(s)) break;
        if (/auto|scroll/.test(s.overflowX + s.overflowY)) break; // contenu qu'on peut faire défiler : pas rogné
        if (!cx && /hidden|clip/.test(s.overflowX)) cx = a;
        if (!cy && /hidden|clip/.test(s.overflowY)) cy = a;
      }
      if (!cx && !cy) continue;
      const bx = cx && cx.getBoundingClientRect(), by = cy && cy.getBoundingClientRect();
      const d = Math.max(bx ? Math.max(bx.left - r.left, r.right - bx.right) : 0, by ? Math.max(by.top - r.top, r.bottom - by.bottom) : 0);
      if (d > 2) out.push(tab + " « " + el.textContent.trim().slice(0, 30) + " » " + Math.round(d) + " px");
    }
  }
  console.warn("CPROBE " + out.length + (out.length ? " : " + out.slice(0, 8).join(" | ") : ""));
})();
