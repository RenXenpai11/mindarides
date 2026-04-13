import Badge from '@/components/ui/Badge'
import SearchInput from '@/components/ui/SearchInput'
import Sidebar from '@/components/layout/Sidebar'
import RouteMapShell from '@/components/map/RouteMapShell'
import { busCompanies, plannerRoute } from '@/lib/data'
import { formatPeso } from '@/lib/utils'

export default function PlanPage() {
  return (
    <main className="xl:flex">
      <Sidebar
        title="Trip planner"
        description="Search terminals, compare operators, and preview the live route line."
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <SearchInput placeholder="From: Davao City" defaultValue="Davao City" />
            <SearchInput placeholder="To: Surigao City" defaultValue="Surigao City" />
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
              {plannerRoute.from} to {plannerRoute.to}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#506157]">
              <p>{plannerRoute.distance_km} km</p>
              <p>{plannerRoute.duration_hrs} hrs</p>
              <p>{formatPeso(plannerRoute.fare_min)}</p>
              <p>{plannerRoute.stopovers.length - 2} stopovers</p>
            </div>
          </article>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66746d]">
              Available companies
            </p>
            <div className="mt-3 space-y-2">
              {busCompanies
                .filter((company) => plannerRoute.companies.includes(company.id))
                .map((company) => (
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
          <RouteMapShell route={plannerRoute} />
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm shadow-[#183427]/[0.04]">
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <p className="text-sm text-[#66746d]">Distance</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {plannerRoute.distance_km} km
              </p>
            </div>
            <div>
              <p className="text-sm text-[#66746d]">Travel time</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {plannerRoute.duration_hrs} hrs
              </p>
            </div>
            <div>
              <p className="text-sm text-[#66746d]">Fare</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {formatPeso(plannerRoute.fare_min)} to {formatPeso(plannerRoute.fare_max)}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#66746d]">Stopovers</p>
              <p className="mt-1 font-semibold text-[#183427]">
                {plannerRoute.stopovers.slice(1, -1).map((stop) => stop.name).join(', ')}
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
