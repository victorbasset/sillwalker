// Onglet Réglages : préférences du jeu (sauvegardées avec la partie) et de la
// fenêtre (position, opacité, démarrage : réglées par le processus principal).
import { t as tx, LANGS, getLang, setLang, wsp } from "../../i18n/index.js";
import { shopIconURL } from "../../render/shopart.js";
import { applyUiScale, applyTheme, themeOf, effectiveUiScale } from "../../render/dom.js";
// Mac (Victor y joue aussi) : les textes qui nomment Windows ont leur version macOS.
const IS_MAC = /Mac/i.test(navigator.platform || navigator.userAgent || "");
import { WEATHER } from "../../render/juice.js";
import { esc, unit } from "../../game/format.js";
import { musicZone } from "../../render/music.js";


export class SettingsTab {
  constructor(game, { api, getLayout, onChange, sound, music } = {}) {
    this.music = music;
    this.game = game;
    this.api = api;
    this.getLayout = getLayout;
    this.onChange = onChange;
    this.sound = sound;
    this.win = { openAtLogin: false };
    api?.getWindowSettings?.().then((w) => { this.win = w || this.win; });
  }

  badge() { return ""; }

  /** Tranche dont l'air joue : celle écoutée (Réglages) pendant l'écoute, sinon celle de la zone en cours. */
  shownZone() { return this.music?.previewing && this.pz ? this.pz : musicZone(this.game.S.zone); }

