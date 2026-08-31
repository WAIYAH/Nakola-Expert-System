/* ============================================================
   Affiliate Application Form
   Dedicated AJAX submit handler (own feedback banner UI,
   separate from the generic forms.js success-panel pattern).
   ============================================================ */

export function initAffiliateForm() {
  const form = document.getElementById('affiliate-application-form');
  const submitBtn = document.getElementById('affiliate-submit-btn');
  const feedback = document.getElementById('affiliate-form-feedback');
  if (!form || !submitBtn || !feedback) return;

  const showFeedback = (message, isSuccess) => {
    feedback.textContent = message;
    feedback.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'border', 'border-red-200', 'bg-green-50', 'text-green-700', 'border-green-200');
    if (isSuccess) {
      feedback.classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-200');
    } else {
      feedback.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    feedback.classList.add('hidden');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Submitting...';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://formsubmit.co/ajax/luckiesdabwoy@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json().catch(() => ({}));
      const isSuccess = response.ok && (data.success === true || data.success === 'true' || typeof data.success === 'undefined');

      if (!isSuccess) {
        throw new Error(data.message || 'Unable to submit form right now.');
      }

      form.reset();
      showFeedback('Affiliate application submitted successfully. Please check your inbox for any activation email from the form provider the first time this form is used.', true);
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      showFeedback('Submission failed. Please try again in a moment or contact luckiesdabwoy@gmail.com directly.', false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}
