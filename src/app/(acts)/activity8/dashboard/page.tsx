'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
    Card,
    CardHeader,
    CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { handleSignOut } from '@/hooks/auth-actions'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ThemeChange } from '@/components/theme/theme-change'

type Todo = {
    id: string
    title: string
    completed: boolean
}

export default function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState('')
    const [isEditing, setIsEditing] = useState<string | null>(null)
    const [editText, setEditText] = useState('')

    // Fetch todos
    const fetchTodos = async () => {
        const response = await fetch('/api/todos')
        const data = await response.json()
        setTodos(data)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTodo.trim()) return

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTodo }),
            })

            if (response.ok) {
                setNewTodo('')
                fetchTodos()
                toast.success('Todo added successfully!')
            } else {
                toast.error('Failed to add todo')
            }
        } catch (error) {
            toast.error("An error occurred while adding the todo", {
                description: "->" + error
            })
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                fetchTodos()
                toast.success('Todo deleted successfully!')
            } else {
                toast.error('Failed to delete todo')
            }
        } catch (error) {
            toast.error("An error occurred while deleting the todo", {
                description: "->" + error
            })
        }
    }

    const handleUpdate = async (id: string, title: string) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            })

            if (response.ok) {
                setIsEditing(null)
                fetchTodos()
                toast.success('Todo updated successfully!')
            } else {
                toast.error('Failed to update todo')
            }
        } catch (error) {
            toast.error("An error occurred while updating the todo", {
                description: "->" + error
            })
        }
    }

    const handleToggle = async (id: string, completed: boolean) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed }),
            })

            if (response.ok) {
                fetchTodos()
                toast.success('Todo status updated!')
            } else {
                toast.error('Failed to update todo status')
            }
        } catch (error) {
            toast.error("An error occurred while updating the todo status", {
                description: "->" + error
            })
        }
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Card>
                    <CardHeader className="border-b border-border bg-gradient-to-r from-background to-muted">
                        <div className="w-full px-6 py-4">
                            <div className="flex items-center justify-between">
                                {/* Logo and Title Section */}
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                        TODO APP
                                    </h1>
                                </div>

                                {/* Actions Section */}
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 rounded-full bg-muted/50 backdrop-blur-sm">
                                        <ThemeChange />
                                    </div>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                className="px-6 font-semibold shadow-lg hover:shadow-red-500/20 transition-all duration-300"
                                            >
                                                Sign Out
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent className="sm:max-w-[425px]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-xl font-bold">
                                                    Sign Out Confirmation
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-muted-foreground">
                                                    You will need to sign in again to access your todo list.
                                                    Are you sure you want to continue?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="space-x-2">
                                                <AlertDialogCancel
                                                    className="hover:bg-muted/80 transition-colors"
                                                >
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleSignOut}
                                                    className="bg-destructive hover:bg-destructive/90 transition-colors"
                                                >
                                                    Sign Out
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="m-6">
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    placeholder="Add a new todo"
                                />
                                <Button type="submit" variant="default">
                                    Add
                                </Button>
                            </div>
                        </form>

                        <ul className="space-y-3">
                            {todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="flex items-center gap-3 p-3 rounded"
                                >
                                    <Checkbox
                                        checked={todo.completed}
                                        onCheckedChange={() => handleToggle(todo.id, todo.completed)}
                                    />

                                    {isEditing === todo.id ? (
                                        <div className="flex-1 flex gap-2">
                                            <Input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                            />
                                            <Button
                                                onClick={() => handleUpdate(todo.id, editText)}
                                                variant={"default"}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                onClick={() => setIsEditing(null)}
                                                variant={"secondary"}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <span
                                                className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                                            >
                                                {todo.title}
                                            </span>
                                            <Button
                                                onClick={() => {
                                                    setIsEditing(todo.id)
                                                    setEditText(todo.title)
                                                }}
                                                variant={"outline"}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(todo.id)}
                                                variant={"destructive"}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
