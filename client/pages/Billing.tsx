'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard, ExternalLink } from 'lucide-react';

const PRICE_IDS = {
  Starter: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || '',
  Professional: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
  Agency: process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID || '',
};

export default function Billing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '€29' : '€290',
      description: 'Perfect for getting started',
      features: [
        '3 idea validations/month',
        '1 landing page/month',
        '3 feature suggestions/month',
        '1 launch plan/month',
        '2 marketing contents/month',
        'Email support',
      ],
      current: false,
      priceKey: 'Starter' as const,
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '€59' : '€590',
      description: 'Best for growing teams',
      features: [
        '10 idea validations/month',
        '5 landing pages/month',
        'Unlimited feature suggestions',
        '3 launch plans/month',
        '10 marketing contents/month',
        '2 affiliate strategies/month',
        'Full Growth Engine access',
        'Priority support',
      ],
      current: false,
      priceKey: 'Professional' as const,
    },
    {
      name: 'Agency',
      price: billingCycle === 'monthly' ? '€149' : '€1490',
      description: 'For agencies and power users',
      features: [
        'Everything unlimited',
        'Full access to all sections',
        'Priority support',
        'Dedicated onboarding',
      ],
      current: false,
      priceKey: 'Agency' as const,
    },
  ];

  const handleUpgrade = async (planName: string) => {
    const priceId = PRICE_IDS[planName as keyof typeof PRICE_IDS];
    if (!priceId) {
      setError('Price ID not configured. Set NEXT_PUBLIC_STRIPE_*_PRICE_ID env vars.');
      return;
    }
    setLoadingPlan(planName);
    setError('');
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to create checkout session');
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to open billing portal');
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <DashboardLayout currentPage="billing">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Plans</h1>
              <p className="text-muted-foreground">Manage your subscription and billing information.</p>
            </div>
            <Button
              variant="outline"
              onClick={handleManageBilling}
              disabled={portalLoading}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              {portalLoading ? 'Loading...' : 'Manage Billing'}
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>
          )}

          {/* Billing Cycle Toggle */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-4">
                <span className={billingCycle === 'monthly' ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative inline-flex h-8 w-16 items-center rounded-full bg-muted"
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      billingCycle === 'annual' ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={billingCycle === 'annual' ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                  Annual <span className="text-accent text-sm font-medium ml-1">Save 20%</span>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {plans.map(plan => (
              <Card
                key={plan.name}
                className={`relative ${plan.current ? 'ring-2 ring-accent shadow-lg' : ''}`}
              >
                {plan.current && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 rounded-bl-lg text-xs font-medium">
                    Current Plan
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-foreground">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">{`per ${billingCycle === 'monthly' ? 'month' : 'year'}`}</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.current ? (
                    <Button disabled className="w-full">
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={() => handleUpgrade(plan.priceKey)}
                      disabled={loadingPlan === plan.name}
                    >
                      {loadingPlan === plan.name ? 'Redirecting...' : 'Upgrade Now'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground py-4 text-center">
                Open the billing portal to view your full invoice history.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
