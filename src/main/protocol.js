// Protocole app:// qui sert les fichiers du renderer (modules ES, polices...)
// sans passer par file:// et sans pouvoir sortir du dossier du renderer.
const path = require("path");
const { pathToFileURL } = require("url");
const { protocol, net } = require("electron");

const SCHEME = "app";
const HOST = "sillwalker";

function registerScheme() {
  protocol.registerSchemesAsPrivileged([
    { scheme: SCHEME, privileges: { standard: true, secure: true, supportFetchAPI: true, codeCache: true } },
  ]);
}

function serveDirectory(root) {
  const base = path.resolve(root);
  protocol.handle(SCHEME, (req) => {
    const { host, pathname } = new URL(req.url);
    const file = path.resolve(base, "." + decodeURIComponent(pathname));
    if (host !== HOST || !file.startsWith(base + path.sep)) return new Response("Interdit", { status: 403 });
    return net.fetch(pathToFileURL(file).toString());
  });
  return `${SCHEME}://${HOST}/index.html`;
}

module.exports = { registerScheme, serveDirectory };
