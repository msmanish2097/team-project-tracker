import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function Settings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-h1 font-sans text-foreground">Settings</h1>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-h2 font-sans text-foreground">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Full Name</Label>
            <Input id="name" defaultValue="John Doe" className="bg-background text-foreground border-border" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" className="bg-background text-foreground border-border" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-foreground">Role</Label>
            <Input id="role" defaultValue="Project Manager" className="bg-background text-foreground border-border" />
          </div>

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-h2 font-sans text-foreground">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body font-normal text-foreground">Email Notifications</p>
              <p className="text-small text-muted-foreground">Receive email updates about project changes</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-body font-normal text-foreground">Deadline Reminders</p>
              <p className="text-small text-muted-foreground">Get notified about upcoming deadlines</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-body font-normal text-foreground">Team Updates</p>
              <p className="text-small text-muted-foreground">Receive updates when team members make changes</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
