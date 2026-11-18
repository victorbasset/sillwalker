# Ce qui attend Victor

Tenu à jour par les itérations automatiques (it. 1386). Les décisions et les gestes que seul Victor peut faire ; le
détail est dans `docs/JOURNAL.md` et `steam/checklist.md`.


## Mi-journée du 18/11 (it. 2205-2249) : à regarder en jouant

- **Familiers** : « Emmener » sur une expédition en cours la rappelle (sans butin) et équipe le familier ; niveau sous le nom.
- **Quêtes** : un lien « → Aventure » / « → Familiers » sur les quêtes de forge, de transmutation et d'expéditions ; la quête
  d'expéditions n'apparaît plus avant leur déblocage (elle était impossible entre les zones 25 et 50).
- **Carte** : « En vente : … » et un lien vers la boutique quand la Carte du voyageur est achetable (avant : « Bientôt »).
- **Traductions** : les cases d'automatisme disaient « moi-même » au lieu d'« automatiquement » en anglais, allemand, espagnol,
  portugais, polonais et russe (« Spend on my own ») : corrigé.
- **Linux** : Réglages sans « Windows » ni case de démarrage (sans effet sous Linux).
- **Après-midi (it. 2266-2277)** : « À faire » propose d'agrandir le sac d'un clic quand il est plein (et une astuce le dit dans la
  bande) ; il rappelle l'Atelier quand ses améliorations ne coûtent presque rien pour ton or (ta partie de dev : 447 Md, tout à 0) ; les
  liens des quêtes se cachent quand un automatisme fait le geste ; résumé d'absence : plus de défilement en allemand et polonais.
- **Fin d'après-midi (it. 2286-2297)** : Statistiques > Succès : les neuf succès au nom obscur (Clé de voûte, Cœur pur, Écho
  dissipé…) disent au survol ce qu'il faut faire ; les trois plus proches d'être obtenus ressortent en or (ta partie : Alchimiste
  48/50, Dix héros libérés 9/10, Fidèle 5/7) ; une astuce le signale une fois quand l'un d'eux atteint 90 %. Édition 148 de
  « Quoi de neuf ». Pour Steamworks : steam/achievements.md donne aussi ces neuf descriptions dans les 10 langues.

## Matin du 18/11 (it. 2200-2204) : à vérifier chez toi

- ~~Mac : menu du clic droit sur le Dock au-dessus de la bande~~ : VÉRIFIÉ par Victor le 18/11 (« c'est bon sur mac »).
- **Windows : clic droit sur la barre des tâches** (liste des raccourcis d'une appli) : il devrait déjà passer devant la bande
  (rien changé sous Windows) ; dis-moi s'il passe dessous.
- Partie neuve : effets 10 %, ambiance 100 %, musique 20 %, volume général 50 % (vérifié sur un dossier vide).
- **Question (pas urgente) : boutons des cartes de héros.** À 1280 px (écran de portable), « Jouer à l'ascension » et « Prendre en duo »
  passent sur deux lignes (en allemand aussi : « Beim Aufstieg / spielen »). Ni une police plus petite (essayée jusqu'à 11 px) ni le
  déplacement des icônes de sorts ne suffisent : il faudrait des libellés plus courts. Propositions (la bulle garde la phrase complète) :
  (a) « Jouer ensuite » / « En duo » ; (b) « Prochain héros » / « Compagnon » ; (c) laisser tel quel. Dis-moi lequel.

## Nuit du 17 au 18/11 (it. 2094-2171) : Talents refaits et ergonomie, à essayer chez toi

Détail et principes : `docs/TALENTS-UX.md`. Ce que le serveur ne peut pas vérifier (fenêtre sans focus, pas de vraie souris) :
- **Talents à la souris** : la fiche suit le survol sans délai et revient au talent cliqué quand tu vas vers elle ; le design
  (seul le cliquable en vert, Voie en or, total des talents, « ↶ » pour annuler le dernier clic) te convient-il enfin ?
- **Talents au clavier** : Tab sur les talents (la fiche suit le focus), Maj + Entrée (un rang), Z (annuler), Échap (annule une
  demande de réinitialisation).
- **Fenêtres de confirmation** : réinitialisations, ascension, vente d'un objet précieux, effacement de la partie (là, Entrée
  ANNULE) ; un clic sur le fond annule. Dis-moi si l'une gêne au quotidien (trop de confirmations ?).
- **Retour d'absence** : ouvre le panneau pendant la bulle « Pendant ton absence » (le résumé détaillé doit s'ouvrir), et plus
  tard (la carte du héros doit dire « Depuis ta dernière visite »).
- **Boutique, sac plein** : une amélioration du Marchand s'achète quand même (l'ancienne pièce est vendue, jamais une précieuse ;
  la bulle du bouton le dit). Vente d'un légendaire / panoplie / forgé et changement d'une quête 3 étoiles : confirmés.
