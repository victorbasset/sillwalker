# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 11).

## Fait

- 2026-11-09 (it. 7) : en revenant après une absence, le résumé liste aussi « À faire maintenant »
  (quêtes à réclamer, objet plus puissant, points à dépenser, déblocage abordable, œufs, expéditions
  finies) ; un clic mène directement au bon onglet. Bulle du mode mini : « 1 monstre » au singulier.
- 2026-11-08 (it. 6) : mode mini, le texte ne passe plus sous les boutons ^ et — en russe, polonais,
  japonais ou portugais : boutons côte à côte en haut, l'or et la zone prennent toute la largeur.
- 2026-11-08 (it. 5) : au tout premier lancement, la bulle de bienvenue (« ton héros avance seul,
  clique ici pour ouvrir le panneau ») passe avant la récompense du jour au lieu d'attendre derrière elle.
- 2026-11-08 (it. 4) : fini les « Talentpunkt(e) », « huevo(s) », « 1 monstres » : points de talent,
  points libres, ascensions, éclats d'étoile, œufs, quêtes, plumes et coffres s'accordent au nombre
  dans les 10 langues. En français, « 2 nouvels objets » devient « 2 nouveaux objets ».
- 2026-11-08 (it. 3) : après un changement de langue, le journal d'aventure n'est plus un mélange
  de deux langues : il repart proprement dans la nouvelle langue.
- 2026-11-08 (it. 2) : plus de « objet(s) » dans les messages : ventes, objets gardés pendant l'absence,
  équipement automatique, transmutation et nœuds en attente s'accordent au nombre, dans les 10 langues
  (y compris les trois formes du russe et du polonais).
- 2026-11-08 (it. 1, revue générale + correction) : les étiquettes du panneau (bénédiction du jour,
  panoplies, événements, pouvoirs légendaires, losange de panoplie dans le sac et la boutique) sont
  de nouveau lisibles avec le thème clair de Windows (elles étaient jaune pâle sur blanc).

## Idées

Priorité : P1 (bug visible / bon voisin) > P2 (retour, progression) > P3 (confort, contenu).

- P3 Anciennes clés « (s) » devenues inutilisées dans keys.js (objet(s)…) : sans effet, à laisser
  (l'ordre des clés ne doit pas bouger).
- P2 Performance, bande visible : ~31 % d'un cœur (GPU ~20 %), 29 images/s ; mode mini ~6 %.
  Le décor est déjà en cache et le rendu ne se fait que sur changement. Sous xvfb, le GPU est émulé
  (rendu logiciel) : chiffres peu représentatifs. À mesurer sous Windows avant d'optimiser.
- P3 Progression : les deux derniers déblocages arrivent à ~3 h 30 et ~6 h (zones 40 et 45). Pas un vrai
  mur (classes libérées, constellations entre-temps), mais un déblocage vers la zone 50+ prolongerait l'objectif.
- P2 Autotest : « zone vide de la bande : clics traversants » échoue parfois (1 fois sur 3, avant tout
  changement de la bande) : vérification sans doute trop rapide sous xvfb ; rendre l'attente plus robuste.
- P3 Résumé d'absence : le texte « plafonnée à 8 h » ignore la constellation qui allonge ce plafond.
- P3 Libellé « Prochain déblocage » très petit (≈9 px) dans la carte du héros.
