'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { Terminal } from '@/types'

interface TerminalMapProps {
  terminals: Terminal[]
}

const mindanaoBounds: [[number, number], [number, number]] = [
  [5.5, 121.5],
  [10.6, 126.6],
]

function getPinIcon(type: Terminal['type']) {
  const color = type === 'main' ? '#1a6b3c' : '#EF9F27'

  return L.divIcon({
    className: '',
    html: `<div style="display:flex;height:18px;width:18px;align-items:center;justify-content:center;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(24,52,39,.12)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

export default function TerminalMap({ terminals }: TerminalMapProps) {
  return (
    <MapContainer
      bounds={mindanaoBounds}
      className="h-full min-h-[400px] w-full rounded-[28px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {terminals.map((terminal) => (
        <Marker
          key={terminal.id}
          position={[terminal.lat, terminal.lng]}
          icon={getPinIcon(terminal.type)}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{terminal.name}</p>
              <p>
                {terminal.city}, {terminal.region}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
