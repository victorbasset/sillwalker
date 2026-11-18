# Devlog itch.io : version 0.1.7 (BROUILLON, ouvert à l'it. 2057)

Brouillon tenu à jour par la boucle automatique au fil des nouveautés parues depuis la 0.1.6 (éditions « Quoi de neuf »
133 et suivantes). Le jour de la sortie : version de package.json, NEWS_RELEASES (news.js, `after: 132`), puis ce texte en
10 langues (steam/itch/devlog-0.1.7.html) et le bloc « Publication » rempli (CLAUDE.md, « Sortie d'une version » ; modèle :
docs/devlog-0.1.6.md).

## Publication sur itch.io (à remplir à la sortie)

- **Titre :** (à choisir)
- **Image de couverture :** scripts/steam-capsules/make.js, entrée `update-0.1.7` (ver, tags)
- **Tags :** Sillwalker, idle game, idle RPG, incremental game, pixel art, indie game, desktop game, taskbar game,
  cozy game, gamedev
- **Langues du jeu :** English, French, Spanish, Portuguese (Brazil), German, Polish, Russian, Chinese (Simplified),
  Japanese, Korean
- **Texte :** steam/itch/devlog-0.1.7.html (à produire, 10 langues)
- **Envoi :** `REF=v0.1.7 scripts/itch-push.sh victor-basset/sillwalker` (après `--dry-run`) ; étiquette git v0.1.7

---

## Français (nouveautés depuis la 0.1.6, à compléter)

