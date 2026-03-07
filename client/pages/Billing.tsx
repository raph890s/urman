import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard } from 'lucide-react';

export default function Billing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$29' : '$290',
      description: 'Perfect for getting started',
      features: [
        'Up to 10 projects',
        '5 team members',
        'Basic generators',
        'Email support',
      ],
      current: false,
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? '$79' : '$790',
      description: 'Best for growing teams',
      features: [
        'Unlimited projects',
        '25 team members',
        'All generators',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
      ],
      current: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Dedicated support',
        'SSO',
        'Custom integrations',
        'SLA guarantee',
      ],
      current: false,
    },
  ];

  return (
    <DashboardLayout currentPage="billing">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Plans</h1>
            <p className="text-muted-foreground">Manage your subscription and billing information.</p>
          </div>

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
                    {plan.price !== 'Custom' && (
                      <p className="text-sm text-muted-foreground">{`per ${billingCycle === 'monthly' ? 'month' : 'year'}`}</p>
                    )}
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
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Upgrade Now
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
              <div className="space-y-3">
                {[
                  { date: 'Feb 1, 2025', amount: '$79.00', status: 'Paid' },
                  { date: 'Jan 1, 2025', amount: '$79.00', status: 'Paid' },
                  { date: 'Dec 1, 2024', amount: '$79.00', status: 'Paid' },
                ].map((invoice, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{invoice.date}</p>
                      <p className="text-xs text-muted-foreground">Invoice</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{invoice.amount}</p>
                      <p className={`text-xs font-medium ${invoice.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {invoice.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
