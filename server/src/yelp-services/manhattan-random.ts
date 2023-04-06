import { CLICK_THAT_HOOD_MANHATTAN } from "./constants/manhattan-areas";
import { randomPoint } from "@turf/random";

const MANHATTAN_REGIONS = CLICK_THAT_HOOD_MANHATTAN.features.map((feature) => ({
  name: feature.properties.name,
  coordinates: feature.geometry.coordinates[0][0],
}));

export function generateRandomManhattanCoordinates(): {
  region: string;
  coordinates: Coordinates;
} {
  const randomIndex = Math.floor(Math.random() * MANHATTAN_REGIONS.length);
  const randomRegion = MANHATTAN_REGIONS[randomIndex];

  const coordinates = randomPoint(1, {
    bbox: randomRegion.coordinates.flat() as any,
  }).features[0].geometry.coordinates;

  const [longitude, latitude] = coordinates;

  return {
    region: MANHATTAN_REGIONS[randomIndex].name,
    coordinates: { longitude, latitude },
  };
}
