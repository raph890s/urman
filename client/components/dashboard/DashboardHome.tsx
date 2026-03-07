import React from 'react';
import { Plus, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export default function DashboardHome() {
  const stats: StatCard[] = [
    {
      label: 'Total Projects',
      value: 24,
      icon: <TrendingUp className="w-6 h-6 text-accent" />,
      trend: '+3 from last month',
      trendUp: true,
    },
    {
      label: 'Ended Projects',
      value: 10,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      label: 'Running Projects',
      value: 12,
      icon: <Clock className="w-6 h-6 text-blue-500" />,
    },
    {
      label: 'Pending Projects',
      value: 2,
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Plan, prioritize, and accomplish your tasks with ease.</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map(stat => (
            <Card key={stat.label}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    {stat.trend && (
                      <p className={`text-xs ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trend}
                      </p>
                    )}
                  </div>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Analytics Chart Placeholder</p>
                    <p className="text-sm text-muted-foreground">Chart would be rendered here using a charting library</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Collaboration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Alexandra Deft', role: 'GitHub Project Repository', status: 'Completed' },
                    { name: 'Edwin Adeleke', role: 'Integrate User Authentication System', status: 'In Progress' },
                    { name: 'Isaac Okunrinbodunn', role: 'Develop Search and Filter Functionality', status: 'Pending' },
                  ].map((member, idx) => (
                    <div key={idx} className="flex items-start justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium text-sm text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                        member.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        member.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Tasks */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg">Current Tasks</CardTitle>
                <span className="text-sm text-muted-foreground">Done 30%</span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Product Review for UI Market', status: 'In progress', time: '4h' },
                    { title: 'UX Research for Product', status: 'On hold', time: '8h' },
                    { title: 'App design and development', status: 'Done', time: '32h' },
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4" defaultChecked={task.status === 'Done'} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.status}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{task.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm font-medium text-foreground mb-1">Meeting with Arc Company</p>
                    <p className="text-xs text-muted-foreground">12:00 pm - 04:00 pm</p>
                  </div>
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No more reminders today</p>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Add Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-accent mb-2">41%</p>
                    <p className="text-sm text-muted-foreground">Overall completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-mono font-bold text-foreground mb-4">01:24:08</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">⏸</Button>
                    <Button size="sm" variant="outline">⏹</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
