import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase/server';
import { callGemini } from '../../../../lib/gemini';

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { message, history = [] } = await request.json();
  if (!message?.trim()) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  // Fetch startup context for a personalised assistant
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('startup_name, problem_statement, target_audience, solution, business_model')
    .eq('user_id', user.id)
    .single();

  const context = profile?.startup_name
    ? `Startup: ${profile.startup_name}
Problem: ${profile.problem_statement ?? 'not specified'}
Solution: ${profile.solution ?? 'not specified'}
Target audience: ${profile.target_audience ?? 'not specified'}
Business model: ${profile.business_model ?? 'not specified'}`
    : 'No startup profile set up yet.';

  // Build conversation history string (last 6 turns max)
  const historyText = (history as { role: string; content: string }[])
    .slice(-6)
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  const prompt = `You are a concise AI startup advisor for URMAN platform.

Startup context:
${context}

${historyText ? `Conversation so far:\n${historyText}\n` : ''}
User: ${message}

Reply helpfully and concisely in 1-3 sentences. Do not repeat the question.`;

  const reply = await callGemini(prompt);

  return NextResponse.json({ reply });
}
