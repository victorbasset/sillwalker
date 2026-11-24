# Sillwalker

Idle RPG qui vit dans une bande en bas (ou en haut) de l'écran. Application Electron pour Windows, prévue pour Steam.

Trois affichages (bouton sur la bande / l'encart, panneau, ou menu de l'icône de notification) :
- **Bande** : toute la largeur de l'écran est la carte de la zone. Les monstres de la série (7 à 13) attendent le long du chemin, le boss au bout ; ils vivent leur vie en attendant (flânent, planent, sautillent, bavardent, dorment la nuit pour les bêtes de jour), se tournent vers le héros qui approche et réagissent à la mort d'un voisin ; le héros avance d'un combat à l'autre. En haut : zone, barres de vie du héros et du monstre (bouclier
  compris), or et niveau avec sa jauge d'expérience (elle brille en or au niveau gagné).
- **Mini** : petit encart près de l'horloge (combat en cours, niveau, or, zone). Un clic l'agrandit en bande ; au survol,
  le record à battre, l'expérience et le prochain objectif ; légendaires, records et ascensions s'y signalent brièvement.
- **Icône seule** : plus de fenêtre ; l'icône de notification s'anime (marche, combat, K.O., butin) et son infobulle donne niveau, zone, record à battre et or (traduits). Clic sur l'icône = retour au dernier affichage.

## Contenu

- **Histoire** (`game/story.js`) : le Briseur d'Étoiles a fracassé le ciel il y a mille ans ; ses lieutenants (les boss)
  retiennent les héros sur le Rebord. Introduction au premier lancement (petite cinématique dans la bande puis trois
  bulles), 11 **chroniques** débloquées par paliers (zones 10, 25, 50, 75, 100, 125, 150, 190, première ascension, victoire
  finale), relisibles dans la carte du héros (▶ : revoir), chacune avec sa cinématique propre (décor, ambiance, motif
  musical ; désactivables dans les Réglages). **But final** : le Briseur d'Étoiles, boss unique de la
  zone 200 (sprite propre, 3 capacités, PV ×2,5 ; musique propre « La Dernière Étoile ») ; sa défaite rallume le ciel
  (cinématique, générique personnalisé, succès STARBREAKER) et le héros, libéré, se promène sur tout l'écran (fenêtre
  transparente traversée par les clics : main/finale-window.js, finale.html, docs/FINALE.md), puis le jeu continue « au-delà du
  Rebord ». Libérer un héros a aussi sa cinématique.
- **Boss majeurs et reliques** (`game/relics.js`, demande de Victor) : trois lieutenants du Briseur gardent une
  relique en zones 50 (Geôlier mécanique), 100 (Reine des cendres) et 150 (Chevalier de l'éclipse) : boss plus
  coriaces (PV ×2 à ×2,4, capacités propres), annoncés par une scène et dans le panneau de la zone (à 10 zones).
  La relique flotte à côté du boss ; vaincu, il la laisse au héros pour toujours (ascensions comprises), avec une
  scène qui raconte son histoire. Le Briseur donne la 4e. Drone stellaire (missiles toutes les 1,5 s, visible à
  côté du héros), Cœur de l'aube (dégâts subis −45 %, régénération), Lame du crépuscule (attaque ×2,5), Couronne
  d'étoiles (attaque et PV ×2, or +50 %, portée sur la tête). Réglage : ≈ 15-20 zones par relique (semaine
  simulée). Sur la carte, au bout des rangées ; en-tête de la carte : les quatre ; succès RELIC_FIRST, RELICS_ALL.
  Niveaux (1 à 5, +10 % chacun) : un par course en battant de nouveau le gardien ; au-delà du Rebord, ses **échos**
  (zones 250, 300, 350, plus coriaces) en donnent un de plus par course.
- **Carte du Rebord** (onglet Carte, zone 12) : les 200 zones en serpentin aux couleurs de leur décor, héros
  prisonniers, chroniques, record, Briseur au bout, brouillard au-delà du record ; avec la **Carte du voyageur**
  (déblocage, zone 22), un clic sur une zone déjà atteinte y emmène le héros.
