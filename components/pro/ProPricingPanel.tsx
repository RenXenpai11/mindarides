'use client'

import { useState } from 'react'
import { BellRing, Crown, Download, Heart, ShieldCheck, Sparkles, Star } from 'lucide-react'
import UpgradeModal from '@/components/pro/UpgradeModal'
import Badge from '@/components/ui/Badge'
import { membershipPlans } from '@/lib/data'
import { cn, formatPeso } from '@/lib/utils'

const perkIcons = [Heart, BellRing, Download, Star, Sparkles, ShieldCheck]

const perks = [
  'Save favorite routes',
  'Departure reminders',
  'Offline route access',
  'Full trip history',
  'Seat availability alerts',
  'No ads and priority support',
]

export default function ProPricingPanel() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly')
  const [open, setOpen] = useState(false)

  const activePlan = membershipPlans.find((plan) => plan.id === selectedPlan)!

  return (
    <>
      <section className="rounded-[32px] border border-[#d9e2dc] bg-white p-6 md:p-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="accent">7-day free trial</Badge>
            <h1 className="mt-3 text-3xl font-semibold text-[#183427]">
              Upgrade to MindaRide Pro
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#66746d]">
              Get route reminders, saved trips, offline access, and a cleaner travel dashboard.
            </p>
          </div>
          <div className="inline-flex rounded-full border border-[#d9e2dc] bg-[#f8fbf9] p-1">
            {membershipPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium text-[#66746d]',
                  selectedPlan === plan.id && 'bg-[#1a6b3c] text-white'
                )}
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[28px] bg-[#1a6b3c] p-6 text-white">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-[#EF9F27]" />
              <p className="font-medium">MindaRide Pro</p>
            </div>
            <p className="mt-6 text-4xl font-semibold">
              {formatPeso(activePlan.price)}
              <span className="text-base font-medium text-white/70">{activePlan.cadence}</span>
            </p>
            <p className="mt-3 text-sm text-white/80">{activePlan.caption}</p>
            <button
              onClick={() => setOpen(true)}
              className="mt-6 w-full rounded-full bg-[#EF9F27] px-4 py-3 text-sm font-semibold text-[#2f2410]"
            >
              Continue with PayMongo
            </button>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {perks.map((perk, index) => {
              const Icon = perkIcons[index % perkIcons.length]

              return (
                <article
                  key={perk}
                  className="rounded-3xl border border-[#d9e2dc] bg-[#f8fbf9] p-4"
                >
                  <Icon className="h-5 w-5 text-[#1a6b3c]" />
                  <p className="mt-3 text-sm font-medium text-[#183427]">{perk}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <UpgradeModal
        open={open}
        onClose={() => setOpen(false)}
        amount={activePlan.price}
        planLabel={activePlan.label}
      />
    </>
  )
}
