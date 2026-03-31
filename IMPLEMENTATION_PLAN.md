# Niram Tuition Centre (NTC) — Implementation Plan (v2 — Simplified)

## Overview

A **focused, practical** digital system for Niram Tuition Centre built on **Netlify Free + Supabase Free** at **₹0/month**.

| Layer | What | Who Uses It |
|-------|------|-------------|
| 🌐 **Public Website** (8 pages) | Stunning marketing site with SEO, enquiry form, WhatsApp | Parents, Students, Public |
| 🔐 **Admin Dashboard** (5 modules) | Student management, attendance, fees, settings | NTC Owner/Staff |

---

## Free Tier Fit — Proof It Works

### Netlify Free
| Resource | Limit | Our Usage | Status |
|----------|-------|-----------|--------|
| Bandwidth | 100 GB/mo | ~2-5 GB/mo | ✅ 95%+ headroom |
| Build Minutes | 300/mo | ~10-15/mo | ✅ 95%+ headroom |
| Forms | 100/mo | 0 (we use Supabase) | ✅ Not needed |

### Supabase Free
| Resource | Limit | Our Usage | Status |
|----------|-------|-----------|--------|
| Database | 500 MB | ~10-30 MB | ✅ 94%+ headroom |
| Storage | 1 GB | ~100-300 MB (gallery) | ✅ 70%+ headroom |
| Auth MAU | 50,000 | ~1-5 users (admin only) | ✅ 99%+ headroom |
| Edge Functions | 500,000/mo | ~500-2,000/mo | ✅ 99%+ headroom |

> [!WARNING]
> **Supabase 7-day inactivity pause**: Free projects pause after 7 days of zero database activity. We'll set up a `pg_cron` heartbeat query every 6 days to prevent this permanently.

---

## What You're Getting

### 🌐 Public Website — 8 Pages

| # | Page | Purpose |
|---|------|---------|
| 1 | **Home** | Hero section, taglines, USP cards, board badges, CTAs, WhatsApp button |
| 2 | **About** | NTC story, philosophy, mission, vision, values |
| 3 | **Classrooms** | Radhakrishnan, Kalam, Gandhi rooms — features & inspiration |
| 4 | **Courses** | CBSE / ICSE / MATRIC / NIOS programs, subjects, grade info |
| 5 | **Gallery** | Dynamic photo gallery from Supabase (events, festivals, classrooms) |
| 6 | **Testimonials** | Parent/student reviews loaded from Supabase |
| 7 | **Contact** | Phone, WhatsApp, email, address, Google Maps, contact form |
| 8 | **Enquiry** | Admission enquiry form → saves to Supabase as a lead |

**Every page includes**: Floating WhatsApp button, responsive nav, footer with contact info, SEO meta tags.

---

### 🔐 Admin Dashboard — 5 Modules

#### Module 1: Dashboard (Home)
The first thing you see after login — a **live snapshot** of your centre.

| Stat Card | What It Shows |
|-----------|--------------|
| 📊 Total Active Students | Count with board-wise breakdown |
| 💰 Revenue This Month | Total fees collected this month |
| 💸 Pending Fees | Total overdue amount (highlighted in red) |
| ✅ Today's Attendance | Present vs Total ratio |
| 📩 New Enquiries | Unread enquiries from website |
| 📅 Recent Activity | Last 10 actions (fee recorded, student added, etc.) |

---

#### Module 2: Students
Full student management — the core of the system.

| Feature | Details |
|---------|---------|
| **Student List** | Searchable, filterable table (by name, board, grade, status) |
| **Add Student** | Form: name, DOB, gender, grade, board, classroom, parent details, photo |
| **Edit Student** | Update any field |
| **Student Profile** | Single-page view: personal info, attendance summary, fee history |
| **Status Management** | Active / Inactive / Graduated |
| **CSV Export** | Export student list as CSV |
| **Quick Filters** | Filter by Board (CBSE/ICSE/MATRIC/NIOS), Grade, Classroom, Status |

---

#### Module 3: Attendance
Simple, fast attendance marking.

| Feature | Details |
|---------|---------|
| **Mark Attendance** | Select date + batch/grade → checkbox grid of students → mark present/absent |
| **Bulk Mark** | "Mark All Present" button for quick entry |
| **Attendance History** | View past attendance by date, student, or batch |
| **Student Attendance %** | Auto-calculated attendance percentage per student |
| **Monthly Report** | Calendar-style monthly view: green (present), red (absent), grey (no data) |
| **CSV Export** | Export attendance report |

