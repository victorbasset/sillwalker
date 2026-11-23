// (it. 3194, demande de Victor : « que le déploiement soit fait tout automatique par toi, même le devlog »)
// Publie un devlog sur itch.io. itch.io n'a pas d'API pour les devlogs : la page « New devlog » du tableau de bord est
// ouverte dans une fenêtre Electron cachée avec la session web de Victor (~/.config/itch/web_session, valeur du cookie
// « itchio », jamais dans le dépôt). La couverture passe par l'envoi d'image du site lui-même (fenêtre de choix de fichier
// interceptée), puis le formulaire est soumis depuis la page (mêmes cookies, jeton CSRF de la page).
//
// Usage : xvfb-run -a node_modules/.bin/electron --no-sandbox scripts/itch-devlog.cjs <version> [--publish] [--edit=<id>]
//   lit docs/devlog-<version>.md (ligne « **Titre :** », tags, langues) ; corps steam/itch/devlog-<version>.html ;
//   couverture steam/itch/cover-<version>.png. Sans --publish : BROUILLON (visible seulement dans le tableau de bord).
//   --edit=<id> : met à jour le billet <id> au lieu d'en créer un (ex. pour publier un brouillon vérifié).
// Écrit « DEVLOG-OK <id> <url> » ou « DEVLOG-ERREUR … » ; code de sortie 0 / 1.
const { app, BrowserWindow, session } = require("electron");
const fs = require("fs");
const path = require("path");

