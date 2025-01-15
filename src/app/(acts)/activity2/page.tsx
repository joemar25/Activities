'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function Activity2() {
    const [count, setCount] = useState(0)

    const increment = () => setCount(count + 1)
    const decrement = () => setCount(count - 1)
    const reset = () => setCount(0)

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-muted">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <h1 className="text-3xl font-bold mb-4 text-center">Counter App</h1>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl mb-4 text-center">Count: {count}</div>
                    <div className="mb-4 text-center">Number is {count % 2 === 0 ? 'Even' : 'Odd'}</div>
                    <div className="flex justify-center space-x-4">
                        <Button onClick={increment} variant="default">
                            Increment
                        </Button>
                        <Button onClick={decrement} variant="outline">
                            Decrement
                        </Button>
                        <Button onClick={reset} variant="destructive">
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
