-- ═══════════════════════════════════════════════════════════
-- DATABASE VIEWS
-- ═══════════════════════════════════════════════════════════

-- Dashboard statistics view
CREATE OR REPLACE VIEW dashboard_stats AS
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

-- Fee status per student
CREATE OR REPLACE VIEW student_fee_status AS
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
