// « Quoi de neuf » : après une mise à jour, une bulle discrète annonce les nouveautés (un clic les liste).
// Une seule fois par numéro (S.settings.newsSeen) ; jamais pour une partie neuve (rien à comparer).
// Ajouter une édition : ajouter une liste à la FIN de NEWS_EDITIONS (textes à traduire, i18n-append). NEWS_ID suit.
// Le joueur voit toutes les éditions qu'il n'a pas lues (la plus récente d'abord) : rien ne se perd s'il en a sauté une.
const EDITION_1 = [
  "Nouveau design « gravure pixel » : cadres, palette nuit violine et laiton, rivets dorés.",
  "Arbre des compétences illustré : une icône pour chaque nœud, un dessin unique pour les grands.",
  "Onze chroniques, chacune avec sa cinématique (▶ pour la revoir dans la carte du héros).",
  "Enclume stellaire, deux familiers, l’événement Pluie d’éclats et la capacité Peau de pierre.",
  "Réglages : économie d’énergie, cinématiques ; la bande se cache devant le plein écran (Windows).",
  "Synergies de duo : chaque héros a un partenaire idéal, et ce duo reçoit un petit bonus.",
  "Nouvel événement Nichée (des œufs à chaque victoire) ; nouvelle capacité de boss, la Malédiction, et sa parade : le Talisman de pureté.",
  "Écrans de portable (1366 px) : plus aucun onglet ne défile, les longues listes glissent sur le côté.",
  "Événement Zèle, déblocage Porte-talisman et une 12e chronique : « Le serment maudit ».",
  "Chaque déblocage a sa propre icône ; les capacités des boss ont leur son.",
  "Familier Phalène pâle ; un boss annonce ses capacités en arrivant ; un coup de pouce si sa Malédiction te bloque.",
  "Atelier : Bibliothèque (expérience) ; constellation L’Éclair (vitesse d’attaque) ; quête « Frapper au clic ».",
];
const EDITION_2 = [
  "Aventure : « À faire », « Chroniques », statistiques et chances de butin s’ouvrent dans une grande fenêtre.",
  "Nouvelle quête « Porter des coups critiques » et nouveau succès « Lame affûtée ».",
  "Nouvelle capacité de boss : Tenace, il se relève une fois avec 25 % de ses PV.",
];
const EDITION_3 = [
  "Son : les pièces tintent en gamme, les coups varient, chaque événement et l’étoile filante ont leur son.",
  "Ambiance sonore des zones (bulles, braises, vent, oiseaux, grillons…) et musique qui évolue au fil des passages.",
  "Nouvel événement Voile protecteur (dégâts subis divisés par deux) ; voies propres aux dix héros ajoutés.",
  "Réglages : informations de la bande au milieu sur tout écran ; ambiance des zones.",
];
const EDITION_4 = [
  "Chaque pièce qui rentre dans la bourse tinte ; équiper, vendre, acheter et placer un point ont leur son.",
  "Musique plus intense pendant les combats de boss ; silence quand la bande est cachée (plein écran, icône seule).",
  "Réglages > Son : volumes de la musique et de l’ambiance, « Écouter » joue un échantillon ; touche C : couper le son.",
  "Ascension : le tri du marchand repart décoché ; rachat des potions et réclamation des quêtes restent cochés.",
];
const EDITION_5 = [
  "Sorts : trois par héros (Héros > Sorts et attaque), lancés tout seuls en combat avec leur animation, leur son et leur icône.",
  "Certains sorts transpercent : une part des dégâts frappe le monstre suivant dès son arrivée.",
  "Le bouclier se voit sur la barre de vie ; le compagnon a sa ligne dans la carte du héros.",
  "Déblocage Carte du ciel : les éclats d’étoile se placent tout seuls dans les constellations.",
];
const EDITION_6 = [
  "Sorts : la recharge raccourcit de 10 % tous les 10 rangs ; un nouveau sort est fêté dans la bande.",
  "Le trait perçant file jusqu’au monstre suivant et le frappe sous tes yeux.",
  "Les sorts appris s’affichent sur la carte du héros ; « À faire maintenant » signale un sort à apprendre.",
  "Les icônes des onglets restent visibles sur les petits écrans ; nouveau succès « Grimoire complet ».",
];
const EDITION_7 = [
  "Ton compagnon lance aussi les sorts appris pour sa classe, à moitié de leur puissance.",
  "Nouvel événement rare « Marée arcanique » : les sorts se rechargent deux fois plus vite.",
  "Nouvelle quête : lancer des sorts ; chaque carte de héros montre ses trois sorts.",
  "Le trait perçant a son son ; un bandeau annonce chaque palier de recharge.",
];
const EDITION_8 = [
  "Nouvelle musique, douce et posée (lofi) : un air toutes les 5 zones, avec la couleur de chaque décor.",
  "Piano électrique, rythme feutré, léger craquement de vinyle ; le volume se règle dans Réglages > Son.",
];
const EDITION_9 = [
  "Ascension : les ventes automatiques cochées le restent.",
  "Réglages > Son : ◀ ▶ pour écouter l’air des autres zones (45 s).",
  "Musique : les déserts ont leur couleur orientale ; chaque décor garde la sienne dans toutes les langues.",
];
const EDITION_10 = [
  "Chaque héros a des sorts uniques : étourdir, empoisonner, voler la vie, achever les blessés, se relancer…",
  "Les sorts perçants frappent tout de suite les monstres qui attendent, et un de plus tous les 10 rangs.",
  "Les effets se voient en combat ; touche B ou menu de l’icône : couper la musique seule.",
];
const EDITION_11 = [
  "Les sorts du compagnon s’apprennent depuis ton héros (« + ») et le Grimoire les améliore aussi.",
  "Le perçage atteint aussi le boss au bout de la file (un quart de sa vie au plus).",
  "Chaque icône de sort porte le badge de son effet ; les infobulles décrivent les effets.",
];
const EDITION_12 = [
  "Trois boss majeurs gardent le Rebord, en zones 50, 100 et 150 : chacun porte une relique.",
  "Quatre reliques très puissantes à gagner pour toujours (le Briseur garde la dernière), chacune avec son histoire.",
  "Les reliques sur la carte et sur ton héros : le Drone stellaire tire ses missiles à tes côtés.",
];
const EDITION_13 = [
  "Combat de boss : ta barre de vie et celle du boss sont sous vos pieds, bien visibles.",
  "Deux succès : « Première relique » et « Les quatre reliques ».",
  "Équilibrage : Barde +20 % d’or et d’expérience (au lieu de +25 %) ; Gardien des étoiles un peu moins robuste.",
];
const EDITION_14 = [
  "Reliques : chaque nouvelle victoire contre leur gardien les renforce (niveau 5 au plus, +10 % d’effet par niveau).",
  "Les reliques gagnées s’affichent en tête des pastilles de ton héros ; le prochain boss majeur est annoncé dans la zone.",
  "La bande consomme moins : contours et halos dessinés une fois pour toutes.",
];
const EDITION_15 = [
  "Reliques : un niveau par course au plus ; tant qu’elle peut monter, la relique flotte (plus pâle) à côté de son gardien.",
  "Nouveau succès : « Relique parfaite (niveau 5) ».",
  "« Depuis ta dernière visite » compte aussi les niveaux de relique gagnés.",
];
const EDITION_16 = [
  "Le Cœur de l’aube montre ses soins (en vert) ; avec la Lame du crépuscule, les coups critiques deviennent violets.",
  "Touche U : acheter le prochain déblocage dès qu’il est prêt.",
  "Équilibrage : le Samouraï perd son bonus de +5 % de coups critiques (son Iaijutsu ne change pas).",
];
const EDITION_17 = [
  "Au-delà du Rebord : les échos des trois lieutenants attendent en zones 250, 300 et 350 ; chacun renforce aussi sa relique.",
  "Les Chroniques racontent l’histoire de tes reliques ; ▶ pour revoir leur scène.",
];
const EDITION_18 = [
  "Les échos des lieutenants ont une capacité à eux : Silence (plus aucun sort pendant 4 s).",
  "Le Cœur de l’aube soigne aussi entre les combats.",
  "Correction : les missiles du Drone stellaire sont retenus par la carapace et la peau de pierre des boss, comme tes coups.",
];
const EDITION_19 = [
  "La Prêtresse frappe un peu plus fort.",
  "Traductions : noms d’objets et titres des boss accordés au genre (russe, polonais, allemand, espagnol, portugais) ; ponctuation japonaise et chinoise dans le journal.",
];
const EDITION_20 = [
  "Les échos des lieutenants (zones 250, 300, 350) se reconnaissent à leur contour spectral bleu pâle.",
  "Traductions : l’étiquette des champions suit l’ordre de chaque langue ; virgules japonaises et chinoises partout.",
];
const EDITION_21 = [
  "Nouveau déblocage au-delà du Rebord (zone 230) : le « Forgeron des astres » remonte tout seul ton équipement au niveau de ton record, avec l’or en trop.",
];
const EDITION_22 = [
  "Familiers : le bouton pour récupérer une expédition et les boutons d’envoi tiennent dans la carte (plus de défilement).",
  "Les feux follets des pétales de compétences complets passent derrière ton héros, puis reviennent devant.",
];
const EDITION_23 = [
  "Nouveau déblocage au-delà du Rebord (zone 260) : l’« Herboriste perpétuel » rachète tout seul tes élixirs et parchemins quand leur effet s’achève.",
];
const EDITION_24 = [
  "Nouveau déblocage au-delà du Rebord (zone 300) : le « Marchand attitré » achète et équipe tout seul l’objet du marchand qui renforce le plus ton héros.",
  "Correction : le prochain déblocage proposé suit de nouveau l’ordre des zones.",
];
const EDITION_25 = [
  "Les cases des automatismes achetés (valet, creuset, forge, marchand…) sont regroupées sous le sac, dans « Automatismes (actifs / total) » : un clic les ouvre.",
];
const EDITION_26 = [
  "Les onglets du panneau sont préparés d’avance : ils s’ouvrent vite dès le premier clic.",
  "Son coupé : le moteur audio se met en pause et économise du processeur.",
];
const EDITION_27 = [
  "Sous Windows, le panneau et les onglets s’ouvrent sans blocage dès la première fois (police du texte allégée).",
];
const EDITION_28 = [
  "Onglets du panneau au clavier : flèches gauche et droite, Début et Fin.",
  "Le panneau s’ouvre sans attendre : son contenu se met à jour juste après.",
];
const EDITION_29 = [
  "Deux nouveaux succès au-delà du Rebord : « Écho dissipé » et « Les trois échos ».",
];
const EDITION_30 = [
  "Nouveau bouton « Ton avis » en haut du panneau : une idée, un bug ? Dis-le sur la page du jeu.",
];
const EDITION_31 = [
  "Les cinématiques de l’histoire ne se perdent plus pendant les combats chargés (elles pouvaient bloquer les suivantes).",
];
const EDITION_32 = [
  "Fais glisser le bouton ⌃ de la bande vers un autre écran, ou vers le haut ou le bas ; le mode mini se pose où tu veux.",
  "Glisse un objet du sac sur la ligne d’équipement qui s’illumine pour l’équiper (ou un objet porté vers le sac pour le retirer).",
  "Les onglets pas encore débloqués sont visibles, grisés : leur infobulle dit à quelle zone ils s’ouvrent.",
  "Bande à 100 % d’opacité : elle arrête les clics et s’attrape n’importe où pour la déplacer.",
];
const EDITION_33 = [
  "Pendant ton absence, l’Herboriste perpétuel, le Marchand attitré et le Grimoire des sorts continuent leur travail.",
  "La Carte du Rebord, l’arbre de Compétences et les Talents se jouent au clavier (Maj + Entrée : un talent au maximum).",
  "« À faire maintenant » rappelle les éclats d’étoile à placer dans les constellations.",
  "Bande plus lisible (nombres flottants sans chevauchement, nom du boss dégagé) et textes corrigés dans les 10 langues.",
];
const EDITION_34 = [
  "Nouveaux défis : le « Crachat venimeux » de certains boss (le « Talisman de pureté » le repousse) et l’élite « Épineux », qui renvoie une part des coups reçus.",
  "Nouvel événement rare, la « Lune de sang » : pendant 30 s, chaque monstre est une élite (butin garanti).",
  "Pendant ton absence, les élites, la chasse, le butin rare et les coups critiques font aussi avancer les quêtes.",
  "Le « Grand intendant » s’occupe des familiers même pendant un long combat de boss ; « À faire maintenant » signale les familiers libres ; thème clair plus lisible.",
];
const EDITION_35 = [
  "Nouvelle bénédiction du jour, le « Jour des trésors » (coffres ×3), et une nouvelle quête : trouver des coffres au trésor.",
  "À la fin d’un événement rare, le « Journal » en fait le bilan ; le « Mode mini » affiche l’événement en cours et ses secondes.",
  "« Lune de sang » : toute la file devient élite, avec contour et étiquette ; les « Probabilités » donnent aussi le taux du jour.",
  "La carte du héros montre l’effet de la bénédiction du jour ; le résumé de retour compte aussi coffres et événements.",
];
const EDITION_36 = [
  "Nouvel événement rare, la « Nuée d’étoiles » : pendant 30 s, les étoiles filantes se suivent. Clique-les, ou touche F panneau ouvert.",
  "« Équipement » : un emplacement vide en pointillés verts mène d’un clic au meilleur objet du sac pour lui.",
  "« À faire maintenant » ne liste plus ce que tes automatismes font seuls (œufs, expéditions, quêtes réclamées automatiquement).",
];
const EDITION_37 = [
  "Le ciel change avec les événements : rouge sous la « Lune de sang », constellé pendant la « Nuée d’étoiles » (bande et mode mini).",
  "« Bestiaire » : nouveau sous-onglet « Événements rares », ceux déjà vus et ceux qui restent à découvrir.",
  "« Statistiques » : un clic sur « Événements rares » y mène directement.",
];
const EDITION_38 = [
  "Les quêtes et le « Prochain déblocage » donnent le temps restant estimé (« ≈ 1 h 10 min ») ; la bulle de la bénédiction annonce celle de demain.",
  "« Événements rares » : chaque événement vécu donne +1 % d’or pour toujours ; une nouvelle découverte est annoncée dans le journal.",
  "Nouvelle élite « Fuyant » : elle esquive 20 % des coups (les coups au clic touchent toujours).",
];
const EDITION_39 = [
  "Nouvelle bénédiction du jour, « Jour des prodiges » : les événements rares deux fois plus fréquents.",
  "Chaque sorte d’élite vaincue est retenue (✓ dans le Bestiaire) ; les vaincre toutes donne le succès « Tueur d’élites ».",
  "Le héros réagit à certains événements rares (« Il pleut de l’or ! ») ; l’événement en cours est encadré dans le Bestiaire.",
];
const EDITION_40 = [
  "Nouvelle sorte de quête, la proie : vaincre une sorte d’élite précise (elle avance aussi pendant l’absence).",
  "Dans la bande, une élite d’une sorte jamais vaincue porte « ✦ » : elle compte pour ta collection.",
  "Réglages > « Taille du panneau » : à 115 % ou 130 %, le panneau grandit d’autant au lieu de défiler.",
];
const EDITION_41 = [
  "Nouvel événement rare, « Ruée des gobelins » : pendant 30 s, un monstre sur trois devient un gobelin doré.",
  "Le Bestiaire compte tes victoires sur chaque sorte d’élite ; le héros salue chaque sorte vaincue pour la première fois.",
  "Journal plus léger : un nouveau type pour la collection s’annonce sur la ligne du butin.",
];
const EDITION_42 = [
  "Nouvelle capacité de boss, « Écailles » : les coups critiques ne lui infligent que la moitié de leur bonus.",
  "Les boss aux noms féminins sont enfin accordés : « Carapace-des-Abysses l’Éveillée », « … vaincue ! ».",
];
const EDITION_43 = [
  "Au retour, le bilan compte l’or des expéditions du Grand intendant et les quêtes accomplies pendant l’absence.",
  "Les quêtes d’élites et de proie donnent aussi leur temps restant estimé.",
  "La bande consomme moins de processeur (halos du héros dessinés autrement), surtout en fin de partie.",
];
const EDITION_44 = [
  "Chaque sorte d’élite vaincue donne maintenant +1 % de chances de butin pour toujours (Bestiaire > Élites).",
  "Le héros a une réplique pour chacun des 14 événements rares.",
];
const EDITION_45 = [
  "L’étal du marchand propose des objets déjà forgés au niveau de ton équipement : il redevient utile en fin de partie.",
  "La récompense en or d’une quête suit ta progression depuis qu’elle a été tirée.",
  "En fin de partie, la bande est plus lisible et plus légère (moins de nombres et d’effets à la fois).",
];
const EDITION_46 = [
  "Panoplies : le sac garde les pièces des panoplies jamais complétées, et un clic sur « À faire » équipe d’un coup celles qui en complètent une (bonus permanent). Bestiaire > Panoplies montre les pièces du sac.",
  "La carte Zone distingue la zone atteinte pendant cette course et ton record.",
  "Grands nombres plus lisibles (séparateur des milliers) dans l’onglet Ascension.",
];
const EDITION_47 = [
  "Panoplies : compléter une panoplie ne te laisse plus affaibli (l’équipement d’avant, plus fort, est remis ; le bonus reste), et Bestiaire > Panoplies propose de la compléter d’un clic.",
  "Carnet de route en colonnes ; carte Zone plus courte (boss épuisé, relique du boss de la zone).",
  "Plus de rappel « points de compétence » une fois l’arbre entièrement appris.",
];
const EDITION_48 = [
  "Les boss et les monstres sombres ont un contour discret : on les voit mieux dans les décors de nuit.",
  "« Vendre ce qui ne m’améliore pas » dit au survol combien de pièces de panoplie il garde.",
  "Les astuces s’affichent en entier (sur plusieurs lignes), dans toutes les langues.",
];
const EDITION_49 = [
  "Ton héros a de nouvelles répliques : panoplie complète, ascension, héros libéré, œuf trouvé.",
];
const EDITION_50 = [
  "Mode mini : les grands moments (panoplie, ascension…) tiennent en entier dans la petite fenêtre.",
  "Panneau mieux disposé sur les écrans de 1500 à 1800 px de large, et avec la taille de l’interface à 115 ou 130 %.",
];
const EDITION_51 = [
  "En fin de partie, la bande consomme environ un tiers de processeur en moins pendant les combats (effets des sorts, lame et projectiles allégés).",
  "Le Bestiaire s’affiche plus vite, et un monstre au dernier palier est dit complet dans toutes les langues.",
];
const EDITION_52 = [
  "Grand graphe de compétences autour de la fleur, une fois la fleur complète : 618 nœuds, trois voies à choisir par pétale (une seule suivie), des synergies (« plus tu as de PV, plus tu frappes fort », « plus tu es riche… »).",
  "Des personnages sur la route : Mirette, la grenouille marchande, tient la Boutique ; Orbo, l’astronome à la fusée, l’Ascension. Chacun a sa scène de rencontre.",
  "Boutique sans défilement : le Marchand, les potions et les coffres tiennent à l’écran ; « Renouveler l’étal » est à côté des objets.",
  "Les nombres de dégâts restent au-dessus du monstre touché ; les chroniques sont numérotées dans l’ordre de l’histoire.",
  "Talents : un clic monte un talent au maximum ; les maîtrises gagnent des paliers (critique, bouclier, butin…).",
];
const EDITION_53 = [
  "Chaque onglet a maintenant son personnage, rencontré sur la route : Corvin (Talents), Plume (Quêtes), Bram (Héros), Sola (Carte), Fenouil (Bestiaire), Maman Brindille (Familiers), Iris (Compétences) et Tico (Statistiques). Clique-les pour les entendre.",
  "« Vendre ce qui ne m’améliore pas » vend tout ce qui n’est pas une amélioration, légendaires et pièces de panoplie compris.",
  "Plus de scène perdue : quand plusieurs rencontres arrivent ensemble, elles attendent leur tour.",
];
const EDITION_54 = [
  "Maîtrises : à chaque palier, deux bonus au choix (« choisir » dans le détail d’une maîtrise).",
  "Grand graphe : son ouverture est annoncée, la pastille des Compétences compte ses points, et « Réinitialiser le grand graphe » permet de changer de voie sans perdre la fleur.",
  "Les bulles du grand graphe montrent ce que chaque nœud donne vraiment.",
];
const EDITION_55 = [
  "Grand graphe : chaque synergie montre ce qu’elle donne en ce moment (« Bonus actifs », et dans la bulle d’un nœud pas encore pris).",
  "Avant de choisir une voie, la bulle de ses nœuds montre ce que donne la voie entière : les trois voies d’une région se comparent.",
  "Grand graphe rempli : chaque point de compétence en surplus donne +0,1 % d’attaque et de PV.",
];
const EDITION_56 = [
  "Maîtrises : chaque palier à choix franchi est annoncé (une seule fois) ; un clic ouvre la maîtrise pour choisir son bonus.",
  "Les bonus choisis aux paliers des maîtrises sont désormais gardés à l’ascension (ils revenaient à l’option par défaut à chaque course).",
  "Grand graphe rempli : son achèvement est annoncé, avec ce que donnent désormais les points en plus.",
];
const EDITION_57 = [
  "« Toutes les statistiques » montre d’où vient la puissance du héros : ce que multiplient l’équipement, les compétences, les talents, les constellations, le grand graphe…",
  "Maîtrises : un palier atteint dans une course précédente se règle d’avance (⏳), sans attendre de l’atteindre à nouveau.",
  "Taille de l’interface à 130 % : les bulles des objets et des nœuds de compétence restent près de ce qu’on survole et dans le panneau.",
];
const EDITION_58 = [
  "Deux nouveaux succès autour de la fleur : « Au-delà de la fleur » et « Le grand graphe accompli ».",
  "Moins de clics : les fenêtres des paliers de maîtrise et de « À faire » restent ouvertes d’une action à l’autre.",
];
const EDITION_59 = [
  "Grand graphe : « Dépenser automatiquement » prend dans chaque région la voie la plus puissante, et la bulle de cette voie le signale.",
  "Ton héros réagit aux paliers de maîtrise et au grand graphe, de son ouverture à son achèvement.",
];
const EDITION_60 = [
  "Un héros à distance (mage, archer…) laisse maintenant son compagnon au corps à corps marcher devant lui, sur la bande comme en mode mini.",
  "Rencontre d’un personnage : les monstres s’effacent le temps de la scène, sans butin ni réplique du héros par-dessus.",
];
const EDITION_61 = [
  "Nouvelle bénédiction du jour : le Jour des ombres (+15 % d’esquive, +20 % de riposte).",
  "Ton héros salue chaque bénédiction du jour quand elle commence, et Statistiques compte celles que tu as déjà vécues (x / 10).",
  "Résumé d’absence : il indique combien d’objets sont restés au sol quand le sac était plein.",
];
const EDITION_62 = [
  "Collection des bénédictions : chaque bénédiction du jour déjà vécue donne +1 % d’expérience pour toujours, à suivre dans Bestiaire > Bénédictions du jour.",
];
const EDITION_63 = [
  "Nouveau succès « Dix jours bénis » : vivre les dix bénédictions du jour.",
  "Mode mini : la bulle de survol donne aussi la bénédiction du jour.",
];
// (it. 1243)
const EDITION_64 = [
  "Nouvel événement rare, la Lune pâle : pendant 30 s, chaque monstre arrive avec la moitié de sa vie, boss compris.",
  "Journal : la première bénédiction du jour vécue de chaque sorte annonce son bonus pour toujours.",
  "La bénédiction du jour qui change à minuit s’applique aussitôt, sans attendre.",
];
// (it. 1255)
const EDITION_65 = [
  "Nouvelle élite, le Régénérant : il regagne 3 % de sa vie chaque seconde (un +N vert le montre) ; frappe fort et vite.",
  "La Lune pâle a son ciel (voile délavé et lune blanche) et son bilan compte les boss vaincus.",
  "Thème clair : la bordure des événements en cours se voit mieux.",
];
// (it. 1264)
const EDITION_66 = [
  "Nouvelle quête : vaincre un champion (coffre épique, parfois un œuf). Elle avance aussi pendant ton absence, avec un temps estimé.",
  "Le Régénérant ne se soigne plus tant qu’il brûle ou qu’il est empoisonné.",
];
export const NEWS_EDITIONS = [EDITION_1, EDITION_2, EDITION_3, EDITION_4, EDITION_5, EDITION_6, EDITION_7, EDITION_8, EDITION_9, EDITION_10, EDITION_11, EDITION_12, EDITION_13, EDITION_14, EDITION_15, EDITION_16, EDITION_17, EDITION_18, EDITION_19, EDITION_20, EDITION_21, EDITION_22, EDITION_23, EDITION_24, EDITION_25, EDITION_26, EDITION_27, EDITION_28, EDITION_29, EDITION_30, EDITION_31, EDITION_32, EDITION_33, EDITION_34, EDITION_35, EDITION_36, EDITION_37, EDITION_38, EDITION_39, EDITION_40, EDITION_41, EDITION_42, EDITION_43, EDITION_44, EDITION_45, EDITION_46, EDITION_47, EDITION_48, EDITION_49, EDITION_50, EDITION_51, EDITION_52, EDITION_53, EDITION_54, EDITION_55, EDITION_56, EDITION_57, EDITION_58, EDITION_59, EDITION_60, EDITION_61, EDITION_62, EDITION_63, EDITION_64, EDITION_65, EDITION_66];
export const NEWS_ID = NEWS_EDITIONS.length;
/** Nouveautés des éditions après `seen` (0 : toutes), la plus récente d'abord. */
export const newsItems = (seen = 0) => NEWS_EDITIONS.slice(Math.max(0, seen)).reverse().flat();
/** Au plus NEWS_MAX_EDITIONS éditions affichées (la fenêtre ne doit jamais défiler, même après une longue absence) :
 *  { items, older } — older = nombre de nouveautés plus anciennes non montrées. */
