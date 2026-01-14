import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sf-pro',
})

export const metadata: Metadata = {
  title: 'SaveGuard - AI-Powered Subscription Management',
  description: 'Automatically detect, negotiate, and cancel wasteful subscriptions. Built for Canadians.',
  keywords: 'subscription management, save money, AI agent, Canadian fintech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}