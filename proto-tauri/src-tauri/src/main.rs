// Essai Tauri (demande de Victor, 2026-11-11) : seulement la bande du jeu, pour comparer mémoire et processeur
// avec la version Electron dans le Gestionnaire des tâches de Windows. Les pages du jeu sont les mêmes
// (src/renderer, copiées par build-web.mjs) ; seul le pont avec le système change (bridge.js -> commandes ci-dessous).
// Sauvegarde à part (%APPDATA%\com.sillwalker.prototauri) : la vraie sauvegarde n'est que LUE, une fois, au premier lancement.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde_json::{json, Value};
use std::fs;
use std::sync::Mutex;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager, PhysicalPosition, PhysicalSize, State};

const STRIP_HEIGHT: f64 = 120.0; // mêmes valeurs que src/shared/config.js
const PANEL_MAX_HEIGHT: f64 = 500.0;
const PANEL_MIN_GAP: f64 = 40.0;

#[derive(Default)]
struct AppState {
    rects: Mutex<Vec<[f64; 4]>>, // zones cliquables (px de la page, comme Electron)
    interactive: Mutex<bool>,
    panel_height: Mutex<f64>,
    scale: Mutex<f64>,
}

fn layout(state: &AppState) -> Value {
    json!({
        "mode": "strip",
        "edge": "bottom",
        "panelHeight": *state.panel_height.lock().unwrap(),
        "stripHeight": STRIP_HEIGHT,
        "opacity": 1,
    })
}

#[tauri::command]
fn init_get(state: State<AppState>) -> Value {
    json!({
        "isDev": false,
        "devControls": false,
        "crawl": false,
        "devSpeed": 1,
        "layout": layout(&state),
        "visible": true,
        "version": "essai-tauri",
        "steam": { "available": false, "status": "absent" },
        "onBattery": false,
        "idle": false,
    })
}

fn own_save(app: &AppHandle) -> Option<std::path::PathBuf> {
    app.path().app_data_dir().ok().map(|d| d.join("save.json"))
}

#[tauri::command]
fn save_load(app: AppHandle) -> Value {
    let read = |p: &std::path::Path| fs::read_to_string(p).ok().and_then(|t| serde_json::from_str::<Value>(&t).ok());
    if let Some(p) = own_save(&app) {
        if let Some(v) = read(&p) {
            return json!({ "data": v, "source": "essai" });
        }
    }
    // Premier lancement : copie de la partie de la version Electron (lecture seule, jamais réécrite).
    if let Ok(d) = app.path().data_dir() {
        if let Some(v) = read(&d.join("Sillwalker").join("save.json")) {
            return json!({ "data": v, "source": "copie de la partie Electron" });
        }
    }
    json!({ "data": null, "source": "neuve" })
}

#[tauri::command]
fn save_write(app: AppHandle, json: String) -> Result<(), String> {
    let p = own_save(&app).ok_or("dossier introuvable")?;
    if let Some(dir) = p.parent() {
        fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    }
    let tmp = p.with_extension("tmp");
    fs::write(&tmp, json).map_err(|e| e.to_string())?;
    fs::rename(&tmp, &p).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_panel_open(open: bool) {
    let _ = open; // la fenêtre a déjà la hauteur bande + panneau (comme Electron) : rien à redimensionner
}

#[tauri::command]
fn set_hit_rects(state: State<AppState>, rects: Vec<Vec<f64>>) {
    *state.rects.lock().unwrap() = rects
        .into_iter()
        .filter(|r| r.len() == 4)
        .map(|r| [r[0], r[1], r[2], r[3]])
        .collect();
}

#[tauri::command]
fn ready(app: AppHandle) {
    let _ = app.emit("visibility", true);
}

#[tauri::command]
fn app_exit(app: AppHandle) {
    app.exit(0);
}

/// Bande en bas de la zone de travail (écran moins la barre des tâches), hauteur bande + panneau, comme Electron.
fn place(app: &AppHandle) {
    let Some(win) = app.get_webview_window("main") else { return };
    let Ok(Some(mon)) = win.primary_monitor() else { return };
    let scale = mon.scale_factor();
    let wa = mon.work_area();
    let (wx, wy, ww, wh) = (wa.position.x, wa.position.y, wa.size.width, wa.size.height);
    let panel = (wh as f64 / scale - STRIP_HEIGHT - PANEL_MIN_GAP).min(PANEL_MAX_HEIGHT).max(200.0);
    let h = ((STRIP_HEIGHT + panel) * scale).round() as u32;
    let state = app.state::<AppState>();
    *state.panel_height.lock().unwrap() = panel;
    *state.scale.lock().unwrap() = scale;
    let _ = win.set_size(PhysicalSize::new(ww, h));
    let _ = win.set_position(PhysicalPosition::new(wx, wy + wh as i32 - h as i32));
    let _ = win.set_ignore_cursor_events(true);
    let _ = win.set_always_on_top(true);
    let _ = win.show();
    let _ = app.emit("layout", layout(&state));
}

/// 20 fois/s, comme Electron (strip-window.js pollCursor) : la fenêtre ne prend les clics que sous un élément `.hit`.
fn poll_cursor(app: AppHandle) {
    std::thread::spawn(move || loop {
        std::thread::sleep(Duration::from_millis(50));
        let Some(win) = app.get_webview_window("main") else { continue };
        let (Ok(cur), Ok(pos)) = (win.cursor_position(), win.outer_position()) else { continue };
        let state = app.state::<AppState>();
        let scale = *state.scale.lock().unwrap();
        let s = if scale > 0.0 { scale } else { 1.0 };
        let (cx, cy) = ((cur.x - pos.x as f64) / s, (cur.y - pos.y as f64) / s);
        let hit = state.rects.lock().unwrap().iter().any(|r| cx >= r[0] && cy >= r[1] && cx < r[0] + r[2] && cy < r[1] + r[3]);
        let mut inter = state.interactive.lock().unwrap();
        if *inter != hit {
            *inter = hit;
            let _ = win.set_ignore_cursor_events(!hit);
        }
    });
}

fn main() {
    tauri::Builder::default()
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![
            init_get,
            save_load,
            save_write,
            set_panel_open,
            set_hit_rects,
            ready,
            app_exit
        ])
        .setup(|app| {
            place(app.handle());
            poll_cursor(app.handle().clone());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("erreur au lancement de l'essai Tauri");
}
