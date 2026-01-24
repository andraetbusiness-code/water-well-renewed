import { motion } from 'framer-motion';
import { Settings, Save, Building, Users, Bell, Shield, Palette, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortalLayout } from '@/components/portal/PortalLayout';

export default function SettingsPage() {
  return (
    <PortalLayout title="Portal Settings">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">Portal Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your training portal settings
          </p>
        </motion.div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Organization
                </CardTitle>
                <CardDescription>Basic organization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input id="orgName" defaultValue="Select Source Water" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portalName">Portal Name</Label>
                    <Input id="portalName" defaultValue="Training Portal" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" type="email" defaultValue="support@selectsourcewater.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Branding
                </CardTitle>
                <CardDescription>Customize portal appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary border"></div>
                      <Input defaultValue="#0066CC" className="font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <Button variant="outline" className="w-full">Upload Logo</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </TabsContent>

          {/* Teams Settings */}
          <TabsContent value="teams" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Management
                </CardTitle>
                <CardDescription>Configure team structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {['Team Alpha', 'Team Beta', 'Team Gamma'].map((team) => (
                    <div key={team} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{team}</p>
                        <p className="text-sm text-muted-foreground">4 members</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  + Add Team
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Configure notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Assignment Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify reps when new assignments are available</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Submission Reminders</p>
                    <p className="text-sm text-muted-foreground">Remind reps of pending submissions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Manager Review Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify managers of new submissions to review</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Check-in Reminders</p>
                    <p className="text-sm text-muted-foreground">Remind reps to complete daily check-ins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Provider
                </CardTitle>
                <CardDescription>Configure email sending (post-MVP)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Email integration will be configured in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription>Security and access settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require Email Verification</p>
                    <p className="text-sm text-muted-foreground">New users must verify email before access</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Input type="number" defaultValue="24" className="w-20" />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <Settings className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Placeholder settings. Full configuration will be saved to the database.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
