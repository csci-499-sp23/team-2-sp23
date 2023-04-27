import { warCrimes } from "../../yelp-services/war-crimes";
import { QUEENS_REGIONS } from "../../yelp-services/constants/nyc-boroughs";
import { generateBoroughCoordinates } from "../../yelp-services/random-borough-coordinates";

export async function scrapeCoordinates() {
  const randomBoroughCoordinates = generateBoroughCoordinates(QUEENS_REGIONS);

  const { region, coordinates } = randomBoroughCoordinates;
  const { longitude, latitude } = coordinates;

  console.log(`Scraping ${region} (${longitude},${latitude}) at`, new Date());

  await warCrimes(coordinates).then((result) => {
    console.log(result);
  });
}
