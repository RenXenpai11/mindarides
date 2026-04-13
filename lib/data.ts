import type {
  BusCompany,
  MembershipPlan,
  PlannerRoute,
  Route,
  Schedule,
  Terminal,
  User,
} from '@/types'

export const terminals: Terminal[] = [
  {
    id: 'davao-ecoland',
    name: 'Ecoland Transport Terminal',
    address: 'Quimpo Boulevard, Talomo',
    city: 'Davao City',
    region: 'Davao Region',
    lat: 7.0647,
    lng: 125.5988,
    type: 'main',
    routes: ['davao-surigao', 'davao-cdo', 'davao-cotabato'],
  },
  {
    id: 'davao-buhangin',
    name: 'Buhangin Overland Terminal',
    address: 'JP Laurel Avenue, Buhangin',
    city: 'Davao City',
    region: 'Davao Region',
    lat: 7.1176,
    lng: 125.6501,
    type: 'regional',
    routes: ['davao-tagum', 'davao-butuan'],
  },
  {
    id: 'tagum-city',
    name: 'Tagum City Integrated Terminal',
    address: 'Tionko Avenue',
    city: 'Tagum City',
    region: 'Davao Region',
    lat: 7.4478,
    lng: 125.8078,
    type: 'regional',
    routes: ['davao-surigao', 'davao-butuan'],
  },
  {
    id: 'butuan-terminal',
    name: 'Butuan Central Terminal',
    address: 'J.C. Aquino Avenue',
    city: 'Butuan City',
    region: 'Caraga',
    lat: 8.9492,
    lng: 125.5436,
    type: 'main',
    routes: ['davao-surigao', 'davao-cdo', 'butuan-surigao'],
  },
  {
    id: 'surigao-terminal',
    name: 'Surigao City Bus Terminal',
    address: 'Borromeo Street',
    city: 'Surigao City',
    region: 'Caraga',
    lat: 9.7846,
    lng: 125.4888,
    type: 'main',
    routes: ['davao-surigao', 'butuan-surigao'],
  },
  {
    id: 'cdo-agora',
    name: 'Agora Transport Terminal',
    address: 'Agora, Lapasan',
    city: 'Cagayan de Oro',
    region: 'Northern Mindanao',
    lat: 8.4859,
    lng: 124.6561,
    type: 'main',
    routes: ['davao-cdo', 'cdo-iligan'],
  },
  {
    id: 'iligan-terminal',
    name: 'Iligan City Terminal',
    address: 'Tibanga Highway',
    city: 'Iligan City',
    region: 'Northern Mindanao',
    lat: 8.228,
    lng: 124.2452,
    type: 'regional',
    routes: ['cdo-iligan'],
  },
  {
    id: 'cotabato-terminal',
    name: 'Cotabato City Terminal',
    address: 'Sinsuat Avenue',
    city: 'Cotabato City',
    region: 'BARMM',
    lat: 7.2236,
    lng: 124.2464,
    type: 'main',
    routes: ['davao-cotabato'],
  },
  {
    id: 'gensan-terminal',
    name: 'General Santos Integrated Terminal',
    address: 'National Highway, Lagao',
    city: 'General Santos',
    region: 'SOCCSKSARGEN',
    lat: 6.1164,
    lng: 125.1716,
    type: 'main',
    routes: ['davao-cotabato', 'gensan-koronadal'],
  },
  {
    id: 'koronadal-terminal',
    name: 'Koronadal City Terminal',
    address: 'Rizal Street',
    city: 'Koronadal City',
    region: 'SOCCSKSARGEN',
    lat: 6.4971,
    lng: 124.8465,
    type: 'regional',
    routes: ['gensan-koronadal'],
  },
  {
    id: 'zamboanga-terminal',
    name: 'Zamboanga Integrated Bus Terminal',
    address: 'Veterans Avenue',
    city: 'Zamboanga City',
    region: 'Zamboanga Peninsula',
    lat: 6.9132,
    lng: 122.0611,
    type: 'main',
    routes: ['zamboanga-pagadian'],
  },
  {
    id: 'pagadian-terminal',
    name: 'Pagadian City Terminal',
    address: 'San Jose District',
    city: 'Pagadian City',
    region: 'Zamboanga Peninsula',
    lat: 7.8257,
    lng: 123.437,
    type: 'regional',
    routes: ['zamboanga-pagadian'],
  },
]

