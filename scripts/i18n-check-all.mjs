// Lance i18n-check sur les 9 langues (it. 620 : appelé par npm test ; une variable {n} recopiée par erreur dans une
// traduction s'affichait telle quelle, et i18n-check, qui l'aurait vue, n'était lancé qu'à la main).
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
let bad = 0;
for (const l of ["en", "es", "pt", "de", "pl", "ru", "zh", "ja", "ko"]) {
  const r = spawnSync(process.execPath, ["--experimental-default-type=module", path.join(here, "i18n-check.mjs"), l], { encoding: "utf8" });
  if (r.status !== 0) { bad++; process.stdout.write(r.stdout); }
}
console.log(`i18n-check : ${bad ? bad + " langue(s) en défaut" : "9 langues sans problème"}`);
process.exit(bad ? 1 : 0);
