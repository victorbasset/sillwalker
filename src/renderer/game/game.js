// Simulation du jeu. Aucune référence au DOM ni au canvas : le rendu et
// l'interface s'abonnent aux événements émis (game.on("kill", ...)).
//
// Événements : log(msg), change(), spawn(mon), heroAttack({dmg,crit,mon,extra,first}),
// heroHurt({dmg}), dodge(), riposte({dmg}), potion({heal}), secondWind(),
// kill({mon,gold}), loot({item}), levelUp({lvl}), heroDown(), respawn(), classChange(),
// flee({mon}) (gobelin enfui), egg(), petLevel({pet}), questDone({quest}), ascend(),
// shield({amount}), absorb({amount}), minion({dmg}), event({id}), eventEnd({id}),
// feather({speed}), star(), starCaught({gold}), starMissed(), zoneUp({zone, record}),
// bossSkill({id}), telegraph(), smash({dmg}), bossShieldHit({amount}).
import { itemName } from "../i18n/data.js";
import { t as tx, txn, tr, fsp, lc } from "../i18n/index.js";
import { codexRecord } from "./codex.js";
import { activeDayMod, dayModFor } from "./daymods.js";
import {
  RARITIES, LEGENDARY, DROP_CHANCE, KILLS_PER_ZONE, MAX_PLUS, OFFLINE_CAP_S, LOG_SIZE, ELITE, ELITE_AFFIXES, GOBLIN, MONSTERS, BAG_SIZE,
  SLOT_KEYS, WALK_SPEED, MONSTER_SPEED, SPAWN_DIST, SPAWN_DELAY, SIM_STEP, BAG_MAX,
  CHAMPION,
} from "./data.js";
import {
  xpNeed, rollItem, rollRarity, sellValue, forgeCost, reforgeCost, rerollAffixes, heroStats, heroDps, upgradeDelta,
  zoneDef, zoneName, monsterBase, approachTime,
  itemScore,
} from "./rules.js";
import { CLASSES, classDef, CLASS_UNLOCK_ZONE, isClassUnlocked } from "./classes.js";
import { TALENT_INDEX, cannotLearn, classTalents, talentPointsFree, TREES, branchSpent, MASTERIES } from "./talents.js";
import {
  CONSUMABLES, CHESTS, UPGRADES, BUFF_CAP_S, POTION_MAX, POTION_HEAL, POTION_THRESHOLD, POTION_COOLDOWN,
  SHOP_REFRESH_S, SHOP_SLOTS, consumablePrice, chestPrice, upgradePrice, rerollPrice,
  WORKSHOP, workshopPrice, eggPrice, DEAL_DISCOUNT,
} from "./shop.js";
import { POWERS, POWER_INDEX } from "./powers.js";
import { PETS, PET_INDEX, PET_MAX_LVL, EGG_CHANCE, DUPLICATE_XP, petXpNeed, rollPet, EXPEDITIONS } from "./pets.js";
import { ASCEND_MIN_ZONE, CONSTELLATIONS, shardsFor, constellationCost, prestigeEffects } from "./prestige.js";
import { QUEST_SLOTS, makeQuest, questDone, questRerollPrice , guildRank, guildRankName } from "./quests.js";
import { SKILL_TREE, canTakeSkill, ascensionSkillPoints, skillPointsFree, activeSkillSet } from "./skilltree.js";
import { EVENTS, FEATHER, STAR, SPEED_CAP, CHEST } from "./events.js";
import { bossMechanics, bossName, FURY } from "./bosses.js";
import { rand, rnd, pick, shuffled } from "./util.js";
import { freshState } from "./state.js";
import { fmt } from "./format.js";
import { UNLOCK_INDEX, hasUnlock, unlockAvailable, nextUnlock, recordZone } from "./unlocks.js";

const TAP_DMG = 0.25, TAP_INTERVAL = 0.25; // coup bonus au clic sur le monstre

const AUTO_POTIONS = 5; // stock visé par l'achat automatique de potions

const UPGRADE_EPS = 0.005;
const BURN_TIME = 3;

export class Game {
  constructor(state) {
    this.listeners = {};
    this.load(state || freshState());
  }

  /* ---------- Événements ---------- */
  on(type, fn) { (this.listeners[type] ||= []).push(fn); return () => this.off(type, fn); }
  off(type, fn) { this.listeners[type] = (this.listeners[type] || []).filter((f) => f !== fn); }
  emit(type, payload) { for (const fn of this.listeners[type] || []) fn(payload); }
  changed() { this._upgrade = null; this.emit("change"); }

  load(state) {
    this.S = state;
    this._stats = null;
    this.R = { mode: "walk", hp: 0, mon: null, corpse: null, spawnT: 1, atkT: 0, scroll: 0, time: 0, deadT: 0, deaths: 0,
      legT: 0, legDur: 1, lineup: null, lineupZone: 0, firstHit: true, windUsed: false, potionCd: 0,
      events: {}, star: null, starT: STAR.minS + rand() * (STAR.maxS - STAR.minS) };
    this.startLeg(1);
    this.R.hp = this.stats().hp;
    this.ensureQuests();
    this.changed();
  }

  /* ---------- Lecture ---------- */
  stats() { return (this._stats ||= heroStats(this.S)); }
  invalidateStats() { this._stats = null; }
  classDef() { return classDef(this.S.cls); }
  zoneName(z = this.S.zone) { return zoneName(z); }
  zoneDef(z = this.S.zone) { return zoneDef(z); }
  xpNeed() { return xpNeed(this.S.lvl); }
  upgradeDelta(it) { return upgradeDelta(this.S, it); }
  isUpgrade(it) { return this.upgradeDelta(it) > UPGRADE_EPS; }
  hasUpgrade() { return this.S.bag.some((it) => this.isUpgrade(it)); }
  /** Version mise en cache (recalculée après chaque changement d'état). */
  hasUpgradeCached() { return (this._upgrade ??= this.hasUpgrade()); }
  talentPointsFree() { return talentPointsFree(this.S); }
  bagFull() { return this.S.bag.length >= this.S.bagSize; }
  findBagItem(id) { return this.S.bag.find((i) => i.id === id) || null; }

  /* ---------- Parcours de la zone ----------
     Une zone = KILLS_PER_ZONE monstres puis le boss. Le trajet entre deux
     combats est une « étape » (leg) : délai d'apparition + approche. */
  /** Monstres de la zone en cours, dans l'ordre (hors boss) : [{ type, elite }]. */
  lineup() {
    const R = this.R;
    if (!R.lineup || R.lineupZone !== this.S.zone) {
      const Z = zoneDef(this.S.zone);
      const dm = activeDayMod(this.S);
      // Les monstres de la zone sont tirés « comme des cartes » : tous passent avant qu'un type revienne.
      let deck = [], last = null;
      const draw = () => {
        if (!deck.length) { deck = shuffled(Z.monsters); if (deck.length > 1 && deck[deck.length - 1] === last) deck.unshift(deck.pop()); }
        return (last = deck.pop());
      };
      R.lineup = Array.from({ length: KILLS_PER_ZONE }, () => (rand() < GOBLIN.chance * (dm?.goblin || 1)
        ? { type: "goblin", elite: false, goblin: true }
        : (() => {
          const champion = rand() < CHAMPION.chance, elite = champion || rand() < ELITE.chance * (dm?.elite || 1);
          return { type: draw(), elite, champion, affix: elite ? pick(Object.keys(ELITE_AFFIXES)) : null };
        })()));
      R.lineupZone = this.S.zone;
    }
    return R.lineup;
  }
  startLeg(spawnT) {
    const R = this.R;
    R.spawnT = spawnT;
    R.legT = 0;
    R.legDur = spawnT + SPAWN_DIST / (WALK_SPEED + MONSTER_SPEED);
  }
  /** Avancement (0..1) vers le prochain combat ; 1 pendant le combat. */
  legProgress() { return this.R.mode === "walk" ? Math.min(1, this.R.legT / this.R.legDur) : 1; }

  /**
   * Le journal est enregistré en texte déjà traduit : après un changement de langue, on
   * repart d'un journal neuf plutôt que de mélanger deux langues. (Ancienne sauvegarde : rien n'est effacé.)
   */
  syncLogLang(lang) {
    const S = this.S;
    if (S.logLang && S.logLang !== lang && S.log.length) S.log = [tx("Langue changée : le journal reprend ici.")];
    S.logLang = lang;
  }

  log(msg) {
    const L = this.S.log;
    L.unshift(msg);
    if (L.length > LOG_SIZE) L.length = LOG_SIZE;
    this.emit("log", msg);
  }

  /* ---------- Simulation ---------- */
  /** Avance la simulation de `dt` secondes (découpées en petits pas). */
  advance(dt) {
    while (dt > 0) {
      const st = Math.min(dt, SIM_STEP);
      this.step(st);
      dt -= st;
    }
    this.autoClaimQuests();
  }

  tickBuffs(dt) {
    const B = this.S.buffs;
    for (const id in B) {
      if (B[id] <= 0) continue;
      B[id] -= dt;
      if (B[id] <= 0) {
        B[id] = 0;
        this.invalidateStats();
        const c = CONSUMABLES.find((x) => x.id === id);
        this.log((c ? c.name : id) + tx(" : effet terminé."));
        this.changed();
      }
    }
  }

