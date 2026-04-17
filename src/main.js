/* ============================================================
   Nakola Expert Systems — Main JS Entry Point
   ============================================================ */

import './styles/main.css';
import { initNavigation }  from './scripts/modules/navigation.js';
import { initScrollReveal, initCounters } from './scripts/modules/animations.js';
import { initEffects }      from './scripts/modules/effects.js';
import { initForms }        from './scripts/modules/forms.js';
import { initFilters }      from './scripts/modules/filters.js';
import { initAnalytics }    from './scripts/modules/analytics.js';
import { initContentProtection } from './scripts/modules/protection.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initCounters();
  initEffects();
  initForms();
  initFilters();
  initAnalytics();
  initScrollProgress();
  initContentProtection();
});

function initScrollProgress() {
  const bar = document.createElement('div');
  bar.classList.add('scroll-progress');
  document.body.prepend(bar);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
