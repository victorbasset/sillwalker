// (it. 3057) Nombres flottants de la bande, pendant 15 s : nombres posés sur la bulle de parole ou le nom du boss (0 attendu, à une
// ou deux exceptions près : un nombre né avant la bulle), et paires de nombres très chevauchés (plus de la moitié du plus petit).
// Affiche « FPROBE nombres N · sur bulle/boss B · paires P ». Repères (partie d'une semaine, 1280 px, it. 3056) : B 0-1, P 5-18
// (avant les it. 3052 et 3056 : B 0-11, P 20-53). Usage : --width=1280 --stage=scripts/stage/float-probe.js --exit-after=22 sur une copie.
(async () => {
  await new Promise((r) => setTimeout(r, 3000));
  const ids = new Map(), pairs = new Set(), onObs = new Set(); let n = 0;
  const ov = (a, b) => a.left < b.right - 2 && b.left < a.right - 2 && a.top < b.bottom - 2 && b.top < a.bottom - 2;
  const iv = setInterval(() => {
    const obs = [...document.querySelectorAll("#strip .affix.bossname, #strip .speech:not([hidden])")]
      .filter((o) => getComputedStyle(o).visibility !== "hidden").map((o) => o.getBoundingClientRect());
    const fl = [...document.querySelectorAll("#strip .float")].filter((f) => +getComputedStyle(f).opacity >= 0.5)
      .map((f) => { if (!ids.has(f)) ids.set(f, n++); return [ids.get(f), f.getBoundingClientRect()]; });
    for (const [i, r] of fl) if (obs.some((o) => ov(r, o))) onObs.add(i);
    for (let i = 0; i < fl.length; i++) for (let j = i + 1; j < fl.length; j++) {
      const a = fl[i][1], b = fl[j][1], ix = Math.min(a.right, b.right) - Math.max(a.left, b.left), iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ix > 0 && iy > 0 && ix * iy > 0.5 * Math.min(a.width * a.height, b.width * b.height)) pairs.add(fl[i][0] + "-" + fl[j][0]);
    }
  }, 50);
  await new Promise((r) => setTimeout(r, 15000));
  clearInterval(iv);
  console.warn("FPROBE nombres " + n + " · sur bulle/boss " + onObs.size + " · paires " + pairs.size);
})();
