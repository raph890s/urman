import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { callGeminiJSON } from '../../../../lib/gemini';
import { getPlanTier, checkUsageLimit, incrementUsage, FEATURES } from '../../../../lib/usage-limits';
import type { FeatureSuggestion } from '../../../../lib/types';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const planTier = await getPlanTier(user.id);
  const usage = await checkUsageLimit(user.id, FEATURES.GENERATE_FEATURES, planTier);

  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: 'limit_reached',
        message: `Feature suggestion limit reached. Upgrade to Pro or Agency for unlimited suggestions.`,
        upgrade_required: true,
        current_plan: planTier,
        remaining: usage.remaining,
        limit: usage.limit,
      },
      { status: 403 },
    );
  }

  const { context, existingFeatures } = await request.json();

  const prompt = `You are a product manager. Suggest 5 new features for a product based on the context below.
Return ONLY valid JSON — no markdown, no extra text.

Existing features: ${(existingFeatures || []).join(', ') || 'None'}
Context: ${context || 'General product'}

Return a JSON array of exactly 5 feature objects:
[
  {"name": "<feature name>", "description": "<1-sentence description>", "priority": "high|medium|low"},
  ...
]`;

  const result = await callGeminiJSON<FeatureSuggestion[]>(prompt);
  const features = Array.isArray(result) ? result : [];

  await supabase.from('generated_content').insert({
    user_id: user.id,
    content_type: 'features',
    content_json: { features },
  });

  await incrementUsage(user.id, FEATURES.GENERATE_FEATURES);

  return NextResponse.json(features);
}
