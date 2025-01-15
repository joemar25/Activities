'use client'

import { useState } from 'react'
import { handleCredentialsSignin, handleSignUp } from '@/hooks/auth-actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function Activity8() {
    const router = useRouter()
    const [isSignIn, setIsSignIn] = useState(true)
    const [formData, setFormData] = useState({
        name: 'mar',
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password'
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isSignIn) {
            const result = await handleCredentialsSignin({
                email: formData.email,
                password: formData.password,
            })

            if (result.success) {
                toast.success('Successfully signed in!')
                router.push('/activity8/dashboard')
            } else {
                toast.error(result.message || 'Something went wrong')
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match')
                return
            }

            const result = await handleSignUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            })

            if (result.success) {
                toast.success('Account created successfully!')
                // Auto sign in after successful registration
                const signInResult = await handleCredentialsSignin({
                    email: formData.email,
                    password: formData.password,
                })

                if (signInResult.success) {
                    router.push('/activity8/dashboard')
                } else {
                    toast.error('Error signing in after registration')
                }
            } else {
                toast.error(result.message || 'Error creating account')
            }
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <h1 className="text-2xl font-bold">
                        {isSignIn ? 'Sign In' : 'Create Account'}
                    </h1>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isSignIn && (
                            <div>
                                <label className="block mb-2">Name</label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block mb-2">Email</label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Your Email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Your Password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </div>
                        </div>

                        {!isSignIn && (
                            <div>
                                <label className="block mb-2">Confirm Password</label>
                                <Input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                        )}

                        <Button type="submit" className="w-full">
                            {isSignIn ? 'Sign In' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <Button
                            variant="link"
                            onClick={() => setIsSignIn(!isSignIn)}
                        >
                            {isSignIn
                                ? "Don't have an account? Sign Up"
                                : 'Already have an account? Sign In'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}