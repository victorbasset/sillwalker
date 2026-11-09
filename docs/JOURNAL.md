# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 71).

## Fait

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

Priorité : P1 (bug visible / bon voisin) > P2 (retour, progression) > P3 (confort, contenu).


- P1 Bon voisin, À TESTER SOUS WINDOWS : la bande est « toujours au premier plan » et ne détecte pas les
  applications en plein écran (jeu, vidéo, présentation) : elle peut recouvrir le bas d'un jeu en plein écran
  sans bordure. Piste : un petit processus PowerShell persistant (lancé une fois) qui appelle
  SHQueryUserNotificationState toutes les 2 s (QUNS_BUSY, QUNS_RUNNING_D3D_FULL_SCREEN,
  QUNS_PRESENTATION_MODE) et masque la bande tant que c'est le cas (comme setLocked). Pas faisable sous
  Linux sans pouvoir le vérifier : à faire lors d'une session sous Windows.

- P3 Anciennes clés « (s) » devenues inutilisées dans keys.js (objet(s)…) : sans effet, à laisser
  (l'ordre des clés ne doit pas bouger).
- P2 Performance (revues it. 11, 21, 31 ; it. 50 : −27 % sur batterie ; it. 52 : −58 % en absence) : bande ~33 % d'un cœur, panneau ouvert ~37 %, mini ~7 %,
  icône seule <1 %. Mémoire ~560-680 Mo (Electron).
  Le décor est déjà en cache et le rendu ne se fait que sur changement. Sous xvfb, le GPU est émulé
  (rendu logiciel) : chiffres peu représentatifs. À mesurer sous Windows avant d'optimiser.
- P2 Progression lointaine (revue it. 11, simulations 12 h guerrier/mage/rôdeur) : tous les déblocages sont
  acquis vers 5 h 30-6 h 15 de jeu ; ensuite plus aucun objectif de boutique. Une course sur 3-4 ne bat pas
  le record (ex. 42 → 42, 50 → 50, ~1 h). Fait (it. 12) : Maître de forge en zone 50 (~7 h). Fait (it. 13) :
  record à battre affiché sur la bande. Fait (it. 18) :
  Filet à étoiles en zone 55 (~8-10 h). Fait (it. 23) : Astrolabe en zone 60.
  Fait (it. 24) : record en bulle d'aide dans le mode mini.
