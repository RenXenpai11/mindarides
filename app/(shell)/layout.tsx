import type { ReactNode } from 'react'
import BottomNav from '@/components/layout/BottomNav'
import Navbar from '@/components/layout/Navbar'

export default function ShellLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className="pb-20 xl:pb-0 xl:pt-[52px]">{children}</div>
      <BottomNav />
    </div>
  )
}
