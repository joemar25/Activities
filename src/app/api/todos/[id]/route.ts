import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    const session = await auth()
    if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = await context.params
    const json = await request.json()
    const todo = await prisma.todo.updateMany({
        where: {
            id,
            userId: session.user.id,
        },
        data: json,
    })

    return NextResponse.json(todo)
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    const session = await auth()
    if (!session?.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = await context.params
    await prisma.todo.deleteMany({
        where: {
            id,
            userId: session.user.id,
        },
    })

    return new NextResponse(null, { status: 204 })
}