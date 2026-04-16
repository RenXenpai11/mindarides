'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import type { PlannerRoute } from '@/types'

interface RouteMapProps {
  route: PlannerRoute
}

const mindanaoBounds: [[number, number], [number, number]] = [
  [5.5, 121.5],
  [10.6, 126.6],
]

function getStopIcon(isDestination: boolean) {
  const color = isDestination ? '#ef4444' : '#1a6b3c'
  const size = isDestination ? 18 : 14
  const offset = size / 2

  return L.divIcon({
    className: '',
    html: `<div style="height:${size}px;width:${size}px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(24,52,39,.12)"></div>`,
    iconSize: [size, size],
    iconAnchor: [offset, offset],
  })
}

export default function RouteMap({ route }: RouteMapProps) {
  const positions = route.stopovers.map((stop) => [stop.lat, stop.lng] as [number, number])

  return (
    <MapContainer
      bounds={mindanaoBounds}
      className="h-full min-h-[360px] w-full rounded-[28px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={positions} pathOptions={{ color: '#1a6b3c', weight: 5 }} />
      {route.stopovers.map((stop, index) => {
        const isDestination = index === route.stopovers.length - 1

        return (
          <Marker
            key={stop.id}
            position={[stop.lat, stop.lng]}
            icon={getStopIcon(isDestination)}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{stop.name}</p>
                <p>{isDestination ? 'Destination stop' : 'Planned stopover'}</p>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
