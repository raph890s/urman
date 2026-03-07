import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { callGeminiJSON } from '../../../../lib/gemini';
import { getPlanTier, checkUsageLimit, incrementUsage, FEATURES } from '../../../../lib/usage-limits';
import type { LandingPageResult } from '../../../../lib/types';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const planTier = await getPlanTier(user.id);
  const usage = await checkUsageLimit(user.id, FEATURES.GENERATE_LANDING_PAGE, planTier);

  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: 'limit_reached',
        message: `You've reached your landing page generation limit (${usage.limit}/month). Upgrade to continue.`,
        upgrade_required: true,
        current_plan: planTier,
        remaining: usage.remaining,
        limit: usage.limit,
      },
      { status: 403 },
    );
  }

  const { productName, description, targetAudience, uniqueValue } = await request.json();

  const prompt = `You are a conversion copywriting expert. Generate landing page copy and return ONLY valid JSON — no markdown.

Product: ${productName}
Description: ${description}
Target Audience: ${targetAudience || 'General audience'}
Unique Value: ${uniqueValue || 'Not specified'}

Return this exact JSON shape:
{
  "hero_headline": "<compelling headline, max 10 words>",
  "hero_subheadline": "<supporting subheadline, max 20 words>",
  "features": [
    {"title": "<feature 1 name>", "description": "<feature 1 description, 1 sentence>"},
    {"title": "<feature 2 name>", "description": "<feature 2 description, 1 sentence>"},
    {"title": "<feature 3 name>", "description": "<feature 3 description, 1 sentence>"}
  ],
  "cta_primary": "<primary call-to-action button text>",
  "cta_secondary": "<secondary call-to-action text>",
  "social_proof_line": "<social proof or trust statement>"
}`;

  const result = await callGeminiJSON<LandingPageResult>(prompt);

  await supabase.from('generated_content').insert({
    user_id: user.id,
    content_type: 'landing_page',
    content_json: result,
  });

  await incrementUsage(user.id, FEATURES.GENERATE_LANDING_PAGE);

  return NextResponse.json(result);
}
