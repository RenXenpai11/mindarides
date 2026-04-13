import Badge from '@/components/ui/Badge'
import { getCompany, getRoute } from '@/lib/data'
import { formatPeso } from '@/lib/utils'
import type { Schedule } from '@/types'

interface ScheduleCardProps {
  schedule: Schedule
}

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  const route = getRoute(schedule.route_id)
  const company = getCompany(schedule.company_id)

  if (!route || !company) {
    return null
  }

  return (
    <article className="rounded-3xl border border-[#d9e2dc] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#66746d]">{company.name}</p>
          <h3 className="mt-1 text-base font-semibold text-[#183427]">
            {route.from} to {route.to}
          </h3>
        </div>
        <Badge variant="accent" className="uppercase">
          {schedule.bus_type}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#506157]">
        <p>Departs {schedule.departure_time}</p>
        <p>Arrives {schedule.arrival_time}</p>
        <p>{formatPeso(schedule.fare_min)} to {formatPeso(schedule.fare_max)}</p>
        <p>{route.duration_hrs} hrs</p>
      </div>

      <p className="mt-4 text-sm text-[#66746d]">{schedule.days.join(' • ')}</p>
    </article>
  )
}
