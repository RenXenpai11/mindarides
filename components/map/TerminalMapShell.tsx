'use client'

import dynamic from 'next/dynamic'
import type { Terminal } from '@/types'

const TerminalMap = dynamic(() => import('@/components/map/TerminalMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] items-center justify-center rounded-[28px] border border-[#d9e2dc] bg-white text-sm text-[#66746d]">
      Loading terminal map...
    </div>
  ),
})

interface TerminalMapShellProps {
  terminals: Terminal[]
}

export default function TerminalMapShell({ terminals }: TerminalMapShellProps) {
  return <TerminalMap terminals={terminals} />
}
