"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, FileText, MessageSquare, Home, User } from "lucide-react"

interface MainNavProps {
  userRole?: "student" | "instructor" | null
}

export function MainNav({ userRole }: MainNavProps) {
  const pathname = usePathname()

  const studentLinks = [
    {
      title: "Home",
      href: "/student/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Courses",
      href: "/student/courses",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      title: "Resources",
      href: "/student/resources",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Discussions",
      href: "/student/discussions",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/student/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
  ]

  const instructorLinks = [
    {
      title: "Home",
      href: "/instructor/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Courses",
      href: "/instructor/courses",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      title: "Resources",
      href: "/instructor/resources",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Discussions",
      href: "/instructor/discussions",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/instructor/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
  ]

  const links = userRole === "student" ? studentLinks : userRole === "instructor" ? instructorLinks : []

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {link.icon}
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
