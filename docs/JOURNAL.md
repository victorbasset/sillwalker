# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 71).

## Fait

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
