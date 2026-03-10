'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Lightbulb, FileText, Rocket, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { UserAnalyticsResponse } from '../../../lib/types';

const FEATURE_LABELS: Record<string, string> = {
  validate_idea: 'Idea Validator',
  generate_landing_page: 'Landing Page',
  generate_features: 'Feature Builder',
  generate_launch_plan: 'Launch Plan',
  generate_marketing_content: 'Marketing',
  generate_affiliate_strategy: 'Affiliate',
};

export default function DashboardHome() {
  const [analytics, setAnalytics] = useState<UserAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/analytics')
      .then(r => r.json())
      .then(data => { setAnalytics(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: 'Ideas Validated',
      value: analytics?.idea_validations_count ?? 0,
      icon: <Lightbulb className="w-6 h-6 text-accent" />,
      href: '/dashboard/idea-validator',
    },
    {
      label: 'Content Generated',
      value: analytics?.content_generated_count ?? 0,
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      href: '/dashboard/landing-page-gen',
    },
    {
      label: 'Launch Plans',
      value: analytics?.launch_plans_count ?? 0,
      icon: <Rocket className="w-6 h-6 text-green-500" />,
      href: '/dashboard/growth-advisor',
    },
    {
      label: 'Plan',
      value: analytics?.plan_tier ? analytics.plan_tier.charAt(0).toUpperCase() + analytics.plan_tier.slice(1) : '—',
      icon: <CreditCard className="w-6 h-6 text-yellow-500" />,
      href: '/dashboard/billing',
    },
  ];

  const Skeleton = () => (
    <div className="animate-pulse bg-muted rounded-lg h-8 w-20" />
  );

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Your startup command centre.</p>
          </div>
          <a href="/dashboard/idea-validator">
            <Button className="bg-accent hover:bg-accent/90 gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              New Idea
            </Button>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statCards.map(stat => (
            <a key={stat.label} href={stat.href}>
              <Card className="hover:border-accent/40 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      {loading ? <Skeleton /> : (
                        <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                      )}
                    </div>
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
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
                    <BarChart data={analytics?.monthly_usage ?? []} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
                <CardTitle className="text-lg">Feature Usage</CardTitle>
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
                    {analytics.feature_usage.slice(0, 5).map(f => {
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
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No AI features used yet. Try the{' '}
                    <a href="/dashboard/idea-validator" className="text-accent underline">Idea Validator</a>!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Validate an Idea', href: '/dashboard/idea-validator' },
                  { label: 'Generate Landing Page', href: '/dashboard/landing-page-gen' },
                  { label: 'Generate Marketing Copy', href: '/dashboard/marketing-gen' },
                  { label: 'Build Launch Plan', href: '/dashboard/growth-advisor' },
                ].map(action => (
                  <a key={action.label} href={action.href}>
                    <Button variant="outline" size="sm" className="w-full justify-start text-left">
                      {action.label}
                    </Button>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Plan Limits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse h-8 bg-muted rounded-lg" />
                ) : (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-accent mb-1 capitalize">
                      {analytics?.plan_tier ?? 'Free'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">Current plan</p>
                    {analytics?.plan_tier === 'free' && (
                      <a href="/dashboard/billing">
                        <Button size="sm" className="bg-accent hover:bg-accent/90 w-full">
                          Upgrade
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm font-medium text-foreground mb-1">Complete your launch plan</p>
                    <p className="text-xs text-muted-foreground">Growth Advisor → Create Action Plan</p>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Add Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
