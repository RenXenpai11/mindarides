'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, BusFront, Crown, UserCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/plan', label: 'Plan a trip' },
  { href: '/routes', label: 'Routes' },
  { href: '/plan', label: 'Map' },
  { href: '/terminals', label: 'Terminals' },
  { href: '/', label: 'Bus companies' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-40 hidden h-[52px] border-b border-[#1f7d47] bg-[#1a6b3c] text-white xl:block">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-[0.01em]"
          >
            <BusFront className="h-5 w-5" />
            <span>MindaRide</span>
          </Link>
          <nav className="ml-4 flex items-center gap-1 text-sm text-white/80">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-white',
                  pathname === item.href && 'bg-white/10 text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/pro"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-[#EF9F27] px-3 py-1.5 text-sm font-medium text-[#2f2410]"
          >
            <Crown className="h-4 w-4" />
            Go Pro
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-white/85 transition hover:bg-white/10">
            <Bell className="h-4 w-4" />
          </button>
          <Link href="/profile" className="rounded-full border border-white/15 p-1.5">
            <UserCircle2 className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
