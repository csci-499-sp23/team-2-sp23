import { expect } from "@jest/globals";
import FoodService from "../../../../src/services/food";
import { singleTestFood } from "../../constants/foods";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../../restaurants/utils";
import { expectFoodEquality } from "./utils";

export async function testCreateFood() {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const testFoodWithRestaurantId = {
    ...singleTestFood,
    restaurant_id: restaurantId,
  };
  const createdFood = await FoodService.create(testFoodWithRestaurantId);

  expect(createdFood).toBeDefined();
  expect(createdFood.created_at).toBeDefined();
  expectFoodEquality(createdFood, testFoodWithRestaurantId);
}
