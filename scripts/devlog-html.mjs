// (it. 3206) Texte du devlog itch.io d'une version, en 10 langues, tiré des notes de version (game/news.js : dernière
// entrée de NEWS_RELEASES, déjà traduites dans le jeu). Utilisé par la sortie quotidienne (CLAUDE.md, « Sortie d'une version »).
// Usage : node --experimental-default-type=module scripts/devlog-html.mjs <version> <intros.json>
//   intros.json : { "en": "phrase d'accroche…", "fr": "…", "es": …, "pt": …, "de": …, "pl": …, "ru": …, "zh": …, "ja": …, "ko": … }
//   (texte HTML : « <strong>Sillwalker 0.1.9 is out!</strong> … Here is what's new since 0.1.8: »)
// Écrit steam/itch/devlog-<version>.html : l'anglais d'abord, les 9 autres langues dans des blocs repliables ; chaque nouveauté
// « Libellé : texte » a son libellé en gras ; la phrase de fin (sauvegarde conservée, merci) est reprise de la langue.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const [version, introsFile] = process.argv.slice(2);
if (!/^\d+\.\d+\.\d+$/.test(version || "") || !introsFile) { console.error("usage : devlog-html.mjs <version> <intros.json>"); process.exit(1); }
const intros = JSON.parse(fs.readFileSync(introsFile, "utf8"));
const { NEWS_RELEASES } = await import("../src/renderer/game/news.js");
const { KEYS } = await import("../src/renderer/i18n/keys.js");
const rel = NEWS_RELEASES.at(-1);
if (rel.version !== version) { console.error(`la dernière version des notes (news.js) est ${rel.version}, pas ${version}`); process.exit(1); }

const LANGS = [["en", null], ["fr", "Français"], ["es", "Español"], ["pt", "Português (Brasil)"], ["de", "Deutsch"], ["pl", "Polski"],
  ["ru", "Русский"], ["zh", "简体中文"], ["ja", "日本語"], ["ko", "한국어"]];
const OUTRO = {
  "en": "<p>Your save carries over: just install the new version over the old one.</p>\n<p>Thanks for playing!</p>",
  "fr": "<p>Ta sauvegarde est conservée : installe simplement la nouvelle version par-dessus l'ancienne. Merci de jouer !</p>",
  "es": "<p>Tu partida se conserva: basta con instalar la nueva versión sobre la anterior. ¡Gracias por jugar!</p>",
  "pt": "<p>Seu progresso é mantido: basta instalar a nova versão por cima da antiga. Obrigado por jogar!</p>",
  "de": "<p>Dein Spielstand bleibt erhalten: Installiere die neue Version einfach über die alte. Danke fürs Spielen!</p>",
  "pl": "<p>Twój zapis zostaje: wystarczy zainstalować nową wersję na starą. Dziękujemy za grę!</p>",
  "ru": "<p>Сохранение переносится: просто установи новую версию поверх старой. Спасибо, что играешь!</p>",
  "zh": "<p>存档会保留：直接把新版本安装在旧版本上即可。感谢游玩！</p>",
  "ja": "<p>セーブデータはそのまま引き継がれます。新しいバージョンを古いものの上にインストールするだけです。遊んでくれてありがとう！</p>",
  "ko": "<p>세이브는 그대로 유지됩니다: 새 버전을 기존 버전 위에 설치하기만 하면 됩니다. 플레이해 주셔서 감사합니다!</p>"
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
// « Libellé : texte » (libellé court, avant le premier deux-points) : libellé en gras, espace du français gardée
const li = (t) => { const m = t.match(/^([^:：]{2,40}?)(\s?[:：])\s?(.*)$/s); return m ? `  <li><strong>${esc(m[1])}${m[2]}</strong> ${esc(m[3])}</li>` : `  <li>${esc(t)}</li>`; };
let out = "";
for (const [l, name] of LANGS) {
  if (!intros[l]) { console.error("phrase d'accroche manquante : " + l); process.exit(1); }
  let tr = (k) => k;
  if (l !== "fr") { const m = await import(`../src/renderer/i18n/lang/${l}.js`); const d = m.default || Object.values(m)[0]; tr = (k) => { const v = d[KEYS.indexOf(k)]; if (!v) throw new Error(`${l} : traduction manquante de « ${k} »`); return v; }; }
  const ul = "<ul>\n" + rel.items.map((k) => li(tr(k))).join("\n") + "\n</ul>\n";
  out += name ? `\n<details>\n<summary><strong>${name}</strong></summary>\n<p>${intros[l]}</p>\n${ul}${OUTRO[l]}\n</details>\n` : `<p>${intros[l]}</p>\n${ul}${OUTRO[l]}\n`;
}
const file = path.join(ROOT, "steam", "itch", `devlog-${version}.html`);
fs.writeFileSync(file, out);
console.log(`écrit : ${path.relative(ROOT, file)} (${rel.items.length} nouveautés × ${LANGS.length} langues)`);
