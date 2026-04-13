'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Bell } from 'lucide-react'

interface NavbarProps {
  onMenuToggle?: () => void
}

const navLinks = [
  { href: '/', label: 'Plan a trip' },
  { href: '/routes', label: 'Routes' },
  { href: '/plan', label: 'Map' },
  { href: '/terminals', label: 'Terminals' },
]

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 flex items-center px-4 lg:px-6"
      style={{ height: '52px', backgroundColor: '#1a6b3c' }}
    >
      <Link href="/" className="mr-8 flex flex-shrink-0 items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
          </svg>
        </div>
        <span className="hidden text-base font-semibold tracking-tight text-white sm:block">
          MindaRide
        </span>
      </Link>

      <button
        className="ml-auto rounded p-1.5 text-white hover:bg-white/10 lg:hidden"
        onClick={onMenuToggle}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden flex-1 items-center gap-1 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              isActive(link.href)
                ? 'bg-white/20 text-white'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/pro"
          className="rounded-full px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          Bus companies
        </Link>
      </div>

      <div className="ml-auto hidden items-center gap-3 lg:flex">
        <button className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
          <Bell className="h-[18px] w-[18px]" />
        </button>
        <Link href="/pro">
          <span
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: '#EF9F27', color: '#7c3a00' }}
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1l1.5 3h3l-2.4 1.8.9 3L6 7.2 3 8.8l.9-3L1.5 4h3L6 1z" />
            </svg>
            Go Pro
          </span>
        </Link>
        <Link href="/profile">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 text-sm font-semibold text-white"
            style={{ backgroundColor: '#0f6e56' }}
          >
            JD
          </div>
        </Link>
      </div>
    </nav>
  )
}
