import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function LaunchChecklist() {
  const [expanded, setExpanded] = useState(true);
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      title: 'Complete Project Setup',
      description: 'Configure your project settings and database',
      completed: true,
    },
    {
      id: '2',
      title: 'Design User Interface',
      description: 'Create wireframes and design mockups',
      completed: true,
    },
    {
      id: '3',
      title: 'Implement Core Features',
      description: 'Build main functionality',
      completed: false,
    },
    {
      id: '4',
      title: 'Testing & QA',
      description: 'Run comprehensive tests',
      completed: false,
    },
    {
      id: '5',
      title: 'Deploy to Production',
      description: 'Launch your application',
      completed: false,
    },
  ]);

  const completedCount = items.filter(item => item.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

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
            <span className="text-sm text-muted-foreground">
              {completedCount} of {items.length} completed
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </CardHeader>

      {expanded && (
        <CardContent>
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
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
        </CardContent>
      )}
    </Card>
  );
}
