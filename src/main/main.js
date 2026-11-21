// Processus principal : cycle de vie, fenêtre, zone de notification,
// sauvegarde, Steam. Le jeu lui-même tourne dans le renderer.
const path = require("path");
const fs = require("fs");
const os = require("os");
const { app, ipcMain, powerMonitor } = require("electron");
const config = require("../shared/config");
const flags = require("./flags");
const { registerScheme, serveDirectory } = require("./protocol");

if (flags.userData) app.setPath("userData", path.resolve(flags.userData));
// (it. 1318) un lancement de test (--ghost) sans --user-data utilisait le dossier de sauvegarde par défaut : un oubli
// dans une commande (it. 1317) a créé ~/.config/Sillwalker. Les tests ne touchent jamais la vraie sauvegarde : ils
// partent alors d'un dossier temporaire neuf (un joueur ne lance jamais le jeu avec --ghost, réservé au développement).
else if (flags.ghost) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sillwalker-ghost-"));
  app.setPath("userData", tmp);
  console.log("[dev] --ghost sans --user-data : dossier temporaire", tmp, "(la vraie sauvegarde n'est pas touchée)");
}
app.setAppUserModelId("com.sillwalker.game");
registerScheme();
// Effets sonores (désactivés par défaut) : pas besoin d'un clic pour démarrer l'audio.
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
// Tests (--ghost) : la fenêtre est hors de l'écran ; sans ceci, Windows la croirait cachée et elle ne serait plus dessinée.
if (process.argv.includes("--ghost")) app.commandLine.appendSwitch("disable-features", "CalculateNativeWinOcclusion");
// (it. 2488, dev) --reduced-motion : simule le réglage système « réduire les animations » (prefers-reduced-motion)
if (!app.isPackaged && process.argv.includes("--reduced-motion")) app.commandLine.appendSwitch("force-prefers-reduced-motion");

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  start();
}

