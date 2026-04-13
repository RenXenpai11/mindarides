'use client'

import dynamic from 'next/dynamic'
import type { PlannerRoute } from '@/types'

const RouteMap = dynamic(() => import('@/components/map/RouteMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[360px] items-center justify-center rounded-[28px] border border-[#d9e2dc] bg-white text-sm text-[#66746d]">
      Loading route map...
    </div>
  ),
})

interface RouteMapShellProps {
  route: PlannerRoute
}

export default function RouteMapShell({ route }: RouteMapShellProps) {
  return <RouteMap route={route} />
}
