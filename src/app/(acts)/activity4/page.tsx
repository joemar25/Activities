'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Activity4() {
    // State variables to manage the button size and background color
    const [size, setSize] = useState(100) // Initial size of the button (100px)
    const [color, setColor] = useState('#000000') // Initial color of the button (black)

    // Function to handle the button's growth and color change
    const grow = () => {
        // Double the size of the button
        setSize(size * 2)
        // Generate a random color in hex format and set it as the button's background
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    }

    return (
        <main
            // Main container to center the button in the viewport
            className="flex items-center justify-center min-h-screen"
        >
            <Button
                // Attach the `grow` function to the button's `onClick` event
                onClick={grow}
                // Inline styles to dynamically set the button's size, color, and other styles
                style={{
                    width: `${size}px`, // Width of the button
                    height: `${size}px`, // Height of the button
                    backgroundColor: color, // Background color of the button
                    color: 'white', // Text color
                    fontSize: '1rem', // Font size of the button text
                    borderRadius: '50%', // Make the button circular
                }}
                // Additional utility classes for centering the button's text
                className="flex items-center justify-center"
            >
                {/* Text displayed on the button */}
                GROW
            </Button>
        </main>
    )
}
