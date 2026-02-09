/* ============================================================
   Nakola Expert Systems — Filter Tabs
   Handles category filtering on Work and Insights pages
   ============================================================ */

export function initFilters() {
  const filterGroups = document.querySelectorAll('[role="tablist"]');
  if (!filterGroups.length) return;

  filterGroups.forEach(group => {
    const buttons = Array.from(group.querySelectorAll('[data-filter]'));
    if (!buttons.length) return;

    // Find the filterable items — look for siblings with data-category
    const section = group.closest('section');
    if (!section) return;
    const items = section.querySelectorAll('[data-category]');
    if (!items.length) return;

    function activateFilter(btn) {
      const filter = btn.dataset.filter;

      // Update button states
      buttons.forEach(b => {
        b.classList.remove('bg-primary-600', 'text-white');
        b.classList.add('bg-neutral-100', 'text-neutral-600');
        b.setAttribute('aria-selected', 'false');
        b.setAttribute('tabindex', '-1');
      });
      btn.classList.remove('bg-neutral-100', 'bg-white', 'text-neutral-600');
      btn.classList.add('bg-primary-600', 'text-white');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
      btn.focus();

      // Filter items
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.classList.remove('opacity-0', 'scale-95');
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Click handler
    buttons.forEach(btn => {
      btn.addEventListener('click', () => activateFilter(btn));
    });

    // Arrow key navigation (WCAG tablist pattern)
    group.addEventListener('keydown', (e) => {
      const currentIdx = buttons.indexOf(document.activeElement);
      if (currentIdx === -1) return;

      let nextIdx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIdx = (currentIdx + 1) % buttons.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIdx = (currentIdx - 1 + buttons.length) % buttons.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIdx = buttons.length - 1;
      }

      if (nextIdx !== undefined) {
        activateFilter(buttons[nextIdx]);
      }
    });
  });
}
