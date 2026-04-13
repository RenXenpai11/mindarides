import { Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProBadgeProps {
  className?: string
}

export default function ProBadge({ className }: ProBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-[#fff2dd] px-3 py-1.5 text-sm font-medium text-[#9a5e0d]',
        className
      )}
    >
      <Crown className="h-4 w-4" />
      MindaRide Pro Member
    </span>
  )
}
