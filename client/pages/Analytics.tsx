'use client';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, FileText, Rocket, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { UserAnalyticsResponse } from '../../lib/types';

const FEATURE_LABELS: Record<string, string> = {
  validate_idea: 'Idea Validator',
  generate_landing_page: 'Landing Page',
  generate_features: 'Feature Builder',
  generate_launch_plan: 'Launch Plan',
  generate_marketing_content: 'Marketing',
  generate_affiliate_strategy: 'Affiliate',
};

const Skeleton = () => <div className="animate-pulse bg-muted rounded-lg h-8 w-24" />;

export default function Analytics() {
  const [analytics, setAnalytics] = useState<UserAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/analytics')
      .then(r => r.json())
      .then(data => { setAnalytics(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const metricCards = [
    {
      label: 'Ideas Validated',
      value: analytics?.idea_validations_count ?? 0,
      icon: <Lightbulb className="w-5 h-5 text-accent" />,
    },
    {
      label: 'Content Generated',
      value: analytics?.content_generated_count ?? 0,
      icon: <FileText className="w-5 h-5 text-blue-500" />,
    },
    {
      label: 'Launch Plans',
      value: analytics?.launch_plans_count ?? 0,
      icon: <Rocket className="w-5 h-5 text-green-500" />,
    },
    {
      label: 'Plan',
      value: analytics?.plan_tier
        ? analytics.plan_tier.charAt(0).toUpperCase() + analytics.plan_tier.slice(1)
        : '—',
      icon: <CreditCard className="w-5 h-5 text-yellow-500" />,
    },
  ];

  return (
    <DashboardLayout currentPage="analytics">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Analytics</h1>
            <p className="text-sm md:text-base text-muted-foreground">Your AI usage stats and feature activity.</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {metricCards.map(metric => (
              <Card key={metric.label}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </CardTitle>
                    {metric.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? <Skeleton /> : (
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* AI Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle>AI Usage — Last 6 Months</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg animate-pulse" />
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={analytics?.monthly_usage ?? []}
                      margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                    >
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="AI calls" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Feature Usage Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement by Feature</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse h-8 bg-muted rounded-lg" />
                    ))}
                  </div>
                ) : analytics?.feature_usage?.length ? (
                  <div className="space-y-4">
                    {analytics.feature_usage.slice(0, 6).map(f => {
                      const max = analytics.feature_usage[0].count;
                      return (
                        <div key={f.feature_name}>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium text-foreground">
                              {FEATURE_LABELS[f.feature_name] ?? f.feature_name}
                            </p>
                            <p className="text-sm text-muted-foreground">{f.count} calls</p>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-accent rounded-full h-2 transition-all"
                              style={{ width: `${(f.count / max) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">No feature usage yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Most Used Features */}
          <Card>
            <CardHeader>
              <CardTitle>Most Used Features</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse h-8 bg-muted rounded-lg" />
                  ))}
                </div>
              ) : analytics?.feature_usage?.length ? (
                <div className="space-y-4">
                  {analytics.feature_usage.map(f => {
                    const max = analytics.feature_usage[0].count;
                    return (
                      <div key={f.feature_name}>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-foreground">
                            {FEATURE_LABELS[f.feature_name] ?? f.feature_name}
                          </p>
                          <p className="text-sm text-muted-foreground">{f.count} calls</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-accent rounded-full h-2 transition-all"
                            style={{ width: `${(f.count / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No AI features used yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
