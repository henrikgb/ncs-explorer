import { MapContainer, TileLayer } from 'react-leaflet'

// Centered offshore over the Norwegian Continental Shelf (North Sea /
// Norwegian Sea), not on land — approximate starting point, tune visually later.
const NCS_CENTER: [number, number] = [65, 2]
const NCS_DEFAULT_ZOOM = 5

export function NorwayMap() {
  return (
    <MapContainer
      center={NCS_CENTER}
      zoom={NCS_DEFAULT_ZOOM}
      className="absolute inset-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}
