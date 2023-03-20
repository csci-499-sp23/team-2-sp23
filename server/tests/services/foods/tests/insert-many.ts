import { expect } from "@jest/globals";
import { FoodDocument, FoodModel } from "../../../../src/models/Food";
import FoodService from "../../../../src/services/food";
import { manyTestFoods } from "../../constants/foods";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../../restaurants/utils";
import { expectFoodEquality } from "../utils";
import { generateMenuId } from "../../menus/tests/utils";

export async function testInsertManyFoods() {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const menuId = await generateMenuId(restaurantId);

  const testFoodsWithRestaurantId = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: restaurantId,
    menu_id: menuId,
  }));
  const createdFoods: FoodDocument[] = await FoodService.createMany(
    testFoodsWithRestaurantId
  );
  // ensure creation
  expect(createdFoods.length).toBe(manyTestFoods.length);

  // ensure exact match
  createdFoods.forEach((createdFood, index) => {
    expect(createdFood.created_at).toBeDefined();
    expectFoodEquality(createdFood, testFoodsWithRestaurantId[index]);
  });
}
