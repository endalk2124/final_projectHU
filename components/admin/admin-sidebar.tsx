"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
  Database,
  Bell,
  HelpCircle,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AdminSidebar() {
  const pathname = usePathname()

  // Mock admin data - in a real app, this would come from authentication
  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    role: "System Administrator",
    avatar: "/placeholder.svg?height=40&width=40",
    id: "ADM001",
  }

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
      badge: "5 New",
    },
    {
      title: "Instructors",
      href: "/admin/instructors",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Students",
      href: "/admin/students",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Courses",
      href: "/admin/courses",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Departments",
      href: "/admin/departments",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "System Logs",
      href: "/admin/logs",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Notifications",
      href: "/admin/notifications",
      icon: <Bell className="h-5 w-5" />,
      badge: "3",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Help & Support",
      href: "/admin/support",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center px-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold text-primary">HU</span>
            <span className="text-lg font-medium ml-1 hidden md:inline">Admin</span>
          </Link>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <div className="mb-6 px-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
              <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{admin.name}</span>
              <span className="text-xs text-muted-foreground">{admin.role}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>ID: {admin.id}</span>
            <Badge variant="outline" className="text-xs">
              Admin
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Main</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/dashboard"}
                  tooltip="Dashboard"
                  className="justify-start"
                >
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/users"}
                  tooltip="Users"
                  className="justify-start"
                >
                  <Link href="/admin/users">
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
                <Badge className="ml-auto bg-primary text-primary-foreground">5 New</Badge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/instructors"}
                  tooltip="Instructors"
                  className="justify-start"
                >
                  <Link href="/admin/instructors">
                    <BookOpen className="h-5 w-5" />
                    <span>Instructors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/students"}
                  tooltip="Students"
                  className="justify-start"
                >
                  <Link href="/admin/students">
                    <User className="h-5 w-5" />
                    <span>Students</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>

          {/* Academic Management */}
          <div>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Academic</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/courses"}
                  tooltip="Courses"
                  className="justify-start"
                >
                  <Link href="/admin/courses">
                    <FileText className="h-5 w-5" />
                    <span>Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/departments"}
                  tooltip="Departments"
                  className="justify-start"
                >
                  <Link href="/admin/departments">
                    <Home className="h-5 w-5" />
                    <span>Departments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/reports"}
                  tooltip="Reports"
                  className="justify-start"
                >
                  <Link href="/admin/reports">
                    <BarChart className="h-5 w-5" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>

          {/* System */}
          <div>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">System</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/logs"}
                  tooltip="System Logs"
                  className="justify-start"
                >
                  <Link href="/admin/logs">
                    <Database className="h-5 w-5" />
                    <span>System Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/notifications"}
                  tooltip="Notifications"
                  className="justify-start"
                >
                  <Link href="/admin/notifications">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
                <Badge className="ml-auto bg-primary text-primary-foreground">3</Badge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/settings"}
                  tooltip="Settings"
                  className="justify-start"
                >
                  <Link href="/admin/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/support"}
                  tooltip="Help & Support"
                  className="justify-start"
                >
                  <Link href="/admin/support">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
