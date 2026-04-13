'use client'

import { X } from 'lucide-react'
import { formatPeso } from '@/lib/utils'

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
  amount: number
  planLabel: string
}

export default function UpgradeModal({
  open,
  onClose,
  amount,
  planLabel,
}: UpgradeModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#183427]/40 p-4 md:items-center">
      <div className="w-full max-w-md rounded-[28px] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#1a6b3c]">Checkout summary</p>
            <h3 className="mt-1 text-xl font-semibold text-[#183427]">MindaRide Pro</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#d9e2dc] p-2 text-[#66746d]"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 rounded-3xl border border-[#d9e2dc] bg-[#f8fbf9] p-4">
          <p className="text-sm text-[#66746d]">{planLabel} membership</p>
          <p className="mt-2 text-3xl font-semibold text-[#183427]">{formatPeso(amount)}</p>
          <p className="mt-2 text-sm text-[#66746d]">
            PayMongo checkout wiring is scaffolded and ready for your live keys.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-[#1a6b3c] px-4 py-3 text-sm font-medium text-white"
        >
          Close preview
        </button>
      </div>
    </div>
  )
}
