'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function Activity5() {
    // State to store the list of tasks
    const [tasks, setTasks] = useState<string[]>([])
    // State to store the value of the new task input field
    const [newTask, setNewTask] = useState('')

    // Function to add a new task
    const addTask = () => {
        if (newTask.trim()) {
            // Add the new task to the list if it's not empty
            setTasks([...tasks, newTask])
            // Display success notification
            toast.success('Task added successfully!')
            // Clear the input field
            setNewTask('')
        } else {
            // Display error notification if the input is empty
            toast.error('Task cannot be empty!')
        }
    }

    // Function to remove a task by index
    const removeTask = (index: number) => {
        const taskName = tasks[index] // Get the task name for feedback
        setTasks(tasks.filter((_, i) => i !== index)) // Remove the task
        toast.success(`Task "${taskName}" removed successfully!`) // Show success notification
    }

    // Function to toggle task completion
    const toggleTask = (index: number) => {
        const updatedTasks = [...tasks]
        updatedTasks[index] = updatedTasks[index].startsWith('✓ ')
            ? updatedTasks[index].slice(2) // Remove the "✓ " if already completed
            : `✓ ${updatedTasks[index]}` // Add "✓ " to mark as completed
        setTasks(updatedTasks)
    }

    return (
        <main
            // Main container for centering content
            className="flex flex-col items-center justify-center min-h-screen bg-muted"
        >
            <Card
                // Card for structured layout
                className="w-full max-w-md p-6 shadow-lg"
            >
                <CardHeader>
                    {/* Header for the To-Do List */}
                    <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
                </CardHeader>
                <CardContent>
                    <div
                        // Input field and add button layout
                        className="flex space-x-2 mb-4"
                    >
                        {/* Input for the new task */}
                        <Input
                            type="text"
                            value={newTask} // Bind to the `newTask` state
                            onChange={(e) => setNewTask(e.target.value)} // Update state on input
                            placeholder="Add a task"
                        />
                        {/* Add task button */}
                        <Button onClick={addTask} variant="default">
                            Add
                        </Button>
                    </div>
                    {/* Display the list of tasks */}
                    <ul className="space-y-2">
                        {tasks.map((task, index) => (
                            <li
                                key={index} // Unique key for each task
                                className="flex items-center justify-between bg-card px-4 py-2 rounded-md shadow-sm"
                            >
                                {/* Task text with click to toggle completion */}
                                <span
                                    onClick={() => toggleTask(index)}
                                    className="cursor-pointer"
                                >
                                    {task}
                                </span>
                                {/* Remove task button */}
                                <Button
                                    onClick={() => removeTask(index)}
                                    variant="destructive"
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </main>
    )
}
