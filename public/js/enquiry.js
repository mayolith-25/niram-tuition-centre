/* ═══════════════════════════════════════════════════════════
   NIRAM TUITION CENTRE — ENQUIRY FORM
   enquiry.js — handle enquiry form submission to Supabase
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiryForm');
  const submitBtn = document.getElementById('enquirySubmitBtn');
  const successOverlay = document.getElementById('enquirySuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentName = document.getElementById('enq-student').value.trim();
    const parentName = document.getElementById('enq-parent').value.trim();
    const phone = document.getElementById('enq-phone').value.trim();
    const email = document.getElementById('enq-email').value.trim();
    const grade = document.getElementById('enq-grade').value;
    const board = document.getElementById('enq-board').value;
    const message = document.getElementById('enq-message').value.trim();

    // Validation
    if (!studentName || !parentName || !phone || !grade || !board) {
      alert('Please fill in all required fields.');
      return;
    }

    // Phone validation (basic)
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
    if (phoneClean.length < 10) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;"></div> Submitting...';

    try {
      const result = await submitEnquiry({
        studentName,
        parentName,
        phone: phoneClean,
        email,
        grade,
        board,
        message
      });

      if (result.success) {
        successOverlay.classList.add('active');
        form.reset();
      } else {
        alert('Something went wrong. Please try again or WhatsApp us directly.');
      }
    } catch (err) {
      console.error('Enquiry form error:', err);
      alert('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
        Submit Enquiry
      `;
    }
  });

  // Close success overlay
  if (successOverlay) {
    successOverlay.addEventListener('click', (e) => {
      if (e.target === successOverlay) {
        successOverlay.classList.remove('active');
      }
    });
  }
});
