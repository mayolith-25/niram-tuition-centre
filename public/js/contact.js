/* ═══════════════════════════════════════════════════════════
   NIRAM TUITION CENTRE — CONTACT FORM
   contact.js — handle contact form submission to Supabase
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successOverlay = document.getElementById('contactSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Basic validation
    if (!name || !phone || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;"></div> Sending...';

    try {
      const result = await submitContactMessage({ name, phone, email, message });

      if (result.success) {
        // Show success overlay
        successOverlay.classList.add('active');
        form.reset();
      } else {
        alert('Something went wrong. Please try again or WhatsApp us directly.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      alert('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Send Message
      `;
    }
  });

  // Close success overlay on outside click
  if (successOverlay) {
    successOverlay.addEventListener('click', (e) => {
      if (e.target === successOverlay) {
        successOverlay.classList.remove('active');
      }
    });
  }
});