---

#### Module 4: Fees (⭐ Core Feature)
A **complete fee management system** — this is the powerhouse module.

##### 4A. Fee Structure Management
- Define fee structure per **board + grade + academic year**
- Fields: Monthly Fee, Admission Fee, Material Fee
- Example: CBSE 10th → ₹2,500/month + ₹1,000 admission

##### 4B. Record Fee Payment
- Select student → select month(s) → enter amount → select payment mode
- Payment modes: Cash, UPI, Bank Transfer, Cheque
- Auto-generate unique **receipt number** (e.g., `NTC-2026-0001`)
- Optional notes field

##### 4C. Fee Dashboard
| View | What It Shows |
|------|--------------|
| **Monthly Collection** | Total collected this month with comparison to last month |
| **Board-wise Revenue** | Revenue breakdown by CBSE / ICSE / MATRIC / NIOS |
| **Payment Mode Split** | Pie chart: Cash vs UPI vs Bank vs Cheque |
| **Collection Trend** | Bar chart: revenue per month (last 6 months) |

##### 4D. Pending Fees Tracker
- Auto-detect students with **overdue fees** (expected vs paid)
- Color-coded: Green (paid), Yellow (partial), Red (overdue)
- Filter by board, grade, number of months overdue
- **One-click WhatsApp reminder**: generates pre-filled WhatsApp message with student name, overdue amount, and months

##### 4E. Fee History
- Full payment history per student
- Sortable, filterable table
- CSV export of all fee data

##### 4F. PDF Receipt Generation
- When fee is recorded, auto-generate a **branded PDF receipt**
- Receipt includes: NTC logo, receipt number, student name, grade, board, amount, payment mode, date, "Thank you" message
- Download button on each payment record
- Uses jsPDF (client-side, no server needed)

---

#### Module 5: Settings
Centre configuration and user management.

| Feature | Details |
|---------|---------|
| **Centre Info** | Edit NTC name, phone, email, address (used in receipts & footer) |
| **Gallery Manager** | Upload/delete gallery photos, set category & order |
| **Testimonial Manager** | Add/edit/delete/feature testimonials |
| **Academic Year** | Set current academic year |
| **User Management** | Add/remove admin users (email + password auth) |
| **Data Export** | Full data export (students, fees, attendance) as CSV |
| **Enquiry Viewer** | View/manage enquiries submitted from website |

---

## Technology Stack

| Component | Tool | Why |
|-----------|------|-----|
| Public Website | HTML + CSS + JS (multi-page) | Best SEO, fastest load, zero build |
| Admin Dashboard | Vite + Vanilla JS (SPA) | Fast dev, hot reload, modern |
| Database | Supabase PostgreSQL | Free, powerful, built-in auth |
| Auth | Supabase Auth (email/password) | Admin-only login, simple |
| File Storage | Supabase Storage | Gallery photos (1 GB free) |
| Hosting | Netlify | Free CDN, auto-deploy |
| Charts | Chart.js (CDN) | Lightweight, beautiful charts |
| PDF Receipts | jsPDF (CDN) | Client-side PDF, no server |
| Icons | Lucide Icons (CDN) | Modern, lightweight |
| Fonts | Google Fonts (Outfit + Inter) | Premium typography |

---

## Database Schema

> [!NOTE]
> **9 tables + 2 views**. Estimated size for 200 students over 2 years: ~15-25 MB (well within 500 MB).

```sql
-- ═══════════════════════════════════════════
-- 1. PROFILES (linked to Supabase Auth)
-- ═══════════════════════════════════════════
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════
-- 2. STUDENTS
-- ═══════════════════════════════════════════
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

-- ═══════════════════════════════════════════
-- 3. ATTENDANCE
-- ═══════════════════════════════════════════
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  marked_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, date)
);

-- ═══════════════════════════════════════════
-- 4. FEE STRUCTURE
-- ═══════════════════════════════════════════
CREATE TABLE fee_structure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board TEXT NOT NULL,
  grade TEXT NOT NULL,
  monthly_fee NUMERIC NOT NULL,
  admission_fee NUMERIC DEFAULT 0,
  material_fee NUMERIC DEFAULT 0,
  academic_year TEXT NOT NULL,         -- e.g., '2026-2027'
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(board, grade, academic_year)
);

-- ═══════════════════════════════════════════
-- 5. FEE PAYMENTS
-- ═══════════════════════════════════════════
CREATE TABLE fee_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  fee_month TEXT NOT NULL,             -- e.g., 'April 2026'
  payment_date DATE DEFAULT CURRENT_DATE,
  payment_mode TEXT CHECK (payment_mode IN ('cash', 'upi', 'bank_transfer', 'cheque')),
  receipt_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'partial', 'waived')),
  notes TEXT,
  recorded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════
-- 6. ENQUIRIES (from website form)
-- ═══════════════════════════════════════════
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

-- ═══════════════════════════════════════════
-- 7. GALLERY
-- ═══════════════════════════════════════════
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

-- ═══════════════════════════════════════════
-- 8. TESTIMONIALS
-- ═══════════════════════════════════════════
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

-- ═══════════════════════════════════════════
-- 9. CENTRE SETTINGS (key-value store)
-- ═══════════════════════════════════════════
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
```

