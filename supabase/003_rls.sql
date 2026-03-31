-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structure ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════
-- ADMIN-ONLY TABLES (full access for authenticated users)
-- ═══════════════════════════════════════════

CREATE POLICY "auth_full_access" ON profiles
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_full_access" ON students
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_full_access" ON attendance
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_full_access" ON fee_structure
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_full_access" ON fee_payments
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_full_access" ON settings
  FOR ALL USING (auth.uid() IS NOT NULL);

-- ═══════════════════════════════════════════
-- ENQUIRIES: public can INSERT, admin can do everything
-- ═══════════════════════════════════════════

CREATE POLICY "public_insert_enquiry" ON enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "auth_full_access" ON enquiries
  FOR ALL USING (auth.uid() IS NOT NULL);

-- ═══════════════════════════════════════════
-- GALLERY: public can SELECT visible, admin can do everything
-- ═══════════════════════════════════════════

CREATE POLICY "public_read_gallery" ON gallery
  FOR SELECT USING (is_visible = true);

CREATE POLICY "auth_full_access" ON gallery
  FOR ALL USING (auth.uid() IS NOT NULL);

-- ═══════════════════════════════════════════
-- TESTIMONIALS: public can SELECT visible, admin can do everything
-- ═══════════════════════════════════════════

CREATE POLICY "public_read_testimonials" ON testimonials
  FOR SELECT USING (is_visible = true);

CREATE POLICY "auth_full_access" ON testimonials
  FOR ALL USING (auth.uid() IS NOT NULL);
