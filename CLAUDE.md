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
- Commits : `git -c user.name="Victor Basset" -c user.email="victor.basset@yahoo.fr" commit`,
  message en français, terminé par la ligne `Co-Authored-By` demandée par la session.
  Committer à chaque étape qui marche ; ne pousser que si l'utilisateur l'a demandé.

## Tests (toujours invisibles)

- `npm test` : syntaxe de tous les fichiers + tests de logique (Node seul, rapide).
- `npm run selftest` (Windows) / `npm run selftest:linux` (Ubuntu, écran virtuel) : parcours
  automatique de l'interface, doit afficher « N/N vérifications réussies ».
- Simulation d'équilibrage : `node --experimental-default-type=module scripts/simulate.js [heures] [classe]`
  (quelques secondes ; si elle dépasse une minute, c'est une boucle sans fin : instrumenter tout de suite).
- Toujours lancer Electron avec **`--ghost`** : fenêtre hors écran, sans focus ni icône de notification.
  Options utiles (dev) : `--user-data=<dossier>`, `--tab=<onglet>`, `--mode=strip|mini`,
  `--shot=<fichier.png> --shot-delay=<ms>`, `--exit-after=<s>`, `--width=1366`,
  `--dump-text=<fichier>` (texte de chaque onglet, pour traquer les textes non traduits), `--demo`.
  Sous Linux, préfixer par `xvfb-run -a -s "-screen 0 1920x1080x24"` et ajouter `--no-sandbox`.
- Les erreurs de l'interface s'affichent dans la console sous la forme `[renderer error] …`.

## Traductions (10 langues, anglais par défaut)

- Texte affiché : l'écrire en français dans `tx("…")` (ou `tr()` pour les noms de données).
- Nouvelles clés : `node --experimental-default-type=module scripts/i18n-append.mjs '["clé 1","clé 2"]'`
  (ajoutées à la fin de `i18n/keys.js`, l'ordre ne bouge jamais), puis les traduire dans
  **chacun** des fichiers `src/renderer/i18n/lang/{en,es,pt,de,pl,ru,zh,ja,ko}.js` (indice = position),
  et vérifier avec `scripts/i18n-check.mjs <langue>` (0 problème attendu).
- Pas de pluriel à la française dans les variables : `plS(n)` (i18n/index.js) ou une phrase entière.
  Nombres : `fmt`, `fmtShort`, `unit("%")`, `dec()` de `game/format.js` (format de la langue).
  Noms communs en minuscules : `lc()` (garde la majuscule allemande). Espace avant « : » : `fsp()`.
- Les noms d'objets sont enregistrés **en français** et traduits à l'affichage (`itemName`).

## Pièges connus

- Les scripts Python écrits dans un heredoc abîment les `\n` et les accents : écrire le script dans
  un fichier, ou utiliser l'outil d'édition.
- `sed` sur des chaînes JavaScript : attention aux `\u…` et aux `\n`, vérifier le résultat.
- Le dossier `dist\win-unpacked` peut être verrouillé si l'utilisateur y lance le jeu.
- Construire la version Windows : `npm run dist` (sous Linux, il faut Wine pour l'icône de l'exécutable).
