# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 71).

## Fait

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
      zones 250, 300, 350, un niveau de plus par course) : rythme et difficulté des échos à juger en jeu.

Priorité : P1 (bug visible / bon voisin) > P2 (retour, progression) > P3 (confort, contenu).

- DEMANDES DE VICTOR (2026-11-10, après-midi et soir) :
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