- **Carte de la zone :** le boss annoncé est le vrai (lieutenant, écho ou Briseur, avec ses vrais PV : avant, ceux d'un boss
  ordinaire, cinq fois moins pour le Chevalier de l'éclipse), et un seul nom pour lui (it. 2058-2059).
- **Héros bloqué devant un lieutenant ou le Briseur :** une piste « renforce tes reliques » (it. 2062) ; la carte ne défile plus
  dans ces zones, même en russe sur un écran de 1280 px (it. 2063).
- **Mode mini (signalé par Victor) :** le monstre suivant s'avance depuis sa place d'attente au lieu de disparaître puis de
  surgir plus loin (it. 2071) ; avant son combat, le boss attend lui aussi au fond de la scène (it. 2075).
- **Mode mini, suite :** un monstre qu'on n'a pas vu attendre (premier de la série, gobelin, Poupouce) entre par le bord droit ;
  après une défaite, le vainqueur s'efface et le monstre en attente revient en glissant (it. 2079-2083).
- **Bande, après une défaite :** les monstres vaincus reviennent en courant du bord et le vainqueur garde sa place (avant :
  l'inverse ; it. 2085).
- **Onglet Talents refait (demande de Victor, « digne d'un expert en ergonomie », it. 2094-2111) :** la fiche suit le survol sans
  délai et revient au talent cliqué quand la souris la rejoint ; plus rien ne bouge sous le curseur (pastilles à place fixe) ; un
  clic annonce son effet ; jauge des paliers par branche ; seules les lignes utiles restent en vert ; total des talents dans la
  fiche ; la Voie en or quand elle est disponible, avec ses effets chiffrés, et choisissable même en dépense automatique.
- **Actions sans retour confirmées dans une fenêtre (it. 2099-2113) :** réinitialiser les talents ou les compétences, monter vers
  les étoiles, effacer la partie (Entrée y annule) ; avant, un second clic au même endroit suffisait.
- **Moins d'erreurs, moins d'allers-retours (it. 2115-2127) :** annuler le dernier clic sur un talent (bouton ou touche Z) ; vendre
  les inutiles depuis la Boutique quand le sac est plein ; vente des objets précieux confirmée ; un clic sur le fond ferme une
  fenêtre ; Compétences sans boutons cachés ; bonus de maîtrise en grille alignée.
- **Retour d'absence (it. 2137-2143) :** le résumé détaillé tient sur deux colonnes, « À faire maintenant » visible d'emblée,
  même au pire cas ; il s'ouvre aussi quand on ouvre le panneau pendant la bulle ; la carte du héros résume l'absence (« Depuis ta
  dernière visite ») même après un redémarrage ; « Épique · pas gardé » quand le meilleur objet n'est plus là.
- **Clavier (it. 2119-2149) :** Z annule le dernier choix (Talents, Compétences) ; la fiche des Talents suit le focus ; les ⓘ
  prennent le focus et montrent leur aide ; Échap et un clic sur le fond annulent une confirmation.
- **Lisibilité (it. 2145-2146) :** Bestiaire : les noms longs passent en plus petit au lieu d'être coupés ; onglet Héros : une
  ligne d'explication en moins (dans un ⓘ).
- **Boutique et sac (it. 2153-2174) :** à sac plein, une amélioration du Marchand s'achète quand même (l'ancienne pièce vendue,
  jamais une précieuse ; la bulle le dit avant le clic), aussi depuis « À faire » ; après une vente, l'objet suivant est sélectionné
  (double clic protégé).
- **Maîtrises et quêtes (it. 2157-2162) :** « Garder les bonus actuels » éteint le rappel des paliers ; changer une quête 3 étoiles
  demande confirmation.
- **Clavier, suite (it. 2165-2170) :** flèches dans la grille des Talents ; Échap revient d'abord au sac ; Tab reste dans une fenêtre
  ouverte et le focus revient à sa place quand elle se ferme.
- **Clavier, fin (it. 2179-2189) :** les flèches se déplacent aussi dans le sac et entre les nœuds apprenables des Compétences ;
  l'aide des Talents cite tous les raccourcis ; en allant vers la fiche des Talents, elle garde le talent survolé.
- **Bestiaire (it. 2190) :** plus aucun nom coupé, même en russe : un nom trop long passe sur deux lignes.
- **Langues (it. 2192-2193) :** en japonais et en coréen, deux bonus se lisaient mal (« +65% HP 30%… », « +30% 4撃目… ») : reformulés.
- **Familiers (demandes de Victor, it. 2201-2208) :** « Emmener » sur une expédition en cours rappelle le familier (sans butin) et
  l'équipe d'un clic ; niveau sous le nom sur toutes les cartes ; aide (ⓘ) à côté du texte qu'elle explique.
- **Mac (it. 2204, vérifié par Victor) :** le menu du clic droit sur le Dock passe devant la bande.
- **Moins de chemin à chercher (it. 2227-2233) :** les quêtes de forge, de transmutation et d'expéditions mènent d'un clic à l'onglet où
  agir ; la Carte propose la Carte du voyageur dès qu'elle est achetable.
- **Corrections (it. 2238-2243) :** plus de quête d'expéditions impossible avant leur déblocage ; les cases d'automatisme disaient
  « moi-même » au lieu d'« automatiquement » dans six langues.
- **Sac plein (it. 2269) :** « À faire » propose d'agrandir le sac d'un clic quand c'est abordable (avant : seulement vendre).
- **Liens des quêtes (it. 2266-2267) :** cachés quand un automatisme fait déjà le geste (Grand intendant, Maître de forge, Creuset).
- **Linux (it. 2222) :** Réglages sans « Windows » ni case de démarrage sans effet.
- **Première installation (it. 2200, demande de Victor) :** volumes plus doux par défaut (effets 10 %, musique 20 %, ambiance 100 %,
  général 50 %).
- **Succès (it. 2286) :** les noms obscurs (Clé de voûte, Cœur pur, Écho dissipé…) disent au survol ce qu’il faut faire ; les trois
  succès les plus proches ressortent en or (it. 2294).
- **Bestiaire (it. 2303-2305) :** ce qui reste à découvrir dit où le trouver (monstres : leurs zones ; pouvoirs : sur les légendaires ;
  bénédictions : revenir d’autres jours).
- **Carnet de route (it. 2315) :** il annonce sa prochaine étape (« Prochaine étape : zone 60 »).
