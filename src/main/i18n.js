// Textes du processus principal (menu de l'icône de notification), en 10 langues.
// La langue est envoyée par la page au démarrage (ipc « lang:set ») et retenue
// dans les réglages de la fenêtre pour le lancement suivant.
const T = {
  strip:    { fr: "Bande", en: "Strip", zh: "横条", ru: "Полоса", es: "Franja", pt: "Faixa", de: "Leiste", ja: "バー", pl: "Pasek", ko: "띠" },
  mini:     { fr: "Mini (près de l’horloge)", en: "Mini (near the clock)", zh: "迷你（时钟旁）", ru: "Мини (у часов)", es: "Mini (junto al reloj)", pt: "Mini (perto do relógio)", de: "Mini (neben der Uhr)", ja: "ミニ（時計の横）", pl: "Mini (przy zegarze)", ko: "미니 (시계 옆)" },
  icon:     { fr: "Icône seule", en: "Icon only", zh: "仅图标", ru: "Только значок", es: "Solo icono", pt: "Só ícone", de: "Nur Symbol", ja: "アイコンのみ", pl: "Tylko ikona", ko: "아이콘만" },
  display:  { fr: "Affichage", en: "Display", zh: "显示", ru: "Отображение", es: "Pantalla", pt: "Exibição", de: "Anzeige", ja: "表示", pl: "Wyświetlanie", ko: "표시" },
  panel:    { fr: "Ouvrir le panneau", en: "Open the panel", zh: "打开面板", ru: "Открыть панель", es: "Abrir el panel", pt: "Abrir o painel", de: "Panel öffnen", ja: "パネルを開く", pl: "Otwórz panel", ko: "패널 열기" },
  position: { fr: "Position", en: "Position", zh: "位置", ru: "Положение", es: "Posición", pt: "Posição", de: "Position", ja: "位置", pl: "Pozycja", ko: "위치" },
  bottom:   { fr: "En bas de l’écran", en: "Bottom of the screen", zh: "屏幕底部", ru: "Внизу экрана", es: "Abajo de la pantalla", pt: "Embaixo da tela", de: "Unten am Bildschirm", ja: "画面の下", pl: "Na dole ekranu", ko: "화면 아래" },
  top:      { fr: "En haut de l’écran", en: "Top of the screen", zh: "屏幕顶部", ru: "Вверху экрана", es: "Arriba de la pantalla", pt: "No topo da tela", de: "Oben am Bildschirm", ja: "画面の上", pl: "Na górze ekranu", ko: "화면 위" },
  screen:   { fr: "Écran", en: "Screen", zh: "屏幕", ru: "Экран", es: "Pantalla", pt: "Tela", de: "Bildschirm", ja: "画面", pl: "Ekran", ko: "화면" },
  primary:  { fr: "principal", en: "primary", zh: "主屏幕", ru: "основной", es: "principal", pt: "principal", de: "Hauptbildschirm", ja: "メイン", pl: "główny", ko: "주 화면" },
  opacity:  { fr: "Opacité", en: "Opacity", zh: "不透明度", ru: "Непрозрачность", es: "Opacidad", pt: "Opacidade", de: "Deckkraft", ja: "不透明度", pl: "Krycie", ko: "불투명도" },
  fullscreen: { fr: "Se cacher devant les jeux et vidéos en plein écran", en: "Hide behind full-screen games and videos", zh: "全屏游戏和视频时隐藏", ru: "Скрываться при полноэкранных играх и видео", es: "Ocultarse ante juegos y vídeos a pantalla completa", pt: "Esconder-se em jogos e vídeos em tela cheia", de: "Bei Vollbild-Spielen und -Videos ausblenden", ja: "全画面のゲームや動画では隠れる", pl: "Ukrywaj się przy grach i filmach na pełnym ekranie", ko: "전체 화면 게임과 동영상에서는 숨기" },
  eco:      { fr: "Économie d’énergie (15 images/s)", en: "Power saving (15 fps)", zh: "节能模式（15 帧/秒）", ru: "Энергосбережение (15 кадров/с)", es: "Ahorro de energía (15 fps)", pt: "Economia de energia (15 fps)", de: "Energiesparen (15 Bilder/s)", ja: "省電力（15 fps）", pl: "Oszczędzanie energii (15 kl./s)", ko: "절전 (초당 15프레임)" },
  login:    { fr: "Lancer au démarrage de Windows", en: "Launch at Windows startup", zh: "开机时启动", ru: "Запускать вместе с Windows", es: "Iniciar con Windows", pt: "Iniciar com o Windows", de: "Mit Windows starten", ja: "Windows 起動時に開始", pl: "Uruchamiaj z systemem Windows", ko: "Windows 시작 시 실행" },
  quit:     { fr: "Quitter Sillwalker", en: "Quit Sillwalker", zh: "退出 Sillwalker", ru: "Выйти из Sillwalker", es: "Salir de Sillwalker", pt: "Sair do Sillwalker", de: "Sillwalker beenden", ja: "Sillwalker を終了", pl: "Zamknij Sillwalker", ko: "Sillwalker 종료" },
  lvl:      { fr: "Niv.", en: "Lv.", zh: "等级", ru: "Ур.", es: "Nv.", pt: "Nv.", de: "Stf.", ja: "Lv.", pl: "Poz.", ko: "Lv." },
  zone:     { fr: "Zone", en: "Zone", zh: "区域", ru: "Зона", es: "Zona", pt: "Zona", de: "Zone", ja: "エリア", pl: "Strefa", ko: "지역" },
  record:   { fr: "record", en: "best", zh: "纪录", ru: "рекорд", es: "récord", pt: "recorde", de: "Rekord", ja: "記録", pl: "rekord", ko: "기록" },
  gold:     { fr: "or", en: "gold", zh: "金币", ru: "золота", es: "oro", pt: "ouro", de: "Gold", ja: "ゴールド", pl: "złota", ko: "골드" },
};
let lang = "en";
module.exports = {
  setLang(id) { if (typeof id === "string" && T.strip[id]) lang = id; },
  getLang: () => lang,
  L: (key) => (T[key] && (T[key][lang] || T[key].en)) || key,
};
