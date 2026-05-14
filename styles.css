/* ==========================================
   VARIABLES Y BASE
   ========================================== */
:root {
  --magma-red:#CA1111;
  --magma-amber:#CE8D25;
  --magma-black:#0f0f0e;
  --magma-bone:#E2DEC0;
  --stroke: rgba(226,222,192,.08);
  --glass-bg: rgba(20,20,18,0.4);
  --radius: 16px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; cursor: none; }
body { background: var(--magma-black); color: var(--magma-bone); font-family: system-ui, sans-serif; overflow-x: hidden; }

/* Para inputs queremos que el usuario vea el cursor nativo de escritura */
input, select, textarea { cursor: auto; }

/* ==========================================
   UX: CURSOR PERSONALIZADO
   ========================================== */
.custom-cursor {
  position: fixed; top: 0; left: 0; width: 6px; height: 6px;
  background: var(--magma-amber); border-radius: 50%;
  pointer-events: none; z-index: 10000;
  transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s;
}
.cursor-follower {
  position: fixed; top: 0; left: 0; width: 30px; height: 30px;
  border: 1px solid rgba(206,141,37,0.5); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, background 0.3s, border-color 0.3s;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
}
body.hovering .cursor-follower {
  width: 50px; height: 50px; background: rgba(206,141,37,0.1); border-color: transparent;
}

/* ==========================================
   UX: DOCK FLOTANTE
   ========================================== */
.mac-dock-wrapper {
  position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 1000;
}
.mac-dock {
  display: flex; gap: 8px; align-items: center; padding: 10px 14px;
  background: rgba(30,28,24, 0.65); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(226,222,192, 0.08); border-radius: 999px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.dock-item {
  position: relative; display: flex; align-items: center; justify-content: center;
  width: 45px; height: 45px; border-radius: 50%;
  background: rgba(255,255,255,0.02); color: var(--magma-bone);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: none;
  text-decoration: none; border: 1px solid transparent;
}
.dock-item svg { width: 20px; height: 20px; fill: currentColor; }
.dock-item::before {
  content: attr(data-tooltip); position: absolute; bottom: -35px;
  background: rgba(20,20,18,0.9); padding: 4px 10px; border-radius: 6px;
  font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase;
  opacity: 0; transform: translateY(-10px); transition: all 0.2s ease;
  pointer-events: none; white-space: nowrap; border: 1px solid var(--stroke);
}
.dock-item:hover { 
  transform: scale(1.35) translateY(2px); z-index: 2; 
  border-color: rgba(206,141,37,0.4); background: rgba(206,141,37,0.1); 
  margin: 0 10px; color: var(--magma-amber);
}
.dock-item:hover::before { opacity: 1; transform: translateY(0); }
.dock-item:has(+ .dock-item:hover), .dock-item:hover + .dock-item { transform: scale(1.15); margin: 0 5px; }
.dock-item.primary { background: var(--magma-amber); color: #111; }

/* ==========================================
   TIPOGRAFÍA Y ESTRUCTURA GENERAL
   ========================================== */
.container { max-width: 1080px; margin:0 auto; padding:0 24px; }
.section { padding: 100px 0; }
h1, h2 { font-family: "Pragmatica", "Arial Black", sans-serif; font-size: clamp(36px, 5vw, 56px); line-height: 1.05; margin-bottom: 20px; letter-spacing: -0.02em; text-wrap: balance;}
h3 { font-family: "Pragmatica", sans-serif; font-size: 20px; color: var(--magma-amber); margin-bottom: 12px; }
p { color: rgba(226,222,192,.7); font-size: 16px; margin-bottom: 16px; max-width: 65ch; }
.kicker { display:inline-block; font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color: var(--magma-amber); margin-bottom:16px; font-weight:700; border: 1px solid rgba(206,141,37,0.3); padding: 6px 14px; border-radius: 99px;}

.btn {
  display:inline-flex; align-items:center; justify-content:center;
  padding:16px 32px; border-radius:99px; border:1px solid var(--stroke);
  background: rgba(255,255,255,0.03); color: var(--magma-bone);
  font-weight:600; text-transform:uppercase; font-size:13px; letter-spacing:0.05em; cursor:none; text-decoration: none;
  transition: all 0.3s ease;
}
.btn.primary { background: var(--magma-amber); color: #111; border-color: transparent; }
.split { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }

/* ==========================================
   HERO BENTO GRID & SPOTLIGHT
   ========================================== */
.hero-bento { padding: 140px 0 60px; }
.bento-grid-hero { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto; gap: 16px; }

.bento-card {
  background: var(--glass-bg); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--stroke); border-radius: 24px; padding: 40px;
  position: relative; overflow: hidden;
}

.main-val { grid-column: span 2; grid-row: span 2; display: flex; flex-direction: column; justify-content: center; }
.video-card { grid-column: span 1; grid-row: span 1; padding: 0; aspect-ratio: 1/1; cursor: none; }
.stat-card { grid-column: span 1; grid-row: span 1; display: flex; flex-direction: column; justify-content: flex-end; }
.stat-number { font-family: "Pragmatica", sans-serif; font-size: 56px; color: var(--magma-bone); line-height: 1; margin-bottom: 10px;}

.interactive-media { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8) contrast(1.1); transition: filter 0.5s ease; }
.video-card:hover .interactive-media { filter: brightness(1.1); }
.video-ui { position: absolute; bottom: 20px; left: 20px; right: 20px; display: flex; justify-content: space-between; align-items: center; }
.video-toggle { width: 45px; height: 45px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); background: rgba(10,10,10,0.5); backdrop-filter: blur(10px); color: #fff; display: flex; align-items: center; justify-content: center; cursor: none; }
.video-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; opacity: 0; transform: translateX(10px); transition: all 0.3s ease; }
.video-card:hover .video-label { opacity: 1; transform: translateX(0); }

