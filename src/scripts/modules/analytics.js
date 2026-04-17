/* ============================================================
   Analytics Module
   Google Analytics 4 integration + custom conversion tracking.
   Replace GA_MEASUREMENT_ID with your actual GA4 ID to activate.
   ============================================================ */

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← Replace with real GA4 ID

/**
 * Initializes GA4 + sets up conversion event listeners.
 */
export function initAnalytics() {
  loadGA4();
  trackConversions();
  trackOutboundLinks();
}

/* ── Load GA4 script ──────────────────────────────────────── */
function loadGA4() {
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    // eslint-disable-next-line no-console
    console.info('[NES Analytics] GA4 not configured — set GA_MEASUREMENT_ID to activate.');
    return;
  }

  // Prevent duplicate injection on re-init
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
  });
}

/* ── Track form submissions as conversions ────────────────── */
function trackConversions() {
  document.querySelectorAll('form[data-validate]').forEach((form) => {
    form.addEventListener('submit', () => {
      sendEvent('form_submission', {
        form_name: form.dataset.formName || form.id || 'unknown',
        page: window.location.pathname,
      });
    });
  });

  // Newsletter signup
  const newsletter = document.querySelector('#newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', () => {
      sendEvent('newsletter_signup', { page: window.location.pathname });
    });
  }
}

/* ── Track outbound link clicks ───────────────────────────── */
function trackOutboundLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener('click', () => {
      sendEvent('outbound_link', {
        url: link.href,
        text: link.textContent?.trim().slice(0, 50),
      });
    });
  });
}

/* ── Helper: send GA4 event ───────────────────────────────── */
function sendEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
