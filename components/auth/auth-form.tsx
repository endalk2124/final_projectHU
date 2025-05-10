"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"

interface AuthFormProps {
  schema: z.ZodType<any, any>
  defaultValues: Record<string, any>
  onSubmit: (values: any) => Promise<void>
  fields: {
    name: string
    label: string
    type: string
    placeholder?: string
    description?: string
  }[]
  submitText: string
  error?: string
}

export function AuthForm({ schema, defaultValues, onSubmit, fields, submitText, error }: AuthFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(error || "")
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
    // Make the form less strict for now
    mode: "onSubmit",
  })

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true)
    setFormError("")
    try {
      await onSubmit(values)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }))
  }

  return (
    <Form {...form}>
      {formError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...formField}
                      type={field.type === "password" ? (showPassword[field.name] ? "text" : "password") : field.type}
                      placeholder={field.placeholder}
                      disabled={isSubmitting}
                    />
                    {field.type === "password" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility(field.name)}
                      >
                        {showPassword[field.name] ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">{showPassword[field.name] ? "Hide password" : "Show password"}</span>
                      </Button>
                    )}
                  </div>
                </FormControl>
                {field.description && <p className="text-xs text-muted-foreground mt-1">{field.description}</p>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : submitText}
        </Button>
      </form>
    </Form>
  )
}
