import './globals.css'

import localFont from 'next/font/local'

import { Metadata } from 'next'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/custom/provider/theme-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Quanby Demo',
  description: '',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${geistSans.className} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className='text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >

          <SessionProvider>
            {children}
          </SessionProvider>

          <Toaster
            position='top-right'
            richColors
            closeButton
            theme='system'
            className='toaster-override'
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
