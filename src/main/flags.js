// Mode dev et options de ligne de commande.
const { app } = require("electron");

const argv = process.argv.slice(1);
const getArg = (name) => {
  const a = argv.find((x) => x === "--" + name || x.startsWith("--" + name + "="));
  if (!a) return undefined;
  const i = a.indexOf("=");
  return i < 0 ? true : a.slice(i + 1);
};

// Le mode dev n'existe que hors build packagé : impossible à activer chez un joueur.
const isDev = !app.isPackaged;

module.exports = {
  isDev,
  // Options réservées au développement (ignorées dans le build final)
  devTools: isDev && !!getArg("dev-tools"),
  devSpeed: isDev ? Number(getArg("speed")) || 0 : 0,
  perf: isDev ? getArg("perf") : undefined,            // --perf : mesure RAM/CPU puis quitte
  shot: isDev ? getArg("shot") : undefined,
  shotDelay: isDev ? Number(getArg("shot-delay")) || 0 : 0,   // --shot-delay=ms            // --shot=fichier.png : capture de la fenêtre
  openPanel: isDev && !!getArg("open-panel"),
  tab: isDev ? getArg("tab") : undefined,              // --tab=talents|shop|class : ouvre le panneau sur un onglet
  mode: isDev ? getArg("mode") : undefined,
  selftest: isDev && !!getArg("selftest"),
  ghost: isDev && !!getArg("ghost"),
  demo: isDev && !!getArg("demo"),
  width: isDev ? Number(getArg("width")) || 0 : 0,       // --width=1366 : simule un écran plus étroit                       // --demo : déclenche les effets spéciaux                     // --ghost : tests invisibles (hors écran, sans focus ni icône)               // --selftest : parcours automatique de l'interface          // --mode=strip|mini|icon
  dumpText: isDev ? getArg("dump-text") : undefined,    // --dump-text=fichier.txt : texte de chaque onglet (traductions)
  exitAfter: isDev ? Number(getArg("exit-after")) || 0 : 0,
  battery: isDev && !!getArg("battery"),
  idle: isDev && !!getArg("idle"),                       // --idle : simule un utilisateur absent (images/s au ralenti)                 // --battery : simule un portable sur batterie (images/s réduites)
  releaseUi: isDev && !!getArg("release-ui"),            // --release-ui : cache les commandes de dev (captures fidèles à la version distribuée)
  userData: isDev ? getArg("user-data") : undefined,   // dossier de données isolé pour les tests
};
