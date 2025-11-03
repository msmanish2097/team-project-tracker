import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useProjectStore } from '@/stores/projectStore';

export function EmptyState() {
  const setCreateModalOpen = useProjectStore((state) => state.setCreateModalOpen);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <img
        src="https://c.animaapp.com/mhiucglevVHFl2/img/ai_1.png"
        alt="Empty state illustration"
        className="w-full max-w-md mb-8"
        loading="lazy"
      />
      <h2 className="text-h1 font-sans text-foreground mb-4">No Projects Yet</h2>
      <p className="text-body text-muted-foreground mb-8 max-w-md">
        Get started by creating your first project. Track progress, manage deadlines, and collaborate with your team.
      </p>
      <Button
        onClick={() => setCreateModalOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Create Your First Project
      </Button>
    </div>
  );
}
