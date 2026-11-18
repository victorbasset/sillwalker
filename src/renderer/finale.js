// Cinématique de libération (demande de Victor, 18/11/2026 ; docs/FINALE.md, main/finale-window.js) : le héros quitte
// la bande et se promène sur tout l'écran, traînée d'étoiles derrière lui, puis revient se poser. Fenêtre transparente
// et traversée par les clics : rien n'est opaque, l'écran reste visible et utilisable pendant toute la scène.
// Données (envoyées par la bande) : frames { walk1, walk2 } (data URL, héros habillé), partner (idem ou null), from
// { x, y } (place du héros sur la bande, en px de la fenêtre), texts { title, sub }, duration (ms), width, height.
(() => {
  const api = window.sillwalker;
  const cv = document.getElementById("sky"), ctx = cv.getContext("2d");
  const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });
  const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));
  // Catmull-Rom sur une liste de points : une trajectoire douce qui passe par chacun
  const curve = (P, u) => {
    const n = P.length - 1, f = Math.min(n - 1e-6, Math.max(0, u * n)), i = Math.floor(f), t = f - i;
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(n, i + 2)];
    const c = (a, b, c2, d) => 0.5 * (2 * b + (-a + c2) * t + (2 * a - 5 * b + 4 * c2 - d) * t * t + (-a + 3 * b - 3 * c2 + d) * t * t * t);
    return { x: c(p0.x, p1.x, p2.x, p3.x), y: c(p0.y, p1.y, p2.y, p3.y) };
  };

  async function play(d) {
    const dpr = window.devicePixelRatio || 1, W = d.width || innerWidth, H = d.height || innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false;
    const [w1, w2] = await Promise.all([load(d.frames.walk1), load(d.frames.walk2)]);
    const p1 = d.partner ? await load(d.partner.walk1) : null, p2 = d.partner ? await load(d.partner.walk2) : null;
    if (!w1) { api?.finaleDone?.(); return; }
    const T = (d.duration || 26000) / 1000, from = d.from || { x: W / 2, y: H - 60 };
    // Trajectoire : du héros sur la bande vers le haut, un grand tour de l'écran (coins, centre), retour à sa place
    const P = [
      { x: from.x, y: from.y }, { x: from.x, y: H * 0.62 }, { x: W * 0.5, y: H * 0.3 }, { x: W * 0.16, y: H * 0.18 },
      { x: W * 0.1, y: H * 0.6 }, { x: W * 0.36, y: H * 0.78 }, { x: W * 0.62, y: H * 0.45 }, { x: W * 0.86, y: H * 0.16 },
      { x: W * 0.9, y: H * 0.58 }, { x: W * 0.62, y: H * 0.8 }, { x: from.x, y: H * 0.55 }, { x: from.x, y: from.y },
    ];
    // ciel qui se rallume : de petites étoiles apparaissent une à une sur tout l'écran, très discrètes
    const sky = Array.from({ length: 90 }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H * 0.85, at: 1.5 + i * 0.16 + Math.random() * 0.6, r: Math.random() < 0.15 ? 2 : 1, ph: Math.random() * 6 }));
    const trail = [], bursts = [];
    const SCALE = Math.max(4, Math.round(Math.min(W, H) / 170)); // héros bien visible (≈ 5 à 7 fois sa taille sur la bande)
    const RISE = 1.6, FLY0 = 2.2, FLY1 = T - 3.2;           // décollage, vol, retour
    let t0 = performance.now(), last = t0, prev = { ...from }, ended = false;
    const finish = () => { if (ended) return; ended = true; api?.finaleDone?.(); };

    const drawHero = (img, x, y, k, flip, alpha) => {
      if (!img) return;
      const w = img.naturalWidth * k / 3, h = img.naturalHeight * k / 3; // les images de la bande sont à l'échelle 3
      ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y);
      if (flip) ctx.scale(-1, 1);
      // halo doré derrière le héros
      const g = ctx.createRadialGradient(0, -h * 0.45, 2, 0, -h * 0.45, h * 0.95);
      g.addColorStop(0, "rgba(255, 220, 120, 0.42)"); g.addColorStop(1, "rgba(255, 220, 120, 0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -h * 0.45, h * 0.95, 0, Math.PI * 2); ctx.fill();
      ctx.drawImage(img, -w / 2, -h, w, h);
      ctx.restore();
    };
    const star = (x, y, r, a, color = "255, 236, 170") => {
      ctx.fillStyle = `rgba(${color}, ${a})`;
      ctx.fillRect(Math.round(x - r), Math.round(y), r * 2 + 1, 1); ctx.fillRect(Math.round(x), Math.round(y - r), 1, r * 2 + 1);
      if (r >= 2) { ctx.fillStyle = `rgba(255, 255, 255, ${a})`; ctx.fillRect(Math.round(x), Math.round(y), 1, 1); }
    };

    const frame = (now) => {
      if (ended) return;
      const t = (now - t0) / 1000, dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (t >= T) { ctx.clearRect(0, 0, W, H); finish(); return; }
      ctx.clearRect(0, 0, W, H);
      const fadeAll = Math.min(1, t / 0.6, (T - t) / 0.8);
      // ciel
      for (const s of sky) if (t > s.at) star(s.x, s.y, s.r, Math.min(1, (t - s.at) / 0.8) * (0.35 + 0.25 * Math.sin(t * 2 + s.ph)) * fadeAll);
      // position du héros
      let pos, k;
      if (t < RISE) { pos = { ...from }; k = 3 + (SCALE - 3) * ease(t / RISE); }
      else if (t < FLY0) { pos = curve(P, 0); k = SCALE; }
      else if (t < FLY1) { pos = curve(P, ease((t - FLY0) / (FLY1 - FLY0)) * 0.94); k = SCALE; }
      else { const u = ease((t - FLY1) / (T - 0.6 - FLY1)); const a = curve(P, 0.94); pos = { x: a.x + (from.x - a.x) * u, y: a.y + (from.y - a.y) * u }; k = SCALE + (3 - SCALE) * u; }
      // petit balancement de vol
      const bob = t > FLY0 && t < FLY1 ? Math.sin(t * 5) * 4 : 0;
      const vx = pos.x - prev.x, flip = vx < -0.3 ? true : vx > 0.3 ? false : !!frame.flip; frame.flip = flip;
      // traînée d'étoiles
      if (t > RISE * 0.5 && Math.hypot(pos.x - prev.x, pos.y - prev.y) > 0.5) for (let i = 0; i < 2; i++) trail.push({ x: pos.x + (Math.random() - 0.5) * 18, y: pos.y - k * 5 + (Math.random() - 0.5) * 18, age: 0, life: 1.2 + Math.random() * 0.8, r: Math.random() < 0.3 ? 2 : 1, vy: 8 + Math.random() * 14 });
      for (let i = trail.length - 1; i >= 0; i--) { const p = trail[i]; p.age += dt; p.y += p.vy * dt; if (p.age > p.life) { trail.splice(i, 1); continue; } star(p.x, p.y, p.r, (1 - p.age / p.life) * 0.9 * fadeAll); }
      prev = pos;
      // compagnon : suit la même trajectoire avec un peu de retard
      if (p1 && t > RISE) {
        const lag = 0.035, u = t < FLY1 ? Math.max(0, ease((t - FLY0) / (FLY1 - FLY0)) * 0.94 - lag) : 0.94 - lag;
        const q = t < FLY0 ? { x: from.x - 40, y: from.y } : t < FLY1 ? curve(P, u) : (() => { const a = curve(P, 0.94 - lag), v = ease((t - FLY1) / (T - 0.6 - FLY1)); return { x: a.x + (from.x - 40 - a.x) * v, y: a.y + (from.y - a.y) * v }; })();
        drawHero(Math.floor(t * 6) % 2 ? p2 || p1 : p1, q.x, q.y + bob, k * 0.85, flip, 0.95 * fadeAll);
      }
      drawHero(Math.floor(t * 6) % 2 ? w2 || w1 : w1, pos.x, pos.y + bob, k, flip, fadeAll);
      // gerbes d'étoiles aux moments forts : envol, sommet, retour
      for (const at of [RISE, (FLY0 + FLY1) / 2, FLY1 + (T - FLY1) * 0.8]) if (t >= at && !bursts.includes(at)) {
        bursts.push(at);
        for (let i = 0; i < 40; i++) { const a = Math.random() * Math.PI * 2, v = 40 + Math.random() * 120; trail.push({ x: pos.x, y: pos.y - k * 6, age: 0, life: 1 + Math.random(), r: 2, vy: 0, vx: Math.cos(a) * v, vyy: Math.sin(a) * v }); }
      }
      for (const p of trail) if (p.vx) { p.x += p.vx * dt; p.y += p.vyy * dt; p.vx *= 0.97; p.vyy *= 0.97; }
      // texte : « Libre ! » puis la phrase, au centre de l'écran
      const tt = d.texts || {};
      const tin = ease((t - 3) / 1), tout = ease((T - 5 - t) / 1.2), ta = Math.max(0, Math.min(tin, tout)) * fadeAll;
      if (ta > 0.01 && tt.title) {
        const fs = Math.max(36, Math.round(Math.min(W, H) / 11));
        ctx.save(); ctx.textAlign = "center"; ctx.globalAlpha = ta;
        ctx.font = `600 ${fs}px "Pixelify Sans", sans-serif`;
        ctx.lineWidth = Math.max(4, fs / 9); ctx.strokeStyle = "rgba(20, 14, 40, 0.9)"; ctx.strokeText(tt.title, W / 2, H * 0.42);
        ctx.fillStyle = "#ffd96a"; ctx.fillText(tt.title, W / 2, H * 0.42);
        if (tt.sub) {
          const fs2 = Math.max(18, Math.round(fs / 2.6));
          ctx.font = `400 ${fs2}px "Geist Pixel", sans-serif`; ctx.lineWidth = Math.max(3, fs2 / 6);
          ctx.strokeText(tt.sub, W / 2, H * 0.42 + fs * 0.9); ctx.fillStyle = "#fff3cf"; ctx.fillText(tt.sub, W / 2, H * 0.42 + fs * 0.9);
        }
        ctx.restore();
      }
      requestAnimationFrame(frame);
    };
    try { await document.fonts.ready; } catch { /* sans polices : la scène joue quand même */ }
    t0 = last = performance.now();
    requestAnimationFrame(frame);
    window.__finale = { get t() { return (performance.now() - t0) / 1000; }, T, scale: SCALE }; // contrôles (autotest)
  }

  if (api && api.onFinale) api.onFinale((d) => { play(d).catch(() => api.finaleDone?.()); });
})();
