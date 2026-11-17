# Monstres vivants : plan de la journée (16-17 novembre 2026)

Demande de Victor (16/11, 23 h) : « que le Rebord devienne plus vivant, plus naturel, comme si on parcourait vraiment
une zone ; plus ou moins de monstres selon la zone, au hasard ; qu'ils se déplacent, volent dans les airs ; que chaque
monstre et chaque boss ait des compétences visibles qui lui sont propres ; qu'ils paraissent dotés d'une intelligence.
Prends ton temps, de manière qualitative. » Pas de nouveaux monstres.

Point de départ : 84 sortes de monstres sur 37 dessins de base (les autres sont des variantes recolorées), 33 décors.
Chaque zone : exactement 10 monstres plus le boss, chacun planté sur sa place, deux images d'animation ; les volants ne
se balançaient qu'au combat.

## Règles

- Rien d'animé en CSS en permanence sur la bande (≈ 9 points d'un cœur, CLAUDE.md) : tout passe par la boucle d'images
  existante et Actor.move, qui n'écrit qu'à chaque pas de pixel (3 px).
- `npm run perf:linux` après chaque étape visible ; balance (`balance.mjs`, semaine `simulate.js 168`) et `fuzz.mjs`
  dès qu'une compétence change le combat. Une compétence de monstre doit se voir ET se sentir, sans renverser l'équilibre.
- Chaque compétence a un mot ou un effet visible sur la bande, un son court, et sa ligne au Bestiaire (10 langues).

## Étapes

1. **Vie en attente** (it. 1850, fait) : `render/monlife.js`. Selon le dessin de base :
   - marcheurs (`wander`) : vont à un point à ±30 px, s'arrêtent, repartent ; dos au héros quand ils s'éloignent ;
   - volants (`fly`, tout sprite `fly`) : planent, se balancent et dérivent de ±20 px ;
   - sauteurs (`hop` : gluants, crapauds) : un bond toutes les 2,5 à 4 s ;
   - furtifs (`skitter` : rats, araignées, scorpions, scarabées, lézards, serpents, crabes) : courses brèves, arrêts nets ;
   - colosses (`still` : golems, plantes, sylvains, momies, vers) : un pas de loin en loin ;
   - la mimique (`statue`) ne bouge pas : elle se fait passer pour un coffre ;
   - vigilance : à moins de 150 px du héros, le monstre revient à sa place et se tourne vers lui ; les boss gardent la
     leur.
2. **Nombre de monstres variable** (it. 1852, fait) : chaque série compte 7 à 13 monstres, en triangle autour de 10
   (game.js zoneCount, data.js ZONE_COUNT) ; la bande les répartit sur toute sa largeur (strip.js fights()), la pastille de
   zone, le panneau et le mode mini comptent la vraie longueur ; série jamais plus courte que le compte déjà fait
   (rechargement), compte borné à 13 par migrate. balance −0,4 (bruit), early-pace, fuzz, save-fuzz : inchangés.
