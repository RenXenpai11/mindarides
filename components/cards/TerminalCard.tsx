import Badge from '@/components/ui/Badge'
import type { Terminal } from '@/types'

interface TerminalCardProps {
  terminal: Terminal
}

export default function TerminalCard({ terminal }: TerminalCardProps) {
  return (
    <article className="rounded-3xl border border-[#d9e2dc] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#183427]">{terminal.name}</h3>
          <p className="mt-1 text-sm text-[#66746d]">
            {terminal.city}, {terminal.region}
          </p>
        </div>
        <Badge variant={terminal.type === 'main' ? 'default' : 'outline'}>
          {terminal.type}
        </Badge>
      </div>

      <p className="mt-4 text-sm text-[#506157]">{terminal.address}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {terminal.routes.map((route) => (
          <Badge key={route} variant="outline">
            {route}
          </Badge>
        ))}
      </div>
    </article>
  )
}
