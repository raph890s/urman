import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, ArrowRight } from 'lucide-react';

export default function LandingPageGenerator() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    targetAudience: '',
    uniqueValue: '',
  });
  const [generating, setGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGenerating(false);
      // Could navigate to preview or show results
    }, 2000);
  };

  return (
    <DashboardLayout currentPage="landing-page-gen">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Landing Page Generator</h1>
            <p className="text-muted-foreground">
              Create a beautiful, high-converting landing page in seconds powered by AI.
            </p>
          </div>

          {/* Main Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">About Your Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name *
                </label>
                <Input
                  name="productName"
                  placeholder="e.g., AI Task Manager"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Description *
                </label>
                <Textarea
                  name="description"
                  placeholder="Describe what your product does and its key benefits..."
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Target Audience
                  </label>
                  <Input
                    name="targetAudience"
                    placeholder="e.g., Product managers, startups"
                    value={formData.targetAudience}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Unique Value Proposition
                  </label>
                  <Input
                    name="uniqueValue"
                    placeholder="What makes you different?"
                    value={formData.uniqueValue}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!formData.productName || !formData.description || generating}
                className="w-full bg-accent hover:bg-accent/90 gap-2"
                size="lg"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-accent-foreground border-t-transparent animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Landing Page
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Templates Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose a Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Minimal', desc: 'Clean and simple' },
                  { name: 'Modern', desc: 'Bold and contemporary' },
                  { name: 'Enterprise', desc: 'Professional and formal' },
                ].map((template, idx) => (
                  <button
                    key={idx}
                    className="p-4 border border-border rounded-lg hover:border-accent hover:bg-muted/50 transition-all text-left"
                  >
                    <p className="font-medium text-foreground">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
