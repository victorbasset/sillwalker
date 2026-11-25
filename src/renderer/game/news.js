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
// (it. 1272)
const EDITION_67 = [
  "Nouvelle bénédiction du jour, le Jour des champions : quatre fois plus de champions.",
  "Nouveau succès : Fléau des champions (25 champions vaincus).",
];
// (it. 1284)
const EDITION_68 = [
  "Nouveau familier, la Grenouillette : ses coassements attirent les élites (+2 % par niveau).",
  "Le héros salue chaque champion vaincu, et le résumé d’absence compte les champions tombés.",
];
// (it. 1294)
const EDITION_69 = [
  "Nouvelle bénédiction du jour, le Jour des géants : +50 % de dégâts contre les boss.",
  "Un champion vaincu a sa petite fanfare.",
  "Le succès des bénédictions s’appelle désormais « Toutes les bénédictions du jour ».",
];
// (it. 1305)
const EDITION_70 = [
  "Nouvel événement rare, l’Écho des lames : pendant 30 s, chaque coup frappe deux fois.",
  "Bestiaire > Bénédictions du jour : la bénédiction d’aujourd’hui et celle de demain sont marquées, même celle de demain jamais vécue.",
];
// (it. 1310)
const EDITION_71 = [
  "Nouvelle élite, le Venimeux : ses coups peuvent empoisonner le héros quelques secondes (sans jamais l’achever ; la pureté raccourcit le poison).",
];
// (it. 1315)
const EDITION_72 = [
  "Nouvelle bénédiction du jour, le Jour de l’élan : +100 % de dégâts du premier coup et des coups au clic.",
];
// (it. 1329)
const EDITION_73 = [
  "La Rafale de vent double maintenant vraiment ta vitesse de déplacement, même quand elle est déjà très haute.",
  "La Fête des gobelins annonce aussi son bonus de +15 % d’or.",
];
// (it. 1336)
const EDITION_74 = [
  "Nouveau à la boutique : l’Encens de chasse attire deux fois plus d’élites pendant 10 min. Plus de risque, plus de butin ; l’Herboriste perpétuel ne le rachète jamais à ta place.",
];
// (it. 1342)
const EDITION_75 = [
  "La bande montre tes élixirs, parchemins et encens actifs : une petite icône chacun, juste devant ton or.",
];
// (it. 1350)
const EDITION_76 = [
  "Pendant ton absence, les parchemins de fortune et de savoir comptent enfin (ils ne donnaient presque rien), tout comme la potion de célérité, le trèfle à quatre feuilles et l’encens de chasse.",
  "« Dépenser automatiquement » dans le grand graphe ne fige plus le jeu en fin de partie.",
];
// (it. 1363)
const EDITION_77 = [
  "Nouveau familier : le Lucane, dont les mandibules visent les points faibles des boss (+3 % de dégâts contre eux par niveau).",
  "Les quêtes, les ascensions et plusieurs messages accordent enfin leurs nombres dans toutes les langues, au singulier comme dans les pluriels russes et polonais.",
];
// (it. 1368)
const EDITION_78 = [
  "Familiers > À découvrir : chaque familier encore inconnu garde son nom secret, mais montre son bonus au niveau 1 et s’il est rare.",
];
// (it. 1375)
const EDITION_79 = [
  "Nouvel événement rare, la Source de vie : pendant 30 secondes, ton héros regagne 4 % de ses PV max chaque seconde. De quoi tenir face à un boss coriace.",
];
// (it. 1378)
const EDITION_80 = [
  "Nouvelle bénédiction du jour, le Jour du sang : +5 % de vol de vie et +25 % de dégâts critiques.",
];
// (it. 1382)
const EDITION_81 = [
  "Nouvelle élite, l’Explosif : en mourant, il inflige à ton héros 6 % de ses PV max (sans jamais l’achever). Mieux vaut ne pas finir le combat à bout de souffle.",
];
// (it. 1395)
const EDITION_82 = [
  "Nouveau succès, Démineur : vaincre 25 élites explosives.",
];
// (it. 1400)
const EDITION_83 = [
  "Les bilans des événements rares en disent plus : la vie rendue par la Source de vie, l’expérience du Souffle de sagesse, les œufs de la Nichée.",
  "Pendant ton absence, les élites vaincues comptent aussi pour leur sorte (Bestiaire, succès Démineur).",
];
// (it. 1406)
const EDITION_84 = [
  "Nouvelle sorte de quête : gagner des niveaux. Elle avance toute seule, même pendant ton absence.",
];
// (it. 1412)
const EDITION_85 = [
  "Nouvelle bénédiction du jour, le Jour des arcanes : les sorts se rechargent 50 % plus vite.",
];
// (it. 1426)
const EDITION_86 = [
  "Quêtes : une chasse dont le monstre ne vit pas dans ta zone dit où le trouver ; avec la Carte du voyageur, un clic t’y emmène. Les quêtes de sorts, de coups critiques, de coffres et d’expéditions affichent aussi un temps estimé.",
];
// (it. 1427)
const EDITION_87 = [
  "Nouveau familier, la Pie : elle repère les coffres au trésor (+6 % de coffres trouvés par niveau).",
];
// (it. 1430)
const EDITION_88 = [
  "Nouveau succès : Pilleur de coffres (50 coffres au trésor trouvés).",
];
// (it. 1437)
const EDITION_89 = [
  "Bestiaire : avec la Carte du voyageur, un clic sur un monstre t’emmène dans la zone la plus proche où il vit, pour monter ses paliers.",
];
// (it. 1439)
const EDITION_90 = [
  "Nouvel événement rare, le Trésor enfoui : pendant 30 secondes, chaque victoire peut laisser un coffre au trésor.",
];
// (it. 1450)
const EDITION_91 = [
  "Quêtes : celles d’événements rares, d’objets rares et de boss affichent aussi un temps estimé (pas de temps quand ton héros bute sur un boss).",
];
// (it. 1452)
const EDITION_92 = [
  "Nouvelle sorte de quête : attraper des gobelins dorés. Pendant ton absence, ton héros en attrape aussi (avec leur or) s’il est assez rapide.",
];
// (it. 1458)
const EDITION_93 = [
  "Sur la bande, un petit ◆ marque les monstres visés par une quête de chasse en cours.",
];
// (it. 1466)
const EDITION_94 = [
  "Héros bloqué : les pistes pour avancer restent affichées dans la carte de la zone et dans la bulle du mode mini, et une nouvelle piste propose de forger ton équipement quand ton or le permet.",
];
// (it. 1473)
const EDITION_95 = [
  "Quêtes : une quête bloquée le dit sur sa carte (gobelins trop rapides pour ton héros, avancée automatique coupée : un clic la reprend), et celle des coups au clic rappelle comment frapper.",
];
// (it. 1488) regroupe les it. 1477-1485
const EDITION_96 = [
  "Nouveau familier, le Grillon : son chant attire les prodiges (+5 % d’événements rares par niveau).",
  "Sur la bande, le ◆ des quêtes de chasse marque aussi les élites et champions du type chassé.",
  "Statistiques : la ligne des gobelins dorés prévient (⚠) quand ton héros est trop lent pour les attraper.",
];
// (it. 1495) regroupe les it. 1490-1495
const EDITION_97 = [
  "Héros > Sorts et attaque : les sorts de ton compagnon ont leur propre cadre, en grandes cartes, à droite de ceux de ton héros.",
  "La carte du héros (Aventure) montre aussi les sorts appris de ton compagnon, après ceux de ton héros.",
  "Héros bloqué : la carte de la zone donne maintenant trois pistes (l’ascension n’y manque plus).",
];
// (it. 1509-1510) regroupe les it. 1504-1510 (demandes de Victor)
const EDITION_98 = [
  "Compétences : après la fleur, « Dépenser automatiquement » suit ta ligne la plus avancée (sa voie jusqu’au bout, puis son anneau) au lieu de sauter d’une région à l’autre.",
  "Carte : la tête de ton héros se pose sur le carré de sa zone, et les textes de la carte (niveau des reliques…) se lisent mieux.",
  "Héros > Sorts et attaque : sans compagnon, un cadre « Pas encore de compagnon » invite à en choisir un ; avec lui, les deux cadres ont la même hauteur.",
  "Boutique : un objet acheté qui renforce ton héros est équipé tout de suite.",
];
// (it. 1515) regroupe les it. 1511-1515 (demandes de Victor)
const EDITION_99 = [
  "Duo : un compagnon au corps à corps encaisse une part des coups devant un héros à distance (dégâts subis −15 %) ; un compagnon à distance couvre un héros au corps à corps de ses tirs (attaque +15 %).",
  "Sur la bande, le serviteur (squelette, loup) et le familier passent devant le héros et son compagnon : ils ne sont plus cachés.",
  "Boutique : la bulle du bouton d’achat annonce quand l’objet sera équipé tout de suite.",
];
// (it. 1525) regroupe les it. 1516-1524 (demandes de Victor)
const EDITION_100 = [
  "Talents : une maîtrise dont un palier attend ton choix porte un bouton « Choisir un bonus », et « À faire maintenant » te le rappelle (sans choix, le premier bonus s’applique).",
  "Talents : la Voie tient sur une colonne (sa description au survol) ; Héros > Sorts et attaque : les boutons d’amélioration sont alignés en bas des cartes.",
  "Sur la bande, les tirs des héros à distance passent devant le compagnon.",
  "Russe : le texte s’affiche dans la même police pixel que les autres langues (66 lettres dessinées pour le jeu).",
];
// (it. 1532) regroupe les it. 1528-1531 (demandes de Victor)
const EDITION_101 = [
  "Bande : ta vie et celle du monstre affronté s’affichent en haut, à côté de la zone, bouclier compris (Réglages > Fenêtre : « Barres de vie en haut de la bande »).",
  "Talents : chaque maîtrise dont un palier propose deux bonus garde un bouton « Bonus » pour revoir ou changer ton choix, sans passer par la fiche.",
  "Survoler un objet ne fait plus sauter la page : une longue description se resserre pour tenir dans le panneau.",
];
// (it. 1543) bande originale (boucle musique, docs/MUSIQUE.md), curseur des effets, barres de vie
const EDITION_102 = [
  "Une bande originale : quatre morceaux composés pour le jeu, un par tranche de 50 zones, autour d’un même thème, du lofi chaud au final épique galactique.",
  "Réglages : un curseur « Effets » règle le volume des bruitages, à côté de la musique et de l’ambiance.",
  "Barres de vie en haut de la bande : entre deux combats, celle du monstre montre le prochain ennemi ; un héros tombé affiche « K.O. » et le temps avant son retour.",
];
// (it. 1549) retours d'un joueur (it. 1546)
const EDITION_103 = [
  "Une jauge d’expérience sous le niveau, sur la bande : on voit enfin venir le niveau suivant.",
  "Une quête à coffre réclamée à la main ouvre son coffre sous tes yeux, comme ceux de la boutique.",
  "Réglages rejoint les boutons de droite du panneau ; l’objet sélectionné a un cadre clair (il se confondait avec le légendaire).",
  "Un monstre rare, Poupouce, se cache parmi les autres : il rapporte cinq fois plus d’or.",
];
// (it. 1575) musique annoncée, coffres de « Tout réclamer » et de la touche R, jauge d'expérience
const EDITION_104 = [
  "À chaque nouvelle tranche de 50 zones, une bulle annonce le morceau qui commence.",
  "« Tout réclamer » et la touche R ouvrent aussi le plus beau coffre sous tes yeux.",
  "Niveau gagné : la jauge d’expérience brille en or ; en mode mini, la bulle au survol donne l’expérience.",
];
// (it. 1587) morceau gardé, Jour de Poupouce, succès Poupouce
const EDITION_105 = [
  "Réglages > Son : 📌 garde ton morceau préféré, quelle que soit la zone.",
  "Nouvelle bénédiction du jour, le Jour de Poupouce : Poupouce apparaît dix fois plus souvent.",
  "Nouveau succès : « Poupouce ?! », pour ta première victoire sur lui.",
];
// (it. 1606) coffres (fanfare, fermeture), contour de Poupouce, sa chance
const EDITION_106 = [
  "Un coffre ouvert sous tes yeux joue sa petite fanfare, et se referme tout seul s’il n’y a rien à équiper.",
  "Poupouce se repère de loin : un contour rose, assorti à son nom.",
  "Statistiques : une fois Poupouce vaincu, sa chance d’apparition rejoint les Probabilités.",
];
// (it. 1620) le Colossal, récompenses de quête expliquées, Poupouce plus visible
const EDITION_107 = [
  "Une 11e sorte d’élite, le Colossal : grand comme un boss, 120 % de vie en plus, mais des coups 40 % plus lents.",
  "Quêtes : au survol, chaque récompense s’explique (coffre, œuf, éclats d’étoile, élixirs et parchemins).",
  "Poupouce porte un ✦ tant que tu ne l’as jamais vaincu, et garde son contour rose en mode mini.",
];
const EDITION_108 = [
  "Pendant ton absence, ton héros peut aussi croiser Poupouce : la fenêtre « Pendant ton absence » l’annonce, avec les gobelins dorés attrapés.",
  "Assassin : attaque de classe +15 % (au lieu de +10 %).",
  "Mode mini : la bulle du prochain déblocage rappelle aussi ton record de zone.",
];
const EDITION_109 = [
  "Poupouce vaincu : bannière rose, gerbe de pièces, son de champion et un mot d’adieu du héros.",
  "Boutique : quand le sac est plein, le bouton « Sac plein » ouvre le sac (Aventure) pour faire de la place.",
  "Bande : les nombres ne sortent plus par le haut et évitent la bulle de parole du héros.",
];
const EDITION_110 = [
  "Le Journal a déménagé : il est maintenant dans Statistiques > Journal.",
  "Aventure : l’équipement passe avant le sac, et le sac s’élargit (16 cases par rangée sur grand écran) : le détail d’un objet se lit sans défiler.",
  "Le bouton Réglages est maintenant juste à gauche de « Quitter ».",
];
const EDITION_111 = [
  "Le bouton Réglages est finalement juste à gauche de « Mode mini ».",
  "Le menu du panneau reste sur une seule ligne, même quand on agrandit l’interface ou qu’on change la taille de la fenêtre.",
  "La bande-annonce est refaite sur la bande originale du jeu (« Le Rebord »), dans les 10 langues.",
];
const EDITION_112 = [
  "Une 17e bénédiction du jour, le Jour des familiers : le bonus du familier actif est doublé.",
  "Touche J : ouvre directement Statistiques > Journal.",
  "Le Journal garde maintenant ses 40 dernières lignes à l’écran (25 avant).",
];
const EDITION_113 = [
  "Journal : les lignes importantes (légendaire, épique, quête, coffre, K.O.) sont colorées dans toutes les langues, plus seulement en français.",
  "Jour des familiers : la carte du familier actif montre son bonus doublé.",
  "Jour des familiers sans familier actif : la bénédiction l’indique et dit où en trouver.",
];
const EDITION_114 = [
  "Poupouce est maintenant un chat blanc tacheté de noir : extrêmement rare, il laisse énormément d’or et un objet légendaire.",
  "Journal : case « Lignes importantes seulement » et un symbole devant chaque ligne importante (★ légendaire, ◆ épique…).",
  "Le Journal est là dès la zone 3 (Statistiques), sans attendre la zone 40.",
];
const EDITION_115 = [
  "Statistiques : avant la zone 40, les sous-onglets à venir sont montrés grisés, et leur arrivée est annoncée.",
  "Poupouce arrive et ton sac est plein : ton héros te prévient, à temps pour faire de la place à son objet légendaire.",
  "Mode mini : l’arrivée de Poupouce s’y affiche aussi.",
];
const EDITION_116 = [
  "Pendant ton absence : la fenêtre dit combien d’objets légendaires les Poupouce vaincus t’ont laissés.",
  "Journal : si le légendaire de Poupouce reste au sol faute de place, une ligne le signale.",
  "Tico, le scribe des Statistiques, a de nouvelles répliques en début de partie.",
];
const EDITION_117 = [
  "Journal : chaque ligne indique l’heure à laquelle elle est arrivée.",
  "Duo : un compagnon à distance ne disparaît plus derrière un héros au corps à corps, et ses tirs se voient partir.",
  "Aventure : la barre d’expérience passe au violet, comme sur la bande et en mode mini.",
];
const EDITION_118 = [
  "Duo : deux combattants au corps à corps, ou un compagnon et le serviteur du nécromancien, ne se cachent plus l’un l’autre.",
  "Assassin : plus de défense (il tombait deux fois plus souvent que les autres héros).",
  "Mage : un peu plus de points de vie.",
];
const EDITION_119 = [
  "Journal : les événements et les grandes étapes (⚑ reliques, ascensions, déblocages, sorts…) restent visibles avec « Lignes importantes seulement ».",
  "Journal : au survol de cette case, une légende explique chaque symbole (★ ◆ ✦ ✓ ⚑ ⚠).",
  "Une astuce fait découvrir ce filtre une fois le Journal bien rempli.",
];
// (it. 1869) journée des monstres (it. 1847-1868)
const EDITION_120 = [
  "Le Geôlier mécanique, la Reine des cendres et le Chevalier de l’éclipse ont leur propre dessin et un pouvoir unique ; le Briseur d’Étoiles est plus coriace.",
  "Le Rebord vit : en attendant leur tour, les monstres flânent, planent ou sautillent, se tournent vers le héros qui approche et sursautent quand un voisin tombe.",
  "Chaque zone compte de 7 à 13 monstres, au hasard.",
  "Chaque sorte de monstre a sa compétence, visible sur la bande et décrite au survol de sa carte du Bestiaire ; les boss de zone ont celle de leur famille.",
];
// (it. 1892) journée des monstres, suite (it. 1873-1890)
const EDITION_121 = [
  "Un « ! » au-dessus d’un monstre annonce sa compétence ; les boss la lancent plus souvent, avec plus d’éclat.",
  "La nuit, les bêtes de jour dorment et celles de nuit s’agitent ; de temps en temps, deux voisins bavardent en attendant le héros.",
  "Chaque famille tombe à sa façon : les volants chutent, les spectres s’envolent, les golems s’effondrent.",
  "Les monstres sursautent quand un voisin tombe ou qu’un sort éclate, s’avancent quand le héros faiblit ; Poupouce, lui, essaie de filer.",
  "En mode mini aussi, le monstre combattu fait le geste de sa compétence.",
];
// (it. 1908) journée des monstres, suite : meutes, élites aguerris
const EDITION_122 = [
  "Loups, rats, chauves-souris, corbeaux… vont souvent à deux ou trois : la meute se déplace ensemble et s’avance quand l’un des siens se bat.",
  "Élites et champions, plus aguerris, lancent leur compétence plus souvent, avec un mot doré ou violet.",
];
// (it. 1924) journée des monstres : instincts (meute, proies, boss impatient, sommeil de jour, mimique)
const EDITION_123 = [
  "Quand un loup tombe, sa meute s’avance, furieuse ; rats et corbeaux, eux, se dispersent.",
  "Les proies s’écartent des prédateurs ; coincées entre deux, elles tremblent.",
  "Le boss s’impatiente quand le héros approche : il frappe du pied.",
  "En plein jour, les chauves-souris somnolent ; la mimique, elle, frissonne quand son tour approche.",
];
// (it. 1947) journée des monstres : gestes et caractères
const EDITION_124 = [
  "Chaque espèce a son geste en attendant son tour : l’araignée remonte sur son fil, l’ours se dresse, le bandit fait le guet…",
  "La nuit, les loups hurlent à la lune et se répondent ; les spectres s’estompent et reviennent.",
  "Un objet légendaire tombe : bandits et gobelins le convoitent.",
];
// (it. 1962) mode mini, impasse corrigée, effets réduits
const EDITION_125 = [
  "En mode mini, le monstre suivant attend son tour au fond de la scène.",
  "Un monstre qui se régénère ne peut plus bloquer le héros sans fin : passé 90 s de combat, il s’emporte.",
  "« Effets complets » décoché : les monstres qui attendent restent calmes.",
];
// (it. 1983) réputation, caractères au Bestiaire, compétences réfléchies
const EDITION_126 = [
  "Les monstres te jaugent : dans une zone facile, ils te craignent ; à ton record, après une défaite, ils s’enhardissent.",
  "Le Bestiaire dit si une espèce est grégaire, craintive ou prédatrice.",
  "Sylvains et cultistes choisissent leur moment : le soin quand ils sont blessés, le sacrifice tant qu’ils tiennent debout.",
];
// (it. 1998) arrivée des séries, gestes, mode mini
const EDITION_127 = [
  "Chaque nouvelle série arrive en courant du bord de la bande ; après une défaite, les monstres déjà vaincus reviennent aussi.",
  "Encore des gestes : le lézard se camoufle, les champignards se gonflent, le scorpion dresse la queue.",
  "En mode mini, le monstre suivant arrive en glissant, avec le contour des élites et des champions.",
];
// (it. 2012) climat des zones, spores, éclat du niveau
const EDITION_128 = [
  "Les monstres sentent le climat : dans la neige, les frileux grelottent ; dans les braises ou sous l’eau, créatures du froid ou du feu s’affaissent.",
  "Dans les spores, les monstres éternuent ; quand le héros monte de niveau, la file sursaute, éblouie.",
];
// (it. 2026) vent, toux dans les cendres, proie volante qui s'envole
const EDITION_129 = [
  "Dans les zones venteuses, les monstres volants sont ballottés par les rafales.",
  "Dans les cendres, les monstres toussent ; golems et squelettes n’en ont cure.",
  "Une proie volante prise entre deux prédateurs s’envole au lieu de trembler sur place.",
];
// (it. 2039) souffles, buée, bulles, vapeur ; corbeau de jour, fantôme qui ne respire pas
const EDITION_130 = [
  "Éternuements et toux soufflent une bouffée devant la gueule, verte dans les spores, grise dans les cendres.",
  "Dans la neige, les frileux soufflent une buée ; sous l’eau, les monstres lâchent des bulles ; dans les braises, les yétis fument.",
  "Le corbeau vit le jour et dort la nuit ; le fantôme, lui, ne grelotte ni ne tousse : il ne respire pas.",
];
// (it. 2049) poussière, gouttes ; Rafale de vent ; ordre des règles de la file (meutes)
const EDITION_131 = [
  "Dans la poussière, les bêtes à fourrure s’ébrouent et les bandits toussent ; sous les gouttes des grottes et des égouts, on s’ébroue aussi.",
  "Pendant une « Rafale de vent », les volants sont ballottés et les monstres au sol chancellent.",
  "Les proies en meute s’écartent vraiment des prédateurs et du héros trop fort (la meute ne les retient plus).",
];
// (it. 2055) équilibrage demandé par Victor (it. 2053-2054)
const EDITION_132 = [
  "Le Chevalier de l’éclipse et le Briseur d’Étoiles sont bien plus coriaces : il faut plusieurs ascensions et des reliques améliorées pour les vaincre.",
  "Le Cœur de l’aube protège un peu moins : dégâts subis −30 % (au lieu de −45 %).",
];
// (it. 2070) carte de la zone (vrai boss), piste des reliques, pourcentages (it. 2058-2067)
const EDITION_133 = [
  "Carte de la zone : le boss annoncé est le vrai (lieutenant, écho ou Briseur), avec ses vrais PV et un seul nom.",
  "Héros bloqué devant un lieutenant ou le Briseur : une nouvelle piste, « renforce tes reliques ».",
  "En anglais, chinois, japonais et coréen, les pourcentages se collent au nombre (« 10% »).",
];
// (it. 2077) mode mini : passage fluide du monstre suivant (signalé par Victor, it. 2071), boss en attente (it. 2075)
const EDITION_134 = [
  "Mode mini : le monstre suivant s’avance depuis sa place d’attente, sans disparaître ni surgir plus loin.",
  "Mode mini : avant son combat, le boss attend son tour au fond de la scène, avec sa couronne (ou le dessin du lieutenant ou du Briseur).",
];
// (it. 2086) passages fluides : mode mini (it. 2079-2083), bande après une défaite (it. 2085)
const EDITION_135 = [
  "Mode mini : le premier monstre d’une série (et les gobelins) entre par le bord droit ; après une défaite, le vainqueur s’efface et le monstre en attente revient en glissant.",
  "Sur la bande, après une défaite, les monstres vaincus reviennent en courant du bord et le vainqueur garde sa place.",
];
const EDITION_136 = [
  "Talents : la fiche de gauche suit le survol sans délai et revient au talent cliqué quand la souris la rejoint ; les pastilles « +1 », « tout » et « Choisir un bonus » ne bougent plus d’un clic à l’autre.",
  "Talents : seules les lignes où un clic sert restent en vert, la fiche annonce l’effet d’un clic avant de cliquer et chaque branche a une jauge de ses paliers.",
  "Talents : la fiche montre le total de tous tes talents.",
  "Voie : elle se voit en or quand elle est disponible, sa fiche donne ses effets chiffrés, et elle se choisit même quand tous les points sont dépensés automatiquement.",
  "Les actions sans retour (réinitialiser les talents ou les compétences, monter vers les étoiles, effacer la partie) se confirment dans une fenêtre, et plus par un second clic au même endroit.",
];
const EDITION_137 = [
  "Talents : un bouton rend gratuitement les points de ton dernier clic, et la touche Z fait de même (dans les Compétences : le dernier nœud).",
  "Boutique : quand le sac est plein, les objets inutiles se vendent sans quitter le Marchand.",
  "Vendre un objet précieux (légendaire, pièce de panoplie ou forgé) demande confirmation ; les autres se vendent toujours d’un clic.",
  "Un clic sur le fond d’une fenêtre la ferme ; une confirmation est alors annulée.",
  "Compétences : les boutons restent visibles sans défiler ; les bonus de maîtrise se choisissent dans une grille alignée.",
];
const EDITION_138 = [
  "Retour d’absence : le résumé détaillé tient sur deux colonnes, avec ce qu’il reste à faire visible d’emblée ; il s’ouvre aussi si tu ouvres le panneau pendant la bulle.",
  "Retour d’absence : la carte du héros résume l’absence (Depuis ta dernière visite), même après un redémarrage du jeu.",
  "Talents au clavier : la fiche suit le talent qui a le focus, et Échap annule une demande de réinitialisation sans fermer le panneau.",
  "Compétences : annuler et réinitialiser sont grisés tant qu’aucun nœud n’est pris.",
];
const EDITION_139 = [
  "Boutique : avec le sac plein, une amélioration du Marchand s’achète quand même, équipée aussitôt ; l’ancienne pièce est vendue (jamais une pièce précieuse) et la bulle le dit avant le clic.",
  "Maîtrises : « Garder les bonus actuels » valide d’un clic les paliers en attente et éteint le rappel.",
  "Bestiaire : les noms longs s’écrivent plus petit au lieu d’être coupés.",
  "Au clavier, Tab atteint aussi les ⓘ et montre leur aide.",
];
const EDITION_140 = [
  "Sac : après une vente, l’objet suivant est sélectionné ; on enchaîne les ventes sans recliquer dans le sac.",
  "Quêtes : changer une quête 3 étoiles, rare, demande confirmation.",
  "Talents : les flèches du clavier se déplacent dans la grille.",
  "Fenêtres : au clavier, Tab reste dans la fenêtre ouverte et le focus revient où il était quand elle se ferme.",
];
const EDITION_141 = [
  "Talents : en allant vers la fiche, elle garde le talent ou la voie survolés ; leur bouton ne disparaît plus en route.",
  "Sac : les flèches du clavier se déplacent d’une case à l’autre.",
  "Talents : l’aide (ⓘ) cite tous les raccourcis, flèches comprises.",
];
const EDITION_142 = [
  "Compétences : les flèches du clavier passent d’un nœud apprenable à l’autre.",
  "Bestiaire : plus aucun nom coupé ; un nom trop long passe sur deux lignes.",
  "Familiers : l’aide (ⓘ) passe en tête de la barre, où l’ombre du défilement ne la cache plus.",
  "Japonais et coréen : deux bonus de talents reformulés pour se lire sans ambiguïté.",
];
const EDITION_143 = [
  "Familiers : « Emmener » sur une expédition en cours rappelle le familier tout de suite (sans butin) et le prend comme compagnon.",
  "Familiers : le niveau s’affiche sous le nom sur toutes les cartes ; l’aide (ⓘ) est collée au texte qu’elle explique.",
  "Mac : le menu du clic droit sur le Dock passe devant la bande.",
];
const EDITION_144 = [
  "Quêtes : forger, transmuter ou ramener des expéditions ? Un lien (« → Aventure », « → Familiers ») mène là où le faire.",
  "Carte : quand la Carte du voyageur est déjà achetable, un lien mène directement à la boutique (avant : « Bientôt »).",
  "Linux : les Réglages ne parlent plus de Windows (thème « Automatique (système) ») et la case de démarrage, sans effet, est retirée.",
];
const EDITION_145 = [
  "Quêtes : « Ramener des expéditions » n’apparaît plus avant leur déblocage ; une quête de ce genre impossible est remplacée.",
  "Traductions : les cases d’automatisme (talents, Valet d’armes, Astrolabe…) disent clairement « automatiquement » (anglais, allemand, espagnol, portugais, polonais, russe).",
];
const EDITION_146 = [
  "Sac plein : « À faire maintenant » propose de l’agrandir d’un clic (Atelier) quand c’est abordable ; une astuce le rappelle dans la bande.",
  "Quêtes : le lien vers l’onglet où agir disparaît quand un automatisme s’en charge déjà (Grand intendant, Maître de forge, Creuset perpétuel).",
];
const EDITION_147 = [
  "« À faire maintenant » rappelle l’Atelier quand ses améliorations permanentes ne coûtent presque plus rien pour ton or.",
  "Retour d’absence : la colonne « À faire maintenant » est plus large ; en allemand et en polonais, le résumé ne défile plus.",
];
const EDITION_148 = [
  "Succès : les noms obscurs (Clé de voûte, Cœur pur, Écho dissipé…) disent au survol ce qu’il faut faire.",
  "Succès : les trois plus proches d’être obtenus ressortent en or ; une astuce te le signale quand l’un d’eux est à 90 %.",
];
const EDITION_149 = [
  "Bestiaire : ce qui reste à découvrir dit au survol où le trouver (un monstre, sa zone ; un pouvoir, sur les légendaires ; une bénédiction, d’autres jours).",
];
const EDITION_150 = [
  "Carnet de route (Statistiques) : il annonce sa prochaine étape, et les paliers de niveau n’y reviennent plus à chaque ascension.",
];
const EDITION_151 = [
  "Grand graphe des Compétences allégé (222 nœuds au lieu de 618, plus espacés) : les trois voies de chaque pétale se prennent toutes, les points en surplus servent enfin.",
  "Compétences : un clic sur un nœud lointain prend tout seul le chemin le plus court, si tu as assez de points.",
  "Clés de voûte de la fleur sans contrepartie négative ; l’équilibre reste le même (même rythme de partie).",
];
const EDITION_152 = [
  "Zone 200 : le combat final a sa propre musique, « La Dernière Étoile ».",
  "Après la victoire finale, une surprise t’attend… sur tout ton écran.",
  "Talents : les bonus des paliers sont alignés ; une voie ne s’affiche dans la fiche qu’au clic.",
];
// (it. 2417) retouches de la nuit du 18 au 19/11 (it. 2369-2416)
const EDITION_153 = [
  "Compétences : les noms des nœuds restent lisibles, posés au-dessus des nœuds et un peu plus grands.",
  "La surprise de la victoire finale attend ton retour : jamais par-dessus un jeu ou une vidéo en plein écran, ni quand le jeu est réduit ou la session verrouillée.",
  "Une astuce rappelle qu’un clic sur un nœud lointain du grand graphe prend le chemin le plus court.",
];
// (it. 2507) confort et accessibilité (it. 2422-2499)
const EDITION_154 = [
  "Boutons grisés : une bulle dit toujours pourquoi (rien de mieux dans le sac, pièce précieuse qui bloque un achat, son coupé…).",
  "Clavier : les puces de la carte du héros (bénédiction, panoplies, reliques) se parcourent avec Tab et montrent leur bulle.",
  "Thème clair : l’orange des objets légendaires est plus lisible.",
  "Si ton système est réglé sur « réduire les animations », la surprise finale ne se lance plus d’elle-même ; le ▶ de sa chronique la rejoue.",
];
// (it. 2520) sac plein (it. 2514-2518)
const EDITION_155 = [
  "Sac plein : agrandir le sac passe en tête des choses à faire (résumé d’absence, bulle du ☰, mode mini).",
  "Boutique : un coffre s’achète même sac plein ; l’objet inutile le moins cher lui cède sa place.",
  "Sac plein : une pièce légendaire, de panoplie ou forgée n’est plus jamais vendue ni perdue sans que tu le demandes (coffres, Valet d’armes).",
];
// (it. 2539) moins de clics (it. 2523-2532)
const EDITION_156 = [
  "Un déblocage annoncé ailleurs que dans la boutique (Carte, Familiers, Compétences…) s’achète d’un clic sur place quand tu as l’or.",
  "Choses à faire : un sort abordable s’apprend d’un clic, sans passer par l’onglet des héros.",
  "Retour d’absence : le meilleur butin perdu montre son nom au survol.",
];
// (it. 2569) sac et lisibilité (it. 2542-2567)
const EDITION_157 = [
  "Atelier : « max » agrandit aussi le sac de tous ses niveaux d’un clic.",
  "Mode mini : la bulle annonce « prêt à acheter ! » quand l’or suffit pour le prochain déblocage.",
  "Objets laissés au sol faute de place : le journal le note après une absence, et les statistiques en gardent le total.",
];
// (it. 2615) tout relire (it. 2594-2614)
const EDITION_158 = [
  "Quoi de neuf : les nouveautés plus anciennes se lisent page par page, jusqu’à la toute première.",
  "Réglages : les notes de chaque version se relisent, de la plus récente aux plus anciennes (← / →).",
  "Valet d’armes : quand il vend un objet pour garder une pièce précieuse, le journal le dit.",
];
// (it. 2679) lisibilité sur un écran de portable (it. 2631-2677)
const EDITION_159 = [
  "Bande sur un écran de portable : la barre de vie du monstre s’affiche dès que le nom du boss laisse la place, et ce nom ne passe plus sous les boutons.",
  "Statistiques et Réglages : sur un écran de portable, les titres des cartes tiennent sur une ligne.",
  "Atelier : le prix et le bouton « max » sont alignés ; dans « À faire maintenant », l’achat d’un déblocage porte le ✦ des actions d’un clic.",
];
// (it. 2718) lisibilité, suite (it. 2686-2716)
const EDITION_160 = [
  "Équipement : un emplacement vide affiche son nom puis « vide », sans être coupé sur un écran de portable.",
  "Familiers : une expédition en cours affiche ⏳ et le temps restant (son nom au survol), sans être coupée.",
  "Écrans de portable : l’Ascension ne défile plus en russe, les titres japonais ne se coupent plus au milieu d’un mot, et le signe + d’une zone bouclée reste collé à son nom.",
];
const EDITION_161 = [
  "Retour d’absence : le résumé passe avant les autres bulles, et ne se perd plus quand le jeu démarre en mode mini ou réduit en icône (lancement avec Windows) : il attend que tu ouvres la bande.",
  "Retour d’absence : même après une courte absence, un débutant rapporte parfois un objet.",
  "Bande : la bulle de parole du héros ne passe plus sur les barres de vie ni sur le nom du boss.",
];
const EDITION_162 = [
  "Retour d’absence : un déblocage acheté dans « À faire maintenant » rend aussitôt ses actions faisables d’un clic, une ligne devenue inutile passe à ✓, et la fenêtre reste ouverte ; rien ne bouge sous le curseur.",
  "Retour d’absence : le résumé attend aussi que la bande revienne après un jeu ou une vidéo en plein écran.",
];
const EDITION_163 = [
  "Bande : les annonces (butin légendaire, nouveau record, événement) ne se chevauchent plus entre elles ni sur la bulle de parole du héros.",
  "Mode mini : deux moments qui arrivent ensemble (« Légendaire ! » puis « Nouveau record ») s’affichent l’un après l’autre.",
];
const EDITION_164 = [
  "Familiers et Boutique : le temps restant indique l’unité de chaque nombre dans toutes les langues.",
  "Bande : avec un nom de zone long, l’événement en cours s’abrège (⏳ et les secondes) au lieu d’être coupé.",
];
const EDITION_165 = [
  "Durées plus nettes : « 2 h » au lieu de « 2 h 0 min », « 3 j » au lieu de « 3 j 0 h » (carte du héros, Statistiques).",
  "Retour d’absence d’un débutant : la note du plafond ne parle plus d’une constellation qu’il ne connaît pas encore.",
  "Bande sur un écran de portable : la bulle de parole du héros se tait quand elle n’a pas la place, au lieu de cacher sa barre de vie.",
];
const EDITION_166 = [
  "Champions : plus coriaces qu’une élite, mais moins que le boss de leur zone. Avant, ton héros perdait presque tous ces combats.",
  "Quêtes de chasse : elles n’arrivent qu’avec la « Carte du voyageur », qui mène en un clic jusqu’au monstre recherché.",
  "Pourcentages écrits partout de la même façon en espagnol, portugais, allemand, polonais et russe.",
];
const EDITION_167 = [
  "Pendant ton absence, les élites et les champions vaincus rapportent leur or et leur expérience, comme en jeu.",
  "Pendant ton absence, chaque champion vaincu laisse son objet épique, comme Poupouce laisse son légendaire.",
];
const EDITION_168 = [
  "Retour d’absence : « À faire maintenant » ne fait plus défiler la fenêtre ; s’il y a trop de lignes, un lien ouvre la liste complète.",
  "« À faire maintenant » : le déblocage à acheter vient juste après les quêtes à réclamer.",
  "Carte du héros : une longue liste de choses à faire se range sur deux colonnes.",
];
const EDITION_169 = [
  "Pendant ton absence, les objets les plus précieux se rangent en premier : légendaires de Poupouce, épiques des champions, coffres, puis le butin du plus rare au moins rare.",
  "Sac plein : un coffre au trésor trouvé en chemin fait place en vendant l’objet inutile le moins cher, comme celui de la boutique.",
  "Le résumé d’absence dit combien d’objets épiques les champions vaincus ont laissés.",
];
const EDITION_170 = [
  "Correction : sac plein, un coffre au trésor trouvé en chemin ne vend plus d’objet pour faire place ; son butin reste au sol, comme tout butin.",
];
const EDITION_171 = [
  "Très longues parties : les très grands nombres s’écrivent avec des lettres (Ud, Dd… jusqu’à Vg) plutôt qu’en notation scientifique ; au survol, les cases du héros ne montrent plus de longues rangées de chiffres.",
  "Les cases du héros et l’onglet Ascension restent lisibles avec de très grands nombres, même sur un écran de portable.",
];
const EDITION_172 = [
  "Sur un écran de portable, les icônes de sorts, les nombres et les annonces ne passent plus sur les informations du haut de la bande.",
  "La bulle de parole du héros ne clignote plus en haut à gauche ni n’est coupée par le haut, et les nombres ne la recouvrent plus, pas plus que le nom du boss.",
];
const EDITION_173 = [
  "Sur la Carte, au-delà de la zone 200, les noms sous le Briseur d’Étoiles ne sont plus coupés par le bord.",
  "Carte du héros : le nom du compagnon n’est plus coupé net par les icônes des sorts.",
  "« Zone suivante » grisée dit pourquoi, et le choix du bonus d’un palier de maîtrise se fait aussi au clavier.",
];
const EDITION_174 = [
  "Avant la première ascension, l’onglet Ascension ne défile plus sur un écran de portable : l’effet du rang suivant d’une constellation passe dans sa bulle.",
  "Les boutons de zone et de réinitialisation des talents disent pourquoi ils sont grisés.",
  "Les noms trop longs (talents, héros, totaux des talents) finissent par des points de suspension au lieu d’être coupés net.",
];
const EDITION_175 = [
  "Sur un écran de portable, plusieurs pages ne défilent plus en milieu de partie selon la langue : succès, sorts, quêtes, et l’aventure quand le héros est bloqué devant un grand boss.",
  "Quand la place manque, la description du style d’attaque et la note des quêtes tiennent sur une ligne ; le texte entier s’affiche au survol.",
];
const EDITION_176 = [
  "Nouvel événement rare, la « Faveur royale » : pendant 30 secondes, chaque objet trouvé au combat est au moins rare.",
  "Sur un écran de portable, les noms des élites, les nombres près du boss, les éclairs des sorts et la bulle de parole du héros ne passent plus sur les informations du haut de la bande.",
];
const EDITION_177 = [
  "Nouvelle bénédiction du jour, le « Jour des étoiles » : +50 % d’éclats d’étoile à l’ascension ; ce jour-là, un ✨ suit le gain annoncé dans l’onglet Ascension.",
  "Mode mini : pendant un événement rare au nom long, les secondes restantes restent visibles.",
  "Bande : les grandes annonces (événements, records) espacent mieux leurs mots, plus faciles à lire.",
];
const EDITION_178 = [
  "Nouvelle sorte d’élite, l’« Acharné » : ses coups grandissent avec la vie qu’il a perdue (jusqu’à 60 % de plus), mais il a 15 % de vie en moins : achève-le vite !",
  "Nouveau familier, la « Belette » : elle apporte de l’esquive et des ripostes, ce qu’aucun autre familier ne donnait.",
];
const EDITION_179 = [
  "Pendant le combat, l’étiquette de l’Acharné montre le bonus de ses coups (« +30 % »… jusqu’à « +60 % ») : on voit le danger monter.",
  "Bestiaire : sur un écran de portable, la page ne défile plus quand des noms de monstres passent sur deux lignes (français, espagnol, portugais, polonais, russe).",
  "Jour des étoiles : avant la première ascension, sa bulle précise à partir de quelle zone l’ascension devient possible.",
];
const EDITION_180 = [
  "Nouveau familier, le « Colibri » : tes coups au clic frappent plus fort (jusqu’à 100 % de plus au niveau 10).",
  "Bande sur un écran de portable : l’étiquette d’une élite en combat et le nom d’un sort lancé à l’entrée en combat ne passent plus sur les informations du haut.",
];
const EDITION_181 = [
  "Nouvelle sorte de quête : attraper des étoiles filantes, pour qui en a déjà attrapé une ; le temps estimé compte jusqu’à la prochaine étoile.",
];
const EDITION_182 = [
  "Mode mini : au survol du monstre, sa bulle dit sa sorte d’élite et son effet, ou les capacités du boss.",
  "Le Jour de Poupouce a maintenant l’icône d’un chat, comme Poupouce lui-même.",
];
const EDITION_183 = [
  "Nouveau succès : « Plus acharné que lui (25 acharnés) », pour 25 Acharnés vaincus.",
];
const EDITION_184 = [
  "Nouveau familier, la « Pie-grièche » : tes coups contre les ennemis sous 30 % de vie font plus mal (jusqu’à 30 % de plus au niveau 10).",
  "Nouvelle bénédiction du jour, le « Jour du zèle » : les quêtes avancent deux fois plus vite, et leurs temps estimés en tiennent compte.",
];
const EDITION_185 = [
  "Mode mini : la bulle de Poupouce et celle d’un champion disent aussi ce qu’ils laissent en tombant.",
];
const EDITION_186 = [
  "Retour d’absence : si ton absence a passé minuit, le résumé annonce la bénédiction du nouveau jour.",
  "Jour du zèle : avant l’ouverture des quêtes, sa bulle précise qu’elles arrivent après les premières minutes de jeu.",
];
const EDITION_187 = [
  "Traductions : des noms qui se confondaient sont maintenant distincts (une capacité de boss et une sorte d’élite en allemand et en polonais, deux sorts, un pouvoir et une panoplie en chinois, coréen et polonais).",
];
const EDITION_188 = [
  "Nouvel événement rare, le « Défi des champions » : pendant 30 secondes, les élites à venir deviennent des champions, plus coriaces mais qui laissent un objet épique.",
];
const EDITION_189 = [
  "Équilibre : le Mage, le héros qui allait le moins loin, a un peu plus de vie (5 % de moins que la normale au lieu de 15 %).",
];
export const NEWS_EDITIONS = [EDITION_1, EDITION_2, EDITION_3, EDITION_4, EDITION_5, EDITION_6, EDITION_7, EDITION_8, EDITION_9, EDITION_10, EDITION_11, EDITION_12, EDITION_13, EDITION_14, EDITION_15, EDITION_16, EDITION_17, EDITION_18, EDITION_19, EDITION_20, EDITION_21, EDITION_22, EDITION_23, EDITION_24, EDITION_25, EDITION_26, EDITION_27, EDITION_28, EDITION_29, EDITION_30, EDITION_31, EDITION_32, EDITION_33, EDITION_34, EDITION_35, EDITION_36, EDITION_37, EDITION_38, EDITION_39, EDITION_40, EDITION_41, EDITION_42, EDITION_43, EDITION_44, EDITION_45, EDITION_46, EDITION_47, EDITION_48, EDITION_49, EDITION_50, EDITION_51, EDITION_52, EDITION_53, EDITION_54, EDITION_55, EDITION_56, EDITION_57, EDITION_58, EDITION_59, EDITION_60, EDITION_61, EDITION_62, EDITION_63, EDITION_64, EDITION_65, EDITION_66, EDITION_67, EDITION_68, EDITION_69, EDITION_70, EDITION_71, EDITION_72, EDITION_73, EDITION_74, EDITION_75, EDITION_76, EDITION_77, EDITION_78, EDITION_79, EDITION_80, EDITION_81, EDITION_82, EDITION_83, EDITION_84, EDITION_85, EDITION_86, EDITION_87, EDITION_88, EDITION_89, EDITION_90, EDITION_91, EDITION_92, EDITION_93, EDITION_94, EDITION_95, EDITION_96, EDITION_97, EDITION_98, EDITION_99, EDITION_100, EDITION_101, EDITION_102, EDITION_103, EDITION_104, EDITION_105, EDITION_106, EDITION_107, EDITION_108, EDITION_109, EDITION_110, EDITION_111, EDITION_112, EDITION_113, EDITION_114, EDITION_115, EDITION_116, EDITION_117, EDITION_118, EDITION_119, EDITION_120, EDITION_121, EDITION_122, EDITION_123, EDITION_124, EDITION_125, EDITION_126, EDITION_127, EDITION_128, EDITION_129, EDITION_130, EDITION_131, EDITION_132, EDITION_133, EDITION_134, EDITION_135, EDITION_136, EDITION_137, EDITION_138, EDITION_139, EDITION_140, EDITION_141, EDITION_142, EDITION_143, EDITION_144, EDITION_145, EDITION_146, EDITION_147, EDITION_148, EDITION_149, EDITION_150, EDITION_151, EDITION_152, EDITION_153, EDITION_154, EDITION_155, EDITION_156, EDITION_157, EDITION_158, EDITION_159, EDITION_160, EDITION_161, EDITION_162, EDITION_163, EDITION_164, EDITION_165, EDITION_166, EDITION_167, EDITION_168, EDITION_169, EDITION_170, EDITION_171, EDITION_172, EDITION_173, EDITION_174, EDITION_175, EDITION_176, EDITION_177, EDITION_178, EDITION_179, EDITION_180, EDITION_181, EDITION_182, EDITION_183, EDITION_184, EDITION_185, EDITION_186, EDITION_187, EDITION_188, EDITION_189];
export const NEWS_ID = NEWS_EDITIONS.length;
/** Nouveautés des éditions après `seen` (0 : toutes), la plus récente d'abord. */
export const newsItems = (seen = 0) => NEWS_EDITIONS.slice(Math.max(0, seen)).reverse().flat();
/** Au plus NEWS_MAX_EDITIONS éditions affichées (la fenêtre ne doit jamais défiler, même après une longue absence) :
 *  { items, older } — older = nombre de nouveautés plus anciennes non montrées. */
