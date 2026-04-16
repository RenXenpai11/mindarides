'use client'

// Prevent SSR issues with leaflet
let L: any = null
let MapContainer: any = null
let Marker: any = null
let Polyline: any = null
let TileLayer: any = null

if (typeof window !== 'undefined') {
  import('leaflet/dist/leaflet.css')
  const leaflet = require('leaflet')
  L = leaflet
  const rl = require('react-leaflet')
  MapContainer = rl.MapContainer
  Marker = rl.Marker
  Polyline = rl.Polyline
  TileLayer = rl.TileLayer
}

// Route city coordinates for the map
const routeCoordinatesMap: Record<string, [number, number][]> = {
  'davao-surigao': [
    [7.0647, 125.5988], // Davao
    [7.4478, 125.8078], // Tagum
    [8.9492, 125.5436], // Butuan
    [9.7846, 125.4888], // Surigao
  ],
  'davao-cdo': [
    [7.0647, 125.5988], // Davao
    [7.4478, 125.8078], // Tagum
    [8.9492, 125.5436], // Butuan
    [8.4859, 124.6561], // Cdo
  ],
  'davao-tagum': [
    [7.0647, 125.5988], // Davao
    [7.4478, 125.8078], // Tagum
  ],
  'davao-butuan': [
    [7.0647, 125.5988], // Davao
    [7.4478, 125.8078], // Tagum
    [8.9492, 125.5436], // Butuan
  ],
  'davao-cotabato': [
    [7.0647, 125.5988], // Davao
    [7.2236, 124.2464], // Cotabato
  ],
  'davao-gensan': [
    [7.0647, 125.5988], // Davao
    [6.1164, 125.1716], // General Santos
  ],
  'cdo-iligan': [
    [8.4859, 124.6561], // Cdo
    [8.228, 124.2452], // Iligan
  ],
}

export function getRouteCities(routeKey: string): [number, number][] {
  return routeCoordinatesMap[routeKey] || routeCoordinatesMap['davao-surigao']
}

interface MindanaoMapProps {
  highlightedRoute?: {
    points: [number, number][]
    color: string
  }
  showAllCities?: boolean
  className?: string
}

const mindanaoBounds: [[number, number], [number, number]] = [
  [5.5, 121.5],
  [10.6, 126.6],
]

function getStopIcon(isStart: boolean, isEnd: boolean) {
  if (!L) return null
  
  if (isEnd) {
    return L.divIcon({
      className: '',
      html: `<div style="height:18px;width:18px;border-radius:9999px;background:#e24b4a;border:2px solid white;box-shadow:0 0 0 1px rgba(24,52,39,.12)"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    })
  }
  if (isStart) {
    return L.divIcon({
      className: '',
      html: `<div style="height:18px;width:18px;border-radius:9999px;background:#1a6b3c;border:2px solid white;box-shadow:0 0 0 1px rgba(24,52,39,.12)"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    })
  }
  return L.divIcon({
    className: '',
    html: `<div style="height:12px;width:12px;border-radius:9999px;background:#9ca3af;border:2px solid white;box-shadow:0 0 0 1px rgba(24,52,39,.12)"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

export function MindanaoMap({
  highlightedRoute,
  showAllCities = true,
  className = '',
}: MindanaoMapProps) {
  if (!MapContainer || typeof window === 'undefined') {
    return <div className={`h-full min-h-[360px] w-full rounded-lg bg-gray-100 ${className}`} />
  }

  const positions = highlightedRoute?.points || getRouteCities('davao-surigao')
  const color = highlightedRoute?.color || '#1a6b3c'

  return (
    <MapContainer
      bounds={mindanaoBounds}
      className={`h-full min-h-[360px] w-full rounded-lg ${className}`}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {positions && positions.length > 1 && (
        <Polyline
          positions={positions}
          pathOptions={{ color, weight: 4, opacity: 0.8 }}
        />
      )}
      {positions && positions.map((position: [number, number], index: number) => {
        const isStart = index === 0
        const isEnd = index === positions.length - 1
        return (
          <Marker
            key={`${position[0]}-${position[1]}`}
            position={position}
            icon={getStopIcon(isStart, isEnd)}
          />
        )
      })}
    </MapContainer>
  )
}
