import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Copy, Download } from 'lucide-react';

export default function MarketingContentGenerator() {
  const [contentType, setContentType] = useState('social');
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    length: 'medium',
  });
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      setGeneratedContent(
        'This is sample generated content. In a production environment, this would be AI-generated marketing copy tailored to your specifications.'
      );
      setGenerating(false);
    }, 1500);
  };

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
                    onChange={handleChange}
                  />
                </div>

                {/* Tone and Length */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tone
                    </label>
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
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Length
                    </label>
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
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg min-h-48 text-sm text-foreground whitespace-pre-wrap">
                      {generatedContent}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => navigator.clipboard.writeText(generatedContent)}
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
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
          {generatedContent && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Previous Generations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your previous content generations will be listed here for easy access and editing.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
