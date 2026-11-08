# Journal de développement

Itérations autonomes : une amélioration à la fois, la plus récente en haut de « Fait ».
Revue générale toutes les 10 itérations (prochaine : itération 11).

## Fait

- 2026-11-08 (it. 2) : plus de « objet(s) » dans les messages : ventes, objets gardés pendant l'absence,
  équipement automatique, transmutation et nœuds en attente s'accordent au nombre, dans les 10 langues
  (y compris les trois formes du russe et du polonais).
- 2026-11-08 (it. 1, revue générale + correction) : les étiquettes du panneau (bénédiction du jour,
  panoplies, événements, pouvoirs légendaires, losange de panoplie dans le sac et la boutique) sont
  de nouveau lisibles avec le thème clair de Windows (elles étaient jaune pâle sur blanc).

## Idées

Priorité : P1 (bug visible / bon voisin) > P2 (retour, progression) > P3 (confort, contenu).

- P1 Journal d'aventure : les lignes déjà écrites restent dans la langue où elles ont été créées
  (passage du français à l'anglais → mélange). Enregistrer une clé + paramètres, ou traduire à l'affichage.
- P1 Pluriels encore bricolés hors français/anglais : les phrases avec `plS()` ({1} = « s ») sont traduites
  « Talentpunkt(e) », « freie(r) Punkt(e) », « Quest(s) »… (allemand, et sans doute russe, polonais).
  Les passer une à une à `txn()` (points de talent, points libres, quêtes, ascensions, plumes).
- P2 Performance, bande visible : ~31 % d'un cœur (GPU ~20 %), 29 images/s ; mode mini ~6 %.
  Piste : baisser la cadence quand rien ne bouge (marche régulière) ou rendre le décor statique en cache.
- P2 Progression : après la transmutation (~2 h 30 de jeu simulé), les deux derniers déblocages
  arrivent à ~3 h 30 et ~6 h ; ajouter des étapes intermédiaires (déblocages ou succès à récompense).
- P3 Libellé « Prochain déblocage » très petit (≈9 px) dans la carte du héros.
