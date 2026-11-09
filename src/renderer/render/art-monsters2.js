// Deuxième fournée de monstres (dessinés tournés vers la droite, retournés à
// l'affichage pour faire face au héros). Même format que MONSTER_ART.
export const MONSTER_ART_2 = {
  frog: { pal: { G: "#5fae4a", g: "#3e7a30", L: "#d8e8a0", E: "#1a1a1a", W: "#ffffff", R: "#c0392b" }, frames: [
    [".....WW.WW.", ".....EG.EG.", "..GGGGGGGGG", ".GGGGLLLLLR", "GGgGLLLLLL.", "Gg.gg..gg..", "GG.......GG"],
    [".....WW.WW.", ".....EG.EG.", "..GGGGGGGGG", ".GGGGLLLLL.", "GGgGLLLLLLR", ".gggg.gggg.", "..GG...GG.."]] },
  snake: { pal: { G: "#8ab84a", g: "#5a8a2a", Y: "#e8d84a", E: "#1a1a1a", R: "#e2552b" }, frames: [
    [".........GGG.", "........GGGEG", "........GG.GR", "...ggg..GG...", "..GYYYG.GG...", ".GG...GGGG...", "GG.....gg...."],
    [".........GGG.", "........GGGEG", ".......GG..GR", "..ggg..GG....", ".GYYYGGGG....", "GG...GGGg....", "g............"]] },
  beetle: { pal: { B: "#3a7ab8", b: "#24507a", S: "#9fd8ff", K: "#1a1a2a", E: "#ffd34d" }, frames: [
    ["...bBBBb....", "..bBBSBBb...", ".bBBBSBBBbK.", ".bBBBSBBBbKE", "..bbbbbbbK..", "..K.K.K.K..."],
    ["...bBBBb....", "..bBBSBBb...", ".bBBBSBBBbK.", ".bBBBSBBBbKE", "..bbbbbbbK..", ".K.K.K.K...."]] },
  boar: { pal: { B: "#7a5233", b: "#5a3a20", D: "#3a2414", W: "#f4f0e8", E: "#1a1a1a", P: "#c98a7a" }, frames: [
    ["..D.D.D......", ".bBBBBBBBB...", "bBBBBBBBBBBE.", "BBBBBBBBBBBPP", "BBBBBBBBBBBWP", ".bBBBBBBBb.W.", ".D.D...D.D..."],
    ["..D.D.D......", ".bBBBBBBBB...", "bBBBBBBBBBBE.", "BBBBBBBBBBBPP", "BBBBBBBBBBBWP", ".bBBBBBBBb.W.", "D...D.D...D.."]] },
  bear: { pal: { B: "#6b4226", b: "#4a2c18", L: "#a87a52", E: "#1a1a1a", N: "#2a1a10" }, frames: [
    ["........bb.bb", ".......bBBBBb", "..bbbbbBBBEBB", ".bBBBBBBBBBLN", "bBBBBBBBBBBL.", "BBBBBBBBBBB..", "BBBBBBBBBBb..", ".bB.bB..bB.bB", ".bb.bb..bb.bb"],
    ["........bb.bb", ".......bBBBBb", "..bbbbbBBBEBB", ".bBBBBBBBBBLN", "bBBBBBBBBBBL.", "BBBBBBBBBBB..", "BBBBBBBBBBb..", "bB..bB.bB..bB", "bb..bb.bb..bb"]] },
  orc: { pal: { G: "#6a9a4a", g: "#4a7a2a", A: "#5a4632", a: "#3a2a1a", W: "#f4f0e8", E: "#ff4a4a", M: "#9aa3ad" }, frames: [
    ["....gGGg....", "...gGGGEG...", "...GGGGGG...", "....GWGW....", "..aAAAAAAa.M", ".GaAAAAAAaGM", ".G.AAAAAA.GM", "...AA..AA..M", "...gg..gg..."],
    ["....gGGg....", "...gGGGEG...", "...GGGGGG...", "....GWGW....", "..aAAAAAAa..", ".GaAAAAAAaGMMM", ".G.AAAAAA.G..", "..AA....AA..", "..gg....gg.."]] },
  cultist: { pal: { R: "#8a2a3a", r: "#5a1a24", S: "#cfc0b0", E: "#ffd34d", Y: "#e9b949", K: "#1a1424" }, frames: [
    ["....rRRr...", "...rRRRRr..", "...RKKEKR..", "...rKKKKr..", "..rRRYRRRr.", ".SrRRYRRRrS", "..rRRYRRRr.", "..rRRRRRRr.", ".rRRRRRRRRr", ".rr.....rr."],
    ["....rRRr...", "...rRRRRr..", "...RKKEKR..", "...rKKKKr.Y", "..rRRYRRRrS", ".SrRRYRRRr.", "..rRRYRRRr.", "..rRRRRRRr.", ".rRRRRRRRRr", "..rr...rr.."]] },
  wasp: { pal: { Y: "#ffd34d", K: "#2a2638", W: "#dff3ff", E: "#ff4a4a" }, fly: true, frames: [
    ["...WW.WW...", "...WWWWW...", "....W.W....", ".YKYKYKYY..", "KYKYKYKYYYE", ".YKYKYKYY..", "K.........."],
    ["...........", "...........", "...WWWWW...", ".YKYKYKYYW.", "KYKYKYKYYYE", ".YKYKYKYY..", "K.........."]] },
  jelly: { pal: { P: "#ff9ad8", p: "#c86aa8", W: "#ffe0f4", E: "#5a1a4a" }, fly: true, frames: [
    ["...pPPPp...", "..pPWPPPp..", ".pPPPPPPPp.", ".pPPEPPEPp.", ".ppppppppp.", "..p.p.p.p..", ".p.p.p.p...", "..p.p.p.p.."],
    ["...pPPPp...", "..pPWPPPp..", ".pPPPPPPPp.", ".pPPEPPEPp.", "..ppppppp..", "..p.p.p.p..", "..p.p.p.p..", ".p.p.p.p..."]] },
  lizard: { pal: { G: "#4ab88a", g: "#2a8a5a", Y: "#e8d84a", E: "#1a1a1a", R: "#e2552b" }, frames: [
    ["..........GGG.", "........gGGEGG", "GG....gGGGGGR.", ".GGGGGGGGGGg..", "..gYYYYYYYg...", "..G.G...G.G...", ".gg.gg.gg.gg.."],
    ["..........GGG.", "........gGGEGG", ".GG...gGGGGGR.", "G.GGGGGGGGGg..", "..gYYYYYYYg...", "...G.G.G.G....", "..gg.ggg.gg..."]] },
  worm: { pal: { P: "#d8a07a", p: "#a8704a", K: "#3a1a10", W: "#f4f0e8" }, frames: [
    [".......pPPp.", "......pPPPPp", "......PPKWKP", "......PPPPPP", "..pPp.pPPPp.", ".pPPPpPPPp..", "pPP.pPPp...."],
    ["............", ".......pPPp.", "......pPPPKW", "......PPPPPP", ".pPp..pPPPp.", "pPPPPpPPPp..", "pP..pPPp...."]] },
  mimic: { pal: { B: "#8a5a2b", b: "#5c3a1a", Y: "#ffd34d", W: "#ffffff", R: "#c0392b", E: "#1a1a1a" }, frames: [
    ["..bBBBBBBBb.", ".bBBBBBBBBBb", ".YYYYYYYYYYY", ".W.W.W.W.W.W", ".R.RRRRRRR.R", ".W.W.W.W.W.W", ".BBBBBYYBBBB", ".BBBBBYEBBBB", ".bBBBBBBBBBb", "..b......b.."],
    ["..bBBBBBBBb.", ".bBBBBBBBBBb", ".YYYYYYYYYYY", ".WWWWWWWWWWW", ".BBBBBYYBBBB", ".BBBBBYEBBBB", ".bBBBBBBBBBb", "..b......b..", "............", "............"]] },
  bandit: { pal: { S: "#f1c7a0", K: "#2a2638", R: "#8a2a2a", A: "#5a4632", a: "#3a2a1a", W: "#c9d1dc", E: "#1a1a1a" }, frames: [
    ["....KKKK....", "...KKKKKK...", "...KSSSES...", "...RRRRRR...", "....SSSS....", "..aAAAAAAa..", ".SaAAAAAAaSW", "...AAAAAA..W", "...KK..KK..W", "...KK..KK..."],
    ["....KKKK....", "...KKKKKK...", "...KSSSES...", "...RRRRRR...", "....SSSS....", "..aAAAAAAa..", ".SaAAAAAAaSWWW", "...AAAAAA....", "..KK....KK...", "..KK....KK..."]] },
  crow: { pal: { K: "#2a2638", k: "#1a1724", Y: "#ffb733", E: "#ff4a4a" }, fly: true, frames: [
    ["..k.......", "..kk......", "..kkk..KK.", "kKKKKKKKEY", ".KKKKKKKKY", "..KKKKK...", "...Y.Y...."],
    [".........", "........KK", "kKKKKKKKEY", ".KkkkKKKKY", "..kkk.K...", "..kk......", "..k......."]] },
  sporeling: { pal: { M: "#a86ad8", m: "#7a4aa8", W: "#f4f0e8", S: "#e8e0d0", E: "#1a1a1a" }, frames: [
    ["...mMMMm...", "..mMWMMWMm.", ".mMMMMMMMMm", "..mmmmmmmm.", "....SESE...", "....SSSS...", "...S.SS.S..", "....S..S..."],
    ["...mMMMm...", "..mMWMMWMm.", ".mMMMMMMMMm", "..mmmmmmmm.", "....SESE...", "...SSSSSS..", "....SSSS...", "...S....S.."]] },
  knight: { pal: { M: "#c9d1dc", m: "#8a93a0", K: "#3a3550", R: "#c0392b", W: "#eef3f8", B: "#e9b949", G: "#6b4a2b" }, frames: [
    ["....RR......", "...mMMMm....", "...MKKKM....", "...MMMMM....", "..BmMMMmB.W.", ".mMMMMMMMmW.", "mMmMMBMMmMW.", "mMm.MMMM.mG.", "....MM.MM...", "...mm..mm..."],
    ["....RR......", "...mMMMm....", "...MKKKM....", "...MMMMM....", "..BmMMMmB...", ".mMMMMMMMmWWW", "mMmMMBMMmG...", "mMm.MMMM.....", "...MM..MM...", "..mm....mm.."]] },
};

