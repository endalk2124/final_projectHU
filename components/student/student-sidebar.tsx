"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Library,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Video,
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

export function StudentSidebar() {
  const pathname = usePathname()

  // Mock student data - in a real app, this would come from authentication
  const student = {
    name: "Endale Bayou",
    email: "endale@example.com",
    department: "Information Systems",
    avatar: "/placeholder.svg?height=40&width=40",
    id: "STD12345",
  }

  const menuItems = [
    {
      title: "Dashboard",
      href: "/student/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "My Courses",
      href: "/student/courses",
      icon: <BookOpen className="h-5 w-5" />,
      badge: "4",
    },
    {
      title: "Resources",
      href: "/student/resources",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Discussion Forums",
      href: "/student/forums",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "New",
    },
    {
      title: "Live Discussions",
      href: "/student/live-discussions",
      icon: <Video className="h-5 w-5" />,
      badge: "2 Active",
    },
    {
      title: "Assignments",
      href: "/student/assignments",
      icon: <ClipboardList className="h-5 w-5" />,
      badge: "3 Due",
    },
    {
      title: "Schedule",
      href: "/student/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Grades",
      href: "/student/grades",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Library",
      href: "/student/library",
      icon: <Library className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/student/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/student/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center px-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold text-primary">HU</span>
            <span className="text-lg font-medium ml-1 hidden md:inline">Informatics</span>
          </Link>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <div className="mb-6 px-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{student.name}</span>
              <span className="text-xs text-muted-foreground">{student.department}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>ID: {student.id}</span>
            <Badge variant="outline" className="text-xs">
              Student
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
                  isActive={pathname === "/student/dashboard"}
                  tooltip="Dashboard"
                  className="justify-start"
                >
                  <Link href="/student/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/courses"}
                  tooltip="My Courses"
                  className="justify-start"
                >
                  <Link href="/student/courses">
                    <BookOpen className="h-5 w-5" />
                    <span>My Courses</span>
                  </Link>
                </SidebarMenuButton>
                <Badge variant="outline" className="ml-auto">
                  4
                </Badge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/resources"}
                  tooltip="Resources"
                  className="justify-start"
                >
                  <Link href="/student/resources">
                    <FileText className="h-5 w-5" />
                    <span>Resources</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/assignments"}
                  tooltip="Assignments"
                  className="justify-start"
                >
                  <Link href="/student/assignments">
                    <ClipboardList className="h-5 w-5" />
                    <span>Assignments</span>
                  </Link>
                </SidebarMenuButton>
                <Badge className="ml-auto bg-primary text-primary-foreground">3 Due</Badge>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>

          {/* Communication */}
          <div>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Communication</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/forums"}
                  tooltip="Discussion Forums"
                  className="justify-start"
                >
                  <Link href="/student/forums">
                    <MessageSquare className="h-5 w-5" />
                    <span>Discussion Forums</span>
                  </Link>
                </SidebarMenuButton>
                <Badge className="ml-auto bg-primary text-primary-foreground">New</Badge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/live-discussions"}
                  tooltip="Live Discussions"
                  className="justify-start"
                >
                  <Link href="/student/live-discussions">
                    <Video className="h-5 w-5" />
                    <span>Live Discussions</span>
                  </Link>
                </SidebarMenuButton>
                <Badge className="ml-auto bg-green-600 text-white">2 Active</Badge>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>

          {/* Academic Tools */}
          <div>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Academic Tools</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/schedule"}
                  tooltip="Schedule"
                  className="justify-start"
                >
                  <Link href="/student/schedule">
                    <Calendar className="h-5 w-5" />
                    <span>Schedule</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/grades"}
                  tooltip="Grades"
                  className="justify-start"
                >
                  <Link href="/student/grades">
                    <BarChart className="h-5 w-5" />
                    <span>Grades</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/library"}
                  tooltip="Library"
                  className="justify-start"
                >
                  <Link href="/student/library">
                    <Library className="h-5 w-5" />
                    <span>Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>

          {/* User */}
          <div>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">User</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/profile"}
                  tooltip="Profile"
                  className="justify-start"
                >
                  <Link href="/student/profile">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/student/settings"}
                  tooltip="Settings"
                  className="justify-start"
                >
                  <Link href="/student/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
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
