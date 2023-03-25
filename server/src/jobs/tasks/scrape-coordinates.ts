import { warCrimes } from "../../yelp-services/war-crimes";
import { LATITUDE_RANGE } from "../../yelp-services/constants";
import { LONGITUDE_RANGE } from "../../yelp-services/constants";
import { CENTER_COORDINATES } from "../../yelp-services/constants";
import { generateRandomCoordinates } from "../../yelp-services/random-coordinates";

export async function scrapeCoordinates() {
  const randomCoordinatesNearHunter = generateRandomCoordinates({
    center: CENTER_COORDINATES,
    longitude_range: LONGITUDE_RANGE,
    latitude_range: LATITUDE_RANGE,
  });

  const { longitude, latitude } = randomCoordinatesNearHunter;
  console.log(`Scraping (${longitude},${latitude}) at`, new Date());

  await warCrimes(randomCoordinatesNearHunter).then((result) => {
    console.log(result);
  });
}
