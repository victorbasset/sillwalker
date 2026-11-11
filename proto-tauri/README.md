# Essai : la bande de Sillwalker sous Tauri

Demande de Victor (2026-11-11) : comparer **mémoire et processeur** entre la version Electron et une version Tauri,
avant de décider d'un éventuel portage. L'essai ne contient que **la bande** (le panneau s'ouvre aussi, mêmes pages),
avec le passage des clics à travers la bande.

## Activer la compilation (une seule fois)

Le jeton GitHub du serveur n'a pas le droit de créer un workflow (« workflow scope »). À faire une fois, sur github.com :
dépôt `victorbasset/sillwalker` → **Add file** → **Create new file** → nom `.github/workflows/proto-tauri.yml` →
coller le contenu de `proto-tauri/workflow-a-ajouter.yml` → **Commit changes**. (Ou donner la permission « workflow »
au jeton du serveur, et Claude l'ajoutera lui-même.)

## Récupérer l'exécutable

GitHub compile l'essai sur une machine Windows à chaque modification de ce dossier :
dépôt `victorbasset/sillwalker` → onglet **Actions** → « Essai Tauri (Windows) » → dernière exécution réussie →
artefact **sillwalker-tauri-essai** (un zip contenant `sillwalker-proto.exe`, rien à installer : Windows 10/11 a déjà WebView2).

## Ce que l'essai fait / ne fait pas

- Même jeu (mêmes pages que la version Electron), bande en bas de l'écran, transparente, toujours au premier plan,
  clics qui traversent sauf sur les boutons et le panneau (même méthode qu'Electron : position de la souris 20 fois/s).
- **Sauvegarde à part** : `%APPDATA%\com.sillwalker.prototauri\save.json`. Au premier lancement, il part d'une COPIE de
  ta partie Electron (`%APPDATA%\Sillwalker\save.json`, seulement lue, jamais modifiée).
- Pas de mode mini ni d'icône de notification, pas de Steam, pas de masquage devant un jeu en plein écran.
- Pour quitter : bouton « Quitter » du panneau.

## Comparer

1. Fermer la version Electron, lancer l'essai, attendre 2-3 minutes, noter dans le Gestionnaire des tâches la mémoire
   et le processeur (« Sillwalker Tauri » + les processus « Microsoft Edge WebView2 » qu'il lance).
2. Quitter l'essai, relancer Sillwalker (Electron), mêmes mesures (tous les processus « Sillwalker »).
3. Vérifier que les clics traversent bien la bande hors des boutons.

## Fichiers

- `bridge.js` : remplace le pont d'Electron (`src/preload/preload.js`) par des commandes Tauri.
- `build-web.mjs` : copie `src/renderer` dans `dist/` et y ajoute `bridge.js`.
- `src-tauri/` : fenêtre, sauvegarde, passage des clics (Rust).
