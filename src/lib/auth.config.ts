// src/lib/auth.config.ts
import { prisma } from '@/lib/prisma'
import { signInSchema } from '@/lib/zod'
import { compare } from 'bcryptjs'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const authRoutes = ['/auth/sign-in', '/auth/sign-up']
const publicRoutes = ['/auth/sign-in', '/auth/sign-up']

export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = signInSchema.safeParse(credentials)
          if (!parsedCredentials.success) return null

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
            include: {
              accounts: {
                where: { provider: 'credentials' },
                select: { password: true },
              },
            },
          })

          if (!user || !user.accounts[0]?.password) return null

          const isPasswordValid = await compare(
            credentials.password as string,
            user.accounts[0].password
          )
          if (!isPasswordValid) return null

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl

      if (publicRoutes.includes(pathname)) {
        return true
      }

      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl))
        }
        return true
      }

      return isLoggedIn
    },

    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session }
      }

      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
        expires: session.expires
      }
    },
  },

  pages: {
    signIn: '/auth',
  },
} satisfies NextAuthConfig