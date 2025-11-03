import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjectStore } from '@/stores/projectStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export function Calendar() {
  const projects = useProjectStore((state) => state.projects);
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getProjectsForDay = (day: Date) => {
    return projects.filter((project) => isSameDay(new Date(project.deadline), day));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary text-secondary-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'planning':
        return 'bg-warning text-warning-foreground';
      case 'on-hold':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-h1 font-sans text-foreground">Project Calendar</h1>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-h2 font-sans text-foreground">
            {format(currentDate, 'MMMM yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-sans-alt font-normal text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {daysInMonth.map((day) => {
              const dayProjects = getProjectsForDay(day);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`aspect-square border border-border rounded-lg p-2 ${
                    isCurrentDay ? 'bg-primary/10 border-primary' : 'bg-background'
                  }`}
                >
                  <div className={`text-small font-sans-alt ${isCurrentDay ? 'text-primary font-normal' : 'text-foreground'}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayProjects.map((project) => (
                      <div
                        key={project.id}
                        className="text-xs truncate"
                        title={project.name}
                      >
                        <Badge className={`${getStatusColor(project.status)} text-xs py-0 px-1`}>
                          {project.name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-h2 font-sans text-foreground">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects
              .filter((p) => p.status !== 'completed')
              .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
              .slice(0, 5)
              .map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                  <div>
                    <p className="text-body font-normal text-foreground">{project.name}</p>
                    <p className="text-small text-muted-foreground">
                      {format(new Date(project.deadline), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
