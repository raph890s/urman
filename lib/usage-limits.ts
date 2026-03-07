import { createServiceClient } from './supabase/server';
import type { PlanTier, UsageCheckResult } from './types';

// ============================================================
// Feature name constants
// ============================================================
export const FEATURES = {
  VALIDATE_IDEA: 'validate_idea',
  GENERATE_LANDING_PAGE: 'generate_landing_page',
  GENERATE_FEATURES: 'generate_features',
  GENERATE_LAUNCH_PLAN: 'generate_launch_plan',
  GENERATE_MARKETING_CONTENT: 'generate_marketing_content',
  GENERATE_AFFILIATE_STRATEGY: 'generate_affiliate_strategy',
} as const;

export type FeatureName = (typeof FEATURES)[keyof typeof FEATURES];

// ============================================================
// Limits table per plan
// Infinity = unlimited. -1 = blocked entirely.
// ============================================================
const MONTHLY_LIMITS: Record<PlanTier, Record<FeatureName, number>> = {
  free: {
    validate_idea: 1,             // lifetime (handled separately)
    generate_landing_page: -1,
    generate_features: -1,
    generate_launch_plan: -1,
    generate_marketing_content: -1,
    generate_affiliate_strategy: -1,
  },
  starter: {
    validate_idea: 3,
    generate_landing_page: 1,
    generate_features: 3,
    generate_launch_plan: 1,
    generate_marketing_content: 2,
    generate_affiliate_strategy: -1,   // blocked
  },
  pro: {
    validate_idea: 10,
    generate_landing_page: 5,
    generate_features: Infinity,
    generate_launch_plan: 3,
    generate_marketing_content: 10,
    generate_affiliate_strategy: 2,
  },
  agency: {
    validate_idea: Infinity,
    generate_landing_page: Infinity,
    generate_features: Infinity,
    generate_launch_plan: Infinity,
    generate_marketing_content: Infinity,
    generate_affiliate_strategy: Infinity,
  },
};

// ============================================================
// Get the user's current plan tier from the DB
// ============================================================
export async function getPlanTier(userId: string): Promise<PlanTier> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from('subscriptions')
    .select('plan_tier, status')
    .eq('user_id', userId)
    .single();

  if (!data || data.status !== 'active') return 'free';
  return (data.plan_tier as PlanTier) ?? 'free';
}

// ============================================================
// Check whether a user is allowed to use a feature
// ============================================================
export async function checkUsageLimit(
  userId: string,
  feature: FeatureName,
  planTier: PlanTier,
): Promise<UsageCheckResult> {
  const limit = MONTHLY_LIMITS[planTier][feature];

  // Completely blocked for this plan
  if (limit === -1) {
    return { allowed: false, remaining: 0, limit: 0 };
  }

  // Unlimited
  if (limit === Infinity) {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const supabase = createServiceClient();

  // Free tier: validate_idea is lifetime, not monthly
  if (planTier === 'free' && feature === 'validate_idea') {
    const { count } = await supabase
      .from('usage_tracking')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('feature_name', feature);

    const used = count ?? 0;
    return {
      allowed: used < limit,
      remaining: Math.max(0, limit - used),
      limit,
      isLifetime: true,
    };
  }

  // Monthly usage count
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('usage_tracking')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('feature_name', feature)
    .gte('used_at', startOfMonth.toISOString());

  const used = count ?? 0;
  return {
    allowed: used < limit,
    remaining: Math.max(0, limit - used),
    limit,
  };
}

// ============================================================
// Record one usage event after a successful AI call
// ============================================================
export async function incrementUsage(
  userId: string,
  feature: FeatureName,
): Promise<void> {
  const supabase = createServiceClient();
  await supabase.from('usage_tracking').insert({ user_id: userId, feature_name: feature });
}
