import MANHATTAN_GEO_JSON from "./manhattan";
import QUEENS_GEO_JSON from "./queens";
import area from "@turf/area";

const geoJsonToRegions = (boroughGeoJson: GeoJson): RegionInfo[] =>
  boroughGeoJson.features
    .map((feature, index) => ({
      name: feature.properties.name,
      coordinates: feature.geometry.coordinates.flat(Infinity),
      area: area(boroughGeoJson.features[index] as any),
    }))
    .sort((a: RegionInfo, b: RegionInfo) => a.area - b.area);

export const MANHATTAN_REGIONS = geoJsonToRegions(MANHATTAN_GEO_JSON);
export const QUEENS_REGIONS = geoJsonToRegions(QUEENS_GEO_JSON);
