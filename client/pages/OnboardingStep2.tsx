'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';

export default function OnboardingStep2() {
  const [formData, setFormData] = useState({
    startup_name: '',
    problem_statement: '',
    target_audience: '',
    solution: '',
    business_model: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to save profile');
      }
      window.location.href = '/onboarding/step-3';
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl">
        <div className="p-8">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(n => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full ${n <= 2 ? 'bg-accent' : 'bg-muted'}`}
              />
            ))}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Tell us about your startup</h1>
          <p className="text-muted-foreground mb-8">
            This helps our AI personalize your experience and generate better insights.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Startup / Project Name *
              </label>
              <Input
                name="startup_name"
                placeholder="e.g., BuildFast"
                value={formData.startup_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Problem You're Solving *
              </label>
              <Textarea
                name="problem_statement"
                placeholder="What pain point does your product address?"
                rows={3}
                value={formData.problem_statement}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Target Audience *
              </label>
              <Input
                name="target_audience"
                placeholder="e.g., Solo founders, small dev teams"
                value={formData.target_audience}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Your Solution *
              </label>
              <Textarea
                name="solution"
                placeholder="How does your product solve the problem?"
                rows={3}
                value={formData.solution}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Business Model
              </label>
              <Input
                name="business_model"
                placeholder="e.g., SaaS subscription, freemium, marketplace"
                value={formData.business_model}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={
                saving ||
                !formData.startup_name ||
                !formData.problem_statement ||
                !formData.target_audience ||
                !formData.solution
              }
              className="w-full bg-accent hover:bg-accent/90 gap-2"
              size="lg"
            >
              {saving ? 'Saving...' : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
