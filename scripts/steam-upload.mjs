// (it. 784) Envoi d'une version sur Steam (SteamPipe). Écrit steam/build/app_build.vdf et depot_build.vdf pour le
// dossier dist/win-unpacked (construit par npm run dist), puis affiche la commande SteamCMD à lancer.
// Usage : node scripts/steam-upload.mjs [--depot=ID] [--branch=nom] [--desc="texte"]
//   App ID : src/shared/config.js (STEAM_APP_ID) ; dépôt Windows : App ID + 1 par défaut (celui que Steamworks crée).
//   --branch : branche bêta à mettre en ligne tout de suite (jamais « default » : la version publique se met en ligne
//   à la main dans Steamworks, après vérification).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (n) => { const a = process.argv.find((x) => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : undefined; };
const { STEAM_APP_ID } = require(path.join(root, "src/shared/config.js"));
const version = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version;

if (!STEAM_APP_ID || STEAM_APP_ID === 480) {
  console.error("App ID de test (480) : mettre le vrai App ID dans src/shared/config.js (STEAM_APP_ID) avant d'envoyer.");
  process.exit(1);
}
const depot = Number(arg("depot")) || STEAM_APP_ID + 1;
const branch = arg("branch") || "";
if (branch === "default") { console.error("--branch=default refusé : la version publique se met en ligne dans Steamworks."); process.exit(1); }
const content = path.join(root, "dist", "win-unpacked");
if (!fs.existsSync(path.join(content, "Sillwalker.exe"))) {
  console.error(`Version introuvable : ${content}\\Sillwalker.exe. Lancer d'abord npm run dist.`);
  process.exit(1);
}
const out = path.join(root, "steam", "build");
fs.mkdirSync(path.join(out, "output"), { recursive: true });
// chaînes VDF entre guillemets ; chemins Windows écrits avec « / » (SteamCMD les accepte, et « \\ » serait lu comme un échappement)
const q = (s) => `"${String(s).replace(/\\/g, "/").replace(/"/g, "'")}"`;
fs.writeFileSync(path.join(out, `depot_build_${depot}.vdf`), `"DepotBuildConfig"
{
  "DepotID" "${depot}"
  "ContentRoot" ${q(content)}
  "FileMapping"
  {
    "LocalPath" "*"
    "DepotPath" "."
    "recursive" "1"
  }
  "FileExclusion" "*.pdb"
}
`);
fs.writeFileSync(path.join(out, "app_build.vdf"), `"AppBuild"
{
  "AppID" "${STEAM_APP_ID}"
  "Desc" ${q(arg("desc") || "Sillwalker " + version)}
  "BuildOutput" ${q(path.join(out, "output"))}
  "SetLive" ${q(branch)}
  "Depots"
  {
    "${depot}" ${q(path.join(out, `depot_build_${depot}.vdf`))}
  }
}
`);
console.log(`App ${STEAM_APP_ID}, dépôt ${depot}, version ${version}${branch ? `, mise en ligne sur la branche « ${branch} »` : " (à mettre en ligne dans Steamworks)"}.`);
console.log("Commande (SteamCMD, compte Steamworks ayant le droit d'envoyer des versions) :");
console.log(`  steamcmd +login <ton_identifiant> +run_app_build ${q(path.join(out, "app_build.vdf"))} +quit`);
