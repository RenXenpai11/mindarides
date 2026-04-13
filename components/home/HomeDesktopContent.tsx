import Link from 'next/link'
import RouteCard from '@/components/cards/RouteCard'
import StatCard from '@/components/ui/StatCard'
import type { BusCompany, Route } from '@/types'
import { ChevronRight, Search } from 'lucide-react'

interface HomeDesktopContentProps {
  from: string
  to: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  onSearch: () => void
  stats: Array<{ label: string; value: string }>
  routes: Route[]
  companies: BusCompany[]
}

export default function HomeDesktopContent({
  from,
  to,
  onFromChange,
  onToChange,
  onSearch,
  stats,
  routes,
  companies,
}: HomeDesktopContentProps) {
  return (
    <section className="hidden px-4 py-5 md:block md:px-5 xl:px-4">
      <div className="mb-5 rounded-[18px] bg-[#1a6b3c] p-4 md:p-5">
        <p className="text-sm font-medium text-white/90">Plan your trip</p>
        <p className="mt-1 text-xs text-white/70">Search terminals, routes, and schedules</p>

        <div className="mt-3 rounded-2xl bg-white p-3">
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
            <label className="flex items-center gap-2 rounded-xl border border-[#d9e2dc] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1a6b3c]" />
              <input
                value={from}
                onChange={(event) => onFromChange(event.target.value)}
                placeholder="From city"
                className="w-full border-0 bg-transparent p-0 text-sm text-[#183427] outline-none placeholder:text-[#7a8a82]"
              />
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-[#d9e2dc] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
              <input
                value={to}
                onChange={(event) => onToChange(event.target.value)}
                placeholder="To city"
                className="w-full border-0 bg-transparent p-0 text-sm text-[#183427] outline-none placeholder:text-[#7a8a82]"
              />
            </label>

            <button
              onClick={onSearch}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a6b3c] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <Search className="h-4 w-4" />
              Find bus routes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[31px] font-semibold leading-tight text-[#183427]">Popular routes today</h2>
          <Link
            href="/routes"
            className="inline-flex items-center gap-1.5 text-[28px] font-medium text-[#1a6b3c]"
          >
            View all
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {routes.slice(0, 6).map((route) => (
            <RouteCard key={route.id} routeId={route.id} />
          ))}
        </div>
      </section>
    </section>
  )
}
