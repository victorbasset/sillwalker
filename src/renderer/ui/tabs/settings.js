// Onglet Réglages : préférences du jeu (sauvegardées avec la partie) et de la
// fenêtre (position, opacité, démarrage : réglées par le processus principal).
import { t as tx, LANGS, getLang, setLang } from "../../i18n/index.js";
import { shopIconURL } from "../../render/shopart.js";
import { applyUiScale, applyTheme, themeOf } from "../../render/dom.js";
import { esc, unit } from "../../game/format.js";

const OPACITIES = [1, 0.85, 0.7, 0.55, 0.4];

export class SettingsTab {
  constructor(game, { api, getLayout, onChange, sound } = {}) {
    this.game = game;
    this.api = api;
    this.getLayout = getLayout;
    this.onChange = onChange;
    this.sound = sound;
    this.win = { openAtLogin: false };
    api?.getWindowSettings?.().then((w) => { this.win = w || this.win; });
  }

  badge() { return ""; }

  render(el) {
    const P = this.game.S.settings, L = this.getLayout ? this.getLayout() : {};
    const check = (key, label, help) => `<label class="toggle"><input type="checkbox" data-action="se-toggle" data-key="${key}"${P[key] ? " checked" : ""}> ${esc(label)}</label>${help ? `<p class="note tight">${esc(help)}</p>` : ""}`;
    el.innerHTML = `<div class="setgrid">
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("map", 3)}" alt="">Language / Langue</span></h2>
        <div class="langs">${LANGS.map((l) => `<button data-action="se-lang" data-v="${l.id}" aria-pressed="${getLang() === l.id}">${esc(l.name)}</button>`).join("")}</div>
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("note", 3)}" alt="">${tx("Son")}</span></h2>
        ${check("sound", tx("Effets sonores"), tx("Coups, pièces, butin, montée de niveau… Le bouton haut-parleur de la bande les coupe d’un clic."))}
        ${check("music", tx("Musique de fond"), tx("Un petit air par zone, discret, avec un fondu quand on change de zone."))}
        <label class="range">${tx("Volume")} <input type="range" min="0" max="100" step="5" value="${Math.round(P.volume * 100)}" data-action="se-volume"${P.sound ? "" : " disabled"}> <span>${Math.round(P.volume * 100)}${unit("%")}</span></label>
        <div class="row"><button data-action="se-testsound" class="quiet"${P.sound ? "" : " disabled"}>${tx("Écouter")}</button></div>
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("eye", 3)}" alt="">${tx("Affichage")}</span></h2>
        ${check("dayNight", tx("Cycle jour / nuit"), tx("La bande suit l’heure de ton ordinateur."))}
        ${check("damageNumbers", tx("Nombres de dégâts"))}
        ${check("fullEffects", tx("Effets complets"), tx("Pièces, faisceaux de butin, flashs. Décoche pour une bande plus sobre."))}
        ${check("weather", tx("Météo des zones"), tx("Neige, braises, feuilles, bulles… (un peu plus de calcul)."))}
        <p class="note tight">${tx("Thème du panneau")}</p>
        <div class="row seg">${[["dark", tx("Sombre")], ["light", tx("Clair")], ["auto", tx("Automatique (Windows)")]].map(([v, label]) => `<button data-action="se-theme" data-v="${v}" aria-pressed="${themeOf(P.theme) === v}">${esc(label)}</button>`).join("")}</div>
        <p class="note tight">${tx("Taille du panneau")}</p>
        <div class="row seg">${[1, 1.15, 1.3].map((z) => `<button data-action="se-scale" data-v="${z}" aria-pressed="${Math.abs((P.uiScale || 1) - z) < 0.01}">${Math.round(z * 100)}${unit("%")}</button>`).join("")}</div>
        <p class="note">${tx("Agrandit tout le panneau : texte, boutons et icônes.")}</p>
        <p class="note">${tx("Économie d’énergie : l’animation ralentit sur batterie et quand tu t’absentes (le jeu, lui, continue normalement).")}</p>
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("map", 3)}" alt="">${tx("Fenêtre")}</span></h2>
        <p class="note tight">${tx("Position de la bande")}</p>
        <div class="row seg">${["bottom", "top"].map((e) => `<button data-action="se-edge" data-v="${e}" aria-pressed="${(L.edge || "bottom") === e}">${e === "bottom" ? tx("En bas") : tx("En haut")}</button>`).join("")}</div>
        <p class="note tight">${tx("Opacité")}</p>
        <div class="row seg">${OPACITIES.map((o) => `<button data-action="se-opacity" data-v="${o}" aria-pressed="${Math.abs((L.opacity ?? 1) - o) < 0.01}">${Math.round(o * 100)}${unit("%")}</button>`).join("")}</div>
        <label class="toggle"><input type="checkbox" data-action="se-login"${this.win.openAtLogin ? " checked" : ""}> ${tx("Lancer au démarrage de Windows")}</label>
        <p class="note">${tx("Ces réglages sont aussi dans le menu de l’icône Sillwalker de la zone de notification (clic droit), avec le choix de l’écran.")}</p>
      </article>
      <article class="panel danger-zone"><h2><span class="hicon"><img src="${shopIconURL("skull", 3)}" alt="">${tx("Zone de danger")}</span></h2>
        <p class="note tight">${tx("Efface toute la progression (niveaux, objets, ascensions, collection…) et recommence depuis le début. Irréversible.")}</p>
        <div class="row"><button data-action="reset" class="quiet">${tx("Effacer la partie et recommencer")}</button></div>
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("keys", 3)}" alt="">${tx("Raccourcis clavier")}</span></h2>
        <ul class="lines">
          <li><span>${tx("Changer d’onglet")}</span><b>1 … 9, 0, -</b></li>
          <li><span>${tx("Équiper le meilleur")}</span><b>E</b></li>
          <li><span>${tx("Vendre ce qui n’améliore pas")}</span><b>V</b></li>
          <li><span>${tx("Transmuter les objets inutiles")}</span><b>T</b></li>
          <li><span>${tx("Réclamer une quête terminée (toutes avec le Bureau des contrats)")}</span><b>R</b></li>
          <li><span>${tx("Confirmer une fenêtre")}</span><b>${tx("Entrée")}</b></li>
          <li><span>${tx("Fermer le panneau")}</span><b>${tx("Échap")}</b></li>
          <li><span>${tx("Réduire en mode mini")}</span><b>M</b></li>
        </ul>
        <p class="note">${tx("Actifs quand le panneau est ouvert et que tu as cliqué dedans.")}</p>
      </article>
    </div>`;
  }

