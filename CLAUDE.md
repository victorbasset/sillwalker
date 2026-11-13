# Sillwalker : consignes pour Claude

Idle RPG Electron qui vit dans une bande au-dessus de la barre des tâches Windows.
Le README décrit le contenu et l'organisation du code ; ce fichier dit **comment travailler** ici.

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
  Délai maximal 10 min (≈ 70 s d'habitude ; `SELFTEST_MAX_MIN`) : au-delà, échec citant la dernière vérification (it. 863). Sortie complète gardée dans `logs/selftest-last.log` (et `logs/selftest-last-fail.log` pour le dernier échec) : un échec isolé se relit après coup (it. 906).
  Avant une mesure `--perf`, vérifier qu'aucun Electron de test orphelin ne tourne (`ps -ef | grep electron`).
- Parties bloquées : `node --experimental-default-type=module scripts/fuzz.mjs [graines] [minutes]` lance beaucoup de
  nouvelles parties (les 20 héros) et signale celles qui ne progressent pas (60 graines = 1200 parties, ≈ 1 min). À relancer après
  tout changement des monstres, élites, champions ou de la mort du héros.
- Sauvegardes abîmées : `node --experimental-default-type=module scripts/save-fuzz.mjs` (27 corruptions écrites à la main
  de la sauvegarde de dev, chacune « ok », puis un balayage de chaque donnée et de chaque champ des sous-objets avec sept
  valeurs absurdes : « ok balayage (N corruptions) » attendu, ≈ 35 s ; it. 873 ; chaque corruption passe aussi par les moments à risque (mort face à un boss, boss vaincu, événement, coffre, étoile, achat d'un déblocage, quêtes : exercise(), it. 903) et par les actions du joueur (sac, forge, boutique, familiers, points, ascension : it. 904) ; le balayage touche aussi les champs d'un objet, d'une quête, d'un familier et d'une expédition (it. 905). Un cas qui ne finit pas (boucle sans fin) : `FUZZ_TRACE=1` affiche chaque cas avant de le jouer, le dernier affiché est le coupable ; un nouveau moment de ce genre s'y ajoute). À relancer après tout ajout de donnée sauvegardée. `FUZZ_BASE=fin` : même balayage à partir de la partie de fin de partie (scripts/fixtures/endgame-save.json, it. 999).
- Mémoire dans la durée (fuites) : `scripts/mem-watch.sh [minutes] [vitesse]` (Linux ; « réel » = PSS de l'arbre Electron ≈ 485-530 Mo stables
  attendus (bruit d'une mesure à l'autre), son et musique actifs ; l'ancien total RSS ≈ 800 Mo comptait la mémoire partagée plusieurs fois et l'écran virtuel).
- Rythme de la première heure : `node --experimental-default-type=module scripts/early-pace.mjs` (objets, niveau,
  zone, déblocages à 2, 5, 10, 15, 30, 60 min). Le début est volontairement calme (`earlyPace`, rules.js).
- Ouverture des onglets : `node --experimental-default-type=module scripts/tab-pace.mjs` (minute d'ouverture de chaque
  onglet, 3 graines) ; à relancer si on touche aux seuils de game/tabs.js ou au rythme du début.
- Fin de partie : `node --experimental-default-type=module scripts/simulate.js 168 <classe>` (une semaine, ~80 s) :
  les records des dernières courses doivent progresser régulièrement (repère it. 449, Atelier acheté, voie prise : mage 38 → 179 ; it. 486 avec les sorts : 38 → 182 ; it. 561, sorts uniques et Grimoire étendu au compagnon : mage 186, guerrier 189 ; it. 571, reliques des boss
  majeurs (relics.js, RELIC_POWER / DRONE) : mage 251, guerrier 263 ; it. 608, niveaux des reliques (+10 % par victoire,
  5 au plus) : mage 275, guerrier 286 ; it. 639, échos (250-350) et Drone soumis à la carapace : mage 278, guerrier
  286-301 (une graine) ;
  it. 712, Forgeron des astres (zone 230) : mage 283-302 (3 graines), guerrier 301 ; it. 736, Herboriste (260) et Marchand
  attitré (300), déblocages remis dans l'ordre des zones : mage 286-287, guerrier 302 ; it. 899, après les événements et élites des it. 878-898 : mage 298, guerrier 311 (une graine) ; it. 965, après la Ruée des gobelins et les Écailles (15e capacité de boss) : mage 293, guerrier 293 (graine 7) / 307 (graine 3), contre 298 / 298 juste avant : bruit ; sans saut ni plafond). À relancer après tout changement de zoneMight (rules.js) ou des zones de déblocage, et après
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
  (`SEED=3 HEROES=all …`, `SEED=11`, `SEED=21`, en parallèle). Tableau des 20 héros sur un commit : `node --experimental-default-type=module scripts/hero-table.mjs [heures] [graines] [parallèle]` (≈ 3 min 30 pour 12 h × 3 graines ; repère it. 1012 : 61,0 mage → 66,7 gladiateur, moyenne 63,3). `HEROES=all` devant la commande : les 20 héros (≈ 2 fois plus long). À lancer après tout ajout qui touche aux combats.
- Toujours lancer Electron avec **`--ghost`** : fenêtre hors écran, sans focus ni icône de notification.
  Options utiles (dev) : `--user-data=<dossier>`, `--tab=<onglet>`, `--mode=strip|mini`,
  `--shot=<fichier.png> --shot-delay=<ms>`, `--exit-after=<s>`, `--width=1366`,
  `--dump-text=<fichier>` (texte de chaque onglet, pour traquer les textes non traduits), `--demo`,
  `--battery` (simule un portable sur batterie : 20 images/s), `--idle` (simule un utilisateur absent : 10 images/s).
  `--release-ui` : cache les commandes de dev (DEV, ×1, ×3, ×10) pour des captures fidèles à la version distribuée.
  `--crawl` : clique sur tous les boutons de tous les onglets et affiche `CRAWL-ERREUR …` / `CRAWL-FINI N clics`
  (sur une COPIE de sauvegarde : il achète, vend, dépense ; ajouter `--exit-after=200`, sinon le jeu reste ouvert). À lancer après un gros changement d'interface.
  De temps en temps, le lancer dans une langue à trois pluriels (`settings.lang = "ru"` ou `"pl"` dans la copie) : une forme mal écrite ne casse qu'à l'affichage.
  Sous Linux, préfixer par `xvfb-run -a -s "-screen 0 1920x1080x24"` et ajouter `--no-sandbox`.
- Captures dans une autre langue : la langue vient de la **sauvegarde** (`settings.lang` dans `save.json`
  de la copie), pas de `settings.json`. Partie neuve (dossier vide) : langue du système, à forcer avec
  `--lang=fr-FR` (option de Chromium). Le panneau est sombre par défaut ; pour capturer le thème clair, mettre `settings.theme = "light"` dans la copie
  (ou `"auto"` + `--force-dark-mode` pour tester le suivi de Windows).
- Les erreurs de l'interface s'affichent dans la console sous la forme `[renderer error] …`.
- Tests logiques : le `freshState` de `test-logic.js` donne TOUS les déblocages sauf `armsValet`, `skyChart`, `spellBook`,
  `starSmith`, `herbalist` et `trader` (ils changent les comptes d'équipement, d'éclats et d'or) : un nouveau déblocage automatique peut fausser d'anciens tests ; l'exclure
  là s'il le faut, et le tester à part.
- Performance (`--perf`) : toujours mesurer sur une copie NEUVE de dev-data à chaque essai (une copie réutilisée a avancé :
  autre zone, autre combat, la comparaison ne vaut rien). Les sorts coûtent ≈ +3 points d'un cœur en rendu logiciel (it. 479).
  Animation CSS infinie sur un élément de la bande (même un simple translate) : ≈ +9 points (it. 593, flottement du
  drone : 20,8 → 29,8 %) : jamais d'animation CSS permanente sur la bande ; animer dans la boucle d'images existante. Filtre CSS
  (drop-shadow) sur un monstre : ≈ 0,5 point par ombre empilée sur une file (it. 595) : dessiner le contour dans l'image
  (sprites.js outlinedFrames), comme les élites et champions.
  Halos d'état du héros (venin, malédiction, frénésie…) : un fond dégradé radial derrière le personnage, pas un
  drop-shadow (refait à chaque image de l'animation : −0,7 point pendant un combat contre un boss venimeux, it. 973).
  Répartition de la bande (it. 567, 20,2 %) : son + musique + ambiance ≈ 3,5 points (le moteur audio actif et la musique ≈ 1,7 ;
  ambiance seule et effets sonores seuls : dans le bruit), « Effets complets » ≈ 2,8, météo + jour/nuit ≈ 1,1.
  Repère actuel (it. 800, copie neuve de dev-data) : bande ≈ 19,5 %, panneau ≈ 20-21 %, mini ≈ 6,6 %, icône ≈ 0,5 % ;
  depuis l'it. 964, bande ≈ 20,5 % : le boss de zone 55 de dev-data a changé de capacités (venin + coup dévastateur,
  plus d'effets à l'écran ; it. 972, dichotomie par commits). Le repère dépend de ce combat : comparer deux commits
  sur la même copie, jamais un chiffre à un repère d'une autre époque (scripts de l'it. 972 : dossier de travail git)
  (stable depuis l'it. 597). Sous Windows chez Victor (Gestionnaire des tâches, it. 763) : ≈ 19,8 % d'un cœur et
  ≈ 380 Mo de mémoire privée.
- Son (impossible à écouter sur le serveur) : l'autotest rend hors ligne (OfflineAudioContext) tous les sons de
  render/sound.js et signale erreur, NaN ou saturation (pic > 0,2 ; les effets font ≈ 0,02) : ajouter tout nouveau son
  à sa liste (selftest.js, « son : tous les sons ») ; pour comparer des volumes, même méthode dans une injection TEMP.
  Musique (lofi, un air par tranche de 5 zones) : l'autotest rend un passage complet de 8 airs (`Music.schedulePass`) et
  vérifie saturation et équilibre des volumes. Pour faire ÉCOUTER à Victor : rendre des passages en WAV dans une injection
  TEMP (OfflineAudioContext + schedulePass, base64 par morceaux dans la console), puis les lui envoyer (it. 520).

## Sortie sur Steam (it. 781-799)

- État et reste à faire : `steam/checklist.md`. Textes du magasin (10 langues, tags) : `steam/store-page.md`.
  Elle cite des nombres (héros, compétences, régions, monstres, automatismes, événements rares, capacités de boss,
  élites, quêtes) : les mettre à jour dans les 10 langues après un ajout de ce genre (it. 913) ; `npm test` le vérifie
  (scripts/steam-store-check.mjs, it. 914 : nombres de la liste « vraie progression », dans l'ordre, sans autre chiffre).
- App ID : `node scripts/steam-set-appid.mjs <id>` (npm test refuse la relance par Steam avec l'App ID de test 480).
  Envoi : `npm run dist` puis `npm run steam:build` (fichiers SteamPipe dans `steam/build/`, hors git).
- Images et vidéos (`steam/screenshots`, `capsules`, `achievement-icons`, `media`) : régénérables par
  `scripts/steam-prep-save.mjs` (sauvegarde sans bulles, à partir d'une partie `simulate.js` avec `DUMP=`),
  `steam-compose.py` (captures sur un bureau), `steam-capsules/make.js` et `achicons.js`, `steam-video.sh`,
  `steam-trailer.sh` (option de dev `--tour`). Outils Python (Pillow, fontTools, ffmpeg de pip imageio-ffmpeg) :
  dans un environnement virtuel du dossier temporaire, jamais dans le dépôt. Chaque nouvelle génération ajoute
  plusieurs Mo à l'historique git : ne régénérer que si le rendu change vraiment.

## Traductions (10 langues, anglais par défaut)

- Texte affiché : l'écrire en français dans `tx("…")` (ou `tr()` pour les noms de données).
- Nouvelles clés : `node --experimental-default-type=module scripts/i18n-append.mjs '["clé 1","clé 2"]'`
  (ajoutées à la fin de `i18n/keys.js`, l'ordre ne bouge jamais), puis les traduire dans
  **chacun** des fichiers `src/renderer/i18n/lang/{en,es,pt,de,pl,ru,zh,ja,ko}.js` (indice = position),
  et vérifier avec `scripts/i18n-check.mjs <langue>` (0 problème attendu).
  Un texte qui cite « un libellé » du jeu doit le citer tel qu'il est traduit : `scripts/i18n-quotes.mjs` (lancé par `npm test`) le vérifie dans les 9 langues.
- Pluriels : `txn(n, "{n} objet|{n} objets")` (i18n/index.js) ; chaque traduction donne ses formes séparées
  par « | » : 1 (zh, ja, ko), 3 (ru, pl : one|few|many), 2 sinon (vérifié par i18n-check). (L'ancienne méthode `plS(n)`,
  qui ne marchait qu'en français et en anglais, est retirée depuis l'it. 685.)
  Nombres : `fmt`, `fmtShort`, `unit("%")`, `dec()` de `game/format.js` (format de la langue).
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
  (`--open-panel --dump-text=<fichier>`, sans `--exit-after`) et y chercher les mots latins
  (`grep -oP "(?<![A-Za-z])[A-Za-zÀ-ÿ']{2,}"`, mots courts compris : « pts », « min », « oui » y ont échappé) ; ce qui n'est pas un repère `=== onglet` est suspect.
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
- Pas de défilement vertical à 1920 px (demandes 18 et 32), ni à 1366 / 1280 px (écrans de portable) : l'autotest contrôle les trois (en français) ; `node scripts/lang-overflow.mjs [langues] [largeurs]` mesure les 10 langues (≈ 5 min ; aussi une partie de FIN de partie à 1280 px, scripts/fixtures/endgame-save.json, « xx fin 1280 », it. 986 : à régénérer par `DUMP=scripts/fixtures/endgame-save.json node … scripts/simulate.js 48 warrior` si la sauvegarde change beaucoup ; pire cas : quatre reliques et tous les déblocages, it. 746 ; mais avec TOUS les déblocages, la carte « Prochain déblocage » disparaît : l'état « tous sauf le dernier » faisait défiler l'Aventure en russe à 1280 px sans qu'aucune mesure le voie, it. 928 ; lang-overflow mesure aussi cet état, prêt et pas prêt : « adventure-avant-dernier-…=N », it. 929 ; et l'Aventure et les Statistiques sous CHACUNE des bénédictions du jour, « stats-treasure… », it. 939-940 : un défaut qui ne se voit que certains jours ; un texte qui dépend de la date ou d'un tirage se mesure dans toutes ses variantes) ;
  une liste qui grandit (nouvel événement, nouvelle capacité…) peut le casser. Remède habituel : une rangée latérale
  (`class="hscroll" data-hs="clé"`, ui/hscroll.js : molette, glisser, position gardée) ou un détail au survol (ⓘ).
  `--overflow-report` (donc lang-overflow) signale aussi « onglet-large=N » : lignes de liste plus larges que leur colonne
  (débordement horizontal, it. 541-543) et « onglet-chevauche=N » : libellé d'un seul mot qui passe sous sa valeur (it. 849), « onglet-coupé=mots » : mot coupé en plein milieu sur deux lignes, sans trait d'union (it. 865 ; chinois, japonais et coréen exclus), « onglet-titre=… » : titre de panneau chinois ou japonais coupé entre deux caractères (« 装 / 備 », it. 1001), et la page des sorts des 20 héros (« sorts=N(héros) », it. 553). Il mesure aussi chaque sous-section du Bestiaire (« bestiaire-sets=N »…, it. 1013 ; avant, seule celle des monstres l'était), « Quoi de neuf » au pire cas, Héros > Sorts et Statistiques > Succès (la liste des succès
  grandit à chaque ajout : relancer lang-overflow après un nouveau succès ; it. 503, polonais à 1920).
  Les contrôles mesurent les sections REPLIÉES : une section repliable (<details>) qui grandit fait défiler l'onglet
  une fois dépliée sans qu'aucun contrôle ne le voie. Remède : l'ouvrir dans la fenêtre large (panel.js > MODAL_DETAILS
  et showDetails, comme « Quoi de neuf » et les raccourcis clavier) ; l'autotest et --overflow-report les mesurent ouvertes.
- Hors français, `translateData` (i18n/data.js) remplace les noms des données (zones, monstres, classes…) par leur
  traduction : ne jamais déduire une logique d'un nom affiché (regex sur `def.name`) ; utiliser le nom d'origine
  (`z.src` pour les zones) ou une clé. Arrivé à la musique (it. 531 : couleur des décors perdue hors français).
- Clés de traduction : i18n-append ignore une clé déjà présente (« Cuirasse » = pièce d'armure, déjà traduite) :
  vérifier `KEYS.indexOf(...)` avant de nommer une nouveauté avec un mot courant, sinon le sens se mélange.
- « Quoi de neuf » (game/news.js) : après une série de nouveautés visibles, publier une édition (une liste ajoutée à la
  FIN de NEWS_EDITIONS, textes à traduire ; ne jamais modifier une édition publiée) : Victor et les joueurs la voient
  une fois au lancement suivant, avec les éditions sautées (au plus 3, les plus anciennes comptées) ; l'autotest mesure le pire cas.
- Réglages qui touchent l'affichage sans recharger : « Économie d'énergie » (settings.eco, 15 images/s, événement
  `sillwalker-framerate`) et « Cinématiques de l'histoire » (settings.cinematics ; `data.force` pour le ▶ des chroniques).
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
- Construire la version Windows : `npm run dist` (sous Linux, il faut Wine pour l'icône de l'exécutable).
