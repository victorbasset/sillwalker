# (it. 1684, demande de Victor) Musique d'une bande-annonce à partir d'un morceau de la bande originale (WAV de
# scripts/trailer/music.js) : un extrait de N mesures à partir de la mesure S, les M premières étouffées (passe-bas
# 700 Hz : la musique « s'ouvre » quand la caméra plonge vers la bande, comme l'arc de l'it. 1171), fondus, −14 LUFS.
# Le morceau est une boucle sans couture (rendu replié) : un extrait qui dépasse la fin reprend au début.
# Usage : python3 music.py <morceau.wav> <sortie.wav> <ffmpeg> --bpm 96 --start 5 --bars 24 [--muffle 3] [--tail 1.5]
import argparse, subprocess

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("out"); ap.add_argument("ff")
ap.add_argument("--bpm", type=float, default=96); ap.add_argument("--start", type=float, default=5)
ap.add_argument("--bars", type=float, required=True); ap.add_argument("--muffle", type=float, default=3)
ap.add_argument("--tail", type=float, default=1.5)
a = ap.parse_args()
bar = 60 / a.bpm * 4
t0, dur, m = a.start * bar, a.bars * bar + a.tail, a.muffle * bar
# deux copies du morceau bout à bout : l'extrait peut passer la fin de la boucle
fc = (f"[0:a][0:a]concat=n=2:v=0:a=1,atrim=start={t0:.4f}:duration={dur:.4f},asetpts=N/SR/TB,asplit=2[x][y];"
      # le fondu (0,25 s) finit pile sur le temps fort où la musique s'ouvre (avant : il commençait dessus et
      # étouffait la cymbale de l'entrée du thème)
      f"[x]atrim=0:{m:.4f},lowpass=f=700,lowpass=f=700[mu];"
      f"[y]atrim=start={m - 0.25:.4f},asetpts=N/SR/TB[op];"
      f"[mu][op]acrossfade=d=0.25:c1=tri:c2=tri,afade=t=in:st=0:d=0.6,afade=t=out:st={dur - a.tail - 0.5:.4f}:d={a.tail + 0.5:.4f},"
      f"loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[o]")
if a.muffle <= 0:
    fc = (f"[0:a][0:a]concat=n=2:v=0:a=1,atrim=start={t0:.4f}:duration={dur:.4f},asetpts=N/SR/TB,"
          f"afade=t=in:st=0:d=0.6,afade=t=out:st={dur - a.tail - 0.5:.4f}:d={a.tail + 0.5:.4f},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[o]")
subprocess.run([a.ff, "-hide_banner", "-loglevel", "error", "-y", "-i", a.src, "-filter_complex", fc, "-map", "[o]",
                "-ac", "2", "-c:a", "pcm_s16le", a.out], check=True)
print(a.out, round(dur, 2), "s")
