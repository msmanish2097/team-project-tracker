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
    { path: '/', label: 'Home', icon: LayoutDashboardIcon },
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
      className={`fixed left-0 top-0 h-screen bg-[#2d2d30] border-r border-[#3e3e42] transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-6">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-sans font-bold">P</span>
              </div>
              <h1 className="text-body font-sans font-semibold text-white">ProjectHub</h1>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-sans font-bold">P</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 rounded-lg ${
                    active 
                      ? 'bg-[#3e3e42] text-white' 
                      : 'bg-transparent text-[#cccccc] hover:bg-[#3e3e42] hover:text-white'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-sans-alt font-normal text-small">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        <div className="px-4 pb-6 space-y-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-small font-sans-alt font-semibold">
                MS
              </div>
              {!isCollapsed && (
                <div className="flex-1">
                  <p className="text-small font-sans-alt font-normal text-[#cccccc]">My Space</p>
                </div>
              )}
            </div>
          )}
          <Link to="/settings">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 bg-transparent text-[#cccccc] hover:bg-[#3e3e42] hover:text-white ${
                isCollapsed ? 'px-2' : 'px-4'
              }`}
            >
              <SettingsIcon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-sans-alt font-normal">Settings</span>}
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