- **20 héros, en duo** (un à distance + un au corps à corps ; le compagnon frappe à 35 %, apporte la moitié de son passif et lance les sorts appris pour sa classe à moitié de leur puissance ; sur la bande, le compagnon se tient derrière le héros sans le cacher, ses tirs se voient partir, it. 1802-1807) :
  prisonniers de boss de zone (zones 10 à 192) ; une fois libérés, on change de héros et de compagnon à l’ascension :
  Guerrier (riposte), Rôdeur (tir d'ouverture), Mage (brûlure), Paladin (bouclier sacré), Assassin (poison cumulable),
  Nécromancien (serviteur squelette), Moine (enchaînement), Druide (épines, esprit-loup), Samouraï (iaijutsu : un coup sur 4 critique renforcé),
  Berserker (vol de vie, exécution des cibles affaiblies), puis Arbalétrière, Lancier, Prêtresse, Gladiatrice, Chaman,
  Danseuse de lames, Cryomancienne, Barde, Gardien des étoiles, Artificière (chacun avec une branche de talents
  greffée d'un autre héros, plus proche de son thème : `GRAFTS`, talents.js).
- **Arbre de compétences** commun à toutes les classes : 144 nœuds en 6 secteurs (Force, Agilité, Arcanes,
  Vitalité, Fortune, Maîtrise), 24 nœuds remarquables, 6 clés de voûte. 1 point tous les 2 niveaux + points
  permanents d'ascension. Le chemin est conservé à l'ascension et se réactive au fil des niveaux. Chaque nœud porte
  une icône pixel art (une par effet ; un dessin unique pour les remarquables et les clés : `render/skillicons.js`).
- **Grand graphe** autour de la fleur (`skillgraph.js`, demande de Victor) : grisé tant que la fleur n'est pas
  entière, puis ouvert aux points en surplus. 222 nœuds (it. 2332 ; 618 avant) : une région par pétale (porte reliée à la
  clé de voûte), 3 voies de 10 nœuds par région, toutes prenables, dont une de synergie (attaque selon les PV, selon l'or…),
  et un anneau de couronnes. Attaque, PV et défense du graphe multiplient le résultat (`GRAPH_SCALE`, `VOIE_SCALE`). Un clic
  sur un nœud lointain prend le chemin le plus court (`graphPathTo`, fleur : `skillPathTo`). Graphe rempli, chaque point en surplus donne
  +0,1 % d'attaque et de PV (`SURPLUS_BONUS`). « Dépenser automatiquement » continue dans le graphe une fois la fleur pleine ; son ouverture est
  annoncée une fois (bulle, mode mini), la pastille de l'onglet compte ses points ; « Réinitialiser le grand graphe »
  le vide sans toucher à la fleur (changer de voie).
- **PNJ de l'histoire** (`npcs.js`, `art-npcs.js`, `ui/npc.js`) : chaque onglet peut être tenu par un personnage
  rencontré sur la route (Mirette, la grenouille marchande, pour la Boutique ; Orbo, l'astronome à la fusée, pour
  l'Ascension) : scène de rencontre sur la bande quand l'onglet s'ouvre (`juice.js`, `npcPlace`), puis le PNJ dans
  l'onglet avec ses répliques (une autre au clic).
- **Talents** : un arbre par classe, 3 branches × 4 paliers (0 / 5 / 10 / 20 points), talent ultime ★ au bout, une Voie au choix et des Maîtrises sans limite (aucun point perdu), avec des paliers aux rangs 10, 25, 50, 100, 200, 400 (deux bonus au choix à chaque palier, `MASTERY_ALT` ; « Choisir les bonus des paliers » dans la grande fenêtre) puis à chaque doublement. 1 point par niveau ; un clic monte un talent au maximum (« +1 » : un seul rang).
- **Déblocages** (boutique, permanents, tous visibles dans une rangée latérale) : 26 automatismes et fonctionnalités à acheter, chacun demandant une zone record
  (étalées de la zone 8 à la zone 300) et de l’or : boutons groupés, carte du voyageur, potions et vente automatiques, Ménagerie (familiers), Enclume (forge), Atelier,
  quêtes et expéditions, transmutation, dépense des points à chaque niveau, valet d’armes, maître de forge
  (forge l’équipement porté avec l’or en trop), filet à étoiles (attrape les étoiles filantes manquées),
  Enclume stellaire (zone 140 : remettre un objet au niveau du record, très cher), astrolabe (ascension automatique quand
  le héros bloque près de son record, option à activer), grand intendant (zone 170 : œufs et expéditions tout seuls, expédition choisie d'un clic), creuset perpétuel (zone 200 : transmutation quand le sac se remplit), Forgeron des astres (zone 230, au-delà du Rebord : l'Enclume stellaire sans clic, avec l'or en trop, option), Herboriste perpétuel (zone 260 : élixirs et parchemins rachetés quand leur effet s'achève, option), Marchand attitré (zone 300 : achète et équipe l'objet de l'étal qui renforce le héros, option). Liste dans `game/unlocks.js`.
- **Fin de partie** : jusqu'à la zone 60, les monstres gagnent ×1,28 par zone ; ensuite la croissance ralentit en
  douceur jusqu'à ×1,04 (`zoneMight`, rules.js), pour que la progression continue jusqu'à la zone 200 et au-delà
  (semaine simulée : record 161).
- **Boutique** : marchand (4 objets, renouvelé toutes les 15 min ou contre de l'or), potions bues automatiquement
  sous 30 % de vie, élixirs de 10 min (attaque, or, expérience, vitesse, butin, PV et défense ; Encens de chasse : +100 % d'élites, jamais racheté automatiquement), coffres à rareté garantie, sac jusqu'à 48 places.
  Sac plein : le butin suivant reste au sol (compté dans Statistiques et noté au journal après une absence) ; un coffre (boutique ou
  quête) fait place en vendant l'objet inutile ordinaire le moins cher ; une pièce légendaire, de panoplie ou forgée n'est jamais
  vendue ni perdue d'office (Valet d'armes compris) ; « Agrandir le sac » passe en tête de « À faire » (it. 2514-2567).
- **33 zones** qui bouclent (forêt, grotte, crypte, marais, forge, désert, toundra, jungle, ruines célestes, abysses, champignonnière, ossuaire, steppe, lagon de corail, glacier, cité engloutie, mines naines, verger, désert de verre, trône des tempêtes…),
  chacune avec sa météo (neige, braises, feuilles, spores, bulles…), **83 monstres** avec leurs propres caractéristiques, **élites dorés** (6 %, or ×4, butin garanti ; dès la zone 3 pendant la première course ; 12 sortes, de Rapide à Acharné),
  **gobelin doré** (rare : s'enfuit au bout de 4 s, or ×15 s'il est attrapé).
- **Quêtes** : 3 contrats à la fois (chasse (dès la Carte du voyageur, it. 2873), élites, proie (une sorte d’élite précise), boss, or, forge, butin rare, événements rares, coffres au trésor, expéditions, transmutation, zone, coups au clic, critiques, sorts lancés, champions, niveaux, gobelins dorés, étoiles filantes), récompenses variées ;
  jamais de quête impossible (forge, transmutation, expéditions ou élites seulement quand c'est faisable)
  (or, coffres, élixirs, potions, œufs, éclats d'étoile).
  Une quête à coffre réclamée (clic, « Tout réclamer », touche R) ouvre son coffre sous les yeux.
- **Familiers** : 24 compagnons (dont le lapin et le phénix, rares ; la Belette donne esquive et riposte, le Colibri des coups au clic plus forts, la Pie-grièche achève les blessés) qui suivent le héros (ceux à découvrir montrent déjà leur bonus), sortent d'œufs (boss, élites, quêtes)
  et montent jusqu'au niveau 10. Les autres partent en **expédition** (30 min, 2 h, 8 h, même jeu fermé) et rapportent
  or, expérience, œufs et objets.
- **Pouvoirs légendaires** : chaque objet légendaire reçoit l'un des 29 pouvoirs uniques (dont l'Appât des champions, qui attire les élites).
- **Bestiaire** : paliers de 10 / 100 / 1 000 / 10 000 victoires par monstre, bonus permanents.
- **Sorts** (Héros > Sorts et attaque) : trois sorts propres à chacun des 20 héros (zones 10, 22, 50), appris et améliorés
  avec de l'or (rangs 1 à 50), lancés tout seuls en combat en plus de l'attaque de base, avec animation, son et icône ;
  chaque sort a ses effets propres, aucun n'en copie un autre (étourdir, ralentir, affaiblir, brûler, empoisonner, vol
  de vie, achever les blessés, critique, écho, accélération, recharge des autres sorts, soin continu, coups multiples,
  perçage) ; les sorts perçants frappent tout de suite les monstres de la file, un de plus tous les 10 rangs. Recharge −10 % tous les 10 rangs
  (`spellCd`). Visibles sur la carte du héros (Aventure) et sur chaque carte de l'onglet Héros ; record du plus gros
  sort dans Statistiques ; succès « Mage de bataille » et « Grimoire complet ». Déblocage Grimoire des sorts : les
  améliore tout seul, ceux du compagnon compris (une fois par minute de jeu, sous 10 % de l'or). Les sorts du compagnon
  ont leur propre cadre en grandes cartes, à droite de ceux du héros (Héros > Sorts et attaque ; valeurs à moitié de
  puissance), et s'apprennent aussi à la main. Gardés à l'ascension.
- **Ascension** (dès la zone 20) : recommencer contre des éclats d'étoile, dépensés dans 16 constellations permanentes
  (attaque, PV, or, expérience, points de talent, zone de départ, temps hors ligne...).
- **Son** (render/sound.js, render/music.js) : effets variés, ambiance de chaque zone (bulles, braises, oiseaux…),
  bande originale de 5 morceaux composés pour le jeu (zones 1-50, 51-100, 101-150, 151-199, puis les mêmes ; la zone 200, le
  combat final, a le sien : « La Dernière Étoile »), autour
  d'un même leitmotiv, du lofi chaud au final épique galactique avec une couleur Terraria ; rendus et masterisés hors du
  jeu (scripts/music/, docs/MUSIQUE.md), lus en boucle sans couture, fondu enchaîné, plus de poids contre les boss.
  Volumes séparés (effets, ambiance, musique, général) dans Réglages > Son, avec ◀ ▶ pour écouter les morceaux et 📌
  pour en garder un quelle que soit la zone ; une bulle nomme chaque nouveau morceau.
- **Cycle jour / nuit** sur la bande, calé sur l'heure de l'ordinateur.
- **Bon voisin** : économie d'énergie (15 images/s, Réglages), bande cachée devant une application en plein écran
  (Windows, menu de l'icône), cinématiques désactivables, ralenti automatique sur batterie et en absence.
- **Design « gravure pixel »** : cadres pixel art à coins entaillés et rivets dorés, fond étoilé, palette nuit violine
  et laiton (sombre) ou parchemin et encre (clair), aucun onglet qui défile à 1920 px (rangées latérales : molette ou glisser).
- **Objets** : 7 emplacements (arme, casque, armure, gants, bottes, anneau, amulette), 44 types, des matériaux
  qui évoluent avec le niveau (bronze → étoile, lin → tissu céleste…), 32 icônes. L'armure, le casque, l'arme et
  les bottes portés changent l'apparence du héros ; plume (casque épique+) et cape (armure épique+) ; halo doré avec un légendaire.
- **Bestiaire** : 83 monstres (dont des variantes recolorées) ; l'onglet présente aussi les panoplies et leurs bonus,
  les capacités des boss, les affixes d'élite et les événements rares (ceux jamais vus restent « ??? » ; chacun vécu donne +1 % d'or pour toujours) ; chaque sorte d'élite vaincue donne +1 % de chances de butin pour toujours.
- **Collection d'objets** : chaque type d'objet trouvé (44) donne un bonus permanent, plus encore en épique et en légendaire.
- **Transmutation** : 3 objets inutiles d'une rareté → 1 objet de la rareté au-dessus.
- **Compétences des monstres** (journée des monstres, 17/11) : chaque famille a la sienne (bond du gluant, piqué de la
  chauve-souris, toile de l'araignée, charge du sanglier, Fouissement du ver…), annoncée par un « ! », jouée sur la bande et
  en mode mini, décrite au survol de la carte du Bestiaire ; les variantes (feu, givre, poison, ombre) y ajoutent un effet ;
  les boss de zone ont celle de leur famille, les lieutenants et le Briseur un pouvoir unique. Chacune est compensée
  (attaque ou PV) : elle change la façon de se battre, pas la force. Plan et bilan : `docs/MONSTRES-VIVANTS.md`.
- **Vie de la file** (17/11) : séries de 7 à 13 monstres ; en attendant, chacun vit selon sa nature (flâne, plane, sautille,
  file par à-coups) et fait son geste d'espèce ; espèces grégaires en meutes (elles se suivent, s'avancent, s'emportent ou
  se dispersent quand l'une tombe) ; proies et prédateurs, sommeil de jour ou de nuit, boss impatient, convoitise des
  légendaires, crainte d'un héros trop fort ; tout s'arrête avec « Effets complets » décoché (render/monlife.js, strip.js).
- **Climat des zones** (17/11) : selon la météo de la zone, le geste au repos change (monlife.js climateGesture) : grelottement
  et buée dans la neige, affaissement et vapeur dans les braises, bulles sous l'eau, éternuements dans les spores, toux dans
  les cendres et la poussière, ébrouement sous les gouttes ; le vent (et l'événement Rafale de vent) ballotte les volants.
  Ordre des règles de la file : vie propre, meute, peur du héros, proies et prédateurs, vent.
- **Lieutenants et Briseur plus coriaces** (17/11, 0.1.6) : il faut plusieurs ascensions et des reliques améliorées ; la
  carte de la zone annonce le vrai boss et ses PV, et la piste « renforce tes reliques » aide le héros bloqué.
- **Mode mini** : le monstre suivant attend au fond de la scène et s'avance de là quand vient son tour.
- **Garde-fou des combats sans fin** : un monstre qu'on ne peut pas tuer et qui ne peut pas tuer s'emporte après 90 s ; le
  héros abandonne après 3 min (game.js) ; `scripts/stall-check.mjs` cherche ces impasses dans des parties avancées.
- **Clic sur le monstre** : coup bonus (25 % de l’attaque, 4 par seconde), aussi en mode mini.
- **Répliques** : le héros parle de temps en temps (légendaire, boss, K.O., record…).
- **Vitesse** (le bonus le plus précieux) : plumes du vent très rares et étoiles filantes à attraper d'un clic
  (permanent), rafale de vent (temporaire), pouvoir « Bottes d'Hermès ». Autres événements rares : pluie d'or, frénésie, corne d'abondance (un objet à chaque victoire), souffle de sagesse (expérience ×3), œil du faucon (tous les coups critiques), marée arcanique (recharges des sorts ×2, si un sort est appris), lune de sang (chaque monstre qui arrive est une élite), ruée des gobelins (un monstre sur trois devient un gobelin doré), nuée d'étoiles (les étoiles filantes se suivent pendant 30 s), lune pâle (chaque monstre arrive avec la moitié de sa vie, boss compris), écho des lames (chaque coup frappe deux fois), source de vie (le héros regagne 4 % de ses PV max par seconde), trésor enfoui (chaque victoire peut laisser un coffre),
  **coffre au trésor** (or, potion, objet rare ou mieux).
- **Boss** : capacités spéciales (enragé, coup dévastateur annoncé, carapace, régénération, miroir, vampirisme, souffle glacé,
  insaisissable, fureur croissante, peau de pierre, malédiction, tenace, crachat venimeux, écailles : la moitié du bonus des critiques), deux à partir de la 2e boucle ; Silence (plus de
  sorts pendant 4 s, toutes les 15 s) réservé aux échos des lieutenants (zones 250, 300, 350). Un boss qui bat le héros s'use : −5 % de PV par défaite
  (30 % au plus, même d'une course à l'autre) jusqu'à ce qu'il soit vaincu. Parade : le Talisman de pureté (pouvoir légendaire) repousse
  la malédiction et le venin.
- **Élites à affixes** : rapide, blindé, vampirique, furieux, givré (ses coups peuvent geler le héros), épineux (renvoie 15 % des dégâts reçus, sans achever le héros), fuyant (esquive 20 % des coups), venimeux (ses coups peuvent empoisonner le héros), régénérant (regagne 3 % de sa vie chaque seconde, sauf s’il brûle ou est empoisonné) ou explosif (inflige au héros 6 % de ses PV max en mourant, sans l’achever), colossal (120 % de PV en plus, coups 40 % plus lents).
- **Champions** : très rares (0,5 %, à partir de la zone 5), aura violette, plus coriaces qu'une élite mais moins que le boss de leur zone (it. 2874), butin épique ou légendaire garanti.
- **Poupouce** (demande d'un joueur ; chat depuis l'it. 1730, demande de Victor) : un chat blanc tacheté de noir, monstre à
  part (Bestiaire), extrêmement rare (un monstre sur 1 000, dès la zone 2) : 100 fois l'or d'un monstre et un objet légendaire
  garanti, aussi pendant l'absence ; il miaule en arrivant, le héros s'en étonne, un succès et une bénédiction du jour (×10)
  lui sont dédiés.
- **Panoplies** : 10 ensembles (dont le Voyageur du vent, axé vitesse, le Traqueur de champions, qui attire les élites, et le Plumage du phénix, qui relève le héros une fois par combat), bonus à 2 et 4 pièces
  (bannière au palier atteint, détail au survol de l'étiquette de la fiche du héros) ; chaque panoplie
  complétée une première fois donne +1 % attaque et +1 % PV pour toujours (Bestiaire : « N / 10 complétées »).
  L'infobulle d'une pièce montre sa progression (« 2 → 3 / 4 ») ; les pièces des panoplies jamais complétées sont
  gardées par la vente de l'inutile et la transmutation (une par emplacement, 6 au plus, les plus avancées d'abord ;
  dit au survol du bouton de vente). Quand le sac peut compléter une panoplie, « À faire » et sa carte du Bestiaire
  (« ◆ N dans le sac ») l'équipent d'un clic ; l'équipement d'avant, s'il était plus fort, est remis aussitôt (le
  bonus de collection reste). Le héros le fête d'une réplique.
- **Forge** : améliorer (+1 à +10) ou réforger les bonus secondaires ; vente automatique jusqu'aux rares.
- **Récompense quotidienne** : série de 7 jours consécutifs, coffre royal le 7e jour.
- **Bénédiction du jour** : un modificateur différent chaque jour (fortune, savoir, grande chasse, vent, furie, rempart, fête des gobelins, trésors : coffres ×3, prodiges : événements rares ×2, ombres : esquive et riposte, champions : champions ×4, géants : +50 % de dégâts contre les boss, élan : premier coup et coups au clic +100 %, sang : vol de vie +5 % et dégâts critiques +25 %, arcanes : sorts rechargés 50 % plus vite), saluée par le héros. Chaque bénédiction vécue donne +1 % d'expérience pour toujours (collection dans Bestiaire > Bénédictions du jour, compte dans Statistiques). Le 16e, le Jour de Poupouce, rend Poupouce dix fois plus fréquent. Le 17e, le Jour des familiers, double le bonus du familier actif ; le 18e, le Jour des étoiles, donne +50 % d'éclats d'étoile à l'ascension.
- **Statistiques** : records, compteurs de l'aventure (dont la collection de panoplies) et liste des succès.
- **10 langues** : anglais (par défaut), chinois simplifié, russe, espagnol, portugais (Brésil), allemand, japonais,
  français, polonais, coréen. Choix dans Réglages (rechargement du panneau), menu de l'icône traduit aussi.
- **Quoi de neuf** : après une mise à jour, une bulle sur la bande ouvre la liste des nouveautés (game/news.js) ;
  relisible à tout moment dans Réglages > Aide (les trois dernières éditions, puis d'autres sous 11 nouveautés) ; « … et N
  nouveautés plus anciennes → » montre la page suivante, jusqu'à la toute première édition (it. 2594), « ← Plus récentes » y ramène ;
  les notes de chaque version distribuée se relisent aussi (Réglages > Version, « ← 0.1.6 » / « 0.1.7 → », it. 2614).
- **Début de partie tranquille** : pendant la toute première course, l'or, l'expérience et le butin des monstres
  ordinaires sont réduits (35 % au départ, plein régime en zone 15 ; `earlyPace`, rules.js) : moins d'objets et de
  déblocages d'un coup. Aucun effet après une ascension ; la progression sur 12 h est inchangée.
- **Carnet de route** (Statistiques) : les grandes étapes datées de la partie (niveaux ronds, records tous les 5
  zones puis tous les 10 après la zone 50, premier légendaire, héros libérés, ascensions), gardées à l'ascension.
- **Onglets progressifs** : un nouveau joueur ne voit que l'Aventure et les Réglages ; les autres onglets s'ouvrent
  selon le record de zone, espacés pour laisser le temps de s'habituer (Talents zone 2, Quêtes 5, Boutique 8, Classe 10,
  Bestiaire 15, Ascension 20, Familiers 25, Compétences 30 ; Statistiques à la zone 3 avec le seul Journal, complet
  à la zone 40, annoncé par une bulle (it. 1729-1743) ; soit de 1 min à plus de 2 h de jeu,
  scripts/tab-pace.mjs), chacun annoncé par une bulle et marqué ✦ jusqu'à la visite.
  Une fois ouvert, un onglet le reste (ascension comprise) ; les parties existantes gardent tout (game/tabs.js).
  En mode mini, l'annonce passe sur la scène. Dans les onglets aussi, l'information vient à son heure : Bestiaire
  (pouvoirs, panoplies, élites une fois rencontrés), Talents (Voie et Maîtrises à l'approche de leur seuil), liens
  « 🔒 déblocage » seulement pour les déblocages proches (5 zones) et une fois la boutique ouverte.
- **Réglages** : sons synthétisés (coupés par défaut), cycle jour/nuit, nombres de dégâts, effets réduits, météo, thème du panneau (sombre par défaut, clair, ou selon Windows),
  position, opacité, démarrage de Windows.
- **Clavier** (panneau ouvert) : 1 … 9, 0, - pour les onglets ; E équiper le meilleur ; V vendre l'inutile ; T transmuter ; R réclamer une quête (toutes avec le Bureau des contrats) ;
  M mode mini ; Entrée confirmer ; Échap fermer.
- **Souris** : double-clic sur un objet pour l'équiper ou le retirer ; ou le glisser du sac vers le panneau Équipement
  (n'importe où : il va à son emplacement), et inversement ; glisser le bouton ⌃ déplace la bande (autre écran, haut ou bas).
- **Accessibilité** : tout se fait au clavier (Tab, flèches, Entrée ; puces du héros et ⓘ focalisables, leur bulle au focus) ;
  rareté lisible sans les couleurs (• •• ••• ★) ; contraste des couleurs ≥ 3:1 dans les deux thèmes (test) ; boutons grisés et
  textes coupés avec une bulle qui dit pourquoi ; lecteurs d'écran : boutons nommés, images décrites, fenêtres de dialogue
  annoncées, langue de la page ; « réduire les animations » du système : effets réduits, pas de vol plein écran (it. 2422-2499).
- **Conseils** : une bulle explique chaque fonctionnalité la première fois qu'elle devient utile.
- **Onglets** : quand ils ne tiennent pas sur une ligne (langue aux mots longs, petit écran), marges resserrées, puis
  sans icônes, puis police réduite ; les icônes seules en dernier recours.
- **Retour** : après une absence, résumé des gains (et des objets restés au sol si le sac était plein), meilleur objet (équipable d'un clic) et « À faire maintenant »
  (quêtes, points, déblocage abordable, œufs, expéditions, sac plein, pièce qui complète une panoplie, éclats d'étoile à placer) : avec les déblocages « tout d'un coup », ces lignes
  s'exécutent d'un clic (✦) et le déblocage payable s'achète directement ; la même liste est dans la carte
  du héros (« À faire (N) », repliable ; deux colonnes au-delà de 8 lignes). Le résumé n'en montre que ce qui tient (8 au plus) ; un lien
  « N autres choses à faire dans la carte du héros → » ouvre la liste entière ; le déblocage à acheter suit les quêtes (it. 2919-2936). Pendant l'absence, les automatismes achetés
  (Maître de forge, Creuset, Grand intendant, Grimoire de l'éveil, Valet d'armes) travaillent aussi, et le résumé le
  dit. Le héros accueille le joueur (« Te revoilà ! »). En rouvrant le panneau, « Depuis ta dernière visite ».
  La bande rappelle le record à battre (ou l'événement en cours et ses secondes restantes) ; une fois tout débloqué,
  l'objectif devient ce record. Le prochain déblocage s'achète d'un clic depuis la carte du héros dès qu'il est payable.
- **Lueur stellaire** : chaque éclat d'étoile gagné renforce le héros pour toujours.
- **Effets** : pièces qui volent jusqu'au compteur d'or, faisceaux de butin selon la rareté, célébration des légendaires,
  bannières (niveau, record de zone, événements, palier de panoplie, boss « enfin vaincu » après un K.O.), répliques
  du héros (événement, revanche, sac plein, retour ; jamais sur le nom d'un boss ni sur les pastilles), sons pour
  chacun de ces moments (option). `render/juice.js`, `render/sound.js`.
- **Journal** (Statistiques > Journal depuis l'it. 1678 ; avant, 5e colonne de l'Aventure, qui a gardé quatre colonnes :
  héros, équipement, sac élargi à 16 cases par rangée, zone ; `ui/log.js`) : les messages répétitifs se cumulent (ventes du sac plein, élites vaincues, défaites : « … (×N) »),
  le Grand intendant résume son travail en une ligne. Chaque ligne indique son heure (it. 1800). Lignes importantes colorées dans les 10 langues, précédées d'un
  symbole (★ ◆ ✦ ✓ ⚠, daltoniens) ; case « Lignes importantes seulement » (it. 1715-1725).

## Scripts

| Commande | Effet |
| --- | --- |
| `npm start` | Lance le jeu en mode dev (boutons de vitesse ×1/×3/×10 dans le panneau) |
| `npm run dev` | Idem + DevTools |
| `npm test` | Tests de la logique de jeu, sans Electron |
| `npm run perf` | Mesure RAM/CPU (bande, panneau ouvert, mini, icône seule) → `perf-report.json` |
| `node --experimental-default-type=module scripts/simulate.js 12 warrior` | Simule un joueur pendant 12 h (équilibrage, records par course) |
| `node --experimental-default-type=module scripts/hero-table.mjs 12` | Records des 20 héros en 12 h (3 graines, en parallèle ; horloge virtuelle : résultats reproductibles) |
| `node scripts/lang-overflow.mjs` | Défilements et textes coupés dans les 10 langues (1920, 1600, 1366, 1280 px ; fin de partie ; interface à 130 %) |
| `npm run selftest` | Parcourt l'interface tout seul (survol, panneau, modes, Quitter) sans toucher à la souris |
| `npm run icons` | Régénère les icônes à partir du pixel art du héros |
| `npm run dist` | Build Windows dans `dist/win-unpacked/` (le dossier à envoyer sur Steam) |

Options de dev (ignorées dans le build final) : `--user-data=<dossier>` (sauvegarde isolée), `--speed=10`, `--open-panel`,
`--mode=strip|mini|icon`, `--tab=talents|shop|class`, `--shot=capture.png`, `--shot-delay=<ms>`, `--exit-after=<s>`, `--ghost` (tests invisibles : fenêtre hors de l'écran, jamais au premier plan, sans icône de notification), `--demo` (déclenche les effets spéciaux),
`--width=1366` (simule un écran plus étroit).

Node 22 est recommandé. Avec Node 20, si le binaire Electron manque après `npm install` : `node --experimental-require-module node_modules/electron/install.js`.

## Organisation

```
src/
  shared/config.js        réglages techniques (App ID Steam, hauteurs, intervalles)
  main/                   processus principal (Node)
    main.js               cycle de vie, IPC, sauvegarde à la fermeture
    strip-window.js       fenêtre : modes bande / mini / icône, placement, clics traversants
    tray.js               icône de notification : menu, infobulle, animation
    save-store.js         save.json + save.backup.json, écriture atomique, récupération
    settings.js           préférences (position, écran, opacité)
    steam.js              steamworks.js : succès + Steam Cloud, no-op sans Steam
    protocol.js           protocole app:// pour le renderer
    perf.js               banc de mesure (dev)
  preload/preload.js      pont sécurisé (window.sillwalker)
  renderer/
    app.js                assemble jeu + rendu + UI, boucles, sauvegarde auto
    game/                 LOGIQUE PURE (aucun DOM) : testable avec Node
      data.js             contenu : raretés, zones, monstres, élites, objets, rythme
      monskills.js        compétences des monstres, par famille (et l'effet de l'élément des variantes)
      classes.js          classes jouables (statistiques, passif, combat à distance)
      talents.js          arbres de talents et effets
      shop.js             catalogue de la boutique et prix
      quests.js           modèles de quêtes et récompenses
      pets.js             familiers
      powers.js           pouvoirs des objets légendaires
      bestiary.js         paliers du bestiaire
      prestige.js         ascension et constellations
      skilltree.js        arbre de compétences (graphe généré à partir de SECTORS)
      skillgraph.js       grand graphe autour de la fleur (régions, voies, synergies, étage multiplicatif)
      npcs.js             PNJ de l'histoire (un par onglet : nom, lieu, répliques)
      events.js           vitesse permanente et événements rares
      bosses.js           capacités spéciales des boss
      relics.js           boss majeurs (zones 50, 100, 150) et les quatre reliques (effets, histoires)
      story.js            histoire : introduction, chroniques, Briseur d'Étoiles (zone 200)
      spells.js           sorts : mécaniques communes et trois sorts par héros
      sets.js             panoplies
      rules.js            formules d'équilibrage
      game.js             simulation + actions du joueur, émet des événements
      state.js            format de sauvegarde + migrations
      achievements.js     succès Steam
    render/               art.js = pixel art, dom.js = briques communes,
                          strip.js = bande (parcours de zone), monlife.js = vie des monstres en attente, mini.js = encart mini, heroart.js = héros
                          assemblés à partir de pièces, equipvis.js = équipement visible, juice.js = effets,
                          sound.js = sons, music.js = lecture des 5 morceaux (assets/music/), trayicons.js = icônes de la zone de notification ;
                          sprites.js = images des personnages (contours et halo dessinés une fois : outlinedFrames,
                          glowFrames ; jamais de filtre CSS permanent sur la bande, voir CLAUDE.md)
    i18n/                 traductions : index.js (t(), langue), keys.js (textes source, ordre fixe),
                          lang/xx.js (traductions par indice), data.js (noms des données, noms d'objets)
    ui/                   panneau de gestion (panel.js + un module par onglet dans ui/tabs/), clics traversants,
                          conseils (hints.js)
```

### Ajouter du contenu

- **Zone** : une entrée dans `ZONES` (`game/data.js`).
- **Monstre** : un nom et ses modificateurs dans `MONSTERS` + 2 images dans `MONSTER_ART` (`render/art.js`). Sa compétence vient de sa famille (`game/monskills.js`) ; une nouvelle famille demande une compétence (un test le vérifie), sa pose dans `strip.js` (`monSkillPose`), son mot et son son.
- **Classe** : une entrée dans `classes.js`, un arbre dans `talents.js` (`TREES`), un sprite dans `CLASS_ART`.
  Mécaniques disponibles pour un passif ou un talent : voir `EFFECTS` (bouclier, poison, serviteur, enchaînement, épines...).
- **Arbre de compétences** : modifier `SECTORS` dans `skilltree.js` (petits nœuds, remarquables, clé de voûte) ;
  la forme du graphe est générée automatiquement.
- **Talent** : une ligne dans la branche voulue de `TREES` (effets possibles : `EFFECTS`).
- **Article de boutique** : `CONSUMABLES`, `CHESTS` ou `UPGRADES` dans `shop.js` (+ l'effet dans `BUFF_EFFECTS` pour un élixir).
- **Quête** : un modèle dans `QUEST_TEMPLATES` (+ son poids dans `WEIGHTS`) et un appel à `questProgress` là où l'action se produit.
- **Familier** : une entrée dans `PETS` (à la fin) + un sprite dans `PET_ART`.
- **Événement rare** (it. 1375) : une entrée À LA FIN de `EVENTS` (events.js) et son effet dans game.js ; une réplique
  `ev_<id>` (strip.js SPEECH), un son `case "<id>"` (sound.js) ; nom et texte à traduire. Le nombre d'événements est cité
  par `steam/store-page.md` (10 langues, vérifié par npm test), les dossiers de presse (`steam/promo`, `scripts/promo`,
  partage Médias) et la checklist Steam.
- **Élite** (it. 1382) : une entrée à la fin de `ELITE_AFFIXES` (data.js), son effet dans game.js, ses paramètres
  chiffrés dans sa description (test de fidélité) ; même compte cité par la page Steam que les événements.
- **Bénédiction du jour** (it. 1378) : toujours À LA FIN de `DAY_MODS` ; vérifier que le calendrier d'aujourd'hui et des
  jours déjà annoncés ne bouge pas (sinon un sel dans `DAY_MOD_SALT`) ; une réplique `dm_<id>` (strip.js).
- Après un de ces ajouts : `scripts/i18n-names.mjs`, lang-overflow (le Bestiaire grandit), une édition « Quoi de neuf ».
- **Pouvoir légendaire** / **constellation** : une ligne dans `POWERS` / `CONSTELLATIONS`.
- **Sort** : une mécanique dans `SPELL_TEMPLATES` (+ son effet dans `strip.spellFx`, son son dans `Sound.spellSound`, son
  dessin dans `SPELL_ART` de `shopart.js`) ; les sorts d'un héros dans `CLASS_SPELLS` (noms à traduire).
- **Onglet du panneau** : un module dans `ui/tabs/` + une entrée dans `TABS` (`ui/panel.js`).
- **Objets** : `ITEM_BASES` / `ITEM_SUFFIXES`.
- **Succès** : une ligne dans `game/achievements.js` (même « API Name » que dans Steamworks).
- **Texte affiché** : l'écrire en français dans `tx("…")`, puis `scripts/i18n-extract.mjs` / `i18n-append.mjs`
  pour l'ajouter à `keys.js`, le traduire dans chaque `i18n/lang/xx.js` et vérifier avec `scripts/i18n-check.mjs xx`.
  Pas de pluriel à la française dans les variables : prévoir une phrase entière par langue.
- **Nouvelle donnée sauvegardée** : valeur par défaut dans `freshState()`, et si besoin une étape dans `migrate()` en augmentant `SAVE_VERSION`.

## Sauvegarde

`%APPDATA%\Sillwalker\save.json`, écrite toutes les 15 s, après chaque action importante et à la fermeture.
`save.backup.json` est rafraîchi au plus toutes les 10 min. Si la principale est illisible, elle est mise de côté
(`save.corrupt-*.json`) et la partie repart du secours. Progression hors ligne : plafonnée à 8 h, aussi appliquée
après une mise en veille du PC.

## Steam : à faire avant la mise en ligne

État d'avancement complet : `steam/checklist.md`.


1. Mettre le vrai App ID dans `src/shared/config.js` (`STEAM_APP_ID`, actuellement 480 = Spacewar).
2. Steamworks → Stats & Achievements (noms dans les 10 langues : `steam/achievements.md`, généré par
   `scripts/steam-achievements.mjs`) : créer `FIRST_BOSS`, `LEVEL_10`, `FIRST_LEGENDARY`, `ZONE_10`, `ZONE_25`,
   `LEVEL_50`, `ELITE_HUNTER`, `FIRST_PURCHASE`, `TALENT_ULTIMATE`, `ASCENSION`, `ASCENSION_5`, `PET_FIRST`, `PETS_ALL`,
   `QUESTS_25`, `GOBLIN`, `POUPOUCE`, `BESTIARY_ALL`, `FULL_SET`, `FEATHER`, `SHOOTING_STAR`, `SPEED_25`, `SKILL_KEYSTONE`, `SKILL_100`, `GRAPH_FIRST`, `GRAPH_FULL`, `MASTER_OF_ALL`, `ALL_CLASSES`,
   `ZONE_50`, `LEVEL_100`, `KILLS_1000`, `KILLS_10000`, `BOSSES_100`, `GOLD_MILLION`, `SPELLS_1000`, `SPELLS_ALL3`, `CRITS_10000`, `BIG_HIT`, `PHOENIX`, `DAILY_7`, `PLAY_10H`, `REFORGE_10`, `EVENTS_10`, `POTIONS_50`, `CHEST`, `CHESTS_50`, `CODEX_HALF`, `CODEX_ALL`, `EXPEDITIONS_10`, `CHAMPION`, `CHAMPIONS_25`, `EXPLOSIVE_25`, `COLOSSAL_25`, `RELENTLESS_25`, `POWERS_ALL`, `TAPS_1000`, `WORLD_TOUR`, `UNLOCK_FIRST`, `UNLOCK_ALL`, `STARBREAKER`, `DUO_FIRST`, `HEROES_10`, `HEROES_ALL`, `CHRONICLER`, `DUO_SYNERGY`, `PURE_HEART`, `EVENTS_ALL`, `BLESSINGS_ALL`, `ELITES_ALL`, `RELIC_FIRST`, `RELICS_ALL`, `RELIC_MAX`, `ECHO_FIRST`, `ECHOES_ALL` (liste dans `game/achievements.js`), puis publier.
3. Steamworks → Steam Cloud : activer, quota (1 fichier, quelques dizaines de Ko suffisent).
   Le jeu écrit `save.json` via l'API Cloud (toutes les 5 min et à la fermeture) et prend la plus récente au lancement.
4. Rich presence : dans Steamworks → Rich Presence, téléverser `steam/richpresence.vdf` (10 langues, généré par
   `node --experimental-default-type=module scripts/steam-richpresence.mjs`). Le jeu renseigne `zone`, `level`,
   `classid` ; la classe s'affiche dans la langue de chaque ami (`{#Class_%classid%}`).
5. Option : `STEAM_RELAUNCH_IF_NEEDED: true` pour que Steam relance le jeu s'il est ouvert hors Steam.
6. Dépôt : envoyer le contenu de `dist/win-unpacked/`, exécutable `Sillwalker.exe`. `npm run dist` puis
   `npm run steam:build` (scripts/steam-upload.mjs) écrit les fichiers SteamPipe (`steam/build/`, hors git) et affiche la
   commande SteamCMD ; `-- --branch=beta` met la version en ligne sur une branche bêta (jamais sur la branche publique).
10. Visuels du magasin (première version, à juger) : `steam/capsules/` (en-tête, petite, principale, verticale,
   bibliothèque, héros 3840×1240 sans texte, logo transparent), dessinés avec les sprites et la police du jeu :
   `node_modules/.bin/electron scripts/steam-capsules/make.js steam/capsules`.
9. Captures du magasin (1920×1080, anglais et français) : `steam/screenshots/` ; partie simulée de 12 h
   (`DUMP=… simulate.js 12 mage`), captures `--release-ui --shot`, posées sur un bureau par `scripts/steam-compose.py`.
8. Page du magasin : descriptions courte et longue dans les 10 langues dans `steam/store-page.md` (BBCode Steam).
7. Signature de code : non configurée (facultative pour Steam, réduit les alertes SmartScreen hors Steam).

Sans Steam (dev ou Steam fermé) le jeu tourne normalement : les succès sont journalisés et renvoyés à Steam au prochain lancement avec Steam.
