'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  MapPin,
  Search,
  ArrowRight,
  Bus,
  Route,
  Building2,
  Map,
  ChevronRight,
} from 'lucide-react'

type BusType = 'aircon' | 'ordinary' | 'premium'

interface BusCompany {
  id: string
  name: string
  logo: string
  color: string
  routes: number
  types: BusType[]
  cities: string[]
}

interface PopularRoute {
  id: string
  from: string
  to: string
}

const quickStats = [
  { label: 'Total Routes', value: '24', icon: Route, color: '#1a6b3c' },
  { label: 'Bus Companies', value: '8', icon: Bus, color: '#2980b9' },
  { label: 'Terminals', value: '12', icon: Building2, color: '#8e44ad' },
  { label: 'Cities Covered', value: '30+', icon: MapPin, color: '#EF9F27' },
]

const routeCards = [
  { from: 'Davao City', to: 'Tagum City', duration: '1h 30m', fare: 'P110-P180', buses: 2, distance: '56 km' },
  { from: 'Davao City', to: 'Surigao City', duration: '9h 30m', fare: 'P620-P860', buses: 3, distance: '471 km' },
  { from: 'Davao City', to: 'Cagayan de Oro', duration: '7h 30m', fare: 'P480-P690', buses: 3, distance: '393 km' },
  { from: 'Davao City', to: 'Butuan City', duration: '5h 00m', fare: 'P390-P480', buses: 2, distance: '237 km' },
  { from: 'Davao City', to: 'Cotabato City', duration: '5h 00m', fare: 'P350-P420', buses: 3, distance: '196 km' },
  { from: 'CDO', to: 'Iligan City', duration: '1h 30m', fare: 'P90-P120', buses: 1, distance: '92 km' },
]

const busCompanies: BusCompany[] = [
  { id: 'cl', name: 'Ceres Liner', logo: 'CL', color: '#1a6b3c', routes: 12, types: ['aircon', 'ordinary'], cities: ['Davao City', 'CDO', 'Surigao City'] },
  { id: 'be', name: 'Bachelor Express', logo: 'BE', color: '#c62828', routes: 8, types: ['aircon', 'premium'], cities: ['Davao City', 'CDO', 'General Santos'] },
  { id: 'rtm', name: 'Rural Transit Mindanao', logo: 'RTM', color: '#1565c0', routes: 10, types: ['ordinary', 'aircon'], cities: ['Davao City', 'Surigao City', 'Butuan City'] },
  { id: 'dms', name: 'Davao Metro Shuttle', logo: 'DMS', color: '#7b1fa2', routes: 6, types: ['aircon'], cities: ['Davao City', 'Tagum City', 'Mati City'] },
  { id: 'ms', name: 'Mindanao Star', logo: 'MS', color: '#e65100', routes: 7, types: ['aircon', 'premium'], cities: ['Davao City', 'CDO', 'Iligan City'] },
  { id: 've', name: 'Valley Express', logo: 'VE', color: '#2e7d32', routes: 5, types: ['ordinary', 'aircon'], cities: ['Davao City', 'General Santos', 'Cotabato City'] },
]

// Collect unique city names for autocomplete
const allCities = Array.from(
  new Set(
    busCompanies.flatMap((c) => c.cities)
      .concat(routeCards.flatMap((r) => [r.from, r.to]))
  )
).sort()

const popularRoutes: PopularRoute[] = [
  { id: '1', from: 'Davao', to: 'Tagum City' },
  { id: '2', from: 'Davao', to: 'Surigao City' },
  { id: '3', from: 'Davao', to: 'Cagayan de Oro' },
  { id: '4', from: 'Davao', to: 'Cotabato' },
  { id: '5', from: 'Davao', to: 'Butuan' },
  { id: '6', from: 'CDO', to: 'Iligan' },
]

const busTypeBadgeStyles: Record<BusType, string> = {
  aircon: 'bg-[#e8f5ee] text-[#1a6b3c]',
  ordinary: 'bg-[#fff3e0] text-[#c77700]',
  premium: 'bg-[#ede7f6] text-[#5e35b1]',
}

