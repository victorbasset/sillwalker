// Essai Tauri : copie les pages du jeu (src/renderer) dans proto-tauri/dist et y ajoute le pont (bridge.js).
// Usage : node proto-tauri/build-web.mjs
import fs from "node:fs";
import path from "node:path";
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const src = path.join(here, "..", "src", "renderer"), dist = path.join(here, "dist");
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(src, dist, { recursive: true });
fs.copyFileSync(path.join(here, "bridge.js"), path.join(dist, "bridge.js"));
const file = path.join(dist, "index.html");
let html = fs.readFileSync(file, "utf8");
// La politique de contenu d'Electron bloquerait l'IPC de Tauri : retirée dans l'essai (Tauri applique la sienne).
html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\s*/i, "");
html = html.replace("<title>", '<script src="bridge.js"></script>\n<title>');
fs.writeFileSync(file, html);
console.log("pages copiées dans", dist);
