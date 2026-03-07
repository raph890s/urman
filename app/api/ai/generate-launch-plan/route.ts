import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { callGeminiJSON } from '../../../../lib/gemini';
import { getPlanTier, checkUsageLimit, incrementUsage, FEATURES } from '../../../../lib/usage-limits';
import type { LaunchPlanResult } from '../../../../lib/types';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const planTier = await getPlanTier(user.id);
  const usage = await checkUsageLimit(user.id, FEATURES.GENERATE_LAUNCH_PLAN, planTier);

  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: 'limit_reached',
        message: `Launch plan limit reached (${usage.limit}/month). Upgrade to continue.`,
        upgrade_required: true,
        current_plan: planTier,
        remaining: usage.remaining,
        limit: usage.limit,
      },
      { status: 403 },
    );
  }

  // Optionally fetch user's startup data for context
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('startup_name, problem_statement, target_audience, solution')
    .eq('user_id', user.id)
    .single();

  const body = await request.json().catch(() => ({}));

  const startupContext = profile
    ? `Startup: ${profile.startup_name || 'Unnamed'}
Problem: ${profile.problem_statement || 'Not specified'}
Target Audience: ${profile.target_audience || 'Not specified'}
Solution: ${profile.solution || 'Not specified'}`
    : body.context || 'General product launch';

  const prompt = `You are a go-to-market strategist. Create a 4-week product launch plan.
Return ONLY valid JSON — no markdown, no extra text.

Context:
${startupContext}

Return this exact JSON shape:
{
  "week_1_actions": ["<action 1>", "<action 2>", "<action 3>"],
  "week_2_actions": ["<action 1>", "<action 2>", "<action 3>"],
  "week_3_actions": ["<action 1>", "<action 2>", "<action 3>"],
  "week_4_actions": ["<action 1>", "<action 2>", "<action 3>"],
  "launch_checklist": [
    {"item": "<checklist item 1>", "done": false},
    {"item": "<checklist item 2>", "done": false},
    {"item": "<checklist item 3>", "done": false},
    {"item": "<checklist item 4>", "done": false},
    {"item": "<checklist item 5>", "done": false}
  ]
}`;

  const result = await callGeminiJSON<LaunchPlanResult>(prompt);

  await supabase.from('launch_plans').insert({
    user_id: user.id,
    plan_json: result,
  });

  await incrementUsage(user.id, FEATURES.GENERATE_LAUNCH_PLAN);

  return NextResponse.json(result);
}
