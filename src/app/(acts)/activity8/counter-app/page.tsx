'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function Activity2() {

    // State to hold the current count value
    const [count, setCount] = useState(0)

    // Function to increment the count
    const increment = () => setCount(count * 2)
    // Function to decrement the count
    const decrement = () => setCount(count / 2)
    // Function to reset the count to 0
    const reset = () => setCount(0)

    return (
        <main
            // Main container with Flexbox to center the content vertically and horizontally
            // Added a muted background color
            className="flex flex-col items-center justify-center min-h-screen bg-muted"
        >

            <Link href={'/activity8/dashboard'} >
                Navigate to dashboard
            </Link >

            <Card
                // Using a card component for structured layout
                className="w-full max-w-md p-6 shadow-lg"
            >
                <CardHeader>
                    {/* Header for the Counter App */}
                    <h1 className="text-3xl font-bold mb-4 text-center">Counter App</h1>
                </CardHeader>
                <CardContent>
                    {/* Display the current count */}
                    <div className="text-2xl mb-4 text-center">Count: {count}</div>
                    {/* Display whether the number is odd or even */}
                    <div className="mb-4 text-center">
                        Number is {count % 2 === 0 ? 'Even' : 'Odd'}
                    </div>
                    {/* Buttons for increment, decrement, and reset actions */}
                    <div className="flex justify-center space-x-4">
                        <Button
                            // Increment button
                            onClick={increment}
                            variant="default"
                        >
                            Increment
                        </Button>
                        <Button
                            // Decrement button
                            onClick={decrement}
                            variant="outline"
                        >
                            Decrement
                        </Button>
                        <Button
                            // Reset button
                            onClick={reset}
                            variant="destructive"
                        >
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
