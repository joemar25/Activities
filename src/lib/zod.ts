// src/lib/zod.ts
import { object, string, z } from 'zod'

export const getPasswordSchema = (type: 'password' | 'confirmPassword') =>
  string({ required_error: `${type} is required` })
    .max(32, 'Password must be less than 32 characters')
    .refine(
      (value) => !value || value.length >= 8,
      'Password must be at least 8 characters long'
    );

export const getEmailSchema = () =>
  string({ required_error: `Email is required` })
    .email('Invalid email address')
    .min(1, 'Email must be at least 1 character long')
    .max(32, 'Email must be less than 32 characters')

export const getNameSchema = () =>
  string({ required_error: `Name is required` })
    .min(1, 'Name must be at least 1 character long')
    .max(32, 'Name must be less than 32 characters')

// Sign-up schema using literal types for role
export const signUpSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
  confirmPassword: getPasswordSchema('confirmPassword'),
  name: getNameSchema(),
  role: z.enum(['ADMIN', 'STAFF']).optional().default('STAFF'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const signInSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
})

export type SignUpForm = z.infer<typeof signUpSchema>
export type SignInForm = z.infer<typeof signInSchema>
