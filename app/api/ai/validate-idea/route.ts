import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { callGeminiJSON } from '../../../../lib/gemini';
import { getPlanTier, checkUsageLimit, incrementUsage, FEATURES } from '../../../../lib/usage-limits';
import type { IdeaValidationResult } from '../../../../lib/types';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const planTier = await getPlanTier(user.id);
  const usage = await checkUsageLimit(user.id, FEATURES.VALIDATE_IDEA, planTier);

  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: 'limit_reached',
        message: planTier === 'free'
          ? 'Free users get 1 idea validation (lifetime). Upgrade to continue.'
          : `You've used all ${usage.limit} idea validations for this month. Upgrade for more.`,
        upgrade_required: true,
        current_plan: planTier,
        remaining: usage.remaining,
        limit: usage.limit,
      },
      { status: 403 },
    );
  }

  const { ideaTitle, problem, solution, targetMarket } = await request.json();

  const prompt = `You are a startup analyst. Evaluate this business idea and return ONLY valid JSON — no markdown, no extra text.

Idea: ${ideaTitle}
Problem: ${problem}
Solution: ${solution}
Target Market: ${targetMarket || 'Not specified'}

Return this exact JSON shape:
{
  "validation_score": <integer 0-100>,
  "market_size": "<brief market size estimate>",
  "top_3_risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "top_3_opportunities": ["<opportunity 1>", "<opportunity 2>", "<opportunity 3>"],
  "competitor_landscape": "<brief competitor overview>",
  "recommendation": "<actionable recommendation in 2-3 sentences>"
}`;

  const result = await callGeminiJSON<IdeaValidationResult>(prompt);

  // Save to DB
  await supabase.from('idea_validations').insert({
    user_id: user.id,
    validation_score: result.validation_score,
    market_size: result.market_size,
    risks: result.top_3_risks,
    opportunities: result.top_3_opportunities,
    competitor_landscape: result.competitor_landscape,
    recommendation: result.recommendation,
  });

  await incrementUsage(user.id, FEATURES.VALIDATE_IDEA);

  return NextResponse.json(result);
}
