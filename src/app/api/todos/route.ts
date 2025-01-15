import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const todos = await prisma.todo.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(todos)
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await request.json()
    const todo = await prisma.todo.create({
        data: {
            title: json.title,
            user: {
                connect: {
                    id: session.user.id
                }
            }
        },
    })

    return NextResponse.json(todo)
}