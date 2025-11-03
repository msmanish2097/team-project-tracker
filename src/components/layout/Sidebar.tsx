import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, FolderKanbanIcon, UsersIcon, CalendarIcon, BarChart3Icon, SettingsIcon, LogOutIcon, ChevronLeftIcon, UmbrellaIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboardIcon },
    { path: '/projects', label: 'Projects', icon: FolderKanbanIcon },
    { path: '/team', label: 'Team', icon: UsersIcon },
    { path: '/leave', label: 'Leave', icon: UmbrellaIcon },
    { path: '/calendar', label: 'Calendar', icon: CalendarIcon },
    { path: '/reports', label: 'Reports', icon: BarChart3Icon },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-8">
          {!isCollapsed && (
            <h1 className="text-h2 font-sans text-foreground">ProjectHub</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeftIcon className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 text-foreground hover:bg-accent hover:text-accent-foreground ${
                    active ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : 'bg-transparent'
                  } ${isCollapsed ? 'px-2' : 'px-4'}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-sans-alt font-normal">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        <div className="px-4 pb-8 space-y-2">
          <Link to="/settings">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground ${
                isCollapsed ? 'px-2' : 'px-4'
              }`}
            >
              <SettingsIcon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-sans-alt font-normal">SettingsIcon</span>}
            </Button>
          </Link>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground ${
              isCollapsed ? 'px-2' : 'px-4'
            }`}
          >
            <LogOutIcon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-sans-alt font-normal">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
