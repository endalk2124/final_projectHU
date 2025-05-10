import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Shield } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 pt-24">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Hawassa University Informatics</h1>
            <p className="text-muted-foreground">Teaching and Learning Support System</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AuthCard
              title="Student"
              description="Access your courses, resources, and assignments"
              icon={<GraduationCap className="h-8 w-8" />}
              loginHref="/student/login"
              registerHref="/student/register"
              color="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
            />

            <AuthCard
              title="Instructor"
              description="Manage your courses and teaching materials"
              icon={<BookOpen className="h-8 w-8" />}
              loginHref="/instructor/login"
              registerHref="/instructor/register"
              color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
            />

            <AuthCard
              title="Admin"
              description="System administration and management"
              icon={<Shield className="h-8 w-8" />}
              loginHref="/admin/login"
              color="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

interface AuthCardProps {
  title: string
  description: string
  icon: React.ReactNode
  loginHref: string
  registerHref?: string
  color: string
}

function AuthCard({ title, description, icon, loginHref, registerHref, color }: AuthCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${color} flex flex-col items-center`}>
        <div className="p-3 rounded-full bg-white/90 dark:bg-slate-800/90 mb-3">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Button asChild className="w-full mb-3">
          <Link href={loginHref}>Login as {title}</Link>
        </Button>
        {registerHref && (
          <Button asChild variant="outline" className="w-full">
            <Link href={registerHref}>Register as {title}</Link>
          </Button>
        )}
      </CardContent>
      <CardFooter className="text-xs text-center text-muted-foreground">
        {registerHref ? "New users can register for an account" : "Admin accounts are created by system administrators"}
      </CardFooter>
    </Card>
  )
}
