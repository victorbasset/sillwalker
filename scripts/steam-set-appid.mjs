// (it. 792) Passe au vrai App ID Steam : node scripts/steam-set-appid.mjs <App ID>
// Remplace STEAM_APP_ID (480 = Spacewar, l'appli de test de Valve) dans src/shared/config.js et active
// STEAM_RELAUNCH_IF_NEEDED (recommandé par Valve : lancé hors Steam, le jeu demande à Steam de le relancer).
// « node scripts/steam-set-appid.mjs 480 » revient à l'App ID de test (relance désactivée, sinon le jeu se fermerait).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const id = Number(process.argv[2]);
if (!Number.isInteger(id) || id <= 0) { console.error("Usage : node scripts/steam-set-appid.mjs <App ID (nombre)>"); process.exit(1); }
const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "shared", "config.js");
let s = fs.readFileSync(file, "utf8");
const a = /STEAM_APP_ID: \d+,/, b = /STEAM_RELAUNCH_IF_NEEDED: (true|false),/;
if (!a.test(s) || !b.test(s)) { console.error("config.js : réglages Steam introuvables"); process.exit(1); }
s = s.replace(a, `STEAM_APP_ID: ${id},`).replace(b, `STEAM_RELAUNCH_IF_NEEDED: ${id !== 480},`);
fs.writeFileSync(file, s);
console.log(`App ID ${id}${id === 480 ? " (test, relance désactivée)" : ", relance par Steam activée"}. Penser à committer src/shared/config.js.`);
