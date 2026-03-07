import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Settings() {
  const [formData, setFormData] = useState({
    fullName: 'Total Michael',
    email: 'total@example.com',
    company: 'URMAN Inc.',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    projectUpdates: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <DashboardLayout currentPage="settings">
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences.</p>
          </div>

          <Tabs defaultValue="account" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <Button className="bg-accent hover:bg-accent/90">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive important account updates' },
                    { key: 'projectUpdates', label: 'Project Updates', desc: 'Get notified about project changes' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary of your activity' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional content and special offers' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-4 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={preferences[item.key as keyof typeof preferences]}
                        onCheckedChange={() => handlePreferenceChange(item.key)}
                      />
                    </div>
                  ))}

                  <Button className="bg-accent hover:bg-accent/90 mt-4">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-4">Password</h3>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Change Password
                    </Button>
                  </div>

                  <div className="py-4 border-t">
                    <h3 className="text-sm font-medium text-foreground mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account.
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="py-4 border-t">
                    <h3 className="text-sm font-medium text-foreground mb-4">Active Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage your active login sessions.
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto">
                      View Sessions
                    </Button>
                  </div>

                  <div className="py-4 border-t">
                    <h3 className="text-sm font-medium text-destructive mb-4">Danger Zone</h3>
                    <Button variant="destructive" className="w-full sm:w-auto">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
