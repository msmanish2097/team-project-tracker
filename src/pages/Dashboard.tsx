import { Button } from '@/components/ui/button';
import { PlusIcon, FilterIcon, MoreHorizontalIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useProjectStore } from '@/stores/projectStore';
import { format } from 'date-fns';

export function Dashboard() {
  const projects = useProjectStore((state) => state.projects);
  const setCreateModalOpen = useProjectStore((state) => state.setCreateModalOpen);

  const activeProjects = projects.filter((p) => p.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-h2">🏠</span>
          </div>
          <div>
            <h1 className="text-h1 font-sans text-foreground">Howdy!</h1>
            <p className="text-small text-muted-foreground">Don't be afraid to talk, be afraid of staying quiet.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-background text-foreground border-border">
            <span className="mr-2">🎨</span>
            Customize
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <span className="mr-2">⚙️</span>
            Manage System
          </Button>
          <Button onClick={() => setCreateModalOpen(true)} className="bg-success text-success-foreground hover:bg-success/90">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-h2 font-sans text-foreground">Work</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <span className="mr-2">🔄</span>
                Full Recap
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <PlusIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <FilterIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Active Projects List */}
          <div className="space-y-3">
            {activeProjects.map((project) => (
              <Card key={project.id} className="bg-card border-border hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded border-border" />
                      <div className="w-2 h-2 rounded-full bg-warning"></div>
                      <span className="text-body text-foreground">{project.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs">
                        {Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}d
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What are you working on Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-border">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-h2 font-sans text-foreground mb-2">What are you working on?</h3>
                  <p className="text-body text-muted-foreground mb-6">Try to have at least 1 item in progress</p>
                  <div className="flex items-center gap-3">
                    <Button className="bg-success text-success-foreground hover:bg-success/90">
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Add new task
                    </Button>
                    <Button variant="outline" className="bg-background text-primary border-primary">
                      Start Existing
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-48 h-48 relative">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Illustration placeholder */}
                      <circle cx="100" cy="80" r="30" fill="#6366f1" />
                      <rect x="70" y="110" width="60" height="80" rx="30" fill="#6366f1" />
                      <circle cx="85" cy="70" r="8" fill="#fbbf24" />
                      <path d="M 120 60 Q 140 50 150 70" stroke="#6366f1" strokeWidth="4" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agenda Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-h2 font-sans text-foreground">Agenda</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <FilterIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    ← Week
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Day
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-body font-sans text-foreground">{format(new Date(), 'MMMM')}</span>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Day
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Week →
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {['SUN 2', 'MON 3', 'TUE 4', 'WED 5', 'THU 6', 'FRI 7', 'SAT 8'].map((day, index) => (
                  <div
                    key={day}
                    className={`p-3 rounded-lg ${
                      index === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    <span className="text-small font-sans-alt">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
