import Link from "next/link"
import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
  icon: ReactNode
  imageSrc?: string
  footerText?: string
  footerLink?: {
    text: string
    href: string
  }
  additionalFooter?: ReactNode
}

export function AuthLayout({
  children,
  title,
  description,
  icon,
  imageSrc,
  footerText,
  footerLink,
  additionalFooter,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex flex-col items-center space-y-3">
              {imageSrc && (
                <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                  <img src={imageSrc || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain" />
                </div>
              )}
              <CardTitle className="text-2xl font-bold text-center flex items-center gap-2">
                {icon}
                {title}
              </CardTitle>
            </div>
            <CardDescription className="text-center">{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          {(footerText || footerLink || additionalFooter) && (
            <CardFooter className="flex flex-col space-y-4">
              {footerText && footerLink && (
                <div className="text-sm text-center text-muted-foreground">
                  {footerText}{" "}
                  <Link href={footerLink.href} className="text-primary hover:underline">
                    {footerLink.text}
                  </Link>
                </div>
              )}
              {additionalFooter}
            </CardFooter>
          )}
        </Card>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Having trouble signing in?{" "}
        <Link href="/contact-support" className="text-primary hover:underline">
          Contact Support
        </Link>
      </footer>
    </div>
  )
}
