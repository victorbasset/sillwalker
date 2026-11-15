// Dev (--crawl) : clique sur chaque bouton de chaque onglet du panneau et signale toute erreur
// (« CRAWL-ERREUR … » dans la console), puis « CRAWL-FINI N clics ». Boutons exclus : ceux qui
// ferment le panneau, effacent la partie, quittent ou changent langue / thème / fenêtre.
export async function crawl() {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  window.addEventListener("error", (e) => console.warn("CRAWL-ERREUR " + e.message));
  const skip = /^(mini|close|reset|quit|se-lang|se-edge|se-login|se-theme|se-scale|se-opacity|closemodal)$/;
  let n = 0;
  const t0 = Date.now();
  for (const tab of ["adventure", "talents", "skills", "quests", "shop", "pets", "class", "ascension", "bestiary", "stats", "map", "settings"]) {
    document.querySelector(`[data-tab="${tab}"]`)?.click(); await wait(150);
    const seen = new Set();
    // (it. 1338) chaque sous-section l'une après l'autre (Boutique > Marchand, Déblocages, Atelier…) : avant, les
    // sous-onglets étaient cliqués avec les autres boutons et le parcours finissait sur la dernière sous-section ;
    // les achats du Marchand n'étaient jamais cliqués.
    const subOf = () => [...document.querySelectorAll(`#panel .subtabs [data-to]`)].filter((b) => b.getClientRects().length > 0);
    const subs = subOf().map((b) => [b.dataset.action, b.dataset.to]);
    for (const sub of subs.length ? subs : [null]) {
      if (sub) {
        const sb = subOf().find((b) => b.dataset.action === sub[0] && b.dataset.to === sub[1]);
        if (!sb) continue;
        sb.click(); n++; await wait(100);
      }
      // (it. 1338) un bouton à la fois, la page relue après chaque clic : un clic qui redessine l'onglet (achat…)
      // détache les boutons suivants d'une liste lue d'avance ; cliquer un bouton détaché ne fait rien, et il était
      // pourtant marqué « vu » (l'Encens de chasse n'était jamais acheté). Au plus 300 clics par sous-section.
      const keyOf = (b) => b.dataset.action + "|" + (b.dataset.id || b.dataset.npc || b.dataset.v || b.dataset.kind || b.dataset.r || b.dataset.key || b.dataset.to || b.dataset.z || b.textContent.slice(0, 20));
      for (let guard = 0; guard < 300; guard++) {
        // getClientRects : marche aussi pour les éléments SVG de la carte (qui n'ont pas d'offsetParent).
        const b = [...document.querySelectorAll(`#panel [data-action]`)].find((x) => !skip.test(x.dataset.action) && !x.disabled && x.getClientRects().length > 0 && !x.closest(".subtabs") && !seen.has(keyOf(x)));
        if (!b) break;
        const key = keyOf(b); seen.add(key);
        {
          // Les éléments SVG n'ont pas de click() : un événement de clic à la place.
          try { if (b.click) b.click(); else b.dispatchEvent(new MouseEvent("click", { bubbles: true })); n++; } catch (e) { console.warn("CRAWL-ERREUR " + key + " : " + e.message); }
          await wait(20);
          if (!document.querySelector("#confirm")?.hidden) document.querySelector("#confirm [data-action=cancel], #confirm button.quiet")?.click();
          if (!document.querySelector("#modal")?.hidden) document.querySelector("#modal [data-action=closemodal]")?.click();
          if (!document.body.classList.contains("panel-open")) {
            document.querySelector("#menu-btn")?.click(); await wait(100); document.querySelector(`[data-tab="${tab}"]`)?.click(); await wait(50);
            if (sub) { subOf().find((x) => x.dataset.action === sub[0] && x.dataset.to === sub[1])?.click(); await wait(50); }
          }
        }
      }
    }
  }
  console.warn("CRAWL-FINI " + n + " clics en " + Math.round((Date.now() - t0) / 1000) + " s");
}
