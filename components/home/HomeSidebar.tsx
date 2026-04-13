'use client'

import Badge from '@/components/ui/Badge'
import type { BusCompany, Route } from '@/types'
import { Search } from 'lucide-react'

interface HomeSidebarProps {
  from: string
  to: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  onSearch: () => void
  onPickRoute: (fromCity: string, toCity: string) => void
  popularRoutes: Route[]
  companies: BusCompany[]
}

export default function HomeSidebar({
  from,
  to,
  onFromChange,
  onToChange,
  onSearch,
  onPickRoute,
  popularRoutes,
  companies,
}: HomeSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <section className="border-b border-[#e0e0dc] p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#7a8a82]">
          Plan your trip
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 rounded-xl border border-[#d9e2dc] bg-white px-3 py-3 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1a6b3c]" />
            <input
              value={from}
              onChange={(event) => onFromChange(event.target.value)}
              placeholder="From - Origin city"
              className="w-full border-0 bg-transparent p-0 text-[#183427] outline-none placeholder:text-[#7a8a82]"
            />
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-[#d9e2dc] bg-white px-3 py-3 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
            <input
              value={to}
              onChange={(event) => onToChange(event.target.value)}
              placeholder="To - Destination city"
              className="w-full border-0 bg-transparent p-0 text-[#183427] outline-none placeholder:text-[#7a8a82]"
            />
          </label>
        </div>

        <button
          onClick={onSearch}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a6b3c] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Search className="h-4 w-4" />
          Find bus routes
        </button>
      </section>

      <section className="border-b border-[#e0e0dc] p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#7a8a82]">
          Popular routes
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularRoutes.map((route) => (
            <button
              key={route.id}
              onClick={() => onPickRoute(route.from, route.to)}
              className="rounded-full border border-[#d9e2dc] bg-white px-3 py-1.5 text-xs text-[#506157] hover:border-[#1a6b3c] hover:text-[#1a6b3c]"
            >
              {route.from} → {route.to}
            </button>
          ))}
        </div>
      </section>

      <section className="flex-1 overflow-y-auto p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#7a8a82]">
          Bus companies
        </h3>
        <div className="space-y-2">
          {companies.map((company) => (
            <article
              key={company.id}
              className="rounded-xl border border-[#d9e2dc] bg-white p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#183427]">{company.name}</p>
                  <p className="text-xs text-[#7a8a82]">{company.routes.length} routes</p>
                </div>
                <Badge variant="outline">{company.code}</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {company.types.map((type) => (
                  <Badge key={type} variant="outline" className="uppercase">
                    {type}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
