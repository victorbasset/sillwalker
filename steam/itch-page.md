# Page itch.io : réglages et texte (it. 806)

Mise en ligne décidée par Victor (2026-11-11) : la version actuelle, **1 $**, pour récupérer les premiers avis.

## Réglages de la page (Dashboard → Create new project)

- **Title** : Sillwalker
- **Short description** : An idle RPG that lives on the edge of your screen.
- **Classification** : Games · **Kind of project** : Downloadable
- **Release status** : In development (montre que le jeu évolue et invite aux retours)
- **Pricing** : Paid, 1 $ (case « Allow people to pay more » cochée : certains donneront plus)
- **Uploads** : `dist-itch/Sillwalker-<version>-win.zip`, coché **Windows**
- **Genre** : Role Playing · **Tags** : idle, incremental, pixel-art, rpg, fantasy, relaxing, loot, 2d, singleplayer, desktop
- **Cover image** : `steam/capsules/itch-cover.png` (630×500)
- **Screenshots** : `steam/screenshots/en-*.png` (et `fr-*.png`)
- **Trailer** : à mettre sur YouTube d'abord (`steam/media/trailer-en.mp4`), itch.io ne prend qu'un lien
- **Community** : Comments activés (c'est là qu'arriveront les avis)
- **Visibility** : Draft pour vérifier, puis Public
- Paiements : Settings → Payouts (PayPal ou Stripe) + formulaire fiscal (W-8BEN, comme pour Steam), avant de passer
  en « Paid ».

## Description (anglais, puis français ; itch.io accepte le texte enrichi)

**Sillwalker — early access**

An idle RPG that lives on the edge of your screen. Your hero walks a thin pixel-art strip above the taskbar, fights,
loots and grows stronger while you work, play or watch videos. Clicks go through the strip; a glance is enough, and
the panel opens whenever you like.

- 20 heroes to free, fighting in pairs, each with their own talents and unique spells
- A 144-node skill tree, gear sets, a forge, pets and expeditions
- 30+ regions, 80 monsters, golden elites, fleeing goblins and bosses guarding relics
- A story told through tiny cutscenes, all the way to the Starbreaker… and beyond
- Progress continues while the game is closed (up to 8 hours)
- 10 languages, lofi music, power-saving mode

**This is an early version.** It is complete and playable from start to finish, but still evolving: your feedback in
the comments shapes what comes next. Windows 10/11, 64-bit.

---

**Sillwalker — accès anticipé**

Un RPG idle qui vit au bord de ton écran. Ton héros traverse une fine bande de pixel art au-dessus de la barre des
tâches, combat, ramasse du butin et progresse pendant que tu travailles, joues ou regardes une vidéo. Les clics
traversent la bande ; un coup d'œil suffit, et le panneau s'ouvre quand tu veux.

- 20 héros à libérer, qui combattent en duo, chacun avec ses talents et ses sorts uniques
- Un arbre de 144 compétences, des panoplies, une forge, des familiers et leurs expéditions
- Plus de 30 régions, 80 monstres, élites dorés, gobelins fuyards et boss gardiens de reliques
- Une histoire en petites cinématiques, jusqu'au Briseur d'Étoiles… et au-delà
- Le jeu avance même fermé (jusqu'à 8 heures)
- 10 langues, musique lofi, mode économie d'énergie

**Version en cours de développement.** Le jeu est complet et jouable du début à la fin, mais il évolue encore : tes
avis dans les commentaires décident de la suite. Windows 10/11, 64 bits.

## Download & install instructions (champ itch.io ; bouton HTML de l'éditeur, it. 810)

```html
<p><strong>Windows</strong> — Unzip the archive anywhere, then run <strong>Sillwalker.exe</strong>. Windows may show a SmartScreen warning because the game is not code-signed yet: click <strong>More info → Run anyway</strong>.</p>
<p><strong>macOS</strong> — Unzip the archive and move <strong>Sillwalker.app</strong> to your Applications folder. The game is not notarized by Apple yet, so the first launch is blocked:</p>
<ol>
<li>Double-click Sillwalker, then close the warning.</li>
<li>Open <strong>System Settings → Privacy &amp; Security</strong>, scroll down and click <strong>Open Anyway</strong> next to Sillwalker.</li>
<li>If macOS says the app is "damaged", open <strong>Terminal</strong> and run: <code>xattr -cr /Applications/Sillwalker.app</code>, then launch it again.</li>
</ol>
<p><strong>Linux</strong> — Make the file executable, then run it: <code>chmod +x Sillwalker-*-linux.AppImage</code> then <code>./Sillwalker-*-linux.AppImage</code></p>
<p>Your progress is saved automatically. The game lives in a strip at the edge of your screen: click it to open the panel.</p>
<p>Found a bug? Please mention it in the comments, and attach the file <code>errors.log</code> if it exists: <code>%APPDATA%\Sillwalker</code> on Windows, <code>~/.config/Sillwalker</code> on Linux, <code>~/Library/Application Support/Sillwalker</code> on macOS.</p>
<hr>
<p><strong>Windows</strong> — Décompresse l'archive où tu veux, puis lance <strong>Sillwalker.exe</strong>. Windows peut afficher un avertissement SmartScreen car le jeu n'est pas encore signé : clique sur <strong>Informations complémentaires → Exécuter quand même</strong>.</p>
<p><strong>macOS</strong> — Décompresse l'archive et place <strong>Sillwalker.app</strong> dans le dossier Applications. Le jeu n'est pas encore notarisé par Apple, donc le premier lancement est bloqué :</p>
<ol>
<li>Double-clique sur Sillwalker, puis ferme l'avertissement.</li>
<li>Ouvre <strong>Réglages Système → Confidentialité et sécurité</strong>, descends et clique sur <strong>Ouvrir quand même</strong> à côté de Sillwalker.</li>
<li>Si macOS dit que l'app est « endommagée », ouvre le <strong>Terminal</strong> et tape : <code>xattr -cr /Applications/Sillwalker.app</code>, puis relance-la.</li>
</ol>
<p><strong>Linux</strong> — Rends le fichier exécutable, puis lance-le : <code>chmod +x Sillwalker-*-linux.AppImage</code> puis <code>./Sillwalker-*-linux.AppImage</code></p>
<p>La partie est sauvegardée automatiquement. Le jeu vit dans une bande au bord de l'écran : clique dessus pour ouvrir le panneau.</p>
<p>Un bug ? Signale-le dans les commentaires, et joins le fichier <code>errors.log</code> s'il existe : <code>%APPDATA%\Sillwalker</code> sous Windows, <code>~/.config/Sillwalker</code> sous Linux, <code>~/Library/Application Support/Sillwalker</code> sur macOS.</p>
```

Version Mac : à construire sur un Mac (`npm run dist:itch:mac` → `dist-itch/Sillwalker-<version>-mac-arm64.zip` pour
Apple Silicon et `Sillwalker-<version>-mac.zip` pour Intel), non vérifiée sans Mac (étape « Ouvrir quand même »).