export const busCompanies: BusCompany[] = [
  { id: 'dltb', name: 'DLTB Mindanao', code: 'DLTB', color: '#1a6b3c', routes: ['davao-surigao', 'davao-butuan'], types: ['aircon', 'premium'] },
  { id: 'bachelor', name: 'Bachelor Express', code: 'BEX', color: '#ef9f27', routes: ['davao-surigao', 'davao-cdo'], types: ['aircon', 'ordinary'] },
  { id: 'rural', name: 'Rural Transit', code: 'RTC', color: '#2f855a', routes: ['davao-cotabato', 'gensan-koronadal'], types: ['aircon', 'ordinary', 'premium'] },
  { id: 'yellow', name: 'Yellow Bus Line', code: 'YBL', color: '#ca8a04', routes: ['davao-cotabato', 'gensan-koronadal'], types: ['aircon', 'ordinary'] },
  { id: 'mindanao-star', name: 'Mindanao Star', code: 'MDS', color: '#166534', routes: ['davao-cdo', 'cdo-iligan'], types: ['aircon', 'premium'] },
  { id: 'weesam', name: 'Weesam Express', code: 'WEX', color: '#0f766e', routes: ['butuan-surigao'], types: ['aircon'] },
  { id: 'metro', name: 'Metro Shuttle', code: 'MTR', color: '#14532d', routes: ['zamboanga-pagadian'], types: ['ordinary', 'premium'] },
  { id: 'goldline', name: 'Goldline Transit', code: 'GLT', color: '#92400e', routes: ['davao-cdo', 'davao-surigao'], types: ['aircon', 'premium'] },
]

export const routes: Route[] = [
  { id: 'davao-surigao', from: 'Davao City', to: 'Surigao City', distance_km: 471, duration_hrs: 9.5, companies: ['dltb', 'bachelor', 'goldline'] },
  { id: 'davao-cdo', from: 'Davao City', to: 'Cagayan de Oro', distance_km: 393, duration_hrs: 7.5, companies: ['bachelor', 'mindanao-star', 'goldline'] },
  { id: 'davao-cotabato', from: 'Davao City', to: 'Cotabato City', distance_km: 253, duration_hrs: 5, companies: ['rural', 'yellow'] },
  { id: 'davao-butuan', from: 'Davao City', to: 'Butuan City', distance_km: 317, duration_hrs: 6.5, companies: ['dltb'] },
  { id: 'butuan-surigao', from: 'Butuan City', to: 'Surigao City', distance_km: 118, duration_hrs: 2.5, companies: ['weesam'] },
  { id: 'cdo-iligan', from: 'Cagayan de Oro', to: 'Iligan City', distance_km: 92, duration_hrs: 2, companies: ['mindanao-star'] },
  { id: 'gensan-koronadal', from: 'General Santos', to: 'Koronadal City', distance_km: 63, duration_hrs: 1.5, companies: ['rural', 'yellow'] },
  { id: 'zamboanga-pagadian', from: 'Zamboanga City', to: 'Pagadian City', distance_km: 197, duration_hrs: 4, companies: ['metro'] },
]

