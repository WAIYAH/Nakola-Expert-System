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
  safeInit('AbCopyTest',         initAbCopyTest);
  safeInit('ServicesAbCopyTest', initServicesAbCopyTest);
  safeInit('ScrollReveal',       initScrollReveal);
  safeInit('Counters',           initCounters);
  safeInit('Effects',            initEffects);
  safeInit('Forms',              initForms);
  safeInit('Filters',            initFilters);
  safeInit('Analytics',          initAnalytics);
  safeInit('ScrollProgress',     initScrollProgress);
  safeInit('SectionQuickNav',    initSectionQuickNav);
  safeInit('BackToTop',          initBackToTop);
  safeInit('HeroMedia',          initHeroMedia);
  safeInit('WhatsAppFloat',      initWhatsAppFloat);
  safeInit('ContentProtection',  initContentProtection);
});

function initAbCopyTest() {
  const nodes = Array.from(document.querySelectorAll('[data-ab-key]'));
  if (!nodes.length) return;

  const TEST_KEY = 'nes_ab_home_copy_v1';
  const variants = {
    a: {
      hero_headline_prefix: 'Build Smarter. Ship Faster.',
      hero_headline_accent: 'Grow With Confidence.',
      hero_body_prefix: 'We help startups, SMEs, and enterprises launch custom software that drives ',
      hero_body_emphasis: 'measurable revenue, efficiency, and growth',
      hero_body_suffix: ' with senior engineering oversight from day one.',
      hero_primary_cta: 'Get Your Free Proposal',
      hero_secondary_cta: 'See Case Studies',
      final_cta_prefix: 'Ready to Start Your',
      final_cta_accent: 'Next Revenue-Driving Project?',
      final_cta_body: 'Share your project goals and we will send a clear plan, delivery timeline, and pricing options tailored to your business.',
      final_cta_primary: 'Get My Free Proposal',
      final_cta_whatsapp: 'Chat on WhatsApp',
      final_cta_call: 'Call +254 715 674 828',
      final_cta_micro: '✓ Free consultation · ✓ No obligation · ✓ Senior-team review · ✓ Response within 4 business hours',
    },
    b: {
      hero_headline_prefix: 'From Idea to Launch in Weeks.',
      hero_headline_accent: 'Built for Real Business Results.',
      hero_body_prefix: 'Partner with Nakola Expert Systems to build digital products that unlock ',
      hero_body_emphasis: 'faster sales, lower operating costs, and stronger customer retention',
      hero_body_suffix: '.',
      hero_primary_cta: 'Book Free Strategy Session',
      hero_secondary_cta: 'Explore Success Stories',
      final_cta_prefix: 'Need a Team That Can',
      final_cta_accent: 'Deliver and Scale?',
      final_cta_body: 'Tell us what you want to build and receive a practical roadmap with milestones, timelines, and transparent pricing.',
      final_cta_primary: 'Get My Project Roadmap',
      final_cta_whatsapp: 'WhatsApp Us Now',
      final_cta_call: 'Speak to an Engineer',
      final_cta_micro: '✓ Free strategy call · ✓ No obligation · ✓ Senior technical lead assigned · ✓ Response within 4 business hours',
    },
  };

  const params = new URLSearchParams(window.location.search);
  const forced = (params.get('ab') || '').toLowerCase();
  const isValid = (v) => v === 'a' || v === 'b';

  let variant = '';
  if (isValid(forced)) {
    variant = forced;
  } else {
    try {
      const saved = (localStorage.getItem(TEST_KEY) || '').toLowerCase();
      if (isValid(saved)) variant = saved;
    } catch {
      // Ignore localStorage unavailability (private mode/security policies)
    }
  }

  if (!variant) variant = Math.random() < 0.5 ? 'a' : 'b';

  try {
    localStorage.setItem(TEST_KEY, variant);
  } catch {
    // Ignore localStorage write failures
  }

  const selected = variants[variant] || variants.a;
  nodes.forEach((node) => {
    const key = node.dataset.abKey;
    if (!key) return;
    if (Object.prototype.hasOwnProperty.call(selected, key)) {
      node.textContent = selected[key];
    }
  });

  document.documentElement.setAttribute('data-ab-home-copy', variant);
}

