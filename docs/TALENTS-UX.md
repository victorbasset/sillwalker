# Onglet Talents : refonte de l'ergonomie (nuit du 17 au 18/11, demande de Victor)

> « tu vas me refaire la partie talent niveau UX UI, je veux un truc digne d'un expert en ergonomie, prends ton temps sur
> plusieurs itérations [...] les double clics sur des éléments qui changent à gauche, c'est plus possible »

## Audit (it. 2094)

1. **La fiche de gauche suit le survol, instantanément.** Pour cliquer dans la fiche (choix des bonus d'une maîtrise,
   « choisir · N »), la souris traverse d'autres talents : la fiche change en route, l'élément visé disparaît. C'est
   la plainte principale.
2. **La Voie demande deux clics au même endroit**, et le texte du bouton change entre les deux (« cliquer encore pour
   confirmer ») : on ne sait plus si le premier clic a compté.
3. **Des pastilles apparaissent et disparaissent** (« +1 », « tout », « Choisir un bonus », « Bonus ») selon les points
   libres : la ligne se recompose, le texte bouge sous le curseur entre deux clics.
4. **Un clic dépense des points sans retour** (au maximum possible) : pas d'aperçu de ce qu'un clic va faire, pas
   d'annulation.
5. **Lisibilité** : les paliers d'une branche (5 / 10 / 20 points) ne se voient qu'au cadenas ; rien n'indique combien
   de points manquent pour l'ultime ; la fiche de gauche mélange l'automatisation, le détail et la réinitialisation.

## Principes

- Rien ne bouge sous le curseur : emplacements réservés, tailles fixes, aucun élément qui naît ou meurt pendant qu'on
  clique.
- Le survol informe, le clic agit ; la fiche ne change que sur une vraie intention (pause du curseur) ou un clic.
- Une action irréversible se confirme ailleurs qu'à l'endroit du premier clic, avec un libellé explicite.
- Ce qu'un clic va faire se lit avant le clic (« +5 rangs »).

## Étapes

1. (it. 2094) Intention de survol : la fiche ne suit un talent qu'après 140 ms de pause dessus ; un clic la fixe.
2. (it. 2095) Pastilles à emplacement réservé : « +1 » (talent ouvert, pas au maximum), « tout » et « Choisir un bonus » /
   « Bonus » (libellés superposés, largeur du plus long) restent en place, invisibles et sans action hors d'usage ; le prochain
   palier d'une maîtrise (« → 800 ») dépend de la largeur du panneau (caché sous 1600 px), plus des points libres.
   Reste vu : en allemand à 1280 px, deux ultimes verrouillés passent sur deux lignes (cadenas + « 20 Pkt. ») : étape 6.
3. (it. 2096) Voie : un clic sur la ligne la montre dans la fiche, le bouton « Choisir cette voie (définitive) » la choisit
   (avertissement complet en info-bulle ; la ligne « demande 30 points » s'efface quand la voie est accessible). Plus de
   « cliquer encore pour confirmer ». À revoir ensuite : Ascension et Compétences confirment encore par un second clic au même
   endroit (bouton qui change de libellé).
4. (it. 2097) Aperçu du clic : « Au clic : +8 rangs → +30 % attaque » (au maximum possible ; une maîtrise : +1 rang) ;
   sans point ou au maximum : « Rang suivant », pour information.
5. Branches : jauge des paliers (5 / 10 / 20) dans l'en-tête de chaque branche.
6. Revue : 10 langues, 1280 / 1366 / 1920 px, thème clair, clavier.
