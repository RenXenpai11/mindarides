import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MindaRide',
  description: 'Your Mindanao Bus Companion',
  metadataBase: new URL('https://mindaride.vercel.app'),
  openGraph: {
    title: 'MindaRide',
    description: 'Your Mindanao Bus Companion',
    siteName: 'MindaRide',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#f5f7f6] text-[#183427] antialiased">{children}</body>
    </html>
  )
}
