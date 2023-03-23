import RestaurantService from "../../../../src/services/restaurant";
import { RestaurantModel } from "../../../../src/models/Restaurant";
import { testRestaurants } from "../../constants/restaurants";
import { expect } from "@jest/globals";
import { generateMenuId } from "../../menus/tests/utils";
import { manyTestFoods } from "../../constants/foods";
import { FoodModel } from "../../../../src/models/Food";
import { MenuModel } from "../../../../src/models/Menu";

export async function testRetrieveNearbyRestaurantsInBudget() {
  const createdRestaurantIds = await RestaurantModel.insertMany(
    testRestaurants.map((restaurant) => ({
      ...restaurant,
      created_at: new Date(),
    }))
  ).then((res) => res.map((restaurant) => restaurant._id));

  for (const restaurantId of createdRestaurantIds) {
    const menuId = await generateMenuId(restaurantId);
    const createdFoodIds = await FoodModel.insertMany(
      manyTestFoods.map((food) => ({
        ...food,
        restaurant_id: restaurantId,
        menu_id: menuId,
        created_at: new Date(),
      }))
    ).then((created) => created.map((food) => food._id));

    await RestaurantModel.findByIdAndUpdate(
      { _id: restaurantId },
      { menu_id: menuId }
    );

    await MenuModel.findOneAndUpdate(
      { _id: menuId },
      { foods: createdFoodIds }
    );
  }

  const budget = 2.22;
  const nearbyInBudget = await RestaurantService.findNearWithinBudget(
    [-74.00565, 40.74207],
    5000,
    budget
  );

  const nearbyRestaurantNames = nearbyInBudget.map(
    (result) => result.restaurant.name
  );

  const retrievedPrices = nearbyInBudget
    .map((match) => match.foods.map((food) => food.price))
    .flat();

  const createdFoods = Array(nearbyInBudget.length).fill(manyTestFoods).flat();

  const expectedPrices = createdFoods
    .flatMap((food) => food.price)
    .filter((price) => price <= budget);

  expect(nearbyInBudget.length).toBe(3);
  expect(nearbyRestaurantNames).toEqual([
    "Very Fresh Noodles",
    "Omusubi Gonbei",
    "Momofuku Noodle Bar - Uptown",
  ]);
  expect(retrievedPrices).toEqual(expectedPrices);
}