  step(dt) {
    const R = this.R, hs = this.stats();
    R.time += dt;
    this.S.stats.playTime = (this.S.stats.playTime || 0) + dt;
    this.tickBuffs(dt);
    if (R.potionCd > 0) R.potionCd -= dt;
    if (R.corpse) {
      R.corpse.t -= dt;
      R.corpse.mon.dist -= WALK_SPEED * dt;
      if (R.corpse.t <= 0) R.corpse = null;
    }
    this.tickEvents(dt);
    if (R.mode === "walk") {
      // La vitesse de déplacement accélère tout le trajet (apparition + approche).
      const mv = this.moveMul();
      R.scroll += WALK_SPEED * dt * mv;
      R.legT += dt * mv;
      R.hp = Math.min(hs.hp, R.hp + hs.hp * hs.regen / 100 * dt);
      if (!R.mon) {
        R.spawnT -= dt * this.moveMul();
        if (R.spawnT <= 0) {
          R.mon = this.makeMonster(this.S.kills >= KILLS_PER_ZONE);
          this.emit("spawn", R.mon);
        }
      } else {
        R.mon.age += dt;
        R.mon.dist -= (WALK_SPEED + MONSTER_SPEED) * dt * this.moveMul();
        if (R.mon.dist <= 0) {
          R.mon.dist = 0; R.mode = "fight"; R.atkT = 0.25;
          R.firstHit = true; R.windUsed = false; R.combo = 0; R.minionT = 0; R.hits = 0; R.frozen = 0;
          R.shield = hs.shield > 0 ? hs.hp * hs.shield / 100 : 0;
          if (R.shield > 0) this.emit("shield", { amount: R.shield });
        }
      }
    } else if (R.mode === "fight" && R.mon) {
      const m = R.mon;
      m.age += dt;
      // Attaques du héros
      if (R.frozen > 0) R.frozen -= dt;
      R.atkT -= dt * ((R.events.frenzy || 0) > 0 ? 2 : 1) * (R.frozen > 0 ? 0.6 : 1);
      if (R.atkT <= 0) {
        R.atkT = 1 / (1 + hs.spd / 100);
        this.heroStrike(m, hs, R.firstHit, false);
        R.firstHit = false;
        if (m.hp <= 0) { this.killMonster(); return; }
        if (hs.doubleShot > 0 && rand() < hs.doubleShot / 100) {
          this.heroStrike(m, hs, false, true);
          if (m.hp <= 0) { this.killMonster(); return; }
        }
      }
      // Brûlure, poison, serviteur
      if (m.burnT > 0) {
        const t = Math.min(dt, m.burnT);
        m.burnT -= dt;
        m.hp -= m.burnDps * t;
        if (m.hp <= 0) { this.killMonster(); return; }
      }
      if (m.poisonT > 0) {
        const t = Math.min(dt, m.poisonT);
        m.poisonT -= dt;
        m.hp -= hs.atk * hs.poison / 100 * m.poisonStacks * t;
        if (m.poisonT <= 0) m.poisonStacks = 0;
        if (m.hp <= 0) { this.killMonster(); return; }
      }
      if (hs.minion > 0) {
        m.hp -= hs.atk * hs.minion / 100 * dt;
        R.minionT += dt;
        if (R.minionT >= 1) { R.minionT -= 1; this.emit("minion", { dmg: hs.atk * hs.minion / 100 }); }
        if (m.hp <= 0) { this.killMonster(); return; }
      }
      // Le gobelin doré ne se bat pas : il s'enfuit s'il survit assez longtemps.
      if (m.goblin) {
        m.fleeT -= dt;
        if (m.fleeT <= 0) this.monsterFlees();
        return;
      }
      // Capacités spéciales des boss
      if (m.boss && this.bossTick(m, hs, dt)) return;
      // Attaques du monstre
      m.t -= dt;
      if (m.t <= 0) {
        m.t = m.interval;
        if (this.monsterAttack(m, hs, 1)) return;
      }
    } else if (R.mode === "dead") {
      R.deadT -= dt;
      if (R.deadT <= 0) { R.hp = hs.hp; R.mode = "walk"; this.startLeg(1); this.emit("respawn"); }
    }
  }

  /** Un coup du monstre (mult > 1 : coup spécial). Renvoie true si le combat est fini. */
  monsterAttack(m, hs, mult) {
    const R = this.R;
    if (hs.dodge > 0 && rand() < hs.dodge / 100) { this.emit("dodge"); return false; }
    let dmg = m.atk * mult * rnd(0.85, 1.15) * 40 / (40 + hs.def);
    if (hs.thorns > 0) {
      m.hp -= dmg * hs.thorns / 100;
      if (m.hp <= 0) { this.killMonster(); return true; }
    }
    if (R.shield > 0) {
      const absorbed = Math.min(R.shield, dmg);
      R.shield -= absorbed; dmg -= absorbed;
      this.emit("absorb", { amount: absorbed });
    }
    R.hp -= dmg;
    if (dmg > 0) this.emit(mult > 1 ? "smash" : "heroHurt", { dmg });
    if (m.affix === "vampiric" && dmg > 0) m.hp = Math.min(m.max, m.hp + dmg * ELITE_AFFIXES.vampiric.lifesteal);
    if (dmg > 0 && m.mech && m.mech.includes("drain")) m.hp = Math.min(m.max, m.hp + dmg * 0.4);
    if (hs.riposte > 0 && R.hp > 0 && rand() < hs.riposte / 100) {
      const rd = hs.atk * 0.5;
      m.hp -= rd;
      this.emit("riposte", { dmg: rd });
      if (m.hp <= 0) { this.killMonster(); return true; }
    }
    if (R.hp > 0 && R.hp < hs.hp * POTION_THRESHOLD) this.drinkPotion(hs);
    if (R.hp <= 0) {
      if (hs.secondWind && !R.windUsed) {
        R.windUsed = true;
        R.hp = hs.hp * 0.3;
        this.emit("secondWind");
      } else { this.heroDown(); return true; }
    }
    return false;
  }

  /** Capacités du boss (voir bosses.js). Renvoie true si le combat est fini. */
  bossTick(m, hs, dt) {
    const mech = m.mech || [];
    if (mech.includes("enrage") && !m.enraged && m.hp < m.max * 0.3) {
      m.enraged = true; m.interval *= 0.6; m.atk *= 1.2;
      this.emit("bossSkill", { id: "enrage" });
    }
    if (mech.includes("shell") && !m.shelled && m.hp < m.max * 0.5) {
      m.shelled = true; m.shell = m.max * 0.25;
      this.emit("bossSkill", { id: "shell" });
    }
    if (mech.includes("regen") && !(m.burnT > 0) && !(m.poisonT > 0) && m.hp < m.max) {
      m.hp = Math.min(m.max, m.hp + m.max * 0.02 * dt);
    }
    if (mech.includes("frost")) {
      m.frostT = (m.frostT ?? 5) - dt;
      if (m.frostT <= 0) { m.frostT = 7; this.R.frozen = 3; this.emit("bossSkill", { id: "frost" }); }
    }
    if (mech.includes("fury") && (m.fury || 0) < FURY.max) {
      m.furyT = (m.furyT ?? FURY.every) - dt;
      if (m.furyT <= 0) { m.furyT = FURY.every; m.fury = (m.fury || 0) + 1; m.interval *= FURY.speed; this.emit("bossSkill", { id: "fury", n: m.fury }); }
    }
    if (mech.includes("mirror")) {
      m.mirrorT = (m.mirrorT ?? 6) - dt;
      if (m.mirrorT <= 0 && !(m.mirror > 0)) { m.mirror = 2; this.emit("bossSkill", { id: "mirror" }); }
      if (m.mirror > 0) { m.mirror -= dt; if (m.mirror <= 0) { m.mirror = 0; m.mirrorT = 8; } }
    }
    if (mech.includes("smash")) {
      const before = m.smashT;
      m.smashT -= dt;
      if (before > 1 && m.smashT <= 1) this.emit("telegraph");
      if (m.smashT <= 0) {
        m.smashT = 6;
        this.emit("bossSkill", { id: "smash" });
        if (this.monsterAttack(m, hs, 2.5)) return true;
      }
    }
    return false;
  }

  /**
   * Clic du joueur sur le monstre combattu : coup bonus (25 % de l'attaque,
   * 4 par seconde au plus). Récompense le jeu actif sans rendre l'inactif inutile.
   */
  tapMonster() {
    const R = this.R, m = R.mon;
    if (R.mode !== "fight" || !m || m.hp <= 0) return false;
    if (R.time - (R.lastTap ?? -1) < TAP_INTERVAL) return false;
    R.lastTap = R.time;
    const hs = this.stats();
    let dmg = hs.atk * TAP_DMG * (1 + (hs.tapDmg || 0) / 100) * rnd(0.9, 1.1);
    if (m.boss) dmg *= 1 + hs.bossDmg / 100;
    if (m.shell > 0) { const a = Math.min(m.shell, dmg); m.shell -= a; dmg -= a; this.emit("bossShieldHit", { amount: a }); }
    m.hp -= dmg;
    this.S.stats.taps = (this.S.stats.taps || 0) + 1;
    this.emit("tap", { dmg, mon: m });
    if (m.hp <= 0) this.killMonster();
    return true;
  }

