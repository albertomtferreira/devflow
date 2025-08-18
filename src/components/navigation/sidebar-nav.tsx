// src/components/navigation/sidebar-nav.tsx
"use client";

import * as React from "react";
import {
  Bell,
  ChevronsUpDown,
  Code,
  CreditCard,
  LayoutGrid,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
  User,
  Rocket,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./userAvatar";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { useTheme } from "../theme-provider";
import { usePathname } from "next/navigation";
import { SidebarMenuSkeleton } from "../ui/sidebar";
import { useProjects } from "@/contexts/projects-context";
import { STATUS_COLORS } from "@/lib/types";
import { getStatusById } from "@/lib/actions/project-statuses";
import { cn } from "@/lib/utils";

const platformNavItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const { projects, loading } = useProjects();

  // Helper function to get project status color
  const getProjectStatusColor = (project: any) => {
    if (project.customStatuses && project.currentStatus) {
      const status = getStatusById(
        project.customStatuses,
        project.currentStatus
      );
      if (status) {
        return (
          STATUS_COLORS[status.color as keyof typeof STATUS_COLORS]?.class ||
          "bg-gray-500"
        );
      }
    }
    return "bg-gray-500"; // Fallback color
  };

  // Helper function to get project status label
  const getProjectStatusLabel = (project: any) => {
    if (project.customStatuses && project.currentStatus) {
      const status = getStatusById(
        project.customStatuses,
        project.currentStatus
      );
      if (status) {
        return status.label;
      }
    }
    return "Undefined"; // Fallback Label
  };

  return (
    <Sidebar variant="inset" className="border-r " {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Code className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">
                  DevFlow
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformNavItems.map((platform) => (
                <SidebarMenuItem key={platform.id}>
                  <SidebarMenuButton
                    tooltip={platform.title}
                    isActive={pathname === platform.href}
                    asChild
                  >
                    <Link href={platform.href!}>
                      <platform.icon className="size-4" />
                      <span>{platform.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                <>
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                </>
              ) : projects.length === 0 ? (
                <SidebarMenuItem>
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No projects yet
                  </div>
                </SidebarMenuItem>
              ) : (
                projects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(
                        `/dashboard/projects/${project.id}`
                      )}
                      tooltip={getProjectStatusLabel(project)}
                      asChild
                    >
                      <Link href={`/dashboard/projects/${project.id}`}>
                        <div className="flex items-center gap-2 w-full min-w-0">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full flex-shrink-0",
                              getProjectStatusColor(project)
                            )}
                          />

                          <span className="truncate">{project.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UserAvatar />
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserAvatar />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sun className="mr-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute mr-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="ml-2">Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
