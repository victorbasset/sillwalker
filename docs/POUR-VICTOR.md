# Ce qui attend Victor

Tenu à jour par les itérations automatiques (it. 1386). Les décisions et les gestes que seul Victor peut faire ; le
détail est dans `docs/JOURNAL.md` et `steam/checklist.md`.

## Steamworks (si la page ou les succès sont déjà saisis)

- **Page du magasin** : recopier `steam/store-page.md` (10 langues). Elle cite maintenant 18 événements rares,
  10 sortes d'élites et 19 sortes de quêtes (it. 1375, 1382, 1406 et 1452).
- **Succès** : déclarer `CHAMPIONS_25` « Fléau des champions » (it. 1266) et `EXPLOSIVE_25` « Démineur (25 explosifs) »
  (it. 1395), `CHESTS_50` « Pilleur de coffres (50 coffres) » (it. 1430), chacun avec ses deux icônes (`steam/achievement-icons/`) ; renommer `BLESSINGS_ALL` en « Toutes les bénédictions du jour » (était « Dix jours bénis », it. 1293).
  Liste complète : `steam/achievements.md` (70 succès).

## Version 0.1.4 (à décider)

- Brouillon du devlog prêt : `docs/devlog-0.1.4-brouillon.md` (éditions « Quoi de neuf » 59 à 97). Nouveautés
  majeures depuis la 0.1.3 : champions et leur quête, 4 événements rares (Lune pâle, Écho des lames, Source de vie, Trésor enfoui),
  3 élites (Régénérant, Venimeux, Explosif), 6 bénédictions du jour, 4 familiers (Grenouillette, Lucane, Pie, Grillon), l'Encens de
  chasse, les effets actifs sur la bande, des absences plus justes, de nombreuses corrections de langues.
- Pour sortir : `CLAUDE.md` > « Sortie d'une version » (numéro, notes, constructions, `scripts/itch-push.sh` après ton
  « oui »).

## Fin de partie (à décider, pas urgent)

- Une semaine simulée finit toujours vers la zone 350 (guerrier et mage), l'écho de boss suivant : la progression
  ralentit fortement au-delà (chaque zone est ×1,04 plus dure après la 70). Garder ce rythme lent, ou adoucir la courbe
  au-delà de 250 (≈ +30-40 zones en 2 semaines) ? Détail : `docs/JOURNAL.md` > Idées > « À PROPOSER À VICTOR (it. 1029) ».

## À vérifier sous Windows (impossible sur le serveur)

- Voir `docs/JOURNAL.md` > Idées > « À VÉRIFIER PAR VICTOR SOUS WINDOWS » (premier plan, son, carte graphique).

## Nouveautés du 14 au 15 novembre (it. 1328-1510)

**Contenu**
- Familiers : Lucane (dégâts contre les boss), Pie (+6 % de coffres au trésor par niveau), Grillon (+5 % d'événements
  rares par niveau) : 21 familiers.
- Événements rares : Source de vie (soin), Trésor enfoui (coffres pendant 30 s) : 18 événements.
- Bénédictions du jour : Jour du sang, Jour des arcanes (sorts rechargés 50 % plus vite).
- Élite Explosive ; Encens de chasse (boutique, deux fois plus d'élites 10 min).
- Quêtes : « Gagner N niveaux » et « Attraper N gobelins dorés » (19 sortes) ; les gobelins sont aussi attrapés pendant
  l'absence, avec leur or, quand le héros est assez rapide.
- Succès : « Démineur » (25 Explosifs) et « Pilleur de coffres » (50 coffres) : 70 succès.

**Confort**
- Temps estimé sur presque toutes les cartes de quête (exact pour les expéditions ; aucun quand le héros bute).
- Une quête qui ne peut pas avancer le dit : monstre absent de la zone (où il vit, un clic y emmène avec la Carte du
  voyageur), gobelins trop rapides, avancée automatique coupée (un bouton la reprend).
- Sur la bande, un ◆ marque les monstres visés par une quête en cours.
- Bestiaire : un clic (ou Entrée) sur un monstre emmène là où il vit (Carte du voyageur).
- Héros bloqué : pistes visibles dans la carte de la zone et la bulle du mode mini ; nouvelle piste « forger avec ton
  or » (un héros simulé butait une heure avec 400 k d'or).
- Mode mini : effets actifs, bénédiction de demain, pistes du héros bloqué ; Statistiques > Probabilités : chances
  du jour (Pie, prodiges, champions) ; recharge réelle des sorts le Jour des arcanes.
- « Quoi de neuf » montre jusqu'à 11 nouveautés quand les éditions sont courtes.
- Ta demande : Héros > Sorts et attaque montre les sorts du compagnon en grandes cartes, à droite de ceux du héros ;
  la carte du héros (Aventure) montre aussi ses sorts appris, et le compteur du sous-onglet les compte.
  (Le mode « Automatique (très grands écrans) » était déjà le réglage par défaut.)
- Ta demande : après la fleur, « Dépenser automatiquement » suit la ligne la plus avancée (la région où tu as le plus
  de nœuds, sa voie jusqu'au bout puis son anneau) au lieu d'ouvrir les six portes et de sauter d'une région à
  l'autre. Fin de semaine simulée inchangée (350).
- Tes demandes : cadres de sorts du héros et du compagnon à la même hauteur, même espace au-dessus du style
  d'attaque ; Carte : la tête du héros (celle de l'icône) posée sur le carré de sa zone, textes (niveau des reliques
  sous le drone…) dans la police des textes, avec un contour, lisibles.
- Ta demande : un objet acheté à la Boutique qui renforce le héros est équipé tout de suite.
- « Quoi de neuf » : édition 98 (tes demandes de cet après-midi, 4 nouveautés).

**Corrections**
- Parchemins de fortune et de savoir enfin comptés pendant l'absence ; « tout dépenser » du grand graphe sans gel
  (400 → 40 ms) ; pluriels russes et polonais ; termes cohérents d'une langue à l'autre.

**Vérifié** : équilibre inchangé (3 graines ; tableau des 20 héros 63,6 de moyenne), mémoire et performance stables,
parcours complets sans erreur (10 langues, état maximal, fin de partie). Le contrôle des traductions signale
maintenant aussi une phrase oubliée dans toutes les langues.
