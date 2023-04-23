import { CLICK_THAT_HOOD_MANHATTAN } from "./constants/manhattan-areas";
import { randomPoint } from "@turf/random";
import area from "@turf/area";

type RegionInfo = {
  name: string;
  coordinates: number[][];
  area: number;
};

function generatePrefixSum(regions: RegionInfo[]): number[] {
  const result: number[] = [];

  let cummulativeSum: number = 0;
  regions.forEach((region: RegionInfo) => {
    cummulativeSum += region.area;
    result.push(cummulativeSum);
  });

  return result;
}

const MANHATTAN_REGIONS: RegionInfo[] = CLICK_THAT_HOOD_MANHATTAN.features
  .map((feature, index) => ({
    name: feature.properties.name,
    coordinates: feature.geometry.coordinates[0][0],
    area: area(CLICK_THAT_HOOD_MANHATTAN.features[index] as any),
  }))
  .sort((a: RegionInfo, b: RegionInfo) => a.area - b.area);

const totalArea: number = MANHATTAN_REGIONS.reduce(
  (total: number, curr: RegionInfo) => total + curr.area,
  0
);

// use prefix array to determine the associated random area region
// if randomArea @ prefixSum[i], then MANHATTAN_REGIONS[i] will be scraped
const regionAreaPrefixSum: number[] = generatePrefixSum(MANHATTAN_REGIONS);

export function generateRandomManhattanCoordinates(): {
  region: string;
  coordinates: Coordinates;
} {
  const randomAreaValue = Math.floor(Math.random() * totalArea);
  const regionIndex = regionAreaPrefixSum.findIndex(
    (area: number) => area > randomAreaValue
  );
  const randomRegion = MANHATTAN_REGIONS[regionIndex];

  const coordinates = randomPoint(1, {
    bbox: randomRegion.coordinates.flat() as any,
  }).features[0].geometry.coordinates;

  const [longitude, latitude] = coordinates;

  return {
    region: MANHATTAN_REGIONS[regionIndex].name,
    coordinates: { longitude, latitude },
  };
}
