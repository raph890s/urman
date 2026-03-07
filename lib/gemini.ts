import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Call Gemini with a prompt and return cleaned text (markdown fences stripped).
 * Always instructs the model to return JSON only.
 */
export async function callGemini(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  // Strip markdown code fences if present
  return text
    .replace(/^```(?:json)?\n?/m, '')
    .replace(/\n?```$/m, '')
    .trim();
}

/**
 * Call Gemini and parse the response as JSON.
 */
export async function callGeminiJSON<T = unknown>(prompt: string): Promise<T> {
  const text = await callGemini(prompt);
  try {
    return JSON.parse(text) as T;
  } catch {
    // Second attempt: extract first JSON object/array from the text
    const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) return JSON.parse(match[0]) as T;
    throw new Error(`Gemini returned non-JSON: ${text.slice(0, 200)}`);
  }
}
