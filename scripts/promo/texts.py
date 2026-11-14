# (it. 1182) Textes de la bande-annonce et des captures : anglais d'origine, traduction choisie par PROMO_LANG=fr.
# Les noms repris du jeu sont ceux de sa traduction française (événements, Rebord).
import os
FR = {
    "Your taskbar has a new neighbour.": "Votre barre des tâches a un nouveau voisin.",
    "A tiny hero walks the edge of your screen.": "Un petit héros marche au bord de votre écran.",
    "Fights. Loots. Grows stronger.": "Il se bat. Il pille. Il grandit.",
    "Meet the folk of the Sill.": "Rencontrez les habitants du Rebord.",
    "Gear up. Forge. Complete your sets.": "Équipez. Forgez. Complétez vos panoplies.",
    "BLOOD MOON": "LUNE DE SANG",
    "every monster turns elite": "chaque monstre devient une élite",
    "STAR SWARM": "NUÉE D’ÉTOILES",
    "catch the falling stars": "attrapez les étoiles filantes",
    "GOBLIN RUSH": "RUÉE DES GOBELINS",
    "golden goblins, everywhere": "des gobelins dorés, partout",
    "RAIN OF GOLD": "PLUIE D’OR",
    "and 10 more rare events": "et 10 autres événements rares",
    "Bosses guard ancient relics.": "Les boss gardent des reliques anciennes.",
    "A 618-node great graph.": "Un grand graphe de 618 nœuds.",
    "Real choices, every milestone.": "De vrais choix à chaque palier.",
    "Grow absurdly powerful.": "Devenez absurdement puissant.",
    "83 monsters. 20 heroes. 14 rare events.": "83 monstres. 20 héros. 14 événements rares.",
    "An idle RPG on the edge of your screen": "Un RPG idle au bord de votre écran",
    "Wishlist on Steam  ·  Play now on itch.io": "Ajoutez-le à vos souhaits sur Steam  ·  Jouez sur itch.io",
    "Windows  ·  macOS  ·  Linux": "Windows  ·  macOS  ·  Linux",
    "An idle RPG that lives on the edge of your screen": "Un RPG idle qui vit au bord de votre écran",
    "A tiny hero. A big adventure.": "Un petit héros. Une grande aventure.",
    "Fights, loots and grows stronger while you work": "Il se bat, pille et grandit pendant que vous travaillez",
    "14 rare events turn the road upside down": "14 événements rares bouleversent la route",
    "Every tab has its inhabitant, met along the road": "Chaque onglet a son habitant, rencontré en chemin",
    "A 618-node great graph": "Un grand graphe de 618 nœuds",
    "Paths to choose, synergies that change how you play": "Des voies à choisir, des synergies qui changent le jeu",
    "Real choices": "De vrais choix",
    "Two bonuses at every mastery milestone": "Deux bonus au choix à chaque palier de maîtrise",
    "Gear up and forge": "Équipez-vous, forgez",
    "Sets, legendary powers, a forge and a merchant": "Panoplies, pouvoirs légendaires, forge et marchand",
    "Collect them all": "Collectionnez-les tous",
    "83 monsters, elites, sets and rare events": "83 monstres, élites, panoplies et événements rares",
    "20 heroes, fighting in pairs": "20 héros, qui combattent en duo",
    "200 zones to cross": "200 zones à traverser",
    "Free the captive heroes, uncover the chronicles": "Libérez les héros captifs, découvrez les chroniques",
    "Catch the falling stars before they fade": "Attrapez les étoiles avant qu’elles s’éteignent",
    "Every comfort is earned": "Chaque confort se mérite",
    "Unlock automations in the shop as you progress": "Débloquez des automatismes en boutique au fil du jeu",
    "Golden goblins, everywhere": "Des gobelins dorés, partout",
}
LANG = os.environ.get("PROMO_LANG", "en")


def tr(s):
    return FR.get(s, s) if LANG == "fr" else s
