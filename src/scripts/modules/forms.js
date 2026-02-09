/* ============================================================
   Forms Module
   Client-side validation, multi-step logic, and draft saving.
   ============================================================ */

/**
 * Auto-initializes all forms with `[data-validate]`.
 */
export function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(setupForm);
}

/* ── Setup a single form ──────────────────────────────────── */
function setupForm(form) {
  const fields = form.querySelectorAll('[data-rules]');

  // Inline validation on blur
  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      // Clear error on re-type
      if (field.classList.contains('input-error')) validateField(field);
    });
  });

  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      // Focus first error
      form.querySelector('.input-error')?.focus();
      return;
    }

    handleSubmit(form);
  });
}

/* ── Validate a single field ──────────────────────────────── */
function validateField(field) {
  const rules  = (field.dataset.rules || '').split('|');
  const value  = field.value.trim();
  const name   = field.dataset.label || field.name || 'Field';
  let errorMsg = '';

  for (const rule of rules) {
    if (rule === 'required' && !value) {
      errorMsg = `${name} is required`;
      break;
    }
    if (rule === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMsg = 'Please enter a valid email address';
      break;
    }
    if (rule === 'phone' && value && !/^[+]?[\d\s()-]{7,20}$/.test(value)) {
      errorMsg = 'Please enter a valid phone number';
      break;
    }
    if (rule.startsWith('min:')) {
      const min = parseInt(rule.split(':')[1], 10);
      if (value.length < min) {
        errorMsg = `${name} must be at least ${min} characters`;
        break;
      }
    }
  }

  const wrapper  = field.closest('.form-group');
  const errorEl  = wrapper?.querySelector('.error-text');

  if (errorMsg) {
    field.classList.add('input-error');
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.remove('hidden');
    }
    return false;
  }

  field.classList.remove('input-error');
  field.removeAttribute('aria-invalid');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
  return true;
}

/* ── Handle form submission ───────────────────────────────── */
async function handleSubmit(form) {
  const submitBtn = form.querySelector('[type="submit"]');
  const original  = submitBtn?.innerHTML;

  // Loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="inline-block w-5 h-5 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      Sending…`;
  }

  // Simulate send (replace with real endpoint later)
  await new Promise((r) => setTimeout(r, 1500));

  // Success state
  const successEl = form.querySelector('.form-success');
  if (successEl) {
    form.classList.add('hidden');
    successEl.classList.remove('hidden');
  } else {
    form.reset();
    if (submitBtn) {
      submitBtn.innerHTML = '✓ Sent!';
      setTimeout(() => {
        submitBtn.innerHTML = original;
        submitBtn.disabled = false;
      }, 3000);
    }
  }
}

/* ── LocalStorage draft saving ────────────────────────────── */
export function initDraftSaving(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const key = `nes_draft_${formId}`;

  // Restore
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  Object.entries(saved).forEach(([name, value]) => {
    const field = form.elements[name];
    if (field) field.value = value;
  });

  // Save on input
  form.addEventListener('input', () => {
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = v; });
    localStorage.setItem(key, JSON.stringify(data));
  });

  // Clear on submit
  form.addEventListener('submit', () => localStorage.removeItem(key));
}
