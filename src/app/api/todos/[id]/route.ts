// src/app/api/todos/[id]/route.ts
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await auth()
    if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await request.json()
    const todo = await prisma.todo.updateMany({
        where: {
            id: params.id,
            userId: session.user.id,
        },
        data: json,
    })

    return NextResponse.json(todo)
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await auth()
    if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    await prisma.todo.deleteMany({
        where: {
            id: params.id,
            userId: session.user.id,
        },
    })

    return new NextResponse(null, { status: 204 })
}