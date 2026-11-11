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
- ✅ Succès : 61, noms dans les 10 langues (`steam/achievements.md`).
- ✅ Sauvegarde Steam Cloud (API Cloud, la plus récente gagne au lancement).
- ✅ Présence enrichie (`steam/richpresence.vdf`, 10 langues).
- ✅ Envoi des versions : `npm run dist` puis `npm run steam:build` (SteamPipe, `scripts/steam-upload.mjs`).
- ✅ Fonctionne sans Steam (succès renvoyés au lancement suivant avec Steam).

## Dans Steamworks (Victor, avec les fichiers prêts)

- 🟡 Page du magasin : descriptions courte et longue, 10 langues → `steam/store-page.md`.
- 🟡 Captures 1920×1080 (anglais, français) → `steam/screenshots/`.
- 🟡 Visuels (capsules, bibliothèque, logo) : première version → `steam/capsules/` (à juger, un graphiste ferait mieux).
- 🟡 Succès : créer les 61 « API Name » de `steam/achievements.md`, icônes 64×64 dans `steam/achievement-icons/`
  (`<ID>.png` obtenu, `<ID>_gray.png` verrouillé ; refaites par `scripts/steam-capsules/achicons.js`), publier.
- 🟡 Steam Cloud : activer, 1 fichier, quota de 1 Mo largement suffisant.
- 🟡 Présence enrichie : téléverser `steam/richpresence.vdf`.
- ⬜ Dépôt Windows : options de lancement → exécutable `Sillwalker.exe`, système Windows 64 bits.
- ⬜ Prix, date de sortie, langues (interface + sous-titres pour les 10 langues ; pas de voix).
- ⬜ Questionnaire de classification par âge (violence pixel art légère, pas de sang, pas d'achats en jeu).
- 🟡 Extrait animé de la bande (20 s, 1920×120) pour « À propos de ce jeu » : `steam/media/strip-en.mp4` / `.webm` (et `strip-fr`)
  (`scripts/steam-video.sh`).
- 🟡 Bande-annonce, première version (42 s, 1920×1080, anglais, sans son) : `steam/media/trailer-en.mp4` (et `trailer-fr.mp4`)
  (`scripts/steam-trailer.sh`, parcours `--tour`). Sans musique : à ajouter au montage si possible.

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
