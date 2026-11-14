# Sortie sur Steam : liste de contrôle

Tenue à jour à chaque étape (it. 785). ✅ fait · 🟡 prêt, à faire dans Steamworks · ⬜ à faire.

## Compte et démarches (Victor)

- ⬜ Compte Steamworks : nom légal « Victor Basset », « Sole Proprietorship », adresse, banque (Shine), formulaire
  fiscal W-8BEN (numéro fiscal français à 13 chiffres), vérification d'identité. *En cours (2026-11-11).*
- ⬜ Droit d'entrée Steam Direct (100 $) → App ID.
- ⬜ Steam Guard (application mobile) actif sur le compte.
- ⬜ Délais : au moins 30 jours entre le paiement et la sortie ; page « Prochainement » visible au moins 2 semaines
  avant ; examen de la page puis de la version par Valve (quelques jours ouvrés chacun).

## Dans le jeu (Claude)

- ⬜ Vrai App ID : `node scripts/steam-set-appid.mjs <App ID>` (remplace 480 dans `src/shared/config.js` et active
  `STEAM_RELAUNCH_IF_NEEDED` ; npm test refuse la relance avec 480).
- ✅ Succès : 67, noms dans les 10 langues (`steam/achievements.md`).
- ✅ Sauvegarde Steam Cloud (API Cloud, la plus récente gagne au lancement).
- ✅ Présence enrichie (`steam/richpresence.vdf`, 10 langues).
- ✅ Envoi des versions : `npm run dist` puis `npm run steam:build` (SteamPipe, `scripts/steam-upload.mjs`).
- ✅ Fonctionne sans Steam (succès renvoyés au lancement suivant avec Steam).

## Dans Steamworks (Victor, avec les fichiers prêts)

- 🟡 Page du magasin : descriptions courte et longue, 10 langues → `steam/store-page.md`.
- 🟡 Captures 1920×1080 (it. 1206 : 15 vues, jeu seul, anglais et français) → `steam/screenshots/` ; les 10 langues
  (une série par page localisée), les versions avec accroches et tout le matériel promo : `steam/promo/`
  (aussi sur le partage, Médias/sillwalker-promo ; LISEZMOI.txt ; régénérable par `scripts/promo/`).
- 🟡 Visuels (capsules, bibliothèque, logo) : première version → `steam/capsules/` (à juger, un graphiste ferait mieux).
- 🟡 Succès : créer les 67 « API Name » de `steam/achievements.md`, icônes 64×64 dans `steam/achievement-icons/`
  (`<ID>.png` obtenu, `<ID>_gray.png` verrouillé ; refaites par `scripts/steam-capsules/achicons.js`), publier.
- 🟡 Steam Cloud : activer, 1 fichier, quota de 1 Mo largement suffisant (sauvegarde ≈ 17 Ko, ≈ 21 Ko après 48 h simulées, it. 963).
- 🟡 Présence enrichie : téléverser `steam/richpresence.vdf`.
- ⬜ Dépôt Windows : options de lancement → exécutable `Sillwalker.exe`, système Windows 64 bits.
- ⬜ Prix, date de sortie, langues (interface + sous-titres pour les 10 langues ; pas de voix).
- ⬜ Questionnaire de classification par âge (violence pixel art légère, pas de sang, pas d'achats en jeu).
- 🟡 Extrait animé de la bande (20 s, 1920×120) pour « À propos de ce jeu » : `steam/media/strip-en.mp4` / `.webm` (et `strip-fr`)
  (`scripts/steam-video.sh`).
- 🟡 Bande-annonce (it. 1168-1205 : 65 s, 1920×1080, musique du jeu et bruitages, 10 langues ; plus une version de
  30 s et une verticale) : `steam/promo/videos/sillwalker-trailer-<langue>.mp4` (≈ 14 Mo chacune ;
  `scripts/promo/`). L'ancienne première version muette reste dans `steam/media/trailer-*.mp4`.

## Hors Steam (itch.io, démo…)

- ✅ `npm run dist:itch` : version Windows sans Steam (dans `dist-itch/`) ; Steam y est entièrement coupé (pas de
  relance, pas de succès ni de cloud Steam), la partie se sauvegarde normalement sur le PC.
- ✅ Linux : `npm run dist:itch:linux` (archive tar.gz, construisible sous Windows) ; `npm run dist:itch:appimage`
  (AppImage : seulement sous Linux, ou Windows en mode développeur : liens symboliques). AppImage construite et
  lancée sur le serveur (partie neuve, Steam coupé), envoyée à Victor en 5 morceaux.
- 🟡 Mac Apple Silicon : `scripts/mac-from-linux.sh ~/.local/bin/rcodesign <dossier>` la construit sur le serveur (signature ad
  hoc, it. 833 ; NON ESSAYÉE sur un vrai Mac). Sinon `npm run dist:itch:mac` (zip Apple Silicon + Intel) SUR UN MAC ; sans compte Apple Developer
  (99 $/an) l'appli n'est pas notarisée : premier lancement par clic droit → Ouvrir.
- 🟡 itch.io : couverture 630×500 → `steam/capsules/itch-cover.png` ; captures et textes : ceux de Steam.
  ZIP à téléverser : `npm run dist:itch` le crée directement dans `dist-itch/` (Sillwalker-<version>-win.zip) ;
  texte de la page : `steam/itch-page.md`.
  Page : Dashboard → Create new project → « Downloadable », ZIP coché « Windows », prix libre ou fixe.

## Après la mise en ligne

- Devlog itch.io / annonce Steam à chaque mise à jour : `node --experimental-default-type=module scripts/devlog.mjs
  <première édition> [dernière] [langue]` exporte les éditions de « Quoi de neuf » en liste prête à coller.

## Configuration requise (proposition)

| | Minimum | Recommandé |
| --- | --- | --- |
| Système | Windows 10 64 bits | Windows 11 64 bits |
| Processeur | 2 cœurs, 2 GHz | 4 cœurs |
| Mémoire | 4 Go | 8 Go |
| Graphismes | compatible DirectX 11 | carte graphique dédiée ou intégrée récente |
| Espace disque | 400 Mo | 400 Mo |
| | (version empaquetée : 272 Mo, mesurée sous Linux à l'it. 787 ; Windows du même ordre) | |
| Notes | Le jeu vit dans une bande au bord de l'écran ; ≈ 500 Mo de mémoire et ≈ 20 % d'un cœur en jeu. | |

English: Windows 10 64-bit (min) / Windows 11 64-bit (rec.), dual-core 2 GHz / quad-core, 4 GB / 8 GB RAM,
DirectX 11 compatible graphics, 400 MB storage. Note: "Lives in a strip at the edge of your screen; about 500 MB of
memory and 20% of one CPU core while running."
