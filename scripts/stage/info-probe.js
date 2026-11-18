// (it. 2204) Sonde des ⓘ : après le ⓘ des Familiers caché par l'ombre de la rangée qui défile (signalé par Victor, it. 2201).
// Parcourt chaque onglet et sous-section ; signale un ⓘ recouvert, hors de son conteneur, ou dans les 48 px d'ombre d'une rangée
// .hscroll. Usage (sur une COPIE de sauvegarde, langue dans settings.lang) :
//   xvfb-run -a -s "-screen 0 1920x1080x24" node_modules/.bin/electron . --no-sandbox --ghost --user-data=<copie> --open-panel
//     --width=1280 --stage=scripts/stage/info-probe.js --exit-after=20   (puis lire la ligne « IPROBE N » et les suivantes)
// « IPROBE 0 » attendu. Validée sur l'ancienne barre des Familiers (fr, de, ru à 1280 px : 2 alertes). Dans --overflow-report
// (lang-overflow), le même test donnait de fausses alertes (état de page différent) : laissé en sonde à lancer à la main.
setTimeout(async () => {
  const P = window.__panel, out = [];
  const SUBS = { bestiary: [null, "codex", "powers", "sets", "bosses", "elites", "events", "blessings"], shop: [null, "unlocks", "workshop"], stats: [null, "journey", "log", "ach"], pets: [null, "unknown"], class: [null, "locked", "style"] };
  const tabs = [...document.querySelectorAll("[data-tab]")].map((b) => b.dataset.tab).filter((t, i, a) => a.indexOf(t) === i && P.tabs[t]);
  for (const tab of tabs) {
    for (const sec of SUBS[tab] || [null]) {
      P.setTab(tab); if (sec) P.tabs[tab].sec = sec; P.renderAll(); await new Promise((r) => setTimeout(r, 120));
      for (const h of document.querySelectorAll(`[data-pane="${tab}"]:not([hidden]) .help`)) {
        const r = h.getBoundingClientRect(); if (!r.width) continue;
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2, hit = document.elementFromPoint(cx, cy);
        let why = "";
        if (!hit || !(hit === h || h.contains(hit))) why = "recouvert par " + (hit ? hit.tagName + "." + [...hit.classList].join(".") : "rien");
        for (let e = h.parentElement; e && !why; e = e.parentElement) {
          const cs = getComputedStyle(e);
          if (/(auto|hidden|scroll)/.test(cs.overflowX + cs.overflowY)) { const q = e.getBoundingClientRect(); if (r.right > q.right + 1 || r.left < q.left - 1 || r.bottom > q.bottom + 1 || r.top < q.top - 1) why = "hors de " + e.className; }
          if (e.classList.contains("hscroll")) { const q = e.getBoundingClientRect(); if ((e.classList.contains("more-r") && r.right > q.right - 48) || (e.classList.contains("more-l") && r.left < q.left + 48)) why = "sous l'ombre de " + e.className; }
        }
        if (why) out.push(tab + (sec ? "/" + sec : "") + " : " + (h.title || h.dataset.title || h.textContent).slice(0, 40) + " → " + why);
      }
    }
  }
  console.warn("IPROBE " + out.length + "\n" + out.join("\n"));
}, 4500);
