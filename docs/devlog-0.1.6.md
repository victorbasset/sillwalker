# Devlog itch.io : version 0.1.6

À publier sur la page itch.io (Devlog > New post) le jour de la sortie. Reprend les éditions « Quoi de neuf » 115 à 132
parues depuis la 0.1.5, réduites aux nouveautés majeures (les mêmes que NEWS_RELEASES, news.js : RELEASE_016).

## Publication sur itch.io (0.1.6 envoyée le 2026-11-17 par butler, it. 2056 : builds windows #2417912, linux #2417914, mac #2417917)

- **Titre :** Sillwalker 0.1.6 – the Sill comes alive
- **Image de couverture :** steam/itch/cover-0.1.6.png (1920 × 1080 ; aussi dans Médias/dist-itch/promo ;
  `ONLY=update-0.1.6 electron scripts/steam-capsules/make.js <dossier>`)
- **Tags :** Sillwalker, idle game, idle RPG, incremental game, pixel art, indie game, desktop game, taskbar game,
  cozy game, gamedev
- **Langues du jeu :** English, French, Spanish, Portuguese (Brazil), German, Polish, Russian, Chinese (Simplified),
  Japanese, Korean
- **Texte :** steam/itch/devlog-0.1.6.html (10 langues, l'anglais d'abord, les autres dans des blocs repliables)
- **Fichiers :** Médias/dist-itch/Sillwalker-0.1.6-{win.zip, linux.AppImage, mac-arm64.zip}, empreintes dans SHA256-0.1.6.txt ;
  étiquette git v0.1.6

---

## Français

**Titre :** Sillwalker 0.1.6 : le Rebord prend vie

Le texte publié (10 langues) est steam/itch/devlog-0.1.6.html. Notes de travail tenues au fil des éditions (plus
détaillées que le devlog) :

- **Statistiques dès le début :** l'onglet montre le Journal, et les sous-onglets à venir (Chiffres, Succès, Carnet de
  route) apparaissent grisés jusqu'à la zone 40, où leur arrivée est annoncée.
- **Poupouce et le sac plein :** quand il arrive et que ton sac est plein, ton héros te prévient à temps pour faire de
  la place à son objet légendaire ; en mode mini aussi.
- **Mage et assassin :** le mage gagne des points de vie, l'assassin de la défense (il tombait deux fois plus que les autres).
- **Retour d'absence :** la fenêtre dit combien d'objets légendaires les Poupouce vaincus t'ont laissés (seulement ceux
  vraiment rangés) ; en jeu, le Journal signale un légendaire de Poupouce resté au sol faute de place.
- **Tico, le scribe des Statistiques,** a de nouvelles répliques en début de partie (il ne parle plus de ce qui n'est pas
  encore ouvert).
- **Journal horodaté :** chaque ligne indique l'heure à laquelle elle est arrivée ; une astuce fait découvrir la case « Lignes importantes seulement », qui garde aussi désormais les événements et les grandes étapes (⚑ : reliques, ascensions, déblocages, sorts).
- **Duo plus lisible :** un compagnon à distance (arbalétrier, archer, mage…) ne disparaît plus derrière un héros au corps à
  corps, et ses tirs se voient partir.
- **L'expérience en violet partout :** la barre de l'Aventure prend la couleur de la jauge de la bande et du mode mini.
- **Lieutenants du Briseur :** le Geôlier mécanique, la Reine des cendres et le Chevalier de l'éclipse ont chacun leur
  propre dessin (bande, mode mini, Carte), comme le Briseur d'Étoiles.
- **Monstres vivants (journée du 17/11) :** en attendant leur tour, les monstres flânent, planent ou sautillent et
  réagissent au héros et à la mort d'un voisin ; zones de 7 à 13 monstres ; chaque sorte de monstre a sa compétence
  visible (bond, piqué, toile, charge…), les boss de zone celle de leur famille ; lieutenants et Briseur : pouvoirs uniques.
- **Meutes et instincts :** loups, rats, chauves-souris… vont par deux ou trois et se déplacent ensemble ; la meute s'avance
  quand l'un des siens se bat ou tombe, les proies s'écartent des prédateurs, le boss s'impatiente, les loups hurlent à la
  lune, bandits et gobelins convoitent un butin légendaire ; chaque espèce a son geste en attendant (l'araignée sur son fil,
  l'ours qui se dresse…). Élites et champions lancent leur compétence plus souvent.
- **Le climat des zones :** dans la neige, les frileux grelottent et soufflent une buée ; dans les braises, les yétis
  s'affaissent et fument ; sous l'eau, les monstres lâchent des bulles ; dans les spores, ils éternuent, dans les cendres,
  ils toussent ; le vent ballotte les volants. Le fantôme, lui, ne respire pas ; le corbeau vit le jour.
- **Une nouvelle série arrive :** les monstres accourent du bord de l'écran au lieu d'apparaître d'un coup.
- **Mode mini :** le monstre suivant attend son tour au fond de la scène.
- **Effets réduits :** « Effets complets » décoché (ou Windows qui demande moins d'animations), la file reste calme.
- **Bogue corrigé :** un monstre qui se régénère plus vite qu'on ne le blesse, contre un héros qui encaisse tout, figeait la
  partie (combat sans fin) ; le monstre s'emporte après 90 s, et le héros abandonne après 3 min au pire.
- **Équilibrage (demande de Victor) :** le Chevalier de l'éclipse et le Briseur d'Étoiles sont bien plus coriaces (il faut
  plusieurs ascensions et des reliques améliorées) ; le Cœur de l'aube protège un peu moins (dégâts subis −30 %).
