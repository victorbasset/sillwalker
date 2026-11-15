# Export et mesures d'un morceau rendu (docs/MUSIQUE.md) :
#   python -I scripts/music/master.py <entrée.wav> <sortie_sans_extension> [--loop]
# 1. mesure (ffmpeg ebur128) : volume intégré (LUFS), plage dynamique (LRA), vrai pic ;
# 2. normalise à -16 LUFS, vrai pic ≤ -1 dBTP (loudnorm en deux passes, mode linéaire : pas de pompage) ;
# 3. écrit <sortie>.opus (jeu, 128 kb/s) et <sortie>.mp3 (extraits pour Victor) ;
# 4. énergie par bandes (graves… aigus) et, avec --loop, le raccord de boucle (fin → début : saut d'amplitude).
# Outils dans le venv du dossier temporaire (numpy, imageio-ffmpeg) ; jamais dans le dépôt.
import sys, json, subprocess, wave
import numpy as np
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
src, base = sys.argv[1], sys.argv[2]
loop = "--loop" in sys.argv
TARGET, TP = -16.0, -1.0

def run(args):
    return subprocess.run([FF, "-hide_banner", "-nostats"] + args, capture_output=True, text=True).stderr

# 1-2. loudnorm deux passes
first = run(["-i", src, "-af", f"loudnorm=I={TARGET}:TP={TP}:LRA=11:print_format=json", "-f", "null", "-"])
js = json.loads(first[first.rfind("{"):first.rfind("}") + 1])
af = (f"loudnorm=I={TARGET}:TP={TP}:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:"
      f"measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true")
run(["-y", "-i", src, "-af", af + ",aresample=48000", "-c:a", "libopus", "-b:a", "128k", base + ".opus"])
run(["-y", "-i", src, "-af", af + ",aresample=44100", "-c:a", "libmp3lame", "-b:a", "256k", base + ".mp3"])
after = run(["-i", base + ".opus", "-af", "ebur128=peak=true", "-f", "null", "-"])
summ = after[after.rfind("Summary:"):]
def grab(key):
    for line in summ.splitlines():
        if line.strip().startswith(key):
            return line.split(":")[1].strip()
    return "?"

# 3-4. bandes et raccord : PCM du WAV d'origine
with wave.open(src) as w:
    n, ch, sw, sr = w.getnframes(), w.getnchannels(), w.getsampwidth(), w.getframerate()
    raw = w.readframes(n)
b = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 3)
x = (b[:, 0].astype(np.int32) | (b[:, 1].astype(np.int32) << 8) | (b[:, 2].astype(np.int32) << 16))
x = np.where(x >= 1 << 23, x - (1 << 24), x).astype(np.float64) / (1 << 23)
x = x.reshape(-1, ch)
mono = x.mean(axis=1)
spec = np.abs(np.fft.rfft(mono * np.hanning(len(mono)))) ** 2
fr = np.fft.rfftfreq(len(mono), 1 / sr)
bands = [("sub <60", 20, 60), ("grave 60-250", 60, 250), ("bas-médium 250-1k", 250, 1000), ("médium 1-4k", 1000, 4000), ("aigu 4-10k", 4000, 10000), ("air >10k", 10000, 20000)]
tot = spec[(fr > 20) & (fr < 20000)].sum()
share = {name: round(100 * spec[(fr >= lo) & (fr < hi)].sum() / tot, 1) for name, lo, hi in bands}
side = x[:, 0] - x[:, 1]; width = round(float(np.sqrt((side ** 2).mean()) / (np.sqrt((mono ** 2).mean()) + 1e-12)), 2)
res = {"LUFS": grab("I:"), "LRA": grab("LRA:"), "vrai pic": grab("Peak:"), "bandes %": share, "largeur stéréo (S/M)": width}
if loop:
    k = int(0.005 * sr)
    res["raccord de boucle (saut max)"] = round(float(np.abs(x[-k:].mean(axis=0) - x[:k].mean(axis=0)).max()), 4)
print(json.dumps(res, ensure_ascii=False))
