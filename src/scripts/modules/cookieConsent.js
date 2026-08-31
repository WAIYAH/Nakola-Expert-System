/* ============================================================
   Cookie Consent
   Gates analytics behind an explicit accept/decline choice.
   Stores the choice in localStorage and dispatches a
   'nes:consent-granted' event so analytics.js can react
   immediately without a page reload.
   ============================================================ */

const STORAGE_KEY = 'nes_cookie_consent';

export function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export function initCookieConsent() {
  let choice = null;
  try {
    choice = localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable (private mode/security policy) — skip the
    // banner rather than show it every visit with no way to persist a choice.
    return;
  }

  if (choice === 'accepted' || choice === 'declined') return;

  const banner = document.createElement('div');
  banner.className = 'cookie-consent';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <p class="cookie-consent__text">
      We use cookies for basic analytics to understand how visitors use this site.
      No personal data is sold or shared. See our
      <a href="/privacy.html">Privacy Policy</a>.
    </p>
    <div class="cookie-consent__actions">
      <button type="button" class="btn btn-secondary btn-sm" data-cookie-decline>Decline</button>
      <button type="button" class="btn btn-primary btn-sm" data-cookie-accept>Accept</button>
    </div>
  `;
  document.body.appendChild(banner);
  // Hide the WhatsApp/back-to-top floating buttons while the banner is up —
  // both sit in the same bottom-right corner and would otherwise overlap.
  document.body.classList.add('has-cookie-banner');

  function setChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore write failures — banner will simply reappear next visit.
    }
    banner.remove();
    document.body.classList.remove('has-cookie-banner');
    if (value === 'accepted') {
      document.dispatchEvent(new CustomEvent('nes:consent-granted'));
    }
  }

  banner.querySelector('[data-cookie-accept]').addEventListener('click', () => setChoice('accepted'));
  banner.querySelector('[data-cookie-decline]').addEventListener('click', () => setChoice('declined'));
}
