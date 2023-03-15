import expect from "expect";
import { FoodAttributes } from "../../../src/models/Food";

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
