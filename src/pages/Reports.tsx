import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjectStore } from '@/stores/projectStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Reports() {
  const projects = useProjectStore((state) => state.projects);

  const statusData = [
    { name: 'Planning', value: projects.filter((p) => p.status === 'planning').length, color: 'hsl(33, 88%, 58%)' },
    { name: 'Active', value: projects.filter((p) => p.status === 'active').length, color: 'hsl(197, 85%, 55%)' },
    { name: 'Completed', value: projects.filter((p) => p.status === 'completed').length, color: 'hsl(142, 58%, 45%)' },
    { name: 'On Hold', value: projects.filter((p) => p.status === 'on-hold').length, color: 'hsl(210, 8%, 55%)' },
  ];

  const progressData = projects.map((project) => ({
    name: project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name,
    progress: project.progress,
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-h1 font-sans text-foreground">Project Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-h2 font-sans text-foreground">Projects by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(210, 15%, 90%)', color: 'hsl(210, 25%, 12%)' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-h2 font-sans text-foreground">Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
                <XAxis dataKey="name" stroke="hsl(210, 25%, 12%)" style={{ fontSize: '12px' }} />
                <YAxis stroke="hsl(210, 25%, 12%)" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(210, 15%, 90%)', color: 'hsl(210, 25%, 12%)' }} />
                <Bar dataKey="progress" fill="hsl(197, 85%, 43%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-h2 font-sans text-foreground">Project Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-primary/10">
              <p className="text-small text-muted-foreground">Total Projects</p>
              <p className="text-h1 font-sans text-foreground mt-2">{projects.length}</p>
            </div>
            <div className="p-6 rounded-lg bg-secondary/10">
              <p className="text-small text-muted-foreground">Average Progress</p>
              <p className="text-h1 font-sans text-foreground mt-2">
                {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
              </p>
            </div>
            <div className="p-6 rounded-lg bg-success/10">
              <p className="text-small text-muted-foreground">Completed</p>
              <p className="text-h1 font-sans text-foreground mt-2">
                {projects.filter((p) => p.status === 'completed').length}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-warning/10">
              <p className="text-small text-muted-foreground">In Progress</p>
              <p className="text-h1 font-sans text-foreground mt-2">
                {projects.filter((p) => p.status === 'active').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
