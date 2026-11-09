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

- `crontab` lance `scripts/auto-iteration.sh` toutes les 10 minutes : une itération de développement
  en mode non interactif (`claude -p`, consignes dans `scripts/auto-iteration.md`). Il ne fait rien si une
  itération tourne déjà ou si une session interactive a touché au dépôt ces 15 dernières minutes.
  Journal : `logs/auto-iteration.log` (exclu de git). Arrêter : `crontab -r` (ou `crontab -e`).

## Tests (toujours invisibles)

- `npm test` : syntaxe de tous les fichiers + tests de logique (Node seul, rapide).
- `npm run selftest` (Windows) / `npm run selftest:linux` (Ubuntu, écran virtuel) : parcours
  automatique de l'interface, doit afficher « N/N vérifications réussies ».
- Parties bloquées : `node --experimental-default-type=module scripts/fuzz.mjs [graines] [minutes]` lance beaucoup de
  nouvelles parties (10 classes) et signale celles qui ne progressent pas (60 graines ≈ 35 s). À relancer après
  tout changement des monstres, élites, champions ou de la mort du héros.
- Dix premières minutes : `node --experimental-default-type=module scripts/first-minutes.mjs` (seconde de la première
  récompense de chaque sorte, 3 graines). À relancer si on touche au début de partie.
- Simulation d'équilibrage : `node --experimental-default-type=module scripts/simulate.js [heures] [classe]`
  (quelques secondes ; si elle dépasse une minute, c'est une boucle sans fin : instrumenter tout de suite).
  `SEED=<n>` devant la commande change la trajectoire aléatoire (graine 7 par défaut) : utile pour savoir si un
  écart vu sur une seule simulation est du hasard (lancer 5 graines).
- Une seule simulation suit une trajectoire aléatoire fixe : pour juger un changement d'équilibrage,
  `node scripts/balance.mjs 12 <commit>` compare le record moyen en 12 h des 10 classes entre ce commit et
  l'état actuel (≈ 1 min 15) ; un écart de ±1,5 zone est du bruit. À lancer après tout ajout qui touche aux combats.
- Toujours lancer Electron avec **`--ghost`** : fenêtre hors écran, sans focus ni icône de notification.
  Options utiles (dev) : `--user-data=<dossier>`, `--tab=<onglet>`, `--mode=strip|mini`,
  `--shot=<fichier.png> --shot-delay=<ms>`, `--exit-after=<s>`, `--width=1366`,
  `--dump-text=<fichier>` (texte de chaque onglet, pour traquer les textes non traduits), `--demo`,
  `--battery` (simule un portable sur batterie : 20 images/s), `--idle` (simule un utilisateur absent : 10 images/s).
  Sous Linux, préfixer par `xvfb-run -a -s "-screen 0 1920x1080x24"` et ajouter `--no-sandbox`.
- Captures dans une autre langue : la langue vient de la **sauvegarde** (`settings.lang` dans `save.json`
  de la copie), pas de `settings.json`. Thème sombre : ajouter `--force-dark-mode` (le thème suit Windows).
- Les erreurs de l'interface s'affichent dans la console sous la forme `[renderer error] …`.

## Traductions (10 langues, anglais par défaut)

- Texte affiché : l'écrire en français dans `tx("…")` (ou `tr()` pour les noms de données).
- Nouvelles clés : `node --experimental-default-type=module scripts/i18n-append.mjs '["clé 1","clé 2"]'`
  (ajoutées à la fin de `i18n/keys.js`, l'ordre ne bouge jamais), puis les traduire dans
  **chacun** des fichiers `src/renderer/i18n/lang/{en,es,pt,de,pl,ru,zh,ja,ko}.js` (indice = position),
  et vérifier avec `scripts/i18n-check.mjs <langue>` (0 problème attendu).
- Pluriels : `txn(n, "{n} objet|{n} objets")` (i18n/index.js) ; chaque traduction donne ses formes séparées
  par « | » : 1 (zh, ja, ko), 3 (ru, pl : one|few|many), 2 sinon (vérifié par i18n-check). `plS(n)` est l'ancienne
  méthode (ne marche qu'en français/anglais), à éviter dans les nouveaux textes.
  Nombres : `fmt`, `fmtShort`, `unit("%")`, `dec()` de `game/format.js` (format de la langue).
  Noms communs en minuscules : `lc()` (garde la majuscule allemande). Espace avant « : » : `fsp()`.
- `i18n-check` ne voit pas les textes écrits en dur hors `tx()` : extraire le texte affiché en russe
  (`--open-panel --dump-text=<fichier>`, sans `--exit-after`) et y chercher les mots latins
  (`grep -oP "(?<![A-Za-z])[A-Za-zÀ-ÿ']{4,}"`) ; ce qui n'est pas un repère `=== onglet` est suspect.
- Les noms d'objets sont enregistrés **en français** et traduits à l'affichage (`itemName`).

## Pièges connus

- Sauvegardes : `migrate()` (state.js) renvoie null pour une version inconnue → partie neuve. SaveStore
  (main/save-store.js) met alors de côté la sauvegarde plus récente avant la première écriture
  (`save.newer-v*.json`) ; ne jamais retirer cette protection. Le lanceur `test()` de test-logic est synchrone :
  un test `async` serait compté réussi tout de suite (échec signalé seulement après le total) :
  tous les tests sont synchrones, avec des imports statiques en tête de fichier ; garder cette règle.

- Panneau : thème clair (par défaut) et sombre selon Windows. Jamais de couleur claire en dur pour du texte
  (#ffe9a8, #9fe0a8…) : utiliser les jetons du thème (`--accent`, `--good`, `--bad`, `--r0`…`--r4`, `--muted`)
  ou une couleur vive dans `--c` avec la classe `.tint` (assombrie en thème clair). Vérifier en capture
  avec et sans `--force-dark-mode`. (La bande et le mode mini sont toujours sombres : non concernés.)

- Les scripts Python écrits dans un heredoc abîment les `\n` et les accents : écrire le script dans
  un fichier, ou utiliser l'outil d'édition.
- `sed` sur des chaînes JavaScript : attention aux `\u…` et aux `\n`, vérifier le résultat.
- Le dossier `dist\win-unpacked` peut être verrouillé si l'utilisateur y lance le jeu.
- Construire la version Windows : `npm run dist` (sous Linux, il faut Wine pour l'icône de l'exécutable).
