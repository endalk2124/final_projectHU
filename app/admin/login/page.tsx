"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Shield } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"

// Form validation schema - simplified for now
const adminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleLogin = async (values: z.infer<typeof adminLoginSchema>) => {
    try {
      // For now, just redirect to dashboard without validation
      router.push("/admin/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed. Please try again.")
      throw error
    }
  }

  return (
    <AuthLayout
      title="Admin Login"
      description="Sign in to access your Admin Panel"
      icon={<Shield className="h-6 w-6 text-primary" />}
      imageSrc="/placeholder.svg?height=80&width=80"
      footerText="By logging in, you agree to our"
      footerLink={{ text: "Terms of Service", href: "/terms" }}
    >
      <AuthForm
        schema={adminLoginSchema}
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
