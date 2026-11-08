// Dictionnaires par langue : { "texte source (français)": "traduction" },
// construits à partir de keys.js (ordre stable) et des fichiers lang/xx.js
// ({ indice: traduction }). Un texte absent garde sa version française.
import { KEYS } from "./keys.js";
import en from "./lang/en.js";
import es from "./lang/es.js";
import pt from "./lang/pt.js";
import de from "./lang/de.js";
import pl from "./lang/pl.js";

const build = (tab) => {
  const d = {};
  for (const i in tab) if (KEYS[i] != null && tab[i] != null && tab[i] !== "") d[KEYS[i]] = tab[i];
  return d;
};
export const DICTS = { en: build(en), es: build(es), pt: build(pt), de: build(de), pl: build(pl) };
