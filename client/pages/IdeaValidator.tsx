'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import type { IdeaValidationResult } from '../../lib/types';

export default function IdeaValidator() {
  const [formData, setFormData] = useState({
    ideaTitle: '',
    problem: '',
    solution: '',
    targetMarket: '',
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<IdeaValidationResult | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError('');
    try {
      const res = await fetch('/api/ai/validate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'limit_reached') {
          setError(`${data.message} (${data.remaining}/${data.limit} used this month)`);
        } else {
          setError(data.message || 'Failed to validate idea');
        }
        return;
      }
      setAnalysis(data);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <DashboardLayout currentPage="idea-validator">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Idea Validator</h1>
            <p className="text-muted-foreground">
              Get AI-powered feedback on your business idea and pitch deck.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Input Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Your Idea</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Idea Title *
                  </label>
                  <Input
                    name="ideaTitle"
                    placeholder="e.g., AI-powered productivity tool for remote teams"
                    value={formData.ideaTitle}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    The Problem You're Solving *
                  </label>
                  <Textarea
                    name="problem"
                    placeholder="Describe the problem your idea solves..."
                    rows={3}
                    value={formData.problem}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Solution *
                  </label>
                  <Textarea
                    name="solution"
                    placeholder="How does your idea solve the problem?"
                    rows={3}
                    value={formData.solution}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Target Market
                  </label>
                  <Input
                    name="targetMarket"
                    placeholder="Who is your ideal customer?"
                    value={formData.targetMarket}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={!formData.ideaTitle || !formData.problem || !formData.solution || analyzing}
                  className="w-full bg-accent hover:bg-accent/90"
                  size="lg"
                >
                  {analyzing ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-accent-foreground border-t-transparent animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Validate Idea
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <div className="space-y-6">
              {analysis && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Validation Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-5xl font-bold text-accent mb-2">{analysis.validation_score}</div>
                        <p className="text-sm text-muted-foreground">out of 100</p>
                        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="bg-accent h-full transition-all"
                            style={{ width: `${analysis.validation_score}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Market Size</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground">{analysis.market_size}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Strengths & Risks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysis.top_3_opportunities.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{item}</p>
                        </div>
                      ))}
                      {analysis.top_3_risks.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{item}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground">{analysis.recommendation}</p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
