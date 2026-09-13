const config = require('../config');

const FIELD_LAYER_ID = 7100;
const FIELD_OUT_FIELDS = [
  'fldNpdidField',
  'fldName',
  'fldCurrentActivitySatus', // sic — verbatim SODIR field name (missing "t")
  'fldHcType',
  'cmpLongName',
  'fldMainArea',
  'fldDiscoveryYear',
  'fldFactPageUrl',
].join(',');

async function request(path) {
  const res = await fetch(`${config.sodir.baseUrl}${path}`);
  if (!res.ok) {
    const err = new Error(`SODIR request failed: ${res.status} ${res.statusText}`);
    // We set the status property on the error object to distinguish between client and server errors.
    // Client errors (4xx) retain their original status, while server errors default to 502 (Bad Gateway).
    err.status = res.status >= 400 && res.status < 500 ? res.status : 502;
    throw err;
  }
  return res.json();
}

// SODIR returns polygon rings as [lng, lat] pairs (reprojected server-side to
// WGS84 via outSR=4326). Leaflet's <Polygon positions={...}> expects
// [lat, lng], so we swap here once, at the DTO->domain boundary, so the
// frontend never has to transform coordinates.
function swapRingCoordinates(rings) {
  if (!Array.isArray(rings)) return [];
  return rings.map((ring) => ring.map(([lng, lat]) => [lat, lng]));
}

function fieldDtoToDomain(raw) {
  const attrs = raw.attributes;
  return {
    npdidField: attrs.fldNpdidField,
    name: attrs.fldName,
    status: attrs.fldCurrentActivitySatus,
    hcType: attrs.fldHcType,
    operator: attrs.cmpLongName,
    mainArea: attrs.fldMainArea,
    discoveryYear: attrs.fldDiscoveryYear,
    factPageUrl: attrs.fldFactPageUrl,
    geometry: {
      rings: swapRingCoordinates(raw.geometry && raw.geometry.rings),
    },
  };
}

async function getFields() {
  const query = new URLSearchParams({
    where: '1=1',
    outFields: FIELD_OUT_FIELDS,
    returnGeometry: 'true',
    orderByFields: 'fldName',
    outSR: '4326', // reproject ED50 (native wkid 4230) -> WGS84 server-side
    // The outSR parameter specifies the spatial reference for the output geometry.
    // By setting it to 4326, we ensure that the coordinates are returned in WGS84,
    // which is compatible with most mapping libraries like Leaflet.
    // Without this, the coordinates might be returned in the native ED50 reference system,
    // which could lead to incorrect positioning on the map.
    f: 'json',
  });
  const data = await request(`/${FIELD_LAYER_ID}/query?${query.toString()}`);
  return data.features;
}

module.exports = { fieldDtoToDomain, getFields };
