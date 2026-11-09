// Réglages techniques de l'application (processus principal).
module.exports = {
  // App ID Steam. 480 = « Spacewar », l'appli de test publique de Valve.
  // À REMPLACER par l'App ID de Sillwalker avant la mise en ligne.
  STEAM_APP_ID: 480,
  // En build final : si le jeu n'a pas été lancé par Steam, demander à Steam
  // de le relancer (recommandé par Valve). Laisser false tant que l'App ID
  // définitif n'est pas configuré, sinon le jeu se fermerait au lancement.
  STEAM_RELAUNCH_IF_NEEDED: false,

  STRIP_HEIGHT: 120,          // hauteur de la bande (px logiques)
  PANEL_MAX_HEIGHT: 500,      // hauteur max du panneau de gestion
  PANEL_MIN_GAP: 40,          // marge laissée en haut de l'écran
  MINI_WIDTH: 370,            // mode mini : encart près de l'horloge (370 : place du bouton son)
  MINI_HEIGHT: 64,
  MINI_MARGIN: 8,
  TRAY_ANIM_MS: 500,          // animation de l'icône en mode « icône seule »

  BACKUP_INTERVAL_MS: 10 * 60 * 1000,  // fréquence de la sauvegarde de secours
  CLOUD_INTERVAL_MS: 5 * 60 * 1000,    // fréquence d'envoi vers Steam Cloud
  FLUSH_TIMEOUT_MS: 2000,              // attente max de la sauvegarde à la fermeture

  OPACITY_CHOICES: [1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.1, 0.05],
};
