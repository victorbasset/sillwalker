# Reddit : deuxième vague, autour de la 0.1.4 (it. 1541, demande de Victor)

Première vague : `steam/promo-posts.md` (r/incremental_games, forum itch.io, r/pixelart). Post r/incremental_games :
https://www.reddit.com/r/incremental_games/comments/1xtqv6y/sillwalker_my_idle_rpg_lives_above_the_taskbar_so/ Lien du jeu :
https://victor-basset.itch.io/sillwalker

## Pour ne pas se faire bannir

- **Lire la barre latérale et les règles épinglées de chaque sous-forum juste avant de poster** : elles changent
  souvent (jour réservé à l'autopromotion, flair obligatoire, interdiction de l'IA, compte trop jeune…).
- **Un sous-forum tous les 2 ou 3 jours**, jamais le même texte partout le même jour (le filtre anti-spam de Reddit
  repère les liens identiques postés en rafale ; c'est la cause n° 1 des bannissements).
- **Participer ailleurs aussi** : Reddit applique la règle « 9 contributions pour 1 autopromotion ». Commenter quelques
  posts d'autres développeurs dans les jours qui précèdent, répondre aux questions sur les jeux idle.
- **Dire que c'est ton jeu** dès la première phrase (« I made… »). Ne jamais faire voter des amis ni poster depuis
  un deuxième compte.
- **IA** : le jeu a été codé avec un assistant d'IA. Certains sous-forums l'interdisent ou exigent de le dire
  (r/incremental_games : règle 5 ; r/pixelart interdit l'art fait par IA). Là où une règle le demande, coller la
  mention ci-dessous ; là où l'IA est interdite, **ne pas poster**.
- **Rester pour répondre** pendant les 2-3 premières heures : c'est là que le post vit ou meurt.
- **Clés gratuites** : une par message privé, jamais en liste dans un post.
- **Visuel** : poster la vidéo de 30 s (`steam/promo/videos/sillwalker-30s-en.mp4`) ou le GIF
  (`steam/media/reveal.gif`) directement dans le post (pas un lien), le lien itch.io en commentaire ou dans le texte
  selon les règles du sous-forum.

Mention d'IA (là où elle est demandée) :

> The game was designed and directed by me and built with an AI coding assistant (Claude), which wrote most of the
> code, text and translations. The pixel art and the music are drawn and composed by that code (hand-written pixel
> grids, synthesized audio), not made with image or audio generators.

## Ordre conseillé

1. r/playmygame (fait pour ça, le moins risqué)
2. r/IndieGaming
3. r/linux_gaming (version Linux native : un vrai argument là-bas)
4. r/macgaming (version Mac pour puces Apple)
5. r/indiegames
6. r/IndieDev (raconter la fabrication plutôt que vendre)
7. r/incremental_games : pas de nouveau post pour une mise à jour ; un commentaire dans leur fil hebdomadaire
   (« Feedback Friday » ou équivalent épinglé), en citant le post de la première vague.

---

## r/playmygame

**Titre** : I made an idle RPG that lives in a thin strip above your taskbar — looking for feedback

**Texte** :

Hey! I've been working on Sillwalker for a while: your hero walks along the bottom of your screen, fights and loots on
their own while you do other stuff. Clicks go right through the strip, so it never gets in the way. When you feel like
it, you click it and a full panel opens (heroes, talents, a big skill graph, pets, ascensions).

I just pushed version 0.1.4 with champions, a "pale moon" event where every monster spawns at half health, and a
proper duo system where your second hero tanks or covers for the first.

It's free on itch.io for Windows, Linux and Mac. What I'd really like to know: does the first hour feel too slow, too
fast, or about right?

https://victor-basset.itch.io/sillwalker

## r/IndieGaming

**Titre** : My little hero fights monsters above my taskbar while I work (idle RPG, just updated)

**Texte** (la vidéo de 30 s dans le post) :

This started as "what if a tiny pixel guy walked along my taskbar" and kind of got out of hand. It's now a full idle
RPG: 20 heroes to free, fighting in pairs, a skill tree, pets, relics, a small story told in mini cutscenes. The whole
thing stays in a strip at the bottom of the screen and lets your clicks through.

Update 0.1.4 just came out (champions, new rare events, health bars right in the strip). Free on itch, in 10
languages: https://victor-basset.itch.io/sillwalker

Happy to answer anything about how it works!

## r/linux_gaming

**Titre** : Sillwalker, an idle RPG that sits above your taskbar — native Linux build (AppImage)

**Texte** :

I made a small idle RPG that lives in a strip at the bottom (or top) of your screen. There's a native Linux build, an
AppImage, and I actually develop and test it on Ubuntu, so Linux isn't an afterthought here.

Quick notes for Linux folks: the strip is a transparent always-on-top window, clicks pass through it except on the
buttons, and it hides itself when a fullscreen game or video is in front. I'd love to hear how it behaves on different
desktops (GNOME, KDE, tiling WMs…), that's the part I can't test everywhere.

Free on itch: https://victor-basset.itch.io/sillwalker

## r/macgaming

**Titre** : An idle RPG that walks along the bottom of your screen — native Apple Silicon build

**Texte** :

I made Sillwalker, a small idle RPG that runs in a thin strip above the Dock: your hero fights and loots on their
own, clicks go through, and you open the full game whenever you want. There's a native build for Apple Silicon
(M1 and later).

One honest heads-up: it isn't notarized yet, so macOS will warn you the first time. Right-click the app → Open does
the trick. If anything looks off on your Mac, tell me, Mac is the platform I get the least feedback on.

Free on itch: https://victor-basset.itch.io/sillwalker

## r/indiegames

**Titre** : Sillwalker 0.1.4 — an idle RPG for your taskbar, now with champions and a pale moon

**Texte** (une capture ou la couverture `steam/itch/cover-0.1.4.png`) :

Solo dev here. Sillwalker is an idle RPG that runs in a strip above your taskbar, so you can keep it going while you
work or play something else. The new update adds champions with their own quest, four rare events (my favorite: the
pale moon, where every monster arrives at half health for 30 seconds), new elites, new pets, and a duo system where
your companion actually protects you.

Free in early access, Windows / Linux / Mac: https://victor-basset.itch.io/sillwalker

## r/IndieDev

**Titre** : Lessons from making a game that has to share the screen with everything else

**Texte** (raconter, pas vendre ; le lien seulement à la fin) :

My game lives in a 120-pixel strip above the taskbar, always on top, while people work. A few things I learned the
hard way:

- **Performance is a feature.** If the strip eats CPU, people close it. I had to stop using permanent CSS animations
  entirely: a single infinite "floating" animation cost about 9% of a core. Everything moves in one shared frame loop
  now, and the game slows down on its own on battery (and there's a 15 fps power-saving mode).
- **Clicks must go through.** The window ignores the mouse except over buttons, which sounds simple until you have
  tooltips, dragging and popups.
- **Fullscreen means hide.** If a game or a video goes fullscreen, the strip steps aside on its own.
- **Text has to fit in 10 languages at 1280 px.** Russian and German broke my layouts more often than anything else,
  so every UI change gets measured in all languages automatically.

If you're curious what it looks like, it's on itch (free): https://victor-basset.itch.io/sillwalker

## r/incremental_games (fil hebdomadaire, commentaire)

Sillwalker (the idle RPG above your taskbar, [posted here a little while ago](https://www.reddit.com/r/incremental_games/comments/1xtqv6y/sillwalker_my_idle_rpg_lives_above_the_taskbar_so/)) just got update 0.1.4: champions with
their own quest, four new rare events, three new elites, six daily blessings, and a duo system where your melee
companion tanks for a ranged hero (or a ranged one covers a melee hero). Thanks to everyone who sent feedback last
time, a lot of it went into this update. https://victor-basset.itch.io/sillwalker
