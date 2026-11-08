# Sillwalker

Idle RPG qui vit dans une bande en bas (ou en haut) de l'écran. Application Electron pour Windows, prévue pour Steam.

Trois affichages (bouton sur la bande / l'encart, panneau, ou menu de l'icône de notification) :
- **Bande** : toute la largeur de l'écran est la carte de la zone. Les 10 monstres attendent le long du chemin, le boss au bout ; le héros avance d'un combat à l'autre.
- **Mini** : petit encart près de l'horloge (combat en cours, niveau, or, zone). Un clic l'agrandit en bande.
- **Icône seule** : plus de fenêtre ; l'icône de notification s'anime (marche, combat, K.O., butin) et son infobulle donne niveau, zone et or. Clic sur l'icône = retour au dernier affichage.

## Contenu

- **10 classes** (onglet Classe, changement gratuit, chaque classe garde ses talents) :
  Guerrier (riposte), Rôdeur (tir d'ouverture), Mage (brûlure), Paladin (bouclier sacré), Assassin (poison cumulable),
  Nécromancien (serviteur squelette), Moine (enchaînement), Druide (épines, esprit-loup), Samouraï (iaijutsu : un coup sur 4 critique renforcé),
  Berserker (vol de vie, exécution des cibles affaiblies).
- **Arbre de compétences** commun à toutes les classes : 144 nœuds en 6 secteurs (Force, Agilité, Arcanes,
  Vitalité, Fortune, Maîtrise), 24 nœuds remarquables, 6 clés de voûte. 1 point tous les 2 niveaux + points
  permanents d'ascension. Le chemin est conservé à l'ascension et se réactive au fil des niveaux.
- **Talents** : un arbre par classe, 3 branches × 4 paliers (0 / 5 / 10 / 20 points), talent ultime ★ au bout. 1 point par niveau.
- **Boutique** : marchand (4 objets, renouvelé toutes les 15 min ou contre de l'or), potions bues automatiquement
  sous 30 % de vie, élixirs de 10 min (attaque, or, expérience), coffres à rareté garantie, sac jusqu'à 48 places.
- **23 zones** qui bouclent (forêt, grotte, crypte, marais, forge, désert, toundra, jungle, ruines célestes, abysses… jusqu'au volcan des wyvernes),
  chacune avec sa météo (neige, braises, feuilles, spores, bulles…), **43 monstres** avec leurs propres caractéristiques, **élites dorés** (6 %, or ×4, butin garanti),
  **gobelin doré** (rare : s'enfuit au bout de 4 s, or ×15 s'il est attrapé).
- **Quêtes** : 3 contrats à la fois (chasse, élites, boss, or, forge, zone), récompenses variées
  (or, coffres, élixirs, potions, œufs, éclats d'étoile).
- **Familiers** : 11 compagnons (dont le lapin et le phénix, rares) qui suivent le héros, sortent d'œufs (boss, élites, quêtes)
  et montent jusqu'au niveau 10. Les autres partent en **expédition** (30 min, 2 h, 8 h, même jeu fermé) et rapportent
  or, expérience, œufs et objets.
- **Pouvoirs légendaires** : chaque objet légendaire reçoit l'un des 24 pouvoirs uniques.
- **Bestiaire** : paliers de 10 / 100 / 1 000 / 10 000 victoires par monstre, bonus permanents.
- **Ascension** (dès la zone 20) : recommencer contre des éclats d'étoile, dépensés dans 10 constellations permanentes
  (attaque, PV, or, expérience, points de talent, zone de départ, temps hors ligne...).
- **Cycle jour / nuit** sur la bande, calé sur l'heure de l'ordinateur.
- **Objets** : 7 emplacements (arme, casque, armure, gants, bottes, anneau, amulette), 46 types, des matériaux
  qui évoluent avec le niveau (bronze → étoile, lin → tissu céleste…), 32 icônes. L'armure, le casque, l'arme et
  les bottes portés changent l'apparence du héros ; halo doré avec un légendaire.
- **Bestiaire** : 43 monstres (dont des variantes recolorées).
- **Collection d'objets** : chaque type d'objet trouvé (44) donne un bonus permanent, plus encore en épique et en légendaire.
- **Transmutation** : 3 objets inutiles d'une rareté → 1 objet de la rareté au-dessus.
- **Vitesse** (le bonus le plus précieux) : plumes du vent très rares et étoiles filantes à attraper d'un clic
  (permanent), rafale de vent (temporaire), pouvoir « Bottes d'Hermès ». Autres événements rares : pluie d'or, frénésie,
  **coffre au trésor** (or, potion, objet rare ou mieux).
- **Boss** : capacités spéciales (enragé, coup dévastateur annoncé, carapace, régénération, miroir, vampirisme), deux à partir de la 2e boucle.
- **Élites à affixes** : rapide, blindé, vampirique ou furieux.
- **Panoplies** : 8 ensembles (dont le Voyageur du vent, axé vitesse), bonus à 2 et 4 pièces.
- **Forge** : améliorer (+1 à +10) ou réforger les bonus secondaires ; vente automatique jusqu'aux rares.
- **Récompense quotidienne** : série de 7 jours consécutifs, coffre royal le 7e jour.
- **Bénédiction du jour** : un modificateur différent chaque jour (fortune, savoir, grande chasse, vent, furie, rempart, fête des gobelins).
- **Statistiques** : records, compteurs de l'aventure et liste des succès.
- **Réglages** : sons synthétisés (coupés par défaut), cycle jour/nuit, nombres de dégâts, effets réduits, météo,
  position, opacité, démarrage de Windows.
- **Conseils** : une bulle explique chaque fonctionnalité la première fois qu'elle devient utile.
- **Lueur stellaire** : chaque éclat d'étoile gagné renforce le héros pour toujours.
- **Effets** : pièces qui volent jusqu'au compteur d'or, faisceaux de butin selon la rareté, célébration des légendaires,
  bannières (niveau, record de zone, événements). `render/juice.js`.

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
`--mode=strip|mini|icon`, `--tab=talents|shop|class`, `--shot=capture.png`, `--shot-delay=<ms>`, `--exit-after=<s>`, `--ghost` (fenêtre à 2 % d'opacité, pour tester sans gêner), `--demo` (déclenche les effets spéciaux),
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
   `ZONE_50`, `LEVEL_100`, `KILLS_1000`, `KILLS_10000`, `BOSSES_100`, `GOLD_MILLION`, `BIG_HIT`, `PHOENIX`, `DAILY_7`, `PLAY_10H`, `REFORGE_10`, `EVENTS_10`, `POTIONS_50`, `CHEST`, `CODEX_HALF`, `CODEX_ALL`, `EXPEDITIONS_10` (liste dans `game/achievements.js`), puis publier.
3. Steamworks → Steam Cloud : activer, quota (1 fichier, quelques dizaines de Ko suffisent).
   Le jeu écrit `save.json` via l'API Cloud (toutes les 5 min et à la fermeture) et prend la plus récente au lancement.
4. Rich presence : dans Steamworks → Rich Presence, ajouter un fichier de localisation (français) avec
   `"#Status" "Zone %zone% · Niveau %level% · %class%"`. Le jeu renseigne `zone`, `level`, `class`.
5. Option : `STEAM_RELAUNCH_IF_NEEDED: true` pour que Steam relance le jeu s'il est ouvert hors Steam.
6. Dépôt : envoyer le contenu de `dist/win-unpacked/`, exécutable `Sillwalker.exe`.
7. Signature de code : non configurée (facultative pour Steam, réduit les alertes SmartScreen hors Steam).

Sans Steam (dev ou Steam fermé) le jeu tourne normalement : les succès sont journalisés et renvoyés à Steam au prochain lancement avec Steam.
