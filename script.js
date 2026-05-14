document.addEventListener("DOMContentLoaded", () => {
  
  // 1. CURSOR CUSTOM (Solo si es dispositivo con ratón)
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if(cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      }
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (follower) {
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
      }
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  // 2. BOTONES MAGNÉTICOS
  const magneticEls = document.querySelectorAll('.magnetic-btn, .dock-item');
  magneticEls.forEach((el) => {
    el.addEventListener('mouseenter', () => { document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      el.style.transform = `translate(0px, 0px)`;
    });
    el.addEventListener('mousemove', (e) => {
      if(el.classList.contains('magnetic-btn') || el.classList.contains('dock-item')) {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      }
    });
  });

  // 3. SPOTLIGHT
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. VIDEO INTERACTIVO
  const magmaVideo = document.getElementById('magmaInteractiveVideo');
  const muteBtn = document.getElementById('muteToggle');
  if(magmaVideo && muteBtn) {
    muteBtn.addEventListener('click', () => {
      magmaVideo.muted = !magmaVideo.muted;
      if(magmaVideo.muted) {
        muteBtn.innerHTML = `<svg viewBox="0 0 24 24" class="icon-unmute" style="width:20px;height:20px"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
      } else {
        muteBtn.innerHTML = `<svg viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/></svg>`;
      }
    });
  }

  // 5. OBSERVER (Reveal Seguro)
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }; // Margen seguro para Safari
  
  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('active');
      
      if (entry.target.classList.contains('evo-metric-card')) {
         animateEvolution(entry.target);
      }
      observer.unobserve(entry.target); 
    });
  }, revealOptions);

  reveals.forEach(reveal => revealOnScroll.observe(reveal));

  // 6. ANIMACIÓN MÉTRICAS
  function animateEvolution(card) {
    const barFill = card.querySelector('.evo-bar-fill');
    if (barFill) {
      const targetWidth = barFill.getAttribute('data-end');
      setTimeout(() => { barFill.style.width = targetWidth + '%'; }, 300);
    }
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

  // 7. AÑO FOOTER
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();
});

// 8. MODALES RAUNO
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
