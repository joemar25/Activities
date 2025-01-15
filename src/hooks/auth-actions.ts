'use server'

import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { AuthError } from 'next-auth'
import { signUpSchema } from '@/lib/zod'
import { signIn, signOut } from '@/lib/auth'

export async function handleCredentialsSignin({
    email,
    password,
}: {
    email: string
    password: string
}) {
    try {
        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: { email },
        })

        // Check if the user exists
        if (!user) {
            return {
                success: false,
                message: 'Invalid credentials. Please try again.',
            }
        }

        // Attempt to sign in
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            return {
                success: false,
                message: 'Invalid credentials. Please try again.',
            }
        }

        // Redirect to dashboard on successful login
        return {
            success: true,
            redirectTo: '/dashboard',
        }
    } catch (error) {
        console.error('Signin error:', error)

        if (error instanceof AuthError) {
            return {
                success: false,
                message:
                    error.type === 'CredentialsSignin'
                        ? 'Invalid credentials'
                        : 'Something went wrong during sign-in.',
            }
        }

        return { success: false, message: 'An unexpected error occurred.' }
    }
}

export async function handleSignOut() {
    try {
        // Use the default behavior of NextAuth signOut
        return await signOut({
            redirect: true,
            redirectTo: '/activity8'
        })
    } catch (error) {
        console.error('Sign out error:', error)
        throw error
    }
}

type SignUpInput = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export async function handleSignUp({
    name,
    email,
    password,
    confirmPassword,
}: SignUpInput) {
    try {
        const parsedCredentials = signUpSchema.safeParse({
            name,
            email,
            password,
            confirmPassword,
        })

        if (!parsedCredentials.success) {
            return { success: false, message: 'Invalid data' }
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { success: false, message: 'Email already exists' }
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const now = new Date()

        // Create the user and account
        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    name,
                    emailVerified: null,
                    createdAt: now,
                    updatedAt: now,
                },
            })

            await tx.account.create({
                data: {
                    userId: user.id,
                    type: 'credentials',
                    provider: 'credentials',
                    providerAccountId: email,
                    password: hashedPassword,
                    createdAt: now,
                    updatedAt: now,
                },
            })
        })

        return { success: true, message: 'Account created successfully' }
    } catch (error) {
        console.error('Signup error:', error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}