  render(el) {
    // Curseur (volume, opacité) en cours de manipulation : ne pas redessiner, sinon il est remplacé en plein
    // glissement et revient à l'ancienne position (signalé par Victor).
    const act = document.activeElement;
    if (act && act.type === "range" && el.contains(act) && el.innerHTML) return;
    const P = this.game.S.settings, L = this.getLayout ? this.getLayout() : {};
    // Opacité choisie au curseur : gardée ici tant que la fenêtre ne l'a pas confirmée (aller-retour avec le
    // processus principal ; sans cela le curseur revenait à l'ancienne valeur, signalé par Victor).
    if (this.opLocal != null && Math.abs((L.opacity ?? 1) - this.opLocal) < 0.001) this.opLocal = null;
    const opacity = this.opLocal ?? (L.opacity ?? 1);
    // L'aide de chaque case passe en infobulle (demande 18 : Réglages sans défilement).
    const check = (key, label, help) => `<label class="toggle"${help ? ` title="${esc(help)}"` : ""}><input type="checkbox" data-action="se-toggle" data-key="${key}"${P[key] ? " checked" : ""}> ${esc(label)}${help ? ` <span class="note help">ⓘ</span>` : ""}</label>`;
    el.innerHTML = `<div class="setgrid">
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("map", 3)}" alt="">Language / Langue</span></h2>
        <div class="langs">${LANGS.map((l) => `<button data-action="se-lang" data-v="${l.id}" aria-pressed="${getLang() === l.id}">${esc(l.name)}</button>`).join("")}</div>
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("note", 3)}" alt="">${tx("Son")}</span></h2>
        ${check("sound", tx("Effets sonores"), tx("Coups, pièces, butin, montée de niveau… Le bouton haut-parleur de la bande coupe tout (effets et musique) et rend l’état d’avant au clic suivant."))}
        ${check("zoneAmbience", tx("Ambiance des zones"), tx("Bulles sous l’eau, braises qui crépitent, oiseaux le jour et grillons la nuit… Très discrète, avec les effets sonores."))}
        <label class="range">${tx("Ambiance")} <input type="range" min="0" max="200" step="10" value="${Math.round((P.ambVol ?? 1) * 100)}" data-action="se-ambvol"${P.sound && P.zoneAmbience ? "" : " disabled"}> <span>${Math.round((P.ambVol ?? 1) * 100)}${unit("%")}</span></label>
        ${check("music", tx("Musique de fond"), tx("Un petit air par zone, discret, avec un fondu quand on change de zone."))}
        <label class="range">${tx("Musique")} <input type="range" min="0" max="200" step="10" value="${Math.round((P.musicVol ?? 1) * 100)}" data-action="se-musicvol"${P.music !== false ? "" : " disabled"}> <span>${Math.round((P.musicVol ?? 1) * 100)}${unit("%")}</span></label>
        <label class="range">${tx("Volume général")} <input type="range" min="0" max="100" step="5" value="${Math.round(P.volume * 100)}" data-action="se-volume"${P.sound || P.music !== false ? "" : " disabled"}> <span>${Math.round(P.volume * 100)}${unit("%")}</span></label>
        <div class="row"><button data-action="se-testsound" class="quiet"${P.sound ? "" : " disabled"}>${tx("Écouter")}</button>
          ${P.music !== false && !P.muted ? `<span class="mpreview">${tx("Air des zones {0}", { 0: `${this.shownZone()}–${this.shownZone() + 4}` })} <button data-action="se-mprev" data-d="-1" class="quiet" title="${esc(tx("Écouter l’air précédent (45 s)"))}">◀</button><button data-action="se-mprev" data-d="1" class="quiet" title="${esc(tx("Écouter l’air suivant (45 s)"))}">▶</button></span>` : ""}</div>
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("eye", 3)}" alt="">${tx("Affichage")}</span></h2>
        ${check("dayNight", tx("Cycle jour / nuit"), tx("La bande suit l’heure de ton ordinateur."))}
        ${check("damageNumbers", tx("Nombres de dégâts"))}
        ${check("fullEffects", tx("Effets complets"), tx("Pièces, faisceaux de butin, flashs. Décoche pour une bande plus sobre."))}
        ${check("weather", tx("Météo des zones"), tx("Neige, braises, feuilles, bulles… (un peu plus de calcul)."))}
        <p class="note tight">${tx("Thème du panneau")}</p>
        <div class="row seg">${[["dark", tx("Sombre")], ["light", tx("Clair")], ["auto", IS_MAC ? tx("Automatique (macOS)") : tx("Automatique (Windows)")]].map(([v, label]) => `<button data-action="se-theme" data-v="${v}" aria-pressed="${themeOf(P.theme) === v}">${esc(label)}</button>`).join("")}</div>
        <p class="note tight">${tx("Taille du panneau")}</p>
        <div class="row seg">${[1, 1.15, 1.3].map((z) => `<button data-action="se-scale" data-v="${z}" aria-pressed="${Math.abs((P.uiScale || 1) - z) < 0.01}">${Math.round(z * 100)}${unit("%")}</button>`).join("")}</div>
        <p class="note">${tx("Agrandit tout le panneau : texte, boutons et icônes.")}${effectiveUiScale(P.uiScale || 1) < (P.uiScale || 1) - 0.005 ? wsp() + esc(tx("Limité à {0} par la largeur de l’écran.", { 0: Math.round(effectiveUiScale(P.uiScale || 1) * 100) + unit("%") })) : ""}</p>
        ${check("cinematics", tx("Cinématiques de l’histoire"), tx("Courtes scènes dans la bande (chroniques, héros libérés, Briseur d’Étoiles). Décoche pour ne jamais être interrompu : tu peux les revoir avec ▶ dans la liste des chroniques."))}
        ${check("eco", tx("Économie d’énergie"), tx("Animation à 15 images par seconde en permanence : moins de calcul, de chaleur et de bruit de ventilateur. Le jeu, lui, continue normalement. (Elle ralentit déjà toute seule sur batterie et quand tu t’absentes.)"))}
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("map", 3)}" alt="">${tx("Fenêtre")}</span></h2>
        <p class="note tight">${tx("Position de la bande")}</p>
        <div class="row seg">${["bottom", "top"].map((e) => `<button data-action="se-edge" data-v="${e}" aria-pressed="${(L.edge || "bottom") === e}">${e === "bottom" ? tx("En bas") : tx("En haut")}</button>`).join("")}</div>
        <p class="note tight">${tx("Informations de la bande")}</p>
        <div class="row seg">${[["edges", tx("Aux bords")], ["center", tx("Au milieu")], ["auto", tx("Automatique (très grands écrans)")]].map(([v, label]) => `<button data-action="se-hudpos" data-v="${v}" aria-pressed="${(P.hudPos || "auto") === v}">${esc(label)}</button>`).join("")}</div>
        <label class="range" title="${esc(tx("À 100 %, la bande arrête les clics et s’attrape n’importe où pour la déplacer ; en dessous, les clics la traversent."))}">${tx("Opacité")} <input type="range" min="5" max="100" step="5" value="${Math.round(opacity * 100)}" data-action="se-opacity-range"> <span>${Math.round(opacity * 100)}${unit("%")}</span></label>
        <label class="toggle"><input type="checkbox" data-action="se-login"${this.win.openAtLogin ? " checked" : ""}> ${IS_MAC ? tx("Lancer à l’ouverture de session du Mac") : tx("Lancer au démarrage de Windows")}</label>
        <p class="note">${IS_MAC ? tx("Ces réglages sont aussi dans le menu de l’icône Sillwalker de la barre des menus, en haut de l’écran, avec le choix de l’écran.") : tx("Ces réglages sont aussi dans le menu de l’icône Sillwalker de la zone de notification (clic droit), avec le choix de l’écran.")}</p>
      </article>
      <div class="stack">
      <article class="panel danger-zone"><h2><span class="hicon"><img src="${shopIconURL("skull", 3)}" alt="">${tx("Zone de danger")}</span></h2>
        <p class="note tight">${tx("Efface toute la progression (niveaux, objets, ascensions, collection…) et recommence depuis le début. Irréversible.")}</p>
        <div class="row"><button data-action="reset" class="quiet">${tx("Effacer la partie et recommencer")}</button></div>
      </article>
      <article class="panel"><h2><span class="hicon"><img src="${shopIconURL("keys", 3)}" alt="">${tx("Raccourcis clavier")}</span></h2>
        <div class="row"><button data-action="showkeys" class="quiet">${tx("Voir les raccourcis")}</button></div>
      </article>
      </div>
    </div>`;
  }

