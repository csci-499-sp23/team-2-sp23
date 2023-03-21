import { RestaurantAttributes } from "../models/Restaurant";
import { sleep, randomNumberBetween } from "./yelp-utils";
import { Coordinates, fetchRestaurants } from "./api";

async function taskGenerator(restaurant: RestaurantAttributes) {
  async function task() {
    return 10;
  }
  return await task();
}

async function warCrimes() {
  const coordinates: Coordinates = { longitude: -73.97641, latitude: 40.6 };
  const nearbyRestaurants: RestaurantAttributes[] = await fetchRestaurants(
    coordinates
  );

  for (const restaurant of nearbyRestaurants) {
    const generateTask = taskGenerator(restaurant);
    const delayTask = randomNumberBetween(3, 10) * 1000;
    await sleep(delayTask);
    await generateTask;
  }
}