### Database Views

```sql
-- Dashboard statistics
CREATE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM students WHERE status = 'active') AS active_students,
  (SELECT COUNT(*) FROM students WHERE status = 'active' AND board = 'CBSE') AS cbse_students,
  (SELECT COUNT(*) FROM students WHERE status = 'active' AND board = 'ICSE') AS icse_students,
  (SELECT COUNT(*) FROM students WHERE status = 'active' AND board = 'MATRIC') AS matric_students,
  (SELECT COUNT(*) FROM students WHERE status = 'active' AND board = 'NIOS') AS nios_students,
  (SELECT COALESCE(SUM(amount), 0) FROM fee_payments
    WHERE payment_date >= date_trunc('month', CURRENT_DATE) AND status = 'paid') AS revenue_this_month,
  (SELECT COALESCE(SUM(amount), 0) FROM fee_payments
    WHERE payment_date >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
    AND payment_date < date_trunc('month', CURRENT_DATE) AND status = 'paid') AS revenue_last_month,
  (SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE AND status = 'present') AS present_today,
  (SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE AND status = 'absent') AS absent_today,
  (SELECT COUNT(*) FROM enquiries WHERE status = 'new') AS new_enquiries;

-- Fee status per student (pending fee detection)
CREATE VIEW student_fee_status AS
SELECT
  s.id AS student_id,
  s.full_name,
  s.board,
  s.grade,
  s.parent_name,
  s.parent_phone,
  s.classroom,
  fs.monthly_fee,
  COALESCE(paid.total_paid, 0) AS total_paid,
  COALESCE(paid.months_paid, 0) AS months_paid
FROM students s
LEFT JOIN fee_structure fs
  ON s.board = fs.board AND s.grade = fs.grade
LEFT JOIN (
  SELECT student_id,
    SUM(amount) AS total_paid,
    COUNT(DISTINCT fee_month) AS months_paid
  FROM fee_payments WHERE status IN ('paid', 'partial')
  GROUP BY student_id
) paid ON s.id = paid.student_id
WHERE s.status = 'active';
```

### RLS Policies

```sql
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

-- Admins can do everything (authenticated users are admins)
CREATE POLICY "Admins full access" ON students
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins full access" ON attendance
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins full access" ON fee_structure
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins full access" ON fee_payments
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins full access" ON enquiries
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins full access" ON settings
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins full access" ON profiles
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Gallery & Testimonials: Public read, admin write
CREATE POLICY "Public read" ON gallery
  FOR SELECT USING (is_visible = true);
CREATE POLICY "Admin write" ON gallery
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public read" ON testimonials
  FOR SELECT USING (is_visible = true);
CREATE POLICY "Admin write" ON testimonials
  FOR ALL USING (auth.uid() IS NOT NULL);
```

### Cron Job (Heartbeat to prevent pause)

```sql
-- Prevent 7-day inactivity pause
SELECT cron.schedule(
  'heartbeat-ping',
  '0 0 */5 * *',   -- Every 5 days at midnight
  $$SELECT 1$$
);
```

---

## Project Structure

