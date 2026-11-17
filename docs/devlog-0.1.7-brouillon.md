# Devlog itch.io : version 0.1.7 (BROUILLON, ouvert à l'it. 2057)

Brouillon tenu à jour par la boucle automatique au fil des nouveautés parues depuis la 0.1.6 (éditions « Quoi de neuf »
133 et suivantes). Le jour de la sortie : version de package.json, NEWS_RELEASES (news.js, `after: 132`), puis ce texte en
10 langues (steam/itch/devlog-0.1.7.html) et le bloc « Publication » rempli (CLAUDE.md, « Sortie d'une version » ; modèle :
docs/devlog-0.1.6.md).

## Publication sur itch.io (à remplir à la sortie)

- **Titre :** (à choisir)
- **Image de couverture :** scripts/steam-capsules/make.js, entrée `update-0.1.7` (ver, tags)
- **Tags :** Sillwalker, idle game, idle RPG, incremental game, pixel art, indie game, desktop game, taskbar game,
  cozy game, gamedev
- **Langues du jeu :** English, French, Spanish, Portuguese (Brazil), German, Polish, Russian, Chinese (Simplified),
  Japanese, Korean
- **Texte :** steam/itch/devlog-0.1.7.html (à produire, 10 langues)
- **Envoi :** `REF=v0.1.7 scripts/itch-push.sh victor-basset/sillwalker` (après `--dry-run`) ; étiquette git v0.1.7

---

## Français (nouveautés depuis la 0.1.6, à compléter)

- **Carte de la zone :** le boss annoncé est le vrai (lieutenant, écho ou Briseur, avec ses vrais PV : avant, ceux d'un boss
  ordinaire, cinq fois moins pour le Chevalier de l'éclipse), et un seul nom pour lui (it. 2058-2059).
- **Héros bloqué devant un lieutenant ou le Briseur :** une piste « renforce tes reliques » (it. 2062) ; la carte ne défile plus
  dans ces zones, même en russe sur un écran de 1280 px (it. 2063).
- **Mode mini (signalé par Victor) :** le monstre suivant s'avance depuis sa place d'attente au lieu de disparaître puis de
  surgir plus loin (it. 2071) ; avant son combat, le boss attend lui aussi au fond de la scène (it. 2075).
- **Mode mini, suite :** un monstre qu'on n'a pas vu attendre (premier de la série, gobelin, Poupouce) entre par le bord droit ;
  après une défaite, le vainqueur s'efface et le monstre en attente revient en glissant (it. 2079-2083).