export const NEWS_MAX_EDITIONS = 3;
export function newsShown(seen = 0) {
  const eds = NEWS_EDITIONS.slice(Math.max(0, seen)).reverse();
  return { items: eds.slice(0, NEWS_MAX_EDITIONS).flat(), older: eds.slice(NEWS_MAX_EDITIONS).flat().length };
}

/** Nouveautés à annoncer ? (pas pour une partie neuve : l'intro passe avant tout) */
export const newsDue = (S) => (S.settings.newsSeen || 0) < NEWS_ID && !!(S.story && S.story.intro) && (S.stats.kills || 0) > 0;
export const markNews = (S) => { S.settings.newsSeen = NEWS_ID; };

/** (it. 1144, demande de Victor) Notes de VERSION distribuée (itch.io) : une liste choisie des nouveautés majeures
 *  depuis la version précédente (pas les petites retouches). `after` = dernière édition parue avec la version
 *  précédente (0.1.2 : édition 32). Un joueur qui n'a rien lu depuis voit, au lancement, la fenêtre de la version au
 *  lieu des éditions (elles seraient trop nombreuses : 26 entre 0.1.2 et 0.1.3). Ajouter une version : à la FIN. */
const RELEASE_013 = [
  "Un grand graphe de compétences s’ouvre autour de la fleur une fois celle-ci complète : 618 nœuds, trois voies au choix par pétale et des synergies (plus tu as de points de vie, plus tu frappes fort…).",
  "Des personnages sur la route : chaque onglet a son habitant (Mirette, la grenouille marchande, Orbo, l’astronome à la fusée…), avec sa scène de rencontre.",
  "Talents : un clic monte un talent au maximum ; les maîtrises gagnent des paliers, avec deux bonus au choix à chacun.",
  "Nouveaux événements rares (Lune de sang, Nuée d’étoiles, Ruée des gobelins), nouvelles élites (Épineux, Fuyant) et nouvelles capacités de boss (Crachat venimeux, Écailles).",
  "Collection : chaque événement rare vécu et chaque sorte d’élite vaincue donnent un bonus permanent (or, butin), à suivre dans le Bestiaire.",
  "Nouvelles bénédictions du jour (Jour des trésors, Jour des prodiges) et nouvelles quêtes (coffres, proie à abattre).",
  "Panoplies : un clic complète une panoplie sans t’affaiblir ; vendre ce qui ne t’améliore pas vend tout le reste, légendaires compris.",
  "Boutique sans défilement, et un étal du marchand utile jusqu’en fin de partie.",
  "Le détail des statistiques montre d’où vient la puissance du héros ; quêtes et prochain déblocage donnent leur temps restant estimé.",
  "En fin de partie, la bande consomme environ un tiers de processeur en moins ; le panneau peut grandir à 115 % ou 130 % (Réglages).",
];
// 0.1.3 distribuée avec l'édition 58 (NEWS_ID) : la version suivante prendra after: 58.
export const NEWS_RELEASES = [{ version: "0.1.3", after: 32, items: RELEASE_013 }];
/** Notes de version à montrer à un joueur qui a lu jusqu'à l'édition `seen` (la plus récente qu'il n'a pas vue), ou null. */
export function releaseFor(seen = 0) {
  const r = NEWS_RELEASES.filter((x) => seen <= x.after && NEWS_ID > x.after);
  return r.length ? r[r.length - 1] : null;
}
