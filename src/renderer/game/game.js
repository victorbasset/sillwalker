// Simulation du jeu. Aucune référence au DOM ni au canvas : le rendu et
// l'interface s'abonnent aux événements émis (game.on("kill", ...)).
//
// Événements : log(msg), change(), spawn(mon), heroAttack({dmg,crit,mon,extra,first}),
// heroHurt({dmg}), dodge(), riposte({dmg}), potion({heal}), secondWind(),
// kill({mon,gold}), loot({item}), levelUp({lvl}), heroDown(), respawn(), classChange(),
// flee({mon}) (gobelin enfui), egg(), petLevel({pet}), questDone({quest}), ascend(),
// shield({amount}), absorb({amount}), minion({dmg}), event({id}), eventEnd({id}),
// feather({speed}), star(), starCaught({gold}), starMissed(), zoneUp({zone, record}).
import {
  RARITIES, LEGENDARY, DROP_CHANCE, KILLS_PER_ZONE, MAX_PLUS, OFFLINE_CAP_S, LOG_SIZE, ELITE, GOBLIN, MONSTERS, BAG_SIZE,
  SLOT_KEYS, WALK_SPEED, MONSTER_SPEED, SPAWN_DIST, SPAWN_DELAY, SIM_STEP, BAG_MAX,
} from "./data.js";
import {
  xpNeed, rollItem, rollRarity, sellValue, forgeCost, heroStats, heroDps, upgradeDelta,
  zoneDef, zoneName, monsterBase, approachTime,
} from "./rules.js";
import { CLASSES, classDef } from "./classes.js";
import { TALENT_INDEX, cannotLearn, classTalents, talentPointsFree } from "./talents.js";
import {
  CONSUMABLES, CHESTS, UPGRADES, BUFF_CAP_S, POTION_MAX, POTION_HEAL, POTION_THRESHOLD, POTION_COOLDOWN,
  SHOP_REFRESH_S, SHOP_SLOTS, consumablePrice, chestPrice, upgradePrice, rerollPrice,
} from "./shop.js";
import { POWERS } from "./powers.js";
import { PETS, PET_INDEX, PET_MAX_LVL, EGG_CHANCE, DUPLICATE_XP, petXpNeed } from "./pets.js";
import { ASCEND_MIN_ZONE, CONSTELLATIONS, shardsFor, constellationCost, prestigeEffects } from "./prestige.js";
import { QUEST_SLOTS, makeQuest, questDone, questRerollPrice } from "./quests.js";
import { SKILL_TREE, canTakeSkill, ascensionSkillPoints, skillPointsFree } from "./skilltree.js";
import { EVENTS, FEATHER, STAR, SPEED_CAP } from "./events.js";
import { rand, rnd, pick } from "./util.js";
import { freshState } from "./state.js";
import { fmt } from "./format.js";

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
      R.lineup = Array.from({ length: KILLS_PER_ZONE }, () => (rand() < GOBLIN.chance
        ? { type: "goblin", elite: false, goblin: true }
        : { type: pick(Z.monsters), elite: rand() < ELITE.chance }));
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
        this.log((c ? c.name : id) + " : effet terminé.");
        this.changed();
      }
    }
  }

  step(dt) {
    const R = this.R, hs = this.stats();
    R.time += dt;
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
          R.firstHit = true; R.windUsed = false; R.combo = 0; R.minionT = 0; R.hits = 0;
          R.shield = hs.shield > 0 ? hs.hp * hs.shield / 100 : 0;
          if (R.shield > 0) this.emit("shield", { amount: R.shield });
        }
      }
    } else if (R.mode === "fight" && R.mon) {
      const m = R.mon;
      m.age += dt;
      // Attaques du héros
      R.atkT -= dt * ((R.events.frenzy || 0) > 0 ? 2 : 1);
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
      // Attaques du monstre
      m.t -= dt;
      if (m.t <= 0) {
        m.t = m.interval;
        if (hs.dodge > 0 && rand() < hs.dodge / 100) this.emit("dodge");
        else {
          let dmg = m.atk * rnd(0.85, 1.15) * 40 / (40 + hs.def);
          if (hs.thorns > 0) {
            m.hp -= dmg * hs.thorns / 100;
            if (m.hp <= 0) { this.killMonster(); return; }
          }
          if (R.shield > 0) {
            const absorbed = Math.min(R.shield, dmg);
            R.shield -= absorbed; dmg -= absorbed;
            this.emit("absorb", { amount: absorbed });
          }
          R.hp -= dmg;
          if (dmg > 0) this.emit("heroHurt", { dmg });
          if (hs.riposte > 0 && R.hp > 0 && rand() < hs.riposte / 100) {
            const rd = hs.atk * 0.5;
            m.hp -= rd;
            this.emit("riposte", { dmg: rd });
            if (m.hp <= 0) { this.killMonster(); return; }
          }
        }
        if (R.hp > 0 && R.hp < hs.hp * POTION_THRESHOLD) this.drinkPotion(hs);
        if (R.hp <= 0) {
          if (hs.secondWind && !R.windUsed) {
            R.windUsed = true;
            R.hp = hs.hp * 0.3;
            this.emit("secondWind");
          } else this.heroDown();
        }
      }
    } else if (R.mode === "dead") {
      R.deadT -= dt;
      if (R.deadT <= 0) { R.hp = hs.hp; R.mode = "walk"; this.startLeg(1); this.emit("respawn"); }
    }
  }

  heroStrike(m, hs, first, extra) {
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
    m.hp -= dmg;
    if (hs.poison > 0) { m.poisonStacks = Math.min(5, (m.poisonStacks || 0) + 1); m.poisonT = 4; }
    if (hs.lifesteal > 0) this.R.hp = Math.min(hs.hp, this.R.hp + dmg * hs.lifesteal / 100);
    if (hs.burn > 0) { m.burnDps = hs.atk * hs.burn / 100; m.burnT = BURN_TIME; }
    this.emit("heroAttack", { dmg, crit, mon: m, extra, iai, first: first && hs.firstStrike > 0 });
  }

  drinkPotion(hs) {
    const R = this.R;
    if (this.S.potions <= 0 || R.potionCd > 0) return;
    this.S.potions--;
    R.potionCd = POTION_COOLDOWN;
    const heal = hs.hp * POTION_HEAL;
    R.hp = Math.min(hs.hp, R.hp + heal);
    this.emit("potion", { heal });
    if (this.S.potions === 0) this.log("Dernière potion de soin bue : passe à la boutique !");
    this.changed();
  }

  makeMonster(boss) {
    const Z = zoneDef(this.S.zone);
    const slot = boss ? { type: Z.boss, elite: false } : this.lineup()[Math.min(this.S.kills, KILLS_PER_ZONE - 1)];
    const b = monsterBase(this.S.zone, boss, slot.type, slot.elite);
    return Object.assign(b, { type: slot.type, boss, elite: slot.elite, goblin: !!slot.goblin, fleeT: slot.goblin ? GOBLIN.flee : 0,
      max: b.hp, t: 0.7, dist: SPAWN_DIST, age: 0, burnT: 0, burnDps: 0, poisonT: 0, poisonStacks: 0 });
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
      this.log("Ton héros passe au niveau " + S.lvl + " (+1 point de talent).");
      this.changed();
    }
  }

  /** Nouvel objet obtenu (combat, hors ligne, coffre). */
  newItem(minRarity, zone = this.S.zone) {
    const it = this.decorate(rollItem(this.S.nextId++, zone, minRarity));
    if (it.r === LEGENDARY) this.S.stats.legendaries++;
    return it;
  }

  /** Ajoute un pouvoir aux objets légendaires. */
  decorate(it) {
    if (it.r === LEGENDARY && !it.power) it.power = pick(POWERS).id;
    return it;
  }

  addToBag(it, quiet) {
    const S = this.S, r = RARITIES[it.r];
    if (S.autoSell[r.id]) {
      const v = sellValue(it); S.gold += v;
      if (!quiet) this.log("Vendu automatiquement : " + it.name + " (+" + fmt(v) + " or).");
      return false;
    }
    if (this.bagFull()) {
      const v = sellValue(it); S.gold += v;
      if (!quiet) this.log("Sac plein : " + it.name + " vendu pour " + fmt(v) + " or.");
      return false;
    }
    S.bag.push(it);
    if (!quiet && it.r >= 2) this.log("Butin " + r.name.toLowerCase() + " : " + it.name + " !");
    this.changed();
    return true;
  }

  killMonster() {
    const S = this.S, R = this.R, m = R.mon, hs = this.stats();
    const gold = Math.round(m.gold * rnd(0.8, 1.2) * (1 + hs.gold / 100) * ((R.events.goldrain || 0) > 0 ? 3 : 1));
    S.gold += gold;
    S.stats.kills++;
    if (m.elite) S.stats.elites++;
    if (m.goblin) { S.stats.goblins = (S.stats.goblins || 0) + 1; this.log(`Gobelin doré attrapé : ${fmt(gold)} or !`); }
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
    this.gainXp(Math.round(m.xp * (1 + hs.xp / 100)));
    if (m.boss || m.elite || rand() < DROP_CHANCE * (1 + hs.drop / 100)) {
      const it = this.newItem(m.boss ? 2 : m.elite ? ELITE.minRarity : 0);
      this.emit("loot", { item: it, mon: m });
      this.addToBag(it);
    }
    if (m.elite) this.log(`Élite vaincu : ${fmt(gold)} or !`);
    if (m.boss) {
      S.stats.bosses++;
      R.deaths = 0;
      if (S.autoAdvance) {
        S.zone++;
        const record = S.zone > S.best;
        S.best = Math.max(S.best, S.zone);
        this.emit("zoneUp", { zone: S.zone, record });
        this.questProgress("zone", 0);
        this.log("Boss vaincu ! En route vers : " + zoneName(S.zone) + ".");
      } else this.log("Boss vaincu ! Ton héros reste farmer ici.");
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
    this.log("Le gobelin doré s’est enfui avec son or…");
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
    this.emit("heroDown");
    if (R.deaths >= 2 && S.zone > 1) {
      S.zone--; R.deaths = 0; S.kills = 0;
      this.log("Trop dur : ton héros recule vers " + zoneName(S.zone) + ".");
    } else {
      S.kills = 0;
      this.log("Ton héros est tombé. La progression de la zone repart à zéro.");
    }
    this.changed();
  }

  /* ---------- Progression hors ligne ---------- */
  /** Applique `sec` secondes d'absence. Renvoie un résumé, ou null si rien. */
  applyOffline(sec) {
    sec = Math.min(sec, OFFLINE_CAP_S + (prestigeEffects(this.S).offlineH || 0) * 3600);
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
    this.R.hp = this.stats().hp;
    const h = Math.floor(sec / 3600), mn = Math.floor(sec % 3600 / 60);
    const summary = {
      seconds: sec, duration: (h ? h + " h " : "") + mn + " min", zone: zoneName(S.zone),
      kills, gold, xp, newLevel: S.lvl > lvl0 ? S.lvl : 0, kept: S.bag.length - bagBefore, best,
    };
    this.log("Pendant " + summary.duration + " : " + fmt(kills) + " monstres vaincus, +" + fmt(gold) + " or" +
      (summary.newLevel ? ", niveau " + S.lvl : "") + ", " + summary.kept + " objet(s) gardé(s).");
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
    this.log("Équipé : " + it.name + ".");
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
    this.log("Vendu : " + it.name + " (+" + fmt(v) + " or).");
    this.changed();
  }

  forge(it) {
    const c = forgeCost(it);
    if (this.S.gold < c || it.plus >= MAX_PLUS) return false;
    this.S.gold -= c;
    it.plus++;
    this.invalidateStats();
    this.questProgress("forge", 1);
    this.log("Forge : " + it.name + " passe à +" + it.plus + ".");
    this.changed();
    return true;
  }

  /** Objets du sac qui n'améliorent pas le héros (les légendaires sont toujours gardés). */
  uselessItems() { return this.S.bag.filter((it) => it.r < LEGENDARY && !this.isUpgrade(it)); }

  /** Vend tout ce qui n'améliore pas le héros. Renvoie { n, gold }. */
  sellUseless() {
    const sell = new Set(this.uselessItems());
    let gold = 0;
    for (const it of sell) gold += sellValue(it);
    this.S.bag = this.S.bag.filter((it) => !sell.has(it));
    this.S.gold += gold;
    if (sell.size) this.log(`${sell.size} objet(s) inutile(s) vendu(s) pour ${fmt(gold)} or.`);
    this.emit("sold", { n: sell.size, gold });
    this.changed();
    return { n: sell.size, gold };
  }

  sellCommons() {
    let total = 0, n = 0;
    this.S.bag = this.S.bag.filter((i) => {
      if (i.r <= 1) { total += sellValue(i); n++; return false; }
      return true;
    });
    this.S.gold += total;
    if (n) this.log(n + " objet(s) vendu(s) pour " + fmt(total) + " or.");
    this.changed();
  }

  autoEquip() {
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
    if (n) this.log(n + " objet(s) équipé(s) automatiquement.");
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
  setClass(cls) {
    if (!CLASSES[cls] || cls === this.S.cls) return false;
    this.S.cls = cls;
    const played = (this.S.stats.classes ||= []);
    if (!played.includes(cls)) played.push(cls);
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.log("Ton héros devient " + CLASSES[cls].name.toLowerCase() + ".");
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
      if (t.tier === 3) this.log("Talent ultime débloqué : " + t.name + " !");
      this.changed();
    }
    return done;
  }

  talentResetCost() { return this.S.lvl < 10 ? 0 : Math.round(25 * this.S.lvl * Math.pow(1.25, this.S.best - 1) / 10); }

  resetTalents() {
    const cost = this.talentResetCost();
    if (this.S.gold < cost) return false;
    this.S.gold -= cost;
    this.S.talents[this.S.cls] = {};
    this.invalidateStats();
    this.R.hp = Math.min(this.R.hp, this.stats().hp);
    this.log("Talents réinitialisés" + (cost ? " (" + fmt(cost) + " or)." : "."));
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
    this.log("Acheté : " + c.name + ".");
    this.changed();
    return true;
  }

  buyChest(id) {
    const c = CHESTS.find((x) => x.id === id), S = this.S;
    if (!c || this.bagFull() || !this.pay(chestPrice(c, S))) return null;
    const it = this.newItem(c.minRarity, S.best);
    S.bag.push(it);
    this.log(`${c.name} ouvert : ${it.name} (${RARITIES[it.r].name.toLowerCase()}) !`);
    this.emit("loot", { item: it, mon: null });
    this.changed();
    return it;
  }

  buyUpgrade(id) {
    const u = UPGRADES.find((x) => x.id === id), S = this.S;
    const have = S.upgrades[id] || 0;
    if (!u || have >= u.max || !this.pay(upgradePrice(u, S))) return false;
    S.upgrades[id] = have + 1;
    if (id === "bag") S.bagSize = Math.min(BAG_MAX, S.bagSize + 6);
    this.log("Amélioration : " + u.name + ".");
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
    for (let i = 0; i < SHOP_SLOTS; i++) {
      const it = this.decorate(rollItem(S.nextId++, S.best, Math.min(3, rollRarity(0) + 1))); // meilleure rareté qu'au combat
      it.price = Math.round(sellValue(it) * 6);
      items.push(it);
    }
    S.shop = { items, next: now + SHOP_REFRESH_S * 1000 };
    this.changed();
  }

  rerollShop(now = Date.now()) {
    if (!this.pay(rerollPrice(this.S))) return false;
    this.restockShop(now);
    this.log("Le marchand renouvelle son étal.");
    return true;
  }

  buyShopItem(id) {
    const S = this.S, shop = S.shop;
    const it = shop && shop.items.find((i) => i.id === id);
    if (!it || this.bagFull() || !this.pay(it.price)) return false;
    shop.items = shop.items.filter((i) => i !== it);
    delete it.price;
    if (it.r === LEGENDARY) S.stats.legendaries++;
    S.bag.push(it);
    this.log("Acheté au marchand : " + it.name + ".");
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
    this.log(`${source} : +${n} % de vitesse de déplacement, pour toujours (total +${S.speed} %).`);
    this.emit("feather", { speed: S.speed, gain: n, source });
    this.changed();
  }

  /** Après chaque victoire : plume du vent, événements temporaires. */
  rollRareThings(m) {
    const chance = m.boss ? FEATHER.boss : m.elite ? FEATHER.elite : FEATHER.normal;
    if (rand() < chance) { this.S.stats.feathers = (this.S.stats.feathers || 0) + 1; this.gainSpeed(FEATHER.gain, "Plume du vent"); }
    for (const id in EVENTS) if (rand() < EVENTS[id].chance) { this.startEvent(id); break; }
  }

  /** Clic sur l'étoile filante. */
  catchStar() {
    if (!this.R.star) return false;
    this.R.star = null;
    const gold = Math.round(3 * Math.pow(1.25, this.S.best - 1) * 150);
    this.S.gold += gold;
    this.S.stats.stars = (this.S.stats.stars || 0) + 1;
    this.emit("starCaught", { gold });
    this.gainSpeed(STAR.speedGain, "Étoile filante");
    this.log(`Étoile filante attrapée : +${fmt(gold)} or !`);
    this.changed();
    return true;
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

  questProgress(kind, n, type) {
    for (const q of this.S.quests.slots) {
      if (q.kind !== kind || questDone(q)) continue;
      if (kind === "hunt" && q.type !== type) continue;
      q.progress = kind === "zone" ? this.S.best : q.progress + n;
      if (questDone(q)) { this.emit("questDone", { quest: q }); this.log("Quête accomplie ! Récompense à réclamer."); }
    }
  }

  questsReady() { return this.S.quests.slots.filter(questDone).length; }

  claimQuest(uid) {
    const S = this.S, Q = S.quests, i = Q.slots.findIndex((q) => q.uid === uid);
    if (i < 0 || !questDone(Q.slots[i])) return false;
    const rw = Q.slots[i].reward, parts = [];
    if (rw.chest && this.bagFull()) { this.log("Sac plein : libère une place pour recevoir le coffre."); return false; }
    if (rw.gold) { S.gold += rw.gold; parts.push(fmt(rw.gold) + " or"); }
    if (rw.chest) { const it = this.newItem(rw.chest, S.best); S.bag.push(it); parts.push(it.name); this.emit("loot", { item: it, mon: null }); }
    if (rw.buff) { S.buffs[rw.buff] = Math.min(7200, (S.buffs[rw.buff] || 0) + 600); this.invalidateStats(); parts.push("élixir de 10 min"); }
    if (rw.potions) { S.potions = Math.min(20, S.potions + rw.potions); parts.push(rw.potions + " potions"); }
    if (rw.shards) { S.prestige.shards += rw.shards; S.prestige.total += rw.shards; parts.push(rw.shards + " éclats d’étoile"); }
    if (rw.egg) { this.gainEgg(); parts.push("un œuf"); }
    Q.slots.splice(i, 1);
    Q.completed++;
    this.log("Récompense de quête : " + parts.join(", ") + ".");
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
    this.log("Un œuf ! Fais-le éclore dans l’onglet Familiers.");
    this.changed();
  }

  /** Fait éclore un œuf. Renvoie { pet, isNew }. */
  hatchEgg() {
    const P = this.S.pets;
    if (P.eggs <= 0) return null;
    P.eggs--;
    const pet = pick(PETS), own = P.owned[pet.id];
    if (!own) {
      P.owned[pet.id] = { lvl: 1, xp: 0 };
      if (!P.active) P.active = pet.id;
      this.log(`L’œuf éclot : ${pet.name} !`);
    } else {
      this.log(`L’œuf éclot : encore un ${pet.name.toLowerCase()} ! Ton ${pet.name.toLowerCase()} gagne de l’expérience.`);
      this.petAddXp(pet.id, DUPLICATE_XP);
    }
    this.invalidateStats();
    this.changed();
    return { pet, isNew: !own };
  }

  setPet(id) {
    if (!this.S.pets.owned[id] || this.S.pets.active === id) return false;
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
      this.log(`${PET_INDEX[id].name} passe au niveau ${own.lvl}.`);
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
    P.skillPts = (P.skillPts || 0) + skillGain;
    // Ce qui est conservé
    Object.assign(f, {
      prestige: P, pets: old.pets, bestiary: old.bestiary, achievements: old.achievements, cls: old.cls,
      upgrades: old.upgrades, bagSize: old.bagSize, autoSell: old.autoSell, autoAdvance: old.autoAdvance,
      stats: old.stats, nextId: old.nextId, log: old.log, skills: old.skills,
    });
    const eff = prestigeEffects(f);
    f.zone = f.best = Math.max(1, Math.min(1 + (eff.startZone || 0), old.best - 5));
    f.potions += eff.potions || 0;
    this.load(f);
    this.log(`Ascension n° ${P.count} : +${gain} éclats d’étoile et +${skillGain} points de compétence permanents. Une nouvelle aventure commence${f.zone > 1 ? " en zone " + f.zone : ""} !`);
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
    this.log(`Constellation ${c.name} : rang ${rank + 1}.`);
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
    if (n.kind === "keystone") this.log("Clé de voûte : " + n.name + " !");
    this.changed();
    return true;
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
    this.log("Arbre de compétences réinitialisé.");
    this.changed();
    return true;
  }

  reset() { this.load(freshState()); }
}

export { forgeCost, sellValue, monsterBase };
