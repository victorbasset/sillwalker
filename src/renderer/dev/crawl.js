// Dev (--crawl) : clique sur chaque bouton de chaque onglet du panneau et signale toute erreur
// (« CRAWL-ERREUR … » dans la console), puis « CRAWL-FINI N clics ». Boutons exclus : ceux qui
// ferment le panneau, effacent la partie, quittent ou changent langue / thème / fenêtre.
export async function crawl() {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  window.addEventListener("error", (e) => console.warn("CRAWL-ERREUR " + e.message));
  const skip = /^(mini|close|reset|quit|se-lang|se-edge|se-login|se-theme|se-scale|se-opacity|closemodal)$/;
  let n = 0;
  for (const tab of ["adventure", "talents", "skills", "quests", "shop", "pets", "class", "ascension", "bestiary", "stats", "map", "settings"]) {
    document.querySelector(`[data-tab="${tab}"]`)?.click(); await wait(150);
    const seen = new Set();
    for (let pass = 0; pass < 3; pass++) {
      // getClientRects : marche aussi pour les éléments SVG de la carte (qui n'ont pas d'offsetParent).
      const btns = [...document.querySelectorAll(`#panel [data-action]`)].filter((b) => !skip.test(b.dataset.action) && !b.disabled && b.getClientRects().length > 0);
      for (const b of btns) {
        const key = b.dataset.action + "|" + (b.dataset.id || b.dataset.v || b.dataset.kind || b.dataset.r || b.dataset.key || b.dataset.to || b.dataset.z || b.textContent.slice(0, 20));
        if (seen.has(key)) continue; seen.add(key);
        // Les éléments SVG n'ont pas de click() : un événement de clic à la place.
        try { if (b.click) b.click(); else b.dispatchEvent(new MouseEvent("click", { bubbles: true })); n++; } catch (e) { console.warn("CRAWL-ERREUR " + key + " : " + e.message); }
        await wait(20);
        if (!document.querySelector("#confirm")?.hidden) document.querySelector("#confirm [data-action=cancel], #confirm button.quiet")?.click();
        if (!document.querySelector("#modal")?.hidden) document.querySelector("#modal [data-action=closemodal]")?.click();
        if (!document.body.classList.contains("panel-open")) { document.querySelector("#menu-btn")?.click(); await wait(100); document.querySelector(`[data-tab="${tab}"]`)?.click(); await wait(50); }
      }
    }
  }
  console.warn("CRAWL-FINI " + n + " clics");
}
