import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useProjectStore } from '@/stores/projectStore';
import { format } from 'date-fns';
import { ArrowLeftIcon, EditIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import { AvatarGroup } from '@/components/common/AvatarGroup';

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const projects = useProjectStore((state) => state.projects);
  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);
  const setCreateModalOpen = useProjectStore((state) => state.setCreateModalOpen);
  const setEditMode = useProjectStore((state) => state.setEditMode);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id && !selectedProject) {
      const project = projects.find((p) => p.id === id);
      if (project) {
        setSelectedProject(project);
      } else {
        navigate('/');
      }
    }
  }, [id, selectedProject, projects, setSelectedProject, navigate]);

  if (!selectedProject) {
    return null;
  }

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

  const handleEdit = () => {
    setEditMode(true);
    setCreateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-h1 font-sans text-foreground">
                    {selectedProject.name}
                  </CardTitle>
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                  </Badge>
                </div>
                <Button
                  onClick={handleEdit}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <EditIcon className="w-4 h-4 mr-2" />
                  EditIcon Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-body font-sans-alt font-normal text-muted-foreground mb-2">Description</h3>
                <p className="text-body text-foreground">{selectedProject.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-small text-muted-foreground">Deadline</p>
                    <p className="text-body font-normal text-foreground">
                      {format(new Date(selectedProject.deadline), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <UsersIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-small text-muted-foreground">Team Members</p>
                    <div className="mt-1">
                      <AvatarGroup members={selectedProject.assignedMembers} max={5} />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-body font-sans-alt font-normal text-muted-foreground">Progress</h3>
                  <span className="text-body font-normal text-foreground">{selectedProject.progress}%</span>
                </div>
                <Progress value={selectedProject.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-h2 font-sans text-foreground">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedProject.assignedMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-sans-alt font-normal">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-body font-normal text-foreground">{member.name}</p>
                      <p className="text-small text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-96">
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-h2 font-sans text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedProject.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-small flex-shrink-0">
                      {activity.user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-body text-foreground">{activity.message}</p>
                      <p className="text-small text-muted-foreground mt-1">
                        {format(new Date(activity.timestamp), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
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