export const NEWS_MAX_EDITIONS = 3;
/** (it. 1442) puis des éditions plus anciennes tant que le total reste sous NEWS_FILL_ITEMS nouveautés (11 depuis l'it. 1474 : mesuré
 *  sans défilement dans les 10 langues à 1280-1920 px) : les éditions d'une
 *  seule ligne laissaient la fenêtre presque vide alors que les plus anciennes passaient à la trappe. */
export const NEWS_FILL_ITEMS = 11;
// (it. 2594) skip : éditions déjà montrées (pages suivantes : « … et N nouveautés plus anciennes » devient un bouton ; avant, rien ne
// permettait de les lire, même depuis Réglages > Quoi de neuf). Renvoie aussi shown, le nombre d'éditions de cette page.
export function newsShown(seen = 0, skip = 0) {
  const eds = NEWS_EDITIONS.slice(Math.max(0, seen)).reverse().slice(Math.max(0, skip));
  let k = Math.min(NEWS_MAX_EDITIONS, eds.length), n = eds.slice(0, k).flat().length;
  while (k < eds.length && n + eds[k].length <= NEWS_FILL_ITEMS) n += eds[k++].length;
  return { items: eds.slice(0, k).flat(), older: eds.slice(k).flat().length, shown: k };
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
// (it. 1541) 0.1.4 : éditions 59 à 101
const RELEASE_014 = [
  "Les champions ont leur quête (coffre épique, parfois un œuf) et leur succès.",
  "Quatre nouveaux événements rares et trois nouvelles élites, à découvrir dans le Bestiaire.",
  "Six nouvelles bénédictions du jour ; chaque bénédiction vécue donne +1 % d’expérience pour toujours.",
  "Quatre nouveaux familiers, et un encens de la boutique qui double les élites pendant 10 minutes.",
  "Un vrai duo : ton compagnon au corps à corps encaisse une part des coups, celui à distance te couvre de ses tirs, et ses sorts s’affichent en grand.",
  "Ta vie et celle du monstre affronté s’affichent en haut de la bande, bouclier compris.",
  "Deux nouvelles sortes de quête (gagner des niveaux, attraper des gobelins dorés) et un temps estimé sur presque toutes les quêtes.",
  "Talents : un bouton sur chaque maîtrise pour choisir les bonus de ses paliers.",
  "Confort : un achat qui renforce ton héros est équipé tout de suite, et les absences comptent enfin parchemins, potions et encens.",
  "Le jeu démarre dans la langue de ton système ; le russe a une police pixel lisible.",
];
// (0.1.5) textes repris des éditions 102-114, déjà traduits
const RELEASE_015 = [
  "Une bande originale : quatre morceaux composés pour le jeu, un par tranche de 50 zones, autour d’un même thème, du lofi chaud au final épique galactique.",
  "Réglages : un curseur « Effets » règle le volume des bruitages, à côté de la musique et de l’ambiance.",
  "Une jauge d’expérience sous le niveau, sur la bande : on voit enfin venir le niveau suivant.",
  "Une quête à coffre réclamée à la main ouvre son coffre sous tes yeux, comme ceux de la boutique.",
  "Poupouce est maintenant un chat blanc tacheté de noir : extrêmement rare, il laisse énormément d’or et un objet légendaire.",
  "Une 11e sorte d’élite, le Colossal : grand comme un boss, 120 % de vie en plus, mais des coups 40 % plus lents.",
  "Une 17e bénédiction du jour, le Jour des familiers : le bonus du familier actif est doublé.",
  "Aventure : l’équipement passe avant le sac, et le sac s’élargit (16 cases par rangée sur grand écran) : le détail d’un objet se lit sans défiler.",
  "Le Journal a déménagé : il est maintenant dans Statistiques > Journal.",
  "Quêtes : au survol, chaque récompense s’explique (coffre, œuf, éclats d’étoile, élixirs et parchemins).",
];
// (it. 2055) notes de la 0.1.6 : les grandes nouveautés des éditions 115 à 132 (journée des monstres, équilibrage)
const RELEASE_016 = [
  "Le Rebord vit : en attendant leur tour, les monstres flânent, planent ou sautillent, se tournent vers le héros qui approche et sursautent quand un voisin tombe.",
  "Chaque zone compte de 7 à 13 monstres, au hasard.",
  "Chaque sorte de monstre a sa compétence, visible sur la bande et décrite au survol de sa carte du Bestiaire ; les boss de zone ont celle de leur famille.",
  "Le Geôlier mécanique, la Reine des cendres et le Chevalier de l’éclipse ont leur propre dessin et un pouvoir unique ; le Briseur d’Étoiles est plus coriace.",
  "Loups, rats, chauves-souris, corbeaux… vont souvent à deux ou trois : la meute se déplace ensemble et s’avance quand l’un des siens se bat.",
  "Chaque espèce a son geste en attendant son tour : l’araignée remonte sur son fil, l’ours se dresse, le bandit fait le guet…",
  "La nuit, les bêtes de jour dorment et celles de nuit s’agitent ; de temps en temps, deux voisins bavardent en attendant le héros.",
  "Les monstres sentent le climat de leur zone : ils grelottent dans la neige, éternuent dans les spores, toussent dans les cendres, lâchent des bulles sous l’eau.",
  "Les monstres te jaugent : dans une zone facile, ils te craignent ; à ton record, après une défaite, ils s’enhardissent.",
  "Le Chevalier de l’éclipse et le Briseur d’Étoiles sont bien plus coriaces : il faut plusieurs ascensions et des reliques améliorées pour les vaincre.",
];
const RELEASE_017 = [
  "Onglet Talents refait : la fiche suit le survol, plus rien ne bouge sous le curseur, chaque clic annonce son effet, et Z annule le dernier choix.",
  "Grand graphe des Compétences allégé (222 nœuds au lieu de 618) : les trois voies de chaque pétale se prennent toutes, et un clic sur un nœud lointain prend le chemin le plus court.",
  "Les clés de voûte de la fleur n’ont plus de contrepartie négative ; le rythme de la partie reste le même.",
  "Zone 200 : le combat final a sa propre musique, « La Dernière Étoile », et la victoire finale réserve une surprise sur tout ton écran.",
  "Les actions sans retour (réinitialiser, monter vers les étoiles, effacer la partie, vendre un objet précieux) se confirment dans une fenêtre.",
  "Clavier : les flèches parcourent les Talents, le sac et les Compétences ; Z annule ; Échap et Tab se comportent comme on l’attend.",
  "Retour d’absence plus clair : « À faire maintenant » est visible d’emblée et propose aussi d’agrandir le sac plein ou de passer à l’Atelier.",
  "Familiers : « Emmener » rappelle un familier parti en expédition et l’équipe d’un clic.",
  "Succès expliqués au survol, les trois plus proches en or ; le Bestiaire dit où trouver ce qui manque ; le Carnet de route annonce sa prochaine étape.",
  "Le son des coups suit la vitesse de frappe ; volumes plus doux à la première installation ; sur Mac, le menu du Dock passe devant la bande.",
];
// (it. 3193) notes de la 0.1.8 : textes repris des éditions 153 à 176, déjà traduits
const RELEASE_018 = [
  "Champions : plus coriaces qu’une élite, mais moins que le boss de leur zone. Avant, ton héros perdait presque tous ces combats.",
  "Quêtes de chasse : elles n’arrivent qu’avec la « Carte du voyageur », qui mène en un clic jusqu’au monstre recherché.",
  "Nouvel événement rare, la « Faveur royale » : pendant 30 secondes, chaque objet trouvé au combat est au moins rare.",
  "Pendant ton absence, les élites et les champions vaincus rapportent leur or et leur expérience, comme en jeu.",
  "Sac plein : une pièce légendaire, de panoplie ou forgée n’est plus jamais vendue ni perdue sans que tu le demandes (coffres, Valet d’armes).",
  "Un déblocage annoncé ailleurs que dans la boutique (Carte, Familiers, Compétences…) s’achète d’un clic sur place quand tu as l’or.",
  "Choses à faire : un sort abordable s’apprend d’un clic, sans passer par l’onglet des héros.",
  "Très longues parties : les très grands nombres s’écrivent avec des lettres (Ud, Dd… jusqu’à Vg) plutôt qu’en notation scientifique ; au survol, les cases du héros ne montrent plus de longues rangées de chiffres.",
  "Retour d’absence : le résumé passe avant les autres bulles, et ne se perd plus quand le jeu démarre en mode mini ou réduit en icône (lancement avec Windows) : il attend que tu ouvres la bande.",
  "Sur un écran de portable, les icônes de sorts, les nombres et les annonces ne passent plus sur les informations du haut de la bande.",
];
// (it. 3245) notes de la 0.1.9 : textes repris des éditions 177 à 183, déjà traduits
const RELEASE_019 = [
  "Nouvelle bénédiction du jour, le « Jour des étoiles » : +50 % d’éclats d’étoile à l’ascension ; ce jour-là, un ✨ suit le gain annoncé dans l’onglet Ascension.",
  "Nouvelle sorte d’élite, l’« Acharné » : ses coups grandissent avec la vie qu’il a perdue (jusqu’à 60 % de plus), mais il a 15 % de vie en moins : achève-le vite !",
  "Pendant le combat, l’étiquette de l’Acharné montre le bonus de ses coups (« +30 % »… jusqu’à « +60 % ») : on voit le danger monter.",
  "Nouveau familier, la « Belette » : elle apporte de l’esquive et des ripostes, ce qu’aucun autre familier ne donnait.",
  "Nouveau familier, le « Colibri » : tes coups au clic frappent plus fort (jusqu’à 100 % de plus au niveau 10).",
  "Nouvelle sorte de quête : attraper des étoiles filantes, pour qui en a déjà attrapé une ; le temps estimé compte jusqu’à la prochaine étoile.",
  "Mode mini : au survol du monstre, sa bulle dit sa sorte d’élite et son effet, ou les capacités du boss.",
  "Mode mini : pendant un événement rare au nom long, les secondes restantes restent visibles.",
  "Bestiaire : sur un écran de portable, la page ne défile plus quand des noms de monstres passent sur deux lignes (français, espagnol, portugais, polonais, russe).",
  "Bande sur un écran de portable : l’étiquette d’une élite en combat et le nom d’un sort lancé à l’entrée en combat ne passent plus sur les informations du haut.",
  "Nouveau succès : « Plus acharné que lui (25 acharnés) », pour 25 Acharnés vaincus.",
];
// (it. 3289) notes de la 0.1.10 : textes repris des éditions 184 à 189, déjà traduits
const RELEASE_0110 = [
  "Nouveau familier, la « Pie-grièche » : tes coups contre les ennemis sous 30 % de vie font plus mal (jusqu’à 30 % de plus au niveau 10).",
  "Nouvelle bénédiction du jour, le « Jour du zèle » : les quêtes avancent deux fois plus vite, et leurs temps estimés en tiennent compte.",
  "Nouvel événement rare, le « Défi des champions » : pendant 30 secondes, les élites à venir deviennent des champions, plus coriaces mais qui laissent un objet épique.",
  "Équilibre : le Mage, le héros qui allait le moins loin, a un peu plus de vie (5 % de moins que la normale au lieu de 15 %).",
  "Mode mini : la bulle de Poupouce et celle d’un champion disent aussi ce qu’ils laissent en tombant.",
  "Retour d’absence : si ton absence a passé minuit, le résumé annonce la bénédiction du nouveau jour.",
  "Jour du zèle : avant l’ouverture des quêtes, sa bulle précise qu’elles arrivent après les premières minutes de jeu.",
  "Traductions : des noms qui se confondaient sont maintenant distincts (une capacité de boss et une sorte d’élite en allemand et en polonais, deux sorts, un pouvoir et une panoplie en chinois, coréen et polonais).",
];
// 0.1.3 distribuée avec l'édition 58, 0.1.4 avec l'édition 101, 0.1.5 avec l'édition 114, 0.1.6 avec l'édition 132, 0.1.7 avec l'édition 152, 0.1.8 avec l'édition 176, 0.1.9 avec l'édition 183, 0.1.10 avec l'édition 189
// (NEWS_ID) : la suivante prendra after: 189.
export const NEWS_RELEASES = [{ version: "0.1.3", after: 32, items: RELEASE_013 }, { version: "0.1.4", after: 58, items: RELEASE_014 }, { version: "0.1.5", after: 101, items: RELEASE_015 }, { version: "0.1.6", after: 114, items: RELEASE_016 }, { version: "0.1.7", after: 132, items: RELEASE_017 }, { version: "0.1.8", after: 152, items: RELEASE_018 }, { version: "0.1.9", after: 176, items: RELEASE_019 }, { version: "0.1.10", after: 183, items: RELEASE_0110 }];
/** Notes de version à montrer à un joueur qui a lu jusqu'à l'édition `seen` (la plus récente qu'il n'a pas vue), ou null. */
export function releaseFor(seen = 0) {
  const r = NEWS_RELEASES.filter((x) => seen <= x.after && NEWS_ID > x.after);
  return r.length ? r[r.length - 1] : null;
}