function BusTypeBadge({ type }: { type: BusType }) {
  return (
    <span className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full capitalize ${busTypeBadgeStyles[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}


export default function Page() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [fromFocus, setFromFocus] = useState(false)
  const [toFocus, setToFocus] = useState(false)
  const [fromHover, setFromHover] = useState(false)
  const [toHover, setToHover] = useState(false)
  const router = useRouter()

  const fromInputRef = useRef<HTMLInputElement>(null)
  const toInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const fromValue = from.trim()
    const toValue = to.trim()

    if (!fromValue || !toValue) {
      return
    }

    router.push(`/plan?from=${encodeURIComponent(fromValue)}&to=${encodeURIComponent(toValue)}`)
  }

  // Filtered suggestions
  const fromSuggestions = from.length > 0
    ? allCities.filter((city) => city.toLowerCase().includes(from.toLowerCase()) && city.toLowerCase() !== from.toLowerCase())
    : []
  const toSuggestions = to.length > 0
    ? allCities.filter((city) => city.toLowerCase().includes(to.toLowerCase()) && city.toLowerCase() !== to.toLowerCase())
    : []

  return (
    <>
      <div className="hidden lg:block">
        <div className="relative overflow-hidden bg-[#1a6b3c]">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-12 right-32 w-36 h-36 rounded-full bg-white/5" />
          <div className="absolute top-6 right-64 w-24 h-24 rounded-full bg-white/5" />

          <div className="relative px-8 pt-8 pb-8">
            <p className="text-white/70 text-sm mb-1">Good morning, Juan!</p>
            <h1 className="text-white text-2xl font-semibold mb-1">
              Where are you riding today?
            </h1>
            <p className="text-white/60 text-sm mb-6">
              Plan your Mindanao bus trip across 30+ cities
            </p>

            <div className="bg-white border border-[#e0e0dc] rounded-xl shadow-sm p-3 flex items-center gap-3 relative">
              <div className="flex items-center gap-2 flex-1 border-r border-[#e0e0dc] pr-3 relative">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#1a6b3c]" />
                <input
                  ref={fromInputRef}
                  type="text"
                  placeholder="From city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  onFocus={() => setFromFocus(true)}
                  onBlur={() => setTimeout(() => setFromFocus(false), 100)}
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                  autoComplete="off"
                />
                {(fromFocus || fromHover) && fromSuggestions.length > 0 && (
                  <ul
                    className="absolute left-0 top-9 z-20 w-full rounded-b-xl border border-t-0 border-[#e0e0dc] bg-white shadow-lg max-h-40 overflow-y-auto"
                    onMouseEnter={() => setFromHover(true)}
                    onMouseLeave={() => setFromHover(false)}
                  >
                    {fromSuggestions.map((city) => (
                      <li
                        key={city}
                        className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-[#e8f5ee]"
                        onMouseDown={() => {
                          setFrom(city)
                          setFromFocus(false)
                          setTimeout(() => fromInputRef.current?.blur(), 0)
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center gap-2 flex-1 pr-3 relative">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#e24b4a]" />
                <input
                  ref={toInputRef}
                  type="text"
                  placeholder="To city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  onFocus={() => setToFocus(true)}
                  onBlur={() => setTimeout(() => setToFocus(false), 100)}
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                  autoComplete="off"
                />
                {(toFocus || toHover) && toSuggestions.length > 0 && (
                  <ul
                    className="absolute left-0 top-9 z-20 w-full rounded-b-xl border border-t-0 border-[#e0e0dc] bg-white shadow-lg max-h-40 overflow-y-auto"
                    onMouseEnter={() => setToHover(true)}
                    onMouseLeave={() => setToHover(false)}
                  >
                    {toSuggestions.map((city) => (
                      <li
                        key={city}
                        className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-[#fdeaea]"
                        onMouseDown={() => {
                          setTo(city)
                          setToFocus(false)
                          setTimeout(() => toInputRef.current?.blur(), 0)
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="px-5 py-2 rounded-lg text-sm font-medium text-white flex-shrink-0 hover:opacity-90 transition-opacity flex items-center gap-2 bg-[#1a6b3c]"
              >
                <Search className="w-4 h-4" />
                Find bus routes
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 pt-8 pb-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-white border border-[#e0e0dc] rounded-xl p-4 flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Popular routes today</h2>
              <button
                onClick={() => router.push('/routes')}
                className="text-xs flex items-center gap-1 hover:opacity-80 text-[#1a6b3c]"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {routeCards.map((route, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e0e0dc] rounded-xl p-4 hover:border-[#1a6b3c] transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/plan?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`
                    )
                  }
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#1a6b3c]" />
                    <span className="text-xs font-medium text-gray-600">{route.from}</span>
                    <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
                    <div className="w-2 h-2 rounded-full bg-[#e24b4a]" />
                    <span className="text-xs font-medium text-gray-600 truncate">{route.to}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-base font-semibold text-gray-800">{route.fare}</div>
                      <div className="text-xs text-gray-400">{route.duration} · {route.distance}</div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-[#f0fdf4] text-[#1a6b3c]">
                      {route.buses} buses
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Bus companies</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {busCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex-shrink-0 bg-white border border-[#e0e0dc] rounded-xl p-4 w-52 hover:border-[#1a6b3c] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: company.color }}
                    >
                      {company.logo}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{company.name}</div>
                      <div className="text-xs text-gray-400">{company.routes} routes</div>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {company.types.map((t) => (
                      <BusTypeBadge key={t} type={t} />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {company.cities.slice(0, 3).map((c) => (
                      <span key={c} className="text-[10px] text-gray-400">{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative px-4 pt-4 pb-16 bg-[#1a6b3c]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/70 text-xs">Good morning</p>
              <p className="text-white font-medium">Juan dela Cruz</p>
            </div>
            <div className="relative">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white border-2 border-white/30 bg-[#0f6e56]"
              >
                JD
              </div>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#EF9F27] border-2 border-[#1a6b3c]" />
            </div>
          </div>
        </div>

        <div className="px-4 -mt-10">
          <div className="bg-white border border-[#e0e0dc] rounded-xl shadow-sm p-4">
            <div className="relative mb-3">
              <div className="flex items-center gap-3 p-3 border border-[#e0e0dc] rounded-lg mb-1 relative">
                <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#1a6b3c]" />
                <input
                  ref={fromInputRef}
                  type="text"
                  placeholder="From - Origin city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  onFocus={() => setFromFocus(true)}
                  onBlur={() => setTimeout(() => setFromFocus(false), 100)}
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                  autoComplete="off"
                />
                {(fromFocus || fromHover) && fromSuggestions.length > 0 && (
                  <ul
                    className="absolute left-0 top-11 z-20 w-full rounded-b-xl border border-t-0 border-[#e0e0dc] bg-white shadow-lg max-h-40 overflow-y-auto"
                    onMouseEnter={() => setFromHover(true)}
                    onMouseLeave={() => setFromHover(false)}
                  >
                    {fromSuggestions.map((city) => (
                      <li
                        key={city}
                        className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-[#e8f5ee]"
                        onMouseDown={() => {
                          setFrom(city)
                          setFromFocus(false)
                          setTimeout(() => fromInputRef.current?.blur(), 0)
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="absolute left-[22px] top-[46px] w-0.5 h-4 bg-gray-200 z-10" />
              <div className="flex items-center gap-3 p-3 border border-[#e0e0dc] rounded-lg mt-1 relative">
                <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#e24b4a]" />
                <input
                  ref={toInputRef}
                  type="text"
                  placeholder="To - Destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  onFocus={() => setToFocus(true)}
                  onBlur={() => setTimeout(() => setToFocus(false), 100)}
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                  autoComplete="off"
                />
                {(toFocus || toHover) && toSuggestions.length > 0 && (
                  <ul
                    className="absolute left-0 top-11 z-20 w-full rounded-b-xl border border-t-0 border-[#e0e0dc] bg-white shadow-lg max-h-40 overflow-y-auto"
                    onMouseEnter={() => setToHover(true)}
                    onMouseLeave={() => setToHover(false)}
                  >
                    {toSuggestions.map((city) => (
                      <li
                        key={city}
                        className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-[#fdeaea]"
                        onMouseDown={() => {
                          setTo(city)
                          setToFocus(false)
                          setTimeout(() => toInputRef.current?.blur(), 0)
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 bg-[#1a6b3c]"
            >
              <Search className="w-4 h-4" />
              Find Bus Routes
            </button>
          </div>
        </div>

        <div className="px-4 mt-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Quick access
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/plan')}
              className="p-4 rounded-xl text-left flex flex-col gap-2 bg-[#1a6b3c]"
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                <Map className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Plan a trip</div>
                <div className="text-xs text-white/60">Find routes</div>
              </div>
            </button>
            <button
              onClick={() => router.push('/routes')}
              className="p-4 rounded-xl text-left flex flex-col gap-2 bg-white border border-[#e0e0dc]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#f0fdf4]">
                <Route className="w-5 h-5 text-[#1a6b3c]" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Schedules</div>
                <div className="text-xs text-gray-400">All routes</div>
              </div>
            </button>
            <button
              onClick={() => router.push('/routes')}
              className="p-4 rounded-xl text-left flex flex-col gap-2 bg-white border border-[#e0e0dc]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#eff6ff]">
                <Bus className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Route map</div>
                <div className="text-xs text-gray-400">Visual routes</div>
              </div>
            </button>
            <button
              onClick={() => router.push('/terminals')}
              className="p-4 rounded-xl text-left flex flex-col gap-2 bg-white border border-[#e0e0dc]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#fdf4ff]">
                <Building2 className="w-5 h-5 text-[#8e44ad]" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Terminals</div>
                <div className="text-xs text-gray-400">Find nearby</div>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-5 px-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Popular routes
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {popularRoutes.map((route) => (
              <button
                key={route.id}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-[#e0e0dc] text-gray-600 bg-white whitespace-nowrap"
                onClick={() => {
                  setFrom(route.from)
                  setTo(route.to)
                  router.push(
                    `/plan?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`
                  )
                }}
              >
                {route.from} -&gt; {route.to}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 px-4 pb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Recent trips
          </h3>
          <div className="bg-white border border-[#e0e0dc] rounded-xl overflow-hidden">
            {routeCards.slice(0, 3).map((route, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? 'border-b border-[#e0e0dc]' : ''}`}
              >
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[#1a6b3c]" />
                  <span className="text-xs text-gray-600 truncate">{route.from}</span>
                  <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
                  <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[#e24b4a]" />
                  <span className="text-xs text-gray-600 truncate">{route.to}</span>
                </div>
                <span className="text-xs font-medium text-gray-500 flex-shrink-0">{route.fare}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
