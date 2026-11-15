# Bande originale : 4 morceaux (demande de Victor, 15/11/2026, ≈ 24 h de travail en boucle)

> « Je veux 4 musiques : zones 0-50, 50-100, 100-150, 150-200. Un mix entre lofi, épique galactique et une ambiance
> un peu Terraria. Extrêmement bien travaillées, qualité studio. Prends ton temps, découpe le travail. »

Fin prévue de la boucle musique : **16/11/2026 vers 20 h**, puis retour à la boucle ordinaire (scripts/auto-iteration.md).
Chaque itération : lire ce fichier, faire la prochaine tâche non cochée, cocher, noter dans « Journal de la musique »
ci-dessous (et une ligne dans docs/JOURNAL.md), committer, pousser.

## Choix d'architecture

- **Composés et pré-rendus** : chaque morceau est une partition écrite à la main (données JS : sections, accords,
  mélodies, basses, batteries), rendue HORS du jeu par un moteur de synthèse soigné (OfflineAudioContext dans une
  fenêtre Electron cachée, comme scripts/steam-capsules/make.js), mixée et masterisée, puis exportée en Opus
  (`src/renderer/assets/music/*.opus`). Le jeu ne fait que LIRE les fichiers : la qualité ne coûte plus de processeur
  (aujourd'hui ≈ 1,7 point d'un cœur pour la musique synthétisée en direct).
- Lecture en streaming (`<audio>` + MediaElementSource branché sur le volume de la musique) : pas de 57 Mo de PCM
  décodé par morceau en mémoire.
- **Leitmotiv** : un même thème de 4 mesures traverse les 4 morceaux, de plus en plus grand (lofi → aventure →
  épique → galactique final). Bande originale cohérente, on reconnaît le jeu.
- Je ne peux pas écouter : contrôles mesurés (ebur128 : volume intégré ≈ −16 LUFS, vrai pic < −1 dBTP ; spectre par
  bandes ; raccord de boucle sans clic ; pas de NaN) et **Victor écoute** des extraits MP3 envoyés à chaque étape.

## Les 4 morceaux (intention)

| # | Zones | Titre provisoire | Couleur | Tempo / tonalité |
|---|---|---|---|---|
| 1 | 1-50 | « Le Rebord » (Ledge Dawn) | lofi chaud, Terraria jour : piano électrique, guitare pincée, flûte, chiptune doux, vinyle | 82 bpm, ré majeur |
| 2 | 51-100 | « Sentiers d'étoiles » (Starpath) | aventure : arpèges de synthé, cloches, basse plus présente, premiers pads spatiaux | 92 bpm, si mineur / ré majeur |
| 3 | 101-150 | « Les Lieutenants » (Embers of the Sky) | épique sombre : cordes, chœur synthétique, toms, basse grave, le thème en mineur | 96 bpm, sol mineur |
| 4 | 151-200 | « Le Briseur d'Étoiles » (Starbreaker) | galactique final : supersaw, pads immenses, arpèges rapides, le thème en majeur triomphant | 100 bpm, ré majeur (retour, une octave plus haut) |

Au-delà de 200 (« au-delà du Rebord ») : les 4 reviennent par tranches de 50 (201-250 → 1, etc.).
Forme de chaque morceau : intro, A, B, A', pont, final, boucle sans couture (≈ 2 min 30 à 3 min).
Combat de boss : à décider (couche de percussions rendue à part et jouée en phase, ou simple variation de mixage).

## Tâches

- [x] 1. Outil de rendu : `scripts/music/render.mjs` + `scripts/music/studio.html` (fenêtre cachée), moteur
      `scripts/music/engine.js` (instruments, effets, mixage, maître), export WAV puis Opus/MP3 (ffmpeg du venv),
      mesures ebur128. Morceau d'essai de 8 mesures pour valider la chaîne.
- [x] 2. Instruments de qualité : piano électrique FM, guitare pincée (Karplus-Strong), flûte, lead chiptune doux,
      cloches, pad (supersaw filtré, chorus), cordes, chœur (formants), basse sub + basse pincée, batterie lofi
      (kick, snare, hats, saturation douce), percussions épiques (toms, timbales), effets : réverbération à
      convolution (impulsion générée), écho stéréo, chorus, compression en sidechain, wow/flutter de bande,
      craquements de vinyle, bus maître (égaliseur, compresseur, limiteur).
