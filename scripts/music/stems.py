# Analyse des pistes séparées d'un rendu (STEMS=1 … render.cjs) : niveau moyen (dB) et niveau par octave de chaque
# piste, rapportés à la même référence que le mixage, pour voir qui charge quelle bande.
#   python -I scripts/music/stems.py <rendu.wav>     (lit <rendu>.stem-*.wav à côté)
import sys, glob, wave, os
import numpy as np
OCT = (63, 125, 250, 500, 1000, 2000, 4000, 8000)
def load(p):
    with wave.open(p) as w:
        n, ch = w.getnframes(), w.getnchannels(); raw = w.readframes(n); sr = w.getframerate()
    b = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 3)
    x = (b[:, 0].astype(np.int32) | (b[:, 1].astype(np.int32) << 8) | (b[:, 2].astype(np.int32) << 16))
    x = np.where(x >= 1 << 23, x - (1 << 24), x).astype(np.float64) / (1 << 23)
    return x.reshape(-1, ch).mean(axis=1), sr
def octaves(x, sr):
    spec = np.abs(np.fft.rfft(x * np.hanning(len(x)))) ** 2; fr = np.fft.rfftfreq(len(x), 1 / sr)
    return [10 * np.log10(spec[(fr >= f / 2 ** 0.5) & (fr < f * 2 ** 0.5)].sum() + 1e-20) for f in OCT]
mix, sr = load(sys.argv[1]); ref = max(octaves(mix, sr))
print("piste        rms dB  " + "  ".join(f"{f:>5}" for f in OCT))
rows = [("MIXAGE", mix)] + [(os.path.basename(p).split(".stem-")[1][:-4], load(p)[0]) for p in sorted(glob.glob(sys.argv[1][:-4] + ".stem-*.wav"))]
for name, x in rows:
    rms = 10 * np.log10((x ** 2).mean() + 1e-20)
    print(f"{name:<12} {rms:6.1f}  " + "  ".join(f"{v - ref:5.0f}" for v in octaves(x, sr)))
