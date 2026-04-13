import Badge from '@/components/ui/Badge'
import SearchInput from '@/components/ui/SearchInput'
import Sidebar from '@/components/layout/Sidebar'
import RouteMapShell from '@/components/map/RouteMapShell'
import {
  busCompanies,
  getPlannerRouteByCities,
  plannerRoute,
} from '@/lib/data'
import { formatPeso } from '@/lib/utils'

interface PlanPageProps {
  searchParams?: {
    from?: string | string[]
    to?: string | string[]
  }
}

export default function PlanPage({ searchParams }: PlanPageProps) {
  const fromQuery = Array.isArray(searchParams?.from)
    ? searchParams?.from[0] ?? ''
    : searchParams?.from ?? ''
  const toQuery = Array.isArray(searchParams?.to)
    ? searchParams?.to[0] ?? ''
    : searchParams?.to ?? ''

  const selectedRoute = getPlannerRouteByCities(fromQuery, toQuery) ?? plannerRoute

  const stopovers = selectedRoute.stopovers.slice(1, -1)
  const availableCompanies = busCompanies.filter((company) =>
    selectedRoute.companies.includes(company.id)
  )

  return (
    <main className="xl:flex">
      <Sidebar
        title="Trip planner"
        description="Search terminals, compare operators, and preview the live route line."
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <SearchInput
              placeholder="From: Davao City"
              defaultValue={selectedRoute.from}
            />
            <SearchInput
              placeholder="To: Surigao City"
              defaultValue={selectedRoute.to}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['Today', 'Aircon', 'Morning trip', '1 transfer max'].map((chip) => (
              <Badge key={chip} variant="outline">
                {chip}
              </Badge>
            ))}
          </div>

          <article className="rounded-3xl border border-[#d9e2dc] bg-[#f8fbf9] p-4">
            <p className="text-sm text-[#66746d]">Best match</p>
            <h2 className="mt-1 text-lg font-semibold text-[#183427]">
              {selectedRoute.from} to {selectedRoute.to}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#506157]">
              <p>{selectedRoute.distance_km} km</p>
              <p>{selectedRoute.duration_hrs} hrs</p>
              <p>{formatPeso(selectedRoute.fare_min)}</p>
              <p>{stopovers.length} stopovers</p>
            </div>
          </article>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66746d]">
              Available companies
            </p>
            <div className="mt-3 space-y-2">
              {availableCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="rounded-2xl border border-[#d9e2dc] bg-white px-4 py-3"
                  >
                    <p className="font-medium text-[#183427]">{company.name}</p>
                    <p className="mt-1 text-sm text-[#66746d]">
                      {company.types.join(' • ')}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </Sidebar>

      <section className="flex-1 px-4 py-4 md:px-6 md:py-6 xl:px-8">
        <div className="rounded-[28px] border border-[#d9e2dc] bg-white p-3">
          <RouteMapShell route={selectedRoute} />
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm shadow-[#183427]/[0.04]">
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <p className="text-sm text-[#66746d]">Distance</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {selectedRoute.distance_km} km
              </p>
            </div>
            <div>
              <p className="text-sm text-[#66746d]">Travel time</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {selectedRoute.duration_hrs} hrs
              </p>
            </div>
            <div>
              <p className="text-sm text-[#66746d]">Fare</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {formatPeso(selectedRoute.fare_min)} to {formatPeso(selectedRoute.fare_max)}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#66746d]">Stopovers</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {stopovers.length
                  ? stopovers.map((stop) => stop.name).join(', ')
                  : 'Direct route'}
              </p>
            </div>
            <button className="rounded-full bg-[#1a6b3c] px-4 py-3 text-sm font-medium text-white">
              Save route
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
