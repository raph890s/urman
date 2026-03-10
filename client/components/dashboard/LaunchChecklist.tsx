'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle, Circle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { LaunchPlanResult } from '../../../lib/types';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function LaunchChecklist() {
  const [expanded, setExpanded] = useState(true);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);

  const fetchPlan = async () => {
    try {
      const res = await fetch('/api/ai/launch-plan');
      const data = await res.json();
      if (res.ok && data.plan) {
        setHasPlan(true);
        const plan = data.plan as LaunchPlanResult;
        setItems(
          (plan.launch_checklist ?? []).map((item: string, i: number) => ({
            id: String(i + 1),
            title: item,
            description: '',
            completed: false,
          }))
        );
      } else {
        setHasPlan(false);
        setItems([]);
      }
    } catch {
      setHasPlan(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlan(); }, []);

  const generatePlan = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-launch-plan', { method: 'POST' });
      if (res.ok) {
        await fetchPlan();
      }
    } catch {
      // ignore
    } finally {
      setGenerating(false);
    }
  };

  const completedCount = items.filter(item => item.completed).length;
  const progress = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">Launch Checklist</CardTitle>
            {!loading && hasPlan && (
              <span className="text-sm text-muted-foreground">
                {completedCount} of {items.length} completed
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </CardHeader>

      {expanded && (
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : !hasPlan ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                No launch plan yet. Generate one to get a personalised checklist.
              </p>
              <Button
                onClick={generatePlan}
                disabled={generating}
                className="bg-accent hover:bg-accent/90"
              >
                {generating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Generate Launch Plan
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold text-accent">{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-3 mt-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex-shrink-0 mt-1"
                    >
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`font-medium text-sm ${
                          item.completed
                            ? 'line-through text-muted-foreground'
                            : 'text-foreground'
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action button */}
              <Button variant="outline" className="w-full mt-4">
                View Full Checklist
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