// Le Briseur d'Étoiles (boss final, zone 200) : titan en armure sombre, couronne d'éclats d'étoile, cape de nuit
// semée d'étoiles, un éclat brandi. Tourné vers la droite comme les autres, construit en taille de boss.
export const STARBREAKER_ART = {
  pal: { K: "#140f26", V: "#3a2466", v: "#5a3a9a", A: "#2a2840", M: "#6d6a92", E: "#7ff3ff", S: "#ffe27a", s: "#fff6c8" },
  frames: [
    ["...S.s.S......", "...SSSSS......", "..KMMMMMK.....", "..KAAEAEK....S", "..KAAAAAK...sS", ".vVKMMMKVv..S.",
     "vVVMMSMMMVAAA.", "vVVMMMMMMVv...", "vVsVMMMMVVv...", "vVVVAAAAVVv...", ".vVVA..AVVs...", ".vV.A..A.Vv...", "..v.KK.KK.v..."],
    ["...S.s.S....s.", "...SSSSS...sSs", "..KMMMMMK...S.", "..KAAEAEK..A..", "..KAAAAAK.A...", ".vVKMMMKVA....",
     "vVVMMSMMMV....", "VVVMMMMMMVv...", "vVVsMMMMVVv...", ".vVVAAAAVVv...", ".vVVA..AVVv...", "..vVA..AVv....", "..v.KK.KK.v..."],
  ],
};
