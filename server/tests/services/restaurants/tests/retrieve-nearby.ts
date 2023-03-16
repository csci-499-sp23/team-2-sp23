import RestaurantService from "../../../../src/services/restaurant";
import { RestaurantModel } from "../../../../src/models/Restaurant";
import { testRestaurants } from "../../constants/restaurants";
import { expect } from "@jest/globals";

export async function testRetrieveNearbyRestaurants() {
  await RestaurantModel.insertMany(
    testRestaurants.map((restaurant) => ({
      ...restaurant,
      created_at: new Date(),
    }))
  );

  const nearbyRestaurants = await RestaurantService.findNear(
    [-74.00565, 40.74207],
    5000
  );

  const nearbyRestaurantNames = nearbyRestaurants?.map(
    (restaurant) => restaurant.name
  );

  expect(nearbyRestaurants!.length).toBe(3);
  expect(nearbyRestaurantNames).toEqual([
    "Very Fresh Noodles",
    "Omusubi Gonbei",
    "Momofuku Noodle Bar - Uptown",
  ]);
}
