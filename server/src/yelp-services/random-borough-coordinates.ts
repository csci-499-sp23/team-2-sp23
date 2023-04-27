import { randomPoint } from "@turf/random";

type RegionInfo = {
  name: string;
  coordinates: any[];
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

export function generateBoroughCoordinates(borough: RegionInfo[]): {
  region: string;
  coordinates: Coordinates;
} {
  // use prefix array to determine the associated random area region
  // if randomArea @ prefixSum[i], then MANHATTAN_REGIONS[i] will be scraped
  const regionAreaPrefixSum: number[] = generatePrefixSum(borough);
  const totalArea: number = borough.reduce(
    (total: number, curr: RegionInfo) => total + curr.area,
    0
  );
  const randomAreaValue = Math.floor(Math.random() * totalArea);
  const regionIndex = regionAreaPrefixSum.findIndex(
    (area: number) => area > randomAreaValue
  );
  const randomRegion = borough[regionIndex];

  const coordinates = randomPoint(1, {
    bbox: randomRegion.coordinates.flat() as any,
  }).features[0].geometry.coordinates;

  const [longitude, latitude] = coordinates;

  return {
    region: borough[regionIndex].name,
    coordinates: { longitude, latitude },
  };
}
