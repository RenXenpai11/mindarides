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

  const [roadPath, setRoadPath] = useState<Array<[number, number]> | null>(null)
  const [loading, setLoading] = useState(false)

  // Build OSRM coordinates string: lng,lat;lng,lat;...
  const coords = route.stopovers.map((stop) => `${stop.lng},${stop.lat}`).join(';')

  useEffect(() => {
    let ignore = false
    async function fetchRoadPath() {
      setLoading(true)
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`)
        const data = await res.json()
        if (!ignore && data.routes && data.routes[0]) {
          // OSRM returns [lng, lat], convert to [lat, lng]
          const geo = data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng])
          setRoadPath(geo)
        }
      } catch (e) {
        setRoadPath(null)
      } finally {
        setLoading(false)
      }
    }
    if (route.stopovers.length > 1) fetchRoadPath()
    else setRoadPath(null)
    return () => { ignore = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords])

  // Fallback: straight lines between stopovers
  const fallbackPositions = route.stopovers.map((stop) => [stop.lat, stop.lng] as [number, number])

  return (
    <MapContainer
      bounds={mindanaoBounds}
      className="h-full min-h-[360px] w-full rounded-[28px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Show fallback dashed line while loading or if OSRM fails */}
      {(loading || !roadPath) && (
        <Polyline
          positions={fallbackPositions}
          pathOptions={{ color: '#888', weight: 4, dashArray: '8 8' }}
        />
      )}
      {/* Show OSRM road path if loaded */}
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
