"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { KeyRound } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function ForgotPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "student"
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      // In a real app, you would make an API call to send a password reset email
      console.log("Password reset request:", values, "for user type:", type)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setIsSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Password reset request failed. Please try again.")
      throw error
    }
  }

  const getTitle = () => {
    switch (type) {
      case "admin":
        return "Admin Password Reset"
      case "instructor":
        return "Instructor Password Reset"
      default:
        return "Student Password Reset"
    }
  }

  const getReturnLink = () => {
    switch (type) {
      case "admin":
        return "/admin/login"
      case "instructor":
        return "/instructor/login"
      default:
        return "/student/login"
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Password Reset Email Sent"
        description="Check your email for reset instructions"
        icon={<KeyRound className="h-6 w-6 text-primary" />}
        imageSrc="/placeholder.svg?height=80&width=80"
        footerText=""
        additionalFooter={
          <Button variant="outline" className="w-full" asChild>
            <Link href={getReturnLink()}>Return to Login</Link>
          </Button>
        }
      >
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-700 dark:text-green-400">
            If an account exists with this email, you will receive password reset instructions shortly. Please check
            your email inbox.
          </AlertDescription>
        </Alert>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title={getTitle()}
      description="Enter your email to receive password reset instructions"
      icon={<KeyRound className="h-6 w-6 text-primary" />}
      imageSrc="/placeholder.svg?height=80&width=80"
      footerText="Remember your password?"
      footerLink={{ text: "Back to Login", href: getReturnLink() }}
    >
      <AuthForm
        schema={forgotPasswordSchema}
        defaultValues={{ email: "" }}
        onSubmit={handleSubmit}
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email address",
          },
        ]}
        submitText="Send Reset Instructions"
        error={error}
      />
    </AuthLayout>
  )
}
