import Badge from '@/components/ui/Badge'
import SearchInput from '@/components/ui/SearchInput'
import ScheduleCard from '@/components/cards/ScheduleCard'
import { getCompany, getRoute, schedules } from '@/lib/data'
import { formatPeso } from '@/lib/utils'

export default function RoutesPage() {
  return (
    <main className="px-4 py-4 md:px-6 md:py-6 xl:px-8">
      <section className="space-y-4 md:hidden">
        <div className="rounded-[28px] bg-white p-4">
          <p className="text-sm font-semibold text-[#183427]">Filters</p>
          <div className="mt-4 space-y-3">
            <SearchInput placeholder="Search route, city, or company" />
            <div className="flex flex-wrap gap-2">
              {['All routes', 'Aircon', 'Premium', 'Morning'].map((filter) => (
                <Badge key={filter} variant="outline">
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 hidden items-center justify-between md:flex">
          <div>
            <h1 className="text-2xl font-semibold text-[#183427]">Routes & Schedules</h1>
            <p className="mt-1 text-sm text-[#66746d]">
              Compare departure times, fares, and bus types across Mindanao routes.
            </p>
          </div>
          <p className="text-sm text-[#66746d]">{schedules.length} results</p>
        </div>

        <div className="hidden overflow-hidden rounded-[28px] border border-[#d9e2dc] bg-white lg:block">
          <div className="grid grid-cols-[1.8fr_1.2fr_0.8fr_0.8fr_1fr_1fr_0.8fr] gap-4 border-b border-[#eef2ef] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#66746d]">
            <p>Route</p>
            <p>Company</p>
            <p>Type</p>
            <p>Departs</p>
            <p>Fare</p>
            <p>Travel time</p>
            <p>Book</p>
          </div>
          {schedules.map((schedule) => {
            const route = getRoute(schedule.route_id)
            const company = getCompany(schedule.company_id)

            if (!route || !company) {
              return null
            }

            return (
              <div
                key={schedule.id}
                className="grid grid-cols-[1.8fr_1.2fr_0.8fr_0.8fr_1fr_1fr_0.8fr] gap-4 border-b border-[#eef2ef] px-5 py-4 text-sm text-[#506157] last:border-b-0"
              >
                <p className="font-medium text-[#183427]">
                  {route.from} to {route.to}
                </p>
                <p>{company.name}</p>
                <p className="uppercase">{schedule.bus_type}</p>
                <p>{schedule.departure_time}</p>
                <p>
                  {formatPeso(schedule.fare_min)} to {formatPeso(schedule.fare_max)}
                </p>
                <p>{route.duration_hrs} hrs</p>
                <button className="rounded-full border border-[#1a6b3c] px-3 py-1.5 font-medium text-[#1a6b3c]">
                  Book
                </button>
              </div>
            )
          })}
        </div>

        <div className="space-y-4 lg:hidden">
          {schedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </section>
    </main>
  )
}