export const schedules: Schedule[] = [
  { id: 'sch-001', route_id: 'davao-surigao', company_id: 'dltb', departure_time: '05:30', arrival_time: '15:00', fare_min: 620, fare_max: 780, bus_type: 'aircon', days: ['Daily'] },
  { id: 'sch-002', route_id: 'davao-surigao', company_id: 'goldline', departure_time: '21:00', arrival_time: '06:30', fare_min: 710, fare_max: 860, bus_type: 'premium', days: ['Mon', 'Wed', 'Fri', 'Sun'] },
  { id: 'sch-003', route_id: 'davao-cdo', company_id: 'mindanao-star', departure_time: '06:00', arrival_time: '13:30', fare_min: 540, fare_max: 690, bus_type: 'premium', days: ['Daily'] },
  { id: 'sch-004', route_id: 'davao-cdo', company_id: 'bachelor', departure_time: '10:30', arrival_time: '18:00', fare_min: 480, fare_max: 620, bus_type: 'aircon', days: ['Daily'] },
  { id: 'sch-005', route_id: 'davao-cotabato', company_id: 'rural', departure_time: '07:00', arrival_time: '12:00', fare_min: 340, fare_max: 420, bus_type: 'ordinary', days: ['Daily'] },
  { id: 'sch-006', route_id: 'davao-cotabato', company_id: 'yellow', departure_time: '16:00', arrival_time: '20:45', fare_min: 390, fare_max: 470, bus_type: 'aircon', days: ['Daily'] },
  { id: 'sch-007', route_id: 'butuan-surigao', company_id: 'weesam', departure_time: '08:15', arrival_time: '10:45', fare_min: 220, fare_max: 280, bus_type: 'aircon', days: ['Daily'] },
  { id: 'sch-008', route_id: 'zamboanga-pagadian', company_id: 'metro', departure_time: '05:00', arrival_time: '09:00', fare_min: 290, fare_max: 360, bus_type: 'premium', days: ['Tue', 'Thu', 'Sat'] },
]

export const plannerRoute: PlannerRoute = {
  ...routes[0],
  fare_min: 620,
  fare_max: 860,
  stopovers: [
    { id: 'stop-davao', name: 'Davao City', lat: 7.0647, lng: 125.5988 },
    { id: 'stop-tagum', name: 'Tagum City', lat: 7.4478, lng: 125.8078 },
    { id: 'stop-butuan', name: 'Butuan City', lat: 8.9492, lng: 125.5436 },
    { id: 'stop-surigao', name: 'Surigao City', lat: 9.7846, lng: 125.4888 },
  ],
}

export const featuredStats = [
  { label: 'Routes tracked', value: '24' },
  { label: 'Bus companies', value: '8' },
  { label: 'Terminals listed', value: '12' },
  { label: 'Cities covered', value: '30+' },
]

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: 49,
    cadence: '/month',
    caption: 'Flexible billing for occasional travelers',
  },
  {
    id: 'yearly',
    label: 'Yearly',
    price: 410,
    cadence: '/year',
    caption: 'Equivalent to ₱34/month billed annually',
  },
]

export const perks = [
  'Save favorite routes',
  'Departure reminders',
  'Offline route access',
  'Full trip history',
  'Seat availability alerts',
  'No ads',
  'Priority support',
]

export const currentUser: User = {
  id: 'user-001',
  email: 'maria.santos@example.com',
  name: 'Maria Santos',
  is_pro: true,
  pro_expires_at: '2027-04-13',
  saved_routes: ['davao-surigao', 'davao-cdo', 'davao-cotabato'],
}

export const profileStats = [
  { label: 'Trips taken', value: '18' },
  { label: 'Saved routes', value: '3' },
  { label: 'Reminders', value: '6' },
]

export const recentTrips = [
  { id: 'trip-001', route: 'Davao City to Surigao City', company: 'DLTB Mindanao', date: 'Apr 9', status: 'Completed' },
  { id: 'trip-002', route: 'Davao City to Cagayan de Oro', company: 'Mindanao Star', date: 'Apr 2', status: 'Completed' },
  { id: 'trip-003', route: 'Davao City to Cotabato City', company: 'Rural Transit', date: 'Mar 28', status: 'Completed' },
]

export const quickAccessItems = [
  { href: '/plan', label: 'Trip planner' },
  { href: '/routes', label: 'Schedules' },
  { href: '/terminals', label: 'Terminals' },
  { href: '/pro', label: 'Go Pro' },
]

export function getCompany(companyId: string) {
  return busCompanies.find((company) => company.id === companyId)
}

export function getRoute(routeId: string) {
  return routes.find((route) => route.id === routeId)
}

export function getSchedulesByRoute(routeId: string) {
  return schedules.filter((schedule) => schedule.route_id === routeId)
}

export function getFareRange(routeId: string) {
  const matches = getSchedulesByRoute(routeId)

  if (matches.length === 0) {
    return { min: 0, max: 0 }
  }

  return {
    min: Math.min(...matches.map((schedule) => schedule.fare_min)),
    max: Math.max(...matches.map((schedule) => schedule.fare_max)),
  }
}
