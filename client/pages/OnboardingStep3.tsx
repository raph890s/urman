import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function OnboardingStep3() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate setup completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <div className="p-8 text-center">
          {/* Icon Animation */}
          <div className="mb-6 flex justify-center">
            {loading ? (
              <div className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            )}
          </div>

          {/* Content */}
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {loading ? 'Setting up your account...' : 'You\'re all set!'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {loading
              ? 'We\'re preparing your dashboard and personalizing your experience.'
              : 'Your account is ready. Welcome to URMAN!'}
          </p>

          {!loading && (
            <>
              {/* Checklist */}
              <div className="space-y-3 mb-8 text-left bg-muted/50 rounded-lg p-4">
                {[
                  '✓ Account created',
                  '✓ Profile setup',
                  '✓ Dashboard initialized',
                  '✓ AI assistant enabled',
                ].map((item, idx) => (
                  <p key={idx} className="text-sm text-foreground">
                    {item}
                  </p>
                ))}
              </div>

              {/* CTA */}
              <a href="/dashboard">
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Go to Dashboard
                </Button>
              </a>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
