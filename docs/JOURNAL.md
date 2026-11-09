# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 71).

## Fait

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


- P1 Bon voisin, À TESTER SOUS WINDOWS : la bande est « toujours au premier plan » et ne détecte pas les
  applications en plein écran (jeu, vidéo, présentation) : elle peut recouvrir le bas d'un jeu en plein écran
  sans bordure. Piste : un petit processus PowerShell persistant (lancé une fois) qui appelle
  SHQueryUserNotificationState toutes les 2 s (QUNS_BUSY, QUNS_RUNNING_D3D_FULL_SCREEN,
  QUNS_PRESENTATION_MODE) et masque la bande tant que c'est le cas (comme setLocked). Pas faisable sous
  Linux sans pouvoir le vérifier : à faire lors d'une session sous Windows.

- P3 Anciennes clés « (s) » devenues inutilisées dans keys.js (objet(s)…) : sans effet, à laisser
  (l'ordre des clés ne doit pas bouger).
- P2 Performance (revues it. 11 à 200) : bande ~17-19 % d'un cœur, panneau ~18-21 %, mini ~4 %, icône ~0,5 % (sous
  xvfb, depuis l'it. 163) ; mémoire ~700 Mo stable dans la durée (scripts/mem-watch.sh, it. 194).
  Le décor est déjà en cache et le rendu ne se fait que sur changement. Sous xvfb, le GPU est émulé
  (rendu logiciel) : chiffres peu représentatifs. À mesurer sous Windows avant d'optimiser.
- P2 Progression lointaine : RÉSOLU (it. 196-205). Avant : plus aucun déblocage après ~6 h et mur vers la zone 71.
  Maintenant : onglets étalés jusqu'à la zone 40, déblocages jusqu'à la zone 200, monstres adoucis après la zone 60
  (zoneMight) ; semaine simulée : guerrier 161, mage ~150. Piste suivante possible : de nouveaux objectifs au-delà
  de la zone 200 (constellations, panoplies), quand un joueur s'en approchera.
