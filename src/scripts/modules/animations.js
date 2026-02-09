/* ============================================================
   Animations Module
   Scroll-triggered reveal + counter animation
   ============================================================ */

/**
 * Observe elements with class `.reveal` and add `.revealed` when
 * they enter the viewport.
 */
export function initScrollReveal() {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/**
 * Animate numeric counters inside elements with `[data-count-to]`.
 * Will start when the element enters the viewport.
 */
export function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const end   = parseInt(el.dataset.countTo, 10);
        const dur   = parseInt(el.dataset.countDuration || '2000', 10);
        const suffix = el.dataset.countSuffix || '';
        animateCount(el, 0, end, dur, suffix);
        observer.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((c) => observer.observe(c));
}

function animateCount(el, start, end, duration, suffix) {
  const range     = end - start;
  const startTime = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased    = easeOutCubic(progress);
    el.textContent = Math.floor(start + range * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