```
niram-tuition-centre/
│
├── public/                          # PUBLIC WEBSITE (8 static pages)
│   ├── index.html                   # Home
│   ├── about.html                   # About NTC
│   ├── classrooms.html              # Named classrooms
│   ├── courses.html                 # CBSE/ICSE/MATRIC/NIOS programs
│   ├── gallery.html                 # Dynamic photo gallery
│   ├── testimonials.html            # Reviews
│   ├── contact.html                 # Contact info + form
│   ├── enquiry.html                 # Admission enquiry form
│   ├── 404.html                     # Custom 404
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service worker (offline caching)
│   ├── css/
│   │   ├── globals.css              # Design system, tokens, reset
│   │   ├── components.css           # Shared component styles
│   │   ├── home.css                 # Homepage styles
│   │   ├── pages.css                # Inner page styles
│   │   └── animations.css           # Micro-animations
│   ├── js/
│   │   ├── supabase-config.js       # Supabase client (anon key)
│   │   ├── nav.js                   # Navigation, mobile menu
│   │   ├── enquiry.js               # Enquiry form → Supabase
│   │   ├── contact.js               # Contact form → Supabase
│   │   ├── gallery.js               # Load gallery from Supabase
│   │   ├── testimonials.js          # Load testimonials from Supabase
│   │   ├── particles.js             # Hero background animation
│   │   └── counter.js               # Animated stat counters
│   └── images/
│       ├── logo.webp
│       ├── hero-bg.webp
│       ├── og-image.webp
│       ├── icons/                   # Favicon, PWA icons
│       └── classrooms/              # Classroom photos
│
├── app/                             # ADMIN DASHBOARD (Vite SPA)
│   ├── index.html                   # SPA entry
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.js                  # Entry, router init
│       ├── supabase.js              # Supabase client
│       ├── router.js                # Hash-based SPA router
│       ├── auth/
│       │   ├── login.js             # Login page
│       │   └── guard.js             # Auth guard
│       ├── pages/
│       │   ├── dashboard.js         # Stats + charts
│       │   ├── students-list.js     # Student table (search, filter, export)
│       │   ├── student-form.js      # Add/edit student
│       │   ├── student-profile.js   # Single student view
│       │   ├── attendance-mark.js   # Mark attendance (grid)
│       │   ├── attendance-report.js # View attendance history
│       │   ├── fees-collect.js      # Record payment
│       │   ├── fees-pending.js      # Overdue tracker
│       │   ├── fees-history.js      # Payment history
│       │   ├── fees-structure.js    # Manage fee structure
│       │   └── settings.js          # All settings in one page
│       ├── components/
│       │   ├── sidebar.js           # Nav sidebar
│       │   ├── header.js            # Top bar
│       │   ├── modal.js             # Reusable modal
│       │   ├── table.js             # Data table (sort, filter, CSV)
│       │   ├── chart.js             # Chart.js wrapper
│       │   ├── toast.js             # Notification toasts
│       │   └── receipt-pdf.js       # jsPDF receipt generator
│       └── styles/
│           ├── dashboard.css
│           ├── components.css
│           └── themes.css           # Light/dark mode
│
├── supabase/                        # SQL migrations
│   ├── 001_tables.sql
│   ├── 002_views.sql
│   ├── 003_rls.sql
│   └── 004_cron.sql
│
├── netlify.toml                     # Build + redirect config
├── README.md
└── .gitignore
```

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--navy-900` | `#0a1628` | Dark backgrounds, sidebar |
| `--navy-700` | `#1e3a5f` | Headers, cards |
| `--navy-500` | `#2d5f8a` | Hover states, accents |
| `--gold-500` | `#d4a853` | Primary accent, CTAs, highlights |
| `--gold-400` | `#f4a100` | Saffron accent, badges |
| `--warm-50` | `#faf6f0` | Page backgrounds |
| `--warm-100` | `#f0e6d4` | Card backgrounds |
| `--white` | `#ffffff` | Text on dark, cards |
| `--green-500` | `#22c55e` | Present/Paid/Success |
| `--red-500` | `#ef4444` | Absent/Overdue/Error |
| `--yellow-500` | `#eab308` | Partial/Warning |

### Typography
- **Headings**: `'Outfit', sans-serif` — bold, modern
- **Body**: `'Inter', sans-serif` — clean, readable
- **Scale**: 14px (small), 16px (body), 20px (h4), 24px (h3), 32px (h2), 48px (h1)

### Board Color Codes
| Board | Color | Badge |
|-------|-------|-------|
| CBSE | `#3b82f6` (Blue) | Blue pill |
| ICSE | `#22c55e` (Green) | Green pill |
| MATRIC | `#f97316` (Orange) | Orange pill |
| NIOS | `#a855f7` (Purple) | Purple pill |

---

## Phased Roadmap

