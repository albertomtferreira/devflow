'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code,
  LayoutGrid,
  Settings,
  Folder,
  Plus,
  LifeBuoy,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
];

const mockProjects = [
  { id: '1', name: 'My Awesome App' },
  { id: '2', name: 'Data Visualizer' },
  { id: '3', name: 'Learning Go' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className='flex justify-between items-center gap-2 p-2'>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">DevFlow</span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
              >
                <LayoutGrid />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <button>
              <Plus />
            </button>
          </SidebarGroupAction>
          <SidebarMenu>
            {mockProjects.map((project) => (
              <SidebarMenuItem key={project.id}>
                <Link href={`/dashboard/projects/${project.id}`} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === `/dashboard/projects/${project.id}`}
                    tooltip={project.name}
                  >
                    <Folder />
                    <span>{project.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Support">
              <LifeBuoy />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/settings" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === '/dashboard/settings'}
                tooltip="Settings"
              >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