- [ ] 3. Le leitmotiv (4 mesures) et ses 4 habits ; harmonie commune.
- [ ] 4. Morceau 1 « Le Rebord » : partition complète, mixage, master, mesures ; extrait envoyé à Victor.
- [ ] 5. Morceau 2 « Sentiers d'étoiles » : idem.
- [ ] 6. Morceau 3 « Les Lieutenants » : idem.
- [ ] 7. Morceau 4 « Le Briseur d'Étoiles » : idem.
- [ ] 8. Intégration dans le jeu : `render/music.js` lit les 4 fichiers selon la zone (tranches de 50), fondu
      enchaîné, volume du réglage « Musique », mode muet, aperçu dans Réglages > Son (4 morceaux), boucle sans
      couture, boss ; autotest (fichiers présents, lecture, volume) ; perf:linux et mem-watch ; bande-annonce.
- [ ] 9. Passe de finition sur les retours de Victor (mixage, tempo, instruments).
- [ ] 10. Nettoyage : ancien générateur retiré (ou gardé en secours si un fichier manque), README, CLAUDE.md,
      « Quoi de neuf », devlog.

## Journal de la musique

- 15/11 : plan écrit.
- 15/11 (tâche 1) : chaîne de rendu en place. `scripts/music/render.cjs` (fenêtre Electron cachée) + `studio.html` +
  `engine.js` (console : pistes, panoramique, envois réverbération à convolution / écho stéréo, sidechain sur la grosse
  caisse ; maître : passe-haut 28 Hz, égaliseur, compresseur de bus, limiteur) + `instruments.js` (piano électrique FM,
  guitare Karplus-Strong, nappe supersaw stéréo, basse sub, grosse caisse, caisse claire, charleston) +
  `master.py` (loudnorm deux passes → −16 LUFS, vrai pic ≤ −1 dBTP ; Opus 128 kb/s et MP3 ; énergie par bandes,
  largeur stéréo, raccord de boucle). Essai de 8 mesures (`tracks/essai.js`) : 27 s rendues en 3,5 s, sans NaN ;
  après master −16,0 LUFS, vrai pic −6,3 dBFS, largeur 0,24. Opus : ≈ 0,56 Mo pour 27 s (≈ 3 Mo par morceau de
  3 min). À améliorer (tâche 2) : bandes en dB par octave pondérées (l'énergie brute est toujours dominée par les
  graves), largeur stéréo plus généreuse.
  Commandes : `xvfb-run -a node_modules/.bin/electron --no-sandbox scripts/music/render.cjs <morceau> <x.wav>` puis
  `<venv>/bin/python -I scripts/music/master.py <x.wav> <sortie> [--loop]`.
- 15/11 (tâche 2) : instruments : piano électrique FM, guitare et basse pincées (Karplus-Strong), cloche/célesta FM,
  flûte (souffle, vibrato, montée d'attaque), lead « puce » (rectangulaire 25 % en série de Fourier, filtrée, glissé),
  nappe supersaw 5/7 voix, cordes d'ensemble, chœur « aah » (formants 800/1150/2900 Hz), basse sub ; batterie : grosse
  caisse, caisse claire, claquement, charleston, shaker, cymbale, toms/timbales ; montée de bruit, craquements de vinyle ;
  pleurage de bande commun (st.setWow). Mesure par octave (dB) dans master.py. Vitrine de 68 s (`tracks/vitrine.js`,
  rendue en 37 s) : −16 LUFS, vrai pic −4,1 dBFS, pente ≈ −5 dB/octave au-dessus de 1 kHz (chaud) ; 63 Hz 8 dB
  au-dessus de 125 Hz : basse sub et grosse caisse un peu fortes, à baisser dans les morceaux. Envoyée à Victor
  (Médias/dist-itch/musique/00-vitrine-instruments.mp3) pour juger les timbres.