  onAction(a, b) {
    const P = this.game.S.settings;
    if (a === "se-toggle") { P[b.dataset.key] = b.checked; this.onChange?.(); }
    else if (a === "se-volume") { P.volume = +b.value / 100; this.onChange?.(); b.blur(); }
    else if (a === "se-musicvol" || a === "se-ambvol") { P[a === "se-musicvol" ? "musicVol" : "ambVol"] = +b.value / 100; this.onChange?.(); b.blur(); }
    else if (a === "se-mprev") { // écoute des airs (it. 534) : tranche de 5 zones précédente / suivante, 45 s
      const cur = this.shownZone();
      this.pz = Math.max(1, Math.min(196, cur + 5 * +b.dataset.d));
      this.music?.preview(this.pz);
    }
    else if (a === "se-testsound") { // échantillon : coups, pièces, puis l'ambiance de la zone (régler les curseurs à l'oreille)
      const S = this.game.S, z = this.game.zoneDef(), h = new Date().getHours();
      this.sound?.sample(S.cls, WEATHER[z.src || z.name] || null, S.settings.dayNight !== false && (h >= 21 || h < 6));
    }
    else if (a === "se-lang") {
      if (b.dataset.v === getLang()) return;
      P.lang = b.dataset.v;
      setLang(b.dataset.v);
      this.game.changed();
      // Sauvegarde puis rechargement de l'affichage dans la nouvelle langue.
      Promise.resolve(this.api?.writeSave?.(JSON.stringify(this.game.S))).finally(() => location.reload());
      return;
    }
    else if (a === "se-hudpos") { P.hudPos = b.dataset.v || "auto"; window.dispatchEvent(new Event("sillwalker-hudpos")); this.game.changed(); return; }
    else if (a === "se-theme") { P.theme = b.dataset.v || "dark"; applyTheme(P.theme); this.game.changed(); return; }
    else if (a === "se-scale") { P.uiScale = +b.dataset.v; applyUiScale(P.uiScale); this.game.changed(); window.dispatchEvent(new Event("resize")); return; }
    else if (a === "se-edge") this.api?.setWindowSettings({ edge: b.dataset.v });
    else if (a === "se-opacity") this.api?.setWindowSettings({ opacity: +b.dataset.v });
    // Relâché : b.blur() laisse les Réglages se redessiner à nouveau.
    else if (a === "se-opacity-range") { this.opLocal = Math.min(1, Math.max(0.05, +b.value / 100)); this.api?.setWindowSettings({ opacity: this.opLocal }); b.blur(); }
    else if (a === "se-login") { this.api?.setWindowSettings({ openAtLogin: b.checked }); this.win.openAtLogin = b.checked; }
    this.game.changed();
  }

  tick() { return false; }
}
