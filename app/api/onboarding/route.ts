import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../lib/supabase/server';
import type { OnboardingPayload } from '../../../lib/types';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: OnboardingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { startup_name, problem_statement, target_audience, solution, business_model } = body;

  if (!startup_name || !problem_statement || !target_audience || !solution) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await supabase.from('user_profiles').upsert(
    {
      user_id: user.id,
      startup_name,
      problem_statement,
      target_audience,
      solution,
      business_model: business_model || null,
      onboarding_complete: true,
    },
    { onConflict: 'user_id' },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
