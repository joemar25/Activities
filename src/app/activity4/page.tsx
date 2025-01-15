'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Activity4() {
    const [size, setSize] = useState(100)
    const [color, setColor] = useState('#000000')

    const grow = () => {
        setSize(size * 2)
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    }

    return (
        <main className="flex items-center justify-center min-h-screen">
            <Button
                onClick={grow}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    color: 'white',
                    fontSize: '1rem',
                    borderRadius: '50%',
                }}
                className="flex items-center justify-center"
            >
                GROW
            </Button>
        </main>
    )
}
