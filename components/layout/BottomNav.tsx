'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, MapPinned, Route, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/routes', label: 'Routes', icon: Route },
  { href: '/plan', label: 'Map', icon: Map },
  { href: '/terminals', label: 'Terminals', icon: MapPinned },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d9e2dc] bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-5">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 px-2 py-3 text-[11px] font-medium text-[#7a8a82]',
                active && 'text-[#1a6b3c]'
              )}
            >
              <Icon className={cn('h-5 w-5', active && 'text-[#1a6b3c]')} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