  heroStrike(m, hs, first, extra) {
    if (m.mech && m.mech.includes("evasive") && rand() < 0.2) { this.emit("bossDodge"); return; }
    // Iaijutsu (samouraï) : chaque 4e coup est un critique garanti renforcé.
    const iai = !extra && hs.iai > 0 && (this.R.hits = (this.R.hits || 0) + 1) % 4 === 0;
    const crit = iai || rand() < hs.crit / 100;
    let dmg = hs.atk * rnd(0.9, 1.1) * (crit ? hs.critDmg : 1);
    if (iai) dmg *= 1 + hs.iai / 100;
    if (m.boss) dmg *= 1 + hs.bossDmg / 100;
    if (hs.execute > 0 && m.hp < m.max * 0.3) dmg *= 1 + hs.execute / 100;
    if (first && hs.firstStrike > 0) dmg *= 1 + hs.firstStrike;
    if (extra) dmg *= 0.6;
    if (hs.combo > 0) { dmg *= 1 + hs.combo / 100 * Math.min(this.R.combo, 10); this.R.combo++; }
    if (m.shell > 0) {
      const a = Math.min(m.shell, dmg);
      m.shell -= a; dmg -= a;
      this.emit("bossShieldHit", { amount: a });
    }
    m.hp -= dmg;
    if (m.mirror > 0 && dmg > 0) { // miroir du boss : renvoie une partie des dégâts, sans achever le héros
      const back = Math.min(dmg * 0.4, Math.max(0, this.R.hp - 1));
      if (back > 0) { this.R.hp -= back; this.emit("mirrorHit", { dmg: back }); }
    }
    if (dmg > (this.S.stats.maxHit || 0)) this.S.stats.maxHit = Math.round(dmg);
    if (hs.poison > 0) { m.poisonStacks = Math.min(5, (m.poisonStacks || 0) + 1); m.poisonT = 4; }
    if (hs.lifesteal > 0) this.R.hp = Math.min(hs.hp, this.R.hp + dmg * hs.lifesteal / 100);
    if (hs.burn > 0) { m.burnDps = hs.atk * hs.burn / 100; m.burnT = BURN_TIME; }
    this.emit("heroAttack", { dmg, crit, mon: m, extra, iai, first: first && hs.firstStrike > 0 });
  }

  drinkPotion(hs) {
    const R = this.R;
    if (this.S.potions <= 0 || R.potionCd > 0) return;
    this.S.potions--;
    this.S.stats.potionsUsed = (this.S.stats.potionsUsed || 0) + 1;
    R.potionCd = POTION_COOLDOWN;
    const heal = hs.hp * POTION_HEAL;
    R.hp = Math.min(hs.hp, R.hp + heal);
    this.emit("potion", { heal });
    if (this.S.potions === 0) this.log(tx("Dernière potion de soin bue : passe à la boutique !"));
    this.changed();
  }

  makeMonster(boss) {
    const Z = zoneDef(this.S.zone);
    const slot = boss ? { type: Z.boss, elite: false } : this.lineup()[Math.min(this.S.kills, KILLS_PER_ZONE - 1)];
    const b = monsterBase(this.S.zone, boss, slot.type, slot.elite, !boss && slot.champion);
    const mon = Object.assign(b, { type: slot.type, boss, elite: slot.elite, champion: !boss && !!slot.champion, goblin: !!slot.goblin, fleeT: slot.goblin ? GOBLIN.flee : 0,
      max: b.hp, t: 0.7, dist: SPAWN_DIST, age: 0, burnT: 0, burnDps: 0, poisonT: 0, poisonStacks: 0,
      mech: boss ? bossMechanics(this.S.zone) : null, smashT: 6, shell: 0, affix: slot.affix || null,
      name: boss ? bossName(this.S.zone) : null });
    this.applyAffix(mon);
    return mon;
  }

  /** Affixe d'élite : modifie les statistiques du monstre (le vampirisme agit au combat). */
  applyAffix(m) {
    const a = m.affix && ELITE_AFFIXES[m.affix];
    if (!a) return;
    if (a.interval) m.interval *= a.interval;
    if (a.hp) { m.hp = Math.round(m.hp * a.hp); m.max = m.hp; }
    if (a.atk) m.atk *= a.atk;
  }

  gainXp(x) {
    const S = this.S;
    S.xp += x;
    let up = false;
    while (S.xp >= xpNeed(S.lvl)) { S.xp -= xpNeed(S.lvl); S.lvl++; up = true; }
    if (up) {
      this.invalidateStats();
      this.R.hp = this.stats().hp;
      this.emit("levelUp", { lvl: S.lvl });
      if (hasUnlock(S, "autoLevel")) {
        if (S.settings.autoTalents) this.autoSpendTalents();
        if (S.settings.autoSkills) this.autoSpendSkills();
      }
      this.log(tx("Ton héros passe au niveau ") + S.lvl + tx(" (+1 point de talent)."));
      this.changed();
    }
  }

  /** Nouvel objet obtenu (combat, hors ligne, coffre). */
  newItem(minRarity, zone = this.S.zone) {
    const it = this.decorate(rollItem(this.S.nextId++, zone, minRarity));
    this.S.stats.items = (this.S.stats.items || 0) + 1;
    if (it.r === LEGENDARY) this.S.stats.legendaries++;
    const newPower = it.power && !(this.S.powersSeen || {})[it.power];
    const fresh = codexRecord(this.S, it);
    if (newPower) this.log(`${tx("Nouveau pouvoir légendaire découvert : {0} !", { 0: POWER_INDEX[it.power]?.name || it.power })}`);
    if (fresh) { this.invalidateStats(); if (fresh === "new") { this.log(`${tx("Nouveau type d’objet pour la collection : {0} !", { 0: tr((it.base || "").split(":")[1]) || itemName(it) })}`); this.emit("codex", { item: it }); } }
    return it;
  }

  /** Ajoute un pouvoir aux objets légendaires. */
  decorate(it) {
    if (it.r === LEGENDARY && !it.power) it.power = pick(POWERS).id;
    return it;
  }

  /** Ventes automatiques regroupées en une seule ligne du journal (au lieu d'une ligne par objet). */
  logSale(kind, label, v) {
    const L = this.S.log, R = this.R;
    if (R.saleLine && R.saleLine.kind === kind && L[0] === R.saleLine.text) {
      R.saleLine.n++; R.saleLine.gold += v;
      L[0] = R.saleLine.text = `${label}${fsp()}${tx(": {0} (+{1} or).", { 0: R.saleLine.n, 1: fmt(R.saleLine.gold) })}`;
      this.emit("log", L[0]);
      return;
    }
    R.saleLine = { kind, n: 1, gold: v, text: `${label}${fsp()}${tx(": 1 (+{0} or).", { 0: fmt(v) })}` };
    this.log(R.saleLine.text);
  }

  addToBag(it, quiet) {
    const S = this.S, r = RARITIES[it.r];
    if (S.autoSell[r.id] && hasUnlock(S, "autoSell")) {
      const v = sellValue(it); S.gold += v;
      if (!quiet) this.logSale("auto", tx("Vendus automatiquement"), v);
      return false;
    }
    if (this.bagFull()) {
      const v = sellValue(it); S.gold += v;
      if (!quiet) this.logSale("full", tx("Sac plein, objets vendus"), v);
      return false;
    }
    S.bag.push(it);
    if (hasUnlock(S, "armsValet") && S.settings.autoEquipDrops !== false && this.isUpgrade(it)) { this.equip(it); if (!quiet) this.log(tx("Valet d’armes : ") + itemName(it) + tx(" équipé.")); return true; }
    if (!quiet && it.r >= 2) this.log(tx("Butin ") + r.name.toLowerCase() + fsp() + ": " + itemName(it) + fsp() + "!");
    this.changed();
    return true;
  }

