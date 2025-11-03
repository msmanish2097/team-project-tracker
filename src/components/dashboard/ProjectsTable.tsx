import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProjectStore } from '@/stores/projectStore';
import { format } from 'date-fns';
import { EyeIcon, EditIcon, Trash2Icon } from 'lucide-react';
import { AvatarGroup } from '@/components/common/AvatarGroup';

export function ProjectsTable() {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);
  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);
  const setCreateModalOpen = useProjectStore((state) => state.setCreateModalOpen);
  const setEditMode = useProjectStore((state) => state.setEditMode);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const [sortField, setSortField] = useState<'name' | 'deadline' | 'status'>('deadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedProjects = [...projects].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'deadline') {
      comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else if (sortField === 'status') {
      comparison = a.status.localeCompare(b.status);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: 'name' | 'deadline' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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

  const handleView = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      navigate(`/projects/${projectId}`);
    }
  };

  const handleEdit = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setEditMode(true);
      setCreateModalOpen(true);
    }
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="text-h2 font-sans text-foreground">Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th
                  className="text-left py-4 px-4 font-sans-alt font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('name')}
                >
                  Project Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="text-left py-4 px-4 font-sans-alt font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('status')}
                >
                  Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="text-left py-4 px-4 font-sans-alt font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('deadline')}
                >
                  Deadline {sortField === 'deadline' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-left py-4 px-4 font-sans-alt font-normal text-muted-foreground">Progress</th>
                <th className="text-left py-4 px-4 font-sans-alt font-normal text-muted-foreground">Team</th>
                <th className="text-left py-4 px-4 font-sans-alt font-normal text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-accent transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-sans-alt font-normal text-foreground">{project.name}</div>
                    <div className="text-small text-muted-foreground">{project.description}</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-foreground">{format(new Date(project.deadline), 'MMM dd, yyyy')}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-24" />
                      <span className="text-small text-foreground">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <AvatarGroup members={project.assignedMembers} max={3} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(project.id)}
                        className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                        aria-label="View project"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(project.id)}
                        className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                        aria-label="EditIcon project"
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                        className="bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Delete project"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
