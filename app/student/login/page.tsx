"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { GraduationCap } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"

// Form validation schema - simplified for now
const studentLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default function StudentLoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleLogin = async (values: z.infer<typeof studentLoginSchema>) => {
    try {
      // For now, just redirect to dashboard without validation
      router.push("/student/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed. Please try again.")
      throw error
    }
  }

  return (
    <AuthLayout
      title="Student Login"
      description="Sign in to access your HU Informatics account"
      icon={<GraduationCap className="h-6 w-6 text-primary" />}
      imageSrc="/placeholder.svg?height=80&width=80"
      footerText="Don't have an account?"
      footerLink={{ text: "Register here", href: "/student/register" }}
      additionalFooter={
        <Button variant="outline" className="w-full" asChild>
          <Link href="/forgot-password?type=student">Forgot Password?</Link>
        </Button>
      }
    >
      <AuthForm
        schema={studentLoginSchema}
        defaultValues={{ username: "", password: "" }}
        onSubmit={handleLogin}
        fields={[
          {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter your username",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
          },
        ]}
        submitText="Login"
        error={error}
      />
    </AuthLayout>
  )
}
