import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { callGeminiJSON } from '../../../../lib/gemini';
import { getPlanTier, checkUsageLimit, incrementUsage, FEATURES } from '../../../../lib/usage-limits';
import type { MarketingContentResult } from '../../../../lib/types';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const planTier = await getPlanTier(user.id);
  const usage = await checkUsageLimit(user.id, FEATURES.GENERATE_MARKETING_CONTENT, planTier);

  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: 'limit_reached',
        message: `Marketing content limit reached (${usage.limit}/month). Upgrade to continue.`,
        upgrade_required: true,
        current_plan: planTier,
        remaining: usage.remaining,
        limit: usage.limit,
      },
      { status: 403 },
    );
  }

  const { topic, tone, length, contentType } = await request.json();

  const lengthDesc = length === 'short' ? '1-2 sentences each' : length === 'long' ? '4-5 sentences each' : '2-3 sentences each';

  const prompt = `You are a marketing copywriter. Generate marketing content with a ${tone} tone, ${lengthDesc}.
Topic/Product: ${topic}
Content focus: ${contentType || 'social media'}

Return ONLY valid JSON — no markdown, no extra text:
{
  "twitter_posts": ["<tweet 1>", "<tweet 2>", "<tweet 3>"],
  "linkedin_posts": ["<linkedin post 1>", "<linkedin post 2>"],
  "email_subject_lines": ["<subject 1>", "<subject 2>", "<subject 3>"],
  "blog_post_titles": ["<title 1>", "<title 2>", "<title 3>"]
}`;

  const result = await callGeminiJSON<MarketingContentResult>(prompt);

  await supabase.from('generated_content').insert({
    user_id: user.id,
    content_type: 'marketing',
    content_json: result,
  });

  await incrementUsage(user.id, FEATURES.GENERATE_MARKETING_CONTENT);

  return NextResponse.json(result);
}
