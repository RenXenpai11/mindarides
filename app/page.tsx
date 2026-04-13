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
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section>
        <div className="rounded-2xl bg-[#1a6b3c] px-6 py-8 text-white md:px-8 md:py-10">
          <p className="text-sm uppercase tracking-wide text-white/70">
            Your Mindanao Bus Companion
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            Where are you riding today?
          </h1>
          <p className="mt-2 text-white/80">
            Plan bus trips across Mindanao, compare fares, and book your ride.
          </p>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="flex gap-3 rounded-lg bg-white p-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search route or bus company..."
                className="flex-1 outline-none"
              />
              <button className="rounded-lg bg-[#1a6b3c] px-4 py-2 text-white">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {featuredStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Bus Companies */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Bus companies</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {busCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Popular routes</h2>
          <Link href="/routes" className="text-sm font-medium text-[#1a6b3c]">
            View all routes →
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {routes.slice(0, 4).map((route) => (
            <RouteCard key={route.id} routeId={route.id} />
          ))}
        </div>
      </section>
    </main>
  )
}