/* Efecto Spotlight */
.spotlight-card::before {
  content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(206,141,37,0.1), transparent 40%);
  pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.5s ease;
}
.spotlight-card:hover::before { opacity: 1; }

/* ==========================================
   UX: ANIMACIONES GENERALES (REVEAL)
   ========================================== */
.reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1); will-change: opacity, transform; }
.reveal.active { opacity: 1; transform: translateY(0); }

/* ==========================================
   MÉTRICAS EVOLUTIVAS
   ========================================== */
.metrics-section { padding-top: 40px; }
.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.evo-metric-card { background: rgba(20,20,18,0.6); border: 1px solid var(--stroke); padding: 30px; border-radius: var(--radius); backdrop-filter: blur(10px); }
.evo-title { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(226,222,192,0.9); margin-bottom: 24px; font-weight: 600;}
.evo-bar-container { position: relative; height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-bottom: 20px; overflow: hidden; }
.evo-bar-fill { position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, var(--magma-red), var(--magma-amber)); border-radius: 10px; transition: width 2s cubic-bezier(0.22, 1, 0.36, 1); }
.evo-stats { display: flex; justify-content: space-between; align-items: flex-end; }
.evo-before { font-size: 12px; color: rgba(226,222,192,0.4); text-transform: uppercase; }
.evo-after { font-family: "Pragmatica", sans-serif; font-size: 42px; font-weight: 800; color: var(--magma-bone); line-height: 0.9;}
.evo-after span { font-size: 20px; color: var(--magma-amber); }

/* ==========================================
   TARJETAS EXPANDIBLES (RAUNO) & MODAL
   ========================================== */
.rauno-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
.rauno-card { position: relative; background: rgba(255,255,255,0.02); border: 1px solid var(--stroke); padding: 32px; border-radius: var(--radius); overflow: hidden; cursor: none;}
.rauno-card::before { content: 'Ver Detalles +'; position: absolute; top: 20px; right: 20px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--magma-amber); opacity: 0; transform: translateX(10px); transition: all 0.3s ease; }
.rauno-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(206,141,37,0.3); }
.rauno-card:hover::before { opacity: 1; transform: translateX(0); }
.rauno-card h3 { font-size: 24px; color: #fff; margin-bottom: 10px; }
.rauno-card p { font-size: 14px; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.rauno-modal-overlay { position: fixed; inset: 0; background: rgba(10,10,10,0.8); backdrop-filter: blur(15px); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.4s ease; cursor: none;}
.rauno-modal-overlay.active { opacity: 1; pointer-events: all; }
.rauno-modal-content { background: var(--magma-black); border: 1px solid rgba(206,141,37,0.3); padding: 50px; border-radius: 24px; max-width: 600px; width: 90%; transform: scale(0.95) translateY(20px); transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative; cursor: auto; }
.rauno-modal-overlay.active .rauno-modal-content { transform: scale(1) translateY(0); }
.modal-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--magma-bone); font-size: 24px; opacity: 0.5; transition: opacity 0.2s; cursor: none;}
.modal-close:hover { opacity: 1; }

/* ==========================================
   FORMULARIO
   ========================================== */
.form { background: rgba(20,20,18,0.6); padding:40px; border-radius:var(--radius); border:1px solid var(--stroke); }
.field { margin-bottom:20px; display:flex; flex-direction:column; gap:8px; }
label { font-size:11px; text-transform:uppercase; letter-spacing:0.1em; opacity:0.7; }
input, select { background: rgba(255,255,255,0.03); border:1px solid var(--stroke); color: white; padding:16px; border-radius:8px; width:100%; font-family: inherit; font-size: 14px; transition: all 0.3s ease;}
input:focus, select:focus { outline:none; border-color:var(--magma-amber); background: rgba(0,0,0,0.2); }
.full-width { width:100%; margin-top:10px; }

/* ==========================================
   RESPONSIVE
   ========================================== */
@media (max-width: 900px) {
  html { cursor: auto; } 
  .custom-cursor, .cursor-follower { display: none; }
  .btn, .dock-item, .rauno-card, .video-toggle { cursor: pointer; }
  .split { grid-template-columns:1fr; gap: 40px; }
  .bento-grid-hero { grid-template-columns: 1fr; }
  .main-val, .video-card, .stat-card { grid-column: span 1; }
  .metrics-grid { grid-template-columns: 1fr; }
  .mac-dock-wrapper { bottom: 20px; top: auto; }
  .dock-item::before { display: none; }
}
