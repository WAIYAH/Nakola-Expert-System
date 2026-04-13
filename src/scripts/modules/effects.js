/* ============================================================
   Advanced Visual Effects Module
   Parallax, morphing, tilt, magnetic cursor, text scramble
   ============================================================ */

/**
 * Initialize all advanced homepage effects
 */
export function initEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initParallax();
  initTiltCards();
  initMagneticButtons();
  initTextScramble();
  initMorphingBlobs();
  initSmoothParallaxHero();
  initStaggeredReveals();
  initFloatingElements();
  initGlowTrack();
}

/* ── Parallax Background Scrolling ───────────────────────── */
function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) {
        const yOffset = (scrollY - el.offsetTop) * speed;
        el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* ── Hero Parallax Layers ────────────────────────────────── */
function initSmoothParallaxHero() {
  const hero = document.querySelector('[data-hero-parallax]');
  if (!hero) return;

  const layers = hero.querySelectorAll('[data-parallax-layer]');
  if (!layers.length) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;
    if (scrollY > heroH * 1.5) { ticking = false; return; }

    const progress = scrollY / heroH;

    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.parallaxLayer) || 1;
      const yShift = scrollY * depth * 0.4;
      const opacity = Math.max(1 - progress * depth * 0.6, 0);
      const scale = 1 + progress * depth * 0.05;
      layer.style.transform = `translate3d(0, ${yShift}px, 0) scale(${scale})`;
      layer.style.opacity = opacity;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ── 3D Tilt Cards on Hover ──────────────────────────────── */
function initTiltCards() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach((card) => {
    const maxTilt = parseFloat(card.dataset.tilt) || 8;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

/* ── Magnetic Button Effect ──────────────────────────────── */
function initMagneticButtons() {
  const btns = document.querySelectorAll('[data-magnetic]');
  if (!btns.length) return;

  btns.forEach((btn) => {
    const strength = parseFloat(btn.dataset.magnetic) || 0.3;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });
}

/* ── Text Scramble / Decode Effect ───────────────────────── */
function initTextScramble() {
  const els = document.querySelectorAll('[data-scramble]');
  if (!els.length) return;

  const chars = '!<>-_\\/[]{}—=+*^?#________';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        scrambleText(entry.target, chars);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  els.forEach((el) => {
    el.dataset.scrambleOriginal = el.textContent;
    observer.observe(el);
  });
}

function scrambleText(el, chars) {
  const original = el.dataset.scrambleOriginal;
  const duration = parseInt(el.dataset.scrambleDuration || '1500', 10);
  const len = original.length;
  const startTime = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const revealCount = Math.floor(progress * len);

    let text = '';
    for (let i = 0; i < len; i++) {
      if (i < revealCount) {
        text += original[i];
      } else if (original[i] === ' ') {
        text += ' ';
      } else {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = text;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = original;
    }
  }

  requestAnimationFrame(step);
}

/* ── Morphing Blob Animation ─────────────────────────────── */
function initMorphingBlobs() {
  const blobs = document.querySelectorAll('.morph-blob');
  if (!blobs.length) return;

  blobs.forEach((blob) => {
    animateBlob(blob);
  });
}

function animateBlob(blob) {
  const shapes = [
    '30% 70% 70% 30% / 30% 30% 70% 70%',
    '60% 40% 30% 70% / 60% 30% 70% 40%',
    '40% 60% 60% 40% / 50% 40% 60% 50%',
    '70% 30% 50% 50% / 40% 60% 40% 60%',
    '50% 50% 30% 70% / 70% 30% 50% 50%',
  ];

  let currentShape = 0;

  function morph() {
    currentShape = (currentShape + 1) % shapes.length;
    blob.style.borderRadius = shapes[currentShape];
    setTimeout(morph, 3000 + Math.random() * 2000);
  }

  morph();
}

/* ── Staggered Reveals with 3D ───────────────────────────── */
function initStaggeredReveals() {
  const groups = document.querySelectorAll('[data-stagger]');
  if (!groups.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const children = entry.target.querySelectorAll('[data-stagger-child]');
        children.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add('stagger-revealed');
          }, i * 120);
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  groups.forEach((g) => observer.observe(g));
}

/* ── Floating Elements Animation ─────────────────────────── */
function initFloatingElements() {
  const floaters = document.querySelectorAll('[data-float]');
  if (!floaters.length) return;

  floaters.forEach((el) => {
    const amplitude = parseFloat(el.dataset.float) || 15;
    const speed = parseFloat(el.dataset.floatSpeed) || 3;
    const delay = parseFloat(el.dataset.floatDelay) || 0;
    const startTime = performance.now() + delay * 1000;

    function animate(timestamp) {
      const elapsed = (timestamp - startTime) / 1000;
      const y = Math.sin(elapsed * (2 * Math.PI / speed)) * amplitude;
      const x = Math.cos(elapsed * (2 * Math.PI / (speed * 1.3))) * (amplitude * 0.4);
      const rotate = Math.sin(elapsed * (2 * Math.PI / (speed * 1.7))) * 5;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });
}

/* ── Glow Tracking on Mouse ──────────────────────────────── */
function initGlowTrack() {
  const glowEls = document.querySelectorAll('[data-glow-track]');
  if (!glowEls.length) return;

  glowEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
    });
  });
}
