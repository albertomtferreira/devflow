"use client"

import * as React from "react"
import {
  Bell,
  BookOpen,
  ChevronsUpDown,
  Code,
  CreditCard,
  LayoutGrid,
  LogOut,
  Moon,
  PieChart,
  Rocket,
  Settings,
  Sparkles,
  Sun,
  User
} from "lucide-react"
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
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
} from "@/components/ui/dropdown-menu"
import UserAvatar from "./userAvatar"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { useTheme } from "../theme-provider"
import { usePathname } from "next/navigation"

interface NavItem {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  items?: NavItem[]
}

const platformNavItems: NavItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
  },
]

const projectNavItems: NavItem[] = [
  {
    id: "1",
    title: "My Awesome App",
    icon: Rocket,
    href: "/dashboard/projects/1",
  },
  {
    id: "2",
    title: "Data Visualizer",
    icon: PieChart,
    href: "/dashboard/projects/2",
  },
  {
    id: "3",
    title: "Learning Go",
    icon: BookOpen,
    href: "/dashboard/projects/3",
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> { }

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { logout } = useAuth()
  const { setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <Sidebar variant="inset"
      className="h-screen fixed top-0 left-0 z-40 border-r bg-background"
      {...props}>
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
                  <SidebarMenuButton tooltip={platform.title} isActive={pathname === '/dashboard'} asChild>
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
              {projectNavItems.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(
                      `/dashboard/projects/${project.id}`
                    )}
                    tooltip={project.title}
                    asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <project.icon className="size-4" />
                      <span>{project.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
  )
}

// Layout component to wrap your app
export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Function to generate breadcrumbs from pathname
  const generateBreadcrumbs = (path: string) => {
    const segments = path.split('/').filter(Boolean)
    const breadcrumbs = []

    // Handle root dashboard
    if (segments.length === 0 || (segments.length === 1 && segments[0] === 'dashboard')) {
      return 'Dashboard'
    }

    // Build breadcrumbs
    let currentPath = ''
    for (let i = 0; i < segments.length; i++) {
      currentPath += `/${segments[i]}`

      // Skip the first 'dashboard' segment for cleaner breadcrumbs
      if (segments[i] === 'dashboard' && i === 0) {
        continue
      }

      let displayName = segments[i]

      // Custom display names for specific routes
      switch (segments[i]) {
        case 'projects':
          displayName = 'Projects'
          break
        case 'settings':
          displayName = 'Settings'
          break
        case '1':
          displayName = 'My Awesome App'
          break
        case '2':
          displayName = 'Data Visualizer'
          break
        case '3':
          displayName = 'Learning Go'
          break
        default:
          // Capitalize first letter and replace hyphens/underscores with spaces
          displayName = segments[i]
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
      }

      breadcrumbs.push({
        name: displayName,
        path: currentPath,
        isLast: i === segments.length - 1
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <div className="flex min-h-screen">

      <SidebarProvider>
        <AppSidebar />
        <div className="w-[260px]" /> {/* match sidebar width */}
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Sticky breadcrumbs header */}
          <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-2 bg-background/95 border-b">
            <SidebarTrigger className="-ml-1" />
            <div className="text-sm text-muted-foreground">
              {typeof breadcrumbs === 'string' ? (
                breadcrumbs
              ) : (
                <div className="flex items-center gap-1">
                  <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.path}>
                      <span className="mx-1">&gt;</span>
                      {crumb.isLast ? (
                        <span className="text-foreground font-medium">{crumb.name}</span>
                      ) : (
                        <Link
                          href={crumb.path}
                          className="hover:text-foreground transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>

  )
}