  killMonster() {
    const S = this.S, R = this.R, m = R.mon, hs = this.stats();
    const gold = Math.round(m.gold * rnd(0.8, 1.2) * (1 + hs.gold / 100) * ((R.events.goldrain || 0) > 0 ? 3 : 1));
    S.gold += gold;
    S.stats.goldTotal = (S.stats.goldTotal || 0) + gold;
    if (m.boss) S.stats.biggestBoss = Math.max(S.stats.biggestBoss || 0, S.zone);
    S.stats.kills++;
    if (m.elite) S.stats.elites++;
    if (m.goblin) { S.stats.goblins = (S.stats.goblins || 0) + 1; this.log(`${tx("Gobelin doré attrapé : {0} or !", { 0: fmt(gold) })}`); }
    S.bestiary[m.type] = (S.bestiary[m.type] || 0) + 1;
    this.questProgress("kill", 1);
    this.questProgress("hunt", 1, m.type);
    if (m.elite) this.questProgress("elite", 1);
    if (m.boss) this.questProgress("boss", 1);
    this.questProgress("gold", gold);
    this.petGainXp(m.boss ? 10 : m.elite ? 5 : 1);
    if ((m.boss && rand() < EGG_CHANCE.boss) || (m.elite && rand() < EGG_CHANCE.elite)) this.gainEgg();
    this.emit("kill", { mon: m, gold });
    this.rollRareThings(m);
    this.autoBuyPotions();
    this.autoForge();
    this.gainXp(Math.round(m.xp * (1 + hs.xp / 100)));
    if (m.boss || m.elite || rand() < DROP_CHANCE * (1 + hs.drop / 100)) {
      const it = this.newItem(m.champion ? CHAMPION.minRarity : m.boss ? 2 : m.elite ? ELITE.minRarity : 0);
      this.emit("loot", { item: it, mon: m });
      this.addToBag(it);
    }
    if (m.champion) { S.stats.champions = (S.stats.champions || 0) + 1; this.log(`${tx("Champion vaincu : {0} or et un butin épique !", { 0: fmt(gold) })}`); }
    else if (m.elite) this.log(`${tx("Élite vaincu : {0} or !", { 0: fmt(gold) })}`);
    if (m.boss) {
      S.stats.bosses++;
      this.freeHero(S.zone);
      R.deaths = 0;
      if (S.autoAdvance) {
        // Vrai record : au-delà de la meilleure zone de TOUTES les courses (pas seulement de celle-ci,
        // sinon chaque boss d'une course après ascension annonçait « Nouveau record ! »).
        const record = S.zone + 1 > recordZone(S);
        S.zone++;
        S.best = Math.max(S.best, S.zone);
        this.emit("zoneUp", { zone: S.zone, record });
        this.questProgress("zone", 0);
        this.log(`${m.name || tx("Boss")} ${tx("vaincu ! En route vers : {0}.", { 0: zoneName(S.zone) })}`);
      } else this.log(tx("Boss vaincu ! Ton héros reste farmer ici."));
      S.kills = 0;
      R.lineupZone = 0; // nouvelle série de monstres
    } else S.kills++;
    R.corpse = { mon: m, t: 0.45 };
    R.mon = null;
    R.mode = "walk";
    this.startLeg(rnd(SPAWN_DELAY[0], SPAWN_DELAY[1]));
    this.changed();
  }

  /** Le monstre quitte le combat sans récompense (gobelin enfui). */
  monsterFlees() {
    const S = this.S, R = this.R, m = R.mon;
    this.emit("flee", { mon: m });
    this.log(tx("Le gobelin doré s’est enfui avec son or…"));
    S.kills++;
    R.corpse = { mon: m, t: 0.45 };
    R.mon = null;
    R.mode = "walk";
    this.startLeg(rnd(SPAWN_DELAY[0], SPAWN_DELAY[1]));
    this.changed();
  }

  heroDown() {
    const S = this.S, R = this.R;
    R.mode = "dead"; R.deadT = 2.5; R.mon = null;
    S.stats.deaths++; R.deaths++;
    // Défaites près du record : sert à suggérer une ascension quand le héros bloque.
    if (S.zone >= S.best - 1) (R.wallDeaths ||= []).push(R.time);
    this.emit("heroDown");
    if (R.deaths >= 2 && S.zone > 1) {
      S.zone--; R.deaths = 0; S.kills = 0;
      this.log(tx("Trop dur : ton héros recule vers ") + zoneName(S.zone) + ".");
    } else {
      S.kills = 0;
      this.log(tx("Ton héros est tombé. La progression de la zone repart à zéro."));
    }
    this.changed();
  }

  /* ---------- Progression hors ligne ---------- */
  /** Applique `sec` secondes d'absence. Renvoie un résumé, ou null si rien. */
  /** Plafond de la progression hors ligne, en secondes (8 h + constellation de la Lune). */
  offlineCapS() { return OFFLINE_CAP_S + (prestigeEffects(this.S).offlineH || 0) * 3600; }

  applyOffline(sec) {
    const capped = sec > this.offlineCapS();
    sec = Math.min(sec, this.offlineCapS());
    if (sec < 30) return null;
    const S = this.S;
    // Statistiques sans élixirs : leur effet est compté au prorata de leur durée restante.
    const hs = heroStats(S, S.equip, { buffs: false }), b = monsterBase(S.zone, false);
    const share = (id) => Math.min(S.buffs[id] || 0, sec) / sec;
    const atkBoost = 1 + 0.25 * share("elixir");
    const dps = heroDps(hs) * atkBoost * (1 + hs.burn / 100 * 1.5);
    const perKill = b.hp / dps + approachTime() / (1 + (hs.moveSpd || 0) / 100);
    const taken = b.atk / b.interval * (b.hp / dps) * 40 / (40 + hs.def) * (1 - hs.dodge / 100);
    const eff = Math.min(0.9, (taken > hs.hp * 0.8 ? 0.25 : 0.6) * (1 + hs.offline / 100));
    const kills = Math.floor(sec / perKill * eff);
    for (const id in S.buffs) S.buffs[id] = Math.max(0, (S.buffs[id] || 0) - sec);
    this.invalidateStats();
    if (kills < 1) return null;
    const bagBefore = S.bag.length, lvl0 = S.lvl;
    const gold = Math.round(kills * b.gold * (1 + hs.gold / 100 + 0.5 * share("fortune")));
    S.stats.goldTotal = (S.stats.goldTotal || 0) + gold;
    S.stats.offlineTime = (S.stats.offlineTime || 0) + sec;
    const xp = Math.round(kills * b.xp * (1 + hs.xp / 100 + 0.5 * share("wisdom")));
    S.gold += gold;
    S.stats.kills += kills;
    const types = zoneDef(S.zone).monsters;
    types.forEach((t, i) => { S.bestiary[t] = (S.bestiary[t] || 0) + Math.floor(kills / types.length) + (i < kills % types.length ? 1 : 0); });
    this.questProgress("kill", kills);
    this.questProgress("gold", gold);
    this.petGainXp(Math.floor(kills / 2));
    S.xp += xp;
    while (S.xp >= xpNeed(S.lvl)) { S.xp -= xpNeed(S.lvl); S.lvl++; }
    this.invalidateStats();
    const drops = Math.min(30, Math.floor(kills * DROP_CHANCE * (1 + hs.drop / 100) * 0.3));
    let best = -1;
    for (let i = 0; i < drops; i++) {
      const it = this.newItem(0);
      best = Math.max(best, it.r);
      this.addToBag(it, true);
    }
    // Trouvailles rares, à moitié moins fréquentes qu'en jeu : plumes du vent (vitesse permanente) et coffres.
    const roll = (p, cap) => { const x = kills * p * 0.5; return Math.min(cap, Math.floor(x) + (rand() < x % 1 ? 1 : 0)); };
    const feathers = roll(FEATHER.normal, 5), chests = roll(CHEST.normal, 3);
    if (feathers) { S.stats.feathers = (S.stats.feathers || 0) + feathers; this.gainSpeed(feathers * FEATHER.gain, tx("Plumes du vent trouvées en ton absence")); }
    for (let i = 0; i < chests; i++) this.openChest();
    this.R.hp = this.stats().hp;
    const h = Math.floor(sec / 3600), mn = Math.floor(sec % 3600 / 60);
    const summary = {
      seconds: sec, duration: sec < 60 ? Math.round(sec) + " s" : (h ? h + " h " : "") + mn + " min", zone: zoneName(S.zone),
      kills, gold, xp, newLevel: S.lvl > lvl0 ? S.lvl : 0, kept: S.bag.length - bagBefore, best, feathers, chests,
      capped, capH: Math.round(this.offlineCapS() / 3600),
    };
    this.log(tx("Pendant ") + summary.duration + fsp() + ": " + fmt(kills) + tx(" monstres vaincus, +") + tx("{0} or", { 0: fmt(gold) }) +
      (summary.newLevel ? tx(", niveau ") + S.lvl : "") + ", " + txn(summary.kept, "{n} objet gardé.|{n} objets gardés."));
    this.changed();
    return summary;
  }

  /* ---------- Équipement ---------- */
  equip(it) {
    const S = this.S, old = S.equip[it.slot];
    S.bag = S.bag.filter((i) => i.id !== it.id);
    S.equip[it.slot] = it;
    if (old) S.bag.push(old);
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.log(tx("Équipé : ") + itemName(it) + ".");
    this.changed();
  }

  unequip(slot) {
    const S = this.S, it = S.equip[slot];
    if (!it || this.bagFull()) return false;
    S.equip[slot] = null;
    S.bag.push(it);
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.changed();
    return true;
  }

  sell(it) {
    const v = sellValue(it);
    this.S.gold += v;
    this.S.bag = this.S.bag.filter((i) => i.id !== it.id);
    this.log(tx("Vendu : ") + itemName(it) + " (+" + tx("{0} or", { 0: fmt(v) }) + ").");
    this.changed();
  }

  forge(it) {
    if (!hasUnlock(this.S, "forge")) return false;
    const c = forgeCost(it);
    if (this.S.gold < c || it.plus >= MAX_PLUS) return false;
    this.S.gold -= c;
    it.plus++;
    this.invalidateStats();
    this.questProgress("forge", 1);
    this.log(tx("Forge : ") + itemName(it) + tx(" passe à +") + it.plus + ".");
    this.changed();
    return true;
  }

  /** Objets du sac qui n'améliorent pas le héros (les légendaires sont toujours gardés). */
  uselessItems() { return this.S.bag.filter((it) => it.r < LEGENDARY && !this.isUpgrade(it)); }

