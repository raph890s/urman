import React from 'react';
import { Menu, Search, Bell, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TopBarProps {
  onMenuClick?: () => void;
  onAIPanelToggle?: () => void;
}

export default function DashboardTopBar({ onMenuClick, onAIPanelToggle }: TopBarProps) {
  return (
    <div className="h-top-bar bg-white border-b border-border flex items-center justify-between px-6 shadow-sm">
      {/* Left side - Logo and Menu */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            U
          </div>
          <span className="text-lg font-bold text-primary hidden sm:inline">URMAN</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 py-2 text-sm"
          />
        </div>
      </div>

      {/* Right side - Status and User */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Saved</span>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://avatar.vercel.sh/user" alt="User" />
                <AvatarFallback className="bg-accent text-accent-foreground">TM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-3 p-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://avatar.vercel.sh/user" alt="User" />
                <AvatarFallback className="bg-accent text-accent-foreground">TM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">Total Michael</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
