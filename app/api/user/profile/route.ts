import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { getPlanTier } from '../../../../lib/usage-limits';

export async function GET() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('startup_name, full_name, company, notification_preferences')
    .eq('user_id', user.id)
    .single();

  const planTier = await getPlanTier(user.id);

  return NextResponse.json({
    email: user.email,
    full_name: profile?.full_name ?? (user.user_metadata?.full_name ?? null),
    company: profile?.company ?? null,
    startup_name: profile?.startup_name ?? null,
    plan_tier: planTier,
    notification_preferences: profile?.notification_preferences ?? {
      emailNotifications: true,
      projectUpdates: true,
      weeklyDigest: false,
      marketingEmails: false,
    },
  });
}

export async function PATCH(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { full_name, email, company, notification_preferences } = body;

  const profileUpdate: Record<string, unknown> = { user_id: user.id };
  if (full_name !== undefined) profileUpdate.full_name = full_name;
  if (company !== undefined) profileUpdate.company = company;
  if (notification_preferences !== undefined) profileUpdate.notification_preferences = notification_preferences;

  // Save to user_profiles
  if (Object.keys(profileUpdate).length > 1) {
    const { error: profileErr } = await supabase
      .from('user_profiles')
      .upsert(profileUpdate, { onConflict: 'user_id' });
    if (profileErr) return NextResponse.json({ error: profileErr.message }, { status: 500 });
  }

  // Update email in auth if changed
  if (email && email !== user.email) {
    const { error: emailErr } = await supabase.auth.updateUser({ email });
    if (emailErr) return NextResponse.json({ error: emailErr.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
