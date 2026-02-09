/* ============================================================
   Nakola Expert Systems — Main JS Entry Point
   ============================================================ */

import './styles/main.css';
import { initNavigation }  from './scripts/modules/navigation.js';
import { initScrollReveal, initCounters } from './scripts/modules/animations.js';
import { initForms }        from './scripts/modules/forms.js';
import { initFilters }      from './scripts/modules/filters.js';
import { initAnalytics }    from './scripts/modules/analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initCounters();
  initForms();
  initFilters();
  initAnalytics();
});