### Phase 1: Foundation (Week 1)
- Supabase project setup (tables, views, RLS, cron)
- Supabase storage buckets (`gallery`)
- Design system CSS (`globals.css`, `components.css`, `animations.css`)
- `netlify.toml` configuration
- Shared JS: `supabase-config.js`, `nav.js`

### Phase 2: Public Website (Week 2-3)
- All 8 HTML pages with full styling and responsiveness
- Dynamic content: Gallery + Testimonials loaded from Supabase
- Forms: Enquiry + Contact → Supabase
- Floating WhatsApp button
- SEO: meta tags, OG tags, sitemap, robots.txt
- PWA: manifest.json, service worker
- Hero particle animation

### Phase 3: Admin Dashboard (Week 3-5)
- Vite project init with SPA router
- Auth: Login page + auth guard
- Dashboard: stat cards + Chart.js charts
- Students: list, add/edit form, profile, CSV export
- Attendance: mark grid, history, reports
- Fees: collect payment, pending tracker, history, PDF receipts, fee structure
- Settings: centre info, gallery manager, testimonials, enquiry viewer

### Phase 4: Polish & Deploy (Week 5-6)
- Dark mode toggle
- Mobile responsive testing
- Lighthouse audit (target 90+)
- Cross-browser testing
- Connect GitHub → Netlify auto-deploy
- Custom domain setup
- Final walkthrough

---

## Key Features At a Glance

### Public Website Highlights
- 🎨 Cinematic hero with particle animation + "Path.. to Endeavour"
- 📊 Animated stat counters (students, years, boards)
- 🏛️ Classroom cards with icons of Indian leaders
- 🎓 Board badges with color codes
- 📸 Filterable photo gallery (from Supabase)
- ⭐ Testimonials with star ratings
- 📝 Enquiry form → saves to Supabase as lead
- 💬 Floating WhatsApp button on every page
- 📱 PWA installable on phones
- 🔍 Full SEO optimization

### Admin Dashboard Highlights
- 📈 Live dashboard with stats + charts
- 👨‍🎓 Full student CRUD with search, filter, CSV export
- ✅ Batch-wise attendance marking grid
- 💰 **Complete fee management**: collect, track, PDF receipts, pending alerts
- 💬 **One-click WhatsApp fee reminder** (pre-filled message)
- 📸 Gallery manager (upload, categorize, reorder)
- ⭐ Testimonial manager
- 📩 Enquiry viewer
- ⚙️ Centre settings (info, academic year, users)
- 🌙 Dark mode support

---

## User Review Required

> [!IMPORTANT]
> ### I Need These Details To Start Building:
>
> 1. **Contact Details** — NTC's phone number, WhatsApp number, email, physical address?
> 2. **Logo** — Do you have an NTC logo file? If not, I'll design one (Navy + Gold theme).
> 3. **Classroom Photos** — Do you have real photos of the 3 classrooms / events / students? If not, I'll generate placeholder images.
> 4. **Google Maps** — What's the exact address or Google Maps embed link?
> 5. **Admin Login** — What email do you want for the initial admin account?
> 6. **Domain** — Are you planning to use `niramtuitioncentre.com` or a different domain?

> [!TIP]
> ### You Can Add These Later (not needed to start):
> - Fee structure (board/grade pricing) — add via Settings after launch
> - Gallery photos — upload via Settings after launch
> - Testimonials — add via Settings after launch
> - Faculty info — can be added to About page later

---

## Verification Plan

### Automated
- Lighthouse audit on all 8 public pages (Performance, Accessibility, SEO ≥ 90)
- Form submission testing: Enquiry → Supabase, Contact → Supabase
- Auth flow: login → dashboard → logout
- Fee receipt PDF generation (correct data, proper formatting)

### Manual
- Mobile responsiveness (Chrome DevTools + actual Android/iOS)
- WhatsApp click-to-chat on real phone
- Full workflow: Add student → Mark attendance → Record fee → Download receipt
- Gallery upload → visible on public site
- Enquiry form submission → visible in Settings > Enquiries

---

## Summary

| Metric | Value |
|--------|-------|
| **Monthly Cost** | ₹0 |
| **Public Pages** | 8 |
| **Dashboard Modules** | 5 |
| **Database Tables** | 9 + 2 views |
| **Timeline** | ~5-6 weeks |
| **Tech Stack** | HTML/CSS/JS + Vite + Supabase + Netlify |
| **Key Innovation** | Full fee management with PDF receipts + WhatsApp reminders |
