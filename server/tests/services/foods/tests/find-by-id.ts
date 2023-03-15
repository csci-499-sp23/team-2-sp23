import { expect } from "@jest/globals";
import { FoodDocument, FoodModel } from "../../../../src/models/Food";
import { singleTestFood } from "../../constants/foods";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../../restaurants/utils";
import { expectFoodEquality } from "./utils";
import FoodService from "../../../../src/services/food";

export async function testGetFoodById() {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const createdFood: FoodDocument = await FoodModel.create({
    ...singleTestFood,
    restaurant_id: restaurantId,
    created_at: new Date(),
  });
  const createdFoodId = createdFood._id;

  const foundFood: FoodDocument | null = await FoodService.findFoodById(
    createdFoodId
  );

  // ensure retrieval
  expect(foundFood).toBeTruthy();
  expect(foundFood!._id).toStrictEqual(createdFood._id);
  expect(foundFood!.created_at).toStrictEqual(createdFood.created_at);
  expectFoodEquality(foundFood!, createdFood);
}
