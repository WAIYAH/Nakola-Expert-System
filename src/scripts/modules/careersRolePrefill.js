/* ============================================================
   Careers Apply — Role Prefill
   Pre-selects the "Role Applying For" dropdown from a
   ?role= query param (e.g. linked from a specific job posting).
   ============================================================ */

export function initCareersRolePrefill() {
  const select = document.getElementById('app-role');
  if (!select) return;

  const params = new URLSearchParams(window.location.search);
  const requestedRole = (params.get('role') || '').trim().toLowerCase();
  if (!requestedRole) return;

  const options = Array.from(select.options).map((opt) => opt.value);
  if (options.includes(requestedRole)) {
    select.value = requestedRole;
  }
}
