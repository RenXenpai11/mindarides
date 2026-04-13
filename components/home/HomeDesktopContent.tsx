import Link from 'next/link'
import CompanyCard from '@/components/cards/CompanyCard'
import RouteCard from '@/components/cards/RouteCard'
import StatCard from '@/components/ui/StatCard'
import type { BusCompany, Route } from '@/types'
import { Search } from 'lucide-react'

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
    <section className="hidden px-6 py-6 md:block xl:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-[#1a6b3c] px-6 py-8 text-white xl:px-8 xl:py-9">
        <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-40 h-24 w-24 rounded-full bg-white/10" />

        <p className="text-sm uppercase tracking-[0.16em] text-white/70">Your Mindanao Bus Companion</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight xl:text-5xl">
          Where are you riding today?
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/80 xl:text-base">
          Plan bus trips across Mindanao, compare fares, and keep your favorite routes in one clean dashboard.
        </p>

        <div className="mt-8 rounded-2xl border border-[#d9e2dc] bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-[#d9e2dc] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1a6b3c]" />
              <input
                value={from}
                onChange={(event) => onFromChange(event.target.value)}
                placeholder="From city"
                className="w-full border-0 bg-transparent p-0 text-sm text-[#183427] outline-none placeholder:text-[#7a8a82]"
              />
            </label>
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-[#d9e2dc] px-3 py-2.5">
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
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#183427]">Popular routes</h2>
          <Link href="/routes" className="text-sm font-medium text-[#1a6b3c]">View schedules</Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {routes.slice(0, 4).map((route) => (
            <RouteCard key={route.id} routeId={route.id} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-[#183427]">Bus companies</h2>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {companies.slice(0, 6).map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>
    </section>
  )
}
