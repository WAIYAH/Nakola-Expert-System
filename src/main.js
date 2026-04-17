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

/** Safely run an init function — logs errors without crashing other modules */
function safeInit(name, fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[NES] ${name} failed to initialize:`, err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  safeInit('Navigation',         initNavigation);
  safeInit('ScrollReveal',       initScrollReveal);
  safeInit('Counters',           initCounters);
  safeInit('Effects',            initEffects);
  safeInit('Forms',              initForms);
  safeInit('Filters',            initFilters);
  safeInit('Analytics',          initAnalytics);
  safeInit('ScrollProgress',     initScrollProgress);
  safeInit('ContentProtection',  initContentProtection);
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
