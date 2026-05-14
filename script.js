document.addEventListener("DOMContentLoaded", () => {
  
  // 1. EL CURSOR CUSTOM (Círculo que sigue el mouse)
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // El punto central sigue exacto
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Animación suave (Lerp) para el anillo exterior
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // 2. BOTONES MAGNÉTICOS (Física de tracción)
  const magneticEls = document.querySelectorAll('.magnetic-btn, a, button');

  magneticEls.forEach((el) => {
    // Al entrar al botón, el cursor cambia de estado
    el.addEventListener('mouseenter', () => { document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      // Resetea la posición del botón al salir
      el.style.transform = `translate(0px, 0px)`;
    });

    // La magia del magnetismo
    el.addEventListener('mousemove', (e) => {
      // Solo si el elemento tiene la clase específica
      if(el.classList.contains('magnetic-btn')) {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        // Mueve el botón sutilmente hacia el mouse (factor 0.3)
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    });
  });

  // 3. EFECTO SPOTLIGHT (Linterna en el Bento Grid)
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Pasa las coordenadas de mouse a variables CSS
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. VIDEO INTERACTIVO DENTRO DEL GRID
  const magmaVideo = document.getElementById('magmaInteractiveVideo');
  const muteBtn = document.getElementById('muteToggle');

  if(magmaVideo && muteBtn) {
    muteBtn.addEventListener('click', () => {
      if(magmaVideo.muted) {
        magmaVideo.muted = false;
        muteBtn.innerHTML = `<svg viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/></svg>`;
      } else {
        magmaVideo.muted = true;
        muteBtn.innerHTML = `<svg viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
      }
    });
  }

});
