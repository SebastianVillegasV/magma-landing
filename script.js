document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // 1. TELÓN DE BIENVENIDA
  const enterBtn = document.getElementById("enterBtn");
  const landingLayer = document.getElementById("landing-layer");

  if (enterBtn && landingLayer) {
    enterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      landingLayer.classList.add("slide-up");
      body.classList.remove("locked");
      setTimeout(() => {
        const video = landingLayer.querySelector("video");
        if(video) video.pause();
      }, 1000);
    });
  }

  // 2. UX: Intersection Observer (Reveal General)
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
  
  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      
      // Si es una tarjeta de métrica evolutiva, disparar animación
      if (entry.target.classList.contains('evo-metric-card')) {
         animateEvolution(entry.target);
      }
      observer.unobserve(entry.target); 
    });
  }, revealOptions);

  reveals.forEach(reveal => { revealOnScroll.observe(reveal); });

  // 3. UX: ANIMACIÓN DE MÉTRICAS EVOLUTIVAS
  function animateEvolution(card) {
    // Animar la barra
    const barFill = card.querySelector('.evo-bar-fill');
    if (barFill) {
      const targetWidth = barFill.getAttribute('data-end');
      setTimeout(() => {
        barFill.style.width = targetWidth + '%';
      }, 300);
    }

    // Animar el número
    const countSpan = card.querySelector('.count');
    if (countSpan) {
      const start = parseInt(countSpan.getAttribute('data-start'));
      const target = parseInt(countSpan.getAttribute('data-target'));
      const duration = 2000; 
      const increment = (target - start) / (duration / 16); 
      let current = start;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          countSpan.innerText = Math.ceil(current);
          requestAnimationFrame(updateCount);
        } else {
          countSpan.innerText = target;
        }
      };
      setTimeout(updateCount, 300);
    }
  }

  // VALIDACIÓN B2B CORREOS (Opcional, si la necesitas agregarla de nuevo aquí)
  const leadForm = document.getElementById("leadForm");
  const emailInput = document.getElementById("b2bEmail");

  if (leadForm && emailInput) {
    leadForm.addEventListener("submit", (e) => {
      const email = emailInput.value.toLowerCase();
      const freeDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];
      const domain = email.split('@')[1];

      if (freeDomains.includes(domain)) {
        e.preventDefault(); 
        alert("Por favor, usa tu correo corporativo para solicitar la evaluación.");
        emailInput.style.borderColor = "#CA1111";
        emailInput.focus();
      }
    });
  }
});

// 4. UX: MODALES EXPANDIBLES (Estilo Rauno)
const modalOverlay = document.getElementById('mainModal');
const modalBody = document.getElementById('modalBody');

window.openModal = function(templateId) {
  document.body.style.overflow = 'hidden';
  const template = document.getElementById('tpl-' + templateId.replace('modal-', ''));
  if (template) {
    modalBody.innerHTML = template.innerHTML;
    modalOverlay.classList.add('active');
  }
};

window.closeModal = function(e) {
  if (e === true || e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};
