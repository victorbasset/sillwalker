# Ce qui attend Victor

Tenu à jour par les itérations automatiques (it. 1386). Les décisions et les gestes que seul Victor peut faire ; le
détail est dans `docs/JOURNAL.md` et `steam/checklist.md`.


## Nuit du 15 au 16/11 (it. 1546-1633), en bref

- Retours de Kreen traités : jauge d'XP (bande, mini, éclat au niveau gagné, astuce), « Atteindre la zone N (record M) »,
  Réglages à droite, cadre de sélection clair, coffres de quête ouverts sous les yeux (fanfare, fermeture seule s'il n'y a
  rien à équiper), astuce « Œil du connaisseur », Poupouce (monstre rare, contour rose, ✦, succès, Jour de Poupouce),
  Rebord plus léger, Briseur d'Étoiles en synthwave.
- Musique : bulle « ♪ » au changement de morceau, 📌 pour garder son morceau, morceau libéré de la mémoire (bande cachée,
  curseur à 0 %), bande-annonce branchée sur la bande originale (le montage reste à refaire : voir plus bas).
- Contenu : 11e élite, le Colossal (taille de boss), succès « Tombeur de colosses » ; éditions 102 à 107 de « Quoi de neuf ».
- Matin (it. 1634-1650) : assassin un peu plus fort (+15 % d'attaque, il était le plus faible des 20) ; Poupouce peut
  tomber pendant l'absence et se remarque (bannière rose, pièces, son) ; le résumé d'absence montre enfin les gobelins
  attrapés ; édition 108 de « Quoi de neuf ».
- À décider : sortir la 0.1.5 (devlog prêt, 10 langues : docs/devlog-0.1.5-brouillon.md, et sa version HTML pour itch : steam/itch/devlog-0.1.5.html) ; refaire la bande-annonce sur la
  nouvelle musique ; déclarer POUPOUCE et COLOSSAL_25 dans Steamworks.
## Steamworks (si la page ou les succès sont déjà saisis)

- **Version 0.1.5 (quand tu veux)** : brouillon du devlog prêt (`docs/devlog-0.1.5-brouillon.md`, fr et en) : bande
  originale, volumes séparés, jauge d'XP, coffres ouverts, Poupouce, retours de Kreen. Dis « sors la 0.1.5 » et je
  fais le reste (notes de version, constructions, butler).
- **Bande-annonce et nouvelle musique (it. 1582)** : les vidéos de `steam/promo/videos/` (65 s, 30 s, verticale, 10 langues)
  portent encore l'ancienne musique générée, et leur montage est calé sur son tempo (89 bpm). Les refaire sur la bande
  originale (par exemple « Sentiers d'étoiles », 92 bpm, ou « Les Lieutenants », 96 bpm) demande de recaler les plans et
  ajoute ≈ 250 Mo à l'historique git : à décider. `scripts/trailer/music.js` sait déjà fournir un morceau en WAV.
- **Page du magasin** : recopier `steam/store-page.md` (10 langues). Elle cite maintenant 18 événements rares,
  11 sortes d'élites (le Colossal, it. 1617) et 19 sortes de quêtes (it. 1375, 1382, 1406, 1452 et 1617).
- **Succès** : déclarer `CHAMPIONS_25` « Fléau des champions » (it. 1266) et `EXPLOSIVE_25` « Démineur (25 explosifs) »
  (it. 1395), `CHESTS_50` « Pilleur de coffres (50 coffres) » (it. 1430), `POUPOUCE` « Poupouce ?! » (it. 1576), `COLOSSAL_25` « Tombeur de colosses (25 colossaux) » (it. 1622), chacun avec ses deux icônes (`steam/achievement-icons/`) ; renommer `BLESSINGS_ALL` en « Toutes les bénédictions du jour » (était « Dix jours bénis », it. 1293).
  Liste complète : `steam/achievements.md` (72 succès).

## Version 0.1.4 (sortie le 15/11)

- Construite et envoyée sur itch.io par butler (canaux windows, linux, mac ; it. 1541). Devlog à publier :
  `docs/devlog-0.1.4.md` (anglais et français). Copies dans `\\192.168.1.25\Médias\dist-itch`.
- Les joueurs de la 0.1.3 voient au lancement la fenêtre « Nouveautés de la version 0.1.4 » (10 nouveautés majeures).

## Page itch.io (thème proposé le 15/11, couleurs du panneau sombre)

- Color : BG `#18121f`, BG 2 `#231a2d`, Text `#efe6d2`, Link `#e8b14a`, Headers `#e8b14a`, Buttons `#e8b14a` (ou `#a3600c`
  si le texte des boutons se lit mal), BG2 Alpha 100 %.
- Text : Font Lato, Size Large, Header font Pixel. Layout : Screenshots Auto (sidebar).
- Images : Banner `steam/capsules/header-capsule.png` ; Background : `steam/itch/background-tile-large.png` (ciel
  étoilé du jeu, 384 px, se répète sans raccord ; « Repeat » / mosaïque). Variantes : `background-tile.png` (la trame
  exacte du panneau, très discrète) et `background-tile-visible.png` (la même, étoiles plus visibles).
- Widget (à coller dans un site) : `steam/itch/widget.html` (page https://victor-basset.itch.io/sillwalker, jeu n° 5341716).

## Fin de partie (à décider, pas urgent)

- Une semaine simulée finit toujours vers la zone 350 (guerrier et mage), l'écho de boss suivant : la progression
  ralentit fortement au-delà (chaque zone est ×1,04 plus dure après la 70). Garder ce rythme lent, ou adoucir la courbe
  au-delà de 250 (≈ +30-40 zones en 2 semaines) ? Détail : `docs/JOURNAL.md` > Idées > « À PROPOSER À VICTOR (it. 1029) ».

## À vérifier sous Windows (impossible sur le serveur)

- Voir `docs/JOURNAL.md` > Idées > « À VÉRIFIER PAR VICTOR SOUS WINDOWS » (premier plan, son, carte graphique).
- (it. 1538) Version construite, première partie (dossier de sauvegarde neuf) : le jeu doit démarrer dans la langue
  de Windows / macOS (vérifié sous Linux seulement).

## Nouveautés du 14 au 15 novembre (it. 1328-1531)

**Contenu**
- Familiers : Lucane (dégâts contre les boss), Pie (+6 % de coffres au trésor par niveau), Grillon (+5 % d'événements
  rares par niveau) : 21 familiers.
- Événements rares : Source de vie (soin), Trésor enfoui (coffres pendant 30 s) : 18 événements.
- Bénédictions du jour : Jour du sang, Jour des arcanes (sorts rechargés 50 % plus vite).
- Élite Explosive ; Encens de chasse (boutique, deux fois plus d'élites 10 min).
- Quêtes : « Gagner N niveaux » et « Attraper N gobelins dorés » (19 sortes) ; les gobelins sont aussi attrapés pendant
  l'absence, avec leur or, quand le héros est assez rapide.
- Succès : « Démineur » (25 Explosifs) et « Pilleur de coffres » (50 coffres) : 70 succès.

**Confort**
- Temps estimé sur presque toutes les cartes de quête (exact pour les expéditions ; aucun quand le héros bute).
- Une quête qui ne peut pas avancer le dit : monstre absent de la zone (où il vit, un clic y emmène avec la Carte du
  voyageur), gobelins trop rapides, avancée automatique coupée (un bouton la reprend).
- Sur la bande, un ◆ marque les monstres visés par une quête en cours.
- Bestiaire : un clic (ou Entrée) sur un monstre emmène là où il vit (Carte du voyageur).
- Héros bloqué : pistes visibles dans la carte de la zone et la bulle du mode mini ; nouvelle piste « forger avec ton
  or » (un héros simulé butait une heure avec 400 k d'or).
- Mode mini : effets actifs, bénédiction de demain, pistes du héros bloqué ; Statistiques > Probabilités : chances
  du jour (Pie, prodiges, champions) ; recharge réelle des sorts le Jour des arcanes.
- « Quoi de neuf » montre jusqu'à 11 nouveautés quand les éditions sont courtes.
- Ta demande : Héros > Sorts et attaque montre les sorts du compagnon en grandes cartes, à droite de ceux du héros ;
  la carte du héros (Aventure) montre aussi ses sorts appris, et le compteur du sous-onglet les compte.
  (Le mode « Automatique (très grands écrans) » était déjà le réglage par défaut.)
- Ta demande : après la fleur, « Dépenser automatiquement » suit la ligne la plus avancée (la région où tu as le plus
  de nœuds, sa voie jusqu'au bout puis son anneau) au lieu d'ouvrir les six portes et de sauter d'une région à
  l'autre. Fin de semaine simulée inchangée (350).
- Tes demandes : cadres de sorts du héros et du compagnon à la même hauteur, même espace au-dessus du style
  d'attaque ; Carte : la tête du héros (celle de l'icône) posée sur le carré de sa zone, textes (niveau des reliques
  sous le drone…) dans la police des textes, avec un contour, lisibles.
- Ta demande : un objet acheté à la Boutique qui renforce le héros est équipé tout de suite.
- Ta demande : sur la bande, le serviteur (squelette du nécromancien, loup du druide) passe devant le héros et le
  compagnon (le familier aussi).
- Tes demandes : duo, un compagnon au corps à corps encaisse pour un héros à distance (dégâts subis −15 %), un
  compagnon à distance couvre un héros au corps à corps (attaque +15 %). Équilibre 12 h : dans le bruit (+0,2 / −0,3).
- « Quoi de neuf » : éditions 99 et 100.
- Tes demandes (Talents) : bouton « Choisir un bonus » sur chaque maîtrise dont un palier attend son choix (ouvre la
  fenêtre), signalé aussi dans « À faire » ; la Voie sur une colonne (description au survol), les Maîtrises sur deux ;
  sorts : boutons d'amélioration alignés en bas.
- Tes demandes : les tirs à distance passent devant le compagnon ; le russe s'affiche dans une version cyrillique de
  la police du texte anglais (66 lettres dessinées pour le jeu), au lieu de Tiny5.
- Tes demandes : bulle d'objet bornée (plus de défilement au survol) ; bouton « Bonus » permanent sur chaque maîtrise ;
  barres de vie du héros et du monstre dans la rangée d'informations de la bande (tête du héros, miniature du monstre,
  bouclier en bleu-blanc, nombres), réglage « Barres de vie en haut de la bande » (Réglages > Fenêtre, activé).
- « Quoi de neuf » : édition 98 (tes demandes de cet après-midi, 4 nouveautés).

**Corrections**
- Parchemins de fortune et de savoir enfin comptés pendant l'absence ; « tout dépenser » du grand graphe sans gel
  (400 → 40 ms) ; pluriels russes et polonais ; termes cohérents d'une langue à l'autre.

**Vérifié** : équilibre inchangé (3 graines ; tableau des 20 héros 63,6 de moyenne), mémoire et performance stables,
parcours complets sans erreur (10 langues, état maximal, fin de partie). Le contrôle des traductions signale
maintenant aussi une phrase oubliée dans toutes les langues.
