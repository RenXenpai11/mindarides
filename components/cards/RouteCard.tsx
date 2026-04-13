import Badge from '@/components/ui/Badge'
import { getFareRange, getRoute } from '@/lib/data'
import { formatPeso } from '@/lib/utils'

interface RouteCardProps {
  routeId: string
}

export default function RouteCard({ routeId }: RouteCardProps) {
  const route = getRoute(routeId)

  if (!route) {
    return null
  }

  const fareRange = getFareRange(route.id)

  return (
    <article className="rounded-3xl border border-[#d9e2dc] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#66746d]">Popular route</p>
          <h3 className="mt-1 text-lg font-semibold text-[#183427]">
            {route.from} to {route.to}
          </h3>
        </div>
        <Badge>{route.companies.length} companies</Badge>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-[#7a8a82]">Distance</p>
          <p className="mt-1 font-medium text-[#183427]">{route.distance_km} km</p>
        </div>
        <div>
          <p className="text-[#7a8a82]">Travel time</p>
          <p className="mt-1 font-medium text-[#183427]">{route.duration_hrs} hrs</p>
        </div>
        <div>
          <p className="text-[#7a8a82]">Fare</p>
          <p className="mt-1 font-medium text-[#183427]">
            {formatPeso(fareRange.min)} to {formatPeso(fareRange.max)}
          </p>
        </div>
      </div>
    </article>
  )
}
