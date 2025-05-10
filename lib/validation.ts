import { z } from "zod"

// Shared validation patterns
const nameRegex = /^[a-zA-Z\s]{2,}$/
const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const phoneRegex = /^(?:\+251|0)?[97]\d{8}$/

// Login schemas
export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Base registration schema
const baseRegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .regex(nameRegex, "First name must contain only letters and be at least 2 characters long"),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .regex(nameRegex, "Last name must contain only letters and be at least 2 characters long"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(16, "Username must be at most 16 characters")
      .regex(usernameRegex, "Username must be alphanumeric or underscores, and 3-16 characters long"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .regex(emailRegex, "Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(passwordRegex, "Password must be at least 8 characters long and include both letters and numbers"),
    confirm_password: z.string(),
    phone: z
      .string()
      .regex(phoneRegex, "Phone number must start with '+2519', '+2517', '09', or '07' and be 10 or 13 digits long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

// Student registration schema
export const studentRegisterSchema = baseRegisterSchema.extend({
  department_id: z.string().min(1, "Please select a department"),
})

// Instructor registration schema
export const instructorRegisterSchema = baseRegisterSchema.extend({
  qualification: z.string().min(2, "Please enter your qualification"),
})

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

// New password schema
export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(passwordRegex, "Password must be at least 8 characters long and include both letters and numbers"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })
