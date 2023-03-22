import { randomNumberBetween } from "./yelp-utils";

export interface SearchArea {
  center: Coordinates;
  longitude_range: number;
  latitude_range: number;
}

export function generateRandomCoordinates(searchArea: SearchArea): Coordinates {
  const { center, longitude_range, latitude_range } = searchArea;

  const minLongitude = center.longitude - longitude_range;
  const maxLongitude = center.longitude + longitude_range;
  const randomLongitude = randomNumberBetween(minLongitude, maxLongitude);

  const minLatitude = center.latitude - latitude_range;
  const maxLatitude = center.latitude + latitude_range;

  const randomLatitude = randomNumberBetween(minLatitude, maxLatitude);

  return {
    longitude: randomLongitude,
    latitude: randomLatitude,
  };
}
