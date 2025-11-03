import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProjectStore, teamMembers, TeamMember } from '@/stores/projectStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { XIcon } from 'lucide-react';

export function CreateProjectModal() {
  const isOpen = useProjectStore((state) => state.isCreateModalOpen);
  const setOpen = useProjectStore((state) => state.setCreateModalOpen);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const isEditMode = useProjectStore((state) => state.isEditMode);
  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    status: 'planning' as 'planning' | 'active' | 'completed' | 'on-hold',
    progress: 0,
  });

  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    if (isEditMode && selectedProject) {
      setFormData({
        name: selectedProject.name,
        description: selectedProject.description,
        deadline: new Date(selectedProject.deadline).toISOString().split('T')[0],
        status: selectedProject.status,
        progress: selectedProject.progress,
      });
      setSelectedMembers(selectedProject.assignedMembers);
    } else {
      setFormData({
        name: '',
        description: '',
        deadline: '',
        status: 'planning',
        progress: 0,
      });
      setSelectedMembers([]);
    }
  }, [isEditMode, selectedProject, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedProject) {
      updateProject(selectedProject.id, {
        ...formData,
        deadline: new Date(formData.deadline),
        assignedMembers: selectedMembers,
      });
    } else {
      addProject({
        ...formData,
        deadline: new Date(formData.deadline),
        assignedMembers: selectedMembers,
        progress: 0,
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
    setFormData({
      name: '',
      description: '',
      deadline: '',
      status: 'planning',
      progress: 0,
    });
    setSelectedMembers([]);
  };

  const toggleMember = (member: TeamMember) => {
    setSelectedMembers((prev) =>
      prev.find((m) => m.id === member.id)
        ? prev.filter((m) => m.id !== member.id)
        : [...prev, member]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-popover text-popover-foreground">
        <DialogHeader>
          <DialogTitle className="text-h2 font-sans text-foreground">
            {isEditMode ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEditMode ? 'Update project details below.' : 'Fill in the details to create a new project.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Project Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-background text-foreground border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="bg-background text-foreground border-border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-foreground">
                Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="bg-background text-foreground border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="planning" className="text-foreground">Planning</SelectItem>
                  <SelectItem value="active" className="text-foreground">Active</SelectItem>
                  <SelectItem value="on-hold" className="text-foreground">On Hold</SelectItem>
                  <SelectItem value="completed" className="text-foreground">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="progress" className="text-foreground">
                Progress: {formData.progress}%
              </Label>
              <Input
                id="progress"
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                className="bg-background"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-foreground">Assign Team Members</Label>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((member) => {
                const isSelected = selectedMembers.find((m) => m.id === member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className={isSelected ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-small font-sans-alt">{member.name}</span>
                    {isSelected && <XIcon className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isEditMode ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
