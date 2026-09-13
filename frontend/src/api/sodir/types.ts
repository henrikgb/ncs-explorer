export type FieldGeometry = {
  rings: [number, number][][] // Array of polygon rings, each ring is an array of [lat, lng] pairs
}

export type Field = {
  npdidField: number
  name: string
  status: string
  hcType: string
  operator: string
  mainArea: string
  discoveryYear: number
  factPageUrl: string
  geometry: FieldGeometry
}
