# Sillwalker : consignes pour Claude

Idle RPG Electron qui vit dans une bande au-dessus de la barre des tâches Windows.
Le README décrit le contenu et l'organisation du code ; ce fichier dit **comment travailler** ici.
`docs/POUR-VICTOR.md` regroupe ce qui attend Victor (Steamworks, sortie, vérifications Windows) : le tenir à jour.

## L'utilisateur

- Victor, francophone : réponses, commits et commentaires **en français**.
- Il **joue pendant que Claude travaille**. Aucun test ne doit le déranger (voir « Tests »).
- Il laisse souvent Claude **en autonomie** : enchaîner de longues rondes d'améliorations
  (performance, fun, ergonomie, design, contenu, accessibilité, bugs) **sans demander** s'il faut
  continuer, en choisissant soi-même les priorités. Ne pas s'arrêter après 3-4 changements.
- Sa vision du jeu : le joueur doit **ressentir une progression** au fil du temps. Toute nouvelle
  commodité ou automatisation passe par un **déblocage** acheté en boutique (`game/unlocks.js` :
  zone record + or, conservé à l'ascension) ; l'action manuelle reste possible avant l'achat.
- Il limite les clics : préférer une action directe (un clic, double-clic, survol) aux allers-retours.

## Règles absolues

- **Ne jamais toucher à la vraie sauvegarde** (`%APPDATA%\Sillwalker` sous Windows,
  `~/.config/Sillwalker` sous Linux). Pour tester sur ses données : en copier une dans un dossier
  de travail et lancer avec `--user-data=<copie>`.
- Ne jamais fermer le jeu de l'utilisateur ni l'application Claude.
- Commits : auteur « Victor Basset <victor.basset@yahoo.fr> » (réglé dans `.git/config` du serveur Ubuntu ;
  ailleurs, passer `-c user.name=… -c user.email=…`). Sur le serveur : `git commit -F <fichier-message>` seul,
  dans sa propre commande (les commandes enchaînées déclenchent des demandes d'autorisation), message en français, terminé par la ligne `Co-Authored-By` demandée par la session.
  Committer à chaque étape qui marche ; ne pousser que si l'utilisateur l'a demandé.

## Relais automatique (serveur Ubuntu)

- Depuis le 2026-11-12 : `scripts/relais-rc.sh` lance dans tmux (`sillwalker-relais`) une session Claude Code
  interactive avec Remote Control (« Sillwalker relais », visible sur claude.ai/code et l'appli mobile) qui enchaîne
  les itérations par `/loop` (consignes dans `scripts/auto-iteration.md`). Regarder : `tmux attach -t sillwalker-relais` ;
  arrêter : `tmux kill-session -t sillwalker-relais`. Elle garde le verrou `logs/auto-iteration.lock`.
- L'ancien relais (cron toutes les 10 min, `scripts/auto-iteration.sh`, `claude -p`, journal `logs/auto-iteration.log`)
  est commenté dans `crontab -l` : à réactiver seulement si la session tmux est arrêtée.

## Tests (toujours invisibles)

- `npm test` : syntaxe de tous les fichiers + i18n-check des 9 langues (it. 620) + tests de logique (Node seul, rapide).
  Il vérifie aussi que steam/achievements.md et steam/richpresence.vdf sont à jour (it. 653) : après un succès ou une
  classe ajoutés, relancer `scripts/steam-achievements.mjs` / `scripts/steam-richpresence.mjs`. `scripts/check-imports.mjs` (lancé par
  `npm test`) signale les constantes EN_MAJUSCULES utilisées sans import ; les autres oublis (noms en minuscules) ne se
  voient qu'à l'exécution : tout nouveau code d'interface passe aussi par un contrôle d'autotest ou `--crawl`.
- `npm run selftest` (Windows) / `npm run selftest:linux` (Ubuntu, écran virtuel ; tous deux via scripts/selftest.mjs,
  sur une COPIE temporaire de dev-data : la sauvegarde de dev n'est plus modifiée par les contrôles ; code de sortie 1
  si une vérification échoue) : parcours
  automatique de l'interface, doit afficher « N/N vérifications réussies ».
  Délai maximal 10 min (347 vérifications depuis l'it. 3083 ; 346 depuis l'it. 3069 ; 345 depuis l'it. 3039 ; 344 depuis l'it. 3037 ; 343 depuis l'it. 3036 ; 342 depuis l'it. 3010 ; 341 depuis l'it. 3002, ≈ 157 s depuis l'it. 3007 : cinématique de libération des contrôles à 1,5 s, plancher de finale-window.js abaissé à 1 s ; 340 depuis l'it. 2979 ; 339 depuis l'it. 2920 ; ≈ 164 s à l'it. 2938, ≈ 157 s à l'it. 2913 : la durée totale est affichée dans le bilan depuis ; ≈ 147 s pour 326, it. 2659 ; ≈ 145 s pour 324, it. 2618 ; ≈ 146 s pour 322, it. 2554 ; ≈ 143 s pour 318, it. 2478 ; ≈ 139 s pour 312, it. 2428 : les contrôles d’attente de la libération, ≈ 5,6 s chacun ; ≈ 119 s pour 307, it. 2394 ; ≈ 114 s pour 304, it. 2357 ; ≈ 110 s pour 299, it. 2285 ; ≈ 125 s à l'it. 2187, 293 vérifications ; ≈ 70 s avant la nuit du 17-18/11 ; `SELFTEST_MAX_MIN`) : au-delà, échec citant la dernière vérification (it. 863). Sortie complète gardée dans `logs/selftest-last.log` (et `logs/selftest-last-fail.log` pour le dernier échec) : un échec isolé se relit après coup (it. 906). `SELFTEST_TIMES=1` : les 12 vérifications les plus lentes à la fin (it. 2198 ; la bulle du morceau de musique, 7 s, ramenée à 2,3 s à l'it. 2199 : window.__musicSettle en dev).
  Avant une mesure `--perf`, vérifier qu'aucun Electron de test orphelin ne tourne (`ps -ef | grep electron`).
  D'autres services du serveur (node /backend, bitcoind, ckpool jusqu'à 93 % d'un cœur : bande 21,5 % puis 19,3 % à la relance, it. 2681) font aussi monter la mesure : bande 21,9 % au lieu de 19,5 % à l'it. 2581,
  charge moyenne ≈ 3 (`uptime`, `ps -eo pcpu,args --sort=-pcpu | head`) ; un chiffre haut se juge contre l'ancien commit mesuré aussitôt.
  Ni une simulation lancée en parallèle (it. 1861 : deux semaines `simulate.js` en même temps faisaient monter la bande de
  18,3 à 25,4 % et l'icône seule de 0,5 à 1 %). Pour attendre la fin d'un script : `pgrep -f "<nom>"` se trouve lui-même
  dans la boucle d'attente (sa ligne de commande contient le nom) : attendre le fichier de sortie, pas le processus.
- Partie d'une SEMAINE (scripts/fixtures/week-save.json, it. 2976 : record 353, or ≈ 2e39, PV en milliards, constellations toutes au
  maximum, sac plein) : elle a révélé en une soirée deux débordements, des nombres illisibles et un plantage du résumé d'absence que les
  autres sauvegardes de test cachaient. Elle est prise par lang-overflow (« xx semaine 1280 », NO_WEEK=1), stall-check, save-fuzz
  (FUZZ_BASE=semaine), perf (PERF_SAVE=…), mem-watch (MEM_SAVE=…). Régénérer : DUMP=scripts/fixtures/week-save.json node
  --experimental-default-type=module scripts/simulate.js 168 warrior, puis vider son journal (« log »).
- Parties bloquées : `node --experimental-default-type=module scripts/fuzz.mjs [graines] [minutes]` lance beaucoup de
  nouvelles parties (les 20 héros) et signale celles qui ne progressent pas (60 graines = 1200 parties, ≈ 1 min). `FUZZ_DAYMOD=<clé|all>` : avec une bénédiction du jour active (it. 1278 ; elles changent la file : élites, gobelins, champions). À relancer après
  tout changement des monstres, élites, champions ou de la mort du héros.
- Parties figées dans des sauvegardes avancées (it. 1964) : `node --experimental-default-type=module scripts/stall-check.mjs [heures=2]`
  (dev-data, fin de partie, 0.1.2, semaine depuis l'it. 2982 × les 20 héros ; « 80 parties, 0 figées » attendu ; `STALL_DAYMOD=all` : une
  bénédiction du jour par héros). fuzz.mjs ne voit que des parties
  neuves : l'impasse « boss qui se régénère contre héros qui encaisse tout » (it. 1958) et celle du serviteur du nécromancien
  (it. 1964) n'apparaissaient qu'en partie avancée. Garde-fous dans game.js (emportement après 90 s, abandon après 3 min).
- Sauvegardes abîmées : `node --experimental-default-type=module scripts/save-fuzz.mjs` (27 corruptions écrites à la main
  de la sauvegarde de dev, chacune « ok », puis un balayage de chaque donnée et de chaque champ des sous-objets avec sept
  valeurs absurdes : « ok balayage (N corruptions) » attendu, ≈ 35 s ; it. 873 ; chaque corruption passe aussi par les moments à risque (mort face à un boss, boss vaincu, événement, coffre, étoile, achat d'un déblocage, quêtes : exercise(), it. 903) et par les actions du joueur (sac, forge, boutique, familiers, points, ascension : it. 904) ; le balayage touche aussi les champs d'un objet, d'une quête, d'un familier et d'une expédition (it. 905). Un cas qui ne finit pas (boucle sans fin) : `FUZZ_TRACE=1` affiche chaque cas avant de le jouer, le dernier affiché est le coupable ; un nouveau moment de ce genre s'y ajoute). À relancer après tout ajout de donnée sauvegardée. Il lit l'heure réelle (pas l'horloge virtuelle) : un cas qui
semble « sans fin » peut n'être qu'une lenteur répétée sur 1 200 cas (it. 1345 : « tout dépenser » du grand graphe à
400 ms) ; chronométrer un cas isolé avant de chercher une boucle. `FUZZ_BASE=fin` : même balayage à partir de la partie de fin de partie (scripts/fixtures/endgame-save.json, it. 999) ; `FUZZ_BASE=0.1.2` : à partir d'une partie de la version 0.1.2 (scripts/fixtures/save-0.1.2.json, it. 1149) ; `FUZZ_BASE=semaine` : partie d'une semaine (scripts/fixtures/week-save.json, it. 2978 : y a trouvé un plantage du résumé d'absence, nombre de coffres décimal).
- Mémoire dans la durée (fuites) : `scripts/mem-watch.sh [minutes] [vitesse]` (éditions « Quoi de neuf » marquées lues dans sa copie
  depuis l'it. 2130, `MEM_NEWS=1` pour la garder ; mesure BIMODALE ≈ 570 ou ≈ 625 Mo d'une exécution à l'autre, même code : it. 2130-2132,
  une dichotomie sur une mesure par commit a désigné à tort une édition « Quoi de neuf » ; alterner plusieurs exécutions par commit) (Linux ; « réel » = PSS de l'arbre Electron ≈ 565-575 Mo stables
  attendus (it. 1991 : deux mesures à 625-630 Mo dues à l'état de la machine ; un écart se juge contre l'ancien commit mesuré
  aussitôt après, en git worktree) depuis la bande originale (it. 1541 : +55 Mo, le morceau décodé en mémoire pour une boucle sans blanc ; 485-530 avant ; it. 1728 : 542-550 sur 8 min, plat) (bruit d'une mesure à l'autre), son et musique actifs ; `MEM_ARGS="--mode=mini"` : mode mini (it. 2293 : 505-518 Mo sur 10 min, plat) ; `MEM_ARGS="--open-panel"` : panneau ouvert (it. 2258 : 580-610 Mo sur 10 min, plat ; 5 min seules montraient une fausse hausse 585 → 609 avant le passage du ramasse-miettes : mesurer 10 min) ; `MEM_ARGS="--stage=<fichier.js>"` y ajoute une mise en scène (it. 1567 : changement de morceau toutes les 20 s, 540-660 Mo en dents de scie, sans croissance) ; l'ancien total RSS ≈ 800 Mo comptait la mémoire partagée plusieurs fois et l'écran virtuel).
- Rythme de la première heure : `node --experimental-default-type=module scripts/early-pace.mjs` (objets, niveau,
  zone, déblocages à 2, 5, 10, 15, 30, 60 min ; 3 graines, `SEEDS=10` pour moins de bruit : sur 3 graines, ±3 niveaux et
  ±3 zones à 60 min, it. 1444-1445 ; `CLS=<classe>` : un héros précis, it. 1830). Le début est volontairement calme (`earlyPace`, rules.js).
- Rythme des quêtes : `node --experimental-default-type=module scripts/quest-pace.mjs [heures=12] [graines=1,2,3]` (par sorte :
  tirées, accomplies, durée moyenne ; ≈ 3 min pour 12 h × 3 graines ; repère it. 2869 : tuer 11 min, chasses 69 min, champions 159 min,
  150 accomplies ; it. 2892, après les it. 2873-2874 : champions 59 min, 226 accomplies ; son joueur n'achète AUCUN déblocage : jamais la
  Carte du voyageur, donc plus aucune chasse depuis l'it. 2873).
- Combats : `node --experimental-default-type=module scripts/fight-odds.mjs [heures=12] [graines=1,2,3] [classe]` (taux de défaite contre
  normaux, élites par sorte, champions, boss ; repère it. 2874 : 0 / 31 / 46 / 57 % ; les champions perdaient 94 % avant, plus forts
  que le boss de leur zone, ce qu'aucune simulation de record ne montrait). À relancer après un changement des monstres ou des élites.
- Ouverture des onglets : `node --experimental-default-type=module scripts/tab-pace.mjs` (minute d'ouverture de chaque
  onglet, 3 graines) ; à relancer si on touche aux seuils de game/tabs.js ou au rythme du début.
- Fin de partie : `node --experimental-default-type=module scripts/simulate.js 168 <classe>` (une semaine, ~80 s) :
  les records des dernières courses doivent progresser régulièrement (repère it. 449, Atelier acheté, voie prise : mage 38 → 179 ; it. 486 avec les sorts : 38 → 182 ; it. 561, sorts uniques et Grimoire étendu au compagnon : mage 186, guerrier 189 ; it. 571, reliques des boss
  majeurs (relics.js, RELIC_POWER / DRONE) : mage 251, guerrier 263 ; it. 608, niveaux des reliques (+10 % par victoire,
  5 au plus) : mage 275, guerrier 286 ; it. 639, échos (250-350) et Drone soumis à la carapace : mage 278, guerrier
  286-301 (une graine) ;
  it. 712, Forgeron des astres (zone 230) : mage 283-302 (3 graines), guerrier 301 ; it. 736, Herboriste (260) et Marchand
  attitré (300), déblocages remis dans l'ordre des zones : mage 286-287, guerrier 302 ; it. 899, après les événements et élites des it. 878-898 : mage 298, guerrier 311 (une graine) ; it. 965, après la Ruée des gobelins et les Écailles (15e capacité de boss) : mage 293, guerrier 293 (graine 7) / 307 (graine 3), contre 298 / 298 juste avant : bruit ; it. 1017, horloge virtuelle (déterministe), panoplies, expéditions et Maîtrises du joueur simulé : guerrier 293, mage 293 ; une 2e semaine continue lentement, 321-335 (it. 1032) ; it. 1078, grand graphe autour de la fleur dépensé par le joueur simulé (skillgraph.js, GRAPH_SCALE 0,3) : guerrier 335, mage 320 (avant : 293 / 293) ; it. 1110, avec les paliers des maîtrises (it. 1084, option « a ») : guerrier 335, mage 324 ; it. 1115, points en surplus du grand graphe rempli (+0,1 % chacun) : guerrier 350, mage 349 ; sans saut ni plafond ; it. 1708, revérifié : 350 / 350, 6 158 éclats chacun : les dernières courses butent sur l'écho de la zone 350, franchi en 2e semaine, 419 à 336 h : un palier, pas un plafond ; it. 2053, Chevalier et Briseur plus coriaces : records inchangés, premier Briseur à Lame 4-5, 48-61 h ; it. 2332, grand graphe allégé (222 nœuds, trois voies libres, VOIE_SCALE 0,85) et clés de voûte sans malus : 350 / 350 (graines 7 et 3), mêmes paliers ;
  `RELIC_LOG=1` affiche chaque relique gagnée avec les niveaux). Le record
  de la semaine est la DERNIÈRE ligne du tableau « Courses » (plus de 40 courses : `grep '│' | tail -1` sur la sortie
  entière) ; un `grep -A30` en coupe la fin et fait croire à une chute (it. 1588 : « 285-307 », en vrai 349). À relancer après tout changement de zoneMight (rules.js) ou des zones de déblocage, et après
  tout déblocage qui dépense de l'or tout seul (it. 486 : le Grimoire des sorts, appelé à chaque victoire, vidait l'or et
  plafonnait la semaine à 155 ; balance 12 h ne le voyait pas).
- Dix premières minutes : `node --experimental-default-type=module scripts/first-minutes.mjs` (seconde de la première
  récompense de chaque sorte, 3 graines). À relancer si on touche au début de partie.
- Horloge virtuelle (it. 1009) : simulate, early-pace, first-minutes, tab-pace et fuzz importent EN PREMIER
  scripts/virtual-clock.mjs (Date.now() part d'une date fixe et avance avec g.advance()). Avant, la boutique, les
  expéditions et les familiers lisaient l'heure réelle : une semaine simulée ne durait que 3 min réelles (étal presque
  jamais renouvelé, aucune expédition revenue) et le résultat dépendait de la charge de la machine (mage, semaine : 184
  ou 291 avec le même code ; une dichotomie a désigné un commit d'affichage innocent). Tout nouveau script qui fait
  tourner une partie : même import. balance.mjs contre un commit d'avant l'it. 1009 compare deux horloges : bruit en plus.
- Simulation d'équilibrage : `node --experimental-default-type=module scripts/simulate.js [heures] [classe]`
  (quelques secondes ; si elle dépasse une minute, c'est une boucle sans fin : instrumenter tout de suite).
  `IDLE=1` : joueur totalement absent (repère it. 371 : guerrier record 12 → 15 en 12 h ; it. 698 : 15 à 9 h, 16 à 12 h ; le jeu avance sans action).
  `VOIE=0|1|none` : voie de talents prise dès qu'elle est permise (0 par défaut depuis l'it. 448 ; none = l'ancien comportement).
  `PARTNER_SPELLS=1` : le compagnon a les mêmes rangs de sorts que le héros (pire cas des sorts du compagnon ; repère it. 514 :
  ≈ +1 zone en 12 h, nécromancien +5).
  `SEED=<n>` devant la commande change la trajectoire aléatoire (graine 7 par défaut) : utile pour savoir si un
  écart vu sur une seule simulation est du hasard (lancer 5 graines).
- Une seule simulation suit une trajectoire aléatoire fixe : pour juger un changement d'équilibrage,
  `node scripts/balance.mjs 12 <commit>` compare le record moyen en 12 h des 10 classes entre ce commit et
  l'état actuel (≈ 1 min 15) ; un écart de ±1,5 zone est du bruit. Par héros, le bruit d'une seule graine va jusqu'à
  ±4 zones (it. 627 : lancier 67 puis 62, gardien 65 puis 69) : avant de régler UN héros, moyenne d'au moins 3 graines
  (`SEED=3 HEROES=all …`, `SEED=11`, `SEED=21`, en parallèle). Les records de 12 h tombent sur des paliers (murs des zones 62, 65, 69…) : un réglage qui fait
  franchir un palier à 2 graines sur 3 semble valoir +2,7 zones et n'en vaut que +1 (mage, it. 1748 puis 1751 sur 7 graines) ;
  confirmer sur 4 graines de plus (21, 31, 41, 51) avant de garder, en comparant à l'ancien réglage (git worktree). Tableau des 20 héros sur un commit : `node --experimental-default-type=module scripts/hero-table.mjs [heures] [graines] [parallèle]` (≈ 3 min 30 pour 12 h × 3 graines ; repère it. 1017, Maîtrises dépensées par le joueur simulé : 61,3 artificier → 66,3 paladin, moyenne 63,7 ; it. 1118 : 61,0 assassin → 66,7 samouraï, moyenne 63,7 ; it. 1584, après le duo protecteur (it. 1526) : 62,7 assassin et prêtresse → 67,3 paladin et gladiateur, moyenne 64,8 ; it. 1825 : 61,7 assassin → 68,0 moine, moyenne 65,0, écart 6,3 ; it. 2264, graines 7,3,11 : moyenne 63,8, mage 61,0 le plus bas, écart 5,3 ; it. 2452, HEROES=all, graines 7,3,11 : moyenne 64,9, écart 4,0 (nécromancien 62,7, 63,3 sur 7 graines → chaman 66,7) ; it. 2609, le joueur simulé agrandissant son sac (it. 2599) : moyenne 65,1, écart 5,0 (ranger 62,7 → gladiateur et gardien des étoiles 67,7) ; le 2e argument est une LISTE de graines : « 3 » seul n'en lance qu'une). `HEROES=all` devant la commande : les 20 héros (≈ 2 fois plus long). À lancer après tout ajout qui touche aux combats.
- Toujours lancer Electron avec **`--ghost`** : fenêtre hors écran, sans focus ni icône de notification. Sans `--user-data`, `--ghost` part d'un dossier temporaire neuf (it. 1318 : jamais la vraie sauvegarde).
  Options utiles (dev) : `--user-data=<dossier>`, `--tab=<onglet>`, `--mode=strip|mini`,
  `--shot=<fichier.png> --shot-delay=<ms>`, `--exit-after=<s>`, `--width=1366`,
  `--dump-text=<fichier>` (texte de chaque onglet, pour traquer les textes non traduits), `--demo`,
  `--battery` (simule un portable sur batterie : 20 images/s), `--idle` (simule un utilisateur absent : 10 images/s). `--reduced-motion` (simule « réduire les animations » du système : prefers-reduced-motion, it. 2488).
  `--release-ui` : cache les commandes de dev (DEV, ×1, ×3, ×10) pour des captures fidèles à la version distribuée.
  `--stage=<fichier.js>` : exécute un script dans la page (window.__game en dev) pour mettre en scène un état rare ;
  y écrire avec `console.warn` (seuls avertissements et erreurs de la page remontent dans la console, it. 1335).
  Copie de sauvegarde pour une capture : régler `s.last = Date.now()`, sinon l'absence simulée au lancement épuise
  élixirs et effets avant l'image (it. 1340).
  `--crawl` : clique sur tous les boutons de tous les onglets, chaque sous-section l'une après l'autre, et affiche `CRAWL-ERREUR …` / `CRAWL-FINI N clics en S s`
  (≈ 500-530 clics en 18 s depuis l'it. 2171 : avant, ≈ 690, dont 300 sur « Changer » des quêtes qui tournaient en boucle, et les
  confirmations restées ouvertes étaient VALIDÉES par le parcours ; ≈ 690 clics en 22 s depuis l'it. 1338 : avant, un clic qui redessinait l'onglet faisait « cliquer » des boutons détachés, sans effet, et le Marchand n'était jamais parcouru)
  (sur une COPIE de sauvegarde : il achète, vend, dépense ; ajouter `--exit-after=200`, sinon le jeu reste ouvert). À lancer après un gros changement d'interface.
  ⓘ cachés (it. 2204-2205, après le ⓘ des Familiers sous l'ombre d'une rangée qui défile) : `--open-panel --width=1280
  --stage=scripts/stage/info-probe.js --exit-after=25` sur une copie, « IPROBE 0 » attendu (ⓘ recouvert, hors de son conteneur ou dans
  l'ombre d'une rangée .hscroll). Préparer la copie JUSTE avant (s.last) : sinon le résumé d'absence s'ouvre et « recouvre » tout.
  Rangée d'informations de la bande (it. 3040) : `--width=1280 --stage=scripts/stage/hud-probe.js --exit-after=22` sur une copie,
  « HPROBE 0 / N » attendu (nombres, icônes de sorts, bannières passés sur la rangée en 15 s ; à 1280 px le héros combat sous la pastille
  de gauche) ; partie neuve, dev-data et partie d'une semaine. Trois défauts trouvés ainsi (it. 3035, 3037, 3039).
  Textes rognés par un cadre (it. 3070) : `--open-panel --width=1280 --stage=scripts/stage/clip-probe.js --exit-after=40`, « CPROBE 0 »
  attendu (tous les onglets ; lang-overflow ne voit que ce qui fait défiler, pas un texte coupé par son cadre : it. 3069, Carte). Validée
  sur l'ancien défaut (1 cas) ; partie d'une semaine en fr, de, ru, pl, ja et dev-data en ru : 0. Depuis l'it. 3084, aussi le texte qu'un
  élément coupe lui-même, et « … » demandé sur un conteneur flex ou grid (jamais dessiné : « Compag », it. 3083).
  Depuis l'it. 3093, le même contrôle fait partie de --overflow-report (donc de lang-overflow, tous ses états) : « onglet-rogné=N(textes) ».
  Nombres flottants (it. 3057) : `--stage=scripts/stage/float-probe.js`, « FPROBE … sur bulle/boss B · paires P » (repères dans le script ;
  freeSpot, sans place libre, prend la place sans obstacle qui recouvre le moins de nombres : it. 3052, 3056).
  De temps en temps, le lancer dans une langue à trois pluriels (`settings.lang = "ru"` ou `"pl"` dans la copie) : une forme mal écrite ne casse qu'à l'affichage.
  Sous Linux, préfixer par `xvfb-run -a -s "-screen 0 1920x1080x24"` et ajouter `--no-sandbox`.
- Captures dans une autre langue : la langue vient de la **sauvegarde** (`settings.lang` dans `save.json`
  de la copie), pas de `settings.json`. Partie neuve (dossier vide) : langue du système (lue par le processus principal,
  app.getPreferredSystemLanguages, it. 1538), à forcer avec `--lang=fr-FR` (lu dans process.argv) ; sous Linux, LANGUAGE / LANG. Le panneau est sombre par défaut ; pour capturer le thème clair, mettre `settings.theme = "light"` dans la copie
  (ou `"auto"` + `--force-dark-mode` pour tester le suivi de Windows).
- Les erreurs de l'interface s'affichent dans la console sous la forme `[renderer error] …`.
- Tests logiques : le `freshState` de `test-logic.js` donne TOUS les déblocages sauf `armsValet`, `skyChart`, `spellBook`,
  `starSmith`, `herbalist` et `trader` (ils changent les comptes d'équipement, d'éclats et d'or) : un nouveau déblocage automatique peut fausser d'anciens tests ; l'exclure
  là s'il le faut, et le tester à part.
- Performance (`--perf`) : `npm run perf` / `perf:linux` passent par scripts/perf.mjs, qui copie dev-data dans un dossier temporaire
  (it. 2052 : avant, ils lançaient le jeu sur dev-data même, qui avançait à chaque mesure) ; `PERF_SAVE=<fichier.json>` mesure une autre partie, ex. scripts/fixtures/week-save.json, it. 2984 : bande ≈ 26 % contre ≈ 20,5 % pour dev-data, compagnon ≈ 2,5 points, le reste réparti sur les effets de combat d'une partie avancée). Un onglet précis : `node scripts/perf.mjs --no-sandbox --tab=<onglet>` sous xvfb-run (l'onglet reste affiché pendant les phases, vérifié it. 2465 ; Compétences à graphe plein ≈ +0,5 point sur l'Aventure). Toujours mesurer sur une copie NEUVE de dev-data à chaque essai (une copie réutilisée a avancé :
  autre zone, autre combat, la comparaison ne vaut rien). Les sorts coûtent ≈ +3 points d'un cœur en rendu logiciel (it. 479).
  Animation CSS infinie sur un élément de la bande (même un simple translate) : ≈ +9 points (it. 593, flottement du
  drone : 20,8 → 29,8 %) : jamais d'animation CSS permanente sur la bande ; animer dans la boucle d'images existante. Même une animation CSS COURTE, si elle revient souvent : les anneaux de sorts (0,55 s, une quinzaine en 10 s) coûtaient ≈ 6 points en fin de partie (37 → 32 %, it. 1064) ; le mode mini, 9 → 7,4 %. Pour trouver un coupable : masquer une classe (`display: none` en injection TEMP) et comparer la part GPU de `--perf`. Un filtre CSS sur un élément qui s'allume à chaque coup coûte aussi cher : l'entaille du héros (trois drop-shadow au rang 4) valait ≈ 8 points en fin de partie (32 → 24 %, it. 1065) ; sa lueur est maintenant dessinée une fois dans une image (strip.js, bakedSlash). Même cas pour les projectiles des héros à distance (≈ 7 points, 31 → 24,5 %, it. 1066) : halo en dégradé radial qui voyage derrière (`.projglow`). La partie de fin de partie joue un guerrier (corps à corps) : mesurer aussi un héros à distance (`s.cls = "ranger"` dans la copie). Filtre CSS
  (drop-shadow) sur un monstre : ≈ 0,5 point par ombre empilée sur une file (it. 595) : dessiner le contour dans l'image
  (sprites.js outlinedFrames), comme les élites et champions.
  Halos d'état du héros (venin, malédiction, frénésie…) : un fond dégradé radial derrière le personnage, pas un
  drop-shadow (refait à chaque image de l'animation : −0,7 point pendant un combat contre un boss venimeux, it. 973).
  Répartition de la bande (it. 567, 20,2 %) : son + musique + ambiance ≈ 3,5 points (le moteur audio actif et la musique ≈ 1,7 ;
  ambiance seule et effets sonores seuls : dans le bruit), « Effets complets » ≈ 2,8, météo + jour/nuit ≈ 1,1.
  Repère actuel (it. 800, copie neuve de dev-data) : bande ≈ 19,5 %, panneau ≈ 20-21 %, mini ≈ 6,6 %, icône ≈ 0,5 % ;
  depuis l'it. 964, bande ≈ 20,5 % : le boss de zone 55 de dev-data a changé de capacités (venin + coup dévastateur,
  plus d'effets à l'écran ; it. 972, dichotomie par commits). Le repère dépend de ce combat : comparer deux commits
  sur la même copie, jamais un chiffre à un repère d'une autre époque (scripts de l'it. 972 : dossier de travail git) ; dans un git worktree, copier dev-data (non suivi par git) et lier node_modules, sinon perf ne mesure rien, sans erreur (it. 2963)
  (stable depuis l'it. 597). Sous Windows chez Victor (Gestionnaire des tâches, it. 763) : ≈ 19,8 % d'un cœur et
  ≈ 380 Mo de mémoire privée.
- Son (impossible à écouter sur le serveur) : l'autotest rend hors ligne (OfflineAudioContext) tous les sons de
  render/sound.js et signale erreur, NaN ou saturation (pic > 0,2 ; les effets font ≈ 0,02) : ajouter tout nouveau son
  à sa liste (selftest.js, « son : tous les sons ») ; pour comparer des volumes, même méthode dans une injection TEMP.
  Musique (it. 1541) : 4 morceaux composés à la main (un par tranche de 50 zones) + « La Dernière Étoile » pour la zone 200
  seule (it. 2341, docs/FINALE.md : trackIndex(200) = 4, hors du cycle), rendus HORS du jeu par
  `scripts/music/` et livrés en `src/renderer/assets/music/*.opus` ; plan, choix et mesures : docs/MUSIQUE.md. Retoucher
  un morceau : sa partition `scripts/music/tracks/<morceau>.js`, puis `xvfb-run -a node_modules/.bin/electron
  --no-sandbox scripts/music/render.cjs <morceau> <x.wav>` (STEMS=1 : pistes séparées, `scripts/music/stems.py`), puis
  `<venv>/bin/python -I scripts/music/master.py <x.wav> <sortie> --loop` (−16 LUFS, Opus + MP3, mesures) et copier
  l'Opus dans assets/music/. L'autotest décode les 4 (NaN, saturation, rapport des volumes < 1,3) et vérifie la lecture.
  Victor écoute les MP3 déposés dans Médias/dist-itch/musique/.
  Lecture (render/music.js) : bulle « ♪ » à chaque nouvelle tranche (app.js, une fois par morceau et par lancement, bande
  affichée seulement), 📌 `settings.musicPin` (morceau gardé, -1 = selon la zone), tampon décodé libéré quand la bande
  reste cachée 1 min (`hide`, son en pause : l'autotest doit faire de même) ou curseur à 0 % ; un décodage arrêté en
  route ne remet pas le tampon en mémoire (it. 1563). Autotest : décodage des 4, lecture, aperçu, 📌, bulle, libération.

## Sortie sur Steam (it. 781-799)

- État et reste à faire : `steam/checklist.md`. Textes du magasin (10 langues, tags) : `steam/store-page.md`.
  Elle cite des nombres (héros, compétences, nœuds du grand graphe, régions, monstres, automatismes, événements rares, capacités de boss,
  élites, quêtes) : les mettre à jour dans les 10 langues après un ajout de ce genre (it. 913) ; `npm test` le vérifie
  (scripts/steam-store-check.mjs, it. 914 : nombres de la liste « vraie progression », dans l'ordre, sans autre chiffre).
- App ID : `node scripts/steam-set-appid.mjs <id>` (npm test refuse la relance par Steam avec l'App ID de test 480).
  Envoi : `npm run dist` puis `npm run steam:build` (fichiers SteamPipe dans `steam/build/`, hors git).
- Images et vidéos (`steam/screenshots`, `capsules`, `achievement-icons`, `media`) : régénérables par
  `scripts/steam-prep-save.mjs` (sauvegarde sans bulles, à partir d'une partie `simulate.js` avec `DUMP=`),
  `steam-compose.py` (captures sur un bureau), `steam-capsules/make.js` (aussi les images promotionnelles itch.io,
  `ONLY=itch-social|itch-favicon|itch-wide-cover|itch-logo`, logo recadré ensuite, it. 1768 ; et la couverture d'un devlog,
  entrée `update-<version>` avec ver et tags) et `achicons.js`, `steam-video.sh`,
  `steam-trailer.sh` (option de dev `--tour`). Bandes-annonces promo (10 langues × 3 coupes, it. 1684) : `scripts/promo/shoot.mjs`
  (plans, LANG_UI), puis `scripts/promo/build-videos.sh` (musique « Le Rebord » par music.py, bruitages et volume par sfx.py
  à −32 dB, PROMO_DB ; images par edit.py) ; ≈ 3 min 30 de tournage et 6 min de montage par langue. Outils Python (Pillow, fontTools, ffmpeg de pip imageio-ffmpeg) :
  dans un environnement virtuel du dossier temporaire, jamais dans le dépôt. Chaque nouvelle génération ajoute
  plusieurs Mo à l'historique git : ne régénérer que si le rendu change vraiment.

## Traductions (10 langues, anglais par défaut)

- Texte affiché : l'écrire en français dans `tx("…")` (ou `tr()` pour les noms de données).
- Nouvelles clés : `node --experimental-default-type=module scripts/i18n-append.mjs '["clé 1","clé 2"]'`
  (ajoutées à la fin de `i18n/keys.js`, l'ordre ne bouge jamais), puis les traduire dans
  **chacun** des fichiers `src/renderer/i18n/lang/{en,es,pt,de,pl,ru,zh,ja,ko}.js` (indice = position),
  et vérifier avec `scripts/i18n-check.mjs <langue>` (0 problème attendu). Depuis l'it. 1495, il signale aussi une clé
  sans traduction dans TOUTES les langues (avant, il ne comparait qu'à l'anglais) ; une clé technique (classe CSS,
  police, transformation) s'ajoute à sa liste TECH.
  Un texte qui cite « un libellé » du jeu doit le citer tel qu'il est traduit : `scripts/i18n-quotes.mjs` (lancé par `npm test`) le vérifie dans les 9 langues. Les chemins cités sans guillemets (« Bestiaire > Panoplies ») aussi : `scripts/i18n-paths.mjs` (it. 1306), ainsi que les noms d'onglets cités entre parenthèses (« Mama Gałązka (Pupile) », it. 1370). Noms du jeu cités dans d'autres textes (familiers, déblocages, panoplies…) : `scripts/i18n-names.mjs` à lancer à la main après un ajout (faux positifs grammaticaux à juger, it. 1374).
- Pluriels : `txn(n, "{n} objet|{n} objets")` (i18n/index.js) ; chaque traduction donne ses formes séparées
  par « | » : 1 (zh, ja, ko), 3 (ru, pl : one|few|many), 2 sinon (vérifié par i18n-check). (L'ancienne méthode `plS(n)`,
  qui ne marchait qu'en français et en anglais, est retirée depuis l'it. 685.)
  Nombres : `fmt`, `fmtShort`, `unit("%")`, `dec()` de `game/format.js` (format de la langue).
  Dans une traduction : « 10 % » espacé en fr, es, pt, de, pl, ru seulement ; « 10% » en en, zh, ja, ko (npm test le vérifie, it. 2067).
  Portugais : variante BRÉSILIENNE (« você », “ ”, « clique », « às vezes ») ; npm test refuse « » et les marques européennes (it. 2758).
  Noms communs en minuscules : `lc()` (garde la majuscule allemande). Espace avant « : » : `fsp()`.
  Espaces insécables (it. 949-950) : `NB` (format.js) et `fsp()` sont de vraies U+00A0 (U+202F manque aux polices pixel ;
  le séparateur français des milliers de toLocaleString est U+202F : passer par `locInt`/`fmtFull` de format.js, it. 1002) ;
  `t()` rend insécable l'espace qui suit un nombre devant un mot ou « % » (« 20,53 M or », « 8 h », it. 952) ; les
  descriptions des données (translateData, français compris) celle de « 40 % ». Dans test-logic, `assert` compare avec
  des espaces ordinaires ; `assertStrict` pour tester les insécables.
  Libellé + valeur : `colon()` (« : » français, « ： » japonais / chinois, « : » ailleurs ; it. 869), espace entre deux phrases : `wsp()`.
  Listes : `.join(csep())`, point final ajouté à un texte : `cend()` (« 、 » / « ， » / « 。 » en japonais et chinois ;
  un `.join(", ")` ou un `this.log(… + ".")` en dur fait échouer npm test, it. 667-672).
  Accords (it. 665-682) : un adjectif collé à un nom traduit ne s'accorde pas tout seul. Matières des objets en russe :
  `RU_GENDER` + `ruAdjective` (i18n/data.js) ; épithètes des boss : `BOSS_GENDER` / `FORMS` (bosses.js, ru, pl, de, es, pt) :
  un nouveau boss ou une nouvelle pièce d'équipement au nom féminin, neutre ou pluriel s'y ajoute. Coréen : écrire la
  double particule après une variable (`{0}이(가)`, `{0}을(를)`…) ; `koJosa` (appelé par `t()`) garde la bonne.
- `i18n-check` ne voit pas les textes écrits en dur hors `tx()` : extraire le texte affiché en russe
  (`--open-panel --dump-text=<fichier>`, sans `--exit-after` ; depuis l'it. 1252 il parcourt aussi chaque sous-section des onglets et le texte des bulles d'aide, `data-title`) et y chercher les mots latins
  (`grep -oP "(?<![A-Za-z])[A-Za-zÀ-ÿ']{2,}"`, mots courts compris : « pts », « min », « oui » y ont échappé) ; ce qui n'est pas un repère `=== onglet` est suspect. Le faire aussi sur la partie de fin de partie (scripts/fixtures/endgame-save.json, `s.log = []` dans la copie : le journal garde la langue de la simulation) : reliques, boss majeurs, chroniques et panoplies n'apparaissent pas dans dev-data (it. 1018 : ru, ja, pl propres).
  États extrêmes (aucune sauvegarde de test ne les atteint) : `node --experimental-default-type=module scripts/max-save.mjs <copie>/save.json`
  (tout au maximum : « (complet) » du Bestiaire restait en français, it. 1062-1063). lang-overflow mesure aussi cet état à 1920 et 1280 px dans chaque langue (« xx max 1920 », it. 1286 ; `NO_MAX=1` pour sauter) ; max-save doit couvrir chaque nouvelle collection (familiers, élites, événements, bénédictions… : it. 1285).
- Les noms d'objets sont enregistrés **en français** et traduits à l'affichage (`itemName`).

## Pièges connus

- Sauvegardes : `migrate()` (state.js) renvoie null pour une version inconnue → partie neuve. SaveStore
  (main/save-store.js) met alors de côté la sauvegarde plus récente avant la première écriture
  (`save.newer-v*.json`) ; ne jamais retirer cette protection. Le lanceur `test()` de test-logic est synchrone :
  un test `async` serait compté réussi tout de suite (échec signalé seulement après le total) :
  tous les tests sont synchrones, avec des imports statiques en tête de fichier ; garder cette règle.
  Chaque test a sa propre graine aléatoire, tirée de son nom (it. 955) : un test qui ne passe qu'avec un tirage précis
  casse si on le renomme ; le rendre indépendant du tirage (ex. tirer jusqu'à obtenir une vraie arme).
  Ajouter un type de quête, un familier, une panoplie… sans changer SAVE_VERSION est permis, mais le code doit tolérer
  une valeur inconnue venue d'une autre version (ensureQuests remplace les quêtes illisibles ; migrate() retire les
  familiers inconnus ; ailleurs, tester l'existence avant de lire un nom : `POWER_INDEX[id]?.name`).

- Panneau : thème sombre par défaut (demande de Victor, 2026-11-09), clair ou « selon Windows » en réglage. Jamais de couleur claire en dur pour du texte
  (#ffe9a8, #9fe0a8…) : utiliser les jetons du thème (`--accent`, `--good`, `--bad`, `--r0`…`--r4`, `--muted`)
  ou une couleur vive dans `--c` avec la classe `.tint` (assombrie en thème clair). Vérifier en capture
  dans les deux thèmes. (La bande et le mode mini sont toujours sombres : non concernés.)

- Design « gravure pixel » (demande 35, it. 293-308) : jetons par thème dans styles.css (`--frame` cadre pixel en image
  9 parties générée en SVG, `--edge` contour sombre, `--star` or des ornements, `--sky` trame d'étoiles du fond).
  Changer les couleurs du panneau = régénérer `--frame` (sinon le cadre garde l'ancienne teinte). Angles droits partout ;
  les cartes à état (héros, familiers, quêtes, bestiaire) gardent une bordure colorée, sans cadre image.
- Largeur du panneau (it. 1046) : les règles d'adaptation à la largeur pour le contenu du panneau sont des requêtes de
  conteneur `@container panel (max-width: N - 32 px)` (le zoom « Taille de l'interface » ne s'applique qu'à #panel : une
  @media voyait la fenêtre, 1920 px, quand le panneau zoomé à 130 % n'en a que 1467 utiles). Seuils = ceux d'une @media
  moins 32 px (marges intérieures de #panel). Garder @media pour #panel lui-même et la fenêtre modale.
- Pas de défilement vertical à 1920 px (demandes 18 et 32), ni à 1366 / 1280 px (écrans de portable) : (it. 2685 : toute mesure de mise en page attend `document.fonts.ready` après un premier rendu de l'onglet ; une police n'est chargée qu'au premier texte qui la demande, et --overflow-report mesurait certains onglets avec la police de secours, plus étroite : deux défauts cachés, it. 2686-2687) l'autotest contrôle les trois (dans la langue de dev-data, l'anglais : it. 2723) ; `node scripts/lang-overflow.mjs [langues] [largeurs]` mesure les 10 langues (3 en parallèle, `PAR=n`, ≈ 2 min 30 depuis l'it. 1059) à 1920, 1600, 1366 et 1280 px (1600 depuis l'it. 1047 : écrans 1600 × 900 et 1680 × 1050, la fin de partie y défilait en russe), plus la fin de partie à 1920 px avec l'interface à 130 % (« fin 1920 × 130 % », it. 1048 ; `NO_ZOOM=1` pour la sauter) (≈ 5 min ; aussi une partie de FIN de partie à 1280 px, scripts/fixtures/endgame-save.json, « xx fin 1280 », it. 986 ; `FIN_WIDTHS=1280,1366,1920` pour d'autres largeurs, it. 1025 ; et une partie d'une SEMAINE à 1280 px, scripts/fixtures/week-save.json, « xx semaine 1280 », it. 2976 : PV en milliards, constellations toutes au maximum, que la fin de partie de 48 h n'atteint pas ; `NO_WEEK=1` pour sauter : la fin de partie défilait à 1920 px en russe : à régénérer par `DUMP=scripts/fixtures/endgame-save.json node … scripts/simulate.js 48 warrior` si la sauvegarde change beaucoup ; pire cas : quatre reliques et tous les déblocages, it. 746 ; mais avec TOUS les déblocages, la carte « Prochain déblocage » disparaît : l'état « tous sauf le dernier » faisait défiler l'Aventure en russe à 1280 px sans qu'aucune mesure le voie, it. 928 ; lang-overflow mesure aussi cet état, prêt et pas prêt : « adventure-avant-dernier-…=N », it. 929 ; et la Carte sans la Carte du voyageur (note « En vente » et son lien, « map-sans-voyage=N », it. 2228) ; et chaque onglet SANS AUCUN déblocage (liens « 🔒 nom · prix », « onglet-sans-déblocage=N », it. 2229) ; et le résumé d'absence au pire cas dans chaque langue (« absence-pire=N », it. 2276 ; « À faire » à 16 lignes dans le résumé et la carte du héros, « à-faire16-absence / -carte=N », it. 2924 ; mesuré EN DERNIER, il change l'état de la page) ; le 1er argument « all » = les 10 langues (avant l'it. 2276, « all » était pris pour UNE langue inconnue : les mesures « all 1280 » des it. 2186-2275 ne couvraient qu'une langue) ; et la zone d'un lieutenant ou du Briseur avec le héros bloqué, « adventure-boss150-bloqué=N », it. 2063 ; et l'Aventure et les Statistiques sous CHACUNE des bénédictions du jour, « stats-treasure… », it. 939-940 : un défaut qui ne se voit que certains jours ; un texte qui dépend de la date ou d'un tirage se mesure dans toutes ses variantes) ;
  une liste qui grandit (nouvel événement, nouvelle capacité…) peut le casser. Remède habituel : une rangée latérale
  (`class="hscroll" data-hs="clé"`, ui/hscroll.js : molette, glisser, position gardée) ou un détail au survol (ⓘ).
  `--overflow-report` (donc lang-overflow) signale aussi « onglet-large=N » : lignes de liste plus larges que leur colonne
  (débordement horizontal, it. 541-543) et « onglet-chevauche=N » : libellé d'un seul mot qui passe sous sa valeur (it. 849), « onglet-coupé=mots » : mot coupé en plein milieu sur deux lignes, sans trait d'union (it. 865 ; chinois, japonais et coréen exclus), « onglet-titre=… » : titre de panneau chinois ou japonais coupé entre deux caractères (« 装 / 備 », it. 1001), « astuce-coupée=id » : astuce qui dépasse les trois lignes de la bulle (it. 1027), et la page des sorts des 20 héros (« sorts=N(héros) », it. 553), et la fiche de chaque maîtrise (« maîtrise=N(id) », it. 1530 : 38 px en allemand que rien ne voyait). Il mesure aussi chaque sous-section des onglets (« bestiary-sets=N », « stats-journey=N »…, it. 1013-1014 ; avant, seule celle par défaut l'était : liste SUBS de main.js, à compléter pour une nouvelle sous-section), « Quoi de neuf » au pire cas, Héros > Sorts et Statistiques > Succès (la liste des succès
  grandit à chaque ajout : relancer lang-overflow après un nouveau succès ; it. 503, polonais à 1920).
  Les contrôles mesurent les sections REPLIÉES : une section repliable (<details>) qui grandit fait défiler l'onglet
  une fois dépliée sans qu'aucun contrôle ne le voie. Remède : l'ouvrir dans la fenêtre large (panel.js > MODAL_DETAILS
  et showDetails, comme « Quoi de neuf » et les raccourcis clavier) ; l'autotest et --overflow-report les mesurent ouvertes.
- Hors français, `translateData` (i18n/data.js) remplace les noms des données (zones, monstres, classes…) par leur
  traduction : ne jamais déduire une logique d'un nom affiché (regex sur `def.name`) ; utiliser le nom d'origine
  (`z.src` pour les zones) ou une clé. Arrivé à la musique (it. 531 : couleur des décors perdue hors français).
  Même piège pour un texte affiché (journal, bulles) : les couleurs du Journal venaient d'expressions en français (« légendaire »,
  « Quête accomplie ») et ne marchaient qu'en français (it. 1715) ; ui/log.js compare maintenant aux messages traduits (tx) ; LOG_KEYS est rangé par
  priorité (première catégorie reconnue) : une traduction peut contenir le morceau fixe d'une autre (russe « Открыто: » dans
  « Событие открыто: », it. 1840). Nouvelle ligne de journal à classer : l'ajouter à LOG_KEYS ; npm test vérifie que chaque
  modèle de game.js garde la même catégorie dans les 10 langues (it. 1842).
- Clés de traduction : i18n-append ignore une clé déjà présente (« Cuirasse » = pièce d'armure, déjà traduite) :
  vérifier `KEYS.indexOf(...)` avant de nommer une nouveauté avec un mot courant, sinon le sens se mélange.
- Sortie d'une version (itch.io, it. 1144) : 1) `version` de package.json ; 2) notes de version dans news.js
  (NEWS_RELEASES, à la FIN : `{ version, after, items }`, `after` = NEWS_ID de la version précédente : 0.1.2 = 32,
  0.1.3 = 58, 0.1.4 = 101, 0.1.5 = 114, 0.1.6 = 132, 0.1.7 = 152 : la 0.1.8 prendra after: 152 ; scripts/selftest.mjs lit la dernière
  valeur `after` pour que la copie de test ne voie pas la fenêtre de version, it. 2346) : une dizaine de nouveautés MAJEURES choisies parmi les éditions parues depuis, sans les petites
  retouches, noms repris tels que traduits (événements, élites, PNJ…), à traduire ; un joueur qui n'a rien lu depuis
  la version précédente voit la fenêtre s'ouvrir seule au lancement ; 3) npm test, autotest, lang-overflow ;
  4) constructions (voir « Construire la version Windows ») déposées dans Médias/dist-itch avec leurs sha256 ;
  5) essai de la version construite avec un HOME temporaire.
  6) envoi sur itch.io avec butler (it. 1164, demande de Victor) : `scripts/itch-push.sh <compte/jeu>` construit les
  trois versions (Mac signée) et les pousse sur les canaux windows, linux, mac (`--userversion` = package.json) ;
  cible : `victor-basset/sillwalker` (butler connecté au compte de Victor le 2026-11-13) ; `--dry-run` construit et vérifie sans rien envoyer ; `REF=v0.1.3` construit une version figée (étiquette git v<version> à poser sur le commit de chaque version). butler : `~/.local/bin/butler` (connexion une fois : `butler
  login`, identifiants dans ~/.config/itch/). Puis le devlog (docs/devlog-<version>.md) : préparer d'un bloc titre, couverture (scripts/steam-capsules/make.js,
  entrée `update-<version>` avec ver et tags), tags et langues, en tête du devlog (Victor les demande à la publication, it. 1764).
- « Quoi de neuf » (game/news.js) : après une série de nouveautés visibles, publier une édition (une liste ajoutée à la
  FIN de NEWS_EDITIONS, textes à traduire ; ne jamais modifier une édition publiée) : Victor et les joueurs la voient
  une fois au lancement suivant, avec les éditions sautées (les 3 dernières, puis d'autres tant que le total reste sous
  11 nouveautés : NEWS_FILL_ITEMS, it. 1442, 1474 ; les plus anciennes comptées) ; l'autotest mesure le pire cas.
  Depuis l'it. 2594, « … et N nouveautés plus anciennes → » est un bouton (newsShown(seen, skip)) : 40 pages pour 157 éditions ;
  lang-overflow ne mesure que la première : une retouche de la fenêtre se vérifie sur toutes les pages (it. 2596, 10 langues).
  Regrouper : une édition par série (3-5 nouveautés), pas une ligne par itération ; le 15/11, onze éditions d'une
  ligne (85-95) ont rempli la fenêtre et repoussaient les plus anciennes hors de vue (it. 1442, 1474-1475).
- Réglages qui touchent l'affichage sans recharger : « Économie d'énergie » (settings.eco, 15 images/s, événement
  `sillwalker-framerate`) et « Cinématiques de l'histoire » (settings.cinematics ; `data.force` pour le ▶ des chroniques).
- Compétences des monstres (journée du 17/11, it. 1850-1870 ; plan et bilan : docs/MONSTRES-VIVANTS.md) : une par famille
  (game/monskills.js), jouée dans game.js monSkillTick, posée sur la bande par strip.js monSkillPose (mfx), mot et son ;
  game.js skillBalance compense chacune (attaque ou PV) : une compétence change la façon de se battre, pas la force. Un
  test vérifie que chaque compétence est jouée, a son mot, son son et sa traduction. Capture d'un geste : figer
  `strip.mfx = { id, phase: "go", t, d: 8 }` (d long) 300 ms avant --shot. Vie en attente : render/monlife.js.
  Comportements en attente (it. 1850-1934) : monlife.js (déplacement selon la nature, pur, testé) ; strip.js : meutes
  (game.js PACK_ARTS, packSeed), réactions `a.react` (startle, fury, cheer, gesture avec `nat`), eager (héros faible, meute,
  suivant prêt), proies (TIMID / PREDATORS), jour et nuit (DIURNAL / NOCTURNAL), boss impatient. Actor.move arrondit à
  3 px et Actor.alpha au huitième : un geste de 1 px ou un fondu de 5 % ne se voit pas. Mesurer un comportement : --stage
  qui impose `g.R.lineup` (+ `R.lineupZone = S.zone`, `s.slotKey = null`) et relève `slots[k].tx` / `react` (it. 1905).
  Gestes au repos : monlife.js gestureOf (ART_GEST par dessin de base, sinon la nature) ; le climat de la zone (juice.js WEATHER : neige,
  braises, bulles, spores) les remplace (it. 2004-2010) : un contrôle de geste se fait dans une zone FIXE (it. 2010 : l'autotest
  échouait selon la zone courante). Nouvelle série : les monstres accourent du bord (arriveDelay ; pas le boss, it. 1993-1996).
  Mesurer la vie de la file sans que la série change : `g.R.devFreeze = true` (game.js step : ni combat ni marche, le temps
  avance ; it. 2017). Attention aux règles qui en écrasent d'autres (un craintif entre deux prédateurs tremble sur place) ; ordre dans strip.js : vie propre,
  meute (elle ne garde que 35 % du mouvement propre), puis peur du héros, proies et prédateurs, vent (it. 2042-2045, autotest « proie en meute »).
  Voir la bande en mouvement : `scripts/strip-clip.sh <sortie.mp4> [zone] [secondes] [ffmpeg] [mise-en-scène.js]` (écran
  virtuel à part, copie de dev-data ; ffmpeg d'imageio-ffmpeg dans un environnement virtuel du dossier temporaire).
- Rangée d'informations de la bande (zone, or, barres de vie du réglage hudBars, it. 1531) : tout nouvel élément y
  déclare sa bande horizontale dans `hudBands()` (strip.js), sinon la météo passe dessus (it. 874) ; il ne recouvre pas
  le nom du boss, qui s'étend vers la gauche depuis le boss (it. 854) ; les icônes de sorts qui montent évitent aussi la rangée (strip.js iconTop, it. 3035 : à 1280 px, le héros combat sous la pastille de gauche) ; les nombres décalés de côté par freeSpot aussi (it. 3037), et les bannières (juice.js banner, it. 3039) ; DOM mis à jour seulement quand la valeur change.
- Bande : la fenêtre laisse traverser les clics sauf au-dessus des éléments `.hit` (ui/clickthrough.js, recalculé par
  `clickThrough.refresh()`). Tout nouvel élément cliquable de la bande doit porter `.hit` ; `element.click()` dans
  l'autotest ne passe pas par ce filtre (un « clic : passer » marchait en test et pas en vrai).
  À 100 % d'opacité, `#strip` lui-même porte `.hit` (bande opaque : elle arrête les clics, it. 835) : un contrôle qui
  cherche un « point vide » de la bande doit exclure `#strip` et régler l'opacité sous 100 %.
  Déplacement à la souris (it. 835) : ui/windrag.js (seuil en coordonnées de la page : les événements simulés n'ont pas
  de screenX) + StripWindow.dragStart / dragEnd (bande : écran et bord sous le curseur ; mini : settings.miniPos).
- Onglets préparés d'avance (Panel.warmTabs, it. 750) : 4 s après le lancement, les onglets jamais affichés sont construits
  CACHÉS. Un contrôle (autotest, sonde) qui compte des éléments dans toute la page les trouve donc avant l'ouverture de
  l'onglet : compter dans l'onglet visible (`[data-pane=…]:not([hidden]) …`).
- Polices (it. 776) : sous Windows, chaque nouvelle taille × graisse d'une police coûte d'autant plus que ses lettres
  ont de points. Geist Pixel dessinait chaque pixel en carré de 26 points (1 771 points par lettre) : 75-150 ms par
  taille chez Victor, panneau et onglets bloqués à la première ouverture. Fusionnée par scripts/simplify-pixel-font.py
  (38 points par lettre, contours resserrés de 7 unités pour garder la même encre). Toute nouvelle police pixel :
  compter ses points (fontTools) et la passer par ce script ; ne pas multiplier les tailles et graisses.
  Lettres russes (it. 1524) : dessinées sur la grille de Geist Pixel par scripts/cyrillic-geist-pixel/ (README : retoucher
  une lettre dans glyphs.py, reconstruire) ; avant, Tiny5, jugé illisible par Victor.
- Bénédictions du jour (it. 1237) : toujours AJOUTER une bénédiction à la FIN de DAY_MODS (daymods.js) ; dayModFor
  garde le calendrier des 9 premières et chaque ajout ne prend qu'un jour sur n (tirage réservoir). Changer l'ordre ou
  le modulo rebat tout le calendrier (bénédiction du jour qui change en pleine journée à la mise à jour). Le jour pris par
  un ajout peut tomber AUJOURD'HUI ou demain (it. 1314 : la 13e prenait le 14/11) : vérifier ces jours avant / après et, au
  besoin, donner à ce rang un autre sel (DAY_MOD_SALT) ; un test fige les jours déjà annoncés.
- Coffre de quête (it. 1546, 1555, 1568) : réclamer une quête à coffre (clic, « Tout réclamer », touche R ;
  QuestsTab.claimShow) ouvre la fenêtre animée #modal. Dans l'autotest, la refermer après coup (`#modal.hidden = true`) :
  restée ouverte, elle faisait échouer les contrôles suivants selon le tirage de la quête (it. 1571).
- Boutons enfoncés (it. 1544, signalé par Victor) : `button:active` descend de 2 px ; un clic sur le rebord haut se
  relâchait hors du bouton et le navigateur n'envoyait pas le clic. ui/pressfix.js clique le bouton pressé si on le
  relâche à 4 px au plus (contrôle de l'autotest « clic sur le rebord d'un bouton ») : garder ce filet si le style change.
- Duo sur la bande (it. 1802-1807, demande de Victor : l'arbalétrier disparaissait derrière le samouraï) : placement du
  compagnon dans strip.js (tireur 16 px derrière un héros au corps à corps ; deux combattants : compagnon 20 px en retrait)
  et `.actor.hero.partner { z-index: 1 }` (le héros principal reste entier) ; mode mini : mini.js (tireur contre le bord, le
  héros ne bouge pas : avancé, sa barre de vie touchait celle du monstre). Contrôle de l'autotest « duo : l'arbalétrier… ».
  Vérifier les quatre sortes de duo (tireur/combattant × devant/derrière) en capture après toute retouche des positions.
  Avec un serviteur (nécromancien, it. 1818) : il passe devant le compagnon qui mène, et le compagnon recule au combat.
- Mode mini, passages (it. 2071-2083, signalé par Victor : « pas smooth ») : le suivant attend au fond (nextActor, boss compris) et
  reste là jusqu'à son combat (la victoire fait avancer la file avant l'apparition du combattant) ; le combattant part de cette
  place (fromNext, reconnu dès la première image), sinon entre par le bord droit ; un suivant caché revient en glissant ; le
  vainqueur d'une défaite s'efface (leaving). Mesurer : --mode=mini et un --stage qui relève M.monActor / M.nextActor (x, alphaV)
  toutes les 50 ms (window.__mini) ; autotest « le monstre suivant s'avance depuis sa place d'attente ».
- Actions sans retour (it. 2099-2124, demande de Victor : ergonomie) : jamais de « second clic au même endroit » (bouton dont
  le libellé change) ; une fenêtre `panel.confirm(titre, texte, libellé, fn)` qui dit ce qui est perdu (chaque onglet reçoit le
  panneau : `this.panel`). Effacer la partie : `confirmSafe` (Entrée et clic sur le fond annulent, « Annuler » en bouton par défaut).
  Un clic sur le fond d'une fenêtre l'annule ou la ferme, seulement si l'appui aussi était sur le fond. Rien ne naît ni ne bouge
  sous le curseur (emplacements réservés, libellés fixes) ; plan et audit : docs/TALENTS-UX.md.
  Dosage (it. 2127-2162) : on ne confirme que ce qui est PRÉCIEUX et sans retour (objet légendaire, de panoplie ou forgé ; quête
  3 étoiles ; réinitialisations ; ascension ; effacement). Les gestes courants restent d'un clic (vendre un objet ordinaire, changer
  une quête ordinaire, reforger : sa bulle dit ce qui change). Sac plein : une amélioration du marchand s'achète quand même
  (game.canBuyWhenFull : ancienne pièce vendue, jamais une précieuse).
- Fiche des Talents (it. 2111) : elle suit le survol sans délai et revient au talent CLIQUÉ (`pin`) hors des talents (RESTORE_MS) ;
  un contrôle qui survole des talents doit re-chercher les éléments après un clic (le clic redessine l'onglet).
- Objets tirés dans l'autotest (it. 2198-2217) : `newItem(0, …)` sort LÉGENDAIRE ≈ 1 % du temps (la vente demande alors confirmation) et un
  objet au niveau record peut être équipé tout seul par le Valet d'armes (il quitte le sac) : un contrôle qui suppose un objet ordinaire
  dans le sac force `r = 0`, `set = null`, `plus = 0` et un niveau 1. Contrôle instable : `SELFTEST_TIMES=1` et une mise en scène qui
  rejoue le cas 30 fois (it. 2216) trouvent la cause vite.
- « À faire » (game.todoNow) n'a pas de plafond (16 sortes de lignes) ; dev-data n'en a que ≈ 8 : un dépassement n'y apparaît
  que selon l'état du moment (« pl absence-pire=23 » intermittent, it. 2916-2927). Le résumé d'absence garde ce qui tient (8 au plus,
  moins si un libellé passe sur deux lignes ; panel.js, après l'affichage) et une note-lien ouvre la liste entière ; la carte du héros
  passe sur deux colonnes au-delà de 8. Pire cas mesuré par l'autotest et lang-overflow (« à-faire16-… », 16 lignes dupliquées) ; une
  nouvelle sorte de ligne s'ajoute sans risque, mais un libellé très long se vérifie avec ces mesures.
- Filets contre les erreurs (it. 2979-3003) : une erreur ne doit jamais bloquer la partie. Démarrage : progression hors ligne
  (app.js offlineSafe), photo de la visite, résumé d'absence, succès, bénédiction du jour (soft) ; fermeture : succès puis enregistrement
  final quoi qu'il arrive, mise en texte de saveNow protégée ; panneau : chaque partie du dessin (panel.js renderAll, safe ; avant, un
  onglet en erreur était redessiné à chaque image) ; boucle d'image : simulation, dessin et panneau protégés chacun (app.js guard, une erreur par minute et par étape, it. 3010) ; journal errors.log : un même message une fois par minute (main.js logError) ; page arrêtée : 3 rechargements par minute au plus (it. 3012). Une
  erreur SIMULÉE pour un contrôle porte `simulated: true` et part en console.warn (sinon « aucune erreur de l'interface » échoue) ;
  window.__offlineFail (dev) force l'échec de la progression hors ligne. Nouvelle étape du démarrage : la mettre dans soft().
- Panneau, clics (it. 1082) : `panel.onClick` traite d'abord tout élément `[data-tab]` comme un lien vers un onglet ; ne jamais mettre `data-tab` sur un bouton d'action (le PNJ ne parlait plus : `data-npc`).
- Accessibilité (it. 2422-2499) : l'autotest vérifie dans tous les onglets que chaque bouton grisé a une bulle (« Maximum » excepté),
  que tout texte coupé (…) garde une bulle, que tout élément cliquable hors bouton a un tabindex (SVG exclus), que chaque bouton
  visible a un nom, que toute image a un alt (alt="" pour un décor) et qu'aucun identifiant n'est en double ; que deux boutons voisins d'une rangée centrée ont le même centre vertical (it. 2655 : le prix de l'Atelier tombait 4 px sous « max », marge de button.buy) ; et qu'à 1280 px aucun libellé n'est coupé par « … » hors noms d'objets (.nm, .sub) et bulles des PNJ (.say) (it. 2722 : le nom de l'expédition l'était sur chaque carte de familier) ; test-logic vérifie le
  contraste des jetons de couleur (≥ 3:1 sur --panel et --bg, deux thèmes). Un nouvel élément d'interface doit respecter ces règles.
- Info-bulles (it. 817) : le jeu déplace l'attribut `title` dans `data-title` (bulle maison, panel.js et app.js) : un
  contrôle qui lit `el.title` trouve une chaîne vide ; lire `el.title || el.dataset.title`.
- Les scripts Python écrits dans un heredoc abîment les `\n` et les accents : écrire le script dans
  un fichier, ou utiliser l'outil d'édition.
- Un commentaire `//` ajouté au milieu d'une ligne (objet littéral, liste d'arguments) avale la fin du code de la
  ligne sans erreur de syntaxe (arrivé trois fois) : mettre le commentaire sur sa propre ligne, au-dessus.
  `scripts/check-comments.mjs` (lancé par `npm test`) repère les cas typiques (commentaire qui finit par « ; », « , » ou « ); »).
- Remplacement de texte par script (Python `replace(a, b, 1)`) : un même gabarit HTML peut exister deux fois (carte
  verrouillée et carte normale des héros, it. 505) : compter les occurrences avant de remplacer la première.
- `sed` sur des chaînes JavaScript : attention aux `\u…` et aux `\n`, vérifier le résultat.
- Le dossier `dist\win-unpacked` peut être verrouillé si l'utilisateur y lance le jeu.
- Construire la version Windows : `npm run dist` ; pour itch.io : `npm run dist:itch` (zip Windows), `dist:itch:appimage`
  (Linux), `scripts/mac-from-linux.sh ~/.local/bin/rcodesign dist-itch` (Mac à puce Apple : SIGNATURE AD HOC
  obligatoire, sinon le binaire arm64 est tué au lancement ; electron-builder seul ne signe pas hors macOS : la
  première 0.1.3 déposée était dans ce cas, refaite à l'it. 1157). Depuis le serveur, sans Wine, l'icône et la version de l'exécutable
  Windows sont bien posées (vérifié it. 1144 avec resedit : 7 tailles, « Sillwalker 0.1.3 »).
  Une version CONSTRUITE ignore les options de dev (`--user-data`, `--shot`…) : la lancer pour un essai ouvre le
  dossier de sauvegarde par défaut (`~/.config/Sillwalker`) ; ne le faire que si ce dossier n'existe pas, et le
  supprimer ensuite (it. 1144 : partie neuve créée puis retirée), ou passer `HOME=<dossier temporaire>`.
