/* ═══════════════════════════════════════════════════════════
   NIRAM TUITION CENTRE — GALLERY
   gallery.js — load gallery from Supabase, filter, lightbox
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('galleryGrid');
  const loading = document.getElementById('galleryLoading');
  const empty = document.getElementById('galleryEmpty');
  const filters = document.querySelectorAll('.gallery-filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  let allImages = [];

  // ── Load gallery from Supabase ──
  try {
    allImages = await fetchGallery();
  } catch (err) {
    console.error('Gallery fetch error:', err);
  }

  // ── Render gallery ──
  function renderGallery(images) {
    // Remove loading state
    if (loading) loading.remove();

    if (images.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    grid.innerHTML = images.map(img => `
      <div class="gallery-item reveal" data-category="${img.category || 'other'}">
        <img src="${img.image_url}" alt="${img.title}" loading="lazy"
             data-full="${img.image_url}" data-title="${img.title}" data-desc="${img.description || ''}">
        <div class="gallery-item-overlay">
          <h4>${img.title}</h4>
          <span>${(img.category || 'other').charAt(0).toUpperCase() + (img.category || 'other').slice(1)}</span>
        </div>
      </div>
    `).join('');

    // Trigger reveal animations
    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 50);
      });
    }, 100);

    // Add click handlers for lightbox
    grid.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => openLightbox(img));
    });
  }

  // ── Filter handling ──
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      if (category === 'all') {
        renderGallery(allImages);
      } else {
        renderGallery(allImages.filter(img => img.category === category));
      }
    });
  });

  // ── Lightbox ──
  function openLightbox(imgEl) {
    lightboxImg.src = imgEl.dataset.full;
    lightboxImg.alt = imgEl.dataset.title;
    lightboxCaption.textContent = imgEl.dataset.title + (imgEl.dataset.desc ? ' — ' + imgEl.dataset.desc : '');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Initial render ──
  renderGallery(allImages);
});
