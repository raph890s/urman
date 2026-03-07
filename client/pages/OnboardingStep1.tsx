import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function OnboardingStep1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <div className="p-8 text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-white mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Welcome to URMAN
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Let's set up your account and get you started on your path to productivity and success.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8 text-left">
            {[
              { icon: '🎯', label: 'Smart Planning', desc: 'Organize your ideas efficiently' },
              { icon: '⚡', label: 'AI Assistance', desc: 'Get intelligent suggestions' },
              { icon: '📊', label: 'Analytics', desc: 'Track your progress' },
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <p className="font-medium text-sm text-foreground">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="/onboarding/step-2">
            <Button className="w-full bg-accent hover:bg-accent/90 gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>

          {/* Skip link */}
          <a href="/dashboard" className="mt-4 inline-block">
            <Button variant="ghost" size="sm">
              Skip for now
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