function start() {
  const { Settings } = require("./settings");
  const { SaveStore } = require("./save-store");
  const { Steam } = require("./steam");
  const { StripWindow } = require("./strip-window");
  const { createTray } = require("./tray");

  const steam = new Steam();
  let strip = null, trayCtl = null, lastSaveText = null, quitting = false;

  app.on("second-instance", () => { if (strip && !strip.isShown()) strip.toggle(); });
  app.on("window-all-closed", () => { /* appli de zone de notification : on reste ouvert */ });

  // macOS : pas d'icône dans le Dock (comme sous Windows, où la bande n'a pas de bouton dans la barre des tâches) ;
  // le jeu se pilote par la bande, le panneau et l'icône de la barre des menus.
  if (process.platform === "darwin" && app.dock) app.dock.hide();
  app.whenReady().then(() => {
    if (steam.init({ isDev: flags.isDev }) === "relaunch") { app.quit(); return; }

    const settings = new Settings();
    // (it. 837, demande de Victor) Lancé à la main, le jeu doit se voir tout de suite, sinon le joueur croit qu'il ne
    // marche pas : premier lancement -> bande ; mode icône resté d'une session précédente -> dernier mode affiché.
    // Démarrage avec la session (lancement automatique : machine allumée depuis moins de 3 min) : réglage respecté.
    const atLogin = !!app.getLoginItemSettings().wasOpenedAtLogin || os.uptime() < 180;
    if (settings.isNew) settings.set("mode", "strip");
    else if (!atLogin && settings.get("mode") === "icon") settings.set("mode", settings.get("lastShownMode") === "mini" ? "mini" : "strip");
    // (it. 1538, demande de Victor) premier lancement : la langue du système, sur Windows, Linux et macOS. Lue dans le
    // système (app.getPreferredSystemLanguages) : la liste de Chromium (navigator.languages) retombait sur l'anglais dans
    // la version construite, qui ne gardait que les fichiers de langue fr et en-US. --lang (essais) reste prioritaire.
    const systemLangs = () => {
      const forced = process.argv.find((a) => a.startsWith("--lang="));
      if (forced) return [forced.slice(7)];
      let l = [];
      try { l = app.getPreferredSystemLanguages(); } catch { l = []; }
      return (l && l.length ? l : [app.getLocale()]).filter(Boolean).map(String);
    };
    const firstLang = (list) => {
      for (const x of list) { const id = x.toLowerCase().split(/[-_]/)[0]; if (["fr", "en", "es", "pt", "de", "pl", "ru", "zh", "ja", "ko"].includes(id)) return id; }
      return "en";
    };
    require("./i18n").setLang(settings.get("lang") || firstLang(systemLangs()));
    const store = new SaveStore(app.getPath("userData"), { backupIntervalMs: config.BACKUP_INTERVAL_MS });
    const url = serveDirectory(path.join(__dirname, "..", "renderer"));

    strip = new StripWindow({
      settings,
      preload: path.join(__dirname, "..", "preload", "preload.js"),
      url,
      devTools: flags.isDev,
      openDevTools: flags.devTools,
      ghost: flags.ghost,
      testWidth: flags.width,
    });
    if (flags.trace) require("./trace").startTrace(strip.win.webContents, flags.trace, app.getPath("temp"));
    if (!flags.ghost) trayCtl = createTray({ strip, isDev: flags.isDev, steam }); // tests : pas d'icône de notification

    /* ---------- IPC ---------- */
    ipcMain.handle("init:get", () => ({
      isDev: flags.isDev,
      systemLangs: systemLangs(), // (it. 1538) langue d'une partie neuve
      devControls: flags.isDev && !flags.releaseUi,
      crawl: flags.crawl,
      fontBench: flags.fontBench,
      devSpeed: flags.devSpeed,
      layout: strip.layout(),
      visible: strip.renderVisible(),
      version: app.getVersion(),
      steam: { available: steam.available, status: steam.status },
      onBattery: onBattery(), idle: isIdle(),
    }));

    ipcMain.handle("save:load", () => {
      const local = store.load();
      const cloud = steam.cloudRead();
      // Steam Cloud : on garde la sauvegarde la plus récente.
      if (cloud && typeof cloud.v === "number" && (!local.data || (cloud.last || 0) > (local.data.last || 0))) {
        console.log("[save] Steam Cloud plus récent que la sauvegarde locale");
        return { data: cloud, source: "cloud", notice: local.data ? "Partie synchronisée depuis Steam Cloud." : undefined };
      }
      console.log("[save] chargée depuis :", local.source);
      return local;
    });

    ipcMain.handle("save:write", (_e, text) => {
      store.write(String(text));
      lastSaveText = text;
      steam.cloudWrite(text, false);
      return true;
    });

    ipcMain.handle("panel:set", (_e, open) => strip.setPanelOpen(open));
    ipcMain.on("mode:set", (_e, mode) => strip.setMode(String(mode)));
    ipcMain.on("app:quit", () => app.quit());
    // (it. 815) page des avis (adresse fixe de config.js, jamais une adresse venue de la page) ; pas pendant les tests
    ipcMain.on("app:feedback", () => {
      if (flags.ghost || flags.crawl || flags.selftest) { console.log("[feedback] (test) " + config.FEEDBACK_URL); return; }
      require("electron").shell.openExternal(config.FEEDBACK_URL).catch(() => {});
    });
    // Langue de la page : traduit aussi le menu de l'icône (et s'en souvient pour le prochain lancement).
    ipcMain.on("lang:set", (_e, id) => {
      const i18n = require("./i18n");
      if (id === i18n.getLang() && settings.get("lang") === id) return;
      i18n.setLang(id); settings.set("lang", i18n.getLang());
      if (trayCtl) trayCtl.rebuild();
    });
    ipcMain.on("hero:status", (_e, st) => {
      if (trayCtl) trayCtl.setStatus(st);
      if (st && st.lvl) steam.setPresence(st);
    });
    // Réglages de fenêtre depuis le panneau (mêmes actions que le menu de l'icône)
    const { loginItemOptions } = require("./tray");
    ipcMain.handle("win:get", () => ({ openAtLogin: app.getLoginItemSettings(loginItemOptions()).openAtLogin }));
    ipcMain.on("win:set", (_e, s) => {
      if (!s || typeof s !== "object") return;
      if (s.edge === "top" || s.edge === "bottom") strip.setEdge(s.edge);
      if (typeof s.opacity === "number" && s.opacity >= 0.05 && s.opacity <= 1) strip.setOpacity(s.opacity);
      if (typeof s.panelZoom === "number" && s.panelZoom >= 1 && s.panelZoom <= 1.5) strip.setPanelZoom(s.panelZoom); // (it. 948)
      if (typeof s.openAtLogin === "boolean") app.setLoginItemSettings({ openAtLogin: s.openAtLogin, ...loginItemOptions() });
      if (trayCtl) trayCtl.rebuild();
    });
    ipcMain.on("tray:icons", (_e, set) => {
      if (trayCtl) trayCtl.setIcons(set);
      // Dev : enregistre l'icône (32 px) à côté de la capture pour vérification.
      if (flags.shot && set && set.walk) try {
        for (const [k, n] of [["x1", 16], ["x2", 32]]) fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, `-tray${n}.png`), Buffer.from(String(set.walk[0][k]).split(",")[1], "base64"));
      } catch { /* sans importance */ }
    });
    ipcMain.on("mouse:rects", (_e, rects) => strip.setHitRects(rects));
    ipcMain.on("win:drag", (_e, phase) => (phase === "start" ? strip.dragStart() : strip.dragEnd()));
    ipcMain.on("achievements:unlock", (_e, ids) => { if (Array.isArray(ids)) steam.unlock(ids.map(String)); });
    // (it. 2342, demande de Victor) cinématique de libération : le héros se promène sur tout l'écran (docs/FINALE.md)
    const finale = require("./finale-window");
    // (it. 2410, bon voisin) jamais par-dessus un jeu ou une vidéo en plein écran : la scène attend la fin du plein écran (ou
    // s'interrompt s'il commence pendant qu'elle se joue) puis se joue (de nouveau) en entier
    let finalePending = null, finaleLast = null;
    // (it. 2415) une seule règle : la scène ne se joue que si la bande est réellement affichée (renderVisible : ni plein écran,
    // ni jeu réduit à son icône, ni session verrouillée) ; appelée à chaque changement de ces états
    const finaleGate = () => {
      if (!strip.renderVisible()) { if (finale.finaleOpen()) { finalePending = finaleLast; finale.closeFinale(); } return; }
      if (!finalePending) return;
      const d = finalePending; finalePending = null;
      setTimeout(() => { if (strip.renderVisible()) playFinaleWin(d); else finalePending = d; }, 1500);
    };
    strip.onFullscreen = finaleGate;
    strip.onModeChange = finaleGate;
    strip.onLocked = finaleGate;
    const playFinaleWin = (data) => {
      finaleLast = data;
      const fw = finale.openFinale({ strip, preload: path.join(__dirname, "..", "preload", "preload.js"), url, ghost: flags.ghost && !flags.finaleShot }, data);
      if (flags.finaleShot && fw) setTimeout(async () => { try { if (!fw.isDestroyed()) require("fs").writeFileSync(flags.finaleShot, (await fw.webContents.capturePage()).toPNG()); } catch (e) { console.error("finale-shot", e); } }, flags.finaleShotDelay);
    };
    ipcMain.on("finale:play", (_e, data) => {
      if (!data || typeof data !== "object") return;
      if (!strip.renderVisible()) { finalePending = data; return; }
      playFinaleWin(data);
    });
    ipcMain.on("finale:end", () => finale.closeFinale());
    ipcMain.handle("finale:open", () => finale.finaleOpen());

    ipcMain.once("app:ready", () => {
      if (strip.isShown()) strip.reveal();
      if (flags.mode) strip.setMode(flags.mode);
      if (flags.openPanel) setTimeout(() => strip.send("command", "open-panel"), 300);
      if (flags.tab) setTimeout(() => strip.send("command", "tab:" + flags.tab), 300);
      if (flags.shot) setTimeout(async () => {
        const img = await strip.win.webContents.capturePage();
        fs.writeFileSync(path.resolve(flags.shot), img.toPNG());
        // Extraits gauche/droite lisibles même sur un très large écran.
        const { width, height } = img.getSize();
        const w = Math.min(width, 900);
        fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, "-left.png"), img.crop({ x: 0, y: 0, width: w, height }).toPNG());
        fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, "-right.png"), img.crop({ x: width - w, y: 0, width: w, height }).toPNG());
        const cw = Math.min(width, 1900);
        fs.writeFileSync(path.resolve(flags.shot).replace(/\.png$/, "-center.png"), img.crop({ x: Math.round((width - cw) / 2), y: 0, width: cw, height }).toPNG());
        console.log("[dev] capture :", path.resolve(flags.shot), strip.win.getBounds());
      }, flags.shotDelay || (flags.openPanel || flags.tab ? 1500 : 1000));
      if (flags.exitAfter) setTimeout(async () => {
        try { console.log("[dev] compteurs :", JSON.stringify(await strip.win.webContents.executeJavaScript("window.__perf"))); } catch {}
        app.quit();
      }, flags.exitAfter * 1000);
      // Une erreur imprévue de l'autotest ne doit pas le laisser figé : elle compte comme un échec et on quitte.
      if (flags.selftest) require("./selftest").runSelfTest(strip).catch((e) => { console.log("[selftest] ÉCHEC erreur imprévue : " + (e && e.message)); app.exit(1); });
      if (flags.dumpText) setTimeout(async () => {
        const wc = strip.win.webContents, tabs = ["adventure", "talents", "skills", "quests", "shop", "pets", "class", "ascension", "bestiary", "stats", "map", "settings"];
        let out = "";
        for (const t of tabs) {
          strip.send("command", "tab:" + t);
          await new Promise((r) => setTimeout(r, 700));
          // (it. 1252) toutes les sous-sections de l'onglet (Bestiaire > Élites, Boutique > Atelier…), pas seulement celle
          // par défaut ; et les bulles d'aide (data-title depuis l'it. 817 : title est vide)
          const secs = await wc.executeJavaScript(`(() => { const T = window.__panel && window.__panel.tabs["${t}"];
            const b = [...document.querySelectorAll('[data-pane="${t}"] [data-action="b-jump"], [data-pane="${t}"] .subtabs [data-to]')].map((e) => e.dataset.to);
            return T && "sec" in T ? [...new Set([T.sec, ...b])] : [null]; })()`);
          for (const sec of secs) {
            if (sec) { await wc.executeJavaScript(`(() => { const P = window.__panel; P.tabs["${t}"].sec = ${JSON.stringify(sec)}; P.renderAll(); })()`); await new Promise((r) => setTimeout(r, 300)); }
            out += `=== ${t}${sec ? " > " + sec : ""}\n` + await wc.executeJavaScript(`(() => {
              const p = document.querySelector("#panel") || document.body;
              const extra = [...p.querySelectorAll("[title], [data-title], [aria-label]")].map((e) => (e.title || e.dataset.title || "") + " | " + (e.getAttribute("aria-label") || ""));
              return p.innerText + "\\n--- attributs\\n" + extra.join("\\n");
            })()`) + "\n";
          }
        }
        out += "=== strip\n" + await wc.executeJavaScript("document.body.innerText");
        fs.writeFileSync(path.resolve(flags.dumpText), out);
        console.log("[dev] texte :", path.resolve(flags.dumpText));
        app.quit();
      }, 1500);
      // Défilement de chaque onglet (langues aux mots longs, petits écrans) : « [overflow] aucun » ou « onglet=px … ».
      if (flags.overflowReport) setTimeout(async () => {
        // (it. 2685) le navigateur ne charge une police (graisse, alphabet) qu'au premier texte qui la demande : mesuré aussitôt
        // après le premier rendu, un onglet l'était avec la police de secours, plus étroite (« Richesse et butin » sur une ligne
        // dans ce rapport, sur deux dans le jeu, it. 2684). Chaque onglet est d'abord affiché, puis on attend les polices.
        await strip.win.webContents.executeJavaScript(`(async () => { const P = window.__panel;
          for (const id of ["adventure","talents","skills","quests","shop","pets","class","ascension","bestiary","stats","map","settings"]) { try { P.setTab(id); P.renderAll(); } catch (e) {} }
          await document.fonts.ready; await new Promise((f) => setTimeout(f, 300)); await document.fonts.ready; })()`).catch(() => {});
        const r = await strip.win.webContents.executeJavaScript(`(() => { const p = document.getElementById("panel"), P = window.__panel, out = []; P.kept.clear();
          // (it. 3093-3105) textes rognés et accessibilité : pour chaque onglet et chaque sous-section
          const chk = (pane, id) => {
            // (it. 3093) texte coupé net par un cadre (overflow caché), même sans défilement : ce que voit scripts/stage/clip-probe.js
            // (« Au-delà du Rebord » coupé, it. 3069 ; « Compag », it. 3083). « … » demandé sur un conteneur flex ou grid ne compte pas :
            // le navigateur ne le dessine pas. Exclus : rangées défilantes, listes qui défilent, dessins déplaçables (grand graphe).
            const rog = []; if (pane) { const fx = (st) => /flex|grid/.test(st.display) && !(st.webkitLineClamp && st.webkitLineClamp !== "none"); // (it. 3105) -webkit-line-clamp dessine « … » lui-même (noms d’objets sur 3 lignes)
              for (const el of pane.querySelectorAll("*")) { if (![...el.childNodes].some((n) => n.nodeType === 3 && n.data.trim())) continue;
                const cs = getComputedStyle(el); if (el.closest(".hscroll") || !el.getClientRects().length) continue; // (panneau fermé pendant la mesure : visibility ignorée)
                const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue; let d = 0;
                if (el instanceof SVGElement) { if (!el.closest("svg.rebord")) continue; const c = el.ownerSVGElement.getBoundingClientRect(); d = Math.max(c.left - r.left, r.right - c.right); }
                else if (/hidden|clip/.test(cs.overflowX) && !(cs.textOverflow === "ellipsis" && !fx(cs)) && !(cs.webkitLineClamp && cs.webkitLineClamp !== "none")) d = el.scrollWidth - el.clientWidth;
                else if (!(cs.textOverflow === "ellipsis" && !fx(cs))) for (let a = el.parentElement; a && a !== pane.parentElement; a = a.parentElement) { const s = getComputedStyle(a);
                  if ((s.textOverflow === "ellipsis" && !fx(s)) || /auto|scroll/.test(s.overflowX + s.overflowY)) break;
                  if (/hidden|clip/.test(s.overflowX)) { const c = a.getBoundingClientRect(); d = Math.max(c.left - r.left, r.right - c.right); break; } }
                if (d > 2) rog.push(el.textContent.trim().slice(0, 20)); } }
            if (rog.length) out.push(id + "-rogné=" + rog.length + "(" + rog.slice(0, 3).join("/") + ")");
            // (it. 3104) règles d'accessibilité de l'autotest, ici dans tous les états mesurés (l'autotest ne voit que dev-data : « Zone
            // suivante » grisée sans bulle et paliers de maîtrise hors clavier, vus sur la partie d'une semaine, it. 3102) : bouton grisé
            // sans bulle (lui ou un parent ; « Maximum » excepté) ; élément cliquable hors bouton sans tabindex (dans un bouton ou un SVG : exclu)
            const ax = []; if (pane) { const maxTxt = window.__tx ? window.__tx("Maximum") : "Maximum";
              for (const b of pane.querySelectorAll("button[disabled]")) if (b.getClientRects().length && !b.closest("[title],[data-title]") && b.textContent.trim() !== maxTxt) ax.push("grisé:" + b.textContent.trim().slice(0, 18));
              for (const e of pane.querySelectorAll("[data-action], [data-tab]")) if (e.getClientRects().length && !/^(BUTTON|INPUT|A|SELECT|SUMMARY)$/.test(e.tagName) && !e.hasAttribute("tabindex") && !e.closest("button") && !e.closest("svg")) ax.push("clavier:" + e.tagName + "." + String(e.className).split(" ")[0]); }
            if (ax.length) out.push(id + "-a11y=" + ax.length + "(" + [...new Set(ax)].slice(0, 3).join("/") + ")");
          };
          for (const id of ["adventure","talents","skills","quests","shop","pets","class","ascension","bestiary","stats","map","settings"]) {
            const b = document.querySelector("[data-tab=" + id + "]"); if (!b || !b.getClientRects().length) continue;
            P.setTab(id); P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(id + "=" + o);
            // (it. 1258) l'élément qui dépasse le plus bas, nommé (classe et début du texte) : un défilement passager se
            // nomme de lui-même (es 1280, it. 1256-1257, jamais reproduit)
            if (o > 2) { const pn = document.querySelector("[data-pane=" + id + "]:not([hidden])");
              // (it. 1268) les colonnes d'une rangée de grille s'étirent à la même hauteur : la fautive est celle dont le
              // contenu descend le plus près du bas de sa boîte (marge minimale), pas la feuille la plus basse
              let drv = null, best = 1e9;
              for (const c of pn ? pn.querySelectorAll(".panel") : []) { if (!c.getClientRects().length) continue;
                const kids = [...c.children].filter((k) => k.getClientRects().length); if (!kids.length) continue;
                const last = kids.reduce((a, k) => (k.getBoundingClientRect().bottom > a.getBoundingClientRect().bottom ? k : a));
                const slack = c.getBoundingClientRect().bottom - last.getBoundingClientRect().bottom; if (slack < best) { best = slack; drv = [c, last]; } }
              if (drv) out.push(id + "-cause=" + ((drv[0].id || drv[0].className) + ">" + (drv[1].className || drv[1].tagName) + ":" + (drv[1].textContent || "").trim().slice(0, 24)).replace(/\\s+/g, "_")); }
            // (it. 543) ligne de liste plus large que sa colonne (débordement horizontal)
            let w = 0; for (const li of document.querySelectorAll(".lines li")) if (li.getClientRects().length && li.scrollWidth > li.clientWidth + 1) w++; if (w) out.push(id + "-large=" + w);
            // (it. 849) libellé d'un seul mot trop long qui passe sous sa valeur (« Gegenstandssammlung44 / 44 »)
            let c = 0, cw = []; for (const sp of document.querySelectorAll(".lines li > span:first-child")) if (sp.getClientRects().length && sp.scrollWidth > sp.clientWidth + 1) { c++; cw.push(sp.textContent.trim().slice(0, 30) + " (" + ((sp.nextElementSibling || {}).textContent || "").trim().slice(0, 20) + ")"); } if (c) out.push(id + "-chevauche=" + c + "[" + cw.join(" / ") + "]"); // (it. 935) libellé et valeur cités
            // (it. 864) tuiles du héros (Points de vie, Attaque…) : libellé ou valeur coupé (« Punkty ży… »)
            const tl = []; for (const e of document.querySelectorAll("[data-pane=" + id + "]:not([hidden]) .tile > span, [data-pane=" + id + "]:not([hidden]) .tile > b")) if (e.getClientRects().length && e.scrollWidth > e.clientWidth + 1) tl.push(e.textContent.trim().slice(0, 24) + "/" + e.clientWidth + "<" + e.scrollWidth); if (tl.length) out.push(id + "-tuile=" + tl.length + "(" + tl.join(" ; ") + ")");
            // (it. 1677) libellé de tuile sur deux lignes (« Очки / здоровья », « Puntos / de vida » à 1280 px, it. 1675-1676)
            const t2 = []; for (const e of document.querySelectorAll("[data-pane=" + id + "]:not([hidden]) .tile > span")) if (e.getClientRects().length && e.offsetHeight > parseFloat(getComputedStyle(e).fontSize) * 1.9) t2.push(e.textContent.trim().slice(0, 24)); if (t2.length) out.push(id + "-tuile-2lignes=" + t2.length + "(" + t2.join(" ; ") + ")");
            // (it. 865) mot coupé en plein milieu sur deux lignes, sans trait d'union (« Восстанавлив / ает ») ; les écritures
            // sans espaces (chinois, japonais) se coupent normalement entre deux caractères : ignorées ; le coréen
            // (it. 866 : word-break keep-all, mots entiers) est contrôlé comme les autres
            const cut = new Set(), pane = document.querySelector("[data-pane=" + id + "]:not([hidden])");
            if (pane) { const tw = document.createTreeWalker(pane, NodeFilter.SHOW_TEXT), rg = document.createRange();
              for (let n; (n = tw.nextNode());) { if (!n.parentElement.getClientRects().length) continue;
                for (const m of n.data.matchAll(/[\\p{L}\\p{M}]{4,}/gu)) { if (/[\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}]/u.test(m[0])) continue;
                  rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length); const rs = [...rg.getClientRects()].filter((x) => x.width > 0);
                  // (it. 879) après un trait d'union conditionnel (\u00AD, « Panzer-/handschuhe ») : le tiret dessiné en fin de ligne
                  // est compté avec la suite du mot ; coupure voulue, pas un mot coupé
                  if (n.data[m.index - 1] === "\u00AD") rs.shift();
                  if (rs.length > 1 && Math.abs(rs[rs.length - 1].top - rs[0].top) > 2) cut.add(m[0]); } } }
            if (cut.size) out.push(id + "-coupé=" + [...cut].slice(0, 4).join("/"));
            // (it. 1001) titre de panneau en chinois ou en japonais coupé entre deux caractères (« 装 / 備 » à côté d'un
            // sous-titre) : non vu par la mesure des mots coupés, qui ignore ces écritures
            const th = []; if (pane) for (const h of pane.querySelectorAll(".panel > h2")) { const n = [...h.childNodes].find((x) => x.nodeType === 3 && x.data.trim());
              if (!n || !h.getClientRects().length || !/[\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}]/u.test(n.data)) continue;
              const rg = document.createRange(); rg.selectNodeContents(n); const rs = [...rg.getClientRects()].filter((x) => x.width > 0);
              if (rs.length > 1 && Math.abs(rs[rs.length - 1].top - rs[0].top) > 2) th.push(n.data.trim()); }
            if (th.length) out.push(id + "-titre=" + th.slice(0, 4).join("/"));
            chk(pane, id); }
          P.showNews(); const nb = document.querySelector("#modal .panel"), no = nb ? nb.scrollHeight - nb.clientHeight : 0;
          if (no > 2) out.push("news=" + no); document.querySelector("#modal [data-action=closemodal]")?.click();
          // Héros > Sorts et attaque (sorts du héros + style de l'attaque de base)
          // (it. 553) pour les 20 héros : les cartes à deux effets passent sur deux lignes ; le pire est signalé
          // (it. 1490) et chaque duo héros + compagnon (sorts du compagnon en grand, à droite)
          { P.setTab("class"); P.tabs.class.sec = "style"; const G = window.__game, keep = G.S.cls, keepP = G.S.partner; let worst = 0, who = "";
            const all = [...new Set((window.__spellsAll || []).map((x) => x.cls))];
            for (const c of all.concat(keep)) for (const pt of [null, ...all.filter((x) => x !== c)]) { G.S.cls = c; G.S.partner = pt; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > worst) { worst = o; who = c + (pt ? "+" + pt : ""); } }
            G.S.cls = keep; G.S.partner = keepP; P.renderAll(); if (worst > 2) out.push("sorts=" + worst + "(" + who + ")"); P.tabs.class.sec = "freed"; }
          // (it. 1530) Talents, fiche d'une maîtrise (paliers, bouton « Choisir un bonus ») : elle faisait défiler l'onglet de
          // 47 px en russe à 1280 px sans qu'aucune mesure le voie (seule la fiche par défaut l'était, it. 1522)
          if (P.tabs.talents) { P.setTab("talents"); P.renderAll(); const G = window.__game, T = (G.S.talents[G.S.cls] ||= {}), keepT = { ...T }, keepSel = P.tabs.talents.sel; let worst = 0, who = "";
            for (const b of [...document.querySelectorAll("[data-pane=talents] .talent.mastery[data-tid]")]) { const id = b.dataset.tid; T[id] = Math.max(T[id] || 0, 60); P.tabs.talents.sel = id; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > worst) { worst = o; who = id; } }
            for (const k of Object.keys(T)) if (!(k in keepT)) delete T[k]; Object.assign(T, keepT); P.tabs.talents.sel = keepSel; G.invalidateStats(); P.renderAll(); if (worst > 2) out.push("maîtrise=" + worst + "(" + who + ")"); }
          // Statistiques > Succès (la liste grandit avec chaque succès ; les noms longs du russe passent sur deux lignes)
          if (P.tabs.stats) { P.setTab("stats"); P.tabs.stats.sec = "ach"; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("succès=" + o); P.tabs.stats.sec = "numbers"; }
          // (it. 1013-1014) sous-sections autres que celle par défaut (seule celle-ci était mesurée) : « onglet-section=N »
          const SUBS = { bestiary: ["codex", "powers", "sets", "bosses", "elites", "events", "blessings"], shop: ["unlocks", "workshop"],
            stats: ["journey", "log"], pets: ["unknown"], class: ["locked", "style"] }; // (it. 3112) Héros > Sorts : contrôles rogné et a11y aussi
          for (const [tab, secs] of Object.entries(SUBS)) { if (!P.tabs[tab]) continue;
            const bt = document.querySelector("[data-tab=" + tab + "]"); if (!bt || !bt.getClientRects().length) continue;
            P.setTab(tab); const keepSec = P.tabs[tab].sec;
            for (const sec of secs) { P.tabs[tab].sec = sec; P.renderAll(); if (P.tabs[tab].sec !== sec) continue;
              const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(tab + "-" + sec + "=" + o);
              chk(document.querySelector("[data-pane=" + tab + "]:not([hidden])"), tab + "-" + sec); }
            P.tabs[tab].sec = keepSec; P.renderAll(); }
          // (it. 929) tous les déblocages SAUF le dernier : la carte « Prochain déblocage » réapparaît (avec tous, elle
          // disparaît : l'it. 928 a trouvé 11 px de défilement en russe à 1280 sans qu'aucune mesure le voie) ; prêt et pas prêt
          { const G = window.__game, S = G.S, ks = Object.keys(S.unlocks || {}), last = ks[ks.length - 1], keepG = S.gold;
            if (last) { delete S.unlocks[last]; P.setTab("adventure");
              for (const [gold, tag] of [[1e300, "prêt"], [1, "pas-prêt"]]) { S.gold = gold; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("adventure-avant-dernier-" + tag + "=" + o); }
              S.unlocks[last] = true; S.gold = keepG; } }
          // (it. 2228) Carte sans la Carte du voyageur (tous les déblocages sont donnés ici : la note « En vente » et son lien n'étaient
          // jamais mesurés ; l'it. 2227 y a laissé 12 px de défilement que seul l'autotest a vus) : « map-sans-voyage=N »
          { const S = window.__game.S; if (S.unlocks && S.unlocks.travelMap) { delete S.unlocks.travelMap; P.setTab("map"); P.renderAll();
              const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("map-sans-voyage=" + o); S.unlocks.travelMap = true; } }
          // (it. 2229) AUCUN déblocage (record gardé) : chaque onglet montre ses liens « 🔒 nom · prix » (lockLink), jamais mesurés ici
          // puisque tous les déblocages sont donnés : « onglet-sans-déblocage=N »
          { const S = window.__game.S, keepU = { ...(S.unlocks || {}) }; S.unlocks = {}; window.__game.invalidateStats?.();
            for (const id of ["adventure","talents","skills","quests","shop","pets","class","ascension","bestiary","stats","map","settings"]) {
              const b = document.querySelector("[data-tab=" + id + "]"); if (!b || !b.getClientRects().length) continue;
              P.setTab(id); P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(id + "-sans-déblocage=" + o); }
            S.unlocks = keepU; window.__game.invalidateStats?.(); P.renderAll(); }
          // (it. 2111) Talents : tous les talents de la classe au maximum (coche), voie pas choisie et montrée dans la fiche : en
          // russe à 1280 px, « ★ Королевская добыча ✓ 1 / 1 » passait sur deux lignes sans qu'aucune mesure le voie
          { const G = window.__game, S = G.S, T = P.tabs.talents, keepR = JSON.stringify(S.talents[S.cls] || {}), keepL = S.lvl, keepSel = T.sel, keepPin = T.pin;
            S.talents[S.cls] = {}; S.lvl += 200; G.invalidateStats(); G.autoSpendTalents(); P.setTab("talents"); P.renderAll();
            const v = document.querySelector('[data-pane="talents"] .talent.voie'); if (v) { T.sel = T.pin = v.dataset.id; P.renderAll(); }
            const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("talents-max-voie=" + o);
            // (it. 2135) seuil relatif (1,4 × la ligne la plus basse) : à 130 % d'interface, une ligne d'ultime normale dépassait 48 px
            const rows = [...document.querySelectorAll('[data-pane="talents"] .tbranch .talent:not(.voie)')], hMin = Math.min(...rows.map((b) => b.getBoundingClientRect().height));
            const two = rows.filter((b) => b.getBoundingClientRect().height > hMin * 1.4).map((b) => b.dataset.tid);
            if (two.length) out.push("talents-2lignes=" + two.join("/"));
            S.talents[S.cls] = JSON.parse(keepR); S.lvl = keepL; T.sel = keepSel; T.pin = keepPin; G.invalidateStats(); P.renderAll(); }
          // (it. 2063) zone d'un lieutenant ou du Briseur, héros bloqué, reliques incomplètes : ligne de la relique gardée et trois
          // pistes dont « renforce tes reliques » (it. 2062 : une phrase plus longue poussait « Chances de butin » sous la bande en
          // russe à 1280 px, sans qu'aucune mesure le voie)
          { const G = window.__game, S = G.S, keep = { z: S.zone, r: S.relics, lv: S.relicLv };
            S.relics = { drone: 1, heart: 1, blade: 1 }; S.relicLv = { drone: 5, heart: 3, blade: 2 }; G.stuckInfo = () => ({ deaths: 4 }); G.invalidateStats(); P.setTab("adventure");
            for (const z of [50, 100, 150, 200, 300]) { S.zone = z; P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push("adventure-boss" + z + "-bloqué=" + o); }
            delete G.stuckInfo; S.zone = keep.z; S.relics = keep.r; S.relicLv = keep.lv; G.invalidateStats(); P.renderAll(); }
          // (it. 939) Statistiques sous chaque bénédiction du jour : « aujourd'hui … » allonge certaines valeurs (coffre,
          // élite, gobelin) ; « Schatztruhe » passait sous sa valeur les Jours des trésors seulement (défaut intermittent)
          // (it. 940) toutes les bénédictions, Aventure (puce de la bénédiction) comprise
          { const D = window.__game.S.daily, km = D.mod;
            for (const t of ["adventure", "stats"]) { if (!P.tabs[t]) continue; P.setTab(t); if (t === "stats") P.tabs.stats.sec = "numbers";
              for (const m of window.__dayMods || []) { D.mod = m; window.__game.invalidateStats(); P.renderAll(); const o = p.scrollHeight - p.clientHeight; if (o > 2) out.push(t + "-" + m + "=" + o);
                let c = 0; for (const sp of document.querySelectorAll("[data-pane=" + t + "]:not([hidden]) .lines li > span:first-child")) if (sp.getClientRects().length && sp.scrollWidth > sp.clientWidth + 1) c++; if (c) out.push(t + "-" + m + "-chevauche=" + c);
                for (const e of document.querySelectorAll("[data-pane=" + t + "]:not([hidden]) .chip:not(.daymod)")) if (e.getClientRects().length && e.scrollWidth > e.clientWidth + 1) out.push(t + "-" + m + "-puce-coupée"); } }
            D.mod = km; window.__game.invalidateStats(); }
          P.kept.clear(); P.setTab("adventure"); P.renderAll();
          for (const k of ["hero-todo", "hero-chron", "hero-stats", "rates"]) {
            const d = document.querySelector("[data-keep=" + k + "]"); if (!d) continue; d.querySelector("summary").click();
            const m = document.getElementById("modal"), mb = m.querySelector(".panel"), mo = mb.scrollHeight - mb.clientHeight;
            if (mo > 2) out.push(k + "=" + mo); m.hidden = true; }
          // (it. 2276) résumé d'absence au pire cas (mêmes données que l'autotest, it. 2143 : 21 lignes de bilan) dans CHAQUE langue et largeur
          // (l'autotest ne le mesure qu'en français ; « À faire » s'allonge avec les déblocages) : « absence-pire=N ». EN DERNIER :
          // afficher le résumé change l'état de la page (l'Aventure montre ensuite « Depuis ta dernière visite » : +5 à 7 px faussement comptés)
          if (window.__showOffline) { const sum = { seconds: 30000, zone: "Z", duration: "8 h", kills: 1234, elites: 12, champions: 3, gold: 1e10, petGold: 2e9, xp: 3e8, newLevel: 1320, steps: [], kept: 5, best: 4, onGround: 22, feathers: 2, chests: 3, goblins: 4, poupouce: 1, questsDone: 6, spells: 3, forged: 4, anviled: 2, herbs: 5, traded: 2, transmuted: 9, petWork: 30, capH: 16 };
            window.__showOffline(sum); const mb = document.querySelector("#modal .panel"), o = mb ? mb.scrollHeight - mb.clientHeight : 0; if (o > 2) { // (it. 2918) dépassement vu une fois en polonais (it. 2916), jamais reproduit : la mesure dit ce que contenait la fenêtre
              const lines = [...document.querySelectorAll("#modal .todo-h ~ *")].filter((e) => e.offsetHeight).map((e) => e.innerText.trim()).filter(Boolean);
              const longest = lines.reduce((a, b) => (b.length > a.length ? b : a), "");
              out.push("absence-pire=" + o + "(à-faire:" + lines.length + ", plus-longue:«" + longest.slice(0, 50) + "»)"); } document.querySelector("#modal").hidden = true; }
          // (it. 2924) « À faire » au pire cas (16 lignes, la liste n'a pas de plafond) dans chaque langue et largeur : résumé d'absence (8 lignes et
          // une note, it. 2919) et carte du héros (deux colonnes, it. 2920) ; l'autotest ne les mesure qu'en anglais. « à-faire16-absence=N », « à-faire16-carte=N »
          if (window.__showOffline && window.__game && window.__panel) { const g = window.__game, P = window.__panel, orig = g.todoNow, base = orig.call(g);
            if (base.length) { g.todoNow = () => Array.from({ length: 16 }, (_, i) => base[i % base.length]);
              try { window.__showOffline({ seconds: 30000, zone: "Z", duration: "8 h", kills: 1234, elites: 12, champions: 3, gold: 1e10, petGold: 2e9, xp: 3e8, newLevel: 1320, steps: [], kept: 5, best: 4, onGround: 22, feathers: 2, chests: 3, goblins: 4, poupouce: 1, questsDone: 6, spells: 3, forged: 4, anviled: 2, herbs: 5, traded: 2, transmuted: 9, petWork: 30, capH: 16 });
                const m = document.querySelector("#modal"), mb = m.querySelector(".panel"), o1 = mb.scrollHeight - mb.clientHeight; const diag = () => { const bs = [...document.querySelectorAll("#mbody .linkbtn")].map((e) => e.textContent.trim()); return "(" + (document.querySelector("#mt") || {}).textContent + " · " + bs.length + " boutons · plus long «" + bs.reduce((x, y) => (y.length > x.length ? y : x), "").slice(0, 40) + "»)"; }; if (o1 > 2) out.push("à-faire16-absence=" + o1 + diag()); m.hidden = true;
                P.kept.clear(); P.setTab("adventure"); P.renderAll(); const d = document.querySelector("[data-pane=adventure]:not([hidden]) [data-keep=hero-todo]");
                if (d) { d.querySelector("summary").click(); const o2 = mb.scrollHeight - mb.clientHeight; if (o2 > 2) out.push("à-faire16-carte=" + o2 + diag()); m.hidden = true; }
              } finally { g.todoNow = orig; } } }
          return innerWidth + " " + (out.join(" ") || "aucun"); })()`).catch((e) => "erreur " + e.message);
        // (it. 1027) astuces : chacune dans la bulle (trois lignes au plus, it. 1026) ; celles qui seraient coupées par « … »
        const hc = await strip.win.webContents.executeJavaScript(`(async () => { const H = (await import("./ui/hints.js")).HINTS, G = window.__game,
            t = document.getElementById("toast"), b = document.body, open = b.classList.contains("panel-open"), keep = [t.hidden, t.innerHTML], cut = [];
          b.classList.remove("panel-open"); t.hidden = false;
          for (const h of H) { let txt = h.text; if (!txt && h.textFn) { try { txt = h.textFn(G); } catch { txt = null; } } if (!txt) continue;
            t.innerHTML = '<span class="hint">💡</span> ' + txt; if (t.scrollHeight > t.clientHeight + 2) cut.push(h.id); }
          t.hidden = keep[0]; t.innerHTML = keep[1]; if (open) b.classList.add("panel-open");
          return cut.length ? "astuce-coupée=" + cut.join("/") : ""; })()`).catch((e) => "astuces : erreur " + e.message);
        const rr = hc ? (/ aucun$/.test(r) ? r.replace(/ aucun$/, " " + hc) : r + " " + hc) : r;
        console.log("[overflow] " + rr);
        app.quit();
      }, 3000);
      // (it. 789) --tour : la bande seule 12 s, puis le panneau et cinq onglets (4 s chacun), puis la bande de nouveau
      if (flags.tour) [[12, "tab:adventure"], [16, "tab:skills"], [20, "tab:map"], [24, "tab:class"], [28, "tab:pets"], [32, "toggle-panel"]]
        .forEach(([t, c]) => setTimeout(() => strip.send("command", c), t * 1000));
      // (it. 807) --trailer : minutage fixe des scènes filmées pour la bande-annonce (scripts/trailer/make.sh coupe aux
      // mêmes secondes). Cinématiques forcées (réglage ignoré), panneau ouvert sur quelques onglets à la fin.
      if (flags.trailer) {
        const run = (code) => strip.win.webContents.executeJavaScript(code).catch((e) => console.log("[trailer]", e.message));
        const cine = (kind, data = "{}") => `window.__strip.juice.cinematic("${kind}", Object.assign(${data}, { force: true }))`;
        [[2, cine("intro")],
          [26, `import("./game/relics.js").then((m) => ${cine("arrive", "{ major: m.MAJOR_BOSSES[0] }")})`],
          [38, cine("relic", '{ id: "drone" }')],
          [56, cine("freed", '{ cls: "mage" }')],
          [96, cine("dawn")],
        ].forEach(([t, code]) => setTimeout(() => run(code), t * 1000));
        [[66, "tab:skills"], [71, "tab:map"], [76, "tab:class"], [81, "tab:pets"], [86, "toggle-panel"]]
          .forEach(([t, c]) => setTimeout(() => strip.send("command", c), t * 1000));
      }
      if (flags.stage) { try { const code = fs.readFileSync(flags.stage, "utf8"); setTimeout(() => strip.win.webContents.executeJavaScript(code).catch((e) => console.log("[stage]", e.message)), 600); } catch (e) { console.log("[stage] lecture : " + e.message); } }
      if (flags.demo) setTimeout(() => strip.win.webContents.executeJavaScript("window.__demo && window.__demo()"), 800);
      // (it. 767) Dev : accélération graphique (lenteurs signalées par Victor sous Windows)
      if (flags.isDev) setTimeout(() => { try { const g = app.getGPUFeatureStatus(); console.log(`[dev] carte graphique : dessin ${g.gpu_compositing}, rendu ${g.rasterization}, canevas ${g["2d_canvas"]}, WebGL ${g.webgl}`); } catch { /* sans importance */ } }, 3000);
      if (flags.perf) require("./perf").runPerf(strip, typeof flags.perf === "string" ? { phase: +flags.perf } : {});
    });

    /* ---------- Robustesse ---------- */
    // Dev : erreurs et avertissements de l'interface recopiés dans la console.
    // (it. 828) Journal des erreurs pour les joueurs (userData/errors.log, 200 Ko au plus, l'ancien gardé en .old) : un
    // joueur qui signale un bug peut le joindre à son avis. Seulement les erreurs, avec la version du jeu.
    const errLog = path.join(app.getPath("userData"), "errors.log");
    // (it. 3003) un même message n'est écrit qu'une fois par minute (avec le nombre de répétitions tues) : une erreur qui revient à
    // chaque image (30 fois par seconde) faisait 30 écritures disque synchrones par seconde et faisait tourner le journal sans cesse
    const errSeen = new Map(); // texte -> { t: dernière écriture, n: répétitions tues depuis }
    const logError = (text) => {
      const now = Date.now(), seen = errSeen.get(text);
      if (seen && now - seen.t < 60000) { seen.n++; return; }
      const rep = seen && seen.n ? ` (répété ${seen.n} fois depuis)` : "";
      errSeen.set(text, { t: now, n: 0 });
      if (errSeen.size > 200) errSeen.delete(errSeen.keys().next().value);
      try {
        if (fs.existsSync(errLog) && fs.statSync(errLog).size > 200 * 1024) fs.renameSync(errLog, errLog + ".old");
        fs.appendFileSync(errLog, `${new Date().toISOString()} v${app.getVersion()} ${text}${rep}\n`);
      } catch { /* journal facultatif */ }
    };
    strip.win.webContents.on("console-message", (e) => {
      const level = e.level ?? e.params?.level;
      if (level !== "error" && level !== 3) return;
      logError(`${e.message ?? e.params?.message} (${e.sourceId ?? ""}:${e.lineNumber ?? ""})`);
    });
    // (it. 829) aussi les erreurs du processus principal et les plantages de la page (« le jeu s'est fermé »)
    process.on("uncaughtException", (err) => { logError("[principal] " + (err && err.stack || err)); console.error(err); });
    process.on("unhandledRejection", (err) => { logError("[principal, promesse] " + (err && err.stack || err)); });
    if (flags.isDev) strip.win.webContents.on("console-message", (e) => {
      const level = e.level ?? e.params?.level;
      if (level === "warning" || level === "error" || level === 2 || level === 3) console.log(`[renderer ${level}] ${e.message ?? e.params?.message} (${e.sourceId ?? ""}:${e.lineNumber ?? ""})`);
    });
    let crashTimes = [];
    strip.win.webContents.on("render-process-gone", (_e, d) => {
      console.error("[main] renderer arrêté :", d.reason);
      if (d.reason !== "clean-exit") logError("[page arrêtée] " + d.reason + (d.exitCode != null ? " (code " + d.exitCode + ")" : ""));
      // (it. 3012) au plus 3 rechargements par minute : une page qui retombe dès son chargement était rechargée sans fin, processeur à
      // plein (bon voisin) ; au-delà, on s'arrête (journal), le joueur relance le jeu lui-même
      const now = Date.now();
      crashTimes = crashTimes.filter((t) => now - t < 60000); crashTimes.push(now);
      if (!quitting && d.reason !== "clean-exit") {
        if (crashTimes.length <= 3) strip.win.reload();
        else {
          logError("[page arrêtée] trop d'arrêts en une minute : plus de rechargement automatique");
          // (it. 3014) la bande reste vide : l'infobulle de l'icône le dit (aucune fenêtre ne s'ouvre, le focus n'est jamais volé)
          try { if (trayCtl) trayCtl.tray.setToolTip(require("./i18n").L("stopped")); } catch { /* icône absente */ }
        }
      }
    });
    // Arrêt / déconnexion de Windows : dernière sauvegarde.
    strip.win.on("query-session-end", () => { flushRenderer(); });
    // Portable débranché : la bande s'anime moins souvent (économie de batterie), retour à la normale sur secteur.
    // Personne devant l'écran (5 min sans souris ni clavier) : animation au ralenti ; vérifié toutes les 5 s.
    let lastPower = "";
    const sendPower = () => {
      const p = { onBattery: onBattery(), idle: isIdle() }, k = JSON.stringify(p);
      if (k !== lastPower) { lastPower = k; strip.send("power", p); }
    };
    powerMonitor.on("on-battery", sendPower);
    powerMonitor.on("on-ac", sendPower);
    setInterval(sendPower, 5000);
    // Bon voisin : cachée devant une application en plein écran (Windows ; réglage dans le menu de l'icône).
    const { watchFullscreen } = require("./fullscreen-watch");
    // lancé à la main : surveillance après 20 s, le temps que le joueur voie la bande (une fausse détection de plein
    // écran au démarrage la cacherait aussitôt : « le jeu ne marche pas »)
    let fsWatch = { stop() {} };
    setTimeout(() => { if (!quitting) fsWatch = watchFullscreen({ onChange: (on) => strip.setFullscreenApp(on), enabled: () => strip.settings.get("hideOnFullscreen") !== false }); }, atLogin ? 0 : 20000);
    app.on("before-quit", () => fsWatch.stop());
    powerMonitor.on("lock-screen", () => strip.setLocked(true));
    powerMonitor.on("unlock-screen", () => strip.setLocked(false));
  });

  /** Personne devant l'écran depuis 5 min ? (--idle en dev pour le simuler.) */
  function isIdle() { try { return flags.idle || powerMonitor.getSystemIdleTime() >= 300; } catch { return false; } }

  /** Sur batterie ? (--battery en dev pour le simuler et le mesurer.) */
  function onBattery() { try { return flags.battery || powerMonitor.isOnBatteryPower(); } catch { return false; } }

  /** Demande au renderer une dernière sauvegarde, avec délai maximal. */
  function flushRenderer() {
    if (!strip || strip.win.isDestroyed()) return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => { clearTimeout(t); ipcMain.off("app:flush-done", done); resolve(); };
      const t = setTimeout(done, config.FLUSH_TIMEOUT_MS);
      ipcMain.on("app:flush-done", done);
      strip.send("app:flush");
    });
  }

  app.on("before-quit", (e) => {
    if (quitting) return;
    quitting = true;
    e.preventDefault();
    const t0 = Date.now();
    flushRenderer().finally(() => {
      console.log(`[main] fermeture : sauvegarde finale en ${Date.now() - t0} ms`);
      if (lastSaveText) steam.cloudWrite(lastSaveText, true);
      if (trayCtl) trayCtl.tray.destroy();
      app.quit();
    });
  });
}
