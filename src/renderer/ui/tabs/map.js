// Carte du Rebord (demande de Victor : voir son avancement dans le jeu et dans l'histoire, jolie et interactive).
// Dessin SVG en pixels : une rangée par boucle des décors (ZONES.length zones), en serpentin, chaque zone un tronçon
// aux couleurs de son décor (ciel + sol, comme la bande). Repères : héros prisonniers (zone de leur boss), chroniques,
// le héros (zone actuelle), le record, et la forteresse du Briseur d'Étoiles en zone 200. Brouillard au-delà du
// record. Survol : infobulle (zone, boss, chronique, héros). Toujours sombre : c'est une image, comme la bande.
import { t as tx, fsp } from "../../i18n/index.js";
import { esc, fmt } from "../../game/format.js";
import { ZONES } from "../../game/data.js";
import { zoneName, zoneDef } from "../../game/rules.js";
import { bossName } from "../../game/bosses.js";
import { recordZone } from "../../game/unlocks.js";
import { CLASSES, CLASS_UNLOCK_ZONE, isClassUnlocked } from "../../game/classes.js";
import { CHRONICLES, chroniclesUnlocked, FINAL_ZONE, storyWon } from "../../game/story.js";
import { classPortraitURL, dressedPortraitURL, starbreakerURL } from "../../render/sprites.js";
import { heroVisual } from "../../render/equipvis.js";

const L = ZONES.length;            // zones par rangée (une boucle des décors)
const STEP = 20, X0 = 26, ROW_H = 62, Y0 = 52, BAND_W = 18, BAND_H = 14;
const W = X0 * 2 + STEP * (L - 1);

/** Position du tronçon de la zone z (serpentin : une rangée sur deux de droite à gauche). */
export function mapPos(z) {
  const r = Math.floor((z - 1) / L), i = (z - 1) % L;
  return { x: X0 + STEP * (r % 2 ? L - 1 - i : i), y: Y0 + r * ROW_H, r };
}

