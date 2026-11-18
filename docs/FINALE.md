# Zone 200 : musique et cinématique de fin (demande de Victor, 18/11/2026)

> « lorsqu'on est sur la zone 200 qui est la dernière zone je veux une musique épique unique de la même qualité que les
> 4 autres et lorsqu'on le bat je veux une cinématique magnifique où l'on voit notre personnage libéré du Rebord et se
> balader partout sur notre écran »

## Tâches

- [x] 1. Musique « La Dernière Étoile » (it. 2341) : `scripts/music/tracks/finale.js`, ré mineur harmonique puis ré
      majeur, 116 bpm, 68 mesures (2 min 21) ; `assets/music/finale.opus` ; jouée en zone 200 seulement
      (render/music.js : 5e morceau hors du cycle des tranches de 50, Réglages > Son : « zone 200 ») ; MP3 pour Victor :
      Médias/dist-itch/musique/07-la-derniere-etoile-zone-200-v1.mp3.
- [x] 2. (it. 2342 : première version) Cinématique de libération : à la PREMIÈRE victoire sur le Briseur d'Étoiles (story.won), une fenêtre
      transparente plein écran (au-dessus de tout, clics traversants, sans focus ni barre des tâches) où le héros quitte
      la bande, s'élève, se promène sur tout l'écran (trajectoire douce, traînée d'étoiles, quelques bonds), puis revient
      se poser sur la bande ; ≈ 25-30 s, la musique « La Dernière Étoile » en coda. Un clic / Échap la passe. Réglage
      « Cinématiques de l'histoire » respecté ; rejouable depuis la chronique « Le ciel rallumé » (▶).
- [ ] 3. Mise en scène : texte « Libre ! » / « Le ciel est rallumé », étoiles qui se rallument une à une derrière le
      héros, feu d'artifice discret à la fin ; captures et vidéo (strip-clip) pour Victor.
- [ ] 4. Contrôles : autotest (la fenêtre s'ouvre, se ferme seule, rien ne reste au-dessus), --perf pendant la scène,
      mode mini / icône seule, plusieurs écrans (écran de la bande), macOS (niveau « status »).

## Journal

- it. 2342 : main/finale-window.js (fenêtre transparente sur l'écran de la bande, niveau « screen-saver » / « status » sur
  Mac, sans focus, clics traversants, fermée au plus tard après la durée + 4 s), renderer/finale.html + finale.js (canvas :
  ciel qui se rallume, héros habillé ×5-7 en vol sur une courbe passant par les quatre coins, halo doré, traînée et gerbes
  d'étoiles, compagnon qui suit, « Libre ! » / « Le Rebord ne te retient plus. »), app.js playFinale (images du héros, place à
  l'écran ; 1,5 s après la victoire ; ▶ de « Le ciel rallumé » ; « clic : passer » de la bande la ferme). Option de dev
  --finale-shot=f.png --finale-shot-delay=ms. Autotest : la fenêtre s'ouvre puis se ferme seule.
