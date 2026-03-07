import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, Zap, Target } from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('month');

  const metrics = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, positive: true },
    { label: 'Projects Created', value: '342', change: '+8%', icon: Zap, positive: true },
    { label: 'Avg. Engagement', value: '67%', change: '-3%', icon: Target, positive: false },
    { label: 'Growth Rate', value: '24%', change: '+5%', icon: TrendingUp, positive: true },
  ];

  return (
    <DashboardLayout currentPage="analytics">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Analytics</h1>
              <p className="text-sm md:text-base text-muted-foreground">Track your product performance and user metrics.</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last 90 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {metrics.map(metric => {
              const Icon = metric.icon;
              return (
                <Card key={metric.label}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {metric.label}
                      </CardTitle>
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
                    <p className={`text-xs font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2 bg-muted/50 rounded-lg p-4">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => (
                    <div key={month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-accent rounded-t-lg transition-all"
                        style={{ height: `${Math.random() * 100 + 50}px` }}
                      />
                      <span className="text-xs text-muted-foreground mt-2">{month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement by Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="45" fill="#f2f1ec" stroke="#b85c44" strokeWidth="25" />
                      <circle cx="50" cy="50" r="45" fill="#b85c44" stroke="#8b4513" strokeWidth="25"
                        strokeDasharray="70.7 141.4" strokeDashoffset="0" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Dashboard</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Generators</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Analytics</span>
                    <span className="font-medium">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Content */}
          <Card>
            <CardHeader>
              <CardTitle>Most Used Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Landing Page Generator', users: '234', percentage: 78 },
                  { name: 'Marketing Content', users: '189', percentage: 63 },
                  { name: 'Idea Validator', users: '156', percentage: 52 },
                  { name: 'Analytics Dashboard', users: '123', percentage: 41 },
                ].map(feature => (
                  <div key={feature.name}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-foreground">{feature.name}</p>
                      <p className="text-sm text-muted-foreground">{feature.users} users</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2 transition-all"
                        style={{ width: `${feature.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
