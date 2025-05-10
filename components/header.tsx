import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  user?: {
    name: string
    email: string
    role: string
    image?: string
  } | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">HU TLSS</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <MainNav userRole={user.role as "student" | "instructor"} />
              <UserNav user={user} />
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/student/login">Student Login</Link>
              </Button>
              <Button asChild>
                <Link href="/instructor/login">Instructor Login</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
