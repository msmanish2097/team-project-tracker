import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { ProjectsTable } from '@/components/dashboard/ProjectsTable';
import { useProjectStore } from '@/stores/projectStore';
import { format } from 'date-fns';

export function Dashboard() {
  const setCreateModalOpen = useProjectStore((state) => state.setCreateModalOpen);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-sans text-foreground">Dashboard</h1>
          <p className="text-body text-muted-foreground mt-2">
            {format(new Date(), 'EEEE, MMMM dd, yyyy')}
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Project
        </Button>
      </div>

      <DashboardCards />

      <ProjectsTable />
    </div>
  );
}
