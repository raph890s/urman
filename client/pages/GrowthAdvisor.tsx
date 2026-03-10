'use client';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Users, MessageSquare, Lightbulb, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { AffiliateStrategyResult } from '../../lib/types';

export default function GrowthAdvisor() {
  const { toast } = useToast();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [planTier, setPlanTier] = useState<string>('free');
  const [loadingAffiliate, setLoadingAffiliate] = useState(false);
  const [affiliateData, setAffiliateData] = useState<AffiliateStrategyResult | null>(null);

  useEffect(() => {
    fetch('/api/user/analytics')
      .then(r => r.json())
      .then(data => { if (data.plan_tier) setPlanTier(data.plan_tier); })
      .catch(() => {});
  }, []);

  const growthAreas = [
    {
      id: 'user-acquisition',
      title: 'User Acquisition',
      icon: Users,
      description: 'Strategies to attract new users',
      recommendations: [
        'Implement referral program - potential 30% growth',
        'Launch SEO content strategy',
        'Partner with relevant communities',
        'Run targeted ad campaigns',
      ],
      metric: '+45% potential growth',
    },
    {
      id: 'engagement',
      title: 'User Engagement',
      icon: MessageSquare,
      description: 'Ways to keep users active',
      recommendations: [
        'Create onboarding tutorial - improves retention by 25%',
        'Implement gamification elements',
        'Build community features',
        'Launch weekly emails/notifications',
      ],
      metric: '+35% engagement lift',
    },
    {
      id: 'retention',
      title: 'Retention',
      icon: TrendingUp,
      description: 'Reduce churn and increase lifetime value',
      recommendations: [
        'Analyze churn patterns to identify at-risk users',
        'Create retention campaigns for inactive users',
        'Implement win-back sequences',
        'Build premium features for power users',
      ],
      metric: '+28% retention improvement',
    },
    {
      id: 'monetization',
      title: 'Monetization',
      icon: Target,
      description: 'Increase revenue per user',
      recommendations: [
        'Optimize pricing strategy - test price points',
        'Create premium tiers - potential 2x revenue',
        'Implement usage-based billing',
        'Add enterprise features',
      ],
      metric: '+120% revenue potential',
    },
  ];

  const selectedData = growthAreas.find(a => a.id === selectedArea);
  const Icon = selectedData ? selectedData.icon : Lightbulb;
  const canUseAffiliate = planTier === 'pro' || planTier === 'agency';

  const createActionPlan = async () => {
    setCreatingPlan(true);
    try {
      const res = await fetch('/api/ai/generate-launch-plan', { method: 'POST' });
      if (res.ok) {
        toast({
          title: 'Launch plan saved!',
          description: 'Check your Launch Checklist in the dashboard.',
        });
      } else {
        const data = await res.json();
        toast({
          title: 'Error',
          description: data.error ?? 'Failed to create action plan.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({ title: 'Error', description: 'Network error. Please try again.', variant: 'destructive' });
    } finally {
      setCreatingPlan(false);
    }
  };

  const generateAffiliateStrategy = async () => {
    setLoadingAffiliate(true);
    try {
      const res = await fetch('/api/ai/generate-affiliate-strategy', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setAffiliateData(data);
      } else {
        toast({
          title: 'Error',
          description: data.error ?? 'Failed to generate affiliate strategy.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({ title: 'Error', description: 'Network error. Please try again.', variant: 'destructive' });
    } finally {
      setLoadingAffiliate(false);
    }
  };

  return (
    <DashboardLayout currentPage="growth-advisor">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Growth Advisor</h1>
            <p className="text-muted-foreground">
              AI-powered recommendations to accelerate your product growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Growth Areas List */}
            <div className="space-y-4">
              {growthAreas.map(area => {
                const AreaIcon = area.icon;
                return (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedArea === area.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AreaIcon className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{area.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
                        <p className="text-xs font-bold text-accent mt-2">{area.metric}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Recommendations */}
            <div className="lg:col-span-2">
              {selectedData ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                      <div>
                        <CardTitle>{selectedData.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{selectedData.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Recommended Actions
                      </h3>
                      <div className="space-y-3">
                        {selectedData.recommendations.map((rec, idx) => (
                          <div key={idx} className="flex gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent text-accent-foreground font-bold text-sm">
                                {idx + 1}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm">{rec}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Estimated time to implement: 2-4 weeks
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Implementation Timeline
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-foreground">Quick Wins (1-2 weeks)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-yellow-500" />
                          <span className="text-foreground">Medium Term (1-3 months)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-purple-500" />
                          <span className="text-foreground">Strategic (3-6 months)</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={createActionPlan}
                      disabled={creatingPlan}
                    >
                      {creatingPlan && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Create Action Plan
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-12 pb-12">
                    <div className="text-center">
                      <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-foreground font-medium mb-2">
                        Select a growth area to see recommendations
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Choose from user acquisition, engagement, retention, or monetization
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Affiliate Strategy Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">Affiliate Strategy</CardTitle>
                  {!canUseAffiliate && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> Pro / Agency
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!canUseAffiliate ? (
                  <div className="text-center py-8">
                    <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-2">
                      Upgrade to Pro or Agency to unlock Affiliate Strategy
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Get AI-generated affiliate strategies, outreach templates, and platform recommendations.
                    </p>
                    <a href="/dashboard/billing">
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Upgrade Plan
                      </Button>
                    </a>
                  </div>
                ) : affiliateData ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">Strategy</h3>
                      <p className="text-sm text-muted-foreground">{affiliateData.strategy}</p>
                    </div>
                    {affiliateData.target_platforms?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-2">Target Platforms</h3>
                        <div className="flex flex-wrap gap-2">
                          {affiliateData.target_platforms.map((p, i) => (
                            <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {affiliateData.outreach_templates?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Outreach Templates</h3>
                        <div className="space-y-3">
                          {affiliateData.outreach_templates.map((t, i) => (
                            <div key={i} className="p-3 bg-muted/50 rounded-lg text-sm text-foreground">
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setAffiliateData(null)}
                      size="sm"
                    >
                      Regenerate
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground mb-4">
                      Generate an AI-powered affiliate strategy tailored to your startup.
                    </p>
                    <Button
                      className="bg-accent hover:bg-accent/90"
                      onClick={generateAffiliateStrategy}
                      disabled={loadingAffiliate}
                    >
                      {loadingAffiliate && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Generate Affiliate Strategy
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