3. **Compétences propres** (cadre : it. 1853, game/monskills.js : MON_SKILLS par famille, elementOf pour les variantes,
   game.js monSkillTick / elementHit, strip.js monSkillPose et mot, sound.js « monSkill », Bestiaire : infobulle) :
   - gluants (it. 1853) : Bond gluant, toutes les 6 s se ramassent puis bondissent (×1,4) ; lave ×1,2, givre gel 1,5 s,
     toxique venin 3 s ; balance −0,1, early-pace inchangé ;
   - chauves-souris (it. 1854) : Piqué (monte, fond sur le héros, ×1,3) ; le vampire boit la moitié du sang versé ;
   - champignards (it. 1854) : Nuage de spores (gonflent, étourdissent le héros 0,8 s) ; le vénéneux empoisonne ;
   - squelettes (it. 1855) : Os qui se reforment (la première fois, s'écroulent 0,8 s puis se relèvent avec 30 % de leurs
     PV ; PV de départ ÷ 1,3) ;
   - scorpions (it. 1855) : Dard (lèvent la queue, un coup de plus et 1,5 s de venin) ; l'obsidienne maudit en plus ;
   - loups (it. 1856) : Hurlement de meute (se dressent, hurlent : 30 % plus rapides 3 s ; les loups de la file relèvent
     la tête en réponse : premier comportement de groupe) ;
   - golems (it. 1856) : Poing de pierre (se penchent lentement pour armer, abattent ×2,2 esquivable, la bande tremble) ;
   - plantes (it. 1857) : Racines (le héros enlacé 1 s, la plante regagne 3 % de ses PV) ; la mandragore : Cri (étourdi
     0,5 s, silence 2 s) ;
   - spectres (it. 1857) : Intangible (1,5 s à demi effacés, les coups du héros les traversent ; PV compensés) ;
   - diablotins (it. 1858) : Boule de feu (lèvent les bras, lancent ×1,2 ; éclat de la main au héros) ; démon des glaces : gel ;
   - rats (it. 1858) : Grouillement (piaffent, trois morsures éclair de 40 %) ; pestiféré : poison ;
   - araignées (it. 1858) : Toile (attaques du héros −40 % 2 s ; PV compensés) ; la veuve noire mord en plus (venin 1,5 s) ;
   - momies (it. 1859) : Malédiction du tombeau (bras levés, héros maudit 3 s ; la pureté la raccourcit) ;
   - yétis (it. 1859) : Bloc de glace (se frappent la poitrine, jettent ×1,8, gel 1 s) ;
   - harpies (it. 1859) : Rafale de plumes (battent des ailes, quatre plumes de 30 %, une traînée jusqu'au héros) ;
   - élémentaires de feu (it. 1860) : Flambée (grandissent en vibrant, explosent ×1,5, gerbe de flammes) ;
   - crabes (it. 1860) : Carapace (2 s tassés, 30 % des dégâts ; game.js bulwarkFactor : m.guardT) ;
   - chevaliers noirs (it. 1860) : Parade et riposte (bouclier 1,2 s, 80 % bloqués, puis fente ×1,3) ;
   - sylvains (it. 1860) : Enracinement (s'enfoncent, +8 % PV, sève qui monte) ; le pourri empoisonne ;
   - wyvernes (it. 1862) : Souffle (se cabrent, trois coups de 50 %, jet de flammes jusqu'au héros) ;
   - tyrannœils (it. 1862) : Regard pétrifiant (héros figé 1,2 s) ;
   - crapauds (it. 1862) : Coup de langue (un coup de plus, ligne rose) ; grenouille toxique : poison ;
   - serpents (it. 1862) : Frappe éclair (se lovent, deux coups de 60 %) ; givre : gel ;
   - scarabées (it. 1863) : Pince (×0,8 et héros coincé 0,6 s) ; sangliers : Charge (grattent, foncent ×2) ;
     ours : Rugissement (attaques du héros −40 % 2 s) ; orcs : Rage (+40 % 3 s, monsterAttack m.rageK) ;
   - cultistes (it. 1864) : Sacrifice (−10 % de leurs PV, magie de sang ×2) ; guêpes : Vol erratique (zigzag 2 s, un coup
     sur deux raté) ; méduses : Décharge (×1, héros secoué 0,5 s) ; lézards : Embuscade (fondus 1,5 s, surgissent ×1,5) ;
     vers : Fouissement (sous terre 1,5 s, jaillissent ×1,6) ; corbeaux : Bec à l'œil (héros aveuglé 2 s) ;
   - mimiques (it. 1865) : Claquement (dès le début du combat, ×1,8) ; bandits : Vol à la tire (×0,8, volent un peu d'or,
     rendu à leur chute) ; champignons errants : Pollen soporifique ; chevaliers errants : Estoc (×1,6, traverse le
     bouclier) ; gobelins pillards : Bombe (mèche 1 s, ×1,5). **Toutes les familles ont leur compétence (test).**
   - **règle d'équilibre (it. 1854)** : une compétence change la façon de se battre, pas la force (game.js skillBalance) :
     un coup en plus baisse l'attaque de base d'autant, ce qui empêche le héros de frapper baisse les PV d'autant ; poison
     des variantes : 1,5 s. Avant : −1,7 zone avec trois familles ; après : −1,4 / +0,8 / −0,4 (graines 7, 3, 11) ;
   (familles traitées, dans l'ordre de départ : (dessin de base), chacune déclinée pour ses variantes (feu, givre, poison…) :
   gluants, champignons, chauves-souris, squelettes, scorpions, loups, golems, plantes, spectres, diablotins, rats,
   araignées, momies, yétis, harpies, élémentaires, crabes, chevaliers noirs, sylvains, wyvernes, tyrannœils, crapauds,
   serpents, scarabées, sangliers, ours, orcs, cultistes, guêpes, méduses, lézards, vers, mimiques, bandits, corbeaux,
   champignons errants, chevaliers errants, gobelins.
4. **Boss** : une compétence propre à chacun des 33 boss de zone (en plus de leurs capacités tournantes), visible.
5. **Comportements d'ensemble** : meutes (loups qui attendent ensemble), volants qui changent d'altitude, monstres qui
   fuient blessés, réactions à la mort d'un voisin.
