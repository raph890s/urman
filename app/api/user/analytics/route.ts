import { NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { createServiceClient } from '../../../../lib/supabase/server';
import { getPlanTier } from '../../../../lib/usage-limits';

export async function GET() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const svc = createServiceClient();

  const [
    { count: ideaCount },
    { count: contentCount },
    { count: launchCount },
    { data: usageRows },
    planTier,
  ] = await Promise.all([
    svc.from('idea_validations').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    svc.from('generated_content').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    svc.from('launch_plans').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    svc.from('usage_tracking').select('feature_name, used_at').eq('user_id', user.id),
    getPlanTier(user.id),
  ]);

  // Aggregate feature usage counts
  const featureMap: Record<string, number> = {};
  const monthMap: Record<string, number> = {};

  for (const row of usageRows ?? []) {
    featureMap[row.feature_name] = (featureMap[row.feature_name] ?? 0) + 1;

    const d = new Date(row.used_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthMap[key] = (monthMap[key] ?? 0) + 1;
  }

  // Build last 6 calendar months (including current)
  const monthly_usage: { month: string; count: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    monthly_usage.push({ month: label, count: monthMap[key] ?? 0 });
  }

  const feature_usage = Object.entries(featureMap)
    .map(([feature_name, count]) => ({ feature_name, count }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({
    idea_validations_count: ideaCount ?? 0,
    content_generated_count: contentCount ?? 0,
    launch_plans_count: launchCount ?? 0,
    plan_tier: planTier,
    feature_usage,
    monthly_usage,
  });
}
