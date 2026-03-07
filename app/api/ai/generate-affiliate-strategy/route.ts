import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { callGeminiJSON } from '../../../../lib/gemini';
import { getPlanTier, checkUsageLimit, incrementUsage, FEATURES } from '../../../../lib/usage-limits';
import type { AffiliateStrategyResult } from '../../../../lib/types';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const planTier = await getPlanTier(user.id);

  // Starter is explicitly blocked
  if (planTier === 'free' || planTier === 'starter') {
    return NextResponse.json(
      {
        error: 'limit_reached',
        message: 'Affiliate strategy is available on Pro and Agency plans only. Please upgrade.',
        upgrade_required: true,
        current_plan: planTier,
        remaining: 0,
        limit: 0,
      },
      { status: 403 },
    );
  }

  const usage = await checkUsageLimit(user.id, FEATURES.GENERATE_AFFILIATE_STRATEGY, planTier);

  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: 'limit_reached',
        message: `Affiliate strategy limit reached (${usage.limit}/month). Upgrade to Agency for unlimited.`,
        upgrade_required: true,
        current_plan: planTier,
        remaining: usage.remaining,
        limit: usage.limit,
      },
      { status: 403 },
    );
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('startup_name, target_audience, solution')
    .eq('user_id', user.id)
    .single();

  const body = await request.json().catch(() => ({}));
  const context = body.context || (profile
    ? `Product: ${profile.startup_name}, Target: ${profile.target_audience}, Solution: ${profile.solution}`
    : 'General product');

  const prompt = `You are an affiliate marketing expert. Create an affiliate strategy for this product.
Return ONLY valid JSON — no markdown, no extra text.

Context: ${context}

Return this exact JSON shape:
{
  "strategy": "<comprehensive affiliate strategy in 3-4 sentences>",
  "outreach_templates": [
    "<email/message template 1 for reaching out to affiliates>",
    "<email/message template 2>",
    "<email/message template 3>"
  ],
  "target_platforms": ["<platform 1>", "<platform 2>", "<platform 3>", "<platform 4>"]
}`;

  const result = await callGeminiJSON<AffiliateStrategyResult>(prompt);

  await supabase.from('generated_content').insert({
    user_id: user.id,
    content_type: 'affiliate',
    content_json: result,
  });

  await incrementUsage(user.id, FEATURES.GENERATE_AFFILIATE_STRATEGY);

  return NextResponse.json(result);
}
