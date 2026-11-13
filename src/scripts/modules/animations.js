/* ============================================================
   Animations Module
   Scroll-triggered reveal + counter animation
   ============================================================ */

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canObserve = 'IntersectionObserver' in window;

/**
 * Observe elements with class `.reveal` and add `.revealed` when
 * they enter the viewport.
 */
export function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // If the CSS safety net already faded the content in (this script arrived
  // late), keep it visible rather than hiding it again to re-animate.
  const alreadyShown = parseFloat(getComputedStyle(reveals[0]).opacity) > 0;
  document.documentElement.classList.add('reveal-ready'); // switches the safety net off

  // Show everything at once for reduced motion, a late script, or browsers
  // without IntersectionObserver (some data-saver browsers).
  if (alreadyShown || prefersReducedMotion() || !canObserve) {
    reveals.forEach((el) => el.classList.add('revealed'));
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

  reveals.forEach((el) => observer.observe(el));
}

/**
 * Animate numeric counters inside elements with `[data-count-to]`.
 * Will start when the element enters the viewport.
 */
export function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  // The HTML holds the final value, so it reads correctly without the animation.
  if (!counters.length || !canObserve || prefersReducedMotion()) return;

  counters.forEach((el) => { el.textContent = `0${el.dataset.countSuffix || ''}`; });

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
