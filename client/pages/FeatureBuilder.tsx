'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Zap, GripVertical } from 'lucide-react';
import type { FeatureSuggestion } from '../../lib/types';

interface Feature {
  id: number;
  name: string;
  description: string;
  priority: string;
}

export default function FeatureBuilder() {
  const [features, setFeatures] = useState<Feature[]>([
    { id: 1, name: 'User Authentication', description: 'Secure login system', priority: 'high' },
    { id: 2, name: 'Dashboard Analytics', description: 'Real-time data visualization', priority: 'medium' },
    { id: 3, name: 'Export to PDF', description: 'Generate PDF reports', priority: 'medium' },
  ]);

  const [newFeature, setNewFeature] = useState({ name: '', description: '', priority: 'medium' });
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const addFeature = () => {
    if (newFeature.name.trim()) {
      setFeatures([...features, { id: Date.now(), ...newFeature }]);
      setNewFeature({ name: '', description: '', priority: 'medium' });
    }
  };

  const removeFeature = (id: number) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const handleAISuggest = async () => {
    setGenerating(true);
    setError('');
    try {
      const context = features.map(f => `${f.name}: ${f.description}`).join('\n');
      const res = await fetch('/api/ai/generate-features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, existingFeatures: features.map(f => f.name) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to generate feature suggestions');
        return;
      }
      const suggestions: FeatureSuggestion[] = Array.isArray(data) ? data : data.features || [];
      const newOnes: Feature[] = suggestions.map((s: FeatureSuggestion, i: number) => ({
        id: Date.now() + i,
        name: s.name,
        description: s.description,
        priority: s.priority || 'medium',
      }));
      setFeatures(prev => [...prev, ...newOnes]);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout currentPage="feature-builder">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Feature Builder</h1>
            <p className="text-muted-foreground">
              Plan and organize your product features with priorities and dependencies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Feature List */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Features</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAISuggest}
                  disabled={generating}
                  className="gap-2"
                >
                  <Zap className="w-4 h-4" />
                  {generating ? 'Generating...' : 'AI Suggest'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
                )}
                {features.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    No features added yet. Start by creating your first feature.
                  </p>
                ) : (
                  features.map(feature => (
                    <div
                      key={feature.id}
                      className="p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{feature.name}</p>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            feature.priority === 'high' ? 'bg-red-100 text-red-700' :
                            feature.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {feature.priority}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(feature.id)}
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Add Feature Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Feature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Feature Name *
                  </label>
                  <Input
                    placeholder="e.g., User Profiles"
                    value={newFeature.name}
                    onChange={e => setNewFeature({ ...newFeature, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Description
                  </label>
                  <Textarea
                    placeholder="What does this feature do?"
                    rows={3}
                    value={newFeature.description}
                    onChange={e => setNewFeature({ ...newFeature, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Priority
                  </label>
                  <select
                    value={newFeature.priority}
                    onChange={e => setNewFeature({ ...newFeature, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <Button
                  onClick={addFeature}
                  className="w-full bg-accent hover:bg-accent/90 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Feature Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            {[
              { label: 'High Priority', value: features.filter(f => f.priority === 'high').length },
              { label: 'Medium Priority', value: features.filter(f => f.priority === 'medium').length },
              { label: 'Low Priority', value: features.filter(f => f.priority === 'low').length },
            ].map(stat => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
