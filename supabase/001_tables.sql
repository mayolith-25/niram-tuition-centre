-- ═══════════════════════════════════════════════════════════
-- NIRAM TUITION CENTRE — DATABASE SCHEMA
-- Run this in Supabase SQL Editor (in order)
-- ═══════════════════════════════════════════════════════════

-- 1. PROFILES (linked to Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. STUDENTS
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  grade TEXT NOT NULL,
  board TEXT NOT NULL CHECK (board IN ('CBSE', 'ICSE', 'MATRIC', 'NIOS')),
  classroom TEXT CHECK (classroom IN ('Radhakrishnan', 'Abdul Kalam', 'MK Gandhi')),
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_email TEXT,
  admission_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ATTENDANCE
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  marked_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, date)
);

-- 4. FEE STRUCTURE
CREATE TABLE fee_structure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board TEXT NOT NULL,
  grade TEXT NOT NULL,
  monthly_fee NUMERIC NOT NULL,
  admission_fee NUMERIC DEFAULT 0,
  material_fee NUMERIC DEFAULT 0,
  academic_year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(board, grade, academic_year)
);

-- 5. FEE PAYMENTS
CREATE TABLE fee_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  fee_month TEXT NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  payment_mode TEXT CHECK (payment_mode IN ('cash', 'upi', 'bank_transfer', 'cheque')),
  receipt_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'partial', 'waived')),
  notes TEXT,
  recorded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. ENQUIRIES
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  grade TEXT,
  board TEXT,
  message TEXT,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'walkin', 'referral', 'other')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. GALLERY
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('classroom', 'event', 'festival', 'appreciation', 'other')),
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. TESTIMONIALS
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_role TEXT CHECK (author_role IN ('parent', 'student', 'alumni')),
  content TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. CENTRE SETTINGS
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pre-populate settings
INSERT INTO settings (key, value) VALUES
  ('centre_name', 'Niram Tuition Centre'),
  ('phone', ''),
  ('whatsapp', ''),
  ('email', ''),
  ('address', ''),
  ('academic_year', '2026-2027'),
  ('google_maps_url', '');

-- Indexes for performance
CREATE INDEX idx_students_board ON students(board);
CREATE INDEX idx_students_grade ON students(grade);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_fee_payments_student ON fee_payments(student_id);
CREATE INDEX idx_fee_payments_date ON fee_payments(payment_date);
CREATE INDEX idx_fee_payments_month ON fee_payments(fee_month);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_gallery_category ON gallery(category);
