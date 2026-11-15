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

- Brouillon du devlog prêt : `docs/devlog-0.1.4-brouillon.md` (éditions « Quoi de neuf » 59 à 93). Nouveautés
  majeures depuis la 0.1.3 : champions et leur quête, 4 événements rares (Lune pâle, Écho des lames, Source de vie, Trésor enfoui),
  3 élites (Régénérant, Venimeux, Explosif), 6 bénédictions du jour, 3 familiers (Grenouillette, Lucane, Pie), l'Encens de
  chasse, les effets actifs sur la bande, des absences plus justes, de nombreuses corrections de langues.
- Pour sortir : `CLAUDE.md` > « Sortie d'une version » (numéro, notes, constructions, `scripts/itch-push.sh` après ton
  « oui »).

## Fin de partie (à décider, pas urgent)

- Une semaine simulée finit toujours vers la zone 350 (guerrier et mage), l'écho de boss suivant : la progression
  ralentit fortement au-delà (chaque zone est ×1,04 plus dure après la 70). Garder ce rythme lent, ou adoucir la courbe
  au-delà de 250 (≈ +30-40 zones en 2 semaines) ? Détail : `docs/JOURNAL.md` > Idées > « À PROPOSER À VICTOR (it. 1029) ».

## À vérifier sous Windows (impossible sur le serveur)

- Voir `docs/JOURNAL.md` > Idées > « À VÉRIFIER PAR VICTOR SOUS WINDOWS » (premier plan, son, carte graphique).

## Nouveautés de la nuit du 14 au 15 novembre (it. 1328-1450)

Contenu : Encens de chasse (boutique), Lucane (familier), Source de vie (événement), Jour du sang (bénédiction),
Explosif (élite) ; icônes des effets actifs sur la bande et dans la bulle du mode mini ; bonus des familiers à
découvrir. Corrections : parchemins de fortune et de savoir enfin comptés pendant l'absence ; « tout dépenser » du
grand graphe sans gel (400 → 40 ms) ; pluriels russes et polonais (quêtes, ascension, sac…) ; termes cohérents
(« pupil » en polonais, noms d'onglets) ; outil `--crawl` qui clique vraiment tous les boutons.
Ensuite (it. 1387-1402) : succès « Démineur » (25 Explosifs, 69e succès) ; les élites vaincues pendant l'absence
comptent pour leur sorte ; bilans des événements plus riches (vie rendue, expérience, œufs) ; astuce de l'Encens de
chasse dans Bestiaire > Élites ; 18e sorte de quête « Gagner N niveaux » (avec son temps estimé, jamais proposée
quand les niveaux ne viennent plus) ; la bulle du mode mini annonce la bénédiction de demain ; bénédiction « Jour des arcanes » (sorts rechargés 50 % plus
vite ; la pastille et la bulle du mode mini disent quand les sorts arrivent si aucun n'est appris) ; temps estimé
sur les cartes des quêtes de sorts, de coups critiques et d'expéditions (exact pour ces dernières) et de coffres ; une quête de chasse dont le monstre
n'est pas dans la zone dit où il vit (un clic y emmène avec la Carte du voyageur) ; 20e familier, la Pie (+6 % de coffres au trésor par niveau, aussi
comptée dans Statistiques > Probabilités) ; 70e succès « Pilleur de coffres » (50 coffres) ; 18e événement rare, le Trésor enfoui (coffres à chaque
victoire pendant 30 s) ; Statistiques > Probabilités : chances du jour pour événements et champions ; sorts : recharge
réelle le Jour des arcanes ; Bestiaire : avec la Carte du voyageur, un clic (ou Entrée) sur un monstre emmène là où il
vit ; temps estimé aussi pour les quêtes d'événements, d'objets rares et de boss ; « Quoi de neuf » montre jusqu'à
8 nouveautés quand les éditions sont courtes ; 19e sorte de quête « Attraper N gobelins dorés » (les gobelins sont
aussi attrapés pendant l'absence, avec leur or). Vérifié : l'ensemble
des ajouts de la nuit ne change pas l'équilibre (3 graines, encore après la Pie),
mémoire et performance stables.
