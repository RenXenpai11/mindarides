'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useState } from 'react'
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
  const [roadPath, setRoadPath] = useState<Array<[number, number]> | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!route.stopovers || route.stopovers.length < 2) {
      setRoadPath(null)
      return
    }
    const coords = route.stopovers.map(s => `${s.lng},${s.lat}`).join(';')
    setLoading(true)
    fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`)
      .then(res => res.json())
      .then(data => {
        if (data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
          // OSRM returns [lng, lat], Leaflet wants [lat, lng]
          setRoadPath(data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]))
        } else {
          setRoadPath(null)
        }
      })
      .catch(() => setRoadPath(null))
      .finally(() => setLoading(false))
  }, [route.stopovers])

  return (
    <MapContainer
      bounds={mindanaoBounds}
      className="h-full min-h-[360px] w-full rounded-[28px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Fallback dashed line while loading or if OSRM fails */}
      {(loading || !roadPath) && (
        <Polyline
          positions={positions}
          pathOptions={{ color: '#bdbdbd', weight: 5, dashArray: '8 8' }}
        />
      )}
      {/* Road-following route line from OSRM */}
      {roadPath && !loading && (
        <Polyline
          positions={roadPath}
          pathOptions={{ color: '#1a6b3c', weight: 5 }}
        />
      )}
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
