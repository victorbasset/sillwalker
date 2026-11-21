// (it. 3040) Rangée d'informations de la bande (zone, or, barres de vie) : pendant 15 s, relève les éléments qui passent dessus
// (nombres flottants, icônes de sorts, bannières). Affiche « HPROBE N » (N éléments fautifs, 0 attendu) et quelques exemples.
// Exclus : colonnes et météores (tombent du ciel par conception), traînée de perçage (2 px au plus, it. 3037).
// Usage : --width=1280 --stage=scripts/stage/hud-probe.js --exit-after=22 sur une copie (partie neuve, dev-data,
// scripts/fixtures/week-save.json). Trois défauts trouvés ainsi aux it. 3035, 3037, 3039.
(async () => {
  await new Promise((r) => setTimeout(r, 3000));
  const s = window.__strip, seen = new Map();
  const skip = /column|meteor|pierce/;
  const iv = setInterval(() => {
    const h = s.hudBands(), o = document.getElementById("strip").getBoundingClientRect();
    for (const nd of document.querySelectorAll("#strip .float, #strip .spellfx, #strip .banner")) {
      if (skip.test(nd.className)) continue;
      const r = nd.getBoundingClientRect(); if (!r.width) continue;
      const top = r.top - o.top, x = r.left - o.left;
      const hit = top < h.h - 2 && h.bands.some(([a, b]) => x + r.width > a + 2 && x < b - 2);
      const e = seen.get(nd) || { k: nd.className, txt: (nd.textContent || "").slice(0, 24), hit: false };
      if (hit && !e.hit) e.at = Math.round(x) + "," + Math.round(top);
      e.hit ||= hit; seen.set(nd, e);
    }
  }, 50);
  await new Promise((r) => setTimeout(r, 15000));
  clearInterval(iv);
  const bad = [...seen.values()].filter((e) => e.hit);
  console.warn("HPROBE " + bad.length + " / " + seen.size + (bad.length ? " : " + bad.slice(0, 5).map((e) => e.k + " « " + e.txt + " » @" + e.at).join(" | ") : ""));
})();
