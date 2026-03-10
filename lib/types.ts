// ============================================================
// Shared TypeScript types for the Urman platform
// ============================================================

export type PlanTier = 'free' | 'starter' | 'pro' | 'agency';

// --- Usage limits ---

export interface UsageCheckResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  isLifetime?: boolean;
}

export interface LimitReachedError {
  error: 'limit_reached';
  message: string;
  upgrade_required: true;
  current_plan: PlanTier;
  remaining: number;
  limit: number;
}

// --- Onboarding ---

export interface OnboardingPayload {
  startup_name: string;
  problem_statement: string;
  target_audience: string;
  solution: string;
  business_model: string;
}

// --- AI responses ---

export interface IdeaValidationResult {
  validation_score: number;
  market_size: string;
  top_3_risks: string[];
  top_3_opportunities: string[];
  competitor_landscape: string;
  recommendation: string;
}

export interface LandingPageResult {
  hero_headline: string;
  hero_subheadline: string;
  features: { title: string; description: string }[];
  cta_primary: string;
  cta_secondary: string;
  social_proof_line: string;
}

export interface FeatureSuggestion {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface LaunchPlanResult {
  week_1_actions: string[];
  week_2_actions: string[];
  week_3_actions: string[];
  week_4_actions: string[];
  launch_checklist: { item: string; done: false }[];
}

export interface MarketingContentResult {
  twitter_posts: string[];
  linkedin_posts: string[];
  email_subject_lines: string[];
  blog_post_titles: string[];
}

export interface AffiliateStrategyResult {
  strategy: string;
  outreach_templates: string[];
  target_platforms: string[];
}

// --- Stripe ---

export interface CheckoutPayload {
  priceId: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface PortalResponse {
  url: string;
}

// --- User profile / settings ---

export interface UserProfileResponse {
  email: string;
  full_name: string | null;
  company: string | null;
  startup_name: string | null;
  plan_tier: PlanTier;
  notification_preferences: {
    emailNotifications: boolean;
    projectUpdates: boolean;
    weeklyDigest: boolean;
    marketingEmails: boolean;
  };
}

// --- Analytics ---

export interface UserAnalyticsResponse {
  idea_validations_count: number;
  content_generated_count: number;
  launch_plans_count: number;
  plan_tier: PlanTier;
  feature_usage: { feature_name: string; count: number }[];
  monthly_usage: { month: string; count: number }[];
}

// --- AI Chat ---

export interface ChatPayload {
  message: string;
  history?: { role: 'user' | 'ai'; content: string }[];
}

export interface ChatResponse {
  reply: string;
}
