import React, { useState } from 'react';
import { ChevronRight, Home, Lightbulb, Zap, BarChart3, Settings, HelpCircle, LogOut, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  onToggle?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    href: '/dashboard',
  },
  {
    id: 'ideaValidator',
    label: 'Idea Validator',
    icon: <Lightbulb className="w-5 h-5" />,
    href: '/dashboard/idea-validator',
  },
  {
    id: 'generators',
    label: 'Generators',
    icon: <Zap className="w-5 h-5" />,
    children: [
      {
        id: 'landingPage',
        label: 'Landing Page',
        href: '/dashboard/landing-page-gen',
      },
      {
        id: 'marketing',
        label: 'Marketing Content',
        href: '/dashboard/marketing-gen',
      },
      {
        id: 'featureBuilder',
        label: 'Feature Builder',
        href: '/dashboard/feature-builder',
      },
    ],
  },
  {
    id: 'growth',
    label: 'Growth Advisor',
    icon: <TrendingUp className="w-5 h-5" />,
    href: '/dashboard/growth-advisor',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/dashboard/analytics',
  },
];

export default function DashboardSidebar({ open, onToggle }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['generators']));

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpanded = expandedSections.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <button
          onClick={() => hasChildren && toggleSection(item.id)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors',
            'hover:bg-sidebar-accent/10 text-sidebar-foreground',
            level === 0 ? 'font-medium' : 'font-normal text-muted-foreground'
          )}
        >
          {hasChildren && (
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform flex-shrink-0',
                isExpanded && 'rotate-90'
              )}
            />
          )}
          {!hasChildren && <div className="w-4" />}
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
        </button>

        {/* Nested items */}
        {hasChildren && isExpanded && (
          <div className="pl-4">
            {item.children!.map(child => (
              <a
                key={child.id}
                href={child.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 text-xs rounded-lg transition-colors',
                  'hover:bg-sidebar-accent/10 text-muted-foreground hover:text-sidebar-foreground'
                )}
              >
                <span className="flex-1">{child.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static top-0 left-0 h-screen w-sidebar bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 z-40 lg:z-0',
          !open && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo area */}
        <div className="h-top-bar border-b border-sidebar-border flex items-center px-4 lg:hidden">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            U
          </div>
          <span className="ml-2 font-bold text-primary">URMAN</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {navItems.map(item => renderNavItem(item))}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <button
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors',
              'hover:bg-sidebar-accent/10 text-sidebar-foreground'
            )}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors',
              'hover:bg-sidebar-accent/10 text-sidebar-foreground'
            )}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
          <button
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors',
              'hover:bg-destructive/10 text-destructive'
            )}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
