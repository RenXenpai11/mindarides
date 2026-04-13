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
  const totalMinutes = Math.round(route.duration_hrs * 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const duration = `${hours}h ${minutes.toString().padStart(2, '0')}m`

  return (
    <article className="rounded-[16px] border border-[#d7dfda] bg-white px-4 py-3.5">
      <div className="flex items-center gap-2 text-[15px] text-[#1f3652]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#15713e]" />
        <span>{route.from}</span>
        <span className="text-[#c0cac4]">-&gt;</span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#d94949]" />
        <span>{route.to}</span>
      </div>

      <p className="mt-2.5 text-[36px] font-semibold leading-none tracking-[-0.02em] text-[#09223d]">
        {formatPeso(fareRange.min)}-{formatPeso(fareRange.max)}
      </p>

      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-[28px] text-[#8b98a8]">
          {duration} · {route.distance_km} km
        </p>
        <span className="rounded-full bg-[#e6f3ea] px-3 py-1 text-[25px] font-medium text-[#1f7a49]">
          {route.companies.length} buses
        </span>
      </div>
    </article>
  )
}
