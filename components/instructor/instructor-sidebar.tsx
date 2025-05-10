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
  LogOut,
  MessageSquare,
  Settings,
  User,
  Video,
  GraduationCap,
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

export function InstructorSidebar() {
  const pathname = usePathname()

  // Mock instructor data - in a real app, this would come from authentication
  const instructor = {
    name: "Dr. Birhanu Ayalew",
    email: "birhanu@example.com",
    department: "Information Systems",
    avatar: "/placeholder.svg?height=40&width=40",
    id: "INS12345",
  }

  const menuItems = [
    {
      title: "Dashboard",
      href: "/instructor/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "My Courses",
      href: "/instructor/courses",
      icon: <BookOpen className="h-5 w-5" />,
      badge: "2",
    },
    {
      title: "Resources",
      href: "/instructor/resources",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Discussion Forums",
      href: "/instructor/forums",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "New",
    },
    {
      title: "Live Discussions",
      href: "/instructor/live-discussions",
      icon: <Video className="h-5 w-5" />,
    },
    {
      title: "Assignments",
      href: "/instructor/assignments",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Schedule",
      href: "/instructor/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Grades",
      href: "/instructor/grades",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Students",
      href: "/instructor/students",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/instructor/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/instructor/settings",
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
              <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
              <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{instructor.name}</span>
              <span className="text-xs text-muted-foreground">{instructor.department}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>ID: {instructor.id}</span>
            <Badge variant="outline" className="text-xs">
              Instructor
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
                  isActive={pathname === "/instructor/dashboard"}
                  tooltip="Dashboard"
                  className="justify-start"
                >
                  <Link href="/instructor/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/instructor/courses"}
                  tooltip="My Courses"
                  className="justify-start"
                >
                  <Link href="/instructor/courses">
                    <BookOpen className="h-5 w-5" />
                    <span>My Courses</span>
                  </Link>
                </SidebarMenuButton>
                <Badge variant="outline" className="ml-auto">
                  2
                </Badge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/instructor/resources"}
                  tooltip="Resources"
                  className="justify-start"
                >
                  <Link href="/instructor/resources">
                    <FileText className="h-5 w-5" />
                    <span>Resources</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/instructor/assignments"}
                  tooltip="Assignments"
                  className="justify-start"
                >
                  <Link href="/instructor/assignments">
                    <ClipboardList className="h-5 w-5" />
                    <span>Assignments</span>
                  </Link>
                </SidebarMenuButton>
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
                  isActive={pathname === "/instructor/forums"}
                  tooltip="Discussion Forums"
                  className="justify-start"
                >
                  <Link href="/instructor/forums">
                    <MessageSquare className="h-5 w-5" />
                    <span>Discussion Forums</span>
                  </Link>
                </SidebarMenuButton>
                <Badge className="ml-auto bg-primary text-primary-foreground">New</Badge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/instructor/live-discussions"}
                  tooltip="Live Discussions"
                  className="justify-start"
                >
                  <Link href="/instructor/live-discussions">
                    <Video className="h-5 w-5" />
                    <span>Live Discussions</span>
                  </Link>
                </SidebarMenuButton>
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
                  isActive={pathname === "/instructor/schedule"}
                  tooltip="Schedule"
                  className="justify-start"
                >
                  <Link href="/instructor/schedule">
                    <Calendar className="h-5 w-5" />
                    <span>Schedule</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/instructor/grades"}
                  tooltip="Grades"
                  className="justify-start"
                >
                  <Link href="/instructor/grades">
                    <BarChart className="h-5 w-5" />
                    <span>Grades</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/instructor/students"}
                  tooltip="Students"
                  className="justify-start"
                >
                  <Link href="/instructor/students">
                    <GraduationCap className="h-5 w-5" />
                    <span>Students</span>
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
                  isActive={pathname === "/instructor/profile"}
                  tooltip="Profile"
                  className="justify-start"
                >
                  <Link href="/instructor/profile">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/instructor/settings"}
                  tooltip="Settings"
                  className="justify-start"
                >
                  <Link href="/instructor/settings">
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
