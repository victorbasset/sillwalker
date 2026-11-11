// Carte du Rebord (demande de Victor : voir son avancement dans le jeu et dans l'histoire, jolie et interactive).
// Dessin SVG en pixels : 4 rangées de 50 zones, en serpentin, chaque zone un tronçon
// aux couleurs de son décor (ciel + sol, comme la bande). Repères : héros prisonniers (zone de leur boss), chroniques,
// le héros (zone actuelle), le record, et la forteresse du Briseur d'Étoiles en zone 200. Brouillard au-delà du
// record. Survol : infobulle (zone, boss, chronique, héros). Toujours sombre : c'est une image, comme la bande.
import { t as tx, fsp } from "../../i18n/index.js";
import { esc, fmt } from "../../game/format.js";
import { zoneName, zoneDef } from "../../game/rules.js";
import { bossName } from "../../game/bosses.js";
import { recordZone, hasUnlock, UNLOCK_INDEX } from "../../game/unlocks.js";
import { CLASSES, CLASS_UNLOCK_ZONE, isClassUnlocked } from "../../game/classes.js";
import { CHRONICLES, chroniclesUnlocked, FINAL_ZONE, storyWon } from "../../game/story.js";
import { classPortraitURL, dressedPortraitURL, starbreakerURL } from "../../render/sprites.js";
import { relicIconURL } from "../../render/shopart.js";
import { MAJOR_BOSSES, RELICS, RELIC_IDS, RELIC_MAX_LV, hasRelic, relicLevel, relicLevelText } from "../../game/relics.js";
import { heroVisual } from "../../render/equipvis.js";

// 4 rangées de 50 zones : la carte entière tient dans le panneau, large et peu haut (demande 18, sans défilement).
const L = 50;                      // zones par rangée
const STEP = 20, X0 = 92, ROW_H = 54, Y0 = 44, BAND_W = 18, BAND_H = 14;
const W = X0 * 2 + STEP * (L - 1);

/** Position du tronçon de la zone z (serpentin : une rangée sur deux de droite à gauche). */
export function mapPos(z) {
  const r = Math.floor((z - 1) / L), i = (z - 1) % L;
  return { x: X0 + STEP * (r % 2 ? L - 1 - i : i), y: Y0 + r * ROW_H, r };
}

// Zones où une chronique est placée : pas de numéro de zone par-dessus son parchemin.
const CHRON_ZONES = new Set(CHRONICLES.map((c) => c.zone).filter(Boolean));

export class MapTab {
  constructor(game) { this.game = game; }

  badge() { return ""; }

  // Rien d'animé : la carte est redessinée quand l'état change.
  tick() { return false; }