  /**
   * Transmutation : 3 objets inutiles d'une même rareté (sous légendaire)
   * donnent 1 objet de la rareté au-dessus, du niveau de ta meilleure zone.
   * De la plus basse rareté à la plus haute : les nouveaux objets inutiles
   * peuvent à leur tour être transmutés. Renvoie les objets créés.
   */
  transmutePlan() {
    const by = [0, 0, 0, 0];
    for (const it of this.uselessItems()) if (it.r < LEGENDARY) by[it.r]++;
    const made = by.reduce((a, n) => a + Math.floor(n / 3), 0);
    return { used: made * 3, made }; // (sans compter les enchaînements possibles)
  }

  /** Achète un déblocage (une fois pour toutes). */
  buyUnlock(id) {
    const u = UNLOCK_INDEX[id], S = this.S;
    if (!u || hasUnlock(S, id) || !unlockAvailable(S, u) || !this.pay(u.price)) return false;
    (S.unlocks ||= {})[id] = true;
    S.stats.purchases = (S.stats.purchases || 0) + 1;
    this.log(`${tx("Débloqué : {0} !", { 0: u.name })}`);
    this.emit("unlock", { id });
    this.changed();
    return true;
  }
  has(id) { return hasUnlock(this.S, id); }

  transmute() {
    if (!hasUnlock(this.S, "transmute")) return [];
    const out = [];
    for (let r = 0; r < LEGENDARY; r++) {
      const pool = this.uselessItems().filter((it) => it.r === r);
      while (pool.length >= 3) {
        const three = new Set(pool.splice(0, 3));
        this.S.bag = this.S.bag.filter((it) => !three.has(it));
        const it = this.newItem(r + 1, this.S.best);
        this.S.bag.push(it);
        out.push(it);
        this.emit("loot", { item: it, chest: true });
      }
    }
    if (out.length) {
      this.S.stats.transmutes = (this.S.stats.transmutes || 0) + out.length;
      this.questProgress("transmute", out.length);
      const best = out.reduce((a, b) => (b.r > a.r ? b : a));
      this.log(`${txn(out.length, "Transmutation : {n} nouvel objet, dont {3} ({4}).|Transmutation : {n} nouveaux objets, dont {3} ({4}).", { 3: itemName(best), 4: RARITIES[best.r].name.toLowerCase() })}`);
      this.emit("transmute", { items: out });
      this.changed();
    }
    return out;
  }

  /** Vend tout ce qui n'améliore pas le héros. Renvoie { n, gold }. */
  sellUseless() {
    if (!hasUnlock(this.S, "bulkEquip")) return 0;
    const sell = new Set(this.uselessItems());
    let gold = 0;
    for (const it of sell) gold += sellValue(it);
    this.S.bag = this.S.bag.filter((it) => !sell.has(it));
    this.S.gold += gold;
    if (sell.size) this.log(txn(sell.size, "{n} objet inutile vendu pour {0} or.|{n} objets inutiles vendus pour {0} or.", { 0: fmt(gold) }));
    this.emit("sold", { n: sell.size, gold });
    this.changed();
    return { n: sell.size, gold };
  }

  /** Réforge : nouveaux bonus secondaires (les communs n'en ont pas). */
  reforge(it) {
    if (!hasUnlock(this.S, "forge")) return false;
    const c = reforgeCost(it);
    if (RARITIES[it.r].affixes < 1 || this.S.gold < c) return false;
    this.S.gold -= c;
    rerollAffixes(it);
    this.invalidateStats();
    this.S.stats.reforges = (this.S.stats.reforges || 0) + 1;
    this.log(tx("Réforge : ") + itemName(it) + tx(" a de nouveaux bonus."));
    this.changed();
    return true;
  }

  sellCommons() {
    let total = 0, n = 0;
    this.S.bag = this.S.bag.filter((i) => {
      if (i.r <= 1) { total += sellValue(i); n++; return false; }
      return true;
    });
    this.S.gold += total;
    if (n) this.log(txn(n, "{n} objet vendu pour {0} or.|{n} objets vendus pour {0} or.", { 0: fmt(total) }));
    this.changed();
  }

  autoEquip() {
    if (!hasUnlock(this.S, "bulkEquip")) return;
    let n = 0;
    for (const k of SLOT_KEYS) {
      let best = null, bd = UPGRADE_EPS;
      for (const i of this.S.bag) if (i.slot === k) {
        const d = this.upgradeDelta(i);
        if (d > bd) { bd = d; best = i; }
      }
      if (best) {
        const S = this.S, old = S.equip[k];
        S.bag = S.bag.filter((i) => i.id !== best.id);
        S.equip[k] = best;
        if (old) S.bag.push(old);
        this.invalidateStats();
        n++;
      }
    }
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    if (n) this.log(txn(n, "{n} objet équipé automatiquement.|{n} objets équipés automatiquement."));
    this.changed();
  }

  /* ---------- Zone ---------- */
  setZone(z) {
    if (z < 1 || z > this.S.best || z === this.S.zone) return;
    const R = this.R;
    this.S.zone = z; this.S.kills = 0;
    R.mon = null; R.mode = "walk"; R.deaths = 0;
    this.startLeg(1);
    this.changed();
  }

  setAutoSell(rarityId, on) { this.S.autoSell[rarityId] = !!on; this.changed(); }
  setAutoAdvance(on) { this.S.autoAdvance = !!on; this.changed(); }

  /* ---------- Classe et talents ---------- */
  /** Boss de la zone z vaincu : libère le héros qui y était retenu (une seule fois). */
  freeHero(z) {
    const cls = Object.keys(CLASS_UNLOCK_ZONE).find((c) => CLASS_UNLOCK_ZONE[c] === z);
    const U = (this.S.classesUnlocked ||= ["warrior"]);
    if (!cls || U.includes(cls)) return null;
    U.push(cls);
    this.log(`${tx("Héros libéré : {0} ! Choisis-le dans l’onglet Classe pour ta prochaine ascension.", { 0: CLASSES[cls].name })}`);
    this.emit("classUnlock", { cls });
    this.changed();
    return cls;
  }

  /** Classe de la prochaine ascension (null : on garde la classe actuelle). */
  chooseNextClass(cls) {
    if (!CLASSES[cls] || !isClassUnlocked(this.S, cls)) return false;
    this.S.nextCls = cls === this.S.cls ? null : cls;
    this.changed();
    return true;
  }

  setClass(cls) {
    if (!CLASSES[cls] || cls === this.S.cls) return false;
    this.S.cls = cls;
    const played = (this.S.stats.classes ||= []);
    if (!played.includes(cls)) played.push(cls);
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.log(tx("Ton héros devient ") + lc(CLASSES[cls].name) + ".");
    this.emit("classChange");
    this.changed();
    return true;
  }

  /** Monte un talent de `n` rangs (autant que possible). Renvoie le nombre de rangs pris. */
  learnTalent(id, n = 1) {
    let done = 0;
    while (done < n && !cannotLearn(this.S, id)) {
      const ranks = classTalents(this.S);
      ranks[id] = (ranks[id] || 0) + 1;
      done++;
    }
    if (done) {
      this.invalidateStats();
      const t = TALENT_INDEX[id].talent;
      if (t.tier === 3) this.log(tx("Talent ultime débloqué : ") + t.name + " !");
      this.changed();
    }
    return done;
  }

  /**
   * Dépense automatiquement les points libres : ultimes d'abord, puis la branche
   * la plus avancée (pour atteindre son ultime), puis les maîtrises. La voie
   * n'est jamais choisie à la place du joueur. Renvoie le nombre de points dépensés.
   */
  autoSpendTalents() {
    const S = this.S;
    let n = 0;
    for (let guard = 0; guard < 5000 && talentPointsFree(S) > 0; guard++) {
      const id = this.nextAutoTalent();
      if (!id || !this.learnTalent(id, 1)) break;
      n++;
    }
    return n;
  }

  nextAutoTalent() {
    const S = this.S, tree = TREES[S.cls] || [], ok = (t) => !cannotLearn(S, t.id);
    const ult = tree.flatMap((b) => b.talents).find((t) => t.tier === 3 && ok(t));
    if (ult) return ult.id;
    const branches = tree.map((b, bi) => ({ bi, spent: branchSpent(S, bi), next: b.talents.filter(ok).sort((x, y) => x.tier - y.tier)[0] }))
      .filter((b) => b.next).sort((x, y) => y.spent - x.spent);
    if (branches.length) return branches[0].next.id;
    const ranks = classTalents(S), ms = MASTERIES.filter(ok).sort((x, y) => (ranks[x.id] || 0) - (ranks[y.id] || 0));
    return ms.length ? ms[0].id : null;
  }

  talentResetCost() { return this.S.lvl < 10 ? 0 : Math.round(25 * this.S.lvl * Math.pow(1.25, this.S.best - 1) / 10); }

  resetTalents() {
    const cost = this.talentResetCost();
    if (this.S.gold < cost) return false;
    this.S.gold -= cost;
    this.S.talents[this.S.cls] = {};
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.log(tx("Talents réinitialisés") + (cost ? " (" + tx("{0} or", { 0: fmt(cost) }) + ")." : "."));
    this.changed();
    return true;
  }

  /* ---------- Boutique ---------- */
  pay(price) {
    if (this.S.gold < price) return false;
    this.S.gold -= price;
    this.S.stats.purchases++;
    return true;
  }

