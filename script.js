document.addEventListener("DOMContentLoaded", () => {
  // 1. Control del Video Interactivo
  const video = document.getElementById("magmaVideo");
  const muteBtn = document.getElementById("muteBtn");

  if (video && muteBtn) {
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? "Activar Sonido" : "Silenciar";
    });
  }

  // 2. Año en el Footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