export class MapTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  // Rien d'animé : la carte est redessinée quand l'état change.
  tick() { return false; }

  render(el) {
    const S = this.game.S, rec = Math.max(recordZone(S), S.zone), won = storyWon(S);
    const rows = Math.floor((FINAL_ZONE - 1) / L) + 1, H = Y0 + (rows - 1) * ROW_H + 50;
    const got = new Set(chroniclesUnlocked(S, recordZone(S)).map((c) => c.id));
    const parts = [];
    // Ciel : une étoile par chronique découverte (le ciel se rallume au fil de l'histoire).
    const seeded = (i) => { const v = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };
    const nStars = won ? 90 : got.size * 6;
    for (let i = 0; i < nStars; i++) parts.push(`<rect class="mstar" x="${Math.round(4 + seeded(i) * (W - 8))}" y="${Math.round(4 + seeded(i + 99) * (H - 8))}" width="${seeded(i + 7) < 0.2 ? 2 : 1}" height="${seeded(i + 7) < 0.2 ? 2 : 1}"/>`);
    // Liaisons entre rangées (au bout de chaque rangée, le chemin descend).
    for (let r = 0; r < rows - 1; r++) {
      const a = mapPos((r + 1) * L), lit = (r + 1) * L < rec;
      parts.push(`<rect class="mlink${lit ? " lit" : ""}" x="${a.x - 2}" y="${a.y + BAND_H / 2}" width="4" height="${ROW_H - BAND_H / 2}"/>`);
    }
    // Tronçons de zone : ciel en haut, sol en bas ; brouillard au-delà du record (les 3 suivantes se devinent).
    for (let z = 1; z <= FINAL_ZONE; z++) {
      const { x, y } = mapPos(z), d = zoneDef(z), seen = z <= rec, near = !seen && z <= rec + 3;
      const tip = seen || near ? `${tx("Zone {0}", { 0: z })}${fsp()}: ${zoneName(z)}\n${tx("Boss :")} ${bossName(z)}` : `${tx("Zone {0}", { 0: z })}${fsp()}: ???`;
      parts.push(`<g class="mz${seen ? "" : near ? " near" : " fog"}${z === S.zone ? " here" : ""}" title="${esc(tip)}">`
        + `<rect x="${x - BAND_W / 2}" y="${y}" width="${BAND_W}" height="${BAND_H / 2}" fill="${d.sky[0]}"/>`
        + `<rect x="${x - BAND_W / 2}" y="${y + BAND_H / 2}" width="${BAND_W}" height="${BAND_H / 2}" fill="${d.g1}"/>`
        + (z % 10 === 0 ? `<text class="mnum" x="${x}" y="${y + BAND_H + 22}">${z}</text>` : "") + `</g>`);
    }
    // Héros prisonniers : portrait au-dessus de la zone de leur boss (grisé tant qu'ils ne sont pas libérés).
    for (const [cls, z] of Object.entries(CLASS_UNLOCK_ZONE)) {
      const { x, y } = mapPos(z), free = isClassUnlocked(S, cls), name = (CLASSES[cls] || {}).name || cls;
      const tip = free ? tx("Héros libéré : {0}", { 0: name }) : z <= rec + 3 ? tx("Héros prisonnier : {0} (boss de la zone {1})", { 0: name, 1: z }) : tx("Un héros prisonnier attend ici.");
      parts.push(`<g class="mmark${free ? " on" : ""}" title="${esc(tip)}"><rect class="mcage" x="${x - 9}" y="${y - 22}" width="18" height="19"/>`
        + `<image href="${classPortraitURL(cls)}" x="${x - 8}" y="${y - 21}" width="16" height="17" class="${free ? "" : "caged"}"/>`
        + (free ? "" : `<path class="mbars" d="M${x - 4} ${y - 22}v19M${x} ${y - 22}v19M${x + 4} ${y - 22}v19"/>`) + `</g>`);
    }
    // Chroniques : parchemin doré une fois découvertes, « ? » avant.
    for (const c of CHRONICLES) {
      if (!c.zone || c.zone === FINAL_ZONE || c.zone === 1) continue;
      const { x, y } = mapPos(c.zone), on = got.has(c.id);
      const tip = on ? `📜 ${tx(c.title)}\n${tx(c.text)}` : tx("Chronique à découvrir en zone {0}", { 0: c.zone });
      parts.push(`<g class="mchron${on ? " on" : ""}" title="${esc(tip)}"><rect x="${x - 6}" y="${y + BAND_H + 2}" width="12" height="9" rx="1"/>`
        + `<text x="${x}" y="${y + BAND_H + 9}">${on ? "≡" : "?"}</text></g>`);
    }
    // La forteresse du Briseur d'Étoiles, au bout du Rebord (zone 200).
    const f = mapPos(FINAL_ZONE);
    const ftip = won ? `${tx("Le Briseur d’Étoiles est vaincu")}\n${tx(CHRONICLES.find((c) => c.id === "dawn").text)}` : `${tx("Le Briseur d’Étoiles")}${fsp()}: ${tx("zone {0}", { 0: FINAL_ZONE })}\n${tx("Atteins la zone 200 et terrasse le Briseur d’Étoiles pour rallumer le ciel. Chaque renaissance te rendra plus fort.")}`;
    parts.push(`<g class="mfinal${won ? " won" : ""}" title="${esc(ftip)}"><image href="${starbreakerURL()}" x="${f.x + 14}" y="${f.y - 30}" width="42" height="39"/>`
      + `<text class="mfname" x="${f.x + 35}" y="${f.y + BAND_H + 12}">${esc(won ? "★ " + tx("Le ciel rallumé") : tx("Le Briseur d’Étoiles"))}</text></g>`);
    // Record (drapeau) et héros (portrait habillé) ; au-delà de la zone 200, une flèche « au-delà du Rebord ».
    const recZ = Math.min(recordZone(S), FINAL_ZONE), rp = mapPos(recZ);
    if (recordZone(S) !== S.zone) parts.push(`<g class="mflag" title="${esc(tx("Record : zone {0}", { 0: recordZone(S) }))}"><rect x="${rp.x - 1}" y="${rp.y - 14}" width="2" height="14"/><rect class="cloth" x="${rp.x + 1}" y="${rp.y - 14}" width="7" height="5"/></g>`);
    if (S.zone <= FINAL_ZONE) {
      const hp = mapPos(S.zone);
      parts.push(`<g class="mhero" title="${esc(tx("Ton héros : zone {0}", { 0: S.zone }))}"><image href="${dressedPortraitURL(S.cls, heroVisual(S))}" x="${hp.x - 10}" y="${hp.y - 25}" width="20" height="22"/></g>`);
    } else parts.push(`<g class="mhero" title="${esc(tx("Ton héros : zone {0}", { 0: S.zone }))}"><text class="mbeyond" x="${f.x + 35}" y="${f.y + BAND_H + 26}">${esc(tx("Au-delà du Rebord : zone {0}", { 0: S.zone }))} →</text></g>`);
    const freed = Object.keys(CLASSES).filter((c) => isClassUnlocked(S, c)).length;
    el.innerHTML = `<article class="panel mappanel"><h2>${tx("Carte du Rebord")} <small>${tx("survole un lieu")}</small></h2>
      <p class="tabintro">${tx("Ton voyage le long du Rebord : les zones parcourues, les héros à libérer, les chroniques, et le Briseur d’Étoiles qui t’attend au bout.")}</p>
      <ul class="mapsum"><li>${tx("Record : zone {0}", { 0: fmt(recordZone(S)) })} / ${FINAL_ZONE}</li><li>${tx("Héros libérés : {0}", { 0: `${freed} / ${Object.keys(CLASSES).length}` })}</li><li>📜 ${tx("Chroniques ({0} / {1})", { 0: got.size, 1: CHRONICLES.length })}</li></ul>
      <div class="mapwrap"><svg class="rebord" viewBox="0 0 ${W + 50} ${H}" role="img" aria-label="${esc(tx("Carte du Rebord"))}" shape-rendering="crispEdges">${parts.join("")}</svg></div></article>`;
  }

  onAction() {}
}
