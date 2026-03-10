'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronRight, Home, Lightbulb, Zap, BarChart3, Settings, HelpCircle, LogOut, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createClient } from '../../../lib/supabase/client';

interface SidebarProps {
  open: boolean;
  onToggle?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: { id: string; label: string; href: string }[];
}

const navItems: NavItem[] = [
  { id: 'dashboard',     label: 'Dashboard',     icon: <Home className="w-5 h-5" />,       href: '/dashboard' },
  { id: 'ideaValidator', label: 'Idea Validator', icon: <Lightbulb className="w-5 h-5" />,  href: '/dashboard/idea-validator' },
  {
    id: 'generators',
    label: 'Generators',
    icon: <Zap className="w-5 h-5" />,
    children: [
      { id: 'landingPage',    label: 'Landing Page',      href: '/dashboard/landing-page-gen' },
      { id: 'marketing',     label: 'Marketing Content',  href: '/dashboard/marketing-gen' },
      { id: 'featureBuilder', label: 'Feature Builder',   href: '/dashboard/feature-builder' },
    ],
  },
  { id: 'growth',    label: 'Growth Advisor', icon: <TrendingUp className="w-5 h-5" />, href: '/dashboard/growth-advisor' },
  { id: 'analytics', label: 'Analytics',      icon: <BarChart3 className="w-5 h-5" />,  href: '/dashboard/analytics' },
];

export default function DashboardSidebar({ open, onToggle }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['generators']));
  const pathname = usePathname();
  const router = useRouter();

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const isActive = (href: string) => pathname === href;

  const renderNavItem = (item: NavItem) => {
    const isExpanded = expandedSections.has(item.id);
    const hasChildren = !!item.children?.length;

    if (!hasChildren && item.href) {
      return (
        <Link
          key={item.id}
          href={item.href}
          onClick={onToggle}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors font-medium',
            isActive(item.href)
              ? 'bg-accent/15 text-accent'
              : 'hover:bg-sidebar-accent/10 text-sidebar-foreground',
          )}
        >
          <div className="w-4" />
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
        </Link>
      );
    }

    return (
      <div key={item.id}>
        <button
          onClick={() => toggleSection(item.id)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors font-medium',
            'hover:bg-sidebar-accent/10 text-sidebar-foreground',
          )}
        >
          <ChevronRight
            className={cn('w-4 h-4 transition-transform flex-shrink-0', isExpanded && 'rotate-90')}
          />
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
        </button>

        {isExpanded && (
          <div className="pl-4">
            {item.children!.map(child => (
              <Link
                key={child.id}
                href={child.href}
                onClick={onToggle}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 text-xs rounded-lg transition-colors',
                  isActive(child.href)
                    ? 'bg-accent/15 text-accent font-medium'
                    : 'hover:bg-sidebar-accent/10 text-muted-foreground hover:text-sidebar-foreground',
                )}
              >
                <span className="flex-1">{child.label}</span>
              </Link>
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
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onToggle} />
      )}

      <aside
        className={cn(
          'fixed lg:static top-0 left-0 h-screen w-sidebar bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 z-40 lg:z-0',
          !open && '-translate-x-full lg:translate-x-0',
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
          <div className="space-y-1">{navItems.map(item => renderNavItem(item))}</div>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <Link
            href="/dashboard/settings"
            onClick={onToggle}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors',
              'hover:bg-sidebar-accent/10 text-sidebar-foreground',
            )}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>

          <button
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors',
              'hover:bg-sidebar-accent/10 text-sidebar-foreground',
            )}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>

          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors',
              'hover:bg-destructive/10 text-destructive',
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
