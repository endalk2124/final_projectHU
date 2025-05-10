"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { GraduationCap } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"

// Form validation schema
const studentRegisterSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(16, "Username must be at most 16 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter and one number"),
    confirm_password: z.string(),
    phone: z.string().regex(/^(?:\+251|0)?[97]\d{8}$/, "Phone number must be a valid Ethiopian phone number"),
    department_id: z.string().min(1, "Please select a department"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

export default function StudentRegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof studentRegisterSchema>>({
    resolver: zodResolver(studentRegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      department_id: "",
    },
  })

  const handleRegister = async (values: z.infer<typeof studentRegisterSchema>) => {
    try {
      // In a real app, you would make an API call to register
      console.log("Student registration:", values)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/student/login")
      }, 3000)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed. Please try again.")
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Registration Successful"
        description="Your account has been created"
        icon={<GraduationCap className="h-6 w-6 text-primary" />}
        imageSrc="/placeholder.svg?height=80&width=80"
      >
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300">Registration Submitted</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            Your account has been created and is pending admin approval. You'll be redirected to the login page shortly.
          </AlertDescription>
        </Alert>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Student Registration"
      description="Join the HU Informatics learning platform"
      icon={<GraduationCap className="h-6 w-6 text-primary" />}
      imageSrc="/placeholder.svg?height=80&width=80"
      footerText="Already have an account?"
      footerLink={{ text: "Sign In", href: "/student/login" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters with numbers and letters</p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 0912345678"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Computer Science</SelectItem>
                      <SelectItem value="2">Information Systems</SelectItem>
                      <SelectItem value="3">Information Technology</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
    </AuthLayout>
  )
}
