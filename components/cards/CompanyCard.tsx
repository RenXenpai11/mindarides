import Badge from '@/components/ui/Badge'
import type { BusCompany } from '@/types'

interface CompanyCardProps {
  company: BusCompany
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <article className="rounded-3xl border border-[#d9e2dc] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7a8a82]">
            {company.code}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[#183427]">{company.name}</h3>
        </div>
        <span className="h-4 w-4 rounded-full" style={{ backgroundColor: company.color }} />
      </div>

      <p className="mt-4 text-sm text-[#66746d]">{company.routes.length} active Mindanao routes</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {company.types.map((type) => (
          <Badge key={type} variant="outline" className="uppercase">
            {type}
          </Badge>
        ))}
      </div>
    </article>
  )
}
