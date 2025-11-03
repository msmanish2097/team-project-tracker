import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { teamMembers } from '@/stores/projectStore';
import { MailIcon, UserIcon } from 'lucide-react';

export function Team() {
  return (
    <div className="space-y-8">
      <h1 className="text-h1 font-sans text-foreground">Team Members</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-h2 font-sans">
                  {member.avatar}
                </div>
                <div>
                  <CardTitle className="text-body font-sans-alt font-normal text-foreground">
                    {member.name}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MailIcon className="w-4 h-4" />
                <span className="text-small">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserIcon className="w-4 h-4" />
                <span className="text-small">Team Member</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
