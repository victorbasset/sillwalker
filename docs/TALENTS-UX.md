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
5. (it. 2098) Branches : jauge des paliers sous le titre (remplissage, repères 5 / 10 / 20 allumés une fois atteints ; au
   survol : « Prochain palier : 10 points dans la branche (encore 3) »). Thèmes sombre et clair vérifiés.
6. (it. 2099) Réinitialisation : un seul clic effaçait tout l'arbre (maîtrises et voie comprises) ; le bouton demande
   maintenant confirmation dans la fiche (« Tout réinitialiser » / « Annuler »), loin de lui.
7. (it. 2100) Revue : badge des talents verrouillés réduit à « 🔒 20 » (paliers sur la jauge, texte complet au survol) : plus de
   nom sur deux lignes en allemand à 1280 px ; 10 langues × 1280 / 1366 / 1920 px, thèmes sombre et clair ; clavier : les
   emplacements invisibles ne prennent pas le focus, les boutons de la fiche (voie, réinitialisation) se tabulent.

## Design visuel (Victor, it. 2104 : « c'est mieux mais le design est toujours pourri »)

8. (it. 2105) Code d'état des lignes : presque toutes avaient le même cadre vert. Seules les lignes cliquables gardent le vert vif
   (avec un trait à gauche) ; au maximum : coche et fond calme ; en cours : barre de rang au pied de la ligne ; maîtrises en cadre
   neutre. Thèmes sombre et clair vérifiés en capture.
9. (it. 2106) Voie disponible et pas encore choisie : ses deux lignes en or, trait à gauche, « choisir › » (avant : gris).
10. (it. 2107) Fiche : la case « À chaque niveau, dépenser tout seul » puis le bouton, sur une ligne ; le bouton se retire quand la
   dépense est automatique (il restait grisé) ; le détail dans un encadré qui remplit la colonne (hauteur alignée sur la grille),
   réinitialisation en pied ; marges resserrées sous 1366 px (fiche d'une maîtrise : 16 px de trop à 1280).
11. (it. 2108) Sous le détail : « Total des talents » (pastilles sobres, effets principaux d'abord, liste complète au survol) ; il
   ne prend que la place restante et masque les pastilles qui ne tiennent pas en entier (jamais de défilement).
12. (it. 2109) Maîtrises : « Choisir un bonus » en contour doré avec un point (avant : trois aplats jaunes), « Bonus » (choix fait)
   en gris discret ; l'aplat revient au survol.
13. (it. 2110) Revue d'ensemble à 1920 et 1280 px : une rangée du total restait coupée à 1920 px (mesure faite avant la fin de
   la mise en page) : refaite à l'image suivante et après le chargement des polices ; autotest « sans pastille coupée ».
   À suivre : la fiche de gauche a un grand vide ; trois pastilles « Choisir un bonus »
   identiques se disputent l'attention.

## Reste à revoir (hors Talents)

- (fait it. 2102) Ascension : fenêtre de confirmation. Reste Compétences (« Confirmer la réinitialisation ») confirment par un second clic
  sur le même bouton, dont le libellé change : même défaut que l'ancienne Voie.
