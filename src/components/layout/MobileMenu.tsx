import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, LayoutDashboardIcon, FolderKanbanIcon, UsersIcon, CalendarIcon, BarChart3Icon, SettingsIcon, LogOutIcon, UmbrellaIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
        aria-label="Toggle menu"
      >
        {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </Button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-card">
          <div className="flex flex-col h-full pt-20 px-6">
            <h1 className="text-h2 font-sans text-foreground mb-8">ProjectHub</h1>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} to={item.path} onClick={handleLinkClick}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 text-foreground hover:bg-accent hover:text-accent-foreground ${
                        active ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : 'bg-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-sans-alt font-normal">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <div className="pb-8 space-y-2">
              <Link to="/settings" onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <SettingsIcon className="w-5 h-5" />
                  <span className="font-sans-alt font-normal">SettingsIcon</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LogOutIcon className="w-5 h-5" />
                <span className="font-sans-alt font-normal">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
