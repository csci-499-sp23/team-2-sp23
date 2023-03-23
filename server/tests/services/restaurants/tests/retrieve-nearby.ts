import RestaurantService from "../../../../src/services/restaurant";
import { RestaurantModel } from "../../../../src/models/Restaurant";
import { testRestaurants } from "../../constants/restaurants";
import { expect } from "@jest/globals";
import { generateMenuId } from "../../menus/utils";

export async function testRetrieveNearbyRestaurants() {
  const createdRestaurantIds = await RestaurantModel.insertMany(
    testRestaurants.map((restaurant) => ({
      ...restaurant,
      created_at: new Date(),
    }))
  ).then((res) => res.map((restaurant) => restaurant._id));

  for (const restaurantId of createdRestaurantIds) {
    const menuId = await generateMenuId(restaurantId);
    await RestaurantModel.findByIdAndUpdate(
      { _id: restaurantId },
      { menu_id: menuId }
    );
  }

  const nearbyRestaurants = await RestaurantService.findNear(
    [-74.00565, 40.74207],
    5000
  );

  const nearbyRestaurantNames = nearbyRestaurants?.map(
    (result) => result.restaurant.name
  );

  expect(nearbyRestaurants.length).toBe(3);
  expect(nearbyRestaurantNames).toEqual([
    "Very Fresh Noodles",
    "Omusubi Gonbei",
    "Momofuku Noodle Bar - Uptown",
  ]);
}
