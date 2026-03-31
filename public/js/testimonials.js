/* ═══════════════════════════════════════════════════════════
   NIRAM TUITION CENTRE — TESTIMONIALS
   testimonials.js — load & render testimonials from Supabase
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('testimonialsGrid');
  const loading = document.getElementById('testimonialsLoading');
  const empty = document.getElementById('testimonialsEmpty');

  let testimonials = [];

  try {
    testimonials = await fetchTestimonials();
  } catch (err) {
    console.error('Testimonials fetch error:', err);
  }

  // Remove loading
  if (loading) loading.remove();

  if (testimonials.length === 0) {
    empty.style.display = 'block';
    return;
  }

  // Generate star SVGs
  function getStars(rating) {
    const filled = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    const empty = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += i <= (rating || 5) ? filled : empty;
    }
    return html;
  }

  // Get initials
  function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  // Format role
  function formatRole(role) {
    const roles = { parent: 'Parent', student: 'Student', alumni: 'Alumni' };
    return roles[role] || 'Parent';
  }

  // Render
  grid.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-card reveal" style="transition-delay: ${i * 0.05}s;">
      <div class="testimonial-stars">${getStars(t.rating)}</div>
      <div class="testimonial-content">${t.content}</div>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${getInitials(t.author_name)}</div>
        <div class="testimonial-info">
          <h4>${t.author_name}</h4>
          <span>${formatRole(t.author_role)}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Trigger reveals
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 100);
});
