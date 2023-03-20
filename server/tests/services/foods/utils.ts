import expect from "expect";
import {
  FoodAttributes,
  FoodDocument,
  FoodModel,
} from "../../../src/models/Food";
import { testRestaurant } from "../constants/restaurants";
import { generateRestaurantId } from "../restaurants/utils";
import { generateMenuId } from "../menus/tests/utils";
import { singleTestFood } from "../constants/foods";

// expects two food objects to have the same values
export function expectFoodEquality(
  foodA: FoodAttributes,
  foodB: FoodAttributes
): void {
  expect(foodA.name).toBe(foodB.name);
  expect(foodA.description).toBe(foodB.description);
  expect(foodA.price).toBe(foodB.price);
  expect(foodA.image_url).toBe(foodB.image_url);
}

export async function generateFoodAttributes(): Promise<FoodAttributes> {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const testMenuId = await generateMenuId(restaurantId);

  const foodWithForeignKeys = {
    ...singleTestFood,
    restaurant_id: restaurantId,
    menu_id: testMenuId,
  };

  return foodWithForeignKeys;
}
