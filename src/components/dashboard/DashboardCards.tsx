import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanbanIcon, CheckCircle2Icon, ClockIcon, AlertCircleIcon } from 'lucide-react';
import { useProjectStore } from '@/stores/projectStore';

export function DashboardCards() {
  const projects = useProjectStore((state) => state.projects);

  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const upcomingDeadlines = projects.filter(
    (p) => p.status !== 'completed' && new Date(p.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  const cards = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderKanbanIcon,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: ClockIcon,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Completed',
      value: completedProjects,
      icon: CheckCircle2Icon,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Upcoming Deadlines',
      value: upcomingDeadlines,
      icon: AlertCircleIcon,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="bg-card text-card-foreground border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-small font-sans-alt font-normal text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-h1 font-sans text-foreground">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