  onAction(a, b) {
    const P = this.game.S.settings;
    if (a === "se-toggle") { P[b.dataset.key] = b.checked; this.onChange?.(); }
    else if (a === "se-volume") { P.volume = +b.value / 100; this.onChange?.(); }
    else if (a === "se-testsound") this.sound?.play("legendary");
    else if (a === "se-lang") {
      if (b.dataset.v === getLang()) return;
      P.lang = b.dataset.v;
      setLang(b.dataset.v);
      this.game.changed();
      // Sauvegarde puis rechargement de l'affichage dans la nouvelle langue.
      Promise.resolve(this.api?.writeSave?.(JSON.stringify(this.game.S))).finally(() => location.reload());
      return;
    }
    else if (a === "se-theme") { P.theme = b.dataset.v || "dark"; applyTheme(P.theme); this.game.changed(); return; }
    else if (a === "se-scale") { P.uiScale = +b.dataset.v; applyUiScale(P.uiScale); this.game.changed(); window.dispatchEvent(new Event("resize")); return; }
    else if (a === "se-edge") this.api?.setWindowSettings({ edge: b.dataset.v });
    else if (a === "se-opacity") this.api?.setWindowSettings({ opacity: +b.dataset.v });
    else if (a === "se-login") { this.api?.setWindowSettings({ openAtLogin: b.checked }); this.win.openAtLogin = b.checked; }
    this.game.changed();
  }

  tick() { return false; }
}
