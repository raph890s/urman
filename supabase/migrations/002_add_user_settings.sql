-- Add user-level settings columns to user_profiles
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS company   TEXT,
  ADD COLUMN IF NOT EXISTS notification_preferences JSONB
    DEFAULT '{"emailNotifications":true,"projectUpdates":true,"weeklyDigest":false,"marketingEmails":false}'::jsonb;
