'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useState } from 'react'

export default function Activity3() {
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)

    const reset = () => {
        setNum1(0)
        setNum2(0)
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-muted">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <h1 className="text-3xl font-bold mb-4 text-center">Simple Calculator</h1>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 mb-4">
                        <Input
                            type="number"
                            value={num1}
                            onChange={(e) => setNum1(Number(e.target.value))}
                            placeholder="First number"
                        />
                        <Input
                            type="number"
                            value={num2}
                            onChange={(e) => setNum2(Number(e.target.value))}
                            placeholder="Second number"
                        />
                    </div>
                    <div className="text-2xl mb-4 text-center">Sum: {num1 + num2}</div>
                    <Button onClick={reset} variant="destructive" className="w-full">
                        Reset
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}
