// src\lib\prisma.ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
})

if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}