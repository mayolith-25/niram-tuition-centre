-- ═══════════════════════════════════════════════════════════
-- CRON JOBS (requires pg_cron extension)
-- ═══════════════════════════════════════════════════════════

-- Enable pg_cron extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Heartbeat: prevent 7-day inactivity pause on free tier
-- Runs every 5 days at midnight UTC
SELECT cron.schedule(
  'heartbeat-ping',
  '0 0 */5 * *',
  $$SELECT 1$$
);
