# (it. 1184) Bruitages de la bande-annonce, synthétisés (numpy) et calés sur les coupes de la liste des scènes :
# « whoosh » (souffle filtré qui monte) juste avant chaque titre qui frappe (punch), impact grave sur la coupe,
# petit tintement sur chaque carton du logo. Mixés sous la musique : python3 sfx.py <edl.json> <musique.wav> <sortie.wav>
import json, sys, wave
import numpy as np
EDL, MUS, OUT = sys.argv[1:4]
SR = 48000
w = wave.open(MUS); ch = w.getnchannels(); sr = w.getframerate(); assert sr == SR, sr
mus = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32).reshape(-1, ch) / 32768
rng = np.random.default_rng(5)


def whoosh(d=0.45):
    n = int(d * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    # filtre passe-bande glissant (un pôle) : fréquence qui monte de 300 à 4000 Hz
    out = np.zeros(n); y = 0.0
    f = 300 * (4000 / 300) ** (t / d)
    a = np.exp(-2 * np.pi * f / SR)
    for i in range(n):
        y = a[i] * y + (1 - a[i]) * x[i]; out[i] = y
    env = (t / d) ** 2 * (1 - np.clip((t - d * 0.9) / (d * 0.1), 0, 1))
    return out * env / (np.abs(out * env).max() + 1e-9)


def impact(d=0.7):
    n = int(d * SR); t = np.arange(n) / SR
    f = 90 * np.exp(-t * 4) + 38  # coup sourd qui descend
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6)
    click = rng.standard_normal(n) * np.exp(-t * 60) * 0.3
    return body + click


def chime(d=1.6):
    n = int(d * SR); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * t) * a for f, a in [(1318.5, 1), (1975.5, 0.5), (2637, 0.25)])
    return s * np.exp(-t * 3) * np.clip(t / 0.005, 0, 1) / 1.75


fx = np.zeros(len(mus))


def put(sig, t, g):
    i = int(t * SR)
    if i < 0: sig = sig[-i:]; i = 0
    j = min(len(fx), i + len(sig)); fx[i:j] += sig[:j - i] * g


t = 0.0
for sc in json.load(open(EDL))["scenes"]:
    if sc.get("punch"):
        put(whoosh(), t - 0.42, 0.10); put(impact(), t, 0.22)
    if sc["type"] == "card":
        put(chime(), t + 0.25, 0.05)
    t += sc["dur"]
mix = mus + fx[:, None]
peak = np.abs(mix).max()
if peak > 0.98: mix *= 0.98 / peak
o = wave.open(OUT, "wb"); o.setnchannels(ch); o.setsampwidth(2); o.setframerate(SR)
o.writeframes((mix * 32767).astype(np.int16).tobytes()); o.close()
print(OUT, "crête", round(float(peak), 3))