  buyConsumable(id) {
    const c = CONSUMABLES.find((x) => x.id === id), S = this.S;
    if (!c) return false;
    if (c.kind === "stock" && S.potions >= POTION_MAX) return false;
    if (c.kind === "buff" && (S.buffs[id] || 0) + c.duration > BUFF_CAP_S) return false;
    if (!this.pay(consumablePrice(c, S))) return false;
    if (c.kind === "stock") S.potions++;
    else { S.buffs[id] = (S.buffs[id] || 0) + c.duration; this.invalidateStats(); }
    this.log(tx("Acheté : ") + c.name + ".");
    this.changed();
    return true;
  }

  /**
   * Maître de forge (déblocage, option) : forge l'objet porté le moins cher à améliorer, une fois
   * par victoire au plus, et seulement avec l'or en trop (il garde 3 fois le prix de côté).
   */
  autoForge() {
    const S = this.S;
    if (!hasUnlock(S, "masterForge") || S.settings.autoForge === false) return null;
    let best = null, cost = Infinity;
    for (const it of Object.values(S.equip)) {
      if (!it || it.plus >= MAX_PLUS) continue;
      const c = forgeCost(it);
      if (c < cost) { best = it; cost = c; }
    }
    if (!best || S.gold < cost * 3) return null;
    S.gold -= cost;
    best.plus++;
    this.invalidateStats();
    this.questProgress("forge", 1);
    this.log(tx("Maître de forge : {0} passe à +{1}.", { 0: itemName(best), 1: best.plus }));
    this.changed();
    return best;
  }

  /** Achat automatique de potions (option de la boutique) : complète le stock jusqu'à AUTO_POTIONS. */
  autoBuyPotions() {
    const S = this.S;
    if (!S.autoPotions || !hasUnlock(S, "autoPotion") || S.potions >= AUTO_POTIONS) return 0;
    const c = CONSUMABLES.find((x) => x.id === "potion"), price = consumablePrice(c, S);
    let n = 0;
    while (S.potions < AUTO_POTIONS && S.gold >= price * 4) { S.gold -= price; S.potions++; n++; } // garde de quoi en racheter
    if (n) { S.stats.purchases = (S.stats.purchases || 0) + n; this.changed(); }
    return n;
  }

  buyChest(id) {
    const c = CHESTS.find((x) => x.id === id), S = this.S;
    if (!c || this.bagFull() || !this.pay(chestPrice(c, S))) return null;
    const it = this.newItem(c.minRarity, S.best);
    S.bag.push(it);
    this.log(`${c.name} ${tx("ouvert : {0} ({1}) !", { 0: itemName(it), 1: RARITIES[it.r].name.toLowerCase() })}`);
    this.emit("loot", { item: it, mon: null });
    this.changed();
    return it;
  }

  /** Atelier : un niveau de plus (illimité, sauf le cartographe). */
  buyWorkshop(id, n = 1) {
    if (!hasUnlock(this.S, "workshop")) return 0;
    const w = WORKSHOP.find((x) => x.id === id), S = this.S, W = (S.workshop ||= {});
    let done = 0;
    while (w && done < n && !(w.max && (W[id] || 0) >= w.max) && this.pay(workshopPrice(w, S))) { W[id] = (W[id] || 0) + 1; done++; }
    if (!done) return 0;
    this.invalidateStats();
    this.log(`${tx("Atelier : {0} niveau {1}.", { 0: w.name, 1: W[id] })}`);
    this.changed();
    return done;
  }

  /** Œuf de familier : un seul par étal. */
  buyEgg() {
    const S = this.S, shop = this.shopStock();
    if (shop.eggSold || !this.pay(eggPrice(S))) return false;
    shop.eggSold = true;
    this.gainEgg();
    this.changed();
    return true;
  }

  buyUpgrade(id) {
    const u = UPGRADES.find((x) => x.id === id), S = this.S;
    const have = S.upgrades[id] || 0;
    if (!u || have >= u.max || !this.pay(upgradePrice(u, S))) return false;
    S.upgrades[id] = have + 1;
    if (id === "bag") S.bagSize = Math.min(BAG_MAX, S.bagSize + 6);
    this.log(tx("Amélioration : ") + u.name + ".");
    this.changed();
    return true;
  }

  /** Stock du marchand (renouvelé toutes les 15 min). */
  shopStock(now = Date.now()) {
    const S = this.S;
    if (!S.shop || !Array.isArray(S.shop.items) || now >= S.shop.next) this.restockShop(now);
    return S.shop;
  }

  restockShop(now = Date.now()) {
    const S = this.S, items = [];
    // Le premier objet vise l'emplacement le plus faible du héros (vide, ou le moins puissant).
    const weak = SLOT_KEYS.find((k) => !S.equip[k]) || SLOT_KEYS.slice().sort((a, b) => itemScore(S.equip[a]) - itemScore(S.equip[b]))[0];
    for (let i = 0; i < SHOP_SLOTS; i++) {
      let it = null;
      for (let t = 0; t < (i === 0 ? 40 : 1); t++) {
        it = rollItem(S.nextId, S.best, Math.min(3, rollRarity(0) + 1)); // meilleure rareté qu'au combat
        if (i !== 0 || it.slot === weak) break;
      }
      S.nextId++;
      it = this.decorate(it);
      it.price = Math.round(sellValue(it) * 6);
      items.push(it);
    }
    // Bonne affaire : un objet au hasard à prix réduit.
    const deal = items[Math.floor(rand() * items.length)];
    deal.deal = true; deal.price = Math.round(deal.price * (1 - DEAL_DISCOUNT));
    S.shop = { items, next: now + SHOP_REFRESH_S * 1000 };
    this.changed();
  }

  rerollShop(now = Date.now()) {
    if (!this.pay(rerollPrice(this.S))) return false;
    this.restockShop(now);
    this.log(tx("Le marchand renouvelle son étal."));
    return true;
  }

  buyShopItem(id) {
    const S = this.S, shop = S.shop;
    const it = shop && shop.items.find((i) => i.id === id);
    if (!it || this.bagFull() || !this.pay(it.price)) return false;
    shop.items = shop.items.filter((i) => i !== it);
    delete it.price; delete it.deal;
    if (it.r === LEGENDARY) S.stats.legendaries++;
    S.bag.push(it);
    this.log(tx("Acheté au marchand : ") + itemName(it) + ".");
    this.changed();
    return true;
  }

  /* ---------- Vitesse et événements rares ---------- */
  /** Multiplicateur de vitesse de déplacement (permanent + rafale de vent). */
  moveMul() {
    return 1 + (this.stats().moveSpd || 0) / 100 + ((this.R.events.wind || 0) > 0 ? 1 : 0);
  }

  tickEvents(dt) {
    const R = this.R;
    for (const id in R.events) {
      if (R.events[id] <= 0) continue;
      R.events[id] -= dt;
      if (R.events[id] <= 0) { R.events[id] = 0; this.emit("eventEnd", { id }); this.changed(); }
    }
    // Étoile filante : passe de temps en temps, il faut cliquer dessus avant qu'elle disparaisse.
    if (R.star) {
      R.star.t -= dt;
      if (R.star.t <= 0) { R.star = null; this.emit("starMissed"); }
    } else if ((R.starT -= dt) <= 0) {
      R.starT = STAR.minS + rand() * (STAR.maxS - STAR.minS);
      R.star = { t: STAR.life, life: STAR.life };
      this.emit("star");
    }
  }

  startEvent(id) {
    const ev = EVENTS[id];
    if (!ev || (this.R.events[id] || 0) > 0) return false;
    this.R.events[id] = ev.duration;
    this.S.stats.events = (this.S.stats.events || 0) + 1;
    this.log(`${ev.name} ! ${ev.text} (${ev.duration} s)`);
    this.emit("event", { id });
    this.changed();
    return true;
  }

  gainSpeed(n, source) {
    const S = this.S, before = S.speed;
    S.speed = Math.min(SPEED_CAP, S.speed + n);
    if (S.speed === before) return;
    this.invalidateStats();
    this.log(`${source}${fsp()}${tx(": +{0} % de vitesse de déplacement, pour toujours (total +{1} %).", { 0: n, 1: S.speed })}`);
    this.emit("feather", { speed: S.speed, gain: n, source });
    this.changed();
  }

  /** Après chaque victoire : plume du vent, événements temporaires. */
  rollRareThings(m) {
    const chance = m.boss ? FEATHER.boss : m.elite ? FEATHER.elite : FEATHER.normal;
    if (rand() < chance) { this.S.stats.feathers = (this.S.stats.feathers || 0) + 1; this.gainSpeed(FEATHER.gain, tx("Plume du vent")); }
    for (const id in EVENTS) if (rand() < EVENTS[id].chance) { this.startEvent(id); break; }
    if (rand() < (m.boss ? CHEST.boss : m.elite ? CHEST.elite : CHEST.normal)) this.openChest();
  }

