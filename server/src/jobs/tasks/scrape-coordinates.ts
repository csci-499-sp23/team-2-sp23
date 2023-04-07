import { warCrimes } from "../../yelp-services/war-crimes";
import { generateRandomManhattanCoordinates } from "../../yelp-services/manhattan-random";

export async function scrapeCoordinates() {
  const randomManhattanCoordinates = generateRandomManhattanCoordinates();

  const { region, coordinates } = randomManhattanCoordinates;
  const { longitude, latitude } = coordinates;

  console.log(`Scraping ${region} (${longitude},${latitude}) at`, new Date());

  await warCrimes(coordinates).then((result) => {
    console.log(result);
  });
}
