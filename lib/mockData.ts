// Transform data from lib/data.ts into the format expected by the plan page
import { 
  terminals, 
  busCompanies as _busCompanies, 
  routes, 
  schedules as _baseSchedules, 
  getSchedulesByRoute, 
  getCompany 
} from './data'

export interface Schedule {
  id: number
  from: string
  to: string
  route: string
  company: string
  type: 'aircon' | 'ordinary' | 'premium'
  departs: string
  fare: string
  travelTime: string
  distance: string
  stopovers: string[]
}

export interface PopularRoute {
  id: string
  from: string
  to: string
}

export interface BusCompanyMock {
  id: string
  name: string
  color: string
  logo: string
  routes: number
  cities: string[]
  types: string[]
}

// Create schedules in the format expected by plan page
export const schedules: Schedule[] = routes.flatMap((route, routeIdx) => {
  const routeSchedules = getSchedulesByRoute(route.id)
  
  return routeSchedules.map((sched, schedIdx) => {
    const company = getCompany(sched.company_id)
    const terminalIds = []
    // Find terminals for this route
    const fromTerminals = terminals.filter(t => t.city === route.from)
    const toTerminals = terminals.filter(t => t.city === route.to)
    
    return {
      id: parseInt(sched.id.replace('sch-', '')) || (routeIdx * 100 + schedIdx),
      from: route.from,
      to: route.to,
      route: `${route.from} → ${route.to}`,
      company: company?.name || 'Unknown',
      type: sched.bus_type as 'aircon' | 'ordinary' | 'premium',
      departs: sched.departure_time,
      fare: `₱${sched.fare_min}-${sched.fare_max}`,
      travelTime: `${route.duration_hrs}h`,
      distance: `${route.distance_km}km`,
      stopovers: fromTerminals.length > 0 && toTerminals.length > 0 
        ? [fromTerminals[0].city, ...terminals.filter(t => t.city !== route.from && t.city !== route.to).slice(0, 1).map(t => t.city)]
        : [],
    }
  })
})

// Popular routes
export const popularRoutes: PopularRoute[] = routes.slice(0, 6).map(route => ({
  id: route.id,
  from: route.from,
  to: route.to,
}))

// Bus companies with additional fields
export const busCompanies: BusCompanyMock[] = _busCompanies.map((company, idx) => ({
  id: company.id,
  name: company.name,
  color: company.color,
  logo: company.code.substring(0, 2),
  routes: company.routes.length,
  cities: Array.from(new Set(
    routes
      .filter(r => company.routes.includes(r.id))
      .flatMap(r => [r.from, r.to])
  )),
  types: company.types,
}))
