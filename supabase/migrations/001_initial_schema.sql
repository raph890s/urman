-- ============================================================
-- URMAN Platform — Initial Schema
-- ============================================================

-- Plan tier enum
CREATE TYPE plan_tier AS ENUM ('free', 'starter', 'pro', 'agency');

-- ============================================================
-- user_profiles
-- ============================================================
CREATE TABLE user_profiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  startup_name        TEXT,
  problem_statement   TEXT,
  target_audience     TEXT,
  solution            TEXT,
  business_model      TEXT,
  onboarding_complete BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================================
-- subscriptions
-- ============================================================
CREATE TABLE subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_tier              plan_tier NOT NULL DEFAULT 'free',
  status                 TEXT NOT NULL DEFAULT 'active',
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================================
-- idea_validations
-- ============================================================
CREATE TABLE idea_validations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  validation_score    INTEGER NOT NULL,
  market_size         TEXT,
  risks               JSONB DEFAULT '[]'::jsonb,
  opportunities       JSONB DEFAULT '[]'::jsonb,
  competitor_landscape TEXT,
  recommendation      TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- generated_content
-- ============================================================
CREATE TABLE generated_content (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,  -- 'landing_page' | 'features' | 'marketing' | 'affiliate'
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- launch_plans
-- ============================================================
CREATE TABLE launch_plans (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_json  JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- usage_tracking
-- ============================================================
CREATE TABLE usage_tracking (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_name TEXT NOT NULL,
  used_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  month        DATE GENERATED ALWAYS AS (date_trunc('month', used_at)::date) STORED
);

-- Fast limit queries
CREATE INDEX idx_usage_tracking_user_feature_month
  ON usage_tracking (user_id, feature_name, month);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE user_profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_validations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE launch_plans      ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking    ENABLE ROW LEVEL SECURITY;

-- user_profiles: own rows only
CREATE POLICY "users_own_profile" ON user_profiles
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- subscriptions: own rows only
CREATE POLICY "users_own_subscription" ON subscriptions
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- idea_validations: own rows only
CREATE POLICY "users_own_validations" ON idea_validations
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- generated_content: own rows only
CREATE POLICY "users_own_content" ON generated_content
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- launch_plans: own rows only
CREATE POLICY "users_own_launch_plans" ON launch_plans
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- usage_tracking: own rows only
CREATE POLICY "users_own_usage" ON usage_tracking
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Auto-create subscription row (free tier) on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO subscriptions (user_id, plan_tier, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
