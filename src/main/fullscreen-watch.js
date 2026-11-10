// « Bon voisin » (P1, étude des concurrents : « toujours au premier plan » gênant) : sous Windows, la bande se cache
// tant qu'une application est en plein écran (jeu, vidéo, présentation), puis revient.
//
// Électron n'expose pas cet état : un petit processus PowerShell caché, lancé une fois, appelle
// SHQueryUserNotificationState (shell32) toutes les 2 s et écrit l'état sur sa sortie :
//   2 = QUNS_BUSY (appli plein écran), 3 = QUNS_RUNNING_D3D_FULL_SCREEN (jeu), 4 = QUNS_PRESENTATION_MODE.
// Ailleurs que sous Windows, ou si PowerShell échoue : rien ne se passe (la bande reste comme avant).
const { spawn } = require("child_process");

const FULLSCREEN_STATES = new Set([2, 3, 4]);
const SCRIPT = [
  "$ErrorActionPreference = 'Stop'",
  "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class SwQ { [DllImport(\"shell32.dll\")] public static extern int SHQueryUserNotificationState(out int s); }'",
  "while ($true) { $s = 0; [void][SwQ]::SHQueryUserNotificationState([ref]$s); [Console]::Out.WriteLine($s); [Console]::Out.Flush(); Start-Sleep -Seconds 2 }",
].join("; ");

/** Analyse une ligne de sortie : true (plein écran), false (normal) ou null (illisible). */
function parseState(line) {
  const n = parseInt(String(line).trim(), 10);
  return Number.isFinite(n) ? FULLSCREEN_STATES.has(n) : null;
}

/**
 * Surveille le plein écran. `onChange(fullscreen)` est appelé à chaque changement. Renvoie { stop }.
 * `enabled()` est relu à chaque mesure : décocher le réglage fait revenir la bande aussitôt.
 */
function watchFullscreen({ onChange, enabled = () => true, platform = process.platform }) {
  if (platform !== "win32") return { stop() {} };
  let child = null, last = false, buf = "", stopped = false;
  const report = (fs) => { const v = !!fs && enabled(); if (v !== last) { last = v; onChange(v); } };
  try {
    child = spawn("powershell.exe", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", SCRIPT], { windowsHide: true, stdio: ["ignore", "pipe", "ignore"] });
    child.stdout.on("data", (d) => {
      buf += d.toString();
      const lines = buf.split(/\r?\n/); buf = lines.pop();
      for (const l of lines) { const s = parseState(l); if (s !== null) report(s); }
    });
    child.on("error", () => { child = null; report(false); }); // PowerShell absent : la bande reste visible
    child.on("exit", () => { child = null; if (!stopped) report(false); });
  } catch { child = null; }
  return { stop() { stopped = true; if (child) try { child.kill(); } catch { /* déjà fini */ } if (last) { last = false; onChange(false); } } };
}

module.exports = { watchFullscreen, parseState, FULLSCREEN_STATES };
