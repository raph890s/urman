import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function OnboardingStep2() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Store data and proceed to next step
    window.location.href = '/onboarding/step-3';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Step 2 of 3</p>
            <h1 className="text-2xl font-bold text-foreground">Profile Setup</h1>
            <p className="text-sm text-muted-foreground mt-2">Tell us about yourself</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-1.5 mb-8">
            <div className="bg-accent rounded-full h-1.5" style={{ width: '66%' }} />
          </div>

          {/* Form */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name
              </label>
              <Input
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Company Name
              </label>
              <Input
                name="companyName"
                placeholder="Your Company"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="">Select your role</option>
                <option value="founder">Founder</option>
                <option value="manager">Product Manager</option>
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a href="/onboarding/step-1" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </a>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-accent hover:bg-accent/90 gap-2"
              disabled={!formData.fullName || !formData.email}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
