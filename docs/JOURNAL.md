# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 71).

## Fait

- 2026-11-19 (it. 2650, contrôle) : SELFTEST_TIMES=1 : le contrôle du nom du boss (it. 2636, deux réglages, attente d'images) n'est pas
  parmi les 12 plus lents (< 2,3 s) ; en tête, toujours les trois attentes de la libération (5,6-5,8 s). 325/325.
- 2026-11-19 (it. 2649, contrôle) : Réglages en anglais à 1280 px : propres (cinq colonnes, « Version 0.1.7 », « Automatic (very wide
  screens) » sur deux lignes dans son bouton).
- 2026-11-19 (it. 2648) docs/POUR-VICTOR.md : résumé de la fin d'après-midi (it. 2614-2647 : contrôles et quatre retouches visibles).
- 2026-11-19 (it. 2647, contrôle) : lang-overflow all 1280 (+ fin, × 130 %, max) après le « ✦ » des achats de « À faire » (it. 2640) et la
  pastille de bénédiction (it. 2631) : aucun défilement ni mot coupé dans les 10 langues.
- 2026-11-19 (it. 2646, contrôle) : --crawl en anglais sur une copie de dev-data après les retouches du panneau et de la bande
  (it. 2631-2640) : 527 clics en 18 s, aucune erreur.
- 2026-11-19 (it. 2645, contrôle) : Talents et Compétences (grand graphe) en anglais à 1280 px : propres (« Coup de Grâce » : emprunt
  anglais voulu). Tour des onglets en anglais à 1280 px terminé (it. 2642-2645).
- 2026-11-19 (it. 2644, contrôle) : Boutique (Marchand, sac plein : objets « Bag full », coffres achetables) et Carte (« Buy: Traveler's Map »)
  en anglais à 1280 px : propres.
- 2026-11-19 (it. 2643, contrôle) : Statistiques et Ascension (onglet « ascension ») en anglais à 1280 px : propres (« Wealth and loot »
  sur deux lignes, sans défilement ; « 0 earned in total » : éclats de dev-data donnés à la main).
- 2026-11-19 (it. 2642, contrôle) : bulle de l'ampoule du mode mini (todoLabel, texte sans clic : pas de ✦ / → à y mettre) ;
  Quêtes et Familiers en anglais à 1280 px : propres (« Great Exped… · 7 h 59 » coupé avec bulle, cas connu).
- 2026-11-19 (it. 2641, REVUE GÉNÉRALE) : 12 h : guerrier 65, mage 65, nécromancien 65 ; --perf : 19,6 / 19,1 %, mini 5,6 %, icône 0,4 % ;
  mode mini en coréen (« Lv. 1313 », « 447B », « 지역 57 · 12/12 ») propre ; texte coréen : aucun mot latin suspect. Rien à corriger.
- 2026-11-19 (it. 2640) « À faire maintenant » (résumé d'absence et carte du héros) : les actions faites d'un clic portent « ✦ », les
  liens vers un onglet « → » ; « Acheter : Carte du voyageur (90 k or) » (it. 2614, achat direct) n'avait ni l'un ni l'autre : « ✦ »
  ajouté. Vu en capture du résumé d'absence en anglais (3 h ; « Left on the ground (bag full) 13 » correct). Aucune édition « Quoi
  de neuf » : une seule retouche visible depuis la 158 (bande à 1280 px), à regrouper avec les suivantes. npm test 376, autotest 325/325.
- 2026-11-19 (it. 2639, contrôle) : bande à 3840 px en français (informations au milieu) : barres du héros et du monstre de part et
  d'autre, nom du boss entier au-dessus du boss, aucune erreur.
- 2026-11-19 (it. 2638, contrôle) : --perf à 3840 px (informations au milieu par défaut, écran de Victor) après les it. 2633-2635 :
  bande 27,1 / 26,8 / 27,2 % contre 27,2 / 27,0 % avant (worktree f741d819^, dev-data copiée) : aucun coût.
- 2026-11-19 (it. 2637, contrôle) : bande de fin de partie à 1280 px (zone 150, lieutenant « Rycerz Zaćmienia · -5% PŻ · więzień… »)
  en polonais et allemand : nom entier, barre du monstre cachée faute de place, aucune erreur.
- 2026-11-19 (it. 2636) Autotest : le contrôle du nom du boss couvre aussi les informations au milieu (réglage hudPos, nom réel puis
  quadruplé) et vérifie qu'au milieu le nom ne passe pas sous les boutons : « edges:ok/ok center:ok/ok ». Vérifié qu'il attrape
  l'ancien défaut (strip.js d'avant l'it. 2635 : ÉCHEC « center:ok/nom sous les boutons »). npm test 376, autotest 325/325.
- 2026-11-19 (it. 2635) Bande, informations au milieu (réglage hudPos « center ») sur un écran étroit : à 1280 px en russe, le nom du
  boss passait sous les boutons et sous la barre du monstre (« Пурпурн… » seul lisible). Le nom se décale maintenant vers la droite pour
  commencer après les boutons (largeur mesurée une fois par nom, sans sortir de la bande) et la barre du monstre se cache si elle le
  chevauche (bord réel relu au plus deux fois par seconde). Captures ru 1280 / 1920 en mode centré : nom entier ; 1920 inchangé.
  npm test 376, autotest 325/325.
- 2026-11-19 (it. 2634) Autotest : contrôle « la barre du monstre ne passe pas sous le nom du boss » (nom réel, puis nom quadruplé ;
  « ok / ok » à 1920 px), garde-fou de l'it. 2633. npm test 376, autotest 325/325.
- 2026-11-19 (it. 2633) Bande, écran étroit : la barre de vie du monstre (rangée d'informations, réglage hudBars) était cachée à
  1280 px, faute des 300 px réservés au nom du boss, même quand un nom court laissait la place. Elle se règle maintenant sur le bord
  gauche RÉEL du nom (getBoundingClientRect, relu au plus deux fois par seconde ; 300 px seulement si le nom n'est pas mesurable).
  Captures à 1280 px : anglais et allemand, barre affichée (≈ 55 px avant le nom) ; russe (nom long) : cachée comme avant.
  --perf : bande 19,5 % (19,4-20,3 avant) ; npm test 376, autotest 324/324.
- 2026-11-19 (it. 2632, contrôle) : Héros en japonais, 1920 px (onglet « class ») : propre ; boutons « 昇天後にプレイ » / « デュオに加える »
  sur deux lignes quand ils sont côte à côte : le cas connu des libellés (Idées, P3 it. 2213, à décider avec Victor).
- 2026-11-19 (it. 2631, REVUE GÉNÉRALE) : 12 h : moine 65, prêtresse 64, artificier 64 ; --perf : 20,3 / 19,3 %, mini 5,3 %,
  icône 0,6 % ; texte japonais : aucun mot latin suspect. Capture de l'Aventure en japonais : la pastille de la bénédiction du jour
  finissait par « 。 » (« Poupouce ×10。 ») ; en français aussi par un point : retiré du texte de la pastille (panel.js ; la bulle
  garde la phrase), comme les pastilles d'événements. npm test 376, autotest 324/324.
- 2026-11-19 (it. 2630, contrôle) : i18n-names : 25 écarts, tous anciens (déclinaisons allemandes et coréennes, tournures voulues) ;
  aucun parmi les clés du jour (3395-3421).
- 2026-11-19 (it. 2629, contrôle) : stall-check (sauvegardes avancées, 20 héros) : 60 parties, 0 figées.
- 2026-11-19 (it. 2628, contrôle) : fuzz 60 graines après les changements du sac plein, du coffre et du Valet d'armes : 1200 parties,
  0 bloquées.
- 2026-11-19 (it. 2627, contrôle) : Bestiaire (monstres) en polonais, 1920 px : 83 / 84, noms longs sur deux lignes (« Niedźwiedź
  brunatny », « Obsydianowy skorpion ») sans débordement, compteurs et bonus propres.
- 2026-11-19 (it. 2626, contrôle) : Bestiaire > Collection d'objets en français (44 / 44 types, tous en légendaire ; bonus
  actuel en vert) : propre. Les huit sous-sections du Bestiaire sont revues.
- 2026-11-19 (it. 2625, contrôle) : Bestiaire > Capacités des boss, Élites (1 / 11), Bénédictions du jour (6 / 17, « aujourd'hui » /
  « demain ») en français : propres. Toutes les sous-sections du Bestiaire revues aujourd'hui.
- 2026-11-19 (it. 2624, contrôle) : Bestiaire > Panoplies (0 / 10, pièces portées et dans le sac) et Événements rares (1 / 18, « ??? »
  avec probabilité) en français : propres.
- 2026-11-19 (it. 2623, contrôle) : Bestiaire > Pouvoirs légendaires en français (29 / 30) : propre ; « ??? » à sa place dans l'ordre
  de la liste (chaque pouvoir garde sa position).
- 2026-11-19 (it. 2622, contrôle) : mem-watch 10 min, panneau ouvert : 577 → 590 → 595 → 598 → 598 → 601 Mo, plat (repère 580-610) ;
  pas de fuite après les changements du panneau du jour.
- 2026-11-19 (it. 2621, REVUE GÉNÉRALE) : 12 h : lancier 65, samouraï 69, ranger 62 (graine 7, cf. it. 2610 : 63,6 sur 7 graines) ;
  --perf : 19,4 / 19,1 %, mini 5,4 %, icône 0,7 % ; notes de la 0.1.6 en allemand (« ← 0.1.5 » / « 0.1.7 → ») : propres ; texte russe :
  aucun mot latin suspect. Rien à corriger.
- 2026-11-19 (it. 2620, contrôle) : boutons « Voir les raccourcis » et « Quoi de neuf » des Réglages : sans bulle mais libellés
  explicites ; la pagination s'annonce dans la fenêtre (bouton du bas). Rien à ajouter.
- 2026-11-19 (it. 2619, lisible) : bouton « Version 0.1.7 » des Réglages : bulle « Notes de cette version et des précédentes (← / →) »
  (clé 3421, 9 langues) ; avant, aucune bulle, la relecture des versions précédentes (it. 2614) ne se devinait pas. Autotest.
- 2026-11-19 (it. 2618, doc) : autotest chronométré : ≈ 145 s pour 324 vérifications (CLAUDE.md).
- 2026-11-19 (it. 2617, doc + contrôle) : README : retour aux plus récentes et notes des versions précédentes ; i18n-names après les
  clés 3417-3420 : 25 écarts, les mêmes anciens faux positifs.
- 2026-11-19 (it. 2616, doc) : POUR-VICTOR : avec l'édition 158, la première page montre 156-158 (newsShown vérifié : 9 nouveautés) ;
  pages et notes de version mentionnées.
- 2026-11-19 (it. 2615, contenu) : « Quoi de neuf » édition 158 (tout relire : pages des nouveautés, notes des versions précédentes ;
  vente du Valet au journal ; it. 2594-2614) ; clés 3418-3420 dans les 9 langues. Autotest 324/324, lang-overflow all 1280 : aucun défilement.
- 2026-11-19 (it. 2614, plaisir de revenir) : notes de version (Réglages > « Version 0.1.7 ») : boutons « ← 0.1.6 » / « 0.1.7 → » pour relire
  les versions précédentes (avant : seule la dernière ; 0.1.3 à 0.1.6, 40 nouveautés, introuvables). Numéro de version et flèche,
  aucune clé. 10 langues à 1280 px : aucun défilement ; contrôle de l'autotest (324/324).
- 2026-11-19 (it. 2613, doc) : POUR-VICTOR : « ← Plus récentes » dans « Quoi de neuf ».
- 2026-11-19 (it. 2612, moins de clics) : « Quoi de neuf », pages anciennes : bouton « ← Plus récentes » (retour à la première page ;
  avant, fermer et rouvrir). Clé 3417 dans les 9 langues. Les 40 pages vérifiées dans les 10 langues à 1280 px : sans défilement, retour
  correct ; contrôle de l'autotest étendu (323/323).
- 2026-11-19 (it. 2611, REVUE GÉNÉRALE) : 12 h : druide 65, moine 65, nécromancien 65 ; --perf : 19,3 / 19,5 %, mini 5,3 %, icône 0,7 % ;
  mode mini en japonais : propre ; texte russe : aucun mot latin suspect. Rien à corriger.
- 2026-11-19 (it. 2610, équilibrage) : ranger (62,7 au tableau de l'it. 2609) sur 4 graines de plus (21, 31, 41, 51) : 62, 65, 65, 65 ;
  sur 7 graines 63,6 (moyenne générale 65,1) : bruit, comme le nécromancien (63,3 sur 7, it. 2452) ; pas de réglage.
- 2026-11-19 (it. 2609, contrôle) : hero-table HEROES=all 12 h, graines 7,3,11, avec le sac agrandi par le joueur simulé : moyenne 65,1
  (64,9 avant), écart 5,0 (ranger 62,7 ; gladiateur, gardien des étoiles 67,7) ; nouveau repère dans CLAUDE.md, pas de réglage (bruit
  d'une graine ±4 par héros).
- 2026-11-19 (it. 2608, doc) : POUR-VICTOR : vente du Valet au journal, joueur simulé qui agrandit son sac.
- 2026-11-19 (it. 2607, contrôle) : après la retouche du Valet (it. 2606) : save-fuzz ok (1 267 corruptions), fuzz 1 200 parties 0 bloquée.
- 2026-11-19 (it. 2606, lisible) : Valet d'armes, pièce précieuse gardée : la vente de l'objet ordinaire passe par sell() en jeu
  (« Vendu : X (+N or). » au journal, son des pièces), silencieuse pendant une absence ; avant, toujours silencieuse. Test, autotest.
- 2026-11-19 (it. 2605, doc) : README : pages de « Quoi de neuf » (bouton des plus anciennes).
- 2026-11-19 (it. 2604, langues) : pluriels de « … et N nouveautés plus anciennes » (bouton de l'it. 2594) pour 1, 3, 5, 22, 401 :
  russe (401 au singulier, 22 « few »), polonais (22 « starsze », 401 « starszych »), japonais (件) : corrects.
- 2026-11-19 (it. 2603, contrôle) : bouton « plus anciennes » de « Quoi de neuf » en thème clair : texte sombre (--ink), trait plein,
  lisible.
- 2026-11-19 (it. 2602, design) : bouton « … et N nouveautés plus anciennes → » : trait plein et couleur du texte (classe more) ;
  avant, le style « lock » (pointillé grisé) le faisait passer pour un lien verrouillé. Autotest 323/323.
- 2026-11-19 (it. 2601, REVUE GÉNÉRALE) : 12 h : guerrier 65, mage 65, arbalétrier 66 (habituels) ; --perf (charge ≈ 1,6) : 19,3 / 19,3 %,
  mini 5,7 %, icône 0,4 % ; « Quoi de neuf » page 2 en espagnol (édition 154 visible, « … y 391 novedades más antiguas. → ») : propre ;
  texte russe : aucun mot latin suspect. Rien à corriger.
- 2026-11-19 (it. 2600, contrôle) : semaine simulée (guerrier) avec l'agrandissement du sac (it. 2599) : dernières courses 350 / 349 / 350
  (40 courses au lieu de 42), 6 131-6 158 éclats : même palier, repère de CLAUDE.md inchangé.
- 2026-11-19 (it. 2599, outils) : simulate.js : le joueur simulé agrandit le sac (UPGRADES, même prudence que l'Atelier : sous 10 % de
  l'or) ; avant, jamais (sac de 24 à 90 Qi d'or dans la fin de partie de référence, des dizaines d'objets au sol par absence). 12 h,
  guerrier : sac 48 (4 niveaux), aucun objet au sol. balance 12 h contre HEAD : 64,7 → 65,1 (+0,4, bruit). La fixture endgame-save.json
  n'est pas régénérée (elle garde un sac de 24 : c'est aussi un cas utile, sac plein en fin de partie).
- 2026-11-19 (it. 2598, doc) : CLAUDE.md : pages de « Quoi de neuf » (bouton des plus anciennes) et limite de lang-overflow (première page).
- 2026-11-19 (it. 2597, contrôle) : nombre de pages de « Quoi de neuf » recompté sans limite (newsShown) : 40 pour 157 éditions ;
  la mesure de l'it. 2596 (boucle limitée à 40) les a donc toutes couvertes.
- 2026-11-19 (it. 2596, contrôle) : « Quoi de neuf », TOUTES les pages (40, les 157 éditions) dans les 10 langues à 1280 px :
  aucun défilement ni débordement (lang-overflow ne mesure que la première page).
- 2026-11-19 (it. 2595, test) : autotest « Quoi de neuf : les nouveautés plus anciennes se lisent page par page » (page suivante
  différente, sans défilement, focus gardé dans la fenêtre) ; 323/323.
- 2026-11-19 (it. 2594, plaisir de revenir) : « Quoi de neuf » : « … et N nouveautés plus anciennes » devient un bouton qui montre la
  page suivante (newsShown(seen, skip), même règle : 3 éditions puis complément sous 11) ; avant, les anciennes ne se lisaient nulle part,
  même depuis Réglages > Quoi de neuf (l'édition 154, accessibilité, restait cachée). Libellé existant, aucune nouvelle clé. Test (toutes
  les pages, dans l'ordre, sans doublon) ; en russe à 1280 : pages de 9, 10, 11, 8… sans défilement ; autotest 322/322, lang-overflow ok.
- 2026-11-19 (it. 2593, contrôle) : newsShown vérifié (affirmation de POUR-VICTOR, it. 2592) : lu jusqu'à 152 ou 153 → 9 nouveautés
  montrées (éditions 155-157), 7 ou 4 plus anciennes signalées ; la 154 ne s'affiche pas, comme écrit.
- 2026-11-19 (it. 2592, doc) : POUR-VICTOR : section du jour réorganisée (sac plein / moins de clics / Quoi de neuf / Linux) ; la 154
  ne tient pas dans « Quoi de neuf » au lancement (155-157 = 9 nouveautés, plafond 11), corrigé.
- 2026-11-19 (it. 2591, REVUE GÉNÉRALE) : 12 h : ranger 64, prêtresse 64, gladiateur 65 (habituels) ; --perf (charge ≈ 2) : 19,4 / 19,9 %,
  mini 5,6 %, icône 0,5 % ; mode mini en allemand : propre ; texte japonais : aucun mot latin suspect. Rien à corriger.
- 2026-11-19 (it. 2590, contrôle) : autotest relancé deux fois de suite (stabilité des contrôles des it. 2552-2553) : 322/322 les deux fois.
- 2026-11-19 (it. 2589, doc) : README : règles du sac plein (sol, coffres, pièces précieuses, « Agrandir le sac » en tête).
- 2026-11-19 (it. 2588, contrôle) : ligne « Sac plein » de « À faire » sans objet inutile : « Sac plein : le butin suivant restera au sol »
  (pas de « 0 objets ») ; pluriel par txn. Correct.
- 2026-11-19 (it. 2587, contrôle) : astuce « bagup » (« l'Atelier l'agrandit de 6 places ») : conditionnée à la ligne « Agrandir le sac »
  de todoNow (sac plein, niveau restant, or suffisant) ; muette au maximum (48 places). Correct.
- 2026-11-19 (it. 2586, contrôle) : tab-pace : talents 1 min, stats 2-3, quêtes 4-5, boutique 7-11, héros 9-12, carte 11-14, bestiaire
  13-18, ascension 20-41 (inchangé). Tous les contrôles de rythme et d'équilibre du jour sont identiques aux repères.
- 2026-11-19 (it. 2585, contrôle) : early-pace après les changements du jour : à 60 min, niveau 39-41, zone 23-25, 6,3 déblocages
  (identique aux relevés précédents).
- 2026-11-19 (it. 2584, contrôle) : --crawl sur la fin de partie (fixture) en japonais : 707 clics en 24 s, aucune erreur.
- 2026-11-19 (it. 2583, contrôle) : --crawl sur une partie NEUVE en polonais (peu d'onglets, aucun déblocage) : 73 clics, aucune erreur.
- 2026-11-19 (it. 2582, doc) : CLAUDE.md : la charge des autres services du serveur fausse --perf de ≈ 2 points ; comparer à l'ancien
  commit mesuré aussitôt (it. 2581).
- 2026-11-19 (it. 2581, REVUE GÉNÉRALE) : 12 h : samouraï 65, chaman 69, paladin 65 (habituels) ; --perf 21,1-21,9 % (bande) sous une
  charge extérieure (node /backend à 48 %, bitcoind 9 %, charge moyenne ≈ 3) ; comparé aussitôt à 64c16330 (git worktree, même
  dev-data) : ancien 21,8 / 20,6 %, actuel 19,5 / 18,7 % : aucune régression du jour. Boutique en coréen : propre ; texte russe : aucun
  mot latin suspect. Rien à corriger.
- 2026-11-19 (it. 2580, contrôle) : sonde des ⓘ cachés (info-probe, 1280 px) après les changements de la Boutique, de l'Atelier et
  des liens de déblocage : IPROBE 0 en français et en allemand.
- 2026-11-19 (it. 2579, contrôle) : « À faire » de la carte du héros (dev-data) : même ordre et mêmes actions que le résumé d'absence
  (sac en tête, ✦ actions directes, goal-buy, sort d'un clic ; maîtrises et constellations en liens).
- 2026-11-19 (it. 2578, contrôle) : construction Windows (dir + zip itch) du code du jour dans un dossier temporaire : réussie, zip de
  160 Mo, Sillwalker.exe et app.asar présents (pas lancée : pas de Wine sur le serveur). Dossier supprimé.
- 2026-11-19 (it. 2577, doc) : POUR-VICTOR : desktopName sous Linux (à voir si un joueur Linux le signale).
- 2026-11-19 (it. 2576, contrôle) : desktopName (it. 2575) ne déplace pas la sauvegarde Linux : app.getPath("userData") reste
  ~/.config/Sillwalker (petit programme Electron avec le package.json du jeu, HOME temporaire).
- 2026-11-19 (it. 2575, Linux) : package.json « desktopName »: « sillwalker.desktop » (avertissement d'electron-builder à l'it. 2574 :
  sous Wayland, la fenêtre se relie au raccourci par ce nom ; le .desktop de l'AppImage 0.1.7 s'appelle bien sillwalker.desktop, avec
  StartupWMClass=Sillwalker pour X11). Linux seulement ; npm test, autotest 322/322.
- 2026-11-19 (it. 2574, contrôle) : construction Linux (AppImage, électron-builder) du code du jour dans un dossier temporaire
  (pas dans dist-itch : il aurait écrasé l'AppImage publiée de la 0.1.7, même numéro de version) : réussie, 140 Mo ; lancée 25 s avec
  un HOME temporaire : démarre et crée sa sauvegarde, aucune erreur avant l'arrêt forcé. Dossiers supprimés ensuite.
- 2026-11-19 (it. 2573, contrôle) : Idées : les trois P3 attendent Victor ou sont mesurés. Partie neuve en français à 90 s : zone 2,
  niveau 2, onglet Talents annoncé, scène d'Oorvin (point de talent) avec « clic : passer » : cohérent.
- 2026-11-19 (it. 2572, contrôle) : sous-section des Statistiques invalide (page mêlée vue à l'it. 2571) : impossible pour un joueur
  (this.sec en mémoire seulement, « numbers » au lancement, changé par les seuls sous-onglets affichés). Rien à corriger.
- 2026-11-19 (it. 2571, REVUE GÉNÉRALE) : 12 h : druide 64, lancier 66, assassin 62 (habituels) ; --perf : 21,9 / 20,6 % juste après
  les simulations, puis 19,1 / 19,9 %, mini 5,7 %, icône 0,5 % (charge passagère) ; Statistiques en polonais : « Zostawione na ziemi
  (pełna torba) 9 » (la mise en scène utilisait un nom de sous-section invalide, « nums » : page mêlée, sans effet pour le joueur) ;
  titre de la section du jour dans POUR-VICTOR corrigé. Rien à corriger dans le jeu.
- 2026-11-19 (it. 2570, doc) : POUR-VICTOR : total des objets laissés au sol, éditions 154-157 ; section renommée « Journée du 19/11 ».
- 2026-11-19 (it. 2569, contenu) : « Quoi de neuf » édition 157 (« max » du sac, « prêt à acheter ! » du mode mini, objets laissés au
  sol notés au journal et comptés aux statistiques ; it. 2542-2567) ; clés 3414-3416 dans les 9 langues. Autotest 322/322,
  lang-overflow all 1280 : aucun défilement.
- 2026-11-19 (it. 2568, contrôle) : max-save : stats.grounded = 987 654 (ligne « Laissés au sol » au pire cas) ; lang-overflow all 1280
  avec l'état maximum : 40 mesures, aucun défilement ni mot coupé.
- 2026-11-19 (it. 2567, lisible) : Statistiques > Chiffres : « Laissés au sol (sac plein) N » (S.stats.grounded, compté dans
  addToBag ; libellé déjà traduit ; ligne absente tant que 0). Le résumé d'absence compte désormais la même chose (différence du
  compteur : les coffres et trouvailles restés au sol aussi ; avant, seul le butin des combats, 18 au lieu de 20 dans le test).
  Test, save-fuzz ok, autotest 322/322 ; vérifié dans dev-data (2 h) : « Laissés au sol (sac plein) 9 ».
- 2026-11-19 (it. 2566, contrôle) : résumé d'absence en chinois (dev-data, 3 h) : propre ; lignes du sac en tête, ✦ sur le sort,
  « 稀有 · 未保留 » pour le butin perdu.
- 2026-11-19 (it. 2565, langues) : coréen, bulle des coffres (clé 3407) « {0}(쓸모없음)을(를) » : koJosa saute la parenthèse et
  garde « 을 » (« 별철 단검(쓸모없음)을 팝니다 ») ; correct.
- 2026-11-19 (it. 2564, test) : test-logic : en japonais, aucun « つ » après un nombre variable ou à deux chiffres (échoue avec la
  traduction d'avant les it. 2562-2563) ; 376 tests.
- 2026-11-19 (it. 2563, langues) : japonais : dernier « {n} つ » variable corrigé (« （ほかに {n} 個の節目） », paliers restants) ;
  plus aucun « つ » collé à un nombre variable ou à deux chiffres.
- 2026-11-19 (it. 2562, langues) : japonais : compteur « つ » (petits nombres) remplacé là où {n} dépasse 10 : « マスタリーの段階 {n} 件 »
  (vu à 18 dans le résumé d'absence), « この先あと {n} 個の解放 » (jusqu'à 26 déblocages).
- 2026-11-19 (it. 2561, REVUE GÉNÉRALE) : 12 h : guerrier 65, mage 66, moine 62 (habituels) ; --perf : 19,4 / 19,2 %, mini 5,6 %, icône
  0,7 % ; résumé d'absence en japonais (lignes du sac en tête, ✦ sur le sort à apprendre) : propre ; texte russe : aucun mot latin
  suspect. Rien à corriger.
- 2026-11-19 (it. 2560, contrôle) : save-fuzz FUZZ_BASE=0.1.2 (vieille sauvegarde) après les changements du butin et du retour
  d'absence : ok, 1 169 corruptions.
- 2026-11-19 (it. 2559, contrôle) : barre du prochain déblocage du mode mini : pas cliquable en soi (la zone ouvre le panneau, où il
  s'achète d'un clic) : rien à changer. Fuzz FUZZ_DAYMOD=all : 1 200 parties, 0 bloquée ; stall-check STALL_DAYMOD=all : 0 figée.
- 2026-11-19 (it. 2558, contrôle) : astuce du sac plein sur la bande en russe (« Мастерская (Лавка) увеличивает её на 6 мест ») :
  traduite, tient dans sa bulle (vérification restée en suspens à l'it. 2557).
- 2026-11-19 (it. 2557, doc + contrôle) : POUR-VICTOR : bulle du mode mini ; bande en russe (nom du boss, or, niveau) : propre.
- 2026-11-19 (it. 2556, contrôle) : autres « or possédé / prix » du prochain déblocage : seulement la carte du héros (déjà « cliquer
  pour l'acheter » quand l'or suffit) et le mode mini (corrigé it. 2555). Rien d'autre.
- 2026-11-19 (it. 2555, lisible d'un coup d'œil) : bulle du mode mini, or suffisant : « Prochain déblocage : Carte du voyageur · 90 k or ·
  prêt à acheter ! » (clé 1423, déjà traduite et inutilisée) ; avant : « 447,22 Md / 90 k or », l'avoir plus grand que le prix.
  Vérifié (dev-data, mini) ; autotest 322/322.
- 2026-11-19 (it. 2554, doc) : CLAUDE.md : autotest ≈ 146 s pour 322 vérifications (mesuré).
- 2026-11-19 (it. 2553, test) : autotest « À faire : un sort abordable s'apprend d'un clic » (todoDirect vrai, todoDo apprend le
  sort, état rendu ensuite) ; 322/322.
- 2026-11-19 (it. 2552, test) : autotest « Atelier : « max » agrandit le sac de tous ses niveaux d'un clic » (sac 24 → 48, bouton retiré,
  état rendu ensuite) ; 321/321.
- 2026-11-19 (it. 2551, REVUE GÉNÉRALE) : 12 h : nécromancien 62, danseuse de lames 62, cryomancien 65 (habituels) ; --perf : 19,8 /
  18,9 %, mini 5,6 %, icône 0,5 % ; Atelier en allemand (« max. » de la sacoche aligné) : propre ; --crawl en russe : 510 clics, aucune
  erreur. Rien à corriger.
- 2026-11-19 (it. 2550, doc + contrôle) : POUR-VICTOR : « max » du sac ; lang-overflow all 1280 (Atelier compris) : 20 mesures, aucun
  défilement ni débordement.
- 2026-11-19 (it. 2549, moins de clics) : Atelier : « Sac plus grand » a enfin son bouton « max » comme les autres lignes (dès que
  l'or couvre deux niveaux ; prix du suivant calculé sur une copie de l'état) ; avant : 4 clics pour 4 niveaux. Vérifié : un clic, sac
  24 → 48, bouton retiré au maximum. Autotest 320/320.
- 2026-11-19 (it. 2548, contrôle) : lang-overflow all 1920 AVEC l'état « tout au maximum » (max-save, sauté par NO_MAX aux
  mesures du jour) : 30 mesures (dont max 1920 et 1280 dans les 10 langues), aucun défilement ni mot coupé.
- 2026-11-19 (it. 2547, contrôle) : résumé d'absence sur la fin de partie (fixture, 3 h, français) : propre ; « Agrandir le sac » en tête,
  26 objets au sol (le joueur simulé n'agrandit jamais le sac : sac de 24 à 90 Qi d'or), « Meilleur butin : Grèves d'étoile ».
- 2026-11-19 (it. 2546, contrôle) : semaine simulée (guerrier, 168 h) après le Valet d'armes (it. 2518) : courses 40-42 à
  350 / 350 / 349 (palier de l'écho 350, repère it. 2332 : 350), 6 131-6 158 éclats. Fin de partie inchangée.
- 2026-11-19 (it. 2545, contrôle) : hero-table HEROES=all 12 h, graines 7,3,11, après le Valet d'armes (it. 2518) : moyenne 64,9,
  écart 4,0 (identique au repère de l'it. 2452 ; chaman 66,7 en haut).
- 2026-11-19 (it. 2544, doc + contrôle) : POUR-VICTOR : ligne du journal après une absence sac plein ; Statistiques > Carnet de
  route (dev-data : une étape, « Prochaine étape : zone 60 ») : propre. Toutes les sous-sections revues aujourd'hui.
- 2026-11-19 (it. 2543, contrôle) : Statistiques > Succès en français (34 / 72) : propre ; « grand graphe 0 / 222 » contre « 144 nœuds »
  des Compétences : deux ensembles distincts (fleur SKILL_NODE_COUNT, grand graphe SKILL_GRAPH_COUNT), voulu.
- 2026-11-19 (it. 2542, plaisir de revenir) : Journal : après une absence sac plein, une ligne « Sac plein, objets laissés au sol : N. »
  suit « Pendant 2 h : … » (texte déjà traduit, catégorie déjà classée) ; avant, seul le résumé d'absence, une fois fermé, le disait.
  Test (échoue avant), autotest 320/320.
- 2026-11-19 (it. 2541, REVUE GÉNÉRALE) : 12 h : gladiateur 65, chaman 69, arbalétrier 64 (habituels ; chaman en haut du tableau
  depuis l'it. 2452) ; --perf : 19,5 / 19,2 %, mini 5,5 %, icône 0,5 % ; Aventure en coréen et mode mini en espagnol (« 447 mil M ») :
  propres ; texte polonais : aucun mot français (« Le » = « Leśny », frontière de mot du motif). Rien à corriger.
- 2026-11-19 (it. 2540, contrôle) : i18n-names après les éditions 155-156 (clés 3407-3413) : 25 écarts, les mêmes anciens faux
  positifs ; aucun dans les nouveaux textes.
- 2026-11-19 (it. 2539, contenu) : « Quoi de neuf » édition 156 (moins de clics : déblocage acheté sur place, sort appris d'un clic,
  nom du butin perdu au survol ; it. 2523-2532) ; clés 3411-3413 dans les 9 langues (noms d'onglets tels que traduits). Autotest
  320/320, lang-overflow all 1280 : aucun défilement.
- 2026-11-19 (it. 2538, contrôle) : first-minutes après les changements du jour : premier objet 42-82 s, premier boss 70-82 s,
  zone 9-10 et niveau 16-17 (identiques aux relevés précédents).
- 2026-11-19 (it. 2537, contrôle) : mémoire, point P3 de l'it. 2536 fermé : 64c16330 (avant le 19/11 matin, git worktree, même
  dev-data) 561 → 579 Mo ; actuel 559 → 583 (it. 2536) puis 600 → 610 (mode haut de la mesure bimodale, plat). Aucun écart dû aux
  changements du matin, pas de fuite.
- 2026-11-19 (it. 2536, contrôle) : mem-watch 10 min (bande) : 559 → 570 → 577 → 580 → 581 → 583 Mo, montée qui s'aplatit (mise en
  route), pas de fuite visible ; 10 Mo au-dessus du repère 565-575 (bruit connu d'une exécution à l'autre). Voir Idées.
- 2026-11-19 (it. 2535, contrôle) : bande en français (dev-data, 1920) : rangée d'informations, barres de vie, nom du boss et
  astuce du sac plein (« l'Atelier l'agrandit de 6 places. Clique ici. ») propres ; rien à corriger.
- 2026-11-19 (it. 2534, contrôle) : TALENTS-UX.md : aucun point ouvert ; Bestiaire en français (dev-data, 83 / 84) : propre. Tous
  les onglets revus aujourd'hui (it. 2513-2534) ; « À faire » : les liens restants demandent un choix ou un déblocage (voulu).
- 2026-11-19 (it. 2533, doc + contrôle) : POUR-VICTOR : sort appris d'un clic depuis « À faire » ; --crawl en japonais : 548 clics,
  aucune erreur.
- 2026-11-19 (it. 2532, moins de clics) : « À faire maintenant » : « ✦ Sort à apprendre : X » (et du compagnon) apprend le sort d'un
  clic sur place (todoDirect / todoDo, todoNow donne sid) ; avant : « → » ouvrait Héros > Sorts, où il fallait le chercher. Vérifié
  dans le résumé d'absence (dev-data, 3 h) : Tourbillon appris, ligne « ✓ », résumé ouvert. Test (sid), autotest 320/320.
- 2026-11-19 (it. 2531, REVUE GÉNÉRALE) : 12 h : berserker 66, prêtresse 64, lancier 66 (habituels) ; --perf : 19,7 / 19,1 %,
  mini 5,4 %, icône 0,6 % ; Aventure en chinois (1920) et mode mini en anglais : propres. Rien à corriger.
- 2026-11-19 (it. 2530, contrôle) : Compétences en français (dev-data, 686 points libres, 0 / 144 nœuds) : propre ; noms des
  nœuds lisibles, « Dépenser automatiquement » mis en avant.
- 2026-11-19 (it. 2529, test + doc) : test de lockLink (lien vers la boutique sans or, achat direct goal-buy avec l'or, classe
  lock buy ; échoue avec l'ancien locks.js) ; POUR-VICTOR : bulle du butin perdu et achat direct des déblocages.
- 2026-11-19 (it. 2528, contrôle) : après l'achat direct des déblocages (it. 2527) : lang-overflow all 1920,1600,1366 (fin de
  partie et 130 % compris) : 50 mesures, aucun défilement ; --crawl en allemand : 539 clics, aucune erreur.
- 2026-11-19 (it. 2527, moins de clics) : liens « 🔒 déblocage · prix » (ui/locks.js : Carte, Familiers, Compétences, forge du
  sac) : disponible ET abordable → « Acheter : X (N or) », un clic l'achète sur place (goal-buy, comme « Prochain déblocage »).
  Avant : le lien ouvrait la boutique, puis il fallait y chercher la carte. Classe lock.buy (même taille que le lien, trait plein,
  --good) : sans « lock », le bouton prenait toute la largeur et la Carte défilait de 31 px (autotest et lang-overflow l'ont vu).
  Vérifié : un clic sur la Carte achète la Carte du voyageur ; autotest 320/320, lang-overflow all 1280 : aucun défilement.
- 2026-11-19 (it. 2526, contrôle) : Statistiques > Chiffres en français (dev-data) : propre ; le ⚠ du gobelin doré est la bulle
  « ils s'enfuient » (héros trop lent pour les attraper), voulue.
- 2026-11-19 (it. 2525, contrôle) : après les changements du butin (it. 2514-2524) : save-fuzz FUZZ_BASE=fin ok (1 225 corruptions),
  stall-check 60 parties 0 figées, fuzz 1 200 parties 0 bloquées.
- 2026-11-19 (it. 2524, correction) : bulle du meilleur objet perdu (it. 2523) seulement si sa rareté est celle affichée
  (sum.bestLostR === sum.best) : un objet gardé puis vendu ou transmuté pendant l'absence laissait « Légendaire · pas gardé » avec
  le nom d'un objet moins rare. Revérifié (dev-data, 3 h) : « Épique · pas gardé » → « Couronne d'étoile du serment brisé ».
- 2026-11-19 (it. 2523, plaisir de revenir) : résumé d'absence, « Meilleur butin : Rare · pas gardé » : le NOM de l'objet perdu en
  bulle (sum.bestLostName, applyOffline ; tabindex : bulle au clavier). Avant : seule la rareté, on ne savait pas ce qu'on avait
  manqué. Vérifié dans dev-data (3 h) : « Souliers de tissu céleste du loup gris ». Test, autotest 320/320.
- 2026-11-19 (it. 2522, doc) : POUR-VICTOR : section « Matin du 19/11 (it. 2514-2520) : sac plein, à juger » (sa règle gardée,
  ce qui change autour, la question des objets forgés consommés par les automatismes).
- 2026-11-19 (it. 2521, REVUE GÉNÉRALE) : 12 h : druide 64, assassin 62, moine 62 (habituels) ; --perf : 20,0 / 19,5 %, mini 5,6 %,
  icône 0,5 % ; Boutique en anglais à 1366 px (coffres achetables sac plein) : propre ; texte russe : aucun mot latin suspect, bulle
  des coffres (it. 2515) traduite. Rien à corriger.
- 2026-11-19 (it. 2520, contenu) : « Quoi de neuf » édition 155 (sac plein : remède en tête des choses à faire, coffre acheté sac
  plein, pièces précieuses jamais vendues ni perdues d'office ; it. 2514-2518) ; clés 3408-3410 dans les 9 langues (« Agrandir le sac »
  sans guillemets : le libellé du jeu est plus long). Autotest 320/320, lang-overflow all 1280 : 20 mesures, aucun défilement.
- 2026-11-19 (it. 2519, contrôle) : autres pertes automatiques examinées (suite des it. 2517-2518) : Creuset (autoTransmute) et
  vente des inutiles (sellUseless) consomment les objets FORGÉS devenus inutiles (uselessItems ne garde que légendaires et pièces de
  panoplie à compléter). Gardé tel quel : objets du Marchand déjà forgés (it. 988), les exclure boucherait le sac (« le sac ne doit
  jamais se bloquer ») ; automatismes achetés = choix du joueur. Les coffres et le Valet (it. 2517-2518) restent plus prudents
  (aucune vente d'objet forgé que le joueur n'a pas demandée).
- 2026-11-19 (it. 2518, ne jamais trahir) : Valet d'armes, sac plein : l'ancienne pièce était retirée du sac et PERDUE, même
  légendaire, de panoplie ou forgée. Maintenant : pièce précieuse → un objet inutile ordinaire est vendu (chestRoom) pour la garder
  dans le sac ; sans place possible, le nouvel objet reste au sol (règle du sac plein). Pièce ordinaire : comme avant. Test (échoue
  avant), autotest 320/320, balance 12 h : identique (64,7).
- 2026-11-19 (it. 2517, ne jamais trahir) : coffre de quête, sac plein : la place se fait par chestRoom (it. 2515) au lieu du
  moins cher de uselessItems, qui pouvait vendre d'office un objet FORGÉ (plus > 0) ou une pièce de panoplie en surplus ; sans
  objet ordinaire à vendre, l'objet du coffre est vendu (repli existant). Test (échoue avant), autotest 320/320.
- 2026-11-19 (it. 2516, contrôle) : Familiers, Héros, Ascension en français (dev-data) : propres. 2 765 éclats non placés : la Carte
  du ciel (déblocage) les place seule, clics manuels avant l'achat (règle des commodités) ; rien à changer.
- 2026-11-19 (it. 2515, moins de clics) : coffres de la Boutique, sac plein : l'achat vend d'abord l'objet inutile le moins cher
  (game.chestRoom, comme le coffre d'une quête ; jamais un légendaire, une pièce de panoplie ou un objet forgé) ; bulle « Sac plein :
  X (inutile) sera vendu pour faire de la place. » (clé 3407, 9 langues, « objet » explicite en ru, pl, de, pt, es pour l'accord).
  Le bouton « Sac plein » (ouvre le sac) ne reste que s'il n'y a rien à vendre. Avant : 4 coffres grisés avec 24 objets inutiles
  dans le sac (dev-data). Test (ordinaires / légendaires / or insuffisant) ; contrôle de l'autotest « Sac plein » rempli de
  légendaires ; autotest 320/320, save-fuzz ok.
- 2026-11-19 (it. 2514, plaisir de revenir) : « À faire maintenant » : sac plein → « Agrandir le sac » puis « Sac plein : N objets à
  vendre » en TÊTE de liste (game.todoNow). Résumé d'absence de dev-data (3 h) : « Meilleur butin : Légendaire · pas gardé », 14 objets
  laissés au sol, et le remède venait en 8e et dernière ligne. La perte au sol reste voulue (Victor : « tant pis ») ; seul l'ordre
  change (aussi bulle du ☰ et mode mini, même liste). Test (échoue sans le changement), autotest 320/320, capture vérifiée.
- 2026-11-19 (it. 2513, contrôle) : Aventure en français : « Expérience 6,80 Md / 1,54e105 » vient du niveau 1 313 de dev-data
  (commandes DEV) ; xpNeed reste en suffixes jusqu'au niveau ≈ 400 (7,84e32), fin de partie à 48 h : niveau 183 (5,15 Qa). Rien à corriger.
- 2026-11-19 (it. 2512, contrôle) : mode mini en français et en coréen (complément de la revue 2511) : niveau, or, zone et série
  lisibles, boutons alignés ; rien à corriger.
- 2026-11-19 (it. 2511, REVUE GÉNÉRALE) : 12 h : mage 66, nécromancien 62, samouraï 65 (habituels) ; --perf : 19,6 / 19,9 %, mini
  5,4 %, icône 0,7 % ; « Quoi de neuf » en japonais (éditions 153-154, --stage panel.showNews) : propre ; texte russe : aucun mot latin
  suspect (« --- attributs » = repère de l'extraction, « Poupouce » = nom d'un familier). Rien à corriger.
- 2026-11-19 (it. 2510, contrôle) : durée de l'autotest examinée (SELFTEST_TIMES, voir Idées) : rien à raccourcir sans toucher au
  code distribué ; 320/320 trois fois de suite.
- 2026-11-19 (it. 2509, contrôle) : i18n-names après l'édition 154 (clés 3403-3406) : 25 écarts, les mêmes anciens faux positifs ;
  aucun dans les nouveaux textes.
- 2026-11-19 (it. 2508, contrôle) : après l'édition 154, lang-overflow all 1280 (« Quoi de neuf » au pire cas compris) : 20 mesures,
  aucun défilement ni mot coupé.
- 2026-11-19 (it. 2507, contenu) : « Quoi de neuf » édition 154 (confort et accessibilité : bulles des boutons grisés, puces au
  clavier, orange du thème clair, « réduire les animations ») ; clés 3403-3406 traduites dans les 9 langues ; « ton système » plutôt
  que « Windows » (version Mac). Autotest 320/320.
- 2026-11-19 (it. 2506, accessibilité) : fermeture des fenêtres : le focus revient à l'élément d'avant (closeModal, closeConfirm,
  it. 2170) ; parcours clavier complet (ouverture, Tab bouclé, retour).
- 2026-11-19 (it. 2505, doc) : CLAUDE.md : règles d'accessibilité vérifiées par l'autotest et le test de contraste.
- 2026-11-19 (it. 2504, contrôle) : autotest relancé deux fois de suite (stabilité des contrôles de la nuit) : 320/320 les deux fois.
- 2026-11-19 (it. 2503, accessibilité) : fenêtres (#modal, #confirm) : focus posé à l'ouverture (panel.js 1264, 1288) et Tab qui boucle
  dans la fenêtre (it. 2168) : rien à ajouter ; la phrase « tout se fait au clavier » du README tient.
- 2026-11-19 (it. 2502, doc) : README : paragraphe « Accessibilité » (clavier, daltonisme, contraste, lecteurs d'écran, mouvements).
- 2026-11-19 (it. 2501, REVUE GÉNÉRALE) : 12 h : guerrier 65, ranger 64, paladin 65 ; --perf : 19,4 / 19,5 %, mini 5,5 %, icône 0,4 % ;
  Réglages en russe : propres (« Windows » visible sous xvfb : isLinux() faux exprès en dev, window.__game ; masqué en version
  distribuée) ; --crawl en anglais : 513 clics, aucune erreur. Rien à corriger.
- 2026-11-19 (it. 2500, doc) : POUR-VICTOR : accessibilité de la nuit complétée (it. 2474-2499).
- 2026-11-19 (it. 2499, accessibilité) : barres de progression (.bar) sans role="progressbar", mais toujours accompagnées de leur
  valeur en texte (kv « 70 / 70 », expérience, avant le boss) : l'information est lue ; rien de nécessaire.
- 2026-11-19 (it. 2498, accessibilité) : onglets et sous-sections : role="tablist" / "tab", aria-selected tenu à jour (panel.js 420,
  subtabs.js) ; rien à ajouter.
- 2026-11-19 (it. 2497, accessibilité) : fenêtre de confirmation : aria-describedby="cbody" (le texte qui dit ce qui sera perdu est
  lu avec le titre) ; #modal et #confirm déjà en dialog / alertdialog modaux. 320/320.
- 2026-11-19 (it. 2496, accessibilité) : bulle de la bande (#toast) et « Prochaine découverte » ont role="status" (annoncés poliment
  par les lecteurs d'écran) : rien à ajouter.
- 2026-11-19 (it. 2495, autotest) : langue de la fenêtre de la libération lue par le processus principal (finaleWin exporté) : « en »
  comme la bande (finale.html part en « fr ») : l'it. 2494 est vérifiée. 320/320.
- 2026-11-19 (it. 2494, accessibilité) : fenêtre de la libération : finale.html déclarait lang="fr" en dur ; la langue de la bande
  lui est transmise (data.lang) et appliquée. Lecture directe de la langue de cette fenêtre non faite. 319/319.
- 2026-11-19 (it. 2493, accessibilité) : <html lang> suit la langue choisie (ja, ru, en vérifiés) : prononciation juste des lecteurs d'écran.
- 2026-11-19 (it. 2492, accessibilité) : boutons du mode mini sans nom : aucun.
- 2026-11-19 (it. 2491, REVUE GÉNÉRALE) : 12 h : moine 62, barde 65, assassin 62 ; --perf : 19,7 / 19,3 %, mini 5,5 %, icône 0,4 % ;
  mode mini en anglais et chinois : propre. Rien à corriger.
- 2026-11-19 (it. 2490, décision) : cinématiques de la bande (aube, arrivée, chroniques) : réglage « Cinématiques de l'histoire »
  respecté ; laissées avec « réduire les animations » (dans la bande, texte et petits effets ; seul le vol plein écran en est retiré).
- 2026-11-19 (it. 2489, doc) : FINALE.md et POUR-VICTOR : libération et « réduire les animations ».
- 2026-11-19 (it. 2488, dev) : option --reduced-motion (force-prefers-reduced-motion, dev seulement) ; vérifié : sans elle, la victoire
  sur le Briseur ouvre la libération ; avec elle, matchMedia vrai et pas de libération (it. 2487 confirmée). CLAUDE.md à jour. 319/319.
- 2026-11-19 (it. 2487, accessibilité) : « réduire les animations » du système (prefers-reduced-motion) : la libération ne vole plus
  automatiquement sur tout l'écran (le ▶ de « Le ciel rallumé » la rejoue sur demande) ; le reste suivait déjà (it. styles.css 195,
  fullEffects coupé). Non vérifié en vrai (le réglage n'est pas forçable dans le lancement de test). 319/319.
- 2026-11-19 (it. 2486, contrôle) : daltonisme : rareté lisible sans couleur (RARITY_PIP • •• ••• ★, panel.js) et repère des lignes
  importantes du journal (it. 1725) déjà en place ; rien à ajouter.
- 2026-11-19 (it. 2485, doc) : POUR-VICTOR : orange des légendaires en thème clair et test de contraste.
- 2026-11-19 (it. 2484, test) : contraste des jetons (ink, muted, good, bad, accent, raretés) ≥ 3:1 sur --panel ET --bg, dans les deux
  thèmes (test-logic). Vérifié qu'il attrape l'ancien orange (#c97a00 : 2,65:1 sur --bg) ; sur --panel seul il passait (3,16:1).
  370 tests.
- 2026-11-19 (it. 2483, accessibilité) : contraste des jetons de couleur sur --panel : thème clair ink 14,5, muted 6,2, good 4,1, bad 5,1,
  accent 4,7, raretés 3,7-5,1 (r4 4,4 depuis l'it. 2482) ; thème sombre 6,6-13,5. Tous au-dessus de 3:1.
- 2026-11-19 (it. 2482, accessibilité) : sonde de contraste des textes (WCAG, < 3:1) dans les deux thèmes : faux positifs sur les fonds
  en dégradé (Talents, étoiles des quêtes, vérifiés en capture) ; un vrai : légendaire en thème clair (--r4 #c97a00, 2,9:1 sur une carte #f3ecdf, 3,2:1 sur
  le panneau #fcf8f0, 2,65:1 sur --bg) foncé en #a96500 (3,65 à 4,4:1), capture de la Boutique : lisible. 319/319.
- 2026-11-19 (it. 2481, REVUE GÉNÉRALE) : 12 h : arbalétrier 64, artificier 65, cryomancienne 65 ; --perf : 19,4 / 19,1 %, mini 5,5 %,
  icône 0,4 % ; Quêtes en allemand à 1920 px : propres. Rien à corriger.
- 2026-11-19 (it. 2480, autotest) : contrôle « aucun identifiant HTML en double » (après le parcours des onglets). 319/319.
- 2026-11-19 (it. 2479, contrôle) : identifiants HTML en double après construction de tous les onglets (fin de partie) : aucun.
- 2026-11-19 (it. 2478, doc) : CLAUDE.md : autotest ≈ 143 s pour 318 vérifications (mesuré).
- 2026-11-19 (it. 2477, autotest) : contrôle « tout élément cliquable est atteignable au clavier » (tous les onglets). 318/318.
- 2026-11-19 (it. 2476, accessibilité) : éléments cliquables ([data-action], [data-tab]) hors boutons et sans tabindex, tous les onglets et
  sous-sections, fin de partie : aucun (SVG exclus : nœuds des Compétences et zones de la Carte ont leur clavier propre).
- 2026-11-19 (it. 2475, contrôle) : texte coupé sans bulle, fin de partie à 1280 px, russe et japonais, toutes sous-sections : aucun.
- 2026-11-19 (it. 2474) : audit « texte coupé par … sans bulle » (tous les onglets et sous-sections, en et de, 1366 px) : aucun ;
  devient un contrôle de l'autotest. 317/317.
- 2026-11-19 (it. 2473, contrôle) : save-fuzz (dev) : ok.
- 2026-11-19 (it. 2472, contrôle) : stall-check : 60 parties, 0 figée.
- 2026-11-19 (it. 2471, REVUE GÉNÉRALE) : 12 h : gladiateur 65, lancier 66, nécromancien 62 ; --perf : 19,4 / 19,7 %, mini 5,6 %, icône 0,6 % ;
  Carte en polonais (fin de partie, 1920 px) : propre. Rien à corriger.
- 2026-11-19 (it. 2470, contrôle) : info-probe en allemand à 1280 px : IPROBE 0.
- 2026-11-19 (it. 2469, contrôle) : fuzz 1200 parties : 0 bloquée.
- 2026-11-19 (it. 2468, contrôle) : --crawl d'une partie neuve en japonais : aucune erreur.
- 2026-11-19 (it. 2467, performance) : panneau ouvert par onglet (perf.mjs --tab) : Carte 20,5 %, Bestiaire 18,7 %, Compétences 19,7 %,
  Aventure 19,1 % : écarts d'un point au plus, aucun onglet coûteux.
- 2026-11-19 (it. 2466, doc) : CLAUDE.md : mesurer --perf sur un onglet précis (perf.mjs --tab=…).
- 2026-11-19 (it. 2465, vérification) : mesuré cette fois (l'it. 2464 l'avait déduit du code) : pendant perf.mjs --tab=skills, la
  mise en scène relève window.__panel.tab = skills et le panneau ouvert à 5, 15, 25, 35 et 45 s : la mesure de l'it. 2463 vaut.
- 2026-11-19 (it. 2464, vérification) : --tab est appliqué au lancement (main.js, commande « tab:… » à 300 ms) avant les phases de
  --perf : la mesure de l'it. 2463 portait bien sur l'onglet demandé (le panneau rouvert garde son dernier onglet).
- 2026-11-19 (it. 2463, performance) : panneau ouvert sur Compétences (graphe plein de la copie de dev) 19,7 % contre Aventure 19,1 %
  (perf.mjs --tab=…) : +0,5 point, dans le bruit ; rien à optimiser.
- 2026-11-19 (it. 2462, contrôle) : « Language / Langue » (Réglages, settings.js:48) écrit en dur exprès : retrouvable quelle que soit
  la langue choisie. Conforme.
- 2026-11-19 (it. 2461, REVUE GÉNÉRALE) : 12 h : druide 64, prêtresse 64, gardien 65 ; --perf : 20,1 / 19,1 %, mini 5,4 %, icône 0,6 % ;
  Bestiaire en espagnol (fin de partie) : propre ; texte chinois : noms propres, touches, « Langue / Language » du sélecteur. Rien à corriger.
- 2026-11-19 (it. 2460, contrôle) : mem-watch 10 min panneau ouvert : 573-606 Mo réels, plat (repère it. 2258 : 580-610).
- 2026-11-19 (it. 2459, contrôle) : ampoule du mode mini : sa bulle donne le texte de l'astuce (« Un conseil t'attend… » + texte) ; conforme.
- 2026-11-19 (it. 2458, contrôle) : early-pace : à 60 min, niveau 39-41, zone 23-25, 6,3 déblocages : identique à l'it. 2354.
- 2026-11-19 (it. 2457, contrôle) : « 618 » encore cité : README (« 618 avant ») et devlog 0.1.3 (historique) seulement ; pages de
  magasin à 222 (vérifiées par npm test).
- 2026-11-19 (it. 2456, contrôle) : --crawl en français sur la fin de partie après les bulles et puces focalisables : aucune erreur.
- 2026-11-19 (it. 2455, autotest) : vraie touche Tab (sendInputEvent) sur les puces du héros : le focus passe à la puce suivante
  (contrôlé) ; :focus-visible reste faux dans la fenêtre fantôme sans focus système (contour et bulle non vérifiables ici). 316/316.
- 2026-11-19 (it. 2454, doc) : CLAUDE.md : repère hero-table de l'it. 2452 (64,9, écart 4,0).
- 2026-11-19 (it. 2453, équilibrage) : nécromancien (le plus bas du tableau, 62,7) sur 7 graines (7,3,11,21,31,41,51) : 62, 61, 64,
  66, 62, 64, 64 → 63,3, soit −1,6 zone : dans le bruit, pas de retouche.
- 2026-11-19 (it. 2452, équilibrage) : hero-table 20 héros, 12 h, graines 7/3/11 : moyenne 64,9, écart 4,0 (nécromancien 62,7 →
  chaman 66,7) : identique à l'it. 2332.
- 2026-11-19 (it. 2451, REVUE GÉNÉRALE) : 12 h : berserker 66, samouraï 65, chaman 69 ; --perf : 19,7 / 19,3 %, mini 5,4 %, icône 0,7 % ;
  Talents en anglais et coréen à 1920 px : propres. Rien à corriger.
- 2026-11-19 (it. 2450, doc) : POUR-VICTOR : accessibilité de la nuit (it. 2435-2448) et le contour de focus à vérifier chez lui.
- 2026-11-19 (it. 2449, contrôle) : save-fuzz fin et 0.1.2 après la migration de l'it. 2405 : ok (1225, 1169 corruptions).
- 2026-11-19 (it. 2448, contrôle) : contour de focus des puces non capturable ici (focus({focusVisible}) non pris en charge par cet
  Electron : :focus-visible faux) ; à voir chez Victor au clavier si besoin. À 1920 px, « Plumage du phénix 2/4 » s'affiche en entier.
- 2026-11-19 (it. 2447, contrôle) : contour de focus des puces du héros : règle générale [tabindex]:focus-visible (3 px, --accent) ;
  rien à ajouter (le contour peut être rogné de 2 px par la rangée .hscroll, sans gêner la lecture).
- 2026-11-19 (it. 2446, accessibilité) : puces de la carte du héros (bénédiction du jour, panoplies, reliques, effets) atteignables
  au clavier (tabindex 0) : leur bulle s'affiche au focus (même mécanisme que les ⓘ, it. 2149) ; focus gardé 4 s malgré la mise à
  jour du panneau ; contrôle de l'autotest. 315/315.
- 2026-11-19 (it. 2445, contrôle) : fin de partie à 1920 px avec l'interface à 130 % (fr, de, ru) : aucun défilement.
- 2026-11-19 (it. 2444, contrôle) : lang-overflow 10 langues à 1600 px (dev et fin de partie) : aucun défilement ni mot coupé.
- 2026-11-19 (it. 2443, contrôle) : rangée des puces du héros à 1366 px : fondu de bord droit visible (.hscroll.more-r) : la suite
  est signalée ; conforme.
- 2026-11-19 (it. 2442) : puce de panoplie « coupée » (revue 2441) : la rangée des puces du héros est une rangée latérale (.hscroll,
  data-hs="hero-chips" : molette, glisser) ; la fin est atteignable, conception voulue (CLAUDE.md, remède aux listes qui grandissent). Rien à changer.
- 2026-11-19 (it. 2441, REVUE GÉNÉRALE) : 12 h : assassin 62, moine 62, paladin 65 ; --perf : 19,1 / 18,9 %, mini 5,4 %, icône 0,4 % ;
  Aventure en français et chinois à 1366 px : en français, la puce de panoplie de la carte du héros (« ◆ Plumage du phénix 2/4 »)
  est coupée par le bord de la carte, sans « 2/4 » ni points de suspension : à corriger (it. suivante).
- 2026-11-19 (it. 2440, vérification) : échappement du contrôle « boutons nommés » : « \\s » du gabarit de selftest.js devient « \s »
  dans le code injecté (/[\s▲▼…]/) : le contrôle retire bien les espaces, il détecte un bouton sans nom.
- 2026-11-19 (it. 2439, autotest) : contrôle « chaque bouton visible du panneau a un nom » dans tous les onglets. 314/314.
- 2026-11-19 (it. 2438, accessibilité) : boutons sans nom (texte, aria-label ou bulle) dans tous les onglets et en-tête, fin de partie :
  aucun (seul « confirm-ok » de la fenêtre de confirmation cachée, rempli à l'ouverture).
- 2026-11-19 (it. 2437, accessibilité) : champs (cases, curseurs, listes) sans nom accessible, tous les onglets, fin de partie : aucun.
- 2026-11-19 (it. 2436, autotest) : contrôle « aucune image sans texte de remplacement » (toute la page, après le parcours des
  onglets). 313/313.
- 2026-11-19 (it. 2435, accessibilité) : images sans alt (tous les onglets, fin de partie) : aucune dans le panneau ; deux icônes de
  sort du mode mini (.minispell) : alt="" (décor). 312/312.
- 2026-11-19 (it. 2434, contrôle) : lang-overflow 10 langues à 1920 et 1280 px (avec l'état maximal) après l'édition 153 et les bulles :
  aucun défilement ni mot coupé.
- 2026-11-19 (it. 2433, contrôle) : Familiers : « Compagnon actuel » grisé hérite de la bulle de sa carte (phrase d'ambiance) ; son
  libellé dit déjà pourquoi (comme « Maximum ») : laissé tel quel.
- 2026-11-19 (it. 2432, contrôle) : --crawl d'une partie neuve en russe : aucune erreur.
- 2026-11-19 (it. 2431, REVUE GÉNÉRALE) : 12 h : ranger 64, mage 66, barde 65 ; --perf : 19,4 / 19,5 %, mini 5,4 %, icône 0,7 % ;
  Familiers en anglais : propres ; texte russe : seuls noms propres, touches et noms de langues. Rien à corriger.
- 2026-11-19 (it. 2430, contrôle) : bulle de la Boutique en coréen (clé 3399, « {0}은(는) ») : koJosa garde « 는 » après voyelle
  (« 별철 투구는 ») et « 은 » après consonne (« 별철 갑옷은 »).
- 2026-11-19 (it. 2429, doc) : POUR-VICTOR : boutons grisés expliqués (it. 2422-2427).
- 2026-11-19 (it. 2428, autotest) : durée mesurée 140 s (312 vérifications) ; attente « scène non ouverte » des trois contrôles de la
  libération 1,5 → 0,8 s (6,3 → 5,6 s chacun) : 139 s ; CLAUDE.md à jour.
- 2026-11-19 (it. 2427) : boutons grisés sans bulle, chaque sous-section aussi (Bestiaire, Boutique, Statistiques, Familiers, Héros) :
  partie neuve, dev et fin de partie : 0 ; le contrôle de l'autotest parcourt maintenant les sous-sections. 312/312.
- 2026-11-19 (it. 2426) : contrôle permanent de l'autotest : aucun bouton grisé sans bulle dans tous les onglets (« Maximum »
  excepté). Il a trouvé Réglages > Son « Écouter » grisé quand les effets sonores sont coupés : bulle « Effets sonores coupés :
  coche « Effets sonores » pour écouter. » (clé 3402, 10 langues, libellé cité tel que traduit). 312/312.
- 2026-11-19 (it. 2425) : audit des boutons grisés sans bulle (tous les onglets, dev et fin de partie, sonde --stage) : seuls
  « Tout réinitialiser » des Compétences (rien de pris) et « Maximum » de l'Atelier (parlant). Le premier a sa bulle (« Rien à
  réinitialiser : aucune compétence prise. », clé 3401, 10 langues) ; nouvelle sonde : 0. 311/311.
- 2026-11-19 (it. 2424, autotest) : un bouton grisé garde sa bulle au survol réel (sendInputEvent) : « Équiper le meilleur » sac vidé
  le temps du contrôle (la copie de test a une amélioration : sans cela le contrôle ne vérifiait rien). 311/311.
- 2026-11-19 (it. 2423) : Aventure : « Équiper le meilleur » grisé a maintenant sa bulle (« Rien de mieux dans le sac : ton équipement
  est déjà le meilleur. », clé 3400, 10 langues). 310/310.
- 2026-11-19 (it. 2422) : Boutique : amélioration du marchand bloquée par le sac plein parce que la pièce équipée est précieuse
  (canBuyWhenFull : légendaire, panoplie ou forgée, jamais vendue d'office) : la bulle de « Sac plein » le dit et nomme la pièce
  (clé 3399, 10 langues ; vérifié en japonais sur dev-data : « 最初の英雄の星鉄のグレートヘルム »). 310/310.
- 2026-11-19 (it. 2421, REVUE GÉNÉRALE) : 12 h : gladiateur 65, danseuse de lames 62, guerrier 65 ; --perf : 19,9 / 19,4 %, mini 5,4 %,
  icône 0,5 % ; Boutique et mode mini en japonais : propres. Rien à corriger.
- 2026-11-19 (it. 2420, contrôle) : mem-watch 10 min (bande) après les changements de la nuit : 569-573 Mo réels de 420 à 570 s,
  plat (mode bas de la mesure bimodale).
- 2026-11-19 (it. 2419, contrôle) : --crawl en coréen sur la fin de partie à graphe plein : aucune erreur.
- 2026-11-19 (it. 2418, contrôle) : édition 153 en allemand à 1920 px (panel.showNews(152)) : trois nouveautés sur deux colonnes,
  lisibles, « Weiter ».
- 2026-11-19 (it. 2417) : « Quoi de neuf » édition 153 (retouches de la nuit) : noms des Compétences lisibles, la surprise finale
  attend ton retour (plein écran, jeu réduit, session verrouillée), astuce du chemin le plus court ; clés 3396-3398 dans les 10
  langues (« surprise » gardé, comme les notes de la 0.1.7). lang-overflow ru, de à 1280 et 1920 : aucun défilement. 310/310.
- 2026-11-19 (it. 2416, doc) : POUR-VICTOR : la libération attend aussi le déverrouillage de la session (it. 2415).
- 2026-11-19 (it. 2415, bon voisin) : libération : une seule règle, finaleGate (main.js) : jouée seulement si strip.renderVisible()
  (ni plein écran, ni icône, ni session verrouillée : StripWindow.onLocked ajouté) ; sinon attente puis jouée 1,5 s après le retour.
  Contrôle de la session verrouillée. 310/310.
- 2026-11-19 (it. 2414, contrôle) : libération et absence : applyOffline farme la zone en cours sans boss (monsterBase(S.zone, false)) :
  le Briseur ne tombe jamais hors ligne, la scène ne peut pas surgir au lancement sous le résumé d'absence.
- 2026-11-19 (it. 2413, doc) : FINALE.md et POUR-VICTOR : retouches « bon voisin » de la libération (it. 2408-2412).
- 2026-11-19 (it. 2412, bon voisin) : jeu réduit à son icône (bande cachée par le joueur) : la cinématique de libération attend que la
  bande revienne (StripWindow.onModeChange ; si on réduit pendant la scène, elle se ferme et sera rejouée). Contrôle de l'autotest en
  fin de parcours. 309/309.
- 2026-11-19 (it. 2411, REVUE GÉNÉRALE) : 12 h : arbalétrier 64, lancier 66, cryomancienne 65 ; --perf : 20,0 / 19,1 %, mini 5,5 %,
  icône 0,6 % ; Statistiques en chinois à 1920 px (fin de partie) : propre. Rien à corriger.
- 2026-11-19 (it. 2410, bon voisin) : cinématique de libération jamais par-dessus une application en plein écran : main.js la met en
  attente (strip.fsHidden) et la joue 1,5 s après la fin du plein écran ; si le plein écran commence pendant la scène, elle se ferme et
  sera rejouée en entier (StripWindow.onFullscreen). Contrôle de l'autotest en fin de parcours (cacher la bande change l'état des
  contrôles suivants : 3 échecs quand il était au milieu). 308/308.
- 2026-11-19 (it. 2409, bon voisin) : cinématique de libération à 15 images/s aussi sur batterie (music.onBattery) ; capture --battery
  à 8 s : scène dessinée.
- 2026-11-19 (it. 2408, bon voisin) : cinématique de libération : suit « Économie d'énergie » (15 images/s au lieu de 30 ; data.eco
  envoyé par app.js, pas de temps plafonné à 0,1 s au lieu de 0,06 pour garder la même vitesse). Capture en économie d'énergie à 8 s :
  scène normale (« Free! »). 307/307.
- 2026-11-19 (it. 2407, contrôle) : balance.mjs 12 v0.1.7 : 64,7 / 64,7, identique classe par classe ; succès du grand graphe
  calculés sur GRAPH_MAX_TAKE (222) : rien d'ancien à corriger.
- 2026-11-19 (it. 2406, doc) : POUR-VICTOR : l'annonce du grand graphe complet reviendra sur sa partie (it. 2405).
- 2026-11-19 (it. 2405) : ancienne sauvegarde au grand graphe rempli avant l'allègement (it. 2332) : graphFullSeen restait vrai alors
  que le nettoyage retire des nœuds : l'annonce « grand graphe complet » ne serait jamais revenue en le remplissant de nouveau.
  migrate() la rend si le graphe n'est plus complet ; test (incomplet : rendue ; fin de partie pleine : gardée). save-fuzz ok. 307/307.
- 2026-11-19 (it. 2404, contrôle) : texte japonais de la fin de partie (--dump-text) : seuls des unités (HP, Qa, pt, Lv), noms
  propres et touches en lettres latines. Graphe complet : déjà annoncé (graphFull, it. 1117).
- 2026-11-19 (it. 2403, contrôle) : lang-overflow 10 langues à 1366 px (dev et fin de partie) : aucun défilement ni mot coupé.
- 2026-11-19 (it. 2402, contrôle) : aucun Electron orphelin après la revue ; --crawl d'une partie neuve en polonais : 73 clics, aucune erreur.
- 2026-11-19 (it. 2401, REVUE GÉNÉRALE) : 12 h : druide 64, chaman 69, artificier 65 ; --perf : 20,5 / 19,9 %, mini 5,4 %, icône 0,8 %
  (deux Electron de test encore ouverts avant la mesure : chiffres dans les repères) ; Aventure en anglais et coréen à 1920 px : propre.
  Rien à corriger.
- 2026-11-19 (it. 2400, contrôle) : avec la fin de partie à graphe plein : stall-check STALL_DAYMOD=all 60 parties, 0 figée ;
  fuzz FUZZ_DAYMOD=all 1200 parties, 0 bloquée.
- 2026-11-19 (it. 2399, contrôle) : mode mini de la fin de partie en allemand et russe : niveau, or (6,57 Qi), zone sur une ligne,
  duo et monstre suivant à leur place.
- 2026-11-19 (it. 2398, contrôle) : first-minutes (1er objet 42-82 s, boss 70-82 s) et tab-pace (talents 1 min, boutique 7-11 min,
  ascension 20-41 min) : début inchangé. Clavier des Compétences vu : flèches entre nœuds prenables, Entrée prend (chemin pas à pas).
- 2026-11-19 (it. 2397, contrôle) : résumé d'absence de 8 h sur la fin de partie (graphe plein) à 1920 px : complet, cinq actions
  directes à droite, aucun débordement ; « À faire » signale déjà les points du grand graphe (game.js, it. 1105). Rien à changer.
- 2026-11-19 (it. 2396, doc) : POUR-VICTOR : section « Nuit du 18 au 19/11 » (retouches visibles des it. 2369-2395).
- 2026-11-19 (it. 2395, contrôle) : info-probe en russe à 1280 px : IPROBE 0.
- 2026-11-19 (it. 2394, doc) : CLAUDE.md : autotest ≈ 119 s pour 307 vérifications (mesuré).
- 2026-11-19 (it. 2393, contrôle) : partie neuve en russe à 1280 px : emplacements vides (.lab 9 px) lisibles ; « Poupouce ×10. »
  = bénédiction du jour (nom propre, voulu).
- 2026-11-19 (it. 2392, contrôle) : textes SVG de 8-10 px ailleurs (Carte : numéros, boss majeurs, au-delà) en russe à 1280 px :
  « Сокрушитель Звёзд » lisible, chiffres nets ; rien à agrandir.
- 2026-11-19 (it. 2391, REVUE GÉNÉRALE) : 12 h : gardien (starwarden) 65, paladin 65, nécromancien (necro) 62 ; --perf : 19,9 / 19,7 %,
  mini 5,5 %, icône 0,6 % ; Héros en japonais à 1280 px (fin de partie) : propre. Rien à corriger.
- 2026-11-19 (it. 2390) : Compétences : noms des nœuds (.lbl) 10 → 11 px. À 1280 px le graphe est à l'échelle 0,871 : 10 px rendus
  ≈ 8,7 px, « Жажда », « Тяжесть мира » (11 noms russes avec ж) en taches ; 11 px lisibles, 12 px nets (grands nœuds, déjà à 12).
  Sonde des chevauchements de, ru, pl à 1920 et 1280 : 120 noms, 0. 307/307.
- 2026-11-19 (it. 2389) : Compétences : sous-titre des pétales (« Сердце зажжено », .corepct) en 10 px réduits par le zoom du graphe :
  « жж » effacé en russe à 1280 px (deux thèmes ; essai de la police seule : flou sous 11 px). Passé à 12 px (11 px : encore flou) :
  net, sans toucher le nom du pétale au-dessus. 307/307.
- 2026-11-19 (it. 2388, contrôle) : noms des Compétences au-dessus des nœuds en thème clair (russe, 1280 px) : lisibles, contour
  clair, « Охотник за сокровищами » entier.
- 2026-11-19 (it. 2387) : noms des Compétences : sonde des chevauchements entre noms (fin de partie, graphe plein, 1920 px) :
  de, ru, pl : 120 noms, 0 chevauchement ; contrôle ajouté à l'autotest (noms dans .sklbls, aucun recouvrement). 307/307.
- 2026-11-19 (it. 2386) : Compétences : les noms des grands nœuds passaient sous un nœud dessiné après eux (« Охотник за сокровищами »
  amputé de « Ох » en russe, fin de partie à 1280 px) : noms regroupés au-dessus de tous les nœuds (deux groupes .sklbls, celui du grand
  graphe suit .open comme avant). Capture : nom entier ; crawl 699 clics sans erreur. 306/306.
- 2026-11-19 (it. 2385, contrôle) : Compétences de la fin de partie (grand graphe plein) en russe à 1280 px : graphe lisible, ligne
  « Большой граф завершён · 140 лишних очков: +14 % … » juste.
- 2026-11-19 (it. 2384) : sauvegarde de fin de partie (scripts/fixtures/endgame-save.json) : son grand graphe était vide depuis
  l'allègement (0/222 nœuds après sanitizeOuter) : lang-overflow, save-fuzz et stall-check « fin » mesuraient un état qu'aucun joueur
  avancé n'a. Graphe rempli par autoSpendGraph (222 nœuds), le reste inchangé (zone 150, utilisé aussi par les plans promo) ; test
  « sources de puissance » adapté (graphe présent, puis vidé). stall-check 0 figée, save-fuzz fin ok, lang-overflow 10 langues fin
  1280 : aucun défilement. 369 tests, 306/306.
- 2026-11-19 (it. 2383, contrôle) : save-fuzz dev / fin / 0.1.2 : ok (1267, 1225, 1169 corruptions).
- 2026-11-18 (it. 2382, contrôle) : « Dépenser automatiquement » répartit aussi les points du grand graphe (ancienne sauvegarde à
  0/222 nœuds : rien ne reste bloqué) ; i18n-names après l'astuce skillpath : 25 écarts, les mêmes anciens faux positifs.
- 2026-11-18 (it. 2381, REVUE GÉNÉRALE) : 12 h : moine 62, samouraï 65, prêtresse 64 ; --perf : 19,2 / 19,3 %, mini 5,6 %, icône 0,7 % ;
  Compétences en polonais à 1366 px (fin de partie) : propre, pluriel « 362 wolne punkty » juste ; texte russe : seuls des noms
  propres et les touches (Esc, Shift) ressortent. Rien à corriger.
- 2026-11-18 (it. 2380, contrôle) : fuzz 1200 parties, 0 bloquée ; stall-check 60 parties, 0 figée.
- 2026-11-18 (it. 2379, contrôle) : astuce skillpath en mode mini (russe) : ampoule seule, rien ne déborde.
- 2026-11-18 (it. 2378, contrôle) : capture de l'astuce skillpath en coréen sur la bande (autres astuces vues) : une ligne, lisible.
- 2026-11-18 (it. 2377, test) : astuce skillpath : seulement après l'astuce d'ouverture, à 5 points libres, une seule fois. 369 tests.
- 2026-11-18 (it. 2376) : astuce « skillpath » (une fois, après celle d'ouverture des Compétences, à 5 points libres) : un clic sur un
  nœud lointain prend le chemin le plus court ; 10 langues ; astuces dans la bulle (lang-overflow de, ru, pl). 306/306.
- 2026-11-18 (it. 2375, contrôle) : lang-overflow 10 langues à 1920 px (après bonus des paliers et Réglages > Son) : aucun défilement.
- 2026-11-18 (it. 2374, test) : sanitizeOuter : nœuds des anciennes voies de 30 retirés, anneau et voies coupés retirés, ordre gardé,
  points rendus au chargement. 368 tests.
- 2026-11-18 (it. 2373, autotest) : en zone 200, la bulle annonce « La Dernière Étoile » (attente du bon nom : une bulle « ♪ The Sill »
  restée du contrôle précédent passait avant). 306/306.
- 2026-11-18 (it. 2372, autotest) : le ▶ de la chronique « Le ciel rallumé » rejoue la libération (fenêtre ouverte puis fermée seule).
  305/305.
- 2026-11-18 (it. 2371, REVUE GÉNÉRALE) : 12 h : assassin 62, berserker 66, barde 65 ; --perf : 19,8 / 19,3 %, mini 5,6 %, icône 0,4 % ;
  Carte en espagnol à 1280 px (fin de partie) : propre ; --crawl en espagnol (fin de partie) : 682 clics, aucune erreur. Les 10
  langues ont été parcourues aujourd'hui.
- 2026-11-18 (it. 2370, contrôle) : --crawl en chinois sur la fin de partie : aucune erreur.
- 2026-11-18 (it. 2369) : bonus des paliers : largeur de la colonne du rang comptée double pour les caractères chinois, japonais et
  coréens (« ランク 400 » remplissait la colonne, un sablier aurait débordé sur les boutons) ; lang-overflow de, ru, ja, ko à 1280 :
  aucun défilement ; capture en japonais : marge suffisante. 304/304.
- 2026-11-18 (it. 2368, contrôle) : fenêtre « What’s new in version 0.1.7 » en anglais à 1920 px (newsSeen 132) : 10 nouveautés sur deux
  colonnes, sans défilement.
- 2026-11-18 (it. 2367, contrôle) : semaine, avant (11964efc) / après le grand graphe allégé : rôdeur 72 h 291 → 293, 120 h 335 → 349,
  168 h 350 → 350 ; paladin 12 h 69 → 65, 96 h 296 → 316, 168 h 349 → 349 ; mêmes paliers (36 h : 150, 48 h : 200). Bruit d'une graine.
- 2026-11-18 (it. 2366, contrôle) : Compétences en allemand à 1280 px (dev-data : fleur vide, 686 points, fichier inchangé depuis le
  17/11 15:10, donc sans lien avec le grand graphe allégé, qui ne touche que skills.outer) : propre.
- 2026-11-18 (it. 2365, contrôle) : fuzz (clés de voûte définitives) : 1200 parties, 0 bloquées.
- 2026-11-18 (it. 2364, contrôle) : sonde des ⓘ cachés à 1280 px (fr, de) après les changements du jour : IPROBE 0.
- 2026-11-18 (it. 2363) : POUR-VICTOR : correction du morceau épinglé notée pour la 0.1.8 ; stall-check : 60 parties, 0 figées.
- 2026-11-18 (it. 2362, contrôle) : plus aucune autre limite « 4 morceaux » en dur après la correction de musicPin (it. 2361) ; les
  « % 4 » restants sont étrangers à la musique (coup iai, animations).
- 2026-11-18 (it. 2361, REVUE GÉNÉRALE) : 12 h : moine 62, artificier 65, gardien des astres 65 ; --perf : 19,5 / 19,6 %, mini 5,5 %,
  icône 0,5 % ; capture Réglages > Son en japonais : « La Dernière Étoile » épinglée revenait au morceau de la zone après un
  redémarrage (state.js gardait musicPin de 0 à 3 seulement) : corrigé (0 à 4) et testé ; « 「最後の星」· エリア 200 » vérifié.
- 2026-11-18 (it. 2360, contrôle) : --crawl en portugais sur dev-data : 502 clics, aucune erreur.
- 2026-11-18 (it. 2359) : README, Histoire : musique de la zone 200 et cinématique de libération sur tout l'écran.
- 2026-11-18 (it. 2358) : README à jour (grand graphe de 222 nœuds, trois voies libres, chemin le plus court ; 5 morceaux dont celui
  de la zone 200) ; titre de docs/MUSIQUE.md.
- 2026-11-18 (it. 2357) : autotest 114 s pour 304 vérifications (lents : meute 3,5 s, décodage des 5 morceaux 3,5 s, cinématique de
  libération 3,1 s) ; repère de CLAUDE.md et libellé « les 5 morceaux » à jour.
- 2026-11-18 (it. 2356, contrôle) : texte russe extrait (fin de partie, 0.1.7) : mots latins = noms propres, touches, repères, DEV et
  « Windows » (dev), suffixes des grands nombres « Qa »/« Qi » (format.js HUGE, voulus dans toutes les langues comme k et M) ; rien d'oublié.
- 2026-11-18 (it. 2355, contrôle) : mem-watch 10 min, bande (0.1.7) : 619-625 Mo réels, plat (mode haut de la mesure bimodale,
  ≈ 570 ou ≈ 625 Mo d'une exécution à l'autre : CLAUDE.md) ; pas de fuite.
- 2026-11-18 (it. 2354, contrôle) : early-pace après les clés de voûte sans malus : à 60 min, niveau 39-41, zone 23-25, 6,3 déblocages
  (identique au relevé précédent).
- 2026-11-18 (it. 2353, contrôle) : i18n-names après les textes du jour : 25 écarts, tous anciens et grammaticaux (génitif allemand,
  forme coréenne avant un possessif, nom de succès libre) ; aucun dans les clés 3350-3394.
- 2026-11-18 (it. 2352) : POUR-VICTOR : question sur les points au-delà du grand graphe rempli (bonus automatique ou rangs de couronnes au
  choix ?) ; rien de changé sans sa réponse.
- 2026-11-18 (it. 2351, REVUE GÉNÉRALE) : 12 h : druide 64, samouraï 65, nécromancien 62 ; --perf : 19,7 / 20,0 %, mini 5,5 %, icône
  0,7 % ; Compétences en anglais à 1280 px (fin de partie, graphe rempli : 222 nœuds, 140 points en surplus → +14 %) : propre.
- 2026-11-18 (it. 2350, contrôle) : --crawl en coréen sur la fin de partie (0.1.7) : 706 clics, aucune erreur.
- 2026-11-18 (it. 2349, contrôle) : save-fuzz à partir d'une partie 0.1.2 (sanitizeOuter du grand graphe allégé) : 1169 corruptions, ok.
- 2026-11-18 (it. 2348, contrôle) : semaine après Tempête de lames à +15 % (0.1.7) : graine 7 guerrier 72 h 283 → 293, 168 h 350 → 361,
  mage 349 → 350 ; graine 3 guerrier 72 h 293 → 283, 168 h 350 → 350, mage 350 → 350 : écarts de sens contraires selon la graine,
  bruit ; mêmes paliers (36 h : 150, 48 h : 200).
- 2026-11-18 (it. 2347) : CLAUDE.md, sortie d'une version : 0.1.7 = édition 152, la 0.1.8 prendra after: 152.
- 2026-11-18 (it. 2346, VERSION 0.1.7 ENVOYÉE) : étiquette v0.1.7 ; itch-push --dry-run (win 337 Mo, linux 134, mac 129, signé) ;
  AppImage essayée avec un HOME temporaire (démarre, partie neuve) ; Médias/dist-itch : 3 fichiers + SHA256-0.1.7.txt ; butler :
  windows #2430814, linux #2430816, mac #2430820, en ligne (0.1.7). Devlog : docs/devlog-0.1.7.md (publication), steam/itch/
  devlog-0.1.7.html (10 langues), couverture cover-0.1.7.png (make.js update-0.1.7). Reste à Victor : publier le devlog.
- 2026-11-18 (it. 2346, VERSION 0.1.7, demande de Victor : « livre la 0.1.7 ») : package.json 0.1.7 ; notes de version RELEASE_017
  (news.js, after: 132, 10 nouveautés traduites, clés 3385-3394) ; tests des notes de version à jour ; scripts/selftest.mjs : la
  copie a lu au-delà de la DERNIÈRE version (lue dans news.js ; la fenêtre de la 0.1.7 s'ouvrait et trois contrôles du panneau
  échouaient). 367 tests, 304/304, lang-overflow complet propre.
- 2026-11-18 (it. 2345, performance) : cinématique de libération : 22 s de processeur sur 22 (un cœur, rendu logiciel) → demi-résolution
  (pixelated) et 30 images/s : 9 s sur 22 au-dessus du jeu ; texte toujours net. Mode mini : la scène s'ouvre puis se ferme. 304/304.
- 2026-11-18 (it. 2344) : cinématique de libération : feu d'artifice final (7 gerbes, 80 étincelles, éclair) ; départ ramené dans
  l'écran (bande hors écran ou sur un autre écran : le héros sortait du cadre la moitié du temps, vu sur une planche de 6 captures).
  304/304.
- 2026-11-18 (it. 2343) : Quoi de neuf, édition 152 : musique de la zone 200, surprise après la victoire (sans dévoiler), Talents
  alignés. POUR-VICTOR à jour. Clés 3382-3384.
- 2026-11-18 (it. 2342, DEMANDE DE VICTOR) : cinématique de libération, première version (docs/FINALE.md) : à la première victoire sur
  le Briseur d'Étoiles, le héros (habillé, ×5-7) quitte la bande et vole sur tout l'écran (fenêtre transparente, clics traversants,
  sans focus) : courbe par les quatre coins, halo, traînée et gerbes d'étoiles, compagnon qui suit, « Libre ! », ciel qui se
  rallume ; ≈ 26 s puis retour sur la bande. Rejouable (▶ de « Le ciel rallumé »). Capture à 10 s vérifiée. Clés 3380-3381. 304/304.
- 2026-11-18 (it. 2341, DEMANDE DE VICTOR) : musique de la zone 200, « La Dernière Étoile » (scripts/music/tracks/finale.js) : 116 bpm,
  ré mineur harmonique → majeur, 68 mesures, 2 min 21, mesures comme les 4 autres (−15,9 LUFS, largeur 0,42). render/music.js : 5e
  morceau hors du cycle des tranches de 50 (trackIndex(200) = 4, trackZone, trackRange) ; Réglages > Son : flèches de morceau en
  morceau, « « La Dernière Étoile » · zone 200 ». MP3 dans Médias/dist-itch/musique/07-…-v1.mp3. Plan de la cinématique :
  docs/FINALE.md. Clés 3378-3379. 367 tests, 303/303.
- 2026-11-18 (it. 2339-2340, DEMANDES DE VICTOR, captures) : « Choisir les bonus des paliers » : la colonne du rang a la même largeur
  dans toutes les rangées (--rk, le plus long « rang N » + sablier ; avant max-content par rangée, les boutons de « rang 10 » partaient
  plus à gauche que ceux de « rang 25 ⏳ ») et tous les bonus ont la hauteur de deux lignes (les deux colonnes restent alignées).
  Talents : « Voie » et « Maîtrises » de même hauteur (align-self: stretch) ; le survol d'une voie ne change plus la fiche de gauche,
  seul le clic (hover : branche « voie » ignorée). 303/303.
- 2026-11-18 (it. 2338, équilibrage) : hero-table 12 h (graines 7/3/11) après l'it. 2332 : moyenne 65,4 (63,8 avant, mesuré sur le
  commit d'avant), écart 7,3 : maître des lames 65,0 → 69,3, samouraï 64,7 → 68,3 (Tempête de lames sans son −15 % PV). Tempête
  ramenée à +15 % de vitesse : moyenne 64,9 (+1,1, bruit), écart 4,0 (5,3 avant), maître des lames 65,0, samouraï 66,3.
- 2026-11-18 (it. 2337) : Compétences : au survol d'un nœud non relié (fleur ou grand graphe), le chemin le plus court qu'un clic
  prendrait s'allume (or ; rouge s'il manque des points), effacé en quittant. Capture fin de partie : 8 nœuds jusqu'au milieu d'une
  voie, « Clic : prend le chemin le plus court (8 points) ». Autotest : 14 nœuds jusqu'à une clé de voûte. 303/303.
- 2026-11-18 (it. 2336, contrôle) : lang-overflow complet après le grand graphe allégé et l'édition 151 : aucun défilement ni mot coupé.
- 2026-11-18 (it. 2335, contrôles après le grand graphe allégé) : --crawl fin de partie 693 clics sans erreur ; stall-check 60 parties,
  0 figées ; fuzz 1200 parties, 0 bloquées.
- 2026-11-18 (it. 2334, SIGNALÉ PAR VICTOR, Mac) : fermer le panneau par la croix cachait la bande un court instant : setPanelOpen
  appelait win.blur() pour rendre la main à l'appli précédente, et sous macOS blur() passe la fenêtre derrière les autres
  (orderBack) jusqu'à ce que « toujours devant » la ramène. Plus de blur() sous macOS (le focus reste au jeu). À vérifier par Victor.
- 2026-11-18 (it. 2333, DEMANDE DE VICTOR) : son de l'attaque à la vitesse de frappe : un coup toutes les 55 ms au plus (≈ 18 / s ;
  avant 140 ms, 7 / s, les coups suivants étaient muets) ; plus la cadence est rapide, plus le coup est bref et doux (×0,6 à la
  cadence maximale). Autotest : rafale de trois coups superposés, sans saturation. --perf : 18,4 / 19,3 % (inchangé). 302/302.
- 2026-11-18 (it. 2332, DEMANDE DE VICTOR : grand graphe des Compétences) : « utiliser mes points en surplus, choisir les 3 traits de
  damage, chemin le plus court au clic, pas de point négatif, moins de points (plus simple à cliquer, plus joli), même équilibre ».
  skillgraph.js : voies de 10 nœuds (30), anneau de 6 par région (12) : 222 nœuds (618), plus espacés (STEP 1,7) ; les trois voies
  d'une région ne s'excluent plus (GRAPH_MAX_TAKE = tous) ; graphPathTo / skillPathTo (BFS) et Game.takeGraphPath / takeSkillPath :
  un clic sur un nœud lointain prend le chemin le plus court si les points suffisent (bulle : « Clic : prend le chemin le plus court
  (N points) » ou ce qui manque) ; sanitizeOuter (state.js) : nœuds disparus ou coupés retirés, points rendus. Dépense automatique :
  voies commencées, puis la plus forte, l'anneau (après la voie la plus forte si aucune n'est commencée), puis les autres.
  Clés de voûte de la fleur sans malus (Brute +18 % attaque au lieu de +40 / −40 % dégâts critiques ; Tempête +25 % vitesse ;
  Flamme brûlure 40, poison 8 ; Colosse PV 30, bouclier 8 ; Midas or 70 ; Immortel second souffle, régénération 2), texte retiré
  (la bulle décrit l'effet). Équilibre : VOIE_SCALE 0,85 sur les nœuds des voies (courbe puissance / points : +20 % à 150 points,
  −10 % graphe plein) ; semaine (graine 7) guerrier 350 → 350, mage 349 → 350, mêmes paliers (36 h : 150, 48 h : 200, 41 et 52
  courses) ; graine 3 : 350 / 350 ; balance 12 h : 64,3 → 65,0 (bruit ; clés à +25 % : +1,3, réduites). Page Steam, itch.io, promo :
  222 nœuds. 7 + 3 clés (3368-3377) ; édition 151. 367 tests, 302/302, save-fuzz dev et fin ok.
- 2026-11-18 (it. 2331, REVUE GÉNÉRALE) : 12 h : mage 61 (toujours le plus bas, à voir avec Victor), chaman 64, maître des lames 64 ;
  --perf : 18,4 / 19,4 %, mini 5,6 %, icône 0,6 % ; Talents en coréen à 1280 px : propres. Rien à corriger.
- 2026-11-18 (it. 2330) : POUR-VICTOR : Carnet de route (prochaine étape, paliers de niveau une fois).
- 2026-11-18 (it. 2329) : Quoi de neuf, édition 150 : Carnet de route (prochaine étape, paliers de niveau une seule fois ; it. 2315-2322).
  Clé 3367. 302/302.
- 2026-11-18 (it. 2328, contrôle) : --crawl en allemand sur la fin de partie : 693 clics, aucune erreur.
- 2026-11-18 (it. 2327, contrôle) : Héros > Sorts et attaque en anglais à 1280 px : trois sorts (effet, prix, « max »), compagnon,
  style d'attaque 3 / 5 et palier suivant expliqué ; rien ne déborde.
- 2026-11-18 (it. 2326, contrôle) : tab-pace : talents 1 min, stats 2-3, quêtes 4-5, boutique 7-11, héros 9-12, carte 11-14,
  bestiaire 13-18, ascension 20-41 min : identique au relevé de l'it. 2225.
- 2026-11-18 (it. 2325, contrôle) : Collection d'objets : un type d'objet tombe partout, tiré au hasard dans son emplacement
  (rules.js, ITEM_BASES) : « ??? (emplacement) » suffit, pas de zone à indiquer.
- 2026-11-18 (it. 2324, contrôle) : Boutique en espagnol à 1280 px, sac plein : « Bolsa llena » sur les achats (deux lignes dans la
  colonne étroite des coffres, sans coupure), « Vender inútiles (24) » en évidence. Rien à corriger.
- 2026-11-18 (it. 2323, contrôle) : Quêtes en polonais à 1280 px : titres longs sur deux lignes, lien « → Przygoda » de la quête de
  transmutation dans le coin de sa carte, rien ne déborde.
- 2026-11-18 (it. 2322) : Carnet de route : « Niveau 10 / 25 / 50 / 100 atteint » n'est plus noté qu'une fois (à chaque ascension le
  niveau repart de 1 et ces lignes revenaient : la moitié des 30 étapes affichées en fin de partie, chroniques et héros libérés noyés).
  Sans nouvelle donnée (cherché dans le carnet) ; les doublons déjà notés restent. Test (366). 302/302, save-fuzz ok.
- 2026-11-18 (it. 2321, REVUE GÉNÉRALE) : 12 h : arbalétrier 65, prêtresse 64, gladiateur 64 ; --perf : 18,1 / 19,6 %, mini 5,4 %,
  icône 0,8 % ; Carnet de route en japonais à 1280 px (fin de partie, 30 étapes sur trois colonnes) : « 次の節目：エリア 160 » en
  bas, sans défilement. Rien à corriger.
- 2026-11-18 (it. 2320, contrôle) : constellations abordables : déjà dans « À faire » (id « stars », game.js todoNow). CLAUDE.md : 302
  vérifications d'autotest.
- 2026-11-18 (it. 2319, contrôle) : onglet Ascension en français à 1280 px : gardé / perdu, prochain héros, éclats maintenant et à la
  zone suivante, constellations ; « 0 gagnés au total » avec 2 765 éclats vient des commandes de dev de dev-data. Rien à corriger.
- 2026-11-18 (it. 2318, contrôle) : STALL_DAYMOD=all stall-check : 60 parties, 0 figées ; FUZZ_DAYMOD=all fuzz (30 graines) :
  600 parties, 0 bloquées.
- 2026-11-18 (it. 2317, contrôle) : texte russe extrait : bulles des inconnus du Bestiaire, pouvoir, bénédiction et « Следующий
  этап: зона 60 » traduits ; aucun mot latin nouveau. Devlog 0.1.7 : ligne du Carnet de route.
- 2026-11-18 (it. 2316, autotest) : Carnet de route : prochaine étape annoncée après le record et sur une zone d'étape (record 57 → 60 ;
  le dernier paragraphe seul : la date d'une étape porte aussi .note). 302/302.
- 2026-11-18 (it. 2315) : Statistiques > Carnet de route : « Prochaine étape : zone N » sous les étapes (la prochaine zone qui en
  ajoutera une : toutes les 5 zones, puis toutes les 10 après la 50, game.js journeyZoneStep). dev-data : une seule étape (zone 51,
  record 57) et rien ne disait quand viendrait la suivante. Clé 3366. lang-overflow 10 langues à 1280 px (dev et fin) : aucun
  défilement. 301/301.
- 2026-11-18 (it. 2314, contrôle) : first-minutes : premier objet 42-82 s, premier boss 70-82 s, zone 9-10 et niveau 16-17 à
  10 min : identique à l'it. 2225.
- 2026-11-18 (it. 2313, contrôle) : --crawl sur une partie NEUVE en anglais (dossier vide, --lang=en-US) : 73 clics (peu d'onglets
  ouverts), aucune erreur.
- 2026-11-18 (it. 2312) : POUR-VICTOR : bulles des inconnus du Bestiaire (it. 2303-2310).
- 2026-11-18 (it. 2311, REVUE GÉNÉRALE) : 12 h : rôdeur 65, berserker 66, cryomancien 65 ; --perf : 18,3 / 19,1 %, mini 5,5 %,
  icône 0,5 % ; Bestiaire en coréen à 1280 px, Gluant remis à 0 : « 아직 만나지 않음 · 지역 1: 속삭임의 숲 » (it. 2309), grille
  propre. Rien à corriger.
- 2026-11-18 (it. 2310) : Quoi de neuf, édition 149 : les inconnus du Bestiaire disent où les trouver (it. 2303-2309). Clé 3365. 301/301.
- 2026-11-18 (it. 2309) : correction de l'it. 2305 : la bulle d'un monstre inconnu citait les noms de TOUS ses décors, y compris
  ceux que la Carte cache dans le brouillard (au-delà de record + 3). Elle donne maintenant la première zone où il vit, nommée
  seulement si la Carte la nomme (« Zone 12 : Marais brumeux »), sinon le numéro seul (« Zone 140 ») ; gobelin et Poupouce
  gardent leur phrase. Sans nouvelle clé. 301/301.
- 2026-11-18 (it. 2308, autotest) : Bestiaire : monstres inconnus (le Gluant remis à 0 le temps du contrôle) : leur bulle dit où ils
  vivent ; pouvoir inconnu : sa bulle dit où le trouver. 301/301.
- 2026-11-18 (it. 2307, contrôle) : objectifs inconnus hors Bestiaire : Carte (brouillard voulu au-delà de record + 3, héros
  prisonniers et chroniques disent leur zone), Héros > Prisonniers (« Retenu prisonnier en zone N ») : tous disent où aller.
- 2026-11-18 (it. 2306, contrôle) : inconnus du Bestiaire passés en revue après les it. 2303-2305 : élites et panoplies montrent déjà
  nom et effet avant d'être obtenues ; objets de la Collection : « ??? (emplacement) », suffisant. Plus rien de muet.
- 2026-11-18 (it. 2305) : Bestiaire : la bulle d'un monstre pas encore rencontré dit où il vit (« Pas encore rencontré · Marais
  brumeux… », comme un monstre connu) : un but à atteindre. Sans nouvelle clé. 300/300.
- 2026-11-18 (it. 2304) : Bestiaire > Bénédictions du jour : une bénédiction jamais vécue (« ??? ») dit au survol qu'il faut revenir
  d'autres jours. Les événements rares inconnus donnaient déjà leur chance par victoire. Clé 3364. 300/300.
- 2026-11-18 (it. 2303) : Bestiaire > Pouvoirs : un pouvoir pas encore découvert (« ??? ») dit au survol où le trouver (chaque objet
  légendaire en porte un, tiré au hasard : game.js, pick(POWERS)). Clé 3363. 300/300.
- 2026-11-18 (it. 2302, contrôle) : Bestiaire > Pouvoirs légendaires en allemand à 1280 px (fin de partie, 30 / 30) : noms sur
  quatre rangées sans débordement, effet de chacun au survol ; rien à corriger.
- 2026-11-18 (it. 2301, REVUE GÉNÉRALE) : 12 h (une graine) : paladin 69, assassin 65, barde 61 (bruit d'une graine, ±4) ; --perf :
  18,2 / 18,9 %, mini 5,4 %, icône 0,6 % ; capture Statistiques > Succès en chinois à 1280 px : les trois « presque » (9/10, 5/7,
  48/50) en or, rien ne déborde. Rien à corriger.
- 2026-11-18 (it. 2300, contrôle) : lang-overflow complet (10 langues, 1920 / 1600 / 1366 / 1280 px, fin de partie, zoom 130 %, état
  maximal, absence au pire cas, « Quoi de neuf » avec l'édition 148) : aucun défilement ni mot coupé.
- 2026-11-18 (it. 2299, test) : nearAchievements (ordre, seuil, obtenus exclus) et astuce « achnear » (92 % : oui, 80 % : non).
  365 tests.
- 2026-11-18 (it. 2298) : POUR-VICTOR : nouveautés de fin d'après-midi (succès expliqués, les trois plus proches en or, astuce,
  édition 148, descriptions Steam).
- 2026-11-18 (it. 2297) : Quoi de neuf, édition 148 : succès expliqués au survol (it. 2286), les trois plus proches en or et
  l'astuce à 90 % (it. 2294-2296). Clés 3361-3362. 300/300.
- 2026-11-18 (it. 2296) : astuce « achnear » (une fois) : un succès chiffré à 90 % ou plus (et les Statistiques complètes) mène à
  Statistiques > Succès, où les plus proches ressortent en or (it. 2294). nearAchievements (achievements.js) partagé avec l'onglet ;
  0,13 ms par appel (dev-data : Alchimiste 96 %, Dix héros 90 % ; fin de partie : Bestiaire 99 %). Clé 3360. lang-overflow 10
  langues à 1920 px : aucune astuce coupée. 300/300. Le reste du retour d'un succès (bandeau, journal, bulle au lancement) existait.
- 2026-11-18 (it. 2295, contrôle) : capture du mode mini en anglais (370 × 64, combat contre le boss de zone 57) : niveau, or, zone
  et série lisibles, barres de vie au-dessus des deux combattants, rien ne se chevauche.
- 2026-11-18 (it. 2294) : Statistiques > Succès : les trois succès chiffrés les plus avancés (au moins à moitié) ressortent (étoile
  vide dorée, texte plein, bulle « Presque obtenu ») ; dev-data : Dix héros libérés 9/10, Alchimiste 48/50, Fidèle 5/7. Thèmes
  sombre et clair vérifiés à 1280 px, mise en page inchangée. Clé 3359. Autotest : 9 explications, 0 à 3 « presque ». 300/300.
- 2026-11-18 (it. 2293, contrôle) : mem-watch 10 min en mode mini (MEM_ARGS="--mode=mini") : 505-518 Mo réels, plat (le ramasse-miettes
  redescend à 505 à 540 s) ; repère du mode mini, sous celui de la bande (565-575) et du panneau (580-610).
- 2026-11-18 (it. 2292) : early-pace.mjs refuse lui aussi un CLS inconnu (il tournait avec une classe absente) ; balance.mjs
  passe par simulate.js (it. 2291), donc protégé ; hero-table et fuzz prennent la liste du jeu.
- 2026-11-18 (it. 2291, REVUE GÉNÉRALE) : 12 h : lancier 64, gardien des astres 65, nécromancien 62 ; --perf : 18,5 / 19,7 %,
  mini 5,5 %, icône 0,6 % ; capture Familiers en japonais à 1280 px (« 持っていく » sur les expéditions) : propre. simulate.js
  acceptait une classe inconnue (« guardian », « necromancer ») et simulait sans rien dire un autre héros : il la refuse
  maintenant en listant les classes.
- 2026-11-18 (it. 2290, contrôle) : fuzz : 1200 parties, 0 bloquées ; stall-check : 60 parties, 0 figées.
- 2026-11-18 (it. 2289, autotest) : Statistiques > Succès : 72 succès, 9 avec une explication au survol (it. 2286). 300/300.
- 2026-11-18 (it. 2288) : steam/achievements.md : second tableau, les descriptions (10 langues) des 9 succès qui en ont une
  (it. 2286), à recopier dans le champ « Description » de Steamworks ; généré par steam-achievements.mjs (vérifié par npm test).
  Quoi de neuf : une seule nouveauté depuis l'édition 147 : attendre la série suivante.
- 2026-11-18 (it. 2287, contrôle) : texte extrait en russe (--dump-text, bulles comprises) : les explications des succès
  (it. 2286) sont traduites ; mots latins restants : noms propres (Sillwalker, Poupouce), touches, repères du fichier
  (« --- attributs », noms d'onglets), DEV et « Windows » (mode de développement) : rien d'oublié.
- 2026-11-18 (it. 2286) : Statistiques > Succès : les neuf succès au nom obscur (Poupouce ?!, Clé de voûte, Au-delà de la fleur,
  Plume du vent, Cœur pur, Duo parfait, Le ciel rallumé, Écho dissipé, Les trois échos) disent au survol ce qu'il faut faire
  (champ desc d'achievements.js, 10 langues, clés 3350-3358). Autotest : le contrôle des liens de quêtes (it. 2284) comptait les
  liens de TOUTES les quêtes affichées (« 1 2 » selon le tirage) : les autres emplacements deviennent des quêtes de victoires.
- 2026-11-18 (it. 2285) : durée de l'autotest : 110 s pour 299 vérifications (les plus lentes : meute 3,5 s, bulle de musique 2,8 s) ;
  repère de CLAUDE.md mis à jour.
- 2026-11-18 (it. 2284, autotest) : quête d'expéditions : 0 lien avec le Grand intendant actif, 1 lien quand il est coupé. 299/299.
- 2026-11-18 (it. 2283, contrôle) : save-fuzz (todoNow y est appelé : « Agrandir le sac », Atelier) : 1267 corruptions (dev-data),
  1225 (fin de partie), toutes « ok ».
- 2026-11-18 (it. 2282, contrôle) : --crawl sur dev-data SANS AUCUN déblocage (liens « 🔒 · prix », notes à la place des actions) :
  518 clics, aucune erreur.
- 2026-11-18 (it. 2281, REVUE GÉNÉRALE) : 12 h : moine 65, druide 64, samouraï 65 ; --perf : 1re mesure 19,9 / 20,5 % (charge 2,4), 2e
  18,6 / 19,0 %, mini 5,3 %, icône 0,6 % : bruit ; capture Talents en russe (« Распределять автоматически… », it. 2238) : propre.
- 2026-11-18 (it. 2280, contrôle) : --crawl après les nouvelles entrées de « À faire » (absence de 2 h simulée) : 509 clics (dev-data),
  697 (fin de partie), aucune erreur.
- 2026-11-18 (it. 2279, bon voisin) : coût de l'astuce « sac plein » (when → todoNow) : astuces évaluées toutes les 2 s, todoNow 0,10 ms
  (dev-data, 200 appels) : négligeable.
- 2026-11-18 (it. 2278) : POUR-VICTOR : nouveautés de l'après-midi (sac, Atelier, liens des quêtes, résumé d'absence).
- 2026-11-18 (it. 2277) : « Quoi de neuf », édition 147 (rappel de l'Atelier, résumé d'absence en allemand et polonais ; clés 3348-3349).
  Bulles du mode mini et de l'icône (« À faire » au survol) : texte libre, rien à mesurer. lang-overflow all × 1280 (10 langues, vrai) : rien.
- 2026-11-18 (it. 2276, mesure + correction) : lang-overflow mesure le résumé d'absence au pire cas dans chaque langue (« absence-pire=N ») :
  25 px en allemand et 9 en polonais à toutes les largeurs (colonne « À faire » de 320 px : actions sur deux lignes) → 380 px, plus rien.
  ERREUR DE MÉTHODE découverte : « lang-overflow.mjs all 1280 » prenait « all » pour une langue inconnue (repli français) : mes mesures
  « 10 langues × 1280 » des it. 2186-2275 ne couvraient qu'UNE langue (les mesures complètes sans argument, it. 2207, 2224, 2238, étaient
  justes). « all » accepté désormais ; mesure complète réelle refaite : rien. La mesure du résumé, d'abord placée au milieu, changeait l'état
  de la page (+5 à 7 px faussement comptés sur l'Aventure) : déplacée en dernier. CLAUDE.md complété. 298/298.
- 2026-11-18 (it. 2275, plaisir de revenir) : « À faire » : « Atelier : améliorations permanentes à petit prix → » quand la moins chère
  coûte moins de 1 % de l'or (dev-data : 447 Md d'or, Atelier jamais utilisé) ; les prix montant vite, un joueur qui y investit ne le voit
  presque jamais (test logique). Pas en même temps que « Agrandir le sac » : la ligne de plus faisait défiler le résumé d'absence au pire
  cas (autotest, 23 px) ; libellé raccourci (clé 3347 ; 3346 abandonnée avant publication). lang-overflow × 1280 : rien. 364 tests, 298/298.
- 2026-11-18 (it. 2274, autotest) : « Agrandir le sac » dans le résumé d'absence : présent (sac plein, Atelier, or) et un clic passe
  le sac de 24 à 30 places. 298/298.
- 2026-11-18 (it. 2273) : « Quoi de neuf », édition 146 (sac plein : agrandir d'un clic et astuce ; liens des quêtes cachés quand un
  automatisme s'en charge ; clés 3344-3345 ; noms repris tels que traduits).
- 2026-11-18 (it. 2272) : astuce de la bande « Ton sac est plein : le butin suivant reste au sol. L'Atelier (Boutique) l'agrandit de 6
  places. » (même condition que « À faire », it. 2269 ; un clic ouvre Boutique > Atelier ; clé 3343). Astuces des 10 langues dans la bulle
  (lang-overflow × 1280) ; 297/297.
- 2026-11-18 (it. 2271, REVUE GÉNÉRALE) : 12 h : guerrier 61, mage 61, chaman 64 ; --perf : 1re mesure 19,2 / 20,5 % (charge machine 2,6),
  2e 18,4 / 19,6 %, mini 5,5 %, icône 0,5 % : bruit ; capture Aventure en japonais (« やること (8) » : « Agrandir le sac » compté) : propre.
- 2026-11-18 (it. 2270) : brouillon du devlog 0.1.7 : agrandir le sac depuis « À faire », liens des quêtes et automatismes.
- 2026-11-18 (it. 2269, plaisir de revenir) : « À faire maintenant » propose « ✦ Agrandir le sac : +6 places (N or) » quand le sac est
  plein, l'Atelier débloqué et l'agrandissement abordable ; un clic l'achète (comme dans l'Atelier). Trouvé en revue : dev-data, 447 Md
  d'or, sac de 24 jamais agrandi, 14 objets laissés au sol pendant l'absence. Test logique (clé 3342) ; capture du résumé ; lang-overflow
  10 langues × 1280 : rien. 363 tests, 297/297.
- 2026-11-18 (it. 2268, contrôle) : fin de partie : quête de transmutation sans Creuset perpétuel : un lien « → Aventure » (le seul) ;
  comportement attendu après les it. 2266-2267.
- 2026-11-18 (it. 2267) : Quêtes : lien vers l'onglet masqué aussi quand le Maître de forge (forge) ou le Creuset perpétuel (transmutation)
  sont actifs, comme pour le Grand intendant (it. 2266) : la quête avance toute seule. Autotest rendu indépendant de ces automatismes. 297/297.
- 2026-11-18 (it. 2266) : Quêtes : pas de lien « → Familiers » sur la quête d'expéditions quand le Grand intendant est actif (elles
  partent et reviennent toutes seules, rien à faire là-bas). 297/297.
- 2026-11-18 (it. 2265) : CLAUDE.md : repère hero-table mis à jour (it. 2264 : 63,8, mage 61,0) et rappel « liste de graines ».
- 2026-11-18 (it. 2264, équilibrage) : hero-table 20 héros × graines 7/3/11 : 63,8 (mage 61,0 le plus bas) contre 64,6 au commit d'avant
  la correction des quêtes (git worktree, mêmes graines) : −0,8 zone, sous le seuil de bruit (±1,5 ; balance.mjs : −0,1). Rien à régler.
  (Le 2e argument de hero-table est une LISTE de graines : « 3 » seul ne lance qu'une graine.)
- 2026-11-18 (it. 2263, contrôle) : --crawl en japonais (690 clics) et en coréen (701, koJosa) sur la fin de partie : aucune erreur.
- 2026-11-18 (it. 2262, équilibrage) : balance.mjs 12 h, avant / après la correction des quêtes d'expéditions (it. 2243) : moyenne
  64,4 → 64,3 (−0,1 zone : bruit) ; le paladin 65 → 69 compensé ailleurs (mage 64 → 61, berserker 69 → 66) : trajectoires.
- 2026-11-18 (it. 2261, REVUE GÉNÉRALE) : 12 h : rôdeur 65, nécromancien 62, paladin 69 (65 à l'it. 2211 : les quêtes tirées ont changé à
  l'it. 2243, donc toute la trajectoire aléatoire ; bruit d'une graine) ; --perf : bande 18,1 %, panneau 19,4 %, mini 5,4 %, icône 0,8 % ;
  captures Quêtes en espagnol (« → Aventura ») et mini en allemand : propres. Rien à corriger.
- 2026-11-18 (it. 2260, contrôle) : save-fuzz après le remplacement des quêtes d'expéditions impossibles (it. 2243) : base 0.1.2,
  1169 corruptions ; fin de partie, 1225 : toutes « ok ».
- 2026-11-18 (it. 2259) : CLAUDE.md : mem-watch panneau ouvert (MEM_ARGS="--open-panel"), repère 580-610 Mo et mesure de 10 min.
- 2026-11-18 (it. 2258, contrôle) : mem-watch PANNEAU OUVERT (MEM_ARGS="--open-panel") : 5 min 585 → 609 Mo, puis 10 min : 580-610 Mo
  en dents de scie, plat vers 600 (le ramasse-miettes n'était pas encore passé) : pas de fuite.
- 2026-11-18 (it. 2257, revue) : résumé d'absence (3 h, français, 1280 px) : bilan clair à gauche, sept actions directes à droite
  (quêtes, maîtrises, compétences, Carte du voyageur, sort, éclats, sac plein) ; tient sans défiler. Rien à corriger.
- 2026-11-18 (it. 2256) : CLAUDE.md, pièges connus : objets tirés dans l'autotest (légendaire ≈ 1 %, Valet d'armes) et méthode pour un
  contrôle instable.
- 2026-11-18 (it. 2255, vérification) : 91 victoires en 3 h d'absence (it. 2254) expliquées : zone 57, 12,1 M PV par monstre contre
  395 k dégâts / s ≈ 31 s par victoire, comme en jeu (héros de dev-data trop faible pour sa zone). L'absence fait combattre sur place,
  sans changer de zone : la notion de « héros bloqué » ne s'y applique pas. Rien à corriger.
- 2026-11-18 (it. 2254, relecture) : Journal après une absence de 3 h (dev-data, français) : messages clairs (récompense du jour,
  bénédiction vécue, Grand intendant, niveaux des familiers, œufs) ; 91 victoires en 3 h : héros bloqué au boss de la zone 57. Rien à corriger.
- 2026-11-18 (it. 2253, langues) : français resté dans l'espagnol et le portugais (« les, avec, pour, dans, une, est, ton… », dev-data et
  fin de partie) : aucun. Les 10 langues sont passées aujourd'hui (it. 2191-2253). Rien à corriger.
- 2026-11-18 (it. 2252, langues) : français resté dans l'allemand et le polonais (petits mots « les, avec, pour, une… », dev-data et fin
  de partie) : aucun (« des », « du » trouvés en allemand sont allemands). Rien à corriger.
- 2026-11-18 (it. 2251, REVUE GÉNÉRALE) : 12 h : artificier 65, danseuse de lames 64, cryomancien 65 ; --perf : bande 18,1 %, panneau
  19,0 %, mini 5,6 %, icône 0,5 % ; texte en anglais : aucun mot accentué (reste de français) hors noms de langues ; captures Familiers
  en portugais (« Levar ») et mini en coréen : propres (« 0 ovo » au singulier : règle CLDR du portugais brésilien). Rien à corriger.
- 2026-11-18 (it. 2250) : POUR-VICTOR : résumé de la mi-journée (familiers, quêtes, Carte, traductions, Linux).
- 2026-11-18 (it. 2249, contrôle) : semaine simulée (simulate.js 168) : guerrier 350 (41 courses), mage 349 (52) : repère inchangé
  (350 / 350, palier de l'écho de la zone 350, it. 1708).
- 2026-11-18 (it. 2248, audit) : chasse d'un monstre absent de la zone : déjà « absent d'ici · zone N » (clic : y aller, avec la Carte du
  voyageur ; it. 1426). Classe .qgo partagée avec le lien de l'it. 2233 : la règle de celui-ci reste limitée à .qhead. Rien à corriger.
- 2026-11-18 (it. 2247) : « Quoi de neuf », édition 145 (quête d'expéditions impossible corrigée, cases d'automatisme traduites
  « automatiquement » ; deux points : corrections que les joueurs touchés doivent connaître ; clés 3340-3341). 297/297 ; lang-overflow × 1280 : rien.
- 2026-11-18 (it. 2246, audit) : bénédictions du jour sans effet pour le joueur (familiers, sorts, élites, champions) : déjà signalées
  dans la bulle (ui/daymodnotes.js, it. 957-1703). Rien à ajouter.
- 2026-11-18 (it. 2245, contrôle) : autotest trois fois de suite après les contrôles ajoutés aujourd'hui : 297/297 à chaque fois
  (aucune instabilité).
- 2026-11-18 (it. 2244, audit) : conditions des 18 sortes de quêtes : toutes réalisables quand elles tombent (élites et champions selon
  la zone, gobelins attrapables, sort appris, clic déjà essayé, crit ≥ 8 %, forge / transmutation / expéditions selon le déblocage
  depuis l'it. 2243 ; rafales dès les premières minutes, coffres au trésor sur toute victoire). Rien d'autre à corriger.
- 2026-11-18 (it. 2243, bug) : la quête « Ramener N expéditions » pouvait tomber dès deux familiers (Ménagerie, zone 25) alors que les
  expéditions ne se débloquent qu'en zone 50 (Chenil des explorateurs, 87 M or) : quête impossible, à changer à la main. Exigée aussi la
  possession du Chenil (comme forge et transmutation) ; une quête de ce genre déjà tirée, non accomplie, est remplacée au chargement
  (ensureQuests). Test logique ; save-fuzz « ok » ; 362 tests, 297/297.
- 2026-11-18 (it. 2242, langues) : fin de la vérification « tout seul » : portugais « sozinho » sans ambiguïté (≠ « só », seulement) ;
  plus aucun « samodzielnie » (pl) ni « selbst …en » (de) dans un libellé à l'infinitif. Rien d'autre à corriger.
- 2026-11-18 (it. 2241, REVUE GÉNÉRALE) : 12 h : barde 69, arbalétrier 65, gladiateur 65 (une graine) ; --perf : bande 18,6 %, panneau
  18,9 %, mini 5,5 %, icône 0,4 % ; texte en russe (dev-data, fin de partie) : aucun mot non traduit ; captures Quêtes en allemand
  (« → Abenteuer ») et mini en japonais : propres. Rien à corriger.
- 2026-11-18 (it. 2240, langues) : relecture des 26 déblocages en anglais : sens justes (« on its own » à la 3e personne) ; ordre des mots
  maladroit « … on its own the … » repris en « Automatically … » (Star Net, Personal Merchant, et son annonce dans « Quoi de neuf »). 297/297.
- 2026-11-18 (it. 2239, langues) : suite de l'it. 2238 dans tout le texte : descriptions à la 3e personne justes (« von selbst », « sam
  idzie », « sozinho ») ; mais en espagnol « verbe + solo + complément » se lisait « seulement » (« Mejora solo el hechizo más barato » =
  n'améliore que…) : 16 descriptions de déblocages réécrites avec « automáticamente » (« por sí solo », « se gastan solos » gardés).
  lang-overflow es complet : rien. 297/297.
- 2026-11-18 (it. 2238, langues) : contresens dans les libellés de cases « faire tout seul » : en « Spend on my own », ru « Распределять
  самому », es « solo », pt « sozinho », pl « sam », de « selbst » se lisaient « moi-même / à la main », l'inverse du sens (le jeu le fait
  automatiquement). Clés 1375 (talents), 1408 (Valet d'armes), 1507 (Astrolabe), 2091 (Carte du ciel), 2175 (Grimoire) réécrites avec
  « automatiquement » en en, es, pt, de, pl, ru (zh, ja, ko déjà justes). lang-overflow complet : rien. 297/297.
- 2026-11-18 (it. 2237, contrôle) : avec les bénédictions du jour : fuzz FUZZ_DAYMOD=all (600 parties) 0 bloquée, stall-check
  STALL_DAYMOD=all (60) 0 figée. Astuces de la bande : elles mènent déjà à leur onglet au clic (rien à ajouter).
- 2026-11-18 (it. 2236) : question des boutons des cartes de héros (libellés plus courts ?) posée à Victor dans POUR-VICTOR, avec trois
  propositions ; rien changé sans son choix.
- 2026-11-18 (it. 2235, contrôle) : --crawl après les liens des quêtes et de la Carte : 520 clics (dev-data), 693 (fin de partie),
  aucune erreur.
- 2026-11-18 (it. 2234) : « Quoi de neuf », édition 144 (liens des quêtes, Carte « En vente », Réglages Linux ; clés 3337-3339 ; libellés
  repris tels que traduits). 297/297 ; lang-overflow 10 langues × 1280 : rien.
- 2026-11-18 (it. 2233, ergonomie) : Quêtes : les quêtes qui demandent un geste ailleurs ont un lien vers l'onglet où le faire, en haut
  à droite de la carte (« → Aventure » : forger et transmuter, depuis la fiche d'un objet du sac ; « → Familiers » : expéditions) ; nom
  d'onglet tel qu'affiché, pas de clé nouvelle ; caché quand la quête est accomplie. Autotest (clic → Aventure) ; captures fr, de ;
  lang-overflow 10 langues × 1280 : rien. 297/297.
- 2026-11-18 (it. 2232, contrôle) : sonde des ⓘ sur une partie SANS aucun déblocage (liens « 🔒 · prix » dans les rangées), fr, de, ru
  à 1280 px : IPROBE 0.
- 2026-11-18 (it. 2231, REVUE GÉNÉRALE) : 12 h : assassin 60, prêtresse 64, lancier 62 (assassin, le plus bas de toujours : une graine) ;
  --perf : 1re mesure bande 20,0 % (charge de la machine ≈ 1,4), 2e 18,8 %, panneau 19,4 %, mini 5,5 %, icône 0,5 % : bruit ; texte en
  coréen : aucun mot non traduit ; captures Carte en anglais (« On sale: … 🔒 Traveler's Map · 90k gold ») et mini en polonais : propres.
- 2026-11-18 (it. 2230) : textes construits sur la zone d'un déblocage (comme le « Bientôt » de la Carte, it. 2227) : tous vérifient déjà
  la disponibilité. Boutons des cartes de héros à 1280 px : une police plus petite ne suffit pas (3/12 trop larges même à 11 px) : noté.
- 2026-11-18 (it. 2229, mesure) : --overflow-report mesure aussi chaque onglet sans aucun déblocage (record gardé) : tous les liens
  « 🔒 nom · prix » s'affichent, ce que l'état « tous les déblocages » de lang-overflow ne montrait jamais. 10 langues × 1920, 1600, 1366,
  1280 et fin de partie : rien. CLAUDE.md complété.
- 2026-11-18 (it. 2228, mesure) : lang-overflow n'avait pas vu les 12 px de la Carte (it. 2227) : il donne tous les déblocages, la note
  « En vente » n'était jamais affichée. --overflow-report mesure maintenant la Carte sans la Carte du voyageur (« map-sans-voyage=N ») ;
  validé : 12 sans le correctif de l'it. 2227, rien avec (fr, de). CLAUDE.md complété. 296/296.
- 2026-11-18 (it. 2227) : Carte : « Bientôt : la Carte du voyageur… (boutique, zone 22) » s'affichait alors qu'elle était déjà
  achetable (record 57, 447 Md d'or). Maintenant « En vente : … » suivi du lien « 🔒 Carte du voyageur · 90 k or » vers la boutique
  (clé 3336) ; « Bientôt » reste avant la zone 22. Le lien, plus haut que la ligne, faisait défiler la Carte de 12 px (autotest, trois
  largeurs ; lang-overflow ne le voyait pas) : .note .linkbtn.lock compact. prefers-reduced-motion : déjà respecté. 296/296.
- 2026-11-18 (it. 2226, contrôle langues) : i18n-names après les textes du jour (clés 3320-3335) : 25 écarts, tous anciens faux positifs
  grammaticaux (déclinaisons allemandes, particules coréennes, « Ménagerie » dans « collection complète ») ; aucune clé du jour.
- 2026-11-18 (it. 2225, contrôle) : début de partie inchangé. first-minutes : premier objet à 42-82 s, premier boss 70-82 s, onglet
  Talents dès le premier boss, Boutique à 493-525 s ; tab-pace : talents 1 min, stats 2-3, quêtes 4-5, boutique 7-11, héros 9-12,
  carte 11-14, bestiaire 13-18, ascension 20-41 min (3 graines).
- 2026-11-18 (it. 2224, contrôle) : lang-overflow complet (10 langues, 4 largeurs, fin de partie, 130 %, max) après « Emmener » dans
  les expéditions et les Réglages Linux : rien. Masquage devant le plein écran : seulement dans le menu de l'icône sous Windows (rien à faire).
- 2026-11-18 (it. 2223) : autotest « Linux : Réglages sans Windows ni case de démarrage » (window.__game retiré le temps d'un
  affichage ; bouton du thème sans « Windows » ni « macOS », indépendant de la langue). Autres textes qui citent Windows : deux
  anciennes éditions de « Quoi de neuf » (faits propres à Windows, jamais modifiées). 296/296.
- 2026-11-18 (it. 2222) : revue Statistiques et Réglages à 1280 px. Linux (version itch.io) : les Réglages disaient « Automatique
  (Windows) » et proposaient « Lancer au démarrage de Windows », case sans effet (Electron ne gère pas l'ouverture de session sous
  Linux). Maintenant « Automatique (système) » (clé 3335) et plus de case, ni dans les Réglages ni dans le menu de l'icône ; Windows et
  Mac inchangés. En dev (window.__game), l'affichage Windows reste (autotest et lang-overflow mesurent le cas le plus long) ; rendu Linux
  vérifié par une mise en scène qui retire window.__game. 295/295.
- 2026-11-18 (it. 2221, REVUE GÉNÉRALE) : 12 h : samouraï, moine, chaman 65 ; --perf : bande 18,1 %, panneau 19,0 %, mini 5,5 %,
  icône 0,4 % (deux Electron de test orphelins vus juste avant, partis d'eux-mêmes : chiffres habituels) ; texte en japonais (dev-data
  et fin de partie) : aucun mot non traduit (HP, pt, Lv, BGM : usage japonais) ; captures Aventure en coréen et mini en français :
  propres. Rien à corriger.
- 2026-11-18 (it. 2220, contrôle) : fuzz.mjs 60 graines (1200 parties neuves, 20 héros) : 0 bloquée ; stall-check (60 parties
  avancées) : 0 figée. Anciennes demandes et pistes de l'étude des concurrents relues : toutes faites ou en cours.
- 2026-11-18 (it. 2219, contrôle) : textes coupés de l'Ascension (revue it. 2218) : « Rang suivant » des constellations (title de la
  ligne : actuel + suivant) et bulle du PNJ compact (title : nom + réplique) se lisent en entier au survol. Rien à corriger.
- 2026-11-18 (it. 2218, revue visuelle) : Boutique et Ascension à 1280 px en français : propres (sac plein : « Vendre les inutiles (24) »
  en avant, pièces moins bonnes en « Sac plein » ; bulle du PNJ et « Rang suivant » des constellations raccourcis par « … » dans des
  emplacements prévus pour). Rien à corriger.
- 2026-11-18 (it. 2217, autotest) : audit des 18 contrôles qui tirent des objets (newItem) : un objet à rareté minimale 0 sort
  légendaire ≈ 1 % du temps (20 000 tirages) ; seuls les contrôles de vente en dépendaient (corrigés it. 2216) ; « sac plein vidé d'un
  clic » forçait déjà r = 0, les autres remplissent le sac sans que la rareté compte.
- 2026-11-18 (it. 2216, autotest) : « après une vente, l'objet suivant » échouait encore 1 fois sur 3 : l'objet tiré était parfois
  LÉGENDAIRE, la confirmation des objets précieux s'ouvrait (60 essais dans une mise en scène : 1 échec sur 30 avant, 0 sur 60 après).
  Rareté ordinaire forcée ; même correction pour « vendre un objet ordinaire : pas de confirmation » (et niveau 1, Valet d'armes).
  Trois passages de suite à 295/295.
- 2026-11-18 (it. 2215) : Héros, essai de sorts dans l'en-tête des cartes pour libérer les boutons : pire (sous-titres coupés,
  boutons toujours sur deux lignes en fr et de) : annulé, noté dans Idées.
- 2026-11-18 (it. 2214, contrôle) : mem-watch 6 min après les changements de la nuit et du matin : réel 586-594 Mo, plat (fourchette
  bimodale habituelle 570 / 625).
- 2026-11-18 (it. 2213, revue visuelle) : Quêtes et Héros à 1280 px en français : propres. Héros : « Jouer à l'ascension » et « Prendre
  en duo » sur deux lignes, sous-titre du Mage aussi : serré mais rien de coupé (noté, pas corrigé).
- 2026-11-18 (it. 2212, contrôle) : save-fuzz exerce aussi le rappel d'expédition et « Emmener » d'un familier parti (it. 2208) ;
  1267 corruptions (dev-data) et 1225 (fin de partie), toutes « ok ».
- 2026-11-18 (it. 2211, REVUE GÉNÉRALE) : 12 h : paladin 65, nécromancien 63, druide 64 (habituel) ; --perf : bande 18,3 %, panneau
  18,8 %, mini 5,3 %, icône 0,8 % (0,5 à la revue d'avant : bruit sur une valeur infime) ; texte en chinois (dev-data et fin de partie) :
  aucun mot non traduit ; captures Familiers en anglais à 1280 px (« Great Exped… · 7 h 59 · Take along ») et mini en chinois : propres.
- 2026-11-18 (it. 2210) : brouillon du devlog 0.1.7 complété (familiers, Dock sur Mac, volumes d'une première installation).
- 2026-11-18 (it. 2209) : --crawl après le rappel d'expédition : 535 clics (dev-data), 698 (fin de partie), aucune erreur. « Quoi de neuf »,
  édition 143 (rappel d'expédition, cartes des familiers, menu du Dock sur Mac ; clés 3332-3334 ; « Emmener » et « la bande » repris
  tels que traduits ailleurs : franja, Streifen, 长条, 막대). lang-overflow 10 langues × 1280 : rien. 295/295.
- 2026-11-18 (it. 2208, demande de Victor) : Familiers : « Emmener » dans le cadre d'une expédition en cours : le familier est rappelé
  sans butin (« tant pis si on gagne rien ») et devient le compagnon, d'un clic ; une expédition déjà finie est récupérée d'abord
  (game.recallExpedition, setPet(id, recall)). Même ligne que « Grande expéd… · 7 h 59 » (aucune hauteur en plus) : le nom se
  raccourcit, jamais la durée. Journal : « … rentre plus tôt de …, sans butin. » (clés 3330-3331). Test logique et autotest ;
  lang-overflow 10 langues × 1280 : rien. 361 tests, 295/295.
- 2026-11-18 (it. 2207) : Familiers : le niveau (« niv. 10 (max) ») toujours sous le nom (avant : à la ligne seulement pour les noms
  longs, Renardeau, Dragonnet : titres inégaux sur la capture de Victor). lang-overflow complet : rien. 294/294.
- 2026-11-18 (it. 2206, Victor : « très moche ce que t'as fait avec le i ») : Familiers : le ⓘ, mis en tête à l'it. 2201, gardait sa
  marge automatique et flottait seul au milieu en repoussant tout à droite. Collé maintenant au texte « N / M familiers trouvés · N œufs »
  qu'il explique ; barre alignée à gauche comme avant. Captures 1920 et 1280 ; sonde des ⓘ : 0 (de, ru). 294/294.
- 2026-11-18 (it. 2205) : sonde des ⓘ dans les 10 langues à 1280 px, dev-data et fin de partie : IPROBE 0 partout (un premier passage
  donnait 18 alertes en pl, ru, zh, ja, ko : copies préparées trop tôt, le résumé d'absence s'ouvrait par-dessus ; noté dans CLAUDE.md).
  Victor confirme sur Mac : le menu du Dock passe maintenant devant la bande (it. 2204).
- 2026-11-18 (it. 2204, demande de Victor) : macOS : la bande passe du niveau « pop-up-menu » (101, celui des menus contextuels) à
  « status » (25 : au-dessus des fenêtres et du Dock, sous les menus) : le menu du clic droit sur le Dock passera devant (à vérifier
  sur Mac, POUR-VICTOR). Windows et Linux inchangés (le niveau n'y joue guère ; les menus de la barre des tâches, ouverts après la
  bande « topmost », passent devant). Sonde des ⓘ (scripts/stage/info-probe.js, --stage) : ⓘ recouvert, hors de son conteneur ou
  sous l'ombre d'une rangée qui défile ; validée sur l'ancienne barre des Familiers (2 alertes en fr, de, ru) ; aujourd'hui 0 en fr,
  de, ru, pl, ja (dev-data et fin de partie). Intégrée à --overflow-report, elle donnait de fausses alertes : laissée à part. 294/294.
- 2026-11-18 (it. 2203, contrôle) : volumes d'une vraie première installation (dossier vide, jeu lancé) : général 0,5, effets 0,1,
  ambiance 1, musique 0,2, en mémoire comme dans le save.json écrit. Conforme à la demande de Victor (it. 2200).
- 2026-11-18 (it. 2202) : « Quoi de neuf », édition 142 (flèches des Compétences, noms du Bestiaire, ⓘ des Familiers, japonais et
  coréen ; clés 3326-3329, noms d'onglets repris tels que traduits). 294/294 ; lang-overflow 10 langues × 1280 : rien.
- 2026-11-18 (it. 2201, signalé par Victor) : Familiers : le ⓘ de la barre, dernier de la rangée qui défile, passait sous l'ombre du bord
  droit ; placé en tête, après le PNJ (captures 1920 et 1280 px). Seule rangée défilante avec un ⓘ. 294/294.
- 2026-11-18 (it. 2200, demande de Victor) : volumes d'une première installation : effets 10 % (avant 20), ambiance 100 %, musique 20 %
  (avant 50), volume général 50 % ; les sauvegardes existantes gardent leurs réglages. Test mis à jour. 294/294.
- 2026-11-18 (it. 2199, autotest) : la bulle du morceau de musique attendait les 6 s d'installation du jeu ; en dev, window.__musicSettle
  les raccourcit (le jeu distribué garde 6 s) : 7 s → 2,3 s ; autotest 123 → 109 s. 294/294.
- 2026-11-18 (it. 2198, autotest) : SELFTEST_TIMES=1 affiche les 12 vérifications les plus lentes. Deux contrôles instables trouvés
  en route et rendus indépendants du tirage : « boutique, sac plein » (la pièce tirée pouvait ne pas être une amélioration une fois
  la pièce ordinaire posée : l'amélioration est maintenant vérifiée après) et « après une vente, l'objet suivant » (objets au niveau
  record : le Valet d'armes équipait parfois le second ; niveau 1 maintenant). Focus clavier visible du sac et des Compétences :
  déjà couvert (button / .node :focus-visible). Trois passages de suite à 294/294.
- 2026-11-18 (it. 2197, contrôle) : --crawl en russe (462 clics) et en polonais (471) sur dev-data, en russe sur la fin de partie
  (685 clics) après les changements de la nuit : aucune erreur.
- 2026-11-18 (it. 2196) : brouillon du devlog 0.1.7 complété (clavier, Bestiaire, japonais et coréen ; it. 2179-2193).
- 2026-11-18 (it. 2195, nettoyage) : recherche des derniers « second clic pour confirmer » : aucun. Retiré le reste de l'ancienne Voie à
  deux clics (talents.js `armed`, règle CSS `.talent.voie.armed`) ; le contrôle de contraste de l'autotest qui l'utilisait mesure
  maintenant le « choisir › » doré de la voie disponible (`.tvoie.ready`), dans les deux thèmes. Commentaire périmé de skills.js
  corrigé. Mesures de texte (scrollWidth) : seul le Bestiaire en fait (corrigé à l'it. 2190). 294/294.
- 2026-11-18 (it. 2194, contrôle langues) : les 38 libellés d'effets (EFFECTS, talents.js, communs aux talents, compétences,
  maîtrises) dans les 9 langues : aucun ne commence plus par un nombre ou « HP 30 » ; aucune traduction ne colle « % » ou « {n} » à un
  chiffre. Rien d'autre à corriger.
- 2026-11-18 (it. 2193, langues) : suite de l'it. 2192, les 30 libellés de bonus des talents passés en revue dans les 9 langues (libellé
  qui commence par « HP » ou un nombre, collé à la valeur) : seul « +30% 4撃目のダメージ » (samouraï, clé 1970) ; reformulé en japonais
  « 居合の4撃目のダメージ（必ず会心） » et en coréen « 거합 4번째 타격 피해 (항상 치명타) ». 294/294.
- 2026-11-18 (it. 2192, langues) : « dégâts contre les cibles sous 30 % de vie » (clé 1158) en japonais et coréen commençait par
  « HP » : « +65% HP 30% 未満… » se lisait « +65 % PV ». Reformulé « 瀕死の敵（HP 30%未満）へのダメージ » / « 빈사 대상(HP 30% 미만)에게
  주는 피해 » ; capture du total des Talents en japonais. « 30% » collé en pl, pt, ru : usage courant, laissé. 294/294.
- 2026-11-18 (it. 2191, REVUE GÉNÉRALE) : 12 h : guerrier 62, mage 64, rôdeur 65 (habituel) ; --perf (copie neuve) : bande 17,9 %,
  panneau 19,1 %, mini 5,5 %, icône 0,5 % (stable) ; texte en russe (dev-data et fin de partie) : aucun mot non traduit (Esc, Shift,
  Poupouce, Qa / Qi, séparateur « --- attributs » de l'outil) ; captures Aventure (anglais), Talents (japonais), mini (japonais) :
  propres. Rien à corriger.
- 2026-11-18 (it. 2190) Bestiaire : plus aucun nom coupé. Un nom encore trop long en 11 px passe sur deux lignes (entre les mots ;
  fiche de 40 à 46 px) ; mesure refaite une fois les polices chargées (lettres russes arrivées après coup) et au centième de pixel
  (scrollWidth arrondi : « Каменный голе… » dépassait de moins d'un pixel). Fin de partie : 5 noms sur deux lignes en français, 9 en
  russe, 0 coupé. lang-overflow complet (10 langues, 4 largeurs, fin de partie, 130 %, max) : rien. 294/294.
- 2026-11-18 (it. 2189, clavier) : Compétences : les flèches font passer au nœud apprenable le plus proche dans leur direction
  (écart de côté compté double) ; raccourcis : « Talents, compétences et sac : se déplacer » (clé 3325). Autotest (avec seulement
  3 nœuds pris le temps du contrôle, pour avoir des nœuds apprenables : la première version passait à vide). 294/294.
- 2026-11-18 (it. 2187) : durée de l'autotest mesurée : 123 s pour 293 vérifications (≈ 70 s avant la nuit ; les contrôles ajoutés
  attendent chacun quelques centaines de ms). Repère mis à jour dans CLAUDE.md ; loin du délai maximal de 10 min.
- 2026-11-18 (it. 2186) : « Quoi de neuf », édition 141 (fiche des Talents qui garde le survol, flèches dans le sac, aide des Talents ;
  3 nouveautés, 10 langues, clés 3322-3324). 293/293 ; lang-overflow 10 langues × 1280 : rien.
- 2026-11-18 (it. 2185, clavier) : flèches dans le sac (case voisine selon sa position à l'écran, quel que soit le nombre de cases par
  rangée) ; raccourcis : « Talents et sac : se déplacer dans la grille » (clé 3321). Autotest ; 293/293.
- 2026-11-18 (it. 2184, contrôle) : save-fuzz à partir d'une partie 0.1.2 (FUZZ_BASE=0.1.2) après les changements de la nuit :
  1169 corruptions, toutes « ok ».
- 2026-11-18 (it. 2183) : capture de l'onglet Talents dans son état de fin de nuit (1920 px, français) envoyée à Victor.
- 2026-11-18 (it. 2182) : aide ⓘ des Talents : elle cite aussi les flèches (clé 3320) ; recherche de TODO / FIXME dans le code : aucun
  (seulement des dessins en pixels). 292/292.
- 2026-11-18 (it. 2181, revue générale) : perf bande 18,2 %, panneau 18,3 %, mini 5,7 % ; --crawl en russe : 460 clics sans erreur ;
  autotest 292/292 ; hero-table (it. 2177) et lang-overflow complet (it. 2180) récents. Rien à corriger.
- 2026-11-18 (it. 2180, contrôles) : lang-overflow COMPLET (10 langues, 4 largeurs, états max, fin de partie, zoom 130 %) après les
  changements depuis l'it. 2150 (Boutique à sac plein, bonus des maîtrises, résumé d'absence, Héros) : rien.
- 2026-11-18 (it. 2179, Talents, la plainte d'origine) : survoler une voie (sans la cliquer) puis aller vers la fiche pour cliquer
  « Choisir cette voie » : la fiche revenait au talent cliqué en 180 ms et le bouton disparaissait sous le curseur. Entrer dans la fiche
  garde maintenant ce qu'elle montre ; le retour au talent cliqué ne se fait qu'ailleurs. Autotests (garder ; revenir hors de la
  fiche) ; 292/292.
- 2026-11-18 (it. 2178, enquête) : berserker 69 / 69 / 69 au tableau (graines 7, 3, 11) : sur les graines 21, 31, 41, 51 : 65, 65, 64,
  66 (mage 62, 59, 65, 61 ; paladin 69, 64, 61, 64). Moyenne sur 7 graines : 65,9 ; pas un héros trop fort, les trois graines du tableau
  lui sont favorables. Aucun réglage.
- 2026-11-18 (it. 2177, équilibrage) : hero-table 12 h × 3 graines après la voie gratuite et les changements de la nuit : moyenne
  64,6 (64,5 au début de la nuit, 65,0 à l'it. 1825), écart 6,7 zones, berserker en tête (69, déjà vu à l'it. 2090). Stable.
- 2026-11-18 (it. 2176) : brouillon du devlog 0.1.7 complété (Boutique et sac, maîtrises et quêtes, clavier).
- 2026-11-18 (it. 2175) : « Quoi de neuf », édition 140 (ventes enchaînées, quêtes 3 étoiles, flèches des Talents, focus des fenêtres ;
  4 nouveautés, 10 langues, clés 3316-3319). --crawl : 455 clics sans erreur après l'auto-sélection des ventes ; 291/291 ;
  lang-overflow 10 langues × 1280 : rien.
- 2026-11-18 (it. 2174, moins de clics) : après la vente d'un objet depuis son détail, celui qui prend sa place dans le sac est
  sélectionné (ventes enchaînées sans recliquer dans le sac) ; garde-fou : un second « Vendre » à moins de 350 ms d'une vente est
  ignoré (un double clic n'en vend pas deux). Autotest ; 291/291.
- 2026-11-18 (it. 2173, découvrabilité) : la bulle de « Annuler le dernier » (Talents, Compétences) cite son raccourci « (Z) ».
  290/290.
- 2026-11-18 (it. 2172) : docs/POUR-VICTOR.md complété (sac plein à la Boutique, bonus des maîtrises, clavier, confirmations des
  objets et quêtes précieux) ; éditions 136 à 139.
- 2026-11-18 (it. 2171, revue générale) : perf bande 18,1 %, panneau 19,1 %, mini 5,6 % ; lang-overflow 10 langues × 3 largeurs :
  rien. --crawl tombé à ≈ 400 clics : il ne refermait pas la fenêtre de confirmation (mauvais sélecteur) et VALIDAIT ensuite son
  bouton (confirm-ok cliqué comme les autres) ; corrigé (confirm-cancel, confirm-ok/-cancel exclus) : ≈ 500-530. Comparé par onglet à
  798d47d5 (670) : l'écart venait des 300 clics « Changer » des quêtes en boucle (arrêtée par la confirmation des quêtes 3 étoiles) ;
  Bestiaire et Carte mieux couverts (65 et 59 contre 31 et 23). Repère mis à jour dans CLAUDE.md.
- 2026-11-18 (it. 2170, accessibilité) : la grande fenêtre (Quoi de neuf, raccourcis, résumé d'absence…) rend aussi le focus à
  l'élément d'avant quand elle se ferme (Échap, « Continuer », clic sur le fond : closeModal). Autotest ; 290/290.
- 2026-11-18 (it. 2169, accessibilité) : à la fermeture d'une fenêtre de confirmation, le focus revient au bouton qui l'a ouverte
  (au clavier, on ne perd plus sa place). Autotest ; 289/289.
- 2026-11-18 (it. 2168, accessibilité) : une fenêtre ouverte (confirmation, grande fenêtre) garde le focus : Tab et Maj + Tab bouclent
  sur ses boutons au lieu de passer aux boutons du panneau caché derrière. Autotest ; 288/288.
- 2026-11-18 (it. 2167, clavier) : Talents : les flèches déplacent le focus dans la grille (↑ ↓ dans la branche, ← → vers la branche
  voisine au même rang) ; la fiche suit (it. 2129). Ligne ajoutée aux raccourcis clavier (clé 3315 ; fenêtre sans défilement en ru et
  de à 1280 px). Autotest ; 287/287.
- 2026-11-18 (it. 2166, langues) : i18n-names après les ajouts de la nuit : 25 écarts, tous anciens (déclinaisons, faux positifs
  grammaticaux) ; aucun dans les clés de la nuit (3200 et plus).
- 2026-11-18 (it. 2165, clavier) : Échap avec un objet sélectionné (Aventure) revient d'abord au sac ; un second Échap ferme le panneau
  (avant : le panneau se fermait directement). Autotest ; 286/286.
- 2026-11-18 (it. 2164, contrôles) : début de partie après les changements de la nuit : first-minutes (première récompense < 90 s,
  onglet Talents à 70-82 s) ; early-pace : à 60 min, niveau 39-41, zone 23-25, 6,3 déblocages. Rien d'anormal.
- 2026-11-18 (it. 2163) : CLAUDE.md : dosage des confirmations (seulement le précieux et sans retour ; gestes courants d'un clic)
  et achat à sac plein. Bulle de « Reforger » relue : elle dit déjà ce qui change et ce qui est gardé.
- 2026-11-18 (it. 2162, ergonomie) : quêtes : « Changer » une quête 3 étoiles (rare, une sur dix, belle récompense) demande
  confirmation ; les autres se changent d'un clic. Clés 3312-3314 ; autotest (Annuler la garde) ; 285/285.
- 2026-11-18 (it. 2161, revue générale) : perf bande 18,3 %, panneau 19,3 %, mini 5,7 % ; simulations 12 h : lancier 62, assassin 60,
  artificier 62 (habituels) ; --crawl en polonais après 2 h d'absence : sans erreur. Rien à corriger.
- 2026-11-18 (it. 2160, contrôle) : Talents refaits vus avec la partie de fin de partie (voie choisie, 129 points libres, maîtrises à 0) :
  états lisibles (voie « choisie », l'autre grisée, maîtrises cliquables en vert avec « tout »). Rien à corriger.
- 2026-11-18 (it. 2159, plaisir de revenir) : résumé d'absence : « Laissés au sol (sac plein) » porte au survol le remède quand la
  vente automatique est débloquée mais rien n'est coché (« Astuce : dans le sac (Aventure), coche la vente automatique… »). Clé 3311 ;
  i18n-paths 19 onglets cités, 0 écart ; vérifié en jeu.
- 2026-11-18 (it. 2158) : « Quoi de neuf », édition 139 (amélioration à sac plein, garder les bonus des maîtrises, noms du Bestiaire,
  ⓘ au clavier ; 4 nouveautés, 10 langues, clés 3307-3310). 284/284 ; lang-overflow 10 langues × 1280 : rien.
- 2026-11-18 (it. 2157, moins de clics) : maîtrises : « Garder les bonus actuels » dans la fenêtre de choix valide tels quels les
  paliers en attente (A par défaut) ; le rappel « 18 paliers : choisis leurs bonus » (À faire, résumé d'absence) s'éteignait seulement
  palier par palier. game.keepMasteryPicks ; clés 3305-3306 ; test logique (bonus inchangés) ; sans défilement en de et ru à 1280 ;
  --crawl 676 clics et save-fuzz 1267 corruptions propres après les changements d'achat ; 360 tests, 284/284.
- 2026-11-18 (it. 2156) : « À faire » (carte du héros, résumé d'absence) : l'amélioration du marchand est aussi proposée à sac plein
  quand elle s'achète quand même (canBuyWhenFull), et achetée par le même chemin que la Boutique (buyAndEquip → buyFromShop : ancienne
  pièce vendue, sac jamais débordé). Test logique ; 359 tests, 284/284.
- 2026-11-18 (it. 2155) : Boutique, sac plein : la bulle d'une amélioration dit avant le clic quelle pièce sera vendue (« sac plein,
  l'ancienne pièce sera vendue : … », tournure sans accord). Clé 3304 ; autotest (la bulle mentionne la vente) ; 284/284.
- 2026-11-18 (it. 2154, CORRECTION de l'it. 2153) : à sac plein, l'amélioration achetée faisait déborder le sac (25 / 24) quand
  l'emplacement était occupé (l'ancienne pièce s'y ajoutait ; le test logique avait un emplacement vide). Maintenant, comme le
  Marchand attitré (it. 738) : l'ancienne pièce est vendue ; achat refusé (« Sac plein ») si elle est précieuse (légendaire,
  panoplie, forgée : jamais vendue sans confirmation). game.canBuyWhenFull ; tests logique et autotest (achat d'un clic, sac qui
  reste plein) ; 284/284.
- 2026-11-18 (it. 2153, moins de clics) : Boutique, sac plein : une amélioration du Marchand s'achète quand même (équipée aussitôt,
  l'ancienne pièce prend sa place dans le sac, qui reste plein) ; avant, « Sac plein » bloquait justement l'objet à porter. Les autres
  objets restent bloqués. Test logique ; npm test 359, autotest 283/283.
- 2026-11-18 (it. 2152) : brouillon du devlog 0.1.7 complété (retour d'absence, clavier, lisibilité) ; idées en attente du journal
  relues : rien d'ouvert qui ne dépende de Victor.
- 2026-11-18 (it. 2151, revue générale) : simulations 12 h : berserker 69, prêtresse 64, samouraï 65 ; perf bande 18,5 %, panneau
  18,5 %, mini 5,6 % ; --crawl en allemand : 677 clics sans erreur ; texte coréen : aucun mot non traduit. Rien à corriger.
- 2026-11-18 (it. 2150, contrôles) : lang-overflow COMPLET (10 langues, 4 largeurs, états max, fin de partie, zoom 130 %) après les
  changements depuis l'it. 2135 : rien. Focus des ⓘ : contour déjà donné par [tabindex]:focus-visible.
- 2026-11-18 (it. 2149, clavier) : les ⓘ (aides passées en bulle cette nuit, et les anciennes) prennent le focus (tabindex 0, role
  note) : au clavier, Tab les atteint et leur bulle s'affiche (focusin, it. 853) ; avant, leur aide était inaccessible sans souris.
  Autotest ; 283/283.
- 2026-11-18 (it. 2148, cohérence) : la réinitialisation des talents se confirme dans la fenêtre du panneau, comme les autres actions
  sans retour (it. 2099 : dans la fiche, seule de son espèce) ; code de la confirmation dans la fiche et branche Échap retirés.
  Autotest réécrit (fenêtre, Annuler, Échap, Tout réinitialiser) ; 282/282.
- 2026-11-18 (it. 2147, contrôles) : Réglages vus en capture : propres (zone de danger à part, confirmation). fuzz sous toutes les
  bénédictions du jour : 1200 parties, 0 bloquées ; stall-check idem : 60 parties, 0 figées. Audit d'ergonomie : tous les onglets vus.
- 2026-11-18 (it. 2146) : onglet Héros : la phrase « N / 20 héros libérés. On change de héros… » (une règle ; le nombre est sur le
  sous-onglet) passe dans un ⓘ à côté des sous-onglets ; la note du duo (ce qu'apporte le compagnon) reste. Une ligne de moins en haut
  de l'onglet. 283/283 ; lang-overflow 10 langues × 1280 / 1920 : rien.
- 2026-11-18 (it. 2145, lisibilité) : Bestiaire : un nom trop long pour sa fiche passe en 11 px (taille déjà employée sur la fiche,
  même hauteur de ligne) au lieu d'être coupé : 19 noms entiers de plus en français (« Élémentaire de feu », « Grenouille toxique »),
  4 encore coupés (nom au survol) ; en allemand, 1. Mesure à l'image suivante, onglet affiché seulement. 283/283 ; lang-overflow
  10 langues × 1280 / 1920 : rien.
- 2026-11-18 (it. 2144) : mode mini au retour d'absence vu en capture (ru, fr) : point d'astuce avec le résumé au survol, comme prévu.
  docs/POUR-VICTOR.md : ce qui reste à essayer sous Windows après la nuit (Talents à la souris et au clavier, confirmations, retour
  d'absence).
- 2026-11-18 (it. 2143, plaisir de revenir) : résumé d'absence au pire cas (tous les gains et automatismes : 21 lignes) : 193 px de
  défilement en russe à 1280 px. Bilan de plus de 11 lignes sur deux colonnes, fenêtre jusqu'à 1150 px, « À faire maintenant » en
  colonne fixe de 320 px aux boutons resserrés : 0 px en russe, français et allemand. Autotest du pire cas ; 283/283.
- 2026-11-18 (it. 2142) : « Quoi de neuf », édition 138 (retour d'absence, Talents au clavier, Compétences ; 4 nouveautés, 10 langues,
  clés 3300-3303). Trois éditions = 14 nouveautés : la fenêtre défilait de 11 px en fin de partie à 1280 px ; liste compacte dès 13
  (avant : au-delà de 14). Résumé d'absence : 7 px de trop dans l'autotest (plus de lignes que dans la capture) : interlignes resserrés.
  Talents à 1366 px vus en capture : propres. 282/282 ; lang-overflow 10 langues × 1280 : rien.
- 2026-11-18 (it. 2141, revue générale) : simulations 12 h : mage 64, rôdeur 65, nécromancien 63 ; perf bande 18,4 %, panneau 19,5 %,
  mini 5,6 % ; --crawl en japonais après une absence de 3 h (résumé d'absence ouvert au passage) : 676 clics sans erreur. Rien à corriger.
- 2026-11-18 (it. 2140) : résumé d'absence : meilleur butin ni dans le sac ni porté (vendu, sac plein) : « Épique · pas gardé » au lieu de
  « Épique » seul (on cherchait l'objet). Clé 3299 ; 282/282.
- 2026-11-18 (it. 2139, plaisir de revenir) : résumé d'absence (« Pendant ton absence ») sur deux colonnes dans la grande fenêtre :
  bilan à gauche, « À faire maintenant » à droite. Avant : une colonne de 420 px, 816 px de contenu pour 457 visibles, les actions
  (quêtes, bonus, points, déblocage, sac plein…) sous le pli. Sans défilement en français à 1920 et en russe à 1280 ; autotest ;
  282/282.
- 2026-11-18 (it. 2138, plaisir de revenir) : « Depuis ta dernière visite » (carte du héros) couvre aussi l'absence hors ligne : photo
  des compteurs prise au démarrage AVANT la progression hors ligne, datée de la dernière sauvegarde (avant : rien après un redémarrage,
  la photo ne se prenait qu'à la fermeture du panneau ; la bulle ne dure que 15 s). Capture : « 6 h 0 min · +29,35 Md or · 183 monstres
  · 1 coffre » à l'ouverture 22 s après le lancement. Autotest ; 281/281.
- 2026-11-18 (it. 2137, plaisir de revenir) : retour après une absence : la bulle « Pendant ton absence… » est masquée dès que le panneau
  s'ouvre, et le panneau ouvert au lancement n'avait aucun résumé (photo prise seulement à sa fermeture) : ouvrir le panneau autrement
  que par la bulle la perdait. Le panneau ouvert pendant la bulle ouvre maintenant le résumé détaillé. Autotest adapté (il ouvre le
  panneau pendant cette bulle : contrôle « le résumé détaillé s'est ouvert ») ; 280/280.
- 2026-11-18 (it. 2136, contrôles) : thème clair des ajouts de la nuit (ligne « Vendre les inutiles », grille des bonus de maîtrise) :
  lisibles ; save-fuzz après la voie gratuite : 1267 corruptions (dev-data) et 1225 (fin de partie), toutes « ok ». Rien à corriger.
- 2026-11-18 (it. 2135) : lang-overflow COMPLET (états max et zoom 130 %, sautés toute la soirée) : la fiche d'une maîtrise
  défilait (4 à 25 px, fin de partie à 1600 px et à 130 %) : « ↶ Annuler le dernier » passait sous « Réinitialiser » ; libellé masqué
  dans un panneau de moins de 1600 px (flèche seule, nom dans la bulle). Contrôle talents-2lignes : seuil relatif (1,4 × la ligne la
  plus basse ; 48 px fixes donnaient de faux défauts à 130 %). Relance complète : rien ; 279/279. Aventure d'un nouveau joueur : rien.
- 2026-11-18 (it. 2134, début de partie) : Compétences : « Annuler le dernier » et « Tout réinitialiser » grisés tant qu'aucun nœud
  n'est pris (ils semblaient cliquables et ne faisaient rien). Capture d'un nouveau joueur (niveau 12) ; 279/279.
- 2026-11-18 (it. 2133, début de partie) : Talents d'un nouveau joueur (niveau 12) vus en capture : le titre « Total des talents »
  s'affichait seul, sans pastille (grille basse, aucune ne tenait) ; il se cache alors. Le reste se lit bien (« Au clic : +10 rangs →
  +30 % attaque », paliers verrouillés « 🔒 5 »). 279/279.
- 2026-11-18 (it. 2132, mémoire, CORRECTION de l'it. 2130) : la « bulle Quoi de neuf à +30-60 Mo » était du bruit. La bulle seule,
  rejouée par --stage : 618 puis 568 Mo ; avec une couche à part : 579 puis 622 Mo. mem-watch est bimodal (≈ 570 ou ≈ 625 Mo, même
  code) : la dichotomie à une mesure par commit avait désigné à tort l'édition 137. Rien à corriger dans le jeu ; avertissement écrit
  dans mem-watch.sh et CLAUDE.md (alterner plusieurs exécutions par commit).
- 2026-11-18 (it. 2131, revue générale) : simulations 12 h : guerrier 62, paladin 65, assassin 60 ; perf bande 18,1 %, panneau 19,5 %,
  mini 5,6 %, icône 0,5 % ; mode mini en français, anglais et coréen : lisible ; texte japonais (--dump-text) : aucun mot non traduit
  (HP, Lv, pt, Shift, BGM voulus). Rien à corriger.
- 2026-11-18 (it. 2130, mémoire) : mem-watch donnait 632 Mo (contre 589 avant la soirée) ; dichotomie par worktree : le saut vient de
  l'édition 137, pas du code : dev-data a des éditions non lues, et la bulle « Quoi de neuf » du lancement laisse 30 à 60 Mo de plus
  pendant toute la mesure (625 contre 595 avec les éditions lues). mem-watch.sh marque désormais les éditions lues dans sa copie
  (MEM_NEWS=1 pour l'ancien comportement) : 593 Mo, plat. Piste notée dans Idées.
- 2026-11-18 (it. 2129, clavier) : Talents : la fiche suit aussi le talent qui reçoit le focus (Tab) et y reste ; le focus rendu par le
  programme après un redessin ne la déplace pas (le survol en cours la garde). Autotest (focusin envoyé à la main : la fenêtre --ghost
  n'a pas le focus du système) ; 279/279.
- 2026-11-18 (it. 2128) : « Quoi de neuf », édition 137 (annuler le dernier clic et touche Z, vendre sur place à sac plein, vente des
  objets précieux confirmée, clic sur le fond, Compétences et bonus de maîtrise ; 5 nouveautés, 10 langues, clés 3294-3298). Fenêtre au
  pire cas sans défilement ; lang-overflow 10 langues × 1280 / 1920 : rien ; 278/278.
- 2026-11-18 (it. 2127, ergonomie) : vendre un objet précieux (légendaire, pièce de panoplie, forgé) depuis son détail se confirme
  (« Vendre … ? », la vente est définitive) ; les objets ordinaires se vendent toujours d'un clic. Clés 3292-3293 ; autotest ; --crawl
  672 clics sans erreur ; stall-check 60 parties 0 figées, fuzz 1200 parties 0 bloquées ; 278/278.
- 2026-11-18 (it. 2126) : Échap annule « Réinitialiser les talents ? » (dans la fiche) au lieu de fermer le panneau ; autotest ajouté.
  CLAUDE.md : conventions d'ergonomie de la nuit (panel.confirm et this.panel, confirmSafe, clic sur le fond, rien ne bouge sous le
  curseur, fiche des Talents qui revient au talent cliqué). 277/277.
- 2026-11-18 (it. 2125, design des Talents) : fenêtre des bonus de maîtrise en grille (rang | option A | option B), alignée d'un
  palier à l'autre (avant : deux boutons poussés à droite, B passait à la ligne selon la longueur). Sans défilement en allemand et en
  russe à 1280 px ; 276/276.
- 2026-11-18 (it. 2124, ergonomie) : fermeture d'une fenêtre par le fond seulement si l'appui aussi était sur le fond (appuyer dans
  la fenêtre pour sélectionner un texte et relâcher dehors la fermait). Autotest ajouté ; 276/276.
- 2026-11-18 (it. 2123, ergonomie) : un clic sur le fond d'une fenêtre la ferme : la confirmation est annulée (jamais validée), la
  grande fenêtre (Quoi de neuf, raccourcis, détails) se referme ; un clic dans le cadre ne change rien. Autotest ajouté. Contrôle
  « effet de l'événement au survol » rendu indépendant du tirage (il lisait la première pastille, parfois un autre événement en cours) ;
  275/275.
- 2026-11-18 (it. 2122) : fenêtres de confirmation vues en capture (Ascension en allemand, effacement de la partie sombre et clair,
  1280 px) ; dans celle de l'effacement, « Annuler » prend l'aspect du bouton par défaut (Entrée y annule), « Tout effacer » reste
  rouge. Bestiaire : cartes plus larges écartées (8e rangée à 1920 px). Autotest 274/274.
- 2026-11-18 (it. 2121, revue générale) : simulations 12 h : guerrier 62, mage 64, rôdeur 65 (voie gratuite sans effet notable) ;
  perf bande 18,4 %, panneau 19,1 %, mini 5,6 %, icône 0,6 %. Captures des Talents en anglais et japonais : le bouton « ↶ Annuler »
  disait « Cancel » / « キャンセル » (clé « Annuler » = fermer une fenêtre) : il prend « Annuler le dernier » (Undo last), comme les
  Compétences. lang-overflow 10 langues × 3 largeurs : rien ; 274/274.
- 2026-11-17 (it. 2120) : --crawl en français et en russe après les nouvelles fenêtres de confirmation : 671 clics sans erreur ;
  texte russe (--dump-text) : aucun mot non traduit. Aide ⓘ des Talents complétée (Maj + clic : un rang ; Z : annuler le dernier
  clic ; clé 3291). Autotest 274/274.
- 2026-11-17 (it. 2119, clavier) : touche Z : annule le dernier choix dans les Talents (dernier clic) et les Compétences (dernier
  nœud). Raccourcis clavier : le libellé des Talents disait l'inverse (« monter au maximum » pour Maj, qui n'ajoute qu'un rang) ;
  corrigé. Clés 3289-3290 ; fenêtre des raccourcis sans défilement (ru, de, pl, fr à 1280 px) ; autotest « touche Z » ; 274/274.
- 2026-11-17 (it. 2118, ergonomie) : Aventure : l'aide de l'en-tête « Équipement », coupée en plein mot à 1920 px (« détails e… »),
  passe dans un ⓘ. Audit des autres onglets noté dans docs/TALENTS-UX.md. lang-overflow 10 langues × 1280 / 1920 : rien ; 273/273.
- 2026-11-17 (it. 2117, ergonomie) : Boutique, sac plein : ligne « Sac plein · Vendre les inutiles (N) » sous l'en-tête du Marchand
  (même confirmation que dans le sac) ; avant, chaque objet affichait « Sac plein » et il fallait passer par l'Aventure puis revenir.
  Clé 3288 ; autotest « demande confirmation sur place » ; lang-overflow 10 langues × 1280 / 1920 : rien ; 273/273.
- 2026-11-17 (it. 2116, ergonomie) : Compétences : les boutons (Annuler le dernier, Tout réinitialiser, Recentrer) remontent sous la
  dépense automatique, visibles sans défiler (avant : coupés en bas de la colonne, sous deux paragraphes d'aide) ; l'aide passe dans
  le ⓘ du titre et dans la bulle du bouton automatique. lang-overflow 10 langues × 1280 / 1920 : rien ; 272/272.
- 2026-11-17 (it. 2115, ergonomie des Talents) : « ↶ Annuler » rend gratuitement les points du dernier clic sur un talent (un clic
  dépense jusqu'à tous les points libres, sans retour jusqu'ici) ; refusé si un palier serait perdu. Test logique et autotest ;
  lang-overflow 10 langues × 3 largeurs : rien ; 272/272. Brouillon du devlog 0.1.7 complété (Talents, confirmations).
- 2026-11-17 (it. 2114) : « Quoi de neuf », édition 136 (refonte des Talents, voie, confirmations dans une fenêtre ; 5 nouveautés, 10
  langues, clés 3281-3285). Traductions de la soirée alignées sur les mots du jeu (ja 天賦, ko 특성, ru навыков). lang-overflow
  10 langues × 1280 / 1920 : rien ; autotest 271/271.
- 2026-11-17 (it. 2113, ergonomie) : Réglages : « Effacer la partie et recommencer » se confirme dans la fenêtre du panneau (bouton
  rouge « Tout effacer », liste de ce qui est perdu) au lieu d'un second clic sur le même bouton ; dans cette fenêtre, Entrée ANNULE
  (avant, Entrée validait toujours). Clés 3278-3280 ; autotest « Entrée annule » ; 271/271.
- 2026-11-17 (it. 2112, ergonomie) : Compétences : « Tout réinitialiser » et « Réinitialiser le grand graphe » se confirment dans la
  fenêtre du panneau (ce qui revient, ce qui reste) au lieu d'un second clic sur le même bouton. Clés 3274-3277 ; autotest
  « demande confirmation, Annuler ne change rien » ; 270/270.
- 2026-11-17 (it. 2111, signalé par Victor : lag au survol, détail de la voie) : la fiche des Talents suit le survol sans délai et
  revient au talent cliqué hors des talents (180 ms) ; fiche d'une voie : effets chiffrés ; ligne « Une voie est disponible » retirée ;
  coche compacte au maximum (« ✓ » seul pour un ultime : nom russe sur deux lignes à 1280 px). lang-overflow : état « talents au
  maximum, voie montrée » et lignes de talent sur deux lignes (talents-2lignes). Autotest du survol réécrit ; 269/269.
- 2026-11-17 (it. 2110, revue du design des Talents) : à 1920 px, une rangée du « Total des talents » restait coupée à mi-hauteur
  (mesurée avant la fin de la mise en page) ; mesure refaite à l'image suivante et après les polices. Autotest « total des talents sans
  pastille coupée » ; 269/269.
- 2026-11-17 (it. 2109, design des Talents) : pastilles des maîtrises : choix en attente en contour doré avec un point (avant : trois
  aplats jaunes qui criaient ensemble), choix fait en gris discret, aplat au survol. Captures sombre et clair ; autotest 268/268.
- 2026-11-17 (it. 2108, design des Talents) : « Total des talents » sous le détail de la fiche (pastilles sobres, attaque, PV et défense
  d'abord ; liste complète au survol) : l'encadré restait vide pour un talent au maximum et le total n'était affiché nulle part. Place
  restante seulement, pastilles qui ne tiennent pas masquées. Clés 3272-3273 ; lang-overflow 10 langues × 3 largeurs : rien ; 268/268.
- 2026-11-17 (it. 2107, design des Talents) : fiche de gauche : case puis bouton sur une ligne, bouton retiré quand la dépense est
  automatique (il restait grisé) ; détail dans un encadré qui remplit la colonne, alignée sur la hauteur de la grille. lang-overflow
  10 langues × 3 largeurs : rien (après marges resserrées sous 1366 px) ; autotest 268/268.
- 2026-11-17 (it. 2106, design des Talents) : Voie disponible et pas encore choisie : ses lignes passent à l'or (cadre, trait à gauche,
  « choisir › ») ; avant, un « choisir » gris qu'on ne remarquait pas. Captures sombre et clair ; autotest 268/268.
- 2026-11-17 (it. 2105, design des Talents, Victor : « le design est toujours pourri ») : code d'état des lignes. Avant, presque toutes
  avaient le même cadre vert ; seules les cliquables le gardent (trait à gauche), au maximum : coche et fond calme, en cours : barre de
  rang au pied. Captures sombre et clair ; autotest 268/268.
- 2026-11-17 (it. 2104, signalé par Victor) : avec « À chaque niveau, dépenser tout seul », aucun point n'était jamais libre et la voie
  restait impossible à choisir ; la voie est maintenant gratuite (elle demande 30 points dépensés, plus un point libre ; une voie déjà
  choisie rend son point). Test logique « voie gratuite » ; npm test 357, autotest 268/268.
- 2026-11-17 (it. 2103, demande de Victor : « je veux plus voir ce bouton ici ») : fiche d'une maîtrise : le bouton « ▶ choisir · N »
  de la ligne « Paliers atteints » est retiré (le nombre seul, détail au survol) ; la pastille « Choisir un bonus » / « Bonus » de la
  maîtrise ouvre la fenêtre de choix directement (avant, elle cliquait ce bouton). Autotest du choix de bonus adapté ; 268/268.
- 2026-11-17 (it. 2102, ergonomie) : Ascension : confirmation dans la fenêtre du panneau (« Monter vers les étoiles ? », ce qu'on perd et
  ce qu'on gagne) au lieu d'un second clic sur le même bouton (un double clic involontaire lançait l'ascension ; le libellé armé ne se
  remettait pas). Les onglets reçoivent le panneau (t.panel). Autotest « le bouton demande confirmation » ; 268/268.
- 2026-11-17 (it. 2101, revue générale) : --crawl (points libres en plus, nouveaux boutons des Talents compris) : 675 clics sans
  erreur ; perf bande 18,5 %, panneau 19,5 %, mini 5,4 %. Rien à corriger.
- 2026-11-17 (it. 2100, Talents, étape 7 : revue) : talents verrouillés « 🔒 20 » (l'unité au survol, les paliers sur la jauge) :
  en allemand à 1280 px, les ultimes ne passent plus sur deux lignes. lang-overflow 10 langues × 3 largeurs : rien ; autotest 267/267.
- 2026-11-17 (it. 2099, Talents, étape 6) : « Réinitialiser » effaçait tout l'arbre (maîtrises et voie comprises) en un seul clic ;
  il demande maintenant confirmation dans la fiche (« Tout réinitialiser » / « Annuler »), loin du bouton. Clés 3268-3269. Capture de
  1280 ; autotest « réinitialiser demande confirmation » ; 267/267.
- 2026-11-17 (it. 2098, Talents, étape 5) : jauge des paliers sous le titre de chaque branche (points, repères 5 / 10 / 20 ; au survol,
  ce qui manque pour le prochain). Clés 3266-3267. Captures sombre et clair ; lang-overflow 10 langues × 1280 / 1366 / 1920 : rien ;
  autotest 266/266.
- 2026-11-17 (it. 2097, Talents, étape 4) : la fiche dit ce qu'un clic va faire : « Au clic : +8 rangs → +30 % attaque » (avant :
  « Rang suivant : +3 % », alors qu'un clic en ajoutait jusqu'à 8). Clés 3264-3265 (pluriels ru, pl). Captures fr 1920, ru 1280.
  Autotest 266/266.
- 2026-11-17 (it. 2096, Talents, étape 3) : Voie : un clic sur la ligne la montre dans la fiche ; elle se choisit par le bouton
  « Choisir cette voie (définitive) » (avant : deux clics au même endroit, le libellé changeant en « cliquer encore pour
  confirmer »). Captures ru / de à 1280 px ; autotest « un clic montre la voie, le bouton de la fiche la choisit » ; 266/266.
- 2026-11-17 (it. 2095, Talents, étape 2) : pastilles à emplacement fixe : « +1 », « tout », « Choisir un bonus » / « Bonus » ne
  naissent ni ne disparaissent plus d'un clic à l'autre (invisibles et sans action hors d'usage ; les deux libellés du bonus
  superposés) ; Maj + clic ignore l'emplacement invisible. Le « → 800 » des maîtrises, caché dès qu'une pastille « tout » existait,
  dépend maintenant de la largeur du panneau. Captures fr 1920 / de 1280 ; lang-overflow 10 langues × 4 largeurs : rien.
  Autotest 265/265.
- 2026-11-17 (it. 2094, demande de Victor : refonte ergonomique de l'onglet Talents, sur plusieurs itérations ; plan et audit :
  docs/TALENTS-UX.md) : intention de survol : la fiche de gauche ne suit un talent qu'après 140 ms de pause dessus (avant :
  aussitôt, et pour aller cliquer dans la fiche, la souris traversait d'autres talents qui la changeaient en route) ; un clic la
  fixe toujours. Mise en scène : traversée de trois talents à 40 ms → fiche inchangée ; pause → fiche du talent. Autotest
  « talents : traverser la grille ne change pas la fiche » ; 265/265.
- 2026-11-17 (it. 2093) : autotest « le boss d'une nouvelle série apparaît en fondu » (alpha < 0,5 juste après, 1 après 1,5 s).
  Autotest 264/264.
- 2026-11-17 (it. 2092) : bande, nouvelle série : le boss (exclu de l'arrivée en courant, it. 1996) surgissait d'un coup au bout de
  la file ; il apparaît en fondu (0,8 s ; relevé : 0 → 0,125 → … → 1). Effets réduits : comme avant. Autotest 263/263.
- 2026-11-17 (it. 2091, revue générale) : mémoire 569-572 Mo, stable ; save-fuzz FUZZ_BASE=0.1.2 ok (1 169 corruptions). Rien à
  corriger.
- 2026-11-17 (it. 2090, enquête) : berserker 77 / 62 / 69 en 12 h (it. 2074) : mêmes courses jusqu'au mur des zones 61-62 ; la
  graine 7 a le temps d'une 9e course qui franchit le mur et file jusqu'à 77 (palier suivant). Effet des paliers (CLAUDE.md), pas un
  emballement propre au berserker. Rien à corriger.
- 2026-11-17 (it. 2089, vérification) : piste « renforce tes reliques » hors de la carte de la zone : info-bulle du mode mini (texte
  libre) et bulle d'alerte de la bande (deux pistes) : rien ne peut déborder. Rien à corriger.
- 2026-11-17 (it. 2088) : POUR-VICTOR : ce qui a changé depuis la 0.1.6, à regarder en jouant.
- 2026-11-17 (it. 2087, vérification) : bande, victoires ordinaires : relevé toutes les 50 ms, le vaincu est caché (cadavre à part),
  les autres gardent leur place, aucun saut. Rien à corriger.
- 2026-11-17 (it. 2086) : Quoi de neuf, édition 135 (passages fluides : mode mini ; bande après une défaite), clés 3260-3261
  traduites. npm test 356, autotest 263/263, lang-overflow : aucun défilement.
- 2026-11-17 (it. 2085, bogue de la bande trouvé en vérifiant le mode mini) : héros à terre : le monstre VAINQUEUR sautait hors de
  l'écran pour revenir en courant, et le premier vaincu réapparaissait d'un coup à sa place (boucle de l'it. 1994 décalée d'un rang :
  places S.kills + 1 … prevKills au lieu de S.kills … prevKills − 1). Relevé : le loup vainqueur reste à 432-456, l'ours vaincu
  revient de 1950 à 261. Autotest « héros à terre, les vaincus reviennent du bord » (true true false). Autotest 263/263.
- 2026-11-17 (it. 2084) : CLAUDE.md : passages du mode mini et façon de les mesurer ; brouillon du devlog 0.1.7 complété.
- 2026-11-17 (it. 2083) : mode mini : le héros vaincu, le monstre vainqueur disparaissait d'un coup ; il s'efface en 0,45 s (relevé :
  0,875 → 0,125). Après une victoire, rien ne change (le cadavre est déjà effacé). Autotest 262/262.
- 2026-11-17 (it. 2082) : mode mini, après une défaite : le monstre en attente, caché pendant que le combattant approchait,
  réapparaissait d'un coup à sa place ; il revient maintenant en glissant du bord (relevé : 207 → 198 → … → 180). Autotest 262/262.
- 2026-11-17 (it. 2081, revue générale) : --crawl en polonais : 674 clics sans erreur ; texte allemand : aucun mot français (« des »,
  « du » : allemands). Perf, mémoire, équilibrage mesurés aux it. 2071-2080. Rien à corriger.
- 2026-11-17 (it. 2080, contrôle) : perf après les retouches du mode mini (it. 2071-2079) : bande 18,0 %, panneau 19,1 %, mini 5,6 %
  (5,4-5,6 avant). Rien à corriger.
- 2026-11-17 (it. 2079, suite du signalement de Victor) : mode mini : un combattant qu'on n'a pas vu attendre (premier de la série,
  gobelin, Poupouce) entre par le bord droit, comme sur la bande, au lieu de surgir au milieu de la scène en fondu ; et le relais
  depuis la place d'attente est reconnu dès la première image (relevé : 162 à demi effacé, puis 153… ; avant, une image à x 132
  invisible). « Effets complets » décoché : comme avant. Autotest 262/262 (premier x : 162).
- 2026-11-17 (it. 2078, vérification) : retour après 8 h d'absence (copie de dev-data) : la bulle « Pendant ton absence (8 h) : 244
  monstres, +29,06 Md or. Cliquer pour le détail. » s'affiche sur la bande (pas avec --open-panel, normal). Rien à corriger.
- 2026-11-17 (it. 2077) : Quoi de neuf, édition 134 (mode mini : monstre suivant fluide, boss en attente), clés 3258-3259
  traduites. npm test 356, autotest 262/262, lang-overflow : aucun défilement.
- 2026-11-17 (it. 2076, vérification) : mode mini, boss en attente vu en capture en zone 150 (Chevalier de l'éclipse, son dessin,
  contour pâle) et 300 (écho de la Reine, contour spectral). Rien à corriger.
- 2026-11-17 (it. 2075) : mode mini : pendant le dernier monstre de la série, le boss attend au fond de la scène, à demi effacé
  (couronne ; lieutenant ou Briseur : leur dessin ; écho : contour spectral), puis s'avance de là (passage de l'it. 2071) ;
  relevé : boss à 162 pendant que le cadavre s'efface, puis 156 → 51 ; capture : golem couronné au fond. Autotest 262/262.
- 2026-11-17 (it. 2074, contrôle) : hero-table 12 h, 20 héros, graines 7/3/11 : moyenne 64,5 (comme à l'it. 1970), de 62,3
  (nécromancien) à 65,7 (moine, gardien stellaire) ; berserker 69,3 tiré par une graine (77 / 69 / 62 : sa variance connue).
  Rien à corriger.
- 2026-11-17 (it. 2073) : README : climat des zones, ordre des règles de la file, lieutenants et Briseur plus coriaces, monstre
  suivant du mode mini.
- 2026-11-17 (it. 2072) : autotest « mode mini : le monstre suivant s'avance depuis sa place d'attente » (bogue de l'it. 2071) :
  première image visible du combattant à x 156 ; avec l'ancien mini.js, 129 : échec, comme attendu. Autotest 262/262.
- 2026-11-17 (it. 2071, signalé par Victor : mode mini, « on voit l'ancien monstre, c'est pas smooth ») : à la victoire, la file avance
  aussitôt : le monstre en attente au fond disparaissait pendant la marche, puis le combattant surgissait plus à gauche (x 132 au lieu
  de 162) en partant de l'invisible. Le monstre en attente reste maintenant à sa place jusqu'à son combat (3 s au plus), puis le
  combattant part de cette place et de sa demi-transparence (relevé toutes les 50 ms : 162 → 153 → … → 51, sans trou). Revue générale
  (même itération) : 12 h guerrier 63, mage 65, samouraï 63 ; bande 18,5 %, panneau 18,7 %, mini 5,4 % ; mémoire 605 Mo.
  Autotest 261/261.
- 2026-11-17 (it. 2070) : Quoi de neuf, édition 133 (carte de la zone : vrai boss ; piste « renforce tes reliques » ; pourcentages
  collés en en, zh, ja, ko), clés 3255-3257 traduites. lang-overflow a retrouvé 7 px en russe à 1280 px (zones 200 et 300, héros
  bloqué) selon l'or et l'usure du boss de dev-data : face au Briseur et aux échos (quatre capacités), la carte ne donne qu'une
  piste, « renforce tes reliques » remonte juste après « équipe le meilleur », et la ligne des pistes tient en deux lignes au plus
  (texte entier au survol). 10 langues à 1280 et 1366 px : aucun défilement ; autotest 261/261.
- 2026-11-17 (it. 2069, contrôle) : dix premières minutes après la journée (monstres vivants, arrivées, équilibrage) : first-minutes
  inchangé (zone 9-10, niveau 16-17 à 10 min ; premier objet 42-82 s, premier boss 70-82 s, 1er déblocage 345-408 s).
- 2026-11-17 (it. 2068, revue des onglets Familiers, Ascension, Bestiaire, Carte en anglais) : rien à corriger (les éclats de
  l'Ascension sans ascension viennent de dev-data, remplie à la main). Revue de tous les onglets en anglais terminée (it. 2059-2068).
- 2026-11-17 (it. 2067) : npm test vérifie qu'en anglais, chinois, japonais et coréen aucun pourcentage n'est espacé (« {3} % »,
  « 15 % ») ; l'expression trouve les 4 lignes fautives de l'ancien en.js (it. 2066). npm test 356, autotest 261/261.
- 2026-11-17 (it. 2066, revue des onglets Quêtes, Boutique, Réglages en anglais) : la note des Quêtes disait « 10 % of quests » : en
  anglais, chinois, japonais et coréen, le pourcentage se colle au nombre (unit("%") : espace seulement en fr, es, pt, de, pl, ru) ;
  26 traductions corrigées dans ces quatre langues (« {3} % » et « 15 % », dans quatre variantes de la note des Quêtes et six
  descriptions), les 260 autres étaient déjà collées. Boutique et Réglages : rien. Autotest 261/261.
- 2026-11-17 (it. 2065, contrôle après l'équilibrage des it. 2053-2054) : stall-check 4 h sous les bénédictions du jour
  (STALL_DAYMOD=all) : 60 parties, 0 figée ; fuzz 30 graines : 600 parties, 0 bloquée. Rien à corriger.
- 2026-11-17 (it. 2064) : vérifié : le renforcement d'une relique a sa réaction sur la bande et son son (relicUp), et la carte de la
  zone annonce « Ce boss renforcera … (niveau n → n+1) » ; brouillon du devlog 0.1.7 tenu à jour (it. 2058-2063).
- 2026-11-17 (it. 2063) : lang-overflow mesure aussi la zone d'un lieutenant ou du Briseur avec le héros bloqué (« adventure-boss150-
  bloqué=N ») : il a trouvé en russe à 1280 px 7 px (zones 100, 150) et 22 px (zones 200, 300) ; la zone 200 défilait déjà avant
  l'it. 2062 (16 px, carte du Briseur : une ligne de capacités de plus). Dans ces zones, la carte donne maintenant deux pistes (elle
  porte déjà la relique gardée) : 10 langues à 1280 et 1366 px, aucun défilement. Autotest 261/261.
- 2026-11-17 (it. 2062) : héros bloqué devant un lieutenant ou le Briseur (bien plus coriaces depuis l'it. 2053) avec une relique pas
  au maximum : nouvelle piste « renforce tes reliques » (avant l'ascension ; la bulle de la relique dit comment). Test logique. Une
  première phrase plus longue faisait passer « Chances de butin » sous la bande en russe à 1280 px (carte de la zone 150, trois
  pistes) : raccourcie, vérifiée en capture (de, ru, 1280 px). Autotest 261/261.
- 2026-11-17 (it. 2061, revue générale) : captures en japonais (Aventure, mode mini) : propres, nouvelle ligne de la carte de la zone
  comprise ; texte de l'interface en coréen : aucun mot non traduit (HP, Lv, noms de langues : voulus). Perf, mémoire et équilibrage
  mesurés aux it. 2051-2054. Rien à corriger.
- 2026-11-17 (it. 2060, revue des onglets Héros et Statistiques en anglais) : rien à corriger. Vu : dev-data compte 13 événements rares
  mais une seule sorte « vue » (1 / 18) : sauvegarde antérieure au suivi des sortes (it. 932) ; startEvent incrémente les deux au
  même endroit, une partie récente ne peut pas les désaccorder.
- 2026-11-17 (it. 2059, bogue visible) : carte de la zone : la première ligne nommait l'espèce du boss (« Boss (venomous mushling): 72.63M
  HP ») et la suivante son nom propre (« Boss: Purplecap the Awakened ») : deux noms pour un seul boss. La première ne donne plus que
  les PV (nouvelle clé, 9 langues) ; en anglais elle tient sur une ligne, en russe à 1280 px la carte raccourcit. Autotest 261/261.
- 2026-11-17 (it. 2058, bogue visible) : le panneau de la zone annonçait le boss ORDINAIRE (nom et PV) même là où se bat un lieutenant,
  un écho ou le Briseur (zone 150 : « Boss (golem de cristal) : 28,9 Md PV » pour un Chevalier de l'éclipse à 137 Md) ; il nomme
  maintenant le vrai boss et compte son multiplicateur (story.js bossHpFactor, testé). Vérifié en jeu : zones 150 et 200, PV affichés
  = PV du boss fabriqué par makeMonster ; russe à 1280 px, rien ne défile (écart de 2 px du cadre déjà présent avant). Autotest 261/261.
- 2026-11-17 (it. 2057) : après la sortie : CLAUDE.md (0.1.6 = édition 132, la 0.1.7 prendra after: 132) ; brouillon
  docs/devlog-0.1.7-brouillon.md ouvert. Fin de la journée des monstres : retour aux priorités normales.
- 2026-11-17 (it. 2056) : feu vert de Victor : 0.1.6 envoyée sur itch.io (`REF=v0.1.6 scripts/itch-push.sh victor-basset/sillwalker`) ;
  butler status : windows #2417912, linux #2417914, mac #2417917, tous en 0.1.6. Fenêtre des notes de version vérifiée en capture
  (joueur de la 0.1.5 : dix nouveautés sur deux colonnes, sans défilement).
- 2026-11-17 (it. 2055, sortie 0.1.6, suite) : constructions par `itch-push.sh --dry-run` (Windows 157 Mo, Linux 138 Mo, Mac signée
  132 Mo), déposées dans Médias/dist-itch avec SHA256-0.1.6.txt ; AppImage essayée avec un HOME temporaire (partie neuve, 5
  victoires en 40 s, aucune erreur) ; étiquette v0.1.6 (89d14556) poussée ; devlog : docs/devlog-0.1.6.md (bloc de publication),
  steam/itch/devlog-0.1.6.html (10 langues), couverture steam/itch/cover-0.1.6.png (make.js, update-0.1.6). Envoi butler : en
  attente du « oui » de Victor.
- 2026-11-17 (it. 2055, sortie 0.1.6 demandée par Victor) : version 0.1.6 (package.json) ; Quoi de neuf, édition 132 (équilibrage :
  Chevalier et Briseur plus coriaces, Cœur −30 %) ; notes de version RELEASE_016 (dix nouveautés, after: 114 ; sept phrases reprises des
  éditions, trois nouvelles, clés 3250-3252 traduites) ; test des notes de version mis à jour (un joueur de la 0.1.5 voit celles de
  la 0.1.6). npm test 353, autotest 261/261, lang-overflow complet : aucun défilement ni mot coupé.
- 2026-11-17 (it. 2054, suite de la demande de Victor : « équilibrer le reste ») : Cœur de l'aube moins protecteur, dégâts subis
  −45 % → −30 % (−63 % → −42 % au niveau 5 ; régénération inchangée), texte de l'effet traduit (clé 3249). Semaine simulée
  (guerrier, mage, samouraï) : records 350 / 349 / 350 (avant 349 / 350 / 361), premier Chevalier à Cœur 5 pour les trois (samouraï :
  34 → 41 h), record par course plus régulier (guerrier, course 17 : 196 → 184 ; course 22 : 283 → 250). stall-check 6 h : 0 figée ;
  autotest 261/261.
- 2026-11-17 (it. 2053, demande de Victor : « trop facile dès qu'on a le Cœur » ; « n'exige pas un niveau, équilibre ») : Chevalier
  de l'éclipse PV ×2,4 → ×4,5, attaque ×1,2 → ×2,4 ; Briseur ×3 → ×5, ×1,3 → ×2,5 (plus dur que chaque lieutenant, test) ; leurs échos
  gardent la force d'avant (echoHp / echoAtk). simulate.js : RELIC_LOG=1 (niveaux des reliques à chaque gain). Semaine simulée,
  premier Chevalier : Cœur 3-4 → 4-5 ; premier Briseur : Lame 1-4 (samouraï en Lame 1, dans la course même du Chevalier) → Lame
  4-5, 39-51 h → 48-61 h ; records de la semaine inchangés (guerrier 349, mage 350, samouraï 361, rôdeur et nécromancien 349).
  Essai écarté : force liée au niveau de la relique précédente (Victor ne veut pas d'exigence de niveau). La PV seule ne freinait
  pas le guerrier (Cœur : dégâts ×0,55, régénération) : l'attaque compte davantage. stall-check 6 h : 0 figée ; autotest 261/261.
- 2026-11-17 (it. 2052) : `npm run perf` / `perf:linux` lançaient le jeu sur dev-data même (la partie de dev avançait à chaque mesure ;
  l'autotest, stall-check et les captures en partent) : scripts/perf.mjs copie dev-data dans un dossier temporaire. Vérifié :
  dev-data intact, dossier supprimé ; bande 18,6 %, panneau 19,3 %, mini 5,4 %. Autotest 261/261.
- 2026-11-17 (it. 2051, revue générale) : perf en fin de partie (copie de endgame-save.json) : guerrier 24,8 %, rôdeur (à distance)
  23,9 % (repère 25,4) ; mémoire 573 Mo ; save-fuzz FUZZ_BASE=fin ok (1 225 corruptions). Rien à corriger.
- 2026-11-17 (it. 2050, journée des monstres) : sous les gouttes, l'araignée et la chauve-souris (chez elles dans les grottes humides)
  gardent leur geste propre (fil, vol) au lieu de s'ébrouer (vu sur la capture de l'it. 2047). Test logique complété. Autotest 261/261.
- 2026-11-17 (it. 2049) : Quoi de neuf, édition 131 (poussière et gouttes ; Rafale de vent ; proies en meute), clés 3246-3248
  traduites ; « Rafale de vent » cité tel quel (polonais et russe : « pendant l'événement … », le nom décliné échouait à
  i18n-quotes). npm test 353, autotest 261/261, lang-overflow : aucun défilement.
- 2026-11-17 (it. 2048) : MONSTRES-VIVANTS : étape 13 complétée (buée, bulles, vapeur, poussière, gouttes) et étape 14 (Rafale
  de vent, ordre des règles de la file).
- 2026-11-17 (it. 2047, journée des monstres) : gouttes (Grotte suintante, Égouts oubliés) : une goutte tombe dessus, le monstre s'ébroue
  et projette des gouttelettes bleues ; grenouille, slime et ver s'y plaisent (rien). Vérifié en capture dans les deux zones ; test
  logique complété. Feuilles et poussières lumineuses : pas de réaction (rien de naturel à montrer). Autotest 261/261.
- 2026-11-17 (it. 2046, journée des monstres) : poussière (déserts, steppe, pyramide) : loups, sangliers, ours et yétis s'ébrouent (nuage
  qui monte), bandits, orcs et cultistes toussent ; brun #6e5232 (le sable #a8865a se perdait sur les fonds sableux). Vérifié en
  capture à la Steppe des loups et au Désert brûlant ; test logique complété. Autotest 261/261.
- 2026-11-17 (it. 2045) : autotest « une proie en meute s'écarte du prédateur voisin » (deux rats collés à un ours, devFreeze, record
  ramené à 30 : la peur du héros poussait le rat dans l'autre sens, −3) : −6 px en moyenne, seuil −4 (≈ −2 avec l'ancien ordre
  des règles). Autotest 261/261 deux fois.
- 2026-11-17 (it. 2044, journée des monstres) : la peur du héros bien plus fort (it. 1976) passe aussi APRÈS la meute : les craintifs
  en meute ne gardaient que 35 % de leur recul (et le regard du chef). Mesure devFreeze, deux rats parmi des golems : +2 px en
  moyenne avant, +11 après. Ordre : meute, peur du héros, proies et prédateurs, vent. Autotest 260/260.
- 2026-11-17 (it. 2043, journée des monstres) : la règle des proies et prédateurs passe APRÈS celle de la meute (même défaut qu'à
  l'it. 2042 : la meute ne gardait que 35 % de l'écart). Mesure devFreeze, deux rats en meute collés à un ours : le second
  s'écartait de 2 px en moyenne, maintenant 8 px (−6 à −9). Ordre : meute, peur, vent. Autotest 260/260.
- 2026-11-17 (it. 2042, journée des monstres) : pendant l'événement « Rafale de vent », la file réagit : volants ballottés comme en
  zone venteuse, monstres au sol (sauf boss, colosses, mimique) qui reculent de 6 px par à-coups. Le vent passe maintenant APRÈS
  la règle de meute (elle ne gardait que 35 % du mouvement propre : le vent des volants en meute, chauves-souris, corbeaux, s'y
  perdait). Mesure devFreeze, slimes en meute : 3 et 0 px au calme, 6 et 6 px en rafale. Autotest 260/260.
- 2026-11-17 (it. 2041, revue générale) : save-fuzz ok (1 267 corruptions) ; fuzz sous les bénédictions du jour : 600 / 0 bloquées ;
  --crawl en japonais : 675 clics sans erreur ; japonais : aucun mot français (« attributs » = repère « --- attributs » de
  l'extraction). Rien à corriger.
- 2026-11-17 (it. 2040) : brouillon du devlog 0.1.6 : climat des zones (neige, braises, eau, spores, cendres, vent) et arrivée
  des séries depuis le bord.
- 2026-11-17 (it. 2039) : Quoi de neuf, édition 130 (souffles ; buée, bulles, vapeur ; corbeau de jour, fantôme), clés 3243-3245
  traduites dans les 9 langues. npm test 353, autotest 260/260, lang-overflow : aucun défilement.
- 2026-11-17 (it. 2038) : autotest « souffles du climat » (toux grise aux Mines naines, bulles au Lagon de corail : particules de
  leur couleur après un geste forcé). Premier essai : bulles absentes, le plafond de 24 étincelles (MAX_SPARKS) était atteint par
  la toux encore vivante ; 0,9 s d'attente avant chaque geste. Autotest 260/260 deux fois.
- 2026-11-17 (it. 2037, journée des monstres) : dans les braises, le yéti et les créatures de givre fondent : un peu de vapeur
  monte (vérifié en capture au Volcan des wyvernes). Autotest : « élite, réplique du héros » échouait selon le tirage
  (makeMonster tirait Poupouce, « Pardon, Poupouce… » passait devant) : poupouce: false dans les deux contrôles d'élite.
  Autotest 259/259.
- 2026-11-17 (it. 2036, journée des monstres) : sous l'eau (Lagon de corail, Récif abyssal, Cité engloutie), tout geste au repos
  lâche deux bulles qui montent (juice.puff reçoit une direction ; presque blanches : le bleu clair se perdait sur le cyan du
  Lagon). Vérifié en capture (Lagon, Récif ; aucune bulle hors de l'eau). Autotest 259/259.
- 2026-11-17 (it. 2035, journée des monstres) : dans la neige, le frileux qui grelotte souffle une buée (juice.puff, bleu acier
  #7896c8 : le bleu pâle se perdait sur la neige ; pas le squelette ni la guêpe). Vérifié en capture aux Pics enneigés et à la
  Toundra gelée. Autotest 259/259.
- 2026-11-17 (it. 2034) : MONSTRES-VIVANTS, étape 13 complétée (cendres, souffles, exclusions, fonctions pures, corbeau) ;
  revue de CORPSE_FALL (façons de tomber) : cohérente.
- 2026-11-17 (it. 2033, journée des monstres) : le corbeau passe des espèces de nuit à celles de jour (il chasse le jour et
  s'endort la nuit, « z », comme un vrai corbeau ; la chauve-souris fait l'inverse). Autotest 259/259.
- 2026-11-17 (it. 2032, journée des monstres) : revue des espèces des zones de neige, braises et eau : le fantôme grelottait
  dans la Toundra gelée ; ni lui ni le golem ne grelottent plus. Le reste est cohérent (diablotin frileux dans le Glacier
  hurlant, squelette qui garde son cliquetis). Autotest 259/259.
- 2026-11-17 (it. 2031, revue générale) : perf:linux bande 18,4 %, panneau 19,4 %, mini 5,6 % (souffles compris) ; stall-check
  2 h : 60 parties, 0 figées ; --crawl en russe : 675 clics sans erreur ; polonais : aucun mot français (les « le » d'une
  recherche ASCII étaient des morceaux de mots polonais). Rien à corriger.
- 2026-11-17 (it. 2030, journée des monstres) : revue des espèces des zones de cendres et de spores : le fantôme toussait dans la
  Crypte oubliée et l'Ossuaire des titans ; il ne respire plus (ni toux ni éternuement). Test logique complété. Autotest 259/259.
- 2026-11-17 (it. 2029, journée des monstres) : éternuement vérifié en capture dans les trois zones à spores : le souffle vert
  pâle disparaissait sur le Marais brumeux (fond vert clair) ; vert moyen (#6f9636), visible aussi au Bois corrompu et à la
  Champignonnière géante (fonds violets). Autotest 259/259.
- 2026-11-17 (it. 2028, journée des monstres) : vérifiée en capture, la bouffée de l'it. 2027 éclatait en étoile (sparkles)
  et son gris se perdait sur le fond brun des Mines naines : nouveau juice.puff (souffle dirigé vers le héros, en cône, qui
  monte un peu), couleurs plus claires. Capture : petit souffle net devant la gueule. Autotest 259/259.
- 2026-11-17 (it. 2027, journée des monstres) : éternuement et toux soufflent une bouffée devant la gueule (4 particules : vertes
  dans les spores, grises dans les cendres ; effets complets seulement) au lieu des étincelles de la compétence. Mise en scène
  Mines naines sans erreur, autotest 259/259.
- 2026-11-17 (it. 2026) : Quoi de neuf, édition 129 (vent, toux dans les cendres, proie volante qui s'envole), clés 3240-3242
  traduites dans les 9 langues. npm test 353, autotest 259/259, lang-overflow : aucun défilement.
- 2026-11-17 (it. 2025, qualité du code) : mouvement des gestes au repos extrait de strip.js vers monlife.js gestureMotion
  (fonction pure ; le fil de l'araignée reste dessiné par strip.js) ; test logique (bornes de chaque geste, volants sous la
  rangée d'informations). npm test 353, autotest 259/259.
- 2026-11-17 (it. 2024, qualité du code) : gestes au repos extraits de strip.js vers monlife.js (ART_GEST, durées, gestureOf :
  climat, puis espèce, puis nature) ; test logique. npm test 352, autotest 259/259.
- 2026-11-17 (it. 2023, qualité du code) : climat des zones extrait de strip.js vers monlife.js climateGesture (fonction pure) ;
  test logique (9 cas : neige, braises, eau, spores, cendres, sans effet). npm test 351, autotest 259/259 (climat compris).
- 2026-11-17 (it. 2022, journée des monstres) : zones de cendres (Bastion noir, Crypte oubliée, Mines naines, Ossuaire des titans) :
  les monstres toussent (geste de l'éternuement) ; golems, squelettes, momies et élémentaires de feu non. Vérifié (Mines naines :
  ours et loup toussent, golem s'enfonce). Autotest 259/259.
- 2026-11-17 (it. 2021, revue générale) : perf:linux bande 18,5 %, panneau 19,4 %, mini 5,5 % ; mémoire 571-574 Mo ; balance 12 h
  graine 11 contre aea72772 (avant les compétences des monstres) : +0,3 ; fuzz 600 / 0 ; chinois : aucun mot français. Rien à
  corriger.
- 2026-11-17 (it. 2020, vérification) : corbeau entre deux ours (prédateurs), devFreeze : 30 px en zone venteuse, 15 px en zone
  calme (avant l'it. 2019 : 3 et 9 px, il tremblait sur place). Rien à corriger.
- 2026-11-17 (it. 2019) : proies et prédateurs (it. 1923) : une proie volante (corbeau) n'est plus « coincée » entre deux
  prédateurs au sol (elle tremblait sur place, vent et dérive écrasés : vu à l'it. 2017). Autotest 259/259.
- 2026-11-17 (it. 2018) : MONSTRES-VIVANTS, étape 13 complétée (spores, vent, devFreeze).
- 2026-11-17 (it. 2017) : vent (it. 2015) presque invisible : produit de deux sinus arrondi au pas de 3 px, nul la plupart du
  temps ; rafales de ±12 px. Outil : g.R.devFreeze (partie suspendue, la vie de la file continue) pour mesurer sans que la série
  change. Mesure : corbeau entre golems, 30 px de zone venteuse contre 15 px de zone calme (mes mesures précédentes le mettaient
  entre deux ours, prédateurs : il tremblait sur place, vent écrasé). Autotest 259/259. Noté dans CLAUDE.md.
- 2026-11-17 (it. 2016, mesure) : vent (it. 2015) : amplitude d'un corbeau sur 10 s, zone venteuse 24 px contre 15 px en zone
  calme (deux lancements). Comparaison dans une même partie impossible : la série change (victoires ou défaites) pendant le
  relevé. Piège noté : de jour, les chauves-souris somnolent (mouvement ×0,35, vent compris) ; mesurer un volant actif.
- 2026-11-17 (it. 2015, journée des monstres) : zones venteuses (plumes : Nid des harpies, Côte des naufragés, Trône des
  tempêtes) : les volants sont ballottés par des rafales (±9 px, en vagues ; pas les harpies). Vérifié (vent détecté en zone 14 ;
  l'effet s'ajoute à la dérive naturelle, difficile à isoler par relevé). Autotest 259/259.
- 2026-11-17 (it. 2014, contrôle) : stall-check 6 h sous les bénédictions du jour (une par héros) : 60 / 0 figées.
- 2026-11-17 (it. 2013) : CLAUDE.md : gestes (ART_GEST), climat des zones, contrôles de geste en zone fixe, arrivée des séries.
- 2026-11-17 (it. 2012) : « Quoi de neuf », édition 128 (climat des zones ; spores et éclat du niveau ; clés 3238-3239, 10 langues).
  Autotest 259/259, lang-overflow ru/de/pl : rien ne défile.
- 2026-11-17 (it. 2011, revue générale) : perf:linux bande 18,2 %, panneau 19,1 %, mini 5,4 % ; 12 h graine 311 : nécromancien 61,
  mage 64, rôdeur 65 ; stall-check 60 / 0 ; --crawl en allemand : 675 clics, aucune erreur. Rien à corriger.
- 2026-11-17 (it. 2010, suite) : le commit précédent a été fait alors que l'autotest échouait (258/259 : « geste au repos » mesuré
  dans la zone courante, à spores au moment du test : tout éternuait). Contrôle fixé en zone 56 ; 259/259. Leçon : lire le
  résultat de l'autotest AVANT de lancer le commit (ne pas les chaîner, règle déjà écrite).
- 2026-11-17 (it. 2010, journée des monstres) : zones à spores (Marais brumeux, Bois corrompu, Champignonnière géante) : qui
  n'est ni champignon ni plante éternue (coup sec vers l'avant). Vérifié (Marais brumeux : ours et loup éternuent, champignard se
  gonfle).
- 2026-11-17 (it. 2009, contrôle) : endurance 8 min à ×10 sur dev-data et fin de partie (arrivées, climat, éclat, gestes) : aucune
  erreur ; dev-data va et vient 55-56 (plus figée en 57 comme à l'it. 1957), la fin de partie 149-150.
- 2026-11-17 (it. 2008) : MONSTRES-VIVANTS, étape 13 (climat des zones, sursaut au niveau du héros).
- 2026-11-17 (it. 2007) : autotest « climat des zones » (zone 46 neige : ours grelotte, yéti se frappe la poitrine ; zone 56 braises :
  ours se dresse, yéti s'affaisse). 259/259.
- 2026-11-17 (it. 2006, journée des monstres) : zones sous l'eau (bulles : Récif abyssal, Cité engloutie, Lagon de corail) : les
  créatures de feu (diablotins, élémentaires, variantes de feu) s'affaissent. Vérifié (Lagon de corail : diablotin et gluant de
  lave s'affaissent, ours se dresse).
- 2026-11-17 (it. 2005, journée des monstres) : zones de braises (Forge volcanique, Abysses ardents, Cœur du volcan, Volcan des
  wyvernes) : yétis et variantes de givre souffrent de la chaleur (ils s'affaissent). Vérifié (Volcan des wyvernes : ours se
  dresse, yéti et gluant de givre s'affaissent). Autotest 258/258.
- 2026-11-17 (it. 2004, journée des monstres) : zones enneigées (météo « snow » : Toundra gelée, Pics enneigés, Glacier hurlant) :
  qui n'est pas fait pour le froid grelotte à la place de son geste ; yétis et variantes de givre gardent le leur. Vérifié
  (Pics enneigés : ours grelotte, yéti se frappe la poitrine, gluant de givre sautille). Autotest 258/258.
- 2026-11-17 (it. 2003, contrôle) : partie neuve (dossier temporaire, français) capturée à 90 s : zone 2, deux gluants et deux rats
  côte à côte (meutes dès le début), série variée, boss gluant au bout ; aucune erreur. Rien à corriger.
- 2026-11-17 (it. 2002, journée des monstres) : le héros monte de niveau : les deux plus proches de la file sursautent, éblouis
  (pas les téméraires ; pas avec les effets réduits). Vérifié. Autotest 258/258.
- 2026-11-17 (it. 2001, revue générale) : mémoire 4 min : 573-576 Mo ; 12 h graine 301 : guerrier 65, prêtresse 62, berserker 65 ;
  fuzz sous chaque bénédiction : 400 / 0 ; save-fuzz ok (1 267) ; russe : aucun mot français. Rien à corriger.
- 2026-11-17 (it. 2000, contrôle) : perf:linux après les arrivées : bande 17,9 %, panneau 19,2 %, mini 5,5 % : inchangé.
- 2026-11-17 (it. 1999) : MONSTRES-VIVANTS, étape 12 (arrivées) ; POUR-VICTOR : arrivée des séries.
- 2026-11-17 (it. 1998) : « Quoi de neuf », édition 127 (arrivée des séries et retour des vaincus ; gestes du lézard, des
  champignards, du scorpion ; mode mini ; clés 3235-3237, noms de monstres repris tels que traduits). Autotest 258/258,
  lang-overflow ru/de/pl : rien ne défile.
- 2026-11-17 (it. 1997) : mode mini : le monstre suivant arrive en glissant du bord droit (0,8 s ; pas avec les effets réduits).
  Vérifié (x 207 → 174). Autotest 258/258.
- 2026-11-17 (it. 1996, journée des monstres) : vidéo de l'arrivée d'une série : le boss qui accourait passait sous les boutons et
  la pastille d'or, son nom coupé au bord : il attend désormais à sa place, seuls ses monstres accourent. Vidéo envoyée à
  Victor. Autotest 258/258.
- 2026-11-17 (it. 1995) : autotest « bande : une nouvelle série arrive du bord droit et gagne sa place » (835 px loin à 0,15 s,
  en place à 2,6 s). 258/258.
- 2026-11-17 (it. 1994, journée des monstres) : la série recommence après une défaite (même série) : les monstres déjà vaincus
  reviennent en courant du bord (après 0,6 s, l'un après l'autre) au lieu de réapparaître à leur place. Vérifié (kills 5 → 0 :
  le 3e revient). Autotest 257/257.
- 2026-11-17 (it. 1993, journée des monstres) : arrivée de la série : à chaque nouvelle série, les monstres accourent du bord droit
  l'un après l'autre (0,12 s d'écart, 1,1 s de course, freinage) jusqu'à leur place ; pas le combattant, pas avec les effets
  réduits. Vérifié (positions relevées : tous en place en ≈ 2 s). Autotest 257/257, bande 18,2 %.
- 2026-11-17 (it. 1992, journée des monstres) : gestes : champignards et champignons errants se gonflent, le scorpion dresse la
  queue (vérifié). CLAUDE.md : mesure de mémoire, juger un écart contre l'ancien commit mesuré aussitôt. Autotest 257/257.
- 2026-11-17 (it. 1991, revue générale) : perf:linux bande 18,3 %, panneau 18,9 %, mini 5,6 % ; 12 h graine 291 : cryomancienne 64,
  lancier 64, gladiateur 66 ; early-pace 60 min : niveau 39-41, zone 23-25 ; --crawl en japonais : 669 clics, aucune erreur.
  Mémoire : deux mesures à 623-630 Mo (plates) ; aussitôt après, 0eb3632d (it. 1971) 557-565 et HEAD 570-571 : variation de
  la machine, pas du code. Rien à corriger.
- 2026-11-17 (it. 1990, contrôle) : stall-check sur 12 h de jeu (60 parties : 3 sauvegardes × 20 héros, 2 min 40) : 0 figée.
- 2026-11-17 (it. 1989, essai d'équilibrage, rien gardé) : nécromancien, serviteur 30 → 35 % : 61,8 sur 7 graines (actuel 63,2).
  Trois réglages (PV, attaque, serviteur) sans gain : son retard (≈ 1 zone sous la moyenne) tient aux paliers des zones, pas
  à une statistique ; laissé tel quel.
- 2026-11-17 (it. 1988, essai d'équilibrage, rien gardé) : nécromancien, dernier du tableau (62,3). Sur 7 graines (12 h) : actuel
  63,2 ; PV 0,8 → 0,85 : 63,2 ; attaque 1,25 → 1,3 : 62,8. Ni la survie ni l'attaque ne le font franchir ses paliers : réglages
  retirés. Piste suivante si besoin : le serviteur (30 %, texte traduit à changer avec).
- 2026-11-17 (it. 1987) : mode mini : le monstre suivant élite / champion a son contour doré / violet. Vu en capture (contour
  discret à demi-opacité). Autotest 257/257.
- 2026-11-17 (it. 1986) : README : vie de la file (natures, gestes, meutes, instincts, effets réduits) et garde-fou des combats sans fin.
- 2026-11-17 (it. 1985, journée des monstres) : le lézard se camoufle en attendant (à demi effacé 2,2 s, comme son Embuscade).
  Vérifié (opacité 0,5 puis 1). Autotest 257/257.
- 2026-11-17 (it. 1984, contrôle) : i18n-names : 25 écarts, tous anciens et grammaticaux (génitif allemand, particule coréenne,
  formulations voisines) ; aucun dans les clés du jour (3204-3234). Rien à corriger.
- 2026-11-17 (it. 1983) : « Quoi de neuf », édition 126 (réputation, caractères au Bestiaire, compétences réfléchies ; clés
  3232-3234, 10 langues ; noms du jeu repris tels que traduits : Sylvain, Cultiste, Bestiaire, corrigés en 7 langues avant
  publication). Autotest 257/257, lang-overflow ru/de/pl : rien ne défile.
- 2026-11-17 (it. 1982) : réputation (it. 1976) : les élites et champions, téméraires, ne tremblent plus devant un héros trop fort.
  Autotest 257/257.
- 2026-11-17 (it. 1981, revue générale) : perf:linux bande 18,1 %, panneau 19,5 %, mini 5,5 % ; balance 12 h graine 3 contre
  aea72772 (avant les compétences des monstres) : −0,8, comme le bilan du matin ; fuzz 600 / 0 ; stall-check 60 / 0 ; polonais :
  aucun mot français. Rien à corriger.
- 2026-11-17 (it. 1980) : Bestiaire : l'infobulle dit aussi « Craintif » et « Prédateur » (clés 3230-3231, 10 langues) ; TIMID et
  PREDATORS déplacés de strip.js vers monlife.js (lus par les deux). Autotest 257/257, lang-overflow ru/de 1280 : rien.
- 2026-11-17 (it. 1979, contrôle) : perf:linux après crainte, audace et gestes de plus : bande 18,0 %, panneau 19,7 %, mini 5,4 %.
- 2026-11-17 (it. 1978) : MONSTRES-VIVANTS, étapes 10 (fin de journée) et 11 (impasses corrigées).
- 2026-11-17 (it. 1977, journée des monstres) : à l'inverse (it. 1976), au record après une défaite du héros dans la zone, la
  file s'enhardit et se tient un peu plus près (≈ 3 px ; pas les craintifs). Vérifié (golems et ours 0,35, rat 0). Autotest 257/257.
- 2026-11-17 (it. 1976, journée des monstres) : réputation : dans une zone 15 zones ou plus sous le record, les monstres savent le
  héros plus fort : les craintifs se tiennent à 12 px de plus, dos tourné ; les autres tremblent quand il approche (220 px).
  Vérifié (zone 20, record 57 : rat à +12, golems qui tremblent). La revue des « Crit » superposés (it. 1975) : le placement
  existant (it. 846) les écarte déjà, rien changé. Autotest 257/257.
- 2026-11-17 (it. 1975, revue visuelle) : vidéo de 16 s, zone 46, série variée imposée (meutes, proies, élite, colosses), quatre
  images examinées : monstres bien espacés, nuée de chauves-souris ensemble, rien dans la rangée d'informations. Seul
  encombrement : les « Crit » flottants qui se superposent au-dessus du héros pendant les combats rapides (antérieur à la
  journée des monstres). Rien corrigé.
- 2026-11-17 (it. 1974) : harpie (balancement) et tyrannœil (palpitation) vus dans le jeu ; l'autotest des gestes couvre
  aussi un geste d'espèce (l'ours se dresse). 257/257.
- 2026-11-17 (it. 1973, journée des monstres) : six gestes d'espèce de plus (guêpe qui bourdonne, diablotin qui se retourne,
  harpie qui se balance, wyverne qui se cabre, tyrannœil et élémentaire de feu qui palpitent), avec les mouvements existants.
  Vérifié (série imposée). Autotest 257/257.
- 2026-11-17 (it. 1972) : POUR-VICTOR : gestes, effets réduits, mode mini, stall-check.
- 2026-11-17 (it. 1971, revue générale) : perf:linux bande 18,3 %, panneau 19,1 %, mini 5,5 % ; mémoire 4 min : 566-570 Mo ;
  stall-check 60 / 0 figées ; first-minutes : zone 9-10 et niveau 16-17 à 10 min, premier objet à 42-82 s (comme avant) ;
  --crawl en russe : 675 clics, aucune erreur. Rien à corriger.
- 2026-11-17 (it. 1970, contrôle) : tableau des 20 héros (12 h, graines 7/3/11) : moyenne 64,5, nécromancien 62,3 en bas,
  berserker 69,3 en haut (un 77). Berserker sur 7 graines, avant / après les garde-fous anti-impasse (2b1777bc / HEAD) :
  67,8 / 66,8, le 77 existait déjà : forte variance du berserker, pas une régression. Rien changé.
- 2026-11-17 (it. 1969) : brouillon du devlog 0.1.6 : meutes et instincts, mode mini, effets réduits, bogue des combats sans fin.
- 2026-11-17 (it. 1968, contrôle) : lang-overflow complet (éditions 122-125, infobulles du Bestiaire et des Réglages, ligne de
  journal) : aucun défilement ni mot coupé, 10 langues.
- 2026-11-17 (it. 1967) : abandon après 3 min de combat (it. 1964) : une ligne de journal le dit (« Épuisé par un combat sans
  fin, ton héros renonce. », clé 3229, 10 langues, catégorie « mauvaise nouvelle » de log.js) avant celle de la défaite.
  Autotest 257/257.
- 2026-11-17 (it. 1966, contrôle) : semaine simulée après le dernier recours (abandon après 3 min, it. 1964), pour vérifier
  qu'il ne coupe pas de longs combats de boss gagnants en fin de partie : guerrier 349, mage 350 : inchangé.
- 2026-11-17 (it. 1965) : stall-check : option STALL_DAYMOD (bénédictions du jour) ; 6 h de jeu : 60 / 0 figées ; 3 h sous les
  bénédictions : 60 / 0. Noté dans CLAUDE.md.
- 2026-11-17 (it. 1964, bogue + outil) : scripts/stall-check.mjs (sauvegardes avancées × 20 héros, 2 h de jeu, alerte à 5 min
  sans victoire ni défaite) ; il a trouvé une seconde impasse : nécromancien de dev-data, zone 44, grenouille toxique qui se
  régénère, serviteur qui encaisse tous ses coups (l'emportement de l'it. 1959 n'y peut rien). Dernier recours : après 3 min du
  même combat, le héros abandonne (compté comme une défaite). 60 parties, 0 figées ; balance +0,0 ; fuzz 600 / 0 ;
  autotest 257/257. Noté dans CLAUDE.md.
- 2026-11-17 (it. 1963, vérification) : la progression hors ligne (applyOffline) est calculée (dps, temps par monstre), pas
  simulée coup par coup : l'impasse de l'it. 1958 n'y existe pas. Rien à corriger.
- 2026-11-17 (it. 1962) : « Quoi de neuf », édition 125 (mode mini : le suivant attend ; impasse corrigée ; effets réduits :
  monstres calmes ; clés 3226-3228, 10 langues, libellé « Effets complets » cité tel que traduit). Autotest 257/257,
  lang-overflow ru/de/pl : rien ne défile.
- 2026-11-17 (it. 1961, revue générale) : perf:linux bande 18,0 %, panneau 19,3 %, mini 5,3 % ; 12 h graine 261 : chaman 65,
  druide 64, samouraï 65 ; save-fuzz ok (1 267) ; fuzz sous chaque bénédiction : 400 / 0 (garde-fou anti-impasse compris).
  Rien à corriger.
- 2026-11-17 (it. 1960, vérification) : la partie figée de l'it. 1958 (dev-data après 80 min de jeu, zone 57), 4 min à ×10 :
  5 défaites, va-et-vient entre les zones 55 et 57 : elle vit de nouveau. POUR-VICTOR : le bogue corrigé.
- 2026-11-17 (it. 1959, bogue) : garde-fou de l'it. 1958 étendu à tout monstre (un élite « Régénérant » pouvait figer la partie
  de la même façon) ; hors boss, accélération discrète. Test logique. Balance −0,4, fuzz 600 / 0, autotest 257/257.
- 2026-11-17 (it. 1958, bogue) : impasse face à un boss trouvée par l'endurance de l'it. 1957 : en zone 57 de dev-data, le boss
  (Régénération + Enragé) régénérait plus vite que le héros ne le blessait, et le héros encaissait tout : 10 min de jeu à 100 %
  de part et d'autre, sans défaite, donc sans recul (le recul exige deux défaites) : partie figée. Garde-fou : après 90 s de
  combat, le boss s'emporte (Fureur croissante) toutes les 10 s sans plafond ; vérifié sur la même partie (défaite, nouvelle
  série, recul). Test logique. Balance +0,1, fuzz 600 / 0, semaine guerrier 349, autotest 257/257.
- 2026-11-17 (it. 1957, contrôle) : endurance : 8 min à ×10 (≈ 80 min de jeu) sur dev-data et sur la fin de partie, en même
  temps : aucune erreur de l'interface (dev-data reste devant le boss de la zone 57, son mur ; la fin de partie va et vient
  149-151). Rien à corriger.
- 2026-11-17 (it. 1956, journée des monstres) : mode mini : le suivant de la file attend au fond de la scène, à demi effacé
  (caché pendant que le combattant arrive, pendant un boss, et pour gobelin et Poupouce). Vu en capture (loup derrière un
  ours). Mini 5,6 % (inchangé), autotest 257/257.
- 2026-11-17 (it. 1955, journée des monstres) : compétences réfléchies : le sylvain garde son Enracinement (soin) tant qu'il
  a plus de 70 % de ses PV, le cultiste ne se sacrifie pas sous 15 % ; la compétence attend, prête (game.js monSkillTick).
  Test logique. Balance +1,2 (bruit, deux familles touchées), fuzz 600 / 0, autotest 257/257.
- 2026-11-17 (it. 1954) : Réglages, « Effets complets » : l'infobulle cite aussi les monstres qui s'agitent en attendant (ce que
  le réglage coupe depuis l'it. 1952 ; clé 3225, 10 langues). Autotest 257/257 ; lang-overflow ru/de/pl/pt 1280 et 1366 : rien.
- 2026-11-17 (it. 1953, accessibilité) : effets réduits, suite : plus de « z » (sommeil), de « ! » (meute furieuse) ni de « $ »
  (convoitise) flottants. Autotest 257/257.
- 2026-11-17 (it. 1952, accessibilité) : « Effets complets » coupés (aussi quand Windows demande moins d'animations, app.js) :
  la file en attente reste immobile (ni flânerie, ni geste, ni bavardage, ni hurlement, ni sursaut) ; les compétences au
  combat restent visibles. Avant, toute la vie de la journée des monstres ignorait ce réglage. Autotest « effets réduits,
  la file en attente reste immobile » : 257/257.
- 2026-11-17 (it. 1951, revue générale) : perf:linux bande 18,2 %, panneau 19,5 %, mini 5,7 % ; mémoire 4 min : 562-563 Mo ;
  12 h graine 251 : moine 62, nécromancien 65, arbalétrier 62 ; espagnol : aucun mot français. Rien à corriger.
- 2026-11-17 (it. 1950, vérification) : geste de la méduse (it. 1949) vu dans le jeu (« beat »), avec orc, chevalier et
  cultiste : tous les gestes d'ART_GEST ont maintenant été déclenchés au moins une fois. Rien à corriger.
- 2026-11-17 (it. 1949, journée des monstres) : gestes de cinq espèces de plus (ART_GEST) : le loup lève la tête (hurlement
  muet), le yéti se frappe la poitrine, la méduse pulse, le serpent ondule, le crabe fait un pas de côté. Vérifié (série
  imposée). Autotest 256/256.
- 2026-11-17 (it. 1948, contrôle) : perf de fin de partie (fixture, copie neuve à chaque mesure) avant / après les meutes, instincts
  et gestes (99e9711d contre HEAD, alternés) : 25,27 / 25,21 contre 25,21 / 25,71 % : +0,2 point, dans le bruit. Rien à corriger.
- 2026-11-17 (it. 1947) : « Quoi de neuf », édition 124 (gestes propres à chaque espèce ; loups qui hurlent à la lune, spectres
  qui s'estompent ; convoitise ; clés 3222-3224, 10 langues). Autotest 256/256, lang-overflow ru/de/pl : rien ne défile.
- 2026-11-17 (it. 1946) : MONSTRES-VIVANTS, étape 9 (gestes et caractères, it. 1927-1945).
- 2026-11-17 (it. 1945, journée des monstres) : convoitise : un objet légendaire tombe, les bandits et gobelins de la file le
  convoitent : « $ » doré au-dessus d'eux, ils s'avancent 2 s. Vérifié (butin légendaire émis : les deux bandits à 0,89,
  l'ours entre eux à 0). Autotest 256/256.
- 2026-11-17 (it. 1944, journée des monstres) : quatre gestes de plus : le bandit fait le guet (se retourne un instant), le
  cultiste se balance en psalmodiant, l'orc se frappe la poitrine, les chevaliers saluent. Vérifié (série imposée ; le
  bandit se retourne bien). Autotest 256/256.
- 2026-11-17 (it. 1943, journée des monstres) : gestes propres à trois marcheurs (strip.js ART_GEST) : le sanglier gratte le
  sol, l'ours se dresse (6 px, 1,2 s), le squelette s'entrechoque. Vérifié (série imposée). Autotest 256/256.
- 2026-11-17 (it. 1942, journée des monstres) : gestes des colosses affinés : plantes et sylvains se balancent (±3 px, 1,4 s),
  la momie fait un pas traînant vers le héros ; golems et vers s'enfoncent toujours. Vérifié (série imposée). Autotest 256/256.
- 2026-11-17 (it. 1941, revue générale) : perf:linux bande 18,2 %, panneau 18,9 %, mini 5,5 % ; balance 12 h contre aea72772
  (avant les compétences des monstres) : −0,9 zone, comme le bilan de l'it. 1886 (−0,8) : les meutes n'ont rien changé ;
  fuzz 600 / 0 ; --crawl en polonais : 675 clics, aucune erreur. Rien à corriger.
- 2026-11-17 (it. 1940, vérification) : « seconde phase des boss » écartée : les capacités tournantes « Enragé » et « Fureur
  croissante » (bosses.js) le font déjà. Vidéo de l'it. 1928 en zone 40 : pas un défaut de strip-clip (la série imposée
  s'applique, relevé à 3, 5, 9 s), le héros l'avait finie avant 20 s ; filmer là où une série dure plus que la vidéo.
- 2026-11-17 (it. 1939) : autotest « bande : un volant au plus haut ne touche pas la rangée d'informations » (11 chauves-
  souris, gestes forcés 1,5 s ; mesuré 30 / 26 px). 256/256. (La mesure longue de l'it. 1938, 12 s, descendait à 27 px.)
- 2026-11-17 (it. 1938) : geste des volants (it. 1933) : monté de 9 px, une chauve-souris au plus haut de sa croisière touchait
  la rangée d'informations (haut à 24 px, rangée de 26 px). Réduit à 6 px : 27 px au plus haut (série de 11 chauves-souris,
  gestes forcés en boucle). Autotest 255/255.
- 2026-11-17 (it. 1937) : une araignée appelée au combat en plein geste gardait son fil de soie affiché : caché (et geste
  arrêté) dès qu'elle combat. Vérifié (geste forcé, monstre précédent achevé : fil caché). Autotest 255/255.
- 2026-11-17 (it. 1936, journée des monstres) : geste propre aux araignées : elles remontent le long d'un fil de soie (24 px,
  1,6 s) puis redescendent ; fil = petit élément statique (.silk), hauteur réécrite par pas de 3 px seulement pendant le geste,
  caché ensuite. Vu en capture. Autotest 255/255.
- 2026-11-17 (it. 1935) : CLAUDE.md : où vivent les comportements des monstres en attente, arrondis d'Actor (3 px, 1/8),
  méthode de mesure par --stage.
- 2026-11-17 (it. 1934) : geste du golem vérifié (s'enfonce de 3 px) ; autotest « bande : geste au repos propre à la nature »
  (rat, golem, chauve-souris, série imposée puis rendue). 255/255.
- 2026-11-17 (it. 1933, journée des monstres) : le geste au repos dépend de la nature : les furtifs reniflent de droite à
  gauche, les colosses s'enfoncent lourdement, les volants montent haut puis redescendent, les sauteurs font un grand bond
  (les autres, le petit bond d'avant). Vérifié (rat, golem, chauve-souris, gluant). Autotest 254/254.
- 2026-11-17 (it. 1932, journée des monstres) : la nuit, un loup qui attend hurle à la lune (tête levée) toutes les 15 à 30 s ;
  les autres loups de la file répondent 0,6 à 1 s plus tard (howlDelay). Sans son (une alerte sonore nocturne répétée
  dérangerait). Vérifié (nuit forcée : loup 4 à 0,9 s, puis 6 et 5 à 1,6-1,7 s). Autotest 254/254.
- 2026-11-17 (it. 1931, revue générale) : perf:linux bande 18,5 %, panneau 19,4 %, mini 5,3 % ; mémoire 4 min : 569-570 Mo,
  plat ; 12 h graine 231 : assassin 65, barde 64, paladin 65 ; coréen : aucun mot français. Rien à corriger.
- 2026-11-17 (it. 1930, contrôle) : coût des spectres qui s'estompent, pire cas (série de 12 spectres imposée) : compteurs de
  dev 91 écritures d'opacité pour 856 déplacements sur la même fenêtre : négligeable. Rien à corriger.
- 2026-11-17 (it. 1929, journée des monstres) : les spectres qui attendent s'estompent et reviennent lentement (75 / 87,5 /
  100 %, Actor.alpha n'écrit qu'aux changements de palier) ; opacité pleine au combat (hors Intangible). Vérifié (série
  imposée). Autotest 254/254.
- 2026-11-17 (it. 1928, journée des monstres) : vidéo des instincts envoyée à Victor (zone 46, série imposée : grenouilles,
  meute de loups, rats, ours, boss Grand Yéti ; la série se termine en 25 s). Idée écartée : réagir à la météo (elle est
  fixe par zone, juice.js WEATHER : décor, pas un temps qui change).
- 2026-11-17 (it. 1927, journée des monstres) : anticipation : quand le monstre en combat passe sous 25 % de vie, le suivant
  de la file s'avance (≈ 5 px), prêt à prendre sa place (pas devant un boss). Vérifié (PV du combattant forcés à 20 % : le
  suivant 0,60, le troisième 0). Autotest 254/254.
- 2026-11-17 (it. 1926, contrôle) : partie de fin de partie (fixture) 60 s à ×10 en zone 150, puis zone 250 (série de loups
  et de rats imposée, élite comprise ; le héros recule jusqu'à 228 après ses défaites) : aucune erreur de l'interface avec
  meutes, instincts et boss impatient. Rien à corriger.
- 2026-11-17 (it. 1925) : MONSTRES-VIVANTS, étape 8 (instincts, it. 1913-1923) ; POUR-VICTOR : meutes et instincts à regarder.
- 2026-11-17 (it. 1924) : « Quoi de neuf », édition 123 (meute furieuse / nuée qui se disperse, proies et prédateurs, boss
  impatient, chauves-souris de jour et mimique ; clés 3218-3221, 10 langues, nom du monstre repris tel que traduit). Autotest
  254/254, lang-overflow ru/de/pl 1280 / 1920 : rien ne défile.
- 2026-11-17 (it. 1923, journée des monstres) : proies et prédateurs : un craintif (rat, grenouille, lézard, corbeau…) voisin
  d'un prédateur (loup, ours, serpent, wyverne, sanglier, araignée, yéti) s'en écarte de 9 px et lui tourne le dos ; coincé
  entre deux, il tremble sur place. Vérifié (série imposée : grenouilles entre ours et loups). Autotest 254/254.
- 2026-11-17 (it. 1922, journée des monstres) : le boss s'impatiente : plus que deux monstres (ou moins) avant lui, il frappe
  du pied toutes les 2,5 à 3,5 s (deux bonds secs) et le dernier de la file sursaute à chaque coup. Vérifié (série imposée,
  deux monstres restants). Autotest 254/254.
- 2026-11-17 (it. 1921, revue générale) : 12 h graine 221 : rôdeur 66, berserker 64, chaman 65 ; fuzz 600 / 0 ; early-pace
  (meutes dans le tirage) : 60 min niveau 40-42, zone 23-26, comme avant ; japonais : aucun mot français (« attributs » =
  repère du dump, « Language / Langue » voulu). Rien à corriger.
- 2026-11-17 (it. 1920) : autotest des meutes étendu aux rats (furtifs, oubliés jusqu'à l'it. 1919). 254/254.
- 2026-11-17 (it. 1919, journée des monstres) : (1) les rats (furtifs) et les gluants (sauteurs) ne formaient pas de meute sur
  la bande (seuls marcheurs et volants suivaient un chef) : ils suivent maintenant aussi le leur, bonds en cascade ; (2) un
  membre craintif (rat, corbeau) tombe : la nuée se disperse plus loin (recul ×3) au lieu de s'emporter. Vérifié (série de
  rats imposée), autotest 254/254, bande 18,0 %.
- 2026-11-17 (it. 1918, journée des monstres) : les membres d'une meute bavardent plus volontiers entre eux (deux fois sur trois
  quand une paire de meute attend). Vérifié (série imposée : la paire de loups a bavardé). Autotest 254/254.
- 2026-11-17 (it. 1917, contrôle) : après la meute furieuse, les chauves-souris de jour et la mimique : autotest 254/254 (aussi
  après le seuil final de l'it. 1916), perf:linux bande 18,2 %, panneau 19,3 %, mini 5,5 % : inchangé.
- 2026-11-17 (it. 1916, journée des monstres) : la mimique, immobile en coffre, se trahit quand son tour approche (héros à
  moins de 140 px) : un frisson d'un pixel du dessin (3 px, l'arrondi d'Actor.move effaçait 1 px) toutes les 2,5 à 4 s.
  Test (monlife). Autotest 254/254.
- 2026-11-17 (it. 1915, journée des monstres) : en plein jour, les chauves-souris somnolent à leur tour (mouvement ×0,35, « z »
  de temps en temps), pendant des bêtes de jour qui dorment la nuit. Vérifié (jour forcé : chauve-souris 0,35, ours 1,00,
  deux « z » en 12 s). Autotest 254/254.
- 2026-11-17 (it. 1914, journée des monstres) : vidéo des meutes envoyée à Victor (strip-clip, zone 56, série imposée : 3 loups,
  2 chauves-souris, 2 loups entre des ours). Leçon : en zone basse le héros de dev-data tue tout d'un coup ; filmer près
  du record (56-57) pour que la file reste en place.
- 2026-11-17 (it. 1913, journée des monstres) : un loup (ou un membre de meute) tombe : ses congénères ne sursautent pas en
  arrière comme les autres, ils s'avancent de 8 px en frémissant, un « ! » rouge au-dessus du premier. Vérifié dans le jeu
  (série imposée : ours → les loups sursautent ; loup → les deux autres s'avancent, furieux). Autotest 254/254.
- 2026-11-17 (it. 1912) : autotest « bande : une meute de loups suit son chef, deux ours voisins restent chacun de son côté »
  (série imposée, puis rendue). 254/254.
- 2026-11-17 (it. 1911, revue générale) : perf:linux bande 18,0 %, panneau 19,1 %, mini 5,4 % ; 12 h graine 211 : druide 64,
  samouraï 65, prêtresse 64 ; save-fuzz ok (1 267 corruptions) ; --crawl en russe : 674 clics, aucune erreur. Rien à corriger.
- 2026-11-17 (it. 1910) : MONSTRES-VIVANTS : étapes 6 (meutes et nuées) et 7 (rangs), outils de vérification (vidéo, relevé
  des positions par --stage).
- 2026-11-17 (it. 1909, contrôle) : semaine simulée après les meutes (tirage des séries changé) : guerrier 350, mage 350
  (6 158 éclats chacun), comme le repère : rien à corriger.
- 2026-11-17 (it. 1908) : « Quoi de neuf », édition 122 (meutes et nuées ; élites et champions aguerris ; clés 3216-3217,
  10 langues). Autotest 253/253, lang-overflow ru/de/pl à 1280 et 1920 px : rien ne défile.
- 2026-11-17 (it. 1907, journée des monstres) : Bestiaire : l'infobulle des espèces grégaires dit « Grégaire : vient souvent
  à deux ou trois. » (clé 3215, 10 langues). Autotest 253/253.
- 2026-11-17 (it. 1906, journée des monstres) : meute impatiente : quand un loup (ou tout membre d'une meute) se bat, ses
  congénères qui attendent derrière lui s'avancent (jusqu'à 6 px, comme devant un héros affaibli), puis reprennent leur place.
  Vérifié dans le jeu (série de loups imposée), autotest 253/253.
- 2026-11-17 (it. 1905, journée des monstres) : meutes vérifiées dans le jeu (série de loups imposée, positions relevées
  toutes les 0,5 s : les deux suiveurs avancent et reculent avec le chef, à quelques pixels près). Correction : deux ours
  voisins se suivaient aussi ; seules les espèces grégaires (PACK_ARTS) font meute sur la bande. Autotest 253/253.
- 2026-11-17 (it. 1904, journée des monstres) : la vidéo de contrôle a montré que les meutes de l'it. 1903 ne se formaient
  presque jamais (le tirage « comme des cartes » interdit deux fois le même monstre de suite). Espèces grégaires
  (game.js PACK_ARTS : loups, chauves-souris, rats, corbeaux, guêpes, harpies, gluants, sangliers) : 35 % de chances que le
  suivant soit un congénère, trois au plus. Test (300 séries). Balance +0,4, fuzz 600 / 0, autotest 253/253.
- 2026-11-17 (it. 1903, journée des monstres) : meutes et nuées : deux voisins (ou plus) de la même espèce qui marchent ou
  volent suivent le même chef de file (65 % de son mouvement, avec 0,25 s de retard, même regard) ; ils se déplacent
  ensemble au lieu de flâner chacun de son côté. Autotest 253/253, bande 18,3 %.
- 2026-11-17 (it. 1902) : POUR-VICTOR : ce qu'il y a à regarder en jouant après la journée des monstres (vie de la bande,
  compétences et leur fréquence, séries de 7 à 13, lieutenants, équilibre −0,8 zone gardé, performance sous Windows).
- 2026-11-17 (it. 1901, revue générale) : perf:linux bande 18,1 %, panneau 19,5 %, mini 5,5 % ; 12 h graine 201 : paladin
  64, lancier 62, cryomancienne 65 ; fuzz sous chaque bénédiction : 400 parties, 0 bloquée ; allemand : aucun mot français
  (« des » est l'article allemand). Rien à corriger.
- 2026-11-17 (it. 1900, contrôle) : lang-overflow complet après la journée des monstres (compétence du boss dans le panneau
  de zone, sous-titre du Bestiaire, astuces, éditions 120-121) : aucun défilement ni mot coupé, 10 langues.
- 2026-11-17 (it. 1899, journée des monstres) : hiérarchie des compétences : élites −15 % d'intervalle, champions −25 %
  (compensés), mot doré / violet comme leur contour ; les boss restent au-dessus (−20 %, mot couleur boss, secousse).
  Balance contre HEAD : +0,2 ; fuzz 600 / 0 ; npm test 346, autotest 253/253.
- 2026-11-17 (it. 1898, contrôle) : mémoire après la journée des monstres : mem-watch 6 min, plat (608 → 614 Mo, pas de
  fuite) ; 3 min, avant (aea72772) / après : 559-562 / 563-564 Mo : la journée ne coûte rien en mémoire (le niveau à
  ≈ 610 Mo de la mesure longue tient à la durée, pas au code).
- 2026-11-17 (it. 1897, contrôle) : tableau des 20 héros (12 h, graines 7/3/11) : moyenne 64,0, écart 4,7 (le plus serré) ;
  mage 61,7 et nécromancien 62,0 en bas. Sur 7 graines contre aea72772 : mage 63,5 → 63,1 (bruit), nécromancien 63,7 →
  62,4 (−1,3, dans la marge ≈ ±1,1) : à surveiller, rien changé.
- 2026-11-17 (it. 1896) : scripts/strip-clip.sh : courte vidéo de la bande (zone et mise en scène au choix, écran virtuel
  à part, copie de dev-data) pour vérifier ce qui bouge ; essayé (zone 2, 6 s). Noté dans CLAUDE.md.
- 2026-11-17 (it. 1895, journée des monstres) : vidéo de 20 s de la bande (zone 26, de nuit) tournée comme steam-video.sh
  (Xvfb :78 à part, x11grab, ffmpeg d'imageio-ffmpeg, --stage pour la zone) et envoyée à Victor : vie en attente, « z »
  des bêtes de jour endormies, gestes et compétences visibles en mouvement.
- 2026-11-17 (it. 1894, journée des monstres) : entrée en scène des boss de zone : au début du combat, le boss se dresse
  (6 px) en tremblant, la bande tremble, « !! » couleur boss (lieutenants et Briseur exclus). Mesuré (zone 26) ; npm test
  346, autotest 253/253.
- 2026-11-17 (it. 1893) : README à jour de la journée des monstres (séries de 7 à 13 et vie en attente, compétences des
  monstres, monskills.js et monlife.js dans l'arborescence, ajouter un monstre : sa compétence). Idée écartée : réaction à
  la météo (ambiance fixe par zone, rien de vivant à y gagner).
- 2026-11-17 (it. 1892, journée des monstres) : « Quoi de neuf », édition 121 (« ! » et boss ; jour/nuit et bavardage ;
  chutes par famille ; réactions et Poupouce qui file ; geste en mode mini), clés 3210-3214, 10 langues (Poupouce gardé
  tel quel, comme en jeu). npm test 346, autotest 253/253, lang-overflow ru/de/pl 1280 propre.
- 2026-11-17 (it. 1891, revue générale) : perf:linux bande 18,0 %, panneau 19,8 %, mini 5,4 % (avec les gestes, bavardages,
  rythme jour/nuit et chutes) ; semaine : guerrier 350, mage 349 ; coréen : aucun mot français. Rien à corriger.
- 2026-11-17 (it. 1890, journée des monstres) : bavardage : toutes les 10 à 18 s, deux voisins loin du héros se tournent
  l'un vers l'autre 2 s avec de petits hochements. Mesuré : deux paires en 25 s, bien orientées. npm test 346, autotest
  253/253.
- 2026-11-17 (it. 1889, contrôle) : début de partie après la journée des monstres : first-minutes (premier boss, objet
  et rare à 71-86 s), tab-pace (talents 1 min, statistiques 2, quêtes 4-5, boutique 8-9, héros 10, carte 11-12, bestiaire
  13-15), early-pace (niveau 39, zone 24 à 60 min) : inchangés.
- 2026-11-17 (it. 1888, journée des monstres) : chute du monstre vaincu selon sa famille (strip.js corpseFall,
  CORPSE_FALL) : les volants tombent au sol, spectres et élémentaires montent en se dissipant, gluants et méduses
  s'affaissent, golems, squelettes, momies et sylvains s'effondrent en tremblant. Mesuré (chauve-souris : 48 → 72 px) ;
  npm test 346, autotest 253/253.
- 2026-11-17 (it. 1887, journée des monstres) : astuce « monskills » : après trois compétences vues (R.skillsSeen), elle dit
  ce qu'annonce le « ! » et renvoie au Bestiaire (survol des cartes). Clé 3209, 10 langues, aucune astuce coupée ;
  test ; npm test 346, autotest 253/253.
- 2026-11-17 (it. 1886, journée des monstres) : bilan d'équilibre contre aea72772 (avant les compétences), trois graines :
  −1,1 / −0,2 / −1,0 (moyenne −0,8). Venin et ombre compensés à leur tour (PV −4 % / −2 %) : −1,5 / −0,7 / −0,3 (−0,8) :
  pas la cause ; écart résiduel ≈ 1 % de progression en 12 h, gardé (monstres un peu plus coriaces, ressenti voulu).
  fuzz 600 / 0 ; npm test 345, autotest 253/253.
- 2026-11-17 (it. 1885, journée des monstres) : annonce lisible : pendant la préparation d'une compétence, un petit « ! »
  de sa couleur au-dessus du monstre (le joueur voit venir le coup). Mis en scène (sanglier) ; perf bande 18,4 % ;
  npm test 345, autotest 253/253.
- 2026-11-17 (it. 1884, journée des monstres) : rythme irrégulier des compétences (intervalle ±20 %, premier usage ±30 %,
  même moyenne) : un monstre n'est plus une horloge. Test de Poupouce rendu indépendant du tirage (compétence retirée
  comme le type). Balance contre HEAD : +0,9 ; fuzz 600 / 0 ; npm test 345, autotest 253/253.
- 2026-11-17 (it. 1883, journée des monstres) : le boss qui attend respire (balancement lent de 3 px au plus, il se
  redresse de 2 px quand le héros approche) ; élites et champions téméraires : ne sursautent pas, arpentent plus large
  (×1,3). Un commentaire // tombé au milieu d'une ligne a cassé la syntaxe (piège connu), corrigé avant commit. Test du
  boss adapté ; npm test 345, autotest 253/253.
- 2026-11-17 (it. 1882, journée des monstres) : Poupouce a sa nature (« cat », monlife.js) : petites courses vives, et quand
  le héros approche il recule de 14 px, dos tourné, pour filer ; un sort du héros fait sursauter les deux suivants de la
  file. npm test 345, autotest 253/253.
- 2026-11-17 (it. 1881, revue générale) : 12 h graine 191 : samouraï 62, nécromancien 61, artificier 62 ; perf:linux bande
  18,9 %, panneau 19,5 %, mini 5,6 % ; espagnol : aucun mot français ; --crawl en polonais : 673 clics en 22 s, aucune
  erreur. Rien à corriger.
- 2026-11-17 (it. 1880, journée des monstres) : ils sentent la faiblesse : héros sous 30 % de vie en plein combat, la file
  (hors boss) s'avance de 9 px vers lui, et recule quand il se rétablit (progressif). Mis en scène : 0 → 0,99 ; npm test
  345, autotest 253/253.
- 2026-11-17 (it. 1879, contrôle) : coût de la journée des monstres en fin de partie (--perf sur une copie neuve de
  endgame-save, avant aea72772 / après, l'un après l'autre) : bande 25,0 → 25,3 %, panneau 24,5 → 25,6 %, mini 6,3 → 6,4 %,
  icône 0,8 → 0,5 % : rien de notable.
- 2026-11-17 (it. 1878, journée des monstres) : jour et nuit : la nuit, les espèces de jour (sangliers, ours, orcs, bandits…)
  bougent à peine (×0,25) et dorment (« z » de temps en temps), celles de nuit (loups, chauves-souris, spectres,
  squelettes…) s'agitent (×1,4) ; l'entrain change lentement. Mis en scène de nuit (zone 26) : valeurs attendues, cinq
  « z » en 9 s. npm test 345, autotest 253/253.
- 2026-11-17 (it. 1877, journée des monstres) : gestes au repos : de loin en loin (18 à 38 s), un monstre qui attend fait
  un petit bond et lâche trois étincelles de la couleur de sa compétence (jamais la mimique ni le boss). Mesuré : 8 monstres
  ont fait leur geste en 25 s ; perf bande 18,4 %, mini 5,3 %. npm test 345, autotest 253/253.
- 2026-11-17 (it. 1876, journée des monstres) : Bestiaire > Capacités des boss : le sous-titre dit que chaque boss a aussi la
  compétence de sa famille (au survol de sa carte). Clé 3208, 10 langues ; lang-overflow ru/de/pl/fr 1280-1920 propre ;
  npm test 345, autotest 253/253.
- 2026-11-17 (it. 1875, contrôle) : save-fuzz après la journée des monstres (séries variables, compétences) : dev ok
  (1267), fin ok (1225), 0.1.2 ok (1169). Le monstre en combat (compétence, minuteries, or volé) n'est pas sauvegardé.
- 2026-11-17 (it. 1874, journée des monstres) : version de boss de la compétence de famille : plus fréquente (−20 %),
  premier usage plus tôt, compensée ; sur la bande, mot couleur boss, secousse et gerbe d'étincelles. Balance contre
  aea72772 : −2,0 / −0,6 / +0,4 (moyenne −0,7 ; −0,4 avant : bruit, tendance à surveiller) ; fuzz 600 / 0 ; npm test
  345, autotest 253/253.
- 2026-11-17 (it. 1873, journée des monstres) : mode mini : le monstre combattu fait une version réduite du geste de sa
  compétence (se tasse de 2 px pendant l'annonce, s'élance de 6 px et se soulève de 4 px) et s'efface à demi quand il
  est caché ou intangible (phaseT). Mesuré en jeu (x 129 → 135, y 27 → 30). npm test 345, autotest 253/253.
- 2026-11-17 (it. 1872, contrôle) : rôdeur et barde « en recul » au tableau de l'it. 1871 : sur 7 graines (7, 3, 11, 21,
  31, 41, 51), contre aea72772 (avant les compétences de monstres, git worktree) : rôdeur 62,7 → 62,7, barde 64,6 → 64,1 :
  bruit, rien à corriger (le tableau à 3 graines tombait sur leurs mauvaises graines).
- 2026-11-17 (it. 1871, revue générale, journée des monstres) : tableau des 20 héros (12 h, graines 7/3/11) après les
  compétences de monstres : moyenne 64,4 (it. 1825 : 65,0), écart 5,0 (6,3) ; en recul : rôdeur 61,3 (65,3) et barde
  61,7 (65,0), à vérifier sur 7 graines ; moine 68,0 → 64,3. perf:linux bande 18,2 %, panneau 19,8 %, mini 5,5 % ;
  chinois : aucun mot français.
- 2026-11-17 (it. 1870, journée des monstres) : contrôle visuel de six compétences en plein geste (bond, piqué, charge,
  poing de pierre, fouissement, souffle ; mise en scène : strip.mfx figé à mi-course avant --shot). Contre un héros au
  corps à corps, les élans vers le héros ne faisaient que quelques pixels (distance ≈ 0) : plancher de 10 px pour les
  onze élans (strip.js monSkillPose). Captures : chaque geste se lit. npm test 345, autotest 253/253.
- 2026-11-17 (it. 1869, journée des monstres) : « Quoi de neuf », édition 120 (lieutenants : dessin et pouvoir unique,
  Briseur plus coriace ; le Rebord vit ; zones de 7 à 13 monstres ; une compétence par sorte de monstre), clés
  3204-3207, 10 langues (noms repris tels que traduits). npm test 345, autotest 253/253, lang-overflow ru/de/pl 1280 propre.
- 2026-11-17 (it. 1868, journée des monstres) : volants : altitude de croisière propre, qui monte et descend lentement
  (mesuré : ≥ 30 px du haut de la bande pour les monstres ordinaires, la rangée d'informations fait 24 px) ; monstre
  ordinaire sous 25 % de vie : recule en tremblant (5 px, 9 px pour les craintifs). npm test 345, autotest 253/253.
- 2026-11-17 (it. 1867, journée des monstres) : réactions de groupe sur la bande : à la mort d'un monstre, les trois
  suivants sursautent et reculent (8 px, 16 px pour les craintifs : rats, gobelins, bandits, diablotins, crapauds,
  corbeaux, lézards) ; héros à terre : la file sautille de joie, chacun à son tour. Mesuré en jeu (le mort est à S.kills
  quand l'événement part : décalage corrigé). npm test 345, autotest 253/253.
- 2026-11-17 (it. 1866, journée des monstres) : les boss de zone reçoivent la compétence de leur famille (compensée),
  listée à la suite de leurs capacités dans le panneau de zone (lieutenants et Briseur exclus). Trouvé en passant : le
  Bestiaire > Capacités des boss listait aussi les quatre pouvoirs uniques de l'it. 1849 et défilait en russe (jusqu'à
  77 px) et en allemand (36 px) ; ils en sont retirés (UNIQUE_MECHS). lang-overflow complet : propre. Balance contre
  aea72772 : −1,8 / +0,9 / −0,4 ; fuzz 600 / 0 ; npm test 345, autotest 253/253.
- 2026-11-17 (it. 1865, journée des monstres) : dernières familles : mimiques (Claquement dès le début du combat),
  bandits (Vol à la tire : l'or volé revient à leur chute, sans compter comme gagné), champignons errants (Pollen),
  chevaliers errants (Estoc qui traverse le bouclier), gobelins pillards (Bombe). Toutes les sortes de monstres ont
  désormais leur compétence (test : aucune oubliée, hors gobelin doré et Poupouce). Balance contre aea72772 : −1,0 / +0,4
  / +1,1 ; early-pace 39 / 23 ; fuzz 600 / 0 ; npm test 345, autotest 253/253.
- 2026-11-17 (it. 1864, journée des monstres) : cultistes : Sacrifice ; guêpes : Vol erratique ; méduses : Décharge ;
  lézards : Embuscade et vers : Fouissement (cachés 1,5 s hors d'atteinte, puis surgissent : phase « out ») ; corbeaux :
  Bec à l'œil (aveuglé 2 s, par R.eclipse). 36 familles faites. Balance contre aea72772 : −1,0 / +0,1 / −0,2 ; fuzz
  600 / 0 ; npm test 344, autotest 253/253.
- 2026-11-17 (it. 1863, journée des monstres) : scarabées : Pince ; sangliers : Charge (recul en grattant le sol, puis
  ruée jusqu'au héros) ; ours : Rugissement ; orcs : Rage (+40 % 3 s, attaque compensée). 30 familles faites. Balance
  contre aea72772 : +0,2 / +0,9 / −0,2 ; fuzz 600 / 0 ; npm test 344, autotest 253/253.
- 2026-11-17 (it. 1862, journée des monstres) : wyvernes : Souffle (trois coups de 50 %) ; tyrannœils : Regard pétrifiant
  (héros figé 1,2 s) ; crapauds : Coup de langue ; serpents : Frappe éclair (deux coups de 60 %). 26 familles faites.
  Balance contre aea72772 : −0,7 / +1,3 / +0,8 ; fuzz 600 / 0 ; npm test 344, autotest 253/253.
- 2026-11-17 (it. 1861, revue générale, journée des monstres) : semaine avec 22 familles de compétences : guerrier 366
  (dernière course), mage 350 : la fin de partie tient. perf:linux bande 18,3 %, panneau 19,3 %, mini 5,6 % (une première
  mesure à 25,4 % était faussée par les deux semaines simulées en parallèle : noté dans CLAUDE.md) ; russe : aucun mot
  français (compétences du Bestiaire comprises). Rien à corriger.
- 2026-11-17 (it. 1860, journée des monstres) : élémentaires de feu : Flambée (×1,5) ; crabes : Carapace (2 s à 30 % des
  dégâts, par bulwarkFactor : coups, clics, sorts, drone) ; chevaliers noirs : Parade et riposte (bouclier 1,2 s à 80 %,
  puis riposte ×1,3) ; sylvains : Enracinement (+8 % PV ; le pourri empoisonne). Gardes et soins compensés sur les PV.
  Balance contre aea72772 : −0,6 / +1,0 / −0,1 ; fuzz 600 / 0 ; npm test 344, autotest 253/253.
- 2026-11-17 (it. 1859, journée des monstres) : momies : Malédiction du tombeau (héros maudit 3 s, attaque compensée) ;
  yétis : Bloc de glace (×1,8, gel 1 s, PV compensés) ; harpies : Rafale de plumes (quatre plumes de 30 %). Balance contre
  aea72772 : −0,7 / +1,4 / 0,0 ; fuzz 600 / 0 ; npm test 344, autotest 253/253.
- 2026-11-17 (it. 1858, journée des monstres) : diablotins : Boule de feu (×1,2, éclat des mains au héros) ; rats :
  Grouillement (trois morsures éclair de 40 %) ; araignées : Toile (attaques du héros −40 % 2 s, PV compensés), la veuve
  noire (version propre) mord en plus. Balance contre aea72772 : −1,1 / −0,8 / +0,4 (neutre) ; fuzz 600 / 0 ; npm test 344 ;
  autotest 253/253 (un échec isolé du glisser de ⌃ sous la charge de trois simulations, revenu seul : bruit connu).
- 2026-11-17 (it. 1857, journée des monstres) : plantes : Racines (toutes les 7 s, héros enlacé 1 s, la plante regagne
  3 % de ses PV) ; mandragore (version propre) : Cri (étourdi 0,5 s, silence 2 s) ; spectres : Intangible (toutes les 7 s,
  1,5 s à demi effacés, coups du héros « Raté ! », PV compensés). Bestiaire : l'effet du feu n'est plus annoncé pour une
  compétence sans coup. Balance contre aea72772 : −2,0 / −0,1 / +1,0 (graines 7, 3, 11 : neutre) ; fuzz 600 / 0 ;
  npm test 344, autotest 253/253.
- 2026-11-17 (it. 1856, journée des monstres) : loups : Hurlement de meute (toutes les 8 s, se dressent et hurlent, 30 %
  plus rapides 3 s, attaque compensée ; les loups qui attendent dans la file relèvent la tête : vérifié en jeu, 5 / 5) ;
  golems : Poing de pierre (arment lentement, abattent ×2,2 esquivable, secousse). Balance contre aea72772 : +0,1 / +0,7 ;
  fuzz 600 / 0 ; npm test 344, autotest 253/253.
- 2026-11-17 (it. 1855, journée des monstres) : squelettes : Os qui se reforment (abattus une première fois, ils
  s'écroulent en tas d'os 0,8 s, étourdis, puis se relèvent avec 30 % de leurs PV ; PV de départ ÷ 1,3) ; scorpions :
  Dard (se cabrent, un coup de plus et 1,5 s de venin, la pureté le raccourcit ; obsidienne : malédiction). Mots, poses,
  sons, 6 clés ; test du squelette. Balance contre aea72772 : −0,3 / +1,3 (graines 7, 3) ; fuzz 600 / 0 ; npm test 344,
  autotest 253/253.
- 2026-11-17 (it. 1854, journée des monstres) : chauves-souris : Piqué (montent de 16 px, fondent sur le héros, ×1,3 ; le
  vampire, version propre, boit la moitié du sang versé) ; champignards : Nuage de spores (gonflent, étourdissent le héros
  0,8 s ; le vénéneux empoisonne). Règle d'équilibre (game.js skillBalance) : un coup en plus baisse l'attaque d'autant,
  un étourdissement ou un gel baisse les PV d'autant ; poison des variantes 3 → 1,5 s. Sans elle : balance −1,7 ; avec :
  −1,4 / +0,8 / −0,4 sur trois graines contre aea72772. Test générique (chaque compétence : jouée, mot, son, autotest,
  traduite) ; early-pace, fuzz 600 / 0 ; npm test 343, autotest 253/253.
- 2026-11-16 (it. 1853, journée des monstres) : cadre des compétences de monstres (game/monskills.js : une par famille,
  teintée par l'élément de la variante : feu ×1,2, givre gel 1,5 s, poison venin 3 s, ombre malédiction 2 s ; annonce
  « tell » puis effet ; Bestiaire : en infobulle) ; première famille, les gluants : Bond gluant (toutes les 6 s, se
  ramassent puis bondissent, ×1,4). Pose mesurée en jeu (écrasé +3 px, arc de 21 px vers le héros) ; son « boing » rendu
  par l'autotest ; 7 clés, 10 langues. balance −0,1, early-pace inchangé, fuzz 600 / 0 ; npm test 342, autotest 253/253.
- 2026-11-16 (it. 1852, journée des monstres) : séries de 7 à 13 monstres (triangle autour de 10, même moyenne) :
  zoneCount (game.js), ZONE_COUNT (data.js), strip.js fights() (bande, pastille), panneau et mini (« n / longueur »),
  migrate borne le compte à 13, série jamais plus courte que le compte fait. Tests adaptés (compte = longueur de la série) ;
  balance 12 h −0,4 (bruit), early-pace 39 / 23 à 60 min, fuzz 600 parties 0 bloquée, save-fuzz ok (1267) ; captures 7 et
  13 monstres ; npm test 342, autotest 253/253.
- 2026-11-16 (it. 1851, revue générale) : 12 h graine 181 : gladiateur 65, druide 62, gardien stellaire 71 ; perf:linux bande
  18,3 %, panneau 19,4 %, mini 5,6 % (vie des monstres comprise) ; portugais : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1850, journée des monstres, demande de Victor) : plan dans docs/MONSTRES-VIVANTS.md ; vie des monstres
  en attente (render/monlife.js) : marcheurs (±30 px, arrêts), volants (planent, dérivent), sauteurs (gluants, crapauds),
  furtifs (courses brèves), colosses (un pas de loin en loin), mimique immobile ; à moins de 150 px du héros, retour à sa
  place, face à lui ; boss en place ; dos au héros quand il s'éloigne (classe .flip, images seules). Positions relevées
  en jeu toutes les 0,7 s ; perf bande 17,9 % (avant 18,3) ; test ; npm test 341, autotest 253/253.
- 2026-11-16 (it. 1849, demande de Victor : « des compétences uniques, plus durs que la normale, le Briseur encore plus
  dur ») : pouvoirs uniques (bosses.js, hors de ORDER) : Chaînes du Geôlier (toutes les 10 s, héros enchaîné 1,5 s : plus
  d'attaques ; sorts et clics passent), Renaître des cendres (Reine : à 50 % de vie, +20 % PV et +25 % d'attaque), Éclipse
  (Chevalier, à la place du Miroir : toutes les 12 s, 3 s où le héros rate un coup sur deux), Ciel brisé (Briseur : toutes
  les 10 s, trois coups à 60 %, esquivables) ; échos : même pouvoir. Briseur PV ×2,5 → ×3, attaque ×1,25 → ×1,3. Mots sur
  la bande et sons (rendus par l'autotest) ; 12 clés, 10 langues ; page Steam : 15 → 19 capacités de boss (10 langues).
  balance 12 h : +1,4 (bruit) ; semaine guerrier et mage : 350 (inchangé) ; fuzz 600 parties, 0 bloquée ; test ;
  npm test 340, autotest 253/253.
- 2026-11-16 (it. 1847, demande de Victor : « les boss qui tiennent les reliques, uniques et charismatiques comme le dernier
  boss ») : les trois lieutenants ont leur dessin (render/art-monsters2.js, MAJOR_ART ; relics.js, champ art), au format du
  Briseur (14 × 13, deux images) : Geôlier mécanique (automate de fer et de laiton, œil rouge, fournaise, lanterne-cage),
  Reine des cendres (couronne de braises, chevelure de feu, Cœur de l’aube dans la poitrine), Chevalier de l’éclipse (disque
  noir cerclé d’or, cape pourpre, lame violette). Bande, mode mini, icône de la barre de vie et Carte (portrait + relique) ;
  plus de couronne générique sur eux ; échos : même dessin, contour spectral. Captures zones 50, 100, 150, 250 et mini ;
  test (dessins complets) ; npm test 339, autotest 253/253, lang-overflow ru/de 1280-1920 propre.
- 2026-11-16 (it. 1846, contrôle) : fuzz sous chaque bénédiction du jour (FUZZ_DAYMOD=all, 20 graines) après la défense de
  l'assassin : 400 parties, 0 bloquée.
- 2026-11-16 (it. 1845) : Journal, la récompense de connexion du jour passe en ✓ (gardée par le filtre ; 10 langues vérifiées).
  Gobelins dorés laissés ordinaires : une Ruée en écrirait des dizaines. npm test 338, autotest 253/253.
- 2026-11-16 (it. 1844) : Journal, la ligne « 🏆 Succès : … » (écrite par app.js) n'avait aucune catégorie : écartée par le
  filtre ; passe en ⚑ (vérifié dans les 10 langues). Le test de l'it. 1842 lit aussi app.js. npm test 338, autotest 253/253.
- 2026-11-16 (it. 1843) : CLAUDE.md, piège des couleurs du Journal complété (ordre de LOG_KEYS = priorité, test des 10 langues).
- 2026-11-16 (it. 1842) : test permanent : chaque modèle de ligne du Journal (les tx() des this.log de game.js, 74) garde
  la même catégorie dans les 10 langues ; vérifié en remettant l'ancien ordre des catégories (échec « fr : sac plein »).
  npm test 338.
- 2026-11-16 (it. 1841, revue générale) : 12 h graine 171 : berserker 69, arbalétrier 64, cryomancienne 66 ; perf:linux bande
  18,4 %, panneau 19,4 %, mini 5,6 % ; japonais : aucun mot français (« attributs » = repère « --- attributs » du dump).
  Rien à corriger.
- 2026-11-16 (it. 1840) : Journal, catégorie de chacun des 74 modèles de ligne dans les 10 langues : deux écarts. Russe :
  « Событие открыто: » (événement découvert) contenait « Открыто: » (déblocage) et passait en ⚑ ; français : le légendaire de
  Poupouce resté au sol passait en ★ (nom de la rareté) au lieu de ⚠. Ordre des catégories = priorité : avertissements,
  légendaires, rare et événements, étapes, épiques, bonnes nouvelles ; 0 écart ensuite. Test sur les 10 langues ;
  npm test 337, autotest 253/253.
- 2026-11-16 (it. 1839) : « Quoi de neuf », édition 119 (Journal : événements et étapes gardés par le filtre ; légende des
  symboles ; astuce du filtre), clés 3065-3067, 10 langues. npm test 336, autotest 253/253.
- 2026-11-16 (it. 1838) : légende des symboles du Journal au survol de la case « Lignes importantes seulement » (★ ◆ ✦ ✓ ⚑ ⚠ ;
  aucune légende avant). Clé 3064, 10 langues, noms de rareté repris tels que traduits (japonais « レジェンド »).
  npm test 336, autotest 253/253.
- 2026-11-16 (it. 1837) : Journal, 6e catégorie « lg-mile » (⚑, couleur --accent) : relique obtenue ou renforcée, ascension, héros
  libéré, Briseur d'Étoiles vaincu, nouvelle bénédiction, première panoplie, déblocage, guilde, talent ultime, sort appris ;
  ces étapes étaient écartées par le filtre « Lignes importantes seulement ». Motifs vérifiés en fr, en, zh, ja, ko, ru ;
  capture de la fin de partie dans les deux thèmes. Test ; npm test 336, autotest 253/253.
- 2026-11-16 (it. 1836) : l'astuce « logimp » promettait « légendaires, records et événements » : le filtre ne gardait ni les
  bilans d'événements, ni leurs découvertes, ni les records. Bilan de fin d'événement, « Événement découvert » et nouvelle
  sorte d'élite passent dans lg-rare (motif traduit vérifié dans les 9 langues) ; astuce reformulée (« butin rare, événements,
  quêtes et chutes du héros », clé 3063, la 3062 ne sert plus). Test ; npm test 335, autotest 253/253, aucune astuce coupée.
- 2026-11-16 (it. 1835, contrôle) : la bulle manquait sur les captures de l'it. 1834 ; mesurée (visible, opacité 1, 38 px
  au-dessus de la bande) puis capturée : l'astuce « logimp » s'affiche sur une ligne en allemand (981 px). Pour une capture
  d'astuce : dans le --stage, __clearToasts() puis __checkHints() à 12 s, --shot-delay=14000. Rien à corriger dans le jeu.
- 2026-11-16 (it. 1834, contrôle) : astuce « logimp » mise en scène en allemand (toutes les autres marquées vues, 5 000
  monstres) : nextHint la propose et la bulle reçoit « Das Protokoll läuft zu schnell? Hake „Nur wichtige Zeilen“ an… »
  ; brouillon du devlog 0.1.6 complété. (Capture sans bulle : mise en scène mal minutée, voir it. 1835.)
- 2026-11-16 (it. 1833) : astuce « logimp » : le filtre du Journal (it. 1723) restait à découvrir ; une fois 2 000 monstres vaincus,
  onglet Statistiques ouvert et case pas cochée, la bulle cite « Lignes importantes seulement » (Statistiques > Journal) et
  ouvre le Journal au clic. Clé 3062 (10 langues, i18n-quotes et i18n-paths : 0 écart) ; aucune astuce coupée (de, ru, pl,
  es, pt). Test ; npm test 334, autotest 253/253.
- 2026-11-16 (it. 1832, contrôle) : --crawl en coréen sur la partie de fin de partie (Journal horodaté, Statistiques complètes) :
  688 clics en 24 s, aucune erreur.
- 2026-11-16 (it. 1831, revue générale) : 12 h graine 161 : assassin 62, chaman 62, barde 61 (graine dure pour les trois) ;
  perf:linux bande 18,4 %, panneau 19,7 %, mini 5,7 % ; polonais : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1830) : early-pace accepte `CLS=<classe>`. Première heure (5 graines) : guerrier niveau 40 zone 24,
  assassin 41 / 24, mage 41 / 22 : la défense de l'assassin et les PV du mage ne pressent pas le début.
- 2026-11-16 (it. 1829, contrôle) : semaine simulée après la défense de l'assassin (it. 1826) : assassin 350 (palier de l'écho, 43 courses,
  6 158 éclats), guerrier 350 : même plafond de semaine que le repère de l'it. 1708, pas d'emballement.
- 2026-11-16 (it. 1828) : « Quoi de neuf », édition 118 (duo : combattants et serviteur ne se cachent plus ; défense de l'assassin ; PV du
  mage) ; 10 langues (noms de classes repris tels que traduits), clés 3059-3061. npm test 333, autotest 253/253.
- 2026-11-16 (it. 1827, contrôle) : morts en 12 h (graine 7) : berserker 177, arbalétrier 164, moine 134, paladin 47 (assassin 239
  avant l'it. 1826) : écarts modérés, berserker fragile par conception ; rien changé.
- 2026-11-16 (it. 1826) : assassin : il mourait deux fois plus que le moine (239 contre 134 en 12 h, graine 7) ; défense ×0,9 → ×1,1 :
  61,4 → 64,0 sur 7 graines (62 62 66 65 66 65 62 ; avant 62 61 61 62 62 62 60), là où PV, attaque, critique et poison
  n'avaient rien donné (it. 1750, 1795-1796). Fuzz 600 parties, 0 bloquée ; npm test 333, autotest 253/253.
- 2026-11-16 (it. 1825, contrôle) : tableau des 20 héros (12 h, graines 7/3/11) : 61,7 assassin → 68,0 moine, moyenne 65,0, écart
  6,3 (it. 1748 : 7,0) ; mage 63,7 (dernier avant ses PV). Repère mis à jour dans CLAUDE.md.
- 2026-11-16 (it. 1824, contrôle) : lang-overflow complet après le Journal horodaté et le duo : aucun défilement ni mot coupé
  (10 langues, 4 largeurs, fin de partie, état maximal, 130 %).
- 2026-11-16 (it. 1823) : autotest : deux combattants au contact (guerrier + samouraï), le compagnon 15 px en retrait du héros.
  Autotest 253/253.
- 2026-11-16 (it. 1822, contrôle) : serviteur tiré des statistiques du duo (un compagnon nécromancien en donne un aussi) : le
  placement de l'it. 1818 compare serviteur et compagnon quel qu'il soit ; steam/checklist.md à jour (72 succès, rien de daté).
- 2026-11-16 (it. 1821, revue générale) : simulation 12 h graine 151 : moine 62, lancier 65, prêtresse 62 ; perf:linux bande 18,3 %,
  panneau 19,7 %, mini 5,7 % ; coréen : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1820) : autotest : nécromancien + samouraï en marche, le serviteur passe devant le compagnon (42 px). Autotest
  252/252.
- 2026-11-16 (it. 1819, contrôle) : mode mini sans serviteur (rien à faire pour le cas de l'it. 1818) ; fuzz avec une bénédiction du
  jour par graine (FUZZ_DAYMOD=all) : 1200 parties, 0 bloquée.
- 2026-11-16 (it. 1818) : nécromancien + compagnon au corps à corps : le squelette se superposait au compagnon (en marche : même
  place devant le héros ; au combat : même contact). En marche, le serviteur passe devant le compagnon qui mène ; au combat, le
  compagnon se tient 18 px derrière le serviteur. Captures (trois personnages séparés) ; npm test 333, autotest 251/251.
- 2026-11-16 (it. 1817) : CLAUDE.md, Pièges : règles de placement du duo (bande et mode mini) et contrôle de l'autotest associé.
- 2026-11-16 (it. 1816, contrôle) : mode mini, duo de deux combattants (guerrier + samouraï) : le compagnon reste lisible à gauche,
  le héros devant ; rien à corriger.
- 2026-11-16 (it. 1815, contrôle) : simulation 24 h (graine 7) : guerrier et mage au même record (86, dernière table « Courses ») ; repère
  à 24 h pour la suite (mage plus en retard après ses PV, it. 1748).
- 2026-11-16 (it. 1814, contrôle) : duo face à un boss (Chapeau-Pourpre, zone 57) : samouraï compagnon visible derrière le guerrier,
  arbalétrier entier à l'écart ; les corrections des it. 1802 et 1807 valent aussi contre les boss.
- 2026-11-16 (it. 1813, contrôle) : --crawl en portugais (675 clics en 21 s, aucune erreur) ; texte affiché sans mot français ni
  {n}, undefined ou NaN.
- 2026-11-16 (it. 1812, contrôle) : scène la plus chargée (nécromancien + serviteur squelette + arbalétrier compagnon + familier) :
  chacun reste lisible (arbalétrier entier derrière, squelette devant le héros).
- 2026-11-16 (it. 1811, revue générale) : simulation 12 h graine 141 : samouraï 69, arbalétrier 62, barde 69 ; perf:linux bande
  18,2 %, panneau 19,5 %, mini 5,7 % (duo et Journal horodaté sans coût visible) ; allemand : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1810) : README à jour (duo lisible sur la bande, Journal horodaté).
- 2026-11-16 (it. 1809) : autotest : duo guerrier + arbalétrier, le tireur ne recouvre pas le héros (16 px d'écart) et passe derrière lui
  (z-index 1). Autotest 251/251.
- 2026-11-16 (it. 1808, contrôle) : les quatre sortes de duo en combat sur la bande : tireur derrière un combattant (it. 1802),
  deux combattants (it. 1807), mage + samouraï (compagnon devant, séparés), mage + rôdeur (rôdeur entier derrière, arc qui
  passe derrière le mage) : tous lisibles.
- 2026-11-16 (it. 1807, suite de la demande de Victor) : deux combattants au corps à corps (guerrier + samouraï) se tenaient au même
  point de contact et se cachaient l'un l'autre : le compagnon se tient 20 px en retrait et passe derrière le héros
  (.actor.hero.partner, z-index 1) : les deux lisibles, le héros entier. Captures ; npm test 333, autotest 250/250.
- 2026-11-16 (it. 1806) : « Quoi de neuf », édition 117 (Journal horodaté, duo plus lisible, expérience en violet) ; 10 langues, clés
  3056-3058. npm test 333, autotest 250/250.
- 2026-11-16 (it. 1805) : devlog 0.1.6 complété (duo plus lisible, expérience en violet : demandes de Victor, it. 1802-1804).
- 2026-11-16 (it. 1804, suite de la demande de Victor) : mode mini, tireur derrière un héros au corps à corps : contre le bord
  (4 px plus en arrière, écart 18 → 22 px) ; essai d'avancer le héros abandonné (sa barre de vie touchait celle du monstre au
  contact, le monstre étant placé indépendamment du héros). Captures ; npm test 333, autotest 250/250.
- 2026-11-16 (it. 1803, contrôle) : carreaux de l'arbalétrier compagnon capturés en vol (tirs forcés) : ils partent de l'arbalète,
  passent devant le héros et atteignent le monstre, à la hauteur des tirs du héros ; capture envoyée à Victor.
- 2026-11-16 (it. 1802, demandes de Victor) : (1) compagnon à distance derrière un héros au corps à corps (arbalétrier derrière le
  samouraï) : 16 px d'écart au lieu de 6 px de recouvrement : il ne disparaît plus derrière le héros et ses flèches ont un
  trajet visible (captures guerrier + arbalétrier) ; (2) barre « Expérience » de l'Aventure en violet (#b48cff) comme la
  jauge de la bande et le mode mini (dans le mode mini, la barre jaune du bas est l'objectif du prochain déblocage).
  npm test 333, autotest 250/250.
- 2026-11-16 (it. 1801, revue générale) : simulation 12 h graine 131 : nécromancien 59, druide 64, paladin 69 ; perf:linux bande 18,2 %,
  panneau 19,7 %, mini 5,8 %. Journal horodaté : 1,8 ms par affichage (deux formateurs Intl créés par ligne) → 0,14 ms avec des
  formateurs gardés par langue (ui/log.js). Autotest 250/250.
- 2026-11-16 (it. 1800) : Journal horodaté : chaque nouvelle ligne montre son heure (« 19:46 » aujourd'hui, la date avant, au
  format de la langue) ; S.logT parallèle à S.log, tenu aligné dans log, logRepeat, logReplace, logSale, logLeft et au
  changement de langue (défaut d'ordre dans logReplace trouvé par le test et corrigé) ; migrate nettoie. Test ; save-fuzz ok
  (1267), npm test 333, autotest 250/250, lang-overflow ru, de 1280 propre ; captures en, ja.
- 2026-11-16 (it. 1799, contrôle) : early-pace (3 graines) : à 60 min 114 objets, niveau 39, zone 24, 6,3 déblocages (repère it. 1240 :
  114, zone 23, 6) ; 10 min : 19 objets, zone 9, 1,3 déblocage. Rythme de la première heure inchangé.
- 2026-11-16 (it. 1798, contrôle) : joueur totalement absent (IDLE=1, guerrier, 12 h) : record 16, comme le repère (it. 698) ; les
  changements du jour n'ont pas touché la progression sans action.
- 2026-11-16 (it. 1797, contrôle) : succès « Poupouce ?! » : nom seul, sans description (jeu et steam/achievements.md) : rien de
  l'ancien Poupouce à corriger avant sa déclaration dans Steamworks.
- 2026-11-16 (it. 1796, essai abandonné) : assassin, poison 15 % → 20 % sur 7 graines : 61,4 (inchangé). Ni PV, ni attaque, ni
  critique, ni poison ne le font passer le palier de la zone 62 : limite ailleurs (or, équipement) ; piste close, rien gardé.
- 2026-11-16 (it. 1795, essai abandonné) : assassin sur 7 graines (7/3/11/21/31/41/51) : actuel 61,4 ; attaque ×1,25 et critique +25 :
  62,1 (+0,7, bruit). Rien gardé ; sa faiblesse viendrait de son fonctionnement (poison, corps à corps), pas de ses chiffres.
- 2026-11-16 (it. 1794) : devlog 0.1.6 complété (répliques de Tico, it. 1739 et 1762) ; il couvre les éditions 115 et 116.
- 2026-11-16 (it. 1793) : « Quoi de neuf », édition 116 (légendaires de Poupouce au retour d'absence, ligne du Journal quand l'un
  reste au sol, nouvelles répliques de Tico) ; 10 langues (nom de Tico repris tel que traduit), clés 3053-3055. npm test 332,
  autotest 250/250.
- 2026-11-16 (it. 1792, contrôle) : panneau ouvert remesuré deux fois après le 20,0 % de la revue 1791 : 19,3 % et 19,0 % : du bruit,
  pas de régression.
- 2026-11-16 (it. 1791, revue générale) : simulation 12 h graine 121 : danseuse de lames 64, artificier 65, chaman 62 ; perf:linux
  bande 18,3 %, panneau 20,0 % (19,1-19,7 dans la journée : bruit), mini 5,7 % ; espagnol : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1790, contrôle) : lang-overflow complet (10 langues, 4 largeurs, fin de partie, état maximal, 130 %) après les
  changements d'interface depuis la 0.1.5 : aucun défilement ni mot coupé.
- 2026-11-16 (it. 1789) : autotest : retour d'absence, ligne des Poupouce (3 vaincus, 1 légendaire rangé → « +1 », pas « +3 »).
  Autotest 250/250.
- 2026-11-16 (it. 1788) : POUR-VICTOR rangé : les trois questions sur Poupouce regroupées, la 0.1.5 (envoyée) et ce qui reste à
  vérifier sous Windows dans une seule section ; entrées dépassées (« dire oui pour l'envoi ») retirées.
- 2026-11-16 (it. 1787) : autres tests de Poupouce revus après sa nouvelle rareté : celui de l'absence reste sûr (au-delà de 3 000
  victoires, au moins 3 garantis par le calcul) ; commentaires « 0,4 % » corrigés (juice.js, test-logic). npm test 332.
- 2026-11-16 (it. 1786) : test Poupouce de l'it. 1546 mis à jour : titre (chat, plus « 5 fois plus d'or »), 3 000 séries au lieu de 400
  (à 1 sur 1 000, absent 2 fois sur 100 : fragile au moindre renommage), type « poupouce » vérifié. npm test 332.
- 2026-11-16 (it. 1785, contrôle) : Bestiaire avec des monstres en plus (cartes clonées le temps de la mesure) : 85 cartes à 1920 et
  1280 px, 96 (8 rangées) en russe à 1920 px sur la fin de partie : aucun débordement ; la crainte de la revue 1741 est levée.
- 2026-11-16 (it. 1784, contrôle) : --crawl en japonais sur la partie de fin de partie (690 clics en 22 s, aucune erreur) ; texte
  affiché sans mot français ni {n}, undefined ou NaN.
- 2026-11-16 (it. 1783, contrôle) : npm test complet en 14 s (332 tests et 9 vérifications) : rien à optimiser. Idée écartée pour
  l'instant : un 19e événement rare (compte de la page Steam en 10 langues, succès « tous les événements » à revoir).
- 2026-11-16 (it. 1782) : page Steam : ne cite ni Poupouce ni le Journal (rien à mettre à jour) ; devlog 0.1.6 complété (légendaires de
  Poupouce perdus ou rangés, it. 1779-1780).
- 2026-11-16 (it. 1781, revue générale) : simulation 12 h graine 111 : cryomancien 62, arbalétrier 62, gardien stellaire 69 ;
  perf:linux bande 18,4 %, panneau 19,7 %, mini 5,6 % ; japonais (--dump-text) : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1780) : « Pendant ton absence » : « (+N objets légendaires) » ne compte que les légendaires de Poupouce vraiment rangés
  (sum.poupouceLeg ; sac plein : restés au sol, rien d'annoncé) ; test ; npm test 332, autotest 249/249.
- 2026-11-16 (it. 1779) : Poupouce vaincu sac plein : le Journal ajoute « Le légendaire de Poupouce est resté au sol : sac plein. »
  (en rouge, ⚠) au lieu de laisser croire au butin ; clé 3052, test ; npm test 331, autotest 249/249.
- 2026-11-16 (it. 1778) : « Pendant ton absence » : la ligne des Poupouce vaincus ajoute « (+N objets légendaires) » (chacun en
  laisse un) ; clé 3051 (pluriels, 3 formes en ru / pl), vue en russe ; npm test 330, autotest 249/249.
- 2026-11-16 (it. 1777, contrôle) : Poupouce vaincu + légendaire en même temps : bannières empilées sur deux hauteurs (rose puis
  « ★ LÉGENDAIRE »), sans chevauchement, réplique d'adieu au-dessus (captures à 4,2 et 5,6 s).
- 2026-11-16 (it. 1776, contrôle) : raccourcis clavier : les 11 touches gérées par panel.onKey (B C E F J M R S T U V) et les chiffres
  des onglets figurent tous dans la fenêtre d'aide (showKeys).
- 2026-11-16 (it. 1775, contrôle) : Jour de Poupouce avec le nouveau Poupouce : fuzz FUZZ_DAYMOD=poupouce 600 parties, 0 bloquée ;
  ≈ +100 % d'or ce jour-là (Jour de fortune +50 %) et un légendaire / 100 monstres : gardé, question dans POUR-VICTOR.
- 2026-11-16 (it. 1774) : brouillon du devlog 0.1.6 ouvert (docs/devlog-0.1.6-brouillon.md : bloc de publication, nouveautés depuis
  la 0.1.5 en français, à compléter au fil des éditions).
- 2026-11-16 (it. 1773) : « Quoi de neuf », édition 115 (Statistiques grisées avant la zone 40 et annonce, Poupouce et sac plein,
  Poupouce en mode mini) ; 10 langues, clés 3048-3050. npm test 330, autotest 249/249.
- 2026-11-16 (it. 1772) : page-itch.md : « Color-blind friendly » peut être coché (pastilles de rareté • •• ••• ★ sur les objets,
  symboles du Journal) ; le conseil donné à Victor disait « en partie », à tort. Signalé à Victor.
- 2026-11-16 (it. 1771, revue générale) : simulation 12 h graine 101 : lancier 62, chaman 62, gladiateur 67 (paliers 62 / 65 / 69,
  une graine) ; perf:linux bande 18,5 %, panneau 19,3 %, mini 5,7 % ; chinois (--dump-text) : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1770) : steam/itch/page-itch.md : réponses au formulaire de classification itch.io (entrées, durée, langues,
  accessibilité, contenu) et emplacement des images promotionnelles.
- 2026-11-16 (it. 1769) : CLAUDE.md : images promotionnelles itch.io et couverture de devlog régénérables par steam-capsules/make.js.
- 2026-11-16 (it. 1768, demande de Victor) : images promotionnelles itch.io (steam/itch/promo-images, Médias/dist-itch/promo) :
  réseaux sociaux 1200 × 630, favicon 512 × 512, couverture large 2520 × 1080 (21:9), logo transparent 1002 × 208 (recadré,
  contour sombre : lisible sur blanc et noir) ; scripts/steam-capsules/make.js (ONLY=itch-…).
- 2026-11-16 (it. 1768) : autotest : Poupouce et sac plein, le héros prévient (langue de l'autotest variable : réplique reconnue à sa
  longueur). Autotest 249/249.
- 2026-11-16 (it. 1767) : Poupouce arrive et le sac est plein : le héros prévient « Le sac est plein : vite, une place pour le
  légendaire de Poupouce ! » (bande et mode mini) ; la règle de Victor (butin perdu au sol) ne change pas, le joueur a le
  temps de vider une case. Clé 3047 (10 langues), bulle vue en allemand ; npm test 330, autotest 248/248.
- 2026-11-16 (it. 1766, contrôle) : légendaire de Poupouce avec le sac plein : perdu au sol comme tout butin (règle de Victor,
  addToBag) ; question posée dans POUR-VICTOR, rien changé.
- 2026-11-16 (it. 1765, contrôle) : save-fuzz après les ajouts de migrate du jour (Poupouce au Bestiaire, statsFullSeen) : base fin
  « ok balayage (1218) », base 0.1.2 « ok balayage (1162) ».
- 2026-11-16 (it. 1764) : devlog 0.1.5 : bloc « Publication » en tête (titre, couverture, tags, langues, texte) ; CLAUDE.md : le préparer
  à chaque version (Victor les a demandés un par un).
- 2026-11-16 (it. 1763, contrôle) : --crawl en russe sur dev-data (678 clics en 21 s) et sur une partie avant la zone 40 (616 clics,
  sous-onglets grisés des Statistiques compris) : aucune erreur.
- 2026-11-16 (it. 1762) : Tico (Statistiques) : deux répliques de plus pour la période « Journal seul » (avant la zone 40), qui
  n'en avait que deux (« Je recopie chacun de tes exploits dans le Journal… », « Plus tard, je t’en montrerai bien plus… ») ;
  10 langues, clés 3045-3046. npm test 330, autotest 248/248.
- 2026-11-16 (it. 1761, revue générale) : après la sortie de la 0.1.5 : simulation 12 h graine 91 : paladin 64, druide 66, barde 65 ;
  perf:linux bande 18,5 %, panneau 19,1 %, mini 5,6 % ; couverture de la 0.1.4 régénérée identique au pixel près (capsule.html
  paramétré à l'it. 1760 pour la 0.1.5). Rien à corriger.
- 2026-11-16 (it. 1760) : CLAUDE.md, sortie d'une version : éditions des versions 0.1.4 (101) et 0.1.5 (114) ; la 0.1.6 prendra after: 114.
- 2026-11-16 (it. 1759, « oui envoie ») : 0.1.5 envoyée sur itch.io par butler (REF=v0.1.5) : windows #2406906, linux #2406907,
  mac #2406908, toutes en 0.1.5 (correctifs de 11-12 Mo). Reste à Victor : publier le devlog (steam/itch/devlog-0.1.5.html).
- 2026-11-16 (it. 1758) : POUR-VICTOR : liste d'essai de la 0.1.5 sous Windows (notes de version, son, Journal, Poupouce) et commande
  d'envoi figée (REF=v0.1.5) pour après son « oui ».
- 2026-11-16 (it. 1757) : 0.1.5 construite (itch-push.sh --dry-run : Windows, Linux, Mac signée ad hoc) ; essai de l'AppImage avec un
  HOME temporaire (partie neuve, sauvegarde écrite, aucune erreur) ; déposée dans Médias/dist-itch avec SHA256-0.1.5.txt ;
  étiquette v0.1.5 sur 0b4dc0f0. Envoi itch.io (butler) en attente du « oui » de Victor ; devlog prêt (steam/itch/devlog-0.1.5.html).
- 2026-11-16 (it. 1756, demande de Victor : préparer la 0.1.5) : version 0.1.5 (package.json) ; notes de version RELEASE_015
  (10 nouveautés reprises des éditions 102-114, déjà traduites ; after: 101) ; tests des notes mis à jour. npm test 330,
  autotest 248/248, lang-overflow (10 langues) sans défilement ; fenêtre « Neu in Version 0.1.5 » vue en allemand à 1280 px.
- 2026-11-16 (it. 1755, contrôle) : first-minutes après les changements du jour : mêmes secondes (objet 15-79 s, boss 77-79 s,
  Talents ≈ 80 s, Quêtes ≈ 300 s) ; Statistiques (Journal) s'ouvre à 150-157 s, une découverte de plus dans ce creux.
- 2026-11-16 (it. 1754, contrôle) : textes de Poupouce après son changement : résumé d'absence (« Poupouce vaincus »), succès
  (nom seul), Statistiques > Moments rares (chance affichée « 0,1 % », avec la bénédiction du jour) : tous justes.
- 2026-11-16 (it. 1753) : mode mini : l'arrivée de Poupouce (« ✦ C’est… Poupouce ?! ») et les Statistiques complètes s'affichent
  en moment (la réplique du héros n'existait que sur la bande) ; textes déjà traduits. Captures fr, de (deux lignes) ;
  npm test 330, autotest 248/248.
- 2026-11-16 (it. 1752) : CLAUDE.md, équilibrage : les records de 12 h tombent sur des paliers ; confirmer un réglage de héros sur
  4 graines de plus contre l'ancien réglage avant de le garder (leçon des it. 1748-1751).
- 2026-11-16 (it. 1751, revue générale) : mage, PV 0,75 contre 0,85 (it. 1748) sur 4 nouvelles graines (21/31/41/51) : 62,5 contre
  62,5 ; sur les 7 graines, 61,9 → 63,0 (+1,1, pas +2,7 : la mesure de l'it. 1748 tenait du palier franchi) ; gardé (petit gain
  probable, mage parmi les plus bas). perf:linux bande 18,4 %, panneau 19,1 %, mini 5,7 % ; coréen (--dump-text) : aucun mot
  français. Rien d'autre à corriger.
- 2026-11-16 (it. 1750, essai abandonné) : assassin (61,7, le plus bas en 12 h, graines 7/3/11) : PV ×0,95 → 61,7 ; attaque ×1,25 →
  62,7 ; critique +25 → 62,7 ; les deux → 62,7. Les records tombent sur des paliers (murs des zones 62, 65, 69) : aucun
  réglage ne le fait passer de façon fiable au palier suivant ; rien gardé (gain non prouvé). Pour régler un héros, mesurer
  plus longtemps (24 h) ou plus de graines.
- 2026-11-16 (it. 1749, contrôle) : semaine du mage après ses PV (it. 1748) : record 350 (palier de l'écho de la zone 350,
  inchangé), 6 158 éclats.
- 2026-11-16 (it. 1748) : tableau des 20 héros (12 h, graines 7/3/11) : mage 61,0 (dernier), assassin 61,7 … moine 68,0, moyenne
  64,9, écart 7. Mage : PV ×0,75 → ×0,85 (essai attaque ×1,5 : 60,3, sans effet) : 61,0 → 63,7 (64 / 62 / 65). Fuzz 600
  parties, 0 bloquée ; npm test 330, autotest 248/248.
- 2026-11-16 (it. 1747) : devlog 0.1.5 (brouillon .md et .html itch, 10 langues) : Poupouce décrit en chat blanc tacheté de noir,
  un monstre sur 1 000, 100 fois l'or et un objet légendaire (avant : contour rose, cinq fois plus d'or).
- 2026-11-16 (it. 1746) : README à jour : Poupouce en chat (rareté, or, légendaire, miaulement), Statistiques dès la zone 3
  avec le Journal, couleurs et symboles du Journal, case « Lignes importantes seulement ».
- 2026-11-16 (it. 1745) : autotest : Statistiques avant la zone 40 (Journal seul, 3 sous-onglets grisés sur une rangée, aucun
  défilement) ; cet état échappe à lang-overflow. Autotest 248/248.
- 2026-11-16 (it. 1744, contrôle) : Statistiques avant la zone 40 (sous-onglets grisés) à 1280 px en russe, polonais, espagnol :
  une seule rangée, aucun défilement (lang-overflow ne mesure pas cet état : ses parties sont au-delà de la zone 40).
- 2026-11-16 (it. 1743) : Statistiques avant la zone 40 : au lieu d'un unique bouton « Journal », les sous-onglets à venir sont
  montrés grisés « 🔒 Chiffres zone 40 » (subtabs.js : 4e élément lock, bouton désactivé) : un objectif visible. Captures fr, de
  à 1280 px ; npm test 330, autotest 247/247.
- 2026-11-16 (it. 1742, contrôle) : carte de Poupouce au Bestiaire (copie de dev-data avec stats.poupouce = 2) : migrate la
  remplit (2 / 10), dessin du chat et nom affichés ; « ??? » dans dev-data = aucun Poupouce vaincu (pas un défaut).
- 2026-11-16 (it. 1741, revue générale) : simulation 12 h graine 81 : nécromancien 66, moine 65, samouraï 65 ; perf:linux bande
  18,1 %, panneau 19,5 %, mini 5,6 % ; Bestiaire en chinois propre (84 cartes, Poupouce « ??? » en dernier) ; japonais
  (--dump-text) : aucun mot français. Rien à corriger.
- 2026-11-16 (it. 1740) : tab-pace : Statistiques s'ouvre à 2-3 min (entre Talents 1 min et Quêtes 5 min). Le passage aux
  Statistiques complètes (zone 40) est maintenant annoncé une fois : bulle « Statistiques complètes : records, succès et carnet de
  route sont là ! » (clic : Chiffres), son, pastille de l'onglet (S.statsFullSeen, déjà vu pour une partie au-delà de la zone 40).
  Clé 3044, test ; save-fuzz ok (1260), npm test 330, autotest 247/247, capture (de).
- 2026-11-16 (it. 1739) : Tico (PNJ de Statistiques) parlait de records, succès et carnet de route quand l'onglet ne montre que
  le Journal (avant la zone 40, it. 1729 ; vu en capture) : répliques du début choisies (npcs.js, early). Test ; npm test 329,
  autotest 247/247.
- 2026-11-16 (it. 1738, contrôle) : équilibrage après le nouveau Poupouce (balance.mjs 12 h contre 4e79199f) : moyenne 64,6 → 64,3,
  écart −0,3 zone (bruit) ; un monstre sur 1 000 ne pèse pas sur la progression.
- 2026-11-16 (it. 1737, contrôle) : Poupouce dans MONSTERS : aucun tirage au hasard dans la liste (quêtes de chasse : monstres de
  la zone) ; seuls le Bestiaire (bonus par paliers, carte) et le succès « Bestiaire complet » le comptent : objectif rare voulu ;
  un succès déjà obtenu reste acquis.
- 2026-11-16 (it. 1736, contrôle) : Poupouce (chat) en mode mini : dessin net, contour rose, aucune erreur (capture envoyée à Victor).
- 2026-11-16 (it. 1735) : volume du miaulement mesuré hors ligne (OfflineAudioContext, mise en scène) : pic 0,032 contre 0,025 pour
  le butin légendaire, 0,014 pour une pièce ; gain 0,35 → 0,28 : pic 0,026, au niveau du légendaire. Autotest 247/247.
- 2026-11-16 (it. 1734) : Poupouce miaule en arrivant (sound.js, meow : deux dents de scie désaccordées, filtre « mi-aou »),
  branché sur l'apparition sans limiteur commun (il aurait compté chaque monstre). Ajouté au rendu hors ligne de l'autotest
  (« miaou ») ; à écouter par Victor. Page Steam : « 80 monstres » reste juste (contrôle « ≤ »). Autotest 247/247.
- 2026-11-16 (it. 1733) : « Quoi de neuf », édition 114 (Poupouce en chat, Journal : lignes importantes et symboles, Journal dès la
  zone 3) ; 10 langues, clés 3041-3043. npm test 328, autotest 247/247.
- 2026-11-16 (it. 1732) : Poupouce au Bestiaire : ceux vaincus avant l'it. 1730 (stats.poupouce) comptent pour sa carte (migrate,
  sans changer SAVE_VERSION) : une collection complète ne se défait pas à la mise à jour. Choix par défaut en attendant
  l'avis de Victor (POUR-VICTOR). Test ; save-fuzz ok (1253), npm test 328, autotest 247/247.
- 2026-11-16 (it. 1731, revue générale) : simulation 12 h graine 71 : guerrier 64, mage 60, rôdeur 62 (une graine, ±4) ;
  perf:linux bande 18,2 %, panneau 19,3 %, mini 5,7 % ; lang-overflow ru, de, pl, ja, fr à 1280 et 1920 px (avec fin de partie
  et état maximal, Bestiaire avec Poupouce) : aucun défilement ; russe (--dump-text) : aucun mot français (« attributs » =
  séparateur du fichier extrait). Rien à corriger.
- 2026-11-16 (it. 1730, demande de Victor, « il est parfait ») : Poupouce devient un monstre à part, un chat blanc tacheté de
  noir (art.js, MONSTERS.poupouce, au Bestiaire) au lieu d'un monstre de la zone au contour rose ; extrêmement rare (1 sur
  1 000, 1 sur 250 avant), 100 fois l'or d'un monstre (5 avant) et un objet légendaire garanti, en jeu comme pendant
  l'absence. Clés 3039-3040, test ; fuzz 0 bloquée, npm test 327, autotest 247/247.
- 2026-11-16 (it. 1729) : le Journal était inaccessible jusqu'à la zone 40 (Statistiques fermé ; plusieurs heures) depuis son
  déplacement (it. 1677). Statistiques s'ouvre maintenant à la zone 3 avec le Journal seul ; Chiffres, Succès et Carnet de
  route à la zone 40 (statsFull, tabs.js) ; conseil « vitesse » attendu jusque-là. Clé 3038, test ; npm test 326, autotest 247/247.
- 2026-11-16 (it. 1728, contrôle) : mémoire dans la durée (mem-watch, 8 min, son et musique) : réel 542-550 Mo, plat,
  sans croissance (repère 565-575) ; noté dans CLAUDE.md.
- 2026-11-16 (it. 1727) : autotest : contrôle de la case « Lignes importantes seulement » (vrai clic, ligne ordinaire écartée,
  coffre gardé avec son repère ✦, retour à l'état initial). Vu en passant : la Boutique s'ouvre à la zone 8 (≈ 9 min) alors
  que 300 or sont réunis vers 3-6 min : voulu (onglets ouverts peu à peu, demande de Victor), inchangé. Autotest 247/247.
- 2026-11-16 (it. 1726, contrôle) : --crawl en polonais (trois pluriels) sur la partie de fin de partie : 703 clics en 22 s,
  aucune erreur ; texte affiché (--dump-text) sans {n}, undefined, NaN ni mot français.
- 2026-11-16 (it. 1725) : Journal accessible aux daltoniens : un repère en tête de chaque ligne importante (★ légendaire,
  ◆ épique, ✦ coffre / étoile / champion, ✓ quête / œuf, ⚠ K.O. / recul), en CSS (::before), symboles déjà présents dans la
  police. Captures thèmes sombre et clair ; npm test 325, autotest 246/246.
- 2026-11-16 (it. 1724) : après le nouveau réglage logImportant (it. 1723) : save-fuzz « ok balayage (1253 corruptions) » ;
  lang-overflow ru, de, pl à 1280 px (Statistiques > Journal compris) : aucun défilement ni mot coupé.
- 2026-11-16 (it. 1723) : Statistiques > Journal : case « Lignes importantes seulement » (settings.logImportant, gardée dans la
  sauvegarde) : seules les lignes colorées (butin, quêtes, coffres, K.O.…) restent, les comptes rendus de routine écartés ;
  message s'il n'y en a aucune. Captures en, de. Clés 3036-3037, test ; npm test 325, autotest 246/246.
- 2026-11-16 (it. 1722) : contrôles sans correction. Mode mini en français et japonais : propre. Alertes « [lent] » de l'autotest
  (onglets à 200-270 ms jusqu'à l'image, JavaScript 2-7 ms) : mesurées hors autotest (mise en scène, 4 ouvertures de
  6 onglets, copie de dev-data) : 13-34 ms, une ou deux images ; la lenteur vient de la charge de l'autotest, pas du jeu.
- 2026-11-16 (it. 1721, revue générale) : simulation 12 h graine 61 : gardien stellaire 67, berserker 66, prêtresse 65 ; perf:linux
  bande 18,4 %, panneau 19,4 %, mini 5,7 % ; Journal en anglais coloré (légendaire en or, œufs en vert) et Quêtes (ru)
  propres ; polonais sans mot français. Rien à corriger.
- 2026-11-16 (it. 1720) : « Quoi de neuf », édition 113 (couleurs du Journal dans toutes les langues, bonus doublé sur la carte du familier,
  précision sans familier actif) ; 10 langues. Clés 3033-3035. npm test 324, autotest 246/246.
- 2026-11-16 (it. 1719) : « Hache du bourreau » en français dans une ligne anglaise (test hors du jeu de l'it. 1715) : pas un défaut,
  translateData traduit les noms des pouvoirs au démarrage (i18n/data.js) ; seul le script Node la sautait.
- 2026-11-16 (it. 1718) : CLAUDE.md, Pièges : la leçon des couleurs du Journal (texte affiché comparé à du français).
- 2026-11-16 (it. 1717) : recherche du même piège que l'it. 1715 (expression ou comparaison en français appliquée à un texte
  traduit) dans toute l'interface : aucun autre cas (les includes() restants portent sur des identifiants : drain, enrage…).
- 2026-11-16 (it. 1716) : couleurs du Journal vérifiées dans le jeu en anglais : 1 h de jeu → lg-good 3, lg-rare 3, lg-bad 3 ;
  lignes « Legendary » et « Epic » écrites à la main → lg-leg et lg-epic (noms de rareté traduits).
- 2026-11-16 (it. 1715) : couleurs du Journal dans les 10 langues : les motifs (légendaire, épique, quête, K.O.…) étaient des
  expressions en français, presque rien n'était coloré ailleurs (1 h simulée : anglais 2 lignes sur 196, français 13). Ils
  viennent maintenant des messages traduits (plus long morceau fixe de chaque modèle) et des noms de rareté : anglais 12,
  japonais 17, français 16. Test ; npm test 324, autotest 246/246.
- 2026-11-16 (it. 1714) : tableau des 20 héros (12 h, graines 7 / 3 / 11) après les ajouts du jour : moyenne 64,8, de 62,3 (assassin,
  61,7 à l'it. 1637 avant son renforcement) à 67,3 (paladin) ; écart 5,0 zones (5,7 avant).
- 2026-11-16 (it. 1713) : CLAUDE.md ne décrit plus l'ancienne Aventure (rien à reprendre) ; fuzz 60 graines : 1 200 parties, 0 bloquée.
- 2026-11-16 (it. 1712) : capture de l'Ascension en espagnol (l'onglet s'appelle « ascension », pas « prestige ») : propre.
- 2026-11-16 (it. 1711, revue générale) : simulation 12 h graine 51 : nécromancien 62, danseuse de lames 66, artificier 65 ;
  perf:linux bande 18,2 %, panneau 19,3 %, mini 5,6 % ; mode mini (ko) et Aventure (es, « Vida » sur une ligne) propres ;
  allemand sans mot français. Rien à corriger.
- 2026-11-16 (it. 1710) : POUR-VICTOR : résumé de l'après-midi (it. 1691-1709).
- 2026-11-16 (it. 1709) : les 350 / 350 de la semaine (it. 1708) : un palier, l'écho du lieutenant en zone 350 (4-6 dernières courses à
  349-350) ; en 2e semaine (336 h, guerrier) il est franchi : 380 → 419. Pas de plafond ; CLAUDE.md précisé.
- 2026-11-16 (it. 1708) : semaine simulée (168 h, graine 7) sur le jeu actuel : guerrier 350, mage 350 (repère it. 1115 : 350 / 349) ;
  CLAUDE.md à jour.
- 2026-11-16 (it. 1707) : onglet Familiers le Jour des familiers (ligne « ×2 aujourd'hui »), ru, de, pl à 1280 px : ni l'onglet ni la carte
  ne défilent.
- 2026-11-16 (it. 1706) : Jour des familiers : la carte du familier actif affichait son bonus de base ; elle montre le bonus réel
  (doublé : Chaton +80 % d'or au lieu de +40 %) et « ×2 aujourd'hui (Jour des familiers) » ; 10 langues. Vu en mise en scène.
  npm test 323, autotest 246/246.
- 2026-11-16 (it. 1705) : i18n-names après le Jour des familiers et les éditions 110-112 : toujours 25 écarts connus, aucun nouveau.
- 2026-11-16 (it. 1704) : devlog 0.1.5 : point « Jour des familiers » dans les 10 langues (11 points partout) ; page itch régénérée.
- 2026-11-16 (it. 1703) : Jour des familiers sans familier actif : une précision dans la pastille et la bulle du mode mini (« Aucun
  familier actif : choisis-en un (Familiers). », ou d'où viennent les familiers si l'onglet n'est pas ouvert) ; 10 langues ; test.
  npm test 323, autotest 246/246, lang-overflow ru, de, pl : aucun.
- 2026-11-16 (it. 1702) : « Quoi de neuf », édition 112 (Jour des familiers, touche J, Journal à 40 lignes au lieu de 25) ; 10 langues,
  noms et chemins tels que traduits. Clés 3027-3029. max-save couvre déjà la 17e bénédiction (DAY_MOD_KEYS). Autotest 246/246.
- 2026-11-16 (it. 1701, revue générale) : simulation 12 h graine 41 : rôdeur 62, barde 67, lancier 69 ; perf:linux bande
  18,3 %, panneau 19,1 %, mini 5,5 % ; Bestiaire > Bénédictions (fr, 4 / 17) et Familiers (pl) propres ; chinois sans mot
  français. Rien à corriger.
- 2026-11-16 (it. 1700) : 17e bénédiction du jour, « Jour des familiers » 🐾 (bonus du familier actif ×2 ; aucune ne touchait les
  familiers) ajoutée à la FIN : premier jour le 22/11 (ni aujourd'hui ni demain ; calendrier annoncé inchangé, tests) ;
  réplique du héros ; 10 langues (polonais « pupile » comme l'onglet). Test « Jour des familiers » ; npm test 322,
  autotest 246/246, lang-overflow complet : aucun ; fuzz sous cette bénédiction : 0 bloquée.
- 2026-11-16 (it. 1699) : save-fuzz après la migration des volumes (it. 1679) : dev ok (1 253), fin ok (1 211), 0.1.2 ok (1 155).
- 2026-11-16 (it. 1698) : devlog 0.1.5 : le dernier point (partie neuve sans fenêtre des nouveautés, clic sur le rebord d'un bouton)
  manquait dans 8 langues (9 points contre 10 en fr et en) : ajouté ; page itch régénérée, 10 points partout.
- 2026-11-16 (it. 1697) : devlog 0.1.5 (brouillon et page itch) : point « Aventure plus aérée » (équipement avant le sac, sac à 16
  cases par rangée, Journal dans Statistiques > Journal, touche J, Réglages à gauche de « Mode mini ») dans les 10 langues.
- 2026-11-16 (it. 1696) : --crawl en anglais sur la partie de fin de partie après la nouvelle disposition (Journal, Aventure,
  Réglages, touche J) : 687 clics en 22 s, aucune erreur.
- 2026-11-16 (it. 1695) : --perf avec un sac plein de 48 objets (16 colonnes) : panneau ouvert 19,4 %, bande 18,2 % : comme avec 24.
  Aucun texte du jeu ne situe plus le Journal dans l'Aventure.
- 2026-11-16 (it. 1694) : touche J : ouvre Statistiques > Journal (un appui au lieu de deux clics, le Journal ayant quitté l'Aventure) ;
  ajoutée à la liste des raccourcis (10 langues). Autotest « touche J » : 246/246 ; lang-overflow ru, de, pl : aucun.
- 2026-11-16 (it. 1693) : les 2 px du panneau du sac (it. 1692) : #p-bag est en overflow visible (aucune barre, aucun défilement
  possible) et aucun élément ne dépasse son bord : simple écart de scrollHeight, sans effet visible.
- 2026-11-16 (it. 1692) : pire cas de la demande de Victor (sac de 48 légendaires, chaque objet sélectionné tour à tour), ru et de,
  1280 et 1366 px : le détail tient sous le sac, l'onglet ne défile pas (2 px au plus dans le panneau du sac, cause non vérifiée).
- 2026-11-16 (it. 1691, revue générale) : simulation 12 h graine 31 : guerrier 65, druide 67, assassin 62 ; perf:linux bande
  18,2 %, panneau 19,8 %, mini 5,7 % ; Aventure (de, nouvelle disposition) et Statistiques > Journal (ko) propres ; russe
  sans mot français. Rien à corriger.
- 2026-11-16 (it. 1690) : POUR-VICTOR : résumé du début d'après-midi (it. 1675-1689).
- 2026-11-16 (it. 1689) : « Quoi de neuf », édition 111 : Réglages à gauche de « Mode mini » (corrige l'édition 110, qu'on ne retouche
  pas), menu sur une ligne, bande-annonce sur « Le Rebord » ; 10 langues, libellés cités tels que traduits. Clés 3020-3022.
- 2026-11-16 (it. 1688) : fuzz FUZZ_DAYMOD=all (bénédictions du jour, Jour de Poupouce compris), 30 graines : 600 parties, 0 bloquée.
- 2026-11-16 (it. 1687) : vignettes et GIF promo regénérés depuis les nouveaux plans puis GARDÉS tels quels : le nouveau plan
  du boss est chargé à chaque instant (2-3 nombres et noms de sorts sur le duo, balayé de 5 à 13,5 s), l'ancienne vignette
  (un seul critique lisible) reste meilleure et ne montre aucune interface ; les GIF, cadrés sur le héros, n'ont pas la
  rangée d'informations : identiques à l'œil.
- 2026-11-16 (it. 1686) : captures promo refaites avec les nouveaux plans (it. 1684) : 10 langues × séries « steam » et « promo »
  (300 images : nouvelle Aventure, jauge d'XP, 18 événements rares, cyrillique Geist Pixel) + steam/screenshots (en, fr) ;
  livrées dans steam/promo et sur le partage (Médias/sillwalker-promo).
- 2026-11-16 (it. 1685) : fichiers Python compilés (scripts/promo/__pycache__) retirés du dépôt, __pycache__/ et *.pyc ignorés.
- 2026-11-16 (it. 1684, suite) : demandes de Victor : bandes-annonces refaites sur la bande originale. Tous les plans retournés
  dans les 10 langues (190, jauge d'XP, nouvelle Aventure, Réglages) ; « 18 événements rares » (au lieu de 14) partout ;
  cyrillique des accroches en Geist Pixel (comme le jeu) ; musique « Le Rebord » (82 bpm, après un essai sur « Les
  Lieutenants » écarté par Victor), thème calé sur le premier plan du héros (music.py : extrait, début étouffé, fondu
  qui finit sur le temps fort) ; son baissé à ≈ −46 LUFS (−32 dB, quatre réglages successifs avec Victor : sfx.py
  PROMO_DB). 30 vidéos (70 s, 32 s, verticale 32 s) livrées dans steam/promo/videos et Médias/sillwalker-promo ;
  scripts/promo/build-videos.sh refait tout le montage.
- 2026-11-16 (it. 1684) : demande de Victor : la bande originale en MP3 dans le dépôt (steam/promo/bande-originale : les 4 versions
  finales, ≈ 18 Mo, avec un LISEZMOI ; les essais intermédiaires restent sur le partage).
- 2026-11-16 (it. 1683) : perf:linux après la nouvelle Aventure (sac 16 colonnes, ResizeObserver de l'en-tête) : bande 18,1 %, panneau
  19,7 %, mini 5,5 % ; inchangé.
- 2026-11-16 (it. 1682) : README : le Journal dans Statistiques > Journal, l'Aventure en quatre colonnes (héros, équipement, sac, zone).
- 2026-11-16 (it. 1681) : demandes de Victor : (1) menu sur deux lignes (vu chez lui en mode dev) : les onglets n'étaient ajustés
  (fitTabs) qu'au changement d'onglet ; ils le sont aussi quand les polices sont prêtes et quand la largeur de l'en-tête
  change (ResizeObserver, une fois par image). Reproduit en zoomant le panneau après l'ouverture : avant, boutons sur une
  2e ligne (controls à 52 px) ; après, onglets en icônes et une seule ligne. (2) Réglages à gauche de « Mode mini ».
  L'édition 110 dit « à gauche de Quitter » : correction à mettre dans la prochaine édition (on ne retouche pas une
  édition publiée). npm test, autotest 245/245, lang-overflow ru, de, pl, fr : aucun.
- 2026-11-16 (it. 1680) : « Quoi de neuf », édition 110 (Journal dans Statistiques > Journal, Aventure réorganisée, Réglages près de
  « Quitter »), 10 langues, chemins et libellés tels que traduits. Clés 3017-3019. npm test, autotest 245/245.
- 2026-11-16 (it. 1679) : demandes de Victor : (1) partie neuve : volume général 50 %, effets 20 %, musique 50 %, ambiance 100 %
  (freshState) ; une sauvegarde existante sans réglage de volume garde l'ancien niveau (migrate : 0,4 et 1, test « avant les
  volumes séparés » inchangé) ; vérifié en lançant une partie neuve (0,5 / 0,2 / 0,5 / 1) et une vieille sauvegarde (0,7 / 1 /
  1 / 1). (2) Aventure : Équipement avant le Sac (héros, équipement, sac, zone). npm test 321, autotest 245/245,
  lang-overflow : aucun défilement.
- 2026-11-16 (it. 1678) : demande de Victor : le Journal quitte l'Aventure pour Statistiques > Journal (4e sous-onglet, mis à
  jour en direct, ui/log.js partagé) ; l'Aventure passe à 4 colonnes et le sac s'élargit : 16 cases par rangée dès 1800 px
  (48 cases en 3 rangées au lieu de 4), 12 sur portable (4 au lieu de 6) ; le détail d'un objet tient dessous sans défiler
  (vu à 1920 et 1280 px, sac de 48). Liste du Journal limitée à 320 px (à 360, l'onglet défilait de 7-13 px dans les parties
  pleines : lang-overflow, sous-section « log » ajoutée à SUBS). Autotest « Statistiques > Journal » : 245/245.
- 2026-11-16 (it. 1677) : demande de Victor : le bouton Réglages passe juste à gauche de « Quitter » (après « Mode mini ») ; vu à
  1920 et 1280 px. --overflow-report signale un libellé de tuile du héros sur deux lignes (« adventure-tuile-2lignes »,
  vérifié avec l'ancien « Очки здоровья ») ; lang-overflow des 10 langues à 1280 / 1366 : aucun. Autotest : le contrôle
  Poupouce (it. 1673) laissait sa bulle, la réplique d'élite suivante était refusée (< 6 s) : bulle remise à zéro. 244/244.
- 2026-11-16 (it. 1676) : même tuile en espagnol et portugais (« Puntos / Pontos de vida » sur deux lignes à 1280 px) → « Vida ». Vérifié
  en capture : es, pt, de, ko, en, ru, pl sur une ligne. npm test, autotest 244/244.
- 2026-11-16 (it. 1675) : russe, tuile de la carte du héros : « Очки здоровья » (deux lignes à 1280 px) → « Здоровье », sur une ligne
  comme les trois autres ; polonais (« Punkty życia ») déjà sur une ligne. npm test, autotest 244/244.
- 2026-11-16 (it. 1674) : POUR-VICTOR : nouveautés de la fin de matinée (it. 1651-1673).
- 2026-11-16 (it. 1673) : autotest « bande : Poupouce vaincu (bannière et réplique) » : 244/244. (Premier essai : sans monstre en
  combat, le monstre simulé n'avait pas d'espèce et le cadavre plantait ; l'espèce vient maintenant de la file.)
- 2026-11-16 (it. 1672) : autotest « boutique : Sac plein ouvre le sac (Aventure) » (sac rempli, bouton actif avec info-bulle, clic
  → Aventure, sac rendu) : 243/243.
- 2026-11-16 (it. 1671, revue générale) : simulation 12 h graine 11 : mage 65, prêtresse 65, gladiateur 66 ; perf:linux bande
  18,2 %, panneau 19,6 %, mini 5,6 % ; Familiers (en) et Quêtes (ja) propres ; portugais sans mot français. Rien à corriger.
- 2026-11-16 (it. 1670) : Statistiques > Moments rares : Poupouce a sa ligne rose « ✦ Poupouce vaincus N » dès le premier (avant : un ✦
  au survol à côté des gobelins, it. 1590). lang-overflow ru, de, pl, es, pt, fr à 1280 et 1366 (max-save compris) : aucun
  défilement ; capture en russe. npm test, autotest 242/242.
- 2026-11-16 (it. 1669) : lang-overflow complet après « Sac plein » et les éditions 108-109 (« Quoi de neuf » au pire cas dans les 10
  langues) : aucun défilement ni mot coupé.
- 2026-11-16 (it. 1668) : --perf sur deux copies neuves de dev-data, héros à distance compris (après les nombres et la bulle,
  it. 1641-1653) : guerrier bande 18,2 % / panneau 19,7 % ; rôdeur 13,6 % / 15,9 %. Aucune régression.
- 2026-11-16 (it. 1667) : i18n-names après les éditions 108-109 et les nouveaux textes (Poupouce, Sac plein) : 25 écarts connus
  (déclinaisons), aucun nouveau.
- 2026-11-16 (it. 1666) : --crawl en russe (dev-data, sac plein) après le lien « Sac plein » : 707 clics en 22 s, aucune erreur.
- 2026-11-16 (it. 1665) : « Quoi de neuf », édition 109 (Poupouce vaincu fêté, « Sac plein » ouvre le sac, nombres de la bande), 10 langues,
  libellés cités tels que traduits. Clés 3014-3016. npm test, autotest 242/242 (pire cas de la fenêtre mesuré).
- 2026-11-16 (it. 1664) : Boutique : « Sac plein » (lien vers le sac, it. 1663) en texte atténué (--muted, --accent au survol) pour ne
  pas ressembler à un achat ; vu dans les deux thèmes. npm test, autotest 242/242.
- 2026-11-16 (it. 1663) : Boutique, sac plein : les boutons « Sac plein » (marchand et coffres) ne sont plus des impasses
  grisées : un clic ouvre le sac (Aventure) pour vendre ou transmuter (info-bulle, 10 langues ; lien data-tab, pas une action).
  Vérifié en allemand : 7 boutons, clic → Aventure. Clé 3013. npm test, autotest 242/242.
- 2026-11-16 (it. 1662) : assassin sur une semaine (simulate 168, graine 7) : record 366 avec l'attaque ×1,15 (it. 1638), 377 avec
  l'ancienne ×1,10 : l'assassin, en retrait sur 12 h, est fort en fin de partie ; le renforcement n'y change rien de mesurable (bruit).
  Repère ancien (it. 1115) : guerrier 350, mage 349.
- 2026-11-16 (it. 1661, revue générale) : simulation 12 h graine 21 : moine 62, samouraï 66, chaman 65 ; perf:linux bande
  18,3 %, panneau 19,5 %, mini 5,7 % ; Boutique (fr) et mode mini (ja) propres ; espagnol sans mot français. Rien à corriger.
- 2026-11-16 (it. 1660) : l'alerte « héros bloqué » au mur 18-21 (suite de l'it. 1658) : elle s'allume dès 30 min et propose
  « forge » puis « potions » (Enclume achetée, 30-120 k d'or qui dort). Un joueur simulé qui suit ces pistes atteint la
  zone 20 en 20-30 min sur 6 graines (naïf : 20-56 min ; graine 2 : 56 → 28, graine 5 : 46 → 29). L'alerte fait son travail.
- 2026-11-16 (it. 1659) : « Depuis ta dernière visite » au pire cas (toutes les parties, Poupouce compris), 1280 px, russe et
  allemand : une ligne de 26 px coupée par « … », détail au survol ; l'Aventure ne défile pas.
- 2026-11-16 (it. 1658) : longue traîne avant l'Ascension, mesurée sur 6 graines (joueur naïf de tab-pace : équipe, talents,
  déblocages, ni forge ni boutique) : zone 20 (ASCEND_MIN_ZONE) à 24, 33, 33, 48, 57 min et > 60 ; mur aux zones 18-21 dès
  ≈ 20 min, une mort toutes les 1-2 min, +1 zone par ≈ 15 min. Le joueur d'early-pace (plus actif) est en zone 22-26 à
  60 min : laissé tel quel (début volontairement calme, earlyPace) ; l'alerte « héros bloqué » propose déjà la forge.
- 2026-11-16 (it. 1657) : mem-watch 8 min après la nuit : réel 611-620 Mo de 2 à 6 min, puis 528-535 Mo (ramasse-miettes) ; aucune
  croissance. Palier un peu au-dessus du repère (565-585) mais récupérable. Devlog 0.1.5 : Poupouce déjà présenté, rien à changer.
- 2026-11-16 (it. 1656) : résumé d'absence en thème clair : « ✦ Poupouce vaincus » (.tint) assombri et lisible ; le nom long du
  meilleur butin passe à la ligne.
- 2026-11-16 (it. 1655) : IDLE=1 (joueur absent, guerrier, 12 h) : record 15 (zone 14 à 12 h, niveau 46), comme le repère de l'it. 698.
  (Avec IDLE, le tableau « Courses » est vide : le record se lit dans le tableau horaire.)
- 2026-11-16 (it. 1654) : Poupouce vaincu : le héros dit « Pardon, Poupouce… » ou « Reviens vite, Poupouce ! » (remplace la réplique
  de son arrivée, souvent dite moins de 6 s avant) ; 10 langues, Poupouce en latin partout. Vu en japonais en mise en
  scène. Clés 3011-3012. npm test, autotest 242/242.
- 2026-11-16 (it. 1653) : bande : les nombres et noms de sorts évitent la bulle de parole du héros (obstacle ajouté à freeSpot,
  comme le nom du boss : speechObstacle). Mise en scène (fin de partie, anglais) : bulle de y = 1 à 29, « Volley of
  Arrows » placé à y = 45 au lieu de 0, sans chevauchement. npm test, autotest 242/242.
- 2026-11-16 (it. 1652) : nombres de la bande vérifiés en fin de partie (anglais, deux instants) : le plus haut (« 1.57M »)
  reste entier sous le bord.
- 2026-11-16 (it. 1651, revue générale) : simulation 12 h graine 3 : paladin 68, cryomancien 67, arbalétrier 69 ; perf:linux
  bande 18,5 %, panneau 19,0 %, mini 5,8 % ; Statistiques (en) et Aventure (zh) propres ; japonais : seuls les noms voulus
  en latin. Vu en anglais : « Crit 107k » encore coupé en haut de la bande (it. 1641 incomplète : la place la plus haute
  était y = −6, déjà hors de la fenêtre) : elle passe à 0 et la montée s'arrête 2 px au-dessus du bord au plus.
- 2026-11-16 (it. 1650) : --crawl en polonais sur la partie de fin de partie : 695 clics en 22 s, aucune erreur.
- 2026-11-16 (it. 1649) : son de Poupouce vaincu : la pluie de 4 pièces d'un champion (avant : 1, comme un monstre ordinaire).
  Bestiaire : rien à ajouter (Poupouce est une variante d'un monstre, compté sous son espèce). npm test, autotest 242/242.
- 2026-11-16 (it. 1648) : Poupouce vaincu se remarque sur la bande : bannière rose « Poupouce vaincu : N or ! » (texte déjà
  traduit, celui du journal), étincelles roses et gerbe de 20 pièces (juice.js). Vu en russe en mise en scène. npm test, autotest 242/242.
- 2026-11-16 (it. 1647) : early-pace après la nuit : 114 objets, niveau 39-40, zone 22-26 et 6,3 déblocages à 60 min, comme le repère.
- 2026-11-16 (it. 1646) : first-minutes après la nuit (coffres ouverts, astuces) : objet 15-79 s, boss 77-79 s, 1er déblocage
  169-390 s, Boutique 9 min, niveau 16 vers 13 min : comme avant. Aucun autre nom d'objet en ligne « libellé / valeur » à
  replier (seul « Meilleur butin », it. 1643).
- 2026-11-16 (it. 1645) : save-fuzz après Poupouce hors ligne (it. 1643) : ok balayage (1 246 corruptions) ; FUZZ_BASE=fin : ok (1 204).
- 2026-11-16 (it. 1644) : « Quoi de neuf », édition 108 (Poupouce et gobelins dans le résumé d'absence, assassin +15 %, record
  dans la bulle du mode mini), 10 langues, noms repris tels que traduits (Poupouce reste latin). Clés 3008-3010.
- 2026-11-16 (it. 1643) : absence : Poupouce peut maintenant tomber pendant l'absence (0,4 % des victoires dès la zone 2,
  Jour de Poupouce ×10, or ×5 compris) ; la fenêtre « Pendant ton absence » l'annonce (✦ rose), et « Depuis ta dernière
  visite » aussi. Trouvé en route : la ligne « Gobelins dorés attrapés » de cette fenêtre ne s'affichait jamais (le résumé
  ne transmettait pas le nombre, depuis l'it. 1452) ; et un nom d'objet long (« Beste Beute », allemand) recouvrait son
  libellé : il passe à la ligne (.lines b.wrap). Test ajouté ; captures en allemand ; npm test 320, autotest 242/242.
- 2026-11-16 (it. 1642) : correction de l'it. 1641 vérifiée en mise en scène (8 critiques au même point, coréen) : montées
  22 px pour les nombres bas, 14 px à y = 8, 4 px à y = −6 (au lieu de 22) ; les nombres réels restent entiers dans la bande.
- 2026-11-16 (it. 1641, revue générale) : simulation 12 h graine 7 : druide 64, barde 64, gardien stellaire 65 ; perf:linux bande
  18,5 %, panneau 19,8 %, mini 5,7 % ; mode mini (en) et Quêtes (ko) propres ; allemand sans mot français. Vu en
  coréen : un nombre empilé tout en haut de la bande (y ≈ −6) montait encore de 22 px et sortait coupé de la fenêtre ;
  sa montée s'arrête maintenant au bord (strip.js float). npm test, autotest 242/242.
- 2026-11-16 (it. 1640) : bulle du mode mini : un déblocage pas encore en vente dit « Atteindre la zone 22 (record 5) », comme la
  boutique (retour de Kreen, it. 1548) ; vérifié en mise en scène en français et en allemand. npm test, autotest 242/242.
- 2026-11-16 (it. 1639) : fiche de l'assassin : le bonus d'attaque est calculé (Attaque +15 % sans autre retouche) ; jauge d'XP de la
  bande redessinée seulement au changement de palier ; lang-overflow (10 langues, fin, max, 130 %) : aucun défilement.
- 2026-11-16 (it. 1638) : assassin, le plus bas des tableaux de héros : 61,5 de moyenne sur 8 graines (12 h ; moine 63,2, moyenne
  64,8). Attaque de classe ×1,10 → ×1,15 : 62,6 sur les mêmes graines. npm test, autotest 242/242.
- 2026-11-16 (it. 1637) : tableau des 20 héros après le Colossal (12 h, graines 7 / 3 / 11) : moyenne 64,8 (inchangée), de 61,7
  (assassin) à 67,3 (paladin).
- 2026-11-16 (it. 1636) : CLAUDE.md, section Son : bulle du morceau, 📌, libération du tampon et ses contrôles.
- 2026-11-16 (it. 1635) : steam/itch/devlog-0.1.5.html prêt (anglais déplié, 9 langues repliées, comme la 0.1.4), tiré du brouillon.
- 2026-11-16 (it. 1634) : mode mini vérifié en vrai : la bulle d'aide donne « Meilleure zone… / Expérience : 0 % / Bénédiction du jour… /
  Demain… » (it. 1573).
- 2026-11-16 (it. 1633) : POUR-VICTOR : résumé de la nuit (it. 1546-1633) et décisions en attente.
- 2026-11-16 (it. 1632) : fuzz sous la Grande chasse (élites ×3, donc plus de Colossaux) : 1 200 parties, 0 bloquée.
- 2026-11-16 (it. 1631, revue générale) : simulation 12 h graine 11 : assassin 61, nécromancien 62, lancier 65 ; perf:linux bande
  18,0 %, panneau 19,0 %, mini 5,8 % ; Héros (ja) propre ; polonais sans mot français. Rien à corriger.
- 2026-11-16 (it. 1630) : i18n-names après le Colossal et son succès : toujours 25 écarts connus (déclinaisons), aucun nouveau.
- 2026-11-16 (it. 1629) : test de l'élite Colossale (PV ×2,2, intervalle ×1,4, attaque inchangée) ; 319 tests.
- 2026-11-16 (it. 1628) : early-pace après le Colossal : à 60 min niveau 39-40, zone 22-26, 6,3 déblocages (avant : 38-40, 22-25) :
  le début n'est pas ralenti.
- 2026-11-16 (it. 1627) : quêtes « proie » visant le Colossal : textes et pluriels corrects (fr, en, de, ru, pl, ja) ; le nom est traduit
  en jeu (« Колоссальный » vu à l'it. 1621 ; hors jeu, sans translateData, toutes les élites restent en français).
- 2026-11-16 (it. 1626) : --crawl fin de partie en espagnol après le Colossal : 700 clics, aucune erreur.
- 2026-11-16 (it. 1625) : premier Colossal (tant qu'aucun n'est vaincu) : le héros s'en étonne (« Il est immense, celui-là… »),
  2 répliques, 9 langues.
- 2026-11-16 (it. 1624) : brouillon du devlog 0.1.5 : le Colossal et son succès, dans les 10 langues.
- 2026-11-16 (it. 1623) : Statistiques > Succès : colonnes un peu plus étroites (230 → 215 px, 200 → 188 px sous 1467 px) :
  une colonne de plus, de la marge pour les prochains succès ; l'espagnol retrouve « Derribacolosos (25 colosales) ».
  lang-overflow propre (10 langues, fin de partie à 130 %).
- 2026-11-16 (it. 1622) : succès « Tombeur de colosses (25 colossaux) » (COLOSSAL_25, icônes Steam du golem), 72 succès ;
  espagnol « Derribacolosos (25) » (le nom long faisait défiler la fin de partie à 130 % de 4 px) ; checklist, README, POUR-VICTOR.
- 2026-11-16 (it. 1621, revue générale) : simulation 12 h graine 3 : druide 64, gardien stellaire 62, artificier 66 ; perf:linux
  bande 18,4 %, panneau 21,1 %, mini 5,9 % ; Bestiaire > Élites (ru) : le Colossal y figure, 11 sortes, propre. Rien à corriger.
- 2026-11-16 (it. 1620) : édition 107 de « Quoi de neuf » : le Colossal, les récompenses de quête expliquées, Poupouce ✦ et
  contour en mini ; 9 langues, lang-overflow propre.
- 2026-11-16 (it. 1619) : save-fuzz après le Colossal : dev-data (1 246 corruptions) et fin de partie (1 204), ok.
- 2026-11-16 (it. 1618) : l'élite Colossale prend la taille d'un boss (dessins agrandis des boss, sans couronne) ; les étiquettes des
  monstres hauts restent sous la rangée du haut (variable CSS --tagtop, que clearQueueTags ne remet pas à zéro). Vérifié en capture.
- 2026-11-16 (it. 1617) : 11e sorte d'élite, le Colossal (120 % de PV en plus, coups 40 % plus lents : un mur lent, le contraire
  du Rapide), 10 langues ; page du magasin « 11 sortes d'élites » (10 langues), README, POUR-VICTOR. balance 12 h : +0,0 ;
  fuzz 1 200 parties, 0 bloquée ; lang-overflow propre ; autotest 242/242.
- 2026-11-16 (it. 1616) : mem-watch panneau ouvert (6 min, ×10) : 575-584 Mo stables, pas de fuite après les retouches d'interface.
- 2026-11-16 (it. 1615) : brouillon du devlog 0.1.5 complété (dernières nouveautés) et traduit dans les 10 langues.
- 2026-11-16 (it. 1614) : Quêtes : la récompense « élixir / parchemin » donne son effet en bulle (texte de la boutique, déjà traduit).
- 2026-11-16 (it. 1613) : Quêtes : bulles d'aide sur les récompenses « œuf » (rejoint tes œufs, Familiers) et « éclats d'étoile »
  (constellations, Ascension) ; onglets cités vérifiés par i18n-paths dans les 9 langues.
- 2026-11-16 (it. 1612) : fuzz élargi : 200 graines, 4 000 parties neuves (20 héros), 0 bloquée.
- 2026-11-16 (it. 1611, revue générale) : simulation 12 h graine 7 : arbalétrier 66, berserker 66, danse-lames 65 ; perf:linux
  bande 18,6 %, panneau 19,8 %, mini 5,7 % ; Carte (de) propre ; texte allemand sans mot français. Rien à corriger.
- 2026-11-16 (it. 1610) : CLAUDE.md, pièges connus : le clic sur le rebord des boutons enfoncés (ui/pressfix.js).
- 2026-11-16 (it. 1609) : autotest : changement de tranche de 50 zones → la bulle « ♪ » nomme le nouveau morceau (traduit) ;
  242/242.
- 2026-11-16 (it. 1608) : étiquette « Poupouce ✦ » tant qu'il n'a jamais été vaincu (comme les sortes d'élites nouvelles).
- 2026-11-16 (it. 1607) : mode mini : Poupouce en combat a aussi son contour rose (comme les élites dorées et la bande).
- 2026-11-16 (it. 1606) : édition 106 de « Quoi de neuf » : coffres (fanfare, fermeture seule), contour rose de Poupouce, sa
  chance dans les Statistiques ; 9 langues, lang-overflow propre.
- 2026-11-16 (it. 1605) : Poupouce a un contour rose dessiné dans l'image (comme les élites : aucun coût de rendu), assorti à son
  étiquette ; vérifié en capture.
- 2026-11-16 (it. 1604) : l'ouverture animée d'un coffre (boutique, quête) joue la petite fanfare des coffres (événement
  « chestOpen » : le son seul, sans la secousse de la bande des coffres du chemin).
- 2026-11-16 (it. 1603) : joueur absent (IDLE=1, guerrier, 12 h) : record 15 à 12 h, niveau 46 (repère it. 698 : 15-16) : inchangé.
- 2026-11-16 (it. 1602) : test : les astuces de l'expérience (jusqu'au niveau 12, pas au-delà) et de la vente groupée (vers les
  Déblocages, pas si l'Œil du connaisseur est acheté) sortent après les bulles qui passent avant (318 tests).
- 2026-11-16 (it. 1601, revue générale) : simulation 12 h graine 21 : cryomancien 65, gladiateur 66, prêtresse 65 ;
  perf:linux bande 18,2 %, panneau 19,7 %, mini 5,6 % ; Quêtes (de) propres, nombres de dégâts sous la rangée du haut ;
  coréen sans texte oublié. Rien à corriger.
- 2026-11-16 (it. 1600) : --crawl (fr) après la fermeture automatique des coffres : 718 clics, aucune erreur.
- 2026-11-16 (it. 1599) : fermeture automatique (4 s) étendue aux coffres de la boutique, et seulement quand il n'y a pas
  « Équiper maintenant » à décider (objet plus puissant : la fenêtre attend le joueur).
- 2026-11-16 (it. 1598) : le coffre d'une quête ouvert sous les yeux se referme seul après 4 s (sauf souris dessus) : l'animation
  sans clic de plus (Victor limite les clics) ; Entrée équipe toujours, Échap ferme.
- 2026-11-16 (it. 1597) : l'astuce de l'expérience vaut jusqu'au niveau 12 (6 avant) : bienvenue, objet plus puissant et
  talent passent souvent avant elle (vu à l'it. 1596) et elle risquait de ne jamais sortir.
- 2026-11-16 (it. 1596) : partie neuve en anglais, captures à 20 s, 70 s, 2 min : histoire, puis « Welcome… », puis l'objet plus
  puissant (niveau 3) ; jauge d'XP et barres de vie lisibles dès la première minute. L'astuce de l'XP (niveaux 2 à 6) vient
  après celles-là, comme prévu (une bulle à la fois).
- 2026-11-16 (it. 1595) : README : Poupouce, Jour de Poupouce, jauge d'expérience (bande et mini), barres de vie, coffres de
  quête ouverts, ◀ ▶ et 📌 de la musique, bulle du morceau.
- 2026-11-16 (it. 1594) : i18n-names après les ajouts (morceaux, Jour de Poupouce, succès) : 25 écarts, tous des
  déclinaisons voulues (génitifs allemands et coréens, « Ménagerie » dans un autre sens…) ; aucun nouveau nom mal cité.
- 2026-11-16 (it. 1593) : bande à 1280 px (fr, ru) : zone, barre de vie du héros (celle du monstre s'efface faute de place,
  comme prévu), nom du boss, or, niveau et sa jauge tiennent sans se chevaucher ; nombres de dégâts sous la rangée.
- 2026-11-16 (it. 1592) : brouillon du devlog 0.1.5 (docs/devlog-0.1.5-brouillon.md, fr et en) ; proposé à Victor (POUR-VICTOR).
- 2026-11-16 (it. 1591, revue générale) : simulation 12 h graine 11 : paladin 69, lancier 67, chaman 64 ; perf:linux bande
  18,0 %, panneau 19,8 %, mini 5,7 % ; Aventure (pt) et Réglages (ja) propres ; japonais sans texte oublié (« pt » = points,
  « HP », « BGM », Poupouce : voulus). Corrigé : près du boss et des pastilles de droite, les nombres de dégâts
  montaient encore sur l'or et le niveau : sous une pastille, leur montée s'arrête sous la rangée (vérifié en capture).
- 2026-11-16 (it. 1590) : Statistiques > Chiffres, Probabilités : la ligne « Poupouce » (0,4 % par monstre, « aujourd'hui ×10 »
  le Jour de Poupouce) apparaît une fois Poupouce vaincu ; lang-overflow propre au pire cas (max-save) et chaque jour.
- 2026-11-16 (it. 1589) : bulle « ♪ morceau » seulement quand la bande est affichée (en mode mini ou bande cachée, elle
  restait en file et sortait plus tard, périmée).
- 2026-11-16 (it. 1588) : semaine simulée : fausse alerte (« mage 285-307 ») ; le tableau des courses en compte plus de 40 et
  mes lectures (grep -A30, et la dichotomie qui s'en servait) s'arrêtaient vers la 30e : la dernière course atteint 349,
  comme le repère (350). Simulation vérifiée déterministe (deux exécutions identiques). Leçon dans CLAUDE.md.
- 2026-11-16 (it. 1587) : édition 105 de « Quoi de neuf » : morceau gardé (📌), Jour de Poupouce, succès « Poupouce ?! » ;
  9 langues, chemin « Réglages > Son » vérifié par i18n-paths, lang-overflow propre.
- 2026-11-16 (it. 1586) : 16e bénédiction du jour, « Jour de Poupouce » 🍄 (Poupouce ×10), ajoutée à la FIN : le 16 et le 17/11
  gardent les leurs (Jour des trésors, Fête des gobelins), première le 19/11 ; réplique du héros ; fuzz FUZZ_DAYMOD=poupouce
  (600 parties, 0 bloquée), lang-overflow propre, autotest 241/241.
- 2026-11-16 (it. 1585) : early-pace (3 graines) : à 10 min niveau 13 / zone 8 / 1,3 déblocage ; à 60 min niveau 38-40, zone
  22-25, 6,3 déblocages : comme avant (rythme du début intact après les it. 1526-1584).
- 2026-11-16 (it. 1584) : tableau des 20 héros, 12 h × graines 7 / 3 / 11 : de 62,7 (assassin, prêtresse) à 67,3 (paladin,
  gladiateur), moyenne 64,8, écart 4,7 zones (bruit d'une graine : ±4) : pas de héros à reprendre. Repère dans CLAUDE.md.
- 2026-11-16 (it. 1583) : Réglages > Son : 📌 « Garder ce morceau » à côté de ◀ ▶ : la musique reste sur ce morceau quelle que
  soit la zone (settings.musicPin, -1 = selon la zone, borné par migrate) ; un autre clic revient au morceau de la zone ;
  pas de bulle « ♪ » tant qu'un morceau est gardé. Autotest 241/241, lang-overflow et save-fuzz propres.
- 2026-11-16 (it. 1582) : bande-annonce : montage calé sur l'ancienne musique (89 bpm) ; la refaire sur la bande originale =
  recaler les plans et ≈ 250 Mo de vidéos en plus dans git : proposé à Victor (POUR-VICTOR) plutôt que lancé seul.
- 2026-11-16 (it. 1581, revue générale) : simulation 12 h graine 3 : rôdeur 65, assassin 65, barde 62 ; perf:linux bande
  19,5 % (18,1-18,5 aux mesures précédentes : bruit du combat en cours), panneau 20,9 %, mini 5,9 % ; Ascension (es) et
  Statistiques (ru) propres ; texte espagnol sans mot français. Rien à corriger.
- 2026-11-16 (it. 1580) : save-fuzz à partir d'une partie 0.1.2 (1 148 corruptions, ok) ; test : une sauvegarde sans les
  volumes séparés ni l'option des barres de vie reçoit effets / musique / ambiance à 100 % et les barres affichées.
- 2026-11-16 (it. 1579, retour d'un joueur : « on ouvre les coffres où ? ») : récompense « coffre » d'une quête : bulle au survol
  « Le coffre s'ouvre quand tu réclames la quête ; son objet va dans le sac. » (9 langues).
- 2026-11-16 (it. 1578) : --crawl après les it. 1566-1577 : dev-data en japonais 713 clics, fin de partie en coréen 698 clics,
  aucune erreur.
- 2026-11-16 (it. 1577) : clavier : à l'ouverture d'un coffre (boutique, quête), le focus va sur « Équiper maintenant » quand
  l'objet est plus puissant : Entrée l'équipe (avant, le focus était sur ✕ et Entrée refermait) ; Échap referme toujours.
  perf:linux stable (bande 18,5 %, panneau 20,2 %, mini 5,9 %).
- 2026-11-16 (it. 1576) : succès « Poupouce ?! » (POUPOUCE : vaincre Poupouce), icônes Steam (champignon), noms dans les 10
  langues, steam/achievements.md (71), checklist, README et POUR-VICTOR (à déclarer dans Steamworks) ; lang-overflow propre.
- 2026-11-16 (it. 1575) : édition 104 de « Quoi de neuf » : morceau annoncé, coffres de « Tout réclamer » et de la touche R,
  jauge d'expérience (bande et mode mini) ; 9 langues, lang-overflow propre.
- 2026-11-16 (it. 1574) : nouveau morceau (tranche de 50 zones) : une bulle sobre le nomme (« ♪ Sentiers d'étoiles », 6 s),
  une fois par morceau et par lancement, jamais au lancement ni pendant un aperçu ou musique coupée. Vérifié en capture.
- 2026-11-16 (it. 1573) : mode mini : la bulle au survol donne l'expérience (« Expérience : 62 % », la fine barre violette).
  Autotest : le contrôle « musique libérée, bande cachée » échouait parfois (la boucle du jeu relançait le morceau) : il
  met maintenant le son en pause comme le vrai masquage ; 2 passes à 240/240.
- 2026-11-16 (it. 1572) : CLAUDE.md : mem-watch avec une mise en scène (MEM_ARGS), et la fenêtre du coffre de quête à
  refermer dans l'autotest.
- 2026-11-16 (it. 1571, revue générale) : simulation 12 h graine 21 : mage 66, samouraï 65, moine 62 ; perf:linux bande
  18,1 %, panneau 20,2 %, mini 6,0 % ; Familiers (de) et Bestiaire (ko) sans défaut ; texte polonais sans mot français.
  Corrigé : les nombres de dégâts du héros montaient sur la pastille de la zone et les barres de vie (rangée du haut, à
  gauche) : sous une pastille, ils partent plus bas et s'empilent vers le bas (comme près du boss). Autotest : la touche R
  ouvre maintenant le coffre (it. 1568) : la fenêtre restait ouverte et faisait échouer, selon le tirage de la quête, les
  contrôles du Bestiaire qui suivent ; refermée après le contrôle (2 passes à 240/240).
- 2026-11-16 (it. 1570, suite du retour « on monte de niveau sans savoir comment ») : au niveau gagné, la jauge d'XP
  sous « Niv. N » se remplit en or un instant (1,2 s), en plus de la bannière « Niveau N ! » : le lien jauge / niveau se voit.
- 2026-11-16 (it. 1569) : contrôles après Poupouce : fuzz avec chaque bénédiction du jour (FUZZ_DAYMOD=all, 600 parties,
  0 bloquée) ; save-fuzz à partir de la fin de partie (1 204 corruptions, ok).
- 2026-11-16 (it. 1568) : touche R (réclamer les quêtes) : le coffre s'ouvre sous les yeux comme au clic (une méthode
  commune, QuestsTab.claimShow, pour le clic, « Tout réclamer » et la touche). Autotest 240/240.
- 2026-11-16 (it. 1567) : fuite de mémoire aux changements de morceau ? mem-watch 6 min avec un changement de tranche toutes les
  20 s (MEM_ARGS="--stage=…" appelant music.setZone 1 / 51 / 101 / 151) : 540-660 Mo, en dents de scie (deux morceaux
  pendant le fondu et le décodage, puis rendus par le ramasse-miettes), sans croissance ; repère calme ≈ 550-570 Mo. Pas de fuite.
- 2026-11-16 (it. 1566) : Réglages > Son : bulles des boutons ◀ ▶ « Écouter le morceau précédent / suivant » (elles parlaient
  encore de l'« air » de l'ancien générateur), 9 langues.
- 2026-11-16 (it. 1565) : bande-annonce : scripts/trailer/music.js (+ music.html) appelait l'ancien générateur (songFor,
  retiré à l'it. 1541) ; il décode maintenant un morceau de la bande originale en WAV (MUSIC_TRACKS="nom:morceau", par
  défaut le Rebord ; vérifié : track.wav de 140 s) ; make.py ne remonte plus le gain de 8 dB (morceau déjà à −16 LUFS : +2 dB).
- 2026-11-16 (it. 1564) : page du magasin Steam (10 langues) : « musique lofi » devient « bande originale composée pour le
  jeu (du lofi chaud au final galactique) » ; steam-store-check à jour.
- 2026-11-16 (it. 1563) : musique arrêtée pendant le décodage d'un morceau (bande cachée, curseur à 0 %) : le décodage, en
  finissant, remettait le tampon (≈ 55 Mo) en mémoire ; il ne le fait plus. Vu par l'autotest (1 échec sur 240 à
  l'it. 1562, commit déjà parti) ; deux passes à 240/240 après correction.
- 2026-11-16 (it. 1562) : bande : les nombres de dégâts du héros (critiques, ripostes) évitent le nom du boss dès qu'il est
  affiché, même loin de lui (le nom s'étend vers la gauche au-dessus du héros, et s'affiche déjà quand le boss attend au
  bout de la file) ; avant, seuls les nombres près du boss l'évitaient. Vérifié en capture.
- 2026-11-16 (it. 1561, revue générale) : simulation 12 h, graine 11 : guerrier 69, druide 64, nécromancien 64 ; perf:linux
  bande 18,4 %, panneau 20,2 %, mini 5,7 % ; captures Quêtes et Talents en anglais et chinois (rien à redire) ; texte
  chinois propre. Noté : les nombres de dégâts du héros montent jusque dans la rangée du haut et passent sur le nom du boss.
- 2026-11-16 (it. 1560) : curseur « Musique » à 0 % : le morceau n'est plus joué en silence, il est libéré (≈ 55 Mo)
  et revient quand le curseur remonte ; avec les effets coupés, le moteur audio se met en veille comme si la musique
  était décochée. Autotest 240/240.
- 2026-11-16 (it. 1559) : bon voisin : bande cachée plus d'une minute (icône seule, plein écran, session verrouillée), le
  morceau de musique décodé (≈ 55 Mo) est libéré ; il revient en fondu quand la bande réapparaît (Music.hide ; autotest 239/239).
- 2026-11-16 (it. 1558) : quand Poupouce entre en combat, le héros s'étonne dans une bulle (« C'est… Poupouce ?! »),
  comme pour une nouvelle sorte d'élite ; 2 répliques traduites (le nom reste tel quel).
- 2026-11-16 (it. 1557) : thème clair vérifié en capture après les it. 1544-1555 (onglet Réglages à droite, boutons,
  sac) : rien à corriger.
- 2026-11-16 (it. 1556) : --crawl après les changements d'interface des it. 1544-1555 (Réglages à droite, clic sur le
  rebord, coffres de quête) : dev-data en russe 707 clics, fin de partie en polonais 702 clics, aucune erreur.
- 2026-11-16 (it. 1555) : « Tout réclamer » (Quêtes) : le plus bel objet des coffres réclamés s'ouvre sous les yeux,
  comme une quête réclamée seule (it. 1546) ; la réclamation automatique reste silencieuse. Autotest 238/238.
- 2026-11-16 (it. 1554) : contrôle après Poupouce (un tirage de plus dans la file des monstres) : balance 12 h contre
  5b15681f, moyenne 64,2 → 64,7 (bruit) ; dix premières minutes inchangées (niveau 2 vers 1 min, premier boss 77-79 s,
  boutique vers 9 min). Rien à corriger.
- 2026-11-16 (it. 1553) : Statistiques : un ✦ rose après les gobelins dorés dès qu'un Poupouce est vaincu, son compte au survol
  (une ligne à part, ou le compte écrit en clair, faisait défiler l'onglet en russe et chevaucher en allemand à 1280 px,
  pire cas de max-save, qui compte maintenant les Poupouce).
- 2026-11-15 (it. 1552, retour d'un joueur : « on monte de niveau sans savoir comment ») : au premier niveau gagné,
  une astuce explique que chaque monstre vaincu donne de l'expérience et montre la jauge violette ; écart nom du boss /
  pastille de l'or mesuré (8 px dans 5 langues, idée close).
- 2026-11-15 (it. 1551, revue générale) : simulation 12 h (record 65 guerrier, 61 mage, 62 rôdeur : comme avant) ;
  perf:linux bande 18,6 %, panneau 19,5 %, mini 5,9 % ; texte russe propre (seuls des repères et des noms propres en
  latin) ; captures fr / en / ja de la Boutique : l'onglet Réglages déplacé à droite (it. 1546) s'écrivait en 14 px
  (taille des boutons de droite) : remis à 16 px comme les autres onglets ; lang-overflow propre.
- 2026-11-15 (it. 1550) : mode mini : la barre d'expérience passe de l'or au violet (comme la jauge de la bande) ; dorée,
  au-dessus de la barre du prochain déblocage, elle se lisait comme de l'or.
- 2026-11-15 (it. 1549) : édition 103 de « Quoi de neuf » : jauge d'expérience, coffres de quête ouverts sous les yeux,
  Réglages à droite et cadre de sélection, Poupouce (9 langues ; lang-overflow propre).
- 2026-11-15 (it. 1548) : l'astuce « Nouveau déblocage à ta portée… Clique ici » ouvre la boutique directement sur
  les Déblocages (elle ouvrait le Marchand : il fallait chercher) ; de même pour l'astuce de la vente groupée.
- 2026-11-15 (it. 1547, retours d'un joueur) : musique : le Rebord plus léger (guitare des 35 s baissée, plus doux dans
  le jeu) ; le Briseur d'Étoiles en synthwave galactique, bien distinct des Lieutenants.
- 2026-11-15 (it. 1546, retours d'un joueur, Kreen, transmis par Victor) : jauge d'expérience sous « Niv. N » sur la
  bande (on ne voyait pas l'XP) ; boutique « Atteindre la zone N (record M) » avec une bulle « la zone compte, pas le
  niveau » ; plus d'air entre le bouton du son et la pastille du niveau (place réelle des boutons mesurée) ; onglet
  Réglages rangé à droite avec « Mode mini » et « Quitter » ; objet sélectionné : cadre clair (l'or se confondait avec
  le légendaire) ; quête à coffre réclamée à la main : le coffre s'ouvre sous les yeux (comme ceux de la boutique) ;
  astuce « Œil du connaisseur » après trois ventes à la main ; Poupouce, un monstre rare (≈ 1 sur 250, zone 2+,
  or ×5). Bug trouvé au passage : une partie neuve ouvrait « Nouveautés de la version » par-dessus l'intro.
- 2026-11-15 (it. 1545) : Réglages > Son : l'aperçu de la musique donne le nom du morceau (« Sentiers d'étoiles » · zones 51–100)
  au lieu de « Morceau 2 / 4 » ; noms traduits (le Rebord et le Briseur d'Étoiles repris tels qu'ils sont déjà traduits).
- 2026-11-15 (it. 1544, signalé par Victor) : clic sur le rebord haut d'un bouton sans effet (le bouton s'enfonce de 2 px,
  le relâchement tombait au-dessus) : ui/pressfix.js clique le bouton pressé si on le relâche à 4 px au plus ; autotest 236/236.
- 2026-11-15 (musique) : Victor valide les 4 morceaux ; plan de la musique terminé, retour à la boucle ordinaire.
- 2026-11-15 (musique, tâche 10) : CLAUDE.md et README à jour pour la bande originale ; édition 102 de « Quoi de neuf »
  (bande originale, curseur « Effets », barres de vie).
- 2026-11-15 (musique, tâche 9a) : humanisation des 4 morceaux (micro-décalages et forces variables, à graine) ;
  rendus à nouveau et remplacés dans le jeu ; autotest 235/235.
- 2026-11-15 (musique, tâche 8) : les 4 morceaux dans le jeu (lecture par tranches de 50 zones, boucle sans blanc,
  fondu enchaîné, aperçu dans les Réglages, boss) ; autotest (décodage, volumes, lecture) ; perf −1 à −1,6 point,
  mémoire +55 Mo stable. Demande de Victor : curseur « Effets » à côté de « Musique » et « Ambiance ». Autotest 235/235,
  lang-overflow propre.
- 2026-11-15 (musique, tâche 7) : morceau 4 « Le Briseur d'Étoiles » (60 mesures, 2 min 24 en boucle, final
  galactique avec coda ♭VI-♭VII-I) ; les 4 morceaux sont composés et mixés, envoyés à Victor.
- 2026-11-15 (musique, tâche 6) : morceau 3 « Les Lieutenants » (56 mesures, 2 min 20 en boucle, sol mineur, épique
  sombre : cordes, chœur, taiko, ostinato de harpe, puce des boss), mixé d'après le rendu par pistes ; envoyé à Victor.
- 2026-11-15 (musique, tâche 5) : morceau 2 « Sentiers d'étoiles » (56 mesures, 2 min 26 en boucle, si mineur,
  aventure), mixé d'après le rendu par pistes ; envoyé à Victor.
- 2026-11-15 (musique, tâche 4b) : rendu par pistes séparées et analyse (scripts/music/stems.py) ; « Le Rebord » v2
  remixé d'après elle (≈ +4 dB de présence, la puce et la cloche du thème enfin audibles), envoyé à Victor.
- 2026-11-15 (musique, tâche 4a) : morceau 1 « Le Rebord » v1 (48 mesures, 2 min 20 en boucle sans couture), envoyé à
  Victor ; mixage à affiner (présence, bas-médiums).
- 2026-11-15 (musique, tâche 3) : leitmotiv commun (question / réponse, 8 mesures, en degrés de gamme) et ses 4 habits
  (grilles vérifiées note à note) ; démonstration enchaînée envoyée à Victor.
- 2026-11-15 (musique, tâche 2) : instruments de la bande originale (flûte, puce façon Terraria, cloches, cordes,
  chœur, basses, percussions épiques, vinyle, pleurage de bande) ; vitrine de 68 s envoyée à Victor.
- 2026-11-15 (musique, tâche 1) : chaîne de rendu de la bande originale (scripts/music/ : rendu hors ligne dans une
  fenêtre Electron cachée, console de mixage, mastering, export Opus/MP3 et mesures). Essai de 8 mesures validé.
- 2026-11-15 (demande de Victor) : boucle « musique » pour ≈ 24 h : 4 morceaux composés à la main (zones 1-50, 51-100,
  101-150, 151-200 ; lofi, épique galactique, couleur Terraria), pré-rendus en studio hors du jeu, avec un leitmotiv
  commun. Plan et suivi : docs/MUSIQUE.md.
- 2026-11-15 (it. 1541, SORTIE 0.1.4, demande de Victor ; boucle arrêtée) : revue générale (12 h : samouraï 65,
  druide 65, assassin 62 ; perf bande 19,5 %, panneau 21,0 %, mini 6,8 %, icône 0,6 %). package.json 0.1.4 ; notes de
  version NEWS_RELEASES 0.1.4 (after: 58, 10 nouveautés majeures, 9 langues) ; test des notes adapté (un joueur de la
  0.1.3 ou plus ancien voit la plus récente) ; note espagnole des Réglages raccourcie (défilait de 11 px à 1280 px
  depuis la case des barres de vie, it. 1531). devlog-0.1.4.md (ex-brouillon). npm test 314, autotest 233/233,
  lang-overflow propre (10 langues).
- 2026-11-15 (it. 1540) : test de Game.nextFoe (premier de la file à pleine vie, perçage déduit, boss une fois la file
  vidée) : 314 tests.
- 2026-11-15 (it. 1539, demandes de Victor) : barre du monstre en haut de la bande : entre deux combats, le prochain
  monstre de la file ou le boss (Game.nextFoe : PV de base, perçage déduit ; en cache par zone et rang) au lieu d'un
  « 0 ». Nombres écrits dans la jauge (186 × 14 px ; bouclier en bleu après les PV) : pastilles de 224 px sans place
  vide à droite. Autotest 233/233.
- 2026-11-15 (it. 1538, demande de Victor : la langue du système par défaut, sur Windows, Linux et Mac) : la version
  construite ne gardait que les fichiers de langue Chromium fr et en-US (electronLanguages) : navigator.languages y
  retombait sur l'anglais pour un système allemand, russe… La langue est maintenant lue par le processus principal
  (app.getPreferredSystemLanguages ; --lang= des essais lu dans process.argv) et transmise au jeu (init.systemLangs) ;
  le menu de l'icône aussi est dans la langue du système dès le premier lancement ; electronLanguages : les 10 langues.
  Vérifié (Linux, dossier neuf) : LANG ru / de / ja / en / pt_BR → ru / de / ja / en / pt ; italien → en ; --lang=pl-PL
  → pl ; partie existante en fr gardée. Autotest 233/233. À vérifier par Victor sous Windows et Mac (version construite).
- 2026-11-15 (it. 1537) : devlog 0.1.4 (en et fr) : barres de vie en haut de la bande, bouton des bonus de maîtrise,
  police russe et portugais brésilien ; éditions 59 à 101.
- 2026-11-15 (it. 1536, demandes de Victor) : barres de vie en haut de la bande : celle du monstre reste affichée entre
  deux combats (le dernier monstre, vide, « 0 » ; « — » avant le premier) ; pastilles de 290 px (246 avant) : la valeur
  du bouclier tient à droite (« 247 k +161 k », sans débordement). Vérifié par --stage ; autotest 233/233.
- 2026-11-15 (it. 1535) : barre de vie du héros en haut de la bande : « K.O. · 4 s » (temps avant le retour) quand le
  héros est tombé, au lieu d'un « 0 ». 1 clé, 9 langues. Vérifié par --stage ; autotest 233/233.
- 2026-11-15 (it. 1534) : CLAUDE.md : mesure « maîtrise=N » de lang-overflow ; règles de la rangée d'informations de la
  bande (hudBands, nom du boss, DOM mis à jour au changement).
- 2026-11-15 (it. 1533) : portugais harmonisé vers le brésilien (majoritaire : ≈ 230 « você / seu / sua » contre 24
  formes européennes ; page du magasin en « Português (Brasil) ») : 43 traductions réécrites (tu → você, rato →
  mouse, ecrã → tela, bónus → bônus, mestria → maestria, saco → bolsa, objeto → item, familiar → mascote, « já não »
  → « não … mais »), presque toutes des 4 derniers jours. Contrôle : barres de vie avec la bande en haut de l'écran.
  i18n-check et citations sans problème, lang-overflow pt propre, autotest 233/233.
- 2026-11-15 (it. 1532) : édition 101 de « Quoi de neuf » (barres de vie en haut de la bande, bouton « Bonus » des
  maîtrises, bulle d'objet sans saut), 9 langues ; « Bónus » (pt, clé 160 ; était le brésilien « Bônus ») ; ko : « 특성 »
  (nom de l'onglet) dans l'édition 100 au lieu de « 재능 ». Autotest 233/233.
- 2026-11-15 (it. 1531, demande de Victor) : barres de vie du héros et du monstre affronté dans la rangée d'informations
  de la bande (dom.js HudBar, strip.js updateHudBars) : pastille comme zone / or, tête du héros (heroHeadURL), miniature
  du monstre (première image de son sprite, en cache), barre de 140 px, bouclier bleu-blanc (R.shield, carapace m.shell),
  nombres (bouclier en bleu). Mode centré : héros à gauche de la zone, monstre après les boutons ; aux bords : les deux
  à la suite de la zone (devant la pastille or / niveau, le monstre passait sur le nom du boss), le héros seul si la
  place manque (1366 px). Le monstre seulement en combat ; la météo les évite (hudBands). Réglage settings.hudBars
  (Réglages > Fenêtre, activé par défaut, anciennes sauvegardes comprises), 2 clés × 9 langues. DOM touché seulement
  quand la valeur affichée change : perf bande 19,2 % (inchangée). Contrôle d'autotest (233/233).
- 2026-11-15 (it. 1530) : lang-overflow mesure aussi la fiche de chaque maîtrise (rang 60 au moins : paliers, bouton) :
  « maîtrise=N(id) » ; elle trouvait 38 px (de, pl 1280, Fortune au rang 419 de dev-data) et 20 (ru) : sous-titre
  réduit à « rang N » pour une maîtrise apprise, note « aucun point » masquée en panneau étroit → 0 partout.
  Demande de Victor (« choisir » dans la fiche qui change au survol, pas pratique) : bouton permanent sur la maîtrise
  dès qu'un palier à deux bonus est atteint (« Choisir un bonus » en attente, « Bonus » ensuite : revoir, changer),
  qui ouvre la fenêtre de choix. Autotest 232/232, lang-overflow propre (10 langues).
- 2026-11-15 (it. 1529) : contrôle : survol de chaque élément à bulle d'aide de chaque onglet (ru 1280, fr 1920) :
  aucune ne fait défiler le panneau (le défaut de l'it. 1528 ne touchait que la bulle d'objet). Demande de Victor :
  fond étoilé pour la page itch.io (steam/itch/ : trame exacte du panneau, version plus visible, et une tuile de 384 px
  aux étoiles placées au hasard, sans répétition visible ; raccords vérifiés en mosaïque).
- 2026-11-15 (it. 1528, demande de Victor : survoler un objet fait apparaître la barre de défilement et sauter la page) :
  bulle d'objet (.itemtip, panel.js onHover) bornée à la place sous l'en-tête : version serrée (.compact) si trop longue,
  puis coupée (overflow hidden). Mesuré sur les 31 objets de dev-data : avant, jusqu'à 36 px de défilement (fr 1920),
  30 (ru 1280) ; après, 0 partout (fr, ru, de). Nouveau contrôle d'autotest (232/232).
- 2026-11-15 (it. 1527, REVUE GÉNÉRALE, repoussée depuis l'it. 1521) : 12 h graine 7 : mage 61, moine 65, nécromancien 65.
  perf:linux : bande 19,2 %, panneau 20,7 %, mini 6,7 %, icône 0,6 % (stables, police russe comprise). Captures zh
  (Talents : Voie sur une colonne, « 选择加成 »), pl (Héros), ru (Boutique) ; texte allemand avec un compagnon : aucun
  mot français. Rien à noter dans Idées.
- 2026-11-15 (it. 1526) : contrôle : la police russe (it. 1524) sert partout (titres du panneau, onglets, bande :
  FONT de dom.js commence par Geist Pixel ; seuls h1 et .brand en Pixelify). POUR-VICTOR : thème itch.io proposé.
- 2026-11-15 (it. 1525) : édition 100 de « Quoi de neuf » (bouton « Choisir un bonus » et « À faire maintenant », Voie
  réduite et boutons des sorts alignés, tirs devant le compagnon, police russe), 9 langues. Autotest 231/231.
- 2026-11-15 (it. 1524, demande de Victor : « la police russe illisible ») : Geist Pixel n'a pas de cyrillique (ni le
  paquet geist complet, ni fontsource) : 66 lettres russes dessinées sur sa grille (scripts/cyrillic-geist-pixel/ :
  raster.py, glyphs.py, build.py), 20 reprises du latin (А = A, Н = H…), les autres dessinées ; 2 372 points
  (≈ 36 par lettre, comme le latin simplifié) ; servies sous « Geist Pixel » (unicode-range russe). Planche d'essai
  vérifiée (une erreur Н = N corrigée). Autotest 231/231, lang-overflow propre (10 langues).
- 2026-11-15 (it. 1523, demande de Victor) : bande, projectiles des héros à distance (.proj, .projglow) en z-index 3 :
  devant le compagnon au lieu de derrière. Vérifié par --stage (rôdeur + guerrier). Autotest 231/231.
- 2026-11-15 (it. 1522, demandes de Victor : le choix des bonus de paliers était introuvable, « A/B » obscur) :
  S.masteryChosen (paliers où le joueur a cliqué ; nettoyé au chargement, gardé à l'ascension) ; Game.pendingMasteryPicks ;
  « À faire » : « N paliers de maîtrise : choisis leurs bonus » ; bouton « Choisir un bonus » sur la maîtrise (ouvre la
  fenêtre de choix sans dépenser de point) ; « choisir · N » de la fiche en vrai bouton ; « Prochain palier » : « 2 bonus
  au choix » au lieu de « A / B ». Voie sur une colonne (description au survol), Maîtrises sur deux ; aide « Clic sur un
  talent… » dans le ⓘ du titre ; maîtrises et lignes de la fiche plus serrées en panneau étroit. Avant : la fiche d'une
  maîtrise faisait défiler l'onglet de 47 px en russe à 1280 px (aucun contrôle ne la mesurait) ; maintenant 0 (ru, de,
  pl 1280, ru 1366). Test ajouté (313). Autotest 231/231, save-fuzz ok (1225), lang-overflow propre.
- 2026-11-15 (it. 1521, demande de Victor) : Héros > Sorts et attaque : boutons d'amélioration des sorts alignés en bas
  (carte en colonne : en-tête .spellhd, texte, .spellact poussé en bas ; avec un compagnon, chaque grille remplit son
  cadre : les six boutons sur une ligne). Mesuré fr 1920 (286 partout), ru 1280, de 1366, sans défilement.
  Autotest 231/231, lang-overflow propre. (La revue générale passe à l'it. suivante.)
- 2026-11-15 (it. 1520) : Héros > Libérés, bulle de « Prendre en duo » / « Duo à l'ascension » : ce que ce compagnon
  apporte (il couvre à distance : attaque +15 % ; il encaisse au corps à corps : dégâts subis −15 %), phrases déjà
  traduites. Vérifié par --stage. Autotest 231/231.
- 2026-11-15 (it. 1519) : devlog 0.1.4 (en et fr) : le vrai duo (encaisse / couvre) et les petits conforts (achats
  équipés, dépense automatique qui suit la ligne, tête du héros sur la carte) ; éditions 59 à 99.
- 2026-11-15 (it. 1518, contrôle) : après les effets du duo (it. 1515-1516) : fuzz 60 graines, 1200 parties, 0 bloquée ;
  hero-table 12 h × graines 7/3/11 (20 héros) : moyenne 64,6 (63,6 avant), mage 61,3 → gardien des astres 68,3
  (écart 7,0 contre 6,6) : rien à régler.
- 2026-11-15 (it. 1517, demande de Victor) : Héros > Sorts et attaque : l'explication des sorts du compagnon en
  paragraphe sous son titre, comme celle du héros (la mention « compagnon, à moitié de leur puissance » ne reste dans le
  titre qu'en mode compact, où ces paragraphes sont masqués) ; titres des deux cadres à 28 px au moins (celui du héros
  porte le Grimoire) : les grilles de cartes partent à la même ligne (fr 1920, ru 1280, de 1366). Autotest 231/231,
  lang-overflow propre.
- 2026-11-15 (it. 1516) : la part encaissée par le compagnon (it. 1515) devient une stat (hs.guard), comptée dans la
  robustesse de power() (comme l'esquive) ; « Compagnon » parmi les sources de puissance (powerSources, carte du héros) :
  ×1,23 rôdeur + guerrier, ×1,18 guerrier + rôdeur (dev-data). Test complété (312). ru / de 1280 sans défilement ;
  autotest 231/231, lang-overflow propre.
- 2026-11-15 (it. 1515, demandes de Victor) : duo (classes.js DUO.guard / DUO.cover, duoGuard / duoCover) : héros
  principal à distance, son compagnon au corps à corps encaisse (dégâts subis ×0,85, combat et absence) ; héros au
  corps à corps, son compagnon à distance le couvre (attaque ×1,15, heroStats). Note du duo (Héros) qui l'annonce,
  vérifiée ru / de à 1280 dans les deux cas. Test ajouté (312). balance.mjs 12 h contre HEAD : +0,2 (graine 7),
  −0,3 (graine 3) : bruit. Édition 99 de « Quoi de neuf » (duo, serviteur et familier devant, bulle de la Boutique).
  Autotest 231/231, lang-overflow propre.
- 2026-11-15 (it. 1514) : bande, le familier (.actor.pet) au premier plan comme le serviteur (z-index 3 ; le
  compagnon le cachait aussi). Vérifié par --stage (pet 3, serviteur 3, héros 2). Autotest 231/231.
- 2026-11-15 (it. 1513, outil) : contrôle d'autotest « carte : tête du héros sur sa zone, textes lisibles » (centre de
  la tête dans le carré .mz.here, police calculée des textes = Geist Pixel). Autotest 231/231.
- 2026-11-15 (it. 1512) : Boutique, bouton d'achat d'un objet qui renforce le héros : bulle « Clic : acheter et
  équiper tout de suite (il renforce ton héros). » (comportement de l'it. 1510, annoncé). 9 langues. Vérifié par
  --stage (seule l'amélioration a la bulle). Autotest 230/230.
- 2026-11-15 (it. 1511, demande de Victor) : bande, le serviteur (.actor.minion : squelette, loup) au premier plan
  (z-index 3 ; le compagnon, classe hero, à 2, le cachait). Vérifié en capture (nécromancien + paladin). Autotest
  230/230. À mettre dans la prochaine édition de « Quoi de neuf » (la 98 est parue).
- 2026-11-15 (it. 1509-1510) : édition 98 de « Quoi de neuf » (dépense automatique qui suit la ligne, carte, cadre
  sans compagnon, achats équipés), 9 langues. Demande de Victor : Game.buyFromShop, un objet acheté à la main qui est
  une amélioration (isUpgrade) est équipé tout de suite (Boutique) ; test ajouté (311). Autotest 230/230.
- 2026-11-15 (it. 1507-1508, demandes de Victor) : Héros > Sorts et attaque : 12 px sous les sorts (même écart
  qu'entre les deux cadres). Carte du Rebord : la tête du héros (heroHeadURL, trayicons.js : celle de l'icône de
  notification) posée sur le carré de sa zone, au lieu du héros en pied au-dessus (et de la tige près d'une cage) ;
  textes de la carte en Geist Pixel (Pixelify à cette taille rendait « ★ 3/5 » sous le drone comme « 3/S ») avec un
  contour sombre, niveau des reliques en 10. Autotest 230/230, lang-overflow propre.
- 2026-11-15 (it. 1506, demande de Victor) : Héros > Sorts et attaque : les cadres du héros et du compagnon ont la
  même hauteur (grille en stretch au lieu de start). Mesuré 200/200 à 1920 (fr), 211/211 à 1280 (ru), sans défilement.
- 2026-11-15 (it. 1505, demande de Victor) : grand graphe, « Dépenser automatiquement » suit la ligne la plus avancée
  (nextGraphNode) : région la plus fournie d'abord, sa voie de la porte à l'anneau, puis son anneau ; une région n'est
  quittée qu'une fois finie (avant : gros nœuds accessibles d'abord, n'importe où : les six portes, puis des sauts
  d'une région à l'autre). Test ajouté (310). Semaine simulée : guerrier 350, mage 350 (inchangé). Autotest 230/230.
- 2026-11-15 (it. 1504) : Héros > Sorts et attaque sans compagnon (deux héros libérés au moins) : cadre de droite
  « Pas encore de compagnon » (ce qu'il apporte, bouton « Choisir un compagnon » vers Libérés). Sa phrase reste
  visible en mode compact. 3 clés, 9 langues. Vérifié fr 1920 / ru 1280 ; autotest 230/230, lang-overflow propre.
- 2026-11-15 (it. 1503) : Idées : le Parchemin des arcanes écarté (couvert par le Jour des arcanes et la Marée
  arcanique ; la Boutique n'a pas de place à 1280 px).
- 2026-11-15 (it. 1502) : devlog 0.1.4 (en et fr) : les sorts du compagnon en grand (demande de Victor).
- 2026-11-15 (it. 1501, REVUE GÉNÉRALE) : 12 h graine 7, records : guerrier 66, rôdeur 65, paladin 61 (moyenne ≈ 64).
  perf:linux : bande 19,3 %, panneau 21,3 %, mini 7,1 %, icône 0,5 % (stables). Captures en et ja de Héros > Sorts
  et attaque avec un compagnon : deux cadres, aucun défilement, compteur « 0 / 6 ». Texte polonais avec un compagnon :
  aucun mot français. Rien à noter dans Idées.
- 2026-11-15 (it. 1500, outil) : nouveau contrôle d'autotest : avec un compagnon, Héros > Sorts et attaque montre deux
  cadres, les 3 cartes du compagnon, sans défilement (dev-data n'a pas de compagnon : le cadre n'était vu que par la
  boucle des duos de lang-overflow). Autotest 230/230.
- 2026-11-15 (it. 1499, contrôle) : texte extrait en russe avec un compagnon (mage) : le cadre « Заклинания: Маг »
  et « спутник, вполсилы » sont présents, aucun mot français (avant, dev-data sans compagnon ne montrait jamais ce
  cadre).
- 2026-11-15 (it. 1498) : POUR-VICTOR complété (it. 1490-1497 : sorts du compagnon partout, i18n-check).
- 2026-11-15 (it. 1497) : compteur du sous-onglet « Sorts et attaque » : avec un compagnon, compte aussi ses sorts
  (« 0 / 6 » au lieu de « 0 / 3 »), puisqu'ils s'affichent en grand sur la même page. Vérifié par --stage.
  Autotest 229/229.
- 2026-11-15 (it. 1496) : CLAUDE.md : i18n-check signale désormais une clé sans aucune traduction (liste TECH pour les
  clés techniques).
- 2026-11-15 (it. 1495) : carte du héros (Aventure) : la ligne du duo montre aussi les sorts appris du compagnon,
  après ceux du héros (séparateur « · », rang et nom au survol, un clic mène aux sorts) ; vérifié en fr et ru à 1280
  et 1920 px. « Quoi de neuf » 97 regroupée (sorts du compagnon en grand, cette ligne, trois pistes du héros bloqué).
  En chemin : le script d'ajout des traductions de l'édition a échoué (crochet manquant) et i18n-check ne l'a pas vu,
  car il ne comparait qu'à l'anglais ; il signale maintenant toute clé sans traduction, hors 23 clés techniques
  listées (polices, classes, transformations), vérifié en retirant une clé. Autotest 229/229, lang-overflow propre.
- 2026-11-15 (it. 1494) : README : les sorts du compagnon ont leur cadre en grandes cartes (it. 1491) ; l'ancien « + »
  de la ligne d'icônes n'existe plus.
- 2026-11-15 (it. 1493) : styles.css : règles de l'ancienne ligne d'icônes des sorts du compagnon (.pspells, .pplus ;
  remplacée par le cadre de l'it. 1491) retirées (7 lignes, plus aucun usage). Autotest 229/229.
- 2026-11-15 (it. 1492, contrôle) : sorts du héros et du compagnon côte à côte en thème clair (1366 px) : lisibles,
  couleurs des sorts gardées, aucun défilement.
- 2026-11-15 (it. 1491, DEMANDES DE VICTOR) : (1) « mode automatique très grands écrans » par défaut : c'est déjà le cas
  (settings.hudPos « auto » pour toute partie neuve ou sans réglage ; migrate le remet si la valeur est inconnue) : rien
  à changer. (2) Héros > Sorts et attaque : les sorts du compagnon en grandes cartes, dans un cadre « Sorts de
  {compagnon} » à droite de ceux du héros (même carte que le héros : rang, effets à moitié de puissance, recharge,
  Apprendre / max) ; remplace la ligne de petites icônes. Place gagnée : les deux phrases d'introduction de l'onglet
  (duo, héros libérés) ne s'affichent plus dans cette sous-section ; cartes plus compactes sous 1600 px. lang-overflow
  mesure maintenant les 380 duos (héros + compagnon) en plus des 20 héros seuls : d'abord jusqu'à 38 px de défilement
  (ru 1280), puis aucun défilement dans les 10 langues. Autotest 229/229, crawl 702 clics avec un compagnon.
- 2026-11-15 (it. 1490) : héros bloqué : la carte de la zone montre trois pistes (la bulle en garde deux) : l'ascension
  n'était jamais visible quand forge et potions passaient avant. Pire cas de l'autotest durci (Enclume, or illimité,
  aucune potion) : l'Aventure ne défile pas. Autotest 229/229.
- 2026-11-15 (it. 1489) : devlog 0.1.4 (fr et en) et POUR-VICTOR : quatre nouveaux familiers (le Grillon ajouté).
- 2026-11-15 (it. 1488) : « Quoi de neuf » 96, une édition regroupée de trois lignes (Grillon, ◆ sur les élites du
  type chassé, ⚠ des gobelins dans les Statistiques), comme le demande désormais CLAUDE.md. 10 langues (termes
  repris du jeu). Autotest 229/229 (« 11 0 »), lang-overflow propre.
- 2026-11-15 (it. 1487, contrôle) : état maximal (21 familiers dont le Grillon) en japonais : --crawl 648 clics sans
  erreur ; texte : « コオロギ » présent (22 fois), aucun mot français.
- 2026-11-15 (it. 1486, contrôle) : équilibre après le Grillon (balance.mjs 12 contre 442b6f7) : graine 3 +0,9,
  graine 11 +0,3, graine 21 −0,7 ; moyenne +0,2 zone : bruit.
- 2026-11-15 (it. 1485) : 21e familier, le Grillon (+5 % d'événements rares par niveau, +50 % au niveau 10) : nouvel
  effet « events », compté dans la chance d'événement, le temps estimé de la quête d'événements et la ligne
  « Événements rares » des Probabilités. Sprite vert aux longues antennes, regardé sur la bande. 10 langues, test,
  README (21 familiers), POUR-VICTOR. « Quoi de neuf » : à regrouper avec les prochaines nouveautés (CLAUDE.md).
  Autotest 229/229, lang-overflow propre, simulate 8 h normal.
- 2026-11-15 (it. 1484, contrôle) : --crawl sur une partie neuve en espagnol, portugais et chinois (après les
  changements d'interface du jour) : 72, 72 et 78 clics, aucune erreur.
- 2026-11-15 (it. 1483, contrôle) : semaine simulée (168 h, graines 7 et 3) : mage 350 / 350, guerrier 350 / 350 (le
  mur de fin de semaine). Le retard du mage sur 12 h (it. 1482) s'efface ensuite : rien à régler, idée close.
- 2026-11-15 (it. 1482, contrôle) : mage, le plus faible des mesures du jour : 12 h sur 6 graines, mage 60-62
  (moyenne 60,7), guerrier 57-67 (62,3) ; moyenne des 20 héros 63,6. Écart régulier mais modeste : noté dans Idées,
  rien de changé.
- 2026-11-15 (it. 1481, REVUE GÉNÉRALE) : 12 h graine 7, records : gardien stellaire 67, mage 61, artificier 62
  (mêmes extrêmes que le tableau de l'it. 1468, dans le bruit). perf:linux : bande 19,3 %, panneau 20,7 %, mini 6,7 %,
  icône 0,6 % (stables). Captures ko et es (Statistiques avec le ⚠ des gobelins, Quêtes) : rien d'anormal. Texte
  extrait en allemand : aucun mot français. Rien à noter dans Idées.
- 2026-11-15 (it. 1480, contrôle) : cartes de quête avec indications (gobelins trop rapides, bouton « reprendre
  l’avancée ») en russe et en polonais à 1280 px (état non couvert par lang-overflow) : aucun débordement, aucun
  défilement ; en russe l'indication des gobelins passe sur deux lignes, la carte reste propre.
- 2026-11-15 (it. 1479) : Statistiques > Probabilités, ligne « Gobelin doré » : un ⚠ dont la bulle dit « ils
  s’enfuient : héros trop lent ici » quand le héros ne peut pas en abattre un avant sa fuite. D'abord écrit en clair
  sur la ligne : lang-overflow l'a vue trop large en russe à 1280 px (fin de partie et état maximal) ; passé en bulle,
  propre partout. Autotest 229/229.
- 2026-11-15 (it. 1478, outil) : check-comments.mjs repère aussi un commentaire « // » qui finit par « ; } » ou par une
  affectation « x.y = z; », même quand le code avant finit par « ; » (cas de l'it. 1477, vu seulement par la
  vérification de syntaxe). Aucune fausse alerte sur les 126 fichiers ; le cas de l'it. 1477 reproduit est signalé.
- 2026-11-15 (it. 1477) : marque ◆ de la bande : aussi sur l'étiquette d'une élite ou d'un champion du type visé par une
  quête de chasse (la chasse compte le type, élite ou non ; avant, seuls les monstres ordinaires étaient marqués).
  En chemin, un commentaire « // » ajouté en fin de ligne avalait la suite (piège connu) : arrêté par le contrôle de
  syntaxe de npm test, corrigé (commentaire sur sa propre ligne). Vérifié par --stage. Autotest 229/229.
- 2026-11-15 (it. 1476) : POUR-VICTOR : nouveautés du 14-15/11 réécrites en liste (contenu, confort, corrections,
  vérifié) au lieu d'un long paragraphe.
- 2026-11-15 (it. 1475) : CLAUDE.md : « Quoi de neuf » à regrouper (une édition de 3-5 nouveautés par série, pas une
  ligne par itération) ; les onze éditions d'une ligne de la journée remplissent déjà la fenêtre (11 nouveautés).
- 2026-11-15 (it. 1474) : « Quoi de neuf » : jusqu'à 11 nouveautés (NEWS_FILL_ITEMS 8 → 11). Les éditions 85 à 95 font
  11 lignes : à 8, quelqu'un qui en était à la 84 aurait encore perdu les trois premières (Jour des arcanes, quêtes de
  chasse, Pie). Mesuré : aucun défilement dans les 10 langues (lang-overflow, 1280-1920 px), capture en allemand à
  1280 px lisible ; autotest « 11 0 ». CLAUDE.md mis à jour. Autotest 229/229.
- 2026-11-15 (it. 1473) : « Quoi de neuf » 95 (quêtes qui disent pourquoi elles n'avancent pas, astuce des coups au
  clic), 10 langues ; devlog et POUR-VICTOR (it. 1467-1472). Autotest 229/229, lang-overflow propre.
- 2026-11-15 (it. 1472) : quêtes : vérifié que forge, transmutation, expéditions, coups au clic et sorts ne sont proposés
  qu'à qui peut les faire (ok). La carte « coups au clic » porte l'astuce de la bande en bulle (« clique sur le monstre
  que ton héros combat… », clé déjà traduite). Vérifié par --stage (anglais). Autotest 229/229.
- 2026-11-15 (it. 1471, REVUE GÉNÉRALE) : 12 h graine 7, records : gladiateur 62, chaman 64, danseuse de lames 64
  (moyenne ≈ 64). perf:linux : bande 19,0 %, panneau 20,4 %, mini 6,8 %, icône 0,5 % (stables). Captures zh et fr
  (Quêtes, Aventure, mini) : rien d'anormal. Texte extrait en japonais : seuls mots latins attendus. Rien à noter dans
  Idées.
- 2026-11-15 (it. 1470) : quête « Atteindre la zone N » avec l'avancée automatique coupée (« Passer à la zone suivante
  après le boss » décoché) : elle ne pouvait pas avancer, sans le dire ; sa carte porte un bouton « reprendre
  l’avancée » qui la réactive d'un clic (puis disparaît). 10 langues ; vérifié par --stage en russe à 1280 px.
  Autotest 229/229.
- 2026-11-15 (it. 1469) : carte d'une quête « Attraper N gobelins dorés » déjà tirée alors que le héros est trop lent
  (zone changée…) : « · ils s’enfuient : héros trop lent ici » sur la ligne de progression (comme « absent d’ici »
  pour la chasse) ; le bouton Changer reste là. 10 langues, capture en allemand à 1280 px. Autotest 229/229.
- 2026-11-15 (it. 1468, contrôle) : tableau des 20 héros (12 h, graines 7/3/11) : moyenne 63,6 (it. 1118 : 63,7),
  de 60,7 (mage) à 67,3 (gardien stellaire), écart 6,7 zones (avant 5,7). Dans le bruit par héros (±2 sur 3 graines) :
  rien à régler ; à surveiller si le mage reste le plus faible et le gardien stellaire le plus fort aux prochaines
  mesures. Repère ajouté dans hero-table.mjs (et rappel : 2e argument = liste de graines).
- 2026-11-15 (it. 1467, contrôle) : après les changements d'interface du jour (fiches cliquables du Bestiaire, quêtes
  de chasse « absent d'ici », pistes du héros bloqué, marques ◆) : --crawl sur l'état maximal en russe (625 clics) et
  sur la fin de partie en polonais (686 clics) : aucune erreur. Écarté : une bulle de pistes sur « ⚠ bloqué » de la
  bande (la zone n'est pas cliquable ; la rendre « .hit » arrêterait les clics vers le bureau).
- 2026-11-15 (it. 1466) : « Quoi de neuf » 94 : aide au héros bloqué (pistes dans la carte de la zone et la bulle du
  mode mini, piste « forger »), 10 langues ; devlog et POUR-VICTOR (it. 1461-1466). Autotest 229/229, lang-overflow
  propre (fenêtre à 8 nouveautés).
- 2026-11-15 (it. 1465) : mode mini : la bulle du héros bloqué (liseré rouge) donne aussi les pistes (« ⚠ Pistes :
  forge ton équipement avec ton or · rachète des potions ») ; l'état bloqué entre dans la clé de rafraîchissement de la
  bulle (avant : mise à jour seulement au prochain changement de niveau, or, zone ou victoire). Vérifié par --stage
  (window.__mini). Autotest 229/229.
- 2026-11-15 (it. 1464) : héros bloqué : les pistes (deux premières, forge comprise) restent visibles dans la carte de
  la zone de l'Aventure (« ⚠ Pistes : … », en rouge) tant qu'il bloque ; avant, seulement dans la bulle (une fois).
  Pistes regroupées dans ui/stucktips.js (bulle et panneau). Nouveau contrôle d'autotest (pire cas : Enclume, or
  illimité) : l'Aventure ne défile pas ; capture en russe à 1280 px. Autotest 229/229, lang-overflow propre.
- 2026-11-15 (it. 1463) : étude de la longue traîne (it. 1462, graine 3) : le héros bute ≈ 1 h sur les boss des zones
  19-21 avec jusqu'à 400 k d'or qui dort (le joueur simulé ne forge ni n'achète rien) ; la date exacte dépend du moment
  des équipements (trajectoire chaotique : record 20 à 50 ou 114 min selon un décalage d'une seconde). Les pistes de
  l'alerte « héros bloqué » ne parlaient jamais de cet or : nouvelle piste « forge ton équipement avec ton or » (après
  équiper et talents) quand l'Enclume est achetée et qu'une pièce portée peut être forgée. 10 langues (verbe du
  bouton de forge repris), test. Autotest 228/228.
- 2026-11-15 (it. 1462, contrôle) : ouverture de l'Ascension (tab-pace sur 10 graines) : avant la nuit 21-61 min ;
  maintenant 19-43 min pour 8 graines, 114 et 124 min pour les graines 3 et 6. Apparu avec le Trésor enfoui, mais
  identique avec sa chance à 0 : décalage des tirages, pas un effet de l'événement. Révèle une longue traîne du début
  de partie (noté dans Idées).
- 2026-11-15 (it. 1461, REVUE GÉNÉRALE) : 12 h graine 7, records : arbalétrier 64, lancier 65, prêtresse 65 (moyenne
  ≈ 64). perf:linux : bande 19,3 %, panneau 20,6 %, mini 6,5 %, icône 0,6 % (stables, marque ◆ comprise). Captures de
  et ja (Quêtes, Bestiaire, mini) : rien d'anormal. Texte extrait en russe : seuls mots latins attendus. Rien à noter
  dans Idées.
- 2026-11-15 (it. 1460) : POUR-VICTOR complété (it. 1452-1459 : gobelins hors ligne, quête réservée aux héros assez
  rapides, marque ◆ sur la bande).
- 2026-11-15 (it. 1459) : marque ◆ de la bande étendue : élite de la sorte demandée par une quête « proie » (« Rapide ✦
  ◆ », l'autre élite sans marque), champions pendant la quête des champions, gobelins dorés pendant la quête des
  gobelins. Vérifié par --stage (élites forcées dans la série). L'édition 93 (déjà publiée) ne cite que la chasse :
  laissée telle quelle. Autotest 228/228.
- 2026-11-15 (it. 1458) : bande : un petit ◆ bleu clair (#9fd8ff, couleur de « Quête accomplie ! ») au-dessus des
  monstres ordinaires visés par une quête de chasse en cours ; posé avec la série (syncSlots), jamais à chaque image ;
  repris par clearQueueTags comme les étiquettes d'élites. Vérifié par --stage (2 dragonnets marqués). « Quoi de neuf »
  93 (Streifen, faixa, franja… : mot de la bande repris des Réglages). Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1457) : README à jour des ajouts du jour : quêtes (gobelins dorés), événements (trésor enfoui),
  20 familiers.
- 2026-11-15 (it. 1456) : quête « Attraper N gobelins dorés » : jamais proposée à un héros trop lent pour abattre un
  gobelin avant sa fuite (goblinCatchable, quests.js : PV du gobelin / dégâts par seconde sans élixirs ni sorts < 4 s),
  et pas de temps estimé dans ce cas (avant : l'estimation supposait chaque gobelin attrapé). Une quête déjà tirée
  reste (bouton Changer). Test (zone 1 oui, zone 300 avec l'équipement de départ non). Autotest 228/228.
- 2026-11-15 (it. 1455, contrôle) : après les gobelins hors ligne et la 19e quête : save-fuzz sur les trois bases
  (dev 1218, fin 1190, 0.1.2 1134 corruptions) : ok.
- 2026-11-15 (it. 1454) : « Depuis ta dernière visite » : ligne « Gobelins dorés attrapés » (libellé déjà traduit des
  Statistiques) quand l'absence en a attrapé (it. 1452). Pire cas de l'autotest complété (38 gobelins) : l'Aventure ne
  défile pas (ok 0). Autotest 228/228.
- 2026-11-15 (it. 1453, contrôle) : effet des gobelins hors ligne (it. 1452) sur l'or d'une absence de 8 h : partie de
  fin de partie et dev-data, ×1,000 (aucun gobelin : 310 victoires en 8 h, un gobelin ne peut être abattu en 4 s). Le
  gain ne vaut que pour un héros qui bat vite ses monstres (farm d'une zone facile, partie neuve : 39 gobelins en 8 h) ;
  il rapproche alors l'or hors ligne de l'or en jeu, où les gobelins comptaient déjà (≈ +20 % à 1,5 % × 15). Les
  simulations (simulate, balance) ne passent pas par applyOffline : non concernées.
- 2026-11-15 (it. 1452) : 19e sorte de quête « Attraper N gobelins dorés » (1-2, or, potions, parfois un œuf ; icône
  pièces d'or ; temps estimé = rythme × chance de gobelin, Fête des gobelins comprise). Pendant l'absence, les gobelins
  sont maintenant attrapés (avant : jamais) si le héros abat un gobelin (0,7× PV) avant sa fuite (4 s) : compteur,
  quête et leur or (×15). Test (8 h d'absence : gobelins attrapés, quête avancée). Page du magasin (10 langues),
  checklist, POUR-VICTOR : 19 sortes de quêtes ; devlog, « Quoi de neuf » 92. Capture en russe à 1280 px. Autotest
  228/228, lang-overflow propre (fenêtre « Quoi de neuf » à 8 nouveautés).
- 2026-11-15 (it. 1451, REVUE GÉNÉRALE) : 12 h graine 7, records : berserker 69, cryomancien 62, barde 65 (moyenne
  ≈ 64). perf:linux : bande 19,2 %, panneau 19,9 %, mini 7,0 %, icône 0,6 % (stables). Captures es et pt à 1366 px
  (Héros, Familiers, Statistiques) : rien d'anormal (« Eventos raros (0 / 18) », « A descobrir 4 »). Texte extrait en
  polonais : aucun mot français. Rien à noter dans Idées.
- 2026-11-15 (it. 1450) : « Quoi de neuf » 91 : temps estimés des quêtes d'événements, d'objets rares et de boss
  (it. 1447-1449), 10 langues ; devlog et POUR-VICTOR (it. 1441-1450). Autotest 228/228, lang-overflow propre (fenêtre
  « Quoi de neuf » à 8 nouveautés comprise).
- 2026-11-15 (it. 1449) : quête « Vaincre N boss » : temps estimé sur sa carte (un boss toutes les KILLS_PER_ZONE + 1
  victoires, avancée automatique ou non) ; aucune estimation quand le héros bute sur un boss (stuckInfo). Ancien test
  (it. 926, « boss : inconnu ») mis à jour ; test du cas bloqué. Autotest 228/228. Restent sans estimation : forge,
  transmutation, coups au clic et zone (gestes du joueur ou progression incertaine).
- 2026-11-15 (it. 1448) : quête « Trouver N objets rares ou mieux » : temps estimé sur sa carte (monstre ordinaire :
  chance de butin × part rare+ des poids de RARITIES ; élite : butin sûr dès sa rareté minimale ; boss, champions et
  Corne d'abondance négligés). Vérifié sur la partie de fin de partie (20 min simulées, graine 5) : 2 estimés, 2
  obtenus. Test. Autotest 228/228.
- 2026-11-15 (it. 1447) : quête « Vivre N événements rares » : temps estimé sur sa carte (rythme des victoires × chance
  qu'une victoire déclenche un événement permis ici, Jour des prodiges compris). Fin de partie, une victoire / 2 s :
  2 événements ≈ 2 min. Test. Autotest 228/228. Quêtes encore sans estimation : boss, forge, transmutation, butin,
  coups au clic, zone (cadence propre au joueur ou au boss).
- 2026-11-15 (it. 1446, contrôle) : après Jour des arcanes, Pie, Trésor enfoui : fuzz sous toutes les bénédictions
  (FUZZ_DAYMOD=all, 400 parties) et fuzz normal (1200 parties) : 0 bloquée. mem-watch 6 min ×10 : 501-516 Mo puis
  retour à 501 (plage attendue 485-530 Mo) : pas de fuite.
- 2026-11-15 (it. 1445, outil) : early-pace.mjs : SEEDS=n (3 par défaut, repères inchangés : 104 / 37 / 22 / 5,7) et
  écart entre graines à 60 min en dernière ligne. Repère sur 10 graines : 105 objets, niveau 38 (35–40), zone 22
  (20–23), 5,9 déblocages. CLAUDE.md mis à jour.
- 2026-11-15 (it. 1444, contrôle) : première heure (early-pace, 3 graines) : à 60 min 104 objets, niveau 37, zone 22,
  5,7 déblocages, contre 120 / 40 / 23 / 6,3 avant la nuit (4096b50). Dichotomie sur les 25 commits de la nuit
  (dossier de travail git) : stable jusqu'au Bestiaire (111 / 41 / 25 / 6,7), la baisse arrive avec le Trésor enfoui ;
  avec sa chance mise à 0 (le tirage reste, l'événement n'arrive jamais), même résultat 104 / 37 / 22 : simple décalage
  des tirages aléatoires (un événement de plus = un tirage de plus par victoire), pas un effet du jeu. Bruit de
  early-pace sur 3 graines : au moins ±3 niveaux et ±3 zones à 60 min ; ne pas régler le début sur un seul écart.
- 2026-11-15 (it. 1443, contrôle) : « Quoi de neuf » à 7 nouveautés regardé en capture (allemand, 1280 px) : deux
  colonnes lisibles, aucun défilement, « … und 209 ältere Neuerungen » en bas. Rien à corriger.
- 2026-11-15 (it. 1442) : « Quoi de neuf » : après les 3 dernières éditions, la fenêtre en ajoute de plus anciennes tant
  que le total reste sous 8 nouveautés (NEWS_FILL_ITEMS). Avant, six éditions d'une ligne parues ce matin (85-90) :
  Victor n'en aurait vu que 3, les autres réduites à « … et N nouveautés plus anciennes ». newsShown(84) : les 6 ;
  fenêtre complète : 7 nouveautés au lieu de 3. Test adapté. Autotest 228/228 (« 7 0 »), lang-overflow propre.
- 2026-11-15 (it. 1441, REVUE GÉNÉRALE) : 12 h graine 7, records des courses : assassin 62, druide 66, samouraï 66
  (moyenne ≈ 64). perf:linux : bande 18,8 %, panneau 20,8 %, mini 6,7 %, icône 0,5 % (stables). Captures ko et en
  (Bestiaire > Événements rares : 18 cartes sur trois rangées de six, Quêtes, mini) : rien d'anormal. Texte extrait en
  coréen : seuls mots latins attendus. À garder en tête : un 19e événement ouvrira une 4e rangée dans Bestiaire >
  Événements (à mesurer alors à 1280 px). Rien d'autre à noter.
- 2026-11-15 (it. 1440, contrôle) : état maximal (max-save : les 18 événements vus) en japonais : --crawl 636 clics sans
  erreur ; texte : « 埋もれた財宝 » présent, aucun mot français. POUR-VICTOR complété (it. 1434-1439).
- 2026-11-15 (it. 1439) : 18e événement rare, le Trésor enfoui (0,15 %, 30 s : chaque victoire a 10 % de chances
  d'ouvrir un coffre au trésor ; thème de la Pie et de « Pilleur de coffres ») : bilan « N coffres au trésor »,
  réplique, son (rendu par l'autotest), paillettes dorées (particule de la Nichée), 10 langues, test, « Quoi de neuf »
  90 ; page du magasin (10 langues), dossiers de presse, checklist, devlog, POUR-VICTOR : 18 événements. En chemin :
  l'autotest a vu une taille de police fractionnaire (11,67 px) sur le temps estimé des quêtes (<small class="eta">
  sans règle, plus souvent visible depuis les estimations des it. 1417-1423) : fixé à 12 px. Autotest 228/228,
  lang-overflow propre, fuzz (Jour des prodiges) 0 bloquée.
- 2026-11-15 (it. 1438) : clavier : les fiches cliquables du Bestiaire (it. 1437) sont focalisables (tabindex, role
  button, aria-label « nom · Clic : y aller · Zone N ») ; panel.js : Entrée ou Espace sur tout élément role="button"
  qui porte une action (hors vrais boutons) fait un clic, sauf si la touche est déjà traitée (la Carte a son propre
  clavier : pas de double voyage). Vérifié par --stage (Entrée : 56 → 37) ; « carte au clavier » de l'autotest OK.
  Autotest 228/228.
- 2026-11-15 (it. 1437) : Bestiaire : avec la Carte du voyageur, une fiche de monstre absent de la zone se clique et
  emmène le héros dans la zone atteinte la plus proche où il vit (« Clic : y aller · Zone N » dans la bulle ; monter
  ses paliers sans passer par la Carte). nearestZoneWith (rules.js) partagé avec la quête de chasse (it. 1426) et
  testé. Un glisser de la rangée ne déclenche pas de voyage (clic absorbé par hscroll). Vérifié par --stage : 56 → 37.
  « Quoi de neuf » 89. Autotest 228/228, crawl 705 clics, lang-overflow propre.
- 2026-11-15 (it. 1436, contrôle) : i18n-names après la Pie et « Pilleur de coffres » : 24 écarts, tous connus
  (génitifs allemands et coréens, réplique libre japonaise) ; aucun ne vient des ajouts de la nuit. Écart assumé :
  le succès « Ménagerie complète » ne reprend pas le mot du déblocage « Ménagerie » en es, pt, zh, ja ; le corriger
  obligerait à ressaisir le nom du succès dans Steamworks, pour un gain faible.
- 2026-11-15 (it. 1435) : Statistiques > Probabilités : les lignes « Événements rares » et « Champion » donnent aussi la
  chance du jour (Jour des prodiges ×2 : « aujourd’hui 0,2 %–0,8 % » ; Jour des champions ×4 : « aujourd’hui 2 % »),
  comme coffres, gobelins et élites ; revue de toutes les bénédictions : chacune est maintenant visible là où elle
  agit. Vérifié par --stage. Autotest 228/228, lang-overflow propre (Statistiques sous chaque bénédiction).
- 2026-11-15 (it. 1434) : Héros > Sorts et attaque : le Jour des arcanes donne la recharge réelle du jour (« Toutes les
  4 s » au lieu de 6, 13,3 au lieu de 20), suivie de 🔮 (nom et effet de la bénédiction au survol) ; avant, la recharge
  de base restait affichée. Aucun texte nouveau. Vérifié par --stage (sous-section ouverte par [data-to=style]).
  Autotest 228/228.
- 2026-11-15 (it. 1433) : POUR-VICTOR : la Pie, le succès « Pilleur de coffres » et la chance de coffre affichée dans
  les nouveautés de la nuit (it. 1427-1432).
- 2026-11-15 (it. 1432) : Statistiques > Probabilités : la chance de coffre « aujourd’hui » compte aussi la Pie (avant :
  seulement le Jour des trésors ; comme la ligne des élites avec la Grenouillette). Pie niveau 10 : « aujourd’hui
  0,32 % » (0,2 × 1,6), vérifié par --stage. Autotest 228/228.
- 2026-11-15 (it. 1431, REVUE GÉNÉRALE) : 12 h graine 7, records des courses : paladin 69, nécromancien 61, moine 65
  (moyenne habituelle ≈ 64). perf:linux : bande 19,3 %, panneau 19,9 %, mini 6,7 %, icône 0,6 % (stables). Captures
  zh et fr (Statistiques, Familiers, Bestiaire) : rien d'anormal (« 成就 33 / 70 » compte le nouveau succès). Texte
  extrait en chinois : seuls mots latins attendus. Rien à noter dans Idées.
- 2026-11-15 (it. 1430) : 70e succès CHESTS_50 « Pilleur de coffres (50 coffres) », objectif lointain lié à la Pie
  (seul « un coffre » existait) : progression affichée, icône (coffre de fer) générée, achievements.md, checklist,
  README, POUR-VICTOR (à déclarer dans Steamworks), « Quoi de neuf » 88, 10 langues, test. Autotest 228/228,
  lang-overflow propre (Statistiques > Succès compris).
- 2026-11-15 (it. 1429, contrôle) : équilibre après la Pie (balance.mjs 12 contre d00cf97, 10 classes) : graine 3
  −1,4, graine 11 −0,2, graine 21 +0,4 ; moyenne −0,4 zone : bruit (les coffres changent les tirages, pas la force).
- 2026-11-15 (it. 1428, contrôle) : état maximal (max-save, les 20 familiers dont la Pie) en russe : --crawl 618 clics
  sans erreur ; texte extrait : « Сорока » présent, aucun mot français. Fausse piste écartée : une copie faite par
  « cp -r a b » alors que b existait déjà atterrit dans b/a (le jeu chargeait une ancienne copie) : toujours
  « rm -rf b » avant de copier.
- 2026-11-15 (it. 1427) : 20e familier, la Pie (+6 % de coffres au trésor par niveau, +60 % au niveau 10) : nouvel
  effet « chests » (talents.js, rules.js), compté sur la chance de coffre en jeu, pendant l'absence et dans le temps
  estimé de la quête de coffres. Sprite noir et blanc à reflet bleu (volant), regardé en capture sur la bande.
  10 langues, test, « Quoi de neuf » 87, devlog, POUR-VICTOR. Autotest 228/228, lang-overflow propre, simulate 8 h
  normal (zone 39 en course, 6 ascensions).
- 2026-11-15 (it. 1426) : quête « Chasser N … » dont le monstre ne vit pas dans la zone actuelle (zone changée,
  ascension) : la carte dit « absent d’ici · zone N » (zone la plus proche, jusqu'au record, où il vit) ; avec la Carte
  du voyageur c'est un bouton qui y emmène le héros. Avant : quête bloquée sans explication. Vérifié par --stage :
  allemand 1280 px (texte, sans débordement), bouton 56 → 37. « Quoi de neuf » 86 (avec les temps estimés des
  it. 1417-1423). Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1425, contrôle) : après les temps estimés des quêtes (it. 1417-1423) : save-fuzz (dev 1218 et fin
  1190 corruptions) ok ; questEta essayé à la main avec des expéditions abîmées (null, liste, texte, NaN, nombre en
  texte) et des quêtes au but illisible : aucune erreur, null ou une valeur sensée. first-minutes inchangé (niv. 2
  vers 57 s, boss et premier objet vers 78 s, 1er déblocage vers 384-430 s). Le mode mini signale déjà les quêtes à
  réclamer (point doré, « À faire maintenant ») : rien à ajouter.
- 2026-11-15 (it. 1424, contrôle) : accessibilité : tous les boutons, cases, curseurs et listes de tous les onglets
  (préparés d'avance) ont un nom lisible par un lecteur d'écran (texte, aria-label, bulle, étiquette ou image avec
  alt) ; seul le bouton de la fenêtre de confirmation est vide tant qu'elle est fermée (rempli à l'ouverture).
  Bilan d'absence de 8 h regardé en capture : rien d'anormal.
- 2026-11-15 (it. 1423) : quête « Trouver N coffres au trésor » : temps estimé sur sa carte (rythme des victoires ×
  chance de coffre, élites plus généreuses, Jour des trésors compris). Fin de partie, une victoire / 2 s : ≈ 10 min.
  Test. Autotest 228/228.
- 2026-11-15 (it. 1422) : note de l'onglet Quêtes corrigée : les quêtes « Atteindre la zone N » n'avancent pas non
  plus pendant l'absence (le héros reste dans sa zone, sans boss) : « sauf boss, nouvelles zones, événements rares et
  sorts ». Nouvelle clé dérivée des 9 traductions de l'ancienne. Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1421, REVUE GÉNÉRALE) : 12 h graine 7 : guerrier 66, mage 60, rôdeur 62 (moyenne habituelle ≈ 64,
  bruit). perf:linux : bande 19,4 %, panneau 21,1 %, mini 6,7 %, icône 0,5 % (stables). Captures fr, en, ja
  (Aventure, Quêtes, Boutique, mini) : rien d'anormal. Texte extrait en ja et ko : seuls mots latins attendus (HP,
  Lv, Esc, noms des langues ; « attributs » = repère de section du fichier extrait). Fausse alerte vérifiée par
  mesure : en anglais, le nom du boss majeur semblait toucher l'or ; il s'arrête bien 8 px avant la pastille (c'est le
  sommet du sprite du volcan qui dépasse). Rien à noter dans Idées.
- 2026-11-15 (it. 1420) : vérifié en vrai (--stage sur une copie de dev-data) le temps estimé d'une quête d'expéditions :
  « ≈ 24 min » pour deux retours à 10 et 25 min. POUR-VICTOR complété (it. 1415-1419).
- 2026-11-15 (it. 1419) : quête « Ramener N expéditions » : temps estimé exact (heure du n-ième retour parmi les
  expéditions en cours ; aucun s'il n'y en a pas assez en route). Test. Autotest 228/228.
- 2026-11-15 (it. 1418) : quête « Porter N coups critiques » : temps estimé sur sa carte (attaques par seconde × chance
  de critique ; un peu optimiste). Test. Autotest 228/228. Quêtes encore sans estimation : leur cadence dépend du
  hasard ou du joueur (boss, coffres, événements, forge, transmutation, butin, expéditions, coups au clic, zone).
- 2026-11-15 (it. 1417) : quête « Lancer N sorts » : temps estimé sur sa carte (somme des 1 / recharge des sorts appris,
  héros et compagnon, Jour des arcanes compris ; un peu optimiste, les sorts ne partant qu'en combat) ; aucun sans sort
  appris. Fin de partie : 20 sorts ≈ 25 s (affiché « ≈ 1 min »). Test. Autotest 228/228.
- 2026-11-15 (it. 1416, contrôle) : --crawl sur une partie NEUVE (début de partie, peu d'onglets ouverts) en japonais et
  en russe : 72 clics chacune, aucune erreur (les autres parcours de la nuit portaient sur dev-data, la fin de partie et
  l'état maximal).
- 2026-11-15 (it. 1415) : précisions d'une bénédiction qui ne sert pas encore (élites, champions, sorts pas encore là)
  regroupées dans ui/daymodnotes.js, et ajoutées à la bulle du mode mini (avant : seulement la pastille du panneau).
  Vérifié en partie neuve sous le Jour des arcanes, panneau et mini. Autotest 228/228.
- 2026-11-15 (it. 1414) : POUR-VICTOR : le Jour des arcanes dans les nouveautés de la nuit.
- 2026-11-15 (it. 1413) : Jour des arcanes sans sort appris : la bulle de la pastille ajoute « Les sorts s’apprennent à
  partir de la zone 10. » (comme les élites et les champions avant leur zone). 10 langues ; vérifié sur une partie
  neuve par --stage. Autotest 228/228.
- 2026-11-15 (it. 1412) : 15e bénédiction du jour, le Jour des arcanes 🔮 (sorts rechargés 50 % plus vite, cumulable
  avec la Marée arcanique ; aucune bénédiction ne touchait les sorts), ajoutée à la FIN. Calendrier du 14 au 30/11
  inchangé (elle viendra plus tard). Réplique du héros, 10 langues, test, README, « Quoi de neuf » 85, devlog,
  POUR-VICTOR. Autotest 228/228, lang-overflow propre, fuzz sous cette bénédiction 0 bloquée.
- 2026-11-15 (it. 1411, revue générale) : après la quête « Gagner N niveaux » : save-fuzz fin de partie ok (1190) ;
  fuzz 800 parties, 0 bloquée ; texte allemand : aucun mot français. Équilibre (it. 1410), performance (1401) et
  mémoire (1390) déjà mesurés. Rien à corriger.
- 2026-11-15 (it. 1410, contrôle) : équilibre après la quête « Gagner N niveaux » : balance 12 h contre 6eebf9b :
  63,1 → 63,8 (+0,7, bruit). Rien à corriger.
- 2026-11-15 (it. 1409) : POUR-VICTOR et brouillon du devlog : la quête « Gagner N niveaux » et la bénédiction de
  demain dans la bulle du mini.
- 2026-11-15 (it. 1408) : quête « Gagner N niveaux » : temps estimé sur sa carte (« ≈ 25 min »), comme les quêtes de
  victoires : expérience restante pour les niveaux demandés ÷ (rythme des victoires × expérience d'une victoire de la
  zone, bonus compris). Test. Autotest 228/228.
- 2026-11-15 (it. 1407) : quête « Gagner N niveaux » proposée seulement si un niveau coûte au plus ≈ 500 victoires de la
  zone (bonus d'expérience non comptés). Mesuré sur 30 min de jeu : fin de partie 183 → 185 (elle se fait en
  30-60 min) ; dev-data niveau 1313 → 1313 (elle ne finirait jamais : plus proposée). Autotest 228/228.
- 2026-11-15 (it. 1406) : 18e sorte de quête, « Gagner N niveaux » (2 à 4 ; or, potions, parfois un œuf) : avance aux
  montées de niveau, en jeu comme pendant l'absence (un objectif de patience). Icône du livre de la Bibliothèque,
  10 langues (3 formes en russe et polonais), test, page Steam 17 → 18 dans les 10 langues, checklist, README,
  « Quoi de neuf » 84, devlog, POUR-VICTOR. Deux anciens tests dépendaient du tirage décalé par le nouveau poids de
  quête : l'or d'absence lu dans le résumé (pas le total, qui compte les quêtes réclamées) ; le message du légendaire
  au sol cherché en TÊTE du journal (unshift ; une ligne de collection peut s'ajouter). Autotest 228/228, fuzz 0
  bloquée, lang-overflow propre.
- 2026-11-15 (it. 1405, contrôle) : place dans la Boutique mesurée à 1280 px (allemand et français) pour un 9e
  consommable : ne tient pas sans retoucher les tuiles ; mesures ajoutées à l'idée du Parchemin des arcanes.
- 2026-11-15 (it. 1404) : idée étudiée puis écartée pour l'instant : un « Parchemin des arcanes » (sorts rechargés plus
  vite, 10 min). La grille des consommables est fixée à 4 colonnes × 2 rangées (8 tuiles depuis l'Encens) : une 9e
  ouvrirait une 3e rangée (≈ 110 px) et ferait défiler la Boutique à 1280 px ; noté dans les Idées.
- 2026-11-15 (it. 1403) : mode mini : sa bulle annonce aussi la bénédiction de demain (« Demain : 💎 Jour des trésors »),
  comme la pastille du panneau et le Bestiaire (clé existante, déjà traduite). Vérifié par --stage. Autotest 228/228.
- 2026-11-15 (it. 1402) : POUR-VICTOR : nouveautés de la nuit complétées jusqu'à l'it. 1402 (Démineur, élites
  d'absence, bilans, astuce du Bestiaire ; équilibre, mémoire et performance vérifiés).
- 2026-11-15 (it. 1401, revue générale) : --perf (copie neuve) bande 19,1 %, panneau 21,5 %, mini 6,7 %, icône 0,5 % ;
  --crawl en polonais sur l'état maximal 724 clics sans erreur ; texte russe : aucun mot latin hors noms voulus.
  Équilibre vérifié aux it. 1391-1392. Rien à corriger.
- 2026-11-15 (it. 1400) : « Quoi de neuf », édition 83 : bilans d'événements plus riches (it. 1398-1399) et élites
  d'absence comptées par sorte (it. 1397) ; noms tels que traduits. Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1399) : bilans d'événements : le Souffle de sagesse dit l'expérience gagnée et la Nichée les œufs
  trouvés (compteurs en mémoire, pas de donnée sauvegardée). 10 langues (3 formes en russe et polonais), test.
  Restent sans chiffre propre (leur effet n'est pas un gain comptable) : vent, frénésie, zèle, voile, écho.
- 2026-11-15 (it. 1398) : bilan de la Source de vie au journal : la vie rendue (« Source de vie · bilan : 12 monstres
  vaincus, +1,8 M PV regagnés. »), comme les boss pour la Lune pâle ; accumulée pendant l'événement, remise à zéro à son
  début. 10 langues (3 formes en polonais), test. Autotest 228/228.
- 2026-11-15 (it. 1397) : absence : les compteurs par sorte d'élite (Bestiaire > Élites, succès Démineur) avancent
  aussi hors ligne, une sorte au hasard par élite comme les proies ; seules les sortes déjà vaincues comptent (la
  découverte d'une sorte reste un moment du jeu en direct, avec son annonce et son bonus). Avant, un joueur surtout
  absent ne progressait jamais vers Démineur. Test ; save-fuzz ok ; commentaire « 1 chance sur 7 » périmé corrigé.
- 2026-11-15 (it. 1396) : brouillon du devlog 0.1.4 et POUR-VICTOR : le succès Démineur (éditions jusqu'à 82). Aucun
  « 68 succès » resté dans la page Steam, les dossiers de presse ou le README.
- 2026-11-15 (it. 1395) : 69e succès, « Démineur (25 explosifs) » (EXPLOSIVE_25, progression x / 25 sur le compteur de
  l'Explosif du Bestiaire) : un objectif de quelques heures pour la nouvelle élite. Icônes 64×64 (élémentaire de feu,
  couleur et grisée) générées par achicons.js et seules copiées (les 136 autres identiques), steam/achievements.md
  régénéré, checklist 69, README, test, 10 langues, « Quoi de neuf » 82, POUR-VICTOR (à déclarer dans Steamworks).
  Autotest 228/228, lang-overflow propre (liste des succès plus longue).
- 2026-11-15 (it. 1394, contrôle) : début de partie après l'Explosif (élites dès la zone 3) : premier objet 63-81 s,
  boss 77-81 s, niveau 15-17 vers 13-15 min ; onglets Talents 1 min, Quêtes 5, Boutique 9-10, Héros 10-11, Carte 12-13,
  Bestiaire 15. Comme à l'it. 1360.
- 2026-11-15 (it. 1393, contrôle) : panneau ouvert, redessins complets (renderAll, un par « change ») : 3,9 par seconde
  dans les 10 premières secondes (le Grand intendant ramène et renvoie d'un coup les expéditions finies pendant
  l'absence : rafale de lancement), puis 1 en 10 s en régime établi (une victoire). Coût d'un renderAll : 3-10 ms
  (Bestiaire le plus lourd) : même à une victoire par seconde (début de partie), < 1 % d'un cœur. Rien à gagner.
- 2026-11-15 (it. 1392, contrôle) : effet cumulé des ajouts de la nuit (Lucane, Source de vie, Jour du sang,
  Explosif…) : balance 12 h contre 4096b50, trois graines : −0,1 / +0,6 / +0,1 zone : aucun. Les records plus bas de
  simulate.js seul (guerrier 61) ne se retrouvent pas dans balance (guerrier 65, graine 7).
- 2026-11-15 (it. 1391, revue générale) : 12 h guerrier 61, mage 59, rôdeur 62 (une graine ; la moyenne des 10 classes
  après l'Explosif a été jugée bruit à l'it. 1382 : −0,9 à −1,2, le même écart sans explosion) ; joueur absent 16 à
  12 h (repère 16) ; texte japonais : aucun mot latin hors HP / Lv / pt voulus. Performance et mémoire mesurées aux
  it. 1381 et 1390. Rien à corriger.
- 2026-11-15 (it. 1390, contrôle) : mémoire dans la durée après les ajouts de la nuit (icônes d'effets, halo, éclats
  d'explosion) : mem-watch 6 min à ×3 : réel 488-501 Mo, stable (repère 485-530). Pas de fuite.
- 2026-11-15 (it. 1389) : proposition « fin de semaine » (it. 1029) remise à jour : le mur est passé de 293 à 350
  (écho de boss) avec le grand graphe et les points en surplus ; le choix (rythme lent ou courbe plus douce au-delà
  de 250) ajouté à docs/POUR-VICTOR.md. Une 4e expédition de familier étudiée puis laissée (rangée de boutons et Grand
  intendant à revoir : trop pour une itération).
- 2026-11-15 (it. 1388) : Bestiaire > Élites : tant que la collection des sortes d'élites n'est pas complète (10 avec
  l'Explosif), le titre de la section porte l'astuce de l'Encens de chasse au survol (même texte que les quêtes
  d'élites, it. 1344 ; rien de plus à l'écran). Vérifié par --stage. Aucune tâche en suspens (TODO, FIXME) dans le code.
- 2026-11-15 (it. 1387, contrôle) : save-fuzz après l'Explosif (affixesSeen, proies) sur dev-data (1211) et la
  partie 0.1.2 (1134) : ok ; la fin de partie l'était à l'it. 1382.
- 2026-11-15 (it. 1386) : docs/POUR-VICTOR.md : ce qui attend Victor, en une page (page Steam à recopier : 17
  événements, 10 élites ; CHAMPIONS_25 à déclarer, BLESSINGS_ALL à renommer ; 0.1.4 à décider, devlog prêt ;
  vérifications Windows) et les nouveautés de la nuit. Signalé en tête de CLAUDE.md.
- 2026-11-15 (it. 1385, contrôle) : page Steam et dossier de presse : aucune élite ni aucun événement cité par son nom
  (seulement des nombres, déjà à jour). i18n-names avec l'Explosif : aucun écart. --crawl sur la fin de partie en
  coréen (635 clics) et en allemand (676) : aucune erreur.
- 2026-11-15 (it. 1384) : README « Ajouter du contenu » : recettes pour un événement rare, une élite et une bénédiction
  du jour (où écrire, ordre « à la fin », réplique, son, nombres cités par la page Steam et les dossiers de presse,
  calendrier), tirées des ajouts de la nuit ; familiers « à la fin » aussi.
- 2026-11-15 (it. 1383, contrôle) : l'Explosif à l'image (--stage : toute la file explosive, monstre ramené à 1 PV
  toutes les 2 s car la zone 56 de dev-data est longue à vaincre) : étiquettes orange « Explosif », 4 explosions en
  10 s, PV du héros qui baissent puis remontent. Conforme.
- 2026-11-15 (it. 1382) : 10e sorte d'élite, l'Explosif : en mourant, il inflige au héros 6 % de ses PV max, sans jamais
  l'achever (le danger à la fin du combat, pas pendant). Texte « Explosion ! » et étincelles sur la bande, son (rendu
  par l'autotest), test (dégâts et « jamais achevé »), fidélité de sa description (paramètre explode), 10 langues,
  page Steam 9 → 10 dans les 10 langues, checklist, README, « Quoi de neuf » 81, devlog. Équilibre : balance −1,0 sur
  deux graines à 10 % … puis −1,2 avec une explosion à ZÉRO : l'écart vient du tirage décalé par l'affixe ajouté, pas
  de l'explosion (bruit) ; gardé à 6 % (moins agaçant). Autotest 228/228, fuzz 0 bloquée, save-fuzz fin ok,
  lang-overflow propre.
- 2026-11-15 (it. 1381, revue générale) : après le Lucane, la Source de vie, le Jour du sang et le ménage des imports :
  --perf (copie neuve) bande 19,9 %, panneau 20,9 %, mini 6,7 %, icône 0,6 % ; semaine guerrier 350 / 349 / 350
  (repère 350) ; save-fuzz FUZZ_BASE=fin ok (1190). Traductions et interface vérifiées aux it. 1371-1380. Rien à corriger.
- 2026-11-15 (it. 1380) : i18n-names sur les noms de la nuit (Lucane, Source de vie, Jour du sang, Encens de chasse),
  aussi en russe et polonais : aucun écart. Ménage : dix imports devenus inutiles retirés (game.js BAG_SIZE et PETS,
  strip.js RARITIES, et des fonctions de format dans panel, map, pets, settings, shop, skills). Autotest 228/228.
- 2026-11-15 (it. 1379, contrôle) : succès « Toutes les bénédictions du jour » calculé sur DAY_MOD_KEYS, sans nombre
  écrit. hero-table 12 h (graine 3) après le Lucane, la Source de vie et le Jour du sang : moyenne 63,6 (repère 63,7),
  mage 58 → guerrier 69 (bruit d'une graine, ±4 par héros). Rien à corriger.
- 2026-11-15 (it. 1378) : 14e bénédiction du jour, le Jour du sang 🩸 (+5 % de vol de vie, +25 % de dégâts critiques :
  aucune ne touchait ces statistiques), ajoutée à la FIN. Calendrier vérifié du 14 au 30/11 : seul le 28 change
  (trésors → sang), aujourd'hui, demain et les jours figés intacts. Le test « dernier ajout » reconstruisait le
  calendrier sans le sel du rang 12 (DAY_MOD_SALT, maintenant exporté) : corrigé. Réplique du héros, 10 langues,
  README, « Quoi de neuf » 80, devlog. Autotest 228/228, lang-overflow propre, fuzz sous cette bénédiction 0 bloquée.
- 2026-11-15 (it. 1377, contrôle) : succès « Chasseur d'événements » après la Source de vie : calculé sur EVENTS,
  sans nombre écrit (déjà obtenu : acquis). max-save remplit bien 17 événements et 19 familiers ; --crawl en français
  sur cet état : 705 clics sans erreur.
- 2026-11-15 (it. 1376) : Source de vie : halo vert menthe derrière le héros pendant l'événement (dégradé radial
  fixe, comme ceux de la Marée arcanique et du Voile protecteur : aucune animation CSS). Vu en capture avec la
  bannière et la pastille « Source de vie 29 s ». Autotest 228/228.
- 2026-11-15 (it. 1375) : 17e événement rare, la Source de vie (0,2 % par victoire, 30 s) : le héros regagne 4 % de ses
  PV max par seconde (SPRING), en marche comme en combat ; aucun événement ne soignait, un appui contre un boss
  coriace. Ajouté à la FIN de EVENTS ; réplique du héros, son (montée douce), test (soin mesuré, texte fidèle),
  10 langues, page Steam 16 → 17 dans les 10 langues, dossiers de presse (dépôt et Médias), checklist, README,
  « Quoi de neuf » 79, devlog. Écarté avant : une 16e capacité de boss (ORDER modulo : aurait changé les capacités de
  tous les boss existants). Autotest 228/228, fuzz 0 bloquée, guerrier 12 h 67, lang-overflow propre.
- 2026-11-15 (it. 1374) : scripts/i18n-names.mjs (balayage des it. 1372-1373, deux vraies fautes trouvées) gardé
  dans le dépôt, à lancer à la main (faux positifs grammaticaux : hors npm test) ; CLAUDE.md. Vérifié : « Berserker »
  est « バーサーカー » en japonais pour la classe, la panoplie et ses objets.
- 2026-11-15 (it. 1373) : même balayage pour les affixes d'élites, panoplies, reliques, constellations, atelier et
  coffres : 25 écarts, presque tous grammaticaux (génitifs allemands, « 의 » coréen omis en complément d'objet,
  « Rapide » qui n'est pas le même mot que « Swift as the Wind »). Un vrai : japonais « 狂戦士の怒りの » sur les objets
  de la panoplie « バーサーカーの怒り » (Furie du berserker). Aligné.
- 2026-11-15 (it. 1372) : balayage ponctuel (script hors dépôt) des noms de consommables, événements, familiers,
  déblocages et bénédictions cités dans d'autres textes, en en / de / es / pt / zh / ja / ko : 11 écarts, presque tous
  des déclinaisons allemandes normales ou le nom propre du succès « Ménagerie complète » ; un vrai : coréen « 대장장이
  장인 » pour le déblocage « 대장장이 명인 » (Maître de forge) dans le résumé d'absence. Corrigé.
- 2026-11-15 (it. 1371, revue générale) : 12 h guerrier 67, mage 62, rôdeur 65 (avec le Lucane ; balance jugée bruit
  à la 1364) ; texte extrait en chinois (aucun mot latin) et en allemand (aucun mot français) ; capture Familiers >
  À découvrir en japonais (bonus et « レア » lisibles). Performance mesurée à la 1361, seul un sprite ajouté depuis.
  Rien à corriger.
- 2026-11-15 (it. 1370) : i18n-paths (npm test) vérifie aussi les noms d'onglets cités entre parenthèses (la faute
  « (Chowańce) » de l'it. 1369 passait). Il en a trouvé 6 dans l'annonce des personnages des onglets : japonais
  « タレント » pour 天賦 (Talents), coréen « 재능 » pour 특성, allemand « Aufträge » pour l'onglet « Quests »,
  Bestiaire abrégé en chinois, japonais et coréen (« 图鉴 » pour 怪物图鉴). Corrigés.
- 2026-11-15 (it. 1369) : polonais : les familiers s'appellent partout « pupil » comme l'onglet (« Pupile ») ;
  douze textes disaient « chowaniec », dont « Mama Gałązka (Chowańce) » qui citait l'onglet sous un autre nom
  (quêtes d'expédition, Grand intendant, « À faire », astuces, nouveautés). Gardé : « Cienisty chowaniec », nœud du
  grand graphe des serviteurs (créature magique, pas un familier du jeu). Autres langues vérifiées : un seul terme.
- 2026-11-15 (it. 1368) : « Quoi de neuf », édition 78 : bonus des familiers à découvrir (it. 1366), chemin
  « Familiers > À découvrir » tel que traduit ; allemand de l'édition 77 aligné (« Begleiter », pas « Haustier »,
  comme l'onglet) ; README.
- 2026-11-15 (it. 1367, contrôle) : « ??? » du Bestiaire (événements, bénédictions, pouvoirs) gardés : la découverte
  y est le but (contrairement aux familiers, it. 1366, où le bonus est un objectif). Textes promotionnels : aucun nombre
  de familiers cité. Pourcentages construits à la main hors unit() : seulement des largeurs CSS. Rien à corriger.
- 2026-11-15 (it. 1366) : Familiers > À découvrir : chaque familier pas encore trouvé garde son nom secret (« ??? »)
  mais montre son bonus au niveau 1 (« +3 % dégâts contre les boss ») et « Rare » s'il l'est : un but concret pour les
  œufs. Vu en capture ; autotest 228/228, lang-overflow propre (la sous-section est mesurée).
- 2026-11-15 (it. 1365) : succès « Ménagerie complète » après le Lucane : calculé sur la liste (PETS), sans nombre
  écrit dans ses textes ni sur Steam ; un succès déjà obtenu reste acquis. CLAUDE.md : astuces --stage (console.warn),
  s.last pour les captures d'effets, et save-fuzz « sans fin » qui peut n'être qu'une lenteur (it. 1335, 1340, 1345).
- 2026-11-15 (it. 1364, contrôle) : équilibre après le Lucane : balance 12 h contre 4096b50, graine 7 : 63,2 → 64,6
  (+1,4), graine 3 : 62,3 → 63,0 (+0,7) : bruit (le familier ajouté change aussi le tirage des œufs, donc les
  trajectoires) ; fuzz 1200 parties, 0 bloquée. Rien à corriger.
- 2026-11-15 (it. 1363) : nouveau familier, le Lucane (scarabée brun aux grandes mandibules) : +3 % de dégâts contre
  les boss par niveau (+30 % au niveau 10), le premier familier des chasseurs de boss. Sprite à deux images (vu sur la
  bande et dans l'onglet), 10 langues (« Pupile » en polonais comme ailleurs), test, README (19 familiers),
  « Quoi de neuf » 77 (avec les pluriels des it. 1353-1359), devlog. Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1362) : Boutique : la durée affichée sous un élixir inactif vient de sa constante (c.duration ;
  « 10 min » écrit en dur). Même rendu aujourd'hui, mais un consommable d'une autre durée ne mentira plus.
- 2026-11-15 (it. 1361, revue générale) : après la série des pluriels : --perf (copie neuve) bande 19,2 %, panneau
  20,9 %, mini 6,6 %, icône 0,6 % ; --crawl en russe sur l'état maximal 725 clics sans erreur ; lang-overflow des
  10 langues (avec fin de partie, 130 % et état maximal) : aucun défilement ni mot coupé. Équilibre non touché
  depuis la revue 1351. Rien à corriger.
- 2026-11-15 (it. 1360, contrôle) : début de partie après les changements de la nuit : premières récompenses
  (first-minutes, 3 graines) objet 52-79 s, boss 76-79 s, niveau 16 vers 13-15 min ; onglets (tab-pace) Talents 1 min,
  Quêtes 5, Boutique 8-9, Héros 10, Carte 12, Bestiaire 14-15. Inchangé.
- 2026-11-15 (it. 1359) : fin de la série des pluriels (1355-1359) : Ascension « +N éclats » accordé (« +22 осколка »,
  « +22 odłamki »). Laissés tels quels, vérifiés : seuils des Talents (30, 40, 0, 5, 10, 20) et éclats de la zone
  minimale (14), tous de la forme « many » en russe et polonais ; astuce du héros bloqué et total des éclats déjà
  tournés sans accord par les traducteurs (« звёздных осколков: {0} »).
- 2026-11-15 (it. 1358) : messages d'ascension accordés : journal (« +22 звёздных осколка и +1 постоянное очко
  навыков » ; en français aussi, « +1 point de compétence permanent » au lieu de « +1 points … permanents »), bannière
  de la bande et du mini (« Вознесение № 4! +2 звёздных осколка ») et Astrolabe. Le message du journal est composé de
  deux morceaux accordés chacun. Autotest 228/228.
- 2026-11-15 (it. 1357) : suite des pluriels : « Récupérer N expéditions » (Familiers ; « Забрать 2 экспедиции »,
  « Odbierz 2 wyprawy ») et l'alerte « Ton héros bloque en zone Z (N défaites) » (« 3 поражения », « 3 porażki »)
  accordés. Bestiaire « {0} victoires » laissé : paliers 10 / 100 / 1 000 / 10 000, même forme partout.
- 2026-11-15 (it. 1356) : intitulés des quêtes accordés dans toutes les langues : « Vaincre N monstres / élites »,
  « Créer N objets par transmutation » (russe « Победи 3 элиты » / « 5 элит », polonais « Pokonaj 24 potwory » ;
  avant, un mot fixe ou un contournement « Победи элит: 3 »). txn à 3 formes ; le français reste identique ; plural()
  devenue inutile retirée. Autotest 228/228, lang-overflow ru, pl propre.
- 2026-11-15 (it. 1355) : pluriels russes et polonais justes pour deux nombres écrits devant un mot fixe : taille du
  sac (Boutique > Atelier, 12 à 48 places : « 24 ячеек » → « 24 ячейки », « 42 miejsc » → « 42 miejsca ») et nombre
  de nœuds de la fleur (« 144 узлов » → « 144 узла », « 144 węzłów » → « 144 węzły »). txn avec 3 formes ; recherche
  des gabarits `${n} ${tx("…")}` : c'étaient les deux seuls à nombre variable. Autotest 228/228, lang-overflow ru, pl
  propre.
- 2026-11-15 (it. 1354) : stock de potions plafonné par POTION_MAX partout (trois « 20 » écrits en dur dans game.js :
  potion du coffre, récompense d'événement, constellation) : un changement du stock maximal ne laissera plus de trou.
  Recherche des autres valeurs en dur du même genre (7200, 600) : aucune autre.
- 2026-11-15 (it. 1353) : résumé d'absence au journal : « 1 monstre vaincu » au singulier (avant « 1 monstres
  vaincus » ; clé accordée existante, 3 formes en russe et polonais) et virgule de la langue après (« 、 » en japonais
  et chinois, au lieu d'une virgule en dur dans la traduction). Recherche des autres nombres collés à un pluriel
  fixe : c'était le seul. Test (ancien code : « During 1 min: 1 monsters defeated »).
- 2026-11-15 (it. 1352) : récompense de quête au journal : elle nomme le vrai consommable gagné (« Parchemin de
  fortune · 10 min » ; avant, toujours « élixir de 10 min », même pour un parchemin ou un trèfle) et accorde les
  éclats (« 1 éclat », avant « 1 éclats »). Durée, plafond et stock lus dans shop.js (écrits en dur) ; un consommable
  inconnu (autre version) ne bloque pas la réclamation. Test (ancien code : « 10-min elixir, 1 star shards »).
- 2026-11-15 (it. 1351, revue générale) : après les effets comptés hors ligne (1348-1349) : 12 h guerrier 65, mage 60,
  rôdeur 65 ; joueur absent (IDLE=1) 16 à 12 h (repère 16) ; fuzz 1200 parties, 0 bloquée ; texte extrait en coréen
  (aucun mot latin hors HP / Lv voulus) et en polonais (aucun mot français). Performance mesurée à la 1341, rien depuis
  qui touche le rendu sauf la bulle du mini (texte). Rien à corriger.
- 2026-11-15 (it. 1350) : « Quoi de neuf », édition 76 : effets comptés pendant l'absence (it. 1348-1349) et
  « Dépenser automatiquement » du grand graphe sans gel (it. 1345) ; libellé cité tel que le bouton (i18n-quotes ok),
  noms des consommables tels que traduits ; ligne au brouillon du devlog. Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1349) : absence, suite de la 1348 : la Potion de célérité (marche plus rapide entre deux combats)
  et le Trèfle à quatre feuilles (plus d'objets) comptent aussi hors ligne, au prorata de leur durée ; ils étaient
  ignorés. Le Tonique de fer reste hors du calcul (il ne joue que sur l'estimation de survie, grossière). Test étendu.
- 2026-11-15 (it. 1348) : absence : les parchemins de fortune et de savoir comptent enfin. Leur part de durée était
  lue APRÈS avoir retiré l'absence aux durées : un parchemin de 10 min valait 0 pendant une heure d'absence, et ceux
  de l'Herboriste perpétuel (achetés pour couvrir toute l'absence) ≈ 60 s seulement (+50 % d'or et d'expérience
  presque perdus chaque nuit). Parts figées avant ; valeurs lues dans BUFF_EFFECTS (écrites en dur). L'Encens de
  chasse compte aussi hors ligne (élites au prorata). Test (ancien code : 746 → 746 d'or avec ou sans parchemin).
- 2026-11-15 (it. 1347, contrôle) : actions en un clic chronométrées sur la fin de partie (autoEquip, sellUseless,
  transmute, autoSpendTalents, todoNow…) : toutes sous 5 ms au premier appel, todoNow 0,13 ms ensuite (appelé par le
  mini à chaque gain d'or), autoEquip 1,2 ms. Aucun autre gel du genre de l'it. 1345.
- 2026-11-15 (it. 1346, contrôle) : suite de l'it. 1345, autres lenteurs du même genre cherchées. Onglet Compétences :
  618 appels de canTakeGraph par rafraîchissement ≈ 1,5 ms (graphSpendable déjà en cache) : rien à faire. Boucle de
  jeu sur la fin de partie (profil --cpu-prof, 20 000 pas ≈ 11 min de jeu) : ≈ 200 ms de calcul au total, castSpells
  et step en tête : négligeable. Rien à corriger.
- 2026-11-15 (it. 1345) : « tout dépenser » dans le grand graphe 10 fois plus rapide : sur la partie de fin de partie,
  258 nœuds pris en ≈ 400 ms (jeu figé le temps du clic, ou d'une montée de niveau avec dépense automatique) → 40 ms.
  nextGraphNode testait les 618 nœuds en recalculant à chaque fois les points libres (effets des constellations) et
  l'ensemble des nœuds pris : maintenant une fois par recherche. Mêmes nœuds dans le même ordre (comparé à l'ancien
  code, dev et fin de partie). Trouvé par save-fuzz FUZZ_BASE=fin qui ne finissait plus en 400 s (cru d'abord une
  boucle sans fin : c'était cette lenteur, 1 190 fois) ; maintenant 49 s, ok sur les trois bases.
- 2026-11-15 (it. 1344) : quêtes d'élites (« Vaincre N élites », proies) en cours : au survol de la carte, l'astuce
  « l'Encens de chasse de la Boutique attire deux fois plus d'élites » (une fois la Boutique ouverte ; la carte ne
  grandit pas). Vérifié par --stage : présente sur la quête en cours, absente sur la quête accomplie et les autres.
- 2026-11-15 (it. 1343) : mode mini : sa bulle (survol de la zone d'infos) dit aussi les effets en cours, avec les
  minutes restantes (« Effets en cours : Élixir de force 12 min et Encens de chasse 50 min »), après la bénédiction
  du jour. Vérifié en français et en japonais (lecture de la bulle par --stage).
- 2026-11-15 (it. 1342) : « Quoi de neuf », édition 75 : les icônes des effets actifs sur la bande ; traduite (« la
  bande » comme ailleurs : Streifen, 长条…) ; ligne au brouillon du devlog 0.1.4. Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1341, revue générale) : 12 h guerrier 65, mage 60, rôdeur 65 (inchangés) ; --perf sur une copie
  neuve de dev-data : bande 19,5 %, panneau 20,9 %, mini 6,7 %, icône 0,5 % (icônes des effets actifs sans coût
  visible) ; texte extrait en russe et en japonais (toutes sous-sections et bulles) : aucun mot non traduit ; captures
  Boutique en japonais (encens et élixir actifs) et mode mini en anglais : propres. Rien à corriger.
- 2026-11-15 (it. 1340) : la bande montre les élixirs, parchemins et l'Encens de chasse actifs : une petite icône
  chacun devant l'or (4 au plus, sinon 3 et « +N »), dans le canevas du haut à droite, redessiné seulement quand la
  liste change (aucun coût par image). Avant, il fallait ouvrir le panneau pour savoir ce qui était actif. Vu en
  français à 1920 px et en allemand à 1280 px (2 et 6 effets). Astuce de capture : dans une copie de sauvegarde, régler
  `s.last = Date.now()`, sinon l'absence simulée épuise les effets avant l'image.
- 2026-11-15 (it. 1339, contrôle) : --crawl réparé, sur l'état « tout au maximum » (max-save) dans 8 langues (en, de,
  es, pt, pl, ja, zh, ko ; fr et ru faits à la 1338) : 706-724 clics chacune, aucune erreur.
- 2026-11-15 (it. 1338) : --crawl réparé (il manquait l'achat de l'Encens de chasse, it. 1337). Trois défauts : il lisait
  la liste des boutons d'avance, et un clic qui redessine l'onglet (achat) détachait les suivants, « cliqués » sans
  effet mais marqués vus ; le bouton du PNJ, nommé par sa réplique (qui change), redessinait l'onglet à chaque passe ;
  les sous-onglets étaient cliqués comme les autres boutons, donc le parcours finissait sur la dernière sous-section
  (Boutique > Marchand jamais parcouru). Maintenant : chaque sous-section tour à tour, un bouton à la fois, page relue
  après chaque clic. Vrais clics : ≈ 254 → 691 (22 s). Aucune erreur en français et en russe (dev et fin de partie).
- 2026-11-15 (it. 1337, contrôle) : Encens de chasse en russe à 1280 px, actif (« активен · 11 мин 11 ») : la grille
  4 × 2 tient. --crawl en russe : 388 clics sans erreur (il n'avait pas cliqué l'encens : achat vérifié à part par un
  --stage, clic sur le bouton → 600 s d'effet).
- 2026-11-15 (it. 1336) : nouveau consommable, l'Encens de chasse (boutique, 8e tuile : la grille passe à 4 × 2) :
  +100 % d'élites pendant 10 min (cumulable 2 h), plus de risque et plus de butin ; utile pour la quête et les succès
  d'élites et pour compléter le Bestiaire des élites. Jamais racheté par l'Herboriste perpétuel (`manual`, en jeu comme
  pendant une absence) : le risque reste un choix. Icône d'encensoir, 10 langues, test, « Quoi de neuf » 74, devlog.
  Le joueur simulé ne l'achète pas : équilibre inchangé. Autotest 228/228, lang-overflow propre.
- 2026-11-15 (it. 1335, contrôle) : élite Venimeux enfin vue à l'image (mise en scène --stage : toute la file venimeuse,
  copie de dev-data) : étiquette verte « Venimeux », deux empoisonnements en 20 s (PV qui baissent sans achever),
  halo vert du héros (juice.js) et « Empoisonné ! ». Conforme ; rien à corriger. Astuce : dans un --stage, écrire
  avec console.warn (seuls avertissements et erreurs de la page remontent dans la console).
- 2026-11-15 (it. 1334, contrôle) : passage à minuit : npm test 291/291 avec la date réelle du 15 ; calendrier tenu
  (15 fureur, 16 trésor, 17 gobelins, comme annoncé avant l'ajout du Jour de l'élan).
- 2026-11-15 (it. 1333, contrôle) : --crawl en français sur une copie de dev-data : 387 clics, aucune erreur ;
  ~/.config/Sillwalker toujours absent.
- 2026-11-14 (it. 1332) : taille de la sauvegarde remesurée pour le quota Steam Cloud (1 Mo) : dev 17,6 Ko, fin de partie
  22,8 Ko, pire cas « tout au maximum » 28,3 Ko (it. 963 : 17 / 21 Ko) ; checklist mise à jour, marge toujours large.
  Vérifié aussi : npm test 17 s (le test « aucune nouvelle partie bloquée » en prend 11,8, gardé : garde-fou utile).
- 2026-11-14 (it. 1331, revue générale) : après la Rafale de vent corrigée (vitesse doublée) : 12 h 65 / 60 / 65 ;
  semaine guerrier 350 / 350 / 349 (repère 350) ; fuzz 1200 parties, 0 bloquée. Performance et langues mesurées à la
  1321, rien depuis qui les touche. Rien à corriger.
- 2026-11-14 (it. 1330) : brouillon du devlog 0.1.4 : Rafale de vent et Fête des gobelins (éditions jusqu'à 73).
- 2026-11-14 (it. 1329) : « Quoi de neuf », édition 73 : Rafale de vent qui double vraiment la vitesse, bonus d'or de
  la Fête des gobelins annoncé ; traduite (noms d'événement et de bénédiction tels que traduits). Autotest 228/228.
- 2026-11-14 (it. 1328) : descriptions chiffrées des déblocages comparées au code : Forge « +1 à +10 » = MAX_PLUS
  (test ajouté), Transmutation « 3 objets » = lots de 3, Grimoire « un dixième de ton or » = S.gold × 0,1 ; tout juste.
  Fin de la série de vérifications « ce qui est annoncé = ce qui se passe » (it. 1322-1328 : un vrai défaut, la Rafale
  de vent, un oubli, l'or de la Fête des gobelins, et mon erreur du Jour de l'élan).
- 2026-11-14 (it. 1327) : test : les effets des quatre reliques suivent RELIC_POWER et DRONE (missile 1,5 s, 1,5 % /
  0,4 %, 300 % ; −45 % et 1 %/s ; ×2,5 ; doublés et +50 % d'or) ; tous justes.
- 2026-11-14 (it. 1326) : test : les descriptions des consommables suivent leurs constantes (potion : seuil 30 %, soin
  50 %, stock 20 ; élixirs : effets de BUFF_EFFECTS, 10 min, cumul 2 h) ; tous justes.
- 2026-11-14 (it. 1325) : les multiplicateurs annoncés par les événements rares comparés au code : la Rafale de vent
  promettait « Vitesse de déplacement ×2 » mais ajoutait +100 % (moveMul : 1 + permanent + 1) ; en fin de partie
  (+174 % permanents), ×1,37 seulement. Elle double maintenant vraiment la vitesse. Les autres sont fidèles (Pluie d'or
  ×3, Frénésie ×2, Sagesse ×3, Voile ½, Marée arcanique ×2, Zèle ×2, Lune pâle ½). Test ; autotest 228/228.
- 2026-11-14 (it. 1324) : test : les chiffres des descriptions des capacités de boss suivent leurs constantes (Peau de
  pierre, Fureur croissante, Crachat venimeux, Tenace, Malédiction, Écailles) ; tous justes.
- 2026-11-14 (it. 1323) : test, suite de l'it. 1322 : les paramètres chiffrés de chaque élite (PV, attaque,
  régénération, épines, esquive) figurent dans sa description ; les 9 sont justes.
- 2026-11-14 (it. 1322, défaut corrigé) : le Jour de l'élan (it. 1314) avait firstStrike: 100, or cet effet s'exprime en
  fraction (×100 à l'affichage ; game.js : dmg *= 1 + firstStrike) : premier coup ×101 au lieu de ×2 ce jour-là.
  Corrigé (firstStrike: 1). Nouveau test : les nombres de l'effet réel de chaque bénédiction (describeEffects) doivent
  figurer dans sa description ; il a aussitôt trouvé un défaut ancien : la Fête des gobelins donnait +15 % d'or sans
  le dire (« Gobelins voleurs ×4. » → « …, +15 % d'or. », traduit). bossDmg (Jour des géants) vérifié : en %, juste.
  Autotest 228/228 ; lang-overflow propre. Le Jour de l'élan ne tombe pas avant fin novembre : aucun joueur touché.
- 2026-11-14 (it. 1321, revue générale) : performance bande 19,4 %, panneau 20,2 %, mini 6,8 %, icône 0,6 % (stable) ;
  lang-overflow complet (avec l'état maximal) : propre ; ~/.config/Sillwalker absent (garde-fou de l'it. 1318). Équilibre
  (it. 1311, trois graines) et début de partie (it. 1319) récents. Rien à corriger.
- 2026-11-14 (it. 1320) : totaux du README et de la checklist Steam comparés au jeu (68 succès, 18 familiers, 9 élites,
  16 événements, 13 bénédictions, 17 quêtes) : la checklist annonçait encore « Succès : 67 » (ligne de l'état fait,
  oubliée à l'it. 1266). Corrigé ; test : les deux nombres de succès de la checklist suivent ACHIEVEMENTS.
- 2026-11-14 (it. 1319, contrôle) : début de partie après le Venimeux (élites dès la zone 3) : early-pace 2 / 7 / 17 /
  35 / 69 / 120 objets, zone 23 et 6,3 déblocages à 60 min (it. 1240 : 114, zone 23, 6) ; first-minutes : premier
  boss à 76-79 s. Aucun ralentissement. (Capture du Venimeux tentée sans succès : la file modifiée après coup
  n'affiche pas les étiquettes ; comportement couvert par le test logique.)
- 2026-11-14 (it. 1318) : garde-fou après l'incident de l'it. 1317 : un lancement --ghost (tests seulement, jamais un
  joueur) sans --user-data part d'un dossier temporaire neuf (main.js, message « [dev] --ghost sans --user-data ») au
  lieu du dossier de sauvegarde par défaut. Vérifié : ~/.config/Sillwalker n'est plus créé. Aucun script du dépôt ne
  lançait --ghost sans --user-data. CLAUDE.md. Autotest 228/228.
- 2026-11-14 (it. 1317, incident corrigé) : deux captures lancées SANS --user-data (oubli dans la commande) : le jeu a
  créé ~/.config/Sillwalker (compte claude du serveur ; partie neuve de 2 Ko, tous les fichiers datés de 22:55-22:56,
  rien de plus ancien : le dossier n'existait pas). Supprimé aussitôt, comme à l'it. 1144 ; la sauvegarde de Victor
  (sous Windows, et /home/victor ici) n'a jamais été concernée ; dev-data intact (zone 56). Vérifié aussi : aucune
  injection TEMP laissée dans le dépôt. Leçon : toute commande electron de capture porte --user-data=<copie>.
- 2026-11-14 (it. 1316, contrôle) : après le Venimeux et la 13e bénédiction : save-fuzz ok (dev 1211, fin 1190
  corruptions) ; fuzz avec toutes les bénédictions (FUZZ_DAYMOD=all) : 1200 parties, 0 bloquée.
- 2026-11-14 (it. 1315) : « Quoi de neuf », édition 72 : Jour de l'élan ; traduite. Brouillon du devlog 0.1.4 : quatre
  nouvelles bénédictions. Autotest 228/228 ; lang-overflow propre.
- 2026-11-14 (it. 1314) : 13e bénédiction du jour, « Jour de l'élan » (💨, +100 % de dégâts du premier coup et des
  coups au clic : le joueur présent récompensé). Ajoutée à la fin, mais le tirage réservoir lui donnait… le 14/11/2026,
  aujourd'hui (le Jour du rempart aurait changé en pleine journée chez Victor) : sel propre à ce rang (DAY_MOD_SALT,
  « #2 ») qui épargne le 14 au 21 novembre ; 18 jours sur 336 en 2027 (≈ 1 / 13). Test qui fige les jours déjà annoncés
  (14-17/11). Réplique, traduite ; README ; CLAUDE.md (piège). Autotest 228/228 ; lang-overflow propre.
- 2026-11-14 (it. 1313, contrôle) : --crawl en russe sur l'état maximal après l'Écho des lames et le Venimeux :
  557 clics, aucune erreur.
- 2026-11-14 (it. 1312) : brouillon du devlog 0.1.4 : élite Venimeux ajoutée (éditions jusqu'à 71).
- 2026-11-14 (it. 1311, revue générale) : 12 h 65 / 59 / 65 ; 20 héros (hero-table) 63,5 de moyenne. Le mage à 59
  deux revues de suite : balance contre b4871a2 (avant tous les ajouts de l'après-midi) sur trois graines (3, 11,
  21) : moyenne générale 63,4 → 63,4 ; mage 62 / 61 / 62 → 62 / 61 / 59 (−1 en moyenne : bruit, ±4 par héros et par
  graine). Rien à régler.
- 2026-11-14 (it. 1310) : « Quoi de neuf », édition 71 : élite Venimeux ; traduite. Autotest 228/228.
- 2026-11-14 (it. 1309) : 9e sorte d'élite, « Venimeux » : 20 % de chances par coup d'empoisonner le héros avec le
  venin des boss (3 % de ses PV max par seconde, 4 s, raccourci par la pureté, n'achève jamais ; halo vert existant).
  Le venin ne s'écoulait que dans bossTick : il s'écoule maintenant aussi hors boss. Traduit ; comptes 8 → 9 dans
  store-page (10 langues), README, checklist. Test (empoisonné, PV ≥ 1). fuzz 1200 parties sans blocage ; balance
  12 h : +1,0 (bruit) ; autotest 228/228 ; lang-overflow propre.
- 2026-11-14 (it. 1308) : brouillon du devlog 0.1.4 complété (éditions jusqu'à 70) : Écho des lames, Jour des géants
  (+50 % contre les boss), titre revu ; toujours non publié.
- 2026-11-14 (it. 1307, contrôle) : balance 12 h contre dbb35c4 (avant l'Écho des lames) : 63,7 → 63,4 sur les 10
  classes (bruit ; ±1,5). L'événement (0,2 % par victoire, 30 s) ne déplace pas la progression.
- 2026-11-14 (it. 1306) : nouveau contrôle de npm test, scripts/i18n-paths.mjs : un chemin « Onglet > Sous-section »
  cité sans guillemets (Quoi de neuf, aides) doit reprendre les libellés tels que traduits dans le jeu (i18n-quotes
  ne voit que les « … »). Il a trouvé 4 écarts dans d'anciennes éditions : « 图鉴 / 図鑑 / 도감 > … » au lieu de
  « 怪物图鉴 / モンスター図鑑 / 몬스터 도감 », « 설정 > 사운드 » au lieu de « 설정 > 소리 » ; traductions alignées (le texte
  français des éditions publiées est inchangé). 9 chemins, 0 écart. CLAUDE.md.
- 2026-11-14 (it. 1305) : « Quoi de neuf », édition 70 : Écho des lames, étiquettes aujourd'hui / demain du Bestiaire ;
  traduite, noms de l'onglet et de la sous-section repris tels que traduits dans le jeu (« Segen des Tages »,
  « 怪物图鉴 », « 몬스터 도감 > 오늘의 축복들 » : vérifiés un par un ; i18n-quotes ne contrôle que les libellés entre
  guillemets). Autotest 228/228 ; lang-overflow propre.
- 2026-11-14 (it. 1304) : 16e événement rare, « Écho des lames » (30 s, 0,2 %) : chaque coup du héros frappe deux
  fois (la frappe double garantie ; le tirage habituel reste fait : même suite de hasard hors événement). Ajouté à la
  FIN d'EVENTS. Réplique, son (deux lames qui sifflent ; rendu par l'autotest qui suit maintenant la liste du jeu),
  traduit ; comptes 15 → 16 dans store-page (10 langues), dossiers de presse (dépôt et partage), README, checklist
  Steam. Test (≥ 1,8 fois plus de coups). fuzz 1200 parties sans blocage ; autotest 228/228 ; lang-overflow propre.
- 2026-11-14 (it. 1303) : test : chaque succès a son icône choisie dans achicons.html et ses deux PNG
  (steam/achievement-icons, couleur et grisée) ; avant, un oubli ne se voyait qu'en relançant achicons.js (it. 1266 :
  un dessin inexistant y avait été signalé). Les 68 sont complets. Série des it. 1299-1303 : réplique de chaque
  bénédiction, icône et poids de chaque quête, son de chaque événement, icône de chaque succès vérifiés par npm test.
- 2026-11-14 (it. 1302) : sons des événements rares : l'autotest rendait une liste écrite à la main (il fallait y
  ajouter chaque nouvel événement, fait pour la Lune pâle à l'it. 1242) ; il prend maintenant EVENTS du jeu. Test :
  chaque événement a son « case » dans sound.js. Autotest 228/228 (« son : tous les sons » ok).
- 2026-11-14 (it. 1301, revue générale) : performance bande 19,2 %, panneau 19,9 %, mini 6,8 %, icône 0,6 % (stable) ;
  texte de l'état maximal en coréen (aucun mot latin) et en allemand (aucun mot français : « des », « Ton » sont
  allemands). Équilibre vérifié à la 1291, langues et crawl sur l'état maximal aux 1286-1295. Rien à corriger.
- 2026-11-14 (it. 1300) : test : chaque sorte de quête a sa propre icône (sinon repli silencieux sur celle des chasses,
  ui/tabs/quests.js) et un poids de tirage (sinon jamais proposée, game/quests.js WEIGHTS) ; vérifié qu'une sorte
  fictive échoue. Les 17 sont complètes.
- 2026-11-14 (it. 1299) : test : chaque bénédiction du jour a sa réplique du héros (dm_<clé> dans strip.js), comme les
  événements rares (it. 982) ; sans elle, say() ignore la liste absente et le héros resterait muet sans que rien ne
  le signale. Les 12 en ont une.
- 2026-11-14 (it. 1298) : brouillon du devlog de la prochaine version (docs/devlog-0.1.4-brouillon.md, anglais et
  français) tiré des éditions « Quoi de neuf » 59 à 69 parues depuis la 0.1.3 : champions (quête, succès, fanfare),
  Lune pâle, Régénérant, trois bénédictions et leur collection, Grenouillette, duo à distance, résumé d'absence.
  Rien de publié : la sortie reste la décision de Victor (marche à suivre en tête du fichier).
- 2026-11-14 (it. 1297) : contrôle d'autotest pour l'it. 1296 : Bestiaire > Bénédictions du jour porte deux étiquettes
  (aujourd'hui, demain) et la bénédiction de demain est dévoilée (2 étiquettes, 10 cartes inconnues) ; indépendant de
  la date (la bénédiction forcée du jour est toujours différente de celle de demain). Autotest 228/228.
- 2026-11-14 (it. 1296) : Bestiaire > Bénédictions du jour : étiquettes « aujourd'hui » et « demain » sur les cartes ;
  celle de demain est dévoilée même jamais vécue (une raison de revenir ; la bulle de la pastille du jour la nommait
  déjà). Traduit ; vérifié en capture (Jour de furie « demain », Jour du rempart « aujourd'hui »). Autotest 227/227 ;
  lang-overflow propre.
- 2026-11-14 (it. 1295, contrôle) : --crawl en japonais sur l'état « tout au maximum » (max-save : toutes les
  collections, compteurs géants) : 557 clics, aucune erreur.
- 2026-11-14 (it. 1294) : recherche d'autres noms ou textes qui citent un nombre dépendant d'une liste qui grandit
  (comme « Dix jours bénis ») : aucun (succès à seuil fixe : cinq ascensions, dix héros, quatre reliques, trois
  échos ; aucun « N sortes / événements… » en dur). « Quoi de neuf », édition 69 : Jour des géants, fanfare du
  champion, succès renommé (libellé cité tel que traduit : i18n-quotes à 0). Autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1293) : succès BLESSINGS_ALL renommé « Toutes les bénédictions du jour » (était « Dix jours bénis »,
  faux depuis la 11e bénédiction ; même API Name). Traduit ; steam/achievements.md régénéré (68 succès). L'édition 63
  de « Quoi de neuf » garde l'ancien nom (éditions publiées jamais modifiées). Pour Victor : dans Steamworks, renommer
  le succès BLESSINGS_ALL s'il était déjà déclaré. Autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1292) : 12e bénédiction du jour, « Jour des géants » (🗿, +50 % de dégâts contre les boss) : le
  jour où l'on franchit un boss coriace ; ajoutée à la FIN (aujourd'hui et les trois jours suivants inchangés,
  vérifié avant / après). Réplique du héros, traduite (« Чем больше шкаф, тем громче падает » en russe…). Le test de
  l'it. 1268 exigeait que les champions soient la dernière bénédiction : remplacé par « 11e, à sa place ». Test
  (+50 de bossDmg). README. Autotest 227/227 ; lang-overflow propre (chaque bénédiction mesurée).
- 2026-11-14 (it. 1291, revue générale) : 12 h simulées 62 / 59 / 60 (une graine) ; balance contre b4871a2 (début de
  l'après-midi, avant Lune pâle, Régénérant, champions, Grenouillette) : 63,8 → 63,7 sur les 10 classes (bruit).
  Mode mini en chinois avec la Grenouillette : correct. Performance (it. 1281) et langues (it. 1286-1287) récentes.
- 2026-11-14 (it. 1290) : son d'un champion vaincu : quatre pièces (élite : trois, boss : cinq) et une petite fanfare
  montante (sol, do, mi, triangle, plus douce que le boss et le légendaire) ; avant, il sonnait comme une élite.
  Ajouté au rendu hors ligne de l'autotest (« son : tous les sons » : sans erreur, NaN ni saturation) ; 227/227.
- 2026-11-14 (it. 1289, contrôle) : mémoire dans la durée (mem-watch, 6 min à ×10) après les ajouts du jour (« +N » du
  Régénérant, ciel de la Lune pâle, Grenouillette) : 495-515 Mo réels, sans dérive (repère 485-530). Vérifié aussi :
  la récompense du jour se réclame déjà seule au lancement (pas de déblocage à créer de ce côté).
- 2026-11-14 (it. 1288, contrôle) : save-fuzz après la quête de champion, la Grenouillette et le Jour des champions :
  dev 1211, fin de partie 1190, version 0.1.2 1134 corruptions : ok sur les trois bases.
- 2026-11-14 (it. 1287, contrôle) : texte de l'état « tout au maximum » (max-save complété à l'it. 1285 ; toutes
  sous-sections et bulles, it. 1252) en russe et en japonais (≈ 19 500 lignes chacun) : aucun mot non traduit.
- 2026-11-14 (it. 1286) : lang-overflow mesure aussi l'état « tout au maximum » (max-save) à 1920 et 1280 px dans
  chaque langue (« xx max 1920 », NO_MAX=1 pour sauter) : le défaut russe de l'it. 1285 n'apparaissait dans aucune
  autre mesure. Passe complète : 10 langues propres. CLAUDE.md.
- 2026-11-14 (it. 1285) : scripts/max-save.mjs (état « tout au maximum ») complété : tous les familiers (18, niveau
  10), toutes les sortes d'élites, tous les événements, toutes les bénédictions vécues, compteurs à 5-6 chiffres
  (champions, élites) ; il en ignorait plusieurs (17 familiers, 7 élites, 0 bénédiction). Mesuré ensuite dans les
  10 langues à 1920 et 1280 px : en russe à 1920 px, les Statistiques défilaient de 4 px (défaut antérieur, déjà là
  avec l'ancien max-save) : deux libellés passaient sur deux lignes, raccourcis (« Самый дальний побеждённый босс »
  → « Дальний побеждённый босс », « Засчитанное офлайн-время » → « Офлайн-время (зачтено) »). Ensuite : 10 langues
  propres aux deux largeurs. Autotest 227/227.
- 2026-11-14 (it. 1284) : « Quoi de neuf », édition 68 : Grenouillette, réplique du champion vaincu, champions dans
  le résumé d'absence ; traduite (noms repris tels que traduits). Autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1283) : chasse aux pluriels en dur (suite de « les 1 familiers », it. 1282) : relevé des tx() dont
  le nombre précède un nom au pluriel (30 cas) ; la plupart ne voient jamais 1 (objectifs ≥ 2, paliers, constellations
  par pas de 2, « Récupérer {0} expéditions » affiché seulement au-delà de 1). Corrigé : « {0} potions » des
  récompenses de quête (carte et journal ; les quêtes de critiques et de sorts donnent 1 potion) → txn « {n} potion »
  (3 formes en ru et pl). Test (« 1 potion » au singulier) ; autotest 227/227.
- 2026-11-14 (it. 1282) : 18e familier, la Grenouillette (clin d'œil à Mirette, la grenouille marchande) : +2 %
  d'élites rencontrées par niveau (20 % au niveau 10, comme l'Appât des champions) ; dessin pixel (art.js PET_ART,
  deux images : posée, en l'air), ajoutée à la FIN de PETS ; traduite. Test : chaque familier a son dessin, images de
  largeur égale. Vérifié en capture (carte niv. 3 : +6 % ; elle suit le héros sur la bande). README : « 14
  compagnons » corrigé en 18 (il en comptait 14 depuis longtemps, il y en avait 17). Vu sur la même capture et
  corrigé : « Envoyer les 1 familiers libres » (pluriel en dur) → txn (« Envoyer le familier libre », 3 formes en
  ru et pl). Autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1281, revue générale) : performance bande 18,8 %, panneau 20,0 %, mini 6,6 %, icône 0,5 %
  (inchangé) ; bande en anglais (partie de fin) : correcte. Équilibrage déjà vérifié dans la décennie (12 h des 20
  héros it. 1267, semaine it. 1280), langues (extraction complète it. 1253 et 1271, lang-overflow it. 1276), crawl
  (pl, it. 1274), fuzz avec bénédictions (it. 1278). Rien à corriger.
- 2026-11-14 (it. 1280, contrôle) : une semaine simulée (simulate.js 168) après les ajouts du jour (Régénérant, Lune
  pâle, quête et Jour des champions) : dernières courses guerrier 350 / 349 / 350 / 349, mage 338 / 349 / 350 / 349 ;
  repère it. 1115 : 350 / 349 : inchangé ; panoplies 10 et 9 sur 10. Piège noté : une boucle d'attente
  « while pgrep -f "simulate.js 168" » se trouve elle-même (sa propre ligne de commande contient le motif) et ne
  finit jamais : attendre les processus par leur PID.
- 2026-11-14 (it. 1279) : README : le Jour des champions dans la liste des bénédictions (quête de champion, Régénérant,
  Lune pâle et le succès y étaient déjà).
- 2026-11-14 (it. 1278) : fuzz.mjs : option FUZZ_DAYMOD=<clé|all> (bénédiction du jour active ; all : une par
  graine) : les bénédictions changent la file (élites ×3, gobelins ×4, champions ×4) et le fuzz ne les essayait
  jamais. Vérifié qu'elle agit (30 parties de 20 min : 21 champions avec le Jour des champions, 9 sans). Résultats :
  sans bénédiction, avec le Jour des champions, avec toutes : 1200 parties chacun, 0 bloquée. CLAUDE.md.
- 2026-11-14 (it. 1277) : un champion vaincu (rare : ≈ 1 monstre sur 200) a sa réplique du héros sur la bande
  (« Un champion de moins ! », « À genoux, champion ! » ; strip.js SPEECH.champion, au moment où l'écran tremble).
  Traduites. Autotest 227/227.
- 2026-11-14 (it. 1276) : résumé d'absence (détail) : ligne « Champions vaincus » quand des champions sont tombés
  pendant l'absence (comptés depuis l'it. 1262 mais pas montrés ; clé existante, déjà traduite). Pire cas de
  l'autotest complété (champions: 3) ; test : le résumé compte autant de champions que la quête en a reçu.
  Autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1275, contrôle) : ouverture des onglets (tab-pace, 3 graines) après les ajouts du jour : talents
  1 min, quêtes 5, boutique 8-9, Héros 10, carte 12, bestiaire 14-15, ascension 23-36 : dans les repères.
- 2026-11-14 (it. 1274, contrôle) : --crawl en polonais sur la partie de fin, Jour des champions actif, quête de
  champion 3 étoiles, élite Régénérant vue : 502 clics, aucune erreur.
- 2026-11-14 (it. 1273) : Jour des champions en tout début de partie (zone < 5, première course) : sa bulle précise
  « Les champions apparaissent à partir de la zone 5. », comme la Grande chasse pour les élites (it. 957). Traduit ;
  vérifié dans le jeu (zone 2 : la ligne s'ajoute à la bulle). Autotest 227/227.
- 2026-11-14 (it. 1272) : « Quoi de neuf », édition 67 : Jour des champions, succès Fléau des champions ; traduite.
  Autotest 227/227 ; lang-overflow propre (3e passe complète de suite sans le défaut espagnol).
- 2026-11-14 (it. 1271, revue générale + demandes de Victor) : texte YouTube de la bande-annonce anglaise (titre,
  description, tags ; chiffres limités à la 0.1.3) rangé dans steam/promo-posts.md. Miniature YouTube 1280×720 dans
  la composition de la capsule principale proposée (mage derrière, guerrier devant, drake ; make.js, capsule.html :
  main-capsule identique octet pour octet à la proposition) + couverture itch 630×500 assortie, dans
  steam/promo/capsules-steam-proposition et sur le partage. Revue : texte coréen et russe de la partie de fin avec le
  Jour des champions, la quête de champion et le succès (≈ 19 800 lignes chacun) : rien de non traduit ; 12 h et
  performance mesurées à la 1261, rien depuis qui les touche.
- 2026-11-14 (it. 1270, contrôle) : deux passes complètes de lang-overflow après la correction de l'it. 1269 : aucun
  défilement (avant : le défaut espagnol dans 3 des 4 dernières passes complètes, it. 1256-1268). Tenu pour corrigé ;
  à rouvrir s'il revient (le rapport nommera la colonne).
- 2026-11-14 (it. 1269) : défilement passager de l'Aventure en espagnol à 1280 px : le rapport corrigé (it. 1268) a
  nommé la colonne du héros (p-hero, rangée « Pendiente · Crónicas »). Reproduit l'état de lang-overflow (tous les
  déblocages, zone 310, quatre reliques) : « Experiencia 4,49 mil M / 1,54e105 » passait sur deux lignes (selon la
  quantité d'expérience : d'où le caractère passager). Correction : dans la carte du héros, la valeur ne se coupe
  plus, le libellé cède (points de suspension) ; vérifié en capture : une seule ligne, libellé entier. Non prouvé
  comme seule cause : dans l'état reproduit, la rangée était tenue par une autre colonne (marge du héros 14 px avant
  comme après, aucun défilement). La prochaine passe dira si le défaut revient. Autotest 227/227.
- 2026-11-14 (it. 1268) : 11e bénédiction du jour, « Jour des champions » (👑, champions ×4 : file, hors ligne et
  temps estimé de la quête de champion), ajoutée à la FIN de DAY_MODS : aujourd'hui et les trois jours suivants
  inchangés (vérifié avant / après). Réplique du héros (dm_champions), traduite. Le test de stabilité du calendrier
  (it. 1237) avait un seuil fixe (85 % des jours comme avec 9 bénédictions) devenu faux à 11 (9/11 ≈ 82 % attendus) :
  il compare maintenant au calendrier d'une bénédiction de moins (≈ 1 jour sur n change) et à l'origine (≈ 9 / n).
  Écarté : une 16e capacité de boss (ajouter à ORDER rebat les capacités de tous les boss : (z - 1) % ORDER.length).
  Outil : le rapport de débordement désignait la feuille la plus basse (le journal, colonne déjà pleine qui s'étire
  avec la rangée) ; il désigne maintenant la colonne dont le contenu descend le plus près du bas de sa boîte, celle
  qui fixe la hauteur de la rangée (vérifié sur le bloc fabriqué : p-hero>tempx). Le défilement espagnol est revenu
  pendant la mesure (4e fois) : la prochaine occurrence nommera la vraie colonne. Autotest 227/227.
- 2026-11-14 (it. 1267, contrôle) : tableau des 20 héros (hero-table, 12 h) après la Lune pâle et l'élite
  Régénérant : moyenne 64,0 (repère it. 1118 : 63,7), de 61 (barde) à 69 (samouraï), une graine par héros (±4) :
  rien à régler.
- 2026-11-14 (it. 1266) : 68e succès, « Fléau des champions (25 champions) » (CHAMPIONS_25, progression x / 25) :
  un objectif lointain après « Tueur de champion » (≈ 5000 monstres ; la quête de champion y aide). Traduit ; icône
  (chevalier blanc, à côté du chevalier noir de CHAMPION ; « knight_crystal » n'a pas de dessin : sans icône, achicons
  le signale) ; steam/achievements.md régénéré (68), checklist, README. Test ; autotest 227/227 ; lang-overflow
  propre. Pour Victor : déclarer CHAMPIONS_25 dans Steamworks avec ses deux icônes.
- 2026-11-14 (it. 1265) : checklist Steam : page du magasin modifiée jusqu'à l'it. 1260 (15 événements, 8 élites,
  17 quêtes), à recopier dans Steamworks si déjà saisie. Défilement espagnol : une piste de plus écartée (Idées).
- 2026-11-14 (it. 1264) : « Quoi de neuf », édition 66 : quête de champion (hors ligne, temps estimé), Régénérant
  sans soin en brûlant ou empoisonné ; traduite. Autotest 227/227. lang-overflow : le défilement passager de
  l'Aventure en espagnol à 1280 px est revenu (10 px, une fois) et le rapport (it. 1258) a désigné la colonne du
  héros (p-hero), mais comme élément le texte d'une chronique, dans une section REPLIÉE : le contenu d'un <details>
  fermé garde des rectangles dans Chromium. Rapport corrigé (contenu replié exclu) ; deux passes espagnoles ensuite :
  rien. La cause reste à nommer (voir Idées).
- 2026-11-14 (it. 1263) : quête « Vaincre un champion » : temps estimé restant au rythme actuel des combats
  (questEta : une chance sur 200 par victoire, comme hors ligne), affiché sur sa carte comme pour les chasses et les
  élites. Test (200 fois le temps d'une victoire) ; autotest 227/227.
- 2026-11-14 (it. 1262) : la quête « Vaincre un champion » avance aussi hors ligne (applyOffline : champions tirés à
  CHAMPION.chance par monstre dès la zone 5, comptés dans les statistiques) : plutôt que l'exception ajoutée à la note
  à l'it. 1261, retirée (la note reprend son texte d'avant, déjà traduit). Test (8 h d'absence : ≥ 1 champion pour
  238 monstres) ; autotest 227/227.
- 2026-11-14 (it. 1261, revue générale) : 12 h simulées : guerrier 69, mage 61, rôdeur 60 (61 / 62 / 64 à la 1241 ;
  une graine, ±4 zones par héros ; la moyenne des 10 héros était dans le bruit à l'it. 1250) ; performance : bande
  18,8 %, panneau 20,3 %, mini 6,6 %, icône 0,5 % (inchangé). Capture de l'onglet Quêtes (anglais, quête de champion
  3 étoiles) : correcte, mais la note du bas promettait que tout avance hors ligne « sauf boss, événements rares et
  sorts » : les champions (it. 1260) n'y avancent pas non plus : ajoutés à la liste (nouvelle clé, 10 langues).
  Autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1260) : 17e sorte de quête, « Vaincre un champion » (quests.js : dès la zone 5 ou après une
  ascension ; objectif 1, ×1,8 / ×3 avec les étoiles ; coffre épique, or, œuf 30 %) : un objectif de patience (un
  champion ≈ tous les 200 monstres). Icône (casque à cornes épique), traduite ; comptes 16 → 17 dans store-page (10
  langues ; steam-store-check l'a signalé aussitôt), README. Test (une élite ordinaire ne compte pas ; pas en tout
  début de partie). Autotest 227/227. Non pris en compte hors ligne (les champions n'y sont pas simulés).
- 2026-11-14 (it. 1259, contrôle) : lang-overflow complet (10 langues, avec le nouveau rapport de cause) : aucun
  défilement ; save-fuzz (dev : 1211 corruptions ; fin de partie : 1190) : ok, après les ajouts du jour (bénédictions
  vécues, Lune pâle, élite Régénérant).
- 2026-11-14 (it. 1258) : --overflow-report (donc lang-overflow) nomme ce qui dépasse quand un onglet défile :
  « adventure-cause=p-hero>P:Los_lugartenientes… » (colonne .panel et élément le plus bas, texte tronqué). Vérifié sur
  un débordement fabriqué (bloc de 80 px dans la colonne du héros, injection TEMP) : colonne désignée juste.
  Piège évité : dans le JavaScript envoyé en gabarit (`…`), « \s » devient « s » : écrire « \\s ». Autotest 227/227.
- 2026-11-14 (it. 1257, enquête sans correction) : défilement passager de l'Aventure en espagnol à 1280 px (vu une
  fois sur cinq à l'it. 1256) : trois causes plausibles écartées par mesure (voir Idées) ; une retouche CSS essayée
  (carte du déblocage réduite sous le résumé de visite) retirée : sans elle, la mesure donnait déjà 0, elle ne
  corrigeait donc rien de prouvé.
- 2026-11-14 (it. 1256) : élite Régénérant alignée sur la Régénération des boss : pas de soin tant qu'elle brûle ou
  est empoisonnée (vraie parade : sorts et talents de brûlure / poison). Description mise à jour (nouvelle clé,
  traduite), README. Test (brûlure : pas de soin). Vérifié aussi (it. 1256, sans changement) : résumé d'absence de
  3 h (bulle et réplique du héros) fidèle. Autotest 227/227.
- 2026-11-14 (it. 1255) : « Quoi de neuf », édition 65 : élite Régénérant (et son +N vert), ciel et bilan de la Lune
  pâle, bordure des événements en thème clair (it. 1244-1254) ; traduite. Autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1254) : élite régénérante : son soin se voit sur la bande, un « +N » vert au-dessus d'elle au plus
  une fois par seconde (événement monRegen, game.js ; masqué avec les nombres de dégâts). Test (1 à 2 annonces en
  2 s) ; vérifié en capture (+247k, +334k) ; autotest 227/227.
- 2026-11-14 (it. 1253, contrôle) : nouvel extracteur (it. 1252, toutes sous-sections et bulles) passé sur la partie
  de fin en ja, zh, ko, pl, de, es, pt (≈ 19 800 lignes chacune) : aucun texte non traduit. Langues asiatiques : aucun
  mot latin hors suffixes des grands nombres et « pt » japonais (abréviation de points, voulue) ; langues latines :
  aucun mot français (« Pas » ceinture en polonais, « Ton » en allemand, « le » espagnol : vrais mots).
- 2026-11-14 (it. 1252) : outil --dump-text (main.js) : il ne lisait que la sous-section par défaut de chaque onglet
  (Bestiaire > Élites, Événements, Bénédictions ; Boutique > Atelier ; Statistiques > Succès… jamais extraits) et
  les attributs title, vides depuis l'it. 817 (les bulles sont dans data-title) : le texte des bulles échappait donc
  aussi à la chasse aux mots non traduits. Il parcourt maintenant toutes les sous-sections (boutons data-to) et lit
  data-title. Partie de fin en russe : 19 781 lignes (au lieu de ≈ 11 600), rien de non traduit (suffixes Qa / Qi
  voulus, noms de langues, Esc). CLAUDE.md.
- 2026-11-14 (it. 1251, revue générale) : performance (it. 1249) et 12 h des 10 héros (balance, it. 1250) déjà
  mesurées, inchangées. Texte japonais de la partie de fin (11 589 lignes) : aucun mot latin hors noms propres, langues
  et touches (Esc, DEV, BGM) ; Lune pâle traduite partout (18 occurrences). Captures en japonais : Bestiaire > Élites
  « エリート (8 / 8) » avec 再生する et le bonus +8 % ; mode mini lisible. Rien à corriger. Note : --dump-text ne
  parcourt que la sous-section par défaut des onglets (Élites, Événements… restent hors du texte extrait ; mesurés
  par lang-overflow, pas par la chasse aux mots non traduits).
- 2026-11-14 (it. 1250) : 8e sorte d'élite, « Régénérant » (data.js ELITE_AFFIXES.regen) : regagne 3 % de sa vie
  maximale chaque seconde en combat (jamais au-delà) : il faut frapper fort et vite. Rejoint d'elle-même le Bestiaire
  (Élites), les proies des quêtes et le succès « Tueur d'élites ». Traduit ; comptes 7 → 8 dans store-page (10
  langues), README. Tests : régénération bornée ; les anciens contrôles qui attendaient « 1 / 7 » (test-logic et
  autotest) suivent maintenant le nombre de sortes. fuzz 1200 parties sans blocage ; balance 12 h : 62,5 contre 63,5
  (bruit) ; autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1249, contrôle) : performance après les it. 1238-1248 (ciel de la Lune pâle, pastilles) :
  bande 21,2 %, panneau 20,8 %, mini 7,1 %, icône 0,5 % d'un cœur : inchangé (revue 1231 : ≈ 21 %). Rien à faire.
- 2026-11-14 (it. 1248) : pastilles des événements en cours (Aventure), thème clair : la bordure prenait la couleur
  brute de l'événement, presque invisible sur le fond clair pour les plus pâles (Lune pâle #d8dcf0, Voile protecteur,
  Nuée d'étoiles) ; elle suit maintenant la teinte assombrie du texte (color-mix … --tintk, comme .tint). Contraste du
  texte mesuré pour les 15 événements en thème clair : 4,3 à 7,4. Vérifié en capture ; autotest 227/227.
- 2026-11-14 (it. 1247, contrôle) : dix premières minutes (first-minutes, 3 graines) après la Lune pâle (un tirage de
  plus par victoire) : saines (premier objet 54-81 s, boss 75-81 s, onglets aux mêmes minutes). Checklist Steam : la
  page du magasin a changé à l'it. 1242 (15 événements), à recopier si déjà saisie ; dossiers de presse du partage
  (Médias/sillwalker-promo) mis à jour aussi.
- 2026-11-14 (it. 1246) : bilan de fin de la Lune pâle : « … dont N boss vaincus » (eventSnap compte aussi les boss),
  puisque sa raison d'être est de franchir un boss coriace. Traduit (3 formes en ru et pl) ; test ; autotest 227/227.
- 2026-11-14 (it. 1245, contrôle) : --crawl en coréen sur la partie de fin après les it. 1238-1244 : 502 clics, aucune
  erreur. Relu la piste « panoplies du mage » des Idées : déjà close (it. 1213), upgradeDelta compare les statistiques
  complètes, bonus de panoplie compris.
- 2026-11-14 (it. 1244) : Lune pâle : son ciel, comme la Lune de sang et la Nuée d'étoiles (cuit une fois dans le
  décor, fondu à l'entrée et à la sortie) : voile gris-bleu délavé et lune blanche mi-voilée, sur la bande (strip.js
  paleSky) et en mode mini (clé du décor). Contrôle d'autotest du ciel du mode mini étendu à la Lune pâle ; capture
  de la bande vérifiée. Autotest 227/227.
- 2026-11-14 (it. 1243) : « Quoi de neuf », édition 64 : Lune pâle, annonce des bénédictions vécues, bénédiction de
  minuit appliquée aussitôt (it. 1238-1242) ; traduite (noms d'événement repris tels que traduits). Autotest 227/227,
  lang-overflow propre (pire cas des 3 dernières éditions).
- 2026-11-14 (it. 1242) : 15e événement rare, « Lune pâle » (30 s, chance 0,15 % par victoire) : chaque monstre qui
  arrive n'a que la moitié de sa vie, boss compris (PALE_MOON, events.js ; barre de vie à moitié vide) : victoires en
  rafale et coup de pouce contre un boss coriace. Réplique du héros, son (autotest : il visait des notes absentes de
  NOTES, rendu non fini, corrigé), traduit ; comptes 14 → 15 dans store-page (10 langues), dossiers de presse, README.
  Le tirage des événements consomme un nombre de plus à chaque victoire : un ancien test qui dépendait du tirage (pas
  de coffre après un champion) rejoue maintenant jusqu'à une victoire sans coffre. Test ; fuzz 1200 parties sans
  blocage ; autotest 227/227 ; lang-overflow propre.
- 2026-11-14 (it. 1241, revue générale, allégée : rien de lourd depuis la 1231) : texte polonais de la partie de fin
  (bénédictions vécues comprises) : aucun mot français ou anglais ; 12 h simulées : 61 / 62 / 64, inchangé. Rien à
  noter.
- 2026-11-14 (it. 1240, contrôle) : rythme de la première heure (early-pace) identique au repère de l'it. 1121 (1 / 7 /
  18 / 31 / 59 / 114 objets, zone 23 et 6 déblocages à 60 min) après les changements de l'après-midi. Vérifié aussi :
  « +1% expérience » dans le journal du banc de test vient des données non traduites hors interface (translateData),
  pas d'un défaut du jeu.
- 2026-11-14 (it. 1239) : journal : « Nouvelle bénédiction vécue : +1 % d'expérience pour toujours (x / 10). », la
  première fois qu'une bénédiction est vécue, comme « Événement découvert » et les élites (vérifié : ces deux
  collections vidaient déjà le cache des statistiques). game.js claimDaily ; traduit ; test (une ligne, pas de doublon
  le même jour) ; autotest 227/227.
- 2026-11-14 (it. 1238) : bénédiction du jour qui change pendant que le jeu tourne (minuit) : le héros gardait les
  effets de la veille (statistiques en cache : changed() ne les vide pas) jusqu'au prochain changement d'équipement
  ou de niveau ; défaut ancien, hérité aussi par le bonus des bénédictions vécues. claimDaily invalide maintenant les
  statistiques. Test (Jour de furie : attaque à jour aussitôt ; échoue sur l'ancien code, 4 → 4, passe sur le
  nouveau) ; autotest 227/227.
- 2026-11-14 (it. 1237) : calendrier des bénédictions stable : ajouter le Jour des ombres (it. 1222) avait changé le
  modulo du tirage, si bien que 27 jours sur 30 changeaient de bénédiction, celle du jour même comprise pour qui
  mettait le jeu à jour en pleine journée (aujourd'hui : rempart → gobelins), et les « Demain : … » déjà vus étaient
  faux. dayModFor garde maintenant le calcul des 9 bénédictions d'origine ; chaque ajout prend un jour sur n (tirage
  réservoir) : 90 % des jours inchangés, répartition uniforme (≈ 100 jours chacune sur 1008). Test (≥ 85 % inchangés,
  toutes sortent, aujourd'hui inchangé) ; CLAUDE.md (pièges : ajouter à la fin). Autotest 227/227.
- 2026-11-14 (it. 1236) : « Quoi de neuf », édition 63 : succès « Dix jours bénis » ; bénédiction du jour dans la
  bulle du mode mini. Traduite (nom du succès cité tel que traduit : i18n-quotes) ; autotest 227/227 ; lang-overflow :
  rien. Au passage : le héros « absent » d'une capture de dev-data combattait le boss tout à droite (x = 1576), pas
  de défaut.
- 2026-11-14 (it. 1235, contrôle) : répliques de bénédiction les plus longues (« Große Jagd! Die Elite soll sich in
  Acht nehmen. », « Большая охота! Пусть элита поберегётся. ») : la bulle tient dans la bande, au-dessus du héros.
- 2026-11-14 (it. 1234) : mode mini : sa bulle de survol donne la bénédiction du jour (« Bénédiction du jour :
  👺 Fête des gobelins · Gobelins voleurs ×4. »), jusque-là visible seulement dans le panneau. mini.js (libellé déjà
  traduit) ; vérifié en allemand ; autotest 227/227.
- 2026-11-14 (it. 1233, contrôle) : --crawl en japonais sur la partie de fin, avec trois bénédictions vécues (nouveau
  sous-onglet du Bestiaire, lien des Statistiques, 67e succès) : 502 clics, aucune erreur.
- 2026-11-14 (it. 1232) : 67e succès « Dix jours bénis » (BLESSINGS_ALL) : les dix bénédictions du jour vécues ;
  progression x / 10 dans Statistiques > Succès. Traduit (10 langues) ; steam/achievements.md régénéré ; icônes
  (trophée : « gust » et « aegis » n'existent pas et donnaient une potion par défaut) dans steam/achievement-icons ;
  README (liste Steam) et checklist (67) ; test. La liste des succès débordait de 7 px à 1366 px (espagnol, russe) :
  le seuil serré passe de 1333 à 1334 px (panneau de 1366 − 32 px). Autotest 227/227 ; lang-overflow : rien.
- 2026-11-14 (it. 1231, revue générale) : performance sur copie neuve de dev-data : bande 21,3 %, panneau 20,5 %, mini
  7,1 %, icône 0,5 % (stable : la vérification de scène de PNJ à chaque image ne coûte rien de mesurable) ; 12 h
  simulées : 61 / 62 / 64 (guerrier / mage / archer, inchangé ; la simulation ne réclame pas de récompense du jour, le
  bonus des bénédictions, +10 % d'expérience au plus en dix jours, n'y joue pas) ; texte coréen de la partie de fin :
  propre. Rien à noter.
- 2026-11-14 (it. 1230) : README à jour des nouveautés de l'après-midi (Jour des ombres, réplique du héros, collection
  des bénédictions, objets restés au sol dans le résumé d'absence). La page du magasin ne chiffre pas les
  bénédictions : rien à y changer.
- 2026-11-14 (it. 1229) : « Quoi de neuf », édition 62 : collection des bénédictions (+1 % d'expérience chacune,
  Bestiaire > Bénédictions du jour). Libellés cités tels que traduits ; autotest 227/227 ; lang-overflow : rien.
- 2026-11-14 (it. 1228) : Statistiques : « Bénédictions du jour → » mène en un clic au sous-onglet du Bestiaire, comme
  « Événements rares → » (dès qu'une est vécue et le Bestiaire ouvert). Clic vérifié en jeu (onglet bestiary /
  blessings) ; autotest 227/227 ; lang-overflow : rien.
- 2026-11-14 (it. 1227) : Bestiaire > « Bénédictions du jour », nouveau sous-onglet (dès la première vécue) : les dix
  bénédictions, nom, icône et effet pour celles déjà vécues, « ??? » sinon, celle du jour encadrée ; le bonus de la
  collection et le bonus actuel (+1 % d'expérience chacune). bestiary.js ; main.js (sous-section mesurée par
  lang-overflow) ; traduit ; autotest 227/227 ; lang-overflow : rien ; capture en allemand.
- 2026-11-14 (it. 1226) : collection des bénédictions : chaque bénédiction du jour déjà vécue donne +1 % d'expérience
  pour toujours (+10 % au plus ; les événements rares donnent de l'or, les bénédictions de l'expérience). daymods.js
  (BLESSING_SEEN_BONUS, blessingsSeenEffects), rules.js (heroStats) ; le bonus dans la bulle de la ligne
  Statistiques (dans la valeur, il chevauchait le libellé en russe et polonais : lang-overflow, 20 mesures, puis 0) ;
  test (3 vues = +3 %, clé inconnue ignorée) ; autotest 227/227. À annoncer dans la prochaine édition de « Quoi de
  neuf » (l'édition 61 est publiée).
- 2026-11-14 (it. 1225) : « Quoi de neuf », édition 61 : Jour des ombres ; le héros salue les bénédictions, et
  Statistiques compte celles déjà vécues ; objets laissés au sol dans le résumé d'absence. Traduite (10 langues) ;
  autotest 227/227 ; lang-overflow : rien.
- 2026-11-14 (it. 1224) : bénédictions vécues : la partie retient chaque bénédiction du jour rencontrée (S.daily.seen ;
  celle du jour en cours comptée au chargement) ; Statistiques > Moments rares : « Bénédictions du jour  x / 10 », la
  liste au survol (✓ vue, · pas encore). Une collection de plus pour les longues parties (dix jours au moins pour la
  compléter). state.js (défaut, migration, valeur abîmée), game.js claimDaily, stats.js ; traduit ; test (retenues,
  ancienne sauvegarde, valeur abîmée) ; save-fuzz ok (1197) ; autotest 227/227 ; lang-overflow : rien ; capture en
  allemand.
- 2026-11-14 (it. 1223) : le héros salue la bénédiction du jour quand elle commence, une réplique par bénédiction
  (« Les gobelins sont de sortie… », « Aujourd’hui, je danse avec les ombres. »…), 8 s après le lancement (après
  « Te revoilà ! » ; jamais au tout premier lancement). strip.js (SPEECH dm_*, dayLine), app.js (checkDaily) ;
  10 répliques traduites ; vérifié en jeu (copie de la partie 0.1.2, récompense d'hier) ; autotest 227/227.
- 2026-11-14 (it. 1222) : 10e bénédiction du jour, « Jour des ombres » : +15 % d'esquive, +20 % de riposte (journée
  défensive et réactive, différente des neuf autres ; effets existants seulement). daymods.js ; traduite (10 langues) ;
  test (esquive et riposte en plus) ; autotest 227/227 ; lang-overflow (mesure chaque bénédiction) : rien.
  (Erreur corrigée à l'it. 1237 : claimDaily recalcule la bénédiction à chaque lancement ; l'ajout changeait le
  calendrier entier, celle du jour comprise.)
- 2026-11-14 (it. 1221, revue générale, allégée : la précédente date de l'it. 1211, performance mesurée à l'it. 1218) :
  texte japonais extrait sur la partie de fin : propre ; captures (Aventure en japonais, Talents en anglais, mode mini
  en japonais) : rien qui déborde, duo dans le bon ordre (archère derrière le guerrier) ; 12 h simulées : records 61
  (guerrier), 62 (mage), 64 (archer), dans le bruit des repères. Aucun problème à noter.
- 2026-11-14 (it. 1220, contrôles) : parties bloquées (fuzz, 60 graines) : 1200 parties, 0 bloquée ; sauvegardes
  abîmées : ok (dev-data 1190 corruptions, fin de partie 1183, partie 0.1.2 1127). Sac plein au retour : la tâche
  « Sac plein… » du résumé couvre déjà le cas (vendre l'inutile, ou « le butin suivant restera au sol »).
- 2026-11-14 (it. 1219) : résumé d'absence : nouvelle ligne « Laissés au sol (sac plein) » (en rouge) quand le sac
  plein a fait perdre du butin pendant l'absence (avant : seulement une ligne perdue dans le journal ; une partie de
  6 h avec le sac plein en perdait plusieurs). game.js applyOffline (onGround, hors ventes automatiques), panel.js ;
  traduit (10 langues) ; test logique (sac plein : > 0 ; sac immense : 0) ; autotest 227/227 (pire cas mesuré
  avec la ligne) ; capture en allemand.
- 2026-11-14 (it. 1218, contrôles) : --crawl en russe sur la partie de fin (501 clics) et en polonais sur la partie
  0.1.2 (382 clics) : aucune erreur ; fin de partie sur copie neuve : bande 24,7 % d'un cœur (repère it. 1066 : ≈ 24),
  panneau 25,9, mini 7,6, icône 0,7 : pas de régression depuis les changements de la bande (it. 1208-1216).
- 2026-11-14 (it. 1217) : « Quoi de neuf », édition 60 : le compagnon au corps à corps marche devant un héros à
  distance (bande et mode mini) ; rencontres des personnages sans monstres, butin ni réplique par-dessus. Traduite
  dans les 10 langues (i18n-check 0 problème) ; autotest 227/227 ; lang-overflow : aucun défilement ni mot coupé.
- 2026-11-14 (it. 1216) : rencontre d'un PNJ : le héros ne commente plus un combat masqué pendant que le PNJ parle
  (sa réplique « Une de plus pour ma collection ! » pouvait recouvrir celle de Mirette ; strip.js say). Autotest 227/227.
- 2026-11-14 (it. 1215) : rencontre d'un PNJ : plus de gains d'or ni de pièces qui jaillissent des monstres masqués
  (strip.js float, juice.js coins et loot). Corrigé au passage un défaut de l'it. 1208 : la classe qui masque les
  monstres n'était retirée qu'à la fin normale de la scène ; une scène effacée autrement (clear de la bande, autre
  scène qui la remplace) pouvait les laisser invisibles. L'état se déduit maintenant de la scène en cours à chaque
  image (juice.npcScene / syncNpcScene). Autotest 227/227 (l'échec du premier passage venait de ce défaut).
- 2026-11-14 (it. 1214) : mode mini : comme sur la bande (it. 1209), un compagnon au corps à corps marche devant un
  héros à distance (le mage, derrière son guerrier) ; places simplement inversées, barre de vie sur le héros.
  Vérifié en capture (mage + guerrier), autotest 227/227. Dix premières minutes contrôlées (first-minutes) : saines.
- 2026-11-14 (it. 1213) : panoplies du mage, fin de l'enquête : pas un bug. Le mage garde deux pièces « Ronin errant »
  forgées +10 de niveau 17-20 jusqu'en zone 61 : le bonus de 2 pièces (iai, premier coup) vaut 19 % de sa puissance,
  et une arme fraîche de zone 59 à +0 ne le bat que 6 fois sur 100 (à +10 : jusqu'à ×1,66). Ces emplacements
  occupés le laissent rarement réunir 4 pièces d'une autre panoplie. Équilibre voulu (la forge reste sur l'objet) ;
  rien à changer.
- 2026-11-14 (it. 1212) : enquête sur les panoplies du mage (revue 1211) : simulation instrumentée ; ni vente ni
  ascension en cause (pertes égales aux autres classes) ; l'écart vient de l'équipement porté (Idées, piste notée).
  Pas de changement du jeu.
- 2026-11-14 (it. 1211, revue générale) : performance stable (copie neuve de dev-data : bande 21,1 %, panneau
  20,9 %, mini 7,0 %, icône 0,5 % d'un cœur) ; lang-overflow : aucun défilement ni mot coupé dans les 10 langues
  (fin de partie et 130 % compris) ; texte russe extrait : rien d'anglais ou de français oublié ; 12 h simulées :
  guerrier, mage, archer 62-63 de record. À surveiller (Idées) : le mage ne complète aucune panoplie en 12 h (graines
  7, 3, 11), contre 3 à 5 pour le guerrier.
- 2026-11-14 (it. 1210) : tout le matériel promo refait avec les corrections des it. 1208-1209 (guerrier devant le
  mage, aucun monstre autour de la maison de Mirette) : tous les plans retournés dans les 10 langues, 300 captures,
  vignettes, GIF et 30 vidéos recalculés ; livrés sur le partage, dans steam/promo et steam/screenshots.
- 2026-11-14 (it. 1209, demande de Victor) : duo : un héros à distance (mage, archer…) avec un compagnon au corps à
  corps laisse le compagnon marcher devant lui (strip.js, placement du compagnon) ; avant, le mage menait la marche et
  son guerrier suivait. Autotest 227/227. Tout le matériel promo est retourné et recalculé avec ce placement.
- 2026-11-14 (it. 1208, demande de Victor) : rencontre d'un PNJ : plus de monstre autour de sa maison (ils passaient
  derrière la grenouille) : classe « mon » sur les monstres de la bande (strip.js monsterActor), masqués tant que la
  scène dure (.stage.npc-scene, juice.js), sans transition (leurs fondus sont animés par le jeu). Autotest 227/227.
- 2026-11-14 (it. 1207, demande de Victor : « mets tout ça dans le repo ») : tout le matériel promo copié dans
  steam/promo/ (312 Mo : 30 vidéos, 300 captures, vignettes, GIF, capsules proposées, dossiers de presse, LISEZMOI),
  même organisation que Médias/sillwalker-promo (les dossiers de presse s'ouvrent tels quels) ; checklist à jour.
- 2026-11-14 (it. 1206, médias 8, intégration finale) : steam/screenshots remplacé par la série finale (15 vues, jeu
  seul, anglais et français, 5,3 Mo ; les 6 anciennes par langue retirées) ; steam/checklist.md renvoie au dossier
  Médias/sillwalker-promo pour les 10 langues, les accroches et les bandes-annonces (≈ 14 Mo chacune, gardées hors
  du dépôt). Fin du chantier promo demandé jusqu'à samedi midi : retour aux itérations normales ensuite.
- 2026-11-14 (it. 1205, bande-annonce 22) : carton final avec la bande du jeu qui défile en bas de l'écran (edit.py,
  option « strip » des cartons : un plan réduit à 1920×120 sous le logo et les liens) : l'idée du jeu jusqu'à la
  dernière image. 30 vidéos recalculées et relivrées.
- 2026-11-14 (it. 1204, médias 7) : dossier de presse en français (scripts/promo/presskit-fr.html : textes traduits,
  vidéos, vignette et captures françaises), lié à la version anglaise (lien croisé en haut de page) ; livré.
- 2026-11-14 (it. 1203, médias 6) : relecture du dossier de livraison (10 langues partout, 15 captures par série, 20
  vidéos de 29,7 s et 10 de 64,7 s ; LISEZMOI réécrit au propre). Capsules Steam : nouvelle composition « illustration »
  (capsule.html, keyart : le duo en grand face au drake, or qui jaillit, lueur au point de choc, Briseur en ombre,
  vignette ; le titre a de l'air) pour les capsules d'en-tête, petite, principale, verticales ; livrées en PROPOSITION
  (Médias/sillwalker-promo/capsules-steam-proposition), steam/capsules du dépôt inchangé en attendant l'avis de Victor.
- 2026-11-14 (it. 1202, médias 5) : vignettes YouTube et couvertures itch.io dans les 10 langues (thumbs.py :
  accroche dans la police pixel du titre, lettres cyrilliques et polonaises prises dans les polices du jeu caractère
  par caractère, Noto Sans CJK pour le chinois, le japonais et le coréen).
- 2026-11-14 (it. 1201, bande-annonce 21) : bandes-annonces dans les 10 langues : russe, polonais, chinois, japonais,
  coréen ajoutés (textes de la bande-annonce dans texts_asia.py, plans manquants tournés, polices de secours par
  langue dans le rendu) : 30 vidéos (complète, 30 s, verticale × 10 langues) dans Médias/sillwalker-promo/videos.
- 2026-11-14 (it. 1200, captures 10) : captures « promo » dans les 10 langues : accroches en chinois, japonais,
  coréen, russe, polonais (texts_asia.py, noms repris du jeu) ; edit.py dessine chaque caractère dans la première
  police qui l'a (PROMO_FALLBACK, ligne de base commune) : Tiny5 (cyrillique) et Geist Pixel étendu (polonais) du jeu
  (mkfonts.py), Noto Sans CJK Bold pour le chinois, le japonais et le coréen (DotGothic16 du jeu : traits trop fins à
  grande taille, 49 caractères simplifiés absents).
- 2026-11-14 (it. 1199, médias 4) : dossier de presse (scripts/promo/presskit.html, copié dans Médias/sillwalker-promo) :
  page autonome en anglais qui pointe vers les fichiers voisins : bande-annonce lisible sur place et ses trois
  formats à télécharger, fiche (développeur, plateformes, langues, disponibilité), six points forts, 15 captures,
  GIF ; logo seul exporté (vignettes/logo.png). Vérifié par une capture de Chrome sans écran.
- 2026-11-14 (it. 1198, bande-annonce 20) : le mode mini dans la bande-annonce complète (1 mesure, « Or keep it tiny. »,
  la caméra glisse vers le widget dans le coin du bureau ; relique ramenée à 1 mesure : 24 mesures en tout, calées
  sur la musique). Cinq langues relivrées.
- 2026-11-14 (it. 1197, captures 9) : capture du mode mini (15e) : plan « mini » filmé en écran entier (GRAB_SIZE /
  GRAB_POS dans record.sh, « grab » dans shots.json ; edit.py lit la taille de chaque plan) et posé sur le bureau
  dessiné (×0,67 : le widget dans son coin, le bureau autour) ; « Or keep it tiny » en cinq langues ; tourné dans les
  10 langues (le widget est traduit : « Stf. », « エリア »). Toutes les captures relivrées.
- 2026-11-14 (it. 1196, bande-annonce 19) : relecture de la version finale : Aventure et Bestiaire cadrés à ×0,75
  (2560 px du tournage → 1920) : colonnes entières et bande du jeu dessous (à ×1, l'équipement était coupé au bord).
  Cinq bandes-annonces complètes relivrées. steam/screenshots et steam/media : remplacés une seule fois, avant midi.
- 2026-11-14 (it. 1195, médias 3) : vignettes (scripts/promo/thumbs.py) : vignette YouTube 1280×720 et couverture
  itch.io 630×500 en cinq langues, à partir d'une image nette du combat contre le boss majeur (bande ×3 et ×2 sans
  le HUD du jeu), bandeau du logo (rogné de sa marge transparente : il chevauchait la scène) et accroche
  (« An idle RPG on your taskbar »). Livrées dans Médias/sillwalker-promo/vignettes.
- 2026-11-14 (it. 1194, bande-annonce 18) : bandes-annonces en allemand, espagnol et portugais (complète, 30 s,
  verticale : 15 vidéos en tout avec l'anglais et le français) : textes traduits (texts.py), plans manquants tournés ;
  edit.py réduit un titre trop large pour l'image (ENJAMBRE DE ESTRELLAS en vertical) ; relique cadrée sur sa phrase
  (centrée sur la bande, 1840 px) : la phrase portugaise, plus longue, était coupée.
- 2026-11-14 (it. 1193, captures 8) : captures « promo » en allemand, espagnol et portugais (texts.py : DE, ES, PT ;
  noms repris des traductions du jeu : Blutmond, Saum, Luna de sangre, Alféizar, Parapeito…). Pas de polonais, russe
  ni CJK : les polices des titres (Pixelify, Geist Pixel) n'ont pas ces lettres (vérifié par fontTools). Vidéos
  françaises recalculées avec l'Aventure sans journal anglais ; tout relivré.
- 2026-11-14 (it. 1192, captures 7) : relecture à pleine taille : captures « promo » centrées entre l'accroche et le
  logo (tassées en haut avant) ; plus de logo en coin sur le bureau (il tombait sur la bande du jeu) ; record.sh vide
  le journal de la copie (le journal garde la langue de la partie d'origine : lignes anglaises dans l'Aventure en
  français et dans les 8 autres langues) ; Aventure refilmée dans les 9 langues, toutes les captures relivrées.
- 2026-11-14 (it. 1191, captures 6) : captures Steam (jeu seul) dans les 10 langues : les 13 plans utiles refilmés avec
  le jeu en es, pt, de, pl, ru, zh, ja, ko (échecs isolés du tournage, code 251 : plans manquants retournés) ;
  Mirette cadrée à ×1,2 (sa réplique allemande, plus longue, était coupée à ×1,5). Livrées dans
  Médias/sillwalker-promo/captures-steam-<langue> (Steam accepte des captures par langue).
- 2026-11-14 (it. 1190, bande-annonce 17) : ouverture sur l'idée du jeu : le bureau en premier (3 mesures, la musique
  s'ouvre quand la caméra plonge vers la bande), le logo arrive en titre après les deux gros plans du héros (avant :
  5 s de logo fixe en ouverture, sans accroche) ; version courte réordonnée de même ; verticale : boss mieux cadré.
  Cinématique d'ouverture du jeu écartée (≈ 2 s de carton, trop courte pour un plan). Six vidéos livrées à nouveau.
- 2026-11-14 (it. 1189, bande-annonce 16) : plan d'un boss majeur (shots.json « boss » : partie de fin, S.kills = 10
  → le Chevalier de l'éclipse de la zone 150 tout de suite) : sorts du duo, critiques à 15-17 M, esquives, ripostes.
  Il remplace le combat ordinaire pour « Grow absurdly powerful. » (version complète, avec impact ; verticale) ; 14e
  capture « Legendary bosses / Des boss légendaires ». Cadrage d'après la position du héros (les prises diffèrent).
- 2026-11-14 (it. 1188, médias 2) : dossier de livraison sur le partage (Médias/sillwalker-promo, ≈ 60 Mo, hors
  dépôt) : six vidéos (complète, 30 s, verticale × anglais/français), 4 × 13 captures (Steam sans texte / promo avec
  accroches × deux langues), cinq GIF, LISEZMOI.txt (usage de chaque fichier, régénération). steam/screenshots et
  steam/media ne seront remplacés qu'une fois, à la version finale (poids de l'historique git).
- 2026-11-14 (it. 1187, bande-annonce 15) : version verticale 1080×1920 (TikTok, Shorts, Reels), 29,7 s, anglais et
  français : CUT=vertical (trailer.py) + PROMO_SIZE=1080x1920 (edit.py) ; bande ×3 au milieu suivant le héros, titres
  sur deux lignes au-dessus, logo centré en bas ; mêmes musique et bruitages que la version courte.
- 2026-11-14 (it. 1186, médias 1) : GIF animés pour la page itch.io (scripts/promo/gifs.py) : cinq boucles de 4-5 s
  (marche, Lune de sang, Ruée des gobelins, Nuée d'étoiles, combat de fin), nettes au pixel (rendu ×2 du tournage
  sans mise à l'échelle, 240 px de haut), cadrées sur le héros d'après son journal, palette par GIF, 15 images/s :
  500 Ko à 1,3 Mo chacun.
- 2026-11-14 (it. 1185, bande-annonce 14) : version courte de 29,7 s pour les réseaux (CUT=short dans trailer.py :
  11 mesures prises au montage complet : logo, bureau, héros, trois événements, grand graphe, combat de fin, carton
  final), anglais et français ; musique fondue sur la dernière seconde et demie (edit.py), bruitages recalés.
- 2026-11-14 (it. 1184, bande-annonce 13) : bruitages (scripts/promo/sfx.py, synthétisés par numpy, calés sur la liste
  des scènes) : souffle qui monte avant chaque titre d'événement, impact grave sur la coupe, tintement sur les cartons
  du logo ; ≈ 5 dB sous la musique (mesuré : efficace 0,05 contre 0,08-0,10), crête du mélange 0,84, film à −15,3 LUFS.
  Versions 7 (anglais) et 3 (français).
- 2026-11-14 (it. 1183, bande-annonce 12) : relecture image par image (une image par scène, deux langues) : Mirette
  cadrée à ×1,5 (sa réplique française, plus longue, était coupée) ; coupes rapides de la fin variées (Lune de sang en
  écran scindé, carte, combat de fin, Ruée des gobelins ; avant : quatre gros plans identiques du même duo, effet du
  suivi du héros). Versions 6 (anglais) et 2 (français).
- 2026-11-14 (it. 1182, bande-annonce 11) : version française : scripts/promo/texts.py (textes anglais d'origine,
  traduction par PROMO_LANG=fr, noms repris de la traduction du jeu : Lune de sang, Nuée d'étoiles, Rebord…) ; tous les
  plans refilmés avec le jeu en français (LANG_UI=fr) ; bande-annonce et 2 × 13 captures en français. Coupes rapides
  de la fin : caméra qui suit le héros aussi.
- 2026-11-14 (it. 1181, captures 5) : captures recadrées sur les nouvelles prises : Nuée d'étoiles, Ruée des gobelins et
  combat de fin suivent le héros ; combat de fin à ×2 (le duo, ses critiques à plusieurs millions et l'élite en face ;
  à ×4 les nombres masquaient tout).
- 2026-11-14 (it. 1180, bande-annonce 10) : plans de la bande retournés avec le journal de position du héros
  (Lune de sang, Nuée d'étoiles, Ruée des gobelins, Pluie d'or, relique, combat de fin) : la caméra des événements et
  du combat final suit le héros (avant : panoramique fixe réglé à la main, qui le perdait selon la prise) ; relique
  cadrée à ×1,2 : la phrase du Drone stellaire entière (coupée aux deux bords avant). Version 5.
- 2026-11-14 (it. 1179, captures 4) : Mirette recadrée à ×1,5 lissé (maison, nom et réplique entiers) ; Ruée des
  gobelins à l'instant de la pluie d'or (×2 autour du héros). Planches des deux séries envoyées à Victor.
- 2026-11-14 (it. 1178, captures 3) : 13 captures par série : trois nouveaux plans (carte du Rebord, boutique,
  familiers ; bulles d'aide masquées pendant le tournage) ; captures de la Nuée d'étoiles, de la carte (« 200 zones to
  cross ») et de la boutique (« Every comfort is earned »). Les vues du panneau montrent la fenêtre ENTIÈRE à sa taille
  réelle sur un écran de 1920 px (avant : coupées à droite). À reprendre : Mirette coupée, Ruée des gobelins sans gobelin.
- 2026-11-14 (it. 1177, captures 2) : écran scindé (edit.py, « extra » : cadrages en plus de la même image) : la capture
  de la Lune de sang montre toute la bande en deux moitiés empilées à ×1 : le cortège entier d'élites étiquetées
  jusqu'au boss du volcan (à ×3, deux élites seulement). La bande-annonce garde le panoramique ×2 (plus vivant).
- 2026-11-14 (it. 1176, captures 1) : scripts/promo/stills.py → edit.py (sortie « %02d.png » : une image par scène) :
  deux séries de 10 captures 1920×1080 à partir des plans tournés : « steam » (du jeu seul, sans texte publicitaire)
  et « promo » (accroche + sous-titre, petit logo en bas à droite) : bureau, héros ×4, Lune de sang, Mirette, grand
  graphe, paliers, Aventure, Bestiaire, combat de fin de partie, Ruée des gobelins. Corrigé : titres invisibles sur
  une image seule (sortie animée), vues du panneau qui coupaient la bande (fenêtre entière, 2203 px réduits),
  événements ×3, gros plans sous l'accroche. À reprendre : Lune de sang (deux élites seulement à ×3). Images gardées
  hors dépôt jusqu'à la version finale (poids de l'historique).
- 2026-11-14 (it. 1175, bande-annonce 9) : ouverture : carton du logo vivant (poussée 0,94 → 1, étoiles qui
  scintillent, reflet qui éclaircit les pixels du logo ; une surimpression faisait une tache grise) ; bureau dessiné
  d'une journée de travail (fond crépuscule à montagnes, éditeur de code coloré, document, lecteur « lofi beats to idle
  to », barre des tâches et horloge 09:41 ; sans noir pur) ; bandeau sombre translucide derrière un titre posé sur une
  image chargée (« plate »). Version 4 complète.
- 2026-11-14 (it. 1174, bande-annonce 8) : caméra qui suit le héros : la mise en scène note sa position toutes les
  100 ms (« [hx] <ms> <x> », console.warn), record.sh garde le journal (<plan>.log) et l'heure du début du film
  (<plan>.t0) ; edit.py (« track » : héros à N px du bord du cadrage, moyenne glissante ± 0,6 s). Vu : le héros avance
  à ≈ 55 px/s (setZone le ramène au bord) : plans de marche désormais toujours cadrés. La rencontre de Mirette est une
  scène fixe, loin du héros : plan ×2 fixe sur la maison et sa réplique (une mesure, après l'annonce d'un champion
  tué), mesure libérée pour un plan Aventure (« Gear up. Forge. Complete your sets. »). Version 3 : 20 scènes, 64,7 s.
- 2026-11-14 (it. 1173, bande-annonce 7) : version 2 : titres animés (glissé + fondu ; « punch » : zoom qui se pose
  pour les événements), gros plans ×4 (480×200 → 1920×800), événements ×2 avec panoramique le long des élites, titres
  agrandis (événements 120 px), combat de fin de partie recadré sur les héros (« Crit 5.62M »), relique en plan
  rapproché lissé, paliers et Bestiaire cadrés en pleine largeur à 1:1. Reste : la caméra fixe perd le héros qui
  avance (plan « Fights. Loots. ») : à suivre d'après sa position.
- 2026-11-14 (it. 1172, bande-annonce 6) : version 1 complète (scripts/promo/trailer.py → edit.py, 64,7 s, 19 scènes
  calées sur les 24 mesures, musique mixée) : logo, bureau qui plonge sur le héros, gros plans ×3 (marche, combat,
  Mirette), quatre événements rares (titre coloré + sous-titre), relique, grand graphe, paliers, combat de fin de
  partie, Bestiaire, quatre coupes d'une demi-mesure, carton final (Wishlist on Steam · Play now on itch.io ; Windows ·
  macOS · Linux). Calcul : 2 min 24. Logo ajouté au monteur. Critique : événements en bande de 200 px (sans impact),
  combat de fin de partie mal cadré (vide), relique trop petite, titres petits et statiques, vide autour des gros
  plans (passer à ×4), fenêtre des paliers coupée.
- 2026-11-14 (it. 1171, bande-annonce 5) : musique : scripts/trailer/music.js accepte MUSIC_PASSES (airs au choix) ;
  quatre airs rendus (zones 141, 126, 86, 36) et analysés mesure par mesure (réguliers, mais pic à 0,21 : mixés en
  fond dans le jeu) ; choisi : zone 126 (cloches, 89 bpm, mesure 2,70 s, 24 mesures = 68 s). Arc au mixage : deux
  mesures d'ouverture étouffées (passe-bas 700 Hz) puis ouverture, fondus, loudnorm −14 LUFS. Monteur : scène
  « desktop » (bureau ×2 3840×2160, fenêtre du jeu en taille réelle au-dessus de la barre des tâches, son noir rendu
  transparent ; caméra du bureau entier jusqu'au héros, net ; cadrage borné au bureau).
- 2026-11-14 (it. 1170, bande-annonce 4) : monteur scripts/promo/edit.py <edl.json> <plans> <polices> <sortie> <ffmpeg>
  [audio] : chaque image composée en Pillow (fond nuit étoilé à vignette, plan cadré par une caméra animée lissée,
  agrandi au plus proche voisin, ombre portée, titres Pixelify Sans / Geist Pixel à contour, fondus) puis encodée ;
  ≈ 2,3 s de calcul par seconde de vidéo. Polices du jeu converties en TTF (fontTools, hors dépôt). Premier essai (4
  scènes) : à reprendre : cadrage (héros et bulle coupés à gauche), plan du graphe qui embarque la bande et son titre
  posé dessus, carton trop sage (logo), cartouche de zone coupé au bord des plans moyens.
- 2026-11-14 (it. 1169, bande-annonce 3) : plans du panneau (record.sh : EXTRA ; shots.json : args) : grand graphe
  cadré sur la voie du colosse avec la bulle d'une synergie (« Right now ≈ +4.9% attack »), fenêtre des paliers de
  maîtrise, Aventure (mage, milieu de jeu), « Sources de puissance » (fin de partie), Bestiaire complet. Tous nets.
- 2026-11-14 (it. 1168, bande-annonce 2) : liste de tournage scripts/promo/shots.json + scripts/promo/shoot.mjs
  (deux plans filmés à la fois, un écran virtuel chacun ; prélude : bulles vidées, astuces coupées, annonces déjà
  vues). 9 plans filmés (marche, Lune de sang, Nuée d'étoiles, Ruée des gobelins, Pluie d'or, rencontre de Mirette,
  relique, intro, combat de fin de partie). Premier jet : tous les plans de milieu de jeu dans le même décor (Récif
  abyssal) et image encombrée (noms de sorts, nombres). Corrigé : « zone » par plan (décors verger, volcan, désert,
  toundra, ruines célestes ; zones déjà franchies) et nombres de dégâts ordinaires masqués (réglage damageNumbers ;
  critiques et mots gardés), sauf le combat de fin de partie. Seconde prise : décors variés, action lisible.
- 2026-11-14 (it. 1167, bande-annonce 1) : base pour filmer net. Option de dev --stage=<fichier.js> (mise en scène
  exécutée dans le jeu au chargement) ; scripts/promo/record.sh <save> <stage|-> <s> <sortie> : jeu VISIBLE sur un
  écran virtuel 3840×2160, échelle ×2 (--force-device-scale-factor=2), fenêtre 3840×1240 filmée à 30 images/s
  (essai : 166 images distinctes sur 180, ≈ 28/s ; pixels et textes nets en gros plan). Vu : les bulles d'annonce et
  les nombres de dégâts de fin de partie encombrent l'image (mises en scène à nettoyer, partie de milieu de jeu).
- 2026-11-13 (it. 1166) : butler connecté par Victor ; jeu trouvé par l'API d'itch.io (clé de butler) :
  victor-basset/sillwalker, publié, aucun canal butler encore (0.1.2 envoyée à la main). Question « j'envoie la
  0.1.3 ? » sans réponse claire : rien envoyé, en attente de son accord. Cible notée dans CLAUDE.md.
- 2026-11-13 (it. 1165) : étiquettes git v0.1.2 (4e6fc19) et v0.1.3 (53830e5, état des fichiers Windows et Linux
  déposés). Le zip Mac refait à l'it. 1157 pour la signature venait du code du moment (voie par défaut du graphe,
  particule coréenne : postérieurs à la 0.1.3) : reconstruit depuis v0.1.3 (Force 0 vérifié dans l'archive, signature
  vérifiée) et redéposé (sha256 c37d5303…) ; les trois fichiers 0.1.3 sont cohérents. itch-push.sh : REF=<étiquette>
  construit une version figée dans un dossier de travail git à part (recopiée dans dist-itch/, dossier effacé ensuite) ;
  essai à blanc avec REF=v0.1.3 : ok.
- 2026-11-13 (it. 1164, demande de Victor : « on va gérer tout ça avec butler ») : butler 15.32.0 installé
  (~/.local/bin/butler, depuis broth.itch.zone) ; scripts/itch-push.sh <compte/jeu> [--dry-run] : construit les trois
  versions (Mac signée par mac-from-linux.sh), vérifie les fichiers et les pousse sur les canaux windows (dossier
  win-unpacked), linux (dossier de l'AppImage) et mac (zip de l'app signée) avec --userversion. Essai à blanc : les
  trois construites (316 / 121 / 116 Mo). Reste : la connexion de butler au compte de Victor et le nom du jeu.
- 2026-11-13 (it. 1163) : « Quoi de neuf », édition 59 (après la 0.1.3) : voie la plus puissante prise et signalée
  par la dépense automatique ; répliques du héros pour les paliers et le grand graphe. 9 langues (bouton cité tel que
  traduit, vérifié) ; autotest 227/227 ; 10 langues sans défaut.
- 2026-11-13 (it. 1162) : le héros parle aussi au palier de maîtrise (« Ma maîtrise s'affine. » / « Un nouveau
  palier ! », réplique de grand moment : rare), à l'ouverture du grand graphe (« Tout un monde autour de la
  fleur… ») et quand il est rempli (« Plus un seul chemin à tracer ! »). 9 langues ; contrôle d'autotest des
  répliques étendu ; 227/227. Après la 0.1.3.
- 2026-11-13 (it. 1161, revue générale) : --perf (copie neuve de dev-data, seul) : bande 20,9 %, panneau 21,2 %,
  mini 7,1 %, icône 0,8 % (fourchette habituelle 19,2-20,9 selon le combat) ; première heure inchangée (114 objets,
  zone 23, 6 déblocages à 60 min) ; 10 langues sans défaut. Rien à corriger.
- 2026-11-13 (it. 1160) : instructions d'installation itch.io (steam/itch-page.md, anglais et français) : un
  paragraphe « Mise à jour » (remplacer l'ancienne version ; la partie est conservée, sauvegardée hors du dossier du
  jeu ; une fenêtre présente les nouveautés au premier lancement). Le reste couvrait déjà Windows, macOS et Linux.
- 2026-11-13 (it. 1159) : page du magasin Steam (10 langues) : le grand graphe de 618 nœuds (voies à choisir,
  synergies) dans la liste « vraie progression » ; steam-store-check compte aussi les nœuds du grand graphe
  (SKILL_GRAPH_COUNT), dans l'ordre, après les compétences. npm test : page à jour dans les 10 langues.
- 2026-11-13 (it. 1158) : page itch.io (steam/itch-page.md) mise à jour pour la 0.1.3 : grand graphe de 618 nœuds
  (voies, synergies), personnages rencontrés en route, et les trois plateformes (Windows, Linux AppImage, macOS puce
  Apple) au lieu de « Windows seulement » ; nombres vérifiés (20 héros, 33 régions, 83 monstres : « 80 » arrondi).
- 2026-11-13 (it. 1157) : DÉFAUT DE LIVRAISON corrigé : le zip Mac 0.1.3 déposé (it. 1144, 1153) sortait
  d'electron-builder seul, SANS signature (hors macOS) : un binaire arm64 non signé est tué au lancement sur Mac (la
  0.1.2 passait par scripts/mac-from-linux.sh, signature ad hoc rcodesign, it. 833). Refait avec ce script (signature
  vérifiée : print-signature-info), redéposé (sha256 5f88ced5…). rcodesign copié dans ~/.local/bin (il ne survivait
  que dans le brouillon d'une ancienne session). CLAUDE.md (procédure de construction) et steam/checklist.md (66
  succès, chemin de rcodesign) corrigés.
- 2026-11-13 (it. 1156) : contrôle de transmutation rendu fiable : le diagnostic de l'échec de l'it. 1155 (« sac
  0+0+0+ ») montrait des objets fabriqués devenus AMÉLIORATIONS (jamais transmutées) ; le contrôle prend un emplacement
  équipé où ils n'en sont pas, et les refabrique s'ils le sont devenus juste avant le clic. Autotest 227/227 trois
  fois de suite.
- 2026-11-13 (it. 1155) : la bulle d'une voie pas encore choisie dit si c'est celle que prend « Dépenser
  automatiquement » (la plus puissante, it. 1154). En route, coréen : une particule après un guillemet fermant
  (« 「{0}」을(를) ») restait brute ; koJosa saute désormais un guillemet ou une parenthèse fermante (la « Voie fermée »
  était touchée). Test logique (259) ; 9 langues ; autotest 227/227 (deux fois ; un échec isolé de la transmutation,
  noté dans les idées).
- 2026-11-13 (it. 1154) : voie choisie par « Dépenser automatiquement » dans le grand graphe (DEFAULT_BRANCH) :
  puissance de chaque voie entière mesurée (fin de partie ; guerrier, mage, rôdeur : mêmes résultats) ; la voie par
  défaut n'était pas la meilleure en Force (0 : ×1,276 ; 2, sang guerrier : ×1,463) ni en Arcanes (2 : ×1,207 ;
  0 : ×1,280) : corrigé (les quatre autres l'étaient déjà). Semaine simulée : guerrier 350, mage 349, comme avant
  (mur de l'écho de la zone 350) ; le joueur qui laisse dépenser y gagne une voie plus forte. Après la 0.1.3 (pas
  dans les fichiers déposés). Autotest 227/227.
- 2026-11-13 (it. 1153) : versions 0.1.3 reconstruites à l'état du commit 53830e5 (bouton « Version 0.1.3 » des
  Réglages, annoncé par le devlog) et redéposées dans Médias/dist-itch (remplacement d'un coup : copie sous un nom
  temporaire puis renommage). sha256 : linux fff890d0…, mac-arm64 6442a8de…, win e840b65e…. Version Linux construite
  essayée (HOME temporaire, sauvegarde de référence 0.1.2) : chargée, fenêtre de la 0.1.3 montrée (newsSeen → 58).
- 2026-11-13 (it. 1152) : docs/devlog-0.1.3.md : texte du devlog itch.io de la 0.1.3, prêt à coller, en anglais et
  en français (nouveautés de la fenêtre de version, détails, « ta partie est conservée »), libellés cités tels
  qu'affichés dans le jeu (« Sell what doesn't upgrade me »).
- 2026-11-13 (it. 1151, revue générale) : 12 h simulées guerrier 61, rôdeur 62, mage 60 (repères) ; fuzz 1200
  parties, 0 bloquée ; --crawl en japonais (dev-data) : 385 clics sans erreur. Rien à corriger.
- 2026-11-13 (it. 1150) : notes de la dernière version relisibles : bouton « Version 0.1.3 » à côté de « Quoi de
  neuf » (Réglages, carte Aide ; « Quoi de neuf » ne montre que les 3 dernières éditions). 9 langues ; contrôle
  d'autotest ; 227/227 ; 10 langues sans défaut (rangée de trois boutons comprise).
- 2026-11-13 (it. 1149) : save-fuzz a une troisième base, FUZZ_BASE=0.1.2 (la partie fabriquée par la 0.1.2, qui
  passe aussi par migrate() avec des données d'une version plus ancienne) : ok balayage (1127 corruptions).
  CLAUDE.md mis à jour.
- 2026-11-13 (it. 1148) : l'essai de mise à jour de l'it. 1147 devient un test permanent : scripts/fixtures/
  save-0.1.2.json (partie fabriquée par le code de la 0.1.2 ; story.intro mis à true, la simulation ne jouant pas
  l'intro) se charge sans rien perdre (niveau, record, or, classe, talents, compétences, sac, équipement, onglets),
  ses statistiques se calculent, et elle reçoit la fenêtre de la 0.1.3. 258 tests ; autotest 226/226.
- 2026-11-13 (it. 1147) : essai de MISE À JOUR 0.1.2 → 0.1.3. Partie fabriquée avec le code exact de la 0.1.2
  (git worktree du commit 4e6fc19, simulate.js 8 h mage, DUMP : niveau 80, zone 56, 10 onglets, sauvegarde v8),
  ouverte avec la 0.1.3 : aucune erreur, rien de perdu (niveau, record, or, sac, équipement, 64 rangs de talents,
  110 compétences), fenêtre « Nouveautés de la version 0.1.3 » ouverte d'elle-même, newsSeen 1 → 58. Pas d'avalanche de
  scènes de PNJ pour une partie aux onglets déjà ouverts (elles ne se jouent qu'à l'ouverture d'un onglet).
- 2026-11-13 (it. 1146) : procédure de sortie d'une version écrite dans CLAUDE.md (version, notes NEWS_RELEASES avec
  after = NEWS_ID de la précédente : 0.1.2 = 32, 0.1.3 = 58 ; tests ; constructions ; essai avec HOME temporaire).
  Garde-fou : un test échoue si la version de package.json n'a pas ses notes de version. 257 tests ; autotest 226/226.
- 2026-11-13 (it. 1145) : mémoire de la fin de partie au grand graphe rempli, 14 min (mem-watch, MEM_SAVE) : panneau
  ouvert 475 → palier ≈ 565 Mo dès ≈ 5 min (559-572 ensuite) ; panneau fermé 473 → palier ≈ 530 Mo vers 10 min.
  La hausse de l'it. 1144 (557 → 643 en 6 min, une seule mesure courte) était la mise en route, pas une fuite.
  Rien à corriger.
- 2026-11-13 (it. 1144, suite) : versions 0.1.3 construites et déposées dans Médias/dist-itch (Linux AppImage, Mac
  arm64, Windows zip, construit sur le serveur sans Wine : icône et version de l'exécutable vérifiées avec resedit).
  Essai de la version Linux construite, HOME temporaire, partie restée à la 0.1.2 : « version hors Steam (itch) »,
  partie chargée, newsSeen 32 → 58 (fenêtre de la 0.1.3 montrée). Leçon : une version construite ignore
  --user-data ; un premier essai sans HOME temporaire a créé ~/.config/Sillwalker sur le serveur (partie neuve de
  25 s, dossier inexistant avant), supprimé aussitôt ; CLAUDE.md le dit désormais.
- 2026-11-13 (it. 1144, demande de Victor) : VERSION 0.1.3 (package.json). La 0.1.2 (itch.io) s'arrêtait à l'édition
  32 de « Quoi de neuf » ; 26 éditions depuis, la fenêtre n'en montre que 3. Notes de version (news.js,
  NEWS_RELEASES, releaseFor) : 10 nouveautés majeures choisies (grand graphe, personnages, talents et maîtrises,
  événements / élites / capacités de boss, collection, bénédictions et quêtes, panoplies et vente, boutique,
  sources de puissance et temps estimés, performance et taille du panneau), sans les petites retouches de valeurs.
  Un joueur qui n'a rien lu depuis la 0.1.2 voit au lancement la fenêtre « Nouveautés de la version 0.1.3 »
  s'ouvrir d'elle-même (panneau ouvert) ; les éditions ordinaires restent une bulle à cliquer. Noms repris tels que
  traduits dans le jeu (événements, élites, bénédictions, PNJ, onglets) ; 10 langues sans défilement à 1280 px.
  L'autotest règle la copie de dev-data sur l'édition 41 (sinon la fenêtre s'ouvrait seule et faussait 6 contrôles)
  et contrôle la fenêtre de version. Test logique (256) ; autotest 226/226 ; 10 langues sans défaut.
  CLOS (it. 1145 : pas de fuite, palier) — vu en route, it. 1144 : mem-watch sur la fin de partie au grand graphe rempli, panneau ouvert
  (MEM_SAVE / MEM_ARGS ajoutés) : « réel » 557 → 643 Mo en 6 min (dev-data panneau fermé : plat à ≈ 535) ; à
  prolonger (12-20 min) pour savoir si ça plafonne, sinon chercher la fuite.
- 2026-11-13 (it. 1143, demande D) : l'onglet Compétences s'ouvrait toujours sur la fleur ; une fois le grand graphe
  ouvert (5 fois plus grand, rayon 1242), on n'en voyait que les bords, à découvrir à la molette. Fleur pleine et
  graphe pas rempli : l'ouverture et « Recentrer » cadrent le front de la progression (dernier nœud pris, sinon le
  prochain à prendre), même zoom lisible ; graphe rempli : le centre, comme avant. Un clic sur l'annonce d'ouverture
  du graphe recadre aussi. Capture (fin de partie, voie du colosse) ; contrôle d'autotest (dernier nœud au centre de
  la vue, à 20 px près). Autotest 225/225.
- 2026-11-13 (it. 1142) : fin de la revue du thème clair (it. 1141) : onglet Compétences et bulle d'un nœud du grand
  graphe (voie entière, synergie « en ce moment ») lisibles. Détail : « ≈ » restait seul en fin de ligne, sa valeur
  passant à la ligne suivante : espace insécable après « ≈ » (toutes les langues). Autotest 224/224.
- 2026-11-13 (it. 1141, revue générale) : save-fuzz ok sur dev-data (1190) et la fin de partie (1183) ; --crawl en
  polonais sur l'état extrême (max-save) : 555 clics sans erreur ; thème clair des nouveautés (fenêtre des paliers,
  Compétences, synergies) : lisible. DÉFAUT vu en capture : dans la colonne de droite de la fenêtre des paliers,
  « rang 100 » / « rang 200 » passait SOUS le premier bouton (rendu insécable à l'it. 1126 mais toujours rétrécissable :
  le contrôle comptait les lignes, pas le chevauchement) : flex-shrink 0 et une marge ; le contrôle d'autotest mesure
  aussi le chevauchement (vérifié qu'il le voit sans le correctif : 2). Autotest 224/224 ; 10 langues sans défaut.
- 2026-11-13 (it. 1140) : relecture de la liste d'idées : demandes D (grand graphe) et E (PNJ) marquées FAIT ; le
  reste est fait, clos, ou attend Victor (plateau de fin de semaine) ou Windows (bande en plein écran, mesures).
  Partie neuve (dossier vide, français, capture à 75 s) : héros, « Prochaine découverte », boss de la zone 1 et sa
  capacité annoncés, onglets fermés discrets ; rien à corriger.
- 2026-11-13 (it. 1139, demande D) : la bulle « Toute la voie » (voie pas encore choisie, it. 1114) donne aussi la
  valeur actuelle de ses synergies : « Toute la voie, en ce moment : ≈ +24,3 % attaque » (colosse furieux, fin de
  partie), contre ≈ +11,3 % pour l'or tranchant et +18,9 % d'attaque fixe pour le bourreau : la comparaison des
  trois voies devient chiffrée. Libellé distinct de la ligne du nœud. Vu en français et en allemand ; 9 langues ;
  autotest 224/224.
- 2026-11-13 (it. 1138) : « Quoi de neuf », édition 58 : deux succès du grand graphe ; fenêtres des paliers de
  maîtrise et de « À faire » ouvertes d'une action à l'autre. 9 langues (libellés cités vérifiés) ; pire cas sans
  défilement ; autotest 224/224 ; 10 langues sans défaut.
- 2026-11-13 (it. 1137) : scripts/max-save.mjs (état « tout au maximum ») ignorait les nouveautés des it. 1075-1136 :
  il remplit désormais le grand graphe (258 nœuds, points en surplus), met les maîtrises au rang 420 avec l'option
  « b » à chaque palier (annonces vues). Partie obtenue, en russe : textes extraits sans mot non traduit (noms de
  langues et suffixes de nombres, voulus) ; --overflow-report à 1280 px : aucun débordement. Rien d'autre à corriger.
- 2026-11-13 (it. 1136) : deux succès pour le grand graphe (66 succès) : « Au-delà de la fleur » (GRAPH_FIRST, un
  premier nœud actif) et « Le grand graphe accompli » (GRAPH_FULL, 258 nœuds, avec sa progression « (N / 258) »).
  Icônes Steam (trèfle et talisman, encore libres ; les 128 existantes régénérées à l'identique, seules les 4
  nouvelles ajoutées), steam/achievements.md régénéré, liste du README. 9 langues ; 255 tests ; autotest 224/224 ;
  10 langues sans défaut (liste des succès comprise).
- 2026-11-13 (it. 1135, contrôles) : 1) fin de la revue de la grande fenêtre (it. 1133-1134) : Chroniques (le ▶ la
  ferme exprès : cinématique sur la bande), Statistiques, Probabilités et « Ce qui est gardé » (sans bouton),
  Automatismes (cases déjà exemptées) : rien d'autre. 2) Les choix des paliers de maîtrise sont-ils de vrais choix ?
  Partie de fin de partie, maîtrises au rang 420, puissance (power) avec l'option b au lieu de a, palier par palier :
  ×0,97 à ×1,08 (puissance 400 : +40 % critiques ×1,08 contre +25 % attaque ; puissance 25 : +5 % attaque ×0,97 contre
  +15 % critiques) ; options de situation (boss, premier coup, or, expérience, butin) ×1,000 sur cette mesure, utiles
  ailleurs. Aucun faux choix ; rien à régler.
- 2026-11-13 (it. 1134, moins de clics, suite de l'it. 1133) : revue des sections ouvertes dans la grande fenêtre
  (MODAL_DETAILS) : « À faire » avait le même défaut. Ses actions d'un clic (réclamer les quêtes, faire éclore,
  dépenser les points…) sont faites pour passer à ✓ en laissant la liste ouverte, mais la fenêtre se refermait au
  premier clic (une réouverture par tâche) : data-keepopen. Les liens vers un onglet la referment toujours (voulu).
  Contrôle d'autotest (action « talents » : fenêtre ouverte, ligne ✓). Autotest 224/224.
- 2026-11-13 (it. 1133, moins de clics) : la fenêtre « Choisir les bonus des paliers » se refermait à chaque choix
  (tout bouton d'action dans la grande fenêtre la ferme) : régler 6 paliers demandait de la rouvrir 6 fois. Les
  boutons des paliers portent data-keepopen (exception, comme les cases des Automatismes) et la mise en évidence suit
  le choix sur place (aria-pressed compris). Le contrôle d'autotest du choix vérifie la fenêtre encore ouverte et la
  bonne option en évidence. Autotest 223/223.
- 2026-11-13 (it. 1132) : « Quoi de neuf », édition 57 : sources de puissance, paliers de maîtrise réglables
  d'avance, bulles à leur place au zoom 130 %. 9 langues (i18n-quotes : « Toutes les statistiques » à citer tel que
  traduit en anglais, allemand et chinois : corrigé) ; pire cas sans défilement ; autotest 223/223 ; 10 langues sans
  défaut.
- 2026-11-13 (it. 1131, revue générale) : 12 h simulées guerrier 61, rôdeur 62, mage 60 (repères) ; fuzz 1200
  parties, 0 bloquée ; --crawl en anglais (dev-data) 384 clics sans erreur ; --perf (copies neuves, seul : une
  première mesure prise pendant les simulations donnait 25 % pour la bande, à jeter) : bande 19,5 %, panneau 20,5 %,
  mini 7,3 % ; sans les sources de puissance de l'it. 1130 (8 heroStats toutes les 2 s) : 19,5 / 20,6 / 7,1 : coût
  nul. Rien à corriger.
- 2026-11-13 (it. 1130, « ressentir une progression ») : « Toutes les statistiques » (Aventure) dit d'où vient la
  puissance du héros : « Sources de puissance : Équipement ×61,4 k, Compétences ×10, Constellations ×1,8, Talents
  ×1,5, Familiers ×1,03, Grand graphe ×1,03 » (powerSources, rules.js : puissance actuelle / puissance sans ce
  système, sans élixirs ; la fleur mesurée sans le grand graphe, qui en dépend ; recalculé au plus toutes les 2 s).
  Bulle : « Puissance du héros divisée par ce qu'elle serait sans cette source. » Deux décimales sous ×2 (×1,0
  trompait). Termes repris tels que traduits (de « Stärke », ja « パワー »). Test logique (255 ; la mesure ne modifie
  pas la partie) ; capture en russe ; autotest 223/223 ; 10 langues sans défaut (fenêtre mesurée ouverte).
- 2026-11-13 (it. 1129, contrôles) : suite des it. 1127-1128, revue de tout ce qui se place d'après la souris ou
  l'écran dans le panneau zoomé : bulles (maison, objets, nœuds) corrigées ; glissement des rangées (hscroll, it.
  1053) et des vues (Compétences, zf) déjà ramenés au zoom ; déplacement de la fenêtre (windrag) : simple seuil.
  Rien d'autre. Coût de l'onglet Compétences en fin de partie, grand graphe plein (618 nœuds) : premier rendu 3,8 ms,
  rendu médian 3,7 ms (max 4,8), survol d'un nœud 0,3 ms (Aventure : 9 ms) : rien à optimiser.
- 2026-11-13 (it. 1128) : bulle d'un OBJET avec « Taille de l'interface » à 130 % : affichée 158 à 324 px à droite de
  l'objet survolé et sortant du bas du panneau de 55 à 192 px (mesures de l'écran prises pour des px CSS, le défaut
  corrigé à l'it. 1053 pour les autres bulles). Ramenées au zoom, vraie largeur de la bulle : écart 6-10 px, dans le
  panneau à 100 % et 130 % (1920 et 1366 px). Revue des autres bulles placées à la main : bulle maison des titres et
  bulle de la bande déjà bornées. Contrôle d'autotest (écart et bord droit ; vérifié qu'il voit l'ancien défaut :
  158 / 316 px). Autotest 223/223.
- 2026-11-13 (it. 1127) : bulles des nœuds (fleur et grand graphe) gardées dans la vue. Allongées par les it.
  1112-1114 (synergies, voie entière), celle d'un nœud près du bas sortait de 55 px (fin de partie, russe) : le
  placement ne bornait que la gauche, la droite (largeur fixe 260) et le haut ; il borne aussi le bas, utilise la
  vraie largeur de la bulle et ramène les mesures au zoom de l'interface (zf). Vérifié à 100 % et 130 %. Contrôle
  d'autotest (nœud le plus bas, le plus à droite). Autotest 222/222.
- 2026-11-13 (it. 1126) : la fenêtre « Choisir les bonus des paliers » n'était mesurée par aucun contrôle (elle
  n'existe qu'une maîtrise sélectionnée). Mesurée dans les 10 langues à 1280 px, pire cas (6 paliers) : ni
  défilement ni bouton hors de sa ligne ; mais « rang 100 » / « ранг 100 » se coupait sur deux lignes (colonne de
  droite) : étiquette insécable. Le contrôle d'autotest du choix mesure désormais la fenêtre au pire cas (rang 420) :
  défilement, boutons hors de leur ligne, étiquettes coupées (lignes du texte comptées) ; vérifié qu'il voit le
  défaut sans la correction. Autotest 221/221.
- 2026-11-13 (it. 1125) : paliers de maîtrise réglables d'avance. Les talents repartent de zéro à chaque ascension
  mais les choix sont gardés (it. 1122) : tout palier déjà atteint dans une course précédente (noté dans masteryPicks)
  se règle sans attendre de l'atteindre à nouveau (marqué ⏳, bulle « Pas encore atteint dans cette course : réglé
  d'avance »). La grande fenêtre prend le titre complet (data-modal-title) au lieu du lien court « choisir · 5 ».
  En route : 1) masteryMilestones avec un rang infini bouclait sans fin (plafonné à 400) ; 2) autotest instable
  (« BULLE-UN / Du nouveau… ») : une bulle arrivée pendant les 400 ms entre deux bulles de la file passait devant la
  suivante ; elle attend désormais son tour (toastGap ; __clearToasts annule l'attente) ; trois contrôles d'astuce
  qui comptaient sur ce passe-droit vident d'abord la file. Test logique ; 9 langues ; 10 langues sans défaut ;
  autotest 221/221 deux fois de suite.
- 2026-11-13 (it. 1124) : mode mini : moment « Palier de maîtrise : rang N » (comme l'ouverture et le remplissage du
  grand graphe). « Quoi de neuf », édition 56 : paliers de maîtrise annoncés, choix gardés à l'ascension, grand graphe
  rempli annoncé. 9 langues (termes « Ascension » repris tels que traduits) ; pire cas sans défilement ; autotest
  221/221 ; 10 langues sans défaut.
- 2026-11-13 (it. 1123) : audit de l'ascension après le défaut de l'it. 1122 (choix des paliers perdus) : sur la partie
  de fin de partie, seules les données de la course repartent de zéro (niveau, expérience, or, victimes, équipement,
  sac, talents). Test logique permanent : toute donnée remise à sa valeur de départ par ascend() doit être déclarée
  « donnée de course » (liste RUN) ; vérifié qu'il signale « masteryPicks » si la ligne de l'it. 1122 est retirée.
  254 tests.
- 2026-11-13 (it. 1122, demande C) : un palier de maîtrise à choix franchi est annoncé (« Maîtrise : puissance :
  palier du rang 400 atteint ! +25 % attaque, ou +40 % dégâts critiques au choix. » ; clic : Talents, la maîtrise
  sélectionnée ; paliers franchis d'un coup regroupés, « et N autres »). Une seule fois dans la partie : le palier vu
  est noté dans masteryPicks (option « a », sans effet). DÉFAUT trouvé en route (it. 1107) : masteryPicks n'était pas
  gardé à l'ascension, les bonus choisis revenaient à « a » à chaque course : gardé. Test logique (annonce, une fois,
  choix gardé après ascension) ; vu en français et en russe ; save-fuzz ok ; autotest 221/221.
- 2026-11-13 (it. 1121, revue générale) : première heure (early-pace) : 1 / 7 / 18 / 31 / 59 / 114 objets, zone 2 → 23,
  6 déblocages à 60 min (inchangé) ; dix premières minutes (3 graines) : premier objet, boss et rare vers 77-84 s,
  onglet Talents 77-84 s, Quêtes ≈ 305 s, Boutique ≈ 550 s ; save-fuzz à partir de la fin de partie : ok (1183
  corruptions) ; mémoire sur 6 min (mem-watch) : réel 529-540 Mo, plat (pas de fuite ; un peu au-dessus du repère
  485-530 de CLAUDE.md, au fil des ajouts). Rien à corriger.
- 2026-11-13 (it. 1120, contrôles) : partie de fin de partie au grand graphe rempli (104 points en surplus), en russe :
  --crawl 500 clics sans erreur ; textes extraits : rien de non traduit (noms de langues et suffixes « Qa », voulus).
  --perf de la fin de partie (copies neuves) : guerrier bande 24,3 % / panneau 26,9 % / mini 7,7 % ; rôdeur (à
  distance) 22,8 / 24,9 / 7,1 : en ligne avec les it. 1065-1066 (24 et 24,5 %). Rien à corriger.
- 2026-11-13 (it. 1119) : contrôle d'autotest du grand graphe rempli : « Dépenser automatiquement » sur une partie de
  haut niveau remplit la fleur puis le graphe (258 nœuds), l'annonce part une seule fois et la ligne « points en
  surplus » s'affiche dans Compétences (it. 1115, 1117 : seulement en test logique jusqu'ici). Autotest 221/221.
- 2026-11-13 (it. 1118) : tableau des 20 héros (12 h, graines 7/3/11), le premier depuis l'it. 1017 (paliers et choix
  des maîtrises, grand graphe, etc. depuis) : moyenne 63,7 (inchangée), de 61,0 (assassin : 62/62/59) à 66,7
  (samouraï : 66/65/69) ; écart 5,7 zones, dans le bruit d'une graine (±4). Rien à rééquilibrer ; repères de
  hero-table.mjs et de CLAUDE.md mis à jour.
- 2026-11-13 (it. 1117) : grand graphe rempli (258 nœuds) annoncé une fois : bulle « Grand graphe complet ! Chaque
  point de compétence en plus donne désormais +0,1 % d'attaque et de PV » (clic : Compétences), moment du mode mini
  (S.skills.graphFullSeen). Vu en capture : une partie dont le graphe était déjà plein recevait en même temps
  « Le grand graphe s'ouvre… 104 points à y dépenser » (faux : rien à prendre) : l'ouverture n'est plus annoncée dans
  ce cas. Test logique (252) ; save-fuzz ok ; 9 langues ; autotest 220/220.
- 2026-11-13 (it. 1116) : « Quoi de neuf », édition 55 : valeur actuelle des synergies, voie entière dans la bulle,
  points en surplus du grand graphe rempli. 9 langues (i18n-quotes a relevé « Bonus actifs » mal cité en chinois :
  corrigé) ; pire cas sans défilement ; autotest 220/220 ; 10 langues sans défaut.
- 2026-11-13 (it. 1115) : points en surplus du grand graphe. Une voie par région : un chemin prend au plus 258 des 618
  nœuds (GRAPH_MAX_TAKE) ; la partie de fin de partie (48 h, record 150) avait déjà 362 points, dont 104 inutiles (le
  défaut « points en surplus » de l'it. 1018 revenait). Graphe rempli : chaque point de plus donne +0,1 % d'attaque et
  de PV (SURPLUS_BONUS, dans l'étage multiplicatif du graphe) ; « ✓ Grand graphe complet · 104 points en surplus :
  +10,4 % d'attaque et de PV ». Semaine simulée : guerrier 335 → 350, mage 324 → 349 (le mur suivant, écho de la
  zone 350, est atteint au lieu d'une longue stagnation) ; 12 h inchangées (guerrier 61). Test logique (251) ;
  9 langues (pluriels ru / pl vérifiés) ; autotest 220/220 ; 10 langues sans défaut. À DIRE À VICTOR : c'était sa
  proposition en attente (it. 1018) ; facile à régler (SURPLUS_BONUS) ou à retirer.
- 2026-11-13 (it. 1114, demande D, « de vrais choix ») : tant qu'aucune voie n'est choisie dans une région du grand
  graphe, la bulle de chacun de ses nœuds montre ce que donne la voie ENTIÈRE (« Toute la voie : +19,5 % or trouvé,
  +3,3 % attaque, +0,6 % d'attaque par puissance de 10 de l'or possédé ») : les trois voies exclusives se comparent
  avant de s'engager. Rien sur une voie fermée. Vérifié en français et en japonais ; 9 langues ; autotest 220/220.
- 2026-11-13 (it. 1113, demande D, synergies) : la bulle d'un nœud de synergie du grand graphe dit ce qu'il donnerait
  avec les statistiques actuelles (« En ce moment : ≈ +4,9 % attaque » ; heroStats garde graphSynUnit, la valeur d'un
  point de chaque synergie) : comparer deux voies devient un calcul. Partie de fin de partie : les 6 synergies, en
  français et en russe. Test logique (un point = part / points) ; 9 langues ; autotest 220/220.
- 2026-11-13 (it. 1112, demande D, synergies) : « Bonus actifs » (Compétences) montre ce que chaque synergie du grand
  graphe donne EN CE MOMENT, à côté de sa règle : « +0,6 % d'attaque par doublement de tes points de vie = +4,9 % »
  (graphLayer renvoie la part de chaque synergie, heroStats la garde dans graphSyn). La liste défilait de côté
  (lignes longues) : elle passe à la ligne. Test logique ; 9 langues ; autotest 220/220 ; 10 langues sans défaut.
- 2026-11-13 (it. 1111, revue générale) : 12 h simulées guerrier 61, rôdeur 62, mage 60 (repères tenus) ; --perf
  (copie neuve de dev-data) bande 19,2 %, panneau 20,5 %, mini 7,2 %, icône 0,5 % ; fuzz 1200 parties, 0 bloquée ;
  --crawl en polonais sur la fin de partie : 500 clics sans erreur ; textes russes de la fin de partie (grand graphe
  et choix de palier compris) : seuls les suffixes communs des grands nombres (« Qa », voulus) sont latins ; captures
  (Aventure fr, Boutique en, Compétences ja, mini) sans défaut. Rien à corriger.
- 2026-11-13 (it. 1110) : semaine simulée après les paliers des maîtrises (it. 1084) et les retouches du grand graphe :
  guerrier 335 (comme à l'it. 1078), mage 324 (320) ; montée régulière (guerrier : 125, 150, 170, 184, 198, 200, 250…).
  Repère de CLAUDE.md mis à jour.
- 2026-11-13 (it. 1109) : « Quoi de neuf », édition 54 : bonus au choix des paliers de maîtrise ; ouverture du grand
  graphe annoncée, pastille de ses points, « Réinitialiser le grand graphe » ; bulles du graphe à leur vraie valeur.
  Traduite dans les 9 langues ; pire cas (11 nouveautés) sans défilement ; 10 langues sans défaut ; autotest 220/220.
- 2026-11-13 (it. 1108) : contrôle d'autotest du choix d'un bonus de palier (grande fenêtre, option b enregistrée).
  Il a montré qu'une maîtrise sélectionnée allongeait la barre latérale des Talents (onglet à 1280 px : +15 px) : le
  lien « choisir · 6 » prend la place de la valeur « Paliers atteints » (une ligne de moins), les deux options du
  prochain palier passent au survol (« A / B ⓘ »). Le contrôle des lignes trop larges mesurait aussi le contenu d'un
  <details> replié (dans Chromium, getClientRects y répond) : exclu. Maîtrise sélectionnée, 1280 px : fr 471/471,
  de 489/489, ru 511/511 (sans défilement). README : choix des paliers, réinitialisation et annonce du grand graphe.
  Autotest 220/220.
- 2026-11-13 (it. 1107, demande C : « plus intéressant en termes de choix ») : chaque palier de maîtrise (10 à 400)
  propose deux bonus au choix (MASTERY_ALT ; « a », celui de l'it. 1084, par défaut : rien ne change pour une partie
  existante). Ex. puissance, rang 10 : +2 pts de critique OU +4 % de vitesse d'attaque ; endurance, rang 400 : +25 %
  de PV OU +25 % de défense. Détail d'une maîtrise : « Choisir les bonus des paliers (6) », ouvert dans la grande
  fenêtre (MODAL_DETAILS), l'option choisie en évidence ; le prochain palier montre « A ou B ». Sauvegarde :
  S.masteryPicks (« ms_power:10 » → « b »), validée. En route : les paliers au-delà de 400 n'avaient pas d'option A
  (plantage relevé par l'autotest) ; une maîtrise sélectionnée l'était seulement jusqu'au rendu suivant (le choix
  aurait été inaccessible) ; boutons illisibles dans la fenêtre (couleurs fixées). Test logique (250) ; save-fuzz ok ;
  autotest 219/219 ; 10 langues sans défaut ; capture en allemand à 1280 px.
- 2026-11-13 (it. 1106) : le mode mini annonce aussi l'ouverture du grand graphe (« ✦ Le grand graphe s'ouvre ! »,
  un de ses moments, comme un nouvel onglet ; capture en allemand sur la partie de fin de partie). L'astuce de la
  bande sur les compétences reste une présentation unique de l'arbre (la pastille et la bulle de l'it. 1105 suffisent).
  Autotest 219/219.
- 2026-11-13 (it. 1105) : l'ouverture du grand graphe se voit. Une fois la fleur complète, la pastille de l'onglet
  Compétences s'éteignait alors qu'il restait des centaines de points pour le graphe : elle compte maintenant les
  points libres du graphe (graphSpendable, en cache), et « À faire » aussi. Annonce unique (S.skills.graphSeen) : bulle
  « ✦ Le grand graphe s'ouvre autour de la fleur ! 362 points à y dépenser. », un clic ouvre les Compétences (capture
  sur la partie de fin de partie). Test logique (249) ; save-fuzz ok ; autotest 219/219.
- 2026-11-13 (it. 1104) : où passent les 12,7 points de la page en fin de partie ? Temps de script mesuré sur 10 s
  (fonctions enveloppées, injection TEMP) : dessin de la bande 77 ms, simulation (advance) 57 ms, écouteurs
  d'événements 43 ms, effets 26 ms, updateFx 13 ms, nombres flottants 3 ms : ≈ 140 ms / 10 s, soit ≈ 1,4 % d'un
  cœur. Le reste est le travail du navigateur (styles, mise en page, peinture) ; piste suivante, si besoin : un
  enregistrement Chromium (--trace) pour voir les recalculs de style. Rien à changer côté script.
- 2026-11-13 (it. 1103) : nouvelle décomposition de la bande en fin de partie (éléments masqués un à un, copies
  neuves) : base 24,3 % (GPU 10,1, page 12,7) ; sans les nombres de dégâts 23,4, sans les effets de sorts 23,4, sans
  le héros 23,7, sans étincelles / pièces / feux follets 23,4, sans barres de vie et affixes 24,2. Plus aucun poste
  au-dessus d'un point : les gros gains faciles sont faits (38 → 24 % aux it. 1064-1066). Le reste se partage entre
  le script du jeu (≈ 12,7) et le dessin du décor.
- 2026-11-13 (it. 1102) : valeur fausse dans le grand graphe : la bulle d'un nœud (et son libellé pour les lecteurs
  d'écran) montrait la valeur écrite dans les données, alors que l'échelle GRAPH_SCALE (0,3, it. 1078) s'applique au
  calcul : « +2 % d'attaque » pour 0,6 % réels. graphNodeEffects (valeur réelle, arrondie au centième) ; test logique :
  la somme des bulles égale les effets réels (248). Autotest 219/219.
- 2026-11-13 (it. 1101, revue générale) : simulation 12 h, records des courses : arbalétrier 41 → 62, danseur de lames
  42 → 65, berserker 44 → 64 (réguliers). Performance (copie neuve de dev-data) : bande 19,3 %, panneau 20,8 %, mini
  7,2 %, icône 0,5 %. Captures en coréen : Statistiques (Tico), Talents (Corvin), Familiers (Maman Brindille), mini :
  propres. Texte coréen de la fin de partie (graphe entamé) : HP, Lv, Qa, Qi (usuels). Rien à corriger.
- 2026-11-13 (it. 1100) : contrôle de santé après les ajouts du jour. scripts/fuzz.mjs 60 graines (1200 parties, les
  20 héros) : 0 bloquée. --crawl en russe sur la partie de fin de partie avec des nœuds du grand graphe pris (PNJ,
  graphe, réinitialisations, boutique, vente…) : 500 clics, aucune erreur.
- 2026-11-13 (it. 1099, demande D, étape D4) : bouton « Réinitialiser le grand graphe » dans les Compétences (visible
  dès qu'un nœud du graphe est pris ; deuxième clic pour confirmer) : vide le graphe seulement, la fleur reste, les
  voies redeviennent au choix (avant : « Tout réinitialiser » vidait aussi la fleur). Game.resetGraph ; test logique
  (réinitialiser, puis suivre une autre voie). Mesure ciblée (fin de partie avec des nœuds pris, de / ru / pl à
  1280 px) : aucun défilement. Autotest 219/219 ; 10 langues sans défaut.
- 2026-11-13 (it. 1098) : mémoire dans la durée après les ajouts du jour (grand graphe en SVG, dix PNJ et leurs
  images, cinématiques de rencontre) : scripts/mem-watch.sh 9 min à ×10 : « réel » 513 → 499 Mo, stable (repère
  485-530 Mo). Aucune fuite.
- 2026-11-13 (it. 1097) : « Quoi de neuf », édition 53 : les huit nouveaux PNJ (Corvin, Plume, Bram, Sola, Fenouil,
  Maman Brindille, Iris, Tico ; « clique-les pour les entendre »), « Vendre ce qui ne m'améliore pas » qui vend tout
  ce qui n'est pas une amélioration, plus de scène de rencontre perdue. Traduite dans les 9 langues ; pire cas (10
  nouveautés) sans défilement ; 10 langues sans défaut ; autotest 219/219.
- 2026-11-13 (it. 1096, demande H de Victor) : le bouton « Vendre ce qui ne m'améliore pas » (et la touche V) vend
  tout ce qui n'est pas une amélioration, légendaires et pièces de panoplie compris (Game.nonUpgradeItems ;
  sellUseless(true)). Les automatismes (vente quand le sac est plein, simulations, transmutation) gardent leur
  prudence : légendaires et pièces à compléter épargnés. Bulle et confirmation réécrites (« … légendaires et pièces
  de panoplie compris ») ; la fiche d'une pièce gardée précise que le bouton, lui, la vend. 3 textes traduits ; test
  logique (247) ; contrôles d'autotest (le bouton vend légendaire et pièces ; l'ancien contrôle « pièces gardées dites
  au survol » remplacé) : 219/219 ; 10 langues sans défaut.
- 2026-11-13 (it. 1095, demande E, étape E4 terminée) : dixième et dernier PNJ, Tico, l'écureuil scribe, tient les
  Statistiques (roux, queue en panache, lunettes, une plume ; 5 répliques : « Combien de noisettes vaut une pièce
  d'or ? Je cherche encore. »), au bout des sous-onglets. Scène : une souche creusée en bibliothèque, des livres,
  des feuilles qui s'envolent. Les 10 onglets qui se débloquent ont maintenant leur PNJ et leur rencontre (Corvin,
  Plume, Mirette, Bram, Sola, Fenouil, Orbo, Maman Brindille, Iris, Tico). Autotest 219/219 ; capture en russe ;
  10 langues sans défaut.
- 2026-11-13 (it. 1094, demande E, étape E4) : neuvième PNJ, Corvin, le vieux maître d'armes, tient les Talents, le
  premier onglet (zone 2) : première rencontre d'un nouveau joueur (crâne chauve, moustache blanche, tunique rouge,
  épée de bois ; 5 répliques qui expliquent l'onglet : « Un clic, et le talent monte aussi haut que tu le peux. »).
  Portrait dans le titre de la carte du héros. Scène : terrain d'entraînement, deux mannequins de paille frappés
  tour à tour, un râtelier ; Corvin posé au sol. « Voie » cité comme dans l'onglet (Vía, Via). Onglet Talents :
  première image 151-236 ms, comme avant (154-272). Autotest 218/218 ; 10 langues sans défaut. Détail : en espagnol,
  le sous-titre du titre (« 0 puntos libres · 1322 en total ») passe sur deux lignes à côté du portrait (sans
  défilement). Reste : Statistiques.
- 2026-11-13 (it. 1093, demande E, étape E4) : huitième PNJ, Iris, la jardinière des étoiles, tient les Compétences
  (chapeau de paille fleuri, robe bleue, un arrosoir ; 5 répliques : « Les voies du grand graphe ? On n'en suit
  qu'une par pétale. Choisis bien. ») : portrait dans le titre de la barre latérale (l'onglet n'est construit qu'une
  fois : emplacement mis à jour par update). Scène de rencontre : une arche fleurie, six fleurs d'étoile aux couleurs
  des pétales qui s'allument une à une ; Iris posée au sol. Autotest 217/217 ; capture en allemand ; 10 langues sans
  défaut. Restent : Talents, Statistiques.
- 2026-11-13 (it. 1092) : rencontres de PNJ, deux réserves des it. 1089-1091. File d'attente des cinématiques portée
  de 3 à 5 (la zone 10 en déclenche 3 d'un coup : héros libéré, chronique, Bram ; essai : 5 d'un coup, 1 jouée et
  4 en attente, aucune perdue). Sans porte (tente de Fenouil, nid de Maman Brindille), le PNJ est posé au sol au lieu
  de flotter à hauteur de seuil (capture). Autotest 216/216.
- 2026-11-13 (it. 1091, revue générale) : simulation 12 h, records des courses : lancier 44 → 62, gladiateur 44 → 64,
  chaman 44 → 66 (réguliers). Performance (copie neuve de dev-data) : bande 19,4 %, panneau 20,6 %, mini 7,2 %,
  icône 0,5 %. Captures en japonais : Quêtes (Plume), Héros (Bram), Bestiaire (Fenouil), mini : propres. Texte
  japonais de la fin de partie : HP, Lv, pt, Qa, Qi, BGM (usuels). À surveiller : en zone 10, trois cinématiques
  arrivent ensemble (héros libéré, chronique, rencontre de Bram) ; la file en garde 3 : juste.
- 2026-11-13 (it. 1090, demande E, étape E4) : septième PNJ, Maman Brindille, l'éleveuse, tient les Familiers
  (chignon gris, tablier fleuri, un œuf dans les mains ; 5 répliques : « Chut… celui-là dort. Il a beaucoup couru
  aujourd'hui. »). La barre des Familiers est déjà pleine (œufs, intendant, expéditions) : nouvelle variante
  « portrait seul » de la pastille (réplique au survol, une autre au clic), en tête de la barre. Scène de rencontre :
  un arbre, un grand nid de paille, trois œufs dont un qui tremble. Onglet Familiers : première image 153-217 ms,
  comme avant (154-199). Autotest 216/216 ; capture en allemand à 1280 px ; 10 langues sans défaut. Restent :
  Talents, Compétences, Statistiques. Détail : sans porte (tente, nid), le PNJ apparaît un peu au-dessus du sol.
- 2026-11-13 (it. 1089, demande E, étape E4) : sixième PNJ, Fenouil, le naturaliste, tient le Bestiaire (chapeau
  d'explorateur, lunettes, une loupe ; 5 répliques : « Ne me rapporte pas de gobelin vivant. Plus jamais. ») : au bout
  de la rangée des sous-onglets (.subrow). Scène de rencontre : sa tente de toile, des bocaux qui luisent, un
  papillon qui s'échappe. Contrôle d'autotest des PNJ étendu (215/215) ; capture en polonais (sous-onglets du
  Bestiaire sur une ligne à 1280 px) ; 10 langues sans défaut. Restent : Talents, Compétences, Familiers, Statistiques.
- 2026-11-13 (it. 1088, demande E, étape E4) : cinquième PNJ, Sola, la cartographe, tient la Carte (longue tresse,
  foulard vert, une carte roulée sous le bras ; 5 répliques : « Au-delà de la zone 100, mes cartes se répètent…
  c'est étrange. »), dans le titre de la carte du Rebord. Scène de rencontre : une tour de guet en bois, des cartes
  épinglées, une longue-vue qui balance (première version trop haute, coupée par le haut de la bande de 120 px :
  raccourcie). Contrôle d'autotest des PNJ étendu (214/214) ; capture en allemand (fin de partie, 1280 px) ; 10
  langues sans défaut.
- 2026-11-13 (it. 1087, demande E, étape E4) : quatrième PNJ, Bram, le serrurier des cages, tient l'onglet Héros
  (barbe rousse, tablier de cuir, une grosse clé ; 5 répliques : « Les barreaux sont faits d'éclats d'étoile. Ça tord
  mes limes. ») : au bout de la rangée des sous-onglets (nouvelle rangée commune .subrow : rien ne grandit). Scène de
  rencontre : son atelier de pierre, des clés pendues, une enclume qui crache des étincelles, une cage qui s'ouvre.
  « le Briseur » nommé comme le boss dans chaque langue (Starbreaker, Rompeestrellas, 星砕き…). Avant cela, mesure du
  grand graphe : mise à jour de l'onglet Compétences 3,3 ms (graphe vide), 2,2 ms (258 nœuds pris) : rien à faire.
  Contrôle d'autotest des PNJ étendu (213/213) ; capture en russe ; 10 langues sans défaut.
- 2026-11-13 (it. 1086, demande E, étape E4) : troisième PNJ, Plume, la chouette de la guilde, tient les Quêtes
  (plumes brunes, grands yeux, une lettre au bec ; 5 répliques : « Un contrat t'ennuie ? Change-le, je ne dirai
  rien. »). Pastille dans le titre de la carte « Guilde des aventuriers » ; scène de rencontre : un poteau au
  carrefour, le panneau couvert d'affiches, une lettre qui s'envole. Contrôle d'autotest généralisé à tous les PNJ en
  pastille (212/212) ; capture en allemand à 1280 px et de la scène ; 10 langues sans défaut. 7 textes traduits.
- 2026-11-13 (it. 1085, demande D, étape D6) : « Quoi de neuf », édition 52 (grand graphe et ses synergies ; Mirette
  et Orbo avec leurs scènes de rencontre ; Boutique sans défilement ; dégâts au-dessus du monstre et chroniques
  numérotées ; talents en un clic et paliers des maîtrises), traduite dans les 9 langues (« Renouveler l'étal » cité
  comme traduit : i18n-quotes à 0) ; « Quoi de neuf » au pire cas sans défilement (9 nouveautés). README : grand
  graphe, PNJ, paliers des maîtrises, clic des talents.
- 2026-11-13 (it. 1084, demande C de Victor, suite : « on met juste des points à l'infini ») : paliers des maîtrises.
  Chaque maîtrise donne, aux rangs 10, 25, 50, 100, 200 et 400, un bonus d'un AUTRE genre (puissance : critique,
  dégâts critiques, dégâts aux boss, frappe double, exécution, +25 % d'attaque ; endurance : régénération, bouclier,
  épines, vol de vie, esquive, +25 % de PV ; fortune : expérience, butin, hors ligne, or…), puis à chaque doublement
  (800, 1600…). La tuile montre le prochain palier (« rang 420 → 800 ») ; le détail, le nombre de paliers atteints
  (liste au survol) et le prochain. Équilibre en 12 h : 63,2 → 63,2 (les maîtrises arrivent plus tard). En route :
  taille fractionnaire du « → 800 » (autotest des polices), tuiles trop chargées en polonais à 1280 px (le palier se
  cache quand la pastille « tout » est là), contrôle de la transmutation rendu déterministe (sac entièrement vidé,
  communs sans statistique). Test logique (246) ; autotest 211/211 ; 10 langues sans défaut.
- 2026-11-13 (it. 1083, défaut G noté à l'it. 1074) : Chroniques dans la grande fenêtre sans défilement de côté. La
  liste (hauteur limitée) mise en colonnes CSS par la fenêtre débordait de côté au-delà de 4 entrées. Grille de deux
  colonnes (lue 1 2 / 3 4…, dans l'ordre de l'histoire), qui défile verticalement ; hauteur bornée pour que la fenêtre
  elle-même ne défile pas (deux barres sinon). Mesure (fin de partie, allemand, 1366 et 1280 px) : liste 857/857 de
  large, fenêtre 435/435 de haut. Contrôle d'autotest ajouté ; 10 langues sans défaut.
- 2026-11-13 (it. 1082, demande E, étape E4) : deuxième PNJ, suggéré par Victor : Orbo, l'astronome à la fusée, tient
  l'Ascension (casque de verre, combinaison orange ; 5 répliques : « Trois… deux… un… Bon, demain peut-être. »).
  Pastille compacte dans le titre de la carte Ascension (portrait, bulle sur une ligne, texte entier au survol ; rien
  ne grandit), réplique suivante au clic. Scène de rencontre quand l'onglet s'ouvre : une colline, sa fusée bricolée
  (qui tremble, crache une flamme… et s'éteint), sa cabane à outils. Pastille commune à tous les onglets (ui/npc.js,
  action « npc-talk » ; la Boutique l'utilise aussi). Piège : un attribut data-tab sur un bouton du panneau l'ouvre
  comme un lien d'onglet (le clic ne faisait rien d'autre) : data-npc. 7 textes traduits ; contrôle d'autotest
  (210/210) ; captures de/ru à 1280 px et de la scène ; 10 langues sans défaut.
- 2026-11-13 (it. 1081, revue générale) : simulation 12 h, records des courses : assassin 44 → 62, samouraï 41 → 65,
  prêtresse 40 → 62 (réguliers). Performance (copie neuve de dev-data) : bande 19,1 %, panneau 20,2 %, mini 7,2 %,
  icône 0,6 %. Captures : grand graphe en chinois (fin de partie, porte et voie de la Vitalité prises : « 大星图：358
  个可用点数 · 4 / 618 个节点 »), Boutique en chinois (Mirette et sa bulle, sans défilement), Talents en anglais,
  mini en chinois : propres. Texte chinois de la fin de partie : Qa, Qi (abréviations des nombres). Rien à corriger.
  Rappel : dans dev-data, les Maîtrises en sont au rang 420 (reste de la demande C).
- 2026-11-13 (it. 1080, demande C de Victor, premier pas : « trop de clics ») : onglet Talents, un clic sur un talent le
  monte au MAXIMUM possible (avant : +1 rang par clic, un petit « max » à viser) ; la petite pastille devient « +1 »
  (un seul rang ; aussi Maj + clic / Maj + Entrée). Maîtrises inchangées (+1 au clic, « tout » sur la pastille : pas
  de points vidés par surprise). Note de l'onglet réécrite et traduite. Contrôles d'autotest mis à jour (209/209) ;
  10 langues sans défaut. Reste de la demande C : des Maîtrises plus riches que « des points à l'infini ».
- 2026-11-13 (it. 1079, demande E, étape E3) : rencontre de Mirette sur la bande quand la Boutique s'ouvre (zone 8) :
  sa maisonnette violette sur un grand nénuphar, au bord de l'eau (dessinée sur le canevas de la cinématique) ; le
  héros marche jusqu'à la porte et entre, Mirette apparaît sur le seuil ; titre « Mirette, la grenouille marchande »
  / « Nouvel onglet : Boutique ! », puis sa première réplique. Nouvelle cinématique « npc » (juice.js, npcPlace : un
  décor par PNJ), lancée par l'ouverture d'un onglet qui a un PNJ ; réglage « Cinématiques » respecté, clic pour
  passer. Captures à trois moments ; contrôle d'autotest (209/209).
- 2026-11-13 (it. 1078, demande D, étape D5) : équilibrage du grand graphe. Ses +% s'ajoutaient aux autres sources
  (des milliers de % en fin de partie) : 5 nœuds d'attaque valaient +0,007 %. Attaque, PV et défense du graphe forment
  maintenant un étage MULTIPLICATIF à part (graphLayer, heroStats) ; les synergies PV ↔ attaque suivent le DOUBLEMENT
  du multiplicateur (log2 ; libellés « par doublement de tes points de vie », traduits), l'or sa puissance de 10, les
  autres sont plafonnées par le jeu. Graphe complet à pleine valeur : puissance ×126 (≈ 60 zones) ; échelle
  GRAPH_SCALE 0,3 : attaque ×2,3, PV ×1,4, puissance ×6,1 (≈ 23 zones). Dépense automatique (Game.autoSpendGraph :
  voie déjà choisie, sinon une voie par défaut, grands nœuds d'abord) : le bouton « Dépenser automatiquement » et la
  dépense à chaque niveau continuent dans le graphe une fois la fleur pleine ; simulate.js l'utilise. Semaine
  simulée, avant → après : guerrier 293 → 335, mage 293 → 320, montée régulière (à pleine valeur : 128 → 236 en une
  course). 2 tests (245) ; autotest 208/208. CLAUDE.md (repère).
- 2026-11-13 (it. 1077, demande D, étape D3) : le grand graphe s'ouvre quand toute la fleur est acquise. Clic (ou
  Entrée au clavier) sur un nœud relié pour l'apprendre ; la porte de chaque région s'ouvre depuis la clé de voûte de
  son pétale ; choisir le premier nœud d'une voie ferme les deux autres de la région (bulle : « Choisir cette voie
  ferme les deux autres », puis « Voie fermée : dans cette région, tu suis « … » »). États comme la fleur (acquis,
  prévu, apprenable, verrouillé) plus « fermé » ; icônes (synergies : celle de l'axe d'origine) et noms des grands
  nœuds une fois ouvert. Barre latérale : « Grand graphe : N points libres · X / 618 nœuds » ; bonus actifs du graphe
  compris. « Annuler le dernier » retire d'abord le dernier nœud du graphe ; « Tout réinitialiser » vide les deux.
  Effets de synergie décrits en clair (EFFECTS). 96 nouveaux textes traduits dans les 9 langues (19 noms existants
  réutilisés ; « Masse » existait au sens de l'arme : renommé « Corpulence »). Capture (partie de fin de partie) ;
  texte russe de l'onglet sans mot français ; test logique (244) ; autotest 208/208 ; 10 langues sans défaut. Les
  effets restent à régler (D5 : +0,007 % d'attaque pour 5 petits nœuds en fin de partie : bien trop faible).
- 2026-11-13 (it. 1076, demande D, étape D2) : le grand graphe apparaît dans l'onglet Compétences, grisé, autour de
  la fleur (silhouette des 618 nœuds, des voies et de l'anneau, traits pointillés, couleur du pétale à peine visible ;
  dessiné sous la fleur). Au survol : « Grand graphe : 618 nœuds autour de la fleur… S'ouvre quand toute la fleur est
  acquise : N / 144 » (fleur déjà complète : « Bientôt : il s'ouvrira dans une prochaine mise à jour »). Zoom arrière
  jusqu'à 0,15 pour le voir en entier. Pas encore de noms (à traduire, étape D3) ni de prise. Mise à jour du panneau
  sur l'onglet : 6,8 ms ; première image de l'onglet 158-200 ms, comme avant (160-274 ms). 5 textes traduits dans les
  9 langues ; autotest 208/208 ; 10 langues sans défaut.
- 2026-11-13 (it. 1075, demande D de Victor, étape D1) : données et règles du grand graphe autour de la fleur
  (game/skillgraph.js), pas encore affiché. 618 nœuds (4,3 fois la fleur), tracés par le code : 6 régions, une par
  pétale, chacune ouverte par une porte reliée à la clé de voûte du pétale ; 3 VOIES exclusives par région (le
  premier nœud d'une voie ferme les deux autres), 30 nœuds chacune avec 3 remarquables et une clé de voie ; un anneau
  extérieur (72 nœuds) relie le bout des voies, avec une couronne par région et un pont entre pétales voisins. La 3e
  voie de chaque région est une voie de SYNERGIE (précision de Victor) : attaque selon les PV en plus (Colosse
  furieux), attaque selon l'or possédé (Or tranchant), PV selon l'attaque, dégâts critiques selon la vitesse, brûlure
  selon les critiques, attaque selon l'esquive ; calculées dans heroStats à partir des totaux avant synergie (pas de
  boucle). Points : le surplus une fois la fleur entière payée ; choix gardés à l'ascension (S.skills.outer), actifs
  dans la limite des points, comme la fleur. Sauvegarde : outer validé (inconnus, doublons). 3 tests logiques
  (243) ; save-fuzz dev et fin : ok ; autotest 208/208. À suivre : D2 (affichage grisé autour de la fleur).
- 2026-11-13 (it. 1074, demande de Victor) : Chroniques dans l'ordre de l'histoire, numérotées (1. Le ciel brisé, 2. Le
  premier captif…), les reliques gagnées à leur place (avant : les plus récentes d'abord, les reliques à part en tête).
  Chaque chronique garde maintenant le record de zone de son déblocage (story.read[id], qui valait true) : il ne
  redescend jamais, l'ordre est donc celui vécu par le joueur. Anciennes sauvegardes : la zone de la chronique sur la
  carte (Renaissance : zone 20, l'ascension la plus précoce), reliques : la zone de leur boss. Test logique ; capture
  (partie de fin de partie) : 11 entrées dans l'ordre.
- 2026-11-13 (it. 1073, demande E de Victor, premières étapes) : les PNJ de l'histoire. game/npcs.js (un PNJ par onglet :
  nom, lieu, art, répliques) et render/art-npcs.js (même format que les monstres). Premier PNJ : Mirette, la grenouille
  marchande (chapeau violet, écharpe rouge), en haut de la Boutique à côté de la bourse, avec une bulle : une réplique
  toutes les 30 s, une autre à chaque clic (5 répliques, traduites dans les 9 langues ; « le Rebord » nommé comme
  ailleurs dans chaque langue). Dans la hauteur de la barre : rien ne grandit. Test logique (réplique stable 30 s,
  la suivante au clic) et contrôle d'autotest (208/208) ; captures fr / de à 1280 px ; 10 langues sans défaut.
  À suivre : les PNJ des autres onglets (E4), la rencontre animée sur la bande (E3).
- 2026-11-13 (it. 1072, demande B de Victor, précisée : « aucun défilement horizontal, même sur les petits écrans ») :
  Boutique > Marchand sans aucune rangée latérale, à toute largeur. Marchand : 4 objets sur une rangée ; Potions et
  élixirs : 7 tuiles compactes sur deux rangées de 4 (icône, effet, état, prix ; le nom dans la bulle ; la case
  « auto » sur la ligne du stock) ; Coffres et œuf : deux rangées de 2 (rareté écrite, nom et niveau dans la bulle).
  Colonnes 4,5 / 4 / 2. « Renouveler l'étal » et le compte à rebours passent dans le titre de la carte du Marchand,
  juste au-dessus des objets qu'il renouvelle (sous-titres des cartes dans la bulle de leur titre). Captures fr 1440,
  en / de / ru 1280 : tout visible, sans défilement. lang-overflow : un mot coupé en allemand à 1280 px
  (« Schattentänzers ») ; noms du Marchand en 12 px et sa colonne élargie : 10 langues sans défaut.
- 2026-11-13 (it. 1071, revue générale) : simulation 12 h, records des courses : paladin 44 → 64, moine 45 → 64,
  druide 44 → 62 (réguliers). Performance (copie neuve de dev-data) : bande 19,6 %, panneau 21,5 %, mini 7,0 %, icône
  0,5 %. Texte coréen : HP, Lv (usuels). Captures de la Boutique (fr 1440, en 1280, ko 1440) : confirment la demande B
  de Victor : « Renouveler l'étal » tout en haut à droite, loin des 4 objets du Marchand ; à 1440 px, 3 objets visibles
  sur 4 (défilement horizontal), à 1280 px 2 et demi ; Potions et Coffres défilent aussi. À traiter à l'it. 1072.
- 2026-11-13 (it. 1070, demande A de Victor) : nombres de dégâts trop loin à droite du monstre. Le point de départ
  était bon (centré, ≈ 8 px à gauche du centre du monstre) ; la place libre cherchée pour ne pas recouvrir les autres
  nombres partait d'abord à DROITE, d'un à trois pas d'≈ 60 px. Mesure en fin de partie (10 s, 71 nombres) : 21 décalés
  à droite. Maintenant : toutes les rangées au-dessus du monstre, puis au-dessous, puis de petits pas de côté
  (demi-largeur + 4 px, deux au plus), à gauche et à droite tour à tour ; face à un boss seulement, les anciens grands
  pas (il faut sortir de la largeur de son nom). Après : ≈ 72 % sur place (48 % avant), 4 à 8 à droite, au plus 100 px
  (≈ 180 avant). Capture : colonne au-dessus du monstre combattu. Autotest 2 × 207/207 (chevauchements, nom du boss).
- 2026-11-13 (it. 1069) : retour après 8 h d'absence en fin de partie (russe, allemand, 1280 px) : résumé du journal
  propre (« За 8 ч : 312 монстров… », « Während 8 Std.: … »). Vu en passant : la partie de fin de partie
  (scripts/fixtures/endgame-save.json, produite par simulate.js) avait story.intro = false (la simulation n'ouvre jamais
  l'interface) : chaque capture ou mesure la lançait par la cinématique d'introduction, et « Quoi de neuf » ne pouvait
  pas s'y afficher. Corrigé dans la sauvegarde et dans DUMP= de simulate.js (aucun vrai joueur n'est concerné). Les
  mesures --perf faites sur cette sauvegarde avant l'it. 1069 incluaient peut-être la cinématique dans leurs premières
  secondes : comparer avant / après sur le même état. FUZZ_BASE=fin : ok (1169 corruptions) ; 10 langues sans défaut.
  Autotest : la transmutation a encore échoué une fois ; le diagnostic de l'it. 1066 montre « sac 0+00 » (un des trois
  communs est une amélioration, tiré pour un emplacement vide) : l'emplacement équipé imposé (essayé à l'it. 1066 puis
  retiré à tort) était une deuxième cause ; remis.
  Pièces de panoplie gardées (info-bulle) : une pièce pouvait être une amélioration selon l'équipement laissé par les
  contrôles précédents ; le nombre attendu est maintenant calculé par le jeu (4 × 207/207).
- 2026-11-13 (it. 1068) : « Quoi de neuf » relisible : bouton dans Réglages > Aide (la carte « Raccourcis clavier »
  devient « Aide », mot traduit dans les 9 langues), les trois dernières éditions. Avant, la seule entrée était la bulle
  du lancement (15 s, après 6 s), et l'édition était marquée lue dès le lancement : manquée, elle était perdue.
  Contrôle d'autotest (207/207) ; captures des Réglages à 1280 px en allemand et en russe (boutons sur deux lignes,
  sans défilement) ; 10 langues sans défaut. README.
- 2026-11-13 (it. 1067) : « Quoi de neuf », édition 51 : la bande consomme environ un tiers de processeur en moins
  pendant les combats de fin de partie (it. 1064-1066 : 38 → 24 %) ; Bestiaire plus rapide, « complet » traduit
  (it. 1060-1062). « La bande » nommée comme ailleurs dans chaque langue (Streifen, 长条, 막대…). Chasse aux bugs :
  --crawl sur la partie de fin de partie en russe (384 clics) et sur la sauvegarde maximale en polonais (351 clics) :
  aucune erreur. 10 langues sans défaut (« Quoi de neuf » au pire cas compris).
- 2026-11-13 (it. 1066) : performance en fin de partie, héros à distance. La partie de fin de partie joue un guerrier :
  les projectiles n'y paraissaient pas. Avec un rôdeur (copie modifiée), les projectiles valaient ≈ 7 points (31,4 →
  24,2 % masqués) : aux rangs 1 à 4, jusqu'à trois drop-shadow, et trois projectiles par coup dès le rang 3. Leur lueur
  est maintenant un halo en dégradé radial (.projglow, rayon PROJ_GLOW par rang) qui voyage derrière le projectile,
  peint une fois. Capture côte à côte (flèche, boule de feu, rangs 1 à 4) : halo rond au lieu d'épouser la forme, même
  intensité. Copies neuves, avant → après : rôdeur 30,7 / 31,0 → 24,6 / 24,5 % (GPU 16,6 → 10,1) ; dev-data (guerrier,
  aucun projectile) 19,3-19,4 des deux côtés (une première mesure à 20,8 : bruit, refaite deux fois). CLAUDE.md.
  Autotest : la transmutation échouait encore une fois sur deux malgré les trois essais (it. 1064). Vraie cause, trouvée
  par un diagnostic ajouté au message d'échec : la fenêtre de confirmation est permanente, seulement masquée ;
  l'attente « confirmation présente » réussissait tout de suite et le clic visait le bouton caché. Attente d'une
  fenêtre VISIBLE (CONFIRM_SHOWN) ; les trois essais de l'it. 1064, inutiles, retirés.
- 2026-11-13 (it. 1065) : performance en fin de partie, suite. Nouvelle décomposition (éléments masqués un à un) :
  l'entaille du héros valait ≈ 8 points (barres de vie, affixes, relique portée : bruit). Aux rangs 2 à 4, sa lueur
  était un filtre CSS (trois drop-shadow jusqu'à 18 px au rang 4) recalculé à chaque coup (la lame s'allume et s'éteint
  sans cesse). Elle est dessinée une fois dans une image (bakedSlash : canevas ×3, ombres appliquées en cascade comme
  les filtres, mise en cache par rang et couleur) ; capture côte à côte : même rendu, sans les coutures entre blocs.
  Copies neuves, 2 mesures, avant → après : bande 31,7 / 32,0 → 23,8 / 23,8 %, panneau 34,2 / 33,2 → 25,0 / 25,5 %
  (GPU 17,7 → 9,9) ; dev-data inchangé. Depuis l'it. 1063, bande de fin de partie 38 → 24 %. @keyframes orphelines
  retirées. CLAUDE.md.
- 2026-11-13 (it. 1064) : performance en fin de partie. Décomposition de la bande (partie de fin de partie, classes
  masquées une à une par CSS en injection TEMP, part GPU de --perf) : étincelles −0,8, nombres de dégâts −1, sorts −6,
  dont tout sur les ANNEAUX (une quinzaine en 10 s) : leur animation CSS de 0,55 s faisait repeindre la bande au rythme
  du compositeur. Anneaux et dôme grandissent maintenant dans updateFx (échelle arrondie au 1/20) ; icône des sorts du
  mode mini animée dans draw() (son animation CSS changeait margin-top : remise en page à chaque image). Copies neuves,
  2 mesures, avant → après : bande 38,3 / 37,6 → 32,3 / 31,2 %, panneau 37,4 / 41,0 → 32,5 / 33,7 %, mini 9,2 / 9,0 →
  7,5 / 7,4 % ; dev-data inchangé (19,9 → 19,6). Anneau vérifié (échelle 0,6 → 1 → 1,25, retiré à 0,5 s). Autotest :
  la transmutation échouait une fois sur trois (clic réel tombé à côté) : jusqu'à trois essais ; l'info-bulle
  des pièces de panoplie gardées aussi (selon l'équipement : avec la panoplie « dusk » déjà portée,
  les deux pièces activaient un bonus et devenaient des améliorations) : panoplie non portée, sac vidé pendant la mesure. CLAUDE.md.
- 2026-11-13 (it. 1063) : scripts/max-save.mjs : sauvegarde « tout au maximum » (fin de partie + 12 345 victoires par
  monstre, collection, pouvoirs, panoplies, 64 succès, 20 héros, reliques niveau 5, record 400). Débordements en fr,
  ru, de à 1280 et 1920 : aucun ; texte extrait en russe et en allemand : rien de non traduit (« (complet) » de l'it.
  1062 : 83 fois traduit). CLAUDE.md.
- 2026-11-13 (it. 1062) : Bestiaire : un monstre au dernier palier (10 000 victoires) affichait « (complet) » en
  français dans toutes les langues (chaîne en dur, hors tx ; aucune sauvegarde de test n'atteint ce palier, 452 au
  plus : les extractions de texte ne pouvaient pas le voir). Traduit dans les 9 langues. Balayage des chaînes
  françaises écrites en dur dans l'interface (script jetable) : pas d'autre cas. Autotest 206/206.
- 2026-11-13 (it. 1061, revue générale) : simulation 12 h, records des courses : artificier 44 → 62, gardien des astres
  44 → 69, nécromancien 39 → 62 (réguliers). Performance (copie neuve) : bande 19,7 %, panneau 20,5 %, mini 7,1 %,
  icône 0,5 %. Captures Aventure et Boutique à 1366 px en français, anglais et japonais (« 装備 » sur une ligne),
  mini en japonais : propres. Texte japonais : HP, Lv, pt, BGM (usuels). Rien à corriger.
- 2026-11-13 (it. 1060) : Bestiaire : seule la section affichée est construite (avant : les 83 fiches et toutes les
  autres sections à chaque mise à jour, pour n'en garder qu'une). Panoplies 11 → 2,0 ms, Capacités des boss → 1,6 ms ;
  la section des monstres reste à ≈ 12 ms (83 fiches et images reconstruites : leurs compteurs changent à chaque
  victoire ; une mise à jour en place serait le prochain pas, gain modeste). 10 langues sans défaut ; autotest 206/206.
- 2026-11-13 (it. 1059) : lang-overflow en parallèle : le script se relance pour chaque langue, 3 à la fois (PAR=n ;
  PAR=1 : à la suite), sorties remises dans l'ordre, défauts additionnés : 5 min 15 → 2 min 32. Vérifié sur un défaut
  volontaire (notes de la carte Zone en 20 px) : 4 mesures en défaut signalées, code de sortie 1. CLAUDE.md.
- 2026-11-13 (it. 1058) : interface à 130 %, fin de partie, à 1366 et 1600 px dans les sept langues pas encore vues
  (en, es, pt, pl, zh, ja, ko) : sans défaut. Avec les it. 1046-1048 : le zoom 130 % est propre dans les 10 langues à
  1366, 1600 et 1920 px.
- 2026-11-13 (it. 1057) : README, tableau des scripts : hero-table (20 héros, horloge virtuelle) et lang-overflow
  (10 langues, 4 largeurs, fin de partie, zoom 130 %).
- 2026-11-13 (it. 1056) : README à jour sur les panoplies (pièces gardées de toute panoplie jamais complétée, 6 au
  plus ; complétion d'un clic depuis « À faire » et le Bestiaire ; équipement d'avant remis ; réplique). Essai
  d'instrumentation du rythme des rendus du panneau sans résultat (compteurs à 0 : autre chemin de rendu) : abandonné,
  l'Aventure coûte ≈ 10 ms par mise à jour, raisonnable.
- 2026-11-13 (it. 1055) : effet du cache de l'it. 1054 sur dev-data (copies neuves) : panneau ouvert 20,2 / 20,4 %
  (avant 20,4-20,7), bande 19,3 / 19,4. Repère par onglet (fin de partie, JavaScript d'un affichage complet après un
  changement d'état) : Aventure 10,1 ms, Bestiaire 11,0 (construit toutes ses sous-sections puis en garde une ; les
  compteurs de victoires changent à chaque monstre : peu à gagner sans refonte), Carte 5,3, Héros 4,9, Statistiques
  4,7, Boutique 3,3, Réglages 3,2, Familiers 2,8, Ascension 2,3, Talents 1,8, Compétences 1,3, Quêtes 1,2. Aucun
  changement.
- 2026-11-13 (it. 1054) : performance du panneau. Les alertes « [lent] » de l'autotest montraient l'Aventure à 14-23 ms de
  JavaScript par affichage (autres onglets : 2-5). Mesuré (fin de partie) : renderAll 27 ms, dont renderBag 7 ms :
  chaque objet du sac appelait isUpgrade plusieurs fois par affichage (cases, objets inutiles, pièces gardées), et
  chaque appel recalculait deux fois les statistiques complètes du héros. Game.upgradeDelta mémorisé par objet jusqu'au
  prochain changement d'état (vidé par changed() et invalidateStats()), base = statistiques déjà en cache : renderBag
  7,0 → 0,46 ms, renderAll après un changement 27 → 9,8 ms. Simulations 12 h (guerrier, rôdeur) identiques course
  par course à celles d'avant (aucune décision changée), un peu plus rapides. Un test modifiait setsDone sans
  invalidateStats (le jeu le fait toujours, equip()) : aligné. Autotest 206/206.
- 2026-11-13 (it. 1053) : interface agrandie : la bulle d'info du panneau (placée dans #panel, zoomé) était positionnée
  en coordonnées d'écran : à 130 %, elle s'affichait jusqu'à 216 px de la souris (sonde : 13 px à 100 %). Coordonnées
  ramenées dans le panneau (division par le zoom), au survol et au clavier ; de même pour le glisser des rangées
  (hscroll) et de l'arbre de compétences (glisser, zoom à la molette), qui allaient 30 % trop vite. Contrôle d'autotest
  (zoom 1,3, bulle à 21 px ; 224 sans le correctif). Contrôle de l'it. 1022 rendu stable (deux emplacements équipés :
  sur un emplacement vide, la pièce était une amélioration). Trois passages à 206/206.
- 2026-11-13 (it. 1052) : « Quoi de neuf », édition 50 : moments du mode mini en entier ; panneau mieux disposé de 1500
  à 1800 px et avec l'interface à 115 / 130 %. 10 langues sans défaut (« Quoi de neuf » au pire cas, fin de partie à
  1600 px et à 130 % compris) ; autotest 205/205.
- 2026-11-13 (it. 1051, revue générale) : simulation 12 h, records des courses : danseuse de lames 42 → 65, berserker
  44 → 64, arbalétrier 41 → 62 (réguliers). Performance (copie neuve) : bande 19,5 %, panneau 20,7 %, mini 6,9 %, icône
  0,8 %. Captures Bestiaire et Talents à 1366 px en français, anglais et coréen (« 30점부터 », it. 1001), mini en
  coréen : propres. Texte coréen : HP et Lv seulement. Rien à corriger.
- 2026-11-13 (it. 1050) : mémoire dans la durée après les ajouts récents (répliques, bulles, contours en cache) :
  mem-watch 8 min à ×10 : « réel » 498-510 Mo, stable (repère 485-530). Rien à corriger.
- 2026-11-13 (it. 1049) : bande en haut de l'écran (settings.json edge = top), russe, fin de partie après 8 h
  d'absence : bulle du résumé sous la bande, panneau ouvert vers le bas : propres. Rien à corriger.
- 2026-11-13 (it. 1048) : interface agrandie (115 / 130 %) à 1366 et 1600 px : les Réglages défilaient de 3 à 11 px, à
  cause de la phrase « Limité à 107 % par la largeur de l'écran » ajoutée sous les boutons de taille ; quand
  l'agrandissement est plafonné, elle remplace la phrase générale (passée en info-bulle). fr, ru, de à 1366 / 1600,
  115 / 130 % : sans défaut. lang-overflow mesure aussi la fin de partie à 1920 px et 130 % (« fin 1920 × 130 % »,
  NO_ZOOM=1 pour la sauter) : 10 langues sans défaut (5 min 15). Autotest 205/205. CLAUDE.md.
- 2026-11-13 (it. 1047) : écrans de 1500 à 1799 px (1600 × 900, 1680 × 1050). La grille large de l'Aventure s'appliquait
  dès 1500 px et la colonne du héros tombait à 264 px (≈ 314 à 1499) ; la colonne Zone, étroite, faisait défiler la fin
  de partie en russe (19 px), les Statistiques aussi (46), un libellé de tuile allemand était coupé à 1500. Grille
  large dès 1800 px ; Zone, Statistiques et Réglages compacts jusqu'à 1800 px. lang-overflow mesure aussi 1600 px
  (dev-data et fin de partie) : 10 langues sans défaut à 1920, 1600, 1366 et 1280 ; 1500, 1680, 1760 essayés en
  ru, de, pl, fr : propres ; 130 % sur 1920 px : propre. Capture fr 1600 ; autotest 205/205. CLAUDE.md.
- 2026-11-13 (it. 1046) : « Taille de l'interface » à 130 % sur un écran de 1920 px : Boutique (57-75 px), Bestiaire
  (83-86), Statistiques (22-46), Aventure en russe (36) défilaient. Cause : le zoom ne touche que #panel, et les règles
  @media (max-width: 1499px…) voyaient la fenêtre (1920 px) quand le panneau zoomé n'a que 1467 px utiles (sonde :
  1467 × 498, contenu 578). Les 19 règles d'adaptation du contenu du panneau deviennent des requêtes de conteneur
  (@container panel, #panel en conteneur), seuils moins 32 px (marges intérieures) : à 100 %, rien ne change (10
  langues sans défaut) ; à 130 % sur 1920 px : fr et ru sans défaut (115 % : fr sans défaut). Un premier essai (zoom
  plafonné pour garder 1500 px) n'y changeait rien. Trouvé en passant : défilement ancien en russe à 1600-1680 px en fin
  de partie (Idées). Autotest 205/205. CLAUDE.md.
- 2026-11-13 (it. 1045) : mode mini, « moments » (panoplie, ascension, boss juré, chronique…) : le texte, centré sur une
  seule ligne sans largeur maximale, sortait des deux côtés de la petite scène dans toutes les langues (« …raqueur de
  champions : bonus 4 pièc… » en français). Désormais dans la largeur de la scène, sur plusieurs lignes au besoin,
  centré. Captures ru, de, fr ; autotest 205/205.
- 2026-11-13 (it. 1044) : essai abandonné : liste « Gardé / Perdu » de l'Ascension en grille (colonnes régulières de
  170 px au moins) pour qu'un mot de plus ne repousse pas les éléments suivants : pire (russe 1280 px : 32 px de
  défilement, 1366 : 14 ; les éléments longs passent sur deux lignes dans leur colonne). Annulé, mesure revenue à
  « aucun ». Pistes si la liste doit grandir : la replier plus tôt (≥ 3 ascensions depuis l'it. 985) ou raccourcir
  certains libellés russes.
- 2026-11-13 (it. 1043) : essai abandonné : « collection, pouvoirs, panoplies » dans la liste « Gardé » de l'Ascension
  (les panoplies complétées sont gardées, le libellé ne le disait pas) ; en russe à 1280 px (dev-data : liste dépliée
  sous 3 ascensions), le mot de plus repoussait un élément sur une nouvelle ligne : l'onglet défilait de 17 px. Annulé
  (clé comprise). À retenir : cette liste est à sa limite en russe à 1280 px ; tout allongement demande de la regrouper
  (deux colonnes ?) ou de la replier plus tôt. Vérifiés sans changement : tâche « Sac plein » à 0 objet inutile (« le
  butin suivant restera au sol ») ; sac de départ de 24 places (6 pièces gardées au plus).
- 2026-11-13 (it. 1042) : « Quoi de neuf », édition 49 : les nouvelles répliques du héros (panoplie complète, ascension,
  héros libéré, œuf trouvé). 10 langues sans défaut (« Quoi de neuf » au pire cas compris) ; autotest 205/205.
- 2026-11-13 (it. 1041, revue générale) : simulation 12 h, records des courses : prêtresse 40 → 66, cryomancien 38 → 62,
  gardien des astres 44 → 69 (réguliers). Performance (copie neuve) : bande 19,6 %, panneau 20,7 %, mini 7,1 %, icône
  0,8 %. Captures Quêtes et Ascension à 1366 px en français, anglais et chinois, mini en chinois : propres
  (« 0 gagnés au total » : éclats de dev-data ajoutés à la main). Texte chinois : aucun mot latin suspect. Rien à corriger.
- 2026-11-13 (it. 1040) : textes de fin de partie en allemand et en espagnol (--dump-text, journal vidé ; recherche de
  mots français courants) : aucun texte non traduit (« des » et « du » de l'allemand sont des mots allemands). Avec
  l'it. 1018 (ru, ja, pl) : cinq langues vérifiées sur la partie de fin de partie.
- 2026-11-13 (it. 1039) : contrôle d'autotest des répliques du héros (panoplie complète : une bulle apparaît) ;
  classUnlock n'y est pas émis (un premier essai avec une donnée inventée a déclenché une erreur dans le gestionnaire
  de app.js, qui attend { cls } ; l'émettre pour de vrai lancerait la cinématique et la bulle d'info). 205/205.
- 2026-11-13 (it. 1038) : nouvelles répliques du héros (9 langues) : à l'ascension (« Un nouveau départ, et plus fort ! »,
  1,5 s après le bandeau), à la libération d'un héros (« Un nouvel allié ! ») et quand un œuf tombe (« Un œuf ! Qu'est-ce
  qui va en sortir ? », réplique ordinaire, au plus une toutes les 45 s). Autotest 204/204.
- 2026-11-13 (it. 1037) : le héros fête une panoplie complète (palier de 4 pièces) par une bulle de paroles :
  « Panoplie au complet ! » ou « Tout est assorti, enfin ! » (SPEECH.setFull, 9 langues), comme pour les légendaires
  et les records ; les panoplies sont devenues un moment courant (it. 1004). Autotest 204/204.
- 2026-11-13 (it. 1036) : idée P1 (bande en fin de partie), part des sorts remesurée sur la nouvelle partie : avec 38-40 %,
  sans sorts 28,5 % (≈ 10 points). Effets visuels mis hors de cause : sans ombres ni filtres sur les effets de sort
  38,2 / 35,8 % (≈ 1-2 points), sans l'affichage du perçage 37,2 / 36,4 % (≈ 1,5-2) ; 10 s de jeu : 9 sorts, 20 perçages,
  7 tirs de drone, 11 effets de sort au plus en même temps. Le reste vient du rythme des combats que les sorts
  accélèrent (plus de monstres tués, de butin, de nombres, d'apparitions par seconde) : inhérent, pas un gaspillage.
  Aucun changement.
- 2026-11-13 (it. 1035) : première minute d'une partie neuve en russe (histoire d'introduction sur une ligne, file de
  la zone 1 lisible) : propre. fuzz sur 120 graines (2400 parties) : 0 bloquée ; save-fuzz FUZZ_BASE=fin : tout ok.
- 2026-11-13 (it. 1034) : thème clair, partie de fin de partie à 1366 px : Aventure (carte Zone, sous-titre de
  l'Équipement), Bestiaire > Panoplies (bouton « ◆ 4 dans le sac »), Statistiques > Carnet de route (colonnes),
  Compétences (« ✓ Arbre complet ») : tout lisible, couleurs du thème respectées. Rien à corriger.
- 2026-11-13 (it. 1033) : --crawl en coréen sur la partie de fin de partie : 384 clics, aucune erreur. Repère de la
  semaine simulée mis à jour dans CLAUDE.md (it. 1017 : 293 / 293, déterministe ; 2e semaine 321-335, it. 1032).
  Retour d'absence de 8 h en fin de partie : résumé sur une ligne (312 monstres, +29 Qi, niveau 190, 1 quête), propre.
- 2026-11-13 (it. 1032) : deux semaines simulées pour la décision de Victor sur la fin de partie (voir Idées) : sans
  changement, 293 → 321-335 en 2e semaine ; courbe ×1,03 au-delà de 250 : 338-377. Aucun changement du jeu.
- 2026-11-13 (it. 1031, revue générale) : simulation 12 h, records des courses : lancier 44 → 62, gladiateur 44 → 62,
  chaman 44 → 65 (réguliers). Performance (copie neuve) : bande 19,7 %, panneau 20,4 %, mini 6,8 %, icône 0,9 %.
  Captures Héros et Statistiques à 1366 px en français, anglais et japonais, mini en japonais : propres. Texte japonais
  extrait : HP, Lv, pt, BGM seulement (usuels). Rien à corriger.
- 2026-11-13 (it. 1030) : mesures pour la décision de Victor sur le plafond de fin de semaine (voir Idées, it. 1029) :
  bonus des points en surplus (+36 %, +100 %) et Écailles désactivées n'y changent presque rien ; la courbe ×1,04
  par zone l'explique. Aucun changement du jeu.
- 2026-11-13 (it. 1029) : vérifié : la bulle d'astuce sur trois lignes est bien comptée dans la zone cliquable
  (clickThrough.refresh mesure après l'insertion). Analyse de fin de semaine (voir Idées : mur doux vers 293, sans
  cause unique ; à proposer à Victor). Aucun changement du jeu.
- 2026-11-13 (it. 1028) : « Quoi de neuf », édition 48 : contours discrets des boss et des monstres sombres, pièces de
  panoplie gardées dites au survol de « Vendre ce qui ne m'améliore pas », astuces affichées en entier. Bulles de
  paroles du héros mesurées (49 répliques) : 283 px au plus (allemand), rien à corriger. 10 langues sans défaut
  (« Quoi de neuf » au pire cas compris) ; autotest 204/204.
- 2026-11-13 (it. 1027) : --overflow-report vérifie chaque astuce dans la bulle (trois lignes au plus depuis l'it.
  1026) : « astuce-coupée=id » (textes calculés compris, textFn). 10 langues : aucune coupée. Mesure prouvée : bulle
  remise à une ligne le temps d'un essai, elle signale « set » et « astrolabe » en russe. Autotest 204/204. CLAUDE.md.
- 2026-11-13 (it. 1026) : fin de partie à 1366 et 1920 px en anglais, chinois, japonais et coréen : sans défaut (les 10
  langues le sont désormais à toutes les largeurs). Astuce des panoplies complétée : « Ton sac garde les pièces : dès
  qu'il peut en compléter une, « À faire » le fait d'un clic. » En la vérifiant en russe : la bulle d'astuce tenait sur
  UNE ligne, coupée par « … » (la fin, « нажми здесь », perdue même à 1920 px) ; désormais trois lignes au plus, 1200 px
  de large au plus, en grandissant vers le haut dans la zone transparente. Captures ru 1280 / 1920 ; autotest 204/204.
- 2026-11-13 (it. 1025) : lang-overflow mesure la fin de partie à d'autres largeurs (FIN_WIDTHS=1280,1366,1920 ; 1280
  seulement par défaut). Défaut trouvé : en russe à 1920 px, l'Aventure de fin de partie défilait de 9 px ; colonne
  Zone la plus haute (439 px de contenu pour 445), « Предыдущая зона / Следующая зона » empilés. Boutons de zone en
  13 px, côte à côte dans toutes les langues ; sous-titre de l'Équipement tronqué sur une ligne à toutes les largeurs
  (trois lignes en russe à 1920 px). fr, ru, de, pl, es, pt à 1280, 1366 et 1920 : sans défaut ; 10 langues sans défaut ;
  autotest 204/204. CLAUDE.md.
- 2026-11-13 (it. 1024) : autotest, « vendre ce qui n'améliore pas (après confirmation) » : même schéma fragile que la
  transmutation (clic, 150 ms, confirmation, 150 ms) : attentes sur l'état (bouton actif, fenêtre de confirmation,
  taille du sac) ; seul autre « confirm-ok » : la sortie finale. Trois passages à 204/204.
- 2026-11-13 (it. 1023) : compléter une panoplie d'un clic (finishSet) n'annonce plus « bonus 2 pièces ! » puis aussitôt
  « bonus 4 pièces ! » (deux bandeaux superposés, deux sons, deux lignes) : pièces équipées en lot (_setBatch), le palier
  le plus haut annoncé une fois à la fin ; bonus de collection et jalon du carnet inchangés. Test logique (un seul
  setBonus, n = 4). Autotest : « transmutation (après confirmation) » a échoué une fois (164 → 164), puis réussi deux
  fois : attentes fixes de 150 ms remplacées par until() (bouton actif, fenêtre de confirmation, compteur) ; trois
  passages à 204/204.
- 2026-11-13 (it. 1022) : « Vendre ce qui ne m'améliore pas » dit au survol combien de pièces de panoplie il garde (« 2
  pièces de panoplie gardées pour en compléter une. », légendaires exclus : gardés de toute façon) : le joueur voyait des
  objets plus faibles rester dans le sac sans savoir pourquoi (garde de l'it. 1004). Contrôle d'autotest (rendu
  indépendant du tirage et des pièces déjà présentes : trois passages à 204/204). Vérifié aussi : luminance des héros
  (assassin 47, nécromancien 49, les autres ≥ 69) ; en capture de nuit, ils restent lisibles (touches de couleur) : rien
  à changer.
- 2026-11-13 (it. 1021, revue générale) : simulation 12 h, records des courses : druide 44 → 62, samouraï 41 → 64, barde
  44 → 62 (réguliers). Performance (copie neuve) : bande 19,6 %, panneau 20,5 %, mini 7,0 %, icône 0,5 %. Captures
  Familiers et Carte à 1366 px en français, anglais et coréen, mini en coréen (contour du boss visible) : propres.
  Texte coréen extrait : seulement HP et Lv (usuels). Rien à corriger.
- 2026-11-13 (it. 1020) : monstres sombres lisibles de nuit. Luminance moyenne des sprites mesurée en jeu (injection) :
  veuve noire 28, araignée 37, chevalier noir 38, scorpion d'obsidienne 40, corbeau 41… (fond de nuit du même ordre).
  isDarkSprite (sprites.js, moyenne des pixels opaques < 48, en cache) : contour très discret (blanc bleuté à 35 %,
  plus pâle que celui des boss, sans rappeler l'or des élites), bande et mode mini. Capture avant / après aux Égouts
  oubliés (zone 11) : l'araignée, presque invisible, se lit. Bande 19,5 % (repère) ; autotest 203/203.
- 2026-11-13 (it. 1019) : boss lisibles sur décor sombre : la Carapace des Abysses (bleu nuit, Récif abyssal de nuit)
  se confondait avec le fond (capture de la bande, dev-data en combat de boss). Tout boss a désormais un contour pâle
  discret dessiné dans l'image (outlinedFrames, blanc bleuté à 55 % ; écho : son contour spectral, inchangé), sur la
  bande et en mode mini (bossOutline remplace echoOutline). Performance, même combat de boss : bande 19,5 / 20,6 %
  (repère 19,2-19,8 : bruit). Contrôle d'autotest des échos adapté ; 203/203. Contrôle instable de l'it. 904 : clos.
- 2026-11-13 (it. 1018) : textes de fin de partie : --dump-text sur la partie de fin de partie (journal vidé) en
  russe, japonais et polonais : aucun texte resté en français ou en anglais (seulement Qa, Qi, et HP / Lv / pt / BGM
  en japonais, usuels). Vérifiés aussi : onglet Quêtes de fin de partie propre ; repère de rareté en forme pour les
  daltoniens (•, ••, •••, ★) et mode mini à 15 images/s déjà en place. Idée notée pour Victor : points de compétence en
  surplus. CLAUDE.md.
- 2026-11-13 (it. 1017) : le joueur simulé dépense aussi ses points de talent restants dans les Maîtrises (rangs
  illimités ; répartition du jeu, autoSpendTalents), comme un joueur attentif : la partie de fin de partie gardait
  128 points dormants. hero-table 12 h : moyenne 63,3 → 63,7, écart 5,7 → 5,0 zones (61,3 artificier → 66,3 paladin) ;
  semaine : guerrier et mage 293 (inchangé). Repères mis à jour (CLAUDE.md, hero-table.mjs).
- 2026-11-13 (it. 1016) : onglet Compétences, arbre entièrement appris : « ✓ Arbre complet · 506 points au total » au
  lieu de « 362 points libres · 144 / 144 nœuds actifs », qui laissait croire qu'il restait à faire. « Quoi de neuf »,
  édition 47 : panoplies (équipement d'avant remis, bouton du Bestiaire), Carnet de route en colonnes et carte Zone
  plus courte, plus de rappel de points une fois l'arbre appris. Capture (fin de partie) ; 10 langues sans défaut
  (« Quoi de neuf » au pire cas compris) ; autotest 203/203.
- 2026-11-13 (it. 1015) : « À faire » de la partie de fin de partie : « 362 points de compétence » alors que l'arbre est
  entièrement pris (144 nœuds sur 144) ; la tâche, l'astuce et la pastille de l'onglet restaient pour toujours.
  skillSpendable(S) (points libres et un nœud prenable) les conditionne. Les 128 points de talent restent signalés :
  les Maîtrises (rangs illimités) les prennent toujours. Mesuré aussi : le compagnon en fin de partie (38,0 / 38,1 %
  avec, 38,0 / 34,1 % sans) : dans le bruit, rien à en tirer. Test logique. Erreur de procédure : commit fc0ad43
  envoyé avant d'avoir lu l'autotest (202/203 : le contrôle « pastille plafonnée à 99+ » donnait 5000 points sur
  l'arbre déjà complet de dev-data, pastille désormais cachée) ; contrôle corrigé (un nœud retiré le temps de la
  mesure) dans le commit suivant, 203/203 lu avant de committer.
- 2026-11-13 (it. 1014) : --overflow-report mesure toutes les sous-sections (liste SUBS de main.js : Bestiaire, Boutique
  > Déblocages et Atelier, Statistiques > Carnet de route, Familiers > À découvrir, Héros > Prisonniers ; seule celle
  par défaut l'était, plus Succès et Sorts). Défaut trouvé : en fin de partie, Statistiques > Carnet de route (30
  jalons sur une colonne) défilait de 529 px dans les 10 langues ; désormais en colonnes de 340 px (3 à 1280 px, 5 à
  1920 px), lignes d'un seul tenant. Capture en russe ; 10 langues sans défaut ; autotest 203/203. CLAUDE.md.
- 2026-11-13 (it. 1013) : Bestiaire > Panoplies : quand le sac complète une panoplie, la mention « · 4 dans le sac »
  de sa carte devient un bouton (« Compléter avec les pièces du sac » en info-bulle) : un clic sur place, comme la
  tâche « À faire » (finishSet(id), setFinisher(id)). --overflow-report mesure désormais chaque sous-section du
  Bestiaire (seule celle des monstres l'était) : défaut ancien trouvé, Panoplies défilait en russe (9 px ; 26 en fin de
  partie) et en allemand (9 px) à 1280 px ; sous 1500 px, cartes du Bestiaire sur 5 colonnes (230 px). Pire cas mesuré
  à la main (5 panoplies complétables, ru et de, 1280 px) : 0 px. Joueur absent (IDLE=1) : guerrier 15 à 9 h, 16 à 12 h,
  au repère. Contrôle d'autotest (bouton → panoplie complétée) ; 10 langues sans défaut ; 203/203. CLAUDE.md.
- 2026-11-13 (it. 1012) : bilan d'équilibrage des 20 héros (12 h, graines 7/3/11, horloge virtuelle) : de 61,0 (mage)
  à 66,7 (gladiateur), moyenne 63,3 ; plus forts : gladiateur +3,4, gardien des astres +2,7 ; plus faibles : mage −2,3,
  arbalétrier, assassin, nécromancien −1,6. Écart de 5,7 zones, proche du bruit (±2,3 sur trois graines) : aucune
  retouche. Outil réutilisable scripts/hero-table.mjs (60 simulations en parallèle, ≈ 3 min 30, tableau trié avec
  l'écart à la moyenne ; mêmes valeurs en le relançant). Vérifié en passant : « Effets complets » est coupé au premier
  lancement si Windows demande moins d'animations, et secousses et éclairs en dépendent. CLAUDE.md.
- 2026-11-13 (it. 1011, revue générale) : simulation 12 h (horloge virtuelle), records des courses : paladin 44 → 65,
  nécromancien 39 → 61, moine 44 → 65 (réguliers). Performance (copie neuve) : bande 19,8 %, panneau 20,5 %, mini 6,9 %,
  icône 0,8 %. Captures Talents et Boutique à 1366 px en français, anglais et chinois, mini en chinois : propres
  (l'étal du Marchand de dev-data, tiré avant l'it. 988, ne propose que des objets plus faibles : il se renouvellera).
  Texte chinois extrait : aucun mot latin suspect. --crawl en polonais sur la partie de fin de partie : 385 clics,
  aucune erreur. Rien à corriger.
- 2026-11-13 (it. 1010) : partie de fin de partie régénérée avec l'horloge virtuelle (scripts/fixtures/endgame-save.json,
  simulate.js 48 h guerrier : zone 150, niveau 183, 19 ascensions, 6 panoplies, 16 familiers en expédition, 331
  expéditions accomplies) ; simulate.js envoie désormais les familiers libres en « Voyage » toutes les 10 min (joueur
  attentif ; rien avant le Grand intendant, zone 170). 12 h : 61 / 61 / 65 ; semaine : guerrier 293, mage 291 (bruit).
  save-fuzz FUZZ_BASE=fin : 1169 corruptions, toutes ok (expéditions en cours comprises). La nouvelle partie a montré
  67 px de défilement de l'Aventure en russe à 1280 px (zone 150 : boss à trois capacités, gardien d'une relique, boss
  épuisé) : « Boss épuisé par tes tentatives » devient « (−5 %) » après ses PV (phrase en info-bulle) ; gardien = boss
  de la zone : « Ce boss garde une relique, … » sans répéter zone et nom ; nom de zone en 16 px sous 1500 px (« +4 »
  seul sur sa ligne). 10 langues sans défaut ; autotest 202/202.
- 2026-11-13 (it. 1009) : simulations déterministes (horloge virtuelle). Semaine simulée : guerrier 293 (repère) mais
  mage 182-198 au lieu de 293 ; avant les panoplies, 150-184. Dichotomie (git bisect, critère : dernière course ≥ 250)
  entre l'it. 965 (293, reproduit) et l'it. 1003 : coupable désigné, un commit d'affichage sans logique ; remesuré, il
  donnait 291. Cause : la boutique (renouvellement de l'étal, Marchand attitré), les expéditions et les familiers
  lisent Date.now() ; une semaine simulée dure 3 min réelles, et le résultat dépendait de la charge de la machine.
  scripts/virtual-clock.mjs (importé en premier par simulate, early-pace, first-minutes, tab-pace, fuzz) : Date.now()
  part d'une date fixe et avance avec g.advance(). Deux semaines de mage lancées ensemble : identiques (296 et 296) ;
  guerrier 293, 10 panoplies sur 10 chacun. 12 h : guerrier 40 → 61, mage 43 → 62, rôdeur 44 → 62. early-pace,
  first-minutes et tab-pace inchangés ; fuzz 1200 parties, 0 bloquée. CLAUDE.md.
- 2026-11-13 (it. 1008) : santé du début de partie : first-minutes (premier objet 50-84 s, premier boss 77-84 s),
  early-pace (60 min : 113 objets, niveau 40, zone 23, 6,3 déblocages) et tab-pace (talents 1, quêtes 5, boutique
  8-9, Héros 10, carte 12, bestiaire 14-15 min) dans les repères. Corrigé : le succès « Panoplie complète (4 pièces) »
  ne regardait que les pièces portées ; depuis l'it. 1007, la tâche remet aussitôt l'équipement d'avant s'il était
  plus fort : les 4 pièces n'étaient jamais portées au moment du contrôle. Il compte aussi les panoplies déjà
  complétées (setsDone). Test logique ; autotest 202/202.
- 2026-11-13 (it. 1007) : la tâche « … pièces du sac complètent la panoplie » (it. 1004) ne laisse plus le héros
  affaibli : pour une panoplie jamais complétée, si l'équipement d'avant était plus fort, il est remis aussitôt
  (finishSet ; le bonus de collection reste acquis ; une ligne de journal au lieu de huit « Équipé : … » : equip(it,
  quiet)). Sans « Équiper le meilleur », le joueur devait rééquiper jusqu'à quatre objets à la main. simulate.js passe
  par finishSet (guerrier 24 h : 5 panoplies, comme avant). Santé : fuzz 1200 parties, 0 bloquée ; save-fuzz 1176
  corruptions, toutes ok. Test logique ; autotest 202/202.
- 2026-11-13 (it. 1006) : t() groupe par milliers tout entier ≥ 1000 passé en variable numérique (comme {n} de txn,
  it. 871) : bandeau et moment mini d'ascension (« +1347 éclats d'étoile »), journal d'ascension et de l'Astrolabe,
  astuce « ton héros bloque », et tous les cas semblables d'un coup ; les chaînes déjà formatées ne changent pas. Récompense
  de quête en éclats : fmt(). Vu en lisant la fête des panoplies (it. 1004) : bandeau, étincelles, son et moment mini
  déjà en place. Test logique ; 10 langues sans défaut ; autotest 202/202.
- 2026-11-13 (it. 1005) : Bestiaire > Panoplies : chaque carte indique aussi les emplacements couverts par des pièces du
  sac (« 0/4 · 1 dans le sac », noms des pièces au survol) : le joueur voit où en est la panoplie que le sac lui garde
  (it. 1004). « Quoi de neuf », édition 46 : panoplies (garde et tâche à plusieurs pièces), « course · record » de la
  carte Zone, nombres groupés de l'Ascension. Captures fr et ru (fin de partie) ; 10 langues sans défaut (« Quoi de
  neuf » au pire cas compris) ; autotest 202/202.
- 2026-11-13 (it. 1004) : panoplies enfin complétables. Partie de fin de partie : « Panoplies 0 / 10 » après 48 h ;
  mesuré sur 24 h (guerrier) : 187 pièces trouvées (≈ 19 par panoplie, 5 à 7 emplacements), aucune complétée. Les pièces
  n'étaient gardées que pour une panoplie déjà portée (la première partait toujours) et la tâche « Une pièce du sac
  complète la panoplie » ne servait qu'à 3 pièces portées. Désormais : (1) le sac garde aussi les pièces des panoplies
  jamais complétées sans pièce portée (une par emplacement, 6 au plus, les plus avancées d'abord) ; (2) la tâche
  propose les pièces du sac qui portent une panoplie jamais complétée à 4 (« 3 pièces du sac complètent la panoplie
  … », un clic les équipe ; le bonus de collection reste ensuite, « Équiper le meilleur » remet le plus fort).
  simulate.js clique cette tâche et affiche « Panoplies complétées » : 24 h, 4 trajectoires (guerrier, mage, graines
  7 et 3) : ancienne règle de garde 0/3/2/3, nouvelle 5/2/6/1 (avant tout changement : 0). balance 12 h : +0,8 (bruit).
  Tests logiques (garde sans pièce portée, plafond, tâche à 4 pièces) ; autotest 202/202.
- 2026-11-13 (it. 1003) : deux « records » différents. Partie de fin de partie : la bande dit « record 142 » (meilleure
  de toutes les courses, le record à battre, it. 13), la carte Zone « record : 136 » et l'Ascension « (record zone
  136) » (meilleure zone de la course en cours). Quand ils diffèrent : carte Zone « course : 136 · record : 142 »
  (chaque moitié insécable : deux lignes nettes à 1280 px) et Ascension « (zone 136 atteinte pendant cette course) ».
  Termes alignés sur « Meilleure course » (Lauf, забег, 本局, 周回, 회차…). La mesure « onglet-titre » de l'it. 1001 a vu
  aussitôt « 区域 / 136 » coupé à 1280 px : titre de la carte Zone insécable. Revue des Statistiques, du Bestiaire et
  de la Carte en fin de partie : propres. 10 langues sans défaut ; autotest 202/202.
- 2026-11-13 (it. 1002) : nombres groupés par milliers. Onglet Ascension en fin de partie : « 1111 éclats », « 8857 gagnés
  au total », « +26571 % attaque » (Lueur stellaire), « +1347 éclats » sans séparateur : fmtFull partout dans
  l'onglet (coût des constellations compris) ; describeEffects groupe au-delà de 1000. Et en vérifiant le séparateur :
  en français, toLocaleString sépare les milliers par U+202F, absente de TOUTES les polices pixel du jeu (vérifié avec
  fontTools) : rendue par une police de secours dans chaque « 8 857 » d'or (fmt sous 10 000), fmtFull et txn. Remplacée
  par l'insécable ordinaire (locInt, format.js ; groupInt, i18n). Test logique ; capture ; 10 langues sans défaut ;
  autotest 202/202. CLAUDE.md.
- 2026-11-13 (it. 1001, revue générale) : simulation 12 h, records des courses : guerrier 39 → 65, mage 43 → 59, rôdeur
  44 → 61 (comme à l'it. 981 : bruit). Performance (copie neuve) : bande 19,3 %, panneau 21,1 %, mini 7,0 %, icône
  0,8 %. Captures Aventure et Quêtes à 1366 px en français, anglais et japonais : en japonais, le titre « 装備 » de la
  colonne Équipement se coupait entre ses deux caractères (texte nu d'un titre flex, à côté du sous-titre) ; corrigé
  (white-space sur les titres de l'Équipement et des Maîtrises sous 1500 px). --overflow-report le mesure désormais
  (« onglet-titre=… », titres chinois et japonais ; la mesure des mots coupés ignore ces écritures) : vu sans le
  correctif, propre avec. Texte coréen extrait : « pt » (points de talent et points de critique) traduit en « 점 » et
  « %p » (usage coréen). 10 langues sans défaut ; autotest 202/202.
- 2026-11-13 (it. 1000) : un succès obtenu en jeu laisse aussi une ligne dans le journal (« 🏆 Succès : Premier boss. »,
  texte déjà traduit du bandeau) : en mode mini ou en regardant ailleurs, le bandeau de la bande passait inaperçu.
  Focus clavier vérifié (contour visible sur boutons, champs, sections, nœuds des Compétences et de la Carte).
  Contrôle d'autotest (window.__checkAchievements en dev) ; 202/202.
- 2026-11-13 (it. 999) : contrôles avec la partie de fin de partie : lang-overflow complet (10 langues, dev-data et fin
  de partie) sans défaut ; mode mini en français et en russe : propre. save-fuzz peut partir de cette partie
  (FUZZ_BASE=fin) : 1120 corruptions, toutes ok (sans expédition en cours dans cette sauvegarde, pets.exp n'est pas
  balayé : dev-data le couvre). CLAUDE.md.
- 2026-11-13 (it. 998) : « Quoi de neuf », édition 45 : étal du Marchand forgé, or des quêtes qui suit la progression,
  bande plus lisible en fin de partie. La mesure des langues (partie de fin de partie) a trouvé 5 px de défilement en
  polonais à 1280 px : la valeur de l'expérience du héros (« 183,42 T / 278,69 T ») passait sur deux lignes ; elle
  utilise le format court (« 183 T / 279 T »). Bande dev-data remesurée : 19,7 et 19,2 % (le 21,0 de l'it. 997 était
  du bruit). pl, ru, de sans défaut ; autotest 201/201.
- 2026-11-13 (it. 997) : nombres de dégâts plafonnés : au plus 6 petits nombres ordinaires visibles à la fois (les
  grands — critiques, « Gelé ! », « Écho ! »… — passent toujours) ; en fin de partie, une douzaine montaient en même
  temps. Bande en fin de partie 38,4 → 36,4 % (depuis l'it. 992 : 42,5 → 36,4). Autotest 201/201 (placements des
  nombres contrôlés).
- 2026-11-13 (it. 996) : chaîne de perçage plus sobre : le mot « transpercé », l'anneau et les étincelles sur le premier
  monstre traversé seulement ; un simple nombre plus discret sur les suivants (en fin de partie, « −3,02 M ·
  transpercé » couvrait toute la file). Bande en fin de partie 39,5 → 38,4 %. Vu en capture ; autotest 201/201.
- 2026-11-13 (it. 995) : l'introduction de l'histoire respecte « Cinématiques de l'histoire » : décoché, pas de
  cinématique (le ciel qui se brise), seulement les trois bulles (avant, elle jouait quand même ; le réglage promet de
  ne jamais être interrompu). Vu en capture. Bestiaire et Carte de la partie de fin de partie revus : rien à corriger.
  Son : les coups sont déjà limités à ≈ 7 par seconde ; rien changé (impossible à écouter ici). Introduction exclue des
  mesures de performance de fin de partie : 39,5 % avec ou sans elle. Autotest 201/201.
- 2026-11-13 (it. 994) : enquête de performance en fin de partie, suite : projectiles neutralisés (TEMP) : 39,9 % contre
  38,6 % (aucun gain : écartés). Le reste est réparti (personnages animés en couches propres : héros, compagnon,
  familier, serviteur, drone ; nombres de dégâts ≈ 3 ; son ≈ 4,5) et mesuré en rendu LOGICIEL (xvfb, GPU émulé) : peu
  représentatif d'un vrai PC (CLAUDE.md). Piste arrêtée ici ; à revoir avec une mesure sous Windows (Victor) sur une
  partie avancée. Aucun changement de code.
- 2026-11-13 (it. 993) : suite de l'enquête de performance en fin de partie (it. 992). Compté les effets vivants
  (TEMP) : ≈ 62 étincelles en permanence en fin de partie contre 21 avec dev-data. Deux remèdes : au plus 24
  étincelles vivantes (juice.js, MAX_SPARKS : −1 point) ; surtout, le flash plein écran et la secousse de chaque coup
  critique à haut palier (strip.js) au plus toutes les 1,5 s (en fin de partie, la bande clignotait et tremblait sans
  arrêt) : −3 points. Bande en fin de partie 42,5 → 38,6 % ; dev-data 19,4 % (inchangé). Essayé sans effet : 12
  étincelles au lieu de 24. Reste à chercher (Idée P1) : projectiles (3 par attaque au palier 3), nombres de dégâts,
  son, compagnon. 235 tests ; autotest 201/201.
- 2026-11-12 (it. 992) : enquête de performance sur la partie de FIN de partie (scripts/fixtures, guerrier niv. 167,
  zone 136, compagnon rôdeur, sorts rangs 24-33) : bande ≈ 42-43 % d'un cœur contre ≈ 20 % avec dev-data ; panneau et
  mini aussi plus chers (41-43 %, 9-9,5 %). Mesures (copies neuves, cinématiques coupées), une variante à la fois :
  effets complets coupés 28,5 ; sans sorts 30,9 ; zone 55 au lieu de 136 : 24,9 ; zone 103 ou 135 : 41-42 (le rang de
  la zone, pas le décor) ; sans compagnon 38,3 ; sans nombres de dégâts 40,0 ; sans son 38,7 ; sans météo ni jour/nuit
  41,7 ; sans reliques 43,2 (rien) ; sans aucune animation de sort (TEMP) 40,0 ; sans le perçage (TEMP) 40,4. Le
  processus GPU passe de 17 à 25 points avec les sorts. Pas de coupable unique : le rythme des combats (coups, sorts,
  effets) à haut niveau. Noté en Idées (P1). Aucun changement de code (essais TEMP retirés ; budget de 3 effets de sort
  par seconde essayé : sans effet, retiré).
- 2026-11-12 (it. 991, revue générale) : simulation 12 h, records des courses : paladin 38 → 65, assassin 45 → 61,
  druide 44 → 61 (régulier). Performance (copies neuves) : bande 19,9 %, panneau 21,8 puis 19,9 % (bruit), mini 6,9 %,
  icône 0,8 %. Captures Carte, Ascension, Familiers et mini en français, anglais et chinois : rien de cassé. Texte de
  l'interface en chinois : aucun mot non traduit.
- 2026-11-12 (it. 990) : récompense en or des quêtes : retenue avec l'échelle de l'or au tirage (q.gs), puis remontée en
  proportion si le record a progressé depuis (questGold ; jamais plus bas ; anciennes quêtes sans gs inchangées ; valeur
  absurde → or d'origine). Vu sur la partie de fin de partie : une chasse tirée en début de course rapportait 31 k d'or à
  côté de 102 T. Affiché tel quel dans l'onglet Quêtes, versé à la réclamation. Test logique ; sauvegardes abîmées ok ;
  12 h 62,9 → 62,6 (bruit) ; semaine mage : la « dernière course » varie avec la graine (293/279, 282/279, 296/279),
  mais le plafond des dernières courses est le même (graine 11 : 296 contre 292) : bruit. Autotest 201/201.
- 2026-11-12 (it. 989) : partie de fin de partie, Talents, Familiers, Quêtes, Statistiques revus en français. Faute
  trouvée : « Chasser 30 cultiste du néants » (le « s » collé à la fin du nom). frPlural (quests.js) : le nom et ses
  adjectifs prennent la marque, rien après « de / des / du / d' », -al → -aux, -eu → -eux, et quatre cas à part
  (« yeux des profondeurs », « chauves-souris », « feux follets », « chefs de guerre orcs ») : « rats géants »,
  « loups des neiges », « crabes abyssaux »… (vérifié sur les 85 monstres). Test logique ; 234 tests ; autotest
  201/201.
- 2026-11-12 (it. 988) : étal du Marchand en fin de partie (idée de l'it. 987) : ses objets sont maintenant déjà forgés
  au niveau moyen de l'équipement porté (somme des +n ÷ 7 emplacements, arrondi bas ; rien de forgé = +0 comme avant).
  Partie de fin de partie : 14 objets sur 80 (20 étals) améliorent le héros, contre aucun avant. Prix : sellValue × 6,
  qui compte déjà le +n. Équilibrage : 12 h identique (62,9, rien de forgé si tôt) ; semaine mage 293, guerrier 293
  (inchangés). Test logique ; autotest 201/201. Idée P3 fermée.
- 2026-11-12 (it. 987) : partie de fin de partie (scripts/fixtures) : --crawl en français sans erreur (355 clics) ;
  captures Aventure, Compétences, Boutique, Héros à 1920 px : rien de cassé. Noté en Idées (P3) : l'étal du Marchand
  devient inutile en fin de partie (objets plus faibles que l'équipement +10 porté, prix dérisoires).
- 2026-11-12 (it. 986) : lang-overflow mesure aussi une partie de FIN de partie à 1280 px dans chaque langue
  (scripts/fixtures/endgame-save.json, 19 Ko, produite par simulate.js 48 h guerrier ; « ru fin 1280 : … »). Vérifié :
  sans le remède de l'it. 985, « ru fin 1280 : ascension=80 » ressort (la mesure habituelle disait « aucun »).
  CLAUDE.md. Idée P2 fermée.
- 2026-11-12 (it. 985) : --crawl en japonais sans erreur (328 clics). Angle mort trouvé : mesure des langues avec une
  partie TRÈS avancée (sauvegarde de simulate.js 48 h, DUMP) au lieu de dev-data : Ascension 17-80 px de défilement (de,
  pl, ru ; 1280 et 1366), Aventure 35 px (ru 1280). Remèdes : Ascension, après 3 ascensions, la liste « Gardé / Perdu »
  se replie (« Ce qui est gardé ou perdu », ouverte dans la fenêtre large) ; Aventure, les automatismes passent dans
  « Automatismes (n / m) » dès 2 (au lieu de 3 : Valet d'armes + Maître de forge prenaient 5 lignes en russe) ; la
  rangée « À faire · Chroniques · Toutes les statistiques » de la carte du héros resserrée (13 px, écart 10 px) pour
  tenir sur deux lignes en russe. Partie avancée : 10 langues à 1280 px sans défaut ; dev-data : 10 langues × 3
  largeurs sans défaut ; autotest 201/201. Noté en Idées : intégrer cette partie avancée à lang-overflow.
- 2026-11-12 (it. 984) : l'annonce d'une nouvelle sorte d'élite dit son bonus (« … (3 / 7), +1 % de chances de butin pour
  toujours. »), comme celle d'un événement découvert. « Quoi de neuf », édition 44 : bonus de la collection des élites,
  une réplique pour chacun des 14 événements. 10 langues, libellés cités vérifiés ; 10 langues × 3 largeurs sans
  défaut ; autotest 201/201.
- 2026-11-12 (it. 983) : la collection des élites a son bonus permanent, comme celle des événements (it. 932) : +1 % de
  chances de butin par sorte vaincue (7 % au plus ; affixesSeenEffects, data.js ; compté dans heroStats). Bestiaire >
  Élites : « Chaque sorte d'élite vaincue donne +1 % de chances de butin pour toujours. Bonus actuel : +3 %… ».
  Chaque événement a déjà son son propre (vérifié). Test logique ; README ; vu en russe à 1280 px ; 10 langues sans
  défaut ; 232 tests ; autotest 201/201.
- 2026-11-12 (it. 982) : les sept événements rares qui n'avaient que les répliques communes ont la leur (Frénésie « Plus
  vite, plus fort ! », Corne d'abondance, Souffle de sagesse, Pluie d'éclats, Zèle, Voile protecteur, Marée arcanique) :
  les 14 en ont une. Test logique : tout nouvel événement sans réplique fait échouer npm test. Mode mini revu : aucun
  effet coûteux (une ombre sur une icône immobile). 10 langues ; 231 tests ; autotest 201/201.
- 2026-11-12 (it. 981, revue générale) : simulation 12 h, records des courses : guerrier 41 → 66, mage 39 → 60, rôdeur
  38 → 62 (régulier). Performance (copie neuve) : bande 19,7 % (de retour au niveau d'avant les Écailles grâce aux
  it. 973-974), panneau 20,3 %, mini 7,0 %, icône 0,8 %. Captures Aventure, Talents, Quêtes et mini à 1366 px en
  français, anglais et japonais : rien de cassé. Texte de l'interface en japonais : aucun mot non traduit.
- 2026-11-12 (it. 980) : astuce à la première Ruée des gobelins (comme la Nuée d'étoiles, it. 910) : « clique dans la
  bande pour frapper plus vite et rattraper les gobelins dorés avant qu'ils s'enfuient ! » (une fois, 10 langues, noms
  repris des traductions du jeu). Contrôle d'autotest ; 201/201.
- 2026-11-12 (it. 979) : contrôles de robustesse après les it. 954-978 : sauvegardes abîmées ok (1176 corruptions),
  fuzz 1200 parties sans blocage, rythme de la première heure inchangé (60 min : zone 23, 107 objets, niveau 40,
  6 déblocages). Aucun changement de code.
- 2026-11-12 (it. 978) : Statistiques : line() fait passer elle-même toute valeur texte contenant « · » par segs() (retour
  à la ligne entre les segments, it. 939) : un oubli comme « Sorts lancés » (it. 976, chevauchement en russe) ne peut
  plus se reproduire. 10 langues × 3 largeurs sans défaut ; autotest 200/200.
- 2026-11-12 (it. 977) : « Quoi de neuf », édition 43 : bilan du retour (or des expéditions, quêtes accomplies),
  temps restant des quêtes d'élites et de proie, bande plus légère (halos). Le nom du Grand intendant repris tel que
  chaque langue le traduit (es « Gran intendente », ru « Великий управитель »). 10 langues ; aucun défilement ;
  autotest 200/200.
- 2026-11-12 (it. 976) : temps restant estimé (« ≈ 25 min ») aussi pour les quêtes « Vaincre N élites » et « proie »
  (rythme des victoires × chance d'élite par victoire, bénédiction et Appât des champions compris ; ÷ 7 pour une
  sorte précise ; rien avant la zone 3). La chance est calculée sans tirage (eliteChancePerKill, partagée avec
  l'absence : afficher l'onglet ne consomme plus de hasard). Mesure des langues : « Заклинаний применено » passait sous
  sa valeur (« 2 · рекорд 8,99 M ») en russe à 1280 px : la valeur passe par segs() comme les autres. Panneau : aucune
  animation infinie permanente. Test logique ; 10 langues × 3 largeurs sans défaut ; autotest 200/200.
- 2026-11-12 (it. 975) : fin de la chasse aux filtres de la bande (it. 972-974). Restent en drop-shadow : états rares ou
  brefs (gel, étourdi, ralenti, affaibli, silence), boss final, relique portée par un boss majeur : laissés. Feux
  follets des secteurs complets (box-shadow, déplacés à chaque image) : mesurés avec six feux follets forcés (TEMP),
  box-shadow 19,8 % contre dégradé 19,8 % : aucun coût, rien changé. Aucun changement de code.
- 2026-11-12 (it. 974) : suite de l'it. 973, les autres halos fréquents passent du filtre drop-shadow à une lueur
  peinte derrière le personnage : « cored » (double drop-shadow PERMANENT sur le héros dès qu'un secteur de l'arbre de
  compétences est complet, donc chez tous les joueurs avancés), serviteur du nécromancien (permanent), gobelins (Ruée
  des gobelins : plusieurs à la fois), boss enragé. Mesure, « cored » forcé sur le héros (TEMP), copies neuves :
  21,6 % → 20,2 % (−1,4 point en permanence). Vu en capture (lueur bleue discrète). 229 tests ; autotest 200/200.
- 2026-11-12 (it. 973) : bon voisin, suite de l'it. 972 : pendant l'empoisonnement (boss venimeux, 4 s sur 8), le héros
  portait un filtre drop-shadow, refait à chaque image de son animation. Les halos d'état fréquents en combat (venin,
  malédiction, voile protecteur, marée arcanique, frénésie, œil du faucon, hâte, et leurs combinaisons) sont maintenant
  un fond dégradé radial peint derrière le personnage (l'élément Actor reçoit la taille de son image). Bande, copies
  neuves de dev-data (boss venimeux de zone 55) : 20,45-21,2 % → 19,7-19,8 %. Vu en capture (lueur rouge discrète de la
  Frénésie). Restent en filtre les états rares ou courts (gel, étourdi, ralenti, affaibli, silence, enragé, gobelin,
  serviteur, noyau). 229 tests ; autotest 200/200 ; CLAUDE.md (performance).
- 2026-11-12 (it. 972) : enquête sur la bande (+1 point vu à la revue 971), par dichotomie : chaque commit mesuré deux
  fois dans un dossier de travail git, sur une copie neuve de dev-data. it. 933 : 19,55 ; 947 : 19,8 ; 950 : 19,55 ;
  952 (règle des espaces insécables de t()) : 19,55 ; 956 : 19,85 ; 959 : 19,85 ; 960 : 19,75-20,2 ; 962 : 19,6-19,85 ;
  964 : 20,45-20,6. La marche vient de l'it. 964 : en ajoutant les Écailles à la rotation, le boss de zone 55 (celui que
  combat dev-data pendant la mesure) est passé de Carapace + Vampirisme à Crachat venimeux + Coup dévastateur, plus
  d'effets à l'écran. Vérifié : version actuelle sans les Écailles dans la rotation (TEMP) : 20,1-20,25. Pas de
  régression du code : le scénario de mesure a changé. Repère de CLAUDE.md mis à jour ; idée P2 fermée.
- 2026-11-12 (it. 971, revue générale) : simulation 12 h, records des courses : berserker 41 → 64, nécromancien
  39 → 62, moine 40 → 62 (régulier). Captures Bestiaire, Carte, Réglages et mini en français, anglais et chinois : rien
  de cassé. Texte de l'interface en russe : aucun mot non traduit. Performance (copies neuves) : panneau 21,0 %, mini
  7,1 %, icône 0,8 % ; bande 20,5 puis 20,9 % : ≈ +1 point depuis les revues 941-961 (19,5-19,9) : noté en Idées (P2).
- 2026-11-12 (it. 970) : retour d'absence : les quêtes accomplies pendant l'absence sont annoncées (bulle :
  « …, 2 quêtes accomplies. » ; détail : « Quêtes accomplies »), seules celles devenues complètes hors ligne
  (summary.questsDone). Pluriels dans les 10 langues ; test logique (une quête « kill » accomplie en 8 h) ; contrôle
  d'autotest étendu ; 200/200.
- 2026-11-12 (it. 969) : suite de l'it. 968 : le détail du retour (« Pendant ton absence », un clic sur la bulle)
  affichait encore « Or gagné » sans l'or des expéditions (6,91 Md contre 18,49 dans la bulle) : même total maintenant,
  et la ligne du Grand intendant précise « 14 tâches de familiers · +11,59 Md or ». Contrôle d'autotest (résumé
  fictif) ; 200/200.
- 2026-11-12 (it. 968) : joueur absent : simulation IDLE=1 12 h inchangée (guerrier 15 à 9 h, 16 à 12 h). Retour
  après 8 h (copie, « last » reculé) : la bulle disait « +6,91 Md or » alors que l'or avait gagné ≈ 19 Md : l'or des
  expéditions récupérées au retour par le Grand intendant (11,59 Md, la plus grosse part) n'y entrait pas. Il compte
  maintenant (summary.petGold) : « +18,49 Md or » dans la bulle et le mode mini ; le détail du panneau est inchangé
  (la ligne du Grand intendant y figure déjà). Test logique ; vu en capture ; autotest 199/199.
- 2026-11-12 (it. 967) : --crawl en polonais (trois pluriels) : 330 clics sans erreur. « Quoi de neuf », édition 42 :
  capacité de boss « Écailles », noms de boss accordés (chaque langue cite son propre exemple). 10 langues, libellés
  cités vérifiés ; 10 langues × 3 largeurs sans défaut ; autotest 199/199. (Les capacités du boss sont déjà annoncées à
  son arrivée dans la bande : rien à ajouter pour signaler les Écailles en combat.)
- 2026-11-12 (it. 966) : accord du « vaincu » complété pour le russe et le polonais (limite laissée à l'it. 959) :
  boss au nom neutre (« Сердце Лавы », « L'Œil… ») ou pluriel (« Pince-Abysse » en russe) : « повержено », « повержены »,
  « pokonane », dans le journal, la bannière et le mode mini (agreeDefeated, bosses.js : remplace le participe de la
  phrase traduite selon le genre du nom dans la langue affichée). Test logique ; autotest 199/199.
- 2026-11-12 (it. 965) : fin de partie vérifiée après les Écailles (la rotation des capacités de boss change dès la
  zone 14) : simulation d'une semaine, mage 293 (repère 298), guerrier 293 ; comparé à l'état d'avant (61eef2d, dossier
  de travail git séparé) avec deux graines : 298 → 293 (graine 7), 298 → 307 (graine 3) : bruit, pas de mur. Repères de
  CLAUDE.md mis à jour. Aucun changement de code.
- 2026-11-12 (it. 964) : 15e capacité de boss, « Écailles » : les coups critiques (attaques et sorts) ne lui infligent
  que la moitié de leur bonus (critMul, SCALES.keep = 0,5) ; contre les héros qui misent tout sur le critique.
  Ajoutée à la fin de la rotation (ORDER) : les zones 1 à 13 gardent leurs capacités, la suite est décalée. Page du
  magasin : 15 capacités de boss (10 langues) ; README. Test logique ; fuzz 1200 parties, 0 bloquée ; équilibrage 12 h
  62,8 → 63,1 (bruit ; samouraï 64 → 65) ; 10 langues × 3 largeurs sans défaut ; autotest 199/199.
- 2026-11-12 (it. 963) : contrôles de fond après la série de nouveautés (it. 934-962). Mémoire dans la durée
  (mem-watch 8 min ×10) : « réel » 514-527 Mo, stable (repère 485-530) ; aucun Electron orphelin. Taille de la
  sauvegarde : 17 Ko (dev-data), 21 Ko après 48 h simulées (journey, bag, skills en tête) : très loin du quota Steam
  Cloud de 1 Mo (checklist mise à jour). Aucun changement de code.
- 2026-11-12 (it. 962) : « Quoi de neuf », édition 41 : Ruée des gobelins, victoires comptées par sorte d'élite et
  réplique du héros, journal plus léger (nouveau type annoncé sur la ligne du butin). 10 langues, libellés cités
  vérifiés ; 10 langues × 3 largeurs sans défaut ; autotest 199/199.
- 2026-11-12 (it. 961, revue générale) : simulation 12 h, records des courses : assassin 46 → 60, druide 41 → 64,
  samouraï 44 → 64 (régulier ; l'assassin redescend une fois, 61 → 58, bruit d'une graine). Performance (copie neuve) :
  bande 19,9 %, panneau 20,5 %, mini 6,8 %, icône 0,8 % (stable). Captures Familiers, Héros, Quêtes et mini en français,
  anglais et coréen : rien de cassé (« Carapace-des-Abysses l'Éveillée » dans la bande). Texte de l'interface en
  coréen : aucun mot non traduit. Rien de nouveau noté.
- 2026-11-12 (it. 960) : suite de l'it. 959, la bannière et le moment du mode mini quand un boss qui avait mis le héros
  K.O. tombe enfin : « Morille la Ronde enfin vaincue ! » (« por fin derrotada », « наконец повержена »…), selon le
  genre du nom dans la langue affichée (fem porté par le monstre et l'événement bossNemesis). Recherche des autres
  phrases accordées au nom d'un boss : aucune autre. Test logique (événement) ; 10 langues ; autotest 199/199.
- 2026-11-12 (it. 959) : vérifié en partie neuve (3 min) que l'annonce du nouveau type rejoint la ligne du butin
  (it. 958) : oui. Le même journal montrait « Morille la Ronde vaincu ! » : le français n'avait pas de table de genre
  des boss. Ajoutée (dix noms féminins : Morille la Ronde, Bave-Reine, Carapace-des-Abysses, Reine de Verre…) :
  épithète accordée (« Carapace-des-Abysses l'Éveillée », « … l'Ancestrale ») et « vaincue ! En route vers … » ; la
  forme féminine du message sert aussi aux langues qui ont déjà une table (es, pt : « derrotada » ; ru « повержена » ;
  pl « pokonana »), selon le genre du nom DANS chaque langue (bossGender, bosses.js). Test logique (fr) ; autotest
  199/199 ; fr, pt, es sans défaut.
- 2026-11-12 (it. 958) : partie neuve revue à 3 et 5 min (français, 1280 px) : rien de cassé ; le journal, étroit à
  1280 px, se remplissait de lignes de collection : « Butin rare : Gantelets de fer de l'aube ! » puis « Nouveau type
  d'objet pour la collection : Gantelets ! » (sept lignes à l'écran pour deux nouvelles). Le butin d'une victoire porte
  maintenant l'annonce sur sa propre ligne (« … ! Nouveau type pour la collection. ») ; ligne à part seulement quand il
  n'y a pas de ligne de butin (objet commun, vendu, laissé au sol, équipé par le Valet d'armes) et pour les autres
  sources (coffres, boutique, quêtes). Test logique (champion : butin épique) ; 10 langues ; autotest 199/199.
- 2026-11-12 (it. 957) : partie neuve revue (anglais, 1366 px, à 20 s et 60 s) : rien de bloquant ; deux détails.
  1) L'en-tête Équipement disait « click an item: de… » (coupé) alors qu'aucun objet n'est encore porté : l'aide
  n'apparaît qu'une fois un objet équipé. 2) La bénédiction « Grande chasse » promettait « Élites ×3 » en zone 1, où les
  élites n'existent pas encore : sa bulle ajoute « Les élites apparaissent à partir de la zone 3. » (première course,
  avant la zone 3 ; 10 langues). Vu en capture ; 10 langues × 3 largeurs sans défaut ; autotest 199/199.
- 2026-11-12 (it. 956) : collection des élites, suite : chaque sorte compte ses victoires (stats.affixesSeen : un nombre
  ; « true » des versions précédentes vaut 1, affixWins dans data.js) ; Bestiaire > Élites : « ✓ ×42 ». À la première
  victoire sur une sorte, le héros s'en réjouit (« Une de plus pour ma collection ! », « Celle-là, je ne l'avais jamais
  battue ! »). Test logique (compteur, ancienne valeur), contrôle d'autotest (bulle, en anglais) ; sauvegardes abîmées
  ok ; vu en allemand à 1280 px ; 10 langues ; autotest 199/199.
- 2026-11-12 (it. 955) : tests logiques indépendants les uns des autres : chaque test reçoit sa propre graine
  aléatoire, tirée de son nom (avant : une seule graine pour toute la suite, si bien qu'ajouter un test décalait les
  tirages de tous les suivants ; deux tests sans rapport ont échoué ainsi aux it. 943 et 954). Deux tests ne passaient
  que grâce à leur tirage : l'étal d'une partie neuve (tous les emplacements sont vides : le premier objet vise UN
  emplacement vide, pas forcément l'arme) et le Marchand attitré sac plein (une armure tirée puis mise en arme, sans
  attaque) ; corrigés. Équilibrage de la Ruée des gobelins (it. 954) : 12 h, moyenne 61,9 → 62,8 (bruit). 225 tests ;
  CLAUDE.md.
- 2026-11-12 (it. 954) : 14e événement rare, « Ruée des gobelins » (0,15 % par victoire, 30 s) : environ un monstre
  simple sur trois de la suite de la file devient un gobelin doré (or volé à rattraper), y compris dans les nouvelles
  séries pendant l'événement (comme la Lune de sang). Bilan de fin (« 2 gobelins attrapés, +… or »), réplique du héros
  (« Rendez-moi cet or ! »), son (ajouté au rendu hors ligne de l'autotest), carte du Bestiaire, +1 % d'or à la
  collection. Page du magasin : 14 événements rares dans les 10 langues ; README. Le contrôle des cartes du Bestiaire
  ne compte plus 13 en dur. Deux tests dépendaient des tirages (décalés par le nouveau test) : le Marchand attitré
  (une armure tirée au hasard puis mise en arme, sans attaque) tire maintenant une vraie arme. Fuzz 1200 parties,
  0 bloquée ; 225 tests ; autotest 198/198 ; vu dans la bande.
- 2026-11-12 (it. 953) : « Quoi de neuf », édition 40 : quête « proie », « ✦ » des élites jamais vaincues, panneau
  qui grandit avec la taille de l'interface. 10 langues, libellés cités vérifiés ; 10 langues × 3 largeurs sans défaut ;
  autotest 198/198. Coût de la règle des espaces insécables de t() (it. 952) : ≈ 0,8 µs par appel (mesuré sur
  1 million d'appels), négligeable ; mesure --perf : bande 19,9 %, panneau 21,4 % (bruit habituel).
- 2026-11-12 (it. 952) : « +20,53 M / or. » coupé dans le journal (idée de la revue 951) : t() rend désormais
  insécable l'espace qui suit un nombre, abrégé ou non (« 20,53 M », « 8 h », « 14 familiers », « 40 % »), quand un
  mot ou « % » suit (règle générale qui remplace celle de l'it. 950). Les tests logiques comparent le texte avec des
  espaces ordinaires (assert enveloppé ; les tests des insécables eux-mêmes restent stricts, assertStrict) ; un test
  de la ligne du journal. Vu en capture (journal en français) ; 10 langues × 3 largeurs sans défaut ; autotest
  198/198. Les lignes déjà écrites dans le journal d'une sauvegarde gardent leur ancienne espace.
- 2026-11-12 (it. 951, revue générale) : simulation 12 h, records des courses : rôdeur 44 → 62, paladin 44 → 64,
  moine 47 → 62 (régulier). Performance (copie neuve) : bande 19,5 %, panneau 20,9 %, mini 7,2 %, icône 0,5 %
  (stable). Captures Aventure, Talents, Boutique et mini en français, anglais et chinois : rien de cassé. Texte de
  l'interface en chinois : aucun mot non traduit. Noté en Idées (P3) : « +20,53 M / or. » coupé en fin de ligne dans
  le journal (nombre abrégé + unité, même famille que les « % » des it. 949-950).
- 2026-11-12 (it. 950) : suite de l'it. 949, « % » seul en début de ligne : ≈ 200 textes par langue européenne écrivent
  « {0} % » avec une espace ordinaire (keys.js 205, de 205, es 205, ru 64…), et les descriptions des données (potions,
  bénédictions, talents…) aussi. Sans retoucher les traductions : t() rend insécable l'espace entre un chiffre et
  « % », et translateData fait de même pour les descriptions (desc, text, passiveText ; il passe maintenant aussi en
  français, où tr() rend le texte tel quel). fsp() (espace française avant « : ! ? ») était elle aussi une espace
  ordinaire : U+00A0. Test logique (fr, de, fsp) ; --crawl en français sans erreur (328 clics) ; 10 langues × 3
  largeurs sans défaut ; autotest 198/198 ; CLAUDE.md (pièges).
- 2026-11-12 (it. 949) : taille de l'interface, suite de l'it. 948, trois défauts trouvés en capture :
  1) au LANCEMENT, la fenêtre grandissait mais le panneau gardait 500 px (bande blanche de 150 px en haut) : la
  taille partait avant que le jeu écoute la réponse de la fenêtre ; elle part maintenant après (uiScaleWindowReady,
  app.js) ; l'autotest ne testait que le changement en cours de partie. 2) Carte et Compétences prenaient la hauteur
  du panneau sans tenir compte du zoom (--ui-zoom, hauteur / zoom) : plus de défilement. 3) À 130 % sur un écran de
  1366 px, la largeur utile tombait à 1050 px (colonnes trop étroites, « Guerri… », « 263… ») : le zoom appliqué est
  borné pour garder 1280 px (effectiveUiScale), avec une note dans les Réglages (« Limité à 107 % par la largeur de
  l'écran. », 10 langues). Mesures à 115 et 130 % : 1366 et 1280 px sans défilement ; 1920 px : Aventure 23, Boutique
  57, Bestiaire 83 (acceptés). Au passage : NB (format.js), « espace fine insécable » d'après son commentaire, était
  une espace ordinaire depuis le premier commit : « 107 % », « 40 % »… pouvaient se couper en fin de ligne partout ;
  c'est maintenant U+00A0 (U+202F est absente des polices pixel, vérifié avec fontTools), même largeur. Test logique ;
  10 langues × 3 largeurs sans défaut ; autotest 198/198.
- 2026-11-12 (it. 948) : accessibilité, taille de l'interface (Réglages, 115 % et 130 %) : le texte agrandi faisait
  défiler presque tous les onglets (130 % à 1920 px : Aventure 139 px, Bestiaire 199, Boutique 173). Le panneau
  grandit maintenant d'autant (500 → 575 → 650 px), dans la limite de l'écran (réglage de fenêtre panelZoom, envoyé
  par applyUiScale, gardé dans settings.json ; strip-window.js > panelHeight). À 130 % et 1920 px : Aventure 139 → 23,
  Bestiaire 199 → 83, onze onglets sur quatorze sans défilement ; à 1366 px : la plupart des onglets à 0. Restent
  Carte et Compétences, qui se dessinent à la hauteur du panneau (le défilement y reste possible). Contrôle d'autotest
  (500 → 650 → 500 en changeant la taille) ; 198/198.
- 2026-11-12 (it. 947) : dans la bande, l'étiquette d'une élite (ou d'un champion) d'une sorte jamais vaincue porte
  « ✦ » (« Givré ✦ ») : on voit d'un coup d'œil qu'elle compte pour la collection du Bestiaire ; l'étoile disparaît
  une fois la sorte vaincue. Vu en capture (Lune de sang, file d'élites) ; contrôle d'autotest (avec et sans la sorte
  vaincue ; le contrôle des étiquettes sous le nom du boss passe avec les étiquettes allongées) ; 197/197.
- 2026-11-12 (it. 946) : 16e sorte de quête, « proie » : « Vaincre 2 élites « Fuyant » » (une sorte d'élite précise,
  nom entre guillemets pour éviter l'accord dans les langues à genres ; pluriels à 3 formes en russe et polonais).
  Récompense : coffre rare et or. Elle avance aussi pendant l'absence (chaque élite hors ligne a 1 chance sur 7 d'être
  la bonne sorte) ; une sorte inconnue (autre version) est remplacée par ensureQuests. Page du magasin : 16 sortes de
  quêtes dans les 10 langues ; README. Chasse aux erreurs : --crawl en russe, 327 clics sans erreur. Test logique
  (bonne sorte seulement, hors ligne, sorte inconnue) ; sauvegardes abîmées ok ; vu en russe à 1280 px (deux
  quêtes « proie ») ; 10 langues × 3 largeurs sans défaut ; autotest 196/196.
- 2026-11-12 (it. 945) : « Quoi de neuf », édition 39 : Jour des prodiges, collection des élites et succès « Tueur
  d'élites », répliques du héros aux événements et événement en cours encadré. 10 langues, libellés cités vérifiés ;
  10 langues × 3 largeurs sans défaut (pire cas de « Quoi de neuf » compris) ; autotest 196/196.
- 2026-11-12 (it. 944) : la première victoire sur une sorte d'élite s'annonce dans le journal (« Nouvelle sorte
  d'élite vaincue : Fuyant (3 / 7). »), une seule fois par sorte, comme les événements découverts. Test logique
  (annonce, pas de redite), contrôle d'autotest en anglais (« Evasive (1 / 7) », nom traduit) ; 10 langues ;
  autotest 196/196.
- 2026-11-12 (it. 943) : collection des élites. Chaque sorte d'élite vaincue est retenue (stats.affixesSeen, réparé
  s'il est abîmé) : Bestiaire > Élites affiche « (n / 7) », un ✓ sur les sortes vaincues, bordure en pointillés pour
  les autres ; nouveau succès « Tueur d'élites » (ELITES_ALL, avec sa progression, 64 succès), icône Steam (orc,
  achicons.js : seules les deux nouvelles images ajoutées, les 126 autres identiques), steam/achievements.md, README,
  checklist. Liste des succès : 13 px (le 64e faisait défiler Statistiques > Succès de 9 px en polonais à 1920).
  Test logique (victoire réelle d'une élite fuyante). Un ancien test (Grand intendant, « pas une ligne par familier »)
  dépendait des tirages : décalés par le nouveau test, ils donnaient un familier NOUVEAU et deux nouveaux types
  d'objets, lignes légitimes ; il ne compte plus que les lignes de routine. Sauvegardes abîmées : 1176 corruptions ok
  (avant et après) ; 10 langues sans défaut ; autotest 195/195.
- 2026-11-12 (it. 942) : Aventure, rangée de puces (idée P3 de la revue 941) : elle commence par ce qui est passager
  (événement rare en cours, potions actives), qui se retrouvait jusque-là derrière la longue bénédiction ; puis les
  reliques, la bénédiction et les panoplies. La bénédiction, quand d'autres puces la suivent, est bornée aux trois
  quarts de la rangée (points de suspension, effet entier dans sa bulle, qui le donne désormais) : la puce suivante
  se lit (« ◆ Plumag… » au lieu de « ◆ Plu »). --overflow-report ne compte plus cette coupure voulue. Vu en capture
  (français, russe) ; 10 langues × 3 largeurs sans défaut ; autotest 195/195.
- 2026-11-12 (it. 941, revue générale) : simulation 12 h, records des courses : guerrier 38 → 64, mage 43 → 59,
  nécromancien 41 → 60 (progression régulière, sans mur). Performance (copie neuve de dev-data) : bande 19,5 %, panneau
  20,7 %, mini 6,9 %, icône 0,7 % d'un cœur (stable). Captures Aventure, Quêtes, Statistiques et mini en français,
  anglais et japonais : rien de cassé. Texte de l'interface en japonais : aucun mot non traduit (seulement HP, Lv, Esc,
  noms des langues, « pt » des talents). Noté en Idées (P3) : la puce de la bénédiction, longue, cache presque toute
  la puce suivante de la rangée latérale de l'Aventure.
- 2026-11-12 (it. 940) : suite de l'it. 939, chasse aux défauts qui ne se voient que certains jours. --overflow-report
  (donc lang-overflow) rend maintenant l'Aventure (puce de la bénédiction, desc. de 12 à 38 caractères) et les
  Statistiques sous CHACUNE des 9 bénédictions (liste exposée en dev : window.__dayMods), et signale aussi une puce
  coupée. 10 langues × 3 largeurs : aucun défaut ; sans le remède de l'it. 939, seul « stats-treasure-chevauche=1 »
  ressort (la boucle passe bien par tous les jours). Autotest 195/195.
- 2026-11-12 (it. 939) : trouvé le défaut intermittent des Statistiques (it. 920, 935, 936) : il dépendait du JOUR.
  Les jours de bénédiction qui touchent aux coffres, élites ou gobelins, la valeur gagne « · aujourd'hui … » ; elle ne
  passait jamais à la ligne (b en nowrap) et écrasait son libellé (« Schatztruhe » sous « 0,2 % · Elite 1,5 % · Boss
  3 % · heute 0,6 % », en allemand à 1280 et 1366 px, Jour des trésors). Remède : une valeur en segments (« · ») passe
  à la ligne entre ses segments, et son libellé garde au moins la largeur de son plus long mot. Mesure : marge de chaque
  libellé (longueur du plus long mot) dans une injection TEMP, puis Jour des trésors forcé. --overflow-report (donc
  lang-overflow) mesure maintenant les Statistiques sous les Jours des trésors, Grande chasse, Fête des gobelins et
  Jour des prodiges (« stats-treasure-chevauche=1 » sans le remède : vérifié). 10 langues × 3 largeurs : aucun défaut ;
  autotest 195/195.
- 2026-11-12 (it. 938) : 9e bénédiction du jour, « 🌠 Jour des prodiges » : événements rares deux fois plus
  fréquents (la collection des événements, +1 % d'or chacun, avance plus vite ce jour-là). Répartition sur un an :
  35 à 49 jours par bénédiction. Le choix du jour passe de 8 à 9 bénédictions : celle d'aujourd'hui peut changer à la
  mise à jour (sans conséquence). Test logique (×1,5 à ×2,6 sur 40 000 victoires), 10 langues, autotest 195/195.
- 2026-11-12 (it. 937) : le héros a une réplique propre à six événements rares (« Il pleut de l'or ! », « Fais un
  vœu ! », « La lune saigne… ils arrivent. », « J'ai des ailes ! », « Je ne peux plus rater ! », « Des œufs
  partout ! ») ; les autres gardent les répliques communes. Chasse aux bugs : 4000 parties (200 graines), 0 bloquée ;
  Talents, Compétences et Carte revus en russe et en allemand à 1280 px, rien à corriger. Traduit dans les 10
  langues ; contrôle d'autotest (195/195).
- 2026-11-12 (it. 936) : Bestiaire > Événements rares, l'événement en cours a sa carte encadrée et ses secondes
  restantes à la place de sa chance (« en cours · 18 s »), qui s'égrènent. Le défaut intermittent des Statistiques en
  russe (it. 920, 935) n'a pas été reproduit, même avec toutes les valeurs gonflées en russe, allemand et polonais à
  1280 et 1366 px : on attend que le rapport, qui cite maintenant le libellé, le prenne sur le fait. Traduit dans les
  10 langues ; contrôle d'autotest (194/194).
- 2026-11-12 (it. 935) : « Quoi de neuf », édition 38 : temps restant des quêtes et du prochain déblocage,
  bénédiction de demain, bonus de la collection des événements rares, élite Fuyant. Traduite dans les 10 langues,
  libellés cités vérifiés ; autotest 193/193. La mesure des 10 langues a de nouveau signalé une fois
  « stats-chevauche=1 » en russe à 1280 px (non reproduit en cinq passages isolés : il dépend d'une valeur qui change
  avec le temps de jeu) ; le rapport de --overflow-report cite maintenant le libellé et la valeur en cause.
- 2026-11-12 (it. 934) : un 7e affixe d'élite, « Fuyant » : il esquive 20 % des coups du héros (« Raté ! », les coups au
  clic touchent toujours), comme les boss insaisissables ; les héros à gros coups lents en souffrent, les rapides
  moins. Nom propre à l'affixe (traduit en adjectif : « Ausweichender Champion »), description reprise de la capacité
  de boss. La page du magasin Steam passe à « 7 sortes d'élites » dans les 10 langues (signalé par la vérification de
  l'it. 914). Fuzz 1200 parties, 0 bloquée ; équilibrage 12 h −0,8 zone (bruit) ; test logique ; autotest 193/193 ;
  vu en capture (allemand, Bestiaire > Élites).
- 2026-11-12 (it. 933) : la première fois qu'un événement rare arrive, le journal le dit : « Événement découvert :
  +1 % d'or trouvé pour toujours (6 / 13). » (bonus de la collection, it. 932), comme pour une première panoplie
  complétée. Traduit dans les 10 langues ; test logique. Erreur de méthode : ce commit est parti avec un autotest à
  192/193 (commande enchaînée sans lire le bilan) ; le contrôle fautif, « taux d'élite du jour », attendait 18 % pile
  alors que la Carte du ciel peut acheter des rangs du Chasseur pendant l'autotest (28,8 %) : il compare maintenant au
  taux calculé comme le jeu (193/193, commit suivant).
- 2026-11-12 (it. 932) : la collection des événements rares (Bestiaire > Événements rares) rapporte : chaque
  événement déjà vécu donne +1 % d'or trouvé pour toujours (13 % au plus), comme les paliers du bestiaire et la
  collection d'objets ; la règle et le bonus actuel sont écrits en tête du sous-onglet. Les « ??? » deviennent un
  objectif. Statistiques recalculées au premier passage de chaque événement. Équilibrage 12 h −0,1 zone (bruit) ;
  traduit dans les 10 langues ; test logique ; autotest 193/193 ; vu en capture (allemand, 1280 px).
- 2026-11-12 (it. 931, revue générale + correction) : simulations de 12 h régulières (paladin 43 → 64, nécromancien
  38 → 60, samouraï 40 → 62) ; performance : bande 19,5 %, panneau 20,7 %, mini 7,0 %, icône 0,7 % d'un cœur ;
  captures fr/en/es (Aventure, Quêtes, Héros, Familiers, mini) sans débordement. Vu en espagnol : les intitulés de
  quêtes mêlaient infinitif et impératif (« Derrotar 70 monstruos », « Derrota a 2 élites », « Crea 12 objetos »).
  Harmonisés : infinitif en espagnol, portugais et allemand (comme le français et l'anglais ; 4 intitulés chacun),
  impératif en russe (comme le polonais ; 7 intitulés : « Найди », « Верни », « Примени »…). Mesure à 1280 px sans
  débordement ; autotest 193/193.
- 2026-11-12 (it. 930) : la bulle du mode mini donne aussi le temps estimé du prochain déblocage (« … · 12,3 Md /
  20,0 Md or · ≈ 1 h 10 min »), comme la carte du héros (it. 928). Mesure des 10 langues avec le nouvel état « tous
  les déblocages sauf le dernier » (it. 929) : aucun défilement ni mot coupé. Contrôle d'autotest (193/193 ; il rend
  ensuite les statistiques recalculées, sinon un contrôle suivant lisait un taux faussé).
- 2026-11-12 (it. 929) : lang-overflow (mesure des 10 langues) mesure aussi l'Aventure avec tous les déblocages sauf
  le dernier, la carte « Prochain déblocage » prête puis pas prête (« adventure-avant-dernier-…=N ») ; avant, il ne
  mesurait que « tous les déblocages », où cette carte disparaît (défaut de l'it. 928 passé inaperçu). Vérifié : sans
  la correction de l'it. 928, il signale 11 px en russe à 1280 ; avec, rien (russe, allemand, polonais, français à
  1280 et 1366 px). Note de CLAUDE.md mise à jour.
- 2026-11-12 (it. 928) : carte « Prochain déblocage » du héros : quand il ne manque que de l'or, le temps estimé au
  rythme actuel des victoires (« 15,00 No / 20,00 No or · ≈ 47 h ») ; rien au-delà de 48 h. En mesurant son pire cas,
  trouvé un défaut plus ancien : avec tous les déblocages sauf le dernier (zones 260-300), la carte prenait quatre
  lignes en russe à 1280 px (« Личный торговец · нажми, чтобы купить (20,00 No золота) ») et l'Aventure défilait de
  11 px ; les mesures habituelles prennent « tous les déblocages », où la carte disparaît. La carte tient maintenant en
  trois lignes au plus, texte complet au survol. Test logique ; contrôle d'autotest du pire cas à 1280 px (192/192) ;
  mesure des 10 langues sans débordement ; vu en capture (russe). Note dans CLAUDE.md.
- 2026-11-12 (it. 927) : contrôle d'autotest du temps restant des quêtes (it. 926) au pire cas, à 1280 px : grands
  nombres (« 1,50 Qa / 1,70 Qa »), estimations de dizaines d'heures, trois quêtes 3 étoiles : chaque ligne de
  progression tient sur une ligne, sans déborder de sa carte (191/191).
- 2026-11-12 (it. 926) : les quêtes qui avancent au rythme des combats (victoires, chasse, or) donnent le temps
  restant estimé à côté de la progression (« 4442 / 9000 · ≈ 13 h 18 min »), d'après les 60 dernières victoires
  (chasse : une victoire sur le nombre de types de la zone) ; rien tant que le rythme n'est pas connu, ni au-delà de
  48 h. Un objectif proche qui se chiffre. Traduit dans les 10 langues ; test logique ; autotest 190/190 ; vu en
  capture (allemand, 1280 px).
- 2026-11-12 (it. 925) : Statistiques, temps de jeu et temps hors ligne sans les minutes dès qu'il y a des jours
  (« 1 j 23 h » au lieu de « 1 j 23 h 10 min ») : la valeur reste courte même après des semaines ; en russe à 1280 px,
  « Засчитанное офлайн-время » pouvait passer sous elle (vu une fois à l'it. 920). Pire cas mesuré (12 jours hors
  ligne, 123 jours de jeu) en russe, allemand et polonais à 1280 px : aucun débordement. Chasse aux bugs : 1200
  parties sans blocage ; parcours --crawl d'une partie neuve en coréen sans erreur. Autotest 190/190.
- 2026-11-12 (it. 924) : la bulle de la bénédiction du jour (carte du héros) annonce aussi celle de demain (« Demain :
  🍃 Jour du vent · +20 % de vitesse de déplacement. ») : elle est tirée de la date, donc connue d'avance ; de quoi
  prévoir un retour (Jour des trésors, Grande chasse…). Traduit dans les 10 langues ; contrôle d'autotest (190/190).
- 2026-11-12 (it. 923) : « Quoi de neuf », édition 37 : ciels de la Lune de sang et de la Nuée d'étoiles (bande et
  mode mini), sous-onglet Bestiaire > Événements rares et son lien depuis les Statistiques. Traduite dans les 10
  langues, libellés cités vérifiés ; mesure des 10 langues : aucun défilement ni mot coupé ; autotest 189/189.
- 2026-11-12 (it. 922) : Statistiques > Probabilités, « Événements rares (n / 13) » est un lien (vert, souligné en
  pointillés) qui ouvre d'un clic Bestiaire > Événements rares (it. 920) ; le détail reste au survol de la ligne.
  Nouvelle variante de style « lien dans le texte » (.linkbtn.textlink), le bouton encadré cassait la ligne. Contrôle
  d'autotest (189/189) ; vu en capture ; langues longues à 1280 et 1366 px sans débordement.
- 2026-11-12 (it. 921, revue générale) : rien de cassé trouvé. Simulations de 12 h : records des courses druide
  41 → 64, mage 40 → 60, guerrier 48 → 64, sans saut ni plafond. Performance (copie neuve) : bande 19,5 %, panneau
  20,4 %, mini 7,0 %, icône 0,6 % d'un cœur. Captures en français, anglais et polonais (Aventure, Bestiaire, Boutique,
  Réglages, mode mini) : ni débordement ni texte coupé ; l'interface japonaise extraite ne contient aucun mot latin
  suspect.
- 2026-11-12 (it. 920) : nouveau sous-onglet Bestiaire > Événements rares (« 5 / 13 ») : une carte par événement, à sa
  couleur, avec son effet et sa chance par victoire ; ceux jamais vus restent « ??? » (avec leur chance). Un objectif
  à collectionner, lié au succès « Chasseur d'événements » ; avant, les événements n'étaient décrits que dans une
  bulle de survol des Statistiques. Apparaît après le premier événement vécu. Contrôle d'autotest (188/188) ; vu en
  capture (allemand, 1280 px) ; mesure des 10 langues : sous-onglets sans débordement.
- 2026-11-12 (it. 919) : contrôle d'autotest du ciel des événements en mode mini (Lune de sang, Nuée d'étoiles, retour
  au ciel normal ; 187/187). Performance après les it. 916-918 (copie neuve) : bande 19,8 %, panneau 20,6 %, mini
  7,0 %, icône 0,5 % d'un cœur, inchangée.
- 2026-11-12 (it. 918) : le mode mini montre aussi le ciel des événements, comme la bande (it. 916-917) : rouge avec
  une lune rouge pendant la Lune de sang, assombri et constellé pendant la Nuée d'étoiles. Cuit dans le décor du
  mini, redessiné seulement quand l'événement commence ou finit. Autotest 186/186 ; vu en capture.
- 2026-11-12 (it. 917) : pendant la Nuée d'étoiles, le ciel de la bande s'assombrit et se constelle (toutes les
  étoiles, même de jour et même avant que l'histoire les ait rallumées), avec un fondu ; les étoiles filantes s'y
  détachent mieux. Même principe que la Lune de sang (it. 916) : dessiné une fois dans le décor en cache, aucun coût
  par image. Contrôle d'autotest (186/186) ; vu en capture.
- 2026-11-12 (it. 916) : pendant la Lune de sang, le ciel de la bande rougit et une lune rouge en pixels se lève, avec
  un fondu à l'arrivée et au départ. Dessiné une seule fois dans le décor déjà en cache (aucun coût par image, pas
  d'animation CSS). Rythme de la première heure vérifié (early-pace : inchangé). Contrôle d'autotest (185/185) ; vu
  en capture.
- 2026-11-12 (it. 915, contrôle) : nombres du README comparés au code : « 46 types » d'objets corrigé en 44 (comme la
  collection) ; le reste est juste (20 héros, 26 automatismes, 33 zones, 83 monstres, 3 capacités du Briseur
  d'Étoiles, liste des 14 capacités de boss).
- 2026-11-12 (it. 914) : npm test vérifie les nombres de la page du magasin Steam (scripts/steam-store-check.mjs) :
  héros, compétences, régions, monstres, automatismes, événements rares, capacités de boss, élites et sortes de
  quêtes, dans les 10 langues, comparés au code ; un ajout de contenu qui rend la page fausse fait échouer les tests
  (vérifié en changeant un nombre). Au passage, la version japonaise écrit « 二人一組 » et « 同じ一時間 » en kanji
  (seuls les nombres utiles en chiffres). CLAUDE.md mis à jour.
- 2026-11-12 (it. 913) : page du magasin Steam (steam/store-page.md, 10 langues) : une ligne sur la variété, réponse
  au premier reproche fait aux jeux de bande (« répétitif ») : « Jamais deux heures pareilles : 13 événements rares,
  14 capacités de boss, 6 sortes d'élites, une bénédiction différente chaque jour et 15 sortes de quêtes ». Nombres
  vérifiés dans le code (14 capacités : le Silence des échos compte) ; les autres nombres de la page sont justes
  (20 héros, 144 compétences, 33 régions, 83 monstres, 26 automatismes). Rappel dans CLAUDE.md. Parcours --crawl en
  thème clair, allemand et japonais (326 et 327 clics, aucune erreur).
- 2026-11-12 (it. 912) : « Quoi de neuf », édition 36 : Nuée d'étoiles (et touche F), emplacement vide de
  l'Équipement qui mène au meilleur objet du sac, « À faire maintenant » allégé de ce que font les automatismes.
  Traduite dans les 10 langues, libellés cités vérifiés ; mesure des 10 langues : aucun défilement ni mot coupé ;
  autotest 184/184.
- 2026-11-12 (it. 911, revue générale) : rien de cassé trouvé. Simulations de 12 h : records des courses assassin
  39 → 62, berserker 47 → 62, rôdeur 38 → 62, sans saut ni plafond. Performance (copie neuve) : bande 19,7 %,
  panneau 21,2 %, mini 7,1 %, icône 0,5 % d'un cœur. Captures en français, anglais et russe (Aventure, Quêtes,
  Ascension, Carte, mode mini) : ni débordement ni texte coupé ; l'interface russe extraite ne contient aucun mot
  latin suspect.
- 2026-11-12 (it. 910) : une astuce pour la première Nuée d'étoiles, sans Filet à étoiles : « clique sur les étoiles
  filantes qui passent (ou touche F, panneau ouvert) : +2 % de vitesse pour toujours chacune ! ». Elle passe avant
  les autres astuces (l'événement ne dure que 30 s) et fait découvrir la touche F (it. 900). Tour de « À faire »
  terminé : un objet plus puissant reste à juste titre « à faire » avec le Valet d'armes (il n'équipe qu'à
  l'arrivée). Traduit dans les 10 langues ; contrôle d'autotest (184/184).
- 2026-11-12 (it. 909) : « À faire maintenant » ne signale plus ce qu'un automatisme acheté fait déjà tout seul :
  les expéditions finies avec le Grand intendant (il les récupère), et les quêtes terminées quand le Bureau des
  contrats les réclame automatiquement (restent seulement celles qui attendent de la place dans le sac pour leur
  coffre). Passés en revue aussi : éclats d'étoile (la Carte du ciel dépense tout ce qui est abordable, rien à
  signaler) ; points de talent et de compétence (laissés : il peut en rester que l'automatisme ne place pas). Test
  logique ; autotest 183/183.
- 2026-11-12 (it. 908) : avec le Grand intendant, les œufs gagnés n'apparaissent plus dans « À faire maintenant »
  (résumé de retour, carte du héros, mode mini) : il les fait éclore lui-même, comme il envoie les familiers libres en
  expédition (it. 876). Et il passe dès la seconde qui suit l'arrivée d'un œuf, au lieu d'attendre jusqu'à 5 s
  (« 6 œufs en attente » vus à la revue 901). Tests logiques adaptés (Nichée sans l'intendant) ; contrôle d'autotest
  du résumé de retour lancé sans l'intendant (183/183).
- 2026-11-12 (it. 907) : panneau Équipement, un emplacement vide pour lequel le sac contient un objet est en
  pointillés verts, et un clic dessus ouvre la fiche du meilleur objet du sac pour cet emplacement (« Emplacement
  vide : à équiper ! », bouton Équiper). Vu sur une partie neuve à 2 minutes : une hache rare dans le sac, rien
  d'équipé, le héros à mains nues tant que le double-clic n'est pas découvert. Reste une action manuelle (« Équiper
  le meilleur » reste un déblocage). Traduit dans les 10 langues ; contrôle d'autotest (183/183) ; vu en capture.
- 2026-11-12 (it. 906, fiabilité) : boucles « while » du jeu passées en revue après le blocage de l'it. 905 : toutes
  bornées (nombre maximal, prix croissant, pas de temps plafonné) ou nettoyées au chargement ; rien à corriger.
  L'échec isolé de l'autotest (it. 904) ne s'est pas reproduit en sept passages ; pour ne plus le perdre, le lanceur
  de l'autotest garde sa sortie complète dans logs/selftest-last.log et le dernier échec dans
  logs/selftest-last-fail.log (logs/ ajouté à .gitignore, il n'était exclu que sur le serveur). Autotest 182/182.
- 2026-11-12 (it. 905) : save-fuzz corrompt aussi les champs d'un objet du sac et d'un objet porté, d'une quête (et
  de sa récompense), d'un familier et d'une expédition (1176 cas au lieu de 910). Il a trouvé un blocage complet :
  une quête aux étoiles illisibles changeait la réputation de guilde en texte (« 103x ») et le calcul du rang de
  guilde tournait alors sans fin (jeu figé). Corrigé à trois endroits : étoiles vérifiées au chargement, réputation
  ajoutée seulement de 1 à 3, rang de guilde qui ne peut plus boucler (valeur illisible : 0 ; rang plafonné). Et un
  plantage : un objet au nom illisible faisait planter son affichage ; il prend le nom de son emplacement. Test
  logique ; save-fuzz 1176 « ok » en 31 s ; autotest 182/182. FUZZ_TRACE=1 (cas affiché avant d'être joué) pour
  trouver un blocage ; noté dans CLAUDE.md.
- 2026-11-12 (it. 904) : save-fuzz joue aussi, pour chaque sauvegarde abîmée, les actions du joueur : ranger, forger,
  réforger, équiper, retirer, transmuter, vendre, acheter (consommables, coffres, œuf, marchand, améliorations,
  atelier), boire une potion, faire éclore, changer de familier et l'envoyer en expédition, apprendre un sort et un
  talent, acheter les constellations, changer de zone et de quête, réclamer la récompense du jour, faire l'ascension.
  Il a trouvé un plantage : avec la liste des héros joués abîmée, l'ascension plantait ; elle est remise en état au
  chargement. Test logique ; save-fuzz 910 « ok » ; autotest 182/182.
- 2026-11-12 (it. 903) : save-fuzz (sauvegardes abîmées) joue maintenant à coup sûr, pour chacune des 910
  corruptions, les moments à risque : mort du héros face à un boss, boss vaincu, événement rare et son bilan, coffre,
  étoile filante, achat d'un déblocage, quêtes réclamées. Avant, seul le hasard du combat les amenait : le plantage
  de l'it. 902 n'apparaissait qu'une fois sur deux. Vérifié : sans le correctif de l'it. 902, le balayage échoue à
  chaque passage (8 cas) ; avec, 910 « ok ». Note de CLAUDE.md mise à jour.
- 2026-11-12 (it. 902) : sauvegardes abîmées, deux plantages évités. Avec un compteur de défaites des boss illisible
  (un nombre au lieu d'une liste), la mort du héros face à un boss plantait le jeu ; avec une liste des déblocages
  illisible, l'achat d'un déblocage aurait planté aussi (vu par save-fuzz, une fois sur deux : le cas dépend du
  combat). Les deux sont remis à zéro au chargement s'ils sont illisibles, comme les autres données. Test logique ;
  save-fuzz relancé deux fois (910 corruptions, toutes « ok ») ; autotest 182/182 ; note dans CLAUDE.md (relancer
  save-fuzz plusieurs fois).
- 2026-11-12 (it. 901, revue générale) : rien de cassé trouvé. Simulations de 12 h : records des courses moine
  41 → 64, samouraï 40 → 62, nécromancien 38 → 60, sans saut ni plafond. Performance (copie neuve) : bande 19,8 %,
  panneau 20,8 %, mini 7,2 %, icône 0,6 % d'un cœur. Captures en français, anglais et chinois (Aventure, Talents,
  Familiers, Statistiques, mode mini) : ni débordement ni texte coupé ; l'interface chinoise extraite ne contient
  aucun mot latin suspect. (Vu : « 6 œufs en attente » cinq secondes après le lancement, le Grand intendant passant
  toutes les 5 s : normal.)
- 2026-11-12 (it. 900) : touche F du panneau, attraper l'étoile filante qui passe, sans viser sur la bande (utile
  pendant la Nuée d'étoiles, et au clavier) ; listée dans les raccourcis clavier (libellé déjà traduit). Contrôle
  d'autotest (182/182) ; fenêtre des raccourcis mesurée dans les 10 langues : aucun défilement ni mot coupé.
- 2026-11-12 (it. 899, contrôle) : fin de partie après la série d'ajouts des it. 878-898 (Crachat venimeux, Lune de sang,
  Épineux, Jour des trésors, quête des coffres, Nuée d'étoiles) : semaine simulée, records des courses en hausse
  régulière jusqu'à 298 (mage) et 311 (guerrier), un peu au-dessus des repères de l'it. 736 (287 et 302), sans saut
  ni plafond ; repères mis à jour dans CLAUDE.md. Bestiaire > Élites vu en capture à 1280 px (allemand, japonais) :
  les six cartes, dont « Épineux », tiennent sans débordement. Rien à corriger.
- 2026-11-12 (it. 898) : un 13e événement rare, la « Nuée d'étoiles » (0,1 % par victoire) : pendant 30 s, les
  étoiles filantes (+2 % de vitesse pour toujours chacune, plus de l'or) se suivent toutes les 1,5 s au lieu d'une
  toutes les 40 à 90 min ; un joueur présent peut en attraper une dizaine, le Filet à étoiles en prend quelques-unes
  tout seul. Ensuite, le rythme habituel revient. Bilan dans le journal (« … étoiles filantes attrapées »), couleur
  dorée sur la bande et le mode mini, son propre (cascade d'étoiles). Au passage, un ancien test du Grand intendant
  repérait les nouvelles lignes du journal en cherchant les cinq précédentes (cassé par une ligne fusionnée « ×2 »,
  révélé par le nouveau tirage) : il pose un repère explicite. Équilibrage 12 h inchangé (62,8) ; traduit dans les 10
  langues ; test logique ; son rendu par l'autotest (181/181) ; vu en capture.
- 2026-11-12 (it. 897) : « Quoi de neuf », édition 35 : Jour des trésors et quête des coffres, bilan des événements
  dans le journal, événement en cours dans le mode mini, Lune de sang visible sur toute la file, taux du jour dans les
  Probabilités, effet de la bénédiction sur la carte du héros, coffres et événements dans « Depuis ta dernière visite ».
  Traduite dans les 10 langues, libellés cités vérifiés. Vérifié aussi : la taille de panneau 130 % fait défiler le
  panneau, ce qui est attendu (zoom choisi par le joueur). Mesure des 10 langues aux trois largeurs : aucun
  défilement ni mot coupé ; autotest 181/181.
- 2026-11-12 (it. 896) : « Depuis ta dernière visite » (carte du héros, panneau resté fermé 5 min ou plus) compte
  aussi les coffres au trésor trouvés et les événements rares vécus. Au passage, son pire cas (tous les gains,
  nombres longs) faisait défiler l'Aventure à 1920 px (3 px avant l'ajout, 18 px avec) : la ligne tient maintenant
  en deux lignes au plus, les gains les plus importants d'abord, tout au survol (sous 1500 px, une seule ligne comme
  avant). Recherche d'unités écrites en dur après l'it. 895 : aucune autre. Test logique ; contrôle d'autotest du pire
  cas (181/181) ; traduit dans les 10 langues ; vu en capture (allemand, 1920 px).
- 2026-11-12 (it. 895) : mode mini, un événement rare en cours s'affiche à la place de la ligne de zone, à sa couleur,
  avec ses secondes (« Corne d'abondance 23 s » ; zone et effet dans la bulle) : avant, le mini ne l'annonçait qu'à son
  début, la bande le montrait pendant toute sa durée. Au passage, le « s » des secondes restait en dur sur la bande,
  dans le mode mini et sur la pastille du panneau : « 23 с » en russe, « 23 秒 » en japonais et chinois, « 23초 » en
  coréen. Parcours --crawl en russe (328 clics, aucune erreur). Autotest 180/180 ; vu en capture (allemand, russe,
  japonais).
- 2026-11-12 (it. 894) : quand un événement rare se termine, le journal en fait le bilan, en une ligne : « Lune de
  sang · bilan : 7 élites vaincues, +1,2 M or. », « Corne d'abondance · bilan : 9 monstres vaincus, 9 objets
  trouvés. », « Œil du faucon · bilan : … coups critiques », « Marée arcanique : … sorts lancés », « Pluie d'éclats :
  … éclats d'étoile » ; les autres donnent le nombre de monstres vaincus. Rien si aucune victoire pendant l'événement.
  Avant, il s'arrêtait sans rien dire de ce qu'il avait rapporté. Thème clair vérifié au passage sur les ajouts
  récents (Aventure, Bestiaire, Statistiques, Quêtes) : rien à corriger. Traduit dans les 10 langues (pluriels
  russes et polonais) ; test logique ; autotest 180/180 ; vu en capture.
- 2026-11-12 (it. 893) : Statistiques > Probabilités, les taux d'élite, de gobelin doré et de coffre au trésor
  donnent aussi le taux du jour quand il diffère (« Élite : 6 % par monstre · aujourd'hui 18 % » un jour de Grande
  chasse ; Appât des champions compris ; Fête des gobelins ; Jour des trésors) : avant, la page affichait la base,
  fausse ces jours-là. Mémoire dans la durée (mem-watch 12 min à ×10, première mesure depuis l'it. 731) : 535 → 519 Mo
  réels, sans pente. Traduit dans les 10 langues ; contrôle d'autotest (taux du jour, sans défilement à 1280 px ;
  180/180) ; vu en capture (allemand, 1280 px).
- 2026-11-12 (it. 892) : bande, l'étiquette d'affixe d'une élite de la file (souvent un monstre volant, plus haut)
  ne passe plus sous le nom du boss, qui s'étend vers la gauche (« Furieux » sur « Carapace-des-Abysses ») : elle se
  place alors sous son monstre. Mesuré seulement quand la série ou la place du nom change, jamais à chaque image.
  (Essai écarté : décaler l'étiquette vers la gauche l'éloignait de son monstre et la posait sur la voisine.)
  Contrôle d'autotest sur les 200 zones avec une file entièrement élite : 34 zones en défaut sans le correctif,
  aucune avec (179/179) ; vu en capture.
- 2026-11-12 (it. 891, revue générale) : rien de cassé trouvé. Simulations de 12 h : records des courses rôdeur
  40 → 60, paladin 44 → 64, druide 39 → 63, sans saut ni plafond (avec la Lune de sang, l'élite Épineux, le Jour des
  trésors et la quête des coffres). Performance (copie neuve) : bande 19,7 %, panneau 20,6 %, mini 7,1 %, icône
  0,5 % d'un cœur (repères tenus). Captures en français, anglais et coréen (Aventure, Héros, Boutique, Quêtes, mode
  mini) : ni débordement ni texte coupé ; l'interface coréenne extraite ne contient aucun mot latin suspect.
- 2026-11-12 (it. 890) : Lune de sang (it. 880), les élites se voient enfin sur la bande. La bande dessine le monstre
  combattu avec l'image de sa place dans la file, recréée seulement quand la série change : une élite créée à
  l'apparition se battait sans contour doré ni étiquette d'affixe. Maintenant, dès le début de l'événement, toute la
  suite de la file devient élite (le monstre déjà en combat reste tel quel) et la file est redessinée ; une série
  tirée pendant l'événement naît élite. On voit d'un coup d'œil la vague qui arrive. Fuzz 1200 parties, 0 bloquée ;
  test logique ; autotest 178/178 ; vu en capture.
- 2026-11-12 (it. 889) : une 15e sorte de quête, « Trouver N coffres au trésor » (1 coffre, 2 ou 3 selon les
  étoiles ; or, 2 potions, parfois un œuf) : un objectif de patience qui avance aussi pendant l'absence et va vite le
  Jour des trésors (it. 887). Icône du coffre en bois. Une ancienne version qui ne la connaît pas la remplace au
  chargement (ensureQuests). Équilibrage 12 h −0,7 zone (bruit) ; traduit dans les 10 langues (pluriels russes et
  polonais) ; test logique ; autotest 178/178 ; vu en capture (allemand, 1280 px).
- 2026-11-12 (it. 888) : carte du héros, la pastille de la bénédiction du jour montre l'icône et l'effet
  (« 🛡 +25 % de PV et de défense. ») ; le nom du jour passe dans la bulle de survol, avec l'explication. Avant, « nom ·
  effet » partait hors de la carte à 1280 px (allemand : « Tag des Walls · +25 % LP und Verteidig… ») : on ne
  lisait pas l'effet sans survol. Essayé d'abord : laisser la pastille se replier sur deux lignes ; au pire cas
  (Jour de furie, Grande chasse), l'Aventure défilait de 11 à 14 px à 1280 px en polonais, espagnol, portugais et
  russe : abandonné. Autotest 178/178 ; vu en capture (allemand et espagnol, 1280 px).
- 2026-11-12 (it. 887) : une 8e bénédiction du jour, le « Jour des trésors » : les coffres au trésor trouvés sur le
  chemin sont trois fois plus fréquents, en jeu comme pendant l'absence (plafond hors ligne triplé aussi). Utile à
  tous les joueurs, débutants compris. Les jours sont redistribués entre les 8 bénédictions (prochains jours des
  trésors : 17 et 22 novembre). Sauvegardes abîmées : 910 corruptions, toutes « ok ». Équilibrage 12 h inchangé
  (63,1) ; traduit dans les 10 langues ; test logique ; autotest 178/178 ; vu en capture (allemand, 1280 px).
- 2026-11-12 (it. 886) : « Quoi de neuf », édition 34 (vue une fois au prochain lancement) : Crachat venimeux et
  Talisman de pureté, élite Épineux, Lune de sang, quêtes qui avancent pendant l'absence, Grand intendant pendant les
  combats de boss, familiers libres dans « À faire maintenant », thème clair plus lisible ; traduite dans les 10
  langues, libellés cités tels qu'ils sont traduits (i18n-quotes). Mesure des 10 langues à 1920, 1366 et 1280 px
  (pire cas de « Quoi de neuf » et nouvelle carte d'élite du Bestiaire compris) : aucun défilement ni mot coupé ;
  autotest 178/178.
- 2026-11-12 (it. 885) : un 6e affixe d'élite, « Épineux » : il renvoie au héros 15 % des dégâts qu'il reçoit
  (seulement ce qu'il encaisse vraiment, pas l'excédent du coup fatal), sans jamais l'achever, comme le Miroir des
  boss (nombre affiché au-dessus du héros). Les héros à gros coups paient leur force, les tanks et le vol de vie s'en
  moquent. Étiquette verte dans la file, carte dans Bestiaire > Élites ; il peut aussi être champion ou venir avec la
  Lune de sang. Panneau remesuré (copie neuve) : 20,5 % d'un cœur, dans le repère (les 21,7 % de la revue 881 étaient
  du bruit). Équilibrage 12 h +0,6 zone (bruit) ; 1200 parties, 0 bloquée ; traduit dans les 10 langues (le nom
  reprend la clé « Épineux » d'un talent) ; test logique ; autotest 178/178 ; vu en capture.
- 2026-11-12 (it. 884) : le Grand intendant (familiers) ne travaillait qu'après une victoire : pendant un long combat
  de boss (héros bloqué devant un mur, situation fréquente), les œufs gagnés et les expéditions finies attendaient
  (vu en capture : « 4 œufs en attente » avec l'intendant coché). Il passe maintenant chaque seconde de jeu (toujours
  au plus une fois toutes les 5 s). Avec lui, le journal dit simplement « Un œuf ! » au lieu d'inviter à le faire
  éclore soi-même. La note de l'onglet Quêtes, devenue fausse depuis les it. 882-883, dit maintenant que les quêtes
  avancent aussi hors ligne « sauf boss, événements rares et sorts » (10 langues). Test logique ; autotest 178/178 ;
  vu en capture (allemand, 1280 px).
- 2026-11-12 (it. 883) : suite de l'it. 882, trois autres quêtes ne restent plus figées pendant une absence :
  « Chasser N … » avance avec les victoires sur ce type de monstre (déjà comptées pour le bestiaire), « Trouver N
  objets rares ou mieux » avec le butin rare tiré hors ligne (gardé ou non, comme en jeu), et « Porter N coups
  critiques » avec une estimation basse (un coup par victoire, aux chances de critique du héros ; le compteur des
  statistiques suit). Restent volontairement figées hors ligne : « Vivre un événement rare » et « Lancer N sorts »
  (rien de tel n'est simulé pendant l'absence) et « Vaincre N boss » (le héros farme sa zone). Test logique ;
  autotest 178/178 ; simulations 8 h et 12 h sans joueur inchangées (elles n'utilisent pas l'absence).
- 2026-11-12 (it. 882) : pendant une absence, le héros rencontre aussi des élites, aux mêmes chances qu'en jeu
  (bénédiction « Grande chasse » et Appât des champions compris, aucune avant les premières élites de la première
  course) : une quête « vaincre des élites » avance enfin pendant la nuit (avant, elle restait à 0 malgré des
  milliers de victoires), le compteur des statistiques et les succès suivent, et le résumé de retour ajoute la ligne
  « Élites vaincues ». L'or et le butin hors ligne ne changent pas. Parcours --crawl sur des parties neuves en chinois
  et en espagnol (aucune erreur). Test logique ; autotest 178/178 (pire cas du résumé avec la nouvelle ligne) ; vu en
  capture (allemand).
- 2026-11-12 (it. 881, revue générale) : rien de cassé trouvé. Simulations de 12 h : records des courses guerrier
  41 → 64, mage 37 → 61, nécromancien 39 → 60, sans saut ni plafond. Performance (copie neuve de dev-data) : bande
  19,5 %, panneau 21,7 %, mini 6,9 %, icône 0,6 % d'un cœur (repères tenus, panneau un peu au-dessus de 20-21 %).
  Captures en français, anglais et japonais (Aventure, Talents, Héros, Boutique, mode mini) : ni débordement ni texte
  coupé ; le texte anglais extrait ne contient aucun français oublié (le japonais avait été vérifié à l'it. 880).
- 2026-11-12 (it. 880) : un 12e événement rare, la « Lune de sang » : pendant 30 s, chaque monstre qui arrive est une
  élite avec son affixe (Rapide, Blindé, Vampirique…), plus coriace mais avec butin garanti, or ×4 et expérience ×3 ;
  le gobelin doré et le boss restent eux-mêmes. Elle n'arrive que là où les élites existent déjà (pas dans les deux
  premières zones de la première course), a sa couleur rouge sur la bande, sa bannière et son son (gong grave, souffle
  lointain), et compte pour le succès « Chasseur d'événements ». Parcours --crawl en japonais et en allemand
  (329 clics chacun, aucune erreur ; aucun mot latin suspect dans l'interface japonaise). Équilibrage 12 h −0,5 zone
  (bruit) ; 1200 parties, 0 bloquée ; traduit dans les 10 langues ; test logique ; son rendu par l'autotest (178/178) ;
  vu en capture (allemand).
- 2026-11-12 (it. 879) : le « Crachat venimeux » (it. 878) a désormais sa parade, comme la Malédiction : le Talisman de
  pureté (pouvoir légendaire) repousse le venin (« Venin repoussé ! », tintement clair), et toute pureté partielle
  (Phalène pâle, talent) en raccourcit la durée. Tout ce qui accompagnait la parade à la Malédiction vaut aussi face au
  venin : le Porte-talisman équipe le talisman tout seul, une astuce le propose s'il dort dans le sac, les légendaires le
  portent plus souvent quand le héros bloque sur ce boss, et la bulle des capacités du boss (Aventure) cite la parade.
  Au passage (vu par lang-overflow) : en allemand, « Panzerhandschuhe » se coupait en plein mot dans les cartes du
  marchand ; « Panzer-/handschuhe », « Drachen-/knochen », « Drachen-/schuppen » se coupent maintenant au bon endroit,
  avec un trait d'union (et le contrôle des mots coupés ne prend plus ce trait d'union pour une faute). Parcours --crawl
  en russe (329 clics, aucune erreur) ; équilibrage 12 h −0,1 zone (bruit) ; 1200 parties, 0 bloquée ; aucun mot coupé
  ni défilement (10 langues) ; traduit dans les 10 langues ; test logique ; 178/178, vu en capture.
- 2026-11-12 (it. 878) : une 13e capacité de boss, « Crachat venimeux » : toutes les 8 s, le boss empoisonne le héros
  pendant 4 s (3 % de ses PV max par seconde, malgré sa défense et son bouclier, sans pouvoir l'achever ; une potion
  peut le sauver). Elle met à l'épreuve les héros qui comptent sur leur armure, comme la Malédiction le fait pour le
  vol de vie. On la voit (« Empoisonné ! » au-dessus du héros, halo vert, étincelles) et on l'entend (crachat puis deux
  notes aigres) ; elle a sa carte dans Bestiaire > Capacités des boss (prochain boss qui l'a). Premier boss venimeux :
  zone 13 ; la rotation des capacités change au-delà. Équilibrage : +1,2 zone en 12 h sur 10 classes (bruit), fuzz
  1200 parties sans blocage ; traduit dans les 10 langues, son rendu par l'autotest (178/178), test logique.
- 2026-11-12 (it. 877) : thème clair du panneau, des couleurs pensées pour le fond sombre restaient en dur. Les
  étoiles des quêtes (jaune pâle sur crème, contraste 1,4) et les bordures des quêtes 2 et 3 étoiles se voyaient à
  peine ; une voie de talents armée et le survol d'un talent achetable posaient un fond olive ou vert foncé sous un
  texte sombre (illisible, contraste 1,2) ; les lignes épiques du journal étaient violet pâle. Tout passe par les
  jetons du thème (assombris en clair, inchangés en sombre), comme les bordures du héros choisi, des voies prises et
  des maîtrises. Contrôle d'autotest sur des éléments témoins, dans les deux thèmes (il échoue sans le correctif ;
  178/178), vu en capture. Au passage, l'interface russe extraite ne contient plus aucun mot latin suspect.
- 2026-11-12 (it. 876) : « À faire maintenant » (résumé de retour, carte du héros, mode mini) signale les familiers
  libres qui pourraient partir en expédition (« 2 familiers libres à envoyer en expédition »), une fois le Chenil des
  explorateurs acheté et tant que le Grand intendant ne s'en charge pas : avant, ils restaient au repos sans que rien
  ne le dise. Avec le déblocage « tout d'un coup », un clic les envoie tous dans la dernière expédition choisie, comme
  le Grand intendant. Au passage (vu à l'autotest, 1280 px) : la tuile « Puissance » de l'Aventure écrivait « 224.92T »
  et se coupait ; elle s'abrège comme les trois autres (« 225T », valeur complète au survol). Parcours --crawl en
  polonais et en coréen (329 clics chacun), aucune erreur. Traduit dans les 10 langues, un test logique (212), un
  contrôle d'autotest.
- 2026-11-12 (it. 875) : bande : la météo (bulles, flocons, feuilles, cendres…) ne passe plus non plus sur le nom du
  boss (« Carapace abyssale l'Éveillée · −10 % PV ») ni sur la relique qu'il garde : les particules qui les touchent
  sont sautées au dessin, d'après leur position déjà mesurée une fois par série pour les nombres flottants (aucune
  mesure de plus). Le contrôle d'autotest de l'it. 874 couvre aussi le nom (il échoue sans le correctif : 3499
  pixels ; 176/176), vu en capture à 1366 px.
- 2026-11-12 (it. 874) : bande : la météo des zones (bulles, flocons, feuilles, cendres, pluie…) passait par-dessus les
  pastilles d'informations et brouillait « Zone 55 · Récif abyssal » ou l'or et le niveau. Elle n'y est plus dessinée
  (les particules qui touchent une pastille sont sautées au dessin, aucun coût en plus), en mode bord comme au milieu.
  Contrôle d'autotest (il échoue sans le correctif : 3654 pixels sur la pastille de zone ; 176/176), vu en capture à
  1366 et 1920 px.
- 2026-11-12 (it. 873) : sauvegardes abîmées : deux réglages n'étaient pas contrôlés au chargement. Un volume
  illisible (texte, null) s'affichait « NaN % » dans Réglages > Son et une taille de panneau aberrante (50) agrandissait
  le panneau d'autant : volume ramené entre 0 et 100 % (40 % par défaut), taille hors 100-130 % oubliée. save-fuzz
  balaie désormais d'office chaque donnée de la partie et chaque champ de ses sous-objets avec sept valeurs absurdes
  (910 corruptions, ≈ 35 s, 0 échec) : une donnée ajoutée plus tard y passe sans écrire de cas. Au passage : parcours
  --crawl d'une partie neuve (fr, de : 76 clics) et d'une sauvegarde cumulant toutes les corruptions (305 clics), aucune
  erreur ; dix premières minutes inchangées. Un test logique (211), 175/175.
- 2026-11-12 (it. 872) : tuiles du héros (Aventure) : à 1280 px, des points de vie à six chiffres (« 863392 ») dépassaient
  d'un pixel leur case et s'affichaient coupés (« 86339… »), au hasard des valeurs du combat (vu en polonais) : abrégés
  dès 100 000 (« 863 k », valeur complète au survol) et, en dessous, avec le séparateur des milliers de la langue
  (« 28 815 »). Partout dans le jeu, un nombre juste sous un palier ne s'écrit plus « 1000 k » (999 999 d'or) ni
  « 1000,00 M » : il passe à « 1,00 M », « 1,00 Md ». --overflow-report nomme désormais la tuile coupée et ses
  largeurs. Un test logique (210), 175/175, aucun débordement (fr, de, pl, ru, ja à 1280 et 1366 px), vu en capture.
- 2026-11-12 (it. 871) : revue générale (contre ca7e9f9, it. 861) : équilibrage 12 h +0,0 (61,9) ; 1200 parties, 0 bloquée ;
  npm test vert ; bande 19,5 %, panneau 20,0 %, mini 6,3 %, icône 0,5 % (copie neuve, rien d'autre en cours : une
  première mesure prise pendant l'équilibrage donnait 25 %) ; captures fr / en / ja (Aventure, Héros, Talents, Boutique,
  Ascension, Compétences, Statistiques, mini) ; texte russe sans mot latin suspect. Corrigé : les nombres des phrases au
  pluriel n'avaient pas de séparateur des milliers (« 1322 au total » dans Talents, « 1322 talent points spent » dans
  Héros) : « 1 322 », « 1,322 », selon la langue, partout où txn() reçoit un nombre brut. Un test logique (209),
  175/175, vu en capture (français, anglais).
- 2026-11-12 (it. 870) : « Quoi de neuf » édition 33 : les nouveautés des it. 836-869 n'avaient jamais été annoncées
  aux joueurs (itch.io) : travail pendant l'absence de l'Herboriste perpétuel, du Marchand attitré et du Grimoire des
  sorts ; Carte du Rebord, Compétences et Talents au clavier (Maj + Entrée) ; rappel des éclats d'étoile dans « À faire
  maintenant » ; bande plus lisible et textes corrigés dans les 10 langues. Traduite (libellés cités vérifiés), aucun
  défilement de la fenêtre au pire cas (3 éditions non lues) en allemand, polonais, russe, japonais et portugais à 1280
  et 1920 px. Au passage : parcours --crawl en coréen (329 clics, aucune erreur), texte anglais sans mot français oublié,
  dix premières minutes inchangées (3 graines). 175/175.

- 2026-11-12 (it. 869) : chinois, japonais et coréen : les boss éveillés et ancestraux (2e boucle et au-delà) avaient
  leur épithète collée APRÈS le nom (« 深淵の甲羅覚醒した ») sur la bande, la carte, le journal et l'Aventure ; elle
  passe devant (« 覚醒した深淵の甲羅 », « 각성한 … », « 觉醒的… »). En japonais et en chinois, une quinzaine de textes
  mettaient un « : » ou un « . » latin au milieu de la phrase (ligne du boss dans Aventure, bulles de la Carte et des
  reliques, résumé d'absence, bulle du mode mini, succès, récompense du jour, Bestiaire, Talents, événements rares,
  synergie du duo) : ponctuation de la langue (« ： », « 。 »), sans espace parasite ; en anglais, « Firefly : 0.2% »
  devient « Firefly: 0.2% ». Nouvel utilitaire `colon()` (i18n/index.js) ; npm test refuse désormais « fsp()} : » et
  « </b>. » écrits en dur. Au passage : parcours --crawl en polonais (329 clics, aucune erreur). Un test logique (208).
- 2026-11-12 (it. 868) : les éclats d'étoile gagnés en cours de route (quêtes, pluie d'éclats) ne restent plus oubliés
  quand on n'a pas la Carte du ciel : dès qu'un rang de constellation est payable, « À faire maintenant » (résumé de
  retour, carte du héros, bulle du mode mini) affiche « N éclats d'étoile à placer dans les constellations » avec un
  lien vers l'onglet Ascension, qui porte aussi une pastille « ! ». Traduit dans les 10 langues. Au passage : parcours
  --crawl en russe (329 clics, aucune erreur), texte russe sans mot français oublié. Un test logique (207), un contrôle
  d'autotest (175/175), vu en capture (pastille, français et allemand).
- 2026-11-12 (it. 867) : deux textes faux hors du français. Talents : la raison pour laquelle un talent ne peut pas
  être appris (« Demande 5 points dans la branche … », « Aucun point disponible », « Voie déjà choisie… ») s'affichait
  en français dans toutes les langues ; elle est traduite dans les 10 langues, pluriels compris (russe, polonais).
  Équipement vide : « Weapon : empty » (espace à la française) devient « Weapon: empty » en anglais (et de même dans
  les autres langues). npm test refuse désormais toute espace en dur collée devant une clé qui commence par « : ».
  Au passage : parcours --crawl en chinois (329 clics, aucune erreur), texte allemand sans mot français, sauvegardes
  abîmées toutes « ok ». Deux tests logiques (206), autotest 174/174, vu en capture (anglais, 1366 px).
- 2026-11-12 (it. 866) : coréen : les mots se coupaient entre deux syllabes en fin de ligne (« 가장자리 / 에는 »,
  « 데려가기 », « 처음부터 » : Aventure, Compétences, Héros, Talents, Réglages), comme si le coréen s'écrivait sans
  espaces. Ils restent maintenant entiers (un mot trop long pour sa case se coupe encore plutôt que de déborder).
  lang-overflow contrôle désormais le coréen comme les langues à alphabet : avant, 4 à 5 onglets en défaut à chaque
  largeur ; après, aucun mot coupé ni défilement à 1920 / 1366 / 1280 px. Vu en capture (Aventure, Héros, 1280 px). 174/174.
- 2026-11-12 (it. 865) : Boutique en russe et en allemand : quatre noms ou effets trop longs pour leur tuile se coupaient
  en plein mot, sans trait d'union (« Восстанавлив / ает 50% ОЗ », « Четырёхлистный », « Королевский », « Eisenbeschlage /
  ne Truhe »). Traductions plus courtes et naturelles : « Лечит 50% ОЗ », « Клевер удачи », « Царский сундук »,
  « Eisentruhe ». lang-overflow signale maintenant tout mot coupé ainsi, dans chaque onglet (« shop-coupé=… ») : les
  10 langues à 1920 / 1366 / 1280 px n'en ont plus aucun (chinois, japonais et coréen exclus : ils se coupent entre
  caractères ou syllabes). Vu en capture (russe, 1280 px). 174/174.
- 2026-11-12 (it. 864) : écrans de portable (1280 px), deux défilements qui n'apparaissaient qu'avec certaines valeurs.
  Aventure en polonais : une grande valeur de Points de vie élargissait sa colonne, « Punkty życia » passait sur deux
  lignes et l'onglet défilait de 14 px ; les quatre tuiles du héros ont maintenant des colonnes égales, une icône un peu
  plus petite (plus de place pour le texte) et une valeur abrégée au-delà du million (exacte au survol). Boutique en
  russe : un nom légendaire sur 4 lignes, plus son pouvoir et sa panoplie, poussait le bouton d'achat hors de la carte
  du Marchand : nom sur 3 lignes au plus, pouvoir et panoplie sur une ligne (texte complet au survol). lang-overflow :
  30 mesures sans défilement, et il signale aussi les tuiles coupées. Deux contrôles d'autotest (celui du Marchand échoue
  sans le correctif ; 174/174), vu en capture (polonais, russe, allemand, français).
- 2026-11-12 (it. 863) : outils, bon voisin : un autotest lancé par une itération précédente tournait encore, orphelin,
  depuis 3 h 20 (≈ 25 % d'un cœur sur le serveur, et des mesures de performance faussées : le panneau à 22,3 % de la
  revue 861 venait de là). L'autotest a maintenant un délai maximal (10 min ; un passage normal prend ≈ 70 s) : il
  échoue en citant la dernière vérification faite, puis quitte ; son lanceur arrête tout l'arbre xvfb-run / Electron
  s'il est interrompu (essayé : plus aucun processus ni dossier temporaire). Mesure refaite seule : bande 19,0 %,
  panneau 20,1 %, mini 6,2 %, icône 0,8 % (repères tenus). Au passage : parcours --crawl en polonais (329 clics, aucune
  erreur), texte polonais sans mot français oublié. 172/172.
- 2026-11-12 (it. 862) : bande, en japonais, chinois et coréen : les nombres et mots flottants (« 会心 116k », « 凍結！ »)
  se recouvraient encore au-dessus du héros en combat de boss : leur place libre était calculée comme si chaque caractère
  avait la largeur d'un chiffre. Les caractères pleine chasse comptent maintenant double (et leur ligne un peu plus haute),
  sans aucune mesure de mise en page en plus. Contrôle d'autotest (il échoue sans le correctif ; 172/172), vu en capture
  japonaise (zone 55, boss).
- 2026-11-12 (it. 861) : revue générale (contre d4a73d0, it. 851) : équilibrage 12 h +0,0 (61,9) ; 1200 parties, 0 bloquée ;
  npm test 204/204 ; bande 18,8 %, mini 6,0 %, icône 0,8 %, panneau 22,3 % (mesuré pendant un autotest : à reprendre
  seul) ; captures fr / en / ja (Aventure, Héros, Talents, Boutique, Ascension, Familiers, Compétences, Statistiques,
  mini) ; texte russe sans mot latin suspect. Corrigé : en japonais, les boutons des cartes de héros laissaient un
  caractère seul (« 昇天後にプレ / イ », « デュオに加え / る ») : tous les boutons japonais se coupent entre groupes de
  mots, lignes équilibrées en chinois, japonais et coréen (« 昇天後に / プレイ »). Marchand en anglais : « -8 % power »
  devient « -8% power » (espace avant « % » seulement dans les langues qui l'écrivent). Contrôle d'autotest (il échoue
  sans le correctif ; 171/171), vu en capture (japonais à 1366 px, anglais).
- 2026-11-12 (it. 860) : bande, combat de boss : les nombres flottants poussés de côté (quand plusieurs tombent en même
  temps) montaient encore dans la fin du nom du boss, et ceux des boss majeurs (zones 50, 100, 150, 200) recouvraient
  la relique qu'ils gardent. Chaque nombre évite maintenant le nom et la relique sur toute la partie bien visible de sa
  montée (positions mesurées une fois par série de monstres : aucun coût par image). Contrôle d'autotest sur les
  200 boss et les échos (16 en défaut avant, 0 après ; 170/170), vu en capture (zone 55).
- 2026-11-12 (it. 859) : bande, arrivée d'un boss : la réplique du héros dite juste avant (« Je me sens plus fort ! » au
  passage de niveau sur le dernier monstre) restait 3 s par-dessus le nom du boss, dès le premier boss d'une partie
  neuve. Elle s'efface maintenant quand le boss arrive (les répliques importantes, K.-O. ou légendaire, restent). Vu en
  capture à 1366 px au même instant (nom lisible). Au passage : parcours --crawl en japonais (328 clics, aucune erreur)
  et texte coréen sans mot français oublié. Contrôle d'autotest (169/169).
- 2026-11-12 (it. 858) : Sac d'une partie neuve sur écran de portable (1280 px) : le compteur se cassait en deux lignes
  (« Sac 1 / » puis « 24 ») et le rappel « ▲ double-clic : équiper » en trois (« double- / clic : / équiper »), même en
  français. Le compteur reste entier et le rappel passe sous le titre, sur une seule ligne (à 1920 px aussi) ; les
  9 traductions y tiennent. Parcours --crawl en russe : 329 clics, aucune erreur. Contrôle d'autotest à 1280 px
  (168/168 ; il échoue sans le correctif), vu en capture en français et en allemand (1280 et 1920 px).
- 2026-11-12 (it. 857) : bande, nombres flottants : les dégâts reçus, coups écrasants, reflets du miroir et ripostes
  s'écrivaient en chiffres bruts (« -22050 », plus tard « -1234567 ») à côté des coups portés abrégés (« 29 k ») : tous
  passent maintenant par le même format (« -22 k », séparateurs et unités de la langue), plus courts et moins
  enchevêtrés au-dessus du héros. Au passage : texte allemand et espagnol sans mot français oublié ; aucun
  débordement en portugais, polonais, coréen et chinois à 1280 / 1366 px. Contrôle d'autotest (167/167).
- 2026-11-12 (it. 856) : la ligne sous le nom d'un objet (marchand, sac, équipement, coffre ouvert) collait la rareté à
  l'emplacement : ordre français dans les autres langues (« Weapon uncommon », « 武器 优秀 ») et accord faux, même en
  français (« Armure peu commun », « Оружие необычный »). Elle devient « Armure · Peu commun · niveau 55 » (rareté en
  étiquette, point jamais en début de ligne). En anglais, « Kitten lv. 10 » prend la majuscule de la bande (« Lv. »).
  Parcours --crawl en polonais : 329 clics, aucune erreur. Test logique (204), autotest 166/166, vu en allemand et anglais.
- 2026-11-12 (it. 855) : Talents au clavier : Maj + Entrée (ou Maj + clic) sur un talent fait comme son petit bouton
  « max » / « tout », jusque-là réservé à la souris ; et le talent garde le focus après chaque Entrée (avant, le
  redessin le renvoyait au début du panneau). Ligne ajoutée aux Raccourcis clavier (10 langues, vue en allemand).
  Corrigé au passage : « Réinitialiser (gratuit) » s'affichait en français dans toutes les langues avant le niveau 10.
  Contrôle d'autotest (166/166).
- 2026-11-12 (it. 854) : bande en allemand, combat de boss : le nom long « Abgrundpanzer der Erwachte · −10 % LP »
  passait sous la pastille d'or et de niveau. Le nom se décale maintenant vers la gauche juste ce qu'il faut pour
  finir avant la pastille (recalculé quand l'or change de largeur ; rien ne bouge pour un nom court ou l'affichage au
  milieu). Vu en capture à 1920 px. Contrôle d'autotest (165/165).
- 2026-11-12 (it. 853) : la Carte du Rebord se joue au clavier : ses 200 zones ne se prenaient qu'à la souris. Un
  seul arrêt de tabulation (la zone du héros) ; les flèches suivent le chemin tel qu'il est dessiné (← → dans la
  rangée, ↑ ↓ vers la rangée voisine), Début / Fin vont à la première / dernière zone atteinte ; Entrée ou Espace y
  emmène le héros avec la Carte du voyageur, et le focus reste sur la zone. Contour blanc au focus. Plus généralement,
  un élément du panneau qui prend le focus au clavier montre maintenant sa bulle (sous lui), comme au survol. Ligne
  ajoutée aux Raccourcis clavier (10 langues). Contrôle d'autotest (164/164). Vu en capture : les nombres flottants
  face au boss (idée b de la revue 851) ne recouvrent plus son nom, seulement parfois le bord de sa couronne : laissé.
- 2026-11-12 (it. 852) : Boutique en japonais : les tuiles étroites laissaient un caractère seul sur la deuxième
  ligne (« 俊足のポーショ / ン », « ペットのタマ / ゴ », « バッグが満 / 杯 », « アンコモン 以 / 上 »). Lignes équilibrées
  (text-wrap: balance) dans les tuiles et cartes du marchand, et en japonais coupure entre groupes de mots
  (word-break: auto-phrase) : « 俊足の / ポーション », « バッグが / 満杯 ». Allemand et français inchangés (vus en
  capture à 1366 px). Contrôle d'autotest (163/163 ; il échoue sans le correctif).
- 2026-11-12 (it. 851) : revue générale (contre 9c41c17, it. 841) : équilibrage 12 h +0,0 (61,9) ; npm test 203/203 ;
  bande 19,1 %, panneau 20,1 %, mini 6,3 %, icône 0,4 % ; captures fr / en / ja (Aventure, Héros, Talents, Boutique,
  Ascension, Familiers, mini) ; texte russe sans mot latin suspect. Corrigé : Familiers, le choix sélectionné du Grand
  intendant (« Grande expédition ») était écrit en clair sur fond or en thème sombre (contraste 1,6), presque
  illisible : il prend le texte sombre des autres boutons enfoncés. Nouveau contrôle d'autotest : tout bouton enfoncé
  visible a un contraste texte / fond d'au moins 3, en thème sombre ET clair (l'autotest est en clair à cet endroit ;
  vérifié : il échoue avec l'ancien style). Autotest 162/162, vu en capture (allemand).
- 2026-11-12 (it. 850) : l'arbre de Compétences se joue au clavier : il ne se prenait qu'à la souris (cercles SVG
  impossibles à atteindre avec Tab), et « Dépenser automatiquement » n'arrive qu'avec un déblocage. Tab passe d'un
  nœud apprenable à l'autre (les seuls dans l'ordre de tabulation), la vue se recadre sur lui s'il sort du cadre et sa
  bulle s'affiche ; Entrée ou Espace l'apprend, et le focus saute au nœud apprenable le plus proche. Contour doré au
  focus ; ligne ajoutée aux Raccourcis clavier (10 langues). Contrôle d’autotest (161/161). Au passage : fuzz 1200 parties,
  0 bloquée ; save-fuzz : tout « ok ».
- 2026-11-12 (it. 849) : Statistiques > Chiffres sur écran de portable : en allemand (1280 px) « Gegenstandssammlung »
  passait sous sa valeur (« …sammlung44 / 44 »), en russe (1366 et 1280 px) deux libellés aussi, et la carte
  Probabilités coupait « Boss 5 » de son « % ». Les quatre cartes étroites prennent la place que Probabilités avait en
  trop, et ses valeurs ne se coupent plus qu'aux « · ». Nouveau contrôle de --overflow-report (donc lang-overflow) :
  « onglet-chevauche=N », libellé de ligne plus large que sa place ; il ne trouvait que ces cas, et 0 après la
  correction dans les 10 langues aux 3 largeurs. Autotest 160/160, vu en capture (allemand, russe).
- 2026-11-12 (it. 848) : journal d'aventure au retour : les expéditions ramenées par le Grand intendant le noyaient
  sous « Luciole passe au niveau 2 », « … 3 », « … 4 », « … 5 » et une ligne « Un œuf ! » par œuf. Chaque familier
  n'écrit plus qu'une ligne (son dernier niveau, en tête du journal, tant que l'ancienne est parmi les 10 dernières) et
  les œufs se cumulent (« Un œuf ! … (×9) ») : le journal montre enfin le reste. Test logique (203/203), autotest
  160/160, vu en capture. Au passage : crawl en japonais sans erreur (329 clics), lang-overflow des 10 langues à 1920,
  1366 et 1280 px : aucun défilement.
- 2026-11-12 (it. 847) : Boutique : le prix de l'Œuf de familier se coupait sur deux lignes (« 256,59 / M ») et
  les tuiles étroites (potions, coffres, œuf) n'avaient pas la place pour les grands prix (« mil M » en espagnol). Ces
  tuiles affichent le prix court à 3 chiffres (« 257 M », « 25,7 M »), jamais coupé ; le prix exact reste dans la
  bulle. Contrôle d'autotest (160/160) ; vu en capture (français et espagnol, 1920 et 1366 px). Au passage : texte
  chinois sans mot non traduit, crawl en coréen sans erreur (329 clics).
- 2026-11-12 (it. 846) : bande en fin de partie : coups, critiques et dégâts reçus tombaient au même endroit au même
  instant et se lisaient « -18Crit104k-21 » au-dessus du héros. Chaque nombre flottant cherche maintenant une place
  libre parmi les nombres encore jeunes (au-dessus, au-dessous, puis de côté ; face à un boss, sans monter sur son
  nom). Contrôle d'autotest : 5 nombres lancés au même point, aucun chevauchement (159/159) ; vu en capture (zone 55,
  boss). Calcul négligeable (au plus 30 effets comparés, seulement à la création d'un nombre).
- 2026-11-12 (it. 845) : onglet Familiers sur écran de portable (allemand, 1366 px) : la barre du haut débordait et
  cachait à droite le sous-onglet « À découvrir » (barre de défilement invisible : impossible à deviner) et le choix
  « Grande expédition » du Grand intendant. Les sous-onglets passent en tête de la barre, et leurs compteurs remplacent
  « 15 / 17 familiers trouvés » (redondant) : tout tient sur une ligne. Contrôle d'autotest à 1280 px (158/158) ; vu en
  capture (allemand). Revue des onglets Quêtes, Bestiaire, Carte et Statistiques en allemand à 1366 px : rien d'autre.
- 2026-11-12 (it. 844) : au retour d'une nuit (absence au plafond), le journal et le résumé disaient « Pendant 8 h 0 min :
  … 0 objet gardé. » : les durées rondes s'écrivent maintenant « 8 h » (partout : absence, statistiques, temps de jeu)
  et le journal ne cite les objets gardés que s'il y en a. Crawl en polonais et texte russe vérifiés au passage : rien
  de non traduit. Test logique (202/202), autotest 157/157, vu en capture (allemand : « Während 9 Std.: »).
- 2026-11-11 (it. 843) : le Grimoire des sorts (zone 45) travaille aussi pendant l'absence : avant, l'or gagné hors
  ligne attendait le retour et aucun sort ne progressait. Mêmes règles qu'en jeu (au plus 3 rangs par minute d'absence,
  300 au plus, chacun à moins d'un dixième de l'or, option respectée) ; une seule ligne de journal et « Grimoire des
  sorts : +N rangs de sorts » dans le résumé « Pendant ton absence » (10 langues). Test logique (201/201) et ligne
  rendue par l'autotest (157/157). Les automatismes achetés agissent désormais tous hors ligne.
- 2026-11-11 (it. 842) : le Marchand attitré (zone 300) travaille aussi pendant l'absence : avant, l'étal restait figé
  hors ligne et le marchand n'achetait rien. L'étal se renouvelle toutes les 15 min d'absence (32 fois au plus) et le
  marchand y achète ce qu'il aurait acheté en jeu (mêmes règles : gain > 1 %, réserve de 4 fois le prix, sac plein
  géré) ; une seule ligne de journal, et « Marchand attitré : N objets achetés » dans le résumé « Pendant ton absence »
  (10 langues). Test logique (200/200) et ligne rendue par l'autotest (156/156).
- 2026-11-11 (it. 841) : revue générale (contre 66e052c, it. 830) : équilibrage 12 h +0,0 (61,9) ; 1200 parties,
  0 bloquée ; npm test 199/199, autotest 156/156 ; bande 18,8 %, panneau 19,4 %, mini 6,4 %, icône 0,7 % (une
  première mesure à 25 % était faussée par l'équilibrage lancé en parallèle : toujours mesurer machine au repos) ;
  captures fr / en / ja (Aventure, Héros, Talents, Boutique, Ascension, mini) sans débordement ; texte russe sans mot
  latin suspect. Rien à corriger.
- 2026-11-11 (it. 837, demande de Victor) : lancé à la main, le jeu se voit toujours tout de suite (sinon un nouveau
  joueur croit qu'il ne marche pas) : premier lancement en bande ; mode icône resté d'une session précédente -> dernier
  mode affiché ; détection du plein écran (Windows) démarrée après 20 s seulement. Démarrage automatique avec la
  session (machine allumée depuis moins de 3 min, ou wasOpenedAtLogin sur Mac) : réglage respecté. Essayé : partie
  neuve, settings.json en mode icône (-> bande), en mode mini (-> mini).
- 2026-11-11 (it. 840) : barre des onglets à 1920 px : les pastilles vertes (« 99+ », « 2 », « ! ») mordaient de
  4 px sur le haut des noms (« Skılls », « Ascensıon » : points des i et haut des lettres cachés). Pastille un peu
  plus petite, posée au-dessus du bouton (comme déjà sur les écrans étroits). Vu en capture agrandie ; contrôle
  d'autotest qui mesure l'écart pastille / nom (156/156).
- 2026-11-11 (it. 839) : l'Herboriste perpétuel (zone 260) travaille aussi pendant l'absence : avant, élixirs et
  parchemins s'épuisaient hors ligne et le retour se faisait sans leur effet (or, expérience, dégâts). Il achète d'avance
  les doses qui couvrent toute l'absence s'il peut les payer (même réserve de 4 fois le prix qu'en jeu) ; le résumé
  « Pendant ton absence » affiche « Herboriste perpétuel : N élixirs rachetés » (10 langues). Test logique et contrôle
  d'autotest (156/156) ; vu en capture. Le Marchand attitré : fait à l'it. 842.
- 2026-11-11 (it. 838) : écrans de portable (1200-1499 px) : la colonne Équipement de l'Aventure était si étroite que
  les objets portés se lisaient « Star… », « Casq… », « Bott… » (même « Handschuhe : … » sur une partie neuve). Colonne
  élargie (pris sur le sac et le journal), portrait du héros aux trois quarts (net) : « Starwood Bow… », « Helm : leer ».
  « Avant le boss » et son état ne se collent plus (écart minimal). Captures 1280 / 1366 (allemand, partie neuve et
  dev-data) ; lang-overflow 10 langues × 1366 / 1280 sans défilement ; autotest 155/155.
- 2026-11-11 (it. 837) : deux bulles corrigées hors français : la récompense du jour (vue chaque jour) écrivait
  « 4/7 : +82 » avec l'espace française et une virgule en dur avant l'objet offert (« , » en japonais et chinois) ; la
  bulle des succès rattrapés au lancement disait « 3 новые достижения » sans accord russe ou polonais, avec « : » et
  virgules en dur. Désormais fsp(), csep() et txn() (« {n} nouveau succès|{n} nouveaux succès », 10 langues). Vu en
  capture russe (« 4/7: », « 3 новых достижения: ») ; autotest 155/155.
- 2026-11-11 (it. 836) : glisser-déposer plus tolérant : un objet du sac lâché n'importe où sur le panneau Équipement
  (portrait du héros, autre ligne, titre) va à son emplacement, la bonne ligne s'allumant dès le survol du panneau ;
  un objet porté lâché n'importe où sur le panneau Sac est retiré. Avant, il fallait viser la ligne exacte. Contrôle
  d'autotest étendu (dépôt sur le portrait, retrait par le titre du sac, sac refusé pour un objet du sac) : 154/154.
  Vérification des nouveautés de l'it. 835 : clics en russe (329) sans erreur.
- 2026-11-11 (it. 835) : retours d'une première joueuse (itch.io), quatre demandes :
  1. Déplacer la fenêtre à la souris : glisser le bouton ⌃ (ou la languette sur écran ultra-large, ou la bande entière
     si elle est opaque) l'emmène sur l'écran sous le curseur, en haut ou en bas selon la moitié où on la lâche ; le
     mode mini se pose où on veut (settings.miniPos, ramené dans l'écran si la résolution change). Un simple clic garde
     son effet ; le clic qui suit un glissement est ignoré. Choisir un écran au menu de l'icône ramène le mini au coin.
  2. Glisser-déposer des objets : du sac vers la ligne d'équipement (en surbrillance pointillée, verte au survol), ou
     d'un objet porté vers le sac pour le retirer. Rendus du sac suspendus pendant le glissement.
  3. Onglets pas encore débloqués : visibles, grisés, infobulle « Se débloque en atteignant la zone N » + contenu.
  4. Opacité 100 % : la bande arrête les clics (et s'attrape n'importe où) ; en dessous, ils la traversent.
  Édition 32 de « Quoi de neuf ». Autotest 154/154 (5 contrôles ajoutés ou adaptés).
- 2026-11-11 (it. 834) : textes de promotion à jour (version Mac Apple Silicon disponible, « free keys » dans le titre
  du forum itch, comme posté par Victor).
- 2026-11-11 (it. 834) : le résumé « Pendant ton absence » montre aussi le travail du Forgeron des astres
  (« +N objets remontés », comme le Maître de forge et le Creuset) ; avant, seulement une ligne du journal. Traduit (10
  langues), test logique et contrôle d'autotest (150). Vérifications sans défaut : clics en polonais (329, sans
  erreur), texte russe sans mot latin, lang-overflow 10 langues × 3 largeurs sans défilement.
- 2026-11-11 (it. 833) : version Mac Apple Silicon construite sur le serveur (Victor l'annonçait sans l'avoir) :
  electron-builder --mac zip --arm64 (sans signature hors macOS), signature ad hoc avec rcodesign 0.29 (binaire Linux,
  dossier temporaire ; ADHOC sur l'exécutable et les frameworks), ZIP refait avec les liens symboliques (14).
  scripts/mac-from-linux.sh. Envoyée à Victor en 5 morceaux (sha256 37d576e0…4bde). NON essayée sur un vrai Mac.
- 2026-11-11 (it. 832) : premières heures des nouveaux joueurs (itch.io) : astuces de début bien couvertes (bienvenue,
  héros tombé, objet ▲, talents, quêtes, boutique…) ; early-pace inchangé (60 min : 109 objets, niv. 39, zone 23,
  6 déblocages).
- 2026-11-11 (it. 831) : regard « nouveau joueur » (partie neuve en anglais, --release-ui) : la pastille or / niveau
  semblait passer sous le bouton du son sur une capture agrandie ; mesuré au pixel : 14 px d'écart, rien à corriger.
  Écran à 125 % (--force-device-scale-factor=1.25) : bande nette et bien placée.
- 2026-11-11 (it. 830) : revue générale (contre dc8d5e9, it. 810) : équilibrage +0,0 (61,9) ; 1200 parties, 0 bloquée ;
  sauvegardes abîmées tolérées ; clics japonais et coréen (330 chacun, bouton « Ton avis » compris) sans erreur ;
  bande 19,5 %, panneau 20,4 %, mini 6,6 %, icône 0,5 % ; mémoire 494 Mo stable. Rien à corriger.
- 2026-11-11 (it. 829) : errors.log reçoit aussi les exceptions du processus principal (uncaughtException,
  unhandledRejection, avec la pile ; plus de boîte d'erreur Electron intrusive au-dessus du bureau) et les plantages
  de la page (« [page arrêtée] crashed (code 2) »). Essayé : plantage forcé de la page + exception provoquée.
- 2026-11-11 (it. 828) : journal des erreurs pour les joueurs : chaque erreur de l'interface est ajoutée à
  userData/errors.log (date, version, message, fichier:ligne ; 200 Ko au plus, l'ancien en .old). Essayé (erreur
  provoquée dans une copie). Instructions itch.io : où le trouver (Windows, Linux, macOS) pour le joindre à un avis.
- 2026-11-11 (it. 827) : version 0.1.1 (correction des cinématiques perdues) : package.json, « Quoi de neuf » édition 31
  (traduite) ; instructions itch.io avec un nom d'AppImage générique (Sillwalker-*-linux.AppImage). AppImage 0.1.1
  construite ici et envoyée à Victor en 5 morceaux (sha256 57897ac4…b804a) ; ZIP Windows à refaire chez lui
  (npm run dist:itch).
- 2026-11-11 (it. 826) : BUG trouvé grâce à la bande-annonce du guerrier : en combat chargé (zone 62 : chiffres de
  dégâts, pièces), juice.add retirait le plus ancien effet quand il y en avait trop (MAX_PARTS)… y compris la
  cinématique en cours, qui ne finissait jamais : this.cine restait « en cours » et TOUTES les cinématiques suivantes
  (relique, héros libéré, chroniques, boss) attendaient jusqu'au prochain lancement. Corrigé : une cinématique n'est
  jamais retirée (part.keep), une cinématique disparue de l'écran ne bloque plus la file, clear() l'oublie. Vérifié
  sur la partie du guerrier (intro, arrivée à 26 s, relique à 38 s) ; autotest (149) : cinématique gardée malgré
  300 effets. steam/promo-posts.md : flair et déclaration d'IA demandées par r/incremental_games (règle 5).
- 2026-11-11 (it. 824) : demande de Victor : GIF de promotion avec un héros au corps à corps devant. Partie simulée
  de 12 h guerrier (+ rôdeur), même parcours --trailer filmé ; steam/media/reveal.gif refait (2,3 Mo). La bande-annonce
  refaite avec cette partie était ratée (cinématiques d'arrivée, de relique et d'aube non déclenchées en zone 62,
  gros plan sans le héros) : ancienne version gardée.
- 2026-11-11 (it. 819) : Victor a publié sur itch.io (https://victor-basset.itch.io/sillwalker, 1 $, pas encore
  d'acheteur). Pour faire venir des joueurs : steam/media/reveal.gif (dézoom du héros au bureau, 800 px, 15 images/s,
  2 Mo) et steam/promo-posts.md (Reddit r/incremental_games, forum itch.io, r/pixelart, premier devlog ; anglais).
- 2026-11-11 (it. 818) : scripts/devlog.mjs : éditions de « Quoi de neuf » en liste Markdown (anglais, français…) pour
  les devlogs itch.io et annonces Steam. CLAUDE.md : piège des info-bulles (title → data-title).
- 2026-11-11 (it. 817) : numéro de version (init.version) au survol du titre « Sillwalker » du panneau et dans
  l'info-bulle du bouton « Ton avis » (les joueurs le citent dans leurs avis), sans place prise à l'écran. Autotest
  (148). Piège : les info-bulles du jeu déplacent « title » dans data-title : un contrôle lit l'un ou l'autre.
- 2026-11-11 (it. 816) : « Quoi de neuf » édition 30 : le bouton « Ton avis ». Traduite (libellé cité vérifié par
  i18n-quotes dans les 9 langues).
- 2026-11-11 (it. 815) : pour récolter les avis des premiers joueurs (itch.io) : bouton « Ton avis » (icône de contrat,
  info-bulle) dans la barre du panneau ; ouvre config.FEEDBACK_URL (https://victor-basset.itch.io/sillwalker, adresse
  fixe ; jamais pendant les tests : --ghost/--crawl/--selftest) via app:feedback. Essayé d'abord comme cadre des
  Réglages : défilement (7 à 64 px à 1280-1366) ; dans la barre, une icône de 30 px fait passer les onglets anglais
  à 1280 px de « small slim » à « compact » (icônes seules sauf l'onglet ouvert ; français et allemand l'étaient déjà).
  Traduit ; autotest (147) ; lang-overflow 10 langues sans défilement. À confirmer : l'adresse de la page itch.io.
- 2026-11-11 (it. 813-814) : miniature YouTube 1280×720 (steam/capsules/youtube-thumbnail.png) et photo de profil
  itch.io 512×512 (avatar.png : le guerrier en grand sur le ciel fêlé), générées par scripts/steam-capsules/make.js.
- 2026-11-11 (it. 812) : Victor : la musique du montage « sonne pas au bon moment ». Le rendu hors ligne est identique au
  jeu (même scheduleStep) ; en cause, les réglages des airs : swing 0,18-0,28 d'un pas (une croche sur deux en retard),
  écho à 3/4 de temps, variante boss avec grosse caisse sur une croche décalée. Bande-annonce : air de la zone 36
  (82 bpm, piano électrique) rendu « droit » (swing 0, écho 0,06), sans variante boss. À voir avec Victor si la
  musique EN JEU lui fait le même effet (même cause, à corriger dans songFor).
- 2026-11-11 (it. 810-811) : revue générale (contre f1fe3da, it. 800) : équilibrage +0,0 (61,9) ; 1200 parties, 0 bloquée ;
  sauvegardes abîmées tolérées ; clics chinois (323) et allemand (318) sans erreur ; processeur refait seul (la première
  mesure tournait pendant un encodage vidéo : 26 %) : bande 19,4 %, panneau 20,3 %, mini 6,5 % ; mémoire 527-532 Mo.
  Retours de Victor sur la bande-annonce : « le rythme n'est pas bon » (trois airs de tempos différents fondus l'un
  dans l'autre) → une seule piste, le même air en trois passages continus dans un même rendu (le dernier en combat de
  boss), gain fixe + limiteur (sans « level » automatique : crête -1,2 dB, moyenne -18 dB) ; « le S de Sillwalker est
  coupé » → le titre des visuels tient toujours dans 88 % de la largeur (logo de bibliothèque, capsules verticales,
  couverture itch refaits). steam/itch-page.md : instructions d'installation Windows / macOS / Linux (HTML).
- 2026-11-11 (it. 809) : sous Windows, l'AppImage échoue (EPERM : liens symboliques interdits hors mode développeur).
  dist:itch:linux produit maintenant un tar.gz (construisible sous Windows, essayé ici) ; dist:itch:appimage garde
  l'AppImage. AppImage construite sur le serveur et envoyée à Victor en 5 morceaux de 25 Mo (limite d'envoi 30 Mo).
- 2026-11-11 (it. 808) : Linux et Mac pour itch.io : npm run dist:itch:linux (AppImage 126 Mo) et dist:itch:mac (zip
  arm64 + x64, à construire sur un Mac) ; build.linux / build.mac dans package.json. AppImage construite et lancée sur
  le serveur avec XDG_CONFIG_HOME dans le dossier temporaire (jamais la vraie sauvegarde) : partie neuve, intro,
  « [steam] version hors Steam (itch) ».
- 2026-11-11 (it. 807) : DEMANDE DE VICTOR : bande-annonce « histoire » pour YouTube (steam/media/trailer-story-en.mp4,
  65 s, 1920×1080, son AAC 48 kHz). Cartons de l'intro sur le ciel des capsules (Pixelify Sans), vraies cinématiques
  du jeu agrandies au pixel près en bandeau (intro, Geôlier mécanique, Drone stellaire, aube), dézoom du héros au
  bureau entier, gros plan combat ×3, panneau légendé (compétences, carte, héros, familiers), logo et appel « Wishlist
  on Steam · Play now on itch.io » ; musique du jeu rendue hors ligne (air calme → milieu → combat de boss, loudnorm).
  Outils : option de dev --trailer (main.js, scènes minutées), scripts/trailer/music.js (+ music.html : WAV),
  scripts/trailer/make.py (montage ffmpeg).
- 2026-11-11 (it. 806) : DÉCISION DE VICTOR : la version actuelle sur itch.io à 1 $ pour récupérer les premiers avis.
  npm run dist:itch produit aussi le ZIP (electron-builder --win dir zip ; essayé en zip Linux) ; steam/itch-page.md :
  réglages de la page (« In development », prix 1 $ avec « payer plus », commentaires activés…) et description
  anglais / français présentée comme accès anticipé.
- 2026-11-11 (it. 805) : itch.io : couverture 630×500 (steam/capsules/itch-cover.png, même scène que la capsule
  principale) ; steam/checklist.md : étapes itch.io et commande PowerShell du ZIP.
- 2026-11-11 (it. 804) : « Quoi de neuf » édition 29 : les deux succès des échos. Traduite ; le nom du Rebord repris
  des traductions du jeu (Parapeito, Saum, Krawędź, Кромка, 가장자리 : i18n-quotes ne vérifie que les « libellés »
  cités, pas les noms de lieux).
- 2026-11-11 (it. 803) : deux succès pour les échos des lieutenants (au-delà du Rebord) : ECHO_FIRST « Écho dissipé »
  (record au-delà de la zone 250) et ECHOES_ALL « Les trois échos » (au-delà de 350, progression 0/3 → 3/3) ; traduits,
  steam/achievements.md (63), README, icônes (fantôme, blason). Test (197) ; lang-overflow pl/de/ru 1920/1280 sans
  défilement. À créer aussi dans Steamworks.
- 2026-11-11 (it. 802) : CLAUDE.md : repères de performance mis à jour (it. 800 ; mesure Windows de Victor, it. 763) et
  plage de mémoire 485-530 Mo. L'état de Steam n'est affiché qu'en dev (menu de l'icône) : rien à traduire pour la
  version hors Steam.
- 2026-11-11 (it. 801) : version hors Steam : npm run dist:itch (electron-builder, extraMetadata.distribution=itch,
  sortie dist-itch/) ; steam.js lit « distribution » dans le package.json embarqué et coupe Steam si ce n'est pas
  « steam » (sinon, avec le vrai App ID, la relance par Steam fermerait le jeu chez un joueur itch.io). Vérifié par
  une construction Linux (package.json embarqué) et un test (196).
- 2026-11-11 (it. 800) : revue générale (contre 8eadb9a, it. 790) : équilibrage 12 h +0,0 (61,9) ; 1200 parties,
  0 bloquée ; 20 sauvegardes abîmées tolérées ; clics en russe et polonais (318 chacun) sans erreur ; bande 19,6 %,
  panneau 20,0 %, mini 6,6 %, icône 0,5 % ; mémoire réelle 486 Mo stable. Victor demande où publier hors Steam
  (itch.io conseillé pour une démo ; une version « hors Steam » sans relance par Steam sera nécessaire).
- 2026-11-11 (it. 799) : CLAUDE.md : section « Sortie sur Steam » (fichiers, scripts, outils, poids des régénérations
  dans l'historique git).
- 2026-11-11 (it. 798) : Steam : bande-annonce et extrait de la bande en français (steam/media/trailer-fr.mp4,
  strip-fr.mp4/.webm) ; curseur de la souris retiré des vidéos (x11grab -draw_mouse 0), versions anglaises refaites.
- 2026-11-11 (it. 797) : « Quoi de neuf » édition 28 : onglets au clavier (it. 779), panneau ouvert sans attendre
  (it. 794). Traduite.
- 2026-11-11 (it. 796) : autotest (146) : polices des 12 onglets et de la bande : aucune taille fractionnaire, au plus
  40 combinaisons police × graisse × taille (28 aujourd'hui), pour garder des premiers affichages rapides sous Windows.
- 2026-11-11 (it. 795) : taille de police fractionnaire 10,8333px (compteurs des sous-onglets, <small> sans taille dans un
  bouton de 13px) remplacée par 11px : une combinaison police × taille de moins à créer au premier affichage
  (sous Windows, chacune coûtait cher avant la police allégée). Plus aucune taille fractionnaire dans le panneau.
- 2026-11-11 (it. 794) : ouverture du panneau : si l'onglet courant est déjà construit (préparé d'avance), le panneau
  glisse tout de suite avec ce contenu et se met à jour à l'image suivante (rAF, minuteur de 50 ms en secours) ; chez
  Victor, la reconstruction (≈ 170 ms) retardait le début de l'ouverture. Autotest 145, crawl 316 clics sans erreur.
- 2026-11-11 (it. 793) : steam/store-page.md : 20 tags proposés (Idle, RPG, Pixel Graphics, Casual…), genres et
  catégories Steamworks.
- 2026-11-11 (it. 792) : Steam : scripts/steam-set-appid.mjs <App ID> (STEAM_APP_ID + STEAM_RELAUNCH_IF_NEEDED, retour à
  480 = relance désactivée), essayé sur une copie ; test (195) : jamais de relance par Steam avec l'App ID 480.
  Victor a supprimé le SDK Steamworks copié (inutile avec steamworks.js).
- 2026-11-11 (it. 791) : captures et vidéos Steam refaites sans bulles parasites : scripts/steam-prep-save.mjs prépare
  la sauvegarde (récompense du jour déjà prise, succès déjà annoncés, « Quoi de neuf » lu, absence nulle, onglets vus).
  La bande-annonce garde l'introduction de l'histoire (vrai contenu). .gitignore : dossiers du SDK Steamworks (Victor
  l'a copié dans le dossier du jeu ; inutile : steamworks.js fournit déjà steam_api64.dll).
- 2026-11-11 (it. 790) : revue générale (contre efdcf54, it. 780) : équilibrage 12 h +0,0 (61,9) ; 1200 parties,
  0 bloquée ; 20 sauvegardes abîmées tolérées ; clics en coréen et espagnol (318 chacun) sans erreur ; bande 19,4 %,
  panneau 21,4 %, mini 6,8 %, icône 0,7 % ; mémoire réelle 512 Mo stable (485 à la revue 780 : bruit habituel
  485-530). Rien à corriger. Itérations 781-789 : préparation de la sortie Steam (steam/checklist.md).
- 2026-11-11 (it. 789) : Steam : bande-annonce, première version (steam/media/trailer-en.mp4, 42 s, 1920×1080, 2,5 Mo,
  sans son) : titre, bande seule, panneau (Aventure, Compétences, Carte, Héros, Familiers), bande, titre. Option de dev
  --tour (main.js : onglets ouverts à 12, 16… 32 s) ; scripts/steam-trailer.sh : Xvfb :77, fenêtre filmée et posée sur
  le bureau des captures (le noir pur de la zone transparente rendu transparent par colorkey : le jeu n'utilise pas
  #000). La bulle « Quoi de neuf » se coupe par settings.newsSeen (pas S.newsSeen).
- 2026-11-11 (it. 788) : Steam : extrait animé de la bande (20 s, 1920×120, 30 images/s) : steam/media/strip-en.mp4
  (H.264, 979 Ko) et .webm (VP9, 659 Ko), partie simulée de 12 h en anglais. scripts/steam-video.sh : jeu sur un
  écran virtuel à part (Xvfb :77, fenêtre visible), capture x11grab, ffmpeg de pip imageio-ffmpeg (absent du
  système). Piège : « pkill -f 'Xvfb :77' » dans une commande tue aussi le shell qui la contient (motif présent
  dans sa ligne) : garder le PID.
- 2026-11-11 (it. 787) : version distribuée : outils de dev exclus du paquet (src/main/trace.js, src/renderer/dev/ :
  crawl, fontbench ; tous chargés à la demande sous une option de dev). Vérifié par une construction Linux
  (electron-builder --linux dir, dans le dossier temporaire) : absents de app.asar, devslow.js présent (importé par
  app.js) ; 272 Mo en tout (configuration requise : 400 Mo, marge suffisante). Version non lancée (hors dev elle
  utiliserait la vraie sauvegarde du serveur).
- 2026-11-11 (it. 786) : Steam : icônes des 61 succès (64×64, couleur et grisée : steam/achievement-icons/), tirées
  des dessins du jeu (icônes de boutique, héros, monstres, reliques, Briseur) sur une tuile au cadre doré ;
  scripts/steam-capsules/achicons.js (+ achicons.html, table ART succès → dessin). Victor remplit ses coordonnées
  bancaires Steamworks (Shine).
- 2026-11-11 (it. 785) : steam/checklist.md : liste de contrôle de la sortie (démarches de Victor, jeu, Steamworks),
  configuration requise proposée (fr / en). Reste côté jeu : App ID, icônes 64×64 des 61 succès.
- 2026-11-11 (it. 784) : Steam : npm run steam:build (scripts/steam-upload.mjs) : fichiers SteamPipe app_build.vdf et
  depot_build_<dépôt>.vdf pour dist/win-unpacked (App ID de config.js, dépôt = App ID + 1 par défaut, --depot, --branch
  bêta seulement, --desc), commande SteamCMD affichée. Refuse l'App ID de test 480 et une version absente. Chemins
  écrits avec « / » (Windows), guillemets retirés de la description. Essayé sur une copie avec un faux App ID.
- 2026-11-11 (it. 783) : Steam : visuels du magasin, première version (steam/capsules/, 8 formats : en-tête 920×430,
  petite 462×174, principale 1232×706, verticale 748×896, bibliothèque 600×900 et 920×430, héros 3840×1240 sans
  texte, logo 1280×720 transparent). Dessinés dans un canevas sans lissage avec les sprites du jeu (guerrier et mage,
  monstres, le Briseur en silhouette, ciel fêlé) et le titre en Pixelify Sans
  (scripts/steam-capsules/make.js + capsule.html). À juger par Victor ; un graphiste ferait mieux.
- 2026-11-11 (it. 782) : Steam : 12 captures 1920×1080 (anglais, français) dans steam/screenshots/ : bande seule,
  Aventure, Compétences, Carte, Héros, mode mini. Partie simulée de 12 h (mage + guerrier, zone 27, niveau 46 : la
  sauvegarde de dev a des chiffres incohérents, niveau 1313 en zone 55), onglets marqués vus (pas de pastilles
  « nouveau »), --release-ui ; fenêtre posée sur un bureau neutre flouté + barre des tâches générique sans marque
  (scripts/steam-compose.py, Pillow).
- 2026-11-11 (it. 781) : Steam (Victor s'inscrit sur Steamworks) : steam/store-page.md, descriptions courte (85-268
  caractères, limite 300) et longue (BBCode) dans les 10 langues, noms du Briseur repris des traductions du jeu.
  README (section Steam) : renvoi. À faire ensuite : captures 1920×1080 pour le magasin, visuels de capsule, App ID.
- 2026-11-11 (it. 780) : revue générale (contre 4b767d3, it. 760) : équilibrage 12 h +0,0 (61,9) ; 1200 parties,
  0 bloquée ; 20 sauvegardes abîmées tolérées ; clics en japonais (323) et portugais (324) sans erreur ; bande 19,6 %,
  panneau 19,9 %, mini 6,8 %, icône 0,5 % ; mémoire réelle 485 Mo (515-527 avant : la police allégée y est sans
  doute pour quelque chose). Rien à corriger. Victor commence l'inscription Steamworks.
- 2026-11-11 (it. 779) : accessibilité : barre d'onglets au clavier (rôle tablist) : ← → onglet voisin ouvert,
  Début / Fin premier / dernier, focus suivi (la barre est redessinée par setTab : focus redonné au nouveau bouton).
  Autotest (145) ; focus vérifié à part, panneau ouvert (→ : talents, Fin : réglages).
- 2026-11-11 (it. 778) : processeur sur le serveur après la police allégée : bande 19,4 %, panneau 20,6 %, mini 6,6 %,
  icône 0,5 % (inchangé : rendu logiciel). « [lent] démarrage » n'est plus écrit que si le jeu met plus de 0,6 s à
  être prêt. À vérifier par Victor : processeur de la bande dans le Gestionnaire des tâches (19,8 % avant la police).
- 2026-11-11 (it. 777) : CONFIRMÉ par Victor (« c'est bien mieux niveau ressenti ») : démarrage 450-860 → 217 ms,
  plus aucune image longue ni préparation lente signalée. Autres polices vérifiées (Tiny5 16 points par lettre,
  DotGothic16 61-76) : rien à faire. « Quoi de neuf » édition 27 (traduite).
- 2026-11-11 (it. 776) : CAUSE des blocages sous Windows trouvée : chez Victor, chaque taille de Geist Pixel coûte
  75-150 ms rien que pour les lettres (symboles ≈ 20 ms). Geist Pixel dessine chaque pixel comme un carré de 26
  points (courbes plates) : 68 contours et 1 771 points par lettre (Pixelify Sans : 2 et 22). Nouveau
  scripts/simplify-pixel-font.py (fontTools + skia-pathops + pyclipper) : carrés de chaque lettre fusionnés en
  polygones droits, 272 792 → 5 882 points (latin) et 115 154 → 2 128 (latin étendu), fichiers 16,7 → 6,5 Ko et
  9,2 → 4,5 Ko ; largeurs inchangées (mise en page identique). Fusionnés, les pixels se dessinaient plus pleins (les
  joints entre carrés éclaircissaient le texte) : contours resserrés de 7 unités, même encre à 11-12 px (rapport
  1,05 / 0,99), un peu plus net au-delà. CLAUDE.md : piège des polices pixel. À confirmer par Victor (npm start).
- 2026-11-11 (it. 775) : lignes de Victor après it. 774 : confirmé, CHAQUE police (taille × graisse) coûte 75-170 ms à
  créer sous Windows (presque rien ici), même sur un échantillon de 40 caractères. Clics traversants : seulement après
  npm run fontbench (outil de dev), pas en jeu normal. Diagnostic suivant : warmFont mesure à part les lettres et les
  symboles (★ ✦ ⚔ ✓ → : absents des polices du jeu, Windows les cherche dans ses polices, Segoe UI Emoji comprise).
- 2026-11-11 (it. 774) : fontbench de Victor (Windows) : mots jamais vus rapides (400 lignes : 2 ms), vrais onglets
  150-580 ms au premier passage puis 9-11 ms ; « une seule taille (14px) » 89 ms même mots connus. Le coût semble être
  la première création de chaque police × taille × graisse (34 combinaisons dans le panneau). warmTabs découpé en
  petites tâches (une par moment libre) : construire chaque onglet (le courant aussi, caché tant que le panneau est
  fermé), relever ses polices (fontsOf), créer chaque police à part sur un échantillon de texte (warmFont), puis mettre
  en page. Dev : « [lent] préparation (…) » pour toute tâche de plus de 50 ms, pour voir chez Victor laquelle coûte.
  Victor signale aussi des clics sur les onglets qui traversent jusqu'à sa vidéo : non reproduit ici (zones cliquables
  du panneau et des onglets justes, zoom 1 et 1,25).
- 2026-11-11 (it. 773 bis) : le commit 6a06abd était parti avec npm test en échec (relevé juste après) : « FE0F » dans
  une expression de fontbench.js pris pour une constante non importée, et un .join(", ") (dev seulement). Corrigé.
- 2026-11-11 (it. 773) : fontbench de Victor : les polices aussi rapides que sur le serveur (2-16 ms)… mais l'essai
  répétait 15 mots : Chromium garde la forme des mots déjà vus, l'essai ne mesurait que ce cache. Corrigé (mots
  aléatoires) ; en plus, mise en page des VRAIS onglets (copies invisibles) : premier passage, puis variantes de
  style (Arial partout, Geist seule, graisse 400, une seule taille, sans espacement ni ombres, sans emoji). Ici :
  premier passage 8-23 ms par onglet, ensuite 6-15 ms. Essayé aussi ici sans effet : zoom du panneau 1,25, écran à
  150 % (ShapeText 93 / 120 / 43 ms).
- 2026-11-11 (it. 772) : trace de Victor (npm run trace, Windows) : en 10 s, 3 041 ms de temps propre dans
  InlineNode::ShapeTextIncludingFirstLine (mise en forme du texte : 0,82 ms par appel), contre 97 ms ici
  (0,05 ms par appel) ; le reste est normal. Une police se met en forme très lentement sous Windows. Fontations
  activé ici : aucun effet (non reproduit). `npm run fontbench` (dev/fontbench.js) : 400 lignes mises en page dans
  chaque police du jeu, texte simple et avec symboles ; ici Geist 3/5 ms, Pixelify 2/4, DotGothic16 18/24,
  system-ui 4/7, liste du jeu 3/10.
- 2026-11-11 (it. 771) : sous PowerShell, `npm start -- --trace=10` perd le « -- » (npm garde --trace pour lui) :
  commande `npm run trace` ajoutée (package.json).
- 2026-11-11 (it. 770) : lignes de Victor après it. 769 : conversions de canevas négligeables (0-12 ms), construction
  2-29 ms, mais MISE EN PAGE 85-538 ms par onglet (ici 10-30 ms) : c'est elle. Pour voir quoi dedans sous Windows :
  `npm start -- --trace=10` (src/main/trace.js) enregistre une trace Chromium de 10 s et affiche le temps propre de
  chaque étape du fil principal (style, mise en page, mise en forme du texte, polices…) ; trace complète dans le
  dossier temporaire. Sur le serveur, en tête : mise en forme du texte (ShapeText) 99 ms, mise en page 67 ms.
- 2026-11-11 (it. 769) : polices CJK retirées (it. 768) : aucun effet chez Victor (panneau 859 ms, onglets 156-551 ms) ;
  laissées (sans risque). Nouvelle piste : les icônes, portraits et monstres sont dessinés sur des canevas puis
  convertis en images (toDataURL) au premier affichage ; chez Victor le canevas est accéléré par la carte graphique,
  et chaque conversion relit l'image depuis la carte (bloquant) ; ici tout est logiciel, donc gratuit. Ces canevas
  (jamais affichés) sont maintenant logiciels (willReadFrequently : sprites.js SOFT, shopart, trayicons). Dev : temps
  des conversions dans chaque « [lent] », et construction / mise en page de chaque onglet préparé.
- 2026-11-11 (it. 768) : nouvelles lignes de Victor (Windows, npm start) : ouverture du panneau 838 ms de JavaScript,
  préparation de chaque onglet 165-546 ms (temps libre, donc saccades 4-6 s après le lancement), démarrage 814 ms ;
  carte graphique active. Ici 10-40 ms par onglet, même avec une partie d'une semaine (simulate.js DUMP=fichier :
  état final écrit comme sauvegarde, nouveau) : ni la taille de la partie ni le code. Cause probable : la liste de
  polices citait Microsoft YaHei, Malgun Gothic et Yu Gothic dans TOUTES les langues ; sous Windows, chaque symbole
  absent des polices du jeu fait ouvrir ces énormes polices pour vérifier qu'il y est. Elles ne sont plus citées
  qu'en chinois, japonais et coréen (:root:lang). À confirmer par Victor (lignes « [lent] »).
- 2026-11-11 (it. 767) : lignes « [lent] » de Victor (npm start, Windows) : au lancement, images de 200 à 980 ms,
  « script 0, mise en page 0 ». Vérifié ici : sous app://, Chromium n'attribue AUCUN script aux images longues (une
  boucle de 300 ms donne « scripts : aucun ») : le temps peut donc être dans notre code. Rien de tel sur le serveur
  (démarrage 166 + 215 ms, aucune image longue). Diagnostic plus fin (dev) : devslow.js chronomètre tous les rappels
  (minuteries, images, temps libre, événements) et nomme ceux de plus de 100 ms ; durée du démarrage ; état de
  l'accélération graphique au lancement ([dev] carte graphique : …). En attente des nouvelles lignes de Victor.
- 2026-11-11 (it. 766) : autotest (144) : onglets préparés d'avance : 12 construits, un seul affiché, aucun resté en
  préparation (.warming). En attente des lignes « [lent] » de Victor si les blocages persistent sous Windows.
- 2026-11-11 (it. 765) : Victor signale encore de gros blocages sous Windows à la première ouverture du panneau et
  d'un onglet jamais vu. Le préchauffage (it. 750) construisait les onglets cachés (display: none) sans mise en page :
  polices de secours (symboles, emoji, CJK) et tailles d'images restaient à faire au premier clic. Chaque onglet
  préparé est maintenant mis en page une fois, invisible (classe .warming). Sur le serveur, premières visites :
  33-83 ms avant, 29-50 ms après (compétences 83 → 34, familiers 50 → 37). Dev (npm start) : « [lent] … » dans le
  terminal si un onglet ou le panneau met plus de 150 ms à s'afficher, ou si une image dure plus de 200 ms (détail
  script / mise en page), pour trouver la cause sous Windows si ça persiste.
- 2026-11-11 (it. 763) : essai Tauri mesuré par Victor sous Windows : pas mieux en mémoire (400 Mo contre 382 Mo),
  plus cher en processeur (30,7 % contre 19,8 % d'un cœur) : abandonné (demande X). Dossier proto-tauri/ supprimé à la demande de
  Victor (it. 764 ; toujours lisible dans l'historique git, commit 53e134a).
- 2026-11-11 (it. 762) : traductions des infobulles et libellés d'accessibilité (title, aria-label, placeholder) des
  12 onglets : en russe, seuls « Sillwalker » et « Esc » restent latins ; en japonais (--dump-text), seuls HP, Lv, BGM,
  pt (usages japonais), les noms des langues et DEV (commandes de dev). Rien à corriger.
- 2026-11-11 (it. 761) : accessibilité : deux contrôles d'autotest (143) : chaque bouton visible des 12 onglets du
  panneau, et de la bande, a un nom pour les lecteurs d'écran (texte, aria-label ou title). Tous passent déjà ; ils
  garderont les futurs boutons-icônes nommés.
- 2026-11-11 (it. 760) : revue générale (contre 5a1ec23, it. 750) : équilibrage 12 h +0,0 zone (moyenne 61,9) ; 1200
  parties, 0 bloquée ; 20 sauvegardes abîmées tolérées ; clics en chinois (318) et en allemand (319) sans erreur ;
  bande 19,5 %, panneau 21,2 %, mini 6,6 %, icône 0,5 % ; mémoire réelle 527 Mo stable sur 5 min (bruit déjà vu :
  511-530 Mo). Rien à corriger.
- 2026-11-11 (it. 759) : « À vérifier » 15 : marche à suivre de l'essai Tauri sous Windows (workflow, exe, comparaison,
  passage des clics).
- 2026-11-11 (it. 758) : crawl en russe avec tous les déblocages (groupe « Automatismes », fenêtre large, cases) :
  334 clics sans erreur. Workflow de l'essai Tauri toujours pas ajouté.
- 2026-11-11 (it. 757) : CLAUDE.md (pièges) : onglets préparés d'avance = éléments présents dans les onglets cachés ;
  compter dans l'onglet visible. Workflow de l'essai Tauri toujours pas ajouté.
- 2026-11-11 (it. 756) : « Quoi de neuf » édition 26 : onglets préparés d'avance (it. 750), son coupé = moteur audio en
  pause (it. 753). Traduite.
- 2026-11-11 (it. 755) : essai sans `will-change` sur les acteurs (moins de couches à composer) : bande 19,55 / 19,75 %
  avant, 19,65 / 19,75 % après (copies neuves) : aucun effet, annulé.
- 2026-11-11 (it. 754) : où part le processeur de la bande (19 % d'un cœur en rendu logiciel) : la bande tourne à
  30 images/s et strip.draw ne prend que 0,18 ms par image (0,5 %) : presque tout le coût est la composition et la
  peinture du navigateur (sans carte graphique ici). Optimiser le JavaScript n'apporterait rien ; le seul levier est un
  dessin sur un seul canevas (WebGL) ; sur Windows avec carte graphique le coût réel doit être bien plus bas
  (« À vérifier » 3). Workflow de l'essai Tauri toujours pas ajouté.
- 2026-11-11 (it. 753) : processeur : le son coupé en cours de partie (bouton haut-parleur, ou effets et musique
  désactivés) laissait le contexte audio calculer du silence ; Sound.setIdle le suspend (repris dès qu'un son ou la
  musique revient). Écart attendu ≈ 3 points sur la bande (lancement son coupé : 16,1 % contre 19,1 %). Autotest (141) :
  suspendu puis repris au second clic. Workflow de l'essai Tauri : pas encore ajouté sur GitHub.
- 2026-11-11 (it. 752) : essai Tauri vérifié sur le serveur : Rust installé dans le dossier personnel (rustup, cible
  x86_64-pc-windows-msvc) ; `cargo check` pour Windows passe (faux llvm-rc temporaire pour la ressource d'icône,
  outil absent ici ; l'édition des liens ne se fait que sur Windows). README de l'essai à jour.
- 2026-11-11 (it. 751) : mémoire après le préchauffage des onglets : 520 Mo stables (5 min) : les 420 Mo de la revue 750
  étaient faussés par les essais menés en même temps.
  DEMANDE X de Victor : essai Tauri limité à la bande (dossier proto-tauri/, indépendant du jeu Electron) : mêmes pages
  (src/renderer copié par build-web.mjs), pont remplacé (bridge.js -> commandes Rust), fenêtre bande + panneau en bas
  de la zone de travail, transparente, au premier plan, clics traversants (position de la souris 20 fois/s, comme
  Electron), sauvegarde à part (copie lue de la partie Electron au premier lancement, jamais réécrite). Pas de Rust ni
  de droits d'installation sur le serveur : compilé pour Windows par GitHub Actions ; le jeton du serveur n'a pas le droit
  de créer un workflow : Victor doit ajouter proto-tauri/workflow-a-ajouter.yml en .github/workflows/ (README), artefact
  « sillwalker-tauri-essai ». Mode d'emploi et comparaison : proto-tauri/README.md.
- 2026-11-11 (it. 750, revue générale) : balance 12 h vs fe555b7 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl ru 318 / es 319 clics sans erreur ; perf bande 19,1 %, panneau 20,5 %, mini 6,5 % ; mémoire réelle 420 Mo
  (plus bas que d'habitude, mesuré pendant d'autres essais : à confirmer à la revue 760).
- 2026-11-11 (it. 750) : DEMANDE W de Victor : « sur Windows, un onglet met du temps à s'ouvrir la première fois, ensuite
  ça va vite ». Mesuré (rendu + 2 images + décodage) : 1re ouverture 35-226 ms (Aventure 226, Compétences 100,
  Bestiaire 75), ensuite 26-42 ms : au premier affichage, icônes fabriquées (canevas → image) et images décodées.
  Panel.warmTabs : 4 s après le lancement, quand l'ordinateur est inoccupé (requestIdleCallback), l'onglet courant puis
  chaque onglet jamais affiché est construit caché et ses images décodées. 1re ouverture ensuite 26-49 ms (Compétences
  100 → 28, Bestiaire 75 → 40). Autotest : le Bestiaire comptait des fiches cachées (préchauffées) et ne cliquait plus
  l'onglet : il compte désormais l'onglet visible. 140/140 ; crawl 322 clics. Questions de Victor sur Tauri / moteurs
  natifs : répondu (Tauri gagne surtout en mémoire, pas en processeur ; voir la conversation).
- 2026-11-11 (it. 749) : « À vérifier » point 14 : emplacement des options corrigé (Aventure, sous le sac, « Automatismes »,
  it. 744 ; ce n'était pas Héros > Équipement).
- 2026-11-11 (it. 748) : « Quoi de neuf » édition 25 : automatismes regroupés sous le sac (it. 744). Traduite.
- 2026-11-11 (it. 747) : lang-overflow (pire cas de l'it. 746) passé sur le code d'avant la correction (662d0f1) :
  « de 1280 : adventure=186 » : il aurait vu le défaut de l'it. 744.
- 2026-11-11 (it. 746) : lang-overflow mesure le pire cas avec TOUS les déblocages achetés (record 310) : l'it. 744 était
  passée inaperçue faute de ce cas. 10 langues × 1920 / 1366 / 1280 : aucun défilement. CLAUDE.md à jour.
- 2026-11-11 (it. 745) : « Automatismes » : le titre de la fenêtre suit les cases cochées (autosCount) ; autotest (140) :
  tous les déblocages, plus de case sous le sac, fenêtre large, case changée sans fermer, titre « 5 / 6 ».
- 2026-11-11 (it. 744) : BOGUE d'affichage : avec tous les déblocages (6 cases d'automatismes sous le sac : valet,
  creuset, maître de forge + les 3 nouveaux), Aventure défilait de 186 px en allemand à 1280 (les contrôles mesurent un
  état sans ces déblocages). Au-delà de 2 automatismes, ils passent dans « Automatismes (actifs / total) », ouvert dans
  la fenêtre large (MODAL_DETAILS) ; une case cochée là ne ferme plus la fenêtre. Captures (repliée, ouverte, case
  changée) ; overflow-report 1280 de : aucun ; 139/139 ; de, pl, ru sans défilement. Reste : le titre (6 / 6) ne se
  met à jour qu'au rendu suivant.
- 2026-11-11 (it. 743) : « À vérifier » point 14 : les trois déblocages au-delà du Rebord.
- 2026-11-11 (it. 742) : test-logic : freshState exclut aussi starSmith, herbalist et trader (ils dépensent l'or tout
  seuls ; leurs tests les activent explicitement) ; CLAUDE.md à jour. 194 tests.
- 2026-11-11 (it. 741) : succès « Tout débloqué » (UNLOCK_ALL) : suit la liste (n / 26 affiché), aucun nombre en dur
  (jeu, steam/achievements.md, README). Il demande désormais d'aller jusqu'à la zone 300 (Marchand attitré) ; un succès
  Steam déjà obtenu reste acquis.
- 2026-11-11 (it. 740, revue générale) : balance 12 h vs e3ecc92 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl ko 318 / pl 319 clics sans erreur ; perf bande 19,1 %, panneau 20,1 %, mini 6,6 % ; mémoire réelle 515-517 Mo.
- 2026-11-11 (it. 739) : nouveaux réglages sauvegardés (autoAnvil, autoBuffs, autoTrade) : save-fuzz 27/27 ok ;
  fuzz 1200 parties, 0 bloquée.
- 2026-11-11 (it. 738) : Marchand attitré essayé en vrai (copie dev-data) : rien acheté, à juste titre (étal moins bon
  que l'équipement porté) mais surtout sac plein, fréquent en fin de partie : il n'aurait presque jamais servi.
  Désormais, sac plein : achat direct, l'objet porté remplacé est vendu (jamais un légendaire : alors pas d'achat).
  Test (sac plein, le sac ne déborde pas). Semaine guerrier : graine 7 302 (inchangé), graine 3 287. 139/139.
- 2026-11-11 (it. 737) : « Quoi de neuf » édition 24 : Marchand attitré (it. 736) et correction de l'ordre des
  déblocages. Traduite (9 langues). 139/139 ; de, pl sans défilement.
- 2026-11-11 (it. 736) : nouveau déblocage « Marchand attitré » (zone 300, 2e31 or, icône propre) : achète et équipe
  l'objet de l'étal qui renforce le plus le héros (> 1 %), avec l'or en trop (4 fois le prix) et de la place dans le
  sac ; calcul refait seulement quand l'étal ou l'équipement change ; option. Traduit, test (194).
  BOGUE trouvé en route (depuis l'it. 732) : nextUnlock suit l'ordre du tableau et l'Herboriste (260) était rangé avant
  le Forgeron (230) : le « prochain déblocage » visait l'Herboriste à partir de 230 (carte du héros, astuce, achat d'un
  clic, simulateur). Déblocages remis dans l'ordre des zones + test (tableau trié). Semaine : mage 286-287, guerrier
  302 (Marchand acheté vers 152 h). 139/139 ; crawl 328 clics. README : 26 déblocages (8 à 300).
- 2026-11-11 (it. 735) : nouveaux déblocages : l'astuce « déblocage payable » est générique (rien à ajouter). Texte russe
  extrait avec Herboriste et Forgeron achetés : noms traduits (Вечный травник, Звёздный кузнец) ; mots latins : suffixes
  des grands nombres (Oc, No) et noms de langues seulement.
- 2026-11-11 (it. 734) : Herboriste perpétuel vu en vrai (copie, zone 30, record 270) : 6 achats, les 6 effets actifs
  (≈ 9 min restantes). Premier essai en zone 60 sans effet : héros K.O. puis recul, aucune victoire en direct ;
  l'Herboriste agit à chaque victoire, pas pendant l'absence (rachat dès la première victoire au retour).
- 2026-11-11 (it. 733) : « Quoi de neuf » édition 23 : l'Herboriste perpétuel (it. 732), nom cité tel qu'il est traduit
  (allemand reformulé pour garder « Ewiger Kräuterkundler » sans article). 139/139 ; de, pl sans défilement.
- 2026-11-11 (it. 732) : nouveau déblocage au-delà du Rebord : « Herboriste perpétuel » (zone 260, 1e28 or, icône
  propre) : rachète chaque élixir / parchemin dont l'effet tombe sous 1 min, avec l'or en trop (garde 4 fois le prix),
  sans journal ni son ; option (Héros > Équipement). Traduit, test logique (192). Semaine : mage 282-287 (3 graines),
  guerrier 300, acheté vers 116-146 h : confort, sans effet notable sur la progression. 139/139 ; crawl 332 clics.
  README : 25 déblocages (8 à 260).
- 2026-11-11 (it. 731) : mémoire (531 Mo à la revue 730) : mem-watch 15 min : 511-522 Mo, sans pente (30 s : 516,
  840 s : 516) : pas de fuite.
- 2026-11-11 (it. 730, revue générale) : balance 12 h vs d6479f7 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl ja 323 / pt 319 clics sans erreur ; perf bande 19,3 %, panneau 20,1 %, mini 6,3 % ; mémoire réelle 525-531 Mo
  (it. 691 : 12 min sans pente ; à revoir à la revue 740).
- 2026-11-11 (it. 729) : README : 24 déblocages (zones 8 à 230), Forgeron des astres ajouté à la liste.
- 2026-11-11 (it. 728) : capture Boutique > Déblocages (copie, record 240) : carte du Forgeron des astres en dernier,
  icône propre (enclume, marteau, étoiles), description complète, prix « 30,00 Sp ». Conforme.
- 2026-11-11 (it. 727) : perf des feux follets (z-index + taille, it. 720-725) : même copie (3 pétales, niv. 20000),
  avant (8a93844) 21,8 % / après 22,1 % : bruit (cette copie coûte plus que dev-data par elle-même).
- 2026-11-11 (it. 726) : capture effets complets coupés (copie, 3 pétales) : feux follets immobiles autour du héros
  (vert à gauche, orange à droite, le troisième derrière lui) : conforme à l'it. 725.
- 2026-11-11 (it. 725) : accessibilité : effets complets coupés (dont « réduire les animations » du système, it. 658) :
  les feux follets ne tournent plus (immobiles autour du héros, un devant, les autres derrière). 139/139.
- 2026-11-11 (it. 724) : demande V, suite : perspective des feux follets (×0,75 derrière le héros, ×1,2 devant), dans la
  transformation déjà recalculée à chaque image. Captures vérifiées. 139/139.
- 2026-11-11 (it. 723) : autotest (139) : z-index du héros = 2, entre les feux follets (1 derrière, 3 devant) (demande V).
- 2026-11-11 (it. 722) : « Quoi de neuf » édition 22 : demandes U (boutons d'expédition) et V (feux follets derrière
  puis devant le héros), traduite en 9 langues avec les termes du jeu (wisp, Irrlicht, блуждающий огонёк, 鬼火…).
  138/138 ; de, pl sans défilement.
- 2026-11-11 (it. 721, revue générale décalée) : balance 12 h vs f926735 +0,0 ; fuzz 1200 parties, 0 bloquée ;
  save-fuzz ok ; crawl de 318 / zh 325 clics sans erreur ; perf bande 19,1 %, panneau 19,7 %, mini 6,6 % (z-index du
  héros sans effet) ; mémoire réelle 519 Mo stable.
- 2026-11-11 (it. 720) : DEMANDE V de Victor : « les boules visuelles d'un pétale de compétence complet passent
  derrière le personnage et reviennent devant ». drawCores (strip.js) donnait déjà aux feux follets z-index 1 (derrière)
  ou 3 (devant), mais le héros n'avait pas de z-index : les deux passaient devant. Héros z-index 2 (styles.css), nombres
  flottants z-index 4 (restent au-dessus du héros). Captures (copie, 3 pétales complets) : un feu follet devant le torse,
  un autre derrière les jambes. 138/138. (Revue générale 720 décalée à 721.)
- 2026-11-11 (it. 719) : journal : demande U notée FAITE ; point 12 « À vérifier » (familiers à la résolution de Victor).
- 2026-11-11 (it. 718) : autotest (138) : aucun bouton ne sort de sa carte ou de son panneau sur les 12 onglets (sonde
  des it. 716-717 rendue permanente ; une rangée défilante n'est ignorée que si elle est dans la carte : les cartes
  elles-mêmes dans une rangée défilante, comme les familiers, restent contrôlées). Placée en fin d'autotest (elle
  change d'onglet).
- 2026-11-11 (it. 717) : même sonde (boutons hors carte, hors rangées défilantes) en allemand et en russe, 1366 et 1280,
  12 onglets, copie réelle avec expéditions finies : rien.
- 2026-11-11 (it. 716) : suite de la demande U : sonde TEMP sur une copie réelle (expéditions finies) : boutons qui
  dépassent de leur carte, 12 onglets, 1920 et 1280. 1920 : rien. 1280 : seulement des rangées défilantes voulues
  (Boutique : marchand, potions, coffres ; Familiers : barre du haut), capture vérifiée. Rien à corriger.
- 2026-11-11 (it. 715) : autotest (137) : boutons d'expédition dans la carte (envoi sur une ligne, « Récupérer le
  butin » dans la carte) ; vérifié qu'il échoue sur l'ancien code (« 2 lignes »). Les contrôles de défilement
  mesuraient un état de démonstration sans expéditions et ne voyaient pas un bouton qui sort d'une carte.
- 2026-11-11 (it. 714) : DEMANDE U de Victor : « les boutons pour récupérer une expédition sortent de l'écran et les
  autres font un scroll aussi ». Familiers : expédition finie = phrase + bouton côte à côte, plus larges que la carte
  (« Récupérer le butin » coupé) ; familier libre = 3 boutons « Balade · 30 min / Voyage · 2 h / Grande expédition ·
  8 h » sur deux lignes à 1366 / 1280 (cartes plus hautes, onglet qui défile). Corrigé : bouton de récupération seul,
  pleine largeur (phrase en infobulle) ; boutons d'envoi sur une ligne, durée seule (nom en infobulle et pour le
  lecteur d'écran). Captures 1920 / 1366 / 1280 vérifiées ; 136/136 ; de, pl, ru sans défilement.
  Aussi : Forgeron des astres vu en vrai (copie, record 240, objets niv. 50 → 240 : « 7 objets remontés pendant ton
  absence »).
- 2026-11-11 (it. 713) : « Quoi de neuf » édition 21 : le Forgeron des astres (it. 712), nom et Rebord cités tels
  qu'ils sont traduits (Sill, Alféizar, Saum, Krawędź, Кромка, 縁…). 136/136 ; de, pl sans défilement.
- 2026-11-11 (it. 712) : nouveau déblocage au-delà du Rebord (aucun après la zone 200 jusqu'ici) : « Forgeron des astres »
  (zone 230, 3e25 or, icône propre) : l'Enclume stellaire sans clic, remonte au niveau du record l'objet porté le
  moins cher, avec l'or en trop (garde 3 fois le prix), aussi pendant l'absence (une ligne de journal) ; option
  (Héros > Équipement). Traduit (9 langues), test logique (191). Semaine : mage 268-285 → 283-302 (3 graines),
  guerrier 301, acheté vers 107 h ; 136/136 ; de, pl, ru sans défilement ; crawl au-delà de 230 : 338 clics.
- 2026-11-11 (it. 711) : « Quoi de neuf » édition 20 : contour spectral des échos (it. 701-702), étiquette des champions
  et virgules (it. 693, 708) ; traduite en 9 langues avec les termes du jeu (Statthalter, наместники, 配下, 残響…).
  136/136 ; de, pl à 1920 / 1366 / 1280 : aucun défilement.
- 2026-11-11 (it. 710, revue générale) : balance 12 h vs d097834 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl en 318 / ru 318 clics sans erreur ; perf bande 19,2 %, panneau 20,3 %, mini 6,6 % ; mémoire réelle 519 Mo stable.
- 2026-11-11 (it. 708) : étiquette des champions sur la bande : « Champion » + affixe collés dans l'ordre français
  (« Champion fast », « Champion schnell ») ; clé « Champion {0} » traduite dans l'ordre de chaque langue (« Fast
  champion », « Gepanzerter Champion », « Быстрый чемпион »), première lettre en capitale. 136/136.
- 2026-11-11 (it. 706-707) : la carte s'arrête à 200 (échos hors carte ; zone indiquée dans l'infobulle des reliques).
  Perf en zone 250 (écho au contour spectral) : bande 18,9 %, panneau 21,9 % : rien de mesurable (contour dans l'image).
- 2026-11-11 (it. 705) : autotest (136) : contour spectral des échos aux zones 250, 300, 350, absent pour l'original
  (zone 50) et ailleurs.
- 2026-11-11 (it. 704) : crawl en polonais au-delà du Rebord (zone 255, quatre reliques de niveaux variés) : 330 clics
  sans erreur (contour des échos, épithètes accordées).
- 2026-11-11 (it. 703) : « À vérifier » (point 11) : contour des échos ajouté.
- 2026-11-11 (it. 702) : mode mini : même contour spectral pour l'écho en combat ; couleur partagée (ECHO_OUTLINE,
  relics.js). Capture vérifiée. 135/135.
- 2026-11-11 (it. 701) : échos des lieutenants (zones 250, 300, 350) : même sprite que l'original ; contour spectral bleu
  pâle dessiné dans l'image (outlinedFrames, echoOutline() dans strip.js), en attente et en combat : on les reconnaît
  d'un coup d'œil. Capture vérifiée (écho du Geôlier). 135/135.
- 2026-11-11 (it. 700, revue générale) : balance 12 h vs f4c6343 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl es 319 / pt 324 clics sans erreur ; perf bande 19,4 %, panneau 20,4 %, mini 6,6 % ; mémoire réelle 521 Mo
  (530 à la revue 690 : bruit de lancement, confirmé).
- 2026-11-11 (it. 699) : CLAUDE.md : repère IDLE mis à jour (it. 698 : 15 à 9 h, 16 à 12 h).
- 2026-11-11 (it. 698) : joueur absent (IDLE=1, guerrier, 12 h) : record 15 à 9 h puis 16 à 12 h (repère it. 371 : 12 → 15) :
  le jeu avance toujours seul.
- 2026-11-11 (it. 697) : tab-pace inchangé (talents 1, quêtes 5, boutique 8-9, Héros 10, carte 11-12, bestiaire 14-15,
  ascension 20-43 min ; zone 22).
- 2026-11-11 (it. 696) : début de partie inchangé : early-pace à 60 min : 109 objets, niv. 39, zone 23, 6 déblocages
  (identique au repère) ; first-minutes : premier objet 41-77 s, premier boss 77-86 s.
- 2026-11-11 (it. 694-695) : plus aucune « , » collée entre deux variables d'un gabarit. Texte coréen extrait : aucune
  double particule restée (koJosa) ; mots latins : Lv, pt (usage coréen), noms de langues.
- 2026-11-11 (it. 693) : texte chinois extrait : aucun mot latin suspect, mais des « , » occidentales collées au chinois :
  libellé lu des objets (aria-label « nom, rareté », panel.js), récompense du jour et retour d'expédition avec objet
  (game.js), résumé d'absence (coffres, app.js) : csep(). Le test des séparateurs signale aussi `", " +`. 135/135,
  crawl zh 322 clics sans erreur.
- 2026-11-11 (it. 692) : lang-overflow complet après les changements de textes (it. 665-682 : édition 19, noms russes,
  épithètes, particules coréennes) : 10 langues × 1920 / 1366 / 1280 : aucun défilement (30/30).
- 2026-11-11 (it. 691) : mémoire (530 Mo à la revue 690) : mem-watch 12 min : 517-523 Mo, sans pente (30 s : 518,
  660 s : 521) : écart de lancement à lancement, pas de fuite.
- 2026-11-11 (it. 690, revue générale) : balance 12 h vs ba2874f +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl ru 319 / ja 318 clics sans erreur ; perf bande 19,2 %, panneau 20,5 %, mini 6,8 % ; mémoire réelle 529-530 Mo,
  stable pendant la mesure (revues précédentes 512-523 : à surveiller à la revue 700).
- 2026-11-11 (it. 689) : le test des noms d'objets (it. 688) signale bien une pièce non traduite (« Аметистовая seal … »
  sans « Sceau » en russe) ; le premier essai semblait passer car `grep -m1 "→"` tombait sur le titre d'un autre test.
- 2026-11-11 (it. 688) : test logique (190) : 4000 objets tirés en anglais (aucun accent français) et en russe (aucune
  lettre latine) ; vérifié qu'il échoue si une matière n'est pas traduite (« Наручи Iron … »). 135/135.
- 2026-11-11 (it. 686-687) : code mort aussi cherché dans ui/tabs, main, shared : rien. itemName renvoie le nom
  français si la pièce n'est pas reconnue : 200 000 objets tirés (rollItem, zones 1-400, raretés 0-4) en anglais :
  aucun nom resté en français.
- 2026-11-11 (it. 685) : code mort : recherche des exports jamais utilisés (game, i18n, render, ui) : plS (ancien
  pluriel, plus aucun appel) et MINI_W (340, périmé : la largeur vient de config.MINI_WIDTH = 370) retirés ; CLAUDE.md
  à jour. 135/135.
- 2026-11-11 (it. 684) : CLAUDE.md (Traductions) : outils d'accord (RU_GENDER, BOSS_GENDER / FORMS, koJosa) et quand
  les compléter (nouveau boss ou nouvelle pièce au nom non masculin ; double particule coréenne après une variable).
- 2026-11-11 (it. 683) : coréen, suite de l'it. 682 : aucune traduction ne commence par une particule (simple ou double)
  après un nom collé par concaténation : koJosa (textes à variables) suffit.
- 2026-11-11 (it. 682) : coréen : koJosa (i18n/index.js, appelé par fill en coréen) remplace « X이(가) », « X을(를) »,
  « X은(는) », « X과(와) » par la particule juste selon la fin de X (syllabe à consonne finale, chiffre selon sa
  lecture ; lettre latine : double forme gardée). Deux traductions à particule fixe fausse corrigées (1247 « {0}와 »,
  1484 « +{1}이 »). Test logique (189). 135/135, crawl ko 316 clics sans erreur.
- 2026-11-11 (it. 681) : mage et nécromancien bas dans chaque revue (59-60, graine 7) : graines 3 / 11 / 21 : mage
  62 / 62 / 60, nécro 62 / 62 / 60 ; moyenne sur 4 graines 60,8 et 61,0 pour 62,1 : à peine plus que le bruit, rien changé.
- 2026-11-11 (it. 680, revue générale) : balance 12 h vs 3e2eb6f +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl de 324 / ko 323 clics sans erreur ; perf bande 19,4 %, panneau 21,1 %, mini 6,7 % ; mémoire réelle 522 Mo stable.
- 2026-11-11 (it. 679) : i18n-quotes (npm test) contrôle aussi les noms de héros cités dans « Quoi de neuf » : chaque
  langue doit reprendre le nom traduit du héros (it. 677 : « プリーステス » au lieu de « 司祭 ») ; vérifié qu'il le signale.
- 2026-11-11 (it. 678) : vérifié : les affixes d'élite (Быстрый, Бешеный…) s'affichent seuls en étiquette, jamais
  accolés au nom du monstre ; « Чемпион быстрый » s'accorde avec Чемпион (masculin) : pas d'accord à faire.
- 2026-11-11 (it. 677) : « Quoi de neuf » édition 19 : Prêtresse renforcée (it. 663), accords et ponctuation
  (it. 665-675), traduite en 9 langues (nom de classe repris tel qu'il est traduit : 司祭 en japonais).
  135/135 ; lang-overflow de, pl à 1920 / 1366 / 1280 : aucun défilement.
- 2026-11-11 (it. 676) : test logique (188) des épithètes de boss accordées en de, es, pt, ru, pl (zones 35, 36, 81).
- 2026-11-11 (it. 675) : allemand, espagnol, portugais : article de l'épithète des boss accordé (FORMS + BOSS_GENDER,
  bosses.js) : « Schleimkönigin die Erwachte », « Reina Babosa la Despertada », « Rainha Gosma a Desperta »,
  « Das Auge … das Uralte ». Anglais inchangé. 135/135.
- 2026-11-11 (it. 674) : polonais : mêmes épithètes de boss accordées (plAgree, i18n/index.js ; BOSS_GENDER par
  langue dans bosses.js) : « Królowa Szlamu Przebudzona », « Otchłanne Szczypce Pradawne ». Oubli russe corrigé :
  « Зелёная Пасть » est féminin. 135/135.
- 2026-11-11 (it. 673) : russe : épithètes des boss de 2e et 3e boucle (« Пробуждённый », « Древний ») accordées au
  genre du boss (RU_BOSS_GENDER, bosses.js ; BOSS_SRC garde les noms français car translateData remplace BOSS_NAMES) :
  « Королева Слизи Пробуждённая », « Клешни Бездны Древние ». ruAgree (i18n/index.js) partagé avec les matières
  (it. 665), adjectifs mous en -ий compris. 135/135.
- 2026-11-11 (it. 672) : le test des séparateurs (it. 669) signale aussi un `this.log(… + ".")` en dur ; csep() et cend()
  notés dans CLAUDE.md (Traductions).
- 2026-11-11 (it. 671) : suite des it. 667-668 : cend() (clé « . ») pour les 8 lignes du journal qui finissaient par un
  « . » en dur (Équipé, Forge, Acheté, recul, récompense de quête…) : « 。 » en japonais et en chinois. 135/135.
- 2026-11-11 (it. 670, revue générale) : balance 12 h vs 52f8811 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl pl 323 / zh 318 clics sans erreur (listes en « ， ») ; perf bande 19,3 %, panneau 21,0 %, mini 6,6 % ;
  mémoire réelle 512-518 Mo stable.
- 2026-11-11 (it. 669) : test logique (187) : aucun `.join(", ")` dans src/renderer hors format.js (fallback de
  listJoin) ; vérifié qu'il échoue sur un ajout. 135/135.
- 2026-11-11 (it. 668) : suite de l'it. 667 : csep() (i18n/index.js, clé « , ») remplace les 9 `.join(", ")` des
  textes affichés (talents, journal, mécaniques des boss, ascension, bestiaire, statistiques, mode mini) : listes en
  « 、 » (ja) et « ， » (zh). 135/135, crawl ja 317 clics sans erreur.
- 2026-11-11 (it. 667) : extraction du texte japonais (--dump-text) : aucun mot latin suspect (HP, Lv, pt, BGM :
  usage japonais ; Sp, Oc : suffixes des grands nombres). Seul défaut : le résumé d'absence mettait une virgule « , »
  en dur avant « objets gardés » ; nouvelle clé « , » (ja 、, zh ，). 135/135.
- 2026-11-11 (it. 666) : après l'accord russe des matières (it. 665) : lang-overflow ru à 1920 / 1366 / 1280 : aucun défilement.
- 2026-11-11 (it. 665) : russe : les matières-adjectifs (железный, стальной, алмазный…) restaient au masculin
  (« Печать алмазный », « Сабля стальной ») ; itemName (i18n/data.js) les accorde au genre de la pièce (RU_GENDER,
  ruAdjective) et les place devant le nom (« Алмазная печать », « Кожаные сапоги »). Matières en « из … » inchangées ;
  polonais et allemand non concernés (préposition). Test logique ajouté (186). 135/135.
- 2026-11-11 (it. 664) : CLAUDE.md : fuzz.mjs couvre les 20 héros (60 graines = 1200 parties), pas « 10 classes ».
- 2026-11-11 (it. 663) : équilibrage : la Prêtresse (60 zones en 12 h sur 4 graines, la plus basse) : attaque ×1,05 →
  ×1,12 ; graines 3 / 11 / 21 : 59 / 62 / 59 → 60 / 62 / 61. Hausse (pas à annoncer). 135/135.
- 2026-11-11 (it. 661) : palier vers 250 (it. 659) : zoneMight (rules.js) croît sans cassure (croissance qui ralentit
  progressivement après MONSTER_SOFT_ZONE) ; pas de mur codé : ralentissement de fin de semaine, le record repart
  ensuite (268-285). Rien changé.
- 2026-11-11 (it. 660, revue générale) : balance 12 h vs 911d578 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl pt 323 / ja 317 clics sans erreur ; perf bande 19,3 %, panneau 20,5 %, mini 6,6 % ; mémoire réelle 517 Mo stable.
- 2026-11-11 (it. 659) : semaine du mage sur 3 graines (3, 11, 21) : palier vers la zone 250 entre 120 h et 144 h.
  Même mesure sur l'état d'avant les échos (7354b5d, it. 633) : même palier (242-254) et même record final (269-275) :
  c'est la difficulté générale vers 250, pas les échos. Essai d'échos sans surplus (PV ×1,2, attaque ×1,1) : rien de
  mieux, annulé. Records actuels 268-285.
- 2026-11-11 (it. 658) : vérifié : « réduire les animations » du système couvre aussi les ajouts de la nuit (règle
  globale styles.css : toutes les animations coupées, dont le flottement de la relique ; effets complets coupés).
- 2026-11-11 (it. 657) : crawl en russe sur une partie au-delà du Rebord (zone 255, écho du Geôlier, quatre reliques
  à divers niveaux) : 334 clics sans erreur.
- 2026-11-11 (it. 656) : lang-overflow complet (10 langues × 1920 / 1366 / 1280, pire cas des reliques) après les ajouts
  de la nuit : aucun défilement, aucune ligne trop large.
- 2026-11-11 (it. 655) : carte : niveau de la Couronne (« ★ n/5 ») au-dessus du Briseur (accolé au nom, il sortait de la
  carte à 1280 px en allemand et en russe ; vérifié en capture). 135/135.
- 2026-11-11 (it. 654) : Statistiques : « Boss majeurs et échos vaincus » (S.stats.majors, affiché dès le premier).
  Traduit ; save-fuzz ok ; aucun défilement pl / de / ru à 1920 et 1280. 135/135.
- 2026-11-11 (it. 653) : npm test vérifie que les fichiers Steam générés (succès, statut des amis) sont à jour
  (--check) ; CLAUDE.md dit comment les régénérer.
- 2026-11-11 (it. 652) : Steam : steam/achievements.md, les 61 succès avec leur nom dans les 10 langues (généré par
  scripts/steam-achievements.mjs depuis les traductions du jeu ; aucun nom manquant), à recopier dans Steamworks.
- 2026-11-11 (it. 651) : Steam, statut vu par les amis : fichier steam/richpresence.vdf prêt à téléverser (10 langues,
  20 classes), généré par scripts/steam-richpresence.mjs depuis les traductions du jeu ; le jeu envoie aussi
  « classid » (la classe s'affiche dans la langue de chaque ami, jeton {#Class_%classid%}). README (Steam, point 4).
- 2026-11-11 (it. 650, revue générale) : balance 12 h vs 95e0634 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl en / es 318 clics sans erreur ; perf bande 19,1 %, panneau 20,2 %, mini 6,6 % ; mémoire réelle 515 Mo stable.
- 2026-11-11 (it. 649) : test logique du Silence : aucun sort pendant 2 s de silence, ils reprennent ensuite. 185 tests.
- 2026-11-11 (it. 648) : README, boss : liste des capacités complétée (peau de pierre, malédiction, tenace) et Silence
  des échos.
- 2026-11-11 (it. 647) : Silence visible sur le héros (terni, halo pâle) pendant les 4 s ; filtre CSS acceptable :
  passager. Vérifié en capture. 135/135.
- 2026-11-11 (it. 646) : « Quoi de neuf » édition 18 : Silence des échos, soin du Cœur entre les combats, correction
  du Drone (carapace et peau de pierre : baisse annoncée, principe h). Noms repris des traductions existantes ;
  aucun défilement de / ru / pl. 135/135.
- 2026-11-11 (it. 645) : son du Silence (souffle qui s'éteint) ; l'autotest rend maintenant hors ligne les sons des
  10 capacités de boss (ils n'y étaient pas) : ni erreur, ni saturation. 135/135.
- 2026-11-11 (it. 644) : nouvelle capacité de boss « Silence » (piste « plus de mécaniques de boss »), réservée aux
  échos des lieutenants : toutes les 15 s, plus aucun sort pendant 4 s (recharges en pause ; « Silence ! » sur la
  bande). Hors de l'ordre des capacités ordinaires (rien ne change pour les boss existants). Test logique ; fuzz 600
  ok ; semaine mage 268 (278 : le mage dépend des sorts), guerrier 287. À annoncer dans la prochaine édition. 135/135.
- 2026-11-11 (it. 643) : partie neuve vérifiée en capture (20 s, français) : deux onglets, objectif « Prochaine
  découverte », zone 1 et son boss ; rien des reliques n'encombre le début.
- 2026-11-11 (it. 642) : infobulle du niveau des reliques des lieutenants : « Au-delà du Rebord, son écho (zone N) en
  donne un de plus par course. » (dernier point de la relecture it. 638). Traduit. 135/135.
- 2026-11-11 (it. 641) : Cœur de l'aube : la régénération agit aussi pendant la marche (le texte promet « chaque
  seconde » ; relecture it. 638) ; le « +X » vert reste réservé au combat. 135/135.
- 2026-11-11 (it. 640, revue générale) : balance 12 h vs 50a39b7 +0,6 (bruit) ; fuzz 1200 parties, 0 bloquée ;
  save-fuzz ok ; crawl pl 318 / ko 325 clics sans erreur ; perf bande 19,5 %, panneau 20,7 %, mini 6,6 % ; mémoire
  réelle 515 Mo stable ; vidage russe (reliques, échos, éditions 15-17) : seuls « Oc » / « Sp » nouveaux = suffixes des
  très grands nombres (format.js HUGE, communs à toutes les langues, voulu).
- 2026-11-11 (it. 639) : semaine simulée après la correction du Drone (carapace, rempart) : mage 278, guerrier 301
  (286 à l'it. 634 : bruit d'une graine) : pas de frein. Repère CLAUDE.md à jour.
- 2026-11-11 (it. 638) : relecture indépendante (agent) du code des reliques (01a4dfd..HEAD) : règles des niveaux,
  ascension, migrate, effets uniques : sans faute. Corrigé : (1) les missiles du Drone ignoraient le rempart et la
  carapace des boss (coups, clics et sorts les respectent) : bulwarkFactor + carapace, test logique ; (2) la zone
  n'annonçait pas que le Briseur (zone 200) renforcera la Couronne : ajouté (aucun défilement de / ru à 1280).
  Laissés : soin du Cœur seulement en combat ; l'infobulle du niveau ne cite pas les échos. 135/135.
- 2026-11-11 (it. 637) : test logique des échos : zones 250, 300, 350 seulement (pas en 200, 249, 251, 400), nom
  « Écho : … » (« Echo: » en anglais, langue des tests), relique portée. 184 tests.
- 2026-11-11 (it. 636) : pire cas de l'annonce d'un écho (zone 345, Lame niveau 4, de / pl / ru à 1280 et 1366) :
  aucun défilement. « À vérifier par Victor » : point 11 (niveaux des reliques, échos).
- 2026-11-11 (it. 635) : écho vérifié en capture (zone 250 : « Écho : Le Geôlier mécanique », drone pâle à côté) ;
  « Quoi de neuf » édition 17 (échos, histoires des reliques dans les Chroniques). 135/135.
- 2026-11-11 (it. 634) : objectifs au-delà de la zone 200 (piste ouverte, version mesurée) : échos des trois lieutenants
  en zones 250, 300, 350 (« Écho : … », PV ×1,2 et attaque ×1,1 de plus, mêmes capacités) ; battre un écho renforce
  sa relique, un niveau par course compté à part (S.relicRunEcho ; migrate ; gardé à l'ascension). Annonce dans la
  zone, relique pâle sur l'écho. Test logique ; save-fuzz ok ; fuzz 600 ok ; semaine mage 274, guerrier 286 (pas de
  mur à 250). README. À annoncer dans la prochaine édition. 135/135.
- 2026-11-11 (it. 633) : journal, Idées : chiffres de performance et de progression lointaine mis à jour ; la piste
  « objectifs au-delà de la zone 200 » est désormais atteinte en une semaine simulée : à proposer à Victor.
- 2026-11-11 (it. 632) : ▶ d'une relique dans les Chroniques : la scène revue joue aussi son carillon. 135/135.
- 2026-11-11 (it. 631) : Chroniques (carte du héros) : les reliques gagnées en tête, avec leur histoire et ▶ pour revoir
  leur scène (relicReplay → cinématique forcée). Fenêtre large (hero-chron, mesurée ouverte) : aucun défilement fr,
  de, pl, ru à 1920, 1366, 1280. Contrôle d'autotest. 135/135.
- 2026-11-11 (it. 630, revue générale) : balance 12 h vs 43c902e −0,4 (bruit ; Samouraï 66 → 62) ; fuzz 1200 parties,
  0 bloquée ; save-fuzz ok ; crawl de 316 / zh 321 clics sans erreur ; perf bande 19,1 %, panneau 20,7 %, mini 6,5 % ;
  mémoire réelle 515 Mo stable.
- 2026-11-11 (it. 629) : « Quoi de neuf » édition 16 : soins du Cœur et critiques violets de la Lame, touche U, et la
  baisse du Samouraï (critique +5 % retiré, annoncée : principe h). Noms repris des traductions existantes ; aucun
  défilement de / ru / pl à 1366 et 1280. 134/134.
- 2026-11-11 (it. 628) : touche U : achète le prochain déblocage s'il est prêt (zone atteinte et or suffisant), comme
  un clic sur l'objectif ; rien sinon. Dans la liste des raccourcis ; traduit ; contrôle d'autotest. 134/134.
- 2026-11-11 (it. 627) : équilibrage par héros sur 4 graines (HEROES=all, graines 7, 11, 3, 21) : le bruit d'une
  graine va jusqu'à ±4 zones par héros (lancier 67 / 62, gardien 65 / 69). Moyennes : gardien 65,3, danseuse 64,3,
  barde 63,8, artificière 63,5, lancier 63,3, chaman 62,8, prêtresse 60, autres 61-62 (moyenne 62,3) : tous dans
  ±3 zones, rien retouché. Les réglages des it. 585, 586, 626 (une seule graine) ont pu suivre du bruit ; règle
  ajoutée à CLAUDE.md (au moins 3 graines avant de régler un héros).
- 2026-11-11 (it. 626) : équilibrage : le Samouraï, à 65-66 zones en 12 h à chaque revue (≈ 62 pour les autres) :
  baisser vie / défense n'y changeait rien (65) ; son bonus de critique +5 % retiré : 62. À ANNONCER dans la
  prochaine édition de « Quoi de neuf » (principe h : aucune baisse silencieuse). 133/133.
- 2026-11-11 (it. 625) : vérifié en capture : étincelles violettes des coups critiques avec la Lame du crépuscule.
- 2026-11-11 (it. 624) : Lame du crépuscule visible en combat : les coups critiques (et l'iai) du héros prennent sa
  teinte violette (projectiles, étincelles, éclair) ; les coups ordinaires gardent la couleur de la classe. 133/133.
- 2026-11-11 (it. 623) : vérifié en capture : le soin du Cœur de l'aube, vert à gauche du héros, se distingue des
  dégâts subis (rouges).
- 2026-11-11 (it. 622) : soin du Cœur de l'aube vérifié en capture (événement toutes les 3 s : ok) ; le « +X » partait
  au milieu des nombres de coups critiques et en rose, comme les dégâts subis : déplacé à gauche du héros, en vert.
  133/133.
- 2026-11-11 (it. 621) : Cœur de l'aube visible : la vie regagnée est cumulée et affichée toutes les 3 s de combat
  (« +X » rose au-dessus du héros, seulement s'il a été blessé ; réglage des nombres de dégâts respecté). Pas encore
  vu en capture. 133/133.
- 2026-11-11 (it. 620, revue générale) : balance 12 h vs 6648cc4 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl es / ja 317 clics sans erreur ; perf bande 19,1 %, panneau 19,9 %, mini 6,5 %, icône 0,5 % ; mémoire réelle
  523 Mo stable. npm test lance maintenant i18n-check sur les 9 langues (scripts/i18n-check-all.mjs) : à l'it. 619,
  une variable « ({0}) » recopiée dans une traduction n'avait été vue qu'à la relecture.
- 2026-11-11 (it. 619) : « Quoi de neuf » édition 15 : un niveau de relique par course (précise l'édition 14), relique
  pâle sur son gardien, succès Relique parfaite, niveaux de relique dans « Depuis ta dernière visite ». Traduite
  (« ({0}) » retiré du libellé cité, sinon affiché tel quel) ; i18n-quotes ok ; aucun défilement de / ru / pl à 1366
  et 1280. 133/133.
- 2026-11-11 (it. 618) : infobulle du niveau des reliques à jour de la règle de l'it. 617 : « un niveau par course,
  en battant de nouveau son gardien » (l'édition 14 de « Quoi de neuf », publiée, n'est pas modifiée : à préciser dans
  la prochaine). Traduit. 133/133.
- 2026-11-11 (it. 617) : faille corrigée : sans « passer à la zone suivante », battre le gardien en boucle (zone 50)
  montait sa relique au niveau 5 en quelques minutes. Un niveau par course au plus (S.relicRun : n° d'ascension du
  dernier renforcement ; migrate ; gardé à l'ascension) ; relicUpgradable() pour l'annonce de la zone et la relique
  pâle sur le boss. Test logique ; save-fuzz ok ; semaine mage 278, guerrier 287 (inchangé). 133/133.
- 2026-11-11 (it. 616) : santé de la progression après les reliques : IDLE guerrier 12 h → zone 16 (repère 15) ;
  early-pace inchangé (60 min : 109 objets, niv. 39, zone 23, 6 déblocages) ; first-minutes : premier objet ≈ 41-77 s,
  boss ≈ 77-86 s, onglet Talents ≈ 80 s (3 graines).
- 2026-11-11 (it. 615) : « Depuis ta dernière visite » : « +n niveaux de relique » (relique gagnée ou renforcée
  pendant que le panneau était fermé). Pluriels à 3 formes (pl, ru). Test logique. 133/133.
- 2026-11-11 (it. 614) : vérifié en capture (zone 50, drone niveau 2) : le drone du héros à sa gauche, la relique à
  renforcer plus pâle à droite du Geôlier ; barres de vie sous les pieds.
- 2026-11-11 (it. 613) : la relique flotte à côté de son gardien tant qu'elle peut encore monter de niveau (déjà
  gagnée : plus pâle) ; plus rien au niveau 5. 133/133.
- 2026-11-11 (it. 612) : succès RELIC_MAX « Relique parfaite (niveau 5) » (README : liste Steam ; à créer aussi sur
  Steamworks). Traduit ; test logique ; lang-overflow pl, de, ru à 1920 et 1280 : aucun défilement. 133/133.
- 2026-11-11 (it. 611) : panneau de la zone : un gardien de relique déjà gagnée (pas au niveau 5) est aussi annoncé :
  « Zone 50 : Le Geôlier mécanique renforcera Drone stellaire (niveau 3 → 4). » ; rien au niveau 5. Autotest
  complété ; pire cas (zone 145, de / pl / ru, 1280 et 1366) : aucun défilement. 133/133.
- 2026-11-11 (it. 610, revue générale) : balance 12 h vs d1126bb −0,2 (bruit) ; fuzz 1200 parties, 0 bloquée ;
  save-fuzz ok ; crawl pt 317 / ko 316 clics sans erreur (reliques et niveaux) ; vidage russe (4 reliques, niveaux,
  éditions 12-14) : rien de nouveau ; perf bande 19,5 %, panneau 20,3 %, mini 6,7 %, icône 0,6 % ; mémoire réelle
  517 Mo stable (RSS 800).
- 2026-11-11 (it. 609) : niveaux des reliques visibles : petit chiffre sur les pastilles du héros, « ★ n/5 » sous
  l'icône sur la carte (le nom, coupé au bord de la carte à 1280 en allemand et en russe, passe dans l'infobulle),
  court carillon quand une relique monte de niveau. Vérifié en capture. 133/133.
- 2026-11-11 (it. 608) : niveaux des reliques : chaque nouvelle victoire contre leur gardien (une par course ; le
  Briseur pour la Couronne) renforce la relique, jusqu'au niveau 5 : la part qu'elle ajoute grandit de 10 % par
  niveau (relicPow : drone, protection et régénération du Cœur, Lame, Couronne). S.relicLv (gardé à l'ascension,
  migrate : entiers 1-5, ids connus). Bandeau « X : niveau n ! », journal, niveau dans les infobulles (carte, héros).
  Test logique (niveau 2, plafond 5, ascension) ; save-fuzz ok ; fuzz 600 ok ; balance 12 h −0,2 (bruit) ; semaine :
  mage 251 → 275, guerrier 263 → 286, progression régulière (CLAUDE.md à jour). « Quoi de neuf » édition 14. 133/133.
- 2026-11-11 (it. 607) : thème clair : annonce du prochain boss majeur dans le panneau de la zone lisible (capture).
- 2026-11-11 (it. 606) : thème clair vérifié en capture pour les ajouts des reliques : pastilles de la carte du
  héros, en-tête de la carte (icônes), marqueurs des boss majeurs (fond de carte toujours sombre) : lisibles.
- 2026-11-11 (it. 605) : carte du héros (Aventure) : les reliques gagnées en pastilles-icônes en tête de la rangée de
  pastilles (survol : nom, effet, histoire). Rangée défilante : lang-overflow fr, de, pl, ru à 1920, 1366, 1280 :
  aucun défilement. Vérifié en capture. 133/133.
- 2026-11-11 (it. 604) : vérifié en capture : halo de hâte à une ombre (it. 603) bien visible, orangé par-dessus le
  halo doré dessiné des objets légendaires (proches de teinte, comme avant).
- 2026-11-11 (it. 603) : performance : halos d'état du héros et des boss (hâte, frénésie, œil du faucon, vague
  arcanique, voile protecteur, malédiction, rage) : une ombre au lieu de deux (≈ −0,4 point chacun tant qu'il est
  actif ; la hâte des berserkers, gladiateurs, danseuses de lames… l'est souvent). Teinte principale gardée. 133/133.
- 2026-11-11 (it. 602) : README, Organisation : relics.js, story.js, music.js, sprites.js (contours et halo dessinés
  une fois ; pas de filtre CSS permanent sur la bande).
- 2026-11-11 (it. 601) : mesure de la mémoire corrigée : mem-watch additionnait les RSS (mémoire partagée comptée
  plusieurs fois, écran virtuel Xvfb compris) : ≈ 800 Mo. Il affiche maintenant aussi le « réel » (PSS de l'arbre
  Electron) : ≈ 515 Mo stables (rendu ≈ 190, principal ≈ 90, GPU ≈ 75, son + réseau ≈ 50). CLAUDE.md à jour.
- 2026-11-11 (it. 600, revue générale) : balance 12 h vs d9e1cb2 +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl de / ru 322 clics sans erreur (avec reliques) ; perf bande 19,5 %, panneau 20,5 %, mini 6,5 %, icône 0,6 % ;
  mémoire 802 Mo stable. Pas de nouveau texte depuis la revue 590 (vidage russe non refait).
- 2026-11-11 (it. 599) : CLAUDE.md : repère de performance mis à jour (bande ≈ 19,0 %, panneau ≈ 21 %, mini ≈ 6,6 %,
  icône ≈ 0,6 % ; images dessinées des it. 594-598).
- 2026-11-11 (it. 598) : mode mini : halo légendaire dessiné aussi dans l'image (glowFrames) ; la règle CSS
  .actor.legend n'existe plus. Mini 6,6 % (inchangé : petit encart). Autres filtres du héros (frénésie, œil du
  faucon, vague arcanique, protection, malédiction, hâte) : temporaires (événements, sorts), laissés. 133/133.
- 2026-11-11 (it. 597) : performance : halo des objets légendaires du héros dessiné dans l'image (sprites.js
  glowFrames, 2 pixels, gauche / droite / haut) au lieu du filtre CSS ; se combine au contour du bouclier. Bande
  19,05 % (3 mesures ; sans halo 18,95 % à l'it. 594) : le halo ne coûte plus rien ; it. 594 → 597 : 19,85 → 19,05 %.
  (Le mode mini garde le filtre : petit encart.) Vérifié en capture. 133/133.
- 2026-11-11 (it. 596) : performance (suite de l'it. 595) : bouclier du héros et carapace des boss : contour bleu
  dessiné dans l'image (Actor.reframe, dom.js : images de mêmes poses, décalées pour ne pas bouger) au lieu d'un
  filtre de 4 ombres (paladin, gardien, prêtresse : bouclier presque à chaque combat). Vérifié en capture. Bande
  19,2 % (copie neuve). 133/133.
- 2026-11-11 (it. 595) : performance : contour des élites et champions dessiné une fois dans l'image (sprites.js
  outlinedFrames, cache par image et couleur) au lieu d'un filtre CSS de 4-5 ombres recalculé à chaque image.
  Mesure (filtre forcé sur tous les monstres) : 4 ombres +5,6 points, 1 ombre +2 ; donc ≈ 0,5 point par élite
  visible, gagné. Bande (copie neuve, peu d'élites) 19,4 % ; mini 6,65 % (élite du mode mini aussi dessiné).
  Vérifié en capture (contour doré / violet). Chroniques 50/100/150 relues : cohérentes avec les boss majeurs. 133/133.
- 2026-11-11 (it. 594) : performance : halo des objets légendaires sur le héros (filtre CSS, recalculé à chaque
  image) : sans lui 19,0 %, avec deux ombres 19,85 %, une seule ombre 19,45 % (3 mesures chacune) : une seule ombre
  (−0,4 point, halo toujours visible en capture). Recherche d'autres animations CSS infinies sur la bande : aucune.
  Vérifié : après une ascension, la course repart au plus en zone 21 : chaque course repasse les boss majeurs (les
  parties avancées gagneront leurs reliques) ; l'absence n'avance pas de zone. 133/133.
- 2026-11-11 (it. 593) : essai d'un flottement CSS du drone sur le héros : bande 20,8 → 29,8 % d'un cœur (2 mesures
  chacune, copies neuves avec le drone) : annulé ; retiré aussi de la relique flottant à côté du boss majeur (un
  combat contre un mur peut durer). Piège noté dans CLAUDE.md (aucune animation CSS permanente sur la bande).
- 2026-11-10 (it. 592) : README : section « Boss majeurs et reliques » (zones, effets, réglage, carte, succès).
  Autotest : contrôle de l'annonce du prochain boss majeur dans le panneau de la zone (présente à la zone 45,
  absente une fois la relique gagnée). 133/133.
- 2026-11-10 (it. 591) : panneau de la zone : « Zone 50 : Le Geôlier mécanique garde une relique, Drone stellaire. »
  quand un boss majeur est à 10 zones au plus et sa relique pas encore gagnée (icône ; survol : effet). Pire cas
  (zone 145, Chevalier de l'éclipse) en de, pl, ru à 1280 et 1366 : aucun défilement. Perf du mode mini remesurée
  3 fois : 6,7-7,0 % (le 7,5 % de la revue était du bruit). 132/132.
- 2026-11-10 (it. 590, revue générale) : balance 12 h vs 8c7008a +0,0 ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ;
  crawl es 317 / pl 316 clics sans erreur (avec reliques) ; vidage russe (4 reliques, 3 éditions non lues) : rien
  de nouveau (« attributs » = repère du vidage) ; perf bande 20,0 %, panneau 21,2 %, mini 7,5 %, icône 0,6 % ;
  mémoire 796 Mo stable.
- 2026-11-10 (it. 589) : vérifications sans changement de code : (1) piste d « héros ajoutés trop semblables » :
  déjà traitée (noms propres, greffes de branches, voies mêlées : talents.js) ; (2) cinématique de relique en
  allemand à 1366 px : titre et phrases de l'histoire tiennent dans la bande, l'icône ne chevauche pas le texte.
- 2026-11-10 (it. 588) : mode mini : la Couronne d'étoiles aussi sur le héros (le drone n'y tient pas : encart de
  64 px). Semaine simulée après les baisses du Barde et du Gardien : mage 251, guerrier 263, barde 251 (inchangé).
  132/132.
- 2026-11-10 (it. 587) : « Quoi de neuf » édition 13 (principe h : aucune baisse silencieuse) : barres de vie en
  combat de boss, succès des reliques, baisses du Barde et du Gardien des étoiles. Traduite ; i18n-quotes ok ;
  lang-overflow de, ru, pl, es à 1366 et 1280 : aucun défilement. 132/132.
- 2026-11-10 (it. 586) : équilibrage : le Barde (68 zones en 12 h) : passif or et expérience +25 % → +20 % : 62
  (à +15 % : 61). Texte du passif mis à jour (nouvelle clé, traductions reprises en changeant le nombre). Les 20 héros
  sont maintenant entre 60 et 65 (HEROES=all). 132/132.
- 2026-11-10 (it. 585) : équilibrage : le Gardien des étoiles (À SURVEILLER depuis l'it. 570) faisait 69 zones en
  12 h contre ≈ 62 (HEROES=all) : multiplicateurs 1,25 / 1,2 / 1,2 → 1,15 / 1,1 / 1,12 : 62. Le Barde reste à 68
  (+25 % or et expérience, vitesse +20) : À SURVEILLER (changer son passif = texte à retraduire). 132/132.
- 2026-11-10 (it. 584) : journal : « À vérifier par Victor » complété (9 : boss majeurs et reliques, sons, puissance,
  succès Steamworks ; 10 : barres de vie en combat de boss) ; demande T inscrite (FAIT).
- 2026-11-10 (it. 583) : couronne vérifiée en capture sur 6 classes (mage, nécromancien, samouraï, moine, druide,
  paladin) : bien sur la tête. Deux succès : RELIC_FIRST « Première relique », RELICS_ALL « Les quatre reliques »
  (README : liste Steam à jour ; à créer aussi sur Steamworks). Traduits ; test logique ; lang-overflow pl, de, ru,
  es, pt à 1920, 1366, 1280 : aucun défilement. 132/132.
- 2026-11-10 (it. 582) : reliques portées par le héros, lisibles : la couronne était hors de la tête (cadre de
  l'acteur sans largeur : « left: 50 % » ne centrait pas ; et au-dessus, cachée par les nombres de dégâts) :
  placée en pixels d'après le sprite, posée sur la tête ; cœur et lame en colonne contre son dos (ils se
  mêlaient au drone). Vérifié en capture (4 reliques). 132/132.
- 2026-11-10 (it. 581) : autotest : contrôle de la demande T (combat de boss forcé : barres de vie du héros et du
  boss présentes, dans la bande, sous les pieds). 132/132.
- 2026-11-10 (it. 580, revue générale + demande T) : DEMANDE T de Victor : « on voit pas la barre de vie des bosses
  et la mienne quand j'affronte un boss ». Vérifié en capture : la barre du boss (au-dessus de son grand sprite)
  tombait sous la ligne de son nom en haut de la bande ; celle du héros sous les nombres de dégâts. Contre un boss,
  les deux barres passent sous les pieds, sur le sol (BOSS_BAR_DY, strip.js), celle du boss plus large. La relique
  gardée passe à droite du boss (à gauche, le héros la cachait en combat). FAIT.
  Revue : balance 12 h vs 01a4dfd +0,7 (bruit) ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok ; crawl 317 clics
  sans erreur (en, ru, reliques) ; vidage russe : rien de nouveau ; perf bande 20,1 %, panneau 21,1 %, mini 6,7 % ;
  mémoire 802 Mo stable. 131/131.
- 2026-11-10 (it. 579) : lang-overflow mesure le pire cas des reliques (les quatre gagnées : ligne « Dégâts du drone
  par seconde », en-tête de la carte) ; de, pl, ru, pt, es, fr à 1920, 1366 et 1280 : aucun défilement.
- 2026-11-10 (it. 578) : « Toutes les statistiques » : « Dégâts du drone par seconde » (Drone stellaire gagné ;
  game.droneDps, partagé avec l'estimation hors ligne ; survol : effet de la relique). Traduit. 131/131.
- 2026-11-10 (it. 577) : hors ligne : le Drone stellaire (missiles) et le Cœur de l'aube (dégâts subis) comptent
  dans la progression estimée (applyOffline ; la Lame et la Couronne passaient déjà par heroStats). Test logique. 
- 2026-11-10 (it. 576) : sons des reliques (sound.js) : tir du Drone stellaire (petit lancement discret, 400 ms
  au moins entre deux) et relique gagnée (carillon qui monte, accord tenu, étoiles qui tintent). Ajoutés au
  rendu hors ligne de l'autotest (« son : tous les sons ») : pas de saturation. 131/131.
- 2026-11-10 (it. 575, demande S, 5e partie) : en-tête de la carte : les quatre reliques (grisées tant qu'elles ne
  sont pas gagnées ; survol : effet, puis histoire ou boss et zone qui la garde). « Quoi de neuf » édition 12
  (boss majeurs, reliques, drone). Traduit ; lang-overflow de/pl/ru/pt à 1280 et 1366 : aucun défilement. 131/131.
  Demande S terminée (moteur, bande, carte, cinématiques, panneau, nouveautés).
- 2026-11-10 (it. 574, demande S, 4e partie : histoire) : cinématique « relique » (juice.js) : la relique, son nom et
  son effet, puis son histoire phrase par phrase (scène dorée) ; en arrivant chez un boss majeur, la scène
  d'arrivée du Briseur reprise avec son nom et « Il garde une relique : … » (en plus de la bannière dorée du palier).
  Piège : les pages de toutes les scènes sont construites à chaque appel (une chronique a un data.id) : garde
  RELICS[data.id]. Autotest : contrôle de la scène « relique » ; les contrôles des cinématiques retirent d'abord
  les scènes ouvertes (le palier de zone 100 lance maintenant celle de la Reine). 131/131.
- 2026-11-10 (it. 573, demande S, 3e partie : carte) : les trois boss majeurs sur la carte du Rebord, au bout
  des rangées 1 à 3 (zones 50, 100, 150, comme la forteresse du Briseur en 200) : la relique gardée avec son nom,
  halo violet, puis dorée et « ★ » une fois gagnée ; survol : boss, zone, effet, et l'histoire une fois gagnée.
  Nom aligné loin du chemin qui descend (vérifié en allemand). 130/130.
- 2026-11-10 (it. 572, demande S, 2e partie : bande) : icônes pixel des 4 reliques (shopart.js relicIconURL) ;
  la relique gardée flotte à côté du boss majeur (et du Briseur) tant qu'elle n'est pas gagnée ; le héros porte
  les siennes : drone qui vole près de lui, couronne sur la tête, cœur et lame en petites icônes ; missile bleu du
  drone jusqu'au monstre avec ses dégâts ; bandeau « Relique obtenue : … ! », étincelles. Vérifié en capture. 130/130.
  RESTE : carte (boss majeurs), fenêtre de relique obtenue avec l'histoire, chroniques, « Quoi de neuf ».
- 2026-11-10 (it. 571, demande S, 1re partie : moteur) : game/relics.js : boss majeurs (zone 50 Le Geôlier mécanique,
  100 La Reine des cendres, 150 Le Chevalier de l'éclipse ; PV ×2 à ×2,4, attaque ×1,15-1,2, capacités propres) et
  quatre reliques gagnées en les battant (le Briseur d'Étoiles donne la 4e), gardées pour toujours (S.relics, migrate
  filtre les ids inconnus, gardées à l'ascension) : Drone stellaire (missile toutes les 1,5 s : 1,5 % des PV, 0,4 %
  boss, + 300 % de l'attaque), Cœur de l'aube (dégâts subis −45 %, 1 % PV/s), Lame du crépuscule (attaque ×2,5),
  Couronne d'étoiles (attaque et PV ×2, or +50 %). Histoire de chaque relique. Réglage : à 4 % / ×4 / ×3 la semaine
  simulée bondissait de 186 à ≈ 290 ; réglée : mage 251, guerrier 263 (≈ 15-20 zones par relique). Traduit (19
  textes, noms du Briseur et du Rebord alignés). Test logique ; fuzz 600 ok ; save-fuzz ok. 130/130.
  RESTE (prochaines itérations) : relique visible sur le boss, drone qui suit le héros et tire, effets des autres
  reliques, carte (boss majeurs comme le Briseur), chroniques, fenêtre de relique obtenue, « Quoi de neuf ».
- 2026-11-10 (it. 570, revue générale) : balance 12 h des 20 héros +0,4 ; gardienne des étoiles ≈ 66 sur 4 graines (était
  62,5 à l'it. 490) : Étoile filante perçage 0,6 + ralentissement (au lieu du critique), Chute d'étoile brûlure 0,6 ;
  toujours ≈ 66 (63-69) : écart dû au cumul (compagnon, Grimoire…), À SURVEILLER. Fuzz 1200 ok ; crawl fr / es 321 sans
  erreur ; russe ok ; save-fuzz ok ; perf bande 19,8 %, panneau 21,0 %, mini 6,8 %, icône 0,5 % ; mémoire ≈ 797 Mo.
- 2026-11-10 (it. 569) : recherche des autres estimations sans les sorts : heroDps n'est plus utilisé que par power
  (comparaison d'objets, relative : sans effet). « Toutes les statistiques » du héros : « Dégâts des sorts par seconde »
  (spellDps) quand des sorts de dégâts sont appris. Traduit ; aucun défilement (fenêtre ouverte, ru/de/pl). 130/130.
- 2026-11-10 (it. 568) : BOGUE : le temps hors ligne (applyOffline, formule et non simulation) ignorait les sorts ; un
  joueur qui y avait investi progressait moins hors ligne qu'en jeu. game.spellDps : dégâts moyens des sorts de dégâts
  appris (héros + compagnon à moitié, écho compté, recharge réelle ; sans les autres effets), ajoutés aux dégâts du
  héros dans l'estimation. Test logique. (Les simulations jouent en ligne : équilibrage inchangé.) 130/130.
- 2026-11-10 (it. 567) : répartition du coût de la bande (copies neuves) : base 20,2 % ; sans son/musique/ambiance 16,8 ;
  sans Effets complets 17,5 ; sans météo et jour/nuit 19,1 ; sans ambiance seule 20,2 ; sans effets sonores seuls 19,7.
  Pas de gain facile sans retirer une fonction (les plus gros postes sont déjà des options). Noté dans CLAUDE.md.
- 2026-11-10 (it. 566) : « Quoi de neuf », édition 11 (sorts du compagnon et Grimoire, perçage du boss, badges et
  infobulles des sorts). Traduit ; aucun défilement (ru, de, pl). 130/130.
- 2026-11-10 (it. 565) : « À faire » : « Sort du compagnon à apprendre : X » (débloqué, abordable, pas encore appris ;
  quand le héros n'a plus de sort à apprendre) ; le lien ouvre Sorts et attaque. Traduit ; test logique. 130/130.
- 2026-11-10 (it. 564) : journal : liste « À vérifier par Victor » remise en ordre (ligne orpheline de l'ancien point 7
  supprimée ; point 5 : édition 10).
- 2026-11-10 (it. 563) : carte du héros (Aventure) : l'infobulle des icônes de sorts donne aussi leurs effets (comme
  l'onglet Héros ; spellFxText partagé). Journal : liste « À vérifier par Victor » à jour (sorts, musique). 130/130.
- 2026-11-10 (it. 562) : documentation : repère de la semaine simulée dans CLAUDE.md (it. 561 : mage 186, guerrier 189) ;
  README : Grimoire et sorts du compagnon. 130/130.
- 2026-11-10 (it. 561) : Grimoire des sorts : améliore aussi les sorts du compagnon (même règle : le rang le moins cher
  sous 10 % de l'or, une fois par minute de jeu) ; description mise à jour (9 langues). Balance 12 h +0,1 ; semaine mage
  186 (était 178), guerrier 189 : progression régulière. 130/130.
- 2026-11-10 (it. 560, revue générale) : balance 12 h -0,2 (bruit) ; semaine mage 178 ; fuzz 1200, 0 bloquée ; crawl de
  et zh 320 clics sans erreur ; russe ok ; save-fuzz ok ; perf : bande 20,1 %, panneau 21,4 %, mini 6,7 %, icône 0,8 % ;
  mémoire stable (≈ 800 Mo).
- 2026-11-10 (it. 559) : capture de la ligne des sorts du compagnon (1920 et 1280) : lisible ; « + » abordable en
  couleur d'accent. 130/130.
- 2026-11-10 (it. 558) : Sorts et attaque : les sorts du compagnon (débloqués par la zone record) s'apprennent et
  s'améliorent depuis le héros actuel (« + » à côté de chaque icône, prix et effets en infobulle ; learnSpell accepte la
  classe du compagnon). Le Grimoire, lui, ne s'occupe que des sorts du héros. Test logique ; aucun défilement. 130/130.
- 2026-11-10 (it. 557) : capture : barre du boss percé (75 %, plafond) et d'un monstre de la file : visibles. « Depuis ta
  dernière visite » : « +N rangs de sorts » quand le Grimoire a travaillé pendant l'absence. Traduit (3 pluriels) ; test
  logique. 130/130.
- 2026-11-10 (it. 556) : perçage : le boss, au bout de la file, est touché aussi (R.bossPierced, appliqué à son arrivée,
  plafonné à un quart de sa vie, remis à zéro à chaque nouvelle série) ; sa barre entamée s'affiche. Test logique ;
  balance -0,2 ; fuzz 800 ok. 130/130.
- 2026-11-10 (it. 555) : cartes de l'onglet Héros : l'infobulle de chaque icône de sort donne aussi ses effets propres
  (« Fracas du titan · rang 1 / 50 · étourdit 2 s »), pour choisir son prochain héros. 130/130.
- 2026-11-10 (it. 554) : test : chaque effet de sort appartient à la liste connue et a une valeur positive (une faute
  de frappe serait sinon ignorée sans bruit) ; CLAUDE.md : mesure des sorts des 20 héros. 130/130.
- 2026-11-10 (it. 553) : --overflow-report mesure la page des sorts des 20 héros (pire cas signalé « sorts=N(héros) ») :
  le gladiateur défilait de 6 px en français à 1280 ; cartes de sorts resserrées sous 1366 px (marges, interligne,
  icône 22 px). 10 langues × 3 largeurs × 20 héros : aucun défilement. 130/130.
- 2026-11-10 (it. 552) : icônes des sorts : badge 4×4 du premier effet propre (étoile étourdit, goutte poison, cœur vol
  de vie, flamme brûlure, flèche perçage…) en bas à droite, partout (cartes, carte du héros, bande, mini, quêtes).
  Capture guerrier / assassin. Aucun défilement (10 langues, héros de dev-data ; une carte à deux effets passe sur deux
  lignes : à surveiller pour les autres héros). 130/130.
- 2026-11-10 (it. 551) : vérification en capture des marques d'état sur un monstre normal : classes bien posées, halo du
  héros accéléré visible ; étoiles d'étourdissement peu visibles (monstre derrière le héros) : plus haut (-24 px), plus
  grandes, cerclées de sombre. 130/130.
- 2026-11-10 (it. 550, revue générale) : fuzz 1200, 0 bloquée ; crawl fr 315 et ru 321 sans erreur ; russe ok ;
  save-fuzz ok ; perf : bande 19,6 %, panneau 21,5 %, mini 6,9 %, icône 0,5 % ; mémoire stable (≈ 794 Mo) ; balance
  vue à l'it. 548. « Quoi de neuf », édition 10 (sorts uniques, perçage immédiat sur plusieurs ennemis, effets visibles,
  touche B / menu : musique). Traduit ; aucun défilement. 130/130.
- 2026-11-10 (it. 549) : effets des sorts visibles en combat : monstre étourdi (pâle, ✦ ✦ au-dessus), ralenti (halo
  bleu), affaibli (terne), empoisonné aussi par le poison des sorts ; héros accéléré (halo orangé) ; mots « Étourdi ! »,
  « Écho ! », « Critique ! » au lancer. Correction : la barre de vie d'un monstre de la file blessé par un perçage était
  cachée à chaque image ; elle reste visible jusqu'à son tour. Traduit. Perf bande 19,8 %. 130/130.
- 2026-11-10 (it. 548, demande Q de Victor) : sorts uniques : 6 bases (animation, son, icône) + effets propres à chaque
  sort, 60 combinaisons toutes différentes (test) ; 13 effets : pierce, hits, stun (le monstre n'attaque plus ; boss
  deux fois moins longtemps), slow, weaken (−30 % de dégâts), burn, venom (cumulable), leech, execute (×2 sous X %),
  crit, echo (se relance), haste (attaque ×1,5), cdr, regen (game.spellEffects + boucle de combat). Cartes : effets
  décrits (12 textes, 9 langues). Balance 12 h des 20 héros +0,4 (bruit) ; semaine mage 178 ; fuzz 1200 ok ; aucun
  défilement (10 langues). README. 130/130 ; 178 tests.
- 2026-11-10 (it. 547, demande R de Victor) : perçage refait : au lancer, les monstres suivants de la FILE (visibles sur
  la bande) sont frappés tout de suite (game.pierceAhead : dégâts gardés sur leur place, appliqués à leur arrivée, jamais
  mortels) ; nombre de cibles = 1 + rang/10 (6 au rang 50), ×0,7 de dégâts d'une cible à la suivante ; jamais le boss.
  Bande : trait du monstre combattu jusqu'à chaque cible, anneau, « -X · transpercé » sur elle et sa barre de vie
  entamée (slotHealth). Carte : « transperce N ennemis : X %, puis moins ». Tests réécrits ; balance +0,1 ; fuzz 800 ok ;
  capture ; aucun défilement. 130/130.
- 2026-11-10 (it. 546) : menu de l'icône (clic droit) : case « Musique » (commandes music:on / music:off ; l'état
  suit la touche B et les Réglages). Traduit (main/i18n.js) ; autotest « menu de l'icône : case Musique ». 130/130.
- 2026-11-10 (it. 545) : capture du sort maîtrisé (« ★ maîtrisé », recharge 3 s) : bonne. Touche B du panneau : couper /
  rallumer la musique seule (C coupe tout) ; dans « Raccourcis clavier ». Traduit ; autotest « touche B ». 129/129.
- 2026-11-10 (it. 544) : sort au rang maximal (50) : la carte affiche « ★ maîtrisé » (or des ornements) au lieu de
  « rang maximal » ; en combat, un éclat d'étoiles dorées autour du lanceur (Effets complets). Traduit. 128/128.
- 2026-11-10 (it. 543) : --overflow-report (et lang-overflow) compte aussi les lignes de liste plus larges que leur
  colonne (« onglet-large=N ») : 10 langues × 3 largeurs : aucune. CLAUDE.md à jour.
- 2026-11-10 (it. 542) : autotest « listes : aucune ligne plus large que sa colonne » (11 onglets ; garde la valeur
  sans retour à la ligne de l'it. 541 : une valeur trop longue déborderait sans que le défilement vertical le voie).
  128/128.
- 2026-11-10 (it. 541) : revue en capture (de 1280) de Talents, Ascension, Statistiques, Bestiaire : propre, sauf les
  valeurs des listes « .lines » coupées en deux (« 63,97 / Mrd », « 44 / / 44 ») ; valeur sans retour à la ligne, le
  libellé passe à la ligne. Mesuré : aucune ligne qui déborde (11 onglets, de et ru, 1280 et 1920) ; aucun défilement
  (10 langues). 127/127.
- 2026-11-10 (it. 540, revue générale) : balance 12 h identique (60,4) ; semaine mage 191 ; fuzz 1200, 0 bloquée ;
  crawl pl 315 et ko 320 sans erreur ; russe ok ; save-fuzz ok ; perf (musique active) : bande 20,1 %, panneau 21,3 %,
  mini 6,7 %, icône 0,6 % ; mémoire stable (≈ 795 Mo).
- 2026-11-10 (it. 539) : revue en capture en allemand à 1280 (Boutique, Familiers, Quêtes) : seul défaut, « Eisenbeschlagene
  Truhe » plus large que sa carte ; cartes de boutique : coupure des mots longs (overflow-wrap, hyphens). La barre des
  Familiers déborde à dessein (rangée défilante, fondu au bord : vérifié actif). Aucun défilement. 127/127.
- 2026-11-10 (it. 538) : Réglages, captures (de 1280, fr clair) : la valeur des curseurs de volume (« 100 % ») passait
  à la ligne et débordait de la colonne Son en allemand à 1280 ; valeur sans retour à la ligne, curseur qui rétrécit
  (min-width 0). Ligne d'écoute des airs lisible. Aucun défilement (de, ru, pl, fr). 127/127.
- 2026-11-10 (it. 537) : « Quoi de neuf », édition 9 : ventes automatiques gardées à l'ascension (corrige l'annonce de
  l'édition 5), écoute des airs dans Réglages > Son, couleur des déserts et musique juste dans toutes les langues.
  Traduit ; aucun défilement (ru, de, pl, fr). 127/127.
- 2026-11-10 (it. 536, demande P de Victor « tu peux laisser cocher commun, peu commun et rare après une ascension ») :
  le tri du marchand est gardé à l'ascension (annule l'it. 437) ; l'écran d'Ascension le range dans « Gardé » ; plus
  de message « décochées ». Test logique adapté (À ANNONCER dans la prochaine édition de « Quoi de neuf » : l'édition 5
  disait l'inverse). Aussi : libellé de l'écoute des airs rafraîchi à la fin des 45 s ; autotest : timbres et rythmes
  rendus à travers le volume de la musique, comme en jeu (le rythme lofi frôlait le seuil : 0,21) ; grosse caisse et
  caisse claire lofi un peu plus basses. 127/127 (deux fois).
- 2026-11-10 (it. 535) : écoute des airs : le libellé montre la tranche dont l'air joue (zone en cours, ou tranche
  écoutée pendant les 45 s) ; ◀ ▶ partent de là (avant : « zones 1–5 » au départ, quelle que soit la zone). 127/127.
- 2026-11-10 (it. 534) : Réglages > Son : « Air des zones 1–5 ◀ ▶ » : écoute 45 s de l'air d'une autre tranche, puis
  retour à l'air de la zone en cours (Music.preview / endPreview ; un changement de zone pendant l'écoute est retenu).
  Pour que Victor juge les airs sans changer de zone. Traduit ; autotest « écoute d'un autre air puis retour » ; aucun
  défilement (ru, de, pl, fr). 127/127.
- 2026-11-10 (it. 533) : musique : couleur « sable » pour les déserts (Désert brûlant, Pyramide maudite, Steppe des
  loups, Désert de verre) : gamme orientale (phrygien dominant), cordes / pincé / flûte / marimba, passe-bas 2,3 kHz,
  écho moyen. Plus aucun décor sans couleur. Volumes équilibrés (1,49). 126/126.
- 2026-11-10 (it. 532) : recherche du même bogue ailleurs (logique tirée d'un nom traduit) : aucun autre cas (ambiance
  sonore : WEATHER[z.src], déjà juste ; pluriels des quêtes : français seulement ; objets : noms enregistrés en
  français). Test étendu aux 33 décors (même air avec un nom traduit) ; piège noté dans CLAUDE.md. 126/126.
- 2026-11-10 (it. 531) : BOGUE musique : hors français, translateData traduit ZONES[].name et la couleur du décor (et le
  mode mineur) se lisait dans ce nom : tous les décors tombaient sur « any ». Lu dans le nom d'origine (def.src) ; test
  « même air dans toutes les langues ». Percussions : plus de tranche sans rythme hors décors sombres (la 1re tranche
  n'en avait pas). Volumes : rapport 1,49. Nouveaux extraits envoyés à Victor (zones 1-5, 16-20, 21-25, 26-30). 126/126.
- 2026-11-10 (it. 530, revue générale) : balance 12 h identique à be4df35 (60,4) ; fuzz 1200, 0 bloquée ; crawl fr et ja
  313 clics sans erreur ; russe ok ; save-fuzz ok ; perf (copie neuve, musique lofi active) : bande 19,5 %, panneau
  20,9 %, mini 7,0 %, icône 0,5 % ; mémoire stable (≈ 799 Mo).
- 2026-11-10 (it. 529) : musique légère en économie d'énergie ou sur batterie (music.lite : accords sans la septième,
  pas de craquements de vinyle) ; état batterie gardé sur l'objet musique (applySettings est défini avant onBattery
  dans app.js : y lire onBattery aurait levé une erreur au démarrage). Perf --battery : bande 15,3 %. 126/126.
- 2026-11-10 (it. 528) : coût de la musique lofi mesuré (copies neuves) : bande 22,7 % avec musique, 18,2 % sans (le
  piano électrique : 4 oscillateurs par note, 4 notes par accord). Piano allégé (2 oscillateurs, plus de trémolo) :
  19,9 % avec musique (≈ +1,7 point). Volumes toujours équilibrés. 126/126.
- 2026-11-10 (it. 527) : Héros > Sorts et attaque : ligne « Sorts du compagnon (Rôdeur), à moitié de leur puissance : »
  avec icônes et rangs des sorts appris pour sa classe (ou « aucun appris (apprends-les en jouant ce héros) »). Traduit ;
  aucun défilement (10 langues, 3 largeurs) ; capture. 126/126.
- 2026-11-10 (it. 526) : music.js : Music.scheduleStep, un pas d'air programmé, commun au jeu (pump) et au rendu hors
  ligne (schedulePass) : l'autotest mesure exactement ce que le joueur entend ; le contrôle de la musique rend aussi un
  combat de boss (basse doublée, percussions lourdes) : pas de saturation. Mêmes volumes (rapport 1,74). 126/126.
- 2026-11-10 (it. 525) : « Quoi de neuf », édition 8 (la nouvelle musique lofi, un air toutes les 5 zones ; piano
  électrique, vinyle ; volume dans Réglages > Son, cité tel que traduit). Aucun défilement (ru, de, pl ; 3 largeurs).
  126/126.
- 2026-11-10 (it. 524) : santé du début de partie après les sorts, quêtes et événements récents : first-minutes
  (premier objet 41-77 s, boss 77-86 s, onglet Héros ≈ 12 min) et tab-pace (talents 1, quêtes 5, boutique 8-9, Héros
  10, carte 11-12, bestiaire 14-15, ascension 20-43 min ; zone 22) inchangés. CLAUDE.md : contrôle et écoute de la
  musique. 126/126.
- 2026-11-10 (it. 523) : Music.schedulePass (un passage complet hors ligne, même chaîne passe-bas + écho) ; autotest
  « musique : 8 airs sans saturation, volumes équilibrés » (un air par décor, rapport des volumes moyens < 2,2 ;
  mesuré 1,74). 126/126.
- 2026-11-10 (it. 522) : documentation de la nouvelle musique : README (section « Son » : effets, ambiance, musique lofi
  par tranche de 5 zones) et en-tête de music.js (plus de « chiptune », « 200 airs »). Aucun texte du jeu à reprendre.
  125/125.
- 2026-11-10 (it. 521, demande O de Victor « ça change trop régulièrement : changer de musique toutes les 5 zones ») :
  un air par tranche de 5 zones (musicZone, MUSIC_BLOCK = 5 : celui de la 1re zone de la tranche). Couleur du décor :
  passe-bas (1,7 kHz sombre … 3,6 kHz ciel) et écho doux en croche pointée (fort en mer, au ciel, dans la glace),
  débranché avec l'air (boucle retard-réinjection). Piège du commentaire « // » en milieu de ligne attrapé par
  check-syntax. Test logique ; mémoire stable (≈ 800 Mo). 125/125.
- 2026-11-10 (it. 520, revue générale + demande N de Victor) : revue : balance 12 h -0,3 (bruit) ; semaine mage 191
  (repère 182 : la Marée arcanique et les paliers aident un peu ; progression régulière) ; fuzz 1200, 0 bloquée ; crawl
  fr 313 et ko 318 sans erreur ; russe ok ; save-fuzz ok ; perf : bande 19,3 %, panneau 21,0 %, mini 6,1 %, icône 0,5 %.
  Musique (demande N : « un mélange de Terraria et de Lofi Girl, qui change de zone en zone ») : tempo 68-90, swing des
  contretemps, accords de septième au piano électrique (epiano, façon Rhodes, trémolo lent), grilles jazzy (ii-V-I…),
  percussions boom-bap feutrées (lofi, lofi2), passe-bas 2,6 kHz sur toute la musique, craquements de vinyle ; la
  mélodie garde un timbre par décor (flûte en forêt, cloche dans la glace…), plus aérée. Intermèdes et silences gardés.
  Autotest : rendu hors ligne de chaque timbre et des rythmes (pas de saturation). Mémoire stable (≈ 795 Mo, musique
  active). À ÉCOUTER par Victor.
- 2026-11-10 (it. 519) : README à jour : liste des quêtes (coups au clic, critiques, sorts lancés), Marée arcanique
  parmi les événements, sorts du compagnon dans la description du duo. 125/125.
- 2026-11-10 (it. 518) : vérifié : les succès obtenus restent (S.achievements, earnedAchievements) même quand un ajout
  de contenu relève la barre (« Chasseur d'événements » et la Marée arcanique). « Quoi de neuf », édition 7 (sorts du
  compagnon, Marée arcanique, quête des sorts et cartes de héros, son du trait perçant et bandeau des paliers).
  Traduit ; aucun défilement (ru, de, pl, fr, pt ; 3 largeurs, « Quoi de neuf » au pire cas). 125/125.
- 2026-11-10 (it. 517) : 11e événement rare « Marée arcanique » (30 s, chance 0,002 par victoire, seulement si le héros
  a un sort appris) : recharges des sorts (héros et compagnon) deux fois plus rapides ; son (arpège qui monte), halo
  violet du héros, bandeau. Traduit ; test logique ; son rendu par l'autotest ; fuzz et save-fuzz ok. 177 tests ; 125/125.
- 2026-11-10 (it. 516) : quête « Lancer N sorts » vérifiée en russe (« Применить 25 заклинаний ») ; son icône prend la
  forme et la couleur du premier sort appris du héros (Tourbillon blanc du guerrier…). Crawl ru 320 clics sans
  erreur. 125/125.
- 2026-11-10 (it. 515) : quête « Lancer N sorts » (15 à 30, or + potion, parfois un œuf), proposée seulement si le
  héros a appris un sort ; icône d'éclair ; chaque sort lancé (héros ou compagnon) compte. Traduit (3 pluriels ru/pl) ;
  test logique ; save-fuzz et fuzz ok. 176 tests ; 125/125.
- 2026-11-10 (it. 514) : simulate.js PARTNER_SPELLS=1 (le compagnon a les rangs de sorts du héros : pire cas des
  sorts du compagnon). 12 h, 3 graines : guerrier 59,3 → 60,3 ; mage 60 → 58,7 ; nécromancien 55 → 60 ; barde 60,3 →
  60,7 (≈ +1,2 zone en moyenne) : effet modeste, moitié de puissance gardée. Noté dans CLAUDE.md. 125/125.
- 2026-11-10 (it. 513) : le compagnon du duo lance aussi les sorts appris pour sa classe, à moitié de leur puissance
  (PARTNER_SPELL, spells.js ; recharges à part « p:id », premier lancer après 3/4 de recharge), l'animation part de
  sa position. Expliqué par un ⓘ dans Sorts et attaque (une phrase de plus faisait défiler de 6 px à 1280). Balance
  12 h +0,0 (la simulation ne joue qu'un héros, donc pas de sorts au compagnon : effet réel à juger en jeu) ; fuzz
  600 ok ; test logique. 175 tests ; 125/125.
- 2026-11-10 (it. 512) : test logique du sort perçant (demande L) : à l'arrivée du monstre suivant, il est blessé mais
  vivant, l'événement « pierced » porte le sort (pour le trait coloré de la bande) et les dégâts, la réserve est vidée.
  174 tests ; 125/125.
- 2026-11-10 (it. 511) : autotest « onglets serrés : toutes les icônes restent (1900 → 700 px) » : la barre d'onglets
  est resserrée de 40 en 40 px, chaque palier de fitTabs est traversé (tight, small, slim, compact), aucune icône ne
  doit manquer (garde la demande M). 125/125.
- 2026-11-10 (it. 510, revue générale) : balance 12 h des 20 héros contre b422d71 (avant les paliers de recharge) :
  +0,1 zone (bruit) ; fuzz 1200 parties, 0 bloquée ; crawl fr 313 et pl 318 clics sans erreur ; russe : aucun mot
  latin suspect ; save-fuzz ok ; perf (copie neuve) : bande 19,2 %, panneau 20,7 %, mini 6,1 %, icône 0,4 % ;
  mémoire stable (≈ 795 Mo sur 6 min).
- 2026-11-10 (it. 509) : thème clair, captures des ajouts récents : les icônes blanches (sorts du guerrier) se perdaient
  sur le crème ; jeton --iconsh (contour sombre en clair, aucun en sombre) sur les icônes de sorts (carte du héros,
  cartes de l'onglet Héros, page des sorts). 124/124.
- 2026-11-10 (it. 508) : documentation : README (sorts : paliers de recharge, trait perçant, cartes, record, succès,
  Grimoire) ; CLAUDE.md (--overflow-report mesure « Quoi de neuf », Sorts et Succès ; relancer lang-overflow après
  un succès ; piège du gabarit HTML présent deux fois). 124/124.
- 2026-11-10 (it. 507) : palier de sort franchi (rangs 10, 20… ; aussi par le Grimoire) : bandeau dans la bande
  « Météore : recharge −10 % ! » (couleur du héros). Traduit ; capture. 124/124.
- 2026-11-10 (it. 506) : crawl ja 320 et de 315 clics sans erreur. Son du trait perçant (pierceSound) : sifflement qui
  file puis impact sec ≈ 0,18 s plus tard (le trait vole ≈ 0,2 s) ; ajouté au rendu de tous les sons de l'autotest
  (pas de saturation ; volume voisin de « Tourbillon », à juger à l'oreille). 124/124.
- 2026-11-10 (it. 505) : Héros > Libérés et Prisonniers : chaque carte montre les icônes des trois sorts du héros, à
  droite des boutons (grisées tant qu'ils ne sont pas appris ; infobulle : nom, rang ou « pas encore appris (zone X) »).
  Aide à choisir le prochain héros. Aucun défilement (fr / de / ru / pl, 3 largeurs). Traduit. 124/124.
- 2026-11-10 (it. 504) : contrôle instable « infobulle : pièce de panoplie gardée » (échec « 1 false false » une fois à
  l'it. 501) : cause non trouvée (le sac de dev n'a aucune pièce « hunter ») ; le sac est vidé de ses pièces de panoplie
  avant le contrôle, et un échec affichera désormais l'emplacement, la panoplie portée et l'état « faite ». 4 passages
  à 124/124. Si l'échec revient, lire ce détail.
- 2026-11-10 (it. 503) : mesure des 10 langues à 3 largeurs (lang-overflow, « Quoi de neuf » au pire cas compris) :
  un seul défilement, Statistiques > Succès en polonais à 1920 (3 px, depuis « Grimoire complet ») ; rangées de la
  liste des succès resserrées (écart 4 → 2 px). Plus aucun défilement. 124/124.
- 2026-11-10 (it. 502) : « Quoi de neuf », édition 6 (4 nouveautés : paliers de recharge et fête des sorts, trait
  perçant, sorts sur la carte du héros et dans « À faire maintenant », icônes des onglets et succès « Grimoire
  complet »). Traduit (libellés cités vérifiés par i18n-quotes) ; aucun défilement à 1280 en ru / de / pl. 124/124.
- 2026-11-10 (it. 501) : paliers des sorts : recharge -10 % tous les 10 rangs (rang 50 : moitié ; spellCd, spells.js) ;
  la carte montre la recharge réelle, l'infobulle « Améliorer » annonce la nouvelle au passage d'un palier. Balance 12 h
  -0,3 zone (bruit) ; semaine mage 179 (repère 179-182). Traduit ; test logique. 124/124 (un premier passage à 123 :
  « infobulle : pièce de panoplie gardée » a échoué une fois, sans rapport ; à surveiller s'il revient).
- 2026-11-10 (it. 500, revue générale) : balance 12 h (10 classes) identique à 39107ec (61,0 de moyenne) ; fuzz 1200
  parties, 0 bloquée ; crawl fr 317 et ru 313 clics sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ;
  perf (copie neuve) : bande 18,9 %, panneau 21,6 %, mini 6,0 %, icône 0,5 % ; mémoire stable (≈ 795 Mo sur 6 min).
- 2026-11-10 (it. 499, demande M de Victor) : onglets trop larges : plus de palier « sans icônes » (fitTabs) ; à la
  place, police plus petite puis icônes collées au nom (14 px) ; en dernier recours, icônes seules sauf l'onglet ouvert.
  Mesuré fr / de / ru / pl à 1920, 1366, 1280 : icônes toujours présentes. 124/124.
- 2026-11-10 (it. 498, demande de Victor « que les attaques transpercées atteignent directement la cible ») : à
  l'arrivée du monstre suivant, le trait perçant (couleur du sort) file du héros jusqu'à lui ; à l'impact : anneau,
  étincelles et « -X · transpercé » sur le monstre (avant : le nombre apparaissait seul). Fuzz 600 parties ok. 124/124.
- 2026-11-10 (it. 497) : README, liste des succès à créer dans Steamworks : manquaient SPELLS_1000, SPELLS_ALL3,
  CRITS_10000 ; ajoutés, et un test logique compare désormais cette liste à game/achievements.js. 173 tests ; 124/124.
- 2026-11-10 (it. 496) : succès « Grimoire complet (les trois sorts d'un héros) », avec progression (0 à 3, le meilleur
  héros). Traduit ; test logique ; aucun défilement à 1280 en de / ru / pl. 124/124.
- 2026-11-10 (it. 495) : Statistiques : record du plus gros sort (stats.bestSpell, dégâts d'un lancer) sur la ligne
  « Sorts lancés » (« 6 · record 1,23 T », pas de ligne en plus). Vérifié en russe ; save-fuzz ok. 124/124.
- 2026-11-10 (it. 494) : ligne du compagnon avec les icônes des sorts : le nom de la synergie se réduit à ✦ (infobulle),
  placé juste après le portrait (jamais rogné ; c'est le nom du compagnon qui s'efface au besoin, en de / ru à 1280).
  Captures fr / de / ru. 124/124.
- 2026-11-10 (it. 493) : carte du héros (Aventure) : icônes des sorts appris à droite de la ligne du compagnon (rang et
  nom en infobulle) ; un clic ouvre Héros > Sorts et attaque. (Correction d'un résumé de l'it. 492 : le mode mini ne
  montre « À faire » qu'en infobulle, sans lien ; rien à y faire.) Captures 1920 / 1280. 124/124.
- 2026-11-10 (it. 492) : « À faire » (Aventure, résumé d'absence, mode mini) : « Sort à apprendre : X » quand un sort du
  héros est débloqué, abordable et pas encore appris ; le lien ouvre Héros > Sorts et attaque (data-sec transmis par la
  liste). Traduit ; test logique. 124/124.
- 2026-11-10 (it. 491) : nouveau sort appris (rang 1) : bandeau de fête dans la bande (« Nouveau sort : Météore ! »,
  couleur du héros), icône du sort qui monte au-dessus du héros, étincelles ; en plus de la ritournelle. Traduit ;
  capture. 124/124.
- 2026-11-10 (it. 490, revue générale) : simulations 12 h (graine 7) : rôdeur 54, nécromancien 60, gardienne des
  étoiles 71 ; vérifiés sur 4 graines : rôdeur 60-62, gardienne 60-65, comme avant les sorts (5ed1c8d) : bruit. Fuzz
  1200 parties, 0 bloquée ; crawl fr 313 et pl 318 clics sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ;
  perf (copie neuve, sans sorts) : bande 19,3 %, panneau 21,3 %, mini 6,1 %, icône 0,5 %.
- 2026-11-10 (it. 489) : autotest « sorts : animations des six mécaniques sans erreur » (signal spell pour une
  mécanique de chaque sorte, plus pierced). 124/124.
- 2026-11-10 (it. 488) : sorts : infobulle du bouton Apprendre / Améliorer : l'effet au rang suivant (« Rang 4 : 2 coups
  de 105 % de l'attaque »). Liste « À vérifier par Victor » complétée (sorts). Traduit. 123/123.
- 2026-11-10 (it. 487) : CLAUDE.md : semaine simulée à relancer après tout déblocage qui dépense de l'or tout seul
  (leçon du Grimoire, it. 486) ; repère mis à jour (avec les sorts : 38 → 182).
- 2026-11-10 (it. 486) : le Grimoire des sorts (it. 485) freinait la fin de partie : à chaque victoire, jusqu'à 5 rangs
  à 10 % de l'or chacun : l'or ne s'accumulait plus (semaine mage : plafond 155 au lieu de 176-179). Désormais au plus
  une fois par minute de jeu et 3 rangs (le rythme de la simulation) : semaine 38 → 182, régulière ; balance 12 h
  +0,2 ; fuzz 1200 parties, 0 bloquée. Test logique (une fois par minute). 123/123.
- 2026-11-10 (it. 485) : déblocage « Grimoire des sorts » (zone 45, 3e7 or, icône grimoire violette) : améliore tout
  seul le sort le moins cher du héros tant qu'il coûte moins d'un dixième de l'or (règle de la simulation : balance 12 h
  -0,7, bruit), au plus 5 rangs par victoire ; actif dès l'achat, case pour le couper (settings.autoSpells). Case (ou
  lien vers la boutique) dans le titre de la carte des sorts : la ligne en plus faisait défiler l'onglet (17-20 px en
  de / ru / pl) ; lang-overflow 4 langues : aucun défilement. freshState des tests : spellBook exclu (CLAUDE.md).
  Traduit ; test logique ; save-fuzz ok ; captures. 123/123.
- 2026-11-10 (it. 484) : documentation : README (contenu : les sorts ; organisation : spells.js ; « Ajouter un sort ») ;
  CLAUDE.md : freshState des tests (tous les déblocages sauf armsValet et skyChart), mesure de performance sur une copie
  neuve, coût des sorts.
- 2026-11-10 (it. 483) : mode mini : au lancer d'un sort, son icône apparaît 0,7 s au-dessus du héros et s'efface en
  montant (effet léger, sans les anneaux de la bande). Capture. 123/123.
- 2026-11-10 (it. 482) : sorts dans les Statistiques : compteur stats.spells (ligne « Sorts lancés ») et succès
  « Mage de bataille (1 000 sorts lancés) » avec sa progression. Le 57e succès faisait défiler Statistiques > Succès
  (autotest : 12 px à 1366 ; mesuré : ru 61 px, de 7 px à 1280) : liste resserrée à ≤ 1499 px (colonnes 200 px,
  13 px, interligne 1,2) et ≤ 1365 px (180 px, 12 px) ; --overflow-report mesure désormais ce sous-onglet : 7 langues
  × 1366 / 1280 : aucun défilement. Traduit ; test logique ; save-fuzz ok. 123/123.
- 2026-11-10 (it. 481) : contrôles des sorts : autotest « sorts : trois cartes, « Apprendre » donne le rang 1 »
  (sous-onglet Sorts et attaque, état rétabli après) ; --overflow-report mesure aussi Héros > Sorts et attaque :
  lang-overflow fr / de / ru / pl / pt / es à 1366 et 1280 : aucun défilement. 123/123.
- 2026-11-10 (it. 480, revue générale) : simulations 12 h : guerrier 59, prêtresse 55, artificière 58 ; la prêtresse
  vérifiée (graines 1-3 : 59, 59, 60 ; balance contre l'avant-sorts 5ed1c8d : 60 = 60) : bruit. Fuzz 1200 parties,
  0 bloquée ; crawl 315 clics sans erreur (copie riche en or) ; russe : aucun mot latin suspect ; save-fuzz ok ;
  mem-watch 6 min : 790-797 Mo, stable. Perf mesurée à l'it. 479.
- 2026-11-10 (it. 479, perf des sorts) : mesure sur copies neuves de dev-data (sorts du héros au rang 20 / sans) :
  bande 19,0-19,4 % sans sorts, 22,0-22,2 % avec (première version : 24,1 %). Allégé : plus de drop-shadow (bolt,
  lames, icône), plus d'animations infinies (rotation, pulsation), anneaux à ombre simple, dôme sans dégradé,
  secousse réservée au météore, étincelles divisées par deux. Décomposition : combat + son des sorts ≈ +0,8, nom et
  icône ≈ +0,4, anneaux et formes ≈ +1,5 (rendu logiciel du serveur ; bien moins avec une carte graphique).
  « Effets complets » décoché : sorts sobres (sans anneaux, colonne ni dôme). Leçon : mesurer sur une copie NEUVE à
  chaque essai (une copie réutilisée avance et fausse la comparaison). 122/122.
- 2026-11-10 (it. 478) : sorts : bouton « max » (avec le Manuel du stratège, comme les talents ; affiché dès que deux
  rangs sont abordables) : learnSpellMax achète autant de rangs que l'or permet, une seule ligne au journal (avant,
  ≈ 15 clics pour rattraper un joueur avancé). Libellés repris de l'Atelier (déjà traduits). Test logique ; capture.
  122/122.
- 2026-11-10 (it. 477) : sorts : le prix suivait la zone de déblocage et les rangs plafonnaient à 10 : à la zone 54 de
  Victor (≈ 2e11 or), tout se maximisait d'un coup, sans progression. SPELL_MAX 10 → 50 (prix ×2,5 par rang, +25 %
  de puissance par rang) : ≈ rang 15 avec cet or, puis chaque rang demande de progresser, comme l'Atelier. balance
  12 h : +0,5 (bruit) ; semaine (mage) : 38 → 176 en 71 courses, régulier (repère 179). 122/122.
- 2026-11-10 (it. 476) : découverte des sorts : le premier sort se débloquait en zone 6 alors que l'onglet Héros
  s'ouvre en zone 10 : SPELL_ZONES = [10, 22, 50]. Astuce « spell » (une fois par sort) : un sort du héros actuel
  abordable et pas encore appris ; un clic ouvre Héros > Sorts et attaque (les astuces acceptent maintenant un
  sous-onglet, sec). Test logique ; tab-pace inchangé. Traduit. 122/122.
- 2026-11-10 (it. 475) : « Quoi de neuf », édition 5 (sorts par héros, sorts perçants, bouclier sur la barre et ligne
  du compagnon, Carte du ciel) ; pire cas : 3 dernières éditions = 12 nouveautés, 0 px ; noms cités repris des
  libellés traduits (i18n-quotes : 0). Traduit. 122/122.
- 2026-11-10 (it. 474, demande H : sorts qui transpercent) : mécaniques « éclair » (60 %) et « lames » (50 %)
  perçantes (pierce, spells.js) : une part de leurs dégâts est mise de côté (R.pierce) et frappe le monstre suivant
  dès son apparition (jamais tué d'office : il garde au moins 1 PV ; réserve perdue si le héros tombe) ; le trait
  continue sa course au-delà du monstre et « -N · transpercé » s'affiche à l'arrivée du suivant. Carte du sort :
  « transperce : N % sur l'ennemi suivant ». Test logique ; fuzz 1200 parties, 0 bloquée ; capture. Traduit. 122/122.
- 2026-11-10 (it. 473, demande G : une icône par sort) : shopart.spellIconURL : six dessins pixel (éclair, tourbillon,
  croix de soin, flamme, écu, météore) teintés de la couleur du héros (couleur, sa teinte sombre, éclat blanc) : chaque
  héros a ses trois icônes. Sur les cartes de « Sorts et attaque » et, au lancer, une icône qui monte au-dessus du
  héros avec le nom du sort. Captures. 122/122.
- 2026-11-10 (it. 472, demande I : animations des sorts spectaculaires) : strip.spellFx : nom du sort en grand au-dessus
  du héros, puis par mécanique : éclair zébré pleine hauteur doublé avec flash, secousse et anneau d'impact ; trois
  croissants de lame qui filent ; grosse boule de feu puis explosion (grand anneau, flash, secousse) ; météore avec
  traînée qui tombe en diagonale, double explosion, forte secousse ; colonne de soin et anneau ; dôme de bouclier ;
  dégâts en gros chiffres au moment de l'impact. Éléments à animation CSS (sfxring, sfxspin, sfxdome) dans un
  conteneur déplacé par la bande. Captures (Boule de feu, Météore, Éclair). À voir en jeu. 122/122.
- 2026-11-10 (it. 471, demandes J et K) : J. bouclier visible sur la barre de vie du héros : segment bleu-blanc après
  les PV (Bar.setShield, dom.js), calé au bout s'il dépasse ; vérifié dans le jeu (30 % de bouclier = 11 px sur 36).
  K. onglet Héros : le sous-onglet « Style de combat » devient « Sorts et attaque » (compte des sorts appris) ; les
  sorts passent en premier ; le bloc du bas devient « Style de l'attaque de base » ; bandeau de la bande « Attaque de
  base : Maître ! ». Traduit ; capture. 122/122.
- 2026-11-10 (it. 470, revue générale) : simulations 12 h (sorts achetés) : mage 59, barde 62, druide 59 ; crawl en
  français (313 clics) et en russe (320 clics), copie riche en or pour qu'il achète aussi les sorts : aucune erreur ;
  russe : aucun mot latin suspect ; save-fuzz ok. (Fuzz et équilibrage refaits à l'it. 469 ; perf à l'it. 450.)
- 2026-11-10 (it. 469, demande D : sorts, « différents pour chaque héros ») : game/spells.js : 6 mécaniques (éclair,
  double lame, soin, boule de feu, bouclier, météore) et 3 sorts propres à chacun des 20 héros (60 noms : Tourbillon,
  Cri de ralliement, Fracas du titan pour le guerrier…), débloqués aux zones record 6, 22, 50, appris puis améliorés
  avec de l'or (rangs 1 à 10, +25 % par rang), gardés à l'ascension (S.spells, migrate : inconnus et illisibles
  retirés). En combat, les sorts du héros actuel se lancent tout seuls quand ils sont rechargés (castSpells), en plus
  de l'attaque de base. Animation dans la bande par mécanique (colonne d'éclair, lames, boule de feu, météore qui
  tombe avec secousse, étincelles de soin et de bouclier, dégâts de la couleur du héros) ; son par mécanique (contrôle
  du son de l'autotest). Onglet Héros > Style de combat : carte « Sorts de <héros> » (effet, recharge, rang, Apprendre
  / Améliorer). Simulation : achète les rangs comme l'Atelier ; balance 12 h : +0,0 (puissance modeste, surtout du
  spectacle) ; fuzz 1200 parties, 0 bloquée ; save-fuzz ok. check-comments : nouvelle règle (« clé: valeur, » dans
  un commentaire), après un 4e code avalé pendant cette itération. Traduit (43 clés ; settr.mjs traduit par texte de
  clé). 172 tests, 122/122. À voir en jeu par Victor : animations et sons.
- 2026-11-10 (it. 468, demandes E et F) : E. carte Équipement : « clique un objet » devient « clic sur un objet :
  détails » (« … : détails et forge » avec l'Enclume). F. carte du héros : le compagnon n'est plus une petite
  étiquette coupée dans le titre (« Rang… » même à 1920) mais une ligne à lui sous le titre : portrait 28 px,
  « Compagnon : Rôdeur », et ✦ synergie (son nom à partir de 1500 px, sinon en infobulle) ; un clic mène à l'onglet
  Héros. Traduit ; captures 1920 / 1366 ; lang-overflow 5 langues × 3 largeurs : aucun défilement. 122/122.
- 2026-11-10 (it. 467) : nouveau contrôle scripts/i18n-quotes.mjs (lancé par npm test) : un texte qui cite « un
  libellé » du jeu doit le citer tel qu'il est traduit (erreur faite 3 fois : « Écouter », « Ascension », « Tri du
  marchand »). Un seul cas trouvé dans tout le jeu, en 8 langues : l'aide des Talents citait « max » au lieu du
  libellé du bouton (« máx. », « макс. », « 最大 »…) : corrigé. CLAUDE.md : consigne ajoutée. 122/122.
- 2026-11-10 (it. 466) : astuce (ampoule) « sound » : après 300 victoires, son allumé, elle signale Réglages > Son
  (volumes séparés, « Écouter », touche C) ; un clic ouvre les Réglages. Traduite. Au passage, « Écouter » était mal
  repris en ru / ja / zh / ko dans l'édition 4 du Quoi de neuf (it. 461) : corrigé avec le libellé réel du bouton
  (« Слушай », 「聞いて」, 「聆听」, « 들어 봐 »). 122/122.
- 2026-11-10 (it. 465) : nouveau déblocage « Carte du ciel » (zone 185, 6e21 or, entre le Grand intendant et le
  Creuset perpétuel) : place tout seul les éclats d'étoile dans la constellation la moins chère, rang par rang, après
  chaque ascension et à chaque éclat ramassé (autoConstellations, la règle de la simulation : équilibrage inchangé) ;
  actif dès l'achat, case pour le couper (settings.autoStars, migrate). Une ligne au journal résume les rangs placés.
  Onglet Ascension : les cases Carte du ciel et Astrolabe deviennent case + icône à côté du bouton d'ascension
  (explication en infobulle) : en allemand à 1280 px, la case de l'Astrolabe sortait de la carte. Tests : le
  freshState des tests exclut skyChart (comme armsValet : il change les comptes d'éclats) ; test dédié. Traduit
  (« Sternensplitter », nom déjà employé). save-fuzz ok ; lang-overflow 4 langues : aucun défilement. 122/122.
- 2026-11-10 (it. 464) : gardienne des étoiles, voie 1 (63,8 contre 61,2 sans voie, it. 448) : essai arcane → ombre
  dans son mélange : 63,25 sur les mêmes 4 graines (60-66) : presque rien ne change, l'écart reste dans le bruit.
  Laissée telle quelle (pas de modification sans preuve) ; classée « à surveiller si Victor la trouve trop forte ».
- 2026-11-10 (it. 463) : crawl en russe et en polonais (langues à trois pluriels, Quoi de neuf non lu, tri du marchand
  acheté) : 320 clics chacun, aucune erreur ; pluriels de la nouvelle ligne « … et N nouveautés plus anciennes »
  vérifiés pour 1, 3, 7 et 22 (ru, pl, de, ja) : corrects. CLAUDE.md : crawl dans une langue à trois pluriels de temps
  en temps.
- 2026-11-10 (it. 462) : « Quoi de neuf » borné pour de bon : au plus 3 éditions non lues affichées (newsShown,
  NEWS_MAX_EDITIONS), les plus anciennes comptées dans une ligne « … et N nouveautés plus anciennes. » (pluriels
  traduits, 3 formes ru / pl) ; le pire cas ne grandit plus avec les éditions (11 nouveautés aujourd'hui, au lieu de 23).
  Test logique (rien ne se perd dans le compte) ; autotest 11 / 0 px ; lang-overflow ru / de / pl : aucun défilement.
  122/122.
- 2026-11-10 (it. 461) : « Quoi de neuf », édition 4 (4 nouveautés : sons des pièces qui rentrent et de la gestion,
  musique de boss et silence bande cachée, volumes / « Écouter » / touche C, ascension et tri du marchand). Pire cas
  23 nouveautés : russe 7 px de trop → liste dense resserrée (interligne 1,18, sans marge). Autotest 23 / 0 px ;
  lang-overflow de / ru / pl / pt / es à 1366 et 1280 : aucun défilement. Polonais : « Wniebowstąpienie » (nom déjà
  employé). Traduit. 122/122.
- 2026-11-10 (it. 460, revue générale) : simulations 12 h : paladin 60, lancier 62, gladiatrice 60 ; fuzz 1200
  parties, 0 bloquée ; crawl 319 clics sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; mem-watch 6 min
  à ×10, son et musique actifs : 799-806 Mo, stable (it. 436 : ≈ 790).
- 2026-11-10 (it. 459, son) : la musique s'intensifie pendant un combat de boss (music.boss, posé par spawn, retiré à
  sa chute ou au K.O.) : percussions lourdes même pendant un intermède ou un silence, basse doublée une octave plus
  bas. Essai en jeu : boss → 10 pas joués sans erreur → retour à la normale. À écouter. 122/122.
- 2026-11-10 (it. 458) : nuance de l'it. 455 : une ascension faite par l'Astrolabe (joueur souvent absent) garde le tri
  du marchand (ascend({ auto: true })), sinon personne ne le recocherait et le sac se remplirait d'inutiles ; à la
  main, il repart décoché comme demandé. Test logique. 122/122.
- 2026-11-10 (it. 457) : onglet Ascension, listes Gardé / Perdu à jour : « déblocages et atelier » (gardés, n'y
  figuraient pas) et, si le tri du marchand est acheté, « ventes automatiques (à recocher) » côté perdu (it. 455).
  Traduit ; capture ; lang-overflow fr / de / ru / pl à 1366 et 1280 : aucun défilement. 122/122.
- 2026-11-10 (it. 456, suite de la demande sur l'ascension) : revue de ce que l'ascension garde : à l'inverse du tri du
  marchand, deux commodités sans risque repartaient décochées à chaque course alors que leurs déblocages sont gardés :
  rachat automatique des potions (S.autoPotions) et réclamation automatique des quêtes (quests.auto, Bureau des
  contrats). Gardées. Le creuset (settings.autoTransmute) l'était déjà. Test logique ; la simulation ne les utilise
  pas. 122/122.
- 2026-11-10 (it. 455, demande de Victor : « quand on fait une ascension il faudrait que ça décoche les vendre dès qu'ils
  tombent ») : à l'ascension, le tri du marchand (S.autoSell) repart avec toutes les raretés décochées (le déblocage
  reste acheté) ; une ligne au journal le dit s'il y avait des cases cochées. Traduit ; test logique ; la simulation
  n'utilise pas autoSell (sellUseless) : repères inchangés. 122/122.
- 2026-11-10 (it. 454, son de gestion, suite) : signaux spent (dans pay : tout achat) et learned (learnTalent,
  takeSkill) ; sons : achat = « tchic » de caisse et deux notes qui descendent (au plus toutes les 250 ms : achats
  automatiques et rattrapage hors ligne discrets), point de talent / compétence = petit déclic qui monte (au plus
  toutes les 90 ms). Ajoutés au contrôle du son de l'autotest. 122/122.
- 2026-11-10 (it. 453, son de gestion) : nouveaux signaux equipped (rareté) et soldOne (vente à la main) dans game.js ;
  sons : équiper = cliquetis (bruit filtré, choc grave, tintement plus brillant selon la rareté, au plus toutes les
  120 ms : « équiper le meilleur » ne crépite pas), vendre = deux pièces, vente groupée (aussi automatique) = petite
  cascade au plus toutes les 5 s. Ajoutés au contrôle « son : tous les sons » de l'autotest. 122/122.
- 2026-11-10 (it. 452) : touche C du panneau : couper / rallumer le son (comme le haut-parleur de la bande ; M était
  pris par le mode mini) ; ajoutée à la fenêtre des raccourcis. Contrôle d'autotest ; lang-overflow fr / de / ru / pl à
  1366 et 1280 : aucun défilement. Traduit. 122/122.
- 2026-11-10 (it. 451, bon voisin) : quand la bande est cachée (jeu ou vidéo en plein écran, mode icône seule, session
  verrouillée : signal visibility false), musique et effets continuaient. Sound.setPaused : contexte audio suspendu,
  aucun nouveau son ; reprise quand la bande revient (setVisible). Essai en jeu : suspended puis running. 121/121.
- 2026-11-10 (it. 450, revue générale) : simulations 12 h (voie prise) : rôdeur 59, chaman 63, artificière 62 ; crawl
  312 clics sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; perf : bande 18,9 %, panneau 21,4 %,
  mini 6,0 %, icône 3,1 % (stables).
- 2026-11-10 (it. 449) : semaine simulée (mage) avec la voie désormais prise par simulate.js : 76 courses, records
  38 → 57 → 71 → 83 → 111 → 132 → 155 → 179, progression régulière sans plafond (repère précédent 38 → 175) ; 20
  déblocages, le dernier (steward) à 8 493 min. CLAUDE.md : repère mis à jour (it. 449).
- 2026-11-10 (it. 448) : simulate.js prend une voie de talents dès qu'elle est permise (VOIE=0 par défaut, 1, ou none
  pour l'ancien comportement), pour mesurer les voies mêlées de l'it. 429. 20 héros × 3 réglages (12 h, graine 7) :
  moyenne sans voie 61,0, voie 0 60,4, voie 1 60,9 ; héros ajoutés 60,9 contre leurs modèles 60,6 : équilibré. Vérifié
  sur 4 graines : chaman voie 1 60,5 (sans voie 61,0), gardienne des étoiles voie 1 63,8 (sans 61,2 : un peu forte,
  à surveiller), druide voie 1 56,8 (sans 59,8). CLAUDE.md : VOIE documenté. 121/121 (autotest non concerné).
- 2026-11-10 (it. 447) : contrôle d'autotest permanent du son (jusque-là, seulement des essais temporaires) : rendu hors
  ligne des coups des 9 armes, pièces, 10 événements et un inconnu, 11 ambiances de zone (jour et nuit), oiseau,
  ambiance d'événement, 9 sons de play() ; échec sur erreur, NaN ou pic > 0,2. window.__sound exposé en dev.
  CLAUDE.md : ajouter tout nouveau son à cette liste. 121/121.
- 2026-11-10 (it. 446) : bouton « Écouter » (Réglages > Son) : au lieu du seul son légendaire, un échantillon pour
  régler les curseurs à l'oreille : un coup de l'arme du héros avec la cascade de pièces d'une victoire, un coup
  critique, puis un son de l'ambiance de la zone actuelle (jour / nuit) par son bus (Sound.sample ; zoneSounds accepte
  force). Essai en jeu : bouton cliqué, ambiance jouée, aucune erreur. 120/120.
- 2026-11-10 (it. 445) : rythme du début vérifié après les nouveautés (quête des critiques, Voile protecteur dès la
  zone 1, sons) : early-pace à 60 min : zone 23, 109 objets, niveau 39, 6 déblocages (repère 23 / 107 / 39 / 6) ;
  first-minutes : premier objet 41-77 s, premier boss 77-86 s ; tab-pace : talents 1, quêtes 5, boutique 8-9,
  héros 10, carte 11-12, bestiaire 14-15 min (inchangé). Mac et plein écran : rien à coder a priori (une application
  en plein écran a son propre espace macOS, où la bande « toujours au premier plan » n'apparaît pas sans
  visibleOnFullScreen) : à confirmer par Victor.
- 2026-11-10 (it. 444, Mac) : menu de l'icône : la case « Se cacher devant les jeux et vidéos en plein écran »
  n'apparaît que sous Windows (la détection, fullscreen-watch.js, n'existe que là : ailleurs elle ne faisait rien).
  Infobulle du bouton « Réduire en icône » du mode mini : « (barre des menus) » sur Mac. Traduit. 120/120.
- 2026-11-10 (it. 443, Mac) : les textes qui nommaient Windows ont leur version Mac (détection navigator.platform) :
  thème « Automatique (macOS) », « Lancer à l'ouverture de session du Mac » (Réglages et menu de l'icône,
  loginMac dans main/i18n.js), note « … l'icône Sillwalker de la barre des menus, en haut de l'écran ». Traduits.
  Non vérifiable sur le serveur (Linux) : à voir par Victor sur son Mac. 120/120.
- 2026-11-10 (it. 442, suite de la demande C) : 13 moments muets ont un son, limités dans le temps : esquive (souffle
  qui monte), esquive du boss (qui descend), riposte (clac métallique), coup annoncé du boss (deux bips), potion
  (glouglou), second souffle (cœur qui bat, puis élan), retour au combat, œuf (coquille, puis surprise), éclat
  d'étoile, familier qui grandit, transmutation (tourbillon), récompense du jour, gobelin qui s'enfuit. Laissés muets
  (trop fréquents) : bouclier, vente, serviteur. Correctif : throttle bloquait un son jamais joué pendant les premières
  secondes après le lancement (comparaison au temps 0). Rendu hors ligne : 0,005-0,029, aucun NaN. 120/120.
- 2026-11-10 (it. 441) : volumes séparés pour régler la refonte du son à l'oreille (Victor écoute en ce moment) :
  curseurs « Ambiance » (sous la case Ambiance des zones) et « Musique » (sous Musique de fond), 0 à 200 % du niveau
  d'origine ; « Volume » devient « Volume général ». settings.musicVol / ambVol (migrate : borné 0-2, illisible → 1) ;
  Sound.setAmbience (bus de gain dédié, l'ambiance et les oiseaux y passent), Music.setLevel (appliqué tout de suite).
  Essai en jeu : ambiance ×2 = pic ×2, 0 % = silence. Traduit ; aucun défilement (5 langues × 3 largeurs) ; save-fuzz
  ok ; capture. 120/120.
- 2026-11-10 (it. 440, revue générale) : simulations 12 h : guerrier 60, barde 59, gardienne des étoiles 62 ; fuzz
  1200 parties, 0 bloquée ; crawl 310 clics sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; perf et
  mémoire mesurées à l'it. 436 (inchangées).
- 2026-11-10 (it. 439, demande de Victor : « un son pour chaque pièce qui rentre dans notre inventaire ») : chaque pièce
  animée qui atteint le compteur d'or émet coinIn (juice.js) ; Sound.coinIn : tintement bref et clair, un demi-ton plus
  haut à chaque pièce d'une même rafale (jusqu'à 14), plus rond pour une grosse pièce ; au plus un toutes les 28 ms.
  Le tintement de la victoire s'efface quand des pièces volent (il reste en mode mini, effets réduits, bande cachée).
  Essai en jeu : 3 victoires = 102 pièces rentrées, aucune erreur ; rendu hors ligne sans NaN. À écouter. 120/120.
- 2026-11-10 (it. 438) : « Quoi de neuf », édition 3 (4 nouveautés : son des pièces / coups / événements, ambiance des
  zones et musique qui évolue, Voile protecteur et voies des héros ajoutés, réglages de la bande et de l'ambiance).
  Pire cas (aucune édition lue : 19 nouveautés) : 16 px de trop ; au-delà de 14 nouveautés, liste « dense » (fenêtre
  1000 px, 12 px). Autotest : 19 nouveautés, 0 px ; lang-overflow de / ru / pl / pt / es à 1366 et 1280 : aucun
  défilement. Traduit. 120/120.
- 2026-11-10 (it. 437, retour de Victor : « le bruit des oiseaux est trop ressemblant au critique et trop récurrent ») :
  les oiseaux étaient des notes sinus vers 2 600 Hz qui montaient (comme le « shing » du critique), toutes les 2-3 s.
  birdCall : trille de 5 à 8 notes très brèves ou gazouillis vibré (modulation 28-38 Hz) qui DESCEND, vers 3 000-3 900 Hz ;
  4 fois plus rare (≈ 8 s en forêt, 14 s en prairie). Rendu : 0,003 (critique 0,023). 120/120.
- 2026-11-10 (it. 436) : contrôle après la refonte du son (nœuds audio créés plusieurs fois par seconde pour
  l'ambiance) : mem-watch 8 min à ×10, son et musique actifs : 788-796 Mo, stable (repère ≈ 780) ; perf : bande 18,7 %,
  panneau 21,5 %, mini 5,9 %, icône 3,1 % (inchangé). Liste « À vérifier par Victor » complétée (son, Mac).
- 2026-11-10 (it. 435, demande C, étape 4/4 : musique moins répétitive) : avant, l'air d'une zone (8 mesures, ≈ 20 s)
  bouclait sans fin. songFor(zone, passage) : le passage 0 est l'air d'avant (identique) ; les suivants gardent le
  motif A (on reconnaît la zone) et tirent un nouveau pont, une nouvelle fin, parfois un autre instrument du décor,
  d'autres percussions, une octave plus haut, la tierce ajoutée ou retirée ; intermède calme au 4e passage (basse et
  cloche sur les temps forts, sans percussions) ; un passage de silence tous les 8 (≈ 20 s pour respirer). Graine
  zone + passage : toujours la même suite pour une zone. Music.pump change de passage à chaque début de boucle (même
  tempo). Test logique (40 zones : motif gardé, 40 / 40 varient, intermède, silence) ; essai dans le jeu en forçant
  les passages : enchaînement sans erreur. À écouter par Victor. 120/120. Demande C : les 4 étapes sont faites.
- 2026-11-10 (it. 434, demande C, étape 3/4 : ambiance des zones) : zoneAmbience (sound.js), 4 tirages par seconde,
  selon la météo de la zone (WEATHER, exporté de juice.js) : bulles en grappe (récifs, lagon, cité engloutie), gouttes
  avec écho (égouts, grotte), vent froid (neige), vent sec (désert, steppe), braises qui crépitent et grondement
  (volcans), coassements et bulles de vase (marais, champignons), carillons lointains (ruines célestes, cristal,
  néant), écho métallique et battement grave (cryptes, mines, bastion), cris d'oiseaux de mer et bourrasques (côte,
  nids, tempêtes), gazouillis (forêts, prairies) le jour et grillons la nuit (21 h-6 h, sauf cycle jour / nuit coupé).
  Case « Ambiance des zones » (Réglages > Son, active par défaut, settings.zoneAmbience, migrate). Rendu hors ligne :
  aucun NaN ; niveaux 0,001-0,008 (effets ≈ 0,02 : un fond). Traduit ; aucun défilement (5 langues, 1366 / 1280) ;
  save-fuzz ok. À écouter par Victor. 120/120.
- 2026-11-10 (it. 433, demande C, étape 2/4 : événements) : chaque événement rare a sa signature sonore (eventSound) :
  rafale (souffle filtré qui passe), averse de pièces, roulement qui accélère (Frénésie), corne qui déborde, accord
  doux (Sagesse), cri du faucon, éclats cristallins, petite fanfare (Zèle), pépiements (Nichée), voile qui se lève.
  Ambiance pendant l'événement (eventAmbience, 4 fois par seconde, aléatoire) : pièces qui tintent (pluie d'or),
  bourrasques (vent), tintements (éclats), pépiements (Nichée). Étoile filante : sifflement qui descend à son passage,
  deux notes qui tombent si elle s'échappe, cascade de pièces quand on l'attrape. Nouveaux outils : whoosh() (bruit
  dont le filtre glisse), noise() filtrable. Rendu hors ligne : aucun NaN ; niveaux 0,014-0,027 (ancien carillon
  0,026), ambiance 0,007. À écouter par Victor. 120/120.
- 2026-11-10 (it. 432, demande C, étape 1/4 : pièces et coups) : pièces : tintement métallique (fondamentale + partiel
  inharmonique ×2,76) qui monte d'un cran à chaque victoire enchaînée (gamme pentatonique qui monte puis redescend,
  repart du bas après 4 s de pause) ; cascade de 3 pièces pour une élite, 5 pour un boss. Coups : bruit filtré
  (passe-bande de couleur tirée à chaque coup), volume et durée variables, l'un de trois gestes par arme (simple,
  appuyé avec souffle d'élan, bref) jamais deux fois de suite ; critique : « shing » clair qui monte. Vérifié par rendu
  hors ligne (OfflineAudioContext, 8 tirages par son) : aucun NaN, pics au niveau d'avant (coups 0,015-0,041 ;
  pièce baissée à 0,020 car jouée à chaque victoire). À écouter par Victor. 120/120. Suite : événements, ambiance des
  zones, musique.
- 2026-11-10 (it. 431, demandes A et B) : A. macOS : app.dock.hide() avant le démarrage (plus d'icône dans le Dock,
  aussi avec npm start ; le jeu se pilote par la bande, le panneau et l'icône de la barre des menus) ; à vérifier par
  Victor sur son Mac. B. Mode mini : l'ampoule des astuces était sous le bouton son (3 boutons depuis le son) : elle
  descend sur la ligne de l'or, à droite ; la ligne du niveau réserve la place des 3 boutons. Capture. 120/120.
- 2026-11-10 (it. 430, revue générale) : simulations 12 h : mage 60, paladin 62, cryomancienne 60 ; crawl 309 clics sans
  erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; perf : bande 19,0 %, panneau 19,9 %, mini 6,0 %, icône 3,0 %.
- 2026-11-10 (it. 429 bis, question de Victor : « pourquoi sur mon mac j'ai pas les infos au milieu comme sur mon grand
  écran ? ») : la disposition au milieu (demande 21) ne s'activait qu'à partir de 2400 px (CENTER_HUD_W) ; un Mac fait
  1440-1728 px. Nouveau réglage Réglages > Fenêtre > « Informations de la bande » : Aux bords / Au milieu / Automatique
  (très grands écrans, par défaut : rien ne change sans le choisir). settings.hudPos (migrate : valeur inconnue → auto),
  événement sillwalker-hudpos (la bande se redispose tout de suite). Placé dans la carte Fenêtre (dans Affichage il
  faisait défiler l'onglet de 34 à 81 px). Traduit (mêmes mots que « la bande » dans chaque langue) ; lang-overflow
  8 langues × 3 largeurs : aucun défilement ; capture à 1440 px ; contrôle d'autotest ; save-fuzz ok. 120/120.
- 2026-11-10 (it. 429) : idée d (héros trop semblables) : les voies des 10 héros ajoutés ne sont plus des copies de
  leurs modèles : chacune mêle à parts égales deux voies existantes choisies pour le thème (VOIE_BLENDS, talents.js :
  cryomancienne cristal = critiques + frappe tous les 4 coups ; barde ballade = esquive + bouclier…). Identifiants
  inchangés (sauvegardes intactes). La simulation n'apprend pas les voies (simulate.js ne prend que les branches) :
  balance HEROES=all identique (+0,0), ce changement n'y est pas mesurable ; valeurs reprises de voies déjà
  équilibrées. Thème clair des fenêtres de l'Aventure vérifié en capture. 119/119.
- 2026-11-10 (it. 428) : les succès étaient recalculés en direct : le 10e événement (Voile protecteur) retirait
  « Chasseur d'événements » à qui l'avait (de même pour les collections quand des objets s'ajoutent). L'onglet
  Statistiques compte maintenant aussi les succès déjà obtenus (S.achievements, identifiants inconnus ignorés) :
  earnedAchievements. Test logique. 119/119.
- 2026-11-10 (it. 427) : 10e événement rare, « Voile protecteur » (30 s, dégâts subis divisés par deux, chance 0,002) :
  le premier défensif, utile contre un boss coriace ; halo bleu pâle sur le héros (.actor.ward). « Égide » était déjà
  un talent : nom distinct. Ajouté en fin de liste (ordre du tirage inchangé pour les autres). Traduit, test logique
  (marge pour l'écart ±15 % des coups) ; fuzz 1200 parties, 0 bloquée ; balance +0,7 (bruit) ; capture. 119/119.
  Idée d (voies des héros ajoutés identiques à leurs modèles) : laissée, chantier d'équilibrage plus lourd.
- 2026-11-10 (it. 426) : « Quoi de neuf » par éditions (NEWS_EDITIONS ; NEWS_ID = leur nombre) : le joueur voit toutes
  celles qu'il n'a pas lues, la plus récente d'abord (newsItems(seen)) ; rien ne se perd s'il en a sauté une. Édition 2
  publiée (3 nouveautés : fenêtres de l'Aventure, quête des critiques et Lame affûtée, Tenace), traduite avec les noms
  de section déjà affichés. Pire cas (15 nouveautés réunies) : sans défilement (autotest, lang-overflow de / ru / pt à
  1366 et 1280). Captures : « Il se relève ! » au-dessus du boss, carte Tenace du Bestiaire à 1366. Test logique. 119/119.
- 2026-11-10 (it. 425) : 12e capacité de boss, « Tenace » : une fois par combat, le boss se relève avec 25 % de ses PV
  quand il devrait tomber (brûlure et poison s'éteignent) ; libellé « Il se relève ! », secousse, étincelles et son
  (grondement qui remonte). Interceptée au début de killMonster (tous les chemins de mort). ORDER passe à 12 : les
  capacités changent de zone (zone 12 : Tenace). Traduite, test logique ; fuzz 1200 parties, 0 bloquée ; balance 12 h
  -0,9 zone (bruit). 119/119. « Quoi de neuf » : édition 2 à publier quand les nouveautés seront assez nombreuses
  (fenêtres de l'Aventure, quête des critiques, Lame affûtée, Tenace), sans retirer l'édition 1 à qui ne l'a pas vue.
- 2026-11-10 (it. 424) : compteur des coups critiques (stats.crits, lu avec +x || 0 : sauvegarde abîmée tolérée),
  ligne « Coups critiques » dans Statistiques et succès « Lame affûtée (10 000 coups critiques) » avec sa progression.
  Traduits (i18n-check 0), test logique, save-fuzz ok, lang-overflow de / ru / pl à 1366 et 1280 : aucun défilement. 119/119.
- 2026-11-10 (it. 423) : nouvelle quête « Porter {n} coups critiques » (40 à 80 × étoiles ; or, potion, parfois un œuf),
  proposée seulement si le héros a au moins 8 % de critique hors élixirs (5 % de base pour la plupart : il faut
  l'équipement ou les talents), icône de dague. Traduite (9 langues, i18n-check 0), test logique ; simulation 12 h
  assassin : 14 quêtes de critiques réclamées. 119/119.
- 2026-11-10 (it. 422) : autotest : la bulle « Nouvelle chronique » (événement chronicle émis) ouvre au clic la fenêtre
  Chroniques, sans déplier la section. 119/119.
- 2026-11-10 (it. 421) : bulle « Nouvelle chronique » : son clic dépliait encore la section Chroniques sur place (défilement
  de l'onglet) ; il ouvre maintenant la fenêtre Chroniques (panel.showDetails). 118/118.
- 2026-11-10 (it. 420, revue générale) : simulations 12 h : guerrier 60, nécromancien 63, prêtresse 59 ; crawl 306 clics
  sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; perf : bande 19,3 %, panneau 20,2 %, mini 6,3 %,
  icône 3,0 % d'un cœur (stables).
- 2026-11-10 (it. 419) : CLAUDE.md, pièges connus : les contrôles de défilement mesurent les sections repliées ; une
  section qui grandit s'ouvre dans la fenêtre large (MODAL_DETAILS / showDetails).
- 2026-11-10 (it. 418) : --overflow-report mesure aussi les quatre sections de l'Aventure ouvertes en fenêtre ;
  lang-overflow fr / de / ru / pt / pl à 1920 et 1366 : aucun défilement. 118/118.
- 2026-11-10 (it. 417) : autotest : chaque section repliable de l'Aventure s'ouvre en fenêtre, sans défilement et sans se
  déplier sur place. Il a trouvé « Toutes les statistiques » à 13 px de trop : en fenêtre, la liste (dl.stats) passe
  à deux paires libellé / valeur par ligne (moitié moins haute). Capture, 118/118.
- 2026-11-10 (it. 416) : les sections repliables de l'Aventure (À faire, Chroniques, Toutes les statistiques, Chances de
  butin) faisaient défiler l'onglet une fois dépliées (92 à 465 px) : un clic sur leur titre les ouvre maintenant dans
  la fenêtre large, listes sur deux colonnes (panel.showDetails, MODAL_DETAILS) ; leurs boutons et liens restent actifs
  et referment la fenêtre ; ouvertes par le code (autotest), elles se déplient comme avant. Carte du héros : l'étiquette
  du compagnon n'a plus le cadre de bouton et « niveau N » tient sur une ligne. lang-overflow fr / de / ru aux 3 largeurs :
  aucun défilement. 117/117.
- 2026-11-10 (it. 415) : la liste des raccourcis clavier, dépliée dans les Réglages, faisait défiler l'onglet (93 px à
  1920, 190 en russe à 1366). Remplacée par un bouton « Voir les raccourcis » qui ouvre une fenêtre large sur deux
  colonnes (panel.showKeys, comme « Quoi de neuf ») : sans défilement en russe à 1366. Traduction russe corrigée :
  « Changer d'onglet » = « Смена вкладки » (était « Смена карты »). 1 texte × 9 langues, 117/117.
- 2026-11-10 (it. 414) : autotest : la touche S range le sac (sac mélangé puis panel.onKey). 117/117.
- 2026-11-10 (it. 413) : raccourci clavier S (panneau ouvert) : ranger le sac, comme le bouton ⇅ ; ajouté à la liste
  des raccourcis (Réglages). Touche libre vérifiée. 1 texte × 9 langues, 116/116.
- 2026-11-10 (it. 412, inventaire, étude des concurrents) : bouton ⇅ dans le titre du sac (un clic) : range les objets,
  améliorations (▲) d'abord, puis rareté et niveau décroissants (game.js > sortBag). Test, contrôle d'autotest, capture,
  sans défilement (fr / ru / de, 1366 / 1280), 1 texte × 9 langues. 116/116.
- 2026-11-10 (it. 411) : « Quoi de neuf » : 12e ligne (Bibliothèque de l'Atelier, constellation L'Éclair, quête
  « Frapper au clic ») ; lang-overflow : aucune fenêtre ni onglet ne défile dans les 10 langues à 1366 px. 1 texte ×
  9 langues, 115/115.
- 2026-11-10 (it. 410, revue générale) : simulations 12 h (Atelier acheté) : rôdeur 58, barde 60, gladiateur 63 ; crawl
  304 clics sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; fuzz 1200 parties, 0 bloquée ; perf : bande
  19,0 %, panneau 21,1 %, mini 6,3 %, icône 2,8 % d'un cœur (stables).
- 2026-11-10 (it. 409) : 17e constellation « L'Éclair » (prestige.js > c_bolt : +2 % de vitesse d'attaque par rang,
  10 rangs, 10 éclats × rang ; icône éclair jaune, shopart.js) : la vitesse d'attaque n'avait pas de constellation.
  balance.mjs 12 h : −1,0 (bruit) ; sans défilement en fr / de / ru à 1366 et 1280 ; 1 texte × 9 langues, 115/115.
- 2026-11-10 (it. 408) : partie neuve vérifiée en capture (8 s et 45 s) après les derniers ajouts : bande sobre, ni
  « Quoi de neuf », ni bulle ni bannière en trop ; le premier boss attend en bout de zone. Rien à corriger.
- 2026-11-10 (it. 407, simulation réaliste) : simulate.js n'achetait jamais l'Atelier (records sous-estimés) ; il achète
  maintenant le niveau le moins cher tant qu'il coûte moins de 10 % de l'or, après les déblocages. balance.mjs 12 h :
  59,3 → 61,6 (+2,3) ; semaine (mage) : 38 → 62 → 99 → 131 → 175 (repère précédent ≈ 164), régulière. Nouveaux repères
  notés dans CLAUDE.md. Le jeu lui-même n'a pas changé.
- 2026-11-10 (it. 406) : 5e amélioration de l'Atelier « Bibliothèque » (shop.js > ws_xp : +4 % d'expérience par niveau,
  400 or, ×1,5 par niveau ; icône livre bleu ws_xp). Description de l'Atelier (boutique, déblocage) complétée
  (« …or, expérience, vitesse »). Sous-onglet Atelier sans défilement à 1366 / 1280 en français et russe. 3 textes ×
  9 langues, 115/115.
- 2026-11-10 (it. 405) : quête « Frapper au clic » : icône propre (gantelet) au lieu de l'épée de « Vaincre des
  monstres ». Autotest fiabilisé : le contrôle « pièce de panoplie gardée expliquée » a échoué une fois (1 false false) :
  la recherche d'un emplacement sans panoplie pouvait échouer quand les contrôles précédents en avaient posé partout ;
  les panoplies des autres emplacements sont retirées avant la recherche. Capture, 115/115 (deux passes).
- 2026-11-10 (it. 404) : la quête « Frapper au clic » n'est proposée qu'aux joueurs qui ont déjà frappé au clic
  (stats.taps > 0) : un joueur 100 % inactif n'a pas de quête qui traîne (sinon : « Changer » contre de l'or). Test.
  115/115.
- 2026-11-10 (it. 403) : 12e type de quête « Frapper N fois au clic » (quests.js > tap, 20 à 40 coups, poids 1,
  récompense or + 2 potions) : la seule quête qui récompense le jeu actif, jamais obligatoire. Comptée dans
  game.js > tapMonster. Test, 1 texte × 9 langues (pluriels), save-fuzz ok, 115/115.
- 2026-11-10 (it. 402) : quand la pureté annule une Malédiction, la bande l'affiche (« Malédiction repoussée ! », bleu
  pâle) avec un tintement clair (game.js émet bossSkill « curseBlocked »). Test, 1 texte × 9 langues, 115/115.
- 2026-11-10 (it. 401) : le mage revenait à 56 dans les revues (graine 7 par défaut) : sur 5 graines (SEED=1..5,
  balance.mjs 12 h) il fait 61 / 60 / 58 / 59 / 60, moyenne 59,6, dans la norme. Paladin ≈ 62 (un peu fort, acceptable).
  Rien changé. Leçon : juger un héros isolé sur plusieurs graines (SEED est transmis à balance.mjs).
- 2026-11-10 (it. 400, revue générale) : équilibrage des 20 héros en 12 h (HEROES=all) : moyenne 59,4, de 56 (mage) à
  63 (paladin, gardien des étoiles) ; crawl 302 clics sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ;
  perf : bande 20,7 %, panneau 21,7 %, mini 6,4 %, icône 3,2 % d'un cœur (fourchette habituelle).
- 2026-11-10 (it. 399) : balance.mjs accepte HEROES=all (les 20 héros) ou une liste. Les 10 nouveaux héros en 12 h :
  moyenne 59,5 (arbalétrier 59, lancier 58, prêtresse 57, gladiateur 62, chaman 61, danseuse 59, cryomancienne 57,
  barde 60, gardien 63, artificière 59), contre 59,1 pour les 10 de départ : équilibrés.
- 2026-11-10 (it. 398) : --overflow-report (donc lang-overflow.mjs) mesure aussi la fenêtre « Quoi de neuf »
  (« news=N » si elle défile) ; les 10 langues à 1366 px : aucun défilement. 115/115.
- 2026-11-10 (it. 397) : « Quoi de neuf » : 11e ligne (Phalène pâle, capacités annoncées à l'arrivée d'un boss, coup de
  pouce contre la Malédiction) ; liste resserrée (13 px) : sans défilement en allemand et russe à 1920 / 1366 px.
  1 texte × 9 langues, 115/115.
- 2026-11-10 (it. 396) : onglet Ascension : sous « Héros de la prochaine aventure », le compagnon gardé à l'ascension
  (nextPartner, sinon l'actuel, s'il reste compatible) et « ✦ duo idéal » quand c'est le cas. Capture, défilement
  vérifié en allemand et russe, 1 texte × 9 langues, 115/115.
- 2026-11-10 (it. 395) : arrivée d'un boss dans la bande : sous la bannière « … approche ! », une petite bannière liste
  ses capacités (« Peau de pierre · Coup dévastateur »), noms traduits (BOSS_MECHANICS). Capture, 115/115.
- 2026-11-10 (it. 394) : fuzz élargi après les ajouts de combat (Malédiction, Talisman, Porte-talisman, coup de pouce,
  Nichée, Zèle, Phalène) : 300 graines, 6 000 parties neuves, 0 bloquée.
- 2026-11-10 (it. 393, anti-frustration) : bloqué (3 défaites ou plus) par un boss qui maudit et sans Talisman de pureté
  en main, le prochain objet légendaire porte ce pouvoir une fois sur deux (game.js > decorate) ; sinon tirage normal
  (1 / 17). Test (≥ 30 % bloqué, < 20 % sinon). 115/115.
- 2026-11-10 (it. 392) : outil scripts/lang-overflow.mjs (option dev --overflow-report) : défilement de chaque onglet
  dans les 10 langues à 1920 / 1366 / 1280 px (copies de dev-data, ≈ 4 min). Trouvé et corrigé : portugais 1280,
  Aventure 9 px (sous-titre de la carte Équipement sur une ligne sous 1500 px). Désormais : aucun défilement nulle part.
  CLAUDE.md : outil ajouté. 115/115.
- 2026-11-10 (it. 391, langues aux mots longs) : défilement mesuré en allemand, russe et japonais (1920 / 1366 / 1280) :
  1920 et le japonais sans défilement ; corrigé : russe Aventure 47 (notes de la carte Zone resserrées jusqu'à 1499 px)
  et Statistiques 31 (lignes de chiffres en 12 px sous 1500 px), russe Talents 20 à 1280 (sous-titre des Maîtrises sur
  une ligne), allemand Statistiques 11 / Réglages 8 (Réglages en 13 px sous 1500 px). Tout à 0. 115/115.
- 2026-11-10 (it. 390, revue générale) : simulations 12 h : druide 55, chaman 59, artificière 59 ; crawl 302 clics sans
  erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; fuzz 1200 parties, 0 bloquée ; perf : bande 20,3 %,
  panneau 22,6 %, mini 6,3 %, icône 2,9 % d'un cœur (dans la fourchette habituelle 19-22 %).
- 2026-11-10 (it. 389) : 55 succès : le sous-onglet Succès (et le Carnet de route) tient sans défilement à 1920 et
  1366 px ; autotest : nouveau contrôle de ces sous-onglets à 1366 px (la liste grandit à chaque succès). 115/115.
- 2026-11-10 (it. 388) : 17e familier « Phalène pâle » (pets.js > moth, sprite volant art.js) : pureté 5 % et PV 1 %
  par niveau (50 % de pureté au niveau 10 : la Malédiction dure moitié moins, le Talisman reste la vraie parade ;
  25 % par niveau aurait donné l'immunité dès le niveau 4). Capture, 2 textes × 9 langues, save-fuzz ok, 114/114.
- 2026-11-10 (it. 387) : liste « À vérifier par Victor sous Windows » en tête des Idées (plein écran, case du menu,
  consommation réelle, sons nouveaux, « Quoi de neuf »).
- 2026-11-10 (it. 386) : menu de l'icône : la case « Économie d'énergie » suit aussi un changement fait dans le panneau
  (tray.js > setStatus reconstruit le menu quand status.eco change ; avant, la case restait périmée). 114/114.
- 2026-11-10 (it. 385, moins de clics) : « Économie d'énergie (15 images/s) » cochable dans le menu de l'icône de
  notification (tray.js, case suivant status.eco envoyé par le jeu ; commande « eco:on / eco:off » → app.js). Libellé
  en 10 langues (main/i18n.js, aligné sur le panneau). Contrôle d'autotest (commande puis retour). 114/114.
- 2026-11-10 (it. 384) : consommation du mode mini avec le compagnon du duo (copie avec Guerrier + Rôdeur) : 6,2 % d'un
  cœur, identique à avant (perf:linux utilise dev-data, sans compagnon : la mesure standard ne le couvre pas).
- 2026-11-10 (it. 383) : mode mini : le compagnon du duo y apparaît (petite échelle, au bord de l'encart, il marche
  en décalé) et le héros avance de 14 px (barre de vie comprise) ; avant, seul le héros était dessiné. Captures, 113/113.
- 2026-11-10 (it. 382) : duo idéal visible dans la bande : quand la synergie est formée, une étincelle dorée file de
  temps en temps du compagnon au héros (juice.js > ambient, .spark.duolink, ≈ 0,6 par seconde). Mesuré dans le jeu
  (Guerrier + Rôdeur : jusqu'à 2 étincelles à la fois). 113/113.
- 2026-11-10 (it. 381) : Statistiques > Probabilités : « Événements rares (vus / total) » et infobulle avec ✓ devant
  les événements déjà vus (S.stats.eventsSeen) : on sait lesquels manquent au « Chasseur d'événements ». 113/113.
- 2026-11-10 (it. 380, revue générale) : simulations 12 h : berserker 62, lancier 61, assassin 52 (bruit : 59 dans
  balance.mjs) ; balance.mjs contre it. 370 : +0,0 zone ; crawl 302 clics sans erreur ; russe : aucun mot latin
  suspect ; save-fuzz ok ; perf : bande 19,4 %, panneau 21,9 %, mini 6,2 %, icône 3,0 % (stables).
- 2026-11-10 (it. 379) : succès EVENTS_ALL « Chasseur d'événements » : avoir vu chacun des 9 événements rares, avec
  progression affichée (ACH_PROGRESS). Donnée sauvegardée S.stats.eventsSeen { id: true } (startEvent) ; valeur
  abîmée → {} (migrate) ; save-fuzz : cas eventsSeenBad ; test ; README (Steamworks). 1 texte × 9 langues, 113/113.
- 2026-11-10 (it. 378, consommation, suite de 361) : perf:linux détaillé par processus (bande seule, ≈ 19,5 %) :
  GPU (composition logicielle) 10 %, page (mise en page + peinture) 8,3 %, navigateur 0,6 %, utilitaire 0,8 %.
  screenUpdatesPerSec = 30,2 : chaque image change quelque chose (le décor défile en continu), le décor fixe n'est
  redessiné qu'au changement de zone (strip.js) et les changements sont déjà suivis (mark). Pas de gain facile hors
  cadence : le réglage « Économie d'énergie » (15 images/s, ≈ 13 %) reste le levier. Rien changé.
- 2026-11-10 (it. 377) : Bestiaire > Capacités des boss : les cartes du boss de la zone actuelle sont entourées de
  --accent (.setcard.here) ; vérifié dans les deux thèmes (lisibles). 113/113.
- 2026-11-10 (it. 376) : thème clair vérifié pour les ajouts récents de l'onglet Héros (lien « Duo idéal » en --accent,
  lignes de synergie en --muted) : lisibles. Rien à corriger.
- 2026-11-10 (it. 375) : semaine simulée (mage, 168 h) après les ajouts de fin de partie (Malédiction, Talisman,
  Porte-talisman, chronique 170) : 82 courses, records 35 → 62 → 98 → 132 → 143-164, progression régulière, sans saut
  ni plafond (repère ≈ 160). Rien à corriger.
- 2026-11-10 (it. 374) : « Quoi de neuf » (édition 1, pas encore vue) : 2 lignes de plus (Zèle, Porte-talisman,
  chronique « Le serment maudit » ; icônes uniques des déblocages, sons des boss) : 10 nouveautés, sans défilement en
  français et en allemand (1920 et 1366 px). 2 textes × 9 langues, 113/113.
- 2026-11-10 (it. 373) : vérifié en capture (record 180) : la carte du Rebord place la chronique « Le serment maudit »
  en zone 170 (compteur 9 / 12) et sa cinématique se joue d'elle-même quand elle est méritée. Rien à corriger.
- 2026-11-10 (it. 372, histoire) : 12e chronique « Le serment maudit » (zone 170, entre 150 et 190) : la Malédiction des
  boss entre dans l'histoire, et le talisman d'éclat pur la repousse. Cinématique (juice.js : anneau de runes violettes,
  puis gemme dorée dont la lumière les dissipe) et motif sonore (dissonance qui descend, puis accord pur). 2 textes ×
  9 langues (noms du Briseur alignés), captures, 113/113. Le succès « Chroniqueur » demande désormais 12 chroniques.
- 2026-11-10 (it. 371, « vraiment idle », étude des concurrents b) : simulate.js accepte IDLE=1 (joueur totalement
  absent : ni équipement, ni talents, ni quêtes, ni achats). Guerrier 12 h : record 12 → 15, niveau 28 → 46 (joueur
  actif : 56-57). Le jeu avance sans aucune action ; l'interaction est nettement récompensée. Pas d'automatisme
  ajouté (règle : toute automatisation passe par un déblocage).
- 2026-11-10 (it. 370, revue générale) : simulations 12 h : paladin 60, moine 60, cryomancienne 57 ; crawl 302 clics
  sans erreur ; russe : aucun mot latin suspect ; save-fuzz ok ; fuzz 1200 parties, 0 bloquée ; perf : bande 19,1 %,
  panneau 19,9 %, mini 6,4 %, icône 2,9 % d'un cœur (stables).
- 2026-11-10 (it. 369, icônes uniques) : chaque déblocage a sa propre icône (6 nouvelles dans shopart.js : contrat
  du Bureau des contrats, marteau du Maître de forge, enclume étoilée, astrolabe, cloche du Grand intendant, chaudron
  sur le feu du Creuset perpétuel). Test : aucune icône partagée, toutes dessinées. Capture, 171 tests, 113/113.
- 2026-11-10 (it. 368) : icône propre pour le Porte-talisman (shopart.js > TALISMAN : cordon, monture dorée, gemme
  claire) au lieu de l'étoile du Filet à étoiles. Capture, 113/113.
- 2026-11-10 (it. 367, automatisation par déblocage) : déblocage « Porte-talisman » (charmKeeper, zone 122, 2e15 or) :
  à l'apparition d'un boss à Malédiction, équipe le Talisman de pureté du sac (game.js > charmSwap) et remet l'objet
  d'avant quand le boss tombe ou au boss suivant sans Malédiction (charmRestore ; R.charmBack, non sauvegardé).
  21 déblocages (autotest : nombre libre). Test, 3 textes × 9 langues, save-fuzz ok, 113/113.
- 2026-11-10 (it. 366) : carte Zone : l'infobulle de la Malédiction ajoute « Parade : Talisman de pureté » une fois ce
  pouvoir découvert (powersSeen). Contrôle d'autotest, 1 texte × 9 langues, 113/113.
- 2026-11-10 (it. 365, son) : les capacités de boss ont leur son (sound.js > bossSkill) : grondement (Enragé), carapace,
  cristaux (Souffle glacé), reflet (Miroir), montée (Fureur), pierre fendue (Peau de pierre), accord dissonant qui
  descend (Malédiction) ; une fois par seconde au plus, rien si le son est coupé. 112/112 (non écouté : serveur).
- 2026-11-10 (it. 364) : autotest : « Quoi de neuf » s'ouvre, liste ses nouveautés et ne défile pas. 112/112.
- 2026-11-10 (it. 363) : « Quoi de neuf » : en allemand, la 8e nouveauté était coupée (la fenêtre défilait) ; fenêtre
  élargie (860 px, #modal .panel:has(.newslist)) et liste sur deux colonnes (une sous 900 px) : plus de défilement.
  Capture en allemand, 111/111.
- 2026-11-10 (it. 362) : Zèle visible dans la bande : petites étincelles bleues qui montent du héros (juice.js,
  .spark.zealup). Capture, 111/111.
- 2026-11-10 (it. 361, consommation) : où passent les ~20 % d'un cœur de la bande (perf:linux) ? Mesuré dans le jeu :
  simulation 0,10 ms + dessin 0,17 ms par image (30 images/s) ≈ 0,8 % d'un cœur ; panneau ouvert : 1 rendu complet en
  20 s (13 ms), le reste en mises à jour légères. Le coût vient donc de la peinture / composition de Chromium, en
  logiciel sous xvfb (pas de GPU) : rien à gagner côté JavaScript ; à mesurer sous Windows (GPU) avant toute autre
  optimisation. Pistes si besoin : réduire la surface repeinte de la bande, ou 20 images/s par défaut.
- 2026-11-10 (it. 360, revue générale) : simulations 12 h : rôdeur 58, nécromancien 53 (bruit : 60 dans balance.mjs),
  gardien des étoiles 57 ; balance.mjs 12 h contre it. 350 : −1,0 zone (bruit) ; crawl 302 clics sans erreur ; russe :
  aucun mot latin suspect ; save-fuzz ok ; perf : bande 19,8 %, panneau 21,9 %, mini 6,5 %, icône 3,0 % (stables).
- 2026-11-10 (it. 359, variété) : 9e événement « Zèle » (events.js > zeal, chance 0,002, 30 s) : progression des quêtes
  doublée, une fois l'onglet Quêtes ouvert. Test ; l'ancien test de quête de butin ne compte plus que les objets
  tombés d'un monstre (il échouait selon les tirages). Nom réutilisé (talent « Zèle »), 1 texte × 9 langues, fuzz
  600, 111/111.
- 2026-11-10 (it. 358) : autotest : contrôle « aucun onglet ne défile » aussi à 1280 px (1920, 1366, 1280). 111/111.
- 2026-11-10 (it. 357, écran de 1280 px) : Aventure (notes de la carte Zone resserrées sous 1366 px : 12 → 0) et
  Réglages (5 colonnes dès 1200 px : 202 → 0). Aucun onglet ne défile à 1280, 1366 et 1920 px. Captures, 110/110.
- 2026-11-10 (it. 356) : succès PURE_HEART « Cœur pur » : vaincre un boss à Malédiction avec la pureté à 100 % (Talisman
  de pureté ; S.stats.pureBoss compté dans killMonster). README : à déclarer dans Steamworks. Test, 1 texte × 9
  langues, 110/110.
- 2026-11-10 (it. 355) : rythme du début vérifié après les ajouts (Nichée, Malédiction, Talisman, synergies) :
  early-pace à 60 min : zone 23, 107 objets, niveau 39, 6 déblocages (repère : zone 22, 105 objets) ; first-minutes :
  premier objet 20-41 s, onglet Héros vers 12 min (inchangé). Rien à corriger.
- 2026-11-10 (it. 354) : test : la pureté à 100 % vaut +4 à +6 % de puissance de combat (protège le Talisman de pureté
  contre le Valet d'armes). 110/110.
- 2026-11-10 (it. 353) : la pureté compte dans la puissance de combat (rules.js > power, ≈ +5 % à 100 %) : le Valet
  d'armes et « Équiper le meilleur » ne remplacent plus le Talisman de pureté par un objet à peine meilleur.
  balance.mjs 12 h : −0,2 zone (bruit). 110/110.
- 2026-11-10 (it. 352) : accessibilité : contour de focus clavier déjà présent partout (styles.css, :focus-visible).
  « Quoi de neuf » : la ligne Nichée / Malédiction mentionne la parade (Talisman de pureté). 1 texte × 9 langues
  (l'ancienne clé reste, inutilisée), 110/110.
- 2026-11-10 (it. 351) : astuce « purity » (hints.js) : le boss de la zone a la Malédiction et un Talisman de pureté
  attend dans le sac (pas porté) : l'astuce propose de l'équiper (une fois par course, ouvre l'Aventure). Test,
  1 texte × 9 langues, 110/110.
- 2026-11-10 (it. 350, revue générale) : simulations 12 h : guerrier 62, samouraï 64, barde 60 ; crawl 302 clics sans
  erreur ; russe : aucun mot latin suspect ; save-fuzz : tout ok ; perf : bande 19,9 %, panneau 22,0 %, mini 6,3 %,
  icône 2,8 % d'un cœur (stables).
- 2026-11-10 (it. 349) : parade à la Malédiction : nouvel effet « pureté » (talents.js EFFECTS.purity, plafonné à
  100 %, raccourcit la malédiction) et pouvoir légendaire « Talisman de pureté » (p_pure : pureté 100 %, +10 % PV).
  Le succès « Tous les pouvoirs » demande désormais 17 pouvoirs. Test (immunisé / maudit sans), fuzz 600, 2 textes ×
  9 langues, 110/110.
- 2026-11-10 (it. 348, moins de clics) : onglet Héros : sur la carte du héros (actuel ou choisi), « Duo idéal » devient
  un lien qui prend directement le partenaire de synergie comme compagnon (ou pour la prochaine ascension).
  Autotest : nouveau contrôle (clic → nextPartner = ranger). Capture, 110/110.
- 2026-11-10 (it. 347) : mémoire dans la durée après les ajouts récents (Nichée, Malédiction, rangées latérales,
  cinématiques) : mem-watch 7 min à ×10 : 772 → 791 → 787 Mo, stable (repère ≈ 780 Mo) : pas de fuite.
- 2026-11-10 (it. 346) : « Quoi de neuf » : ligne écrans de portable (8 nouveautés dans l'édition 1) ; thème clair
  vérifié à 1366 px (Boutique en rangées latérales). 1 texte × 9 langues, 109/109.
- 2026-11-10 (it. 345) : autotest : le contrôle « aucun onglet ne défile » est refait à 1366 px (fenêtre rétrécie le
  temps de la mesure). Il a trouvé deux cas : Aventure (résumé d'absence sur plusieurs lignes : une ligne sous
  1500 px, texte complet au survol) et Familiers (barre sur deux lignes quand « envoyer tout » / « récupérer »
  s'ajoutent : rangée latérale sans barre visible). 109/109.
- 2026-11-10 (it. 344, écrans de portable) : Aventure entre 1200 et 1499 px : 5 colonnes (Journal en colonne
  étroite, 1.15 / 1.4 / 0.9 / 1.1 / 0.75 fr) au lieu de 4 + Journal dessous : défilement 368 → 0 à 1366 et 1440
  (12 px à 1280 ; noms d'équipement plus courts, le clic ouvre le détail). Les écrans de portable 1366 / 1600 ne
  défilent plus sur aucun onglet. 108/108.
- 2026-11-10 (it. 343, écrans de portable) : Bestiaire : sous 1800 px, les monstres coulent en colonnes sur 7 rangées
  avec défilement latéral (beastgrid hscroll, data-hs beasts) : défilement 142 / 54 → 0 à 1366 / 1600 ; 1920
  inchangé. Reste : aventure à 1366. 108/108.
- 2026-11-10 (it. 342, écrans de portable) : Boutique : marchand, potions et coffres en rangées latérales (hscroll,
  data-hs merchant / potions / chests ; grilles gardées ≥ 1800 px) : défilement 80 → 0 à 1366 et 1600 ; ruban
  « -40 % » non rogné. Captures 1366 / 1920. Reste : aventure (1366), bestiaire. 108/108.
- 2026-11-10 (it. 341, écrans de portable) : Réglages : Zone de danger et Raccourcis clavier empilés dans une
  colonne (.setgrid > .stack) : défilement 69 / 35 → 0 à 1366 / 1600 (1920 inchangé). Reste : aventure (1366),
  boutique, bestiaire. 108/108.
- 2026-11-10 (it. 340, revue générale) : simulations 12 h : mage 59, gladiateur 63, prêtresse 62 ; semaine (mage) :
  record ≈ 164 (repère 160, la Malédiction ne freine pas la fin de partie) ; crawl 309 clics sans erreur ; russe :
  aucun mot latin suspect ; perf : bande 18,7 %, panneau 20,1 %, mini 6,3 %, icône 2,9 % d'un cœur (stables).
- 2026-11-10 (it. 339, écrans de portable) : mesure du défilement à 1366 / 1600 px : aventure 368 / 0, boutique
  80 / 80, bestiaire 142 / 54, statistiques 168 / 168, réglages 69 / 35 (1920 : 0 partout). Statistiques corrigées :
  grille à 6 colonnes dès 1280 px (les 5 cartes sur une rangée) → 0 aux trois largeurs. Reste : aventure (1366),
  boutique, bestiaire, réglages. 108/108.
- 2026-11-10 (it. 338) : Bestiaire > Capacités des boss : chaque carte indique la prochaine zone dont le boss a
  cette capacité (ou « boss de ta zone ») pour s'y préparer. Malédiction vérifiée en capture (traduite). 2 textes ×
  9 langues, 108/108.
- 2026-11-10 (it. 337) : autotest : contrôle du halo violet du héros maudit en combat (Malédiction). 108/108.
- 2026-11-10 (it. 336) : héros maudit visible (halo violet .actor.cursed pendant la Malédiction, juice.js) ;
  « Quoi de neuf » édition 1 : ligne Nichée + Malédiction (7 nouveautés). 1 texte × 9 langues, 107/107.
- 2026-11-10 (it. 335, étude des concurrents d : mécaniques de boss) : 11e capacité de boss « Malédiction »
  (bosses.js > curse, CURSE) : toutes les 9 s, le héros est maudit 3 s (+15 % de dégâts subis, vol de vie coupé) ;
  libellé « Maudit ! » dans la bande. ORDER passe à 11 (les capacités par zone sont redistribuées). balance.mjs 12 h :
  −0,1 zone ; fuzz 1200 parties, 0 bloquée ; test ; 2 textes × 9 langues (nom réutilisé : talent « Malédiction »). 107/107.
- 2026-11-10 (it. 334) : Nichée visible dans la bande : plumes de duvet crème qui descendent en se balançant autour
  du héros (juice.js, .spark.nestdown), comme les pièces de la Pluie d'or. Capture, 107/107.
- 2026-11-10 (it. 333, étude des concurrents d : variété) : nouvel événement « Nichée » (events.js > nest) : 30 s
  pendant lesquelles chaque victoire a 12 % de chances de laisser un œuf de familier ; seulement une fois l'onglet
  Familiers ouvert. 2 textes × 9 langues, test, fuzz 600 parties, 107/107.
- 2026-11-10 (it. 332) : astuce « synergy » (hints.js) : quand le partenaire idéal du héros est libéré mais qu'un
  autre compagnon est en place (et pas déjà choisi pour la prochaine ascension), une astuce le propose avec le nom
  du duo (une fois par course). 1 texte × 9 langues, test, 107/107.
- 2026-11-10 (it. 331) : succès DUO_SYNERGY « Duo parfait » (former un duo idéal) ; README : à déclarer dans
  Steamworks. 1 texte × 9 langues, test, 107/107.
- 2026-11-10 (it. 330, revue générale) : simulations 12 h : guerrier 60, lancier 59, artificière 60 (stables) ; crawl
  308 clics sans erreur ; texte russe : aucun mot latin suspect ; perf : bande 18,4 %, panneau 20,2 %, mini 5,6 %,
  icône 2,6 % d'un cœur (stables).
- 2026-11-10 (it. 329) : simulate.js choisit le duo idéal (synergie) quand il est libre, sinon le premier héros
  possible, comme un vrai joueur. balance.mjs 12 h, 10 héros : +0,0 zone (en 12 h, le duo idéal est rarement libre).
- 2026-11-10 (it. 328, étude des concurrents : bonus d'équipe) : synergies de duo (classes.js > DUO_SYNERGIES) : chaque
  héros au corps à corps a un partenaire à distance attitré (10 duos, chaque héros une fois : Frères d'armes, Lumière
  jumelle, Ombres et os…) ; le duo formé reçoit un petit bonus (≈ 5 %, rules.js). Onglet Héros : « Duo idéal » sur
  chaque carte (vert quand formé) ; infobulle du compagnon. Ajouté au « Quoi de neuf » (édition 1, pas encore vue).
  12 textes × 9 langues, test (une portée de chaque, tous les héros, bonus appliqué), capture, 107/107.
- 2026-11-10 (it. 327) : solidité des nouveaux réglages : une valeur abîmée (« oui », null…) de settings.eco ou
  settings.cinematics reprend le défaut au chargement (« oui » activait l'économie d'énergie) ; save-fuzz : cas
  newsBad ; test. CLAUDE.md : penser à publier une édition « Quoi de neuf » après une série de nouveautés. 107/107.
- 2026-11-10 (it. 326) : « Quoi de neuf » (game/news.js : NEWS_ID, NEWS_ITEMS) : au premier lancement après une
  mise à jour, une bulle « Du nouveau dans Sillwalker ! » (6 s après le démarrage, non bloquante) ; un clic ouvre la
  liste dans la fenêtre modale (#mt / #mbody). Une seule fois (settings.newsSeen) ; jamais pour une partie neuve ;
  migration : une ancienne sauvegarde la voit. Édition 1 : design, icônes des compétences, 11 chroniques, Enclume /
  familiers / Pluie d'éclats / Peau de pierre, réglages. Pour une nouvelle édition : NEWS_ID + 1 et nouveaux textes.
  7 textes × 9 langues, test, capture, 107/107.
- 2026-11-10 (it. 325) : Carnet de route : chaque chronique découverte y est notée (« Chronique : La forge des
  cages ») ; titre inconnu (autre version) : « ? ». save-fuzz : cas journeyChron. 1 texte × 9 langues, 107/107.
- 2026-11-10 (it. 324, variété) : deux familiers de plus (16) : Luciole (vol ; +2 % expérience, +3 % efficacité hors
  ligne) et Étoilon (rare, poids 0,4 ; vol ; vitesse de déplacement, chances de critique), dessins pixel art (art.js).
  Le succès « tous les familiers » redevient à compléter pour qui ne l'avait pas. 4 textes × 9 langues, save-fuzz,
  capture. Correctif aussitôt : l'onglet Familiers défilait de 30 px (les sous-onglets « Trouvés / À découvrir »
  réapparaissaient sur une ligne à eux) : placés dans la barre du haut. Autotest 107/107 (commit précédent poussé trop
  tôt, en même temps que l'autotest : attendre son verdict).
- 2026-11-10 (it. 323) : thème clair des ajouts récents (rivets, infobulle élargie, fondus des rangées, rappel du
  sac, onglet Héros) : lisibles, rien à corriger.
- 2026-11-10 (it. 322) : fullscreen-watch.js bien embarqué dans la version Windows (build.files : src/**). README à jour :
  11 chroniques et leurs cinématiques, greffes de talents, icônes de l'arbre, 20 déblocages dont l'Enclume stellaire,
  plume et cape, « bon voisin » (économie, plein écran, cinématiques), design « gravure pixel ». Note : le PowerShell
  de veille reste en mémoire (quelques dizaines de Mo) ; à mesurer sous Windows avec le reste.
- 2026-11-10 (it. 321, P1 bon voisin) : la bande se cache devant une application en plein écran (jeu, vidéo,
  présentation) puis revient : main/fullscreen-watch.js lance une fois un PowerShell caché qui appelle
  SHQueryUserNotificationState toutes les 2 s (états 2, 3, 4 = plein écran) ; StripWindow.setFullscreenApp masque /
  rend la fenêtre (reveal attend la fin du plein écran). Réglage dans le menu de l'icône « Se cacher devant les jeux
  et vidéos en plein écran » (actif par défaut, 10 langues). Hors Windows ou si PowerShell échoue : aucun effet.
  Test (lecture des états, Linux sans effet). NON VÉRIFIÉ SOUS WINDOWS : à essayer avec un jeu / une vidéo plein écran.
- 2026-11-10 (it. 320, revue générale) : simulations 12 h : guerrier 60, barde 58, garde-étoile 59 (stables) ;
  crawl 300 clics sans erreur ; texte russe : aucun mot latin suspect ; perf : bande 19,1 %, panneau 20,5 %, mini
  5,8 %, icône 2,6 % d'un cœur (stables).
- 2026-11-10 (it. 319) : semaine simulée (mage) après Peau de pierre et les greffes : record de fin 160 (repère
  152-155), progression régulière ; déblocages étalés jusqu'à l'Astrolabe (zone 150, 6e jour) ; l'Enclume stellaire
  arrive vers le 5e jour (zone 140), comme voulu (« difficile d'accès »).
- 2026-11-10 (it. 318) : contrôle du rythme de la première heure après Peau de pierre, greffes de talents et
  nouveaux événements : early-pace à 60 min : zone 22, 105 objets, 5,7 déblocages (repère : 23 / 115) ; tab-pace :
  talents 1 min, quêtes 5, boutique 8-9, héros 10, carte 12, bestiaire 14-15, ascension 21-22 (3 graines). Stable.
- 2026-11-10 (it. 317) : astuce 💡 « anvil » à l'achat de l'Enclume stellaire : où trouver « Mettre au niveau »
  (détail d'un objet plus ancien que le record). 1 texte × 9 langues, autotest vert.
- 2026-11-10 (it. 316) : astuce 💡 « duo » : dès qu'un héros de l'autre portée est libre et qu'aucun compagnon n'est
  choisi, la bulle propose de former un duo (un clic ouvre l'onglet Héros). Test (proposée puis plus après le duo),
  1 texte × 9 langues, autotest vert.
- 2026-11-10 (it. 315) : succès CHRONICLER « Chroniqueur » (toutes les chroniques avant la victoire, progression
  n / 10 ; compté d'après S.story.read, sans nouvelle donnée) ; README : à déclarer dans Steamworks. Autotest : le
  contrôle « pièce de panoplie gardée » échouait quand la pièce tombait sur un emplacement portant une autre panoplie
  (l'équiper casserait celle-ci : inutile à raison) : il choisit maintenant un emplacement sans panoplie. Test, 107/107 ×2.
- 2026-11-10 (it. 314, histoire) : deux chroniques de plus pour combler les silences (50 → 100 → 150) : « La forge
  des cages » (zone 75 : l'atelier où le Briseur forge les cages avec des éclats tordus ; scène : enclumes, marteau,
  gerbes d'étincelles ; motif : coups d'enclume puis accord) et « Les voix des éclats » (zone 125 : les éclats
  murmurent le vrai nom du Briseur ; scène : éclats suspendus et ondes violettes ; motif : murmures cristallins).
  11 chroniques. 4 textes × 9 langues, captures, autotest vert.
- 2026-11-10 (it. 313) : Quêtes et Carte relues au nouveau design : cohérentes ; seule retouche : pas d'étoile
  d'ornement dans le titre des cartes de quête (elle doublait les étoiles de rareté juste au-dessus). Autotest vert.
- 2026-11-10 (it. 312, demande 32) : rangées latérales : fondu discret (masque CSS) sur le bord où d'autres cartes
  attendent, mis à jour au défilement (hscroll.js > edgeHints) ; remplace l'indication écrite que Victor a jugée
  inutile. Capture (Familiers), autotest vert.
- 2026-11-10 (it. 311) : infobulle des objets : elle montait par-dessus la barre d'onglets (limite haute à 4 px) ;
  elle s'arrête maintenant sous l'en-tête, et passe de 270 à 340 px de large (texte 13 px) : moins haute, elle tient
  en entier (une légendaire avec pouvoir et panoplie comprise). Capture, autotest vert.
- 2026-11-10 (it. 310, revue générale) : simulations 12 h : guerrier 60, cryomancienne 59, prêtresse 59 (stables
  après greffes de talents et Peau de pierre) ; crawl 300 clics sans erreur ; texte russe : aucun mot latin suspect ;
  perf : bande 19,2 %, panneau 20,5 %, mini 5,8 %, icône 2,6 % d'un cœur (stables).
- 2026-11-10 (it. 309) : étiquettes de la bande (zone, or, niveau) vérifiées au nouveau style : cohérentes, rien à
  changer. CLAUDE.md complété (pièges connus) : jetons du design et --frame à régénérer, règle « pas de défilement »
  et ses remèdes (hscroll, ⓘ), clés de traduction déjà prises (Cuirasse), réglages Économie / Cinématiques.
- 2026-11-10 (it. 308, demande 35) : mode mini et boutons de la bande (son, réduire, agrandir) au nouveau style :
  angles droits, petit relief, liseré d'or au survol, encadré nuit violine (le mini gardait l'ancien bleu nuit
  arrondi). Capture, autotest vert.
- 2026-11-10 (it. 307, étude des concurrents, action d : variété) : 10e capacité de boss « Peau de pierre » : −30 %
  de dégâts reçus tant qu'il a plus de 70 % de ses PV (coups et clics) ; « Peau de pierre brisée ! » au passage du
  seuil. Ajoutée à la rotation (bosses.js > ORDER : la capacité de chaque zone change). Nom « Cuirasse » écarté :
  clé déjà prise par la pièce d'armure (le sens se serait mélangé dans les traductions). Fuzz 1200 parties, 0
  bloquée ; balance.mjs 12 h, 10 héros : −0,5 zone (bruit). 3 textes × 9 langues, autotest vert.
- 2026-11-10 (it. 306, étude des concurrents, action d : variété) : nouvel événement « Pluie d'éclats » (30 s,
  chance 0,15 % par victoire, seulement après la 1re ascension : EVENTS.req) : chaque victoire a 25 % de chances de
  donner un éclat d'étoile (compté aussi au total, donc dans la lueur) ; petites étoiles violettes qui tombent dans
  la bande. Statistiques > Probabilités : les 7 événements en une ligne (détail au survol), sinon l'onglet défilait.
  2 textes × 9 langues, test, autotest, save-fuzz verts.
- 2026-11-10 (it. 305, demande 35, étape 6) : rivets dorés aux quatre coins des grands cadres (pseudo-élément ::after,
  logés dans les entailles ; à l'intérieur pour les panneaux qui défilent). Autotest : l'échec intermittent « retour à
  la bande : panneau rouvert » (≈ 1 sur 5, puis cascade) revient sans lien avec ce changement ; plus d'essais n'y fait
  rien : le contrôle affiche maintenant l'état (classes du corps, cinématique, bulle, mode, taille de la fenêtre) pour
  trouver la cause au prochain échec. 4 passages verts d'affilée ensuite.
- 2026-11-09 (it. 304, étude des concurrents, action f) : la silhouette du héros change avec l'équipement, en plus
  des teintes : plume (couleur de rareté) sur un casque épique ou légendaire, cape (teinte de l'armure, assombrie)
  derrière une armure épique ou légendaire, qui retombe de deux rangées ; placées d'après le dessin de chaque héros
  (equipvis.js > gearRows : haut du casque H, bord arrière de l'armure A/a). Test (20 héros, mêmes rangées ajoutées
  sur les 3 images), capture (mage), autotest vert.
- 2026-11-09 (it. 303, étude des concurrents, action c) : partie neuve regardée à 9 s et 40 s (bulle d'accueil,
  « Prochaine découverte », À faire : clair) ; seul manque : rien ne dit comment équiper un objet ▲. Astuce
  « upgrade » réécrite (« double-clique dessus pour l'équiper ») et rappel « ▲ double-clic : équiper » dans le titre du
  sac tant qu'un objet meilleur attend (record ≤ 10, avant la 1re ascension). 2 textes × 9 langues, autotest vert.
- 2026-11-09 (it. 302, étude des concurrents, action c) : descriptions d'effets claires (talents, compétences,
  constellations, objets) : « +12 % brûlure (attaque / s pendant 3 s) » → « +12 % de l'attaque en brûlure par seconde
  (3 s) » ; idem poison, serviteur, enchaînement, iaijutsu, régénération, bouclier, épines ; « second souffle »
  → « second souffle (survit une fois par combat à un coup fatal) ». 9 textes × 9 langues (anciennes clés gardées,
  l'ordre ne bouge pas). Capture, autotest vert.
- 2026-11-09 (it. 301, étude des concurrents, action d) : héros ajoutés plus distincts : chacun remplace une branche
  de talents de son modèle par les effets d'une branche d'un autre héros, plus proche de son thème (talents.js >
  GRAFTS : cryomancienne → critiques au lieu de brûlure, barde → or et expérience, chaman → invocations, prêtresse →
  soins, garde-étoile → boucliers, gladiatrice → vol de vie et épines…). Valeurs reprises telles quelles (déjà
  équilibrées). Simulations 12 h des 10 héros : dans le bruit (artificière : greffe déplacée de Arcanes vers Savoir
  après −6 zones, puis 3 graines : 59 contre 57,7 avant). Test, fuzz, autotest vert.
- 2026-11-09 (it. 300, revue générale) : simulations 12 h : guerrier 59, mage 54, artificière 59 (stables) ; crawl
  300 clics sans erreur (nouveau design compris) ; texte russe : aucun mot latin suspect ; perf (son + musique) :
  bande 20,5 %, panneau 22 %, mini 6,2 %, icône 2,7 % d'un cœur ; avec « Économie d'énergie » : bande 13,4 %,
  panneau 14,2 % (≈ −35 %).
- 2026-11-09 (it. 299, étude des concurrents, action b) : réglage « Cinématiques de l'histoire » (Réglages >
  Affichage, actif par défaut) : décoché, plus aucune cinématique automatique (chroniques, héros libérés, Briseur,
  générique), sauf l'intro du premier lancement ; le ▶ des chroniques les rejoue quand même (data.force).
  settings.cinematics (défaut, test), contrôle d'autotest, 2 textes × 9 langues (noms du Briseur alignés), 107/107.
- 2026-11-09 (it. 298, étude des concurrents, action a) : réglage « Économie d'énergie » (Réglages > Affichage,
  désactivé par défaut) : animation plafonnée à 15 images/s en permanence (le jeu continue normalement) ; la cadence
  change aussitôt (événement sillwalker-framerate → restartLoop). S'ajoute aux ralentissements automatiques
  (batterie 20, absent 10, mini 15). Sauvegarde : settings.eco (défaut, migration, test). 2 textes × 9 langues, 106/106.
- 2026-11-09 (it. 297, demande 35, étape 5) : infobulles (objets, compétences, aide) et bulle de notification au
  même dessin : angles droits, bord sombre et liseré d'or intérieur (outline décalé), ombre dure ; séparateurs des
  listes de statistiques en pointillés pixel. Capture, autotest vert.
- 2026-11-09 (it. 296, demande 35, étape 4) : palette signature : sombre « nuit violine et laiton » (fond #18121f,
  panneaux #231a2d, texte parchemin #efe6d2, laiton #e8b14a) au lieu du bleu nuit générique ; clair « parchemin et
  encre » (#ebe4d6 / #fcf8f0, encre #2a2230). Cadres pixel régénérés aux nouvelles couleurs. Noms de secteurs de
  l'arbre assombris en thème clair (comme .tint). Captures deux thèmes, autotest vert.
- 2026-11-09 (it. 295, demande 35, étape 3) : cases à cocher pixel (carré gravé, rempli d'or quand coché), curseurs
  (glissière gravée, poussoir doré en relief), barres de défilement carrées (panneau, journal, rangées latérales).
  Captures deux thèmes (Réglages), autotest vert.
- 2026-11-09 (it. 294, demande 35, étape 2) : fond du panneau semé d'étoiles pixel (tuile SVG 96 px, --sky, une
  par thème, très discrète) ; onglets en languettes gravées (angles droits, biseau, ligne d'or sous l'onglet actif),
  séparateur de groupes en petite étoile, pastilles de nombre carrées. Captures deux thèmes, autotest vert.
- 2026-11-09 (it. 293, demande 35, étape 1 « gravure pixel ») : cadres pixel art à coins entaillés pour les grands
  panneaux (image 9 parties générée en SVG, une par thème : --frame ; liseré clair en haut, ombré en bas, ombre dure
  qui suit la forme : filter drop-shadow), angles droits partout (boutons, pastilles, tuiles, cases), boutons en
  relief pixel (biseau clair / sombre, ombre dure --edge), étoile d'or à quatre branches devant chaque titre de
  panneau (--star). Cartes à état (héros, familiers, quêtes, bestiaire) : angles droits, bordure colorée gardée.
  Captures sombre et clair ; autotest 106/106 (aucun onglet ne défile).
- 2026-11-09 (it. 292, demande 34, étape 2) : 30 dessins uniques (9×9) pour les 24 nœuds remarquables et les 6 clés
  de voûte (poing du Bras de titan, crâne du Coup fatal, couronne transpercée, haches croisées, casque cornu de la
  Brute, œil des Réflexes, cible, rafale, lames, tourbillon, boule de feu, fiole de venin, invocation, faux, cœur en
  flammes, cœur de fer, carapace, goutte de sang, ronces, tête de golem, bourse, livre, coffre, lune du Rêveur, main
  de Midas, bouclier et épée, éclair, notes, chauve-souris, ankh) ; nœuds remarquables agrandis ; icônes verrouillées
  en couleur à demi-opacité (le gris éteignait l'arbre). Test : chaque remarquable et clé a son dessin. Autotest vert.
- 2026-11-09 (it. 291, demande 34, étape 1) : arbre des compétences illustré : 25 icônes pixel art dessinées
  (render/skillicons.js, une par type d'effet : épée, éclair, flamme, goutte de poison, cœur, bouclier, pièce, gemme,
  lune, épées croisées, crocs, ailes…), une dans chaque nœud (cercles agrandis : petits 10, remarquables 14, clés 19) ;
  en couleur si acquis ou disponibles, grisées si verrouillées. Test : chaque effet de l'arbre a son icône. 106/106.
- 2026-11-09 (it. 289) : contrôle en thème clair des changements des it. 282-288 (Ascension et ses icônes, rangée
  des déblocages, détail d'objet sous le sac) : un défaut, le nom de panoplie (.setline b) prenait la couleur vive
  telle quelle (jaune pâle sur blanc) : assombri comme .tint. Autotest vert.
- 2026-11-09 (it. 288, demandes 18 / 32) : plus aucun défilement vertical à 1920 px (largeur de Victor), objet ouvert
  compris. Mesure par onglet (scrollHeight - clientHeight) : talents 5, stats 5, réglages 6, carte 11 → 0 (marges du
  panneau) ; détail d'un objet sous le sac : jusqu'à 242 → 0 (colonne du sac plus large et sac en 2 rangées de 12,
  toujours, sinon les cases bougeaient entre les deux clics d'un double-clic ; boutons serrés, statistiques sur deux
  colonnes, « ← sac » dans l'en-tête) ; carte du héros : pastilles d'effets sur une ligne latérale (hscroll), résumé
  d'absence serré, « À faire / Chroniques / Statistiques » côte à côte. Nouveau contrôle d'autotest : aucun onglet ne
  défile (fenêtre ≥ 1800 px). 106/106. À 1366 px il reste du défilement (Aventure, Statistiques, Bestiaire).
- 2026-11-09 (it. 287, demande 32 suite) : Héros et Familiers en rangée latérale (molette / glisser), ouverts sur le
  héros actuel et le familier actif : plus de défilement vertical. Retiré l'indication « Molette ou glisser » sous
  les déblocages (inutile, dit Victor ; la clé reste dans keys.js). Un autotest a échoué une fois (retour à la bande,
  puis cascade) puis réussi deux fois de suite : accident de minutage. 105/105.
- 2026-11-09 (it. 286, demande 32) : défilement latéral réutilisable (ui/hscroll.js : classe .hscroll + data-hs ;
  molette verticale convertie en latéral, appui-glisser à la souris, position gardée d'un rendu à l'autre, départ
  sur data-hs-start ; un glisser n'appuie pas sur le bouton dessous, sans avaler le clic suivant). Boutique >
  Déblocages : les 20 affichés (acquis grisés « ✓ Débloqué »), ouverts au premier à acheter. Contrôle d'autotest
  (molette, glisser, position), 1 texte × 9 langues, 105/105.
- 2026-11-09 (it. 285, retours de Victor sur 27 et 29) : 16 icônes uniques dessinées pour les constellations (casque,
  tour, pièce, chouette, comète, calice, route, arbre, lune, fiole, étoile polaire, bouclier, couronne, serpent,
  aile, arc ; shopart.js CONST_ICONS) ; « gardé / perdu » avec les mêmes icônes que les onglets (talents = étoile…).
  Défilement : il venait de la liste des constellations à améliorer (16 lignes de deux étages quand aucune n'est au
  maximum ; ma sauvegarde de test en avait 11 au maximum) : lignes d'une hauteur (effet actuel au survol), 3 colonnes
  quand la place le permet : tout tient à 1920 et 1366 px avec les 16. 104/104.
- 2026-11-09 (it. 284, demande 28) : Enclume stellaire, déblocage de boutique (zone 140, 1e17 or) : dans le détail
  d'un objet plus ancien que le record, « Mettre au niveau N (prix) » : chaque statistique grandit comme celle d'un
  objet neuf de ce niveau (levelUpItem, rules.js) ; tirages, rareté, forge, pouvoir, panoplie conservés. Prix : l'or
  d'environ 4 000 monstres du record (×rareté, plus si forgé). 5 textes × 9 langues, test, capture, 104/104.
- 2026-11-09 (it. 283, demande 31) : chaque chronique a sa cinématique épique (10 s, passable d'un clic) : ambiance
  de couleur propre, scène en pixels sur les côtés (captif : cages qui s'ouvrent ; éclats : pluie d'étoiles ;
  renaissance : colonnes de lumière ; Bastion : forteresse aux fenêtres rouges et braises ; au-delà : brumes et sol
  qui ondule ; fissure : le ciel se fend en haut de la bande ; seuil : la silhouette du Briseur, ses yeux s'allument),
  titre puis première phrase de la chronique, motif musical par chronique (sound.js chronicleMotif). ▶ dans la
  liste des chroniques (Aventure) : revoir la cinématique (intro pour « Le ciel brisé »). Captures des 7 scènes,
  1 texte × 9 langues, contrôle d'autotest, 104/104.
- 2026-11-09 (it. 282, demandes 27, 29, 30) : Ascension : icônes partout (éclats, gardé / perdu, constellations selon
  leur effet, pastilles des constellations au maximum, bouton d'ascension) ; « gardé / perdu » en étiquettes sur
  une ligne chacun, colonne de gauche plus large : plus de défilement même à 1366 px. Aventure : retirés le lien
  « n points de talent à dépenser » et « plus de potions de soin : la boutique en vend ». Captures, 103/103.
- 2026-11-09 (it. 281, revue générale) : simulations 12 h : guerrier 59, rôdeur 62, chaman 59 (stables) ; crawl
  294 clics sans erreur (avec un duo) ; texte russe : aucun mot latin suspect ; carte du Rebord : portraits carrés
  nets dans les cages. Perf mesurée à l'it. 270 (stable), non refaite.
- 2026-11-09 (it. 280, demande de Victor) : portraits des héros « écrasés » : les sprites sont étroits et hauts
  (9×17, chaman 5×19…) et les cadres carrés les étiraient ; en plus, l'it. 272 donnait 48 px de large pour 40 de haut.
  Portraits des héros et des familiers refaits en images carrées (sprite centré, décalage en pixels d'art entiers,
  squareURL dans sprites.js) ; cadres carrés partout (onglet Héros 48×48, carte du héros 26, duo 24, carte du Rebord
  18×18, cinématique de libération 56×56). Captures, 103/103.
- 2026-11-09 (it. 279, demande de Victor) : le familier volant se plaçait devant le visage du compagnon à distance
  (même emplacement, juste derrière le héros) : quand le compagnon est derrière le héros, le familier passe derrière
  lui. Capture (Guerrier + Rôdeur + Fée, marche et combat), 103/103.
- 2026-11-09 (it. 278) : solidité. fuzz 60 graines : 1200 parties, 0 bloquée (20 héros, duo). save-fuzz : 4 cas
  ajoutés (compagnon inconnu, compagnon de même portée, héros libérés abîmés, histoire abîmée), tous « ok » ; mais
  une liste de héros libérés abîmée était gardée telle quelle (null, « nope »… comptés comme libérés) : migrate()
  la filtre maintenant (guerrier toujours libre). Test, 159 tests, 103/103.
- 2026-11-09 (it. 277) : contrôle en thème clair des onglets compactés aux it. 267-276 (Aventure avec le duo, Héros,
  Familiers, Bestiaire, Boutique, Talents) : lisibles, aucune couleur claire en dur, rien à corriger.
- 2026-11-09 (it. 276) : Talents sans défilement à 1920 px (59 px avant) : notes des cadres Voie et Maîtrises en ⓘ
  dans leur titre, lignes de talent un peu plus basses. 103/103.
- 2026-11-09 (it. 275) : Boutique, sous-onglet Marchand (demande 18) : la grille gardait 4 colonnes alors que
  l'Atelier y est caché (≈ 400 px vides à droite) : 3 colonnes, marchand / potions / coffres chacun sur une rangée
  (tuiles plus serrées) : plus de défilement à 1920 px (72 px avant). 1366 px inchangé (deux rangées). 103/103.
- 2026-11-09 (it. 274) : Aventure, colonne Sac (demande 18) : légende « ▲ / rareté » en ⓘ à côté du titre (elle
  occupait deux lignes en bas), boutons en 13 px : la colonne tient sans défilement. Autotest : le contrôle « pièce
  de panoplie gardée » échouait quand le sac de dev était plein (la pièce ajoutée sortait de la grille) : place libérée
  avant. 103/103.
- 2026-11-09 (it. 273) : Familiers plus compacts (demande 18) : le ⓘ remonte dans la barre du haut (il occupait une
  ligne), l'expédition en cours tient sur une ligne (« Grande expédition · 4 h 32 », phrase complète en infobulle),
  bonus en 12 px : ~80 px de moins. Sans nouveau texte. 103/103.
- 2026-11-09 (it. 272) : onglet Héros plus compact (demande 18) : boutons courts côte à côte (« Jouer à
  l’ascension », « Prendre en duo », texte complet en infobulle), portrait 48 px, modificateurs en 12 px : ~60 px de
  moins par rangée de cartes. 3 textes × 9 langues, captures fr 1920 / de 1366, 103/103.
- 2026-11-09 (it. 271) : Bestiaire compact (demande 18) : fiches d'une ligne de nom (coupé, nom entier en infobulle
  avec les zones), icône 24 px, colonnes de 148 px : à 1920 px les 83 monstres tiennent sans défilement (avant :
  306 px de trop) ; à 1366 px il reste ~2 rangées. Corrigé : « aucun » non traduit dans la Collection d'objets.
- 2026-11-09 (it. 270, revue générale) : simulations 12 h : guerrier 59, mage 54, barde 60 (stables) ; crawl
  295 clics sans erreur ; texte russe : aucun mot latin suspect ; talents du Barde en allemand bien traduits ;
  perf (son + musique) : bande 21 %, panneau 24 %, mini 6,4 %, icône 2,6 % d'un cœur (stables).
- 2026-11-09 (it. 269) : contrôle de fuite après la musique (des nœuds audio créés à chaque note) : mem-watch 10 min à
  ×3, son et musique actifs : 775 à 785 Mo, stable (pas de fuite ; +80 Mo par rapport au repère de 700 Mo : le
  contexte audio). CLAUDE.md : repère mis à jour.
- 2026-11-09 (it. 268) : succès DUO_FIRST « Premier duo », HEROES_10 « Dix héros libérés », HEROES_ALL « Tous les
  héros libérés » (progression n / 10, n / 20 dans Statistiques) ; README : à déclarer dans Steamworks. Test, 103/103.
- 2026-11-09 (it. 267) : carte du héros : le compagnon du duo s'affiche à côté du héros (« Guerrier + 🧝 Rôdeur »,
  explication en infobulle, clic vers l'onglet Héros). Écarté : languette sous la bande quand la bande est en haut
  (le bas de la bande est le sol, où sont le héros et les monstres : la languette les cacherait). 103/103, capture.
- 2026-11-09 (it. 266) : les Voies des 10 nouveaux héros ont leurs noms et descriptions (VOIE_NAMES : le Chaman
  n'est plus « le druide », la Cryomancienne n'a plus de « Pyromancie » : Voie du blizzard / du cristal…), effets
  inchangés. 33 textes × 9 langues (table français → langues). 103/103.
- 2026-11-09 (it. 265) : les talents intermédiaires des 10 nouveaux héros ont aussi leurs noms (90, dont 85
  nouveaux : Barde = Accords puissants, Tempo, Contre-chant, Pas de danse… ; Artificière = Mèche, Charge creuse,
  Poudre fine…), effets inchangés. Traductions rangées depuis une table français → 9 langues (évite les décalages
  d'ordre). Capture (Barde), 103/103. Les nouveaux héros ont désormais une identité complète dans les talents.
- 2026-11-09 (it. 264) : les 10 héros ajoutés ont leurs propres noms de branches et de talents ultimes (talents.js
  TREE_NAMES : Barde = Rythme / Mélodie / Refrain, Crescendo / Berceuse / Hymne héroïque ; Cryomancienne = Givre /
  Glace / Cristal… ; effets inchangés). 55 textes × 9 langues. Capture (Barde), 103/103. Journal : demande 8
  marquée FAIT (it. 196-199). Reste : renommer aussi les talents intermédiaires copiés (« Paumes de fer » chez le
  Barde…), environ 90 noms.
- 2026-11-09 (it. 262, demande 18, fin) : Réglages : l'aide de chaque case passe en infobulle (ⓘ), raccourcis
  clavier repliés par défaut (« 1 … 9, 0, -, = ») : défilement 100 → 6 px. Le panneau rouvre après chaque rendu
  tout bloc data-keep resté ouvert, quel que soit l'onglet. Bilan de la demande 18 (1920 px, partie de dev) :
  Compétences, Quêtes, Ascension, Carte, Statistiques, Réglages ≈ 0 ; Aventure 51, Talents 59, Boutique 72,
  Familiers 238, Héros 246, Bestiaire 306 (au lieu de 477 / 451 / 1260). 103/103.
- 2026-11-09 (Victor : « beaucoup plus de diversité d'instruments ») : musique orchestrée par zone (fixe, selon le
  décor puis la graine) : 11 timbres de mélodie (pulse 12,5 / 25 / 50 % façon Game Boy par séries de Fourier,
  flûte à vibrato, sifflet, cloche, marimba, harpe pincée, orgue, cuivres à filtre, cordes désaccordées), 4 basses
  (triangle, sub, carrée, pincée), 6 rythmes (aucun, doux, shaker, marche, shuffle, lourd : grosse caisse,
  caisse claire, charleston), arpège d'accords (83 zones) ou tierce sous la mélodie (57 zones). Forêt : flûte /
  harpe ; glace : cloche / marimba ; volcan : cuivres / cordes ; crypte : orgue… Test (diversité, déterminisme),
  103/103 ; perf : bande 18,8 %, mini 5,7 %, icône 2,8 %. Non écoutable ici : à valider par Victor.
- 2026-11-09 (it. 260, revue générale) : simulations 12 h : guerrier 59, mage 54, assassin 56 (stables) ; russe :
  rien de non traduit ; --crawl 302 clics, 0 erreur ; save-fuzz 20/20. Corrigé (Victor : le curseur d'opacité
  revenait encore en arrière, le volume non) : l'opacité fait un aller-retour avec le processus principal ; les
  Réglages se redessinaient avec l'ancienne valeur et plus rien ne les redessinait ensuite. L'onglet garde la valeur
  choisie jusqu'à la confirmation (opLocal) et applyLayout marque le panneau à redessiner. Contrôle d'autotest
  (position du curseur après redessin), 103/103.
- 2026-11-09 (it. 259, demande 18, suite) : Bestiaire : fiches de monstres compactes (zones en infobulle, 10 par
  rangée en 1920) : défilement 1260 → 306 px. Héros : cartes compactes (description en infobulle, modificateurs
  sur une ligne), « Style de combat » devient un sous-onglet : 451 → 246 px. Captures, 102/102.
- 2026-11-09 (retours de Victor) : (1) curseurs des Réglages (opacité, volume) qui revenaient à l'ancienne position :
  l'onglet était redessiné à chaque événement du jeu, en plein glissement ; il ne se redessine plus pendant qu'un
  curseur est actif (blur au relâchement), et le pourcentage suit le glissement. (2) Opacité jusqu'à 10 % (curseur,
  fenêtre, réglages enregistrés ; menu de l'icône : 25 % et 10 % ajoutés). (3) Carte plus grande : toute la
  largeur, rangées plus serrées (54), numéros de zone sous les tronçons (pas sur un parchemin). 102/102, capture.
- 2026-11-09 (it. 257, demande 18, suite) : Familiers : sous-onglets Trouvés / À découvrir (tant que la collection
  n'est pas complète), cartes compactes (description d'ambiance en infobulle, 7 par rangée en 1920), explication
  de la barre en infobulle ⓘ. Défilement : 477 → 238 px (collection complète). 102/102, 10 langues.
- 2026-11-09 (it. 256, demande 18, suite) : Carte du Rebord sans défilement : 4 rangées de 50 zones (au lieu de 7 de
  33 : forme large, comme le panneau), titre et résumé sur une ligne, explication en infobulle, la carte prend la
  hauteur restante ; le Briseur au bout de la dernière rangée, dans le sens de la marche. Test du serpentin mis à
  jour. Captures 1920 et 1366, 102/102.
  Relevé du défilement restant par onglet (px au-delà de la hauteur du panneau, 1920 px, partie de dev) :
  Compétences, Quêtes, Ascension 0 ; Statistiques 5 ; Carte 0 (après) ; Aventure 51 ; Talents 59 ; Boutique 72 ;
  Réglages 100 ; Héros 451 ; Familiers 477 ; Bestiaire 1260 (83 fiches). Prochaines cibles : Familiers, Héros,
  Bestiaire (fiches plus compactes ou pages).
- 2026-11-09 (it. 255, demande 18, suite) : Ascension : les constellations au maximum se regroupent en une ligne de
  pastilles (effet au survol) ; la liste ne garde que celles à améliorer (sur la partie de dev : 11 pastilles et 5
  lignes au lieu de 16 lignes). Capture, 102/102, 10 langues.
- 2026-11-09 (it. 254, demande 18, suite) : Boutique en sous-onglets : Marchand (marchand, potions et élixirs,
  coffres ; par défaut) / Déblocages (compteur des déblocages achetables tout de suite) / Atelier ; la barre d'or
  et de l'étal reste en haut. L'objectif « prochain déblocage » de la carte du héros et les liens 🔒 ouvrent
  directement le sous-onglet Déblocages (data-sec, panel.js). Contrôle d'autotest, capture, 102/102.
  Reste pour la demande 18 : Ascension, Carte, Compétences (à étudier).
- 2026-11-09 (retour de Victor : « les musiques semblent aléatoires ») : elles étaient déjà fixes par zone (test),
  mais (1) le recul d'une zone après deux défaites changeait d'air, puis le retour encore : la musique ne change
  plus qu'après 6 s dans la nouvelle zone ; (2) la mélodie, une marche au hasard sur 4 mesures, ne se retenait
  pas : forme A A B A' sur 8 mesures (motif de 2 mesures joué deux fois à l'identique, pont, fin du motif), basse
  sur la grille. Test (le motif revient à l'identique ; même zone = même air ; ≥195 airs distincts), 101/101.
- 2026-11-09 (demande 26 de Victor) : son en trois réglages : « Effets sonores » et « Musique de fond » séparés
  (Réglages), et coupure générale settings.muted (bouton haut-parleur) qui rend l'état d'avant au second clic
  (sound.audio() : contexte audio pour la musique même effets coupés). Opacité de la bande : curseur horizontal
  40-100 % comme le volume (au lieu de 5 boutons). Contrôles d'autotest (bouton, effets coupés + musique, curseur
  d'opacité), capture des Réglages, 101/101, 10 langues.
- 2026-11-09 (it. 251, demande 18, suite) : sous-onglets aussi pour Statistiques (Chiffres / Succès n/N / Carnet de
  route) et Héros (Libérés / Prisonniers : les cartes des héros encore captifs ne s'affichent plus par défaut).
  Aide commune ui/subtabs.js. 100/100, 10 langues.
- 2026-11-09 (it. 250, revue générale) : simulations 12 h (record max, duo compris) : guerrier 59, mage 54,
  assassin 56 ; semaine simulée (mage) : record 155 (repère it. 202 : 152), zone 200 toujours objectif long. Texte
  russe : rien de non traduit. Capture allemand 1366 de l'onglet Héros (duo) : propre ; corrigé : le compagnon du
  duo était traduit « Begleiter », comme l'onglet des familiers : « Gefährte » (déclinaisons). Performances
  mesurées à l'it. 247 (son et musique actifs : bande 19 %, mini 6 %, icône 2 %).
- 2026-11-09 (it. 249, demande 17 étape e, fin) : « classe » → « héros » dans tout le jeu : onglet « Héros »
  (clé déjà traduite), 13 textes réécrits au même rang dans keys.js et le code (Héros actuel, Garder ce héros,
  Maître de tous les héros…) et leurs traductions dans les 9 langues (class → hero, Klasse → Held…).
  Vérifié : aucun « classe » dans le texte affiché en français (dump), i18n-check 0, 100/100. README : 20 héros en duo.
  Demande 17 terminée.
- 2026-11-09 (it. 248, demande 17 étapes b et c) : duo de héros. S.partner / S.nextPartner (défaut, migration,
  test) : un compagnon de l'autre portée (classes.js isRanged, canPartner) ; il frappe en continu (DUO.atk = 35 %
  de l'attaque du héros par seconde × l'attaque de sa classe, stat « duo », comptée hors ligne via heroDps) et
  apporte la moitié de son passif. Le premier compagnon arrive tout de suite (dès le Rôdeur, zone 10), les
  changements suivants à l'ascension (comme le héros principal ; le compagnon prévu tombe s'il devient de même
  portée). Onglet des héros : boutons « Prendre comme compagnon » / « Compagnon pour la prochaine ascension »,
  carte du compagnon encadrée, explication du duo. Bande : le compagnon marche derrière le héros ; au corps à
  corps il va au contact, à distance il tire son projectile ; sons de coup de son arme. simulate.js choisit un
  compagnon. balance 12 h : +0,1 zone (le duo vaut environ une zone de puissance, monstres ×1,28 par zone).
  Fuzz 600, save-fuzz, 158 tests, 100/100, 10 langues, captures.
  Reste (demande 17 e) : textes « classe » → « héros » dans tout le jeu.
- 2026-11-09 (it. 247, demande 24 de Victor) : musique de fond par zone (render/music.js), générée : graine par zone
  → gamme (mineure pour les décors sombres, majeure sinon), tempo 84-130, grille d'accords, mélodie (degrés
  voisins, silences, refrain repris) ; onde carrée douce + basse triangulaire + charleston de bruit, volume bas ;
  200 airs différents (test : ≥195 mélodies distinctes, même zone = même air). Fondu enchaîné de 2,5 s au
  changement de zone. Suit le bouton son ; case « Musique de fond » dans les Réglages (activée par défaut).
  Planification en avance sur l'horloge audio. perf (son et musique actifs) : bande 19,1 %, mini 5,7 %, icône
  2,3 % (avant, son coupé : 16,8 / 3,7 / 0,5). Non écoutable ici : à valider par Victor. 99/99, 10 langues.
- 2026-11-09 (it. 246, demande 25 de Victor) : sons de coup variés (sound.js hit) : un timbre par arme pour les 20
  héros (lame, contondant, lance, arc, feu, glace, ombre, sacré, notes du barde) et une matière par ennemi (mou :
  plus grave + « splotch », dur : plus aigu + clac, volant, chair), plus un léger désaccord aléatoire ; critique
  plus fort et plus clair. Test (chaque héros a son timbre ; variantes de monstres reconnues), 99/99.
  Non vérifiable à l'oreille ici (pas de sortie audio) : à valider par Victor.
- 2026-11-09 (it. 245, demande 22 de Victor) : héros bloqué : 4 défaites près du record en 15 min (game.stuckInfo,
  comme le conseil « stuck » et l'Astrolabe). Bulle de 2 min avec les deux pistes les plus utiles (équiper mieux,
  talents, potions, ascension, farmer plus bas ; stuckTips), un clic ouvre le panneau ; « ⚠ bloqué » en rouge
  dans la pastille de zone de la bande ; liseré rouge sur l'encart mini. L'alerte tombe dès que le record avance
  (wallDeaths vidé). Une seule bulle par record. Test, capture, fuzz 600 parties, 99/99, 10 langues.
- 2026-11-09 (demande 23 de Victor) : son activé par défaut (parties neuves ; les parties d'avant passent une fois
  au son activé, settings.soundOn2, puis le choix est respecté ; test) et bouton haut-parleur à côté de réduire /
  agrandir, dans la bande et en mode mini (ondes / croix rouge quand coupé, un clic). Place réservée à droite de la
  bande : 3 boutons (rightReserve 96) ; mode mini élargi à 370 px pour garder le niveau lisible. Texte des Réglages
  adapté. 10 langues, contrôle d'autotest (bouton son, ordre des boutons, largeur du mini), captures, 99/99.
- 2026-11-09 (it. 243, demande 21 de Victor, Odyssey G9 5120 px) : au-delà de 2400 px de large, la bande regroupe au
  milieu la pastille de zone, la pastille or / niveau et les boutons (strip.js centerHud, placeTab) ; une
  languette cliquable (#hud-tab, .hit) posée sur les pastilles déplie le panneau. Pièces et butin filent vers le
  milieu ; les bulles du héros évitent le bloc central ; les bulles d'information sont centrées aussi. Écrans
  ordinaires inchangés (capture 1920). Captures 5120 px. 98/98.
- 2026-11-09 (it. 242, demande 18, début) : Bestiaire en sous-onglets : une seule section affichée (monstres par
  défaut, puis collection, pouvoirs, panoplies, capacités des boss, élites ; les sections pas encore rencontrées
  restent cachées), le dernier choix est gardé ; plus de longue page à faire défiler. Contrôle d'autotest, 98/98.
- 2026-11-09 (it. 241, demande 20 de Victor) : blason de la guilde (onglet Quêtes) à la place de l'amulette :
  écu écartelé azur et gueules, épées croisées sur une gemme, couronne (shopart.js CREST). Le métal (bordure,
  couronne, gemme) suit le rang : bronze, argent, or, améthyste, étoile. 10 langues (texte alternatif), 98/98.
- 2026-11-09 (it. 240, demande 19 de Victor) : plus d'œufs de familier avant l'onglet Familiers (zone 25 ; avant,
  inutilisables) : quêtes (y compris la récompense spéciale 3 étoiles), boss, élites et œuf de la boutique
  (tabs.js eggsAllowed). Une quête déjà tirée qui promettait un œuf le remplace par un coffre (affichage et
  réclamation, fixQuestEgg). Autres récompenses vérifiées : éclats d'étoile déjà réservés aux joueurs ascensionnés ;
  élixirs, potions et coffres utilisables tout de suite. Test, 98/98, save-fuzz.
- 2026-11-09 (it. 239, demande 17 étape a) : 20 héros. 10 nouveaux, libérés tous les 14 zones de 66 à 192, en
  alternant distance / corps à corps (10 + 10 au total) : Arbalétrière 66 (carreaux jumeaux, boss), Lancier 80
  (allonge : premier coup ×2, esquive), Prêtresse 94 (bouclier, régénération), Gladiatrice 108 (riposte, vol de
  vie), Chaman 122 (esprit-loup, épines), Danseuse de lames 136 (frappe double, enchaînement, esquive),
  Cryomancienne 150 (critiques, boss), Barde 164 (or, expérience, vitesse), Gardien des étoiles 178 (bouclier,
  exécution, boss), Artificière 192 (brûlure, exécution). Sprites propres (têtes, 10 nouvelles armes, palettes),
  6 nouveaux projectiles (carreau, lumière, esprit, glace, note, bombe). Arbres de talents et voies copiés d'un
  héros proche avec identifiants préfixés (classes.js tree/treePrefix ; talents.js), noms déjà traduits.
  Équilibrage : record en 12 h de 57 à 62 pour les 10 nouveaux (anciens : 55 à 57) ; fuzz 1200 parties (20
  héros) : 0 bloquée ; save-fuzz ok ; 152 tests ; 98/98 (carte : 19 cages). 40 textes × 9 langues.
  Attention mesure : la colonne « best » de simulate.js est le record de la course en cours (remis à zéro à
  l'ascension) ; prendre le maximum sur les heures, et filtrer le 1er tableau (le second, des courses, trompait).
- 2026-11-09 (it. 238) : le ciel de nuit de la bande suit l'histoire (« depuis, la nuit n'a plus d'étoiles ») :
  15 % des étoiles au début, chaque chronique en rallume (positions fixes, les nouvelles s'ajoutent), plein ciel
  (×1,3, grosses étoiles dorées) après la victoire sur le Briseur. Décor redessiné quand une chronique s'ajoute.
  Contrôle d'autotest, captures de nuit, 98/98.
- 2026-11-09 (it. 237) : --dump-text n'extrayait pas l'onglet Carte (liste d'onglets de main.js) : ajouté. Chasse
  aux textes non traduits sur la carte en russe : 794 lignes propres, et ses 217 infobulles (zones, boss, chroniques,
  héros, Briseur) ne contiennent aucun mot latin.
- 2026-11-09 (it. 236) : --crawl après les gros changements d'interface (carte, voyage, détail d'objet) : l'onglet
  Carte manquait à la liste et ses zones SVG étaient ignorées (pas d'offsetParent, pas de click()) : ajoutés
  (getClientRects, événement de clic). 291 clics, aucune erreur. CLAUDE.md : --crawl avec --exit-after=200.
- 2026-11-09 (demande 16 de Victor, écran Samsung Odyssey) : le panneau s'étendait sur toute la largeur de l'écran,
  avec de grandes bandes sombres vides de chaque côté du contenu (limité à 1840 px). Premier essai (contenu sur
  toute la largeur) annulé : Victor voulait garder la largeur du contenu et seulement que le panneau ne prenne
  que la place nécessaire. Fait : au-delà de 2000 px d'écran, le fond du panneau se limite à son contenu (1878 px,
  centré, bordures latérales) ; les côtés de la fenêtre restent transparents, le bureau se voit et se clique
  (le rectangle .hit du panneau se resserre). Écrans ordinaires : inchangés (vérifié au pixel en 1920 et 3440).
- 2026-11-09 (it. 235) : « clic : passer » des cinématiques ne marchait qu'en autotest : la bande laisse traverser
  les clics hors des éléments .hit (ui/clickthrough.js), et le calque des cinématiques n'en était pas ; un vrai clic
  partait sur le bureau. Le calque est maintenant .hit, et les zones cliquables de la fenêtre sont recalculées à son
  apparition et à sa disparition (juice.onHits). Contrôle d'autotest complété, 97/97.
  Leçon : element.click() ne passe pas par le filtre des clics de la fenêtre ; pour tout nouvel élément cliquable
  de la bande, vérifier qu'il porte .hit.
- 2026-11-09 (it. 234) : vérification du rythme après la demande 14 (sac plein = butin au sol) : early-pace donnait
  zone 18 à 60 min (avant : 23-24) car le script ne vendait jamais : sac plein dès 30 min, toutes les améliorations
  perdues. Avec une vente par minute (joueur réel) : zone 23, comme avant. Le comportement voulu par Victor est
  gardé, mais un joueur qui ne trie pas son sac stagnait sans le savoir (sous la zone 20 de l'ascension) : bulle
  « 🎒 Sac plein : une amélioration est restée au sol (X) ! » (au plus une toutes les 3 min, clic : ouvre le sac) ;
  événement lostUpgrade testé. early-pace vend désormais une fois par minute (commentaire). 97/97, 10 langues.
- 2026-11-09 (it. 233) : cinématiques en file : en zone 10, la libération du Rôdeur et la première chronique
  arrivaient dans la même seconde et la seconde cinématique remplaçait la première (jamais vue). Une cinématique
  lancée pendant une autre attend maintenant sa fin (file de 3 au plus) ; le générique passe en tête après la
  victoire. Contrôle d'autotest de la file, 97/97.
- 2026-11-09 (it. 232) : README à jour : histoire (intro, chroniques, Briseur d'Étoiles, fin, cinématiques), Carte du
  Rebord et Carte du voyageur ; 19 déblocages (zones 8 à 200).
- 2026-11-09 (it. 231) : la carte sert aussi au jeu : déblocage « Carte du voyageur » (zone 22, 90 000 or, entre
  Atelier et Ménagerie ; prix selon la formule des autres) : un clic sur une zone déjà atteinte dans la course y
  emmène le héros (setZone ; infobulle « Clic : y aller », liseré vert au survol). Avant l'achat, la carte l'annonce
  (« Bientôt : … ») et les boutons Zone précédente / suivante restent là. Test logique, contrôle d'autotest (clic
  réel sur une zone), 96/96, 10 langues.
- 2026-11-09 (it. 230, revue générale) : simulations 12 h : guerrier 54, mage 58, assassin 60 (identiques à it. 220) ;
  perf:linux : bande 16,8 % d'un cœur, panneau 18,1 %, mini 3,7 %, icône 0,5 % ; 570 à 680 Mo. Rendu du panneau :
  Carte 1,6 ms, Aventure 9,3 ms, Statistiques 0,9 ms (la carte SVG ne coûte rien). Textes non traduits (russe) :
  aucun. Capture allemand 1366 px de la Carte : onglets, résumé, carte : propres. Rien à corriger.
- 2026-11-09 (it. 229, suite de la demande 12) : détail d'un objet sous le sac compacté : verdict (puissance du héros)
  et boutons (Équiper, Vendre, Réforger, Forger) juste sous le nom, visibles sans défiler ; statistiques ensuite,
  serrées (13 px) ; la note de forge devient l'infobulle du bouton Forger. Capture, 95/95.
- 2026-11-09 (it. 228, demande 15) : cinématique « héros libéré » (5 s, remplace la bannière) : la bande s'assombrit
  en vert, le héros apparaît dans sa cage, les barreaux remontent (cliquetis de serrure), étincelles, « X est
  libre ! », « Un héros de plus marche sur le Rebord. », fanfare courte. La bulle « choisis-le dans l'onglet
  Classe » vient après (5,2 s). En mode mini : son seul, comme avant. Autotest (6 cinématiques), 95/95, captures.
  Demande 15 : intro, chroniques, héros libérés, arrivée et victoire du Briseur, générique : faits.
- 2026-11-09 (it. 227) : carte du Rebord, peaufinage : captures d'une partie jeune (zone 14) en thème clair, haut
  et bas de la carte (brouillard, parchemins « ? », Briseur au bout) : propres. Corrigé : le héros chevauchait la
  cage d'un prisonnier voisin (zone ±1) : il se hisse au-dessus, relié à sa zone par un trait doré. Test du
  serpentin (mapPos). 141 tests, autotest.
- 2026-11-09 (it. 226, demande 13 de Victor) : Carte du Rebord, nouvel onglet (ui/tabs/map.js, ouvert en zone 12,
  entre Classe et Bestiaire ; raccourci « - », Réglages passent à « = » ; l'Aventure prend l'icône d'épée, la Carte
  celle de la carte). SVG en pixels : une rangée par boucle des 33 décors, en serpentin jusqu'à la zone 200, chaque
  zone un tronçon ciel + sol aux couleurs de son décor ; liaisons dorées entre rangées parcourues. Repères : héros
  prisonniers (portrait en cage à la zone de leur boss, encadré d'or une fois libéré), chroniques (parchemin ou
  « ? »), héros habillé à sa zone, drapeau du record, forteresse du Briseur d'Étoiles au bout (grisée une fois
  vaincu) et « Au-delà du Rebord : zone N » ensuite. Ciel : 6 étoiles par chronique découverte, rempli après la
  victoire. Brouillard au-delà du record (les 3 zones suivantes se devinent). Infobulle au survol : zone, décor,
  boss, texte de la chronique, héros. Résumé : record / 200, héros libérés, chroniques. Toujours sombre (image).
  tab-pace : talents 1, quêtes 5, boutique 8, classe 10, carte 12, bestiaire 14 min. Autotest 95/95, captures.
- 2026-11-09 (it. 225, demande 15) : cinématique de chronique (5 s) : la bande s'assombrit, le ciel montre une
  étoile par chronique déjà découverte (positions fixes d'une fois à l'autre), la nouvelle s'allume au centre ;
  « 📜 Titre » et « Chronique n / 9 », trois notes cristallines. Le ciel se rallume ainsi peu à peu jusqu'à la
  victoire. Pas pour « Le ciel rallumé » (déjà mis en scène), une seule à la fois. Autotest (5 cinématiques), 94/94.
- 2026-11-09 (it. 224, demandes 11 et 15) : fin et introduction en cinématiques. juice.cinematic généralisé (textes
  en « pages » titre + sous-titre). « intro » au tout premier lancement (ciel étoilé qui se brise, éclats qui tombent
  sur le Rebord, « SILLWALKER », 7 s, son : tintement puis fracas et accord grave), suivie des trois bulles de
  l'histoire (conseils retenus 9 s). « dawn » enchaîne sur « credits » : générique personnalisé sur le ciel rallumé
  (héros libérés, ascensions, monstres vaincus, temps de jeu, « Imaginé par Victor Basset », « Merci d'avoir
  joué ! », « Le voyage continue au-delà du Rebord… », ~17 s, mélodie douce). Succès Steam STARBREAKER « Le ciel
  rallumé » (README : à déclarer dans Steamworks). Autotest : les 4 cinématiques ; deux contrôles de bulles
  devenaient faux avec le temps (annonces d'arrivée restées en file, même sur le commit précédent) : file vidée
  avant eux (window.__clearToasts). 10 langues, test, captures, 94/94.
- 2026-11-09 (it. 223, demandes 11 et 15) : le Briseur d'Étoiles a sa silhouette (STARBREAKER_ART, art-monsters2.js :
  titan en armure, couronne d'éclats, cape de nuit étoilée, yeux cyan, éclat brandi ; taille de boss dans la bande,
  normale en mode mini, halo violet). Deux petites cinématiques dans la bande (juice.js cinematic, une seule pièce
  animée, canevas à 15 images/s, un clic les passe) : « arrive » (zone 200 atteinte : la bande s'assombrit, éclairs
  violets, le ciel se fissure au-dessus de lui, titre « LE BRISEUR D'ÉTOILES », 5 s, son « doom » : grondement et
  accords graves) et « dawn » (première victoire : nuit, 70 éclats remontent de sa dépouille et se fixent en étoiles
  qui scintillent, « Le ciel se rallume », « Les héros sont libres. », 12 s, son « dawn » : arpège, accord tenu,
  étoiles qui tintent). Elles remplacent les bannières de l'it. 222.
  Bug trouvé et corrigé : depuis l'it. 221, le bloc « objet laissé au sol » avait été inséré dans l'animation des
  pièces d'or (première ligne identique du fichier) : chaque pièce levait une ReferenceError et l'objet ne clignotait
  pas. Garde-fous ajoutés : l'autotest compte toute erreur de l'interface comme un échec (vérifié avec une erreur
  provoquée : 93/94, sortie 1), et scripts/check-comments.mjs (dans npm test) repère un « // » qui avale du code
  (arrivé trois fois, deux fois dans cette itération). Autotest 94/94, captures des deux cinématiques.
- 2026-11-09 (it. 222, demande 11 étape c) : le Briseur d'Étoiles, boss final de la zone 200 (story.js FINAL_BOSS :
  PV ×2,5 et attaque ×1,25 par rapport à un boss ordinaire, capacités coup dévastateur + miroir + fureur ; nom et
  capacités fournis par bosses.js, donc identiques dans la bande et le panneau Zone). Halo violet dans la bande.
  Arrivée en zone 200 : bannière « Le Briseur d'Étoiles t'attend ! ». Première victoire : S.story.won (+ wonAt),
  étape du Carnet, bannière dorée, son, moment en mode mini, et 9e chronique « Le ciel rallumé » (l'épilogue court) ;
  le jeu continue en zone 201. Victoires suivantes : une simple ligne. Test, migration, save-fuzz, fuzz 600/0, 92/92.
  À faire (étape d + demande 15) : vraie silhouette du Briseur, cinématique de la bande, générique de fin, succès.
- 2026-11-09 (it. 221, demande 14 de Victor) : sac plein : le butin reste au sol, perdu (plus de vente ni d'échange
  automatique). Animation : l'objet retombe, clignote puis s'efface au lieu de voler vers le sac. Journal : ligne
  cumulée « Sac plein, objets laissés au sol : n. » ; un légendaire ou une amélioration perdu a sa propre ligne.
  Le Valet d'armes équipe quand même une amélioration (l'ancienne pièce reste au sol, le sac ne déborde pas) ;
  la vente automatique (autoSell) passe avant. Réclamer une quête reste possible sac plein (inchangé). Textes du
  sac et de « À faire » adaptés. 10 langues, tests réécrits, 92/92, fuzz 600/0, balance +0,0.
- 2026-11-09 (it. 220, revue générale) : simulations 12 h : mage 58, guerrier 54, assassin 60 (stable, ±1,5 de bruit) ;
  perf:linux : bande 16,9 % d'un cœur, panneau 18,2 %, mini 3,9 %, icône 0,4 % ; 560 à 680 Mo. Chasse aux textes
  non traduits (russe) : rien. Captures allemand + thème clair (Chroniques, détail sous le sac) : propres. Corrigé :
  pouvoir d'un objet « ★ Nom : effet » gardait l'espace française avant « : » dans les autres langues (fsp()).
- 2026-11-09 (it. 219, demande 11 étape b) : Chroniques : 8 fragments d'histoire (story.js CHRONICLES : ciel brisé,
  premier captif z10, éclats z25, renaissance 1re ascension, Bastion noir z50, au-delà des cartes z100, ciel fissuré
  z150, le seuil z190). Annoncés une seule fois (bulle 📜 cliquable → panneau, bloc déplié ; moment en mode mini),
  relisibles dans la carte du héros (bloc repliable « 📜 Chroniques (n / 8) », la plus récente en tête). Migration :
  chroniques déjà méritées marquées lues (pas de rafale). 10 langues, test, autotest 92/92, save-fuzz, capture.
- 2026-11-09 (it. 218, demande 12 de Victor) : clic sur un objet : son détail s'ouvre dans le panneau Sac, sous la
  grille, à la place des commandes (vente, transmutation, options) qui reviennent avec « ← sac » ; le panneau
  Équipement reste toujours affiché. itemDetailHTML (panel.js). Contrôle d'autotest (91/91), capture. À voir : le
  détail est long (boutons Équiper/Vendre/Forger sous la ligne de flottaison à 620 px) : le compacter si Victor
  le trouve gênant (statistiques sur deux colonnes, note de forge en infobulle).
- 2026-11-09 (it. 217, demande 11 étape a) : histoire, introduction : game/story.js (FINAL_ZONE 200, INTRO), S.story
  { intro, read } (défaut, migration : parties entamées sans intro surgie, gardé à l'ascension). Au tout premier
  lancement, trois bulles 📜 sur la bande (Briseur d'Étoiles, le Rebord, les héros prisonniers, but : zone 200) ; les
  conseils attendent que la file de bulles soit vide. 10 langues, test, save-fuzz, capture, 90/90.
- 2026-11-09 (it. 216) : après la baisse du butin, vérifié : la quête « Trouver N objets rares ou mieux » reste
  rapide (36-45 rares+ par heure grâce aux boss et élites, 4e en 3-4 min) : rien à changer. « Chances de butin »
  (onglet Aventure) affiche maintenant la chance réelle, rythme du tout début compris (avant : 12 % même quand le
  début la réduisait à ~4 %). 90/90.
- 2026-11-09 (it. 215, demande 10 de Victor) : moins d'objets : DROP_CHANCE 0,35 → 0,12 (monstres ordinaires ; boss et
  élites gardent leur butin garanti). early-pace : 207 → 115 objets la première heure (−45 %) ; balance 12 h : −1,2
  zone (bruit) ; essai intermédiaire à 0,18 : 139 objets, −0,6 zone. Fuzz 600, 90/90.
- 2026-11-09 (demande de Victor : distinguer les textes qui expliquent le jeu) : l'italique ne s'affiche pas avec la
  police pixel (ni font-style, ni oblique synthétisé : vérifié en capture) ; les paragraphes d'aide (p.note,
  p.tabintro, sauf avertissements) ont un fin trait en marge à gauche. Captures talents, réglages, bestiaire. 90/90.
- 2026-11-09 (it. 214) : infobulles de la bande : ses boutons (réduire, panneau…) avaient des title jamais affichés
  (fenêtre sans focus) ; infobulle maison juste au-dessus de l'élément survolé (.gtip.stip, toujours sombre comme la
  bande). Contrôle d'autotest (90/90). Nouvelle demande de Victor notée : trop d'objets tombent encore (au-delà du
  tout début).
- 2026-11-09 (it. 213) : vérifié : le menu de l'icône (processus principal) suit la langue détectée d'une partie
  neuve (api.setLang au démarrage). CLAUDE.md : captures d'une partie neuve dans une langue avec --lang=xx-YY.
- 2026-11-09 (it. 212) : une partie neuve démarrait toujours en anglais : elle prend désormais la langue du système
  (navigator.languages : fr-FR → fr, pt-BR → pt… ; anglais à défaut). systemLang (i18n/index.js), test, capture
  avec --lang=fr-FR (panneau en français, « fr » enregistré). 89/89.
- 2026-11-09 (it. 211) : avant la boutique, la carte du héros affiche « Prochaine découverte : zone N (x / N) » (zone
  du prochain onglet, nom gardé secret) avec sa barre, au lieu de rien. 10 langues, capture partie neuve, 89/89.
- 2026-11-09 (it. 210, revue générale + 2 retours de Victor) :
  1. L'Œil du connaisseur s'achetait (carte du héros) avant l'ouverture de la boutique : aucun déblocage n'est plus
     proposé tant que la boutique est fermée (carte du héros, mode mini), et les premiers commencent avec elle
     (Œil zone 8, Ceinture 9, Enclume 11).
  2. Les infobulles du système (title) ne s'affichent pas dans cette fenêtre sans focus : nouvelle infobulle maison
     (watchTitles, panel.js) pour tout élément du panneau à title (déblocages et 33 autres endroits), suit la souris,
     tient compte du défilement. Capture : survol de « Enclume » → « Forge (+1 à +10) et reforge des objets. ».
  Revue : simulation 12 h guerrier 59, mage 61, assassin 59 (simulateur qui forge, it. 202) ; russe propre ; crawl
  partie neuve 0 erreur. 2 contrôles d'autotest (89/89).
- 2026-11-09 (it. 209, signalé par Victor) : le lien « N points de talent à dépenser → » de la carte du héros
  apparaissait avant l'ouverture de l'onglet Talents (point gagné au niveau 2, souvent avant la zone 2) ; de même
  « Plus de potions : la boutique en vend → » avant la Boutique (zone 8). Les deux vérifient l'onglet, et tout lien
  interne (.linkbtn, .goal) vers un onglet fermé est caché par renderBadges. Contrôle d'autotest (il échoue sans la
  correction : vérifié). 87/87. Mesuré au passage : premier déblocage (300 or et zone 3) vers 6-8 min.
- 2026-11-09 (it. 208) : liste des idées du journal remise à jour (performance aux chiffres récents ; progression
  lointaine marquée résolue, avec la piste suivante).
- 2026-11-09 (it. 207) : grands paliers de record (zones 50, 100, 150, 200…) : bannière dorée « ✦ Cap franchi : zone
  N ! », son des grandes occasions, même texte en mode mini (les autres records restent sobres). 10 langues, contrôle
  d'autotest (86/86).
- 2026-11-09 (it. 206) : contrôle de fond après les changements de fin de partie : fuzz 120 graines × 60 min = 1200
  parties, 0 bloquée ; save-fuzz 20/20. CLAUDE.md : tab-pace.mjs et la semaine simulée (fin de partie) documentés.
- 2026-11-09 (it. 205) : Carnet de route : record de zone noté tous les 5 jusqu'à la zone 50, puis tous les 10
  (sinon 40 entrées de record d'ici la zone 200). journeyZoneStep (game.js), test, README, 85/85.
- 2026-11-09 (it. 204) : boutique : seuls les déblocages disponibles et les 2 suivants sont présentés en cartes ; les
  plus lointains (jusqu'à la zone 200) tiennent en une carte « Encore N déblocages plus loin » (avant : tous, jusqu'à
  la zone 200). 10 langues, capture, 85/85.
- 2026-11-09 (it. 203) : zones et boss lointains lisibles : au-delà de deux boucles, « +N » au lieu d'une suite de
  « + » (zone 200 : « Grotte suintante +6 » au lieu de « ++++++ » ; boss « l'Ancestral +5 »). loopMark (rules.js).
  Test, 85/85.
- 2026-11-09 (it. 202) : le bond vers la zone 100 (it. 201) était un artefact de simulation : il suivait l'achat du
  Maître de forge (89 → 137 juste après), car le joueur simulé ne forgeait jamais à la main. simulate.js forge
  désormais l'équipement porté toutes les 10 min (réserve de 4× le coût), comme un joueur : semaine du mage régulière
  (66 → 80 → 99 → 116 → 137 → 152, 155 au mieux). Jeu inchangé. Note : balance.mjs compare désormais un simulateur
  qui forge (écarts avec les commits antérieurs à prendre avec prudence).
- 2026-11-09 (it. 201) : fin de partie vérifiée sur des classes plus fragiles (semaine simulée) : mage 144, nécromancien
  143 (guerrier 161) : plus de mur vers 71. Bond vers la zone 100 (99 → 137 en quelques courses), sans doute un
  déblocage de ce palier (Valet d'armes ?) : non vérifié, à surveiller. La carte du héros montre déjà la progression
  vers un déblocage lointain (« Zone record 115 (53 / 115) » et barre) : rien à changer.
- 2026-11-09 (it. 200, revue générale) : README à jour (déblocages étalés jusqu'à la zone 200, section Fin de
  partie). Simulation 12 h : guerrier 53, mage 53, assassin 54 (−4 à −8 zones, déblocages plus tardifs, voulu ; la
  semaine simulée atteint la zone 161). Texte russe sans mot latin non traduit. Performance stable (bande 18 %,
  panneau 18 %, mini 3,5 %, icône 0,4 %). Capture boutique correcte. Rien d'autre à corriger.
- 2026-11-09 (it. 199, demande 8 de Victor, 3e partie) : 18 déblocages de boutique étalés jusqu'à la zone 200
  (Œil 3, Ceinture 6, Enclume 10, Tri 14, Atelier 18, Ménagerie 25 avec l'onglet Familiers, Manuel 32, Bureau 40,
  Chenil 50, Nid 60, Creuset du transmutateur 72, Grimoire 85, Valet 100, Maître de forge 115, Filet 130, Astrolabe
  150, Grand intendant 170, Creuset perpétuel 200) ; prix ≈ or d'un monstre × (100 + 8 × zone). Déjà achetés :
  gardés. Semaine simulée (guerrier) : record 161, Valet ~3,75 j, Astrolabe ~5,6 j. balance 12 h : −4 zones (54,0
  contre 58,0 : automatismes plus tardifs, voulu). Tests et contrôle d'autotest adaptés, fuzz 600, 85/85.
- 2026-11-09 (it. 198, demande 8 de Victor, 2e partie) : fin de partie jusqu'à la zone 200. Cause du mur vers 71 :
  objets linéaires (il) contre monstres ×1,28 par zone. zoneMight(z) (rules.js) : ×1,28 jusqu'à la zone 60, puis
  facteur par zone décroissant en 10 zones jusqu'à ×1,04. Essais (simulation 1 semaine, guerrier, records des
  dernières courses) : avant 71-72 ; polynôme (z/60)^3 : 207-279 mais saut 65 → 99 ; 80 zones → 1,08 : ~71-74 ;
  30 → 1,10 : ~74-80 ; 15 → 1,08 et 20 → 1,05 : ~80-89 ; 20 → 1,03 : ~81-99 ; retenu 10 → 1,04 : progression
  régulière 71 → 81 → 93 → 107 → 116 → 126 → 135 en une semaine (zone 200 en quelques semaines). 12 h inchangées
  (balance 58,0 = 58,0), fuzz 600, test (continuité, pas de saut), 85/85. Prochaine étape : répartir les déblocages
  de boutique jusqu'à la zone 200.
- 2026-11-09 (it. 197, demande 9 de Victor) : boutons dans le même ordre partout, comme les fenêtres : réduire à
  gauche, agrandir à droite (le mode mini était inversé). Symboles harmonisés : ▁ pour toute réduction (bande → mini,
  mini → icône), □ pour agrandir en bande, ⌃ reste l'ouverture du panneau. Astuces (💡) affichées aussi le panneau
  ouvert. Autotest : astuces coupées pendant les contrôles (window.__noHints, dev), 2 contrôles ajoutés (85/85).
  Captures bande et mini.
- 2026-11-09 (it. 196, demande 8 de Victor, 1re partie) : onglets ouverts selon le record de zone (toutes courses),
  espacés : Talents 2, Quêtes 5, Boutique 8, Classe 10 (premier héros libéré), Bestiaire 15, Ascension 20, Familiers
  25, Compétences 30, Statistiques 40. Mesuré (nouveau scripts/tab-pace.mjs, 3 graines) : 1, 5, 8, 9-10, 13-14,
  18-20, 24-34 min, Compétences 1 h 10 à 2 h 15, Statistiques après la 1re ascension (avant : tout en ~10 min).
  Tests adaptés (seuils), 10 langues (texte des Familiers), 83/83. Mesure préalable : sur une semaine simulée, le
  record plafonne vers la zone 71-72 : la zone 200 demande de revoir la fin de partie (2e partie de la demande).
- 2026-11-09 (it. 194) : mémoire dans la durée mesurée : 698 → 719 Mo puis 712 Mo sur 6 min en accéléré ×10
  (≈ 1 h de jeu), sans croissance continue : pas de fuite. Nouveau scripts/mem-watch.sh pour refaire la mesure
  (documenté dans CLAUDE.md).
- 2026-11-09 (it. 193, revue générale) : simulation 12 h stable (61 / 56 / 54), texte russe : plus aucun mot latin
  hors noms propres, Esc et DEV (chasse élargie aux mots courts), performance stable (bande 17 %, panneau 20 %,
  mini 4 %, icône 0,5 %), captures familiers en coréen (« (최대) », « 2시간 31 » : durées et max traduits) et mini EN.
  Rien à corriger.
- 2026-11-09 (it. 192) : processus principal (menu de l'icône, dialogues) vérifié : aucun texte en dur hors outils de
  dev. Accessibilité : focus clavier visible ajouté aux blocs repliables (summary : « À faire », « Toutes les
  statistiques »…) et aux éléments tabindex. Contrôle d'autotest de la règle (un focus() par script n'active pas
  :focus-visible : contrôle de comportement impossible ainsi). 83/83.
- 2026-11-09 (it. 191) : chasse aux mots latins en chinois et japonais : « max » en dur à trois endroits (raccourci
  des talents, atelier de la boutique, « (max) » des familiers) : nouvelle clé « max » (макс., 最大, máx.…). En
  japonais, « HP », « Lv », « pt » sont des choix de traduction (usage des jeux) : laissés. Capture russe des
  talents (« макс. » tient dans la pastille). 82/82.
- 2026-11-09 (it. 190) : chasse aux mots latins courts (2-3 lettres, ignorés jusqu'ici) dans le texte russe :
  « oui » en dur (second souffle, statistiques du héros) et unités de durée « h / min / s » en dur à 8 endroits
  (résumé d'absence, expéditions, boutique, buffs, statistiques) ; nouvelles clés « {0} h », « {0} min », « {0} s »,
  « oui » et fonctions uH, uMin, uS, durText (format.js). Russe : « 15 мин 00 », « да ». Restent « max » (bouton
  international), « Esc » (touche), « DEV » (absent de la version distribuée). 82/82. À faire désormais : la chasse
  au texte non traduit inclut les mots de 2-3 lettres.
- 2026-11-09 (it. 189) : l'unité « pts » des chances de critique (describeEffects) restait en français dans toutes
  les langues (« +8 pts шанс крита » en russe) : elle passe par le pluriel traduit « {n} pt|{n} pts » (« +8 оч. »,
  « +8 Pkt. » ; en français « +1 pt » au singulier). Vérifié dans le texte russe extrait (0 « pts »). Recherche des
  autres textes accentués hors tx() : rien d'autre. 82/82.
- 2026-11-09 (it. 188) : Talents : le seuil des talents et de la voie verrouillés affichait « pts » en dur (français)
  dans toutes les langues (« 🔒 5 pts » en allemand, à côté de « 0 Pkt. ») : passé par txn (« 5 Pkt. »). Captures
  allemand 1366 px (Statistiques, Talents) sans débordement. 82/82.
- 2026-11-09 (it. 187) : mode mini : la ligne de retour d'absence mentionne aussi l'étape du carnet franchie
  (« · ✦ Niveau 25 atteint »). Contrôle d'autotest des étapes dans le résumé et la bulle (82/82).
- 2026-11-09 (it. 186) : la bulle de retour d'absence (bande) annonce aussi l'étape du carnet la plus récente franchie
  hors ligne, sur une deuxième ligne (« ✦ Niveau 25 atteint »). Capture, 81/81. Construction Windows impossible ici
  (pas de Wine sur le serveur).
- 2026-11-09 (it. 185) : résumé de retour d'absence : les étapes du Carnet de route franchies hors ligne y figurent
  (« ✦ Niveau 25 atteint »…, en couleur d'accent). Test, capture, 81/81.
- 2026-11-09 (it. 184) : Carnet de route : la première complétion de chaque panoplie y est notée (« Panoplie
  complétée : X »). Test, 10 langues, 81/81.
- 2026-11-09 (it. 183, revue générale) : simulation 12 h (guerrier 61, mage 56, assassin 54), texte russe sans mot
  non traduit, performance stable (bande 19 %, panneau 21 %, mini 4 %, icône 0,4 %), capture Statistiques en chinois
  (Carnet de route correct, date au format chinois). Rien à corriger.
- 2026-11-09 (it. 182) : Carnet de route : une partie déjà entamée (sauvegarde sans carnet) reçoit à la migration une
  première entrée « Début du carnet : niveau X, record zone Y » datée du jour, au lieu d'un carnet vide. Test,
  10 langues, capture, 81/81.
- 2026-11-09 (it. 181) : Carnet de route dans les Statistiques : grandes étapes datées (niveaux 10/25/50/100…, record
  tous les 5 zones, premier légendaire, héros libérés, ascensions ; niveaux gagnés hors ligne compris). S.journey
  (120 au plus), gardé à l'ascension, migration (entrées illisibles retirées), test, save-fuzz 20/20, 10 langues,
  capture. Les parties existantes commencent un carnet vide. 81/81, fuzz 600.
- 2026-11-09 (it. 180) : README à jour des changements du début de partie (élites dès la zone 3 en première course,
  quêtes toujours faisables, information progressive dans les onglets, annonce en mode mini).
- 2026-11-09 (it. 179) : mode mini : un onglet débloqué s'annonce sur la scène (« ✦ Nouvel onglet : X ! », moment
  doré de 4 s) : la bulle de la bande n'y est pas visible. Noms d'onglets ajoutés à TAB_GATES (label). Contrôle
  d'autotest (81/81). Vérifications de fond après les changements du début de partie : fuzz 120 graines × 60 min =
  1200 parties, 0 bloquée ; simulation 48 h guerrier saine.
- 2026-11-09 (it. 178) : Talents : les panneaux Voie et Maîtrises n'apparaissent qu'à 10 points de leur seuil (30 et
  40 points dépensés) ou une fois la voie choisie ; avant, une ligne annonce l'objectif (« Plus tard : une voie dès
  30 points dépensés, des maîtrises dès 40. »). Capture d'un joueur à 0 point dépensé, 10 langues, 80/80 deux fois (contrôle « progression de panoplie »
  fiabilisé : la pièce de test prend une panoplie différente de celle portée à cet emplacement).
- 2026-11-09 (it. 177) : save-fuzz couvre les nouvelles données (onglets ouverts illisibles ou non-objet, thème
  illisible) : 19/19 ; crawl sur la sauvegarde cumulant les 19 corruptions : 135 clics, 0 erreur. CLAUDE.md : piège
  du commentaire // qui avale la fin d'une ligne.
- 2026-11-09 (it. 176) : pastilles d'onglet plafonnées à « 99+ » (« 686 » points de compétence élargissaient
  l'onglet ; le nombre exact reste dans l'onglet). Capture, contrôle d'autotest (80/80).
- 2026-11-09 (it. 175) : résumé d'absence : « Objets gardés » affichait 0 dès que le sac était plein (différence de
  taille du sac, alors que de meilleurs objets remplaçaient les moins bons), tout en citant un « Meilleur butin ».
  Compte désormais les objets nouveaux dans le sac (remplacements et coffres compris). Test. 79/79.
- 2026-11-09 (it. 174) : le résumé de retour d'absence s'ouvrait défilé jusqu'en bas (le focus sur « Continuer »
  faisait défiler la fenêtre) : titre « Pendant ton absence » et durée cachés. Focus sans défilement, fenêtre remise
  en haut (aussi pour la révélation d'objet). Vu en capture (thème sombre), contrôle d'autotest (79/79). Crawl sur
  une partie neuve (onglets progressifs) : 27 clics, 0 erreur.
- 2026-11-09 (it. 173, revue générale) : simulation 12 h : guerrier 61, mage 56, assassin 54 (le début plus calme ne
  pèse pas sur 12 h). Texte russe : rien de non traduit. Performance : bande 17 %, panneau 20 %, mini 3,9 %, icône
  0,5 % (stable depuis l'it. 163). Captures quêtes EN (sombre) et mini JA : correctes. Rien à corriger.
- 2026-11-09 (it. 172) : Bestiaire progressif : les sections Pouvoirs légendaires (après le premier pouvoir), Panoplies
  (après le premier épique) et Élites (après la première élite vaincue) n'apparaissent qu'une fois rencontrées, sommaire
  compris. Capture d'une collection vide, 78/78.
- 2026-11-09 (it. 171) : onglet débloqué : petit son doux (deux notes, « tab », sons coupés par défaut) avec la bulle
  d'annonce. Vérifié : conseils et annonces ne s'empilent pas (les conseils attendent une bulle libre). 78/78.
- 2026-11-09 (it. 170) : quête « Vaincre N élites » plus proposée avant la zone 3 de la première course (pas d'élite
  là depuis l'it. 168 : elle serait restée bloquée). Test étendu. 78/78.
- 2026-11-09 (it. 169) : quêtes impossibles évitées : « Forger » et « Créer par transmutation » ne sont plus
  proposées avant l'Enclume / le déblocage de la transmutation (un nouveau joueur pouvait les recevoir et devait payer
  pour en changer). Test. 78/78.
- 2026-11-09 (it. 168) : début plus calme, suite : pas d'élite dans les zones 1 et 2 de la première course
  (ELITE.minZone = 3) ; un nouveau joueur en voyait deux dès la zone 1. Après une ascension : inchangé. early-pace :
  10 min = 29 objets, niveau 15, zone 9. Test (et test de l'Appât des champions passé en zone 5), fuzz 600, 78/78.
- 2026-11-09 (it. 167) : plus de double bulle à l'ouverture d'un onglet : les conseils « talent », « skills » et
  « classes » (même message que l'annonce de l'onglet) sont marqués vus quand Talents, Compétences ou Classe
  s'ouvrent (TAB_GATES[id].hint). Les conseils d'action (œuf, quête…) restent. Contrôle d'autotest renforcé
  (le conseil est d'abord effacé). 78/78.
- 2026-11-09 (it. 166) : moins d'informations d'un coup (suite de la demande 5) : les liens « 🔒 déblocage · zone N »
  ne s'affichent plus avant l'ouverture de la boutique ni pour un déblocage à plus de 5 zones du record (le sac d'un
  nouveau joueur montrait Creuset zone 35, Tri du marchand zone 10…). Test, capture nouveau joueur, 78/78.
- 2026-11-09 (it. 165, demande 6 de Victor) : début de partie plus tranquille. earlyPace(S) (rules.js) : or,
  expérience et butin des monstres ordinaires × 0,35 au départ, plein régime en zone 15 (record), première course
  seulement (aussi pour le calcul hors ligne). Nouveau scripts/early-pace.mjs. À 10 min : 69 → 34 objets, niveau
  22 → 15, zone 12 → 10, déblocages 3,3 → 1,7 ; à 1 h quasi identique (zone 24 → 23). balance.mjs 12 h : +0,9
  zone (bruit). Onglets : Talents ~1 min, Classe ~4 min, Boutique 2 à 8 min (300 or), Compétences ~9 min. Test,
  fuzz 600 parties, 78/78. Un test (Souffle de sagesse) placé hors du rythme du début (arrondis).
- 2026-11-09 (it. 164, demande 5 de Victor) : onglets débloqués au fur et à mesure (game/tabs.js, S.tabsOpen
  sauvegardé, gardé à l'ascension ; migration : parties avancées ou déjà ascensionnées = tout ouvert, partie neuve =
  seuils). Nouveau joueur : Aventure + Réglages seulement. Mesuré (first-minutes, 3 graines) : Talents ~20 s, Quêtes
  ~2 min 20, Boutique et Classe ~3 min 30, Compétences ~5 min, Bestiaire ~5 min 30, Familiers au premier œuf,
  Statistiques à 150 victoires, Ascension en zone 15. Chaque ouverture : bulle « ✦ Nouvel onglet : X ! » (clic =
  l'ouvre) et pastille ✦ jusqu'à la visite. Raccourcis clavier, conseils et « À faire » ignorent un onglet fermé.
  Tests (2 tests de conseils adaptés : ils attendent désormais l'ouverture de l'onglet), contrôle d'autotest
  (78/78 deux fois), save-fuzz 16/16, fuzz 600 parties, capture nouveau joueur. 10 langues.
- 2026-11-09 (it. 163, revue générale) : simulation 12 h : guerrier 56, mage 53, assassin 56 (stable). Texte russe :
  aucun mot latin hors noms propres. Performance : bande 16 %, panneau 18 %, mini 3,7 %, icône 0,5 % d'un cœur, à
  cadence égale (30 images/s), soit environ deux fois moins qu'à l'it. 151 (processus GPU 9,5 % contre 22 %).
  Reproduit deux fois ; pas dû à la règle [hidden] (vérifié en la retirant). Cause non identifiée (aucun changement
  du rendu de la bande depuis) : probablement l'état de la sauvegarde de dev au moment de la mesure. À surveiller.
- 2026-11-09 (it. 162, demande 7 de Victor) : panneau en thème sombre par défaut, y compris pour les parties
  existantes (theme null = sombre) ; « Automatique (Windows) » est désormais un choix enregistré ("auto") ; le
  réglage liste Sombre, Clair, Automatique. index.html démarre en data-theme="dark" (pas d'éclair clair au
  lancement). Autotest : contrôle « thème sombre par défaut » ; contrôle instable de la pièce gardée fiabilisé
  (rareté tirée au hasard, bonus à 2 pièces). 77/77 trois fois. CLAUDE.md, README.
- 2026-11-09 (it. 161, demande 4 de Victor, fin) : tour des onglets restants (talents, ascension, bestiaire défilé,
  réglages, boutique défilée). Seul défaut trouvé : dans la boutique, boutons de prix à des hauteurs différentes
  selon la longueur du texte des tuiles (marchand, potions, coffres) : alignés en bas (la case « auto » de la potion
  passe au-dessus du bouton). Captures clair et sombre. 76/76.
- 2026-11-09 (it. 160, demande 4 de Victor, 1re partie) : cartes d'une même rangée à la même hauteur (grilles en
  align-items: stretch : aventure, statistiques, classes, quêtes, familiers, déblocages, boutique) ; dans les cartes
  de classes, familiers et quêtes, le bouton d'action et l'encadré d'expédition descendent en bas, alignés d'une
  carte à l'autre. Équipement vide : silhouette grisée de l'objet attendu dans un cadre pointillé, même taille que
  les objets (avant : mot tassé, cases de largeurs inégales). Captures clair et sombre, crawl 123 clics 0 erreur, 76/76.
- 2026-11-09 (it. 159, demande 3 de Victor) : onglet Classe trié par ordre de libération (guerrier, rôdeur z10,
  nécromancien z15, mage z20, berserker z26…) via CLASS_KEYS_BY_UNLOCK() ; l'ordre interne CLASS_KEYS ne bouge pas.
  Test, capture.
- 2026-11-09 (it. 158, demande 2 de Victor) : « Dépenser automatiquement » et « À chaque niveau, dépenser tout seul »
  des compétences étaient visibles sans le Manuel du stratège : le code les cachait (hidden) mais .row et .toggle
  (display: flex) l'emportaient sur l'attribut. Règle globale [hidden] { display: none !important; } (corrige aussi
  tout autre élément touché par le même défaut). Contrôle d'autotest (il échoue sans la règle : vérifié). Crawl 123
  clics, 0 erreur. 76/76.
- 2026-11-09 (it. 157, demande 1 de Victor) : quête réclamée même sac plein (avant : le clic ne faisait rien, le
  message n'allait qu'au journal) : le coffre fait de la place en vendant l'objet inutile le moins précieux ; à défaut,
  l'objet du coffre est vendu et son or donné (« X (sac plein : vendu N or) »). Test, contrôle d'autotest (75/75).
- 2026-11-09 (it. 156) : interface lancée (--crawl) sur une sauvegarde cumulant les 16 corruptions de save-fuzz
  (nouvelle option --write-all <dossier> [cas]). Trouvé et corrigé : langue inconnue dans la sauvegarde (abîmée ou
  d'une version future) = rechargement SANS FIN de la page (migrate() la retire ; app.js ne recharge que vers une
  langue valide, une fois par lancement) ; talents illisibles = démarrage en échec ; objet null chez le marchand et
  quête sans récompense = erreurs d'interface. Crawl sur la sauvegarde abîmée : 131 clics, 0 erreur. Test. 74/74.
- 2026-11-09 (it. 155) : sauvegardes abîmées, suite : nouveau scripts/save-fuzz.mjs (16 corruptions : quêtes, talents,
  familiers, boutique, buffs, rangs, compétences, expéditions, récompense du jour, journal, réglages…). Deux plantages
  trouvés et corrigés dans migrate() : quête null dans les emplacements, nœud de compétence inconnu (skillTreeEffects).
  16/16 ok. Test (arbre valide conservé tel quel). 74/74.
- 2026-11-09 (it. 154) : sauvegarde : un objet illisible dans le sac (null, emplacement ou rareté inconnus) faisait
  planter uselessItems et « À faire » (vérifié). migrate() retire ces objets, remet à vide un emplacement qui porte un
  objet d'un autre emplacement, retire les emplacements inconnus et les statistiques d'objet illisibles. Test ; la
  sauvegarde de dev ressort identique. 74/74.
- 2026-11-09 (it. 153) : sauvegarde : les nombres illisibles des sous-objets (statistiques, ascension, guilde,
  familiers, compétences, récompense du jour), par exemple un NaN d'un bug passé enregistré « null », reprennent leur
  valeur par défaut au chargement (les champs principaux l'étaient déjà). Test ; la sauvegarde de dev ressort
  identique. Parcours --crawl : 122 clics, 0 erreur. 74/74.
- 2026-11-09 (it. 152) : journal moins bavard : sac plein, les échanges ordinaires (objet de rareté supérieure qui
  remplace le moins précieux) se cumulent sur une ligne « Sac plein, objets remplacés par mieux : N (+or) » ; le détail
  reste pour un légendaire ou une amélioration. Test. Autotest : deux contrôles instables fiabilisés (pièce gardée tirée
  sur un emplacement vide = amélioration ; offre du marchand pas toujours une amélioration). 74/74 trois fois.
- 2026-11-09 (it. 151, revue générale) : simulation 12 h (guerrier, mage, assassin) : record 56 vers 9-12 h, déblocages
  aux mêmes moments qu'avant. Performance : bande 35 %, panneau 37 %, mini 5,6 %, icône 1,1 % d'un cœur (stable).
  Captures panneau EN (1920 px), mini JA, bande FR : rien d'anormal. Texte russe : aucun mot latin hors
  noms propres et repères du script. Rien à corriger.
- 2026-11-09 (it. 150) : Œil du faucon : halo orangé sur le héros dans la bande pendant l'événement (comme le halo rouge
  de la Frénésie ; les deux se combinent). Contrôle d'autotest (74/74).
- 2026-11-09 (it. 149) : 6e événement rare « Œil du faucon » (0,2 % par victoire, 30 s) : tous les coups sont critiques.
  Test (20 critiques sur 20 coups), fuzz 600 parties 0 bloquée, 73/73.
- 2026-11-09 (it. 148) : au lancement après une absence, la bulle de la récompense du jour remplaçait au bout de 2,5 s
  celle du résumé d'absence (qu'on ne pouvait plus ouvrir). Les bulles sont maintenant en file : la suivante attend la
  fermeture de la précédente. Contrôle d'autotest (73/73).
- 2026-11-09 (it. 147) : tous les onglets vérifiés en allemand à 1366 px (version distribuée) : aucun débordement. La
  pastille d'un événement en cours (carte du héros) donne son effet au survol (« Or ×3 ! »). Contrôle d'autotest (72/72).
- 2026-11-09 (it. 146) : « À faire » : « Acheter et équiper : X (prix) » pour la meilleure amélioration abordable chez le
  marchand, d'un clic (avant : lien vers la boutique). Test et contrôle d'autotest (71/71).
- 2026-11-09 (it. 145) : « À faire » : avec le Manuel du stratège, les points de talent et de compétence se dépensent d'un
  clic. Autotest plus solide : une erreur imprévue compte comme un échec et fait quitter (avant : autotest figé jusqu'au
  délai, sans sortie) ; sa sortie s'affiche au fil de l'eau ; les contrôles du résumé de retour ne dépendent plus des
  déblocages de la sauvegarde de dev. 70/70 deux fois.
- 2026-11-09 (it. 144) : « À faire (N) » repliable dans la carte du héros : les mêmes lignes et actions d'un clic que le
  résumé de retour, disponibles à tout moment panneau ouvert. Contrôle d'autotest (69/69) ; performance inchangée.
- 2026-11-09 (it. 143) : protection des pièces de panoplie plafonnée à 6 pièces (panoplies les plus avancées d'abord) :
  avec une pièce de 7 panoplies portée, jusqu'à 49 pièces pouvaient être gardées et bloquer un sac de 24. Test.
- 2026-11-09 (it. 142) : README à jour (infobulle de l'icône, choix d'expédition du Grand intendant, collection de
  panoplies dans les Statistiques, progression et protection des pièces, nouvelles lignes de « À faire maintenant »).
- 2026-11-09 (it. 141) : REVUE GÉNÉRALE. Simulation 12 h : mage 59, nécromancien 56, samouraï 56 ; 10 classes : 57,2
  (stable). Fuzz 300 parties : 0 bloquée. Performance : bande 31,8 %, panneau 33,7 %, mini 6,0 %, icône 1,2 % ;
  mémoire 576-679 Mo. Captures (Statistiques en anglais sombre, Aventure en chinois, mini en japonais) : lisibles, les
  ajouts récents (Sets 0/10, captif, achat d'un clic) s'affichent bien. Texte russe : aucun mot non traduit.
- 2026-11-09 (it. 140) : contrôle d'autotest du « Sac plein » d'un clic dans le résumé de retour (24 → 1 objet, 68/68).
- 2026-11-09 (it. 139) : « À faire maintenant » signale un sac plein (« Sac plein : N objets inutiles à vendre ») ;
  avec l'Œil du connaisseur, un clic dans le résumé de retour vend ce qui n'améliore pas. Test.
- 2026-11-09 (it. 138) : Statistiques : « Panoplies N / 10 » (collection de panoplies) à côté de la collection
  d'objets. Vérifié aussi : les « % » du panneau passent par unit() ou par des textes traduits.
- 2026-11-09 (it. 137) : menu de l'icône : les pourcentages d'opacité suivent la langue (« 85 % » en français, « 85% »
  en anglais). Autotest : le contrôle de la pièce qui complète une panoplie partait d'un équipement pouvant déjà porter
  le phénix (échec aléatoire, bien signalé par le nouveau code de sortie) ; il part maintenant d'un état propre.
- 2026-11-09 (it. 136) : infobulle de l'icône de notification : « Zone » était écrit en dur (non traduit) ; il est
  traduit dans les 10 langues, et l'infobulle donne aussi le record à battre (« Zone 50 · record 58 »). Le nouvel
  oubli d'import (recordZone) a été attrapé par check-imports.
- 2026-11-09 (it. 135) : le conseil de la première pièce de panoplie mentionne le bonus permanent de collection.
  Contrôle d'autotest pour l'équipement d'un clic de la pièce qui complète une panoplie (67/67).
- 2026-11-09 (it. 134) : « À faire maintenant » (résumé de retour, mode mini) signale une pièce du sac qui porterait une
  panoplie à 4 pièces ; dans le résumé, un clic l'équipe directement. Test.
- 2026-11-09 (it. 133) : l'autotest renvoie maintenant un code d'erreur s'il échoue (avant : toujours 0, l'application
  quittant normalement) : scripts/selftest.mjs lit le bilan « N/N » et les lignes ÉCHEC. Utile au relais automatique.
- 2026-11-09 (it. 132) : l'autotest tourne sur une copie temporaire de dev-data (scripts/selftest.mjs) : ses contrôles
  ne modifient plus la sauvegarde de dev, dont la dérive avait causé trois faux échecs (it. 104, 127, 131).
- 2026-11-09 (it. 131) : REVUE GÉNÉRALE. Simulation 12 h : guerrier 56, assassin 54 (1re course de 173 min ; 5 graines :
  104 min en moyenne, tirage malchanceux), druide 56. Fuzz 300 parties : 0 bloquée. Performance : bande 33,8 %,
  panneau 35,9 %, mini 6,3 %, icône 0,7 % ; mémoire 570-686 Mo. Captures (Bestiaire en espagnol, Familiers en coréen
  sombre, mini en allemand) : lisibles. Texte russe : un nom d'objet français venait d'un objet fabriqué par l'autotest
  (arme déplacée vers un anneau) ; contrôle corrigé, objet retiré de la sauvegarde de dev.
- 2026-11-09 (it. 130) : Familiers : plus de bouton « Faire éclore l'œuf » quand il n'y a aucun œuf (il restait actif et
  ne faisait rien) ; l'onglet se redessine quand le nombre d'œufs change (éclosion par le Grand intendant). Parcours
  --crawl avec tous les déblocages : 116 clics, aucune erreur.
- 2026-11-09 (it. 129) : Grand intendant : l'expédition où il renvoie les familiers se choisit d'un clic à côté de sa
  case (Balade / Voyage / Grande expédition) ; avant, il fallait envoyer soi-même un familier pour changer ce choix.
- 2026-11-09 (it. 128) : dixième panoplie, le Plumage du phénix (2 pièces : +3 % régénération, +2 % vol de vie ;
  4 pièces : second souffle une fois par combat, +20 % PV) : un objectif de plus pour la collection de panoplies.
  Équilibrage 10 classes : 57,8 → 57,2 (bruit).
- 2026-11-09 (it. 127) : check-imports repère aussi les fonctions exportées par un module (setCounts, itemName…)
  appelées sans import (vérifié en retirant un import). Autotest stabilisé : deux contrôles dépendaient de l'état de
  la sauvegarde de dev (objets de panoplie hérités) ; ils créent maintenant leurs propres objets (65/65 trois fois).
- 2026-11-09 (it. 126) : `npm test` vérifie aussi les imports (scripts/check-imports.mjs) : une constante en majuscules
  utilisée sans import (comme LEGENDARY à l'it. 125) fait échouer les tests au lieu de planter le jeu à l'exécution.
  Vérifié sur le cas réel ; aucun faux positif sur le code actuel.
- 2026-11-09 (it. 125) : l'infobulle d'une pièce de panoplie gardée explique pourquoi « Vendre » et la transmutation
  l'épargnent. Contrôle d'autotest (il a révélé un import oublié que `npm test` ne voyait pas ; noté dans CLAUDE.md).
- 2026-11-09 (it. 124) : « Vendre ce qui n'améliore pas » et la transmutation (Creuset compris) gardent maintenant une
  pièce par emplacement des panoplies commencées et jamais complétées (avant : détruites, car pas plus fortes seules).
  Test de vitesse rendu indépendant de l'ordre des tests (graine propre).
- 2026-11-09 (it. 123) : infobulle d'une pièce de panoplie dans le sac : « Panoplie X : 2 → 3 / 4 », en vert avec ★
  si l'équiper débloque le bonus à 2 ou 4 pièces (aide à compléter les panoplies). Test de la collection de panoplies
  rendu strict sur l'ascension.
- 2026-11-09 (it. 122) : collection de panoplies : chaque panoplie complétée (4 pièces portées) une première fois donne
  +1 % attaque et +1 % PV pour toujours (gardé à l'ascension) ; le Bestiaire affiche « N / 9 complétées » et ✓ par
  panoplie. Nouvelle donnée `setsDone` (défaut {}, migration : panoplie complète déjà portée comptée). Test.
- 2026-11-09 (it. 121) : REVUE GÉNÉRALE. Simulation 12 h : paladin 62, moine 59, berserker 56 ; 10 classes : moyenne 57,8
  (stable). Fuzz 300 parties : 0 bloquée. Performance : bande 33,4 %, panneau 36,1 %, mini 6,7 %, icône 0,7 % ;
  mémoire 572-644 Mo. Captures (Ascension en polonais avec la vraie zone de départ, Boutique en japonais sombre, mini
  en russe) : lisibles. Texte russe : aucun mot non traduit.
- 2026-11-09 (it. 120) : sur la bande, le nom d'un boss qui retient un héros pas encore libéré l'indique
  (« Le Chevalier Noir l'Éveillé · captif : Samouraï ») ; avant, il fallait ouvrir l'onglet Classe pour le savoir.
- 2026-11-09 (it. 119) : partie simulée de 48 h avec tous les déblocages (35 ascensions automatiques, record 62) :
  aucune valeur non finie dans la sauvegarde, aller-retour de sauvegarde sain. README à jour (actions directes du
  retour, automatismes pendant l'absence, répliques du héros).
- 2026-11-09 (it. 118) : sac plein : quand un objet est vendu faute de place, le héros le dit sur la bande (« Mon sac
  déborde ! », au plus une réplique toutes les 45 s, jamais sur le nom d'un boss). Test.
- 2026-11-09 (it. 117) : pendant un combat de boss, les nombres de dégâts partent plus bas et ne recouvrent plus le
  nom du boss en haut de la bande (avant : illisible tout le combat).
- 2026-11-09 (it. 116) : bulles du héros : près du bord droit, elles s'arrêtent avant la pastille or / niveau ; les
  répliques ordinaires se taisent aussi quand le boss est le prochain monstre (la bulle d'accueil partait avant son
  apparition et cachait ensuite son nom).
- 2026-11-09 (it. 115) : au retour d'une absence, le héros accueille le joueur (« Te revoilà ! », « Tu m'as manqué ! »).
  Sa bulle ne cache plus la pastille de zone en début de zone (décalée à sa droite) ni le nom d'un boss.
- 2026-11-09 (it. 114) : résumé de retour : quand le Valet d'armes a déjà équipé le meilleur butin, son nom est affiché
  « … (équipé) » (avant : seulement sa rareté). Vérifié aussi : le Valet d'armes équipe bien pendant l'absence.
- 2026-11-09 (it. 113) : Grimoire de l'éveil : les points de talent et de compétence gagnés pendant une absence se
  dépensent tout seuls au retour, comme en jeu (avant : ils attendaient le niveau suivant). Test.
- 2026-11-09 (it. 112) : pendant une absence, le Maître de forge, le Creuset perpétuel et le Grand intendant travaillent
  aussi (avant : rien jusqu'au premier combat au retour), et le résumé de retour le dit (« Maître de forge +12
  améliorations », « 3 objets transmutés », « 7 tâches de familiers ») ; une seule ligne de journal pour la forge.
- 2026-11-09 (it. 111) : REVUE GÉNÉRALE. Simulation 12 h : rôdeur 55, nécromancien 56, samouraï 59. Fuzz 300 parties :
  0 bloquée. Performance : bande 31-32 %, panneau 33-40 % (deux mesures : bruit sous xvfb ; fitTabs ne tourne qu'à
  l'ouverture et au changement d'onglet), mini 6,6-7,1 %, icône 0,6-0,7 % ; mémoire 565-678 Mo. Captures (Familiers en
  portugais, Bestiaire en anglais sombre, mini en chinois) : lisibles. Texte russe : aucun mot non traduit.
- 2026-11-09 (it. 110) : « À faire maintenant » (résumé de retour) : avec le déblocage qui permet de le faire en un clic
  dans l'onglet, les lignes deviennent des actions directes (✦) : éclore les œufs, récupérer les expéditions, réclamer
  les quêtes, équiper le meilleur. Le résumé reste ouvert, la ligne passe à ✓. Sinon, lien vers l'onglet comme avant.
- 2026-11-09 (it. 109) : dans le résumé de retour, « À faire maintenant » propose « Acheter : X (prix) » pour un
  déblocage payable : un clic l'achète (le résumé reste ouvert, la ligne passe à ✓). Parcours --crawl avec tous les
  déblocages, en russe : 145 clics, aucune erreur.
- 2026-11-09 (it. 108) : parcours de tous les boutons de tous les onglets (147 clics sur la sauvegarde de dev, 47 sur
  une partie neuve, 148 en allemand) : aucune erreur. Devient une option de dev `--crawl` (src/renderer/dev/crawl.js).
- 2026-11-09 (it. 107) : README à jour des nouveautés de la nuit (événement en cours sur la bande, achat d'un clic du
  prochain déblocage, bannières et sons des nouveaux moments, journal cumulé, paliers des onglets).
- 2026-11-09 (it. 106) : quand le prochain déblocage est payable, la carte du héros dit « cliquer pour l'acheter (X or) »
  et un clic l'achète directement (avant : un clic ouvrait la boutique, un second achetait). Contrôle d'autotest.
- 2026-11-09 (it. 105) : effets sonores (option) pour les moments qui n'en avaient pas : nouveau record de zone,
  ascension (arpège), palier de panoplie, boss enfin vaincu, quête accomplie (petit carillon, une fois par seconde
  au plus). Onglets resserrés vérifiés en mode sombre à 1366 px.
- 2026-11-09 (it. 104) : onglets resserrés : les pastilles (points à dépenser, « ! ») sont plus petites et plus hautes,
  elles ne mordent plus sur le nom de l'onglet. Contraste du texte des onglets vérifié (6,4:1). Autotest : la
  réouverture du panneau après le mode mini (échec aléatoire, 1 fois sur 4 ici) bascule sur un clic direct au 3e essai.
- 2026-11-09 (it. 103) : sur un écran de 1366 px, les onglets gardent leur nom (police un peu plus petite) au lieu des
  icônes seules, en français, allemand et russe. Nouvelle option de dev `--release-ui` pour capturer l'interface sans
  les commandes de vitesse (comme dans la version distribuée).
- 2026-11-09 (it. 102) : onglets du panneau : quand ils ne tiennent pas sur une ligne, on resserre d'abord les marges,
  puis on retire les icônes, et seulement en dernier recours on n'affiche que les icônes. À 1920 px, allemand et
  polonais gardent maintenant noms et icônes, le russe garde les noms (avant : icônes seules dans les trois langues).
- 2026-11-09 (it. 101) : REVUE GÉNÉRALE. Simulation 12 h : guerrier 59, mage 57, druide 56, record en hausse régulière.
  10 classes (balance.mjs) : moyenne 57,8 (55,1 avant la nuit, 57,7 à l'it. 63 : stable). Fuzz 300 parties : 0 bloquée.
  Performance : bande 34,2 %, panneau 36,8 %, mini 6,7 %, icône 0,7 % ; mémoire 560-679 Mo. Captures (Quêtes en
  japonais, Réglages en allemand, mini en coréen) : lisibles. Texte russe : aucun mot non traduit.
- 2026-11-09 (it. 100) : vrai plantage évité : un compagnon actif inconnu (sauvegarde d'une autre version) faisait
  planter le combat dès qu'il gagnait un niveau. Au chargement, les familiers inconnus sont retirés (possédés,
  expéditions) et le compagnon actif remplacé par un familier connu. Test.
- 2026-11-09 (it. 99) : suite de la robustesse : une sauvegarde contenant panoplie, pouvoir, déblocage, constellation ou
  élixir inconnus (autre version) charge, combat et affiche sans erreur (test) ; l'étal du marchand ne plante plus sur
  un pouvoir inconnu.
- 2026-11-09 (it. 98) : sauvegardes plus robustes : une quête de type inconnu (sauvegarde d'une autre version) ou
  une chasse d'un monstre disparu est remplacée au chargement au lieu de casser l'onglet Quêtes ; un familier
  inconnu n'est plus envoyé en expédition. Test.
- 2026-11-09 (it. 97) : 11e contrat de quête, « Vivre N événements rares » (coffre et or, icône étoile). Mesuré aussi :
  avec 13 familiers et le Grand intendant, les montées de niveau des familiers font ~5 lignes de journal par heure
  (rien à regrouper).
- 2026-11-09 (it. 96) : nouvelles répliques du héros : au début d'un événement rare (« Tu as vu ça ? », « Profitons-en ! »)
  et quand il bat enfin un boss qui l'avait mis K.O. (« Enfin ! »).
- 2026-11-09 (it. 95) : Statistiques : « Événements rares » tient sur une ligne (la liste des cinq événements passe en
  infobulle ; ils sont détaillés dans la carte Probabilités voisine).
- 2026-11-09 (it. 94) : en-tête des Talents : « 1 / 579 point libre » (ambigu) devient « 1 point libre · 579 au
  total », comme l'onglet Compétences.
- 2026-11-09 (it. 93) : simulateur : `SEED=<n>` change la trajectoire aléatoire. Vérifié sur 5 graines : 1re course
  du moine 116 min en moyenne (guerrier 97, assassin 106) ; les 160 min de la revue 91 étaient un tirage malchanceux,
  pas de changement d'équilibrage. Idée P3 close.
- 2026-11-09 (it. 92) : face à un boss, le héros ne fait plus de réplique ordinaire (« Il a l'air costaud… ») : sa
  bulle cachait le nom du boss, déjà annoncé par la bannière « … approche ! ». Les répliques K.O. et légendaire restent.
- 2026-11-09 (it. 91) : REVUE GÉNÉRALE. Simulation 12 h : assassin 56 (3 courses à 56), moine 56 (1re course de
  160 min), berserker 60. Fuzz 300 parties : 0 bloquée. Performance stable : bande 34,1 %, panneau 35,7 %,
  mini 6,6 %, icône 0,6 % ; mémoire 566-682 Mo. Captures (Boutique, Classe, Bestiaire en chinois ; Aventure en
  anglais sombre ; mini en français) : lisibles. Texte russe : aucun mot non traduit.
- 2026-11-09 (it. 90) : carte du sac plus compacte : les trois cases de vente automatique tiennent sur une ligne
  (« Vendre dès qu'ils tombent : ☐ commun ☐ peu commun ☐ rare », libellé complet au survol) ; les options du
  Creuset et du Maître de forge restent visibles sans défiler. Case du Creuset vérifiée en capture (allemand).
- 2026-11-09 (it. 89) : 18e déblocage, le Creuset perpétuel (zone 70, 30 G d'or ; ~30 h de jeu en simulation) :
  transmute tout seul quand le sac est aux trois quarts plein (option, Aventure). Vérifié aussi : les chiffres des
  passifs de classe et des élixirs correspondent au code.
- 2026-11-09 (it. 88) : onglet Ascension : « Ton héros recommence … en zone 1 » était faux avec la constellation
  La Route (il repart en zone 19 au rang 9) ; la zone affichée est maintenant la vraie. Et « Rang suivant » de La Route
  annonçait « zone 3 » au lieu de la zone de départ du rang suivant (21).
- 2026-11-09 (it. 87) : « Élites vaincues : N (+X or) » se cumule comme les ventes (chaque sorte de cumul est
  suivie séparément) : 96 → 21 lignes par heure à 5 h de jeu ; les champions gardent leur ligne.
- 2026-11-09 (it. 86) : « Ton héros est tombé » et « Trop dur : recule vers … » deviennent « … (×N) » tant que la
  ligne est parmi les 10 dernières (ventes du sac plein : même fenêtre). Mesure sur 1 h de jeu à 5 h : ces trois
  messages passent de 536 à 106 lignes ; le journal montre de nouveau élites, boss, butin.
- 2026-11-09 (it. 85) : journal plus lisible : la ligne « Sac plein, objets vendus : N (+X or) » reste un cumul tant
  qu'elle est parmi les 6 dernières lignes (avant : une nouvelle ligne dès qu'une élite ou un boss s'intercalait,
  jusqu'à ~300 par heure en simulation).
- 2026-11-09 (it. 84) : le Grand intendant résume son travail en une ligne de journal (« 5 expéditions récupérées
  (+X or, 2 objets trouvés), 3 œufs éclos, 5 familiers repartis ») au lieu d'une ligne par familier ; les nouveaux
  familiers gardent leur annonce.
- 2026-11-09 (it. 83) : mesure des dix premières minutes (nouvel outil scripts/first-minutes.mjs) : premier objet
  en 7-26 s, premier boss vers 80 s, premier déblocage payable vers 3 min, œuf vers 3-4 min 30, niveau 19-20 à
  15 min : rien à corriger. Autotest : la vérification de l'étiquette de panoplie ne dépend plus de la sauvegarde (58/58 stable).
- 2026-11-09 (it. 82) : un boss qui avait mis le héros K.O. au moins une fois a droit, quand il tombe enfin, à une
  bannière « … enfin vaincu ! » sur la bande et à un moment en mode mini (rien pour une victoire du premier coup).
- 2026-11-09 (it. 81) : REVUE GÉNÉRALE. Simulation 12 h : rôdeur 59, paladin 56, samouraï 60, courses de 61 à
  139 min, record en hausse à chaque course ou presque. Performance : bande 34,4 % d'un cœur (29,7 à la revue 71 ;
  bruit de mesure sous xvfb), panneau 35,2 %, mini 6,6 %, icône 0,6 % ; mémoire 559-685 Mo. Captures en coréen
  (Aventure, Quêtes, Statistiques), mini en anglais, Réglages en mode sombre : lisibles. Texte russe : aucun mot non traduit.
- 2026-11-09 (it. 80) : 14e familier, l'Écureuil (+2 % d'or et +2 % d'expérience par niveau), dessiné en pixels
  (queue enroulée) ; vérifié en capture sur la bande et dans l'onglet Familiers.
- 2026-11-09 (it. 79) : raccourci R (panneau ouvert) : réclame une quête terminée sans aller dans l'onglet ; toutes
  d'un coup avec le Bureau des contrats. Fuzz 600 parties : 0 bloquée.
- 2026-11-09 (it. 78) : le contrat « Trouver N objets rares » a sa propre icône (anneau bleu) au lieu de l'épée par
  défaut ; vérifié en capture en russe (pluriel correct).
- 2026-11-09 (it. 77) : nouveau contrat de quête, « Trouver N objets rares ou mieux » (butin des monstres ; or,
  potions, parfois un œuf). Les quêtes ont maintenant 10 modèles.
- 2026-11-09 (it. 76) : Statistiques : l'intitulé « Événements rares (…) » listait les événements en dur et oubliait
  le Souffle de sagesse ; il est maintenant construit à partir de la liste des événements (suit les ajouts).
- 2026-11-09 (it. 75) : le mode mini annonce aussi les événements rares (pluie d'or, frénésie…) par un « moment »,
  comme la bannière de la bande.
- 2026-11-09 (it. 74) : pendant un événement rare, la pastille de zone de la bande affiche son nom et les secondes
  restantes, dans sa couleur (à la place du record, qui revient ensuite). Case du Grand intendant vérifiée en capture.
- 2026-11-09 (it. 73) : cinquième événement rare, le Souffle de sagesse (expérience ×3 pendant 30 s, bannière
  turquoise). Équilibrage 10 classes en 12 h : 57,3 → 58,0 (bruit).
- 2026-11-09 (it. 72) : l'onglet Bestiaire, devenu long, a un sommaire en tête (collection, pouvoirs, panoplies,
  capacités des boss, élites, monstres) : un clic amène la section dans la vue.
- 2026-11-09 (it. 71) : REVUE GÉNÉRALE. Simulation 12 h : mage record 56, nécromancien 57, druide 54, sans palier
  de plus d'une course. Performance stable : bande 29,7 % d'un cœur, panneau 35,7 %, mini 6,4 %, icône 0,7 % ;
  mémoire 560-684 Mo. Captures (Familiers en japonais, Boutique en anglais avec le Grand intendant, mini en
  japonais) : rien ne déborde. Texte russe : aucun mot non traduit (seuls Sillwalker, noms de langues, Windows, Enter).
- 2026-11-09 (it. 70) : 17e déblocage, le Grand intendant (zone 65, 8 G d'or ; ~19 h de jeu en simulation) : fait
  éclore les œufs, récupère les expéditions finies et y renvoie les familiers libres (dernière expédition choisie,
  Voyage par défaut). Option dans l'onglet Familiers. Un objectif lointain de plus après l'Astrolabe.
- 2026-11-09 (it. 69) : les bonus de panoplie actifs portent une coche ✓ en plus du vert (fiche d'objet, Bestiaire) :
  lisibles sans distinguer les couleurs. Berserker revérifié en 12 h : 38 → 59 sans palier (idée P3 close).
- 2026-11-09 (it. 68) : à la première pièce de panoplie trouvée, une bulle explique le principe (bonus à 2 et 4
  pièces) et mène à la liste du Bestiaire ; README à jour (Bestiaire, panoplies).
- 2026-11-09 (it. 67) : atteindre le bonus 2 ou 4 pièces d'une panoplie est un moment marqué : bannière dans la
  couleur de la panoplie sur la bande, mot en mode mini, ligne au journal (une fois par palier).
- 2026-11-09 (it. 66) : le Bestiaire explique aussi les 9 capacités de boss et les 5 affixes d'élite (rapide, blindé,
  vampirique, furieux, givré), qui n'étaient décrits nulle part (ou seulement au survol, boss en cours).
- 2026-11-09 (it. 65) : l'onglet Bestiaire présente les 9 panoplies (couleur, bonus à 2 et 4 pièces, pièces portées,
  bonus actifs en vert) : on peut viser une panoplie au lieu de la découvrir par hasard.
- 2026-11-09 (it. 64) : survoler l'étiquette d'une panoplie (fiche du héros) montre ses bonus à 2 et 4 pièces,
  cochés quand ils sont actifs.
- 2026-11-09 (it. 63) : neuvième panoplie, le « Traqueur de champions » (2 pièces : +30 % d'élites et +15 % d'or ;
  4 pièces : +50 % d'élites, +25 % contre les boss, +15 % de butin). Bilan depuis le début de la nuit (balance.mjs,
  version 265bd47) : record moyen en 12 h 55,1 → 57,7 (+2,6 zones), voulu (fin des murs), sans passage trop facile.
- 2026-11-09 (it. 62) : coulisses : scripts/balance.mjs compare l'équilibrage (record moyen en 12 h, 10 classes) entre
  un ancien commit et l'état actuel en une commande (≈ 1 min 15) ; il a confirmé la correction de l'élite givrée.
- 2026-11-09 (it. 61, revue générale + correction) : l'élite « Givrée » ralentissait trop le jeu (record moyen en 12 h,
  10 classes : 58,4 → 56,9 ; paladin 56 → 50). Gel atténué (1 coup sur 7 au lieu de 1 sur 4, 1,5 s au lieu de 2 s) :
  moyenne 57,7, paladin 56. Revue : 600 parties sans blocage, aucun texte français en coréen.
- 2026-11-09 (it. 60) : sur la bande, la pastille du bouton du panneau s'allume pour toute action qui attend (quête,
  déblocage abordable, œuf… et plus seulement amélioration ou talents), et son infobulle les liste.
- 2026-11-09 (it. 59) : mode mini, un point doré près du niveau signale qu'une action attend (quête à réclamer,
  amélioration, déblocage abordable, œuf…), et la bulle d'aide les liste.
- 2026-11-09 (it. 58) : au retour, « À faire maintenant » signale aussi une amélioration abordable chez le marchand
  (un clic ouvre la boutique).
- 2026-11-09 (it. 57) : récompense du jour, une série interrompue est signalée (« série de 5 jours interrompue :
  elle recommence ») au lieu de repartir à 1/7 en silence.
- 2026-11-09 (it. 56) : Statistiques à jour : les événements rares incluent la corne d'abondance, et la probabilité
  des champions précise « dès la zone 5 ».
- 2026-11-09 (it. 55 bis) : autotest fiabilisé après le raccourci M (retour à la bande puis panneau rouvert : attente
  de la fin de l'animation) ; il échouait parfois en cascade. 4 exécutions de suite à 54/54.
- 2026-11-09 (it. 55) : les succès chiffrés non obtenus montrent leur progression dans Statistiques
  (« Dix mille victoires (7 420 / 10 000) », « Fidèle : 7 jours (5 / 7) »…).
- 2026-11-09 (it. 54) : plus de bulle « Pendant ton absence (35 s) » après une courte mise en veille : en dessous de
  2 minutes, le résumé reste dans le journal. Test d'endurance (≈ 30 min de jeu en accéléré) : mémoire stable
  (723 → 712 Mo), pas de fuite.
- 2026-11-09 (it. 53) : les Réglages expliquent les économies d'énergie (animation ralentie sur batterie et en absence,
  le jeu continue) ; consignes du relais automatique enrichies (blocages, équilibrage, couleurs, tests).
- 2026-11-09 (it. 52) : quand personne n'est devant l'écran depuis 5 min, la bande s'anime à 10 images/s (le jeu
  continue normalement) et reprend dès le retour : 34 % → 14 % d'un cœur (−58 %), mode mini 6,3 % → 4 %.
- 2026-11-09 (it. 51, revue générale) : rien de cassé. Simulations 12 h (guerrier, mage, nécromancien) régulières,
  sans mur ; 600 nouvelles parties sans blocage ; aucun texte français en chinois ni en allemand ; captures propres.
- 2026-11-09 (it. 50) : portable sur batterie : la bande passe à 20 images/s (au lieu de 30) et revient à 30 sur
  secteur ; mesuré : 32 % → 23,5 % d'un cœur (−27 %), panneau ouvert 34,6 % → 25,4 %.
- 2026-11-09 (it. 49) : à la première défaite d'un nouveau joueur, une bulle rassure (le héros recule puis repart
  seul) et oriente vers le sac (▲ = meilleur équipement).
- 2026-11-09 (it. 48) : nouvel affixe d'élite, « Givré » : ses coups peuvent geler le héros (attaques 40 % plus
  lentes pendant 2 s, « Gelé ! » sur la bande). Atténué à la revue it. 61 (15 %, 1,5 s).
- 2026-11-09 (it. 47) : README remis à jour (83 monstres et non 43, champions dès la zone 5, retour d'absence,
  mode mini, raccourcis clavier). Inventaire des pluriels bricolés « (s) » encore utilisés : aucun (les particules
  coréennes 이(가), 을(를) sont l'usage normal).
- 2026-11-09 (it. 46) : quêtes bien accordées dans toutes les langues : « Bring back 1 pet expedition » (au lieu de
  « expeditions »), boss et forge en russe et polonais (« Победи 2 босса », plus de « раз(а) »).
- 2026-11-09 (it. 45) : au retour d'une absence, le résumé nomme le meilleur objet gardé (pas seulement sa
  rareté) et, si c'est une amélioration, propose « Équiper maintenant » en un clic.
- 2026-11-09 (it. 44) : touche M pour réduire en mode mini depuis le panneau (ajoutée à la liste des raccourcis).
  Essai d'une usure des boss plus forte (8 %) pour le berserker : résultats mitigés selon les classes, gardé à 5 %.
- 2026-11-09 (it. 43) : une fois tout débloqué, la fiche du héros et le mode mini ne restent plus sans objectif :
  « Prochain objectif : battre ton record (zone 60) » avec sa barre de progression.
- 2026-11-09 (it. 42) : le mode mini marque enfin les grands moments (légendaire, nouveau record, ascension) :
  un mot sur la scène et un liseré doré pendant 4 s, une seule fois.
  Vérifié : la courbe d'expérience ne fige pas les niveaux en vraie partie (niveau ≈ 1,35 × zone, remis à zéro à
  l'ascension) ; le niveau 263 de la sauvegarde de test était un artefact. Rien à changer.
- 2026-11-09 (it. 41, revue générale + correction) : les très grands nombres s'affichent enfin proprement :
  « 11,13 Sx » au lieu de « 11130545777,47 T » (suffixes Qa, Qi, Sx, Sp, Oc, No, Dc, puis notation scientifique).
  Revue : 600 nouvelles parties sans blocage, performance stable, simulations plus régulières qu'à la revue 31.
- 2026-11-09 (it. 40) : chasse aux blocages : 400 nouvelles parties (10 classes) jouées 20 min chacune, aucune
  bloquée (la même recherche sur la version d'avant trouve bien les 2 parties coincées par un champion). Une version
  courte fait désormais partie des tests.
- 2026-11-09 (it. 39) : deux pièges corrigés. Un nouveau joueur pouvait rester bloqué à jamais si un champion
  tombait en premier monstre de la zone 1 (≈ 1 partie sur 200) : plus de champion avant la zone 5, et deux défaites
  en zone 1 tirent une nouvelle série de monstres. Et quand le sac est plein, un légendaire ou une amélioration
  n'est plus vendu d'office : il prend la place de l'objet le moins précieux du sac.
- 2026-11-09 (it. 38) : coulisses : tous les tests de logique sont synchrones, un échec s'affiche à sa place
  (utile au relais automatique, qui ne livre rien si un test échoue).
- 2026-11-09 (it. 37) : après l'achat de l'Astrolabe (éteint au départ), une bulle explique qu'il faut le cocher
  dans l'onglet Ascension, et un clic y mène.
- 2026-11-09 (it. 36) : nouvelle constellation, « Le Chasseur » : +5 % d'élites rencontrées par rang (10 rangs),
  pour choisir durablement un style plus risqué et plus rentable.
- 2026-11-09 (it. 35) : le nom des boss très grands (yéti de la zone 28…) n'est plus coupé en haut de la bande.
- 2026-11-09 (it. 34) : sur la bande, le nom d'un boss usé indique « −15 % PV », et ne passe plus sous l'or et
  le niveau en haut à droite (il s'étend vers la gauche).
- 2026-11-09 (it. 33) : panneau Zone, les PV du boss tiennent compte de son usure (45 k au lieu de 53 k à −15 %).
- 2026-11-09 (it. 32) : fin des murs de plusieurs heures : un boss qui bat le héros s'use (−5 % de PV par défaite,
  30 % au plus, même d'une course à l'autre) jusqu'à ce qu'il soit vaincu ; le panneau Zone l'indique. En simulation,
  plus de série de 3 courses au même record (druide 50-50-50 → 48-49-55, moine 56-56-56 → 56-57).
- 2026-11-09 (it. 31, revue générale) : rien de cassé trouvé (captures chinois/anglais, aucun texte français en
  espagnol ni portugais, performance stable). Un mur de progression repéré en simulation, noté ci-dessous.
- 2026-11-09 (it. 30) : les messages de récupération de sauvegarde (fermeture brutale, sauvegarde de secours)
  étaient toujours en français : traduits, et affichés aussi en bulle. Si la sauvegarde vient d'une version plus
  récente du jeu, le joueur est prévenu (dans sa langue) qu'elle est gardée à part.
- 2026-11-09 (it. 29) : sécurité des sauvegardes : en revenant à une version plus ancienne du jeu (bêta Steam…),
  la sauvegarde plus récente qu'il ne sait pas lire n'est plus écrasée par une partie neuve : elle est mise de côté
  (save.newer-v…json) et retrouvable en reprenant la bonne version.
- 2026-11-09 (it. 28) : daltonisme : chaque rareté d'objet a son repère dans le sac et l'équipement
  (• peu commun, •• rare, ••• épique, ★ légendaire), plus gros et lisible dans les deux thèmes, avec une légende.
- 2026-11-09 (it. 27) : l'ascension se voit enfin sur la bande (bannière « Ascension n° 4 ! +36 éclats d'étoile »
  et étincelles), et « Depuis ta dernière visite » compte les ascensions faites entre-temps (Astrolabe).
  Contrôle d'équilibrage de la Corne d'abondance (10 classes, 8 h) : Valet à 344 → 355 min, dans le bruit.
- 2026-11-09 (it. 26) : nouvel événement rare, la « Corne d'abondance » : pendant 30 s, chaque victoire laisse
  un objet. Et plus d'espace française avant « ! » dans les annonces d'événement, talents ultimes et clés de voûte
  en anglais et dans les autres langues.
- 2026-11-09 (it. 25) : Réglages, choix du thème du panneau : automatique (celui de Windows), clair ou
  sombre ; appliqué tout de suite et retenu. (Recherche d'autres « : » mal espacés : aucun trouvé.)
- 2026-11-09 (it. 24) : mode mini, survoler les infos (niveau, or, zone) affiche le record à battre et le
  prochain déblocage avec sa progression ; avant, la bulle était sur une barre de 2 px, presque introuvable.
- 2026-11-09 (it. 23) : nouveau déblocage de fin, l'« Astrolabe » (zone record 60) : il fait l'ascension tout
  seul quand le héros bloque près de son record (option à activer dans l'onglet Ascension, décochée au départ).
- 2026-11-09 (it. 22) : deux textes français cachés dans des cas rares traduits : le bouton « tout » des
  Maîtrises (talents) et l'abréviation des jours dans le temps de jeu (« 3 d 4 h » en anglais, pas « 3 j »).
- 2026-11-09 (it. 21, revue générale + correction) : en thème clair, d'autres textes trop pâles redeviennent
  lisibles : récompenses spéciales des quêtes (œuf, éclats), couleurs du journal (légendaire, rare…),
  expéditions terminées, avertissements, or de la boutique, effets des constellations. « 1 éclat d'étoile »
  au singulier dans les quêtes.
- 2026-11-09 (it. 20) : nouveau pouvoir légendaire, « Appât des champions » : +60 % d'élites rencontrées
  (plus coriaces, mais butin garanti et or ×4) et +10 % d'or. Un pouvoir de prise de risque.
- 2026-11-09 (it. 19) : derniers textes français dans les autres langues corrigés (onglets Classe et
  Statistiques) : « zone 15 » des héros prisonniers, « (actuelle) », « ascension » de l'introduction,
  « zone 13 » du boss le plus lointain. Vérifié sur tout le texte de l'interface en russe, coréen, chinois.
- 2026-11-09 (it. 18) : nouveau déblocage lointain, le « Filet à étoiles » (zone record 55) : les étoiles
  filantes que le joueur n'a pas cliquées sont attrapées toutes seules à mi-course (vitesse permanente).
  (Revue it. 21 : atteint vers 8 h - 10 h 30 de jeu simulé, pas au-delà de 12 h.)
- 2026-11-09 (it. 17) : en rouvrant le panneau après au moins 5 minutes, une ligne « Depuis ta dernière
  visite » résume or gagné, monstres vaincus, niveaux, nouveau record et légendaires ; un clic la masque.
- 2026-11-09 (it. 16) : « Nouveau record ! » et « Jamais allé aussi loin ! » ne s'affichent plus à chaque
  boss d'une course après ascension : seulement quand le héros dépasse son meilleur record de toutes les courses.
- 2026-11-09 (it. 15) : nouvelle capacité de boss, « Fureur croissante » : toutes les 5 s le boss frappe
  10 % plus vite (6 fois au plus), il faut l'abattre vite. Les capacités sont redistribuées entre les zones.
- 2026-11-09 (it. 14) : au clavier, le résumé d'absence s'ouvre avec le focus sur « Continuer » : Entrée
  le ferme, au lieu d'ouvrir la première action de la liste « À faire maintenant ».
- 2026-11-09 (it. 13) : après une ascension, la bande rappelle le record à battre (« record 45 ») à côté de
  la progression de la zone, jusqu'à ce que la course le dépasse.
- 2026-11-09 (it. 12) : nouveau déblocage de fin, le « Maître de forge » (zone record 50) : il forge tout
  seul l'équipement porté avec l'or en trop (option à cocher). Un objectif de boutique de plus, vers 7 h de jeu.
- 2026-11-09 (it. 11, revue générale + corrections) : textes restés en français dans les autres langues
  corrigés : « rang 18 » des Maîtrises, case « auto » des potions, bulle « Agrandir en bande » du mode
  mini, « talents » dans la liste de l'ascension ; plus d'espace avant « : » en anglais (« Stellar Glow: »).
- 2026-11-09 (it. 10) : la carte « Prochain déblocage » du héros est plus lisible : le libellé a sa
  propre ligne et grossit, le nom et la progression aussi (et tiennent sur une ligne en allemand).
- 2026-11-09 (it. 9) : le résumé d'absence et la confirmation « Quitter » donnent le vrai plafond hors
  ligne (8 h, plus ce qu'ajoute la constellation de la Lune) et signalent quand il a été atteint.
- 2026-11-09 (it. 8) : l'autotest n'échoue plus au hasard (une fois sur trois) : il vérifiait les clics
  traversants à un endroit fixe où passe parfois le monstre cliquable. Utile pour le relais automatique,
  qui ne livre rien si l'autotest n'est pas parfait.
- 2026-11-09 (it. 7) : en revenant après une absence, le résumé liste aussi « À faire maintenant »
  (quêtes à réclamer, objet plus puissant, points à dépenser, déblocage abordable, œufs, expéditions
  finies) ; un clic mène directement au bon onglet. Bulle du mode mini : « 1 monstre » au singulier.
- 2026-11-08 (it. 6) : mode mini, le texte ne passe plus sous les boutons ^ et — en russe, polonais,
  japonais ou portugais : boutons côte à côte en haut, l'or et la zone prennent toute la largeur.
- 2026-11-08 (it. 5) : au tout premier lancement, la bulle de bienvenue (« ton héros avance seul,
  clique ici pour ouvrir le panneau ») passe avant la récompense du jour au lieu d'attendre derrière elle.
- 2026-11-08 (it. 4) : fini les « Talentpunkt(e) », « huevo(s) », « 1 monstres » : points de talent,
  points libres, ascensions, éclats d'étoile, œufs, quêtes, plumes et coffres s'accordent au nombre
  dans les 10 langues. En français, « 2 nouvels objets » devient « 2 nouveaux objets ».
- 2026-11-08 (it. 3) : après un changement de langue, le journal d'aventure n'est plus un mélange
  de deux langues : il repart proprement dans la nouvelle langue.
- 2026-11-08 (it. 2) : plus de « objet(s) » dans les messages : ventes, objets gardés pendant l'absence,
  équipement automatique, transmutation et nœuds en attente s'accordent au nombre, dans les 10 langues
  (y compris les trois formes du russe et du polonais).
- 2026-11-08 (it. 1, revue générale + correction) : les étiquettes du panneau (bénédiction du jour,
  panoplies, événements, pouvoirs légendaires, losange de panoplie dans le sac et la boutique) sont
  de nouveau lisibles avec le thème clair de Windows (elles étaient jaune pâle sur blanc).

## Idées

- P3 (it. 2213) Héros à 1280 px : boutons « Jouer à l'ascension » / « Prendre en duo » sur deux lignes, sous-titre du Mage sur deux
  lignes (en-têtes de cartes inégaux, comme les familiers avant l'it. 2207). À reprendre si Victor le signale.
  ESSAI it. 2215, annulé : sorts déplacés dans l'en-tête (à droite du nom) : les boutons restaient sur deux lignes (« Jouer à /
  l'ascension », « Beim Aufstieg / spielen ») et les sous-titres se coupaient davantage. Piste restante : libellés plus courts.
  MESURE it. 2230 (boutons sur une ligne forcée, 1280 px) : 13 px → 6/12 trop larges en fr et de ; 12 px et 11 px → encore 3/12 (fr, de,
  ru, pl) : la police ne suffit pas, seuls des libellés plus courts régleraient (à décider avec Victor).
- P3 (revue it. 2211) Familiers : cartes hautes avec un grand vide entre le bonus et le cadre d'expédition (hauteur fixée par la
  carte la plus longue de la rangée) : une mise en page plus dense ? À juger avec Victor, ce n'est pas un défaut.
- P3 (it. 2188, mesuré it. 2198) Autotest à 125 s : les plus lents sont la bulle du morceau de musique (7 s), la meute (3,5 s), le
  décodage des 4 morceaux (3,2 s), l'arrivée d'une série (2,7 s) ; les contrôles de la nuit ne pèsent que 0,1-0,3 s chacun.
  `SELFTEST_TIMES=1` pour la liste ; à raccourcir d'abord la bulle de musique si la durée devient gênante.
  MESURE it. 2510 (≈ 145 s, 320 contrôles) : les trois attentes de la libération (plein écran, icône, verrou) 5,6 s chacune ;
  la cinématique dure au moins 3 s (finale-window.js, minimum du processus principal) : rien à gagner sans passe-droit de test.
  « panneau rouvert » 9,5 s une fois sur trois exécutions (clics souris ratés sous xvfb, 0,85 s sinon) : intermittent, déjà rattrapé.
- À VOIR AVEC VICTOR (it. 2178) : mage le plus bas sur 12 h (≈ 62 sur 4 graines contre ≈ 65) ; il rattrape en semaine (it. 1115) :
  rien à faire sans son avis.
- ÉCARTÉ (it. 2132 : bruit, voir Fait) (it. 2130) Mémoire : la bulle « Quoi de neuf » (toast de la bande, 15 s au lancement après une mise à jour) laisse 30 à 60 Mo
  de plus pendant toute la partie (mem-watch, MEM_NEWS=1 : 625 contre 595 Mo). Piste : une taille ou graisse de police propre au
  toast (CLAUDE.md, « Polices »), ou le texte rendu par-dessus la bande ; mesurer avec un toast d'un autre texte.
- CLOS (it. 1785 : 96 cartes, 8 rangées, en russe à 1920 px et 85 à 1280 px : aucun débordement) P3 (revue it. 1741) Bestiaire : la grille fait exactement 7 rangées de 12 à 1920 px (84 monstres avec Poupouce) ; le prochain
  monstre ajouté ouvre une 8e rangée : relancer lang-overflow (Bestiaire, 1280 et 1920 px) et prévoir des cartes plus basses si ça défile.
- FAIT (it. 1653) P3 (it. 1652) Bande, fin de partie : le nom d'un sort lancé (« Volley of Arr… », en haut) passe sous la bulle de parole du
  héros (« Chests everywhere… ») ; faire éviter la bulle par le nom du sort (ou décaler la bulle), comme les nombres.
- FAIT (it. 1562) P3 (it. 1561) Bande : les nombres de dégâts (« Crit 116k », « Esquive ») montent jusque dans la rangée d'informations
  et passent sur le nom du boss pendant le combat ; les arrêter sous la rangée (hudBands) ou les faire pâlir avant.
- CLOS (it. 1552 : 8 px mesurés en ja, de, ru, fr, pl, la marge prévue ; la couronne est celle du boss) P3 (it. 1551) Bande, japonais : le nom du boss majeur (« 覚醒したイグニヴォラ… · HP -25% ») finit à quelques
  pixels de la pastille de l'or, sa couronne entre les deux ; mesurer l'écart réel (placeBossName garde 8 px) dans les
  langues aux noms longs et au pire cas (buffs actifs, or long).
- FAIT (it. 1533 : vers le brésilien, comme la page du magasin) P3 (it. 1532) Portugais : les premières traductions sont brésiliennes (« Bônus », « Seu herói », « Configurações »),
  les récentes européennes (« teu herói », « bónus ») : choisir une variante et harmoniser (passe longue sur pt.js).

- CLOS (it. 1483 : semaine 350 pour le mage comme pour le guerrier) P3 (it. 1482) Mage un peu en retrait sur 12 h (60,7 sur 6 graines contre 63,6 pour la moyenne des héros ; gardien
  stellaire en tête à 67,3). Avant tout réglage : comparer sur une semaine (simulate.js 168 mage / warrior), le mage
  rattrapait en fin de partie (it. 1115 : 349 contre 350). Si l'écart tient aussi sur la semaine : un petit bonus de
  classe (≈ +5 % d'attaque), vérifié avec hero-table sur 3 graines.
- CLOS (it. 1658 : mesuré, mur 18-21 pour un joueur naïf seulement ; laissé tel quel) P3 (it. 1462) Longue traîne avant l'Ascension : sur 10 trajectoires (tab-pace, joueur simulé), 2 n'atteignent la
  zone de l'Ascension qu'en ≈ 2 h (114 et 124 min) contre 19-43 min pour les autres ; avant la nuit la plus lente
  était à 61 min (simple décalage des tirages, it. 1462). À étudier : où ces héros butent (boss de zone 20-24 ?), ce
  que le joueur simulé ne fait pas (talents, forge, sorts), et si l'alerte « héros bloqué » leur propose la bonne piste.
- ÉCARTÉ (it. 1503 : le Jour des arcanes, it. 1412, et la Marée arcanique couvrent ce besoin ; pas de place dans la
  Boutique) P3 (it. 1404) Parchemin des arcanes (sorts rechargés 50 % plus vite, 10 min ; effet lu dans castSpells comme la
  Marée arcanique) : demande d'abord une place dans la Boutique (grille 4 × 2 pleine). Pistes : tuiles plus basses,
  ou une rangée de consommables défilante (hscroll), vérifiées à 1280 px dans les 10 langues.
  Mesuré (it. 1405, 1280 px) : panneau 497 px, Boutique 405 px (rien ne défile), tuile de consommable 144 px en
  allemand (131 en français) : une 3e rangée (≈ 150 px) ne tient pas ; il faudrait des tuiles d'≈ 95 px (prix sur la
  ligne de l'effet) ou la rangée défilante.
- FAIT (it. 1355-1359) P3 Nombres variables devant un pluriel fixe (russe et polonais faux selon le nombre) : tous
  passés par txn ou vérifiés (constantes de la forme « many », tournures neutres des traducteurs).
  (Expéditions et défaites faites à l'it. 1357 ; bestiaire inutile : paliers fixes.)
- FAIT (it. 1269-1270, ligne d'expérience de la carte du héros) P2 Vu it. 1256 : lang-overflow, une fois sur cinq, « es 1280 : adventure=10 » (Aventure en espagnol, écran de
  1280 px, défilement de 10 px), puis rien sur quatre relances : un état passager de dev-data (pastilles des
  événements ou élixirs en cours ?). Forcer deux événements et des élixirs à 1280 px en espagnol et mesurer.
  Écarté à l'it. 1257 (injections TEMP, es 1280) : trois événements et six élixirs actifs (0), expérience très
  longue (0), résumé « Depuis ta dernière visite » au pire cas avec la carte du déblocage sur trois lignes (0, avec
  ou sans retouche). Marge de la colonne du héros : 14 px (la plus serrée ; Sac 51, Équipement 21, Zone 64). Les
  trois variantes de l'Aventure (normale, avant-dernier prêt / pas prêt) étaient à 10 dans la même passe : un état
  constant pendant cette passe (pas la carte du déblocage). Piste suivante : faire écrire à --overflow-report
  l'élément qui dépasse (classe et texte), pour que la prochaine occurrence se nomme d'elle-même.
  FAIT it. 1258 : --overflow-report ajoute « onglet-cause=colonne>élément:texte » ; à la prochaine occurrence, lire
  cette ligne dans la sortie de lang-overflow.
  Revu à l'it. 1264 (troisième occurrence, colonne p-hero confirmée ; l'élément nommé était faux : contenu d'une
  section repliée, exclu depuis).
  Écarté aussi à l'it. 1265 : la rangée « À faire · Chroniques · Toutes les statistiques » (73 px avec 6 comme avec
  12 tâches à faire). Ne plus chercher à l'aveugle : attendre que le rapport nomme l'élément.
- (Close, it. 1213 : pas un bug) Panoplies du mage : 0 / 10 complétées en 12 h simulées sur trois graines (guerrier 3-5) :
  il a des pièces (6 dans le sac, 4 portées) mais jamais 4 emplacements différents d'une même panoplie. Regarder si
  la vente automatique ou « Équiper le meilleur » du joueur simulé (ou du jeu) écarte les pièces d'une panoplie en cours.
  Mesuré à l'it. 1212 (simulation instrumentée, 12 h) : le mage trouve PLUS de pièces (119 contre 100 au guerrier),
  et les perd autant (vendues comme inutiles 47 / 48, effacées par les ascensions 63 / 48) : la différence est
  l'équipement porté (mage : surtout des épiques, 1-2 pièces de panoplie ; guerrier : des légendaires, plus de pièces
  portées, donc setFinisher atteint 4 plus souvent). Piste : pourquoi « Équiper le meilleur » du mage préfère des
  épiques (calcul de puissance des objets selon la classe ?).
- FAIT (it. 1168-1210 ; matériel dans steam/promo) (demande de Victor, 2026-11-14 00 h 14 : « jusqu'à samedi 12 h, focus maximum sur la bande-annonce et les
  captures d'écran, rendu d'agence de com ; prends ton temps ; ensuite reprends normalement »). Plan : 1) filmer net
  (échelle ×2, scripts/promo/record.sh, --stage) ; 2) plans mis en scène (boss et relique, Lune de sang, Nuée
  d'étoiles, Ruée des gobelins, rencontre de PNJ, légendaire, grand graphe, paliers, mode mini, bureau) ; 3) montage
  Python + ffmpeg (caméra, gros plans au pixel, textes animés aux polices du jeu, coupes sur la musique, carton) ;
  4) captures : série Steam (jeu seul) et série « agence » (accroches) pour itch / réseaux. Diagnostic de l'existant :
  trailer-story-en (66 s) : bon principe mais image vide (bandes noires, bande minuscule), cartons ternes, rythme
  lent, aucune nouveauté de la 0.1.3 ; captures : vues brutes sur un faux bureau, bande de 120 px sur 1080.
- FAIT (it. 1156) P3 Vu it. 1155 : contrôle d'autotest « transmutation (après confirmation) » instable, une fois sur trois passages :
  « 164 -> 164 · sac 0+0+0+ plan {used:0, made:0} bouton inactif » : le sac n'avait rien à transmuter à cet instant
  (dépend de l'état de la partie) ; le contrôle doit fabriquer lui-même sa matière.
- DEMANDES DE VICTOR (2026-11-13, midi), à traiter en premier, découpées en petites itérations :
  A. FAIT (it. 1070). Nombres de dégâts (coups critiques compris) affichés trop loin à droite du monstre touché : les recentrer sur lui.
  B. FAIT (it. 1072). Boutique : le bouton « Renouveler l'étal » est tout à droite alors qu'il renouvelle les 4 objets de gauche : le
     mettre près d'eux. Les 4 objets ne tiennent pas sur Mac sans défilement horizontal : icônes et cartes plus petites.
  C. FAIT (it. 1080 : moins de clics ; it. 1084 : paliers des maîtrises ; it. 1107 : un bonus au choix à chaque palier). Talents : trop de clics par talent, et on arrive trop vite en bas à droite où l'on met des points à l'infini.
     Rendre l'onglet plus riche en choix (à concevoir : clic = tous les rangs possibles, choix exclusifs, paliers…).
  D. FAIT (it. 1075-1139 ; synergies chiffrées it. 1112-1114 et 1139, points en surplus it. 1115). Grand graphe de compétences AUTOUR de la fleur (≈ 5 fois sa taille), grisé tant que la fleur n'est pas complète.
     De vrais choix (chemins, embranchements, nœuds exclusifs ; pas besoin de tout remplir) ; aide à finir le jeu jusqu'à
     la zone 200, SANS augmenter la difficulté (le héros devient plus fort). Étapes : D1 (FAIT, it. 1075) données et règles (nœuds,
     liens, coûts, effets ; sauvegarde, migration, tests) ; D2 (FAIT, it. 1076) affichage grisé autour de la fleur ; D3 (FAIT, it. 1077) achat et
     effets ; D4 (FAIT, it. 1077 et 1099) choix exclusifs, réinitialisation ; D5 (FAIT, it. 1078) équilibrage (simulate.js semaine, hero-table) ; D6 traductions,
     « Quoi de neuf ».
     Précision de Victor (même jour) : des nœuds de SYNERGIE, qui font compter un axe dans un autre, pour chacun des
     6 pétales : « si je suis tanky, je tape plus fort » (attaque selon les PV), « plus je suis riche, plus je fais
     mal » (dégâts selon l'or), etc. Pas seulement « +PV » : des choix qui changent la façon de jouer.
  E. FAIT (it. 1073-1095, les 10 onglets). PNJ et histoire : chaque onglet qui se débloque = une rencontre sur la route (ex. la maison d'une petite grenouille
     → Boutique ; un PNJ et sa fusée → Ascension ; une cabane, un lac…). Animation de découverte (le héros entre, parle
     au PNJ), puis le PNJ stylisé dans l'onglet avec des répliques (« J'ai quelques objets pour vous ! »). Étapes : E1
     liste des PNJ (un par onglet : nom, lieu, répliques ; EN COURS : Boutique faite, it. 1073) ; E2 le PNJ dans son onglet (FAIT pour la Boutique, it. 1073) (portrait pixel + bulle) ; E3 (FAIT pour la Boutique, it. 1079)
     cinématique de rencontre sur la bande ; E4 les autres onglets ; E5 traductions, « Quoi de neuf ».
  Ordre prévu : A, B (rapides), puis E1-E2, D1-D3, E3, C, D4-D6.
  H. FAIT (it. 1096). (2026-11-13, après-midi) « Vendre ce qui ne m'améliore pas » doit tout vendre, légendaires et pièces de panoplie
     comprises, tant que ce n'est pas une amélioration : à faire à l'it. 1096.
  F. FAIT (it. 1074). Chroniques triées dans l'ordre de l'histoire, numérotées dans l'ordre du déblocage.
  G. FAIT (it. 1083). P3 (vu it. 1074) Chroniques dans la grande fenêtre : colonnes qui défilent de côté au-delà de 4 entrées ; Victor
     ne veut pas de défilement horizontal (demande B) : à revoir (liste verticale, ou plus de colonnes plus étroites).

- FAIT (it. 1047) P2 Vu it. 1046 : en russe, la partie de fin de partie défile à 100 % sur des écrans de 1600 et 1680 px (Aventure 19,
  Statistiques 46 ; dev-data : rien) ; la mesure des langues ne passe que par 1280, 1366 et 1920. Corriger, puis
  ajouter une largeur intermédiaire (1600) à lang-overflow.
- À PROPOSER À VICTOR (it. 1029) P2 Fin de semaine : tous les héros finissent autour de la zone 293 (artificier,
  paladin, assassin, guerrier, mage : dernières courses 293, parfois 296 ou 308) ; artificier : 6 courses de suite à
  250 (écho), puis 11 sur 13 à 293. Pas la faute d'un boss : sans venin, ou avec un coup dévastateur ×1,5 au lieu de
  ×2,5, mêmes records (essais dans des dossiers de travail). La puissance du héros rattrape mal la courbe des
  monstres vers 300 (×1,04 par zone au-delà de 70, rules.js) ; ressenti possible : « je ne progresse plus » après ≈ 5
  jours. Pistes : un palier de puissance permanent supplémentaire en fin de partie (points de compétence en surplus,
  it. 1018 ; reliques des échos plus fortes), ou une courbe un peu plus douce au-delà de 250 ; à mesurer sur 2 semaines.
  Essais de l'it. 1030 (semaine, artificier et guerrier, dossiers de travail jetables) : points de compétence en
  surplus à +0,1 % d'attaque et de PV chacun (≈ +36 %) : 293-307 ; à +0,3 % (≈ +100 %) : 279-307 ; sans Écailles :
  293-300. Aucun ne lève le mur : chaque zone est ×1,04 plus dure au-delà de 70, doubler la puissance ne vaut que
  ≈ 17 zones (1,04^17 ≈ 1,95). Le plafond n'est pas un défaut ponctuel mais le rapport entre la croissance du héros
  en fin de partie et cette courbe : une vraie progression au-delà demande soit une courbe plus douce (MONSTER_LATE_GROWTH
  1,04 → 1,03 au-delà de 250 ?), soit une source de puissance qui croît elle aussi d'environ ×1,04 par zone.
  Deux semaines (it. 1032, 336 h simulées) : SANS changement, la progression continue lentement (guerrier 293 → 335,
  mage 293 → 321 en 2e semaine : un fort ralentissement, pas un mur). Avec ×1,03 au-delà de 250 (dossier jetable) :
  guerrier 350-377, mage 338-350 en fin de 2e semaine (350 : écho suivant). Choix de Victor : garder ce rythme lent
  (records rares, la fin de partie « dure »), ou adoucir la courbe (≈ +30-40 zones en 2 semaines).
  Mise à jour (it. 1389) : depuis le grand graphe (it. 1078) et les points en surplus (it. 1115), la semaine finit à
  349-350 pour le guerrier comme pour le mage (it. 1381) : le mur a reculé de 293 à 350, l'écho de boss de la zone 350.
  Même choix à faire ; résumé dans docs/POUR-VICTOR.md.
- FAIT (it. 1115, grand graphe rempli : +0,1 % d'attaque et de PV par point ; à confirmer par Victor) P3 Points de compétence en surplus : une fois l'arbre entièrement appris (partie de fin
  de partie : 144 nœuds sur 144, 362 points de plus), les points qui arrivent encore ne servent à rien (depuis l'it.
  1015-1016, plus de rappel, « ✓ Arbre complet »). Piste : chaque point en surplus donne un petit bonus permanent
  (ex. +0,1 % d'attaque et de PV), affiché « Points en surplus : +36 % » ; à mesurer avec simulate.js (semaine).
- EN PARTIE (it. 993-997 : 42,5 → 36,4 % ; it. 1064 : → 32 %, anneaux de sorts ; it. 1065 : → 24 %, entaille du héros ; it. 1066 : projectiles des héros à distance, 31 → 24,5 % ; it. 1103 : plus aucun poste au-dessus d'un point (voir « Fait ») ; projectiles écartés ; à mesurer sous Windows) P1 Bon voisin, vu it. 992 : en FIN de partie (scripts/fixtures/endgame-save.json), la bande coûte ≈ 42 % d'un cœur
  (≈ 20 % avec dev-data). Décomposition dans le journal (it. 992) : effets complets ≈ 14 pts, sorts ≈ 12 (dont animations
  2,5, perçage 2 ; le reste dans le GPU : 17 → 25 pts), son 4,5, nombres de dégâts 3, compagnon 5, rang de la zone
  (zones ≥ 100 : combats plus longs et plus denses). Pistes : profiler le processus GPU (couches, repeints : Chromium
  --enable-gpu-rasterization ? --show-paint-rects en capture), plafonner les effets par seconde de TOUTES les sources
  (pas seulement les sorts), regrouper les nombres de dégâts ; mesurer avec scripts/fixtures (pfvar dans le journal).
- FAIT (it. 988) P3 Vu it. 987 (partie de fin de partie, zone 136, 395 Qa d'or) : l'étal du Marchand propose des objets de niveau 136
  tous PLUS FAIBLES que l'équipement porté (+10, panoplies : −3 à −34 % de puissance) pour 3 827 à 24 k d'or. L'étal ne
  sert plus en fin de partie. Pistes : objets au niveau du record + amélioration (+n) proportionnelle, ou prix et
  qualité qui suivent la zone ; à mesurer avec simulate.js (le Marchand attitré achète tout seul).
- FAIT (it. 986) P2 Vu it. 985 : lang-overflow ne mesure que dev-data (zone 55, 1 ascension) ; une partie très avancée (simulate.js 48 h,
  DUMP=…) montrait des défauts invisibles autrement (Ascension, Aventure). Intégrer une seconde sauvegarde « fin de
  partie » (générée par simulate.js, gardée dans le dépôt ou régénérée) à lang-overflow, au moins à 1280 px.
- FAIT (it. 972 : le scénario de mesure a changé, voir « Fait ») P2 Vu it. 971 : bande ≈ 20,5-20,9 % d'un cœur (deux mesures, copies neuves) contre 19,5-19,9 % aux revues 941-961 :
  ≈ +1 point. Suspects : t() et sa règle d'espaces insécables (it. 952 : expression régulière à chaque texte traduit,
  appelée pour chaque nombre de dégâts flottant ?), étiquettes « ✦ » (it. 947), Ruée des gobelins (sans effet hors
  événement). Mesurer avec chaque suspect retiré (injection TEMP), sur copies neuves, 2 mesures par variante.
- FAIT (it. 952) P3 Vu it. 951 : journal, « Récompense du jour 1/7 : +20,53 M » puis « or. » seul sur la ligne suivante : l'espace
  entre un nombre (abrégé ou non) et « or » / « gold » / « PV »… est ordinaire. Piste : comme pour « % » (it. 950),
  rendre insécable dans t() l'espace entre un chiffre ou un suffixe (k, M, Md, T…) et le mot d'unité qui suit, ou
  faire porter l'espace par fmt() quand une unité suit.
- FAIT (it. 949) P3 Vu it. 948 : à 130 % (taille de l'interface), Carte (≈ 140 px) et Compétences (≈ 125 px) défilent encore, même avec
  le panneau agrandi : leur dessin suit la hauteur du panneau sans tenir compte du zoom ; à mettre à l'échelle 1/zoom.
- FAIT (it. 942) P3 Vu it. 941 : Aventure, rangée de puces sous « Prochain déblocage » (hscroll) : la bénédiction du jour, avec son
  effet en clair (« ⚔ Élites ×3, +25 % de chances de butin. »), prend toute la largeur à 1920 px ; la puce suivante
  (panoplie « ◆ Plumes… ») n'en montre que trois lettres. Piste : bénédiction réduite à l'icône quand la rangée
  déborde, ou les puces sur deux lignes si la place le permet (mesurer le défilement vertical).
- À VÉRIFIER PAR VICTOR SOUS WINDOWS (impossible sur le serveur : ni Windows, ni son, ni carte graphique) :
  1. Bande cachée devant un jeu ou une vidéo en plein écran, puis revenue (it. 321) ; mémoire du petit processus
     PowerShell (Gestionnaire des tâches).
  2. Menu de l'icône (clic droit) : case « Économie d'énergie (15 images/s) » (it. 385-386), cochée / décochée, et
     qu'elle suit le réglage du panneau.
  3. Consommation réelle de la bande (Gestionnaire des tâches) : sur le serveur ≈ 19 % d'un cœur en rendu logiciel,
     sans doute bien moins avec la carte graphique (it. 361, 378).
  4. Sons nouveaux, à l'oreille : capacités des boss (it. 365), motif de la chronique « Le serment maudit » (it. 372).
     Refonte du son (it. 432-435) : pièces en gamme, coups variés, sons des 10 événements et de l'étoile filante,
     ambiance de chaque zone (Réglages > Son > Ambiance des zones), musique qui varie (intermède, silence) : volumes ?
  7. Sorts (it. 469-485, 506, 547-561) : animations, sons, icônes (badge de l'effet), effets uniques par héros (étourdi,
     poison, vol de vie, écho…) visibles en combat, perçage immédiat sur la file et le boss, sorts du compagnon (« + »,
     Grimoire) ; trop chargé ou pas assez ?
  8. Musique lofi (it. 520-536) : un air par tranche de 5 zones, couleur du décor, désert oriental ; Réglages > Son ◀ ▶
     pour écouter les autres airs ; touche B / menu de l'icône pour la couper seule. Volumes et goût à juger.
  6. Sur le Mac : la bande ne doit pas apparaître devant un jeu / une vidéo en plein écran (it. 445) ; textes « macOS / barre des menus » dans Réglages et le menu de l'icône (it. 443) ; plus d'icône dans le Dock (it. 431) ; réglage « Informations de la bande : Au milieu » (it. 429).
  5. « Quoi de neuf » au lancement (édition 10, avec au plus 3 éditions non lues) ; la bulle disparaît une fois lue.
  9. Boss majeurs et reliques (it. 571-583) : zone 50 (Geôlier mécanique, Drone stellaire), 100, 150 ; relique qui
     flotte à droite du boss, scène d'arrivée, scène de la relique gagnée (histoire), drone qui tire à côté du héros,
     couronne sur la tête, cœur et lame dans le dos ; sons du drone et de la relique (volumes ?) ; puissance réglée
     ≈ 15-20 zones par relique : trop, pas assez ? Succès RELIC_FIRST, RELICS_ALL et RELIC_MAX à créer sur Steamworks.
  10. Combat de boss : barres de vie du héros et du boss sous les pieds (it. 580) : bien lisibles ?
  11. Niveaux des reliques (it. 608-617 : un par course, +10 %) et échos des lieutenants au-delà du Rebord (it. 634 :
      zones 250, 300, 350, un niveau de plus par course) : rythme et difficulté des échos à juger en jeu. Contour
      spectral bleu pâle des échos (it. 701-702, bande et mode mini) : assez visible, pas trop ?
  14. Déblocages au-delà du Rebord (it. 712-738) : Forgeron des astres (230), Herboriste perpétuel (260), Marchand
      attitré (300) : prix et moment d'arrivée justes ? Options : Aventure, sous le sac, « Automatismes (actifs / total) ».
  13. Feux follets des pétales complets (demande V, it. 720) : passent derrière puis devant le héros ?
  12. Familiers (demande U, it. 714) : bouton « Récupérer le butin » et boutons d'envoi (30 min / 2 h / 8 h, nom au
      survol) à ta résolution : plus rien ne sort de la carte ni ne fait défiler ?

Priorité : P1 (bug visible / bon voisin) > P2 (retour, progression) > P3 (confort, contenu).

- FAIT (it. 939 : dépendait de la bénédiction du jour, voir « Fait ») P3 Vu it. 920 : lang-overflow, russe à 1280 px, « stats-chevauche=1 » une fois (un libellé de Statistiques plus large que
  sa colonne, sans doute « Засчитанное офлайн-время » à côté d'une valeur longue), pas reproduit en quatre passages ; si
  ça revient, main.js (--overflow-report) peut citer le texte du libellé.

- CLOS (it. 1019 : plus revu en 110 itérations ; trois passages de suite à 203/203) P3 Vu it. 904 : un autotest à 181/182 une fois (contrôle non noté), puis trois passages à 182/182 : contrôle instable
  à identifier si ça revient (garder la ligne « ÉCHEC » la prochaine fois).

- FAIT (it. 892) P3 Vu it. 890 (bande, zone 55) : l'étiquette d'affixe du dernier monstre de la file (« Furieux ») touche le début du nom
  du boss, qui s'étend vers la gauche ; décaler l'étiquette ou couper le nom quand ils se chevauchent (placeBossName).

- FAIT (it. 885 : 20,5 %, bruit) P3 Revue it. 881 : panneau mesuré à 21,7 % d'un cœur (repère 20-21 %, bande et mini dans leurs repères) : refaire une
  mesure sur une copie neuve à la prochaine revue ; si l'écart tient, chercher ce qui a grossi depuis l'it. 863.

- FAIT (it. 875) P3 Vu it. 874 : la météo passe encore sur le nom du boss (« Abyssal Carapace the Awakened », étiquette DOM au-dessus de
  lui) ; l'éviter demanderait sa position (mesurée une fois par série de monstres, comme placeBossName) : à faire si gênant.

- FAIT (it. 872) P3 Vu it. 870 : lang-overflow, polonais à 1280 px, « adventure-tuile=1 » une fois sur quatre passages (sans lien avec le
  changement : dépend d'une valeur du combat du moment, comme celle de l'it. 864) : trouver quelle tuile de l'Aventure se
  coupe (instrumenter --overflow-report pour nommer la tuile) et lui donner une valeur abrégée.

- FAIT (it. 866) P3 Coréen (vu it. 865) : les mots se coupent entre deux syllabes (« 가장자리 / 에는 », Aventure, Héros, Réglages), règle
  par défaut du navigateur ; `word-break: keep-all` en coréen serait plus soigné, mais à mesurer (débordements à 1280 px).
- FAIT (it. 865) P3 Vu it. 864 : russe, Boutique à 1280 px, « Восстанавлив / ает » (potion de soin) coupé en plein mot sans trait
  d'union (overflow-wrap: anywhere ; Chromium n'a pas de césure russe sous Linux) : petite taille de texte ou mot à part ?
- P3 Revue it. 861 : (a) FAIT (it. 863 : 20,1 %, l'écart venait d'un autotest orphelin) refaire la mesure du panneau seul (22,3 % pris pendant un autotest ; repère 20-21 %) ;
  (b) FAIT (it. 862) bande, combat de boss en japonais : « 会心 116k » et « 凍結 » se superposent encore au-dessus du héros (texte large).
- P3 Revue it. 851 : (a) FAIT (it. 852) japonais, tuiles étroites de la Boutique : « バッグが満 / 杯 », « ポーショ / ン », « タマ / ゴ » coupés
  au dernier caractère (essayer line-break: strict / un mot par ligne, sans faire déborder) ; (b) FAIT (it. 860) nombres flottants
  de la bande face à un boss : encore vus sur sa couronne et sur la fin de son nom en montant (it. 846) ;
  (c) FAIT (it. 856) « Kitten lv. 10 » (Familiers, minuscule) mais « Lv. 1313 » sur la bande ; (d) VU (it. 857) sauvegarde de dev au niveau 1313 :
  « 1,54e105 » d'expérience : notation scientifique voulue au-delà de 1e36 (fmt), niveau irréaliste : laissé.

- FAIT (it. 854) P1 Bande en allemand à 1920 px (vu it. 853, zone 55, boss) : « Abgrundpanzer der Erwachte · −10 % LP » passe sous
  la pastille d'or (le nom s'étend vers la gauche depuis le boss, au bout de la bande) : le décaler / le couper avant.
- P3 Clavier (vu it. 850) : FAIT pour la carte (it. 853) et le « max » / « tout » des Talents (it. 855, Maj + Entrée).

- DEMANDES DE VICTOR (2026-11-10, après-midi et soir ; 2026-11-11) :
  X. FAIT, ABANDONNÉ (it. 751-763). Essai Tauri (la bande seule, compilée pour Windows) mesuré par Victor : 400 Mo de
     mémoire privée et 30,7 % d'un cœur, contre 382 Mo et 19,8 % pour Electron (hors PowerShell) : WebView2 est un
     Chromium comme Electron, et son rendu coûte plus cher. Pas de portage (on perdrait aussi Steam, le mode mini,
     l'icône). Le PowerShell compté dans la mesure était le terminal de Victor (npm start), pas celui du jeu.
  V. FAIT (it. 720). « Les boules visuelles d'un pétale de compétence complet passent derrière le personnage et
     reviennent devant » : le code le prévoyait (z-index 1 / 3) mais le héros n'avait pas de z-index : z-index 2.
  U. FAIT (it. 714, contrôles it. 715 et 718). « Les boutons pour récupérer une expédition sortent de l'écran et les
     autres font un scroll aussi » : bouton « Récupérer le butin » seul, pleine largeur ; boutons d'envoi sur une ligne.
  T. FAIT (it. 580, contrôle d'autotest it. 581). En combat de boss, on ne voit pas la barre de vie du boss ni la
     sienne (sous le nom du boss / sous les nombres de dégâts) : passées sous les pieds.
  L. FAIT (it. 498, à voir en jeu). Les attaques transpercées doivent atteindre directement la cible.
  S. (soir) Trois boss majeurs aux zones 50, 100, 150 (sur la carte, comme le boss final de la zone 200) ; chacun
     garde une relique unique, visible sur lui, puis obtenue : très puissante (les 10 zones suivantes faciles), par ex.
     un drone lance-missiles ; 4 reliques en tout (avec la zone 200), avec leur histoire. FAIT (it. 571-575).
  Q. FAIT (it. 548). Sorts uniques pour chaque héros (pas de copies d'un héros à l'autre).
  R. FAIT (it. 547). Perçage : appliqué dès l'impact (sans attendre que le héros arrive au monstre) ; traverse plusieurs ennemis selon
     le rang du sort.
  P. FAIT (it. 536). Garder cochées les ventes automatiques à l'ascension.
  O. FAIT (it. 521). Changer de musique toutes les 5 zones seulement.
  N. FAIT (it. 520, à écouter). Musique lofi façon Terraria, différente de zone en zone.
  M. FAIT (it. 499). Les icônes des onglets (barre du haut) disparaissent quand il y en a trop : les garder.

- DEMANDES DE VICTOR (2026-11-10, midi), à traiter en premier, dans cet ordre :
  J. FAIT (it. 471). Bouclier visible sur la barre de vie (blanc ou bleu).
  K. FAIT (it. 471). Renommer « Style de combat » ; le bloc du bas : « style de l'auto-attaque » ou équivalent.
  I. FAIT (it. 472, à voir en jeu). Animations des sorts spectaculaires et bien visibles.
  G. FAIT (it. 473). Une icône pour chaque sort.
  H. FAIT (it. 474). Des sorts qui transpercent l'ennemi et touchent le suivant.

- DEMANDES DE VICTOR (2026-11-10, fin de matinée), à traiter en premier, dans cet ordre :
  E. FAIT (it. 468). Aventure : le texte « clique un objet » (titre de la carte Équipement) ne veut rien dire.
  F. FAIT (it. 468). Aventure : on voit mal le compagnon à côté du héros dans la première carte.
  D. FAIT (it. 469, à voir en jeu). Style de combat : des sorts à apprendre pour ses héros, qui s'ajoutent à l'attaque de base, avec une animation.

- DEMANDES DE VICTOR (2026-11-10, sur Mac), à traiter en premier, dans cet ordre :
  A. FAIT (it. 431, à vérifier sur le Mac). Mac : icône Electron dans le Dock au lancement (npm start) : la cacher (app.dock.hide()).
  B. FAIT (it. 431). Mode mini : la petite ampoule (astuces) est sur l'icône du son.
  C. FAIT (it. 432-435, à écouter par Victor). Son : ambiance sonore par zone (bulles sous l'eau, etc.) ; bruitages des pièces (satisfaction) ; sons des
     événements (pluie d'or, vent, étoile filante) ; coups moins répétitifs ; musiques moins répétitives.

- DEMANDES DE VICTOR (2026-11-09), à traiter en premier, dans cet ordre :
  1. FAIT (it. 157) : quêtes réclamées même sac plein.
  2. FAIT (it. 158) : boutons automatiques des compétences cachés sans le Manuel du stratège.
  3. FAIT (it. 159) : classes triées par ordre de libération.
  4. FAIT (it. 160-161 : grilles, boutons alignés, équipement vide, tuiles de la boutique). Esthétique : cartes de tailles différentes dans une même rangée (Statistiques, panoplies du Bestiaire, et
     ailleurs) : faire le tour de tous les onglets et harmoniser (hauteurs égales par rangée). Équipement vide :
     emplacements vides pas beaux, à soigner.
  5. FAIT (it. 164). Nouveau joueur : trop de fonctionnalités d'un coup. Débloquer les onglets au fur et à mesure (talents,
     compétences, quêtes, boutique…) avec une annonce quand chacun se débloque (seuils de niveau/zone, sans
     retirer l'accès aux parties existantes).
  6. FAIT (it. 165, à ajuster selon le ressenti de Victor). Rythme du début trop rapide (trop d'objets, trop de déblocages en peu de temps) : ralentir la cadence des
     premières heures pour une progression plus tranquille, étalée dans le temps (demande explicite de Victor, elle
     prime sur la règle « ne pas rendre plus dur »). À mesurer avec first-minutes.mjs et simulate.js avant/après ;
     à faire avec le point 5 (déblocage progressif), sans toucher aux parties déjà avancées.
  7. FAIT (it. 162). Thème sombre par défaut pour le panneau (aujourd'hui il suit Windows, clair par défaut) : sombre par défaut, avec
     un réglage pour revenir au clair (ou suivre Windows). Vérifier les captures des deux thèmes.
  8. FAIT (it. 196-199) (demande du 2026-11-09 après-midi) : on débloque encore tout trop vite : « aller jusqu'à 200 zones » et
     répartir les déblocages (onglets et déblocages de boutique) dans le temps ; le joueur doit avoir le temps de
     s'habituer à un onglet avant le suivant. Étape 1 : mesurer la progression réelle sur plusieurs jours simulés.
     Fait (it. 196) : onglets étalés jusqu'à la zone 40. Fait (it. 198) : zone 200 atteignable. FAIT (it. 199) : déblocages étalés jusqu'à 200. (Ancien reste : zone 200 (le record plafonne vers 71-72 en une
     semaine simulée : revoir la courbe de fin de partie), puis répartir les déblocages de boutique jusqu'à 200.
  9. FAIT (it. 197). Mode mini / bande : les boutons réduire et agrandir ne sont pas dans le même ordre en mode mini et en grand ;
     icônes plus parlantes souhaitées. Les astuces (bulle à l'ampoule 💡) ne s'affichent plus quand le panneau est
     déplié : dommage (checkHints n'affiche rien si panelOpen).
  10. FAIT (it. 215, DROP_CHANCE 0,12). Trop d'objets tombent encore (au-delà du tout début, où earlyPace ne joue plus) : réduire la chance de butin
      générale (DROP_CHANCE 0,35) sans casser la progression (balance.mjs, semaine simulée).
  11. FAIT (it. 217 : (a) intro ; it. 219 : (b) Chroniques ; it. 222 : (c) Briseur ; it. 223 : silhouette + cinématiques ; it. 224 : intro, générique, succès) : une histoire, une intro, un but final et une fin, épiques, en plusieurs itérations.
      Univers : le Rebord (la bande au bord de l'écran), frontière entre le monde et le vide ; le Briseur d'Étoiles a
      fracassé le ciel (les éclats d'étoile du jeu) ; ses lieutenants (boss de zone) retiennent les héros (classes à
      libérer) ; le héros, dernier marcheur du Rebord, renaît plus fort à chaque ascension.
      Étapes : (a) intro au tout premier lancement, sobre et passable ; (b) Chroniques : fragments débloqués à des
      paliers (zones 10, 25, 50, 100, 150, héros libérés, 1re ascension), annoncés et relisibles ; (c) le Briseur
      d'Étoiles en zone 200 (boss unique, annoncé de loin) ; (d) fin : épilogue, générique, succès, puis « au-delà
      du Rebord » (le jeu continue). 10 langues, autotest, captures ; parties existantes : chroniques déjà méritées.
  12. FAIT (it. 218). Clic sur un objet : le détail s'ouvre à la place du panneau Équipement ; Victor le veut dans l'espace sous le
      sac (quitte à réduire des éléments du panneau Sac pour que ça tienne).
  13. FAIT (it. 226). Carte interactive et jolie du Rebord : voir son avancement dans le jeu et dans l'histoire (zones, biomes,
      boss/lieutenants, héros libérés, chroniques placées sur le chemin, Briseur d'Étoiles en zone 200 au bout).
      Idée : onglet ou fenêtre « Carte » dessinée en pixel art (chemin sinueux, repères cliquables, brouillard sur
      ce qui n'est pas encore atteint), à faire après le Briseur et la fin (demande 11), qu'elle mettra en valeur.
  14. FAIT (it. 221). Sac plein : les objets qui tombent restent sur le sol (perdus, « tant pis »), au lieu d'être vendus ou
      échangés automatiquement. Garder la vente automatique de l'Encanteur (autoSell, déblocage acheté) et le Valet
      d'armes ; vérifier les textes (« sac plein : objets vendus »), la ligne du journal, les quêtes Réclamer.
  15. FAIT (it. 223-228 : intro, chroniques, héros libérés, Briseur, générique). Histoire : de toutes petites cinématiques dans la bande, pixel art épique, avec musique et sons (render/,
      sound.js), pour l'intro, les chroniques marquantes, l'arrivée du Briseur d'Étoiles (zone 200) et la fin.
      Courtes (5 à 15 s), passables d'un clic, discrètes si le joueur travaille ; respecter le réglage du son.
  16. FAIT (2026-11-09). Écran ultra-large (Odyssey) : le panneau laissait de grandes bandes vides à gauche et à
      droite : il ne prend plus que la largeur de son contenu, les côtés laissent voir le bureau.
  17. FAIT (it. 239 : 20 héros ; it. 248 : duo et choix à l'ascension ; it. 249 : textes « héros ») : équipe de 2 héros, un à distance et un au
      corps à corps, qui combattent ensemble ; au moins 20 héros à libérer, étalés jusqu'à la zone 200 (environ un
      tous les 10 niveaux de zone, pas forcément pile) ; on ne parle plus de « classes » mais de « héros » ; le duo
      se choisit (se change) à l'ascension.
      Plan : (a) données : 10 héros existants rangés corps à corps / distance + 10 nouveaux (sprites, capacités),
      zones de libération étalées 10 → ~195 ; (b) moteur de combat à deux héros (le second frappe aussi, PV
      partagés ou séparés, équipement : celui du héros principal, talents par héros) ; (c) choix du duo à
      l'ascension (onglet « Héros ») ; (d) migration des parties (classe actuelle = héros principal, compagnon
      choisi à la prochaine ascension) ; (e) textes « classe » → « héros » dans les 10 langues ; équilibrage
      (balance.mjs, simulate 168 h), fuzz, carte du Rebord (20 cages).
  18. FAIT (it. 242-262 : sous-onglets Bestiaire, Statistiques, Héros, Boutique, Familiers ; fiches compactes ; Carte et Réglages sans défilement) : onglets moins chargés visuellement et sans défilement si possible. Bestiaire : n'afficher
      le contenu d'une section (monstres, panoplies, élites, collection…) qu'au clic sur son bouton (sous-onglets).
      Faire de même ailleurs quand c'est possible ; Carte et Compétences : chercher une idée (plus difficile).
  19. FAIT (it. 240). Les quêtes ne doivent pas proposer de récompenses encore inaccessibles (ex. œufs de
      familier avant l'onglet Familiers) ; vérifier aussi les autres récompenses (éclats d'étoile avant l'Ascension,
      élixirs avant la Boutique…).
  20. FAIT (it. 241). L'icône de la guilde (onglet Quêtes) ne plaît pas à Victor : dessiner un joli blason.
  21. FAIT (it. 243). Écran Samsung Odyssey G9 (5120 px) : en mode bande, les informations (or, niveau, zone,
      boutons) sont aux deux bouts de l'écran : fatigant à regarder. Les regrouper au milieu, juste au-dessus de la
      bande (ou en dessous si la bande est en haut), dans une languette qui sert aussi de bouton pour déplier le
      panneau.
  22. FAIT (it. 245). Prévenir quand le héros meurt plusieurs fois de suite dans la même zone (Victor ne
      regarde pas toujours le jeu) : signal visible sans regarder (bulle persistante, repère sur la bande / le mode
      mini / l'icône), avec les pistes utiles (équiper mieux, talents, revenir une zone en arrière, ascension).
  23. FAIT (2026-11-09). Son activé par défaut et bouton pour le couper à côté de réduire / agrandir.
  24. FAIT (it. 247). Musique de fond par zone, légère et discrète, dans l'esprit des jeux Game Boy Color
      (chiptune, compositions originales, aucune reprise) ; fondu enchaîné à chaque changement de zone ; 200
      musiques (une par zone jusqu'à 200). Idée : générateur procédural (Web Audio, sound.js) : gamme, tempo,
      instruments (carré, triangle, bruit) et motifs tirés d'une graine par zone, couleur selon le décor (forêt
      enjouée, crypte mineure, volcan rapide…), volume bas, réglage à part dans les Réglages et bouton son.
  25. FAIT (it. 246). Sons de coup différents selon l'arme (donc le héros) et selon l'ennemi touché ;
      « modificateur » de son par ennemi (hauteur, timbre, bruit : gluant mou, squelette sec, golem lourd…) pour
      que ce soit moins répétitif.
  26. FAIT (2026-11-09). (a) L'opacité de la bande en curseur horizontal, comme le volume ; (b) pouvoir couper
      les effets sonores sans couper la musique ; les boutons haut-parleur coupent les deux et rendent l'état
      d'avant au second clic.
  27. FAIT (it. 282). Onglet Ascension : ajouter des icônes (constellations, rangs, boutique d'éclats…).
  28. FAIT (it. 284). Mettre un objet à notre niveau (le remonter au niveau d'objet actuel) : très cher, et accessible tard
      (déblocage de boutique difficile à atteindre).
  29. FAIT (it. 282). Onglet Ascension : il reste un défilement, à éviter.
  30. FAIT (it. 282). Aventure : retirer le rappel « dépense 1 point de talent » (inutile) et le message des potions.
  31. FAIT (it. 283). Histoire : une courte cinématique épique, avec une ambiance, à chaque chronique débloquée (ne pas oublier
      le côté histoire).
  32. FAIT (it. 286, à étendre). Boutique > Déblocages : les afficher tous, en défilement latéral (molette de la souris, ou appuyer puis
      glisser) ; ergonomie à réutiliser ailleurs pour éviter les défilements verticaux.
  33. FAIT (it. 290 : étude, liste « À FAIRE » a-h ci-dessous). Étudier les jeux concurrents (Rusty's Retirement, TBH: Task Bar Hero, Desktop Heroes, Desktop Raid) : ce qui
      plaît vraiment aux joueurs et ce qui leur déplaît (avis Steam, forums) ; reprendre le bon, éviter ou retirer
      le mauvais si Sillwalker l'a déjà. Résultat : liste d'idées et de défauts ci-dessous (plusieurs itérations).
  34. FAIT (it. 291 : icône par effet ; it. 292 : 30 dessins uniques des remarquables et clés de voûte). Compétences : une icône unique pour chaque nœud de l'arbre, pour un graphe beaucoup plus joli (plusieurs
      itérations).
  35. EN COURS (it. 293 : étape 1 cadres et boutons ; it. 294 : onglets gravés, fond étoilé ; it. 295 : cases,
      curseurs, barres de défilement ; it. 296 : palette signature ; it. 297 : infobulles, bulles,
      séparateurs ; suite possible : ornements de coins, police de titres, palette signature). Revoir le design pour qu'il soit vraiment unique et qu'on ne devine pas qu'il vient d'une IA (plusieurs
      itérations) : identité visuelle propre (cadres, typographie, couleurs, ornements pixel art).

- ÉTUDE DES CONCURRENTS (demande 33, it. 290 ; synthèses d'avis Steam : vaporlens.app, gamepressure, presse).
  Rusty's Retirement (≈ 96 % positif) : aimé : calme et « cosy », petite place à l'écran, automatisation qui fait
  passer de l'actif à l'idle, art charmant, léger. Reproché : répétitif / peu profond (33), pas vraiment idle au
  début (24), pas de tutoriel / mécaniques floues (19), tout repart à zéro sur une nouvelle ferme (14), CPU/GPU élevés
  même en fond, ventilateurs (14), « toujours au premier plan » parfois ignoré, plein écran.
  TBH: Task Bar Hero (avis « mitigés ») : aimé : pixel art, boucle simple, progression, équipement visible sur le
  personnage, non intrusif, léger. Reproché : collecte de données, bans, bots, marché en argent réel, héros payants,
  baisses de butin, début lent, pas de tutoriel, texte trop petit (Steam Deck), plantages.
  Desktop Heroes (« plutôt positif ») : aimé : tourne en fond, pixel art. Reproché : demande trop d'attention (pas
  vraiment idle, interruptions), boucle monotone, inventaire pénible (vente, ramassage), niveaux lents pour libérer
  les héros, héros trop semblables. Demandé : ramassage automatique, prestige, équipement visible sur le héros.
  Desktop Raid (« plutôt positif ») : aimé : développeur réactif, contenu créatif, variété classes/compétences.
  Reproché : bugs (45), boss vaincu non comptabilisé (28), interface et guidage confus (22), descriptions de
  compétences floues : effets, multiplicateurs (18), scintillement des menus. Demandé : combats enchaînés, équiper en
  un clic, sauvegarde de secours, version macOS.
  Déjà chez Sillwalker : combats enchaînés, équiper en un clic (déblocage), vente auto, sauvegarde de secours,
  prestige, hors-ligne, taille du texte (Réglages), aucun achat ni collecte de données, équipement teinté sur le héros.
  À FAIRE (tirées de l'étude, par priorité) :
  a. EN PARTIE (it. 298 : réglage « Économie d'énergie », 15 images/s ; reste : mesurer sous Windows).
     P1 Bon voisin : consommation en fond (le reproche n° 1 des jeux de bande). Mesurer sous Windows ; envisager un
     réglage « économie » (images/s plafonnées) visible dans Réglages ; vérifier que la bande cachée ne dessine rien.
  b. FAIT (it. 299 : réglage « Cinématiques de l'histoire » ; it. 371 : IDLE=1, le jeu avance sans aucune action). P1 Ne pas interrompre : cinématiques et bulles jamais bloquantes pendant le travail ; réglage pour les couper
     (ou les rendre discrètes) ; vérifier qu'aucune action n'est exigée pour progresser (vraiment idle).
  c. FAIT (it. 302 : 9 libellés d'effets réécrits ; it. 303 : partie neuve vérifiée, geste « équiper » expliqué).
     P2 Clarté : descriptions de talents / compétences avec les vrais nombres (pas de multiplicateur obscur),
     premier lancement guidé (bulles d'astuces) : vérifier sur une partie neuve que chaque mécanique est expliquée.
  d. FAIT (it. 301 : greffes de branches ; it. 333 : Nichée ; it. 335 : Malédiction ; it. 425 : Tenace ; it. 427 : Voile protecteur ; it. 429 : voies mêlées).
     P2 Profondeur et variété (répétitif = reproche n° 1 de Rusty's) : les 10 nouveaux héros ont des arbres de
     talents aux mêmes effets que leurs modèles (seuls les noms changent) : leur donner des effets propres ; plus
     d'événements de zone et de mécaniques de boss.
  e. P2 Rien qui repart à zéro sans contrepartie : l'ascension garde déjà l'essentiel ; l'écran d'ascension le dit
     (fait) ; ne jamais ajouter de reset sans récompense visible.
  f. FAIT (it. 304 : plume et cape). P3 Équipement visible sur le héros (formes d'armes / casques, pas seulement des teintes).
  g. VU (it. 311 : tailles 11 px gardées, lisibles en police pixel ; réglage Taille du panneau 115 / 130 %).
     P3 Lisibilité : taille de texte par défaut confortable, contraste ; scintillement des menus à surveiller.
  h. Principes à garder : pas d'argent réel, pas de collecte de données, pas de héros payants, pas de baisse de butin
     silencieuse (toute baisse annoncée dans les notes de version).


- P1 Bon voisin, CODÉ (it. 321), À VÉRIFIER SOUS WINDOWS : la bande est « toujours au premier plan » et ne détecte pas les
  applications en plein écran (jeu, vidéo, présentation) : elle peut recouvrir le bas d'un jeu en plein écran
  sans bordure. Piste : un petit processus PowerShell persistant (lancé une fois) qui appelle
  SHQueryUserNotificationState toutes les 2 s (QUNS_BUSY, QUNS_RUNNING_D3D_FULL_SCREEN,
  QUNS_PRESENTATION_MODE) et masque la bande tant que c'est le cas (comme setLocked). Pas faisable sous
  Linux sans pouvoir le vérifier : à faire lors d'une session sous Windows.

- P3 Anciennes clés « (s) » devenues inutilisées dans keys.js (objet(s)…) : sans effet, à laisser
  (l'ordre des clés ne doit pas bouger).
- P2 Performance (revues it. 11 à 630) : bande ≈ 19 % d'un cœur, panneau ≈ 20-21 %, mini ≈ 6,5 %, icône ≈ 0,5 % (sous
  xvfb ; it. 594-598 : contours et halos dessinés dans les images) ; mémoire réelle ≈ 515 Mo stable (PSS, it. 601 ;
  l'ancien total RSS ≈ 800 Mo comptait la mémoire partagée plusieurs fois).
  Le décor est déjà en cache et le rendu ne se fait que sur changement. Sous xvfb, le GPU est émulé
  (rendu logiciel) : chiffres peu représentatifs. À mesurer sous Windows avant d'optimiser.
- P2 Progression lointaine : RÉSOLU (it. 196-205). Avant : plus aucun déblocage après ~6 h et mur vers la zone 71.
  Maintenant : onglets étalés jusqu'à la zone 40, déblocages jusqu'à la zone 200, monstres adoucis après la zone 60
  (zoneMight) ; semaine simulée : guerrier 161, mage ~150 (it. 205) ; avec sorts et reliques : mage ≈ 278, guerrier
  ≈ 287 (it. 617). PISTE OUVERTE (le joueur y arrive maintenant en une semaine) : de nouveaux objectifs au-delà de la
  zone 200 (boss, constellations, panoplies) ; à proposer à Victor plutôt qu'à lancer seul (gros contenu).
