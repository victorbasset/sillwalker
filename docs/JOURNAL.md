# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 71).

## Fait

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

Priorité : P1 (bug visible / bon voisin) > P2 (retour, progression) > P3 (confort, contenu).

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
