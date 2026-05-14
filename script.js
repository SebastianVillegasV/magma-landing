document.addEventListener("DOMContentLoaded", () => {
  
  // 1. CURSOR CUSTOM Y HOVER
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  // Solo cargar cursor en pantallas que soportan hover (evita bugs en touch/móvil)
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if(cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (follower) {
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  // BOTONES MAGNÉTICOS (Física Suave)
  const magneticEls = document.querySelectorAll('.magnetic-btn, .dock-item');
  magneticEls.forEach((el) => {
    el.addEventListener('mouseenter', () => { document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      el.style.transform = `translate3d(0px, 0px, 0)`;
    });
    el.addEventListener('mousemove', (e) => {
      const position = el.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
    });
  });

  // 2. SPOTLIGHT (Linterna)
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

  // 3. VIDEO INTERACTIVO
  const magmaVideo = document.getElementById('magmaInteractiveVideo');
  const muteBtn = document.getElementById('muteToggle');
  if(magmaVideo && muteBtn) {
    muteBtn.addEventListener('click', () => {
      magmaVideo.muted = !magmaVideo.muted;
      const muteIcon = `<svg viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
      const unmuteIcon = `<svg viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/></svg>`;
      muteBtn.innerHTML = magmaVideo.muted ? muteIcon : unmuteIcon;
    });
  }

  // 4. ANIMACIONES AL HACER SCROLL (Compatible)
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -20px 0px" };
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
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

  function animateEvolution(card) {
    const barFill = card.querySelector('.evo-bar-fill');
    if (barFill) {
      setTimeout(() => { barFill.style.width = barFill.getAttribute('data-end') + '%'; }, 300);
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
});
