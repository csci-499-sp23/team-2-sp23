import { warCrimes } from "../../yelp-services/war-crimes";
import {
  MANHATTAN_REGIONS,
  QUEENS_REGIONS,
  BROOKLYN_REGIONS,
} from "../../yelp-services/constants/nyc-boroughs";
import { generateBoroughCoordinates } from "../../yelp-services/random-borough-coordinates";

const REGIONS = {
  BROOKLYN: BROOKLYN_REGIONS,
  MANHATTAN: MANHATTAN_REGIONS,
  QUEENS: QUEENS_REGIONS,
};

export async function scrapeCoordinates() {
  const randomBoroughCoordinates = generateBoroughCoordinates(REGIONS.BROOKLYN);

  const { region, coordinates } = randomBoroughCoordinates;
  const { longitude, latitude } = coordinates;

  console.log(`Scraping ${region} (${longitude},${latitude}) at`, new Date());

  await warCrimes(coordinates).then((result) => {
    console.log(result);
  });
}
