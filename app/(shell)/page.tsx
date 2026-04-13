import Link from 'next/link'
import { Search } from 'lucide-react'
import CompanyCard from '@/components/cards/CompanyCard'
import RouteCard from '@/components/cards/RouteCard'
import StatCard from '@/components/ui/StatCard'
import {
  busCompanies,
  featuredStats,
  quickAccessItems,
  routes,
} from '@/lib/data'

export default function HomePage() {
  return (
    <main className="px-4 py-4 md:px-6 md:py-6 xl:px-8">
      <section>
        <div className="rounded-[32px] bg-[#1a6b3c] px-5 py-6 text-white md:px-8 md:py-9">
          <p className="text-sm uppercase tracking-[0.18em] text-white/70">
            Your Mindanao Bus Companion
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
            Where are you riding today?
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
            Plan bus trips across Mindanao, compare fares, and keep your favorite
            routes in one clean dashboard.
          </p>

          <div className="mx-6 -mb-6 mt-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row">
              <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#d9e2dc] bg-white px-4 py-3 text-sm text-[#506157]">
                <input
                  placeholder="From city"
                  className="w-full border-0 bg-transparent p-0 text-[#183427] outline-none placeholder:text-[#7a8a82]"
                />
              </label>
              <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#d9e2dc] bg-white px-4 py-3 text-sm text-[#506157]">
                <input
                  placeholder="To city"
                  className="w-full border-0 bg-transparent p-0 text-[#183427] outline-none placeholder:text-[#7a8a82]"
                />
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a6b3c] px-5 py-3 text-sm font-medium text-white md:px-6">
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:hidden">
            {quickAccessItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl bg-white/10 px-4 py-4 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {featuredStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#183427]">Popular routes</h2>
            <Link href="/routes" className="text-sm font-medium text-[#1a6b3c]">
              View schedules
            </Link>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {routes.slice(0, 4).map((route) => (
              <RouteCard key={route.id} routeId={route.id} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#183427]">Bus companies</h2>
            <Link href="/plan" className="text-sm font-medium text-[#1a6b3c]">
              Open trip planner
            </Link>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {busCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
