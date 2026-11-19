# Ce qui attend Victor

Tenu à jour par les itérations automatiques (it. 1386). Les décisions et les gestes que seul Victor peut faire ; le
détail est dans `docs/JOURNAL.md` et `steam/checklist.md`.


## Version 0.1.7 (envoyée sur itch.io le 18/11, it. 2346) : reste à publier le devlog

- En ligne (butler) : windows #2430814, linux #2430816, mac #2430820 ; fichiers et SHA256-0.1.7.txt dans Médias/dist-itch.
- Devlog prêt : titre, couverture (steam/itch/cover-0.1.7.png, aussi Médias/dist-itch/promo/), tags, langues et texte en
  10 langues (steam/itch/devlog-0.1.7.html) : tout est en tête de docs/devlog-0.1.7.md.
- Corrigé après l'envoi (pour la 0.1.8) : « La Dernière Étoile » épinglée (📌, Réglages > Son) était oubliée au redémarrage (it. 2361).

## Journée du 19/11 (it. 2514-2613) : sac plein à juger, moins de clics, lisibilité

**Sac plein** : ta règle « l'objet reste au sol, tant pis » est gardée pour le butin. Ce qui change autour :
- « À faire maintenant » (résumé d'absence, carte du héros, bulle du ☰, mode mini) : « Agrandir le sac » puis « Sac plein : N objets
  à vendre » passent EN TÊTE (avant : 8e ligne sur 8 dans dev-data, après 3 h d'absence avec un légendaire perdu).
- Boutique : un coffre s'achète sac plein ; l'objet inutile ORDINAIRE le moins cher est vendu pour lui faire place (sa bulle le nomme).
- Coffre de quête : même choix (avant, il pouvait vendre une pièce forgée ou de panoplie en surplus).
- Valet d'armes : l'ancienne pièce était PERDUE, même légendaire, de panoplie ou forgée. Maintenant une pièce précieuse est gardée
  (un objet ordinaire est vendu pour elle, « Vendu : … » au journal) ; s'il n'y a rien à vendre, c'est la nouvelle qui reste au sol.
- Atelier : « Sac plus grand » a son bouton « max » comme les autres lignes.
- Ce qui reste au sol se voit : nom du meilleur objet perdu en bulle dans le résumé d'absence, ligne au journal après une absence,
  total dans Statistiques > Chiffres (« Laissés au sol (sac plein) »).
- **À toi de dire** : le Creuset et la vente automatique des inutiles consomment les objets FORGÉS devenus inutiles (le Marchand vend
  des objets déjà forgés : les garder boucherait le sac). Pas changé.

**Moins de clics, lisibilité** :
- Liens « 🔒 déblocage · prix » (Carte, Familiers, Compétences, forge) : quand tu as l'or, « Acheter : X (N or) » l'achète sur place.
- « À faire » : « ✦ Sort à apprendre : X » apprend le sort d'un clic.
- Mode mini, bulle de la 💡 : « Prochain déblocage : X · 90 k or · prêt à acheter ! » (avant « 447 Md / 90 k or »).
- Japonais : compteur « つ » remplacé là où le nombre dépasse 9 (« マスタリーの段階 18 件 »).

**Au prochain lancement** : « Quoi de neuf » montre d'abord les éditions 156 à 158 (moins de clics, sac et lisibilité, tout relire) ;
« … et N nouveautés plus anciennes → » mène aux 154-155 (accessibilité, sac plein) et au-delà, page par page ; « ← Plus récentes »
y ramène (it. 2594, 2612). Les notes des versions 0.1.3 à 0.1.7 se relisent aussi (Réglages > Version, « ← / → », it. 2614).

**Outils** : le joueur simulé agrandit maintenant son sac (avant, jamais : sac de 24 en fin de partie) ; équilibrage inchangé
(64,7 → 65,1 sur 12 h, bruit ; semaine du guerrier toujours au palier 350).

**Fin d'après-midi (it. 2614-2679)** : surtout des contrôles (Bestiaire en entier, chaque onglet en anglais à 1280 px, parties
bloquées, mémoire, performance), rien de cassé. Six retouches visibles :
- Bande sur un écran de portable (1280 px) : la barre de vie du monstre s'affiche quand le nom du boss laisse la place (avant : jamais).
- Bande avec les informations « au milieu » sur un écran étroit : le nom du boss ne passe plus sous les boutons. Sur ton écran très
  large, rien ne change (mesuré : même charge, 27 % d'un cœur à 3840 px).
- Pastille de la bénédiction du jour sans point final (« 🍄 Poupouce ×10 »), comme les autres pastilles.
- « À faire » : « ✦ Acheter : … » porte le ✦ des actions d'un clic.
- Boutique > Atelier : le prix et le bouton « max » sont alignés sur chaque ligne (le prix tombait 4 px plus bas) ; l'autotest
  vérifie maintenant l'alignement des boutons voisins dans tous les onglets (it. 2653-2656).
- Statistiques et Réglages : sur un portable (1280-1366 px), les titres des cartes tiennent sur une ligne (« Richesse et butin »,
  « Language / Langue » passaient à la ligne) ; « Gold und Beute » / « Золото и добыча » plus courts (it. 2675-2677).
Édition « Quoi de neuf » 159 publiée pour ces retouches (it. 2679).

**Bug corrigé, présent dans la 0.1.7 distribuée (it. 2730)** : un TOUT NOUVEAU joueur voyait, à son deuxième lancement, la fenêtre
« Nouveautés de la version 0.1.7 » (sans objet pour lui). Corrigé pour la prochaine version : à la première visite, toutes les nouveautés
comptent comme lues.
Dans la même veine : au retour d'une courte absence, un débutant ne rapportait JAMAIS d'objet (54 monstres en 10 min, « Objets gardés :
0 », arrondi par défaut). Arrondi au hasard, même moyenne : environ un retour sur deux rapporte maintenant un objet (it. 2731).
Et au retour d'une longue absence avec le sac plein, la bulle « Sac plein : une amélioration est restée au sol » passait devant la
bulle d'absence pendant 12 s : ouvrir le panneau à ce moment ne montrait pas le résumé. La bulle d'absence passe maintenant en premier (it. 2742).

**Soirée (it. 2684-2689)** : l'outil qui vérifie les 10 langues (lang-overflow) mesurait certains onglets avant le chargement de
leur police, avec une police de secours plus étroite : un texte trop long pouvait sembler tenir. Corrigé (l'outil et l'autotest
attendent les polices) ; deux défauts cachés sont apparus et sont corrigés :
- Ascension en russe sur un portable (1280 px) : l'onglet défilait de 5 px (liste « gardé / perdu » resserrée).
- Japonais : un titre de panneau ne se coupe plus entre deux caractères (« 戦 / 士 » dans les Talents).
Mesure complète relancée ensuite (10 langues, 4 largeurs, fin de partie, 130 %, état maximal) : plus rien.
- Équipement : un emplacement vide s'affiche sur deux lignes (« Gants » / « vide »), comme un objet porté ; en allemand sur un
  portable, « Handschuhe: le… » était coupé dès le premier écran d'une partie neuve (it. 2697).
- Familiers : une expédition en cours affiche « ⏳ 7 h 59 » (son nom au survol) ; « Große Expedition » était coupé sur chaque carte (it. 2716).
- Nom de zone : le signe + d'une zone bouclée ne passe plus seul à la ligne (it. 2701-2702).
Édition « Quoi de neuf » 160 publiée pour ces retouches (it. 2718).
- Bande : la bulle de parole du héros ne passe plus sur les barres de vie de la rangée (partie neuve) ni sur le nom du boss
  (repoussée par la pastille de l'or) ; l'autotest le vérifie pour le nom du boss (it. 2737-2739).

**Linux (prochaine version)** : « desktopName » ajouté pour que la fenêtre se relie à son raccourci sous Wayland (icône de la barre
des tâches) ; sauvegarde toujours dans ~/.config/Sillwalker (vérifié). Les versions Windows et Linux se construisent (vérifié, non
livrées).

## Nuit du 18 au 19/11 (it. 2369-2500) : petites retouches à voir en jouant

- **Compétences** : les noms des nœuds passent toujours au-dessus des nœuds (un nœud voisin en cachait le début, « Охотник за
  сокровищами » en russe) et un peu plus grands (11 px, 12 pour le texte sous les pétales) : en russe à 1280 px, les mots avec « ж »
  (« Жажда », « Сердце зажжено ») étaient flous.
- **Astuce** : une fois, à 5 points de compétence libres, la bande rappelle qu'un clic sur un nœud lointain prend le chemin le plus court.
- **Ta partie (grand graphe)** : si tu avais rempli l'ancien grand graphe, l'annonce « grand graphe complet » reviendra quand tu
  auras repris tous les nouveaux nœuds (avant, elle restait marquée « vue » pour toujours ; it. 2405).
- **Libération (zone 200)** : jamais par-dessus un jeu ou une vidéo en plein écran, ni quand tu as réduit le jeu à son icône, ni
  session verrouillée : elle
  attend ton retour et se joue alors en entier ; 15 images/s en économie d'énergie et sur batterie ; pas de vol automatique si
  Windows est réglé sur « réduire les animations » (rejouable par le ▶ de la chronique).
- **Boutons grisés** : chacun dit pourquoi au survol (« Équiper le meilleur » : rien de mieux dans le sac ; « Tout réinitialiser » :
  rien de pris ; « Écouter » : effets sonores coupés ; Boutique, sac plein : une amélioration reste bloquée quand ta pièce actuelle
  est précieuse, la bulle la nomme). L'autotest vérifie qu'aucun bouton grisé ne reste muet.
- **Accessibilité** : les puces de la carte du héros (bénédiction, panoplies, reliques, effets) se parcourent au clavier (Tab) et
  montrent leur bulle ; l'autotest vérifie aussi : texte de remplacement des images, nom de chaque bouton, bulle sur tout texte coupé,
  tout élément cliquable atteignable au clavier, aucun identifiant en double ; la fenêtre de confirmation lit aussi ce qui sera perdu,
  la cinématique déclare la langue du joueur.
  À vérifier chez toi si tu joues au clavier : le contour doré autour d'une puce ne doit pas être rogné (impossible à capturer ici).
- **Thème clair** : l'orange des objets légendaires est un peu plus foncé (il passait sous le contraste minimal sur les cartes) ;
  un test vérifie désormais le contraste de toutes les couleurs de texte dans les deux thèmes.
- **Talents** : la colonne « Rang 400 » des bonus des paliers est assez large en chinois, japonais et coréen.
- Contrôles de la nuit, tous propres : les 10 langues parcourues (clics), aucun défilement à 1920 et 1280 px, sauvegardes abîmées,
  parties bloquées ou figées, performance inchangée (bande ≈ 19,5 %).

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
- **Soir (it. 2303-2310)** : Bestiaire : ce qui reste à découvrir dit au survol où le trouver (monstre : sa première zone, nommée
  seulement si la Carte la nomme déjà ; pouvoir : sur les légendaires ; bénédiction : revenir d'autres jours). Édition 149.
- **Carnet de route (it. 2315-2329)** : « Prochaine étape : zone 60 » sur ta partie (une seule étape depuis la zone 51 : elles
  viennent toutes les 10 zones après la 50) ; « Niveau 10 / 25 / 50 / 100 » n'y revient plus à chaque ascension. Édition 150.
- **Grand graphe (ta demande, it. 2332)** : 222 nœuds au lieu de 618, plus espacés ; les trois voies de chaque pétale se prennent
  (tes points en surplus servent) ; clic sur un nœud lointain = chemin le plus court pris d'un coup si tu as les points (la bulle dit
  combien ; au survol, le chemin s'allume en or, en rouge s'il manque des points) ; clés de voûte sans malus (valeurs positives réduites d'autant). Ta partie : les nœuds des anciennes voies longues qui
  n'existent plus repartent, leurs points redeviennent libres (« Dépenser automatiquement » les replace). Même rythme mesuré sur
  une semaine simulée (350 / 350). Édition 151. À toi de dire si la densité te plaît (voies de 10 nœuds, anneau de 6).
- **Son des coups (ta demande, it. 2333)** : il suit la vitesse de frappe jusqu'à ≈ 18 coups par seconde (avant 7), chaque coup plus
  bref et doux quand ça va vite. Dis-moi si c'est trop présent.
- **Mac (ta remarque, it. 2334)** : fermer le panneau par la croix ne devrait plus cacher la bande (cause : le jeu « rendait la main »
  à l'appli précédente, ce qui sous macOS passe la fenêtre derrière les autres un instant). À vérifier chez toi.
- **Zone 200 (tes demandes, it. 2341-2342)** : musique « La Dernière Étoile » (à écouter : Médias/dist-itch/musique/07-…-v1.mp3,
  aussi dans Réglages > Son) ; à la première victoire sur le Briseur, ton héros quitte la bande et vole sur tout ton écran (≈ 26 s,
  clics traversants ; rejouable par le ▶ de la chronique « Le ciel rallumé »). À vérifier chez toi : départ depuis la bande, Mac,
  deux écrans. Talents : bonus des paliers alignés, Voie de la hauteur des Maîtrises, voie affichée au clic. Édition 152.
- **Question (grand graphe, it. 2352)** : une fois les 222 nœuds pris, les points restants (140 sur la partie de fin de partie)
  donnent toujours un bonus automatique (+0,1 % d'attaque et de PV chacun). Veux-tu pouvoir les placer toi-même (par exemple des
  rangs supplémentaires sur les 6 couronnes, au choix) ? Je n'y touche pas sans ta réponse.

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
