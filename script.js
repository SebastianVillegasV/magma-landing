/* ============================================================
   MAGMA v2 — script.js
   Partículas · Cursor · Magnético · Scroll reveal · Métricas
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ── 1. PARTICLE SYSTEM ──────────────────────────────────────
  (function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId;

    // Reduce count on low-end / mobile
    const isMobile = window.matchMedia("(max-width:900px)").matches;
    const PARTICLE_COUNT = isMobile ? 0 : 38;

    const COLORS = [
      'rgba(202,17,17,',
      'rgba(206,141,37,',
      'rgba(226,222,192,',
    ];

    class Particle {
      constructor() { this.reset(true); }

      reset(initial = false) {
        this.x  = Math.random() * W;
        this.y  = initial ? Math.random() * H : H + 20;
        this.r  = Math.random() * 2.2 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(Math.random() * 0.55 + 0.2);
        this.life   = 0;
        this.maxLife = 200 + Math.random() * 200;
        this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
        if (initial) this.life = Math.random() * this.maxLife;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife) this.reset();
      }

      draw() {
        const progress = this.life / this.maxLife;
        const alpha    = progress < 0.15
          ? progress / 0.15
          : progress > 0.75
            ? 1 - (progress - 0.75) / 0.25
            : 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${(alpha * 0.55).toFixed(2)})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }

    loop();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize, { passive: true });
  })();


  // ── 2. CURSOR PERSONALIZADO ──────────────────────────────────
  const cursorEl   = document.querySelector('.custom-cursor');
  const followerEl = document.querySelector('.cursor-follower');

  const supportsHover = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  if (supportsHover && cursorEl && followerEl) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursorEl.style.transform = `translate3d(${mx}px,${my}px,0)`;
    });

    (function followLoop() {
      fx += (mx - fx) * 0.13;
      fy += (my - fy) * 0.13;
      followerEl.style.transform = `translate3d(${fx}px,${fy}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(followLoop);
    })();
  }


  // ── 3. BOTONES MAGNÉTICOS ────────────────────────────────────
  const magnetEls = document.querySelectorAll('.magnetic-btn, .dock-item');

  magnetEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      el.style.transform = '';
    });

    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = e.clientX - r.left  - r.width  / 2;
      const dy = e.clientY - r.top   - r.height / 2;
      const strength = el.classList.contains('magnetic-btn') ? 0.3 : 0.22;
      el.style.transform = `translate3d(${dx * strength}px,${dy * strength}px,0)`;
    });
  });


  // ── 4. SPOTLIGHT EN CARDS ────────────────────────────────────
  document.querySelectorAll('.evo-metric-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    });
  });


  // ── 5. SCROLL REVEAL (IntersectionObserver) ──────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');

      if (entry.target.classList.contains('evo-metric-card')) {
        animateCard(entry.target);
      }

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));


  // ── 6. ANIMACIÓN DE MÉTRICAS ─────────────────────────────────
  function animateCard(card) {
    // Barra de progreso
    const bar = card.querySelector('.evo-bar-fill');
    if (bar) {
      const target = bar.getAttribute('data-end');
      setTimeout(() => {
        bar.style.width = target + '%';
        bar.classList.add('animated');
      }, 350);
    }

    // Contador numérico con easing
    const countEl = card.querySelector('.count');
    if (countEl) {
      const start    = parseInt(countEl.getAttribute('data-start'), 10);
      const end      = parseInt(countEl.getAttribute('data-target'), 10);
      const duration = 2200;
      const startTime = performance.now();

      const easeOut = t => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = easeOut(progress);
        const current  = Math.round(start + (end - start) * eased);

        countEl.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          countEl.textContent = end;
        }
      };

      setTimeout(() => requestAnimationFrame(tick), 380);
    }
  }


  // ── 7. PARALLAX SUAVE EN HERO VIDEO ─────────────────────────
  const heroVideo = document.querySelector('.hero-video-panoramic');

  if (heroVideo && !window.matchMedia("(max-width:900px)").matches) {
    const onScroll = () => {
      const scrollY = window.scrollY;
      heroVideo.style.transform = `translateY(${scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  // ── 8. SCROLL INDICATOR AUTO-HIDE ───────────────────────────
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    const hideOnScroll = () => {
      if (window.scrollY > 60) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transition = 'opacity 0.5s';
      }
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true, once: true });
  }


  // ── 9. ACTIVE DOCK LINK ──────────────────────────────────────
  const sections  = document.querySelectorAll('section[id], div[id]');
  const dockLinks = document.querySelectorAll('.dock-item[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dockLinks.forEach(link => {
          const href = link.getAttribute('href').slice(1);
          link.classList.toggle('dock-active', href === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  // ── 10. MAGMA CTA — Hover de llama animado ───────────────────
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    ctaBtn.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      ctaBtn.style.transform = '';
    });
  }

});
