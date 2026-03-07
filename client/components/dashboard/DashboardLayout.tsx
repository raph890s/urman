import React, { ReactNode, useState } from 'react';
import DashboardTopBar from './TopBar';
import DashboardSidebar from './Sidebar';
import DashboardAIPanel from './AIPanel';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage?: string;
}

export default function DashboardLayout({ children, currentPage = 'dashboard' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiPanelOpen, setAIPanelOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <DashboardTopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onAIPanelToggle={() => setAIPanelOpen(!aiPanelOpen)}
        />

        {/* Content wrapper */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <main className={`flex-1 overflow-auto transition-all ${aiPanelOpen ? 'md:pr-80' : ''}`}>
            {children}
          </main>

          {/* AI Panel - Hidden on mobile, visible on medium and up */}
          {aiPanelOpen && <div className="hidden md:block"><DashboardAIPanel /></div>}
        </div>
      </div>
    </div>
  );
}