const GAME_ID = 5341716; // victor-basset/sillwalker
const ROOT = path.join(__dirname, "..");
const args = process.argv.slice(2).filter((a) => !a.startsWith("--no-sandbox"));
const version = args.find((a) => /^\d+\.\d+\.\d+$/.test(a));
const publish = args.includes("--publish");
const editId = (args.find((a) => a.startsWith("--edit=")) || "").slice(7);
const fail = (msg) => { console.log("DEVLOG-ERREUR " + msg); app.exit(1); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function readMeta() {
  const md = fs.readFileSync(path.join(ROOT, "docs", `devlog-${version}.md`), "utf8");
  const pub = md.split("\n## Français")[0];
  const field = (name) => { const m = pub.match(new RegExp("\\*\\*" + name + " :\\*\\*\\s*([\\s\\S]*?)(?=\\n- \\*\\*|\\n\\n|$)")); return m ? m[1].replace(/\s+/g, " ").trim() : null; };
  const title = field("Titre");
  const tags = field("Tags");
  if (!title || !tags) throw new Error("titre ou tags introuvables dans docs/devlog-" + version + ".md");
  return { title, tags: tags.split(",").map((t) => t.trim()).filter(Boolean) };
}

app.whenReady().then(async () => {
  try {
    if (!version) return fail("version manquante (ex. 0.1.8)");
    const { title, tags } = readMeta();
    const body = fs.readFileSync(path.join(ROOT, "steam", "itch", `devlog-${version}.html`), "utf8");
    const cover = path.join(ROOT, "steam", "itch", `cover-${version}.png`);
    if (!fs.existsSync(cover)) return fail("couverture absente : " + cover);
    const token = fs.readFileSync(path.join(process.env.HOME, ".config", "itch", "web_session"), "utf8").trim();
    // Jamais deux fois le même devlog (relance de itch-push.sh) : un billet public de cette version existe déjà ?
    if (!editId) {
      const list = await (await fetch("https://victor-basset.itch.io/sillwalker/devlog")).text();
      const slug = "sillwalker-" + version.replace(/\./g, "") + "-";
      const m = list.match(new RegExp("devlog/(\\d+)/" + slug));
      if (m) { console.log("DEVLOG-DÉJÀ " + m[1] + " (rien de fait)"); return app.exit(0); }
    }
    const ses = session.fromPartition("itch-devlog"); // en mémoire seulement : rien n'est écrit sur le disque
    await ses.cookies.set({ url: "https://itch.io", domain: ".itch.io", name: "itchio", value: token, secure: true, httpOnly: true });
    const win = new BrowserWindow({ show: false, width: 1280, height: 1000, webPreferences: { session: ses } });
    // ?redactor=0 : le site garde un simple <textarea> pour le corps (pas d'éditeur riche à piloter)
    const url = editId ? `https://itch.io/dashboard/post/${editId}/edit?redactor=0` : `https://itch.io/dashboard/game/${GAME_ID}/new-devlog?redactor=0`;
    await win.loadURL(url);
    const js = (code) => win.webContents.executeJavaScript(code, true);
    if (!(await js(`!!document.querySelector('input[name="post[title]"]')`))) return fail("formulaire introuvable (session expirée ? " + (await js("location.href")) + ")");

    // Couverture : bouton d'envoi du composant « Cover image », fenêtre de fichier interceptée par le protocole du navigateur
    const dbg = win.webContents.debugger;
    dbg.attach("1.3");
    await dbg.sendCommand("Page.enable");
    await dbg.sendCommand("Page.setInterceptFileChooserDialog", { enabled: true });
    const chosen = new Promise((resolve) => dbg.on("message", (e, method, params) => { if (method === "Page.fileChooserOpened") resolve(params); }));
    const hasCover = await js(`(() => { const h = document.querySelector('input[name="post[cover_image_id]"]'); return !!(h && h.value); })()`);
    if (!hasCover) {
      const clicked = await js(`(() => {
        const lab = [...document.querySelectorAll('.label')].find((l) => /cover image/i.test(l.textContent));
        const row = lab && lab.closest('.input_row');
        const btn = row && [...row.querySelectorAll('button, .button')].find((b) => /upload/i.test(b.textContent));
        if (!btn) return false; btn.click(); return true; })()`);
      if (!clicked) return fail("bouton d'envoi de la couverture introuvable");
      const fc = await Promise.race([chosen, wait(15000).then(() => null)]);
      if (!fc) return fail("la fenêtre de choix de fichier ne s'est pas ouverte");
      await dbg.sendCommand("DOM.setFileInputFiles", { files: [cover], backendNodeId: fc.backendNodeId });
      let id = "";
      for (let i = 0; i < 120 && !id; i++) { await wait(500); id = await js(`(document.querySelector('input[name="post[cover_image_id]"]') || {}).value || ""`); }
      if (!id) return fail("couverture non envoyée (pas d'identifiant d'image après 60 s)");
      console.log("couverture envoyée : image " + id);
    }

    // Soumission depuis la page : tous les champs du formulaire (jeton CSRF, couverture), les nôtres par-dessus
    const fields = { "post[title]": title, "post[user_classification]": "general_update", "post[body]": body, "post[tags]": tags.join(","),
      "post[languages]": "de,en,es,fr,ja,ko,pl,pt-BR,ru,zh_Hans", "post[enable_comments]": "on" };
    const res = await js(`(async () => {
      const form = document.querySelector('input[name="post[title]"]').form;
      const fd = new FormData(form);
      const f = ${JSON.stringify(fields)};
      for (const k in f) fd.set(k, f[k]);
      ${publish ? `fd.set("post[published]", "on");` : `fd.delete("post[published]");`}
      const r = await fetch(form.action || location.href, { method: "POST", body: fd, credentials: "include" });
      const text = await r.text();
      let j = null; try { j = JSON.parse(text); } catch (e) {}
      return { status: r.status, url: r.url, json: j, errors: j && j.errors, snippet: j ? null : (text.match(/class="form_errors"[\\s\\S]{0,400}/) || [""])[0] };
    })()`);
    if (res.status >= 400 || (res.errors && res.errors.length) || (res.snippet && res.snippet.length)) return fail("refus : " + JSON.stringify(res).slice(0, 600));
    const out = res.json || {};
    const postId = editId || (String(out.redirect_to || res.url).match(/(?:post|devlog)\/(\d+)/) || [])[1] || "?";
    console.log("DEVLOG-OK " + postId + " " + (out.redirect_to || res.url) + (publish ? " (publié)" : " (brouillon)"));
    app.exit(0);
  } catch (e) { fail(e && e.stack || String(e)); }
});