  /** Coffre au trésor trouvé sur le chemin. */
  openChest() {
    const S = this.S, hs = this.stats();
    const gold = Math.round(3 * Math.pow(1.25, S.best - 1) * CHEST.gold * (1 + hs.gold / 100));
    S.gold += gold;
    S.stats.goldTotal = (S.stats.goldTotal || 0) + gold;
    S.stats.chests = (S.stats.chests || 0) + 1;
    const x = rand(), item = this.newItem(x < CHEST.legendary ? 4 : x < CHEST.epic ? 3 : 2);
    S.potions = Math.min(20, S.potions + 1);
    this.log(`${tx("Coffre au trésor ! +{0} or, une potion et {1}.", { 0: fmt(gold), 1: itemName(item) })}`);
    this.emit("chest", { gold, item });
    this.emit("loot", { item, chest: true });
    this.addToBag(item);
    this.changed();
    return { gold, item };
  }

  /** Clic sur l'étoile filante. */
  catchStar() {
    if (!this.R.star) return false;
    this.R.star = null;
    const gold = Math.round(3 * Math.pow(1.25, this.S.best - 1) * 150);
    this.S.gold += gold;
    this.S.stats.stars = (this.S.stats.stars || 0) + 1;
    this.emit("starCaught", { gold });
    this.gainSpeed(STAR.speedGain, tx("Étoile filante"));
    this.log(`${tx("Étoile filante attrapée : +{0} or !", { 0: fmt(gold) })}`);
    this.changed();
    return true;
  }

  /* ---------- Récompense quotidienne ---------- */
  /**
   * À appeler au lancement et au changement de jour (date locale "AAAA-MM-JJ").
   * Série de jours consécutifs : la récompense grandit, le 7e jour donne un coffre
   * royal (épique ou légendaire), puis la série repart. Renvoie la récompense ou null.
   */
  claimDaily(today) {
    const D = (this.S.daily ||= { last: null, streak: 0 });
    if (D.mod !== dayModFor(today)) { D.mod = dayModFor(today); this.R.lineup = null; this.changed(); }
    if (D.last === today) return null;
    const yesterday = new Date(new Date(today + "T12:00:00").getTime() - 86400000).toISOString().slice(0, 10);
    D.streak = D.last === yesterday ? (D.streak % 7) + 1 : 1;
    D.last = today;
    const day = D.streak, gold = Math.round(3 * Math.pow(1.25, this.S.best - 1) * 40 * day);
    this.S.gold += gold;
    const reward = { day, gold, potions: day >= 3 ? 2 : 0, item: null, mod: D.mod };
    if (reward.potions) this.S.potions = Math.min(20, this.S.potions + reward.potions);
    if (day === 7 && !this.bagFull()) { reward.item = this.newItem(3, this.S.best); this.S.bag.push(reward.item); }
    this.log(`${tx("Récompense du jour {0}/7 : +{1} or{2}{3}.", { 0: day, 1: fmt(gold), 2: reward.potions ? tx(", 2 potions") : "", 3: reward.item ? ", " + itemName(reward.item) : "" })}`);
    this.emit("daily", reward);
    this.changed();
    return reward;
  }

  /* ---------- Quêtes ---------- */
  /** Complète les emplacements de quêtes vides. */
  ensureQuests() {
    const Q = this.S.quests;
    let added = false;
    while (Q.slots.length < QUEST_SLOTS) {
      Q.slots.push(makeQuest(this.S, Q.nextUid++, Q.slots.map((q) => q.kind)));
      added = true;
    }
    if (added) this.changed();
    return Q.slots;
  }

  /** Réclame les quêtes terminées si l'option est cochée. */
  autoClaimQuests() {
    if (!this.R.autoClaim || !hasUnlock(this.S, "questDesk")) return;
    this.R.autoClaim = false;
    for (const q of [...this.S.quests.slots]) if (questDone(q)) this.claimQuest(q.uid);
  }

  questProgress(kind, n, type) {
    for (const q of this.S.quests.slots) {
      if (q.kind !== kind || questDone(q)) continue;
      if (kind === "hunt" && q.type !== type) continue;
      q.progress = kind === "zone" ? this.S.best : q.progress + n;
      if (questDone(q)) {
        this.emit("questDone", { quest: q });
        if (this.S.quests.auto && !(q.reward.chest && this.bagFull())) this.R.autoClaim = true;
        else this.log(tx("Quête accomplie ! Récompense à réclamer."));
      }
    }
  }

  questsReady() { return this.S.quests.slots.filter(questDone).length; }

  claimQuest(uid) {
    const S = this.S, Q = S.quests, i = Q.slots.findIndex((q) => q.uid === uid);
    if (i < 0 || !questDone(Q.slots[i])) return false;
    const rw = Q.slots[i].reward, parts = [];
    if (rw.chest && this.bagFull()) { this.log(tx("Sac plein : libère une place pour recevoir le coffre.")); return false; }
    if (rw.gold) { S.gold += rw.gold; parts.push(tx("{0} or", { 0: fmt(rw.gold) })); }
    if (rw.chest) { const it = this.newItem(rw.chest, S.best); S.bag.push(it); parts.push(itemName(it)); this.emit("loot", { item: it, mon: null }); }
    if (rw.buff) { S.buffs[rw.buff] = Math.min(7200, (S.buffs[rw.buff] || 0) + 600); this.invalidateStats(); parts.push(tx("élixir de 10 min")); }
    if (rw.potions) { S.potions = Math.min(20, S.potions + rw.potions); parts.push(tx("{0} potions", { 0: rw.potions })); }
    if (rw.shards) { S.prestige.shards += rw.shards; S.prestige.total += rw.shards; parts.push(rw.shards + tx(" éclats d’étoile")); }
    if (rw.egg) { this.gainEgg(); parts.push(tx("un œuf")); }
    if (rw.speed) { this.gainSpeed(rw.speed, tx("Quête héroïque")); parts.push(`${tx("+{0} % de vitesse pour toujours", { 0: rw.speed })}`); }
    const stars = Q.slots[i].stars || 1;
    Q.slots.splice(i, 1);
    Q.completed++;
    // Réputation de guilde
    const G = (S.guild ||= { rep: 0 }), before = guildRank(G.rep).rank;
    G.rep += stars;
    const after = guildRank(G.rep).rank;
    if (after > before) {
      this.invalidateStats();
      const gift = this.bagFull() ? null : this.newItem(Math.min(4, 2 + Math.floor(after / 3)), S.best);
      if (gift) { S.bag.push(gift); this.emit("loot", { item: gift, mon: null }); }
      this.log(`${tx("Guilde : tu deviens {0} ! Bonus permanent augmenté{1}.", { 0: guildRankName(after), 1: gift ? tx(", et un coffre : ") + itemName(gift) : "" })}`);
      this.emit("guildRank", { rank: after });
    }
    this.log(tx("Récompense de quête : ") + parts.join(", ") + ".");
    this.ensureQuests();
    this.changed();
    return true;
  }

  rerollQuest(uid) {
    const Q = this.S.quests, i = Q.slots.findIndex((q) => q.uid === uid);
    if (i < 0 || questDone(Q.slots[i]) || !this.pay(questRerollPrice(this.S))) return false;
    Q.slots[i] = makeQuest(this.S, Q.nextUid++, Q.slots.map((q) => q.kind));
    this.changed();
    return true;
  }

  /* ---------- Familiers ---------- */
  gainEgg() {
    this.S.pets.eggs++;
    this.emit("egg");
    this.log(tx("Un œuf ! Fais-le éclore dans l’onglet Familiers."));
    this.changed();
  }

  /** Fait éclore un œuf. Renvoie { pet, isNew }. */
  hatchEgg() {
    if (!hasUnlock(this.S, "menagerie")) return null;
    const P = this.S.pets;
    if (P.eggs <= 0) return null;
    P.eggs--;
    const pet = rollPet(rand), own = P.owned[pet.id];
    if (!own) {
      P.owned[pet.id] = { lvl: 1, xp: 0 };
      if (!P.active) P.active = pet.id;
      this.log(`${tx("L’œuf éclot : {0} !", { 0: pet.name })}`);
    } else {
      this.log(`${tx("L’œuf éclot : encore un {0} ! Ton {1} gagne de l’expérience.", { 0: lc(pet.name), 1: lc(pet.name) })}`);
      this.petAddXp(pet.id, DUPLICATE_XP);
    }
    this.invalidateStats();
    this.changed();
    return { pet, isNew: !own };
  }

  /* ---------- Expéditions des familiers ---------- */
  /** Envoie un familier (pas le compagnon actif) en expédition. */
  sendExpedition(id, kind, now = Date.now()) {
    if (!hasUnlock(this.S, "expeditions")) return false;
    const P = this.S.pets, ex = EXPEDITIONS[kind];
    if (!ex || !P.owned[id] || P.active === id) return false;
    P.exp ||= {};
    if (P.exp[id]) return false;
    P.exp[id] = { kind, start: now, end: now + ex.min * 60000 };
    this.log(`${PET_INDEX[id].name} ${tx("part en {0} ({1}).", { 0: lc(ex.name), 1: ex.min >= 60 ? ex.min / 60 + " h" : ex.min + " min" })}`);
    this.changed();
    return true;
  }