  render(el) {
    const S = this.game.S, rec = Math.max(recordZone(S), S.zone), won = storyWon(S);
    // Carte du voyageur (déblocage) : un clic sur une zone déjà atteinte dans cette course y emmène le héros.
    const travel = hasUnlock(S, "travelMap");
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
      const go = travel && z <= S.best && z !== S.zone;
      const tip = (seen || near ? `${tx("Zone {0}", { 0: z })}${fsp()}: ${zoneName(z)}\n${tx("Boss :")} ${bossName(z)}` : `${tx("Zone {0}", { 0: z })}${fsp()}: ???`) + (go ? `\n${tx("Clic : y aller")}` : "");
      parts.push(`<g class="mz${seen ? "" : near ? " near" : " fog"}${z === S.zone ? " here" : ""}${go ? " go" : ""}" title="${esc(tip)}"${go ? ` data-action="m-go" data-z="${z}"` : ""}>`
        + `<rect x="${x - BAND_W / 2}" y="${y}" width="${BAND_W}" height="${BAND_H / 2}" fill="${d.sky[0]}"/>`
        + `<rect x="${x - BAND_W / 2}" y="${y + BAND_H / 2}" width="${BAND_W}" height="${BAND_H / 2}" fill="${d.g1}"/>`
        + (z % 10 === 0 && !CHRON_ZONES.has(z) ? `<text class="mnum" x="${x}" y="${y + BAND_H + 9}">${z}</text>` : "") + `</g>`);
    }
    // Héros prisonniers : portrait au-dessus de la zone de leur boss (grisé tant qu'ils ne sont pas libérés).
    for (const [cls, z] of Object.entries(CLASS_UNLOCK_ZONE)) {
      const { x, y } = mapPos(z), free = isClassUnlocked(S, cls), name = (CLASSES[cls] || {}).name || cls;
      const tip = free ? tx("Héros libéré : {0}", { 0: name }) : z <= rec + 3 ? tx("Héros prisonnier : {0} (boss de la zone {1})", { 0: name, 1: z }) : tx("Un héros prisonnier attend ici.");
      parts.push(`<g class="mmark${free ? " on" : ""}" title="${esc(tip)}"><rect class="mcage" x="${x - 9}" y="${y - 22}" width="18" height="19"/>`
        + `<image href="${classPortraitURL(cls)}" x="${x - 9}" y="${y - 22}" width="18" height="18" class="${free ? "" : "caged"}"/>`
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
    // Boss majeurs (demande S) : au bout des rangées 1 à 3 (zones 50, 100, 150), la relique qu'ils gardent ;
    // dorée une fois gagnée (survol : boss, effet, et l'histoire de la relique).
    for (const mb of MAJOR_BOSSES) {
      const p = mapPos(mb.zone), r = RELICS[mb.relic], have = hasRelic(S, mb.relic);
      const dir = p.r % 2 ? -1 : 1, ix = dir > 0 ? p.x + 16 : p.x - 43;
      const tip = `${tx(mb.name)}${fsp()}: ${tx("zone {0}", { 0: mb.zone })}\n${have ? "★ " : ""}${tx(r.name)}${fsp()}: ${tx(r.effect)}` + (have ? `\n${tx(r.story)}` : "");
      parts.push(`<g class="mmajor${have ? " won" : ""}" title="${esc(tip)}"><image href="${relicIconURL(mb.relic, 3)}" x="${ix}" y="${p.y - 22}" width="27" height="27"/>`
        + `<text class="mfname" x="${ix + 13}" y="${p.y + BAND_H + 2}" style="text-anchor:middle">${have ? `★ ${relicLevel(S, mb.relic)}/${RELIC_MAX_LV}` : ""}</text></g>`);
    }
    // La forteresse du Briseur d'Étoiles, au bout du Rebord (zone 200).
    const f = mapPos(FINAL_ZONE);
    const ftip = won ? `${tx("Le Briseur d’Étoiles est vaincu")}\n${tx(CHRONICLES.find((c) => c.id === "dawn").text)}` : `${tx("Le Briseur d’Étoiles")}${fsp()}: ${tx("zone {0}", { 0: FINAL_ZONE })}\n${tx("Atteins la zone 200 et terrasse le Briseur d’Étoiles pour rallumer le ciel. Chaque renaissance te rendra plus fort.")}`;
    // Au bout du chemin, dans le sens de la marche (rangée impaire : vers la gauche).
    const fdir = f.r % 2 ? -1 : 1, fx = fdir > 0 ? f.x + 14 : f.x - 56, fcx = fx + 21;
    parts.push(`<g class="mfinal${won ? " won" : ""}" title="${esc(ftip)}"><image href="${starbreakerURL()}" x="${fx}" y="${f.y - 30}" width="42" height="39"/>`
      + `<text class="mfname" x="${fcx}" y="${f.y + BAND_H + 12}">${esc(won ? "★ " + tx("Le ciel rallumé") : tx("Le Briseur d’Étoiles"))}</text></g>`);
    // Record (drapeau) et héros (portrait habillé) ; au-delà de la zone 200, une flèche « au-delà du Rebord ».
    // Reliques (demande S) : les quatre, grisées tant qu'elles ne sont pas gagnées ; survol : effet et histoire.
    const nRel = RELIC_IDS.filter((id) => hasRelic(S, id)).length;
    const relicRow = `<span class="relicrow" title="${esc(tx("Reliques ({0} / {1})", { 0: nRel, 1: RELIC_IDS.length }))}">` + RELIC_IDS.map((id) => {
      const r = RELICS[id], have = hasRelic(S, id);
      const tip = `${tx(r.name)}${fsp()}: ${tx(r.effect)}\n` + (have ? relicLevelText(S, id) + "\n" + tx(r.story) : tx("{0}, zone {1}", { 0: tx(r.from), 1: r.zone }));
      return `<img src="${relicIconURL(id, 2)}" alt="" class="${have ? "on" : ""}" title="${esc(tip)}">`;
    }).join("") + `</span>`;
    const recZ = Math.min(recordZone(S), FINAL_ZONE), rp = mapPos(recZ);
    if (recordZone(S) !== S.zone) parts.push(`<g class="mflag" title="${esc(tx("Record : zone {0}", { 0: recordZone(S) }))}"><rect x="${rp.x - 1}" y="${rp.y - 14}" width="2" height="14"/><rect class="cloth" x="${rp.x + 1}" y="${rp.y - 14}" width="7" height="5"/></g>`);
    if (S.zone <= FINAL_ZONE) {
      const hp = mapPos(S.zone);
      // Une cage voisine (zone ±1) : le héros se hisse au-dessus, relié à sa zone par un trait.
      const lift = Object.values(CLASS_UNLOCK_ZONE).some((z) => Math.abs(z - S.zone) <= 1 && mapPos(z).r === hp.r) ? 24 : 0;
      parts.push(`<g class="mhero" title="${esc(tx("Ton héros : zone {0}", { 0: S.zone }))}">${lift ? `<rect class="mpin" x="${hp.x - 1}" y="${hp.y - lift - 3}" width="2" height="${lift + 3}"/>` : ""}<image href="${dressedPortraitURL(S.cls, heroVisual(S))}" x="${hp.x - 10}" y="${hp.y - 25 - lift}" width="20" height="22"/></g>`);
    } else parts.push(`<g class="mhero" title="${esc(tx("Ton héros : zone {0}", { 0: S.zone }))}"><text class="mbeyond" x="${fcx}" y="${f.y + BAND_H + 26}">${esc(tx("Au-delà du Rebord : zone {0}", { 0: S.zone }))} →</text></g>`);
    const freed = Object.keys(CLASSES).filter((c) => isClassUnlocked(S, c)).length;
    // Tient dans le panneau sans défilement (demande 18) : titre et résumé sur une ligne, explication en infobulle,
    // la carte prend la hauteur restante (elle se réduit pour rentrer en entier ; le détail est dans les infobulles).
    el.innerHTML = `<article class="panel mappanel"><h2 title="${esc(tx("Ton voyage le long du Rebord : les zones parcourues, les héros à libérer, les chroniques, et le Briseur d’Étoiles qui t’attend au bout."))}">${tx("Carte du Rebord")}
      <small class="mapsum">${tx("Record : zone {0}", { 0: fmt(recordZone(S)) })} / ${FINAL_ZONE} · ${tx("Héros libérés : {0}", { 0: `${freed} / ${Object.keys(CLASSES).length}` })} · 📜 ${tx("Chroniques ({0} / {1})", { 0: got.size, 1: CHRONICLES.length })} · ${relicRow}</small></h2>
      ${travel ? `<p class="note tight">${tx("Clique une zone déjà atteinte pour y emmener ton héros.")}</p>` : `<p class="note tight">${tx("Bientôt : la {0} permet d’aller d’un clic dans une zone déjà atteinte (boutique, zone {1}).", { 0: tx(UNLOCK_INDEX.travelMap.name), 1: UNLOCK_INDEX.travelMap.zone })}</p>`}
      <div class="mapwrap"><svg class="rebord" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(tx("Carte du Rebord"))}" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid meet">${parts.join("")}</svg></div></article>`;
  }

  onAction(a, b) {
    if (a === "m-go" && hasUnlock(this.game.S, "travelMap")) this.game.setZone(+b.dataset.z);
  }
}
