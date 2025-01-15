'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Activity5() {
    const [tasks, setTasks] = useState<string[]>([])
    const [newTask, setNewTask] = useState('')

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, newTask])
            toast.success('Task added successfully!')
            setNewTask('')
        } else {
            toast.error('Task cannot be empty!')
        }
    }

    const removeTask = (index: number) => {
        const taskName = tasks[index]
        setTasks(tasks.filter((_, i) => i !== index))
        toast.success(`Task "${taskName}" removed successfully!`)
    }

    const toggleTask = (index: number) => {
        const updatedTasks = [...tasks]
        updatedTasks[index] = updatedTasks[index].startsWith('✓ ')
            ? updatedTasks[index].slice(2)
            : `✓ ${updatedTasks[index]}`
        setTasks(updatedTasks)
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-muted">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2 mb-4">
                        <Input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a task"
                        />
                        <Button onClick={addTask} variant="default">
                            Add
                        </Button>
                    </div>
                    <ul className="space-y-2">
                        {tasks.map((task, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-card px-4 py-2 rounded-md shadow-sm"
                            >
                                <span onClick={() => toggleTask(index)} className="cursor-pointer">
                                    {task}
                                </span>
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
