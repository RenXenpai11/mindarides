import type { ComponentType } from 'react'
import { Bus, MapPin, Route, Warehouse } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
}

const statStyles: Record<
  string,
  {
    icon: ComponentType<{ className?: string }>
    iconBg: string
    iconColor: string
    displayLabel: string
  }
> = {
  'Routes tracked': {
    icon: Route,
    iconBg: 'bg-[#deeee5]',
    iconColor: 'text-[#1f7a49]',
    displayLabel: 'Total Routes',
  },
  'Bus companies': {
    icon: Bus,
    iconBg: 'bg-[#e3edf6]',
    iconColor: 'text-[#3488ca]',
    displayLabel: 'Bus Companies',
  },
  'Terminals listed': {
    icon: Warehouse,
    iconBg: 'bg-[#ebe1f4]',
    iconColor: 'text-[#8c4ac1]',
    displayLabel: 'Terminals',
  },
  'Cities covered': {
    icon: MapPin,
    iconBg: 'bg-[#f8edd9]',
    iconColor: 'text-[#e19d2e]',
    displayLabel: 'Cities Covered',
  },
}

export default function StatCard({ label, value }: StatCardProps) {
  const style = statStyles[label] ?? statStyles['Cities covered']
  const Icon = style.icon

  return (
    <article className="rounded-[14px] border border-[#cfd8d2] bg-white px-6 py-4">
      <div className="flex items-center gap-4">
        <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${style.iconBg}`}>
          <Icon className={`h-5 w-5 ${style.iconColor}`} />
        </span>
        <div>
          <p className="text-[40px] font-semibold leading-none text-[#0e2742]">{value}</p>
          <p className="mt-1 text-[26px] text-[#8a97a8]">{style.displayLabel}</p>
        </div>
      </div>
    </article>
  )
}