- **Maîtrises** : « Garder les bonus actuels » éteint le rappel des paliers d'un clic.
- **Clavier** : flèches dans la grille des Talents, Tab sur les ⓘ, Échap qui revient d'abord au sac, focus rendu après une fenêtre.
- Ces nouveautés sont dans les éditions 136 à 139 de « Quoi de neuf » et dans le brouillon du devlog 0.1.7.

## Depuis la 0.1.6 (soir du 17/11, it. 2058-2087) : à regarder en jouant (prochaine version)

- Mode mini (ton signalement) : le monstre suivant s'avance depuis sa place d'attente ; le boss attend lui aussi au fond ; un
  monstre qu'on n'a pas vu attendre entre par le bord droit ; après une défaite, le vainqueur s'efface. Dis-moi si un passage
  te paraît encore saccadé.
- Bande : après une défaite, les monstres vaincus reviennent en courant du bord (avant : le vainqueur sautait hors de l'écran).
- Carte de la zone : le vrai boss (lieutenant, écho, Briseur) avec ses vrais PV ; piste « renforce tes reliques » quand le héros
  bloque devant eux.
- Ces nouveautés sont dans les éditions 133 à 135 de « Quoi de neuf » ; elles partiront avec la 0.1.7 (docs/devlog-0.1.7-brouillon.md).

## Version 0.1.6 (envoyée sur itch.io le 17/11, it. 2056) : reste à publier le devlog

- Fichiers dans Médias/dist-itch : Sillwalker-0.1.6-win.zip, -linux.AppImage, -mac-arm64.zip (empreintes : SHA256-0.1.6.txt) ;
  version Linux essayée (HOME temporaire) : partie neuve, aucun souci. Étiquette git v0.1.6.
- Envoyée sur itch.io par butler (REF=v0.1.6) : canaux windows, linux, mac en 0.1.6 (l'application itch met le jeu à jour).
- Devlog : docs/devlog-0.1.6.md (titre, tags, langues) ; texte à coller : steam/itch/devlog-0.1.6.html ; couverture :
  steam/itch/cover-0.1.6.png (aussi dans Médias/dist-itch/promo).
- Équilibrage à juger en jouant : Chevalier de l'éclipse et Briseur bien plus coriaces, Cœur de l'aube −30 % de dégâts subis.

## Journée des monstres (16-17/11, it. 1847-1901) : à regarder en jouant

Détail : `docs/MONSTRES-VIVANTS.md`. Vidéo envoyée le 17/11 vers 4 h 30 (zone 26, de nuit).
- **La bande vit-elle assez ?** En attendant, les monstres flânent, planent, sautillent, se tournent vers le héros,
  bavardent par deux, dorment la nuit (bêtes de jour, « z »), sursautent quand un voisin tombe, s'avancent quand le héros
  faiblit. Trop, pas assez, trop agité ? Tout se règle dans `render/monlife.js` et `strip.js`.
- **Meutes et instincts** (17/11 matin, vidéo des meutes envoyée vers 6 h) : loups, rats, chauves-souris… vont à deux ou
  trois et se suivent ; la meute s'emporte quand l'un des siens tombe, les proies fuient les prédateurs, le boss s'impatiente.
- **Gestes (17/11 matin)** : chaque espèce a son geste en attendant (l'araignée remonte sur son fil, l'ours se dresse, le
  bandit fait le guet, les plantes se balancent…) ; les loups hurlent à la lune ; bandits et gobelins convoitent les
  légendaires. Trop de choses qui bougent ? Décoche « Effets complets » : la file reste alors calme (et c'est automatique si
  Windows demande moins d'animations).
- **Mode mini** : le monstre suivant attend au fond de la scène, à demi effacé. À garder ?
- **Arrivée des séries (17/11 midi, vidéo envoyée vers 12 h 35)** : chaque nouvelle série accourt du bord droit ; le boss attend.
- **Outil** : `scripts/stall-check.mjs` cherche les parties figées dans des sauvegardes avancées (il a trouvé deux impasses).
- **Compétences** : chaque famille a la sienne, annoncée par un « ! » (bond du gluant, piqué, toile, charge, poing de
  pierre…), décrite au survol de sa carte du Bestiaire. Lisibles ? Trop fréquentes ? (élites −15 %, champions −25 %,
  boss −20 % d'intervalle).
- **Séries de 7 à 13 monstres** par zone (10 en moyenne) : la bande paraît-elle naturelle, serrée ou clairsemée ?
- **Lieutenants et Briseur** : dessin propre (Carte comprise) et pouvoir unique (Chaînes, Cendres, Éclipse, Ciel brisé).
- **Équilibre** : ≈ 1 % de progression en moins sur 12 h (−0,8 zone), la semaine inchangée ; je l'ai gardé (monstres un
  peu plus coriaces). Dis-moi si tu préfères revenir exactement à avant.
- **Bogue corrigé (it. 1958-1959)** : un boss (ou un élite) qui se régénère plus vite que le héros ne le blesse, contre un
  héros qui encaisse tout, figeait la partie (combat sans fin, jamais de recul). Après 90 s, le monstre s'emporte
  désormais jusqu'à ce que l'un des deux tombe. Si tu as déjà vu ton héros bloqué très longtemps devant un boss, c'était ça.
- **Performance sous Windows** : sur le serveur, rien n'a bougé (bande 18 %, fin de partie 25 %) ; à confirmer dans ton
  Gestionnaire des tâches.

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
- Fin de matinée (it. 1651-1673) : Boutique, « Sac plein » ouvre le sac au lieu d'être grisé ; Statistiques, Poupouce a sa
  ligne dans « Moments rares » ; bande, les nombres ne sortent plus par le haut et évitent la bulle du héros ; édition 109.
  Mesuré sans rien changer : le mur des zones 18-21 avant l'Ascension se passe en 20-30 min en suivant l'alerte « héros
  bloqué » (forge), jusqu'à 56 min sans la suivre.
- Début d'après-midi (it. 1675-1689, tes demandes) : Journal dans Statistiques > Journal ; Aventure en 4 colonnes (héros,
  équipement, sac à 16 cases par rangée, zone) ; Réglages à gauche de « Mode mini » ; menu toujours sur une ligne ;
  volumes d'une partie neuve (général 50 %, effets 20 %, musique 50 %, ambiance 100 % ; les sauvegardes existantes
  gardent les leurs) ; bandes-annonces (30 vidéos) et captures (300) refaites, musique « Le Rebord », son discret ;
  bande originale en MP3 dans steam/promo/bande-originale ; éditions 110 et 111 de « Quoi de neuf ».
- Après-midi (it. 1691-1709) : 17e bénédiction du jour, le Jour des familiers (bonus du familier ×2, premier jour le
  22/11 ; la carte du familier montre le bonus doublé, une précision si aucun familier n'est actif) ; touche J =
  Statistiques > Journal ; captures promo refaites ; devlog 0.1.5 complété (10 langues, 11 points) ; édition 112.
- À décider : sortir la 0.1.5 (devlog prêt, 10 langues : docs/devlog-0.1.5-brouillon.md, et sa version HTML pour itch : steam/itch/devlog-0.1.5.html) ; déclarer POUPOUCE et COLOSSAL_25 dans Steamworks.
## Steamworks (si la page ou les succès sont déjà saisis)

- **Version 0.1.5 (quand tu veux)** : brouillon du devlog prêt (`docs/devlog-0.1.5-brouillon.md`, fr et en) : bande
  originale, volumes séparés, jauge d'XP, coffres ouverts, Poupouce, retours de Kreen. Dis « sors la 0.1.5 » et je
  fais le reste (notes de version, constructions, butler).
- **Bande-annonce et nouvelle musique** : FAIT (it. 1684, à ta demande) : 30 vidéos (10 langues × complète 70 s, 30 s,
  verticale) refilmées et montées sur « Le Rebord », son discret (≈ −46 LUFS) ; dans steam/promo/videos et sur le partage.
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

### Poupouce : trois questions en attente de ta réponse (it. 1732-1775)

1. **Bestiaire :** Poupouce (chat) compte au Bestiaire et au succès « Bestiaire complet » ; les Poupouce vaincus avant la
   mise à jour comptent pour sa carte. Le garder dans le total, ou l'en sortir ?
2. **Sac plein :** son légendaire garanti reste au sol et se perd (ta règle « tant pis ») ; le héros prévient maintenant à
   temps, et le Journal signale la perte. Faut-il une vraie exception (rangé quand même, ou vendu) ?
3. **Jour de Poupouce (×10) :** 1 monstre sur 100 ce jour-là, ≈ +100 % d'or et un légendaire tous les 100 monstres (Jour de
   fortune : +50 %). Garder ×10 ou passer à ×5 ?

### 0.1.5 (envoyée sur itch.io le 2026-11-16, it. 1759)

- Devlog : titre, couverture, tags et langues en tête de docs/devlog-0.1.5-brouillon.md ; texte steam/itch/devlog-0.1.5.html.
- À vérifier sous Windows (impossible sur le serveur) : la fenêtre « Nouveautés de la version 0.1.5 » s'ouvre une fois au
  lancement ; la musique joue et Réglages > Son règle Effets, Musique et Ambiance ; Statistiques > Journal (couleurs,
  symboles, « Lignes importantes seulement ») ; le miaulement de Poupouce (au niveau du butin légendaire : trop fort, trop
  faible, pas assez chat ?).
- Version suivante : la 0.1.6 se prépare dans docs/devlog-0.1.6-brouillon.md.
