'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useState } from 'react'

export default function Activity3() {
    // State variables to hold the input values
    const [num1, setNum1] = useState(0) // First input number
    const [num2, setNum2] = useState(0) // Second input number

    // Function to reset both input values to 0
    const reset = () => {
        setNum1(0)
        setNum2(0)
    }

    return (
        <main
            // Main container to center content in the viewport
            className="flex flex-col items-center justify-center min-h-screen bg-muted"
        >
            <Card
                // Card for structured layout and styling
                className="w-full max-w-md p-6 shadow-lg"
            >
                <CardHeader>
                    {/* Header for the calculator */}
                    <h1 className="text-3xl font-bold mb-4 text-center">Simple Calculator</h1>
                </CardHeader>
                <CardContent>
                    <div
                        // Spacing for the input fields
                        className="space-y-4 mb-4"
                    >
                        {/* Input for the first number */}
                        <Input
                            type="number"
                            value={num1} // Binds to the state variable `num1`
                            onChange={(e) => setNum1(Number(e.target.value))} // Updates the state on input change
                            placeholder="First number" // Placeholder text
                        />
                        {/* Input for the second number */}
                        <Input
                            type="number"
                            value={num2} // Binds to the state variable `num2`
                            onChange={(e) => setNum2(Number(e.target.value))} // Updates the state on input change
                            placeholder="Second number" // Placeholder text
                        />
                    </div>
                    {/* Display the sum of the two numbers */}
                    <div
                        className="text-2xl mb-4 text-center"
                    >
                        Sum: {num1 + num2}
                    </div>
                    {/* Reset button to clear the inputs */}
                    <Button
                        onClick={reset}
                        variant="destructive"
                        className="w-full"
                    >
                        Reset
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}