function initServicesAbCopyTest() {
  const nodes = Array.from(document.querySelectorAll('[data-services-ab-key]'));
  if (!nodes.length) return;

  const TEST_KEY = 'nes_ab_services_copy_v1';
  const variants = {
    a: {
      hero_headline_prefix: 'Technology Solutions That Drive',
      hero_headline_accent: 'Real Results',
      hero_body_prefix: 'From strategy to deployment and beyond, we deliver end-to-end technology solutions tailored to your business goals with ',
      hero_body_emphasis: 'clear ROI, speed, and reliability',
      hero_body_suffix: '.',
      hero_primary_cta: 'Get a Custom Proposal',
      hero_secondary_cta: 'Explore Services',
      hero_micro: '✓ Free discovery call · ✓ Transparent pricing · ✓ Response within 4 business hours',
      final_cta_prefix: 'Have a Project in Mind?',
      final_cta_accent: "Let's Plan It Right.",
      final_cta_body: 'Tell us your goals and we will share a practical delivery plan with scope, timeline, and pricing options built for your business stage.',
      final_cta_primary: 'Get a Free Proposal',
      final_cta_whatsapp: 'Chat on WhatsApp',
      final_cta_call: 'Call +254 715 674 828',
      final_cta_micro: '✓ Free consultation · ✓ No obligation · ✓ Senior-team review · ✓ Response within 4 business hours',
    },
    b: {
      hero_headline_prefix: 'Launch Better Products Faster',
      hero_headline_accent: 'With Senior Engineers.',
      hero_body_prefix: 'We partner with growth-focused teams to design, build, and scale software services that improve ',
      hero_body_emphasis: 'sales velocity, operational efficiency, and customer retention',
      hero_body_suffix: '.',
      hero_primary_cta: 'Book Free Strategy Session',
      hero_secondary_cta: 'View Service Capabilities',
      hero_micro: '✓ Founder-led guidance · ✓ Flexible engagement models · ✓ Response within 4 business hours',
      final_cta_prefix: 'Need a Team That Can',
      final_cta_accent: 'Deliver and Scale?',
      final_cta_body: 'Share your priorities and receive a clear roadmap with milestones, delivery timelines, and commercial options tailored to your budget.',
      final_cta_primary: 'Get My Project Roadmap',
      final_cta_whatsapp: 'WhatsApp Our Team',
      final_cta_call: 'Speak to a Senior Engineer',
      final_cta_micro: '✓ Free strategy call · ✓ No lock-in commitment · ✓ Senior technical lead assigned · ✓ Response within 4 business hours',
    },
  };

  const params = new URLSearchParams(window.location.search);
  const forced = (params.get('ab_services') || params.get('ab') || '').toLowerCase();
  const isValid = (v) => v === 'a' || v === 'b';

  let variant = '';
  if (isValid(forced)) {
    variant = forced;
  } else {
    try {
      const saved = (localStorage.getItem(TEST_KEY) || '').toLowerCase();
      if (isValid(saved)) variant = saved;
    } catch {
      // Ignore localStorage unavailability
    }
  }

  if (!variant) variant = Math.random() < 0.5 ? 'a' : 'b';

  try {
    localStorage.setItem(TEST_KEY, variant);
  } catch {
    // Ignore localStorage write failures
  }

  const selected = variants[variant] || variants.a;
  nodes.forEach((node) => {
    const key = node.dataset.servicesAbKey;
    if (!key) return;
    if (Object.prototype.hasOwnProperty.call(selected, key)) {
      node.textContent = selected[key];
    }
  });

  document.documentElement.setAttribute('data-ab-services-copy', variant);
}

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

function initWhatsAppFloat() {
  if (document.querySelector('[data-whatsapp-float]')) return;

  const floatLink = document.createElement('a');
  floatLink.href = 'https://wa.me/254715674828?text=Hello%20Lucky%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Nakola%20Expert%20Systems.';
  floatLink.target = '_blank';
  floatLink.rel = 'noopener noreferrer';
  floatLink.className = 'whatsapp-float';
  floatLink.setAttribute('data-whatsapp-float', 'true');
  floatLink.setAttribute('aria-label', 'Talk to us on WhatsApp');

  floatLink.innerHTML = `
    <span class="whatsapp-float__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
      </svg>
    </span>
    <span class="whatsapp-float__label">Talk to Us</span>
  `;

  document.body.append(floatLink);
}

function initSectionQuickNav() {
  const links = Array.from(document.querySelectorAll('[data-section-link]'));
  if (!links.length) return;

  const sectionMap = links
    .map((link) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return null;
      const section = document.querySelector(href);
      if (!section) return null;
      return { link, section };
    })
    .filter(Boolean);

  if (!sectionMap.length) return;

  const setActive = (activeLink) => {
    sectionMap.forEach(({ link }) => link.classList.toggle('is-active', link === activeLink));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      let mostVisible = null;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
          mostVisible = entry;
        }
      });

      if (!mostVisible) return;
      const match = sectionMap.find(({ section }) => section === mostVisible.target);
      if (match) setActive(match.link);
    },
    { threshold: [0.3, 0.45, 0.6], rootMargin: '-20% 0px -55% 0px' }
  );

  sectionMap.forEach(({ section }) => observer.observe(section));
  setActive(sectionMap[0].link);
}

function initBackToTop() {
  const backToTop = document.querySelector('[data-back-to-top]');
  if (!backToTop) return;

  const toggleVisibility = () => {
    const shouldShow = window.scrollY > 700;
    backToTop.classList.toggle('is-visible', shouldShow);
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initHeroMedia() {
  const hero = document.querySelector('[data-hero-parallax]');
  const heroVideo = hero?.querySelector('video');
  if (!hero || !heroVideo) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  heroVideo.setAttribute('aria-hidden', 'true');

  const syncPlayback = () => {
    if (reducedMotion.matches || document.visibilityState === 'hidden') {
      heroVideo.pause();
      return;
    }

    if (hero.getBoundingClientRect().bottom > 0) {
      heroVideo.play().catch(() => {});
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (reducedMotion.matches) return;
      if (entry.isIntersecting && document.visibilityState === 'visible') {
        heroVideo.play().catch(() => {});
      } else {
        heroVideo.pause();
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(hero);
  document.addEventListener('visibilitychange', syncPlayback);
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', syncPlayback);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(syncPlayback);
  }
  syncPlayback();
}
