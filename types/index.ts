export type TerminalType = 'main' | 'regional'
export type BusType = 'aircon' | 'ordinary' | 'premium'

export interface Terminal {
  id: string
  name: string
  address: string
  city: string
  region: string
  lat: number
  lng: number
  type: TerminalType
  routes: string[]
}

export interface BusCompany {
  id: string
  name: string
  code: string
  color: string
  routes: string[]
  types: BusType[]
}

export interface Route {
  id: string
  from: string
  to: string
  distance_km: number
  duration_hrs: number
  companies: string[]
}

export interface Schedule {
  id: string
  route_id: string
  company_id: string
  departure_time: string
  arrival_time: string
  fare_min: number
  fare_max: number
  bus_type: BusType
  days: string[]
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  is_pro: boolean
  pro_expires_at?: string
  saved_routes: string[]
}

export interface Stopover {
  id: string
  name: string
  lat: number
  lng: number
}

export interface PlannerRoute extends Route {
  fare_min: number
  fare_max: number
  stopovers: Stopover[]
}

export interface MembershipPlan {
  id: 'monthly' | 'yearly'
  label: string
  price: number
  cadence: string
  caption: string
}
