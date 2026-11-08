// Onglet Réglages : préférences du jeu (sauvegardées avec la partie) et de la
// fenêtre (position, opacité, démarrage : réglées par le processus principal).
import { esc } from "../../game/format.js";

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
      <article class="panel"><h2>Son</h2>
        ${check("sound", "Effets sonores", "Coups, pièces, butin, montée de niveau… Coupés par défaut.")}
        <label class="range">Volume <input type="range" min="0" max="100" step="5" value="${Math.round(P.volume * 100)}" data-action="se-volume"${P.sound ? "" : " disabled"}> <span>${Math.round(P.volume * 100)} %</span></label>
        <div class="row"><button data-action="se-testsound" class="quiet"${P.sound ? "" : " disabled"}>Écouter</button></div>
      </article>
      <article class="panel"><h2>Affichage</h2>
        ${check("dayNight", "Cycle jour / nuit", "La bande suit l’heure de ton ordinateur.")}
        ${check("damageNumbers", "Nombres de dégâts")}
        ${check("fullEffects", "Effets complets", "Pièces, faisceaux de butin, flashs. Décoche pour une bande plus sobre.")}
      </article>
      <article class="panel"><h2>Fenêtre</h2>
        <p class="note tight">Position de la bande</p>
        <div class="row seg">${["bottom", "top"].map((e) => `<button data-action="se-edge" data-v="${e}" aria-pressed="${(L.edge || "bottom") === e}">${e === "bottom" ? "En bas" : "En haut"}</button>`).join("")}</div>
        <p class="note tight">Opacité</p>
        <div class="row seg">${OPACITIES.map((o) => `<button data-action="se-opacity" data-v="${o}" aria-pressed="${Math.abs((L.opacity ?? 1) - o) < 0.01}">${Math.round(o * 100)} %</button>`).join("")}</div>
        <label class="toggle"><input type="checkbox" data-action="se-login"${this.win.openAtLogin ? " checked" : ""}> Lancer au démarrage de Windows</label>
        <p class="note">Ces réglages sont aussi dans le menu de l’icône Sillwalker de la zone de notification (clic droit), avec le choix de l’écran.</p>
      </article>
    </div>`;
  }

  onAction(a, b) {
    const P = this.game.S.settings;
    if (a === "se-toggle") { P[b.dataset.key] = b.checked; this.onChange?.(); }
    else if (a === "se-volume") { P.volume = +b.value / 100; this.onChange?.(); }
    else if (a === "se-testsound") this.sound?.play("legendary");
    else if (a === "se-edge") this.api?.setWindowSettings({ edge: b.dataset.v });
    else if (a === "se-opacity") this.api?.setWindowSettings({ opacity: +b.dataset.v });
    else if (a === "se-login") { this.api?.setWindowSettings({ openAtLogin: b.checked }); this.win.openAtLogin = b.checked; }
    this.game.changed();
  }

  tick() { return false; }
}
