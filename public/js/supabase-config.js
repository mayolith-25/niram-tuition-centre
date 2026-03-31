/* ═══════════════════════════════════════════════════════════
   NIRAM TUITION CENTRE — SUPABASE CLIENT CONFIG
   Public website: uses ANON key only (safe to expose)
   ═══════════════════════════════════════════════════════════ */

// ⚠️ Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Initialize Supabase client (loaded via CDN in HTML)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Helper: Fetch gallery images ──
async function fetchGallery(category = null) {
  let query = supabase
    .from('gallery')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
  return data || [];
}

// ── Helper: Fetch testimonials ──
async function fetchTestimonials(featuredOnly = false) {
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  if (featuredOnly) {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data || [];
}

// ── Helper: Submit enquiry ──
async function submitEnquiry(formData) {
  const { data, error } = await supabase
    .from('enquiries')
    .insert([{
      student_name: formData.studentName,
      parent_name: formData.parentName,
      phone: formData.phone,
      email: formData.email || null,
      grade: formData.grade || null,
      board: formData.board || null,
      message: formData.message || null,
      source: 'website'
    }]);

  if (error) {
    console.error('Error submitting enquiry:', error);
    return { success: false, error };
  }
  return { success: true, data };
}

// ── Helper: Submit contact message (also saves as enquiry) ──
async function submitContactMessage(formData) {
  const { data, error } = await supabase
    .from('enquiries')
    .insert([{
      student_name: formData.name || 'N/A',
      parent_name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      message: formData.message || null,
      source: 'website'
    }]);

  if (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error };
  }
  return { success: true, data };
}
