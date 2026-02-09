/* ============================================================
   Nakola Expert Systems — Filter Tabs
   Handles category filtering on Work and Insights pages
   ============================================================ */

export function initFilters() {
  const filterGroups = document.querySelectorAll('[role="tablist"]');
  if (!filterGroups.length) return;

  filterGroups.forEach(group => {
    const buttons = group.querySelectorAll('[data-filter]');
    if (!buttons.length) return;

    // Find the filterable items — look for siblings with data-category
    const section = group.closest('section');
    if (!section) return;
    const items = section.querySelectorAll('[data-category]');
    if (!items.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update button states
        buttons.forEach(b => {
          b.classList.remove('bg-primary-600', 'text-white');
          b.classList.add('bg-neutral-100', 'text-neutral-600');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.remove('bg-neutral-100', 'bg-white', 'text-neutral-600');
        btn.classList.add('bg-primary-600', 'text-white');
        btn.setAttribute('aria-selected', 'true');

        // Filter items
        items.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            item.classList.remove('opacity-0', 'scale-95');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
}
