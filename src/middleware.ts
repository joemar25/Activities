// src/middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl

    // Auth routes handling
    if (pathname === "/activity8") {
        if (session) {
            return NextResponse.redirect(new URL("/activity8", request.url))
        }
        return NextResponse.next()
    }

    // Protected routes (including API routes)
    if (pathname.startsWith("/activity8") || pathname.startsWith("/api/activity8")) {
        if (!session) {
            // For API routes, return 401 instead of redirecting
            if (pathname.startsWith("/api/")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            }
            return NextResponse.redirect(new URL("/activity8", request.url))
        }
        return NextResponse.next()
    }

    // Restrict access to /users and its sub-routes to admins only
    if (pathname.startsWith("/users")) {
        if (!session) {
            return NextResponse.redirect(new URL("/activity8", request.url))
        }

        // Check if the user is an admin
        if (pathname.startsWith("/api/")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/activity8",
        "/activity8/:path*",
        "/api/dashboard/:path*",
    ]
}