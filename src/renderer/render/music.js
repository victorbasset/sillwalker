// Musique de fond (it. 1541-, demande de Victor : « 4 musiques, une par tranche de 50 zones, mix de lofi, d'épique
// galactique et d'ambiance Terraria, qualité studio ») : 4 morceaux originaux composés à la main autour d'un même
// leitmotiv, rendus et masterisés HORS du jeu (scripts/music/, docs/MUSIQUE.md) et livrés en Opus
// (assets/music/*.opus). Le jeu ne fait que les lire : plus aucune synthèse de notes en direct (≈ 1,7 point d'un
// cœur économisé). Décodés en mémoire (un seul à la fois, sauf pendant un fondu) pour une boucle à l'échantillon près :
// la fin de chaque morceau a été repliée sur son début au rendu, la boucle n'a ni blanc ni clic.
// Au-delà de la zone 200 (« au-delà du Rebord »), les 4 reviennent par tranches de 50 (201-250 → le premier, etc.).

export const MUSIC_BLOCK = 50;
export const TRACKS = [
  { id: "rebord", name: "Le Rebord", gain: 0.75 }, // (demande de Victor) le premier, très léger : −2,5 dB dans le jeu
  { id: "sentiers", name: "Sentiers d’étoiles" },
  { id: "lieutenants", name: "Les Lieutenants" },
  { id: "briseur", name: "Le Briseur d’Étoiles" },
];
/** Morceau d'une zone (0 à 3) : 1-50, 51-100, 101-150, 151-200, puis les mêmes par tranches de 50. */
export const trackIndex = (zone) => Math.floor(((Math.max(1, zone | 0) - 1) % (MUSIC_BLOCK * TRACKS.length)) / MUSIC_BLOCK);
/** Première zone de la tranche de 50 d'une zone (1, 51, 101…). */
export const musicZone = (zone) => Math.floor((Math.max(1, zone | 0) - 1) / MUSIC_BLOCK) * MUSIC_BLOCK + 1;

// Les fichiers sont normalisés à −16 LUFS : ce gain garde l'équilibre d'avant avec les bruitages (anciens airs
// synthétisés ≈ 0,014 de moyenne quadratique avant le volume général, morceaux ≈ 0,126) ; « Musique » (0 à 2) le module.
const MUSIC_GAIN = 0.11;
const FADE = 2.5;

export class Music {
  constructor(sound) {
    this.sound = sound;       // partage le contexte audio et le volume général des effets sonores
    this.enabled = true;
    this.zone = 0;
    this.voice = null;        // { src, gain, idx }
    this.old = null;
    this.buffers = new Map(); // morceau décodé (le courant, et le précédent pendant un fondu)
    this.boss = false;        // combat de boss : un peu plus de poids (volume +2 dB, graves renforcés)
    this.lite = false;        // (mode léger de l'ancien générateur : sans objet, la lecture d'un fichier ne coûte presque rien)
  }

  /** Musique active si l'option « Musique de fond » l'est et que le son n'est pas coupé (indépendante des effets). */
  set(enabled) {
    this.enabled = !!enabled && !this.sound.muted;
    if (!this.enabled) this.stop();
    else if (this.zone) { const z = this.zone; this.zone = 0; this.setZone(z); }
  }

  /** Volume propre de la musique (Réglages, 0 à 2 ; 1 = niveau d'origine) : appliqué tout de suite au morceau en cours. */
  setLevel(level) {
    this.level = Math.max(0, Math.min(2, +level || 0));
    const ctx = this.sound.ctx, v = this.voice;
    if (ctx && v && !v.dying) { const t = ctx.currentTime; v.gain.gain.cancelScheduledValues(t); v.gain.gain.setTargetAtTime(this.target(), t, 0.15); }
  }

  target(idx = this.voice?.idx ?? trackIndex(this.zone || 1)) { return MUSIC_GAIN * (TRACKS[idx]?.gain ?? 1) * (this.level ?? 1) * (this._boss ? 1.26 : 1); }

  /** Combat de boss (app.js) : volume +2 dB et graves renforcés, en douceur. */
  set boss(on) {
    on = !!on; if (on === this._boss) return; this._boss = on;
    const ctx = this.sound.ctx, v = this.voice;
    if (!ctx || !v || v.dying) return;
    const t = ctx.currentTime;
    v.gain.gain.setTargetAtTime(this.target(), t, 0.6);
    v.low.gain.setTargetAtTime(on ? 4 : 0, t, 0.6);
  }
  get boss() { return !!this._boss; }

