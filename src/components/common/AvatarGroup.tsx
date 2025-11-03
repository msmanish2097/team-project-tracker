import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TeamMember } from '@/stores/projectStore';

interface AvatarGroupProps {
  members: TeamMember[];
  max?: number;
}

export function AvatarGroup({ members, max = 5 }: AvatarGroupProps) {
  const displayMembers = members.slice(0, max);
  const remainingCount = members.length - max;

  return (
    <div className="flex -space-x-2">
      {displayMembers.map((member) => (
        <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
          <AvatarFallback className="bg-primary text-primary-foreground text-small">
            {member.avatar}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="w-8 h-8 border-2 border-background">
          <AvatarFallback className="bg-muted text-muted-foreground text-small">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
