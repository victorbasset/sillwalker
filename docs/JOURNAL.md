# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 31).

## Fait

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
- P2 Performance (revues it. 11 et 21, inchangée) : bande ~33 % d'un cœur, panneau ouvert ~37 %, mini ~7 %,
  icône seule <1 %. Mémoire ~560-680 Mo (Electron).
  Le décor est déjà en cache et le rendu ne se fait que sur changement. Sous xvfb, le GPU est émulé
  (rendu logiciel) : chiffres peu représentatifs. À mesurer sous Windows avant d'optimiser.
- P2 Progression lointaine (revue it. 11, simulations 12 h guerrier/mage/rôdeur) : tous les déblocages sont
  acquis vers 5 h 30-6 h 15 de jeu ; ensuite plus aucun objectif de boutique. Une course sur 3-4 ne bat pas
  le record (ex. 42 → 42, 50 → 50, ~1 h). Fait (it. 12) : Maître de forge en zone 50 (~7 h). Fait (it. 13) :
  record à battre affiché sur la bande. Fait (it. 18) :
  Filet à étoiles en zone 55 (~8-10 h). Fait (it. 23) : Astrolabe en zone 60.
  Fait (it. 24) : record en bulle d'aide dans le mode mini.
