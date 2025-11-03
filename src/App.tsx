import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Dashboard } from '@/pages/Dashboard';
import { Projects } from '@/pages/Projects';
import { Team } from '@/pages/Team';
import { Leave } from '@/pages/Leave';
import { Calendar } from '@/pages/Calendar';
import { Reports } from '@/pages/Reports';
import { Settings } from '@/pages/Settings';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { CreateProjectModal } from '@/components/projects/CreateProjectModal';
import { LeaveRequestModal } from '@/components/leave/LeaveRequestModal';
import { Toaster } from '@/components/ui/toaster';
import { useProjectStore } from '@/stores/projectStore';
import { EmptyState } from '@/pages/EmptyState';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const projects = useProjectStore((state) => state.projects);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <MobileMenu />
        
        <div className="hidden lg:block">
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
          }`}
        >
          <TopBar />

          <main className="px-8 py-12">
            <Routes>
              <Route path="/" element={projects.length === 0 ? <EmptyState /> : <Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>

        <CreateProjectModal />
        <LeaveRequestModal />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
