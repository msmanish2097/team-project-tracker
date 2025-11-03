import { SearchIcon, BellIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span>🏠</span>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span>◫</span>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span>💬</span>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span>📋</span>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span>👤</span>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span>→</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <span>🌐</span>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <span>⏱️</span>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <span>➕</span>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <span>📄</span>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <span>⏰</span>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 relative">
            <BellIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