  /** Écoute d'un autre morceau (Réglages > Son) pendant 45 s, puis retour au morceau de la zone en cours. */
  preview(zone) {
    if (!this.enabled) return;
    if (!this.previewing) this.home = this.zone;
    this.previewing = true; clearTimeout(this.previewT);
    this.applyZone(musicZone(zone));
    this.previewT = setTimeout(() => this.endPreview(), 45000);
  }

  endPreview() {
    if (!this.previewing) return;
    this.previewing = false; clearTimeout(this.previewT);
    const z = this.home; this.home = 0; if (z) this.applyZone(z);
    this.onPreviewEnd?.(); // le libellé des Réglages revient à la zone en cours
  }

  /** Change de morceau (fondu enchaîné) quand on passe dans une autre tranche de 50 zones. */
  setZone(zone) {
    zone = musicZone(zone);
    if (this.previewing) { this.home = zone; return; }
    this.applyZone(zone);
  }

  /** Décode un morceau (une fois ; gardé tant qu'il joue). */
  async load(idx) {
    const id = TRACKS[idx].id;
    if (this.buffers.has(id)) return this.buffers.get(id);
    const ctx = this.sound.audio();
    const p = fetch(`assets/music/${id}.opus`).then((r) => r.arrayBuffer()).then((ab) => ctx.decodeAudioData(ab));
    this.buffers.set(id, p);
    try { const b = await p; this.buffers.set(id, b); return b; } catch (e) { this.buffers.delete(id); throw e; }
  }

  async applyZone(zone) {
    if (zone === this.zone && this.voice) return;
    this.zone = zone;
    if (!this.enabled) return;
    const ctx = this.sound.audio();
    if (!ctx) return;
    const idx = trackIndex(zone);
    if (this.voice && this.voice.idx === idx && !this.voice.dying) return; // même morceau (autre zone de la tranche)
    const want = ++this.req;
    let buf;
    try { buf = await this.load(idx); } catch { return; } // fichier absent ou illisible : silence plutôt qu'une erreur
    if (want !== this.req || !this.enabled) return;       // une autre zone a été demandée entre-temps
    const t = ctx.currentTime, old = this.voice;
    if (old) { old.gain.gain.cancelScheduledValues(t); old.gain.gain.setValueAtTime(old.gain.gain.value, t); old.gain.gain.linearRampToValueAtTime(0, t + FADE); old.dying = true; old.src.stop(t + FADE + 0.05); this.retire(old); }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const low = ctx.createBiquadFilter(); low.type = "lowshelf"; low.frequency.value = 120; low.gain.value = this._boss ? 4 : 0;
    const gain = ctx.createGain(); gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(this.target(idx), t + FADE);
    src.connect(low); low.connect(gain); gain.connect(this.sound.out || this.sound.master); // volume général, pas le bus des effets
    src.start(t);
    this.voice = { src, low, gain, idx };
  }

  req = 0;

  /** Débranche un morceau éteint et libère son tampon décodé s'il ne joue plus (mémoire : ≈ 55 Mo par morceau). */
  retire(v) {
    v.src.onended = () => {
      try { v.src.disconnect(); v.low.disconnect(); v.gain.disconnect(); } catch { /* déjà débranché */ }
      const id = TRACKS[v.idx].id;
      if (!this.voice || this.voice.idx !== v.idx) this.buffers.delete(id);
    };
  }

  /** (it. 1559) Bande cachée (icône seule, plein écran, session verrouillée) : au bout d'une minute, le morceau décodé
   *  (≈ 55 Mo) est libéré ; il revient, en fondu, quand la bande réapparaît. */
  hide(hidden) {
    clearTimeout(this.hideT);
    if (hidden) { this.hideT = setTimeout(() => { if (this.voice || this.buffers.size) { this.stop(); this.released = true; } }, this.hideDelay ?? 60000); return; }
    if (this.released) { this.released = false; const z = this.zone; this.zone = 0; if (this.enabled && z) this.setZone(z); }
  }

  stop() {
    this.req++;
    for (const v of [this.voice]) if (v) { try { v.src.stop(); v.src.disconnect(); v.low.disconnect(); v.gain.disconnect(); } catch { /* déjà arrêté */ } }
    this.voice = null; this.buffers.clear();
  }
}
