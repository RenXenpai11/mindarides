'use client'

import { PanelLeft, PanelLeftClose } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function Sidebar({
  title,
  description,
  children,
}: SidebarProps) {
  const [open, setOpen] = useState(true)

  return (
    <aside
      className={cn(
        'hidden border-r border-[#d9e2dc] bg-white md:flex md:min-h-[calc(100dvh-52px)] md:flex-col xl:w-[300px]',
        open ? 'md:w-[280px]' : 'md:w-[76px]'
      )}
    >
      <div className="flex items-center justify-between border-b border-[#eef2ef] px-4 py-4">
        <div className={cn('min-w-0', !open && 'md:hidden xl:block')}>
          <p className="text-sm font-semibold text-[#183427]">{title}</p>
          {description ? (
            <p className="mt-1 text-xs text-[#66746d]">{description}</p>
          ) : null}
        </div>
        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-[#d9e2dc] p-2 text-[#506157] xl:hidden"
          aria-label="Toggle sidebar"
        >
          {open ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className={cn('flex-1 overflow-y-auto p-4', !open && 'md:hidden xl:block')}>
        {children}
      </div>
    </aside>
  )
}
