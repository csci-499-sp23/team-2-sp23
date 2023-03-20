import { expect } from "@jest/globals";
import { FoodDocument, FoodModel } from "../../../../src/models/Food";
import { expectFoodEquality, generateFoodAttributes } from "../utils";
import FoodService from "../../../../src/services/food";

export async function testGetFoodById() {
  const generatedFood = await generateFoodAttributes();

  const createdFood = await FoodModel.create({
    ...generatedFood,
    created_at: new Date(),
  });

  const foundFood: FoodDocument | null = await FoodService.findFoodById(
    createdFood._id
  );

  // ensure retrieval
  expect(foundFood).toBeTruthy();
  expect(foundFood!._id).toStrictEqual(createdFood._id);
  expect(foundFood!.created_at).toStrictEqual(createdFood.created_at);
  expectFoodEquality(foundFood!, createdFood);
}
