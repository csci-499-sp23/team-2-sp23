import { expect } from "@jest/globals";
import FoodService from "../../../../src/services/food";
import { expectFoodEquality, generateFoodAttributes } from "../utils";

export async function testCreateFood() {
  const generatedFood = await generateFoodAttributes();

  const createdFood = await FoodService.create(generatedFood);

  expect(createdFood).toBeDefined();
  expect(createdFood.created_at).toBeDefined();
  expectFoodEquality(createdFood, generatedFood);
}
