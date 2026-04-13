'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import HomeDesktopContent from '@/components/home/HomeDesktopContent'
import HomeMobileContent from '@/components/home/HomeMobileContent'
import HomeSidebar from '@/components/home/HomeSidebar'
import Sidebar from '@/components/layout/Sidebar'
import { busCompanies, featuredStats, routes } from '@/lib/data'

export default function HomePage() {
  const router = useRouter()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const popularRoutes = useMemo(() => routes.slice(0, 6), [])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (from.trim()) params.set('from', from.trim())
    if (to.trim()) params.set('to', to.trim())

    const query = params.toString()
    router.push(query ? `/plan?${query}` : '/plan')
  }

  const handlePickRoute = (fromCity: string, toCity: string, navigateToPlan = false) => {
    setFrom(fromCity)
    setTo(toCity)

    if (navigateToPlan) {
      const params = new URLSearchParams({ from: fromCity, to: toCity })
      router.push(`/plan?${params.toString()}`)
    }
  }

  return (
    <main className="min-h-[calc(100dvh-52px)] md:flex">
      <Sidebar
        title="Plan your trip"
        description="Search terminals, routes, and schedules"
      >
        <HomeSidebar
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
          onSearch={handleSearch}
          onPickRoute={handlePickRoute}
          popularRoutes={popularRoutes}
          companies={busCompanies.slice(0, 4)}
        />
      </Sidebar>

      <div className="min-w-0 flex-1">
        <HomeDesktopContent
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
          onSearch={handleSearch}
          stats={featuredStats}
          routes={routes}
          companies={busCompanies}
        />

        <HomeMobileContent
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
          onSearch={handleSearch}
          routes={routes}
          onPickRoute={handlePickRoute}
        />
      </div>
    </main>
  )
}
