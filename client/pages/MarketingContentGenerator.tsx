'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Copy, Download } from 'lucide-react';
import type { MarketingContentResult } from '../../lib/types';

export default function MarketingContentGenerator() {
  const [contentType, setContentType] = useState('social');
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    length: 'medium',
  });
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<MarketingContentResult | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/ai/generate-marketing-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, contentType }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to generate content');
        return;
      }
      setResult(data);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const getDisplayContent = (): string[] => {
    if (!result) return [];
    switch (contentType) {
      case 'social': return [...(result.twitter_posts || []), ...(result.linkedin_posts || [])];
      case 'email': return result.email_subject_lines || [];
      case 'blog': return result.blog_post_titles || [];
      default: return [...(result.twitter_posts || [])];
    }
  };

  const displayContent = getDisplayContent();

  return (
    <DashboardLayout currentPage="marketing-gen">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Marketing Content Generator</h1>
            <p className="text-muted-foreground">
              Generate engaging marketing content for any channel powered by AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left: Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Content Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Tabs */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Content Type
                  </label>
                  <Tabs value={contentType} onValueChange={setContentType}>
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="social">Social Media</TabsTrigger>
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="blog">Blog Post</TabsTrigger>
                      <TabsTrigger value="ad">Ad Copy</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Topic or Product *
                  </label>
                  <Textarea
                    name="topic"
                    placeholder="Describe the topic or product you want content about..."
                    rows={4}
                    value={formData.topic}
                    onChange={e => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  />
                </div>

                {/* Tone and Length */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tone</label>
                    <select
                      name="tone"
                      value={formData.tone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="humorous">Humorous</option>
                      <option value="inspirational">Inspirational</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Length</label>
                    <select
                      name="length"
                      value={formData.length}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                    >
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
                )}

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!formData.topic || generating}
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
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Right: Generated Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generated Content</CardTitle>
              </CardHeader>
              <CardContent>
                {displayContent.length > 0 ? (
                  <div className="space-y-4">
                    {displayContent.map((item, idx) => (
                      <div key={idx} className="p-3 bg-muted/50 rounded-lg text-sm text-foreground">
                        {item}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-6 text-xs"
                          onClick={() => navigator.clipboard.writeText(item)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-center text-muted-foreground">
                    <div>
                      <p className="text-sm">Configure your content and click generate</p>
                      <p className="text-xs mt-1">Your generated content will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Previous Generations */}
          {result && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>All Generated Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.twitter_posts?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Twitter / X Posts</p>
                    {result.twitter_posts.map((p, i) => (
                      <p key={i} className="text-sm text-foreground border-b pb-2 mb-2">{p}</p>
                    ))}
                  </div>
                )}
                {result.linkedin_posts?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">LinkedIn Posts</p>
                    {result.linkedin_posts.map((p, i) => (
                      <p key={i} className="text-sm text-foreground border-b pb-2 mb-2">{p}</p>
                    ))}
                  </div>
                )}
                {result.email_subject_lines?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Email Subject Lines</p>
                    {result.email_subject_lines.map((p, i) => (
                      <p key={i} className="text-sm text-foreground border-b pb-2 mb-2">{p}</p>
                    ))}
                  </div>
                )}
                {result.blog_post_titles?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Blog Post Titles</p>
                    {result.blog_post_titles.map((p, i) => (
                      <p key={i} className="text-sm text-foreground border-b pb-2 mb-2">{p}</p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