  /**
   * Ce que le joueur peut faire tout de suite (résumé d'absence) : [{ id, n, tab, name? }],
   * dans l'ordre d'intérêt. Seulement ce qui est réellement disponible (déblocages compris).
   */
  todoNow(now = Date.now()) {
    const S = this.S, out = [];
    const q = this.questsReady();
    if (q) out.push({ id: "quests", n: q, tab: "quests" });
    if (this.hasUpgradeCached()) out.push({ id: "upgrade", n: 1, tab: "adventure" });
    const tp = this.talentPointsFree();
    if (tp > 0) out.push({ id: "talents", n: tp, tab: "talents" });
    const sp = skillPointsFree(S);
    if (sp > 0) out.push({ id: "skills", n: sp, tab: "skills" });
    const u = nextUnlock(S);
    if (u && unlockAvailable(S, u) && S.gold >= u.price) out.push({ id: "unlock", n: 1, tab: "shop", name: u.name });
    if (S.pets.eggs > 0 && hasUnlock(S, "menagerie")) out.push({ id: "eggs", n: S.pets.eggs, tab: "pets" });
    const ex = this.expeditionsReady(now).length;
    if (ex) out.push({ id: "expeditions", n: ex, tab: "pets" });
    return out;
  }

  /** Familiers revenus d'expédition (récompense à récupérer). */
  expeditionsReady(now = Date.now()) {
    const E = this.S.pets.exp || {};
    return Object.keys(E).filter((id) => E[id].end <= now);
  }

  /** Récupère le butin d'une expédition terminée. */
  claimExpedition(id, now = Date.now()) {
    const P = this.S.pets, e = P.exp && P.exp[id];
    if (!e || e.end > now) return null;
    const ex = EXPEDITIONS[e.kind], own = P.owned[id];
    delete P.exp[id];
    if (!ex || !own) { this.changed(); return null; }
    const lvlMul = 1 + 0.1 * (own.lvl - 1);
    const gold = Math.round(3 * Math.pow(1.25, this.S.best - 1) * ex.gold * lvlMul);
    this.S.gold += gold;
    this.S.stats.goldTotal = (this.S.stats.goldTotal || 0) + gold;
    this.S.stats.expeditions = (this.S.stats.expeditions || 0) + 1;
    this.questProgress("expedition", 1);
    this.petAddXp(id, ex.xp);
    const out = { gold, xp: ex.xp, egg: false, item: null, pet: PET_INDEX[id] };
    if (rand() < ex.egg) { out.egg = true; this.gainEgg(); }
    if (rand() < ex.item && !this.bagFull()) { out.item = this.newItem(ex.minRarity, this.S.best); this.addToBag(out.item, true); }
    this.log(`${out.pet.name} ${tx("revient de {0} : +{1} or{2}{3} !", { 0: lc(ex.name), 1: fmt(gold), 2: out.egg ? tx(", un œuf") : "", 3: out.item ? ", " + itemName(out.item) : "" })}`);
    this.emit("expedition", out);
    this.changed();
    return out;
  }

  /** Familiers libres (ni actif, ni déjà partis). */
  idlePets() {
    const P = this.S.pets, E = P.exp || {};
    return Object.keys(P.owned).filter((id) => id !== P.active && !E[id]);
  }

  /** Envoie tous les familiers libres dans la même expédition. Renvoie leur nombre. */
  sendAllExpeditions(kind, now = Date.now()) { if (!hasUnlock(this.S, "petBulk")) return 0; return this.idlePets().filter((id) => this.sendExpedition(id, kind, now)).length; }

  /** Fait éclore tous les œufs. Renvoie les résultats. */
  hatchAll() { if (!hasUnlock(this.S, "petBulk")) return []; const out = []; while (this.S.pets.eggs > 0) { const r = this.hatchEgg(); if (!r) break; out.push(r); } return out; }

  claimAllExpeditions(now = Date.now()) { if (!hasUnlock(this.S, "petBulk")) return []; return this.expeditionsReady(now).map((id) => this.claimExpedition(id, now)).filter(Boolean); }

  setPet(id) {
    if (!this.S.pets.owned[id] || this.S.pets.active === id) return false;
    if (this.S.pets.exp && this.S.pets.exp[id]) return false; // en expédition
    this.S.pets.active = id;
    this.invalidateStats();
    this.changed();
    return true;
  }

  petGainXp(n) { if (this.S.pets.active && n > 0) this.petAddXp(this.S.pets.active, n); }

  petAddXp(id, n) {
    const own = this.S.pets.owned[id];
    if (!own || own.lvl >= PET_MAX_LVL) return;
    own.xp += n;
    while (own.lvl < PET_MAX_LVL && own.xp >= petXpNeed(own.lvl)) {
      own.xp -= petXpNeed(own.lvl);
      own.lvl++;
      this.invalidateStats();
      this.emit("petLevel", { pet: PET_INDEX[id] });
      this.log(`${PET_INDEX[id].name} ${tx("passe au niveau {0}.", { 0: own.lvl })}`);
    }
    if (own.lvl >= PET_MAX_LVL) own.xp = 0;
  }

  /* ---------- Ascension ---------- */
  ascendShards() { return shardsFor(this.S.best); }
  canAscend() { return this.S.best >= ASCEND_MIN_ZONE; }

  ascend() {
    if (!this.canAscend()) return false;
    const old = this.S, gain = this.ascendShards(), f = freshState();
    const P = old.prestige, skillGain = ascensionSkillPoints(old.best);
    P.shards += gain; P.total += gain; P.count++;
    P.bestRun = Math.max(P.bestRun || 0, old.best);
    P.skillPts = (P.skillPts || 0) + skillGain;
    // Ce qui est conservé
    Object.assign(f, {
      prestige: P, pets: old.pets, bestiary: old.bestiary, achievements: old.achievements, cls: old.nextCls && isClassUnlocked(old, old.nextCls) ? old.nextCls : old.cls,
      classesUnlocked: old.classesUnlocked,
      upgrades: old.upgrades, workshop: old.workshop, unlocks: old.unlocks, bagSize: old.bagSize, autoSell: old.autoSell, autoAdvance: old.autoAdvance,
      stats: old.stats, guild: old.guild, codex: old.codex, powersSeen: old.powersSeen, nextId: old.nextId, log: old.log, skills: old.skills, speed: old.speed, settings: old.settings, daily: old.daily,
    });
    const eff = prestigeEffects(f);
    f.zone = f.best = Math.max(1, Math.min(1 + (eff.startZone || 0), old.best - 5));
    f.potions += eff.potions || 0;
    if (!(f.stats.classes ||= []).includes(f.cls)) f.stats.classes.push(f.cls);
    this.load(f);
    this.log(`${tx("Ascension n° {0} : +{1} éclats d’étoile et +{2} points de compétence permanents. Une nouvelle aventure commence{3} !", { 0: P.count, 1: gain, 2: skillGain, 3: f.zone > 1 ? tx(" en zone ") + f.zone : "" })}`);
    this.emit("ascend");
    this.changed();
    return true;
  }

  buyConstellation(id) {
    const c = CONSTELLATIONS.find((x) => x.id === id), P = this.S.prestige;
    if (!c) return false;
    const rank = P.ranks[id] || 0, cost = constellationCost(c, rank);
    if (rank >= c.max || P.shards < cost) return false;
    P.shards -= cost;
    P.ranks[id] = rank + 1;
    if (c.eff.potions) this.S.potions = Math.min(20, this.S.potions + c.eff.potions);
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.log(`${tx("Constellation {0} : rang {1}.", { 0: c.name, 1: rank + 1 })}`);
    this.changed();
    return true;
  }

  /* ---------- Arbre de compétences ---------- */
  skillPointsFree() { return skillPointsFree(this.S); }

  takeSkill(id) {
    if (!canTakeSkill(this.S, id)) return false;
    this.S.skills.order.push(id);
    this.invalidateStats();
    const n = SKILL_TREE.nodes[id];
    if (n.kind === "keystone") this.log(tx("Clé de voûte : ") + n.name + " !");
    this.changed();
    return true;
  }

  /**
   * Dépense automatiquement les points de compétence : prolonge le secteur où
   * le joueur a le plus de nœuds (ou Force au départ), clés de voûte et nœuds
   * remarquables accessibles d'abord.
   */
  autoSpendSkills() {
    const S = this.S, active = activeSkillSet(S);
    let n = 0;
    for (let guard = 0; guard < 400 && skillPointsFree(S) > 0; guard++) {
      const count = {};
      for (const id of active) { const s = SKILL_TREE.nodes[id].sector; if (s) count[s] = (count[s] || 0) + 1; }
      const fav = Object.keys(count).sort((a, b) => count[b] - count[a])[0];
      const avail = Object.keys(SKILL_TREE.nodes).filter((id) => canTakeSkill(S, id));
      if (!avail.length) break;
      const score = (id) => { const nd = SKILL_TREE.nodes[id]; return (nd.sector === fav ? 0 : 10) + (nd.kind === "keystone" ? -3 : nd.kind === "notable" ? -2 : 0); };
      avail.sort((a, b) => score(a) - score(b));
      if (!this.takeSkill(avail[0])) break;
      active.add(avail[0]); n++;
    }
    return n;
  }

  /** Retire le dernier nœud choisi (seul un nœud « feuille » peut partir sans casser le chemin). */
  undoSkill() {
    const o = this.S.skills.order;
    if (!o.length) return false;
    o.pop();
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.changed();
    return true;
  }

  resetSkills() {
    this.S.skills.order = [];
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.log(tx("Arbre de compétences réinitialisé."));
    this.changed();
    return true;
  }

  reset() { this.load(freshState()); }
}

export { forgeCost, sellValue, monsterBase };
