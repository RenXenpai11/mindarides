import Link from 'next/link'
import { ArrowRight, Building2, Bus, Map, Route as RouteIcon, Search } from 'lucide-react'
import type { Route } from '@/types'
import { formatPeso } from '@/lib/utils'
import { getFareRange } from '@/lib/data'

interface HomeMobileContentProps {
  from: string
  to: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  onSearch: () => void
  routes: Route[]
  onPickRoute: (fromCity: string, toCity: string, navigateToPlan?: boolean) => void
}

export default function HomeMobileContent({
  from,
  to,
  onFromChange,
  onToChange,
  onSearch,
  routes,
  onPickRoute,
}: HomeMobileContentProps) {
  return (
    <section className="md:hidden">
      <div className="bg-[#1a6b3c] px-4 pb-16 pt-5 text-white">
        <p className="text-xs text-white/70">Good morning</p>
        <p className="mt-1 text-lg font-semibold">Where are you riding today?</p>
      </div>

      <div className="-mt-11 px-4">
        <div className="rounded-2xl border border-[#d9e2dc] bg-white p-4">
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded-xl border border-[#d9e2dc] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1a6b3c]" />
              <input value={from} onChange={(event) => onFromChange(event.target.value)} placeholder="From - Origin city" className="w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-[#7a8a82]" />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-[#d9e2dc] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
              <input value={to} onChange={(event) => onToChange(event.target.value)} placeholder="To - Destination city" className="w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-[#7a8a82]" />
            </label>
          </div>
          <button onClick={onSearch} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a6b3c] px-4 py-2.5 text-sm font-medium text-white">
            <Search className="h-4 w-4" />
            Find Bus Routes
          </button>
        </div>
      </div>

      <div className="mt-5 px-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#7a8a82]">Quick access</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/plan" className="rounded-2xl bg-[#1a6b3c] p-4 text-white"><Map className="h-5 w-5" /><p className="mt-2 text-sm font-medium">Plan a trip</p></Link>
          <Link href="/routes" className="rounded-2xl border border-[#d9e2dc] bg-white p-4 text-[#183427]"><RouteIcon className="h-5 w-5 text-[#1a6b3c]" /><p className="mt-2 text-sm font-medium">Schedules</p></Link>
          <Link href="/routes" className="rounded-2xl border border-[#d9e2dc] bg-white p-4 text-[#183427]"><Bus className="h-5 w-5 text-[#1a6b3c]" /><p className="mt-2 text-sm font-medium">Route map</p></Link>
          <Link href="/terminals" className="rounded-2xl border border-[#d9e2dc] bg-white p-4 text-[#183427]"><Building2 className="h-5 w-5 text-[#1a6b3c]" /><p className="mt-2 text-sm font-medium">Terminals</p></Link>
        </div>
      </div>

      <div className="mt-5 px-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#7a8a82]">Recent trips</h3>
        <div className="overflow-hidden rounded-2xl border border-[#d9e2dc] bg-white">
          {routes.slice(0, 3).map((route, index) => {
            const fare = getFareRange(route.id)
            return (
              <button
                key={route.id}
                onClick={() => onPickRoute(route.from, route.to, true)}
                className="flex w-full items-center gap-2 px-4 py-3 text-left"
              >
                <div className="flex min-w-0 flex-1 items-center gap-1.5 text-xs text-[#506157]">
                  <span className="h-2 w-2 rounded-full bg-[#1a6b3c]" />
                  <span className="truncate">{route.from}</span>
                  <ArrowRight className="h-3 w-3 text-[#9aa69f]" />
                  <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
                  <span className="truncate">{route.to}</span>
                </div>
                <span className="text-xs font-medium text-[#506157]">
                  {formatPeso(fare.min)}-{formatPeso(fare.max)}
                </span>
                {index < 2 ? <span className="absolute -bottom-px left-4 right-4 h-px bg-[#e9efeb]" /> : null}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
