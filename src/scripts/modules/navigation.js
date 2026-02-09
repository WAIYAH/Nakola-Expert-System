/* ============================================================
   Navigation Module
   Handles desktop menu, mobile drawer, sticky header, and
   active-link highlighting.
   ============================================================ */

export function initNavigation() {
  const header   = document.getElementById('site-header');
  const toggle   = document.getElementById('mobile-toggle');
  const drawer   = document.getElementById('mobile-drawer');
  const overlay  = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-close');

  if (!header) return;

  /* ── Sticky header ──────────────────────────────────────── */
  let lastScroll = 0;
  const SCROLL_THRESHOLD = 10;

  function handleScroll() {
    const current = window.scrollY;

    // Add background when scrolled
    if (current > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Hide/show on scroll direction
    if (Math.abs(current - lastScroll) < SCROLL_THRESHOLD) return;

    if (current > lastScroll && current > 400) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    lastScroll = current;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  /* ── Mobile drawer ──────────────────────────────────────── */
  function openDrawer() {
    drawer?.classList.add('drawer-open');
    overlay?.classList.add('overlay-visible');
    document.body.style.overflow = 'hidden';
    toggle?.setAttribute('aria-expanded', 'true');
    // Move focus into drawer for accessibility
    closeBtn?.focus();
  }

  function closeDrawer() {
    drawer?.classList.remove('drawer-open');
    overlay?.classList.remove('overlay-visible');
    document.body.style.overflow = '';
    toggle?.setAttribute('aria-expanded', 'false');
    // Return focus to toggle button
    toggle?.focus();
  }

  toggle?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Focus trap inside open drawer
  if (drawer) {
    drawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = drawer.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // Close drawer links on click (SPA-like behavior)
  drawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  /* ── Active link highlighting ───────────────────────────── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '/';
    if (href === currentPath || (currentPath.startsWith(href) && href !== '/')) {
      link.classList.add('nav-active');
    }
  });
}
