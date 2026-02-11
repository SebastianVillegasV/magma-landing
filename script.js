document.addEventListener("DOMContentLoaded", () => {
  
  const enterBtn = document.getElementById("enterBtn");
  const landingLayer = document.getElementById("landing-layer");
  const body = document.body;

  // 1. Lógica de "Activar Magma" (Transición Landing -> Site)
  if (enterBtn && landingLayer) {
    enterBtn.addEventListener("click", () => {
      
      // A. Deslizar el telón hacia arriba
      landingLayer.classList.add("slide-up");
      
      // B. Desbloquear el scroll del body
      body.classList.remove("locked");
      
      // C. Opcional: Detener el video después de la transición para ahorrar recursos
      setTimeout(() => {
        const video = landingLayer.querySelector("video");
        if(video) video.pause();
      }, 1000); // 1000ms espera a que termine la animación CSS
    });
  }

  // 2. Año automático
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3. Botón WhatsApp
  const waBtn = document.getElementById("waBtn");
  if (waBtn) {
    const phoneNumber = "573212712271"; 
    const message = "Hola, quiero activar una demo de MAGMA.";
    waBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    waBtn.target = "_blank";
  }

  // 4. Smooth Scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
