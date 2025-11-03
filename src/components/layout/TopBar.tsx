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
    <header className="sticky top-0 z-30 bg-card border-b border-border px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="SearchIcon projects..."
              className="pl-10 bg-background text-foreground border-border"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Notifications"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-tertiary rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                </Avatar>
                <span className="font-sans-alt font-normal">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground">
              <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <UserIcon className="mr-2 w-4 h-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
