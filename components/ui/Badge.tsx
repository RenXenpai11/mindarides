import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline' | 'success'
  className?: string
}

const variants = {
  default: 'bg-[#e7f1eb] text-[#1a6b3c]',
  accent: 'bg-[#fff2dd] text-[#9a5e0d]',
  outline: 'border border-[#d9e2dc] text-[#506157]',
  success: 'bg-[#edf8f1] text-[#166534]',
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

type BusType = 'aircon' | 'ordinary' | 'premium'

interface BusTypeBadgeProps {
  type: BusType
}

const busTypeStyles: Record<BusType, { bg: string; text: string; label: string }> = {
  aircon: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Air-Con' },
  ordinary: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Ordinary' },
  premium: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Premium' },
}

export function BusTypeBadge({ type }: BusTypeBadgeProps) {
  const style = busTypeStyles[type] || busTypeStyles.ordinary
  return (
    <span className={cn('inline-flex items-center rounded-full px-2 py-1 text-xs font-medium', style.bg, style.text)}>
      {style.label}
    </span>
  )
}
