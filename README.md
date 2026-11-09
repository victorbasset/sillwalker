# Sillwalker

Idle RPG qui vit dans une bande en bas (ou en haut) de l'écran. Application Electron pour Windows, prévue pour Steam.

Trois affichages (bouton sur la bande / l'encart, panneau, ou menu de l'icône de notification) :
- **Bande** : toute la largeur de l'écran est la carte de la zone. Les 10 monstres attendent le long du chemin, le boss au bout ; le héros avance d'un combat à l'autre.
- **Mini** : petit encart près de l'horloge (combat en cours, niveau, or, zone). Un clic l'agrandit en bande ; au survol,
  le record à battre et le prochain objectif ; légendaires, records et ascensions s'y signalent brièvement.
- **Icône seule** : plus de fenêtre ; l'icône de notification s'anime (marche, combat, K.O., butin) et son infobulle donne niveau, zone et or. Clic sur l'icône = retour au dernier affichage.

## Contenu

- **10 classes** : les héros sont prisonniers de boss de zone (zones 10 à 58) ; une fois libérés, on change de classe à l’ascension :
  Guerrier (riposte), Rôdeur (tir d'ouverture), Mage (brûlure), Paladin (bouclier sacré), Assassin (poison cumulable),
  Nécromancien (serviteur squelette), Moine (enchaînement), Druide (épines, esprit-loup), Samouraï (iaijutsu : un coup sur 4 critique renforcé),
  Berserker (vol de vie, exécution des cibles affaiblies).
- **Arbre de compétences** commun à toutes les classes : 144 nœuds en 6 secteurs (Force, Agilité, Arcanes,
  Vitalité, Fortune, Maîtrise), 24 nœuds remarquables, 6 clés de voûte. 1 point tous les 2 niveaux + points
  permanents d'ascension. Le chemin est conservé à l'ascension et se réactive au fil des niveaux.
- **Talents** : un arbre par classe, 3 branches × 4 paliers (0 / 5 / 10 / 20 points), talent ultime ★ au bout, une Voie au choix et des Maîtrises sans limite (aucun point perdu). 1 point par niveau, un clic par rang.
- **Déblocages** (boutique, permanents) : 18 automatismes et fonctionnalités à acheter, chacun demandant une zone record
  (1 → 70) et de l’or : boutons groupés, potions et vente automatiques, Ménagerie (familiers), Enclume (forge), Atelier,
  quêtes et expéditions, transmutation, dépense des points à chaque niveau, valet d’armes, maître de forge
  (forge l’équipement porté avec l’or en trop), filet à étoiles (attrape les étoiles filantes manquées),
  astrolabe (ascension automatique quand le héros bloque près de son record, option à activer), grand intendant (zone 65 : œufs et expéditions tout seuls), creuset perpétuel (zone 70 : transmutation quand le sac se remplit). Liste dans `game/unlocks.js`.
- **Boutique** : marchand (4 objets, renouvelé toutes les 15 min ou contre de l'or), potions bues automatiquement
  sous 30 % de vie, élixirs de 10 min (attaque, or, expérience), coffres à rareté garantie, sac jusqu'à 48 places.
- **33 zones** qui bouclent (forêt, grotte, crypte, marais, forge, désert, toundra, jungle, ruines célestes, abysses, champignonnière, ossuaire, steppe, lagon de corail, glacier, cité engloutie, mines naines, verger, désert de verre, trône des tempêtes…),
  chacune avec sa météo (neige, braises, feuilles, spores, bulles…), **83 monstres** avec leurs propres caractéristiques, **élites dorés** (6 %, or ×4, butin garanti),
  **gobelin doré** (rare : s'enfuit au bout de 4 s, or ×15 s'il est attrapé).
- **Quêtes** : 3 contrats à la fois (chasse, élites, boss, or, forge, butin rare, événements rares, expéditions, transmutation, zone), récompenses variées
  (or, coffres, élixirs, potions, œufs, éclats d'étoile).
- **Familiers** : 14 compagnons (dont le lapin et le phénix, rares) qui suivent le héros, sortent d'œufs (boss, élites, quêtes)
  et montent jusqu'au niveau 10. Les autres partent en **expédition** (30 min, 2 h, 8 h, même jeu fermé) et rapportent
  or, expérience, œufs et objets.
- **Pouvoirs légendaires** : chaque objet légendaire reçoit l'un des 29 pouvoirs uniques (dont l'Appât des champions, qui attire les élites).
- **Bestiaire** : paliers de 10 / 100 / 1 000 / 10 000 victoires par monstre, bonus permanents.
- **Ascension** (dès la zone 20) : recommencer contre des éclats d'étoile, dépensés dans 16 constellations permanentes
  (attaque, PV, or, expérience, points de talent, zone de départ, temps hors ligne...).
- **Cycle jour / nuit** sur la bande, calé sur l'heure de l'ordinateur.
- **Objets** : 7 emplacements (arme, casque, armure, gants, bottes, anneau, amulette), 46 types, des matériaux
  qui évoluent avec le niveau (bronze → étoile, lin → tissu céleste…), 32 icônes. L'armure, le casque, l'arme et
  les bottes portés changent l'apparence du héros ; halo doré avec un légendaire.
- **Bestiaire** : 83 monstres (dont des variantes recolorées) ; l'onglet présente aussi les panoplies et leurs bonus,
  les capacités des boss et les affixes d'élite.
- **Collection d'objets** : chaque type d'objet trouvé (44) donne un bonus permanent, plus encore en épique et en légendaire.
- **Transmutation** : 3 objets inutiles d'une rareté → 1 objet de la rareté au-dessus.
- **Clic sur le monstre** : coup bonus (25 % de l’attaque, 4 par seconde), aussi en mode mini.
- **Répliques** : le héros parle de temps en temps (légendaire, boss, K.O., record…).
- **Vitesse** (le bonus le plus précieux) : plumes du vent très rares et étoiles filantes à attraper d'un clic
  (permanent), rafale de vent (temporaire), pouvoir « Bottes d'Hermès ». Autres événements rares : pluie d'or, frénésie, corne d'abondance (un objet à chaque victoire), souffle de sagesse (expérience ×3),
  **coffre au trésor** (or, potion, objet rare ou mieux).
- **Boss** : capacités spéciales (enragé, coup dévastateur annoncé, carapace, régénération, miroir, vampirisme, souffle glacé,
  insaisissable, fureur croissante), deux à partir de la 2e boucle. Un boss qui bat le héros s'use : −5 % de PV par défaite
  (30 % au plus, même d'une course à l'autre) jusqu'à ce qu'il soit vaincu.
- **Élites à affixes** : rapide, blindé, vampirique, furieux ou givré (ses coups peuvent geler le héros).
- **Champions** : très rares (0,5 %, à partir de la zone 5), aura violette, bien plus coriaces, butin épique ou légendaire garanti.
- **Panoplies** : 9 ensembles (dont le Voyageur du vent, axé vitesse, et le Traqueur de champions, qui attire les élites), bonus à 2 et 4 pièces
  (bannière au palier atteint, détail au survol de l'étiquette de la fiche du héros).
- **Forge** : améliorer (+1 à +10) ou réforger les bonus secondaires ; vente automatique jusqu'aux rares.
- **Récompense quotidienne** : série de 7 jours consécutifs, coffre royal le 7e jour.
- **Bénédiction du jour** : un modificateur différent chaque jour (fortune, savoir, grande chasse, vent, furie, rempart, fête des gobelins).
- **Statistiques** : records, compteurs de l'aventure et liste des succès.
- **10 langues** : anglais (par défaut), chinois simplifié, russe, espagnol, portugais (Brésil), allemand, japonais,
  français, polonais, coréen. Choix dans Réglages (rechargement du panneau), menu de l'icône traduit aussi.
- **Réglages** : sons synthétisés (coupés par défaut), cycle jour/nuit, nombres de dégâts, effets réduits, météo, thème du panneau (Windows, clair, sombre),
  position, opacité, démarrage de Windows.
- **Clavier** (panneau ouvert) : 1 … 9, 0, - pour les onglets ; E équiper le meilleur ; V vendre l'inutile ; T transmuter ; R réclamer une quête (toutes avec le Bureau des contrats) ;
  M mode mini ; Entrée confirmer ; Échap fermer.
- **Conseils** : une bulle explique chaque fonctionnalité la première fois qu'elle devient utile.
- **Onglets** : quand ils ne tiennent pas sur une ligne (langue aux mots longs, petit écran), marges resserrées, puis
  sans icônes, puis police réduite ; les icônes seules en dernier recours.
- **Retour** : après une absence, résumé des gains, meilleur objet (équipable d'un clic) et « À faire maintenant »
  (quêtes, points, déblocage abordable, œufs, expéditions) ; en rouvrant le panneau, « Depuis ta dernière visite ».
  La bande rappelle le record à battre (ou l'événement en cours et ses secondes restantes) ; une fois tout débloqué,
  l'objectif devient ce record. Le prochain déblocage s'achète d'un clic depuis la carte du héros dès qu'il est payable.
- **Lueur stellaire** : chaque éclat d'étoile gagné renforce le héros pour toujours.
- **Effets** : pièces qui volent jusqu'au compteur d'or, faisceaux de butin selon la rareté, célébration des légendaires,
  bannières (niveau, record de zone, événements, palier de panoplie, boss « enfin vaincu » après un K.O.), répliques
  du héros, sons pour chacun de ces moments (option). `render/juice.js`, `render/sound.js`.
- **Journal** : les messages répétitifs se cumulent (ventes du sac plein, élites vaincues, défaites : « … (×N) »),
  le Grand intendant résume son travail en une ligne.

## Scripts

| Commande | Effet |
| --- | --- |
| `npm start` | Lance le jeu en mode dev (boutons de vitesse ×1/×3/×10 dans le panneau) |
| `npm run dev` | Idem + DevTools |
| `npm test` | Tests de la logique de jeu, sans Electron |
| `npm run perf` | Mesure RAM/CPU (bande, panneau ouvert, mini, icône seule) → `perf-report.json` |
| `node --experimental-default-type=module scripts/simulate.js 12 warrior` | Simule un joueur pendant 12 h (équilibrage, records par course) |
| `npm run selftest` | Parcourt l'interface tout seul (survol, panneau, modes, Quitter) sans toucher à la souris |
| `npm run icons` | Régénère les icônes à partir du pixel art du héros |
| `npm run dist` | Build Windows dans `dist/win-unpacked/` (le dossier à envoyer sur Steam) |

Options de dev (ignorées dans le build final) : `--user-data=<dossier>` (sauvegarde isolée), `--speed=10`, `--open-panel`,
`--mode=strip|mini|icon`, `--tab=talents|shop|class`, `--shot=capture.png`, `--shot-delay=<ms>`, `--exit-after=<s>`, `--ghost` (tests invisibles : fenêtre hors de l'écran, jamais au premier plan, sans icône de notification), `--demo` (déclenche les effets spéciaux),
`--width=1366` (simule un écran plus étroit).

Node 22 est recommandé. Avec Node 20, si le binaire Electron manque après `npm install` : `node --experimental-require-module node_modules/electron/install.js`.

## Organisation

```
src/
  shared/config.js        réglages techniques (App ID Steam, hauteurs, intervalles)
  main/                   processus principal (Node)
    main.js               cycle de vie, IPC, sauvegarde à la fermeture
    strip-window.js       fenêtre : modes bande / mini / icône, placement, clics traversants
    tray.js               icône de notification : menu, infobulle, animation
    save-store.js         save.json + save.backup.json, écriture atomique, récupération
    settings.js           préférences (position, écran, opacité)
    steam.js              steamworks.js : succès + Steam Cloud, no-op sans Steam
    protocol.js           protocole app:// pour le renderer
    perf.js               banc de mesure (dev)
  preload/preload.js      pont sécurisé (window.sillwalker)
  renderer/
    app.js                assemble jeu + rendu + UI, boucles, sauvegarde auto
    game/                 LOGIQUE PURE (aucun DOM) : testable avec Node
      data.js             contenu : raretés, zones, monstres, élites, objets, rythme
      classes.js          classes jouables (statistiques, passif, combat à distance)
      talents.js          arbres de talents et effets
      shop.js             catalogue de la boutique et prix
      quests.js           modèles de quêtes et récompenses
      pets.js             familiers
      powers.js           pouvoirs des objets légendaires
      bestiary.js         paliers du bestiaire
      prestige.js         ascension et constellations
      skilltree.js        arbre de compétences (graphe généré à partir de SECTORS)
      events.js           vitesse permanente et événements rares
      bosses.js           capacités spéciales des boss
      sets.js             panoplies
      rules.js            formules d'équilibrage
      game.js             simulation + actions du joueur, émet des événements
      state.js            format de sauvegarde + migrations
      achievements.js     succès Steam
    render/               art.js = pixel art, dom.js = briques communes,
                          strip.js = bande (parcours de zone), mini.js = encart mini, heroart.js = héros
                          assemblés à partir de pièces, equipvis.js = équipement visible, juice.js = effets,
                          sound.js = sons, trayicons.js = icônes de la zone de notification
    i18n/                 traductions : index.js (t(), langue), keys.js (textes source, ordre fixe),
                          lang/xx.js (traductions par indice), data.js (noms des données, noms d'objets)
    ui/                   panneau de gestion (panel.js + un module par onglet dans ui/tabs/), clics traversants,
                          conseils (hints.js)
```

### Ajouter du contenu

- **Zone** : une entrée dans `ZONES` (`game/data.js`).
- **Monstre** : un nom et ses modificateurs dans `MONSTERS` + 2 images dans `MONSTER_ART` (`render/art.js`).
- **Classe** : une entrée dans `classes.js`, un arbre dans `talents.js` (`TREES`), un sprite dans `CLASS_ART`.
  Mécaniques disponibles pour un passif ou un talent : voir `EFFECTS` (bouclier, poison, serviteur, enchaînement, épines...).
- **Arbre de compétences** : modifier `SECTORS` dans `skilltree.js` (petits nœuds, remarquables, clé de voûte) ;
  la forme du graphe est générée automatiquement.
- **Talent** : une ligne dans la branche voulue de `TREES` (effets possibles : `EFFECTS`).
- **Article de boutique** : `CONSUMABLES`, `CHESTS` ou `UPGRADES` dans `shop.js` (+ l'effet dans `BUFF_EFFECTS` pour un élixir).
- **Quête** : un modèle dans `QUEST_TEMPLATES` (+ son poids dans `WEIGHTS`) et un appel à `questProgress` là où l'action se produit.
- **Familier** : une entrée dans `PETS` + un sprite dans `PET_ART`.
- **Pouvoir légendaire** / **constellation** : une ligne dans `POWERS` / `CONSTELLATIONS`.
- **Onglet du panneau** : un module dans `ui/tabs/` + une entrée dans `TABS` (`ui/panel.js`).
- **Objets** : `ITEM_BASES` / `ITEM_SUFFIXES`.
- **Succès** : une ligne dans `game/achievements.js` (même « API Name » que dans Steamworks).
- **Texte affiché** : l'écrire en français dans `tx("…")`, puis `scripts/i18n-extract.mjs` / `i18n-append.mjs`
  pour l'ajouter à `keys.js`, le traduire dans chaque `i18n/lang/xx.js` et vérifier avec `scripts/i18n-check.mjs xx`.
  Pas de pluriel à la française dans les variables : prévoir une phrase entière par langue.
- **Nouvelle donnée sauvegardée** : valeur par défaut dans `freshState()`, et si besoin une étape dans `migrate()` en augmentant `SAVE_VERSION`.

## Sauvegarde

`%APPDATA%\Sillwalker\save.json`, écrite toutes les 15 s, après chaque action importante et à la fermeture.
`save.backup.json` est rafraîchi au plus toutes les 10 min. Si la principale est illisible, elle est mise de côté
(`save.corrupt-*.json`) et la partie repart du secours. Progression hors ligne : plafonnée à 8 h, aussi appliquée
après une mise en veille du PC.

## Steam : à faire avant la mise en ligne

1. Mettre le vrai App ID dans `src/shared/config.js` (`STEAM_APP_ID`, actuellement 480 = Spacewar).
2. Steamworks → Stats & Achievements : créer `FIRST_BOSS`, `LEVEL_10`, `FIRST_LEGENDARY`, `ZONE_10`, `ZONE_25`,
   `LEVEL_50`, `ELITE_HUNTER`, `FIRST_PURCHASE`, `TALENT_ULTIMATE`, `ASCENSION`, `ASCENSION_5`, `PET_FIRST`, `PETS_ALL`,
   `QUESTS_25`, `GOBLIN`, `BESTIARY_ALL`, `FULL_SET`, `FEATHER`, `SHOOTING_STAR`, `SPEED_25`, `SKILL_KEYSTONE`, `SKILL_100`, `MASTER_OF_ALL`, `ALL_CLASSES`,
   `ZONE_50`, `LEVEL_100`, `KILLS_1000`, `KILLS_10000`, `BOSSES_100`, `GOLD_MILLION`, `BIG_HIT`, `PHOENIX`, `DAILY_7`, `PLAY_10H`, `REFORGE_10`, `EVENTS_10`, `POTIONS_50`, `CHEST`, `CODEX_HALF`, `CODEX_ALL`, `EXPEDITIONS_10`, `CHAMPION`, `POWERS_ALL`, `TAPS_1000`, `WORLD_TOUR`, `UNLOCK_FIRST`, `UNLOCK_ALL` (liste dans `game/achievements.js`), puis publier.
3. Steamworks → Steam Cloud : activer, quota (1 fichier, quelques dizaines de Ko suffisent).
   Le jeu écrit `save.json` via l'API Cloud (toutes les 5 min et à la fermeture) et prend la plus récente au lancement.
4. Rich presence : dans Steamworks → Rich Presence, ajouter un fichier de localisation (français) avec
   `"#Status" "Zone %zone% · Niveau %level% · %class%"`. Le jeu renseigne `zone`, `level`, `class`.
5. Option : `STEAM_RELAUNCH_IF_NEEDED: true` pour que Steam relance le jeu s'il est ouvert hors Steam.
6. Dépôt : envoyer le contenu de `dist/win-unpacked/`, exécutable `Sillwalker.exe`.
7. Signature de code : non configurée (facultative pour Steam, réduit les alertes SmartScreen hors Steam).

Sans Steam (dev ou Steam fermé) le jeu tourne normalement : les succès sont journalisés et renvoyés à Steam au prochain lancement avec Steam.
